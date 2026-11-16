# Website Audit — Bugs

**Audit date:** 2026-10-14 · **Method:** read-only — live curl checks + code reading. No builds,
no tests run, no browser screenshots (audit-only constraint).
**Severity scale:** Critical (site/tool broken) · High (wrong output or major UX break) ·
Medium (degraded UX or edge-case wrongness) · Low (cosmetic / maintainability).

## VERIFIED bugs: NONE

No verified functional bug was found in this pass:

- **All 23 sitemap URLs return HTTP 200** (curl, 2026-10-14).
- **Unknown URL returns a real 404** (after the expected trailing-slash 308 redirect).
- **Copy buttons** in ToolPanel have try/catch with user-visible fallback notices
  ("Could not copy. Select the text and press Ctrl+C…") — failure is handled, not swallowed.
- **Copy buttons are disabled when there is nothing valid to copy** (`disabled={!valid}`,
  `disabled={!text}`) — no empty-copy path found.
- **Validation errors render in `role="alert"` boxes** (ErrorBox / error paragraphs).
- **No TODO/FIXME/HACK markers** in `src/`. **No `console.log`** in `src/`.
- **Overflow handling present:** `overflow-x-auto` on the wide table container,
  `break-words` on fancy-text output, `overflow-hidden` on progress bars.

## Hypotheses (NOT bugs until reproduced)

| # | Candidate | Evidence | Status | Severity if real |
|---|---|---|---|---|
| H1 | JSON-LD content may be stale/invalid on some pages | 1 script tag on EMI page; contents not parsed this pass | UNREPRODUCED — validate with a JSON-LD parser in the weekly run | Medium (SEO) |
| H2 | Mobile overflow on long tool outputs (e.g. Fancy Text, Invoice) | Code shows break-words / overflow-x-auto, but no screenshot proof | UNREPRODUCED — needs real-device/browser screenshot check | Medium |
| H3 | TTS may sound robotic / pick no voice on some browsers | Headless has no voices; Sam-side manual check still pending | UNREPRODUCED — needs real-browser check | Medium (UX) |
| H4 | `<img>` alt coverage | `alt=` count is 0; icons look like inline SVG components, so this is likely N/A | UNREPRODUCED — confirm no `<img>` tags exist | Low |
| H5 | ToolPanel.tsx at 1,361 lines may hide stale-output bugs on mode switches | Prior audit fixed one stale-output class (TTS onerror); pattern not re-audited | UNREPRODUCED — review state-reset paths in weekly run | Medium |

## Known open items (from prior passes, not bugs)

- **GPA mode BLOCKED** pending formula + source (docs decision — do not build).
- **CGPA ×9.5 labeled "estimated"** — intentional, correct.
- **Batch 2 (GEO/AEO) landed during this audit** (`09499e7`) — tree clean; no conflicts.
- **GA4 not implemented** — pending Sam's cookie/consent decision.
- **Author bio** — real name vs "Tulyro Team" pending Sam (never invent).

## Reproduction standard

A hypothesis becomes a VERIFIED bug only with: steps to reproduce + expected vs actual
behavior + evidence (curl output, screenshot, or failing test). Until then it stays in
the hypothesis table. The weekly run owns reproduction (browser screenshots + build/tests).

## 2026-10-19 — Weekly run entry (Day 6, read-only audit)

**Calculation spot-checks (recomputed, all match):**
- EMI(₹100,000, 12%, 12mo) = **8,884.88** — formula in `src/tools/emi/logic.ts` is the
  standard amortization formula; matches vitest `emi(100000, 12, 12)` ≈ 8884.8788.
- BMI(70kg, 175cm) = **22.9** ("Normal") — `bmi(70, 1.75).toFixed(1)` = 22.9; category
  bands correct.
- Age(2000-01-01 as of 2026-10-19) = **26y 9m 18d, 9,788 days lived** — faithful port of
  `ageCalc` matches independent python date math and the vitest suite.

**Routes/links:** all **29 sitemap URLs → HTTP 200** (live curl, 2026-10-19). Sitemap
grew from 23 to 29 URLs since 2026-10-14.

**Hypothesis updates:**
- H1 CLOSED — EMI page carries 4 JSON-LD blocks (HowTo, SoftwareApplication,
  BreadcrumbList, FAQPage); all parse as valid JSON and match current page content.
