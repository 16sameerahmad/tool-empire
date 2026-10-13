# Project Memory — Tool Empire

Type: Living. Hermes and Muse update this at the end of every session.
Last updated: 2026-10-13

## Decisions Made

Tags: **LOCKED** = never change. **PROPOSED** = made in the 2026-10-13 refinement pass, needs Sam's approval, then becomes LOCKED or is changed.
Dates marked "≤ 2026-10-13" mean the exact date was not recorded.

| Date | Decision | Rationale |
|---|---|---|
| ≤ 2026-10-13 | **LOCKED** Final 10 tools, in order: Age, EMI, Word Counter, BMI, Text to Speech, CGPA, Base64, Fancy Text, Invoice, Fake Text | Chosen from the 102-tool ranked research |
| ≤ 2026-10-13 | **LOCKED** Stack: Next.js static + Tailwind + Vercel free. No backend, no database, no auth. | $0, fast, nothing to secure or maintain on a server |
| ≤ 2026-10-13 | **LOCKED** Browser-only, no signup, no watermark, no popups | The winning formula: browser-only + no signup + no watermark + fast pages + real SEO content |
| ≤ 2026-10-13 | **LOCKED** Cluster-wise launch, Calculators first | A single niche caps growth. All niches at once destroys topical authority. |
| ≤ 2026-10-13 | **LOCKED** India/USA split pages + hreflang en-IN / en-US, single domain, no subdomain | Separate keywords and genuinely different content, without splitting domain authority |
| ≤ 2026-10-13 | **LOCKED** Design palette: Primary #6366F1, background #F8FAFC, surface #FFFFFF, text #0F172A, muted #64748B, border #E2E8F0. No other color as a primary. | Consistency |
| ≤ 2026-10-13 | **LOCKED** Free-first: $0 tools only. No paid service without Sam's explicit yes. | Sam's rule |
| ≤ 2026-10-13 | **LOCKED** Never invent numbers. Label figures verified / estimated / unknown. | Research figures are third-party modeled estimates |
| ≤ 2026-10-13 | Vibe Coding system adopted: 6 context files before any code, one task at a time | Stops "build the whole site" prompts |
| 2026-10-13 | **PROPOSED** EMI and Mortgage are one tool with two pages (separate URLs, one shared logic module). Not "same page". Not an 11th tool. | Resolves the conflict between PRD ("same page") and TASKS/ARCHITECTURE (separate page) while keeping the locked split-page rule |
| 2026-10-13 | **PROPOSED** Only EMI ↔ Mortgage is split by region in v1. GPA is a mode on the CGPA page. | No other split was decided. Avoids new scope. |
| 2026-10-13 | **PROPOSED** Gate A (cluster 1 live and indexed) must pass before Cluster 2 deploys to production. Cluster 2 may be built on preview first. | Applies "build topical authority first" in a checkable way |
| 2026-10-13 | **PROPOSED** Batch 2 and AdSense have separate gates (B and C). Thresholds are unknown and left for Sam. | PRD and TASKS used different wording ("first cluster ranks" vs "first 10 rank") |
| 2026-10-13 | **PROPOSED** Category hub pages (5), listing only. Hubs with fewer than 2 tools are noindex. | Breadcrumb needs a category page. Avoids thin indexed pages. |
| 2026-10-13 | **PROPOSED** Base64 slug is /dev/base64-encoder-decoder | Matches the slug pattern of every other tool |
| 2026-10-13 | **PROPOSED** Primary-strong #4F46E5 for button fills and links. #6366F1 stays the brand color for accents. | White on #6366F1 is 4.47 : 1, just under the 4.5 : 1 target (calculated) |
| 2026-10-13 | **PROPOSED** Vitest (dev-only) for unit tests of tool logic | Test cases in TASKS.md need a way to run |
| 2026-10-13 | **PROPOSED** One tool registry (`src/lib/tools.ts`) feeds grid, search, hubs, sitemap and related tools | Prevents drift |
| 2026-10-13 | **PROPOSED** BMI has a Metric/Imperial toggle. Invoice has a ₹/$ selector. | Needed for the USA audience and the India/USA split. Clarification, not a new tool. |

## Current Implementation State

