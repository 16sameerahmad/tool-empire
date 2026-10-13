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

## Explicitly NOT on the roadmap

Per-year/per-salary/per-university/per-bank doorway pages · paid links · mass-generated
thin pages · signup/paywall walls · GPA mode (blocked until formula + source) · TTS MP3
download (do not promise) · aggressive live penetration testing · any destructive change
without approval.
