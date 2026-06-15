# SkillUp LMS — Business Analyst Handoff

This folder is the BA-shaped view of the LMS project. It complements the engineering handoff in the parent `LMS-HANDOFF/` folder.

## How to read this package

| Order | File | Use |
|---|---|---|
| 1 | `01-executive-summary.md` | 10-minute overview of what we're building, scope, key decisions |
| 2 | `06-glossary.md` | Vocabulary — read this before the stories or you'll get lost |
| 3 | `02-user-stories-phase1.md` | The actual stories with Gherkin AC. Build target. |
| 4 | `03-business-rules.md` | Domain rules and logic the stories depend on |
| 5 | `04-edge-cases-failures.md` | Error states, recovery flows, edge cases |
| 6 | `05-feature-roadmap.md` | Phase 1 build + Phase 2 + Phase 3 features |
| — | `BA-PRD.docx` | Single formal PRD doc, same content, Word-formatted for stakeholders |
| — | `BA-RTM.xlsx` | Requirements traceability matrix — FR → story → screen → AC → priority |

## What's in the parent `LMS-HANDOFF/`

These were written for engineering, but BAs can pull from them:

- `screens-spec.md` — the 7 Phase 1 screens
- `components-inventory.md` — every UI component with variants
- `prototype-flows.md` — interaction map between screens
- `overlay-panels-spec.md` — Notifications + Saved panel behaviors
- `phase1-readiness.md` — bookmark toast, transcript auto-scroll, a11y, analytics
- `edx-parity-audit.md` — feature-by-feature audit vs edX baseline
- `feature-deltas.md` — what we have vs edX, what's new, what's deferred
- `data-model.json` — mock course data shape

## Source of truth

| Asset | Where |
|---|---|
| Figma working file | `Wz2TCYFVr0hD8tJNiLajLt` (Learner Platform Experience Discovery fase) |
| Canonical Figma page | `V7 - UUI Playground - WIP 🟠` |
| Design system | `c7EUDrQwP8si08aPipDSIV` (SKO Design System — Untitled UI) |
| BA artifacts | This folder |
| Engineering artifacts | Parent `LMS-HANDOFF/` |

## Status

| Doc | Status | Last updated |
|---|---|---|
| 01-executive-summary | Draft v1 | 2026-06-08 |
| 02-user-stories-phase1 | Draft v1 | 2026-06-08 |
| 03-business-rules | Draft v1 | 2026-06-08 |
| 04-edge-cases-failures | Draft v1 | 2026-06-08 |
| 05-feature-roadmap | Draft v1 | 2026-06-08 |
| 06-glossary | Draft v1 | 2026-06-08 |
| BA-PRD.docx | Draft v1 | 2026-06-08 |
| BA-RTM.xlsx | Draft v1 | 2026-06-08 |

## How to use this package

**For writing tickets**: Open `02-user-stories-phase1.md`, copy a story + its AC straight into Jira/Linear. Each story has a unique ID (`P1-XX`) that maps to the RTM.

**For stakeholder validation**: `BA-PRD.docx` is the formal artifact. The exec summary at the top is the 1-page pitch.

**For estimation**: RTM has priority + phase columns. Filter by Phase 1 P0 to see the must-have set.

**For traceability**: Every requirement traces from `FR-XX` (RTM) → user story (`P1-XX`) → screen (Figma node ID) → component (UUI/LMS Extension). The chain is bidirectional.

## Owner

Design: Nelson · BA: TBD · Eng lead: TBD · PM: TBD

Questions on any artifact go to Nelson until BA owner is assigned.
