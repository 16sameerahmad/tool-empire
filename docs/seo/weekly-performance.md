# Tulyro — Weekly Performance (§9)

**Engine:** SEO Growth Engine §9 (continuous improvement loop).
**Rule:** every weekly entry compares real GSC data week-over-week, separates correlation from proven causation, and flags insufficient data rather than inventing conclusions. No entry may contain a traffic, ranking, CTR, or volume number that did not come from GSC (or a cited public source). Never promise AI citations or rich results.

## How to fill this file (weekly routine)

1. Pull the last full 7 days from GSC (property `https://tulyrotools.vercel.app/`): Performance → clicks, impressions, average CTR, average position; split by query, page, country, device.
2. Fill the tables below with the new week's numbers + the previous week's numbers + the delta.
3. Competitor-change notes: one line per competitor move observed that week (new page/blog, title change, visible ranking change) with the source (public SERP / their site) and date. No private-analytics claims.
4. Wins/losses diagnosis: what changed, what plausibly caused it (evidence), what is still correlation-only.
5. Next action: exactly one highest-value action for the coming week (plus its owner + verification method).
6. First real comparison runs after a full week of GSC data exists. Until then: INSUFFICIENT DATA.

## Week of 2026-10-14 (first entry) — INSUFFICIENT DATA

**Site went live 2026-10-14. GSC verified 2026-10-14. Sitemap submitted, status Success (2026-10-14). GSC has ~zero data. No conclusions drawn — any clicks/impressions/ranking number for this week would be invented.**

| Metric | This week | Previous week | Delta | Note |
|---|---|---|---|---|
| GSC clicks | insufficient data | — (no prior week) | — | Site live <1 day |
| GSC impressions | insufficient data | — | — | Site live <1 day |
| Average CTR | insufficient data | — | — | No clicks/impressions yet |
| Average position | insufficient data | — | — | No position data yet |
| Indexed pages (GSC) | insufficient data | — | — | Sitemap Success; indexing pending Google crawl |
| Sitemap URLs submitted | 18 at submit time (23 live after sprint batch 1 — 18 + 5 guides) | — | — | Guides added to sitemap in batch 1 (`e871f83`) |

### Top queries (this week)

insufficient data — no GSC query data yet.

### Top pages (this week)

insufficient data — no GSC page data yet.

### Countries (this week)

insufficient data — no GSC country data yet.

### Competitor-change notes (this week)

None logged yet — tracking system building (see `competitor-tracking.md`). No competitor conclusions drawn this week.

### Wins / losses diagnosis (this week)

None — insufficient data. Correlation vs causation is not assessable with ~zero data.

### Next action

1. Wait for GSC data to accumulate; Sam runs GSC "Request Indexing" on key pages (homepage + 11 tools) via URL Inspection. Verification: GSC index-coverage numbers next week.
2. Do NOT act on this week's (non-)data — no title/meta rewrites, no content changes justified by rankings until a full week of GSC data exists.

## Week of 2026-10-19 (Day 6 — first weekly review) — INSUFFICIENT DATA

**No GSC data pasted by Sam this week → all performance metrics remain insufficient
data.** Last known indexing state (Sam, 2026-10-17): homepage + `/guides/` INDEXED;
`/tools/` "URL is unknown to Google"; EMI + BMI pages "Discovered – currently not
indexed". Shipped since that check: `/tools/` sitemap referring fix (`2307544`),
noindex removal from hubs (`bc37502`), BMI guide cross-links (`7f6bfba`), content depth
to ~1500 words on EMI/BMI/Age (`ecafee7`), and the CGPA conversion table (this run).
Expectation (not data): `/tools/` enters the index via the resubmitted sitemap and
EMI/BMI move from Discovered → Indexed on Google's next pass. No ranking, click, CTR,
or volume number is claimed — none exists.

| Metric | This week | Previous week | Delta | Note |
|---|---|---|---|---|
| GSC clicks | insufficient data | insufficient data | — | No Sam GSC paste |
| GSC impressions | insufficient data | insufficient data | — | — |
| Average CTR | insufficient data | insufficient data | — | — |
| Average position | insufficient data | insufficient data | — | — |
| Indexed pages (GSC) | insufficient data (last known: homepage + /guides/) | insufficient data | — | 2026-10-17 Sam report; no fresh check |
| Sitemap URLs submitted | 29 (was 18 at submit, 23 on 2026-10-14) | 23 | +6 | New guides + tools pages |

### Top queries (week of 2026-10-19)

insufficient data — no GSC query data yet.

### Top pages (week of 2026-10-19)

insufficient data — no GSC page data yet.

### Countries (week of 2026-10-19)

insufficient data — no GSC country data yet.

### Competitor-change notes (week of 2026-10-19)

- Baseline established in `competitor-log.md` (created this run). calculator.net
  `/loan-calculator.html` title: "Loan Calculator" (short, ~30 KB page). wordcounter.net:
  title "WordCounter - Count Words & Correct Writing", 800+ visible words, zero tables —
  the tool+blog flywheel pattern (Insight 2) is visibly live there. No GSC-impression
  driven checks possible yet (no GSC data) — skipped honestly per routine.

### Wins / losses diagnosis (week of 2026-10-19)

