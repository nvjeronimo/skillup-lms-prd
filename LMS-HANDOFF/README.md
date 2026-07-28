# SkillUp LMS — Prototype + Storybook Handoff

Code handoff package for the V7 LMS prototype. Built from the Figma source of truth:

- Working file: `Wz2TCYFVr0hD8tJNiLajLt` (Learner Platform Experience Discovery fase)
- Design system: `c7EUDrQwP8si08aPipDSIV` (SKO Design System — Untitled UI)
- Canonical page: `V7 - UUI Playground - WIP 🟠`
- **LMS Extension Components** (DS-hosted as of 2026-06-15): page `❖ LMS COMPONENTS ✅` (`1030:33572`) — 132 components

## Handoff pages (Phase 1)

Each handoff section lives on its own page under `READY FOR DEV ✅` parent:

| Page | Status | Cards |
|---|---|---|
| `↳ Phase 1 - Video Lesson - Ready for Dev ✅` | Ready ✅ | 15 (Desktop / Tablet / Mobile per screen) |
| `↳ Phase 1 - Overlay Panels - Ready for Dev ✅` | Ready ✅ | 6 (Notifications + Saved × DTM) |
| `↳ Phase 3 - Completion + Certificate - WIP 🟠` | Phase 1 baseline · Phase 3 WIP 🟠 | 6 (Course Complete Modal + Certificate × DTM) |
| `↳ Diagram Flows + Business Logic` | Ready ✅ | Navigation flow + 42 BRs + 10 decisions + 24 doc links |

**Page conventions** (enforced):
- Name format: `       ↳ Phase X - Flow Domain - Status [emoji]`
- Outer section BG: `#B7B7B7` · screen-wrap inside cards: `#C6D0E3`
- Ordered by Phase ascending, then logical flow

## Goals

1. **Prototype** — Next.js app demonstrating the Video lesson flow with Desktop / Tablet / Mobile breakpoints, 3 content tabs, sidebar collapse, and the notes-on-transcript pattern.
2. **Mini Storybook** — All 30 LMS Extension Components documented with variants, properties, anatomy, tokens used, and usage notes.

## Tech stack

- **Next.js 14** (App Router) — pages + layouts
- **React 18** + TypeScript — components
- **Tailwind CSS** — styling via tokens
- **Storybook 8** — component documentation
- **Inter** (body) + **Montserrat** (display) — Google Fonts

## Project structure

```
lms-prototype/
├── app/                           # Next.js routes
│   ├── layout.tsx
│   ├── page.tsx                   # Redirect to /course/six-sigma/topic/0
│   └── course/
│       └── [courseSlug]/
│           └── topic/
│               └── [topicId]/
│                   ├── page.tsx   # Topic player (Transcript by default)
│                   ├── notes/page.tsx
│                   └── downloads/page.tsx
├── components/
│   ├── atoms/                     # 14 atoms (Button, Badge, etc.)
│   ├── molecules/                 # 11 molecules (Topic Row, Note Item, etc.)
│   └── organisms/                 # 5 organisms (Sidebar, Topbar, AI Panel, etc.)
├── tokens/
│   ├── colors.css                 # LMS color CSS variables
│   ├── typography.css             # Font + text style classes
│   └── spacing.md                 # Spacing scale reference
├── lib/
│   ├── data.ts                    # Course content mock
│   ├── types.ts                   # Topic, Note, Course types
│   └── store.ts                   # Lightweight client state (Zustand or React Context)
├── stories/                       # Storybook 8 stories per component
│   ├── Atoms.stories.tsx
│   ├── Molecules.stories.tsx
│   └── Organisms.stories.tsx
└── public/
    └── fonts/                     # Self-hosted Inter + Montserrat if not via next/font
```

## Documents in this handoff

