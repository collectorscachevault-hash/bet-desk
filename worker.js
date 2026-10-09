// Bet Desk website: serves the static files and answers two small live-data requests for the page.
//   GET /api/prices?t=TICKER,...   (up to 100)  ->  { at, m: { TICKER: [yesAsk, yesBid, noAsk, open, result] | null } }
//       open = 1 while the market can still be traded; result = "yes" | "no" | "" once settled; null = Kalshi does not list it.
//   GET /api/live-games            ->  { at, games: [{ league, id, state, clock, period, hs, as, pHome }] }  (games in progress, from ESPN)
// Kalshi's public API refuses the shared addresses Cloudflare uses, so requests are signed with the owner's read-only key when
// KALSHI_KEY_ID and KALSHI_PRIVATE_KEY are set as secrets on this worker. The key can only read; it cannot place or change bets.
const KALSHI = 'https://api.elections.kalshi.com';
const TICKER = /^KX[A-Z0-9]+-[A-Z0-9-]+$/;
const ESPN = { nfl: ['football/nfl', ''], cfb: ['football/college-football', '&groups=80'], nba: ['basketball/nba', ''], cbb: ['basketball/mens-college-basketball', '&groups=50'], mlb: ['baseball/mlb', ''] };
const TTL = 20000; // a price answered within the last 20 s is reused, so many viewers cost one Kalshi call
const cache = new Map(); // ticker -> { v, at }   (lives while this copy of the worker stays warm)
let liveCache = null; // { at, games }
let kLast = 0, signer = null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b64 = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes)));
const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
async function getSigner(env) {
  if (signer !== null) return signer;
  const id = (env.KALSHI_KEY_ID || '').trim(), pem = (env.KALSHI_PRIVATE_KEY || '').trim();
  if (!id || !pem) return (signer = false);
  const body = pem.replace(/-----[A-Z ]+-----/g, '').replace(/\s+/g, '');
  const der = unb64(body); const ed = body.startsWith('MC4'); // 48-byte PKCS#8 = Ed25519; anything longer is RSA
  const key = await crypto.subtle.importKey('pkcs8', der, ed ? { name: 'Ed25519' } : { name: 'RSA-PSS', hash: 'SHA-256' }, false, ['sign']);
  signer = async (method, path) => {
    const ts = String(Date.now()); const msg = new TextEncoder().encode(ts + method + path);
    const sig = ed ? await crypto.subtle.sign('Ed25519', key, msg) : await crypto.subtle.sign({ name: 'RSA-PSS', saltLength: 32 }, key, msg);
    return { 'KALSHI-ACCESS-KEY': id, 'KALSHI-ACCESS-TIMESTAMP': ts, 'KALSHI-ACCESS-SIGNATURE': b64(sig) };
  };
  return signer;
}
async function kalshi(env, tickers) {
  const path = '/trade-api/v2/markets', sign = await getSigner(env);
  for (let i = 0; i < 3; i++) {
    const wait = kLast + 120 - Date.now(); if (wait > 0) await sleep(wait); kLast = Date.now();
    const headers = { accept: 'application/json', ...(sign ? await sign('GET', path) : {}) };
    const r = await fetch(`${KALSHI}${path}?tickers=${tickers.join(',')}&limit=${tickers.length}`, { headers });
    if (r.status === 429) { await sleep(700 * (i + 1)); continue; }
    if (!r.ok) throw new Error('kalshi ' + r.status);
    return (await r.json()).markets || [];
  }
  throw new Error('kalshi busy');
}
const num = (x) => { const v = Number(x); return Number.isFinite(v) && v > 0 ? Math.round(v * 100) / 100 : null; };
const pack = (m) => [num(m.yes_ask_dollars ?? (m.yes_ask != null ? m.yes_ask / 100 : null)), num(m.yes_bid_dollars ?? (m.yes_bid != null ? m.yes_bid / 100 : null)), num(m.no_ask_dollars ?? (m.no_ask != null ? m.no_ask / 100 : null)), m.status === 'active' || m.status === 'open' ? 1 : 0, m.result === 'yes' || m.result === 'no' ? m.result : ''];
async function prices(env, list) {
  const now = Date.now(), out = {}, need = [];
  for (const t of list) { const c = cache.get(t); if (c && now - c.at < TTL) out[t] = c.v; else need.push(t); }
  if (need.length) {
    const ms = await kalshi(env, need); const seen = new Set();
    for (const m of ms) { if (!m?.ticker) continue; const v = pack(m); out[m.ticker] = v; cache.set(m.ticker, { v, at: now }); seen.add(m.ticker); }
    for (const t of need) if (!seen.has(t)) { out[t] = null; cache.set(t, { v: null, at: now }); }
  }
  return out;
}
async function liveGames() {
  if (liveCache && Date.now() - liveCache.at < 30000) return liveCache;
  const games = [];
  await Promise.all(Object.entries(ESPN).map(async ([league, [sport, extra]]) => {
    try {
      const r = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${sport}/scoreboard?limit=400${extra}`, { headers: { accept: 'application/json' } });
      if (!r.ok) return;
      for (const e of (await r.json()).events || []) {
        const st = e.status?.type?.state; if (st !== 'in') continue;
        const c = e.competitions?.[0] || {}; const home = (c.competitors || []).find((x) => x.homeAway === 'home'), away = (c.competitors || []).find((x) => x.homeAway === 'away');
        const pr = c.situation?.lastPlay?.probability; const pHome = pr && pr.homeWinPercentage != null ? Math.round(pr.homeWinPercentage * 1000) / 1000 : null;
        games.push({ league, id: String(e.id), state: 'in', clock: e.status.displayClock || '', period: e.status.period || 0, detail: e.status.type?.shortDetail || '', hs: Number(home?.score ?? 0), as: Number(away?.score ?? 0), pHome, done: !!e.status.type?.completed });
      }
    } catch {}
  }));
  return (liveCache = { at: Date.now(), games });
}
const json = (o, status = 200) => Response.json(o, { status, headers: { 'cache-control': 'no-store' } });
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === '/api/prices') {
      const list = [...new Set(String(url.searchParams.get('t') || '').split(',').map((s) => s.trim()).filter((s) => TICKER.test(s)))].slice(0, 100);
      if (!list.length) return json({ at: Date.now(), m: {} });
      try { return json({ at: Date.now(), m: await prices(env, list) }); } catch (e) { return json({ error: String(e.message || e) }, 502); }
    }
    if (url.pathname === '/api/health') return json({ ok: true, keyId: !!(env.KALSHI_KEY_ID || '').trim(), privateKey: !!(env.KALSHI_PRIVATE_KEY || '').trim() }); // never the values, only whether they are set
    if (url.pathname === '/api/live-games') { try { return json(await liveGames()); } catch (e) { return json({ error: String(e.message || e) }, 502); } }
    return env.ASSETS.fetch(req);
  },
};
