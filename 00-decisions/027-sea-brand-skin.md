---
id: 027
title: Sea, a livelier brand skin from the SkillUp foundation colours (proposal in the prototype)
date: 2026-10-19
status: proposed
audience: [designer, dev, stakeholder]
track: Foundations
phase: 1
---
**Decision (proposed)**: a fourth brand skin, **Sea**, beside SKO, Gold and Red. It keeps the SKO brand tokens and gives
colour a job:
- the platform top bar is deep teal (#044150, the logo and certificate teal);
- the yellow (#F9C654) is the spark: the current page marker and the learner avatar;
- the dark bands (Dashboard glance card, Program header, Program-Card hero, mentor cards) run deep teal → teal;
- page headings carry their second half in text/primary;
- the Dashboard shortcuts take sky, mint and sun.

It is live in the prototype as a skin to try (profile menu → Sea). It is not in the DS yet.

**Why**
- Nelson, 19 Oct 2026: the layout felt monochrome, "sem vida"; he asked for a more innovative and cheerful theme using
  the SkillUp foundation colours.
- Of three proposals (A Maré, B Sol, C Prisma; `03-design-system/rationale/skin-proposals-2026-10-19.html`), Nelson chose
  A and asked for it in the prototype. The skin was first called Maré; he renamed it Sea. On 19 Oct he asked for it on
  more screens.
- Same SkillUp identity, more presence: the deep teal and the yellow already belong to the brand (logo, certificate,
  the primary hover).

**Kept** — Progress in bg/info. Green only for completed. AA contrast everywhere. The player and the topic content stay
calm. The course header stays light.

**Design** — Prototype only (PRs 199, 200, 203): CSS in `tokens/colors.css` under `[data-skin="sea"]`, with hooks
`data-chrome`, `data-chrome-ink`, `data-band`, `data-heading-em`, `data-tone`, `data-glance`. One new prototype token,
`--color-bg-chrome` (#044150). Two steps between it and bg/primary are written in the CSS (#0a5266 hover, #0a5a70
gradient). The rest reuses existing tokens.

**To approve before the DS** — the three colours above as DS tokens (names to agree, Material-style as decided for new
tokens); Sea as a brand mode beside Gold and Red; Figma screens in Sea to compare with SKO; Gold, Red and Sea checked on
the Calendar, Discussion and Services screens.

**Alternatives** — B Sol (yellow-led: more cheerful, but tiring over a long day and it competes with the yellow of the
deadline warnings); C Prisma (a colour per section: helps finding things, needs a fixed section → colour map, risks a
rainbow).
