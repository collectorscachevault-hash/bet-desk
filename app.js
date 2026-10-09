// Bet Desk shared copy: builds the page, then runs the app. Data comes from data.json next to the page.
document.getElementById('app').innerHTML = "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Public+Sans:wght@400;500;600;700&display=swap\">\n<style>\n/* Layout: a trading-desk ticket rail. Sticky header + five tabs; one narrow column of pick \"tickets\" on felt-green ink with scoreboard amber, and a bottom sheet for buying. */\n:root {\n  --bg: #F1F3EE; --surface: #FFFFFF; --surface-2: #F6F7F3; --ink: #15201B; --muted: #5B6760; --line: #D9DED5;\n  --accent: #1F5E46; --accent-ink: #FFFFFF; --accent-soft: #E3EEE8; --amber: #9A6800; --amber-soft: #FBF0D6;\n  --good: #1B7A4B; --good-soft: #E1F2E8; --bad: #B0362D; --bad-soft: #F8E3E0; --push: #5D6178; --push-soft: #E8E9F0;\n  --ai: #5B4BB5; --ai-soft: #ECE9F8; --focus: #C98A00; --shade: rgba(10, 20, 15, .45);\n  --display: \"Barlow Condensed\", \"Arial Narrow\", \"Roboto Condensed\", system-ui, sans-serif;\n  --body: \"Public Sans\", system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif;\n  --r: 10px;\n}\n@media (prefers-color-scheme: dark) {\n  :root:not([data-theme=\"light\"]) {\n    --bg: #0E1412; --surface: #161E1B; --surface-2: #1C2521; --ink: #E7ECE8; --muted: #9AA69F; --line: #2B3632;\n    --accent: #5DB58C; --accent-ink: #0B1310; --accent-soft: #1C3229; --amber: #F0B43C; --amber-soft: #33290F;\n    --good: #52C48C; --good-soft: #17332A; --bad: #F07B6F; --bad-soft: #3A1E1B; --push: #A8ACC4; --push-soft: #252836;\n    --ai: #A99BF2; --ai-soft: #2A2540; --focus: #F0B43C; --shade: rgba(0, 0, 0, .6);\n    color-scheme: dark;\n  }\n}\n:root[data-theme=\"dark\"] {\n  --bg: #0E1412; --surface: #161E1B; --surface-2: #1C2521; --ink: #E7ECE8; --muted: #9AA69F; --line: #2B3632;\n  --accent: #5DB58C; --accent-ink: #0B1310; --accent-soft: #1C3229; --amber: #F0B43C; --amber-soft: #33290F;\n  --good: #52C48C; --good-soft: #17332A; --bad: #F07B6F; --bad-soft: #3A1E1B; --push: #A8ACC4; --push-soft: #252836;\n  --ai: #A99BF2; --ai-soft: #2A2540; --focus: #F0B43C; --shade: rgba(0, 0, 0, .6);\n  color-scheme: dark;\n}\n* { box-sizing: border-box; }\n[hidden] { display: none !important; }\nbody { background: var(--bg); color: var(--ink); font-family: var(--body); font-size: 15px; line-height: 1.5; }\nbutton, input, select { font: inherit; color: inherit; }\n:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }\n.num { font-variant-numeric: tabular-nums; }\np { margin: 0; }\n\n.top { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 5; background: var(--bg); border-bottom: 1px solid var(--line); }\n.top-in { max-width: 880px; margin: 0 auto; padding: 12px 16px 0; display: grid; gap: 8px; }\n.brand { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }\n.brand h1 { margin: 0; font-family: var(--display); font-weight: 700; font-size: 28px; letter-spacing: .04em; text-transform: uppercase; line-height: 1; }\n.brand h1 span { color: var(--amber); }\n.fresh { font-size: 12px; color: var(--muted); }\n.brand .bl { display: grid; gap: 2px; min-width: 0; }\n.theme { border: 1px solid var(--line); background: var(--surface); color: var(--ink); border-radius: 999px; padding: 6px 12px; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }\n.theme:hover { border-color: var(--accent); }\n.tabs { display: flex; gap: 2px; overflow-x: auto; scrollbar-width: none; }\n.tabs::-webkit-scrollbar { display: none; }\n.tab { flex: 1 0 auto; border: 0; background: none; padding: 8px 10px 10px; font-family: var(--display); font-size: 17px; font-weight: 600; letter-spacing: .03em; text-transform: uppercase; color: var(--muted); border-bottom: 3px solid transparent; cursor: pointer; white-space: nowrap; }\n.tab[aria-selected=\"true\"] { color: var(--ink); border-bottom-color: var(--amber); }\n.tab .count { display: inline-block; min-width: 20px; padding: 0 6px; margin-left: 4px; border-radius: 10px; background: var(--amber); color: var(--surface); font-family: var(--body); font-size: 12px; font-weight: 700; line-height: 20px; text-align: center; }\n\nmain { max-width: 880px; margin: 0 auto; padding-inline: 16px; padding-block: 16px 120px; }\nsection[role=\"tabpanel\"] { display: grid; gap: 14px; }\nh2 { margin: 0; font-family: var(--display); font-weight: 700; font-size: 25px; letter-spacing: .02em; text-transform: uppercase; text-wrap: balance; line-height: 1.1; }\nh3 { margin: 0; font-family: var(--display); font-weight: 600; font-size: 18px; letter-spacing: .04em; text-transform: uppercase; color: var(--muted); }\n.lede { color: var(--muted); max-width: 64ch; }\n.card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 14px 16px; display: grid; gap: 10px; min-width: 0; }\n.banner { background: var(--amber-soft); border: 1px solid var(--line); border-radius: var(--r); padding: 12px 14px; font-size: 14px; }\n.empty { text-align: center; padding: 26px 16px; color: var(--muted); display: grid; gap: 8px; justify-items: center; }\n.empty strong { color: var(--ink); font-size: 16px; }\n\n.btn { border: 1px solid var(--line); background: var(--surface); border-radius: 8px; padding: 9px 14px; font-weight: 600; cursor: pointer; }\n.btn:hover { border-color: var(--muted); }\n.btn.primary { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }\n.btn.small { padding: 5px 10px; font-size: 13px; }\n.btn.good { color: var(--good); } .btn.bad { color: var(--bad); } .btn.pushc { color: var(--push); }\n.btn.danger { color: var(--bad); border-color: var(--bad); }\n.btn:disabled { opacity: .5; cursor: not-allowed; }\n.link { border: 0; background: none; padding: 0; color: var(--accent); font-weight: 600; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }\n.row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }\n\n.chips { display: flex; gap: 6px; flex-wrap: wrap; }\n.chip { border: 1px solid var(--line); background: var(--surface); border-radius: 999px; padding: 5px 12px; font-size: 13px; font-weight: 600; cursor: pointer; }\n.chip[aria-pressed=\"true\"] { background: var(--ink); color: var(--bg); border-color: var(--ink); }\n.chip .c { color: var(--muted); font-weight: 500; margin-left: 4px; }\n.chip[aria-pressed=\"true\"] .c { color: inherit; opacity: .7; }\n.seg { display: flex; flex-wrap: wrap; gap: 4px; border: 1px solid var(--line); border-radius: 10px; padding: 4px; background: var(--surface); }\n.seg button { flex: 1 0 auto; border: 0; background: none; padding: 8px 12px; border-radius: 7px; font-weight: 600; font-size: 14px; cursor: pointer; white-space: nowrap; color: var(--muted); }\n.seg button[aria-pressed=\"true\"] { background: var(--ink); color: var(--bg); }\n\n/* filters */\n.filters { display: flex; gap: 10px 16px; flex-wrap: wrap; align-items: center; justify-content: space-between; }\n.switch { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; cursor: pointer; user-select: none; }\n.switch input { position: absolute; opacity: 0; width: 1px; height: 1px; }\n.switch .track { width: 38px; height: 22px; border-radius: 11px; background: var(--line); position: relative; flex-shrink: 0; }\n.switch .track::after { content: \"\"; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: var(--surface); box-shadow: 0 1px 2px rgba(0,0,0,.25); }\n.switch input:checked + .track { background: var(--accent); }\n.switch input:checked + .track::after { left: 19px; }\n.switch input:focus-visible + .track { outline: 2px solid var(--focus); outline-offset: 2px; }\n.seg.small button { padding: 6px 10px; font-size: 13px; }\n.pick-head { display: grid; gap: 1px; padding-bottom: 6px; border-bottom: 1px dashed var(--line); }\n.hrow { display: grid; gap: 5px; padding: 10px 0; border-bottom: 1px solid var(--line); }\n.hrow:last-child { border-bottom: 0; }\n.hrow .hl { display: grid; gap: 3px; }\n.hrow .lg { font-size: 14px; } .hrow .lg i { display: block; font-style: normal; font-size: 12px; color: var(--muted); padding-left: 18px; }\n.hrow .lg.won { color: var(--good); } .hrow .lg.lost { color: var(--bad); }\n.pick-head b { font-family: var(--display); font-size: 17px; letter-spacing: .05em; text-transform: uppercase; color: var(--amber); }\n.pick-head span { font-size: 13px; color: var(--muted); }\n.legs-list { display: grid; gap: 4px; }\n.leg-row { display: flex; justify-content: space-between; gap: 10px; align-items: center; text-align: left; border: 1px solid var(--line); background: var(--surface-2); border-radius: 8px; padding: 7px 10px; cursor: pointer; width: 100%; }\n.leg-row:hover { border-color: var(--accent); }\n.leg-row .n { min-width: 0; display: grid; }\n.leg-row .n b { font-weight: 600; overflow-wrap: anywhere; }\n.leg-row .n span { font-size: 12px; color: var(--muted); }\n.leg-row > .num { flex-shrink: 0; font-family: var(--display); font-size: 18px; font-weight: 700; }\n.leg-row > .num .hint { font-family: var(--body); font-size: 12px; font-weight: 500; }\n@media (prefers-reduced-motion: no-preference) { .switch .track, .switch .track::after { transition: background .15s, left .15s; } }\n\n/* pick tickets */\n.picks { display: grid; gap: 10px; }\n.pick { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 12px 14px; display: grid; gap: 8px; }\n.pick.ai { border-color: var(--ai); }\n.pick-meta { display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap; font-size: 12px; color: var(--muted); }\n.pick-meta .lg { font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }\n.pick-main { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }\n.pick-main .what { min-width: 0; }\n.pick-main .what b { display: block; font-family: var(--display); font-size: 22px; font-weight: 700; line-height: 1.1; overflow-wrap: anywhere; }\n.pick-main .what span { font-size: 13.5px; color: var(--muted); }\n.buy { flex-shrink: 0; border: 1px solid var(--accent); background: var(--accent-soft); color: var(--ink); border-radius: 8px; padding: 6px 10px; text-align: center; cursor: pointer; line-height: 1.15; min-width: 84px; }\n.buy .s { display: block; font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--accent); }\n.buy .p { display: block; font-family: var(--display); font-size: 22px; font-weight: 700; }\n.facts-inline { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 13px; }\n.facts-inline b { font-variant-numeric: tabular-nums; }\n.pill { display: inline-block; border-radius: 999px; padding: 1px 9px; font-size: 11.5px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; white-space: nowrap; }\n.pill.high { background: var(--good-soft); color: var(--good); }\n.pill.medium { background: var(--amber-soft); color: var(--amber); }\n.pill.low { background: var(--push-soft); color: var(--push); }\n.pill.ai { background: var(--ai-soft); color: var(--ai); }\n.pill.won { background: var(--good-soft); color: var(--good); }\n.pill.lost { background: var(--bad-soft); color: var(--bad); }\n.pill.void { background: var(--push-soft); color: var(--push); }\n.pill.pending { background: var(--amber-soft); color: var(--amber); }\n.why { font-size: 14px; border-left: 3px solid var(--ai); padding-left: 10px; color: var(--ink); }\n.pos { color: var(--good); } .neg { color: var(--bad); }\n.why-link { justify-self: start; font-size: 14px; text-decoration: none; }\n.why-details { border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; }\n.why-details summary { font-family: var(--display); font-size: 18px; letter-spacing: .04em; text-transform: uppercase; }\n.whybox { display: grid; gap: 6px; margin-top: 10px; font-size: 14px; }\n.whybox.ai { border-left: 3px solid var(--ai); padding-left: 10px; }\n.whybox ul { margin: 0; padding-left: 18px; display: grid; gap: 5px; }\na.btn { text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }\n.btn.kalshi { width: 100%; font-size: 16px; min-height: 48px; }\n\n/* games */\n.day { display: grid; gap: 8px; }\n.game-row { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 10px 14px; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 4px 12px; align-items: center; cursor: pointer; text-align: left; width: 100%; }\n.game-row:hover { border-color: var(--accent); }\n.game-row .m { font-family: var(--display); font-size: 20px; font-weight: 700; line-height: 1.15; overflow-wrap: anywhere; }\n.game-row .s { font-size: 12.5px; color: var(--muted); grid-column: 1 / -1; }\n.game-row .px { text-align: right; font-size: 13px; color: var(--muted); }\n.game-row .px b { font-family: var(--display); font-size: 18px; color: var(--ink); }\n.badge { display: inline-block; font-size: 11.5px; font-weight: 700; border-radius: 6px; padding: 1px 7px; background: var(--good-soft); color: var(--good); margin-left: 6px; }\n.back { display: inline-flex; gap: 6px; align-items: center; border: 0; background: none; color: var(--accent); font-weight: 700; cursor: pointer; padding: 0; }\n.ghead { display: grid; gap: 4px; }\n.ghead .m { font-family: var(--display); font-size: 30px; font-weight: 700; line-height: 1.05; }\n.ghead .s { color: var(--muted); font-size: 14px; }\n.mlist { display: grid; }\n.mrow { display: grid; grid-template-columns: 22px minmax(0, 1fr) auto; gap: 8px; align-items: center; padding: 9px 0; border-bottom: 1px solid var(--line); }\n.mrow .rk { font-family: var(--display); font-size: 18px; font-weight: 700; color: var(--amber); text-align: center; }\n.mrow .acts { display: grid; gap: 5px; }\n.mrow .acts .addp { min-height: 40px; padding: 4px 8px; font-size: 12px; }\n.mrow .ch.num { display: block; text-align: left; margin-top: 2px; }\n.mrow .ch b { display: inline; font-family: var(--display); font-size: 17px; margin-right: 5px; }\n.mrow .ch b.high { color: var(--good); } .mrow .ch b.low { color: var(--muted); }\n.mrow:last-child { border-bottom: 0; }\n.mrow .n { min-width: 0; }\n.mrow .n b { display: block; overflow-wrap: anywhere; font-weight: 600; }\n.mrow .n span { font-size: 12.5px; color: var(--muted); }\n.mrow .ch { font-size: 12.5px; color: var(--muted); }\n.mbtn { border: 1px solid var(--line); background: var(--surface-2); border-radius: 8px; padding: 5px 8px; min-width: 70px; text-align: center; cursor: pointer; line-height: 1.15; }\n.mbtn:hover { border-color: var(--accent); background: var(--accent-soft); }\n.mbtn .s { display: block; font-size: 10.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }\n.mbtn .p { display: block; font-family: var(--display); font-size: 19px; font-weight: 700; }\n.player { display: grid; gap: 8px; padding: 12px 0; border-bottom: 1px solid var(--line); }\n.player:last-child { border-bottom: 0; }\n.player .nm { display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap; align-items: baseline; }\n.player .nm b { font-size: 16px; }\n.form { font-size: 13px; color: var(--muted); }\n.trow { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--line); }\n.trow:last-child { border-bottom: 0; }\n.tmain { display: grid; grid-template-columns: 26px minmax(0, 1fr) auto; gap: 10px; align-items: center; text-align: left; border: 0; background: none; padding: 0; cursor: pointer; min-width: 0; }\n.tmain .rk { font-family: var(--display); font-size: 20px; font-weight: 700; color: var(--amber); text-align: center; }\n.tmain .n { min-width: 0; display: grid; }\n.tmain .n b { font-weight: 600; overflow-wrap: anywhere; }\n.tmain .n span { font-size: 12.5px; color: var(--muted); }\n.tmain .ch { text-align: right; font-size: 12.5px; color: var(--muted); white-space: nowrap; }\n.tmain .ch b { display: block; font-family: var(--display); font-size: 20px; color: var(--ink); line-height: 1.1; }\n.tmain .ch .usd { display: block; color: var(--ink); font-weight: 600; }\n.addp { border: 1px solid var(--accent); color: var(--accent); background: var(--surface); border-radius: 8px; padding: 6px 9px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; min-height: 40px; }\n.addp[aria-pressed=\"true\"] { background: var(--accent); color: var(--accent-ink); }\n.agree { display: block; font-size: 12px; margin-top: 3px; }\n.tmain .agree .y { color: var(--good); font-weight: 600; } .tmain .agree .n { color: var(--bad); font-weight: 600; } .tmain .agree b { color: var(--ink); font-weight: 600; }\n.tier { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }\n.ladder { display: grid; grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)); gap: 6px; }\n.ladder span { display: grid; text-align: center; border: 1px solid var(--line); border-radius: 8px; padding: 4px 2px; font-size: 11px; color: var(--muted); line-height: 1.25; }\n.ladder span b { font-family: var(--display); font-size: 16px; color: var(--ink); }\n.ladder span.done { border-color: var(--good); background: var(--good-soft); }\n.ladder span.now { border-color: var(--amber); background: var(--amber-soft); }\n.bigstat { font-family: var(--display); font-size: 34px; font-weight: 700; line-height: 1; }\n.pname { border: 0; background: none; padding: 0; font: inherit; font-weight: 700; color: var(--accent); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; text-align: left; }\n.pline { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 8px; align-items: center; padding: 9px 0; border-bottom: 1px solid var(--line); }\n.pline:last-child { border-bottom: 0; }\n.pline .n b { display: block; font-weight: 600; }\n.pline .n > span { display: block; font-size: 12.5px; color: var(--muted); margin-top: 2px; }\n.hr { display: inline-block; min-width: 38px; padding: 1px 6px; border-radius: 6px; font-weight: 700; font-size: 12.5px; text-align: center; background: var(--surface-2); }\n.hr.hot { background: var(--good-soft); color: var(--good); }\n.hr.cold { background: var(--bad-soft); color: var(--bad); }\n.glog { display: flex; flex-wrap: wrap; gap: 6px; }\n.glog span { display: grid; text-align: center; border: 1px solid var(--line); border-radius: 8px; padding: 3px 7px; min-width: 52px; font-size: 11.5px; color: var(--muted); line-height: 1.25; }\n.glog span b { font-family: var(--display); font-size: 18px; color: var(--ink); }\n.glog span.hit { border-color: var(--good); background: var(--good-soft); }\n.presults { display: grid; gap: 6px; }\n.spark { display: flex; gap: 3px; align-items: flex-end; height: 34px; }\n.spark i { display: block; width: 12px; background: var(--accent-soft); border-top: 2px solid var(--accent); }\n.spark i.hit { background: var(--accent); }\n.lines { display: flex; gap: 6px; flex-wrap: wrap; }\n.lines .mbtn { min-width: 0; padding: 4px 8px; }\n.lines .mbtn .p { font-size: 16px; }\n.lines .mbtn.edge { border-color: var(--good); }\n\n/* sheet */\n.shade { position: fixed; inset: 0; background: var(--shade); z-index: 20; }\n.sheet { position: fixed; left: 0; right: 0; bottom: 0; z-index: 21; background: var(--surface); border-top: 1px solid var(--line); border-radius: 16px 16px 0 0; max-height: 88%; overflow-y: auto; padding: 16px 16px calc(18px + env(safe-area-inset-bottom, 0px)); }\n.sheet-in { max-width: 640px; margin: 0 auto; display: grid; gap: 12px; }\n.sheet .x { position: absolute; right: 8px; top: 6px; border: 0; background: none; font-size: 26px; line-height: 1; color: var(--muted); cursor: pointer; width: 44px; height: 44px; display: grid; place-items: center; }\n.sidepick { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }\n.sidepick button { border: 1px solid var(--line); background: var(--surface-2); border-radius: 10px; padding: 10px; cursor: pointer; text-align: left; line-height: 1.2; }\n.sidepick button[aria-pressed=\"true\"] { border-color: var(--accent); background: var(--accent-soft); box-shadow: inset 0 0 0 1px var(--accent); }\n.sidepick b { display: block; font-family: var(--display); font-size: 22px; }\n.sidepick span { font-size: 12.5px; color: var(--muted); }\n.facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px; }\n.fact { background: var(--surface-2); border-radius: 8px; padding: 9px 11px; display: grid; gap: 1px; }\n.fact .k { font-size: 12px; color: var(--muted); font-weight: 600; }\n.fact .v { font-family: var(--display); font-size: 24px; font-weight: 700; line-height: 1.1; }\n.fact .e { font-size: 12px; color: var(--muted); }\n.verdict { border-radius: 10px; padding: 12px 14px; display: grid; gap: 3px; border: 1px solid var(--line); }\n.verdict .t { font-family: var(--display); font-size: 22px; font-weight: 700; text-transform: uppercase; letter-spacing: .03em; line-height: 1.1; }\n.verdict.good { background: var(--good-soft); } .verdict.good .t { color: var(--good); }\n.verdict.thin { background: var(--amber-soft); } .verdict.thin .t { color: var(--amber); }\n.verdict.bad { background: var(--bad-soft); } .verdict.bad .t { color: var(--bad); }\nlabel.f { display: grid; gap: 4px; font-size: 13px; font-weight: 600; color: var(--muted); }\n.in { border: 1px solid var(--line); background: var(--surface-2); border-radius: 8px; padding: 9px 11px; width: 100%; font-size: 16px; color: var(--ink); }\n.in:focus { border-color: var(--accent); }\n.fields { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }\n.hint { font-size: 12.5px; color: var(--muted); font-weight: 400; }\n\n/* record */\n.tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }\n.tiles.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n.tiles.three .tile .v { font-size: 26px; }\n.tile { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 12px 14px; display: grid; gap: 2px; }\n.tile .k { font-size: 12px; color: var(--muted); font-weight: 600; }\n.tile .v { font-family: var(--display); font-size: 32px; font-weight: 700; line-height: 1.05; }\n.tile .e { font-size: 12px; color: var(--muted); }\n.tbl-wrap { overflow-x: auto; }\ntable { border-collapse: collapse; width: 100%; font-size: 14px; }\nth, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--line); white-space: nowrap; }\nth { font-size: 11.5px; letter-spacing: .07em; text-transform: uppercase; color: var(--muted); font-weight: 700; }\ntd.r, th.r { text-align: right; }\ntable.hits td { vertical-align: middle; }\n.standout { margin: 0; padding-left: 18px; display: grid; gap: 8px; font-size: 14.5px; }\ntable.hits td:first-child { white-space: normal; min-width: 96px; }\ntable.hits th, table.hits td { padding: 8px 5px; }\ntable.hits .bar { min-width: 64px; }\n.bar { height: 8px; border-radius: 4px; background: var(--surface-2); position: relative; min-width: 80px; }\n/* Parlay card: one leg per row with a status mark, like a betting-app slip */\n.pk { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 14px; display: grid; gap: 8px; }\n.pk.won { border-color: var(--good); } .pk.lost { border-color: var(--bad); } .pk.ai { border-color: var(--ai); }\n.pk-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }\n.pk-top .t { min-width: 0; } .pk-top .t b { display: block; font-family: var(--display); font-size: 20px; font-weight: 700; letter-spacing: .03em; text-transform: uppercase; line-height: 1.1; }\n.pk-top .t span { font-size: 12.5px; color: var(--muted); }\n.pk-pay { text-align: right; flex-shrink: 0; } .pk-pay b { display: block; font-family: var(--display); font-size: 26px; font-weight: 700; color: var(--amber); line-height: 1; } .pk-pay span { font-size: 12.5px; color: var(--muted); }\n.pk-legs { display: grid; }\n.leg { display: grid; grid-template-columns: 22px minmax(0, 1fr) auto; gap: 4px 10px; align-items: start; padding: 9px 0; border-top: 1px solid var(--line); }\n.leg button.lt { background: none; border: 0; padding: 0; margin: 0; text-align: left; color: inherit; font: inherit; cursor: pointer; } .leg button.lt:hover b { color: var(--accent); }\n.leg .lp { display: grid; justify-items: end; gap: 2px; } .leg .lp a { font-family: var(--body); font-size: 12px; font-weight: 700; color: var(--accent); text-decoration: none; white-space: nowrap; }\n.leg .dot { width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--line); display: grid; place-items: center; font-size: 12px; font-weight: 800; margin-top: 2px; color: #fff; }\n.leg.won .dot { background: var(--good); border-color: var(--good); } .leg.lost .dot { background: var(--bad); border-color: var(--bad); } .leg.void .dot { background: var(--push); border-color: var(--push); }\n.leg.live .dot { border-color: var(--amber); } .leg.live .dot i { width: 8px; height: 8px; border-radius: 50%; background: var(--amber); animation: pulse 1.2s infinite; }\n.leg .lt { min-width: 0; display: grid; gap: 3px; } .leg .lt b { font-weight: 600; overflow-wrap: anywhere; } .leg .lt span { font-size: 12.5px; color: var(--muted); }\n.leg.won .lt b { color: var(--good); } .leg.lost .lt b { color: var(--bad); } .leg.live .lt .st { color: var(--amber); font-weight: 600; }\n.leg .lp { font-family: var(--display); font-weight: 700; font-size: 16px; white-space: nowrap; }\n.pbar { height: 6px; border-radius: 3px; background: var(--surface-2); overflow: hidden; margin-top: 2px; } .pbar i { display: block; height: 100%; background: var(--accent); border-radius: 3px; }\n.leg.won .pbar i { background: var(--good); } .leg.lost .pbar i { background: var(--bad); } .leg.live .pbar i { background: var(--amber); }\n.pk-foot { display: flex; justify-content: space-between; align-items: center; gap: 10px; font-size: 13px; color: var(--muted); flex-wrap: wrap; border-top: 1px solid var(--line); padding-top: 8px; }\n.pk-foot .why { margin: 0; }\n.steps { display: grid; grid-auto-flow: column; gap: 4px; height: 10px; } .steps i { display: block; border-radius: 3px; background: var(--surface-2); border: 1px solid var(--line); } .steps i.hit { background: var(--good); border-color: var(--good); } .steps i.live { background: var(--amber-soft); border-color: var(--amber); }\n@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }\n.klinks summary { list-style: none; cursor: pointer; } .klinks summary::-webkit-details-marker { display: none; }\n.klinks div { display: grid; gap: 4px; margin-top: 6px; } .klinks a { display: block; font-size: 13px; color: var(--accent); font-weight: 600; text-decoration: none; }\n.acts2 { display: grid; gap: 4px; } .addp.kal { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); text-decoration: none; text-align: center; }\n.pk-pay .usd { display: block; font-size: 12.5px; color: var(--ink); font-weight: 600; }\n.pk-foot .ib[aria-pressed=\"true\"] { background: var(--amber-soft); color: var(--amber); border-color: var(--amber); }\n.bar i { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 4px; background: var(--accent); }\n.bar u { position: absolute; top: -3px; bottom: -3px; width: 2px; background: var(--amber); }\n.bet { display: grid; gap: 6px; padding: 11px 0; border-bottom: 1px solid var(--line); }\n.bet:last-child { border-bottom: 0; }\n.bet-top { display: flex; justify-content: space-between; gap: 10px; align-items: flex-start; }\n.bet-top .n { min-width: 0; }\n.bet-top .n b { overflow-wrap: anywhere; }\n.bet-top .n .s { font-size: 12.5px; color: var(--muted); }\n.bet-top .amt { text-align: right; flex-shrink: 0; }\n.bet-top .amt .p { font-family: var(--display); font-size: 20px; font-weight: 700; }\n.bet-top .amt .s { font-size: 12.5px; color: var(--muted); }\n.sublegs { font-size: 13px; color: var(--muted); display: grid; gap: 2px; }\n.chart svg { width: 100%; height: auto; display: block; }\n.chart .grid-l { stroke: var(--line); stroke-width: 1; }\n.chart .zero { stroke: var(--muted); stroke-width: 1; stroke-dasharray: 4 4; }\n.chart .ln { fill: none; stroke: var(--accent); stroke-width: 2.5; stroke-linejoin: round; }\n.chart .ln2 { fill: none; stroke: var(--ai); stroke-width: 2.5; stroke-linejoin: round; }\n.chart text { fill: var(--muted); font-size: 12px; font-family: var(--body); }\n.legend { display: flex; gap: 14px; font-size: 12.5px; color: var(--muted); }\n.legend i { display: inline-block; width: 14px; height: 3px; vertical-align: middle; margin-right: 5px; background: var(--accent); }\n.legend i.ai { background: var(--ai); }\n\ndetails summary { cursor: pointer; font-weight: 600; }\ndetails .body { margin-top: 8px; display: grid; gap: 8px; color: var(--muted); font-size: 14px; max-width: 66ch; }\n.foot { max-width: 880px; margin: 0 auto; padding-inline: 16px; padding-block: 0 32px; font-size: 12.5px; color: var(--muted); }\n.tab svg { display: none; }\n.tab .short { display: none; }\n/* Phone: the sections move to a bottom bar within thumb reach, everything gets bigger tap targets */\n@media (max-width: 700px) {\n  .top-in { padding-top: 10px; padding-bottom: 10px; gap: 0; }\n  .brand h1 { font-size: 24px; }\n  .tabs { position: fixed; left: 0; right: 0; bottom: 0; z-index: 15; background: var(--surface); border-top: 1px solid var(--line); padding: 2px 4px calc(2px + env(safe-area-inset-bottom, 0px)); gap: 0; overflow: visible; box-shadow: 0 -2px 10px rgba(0,0,0,.06); }\n  .tab { flex: 1 1 0; min-width: 0; position: relative; display: grid; justify-items: center; gap: 2px; padding: 7px 2px 6px; font-size: 13px; letter-spacing: .02em; border-bottom: 0; border-top: 3px solid transparent; }\n  .tab[aria-selected=\"true\"] { border-top-color: var(--amber); border-bottom-color: transparent; color: var(--ink); }\n  .tab svg { display: block; width: 22px; height: 22px; }\n  .tab .long { display: none; } .tab .short { display: inline; }\n  .tab .count { position: absolute; top: 2px; left: calc(50% + 6px); margin: 0; min-width: 18px; line-height: 18px; font-size: 11px; }\n  main { padding-block: 14px calc(96px + env(safe-area-inset-bottom, 0px)); }\n  .foot { padding-block: 0 calc(96px + env(safe-area-inset-bottom, 0px)); }\n  .toast { bottom: calc(80px + env(safe-area-inset-bottom, 0px)) !important; }\n  .filters { display: grid; gap: 8px; }\n  .filters .chips, .chips.slots { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; margin-inline: -16px; padding-inline: 16px; }\n  .filters .chips::-webkit-scrollbar, .chips.slots::-webkit-scrollbar { display: none; }\n  .chip { padding: 8px 14px; font-size: 14px; white-space: nowrap; flex-shrink: 0; }\n  .seg button { min-height: 40px; }\n  .mbtn { min-height: 46px; min-width: 74px; }\n  .buy { min-height: 52px; }\n  .btn { min-height: 42px; }\n  .btn.small { min-height: 36px; }\n  .pick-main .what b { font-size: 21px; }\n  .card { padding: 13px 14px; }\n}\n.toast { position: fixed; left: 50%; bottom: calc(18px + env(safe-area-inset-bottom, 0px)); transform: translateX(-50%); background: var(--ink); color: var(--bg); padding: 10px 16px; border-radius: 8px; font-weight: 600; font-size: 14px; max-width: calc(100% - 32px); z-index: 30; }\n@media (prefers-reduced-motion: no-preference) { .btn, .chip, .mbtn, .buy, .game-row { transition: background .12s, border-color .12s; } }\n</style>\n\n<header class=\"top\">\n  <div class=\"top-in\">\n    <div class=\"brand\">\n      <div class=\"bl\"><h1>Bet <span>Desk</span></h1><div class=\"fresh\" id=\"fresh\">Loading\u2026</div></div>\n      <button class=\"theme\" id=\"themeBtn\" type=\"button\" aria-label=\"Switch to light mode\">\u2600 Light</button>\n    </div>\n    <nav class=\"tabs\" role=\"tablist\" aria-label=\"Sections\">\n      <button class=\"tab\" role=\"tab\" id=\"t-picks\" data-tab=\"picks\" aria-controls=\"p-picks\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z\"/></svg><span>Picks</span></button>\n      <button class=\"tab\" role=\"tab\" id=\"t-parlays\" data-tab=\"parlays\" aria-controls=\"p-parlays\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3l9 5-9 5-9-5z\"/><path d=\"M3 13l9 5 9-5\"/></svg><span>Parlays</span></button>\n      <button class=\"tab\" role=\"tab\" id=\"t-games\" data-tab=\"games\" aria-controls=\"p-games\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M3 10h18M8 3v4M16 3v4\"/></svg><span>Build</span><span class=\"count\" id=\"comboCount\" hidden>0</span></button>\n      <button class=\"tab\" role=\"tab\" id=\"t-record\" data-tab=\"record\" aria-controls=\"p-record\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 20V10M10 20V4M16 20v-8M22 20H2\"/></svg><span class=\"long\">Track record</span><span class=\"short\">Record</span></button>\n      <button class=\"tab\" role=\"tab\" id=\"t-mine\" data-tab=\"mine\" aria-controls=\"p-mine\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"6\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"M16 13h2M3 10h18M7 6V4h10v2\"/></svg><span>My bets</span></button>\n    </nav>\n  </div>\n</header>\n\n<main>\n  <div class=\"banner\" id=\"nodb\" hidden>This view can't load your data. Open Bet Desk from your Claude account to see picks, games and your record.</div>\n  <div class=\"banner\" id=\"sharedNote\" hidden>You're viewing a shared copy of Bet Desk. Picks, games, parlays and the track record update for you too. Logging bets is turned off here.</div>\n  <section role=\"tabpanel\" id=\"p-picks\" aria-labelledby=\"t-picks\"></section>\n  <section role=\"tabpanel\" id=\"p-parlays\" aria-labelledby=\"t-parlays\" hidden></section>\n  <section role=\"tabpanel\" id=\"p-games\" aria-labelledby=\"t-games\" hidden></section>\n  <section role=\"tabpanel\" id=\"p-combo\" aria-labelledby=\"t-combo\" hidden></section>\n  <section role=\"tabpanel\" id=\"p-record\" aria-labelledby=\"t-record\" hidden></section>\n  <section role=\"tabpanel\" id=\"p-chal\" aria-labelledby=\"t-chal\" hidden></section>\n  <section role=\"tabpanel\" id=\"p-mine\" aria-labelledby=\"t-mine\" hidden></section>\n</main>\n<footer class=\"foot\">Prices come from Kalshi. On the website they refresh live for whatever is on screen; always confirm the price in the Kalshi app before you buy. Nothing here is a guarantee: even an 80 means it loses one time in five.</footer>\n<div id=\"sheetRoot\"></div>\n<div class=\"toast\" id=\"toast\" role=\"status\" aria-live=\"polite\" hidden></div>\n\n";

