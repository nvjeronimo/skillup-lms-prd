# Token Naming Alignment — Figma to CSS

**For:** Frontend team, before Phase 1 (Storybook + token setup)
**From:** Design
**Source of truth:** SKO Design System (Untitled UI), Figma file `c7EUDrQwP8si08aPipDSIV`, collection `1. Color modes` + `_Primitives`
**Date:** 16 June 2026

---

## Why this doc exists

The discovery proposes `--sk-*` CSS variables in three tiers. The Figma library already has that three-tier structure built and bound to every production screen. If dev invents a parallel naming scheme, we recreate the exact drift this project exists to kill.

This doc gives the one-to-one map so the pipeline (Tokens Studio to Style Dictionary to CSS) produces names that match the design source on day one.

**One decision up front:** generate the semantic CSS layer from the `LMS/*` token set only (30 tokens), not the full UUI library (862 variables). The LMS set is what production screens bind to. The rest of UUI is reference material we do not ship.

---

## The three tiers, mapped

| Tier | Figma location | Count | CSS prefix | Role |
|------|---------------|-------|-----------|------|
| 1. Primitive | `_Primitives` → `Colors/SKO-Brand/*`, `Spacing/*` | raw palette + scale | `--sk-ref-*` | Raw values. Never referenced by components directly. |
| 2. Semantic | `1. Color modes` → `LMS/*` | 30 | `--sk-*` | Usage-based. This is the contract components consume. |
| 3. Component | Storybook component tokens (new) | per component | `--sk-{component}-*` | Component-specific, alias to tier 2. |

The doc's examples (`--sk-color-brand`, `--sk-text-primary`, `--sk-button-bg`) already match this. Keep `--sk-` as the prefix.

---

## Naming transform rule

The Figma `LMS/*` leaf names are already conventionally prefixed (`text-`, `bg-`, `fg-`, `border-`). So the transform is mechanical:

```
LMS/{Group}/{leaf}  →  --sk-{leaf}
```

Drop the `LMS/` namespace and the group segment. Keep the leaf. Prefix `--sk-`.

- `LMS/Text/text-primary` → `--sk-text-primary`
- `LMS/Background/bg-brand-solid` → `--sk-bg-brand-solid`
- `LMS/Border/border-brand` → `--sk-border-brand`
- `LMS/Foreground/fg-progress` → `--sk-fg-progress`

No remapping table to maintain. Configure this as a Style Dictionary name transform once.

---

## Mode to theme mapping (live, v1.9)

The colour collection now carries four real modes — two brands × two schemes. The old UUI placeholder modes were repurposed into BrandX.

| Figma mode | CSS selector |
|-----------|--------------|
| Light SKO | `:root` (default) |
| Dark SKO | `[data-theme="dark"]` |
| Light BrandX | `[data-brand="brandx"]` |
| Dark BrandX | `[data-brand="brandx"][data-theme="dark"]` |

Four CSS blocks, no JS — attributes on `<html>`. Brand colours differ per scheme (e.g. BrandX dark uses lighter greens), which is why the combined `[data-brand][data-theme="dark"]` block exists. All four modes pass 16/16 WCAG 2.2 AA.

---

## Tier 2 — Semantic color contract (the 30 LMS tokens)

Values are Light mode SKO (default) / Dark mode SKO. Aliased primitive shown for traceability.

### Text

| CSS variable | Light | Dark | Aliases to |
|---|---|---|---|
| `--sk-text-primary` | `#13282F` | `#FFFFFF` | N00_DeepTeal / White |
| `--sk-text-secondary` | `#606B7A` | `#E1E7EC` | N02_Gray2 / N05_Gray5 |
| `--sk-text-tertiary` | `#677482` | `#B9C4CE` | N02b_Gray_Mid / N04_Gray4 |
| `--sk-text-brand-primary` | `#044150` | `#EBF8FF` | P01_Brand_Blue / P07_UI_Blue |
| `--sk-text-brand-secondary` | `#26708E` | `#66A3D6` | P03_Blue_Teal / P05_Blue_UI_Dark |
| `--sk-text-brand` | `#26708E` | `#66A3D6` | P03_Blue_Teal / P05_Blue_UI_Dark |
| `--sk-text-primary_on-brand` | `#FFFFFF` | `#FFFFFF` | White |
| `--sk-text-success-primary` | `#1F7643` | `#40C075` | Green AB02 / AB04 |
| `--sk-text-warning-primary` | `#85580E` | `#F9C654` | Yellow AD1 / AD4 |
| `--sk-text-error-primary` | `#DA3336` | `#E26567` | Red AC4 / AC5 |

### Foreground (icons, strokes)

| CSS variable | Light | Dark | Aliases to |
|---|---|---|---|
| `--sk-fg-brand-primary` | `#26708E` | `#66A3D6` | P03_Blue_Teal / P05_Blue_UI_Dark |
| `--sk-fg-brand` | `#26708E` | `#66A3D6` | P03_Blue_Teal / P05_Blue_UI_Dark |
| `--sk-fg-white` | `#FFFFFF` | `#FFFFFF` | White |
| `--sk-fg-quaternary` | `#B9C4CE` | `#8995A6` | N04_Gray4 / N03_Gray3 |
| `--sk-fg-progress` | `#0086C9` | `#0086C9` | P08_Blue_Progress |