- H4 CLOSED as N/A — `0` `<img>` tags in `src/`; icons are inline SVG components.
- H2 partially addressed by code review: homepage hero decorative blur (`-right-24`)
  sits inside `section.relative.overflow-hidden` (no page-level horizontal overflow);
  tool tables use `overflow-x-auto`; new CGPA table reuses the same pattern. Still needs
  a real-device screenshot for full closure.
- H3 (TTS voice quality — Sam-side manual check) and H5 (ToolPanel state resets —
  tool-logic changes need a verified repro first) remain OPEN.

**New verified fixes landed since 2026-10-14:** security headers (S1–S3) fixed by
commit `ff34254`, verified live this run — see security.md.

## 2026-10-26 — Weekly run entry (Day 13, full audit + fix)

**Calculation spot-checks (recomputed, all match):**
- EMI(₹100,000, 12%, 12mo) = **8,884.88** — matches `src/tools/emi/logic.ts` and vitest.
- BMI(70kg, 175cm) = **22.9** ("Normal").
- Age(2000-01-01 as of 2026-10-26) = **9,795 days lived** (26y 9m 25d) — consistent with
  9,788 on 2026-10-19 + 7 days.

**Routes/links:** 10/10 sampled live URLs → HTTP 200 (/, /tools/, /guides/,
/calculators/emi-calculator/, /guides/how-to-calculate-emi/,
/guides/how-mortgage-amortization-works/, /text/word-counter/,
/fun/fake-text-generator/, /tools/invoice-generator/, /privacy/). Sitemap lists
**36 URLs** (was 29 on 2026-10-19; +6 guides + llms refresh from Argon Days 5–13,
commit `2760da0`). Old host `tulyrotools.vercel.app` → **308** to `tulyro.online`.

**Responsive code review:** all decorative blur blobs (`-right-24`, `-left-20`, etc.)
sit inside `overflow-hidden` sections (GuideLayout, ToolLayout, HubPage, homepage);
new guide tables reuse the `overflow-x-auto` wrapper. No new overflow risk found in
code. Real-device screenshot check still pending (H2 remains open on that point only).

**New findings:**
- FINDING (Low, doc accuracy): `security.md` "Verified clean" table claims HSTS
  `max-age=63072000; includeSubDomains; preload`, but the live homepage serves only
  `Strict-Transport-Security: max-age=63072000` (no flags). The table is stale vs
  live. Next-best fix candidate: set the full HSTS value in `vercel.json` headers.
- No verified functional bugs found this run. H3 (TTS voice quality, Sam-side manual)
  and H5 (ToolPanel state resets, needs a verified repro first) remain OPEN.

## 2026-11-01 — Monthly run entry (docs-only; no code edits, no commits)

**Not re-verified this run (docs-only constraint):** calculation spot-checks, full
route sweep, real-browser rendering. Re-run these in the next weekly run with builds
allowed. Verified this run (live curl): homepage HTTP 200; sitemap 71 URLs;
enforcing CSP + full HSTS + security.txt all live (see monthly-performance.md).

**Hypothesis updates:**
- H2: responsive code review still only code-level; real-device screenshot check
  still pending → remains OPEN on that point.
- H3: OPEN (Sam-side manual check). H5: OPEN (needs verified repro first).
- **H6 CLOSED 2026-11-16:** smoke test run on a fresh build of HEAD
  (`0b584d1`): local serve of `out/` with the live enforcing CSP header
  injected; Playwright Chromium at 360px + 1280px × 4 pages (home, EMI, BMI,
  affordability guide) — 0 console errors, 0 failed requests, 0 horizontal
  overflow. (First pass used a stale 03:30 build; re-ran on the fresh build.
  Scope note: 4 pages, not all tool pages — the bg-remover wasm path was
  not exercised; no CSP breakage observed on the sampled pages.)

**Recurring pattern:** doc-accuracy drift (docs describe 23–36 URLs; live is 71).
No verified functional bugs in 18 days — the tests discipline is holding.

## 2026-11-09 — Weekly run entry (Day 27, full audit + fix)

**Calculation spot-checks (recomputed, all match):**
- EMI(₹100,000, 12%, 12mo) = **8,884.88** — node recompute matches the expected value and vitest.
- BMI(70kg, 175cm) = **22.9** ("Normal").
- Age(2000-01-01 as of 2026-11-09) = **9,809 days lived** — consistent with 9,795 on 2026-10-26 + 14 days.

