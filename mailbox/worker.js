// Bet Desk mailbox: a tiny Cloudflare Worker that holds parlays generated on the shared website
// until the scheduled jobs collect them into the tracker. Storage: a KV namespace bound as BOX.
// POST /add  {id, date, name, pick}   -> stores it (30 days)
// GET  /list                           -> {items: [...]} newest 400
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET,POST,OPTIONS', 'access-control-allow-headers': 'content-type' };
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
    if (req.method === 'POST' && url.pathname === '/add') {
      let b; try { b = await req.json(); } catch { return new Response('bad json', { status: 400, headers: CORS }); }
      if (!b || !b.pick || !Array.isArray(b.pick.legs) || b.pick.legs.length < 2 || b.pick.legs.length > 10) return new Response('bad pick', { status: 400, headers: CORS });
      const id = String(b.id || Date.now()).replace(/[^A-Za-z0-9_-]/g, '').slice(0, 60) || String(Date.now());
      const item = { id, date: String(b.date || '').slice(0, 10), name: String(b.name || '').slice(0, 40), at: new Date().toISOString(), pick: b.pick };
      if (JSON.stringify(item).length > 20000) return new Response('too big', { status: 413, headers: CORS });
      await env.BOX.put('p:' + id, JSON.stringify(item), { expirationTtl: 60 * 60 * 24 * 30 });
      return new Response(JSON.stringify({ ok: true, id }), { headers: { 'content-type': 'application/json', ...CORS } });
    }
    if (req.method === 'GET' && url.pathname === '/list') {
      const items = [];
      let cursor; do {
        const page = await env.BOX.list({ prefix: 'p:', cursor });
        for (const k of page.keys) { const v = await env.BOX.get(k.name); if (v) items.push(JSON.parse(v)); }
        cursor = page.list_complete ? null : page.cursor;
      } while (cursor && items.length < 400);
      items.sort((a, b) => (b.at || '').localeCompare(a.at || ''));
      return new Response(JSON.stringify({ items: items.slice(0, 400) }), { headers: { 'content-type': 'application/json', ...CORS } });
    }
    return new Response('Bet Desk mailbox', { headers: CORS });
  },
};
