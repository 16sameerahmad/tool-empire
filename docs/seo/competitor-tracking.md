# Competitor Tracking System — Tulyro

**Date:** 2026-10-14 · **Status:** research-only; no site edits in this pass.
**Method:** public signals only. See §1 for the hard boundary.

## 1. The hard boundary (never cross it)

**Competitors' Google Search Console data is PRIVATE.** Nobody — no tool, no
agency, no browser extension — can see another site's GSC: not their queries,
not their clicks, not their CTR, not their indexed pages. Anyone selling
"competitor GSC data" is selling modeled estimates or fabricated numbers.

What we track instead:

| Source | What it honestly tells us | What it does NOT tell us |
|---|---|---|
| Public SERPs (manual checks) | Who visibly ranks for a query today; their title/meta/FAQ shape | Their traffic, CTR, or position history |
| Competitor pages themselves | Their content structure, features, internal links, publishing cadence | Why Google ranked them (ranking is multi-factor; structure is one input) |
| Our OWN GSC (live since 2026-10-14) | Our queries, impressions, clicks, positions | Anything about competitors |
| Public backlink indexes (free tiers) | Rough referring-domain counts | Exact link quality or traffic passed |
| Semrush-modeled estimates (already in `competitor-research.md`) | Order-of-magnitude traffic bands | Verified traffic — always label "modeled estimate" |

**Labeling rule (binding):** every number in this file and in the log is
tagged `verified-public`, `modeled-estimate`, or `unknown`. An untagged
number is a lie by omission.

## 2. Competitor set

### 2.1 Platform competitors (multi-tool sites)

| Competitor | Why it matters | What to track | Notes (observed 2026-10-14) |
|---|---|---|---|
| iLovePDF | Best tool site (325M visits, Semrush-modeled, Sep 2026). One job per page, deep cross-linking. | New tools launched; how each tool page is structured (steps + options + FAQ); YouTube tutorial output | Free tier caps tasks (e.g. 3 files/task on compression — observed in third-party reviews). Premium upsell is visible but not blocking. |
| calculator.net | Calculator fortress (67.51M visits, Semrush-modeled, Sep 2026). Decades of topical authority. | New calculators; formula transparency on each page; internal-link mesh between calculators | Every calculator page shows formula + worked example + related calculators. Authority is earned over years — not copyable in a quarter. |
| TinyWow | Best multi-niche model (200+ tools, no signup). Breadth + no-friction. | New tool launches + velocity; which categories grow; AI-tool additions | Free tier has CAPTCHAs/queues; Pro upsell exists. YouTube creators regularly feature it (branded-search flywheel). |
| SmallSEOTools | SEO-tool incumbent; huge page count, heavy ads. | Which of its pages still rank; ad density (a weakness to beat on UX) | Beat on speed + no-signup + no ads, not on page count. |

### 2.2 Per-tool competitors (track the top 2–3 per tool)

