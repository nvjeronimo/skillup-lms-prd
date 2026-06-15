# UUI Buttons — Design System Handoff

**File:** ❖ SKO Design System (Untitled UI) — `c7EUDrQwP8si08aPipDSIV`
**Page:** Buttons (`1:1183`)
**Date:** 2026-05-22
**Scope:** Token + variant audit after Primary/Secondary/Tertiary behavior rework

---

## Summary of changes

`Buttons/Button` component set (`3287:427074`, 160 variants) was updated with a new interaction model.

**Three changes applied:**

1. **Primary Hover** — bg switched from darker teal to solid yellow `#F9C654`, text + icons rebound to brand teal tokens for contrast on yellow.
2. **Secondary** — Default/Focused/Loading rebound from gray neutrals to brand teal across border, text, and icons. Hover became solid brand teal with white text + white icons (no border).
3. **Tertiary** — inherited Secondary's original gray-neutral look (40 variant configs: 5 states × 4 sizes × 2 icon-only).

**New tokens added to the library:**

| Token | Type | Value | Key |
|---|---|---|---|
| `Colors/SKO-Brand/Accent/Y01_Yellow_Hover` | Primitive | #F9C654 | `10821a4bcc94d8e10721aede10b7ae12c42129e5` |
| `LMS/Background/bg-brand-hover` | Semantic alias | → Y01_Yellow_Hover | `2ac15d75a0267cece87b3ab7e3890fddb35869d6` |

---

## Canonical bindings — Buttons/Button (Size=md, Icon only=False)

| Hierarchy / State | Background | Stroke | Text | Icon |
|---|---|---|---|---|
| **Primary / Default** | `Colors/Background/bg-brand-solid` | — | `Colors/Text/text-white` | `Component colors/Buttons/button-primary-icon` |
| **Primary / Hover** | `LMS/Background/bg-brand-hover` (yellow) | — | `LMS/Text/text-brand-primary` (dark teal) | `LMS/Text/text-brand-secondary` (medium teal) |
| **Primary / Focused** | `Colors/Background/bg-brand-solid` | — | `Colors/Text/text-white` | `Component colors/Buttons/button-primary-icon` |
| **Primary / Disabled** | `Colors/Background/bg-disabled` | `Colors/Border/border-disabled_subtle` | `Colors/Foreground/fg-disabled` | `Colors/Foreground/fg-disabled_subtle` |
| **Primary / Loading** | `Colors/Background/bg-brand-solid_hover` | — | `Colors/Text/text-white` | — |
| **Secondary / Default** | `Colors/Background/bg-primary` (white) | `LMS/Background/bg-brand-solid` | `LMS/Background/bg-brand-solid` | `LMS/Background/bg-brand-solid` |
| **Secondary / Hover** | `Colors/Background/bg-brand-solid` (teal) | none | `Colors/Text/text-white` | `LMS/Text/text-primary_on-brand` (white) |
| **Secondary / Focused** | `Colors/Background/bg-primary` | `LMS/Background/bg-brand-solid` | `LMS/Background/bg-brand-solid` | `LMS/Background/bg-brand-solid` |
| **Secondary / Disabled** | `Colors/Background/bg-primary` | `Colors/Border/border-disabled_subtle` | `Colors/Foreground/fg-disabled` | `Colors/Foreground/fg-disabled_subtle` |
| **Secondary / Loading** | `Colors/Background/bg-primary_hover` | `LMS/Background/bg-brand-solid` | `LMS/Background/bg-brand-solid` | — |
| **Tertiary / Default** | `Colors/Background/bg-primary` | `Colors/Border/border-primary` (gray) | `Colors/Text/text-secondary (700)` | `Colors/Foreground/fg-quaternary (400)` |
| **Tertiary / Hover** | `Colors/Background/bg-primary_hover` | `Colors/Border/border-primary` | `Colors/Text/text-secondary_hover` | `Colors/Foreground/fg-quaternary_hover` |
| **Tertiary / Focused** | `Colors/Background/bg-primary` | `Colors/Border/border-primary` | `Colors/Text/text-secondary (700)` | `Colors/Foreground/fg-quaternary (400)` |
| **Tertiary / Disabled** | `Colors/Background/bg-primary` | `Colors/Border/border-disabled_subtle` | `Colors/Foreground/fg-disabled` | `Colors/Foreground/fg-disabled_subtle` |
| **Tertiary / Loading** | `Colors/Background/bg-primary_hover` | `Colors/Border/border-primary` | `Colors/Text/text-secondary (700)` | — |
| Link color / Default | none | none | `Colors/Text/text-brand-secondary (700)` | `Colors/Foreground/fg-brand-secondary_alt` |
| Link gray / Default | none | none | `Colors/Text/text-tertiary (600)` | `Colors/Foreground/fg-quaternary (400)` |

