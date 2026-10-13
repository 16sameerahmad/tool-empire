# Product Requirements Document — Tool Empire

Type: Stable. Change only with Sam's approval, and log it in MEMORY.md › Decisions Made.
Version: 1.1 — refined 2026-10-13
Read with: ARCHITECTURE.md (how), DESIGN.md (look), RULES.md (conduct), TASKS.md (work).

## Product

Tool Empire is a free, browser-only, multi-tool website. No signup. No watermark. No backend. No popups. Every tool runs 100% in the visitor's browser. Revenue comes later, from AdSense only.

## Problem

People searching for everyday tools (age calculator, EMI calculator, word counter, text to speech) land on sites that demand signup, show watermarks, or push paid plans. Existing multi-tool sites (TinyWow) use the right formula but execute it weakly: thin SEO content, little organic search traffic.

## Positioning

- Winning formula: browser-only + no signup + no watermark + fast pages + real SEO content per tool.
- We do not invent a new formula. We beat the benchmark (TinyWow) on execution.
- Large "head" keywords are dominated by big sites. We target converter, calculator and AI-utility long-tail keywords instead.
- All traffic and keyword-volume figures from research are third-party modeled estimates. Never present them as verified.

## Target Users

| Locale | Who | Example searches |
|---|---|---|
| India (en-IN) | Students, job seekers, small-business owners | EMI, CGPA, age, word counter |
| USA / global (en-US) | General public, students, freelancers | BMI, mortgage, tip, invoice, age, base64 |

Note: "JPG-to-PDF" and "tip" appear in audience search lists but are not among the final 10 tools. They are out of scope for v1.

## Goal

Build a site that ranks on Google for tool keywords in India and the USA, and grows cluster by cluster. AdSense is added only after the gates in Monetization pass.

## Launch Tools (final 10, locked)

The numbered order is the priority ranking. Build and launch order follows clusters (Calculators → Text → Dev → Tools → Fun). Within a cluster, follow the numbered order.

| # | Tool | Cluster | URL | Audience | Tasks |
|---|---|---|---|---|---|
| 1 | Age Calculator | Calculators | /calculators/age-calculator | Both | TASK-004 |
| 2 | EMI Calculator | Calculators | /calculators/emi-calculator (en-IN) and /calculators/mortgage-calculator (en-US) | India + USA | TASK-005, TASK-008 |
| 3 | Word Counter | Text | /text/word-counter | Both | TASK-009 |
| 4 | BMI Calculator | Calculators | /calculators/bmi-calculator | Both | TASK-006 |
| 5 | Text to Speech | Text | /text/text-to-speech | Both | TASK-010 |
| 6 | CGPA to Percentage | Calculators | /calculators/cgpa-to-percentage | India (GPA mode: USA, pending) | TASK-007, TASK-007b |
| 7 | Base64 Encoder/Decoder | Dev | /dev/base64-encoder-decoder | Both | TASK-012 |
| 8 | Fancy Text Generator | Text | /text/fancy-text-generator | Both | TASK-011 |
| 9 | Invoice Generator | Tools | /tools/invoice-generator | Both | TASK-013 |
| 10 | Fake Text Generator | Fun | /fun/fake-text-generator | Both | TASK-014 |

### Variant rules (one rule, applied everywhere)

- **EMI and Mortgage are one tool with two pages.** The EMI page (en-IN) and the Mortgage page (en-US) share one logic module (`src/tools/emi/`). They are separate URLs with separate keywords and genuinely different content. Mortgage is not an 11th tool. It is not a mode on the EMI page.
- **Only EMI/Mortgage is split by region in v1.** Every other tool is a single page, written for both audiences where relevant.
- **GPA is a mode on the CGPA page**, not a separate page. It is blocked until its formula and source are decided (TASK-007b).

## MVP

What ships:

