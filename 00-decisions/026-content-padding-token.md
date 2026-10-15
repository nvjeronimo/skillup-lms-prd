---
id: 026
title: The content section of a topic is padded with Container/content-padding (24 / 20 / 16)
date: 2026-10-15
status: accepted
audience: [designer, dev]
track: Foundations
phase: 1
---
**Decision** — A new mode-aware token, `Container/content-padding`, in the DS collection `3. Responsive 📐`: Desktop 24,
Tablet 20, Mobile 16. It aliases `Spacing/3xl` in every mode, so it moves with the spacing scale. It pads the content
section of every ICP topic type (the frame that holds the Topic-Header and the content), on all four sides.

**Why**
- Nelson, 15 Oct 2026: the content section should breathe more (24 on desktop, his example on a Reading screen) and
  the value should be one responsive token, not a number per screen.
- The screens had 12 / 16 (`Spacing/lg` / `Spacing/xl`) on desktop and tablet and 16 on mobile; the prototype a fixed 16.
- A role token (like `Container/gutter` and `Container/gap`) says what it is for; `Spacing/3xl` alone would not.
  Values and name chosen by Nelson the same day (asked: 24/20/16, `Container/content-padding`).

**Design** — DS variable `VariableID:22706:35`, scope Gap/padding, WEB syntax `var(--container-content-padding)`;
documented in the `Container tokens` block of the Foundations · Spacing, radius & grids page. Product file: the
`content` frames of the ICP topic screens (and `scroll-area` on mobile) bound to it.

**Dev impact** — one padding value per breakpoint for the topic content section: `p-4` / `min-[769px]:p-5` /
`min-[1025px]:p-6` in the prototype (`CONTENT_PAD` in `PlayerShell`, PR 171); `tokens/spacing.md` lists it.

**Alternatives rejected** — Binding `Spacing/3xl` directly (works, but nothing says it is the content padding, and a
later change to the scale would move it silently); a fixed 24 everywhere (too wide on a 375 phone).
