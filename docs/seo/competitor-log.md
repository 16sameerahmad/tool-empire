# Competitor Log — Tulyro

Routine: `competitor-tracking.md` §4–§5. One row per observed move, newest first.
Every number carries a label: `verified-public`, `modeled-estimate`, or `unknown`.
Public signals only — no scraping at scale, no private-data claims.

| Date | Competitor | Move observed | Source (verified-public) | Tulyro response (if any) | Status |
|---|---|---|---|---|---|
| 2026-11-09 | wisemoneylife.com / investormint.com / mortgagepal.co / capstag.com / ponderloop.com | Top 5 for "how much house can I afford 28/36 rule": 28/36 explainer + income tables + worked examples + DTI caps + conservative (25% take-home) alternatives | public SERP check, 2026-11-09 (verified-public) | Shipped our own affordability guide with independently computed numbers (commit b6e75fd) | done |
| 2026-11-09 | induwara.lk / thetoolskit.co / timecnv.com / at-use.com / edarabia.com | Top results for "epoch converter": multi-unit (s/ms/µs/ns) support, live clock, code samples, Year-2038 explainers | public SERP check, 2026-11-09 (verified-public) | none — our tool + guide already cover s/ms + 2038; µs/ns support is a future candidate | watching |
| 2026-10-19 | — | Baseline: this log created (first Monday sweep; no GSC data yet, so impression-driven routine steps skipped honestly) | — | — | — |
| 2026-10-19 | calculator.net | `/loan-calculator.html` page title is "Loan Calculator" (short title, ~30 KB HTML). No prior snapshot to diff — recorded as baseline | public page fetch, 2026-10-19 (verified-public) | none | baseline |
| 2026-10-19 | wordcounter.net | Homepage title "WordCounter - Count Words & Correct Writing"; 800+ visible words; zero `<table>` tags — the tool+blog flywheel (Insight 2) is visibly live | public page fetch, 2026-10-19 (verified-public) | none | baseline |
| 2026-10-14 | — | Baseline: `competitor-tracking.md` research snapshot created (see §2 competitor set, §3 insights) | — | — | — |