| Tulyro page | Competitors to watch | Their visible edge (observed) |
|---|---|---|
| Age Calculator | calculator.net, calculatestuff.com, kwebby.com, birthday-age-calculator.com | "Age as of" date picker; weekday-born + zodiac + fun stats; per-year doorway pages (do NOT copy the doorway pattern) |
| EMI Calculator | calculator.net, bajajfinservmarkets.in, goodreturns.in, economictimes.indiatimes.com, equitymaster.com | Amortisation schedule tables; worked examples; bank-brand trust (India) |
| Mortgage Calculator | calculator.net, rate.com, mortgage-info.com, usatoday.com (affordability) | Affordability content (28/36 rule, salary tables); taxes/insurance/PMI in results |
| BMI Calculator | health.harvard.edu, cdc.gov, bmicalculatornhs.co.uk, shotlee.app | Medical authority; healthy-weight-range-for-height output; category result cards |
| CGPA to Percentage | collegedunia.com, smartcgpa.com, desiutils.in, 10crack.com | Full conversion TABLES; university-specific formulas (VTU/Anna/JNTU/Mumbai); reverse %→CGPA mode |
| Word Counter | wordcounter.net, wordcounter.io, caesarcipher.org, tooltiny.com | Blog flywheel (speech words, reading level, words-per-page); 10 detail stats; keyword density |
| Text to Speech | ttsfree.com, readaloudly.com, readloudly.com, cartesia.ai, sozai.app | Natural/AI voices; MP3 download (paid); sentence-splitting for long text; per-language voices |
| Fancy Text Generator | lingojam.cc, fanfonts.com, fancyfont.online, fancytext.dev | 50–100+ styles; per-style pages; platform-specific pages (Instagram bio, Discord, gaming names) |
| Base64 Encoder/Decoder | base64decode.org, tejji.com, atbashcipher.com, toolplaza.app | Thin utility pages that still rank; URL-safe variant; file support on some |
| Invoice Generator | invoice-generator.com, ramp.com, catinvoice.com | Logo upload; currency switch; invoice-vs-receipt FAQ; email delivery |
| Fake Text Generator | trymypost.com, toolsvana.com, chatmock.app, tokcommentgenerator.com, thefake.design | iMessage vs Android styles; dark mode; timestamps/avatars/photos; transparent-PNG / bubble-sticker export for TikTok storytime |

## 3. WHY they rank — reverse-engineered (WHY, never copy)

### Insight 1 — calculator.net: authority is a mesh, not a page
**Why:** decades of calculators, every page showing the formula + a worked
example + links to sibling calculators. A new calculator inherits trust from
the whole mesh.
**Tulyro action:** keep the formula + worked example + related-links pattern
on every tool page (already done); grow the mesh with guides (content-plan.md
§A–B); never fake authority with invented stats or badges.

### Insight 2 — wordcounter.net: the tool + blog flywheel
**Why:** the tool answers the transaction ("count my words"); the blog answers
the adjacent questions ("how many words in a 10-minute speech?", reading
level, words per page). Each blog post funnels into the tool.
**Tulyro action:** one guide per tool answering its top adjacent question
(content-plan.md §A). Blog posts link to the tool; the tool links back only
where genuinely useful.

### Insight 3 — invoice-generator.com: zero friction + exact-question FAQ
**Why:** single-feature page, no signup, and an FAQ that answers the exact
queries searchers type ("invoice vs receipt", "is it free?").
**Tulyro action:** FAQ parity per tool is done (66 questions); add the
invoice-vs-receipt-vs-quote guide (see suggestion-mining.md GAP-6). Keep
friction at zero — never add signup walls to chase leads.

