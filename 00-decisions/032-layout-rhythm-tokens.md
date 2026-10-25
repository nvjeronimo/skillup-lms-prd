---
id: 032
title: The space between sections, columns and cards comes from eight Layout/* tokens
date: 2026-10-25
status: accepted
audience: [designer, dev]
track: Foundations
phase: 1
---
**Decision** — Eight new mode-aware tokens in the DS collection `2. Responsive 📐`, group `Layout/`, for the space
**between** the parts of a page, never inside a component. Each aliases the `Spacing/*` step with that value in each mode,
so they move with the spacing scale. Same values on every skin (SKO, Gold, Red, Studio). Scope Gap.

| Token | Desktop / Tablet / Mobile | Aliases (D / T / M) | Use |
|---|---|---|---|
| `Layout/page-x` | 48 / 40 / 24 | 6xl / 6xl / 5xl | side padding of a platform page |
| `Layout/page-top` | 48 / 40 / 32 | 6xl | top bar → first line of the page |
| `Layout/band-x` | 48 / 32 / 16 | 6xl / 5xl / xl | side padding of the full-bleed pages (Course, Program, Certificate) and their header bands |
| `Layout/section-gap` | 48 / 40 / 32 | 6xl | between the sections of a page |
| `Layout/column-gap` | 48 / 40 / 40 | 6xl / 6xl / 7xl | main column ↔ side column (side by side or stacked) |
| `Layout/stack-gap` | 32 / 32 / 32 | 4xl / 5xl / 6xl | between the blocks of a column or a tab |
| `Layout/side-gap` | 24 / 24 / 32 | 3xl / 4xl / 6xl | between the cards of a side column |
| `Layout/grid-gap` | 32 / 24 / 24 | 4xl / 4xl / 5xl | between the cards of a grid or a list |

**Why**
- Nelson, 25 Oct 2026: more space between sections and columns ("precisamos de dar ainda mais espaçamento entre secções,
  colunas"); the prototype moved the rhythm into eight layout variables the same day (PR 332). Then: "passa os
  espaçamentos para o DS, replica no LMS/ICP e protótipo" — this decision, and the approval the new-token rule asks for.
- Role tokens say what the space is for, as `Container/content-padding` (026) does; a bare `Spacing/6xl` would not, and
  `Layout/stack-gap` needs a different step in each mode to stay at 32.

**Design** — DS variables `Layout/*` (descriptions: when to use, the CSS name). ICP: the page-level stacks of the
platform screens (Ready for Dev and WIP pages) carry these values, on the `Spacing/*` step with the right value in each
screen's mode until the DS is published, then on `Layout/*` (`03-design-system/tools/icp-layout-tokens.js`, `LAYOUT = true`).
Player screens: the sidebar sits 24 from the content (tablet and desktop) and a Reading topic's blocks are 32 apart;
those two are fixed values in the prototype, not tokens.

**Dev impact** — `--sk-layout-*` in `tokens/generated/spacing.css`, generated from the Figma export like every other
token (prototype PR 333, after 332); Tailwind `px-layout-page-x`, `pt-layout-page-top`, `px-layout-band-x`,
`gap-layout-section`, `gap-layout-column`, `gap-layout-stack`, `gap-layout-side`, `gap-layout-grid`. The mode switch is
the DS one (Tablet ≤ 1024, Mobile ≤ 768).

**Alternatives rejected** — Keeping them as prototype-only variables (`tokens/layout.css`): Figma and code would drift.
Reusing `Container/gap` / `Container/gutter`: their values (24/16/12, 32/24/16) are the old, tighter rhythm.
