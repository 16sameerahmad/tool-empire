# Website Audit — Bugs

**Audit date:** 2026-10-14 · **Method:** read-only — live curl checks + code reading. No builds,
no tests run, no browser screenshots (audit-only constraint).
**Severity scale:** Critical (site/tool broken) · High (wrong output or major UX break) ·
Medium (degraded UX or edge-case wrongness) · Low (cosmetic / maintainability).

## VERIFIED bugs: NONE

No verified functional bug was found in this pass:

- **All 23 sitemap URLs return HTTP 200** (curl, 2026-10-14).
- **Unknown URL returns a real 404** (after the expected trailing-slash 308 redirect).
- **Copy buttons** in ToolPanel have try/catch with user-visible fallback notices
  ("Could not copy. Select the text and press Ctrl+C…") — failure is handled, not swallowed.
- **Copy buttons are disabled when there is nothing valid to copy** (`disabled={!valid}`,
  `disabled={!text}`) — no empty-copy path found.
- **Validation errors render in `role="alert"` boxes** (ErrorBox / error paragraphs).
- **No TODO/FIXME/HACK markers** in `src/`. **No `console.log`** in `src/`.
- **Overflow handling present:** `overflow-x-auto` on the wide table container,
  `break-words` on fancy-text output, `overflow-hidden` on progress bars.

## Hypotheses (NOT bugs until reproduced)

| # | Candidate | Evidence | Status | Severity if real |
|---|---|---|---|---|
| H1 | JSON-LD content may be stale/invalid on some pages | 1 script tag on EMI page; contents not parsed this pass | UNREPRODUCED — validate with a JSON-LD parser in the weekly run | Medium (SEO) |
| H2 | Mobile overflow on long tool outputs (e.g. Fancy Text, Invoice) | Code shows break-words / overflow-x-auto, but no screenshot proof | UNREPRODUCED — needs real-device/browser screenshot check | Medium |
| H3 | TTS may sound robotic / pick no voice on some browsers | Headless has no voices; Sam-side manual check still pending | UNREPRODUCED — needs real-browser check | Medium (UX) |
| H4 | `<img>` alt coverage | `alt=` count is 0; icons look like inline SVG components, so this is likely N/A | UNREPRODUCED — confirm no `<img>` tags exist | Low |
| H5 | ToolPanel.tsx at 1,361 lines may hide stale-output bugs on mode switches | Prior audit fixed one stale-output class (TTS onerror); pattern not re-audited | UNREPRODUCED — review state-reset paths in weekly run | Medium |

## Known open items (from prior passes, not bugs)

- **GPA mode BLOCKED** pending formula + source (docs decision — do not build).
- **CGPA ×9.5 labeled "estimated"** — intentional, correct.
- **Batch 2 (GEO/AEO) landed during this audit** (`09499e7`) — tree clean; no conflicts.
- **GA4 not implemented** — pending Sam's cookie/consent decision.
- **Author bio** — real name vs "Tulyro Team" pending Sam (never invent).

## Reproduction standard

A hypothesis becomes a VERIFIED bug only with: steps to reproduce + expected vs actual
behavior + evidence (curl output, screenshot, or failing test). Until then it stays in
the hypothesis table. The weekly run owns reproduction (browser screenshots + build/tests).
