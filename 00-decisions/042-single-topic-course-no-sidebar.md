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
  the topic type: SCORM, video, reading, quiz or any other. The learner sees only the topic.
- **SCORM, a course that is one package** (decisions of 15 Nov 2026):
  - **The canonical course-package flow replaces D1.** It is the final flow for a course that is one package
    (proposed 11 Nov 2026 as section E, decided 15 Nov 2026), drawn in Figma *Activity · SCORM* cards E1, E1.2 and
    E1.3. Group D's D1 (our collapsed sidebar showing the one topic) is SUPERSEDED.
  - **No progress ring and no footer** of ours around the package (no *1 of 1*, no Next). The package brings its own
    menu, progress and exit; the top bar's close returns to the course page.
  - **The score** shows in the topic's alert and in the Progress tab.
  - **The pass mark** shows only in the *not passed* state (A6), never when the learner has passed.
  - **Dark** is out of this cycle.
- **Still open:** *Skip for now* on a package that fails to load (A7).

**Why**
- Navdeep asked on 4 Nov 2026 to hide our navigation so the package gets the screen. Nelson kept the collapsed
  sidebar while the course-package flow was explored (group D, confirmed 10 Nov), and on 11 Nov the improved flow was
  proposed (point 2: nothing of ours around a single package); it is now the canonical course-package flow.
- With one module and one topic, our sidebar lists a single item and the footer leads nowhere: it adds a second
  menu and takes space without helping the learner find anything. This holds for every topic type, not only SCORM.
- Nelson decided the SCORM details on 15 Nov 2026 and extended the rule to every single-topic course on
  16 Nov 2026.

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
- Prototype PR 480, *SCORM and YouTube Test Program*, course 5 (*POSH · proposed flow, one package*).

**Dev impact**
- Player layout: when the course has one module and one topic, do not render the sidebar or its toggle.
- SCORM single package: no progress ring and no Topic-Footer-Nav; the package fills the content area.
- Score in the topic's Inline Alert and in the Progress tab; the pass mark only in the *not passed* alert.
- Update SK-10957 (sidebar visible by default) with this exception.

**Alternatives rejected**
- D1, our sidebar collapsed showing the one topic and a *1 of 1* footer (Nelson's choice of 4–10 Nov 2026):
  superseded by the canonical course-package flow.
- A SCORM-only rule: the same single-item sidebar appears on a one-topic course of any type.