### Background

| CSS variable | Light | Dark | Aliases to |
|---|---|---|---|
| `--sk-bg-primary` | `#FFFFFF` | `#212934` | White / N01_Grey1 |
| `--sk-bg-secondary` | `#F3F5FA` | `#212934` | N06b_Gray_Light / N01_Grey1 |
| `--sk-bg-secondary_subtle` | `#F8F9FA` | `#606B7A` | N06_Gray6 / N02_Gray2 |
| `--sk-bg-tertiary` | `#E1E7EC` | `#606B7A` | N05_Gray5 / N02_Gray2 |
| `--sk-bg-brand-primary` | `#EBF8FF` | `#044150` | P07_UI_Blue / P01_Brand_Blue |
| `--sk-bg-brand-section` | `#EBF8FF` | `#215477` | P07_UI_Blue / P02_Blue_Ink |
| `--sk-bg-brand-solid` | `#26708E` | `#3685C6` | P03_Blue_Teal / P04_Blue_Links |
| `--sk-bg-brand-hover` | `#F9C654` | `#F9C654` | Y01_Yellow_Hover |
| `--sk-bg-warning-primary` | `#FFF9EB` | `#AC7720` | Yellow AD6 / AD2 |
| `--sk-bg-success-primary` | `#E4FCED` | `#1F7643` | Green AB06 / AB02 |
| `--sk-bg-error-primary` | `#FCE8E8` | `#881C1F` | Red AC6 / AC2 |

### Border

| CSS variable | Light | Dark | Aliases to |
|---|---|---|---|
| `--sk-border-primary` | `#8995A6` | `#8995A6` | N03_Gray3 (moved from N04 for WCAG) |
| `--sk-border-secondary` | `#E1E7EC` | `#606B7A` | N05_Gray5 / N02_Gray2 |
| `--sk-border-brand` | `#26708E` | `#66A3D6` | P03_Blue_Teal / P05_Blue_UI_Dark |
| `--sk-border-focus-ring` | brand | brand | maps to each mode's brand colour (v1.9) |

New primitive added in v1.9 for dark-mode error text (existing reds failed contrast): `Colors/SKO-Brand/Accents/Red/AC5b_Red5b = #E8797B` (5.21:1 in dark). `--sk-text-error-primary` aliases it in both dark modes.

---

## Tier 1 — Primitive palette (SKO brand)

These back the semantic layer. Emit them as `--sk-ref-*` but do not reference them in component CSS — always go through a tier 2 token.

### Primary (blues + teal)

| CSS variable | Hex |
|---|---|
| `--sk-ref-p01-brand-blue` | `#044150` |
| `--sk-ref-p02-blue-ink` | `#215477` |
| `--sk-ref-p03-blue-teal` | `#26708E` |
| `--sk-ref-p04-blue-links` | `#3685C6` |
| `--sk-ref-p04b-blue-light` | `#51BFFC` |
| `--sk-ref-p05-blue-ui-dark` | `#66A3D6` |
| `--sk-ref-p06-blue-ui-med` | `#ACD5F4` |
| `--sk-ref-p07-ui-blue` | `#EBF8FF` |
| `--sk-ref-p08-blue-progress` | `#0086C9` |
| `--sk-ref-n00-deep-teal` | `#13282F` |

### Neutral (grays)

| CSS variable | Hex |
|---|---|
| `--sk-ref-n01-grey1` | `#212934` |
| `--sk-ref-n02-gray2` | `#606B7A` |
| `--sk-ref-n02b-gray-mid` | `#677482` |
| `--sk-ref-n03-gray3` | `#8995A6` |
| `--sk-ref-n04-gray4` | `#B9C4CE` |
| `--sk-ref-n05-gray5` | `#E1E7EC` |
| `--sk-ref-n06-gray6` | `#F8F9FA` |
| `--sk-ref-n06b-gray-light` | `#F3F5FA` |
| `--sk-ref-white` | `#FFFFFF` |

### Accents (semantic states + hover)

| CSS variable | Hex | Used by |
|---|---|---|
| `--sk-ref-yellow-hover` | `#F9C654` | bg-brand-hover |
| `--sk-ref-green-ab02` | `#1F7643` | success text/bg |
| `--sk-ref-green-ab04` | `#40C075` | success text (dark) |
| `--sk-ref-green-ab06` | `#E4FCED` | success bg |
| `--sk-ref-red-ac2` | `#881C1F` | error bg (dark) |
| `--sk-ref-red-ac4` | `#DA3336` | error text |
| `--sk-ref-red-ac5` | `#E26567` | error text (dark) |
| `--sk-ref-red-ac6` | `#FCE8E8` | error bg |
| `--sk-ref-yellow-ad1` | `#85580E` | warning text |
| `--sk-ref-yellow-ad2` | `#AC7720` | warning bg (dark) |
| `--sk-ref-yellow-ad4` | `#F9C654` | warning text (dark) |
| `--sk-ref-yellow-ad6` | `#FFF9EB` | warning bg |

