# Website Audit — Change Log

## 2026-10-14 — First audit run (AUDIT-ONLY)

- **Scope:** full codebase read + live site checks (headers, TLS, routes, robots, 404,
  JSON-LD presence, code greps) + public competitor/user-needs research.
- **Method:** read-only. No code edits, no builds, no tests run, no commits, no pushes,
  no deploys, no browser screenshots.
- **Changes made:** NONE (audit-only by design).
- **Files created (this run):** baseline.md, bugs.md, security.md, competitors.md,
  user-needs.md, roadmap.md, change-log.md (this file) — all under `docs/website-audit/`.
- **Key results:**
  - 0 verified bugs; 5 hypotheses logged for reproduction (bugs.md H1–H5).
  - Security: HSTS present, TLS chain valid, no secrets in tree, no eval/innerHTML;
    missing CSP / clickjacking / hardening headers (S1–S3, queued); npm audit blocked
    by egress policy (S6, unverified); git-history scan not run (S7, queued).
  - All 23 sitemap URLs → 200; unknown URL → real 404.
  - Competitor feature matrix + user-needs (category-level + intent-derived) written.
  - Roadmap: 31 items (R1–R31) prioritized P0–P4.
- **Noted during run:** sprint Batch 2 (GEO/AEO) landed mid-audit (`09499e7`); tree
  clean except untracked `docs/seo/*.md` from the §10 docs agent. No conflicts.
- **Handoff:** fix queue (roadmap.md R1–R17) goes to the weekly run / next sprint
  AFTER Batch 2 lands. P3 features (R18–R23) need Sam's build decision. P4 (R24–R31)
  is Sam-side.

## Rollback reference

For a static site, recovery = `git revert <commit>` + push (Vercel auto-deploys) or
`git checkout <last-good-commit>` on the working copy. No database, no migrations, no
state to restore. Verify live with the daily health check after any revert.

## Future entries

Each fix run appends: date, change, files touched, test evidence (build/lint/typecheck/
tests + live verification), and any regression found. "Fixed" is claimed only with
evidence; hypotheses stay open until reproduced or closed with evidence.

## 2026-10-19 — Weekly run (Day 6): CGPA conversion table

- **Change:** Added a "Quick conversion table" section to the CGPA CBSE ×9.5 guide
  (`/guides/cgpa-to-percentage-cbse-9-5-rule/`): 11 rows, CGPA 5.0–10.0 in 0.5 steps
  → percentage computed as CGPA × 9.5 (47.50%–95.00%), all values our own computed
  numbers, each row labeled estimated. Uses the EMI guide's established
  `overflow-x-auto` bordered-table pattern; intro links the CGPA calculator. Closes
  GAP-CGPA-2 / competitor Insight 5 action. Files: `src/lib/guides.tsx` (+1 section).
- **Verification:** `tsc --noEmit` ✓ · `eslint .` ✓ · vitest 33/33 ✓ · `next build` ✓
  (all green, no revert needed). Table + all 11 values confirmed in built HTML
  (`out/guides/cgpa-to-percentage-cbse-9-5-rule/index.html`).
- **Live:** verified 2026-10-19 ~10:50 IST — curl on
  `https://tulyrotools.vercel.app/guides/cgpa-to-percentage-cbse-9-5-rule/` after Vercel
  auto-deploy returns HTTP 200 with the "Quick conversion table" heading and table
  values (52.25%, 95.00% spot-checked).
- **Audit findings this run (read-only):** calc spot-checks ✓ (EMI 8,884.88 /
  BMI 22.9 / Age 26y 9m 18d); 29/29 sitemap URLs → 200; JSON-LD 4/4 valid (H1
  closed); 0 `<img>` tags (H4 closed); secrets clean incl. git history (S7
  closed); headers S1–S3 fixed & live (`ff34254`); npm audit still 403-blocked
  (S6 open); H3/H5 remain open hypotheses.

## 2026-10-26 — Weekly run (Day 13): EMI amortisation table in guide

