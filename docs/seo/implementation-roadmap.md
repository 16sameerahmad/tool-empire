# Implementation Roadmap — Tulyro SEO

**Pass completed:** 2026-10-13 (this document's "Done" section). Everything below it is
future work, in priority order. No rankings, traffic, or AI-citation gains are promised
anywhere in this plan.

## Done in this pass

1. **Brand rename** — "Tool Empire" → **Tulyro** on every user-facing surface:
   header wordmark, footer, all metadata title suffixes, OG/Twitter, JSON-LD
   Organization, `logo.svg`, `favicon.svg`, regenerated `og-image.png` (same style,
   new wordmark), README, package name. `siteUrl` stays `https://example.com` and
   **no `tulyro.com` string appears anywhere in code** (domain availability unverified).
2. **Twitter cards** — `summary_large_image` on all pages (was missing).
3. **OG images on tool pages** (were missing) + OG alt text.
4. **Canonicals** on home + hub + legal pages (tool pages already had them).
5. **Intent-rich titles (≤60 chars) + metas (150–160 chars + CTA)** for all 11 tools
   and both indexable hubs.
6. **JSON-LD:** added HowTo (matches visible steps) + SoftwareApplication (price 0, no
   invented ratings) on all 11 tool pages; WebSite + Organization on home;
   BreadcrumbList on hubs/directory/legal.
7. **AEO:** one expanded 40–60-word definitional FAQ answer per tool page (11 total).
8. **Hub intros:** short factual intro paragraphs on Calculators + Text hubs.
9. **Sources:** BMI page cites WHO (URL fetched + verified 2026-10-13); `sources`
   plumbing added for future verified citations.
10. **llms.txt** added (honest, placeholder-aware).
11. **Honesty:** "Trending/Most Popular" → "Quick links/Featured" (no popularity data).

## Next — pre-launch (blocking)

| # | Task | Owner / blocker |
|---|---|---|
| 1 | **Buy + verify domain.** Check `tulyro.com` at a registrar; buy; set `siteUrl` to the real domain; re-emit canonicals/sitemap/robots/OG/JSON-LD; confirm no `example.com` remains. | Sam — domain purchase |
| 2 | **Real contact email.** Replace `contact@example.com` (3 legal pages). | Sam — Open Question 1 |
| 3 | **Deploy + verify indexability.** After deploy, fetch live homepage: confirm NO `noindex` meta (see technical-audit §1), 200 status, HTTPS, compression, cache headers, 404 status on unknown URL. | Sam's go-ahead required before any deploy |
| 4 | **Google Search Console.** Add property, submit sitemap, request indexing for 18 URLs. Premature before step 1. | Sam |
| 5 | **GA4 decision.** Privacy page already discloses GA4-when-enabled. Decide: enable with consent handling, or drop GA4. Do not add analytics silently. | Sam — Open Question 3 |

## Next — post-launch (ordered)

1. **Real query data:** replace modeled estimates with GSC queries/clicks/impressions;
   re-map keywords per actual demand (esp. CGPA + EMI India queries).
2. **PageSpeed + CrUX:** run PageSpeed Insights on the live URL; record real LCP/INP/CLS;
   fix what it flags. Never report lab numbers as field data.
3. **Author attribution:** add the real owner's name/byline once decided (never invent).
4. **More verified citations:** one authoritative source per YMYL-ish page (EMI/Mortgage:
   central-bank or regulator explainer; CGPA: CBSE publication — verify URL first).
5. **Snippet tables:** BMI category table, EMI formula table — needs a small component;
   do it as a design-preserving addition, not a restyle.
6. **Long-tail content:** guides/blog layer for who/what/when/where/why/how queries
   (e.g. "how to calculate EMI by hand") — original content, no doorway pages.
7. **Batch 2 tools:** keyword-map each new page BEFORE building (one-primary-keyword
   rule); hub pages graduate from noindex when they reach 2+ live tools (per existing
   rule); re-check sitemap/canonical consistency on every batch.
8. **Internal linking (ongoing):** contextual links only when genuinely useful; never
   forced. (A daily-link cron exists — same rule applies.)
9. **Re-crawl quarterly:** build → local crawl → compare against this audit's baseline
   (21 pages, 0 duplicates, 0 broken links).

## Explicitly NOT planned

- Buying links, link schemes, or mass-produced thin pages.
- Fake reviews/testimonials/ratings/user counts.
- Guaranteeing first-page rankings, AI Overview placement, or ChatGPT citations.
- `tulyro.com` (or any domain) claimed before purchase; `example.com` kept until then.
