# Refinement Notes — Tool Empire context docs

Date: 2026-10-13
Delivered: README.md (new) + PRD, ARCHITECTURE, DESIGN, RULES, TASKS, MEMORY, all under `docs/`.

Source note: I could not open the vibe-coding-context-kit repo from here. I applied the upgrade list in the supplement brief section by section. If the repo's headings differ, tell me and I will align them.

All 8 locked decisions are unchanged.

## Changes made

### README.md (new)
- Added: Stable vs Living file map, "when to read what" table, conflict-precedence order, who updates what.
- Added: note that DECISIONS, TEST_PLAN and SECURITY are not created yet.

### PRD.md
- **Fixed:** EMI/Mortgage conflict. One rule now: one tool, two pages (EMI en-IN, Mortgage en-US), one logic module. Applied in PRD, ARCHITECTURE, TASKS, MEMORY.
- **Fixed:** "first cluster ranks" (PRD) vs "first 10 rank" (TASKS). Replaced with three named gates: A (cluster 1 live and indexed), B (Batch 2), C (AdSense).
- **Fixed:** "Find the tool on Google" was untestable. Now a post-launch Search Console check.
- Clarified: the numbered tool order is priority. Build order follows clusters.
- Clarified: only EMI/Mortgage is region-split in v1. GPA is a mode on the CGPA page.
- Added: User Flows (4), Functional Requirements as "The system shall…" with IDs (general + all 10 tools), Non-Functional Requirements, Browser Support, Open Questions.
- Added: edge cases per tool (leap day, zero interest, BMI boundaries, rounding, Unicode gaps, invalid Base64, and more).
- Added: measurable performance targets (Lighthouse mobile, LCP, CLS, TBT, JS budget). Labeled as targets.
- Added: Figures and Assumptions table with verified / estimated / assumption / target / unknown labels.
- Added to Out of Scope: contact form, dark mode, JPG-to-PDF and other per-tool extras.
- Clarified (not new scope): BMI unit toggle (needed for USA users), Invoice ₹/$ selector.
- Added: category hub pages and 404 (breadcrumb needs a category page).

### ARCHITECTURE.md
- Added: Tech Stack table, Deployment Architecture (environments, flow, no env vars, rollback), Architecture Decisions table.
- Removed: nothing to delete. No Backend / Database / API / Authentication sections were filled. One line states they do not exist.
- **Fixed:** TASKS.md location. All context files live in `docs/`. Root README.md is a short pointer.
- Added: tool registry, so grid, search, sitemap and related tools cannot drift.
- Added: Content contract for `src/content/*.md`. Defines what Claude delivers and what "400+ words" counts.
- Added: static-export constraints (no redirects in `next.config`, image optimizer, sitemap generation, 404).
- Added: GA4 loads on the production hostname only. No env vars needed.
- **Changed (flag):** Base64 slug to /dev/base64-encoder-decoder to match every other slug.
- Clarified: Text to Speech exception, and that GA4 is the other third-party traffic.
- Added: date logic takes "as of" as a parameter, so tests are deterministic.
- Proposed: Vitest (dev-only). Needs Muse's OK.

### DESIGN.md
- Added: spacing scale, shadows, border-radius table, component states, accessibility section, "Things to Avoid" checklist.
- **Flag:** white on #6366F1 calculates to 4.47 : 1, just under 4.5 : 1. Added Primary-strong #4F46E5 for button fills and links. #6366F1 is unchanged and stays the brand color. Needs Sam's OK (see MEMORY, PROPOSED).
- Added: Success-strong #047857, because Success #059669 fails for text (3.77 : 1).
- Added: full type scale. "No font sizes outside the scale" needs one.
- Added: homepage grid, "Skip to tool" link, native `<details>` for FAQ so answers are in the HTML.
- Removed: modals from the radius table. "No popups" is locked.
- Contrast ratios are calculated by hand. Re-verify with a tool.

### RULES.md
- Added: Dependencies, Error Handling, Communication (before/after), "Never assume a file, function or dependency exists", final rule.
- Added: Content rules for Claude, Definition of Done, locked-decision list, stop-if-Sam-stopped rule.
- Added: GA4 sends page views only. Visitor input is never sent anywhere.
- Added: BreadcrumbList schema, meta length targets, "FAQ rich results are not a success metric".

### TASKS.md
- Reformatted as the living board: Current Milestone, Current Objective, Priority, In Progress, Next, Blocked (with reasons), Backlog, Completed. All existing tasks kept.
- **Fixed:** TASK-008 Mortgage is now the second page of tool #2, built on TASK-005 logic.
- **Fixed:** TASK-001 is Blocked until Sam's go-ahead, because MEMORY says UI work was stopped.
- Added: TASK-007b (GPA mode), Blocked, because no formula exists.
- Added: Task Specs for every task with done-when criteria and concrete test cases.
- Added: TASK-000 check for leftovers from the stopped UI build.
- Added: TASK-016 preconditions (hosting terms, EEA/UK consent, Sam's yes).
- All expected values are hand-calculated and labeled so. Hermes confirms them before locking tests.

### MEMORY.md
- Restructured into the kit's nine sections. All existing content kept.
- **Fixed:** "No code written yet" vs "UI build was started". Now stated as unknown, to be checked in TASK-000.
- Added: Decisions Made table with LOCKED and PROPOSED tags. 10 proposed items need Sam's approval.
- Added: labels on the Figma price and plan claims (unverified).

## Recommended additions (not created)

For Sam to approve separately.

**DECISIONS.md**
- Formal decision log. One entry per decision: ID, date, context, decision, alternatives considered, status (locked / proposed / superseded), who approved.
- Seeded from MEMORY.md › Decisions Made. MEMORY then keeps only a short pointer.
- Rule: any change to a locked decision needs a new entry with Sam's approval.

**TEST_PLAN.md**
- Per-tool test matrix moved out of TASKS.md › Task Specs.
- Manual QA checklist: 375 / 768 / 1440px, keyboard-only pass, Network-tab check, invalid and empty input.
- Lighthouse mobile thresholds and how to run them. Browser and device matrix.
- SEO checks per page: meta, canonical, OG, JSON-LD, hreflang pair, sitemap entry.
- Regression list across tools, and a pre-production release checklist.

**SECURITY.md**
- Zero-secrets policy and what to do if a secret is ever committed.
- Input validation rules per field type. XSS rules (no HTML from input, JSON-LD only).
- Third-party script allowlist (GA4 only) and dependency policy, including `npm audit` before release.
- Security headers and a Content Security Policy in `vercel.json`.
- Privacy claim verification ("nothing leaves your browser"), GA4 cookie and consent decision, Text to Speech disclosure.

## Open questions for Sam

1. Final domain, brand name, owner name and contact email? Needed before TASK-002 and TASK-003 go to production.
2. What counts as "real traffic" (AdSense gate) and "first cluster ranks" (Batch 2 gate)? No threshold is set. None is assumed.
3. GA4 sets cookies. Add a minimal non-popup notice, limit GA4, or accept as is? "No popups" is locked, so nothing was changed.
4. GPA mode: which conversion (4.0 scale to percentage, or CGPA to GPA) and which source? Also confirm CBSE × 9.5 as the CGPA default.
5. Vercel's free plan may be non-commercial only (unverified). Before AdSense, approve a free alternative host or a paid plan?
