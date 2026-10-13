# Tulyro — SEO Checklist Status

Source checklist: Sam's 4-section SEO checklist (via @getsocialgrow), 2026-10-13.
This file maps **every** checklist item to DONE / DONE-this-pass / BLOCKED /
PLANNED / NEEDS-SAM-DECISION, with evidence.

Verification (this pass, 2026-10-13, against the fresh `out/` build):
- `npm run build` OK (26 static pages) · `npm run lint` OK ·
  `npm run typecheck` OK · `npm test` 33/33 passed.
- Re-verification script over built HTML: all 11 tool pages — titles 51–60 chars,
  metas 150–160 chars, exactly 1 H1, visible FAQ = JSON-LD FAQ (6 = 6),
  `dateModified` present, 0 JSON-LD parse errors, canonicals on example.com.
- Playwright spot checks: homepage H1 = 1 (desktop + mobile), no mobile overflow
  at 390 px, EMI 100,000 @12% / 12 mo = ₹8,884.88, new PAA FAQ visible,
  0 console errors.
- Links: 0 broken link targets; no orphan content pages (`/404` excluded — error
  page by design, not a navigable page).

## Technical

| Item | Status | Evidence / note |
|---|---|---|
| GSC + GA4 setup | BLOCKED | Needs a live verified domain. siteUrl is still the `https://example.com` placeholder (`src/lib/seo.ts:4`); tulyro.com availability unverified — Sam must buy the domain. GA4 also needs Sam's cookie/consent decision (PRD Open Question 3: GA4 cookies vs "no popups"). |
| Sitemap to GSC + Bing | BLOCKED | Needs live verified domain + Search Console access. Sitemap itself verified valid: 18 URLs, lastModified dynamic (`src/app/sitemap.ts`), single-tool hubs excluded. |
| Indexing fixes | BLOCKED | Needs Search Console. Nothing to fix locally: 0 broken links, valid sitemap, canonicals present. Post-deploy: verify live indexability (no `noindex`, HTTPS, real 404 status). |
| robots.txt / noindex | DONE | `src/app/robots.ts` allows all + sitemap pointer. `src/app/layout.tsx` gates robots on `VERCEL_ENV`: non-production builds emit `noindex, nofollow` (expected pre-launch); production will be indexable. Single-tool hubs (Dev / Tools / Fun) are `noindex, follow` by design and excluded from the sitemap. |
| Canonicals | DONE | Verified in built HTML on all 11 tool pages. EMI ↔ Mortgage hreflang pair intact (`en-IN` / `en-US`) in `src/lib/seo.ts` — the sanctioned exception in `docs/seo/keyword-map.md`. |
| Core Web Vitals | BLOCKED (field data) | CrUX / PageSpeed need a live URL. Lab signals only: static export, First Load JS 114–136 kB (build output), no heavy assets, no webfonts from CDNs (next/font only). Measure for real after deploy. |
| Mobile-friendly | DONE | Playwright: no horizontal overflow at 390 px; responsive layouts per tool; mobile hero H1 fix verified (see Heading structure). |
| Crawlable JS content | DONE | Static export — all content (intro, How-to, About, FAQ) is in the HTML. Verified by parsing `out/*.html` directly, not by executing JS. Tool panels are interactive but their content is server-rendered. |
| 404s / redirects | DONE | 0 broken link targets. `out/404.html` exists (42,492 bytes), "Page not found" + home link. No redirect chains (static site, no redirects). HTTP 404 *status* is served by the host on deploy — verify post-launch. |
| Clean URLs | DONE | Trailing-slash clean paths, no parameters, no `.html` in links. |
| Breadcrumbs | DONE | Visible breadcrumb trail + matching BreadcrumbList JSON-LD (`src/components/Breadcrumb.tsx`, `src/lib/seo.ts`). |
| Orphan pages | DONE | Every content page has inbound links; 0 orphan content pages. (`/404` has no inbound links by design.) |
| Schema + test | DONE | All JSON-LD on all pages parsed with 0 errors (re-verified this pass). FAQ visible = JSON-LD on every tool page (6 = 6). SoftwareApplication, HowTo, BreadcrumbList, WebSite + Organization all present; no invented ratings/counts. |

## Quick wins