- Homepage: tool grid, search, categories
- Category hub pages: /calculators, /text, /dev, /tools, /fun (listing only)
- First cluster: Calculators (Age, EMI, BMI, CGPA, plus the Mortgage page) as the launch anchor
- Legal pages: Privacy Policy, Terms, Contact, About (needed for AdSense and for GA4 disclosure)
- 404 page
- sitemap.xml, robots.txt, Search Console, GA4
- 100% client-side tools: zero backend, zero database, zero auth

Every tool page has: working tool on top, unique 400+ words of content, FAQ (schema), meta tags, related tools. See ARCHITECTURE.md › Content contract.

## Out of Scope (v1)

- User accounts, login, saved history, saved drafts (nothing is stored)
- Payments, premium plans, paywalls
- Mobile app
- AI tools that need paid APIs (AI headshot, AI detector, AI music, celebrity voice)
- Blog (comes after the first 10 tools are live and Sam approves)
- Any tool beyond the final 10, including tools named in audience searches (e.g. JPG-to-PDF)
- Contact form (needs a backend). Contact page uses a mailto link only.
- Dark mode
- Per-tool extras not listed in the requirements below, for example:
  - EMI: amortization table, prepayment
  - Mortgage: property tax, insurance, PMI, down payment
  - BMI: age or sex adjustment
  - Base64: file encoding, URL-safe variant
  - Text to Speech: audio download
  - Invoice: logo upload, saved templates, currencies other than ₹ and $
  - Fake Text: logos or branding of real chat apps

## User Flows

### Flow 1 — Calculators (Age, EMI/Mortgage, BMI, CGPA)

1. Visitor lands from Google on the tool page.
2. Sees the tool at the top, with an empty-state placeholder in the result area.
3. Enters inputs. Result updates as soon as all required inputs are valid.
4. Reads the result. Optionally reads the "How to use" and content sections.
5. Follows a related-tool link, or leaves.

### Flow 2 — Live text tools (Word Counter, Fancy Text, Base64)

1. Visitor lands on the tool page.
2. Types or pastes text. Output updates live.
3. Copies the output (Fancy Text, Base64) or reads the counts (Word Counter).
4. Uses Clear to reset, or follows a related-tool link.

### Flow 3 — Output tools (Text to Speech, Invoice, Fake Text)

1. Visitor lands on the tool page.
2. Enters text or fills the form. A live preview shows (Invoice, Fake Text).
3. Triggers the action: Play (Text to Speech), Print or Save as PDF (Invoice), Export PNG (Fake Text).
4. Gets the output with no watermark and no signup.

### Flow 4 — Invalid or empty input (all tools)

1. Visitor enters invalid input, or clears a field.
2. An inline message in plain language says what is wrong and how to fix it.
3. The result area returns to its placeholder. The page never crashes or goes blank.

## Functional Requirements

Format: "The system shall…". Each is testable. IDs are referenced from TASKS.md.

### General (all tools)

- FR-G1: The system shall run all tool logic in the browser. Using a tool shall cause no network request to any server we operate. Text to Speech uses the browser's own speech engine (see FR-TTS-9).
- FR-G2: The system shall require no signup, login, payment or popup to use any tool.
- FR-G3: The system shall add no watermark to any output (screen, copied text, PNG, print).
- FR-G4: The system shall show a placeholder in the result area before valid input, never a blank box.
- FR-G5: The system shall show an inline plain-language message for invalid input. It shall not throw, crash or show an empty page.
- FR-G6: The system shall update results on input change. Calculators have no "Calculate" button. Actions that are the point of a tool (Play, Print, Export, Copy) are explicit buttons.
- FR-G7: The system shall store nothing: no localStorage, sessionStorage, IndexedDB or cookies set by our code. Refreshing the page clears the form. Pages shall say so where it matters (Invoice, Fake Text).
- FR-G8: Every tool page shall use the shared template: Header → Breadcrumb → H1 + one-line description → Tool card → How to use (3 steps) → Content (400+ words) → FAQ (5–7 questions) → Related tools → Footer.
- FR-G9: Every tool page shall have a unique meta title and description containing the target keyword, a canonical URL, OG tags, FAQ schema (JSON-LD) matching the visible FAQ, and BreadcrumbList JSON-LD matching the visible breadcrumb.
- FR-G10: The system shall generate sitemap.xml from the tool registry and serve robots.txt.
- FR-G11: Every page shall be usable at 375px, 768px and 1440px with no horizontal scroll.
- FR-G12: Every input shall have a visible label. Every control shall work by keyboard with a visible focus state.
- FR-G13: Numbers shall be formatted with `Intl.NumberFormat`. The EMI page uses en-IN grouping and ₹. The Mortgage page uses en-US grouping and $. The Invoice page follows the selected currency. Other tools show plain numbers.
- FR-G14: The system shall use the local date and time of the visitor's device, never UTC, for any date calculation.

