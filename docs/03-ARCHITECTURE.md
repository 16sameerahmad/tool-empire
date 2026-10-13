# Architecture — Tool Empire

Type: Stable. Change only with Sam's approval, and log it in MEMORY.md › Decisions Made.
Version: 1.1 — refined 2026-10-13

## Overview

```
Visitor → Vercel CDN (static HTML/JS/CSS) → tool runs locally in the browser
```

- No backend, no database, no auth, no API, no secrets, no environment variables.
- We operate no server that receives visitor data.
- The only third-party network traffic: GA4 page views, and whatever the browser's own speech engine does for Text to Speech.

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js, App Router, static export (`output: 'export'`) | Routing, metadata, static pages |
| Language | TypeScript, strict mode | Type safety |
| Styling | Tailwind CSS | Design tokens and layout (see DESIGN.md) |
| Font | Inter via `next/font`, self-hosted at build time | No runtime request to a font server |
| Icons | Inline SVG components | No icon library, no icon font |
| Hosting | Vercel, free tier, static | CDN, preview and production deploys |
| Analytics | GA4 + Google Search Console | Page views and indexing. Nothing else in v1. |
| Lint | ESLint (Next.js default config) | Code quality |
| Unit tests | Vitest, dev dependency only. **Proposed — Muse to approve in TASK-000.** | Tests for pure tool logic |
| Package manager | npm, lockfile committed | Dependencies |
| Runtime | Node.js LTS, version recorded in `.nvmrc` | Build and local dev |

Not in the stack, on purpose: backend, database, auth, API routes, middleware, payment, any paid service.

## Folder Structure

```
tool-empire/
├── README.md                 # short repo intro; points to docs/README.md
├── docs/                     # README, PRD, ARCHITECTURE, DESIGN, RULES, TASKS, MEMORY
├── src/
│   ├── app/                  # Next.js routes (see URL map)
│   │   ├── page.tsx          # homepage
│   │   ├── not-found.tsx     # 404
│   │   ├── calculators/      # hub page + one folder per tool
│   │   ├── text/
│   │   ├── dev/
│   │   ├── tools/
│   │   └── fun/
│   ├── components/           # Shared: Header, Footer, ToolCard, FAQ, ToolLayout, Breadcrumb, CopyButton
│   ├── tools/                # One folder per tool
│   │   └── <tool-slug>/
│   │       ├── logic.ts      # pure functions only
│   │       ├── logic.test.ts # test cases from TASKS.md
│   │       └── <Tool>.tsx    # UI that calls logic
│   ├── lib/                  # Shared utils: formatting, SEO helpers, config, tool registry
│   └── content/              # One .md file per tool page (written by Claude, reviewed by Muse)
└── public/                   # robots.txt, favicon, og-default.png (sitemap.xml is generated at build)
```

### Tool registry

`src/lib/tools.ts` is the single list of tools and pages. Each entry has: slug, title, cluster, URL, locale, one-line description, search keywords, related slugs, and live status. The homepage grid, search, hub pages, breadcrumbs, related tools and sitemap all read from it. Never hard-code a tool list anywhere else.

## URL / Cluster Map

| # | Page | URL | Locale |
|---|---|---|---|
| 1 | Age Calculator | /calculators/age-calculator | en |
| 2 | EMI Calculator | /calculators/emi-calculator | en-IN |
| 2 | Mortgage Calculator | /calculators/mortgage-calculator | en-US |
| 4 | BMI Calculator | /calculators/bmi-calculator | en |
| 6 | CGPA to Percentage | /calculators/cgpa-to-percentage | en |
| 3 | Word Counter | /text/word-counter | en |
| 5 | Text to Speech | /text/text-to-speech | en |
| 8 | Fancy Text Generator | /text/fancy-text-generator | en |
| 7 | Base64 Encoder/Decoder | /dev/base64-encoder-decoder | en |
| 9 | Invoice Generator | /tools/invoice-generator | en |
| 10 | Fake Text Generator | /fun/fake-text-generator | en |

Category hub pages: /calculators, /text, /dev, /tools, /fun. Each is a listing: short intro plus ToolCards. A hub with fewer than 2 live tools is `noindex,follow` and left out of the sitemap until a second tool ships.

URL rules:

- Slugs are lowercase with hyphens. A slug is permanent once indexed. Changing one needs Sam's approval and a 301 redirect.
- Pick one trailing-slash policy in `next.config` and use it in canonical URLs, sitemap, hreflang and internal links. Hermes records the choice in MEMORY.md. Check on the preview that the other form does not also return 200.
- Redirects live in `vercel.json`, not `next.config` (static export does not support them there).

### India / USA split