| Item | Status | Evidence / note |
|---|---|---|
| Low-CTR title/meta rewrites | BLOCKED | Needs GSC CTR data. No rewrites without evidence. |
| Cut-off / off-keyword titles | DONE | All 11 tool titles now 51–60 chars (EMI fixed this pass: 47 → 54, `src/lib/tools.ts`, keyword-map.md updated). Every title carries its primary keyword per `docs/seo/keyword-map.md`. Homepage title is 27 chars — short but valid; revisit with CTR data. |
| Page-2 page updates | BLOCKED | Needs GSC position data. Site not yet live. |
| People Also Ask answers | DONE-this-pass | 11 PAA FAQs added, one per tool page (`src/lib/content.ts`). Each question verified as a real user question via web search 2026-10-13 (competitor FAQ headings / guide titles). Answers are original wording, consistent with each tool's actual behavior. Visible FAQ = JSON-LD (6 = 6) verified in built HTML. |
| Refresh declining pages | BLOCKED | Needs GSC trend data. Site not yet live. |

## On-page

| Item | Status | Evidence / note |
|---|---|---|
| Search intent | DONE | `docs/seo/keyword-map.md`: one primary keyword per page, transactional intent; EMI ↔ Mortgage sanctioned exception. |
| Titles 50–60 | DONE | All 11 tool titles 51–60 after this pass. Hub/home titles are shorter — acceptable for non-landing pages; revisit with CTR data. |
| Unique metas | DONE | All 11 tool metas 150–160 chars, 0 duplicates. Hubs/legal metas unique (62–156 chars). |
| Heading structure | DONE-this-pass | **Real gap found and fixed:** homepage had 2 `<h1>` (desktop + mobile heroes, `src/app/page.tsx`). Mobile hero H1 → `<div>` with identical classes (visuals unchanged). All pages now exactly 1 H1 in built HTML. |
| Answer query in 2 lines | DONE | Every tool page intro is 1–2 sentences and directly answers the query (e.g. Age: "Find an exact calendar age from a date of birth…"; EMI: "Estimate an Indian loan's monthly EMI…"). Verified in `src/lib/content.ts`. |
| Images / alt | DONE | 0 `<img>` tags in built HTML — all icons are inline SVG. `og-image.png` carries alt text in OG metadata (`src/lib/seo.ts`). Logo is code-rendered with aria-label. |
| Link to key pages | DONE | Related-tools links, hub pages, footer, all-tools directory (`/tools/`). Daily internal-links cron continues incremental additions (max 2/day, never forced). |

## Content

| Item | Status | Evidence / note |
|---|---|---|
| Competitor keywords | DONE | `docs/seo/keyword-map.md` + `docs/seo/competitor-research.md` (prior pass). Reused; no new research needed this pass. |
| Low-KD keywords | BLOCKED | No paid KD data available. The research xlsx uses Semrush-modeled estimates + a competition-weakness score, labeled as estimates. Never invent KD numbers. |
| Cannibalization | DONE | `docs/seo/keyword-map.md` anti-cannibalization rules; one primary per page; EMI ↔ Mortgage sanctioned exception with hreflang. |
| Merge thin pages | DONE | No thin pages to merge: all tool pages 613–769 words (prior pass) + a 6th FAQ added this pass; hubs have intro copy; legal pages are not landing pages. |
| Topic clusters | DONE | Clusters exist: Calculators / Text / Dev / Tools / Fun + related-tools links. `docs/seo/content-plan.md` §D extends them with planned guides. |
| Feature / use-case pages | PLANNED | `docs/seo/content-plan.md` §A — 8 guides. Plan only, nothing built. |
| Comparison pages | PLANNED | `docs/seo/content-plan.md` §B — 4 honest comparisons (incl. EMI vs Mortgage). Plan only. |
| Best listicles | PLANNED | `docs/seo/content-plan.md` §C — 3 listicles of Tulyro's own tools. Dev-tools list explicitly blocked until a 2nd real dev tool ships (no thin one-item list). |
| Author bio / E-E-A-T | NEEDS-SAM-DECISION | **Do not invent a name/bio.** Current state: no bylines anywhere (deliberate — fake bylines are dishonest). Sam decides: keep no-bylines, or supply a real name/bio. |
| dateModified | DONE-this-pass | Was missing everywhere in JSON-LD — confirmed gap. Added truthful `dateModified: "2026-10-13"` via a named constant `contentUpdated` in `src/lib/seo.ts` (with a comment: bump ONLY on real content change, never auto-generated per build). Applied to SoftwareApplication JSON-LD on all 11 tool pages + WebSite JSON-LD on homepage. Verified in built HTML. No fake publish date added (would go stale without a review process). |

## Still blocked on Sam (unchanged)

- Buy a real domain (tulyro.com availability unverified) + supply a real contact email
  (still `contact@example.com` placeholder) — unblocks GSC/GA4, sitemap submission,
  indexing verification, CWV field data.
- Author bio decision (above).
- GA4 cookie/consent decision.
- Git push choice (device-flow `gh auth login` vs push from his PC) — repo
  `17sameerahmad/tool-empire` existence unconfirmed; no push made.
- Deploy go-ahead — none given; nothing deployed in this pass.
