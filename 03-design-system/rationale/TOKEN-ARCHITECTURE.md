# Token Architecture — SkillUp Design System

**Context:** Greenfield. New platform from scratch (16 Jun session). DS born clean on `--sk-*`, no legacy alias layer.
**Brand:** SkillUp (SKO = SkillUp Online). Prefix `--sk-` confirmed in session.
**Products in scope:** LMS (app), Website/Catalog (skillup.online), Landing pages, Newsletters (email).
**Status:** Lean revision. For the naming workshop.

---

## Principle

Keep the Figma source as small as possible. Two tiers, one mode axis, brand and components handled where they belong. Everything that can be generated instead of declared, gets generated.

The earlier 3-tier / brand-collection / component-collection model was over-built for this case. This is the lean version.

---

## Tiers — two, not three

```
PRIMITIVE   --sk-ref-*    raw palette, scale, type. Brand-neutral.
   │                      └─ group Brand/* = the SkillUp anchor ramp (rebrand surface)
   ↓ alias
SEMANTIC    --sk-*        text-*, bg-*, fg-*, border-* (+ brand-* roles). What everything consumes.
   ↓ bind
COMPONENTS  Figma + Storybook bind directly to semantic.
```

- **No component tier by default.** A button uses `--sk-bg-brand-solid` directly. A component token is created only when (a) the component must diverge systematically from semantic, (b) it needs independent theming, or (c) a property must be a designer-tunable token. When created, it lives in code (Storybook), not as a Figma collection.
- **Brand is a small dedicated collection with modes per brand.** It holds only the ~10 brand ramp anchors. The `brand-*` semantic tokens alias it. That small set is the entire rebrand surface, and a new brand is one extra mode.

---

## Modes — brand × scheme

Two axes: brand (SkillUp, BrandX, …) and scheme (Light, Dark). They map to four CSS blocks:

| Mode | CSS selector |
|------|--------------|
| Light SKO | `:root` (default) |
| Dark SKO | `[data-theme="dark"]` |
| Light BrandX | `[data-brand="brandx"]` |
| Dark BrandX | `[data-brand="brandx"][data-theme="dark"]` |

No JS — attributes on `<html>`. The combined `[data-brand][data-theme="dark"]` block exists because a brand's colour usually shifts between light and dark.

**Current state (v1.9, live):** these four modes are built in the colour collection and pass 16/16 WCAG 2.2 AA. BrandX is a green-themed partner reusing the existing green accent ramp. As brand count grows toward the Figma Pro 10-mode cap, the brand axis can be split into its own `Brand` collection (see migration plan) so brand and scheme stop sharing one mode list — same CSS output either way.

---

## Brand / white-label

What changes per brand is ~10 values: the brand anchor ramp. Each anchor **aliases a primitive ramp** — the raw hex stays in `Primitives` (e.g. SkillUp → `ref/blue/*`, BrandX → the green ramp `ref/green/*`). Figma Pro allows up to 10 modes.

Each brand exports to a brand JSON; Style Dictionary emits the `[data-brand]` blocks. A new brand = one new mode plus a ~10-line export. The `brand-*` semantic tokens alias the brand anchors, so switching the mode (in Figma) or the `[data-brand]` attribute (at runtime) reskins everything.

The rebrand surface is always the same ~10 tokens. That is the point of isolating them.

---

## Scope — core vs product

- **Core semantic** is shared by every product. Most tokens live here.
- **Product layer is thin** — only what genuinely diverges, plus the rare component token. Empty if a product needs nothing.
- Never duplicate an identical token per product.
- Products ship as separate build bundles from one DS package.

```
Core semantic ──► LMS  ·  Website/Catalog  ·  Landing  ·  Newsletter
```

---

## Delivery per product

| Product | Runtime | CSS custom properties | Dark |
|---------|---------|----------------------|------|
| LMS (app) | yes | yes, `[data-theme]` (+ `[data-brand]` if multi-tenant) | later |
| Website / Catalog | SSR/static | yes | later |
| Landing | static | yes | later |
| **Newsletter (email)** | **build only** | **NO — inlined static per brand** | prefers-color-scheme only |

**Email is the exception the dev plan misses.** Email can't read CSS variables. The pipeline must emit a second target: semantic tokens resolved to static inline values, one set per brand, at build. No runtime theming.

---

## Figma source-of-truth structure (lean)

> Brand is authored as native Figma modes (Figma Pro, 10 modes), so designers can preview brands on the canvas. Same dev output as the CSS-only path. Migration: `FIGMA-TOKEN-UPGRADE-PLAN.md`.

| Collection | Modes | Holds | CSS |
|-----------|-------|-------|-----|
| `1. Primitives` | 1 | raw brand-neutral ramps + scale + type | `--sk-ref-*` |
| `2. Brand` | SkillUp, Partner… | brand ramp anchors (~10) | `--sk-ref-brand-*` |
| `3. Semantic` | Light, Dark | text/bg/fg/border (brand-* alias Brand) | `--sk-*` |
| `4. Scale & Type` | 1 | spacing, radius, widths, type | `--sk-spacing-*` etc. |

No Component collection — components bind to Semantic. Today's `1. Color modes` collapses into `3. Semantic` (Light/Dark only); the two UUI placeholder modes are dropped. Brand and scheme are two independent mode axes (two collections), so they never multiply.

Each Brand mode exports to a brand JSON; the pipeline emits `[data-brand]` CSS. If Figma-mode upkeep ever bites, drop the Brand modes and keep brand in the pipeline only — dev contract unchanged.

---

## Pipeline (Tokens Studio → Style Dictionary)

**Sets:** `primitives` (incl. brand/skillup), `brand/partnerA` (anchor overrides), `semantic/light`, `semantic/dark`, `scale`, `product/lms`, `product/web`, `product/newsletter`.

**Themes:** `SkillUp · Light · LMS`, `SkillUp · Dark · LMS`, `PartnerA · Light · LMS`, `SkillUp · Newsletter`...

**Targets:**
- `css` — custom properties, `:root` + `[data-theme]` (+ `[data-brand]`). Web.
- `inline-static` — resolved values per brand. Email.
- `ts`/`json` — typed map for app code and tests.

One source, multiple outputs.

---

## Naming (prefix `--sk-`)

- Primitive: `--sk-ref-{category}-{name}` — `--sk-ref-blue-teal`
- Brand anchor (group in primitives): `--sk-ref-brand-{role}` — `--sk-ref-brand-primary`
- Semantic: `--sk-{prop}-{role}` — `--sk-text-primary`, `--sk-bg-brand-solid`, `--sk-border-brand`
- Component (only when justified, in code): `--sk-{component}-{part}` — `--sk-button-bg`
- Product-specific (only when it diverges): `--sk-{product}-{...}` — `--sk-lms-sidebar-bg`

Figma→CSS transform stays mechanical: `Semantic/{group}/{leaf}` → `--sk-{leaf}`. Full colour map in `TOKEN-NAMING-ALIGNMENT.md`.

---

## To confirm

1. Do designers need to preview other brands inside Figma, or always design on SkillUp and rebrand at build? Answer picks brand stage 1 vs 2.
2. Multi-tenant runtime (one deploy, many brands) or per-partner deploy? Picks whether `[data-brand]` CSS output is needed.
3. Newsletter in Phase 1 or later? Drives the inline-static target.
4. Dark mode stays dormant in tokens, shipped for web later. Out of scope for email.
