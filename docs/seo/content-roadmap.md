# Tulyro — Content Roadmap

**Engine:** SEO Growth Engine §5 (competitive advantage) + §10 deliverable.
**Source plan:** `docs/seo/content-plan.md` (structure promoted here; the plan remains the per-piece spec — outlines, acceptance bar, and §E exclusions still apply).
**Roadmap date:** 2026-10-14.
**URL pattern:** `/guides/<slug>/` (confirmed by batch 1 build).

## Binding rules (every piece, no exceptions)

- **No piece ships below 600 real words** of genuinely useful, original, humanized content. (Engine rule — supersedes the 400+ floor in the original plan; batch 1 shipped 601–711 body words per piece.)
- Humanized writing only: real examples, judgment calls, natural rhythm. No AI slop (em-dash chains, "delve", "in today's digital landscape", "moreover/furthermore", generic intros, stacked triads).
- AI-detector sanity check before publishing (rough check only — never chase a 0% score; detectors are unreliable and Google does not rank by them).
- Answers the target query in the first 2 lines. Visible FAQ + FAQPage JSON-LD matching exactly.
- ≥2 genuinely useful contextual internal links (never forced).
- No invented volumes / KD / rankings / traffic. Volumes below are marked **unknown** unless cited from `keyword-map.md` / the research xlsx as Semrush-modeled estimates.
- No thin / doorway / auto-generated pages (see `content-plan.md` §E — bank-specific EMI pages, per-college CGPA pages, auto-generated variants: explicitly excluded).
- `contentUpdated` in `src/lib/seo.ts` bumped when a page is published.
- Never promise a tool that does not exist (GPA mode stays blocked until formula + source decided; no body-fat tool promised).

## Batch 1 — LIVE (sprint, commit `e871f83`, 2026-10-14)

Verified in git tree: 4 guide pages + `/guides/` index + `GuideLayout` + `src/lib/guides.tsx`; sitemap updated (live sitemap now 23 URLs).

| # | Piece | URL | Target keyword (volume) | Intent | Internal-link targets | Status |
|---|---|---|---|---|---|---|
| A1 | How to calculate EMI by hand | `/guides/how-to-calculate-emi/` | "how to calculate emi" (unknown) | Informational — method, not just the number | EMI Calculator, Mortgage Calculator | LIVE |
| A2 | How to calculate your age in days | `/guides/how-to-calculate-age-in-days/` | "how to calculate age in days" (unknown). Related: "how old am i" 60,500/mo (Semrush-modeled estimate, retr. 2026-10-13) | Informational | Age Calculator | LIVE |
| A3 | CGPA to percentage: the CBSE ×9.5 rule, explained | `/guides/cgpa-to-percentage-cbse-9-5-rule/` | "cgpa to percentage" (keyword-map.md primary) | Informational — is the conversion trustworthy | CGPA to Percentage Calculator | LIVE |
| B1 | EMI calculator vs mortgage calculator: which one to use | `/guides/emi-vs-mortgage-calculator/` | "emi vs mortgage calculator" (unknown) | Comparison — which page fits | EMI Calculator, Mortgage Calculator | LIVE |

## 2026-11-01 — Monthly review: what shipped vs what was planned

Verified against live sitemap (71 URLs, 2026-11-01). Rule check: every piece must
meet the binding rules above — no piece below 600 real words may ship.

**Batch 2 — SHIPPED 6 of 8 (B3, B4 still open, see Batch 4):** A4 (invoice) via `/guides/how-to-create-gst-compliant-invoice-india/`,
A5 via `/guides/is-bmi-accurate/` + `/guides/how-to-calculate-bmi/`, A6 via
`/guides/how-many-words-per-page/`, A7 via `/guides/what-is-base64-encoding-and-when-to-use-it/`,
A8 via `/guides/how-browser-text-to-speech-web-speech-api-works/`,
B2 via `/guides/emi-vs-flat-rate-interest/`, B3 — NOT yet shipped (CGPA vs percentage
vs GPA guide still open), B4 — NOT yet shipped (BMI vs body-fat guide still open).
Plus out-of-plan guides: EMI prepayment, mortgage amortization, words-per-minute
variants, age-in-Excel, chat-mockups, unicode-fancy-text, photo/signature govt-exams,
uuid v4-vs-v7, naming conventions, markdown cheatsheet, password entropy, JSON
formatting, unix epoch, SIP vs lumpsum, SWP vs FD, CAGR vs XIRR, attendance rule.

**Batch 3 — PARTIALLY OPEN:** C1/C2 not shipped (listicles now make sense — the
guides they link to exist). C3 unblocked: 2+ dev tools now live (base64 + uuid +
json formatter + epoch converter + markdown editor), so a dev-tools listicle is
publishable.

## November roadmap — prioritized next batch (Batch 4, guides for the 20 new tools)

Order = impact × confidence ÷ effort, with the keyword-map.md re-prioritization:

