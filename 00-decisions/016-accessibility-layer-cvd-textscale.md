---
id: 016
title: Accessibility layer — CVD-safe states + text scale
date: 2026-07-24
status: accepted
audience: [designer, dev]
track: A
phase: 1
---
**Decision** — Add an accessibility layer orthogonal to skin and theme: colourblind-safe state colours (`data-vision="cvd"`) and a text scale (`--sk-font-scale`, A / A+ / A++ = 100 / 115 / 130%). Shipped in DS v3.3.

**Why**
- State colours collapse under CVD — warning ≈ error at ΔE 3.9 for deuteranopes — so success/warning/error are indistinguishable.
- The Okabe-Ito palette separates states by blue-yellow + lightness (ΔE ≥ 18), and all tiers pass AA.
- 18 CVD primitives (`Colors/SKO-Brand/CVD/*`) verified 1:1 against the prototype `colors.css`.

**Source** — Handoff CHANGELOG v3.3, 2026-07-24. [`../LMS-HANDOFF/CHANGELOG.md`](../LMS-HANDOFF/CHANGELOG.md), [`../LMS-HANDOFF/variable-collections-guide.md`](../LMS-HANDOFF/variable-collections-guide.md).

**edX basis** — n/a.

**Design** — SKO Design System · page "♿ Accessibility Standards" (node-id unknown). File [`c7EUDrQwP8si08aPipDSIV`](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/).

**Dev impact** — Prototype PR#8; 18 `Colors/SKO-Brand/CVD/*` primitives; `data-vision="cvd"` + `--sk-font-scale` toggles; `.sk-text-*` via calc. See `variable-collections-guide.md`.

**Alternatives rejected** — Relying on the default state palette for CVD users: rejected — warning and error are indistinguishable (ΔE 3.9) under deuteranopia.
