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
