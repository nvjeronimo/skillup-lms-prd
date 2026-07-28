---
id: 013
title: Icon stroke weight rule — 1.5px under 24px, 2px at/above
date: unknown
status: accepted
audience: [designer, dev]
track: A
phase: 1
---
> Product decision locked during discovery. Push back NOW if you disagree — mid-build reversal is 10x more expensive.

**Decision** — Icons rendered at < 24px use a 1.5px stroke; icons ≥ 24px use 2px (UUI default). Applies to all SVG icons.

**Why**
- At small sizes a 2px stroke visually thickens and closes up the icon; 1.5px keeps it legible.
- 2px is the UUI default and is correct at 24px and above.

**Source** — Handoff README "Key design decisions" #6, 2026-06 (v1.8). [`../LMS-HANDOFF/README.md`](../LMS-HANDOFF/README.md).

**edX basis** — n/a.

**Design** — SKO Design System · LMS COMPONENTS: [`1030-33572`](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1030-33572) (icon library).

**Dev impact** — All SVG icons. In Tailwind: `stroke-[1.5]` (or inline style) below 24px; 2px otherwise.

**Alternatives rejected** — Single uniform stroke weight at all sizes: rejected — small icons look muddy at 2px, large icons look thin at 1.5px.
