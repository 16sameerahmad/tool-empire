# Tasks — Tool Empire

Type: Living. Hermes moves cards. Muse approves anything moved to Completed.
Last updated: 2026-10-13

Work order: one task at a time. TASK-000 → implement → test → review → commit → TASK-001 …
Never build the whole site in one prompt.

## Current Milestone

**M1 — Foundation + Calculators cluster live (Gate A).**
Gate A: TASK-004, 005, 006, 007 done and QA-passed, live in production, and indexed in Search Console. See PRD.md › Success Criteria and Gates.

## Current Objective

Finish TASK-000: repo, Vercel, docs committed, and a check for leftovers from the stopped UI build. No UI work until Sam gives his go-ahead.

## Priority

1. P0 — TASK-000 (setup)
2. P0 — TASK-001 → 003 (foundation), after Sam's go-ahead
3. P1 — TASK-004 → 008 (Calculators cluster, the launch anchor)
4. P2 — Phase 3 onward, after Gate A

## In Progress

- (nothing)

## Next

### Phase 0: Setup

- [ ] TASK-000: GitHub repo `tool-empire` (docs/ + src/ + README.md). Vercel connected, free tier. Docs committed. Check for leftovers from the stopped UI build.

### Phase 1: Foundation

- [ ] TASK-002: Legal pages — Privacy Policy, Terms, Contact, About. *(Needs TASK-001. Production publish needs Sam's contact details — see Blocked.)*
- [ ] TASK-003: SEO base — sitemap.xml, robots.txt, GA4 + Search Console, FAQ schema component. *(Needs TASK-001. GA4 and Search Console hookup needs Sam's inputs — see Blocked.)*

### Phase 2: Calculators cluster (launch anchor)

- [ ] TASK-004: Age Calculator — DOB input → exact age, days lived, next birthday
- [ ] TASK-005: EMI Calculator (India, en-IN) — amount, rate, tenure → EMI, total interest, total payment. Logic module is shared with TASK-008.
- [ ] TASK-006: BMI Calculator — height, weight → BMI + category
- [ ] TASK-007: CGPA to Percentage — CGPA input → percentage (10-point scale)
- [ ] TASK-008: Mortgage Calculator — second page of tool #2 (USA, en-US, hreflang). Needs TASK-005.

## Blocked

- [ ] TASK-001: Shared ToolLayout + Header + Footer + tool registry + Homepage (tool grid + search + categories) + category hub pages + 404. **Blocked: Sam stopped the UI build ("Ruko"). Do not start without his explicit go-ahead.**
- [ ] TASK-007b: GPA mode on the CGPA page (US). **Blocked: formula and source not decided (PRD Open Question 4).**
- TASK-002 production publish. **Blocked: needs owner name and contact email from Sam (Open Question 1).**
- TASK-003 GA4 and Search Console hookup. **Blocked: needs production domain, GA4 measurement ID, and Search Console access from Sam (Open Question 1).**

## Backlog

Cluster 2 (Text) may be built on preview before Gate A. It deploys to production only after Gate A.

### Phase 3: Text cluster

- [ ] TASK-009: Word Counter — words, chars, sentences, reading time
- [ ] TASK-010: Text to Speech — browser speech API, voice + speed controls
- [ ] TASK-011: Fancy Text Generator — unicode styles, copy button

### Phase 4: Dev / Tools / Fun

- [ ] TASK-012: Base64 Encoder/Decoder
- [ ] TASK-013: Invoice Generator — items, totals, print/PDF
- [ ] TASK-014: Fake Text Generator — fake chat screenshots

### Phase 5: Launch + Grow

- [ ] TASK-015: Production QA — every page, mobile + desktop, Search Console index check
- [ ] TASK-016: AdSense application (only after Gate C)
- [ ] TASK-017: Next cluster (Batch 2: Tip, GIF Maker, Handwriting, Numerology, Compress-KB, QR-UPI, Meme) — only after Gate B

## Completed

- [x] Research: 102 tools ranked (31 BUILD FIRST / 59 TEST / 12 SKIP)
- [x] Final 10 tools decided, in order
- [x] Strategy decisions: cluster-wise launch, India/USA split pages, single domain, browser-only, $0
- [x] 6 context docs created in docs/
- [x] Context docs refined and README.md added (2026-10-13). Awaiting Sam's approval to commit.

## Per-task checklist (every TASK)

1. Read PRD / ARCHITECTURE / DESIGN / RULES / MEMORY first.
2. Claude writes content (400+ words + FAQ + meta) → `src/content/<slug>.md`, per the Content contract.
3. Hermes implements tool + page → unit tests from the task spec → commit on a feature branch.
4. Muse QA: correctness (the task's test cases), DESIGN.md match, SEO tags, 375px, keyboard, Network tab.
5. Merge → deploy preview → verify live → mark complete.

The Definition of Done in RULES.md applies to every task.

---

# Task Specs

Expected values below are **hand-calculated**. Hermes confirms them independently (for example a spreadsheet function) before locking them into `logic.test.ts`. If a value disagrees, stop and tell Muse.

Notation: "Owner" lists Claude (content), Hermes (build), Muse (QA). FR IDs point to PRD.md.

## TASK-000 — Setup

**Done when**
- GitHub repo `tool-empire` exists with `docs/` (README + 6 files), a short root `README.md`, `src/`, `public/`.
- Next.js (App Router), TypeScript strict, Tailwind, `output: 'export'`. Static export builds.
- npm scripts exist and pass on the empty scaffold: `dev`, `build`, `lint`, `typecheck`, `test`.
- Vercel connected on the free tier. `main` deploys to production, other branches to preview.
- Preview URL checked: it returns a noindex signal. If not, added.
- No env vars. `.nvmrc` set.
- Test runner decision recorded in MEMORY.md (proposed: Vitest, dev-only).
- Hermes inspected the repo and PC for leftovers from the stopped UI build and reported what exists. Nothing deleted. Nothing reused without Muse review.

**Checks**
- `npm run build` succeeds. `out/` is produced.
- Vercel shows one production and one preview deployment.

## TASK-001 — Foundation: layout, registry, homepage (Blocked until Sam's go-ahead)

**Done when**
- `ToolLayout` renders the 9-section template (FR-G8) with slots for tool, how-to, content, FAQ, related tools.
- Header (logo, category nav, search) with a mobile menu panel (inline, not an overlay). Footer with categories and legal links.
- Tool registry `src/lib/tools.ts` exists with the fields in ARCHITECTURE.md. Grid, search and hubs read from it.
- Homepage: H1 + one line, search, one section per category of live tools.
- Five category hub pages. A hub with fewer than 2 live tools is `noindex,follow`.
- `not-found.tsx` (404). Skip link and landmarks.
- Search is client-side only. Case-insensitive match on title and keywords.

**Tests**

| # | Case | Expected |
|---|---|---|
| 1 | Search "age" | Age Calculator is listed |
| 2 | Search "AGE" | Same result (case-insensitive) |
| 3 | Search "zzz" | "No tools found." |
| 4 | Empty search | All live tools shown |
| 5 | 375px width | No horizontal scroll |
| 6 | Keyboard only | Reach skip link, nav, search, every card, with visible focus |
| 7 | Hub with 1 live tool | `noindex,follow`, not in sitemap |
| 8 | Visit a non-existent URL | 404 page with link home |

## TASK-002 — Legal pages

Owner: Claude (content), Hermes, Muse. Needs TASK-001.

**Done when**
- Four pages exist, are linked in the footer, and are indexable: Privacy Policy, Terms, Contact, About.
- Privacy Policy states: tools run in the browser; no tool input is sent to our servers; GA4 is used and what it sets (cookies); the Text to Speech caveat (FR-TTS-9).
- Contact uses a mailto link. No form (a form needs a backend).
- Terms: free to use, informational tools, no warranty.
- Text is not legal advice. Sam decides whether to have it reviewed.
- No placeholder text in the production build.

**Tests**

| # | Case | Expected |
|---|---|---|
| 1 | Click each footer legal link | Page loads, one H1 |
| 2 | Search the build output for "TODO", "[email]", "lorem" | No matches |
| 3 | Click the contact email | Opens the mail client |

## TASK-003 — SEO base

Needs TASK-001. GA4 and Search Console hookup needs Sam's inputs.

**Done when**
- A metadata helper builds title, description, canonical, OG and hreflang for any page from its content file.
- Shared `og-default.png` (1200 × 630, palette colors) and favicon in `public/`.
- `sitemap.xml` is generated from the registry and lists live canonical URLs only. `robots.txt` allows all and points to the sitemap.
- FAQ component renders the visible FAQ and matching FAQPage JSON-LD from one source. Breadcrumb component renders matching BreadcrumbList JSON-LD.
- GA4 loads only on the production hostname, page views only. No custom events.
- Search Console property verified.

**Tests**

| # | Case | Expected |
|---|---|---|
| 1 | View source on a tool page | Title, description, canonical, OG tags, both JSON-LD blocks present |
| 2 | Compare visible FAQ with JSON-LD | Identical text |
| 3 | Count URLs in sitemap | Equals live pages in the registry |
| 4 | Open a preview deployment, Network tab | No GA4 request |
| 5 | Open production, Network tab | GA4 page-view request only |
| 6 | Validate JSON-LD in the schema.org validator or Google Rich Results Test | No errors |

## TASK-004 — Age Calculator

Covers FR-AGE-1 to FR-AGE-7. Logic: `ageCalc(dob, asOf)`.

**Done when**
- Result shows years/months/days, total days lived, next birthday date and days remaining.
- Native date input, min 1900-01-01, max today.
- Placeholder: "Enter your date of birth".
- Local-date math, no UTC bug (parse date-only values as local).
- Content states the 29 February rule.

**Tests** (as-of date is passed in)

| # | DOB | As of | Expected |
|---|---|---|---|
| 1 | 2000-01-01 | 2025-01-01 | 25 y 0 m 0 d. Days lived 9,132. Next birthday "Today", 0 days. |
| 2 | 1990-05-15 | 2026-10-13 | 36 y 4 m 28 d. Days lived 13,300. Next birthday 2027-05-15, 214 days. |
| 3 | 2000-02-29 | 2025-02-28 | 24 y 11 m 30 d. Next birthday 2025-03-01, 1 day. |
| 4 | 2000-02-29 | 2028-02-29 | 28 y 0 m 0 d. Next birthday "Today". |
| 5 | 2026-10-13 | 2026-10-13 | 0 y 0 m 0 d. Days lived 0. Next birthday 2027-10-13. |
| 6 | 2026-10-14 | 2026-10-13 | Error: "Date of birth cannot be in the future." |
| 7 | 1899-12-31 | any | Error (before 1900-01-01) |
| 8 | empty | any | Placeholder, no error |

## TASK-005 — EMI Calculator (India)

Covers FR-EMI-1 to FR-EMI-7. Logic: `emi(principal, annualRatePct, tenureMonths)` in `src/tools/emi/logic.ts`, reusable by TASK-008.

**Done when**
- Inputs: amount, rate, tenure with years/months toggle. Outputs: EMI, total interest, total payment, in ₹ with en-IN grouping.
- Zero interest handled. Large inputs show finite numbers.
- Estimate note shown. Content uses Indian examples.
- Hreflang pair declared (en-IN here, en-US on the Mortgage page once TASK-008 ships).

**Tests**

| # | Amount | Rate | Tenure | Expected |
|---|---|---|---|---|
| 1 | 100,000 | 12% | 12 months | EMI 8,884.88. Total payment 106,618.55. Total interest 6,618.55. |
| 2 | 120,000 | 0% | 12 months | EMI 10,000.00. Total payment 120,000.00. Interest 0.00. |
| 3 | 100,000 | 12% | 1 year | Same as case 1 (toggle converts to months) |
| 4 | 1,000,000,000,000 | 12% | 600 months | Finite numbers shown. No NaN, no Infinity. |
| 5 | 0 or negative | 12% | 12 | Error on amount |
| 6 | 100,000 | -1 or 101 | 12 | Error on rate |
| 7 | 100,000 | 12% | 0 or 601 months | Error on tenure |
| 8 | any blank | | | Placeholder, no error |
| 9 | 100,000 | 12% | 12 months | Display uses en-IN grouping, for example ₹1,06,618.55 |

## TASK-006 — BMI Calculator

Covers FR-BMI-1 to FR-BMI-5. Logic: `bmi(weightKg, heightM)` plus unit conversion helpers.

**Done when**
- Metric/Imperial toggle clears inputs on switch. Result shows BMI (1 decimal) and category. Not-a-diagnosis note shown.

**Tests**

| # | Input | Expected |
|---|---|---|
| 1 | 70 kg, 175 cm | 22.9, Normal |
| 2 | 100 kg, 200 cm | 25.0, Overweight (boundary) |
| 3 | 74 kg, 200 cm | 18.5, Normal (boundary) |
| 4 | 70 kg, 200 cm | 17.5, Underweight |
| 5 | 120 kg, 200 cm | 30.0, Obese (boundary) |
| 6 | 150 lb, 5 ft 6 in | 24.2, Normal |
| 7 | height 0, or 300 cm | Error on height |
| 8 | weight 0, or 600 kg | Error on weight |
| 9 | blank fields | Placeholder, no error |

## TASK-007 — CGPA to Percentage

Covers FR-CGPA-1 to FR-CGPA-4. Logic: `cgpaToPercentage(cgpa)` = CGPA × 9.5.

**Done when**
- 10-point scale only. Formula and multiplier visible on the page. Note that institutions differ.
- Muse confirms the 9.5 source before this ships (status: estimated).

**Tests**

| # | CGPA | Expected |
|---|---|---|
| 1 | 8.0 | 76.00% |
| 2 | 7.5 | 71.25% |
| 3 | 10 | 95.00% |
| 4 | 0 | 0.00% |
| 5 | 10.01 or -1 | Error |
| 6 | "abc" (pasted) | Error |
| 7 | blank | Placeholder |

## TASK-007b — GPA mode (Blocked)

Starts only after Sam and Muse record the formula and source in MEMORY.md › Decisions Made. Do not ship a guess. Mode toggle on the CGPA page. Spec and test cases to be written when unblocked.

## TASK-008 — Mortgage Calculator (USA)

Covers FR-MTG-1 to FR-MTG-3. Needs TASK-005.

**Done when**
- Page at /calculators/mortgage-calculator. $ and en-US grouping. Default tenure unit years.
- Reuses `src/tools/emi/` logic. No copied math.
- hreflang en-IN / en-US pair with the EMI page. Self-referencing canonical. Cross-links with descriptive anchors.
- Content is written separately for US readers. Does not target "EMI" keywords.

**Tests**

| # | Amount | Rate | Term | Expected |
|---|---|---|---|---|
| 1 | 200,000 | 6% | 30 years | Monthly payment 1,199.10. Total payment about 431,676.38. Interest about 231,676.38. |
| 2 | 200,000 | 0% | 30 years | Payment 555.56 (200,000 ÷ 360). Interest 0.00. |
| 3 | 200,000 | 6% | 30 years | Display uses en-US grouping, for example $431,676.38 |
| 4 | EMI and Mortgage pages | | | hreflang tags reference each other and themselves |
| 5 | Invalid and empty input | | | Same behavior as TASK-005 cases 5–8 |

## TASK-009 — Word Counter

Covers FR-WC-1 to FR-WC-7. Logic: `wordStats(text)`.

**Tests**

| # | Text | Expected |
|---|---|---|
| 1 | "" | 0 words, 0 chars, 0 chars without spaces, 0 sentences, 0 sec |
| 2 | "Hello world" | 2 words, 11 chars, 10 without spaces, 1 sentence, 1 sec |
| 3 | "  Hello   world  " plus two newlines | 2 words |
| 4 | "Hi. How are you? Fine!" | 5 words, 22 chars, 18 without spaces, 3 sentences |
| 5 | "Hello 👋" | 2 words, 7 chars, 6 without spaces |
| 6 | "3.14 is pi" | 3 words, 1 sentence |
| 7 | "नमस्ते दुनिया" | 2 words |
| 8 | 200 words | Reading time "1 min" |
| 9 | 250 words | Reading time "1 min 15 sec" |
| 10 | 100,000 characters pasted | Page stays responsive |
| 11 | Clear button | Text and all counts reset |

## TASK-010 — Text to Speech

Covers FR-TTS-1 to FR-TTS-9. Logic: `chunkText(text, maxLen = 200)` is pure and unit-tested. The rest is manual.

**Unit tests (chunkText)**

| # | Input | Expected |
|---|---|---|
| 1 | "" | No chunks |
| 2 | One short sentence | 1 chunk |
| 3 | Three sentences, 300 characters total | Chunks of 200 or less, split on sentence ends |
| 4 | 450 characters, no punctuation | Chunks of 200 or less, split on spaces |
| 5 | Any input | Joined chunks equal the text, ignoring whitespace differences |

**Manual tests**

| # | Case | Expected |
|---|---|---|
| 1 | Enter text, press Play | Text is spoken |
| 2 | Pause, Resume, Stop | Each works. Stop resets. |
| 3 | Speed 0.5×, 1×, 2× | Audible change in speed |
| 4 | Empty text | Play disabled, hint shown |
| 5 | 10,001 characters | Input blocked at 10,000. Counter shown. |
| 6 | 5,000 characters of text | Plays to the end in Chrome and Safari |
| 7 | `speechSynthesis` removed (simulate) | Unsupported message, no crash |
| 8 | Page just loaded | "Loading voices…" then the voice list |
| 9 | Network tab while speaking | No request from our code |

## TASK-011 — Fancy Text Generator

Covers FR-FANCY-1 to FR-FANCY-7. Logic: `styleText(text, style)`.

**Tests**

| # | Input | Style | Expected |
|---|---|---|---|
| 1 | "Hello" | Bold | 𝐇𝐞𝐥𝐥𝐨 |
| 2 | "h" | Italic | ℎ (U+210E, the known gap) |
| 3 | "B" | Script | ℬ (U+212C) |
| 4 | "R" | Double-struck | ℝ (U+211D) |
| 5 | "Hi 123! é 😀" | Bold | Letters styled. Digits, punctuation, é and emoji handled without breaking (no broken surrogate pairs). |
| 6 | "" | Any | Placeholder |
| 7 | Copy button | | Clipboard holds the exact styled string. Button shows "Copied". |
| 8 | Clipboard blocked | | Fallback message shown |

## TASK-012 — Base64 Encoder/Decoder

Covers FR-B64-1 to FR-B64-6. Logic: `encodeB64(text)`, `decodeB64(text)`.

**Tests**

| # | Mode | Input | Expected |
|---|---|---|---|
| 1 | Encode | "Hello" | SGVsbG8= |
| 2 | Decode | SGVsbG8= | Hello |
| 3 | Encode | "héllo" | aMOpbGxv |
| 4 | Encode | "😀" | 8J+YgA== |
| 5 | Decode | SGVsbG8 (no padding) | Hello |
| 6 | Decode | "SGVs bG8=" (space inside) | Hello |
| 7 | Decode | SGVsbG8$ | "This is not valid Base64." |
| 8 | Decode | A | "This is not valid Base64." |
| 9 | Decode | //// | "The decoded data is not valid text (UTF-8)." |
| 10 | Either | "" | Empty output, no error |

## TASK-013 — Invoice Generator

Covers FR-INV-1 to FR-INV-7. Logic: `invoiceTotals(items, taxRatePct)` using integer minor units.

**Tests**

| # | Items | Tax | Expected |
|---|---|---|---|
| 1 | 3 × 19.99 | 8% | Subtotal 59.97. Tax 4.80. Total 64.77. |
| 2 | 1.5 × 100.00 and 2 × 49.99 | 18% | Subtotal 249.98. Tax 45.00. Total 294.98. |
| 3 | 1 × 10.00 | 0% | Subtotal 10.00. Tax 0.00. Total 10.00. |
| 4 | One empty row | any | Row ignored. Totals 0.00 with hint "Add at least one item." |
| 5 | Quantity 0 | any | Error: quantity must be greater than 0 |
| 6 | Unit price -1 or 3 decimals | any | Error |
| 7 | Tax 101% | | Error |
| 8 | 51st row | | Add button disabled |
| 9 | Currency ₹, 106618.55 | | Shown as ₹1,06,618.55 |
| 10 | Currency $, 106618.55 | | Shown as $106,618.55 |
| 11 | Print preview | | Only the invoice shows. No header, footer or watermark. |
| 12 | Refresh | | Form is cleared, and the page says so |

## TASK-014 — Fake Text Generator

Covers FR-FAKE-1 to FR-FAKE-6.

**Done when**
- Generic chat UI. No real app logos or names. No watermark on the PNG.
- Export runs in the browser. Any new dependency follows RULES.md › Dependencies.

**Tests**

| # | Case | Expected |
|---|---|---|
| 1 | Add 2 received + 1 sent message | Preview shows them in order, on the correct sides |
| 2 | Export PNG | `fake-chat.png` downloads. Image matches the preview. Nothing else on it. |
| 3 | No messages | Placeholder preview. Export disabled. |
| 4 | 501-character message | Error |
| 5 | 31st message | Add disabled |
| 6 | Long unbroken word | Wraps, no overflow |
| 7 | Emoji in a message | Renders in preview and PNG |
| 8 | Network tab during export | No request |

## TASK-015 — Production QA

**Done when**
- Every live page checked at 375px and 1440px.
- Lighthouse mobile on each page: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
- Search Console: sitemap submitted, indexing status checked for each URL.
- hreflang pair verified. No duplicate trailing-slash URLs. 404 works. No broken internal links.
- GA4 fires on production only.

## TASK-016 — AdSense application

**Preconditions (all required):** Gate C passed (PRD.md). Hosting terms for ad-supported sites checked and, if needed, a hosting decision made by Sam (Open Question 5). Consent requirements for visitors in the EEA and UK checked (estimated to apply; Muse to verify) and a decision made on how to meet them without a popup (Open Question 3). Sam gives an explicit yes to any paid service.

No ads before this task. Ads never appear in v1.

## TASK-017 — Batch 2

Starts only after Gate B. Candidates: Tip, GIF Maker, Handwriting, Numerology, Compress-KB, QR-UPI, Meme. Sam approves the Batch 2 scope first. No task cards are written until then.
