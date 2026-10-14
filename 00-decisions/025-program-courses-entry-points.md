---
id: 025
title: A course of a program is reached from its program, or from "Pick up where you left off"
date: 2026-10-14
status: accepted
audience: [designer, dev, stakeholder]
track: LMS
phase: 1
---
**Decision** — The courses that belong to a program are not listed on their own. The learner reaches them from the
program page, or from the Dashboard's *Pick up where you left off*. Three ways in stay, by Nelson's choice
(14 Oct 2026): the *Continue* button of a program card (My Learning) opens the player of the course in progress;
a Dashboard due item opens its work, whatever course it belongs to; the program certificate page links to each of
its courses.

**Why**
- Nelson, 14 Oct 2026: "os cursos que pertencem ao programa só são acessíveis/navegáveis pela página do program,
  ou pela dashboard *Pick up where you left off*". The program is the unit the learner enrolled in; its courses
  make sense in its order and with its path.
- The three exceptions were asked the same day, because they were earlier decisions (*Continue* → player, 10 Oct;
  due items open the work, 9 Oct) or a page of the program itself (the certificate).

**Where it applies**
- **My Learning, Courses:** single courses only. A course of a program never gets a card there; the program card
  stands for it.
- **Dashboard, Pick up where you left off:** lists the courses in progress, a course of a program included, with the
  program's name as context (as today).
- **Program page:** each course row opens the course page (title, card) and the player (button).
- **Course page and player:** a course of a program always shows the program path (decision of 9–10 Oct); *Go to
  next course* goes to the next course of the program.
- **Catalogue and search, when they exist:** they show the program, not its courses one by one.

**edX basis** — Learner Home (`GET /api/learner_home/init`) lists enrolments, which are courses: a program course
comes back like any other. The LMS hides it from the course list by its program membership (Programs API,
`/api/dashboard/v0/programs/` or the program's `courses`). Navigation only: the course's own address still works
for an enrolled learner; blocking it is not part of this decision.

**Dev impact** — the My Learning course list filters out enrolments that belong to a program; the Dashboard resume
list does not. Prototype: already so (`lib/platform/my-learning.ts` lists single courses only; the program
courses live in `lib/programs`); a check guards it from 14 Oct.

**Alternatives rejected** — Listing program courses in My Learning with a program badge (two ways to the same course,
out of the program's order); sending *Continue* and due items through the program page (one more click for the most
frequent task; Nelson kept the direct way).
