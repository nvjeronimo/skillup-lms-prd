---
id: 036
title: The Dates tab is not shown on self-paced courses; its design is on hold
date: 2026-10-28
status: accepted
audience: [designer, dev, stakeholder]
track: LMS
phase: 1
---
**Decision** — The course page shows no Dates tab on self-paced courses, and the Dates tab is not worked on for now.
For instructor-led courses the live sessions are covered by the Calendar; whether the Dates tab repeats them is
decided later.

**Why**
- Meeting 28 Oct 2026 (Kirti Mishra, Navdeep Malhotra, Simran Jindal, Shivam Tripathi, Nelson Jerónimo): SkillUp
  configures only a course's start and end dates; no module, quiz or project due dates are set. On a self-paced
  course the start is the publication date and the end the expiry (e.g. 2050), which has no value for the learner.
- Navdeep: *"Right now let's not build this"*; Kirti: hide the tab for self-paced courses and show it only for
  cohort-based programs and courses.
- Decision 035: no extra development; the dates that would fill the tab are not configured.

**Source** — `LMS-HANDOFF/meeting-2026-10-28-progress-dates-qa.md`; `LMS-HANDOFF/edx-dates-tab.md`.

**edX basis** — Dates tab API (`course_date_blocks`): without due dates it returns only the course start and end.

**Design** — The Dates screens stay on the WIP page (out of Ready for Dev since 27 Oct). DS Date-Row 1.1 kept for
later.

**Dev impact** — Do not render the Dates tab for self-paced courses. Note also: without due dates there is no
"Shift due dates" alert and no deadline in the Calendar or the Dashboard "Due this week" list on today's courses.

**Applied (28 Oct 2026)**
- Prototype PR 411: `hasDatesTab` / `courseTabsFor`. A self-paced course (Flexible Learning) shows no Dates tab, no
  Upcoming dates card and no Shift due dates alert; `?tab=dates` opens the Course tab. Calendar deadlines, its Shift
  due dates block and the Dashboard due list carry a `data-mock` note (example, no due dates today).
- ICP: the Dates tab, the Upcoming dates card and the missed-deadline alert hidden on every Course-tab screen
  (Ready for Dev: 14 tabs, 11 cards, 3 alerts; WIP rows 01–16: 22 tabs, 16 cards, 5 alerts). The screens with the
  Dates tab open stay as they are. The Dates note card carries this decision.
- Sample assignment type "Homework" → "Assignment" in the prototype, DS Date-Row 1.1 (unpublished) and the ICP.

**Alternatives rejected** — Showing start and expiry dates on self-paced courses (no value); building custom date
types (decision 035).
