# Suggestion Mining — Tulyro

**Date:** 2026-10-14 · **Method:** public SERP observation (search queries +
result headings/FAQs), 2026-10-14. No autocomplete API, no paid keyword tool.
**Volumes:** unknown everywhere unless a prior Semrush-modeled estimate is
cited — never invented. Suggestion terms are qualitative evidence ("people
ask this"), not volume claims.

## 1. What "rank in suggestions" means

Four separate surfaces, four different mechanisms:

| Surface | What it is | How a page gets there (honest version) |
|---|---|---|
| **Autocomplete** | Google's search-box dropdown as you type | Google predicts from aggregate query popularity + the user's history. You cannot "optimize into" autocomplete directly — pages rank for the query AFTER it is typed. Chasing autocomplete itself is a trap; winning the underlying query is the real game. |
| **People Also Ask (PAA)** | Question boxes on the SERP | Answer the question clearly on a page that already matches the query's intent. PAA answers are pulled from pages Google trusts for that query. FAQ content + clear headings help; no placement is promised. |
| **Related searches** | "Searches related to…" at the bottom | Long-tail variants of the same intent. Cover them with genuinely useful FAQ/guide content, never doorway pages. |
| **Discover** | Google app feed cards | Fresh, high-interest content + strong images. Not directly controllable; do not promise Discover traffic. For a tool site, Discover is a bonus, not a strategy. |

**Rule:** we mine suggestions to learn WHAT people ask, then answer it
better on pages that already match intent. We never build pages whose only
purpose is to match a suggestion string.

## 2. Mining method (repeatable, free)

1. Type the seed query into Google, letter by letter; note the dropdown.
2. Search the seed; expand every PAA box; note the questions.
3. Scroll to Related searches; note the variants.
4. Repeat with question words: how / what / why / can / is / vs / for / in.
5. Repeat with modifiers: online / free / calculator / by hand / in Excel /
   without signup / for Instagram / for students / in India / for [year].
6. Cross-check against our FAQ (content.ts) and guides (content-plan.md):
   covered → nothing to do; gap → backlog (§4).

## 3. Per-tool suggestion map

Status key: **COVERED** = our page/FAQ/guide already answers it.
**GAP** = real question, no honest answer on our site yet.
**SKIP** = suggestion exists but answering it would be a doorway/thin page
or outside the tool's honest scope — do not build.

### 3.1 Age Calculator
| Suggestion (observed) | Type | Status |
|---|---|---|
| how old am i | question | COVERED (FAQ) |
| how old am i if born in [year] | year-specific | SKIP — per-year pages are doorway pages; the tool + guide answer the pattern |
| how do I calculate my age from my date of birth | question | COVERED (FAQ) |
| age in days / weeks / months / hours | unit variant | COVERED (guide: age in days) |
| what day of the week was I born on | fact variant | GAP-AGE-1 — answer only if tool adds weekday output; do not fake it in copy |
| what is my zodiac sign | fact variant | SKIP — not a calculator value; out of scope |
| age as of a specific date | feature | GAP-AGE-2 — FAQ/guide line ("enter any as-of date") if tool supports it; verify before writing |
| age difference calculator | adjacent tool | GAP — future-tool candidate, not a content page |
| how to calculate age in Excel | method | GAP-AGE-3 — guide candidate ("age in Excel: DATEDIF / DAYS360") |

### 3.2 EMI Calculator
| Suggestion (observed) | Type | Status |
|---|---|---|
| how to calculate emi | question | COVERED (guide) |
| emi formula | formula | COVERED (FAQ + guide) |
| emi calculator excel / PMT | method | GAP-EMI-1 — guide candidate ("EMI in Excel with PMT") |
| amortisation / amortization schedule | feature | GAP-EMI-2 — tool lacks a schedule table; content can explain the schedule, but do NOT claim the tool shows one |
| prepayment / part-prepayment effect | feature | GAP-EMI-3 — guide candidate (how prepayment cuts interest) |
| emi vs flat rate | comparison | COVERED (planned comparison B2 in content-plan.md) |
| how to reduce emi | advice | GAP-EMI-4 — fold into prepayment guide, not a separate page |
| emi for home loan / car loan / personal loan | loan-type | COVERED in principle — same formula; one FAQ line, never bank/loan-type doorway pages |

### 3.3 Mortgage Calculator
| Suggestion (observed) | Type | Status |
|---|---|---|
| how much house can i afford | question | GAP-MORT-1 — HIGH PRIORITY guide (28/36 rule, salary tables, worked math) |
| how much mortgage can i afford on [salary] | salary variant | COVERED by GAP-MORT-1 (one guide with a salary table — never per-salary pages) |
| mortgage calculator with taxes insurance PMI | feature | GAP-MORT-2 — explainer: what our estimate excludes (taxes, insurance, PMI) and why; do NOT claim the tool includes them |
| mortgage payment formula | formula | COVERED (FAQ: monthly payment calculation) |
| emi vs mortgage calculator | comparison | COVERED (guide built) |

### 3.4 BMI Calculator
| Suggestion (observed) | Type | Status |
|---|---|---|
| what is a healthy bmi / bmi chart | chart | GAP-BMI-1 — add an honest BMI category chart + healthy-weight-range-for-height explainer (guide A5 in content-plan.md) |
| bmi categories | categories | GAP-BMI-1 (same page) |
| is bmi accurate | question | COVERED (FAQ) |
| bmi vs body fat | comparison | COVERED (planned comparison B4) |
| bmi for men / women / age | demographic | SKIP as separate pages — categories are the same; one honest note in the guide covers it |
| bmi calculator kg / feet pounds | unit | COVERED (tool + FAQ) |

### 3.5 CGPA to Percentage
| Suggestion (observed) | Type | Status |
|---|---|---|
| cgpa to percentage | primary | COVERED (tool + guide) |
| percentage to cgpa (reverse) | reverse | GAP-CGPA-1 — tool lacks reverse mode; guide can show the division, but do NOT claim the tool does it |
| cgpa to percentage table | table | GAP-CGPA-2 — add a conversion table (computed from ×9.5) to the guide/page |
| cgpa to percentage VTU / Anna / JNTU / Mumbai | university variant | GAP-CGPA-3 — ONE comparison guide ("university formulas compared"), never per-university doorway pages |
| cgpa to gpa 4.0 (US) | scale | SKIP until GPA formula + source are decided (docs TASKS.md — blocked) |
| why multiply by 9.5 | why-question | GAP-CGPA-4 — FAQ candidate (CBSE convention origin, labeled estimated) |

### 3.6 Word Counter
| Suggestion (observed) | Type | Status |
|---|---|---|
| how many words are in one page | question | COVERED (FAQ) |
| how many words per page / words to pages | table | GAP-WORD-1 — fold into "how to count words for an essay" guide (A6) with a words→pages table |
| how many words in a speech / per minute | speech | GAP-WORD-2 — guide candidate (130–150 wpm speaking, 200 wpm reading) |
| character counter / character limits | adjacent | GAP-WORD-3 — social-platform character-limits reference (Instagram 2,200, X 280, etc. — verify each limit before publishing) |
| keyword density | adjacent | GAP-WORD-4 — explainer (what it is, why stuffing hurts) — short FAQ/guide section, not a tool promise |
| how to count words for an essay | method | COVERED (planned guide A6) |

### 3.7 Text to Speech
| Suggestion (observed) | Type | Status |
|---|---|---|
| how do i make my computer read text aloud | question | COVERED (FAQ + planned guide A8) |
| text to speech free / no download | feature | COVERED (tool + FAQ) |
| text to speech mp3 download | feature | GAP-TTS-1 — tool has NO download in v1; content must say so honestly. Do NOT promise MP3. |
| text to speech natural / ai voices | feature | GAP-TTS-2 — explainer: browser voices vs AI voices, what ours uses |
| text to speech for pdf / long text | use-case | GAP-TTS-3 — FAQ/guide: sentence-splitting for long text; PDF is out of scope unless the tool supports it |
| text to speech languages / voices | feature | GAP-TTS-2 (same explainer) |

### 3.8 Fancy Text Generator
| Suggestion (observed) | Type | Status |
|---|---|---|
| how do i make fancy text for instagram | question | COVERED (FAQ) |
| fancy fonts for instagram bio / captions | platform | GAP-FANCY-1 — guide: bio vs caption vs comments, which styles display everywhere |
| fancy text for discord / whatsapp / gaming names | platform | GAP-FANCY-1 (same guide — one page, platform sections) |
| bubble text / glitch text / upside down text | style | GAP-FANCY-2 — FAQ/guide: what the styles are (Unicode, not fonts), which devices display them |
| stylish name generator | adjacent | SKIP — name generation is a different tool; do not fake it |

### 3.9 Base64 Encoder / Decoder
| Suggestion (observed) | Type | Status |
|---|---|---|
| what is base64 used for | question | COVERED (FAQ) |
| base64 vs encryption | comparison | COVERED (planned guide A7) |
| base64url / jwt decode | variant | GAP-B64-1 — FAQ/guide: URL-safe alphabet, JWT segments (explain, do not promise JWT tooling) |
| base64 to image / file | feature | GAP-B64-2 — tool handles TEXT only; say so honestly, do not promise file conversion |
| base64 encode online | primary | COVERED (tool) |

### 3.10 Invoice Generator
| Suggestion (observed) | Type | Status |
|---|---|---|
| what should an invoice include | question | COVERED (FAQ + planned guide A4) |
| invoice vs receipt / vs quote / vs estimate | comparison | GAP-INV-1 — guide: invoice vs receipt vs quote in one page |
| free invoice generator no watermark | feature | COVERED (tool + FAQ) |
| gst invoice format (India) | tax variant | GAP-INV-2 — explainer: fields a GST invoice commonly lists; general info only, NOT tax advice, never claim compliance |
| invoice template download | feature | GAP-INV-3 — tool prints to PDF; do not promise a downloadable template file |

### 3.11 Fake Text Generator
| Suggestion (observed) | Type | Status |
|---|---|---|
| is it legal to make a fake text message | question | COVERED (FAQ) |
| fake imessage / fake android text | style | GAP-FAKE-1 — explainer: iMessage vs Android styles, colors, receipts |
| fake text storytime / tiktok | use-case | GAP-FAKE-2 — guide: making a storytime screenshot (responsible-use framing, mockup labeling) |
| fake chat screenshot / conversation maker | use-case | GAP-FAKE-2 (same guide) |
| fake text prank | use-case | SKIP as a target — do not optimize for deception use-cases; responsible-use framing only |

## 4. Top 10 suggestion gaps — prioritized backlog

Priority = high intent (searcher is close to using a tool) + low competition
(weak or thin ranking pages observed) + fits an honest page we can write.

| # | Gap | Target page | Why first |
|---|---|---|---|
| 1 | GAP-MORT-1 — How much house can I afford (28/36 rule) | New guide | Huge adjacent query; competitors are finance sites, but a clean worked-math guide + tool link is a real entry |
| 2 | GAP-EMI-3 — Prepayment + amortization explained | New guide | Directly serves EMI intent; competitors' schedules are tables — our explainer + tool link competes on clarity |
| 3 | GAP-CGPA-3 — University formulas compared (one page) | New guide | Kills the per-university doorway temptation; one honest table page |
| 4 | GAP-WORD-2 — Words per minute / speech + reading time | New guide | Wordcounter.net's flywheel topic; our tool already shows reading time — guide completes it |
| 5 | GAP-BMI-1 — BMI chart + healthy weight range for height | Guide A5 | Chart queries are high-intent; WHO-cited, screening-framed |
| 6 | GAP-INV-1 — Invoice vs receipt vs quote | New guide | Exact-question query; invoice-generator.com wins it with FAQ — we answer it with a full guide |
| 7 | GAP-FANCY-1 — Fancy text for bio/captions/gaming | New guide | Platform-intent queries; one page with sections beats thin per-platform pages |
| 8 | GAP-B64-1 — Base64url / JWT explainer | FAQ + short guide | Developer intent; thin ranking pages observed — a correct explainer can compete |
| 9 | GAP-FAKE-2 — Storytime screenshot guide (responsible use) | New guide | TikTok storytime is the traffic engine for this niche; responsible framing is our differentiator |
| 10 | GAP-TTS-2 — Browser voices vs AI voices | FAQ + guide section | Corrects the "why doesn't it sound like ElevenLabs" expectation honestly |

**Explicitly NOT in the backlog:** per-year age pages, per-salary mortgage
pages, per-university CGPA pages, per-bank EMI pages, per-platform fancy-text
pages — all doorway patterns. One guide with a table/section each.

## 5. Maintenance

- Re-run §2 mining **monthly**, or when a tool's GSC impressions move >20%.
- New gaps go to the bottom of §4 unless they beat an existing gap on
  intent + competition — then they displace it, with a dated note.
- When a gap is built, move it to COVERED with the live URL + date. Never
  delete the row — the log is the audit trail.
- Volumes stay **unknown** unless a labeled modeled estimate exists. A
  suggestion's presence in autocomplete/PAA is evidence of demand, not a
  volume number.