| # | Piece | Target keyword | Intent | Internal-link targets |
|---|---|---|---|---|
| N1 | Income tax calculator India: how it works (2026 slabs) | "income tax calculator india" | Informational + transactional funnel | Income Tax Calculator |
| N2 | QR code generator guide: types + use cases | "qr code generator" (question variants) | Informational | QR Code Generator |
| N3 | Background remover guide: before/after + limitations | "background remover" | Informational | Remove Background |
| N4 | PDF tools guide: what you can do in the browser | "free pdf tools" | Informational | PDF Tools |
| N5 | Mortgage affordability: 28/36 rule, salary table, worked math | "how much house can i afford" | Informational | Mortgage Calculator |
| N6 | PPF guide: interest, maturity, EEE tax status | "ppf calculator" adjacent | Informational | PPF Calculator |
| N7 | Percentage calculator guide: formulas for discount/markup | "percentage calculator" adjacent | Informational | Percentage Calculator |
| N8 | CGPA vs percentage vs GPA (three scales confused) | "cgpa vs percentage" | Comparison | CGPA to Percentage Calculator |
| N9 | BMI vs body-fat percentage | "bmi vs body fat" | Comparison | BMI Calculator |
| N10 | Best free online calculators (no signup) | "free online calculators" | Listicle / discovery | /calculators/ + each calculator tool page |
| N11 | Best free text tools | "free text tools" | Listicle / discovery | /text/ + each text tool page |
| N12 | Best free developer tools | "free developer tools" | Listicle / discovery | /dev/ + each dev tool page |

**Stays blocked:** nothing — C3's blocker (second dev tool) is gone.

## Batch 2 — SHIPPED 6 of 8 (B3, B4 still open, see Batch 4)

| # | Piece | Target keyword (volume) | Intent | Internal-link targets | Status |
|---|---|---|---|---|---|
| A4 | What to include on an invoice (and what to leave out) | "what should an invoice include" (unknown; confirmed real PAA question, 2026-10-13) | Informational | Invoice Generator | SHIPPED 2026-10-27 |
| A5 | BMI categories explained: what the ranges mean | "bmi categories" (unknown). Related: "bmi calculator" (keyword-map.md primary) | Informational | BMI Calculator | SHIPPED 2026-10-27 |
| A6 | How to count words for an essay | "how to count words" (unknown). Related: "word counter" (keyword-map.md primary) | Informational | Word Counter | SHIPPED 2026-10-27 |
| A7 | Base64 vs encryption: what encoding does and doesn't do | "base64 vs encryption" (unknown). Related: "base64 encoder decoder" (keyword-map.md primary) | Informational — corrects a dangerous misconception | Base64 Encoder / Decoder | SHIPPED 2026-10-27 |
| A8 | How to make your computer read text aloud | "how to make computer read text aloud" (unknown; confirmed real PAA question, 2026-10-13) | Informational / how-to | Text to Speech | SHIPPED 2026-10-27 |
| B2 | EMI vs flat-rate interest | "emi vs flat rate" (unknown) | Comparison — comparing loan offers | EMI Calculator | SHIPPED 2026-10-27 |
| B3 | CGPA vs percentage vs GPA | "cgpa vs percentage" (unknown) | Comparison — three scales confused | CGPA to Percentage Calculator | PLANNED |
| B4 | BMI vs body-fat percentage | "bmi vs body fat" (unknown) | Comparison | BMI Calculator | OPEN — see N9 in Batch 4 |

## Batch 3 — PLANNED (listicles — curated lists of Tulyro's own tools, real criteria only)

| # | Piece | Target keyword (volume) | Intent | Internal-link targets | Status |
|---|---|---|---|---|---|
| C1 | Best free online calculators (no signup) | "free online calculators" (unknown) | Listicle / discovery | `/calculators/` + each calculator tool page | PLANNED |
| C2 | Best free text tools | "free text tools" (unknown) | Listicle / discovery | `/text/` + each text tool page | PLANNED |
| C3 | Best free developer tools | "free developer tools" (unknown) | Listicle / discovery | — | BLOCKED — do not publish until a second real developer tool ships (one-item "best" list = thin page). |

## Topic clusters (guides feed these)

- **Calculators cluster:** pillar `/calculators/` + 5 tool pages + A1, A2, A3, A5 + B1, B2, B3, B4.
- **Text cluster:** pillar `/text/` + 3 tool pages + A6, A8.
- **Dev cluster:** `/dev/` (1 tool — stays noindex until ≥2 tools) + A7.
- **Tools cluster:** `/tools/` directory + A4.
- **Fun cluster:** `/fun/` (1 tool — stays noindex until ≥2 tools).
- **Guides cluster:** `/guides/` index + all guide/comparison/listicle pages.

## Sequencing logic

- Batch 1 first: highest-intent, closest to the money keywords (EMI, age, CGPA) + the one comparison that resolves a real user confusion (EMI vs Mortgage).
- Batch 2 next: remaining guides/comparisons, ordered by cluster coverage (one per cluster before doubling up).
- Batch 3 last: listicles only make sense once the guides exist to link to — and C3 stays blocked on the second dev tool regardless of sequence.
- New batches are added from the suggestion-mining backlog (`suggestion-mining.md`) and GSC query data once it exists — never from invented demand.
