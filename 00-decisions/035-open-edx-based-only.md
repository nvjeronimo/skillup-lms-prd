---
id: 035
title: Everything is Open edX-based; a custom feature needs research and stakeholder approval
date: 2026-10-28
status: accepted
audience: [designer, dev, stakeholder]
track: LMS
phase: 1
---
**Decision** — Screens and the prototype show only what Open edX provides. No extra development: a feature the
platform does not give is drawn only when it is truly important, after research and the stakeholders' approval.
Applied the same day to three areas:

| Area | Before | Now (Open edX) |
|---|---|---|
| Mentorship Q&A | "Private between you and your mentor" (21 Oct 2026) | Question posts in the course discussions, public to the course, answered by mentors (option D of `edx-mentorship-qa.md`) |
| Past-due deadlines | "Overdue" in red (Dates tab, Calendar "Missed", Dashboard) | **"Past due" in amber** (Open edX's word; a missed suggested date can be shifted, so it is never final) |
| Dates tab | "Upcoming" on every date, "Locked · unlocks when…", assignment descriptions, "Certificate issued", program and "suggested start" dates | Open edX's date types and six badges: Today, Completed, Past due, Due next (one item), Not yet released, Verified only; the assignment type before the title |
| Notifications | Live now / soon, assignment due, syllabus change, peer rating | Discussion activity (responses, endorsements), instructor posts, course updates, ORA grade |

**Why**
- Nelson, 28 Oct 2026: *"Tudo deve ser edX based, não queremos desenvolvimentos extras! Só nalgum aspecto mesmo
  importante que a plataforma não nos forneça, mas requer investigação e aprovação dos stakeholders."*
- The discovery notes of the same day showed the gaps: `LMS-HANDOFF/edx-notifications.md`, `edx-dates-tab.md`,
  `edx-mentorship-qa.md`.
- Amber for past due follows decision 034: red only for a state that cannot change.

**Source** — conversation with Nelson, 28 Oct 2026; docs PR 233.

**edX basis** — Dates tab API and `date_summary.py`; frontend-app-learning `dates-tab/timeline/badgelist.jsx`;
Notifications (Teak/Ulmo); Discussions (no private messaging).

**Design** — DS `LMS/Platform/Course-Detail/Date-Row` 1.1 (State Upcoming · Completed · Past due · Not yet released),
`LMS/Platform/Dashboard/Due-Item` 1.3, `LMS/Platform/Calendar/Month-Event` 1.1 (Status Past due),
`LMS/Platform/Dashboard/Stay-Informed-Row` 1.1. ICP WIP: Course Detail Dates cards 07–09, Q&A, 09 Notifications,
12 Form modals (Ask a question), Dashboard Stay informed, Services.

**Dev impact** — Prototype PR 410: `lib/platform/edx-dates.ts` (rows reduced to `course_date_blocks`), Notification
types in `lib/types.ts`, Q&A copy. Any future feature: check the Open edX API and docs first; if it is missing, write
it up as a candidate for research and approval instead of drawing it in.

**Alternatives rejected** — Private 1-to-1 Q&A (needs a paid LTI tool or a custom build); red for past due; keeping
custom notification types as samples.
