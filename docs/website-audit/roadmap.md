# Website Audit — Roadmap

**Audit date:** 2026-10-14 · **Ordering:** bugs before cosmetics · security before features ·
impact × confidence ÷ effort. **Status key:** QUEUED (after Batch 2 lands / next sprint or
weekly run) · SAM (needs Sam's approval/decision) · SAM-SIDE (Sam does it himself).

## P0 — Security (queued, next sprint)

| # | Action | Why | Effort |
|---|---|---|---|
| R1 | Add security headers via `vercel.json`: CSP (report-only first, then enforce), `X-Frame-Options`/frame-ancestors, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` | S1–S3 (security.md). Test every tool page after — CSP can break inline scripts | Low–Med |
| R2 | Run a real dependency vulnerability scan (npm audit was proxy-blocked) | S6 — cannot claim "no vulnerabilities" until a scan runs | Low |
| R3 | Git-history secret scan (`git log -p` patterns) | S7 — working tree clean; history unverified | Low |
| R4 | Confirm TLS expiry/renewal in Vercel dashboard | S5 — chain valid, expiry unobserved | Low (SAM-SIDE or weekly) |

## P1 — Verify the unverified (weekly run)

| # | Action | Why | Effort |
|---|---|---|---|
| R5 | Full build + lint + typecheck + tests after Batch 2, then Playwright screenshots (desktop + mobile) incl. 404 page | Baseline gaps; reproduces H1–H2, H5 | Med |
| R6 | Validate all JSON-LD blocks (parse + schema shape) | H1 — script tags exist, contents unchecked | Low |
| R7 | Reproduce-or-close hypotheses H1–H5 (bugs.md) | Evidence standard | Low–Med |

## P2 — Content gaps (per content-roadmap + suggestion-mining top 10)

| # | Action | Why |
|---|---|---|
| R8 | Mortgage affordability guide (28/36 rule, salary table, worked math) | GAP-MORT-1 — highest-intent gap |
| R9 | EMI prepayment + amortisation explainer | GAP-EMI-3 |
| R10 | CGPA university-formulas comparison (ONE page) + conversion table | GAP-CGPA-3 / GAP-CGPA-2 |
| R11 | BMI chart + healthy-weight-range guide | GAP-BMI-1 |
| R12 | Invoice vs receipt vs quote guide | GAP-INV-1 |
| R13 | Words-per-minute / speech + reading time guide | GAP-WORD-2 |
| R14 | Fancy text bio/captions/gaming guide (one page, sections) | GAP-FANCY-1 |
| R15 | Base64url / JWT explainer | GAP-B64-1 |
| R16 | Fake-text storytime guide (responsible-use framing) | GAP-FAKE-2 |
| R17 | Browser voices vs AI voices explainer | GAP-TTS-2 |

## P3 — Feature gaps (SAM — need Sam's build decision first)

| # | Action | Why |
|---|---|---|
| R18 | EMI amortisation schedule table in-tool | Biggest show-your-work gap (user-needs #1) |
| R19 | CGPA reverse mode (%→CGPA) | Competitors have it; do not promise until built |
| R20 | Age: weekday-born + "age as of" date | Competitor parity |
| R21 | Invoice logo upload + currency switch | Competitor parity |
| R22 | BMI healthy-weight-range-for-height output | Competitor parity |
| R23 | Split ToolPanel.tsx (1,361 lines) into per-tool components | Maintainability; large refactor — SAM approval required |

## P4 — Sam-side / Sam decisions (SAM / SAM-SIDE)

| # | Action |
|---|---|
| R24 | GA4 — cookie/consent decision (GA4 cookies vs "no popups" rule) |
| R25 | Bing Webmaster — GSC import + sitemap submit |
| R26 | GSC → Request Indexing for homepage + 11 tools |
| R27 | TTS real-voice manual browser check |
| R28 | Author bio — real name vs "Tulyro Team" |
| R29 | tulyro.com — registrar check + buy |
| R30 | 2FA on GitHub + Vercel accounts (security.md residual risk) |
| R31 | Demo Short per tool (video flywheel — Sam's vlog plan) |

## 2026-11-01 — Monthly review: status sweep (bugs before cosmetics · security before features)

All statuses verified against live site / git log 2026-11-01 unless noted. Honest
labels only: DONE = verified with evidence; PARTIAL = shipped in content/tool form
but original asks unclosed; OPEN = not done.

### P0 — Security

| # | Action | Status 2026-11-01 | Evidence |
|---|---|---|---|
| R1 | Security headers via vercel.json | **DONE (upgraded)** — report-only CSP → **enforcing CSP** (commit `756d375`) | live headers 2026-11-01: enforcing `default-src 'self'; ... frame-ancestors 'none'` |
| R2 | Dependency vulnerability scan | **STILL OPEN** — `npm audit` still 403-blocked by egress proxy | security.md S6 |
| R3 | Git-history secret scan | **DONE** — clean (2026-10-19) | security.md S7 |
| R4 | TLS expiry/renewal confirmation | **STILL OPEN (Sam-side)** — not observable from this VM (proxy TLS interception) | security.md S5 |
| — | New: full HSTS (`max-age=63072000; includeSubDomains; preload`) | **DONE** — closes the 2026-10-26 doc-accuracy finding | live headers 2026-11-01 |
| — | New: security.txt live | **DONE** (commit `756d375`) | curl 200, 2026-11-01 |
| — | New: anti-scraper bot rules + probe intercepts | **DONE** (commit `756d375`) — shipped, behavior unverified in detail | git log |

### P1 — Verify the unverified

| # | Action | Status 2026-11-01 |
|---|---|---|
| R5 | Build/lint/typecheck/tests + Playwright screenshots | **PARTIAL** — tests 64/64 green (27 Oct), builds green on every push; **no documented full-page screenshot pass under the enforcing CSP** → new H6 in bugs.md |
| R6 | JSON-LD validation | **DONE** — schema wiring completed 27 Oct (commit `7ffd69b`); H1 closed earlier |
| R7 | Reproduce-or-close H1–H5 | H1 CLOSED, H4 CLOSED, H2 mostly closed (screenshots still pending), **H3 OPEN (Sam-side manual TTS voice check), H5 OPEN (needs verified repro), H6 NEW (CSP-enforcement smoke test)** |
| — | **Docs-refresh pass** | **NEW P1 item (docs only)** — docs/seo/ + docs/website-audit/ describe the vercel.app era (23–36 URLs); live site is tulyro.online at 71 URLs. Stale audits risk stale decisions. Refresh baseline-audit.md, bugs.md, security.md, competitors.md, user-needs.md, change-log.md without rewriting history. |

### P2 — Content gaps

| # | Action | Status 2026-11-01 |
|---|---|---|
| R8 | Mortgage affordability guide (28/36 rule) | **DONE 2026-11-09** — guide shipped (commit `b6e75fd`): 28/36 rule, $120k worked example, salary + rate tables, 6 FAQs; verified live, sitemap 88 |
| R9 | EMI prepayment + amortisation explainer | **DONE** — guide shipped 28 Oct (commit `39ab39d`), amortisation table 26 Oct |
| R10 | CGPA university-formulas comparison (one page) + conversion table | **PARTIAL** — conversion table DONE (26 Oct, 11 rows); university-comparison guide still OPEN |
| R11 | BMI chart + healthy-weight-range guide | **DONE** — "is-bmi-accurate" + "how-to-calculate-bmi" guides shipped |
| R12 | Invoice vs receipt vs quote guide | **PARTIAL** — GST-compliant-invoice guide shipped; vs-receipt-vs-quote comparison angle still OPEN |
| R13 | Words-per-minute / speech + reading time guide | **DONE** — "how-many-words-per-page" shipped |
| R14 | Fancy text bio/captions/gaming guide | **DONE** — "how-unicode-fancy-text-fonts-work-on-social-media" shipped (sections, not doorway pages) |
| R15 | Base64url / JWT explainer | **DONE** — "what-is-base64-encoding-and-when-to-use-it" shipped |
| R16 | Fake-text storytime guide | **DONE** — "how-to-create-chat-mockups-for-presentations-and-ui" shipped |
| R17 | Browser voices vs AI voices explainer | **DONE** — "how-browser-text-to-speech-web-speech-api-works" shipped |
| — | New-tool guides (N1–N4: income tax, QR, bg remover, PDF) | **OPEN** — top of Batch 4 |

### P3 — Feature gaps (Sam decision)

| # | Action | Status 2026-11-01 |
|---|---|---|
| R18 | EMI amortisation schedule in-tool | **DONE in content form** (guide table); in-tool still pending Sam's decision |
| R19 | CGPA reverse mode (%→CGPA) | **OPEN** — needs Sam's decision; never promise until built |
| R20 | Age: weekday-born + "age as of" date | **OPEN** |
| R21 | Invoice logo upload + currency switch | **OPEN** |
| R22 | BMI healthy-weight-range-for-height output | **OPEN** |
| R23 | Split ToolPanel.tsx (1,361 lines) | **OPEN** — Sam approval required; unchanged |

### P4 — Sam-side / Sam decisions

| # | Action | Status 2026-11-01 |
|---|---|---|
| R24 | GA4 decision | **RESOLVED** — zero-PII GA4 event tracking + custom events live (commits `59769d6`, `5c2faf3`) |
| R25 | Bing Webmaster | **DONE** — verified 27 Oct via GSC import; sitemap Success, 53 URLs discovered |
| R26 | GSC Request Indexing | **DONE-ish** — 16 indexing requests confirmed 28–30 Oct (by Sam's orders); indexing itself pending Google |
| R27 | TTS real-voice manual check | **OPEN (Sam-side)** |
| R28 | Author bio | **RESOLVED** — E-E-A-T bylines + credentials live (commit `722cf19`) |
| R29 | tulyro.com registrar | **SUPERSEDED** — tulyro.online bought + live; close this item |
| R30 | 2FA on GitHub + Vercel | **OPEN (Sam-side)** — residual account-takeover risk unchanged |
| R31 | Demo Short per tool | **OPEN (Sam-side)** — 0 demo videos shipped; Product Hunt re-launch produced 0 traffic, distribution channel unproven |

### Recurring-pattern findings (assessment)

1. **Doc-accuracy bugs keep recurring** (HSTS table stale twice, sitemap counts stale
   in docs, keyword-map listing 11 tools while 31 live). Root cause: docs updated by
   hand after feature bursts. Mitigation: docs-refresh pass is now P1; weekly runs
   must re-verify docs claims against the live sitemap, not memory.
2. **Security posture went from "missing basics" to "hardened" in one month** —
   enforcing CSP, full HSTS+preload, security.txt, bot rules. Remaining: S6 (scan
   via alternate method), R30 (2FA).
3. **Zero verified functional bugs in 18 days of shipping 42 pages + features.**
   The tests + verification discipline is the success story of the month.
4. **Correlation ≠ causation everywhere:** every fix since 14 Oct landed with no
   GSC baseline. Do not attribute the (nonexistent) traffic to any fix. The first
   provable read needs: 1 full week of GSC data + a near-miss action (P1 keyword
   #1: "how to calculate emi manually").

## Explicitly NOT on the roadmap

Per-year/per-salary/per-university/per-bank doorway pages · paid links · mass-generated
thin pages · signup/paywall walls · GPA mode (blocked until formula + source) · TTS MP3
download (do not promise) · aggressive live penetration testing · any destructive change
without approval.