### Age Calculator (FR-AGE)

- FR-AGE-1: Input is date of birth (native date input). Minimum 1900-01-01. Maximum today.
- FR-AGE-2: Output is exact age in years, months and days; total days lived; next birthday (date and days remaining).
- FR-AGE-3: A date of birth in the future shall show: "Date of birth cannot be in the future." A date before 1900-01-01 shall show an error. Empty input shall show "Enter your date of birth".
- FR-AGE-4: Leap day rule. For a 29 February birth date, the birthday falls on 1 March in non-leap years. Age increases on 1 March in those years. The page content shall state this rule.
- FR-AGE-5: If today is the birthday (and age ≥ 1), next birthday shall show "Today" with 0 days. If the date of birth is today, age is 0 years 0 months 0 days and next birthday is exactly one year later.
- FR-AGE-6: Days lived is the calendar-day difference between the date of birth and today.
- FR-AGE-7: Logic shall accept the "as of" date as a parameter so tests are deterministic.

### EMI Calculator (FR-EMI) and Mortgage Calculator (FR-MTG)

- FR-EMI-1: Inputs are loan amount, annual interest rate (% per year), and tenure with a years/months toggle.
- FR-EMI-2: Formula: r = rate / 12 / 100; n = tenure in months; EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1).
- FR-EMI-3: Zero interest shall use EMI = P ÷ n. No NaN, no division by zero.
- FR-EMI-4: Outputs are monthly EMI, total interest and total payment. Total payment = unrounded EMI × n. Total interest = total payment − P. Round only for display, to 2 decimals.
- FR-EMI-5: Validation: amount > 0 and ≤ 1,000,000,000,000; rate from 0 to 100 inclusive, up to 2 decimals; tenure a whole number from 1 to 600 months (50 years). Anything else shows an inline error.
- FR-EMI-6: The page shall say the result is an estimate and the lender's figure may differ slightly.
- FR-EMI-7: The EMI page uses ₹ and en-IN grouping (lakh/crore style). Its content uses Indian examples and Indian banks.
- FR-MTG-1: The Mortgage page uses the same inputs, formula and outputs as FR-EMI, with $ and en-US grouping. Labels say "Loan amount", "Interest rate (% per year)", "Loan term". Default tenure unit is years.
- FR-MTG-2: The Mortgage page shall reuse `src/tools/emi/` logic. No duplicated math.
- FR-MTG-3: The two pages shall link to each other with descriptive anchor text and declare hreflang en-IN / en-US to each other. Each has a self-referencing canonical.

### BMI Calculator (FR-BMI)

- FR-BMI-1: Units toggle: Metric (cm, kg) or Imperial (ft + in, lb). Switching units clears the inputs.
- FR-BMI-2: BMI = weight in kg ÷ (height in m)². Imperial inputs convert with exact factors (1 lb = 0.45359237 kg, 1 in = 0.0254 m).
- FR-BMI-3: Display BMI to 1 decimal. Classify using the displayed (rounded) value, WHO adult ranges: under 18.5 Underweight; 18.5–24.9 Normal; 25.0–29.9 Overweight; 30.0 and above Obese.
- FR-BMI-4: Validation: height 50–250 cm (about 20–98 in); weight 10–500 kg (about 22–1,100 lb). Anything else shows an inline error.
- FR-BMI-5: The page shall state that BMI is a screening measure, not a diagnosis, and is meant for adults 18 and over.

