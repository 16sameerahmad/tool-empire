# Tulyro — Monthly Performance Record

**Rule:** one entry per month, dated. Same honesty rules as weekly-performance.md:
no traffic/ranking/CTR/volume number that did not come from GSC or a cited public
source. Where GSC data is stale, say so explicitly and never interpolate.

## 2026-11-01 — Monthly review: October 2026 → November 2026

**GSC state used:** Sam-pasted / memory-recorded GSC check 27 Oct ~13:56 IST
(cited: `~/memory/2026-10-28.md`, `~/memory/2026-10-27.md`). No newer GSC paste
exists as of 2026-11-01. All figures below are real-recorded or labeled.

### GSC (tulyro.online property) — last real check 2026-10-27

| Metric | Value | Note |
|---|---|---|
| Clicks (22–25 Oct) | 0 | First data period ever |
| Impressions (22–25 Oct) | 4 | First impressions ever |
| Avg position | 78.5 | Page-8 territory, expected for a fresh domain |
| Indexed pages | 10 (of 30 known at the time) | Report data dated 23 Oct; does not prove all 30 indexed |
| Top queries | "site:vercel.app free" (1), "how to calculate emi manually" (1), "site:vercel.app test" (1) | "how to calculate emi manually" sits at pos 74 — near-miss candidate |
| Brand "tulyro" | 0 impressions | Not ranking; target: #1 in 1–2 weeks (told to Sam 30 Oct) |

### Month vs baseline (2026-10-13/14 → 2026-11-01)

| Metric | Baseline | Now (2026-11-01) | Source |
|---|---|---|---|
| Live domain | tulyrotools.vercel.app | **tulyro.online** (308 from old host) | live curl this run |
| Sitemap URLs | 18 (23 after sprint batch 1) | **71** | live sitemap.xml this run |
| Tool pages | 11 | **31** (+20: SIP, SWP, Lumpsum, CAGR, PPF, SGPA→CGPA, GST, Income Tax, Percentage, Attendance, Password, JSON Formatter, Epoch Converter, PDF Tools, QR Code, Image Resizer, Remove Background, UUID, Case Converter, Markdown Editor) | live sitemap + git log |
| Guide pages | 4 | **26** (+22 pillar/how-to/comparison guides) | live sitemap + git log |
| Tests | 33/33 | 64/64 green (recorded 2026-10-27) | memory 2026-10-28.md |
| CSP | Report-Only | **Enforcing** (`default-src 'self'; ... wasm-unsafe-eval` for on-device AI) | live headers this run |
| HSTS | `max-age=63072000` only | **Full: `max-age=63072000; includeSubDomains; preload`** | live headers this run — closes the 2026-10-26 doc-accuracy finding |
| security.txt | absent | **live** (`/.well-known/security.txt` → 200) | live curl this run |
| GSC property (tulyro.online) | n/a | Verified 2026-10-23; sitemap Success, resubmitted 27 + 30 Oct (71 URLs) | memory 2026-10-28/29/30.md |
| Bing Webmaster | not started | Verified 27 Oct via GSC import; sitemap Success, 53 URLs discovered | memory 2026-10-28.md |
| GA4 | blocked on Sam's decision | **Decided + live** — zero-PII GA4 event tracking + custom events (commits `59769d6`, `5c2faf3`) | git log |
| E-E-A-T bylines | pending Sam's decision | **Live** — author credentials + bylines (commit `722cf19`) | git log |
| Authoritative backlinks | 0 | **2 in motion:** FreeStartupListing.org listing LIVE; LaunchFree.io submitted (approval pending) | memory 2026-10-29.md |
| GSC indexing requests | n/a | **16 confirmed "Indexing requested"** (6 on 28 Oct, 6 on 29 Oct, ~4–7 on 30 Oct) — requested ≠ indexed | memory 2026-10-28/29/30.md |
| Embed routes | none | **Live** for all tools (modal + copyable snippet, commit `a4d9d7e`) | git log |
| 301 redirects | none | **Legacy `/tools/<slug>` → cluster URLs** (commit `79d67a5`) | git log |
| Mobile crash (Bg Remover) | n/a | **Fixed 27 Oct** — downscale to 1024/1600px, blob URLs, fast-AI mode on phones, 25MB cap | memory 2026-10-28.md |
| Verified bugs | 0 | **Still 0 verified** — no verified functional bug since baseline | bugs.md |

### Wins (evidence attached)

1. **Domain migration completed** — tulyro.online live, GSC-verified, sitemap Success,
   308 redirects from tulyrotools.vercel.app (live-verified 2026-11-01). Removes the
   AdSense-on-subdomain risk flagged at baseline.
2. **Velocity without breakage** — 20 tools + 22 guides + schema/PWA/embed/redirects
   shipped in one month; tests 64/64 green (27 Oct); all new sitemap URLs live-200.
3. **Security hardening completed** — report-only CSP → enforcing CSP (commit
   `756d375`), full HSTS + preload, security.txt, anti-scraper bot rules + probe
   intercepts. Only S6 (dependency scan) remains unverified — blocked by egress proxy,
   not by inaction.
4. **Search-discovery pipeline live** — GSC + Bing properties, IndexNow (all 54 URLs
   28 Oct), 16 indexing requests, 2 directory backlinks in motion, Product Hunt
   re-launch 27 Oct (0 votes / 0 traffic — honest result, not a win).
5. **GSC's first real signal** — 4 impressions, 0 clicks, pos 78.5. Thin, but it is
   real data, and "how to calculate emi manually" (pos 74) is a genuine near-miss
   query to support next month.

### Losses / honest setbacks

- **Zero clicks after 18 days live** (22–25 Oct window). Expected for a fresh domain,
  but it means no content conclusion is provable yet — every ranking claim about
  October's fixes is correlation-only.
- **Product Hunt re-launch: 0 votes, 0 traffic.** Distribution channel produced
  nothing measurable. The pinned first comment still reads "I'm Adil" (Sam-side).
- **Brand term "tulyro" not ranking at all** as of 27 Oct. No branded impressions.
- **Doc drift:** these docs (seo/ + website-audit/) describe the vercel.app era
  (23–36 URLs) while the live site is at 71 URLs on tulyro.online. Docs lag reality
  — risk of stale audits basing decisions on old facts. A docs-refresh pass is now
  P1 (roadmap.md).

### What stays open (not losses, just pending)

- H3 (TTS real-voice manual check, Sam-side), H5 (ToolPanel state-reset review —
  needs a verified repro first), S6 (npm audit still 403-blocked).
- New hypothesis H6 (bugs.md): full-page smoke test under the enforcing CSP — no
  breakage reported, but the audit's own rule said "test every tool page after"
  applying CSP, and that test has not been documented.
- Tool-page/guide coverage is now near-complete for India/Global top-10 lanes;
  remaining guide gaps: PDF Tools, QR Code, Remove Background, Income Tax,
  Percentage, PPF, SGPA guides. Mortgage affordability (28/36 rule) remains the
  single biggest unshipped competitor gap.