### Insight 4 — iLovePDF: one job per page + video flywheel
**Why:** each tool does exactly one job, explained in steps; YouTube tutorials
(searchable, evergreen) drive branded searches back to the tool.
**Tulyro action:** keep one job per page (already true); Shorts/demo videos
per tool (Sam's vlog plan) — one tool, one demo, no mass-produced filler.

### Insight 5 — CGPA competitors: tables + variants win the query
**Why:** collegedunia/smartcgpa/desiutils rank with a full CGPA→% TABLE (every
0.1 step), university-specific formulas, and reverse conversion. The table
itself is the answer for "what is 8.2 CGPA in percentage".
**Tulyro action:** add an honest CGPA conversion table to the CGPA guide/page
(data computed from the ×9.5 formula — a table of our own numbers, not copied
text); add a single "university formulas compared" guide (one page, NOT
per-university doorway pages); consider reverse %→CGPA as a future tool mode
(needs Sam's decision; do not promise it in copy until built).

### Insight 6 — TinyWow: breadth + creator coverage
**Why:** 200+ tools means 200+ ranking surfaces; creators feature it because
it is free and needs no signup, which builds branded search.
**Tulyro action:** breadth is a batch-2+ game (2–3 tools/week, cluster-wise,
per project rules). Do not rush thin tools to inflate count — one tested tool
beats ten untested ones.

## 4. Weekly tracking routine

Run every **Monday**, ~30 minutes. Log in `competitor-log.md` (same folder)
using the table in §5. Act only on signals that pass the threshold in §6.

### Checklist
- [ ] **New pages:** check each §2 competitor's site / sitemap for new tool or
      blog pages. Note: title, target query (inferred from title/H1 only),
      date spotted. Do NOT scrape at scale.
- [ ] **Title/meta/FAQ shifts:** open the top 3 ranking pages for our 3
      highest-impression GSC queries (see §7). Note any new FAQ questions or
      title rewrites — these are PAA candidates for our pages (original
      wording only).
- [ ] **Content depth:** spot-check one competitor tool page: word count band
      (<400 / 400–800 / 800+), tables present?, worked examples?, sources
      cited? (Rough bands, not exact counts.)
- [ ] **Internal links:** note any new cross-link pattern (e.g. competitor
      added a "related tools" block). Adopt the PATTERN, never their copy.
- [ ] **Backlinks (public):** free-tier check on our own domain + top 2
      competitors: referring-domain count band only (grew / flat / fell).
      Never buy links; never "replicate" a competitor's link — earn our own.
- [ ] **Our GSC (§7):** rising queries, new queries, CTR drops, pages that
      fell out of index. This is the only ranking data we trust.
- [ ] **Suggestion sweep:** re-run the suggestion-mining checks
      (suggestion-mining.md §2) for any tool whose GSC impressions moved >20%
      up or down. New suggestions → backlog.

## 5. Competitor log format

Append one row per observed move (newest first). No row without a date and a
source label.

| Date | Competitor | Move observed | Source (verified-public) | Tulyro response (if any) | Status |
|---|---|---|---|---|---|
| 2026-10-14 | — | Baseline: this file created | — | — | — |
| | | | | | |

## 6. Signal thresholds (when to act vs. when to ignore)

| Signal | Action |
|---|---|
| Competitor publishes a genuinely new, useful feature (e.g. reverse conversion, new output) | Consider as a feature candidate; evaluate on merit, build only if it fits our tools + tests |
| Competitor adds an FAQ/question we don't answer | Add an original FAQ answer if the question is real and our tool genuinely answers it |
| Competitor title/meta rewrite on a query we also target | Review our title/meta; change only if ours is measurably weaker (cut off, off-keyword) |
| Competitor publishes a thin/doorway page that ranks briefly | IGNORE. Do not copy doorway patterns — they decay and risk penalties |
| Competitor gets a backlink we could earn honestly (directory, creator mention) | Submit/pitch ourselves on merit; never copy their outreach text |
| Any "guaranteed ranking" / paid-link offer | IGNORE + never buy |

## 7. OUR GSC loop — the "viral keywords" engine

"Viral keywords in GSC" means **our own queries that are suddenly rising** —
impressions or clicks jumping week over week. Competitors' GSC is invisible;
ours is the only real keyword radar we have.

**Weekly GSC routine (once data accumulates):**
1. **Performance → Queries:** sort by impressions, compare 7 days vs prior
   7 days. Flag any query with >50% impression growth.
2. **For each rising query:** check which of our pages it lands on and its
   position. Position 4–15 = "near-miss": support it — add/strengthen the
   FAQ answer, add one contextual internal link from a related page, make
   sure the page's intro answers it in 2 lines.
3. **New queries (not in keyword-map.md):** if a query is real and our page
   genuinely answers it, add it as a secondary term in keyword-map.md and
   consider a FAQ or guide. If our page does NOT answer it, do not chase it.
4. **CTR drops:** title/meta is the first suspect — rewrite for clarity +
   keyword match, never clickbait.
5. **Falling pages:** check indexing + content freshness; refresh with real
   improvements (new example, new FAQ, corrected value), never a fake
   dateModified bump.
6. **Request indexing** only for pages that changed substantively — never
   bulk-request unchanged pages.

**What "going viral in GSC" honestly looks like:** a query jumping from
~50 to ~500 impressions in a week usually means a page entered page 1–2 for a
long-tail term, or a Short/video sent a burst of branded searches. Support
it (step 2) — do not try to force it with spam.