| File | Purpose |
|---|---|
| `README.md` | This file — overview |
| `tokens/colors.css` | All LMS color tokens as CSS custom properties |
| `tokens/typography.css` | Font families + text style classes |
| `components-inventory.md` | All 132 LMS Extension Components (DS-hosted): ID, variants, properties, anatomy, tokens |
| `screens-spec.md` | The 7 Final Screens to build |
| `overlay-panels-spec.md` | Notifications + Saved right-overlay panels (triggered from Topbar) |
| `prototype-flows.md` | Interaction map for the prototype |
| `data-model.json` | Mock course content shape |
| `storybook-coverage.md` | Story coverage plan per component |
| `CHANGELOG.md` | Version notes for the handoff package itself (v3.3 = latest) |
| `variable-collections-guide.md` | The 4 Figma variable collections: what each is for, the skin ramp model, naming rules, how to re-validate contrast |
| `modules/skin-switcher/` | Drop-in brand-skin + light/dark control. Reads skins and colours from `tokens/colors.css` — no colour is written in the module. `demo.html` doubles as the visual token review page |
| `edx-parity-audit.md` | Feature audit: our LMS vs edX Learner Guide — covered / partial / missing per area |
| `feature-deltas.md` | Clear separation: edX baseline / ours-only / edX-only-to-add / edX-only-skipped |
| `phase1-readiness.md` | Specs for bookmark toast, transcript auto-scroll, a11y checklist, share menu + analytics events |
| `BA/` (subfolder) | Business Analyst handoff — see `BA/00-README.md` for index |

## BA handoff (subfolder)

For the Business Analyst team. Same source material, BA-shaped artifacts.

### Official FRDs from Rashid (Jun 25, 2026)

Final implementation-grade FRDs from BA team for Sprint 109 development kickoff. See `BA/FRDs/00-README.md` for the index.

| File | Module | Status |
|---|---|---|
| `BA/FRDs/FRD_ICP_5.3_Video_Lessons.md` | Video player + transcript + completion | Under Review |
| `BA/FRDs/FRD_CourseOutline_Module_v1.0.md` | Sidebar navigation + resume position | Draft |

Original `.docx` originals at project root.

| File | Purpose |
|---|---|
| `BA/00-README.md` | Index + reading order for the BA package |
| `BA/01-executive-summary.md` | 10-minute overview, scope, locked decisions, risks |
| `BA/02-user-stories-phase1.md` | 73 stories with Gherkin (Given/When/Then) AC, 14 epics |
| `BA/03-business-rules.md` | 42 business rules (BR-XX) referenced by stories |
| `BA/04-edge-cases-failures.md` | 40 edge cases + failure modes (EC-XX) |
| `BA/05-feature-roadmap.md` | Phase 1 / 1.5 / 2 / 3 sequencing + rationale |
| `BA/06-glossary.md` | Vocabulary — content hierarchy, topic types, roles |
| `BA/BA-PRD.docx` | Formal Word PRD for stakeholder distribution |
| `BA/BA-RTM.xlsx` | Requirements Traceability Matrix — 73 FRs mapped to stories, screens, components, BR, EC, priority, phase |

## Key design decisions baked in

1. **Notes anchored to transcript lines** — not raw video timestamps (edX baseline + our pattern doc).
2. **Brand-aware buttons** (Primary teal / Secondary outline-teal / Tertiary ghost) — destructive/utility/close-X stay UUI gray-neutral by design.
3. **Sidebar v2 with 5 variants** — Expanded (280w), Collapsed (72w), Mobile (320w), + 2 `noLesson` variants for 4-level courses.
4. **Topic Footer Nav is sacred** — Previous · Unit info / Title · Next topic. No context-aware action chips (we tried, reverted).
5. **`approx.` prefix** on Duration for estimated topics (Reading, Lab, Activity, etc.) — never on Video, Recording, Live sessions, timed Quiz.
6. **Icon stroke weight rule**: icons rendered at <24px use 1.5px stroke. Icons ≥24px use 2px (UUI default). Applies to all SVG icons. If using Tailwind, `stroke-[1.5]` or inline style.

## How to start

```bash
cd lms-prototype
pnpm install
pnpm dev               # prototype at localhost:3000
pnpm storybook         # storybook at localhost:6006
```

## Out of scope for this handoff

- Real backend / API integration (use mock data from `lib/data.ts`)
- Dark mode (tokens support it but screens are Light only)
- Auth flow
- Real video playback (use a placeholder gradient or single MP4)
- All other lesson types (Reading, Lab, VILT, etc.) — those exist as Figma specs in "Other Screens" section but are not in the prototype scope

## Reference

- Tokens decision: `tokens/colors.css` is the source of truth
- Component IDs in Figma: see `components-inventory.md`
- Pattern docs in Figma file: `📘 Notes — Timestamp anchoring pattern` + `📘 VILT Flow — 3 states` + `📘 Topic Header — approx. duration rule`