- **Change:** Added a "Month by month: where each ₹8,884.88 goes" section to the EMI
  guide (`/guides/how-to-calculate-emi/`): 12-row amortisation schedule for the
  guide's own worked example (₹1,00,000 @ 12%, 12 months). All figures recomputed
  independently — interest ₹6,618.55, total paid ₹1,06,618.55, final balance ₹0.00 —
  matching the guide's existing totals. Files: `src/lib/guides.tsx` (+1 section, 42 lines).
  Closes Argon audit gap "EMI tool lacks amortization table" in content form.
- **Verification:** `tsc --noEmit` ✓ · `eslint .` ✓ (1 apostrophe error fixed mid-run) ·
  vitest 33/33 ✓ · `next build` ✓ (all green, no revert needed). Table + values
  confirmed in built HTML (`out/guides/how-to-calculate-emi/index.html`).
- **Live:** commit `f1f8c5a`, verified 2026-10-26 ~10:45 IST — curl on
  `https://tulyro.online/guides/how-to-calculate-emi/` returns HTTP 200 with the new
  heading and table values (₹92,115.12 spot-checked).
- **Audit findings this run (read-only):** calc spot-checks ✓ (EMI 8,884.88 / BMI 22.9 /
  Age 9,795 days); 10/10 sampled routes → 200; sitemap now 36 URLs; 308 redirect from
  old vercel.app host ✓; secrets clean; headers S1–S3 live; npm audit still 403-blocked
  (S6 open); NEW Low finding: live HSTS lacks includeSubDomains/preload, contradicting
  security.md's table — next-run fix candidate. H3/H5 remain open hypotheses.

## 2026-11-01 — Monthly run (docs-only, no code edits, no commits, no deploys)

- **Scope:** read all 12 docs; live curl verification (homepage 200, 71 sitemap URLs,
  enforcing CSP, full HSTS+preload, security.txt 200); GSC state from Sam's
  27 Oct paste via memory (0 clicks / 4 impressions / pos 78.5; no newer GSC data).
  No builds, no tests run, no code touched — per this run's docs-only constraint.
- **Findings (measured):** domain tulyro.online live with 308 from vercel.app;
  enforcing CSP + full HSTS resolve prior findings; 16 GSC indexing requests
  confirmed 28–30 Oct (requested ≠ indexed); GA4 decision + E-E-A-T bylines resolved;
  Bing verified 27 Oct; 2 backlinks in motion; 0 verified bugs; S6 + R30 + H3 + H5
  still open; H6 new (CSP-enforcement smoke test missing).
- **Files written (this run):** `docs/seo/monthly-performance.md` (created —
  October→November monthly entry); `docs/seo/keyword-map.md` (20 new tool rows,
  re-prioritized opportunities, cannibalization check); `docs/seo/content-roadmap.md`
  (Batch 2 marked 6-of-8 shipped, November Batch 4 roadmap); `docs/website-audit/roadmap.md`
  (status sweep: 13 items done/resolved, 8 still open); `docs/website-audit/bugs.md`
  (H6 hypothesis + doc-drift pattern note).

## 2026-11-09 — Weekly run (Day 27, full audit + fix)

- **Change:** new mortgage affordability guide (R8) — see implementation-log.md
  for full detail. Commit `b6e75fd`.
- **Verification:** `tsc --noEmit` ✓ · `eslint .` ✓ (0 errors) · vitest 117/117
  ✓ · `next build` ✓ (all green, no revert needed). Built HTML verified (title
  + all key figures); guides index + mortgage tool page link verified in build
  output.
- **Live:** commit `b6e75fd`, verified 2026-11-09 ~10:49 IST — curl on
  `https://tulyro.online/guides/how-much-house-can-you-afford/` returns HTTP
  200 with the title + figures; live sitemap 88 URLs.
