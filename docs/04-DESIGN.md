# Design System — Tool Empire

Type: Stable. Change only with Sam's approval, and log it in MEMORY.md › Decisions Made.
Version: 1.1 — refined 2026-10-13

## Style

Modern, minimal, professional. Tool-first: the tool itself is the hero, not marketing copy. Light theme only in v1.

## Colors

Locked palette. No other color is used as a primary.

| Token | Hex | Use |
|---|---|---|
| Primary | #6366F1 | Brand accent: icon squares, focus rings, active indicators, large graphics |
| Primary-strong | #4F46E5 | Button fill, text links, active nav text (accessible shade of Primary) |
| Primary-pressed | #4338CA | Pressed state for buttons |
| Primary-tint | #EEF2FF | Selected background, icon square background |
| Background | #F8FAFC | Page background |
| Surface | #FFFFFF | Cards, inputs |
| Text | #0F172A | Body and headings |
| Muted | #64748B | Secondary text, helper text, placeholders |
| Border | #E2E8F0 | Borders, dividers, disabled fills |
| Success | #059669 | Icons and borders only |
| Success-strong | #047857 | Success text |
| Error | #DC2626 | Error borders, error text, destructive button |
| Error-tint | #FEF2F2 | Error message background (optional) |

### Contrast check (calculated, WCAG relative luminance)

Re-verify with a contrast tool when building.

| Pair | Ratio | Result |
|---|---|---|
| White on Primary #6366F1 | 4.47 : 1 | **Fails 4.5 : 1 by a hair.** Do not use for normal-size text. |
| White on Primary-strong #4F46E5 | 6.29 : 1 | Pass |
| Muted on Surface | 4.76 : 1 | Pass |
| Muted on Background | 4.55 : 1 | Pass (narrow) |
| Error on Surface | 4.83 : 1 | Pass |
| Success on Surface | 3.77 : 1 | Fails for text. Icons and borders only. |
| Success-strong on Surface | 5.48 : 1 | Pass |

Rule: filled buttons and text links use Primary-strong. Primary stays as the brand color for accents and non-text graphics (3 : 1 is enough for those).

## Typography

Font: Inter, self-hosted via `next/font`. Fallback: `system-ui, sans-serif`.

| Role | Size | Weight | Line height |
|---|---|---|---|
| H1 | 32px (28px below 768px) | 700 | 1.2 |
| H2 | 22px | 600 | 1.3 |
| H3 | 18px | 600 | 1.4 |
| Body | 16px | 400 | 1.6 |
| Result value | 28px | 600 | 1.2 |
| Small (labels, helper, breadcrumb) | 14px | 500 for labels, 400 otherwise | 1.5 |
| Caption | 12px | 400 | 1.4 |

- One H1 per page: the tool name plus the primary keyword.
- No font size outside this table.
- Prose width: maximum 720px.

## Spacing

| Token | Size | Tailwind |
|---|---|---|
| xs | 4px | 1 |
| sm | 8px | 2 |
| md | 16px | 4 |
| lg | 24px | 6 |
| xl | 32px | 8 |
| 2xl | 48px | 12 |
| 3xl | 64px | 16 |

- Page container: maximum 1152px wide, 16px side padding on mobile, 24px from 768px.
- Space between page sections: 2xl on desktop, xl on mobile.

## Border Radius

| Element | Radius |
|---|---|
| Buttons | 8px |
| Inputs, selects, text areas | 8px |
| Cards (tool card, result panel, tool cards on the homepage, FAQ items) | 12px |
| Segmented control | 8px outer, 6px inner |
| Modals | Not used. No popups. |

## Shadows

| Token | Value | Use |
|---|---|---|
| sm | 0 1px 2px rgba(15,23,42,0.06) | Card hover |
| md | 0 4px 12px rgba(15,23,42,0.08) | Search suggestions, open menu panel |
| lg | 0 12px 32px rgba(15,23,42,0.12) | Reserved. Not used in v1. |

Cards have no shadow by default.

## Components

All components use the same states. Focus is always visible: 2px outline in Primary, 2px offset.

### Buttons