- Audit + security posture: genuine progress, evidence-backed — hardening headers
  (S1–S3) fixed and verified live; git-history secret scan clean (S7 closed);
  calculation spot-checks all recomputed correctly; all 29 sitemap URLs return 200.
- No traffic wins/losses can be diagnosed — correlation vs causation is not assessable
  with zero GSC data. Any "ranking improved because of the sitemap fix" claim would be
  invented. Wait for a full week of data.

### Next action (week of 2026-10-19)

1. Sam re-checks GSC URL Inspection for `/tools/`, EMI, BMI, and the CGPA guide
   (index status after the sitemap fix + this run's content addition). Owner: Sam.
   Verification: fresh GSC index-coverage numbers in next week's entry.
2. Do NOT act on rankings until a full week of GSC data exists — next week's highest-value
   action gets picked from real queries (near-misses at position 4–15 per routine §7).

## Template — Week of YYYY-MM-DD (copy for each new week)

| Metric | This week | Previous week | Delta | Note |
|---|---|---|---|---|
| GSC clicks | | | | |
| GSC impressions | | | | |
| Average CTR | | | | |
| Average position | | | | |
| Indexed pages (GSC) | | | | |
| Sitemap URLs submitted | | | | |

### Top queries (week of YYYY-MM-DD)

| Query | Clicks | Impressions | CTR | Avg position | Δ vs last week |
|---|---|---|---|---|---|
| | | | | | |

### Top pages (week of YYYY-MM-DD)

| Page | Clicks | Impressions | CTR | Avg position | Δ vs last week |
|---|---|---|---|---|---|
| | | | | | |

### Countries (week of YYYY-MM-DD)

| Country | Clicks | Impressions | CTR | Avg position |
|---|---|---|---|---|
| | | | | |

### Competitor-change notes (week of YYYY-MM-DD)

- (competitor, date, observed public change, source, plausible implication — no private-data claims)

### Wins / losses diagnosis (week of YYYY-MM-DD)

- Win: (what changed + evidence for cause; mark correlation-only where applicable)
- Loss: (what changed + evidence for cause; mark correlation-only where applicable)

### Next action (week of YYYY-MM-DD)

1. (one highest-value action, owner, verification method)

## Week of 2026-10-26 (Day 13) — GSC data pending (Sam has not pasted fresh GSC data)

**Measured facts only.** No GSC numbers were pasted for this week, so all GSC rows are
"insufficient data" — nothing is invented. Last known GSC state (Argon audit,
2026-10-25, real GSC data): **0 clicks / 0 impressions**, 10 of 30 sitemap URLs
indexed at that time. Site is now 36 URLs live (6 new guides landed 2026-10-25,
commit `2760da0`).

| Metric | This week | Previous week | Delta | Note |
|---|---|---|---|---|
| GSC clicks | insufficient data | 0 (2026-10-25 Argon audit) | — | No fresh GSC paste this run |
| GSC impressions | insufficient data | 0 (2026-10-25 Argon audit) | — | No fresh GSC paste this run |
| Average CTR | insufficient data | — | — | No data |
| Average position | insufficient data | — | — | No data |
| Indexed pages (GSC) | insufficient data | 10 of 30 (2026-10-25) | — | Re-check needed after 36-URL sitemap settles |
| Sitemap URLs submitted | 36 live | 30 (2026-10-25) | +6 | 6 new guides (Days 7–12) |

### Top queries (week of 2026-10-26)

insufficient data — no fresh GSC paste.

### Top pages (week of 2026-10-26)

insufficient data — no fresh GSC paste.

### Countries (week of 2026-10-26)

insufficient data — no fresh GSC paste.

### Competitor-change notes (week of 2026-10-26)

- Public SERP check 2026-10-26 ("EMI calculator India monthly payment", verified-public):
  top results are ClearTax, GoPocket, hrcalcy.in, swastika.co.in, buddyloan, fundulator.in.
  No ranking claim about Tulyro is made from this — it only shows who visibly ranks today.
- hrcalcy.in (small newer site, verified-public) ranks with a full amortisation schedule
  plus reverse modes (find loan amount / tenure, rate-change impact, CSV download).
  Implication (correlation-only): schedule depth is a visible pattern among ranking EMI
  pages — our EMI guide now has a 12-month schedule table (this run, commit `f1f8c5a`).
  Whether it moves rankings is unproven until GSC shows impressions.

### Wins / losses diagnosis (week of 2026-10-26)

- Win: EMI guide now carries a verified month-by-month amortisation table (all figures
  independently recomputed; totals match the guide's worked example exactly). Evidence
  for the change is the live page itself; any ranking effect is correlation-only until
  GSC data arrives.
- Loss: none measured — no GSC data to show a loss.
- Open: HSTS flags missing live (Low, doc-accuracy + hardening) — next-run fix candidate.

### Next action (week of 2026-10-26)

1. Set full HSTS (`max-age=63072000; includeSubDomains; preload`) via `vercel.json`
   headers + correct the stale HSTS row in `docs/website-audit/security.md`; verify
   live with `curl -I`. Owner: weekly run. (Sam-side: paste fresh GSC data when
   available so the next weekly entry can compare real numbers.)
