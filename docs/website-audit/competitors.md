# Website Audit — Competitors

**Audit date:** 2026-10-14 · **Method:** reuses `docs/seo/competitor-tracking.md` and
`docs/seo/suggestion-mining.md` (same date) — not redone. This file adds the
evidence-based feature matrix. **No invented traffic, rankings, or user feedback.**
Traffic figures below are Semrush-modeled estimates from prior research, labeled as such.

## Competitor set (from competitor-tracking.md)

**Platform:** iLovePDF (~325M visits/mo, modeled) · calculator.net (~67.51M, modeled) ·
TinyWow (200+ tools) · SmallSEOTools.
**Per-tool:** calculator.net, wordcounter.net, invoice-generator.com, collegedunia.com /
smartcgpa.com / desiutils.in (CGPA), ttsfree.com, lingojam.cc, base64decode.org,
trymypost.com / chatmock.app (fake text), health.harvard.edu / CDC (BMI), and others —
full list in competitor-tracking.md §2.

## Feature matrix — Tulyro (verified from our own pages) vs competitors' observed edges

Legend: ✅ present (verified) · ❌ absent · ◐ partial · ? unverified this pass

| Feature | Tulyro | Best competitor observed | Gap? |
|---|---|---|---|
| One job per page, no signup | ✅ | iLovePDF ✅ | None |
| No watermark / no ads / no popups | ✅ | TinyWow ◐ (CAPTCHAs/queues on free tier) | None — our edge |
| Formula shown on page | ✅ | calculator.net ✅ | None |
| Worked example on page | ✅ | calculator.net ✅ | None |
| EMI amortisation schedule table | ❌ | calculator.net / bank sites ✅ | **YES — feature gap** |
| EMI prepayment / part-prepayment | ❌ | competitors explain it ✅ | **YES — content gap (guide)** |
| Mortgage affordability (28/36 rule) | ❌ | rate.com / usatoday ✅ | **YES — content gap (guide)** |
| BMI healthy-weight-range-for-height | ❌ | NHS / Harvard ✅ | **YES — feature/content gap** |
| CGPA full conversion table (every 0.1) | ❌ | collegedunia / smartcgpa ✅ | **YES — content gap** |
| CGPA university formulas compared | ❌ | desiutils ✅ | **YES — content gap (one page)** |
| CGPA reverse (%→CGPA) | ❌ | smartcgpa ✅ | **YES — future feature, needs decision** |
| Word counter: 10 detail stats / reading level | ◐ | wordcounter.net ✅ (blog flywheel) | Partial — blog gap |
| TTS MP3 download | ❌ | ttsfree (paid) ✅ | **Honest no** — say so in copy, don't promise |
| TTS natural/AI voices | ❌ (browser voices) | cartesia.ai ✅ | **Honest no** — explainer gap |
| Fancy text 50–100+ styles / per-platform pages | ◐ | lingojam / fanfonts ✅ | Partial — one guide w/ sections, not doorway pages |
| Base64 URL-safe / JWT explainer | ❌ | base64decode.org ◐ | **YES — content gap** |
| Invoice logo upload / currency switch | ❌ | invoice-generator.com ✅ | **YES — feature gap (needs decision)** |
| Invoice vs receipt vs quote explainer | ❌ | invoice-generator.com ✅ | **YES — content gap (guide)** |
| Fake text iMessage vs Android styles | ◐ | trymypost / chatmock ✅ | Partial — styles explainer gap |
| Age: weekday-born / "age as of" date | ❌ | calculator.net ✅ | **YES — feature gap (needs decision)** |
| Tool + blog flywheel (guide per tool) | ◐ (4 guides live) | wordcounter.net ✅ | In progress — roadmap |
| Demo video / Short per tool | ❌ | iLovePDF ✅ (YouTube) | **YES — video gap (Sam's vlog plan)** |

## What competitors do that we must NOT copy

- **Per-year / per-salary / per-university / per-bank doorway pages** (age, mortgage, CGPA,
  EMI competitors all use them). They rank briefly and decay. Our rule: one guide with a
  table/section each.
- **Paywalls / locked answers** (calculator-online Trustpilot complaints) — our no-paywall
  stance is the differentiator.
- **Heavy ads** (SmallSEOTools) — beat on speed + no ads, not page count.
- **Fake authority badges / invented stats** — never.

## Why they rank (summary from competitor-tracking.md)

1. calculator.net — authority mesh (formula + example + sibling links), earned over decades.
2. wordcounter.net — tool + blog flywheel.
3. invoice-generator.com — zero friction + exact-question FAQ.
4. iLovePDF — one job per page + YouTube tutorial flywheel.
5. CGPA sites — full tables + university variants + reverse mode.
6. TinyWow — breadth + creator coverage.

Full WHY analysis + weekly tracking routine: `docs/seo/competitor-tracking.md`.
