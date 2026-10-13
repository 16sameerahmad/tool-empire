# Website Audit — Baseline

**Site:** https://tulyrotools.vercel.app · **Repo:** github.com/16sameerahmad/tool-empire
**Audit date:** 2026-10-14 (first audit run, AUDIT-ONLY — no changes made)
**Engine:** Website Audit, Security & Continuous Improvement Engine (locked 2026-10-14)
**Working copy:** `/home/hatch/workspace/te-review/tool empire website`

## What this site is

Next.js **static export** (`output: "export"`, `trailingSlash: true`). No backend, no API
routes, no auth, no database, no cookies, no file uploads, no user accounts, no server
logs. All 11 tools run 100% in the browser. Deployed on Vercel (Hobby), auto-deploy on
push to `main`. Contact email: Tulyrotools@gmail.com.

## Verified baseline (this run)

| Metric | Value | How verified |
|---|---|---|
| Routes live (sitemap) | 23 URLs, all HTTP 200 | curl of every sitemap URL, 2026-10-14 |
| Pages | 31 (26 pre-guides + /guides/ + 4 guides) | git tree + sitemap |
| Sitemap | 18 → 23 URLs after Batch 1 | live sitemap.xml |
| Robots | `Allow: /` + sitemap pointer | live robots.txt |
| Canonical (homepage) | `https://tulyrotools.vercel.app/` | live HTML head |
| Robots meta (homepage) | `index, follow` | live HTML head |
| Unknown URL | 308 → trailing-slash → **404** (correct) | curl -L |
| /api/hello | 308 → 404 (no API routes exist) | curl |
| Title (homepage) | "Free Browser Tools \| Tulyro" | live HTML head |
| JSON-LD script tags (EMI page) | 1 (contents not re-validated this pass) | live HTML grep |
| console.log in src/ | 0 | grep |
| TODO / FIXME / HACK in src/ | 0 | grep |
| aria-* markers | present in 10 components (Header 11, ToolPanel 20, ToolLayout 10) | grep counts |
| <img> alt attributes | 0 found (icons appear to be inline SVG components — not confirmed as a gap) | grep |
| Git history | 9 commits; Batch 2 (GEO/AEO, `09499e7`) landed during this audit | git log |
| Working tree | clean except untracked `docs/seo/*.md` (from the §10 docs agent) | git status |

## Reused verified facts (prior passes, NOT re-verified this run)

These were verified in earlier passes and are carried forward as the baseline. This
audit did **not** re-run them because the sprint agent (Batch 2) held the tree and
this run is audit-only (no builds, no tests that write):

- First Load JS 103–136 kB · 3 production deps (next 15.5.27, react 19.1.0, react-dom 19.1.0)
- Tests 33/33 passing (pre-Batch-2 count) · 0 third-party scripts · public/ 32 KB
- 54 JSON-LD blocks (site-wide, pre-Batch-2 count) · GSC verified via meta tag · sitemap status Success
- ToolPanel.tsx is a single 1,361-line file (maintainability risk, not a bug)
- Content lives in `src/lib/content.ts`, not `src/content/*.md` (docs divergence, known)

## NOT verified in this run (queued)

- **Build / lint / typecheck / tests** — owned by the sprint agent right now; re-verify in the weekly run after Batch 2 lands.
- **JSON-LD validity** (schema parse + Rich Results shape) — script tags exist; contents not validated.
- **Real-browser rendering / mobile layout** — no screenshots taken (no browser run in this pass). Overflow risks assessed from code only (see bugs.md).
- **Dependency vulnerabilities** — `npm audit` blocked by egress policy (see security.md).
- **TLS certificate expiry date** — chain validates, but expiry could not be read via openssl (proxy blocks direct handshake). Vercel auto-renews; confirm in dashboard.
- **Git-history secret scan** — working tree grep is clean; full `git log -p` history scan not run.
- **TTS real-voice check** — still Sam-side (headless has no voices).

## Baseline verdict

The site is live, fully indexed-ready (sitemap Success), all routes returning 200, no
verified functional bugs found in this pass (see bugs.md: 0 verified bugs). The main
open risks are hardening headers (missing CSP etc.), unverified dependency audit, and
content/feature gaps — all queued in roadmap.md.