### CGPA to Percentage (FR-CGPA)

- FR-CGPA-1: Input is CGPA on a 10-point scale, from 0 to 10, up to 2 decimals.
- FR-CGPA-2: Percentage = CGPA × 9.5 (CBSE convention). Display 2 decimals. Status of this multiplier: estimated, to be confirmed against a CBSE source (see Figures and Assumptions).
- FR-CGPA-3: The page shall show the multiplier used and say that institutions differ and the visitor should check their own rule.
- FR-CGPA-4: Values below 0 or above 10, and non-numeric input, show an inline error.
- FR-CGPA-5: GPA mode (US) is blocked until the formula and source are recorded (TASK-007b). Do not ship a guess.

### Word Counter (FR-WC)

- FR-WC-1: A text area shows live counts: words, characters with spaces, characters without spaces, sentences, reading time.
- FR-WC-2: Words are whitespace-separated tokens. Leading, trailing and repeated whitespace is ignored.
- FR-WC-3: Characters are counted as user-perceived characters (grapheme clusters, using `Intl.Segmenter` where available, otherwise by code point). An emoji counts as 1. "Without spaces" removes all whitespace, including tabs and newlines.
- FR-WC-4: A sentence ends at one or more of `.` `!` `?` followed by whitespace or end of text. A "." inside a number (3.14) does not end a sentence. Non-empty text with no terminator counts as 1 sentence. The page shall say sentence count is approximate.
- FR-WC-5: Reading time uses 200 words per minute. Under 60 seconds shows "N sec". Otherwise "M min" plus " S sec" if S > 0. Zero words shows "0 sec".
- FR-WC-6: Empty text shows all counts as 0. A Clear button resets the text.
- FR-WC-7: 100,000 characters of input shall stay responsive (typing delay under 100 ms on a mid-range phone). This is a target.

### Text to Speech (FR-TTS)

- FR-TTS-1: A text area (maximum 10,000 characters, with a counter), a voice dropdown, a speed control from 0.5× to 2× (default 1×), and Play, Pause, Resume and Stop buttons.
- FR-TTS-2: Speech uses the browser's `speechSynthesis` API. No network request is made by our code.
- FR-TTS-3: Voices load asynchronously. The page shall wait for the `voiceschanged` event and show "Loading voices…" until then.
- FR-TTS-4: Voices that are not local show "(online)" next to their name.
- FR-TTS-5: Long text shall be split into chunks of at most 200 characters on sentence boundaries (then on spaces if needed) and spoken in sequence, to avoid browsers cutting speech off.
- FR-TTS-6: Empty text disables Play and shows a hint.
- FR-TTS-7: If `speechSynthesis` is missing, or no voices are available after loading, show: "Your browser does not support text to speech. Try Chrome, Edge or Safari." The page shall not crash.
- FR-TTS-8: No audio download in v1.
- FR-TTS-9: The page shall disclose that some browser voices may send text to the browser vendor's servers. We do not control this.

### Fancy Text Generator (FR-FANCY)

- FR-FANCY-1: One text input. Below it, the same text shown in each style, each with a Copy button.
- FR-FANCY-2: Initial style set (Muse may change it in the task spec): Bold, Italic, Bold Italic, Script, Bold Script, Fraktur, Double-struck, Monospace, Circled, Small Caps.
- FR-FANCY-3: Characters without a mapping pass through unchanged (digits, punctuation, accents, emoji).
- FR-FANCY-4: Mapping shall iterate by code point, not by UTF-16 unit. Mapping tables shall handle the known gaps in the Unicode Mathematical Alphanumeric block (for example, italic "h" is U+210E).
- FR-FANCY-5: After Copy, the button shows "Copied" for 2 seconds and announces it to screen readers. If the clipboard is blocked, show: "Could not copy. Select the text and press Ctrl+C (Cmd+C on Mac)."
- FR-FANCY-6: Empty input shows a placeholder in each row.
- FR-FANCY-7: The page shall note that styled text may not display on every device and is read poorly by screen readers.