---

## Non-color tokens (spacing, radius, width, type)

These live in separate single-mode collections. Map names directly with the same `--sk-*` prefix. **Do not hand-transcribe px values — let Style Dictionary emit them from the file**, so they stay in sync.

- **Spacing** (`3. Spacing`): `spacing-none, xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl, 10xl, 11xl` → `--sk-spacing-*`. These alias onto a 4pt primitive scale (`0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px`).
- **Radius** (`2. Radius`): `radius-none, xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, full` → `--sk-radius-*`.
- **Width** (`4. Widths`): `width-xxs … width-6xl, paragraph-max-width` → `--sk-width-*`.
- **Typography** (`6. Typography`): `font-family-display`, `font-family-body`; weights `regular / medium / semibold / bold` (+ italics); sizes `text-2xs, text-xs, text-sm, text-md, text-lg, text-xl, display-xs … display-2xl`; matching line heights → `--sk-font-*`, `--sk-text-size-*`, `--sk-line-height-*`. Body and display are both Montserrat.

---

## White-labeling — which tokens are brandable

Partner overrides should redefine the brand tokens only, not a separate CSS file per partner. A partner theme = re-point this short list. Everything else inherits.

Brandable tier 2 tokens:
`--sk-text-brand-primary`, `--sk-text-brand-secondary`, `--sk-text-brand`, `--sk-fg-brand-primary`, `--sk-fg-brand`, `--sk-fg-progress`, `--sk-bg-brand-primary`, `--sk-bg-brand-section`, `--sk-bg-brand-solid`, `--sk-bg-brand-hover`, `--sk-border-brand`.

Caveat: overrides only reach the UI once a component consumes the token. Components still on hardcoded hex will not respond. White-label coverage tracks tokenization coverage, not the override file.

---

## Migration aliasing

To avoid breaking legacy pages during cutover, alias old repo variables to new tokens rather than find-replacing everything at once:

```css
/* legacy alias layer — remove after migration */
--color-primary: var(--sk-text-primary);
--brand: var(--sk-bg-brand-solid);
```

Deprecate the alias layer on a controlled schedule, one component family at a time.

---

## Prefix — one system namespace, never per brand

A meeting raised the idea of brand-specific semantic prefixes: SkillUp `--sk-*`, BrandX `--brdx-*`. **Recommendation: do not.** Use a single namespace (`--sk-`) for all brands.

### Why per-brand prefixes break the model

The system works because a component is written once and never changes per brand. The component references `var(--sk-bg-brand-solid)`; the brand swaps the *value* via the Figma mode and the `[data-brand]` selector. If the semantic *name* encodes the brand:

- The component must know which brand it renders and pick a different variable name. Brand logic leaks into every component.
- The runtime switch dies. `[data-brand]` works only because the same name resolves to a different value. Different names per brand force conditional CSS or duplicated components.
- It reintroduces the duplication this system exists to remove.

The Variables table already proves the correct model: `text-primary` is one name with a different value per mode (SKO Light/Dark, BrandX Light/Dark). A brand prefix would contradict it.

### Two different prefixes, don't conflate them

1. **System namespace** (`--sk-`) — avoids collisions with third-party CSS (Bootstrap, partner code). Applies to *every* brand. Here "sk" means the SkillUp Design *System*, not the SkillUp brand.
2. **Per-brand prefix** (`--brdx-`) — encodes the brand in the name. This is the one to reject.

We keep 1, reject 2.

### The "sk = SkillUp" ambiguity

The idea came from reading `--sk-` as the brand, so BrandX seemed to need `--brdx-`. It's a false symmetry. Two options:

- Keep `--sk-` and document it as the system namespace, applied to all brands. Zero churn. **Recommended.**
- Rename once to a brand-neutral namespace (`--sko-` for the company, or `--ds-`). Only if the ambiguity genuinely bothers the team — it is churn for cosmetics.

### Where a prefix may legitimately live

- Figma token names: one namespace, never per brand.
- Export (Style Dictionary): a build can apply a prefix if ever needed, but it is one prefix per build/app, not per token.
- The only real case for brand-prefixed tokens is rendering two brands at once in the same DOM without scoping (e.g. a "compare brands" view). Even then, scope with `[data-brand]` on a wrapper instead. For the LMS and the website this never happens.

---

## Open decisions for the team

1. Confirm `--sk-` as the final prefix (single system namespace for all brands — see prefix section above).
2. Confirm primitive layer name: `--sk-ref-*` vs `--sk-palette-*`.
3. Agree that semantic generation pulls from `LMS/*` only, not full UUI.
4. Confirm Tokens Studio exports the `1. Color modes` collection with Light mode SKO as default set.
5. Decide whether dark mode values are emitted now (dormant) or stripped until dark is in scope. Recommendation: emit dormant.