- Research: DONE. 102-tool ranked sheet and strategy doc delivered.
- Vibe Coding system: ADOPTED. 6 context files created in docs/. README.md added and docs refined on 2026-10-13, awaiting Sam's approval to commit.
- Code: **no code is known to exist.** But a UI build was started and then stopped by Sam. What was left on disk or in a repo is **unknown**. Hermes must check at TASK-000 and report. Do not delete or reuse anything without Muse review.
- Repo: not confirmed. TASK-000 creates or confirms it.
- Current task: TASK-000 (repo setup), not started.
- Next steps: TASK-000 → (Sam's go-ahead) TASK-001 → TASK-002, 003 → Calculators cluster.
- Completed so far:
  - SEO research: 102 tools ranked (31 BUILD FIRST / 59 TEST / 12 SKIP)
  - Final 10 tools decided, in order
  - Strategy decisions: cluster-wise launch, India/USA split pages + hreflang, single domain, browser-only $0
  - 6 context docs: PRD, ARCHITECTURE, DESIGN, RULES, TASKS, MEMORY

## Known Issues

- UI build was started then STOPPED by Sam ("Ruko"). Do not restart UI work without his go-ahead. The state of any partial build is unknown.
- Claude has no API or bridge. Sam is the manual bridge for Claude content (copy-paste).
- Do not start UI or code builds on a bare "banado" ("build it") if Sam previously stopped that build. Confirm scope first.
- Five open questions need Sam (PRD.md › Open Questions): domain and contact details; gate thresholds; GA4 cookies vs "no popups"; GPA formula and CGPA multiplier source; hosting terms before AdSense.
- CGPA × 9.5 is estimated until Muse confirms a source.
- Vercel's free plan may be non-commercial only. Unverified. Check before AdSense.
- "JPG-to-PDF" and "tip" appear in audience search lists but are not in the final 10. Out of scope.

## Lessons Learned

- Research: head-term keywords are fortresses (iLovePDF, Canva, calculator.net). Small sites can rank on converter and AI-utility long-tail keywords.
- TinyWow is the closest model. Its formula (200+ tools, no signup, no watermark) is right, its execution is weak. We win on execution, not on a new formula.
- All traffic and volume figures from research are third-party modeled estimates. Never present them as verified.
- MCP: no MCP server can be added from the Muse chat. Stitch MCP lives on the PC (Claude Code / Cursor).
- Figma MCP: noted earlier as needing Figma Professional ($16/mo), with the free Starter ($0) having none. Price and plan details are unverified and may have changed.
- Refinement pass (2026-10-13): the docs disagreed on how EMI and Mortgage relate, what "rank" gates mean, where TASKS.md lives, and whether code existed. Put each rule in one place and have other files point to it.

## User Preferences

- Sam writes in Hinglish (Hindi and English mixed). Reply in the language he writes in.
- Docs before code. One task at a time. Never "build the whole site" in one prompt.
- Free-first. Any paid service needs his explicit yes.
- When he says "Ruko" (stop), stop. Do not resume that work without his go-ahead.
- He copy-pastes between Muse, Claude and Hermes. Keep outputs complete and save-ready.
- Plain, professional tone. No fluff, no marketing language.

## Important Constraints

- Locked decisions: see Decisions Made. Do not change them.
- No backend, database, auth, API, secrets or environment variables.
- Every tool runs 100% in the browser. Nothing a visitor types leaves the page. GA4 gets page views only.
- No ads in v1. AdSense only after Gate C.
- No paid service without Sam's explicit yes.
- Claude writes prose only. Never code.
- Never invent numbers. Label figures verified / estimated / unknown.
- No MCP server can be added from the Muse chat.

## Failed Approaches

| Approach | Why It Failed | Date |
|---|---|---|
| Starting the UI build before the docs were final | Sam stopped it ("Ruko"). Reason not recorded. | Unknown (before 2026-10-13) |
| Adding an MCP server from the Muse chat | Not possible. Stitch MCP lives on the PC. | Unknown |
| Figma MCP on the free plan | Reported as not available on Figma Starter. Unverified. | Unknown |

## Useful Commands

Scripts are created in TASK-000. Names below are the plan.

```
npm run dev          # local dev server
npm run typecheck    # TypeScript check
npm run lint         # ESLint
npm run test         # unit tests for tool logic
npm run build        # static export to out/
git switch -c feature/age-calculator
git commit -m "feat: add age calculator"
```

- Lighthouse: Chrome DevTools → Lighthouse → Mobile, on the preview URL.
- Network check: DevTools → Network, use the tool, confirm no requests.

## Things to Remember Next Session

1. Read MEMORY.md, then TASKS.md.
2. Do TASK-000 first. Check for leftovers from the stopped UI build and report.
3. TASK-001 (UI) needs Sam's explicit go-ahead.
4. Ask Sam the 5 open questions. Do not answer them for him.
5. Do not create DECISIONS.md, TEST_PLAN.md or SECURITY.md without his approval.
6. Confirm the PROPOSED decisions above with Sam, then mark them LOCKED or change them.
7. Update this file and TASKS.md at the end of the session.
