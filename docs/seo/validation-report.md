# Validation Report — Tulyro SEO Pass

**Date:** 2026-10-13 · **Scope:** SEO + GEO + AEO implementation + Tulyro rename on the
`~/workspace/te-review/tool empire website/` tree. No deploy, no push (local commits only).
**Headline:** all verification green. No ranking improvement is claimed — the site is
not live, so no before/after ranking data exists.

## Build / lint / typecheck / tests (final run, 2026-10-13 ~16:09 IST)

| Check | Result |
|---|---|
| `npm run build` | ✅ OK — 26 static pages (21 HTML + robots + sitemap + 404 + chunks) |
| `npm run lint` | ✅ OK — no warnings/errors |
| `npm run typecheck` | ✅ OK |
| `npm test` (vitest) | ✅ **33/33 passed** (10 test files) |
| First Load JS | 103 kB shared; pages 114–136 kB (was 114–135 kB; +~1 kB from JSON-LD) |

Pre-pass baseline (same checks, before edits): build OK, lint OK, typecheck OK,
tests 33/33. No regressions.

## Playwright verification (24 checks, local server)

| Check | Result |
|---|---|
| Home title = "Free Browser Tools \| Tulyro" | ✅ |
| No "Tool Empire" in homepage text | ✅ |
| Header wordmark = "Tulyro" | ✅ |
| Home canonical `https://example.com/` | ✅ |
| Home Twitter card `summary_large_image` | ✅ |
| Home WebSite + Organization JSON-LD | ✅ |
| Home `domContentLoaded` ~121 ms (localhost lab) | ✅ (lab only) |
| Mobile 390px: no horizontal overflow | ✅ |
| Age title / canonical / Twitter / OG image | ✅ |
| Age 4 JSON-LD types (BreadcrumbList, FAQPage, HowTo, SoftwareApplication) | ✅ |
| Age 2000-01-01 → 26y / 9,782 days lived | ✅ (matches TASKS.md verified values) |
| EMI ₹100,000 @12% 12mo → ₹8,884.88 | ✅ |
| EMI hreflang en-US → mortgage page | ✅ |
| BMI 70kg/175cm → 22.9 | ✅ |
| BMI Sources section + WHO link present | ✅ |
| Calculators hub intro present | ✅ |
| Hub BreadcrumbList JSON-LD | ✅ |
| Word counter: "Hello world, this is a test." counts 6 words | ✅ |
| Unknown URL → HTTP 404 status | ✅ |
| 404 page = site's own "Page not found" + home link | ✅ (verified in `out/404.html`; the live-check hit the test server's default 404, not the site's — harness artifact, not a site bug) |
| Console errors across all pages | ✅ none |

**Screenshots** (`~/workspace/te-review/previews/`): `seo-home-desktop.png`,
`seo-home-mobile.png`, `seo-age-desktop.png`, `seo-emi-desktop.png`,
`seo-bmi-desktop.png`, `seo-calculators-hub-desktop.png`. Visuals unchanged from the
Stitch theme except the wordmark text (Tool Empire → Tulyro), the hub intro paragraphs,
the BMI Sources line, and the FAQ/heading wording changes listed in the audit.

## Crawler audit (open-seo-crawler, MIT, audit-only, local)

- 21 pages crawled, all HTTP 200; 0 3xx/4xx/5xx; 0 redirect chains.
- 0 duplicate titles, 0 duplicate metas, 0 duplicate H1s, 0 duplicate bodies.
- 0 broken internal links; 0 external links at crawl time (1 WHO link added after).
- Soft-404 probes (2) correctly returned 404. No URL traps.
- Sitemap: 18 URLs, all 200. "Orphans" listed are the `example.com` canonical/sitemap
  URLs vs the `127.0.0.1` crawl host — a placeholder-domain artifact, not a real issue.
- All 21 pages flagged `noindex` — **expected on local builds** (VERCEL_ENV gate);
  must be re-verified as indexable after the real production deploy (roadmap step 3).
- "No compression / no cache-control / HTTP" flags are local-test-server artifacts;
  Vercel provides compression, cache headers, and HTTPS.

## JSON-LD validation

- 54 blocks parsed across the site, **0 invalid JSON**.
- Types: BreadcrumbList, FAQPage, HowTo, SoftwareApplication, WebSite, Organization.
- Match checks: HowTo steps = visible "How to use" list; FAQ Q/A = visible accordion;
  breadcrumb items = visible trail. Verified on Age, EMI, home, calculators hub, about,
  tools directory.
- FAQ expanded answers: all 11 are 45–55 words (target 40–60). Titles: all ≤60 chars.
  Metas: all 11 tool + 2 hub metas are 150–160 chars.

## Before / after (this pass)

| Area | Before | After |
|---|---|---|
| Brand on user-facing surfaces | "Tool Empire" (working title) | "Tulyro" everywhere; 0 occurrences left in `out/` |
| Twitter cards | Missing | `summary_large_image` on all pages |
| OG images on tool pages | Missing | Present (1200×630 + alt) |
| Canonicals | Tool pages only | Every page |
| JSON-LD types | FAQPage + BreadcrumbList (tool pages) | + HowTo + SoftwareApplication (tools); WebSite + Organization (home); BreadcrumbList (hubs/legal) |
| Titles/metas | Bare titles; short metas | Intent-rich, length-checked |
| Hub content | No intro copy | Factual intro on Calculators + Text |
| FAQ depth | 1–2 sentence answers | 1 expanded 40–60-word answer per tool |
| Sources | None | WHO citation on BMI (URL verified) |
| llms.txt | Missing | Present, honest |
| Honesty wording | "Trending / Most Popular" | "Quick links / Featured" |

## Unresolved blockers (unchanged by this pass)

1. **Real domain** — `siteUrl` is still `https://example.com`; `tulyro.com` availability
   UNVERIFIED; nothing in code claims it.
2. **Real contact email** — `contact@example.com` placeholder in 3 legal pages.
3. **GSC / GA4 / PageSpeed / CrUX** — all require a live public URL; none run yet.
4. **Author attribution** — no bylines (deliberate; never invent a name).
5. **No deploy, no push** — local git commits only; production needs Sam's go-ahead.
