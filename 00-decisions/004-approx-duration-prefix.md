---
id: 004
title: `approx.` duration prefix only on inexact topic types
date: unknown
status: accepted
audience: [designer, dev]
track: ICP
phase: 1
---
> Product decision locked during discovery. Push back NOW if you disagree — mid-build reversal is 10x more expensive.

**Decision** — The `approx.` prefix appears on duration only for topic types whose time cannot be measured exactly (Reading, Lab, Activity, Project); never on Video, Recording, scheduled Live sessions, or timed Quizzes.

**Why**
- Honesty about estimates — `approx.` marks a guess, and exact-time types shouldn't wear it.
- Time-remaining aggregation drops `approx.` only when every remaining topic is exact-time (BR-05).

**Source** — Figma `3832-18102` "Key Decisions" + BA business rules, 2026-06-08. [`../LMS-HANDOFF/BA/03-business-rules.md`](../LMS-HANDOFF/BA/03-business-rules.md) (BR-33, BR-05).

**edX basis** — n/a.

**Design** — LMS ICP Phase 1 · pattern doc "📘 Topic Header — approx. duration rule" (node-id unknown); Topic Content Types: [`4692-444`](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4692-444).

**Dev impact** — BR-33; Topic Header, Topic Row badge.

**Alternatives rejected** — `approx.` on all durations: rejected — misrepresents exact-time content (video/quiz) as estimated.
