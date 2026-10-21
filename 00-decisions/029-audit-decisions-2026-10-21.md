---
id: 029
title: Audit of 21 Oct 2026 — phone player bar, demo mode, Q&A vs Discussion, graded answers, sign out
date: 2026-10-21
status: accepted
audience: [designer, dev, stakeholder]
track: LMS
phase: 1
---
**Decision** — Nelson's answers to the UX/PM + technical audit of the prototype (report:
`04-research/prototype-audit-2026-10-21.md`), and the fixes that follow from platform rules:

1. **Player top bar on a phone:** three equal columns — the course menu and the progress ring (Progress circle
   32, % inside) on the left, the SkillUp wordmark centred, Bookmark, the avatar and Close on the right. The bell
   and the theme button leave the bar; the theme switch is a *Dark theme* row in the profile menu on a phone. At
   375 px the eight DS controls did not fit (≈460 px) and the logo was crushed to 11 px. DS
   `LMS/ICP/Player/Topbar` v1.7, `LMS / Profile Menu` v1.6 (boolean *Show dark theme (phone)*), prototype PR 216.
   *Amended the same day by Nelson:* the first answer kept the bell and showed the brandmark only (PR 214).
2. **Demo mode:** prototype notes and controls — the test-build footer, *Simulate load failure*, *Proposal: not
   designed yet*, *Not in MVP*, *Reset demo*, *Restart first steps* and the player's preview switches — show only
   with `?demo=1` (it sticks until `?demo=0`). Learner tests see the product; stakeholder demos add `?demo=1`.
3. **Mentorship Q&A is private, Discussion is the cohort's forum.** One line on each says so and links the other;
   Services *Message your mentor* opens the course's Q&A tab. One mentor per course, read from the course.
4. **Program sequencing stays as it is** (every course of a program can be started).
5. **Graded quizzes show the answer only after the last attempt** (Open edX `showanswer=finished`); practice
   quizzes any time.
6. **Sign out** is the last item of the profile menu, as in Open edX's user menu.
7. **One sample "today"** for the whole prototype (Sat 24 Oct 2026): dashboard, calendar, course pages, player and
   My Learning read the same dates, deadlines, mentor, hours and end dates.

**Why** — Testers stop trusting a screen that contradicts another (three "todays", two mentors, 18 h vs 69 h);
the course outline sent every topic to the same page; a graded quiz offered the answer before the first try; there
was no way to sign out; prototype scaffolding read as product.

**Dev impact** — Prototype PRs nvjeronimo/skillup-lms-prototype#214 (components and decisions) and #215 (sample
timeline). Production: topic links per topic id, `showanswer` from the problem settings, `/logout` in the user menu,
the mobile top-bar rule.

**Alternatives rejected** — Keeping the wordmark and dropping Saved items or the progress ring on a phone (both are
learner information); showing prototype notes by default with a switch to hide them (a learner test would start
with noise).
