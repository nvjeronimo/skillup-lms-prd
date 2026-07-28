---
id: 005
title: Notification grouping — hybrid (type-tabs × date sections)
date: unknown
status: accepted
audience: [designer, dev, stakeholder]
track: A
phase: 1
---
> Product decision locked during discovery. Push back NOW if you disagree — mid-build reversal is 10x more expensive.

**Decision** — Notifications group by type-tab (All / Discussions / Grading / Updates) at the top, then by date section (Today / Yesterday / Earlier this week / Older) inside each tab.

**Why**
- "Tested vs flat list and tab-only. Hybrid won for scan-at-scale."
- Type-tab isolates a concern; date section orders within it — either axis alone loses the other.

**Source** — Figma `3832-18102` "Key Decisions" + BA business rules, 2026-06-08. [`../LMS-HANDOFF/BA/03-business-rules.md`](../LMS-HANDOFF/BA/03-business-rules.md) (BR-15, BR-14, BR-16).

**edX basis** — n/a.

**Design** — LMS ICP Phase 1 · Overlay Panels — Notifications (node-id unknown).

**Dev impact** — BR-15 (grouping), BR-14 (7 types), BR-16 (mark-all-read scoped to visible tab); Notifications overlay panel.

**Alternatives rejected** — Flat chronological list and tab-only grouping: both tested, both lost on scan-at-scale.
