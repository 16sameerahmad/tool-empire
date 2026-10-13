# Tulyro — Baseline Audit (§1)

**Engine:** MUSE Autonomous SEO Growth & Competitor Intelligence Engine (§1 — Audit and baseline).
**Baseline snapshot date:** 2026-10-13 (pre-launch, pre-sprint). Site went live 2026-10-14.
**Status:** This is the pre-sprint baseline. Sprint batch 1 (commit `e871f83`) landed after this snapshot — see "After this snapshot" at the bottom. Re-measure before treating any figure below as current.

## 1. Site identity

| Field | Value |
|---|---|
| Brand | Tulyro |
| Live URL | https://tulyrotools.vercel.app |
| Repo | https://github.com/16sameerahmad/tool-empire (branch `main`, public) |
| Framework | Next.js 15.5.27, static export (`output: "export"`, `trailingSlash: true`) |
| Hosting | Vercel (Hobby), project `tulyrotools` |
| Contact email | Tulyrotools@gmail.com |

## 2. Routes / pages (baseline: 26 static pages)

- 1 homepage (`/`)
- 5 hub pages: `/calculators/`, `/text/`, `/dev/`, `/fun/`, `/tools/` (Dev / Tools / Fun are single-tool hubs — `noindex, follow` by design, excluded from sitemap)
- 11 tool pages: Age, EMI, Mortgage, BMI, CGPA (calculators); Word Counter, Text to Speech, Fancy Text (text); Base64 (`/dev/base64-encoder-decoder`); Invoice (`/tools/invoice-generator`); Fake Text (`/fun/fake-text-generator`)
- 4 legal pages: `/about/`, `/contact/`, `/privacy/`, `/terms/`
- 1 custom 404 page

## 3. Performance / code (baseline measurements)

| Metric | Value | Source |
|---|---|---|
| First Load JS | 103–136 kB (shared 103 kB; home 119 kB; tool pages 136 kB) | Fresh `npm run build` output, read-only audit 2026-10-13 |
| Production dependencies | 3 — next 15.5.27, react 19.1.0, react-dom 19.1.0 | `package.json` |
| `public/` total size | 32 KB — `og-image.png` 19 KB (1200×630), `logo.svg` 521 B, `favicon.svg` 369 B | Read-only audit |
| Tests | 33/33 passing (10 test files) | `npm test` |
| `console.log` / `console.error` / `console.warn` | 0 | Audit grep |
| Third-party scripts | 0 | Audit |
| CDN font requests | 0 (next/font self-hosted) | Audit |
| localStorage / sessionStorage / IndexedDB / cookies set by site code | 0 | Audit |
| `fetch` / axios calls in site code | 0 (all tools run locally in the browser) | Audit |
| `dangerouslySetInnerHTML` | 8 occurrences, all JSON-LD via `JSON.stringify` only | Audit |

## 4. Content (baseline)

- Tool pages: 613–769 words each (pre-checklist measurement), 6 FAQs each after the checklist pass (visible FAQ = JSON-LD FAQ, verified 6 = 6).
- AEO: 40–60-word direct answer per tool page (verified 45–55 words).
- Hub intro copy: Calculators 74 words, Text 61 words.
- BMI page cites WHO (URL fetched + verified 2026-10-13).
- No fake author bylines (deliberate — never invent a name/bio; decision pending with Sam).

## 5. SEO / GEO / AEO (baseline)

- JSON-LD: 54 blocks, 0 parse errors (HowTo + SoftwareApplication on all 11 tools, price 0, no invented ratings; WebSite + Organization on home; BreadcrumbList on hubs/legal).
- Titles: all 11 tool pages 51–60 chars. Metas: 150–160 chars (see known gap below).
- Canonicals: present on all tool pages; EMI ↔ Mortgage hreflang pair (`en-IN` / `en-US`) — sanctioned exception.
- Sitemap (baseline): 18 URLs, `lastmod` dynamic. Single-tool hubs excluded.
- `robots.txt`: `Allow: /` + sitemap pointer.
- `public/llms.txt`: present (honest, no invented claims).
- Twitter cards: `summary_large_image` on all tool pages.
- `VERCEL_ENV` gate: non-production builds emit `noindex, nofollow` (expected pre-launch); production is indexable.

## 6. Live verification (2026-10-14, via curl)

- Homepage: HTTP 200, no `noindex`, canonical `https://tulyrotools.vercel.app/`, title "Free Browser Tools | Tulyro".
- Unknown URL: real HTTP 404 status.
- Sitemap: HTTP 200, `Content-Type: application/xml`.
- robots.txt: `Allow: /` + sitemap pointer.
- GSC: property `https://tulyrotools.vercel.app/` verified 2026-10-14 via meta-tag method. Sitemap submitted → transient "Couldn't fetch" → status **Success** (2026-10-14).

## 7. Known gaps at baseline (not hidden)

| Gap | Status |
|---|---|
| 5 meta descriptions at 157–160 chars (BMI, CGPA, Base64, Mortgage, Fancy) — RULES.md wants ≤155 | Fixed in sprint batch 1 (`e871f83`, "meta trims to <=155"). Re-verify in next audit. |
| Dead file `src/components/ToolRow.tsx` (zero importers) | Removed in sprint batch 1 (`e871f83`). |
| Stray `bg-green-400` status dot in `ToolPanel.tsx` | Replaced with token color in sprint batch 1 (`e871f83`). |
| GA4 not implemented | BLOCKED — pending Sam's cookie/consent decision (PRD Open Question 3: GA4 cookies vs "no popups"). No GA4 code anywhere; privacy page says "when analytics is enabled". |
| GSC data ~zero | EXPECTED — site went live 2026-10-14. No clicks/impressions conclusions possible yet. See `weekly-performance.md` (insufficient data). |
| Bing Webmaster | NOT DONE — Sam-side, queued. |
| Author bio / E-E-A-T bylines | NEEDS SAM DECISION — none present, never invent. |
| Real domain (tulyro.com) | NOT DONE — availability unverified; site lives on the Vercel subdomain. AdSense approval on a vercel.app subdomain is uncertain — custom domain recommended before applying. |
| PageSpeed / CrUX field data | NOT MEASURED — needs live URL + time; lab signals only at baseline. |

## 8. After this snapshot (do not confuse with baseline)

- Sprint batch 1 committed as `e871f83` (2026-10-14): 4 guides + `/guides/` index, meta trims, ToolRow removal, token status dot. Live sitemap is now **23 URLs** (18 + 5 guides), verified via curl 2026-10-14. The 18-URL figure above is the pre-sprint baseline, kept for comparison.
- Sprint batch 2 (GEO/AEO) in progress at time of writing — see `implementation-log.md` IN PROGRESS section.

## 9. What this baseline does NOT claim

- No traffic, ranking, CTR, or volume numbers exist yet — GSC has ~zero data. Any such number would be invented.
- No PageSpeed/CrUX field scores (lab signals only).
- No competitor traffic/rankings (competitors' private analytics are inaccessible; only public signals are tracked — see `competitor-research.md` / `competitor-tracking.md`).
