---
id: 042
title: A course of one module and one topic opens in the ICP without our sidebar, whatever the topic type
date: 2026-11-16
status: accepted
audience: [designer, dev, stakeholder]
track: ICP
phase: 1
---
**Decision**
- **General rule.** A course with **one module and one topic** opens in the ICP **without our sidebar**, whatever
  the topic type: SCORM, video, reading, quiz or any other.
- **Only the sidebar goes on a course that is not SCORM.** A one-topic video, reading, quiz or other course keeps
  our **progress ring** and our **footer** (Topic-Footer-Nav). Removing the ring and the footer applies **only** to
  a SCORM course that is one package (below).
- **SCORM, the canonical course-package flow** (points 1–3 of the proposal of 11 Nov 2026, decided 15–16 Nov 2026):
  - **The canonical course-package flow replaces D1.** It is the final flow for a course that is one package
    (proposed 11 Nov 2026 as section E, decided 15 Nov 2026), drawn in Figma *Activity · SCORM* cards E1, E1.2 and
    E1.3. Group D's D1 (our collapsed sidebar showing the one topic) is SUPERSEDED.
  - **1 · A status, never a percentage.** A course that is one package shows *Not started*, *Started* or
    *Completed*, with no bar, on the course card, the program row and the course page.
  - **2 · Nothing of ours around a single package:** no sidebar, no Course Journey button, **no progress ring and no
    footer** (no *1 of 1*, no Next). The package brings its own menu, progress and exit; the top bar's close returns
    to the course page.
  - **3 · A course of several packages keeps our sidebar and footer, and Next asks** before leaving a package that
    has not reported completion: *This activity hasn't recorded completion yet* · **Stay on the activity** (primary)
    / **Continue anyway**. No *Yes, completed*. A package that never reports keeps C1.
  - **The score** shows in the topic's alert and in the Progress tab.
  - **The pass mark** shows only in the *not passed* state (A6), never when the learner has passed.
  - **Dark** is out of this cycle.
- **Still open:**
  - *Skip for now* on a package that fails to load (A7).
  - **Not a decision — an open dependency, owner Simran (content team):** point 4 of the proposal, the export
    checklist: turn off Rise's *Exit course* link; when a package reports *completed*; SCORM 1.2 or 2004; whether
    Rise's own "% COMPLETE" can be hidden.

**Why**
- Navdeep asked on 4 Nov 2026 to hide our navigation so the package gets the screen. Nelson kept the collapsed
  sidebar while the course-package flow was explored (group D, confirmed 10 Nov), and on 11 Nov the improved flow was
  proposed (point 2: nothing of ours around a single package); it is now the canonical course-package flow.
- With one module and one topic, our sidebar lists a single item: it takes space without helping the learner find
  anything. This holds for every topic type, not only SCORM. The ring and the footer still tell a non-SCORM learner
  where they stand and let them mark or move on; on a single package they duplicate the package's own progress and
  exit, so only there they go.
- Nelson decided the SCORM details on 15 Nov 2026, extended the no-sidebar rule to every single-topic course on
  16 Nov 2026, and confirmed points 1–3 of the proposal (point 4 stays a dependency) on 16 Nov 2026.

**Source** — Nelson's decisions of 15 and 16 Nov 2026, passed on by the LMS/ICP PM on 16 Nov 2026.
[`../LMS-HANDOFF/meeting-2026-11-04-scorm-youtube.md`](../LMS-HANDOFF/meeting-2026-11-04-scorm-youtube.md)
(proposal of 11 Nov 2026), [`../LMS-HANDOFF/activity-scorm.md`](../LMS-HANDOFF/activity-scorm.md) §3 group D.

**Changes SK-10957.** Jira SK-10957, *ICP Course Outline Sidebar…* (epic SK-11028, in UAT on 16 Nov 2026, confirmed
by the LMS/ICP PM), says *"Desktop (≥960px) Sidebar visible by default"*, as does
[`../LMS-HANDOFF/BA/FRDs/FRD_CourseOutline_Module_v1.0.md`](../LMS-HANDOFF/BA/FRDs/FRD_CourseOutline_Module_v1.0.md)
§3.1.5 (desktop, and tablet 640–959 px). It now needs an exception: on a course of one module and one topic the
sidebar is not shown at any breakpoint. As the ticket is in UAT, the exception goes to the ticket (or a follow-up
under SK-11028) before it closes.

**edX basis** — The course outline (`course_blocks`) gives the number of sections (modules) and units (topics), so
the player can tell a one-module, one-topic course without new data. Nothing changes in Open edX (rule 035: a
frontend layout choice). The SCORM score comes from `cmi.score.raw` to the Progress tab (decision 023,
`activity-scorm.md` §1).

**Design**
- Figma, ICP file, page *Activity · SCORM*: the canonical course-package flow is the frame first drawn as section
  *E · Proposal · improved package flow* on 11 Nov
  ([8378-14587](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8378-14587)); D1 (and its
  tablet and mobile cards) marked SUPERSEDED.
- Prototype PR 480, *SCORM and YouTube Test Program*: course 5 (*POSH · proposed flow, one package*, points 1 and 2)
  and course 6 (*POSH · proposed flow, two packages*, point 3).

**Dev impact**
- Player layout: when the course has one module and one topic, do not render the sidebar or its toggle. Keep the
  progress ring and the Topic-Footer-Nav unless the topic is a single SCORM package.
- SCORM single package: no progress ring and no Topic-Footer-Nav; the package fills the content area. Course card,
  program row and course page show the status (Not started / Started / Completed), not a percentage.
- SCORM, several packages: keep sidebar and footer; Next opens the *Stay on the activity / Continue anyway* dialog
  when the current package has not reported completion.
- Score in the topic's Inline Alert and in the Progress tab; the pass mark only in the *not passed* alert.
- Update SK-10957 (sidebar visible by default) with this exception.

**Alternatives rejected**
- D1, our sidebar collapsed showing the one topic and a *1 of 1* footer (Nelson's choice of 4–10 Nov 2026):
  superseded by the canonical course-package flow.
- A SCORM-only rule: the same single-item sidebar appears on a one-topic course of any type.
