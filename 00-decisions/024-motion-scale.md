---
id: 024
title: Motion scale — Material names, one mode, reduced motion keeps feedback
date: 2026-10-14
status: proposed
audience: [designer, dev]
track: Foundations
phase: 1
---
**Decision** — Motion is a token foundation like colour: 5 durations, 5 easings and 3 distances with Material 3 names
and our values, in one mode (no breakpoint, theme or skin variance), and reduced motion removes travel but keeps
opacity and colour feedback.

**Why**
- Nelson, 14 Oct 2026: durations are **fixed across breakpoints** (Q1); reduced motion **removes movement and keeps
  feedback**, as the prototype has done since PR 58 (Q2); the Figma tokens get **their own `Motion` collection** (Q3);
  value changes too small to see are **accepted without a side-by-side** (Q4).
- 17 Sep 2026 rule: motion adopts Material's names where a framework on the other end reads them; values stay ours.
  Our values land on Material's slots: short2 100 · short3 150 · short4 200 · medium2 300 · long2 500.
- The prototype had no motion token, ~20 hand-typed durations, and surfaces that entered but never left.

**Source** — [`../03-design-system/motion-matrix.md`](../03-design-system/motion-matrix.md) v2 (14 Oct 2026), built
on the v1 draft of 10 Aug 2026 ("Microinterações no LMS" session). BR-39 / P1-70 in `LMS-HANDOFF/BA/`.

**edX basis** — none: Open edX MFEs (Paragon) ship their own transitions; these tokens are plain CSS variables the
SkillUp theme layer can carry.

**Design** — Figma DS: `Motion` collection (`VariableCollectionId:22638:35`, 13 variables, published in the DS library on 14 Oct 2026) + documentation frame [`22639-583252`](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22639-583252) on the Foundations page `↳ Motion` (moved out of In review on 19 Oct 2026, frame `Doc · Foundations · Motion`, linked from Start here) (scale, R1–R10, reduced motion, four storyboards, smoothness). Prototype: PRs #153–#158, #160 in nvjeronimo/skillup-lms-prototype.

**Dev impact** — `tokens/motion.css` (`--motion-duration-*`, `--motion-easing-*`, `--motion-distance-*`), Tailwind
theme entries, a `raw-motion` lint rule, `useExitTransition`. Component behaviour per motion-matrix §7.
BR-39 amendment proposed to the BA, not applied.

**Alternatives rejected** — Shorter durations on mobile (duration is perceptual, not spatial); BR-39 literally (an
instant, uncued change is the hardest to notice); motion inside the existing colour/spacing collections (touches
published collections with many bindings); Framer Motion in the prototype (a dependency the handoff cannot carry;
CSS tokens port to any stack); the v1 names `instant/fast/base/slow/narrative` (superseded by the 17 Sep Material rule).

**Amendment (22 Oct 2026, Nelson, from an Emil Kowalski design-engineering review)** — Exits use
`standard-decelerate` (an ease-out) instead of `standard-accelerate` (R8); `standard-decelerate` becomes
`cubic-bezier(0.23, 1, 0.32, 1)`; `standard-accelerate` stays in the scale, unused by the UI. Menus and popovers animate
with CSS transitions (interruptible) instead of keyframes; hover styles apply only on devices that hover.
motion-matrix §8b, prototype PR 252. The Figma `Motion` variable `easing/standard-decelerate` was updated the same day (not yet published).
