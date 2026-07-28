# How devs consume tokens, and multi-brand

**Purpose:** mental model of the dev side so we shape Figma variables for a 1:1 match, and a multi-brand approach that scales cleanly.
**Stack:** Next.js 15, React 18, CSS Modules, CSS custom properties. Pipeline: Tokens Studio → Style Dictionary → CSS.

---

## 1. How the dev side actually consumes tokens

- The build emits **one global stylesheet** of CSS custom properties: `:root { --sk-...: value }`. Loaded once, app-wide.
- **CSS Modules scope class names, not custom properties.** Custom properties are global and cascade. So a component's `.module.css` writes `color: var(--sk-text-primary)` and it resolves from the global `:root`. Modules and tokens do not fight.
- A component **never hardcodes a value**. It only references `var(--sk-*)`.
- React applies the module classes. Theme and brand are a **data attribute** on `<html>` (or a provider wrapper): `data-theme`, `data-brand`.

```css
/* button.module.css — written once, never per brand */
.button { background: var(--sk-bg-brand-solid); color: var(--sk-text-primary-on-brand); }
```

---

## 2. The mechanism: theme and brand are just selector overrides

CSS custom properties re-resolve live. Redefine a variable under a selector and everything referencing it updates, no component change.

This is the live v1.9 pattern — four blocks, no JS:

```css
:root{                                      /* Light SKO (default) */
  --sk-ref-brand: #26708E;
  --sk-bg-brand-solid: var(--sk-ref-brand); /* semantic aliases the anchor */
  --sk-text-primary:  #13282F;
}
[data-theme="dark"]{                         /* Dark SKO */
  --sk-text-primary:  #FFFFFF;               /* scheme overrides neutrals */
  --sk-ref-brand:     #66A3D6;               /* brand lighter for dark */
}
[data-brand="brandx"]{                       /* Light BrandX (green partner) */
  --sk-ref-brand:     #1F7643;
}
[data-brand="brandx"][data-theme="dark"]{    /* Dark BrandX */
  --sk-ref-brand:     #40C075;
}
```

```html
<html data-theme="dark" data-brand="brandx"> … </html>
```

The button is never touched. Because `--sk-bg-brand-solid` aliases `--sk-ref-brand`, redefining that anchor under the active mode block reskins the button automatically. The combined `[data-brand][data-theme="dark"]` block exists because a brand's colour usually shifts between light and dark. **Brand override = a handful of anchor variables. That is the whole trick.** All four modes pass 16/16 WCAG 2.2 AA.

---

## 3. Rules that make Figma ↔ CSS a perfect 1:1 match

1. **Identical names.** `Semantic/text-primary` → `--sk-text-primary`. One mechanical transform in Style Dictionary (`Semantic/{group}/{leaf}` → `--sk-{leaf}`).
2. **Preserve aliasing.** A Figma alias becomes a CSS `var()` reference. The primitive→semantic indirection must survive into the CSS, because that indirection is what makes brand/theme overrides cascade.
3. **Modes become selectors.** Figma Light/Dark modes → `:root` and `[data-theme="dark"]`; Brand modes → `[data-brand="x"]`.
4. **Export only the lean set.** Scope variables in Figma so the junk (the 862-variable UUI dump) does not export. Dev gets ~150 real tokens, not 862.
5. **Dimensions carry units.** spacing/radius/widths export as px; type maps to `font-size`/`line-height`/`font-family` vars.
6. **One direction of truth.** Figma → Tokens Studio → JSON → Style Dictionary → CSS. Never hand-edit the generated CSS.
7. **Isolate the brand anchors.** Keep them as one named group (`ref/brand-*`). They are the only variables that ever appear inside a `[data-brand]` block.

If these hold, a designer renaming or revaluing a token in Figma produces the exact CSS variable the dev already references. No translation layer, no drift.

---

## 4. Multi-brand

Brand is authored as native Figma modes — a `Brand` collection with one mode per brand. Figma Pro is limited to 10 modes, which covers the foreseeable brand count. Each mode's anchors alias a primitive ramp; raw hex stays in Primitives.

- Each Brand mode exports to a brand JSON of ~10 anchor values.
- Style Dictionary emits a `[data-brand="x"] { --sk-ref-brand-*: … }` block per brand.
- Because the `brand-*` semantic tokens alias the Brand collection, overriding the anchors reskins everything — the component is never touched.
- Adding a brand = one new mode + a ~10-line export. Components and the dev contract never change.
- Designers preview brands in Figma (the modes) and in Storybook (toggling `data-brand` live).

The same ~10 anchors that switch in Figma are the ones the `[data-brand]` attribute switches at runtime. One rebrand surface, always those ~10 tokens.

---

## 5. The pipeline end to end

```
Figma  (Primitives + Brand[modes: SkillUp, Partner…] + Semantic[Light/Dark] + Scale)
  │  Tokens Studio  (sets: primitives, brand, semantic, scale; each Brand mode → brand JSON)
  ▼
Style Dictionary
  ├─ tokens.css        :root  +  [data-theme="dark"]
  ├─ brands/*.css      [data-brand="partner-a"]{ anchor overrides }   (one per brand)
  ├─ email/*.css       resolved static values, inlined per brand       (newsletters)
  └─ tokens.ts/json    typed map for app code + tests
        │
        ▼
React app: loads tokens.css globally; sets <html data-theme data-brand>.
Components: var(--sk-*) only.
```

---

## 6. What this asks of our Figma tokens (the action items)

1. Brand anchors live in their own `Brand` collection (modes per brand); every `brand-*` semantic token aliases them.
2. Semantic tokens always alias the Brand collection or primitives, never raw hex, so overrides cascade.
3. Set Figma scopes cleanly so export is the lean set, not the full UUI library.
4. Two mode axes: `Brand` collection (SkillUp, Partner…) and `Semantic` collection (Light, Dark). A new brand = a new mode in `Brand`, exported to a brand JSON.

Get these right and the dev side is a generated mirror of Figma, and a new brand is one mode + a small export.
