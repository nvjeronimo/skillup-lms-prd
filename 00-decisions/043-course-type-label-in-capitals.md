---
id: 043
title: The Course type label shows COURSE / PROGRAM in capitals, the one exception to badges in sentence case
date: 2026-11-24
status: accepted
audience: [designer, dev]
track: LMS
phase: 1
---
**Decision**
- The **Course type label** (DS `LMS/Platform/Discovery/Course-Type-Badge`) shows **COURSE** and **PROGRAM** in capitals.
- The capitals come from the type style, **label-small/Semibold** (upper case, 4% tracking, the same size and weight as
  the body-small/Semibold it replaces). The text stays “Course” / “Program”: never type the capitals, so screen readers
  read the word and not the letters.
- It is the **only** exception to the rule of 27 Oct 2026 (badges are in sentence case, never forced capitals). Every
  other badge stays in sentence case.

**Why**
- Nelson spotted on 24 Nov 2026 that the label was not in capitals and asked for COURSE / PROGRAM; asked whether it was
  an exception or a reversal, he chose the exception for this label only. The 27 Oct rule already kept label-small
  eyebrows in upper case, so the label uses that style rather than typed capitals.

**Applied**
- DS Course-Type-Badge v1.3 (24 Nov 2026, to publish); prototype `CourseTypeBadge` ([PR 503](https://github.com/nvjeronimo/skillup-lms-prototype/pull/503));
  ICP instances follow the library update.
