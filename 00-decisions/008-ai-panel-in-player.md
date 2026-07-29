---
id: 008
title: AI Panel built into the player (Ask / Chat / Related)
date: unknown
status: accepted
audience: [designer, dev, stakeholder]
track: ICP
phase: 1
---
> Product decision locked during discovery. Push back NOW if you disagree — mid-build reversal is 10x more expensive.

**Decision** — The AI Panel is built into the player with three modes — Ask (single question), Chat (conversation), Related (recommendations) — each contextualized to the current topic.

**Why**
- "Not bolted on. Three modes contextualized to current topic."
- In-player context means the AI already knows the topic; a separate tool would lose it.
- "Phase 2 may add proactive suggestions."

**Source** — Figma `3832-18102` "Key Decisions" + BA exec summary, 2026-06-08. [`../LMS-HANDOFF/BA/01-executive-summary.md`](../LMS-HANDOFF/BA/01-executive-summary.md).

**edX basis** — n/a.

**Design** — Video Lesson — Ready for Dev: [`3785-11385`](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3785-11385) (AI Panel in player, exact node-id unknown).

**Dev impact** — AI Panel organism (3 modes); topic-context wiring.

**Alternatives rejected** — Bolted-on/standalone AI assistant: rejected — loses current-topic context.