| State | Primary | Secondary | Destructive (Clear/Reset only) |
|---|---|---|---|
| Default | Primary-strong fill, white text, radius 8px | Surface fill, 1px Border, Text color | Error fill, white text |
| Hover | Primary-pressed fill | Background fill, border Muted | Darker Error (#B91C1C) |
| Focus | 2px Primary outline, 2px offset | Same | Same |
| Pressed | Primary-pressed | Border fill | #991B1B |
| Disabled | Border fill, Muted text, not-allowed cursor | Same | Same |

- Height 44px minimum. Label 16px, weight 600.
- Icon + label allowed. Icon-only buttons need an `aria-label`.

### Inputs (text, number, date, select, text area)

| State | Style |
|---|---|
| Default | Surface fill, 1px Border, radius 8px, 44px minimum height, 16px text |
| Hover | Border becomes Muted |
| Focus | Border Primary plus the 2px focus outline |
| Error | Border Error. Message below in Error text with an icon. `aria-invalid="true"` and `aria-describedby` pointing at the message. |
| Disabled | Background fill, Muted text |

- Label above the input: 14px, weight 500, Text color.
- Helper text below: 14px, Muted.
- Placeholder is never the only label. Placeholder text is Muted.
- Input text is at least 16px so iOS does not zoom.

### Cards

| State | Style |
|---|---|
| Default | Surface fill, 1px Border, radius 12px, no shadow |
| Hover (clickable cards only) | Shadow sm |
| Focus | Focus outline on the whole card |

- Homepage tool card: 40px icon square (Primary-tint fill, Primary-strong icon) + tool name (16px, 600) + one-line description (14px, Muted, two lines at most). The whole card is one link.
- Tool card (the tool itself): inputs left, results right from 768px. Stacked on mobile, results below inputs.
- Result panel: `aria-live="polite"`. Three states: placeholder (Muted text), result (Result value style), error (Error text).

### Navigation

| State | Style |
|---|---|
| Default | Text color, 16px, weight 500 |
| Hover | Primary-strong text |
| Active page | Primary-strong text with a 2px underline |
| Focus | Focus outline |

- Header: logo, category links, search. On mobile the links collapse into a menu button that opens an inline panel (not an overlay).
- Breadcrumb: Home › Category › Tool. 14px, Muted. Current page in Text color. Last item is not a link.

### Segmented control (unit toggles, mode toggles)

Used for Metric/Imperial, Years/Months, Encode/Decode, ₹/$, Sent/Received. Built as a radio group.

| State | Style |
|---|---|
| Unselected | Surface fill, Text color |
| Selected | Primary-strong fill, white text |
| Hover (unselected) | Background fill |
| Focus | Focus outline |

### FAQ accordion

- Native `<details>` / `<summary>` or equivalent. Answer text is in the HTML at load.
- Item: card style, 12px radius, 16px padding, chevron that rotates when open.
- Focus on the summary shows the focus outline.

### Copy feedback

Button label changes from "Copy" to "Copied" for 2 seconds, with a check icon in Success-strong, announced through an `aria-live="polite"` region.

## Page Layout (every tool page, same template)

1. Header (logo + category nav + search)
2. Breadcrumb (Home › Category › Tool)
3. H1 + one-line description
4. Tool card (inputs left, results right on desktop; stacked on mobile)
5. "How to use" — 3 steps
6. Content section (400+ words, unique per tool)
7. FAQ accordion (5–7 questions, FAQ schema)
8. Related tools (same cluster first)
9. Footer (categories, legal links)

Also on every page: a "Skip to tool" link first in the tab order, and a single `<main>` landmark.

### Homepage

H1 and one line, search box, then one section per category with ToolCards. Grid: 1 column below 640px, 2 columns from 640px, 3 columns from 1024px. Search with no match shows "No tools found."

## UX Requirements

- Responsive at 375px, 768px and 1440px. No horizontal scroll from 320px up.
- Loading: calculators compute instantly, no spinners. Text to Speech shows "Loading voices…" while voices load.
- Empty: show a placeholder result, for example "Enter your date of birth". Never a blank box.
- Error: inline message in plain language. Never a crash or empty page.
- No popups, no signup walls, no "create account to see result".
- Interactive in under 3 seconds on a mid-range phone (targets: PRD.md › Non-Functional Requirements).
- Motion: transitions 150ms or less. Respect `prefers-reduced-motion`.
- Wide content (tables, code) scrolls inside its own container, never the page.
- Nothing is stored. Where a refresh clears the form, say so near the form.

## Accessibility

- Text contrast 4.5 : 1 or better. Large text and UI components 3 : 1 or better.
- A label on every input. Errors tied to inputs with `aria-describedby`.
- Everything works by keyboard. Focus is always visible. Tab order follows the visual order.
- Touch targets at least 44 × 44px.
- Meaningful images have alt text. Decorative images and icons use `alt=""` or `aria-hidden="true"`.
- One H1. Headings do not skip levels.
- `<html lang="en">`. Landmarks: header, nav, main, footer.
- Page works at 200% zoom with no loss of content.
- Do not rely on color alone. Errors have text and an icon.

## Things to Avoid

- [ ] Colors outside the palette. No other color as a primary.
- [ ] White text on #6366F1 at normal size (use Primary-strong).
- [ ] Success color for text (use Success-strong).
- [ ] Font sizes outside the type table.
- [ ] Spacing values outside the spacing scale.
- [ ] Placeholder-only inputs.
- [ ] One-off inline styles. Use Tailwind classes and the tokens above.
- [ ] Modals, popups, banners that cover content, autoplay.
- [ ] Per-tool layout changes. Use `ToolLayout`.
- [ ] Marketing copy in the tool area. The tool is the hero.
- [ ] Watermarks or branding on any tool output.
- [ ] Logos or trade dress of real apps (Fake Text Generator).
- [ ] Icon libraries or icon fonts.
