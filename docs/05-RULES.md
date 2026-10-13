# Development Rules — Tool Empire

Type: Stable. Change only with Sam's approval, and log it in MEMORY.md › Decisions Made.
Version: 1.1 — refined 2026-10-13

Final rule: **Understand first. Plan second. Code third. Test last.**

## Who Does What

- **Sam:** owner. The manual bridge: copy-pastes between Muse, Claude and Hermes. Approves scope, spend and changes to stable docs.
- **Muse:** strategy, specs, SEO briefs, QA. Reads every tool before it ships.
- **Claude:** page content (400+ words), FAQs, meta descriptions, blog posts. Prose only. Never code.
- **Hermes (on Sam's PC):** builds the Next.js site, implements tools, runs tests, deploys to Vercel.
- **Single source of truth:** this repo. Specs and content live in files, never only in chat.

## Locked Decisions

Never change these. The full list with rationale is in MEMORY.md › Decisions Made.

- Final 10 tools and their order
- Stack: Next.js static + Tailwind + Vercel free. No backend, no database, no auth.
- Browser-only, no signup, no watermark, no popups
- Cluster-wise launch, Calculators first
- India/USA split pages + hreflang, single domain
- Design palette. No other color as a primary.
- Free-first ($0 tools only). No paid service without Sam's explicit yes.
- Never invent numbers. Label figures verified / estimated / unknown.

## General

- Use TypeScript, strict mode.
- Reuse existing components. Do not duplicate logic.
- Keep functions small. One tool = one folder.
- Do not modify unrelated files.
- Never assume a file, function or dependency exists. Verify first.
- Never invent numbers (traffic, volumes, prices). Label every figure verified / estimated / unknown.
- Free-first: $0 tools only. No paid service enters the stack without Sam's explicit yes.
- One task at a time. Never "build the whole site" in one prompt.
- If the task is unclear, or the docs disagree, stop and ask. Do not guess.
- If Sam stopped a piece of work, do not restart it without his go-ahead. Confirm scope first.

## Before Coding

1. Read PRD.md, ARCHITECTURE.md, DESIGN.md, RULES.md, TASKS.md, MEMORY.md.
2. Inspect the existing implementation. Check what exists before adding anything.
3. Make a plan. For a large change, write it down first.
4. State what you found, your plan, and the files you will touch (see Communication).

## Dependencies

- Do not install a dependency unless it is necessary. Check what is already installed first.
- Prefer built-in browser APIs (clipboard, print, `Intl`, `TextEncoder`, `speechSynthesis`) over libraries.
- Every new dependency: free, with an open license, and reported in the task summary with name, purpose, size and license. Muse approves it before merge.
- Test tooling is dev-only. Nothing ships to the browser that is not needed.
- No paid package, API or service. No dependency that phones home.

## Error Handling

- Never silently swallow an error. No empty `catch`. Handle it or surface it.
- User-facing errors are plain language: what is wrong and how to fix it. No stack traces, no codes.
- Invalid input shows an inline message. It never crashes the page or leaves it blank.
- No `console.log` left in committed code.

## Communication

Before implementing, state:

- **Found:** what exists now and what is relevant.
- **Plan:** the steps you will take.
- **Files affected:** the list.

After implementing, report:

- **Changed:** what you changed.
- **Tested:** what you ran and the result.
- **Remaining issues:** anything open, or "none".

Claude, for content: state the word count, primary keyword, and any claim that needs verification.

## UI

- Follow DESIGN.md exactly. Same `ToolLayout` for every tool page.
- Mobile-first, responsive at 375 / 768 / 1440.
- Include empty, error and (where relevant) loading states.
- No signup walls, no watermarks, no popups.
- Use tokens from DESIGN.md. No one-off inline styles.

## SEO (every tool page, no exceptions)

- Unique meta title (≤ 60 characters) and description (120–155 characters) with the primary keyword.
- Canonical URL. OG tags. FAQ schema (JSON-LD). BreadcrumbList schema (JSON-LD).
- Visible FAQ text matches the JSON-LD exactly.
- Unique 400+ words of content (excluding How to use and FAQ). Never copied across tools.
- One H1 per page. One primary keyword per page.
- India/USA split pages (EMI ↔ Mortgage only in v1) with hreflang en-IN / en-US and genuinely different content.
- Slugs are permanent once indexed. Changes need Sam's approval and a 301.
- Preview deployments must not be indexable.
- FAQ schema is required, but Google shows FAQ rich results for few sites (estimated). Do not report rich results as a success metric.

## Content (Claude)

- Prose only. Follow the format in ARCHITECTURE.md › Content contract.
- Write for the visitor first. No keyword stuffing.
- No figure without a label. Leave out figures that cannot be verified.
- India pages use ₹, lakh/crore and Indian examples. US pages use $ and US examples.
- BMI, EMI and Mortgage pages say the result is informational and not medical or financial advice.
- The Fake Text Generator page presents the tool as for mockups and entertainment.
- The Text to Speech page discloses that some browser voices may send text to the browser vendor.
- State the assumptions each tool makes (for example reading speed, the CGPA multiplier, the leap-day rule).

## Tool Correctness

- Every tool's math is verified against a known formula and 3 test cases: normal, edge, invalid.
- Test cases live in TASKS.md › Task Specs, and become unit tests in `logic.test.ts`.
- Expected values in specs are labeled hand-calculated. Hermes confirms them independently (for example with a spreadsheet function) before locking them into a test.
- Money uses integer minor units. Dates use local time and take "today" as a parameter.

## Security

- No API keys, secrets or environment variables exist in this project. Never add one.
- Validate all user input. Never use `eval()` or `new Function()` on input.
- No third-party scripts except GA4. GA4 loads only on the production hostname.
- GA4 sends page views only. Never send anything a visitor typed to GA4 or anywhere else.
- Never render visitor input as HTML. `dangerouslySetInnerHTML` is for JSON-LD only.
- Verify "no network request while using a tool" in the browser Network tab, for every tool.

## Testing

After each tool, run `typecheck`, `lint`, `build` and the unit tests. Fix failures before moving on.

Manual checks:

- 375px and 1440px
- The 3 test cases from the task spec, plus invalid input and empty input
- Keyboard only: reach every control, see focus, operate it
- Network tab: no request caused by using the tool
- Lighthouse mobile on the preview: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95

## Git

- Small commits, one tool per commit: `feat: add age calculator`.
- Branch per tool: `feature/age-calculator`. Merge only after QA pass.
- Never push broken builds to `main`.
- Do not commit secrets, build output (`out/`, `.next/`) or `node_modules`.

## Definition of Done (every task)

- [ ] Task spec requirements met, with every test case passing
- [ ] `typecheck`, `lint`, `build` and unit tests pass
- [ ] Checked at 375px and 1440px, by keyboard, and with invalid and empty input
- [ ] Content file exists in `src/content/`, matches the Content contract and has passed Muse review
- [ ] SEO fields present (see SEO)
- [ ] Network tab shows no request from using the tool
- [ ] Preview deployed and checked by Muse
- [ ] Task card moved in TASKS.md, and MEMORY.md updated if anything changed
