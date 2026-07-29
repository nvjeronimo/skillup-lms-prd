---
id: 002
title: Sidebar v2 — adaptive 5-level hierarchy
date: unknown
status: accepted
audience: [designer, dev]
track: ICP
phase: 1
---
> Product decision locked during discovery. Push back NOW if you disagree — mid-build reversal is 10x more expensive.

**Decision** — The course sidebar supports a 5-level hierarchy (Program → Course → Module → Lesson → Topic) and adapts when a level is absent; ships as 5 variants: Expanded 280w, Collapsed 72w, Mobile 320w, plus 2 `noLesson` variants for 4-level courses.

**Why**
- Courses vary in depth — many skip the Lesson level entirely, so a fixed 5-level tree would render empty rungs.
- The sidebar adapts to the actual course shape rather than forcing every course into one layout.

**Source** — Figma `3832-18102` "Key Decisions" + BA exec summary, 2026-06-08. [`../LMS-HANDOFF/BA/01-executive-summary.md`](../LMS-HANDOFF/BA/01-executive-summary.md).

**edX basis** — n/a.

**Design** — LMS ICP Phase 1 · Sidebar organism, node-id unknown. Appears in Video Lesson — Ready for Dev: [`3785-11385`](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3785-11385).

**Dev impact** — Sidebar organism (5 variants), BR-06 (sequential gating drives lock state per row).

**Alternatives rejected** — Fixed 5-level tree: rejected — leaves empty Lesson rungs on courses that skip that level.
