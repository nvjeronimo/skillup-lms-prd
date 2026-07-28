# SkillUp Design System — Tokens Brief

One-page opener for the next review. Full detail in the linked docs. Everything follows from the dev Design System Discovery (16 Jun) and our follow-up decisions.


> **Canonical export (v2.0):** the source-of-truth token CSS is `../LMS-HANDOFF/tokens/colors.css` (4 modes, `--sk-`, WCAG 2.2 AA) and `../LMS-HANDOFF/tokens/typography.css` (Montserrat, `--sk-`). Migrated from `--lms-` and font corrected to Montserrat on 2026-06-25.

---

## TL;DR — decisions locked

- **Greenfield.** New platform from scratch, so the design system is born clean on `--sk-*`. No legacy alias layer.
- **Prefix `--sk-`** (confirmed in session).
- **Lean structure.** Two real tiers (Primitive → Semantic), components bind to semantic. No Component collection.
- **Brand as native Figma modes** — a Brand collection, one mode per brand. Figma Pro is limited to 10 modes. Same dev output as a pure-CSS approach; reversible.
- **Hex lives only in Primitives.** Brand and Semantic only alias. Always.
- **Newsletters (email) need a second output** — resolved static values inlined per brand. Email can't read CSS variables. Not in the dev plan; flag it.

### Already implemented (v1.9, live in the DS + deployed)

- **4 colour modes built and validated:** Light SKO, Dark SKO, Light BrandX, Dark BrandX (BrandX = a green-themed partner reusing the existing green accent ramp).
- **16/16 WCAG 2.2 AA** across all four modes.
- New primitive `AC5b_Red5b #E8797B` (dark-mode error text, 5.21:1) and new semantic `LMS/Border/border-focus-ring` (maps to each mode's brand colour).
- CSS shipped as four blocks: `:root`, `[data-theme="dark"]`, `[data-brand="x"]`, `[data-brand="x"][data-theme="dark"]` — no JS, attributes on `<html>`. Deployed to the PRD hub.

---

## The architecture in brief

Four Figma collections:

| Collection | Modes | Role |
|-----------|-------|------|
| 1. Primitives | 1 | all raw hex: SkillUp ramp + (later) each partner ramp + scale + type |
| 2. Brand | SkillUp, BrandX, … | brand anchors (~10), alias primitives, one value per brand |
| 3. Semantic | Light, Dark | text/bg/fg/border (+ brand-*), alias Brand or Primitives |
| 4. Scale & Type | 1 | spacing, radius, widths, type |

Two **independent** mode axes: Brand (SkillUp · Partner…) and Scheme (Light · Dark). A frame sets each separately, so they never multiply. Components bind to Semantic only.

The alias chain, with the no-hex rule: **Primitives (hex) → Brand (alias, per brand) → Semantic (alias, per scheme) → Components.** Nothing above Primitives carries a hex value.

---

## How the dev side consumes it

One global `:root { --sk-…: value }` stylesheet, loaded once. CSS Modules scope class names, not custom properties, so a component writes `var(--sk-text-primary)` and it resolves globally. Theme and brand are data attributes on `<html>` (`data-theme`, `data-brand`). Stack: Next.js 15, React 18, CSS Modules.

If Figma names, aliasing, and modes are right, the CSS is a generated mirror of Figma. No translation, no drift.

---

## Multi-brand

Brand lives in the build, not in the Figma file structure. Each brand is a small JSON of ~10 anchor overrides; Style Dictionary emits a `[data-brand="x"] { … }` block. Because the semantic tokens alias the brand anchors, overriding the anchors reskins everything — the component is never touched. Adding a brand = one new mode in Figma + a 10-line export. Designers preview brands in Storybook and in Figma (native modes).

See the live proof in `multibrand-demo.html`.

---

## Dark mode — reuses primitives, one addition

Dark values alias existing SKO primitives (e.g. `bg-primary` dark → N01_Grey1, `bg-brand-solid` dark → P04_Blue_Links, `text-brand` dark → P05_Blue_UI_Dark). Two adjustments were needed to pass WCAG 2.2 AA in dark: `border-primary` moved N04 → N03, and one **new primitive** `AC5b_Red5b #E8797B` was added for dark-mode error text (the existing reds failed contrast). No hex in semantics — all aliases. Dark is built and validated for all four modes; ships for web per roadmap. Out of scope for email.

---

## Migration — binding-safe

Figma bindings follow the variable ID, not the name, so we rename collections/modes/variables in place (bindings survive) and re-point ~11 brand aliases; only the Brand collection is new. Six phases: safety snapshot → collapse modes and rename to Semantic → promote brand anchors → add brand modes → naming cleanup → pipeline → verify. ~2.5–3 days Figma-side.

**Key risk to call out:** republishing the library resets applied variable modes on the 11 production screens — they must be reapplied. Known Figma behaviour, budgeted in the plan.

Full steps, risk register and rollback: `FIGMA-TOKEN-UPGRADE-PLAN.md`.

---

## Open questions for the room

1. White-label runtime (one deploy, many brands via `[data-brand]`) or per-partner deploy? Picks the CSS output shape.
2. Products (LMS, Website, Landing, Newsletter) — separate apps in one monorepo sharing the DS package? (assumed yes)
3. Newsletter in Phase 1, or later? Drives the email inline-static target.
4. Named DS owner with decision rights — the single biggest risk to the whole effort (see pushback doc).

---

## The pack (in this folder)

- `00-TOKENS-BRIEF.md` — this opener
- `TOKEN-ARCHITECTURE.md` — full structure
- `TOKEN-FOUNDATIONS.md` — foundations & principles (colour, type, spacing, radius, responsive; what moves to primitives)
- `TOKEN-NAMING-ALIGNMENT.md` — exact Figma → CSS token map with values
- `DEV-IMPLEMENTATION-AND-MULTIBRAND.md` — dev consumption + multi-brand
- `FIGMA-TOKEN-UPGRADE-PLAN.md` — 6-phase migration plan
- `DS-REVIEW-PUSHBACK.md` — points to challenge the dev discovery on
- `token-architecture-diagram.svg` — architecture diagram
- `diagram-hybrid-model.svg` — resolved hybrid model (3 collections, mode axes)
- `diagram-realias-per-mode.svg` — one semantic, re-aliased per brand mode
- `figma-variables-proposed.html` — proposed Variables panel
- `multibrand-demo.html` — live brand/theme switch demo
- `Design System Discovery - Demo Session/session-transcript.md` — session transcript (OCR)
