---
id: 017
title: Accessibility architecture — values as primitives, override in CSS
date: 2026-07-24
status: accepted
audience: [designer, dev]
track: Foundations
phase: 1
---
**Decision** — Accessibility values live as primitives in Figma; the conditional override lives in CSS, not in Figma variable modes.

**Why**
- Figma variable modes are a single axis per collection and cannot conditionally alias across axes.
- Modelling `data-vision` / `data-text-size` as modes explodes combinatorially — the Semantics collection would go 4 → 8 on the vision axis alone.
- Same pattern already proven by `[data-skin]` + `--sk-font-scale`: primitives hold data, CSS attribute selectors resolve the axis.

**Source** — Handoff CHANGELOG v3.3 + variable collections guide, 2026-07-24. [`../LMS-HANDOFF/CHANGELOG.md`](../LMS-HANDOFF/CHANGELOG.md), [`../LMS-HANDOFF/variable-collections-guide.md`](../LMS-HANDOFF/variable-collections-guide.md).

**edX basis** — n/a.

**Design** — SKO Design System · page "♿ Accessibility Standards" (node-id unknown). File [`c7EUDrQwP8si08aPipDSIV`](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/).

**Dev impact** — CVD/text-size resolved by CSS `[data-vision]` / `--sk-font-scale`, never by Figma modes. Keeps the Semantics collection from doubling per accessibility axis.

**Alternatives rejected** — Modelling accessibility axes as Figma variable modes: rejected — combinatorial explosion (Semantics 4 → 8 on vision alone; more once text-size is added).
