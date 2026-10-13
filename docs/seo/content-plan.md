# Tulyro — Content Plan (BATCH 1 BUILT 2026-10-14; rest still PLANNED)

Date: 2026-10-13. Updated: 2026-10-14 — guides A1, A2, A3 + comparison B1 are BUILT and live under /guides/. Nothing else in this file is published.

## Rules (binding)

- No page gets published until it can be genuinely useful: **400+ words of original,
  real content** that answers its target query.
- **No thin pages, no doorway pages, no auto-generated variants.** Section E lists
  what is explicitly NOT planned.
- No invented volumes / KD / rankings / traffic. Volumes below are either from
  `docs/seo/keyword-map.md` / the research xlsx (labeled Semrush-modeled estimates)
  or marked **unknown** — never invented.
- Every published page follows the existing pattern: direct answer in the first
  2 lines, visible FAQ + FAQPage JSON-LD matching exactly, ≥2 genuinely useful
  contextual internal links (never forced), `dateModified` bumped via the
  `contentUpdated` constant in `src/lib/seo.ts` when the page is published.
- Proposed URL pattern: `/guides/<slug>/`. Not built, not routed — decide at build
  time; do not claim these URLs exist until they are built and verified.

## A. Feature / use-case guides (proposed `/guides/`)

### 1. How to calculate EMI by hand — ✅ BUILT 2026-10-14 → /guides/how-to-calculate-emi/ (711 body words + FAQ)
- Target keyword: "how to calculate emi" — volume **unknown** (not in keyword-map.md /
  xlsx; do not invent). Related: keyword-map.md primary "emi calculator".
