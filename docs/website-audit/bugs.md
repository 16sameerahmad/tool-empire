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
