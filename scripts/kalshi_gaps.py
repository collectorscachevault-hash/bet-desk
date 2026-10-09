#!/usr/bin/env python3
"""Kalshi vs Polymarket gap finder (non-sports).

Pulls every open non-sports Kalshi market and every active Polymarket market, matches the ones asking the same
question, and lists where Kalshi's price is far from Polymarket's. A big gap is not free money: the two sites can
word the rules differently, Polymarket can be the one that is wrong, and Kalshi charges a fee on wins. It is a list
of places worth reading the rules on, ranked by how far apart the prices are.

Usage: python3 -I scripts/kalshi_gaps.py [--min-gap 0.08] [--out report.md]
No keys needed. Standard library only.
"""
from __future__ import annotations
import argparse, json, re, sys, time, urllib.error, urllib.parse, urllib.request
from datetime import datetime, timezone

KALSHI = "https://api.elections.kalshi.com/trade-api/v2"
POLY = "https://gamma-api.polymarket.com"
SKIP_CATEGORIES = {"sports"}
STOP = set("will the be by on in of a an to at before than or and for is are it its this that with from as after above below over under more less yes no who what which when".split())


def get(url: str, tries: int = 4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"accept": "application/json", "user-agent": "bet-desk-gaps/1.0"})
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r)
        except Exception as e:  # noqa: BLE001
            if i == tries - 1:
                raise
            time.sleep(1.5 * (i + 1))


def kalshi_markets(max_pages: int = 60):
    """Open Kalshi markets (non-sports) with their event title and category."""
    out, cursor = [], ""
    for _ in range(max_pages):
        q = {"status": "open", "with_nested_markets": "true", "limit": 200}
        if cursor:
            q["cursor"] = cursor
        d = get(f"{KALSHI}/events?{urllib.parse.urlencode(q)}")
        for ev in d.get("events", []):
            cat = str(ev.get("category") or "").strip().lower()
            if cat in SKIP_CATEGORIES:
                continue
            for m in ev.get("markets", []) or []:
                if m.get("status") not in ("open", "active"):
                    continue
                try:
                    yb = float(m.get("yes_bid_dollars") if m.get("yes_bid_dollars") is not None else (m.get("yes_bid") or 0) / 100)
                    ya = float(m.get("yes_ask_dollars") if m.get("yes_ask_dollars") is not None else (m.get("yes_ask") or 0) / 100)
                except (TypeError, ValueError):
                    continue
                if ya <= 0 or ya >= 1:
                    continue
                out.append({
                    "ticker": m.get("ticker"), "event": ev.get("title") or "", "sub": m.get("yes_sub_title") or m.get("subtitle") or "",
                    "title": m.get("title") or "", "cat": cat, "bid": yb, "ask": ya, "vol": int(float(m.get("volume_fp") or m.get("volume") or 0)),
                    "close": m.get("close_time") or m.get("expiration_time") or "", "rules": m.get("rules_primary") or "",
                    "url": f"https://kalshi.com/markets/{(m.get('ticker') or '').split('-')[0].lower()}/{(ev.get('event_ticker') or '').lower()}",
                })
        cursor = d.get("cursor") or ""
        if not cursor:
            break
        time.sleep(0.15)
    return out


def poly_markets(max_pages: int = 25):
    """Polymarket caps a page at 100 markets; walk the pages by 24-hour volume."""
    out = []
    for page in range(max_pages):
        q = {"active": "true", "closed": "false", "limit": 100, "offset": page * 100, "order": "volume24hr", "ascending": "false"}
        try:
            d = get(f"{POLY}/markets?{urllib.parse.urlencode(q)}")
        except urllib.error.HTTPError as e:
            if e.code == 422:  # past the deepest page Polymarket allows
                break
            raise
        if not d:
            break
        for m in d:
            try:
                outcomes = json.loads(m.get("outcomes") or "[]"); prices = json.loads(m.get("outcomePrices") or "[]")
            except Exception:  # noqa: BLE001
                continue
            if len(outcomes) != 2 or outcomes[0].lower() != "yes" or len(prices) != 2:
                continue
            yes = float(prices[0])
            if not (0.01 <= yes <= 0.99):
                continue
            evs = m.get("events") or []
            out.append({
                "q": m.get("question") or "", "yes": yes, "liq": float(m.get("liquidity") or 0), "vol24": float(m.get("volume24hr") or 0),
                "end": m.get("endDate") or "", "url": f"https://polymarket.com/event/{(evs[0].get('slug') if evs else m.get('slug')) or ''}",
            })
        if len(d) < 100:
            break
        time.sleep(0.15)
    return out


def tokens(text: str):
    t = re.sub(r"[^a-z0-9.% ]+", " ", text.lower())
    t = re.sub(r"(\d),(\d)", r"\1\2", t)
    words = [w.strip(".") for w in t.split()]
    return {w for w in words if w and w not in STOP and len(w) > 1}


def numbers(text: str):
    return set(re.findall(r"\d+(?:\.\d+)?", text.replace(",", "")))


NEG = re.compile(r"\b(no|not|won't|never|fail|fails|without)\b", re.I)