- Intent: informational (user wants the method, not just the number).
- Outline: the reducing-balance formula in plain words; worked example
  ₹100,000 @12% for 12 months = ₹8,884.88/mo, total ₹1,06,618.55 (verified test
  value from docs TASKS.md — example must match the tool's actual output);
  zero-interest case; why the calculator matches hand math; fees/insurance not
  included; "estimate, not a lender quote" disclaimer.
- Internal links: EMI Calculator, Mortgage Calculator.

### 2. How to calculate your age in days — ✅ BUILT 2026-10-14 → /guides/how-to-calculate-age-in-days/ (678 body words + FAQ)
- Target keyword: "how to calculate age in days" — volume **unknown**. Related:
  xlsx "how old am i" 60,500/mo (Semrush-modeled estimate, retr. 2026-10-13).
- Intent: informational.
- Outline: date-of-birth to today subtraction; leap years and the 29 Feb → 1 Mar
  rule (matches the tool); worked example 2000-01-01 as of 2025-01-01 = 9,132 days
  (verified test value from docs TASKS.md); why dividing by 365.25 is wrong.
- Internal links: Age Calculator.

### 3. CGPA to percentage: the CBSE ×9.5 rule, explained — ✅ BUILT 2026-10-14 → /guides/cgpa-to-percentage-cbse-9-5-rule/ (601 body words + FAQ)
- Target keyword: "cgpa to percentage" — keyword-map.md primary.
- Intent: informational (user wants to know if the conversion is trustworthy).
- Outline: the formula; worked example 8.0 → 76.00% (labeled **estimated**);
  why ×9.5 is a CBSE convention, not a universal law; institution differences;
  what to submit with an application (original CGPA + rule used).
- Internal links: CGPA to Percentage Calculator.

### 4. What to include on an invoice (and what to leave out)
- Target keyword: "what should an invoice include" — PAA question, confirmed as a
  real user question via web search 2026-10-13 (Ramp / Stripe / Salesforce FAQ
  headings). Volume **unknown**.
- Intent: informational.
- Outline: the fields a complete invoice usually lists (seller/buyer details, unique
  invoice number, issue date, itemised lines, subtotal/tax/total, payment terms);
  what this generator covers (incl. optional due date + notes field for terms) vs
  what it does not (logo upload, saved templates, payment integration); local tax
  rules (e.g. tax ID) vary by jurisdiction; "general tool, not accounting advice".
- Internal links: Invoice Generator.

### 5. BMI categories explained: what the ranges mean
- Target keyword: "bmi categories" — volume **unknown**. Related: keyword-map.md
  primary "bmi calculator".
- Intent: informational.
- Outline: WHO adult cutoffs (≥25 overweight, ≥30 obesity — already cited on the
  BMI page); screening vs diagnosis; why BMI misclassifies muscular people and says
  nothing about fat distribution; children need age/sex-specific charts.
- Internal links: BMI Calculator.

### 6. How to count words for an essay
- Target keyword: "how to count words" — volume **unknown**. Related: keyword-map.md
  primary "word counter".
- Intent: informational.
- Outline: the whitespace-token rule (matches the tool); what counts as a word;
  page estimates (~500 words single-spaced / ~250 double-spaced, 12-pt, 1-inch
  margins — labeled estimates); reading time at 200 wpm; why different editors
  disagree.
- Internal links: Word Counter.

### 7. Base64 vs encryption: what encoding does and doesn't do
- Target keyword: "base64 vs encryption" — volume **unknown**. Related:
  keyword-map.md primary "base64 encoder decoder".
- Intent: informational (corrects a dangerous misconception).
- Outline: encoding vs encryption; common real uses (MIME email attachments, data
  URLs, JSON API payloads, Basic Auth headers); never use Base64 for secrets;
  padding and URL-safe alphabet notes.
- Internal links: Base64 Encoder / Decoder.

### 8. How to make your computer read text aloud
- Target keyword: "how to make computer read text aloud" — PAA question, confirmed
  via web search 2026-10-13. Volume **unknown**.
- Intent: informational / how-to.
- Outline: paste text, pick a voice and speed, press Play (the Tulyro flow); browser
  voices vs installed voices; no download in v1; privacy note on online voices;
  what to do when no voices appear.
- Internal links: Text to Speech.

## B. Comparison pages (proposed `/guides/` — honest comparisons only)

### 1. EMI calculator vs mortgage calculator: which one to use — ✅ BUILT 2026-10-14 → /guides/emi-vs-mortgage-calculator/ (611 body words + FAQ + comparison table)
- Target keyword: "emi vs mortgage calculator" — volume **unknown**.
- Intent: comparison (user is unsure which page fits).
- Outline: same reducing-balance formula underneath; EMI page = India / ₹ / Indian
  grouping / loan language; Mortgage page = US / $ / mortgage language; what each
  excludes (taxes, insurance, fees); decision rule in one sentence.
- Internal links: EMI Calculator, Mortgage Calculator.

### 2. EMI vs flat-rate interest
- Target keyword: "emi vs flat rate" — volume **unknown**.
- Intent: comparison (user comparing loan offers).
- Outline: reducing-balance vs flat-rate interest on the full principal; worked
  example showing why a flat-rate quote can look cheaper; which one lenders usually
  mean; "check the lender's disclosure" disclaimer.
- Internal links: EMI Calculator.

### 3. CGPA vs percentage vs GPA
- Target keyword: "cgpa vs percentage" — volume **unknown**.
- Intent: comparison (user confused by three scales).
- Outline: 10-point CGPA scale; ×9.5 percentage estimate; US 4.0 GPA is a different
  scale with its own conversion. **Do NOT promise a GPA tool** — GPA mode stays
  blocked until its formula and source are decided (docs TASKS.md).
- Internal links: CGPA to Percentage Calculator.

### 4. BMI vs body-fat percentage
- Target keyword: "bmi vs body fat" — volume **unknown**.
- Intent: comparison.
- Outline: what each measures; why BMI misclassifies muscular people; why fat
  distribution matters; when each is useful. **Do NOT promise a body-fat tool.**
- Internal links: BMI Calculator.

## C. Best listicles (curated lists of Tulyro's own tools — real criteria only)

### 1. Best free online calculators (no signup)
- Target keyword: "free online calculators" — volume **unknown**.
- Intent: listicle / discovery.
- Outline: criteria stated up front (free, browser-only, no signup, no watermark);
  one honest line per calculator tool (Age, EMI, Mortgage, BMI, CGPA) including
  what each does NOT do; link to the Calculators hub.
- Internal links: /calculators/ + each calculator tool page.

### 2. Best free text tools
- Target keyword: "free text tools" — volume **unknown**.
- Intent: listicle / discovery.
- Outline: same criteria; Word Counter, Text to Speech, Fancy Text Generator with
  one honest line each; link to the Text hub.
- Internal links: /text/ + each text tool page.

### 3. Best free developer tools — DO NOT PUBLISH YET
- Target keyword: "free developer tools" — volume **unknown**.
- Intent: listicle / discovery.
- Status: **PLANNED but blocked.** Only one dev tool exists (Base64). Per the docs
  rule (hub pages stay noindex until they hold ≥2 real tools), do not publish this
  list until a second real developer tool ships. Publishing a one-item "best" list
  would be a thin page.

## D. Topic clusters (structure the guides feed)

- **Calculators cluster:** pillar `/calculators/` + 5 tool pages + guides A1, A2, A3,
  A5 + comparisons B1, B2, B3, B4.
- **Text cluster:** pillar `/text/` + 3 tool pages + guides A6, A8.
- **Dev cluster:** `/dev/` (1 tool — stays noindex until ≥2 tools) + guide A7.
- **Tools cluster:** `/tools/` directory + Invoice guide A4.
- **Fun cluster:** `/fun/` (1 tool — stays noindex until ≥2 tools).
- Internal-link rule: every guide links to its tool page(s) and its cluster pillar;
  tool pages link back only where genuinely useful (the daily internal-links cron
  owns incremental additions; never forced).

## E. Explicitly NOT planned (thin / doorway pages)

- Bank-specific EMI pages (SBI / HDFC / ICICI / Axis variants) — duplicate content
  with a swapped brand name; no unique value.
- Per-city / per-college CGPA pages — doorway pages.
- Auto-generated "X calculator" variants — only real, tested tools get pages.
- "Best" lists naming competitors we have not verified — no invented comparisons.
- Author bylines until Sam decides (never invent a name/bio).

## F. Acceptance bar for every planned page

- 400+ words of genuinely useful, original content (no paraphrased competitor text).
- Answers the target query in the first 2 lines.
- Visible FAQ + FAQPage JSON-LD matching exactly (existing `FAQ.tsx` pattern).
- ≥2 genuinely useful contextual internal links (never forced).
- No invented volumes / KD / rankings; volumes labeled Semrush-modeled estimates
  or unknown.
- `contentUpdated` in `src/lib/seo.ts` bumped when the page is published.
