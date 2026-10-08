# Bet Desk

A sports-betting research tool for Kalshi (NFL, college football, NBA, college basketball, MLB).

- `index.html`, `app.js` — the page (built from the Bet Desk page on claude.ai).
- `data.json` — the latest picks, games and track record. Scheduled jobs replace this file several times a day; Cloudflare Pages republishes the site when it changes.
- `mailbox/worker.js` — a small Cloudflare Worker that holds parlays generated on this site until the scheduled jobs collect them into the tracker.

Hosted on Cloudflare Pages with Cloudflare Access in front (login by email code).
