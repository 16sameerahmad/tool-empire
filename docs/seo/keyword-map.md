# Keyword Map — Tulyro (11 live tool pages)

**Date:** 2026-10-13 · **Rule:** one primary intent per page. No two pages target the same
primary keyword. Volumes are Semrush-modeled **estimates** (see competitor-research.md);
"unknown" means no public source was found — never guessed.

## Map

| Target URL | Primary keyword | Secondary / long-tail terms | Title (≤60 chars) | H1 |
|---|---|---|---|---|
| /calculators/age-calculator/ | age calculator | how old am i, age in days, exact age, birthday calculator, how old am i if born in [year] | Age Calculator — Exact Age in Years, Months & Days | Age Calculator |
| /calculators/emi-calculator/ | emi calculator | emi calculator india, loan emi, emi kaise calculate kare (Hindi query — page is English; no Hindi content claimed) | EMI Calculator — Monthly Loan EMI in ₹, India | EMI Calculator |
| /calculators/mortgage-calculator/ | mortgage calculator | mortgage payment calculator, home loan calculator, monthly mortgage payment | Mortgage Calculator — Monthly Home Loan Payment | Mortgage Calculator |
| /calculators/bmi-calculator/ | bmi calculator | bmi calculator kg, bmi chart, body mass index calculator, bmi calculator feet pounds | BMI Calculator — Body Mass Index, Metric & Imperial | BMI Calculator |
| /calculators/cgpa-to-percentage/ | cgpa to percentage | cgpa to percentage calculator, cgpa to percentage cbse, 8 cgpa in percentage | CGPA to Percentage Calculator (×9.5, CBSE) | CGPA to Percentage |
| /text/word-counter/ | word counter | word count, character counter, reading time calculator, sentence counter | Word Counter — Words, Characters & Reading Time | Word Counter |
| /text/text-to-speech/ | text to speech | text to speech free, read text aloud, tts online, text to voice | Text to Speech — Read Text Aloud in Your Browser | Text to Speech |
| /text/fancy-text-generator/ | fancy text generator | stylish text, fancy fonts for instagram, unicode text, stylish name | Fancy Text Generator — Stylish Unicode Text | Fancy Text Generator |
| /dev/base64-encoder-decoder/ | base64 | base64 decode, base64 encode online, base64 to text, utf-8 base64 | Base64 Encoder / Decoder — Encode & Decode Text | Base64 Encoder/Decoder |
| /tools/invoice-generator/ | invoice generator | free invoice generator, invoice maker, create invoice pdf, bill generator | Invoice Generator — Free, No Watermark, Print PDF | Invoice Generator |
| /fun/fake-text-generator/ | fake text message generator | fake text generator, fake chat maker, fake conversation screenshot | Fake Text Generator — Chat Mockup & Screenshots | Fake Text Generator |

## Meta descriptions

All 11 tool metas are 150–160 characters with a plain CTA ("Try it now", "Try it free",
"no signup"). Hub metas (Calculators, Text) are also 150–160. Legal-page metas are
shorter (about/contact/privacy/terms) — acceptable for non-landing pages.

## Anti-cannibalization rules (from strategy doc §3, enforced)

1. Never target the same primary keyword on two pages.
2. Hub pages target the category term (`calculators`, `text tools`) and link down with
   descriptive anchors; they do not target a tool's primary keyword.
3. FAQ content is page-unique — no templated FAQ copy-paste across pages.
4. **EMI vs Mortgage is the one sanctioned duplicate-engine exception:** same calculation
   engine, different keywords, genuinely different copy (₹/Indian grouping vs $/US
   mortgage language), hreflang en-IN ↔ en-US. No other page pair shares an engine
   without distinct copy.
5. FAQ answers: one expanded 40–60-word definitional answer per tool page (the
   "What is X?" / core-question answer); the other four stay concise.

## 2026-11-01 — Monthly review update (new pages shipped after 2026-10-13)

31 tool pages live (verified via live sitemap.xml 2026-11-01). The 20 new pages get
one primary keyword each, same anti-cannibalization rules. Guides targeting the same
root query are informational companions — the TOOL page is the primary for the
transactional keyword, the GUIDE owns the question form. No two pages share a primary.