### Base64 Encoder/Decoder (FR-B64)

- FR-B64-1: Two modes: Encode and Decode (segmented toggle). Text in, text out. Copy button on the output.
- FR-B64-2: Encoding uses UTF-8 (`TextEncoder`), so non-Latin text and emoji work. Do not use bare `btoa` on a string.
- FR-B64-3: Decoding ignores whitespace and line breaks, and accepts missing padding. Input length (after removing whitespace and padding) that leaves one stray character, or characters outside the Base64 alphabet, show: "This is not valid Base64."
- FR-B64-4: If decoded bytes are not valid UTF-8, show: "The decoded data is not valid text (UTF-8)."
- FR-B64-5: Empty input gives empty output with a placeholder. No error.
- FR-B64-6: Text only. No file encoding. No URL-safe variant.

### Invoice Generator (FR-INV)

- FR-INV-1: Form fields: From (name, address), To (name, address), invoice number (free text), issue date (default today), due date (optional), currency (₹ or $), line items, tax label (default "Tax") and tax rate % (default 0), notes (optional).
- FR-INV-2: A line item has description, quantity and unit price. Add and remove rows. Minimum 1 row, maximum 50. Rows with every field empty are ignored.
- FR-INV-3: Validation per used row: description required; quantity greater than 0 (decimals allowed); unit price 0 or more with at most 2 decimals. Tax rate 0–100 with up to 2 decimals.
- FR-INV-4: Money math uses integer minor units (paise/cents). Line amount = quantity × unit price, rounded half up to the nearest minor unit. Subtotal = sum of line amounts. Tax = subtotal × rate ÷ 100, rounded half up. Total = subtotal + tax.
- FR-INV-5: Dates print as "13 Oct 2026" style (day, short month, year).
- FR-INV-6: Print or Save as PDF uses the browser's print dialog. A print stylesheet shows only the invoice. No site header, footer, navigation, watermark or branding on the printed page.
- FR-INV-7: Nothing is stored. The page shall say "Refreshing clears this form."

### Fake Text Generator (FR-FAKE)

- FR-FAKE-1: Generates a fake chat screenshot. Inputs: contact name and a list of messages. Each message has a side (sent or received), text and an optional time label.
- FR-FAKE-2: Live preview. Maximum 30 messages. Message text maximum 500 characters.
- FR-FAKE-3: Export PNG in the browser. File name `fake-chat.png`. The image contains only the chat. No watermark.
- FR-FAKE-4: The chat style is generic. No logos, names or trade dress of real chat apps.
- FR-FAKE-5: No messages shows a placeholder preview and disables Export. Long words wrap. Emoji render.
- FR-FAKE-6: Page content shall present the tool as for mockups, humor and entertainment.

## Non-Functional Requirements

### Performance

Measured on the deployed preview with Lighthouse, mobile preset (simulated Slow 4G, 4× CPU slowdown). These are targets.

- Interactive in under 3 seconds on a mid-range phone.
- LCP ≤ 2.5 s. CLS ≤ 0.1. Total Blocking Time ≤ 200 ms.
- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
- First-load JavaScript per tool page ≤ 150 KB gzipped (target; revisit after the first build).
- Calculators compute instantly. No spinner for any calculation.

### Security and Privacy

