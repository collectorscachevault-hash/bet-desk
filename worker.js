// Bet Desk website: serves the static files and answers /api/prices with live Kalshi numbers
// for the bets a visitor is looking at. Kalshi's public API does not allow browser calls, so the page asks here.
//   GET /api/prices?t=TICKER,TICKER,...   (up to 100)  ->  { at, m: { TICKER: [yesAsk, yesBid, noAsk, open, result] | null } }
// open = 1 while the market can still be traded; result = "yes" | "no" | "" once it has settled. null = Kalshi does not list it.
const KALSHI = 'https://api.elections.kalshi.com/trade-api/v2';
const TICKER = /^KX[A-Z0-9]+-[A-Z0-9-]+$/;
const TTL = 20000; // a price answered within the last 20 s is reused, so many viewers cost one Kalshi call
const cache = new Map(); // ticker -> { v, at }   (lives while this copy of the worker stays warm)
let kLast = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function kalshi(tickers) {
  // Kalshi allows a few requests a second; space them out and retry once when it says slow down.
  for (let i = 0; i < 3; i++) {
    const wait = kLast + 300 - Date.now(); if (wait > 0) await sleep(wait); kLast = Date.now();
    const r = await fetch(`${KALSHI}/markets?tickers=${tickers.join(',')}&limit=${tickers.length}`, { headers: { accept: 'application/json' } });
    if (r.status === 429) { await sleep(900 * (i + 1)); continue; }
    if (!r.ok) throw new Error('kalshi ' + r.status);
    return (await r.json()).markets || [];
  }
  throw new Error('kalshi busy');
}
const num = (x) => { const v = Number(x); return Number.isFinite(v) && v > 0 ? Math.round(v * 100) / 100 : null; };
const pack = (m) => [num(m.yes_ask_dollars ?? (m.yes_ask != null ? m.yes_ask / 100 : null)), num(m.yes_bid_dollars ?? (m.yes_bid != null ? m.yes_bid / 100 : null)), num(m.no_ask_dollars ?? (m.no_ask != null ? m.no_ask / 100 : null)), m.status === 'active' || m.status === 'open' ? 1 : 0, m.result === 'yes' || m.result === 'no' ? m.result : ''];
async function prices(list) {
  const now = Date.now(), out = {}, need = [];
  for (const t of list) { const c = cache.get(t); if (c && now - c.at < TTL) out[t] = c.v; else need.push(t); }
  if (need.length) {
    const ms = await kalshi(need);
    const seen = new Set();
    for (const m of ms) { if (!m?.ticker) continue; const v = pack(m); out[m.ticker] = v; cache.set(m.ticker, { v, at: now }); seen.add(m.ticker); }
    for (const t of need) if (!seen.has(t)) { out[t] = null; cache.set(t, { v: null, at: now }); }
  }
  return out;
}
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === '/api/prices') {
      const list = [...new Set(String(url.searchParams.get('t') || '').split(',').map((s) => s.trim()).filter((s) => TICKER.test(s)))].slice(0, 100);
      if (!list.length) return Response.json({ at: Date.now(), m: {} }, { headers: { 'cache-control': 'no-store' } });
      try { return Response.json({ at: Date.now(), m: await prices(list) }, { headers: { 'cache-control': 'no-store' } }); }
      catch (e) { return Response.json({ error: String(e.message || e) }, { status: 502, headers: { 'cache-control': 'no-store' } }); }
    }
    if (url.pathname === '/api/diag') { // temporary: how does Kalshi answer from here?
      const out = [];
      for (const base of ['https://api.elections.kalshi.com/trade-api/v2', 'https://api.kalshi.com/trade-api/v2', 'https://trading-api.kalshi.com/trade-api/v2']) {
        try { const r = await fetch(base + '/markets?tickers=KXNFLGAME-26OCT12SEAJAX-SEA&limit=1', { headers: { accept: 'application/json', 'user-agent': 'bet-desk/1.0' } }); out.push({ base, status: r.status, server: r.headers.get('server'), ray: r.headers.get('cf-ray'), mit: r.headers.get('cf-mitigated'), retry: r.headers.get('retry-after'), body: (await r.text()).slice(0, 160) }); }
        catch (e) { out.push({ base, err: String(e.message || e) }); }
      }
      return Response.json(out);
    }
    return env.ASSETS.fetch(req);
  },
};
