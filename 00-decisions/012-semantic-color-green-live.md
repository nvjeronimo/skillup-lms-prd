---
id: 012
title: Semantic color — green = LIVE (never brand red)
date: unknown
status: accepted
audience: [designer, dev]
track: Foundations
phase: 1
---
> Product decision locked during discovery. Push back NOW if you disagree — mid-build reversal is 10x more expensive.

**Decision** — "LIVE NOW" is signalled with green, never brand red.

**Why (verbatim)**
- "Never use brand red for 'Live' — green is the LIVE NOW color (matches live-streaming convention from Twitch/YouTube, not broadcast-TV red)."
- Red is reserved for errors/destructive/danger (BR-32); reusing it for Live would collide semantically.

**Source** — Figma `3832-18102` "Key Decisions" + BA business rules, 2026-06-08. [`../LMS-HANDOFF/BA/03-business-rules.md`](../LMS-HANDOFF/BA/03-business-rules.md) (BR-32).

**edX basis** — n/a.

**Design** — SKO Design System · LMS COMPONENTS: [`1030-33572`](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1030-33572) (Live session badge).

**Dev impact** — BR-32 semantic colour map; Live session badge, `bg-success-*` tokens. (Note: BR-23 text says "Red LIVE NOW badge" — reconcile against BR-32 green rule.)

**Alternatives rejected** — Broadcast-TV red for Live: rejected — clashes with error/danger semantics and breaks the streaming-platform convention users expect.