| Target URL | Primary keyword | Guide companion (informational) |
|---|---|---|
| /calculators/sip-calculator/ | sip calculator | /guides/sip-vs-lumpsum/ |
| /calculators/swp-calculator/ | swp calculator | /guides/swp-vs-fd-for-retirement-income/ |
| /calculators/lumpsum-calculator/ | lumpsum calculator | /guides/sip-vs-lumpsum/ |
| /calculators/cagr-calculator/ | cagr calculator | /guides/cagr-vs-xirr-in-mutual-funds/ |
| /calculators/ppf-calculator/ | ppf calculator | — (guide gap: PPF guide candidate) |
| /calculators/sgpa-to-cgpa/ | sgpa to cgpa | — (guide gap: SGPA guide candidate) |
| /calculators/gst-calculator/ | gst calculator | /guides/how-to-create-gst-compliant-invoice-india/ |
| /calculators/income-tax-calculator/ | income tax calculator india | — (guide gap: high-intent income-tax guide candidate) |
| /calculators/percentage-calculator/ | percentage calculator | — (guide gap: percentage guide candidate) |
| /calculators/attendance-calculator/ | attendance calculator | /guides/college-75-percent-attendance-rule-explained/ |
| /tools/password-generator/ | password generator | /guides/password-entropy-and-security-guide/ |
| /tools/json-formatter/ | json formatter | /guides/json-formatting-and-validation-guide/ |
| /tools/epoch-converter/ | epoch converter | /guides/unix-epoch-timestamp-guide/ |
| /tools/pdf-tools/ | pdf tools | — (guide gap: PDF tools guide candidate) |
| /tools/qr-code-generator/ | qr code generator | — (guide gap: QR code guide candidate) |
| /tools/image-resizer/ | image resizer | /guides/photo-and-signature-size-guide-for-govt-exams/ |
| /tools/remove-background/ | background remover | — (guide gap: bg-remover guide candidate) |
| /tools/uuid-generator/ | uuid generator | /guides/uuid-v4-vs-v7-which-should-you-use/ |
| /tools/case-converter/ | case converter | /guides/code-naming-conventions-camelcase-snake-case/ |
| /tools/markdown-editor/ | markdown editor | /guides/markdown-cheatsheet-and-formatting-guide/ |

### Re-prioritized opportunities (opportunity × confidence ÷ effort, Nov 2026)

Confidence is LOW wherever no GSC query data exists — only one row has a real GSC
signal (marked). Everything else is opportunity-on-intent + competitor evidence,
labeled as such.

| Priority | Target | Why (evidence) | Confidence |
|---|---|---|---|
| 1 | "how to calculate emi manually" → EMI guide | **Real GSC:** 1 impression, pos 74 (27 Oct) — genuine near-miss. Add/strengthen FAQ answer, one contextual internal link. | **High (real GSC data)** |
| 2 | "income tax calculator india" → tool + NEW guide | India-specific, high money intent; no guide exists; Indian tax-season seasonality. | Medium (intent + seasonal) |
| 3 | Mortgage affordability (28/36 rule) guide | **DONE 2026-11-09** — guide shipped (commit `b6e75fd`), verified live. Was: competitor-verified pattern (rate.com, usatoday); biggest remaining content gap (R8). | Medium (competitor evidence) |
| 4 | Brand term "tulyro" | 0 impressions (27 Oct). #1 target is achievable fast (zero competition); needs indexing + the pending-logo/linked mentions. | Medium (low competition) |
| 5 | "pdf tools", "qr code generator", "background remover" | Zero-guide coverage today; strong transactional intent; guides requested-indexing 30 Oct. | Low (no GSC data) |
| 6 | SGPA/PPF/Percentage guides | Fills thin coverage; lower intent than money calculators. | Low |

### Cannibalization check (2026-11-01)

- EMI vs Mortgage: still the only sanctioned pair (distinct keywords, distinct copy, hreflang).
- SIP vs Lumpsum vs SWP vs CAGR: four pages, four primary keywords, four distinct
  calculators — no shared primary. The two guides (`sip-vs-lumpsum`,
  `cagr-vs-xirr-in-mutual-funds`) are informational; no primary-keyword overlap.
- Guides vs tool pages: checked — no guide's target query matches a tool page's
  primary keyword; question-form vs transactional split holds.
- 301 redirects (commit `79d67a5`) consolidated legacy `/tools/<slug>` URLs into
  cluster URLs — reduces, not creates, duplication risk.

## Gaps / next keyword work (not in this pass)

- **CGPA + EMI (India):** no India-specific volume data. When GSC is live, use real
  query data instead of modeled estimates.
- **Long-tail coverage:** who/what/when/where/why/how variants are partially covered by
  FAQs. A guides/blog layer (e.g. "how to calculate EMI by hand") is the honest way to
  grow long-tail — not thin doorway pages.
- **Future tools:** keyword mapping for batch 2+ lives in the 102-opportunities xlsx;
  map each new page before building it, same one-primary-keyword rule.