- Only EMI ↔ Mortgage is split in v1. One tool, two pages, one shared logic module.
- Separate pages, separate primary keywords, hreflang en-IN / en-US, single domain, no subdomain.
- EMI page: ₹, lakh/crore grouping, Indian banks and examples. Mortgage page: $, US examples. Genuinely different content, not a find-and-replace.
- Each page declares a self-referencing canonical and hreflang entries for both itself and its pair.
- The pair links to each other with descriptive anchors.
- Anti-cannibalization: the EMI page does not target "mortgage" keywords. The Mortgage page does not target "EMI" keywords. One primary keyword per page.

## Architectural Rules

- Tool logic is pure functions in `src/tools/<tool>/logic.ts`. No DOM access, no `window`, no `Date.now()` inside logic. UI calls logic.
- Anything that depends on the current date or time takes it as a parameter (for example `asOf`), so tests are deterministic.
- One shared `ToolLayout` for every tool page. No per-tool layout drift.
- Each tool has its own route folder (for example `src/app/calculators/age-calculator/page.tsx`).
- No tool may fetch from the network at runtime. The only exception is Text to Speech, which uses the browser's built-in speech API.
- Our code sets no localStorage, sessionStorage, IndexedDB or cookies, and does no fingerprinting. (GA4 sets its own cookies.)
- No third-party scripts except GA4.
- Tool state lives in React state only. Nothing persists.
- Every tool page ships: meta title and description, canonical URL, OG tags, FAQ schema, BreadcrumbList schema. See RULES.md › SEO.
- Mobile-first. Every page works at 375px.
- `dangerouslySetInnerHTML` is allowed only for JSON-LD, built with `JSON.stringify` from trusted content files. Never for anything a visitor typed.

## Static Export Constraints

Hermes must design for these from the start:

- No API routes, no middleware, no server actions.
- `images: { unoptimized: true }` (the default image optimizer needs a server). Prefer SVG. Avoid raster images except `og-default.png`.
- No `redirects`, `rewrites` or `headers` in `next.config`. Use `vercel.json`.
- Sitemap and robots are generated at build from the tool registry. If generation is not possible in static export, a build script writes `public/sitemap.xml`. Either way it cannot drift from the registry.
- `not-found.tsx` produces the 404 page.

## Content Contract

Each tool page has one file: `src/content/<slug>.md`. Claude writes prose only. Hermes renders it.

```
# <H1: tool name + primary keyword>
## Meta title
<≤ 60 characters, includes primary keyword>
## Meta description
<120–155 characters, includes primary keyword>
## Primary keyword
<one phrase>
## Intro
<one line shown under the H1>
## How to use
1. <step>
2. <step>
3. <step>
## Content
<400+ words, unique. Excludes How to use and FAQ.>
## FAQ
### <question>
<answer>
(5 to 7 questions)
## Related tools
<slugs from the tool registry, same cluster first>
```

- Visible FAQ text and FAQ JSON-LD must match exactly. Both come from this one file.
- Content is never copied across tools. The EMI and Mortgage pages are written separately.
- No figure without a label (verified, estimated, unknown). Unverifiable figures are left out.

## Deployment Architecture

### Environments

| Environment | Trigger | URL | Used for |
|---|---|---|---|
| Local | `npm run dev` | localhost | Development |
| Preview | Push to any branch (Vercel auto-deploy) | Vercel preview URL | Muse QA. Must not be indexable. |
| Production | Merge to `main` (Vercel auto-deploy) | Production domain (not yet decided) | Live site |

### Flow per task

Feature branch → push → Vercel preview → Muse QA on the preview → merge to `main` → Vercel deploys production → verify live → mark task complete.

### Configuration

- Environment variables: none. No secrets exist.
- The GA4 measurement ID and the production hostname are public values in `src/lib/config.ts`.
- GA4 loads only when the hostname equals the production hostname. Never on local or preview.
- Preview deployments: verify they return a noindex signal (header or meta). If not, add it.
- Rollback: promote the previous deployment in Vercel, or `git revert` the merge.
- Build output is the static `out/` folder produced by `next build`.

## Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Rendering | Static export | No server needed. Fast from the CDN. $0. |
| Tool logic | Pure TypeScript functions in `src/tools/` | Testable without a browser. Reusable. |
| Layout | One shared `ToolLayout` | Consistent pages. One SEO surface. |
| State | React state only, nothing persisted | Privacy. Matches the no-storage rule. Trade-off: refresh clears the form. |
| EMI / Mortgage | One logic module, two pages | Separate keywords without duplicated math. |
| India / USA | One domain, hreflang | Keeps authority in one place (locked). |
| Page content | Separate `src/content/` files | Claude edits prose without touching code. |
| Tool metadata | One tool registry | Prevents drift between grid, search, sitemap and related tools. |
| Font | `next/font`, self-hosted at build | No third-party request at runtime. |
| Analytics | GA4, page views only | Minimum tracking. No visitor input is ever sent. |
| Icons | Inline SVG | No extra dependency. |
| Tests | Vitest for pure logic (proposed) | Test cases in TASKS.md become automated tests. |
| Fake Text export | Browser-side PNG export | Keeps the tool browser-only. |