(() => {
  // ---------- constants + helpers ----------
  const LG = { nfl: { label: 'NFL', unit: 'points' }, cfb: { label: 'College Football', unit: 'points' }, nba: { label: 'NBA', unit: 'points' }, cbb: { label: 'College Basketball', unit: 'points' }, mlb: { label: 'MLB', unit: 'runs' } };
  const STAT = { passYds: 'passing yards', rushYds: 'rushing yards', recYds: 'receiving yards', rec: 'catches', passTD: 'passing TDs', rrYds: 'rushing + receiving yards', anyTD: 'touchdowns', pts: 'points', reb: 'rebounds', ast: 'assists', threes: 'threes made', pra: 'points + rebounds + assists', hits: 'hits', hr: 'home runs', tb: 'total bases', ks: 'strikeouts (pitching)', hrr: 'hits + runs + RBIs' };
  const fee = (p, c = 10) => Math.ceil(0.07 * c * p * (1 - p) * 100) / 100 / c; // Kalshi's fee per $1 contract, rounded up to the cent per order (10-contract order assumed)
  const cents = (p) => p == null ? '—' : p < 0.095 && Math.round(p * 1000) % 10 ? (p * 100).toFixed(1) + '¢' : Math.round(p * 100) + '¢';
  const pct = (p, dp = 0) => p == null || !isFinite(p) ? '—' : (p * 100).toFixed(dp) + '%';
  const money = (n, signed) => { const a = Math.abs(n); const s = a >= 1000 ? Math.round(a).toLocaleString() : a.toFixed(2).replace(/\.00$/, ''); return (n < 0 ? '−$' : signed && n > 0 ? '+$' : '$') + s; };
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const edgeTxt = (e) => { if (e == null) return '—'; const c = Math.round(e * 100); return c === 0 ? '0¢' : (c > 0 ? '+' : '−') + Math.abs(c) + '¢'; };
  const tn = (t) => t?.short || t?.name || t?.display || t?.abbr || '';
  const dayKey = (d) => { d = new Date(d); return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(); };
  function dayLabel(iso) { const t = new Date(), tm = new Date(); tm.setDate(t.getDate() + 1); if (dayKey(iso) === dayKey(t)) return 'Today'; if (dayKey(iso) === dayKey(tm)) return 'Tomorrow'; return new Date(iso).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }); }
  const timeOf = (iso) => new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  const whenOf = (iso) => dayLabel(iso) + ' ' + timeOf(iso);
  const worthUpTo = (fair) => { if (fair < 0.05) return Math.floor(fair * 0.9 * 1000) / 1000; let p = fair - 0.01; for (let i = 0; i < 4; i++) p = fair - 0.01 - fee(p); return Math.max(0.01, Math.floor(p * 100) / 100); };
  const store = { get(k, d) { try { const v = localStorage.getItem('betdesk2:' + k); return v == null ? d : JSON.parse(v); } catch { return d; } }, set(k, v) { try { localStorage.setItem('betdesk2:' + k, JSON.stringify(v)); } catch {} } };
  const $ = (id) => document.getElementById(id);
  // Dark by default; the switch in the header flips it and remembers the choice on this device.
  const applyTheme = (t) => { document.documentElement.dataset.theme = t; const b = $('themeBtn'); if (b) { b.textContent = t === 'dark' ? '☀ Light' : '☾ Dark'; b.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'); } };
  applyTheme(store.get('theme', 'dark'));
  $('themeBtn').addEventListener('click', () => { const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; store.set('theme', t); applyTheme(t); });
  let toastT; function toast(m) { const t = $('toast'); t.textContent = m; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), 2600); }

  // ---------- state ----------
  let db = null, dbState = 'loading';
  let owner = true; // only the owner sees and logs personal bets; shared viewers get everything else
  let feed = {}, games = [], gameByKey = {}, mkt = {}, rowByT = {}, gameByT = {}, legMeta = {}, index = null, results = {};
  let research = {}, picklog = {}, genDocs = {}, bets = [], settings = { bankroll: null };
  let userCap = null, myId = null; const names = {}; // viewer identity and a cache of other people's display names
  let tab = store.get('tab', 'picks'), pickCat = store.get('pickCat', 'value');
  tab = 'picks'; // every visit opens on the best parlay right now
  let parlaysView = store.get('parlaysView', 'today');
  if (pickCat === 'combos') pickCat = 'parlays';
  if (pickCat === 'plan' || !store.get('sureSeen', false)) { pickCat = 'sure'; store.set('pickCat', pickCat); store.set('sureSeen', true); }
  let sport = store.get('sport', 'all'), college = true, slot = store.get('slot', 'all');
  let legsN = store.get('legsN', 2), parlayMode = store.get('parlayMode', 'likely'), parlayProps = store.get('parlayProps', false);
  let weeklyDocs = {};
  let acct = null; // owner's own Kalshi account, synced read-only into settings/account
  let chal = null; // the 100 -> 100K challenge, stored in challenge/main (owner writes, viewers can read)
  let openGame = null, gameFilter = 'all', gameSort = 'likely', showAll = false;
  let combo = store.get('combo', []), comboPrice = '', comboAmt = store.get('comboAmt', '10');
  let sheet = null; // { key: ticker|side }
  let confirmDel = null;
  const writing = new Set();

  // ---------- learning (same rule as the data script: nudge chances by what past results showed) ----------
  const bandOf = (p) => (p < 0.35 ? 'long' : p > 0.65 ? 'fav' : 'mid');
  const clampP = (x) => Math.max(0.01, Math.min(0.99, x));
  // Same rule as the data script: the tool's own chance is moved toward Kalshi's price by "beta", one dial per
  // sport × bet type. Team bets start at 1 (trust the sportsbooks' fair chance); player bets at 0.3. Results move it.
  const logit = (p) => { const q = Math.max(0.005, Math.min(0.995, p)); return Math.log(q / (1 - q)); };
  const sigm = (x) => 1 / (1 + Math.exp(-x));
  const beta0 = (kind) => (kind === 'prop' ? 0.3 : 1);
  const betaFair = (m, r, beta) => clampP(sigm(logit(m) + beta * (logit(r) - logit(m))));
  const sideMid = (price, mid) => Math.max(0.02, Math.min(0.98, mid != null ? mid : price - 0.01)); // mid = Kalshi's chance for THIS side
  // Early-season haircut (same as the data program): until a bet type has 20+ games of record, long shots are pulled down and favorites a little
  const HAIRCUT = (f, games) => (f == null || games >= 20 ? f : f < 0.3 ? f * 0.65 : f > 0.65 ? 0.65 + (f - 0.65) * 0.7 : f);
  function learnFair(lg, kind, price, mid, r) { const g = index?.learn?.groups?.[lg + '|' + kind]; return HAIRCUT(betaFair(sideMid(price, mid), r, g?.beta ?? beta0(kind)), g?.games ?? 0); }
  // Hard pauses (same as the data program): baseball player bets through the playoffs, NBA player bets until the regular season
  const hardPause = (lg, kind) => (lg === 'mlb' && kind === 'prop' && Date.now() < Date.parse('2026-11-05T00:00:00Z')) || (lg === 'nba' && kind === 'prop' && Date.now() < Date.parse('2026-10-21T00:00:00Z'));
  const Phi = (z) => { const x = Math.abs(z) / Math.SQRT2, t = 1 / (1 + 0.3275911 * x); const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return 0.5 * (1 + (z < 0 ? -y : y)); };
  const rateWin = (G, side) => (G.ext?.rate ? Phi((side === 'home' ? G.ext.rate.mu : -G.ext.rate.mu) / G.ext.rate.sd) : null);
  const rateCover = (G, side, line) => (G.ext?.rate ? 1 - Phi((line - (side === 'home' ? G.ext.rate.mu : -G.ext.rate.mu)) / G.ext.rate.sd) : null);
  const learnGroup = (lg, kind) => index?.learn?.groups?.[lg + '|' + kind] || null;

  // ---------- markets ----------
  function entries(G) {
    const out = []; const L = LG[G.league] || { unit: 'points' };
    const started = G.state !== 'pre' || Date.parse(G.start) < Date.now(); // our estimates are pre-game only
    const push = (row, kind, yesLabel, noLabel, model, extra = {}) => {
      for (const side of ['yes', 'no']) {
        const price = side === 'yes' ? row.ya : row.na;
        if (row.closed || price == null || price <= 0 || price >= 1) continue;
        const lpH = started && G.live && !G.live.done && kind === 'winner' && extra.team ? liveWinProb(G, G.live) : null; // in-game: ESPN's live win chance, or our own from the score and clock
        const lp = lpH == null ? null : extra.team === 'home' ? lpH : 1 - lpH;
        const raw = lp != null ? (side === 'yes' ? lp : 1 - lp) : row.fy == null || started ? null : side === 'yes' ? row.fy : 1 - row.fy;
        const form = extra.l10 && extra.l10[1] >= 5 ? (side === 'yes' ? extra.l10[0] : extra.l10[1] - extra.l10[0]) / extra.l10[1] : null;
        const espn = extra.espnYes == null ? null : side === 'yes' ? extra.espnYes : 1 - extra.espnYes;
        const rate = extra.rateYes == null ? null : side === 'yes' ? extra.rateYes : 1 - extra.rateYes;
        const midY = row.ya == null ? null : row.yb != null && row.yb > 0 ? (row.ya + Math.max(row.yb, row.ya - 0.06)) / 2 : row.ya - 0.01;
        const r = raw == null ? null : side === 'yes' ? (row.fs ?? row.fy) : 1 - (row.fs ?? row.fy);
        const fair = raw == null ? null : lp != null ? raw : learnFair(G.league, kind, price, midY == null ? null : side === 'yes' ? midY : 1 - midY, r);
        const adj = raw == null ? 0 : fair - raw;
        const cost = price + fee(price);
        const e = { key: row.t + '|' + side, ticker: row.t, side, kind, label: side === 'yes' ? yesLabel : noLabel, price, cost, fair, raw, adj, form, espn, rate, paused: learnGroup(G.league, kind)?.status === 'paused' || hardPause(G.league, kind), edge: fair == null ? null : fair - cost, vol: row.vol || 0, model: lp != null ? 'live' : model, inGame: started, espnLive: lp != null && G.live.pHome != null, tail: !!row.tail, game: G.key, league: G.league, start: G.start, gameLabel: `${G.away.abbr || tn(G.away)} @ ${G.home.abbr || tn(G.home)}`, ...extra };
        out.push(e); mkt[e.key] = e;
      }
    };
    for (const r of G.k?.game || []) if (r.side === 'home' || r.side === 'away') { const T = G[r.side]; push(r, 'winner', `${tn(T)} to win`, `${tn(T)} not to win`, 'market', { team: r.side, espnYes: G.ext?.espnWin?.[r.side] ?? null, rateYes: rateWin(G, r.side) }); }
    for (const r of G.k?.spread || []) if (r.side && r.line != null) { const T = G[r.side]; const k = Math.ceil(r.line); push(r, 'spread', `${tn(T)} win by ${k}+`, `${tn(T)} not to win by ${k}+`, 'market', { rateYes: rateCover(G, r.side, r.line) }); }
    for (const r of G.k?.total || []) if (r.line != null) push(r, 'total', `Over ${r.line} ${L.unit}`, `Under ${r.line} ${L.unit}`, 'market');
    for (const P of G.props || []) for (const ln of P.lines || []) { const k = Math.ceil(ln.k); const l10 = (P.last || []).slice(0, 10); push(ln, 'prop', `${P.p} ${k}+ ${STAT[P.stat] || P.stat}`, `${P.p} under ${k} ${STAT[P.stat] || P.stat}`, 'stats', { player: P.p, stat: P.stat, l10: [l10.filter((x) => x[2] > ln.k).length, l10.length] }); }
    return out;
  }
  function rebuild() {
    games = []; gameByKey = {}; mkt = {}; rowByT = {}; gameByT = {}; legMeta = {};
    for (const id of index?.shards || []) for (const G of feed[id]?.games || []) { games.push(G); gameByKey[G.key] = G; }
    games.sort((a, b) => a.start.localeCompare(b.start));
    for (const G of games) {
      const L = liveGames[G.league + ':' + G.espnId]; // ESPN says this game is under way (or just finished)
      if (L) { G.live = L; if (L.done) { G.done = true; G.state = 'post'; } else { G.state = 'in'; G.detail = scoreLine(G, L); } }
      for (const [kind, v] of Object.entries(G.k || {})) for (const r of v) { rowByT[r.t] = r; gameByT[r.t] = G; legMeta[r.t] = kind === 'game' ? { kind: 'winner', team: r.side, line: 0 } : kind === 'spread' ? { kind: 'spread', team: r.side, line: r.line } : { kind: 'total', line: r.line }; }
      for (const P of G.props || []) for (const ln of P.lines || []) { rowByT[ln.t] = ln; gameByT[ln.t] = G; legMeta[ln.t] = { kind: 'prop', player: P.p, stat: P.stat, line: ln.k }; }
      try { G._e = entries(G); } catch (err) { G._e = []; console.warn('skipped a game', G.key, err); }
    }
  }
  const live = (pick) => mkt[pick.ticker + '|' + pick.side] || null;

  // ---------- live prices (the shared website only): Kalshi is asked for just the bets on screen ----------
  // The page's data file is rebuilt on a schedule; in between, window.BETDESK_LIVE names a small service that
  // answers with current prices. Each refresh covers what is visible, so a view costs one or two calls.
  const LIVE = window.BETDESK_LIVE || ''; const liveAt = {}; let liveStamp = null, liveBusy = false;
  const LIVE_GAMES = LIVE ? LIVE.replace(/[^/]*$/, 'live-games') : ''; let liveGames = {}; // league:espnId -> ESPN's in-progress status
  const LIVE_STATS = LIVE ? LIVE.replace(/[^/]*$/, 'live-stats') : ''; let liveStats = {}; // league:espnId -> box score (players' stats so far)
  const normName = (n) => String(n || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z ]/g, ' ').replace(/\b(jr|sr|ii|iii|iv)\b/g, '').replace(/\s+/g, ' ').trim();
  // Share of the game still to play, from the period and clock ESPN reports
  function remainingFrac(G, L) {
    const per = Number(L.period) || 1; const m = /^(\d+):(\d+)/.exec(L.clock || ''); const left = m ? Number(m[1]) + Number(m[2]) / 60 : 0;
    const nP = G.league === 'cbb' ? 2 : G.league === 'mlb' ? 9 : 4, lenP = G.league === 'nba' ? 12 : G.league === 'cbb' ? 20 : G.league === 'mlb' ? 1 : 15;
    if (G.league === 'mlb') return Math.max(0, Math.min(1, (nP - per + 0.5) / nP));
    if (per > nP) return 0.04; // overtime: nearly done
    return Math.max(0, Math.min(1, ((nP - per) * lenP + left) / (nP * lenP)));
  }
  // Home team's chance to win right now: the score so far plus what the pre-game spread expects for the rest, with less spread as time runs out
  function liveWinProb(G, L) {
    if (L.pHome != null) return L.pHome;
    const rem = remainingFrac(G, L); const mu0 = G.model?.mu ?? G.ext?.rate?.mu ?? 0; const sd0 = (LG[G.league] || {}).sd || 13;
    const margin = (L.hs - L.as) + mu0 * rem; const sd = Math.max(1.5, sd0 * Math.sqrt(rem));
    if (rem <= 0) return L.hs > L.as ? 1 : L.hs < L.as ? 0 : 0.5;
    return Math.round(Phi(margin / sd) * 1000) / 1000;
  }
  async function liveStatsRefresh() {
    if (!LIVE_STATS) return;
    const want = games.filter((G) => G.live && G.props?.length && !(liveStats[G.league + ':' + G.espnId]?.done)).slice(0, 12).map((G) => G.league + ':' + G.espnId);
    if (!want.length) return;
    let j; try { const r = await fetch(LIVE_STATS + '?g=' + want.join(','), { cache: 'no-store' }); if (!r.ok) return; j = await r.json(); } catch { return; }
    const next = { ...liveStats, ...(j.games || {}) };
    if (JSON.stringify(next) === JSON.stringify(liveStats)) return;
    liveStats = next; render();
  }
  const scoreLine = (G, L) => `${G.away.abbr || tn(G.away)} ${L.as} – ${G.home.abbr || tn(G.home)} ${L.hs}${L.detail ? ' · ' + L.detail : ''}`;
  async function liveGamesRefresh() {
    if (!LIVE_GAMES) return;
    let j; try { const r = await fetch(LIVE_GAMES, { cache: 'no-store' }); if (!r.ok) return; j = await r.json(); } catch { return; }
    const next = {}; for (const L of j.games || []) next[L.league + ':' + L.id] = L;
    if (JSON.stringify(next) === JSON.stringify(liveGames)) return;
    liveGames = next; if (games.length) { rebuild(); render(); }
  }
  const startsIn = (iso) => { const ms = Date.parse(iso) - Date.now(); if (!(ms > 0)) return whenOf(iso); const h = Math.floor(ms / 3600e3), m = Math.floor((ms % 3600e3) / 60e3); return h >= 24 ? whenOf(iso) : `Starts in ${h ? h + 'h ' : ''}${m}m`; };
  const kalshiUrlFor = (ticker) => kalshiUrl({ ticker }, gameByT[ticker]);
  // "I bet this": remembered on this device only, so each person sees their own bets at the top of the Record
  let myBets = store.get('myBets', []);
  const betSig = (legs) => legs.map((l) => l.ticker + '|' + l.side).sort().join();
  const isMine = (legs) => myBets.some((b) => b.sig === betSig(legs));
  function toggleMine(legs, title) {
    const sig = betSig(legs); const i = myBets.findIndex((b) => b.sig === sig);
    if (i >= 0) { myBets.splice(i, 1); toast('Removed from your bets'); }
    else { myBets.unshift({ sig, title, at: new Date().toISOString(), legs: legs.map((l) => ({ ticker: l.ticker, side: l.side, label: l.label, gameLabel: l.gameLabel, league: l.league, start: l.start, price: l.price, fair: l.fair })) }); toast('Added to your bets. Find it at the top of the Record.'); }
    store.set('myBets', myBets);
  }
  // What a leg is doing right now: hit, missed, live (with progress), or still to come
  const STAT_SHORT = { passYds: 'pass yds', rushYds: 'rush yds', recYds: 'rec yds', rec: 'catches', passTD: 'pass TD', rrYds: 'rush+rec yds', anyTD: 'TD', pts: 'pts', reb: 'reb', ast: 'ast', threes: '3s', pra: 'pts+reb+ast', hits: 'hits', hr: 'HR', tb: 'total bases', ks: 'Ks', hrr: 'H+R+RBI' };
  function legState(l) {
    if (l.res === 'won' || l.res === 'lost' || l.res === 'void') return { st: l.res, text: l.res === 'won' ? 'Hit' : l.res === 'lost' ? 'Missed' : 'Void' };
    const G = gameByT[l.ticker], M = legMeta[l.ticker];
    if (!G || !M) return { st: 'pending', text: l.start ? startsIn(l.start) : '' };
    const L = G.live, S = liveStats[G.league + ':' + G.espnId];
    if (!L && !S) return { st: 'pending', text: startsIn(G.start) };
    const done = !!(L?.done || S?.done); const hs = S?.hs ?? L?.hs ?? 0, as = S?.as ?? L?.as ?? 0; const yes = l.side === 'yes';
    const score = `${G.away.abbr || tn(G.away)} ${as} – ${G.home.abbr || tn(G.home)} ${hs}`, clock = done ? 'Final' : (L?.detail || S?.detail || 'Live');
    let cur = null, line = M.line ?? 0, unit = '';
    if (M.kind === 'winner' || M.kind === 'spread') cur = M.team === 'home' ? hs - as : as - hs;
    else if (M.kind === 'total') { cur = hs + as; unit = 'pts'; }
    else { const P = S?.players?.[normName(M.player)]; cur = P && P[M.stat] != null ? P[M.stat] : null; unit = STAT_SHORT[M.stat] || ''; }
    const counts = M.kind === 'total' || M.kind === 'prop'; // these can only go up, so "over" is settled the moment it is reached
    if (cur == null) return { st: done ? 'pending' : 'live', text: `${clock} · ${score}` };
    const over = cur > line;
    if (done) return { st: (yes ? over : !over) ? 'won' : 'lost', text: counts ? `Final · ${cur} ${unit}`.trim() : `Final · ${score}`, cur, line, frac: counts && line > 0 ? Math.min(1, cur / line) : null };
    if (counts && over) return { st: yes ? 'won' : 'lost', text: `${cur} ${unit} · already ${yes ? 'over' : 'past'} ${line}`, cur, line, frac: 1 };
    const lead = M.kind === 'winner' ? (cur > 0 ? `Leading by ${cur}` : cur < 0 ? `Trailing by ${-cur}` : 'Tied') : M.kind === 'spread' ? `${cur >= 0 ? 'Up' : 'Down'} ${Math.abs(cur)} · needs ${Math.ceil(line)}` : `${cur} / ${Math.ceil(line)} ${unit}`;
    return { st: 'live', text: `${lead} · ${clock}`, cur, line, frac: counts && line > 0 ? Math.min(1, cur / line) : null };
  }
  const liveClosed = (t) => !!rowByT[t]?.closed;
  const closedOf = (p) => (p.legs ? p.legs.some((l) => liveClosed(l.ticker)) : liveClosed(p.ticker));
  async function liveFetch(tickers, maxAge = 45000) {
    if (!LIVE) return false;
    const now = Date.now(), need = [...new Set(tickers)].filter((t) => rowByT[t] && now - (liveAt[t] || 0) > maxAge);
    let changed = false;
    for (let i = 0; i < need.length; i += 100) {
      const chunk = need.slice(i, i + 100); let j;
      try { const r = await fetch(LIVE + '?t=' + chunk.join(','), { cache: 'no-store' }); if (!r.ok) break; j = await r.json(); } catch { break; }
      if (!j || !j.m) break;
      for (const t of chunk) {
        const row = rowByT[t]; if (!row || !(t in j.m)) continue; liveAt[t] = Date.now();
        const v = j.m[t], was = [row.ya, row.yb, row.na, !!row.closed].join();
        if (!v || !v[3]) { row.closed = true; if (v && v[4]) results[t] = v[4]; } // no longer tradable (started, settled or delisted)
        else { row.closed = false; row.ya = v[0]; row.yb = v[1]; row.na = v[2]; }
        if ([row.ya, row.yb, row.na, !!row.closed].join() !== was) changed = true;
      }
      liveStamp = Date.now();
    }
    if (changed) rebuild();
    return changed;
  }
  function liveRefresh(force) {
    if (!LIVE || liveBusy) return;
    const keys = new Set();
    document.querySelectorAll('[data-sheet],[data-addleg],[data-side]').forEach((el) => { if (el.closest('[hidden]')) return; const k = el.dataset.sheet || el.dataset.addleg || el.dataset.side; if (k) keys.add(k.split('|')[0]); });
    for (const l of combo) keys.add(l.ticker);
    if (!keys.size) return;
    liveBusy = true;
    liveFetch([...keys], force ? 0 : 45000).then((changed) => { liveBusy = false; if (changed) render(); else renderFresh(); }).catch((err) => { liveBusy = false; console.warn('live prices: refresh failed', err); });
  }
  if (LIVE) {
    liveGamesRefresh().then(liveStatsRefresh); setInterval(() => { if (document.visibilityState === 'visible') liveGamesRefresh().then(liveStatsRefresh); }, 30000);
    // whenever the page redraws (new tab, filter, game or player opened), the bets now on screen get checked
    let liveT; new MutationObserver(() => { clearTimeout(liveT); liveT = setTimeout(() => liveRefresh(false), 250); }).observe(document.getElementById('app'), { childList: true, subtree: true });
    setInterval(() => { if (document.visibilityState === 'visible') liveRefresh(true); }, 60000);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') liveRefresh(true); });
  }
  const contractsFor = (amt, price) => Math.max(0, Math.floor(amt / (price + fee(price)))); // how many $1 contracts the money buys after Kalshi's fee
  const todayKey = () => { const d = new Date(); return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d); };
  function latestResearch() { const ids = Object.keys(research).sort(); return ids.length ? research[ids[ids.length - 1]] : null; }

  // ---------- confidence: the tool's chance the pick wins (checked against its own record) ----------
  const confOf = (ch) => (ch == null ? { cls: 'low', label: 'No', score: '—' } : { cls: ch >= 0.65 ? 'high' : ch >= 0.55 ? 'medium' : 'low', label: ch >= 0.8 ? 'Very high' : ch >= 0.65 ? 'High' : ch >= 0.55 ? 'Medium' : 'Low', score: Math.round(ch * 100) });
  const confPill = (ch) => { const c = confOf(ch); return `<span class="pill ${c.cls}" title="Confidence = its chance this wins">${c.label} confidence · ${c.score}</span>`; };

  // ---------- filters (shared by Picks and Games) ----------
  const isCollege = (lg) => lg === 'cfb' || lg === 'cbb';
  const passLg = (lg) => (sport === 'all' || lg === sport) && (college || !isCollege(lg));
  // NFL game windows, worked out on Eastern time (how the NFL schedules them)
  const SLOTS = [['thu', 'Thursday night'], ['intl', 'Sunday morning (overseas)'], ['early', 'Sunday early'], ['late', 'Sunday late afternoon'], ['snf', 'Sunday night'], ['mnf', 'Monday night'], ['other', 'Other days']];
  const PRIME = ['thu', 'snf', 'mnf'];
  const etParts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' });
  function slotOf(start) {
    const t = Date.parse(start); if (!t) return 'other';
    const P = Object.fromEntries(etParts.formatToParts(new Date(t)).map((x) => [x.type, x.value]));
    const m = Number(P.hour) * 60 + Number(P.minute);
    if (P.weekday === 'Thu') return 'thu';
    if (P.weekday === 'Mon') return 'mnf';
    if (P.weekday === 'Sun') return m < 720 ? 'intl' : m < 960 ? 'early' : m < 1170 ? 'late' : 'snf';
    return 'other';
  }
  const inSlot = (start) => slot === 'all' || (slot === 'prime' ? PRIME.includes(slotOf(start)) : slot === 'sun' ? ['intl', 'early', 'late', 'snf'].includes(slotOf(start)) : slotOf(start) === slot);
  // The window filter only applies when NFL is the chosen sport.
  const passSlot = (lg, start) => sport !== 'nfl' || slot === 'all' || (lg === 'nfl' && inSlot(start));
  const passG = (G) => passLg(G.league) && passSlot(G.league, G.start);
  const legInfo = (l) => mkt[l.ticker + '|' + l.side] || {};
  const passPick = (p) => (p.legs ? p.legs.every((l) => { const lg = l.league || legInfo(l).league; return passLg(lg) && passSlot(lg, l.start || legInfo(l).start || p.start); }) : passLg(p.league) && passSlot(p.league, p.start));
  function slotBar() {
    if (sport !== 'nfl') return '';
    const now = Date.now(), soon = games.filter((G) => G.league === 'nfl' && !G.done && Date.parse(G.start) > now - 3 * 3600e3 && Date.parse(G.start) < now + 6 * 86400e3);
    const at = (k) => { const G = soon.filter((g) => slotOf(g.start) === k).sort((a, b) => a.start.localeCompare(b.start))[0]; return G ? new Date(G.start).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }).replace(':00', '') : null; };
    const SUN = ['intl', 'early', 'late', 'snf'];
    const opts = [['all', 'All games', null], ['sun', 'All Sunday', `${soon.filter((g) => SUN.includes(slotOf(g.start))).length} games`], ['prime', 'Prime time', `${soon.filter((g) => PRIME.includes(slotOf(g.start))).length} games`], ...SLOTS.filter(([k]) => soon.some((g) => slotOf(g.start) === k)).map(([k, l]) => [k, l, `${at(k)} · ${soon.filter((g) => slotOf(g.start) === k).length} game${soon.filter((g) => slotOf(g.start) === k).length === 1 ? '' : 's'}`])];
    return `<div class="chips slots" role="group" aria-label="NFL game window" style="margin-top:8px">${opts.map(([k, l, sub]) => `<button class="chip" data-slot="${k}" aria-pressed="${slot === k}">${l}${sub ? ` <span class="hint" style="font-weight:500">${sub}</span>` : ''}</button>`).join('')}</div>${slot === 'prime' ? '<p class="hint" style="margin-top:4px">Prime time = Thursday night, Sunday night and Monday night.</p>' : ''}`;
  }
  function filterBar() {
    const lgs = ['nfl', 'nba', 'mlb', 'cfb', 'cbb'].filter((k) => college || !isCollege(k));
    return `<div class="filters"><div class="chips" role="group" aria-label="Sport"><button class="chip" data-sport="all" aria-pressed="${sport === 'all'}">All sports</button>${lgs.map((k) => `<button class="chip" data-sport="${k}" aria-pressed="${sport === k}">${LG[k].label}</button>`).join('')}</div>
      </div>${slotBar()}`;
  }

  // ---------- parlay builder (runs in the page, on the latest prices) ----------
  function legPool(props, days) {
    const now = Date.now(), lim = now + days * 86400e3, out = [];
    for (const G of games) {
      const t = Date.parse(G.start);
      if (G.state !== 'pre' || t < now + 5 * 60e3 || t > lim || !passG(G)) continue;
      for (const e of G._e) {
        if (e.fair == null || e.tail || e.paused || e.price < 0.35 || e.fair < 0.45 || e.price > 0.95 || e.vol < 150) continue; // no long shots, no coin flips as legs
        if (e.model === 'stats' && !props) continue;
        out.push(e);
      }
    }
    return out;
  }
  // Beam search: keep the best partial parlays at each size, never two legs from the same game.
  function beamParlays(legs, n, score, width = 200) {
    let beam = legs.map((e, i) => ({ idx: [i], games: [e.game], s: score(e) })).sort((a, b) => b.s - a.s).slice(0, width);
    const all = [beam];
    for (let d = 2; d <= n; d++) {
      const next = [];
      for (const b of beam) for (let j = b.idx[b.idx.length - 1] + 1; j < legs.length; j++) {
        const e = legs[j]; if (b.games.includes(e.game)) continue;
        next.push({ idx: [...b.idx, j], games: [...b.games, e.game], s: b.s + score(e) });
      }
      next.sort((a, b) => b.s - a.s); beam = next.slice(0, width); all.push(beam);
    }
    return all; // all[k] = best parlays with k+1 legs
  }
  const toParlay = (legs, b) => { const L = b.idx.map((i) => legs[i]); const fair = L.reduce((a, e) => a * e.fair, 1), price = L.reduce((a, e) => a * e.price, 1), cost = L.reduce((a, e) => a * e.cost, 1); return { legs: L, fair, price, cost, payout: 1 / price, ev: (fair - cost) / cost }; };
  function diverse(list, k) { const used = {}; const out = []; for (const c of list) { if (c.legs.some((l) => (used[l.key] || 0) >= 2)) continue; c.legs.forEach((l) => (used[l.key] = (used[l.key] || 0) + 1)); out.push(c); if (out.length >= k) break; } return out; }
  function prepLegs(pool, mode) {
    const sc = mode === 'likely' ? (e) => Math.log(e.fair) : (e) => Math.log(e.fair / e.cost) + 0.35 * Math.log(e.fair);
    let legs = pool.filter((e) => (mode === 'likely' ? e.edge >= -0.02 && e.price <= 0.93 : e.edge >= 0 && e.fair >= 0.35));
    legs.sort((a, b) => sc(b) - sc(a));
    const perGame = {}; legs = legs.filter((e) => (perGame[e.game] = (perGame[e.game] || 0) + 1) <= 3).slice(0, 140);
    return { legs, sc };
  }
  const parlayCache = {};
  const tick = () => Math.floor(Date.now() / 6e5); // cache keys expire every 10 minutes so started games drop out
  function makeParlays(sizes, mode, props, days = 4, k = 8) {
    const key = [index?.updatedAt, tick(), sport, college, slot, sizes.join('-'), mode, props, days, k].join('|');
    if (parlayCache[key]) return parlayCache[key];
    const { legs, sc } = prepLegs(legPool(props, days), mode);
    const maxN = Math.max(...sizes);
    const all = legs.length ? beamParlays(legs, maxN, sc) : [];
    let out = [];
    for (const n of sizes) out.push(...diverse((all[n - 1] || []).map((b) => toParlay(legs, b)).filter((c) => mode === 'likely' || c.ev > 0), sizes.length > 1 ? 3 : k));
    return (parlayCache[key] = out);
  }
  // Parlays the tool gives at least a 70% chance, ranked by payout. Adding a leg only lowers the chance,
  // so any partial parlay under the bar is dropped early.
  const SURE_MIN = 0.7;
  function sureFrom(pool0, sizes, k = 8) {
    const pool = pool0.filter((e) => e.fair >= 0.74 && e.edge >= -0.03 && e.price <= 0.95);
    const perGame = {}; const legs = pool.sort((a, b) => b.fair / b.price - a.fair / a.price).filter((e) => (perGame[e.game] = (perGame[e.game] || 0) + 1) <= 3).slice(0, 160);
    const maxN = Math.max(...sizes), W = 160;
    let beam = legs.map((e, i) => ({ idx: [i], games: [e.game], f: e.fair, p: e.price }));
    const all = [beam];
    const keep = (list) => { list.sort((a, b) => a.p - b.p || b.f - a.f); const byF = list.slice().sort((a, b) => b.f - a.f).slice(0, 40); return [...new Set([...list.slice(0, W), ...byF])]; };
    for (let d = 2; d <= maxN; d++) {
      const next = [];
      for (const b of beam) for (let j = b.idx[b.idx.length - 1] + 1; j < legs.length; j++) {
        const e = legs[j]; if (b.games.includes(e.game) || b.f * e.fair < SURE_MIN) continue;
        next.push({ idx: [...b.idx, j], games: [...b.games, e.game], f: b.f * e.fair, p: b.p * e.price });
      }
      beam = keep(next); all.push(beam);
    }
    let out = [];
    for (const n of sizes) out.push(...diverse((all[n - 1] || []).slice().sort((a, b) => a.p - b.p || b.f - a.f).map((b) => toParlay(legs, b)), sizes.length > 1 ? 3 : k));
    return out;
  }
  function sureParlays(sizes, props, days = 7, k = 8) {
    const key = ['sure', index?.updatedAt, tick(), sport, college, slot, sizes.join('-'), props, days].join('|');
    if (parlayCache[key]) return parlayCache[key];
    return (parlayCache[key] = sureFrom(legPool(props, days), sizes, k));
  }
  // ---------- "Generate a parlay": a fresh one on the spot, only from bets you can still place ----------
  const outcomeKey = (e) => (e.kind === 'winner' && e.team ? e.game + '|win|' + (e.side === 'yes' ? e.team : e.team === 'home' ? 'away' : 'home') : e.ticker);
  const genSig = (c) => c.legs.map(outcomeKey).sort().join();
  let gen = Object.assign({ league: 'mix', when: 'today', n: 'any', min: 2, style: 'likely' }, store.get('gen', {})), genLast = null;
  const genSeen = new Set();
  const r3p = (x) => (x == null ? null : Math.round(x * 1000) / 1000);
  function genPool(o) {
    const now = Date.now(), lim = now + (o.when === 'today' ? 2 : 8) * 86400e3, out = []; const tk = dayKey(now);
    for (const G of games) {
      const t = Date.parse(G.start);
      if (G.state !== 'pre' || t < now + 5 * 60e3 || t > lim) continue; // still open to bet on
      if (o.league === 'mix' ? !(college || !isCollege(G.league)) : G.league !== o.league) continue;
      if (o.when === 'today' && dayKey(G.start) !== tk) continue;
      for (const e of G._e) {
        if (e.fair == null || e.tail || e.paused || e.price < 0.35 || e.fair < 0.45 || e.price > 0.95 || e.vol < 150) continue; // no long shots, no coin flips as legs
        if (e.model === 'stats' && !parlayProps) continue;
        out.push(e);
      }
    }
    return out;
  }
  const GEN_MULTS = [[1.5, '1.5x'], [2, '2x'], [3, '3x'], [5, '5x'], [10, '10x'], [25, '25x']];
  // parlays of n legs that pay at least M: cap each leg's price so the product can reach M, then take the most likely legs
  function multCandidates(pool, n, M) {
    const out = []; const per = Math.pow(1 / M, 1 / n);
    for (const cap of [Math.min(0.95, per + 0.1), per]) {
      const perGame = {}; const L = pool.filter((e) => e.price <= cap && e.edge >= -0.04).sort((a, b) => b.fair - a.fair).filter((e) => (perGame[e.game] = (perGame[e.game] || 0) + 1) <= 2).slice(0, 90);
      if (L.length < n) continue;
      for (const b of beamParlays(L, n, (e) => Math.log(e.fair), 120)[n - 1] || []) { const c = toParlay(L, b); if (1 / c.price >= M) out.push(c); }
    }
    return out;
  }
  function genCandidates(o) {
    const pool = genPool(o), M = Number(o.min) || 1.5, sizes = o.n === 'any' || !o.n ? [2, 3, 4, 5] : [Number(o.n)], out = new Map();
    const add = (c) => { if (1 / c.price < M) return; const sig = genSig(c); if (!out.has(sig)) out.set(sig, c); };
    const { legs, sc } = prepLegs(pool, 'likely');
    for (const n of sizes) {
      if (legs.length >= n) for (const b of beamParlays(legs, n, sc, 140)[n - 1] || []) add(toParlay(legs, b));
      for (const c of multCandidates(pool, n, M)) add(c);
    }
    return diverse([...out.values()].sort((a, b) => b.fair - a.fair), 14);
  }
  async function generateParlay() {
    let cands = genCandidates(gen);
    if (LIVE && cands.length) { // check Kalshi's current prices for the legs in play before choosing
      genLast = { busy: true }; renderParlaysTab();
      const tk = [...new Set(cands.slice(0, 14).flatMap((c) => c.legs.map((l) => l.ticker)))];
      if (await liveFetch(tk, 15000)) cands = genCandidates(gen);
    }
    if (!cands.length) { genLast = { none: true }; return; }
    const fresh = cands.filter((c) => !genSeen.has(genSig(c)));
    const from = (fresh.length ? fresh : cands).slice(0, 5);
    const c = from[Math.floor(Math.random() ** 2 * from.length)]; // a different one each press, leaning toward the best
    genSeen.add(genSig(c));
    genLast = { c, at: Date.now(), saved: null };
    if (db || window.BETDESK_BOX) genSave(c).then(() => { genLast.saved = true; if (tab === 'parlays') renderParlaysTab(); }).catch(() => { genLast.saved = false; if (tab === 'parlays') renderParlaysTab(); });
  }
  const genName = () => { try { return (localStorage.getItem('genName') || '').trim(); } catch { return ''; } };
  async function genSave(c) {
    const sig = c.legs.map((l) => l.key).sort().join();
    const legs = c.legs.map((l) => ({ ticker: l.ticker, side: l.side, label: l.label, gameLabel: l.gameLabel, league: l.league, start: l.start, price: l.price, fair: r3p(l.fair), raw: r3p(l.raw), res: null }));
    const lgs = new Set(legs.map((l) => l.league));
    const pick = { id: ('gen-' + sig).slice(0, 180), src: 'gen', cat: 'generated', conf: confOf(c.fair).cls, league: lgs.size === 1 ? [...lgs][0] : 'mixed', game: null, gameLabel: legs.map((l) => l.gameLabel).join(' + '), start: legs.map((l) => l.start).sort().pop(), side: 'yes', label: legs.map((l) => l.label).join(' + '), kind: 'combo', price: r3p(c.price), cost: r3p(c.cost), fair: r3p(c.fair), edge: r3p(c.fair - c.cost), legs, at: new Date().toISOString(), res: null, gen: { league: gen.league, when: gen.when, min: gen.min, n: gen.n } };
    const id = todayKey() + '-' + Date.now().toString(36);
    if (db) { await db.collection('gen').doc(id).set({ date: todayKey(), by: myId, picks: [pick] }); return; }
    // the shared website: hand it to the mailbox, which the daily jobs empty into the tracker
    const r = await fetch(window.BETDESK_BOX, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id, date: todayKey(), name: genName(), pick }) });
    if (!r.ok) throw new Error('box ' + r.status);
  }
  function genCard() {
    const now = Date.now();
    const lgs = ['nfl', 'cfb', 'nba', 'cbb', 'mlb'].filter((k) => games.some((G) => G.league === k && G.state === 'pre' && Date.parse(G.start) > now));
    const chips = (key, opts) => `<div class="chips" role="group">${opts.map(([k, l]) => `<button class="chip" data-genopt="${key}:${k}" aria-pressed="${String(gen[key]) === String(k)}">${l}</button>`).join('')}</div>`;
    const seg = (name, key, opts) => `<div class="seg small" role="group" aria-label="${name}">${opts.map(([k, l]) => `<button data-genopt="${key}:${k}" aria-pressed="${String(gen[key]) === String(k)}">${l}</button>`).join('')}</div>`;
    const saved = db || window.BETDESK_BOX;
    let h = `<div class="card" style="display:grid;gap:10px"><h3>Generate a parlay</h3><p class="hint">Pick the sports, the time frame and the smallest payout you want. It builds the parlay it is most confident in that fits, from bets you can still place.${saved ? ' Each one is saved to the Record.' : ''}</p>
      ${window.BETDESK_BOX ? `<label class="f">Your name (shown next to your parlays in the Record)<input class="in" data-genname placeholder="e.g. Luis" value="${esc(genName())}" autocomplete="name"></label>` : ''}
      <div><div class="hint" style="margin-bottom:4px">Sports</div>${chips('league', [['mix', 'Mix'], ...lgs.map((k) => [k, LG[k].label])])}</div>
      <div><div class="hint" style="margin-bottom:4px">When</div>${seg('When', 'when', [['today', 'Today'], ['any', 'This week']])}</div>
      <div><div class="hint" style="margin-bottom:4px">Pays at least</div>${chips('min', GEN_MULTS)}</div>
      <div><div class="hint" style="margin-bottom:4px">Legs</div>${seg('Legs', 'n', [['any', 'Any'], [2, '2'], [3, '3'], [4, '4'], [5, '5']])}</div>
      <button class="btn primary" data-gen style="width:100%">${genLast?.c ? 'Generate another' : 'Generate parlay'}</button></div>`;
    if (genLast?.busy) h += `<div class="card empty"><strong>Checking live prices…</strong><span>Making sure every leg can still be bought.</span></div>`;
    else if (genLast?.none) h += `<div class="card empty"><strong>Nothing fits those settings right now</strong><span>Try a smaller payout, more legs, “This week”, or more sports.</span></div>`;
    else if (genLast?.c) { const c = genLast.c; h += `<div class="picks">${parlayCard(c, { title: 'Fresh parlay', who: 'Generated', sub: saved ? (genLast.saved === true ? 'saved to the Record' : genLast.saved === false ? 'could not be saved' : 'saving…') : 'not saved on this copy' })}</div>`; }
    return h;
  }
  // Highest-chance parlay that pays at least 50x (costs 2¢ or less)
  function fiftyX(props, days = 7) {
    const key = ['50x', index?.updatedAt, tick(), sport, college, slot, props, days].join('|');
    if (parlayCache[key] !== undefined) return parlayCache[key];
    const pool = legPool(props, days).filter((e) => e.edge >= -0.01);
    let best = null;
    for (const lam of [0, 0.4, 0.8, 1.2]) {
      const sc = (e) => Math.log(e.fair) - lam * Math.log(e.price);
      const legs = pool.slice().sort((a, b) => sc(b) - sc(a));
      const perGame = {}; const L = legs.filter((e) => (perGame[e.game] = (perGame[e.game] || 0) + 1) <= 2).slice(0, 110);
      const all = beamParlays(L, 12, sc, 120);
      for (const lvl of all) for (const b of lvl) { const c = toParlay(L, b); if (c.price <= 0.02 && (!best || c.fair > best.fair)) best = c; }
    }
    return (parlayCache[key] = best);
  }
  function lockOfWeek(days = 7) {
    const c = legPool(false, days).filter((e) => e.price <= 0.93 && e.edge >= -0.01).sort((a, b) => b.fair - a.fair);
    return c[0] || null;
  }

  // ---------- picks tab ----------
  const KIND_WORD = { winner: 'who-wins', spread: 'win-by-X', total: 'total', prop: 'player' };
  const CATS = [['sure', 'Most confident'], ['top', 'Top 10'], ['twox', 'Pays 2x+'], ['value', 'Best value'], ['safest', 'Safest'], ['payout', 'Big payout'], ['props', 'Player bets'], ['parlays', 'Parlays'], ['week', 'This week']];
  const CAT_NOTE = {
    sure: 'The outcomes it is most sure about, and how many independent sources agree. Fewer disagreements and a higher chance come first.',
    twox: 'The most likely bets and parlays that at least double your money. By nature these win less than half the time — but a bet that pays 2.2x and wins 48% of the time makes money over many bets.',
    top: 'Its top 10 bets for each sport, ranked. Tap a bet for the details, or tap “+ Parlay” to build your own parlay from any of them.',
    value: 'Bets where Kalshi charges less than the sportsbooks think they’re worth, after Kalshi’s fee. This is where long-run profit comes from.',
    safest: 'The most likely winners that still pay at least about 10% and aren’t overpriced. Steady, but smaller wins.',
    payout: 'Cheap long shots that still look underpriced. Expect to lose most of these; the wins pay 3x or more.',
    props: 'Player bets the numbers like, based on each player’s recent games. Less reliable than team bets — the track record will show how they do.',
    parlays: 'Pick how many legs. Every leg has to win, and no two legs come from the same game. Kalshi quotes its own price for a combo, so check it in the app.',
    week: 'The researcher’s weekly card, refreshed every Thursday morning, plus the math’s own version that updates with every price refresh.',
  };
  const LEG_OPTS = [[2, '2 legs'], [3, '3 legs'], [4, '4 legs'], [5, '5 legs'], ['moon', 'Moonshot · 6+']];
  function pickCard(p, ai, head) {
    const m = live(p) || p;
    const price = m.price ?? p.price, fair = m.fair ?? p.fair, edge = m.fair != null ? m.edge : p.edge;
    const moved = live(p) && Math.abs((live(p).price || 0) - (p.price || 0)) >= 0.02;
    const espn = p.espn ?? null;
    return `<article class="pick${ai ? ' ai' : ''}">
      ${head ? `<div class="pick-head">${head}</div>` : ''}
      <div class="pick-meta"><span><span class="lg">${esc(LG[p.league]?.label || '')}</span> · ${esc(p.gameLabel)} · ${esc(whenOf(p.start))}</span><span>${ai ? '<span class="pill ai">AI researcher</span> ' : ''}${confPill(ai && p.aiProb ? p.aiProb : (live(p)?.fair ?? p.fair))}${closedOf(p) ? ' <span class="pill lost">Closed on Kalshi</span>' : ''}</span></div>
      <div class="pick-main"><div class="what"><b>${esc(p.label)}</b><span>${p.model === 'stats' || p.kind === 'prop' ? 'From the player’s recent games' : 'Compared with DraftKings’ price'}</span></div>
        <button class="buy" data-sheet="${esc(p.ticker + '|' + p.side)}" aria-label="Buy ${p.side} at ${cents(price)}: ${esc(p.label)}"><span class="s">Buy ${p.side}</span><span class="p num">${cents(price)}</span></button></div>
      <div class="facts-inline"><span>Chance it wins: <b>${pct(ai && p.aiProb ? p.aiProb : fair)}</b>${ai && p.aiProb ? ` <span class="hint">(math says ${pct(fair)})</span>` : ''}</span>${espn != null ? `<span>ESPN's model: <b>${pct(espn)}</b></span>` : ''}${edge != null ? `<span>${Math.round(edge * 100) > 0 ? `Price: <b class="pos">${Math.round(edge * 100)}¢ cheaper</b> than it's worth` : Math.round(edge * 100) < 0 ? `Price: <b class="neg">${-Math.round(edge * 100)}¢ more</b> than it's worth` : 'Price: <b>about fair</b>'}</span>` : ''}<span>Pays <b>${price ? (1 / price).toFixed(1) : '—'}x</b></span>${moved ? `<span class="hint">Was ${cents(p.price)} when picked</span>` : ''}</div>
      ${p.reason ? `<p class="why">${esc(p.reason)}</p>` : ''}
      <button class="link why-link" data-sheet="${esc(p.ticker + '|' + p.side)}">Why this pick · open in Kalshi ›</button>
    </article>`;
  }
  function parlayCard(c, opts = {}) {
    // Once any leg has started, the parlay is a bet already placed: keep the prices it was picked at. Before that, show today's prices.
    const states = c.legs.map((l) => legState(l)); const locked = states.some((S) => S.st !== 'pending');
    const legs = c.legs.map((l, i) => { const e = mkt[l.key || l.ticker + '|' + l.side]; return { ...l, key: l.key || l.ticker + '|' + l.side, ...(e ? { price: locked && l.price != null ? l.price : e.price, fair: locked && l.fair != null ? l.fair : e.fair, label: l.label || e.label, gameLabel: l.gameLabel || e.gameLabel, league: l.league || e.league, start: l.start || e.start } : {}), state: states[i] }; });
    const fair = legs.every((l) => l.fair != null) ? legs.reduce((a, l) => a * l.fair, 1) : c.fair;
    const price = legs.reduce((a, l) => a * (l.price || 1), 1); const shown = opts.aiProb ?? fair;
    const won = legs.filter((l) => l.state.st === 'won').length, lost = legs.filter((l) => l.state.st === 'lost').length, live = legs.some((l) => l.state.st === 'live');
    const status = lost ? 'lost' : won === legs.length ? 'won' : live ? 'live' : 'pending';
    const who = opts.who || (opts.ai ? 'AI researcher' : 'Math');
    const foot = status === 'won' ? `<span class="pill won">Hit · all ${legs.length} legs</span>` : status === 'lost' ? `<span class="pill lost">Missed · ${won} of ${legs.length} hit</span>` : status === 'live' ? `<span class="pill pending">Live · ${won} of ${legs.length} hit so far</span>` : `<span class="pill low">${won ? `${won} of ${legs.length} hit so far` : 'Not started'}</span>`;
    return `<article class="pk ${status}${opts.ai ? ' ai' : ''}">
      <div class="pk-top"><div class="t"><b>${esc(opts.title || `${legs.length}-leg parlay`)}</b><span>${esc(who)}${opts.sub ? ` · ${opts.sub}` : ''}${c.at ? ` · picked ${esc(new Date(c.at).toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' }))}` : ''}</span></div><div class="pk-pay"><b>${price ? (1 / price).toFixed(1) : '—'}x</b><span>${shown != null ? `${pct(shown, shown < 0.1 ? 1 : 0)} chance` : 'no estimate'}</span>${price ? `<span class="usd">$10 pays ${money(10 / price)}</span>` : ''}</div></div>
      <div class="pk-legs">${legs.map((l) => { const S = l.state; const bar = S.frac != null ? `<div class="pbar" aria-hidden="true"><i style="width:${Math.round(S.frac * 100)}%"></i></div>` : ''; const mark = S.st === 'won' ? '✓' : S.st === 'lost' ? '✗' : S.st === 'live' ? '<i></i>' : S.st === 'void' ? '–' : ''; const tag = mkt[l.key] ? 'button' : 'span'; const open = S.st === 'pending' || S.st === 'live'; return `<div class="leg ${S.st}"><span class="dot">${mark}</span><${tag} class="lt"${tag === 'button' ? ` type="button" data-sheet="${esc(l.key)}"` : ''}><b>${esc(l.label)}</b><span>${esc(LG[l.league]?.label || '')}${l.gameLabel ? ' · ' + esc(l.gameLabel) : ''}</span><span class="st">${esc(S.text)}</span>${bar}</${tag}><span class="lp">${cents(l.price)}${open ? `<a href="${esc(kalshiUrlFor(l.ticker))}" target="_blank" rel="noopener" aria-label="Open on Kalshi: ${esc(l.label)}">Kalshi ↗</a>` : ''}</span></div>`; }).join('')}</div>
      ${opts.reason ? `<p class="why pk-foot" style="display:block">${esc(opts.reason)}</p>` : ''}
      <div class="pk-foot">${foot}${locked && status !== 'won' && status !== 'lost' ? '<span class="hint">Prices locked when it was picked</span>' : ''}<span class="row" style="gap:6px;flex-wrap:wrap">${opts.extra || ''}${opts.noMine ? '' : `<button class="btn small ib" data-ibet='${esc(JSON.stringify(legs.map((l) => ({ ticker: l.ticker, side: l.side, label: l.label, gameLabel: l.gameLabel, league: l.league, start: l.start, price: l.price, fair: l.fair }))))}' data-ibet-title="${esc(opts.title || `${legs.length}-leg parlay`)}" aria-pressed="${isMine(legs)}">${isMine(legs) ? '✓ I bet this' : 'I bet this'}</button>`}<button class="btn small" data-loadcombo='${esc(JSON.stringify(legs.map((l) => l.key)))}'>Add to Build</button>${!locked ? `<a class="btn small primary" href="${esc(kalshiUrlFor(legs[0].ticker))}" target="_blank" rel="noopener" title="${legs.length > 1 ? 'Opens leg 1 in Kalshi; use the Kalshi link on each leg for the others' : ''}">Bet on Kalshi ↗</a>` : ''}</span></div>
    </article>`;
  }
  const upcoming = (p) => Date.parse(p.start) > Date.now() - 10 * 60000;
  const comboUpcoming = (c) => c.legs.every((l) => Date.parse(l.start) > Date.now());
  function renderParlays(R, isToday) {
    const n = legsN, moon = n === 'moon';
    let html = genCard() + `<h3 style="margin-top:6px">Today's suggested parlays</h3><div class="seg" role="group" aria-label="Number of legs">${LEG_OPTS.map(([k, l]) => `<button data-legs="${k}" aria-pressed="${legsN === k}">${l}</button>`).join('')}</div>
      <div class="row" style="justify-content:space-between"><div class="seg small" role="group" aria-label="Rank by">${[['likely', 'Most likely to hit'], ['sure', '70%+ sure · best payout'], ['value', 'Best value']].map(([k, l]) => `<button data-pmode="${k}" aria-pressed="${parlayMode === k}">${l}</button>`).join('')}</div>
      <label class="switch"><input type="checkbox" data-toggle="props" ${parlayProps ? 'checked' : ''}><span class="track" aria-hidden="true"></span>Use player bets</label></div>`;
    const fits = (c) => (moon ? c.legs.length >= 6 : c.legs.length === n);
    const W = latestWeekly();
    const aiList = [...(isToday ? R?.combos || [] : []), ...(W ? [...(W.parlays || []), W.moonshot, W.fifty].filter(Boolean) : [])].filter((c) => fits(c) && comboUpcoming(c) && passPick(c) && (parlayMode !== 'sure' || (c.aiProb ?? c.fair) >= SURE_MIN));
    let list = aiList.map((c) => parlayCard(c, { ai: true, reason: c.reason, aiProb: c.aiProb })).join('');
    const made = parlayMode === 'sure' ? (moon ? [] : sureParlays([n], parlayProps)) : makeParlays(moon ? [6, 7, 8] : [n], parlayMode, parlayProps);
    list += made.map((c) => (parlayMode === 'sure' ? parlayCard(c, { head: `<b>${pct(c.fair)} chance · pays about ${(1 / c.price).toFixed(2)}x</b><span>${c.ev > 0 ? `Priced below what it's worth: about ${money(c.ev * 10, true)} expected profit per $10 over time.` : `Fairly priced. Expect to break about even over time.`}</span>` }) : parlayCard(c))).join('');
    if (parlayMode === 'sure') html += `<p class="banner">${moon ? 'A 6-leg parlay can’t be 70% sure, so pick 2 to 5 legs.' : `These are the parlays it gives at least a 7-in-10 chance, ranked by what they pay. Honest limit: a parlay that really hits 7 times in 10 can only pay about ${(1 / SURE_MIN).toFixed(1)}x. Anything paying much more than that is not really 70%. The next 7 days of games, so you can build a card for the whole week.`}</p>`;
    if (moon) html += `<p class="banner">Moonshots are long shots on purpose: most will lose. They're here for small, fun bets with a big payout, ranked so the ones with the best real chance come first.</p>`;
    html += list ? `<div class="picks">${list}</div>` : `<div class="card empty"><strong>No ${moon ? 'moonshots' : n + '-leg parlays'} pass the bar right now</strong><span>${parlayMode === 'sure' ? `No ${n}-leg parlay reaches a 70% chance with today's prices. Try 2 legs, turn on player bets, or widen to all sports.` : 'Try “Most likely to hit”, turn on player bets, or pick a different sport.'}</span></div>`;
    return html;
  }
  function latestWeekly() { const ids = Object.keys(weeklyDocs).sort(); const w = ids.length ? weeklyDocs[ids[ids.length - 1]] : null; return w && Date.now() - Date.parse(w.at || w.date) < 8 * 86400e3 ? w : null; }
  function renderWeek() {
    const W = latestWeekly();
    let html = '';
    if (W) {
      html += `<div class="card"><div class="row" style="justify-content:space-between"><h3>The researcher's weekly card</h3><span class="pill ai">${esc(new Date(W.at || W.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }))}</span></div>${W.overview ? `<p>${esc(W.overview)}</p>` : ''}</div><div class="picks">`;
      if (W.lock && passPick(W.lock) && upcoming(W.lock)) html += pickCard(W.lock, true, '<b>Closest to a sure thing</b><span>The single bet it trusts most this week. Still not guaranteed.</span>');
      if (W.moonshot && passPick(W.moonshot) && comboUpcoming(W.moonshot)) html += parlayCard(W.moonshot, { ai: true, reason: W.moonshot.reason, aiProb: W.moonshot.aiProb, head: `<b>Moonshot of the week</b><span>Pays about ${Math.round(W.moonshot.payout || 1 / W.moonshot.price)}x if every leg hits.</span>` });
      if (W.fifty && passPick(W.fifty) && comboUpcoming(W.fifty)) html += parlayCard(W.fifty, { ai: true, reason: W.fifty.reason, aiProb: W.fifty.aiProb, head: '<b>Best 50x card</b><span>Its most confident parlay that pays at least 50 times your money.</span>' });
      for (const p of (W.favorites || []).filter((p) => passPick(p) && upcoming(p))) html += pickCard(p, true, '<b>Favorite pick</b>');
      for (const c of (W.parlays || []).filter((c) => passPick(c) && comboUpcoming(c))) html += parlayCard(c, { ai: true, reason: c.reason, aiProb: c.aiProb, head: '<b>Favorite parlay</b>' });
      html += `</div>`;
    } else html += `<div class="card empty"><strong>The researcher's first weekly card arrives Thursday morning</strong><span>Until then, here's the math's version, built from the latest prices.</span></div>`;
    html += `<h3 style="margin-top:6px">The math's version (next 7 days)</h3><div class="picks">`;
    const lock = lockOfWeek();
    if (lock) html += pickCard(lock, false, `<b>Closest to a sure thing</b><span>Highest chance of any fairly priced bet this week: ${pct(lock.fair)}. Not guaranteed.</span>`);
    const moon = makeParlays([6], 'likely', false, 7, 1)[0];
    if (moon) html += parlayCard(moon, { head: `<b>Moonshot</b><span>The 6-leg parlay most likely to hit this week. Pays about ${Math.round(moon.payout)}x.</span>` });
    const fifty = fiftyX(false);
    if (fifty) html += parlayCard(fifty, { head: `<b>Best 50x card</b><span>The parlay paying at least 50x with the best chance: ${pct(fifty.fair, 1)}, about 1 in ${Math.round(1 / fifty.fair)}.</span>` });
    const favs = (index.picks?.value || []).filter((p) => passPick(p) && upcoming(p)).slice(0, 5);
    for (const p of favs) html += pickCard(p, false, '<b>Favorite pick</b><span>Biggest price gap versus the sportsbooks.</span>');
    html += `</div>`;
    if (!lock && !moon && !fifty && !favs.length) html += `<div class="card empty"><strong>Nothing qualifies for this sport right now</strong></div>`;
    return html;
  }
  // ---------- top 10 lists (build-your-own parlays) ----------
  let topRange = store.get('topRange', 'day'), topMode = store.get('topMode', 'likely');
  // Picking an NFL game window means "those games this week", so the 24-hour range steps aside.
  const slotOn = () => sport === 'nfl' && slot !== 'all';
  const rangeDays = () => (slotOn() ? 7 : topRange === 'day' ? 1 : 7);
  const rangeSeg = () => (slotOn() ? `<button aria-pressed="true" disabled>This week · ${slot === 'prime' ? 'Prime time' : (SLOTS.find(([k]) => k === slot) || [, ''])[1]}</button>` : [['day', 'Next 24 hours'], ['week', 'Next 7 days']].map(([k, l]) => `<button data-toprange="${k}" aria-pressed="${topRange === k}">${l}</button>`).join(''));
  const TOP_MODES = [['likely', 'Most likely to win'], ['value', 'Best value'], ['players', 'Player bets']];
  const TOP_NOTE = {
    likely: 'The bets with the highest chance of winning that aren’t overpriced. Safer, smaller payouts — good parlay legs.',
    value: 'The biggest bargains: Kalshi’s price is furthest below what the bet is worth. This is where long-run profit comes from.',
    players: 'Player bets most likely to hit, with how often the player has done it lately. Tap a player’s bet, then his name, for his full history.',
  };
  function topPool(days) {
    const now = Date.now(), lim = now + days * 86400e3, out = [];
    for (const G of games) {
      const t = Date.parse(G.start);
      if (G.state !== 'pre' || t < now + 5 * 60e3 || t > lim || !passG(G)) continue;
      for (const e of G._e) if (e.fair != null && !e.tail && !e.paused && e.price >= 0.35 && e.price <= 0.95 && e.vol >= (e.model === 'stats' ? 50 : 150)) out.push(e);
    }
    return out;
  }
  // "Magic not to win" and "Grizzlies to win" are the same bet: count them once.
  function topList(pool, mode) {
    let L;
    if (mode === 'likely') L = pool.filter((e) => e.edge >= -0.01 && e.price <= 0.93).sort((a, b) => b.fair - a.fair);
    else if (mode === 'value') L = pool.filter((e) => e.edge >= 0.02).sort((a, b) => b.edge / b.cost - a.edge / a.cost);
    else L = pool.filter((e) => e.model === 'stats' && e.edge >= -0.01 && e.price <= 0.9).sort((a, b) => b.fair - a.fair);
    const seen = new Set(), perG = {}, out = [];
    for (const e of L) {
      if (seen.has(e.ticker) || seen.has(outcomeKey(e)) || (perG[e.game] || 0) >= 2) continue;
      seen.add(e.ticker); seen.add(outcomeKey(e)); perG[e.game] = (perG[e.game] || 0) + 1; out.push(e);
      if (out.length >= 10) break;
    }
    return out;
  }
  function topRow(e, i) {
    const inCombo = combo.some((l) => l.ticker === e.ticker && l.side === e.side);
    const did = e.model === 'stats' && e.l10?.[1] >= 3 ? `Did it in ${e.side === 'yes' ? e.l10[0] : e.l10[1] - e.l10[0]} of his last ${e.l10[1]} games` : '';
    return `<div class="trow"><button class="tmain" data-sheet="${esc(e.key)}"><span class="rk">${i + 1}</span><span class="n"><b>${esc(e.label)}</b><span>${esc(LG[e.league]?.label || '')} · ${esc(e.gameLabel)} · ${esc(whenOf(e.start))}</span>${did ? `<span>${did}</span>` : ''}</span><span class="ch num"><b>${e.fair != null ? Math.round(e.fair * 100) : '—'}</b>${cents(e.price)} · ${(1 / e.price).toFixed(1)}x</span></button>
      <button class="addp" data-addleg="${esc(e.key)}" aria-pressed="${inCombo}" aria-label="${inCombo ? 'Remove from' : 'Add to'} parlay: ${esc(e.label)}">${inCombo ? '✓ Added' : '+ Parlay'}</button></div>`;
  }
  function renderTop() {
    const days = rangeDays();
    let h = `<div class="row" style="justify-content:space-between;gap:8px"><div class="seg small" role="group" aria-label="When">${rangeSeg()}</div></div>
      <div class="seg" role="group" aria-label="Rank by">${TOP_MODES.map(([k, l]) => `<button data-topmode="${k}" aria-pressed="${topMode === k}">${l}</button>`).join('')}</div>
      <p class="lede" style="font-size:14px">${TOP_NOTE[topMode]} The big number is its confidence — its chance the pick wins, out of 100. Then Kalshi's price and what it pays.</p>`;
    if (combo.length) {
      const legs = combo.map((l) => mkt[l.ticker + '|' + l.side] || l);
      const fair = legs.every((l) => l.fair != null) ? legs.reduce((a, l) => a * l.fair, 1) : null, price = legs.reduce((a, l) => a * (l.price || 1), 1);
      h += `<div class="card"><div class="row" style="justify-content:space-between;gap:10px"><div><b>Your parlay: ${combo.length} leg${combo.length > 1 ? 's' : ''}</b><div class="hint">Chance all win: ${fair != null ? pct(fair, fair < 0.1 ? 1 : 0) : '—'} · pays about ${price ? (1 / price < 10 ? (1 / price).toFixed(1) : Math.round(1 / price)) : '—'}x (Kalshi quotes its own combo price)</div></div><button class="btn small primary" data-go="combo">Open it ›</button></div></div>`;
    }
    const pool = topPool(days);
    const lgs = ['nfl', 'nba', 'mlb', 'cfb', 'cbb'].filter((k) => passLg(k));
    const secs = sport === 'all' ? [['all', 'All sports'], ...lgs.map((k) => [k, LG[k].label])] : [[sport, LG[sport].label]];
    let any = false;
    for (const [k, title] of secs) {
      const list = topList(k === 'all' ? pool : pool.filter((e) => e.league === k), topMode);
      if (!list.length) continue; any = true;
      h += `<div class="card"><h3>${esc(title)} · top ${list.length}</h3><div>${list.map(topRow).join('')}</div></div>`;
    }
    if (!any) h += `<div class="card empty"><strong>Nothing qualifies ${rangeDays() === 1 ? 'in the next 24 hours' : slotOn() ? 'in this game window' : 'this week'}</strong><span>Try the other time range or another list.</span></div>`;
    return h;
  }
  // ---------- pays 2x or more: highest-chance singles and parlays ----------
  function twoXSingles(days) {
    const L = topPool(days).filter((e) => e.cost <= 0.5 && e.edge >= -0.02 && e.fair >= 0.3 && (parlayProps || e.model !== 'stats')).sort((a, b) => b.fair - a.fair);
    const seen = new Set(), perG = {}, out = [];
    for (const e of L) {
      if (seen.has(e.ticker) || (perG[e.game] || 0) >= 1) continue; // one per game, so it isn't the same bet twice
      seen.add(e.ticker); perG[e.game] = 1; out.push(e);
      if (out.length >= 10) break;
    }
    return out;
  }
  function twoXParlays(days) {
    const key = ['2x', index?.updatedAt, tick(), sport, college, slot, parlayProps, days].join('|');
    if (parlayCache[key]) return parlayCache[key];
    const pool = legPool(parlayProps, days).filter((e) => e.edge >= -0.04 && e.price <= 0.93 && !e.paused);
    const found = new Map();
    // For each size, aim every leg near the price that makes the whole parlay pay 2x–5x, then keep the likeliest.
    for (const n of [2, 3, 4]) for (const target of [0.5, 0.4, 0.3]) {
      const per = Math.pow(target, 1 / n);
      for (const cap of [per + 0.08, per + 0.04, per]) {
        const perGame = {}; const L = pool.filter((e) => e.price <= cap).sort((a, b) => b.fair - a.fair).filter((e) => (perGame[e.game] = (perGame[e.game] || 0) + 1) <= 2).slice(0, 90);
        const all = L.length >= n ? beamParlays(L, n, (e) => Math.log(e.fair), 120) : [];
        for (const b of all[n - 1] || []) {
          const c = toParlay(L, b);
          if (c.cost > 0.5 || c.price < 0.2) continue;
          const sig = c.legs.map((l) => l.key).sort().join();
          if (!found.has(sig)) found.set(sig, c);
        }
      }
    }
    return (parlayCache[key] = diverse([...found.values()].sort((a, b) => b.fair - a.fair), 8));
  }
  function renderTwoX() {
    const days = rangeDays();
    let h = `<div class="row" style="justify-content:space-between;gap:8px"><div class="seg small" role="group" aria-label="When">${rangeSeg()}</div>
      <label class="switch"><input type="checkbox" data-toggle="props" ${parlayProps ? 'checked' : ''}><span class="track" aria-hidden="true"></span>Use player bets</label></div>`;
    const singles = twoXSingles(days);
    h += `<div class="card"><h3>Single bets that pay 2x or more</h3><p class="hint">Ranked by how likely they are to win, one per game. The big number is its confidence (out of 100); then Kalshi's price and what it pays.</p>${singles.length ? `<div>${singles.map(topRow).join('')}</div>` : `<p class="lede">None qualify ${rangeDays() === 1 ? 'in the next 24 hours' : slotOn() ? 'in this game window' : 'this week'}. Try the other time range.</p>`}</div>`;
    const parl = twoXParlays(days);
    h += `<h3 style="margin-top:6px">Parlays that pay 2x to 5x</h3>`;
    h += parl.length ? `<div class="picks">${parl.map((c) => parlayCard(c, { head: `<b>Pays about ${(1 / c.price).toFixed(1)}x</b><span>Chance every leg wins: ${pct(c.fair)}${c.ev > 0 ? ' · priced below what it’s worth' : ''}</span>` })).join('')}</div>` : `<div class="card empty"><strong>No parlays in that range right now</strong><span>Try the other time range, turn on player bets, or pick a different sport.</span></div>`;
    return h;
  }
  // ---------- most confident: highest chance + independent sources agreeing ----------
  function agreeOf(e) {
    const out = [[e.model === 'stats' ? 'Player stats' : 'Sportsbooks', e.fair >= 0.5], ['Kalshi crowd', e.price >= 0.5]];
    if (e.espn != null) out.push(["ESPN's model", e.espn >= 0.5]);
    if (e.rate != null) out.push(['Our team ratings', e.rate >= 0.5]);
    if (e.model === 'stats' && e.l10?.[1] >= 5) { const h = e.side === 'yes' ? e.l10[0] : e.l10[1] - e.l10[0]; out.push([`Recent games ${h}/${e.l10[1]}`, h / e.l10[1] >= 0.6]); }
    if (aiNotesFor(e).length) out.push(['AI researcher', true]);
    return out;
  }
  function confidentList(days) {
    const L = topPool(days).filter((e) => e.fair >= 0.65 && e.price <= 0.9 && e.edge >= -0.04 && (parlayProps || e.model !== 'stats'))
      .map((e) => ({ e, dis: agreeOf(e).filter((a) => !a[1]).length })).sort((a, b) => a.dis - b.dis || b.e.fair - a.e.fair);
    const seen = new Set(), perG = {}, out = [];
    for (const { e, dis } of L) {
      const k = outcomeKey(e);
      if (seen.has(e.ticker) || seen.has(k) || (perG[e.game] || 0) >= 2) continue;
      seen.add(e.ticker); seen.add(k); perG[e.game] = (perG[e.game] || 0) + 1; out.push({ e, dis });
      if (out.length >= 15) break;
    }
    return out;
  }
  function confRow({ e }, i) {
    const a = agreeOf(e); const ok = a.filter((x) => x[1]).length;
    const no = a.filter((x) => !x[1]).map((x) => x[0]);
    const line = no.length ? `<span class="agree">${ok} of ${a.length} agree · <span class="n">✗ ${esc(no.join(', '))} ${no.length > 1 ? 'disagree' : 'disagrees'}</span></span>` : `<span class="agree"><span class="y">✓ ${a.length === 2 ? 'Both agree' : `All ${a.length} agree`}</span> (${esc(a.map((x) => x[0]).join(', '))})</span>`;
    const over = e.edge < -0.005 ? `<span class="agree">Costs about ${Math.round(-e.edge * 100)}¢ more than it's worth</span>` : e.edge > 0.005 ? `<span class="agree"><span class="y">About ${Math.round(e.edge * 100)}¢ cheaper than it's worth</span></span>` : '';
    return topRow(e, i).replace('</span></span><span class="ch num">', `</span>${line}${over}</span><span class="ch num">`);
  }
  function renderSure() {
    const days = rangeDays();
    let h = `<div class="row" style="justify-content:space-between;gap:8px"><div class="seg small" role="group" aria-label="When">${rangeSeg()}</div>
      <label class="switch"><input type="checkbox" data-toggle="props" ${parlayProps ? 'checked' : ''}><span class="track" aria-hidden="true"></span>Use player bets</label></div>`;
    const list = confidentList(days);
    if (!list.length) return h + `<div class="card empty"><strong>Nothing it's very sure about ${rangeDays() === 1 ? 'in the next 24 hours' : slotOn() ? 'in this game window' : 'this week'}</strong><span>Try the other time range or turn on player bets.</span></div>`;
    const tiers = [['Very likely', 'It gives these 80% or more', (x) => x.e.fair >= 0.8], ['Likely', 'It gives these 65–80%', (x) => x.e.fair < 0.8]];
    let n = 0;
    for (const [t, sub, f] of tiers) {
      const L = list.filter(f); if (!L.length) continue;
      h += `<div class="card"><div class="tier"><h3>${t}</h3><span class="hint">${sub}</span></div><div>${L.map((x) => confRow(x, n++)).join('')}</div></div>`;
    }
    // parlays from the agreed-on picks only
    const legs = list.filter((x) => x.dis === 0).map((x) => x.e);
    if (legs.length >= 2) {
      const all = beamParlays(legs, Math.min(3, legs.length), (e) => Math.log(e.fair), 60);
      const pick = [];
      for (const n2 of [2, 3]) pick.push(...diverse((all[n2 - 1] || []).map((b) => toParlay(legs, b)), 2));
      if (pick.length) h += `<h3 style="margin-top:6px">Confident parlays</h3><p class="lede" style="font-size:14px">Built only from picks where every source agrees.</p><div class="picks">${pick.map((c) => parlayCard(c, { head: `<b>Chance every leg hits: ${pct(c.fair)}</b><span>Pays about ${(1 / c.price).toFixed(1)}x</span>` })).join('')}</div>`;
    }
    h += `<p class="hint">Being right isn't the whole story: an 85% bet pays about 1.15x, so one loss wipes out about six wins. Most sure-thing bets on Kalshi cost a few cents more than they're worth, so each one shows how much; it skips any that cost more than 4¢ extra. Track record → Hit rates shows how often “80% sure” really wins.</p>`;
    return h;
  }
  // In-progress games (shared website): live score plus the "to win" bets, with ESPN's in-game chance against Kalshi's live price
  function liveNowCard() {
    const list = games.filter((G) => G.state === 'in' && G.live && !G.live.done && passG(G));
    if (!list.length) return '';
    return `<div class="card"><div class="row" style="justify-content:space-between"><h3>Live now</h3><span class="pill high">${list.length} game${list.length === 1 ? '' : 's'} under way</span></div>
      <p class="hint">In-game bets. The chance is ESPN’s live win model; the price is live from Kalshi. These are not in the parlay builders.</p>
      ${list.map((G) => { const es = G._e.filter((e) => e.kind === 'winner' && e.side === 'yes').sort((a, b) => (b.fair ?? 0) - (a.fair ?? 0)); return `<button class="leg-row" data-game="${esc(G.key)}" style="margin-top:8px"><span class="n"><b>${esc(tn(G.away))} @ ${esc(tn(G.home))}</b><span>${esc(LG[G.league].label)} · <span class="neg">Live · ${esc(scoreLine(G, G.live))}</span></span></span><span class="num">›</span></button><div class="mlist">${es.map((e) => mrow(e)).join('') || '<p class="hint">No winner bet open right now.</p>'}</div>`; }).join('')}</div>`;
  }
  // ---------- The $100 → $100K challenge: one weekly-card parlay a week, same state for everyone (worked out from the Record) ----------
  const CHAL = { start: 100, goal: 100000, steps: 11, max: 15 };
  const weekKey = (iso) => { const d = new Date(String(iso).slice(0, 10) + 'T12:00:00Z'); const day = (d.getUTCDay() + 6) % 7; d.setUTCDate(d.getUTCDate() - day); return d.toISOString().slice(0, 10); }; // Monday of that week
  const chMult = (c) => 1 / (c.cost || c.price), chChance = (c) => c.aiProb ?? c.fair ?? 0;
  const chalNeed = (bank, step, horizon) => Math.pow(CHAL.goal / bank, 1 / Math.max(1, horizon - step + 1));
  // The parlay for a step: the best chance among those that pay enough to finish in 11 steps; else enough for 15; else the biggest payout
  function chalPick(cands, bank, step) {
    const ok = cands.filter((c) => chMult(c) >= chalNeed(bank, step, CHAL.steps)), ok2 = cands.filter((c) => chMult(c) >= chalNeed(bank, step, CHAL.max));
    const pool = ok.length ? ok : ok2.length ? ok2 : cands;
    return pool.slice().sort((a, b) => (ok.length || ok2.length ? chChance(b) - chChance(a) : chMult(b) - chMult(a)) || a.id.localeCompare(b.id))[0] || null;
  }
  const sharesLeg = (a, b) => a.legs.some((x) => b.legs.some((y) => x.ticker === y.ticker));
  function chalState() {
    const byWeek = {};
    for (const p of allPicks()) if (p.src === 'weekly' && p.cat === 'parlay' && p.legs && p.legs.length >= 2 && p.legs.length <= 5 && p.day) { const wk = weekKey(p.day); (byWeek[wk] ||= {})[p.day] = (byWeek[wk][p.day] || []).concat(p); }
    const S = { attempt: 1, bank: CHAL.start, step: 1, open: [], history: [], attempts: [], done: null, streak: 0, best: 0, bestAttempt: 0 };
    const endAttempt = (atStep) => { S.attempts.push({ n: S.attempt, reached: atStep - 1, peak: S.peak || CHAL.start }); S.attempt++; S.bank = CHAL.start; S.step = 1; S.streak = 0; S.peak = CHAL.start; };
    outer: for (const wk of Object.keys(byWeek).sort()) {
      const days = Object.keys(byWeek[wk]).sort(); const cands = byWeek[wk][days[days.length - 1]]; // the latest card that week
      const first = chalPick(cands, S.bank, S.step); if (!first) continue;
      // a second parlay the same week only when the card has another good one with different legs
      const rest = cands.filter((c) => c !== first && !sharesLeg(c, first) && chChance(c) >= 0.4);
      const second = rest.length ? chalPick(rest, first.res === 'won' ? S.bank / (first.cost || first.price) : S.bank, S.step + 1) : null;
      for (const c of [first, second].filter(Boolean)) {
        const after = S.open.length; // the second parlay only counts once the first has hit; until then it is shown as the next step
        const entry = { step: S.step + after, attempt: S.attempt, bankBefore: after ? Math.round(S.bank / (first.cost || first.price) * 100) / 100 : S.bank, pick: c, date: days[days.length - 1], ifHits: after ? S.step : null };
        if (c.res === 'won') { S.bank = Math.round(S.bank / (c.cost || c.price) * 100) / 100; S.peak = Math.max(S.peak || 0, S.bank); entry.bankAfter = S.bank; S.history.push(entry); S.step++; S.streak++; if (S.streak > S.best) { S.best = S.streak; S.bestAttempt = S.attempt; } if (S.bank >= CHAL.goal || S.step > CHAL.steps) { S.done = 'won'; break outer; } }
        else if (c.res === 'lost') { entry.bankAfter = 0; S.history.push(entry); endAttempt(S.step); break; }
        else { S.open.push(entry); if (S.open.length === 1 && c === first && second) { continue; } break outer; }
      }
      if (S.open.length) break;
    }
    S.need = chalNeed(S.bank, S.step, CHAL.steps); S.need15 = chalNeed(S.bank, S.step, CHAL.max);
    return S;
  }
  function challengeCard() {
    const S = chalState();
    const stepsHit = S.step - 1; const segs = Array.from({ length: CHAL.steps }, (_, k) => `<i class="${k < stepsHit ? 'hit' : k < stepsHit + S.open.length ? 'live' : ''}"></i>`).join('');
    let h = `<div class="card" style="display:grid;gap:8px"><div class="row" style="justify-content:space-between;align-items:flex-end;gap:10px"><div><h3 style="margin:0">$100 → $100K challenge</h3><div class="hint">${S.done === 'won' ? 'Finished!' : `Step ${S.step} of ${CHAL.steps}${S.attempt > 1 ? ` · attempt ${S.attempt}` : ''}`} · each win rolls into the next parlay</div></div><div style="text-align:right"><div class="bigstat num" style="font-size:26px">${money(S.bank)}</div><div class="hint">bank</div></div></div>
      <div class="steps" aria-label="${stepsHit} of ${CHAL.steps} steps hit">${segs}</div>
      <div class="hint">Needs about <b>${S.need.toFixed(2)}x</b> per step to finish in ${CHAL.steps}; anything over ${S.need15.toFixed(2)}x still finishes within ${CHAL.max}. Up to two parlays a week when the Thursday card has two good ones.</div>`;
    if (S.done === 'won') h += `<div class="banner"><b>Done: $100 turned into ${money(S.bank)}.</b></div>`;
    else if (S.open.length) h += `<div class="picks">${S.open.map((e) => parlayCard(e.pick, { title: `Step ${e.step} parlay`, who: 'Challenge', sub: `${e.ifHits ? `if step ${e.ifHits} hits, ` : ''}${money(e.bankBefore)} on it · wins ${money(e.bankBefore / (e.pick.cost || e.pick.price))}`, aiProb: e.pick.aiProb })).join('')}</div>`;
    else h += `<div class="card empty" style="padding:12px"><strong>The next parlay arrives with Thursday's card</strong><span>It takes the parlay with the best chance that pays enough to stay on pace.</span></div>`;
    const rec = `<b>Closest so far: ${S.best} in a row</b>${S.best ? ` (attempt ${S.bestAttempt})` : ''}${S.attempts.length ? ` · ${S.attempts.length} attempt${S.attempts.length === 1 ? '' : 's'} ended` : ''} · current run ${S.streak}`;
    h += `<div class="hint" style="border-top:1px solid var(--line);padding-top:8px">${rec}</div>`;
    if (S.history.length) h += `<details><summary class="hint">Every step so far (${S.history.length})</summary><div style="display:grid;gap:4px;margin-top:6px">${S.history.slice().reverse().map((e) => `<div class="row" style="justify-content:space-between;gap:8px;font-size:13px"><span><span class="pill ${e.bankAfter ? 'won' : 'lost'}">${e.bankAfter ? 'hit' : 'missed'}</span> Step ${e.step}${e.attempt > 1 ? ` (attempt ${e.attempt})` : ''} · ${e.pick.legs.length}-leg · ${chMult(e.pick).toFixed(1)}x · ${esc(dayLabel(e.date + 'T12:00:00'))}</span><b class="num">${money(e.bankBefore)} → ${money(e.bankAfter)}</b></div>`).join('')}</div></details>`;
    return h + '</div>';
  }
  // ---------- Parlays tab: today's parlays by size (all tracked), plus the generator ----------
  const chancePill = (ch) => (ch == null ? '<span class="pill low">no estimate</span>' : `<span class="pill ${ch >= 0.5 ? 'high' : ch >= 0.3 ? 'medium' : 'low'}" title="Chance every leg wins">${pct(ch, ch < 0.1 ? 1 : 0)} chance</span>`);
  const parlayLive = (c) => { const legs = c.legs.map((l) => mkt[l.key || l.ticker + '|' + l.side] || l); return { fair: legs.every((l) => l.fair != null) ? legs.reduce((a, l) => a * l.fair, 1) : c.fair, price: legs.reduce((a, l) => a * (l.price || 1), 1) }; };
  function parlayCardX(c, who, cls, reason, aiProb) { return parlayCard(c, { who, ai: cls === 'ai', reason, aiProb, sub: c.day ? dayLabel(c.day + 'T12:00:00') : '' }); }
  function renderParlaysTab() {
    const el = $('p-parlays');
    const R = latestResearch(); const isToday = !!R && Date.now() - Date.parse(R.at || R.date + 'T15:00:00Z') < 36 * 3600e3; const W = latestWeekly();
    let html = `<div style="display:grid;gap:6px"><h2>Parlays</h2><p class="lede">Each one shows its chance of hitting and what it pays. Every parlay here is tracked in the Record, so you can see later what hit.</p></div>`;
    if (!index) { html += `<div class="card empty"><strong>${dbState === 'off' ? 'Parlays can’t load in this view' : 'Loading…'}</strong></div>`; el.innerHTML = html; return; }
    html += parlaysView === 'gen' ? `<button class="btn" data-pview="today" style="width:100%">‹ Back to today’s parlays</button>` : `<button class="btn primary" data-pview="gen" style="width:100%;font-size:17px;padding:14px">⚡ Generate a parlay</button>`;
    if (parlaysView === 'gen') { html += genCard(); el.innerHTML = html; return; }
    html += challengeCard();
    html += filterBar();
    // the tool's own parlays from the latest refreshes, only those whose legs can all still be bought
    const autos = allPicks().filter((p) => p.cat === 'auto' && p.legs && comboUpcoming(p) && passPick(p) && (sport === 'all' || p.scope === sport || p.legs.every((l) => l.league === sport))).sort((a, b) => (b.day || '').localeCompare(a.day || '') || a.n - b.n);
    const seen = new Set(); const byN = autos.filter((p) => { const k = p.n + '|' + genSig(p); if (seen.has(k)) return false; seen.add(k); return true; }).sort((a, b) => a.n - b.n || (parlayLive(b).fair || 0) - (parlayLive(a).fair || 0)).slice(0, 8);
    const ais = isToday ? (R.combos || []).filter((c) => c.legs && comboUpcoming(c) && passPick(c)) : [];
    const wk = W ? [...(W.parlays || []), W.moonshot, W.fifty].filter((c) => c && c.legs && comboUpcoming(c) && passPick(c)) : [];
    if (!byN.length) html += `<div class="card empty"><strong>${autos.length || allPicks().some((p) => p.cat === 'auto') ? 'Today’s parlays have started' : 'No parlays built yet'}</strong><span>The tool builds a fresh set at each price refresh (about 8 AM, 1 PM and 4 PM, plus game-day hours). Want one now?</span><button class="btn primary" data-pview="gen">Generate one</button></div>`;
    if (byN.length) html += `<h3>Most confident, by size</h3><p class="hint">The best parlay the tool could build at the last refresh for each number of legs.</p><div class="picks">${byN.map((c) => parlayCardX(c, 'Math', 'low')).join('')}</div>`;
    if (ais.length) html += `<h3 style="margin-top:10px">AI researcher</h3><div class="picks">${ais.map((c) => parlayCardX(c, 'AI researcher', 'ai', c.reason, c.aiProb)).join('')}</div>`;
    if (wk.length) html += `<h3 style="margin-top:10px">Weekly card</h3><div class="picks">${wk.map((c) => parlayCardX(c, 'Weekly card', 'ai', c.reason, c.aiProb)).join('')}</div>`;
    el.innerHTML = html;
  }
  const PICK_LISTS = [['sure', 'Most confident'], ['value', 'Best value'], ['payout', 'Big payout'], ['props', 'Player bets'], ['ai', 'AI researcher']];
  let pickList = store.get('pickList', 'sure'); if (!PICK_LISTS.some(([k]) => k === pickList)) pickList = 'sure';
  function pickRow(p, i, ai) {
    const m = live(p) || p; const price = m.price ?? p.price; const ch = ai && p.aiProb ? p.aiProb : (m.fair ?? p.fair);
    const key = p.ticker + '|' + p.side, inCombo = combo.some((l) => l.ticker === p.ticker && l.side === p.side), closed = closedOf(p), c = confOf(ch);
    return `<div class="trow"><button class="tmain" data-sheet="${esc(key)}"><span class="rk">${i + 1}</span><span class="n"><b>${esc(p.label)}</b><span>${esc(LG[p.league]?.label || '')} · ${esc(p.gameLabel || '')} · ${esc(startsIn(p.start))}</span>${closed ? '<span><span class="pill lost">Closed on Kalshi</span></span>' : ''}${ai && p.reason ? `<span>${esc(p.reason)}</span>` : ''}</span><span class="ch num"><b class="${c.cls}">${c.score}</b>${cents(price)} · ${price ? (1 / price).toFixed(1) : '—'}x${price ? `<span class="usd">$10 pays ${money(10 / price)}</span>` : ''}</span></button>
      <span class="acts2"><a class="addp kal" href="${esc(kalshiUrlFor(p.ticker))}" target="_blank" rel="noopener" aria-label="Bet on Kalshi: ${esc(p.label)}">Bet ↗</a><button class="addp" data-addleg="${esc(key)}" aria-pressed="${inCombo}" aria-label="${inCombo ? 'Remove from' : 'Add to'} parlay: ${esc(p.label)}">${inCombo ? '✓ Added' : '+ Parlay'}</button></span></div>`;
  }
  // The first thing on screen: the best parlay to take right now. Logged parlays first (so it is tracked); if none are open, a fresh one.
  let heroGen = null; // a generated fallback, kept until its legs start so the card does not change on every redraw
  function heroPick() {
    const now = Date.now(), lim = now + 48 * 3600e3;
    const openLeg = (l) => { const e = mkt[l.ticker + '|' + l.side]; const t = Date.parse(l.start || e?.start || 0); return e && !e.inGame && t > now + 5 * 60e3 && t < lim && (e.price ?? l.price) >= 0.4 && (e.fair ?? l.fair ?? 0) >= 0.55 && e.kind !== 'prop'; };
    const score = (c) => parlayLive(c).fair || 0, mult = (c) => 1 / (parlayLive(c).price || 1);
    const logged = allPicks().filter((p) => p.legs && p.legs.length >= 2 && p.legs.length <= 3 && (p.src === 'ai' || p.src === 'math' || p.src === 'weekly') && p.legs.every(openLeg) && !closedOf(p) && mult(p) >= 1.6 && passPick(p)).sort((a, b) => score(b) - score(a));
    if (logged.length) return { c: logged[0], who: logged[0].src === 'ai' ? 'AI researcher' : logged[0].src === 'weekly' ? 'Weekly card' : 'Math', tracked: true };
    if (heroGen && heroGen.legs.every((l) => Date.parse(l.start) > now + 5 * 60e3 && mkt[l.key])) return { c: heroGen, who: 'Built just now', tracked: false };
    const cands = genCandidates({ league: 'mix', when: 'any', n: 'any', min: 1.6 }).filter((c) => c.legs.length <= 3 && c.legs.every((l) => l.price >= 0.4 && l.fair >= 0.55));
    heroGen = cands[0] || null;
    return heroGen ? { c: heroGen, who: 'Built just now', tracked: false } : null;
  }
  function heroCard() {
    const H = heroPick();
    if (!H) return `<div class="card" style="border-color:var(--amber)"><h3 style="margin:0 0 4px">Best parlay right now</h3><div class="card empty" style="padding:10px"><strong>Nothing worth taking at the moment</strong><span>Games are under way or nothing clears the bar. New picks land around 8 AM.</span></div></div>`;
    const { fair, price } = parlayLive(H.c);
    return `<div class="card" style="border-color:var(--amber);display:grid;gap:8px"><div class="row" style="justify-content:space-between;align-items:baseline"><h3 style="margin:0">Best parlay right now</h3><span class="pill medium">${pct(fair)} chance · ${price ? (1 / price).toFixed(1) : '—'}x</span></div>
      <div class="picks">${parlayCard(H.c, { who: H.who, ai: H.c.src === 'ai', aiProb: H.c.aiProb, reason: H.c.reason, title: 'Take this one', sub: H.tracked ? 'tracked in the Record' : 'tap “I bet this” to track it' })}</div></div>`;
  }
  // "Own money": the bets the tool would take if the money were its own and it was told not to lose it. Strict, and allowed to pass.
  // Worked out from the logged picks, so the Record can score this strategy on its own.
  const ownChance = (p) => (p.src !== 'math' && p.aiProb ? p.aiProb : (live(p)?.fair ?? p.fair));
  function ownOk(p) {
    const c = ownChance(p); const price = live(p)?.price ?? p.price; if (c == null || !price) return false;
    const agree = p.espn == null || (p.espn >= 0.5) === (c >= 0.5); // ESPN's model must not disagree
    return price >= 0.4 && price <= 0.85 && c >= 0.6 && c - (p.cost || price) >= -0.01 && agree && p.kind !== 'prop' && !hardPause(p.league, p.kind) && !closedOf(p);
  }
  const ownLegOk = (l) => { const e = mkt[l.ticker + '|' + l.side]; const c = l.fair ?? e?.fair, price = e?.price ?? l.price; return c != null && price >= 0.4 && price <= 0.85 && c >= 0.6 && !hardPause(l.league, e?.kind) && e?.kind !== 'prop'; };
  function ownPicks(list, maxSingles = 5, maxParlays = 2) {
    const seen = new Set(); const okey = (p) => { const e = live(p); return e ? outcomeKey(e) : p.ticker + '|' + p.side; };
    const singles = list.filter((p) => !p.legs && ownOk(p)).sort((a, b) => ownChance(b) - ownChance(a)).filter((p) => (seen.has(okey(p)) ? false : (seen.add(okey(p)), true))).slice(0, maxSingles);
    const sigs = new Set(); const parlays = list.filter((p) => p.legs && p.legs.length >= 2 && p.legs.length <= 3 && p.legs.every(ownLegOk) && (p.aiProb ?? p.fair ?? 0) >= 0.4 && !closedOf(p)).sort((a, b) => (b.aiProb ?? b.fair) - (a.aiProb ?? a.fair)).filter((p) => (sigs.has(genSig(p)) ? false : (sigs.add(genSig(p)), true))).slice(0, maxParlays);
    return { singles, parlays };
  }
  function ownCard() {
    const now = Date.now(), lim = now + 36 * 3600e3; const soon = (p) => { const t = Date.parse(p.start); return t > now + 5 * 60e3 && t < lim; };
    const pool = allPicks().filter((p) => (p.src === 'ai' || p.src === 'math' || p.src === 'weekly') && (p.legs ? p.legs.every((l) => soon(l)) : soon(p)) && passPick(p));
    const { singles, parlays } = ownPicks(pool);
    const h = `<div class="card" style="display:grid;gap:8px;border-color:var(--accent)"><div class="row" style="justify-content:space-between;align-items:baseline"><h3 style="margin:0">If it were betting its own money</h3><span class="pill high">${singles.length + parlays.length ? `${singles.length + parlays.length} bet${singles.length + parlays.length === 1 ? '' : 's'}` : 'Passing'}</span></div>
      <p class="hint">Only its favorite setups: 40–85¢, at least a 60% chance, ESPN's model not against it, no player bets, nothing that has moved against us. Most days this is a short list, and some days it is nothing at all. Scored on its own in the Record.</p>`;
    if (!singles.length && !parlays.length) return h + `<div class="card empty" style="padding:10px"><strong>Nothing good enough today</strong><span>It would rather sit out than force a bet. Check back after the morning picks.</span></div></div>`;
    return h + (singles.length ? `<div>${singles.map((p, i) => pickRow(p, i, p.src === 'ai')).join('')}</div>` : '') + (parlays.length ? `<div class="picks">${parlays.map((c) => parlayCard(c, { who: c.src === 'ai' ? 'AI researcher' : c.src === 'weekly' ? 'Weekly card' : 'Math', ai: c.src !== 'math', aiProb: c.aiProb, reason: c.reason })).join('')}</div>` : '') + '</div>';
  }
  // The next 24 hours at a glance: best singles and parlays, all of them tracked
  function tonightCard() {
    const now = Date.now(), lim = now + 24 * 3600e3; const soon = (iso) => { const t = Date.parse(iso); return t > now - 5 * 60e3 && t < lim; };
    const okey = (p) => { const e = live(p); return e ? outcomeKey(e) : p.ticker + '|' + p.side; }; const seen = new Set();
    const singles = [...(index.picks?.safest || []), ...(index.picks?.value || []), ...(index.picks?.props || [])].filter((p) => soon(p.start) && !closedOf(p) && (live(p)?.fair ?? p.fair) != null && (live(p)?.price ?? p.price) >= 0.35 && !hardPause(p.league, p.kind)).sort((a, b) => (live(b)?.fair ?? b.fair) - (live(a)?.fair ?? a.fair)).filter((p) => (seen.has(okey(p)) ? false : (seen.add(okey(p)), true))).slice(0, 3);
    const R = latestResearch(); const isToday = !!R && now - Date.parse(R.at || R.date + 'T15:00:00Z') < 36 * 3600e3;
    const parlays = [...allPicks().filter((p) => p.cat === 'auto' && p.legs), ...(isToday ? (R.combos || []).filter((c) => c.legs) : [])].filter((c) => c.legs.every((l) => soon(l.start)) && !closedOf(c)).map((c) => ({ c, ch: c.aiProb ?? parlayLive(c).fair ?? 0 })).sort((a, b) => b.ch - a.ch);
    const sigs = new Set(); const top = parlays.filter(({ c }) => (sigs.has(genSig(c)) ? false : (sigs.add(genSig(c)), true))).slice(0, 2);
    const week = allPicks().filter((p) => p.legs && (p.res === 'won' || p.res === 'lost') && now - Date.parse(p.start) < 7 * 86400e3); const w = week.filter((p) => p.res === 'won').length, prof = week.reduce((a, p) => a + pickProfit(p), 0);
    if (!singles.length && !top.length) return '';
    return `<div class="card" style="display:grid;gap:8px"><div class="row" style="justify-content:space-between;align-items:baseline"><h3 style="margin:0">Next 24 hours</h3><button class="link" data-pview="gen">Generate a parlay ›</button>${week.length ? `<span class="hint">Last 7 days: ${w} of ${week.length} parlays hit · <b class="${prof >= 0 ? 'pos' : 'neg'}">${money(prof, true)}</b> at $10 each</span>` : ''}</div>
      ${singles.length ? `<div>${singles.map((p, i) => pickRow(p, i, false)).join('')}</div>` : ''}
      ${top.length ? `<div class="picks">${top.map(({ c }) => parlayCard(c, { who: c.src === 'ai' ? 'AI researcher' : 'Math', ai: c.src === 'ai', aiProb: c.aiProb, reason: c.reason })).join('')}</div>` : ''}</div>`;
  }
  function renderPicks() {
    const el = $('p-picks');
    const R = latestResearch();
    let html = `<div style="display:grid;gap:6px"><h2>Picks</h2><p class="lede">Single bets the tool likes. The big number is its confidence out of 100, then Kalshi's price and what it pays. Tap a pick for details, or “+ Parlay” to build with it. Every pick here is tracked in the Record.</p></div>`;
    if (!index) { html += `<div class="card empty"><strong>${dbState === 'off' ? 'Picks can’t load in this view' : 'Loading picks…'}</strong></div>`; el.innerHTML = html; return; }
    html += heroCard();
    html += ownCard();
    html += tonightCard();
    html += filterBar() + liveNowCard();
    html += `<div class="chips" role="group" aria-label="List">${PICK_LISTS.map(([k, l]) => `<button class="chip" data-plist="${k}" aria-pressed="${pickList === k}">${l}</button>`).join('')}</div>`;
    const conf = (p) => (pickList === 'ai' ? p.aiProb : (live(p)?.fair ?? p.fair)) || 0;
    const src = pickList === 'ai' ? allPicks().filter((p) => p.src === 'ai' && !p.legs) : index.picks?.[pickList === 'sure' ? 'safest' : pickList] || [];
    const seen = new Set();
    const okey = (p) => { const e = live(p); return e ? outcomeKey(e) : p.ticker + '|' + p.side; };
    const list = src.filter((p) => upcoming(p) && passPick(p) && (live(p)?.price ?? p.price) >= 0.35 && !hardPause(p.league, p.kind)).sort((a, b) => conf(b) - conf(a)).filter((p) => (seen.has(okey(p)) ? false : (seen.add(okey(p)), true))).slice(0, 15);
    if (pickList === 'ai' && R?.overview) html += `<div class="card"><div class="row" style="justify-content:space-between"><h3>Researcher's notes</h3><span class="pill ai">${R.date === todayKey() ? 'This morning' : 'From ' + esc(R.date)}</span></div><p>${esc(R.overview)}</p></div>`;
    html += list.length ? `<div class="card" style="padding-top:4px;padding-bottom:4px">${list.map((p, i) => pickRow(p, i, pickList === 'ai')).join('')}</div>` : `<div class="card empty"><strong>Nothing here right now</strong><span>${pickList === 'ai' ? 'The researcher posts picks each morning.' : 'Picks arrive with each price refresh. Try another list or another sport.'}</span></div>`;
    el.innerHTML = html;
  }
  function topEdge(G) { let best = null; for (const e of G._e) if (e.model === 'market' && !e.tail && e.edge != null && e.price >= 0.05 && e.price <= 0.95 && (!best || e.edge > best.edge)) best = e; return best; }
  let playerQ = '';
  // Search box shared by the Picks and Games tabs: finds players (→ player page) and teams (→ game page).
  const teamWords = (T) => [T?.display, T?.name, T?.short, T?.abbr, T?.location].filter(Boolean).join(' ').toLowerCase();
  function searchBox() {
    return `<div class="card"><label class="f">Find a player or team<input class="in" data-sq placeholder="e.g. CeeDee Lamb, or Cowboys" value="${esc(playerQ)}" autocomplete="off" enterkeyhint="search"><span class="hint">A player shows every line Kalshi offers on him and how often he has hit each one. A team opens its next game with every bet ranked.</span></label><div class="presults" data-sqr>${searchResults()}</div></div>`;
  }
  function searchResults() {
    const q = playerQ.trim().toLowerCase(); if (q.length < 2) return '';
    const now = Date.now(), out = [], teams = [];
    for (const G of games) {
      if (G.done || Date.parse(G.start) < now - 4 * 3600e3 || !passG(G)) continue;
      if (teamWords(G.home).includes(q) || teamWords(G.away).includes(q)) teams.push(G);
      if (G.state !== 'pre') continue;
      const names = [...new Set(G.props.map((P) => P.p))].filter((n) => n.toLowerCase().includes(q));
      for (const n of names) out.push({ G, n, P: G.props.find((P) => P.p === n), k: G.props.filter((P) => P.p === n).length });
    }
    if (!out.length && !teams.length) return `<p class="hint">Nothing upcoming matches “${esc(playerQ)}”. Kalshi only lists player bets for some games, and the sport filter above applies here too.</p>`;
    const nBets = (G) => G._e.filter((e) => e.price >= 0.03 && e.price <= 0.97).length;
    return teams.slice(0, 6).map((G) => `<button class="leg-row" data-game="${esc(G.key)}"><span class="n"><b>${esc(tn(G.away))} @ ${esc(tn(G.home))}</b><span>${esc(LG[G.league].label)} · ${G.state === 'in' ? 'Live now' : esc(whenOf(G.start))} · ${nBets(G)} bets</span></span><span class="hint">Game ›</span></button>`).join('')
      + out.slice(0, 15).map(({ G, n, P, k }) => `<button class="leg-row" data-player="${esc(G.key + '|' + n)}"><span class="n"><b>${esc(n)}</b><span>${esc(P.side ? G[P.side].abbr : '')} · ${esc(LG[G.league].label)} · ${esc(tn(G.away))} @ ${esc(tn(G.home))} · ${esc(whenOf(G.start))}</span></span><span class="hint">${k} kind${k > 1 ? 's' : ''} of bet ›</span></button>`).join('');
  }
  function renderGames() {
    const el = $('p-games');
    if (openGame && gameByKey[openGame]) { renderGame(el, gameByKey[openGame]); return; }
    openGame = null;
    const now = Date.now();
    const list = games.filter((G) => !G.done && Date.parse(G.start) > now - 4 * 3600e3);
    const shown = list.filter((G) => passG(G));
    const cl = combo.map((l) => mkt[l.ticker + '|' + l.side] || l); const cf = cl.length && cl.every((l) => l.fair != null) ? cl.reduce((a, l) => a * l.fair, 1) : null, cp = cl.reduce((a, l) => a * (l.price || 1), 1);
    let html = `<div style="display:grid;gap:6px"><h2>Build</h2><p class="lede">Your own parlay, plus every game with all of its bets ranked.</p></div>
      <button class="leg-row" data-go="combo" style="margin-top:8px"><span class="n"><b>Your parlay · ${combo.length} leg${combo.length === 1 ? '' : 's'}</b><span>${combo.length ? `${cf != null ? `chance ${pct(cf)} · ` : ''}pays about ${cp ? (1 / cp).toFixed(1) : '—'}x · tap to open` : 'No legs yet. Tap “+ Parlay” on any pick, or open a game below.'}</span></span><span class="num">›</span></button>`;
    if (!index) { html += `<div class="card empty"><strong>${dbState === 'off' ? 'Games can’t load in this view' : 'Loading games…'}</strong></div>`; el.innerHTML = html; return; }
    html += filterBar();
    if (shown.length) html += searchBox();
    if (!shown.length) html += `<div class="card empty"><strong>No upcoming games${sport !== 'all' ? ' for ' + esc(LG[sport].label) : ''}</strong><span>College basketball starts in November, and NBA player bets open when the season starts.</span></div>`;
    const gameRow = (G) => {
      const w = G.k.game; const h = w.find((r) => r.side === 'home'), a = w.find((r) => r.side === 'away');
      const te = topEdge(G); const nProps = G.props.reduce((n, P) => n + P.lines.length, 0);
      const liveNow = G.state === 'in';
      return `<button class="game-row" data-game="${esc(G.key)}">
        <span class="m">${esc(tn(G.away))} @ ${esc(tn(G.home))}</span>
        <span class="px num">${a && !a.closed ? `${esc(G.away.abbr)} <b>${cents(a.ya)}</b>` : ''} ${h && !h.closed ? ` · ${esc(G.home.abbr)} <b>${cents(h.ya)}</b>` : ''}</span>
        <span class="s">${esc(LG[G.league].label)} · ${liveNow ? `<span class="neg">Live · ${esc(G.detail)}</span>` : esc(timeOf(G.start))}${nProps ? ` · ${nProps} player bets` : ''}${te && te.edge >= 0.03 ? `<span class="badge">best edge +${Math.round(te.edge * 100)}¢</span>` : ''}</span>
      </button>`;
    };
    const liveList = shown.filter((G) => G.state === 'in');
    if (liveList.length) html += `<div class="day"><h3>Live now</h3>${liveList.map(gameRow).join('')}</div>`;
    let last = '';
    for (const G of shown) {
      if (G.state === 'in') continue;
      const dk = dayKey(G.start);
      if (dk !== last) { if (last) html += '</div>'; html += `<div class="day"><h3>${esc(dayLabel(G.start))}</h3>`; last = dk; }
      html += gameRow(G);
    }
    if (last) html += '</div>';
    el.innerHTML = html;
  }
  function renderGame(el, G) {
    const R = latestResearch(); const note = R?.games?.[G.key];
    const b = G.book;
    let html = `<button class="back" data-back>‹ All games</button>
      <div class="ghead"><span class="m">${esc(G.away.display || tn(G.away))} @ ${esc(G.home.display || tn(G.home))}</span>
      <span class="s">${esc(LG[G.league].label)} · ${G.state === 'in' ? `<span class="neg">Live · ${esc(G.detail)}</span>` : esc(whenOf(G.start))}${b && G.state === 'pre' ? ` · Sportsbook: ${esc(G.home.abbr)} ${b.spread?.home?.line > 0 ? '+' : ''}${b.spread?.home?.line ?? '—'}, total ${b.total?.line ?? '—'}` : ''}</span></div>`;
    if (G.state !== 'pre') html += LIVE ? (G.live && !G.live.done ? `<p class="banner"><b>Live: ${esc(scoreLine(G, G.live))}.</b> Prices below are live from Kalshi. The “to win” bets use ESPN’s in-game win chance; the other bets show a live price with no estimate.</p>` : `<p class="banner">This game has started. Prices below are live from Kalshi, but there are no estimates once a game is under way.</p>`) : `<p class="banner">This game has started. The prices below are from the last update and are out of date, so there are no estimates. Check the Kalshi app for live prices.</p>`;
    const X = G.ext || {}; const extras = [];
    if (X.espnWin) extras.push(`<b>ESPN's prediction model:</b> ${esc(tn(G.away))} ${pct(X.espnWin.away)}, ${esc(tn(G.home))} ${pct(X.espnWin.home)} to win`);
    if (X.espnWin && G.model?.pHome != null) { const pb = G.model.pBook ?? G.model.pHome; extras.push(`<b>Sportsbooks (cut removed):</b> ${esc(tn(G.away))} ${pct(1 - pb)}, ${esc(tn(G.home))} ${pct(pb)}`); if (G.model.blend > 1) extras.push(`<b>Blended view the tool uses:</b> ${esc(tn(G.away))} ${pct(1 - G.model.pHome)}, ${esc(tn(G.home))} ${pct(G.model.pHome)} — mostly the sportsbooks, with a little weight on ESPN's model${X.rate ? ' and our ratings' : ''}`); }
    if (X.rate) extras.push(`<b>Our team ratings:</b> expect ${esc(tn(X.rate.mu >= 0 ? G.home : G.away))} by ${Math.abs(X.rate.mu).toFixed(1)} ${LG[G.league].unit} (${pct(Phi(X.rate.mu / X.rate.sd))} for ${esc(tn(G.home))} to win), from this season's scores`);
    if (X.pitchers) extras.push(`<b>Starting pitchers:</b> ${esc(X.pitchers.away || 'not announced')} (${esc(G.away.abbr)}) vs ${esc(X.pitchers.home || 'not announced')} (${esc(G.home.abbr)})`);
    if (X.weather && G.league !== 'nba' && G.league !== 'cbb') extras.push(`<b>Forecast:</b> ${X.weather.temp}°F, gusts ${X.weather.gust ?? '—'} mph, ${X.weather.rain ?? '—'}% chance of rain${X.venue ? ` at ${esc(X.venue)} (doesn't apply if it has a closed roof)` : ''}`);
    if (extras.length) html += `<div class="card"><h3>Second opinions</h3>${extras.map((x) => `<p style="font-size:14px">${x}</p>`).join('')}</div>`;
    if (note) html += `<div class="card"><div class="row" style="justify-content:space-between"><h3>Researcher's read</h3><span class="pill ai">${esc(R.date)}</span></div>${note.summary ? `<p>${esc(note.summary)}</p>` : ''}${(note.news || []).length ? `<ul style="margin:0;padding-left:18px;display:grid;gap:4px;font-size:14px">${note.news.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}${note.lean ? `<p class="why">${esc(note.lean)}</p>` : ''}</div>`;
    const inj = [...(G.inj?.away || []).map((x) => [G.away.abbr, ...x]), ...(G.inj?.home || []).map((x) => [G.home.abbr, ...x])].filter((x) => /out|doubtful|questionable/i.test(x[3]));
    if (inj.length) html += `<details class="card"><summary>Injuries (${inj.length})</summary><div class="body">${inj.slice(0, 30).map((x) => `<p><b style="color:var(--ink)">${esc(x[0])} · ${esc(x[1])}</b> (${esc(x[2])}) — ${esc(x[3])}${x[4] ? `. ${esc(x[4])}` : ''}</p>`).join('')}</div></details>`;
    html += `<div class="card"><div class="row" style="justify-content:space-between"><h3>Bets on this game</h3></div>
      <p class="hint">Every Kalshi bet on this game. The number is its confidence out of 100 (the chance it wins). Tap “+ Parlay” to add it to your own parlay — legs must come from different games.</p>
      <div class="seg" role="group" aria-label="Sort">${[['likely', 'Most confident'], ['value', 'Best value'], ['payout', 'Biggest payout']].map(([k, l]) => `<button data-gsort="${k}" aria-pressed="${gameSort === k}">${l}</button>`).join('')}</div>
      <div class="chips" role="group" aria-label="Bet type">${[['all', 'All'], ['team', 'Team bets'], ['players', 'Player bets']].map(([k, l]) => `<button class="chip" data-gfilter="${k}" aria-pressed="${gameFilter === k}">${l}</button>`).join('')}</div>`;
    let es = G._e.filter((e) => e.price >= 0.03 && e.price <= 0.97);
    if (gameFilter === 'team') es = es.filter((e) => e.model === 'market'); if (gameFilter === 'players') es = es.filter((e) => e.model === 'stats');
    const scoreV = (e) => (e.edge == null || e.tail ? -1 : e.edge);
    if (gameSort === 'value') es.sort((a, b) => scoreV(b) - scoreV(a) || b.vol - a.vol);
    if (gameSort === 'likely') es = es.filter((e) => e.fair != null && e.price <= 0.92).sort((a, b) => b.fair - a.fair);
    if (gameSort === 'payout') es = es.filter((e) => e.edge != null && e.edge >= 0 && !e.tail).sort((a, b) => a.price - b.price);
    const seenT = new Set(); es = es.filter((e) => (seenT.has(e.ticker) ? false : (seenT.add(e.ticker), true)));
    const shown = showAll ? es : es.slice(0, 25);
    html += `<div class="mlist">${shown.map((e, i) => mrow(e, i)).join('') || '<p class="lede">No bets match.</p>'}</div>${es.length > shown.length ? `<button class="btn small" data-more>Show all ${es.length}</button>` : ''}</div>`;
    if (G.props.length) {
      const byP = {}; G.props.forEach((P) => (byP[P.p] ||= []).push(P));
      html += `<div class="card"><h3>Players</h3>${Object.entries(byP).sort((a, b) => b[1][0].n - a[1][0].n).map(([name, ps]) => playerBlock(G, name, ps)).join('')}</div>`;
    }
    el.innerHTML = html;
  }
  function mrow(e, i) {
    const inCombo = combo.some((l) => l.ticker === e.ticker && l.side === e.side);
    const c = confOf(e.fair);
    const ch = e.fair == null ? '<b>—</b>no estimate' : `<b class="${c.cls}">${c.score}</b>${c.label}${e.edge != null ? ` · <span class="${e.edge > 0 && !e.tail ? 'pos' : ''}">${edgeTxt(e.edge)}</span>` : ''}`;
    const did = e.model === 'stats' && e.l10?.[1] >= 3 ? ` · hit it in ${e.side === 'yes' ? e.l10[0] : e.l10[1] - e.l10[0]} of his last ${e.l10[1]}` : '';
    return `<div class="mrow"><span class="rk">${i != null ? i + 1 : ''}</span><div class="n"><b>${esc(e.label)}</b><span>${e.model === 'stats' ? 'Player bet' : e.kind === 'winner' ? 'Winner' : e.kind === 'spread' ? 'Win margin' : 'Total'}${e.model === 'live' ? (e.espnLive ? ' · in-game, chance from ESPN’s live model' : ' · in-game estimate from the score and clock') : e.inGame ? ' · in-game price' : ''}${e.tail ? ' · far from the sportsbook line, rough estimate' : ''}${did} · pays ${(1 / e.price).toFixed(1)}x</span><span class="ch num">${ch}</span></div>
      <div class="acts"><button class="mbtn" data-sheet="${esc(e.key)}"><span class="s">Buy ${e.side}</span><span class="p num">${cents(e.price)}</span></button><button class="addp" data-addleg="${esc(e.key)}" aria-pressed="${inCombo}" aria-label="${inCombo ? 'Remove from' : 'Add to'} parlay: ${esc(e.label)}">${inCombo ? '✓ Added' : '+ Parlay'}</button></div></div>`;
  }
  function playerBlock(G, name, ps) {
    const P0 = ps[0]; const team = P0.side ? G[P0.side].abbr : '';
    return `<div class="player"><div class="nm"><button class="pname" data-player="${esc(G.key + '|' + name)}">${esc(name)} ›</button><span class="form">${esc(team)}${P0.pos ? ' · ' + esc(P0.pos) : ''}${P0.inj ? ` · <span class="pill lost">${esc(P0.inj)}</span>` : ''}</span></div>
      ${ps.map((P) => {
        const vals = (P.last || []).map((x) => x[2]); const max = Math.max(1, ...vals);
        const mid = P.lines[Math.floor(P.lines.length / 2)]?.k;
        return `<div style="display:grid;gap:6px"><div class="form"><b style="color:var(--ink)">${esc(STAT[P.stat] || P.stat)}</b> · average ${P.avg ?? '—'} over ${P.n} recent games${P.vs?.length ? ` · vs ${esc(G[P.side === 'home' ? 'away' : 'home']?.abbr || 'them')}: ${P.vs.map((x) => `${x[2]} (${esc(x[0].slice(0, 4))})`).join(', ')}` : ''}</div>
          ${vals.length ? `<div class="spark" aria-label="Last ${vals.length} games, newest first: ${vals.join(', ')}">${vals.map((v) => `<i class="${mid != null && v > mid ? 'hit' : ''}" style="height:${Math.max(3, Math.round((v / max) * 32))}px" title="${v}"></i>`).join('')}</div><div class="form">Last ${vals.length} games, newest first: ${vals.join(', ')}</div>` : ''}
          <div class="lines">${P.lines.filter((l) => l.ya != null && l.ya > 0.02 && l.ya < 0.98).map((l) => { const e = mkt[l.t + '|yes']; return `<button class="mbtn${e?.edge >= 0.04 ? ' edge' : ''}" data-sheet="${esc(l.t + '|yes')}"><span class="s">${Math.ceil(l.k)}+ · ${l.fy != null ? pct(l.fy) : '—'}</span><span class="p num">${cents(l.ya)}</span></button>`; }).join('')}</div></div>`;
      }).join('')}</div>`;
  }

  // ---------- "why this pick" ----------
  const fmtAm = (a) => (a == null ? '—' : a > 0 ? '+' + a : String(a));
  const signed = (x) => (x > 0 ? '+' : '') + x;
  function kalshiUrl(e, G) {
    const parts = e.ticker.split('-');
    const series = parts[0].toLowerCase(), event = (parts[0] + '-' + parts[1]).toLowerCase();
    const slug = ((G ? `${G.away.abbr || tn(G.away)} vs ${G.home.abbr || tn(G.home)}` : 'game').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')) || 'game';
    return `https://kalshi.com/markets/${series}/${slug}/${event}`;
  }
  function aiNotesFor(e) {
    const out = [];
    const R = latestResearch();
    if (R && Date.now() - Date.parse(R.at || R.date + 'T15:00:00Z') < 36 * 3600e3) for (const p of R.picks || []) if (p.ticker === e.ticker && p.side === e.side) out.push({ who: 'AI researcher (today)', p });
    const W = latestWeekly();
    if (W) for (const p of [...(W.favorites || []), W.lock].filter(Boolean)) if (p.ticker === e.ticker && p.side === e.side) out.push({ who: p.cat === 'lock' ? 'Weekly card: closest to a sure thing' : 'Weekly card: favorite', p });
    return out;
  }
  // Plain-English helpers for "Why this pick"
  const dec = (a) => (a > 0 ? 1 + a / 100 : 1 + 100 / Math.abs(a));
  const tenths = (p) => (p == null ? '—' : p < 0.1 ? `about 1 in ${Math.max(2, Math.round(1 / p))}` : p > 0.95 ? 'almost always' : `about ${Math.round(p * 10)} times out of 10`);
  const priceWords = (e) => {
    const c = Math.round(e.edge * 100);
    const verdict = c >= 3 ? `<b>a good price</b> — about ${c}¢ cheaper than it's really worth` : c >= 1 ? `<b>a slightly good price</b> (about ${c}¢ under what it's worth)` : c > -1 ? '<b>about a fair price</b>' : c >= -4 ? `<b>a little expensive</b> (about ${-c}¢ more than it's worth)` : `<b>too expensive</b> (about ${-c}¢ more than it's worth)`;
    return `Kalshi charges ${cents(e.price)} (plus a small fee of about ${Math.max(1, Math.round(fee(e.price) * 100))}¢) and pays $1 if it wins. Based on our chance, that's ${verdict}.`;
  };
  function mathConfidence(e) {
    if (e.fair == null) return null;
    const c = confOf(e.fair);
    return { lvl: c.cls, label: c.label, score: c.score, why: `A confidence of ${c.score} means: out of 100 bets like this, about ${c.score} should win. The tool keeps checking this against real results and corrects itself.` };
  }
  function explain(e, G) {
    const pts = [];
    const b = G?.book, M = G?.model, X = G?.ext || {};
    const L = LG[e.league] || { unit: 'points' };
    const yes = e.side === 'yes';
    if (e.kind === 'winner' && G) {
      const row = G.k.game.find((r) => r.t === e.ticker); const side = row?.side;
      if (side) {
        // talk about the team this bet is rooting for
        const ws = yes ? side : side === 'home' ? 'away' : 'home', W = tn(G[ws]);
        const pW = M?.pHome == null ? null : ws === 'home' ? M.pHome : 1 - M.pHome;
        if (!yes) pts.push(`This bet pays if <b>${esc(W)}</b> wins (it's "${esc(tn(G[side]))} not to win").`);
        if (pW != null) pts.push(`The big sportsbooks (like DraftKings) think ${esc(W)} wins ${tenths(pW)}.`);
        if (b?.ml?.[ws + 'Open'] != null && b.ml[ws + 'Open'] !== b.ml[ws]) {
          const better = dec(b.ml[ws]) < dec(b.ml[ws + 'Open']);
          pts.push(`Since betting opened, the sportsbooks have grown ${better ? 'more' : 'less'} confident in ${esc(W)}.`);
        }
        if (X.espnWin) { const ew = X.espnWin[ws], agree = (ew - 0.5) * ((pW ?? 0.5) - 0.5) >= 0; pts.push(`ESPN's own prediction ${agree ? 'agrees' : 'disagrees'}: it gives ${esc(W)} ${tenths(ew)}.`); }
        if (X.rate) { const rm = ws === 'home' ? X.rate.mu : -X.rate.mu, m = Math.max(1, Math.round(Math.abs(rm))); pts.push(`Our own team ratings, built from this season's games, expect ${esc(W)} to ${rm >= 0 ? 'win' : 'lose'} by about ${m} ${L.unit}${rm >= 0 ? ' — they agree' : ' — they disagree'}.`); }
      }
    } else if (e.kind === 'spread' && G) {
      const row = G.k.spread.find((r) => r.t === e.ticker);
      if (row && M?.mu != null) {
        const T = tn(G[row.side]), mu = row.side === 'home' ? M.mu : -M.mu, k = Math.ceil(row.line), m = Math.max(1, Math.round(Math.abs(mu)));
        pts.push(`The sportsbooks expect ${esc(T)} to ${mu >= 0 ? `win by about ${m}` : `lose by about ${m}`} ${L.unit}.`);
        pts.push(`From there, ${esc(T)} winning by ${k} or more happens ${tenths(row.fy)}${yes ? '' : ` — you're betting it <b>doesn't</b>, which happens ${tenths(1 - row.fy)}`}.`);
        if (X.rate) { const rm = row.side === 'home' ? X.rate.mu : -X.rate.mu; pts.push(`Our own team ratings expect ${esc(T)} to ${rm >= 0 ? 'win' : 'lose'} by about ${Math.max(1, Math.round(Math.abs(rm)))}, so they ${(rm >= row.line) === yes ? 'agree with this bet' : 'lean the other way'}.`); }
      }
    } else if (e.kind === 'total' && G) {
      const row = G.k.total.find((r) => r.t === e.ticker);
      if (row && M?.muT != null) {
        pts.push(`The sportsbooks expect about ${Math.round(M.muT)} ${L.unit} in total.`);
        pts.push(`${yes ? `Going over ${row.line}` : `Staying under ${row.line}`} happens ${tenths(yes ? row.fy : 1 - row.fy)}.`);
      }
      if (X.weather && (G.league === 'nfl' || G.league === 'cfb' || G.league === 'mlb') && ((X.weather.gust || 0) >= 15 || (X.weather.rain || 0) >= 50)) pts.push(`The forecast is ${(X.weather.gust || 0) >= 15 ? `windy (gusts up to ${X.weather.gust} mph)` : 'rainy'}, which usually means fewer ${L.unit} — unless the stadium has a roof.`);
    } else if (e.kind === 'prop' && G) {
      let P = null, ln = null;
      for (const q of G.props) { const f = q.lines.find((l) => l.t === e.ticker); if (f) { P = q; ln = f; break; } }
      if (P && ln) {
        const vals = (P.last || []).map((x) => x[2]).slice(0, 10), k = Math.ceil(ln.k), st = STAT[P.stat] || P.stat;
        const hit = vals.filter((v) => v > ln.k).length;
        if (vals.length) pts.push(yes ? `${esc(P.p)} got ${k}+ ${esc(st)} in <b>${hit} of his last ${vals.length}</b> games.` : `${esc(P.p)} ${k === 1 ? `had no ${esc(st)}` : `stayed under ${k} ${esc(st)}`} in <b>${vals.length - hit} of his last ${vals.length}</b> games.`);
        if (vals.length) pts.push(`His recent games, newest first: ${vals.join(', ')}.`);
        if (P.vs?.length) pts.push(`Against this same team before: ${P.vs.map((x) => x[2]).join(', ')}.`);
        if (P.mf) { const f = P.mf.f; pts.push(`${f >= 1.03 ? 'Easier matchup than usual' : f <= 0.97 ? 'Tougher matchup than usual' : 'About an average matchup'}: ${esc(P.mf.why)}`); }
        if (P.inj) pts.push(`Injury report: ${esc(P.inj)}.`);
      }
    }
    if (e.adj && Math.abs(e.adj) >= 0.01) pts.push(`Bets like this have been winning ${e.adj > 0 ? 'more' : 'less'} often than expected lately, so we nudged our number ${e.adj > 0 ? 'up' : 'down'} a little.`);
    if (e.paused) pts.push('Heads up: this kind of bet has been losing money lately, so the tool is leaving it out of its picks for now.');
    if (e.tail) pts.push('This line is far from where the sportsbooks set it, so our number is only a rough guess.');
    if (G && G.state !== 'pre') pts.push(LIVE ? (e.model === 'live' ? (e.espnLive ? 'This game is under way. The chance comes from ESPN’s live in-game model and the price is live from Kalshi.' : 'This game is under way. The chance is our estimate from the score, the time left and the pre-game spread; the price is live from Kalshi.') : 'This game is under way. The price is live from Kalshi, but there is no estimate for this bet once a game has started.') : 'This game has already started — these were the numbers before kickoff.');
    const summary = e.fair == null ? '' : `We think this wins <b>${tenths(e.fair)}</b>. ${priceWords(e)}`;
    return { pts, summary, conf: mathConfidence(e) };
  }
  function whyHTML(e, G) {
    const { pts, summary, conf } = explain(e, G);
    const ai = aiNotesFor(e);
    let h = '';
    if (summary) h += `<div class="whybox"><p>${summary}</p></div>`;
    for (const a of ai) h += `<div class="whybox ai"><div class="row" style="justify-content:space-between"><b>${esc(a.who)}</b>${confPill(a.p.aiProb)}</div><p>${esc(a.p.reason || '')}</p><p class="hint">The AI thinks this wins ${tenths(a.p.aiProb)}.</p></div>`;
    if (pts.length) h += `<div class="whybox"><b>What we looked at</b><ul>${pts.map((x) => `<li>${x}</li>`).join('')}</ul>${conf ? `<p class="hint"><span class="pill ${conf.lvl}">${conf.label} confidence · ${conf.score}</span> ${conf.why}</p>` : ''}</div>`;
    return h ? `<details class="why-details" open><summary>Why this pick</summary>${h}</details>` : '';
  }

  // ---------- bet sheet ----------
  // ---------- player page: every line, and how often he has cleared it ----------
  let pview = null; // { game, name }
  function openPlayer(game, name) { sheet = null; pview = { game, name }; renderPlayer(); }
  const hitRate = (vals, k, n) => { const v = vals.slice(0, n); return v.length ? [v.filter((x) => x > k).length, v.length] : null; };
  const hrPill = (r, label) => { if (!r) return ''; const f = r[0] / r[1]; return `<span class="hr ${r[1] >= 5 && f >= 0.7 ? 'hot' : r[1] >= 5 && f <= 0.3 ? 'cold' : ''}" title="${esc(label)}">${r[0]}/${r[1]}</span>`; };
  function renderPlayer() {
    const root = $('sheetRoot'); if (!pview) return;
    const G = gameByKey[pview.game];
    const ps = G ? G.props.filter((P) => P.p === pview.name) : [];
    if (!ps.length) { closeSheet(); toast('No player bets listed for that player right now'); return; }
    const P0 = ps[0]; const team = P0.side ? G[P0.side] : null; const opp = P0.side ? G[P0.side === 'home' ? 'away' : 'home'] : null;
    let h = `<div class="shade" data-close></div><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="pl-t"><button class="x" data-close aria-label="Close">×</button><div class="sheet-in">
      <div><div class="hint">${esc(LG[G.league]?.label || '')} · ${esc(tn(G.away) + ' @ ' + tn(G.home))} · ${esc(whenOf(G.start))}</div><h2 id="pl-t" style="font-size:24px">${esc(pview.name)}</h2>
      <div class="hint">${esc(team?.display || tn(team) || '')}${P0.pos ? ' · ' + esc(P0.pos) : ''}${P0.inj ? ` · <span class="pill lost">${esc(P0.inj)}</span>` : ''}</div></div>
      <p class="hint">For every line Kalshi offers: how many of his last 5, 10 and 16 games he cleared it (green = most of them, red = few), then the tool's chance and Kalshi's prices. Past games help, but role, matchup and injuries matter too.</p>`;
    for (const P of ps) {
      const vals = (P.last || []).map((x) => x[2]);
      const lines = P.lines.filter((l) => l.ya != null && l.ya > 0.02 && l.ya < 0.98);
      const main = lines.length ? lines.reduce((a, b) => (Math.abs(a.ya - 0.5) <= Math.abs(b.ya - 0.5) ? a : b)).k : null;
      const st = STAT[P.stat] || P.stat;
      h += `<div class="card"><h3>${esc(st)}</h3>${P.mf ? `<p class="hint"><b>Matchup:</b> ${esc(P.mf.why)}${Math.abs(P.mf.f - 1) >= 0.02 ? ` The tool's chances assume he does about ${Math.round(Math.abs(P.mf.f - 1) * 100)}% ${P.mf.f > 1 ? 'better' : 'worse'} than usual.` : ''}</p>` : ''}<p style="font-size:14px">Average <b>${P.avg ?? '—'}</b> over his last ${P.n} games${P.vs?.length && opp ? ` · against ${esc(opp.abbr || tn(opp))} before: ${P.vs.map((x) => `<b>${x[2]}</b> (${esc(String(x[0]).slice(0, 4))})`).join(', ')}` : ''}.</p>`;
      if (vals.length) h += `<div><div class="hint" style="margin-bottom:6px">Last ${vals.length} games, newest first${main != null ? ` · green = ${Math.ceil(main)}+` : ''}</div><div class="glog">${P.last.map((x) => `<span class="${main != null && x[2] > main ? 'hit' : ''}"><b>${x[2]}</b>${esc(x[1] || '')} ${esc(x[0])}</span>`).join('')}</div></div>`;
      h += `<div>${lines.map((l) => {
        const y = mkt[l.t + '|yes'], n = mkt[l.t + '|no'];
        const vsr = P.vs?.length ? hitRate(P.vs.map((x) => x[2]), l.k, 5) : null;
        return `<div class="pline"><div class="n"><b>${Math.ceil(l.k)}+ ${esc(st)}</b><span>Cleared: ${hrPill(hitRate(vals, l.k, 5), 'last 5')} ${hrPill(hitRate(vals, l.k, 10), 'last 10')} ${hrPill(hitRate(vals, l.k, 16), 'last ' + Math.min(16, vals.length))}${vsr ? ` · vs ${esc(opp?.abbr || 'them')} ${vsr[0]}/${vsr[1]}` : ''}</span><span>Tool's chance: <b>${y?.fair != null ? pct(y.fair) : '—'}</b></span></div>
          ${y ? `<button class="mbtn${y.edge >= 0.04 ? ' edge' : ''}" data-sheet="${esc(y.key)}" aria-label="Yes ${Math.ceil(l.k)}+ at ${cents(y.price)}"><span class="s">Yes</span><span class="p num">${cents(y.price)}</span></button>` : '<span></span>'}
          ${n ? `<button class="mbtn${n.edge >= 0.04 ? ' edge' : ''}" data-sheet="${esc(n.key)}" aria-label="No (under ${Math.ceil(l.k)}) at ${cents(n.price)}"><span class="s">No</span><span class="p num">${cents(n.price)}</span></button>` : '<span></span>'}</div>`;
      }).join('')}</div></div>`;
    }
    const F = index?.learn?.form;
    if (F && (F.hot?.n >= 20 || F.cold?.n >= 20)) h += `<p class="hint">From the tool's own graded results: bets on players who cleared the line in 7+ of their last 10 won ${F.hot.w} of ${F.hot.n} (it expected about ${Math.round(F.hot.e)}). Players in a cold spell won ${F.cold.w} of ${F.cold.n} (expected about ${Math.round(F.cold.e)}). Its chances already account for this.</p>`;
    h += `</div></div>`;
    root.innerHTML = h; root.querySelector('.x').focus();
  }
  function openSheet(key) { pview = null; sheet = { key, amt: store.get('amt', '') }; renderSheet(); }
  let staleBehind = false;
  function closeSheet() { sheet = null; pview = null; $('sheetRoot').innerHTML = ''; if (staleBehind) { staleBehind = false; render(); toast('Prices updated'); } }
  function renderSheet() {
    const root = $('sheetRoot'); if (!sheet) { root.innerHTML = ''; return; }
    const e = mkt[sheet.key]; if (!e) { closeSheet(); toast('That bet is no longer listed'); return; }
    const other = mkt[e.ticker + '|' + (e.side === 'yes' ? 'no' : 'yes')];
    const G = gameByKey[e.game];
    const bank = Number(settings.bankroll) || 0;
    const kelly = e.fair != null ? Math.max(0, (e.fair - e.cost) / (1 - e.cost)) : 0;
    const frac = Math.min(0.03, kelly / 4);
    const sug = bank > 0 && frac > 0 ? Math.max(1, Math.round(bank * frac)) : 0;
    const amt = Number(sheet.amt) > 0 ? Number(sheet.amt) : sug || 10;
    const n = contractsFor(amt, e.price);
    const ev = e.fair != null ? e.fair - e.cost : null;
    const vclass = ev == null ? 'thin' : ev >= 0.03 ? 'good' : ev > 0 ? 'thin' : 'bad';
    const vtitle = ev == null ? 'No estimate' : ev >= 0.03 ? 'Good price' : ev > 0 ? 'Slightly good price' : ev > -0.01 ? 'About a fair price' : 'Costs more than it’s worth';
    root.innerHTML = `<div class="shade" data-close></div><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sh-t"><button class="x" data-close aria-label="Close">×</button><div class="sheet-in">
      <div><div class="hint">${esc(LG[e.league]?.label || '')} · ${G ? esc(tn(G.away) + ' @ ' + tn(G.home)) : esc(e.gameLabel)} · ${esc(whenOf(e.start))}</div><h2 id="sh-t" style="font-size:24px">${esc(e.label)}</h2></div>
      ${other ? `<div class="sidepick" role="group" aria-label="Side"><button data-side="${esc(e.ticker + '|yes')}" aria-pressed="${e.side === 'yes'}"><b class="num">Yes ${cents(mkt[e.ticker + '|yes']?.price)}</b><span>${esc(mkt[e.ticker + '|yes']?.label || '')}</span></button><button data-side="${esc(e.ticker + '|no')}" aria-pressed="${e.side === 'no'}"><b class="num">No ${cents(mkt[e.ticker + '|no']?.price)}</b><span>${esc(mkt[e.ticker + '|no']?.label || '')}</span></button></div>` : ''}
      <div class="facts">
        <div class="fact"><span class="k">You pay</span><span class="v num">${cents(e.price)}</span><span class="e">+ about ${(fee(e.price) * 100).toFixed(1)}¢ Kalshi fee. Get $1 if it wins.</span></div>
        <div class="fact"><span class="k">Chance it wins</span><span class="v num">${pct(e.fair)}</span><span class="e">${e.model === 'stats' ? 'From recent games' : 'From DraftKings’ price'}</span></div>
        <div class="fact"><span class="k">Worth buying up to</span><span class="v num">${e.fair != null ? cents(worthUpTo(e.fair)) : '—'}</span><span class="e">Skip it if the app's price is higher.</span></div>
      </div>
      <div class="verdict ${vclass}"><span class="t">${vtitle}</span><p>${ev == null ? 'We couldn’t estimate this one. Use the researcher’s notes and your own judgment.' : ev > 0.005 ? `If you made lots of bets like this, you'd expect to come out about <b>${money(ev * 100, true)} ahead for every $100</b> you bet. Any single bet can still lose.` : ev > -0.005 ? 'About break-even over many bets like this.' : `If you made lots of bets like this, you'd expect to lose about <b>${money(-ev * 100)} for every $100</b> you bet.`}${e.tail ? ' Our number is only a rough guess for this line.' : ''}</p>
        <p>${ev != null && ev > 0 ? (bank > 0 ? `Suggested amount: <b>${money(sug)}</b> (${pct(frac, 1)} of your betting money).` : 'Add your betting money on the My bets tab to get a suggested amount.') : 'Suggested amount: skip it.'}</p></div>
      ${whyHTML(e, G)}
      <div class="fields"><label class="f">Amount to spend<input class="in num" id="sh-amt" inputmode="decimal" value="${esc(sheet.amt)}" placeholder="${sug || 10}"><span class="hint" id="sh-out">${n} contracts · pays ${money(n)} if it wins</span></label></div>
      <a class="btn primary kalshi" href="${esc(kalshiUrl(e, G))}" target="_blank" rel="noopener">Open this game in Kalshi ↗</a>
      <button class="btn ib" data-ibet='${esc(JSON.stringify([{ ticker: e.ticker, side: e.side, label: e.label, gameLabel: e.gameLabel, league: e.league, start: e.start, price: e.price, fair: e.fair }]))}' data-ibet-title="Single bet" aria-pressed="${isMine([e])}">${isMine([e]) ? '✓ I bet this · remove' : 'I bet this'}</button>
      ${e.kind === 'prop' && e.player && G ? `<button class="btn" data-player="${esc(G.key + '|' + e.player)}">See ${esc(e.player)}'s game-by-game history ›</button>` : ''}
      <button class="btn" id="sh-copy" data-copy="${esc(G ? (G.away.display || tn(G.away)) + ' ' + (G.home.display || tn(G.home)) : e.gameLabel)}">Copy game name to search in the Kalshi app</button>
      <p class="hint">In Kalshi, pick “${esc(e.side === 'yes' ? 'Yes' : 'No')}” on <b>${esc(mkt[e.ticker + '|yes']?.label || e.label)}</b>. Check the price is ${cents(e.fair != null ? worthUpTo(e.fair) : e.price)} or less.</p>
      <div class="row">${owner ? `<button class="btn" id="sh-log" ${db ? '' : 'disabled'}>Log this bet</button>` : ''}<button class="btn" id="sh-combo">Add to combo</button>${G && openGame !== G.key ? `<button class="btn" data-opengame="${esc(G.key)}">Open game</button>` : ''}</div>
      <p class="hint">Logging doesn't place a bet. Buy it in Kalshi, then log it here so your record stays accurate.</p>
    </div></div>`;
    $('sh-amt').addEventListener('input', (ev2) => { sheet.amt = ev2.target.value.replace(/[$,]/g, ''); store.set('amt', sheet.amt); const a = Number(sheet.amt) > 0 ? Number(sheet.amt) : sug || 10; const k = Math.floor(a / e.price); $('sh-out').textContent = `${k} contracts · pays ${money(k)} if it wins`; });
    if ($('sh-log')) $('sh-log').addEventListener('click', () => { const a = Number(sheet.amt) > 0 ? Number(sheet.amt) : sug || 10; logBet({ kind: 'single', price: e.price, amount: a, contracts: Math.floor(a / e.price), legs: [legOf(e)], fair: e.fair }); closeSheet(); });
    $('sh-combo').addEventListener('click', () => { addCombo(e); closeSheet(); });
    $('sh-copy').addEventListener('click', (ev3) => {
      const txt = ev3.currentTarget.dataset.copy;
      const done = () => toast('Copied. Paste it into search in the Kalshi app.');
      try { navigator.clipboard.writeText(txt).then(done, () => toast('Search the Kalshi app for: ' + txt)); } catch { toast('Search the Kalshi app for: ' + txt); }
    });
    root.querySelector('.x').focus();
  }
  const legOf = (e) => ({ ticker: e.ticker, side: e.side, label: e.label, gameLabel: e.gameLabel, league: e.league, start: e.start, price: e.price, fair: e.fair });

  // ---------- combo ----------
  function addCombo(e) {
    const i = combo.findIndex((l) => l.ticker === e.ticker);
    comboPrice = ''; // a typed Kalshi price was for the old set of legs
    if (i >= 0) { combo[i] = legOf(e); store.set('combo', combo); toast(`Switched that leg to “${e.label}”`); return; }
    combo.push(legOf(e)); store.set('combo', combo); updateCount(); toast(`Added to combo (${combo.length} leg${combo.length > 1 ? 's' : ''})`);
  }
  function updateCount() { const c = $('comboCount'); c.textContent = combo.length; c.hidden = !combo.length; }
  // Kalshi doesn't publish combo prices (they're quoted live in the app), so estimate one:
  // multiply the legs, then correct by how real quotes you've typed or logged compared with that.
  function comboRatio() {
    const rs = [];
    for (const b of bets) if (b.kind === 'combo' && !b.estimated && b.price > 0 && (b.legs || []).length >= 2 && b.legs.every((l) => l.price > 0)) rs.push(b.price / b.legs.reduce((a, l) => a * l.price, 1));
    for (const r of store.get('comboQuotes', [])) rs.push(r);
    const ok = rs.filter((r) => r > 0.3 && r < 3).slice(-20).sort((a, b) => a - b);
    return ok.length ? { r: Math.max(0.6, Math.min(1.4, ok[Math.floor(ok.length / 2)])), n: ok.length } : { r: 1, n: 0 };
  }
  function renderCombo() {
    const el = $('p-combo');
    const legs = combo.map((l) => ({ ...l, ...(mkt[l.ticker + '|' + l.side] ? { price: mkt[l.ticker + '|' + l.side].price, fair: mkt[l.ticker + '|' + l.side].fair } : {}) }));
    let html = `<button class="back" data-go="games">‹ Build</button><div style="display:grid;gap:6px"><h2>Your parlay</h2><p class="lede">Every leg has to win. Kalshi quotes combo prices live in its app and doesn't share them, so the tool estimates the price for you. Type in Kalshi's real price if you want an exact answer — the estimate learns from it.</p></div><div class="card">`;
    if (!legs.length) html += `<div class="empty"><strong>No legs yet</strong><span>Tap “+ Parlay” on any pick or game bet, or open a parlay from the Parlays tab.</span><button class="btn" data-go="parlays">See parlays</button></div>`;
    html += legs.map((l, i) => `<div class="mrow"><div class="n"><b>${esc(l.label)}</b><span>${esc(l.gameLabel || '')} · chance ${pct(l.fair)}</span></div><div class="ch num"><b>${cents(l.price)}</b>${l.side}</div><button class="mbtn" data-rmleg="${i}" aria-label="Remove ${esc(l.label)}"><span class="p">×</span></button></div><a class="link" style="font-size:13px" href="${esc(kalshiUrl(l, gameByKey[mkt[l.ticker + '|' + l.side]?.game]))}" target="_blank" rel="noopener">Open this leg's game in Kalshi ↗</a>`).join('');
    html += `</div>`;
    if (legs.length >= 2) {
      const games_ = legs.map((l) => l.gameLabel); const same = new Set(games_).size < games_.length;
      const known = legs.every((l) => l.fair != null);
      const fair = known ? legs.reduce((a, l) => a * l.fair, 1) : null;
      const sumPrice = legs.reduce((a, l) => a * l.price, 1);
      const offered = Number(String(comboPrice).replace(/[¢$\s]/g, '')) / (String(comboPrice).includes('$') || Number(comboPrice) < 1 ? 1 : 100);
      const CR = comboRatio(), est = Math.min(0.99, sumPrice * CR.r);
      const typed = offered > 0 && offered < 1 ? offered : null;
      const price = typed || est;
      const amt = Number(comboAmt) > 0 ? Number(comboAmt) : 10;
      const ev = fair != null && price ? fair - price - fee(price) : null;
      html += `<div class="facts">
        <div class="fact"><span class="k">Chance all ${legs.length} win</span><span class="v num">${pct(fair, fair != null && fair < 0.1 ? 1 : 0)}</span><span class="e">${fair ? `About 1 in ${Math.max(1, Math.round(1 / fair))}` : 'One leg has no estimate'}</span></div>
        <div class="fact"><span class="k">Legs bought separately</span><span class="v num">${cents(sumPrice)}</span><span class="e">Multiplying each leg's price</span></div>
        <div class="fact"><span class="k">Worth buying up to</span><span class="v num">${fair ? cents(worthUpTo(fair)) : '—'}</span><span class="e">If Kalshi's combo price is higher, skip it.</span></div>
      </div>
      ${same ? `<p class="banner">Two legs are from the same game. Their results are linked, so the chance above may be off, and Kalshi usually prices that in.</p>` : ''}
      <div class="card"><div class="fields">
        <label class="f">Kalshi's price for this combo<input class="in num" id="cb-price" value="${esc(comboPrice)}" placeholder="${cents(est)} (estimate)"><span class="hint">${typed ? 'Using the price you typed.' : `Estimated ${cents(est)} — ${CR.n ? `based on how ${CR.n} real Kalshi quote${CR.n > 1 ? 's' : ''} you entered compared with the legs` : 'the legs multiplied together. It gets more accurate each time you type a real Kalshi price'}. Leave blank to use it.`}</span></label>
        <label class="f">Amount to spend<input class="in num" id="cb-amt" inputmode="decimal" value="${esc(comboAmt)}"><span class="hint">${contractsFor(amt, price)} contracts · pays about ${money(contractsFor(amt, price))}${typed ? '' : ' (estimated)'}</span></label>
      </div>
      ${ev != null ? `<div class="verdict ${ev >= 0.02 ? 'good' : ev > 0 ? 'thin' : 'bad'}"><span class="t">${ev >= 0.02 ? 'Good price' : ev > 0 ? 'Slightly good price' : 'Costs more than it’s worth'}</span><p>${ev > 0 ? `Over lots of combos like this, you'd expect to come out about ${money(ev / price * 100, true)} ahead for every $100 you bet. Any single combo can still lose.` : `Over lots of combos like this, you'd expect to lose about ${money(-ev / price * 100)} for every $100 you bet.`}</p></div>` : ''}
      <div class="row">${owner ? `<button class="btn primary" id="cb-log" ${db && price ? '' : 'disabled'}>Log this combo</button>` : ''}<button class="btn" id="cb-clear">Clear legs</button></div></div>`;
    } else if (legs.length === 1) html += `<p class="lede">Add at least one more leg.</p>`;
    el.innerHTML = html;
    el.querySelectorAll('[data-rmleg]').forEach((b) => b.addEventListener('click', () => { combo.splice(Number(b.dataset.rmleg), 1); comboPrice = ''; store.set('combo', combo); updateCount(); renderCombo(); }));
    const cp = $('cb-price'); if (cp) cp.addEventListener('change', () => {
      comboPrice = cp.value;
      const v = Number(String(comboPrice).replace(/[¢$\s]/g, '')) / (String(comboPrice).includes('$') || Number(comboPrice) < 1 ? 1 : 100);
      const base = combo.reduce((a, l) => a * (mkt[l.ticker + '|' + l.side]?.price ?? l.price ?? 0), 1);
      if (v > 0 && v < 1 && base > 0 && combo.length >= 2) store.set('comboQuotes', [...store.get('comboQuotes', []), v / base].slice(-20)); // learn how Kalshi prices combos
      renderCombo();
    });
    const ca = $('cb-amt'); if (ca) ca.addEventListener('change', () => { comboAmt = ca.value.replace(/[$,]/g, ''); store.set('comboAmt', comboAmt); renderCombo(); });
    const cl = $('cb-clear'); if (cl) cl.addEventListener('click', () => { combo = []; comboPrice = ''; store.set('combo', combo); updateCount(); renderCombo(); });
    const lg = $('cb-log'); if (lg) lg.addEventListener('click', () => {
      const typedP = Number(String(comboPrice).replace(/[¢$\s]/g, '')) / (String(comboPrice).includes('$') || Number(comboPrice) < 1 ? 1 : 100);
      const estimated = !(typedP > 0 && typedP < 1);
      const offered = estimated ? Math.min(0.99, legs.reduce((a, l) => a * l.price, 1) * comboRatio().r) : typedP;
      const amt = Number(comboAmt) > 0 ? Number(comboAmt) : 10;
      const fair = legs.every((l) => l.fair != null) ? legs.reduce((a, l) => a * l.fair, 1) : null;
      if (estimated) toast('Logged at the estimated price. Type Kalshi’s real price next time for an exact record.');
      logBet({ kind: 'combo', price: offered, estimated, amount: amt, contracts: contractsFor(amt, offered), legs: legs.map((l) => ({ ticker: l.ticker, side: l.side, label: l.label, gameLabel: l.gameLabel, league: l.league, start: l.start, price: l.price })), fair }, () => { combo = []; comboPrice = ''; store.set('combo', combo); updateCount(); });
    });
  }

  // ---------- track record (the tool's picks) ----------
  // Every pick it showed you, once each (a pick is re-logged each day until its game, and 'auto'/'shadow' picks are tracked quietly, never shown).
  const SHOWN = (p) => !['plan', 'shadow'].includes(p.cat);
  function allPicks() {
    const m = new Map();
    for (const d of [...Object.values(picklog), ...Object.values(genDocs)]) for (const p of d.picks || []) { if (!SHOWN(p)) continue; const o = m.get(p.id); if (!o || (!o.res && p.res)) m.set(p.id, { ...p, day: o?.day ?? d.date, by: p.by ?? d.by ?? null, byName: p.byName ?? d.byName ?? null }); }
    return [...m.values()];
  }
  const pickProfit = (p) => { const c = p.cost || p.price; if (!(c > 0)) return 0; return p.res === 'won' ? 10 * (1 / c - 1) : p.res === 'lost' ? -10 : 0; };
  function statsOf(list) {
    const g = list.filter((p) => p.res === 'won' || p.res === 'lost');
    const w = g.filter((p) => p.res === 'won').length;
    const profit = g.reduce((a, p) => a + pickProfit(p), 0);
    const exp = g.reduce((a, p) => a + (p.src === 'ai' && p.aiProb ? p.aiProb : p.fair || 0), 0);
    return { n: g.length, w, l: g.length - w, profit, roi: g.length ? profit / (10 * g.length) : 0, exp, pending: list.filter((p) => !p.res).length };
  }
  // ---------- hit rates (by number of legs and by sport) ----------
  let recordView = store.get('recordView', 'parlays'); if (recordView !== 'parlays' && recordView !== 'all') recordView = 'parlays';
  let hitRange = store.get('hitRange', 'all'), hitSrc = store.get('hitSrc', 'all');
  const LEG_PREFIX = [['KXNCAAMB', 'cbb'], ['KXNCAAF', 'cfb'], ['KXNFL', 'nfl'], ['KXNBA', 'nba'], ['KXMLB', 'mlb']];
  const legLeague = (l) => l.league || (LEG_PREFIX.find(([p]) => (l.ticker || '').startsWith(p)) || [])[1] || 'other';
  const nLegs = (p) => (p.legs ? p.legs.length : 1);
  const chanceOf = (p) => (p.src !== 'math' && p.aiProb ? p.aiProb : p.fair);
  function hitRow(name, list, note) {
    const g = list.filter((p) => p.res === 'won' || p.res === 'lost');
    const w = g.filter((p) => p.res === 'won').length;
    const gc = g.filter((p) => chanceOf(p) != null); const exp = gc.length ? gc.reduce((a, p) => a + chanceOf(p), 0) / gc.length : null;
    const profit = g.reduce((a, p) => a + pickProfit(p), 0);
    const rate = g.length ? w / g.length : null;
    const waiting = list.filter((p) => !p.res).length;
    return `<tr><td>${name}${note ? `<div class="hint">${note}</div>` : ''}</td><td class="r num">${g.length ? `${w} of ${g.length}` : '—'}${waiting ? `<div class="hint">+${waiting} waiting</div>` : ''}</td>
      <td class="r num"><b class="${rate != null && exp != null ? (rate >= exp ? 'pos' : 'neg') : ''}">${pct(rate)}</b><div class="hint">expected ${pct(exp)}</div>${g.length ? `<div class="bar" aria-hidden="true" style="margin-top:4px"><i style="width:${Math.round(rate * 100)}%"></i><u style="left:${Math.round(Math.min(1, exp) * 100)}%"></u></div>` : ''}</td>
      <td class="r num ${profit > 0 ? 'pos' : profit < 0 ? 'neg' : ''}">${g.length ? money(Math.round(profit), true) : '—'}</td></tr>`;
  }
  const hitTable = (title, sub, rows) => `<div class="card"><h3>${title}</h3>${sub ? `<p class="lede" style="font-size:13.5px">${sub}</p>` : ''}<div class="tbl-wrap"><table class="hits"><thead><tr><th></th><th class="r">Hit</th><th class="r">Hit rate</th><th class="r">$10/bet</th></tr></thead><tbody>${rows.join('')}</tbody></table></div></div>`;
  // ---- "Would we have made money?" — $10 on every pick, in plain words ----
  function moneyCard(ps, LN) {
    const uniq = new Map(); // the same pick can be logged on two days; count it once
    for (const p of ps) { const o = uniq.get(p.id); if (!o || (!o.res && p.res)) uniq.set(p.id, p); }
    const U = [...uniq.values()];
    const line = (name, list) => {
      const g = list.filter((p) => p.res === 'won' || p.res === 'lost'), w = g.filter((p) => p.res === 'won').length, pr = g.reduce((a, p) => a + pickProfit(p), 0), wait = list.length - g.length;
      return { g: g.length, pr, row: `<tr><td>${name}${wait ? `<div class="hint">${wait} still waiting on games</div>` : ''}</td><td class="r num">${g.length ? `${w} of ${g.length}` : '—'}</td><td class="r num"><b class="${pr > 0 ? 'pos' : pr < 0 ? 'neg' : ''}">${g.length ? money(Math.round(pr), true) : '—'}</b>${g.length ? `<div class="hint">bet ${money(10 * g.length)}</div>` : ''}</td></tr>` };
    };
    const rows = [
      line('Single bets it picked', U.filter((p) => !p.legs)),
      line('Parlays it picked', U.filter((p) => p.legs)),
      line('&nbsp;&nbsp;AI researcher’s single bets', U.filter((p) => !p.legs && p.src === 'ai')),
      line('&nbsp;&nbsp;Math single bets', U.filter((p) => !p.legs && p.src === 'math')),
      line('&nbsp;&nbsp;Weekly card (singles and parlays)', U.filter((p) => p.src === 'weekly')),
    ];
    const tot = rows[0].pr + rows[1].pr, n = rows[0].g + rows[1].g;
    const verdict = n < 30 ? `Too early to call — give it about 100 finished picks.` : tot > 0 ? `So far, following every pick would have made money.` : `So far, following every pick would have lost money.`;
    const AC = (LN?.acc || []).filter((a) => a.n && a.m != null);
    const sure = AC.map((a) => `<tr><td>${Math.round(a.lo * 100)}–${Math.round(Math.min(a.hi, 1) * 100)}% sure<div class="hint">${a.gn ? `only good prices: ${a.gw} of ${a.gn}, ${money(Math.round(a.gm * 10), true)}` : ''}</div></td><td class="r num">${a.w} of ${a.n}</td><td class="r num"><b class="${a.m > 0 ? 'pos' : a.m < 0 ? 'neg' : ''}">${money(Math.round(a.m * 10), true)}</b><div class="hint">bet ${money(10 * a.n)}</div></td></tr>`).join('');
    return `<div class="card"><h3>Would we have made money?</h3><p class="lede" style="font-size:13.5px">Pretend you put <b>$10 on every one</b>. Green means you’d be ahead, red means behind. Kalshi’s fee is already taken out.</p>
      <p style="font-size:15px"><b class="${n >= 30 ? (tot > 0 ? 'pos' : 'neg') : ''}">${n ? `${money(Math.round(tot), true)} on ${n} finished picks.` : 'No finished picks yet.'}</b> ${verdict}</p>
      <p style="font-size:14px;margin-top:10px"><b>The picks it showed you</b></p><div class="tbl-wrap"><table class="hits"><thead><tr><th></th><th class="r">Won</th><th class="r">$10 each</th></tr></thead><tbody>${rows.map((r) => r.row).join('')}</tbody></table></div>
      ${sure ? `<p style="font-size:14px;margin-top:14px"><b>Every bet it rated, by how sure it was</b></p><div class="tbl-wrap"><table class="hits"><thead><tr><th></th><th class="r">Right</th><th class="r">$10 each</th></tr></thead><tbody>${sure}</tbody></table></div><p class="hint">This bigger list is every bet it looked at, betting on whichever side it thought more likely — not just the ones it showed you. “Only good prices” means just the ones where Kalshi charged less than the tool’s chance. All time.</p>` : ''}
      <p class="hint">A few days of results are mostly luck. Trust a row once it has 100+ finished bets.</p></div>`;
  }
  function renderHitRates(all) {
    const since = hitRange === 'all' ? 0 : Date.now() - Number(hitRange) * 86400e3;
    let ps = all.filter((p) => Date.parse(p.start) >= since);
    if (hitSrc === 'math') ps = ps.filter((p) => p.src === 'math'); if (hitSrc === 'ai') ps = ps.filter((p) => p.src !== 'math');
    let h = `<div class="row" style="justify-content:space-between">
      <div class="seg small" role="group" aria-label="Who picked">${[['all', 'All picks'], ['math', 'Math'], ['ai', 'AI researcher']].map(([k, l]) => `<button data-rsrc="${k}" aria-pressed="${hitSrc === k}">${l}</button>`).join('')}</div>
      <div class="seg small" role="group" aria-label="Time range">${[['7', '7 days'], ['30', '30 days'], ['all', 'All time']].map(([k, l]) => `<button data-rrange="${k}" aria-pressed="${hitRange === k}">${l}</button>`).join('')}</div></div>
      <p class="lede" style="font-size:13.5px">“Hit” means every leg won. The gold mark on each bar is how often the tool expected it to hit. Green bar past the mark = doing better than expected. $10 each = profit if you had put $10 on every one.</p>`;
    const LN = index?.learn;
    h += moneyCard(ps, LN);
    const AC = (LN?.acc || []).filter((a) => a.n);
    h += `<div class="card"><h3>How often is it right?</h3><p class="lede" style="font-size:13.5px">For every bet it rated, take the outcome it thought more likely. Did it happen? If it's well tuned, “80% sure” should come true about 80% of the time.</p>${AC.length ? `<div class="tbl-wrap"><table class="hits"><thead><tr><th>When it said</th><th class="r">Right</th><th class="r">Hit rate</th></tr></thead><tbody>${AC.map((a) => { const r = a.w / a.n, ex = a.e / a.n; return `<tr><td>${Math.round(a.lo * 100)}–${Math.round(Math.min(a.hi, 1) * 100)}% sure</td><td class="r num">${a.w} of ${a.n}</td><td class="r num"><b class="${r >= ex - 0.02 ? 'pos' : 'neg'}">${pct(r)}</b><div class="hint">expected ${pct(ex)}</div><div class="bar" aria-hidden="true" style="margin-top:4px"><i style="width:${Math.round(r * 100)}%"></i><u style="left:${Math.round(Math.min(1, ex) * 100)}%"></u></div></td></tr>`; }).join('')}</tbody></table></div>${LN?.espn?.agree?.n >= 10 ? `<p class="hint">When ESPN's model agreed on who wins: right ${LN.espn.agree.w} of ${LN.espn.agree.n}. When it disagreed: ${LN.espn.disagree.w} of ${LN.espn.disagree.n}.</p>` : ''}` : `<p class="hint">Fills in as games finish — usually the morning after it starts tracking.</p>`}</div>`;
    h += `<div class="card"><h3>What it has learned</h3>${LN?.notes?.length ? `<ul class="standout">${LN.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul><p class="hint">These adjustments are already built into every chance and pick you see. They update with every price refresh.</p>` : `<p>Nothing yet. It has ${LN?.legs || 0} settled bets to learn from. Once a kind of bet (say, NBA win-by-X bets) has about 8 results, it starts nudging that kind's chances toward what really happened — only a little at first, more as results pile up. A kind of bet that keeps losing money over 30+ bets gets paused.</p>`}</div>`;
    {
      const tk = todayKey(); const tp = (picklog[tk]?.picks || []);
      const wk = Object.values(picklog).filter((d) => Date.parse(d.date) > Date.now() - 7 * 86400e3).flatMap((d) => d.picks || []);
      const CN = [['Best value', (p) => p.cat === 'value'], ['Safest', (p) => p.cat === 'safest'], ['Big payout', (p) => p.cat === 'payout'], ['Player bets', (p) => p.cat === 'props'], ['Paused kinds, tracked quietly', (p) => p.cat === 'shadow'], ['Weekly card', (p) => p.src === 'weekly'], ['2-leg parlays', (p) => p.legs?.length === 2], ['3-leg parlays', (p) => p.legs?.length === 3], ['4–5 leg parlays', (p) => p.legs && p.legs.length >= 4 && p.legs.length <= 5], ['6+ leg parlays', (p) => p.legs?.length >= 6]];
      const aiN = (L) => L.filter((p) => p.src === 'ai').length;
      h += `<div class="card"><h3>What it's tracking</h3><p style="font-size:14px">Everything it suggests is saved and graded. On top of that, every day it quietly saves <b>every bet it rated</b> for the next day's games — ${index?.learn?.trackedToday ?? 0} today — and grades them too. That's what it learns from, so it doesn't need you to bet anything.</p>
        <div class="tbl-wrap"><table class="hits"><thead><tr><th></th><th class="r">Today</th><th class="r">Last 7 days</th></tr></thead><tbody>
        ${CN.map(([n, f]) => `<tr><td>${n}</td><td class="r num">${tp.filter(f).length}</td><td class="r num">${wk.filter(f).length}</td></tr>`).join('')}
        <tr><td>AI researcher's picks</td><td class="r num">${aiN(tp)}</td><td class="r num">${aiN(wk)}</td></tr>
        <tr><td><b>Every bet it rated (quietly)</b></td><td class="r num">${index?.learn?.trackedToday ?? 0}</td><td class="r num">${(index?.learn?.legs || 0) + (index?.learn?.waiting || 0)}<div class="hint">${index?.learn?.legs || 0} graded</div></td></tr>
        </tbody></table></div></div>`;
      const PT = index?.learn?.patterns || [];
      if (PT.length) h += `<div class="card"><h3>Patterns across every bet it rated</h3><p class="lede" style="font-size:13.5px">Uses all the graded bets above, so these fill in much faster than your picks do. "Bargains" are the ones that looked underpriced when it rated them — the return shows whether betting those would have made money.</p><div class="tbl-wrap"><table class="hits"><thead><tr><th></th><th class="r">Won</th><th class="r">Hit rate</th><th class="r">Bargains</th></tr></thead><tbody>
        ${PT.map((x) => { const r = x.w / x.n, ex = x.e / x.n; return `<tr><td>${esc(x.name)}</td><td class="r num">${x.w} of ${x.n}</td><td class="r num"><b class="${r >= ex ? 'pos' : 'neg'}">${pct(r)}</b><div class="hint">expected ${pct(ex)}</div></td><td class="r num ${x.roi > 0 ? 'pos' : x.roi < 0 ? 'neg' : ''}">${x.bn ? `${x.roi >= 0 ? '+' : '−'}${pct(Math.abs(x.roi))}<div class="hint">${x.bn} bets</div>` : '—'}</td></tr>`; }).join('')}
        </tbody></table></div><p class="hint">Small groups are mostly luck. Trust a pattern once it has a few hundred bets.</p></div>`;
    }
    if (!ps.length) return h + `<div class="card empty"><strong>Nothing in this range yet</strong><span>Picks are graded a few hours after each game ends.</span></div>`;
    const buckets = [[1, '1 leg (single bets)'], [2, '2 legs'], [3, '3 legs'], [4, '4 legs'], [5, '5 legs'], [6, '6+ legs (moonshots)']];
    h += hitTable('By number of legs', 'Every suggested bet and parlay, grouped by how many legs it had.', buckets.map(([n, name]) => hitRow(name, ps.filter((p) => (n === 6 ? nLegs(p) >= 6 : nLegs(p) === n)))));
    const lgs = ['nfl', 'cfb', 'nba', 'cbb', 'mlb'];
    const singles = ps.filter((p) => !p.legs);
    h += hitTable('Single bets by sport', '', lgs.filter((k) => singles.some((p) => p.league === k)).map((k) => hitRow(LG[k].label, singles.filter((p) => p.league === k))));
    const parlays = ps.filter((p) => p.legs);
    const pSport = (p) => { const s = new Set(p.legs.map(legLeague)); return s.size === 1 ? [...s][0] : 'mixed'; };
    h += hitTable('Parlays by sport', 'Parlays with every leg in one sport, plus mixed-sport parlays.', [...lgs.filter((k) => parlays.some((p) => pSport(p) === k)).map((k) => hitRow(LG[k].label, parlays.filter((p) => pSport(p) === k))), ...(parlays.some((p) => pSport(p) === 'mixed') ? [hitRow('Mixed sports', parlays.filter((p) => pSport(p) === 'mixed'))] : [])]);
    // every individual leg (single bets + each leg inside parlays), counted once per day
    const seen = new Set(); const legs = [];
    for (const p of ps) {
      const items = p.legs ? p.legs.map((l) => ({ ticker: l.ticker, side: l.side, res: l.res, fair: l.fair, price: l.price, league: legLeague(l) })) : [{ ticker: p.ticker, side: p.side, res: p.res, fair: chanceOf(p), price: p.price, cost: p.cost, league: p.league }];
      for (const it of items) { const k = p.day + it.ticker + it.side; if (seen.has(k)) continue; seen.add(k); legs.push({ ...it, src: 'math', cost: it.cost || (it.price ? it.price + fee(it.price) : null) }); }
    }
    h += hitTable('Every leg, by sport', 'Each individual bet the tool suggested — on its own or inside a parlay — counted once per day. This shows which sports the picks are actually good at.', lgs.filter((k) => legs.some((l) => l.league === k)).map((k) => hitRow(LG[k].label, legs.filter((l) => l.league === k))));
    // ---- patterns: slice every leg several ways, and call out what stands out ----
    const kindOf = (t) => { const s = (t || '').split('-')[0]; return /GAME$/.test(s) ? 'winner' : /SPREAD$/.test(s) ? 'spread' : /TOTAL$/.test(s) ? 'total' : 'prop'; };
    const KIND = { winner: 'Who wins', spread: 'Win by X', total: 'Total points/runs', prop: 'Player bets' };
    const items = legs.map((l) => ({ ...l, kind: kindOf(l.ticker), edge: l.fair != null && l.cost != null ? l.fair - l.cost : null }));
    const singlesConf = ps.filter((p) => !p.legs);
    const dims = [
      ['By bet type', 'Every leg the tool suggested, grouped by what kind of bet it was.', ['winner', 'spread', 'total', 'prop'].map((k) => [KIND[k], items.filter((i) => i.kind === k)])],
      ['By price', 'Cheap long shots vs. expensive favorites. Shows whether it is better at one end.', [['Under 25¢ (long shots)', 0, 0.25], ['25–50¢', 0.25, 0.5], ['50–75¢', 0.5, 0.75], ['75¢ and up (favorites)', 0.75, 1.01]].map(([n, lo, hi]) => [n, items.filter((i) => i.price >= lo && i.price < hi)])],
      ['By size of the edge', 'The key tuning question: do bigger price gaps actually win more often than expected? If yes, the edge math is working.', [['Overpriced (no edge)', -1, 0], ['0–3¢ cheaper', 0, 0.03], ['3–6¢ cheaper', 0.03, 0.06], ['6¢+ cheaper', 0.06, 2]].map(([n, lo, hi]) => [n, items.filter((i) => i.edge != null && i.edge >= lo && i.edge < hi)])],
      ['By confidence score (single bets)', 'Does a higher confidence score really win more often? It should.', [['Very high (80+)', 0.8, 2], ['High (65–79)', 0.65, 0.8], ['Medium (55–64)', 0.55, 0.65], ['Low (under 55)', 0, 0.55]].map(([n, lo, hi]) => [n, singlesConf.filter((p) => chanceOf(p) >= lo && chanceOf(p) < hi)])],
    ];
    h += `<h3 style="margin-top:6px">Patterns</h3>`;
    const stand = [];
    const consider = (name, list) => {
      const g = list.filter((p) => p.res === 'won' || p.res === 'lost'); if (g.length < 12) return;
      const rate = g.filter((p) => p.res === 'won').length / g.length, exp = g.reduce((a, p) => a + (chanceOf(p) || 0), 0) / g.length, d = rate - exp;
      if (Math.abs(d) >= 0.08) stand.push({ name, n: g.length, rate, exp, d, score: Math.abs(d) * Math.sqrt(g.length) });
    };
    for (const [, , rows] of dims) for (const [n, list] of rows) consider(n, list);
    for (const k of lgs) for (const t of ['winner', 'spread', 'total', 'prop']) consider(`${LG[k].label} · ${KIND[t].toLowerCase()}`, items.filter((i) => i.league === k && i.kind === t));
    for (const [n, name] of buckets) consider(name, ps.filter((p) => (n === 6 ? nLegs(p) >= 6 : nLegs(p) === n)));
    stand.sort((a, b) => b.score - a.score);
    const gradedLegs = items.filter((i) => i.res === 'won' || i.res === 'lost').length;
    h += `<div class="card"><h3>What stands out</h3>${stand.length ? `<ul class="standout">${stand.slice(0, 6).map((s) => `<li><b>${esc(s.name)}</b> hit <b class="${s.d > 0 ? 'pos' : 'neg'}">${pct(s.rate)}</b> when the tool expected ${pct(s.exp)} (${s.n} graded). ${s.d > 0 ? 'The tool may be too cautious here — these could deserve more weight.' : 'The tool is too optimistic here — treat these with more caution, or skip them.'}</li>`).join('')}</ul><p class="hint">A group needs at least 12 graded bets before it shows up here, and about 50 before it really means something. Small groups swing a lot by luck.</p>` : `<p>Nothing stands out yet. ${gradedLegs} individual bets graded so far; patterns show up here once a group has at least 12 and the results differ from what was expected by 8 points or more.</p>`}</div>`;
    const W = latestWeekly();
    if (W?.tuning) h += `<div class="card"><div class="row" style="justify-content:space-between"><h3>Researcher's tuning notes</h3><span class="pill ai">${esc(W.date)}</span></div><p>${esc(W.tuning)}</p></div>`;
    for (const [title, sub, rows] of dims) h += hitTable(title, sub, rows.filter(([, list]) => list.length).map(([n, list]) => hitRow(n, list)));
    h += hitTable('Sport × bet type', 'Every leg, split by sport and kind of bet.', lgs.flatMap((k) => ['winner', 'spread', 'total', 'prop'].map((t) => [`${LG[k].label} · ${KIND[t].toLowerCase()}`, items.filter((i) => i.league === k && i.kind === t)])).filter(([, l]) => l.length).map(([n, l]) => hitRow(n, l)));
    return h;
  }

  const WHO = { ai: ['AI researcher', 'ai'], math: ['Math', 'low'], weekly: ['Weekly card', 'ai'] };
  const genWho = (p) => (p.by && p.by === myId ? 'Generated by you' : p.by && names[p.by] ? `Generated by ${names[p.by]}` : p.byName ? `Generated by ${p.byName}` : p.by ? 'Generated by a friend' : 'Generated');
  function resolveNames(ps) { // look up display names for people who generated parlays, then redraw once
    if (!userCap) return;
    const ids = [...new Set(ps.map((p) => p.by).filter((x) => x && names[x] == null))]; if (!ids.length) return;
    userCap.profiles(ids).then((ps2) => { let any = false; for (const id of ids) { const n = ps2[id]?.name || ''; if (names[id] !== n) { names[id] = n; any = true; } } if (any && tab === 'record') renderRecord(); }).catch(() => {});
  }
  function histRow(p) {
    const [who, cls] = p.src === 'gen' ? [genWho(p), 'medium'] : WHO[p.src] || [p.src, 'low']; const ch = chanceOf(p);
    return `<div class="hrow"><div class="row" style="gap:6px"><span class="pill ${p.res || 'pending'}">${p.res === 'won' ? '✓ hit' : p.res === 'lost' ? '✗ missed' : p.res === 'void' ? 'void' : 'waiting'}</span><span class="pill ${cls}">${who}</span>${p.legs ? `<span class="hint">${p.legs.length}-leg parlay</span>` : ''}</div>
        ${p.legs ? `<div class="hl">${p.legs.map((l) => `<span class="lg ${l.res || ''}">${l.res === 'won' ? '✓' : l.res === 'lost' ? '✗' : '·'} ${esc(l.label)}<i>${esc(l.gameLabel || '')}</i></span>`).join('')}</div>` : `<b>${esc(p.label)}</b><div class="hint">${esc(LG[p.league]?.label || '')} · ${esc(p.gameLabel || '')} · ${esc(timeOf(p.start))}</div>`}
        <div class="hint">${cents(p.price)} · chance ${pct(ch)} · ${p.res === 'won' || p.res === 'lost' ? `<b class="${pickProfit(p) > 0 ? 'pos' : 'neg'}">${money(pickProfit(p), true)}</b> on $10` : `pays about ${(1 / p.price).toFixed(1)}x · $10 would win ${money(10 * (1 / (p.cost || p.price) - 1))}`}</div></div>`;
  }
  function renderHistory(ps) {
    const f = store.get('histF', 'all');
    const list = ps.filter((p) => f === 'all' || (f === 'parlays' && p.legs) || (f === 'singles' && !p.legs) || (f === 'gen' && p.src === 'gen')).sort((a, b) => (b.start || '').localeCompare(a.start || '')).slice(0, 250);
    const g = list.filter((p) => p.res === 'won' || p.res === 'lost'), w = g.filter((p) => p.res === 'won').length;
    let h = `<div class="chips" role="group" aria-label="Show">${[['all', 'Everything'], ['parlays', 'Parlays'], ['singles', 'Single bets'], ['gen', 'Generated']].map(([k, l]) => `<button class="chip" data-histf="${k}" aria-pressed="${f === k}">${l}</button>`).join('')}</div>
      <p class="lede" style="font-size:14px">Every pick and parlay the tool suggested, newest first, with what happened. ${g.length ? `<b>${w} of ${g.length} hit</b> so far in this list; ${list.length - g.length} still waiting on games.` : ''} Legs: ✓ hit, ✗ missed, · still playing.</p>`;
    if (!list.length) return h + `<div class="card empty"><strong>Nothing here yet</strong></div>`;
    resolveNames(list);
    let last = '';
    for (const p of list) {
      const dl = dayLabel(p.start); if (dl !== last) { if (last) h += '</div>'; h += `<div class="day"><h3>${esc(dl)}</h3>`; last = dl; }
      h += histRow(p);
    }
    if (last) h += '</div>';
    return h;
  }
  function renderRecord() {
    const el = $('p-record');
    const ps = allPicks();
    let html = `<div style="display:grid;gap:6px"><h2>Track record</h2><p class="lede">Every parlay the tool picked or someone generated, and whether it hit. Money assumes $10 on each one, after Kalshi's fee.</p></div>`;
    html += `<div class="seg" role="group" aria-label="View">${[['parlays', 'Parlays'], ['all', 'Everything']].map(([k, l]) => `<button data-rview="${k}" aria-pressed="${recordView === k}">${l}</button>`).join('')}</div>`;
    if (!ps.length) { html += `<div class="card empty"><strong>${dbState === 'on' ? 'Nothing graded yet' : 'Loading…'}</strong><span>Parlays are saved when they are picked or generated and marked won or lost a few hours after the last game ends.</span></div>`; el.innerHTML = html; return; }
    if (recordView === 'all') { html += renderHistory(ps); el.innerHTML = html; return; }
    if (myBets.length) { // the bets this person marked, newest first, with live status
      const cards = myBets.map((b) => parlayCard({ legs: b.legs, fair: b.legs.every((l) => l.fair != null) ? b.legs.reduce((a, l) => a * l.fair, 1) : null }, { title: b.title, who: 'You', sub: new Date(b.at).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }), noMine: true, extra: `<button class="btn small" data-ibet='${esc(JSON.stringify(b.legs))}' data-ibet-title="${esc(b.title)}">Remove</button>` }));
      html += `<h3 style="margin-top:4px">Your bets</h3><div class="picks">${cards.join('')}</div>`;
    }
    { // how the "own money" rule has done, scored day by day on the picks it would have taken
      const byDay = {}; for (const p of ps) if (p.day && (p.src === 'ai' || p.src === 'math' || p.src === 'weekly')) (byDay[p.day] ||= []).push(p);
      const own = Object.values(byDay).flatMap((L) => { const { singles, parlays } = ownPicks(L.filter((p) => !closedOf(p) || p.res)); return [...singles, ...parlays]; });
      const st = statsOf(own);
      html += `<div class="card" style="border-color:var(--accent)"><div class="row" style="justify-content:space-between;align-items:baseline"><h3 style="margin:0">If it bet its own money</h3><b class="num ${st.profit > 0 ? 'pos' : st.profit < 0 ? 'neg' : ''}">${st.n ? money(st.profit, true) : '—'}</b></div><div class="hint">${st.n ? `${st.w} won · ${st.l} lost (${pct(st.w / st.n)}) · $10 on each · ${st.pending} waiting` : `${st.pending} waiting on results`}. Only its favorite setups, scored separately from everything else it suggests.</div></div>`;
      if (myBets.length) { const mine = statsOf(myBets.map((b) => ({ ...b, legs: b.legs, price: b.legs.reduce((a, l) => a * (l.price || 1), 1), cost: b.legs.reduce((a, l) => a * (l.price || 1), 1), res: (() => { const S = b.legs.map((l) => legState(l).st); return S.includes('lost') ? 'lost' : S.every((x) => x === 'won') ? 'won' : null; })() }))); html += `<div class="card"><div class="row" style="justify-content:space-between;align-items:baseline"><h3 style="margin:0">Your bets, scored</h3><b class="num ${mine.profit > 0 ? 'pos' : mine.profit < 0 ? 'neg' : ''}">${mine.n ? money(mine.profit, true) : '—'}</b></div><div class="hint">${mine.w} won · ${mine.l} lost · ${mine.pending} still playing · $10 on each. Remembered on this phone.</div></div>`; }
    }
    html += challengeCard(); // the challenge record stays pinned at the top
    const par = ps.filter((p) => p.legs && p.legs.length > 1);
    const all = statsOf(par);
    html += `<div class="tiles three">
      <div class="tile"><span class="k">Parlays won</span><span class="v num pos">${all.w}</span><span class="e">${all.l} lost · ${all.pending} waiting</span></div>
      <div class="tile"><span class="k">Hit rate</span><span class="v num">${all.n ? pct(all.w / all.n) : '—'}</span><span class="e">${all.n} finished</span></div>
      <div class="tile"><span class="k">$10 on every parlay</span><span class="v num ${all.profit > 0 ? 'pos' : all.profit < 0 ? 'neg' : ''}">${all.n ? money(all.profit, true) : '—'}</span><span class="e">${all.n ? `${money(10 * all.n)} bet in all` : 'no results yet'}</span></div>
    </div>`;
    const who = [['Generated by you and friends', par.filter((p) => p.src === 'gen')], ['AI researcher', par.filter((p) => p.src === 'ai')], ['Weekly card', par.filter((p) => p.src === 'weekly')], ['Math', par.filter((p) => p.src === 'math')]].map(([n, l]) => [n, statsOf(l)]).filter(([, st]) => st.n || st.pending);
    if (who.length) html += `<div class="card"><h3>Who picked them</h3>${who.map(([n, st]) => `<div class="row" style="justify-content:space-between;gap:10px;padding:6px 0;border-top:1px solid var(--line)"><span>${n}<div class="hint">${st.w} won · ${st.l} lost${st.pending ? ` · ${st.pending} waiting` : ''}</div></span><b class="num ${st.profit > 0 ? 'pos' : st.profit < 0 ? 'neg' : ''}">${st.n ? money(st.profit, true) : '—'}</b></div>`).join('')}</div>`;
    const f = store.get('parF', 'all');
    const list = par.filter((p) => f === 'all' || (f === 'won' && p.res === 'won') || (f === 'lost' && p.res === 'lost') || (f === 'waiting' && !p.res)).sort((a, b) => (b.start || '').localeCompare(a.start || '')).slice(0, 250);
    html += `<div class="chips" role="group" aria-label="Show">${[['all', 'All parlays'], ['won', 'Winners'], ['lost', 'Losers'], ['waiting', 'Still playing']].map(([k, l]) => `<button class="chip" data-parf="${k}" aria-pressed="${f === k}">${l}</button>`).join('')}</div>`;
    if (!list.length) html += `<div class="card empty"><strong>Nothing here yet</strong></div>`;
    else {
      resolveNames(list);
      let last = '';
      for (const p of list) { const dl = dayLabel(p.start); if (dl !== last) { if (last) html += '</div>'; html += `<div class="day picks"><h3>${esc(dl)}</h3>`; last = dl; } const [who, cls] = p.src === 'gen' ? [genWho(p), 'medium'] : WHO[p.src] || [p.src, 'low']; html += parlayCard(p, { who, ai: cls === 'ai', aiProb: p.aiProb, sub: p.res === 'won' || p.res === 'lost' ? `<b class="${pickProfit(p) > 0 ? 'pos' : 'neg'}">${money(pickProfit(p), true)}</b> on $10` : `$10 would win ${money(10 * (1 / (p.cost || p.price) - 1))}` }); }
      if (last) html += '</div>';
    }
    el.innerHTML = html;
  }
  function chart(graded) {
    const W = 600, H = 170, pl = 52, pr = 16, pt = 14, pb = 24;
    const series = (src) => { let r = 0; return [0, ...graded.filter((p) => (src === 'ai' ? p.src !== 'math' : p.src === 'math')).map((p) => (r += pickProfit(p)))]; };
    const a = series('math'), b = series('ai');
    const all = [...a, ...b]; const lo = Math.min(0, ...all), hi = Math.max(0, ...all), span = hi - lo || 1;
    const y = (v) => pt + (1 - (v - lo) / span) * (H - pt - pb);
    const path = (pts) => pts.length < 2 ? '' : pts.map((v, i) => (i ? 'L' : 'M') + (pl + (i / (pts.length - 1)) * (W - pl - pr)).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ');
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Running total: math ${money(a[a.length - 1], true)}, AI researcher ${money(b[b.length - 1], true)}">
      <line class="grid-l" x1="${pl}" x2="${W - pr}" y1="${y(hi)}" y2="${y(hi)}"/><line class="grid-l" x1="${pl}" x2="${W - pr}" y1="${y(lo)}" y2="${y(lo)}"/><line class="zero" x1="${pl}" x2="${W - pr}" y1="${y(0)}" y2="${y(0)}"/>
      <text x="${pl - 8}" y="${y(hi) + 4}" text-anchor="end">${money(hi)}</text>${lo < 0 ? `<text x="${pl - 8}" y="${y(lo) + 4}" text-anchor="end">${money(lo)}</text>` : ''}${hi !== 0 && lo !== 0 ? `<text x="${pl - 8}" y="${y(0) + 4}" text-anchor="end">$0</text>` : ''}
      <path class="ln" d="${path(a)}"/><path class="ln2" d="${path(b)}"/>
      <text x="${pl}" y="${H - 4}">Oldest</text><text x="${W - pr}" y="${H - 4}" text-anchor="end">Latest</text></svg>`;
  }

  // ---------- 100 -> 100K challenge: one bet a week, 11 weeks, everything rides ----------
  const CH_START = 100, CH_GOAL = 100000, CH_WEEKS = 11;
  const chFresh = (attempt = 1, attempts = []) => ({ attempt, startedAt: new Date().toISOString(), week: 1, bank: CH_START, open: null, history: [], attempts });
  const chNeed = (bank, week) => Math.pow(CH_GOAL / bank, 1 / Math.max(1, CH_WEEKS - week + 1));
  const payOf = (price) => 1 / (price + fee(price)); // dollars back per $1, after Kalshi's fee
  async function saveChal(next) { chal = next; renderChal(); if (db && owner) try { await db.doc('challenge/main').set(JSON.parse(JSON.stringify(next))); } catch { toast('Couldn’t save the challenge. Try again.'); } }
  function chalOptions(need) {
    const key = ['chal', index?.updatedAt, tick(), sport, college, slot, parlayProps, need.toFixed(3)].join('|');
    if (parlayCache[key]) return parlayCache[key];
    const pool = legPool(parlayProps, 7).filter((e) => e.edge >= -0.04 && e.price <= 0.95 && !e.paused);
    const ok = (price) => payOf(price) >= need;
    const out = [];
    const single = pool.filter((e) => ok(e.price)).sort((a, b) => b.fair - a.fair)[0];
    if (single) out.push({ legs: [single], fair: single.fair, price: single.price });
    for (const n of [2, 3, 4]) {
      // Aim each leg near the price that gets the whole ticket to the payout needed, then take the likeliest combo.
      const per = Math.pow(1 / need, 1 / n);
      let best = null;
      for (const cap of [per + 0.12, per + 0.07, per + 0.03, per, per - 0.04]) {
        const perGame = {}; const L = pool.filter((e) => e.price <= cap).sort((a, b) => b.fair - a.fair).filter((e) => (perGame[e.game] = (perGame[e.game] || 0) + 1) <= 2).slice(0, 100);
        const all = L.length >= n ? beamParlays(L, n, (e) => Math.log(e.fair), 200) : [];
        for (const b of all[n - 1] || []) { const c = toParlay(L, b); if (ok(c.price) && (!best || c.fair > best.fair)) best = c; }
      }
      if (best) out.push(best);
    }
    out.sort((a, b) => b.fair - a.fair);
    return (parlayCache[key] = out);
  }
  function chalCard(o, i, C) {
    const stake = C.bank, back = stake * payOf(o.price);
    const legsKey = JSON.stringify(o.legs.map((l) => l.key));
    return `<article class="pick">
      <div class="pick-head"><b>${i === 0 ? 'Best chance: ' : ''}${o.legs.length === 1 ? 'Single bet' : o.legs.length + '-leg parlay'}</b><span>${money(stake)} → about ${money(back)} if it hits · ${confPill(o.fair)}</span></div>
      <div class="legs-list">${o.legs.map((l) => `<button class="leg-row" data-sheet="${esc(l.key)}"><span class="n"><b>${esc(l.label)}</b><span>${esc(LG[l.league]?.label || '')} · ${esc(l.gameLabel || '')} · ${esc(whenOf(l.start))}</span></span><span class="num">${cents(l.price)}<span class="hint"> · ${Math.round(l.fair * 100)}</span></span></button>`).join('')}</div>
      <div class="facts-inline"><span>Chance it hits: <b>${pct(o.fair)}</b></span><span>Pays <b>${payOf(o.price).toFixed(2)}x</b></span>${o.legs.length > 1 ? '<span class="hint">Kalshi quotes its own combo price — check it’s close.</span>' : ''}</div>
      <div class="row">${o.legs.length > 1 ? `<button class="btn small" data-loadcombo='${esc(legsKey)}'>Open in combo builder</button>` : `<button class="btn small" data-sheet="${esc(o.legs[0].key)}">Open in Kalshi</button>`}${owner && db && !C.open && !C.done ? `<button class="btn small primary" data-chplace="${i}">I placed this bet</button>` : ''}</div>
    </article>`;
  }
  function renderChal() {
    const el = $('p-chal'); if (!el) return;
    const C = chal || chFresh();
    let h = `<div style="display:grid;gap:6px"><h2>$100 → $100,000 challenge</h2><p class="lede">One bet a week for 11 weeks. Each win rolls everything into next week's bet. One miss and it starts over from $100.</p></div>`;
    if (!index) { el.innerHTML = h + `<div class="card empty"><strong>Loading…</strong></div>`; return; }
    const weeksLeft = CH_WEEKS - C.week + 1, need = chNeed(C.bank, C.week);
    const ladder = Array.from({ length: CH_WEEKS }, (_, k) => {
      const w = k + 1, target = CH_START * Math.pow(CH_GOAL / CH_START, w / CH_WEEKS);
      C.history ||= [];
      const got = C.history.find((x) => x.attempt === C.attempt && x.week === w && x.result === 'won');
      return `<span class="${got ? 'done' : w === C.week && !C.done ? 'now' : ''}">Week ${w}<b>${money(got ? got.bankAfter : target)}</b>${got ? 'made it' : 'target'}</span>`;
    }).join('');
    h += `<div class="card"><div class="row" style="justify-content:space-between;align-items:flex-end;gap:12px"><div><div class="hint">Attempt ${C.attempt} · ${C.done === 'won' ? 'Finished!' : C.done === 'lost' ? `Ended in week ${C.week}` : `Week ${C.week} of ${CH_WEEKS}`}</div><div class="bigstat num">${money(C.done === 'lost' ? 0 : C.bank)}</div></div><div class="hint" style="text-align:right">Goal<br><b class="num" style="color:var(--ink)">${money(CH_GOAL)}</b></div></div>
      <div class="ladder">${ladder}</div></div>`;
    if (C.done === 'won') h += `<div class="banner"><b>You did it — $100 to ${money(C.bank)}.</b> Almost nobody finishes this. Seriously, consider cashing out.</div>`;
    if (C.done === 'lost') {
      const last = C.history.filter((x) => x.attempt === C.attempt).pop();
      h += `<div class="card"><h3>This run is over</h3><p>${last ? `Week ${last.week}'s bet missed: ${esc(last.label)}.` : ''} The best it reached was ${money(Math.max(CH_START, ...C.history.filter((x) => x.attempt === C.attempt).map((x) => x.bankAfter || 0)))}.</p>${owner && db ? `<div class="row"><button class="btn primary" data-chreset>Start over with $100</button></div>` : ''}</div>`;
    } else if (C.open) {
      const o = C.open;
      h += `<div class="card"><h3>Week ${C.week}'s bet is in</h3><p><b>${esc(o.label)}</b></p><p class="hint">${money(o.stake)} at ${cents(o.price)} → about ${money(o.stake * payOf(o.price))} if it hits. ${o.legs.length > 1 ? 'Every leg has to win.' : ''} It's marked automatically once Kalshi settles it, or tap below.</p>
        ${owner && db ? `<div class="row"><button class="btn small good" data-chres="won">It hit</button><button class="btn small bad" data-chres="lost">It missed</button><button class="btn small" data-chres="cancel">I didn't place it</button></div>` : ''}</div>`;
    } else if (!C.done) {
      h += `<div class="card"><h3>Week ${C.week}: this bet needs to pay at least ${need.toFixed(2)}x</h3><p>To stay on pace, put the whole ${money(C.bank)} on one bet that at least ${need < 2 ? 'nearly doubles' : need < 3 ? 'doubles' : 'triples'} it. Here are the options with the best chance of hitting, ranked:</p>
        <div class="row" style="justify-content:space-between"><span class="hint">Bets from the next 7 days</span><label class="switch"><input type="checkbox" data-toggle="props" ${parlayProps ? 'checked' : ''}><span class="track" aria-hidden="true"></span>Use player bets</label></div></div>`;
      const opts = chalOptions(need);
      h += opts.length ? `<div class="picks">${opts.map((o, i) => chalCard(o, i, C)).join('')}</div>` : `<div class="card empty"><strong>Nothing pays enough right now</strong><span>Try turning on player bets, or check back after the next price update.</span></div>`;
      if (opts[0]) { const p = Math.pow(opts[0].fair, weeksLeft); h += `<p class="hint">Honest odds: even if every remaining week goes like this one (${pct(opts[0].fair)} each), the chance of finishing all ${weeksLeft} weeks is about 1 in ${Math.round(1 / p).toLocaleString()}. It's a lottery ticket — fun money only.</p>`; }
    }
    const past = (C.attempts || []).slice().reverse();
    if (past.length) h += `<div class="card"><h3>Past attempts</h3>${past.map((a) => `<div class="bet"><div class="bet-top"><div class="n"><span class="pill ${a.result === 'won' ? 'won' : 'lost'}">${a.result === 'won' ? 'finished' : 'ended week ' + a.lastWeek}</span> <b>Attempt ${a.n}</b><div class="s">Best: ${money(a.peak)} · ${esc(new Date(a.startedAt).toLocaleDateString())}</div></div></div></div>`).join('')}</div>`;
    if (!owner) h += `<p class="hint">Only the owner can record bets on this page.</p>`;
    el.innerHTML = h;
  }
  function chalPlace(i) {
    const C = JSON.parse(JSON.stringify(chal || chFresh()));
    const o = chalOptions(chNeed(C.bank, C.week))[i]; if (!o) return;
    const legs = o.legs.map((l) => ({ ticker: l.ticker, side: l.side, label: l.label, gameLabel: l.gameLabel, league: l.league, start: l.start, price: l.price, fair: l.fair }));
    C.open = { label: legs.map((l) => l.label).join(' + '), legs, price: o.price, fair: o.fair, stake: C.bank, placedAt: new Date().toISOString() };
    saveChal(C);
    logBet({ kind: legs.length > 1 ? 'combo' : 'single', price: o.price, amount: C.bank, contracts: contractsFor(C.bank, o.price), legs, fair: o.fair, estimated: true, challenge: true });
  }
  function chalSettle(result) {
    const C = JSON.parse(JSON.stringify(chal)); if (!C?.open) return;
    const o = C.open;
    if (result === 'cancel' || result === 'void') { C.open = null; saveChal(C); toast(result === 'void' ? 'Refunded — pick another bet for this week' : 'Cleared — pick another bet'); return; }
    const won = result === 'won';
    const bankAfter = won ? Math.floor(o.stake * payOf(o.price) * 100) / 100 : 0;
    C.history.push({ attempt: C.attempt, week: C.week, label: o.label, legs: o.legs, price: o.price, stake: o.stake, result, bankAfter, at: new Date().toISOString() });
    C.open = null;
    const peak = Math.max(CH_START, ...C.history.filter((x) => x.attempt === C.attempt).map((x) => x.bankAfter || 0));
    if (won) { C.bank = bankAfter; if (C.week >= CH_WEEKS) { C.done = 'won'; C.attempts = [...(C.attempts || []), { n: C.attempt, startedAt: C.startedAt, lastWeek: C.week, peak, result: 'won' }]; } else C.week += 1; }
    else { C.done = 'lost'; C.attempts = [...(C.attempts || []), { n: C.attempt, startedAt: C.startedAt, lastWeek: C.week, peak, result: 'lost' }]; }
    C.history = C.history.slice(-200);
    saveChal(C);
  }
  // Settle the open challenge bet from Kalshi's results when every leg is final.
  function chalAuto() {
    if (!owner || !db || !chal?.open) return;
    const rs = chal.open.legs.map((l) => { const r = results[l.ticker]; return !r ? null : r === 'void' ? 'void' : r === l.side ? 'won' : 'lost'; });
    if (rs.includes('lost')) chalSettle('lost'); else if (rs.every((r) => r === 'won')) chalSettle('won'); else if (rs.every((r) => r === 'void')) chalSettle('void');
  }

  // ---------- my bets ----------
  async function logBet(b, after) {
    if (!db) return;
    const body = JSON.parse(JSON.stringify({ ...b, result: 'pending', profit: 0, createdAt: new Date().toISOString(), settledAt: null, auto: false }, (k, v) => (v === undefined ? null : v)));
    try { await db.collection('bets').doc().set(body); toast('Logged. Find it under My bets.'); after && after(); if (tab === 'combo') renderCombo(); }
    catch (e) { toast(e?.code === 'quota_exceeded' ? 'Storage is full. Delete some old bets first.' : 'Couldn’t save that bet. Try again.'); }
  }
  const betProfit = (b, result) => result === 'won' ? Math.round(((b.contracts || Math.floor(b.amount / b.price)) - b.amount) * 100) / 100 : result === 'lost' ? -b.amount : 0;
  async function autoGrade() {
    if (!db || !owner) return;
    for (const b of bets) {
      if (b.result !== 'pending' || writing.has(b.id) || !(b.legs || []).every((l) => l.ticker)) continue;
      const rs = b.legs.map((l) => { const r = results[l.ticker]; return !r ? null : r === 'void' ? 'void' : r === l.side ? 'won' : 'lost'; });
      let result = null;
      if (rs.includes('lost')) result = 'lost'; else if (rs.every(Boolean)) result = rs.every((r) => r === 'void') ? 'void' : 'won';
      if (!result) continue;
      writing.add(b.id);
      try { await db.doc('bets/' + b.id).update({ result, profit: betProfit(b, result), settledAt: new Date().toISOString(), auto: true }); } catch {}
      writing.delete(b.id);
    }
  }
  async function setResult(id, result) { const b = bets.find((x) => x.id === id); if (!b) return; try { await db.doc('bets/' + id).update({ result, profit: result === 'pending' ? 0 : betProfit(b, result), settledAt: result === 'pending' ? null : new Date().toISOString(), auto: false }); } catch { toast('Couldn’t save that. Try again.'); } }
  async function saveBankroll(v) { settings.bankroll = v; if (db) try { await db.doc('settings/main').set({ bankroll: v }); } catch {} }
  function acctHTML() {
    if (!acct) return `<div class="card"><h3>Your Kalshi account</h3><p class="hint">Not synced yet. Once your read-only Kalshi key works, your balance, open bets and results show up here on their own, a few times a day.</p></div>`;
    const A = acct, T = A.titles || {};
    const nameOf = (t, side) => { const m = T[t] || {}; const base = m.title || t; const sub = side === 'no' ? m.no || '' : m.yes || ''; return sub && !base.includes(sub) ? `${base} — ${sub}` : base; };
    const sets = A.settlements || [];
    const pnl = (s) => (s.revenue || 0) - (s.cost || 0) - (s.fees || 0);
    const up = sets.filter((s) => pnl(s) > 0.005).length, down = sets.filter((s) => pnl(s) < -0.005).length;
    const total = sets.reduce((a, s) => a + pnl(s), 0);
    const open = (A.positions || []).map((p) => { const side = p.position > 0 ? 'yes' : 'no', n = Math.abs(p.position), m = T[p.ticker] || {}; const bid = side === 'yes' ? m.yesBid : m.noBid; return { ...p, side, n, value: bid != null ? n * bid : null }; });
    let h = `<div class="card"><div class="row" style="justify-content:space-between"><h3>Your Kalshi account</h3><span class="hint">Synced ${esc(new Date(A.at).toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' }))}</span></div>
      <div class="tiles">
        <div class="tile"><span class="k">Cash</span><span class="v num">${A.cash != null ? money(A.cash) : '—'}</span><span class="e">Ready to bet</span></div>
        <div class="tile"><span class="k">Open bets worth</span><span class="v num">${A.portfolio != null ? money(A.portfolio) : '—'}</span><span class="e">${open.length} open position${open.length === 1 ? '' : 's'}</span></div>
        <div class="tile"><span class="k">Settled bets</span><span class="v num">${up}–${down}</span><span class="e">${up + down ? pct(up / (up + down)) + ' came out ahead' : 'none yet'}</span></div>
        <div class="tile"><span class="k">Up or down (settled)</span><span class="v num ${total > 0 ? 'pos' : total < 0 ? 'neg' : ''}">${money(total, true)}</span><span class="e">After Kalshi's fees</span></div>
      </div>`;
    if (open.length) h += `<h3 style="margin-top:6px">Open bets</h3>${open.map((p) => `<div class="bet"><div class="bet-top"><div class="n"><span class="pill pending">${p.side}</span> <b>${esc(nameOf(p.ticker, p.side))}</b><div class="s">${p.n} contract${p.n === 1 ? '' : 's'}${p.exposure != null ? ` · cost ${money(p.exposure)}` : ''} · pays ${money(p.n)} if it wins</div></div><div class="amt"><div class="p num">${p.value != null ? money(p.value) : '—'}</div><div class="s">worth now</div></div></div></div>`).join('')}`;
    if (sets.length) h += `<details><summary>Settled bets (${sets.length})</summary>${sets.slice(0, 80).map((s) => { const side = (s.yes || 0) >= (s.no || 0) ? 'yes' : 'no', v = pnl(s); return `<div class="bet"><div class="bet-top"><div class="n"><span class="pill ${v > 0.005 ? 'won' : v < -0.005 ? 'lost' : 'void'}">${v > 0.005 ? 'won' : v < -0.005 ? 'lost' : 'even'}</span> <b>${esc(nameOf(s.ticker, side))}</b><div class="s">${esc(s.at ? new Date(s.at).toLocaleDateString() : '')} · cost ${money(s.cost || 0)}</div></div><div class="amt"><div class="p num ${v > 0 ? 'pos' : v < 0 ? 'neg' : ''}">${money(v, true)}</div></div></div></div>`; }).join('')}</details>`;
    h += `<p class="hint">Straight from your Kalshi account using your read-only key. The tool can see your bets but can never place, change or cancel one.</p></div>`;
    return h;
  }
  function renderMine() {
    const el = $('p-mine');
    let html = `<div style="display:grid;gap:6px"><h2>My bets</h2><p class="lede">Bets you log land here and are marked won or lost on their own once Kalshi settles them.</p></div>`;
    if (!db) { html += `<div class="card empty"><strong>${dbState === 'loading' ? 'Loading…' : 'Your bets can’t load in this view'}</strong></div>`; el.innerHTML = html; return; }
    html += acctHTML();
    const settled = bets.filter((b) => b.result && b.result !== 'pending'), pending = bets.filter((b) => !b.result || b.result === 'pending');
    const W = settled.filter((b) => b.result === 'won').length, L = settled.filter((b) => b.result === 'lost').length;
    const profit = settled.reduce((a, b) => a + (b.profit || 0), 0), spent = settled.filter((b) => b.result !== 'void' && b.result !== 'push').reduce((a, b) => a + (b.amount || b.stake || 0), 0);
    const bigWin = Math.max(0, ...settled.filter((b) => b.profit > 0).map((b) => b.profit)), avgWin = W ? settled.filter((b) => b.result === 'won').reduce((a, b) => a + b.profit, 0) / W : 0, avgLoss = L ? -settled.filter((b) => b.result === 'lost').reduce((a, b) => a + b.profit, 0) / L : 0;
    if (bets.length) html += `<div class="tiles">
      <div class="tile"><span class="k">Up or down</span><span class="v num ${profit > 0 ? 'pos' : profit < 0 ? 'neg' : ''}">${money(profit, true)}</span><span class="e">${spent ? `${profit >= 0 ? '+' : '−'}${pct(Math.abs(profit / spent), 1)} on ${money(spent)} bet` : 'shows once bets settle'}</span></div>
      <div class="tile"><span class="k">Won – lost</span><span class="v num">${W}–${L}</span><span class="e">${W + L ? pct(W / (W + L)) + ' won' : '—'}</span></div>
      <div class="tile"><span class="k">Win big, lose small?</span><span class="v num">${avgLoss ? (avgWin / avgLoss).toFixed(1) + 'x' : '—'}</span><span class="e">${W && L ? `Average win ${money(avgWin)} vs average loss ${money(avgLoss)}` : 'Shows after a win and a loss'}</span></div>
      <div class="tile"><span class="k">Waiting</span><span class="v num">${pending.length}</span><span class="e">${money(pending.reduce((a, b) => a + (b.amount || b.stake || 0), 0))} riding</span></div>
    </div>`;
    else html += `<div class="card empty"><strong>No bets logged yet</strong><span>Tap any price on Picks or Games, then “Log this bet” after you buy it in Kalshi.</span></div>`;
    if (pending.length) html += `<div class="card"><h3>Waiting on results</h3>${pending.map(betRow).join('')}</div>`;
    if (settled.length) html += `<div class="card"><h3>Finished</h3>${settled.slice(0, 100).map(betRow).join('')}</div>`;
    html += `<div class="card"><label class="f">Your betting money<input class="in num" id="bk" inputmode="decimal" value="${settings.bankroll ?? ''}" placeholder="e.g. 500"><span class="hint">Used to suggest how much to put on each bet: never more than 3% on one bet. Pick an amount you could lose without it hurting.</span></label></div>`;
    html += `<form class="card" id="manual"><h3>Log a bet by hand</h3><div class="fields"><label class="f">What did you buy?<input class="in" id="mn-l" placeholder="e.g. Lakers to win"></label><label class="f">Price (¢)<input class="in num" id="mn-p" inputmode="decimal" placeholder="45"></label><label class="f">Amount spent ($)<input class="in num" id="mn-a" inputmode="decimal" placeholder="20"></label></div><div class="row"><button class="btn" type="submit">Log it</button></div><p class="hint">Bets logged by hand need you to mark them won or lost.</p></form>`;
    el.innerHTML = html;
    el.querySelectorAll('[data-res]').forEach((b) => b.addEventListener('click', () => setResult(b.dataset.id, b.dataset.res)));
    el.querySelectorAll('[data-del]').forEach((b) => b.addEventListener('click', async () => { if (confirmDel === b.dataset.del) { confirmDel = null; try { await db.doc('bets/' + b.dataset.del).delete(); toast('Deleted'); } catch { toast('Couldn’t delete that.'); } } else { confirmDel = b.dataset.del; renderMine(); } }));
    $('bk').addEventListener('change', (e) => { const v = Number(String(e.target.value).replace(/[$,]/g, '')); saveBankroll(v > 0 ? v : null); toast('Saved'); });
    $('manual').addEventListener('submit', (e) => { e.preventDefault(); const l = $('mn-l').value.trim(), p = Number($('mn-p').value) / 100, a = Number($('mn-a').value); if (!l || !(p > 0 && p < 1) || !(a > 0)) { toast('Fill in what you bought, the price in cents and the amount'); return; } logBet({ kind: 'single', price: p, amount: a, contracts: Math.floor(a / p), legs: [{ label: l }], fair: null }); });
  }
  function betRow(b) {
    const first = b.legs?.[0] || {};
    const title = b.kind === 'combo' ? `${b.legs.length}-leg combo` : first.label || 'Bet';
    const amount = b.amount ?? b.stake ?? 0, contracts = b.contracts ?? (b.price ? Math.floor(amount / b.price) : 0);
    const st = b.result || 'pending';
    const amt = st === 'pending' ? `<div class="p num">${money(amount)}</div><div class="s">pays ${money(contracts)}</div>` : `<div class="p num ${b.profit > 0 ? 'pos' : b.profit < 0 ? 'neg' : ''}">${money(b.profit || 0, true)}</div><div class="s">${money(amount)} bet</div>`;
    return `<div class="bet"><div class="bet-top"><div class="n"><span class="pill ${st}">${st === 'void' || st === 'push' ? 'refund' : st}</span> <b>${esc(title)}</b> <span class="num">${b.price ? cents(b.price) : ''}</span><div class="s">${esc([first.gameLabel, first.start ? whenOf(first.start) : ''].filter(Boolean).join(' · '))}${b.auto ? ' · graded by Kalshi' : ''}</div></div><div class="amt">${amt}</div></div>
      ${b.kind === 'combo' ? `<div class="sublegs">${b.legs.map((l) => `<span>${esc(l.label)} · ${esc(l.gameLabel || '')}</span>`).join('')}</div>` : ''}
      ${st === 'pending' ? `<div class="row"><button class="btn small good" data-res="won" data-id="${b.id}">Won</button><button class="btn small bad" data-res="lost" data-id="${b.id}">Lost</button><button class="btn small pushc" data-res="void" data-id="${b.id}">Refunded</button><button class="btn small ${confirmDel === b.id ? 'danger' : ''}" data-del="${b.id}">${confirmDel === b.id ? 'Tap again to delete' : 'Delete'}</button></div>` : `<div class="row"><button class="btn small" data-res="pending" data-id="${b.id}">Undo result</button></div>`}</div>`;
  }

  // ---------- shell ----------
  function renderFresh() {
    const u = index?.updatedAt;
    if (LIVE && liveStamp) { $('fresh').textContent = `Live Kalshi prices · checked ${new Date(liveStamp).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`; return; }
    $('fresh').textContent = u ? `Prices from ${new Date(u).toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' })} · refresh ~8 AM, 1 PM, 4 PM` : dbState === 'off' ? 'Not connected' : 'Loading…';
  }
  function render() {
    renderFresh(); updateCount();
    ({ picks: renderPicks, parlays: renderParlaysTab, games: renderGames, combo: renderCombo, record: renderRecord, chal: renderChal, mine: renderMine })[tab]();
    if (sheet) renderSheet(); else if (pview) renderPlayer();
  }
  function setTab(t) {
    tab = t; store.set('tab', t); confirmDel = null;
    document.querySelectorAll('.tab').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === t)));
    document.querySelectorAll('[role="tabpanel"]').forEach((p) => (p.hidden = p.id !== 'p-' + t));
    render(); window.scrollTo({ top: 0 });
  }
  document.querySelector('.tabs').addEventListener('click', (e) => { const b = e.target.closest('.tab'); if (b) setTab(b.dataset.tab); });
  document.addEventListener('click', (e) => {
    const t = e.target;
    const c = t.closest('[data-close]'); if (c) { closeSheet(); return; }
    const sd = t.closest('[data-side]'); if (sd) { sheet.key = sd.dataset.side; renderSheet(); return; }
    const pl = t.closest('[data-player]'); if (pl) { const v = pl.dataset.player, i = v.indexOf('|'); openPlayer(v.slice(0, i), v.slice(i + 1)); return; }
    const al = t.closest('[data-addleg]'); if (al) {
      const x = mkt[al.dataset.addleg]; if (!x) return;
      const i = combo.findIndex((l) => l.ticker === x.ticker && l.side === x.side);
      if (i >= 0) { combo.splice(i, 1); comboPrice = ''; store.set('combo', combo); updateCount(); toast('Removed from your parlay'); } else addCombo(x);
      if (tab === 'games') renderGames(); else renderPicks(); return;
    }
    const sh = t.closest('[data-sheet]'); if (sh) { openSheet(sh.dataset.sheet); return; }
    const og = t.closest('[data-opengame]'); if (og) { closeSheet(); openGame = og.dataset.opengame; showAll = false; setTab('games'); return; }
    const go = t.closest('[data-go]'); if (go) { setTab(go.dataset.go); return; }
    const cp = t.closest('[data-chplace]'); if (cp) { chalPlace(Number(cp.dataset.chplace)); return; }
    const cr = t.closest('[data-chres]'); if (cr) { chalSettle(cr.dataset.chres); return; }
    const cz = t.closest('[data-chreset]'); if (cz) { const C = chal || chFresh(); saveChal(chFresh((C.attempt || 1) + 1, C.attempts || [])); return; }
    const tr = t.closest('[data-toprange]'); if (tr) { topRange = tr.dataset.toprange; store.set('topRange', topRange); renderPicks(); return; }
    const tm = t.closest('[data-topmode]'); if (tm) { topMode = tm.dataset.topmode; store.set('topMode', topMode); renderPicks(); return; }
    const cat = t.closest('[data-cat]'); if (cat) { pickCat = cat.dataset.cat; store.set('pickCat', pickCat); renderPicks(); return; }
    const sp = t.closest('[data-sport]'); if (sp) { sport = sp.dataset.sport; store.set('sport', sport); render(); return; }
    const sl = t.closest('[data-slot]'); if (sl) { slot = sl.dataset.slot; store.set('slot', slot); render(); return; }
    const lgN = t.closest('[data-legs]'); if (lgN) { legsN = lgN.dataset.legs === 'moon' ? 'moon' : Number(lgN.dataset.legs); store.set('legsN', legsN); renderPicks(); return; }
    const gop = t.closest('[data-genopt]'); if (gop) { const [k, v] = gop.dataset.genopt.split(':'); gen[k] = (k === 'n' && v !== 'any') || k === 'min' ? Number(v) : v; store.set('gen', gen); genLast = null; renderParlaysTab(); return; }
    const ib = t.closest('[data-ibet]'); if (ib) { toggleMine(JSON.parse(ib.dataset.ibet), ib.dataset.ibetTitle); render(); return; }
    const pv = t.closest('[data-pview]'); if (pv) { parlaysView = pv.dataset.pview; store.set('parlaysView', parlaysView); if (tab !== 'parlays') setTab('parlays'); else renderParlaysTab(); window.scrollTo({ top: 0 }); return; }
    const plc = t.closest('[data-plist]'); if (plc) { pickList = plc.dataset.plist; store.set('pickList', pickList); renderPicks(); return; }
    const gb = t.closest('[data-gen]'); if (gb) { generateParlay().then(() => { renderParlaysTab(); const card = document.querySelector('#p-parlays .pick'); if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' }); }); return; }
    const hf = t.closest('[data-histf]'); if (hf) { store.set('histF', hf.dataset.histf); renderRecord(); return; }
    const rv = t.closest('[data-rview]'); if (rv) { recordView = rv.dataset.rview; store.set('recordView', recordView); renderRecord(); return; }
    const pf = t.closest('[data-parf]'); if (pf) { store.set('parF', pf.dataset.parf); renderRecord(); return; }
    const rr = t.closest('[data-rrange]'); if (rr) { hitRange = rr.dataset.rrange; store.set('hitRange', hitRange); renderRecord(); return; }
    const rs = t.closest('[data-rsrc]'); if (rs) { hitSrc = rs.dataset.rsrc; store.set('hitSrc', hitSrc); renderRecord(); return; }
    const pm = t.closest('[data-pmode]'); if (pm) { parlayMode = pm.dataset.pmode; store.set('parlayMode', parlayMode); renderPicks(); return; }
    const gm = t.closest('[data-game]'); if (gm) { openGame = gm.dataset.game; showAll = false; if (tab !== 'games') setTab('games'); else renderGames(); window.scrollTo({ top: 0 }); return; }
    if (t.closest('[data-back]')) { openGame = null; renderGames(); return; }
    const gs = t.closest('[data-gsort]'); if (gs) { gameSort = gs.dataset.gsort; showAll = false; renderGames(); return; }
    const gf = t.closest('[data-gfilter]'); if (gf) { gameFilter = gf.dataset.gfilter; showAll = false; renderGames(); return; }
    if (t.closest('[data-more]')) { showAll = true; renderGames(); return; }
    const lc = t.closest('[data-loadcombo]'); if (lc) { const keys = JSON.parse(lc.dataset.loadcombo); combo = keys.map((k) => mkt[k]).filter(Boolean).map(legOf); store.set('combo', combo); comboPrice = ''; setTab('combo'); return; }
  });
  document.addEventListener('input', (e) => { if (e.target.matches('[data-genname]')) { try { localStorage.setItem('genName', e.target.value); } catch {} return; } if (e.target.matches('[data-sq]')) { playerQ = e.target.value; const r = searchResults(); document.querySelectorAll('[data-sqr]').forEach((x) => (x.innerHTML = r)); document.querySelectorAll('[data-sq]').forEach((x) => { if (x !== e.target) x.value = playerQ; }); } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && (sheet || pview)) closeSheet(); });
  document.addEventListener('change', (e) => {
    if (e.target.dataset.toggle === 'college') { college = e.target.checked; store.set('college', college); if (!college && isCollege(sport)) { sport = 'all'; store.set('sport', sport); } render(); }
    if (e.target.dataset.toggle === 'props') { parlayProps = e.target.checked; store.set('parlayProps', parlayProps); if (tab === 'chal') renderChal(); else renderPicks(); }
  });
  const hash = (location.hash || '').slice(1); if (['picks', 'games', 'combo', 'record', 'chal', 'mine'].includes(hash)) tab = hash;
  setTab(tab);

  // ---------- data ----------
  // Buddy (shared) copy: the data ships as a file next to the page, so nobody needs to sign in.
  async function loadBundle() {
    try {
      const r = await fetch('data.json', { cache: 'no-store' });
      if (!r.ok) return null;
      return await r.json();
    } catch { return null; }
  }
  function applyBundle(B) {
    feed = B.feed || {}; index = feed.index || null; results = feed.results?.results || {};
    research = B.research || {}; weeklyDocs = B.weekly || {}; picklog = B.picklog || {}; genDocs = B.gen || {};
    rebuild(); if (sheet) { staleBehind = true; renderFresh(); } else render();
  }
  (async () => {
    const B = await loadBundle();
    if (B && B.feed) {
      dbState = 'on'; owner = false;
      $('sharedNote').textContent = `Picks rebuilt ${new Date(B.builtAt).toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' })}.${LIVE ? ' Prices refresh live from Kalshi while you look.' : ' Check the live price in Kalshi before you buy.'}`;
      $('sharedNote').hidden = false; $('t-mine').hidden = true;
      if (tab === 'mine') setTab('picks');
      applyBundle(B);
      let last = B.builtAt;
      setInterval(async () => { const N = await loadBundle(); if (N && N.builtAt !== last) { last = N.builtAt; applyBundle(N); } }, 10 * 60000);
      return;
    }
    let d = null;
    try { d = window.claude?.use ? await window.claude.use('db') : null; } catch { d = null; }
    if (!d) { dbState = 'off'; $('nodb').hidden = false; render(); return; }
    db = d; dbState = 'on';
    try { const u = await window.claude.use('user'); if (u) { userCap = u; owner = (await u.isOwner()) !== false; myId = await u.id(); } } catch {}
    if (!owner) {
      $('sharedNote').hidden = false; $('t-mine').hidden = true;
      if (tab === 'mine') setTab('picks');
    }
    let betsIn = false;
    const quiet = () => {};
    db.collection('feed').onSnapshot((snap) => {
      feed = {}; snap.docs.forEach((x) => { const v = x.data(); if (v) feed[x.id] = v; });
      index = feed.index || null; results = feed.results?.results || {};
      rebuild(); if (sheet) { staleBehind = true; renderFresh(); } else render();
      if (betsIn) autoGrade();
      chalAuto();
    }, quiet);
    db.collection('weekly').onSnapshot((snap) => { weeklyDocs = {}; snap.docs.forEach((x) => { const v = x.data(); if (v) weeklyDocs[x.id] = v; }); if (tab === 'picks') renderPicks(); }, quiet);
    db.collection('research').onSnapshot((snap) => { research = {}; snap.docs.forEach((x) => { const v = x.data(); if (v) research[x.id] = v; }); if (tab === 'picks' || tab === 'games') render(); }, quiet);
    db.collection('picklog').onSnapshot((snap) => { picklog = {}; snap.docs.forEach((x) => { const v = x.data(); if (v) picklog[x.id] = v; }); if (tab === 'record') renderRecord(); }, quiet);
    db.collection('gen').onSnapshot((snap) => { genDocs = {}; snap.docs.forEach((x) => { const v = x.data(); if (v) genDocs[x.id] = v; }); if (tab === 'record') renderRecord(); }, quiet);
    db.collection('bets').orderBy('createdAt', 'desc').limit(1000).onSnapshot((snap) => { bets = snap.docs.map((x) => ({ id: x.id, ...x.data() })); betsIn = true; if (tab === 'mine') renderMine(); autoGrade(); }, quiet);
    if (owner) db.doc('settings/account').onSnapshot((snap) => { acct = snap.exists ? snap.data() || null : null; if (tab === 'mine') renderMine(); }, quiet);
    db.doc('challenge/main').onSnapshot((snap) => { chal = snap.exists ? snap.data() || null : null; if (tab === 'chal') renderChal(); chalAuto(); }, quiet);
    db.doc('settings/main').onSnapshot((snap) => { const v = snap.exists ? snap.data()?.bankroll ?? null : null; if (v !== settings.bankroll) { settings.bankroll = v; if (tab === 'mine' || sheet) render(); } }, quiet);
    render();
  })();
})();
