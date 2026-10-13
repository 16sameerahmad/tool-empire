# Technical Audit — Tulyro

**Audit date:** 2026-10-13 · **Audited:** `out/` static build (26 routes) + source.
**Tools:** open-seo-crawler (MIT, audit-only, local crawl of the built site) + manual
HTML/JSON-LD verification + Playwright. Cross-checked against the coverage areas of
two public SEO references (claude-seo plugin; SNLabat SEO-GEO-AEO skill) — used as
checklists only, nothing installed, nothing copied.
**Baseline:** pre-pass state was captured in git commit `d8ccc16` (Stitch theme as received).

## 1. Indexability — ⚠️ ONE DEPLOYMENT-CRITICAL ITEM

- `src/app/layout.tsx` sets `robots.index = (VERCEL_ENV === "production")`.
  On any non-Vercel-production build (local, preview, other hosts) **every page is
  noindex**. The crawler correctly flagged all 21 pages `noindex`.
- This is intentional (prevents preview indexing) but it is the **#1 pre-launch check**:
  after the real deploy, fetch the live homepage and confirm NO `noindex` meta and a
  `200` status. If the site is ever hosted outside Vercel, this gate must be reworked.
- Intentional noindex (correct): `/dev/`, `/fun/` (single-tool hubs), `/tools/`
  (directory). These are `noindex, follow` + self-referencing canonical — consistent.

## 2. Metadata

| Check | Result |
|---|---|
| Unique titles | ✅ 0 duplicates (crawler). All 11 tool titles ≤60 chars. |
| Unique meta descriptions | ✅ 0 duplicates (crawler). Tool + hub metas 150–160 chars with CTA. |
| H1 | ⚠️ Homepage has 2 H1s (desktop + mobile responsive variants, one hidden per breakpoint). All other pages have exactly 1. Kept deliberately: each viewport renders one visible H1; changing one to `<p>` would leave a viewport with no H1. Documented, low risk. |
| Heading hierarchy | ✅ Tool pages: H1 → H2 (How to use / About / FAQ / Related / Sources) → FAQ summaries. |
| Viewport | ✅ `<meta name="viewport" content="width=device-width, initial-scale=1">` (Next.js default). |
| Twitter cards | ✅ Fixed in this pass: `summary_large_image` on all pages (was missing). |
| OG tags | ✅ Title/description/url/siteName/image (1200×630) + alt on all pages. Tool pages gained OG images in this pass. |

## 3. Canonicals, robots, sitemap

- **Canonicals:** self-referencing on every page (added to home + hubs + legal in this
  pass; tool pages already had them). Crawler's "canonical points to another host"
  flags are an artifact of crawling via `127.0.0.1` while canonicals use the
  `https://example.com` placeholder — expected until the real domain is set.
- **robots.txt:** `User-Agent: * / Allow: /` + sitemap pointer. AI crawlers are NOT
  blocked — deliberate: the site wants AI-search discovery. Revisit only if abused.
- **sitemap.xml:** 18 URLs = `/` + 2 indexable hubs + 4 legal + 11 tools. Excludes the
  3 noindex pages. `lastModified` = build time. Crawler: sitemap_count 18, no
  non-200 URLs, no redirect chains.
- **hreflang:** EMI ↔ Mortgage pair only, self-referencing + cross-referencing, verified
  in emitted HTML. **x-default intentionally omitted:** there is no neutral-locale page
  (EMI is en-IN, Mortgage is en-US); pointing x-default at one would mislabel it.
  Revisit if a neutral/global variant is built.
- **HTTP status:** crawler: 21 pages 200, 0 3xx/4xx/5xx. Soft-404 probes (2) correctly
  returned 404. Custom 404 page exists (`out/404.html`, "Page not found" + home link).
  Note: the 404 *status* itself is served by the host (Vercel) — verify post-deploy.

## 4. Internal links

- Crawler: 0 broken internal links, 0 external links (before the WHO citation was
  added — now 1 verified external link on the BMI page), 0 redirect chains.
- Link depth: home (0) → 18 pages at depth 1 → 2 at depth 2. Every tool is ≤2 clicks
  from home (header/footer/hubs/directory).
- Anchors: mostly descriptive (tool titles, hub names). ToolCard links contain the tool
  title + description inside the same `<a>`, so anchor text is descriptive despite the
  visible "Launch Tool" label.

## 5. Structured data — ✅ valid, matches visible content