- **Audit findings this run (read-only):** calc spot-checks ✓ (EMI 8,884.88 /
  BMI 22.9 / Age 9,809 days); 11/11 sampled routes → 200; sitemap 88 URLs; 308
  redirect from old vercel.app host ✓; secrets clean; headers S1–S3 live +
  HSTS finding CLOSED; `npm audit` still 403-blocked (S6 open); NEW Info:
  `Access-Control-Allow-Origin: *` on homepage HTML (harmless, no action); NEW
  Low: doc sitemap counts stale (36/71 vs live 88). H3/H5/H6 remain open.
  Competitor re-sweep: affordability SERP top 5 noted (guide shipped in
  response); epoch-converter SERP top 6 noted (Tulyro below page 1; µs/ns
  support a future candidate).

## 2026-11-16 — Weekly run (post-campaign, full audit + H6 closure)

- **Change:** docs-only — H6 (CSP smoke test) closed; audit + weekly logs
  updated. No site-code change, no deploy. See implementation-log.md for
  the smoke-test method and results.
- **Verification:** `tsc --noEmit` ✓ · `eslint .` ✓ (0 errors, 9
  pre-existing warnings) · vitest 170/170 ✓ · `next build` ✓ (all green,
  no revert needed). Smoke test on fresh HEAD build: 8/8 page-viewport
  combos PASS (0 console errors, 0 failed requests, 0 overflow).
- **Live:** nothing to deploy. Live re-verified 2026-11-16 ~10:49 IST —
  homepage + 10 sampled routes HTTP 200; enforcing CSP + HSTS +
  X-Frame-Options: DENY live; sitemap 96 URLs.
- **Audit findings this run (read-only):** calc spot-checks ✓ (EMI 8,884.88 /
  BMI 22.9 / Age 26y; gratuity + fuel-cost formulas verified in source);
  11/11 sampled routes → 200; sitemap 96 (was 88); secrets clean; headers
  S1–S3 live; `npm audit` still 403-blocked (S6 open); ACAO:* Info
  re-verified as Vercel-side (control test vs example.com/google.com),
  harmless. H3/H5 remain open. Competitor re-sweep: BMI SERP top 5 noted
  (Tulyro BMI already at parity on healthy-range pattern; BMI Prime a
  future candidate). GSC data pending — no week-over-week comparison
  possible; last reported 14 Nov (779 imp / 5 clicks / pos 55.6 / CTR 0.6%,
  28d) cited as last-known only.

## 2026-11-23 — merge-pdf FAQ expansion + claim fix (weekly run)

- **Change:** merge-pdf FAQs 4 → 9 + 1 overclaim fixed ("bit-level
  fidelity" → accurate copyPages wording). All 5 new answers verified
  against `src/tools/pdf-tools/logic.ts` and `ToolPanel.tsx` (order,
  filename, selectable text, signatures, CDN-first-load). Commit
  5e4426d, pushed to main; Vercel auto-deploy.
- **Gates:** `tsc --noEmit` ✓, `eslint .` ✓ (0 errors, 9 pre-existing
  warnings), vitest 183/183 ✓, `next build` ✓. No revert needed.
- **Live:** merge-pdf page re-verified after deploy (see weekly entry).
- **Audit findings this run (read-only):** calc spot-checks ✓ (EMI
  8,884.88 / BMI 22.9 / Age 26y; EMI formula + BMI + Age logic verified
  in source); 9/9 sampled real routes → 200 on tulyro.online
  (bare /emi-calculator-style paths 404 — not real routes; canonical
  is /calculators/*); live sitemap 96 URLs; secrets clean; headers
  S1–S3 live (enforcing CSP, HSTS, XFO DENY, nosniff, Referrer-Policy,
  Permissions-Policy); `npm audit` still 403-blocked (S6 open);
  ACAO:* Info re-verified, harmless. H3/H5 remain open. Competitor
  re-sweep: attendance-calculator SERP top 4 (calcshala, proems,
  gyanpark, openeducat) all show formula + worked examples + FAQ +
  classes-needed tables — Tulyro at parity on core pattern, not in
  top 4 for the generic query. GSC data pending — no week-over-week
  comparison possible; last reported 14 Nov (779 imp / 5 clicks /
  pos 55.6 / CTR 0.6%, 28d) cited as last-known only.
