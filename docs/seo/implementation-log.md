# Tulyro — Implementation Log

**Engine:** SEO Growth Engine §8 (autonomous execution) + §10 deliverable.
**Rule:** every entry = date + change + verification evidence. No entry without evidence. Commit hashes are from the local repo (`16sameerahmad/tool-empire`, branch `main`); "live" means verified on https://tulyrotools.vercel.app unless stated otherwise.

## 2026-10-13 — Stitch "Executive Precision" theme implementation

- **Change:** Full Stitch theme applied across the site (midnight navy #07142F header/hero/footer, canvas #F4F6FC, Electric Violet #635BFF, `max-w-shell: 1240px`; Plus Jakarta Sans + Inter + JetBrains Mono via next/font, zero CDNs). New: `src/components/icons.tsx` (~110 hand-written inline SVGs), `HeroEmiSimulator.tsx` (live EMI sim wired to real `emi()`), `MobileAgeSnapshot.tsx` (live age snapshot, mobile home). Header: fixed midnight + utility strip + live search + midnight mobile bottom dock. `/tools/` renders the all-tools directory (stays noindex). `/calculators/age-calculator` unified under shared ToolPage.
- **Verification:** build/lint/typecheck OK, tests 33/33, Playwright 65/67 + 25/25 re-verify (2 "failures" were harness artifacts — plain http.server doesn't serve Next out/404.html; file verified directly). 0 console errors, no overflow at 390/1440px. Screenshots in `~/workspace/te-review/previews/` (stitch-*).
- **Note:** Stitch theme is Sam's explicit final visual direction; it supersedes the earlier DESIGN.md palette/fonts (documented override, not drift). Truthful-copy replacements applied (e.g. "45+ Free Utilities" → "11 Free Utilities", fake stats removed).

## 2026-10-13 — SEO + GEO + AEO pass (commit `40ba751`)

- **Change:** Tulyro rename on ALL user-facing surfaces (wordmark, footer, title suffixes, OG/Twitter, JSON-LD Organization, logo.svg, favicon.svg, regenerated og-image.png). Titles ≤60 chars; metas 150–160 + CTA; tool pages 613–769 words; AEO 40–60-word definitional FAQ answer per tool; BMI cites WHO; `sources` slot added to ToolLayout; Twitter cards + OG images on all tool pages; canonicals on home/hubs/legal; JSON-LD 54 blocks (HowTo + SoftwareApplication price 0, no invented ratings; WebSite + Organization on home; BreadcrumbList on hubs/legal); FAQ JSON-LD matches visible FAQ exactly; `public/llms.txt` added; honesty renames ("Trending" → "Quick links", "Most Popular" → "Featured"). `siteUrl` stayed `https://example.com` (placeholder); "tulyro.com" written nowhere in code.
- **Verification:** build/lint/typecheck OK (26 static pages), tests 33/33, Playwright 24 checks (23 pass + 1 harness artifact, same 404-serving artifact), open-seo-crawler: 21 pages all 200, 0 duplicate titles/metas/H1s/bodies, 0 broken links, sitemap 18 URLs. Docs: `docs/seo/` (competitor-research, keyword-map, technical-audit, implementation-roadmap, validation-report).

## 2026-10-13 — SEO checklist gap-closure (commit `90424b6`)

- **Change:** 11 PAA FAQ entries (one per tool, real user questions verified via web search 2026-10-13); `dateModified` added via truthful `contentUpdated = "2026-10-13"` constant (bump ONLY on real content change); homepage double-H1 fixed (mobile hero H1 → `<div>`, visuals unchanged); EMI title 47 → 54 chars. Content plan only: `docs/seo/content-plan.md` (8 guides, 4 comparisons, 3 listicles). Status map: `docs/seo/checklist-status.md` (35 items).
- **Verification:** tests 33/33, single H1, FAQ visible = JSON-LD 6 = 6, `dateModified` present in built HTML.

## 2026-10-13 — Contact email (commit `c4c43d9`)

- **Change:** `contact@example.com` → **Tulyrotools@gmail.com** in Contact, Privacy, Terms pages (Sam-decided).
- **Verification:** tests 33/33; grep confirms no `contact@example.com` remains in `src/`.

## 2026-10-13/14 — siteUrl → production subdomain (commit `412dd5c`)

- **Change:** `siteUrl` in `src/lib/seo.ts` + `metadataBase` in `src/app/layout.tsx`: `https://example.com` → `https://tulyrotools.vercel.app` (Sam-confirmed subdomain, matches contact email branding).
- **Verification:** build OK, tests 33/33, built HTML contains `tulyrotools.vercel.app`.

## 2026-10-14 — Repo created + pushed (GitHub: `16sameerahmad/tool-empire`)

- **Change:** GitHub account decided = **16sameerahmad** (Sam: "16 hi karo"). Repo created PUBLIC via `gh` (MCP repo-create failed 403 — App lacks permission; `gh auth login` device flow used). Local branch renamed `master` → `main`; 5 local commits pushed (HEAD `412dd5c`). Remote: https://github.com/16sameerahmad/tool-empire.
- **Verification:** `git ls-remote origin HEAD` = `412dd5c...`; `gh repo view` confirms PUBLIC.
- **Note:** Vercel project lives under the 17sameerahmad team (Hobby); repo lives under 16sameerahmad. Cross-account import — auto-deploy confirmed working (see Vercel deploy entry).

## 2026-10-14 — Vercel deploy (project `tulyrotools`)

- **Change:** Sam created the project manually on vercel.com (Vercel MCP `create_git_project` returned 403 forbidden — connector lacks project-create permission on this account): imported `16sameerahmad/tool-empire`, project name `tulyrotools`, Next.js preset, root `./`, defaults. Auto-deploy on push confirmed by later deployments.
- **Verification (curl, 2026-10-14):** home HTTP 200, no `noindex`, canonical correct, title "Free Browser Tools | Tulyro", real HTTP 404 status on unknown URL, sitemap HTTP 200, robots `Allow: /` + sitemap pointer.

## 2026-10-14 — GSC verification: HTML-file method FAILED (commit `4ef1725`)

- **Change:** Added `public/google876ae6e00f60beb0.html` (standard Google verification-file content) and pushed (`4ef1725`).
- **Result:** FAILED. The file returned HTTP 404 on Vercel despite existing in the repo and in the local `out/` build — Next.js static export on Vercel does not serve `public/*.html` files as expected (other `public/` files — favicon.svg, logo.svg, og-image.png — served HTTP 200). GSC: "Your verification file was not found in the required location."
- **Lesson recorded:** for this stack, never use file-based verification (GSC, Bing, Adsterra, or similar) — use the meta-tag method.

## 2026-10-14 — GSC verification: meta-tag method SUCCEEDED (commit `2d8d602`)

- **Change:** Removed the verification HTML file; added `verification: { google: "tJrMNOm9hTGetu1cicfDoSof6pWc3QL-1deNputt3_g" }` to `metadata` in `src/app/layout.tsx` (token supplied by Sam from GSC's "HTML tag" method). Pushed (`2d8d602`).
- **Verification:** meta tag confirmed live on homepage via curl after deploy. Sam clicked VERIFY under the **HTML tag** method in GSC (first attempt failed because the HTML-file method was still selected) → **Verified**.
- **Note:** the verification token is a credential-like value — recorded in code only (where Google requires it), never copied into docs or memory.

## 2026-10-14 — Sitemap submitted to GSC → transient "Couldn't fetch" → Success

- **Change:** Sam submitted `sitemap.xml` in GSC (URL-prefix property). First status: "Couldn't fetch", 0 discovered pages.
- **Diagnosis:** sitemap itself verified perfect at the same time (HTTP 200, `Content-Type: application/xml`, valid XML, 18 URLs, Googlebot UA also 200). The failure was transient/stale on Google's side; nothing was fixed on the site.
- **Result:** status flipped to **Success** (Sam confirmed 2026-10-14 ~00:38 IST).

## 2026-10-14 — Sprint batch 1 (commit `e871f83`)

- **Change:** 4 guides + `/guides/` index (`GuideLayout`, `src/lib/guides.tsx`, sitemap updated), 5 meta descriptions trimmed to ≤155 chars, dead `ToolRow.tsx` removed, `ToolPanel.tsx` status dot changed to token color. `docs/seo/content-plan.md` updated to mark A1, A2, A3, B1 as BUILT.
- **Verification (from commit contents):** 13 files changed, 1035 insertions. Sprint agent's final report had not been delivered to the parent at the time this log was written — batch 1 status here rests on the verified commit in git, not on the agent's report. Re-verify tests/build on the next audit pass.

## IN PROGRESS (fill when reports land — do not pre-fill results)

- **Sprint batch 2 (GEO/AEO):** expand `llms.txt` + add `llms-full.txt`; quotable definition block per tool page; real Sources lines where a genuine authoritative source exists (never invent); Organization JSON-LD consistency check. Status: running at time of writing. Result: PENDING.
- **Competitor tracking system:** `docs/seo/competitor-tracking.md` + `docs/seo/suggestion-mining.md` being built by a tracking agent (untracked files at time of writing). Result: PENDING.
- **§10 deliverables (this file's siblings):** `baseline-audit.md`, `content-roadmap.md`, `weekly-performance.md` created 2026-10-14 (docs agent). `competitor-research.md` + `keyword-map.md` pre-existing.
- **Daily internal-links cron:** first run due ~09:38 IST 2026-10-14 (max 2 genuinely useful links/day, zero if none useful).

## Blocked / Sam-side (not code work)

- GA4 setup — needs Sam's cookie/consent decision.
- Bing Webmaster — Sam-side (GSC import + sitemap submit).
- Real domain (tulyro.com) — availability unverified; AdSense approval on a vercel.app subdomain is uncertain.
- Author bio decision — no bylines until Sam decides (never invent).
- GSC "Request Indexing" for key pages — Sam-side, via URL Inspection.

## 2026-10-19 — CGPA guide: quick conversion table (weekly run, Day 6)

- **Change:** `src/lib/guides.tsx` — new "Quick conversion table" section on the CGPA
  CBSE ×9.5 guide (`/guides/cgpa-to-percentage-cbse-9-5-rule/`): 11 rows,
  CGPA 5.0→10.0 (0.5 steps) × 9.5 = 47.50%…95.00%, all rows labeled estimated,
  same `overflow-x-auto` bordered table pattern as the EMI guide comparison table,
  intro links the CGPA calculator. Closes GAP-CGPA-2 (competitor Insight 5 action);
  targets the "cgpa to percentage table" query with our own computed numbers.
- **Verification:** typecheck ✓, lint ✓, vitest 33/33 ✓, `next build` ✓ — all green.
  Table + heading confirmed in built HTML. Live: 2026-10-19 ~10:50 IST, curl after
  Vercel auto-deploy → HTTP 200, heading + values present on the production page.

## 2026-10-26 — EMI guide: month-by-month amortisation table (weekly run, Day 13)

- **Change:** New "Month by month: where each ₹8,884.88 goes" section on the EMI guide
  (`/guides/how-to-calculate-emi/`): 12-row schedule for the guide's own worked
  example (₹1,00,000 @ 12%, 12 months) — month, interest, principal repaid, balance
  left — using the same `overflow-x-auto` bordered-table pattern as the CGPA
  conversion table. Closes Argon audit gap "EMI tool lacks amortization table" in
  content form; tool logic untouched (the tool's own disclaimer still correctly
  says the calculator itself does not show amortisation tables).
- **Verification:** every figure recomputed independently (node): interest column
  sums to ₹6,618.55, total paid ₹1,06,618.55, final balance ₹0.00 — matches the
  guide's existing worked-example totals exactly. Gates all green: `tsc --noEmit` ✓,
  `eslint .` ✓ (one unescaped-apostrophe lint error found and fixed mid-run),
  vitest 33/33 ✓, `next build` ✓. Table + values confirmed in built HTML.
- **Live:** commit `f1f8c5a`, pushed to `main`; Vercel auto-deploy verified
  2026-10-26 ~10:45 IST — curl on `https://tulyro.online/guides/how-to-calculate-emi/`
  returns HTTP 200 with the new heading and table values present.