def negated(text: str) -> bool:
    """'Will there be NO release…' asks the opposite of 'Will there be a release…'."""
    return bool(NEG.search(text))


def day(iso: str):
    try:
        return datetime.fromisoformat(iso.replace("Z", "+00:00")).astimezone(timezone.utc).date()
    except Exception:  # noqa: BLE001
        return None


def fee(p: float) -> float:
    """Kalshi's fee per contract on a win, about 7% of p(1-p)."""
    return 0.07 * p * (1 - p)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--min-gap", type=float, default=0.08)
    ap.add_argument("--min-kalshi-volume", type=int, default=500)
    ap.add_argument("--min-poly-liquidity", type=float, default=5000)
    ap.add_argument("--out", default="")
    a = ap.parse_args()

    k = kalshi_markets(); p = poly_markets()
    print(f"kalshi non-sports open markets: {len(k)}   polymarket yes/no markets: {len(p)}", file=sys.stderr)
    # Index Kalshi markets by word so each Polymarket question only compares against the few that share its words.
    kk = [m for m in k if m["vol"] >= a.min_kalshi_volume and (m["ask"] - m["bid"]) <= 0.10]
    ktok, idx = [], {}
    for i, m in enumerate(kk):
        t = tokens(f"{m['event']} {m['sub']} {m['title']}"); ktok.append(t)
        for w in t:
            idx.setdefault(w, set()).add(i)
    rows, used = [], set()
    for x in p:
        if x["liq"] < a.min_poly_liquidity:
            continue
        pt, pn, pd = tokens(x["q"]), numbers(x["q"]), day(x["end"])
        if len(pt) < 3:
            continue
        cand = {}
        for w in pt:
            hits = idx.get(w, ())
            if len(hits) < 3000:  # a word shared by thousands of markets says nothing
                for i in hits:
                    cand[i] = cand.get(i, 0) + 1
        best = None
        for i in sorted(cand, key=lambda i: -cand[i])[:40]:
            m, kt = kk[i], ktok[i]
            if numbers(f"{m['event']} {m['sub']} {m['title']}") != pn:
                continue
            kd = day(m["close"])
            if kd and pd and abs((kd - pd).days) > 10:
                continue
            if ("run" in kt) != ("run" in pt) or ("win" in kt or "winner" in kt) != ("win" in pt or "winner" in pt):
                continue  # "run for" and "win" are different questions
            j = len(kt & pt) / max(1, len(kt | pt))
            if j >= 0.6 and (best is None or j > best[0]):
                best = (j, i)
        if not best or best[1] in used:
            continue
        j, i = best; used.add(i); m = kk[i]
        mid = (m["bid"] + m["ask"]) / 2
        poly_yes = 1 - x["yes"] if negated(x["q"]) != negated(f"{m['event']} {m['sub']} {m['title']}") else x["yes"]  # same question, opposite wording
        gap = poly_yes - mid
        if abs(gap) < a.min_gap:
            continue
        if gap > 0:  # Polymarket thinks YES is likelier than Kalshi's price: buy YES on Kalshi at the ask
            side, cost, prob = "YES", m["ask"], poly_yes
        else:
            side, cost, prob = "NO", 1 - m["bid"], 1 - poly_yes
        ev = prob * (1 - cost - fee(cost)) - (1 - prob) * cost  # expected profit per $1 contract if Polymarket's price is the truth
        rows.append({"gap": abs(gap), "side": side, "cost": cost, "prob": prob, "ev": ev, "match": j, "k": m, "p": x})
    rows.sort(key=lambda r: -r["ev"])

    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [f"# Kalshi vs Polymarket gaps · {now}", "",
             f"{len(rows)} markets where Kalshi's price is {a.min_gap:.0%}+ away from Polymarket's on what looks like the same question. "
             "Read both rule sets before betting: a gap is often two different questions wearing the same words. "
             "'If Polymarket is right' is the expected profit per $1 contract after Kalshi's fee, assuming Polymarket's price is the true chance.", ""]
    for r in rows[:40]:
        m, x = r["k"], r["p"]
        lines += [f"## Buy {r['side']} at {r['cost']:.2f} on Kalshi · gap {r['gap']:.0%} · if Polymarket is right: {r['ev']*100:+.0f}¢ per $1",
                  f"- Kalshi: {m['event']} — {m['sub'] or m['title']} (yes {m['bid']:.2f}/{m['ask']:.2f}, volume {m['vol']:,}, closes {m['close'][:10]}) {m['url']}",
                  f"- Polymarket: {x['q']} (yes {x['yes']:.2f}{' — opposite wording, so read as ' + format(1 - x['yes'], '.2f') if negated(x['q']) != negated(m['event'] + ' ' + m['sub'] + ' ' + m['title']) else ''}, liquidity ${x['liq']:,.0f}, ends {x['end'][:10]}) {x['url']}",
                  f"- Match confidence {r['match']:.0%} on wording · ticker {m['ticker']}", ""]
    if not rows:
        lines.append("No gaps over the threshold right now.")
    text = "\n".join(lines)
    if a.out:
        open(a.out, "w").write(text)
    print(text)


if __name__ == "__main__":
    main()