(Link color/gray variants weren't modified.)

---

## Audit — token binding distribution

### Buttons/Button (160 variants)

| Surface | LMS/* | Colors/* | Component/* | Hardcoded |
|---|---|---|---|---|
| Backgrounds | 8 (Primary Hover) | 112 | 0 | 8 (Link Focused) |
| Borders | 24 (Secondary D/F/L) | 56 | 0 | 0 |
| Text fills | 16 (Sec D/F/L + Pri Hover) | 64 | 0 | 0 |
| Icon strokes | 48 (Pri Hover icons + Sec D/F/L icons + new Sec Hover white icons) | 148 | 24 | 0 |

### Other button sets (still 100% UUI defaults)

| Component Set | Variants | LMS/* | Colors/* | Hardcoded |
|---|---|---|---|---|
| Buttons/Button destructive | 140 | 0 | 372 | 4 |
| Buttons/Button utility | 18 | 0 | 44 | 0 |
| Buttons/Button close X | 18 | 0 | 24 | 6 |
| Social button | 108 | — (brand-specific colors) | — | — |
| Mobile app store badge | 20 | — (vendor brand) | — | — |

---

## Inconsistencies + recommendations

### 1. Mixed token namespaces on Primary
Primary Default/Focused/Loading still bind to `Colors/Background/bg-brand-solid` (UUI namespace). Only Hover uses `LMS/*`. The Colors token resolves to the same teal value via SKO mode, but the namespace inconsistency makes the system harder to reason about.

**Recommendation:** rebind Primary Default/Focused/Loading bg to `LMS/Background/bg-brand-solid`. Optional but cleaner for future mode-switching work.

### 2. Secondary Hover bg still on UUI namespace
The Secondary Hover bg was copied from Primary Default's paint, which is bound to `Colors/Background/bg-brand-solid`. For consistency it should be `LMS/Background/bg-brand-solid` (same resolved value, LMS namespace).

### 3. Token semantic mismatch on Secondary
Currently `LMS/Background/bg-brand-solid` is used as both **stroke color** and **text fill** on Secondary. Semantically it's a *background* token. This works because LMS doesn't have `LMS/Border/border-brand` or `LMS/Text/text-brand-primary` (variant of brand teal) tokens yet, so we're using bg-brand-solid as a stand-in for the brand teal everywhere.

**Recommendation:** introduce dedicated semantic tokens:
- `LMS/Border/border-brand` → alias to P03_Blue_Teal
- `LMS/Text/text-brand` → alias to P03_Blue_Teal
- `LMS/Foreground/fg-brand` → alias to P03_Blue_Teal (for icons)

Then rebind Secondary's stroke, text, and icon paints to these. Cleaner DS surface even if all 3 resolve to the same color.

### 4. Yellow Hover contrast
Primary Hover yellow `#F9C654` with `text-brand-primary` (#044150) gives ~8:1 contrast — passes WCAG AA easily. Icons at `text-brand-secondary` (#26708E) give ~4:1 — passes for UI components and large text.

If yellow is also used on Disabled/Loading on the user's side or any other surface, ensure text stays dark.

### 5. Tertiary now visually identical to Secondary at rest
Both render as outline-brand white-fill in production. The only behavioral difference is on Hover. If both appear on the same screen, users can't distinguish "Secondary action" from "Tertiary action" until they hover.

**Recommendation:** add a structural differentiator to Tertiary — smaller padding, no border, or just text-only (the original ghost pattern).

### 6. Hardcoded fills
- 8 #ffffff on Link color/gray Focused — UUI default focus ring background. Not breaking, but consider binding to `Colors/Background/bg-primary` for consistency.
- 4 hardcodes in Buttons/Button destructive
- 6 hardcodes in Buttons/Button close X

Not blocking but flag for future polish pass.

### 7. Destructive/Utility/Close-X buttons untouched
None of the 3 still-UUI-defaults button sets have been migrated to LMS/* tokens. They'll inherit LMS values via SKO mode-switching, but the namespace inconsistency means they're effectively "borrowing" UUI defaults rather than being LMS-native.

**Recommendation:** decide if destructive/utility/close-X need brand-aware behaviors (yellow hover, etc.) — if not, leave as-is and document the boundary.

---

## Engineering handoff — token map for CSS implementation

Map each Figma token to a CSS variable in the codebase:

```css
:root[data-theme="sko-light"] {
  /* Brand */
  --color-bg-brand-solid: #26708e;        /* P03_Blue_Teal */
  --color-bg-brand-solid-hover: #1f5c75;  /* slightly darker on press, not the yellow */
  --color-bg-brand-hover: #F9C654;        /* NEW — yellow for Primary Hover */
  --color-text-brand-primary: #044150;    /* dark teal — for text on yellow */
  --color-text-brand-secondary: #26708e;  /* medium teal — for icons on yellow */
  --color-text-primary-on-brand: #ffffff; /* white on teal */
}
```

### Component CSS (Primary)
```css
.button-primary {
  background: var(--color-bg-brand-solid);
  color: var(--color-text-primary-on-brand);
  border: none;
}
.button-primary:hover {
  background: var(--color-bg-brand-hover);
  color: var(--color-text-brand-primary);
}
.button-primary:hover svg {
  stroke: var(--color-text-brand-secondary);
}
```

### Component CSS (Secondary)
```css
.button-secondary {
  background: var(--color-bg-primary);
  color: var(--color-bg-brand-solid);        /* should be text-brand once token exists */
  border: 1px solid var(--color-bg-brand-solid);
}
.button-secondary:hover {
  background: var(--color-bg-brand-solid);
  color: var(--color-text-primary-on-brand);
  border: none;
}
```

### Component CSS (Tertiary)
```css
.button-tertiary {
  background: var(--color-bg-primary);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-primary);
}
.button-tertiary:hover {
  background: var(--color-bg-primary-hover);
  color: var(--color-text-secondary-hover);
}
```

---

## Open questions for next iteration

1. Should **Primary Default/Focused/Loading** bg also move to LMS/* namespace for consistency with Hover?
2. Should we introduce `LMS/Border/border-brand`, `LMS/Text/text-brand`, `LMS/Foreground/fg-brand` to replace the bg-brand-solid stand-ins?
3. Should **Tertiary** get a structural differentiator from Secondary (it's currently identical at rest)?
4. Should **destructive/utility/close-X** be migrated to LMS/* tokens too?
5. Loading state — currently uses `bg-brand-solid_hover` (the OLD darker teal). With the new yellow hover, should Loading use bg-brand-solid (regular teal) to feel "active" rather than "hovered"?

---

## Variant counts modified

- **Primary Hover:** 8 variants (bg, text, icons)
- **Secondary Default + Focused + Loading:** 24 variants (border, text, icons)
- **Secondary Hover:** 8 variants (bg, no-border, text, icons — all bg-brand-solid + white)
- **Tertiary (all 5 states):** 40 variants (mirroring old Secondary look)

**Total: 80 variant configs touched.**

---

## File state

- Buttons page: `c7EUDrQwP8si08aPipDSIV/1:1183`
- Buttons/Button set: `3287:427074`
- Library publish: required for subscribing files to pick up changes