- No API keys, secrets or environment variables exist in this project. Never add one.
- Validate all user input. Never use `eval()` or `new Function()` on input.
- No third-party scripts except GA4.
- GA4 sends page views only. No custom event may carry anything the visitor typed.
- The claim "your data never leaves your browser" must be true. Verify in the browser Network tab: using a tool makes no request.

### Accessibility

- Working target: WCAG 2.1 AA. Muse spot-checks. No formal audit in v1.
- Labels on all inputs. Full keyboard use. Visible focus. 4.5:1 text contrast. See DESIGN.md › Accessibility.

### Browser Support

- Latest 2 major versions of Chrome, Firefox, Safari and Edge, on desktop.
- Safari on iOS and Chrome on Android, latest 2 major versions.
- Features that depend on browser support (Text to Speech voices, `Intl.Segmenter`, clipboard) shall degrade with a clear message, never a crash.

## Success Criteria and Gates

A visitor can:

1. Open any tool page and use the tool in under 3 seconds, with no signup.
2. Get a correct result. Every test case in TASKS.md › Task Specs passes.
3. Use the site fully at 375px and 1440px.
4. Find the page in Google. This is checked after launch in Search Console (page shows as indexed). Ranking targets are unknown and not set here.

Gates:

| Gate | Condition | Unlocks |
|---|---|---|
| A — Cluster 1 launch | TASK-004, 005, 006, 007 done and QA-passed, live in production, and indexed in Search Console | Cluster 2 (Text) deploys to production. Cluster 2 may be built on preview before this. |
| B — Batch 2 | All 10 tools live and Sam approves a Batch 2 scope. "First cluster ranks" threshold: unknown (Open Question 2). | Any tool beyond the final 10 |
| C — AdSense | All 10 tools live, legal pages live, "real traffic" reached (threshold unknown, Open Question 2), hosting terms checked (Open Question 5), Sam's explicit yes | AdSense application (TASK-016) |

## Monetization

AdSense only, after Gate C. No ads in v1: ads slow the site and hurt early SEO. No other revenue model in v1.

## Figures and Assumptions

Every figure is labeled verified, estimated, assumption, target, or unknown. Do not move a figure to "verified" without a source.

| Item | Value | Status |
|---|---|---|
| Traffic and keyword-volume figures from research | Not repeated here | Estimated (third-party modeled). Never cite as fact. |
| CGPA to percentage multiplier (CBSE) | × 9.5 | Estimated. Widely published. Muse to confirm against a CBSE source before TASK-007 ships. |
| BMI adult ranges | 18.5 / 25 / 30 | Verified (WHO adult classification). Muse to cite source in content. |
| Reading speed | 200 words per minute | Assumption. Page content shall state it. |
| Meta title / description length | ≤ 60 / 120–155 characters | Target. Google truncates by pixel width, not characters. |
| LCP, CLS, TBT thresholds | 2.5 s / 0.1 / 200 ms | Verified as Google "good" thresholds. Used here as targets. |
| First-load JS budget | 150 KB gzipped | Target. |
| FAQ rich results | Google shows them for few sites since 2023 | Estimated. Muse to re-check. FAQ schema is still required. Do not use rich results as a success metric. |
| "Real traffic" threshold | — | Unknown (Open Question 2) |
| "First cluster ranks" threshold | — | Unknown (Open Question 2) |
| GPA conversion formula | — | Unknown (Open Question 4) |

## Open Questions (for Sam)

1. Final domain, brand name, owner name and contact email? Needed before TASK-002 and TASK-003 go to production.
2. What counts as "real traffic" (Gate C) and "first cluster ranks" (Gate B)? No threshold is set. None is assumed.
3. GA4 sets cookies. Add a minimal non-popup notice, limit GA4, or accept as is? "No popups" is locked, so nothing was changed.
4. GPA mode: which conversion (4.0 scale to percentage, or CGPA to GPA) and which source? Also confirm CBSE × 9.5 as the CGPA default.
5. Vercel's free plan may be non-commercial only (unverified). Before AdSense, approve a free alternative host or a paid plan?