- 54 JSON-LD blocks across the site, **0 invalid** (parsed every block).
- Tool pages (11): FAQPage (5 Q/A) + BreadcrumbList (3) + HowTo (3 steps) + SoftwareApplication (Offer price 0).
- Homepage: WebSite + Organization (name "Tulyro", logo `/logo.svg`, no invented contact).
- Hubs/directory/legal (9): BreadcrumbList matching the visible breadcrumb.
- **Match check (verified):** HowTo steps = visible "How to use" list, FAQ questions +
  answers = visible FAQ accordion content, breadcrumb items = visible breadcrumb trail.
- FAQ/HowTo JSON-LD is emitted only where the visible content matches exactly.
- SoftwareApplication: `applicationCategory: UtilitiesApplication`, `operatingSystem:
  Any`, `offers: price 0 USD` — no invented ratings, counts, or reviews.
- Rich-result eligibility is NOT promised: HowTo/FAQ rich results depend on Google.

## 6. Mobile / accessibility / performance

- Responsive: screenshots at 1440px + 390px (home, age, EMI, BMI, hub); no horizontal
  overflow at 390px. Skip-links, focus-visible styles, aria labels on nav/search.
- Images: **0 `<img>` tags** sitewide (all icons are inline SVG); OG image has alt text;
  logo/favicons carry `aria-label`. No missing-alt issue possible in current markup.
- Performance (lab only — no field data exists pre-launch):
  - First Load JS: 103 kB shared; pages 114–136 kB (build output).
  - Local `domContentLoaded`: ~121 ms on the homepage (python http.server, localhost).
  - Fonts via `next/font` with `display: swap`. Static HTML — no JS needed for SEO content.
- **Core Web Vitals: BLOCKED.** No CrUX field data and no PageSpeed run is possible
  before the site is live on a public URL. Post-launch: run PageSpeed Insights +
  check CrUX; do not invent LCP/INP/CLS numbers now.
- Crawler "no compression / no cache-control / HTTP" flags are artifacts of the local
  python server — Vercel serves gzip/brotli, cache headers, and HTTPS automatically.
  Verify post-deploy.

## 7. Content depth

- Tool pages: 613–769 words each (crawler word count) — above the 500-word bar.
- Hub pages: Calculators 87 + new 74-word intro; Text 62 + new 61-word intro. Hubs are
  navigation pages; the intros make them non-thin.
- Legal pages: 42–158 words. Contact is thin (42) but it is a contact page, not a
  landing page — acceptable.
- Homepage: 603 words, 2 H1 variants, 5 H2s.

## 8. GEO / AEO / agent-readiness

- **Citable passages:** every tool page opens with a definitional intro + a first
  paragraph in "X is/does …" form; one 40–60-word direct-answer FAQ per tool page.
- **Entity:** consistent "Tulyro" naming everywhere; Organization schema on home.
- **Sources:** 1 verified external citation (WHO BMI cutoffs, URL fetched and confirmed
  2026-10-13). Other pages cite no external sources — a known gap; add only verified
  URLs, never from memory.
- **AI-crawler access:** robots allow all; all SEO content (intro, how-to, about, FAQ)
  is in static HTML — no JS-only blocks. Tool *interaction* needs JS; tool *content*
  does not.
- **llms.txt:** added at `/llms.txt` — brand, promise, all 11 tools + pages, honest
  placeholder note. No claims of AI citations/Overviews.
- **E-E-A-T gaps (documented, not faked):** no author bylines or credentials anywhere
  (adding a fake author would be dishonest); About page exists; disclaimers present on
  EMI/Mortgage (not advice), BMI (screening, not diagnosis), CGPA (estimated), Invoice
  (not accounting/legal advice), Fake Text (label fictional conversations). Post-launch:
  add the real owner's name when decided (blocked on Open Question 1: brand/domain/
  contact) — never invent one.
- **Deliberately not done:** visible publish/update dates on tool pages (a hardcoded
  date would go stale without a real review process; sitemap `lastmod` covers
  freshness); snippet tables (would need new components + visual changes — future);
  question-phrased H2s (FAQ `<summary>` elements already carry the questions).

## 9. Honesty fixes in this pass

- "Trending:" → "Quick links:" (no popularity data exists).
- "Most Popular Tools" → "Featured Tools"; "Popular Utilities" → "Featured Utilities".
- No fake stats, testimonials, ratings, or user counts anywhere (verified by grep).
- Hero widgets (EMI simulator, Age snapshot) use the real logic, not demo numbers.
