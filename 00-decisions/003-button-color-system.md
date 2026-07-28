---
id: 003
title: Button color system — brand primaries, neutral utilities
date: unknown
status: accepted
audience: [designer, dev]
track: A
phase: 1
---
> Product decision locked during discovery. Push back NOW if you disagree — mid-build reversal is 10x more expensive.

**Decision** — Primary = teal, Secondary = outline-teal, Tertiary = ghost; Destructive, Utility and Close-X buttons stay UUI neutral gray (not brand).

**Why**
- Brand colour signals the primary path — reserving teal for Primary/Secondary keeps the intended action legible.
- Destructive and utility controls stay neutral so brand colour never reads as "do this".

**Source** — Figma `3832-18102` "Key Decisions" + BA exec summary, 2026-06-08. [`../LMS-HANDOFF/BA/01-executive-summary.md`](../LMS-HANDOFF/BA/01-executive-summary.md).

**edX basis** — n/a.

**Design** — SKO Design System · LMS COMPONENTS page: [`1030-33572`](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1030-33572) (Button component).

**Dev impact** — Button atom (variant × intent matrix); DS colour tokens (`bg-brand-solid`, outline, ghost, neutral).

**Alternatives rejected** — Brand-coloured destructive/utility buttons: rejected — dilutes the "primary action" signal and risks accidental destructive clicks.
