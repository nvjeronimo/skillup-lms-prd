# 06 · Platform Pages (LMS track) — WIP 🟠

**One of the project's two big tracks.** The **LMS** track = the platform *around* the course: the
pages a learner uses to find, enrol in, track, and manage their learning — everything outside the
immersive in-topic experience (which is the **ICP** track).

> Status: 🟠 **WIP** — discovery/design in progress. Not part of the Phase 1 handoff yet.

## The two tracks

| Track | What it is | Where |
|---|---|---|
| **ICP** — Immersive & Content Types | The experience *inside* a topic: immersive player, Video Lesson, Content Types, Quizzes, VILT, business logic. | [`01-ready-for-dev/`](../01-ready-for-dev/), [`02-content-types/`](../02-content-types/) |
| **LMS** — Platform Pages *(this folder)* | The platform *around* the course. | here |
| **Foundations** | Design System, decisions, research — serves both. | [`03-design-system/`](../03-design-system/), [`00-decisions/`](../00-decisions/) |

## Platform Pages in scope (LMS)

The learner-facing platform pages. Statuses are current best-known — refine as discovery lands.

| Page | What | Status |
|---|---|---|
| Dashboard / Home | Learner landing — enrolled courses, next up, deadlines, cohort signal | 🟠 WIP |
| My Learning | Progress across all courses/programs | 🟠 WIP |
| Course Page (detail) | Single-course overview, outline, enrol/continue | 🟠 WIP |
| Program Page (detail) | Multi-course program overview | 🟠 WIP |
| Calendar | Scheduled live sessions, deadlines | ⚪ planned |
| Live Sessions | Upcoming / completed VILT list | ⚪ planned (see [`../live-sessions/`](../live-sessions/)) |

## Current design artifact — V8 Complementary Pages (SkillUp Brand)

The first design pass at these platform pages lives in Figma as **V8 - Complementary Pages
(SkillUp Brand)**:

> Figma: **`4340-322`** — [open in Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4340-322)
> (screens section `4340-323`).

**Do NOT describe these as DS-compliant.** The V8 screens started as **raw-frame captures, not linked
to reusable components**. Migration to DS library instances is **in progress** — only some screens are
partially swapped:

- `Course Detail — Light Hero` (`4554:63338`) — partially swapped to DS badge/button components
- `Dashboard — Topbar Nav (Experiment)` (`4554:63757`) — partially swapped

## Relationship to the other tracks

- **Foundations:** target is the same SKO Design System (`c7EUDrQwP8si08aPipDSIV`) and `--sk-*` tokens
  as ICP — migration in progress, not yet fully bound.
- **Decisions:** a DS master-component bug found during this work is recorded as [`../00-decisions/018`](../00-decisions/)
  (status chips must use background tokens, not foreground). LMS-track product decisions (notifications,
  mentor, cohort pace) live in the decision log — [`00-decisions/INDEX.md`](../00-decisions/INDEX.md), track = LMS.
