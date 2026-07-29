---
id: 014
title: DS v3.0 skin system — OKLCH ramps, zero raw hex
date: 2026-07-22
status: accepted
audience: [designer, dev]
track: Foundations
phase: 1
---
**Decision** — DS v3.0 replaces hand-picked skin values with 6 skins (SKO + gold/violet/sky/red/ink), each a 12-step OKLCH ramp generated from 2 brand anchors, with 0 raw hex values (was 42 of 60). **BREAKING:** attribute `data-brand` → `data-skin`; the `data-brand="x"` green demo skin is removed. Also lands: dark surface ladder (resolves `bg-secondary` = `bg-primary`), hover-lightens-in-dark, and a primitive layer that carries values not role names.

**Why**
- Hand-picked skin values caused AA failures — the Ink skin's brand text sat at 3.50:1, below even the 3:1 floor, because the value was chosen by hand.
- Systematic ramps map roles to fixed positions, so that class of contrast bug cannot recur.
- Dark surface ladder gives 4 distinct surfaces ~1.07:1 apart; hover lightening stops controls sinking into the surface in dark mode.

**Source** — Handoff CHANGELOG v3.0, 2026-07-22 (published in Figma 2026-07-24). [`../LMS-HANDOFF/CHANGELOG.md`](../LMS-HANDOFF/CHANGELOG.md), [`../LMS-HANDOFF/variable-collections-guide.md`](../LMS-HANDOFF/variable-collections-guide.md).

**edX basis** — n/a.

**Design** — SKO Design System (v3.3 published 2026-07-24): [`c7EUDrQwP8si08aPipDSIV`](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/). `_Primitives` + `2. Skins` collections; ❖ FOUNDATIONS swatch sheet (node-id unknown).

**Dev impact** — Every screen. Migrate `data-brand` → `data-skin` markup. Light-mode text darkened: `text-secondary`, `text-tertiary`, `text-brand`, `text-brand-secondary`. `bg-error-solid` now desaturates in dark.

**Alternatives rejected** — Keeping hand-picked per-skin values: rejected — produced AA failures (Ink 3.50:1) that hand-tuning could not systematically prevent.
