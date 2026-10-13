# Tool Empire — Context Docs

These files give every agent (Muse, Claude, Hermes) the same project context before any code is written. The repo is the single source of truth. Specs and decisions live in files, never only in chat.

Last updated: 2026-10-13

## File map

| File | Type | What it holds | Changes when |
|---|---|---|---|
| PRD.md | Stable | What we build, for whom, scope, requirements, gates | Sam approves a scope change |
| ARCHITECTURE.md | Stable | Stack, folder structure, URL map, deployment, technical decisions | Sam approves a technical change |
| DESIGN.md | Stable | Colors, type, spacing, components, accessibility | Sam approves a design change |
| RULES.md | Stable | How agents work: roles, code rules, SEO rules, testing, Git | Sam approves a rule change |
| TASKS.md | Living | Task board, task specs, test cases | Every session |
| MEMORY.md | Living | Decisions, current state, known issues, lessons | Every session |

Stable files are written once. Change them only with Sam's approval, and log the change in MEMORY.md under Decisions Made.

## When to read what

| Situation | Read |
|---|---|
| New project, or a new agent joins | All files, in this order: README → PRD → ARCHITECTURE → DESIGN → RULES → TASKS → MEMORY |
| Start of any session | MEMORY, then TASKS |
| Building a tool or feature | PRD + ARCHITECTURE + RULES, then the task in TASKS |
| UI work | DESIGN, plus the UI section of RULES |
| Writing page content (Claude) | PRD (the tool's requirements), TASKS (the task spec), ARCHITECTURE (Content contract), RULES (SEO and Content sections) |
| QA (Muse) | TASKS (task spec + test cases), RULES, DESIGN |

## If documents disagree

Use this order. Higher wins.

1. Locked decisions (MEMORY.md › Decisions Made, tagged LOCKED)
2. RULES.md
3. PRD.md
4. ARCHITECTURE.md
5. DESIGN.md
6. TASKS.md
7. Notes in MEMORY.md

If the conflict is still unclear, stop and ask Sam through Muse. Do not guess.

## Who updates what

- **Sam:** approves changes to stable files. Answers Open Questions.
- **Muse:** owns the docs. Reviews every change to a stable file before Sam sees it.
- **Hermes:** moves task cards in TASKS.md. Updates MEMORY.md at the end of every session.
- **Claude:** writes page content into `src/content/` only. Does not edit these docs unless asked.

## Workflow

Six context files before any code → one task at a time → implement → test → review → commit → deploy preview → production. Never "build the whole site" in one prompt.

## Companion files not yet created

DECISIONS.md, TEST_PLAN.md and SECURITY.md are proposed but not approved. Do not create them until Sam says yes. Until then:

- Decisions go in MEMORY.md › Decisions Made.
- Test cases go in TASKS.md › Task Specs.
- Security rules go in RULES.md › Security.

## Repo layout

```
tool-empire/
├── README.md        # short repo intro, points to docs/README.md
├── docs/            # this folder: README, PRD, ARCHITECTURE, DESIGN, RULES, TASKS, MEMORY
├── src/
└── public/
```

Full structure: ARCHITECTURE.md › Folder Structure.
