# 06 · V8 Complementary Pages (Track B) — WIP 🟠

A **separate, parallel product stream** (SkillUp Brand), **not part of the Phase 1 handoff**. Kept
visible and clearly marked WIP so it is never mixed into Ready-for-Dev material.

> Figma: **`4340-322` — V8 - Complementary Pages (SkillUp Brand) - WIP 🟠** —
> [open in Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4340-322)
> (screens section `4340-323`). No local files yet — this is a Figma-resident discovery.

## Status — do NOT describe as DS-compliant

Known state (as of 2026-07-20): the V8 screens started as **raw-frame captures, not linked to
reusable components**. Migration to DS library instances is **in progress** — only some screens have
been partially swapped to real DS components:

- `Course Detail — Light Hero` (`4554:63338`) — partially swapped to DS badge/button components
- `Dashboard — Topbar Nav (Experiment)` (`4554:63757`) — partially swapped

Everything here is 🟠 WIP.

## How it relates to Track A

- **Shared DS?** It is *migrating toward* the same SKO Design System (`c7EUDrQwP8si08aPipDSIV`), not
  yet fully on it.
- **Shared tokens?** Target is the same `--sk-*` tokens; not yet fully bound.
- **Brand direction?** "SkillUp Brand" complementary pages — a parallel exploration, not the Phase 1
  learner-platform screens.

Bug fixed at DS master-component level during this work (status chips must use background tokens, not
foreground) is recorded as a decision: [`../00-decisions/018`](../00-decisions/).