**Routes/links:** 11/11 sampled live URLs → HTTP 200 (/, /tools/, /guides/,
/calculators/emi-calculator/, /calculators/attendance-calculator/,
/guides/how-to-calculate-emi/, /text/word-counter/, /fun/fake-text-generator/,
/tools/remove-background/, /privacy/, /media/). Sitemap lists **88 URLs** (was 36
on 2026-10-26; +52 since — new PDF/media/image tools + guides from Hermes sprint
work + this run's guide). Old host `tulyrotools.vercel.app` → 308 to
`tulyro.online` (unchanged).

**Security headers (live curl):** enforcing CSP + full HSTS
(`max-age=63072000; includeSubDomains; preload`) + X-Frame-Options DENY +
nosniff + Referrer-Policy + Permissions-Policy all live. **The 26 Oct HSTS
finding is CLOSED** — the live value now matches security.md's table.

**Responsive code review:** guides.tsx 20 tables / 22 `overflow-x-auto`
wrappers; ToolPanel.tsx 5 tables / 7 wrappers — all tables wrapped. All
decorative blur blobs sit inside `overflow-hidden` parents (homepage hero,
guides index, GuideLayout, why-section card). The new guide's 3 tables reuse
the `overflow-x-auto` pattern. Real-device screenshot check still pending (H2
remains open on that point only).

**New findings:**
- FINDING (Info): homepage response carries `Access-Control-Allow-Origin: *`
  though vercel.json only sets it for `/tulyro-logo-200.png`. Harmless on a
  public static site with no credentials/cookies; no action — recorded only.
- FINDING (Low, doc accuracy): docs still cite sitemap counts of 36/71; live
  is 88. Recurring doc-drift pattern — weekly entries now record the live
  count at run time.
- No verified functional bugs found this run. H3 (TTS voice quality, Sam-side
  manual) and H5 (ToolPanel state resets, needs a verified repro) remain OPEN.
  H6 (CSP-enforcement smoke test) remains OPEN — not run this cycle; the new
  guide is static content with no JS interaction, so CSP risk from this change
  is minimal.

**Fix landed this run:** mortgage affordability guide (R8) — see
implementation-log.md + change-log.md.

## 2026-11-16 — Weekly run (post-campaign: Day 30 ended Fri 2026-11-13)

- **No verified functional bugs found this run.** Calc spot-checks ✓
  (EMI ₹100,000@12%/12mo = 8,884.88 / BMI 70kg/175cm = 22.9 / Age
  2000-01-01 = 26y on 2026-11-16; gratuity (15/26) formula + 6-month rule
  + ₹20L cap and fuel-cost formulas verified in source). 11/11 sampled
  routes → 200; live sitemap 96 URLs (was 88 on 9 Nov — the 9 new pages
  since then are all present in it).
- **H6 CLOSED:** CSP-enforcement smoke test — fresh `next build` from HEAD
  (`0b584d1`), served locally with the live enforcing CSP header injected,
  Playwright Chromium at 360px + 1280px × 4 pages (home, EMI, BMI,
  affordability guide): 0 console errors, 0 failed requests, 0 horizontal
  overflow. First pass used a stale 03:30 build (pre-HEAD); re-ran on the
  fresh build — PASS both times. Scope note: 4 sampled pages, not every
  tool page; bg-remover wasm path not exercised.
- **H2 narrowed:** code review found no `w-screen`/100vw fixed widths
  (max-width caps only; `overflow-hidden` in 10 files). The 360px smoke
  measurement (scrollWidth == innerWidth on all 4 pages) is now direct
  evidence; only a real-device screenshot remains pending.
- **ACAO:* Info (9 Nov) → re-verified, still present on all pages** though
  vercel.json scopes it to `/tulyro-logo-200.png` only. Control test:
  example.com + google.com through the same egress proxy do NOT return the
  header, so it is Vercel-side, not proxy-added. Still harmless (no
  credentials/cookies); no action.
- **Doc drift (Low) → this run records live sitemap 96.** Prior docs citing
  88 are now stale; this entry is the current count.
- H3 (TTS voice quality, Sam-side manual) and H5 (ToolPanel state resets,
  needs a verified repro) remain OPEN.
- **Fix landed this run:** none — no verified bug found; the run's safe
  action was closing H6 with the smoke test (verification, not a code
  change). No site-code commit; docs-only commit for this run's logs.
