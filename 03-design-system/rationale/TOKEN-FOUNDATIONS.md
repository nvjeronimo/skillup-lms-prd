# Token Foundations & Principles

Foundations layer for the SkillUp Design System: the principles that govern every token, reconciled with what is already built (UUI base, Montserrat, 4 colour modes, `--sk-` namespace). Incorporates the external DS review (workshop with Mike, Jun 18).

---

## 0. Principles

1. **Everything derives from a token.** No loose values in the UI. Every colour, size, space, radius and type setting resolves to a token. If a value appears that has no token, it is a bug to fix, not a one-off.
2. **Hex lives only in Primitives.** Brand, Semantic and Component layers only alias. (See naming doc.)
3. **One name, value swapped by mode.** Brand and scheme switch the *value* under a mode / `[data-*]`, never the token name. Responsive does the same with Mobile/Desktop modes on type.
4. **Reuse before adding.** Before creating a token, find the existing one. Redundant radius/spacing/colour values are the main source of drift.
5. **Keep the names we have.** The semantic layer is UUI-aligned and bound across the production screens. We do not rename it to match generic conventions — the functional grouping is already there.

---

## 1. What moves to Primitives (the audit)

The review's main push: pull raw values down into Primitives so the layers above only reference. Target state:

| Primitive group | Holds | Status |
|-----------------|-------|--------|
| Colour ramps | SKO brand ramp + neutrals + accent ramps (green/red/yellow…) | exists (`_Primitives`) |
| Font family | `font-family-display`, `font-family-body` (both Montserrat) | exists |
| Font weight | regular / medium / semibold / bold (+ italics) | exists |
| Font size | the size steps (text-2xs … display-2xl) | exists |
| Line height | matching steps | exists |
| Letter spacing | the tracking steps | **add if missing** |
| Spacing scale | 4pt scale (0–384px) | exists |
| Radius scale | none / xs / sm / md / lg / xl / 2xl / full | exists |
| Breakpoints | mobile / tablet / desktop thresholds | **add** |
| Container widths | max-widths + paddings per breakpoint | exists (`4. Widths`, `5. Containers`) — formalise |

Action: confirm letter-spacing and breakpoints exist as primitives; everything else is already there. Then audit components for any hardcoded value not pointing at these.

---

## 2. Colour

Structure is already in place — keep the existing names, do not rebrand to generic ones.

- **Brand:** `brand/*` anchors (primary, strong, links, on-dark, progress, accent) — alias primitives, one set per brand mode.
- **Background:** `bg-primary`, `bg-secondary`, `bg-secondary_subtle`, `bg-tertiary`, `bg-brand-*`.
- **Text:** `text-primary`, `text-secondary`, `text-tertiary`, `text-brand-*`, `text-primary_on-brand`.
- **Foreground (icons/strokes):** `fg-*`.
- **Border:** `border-primary`, `border-secondary`, `border-brand`, `border-focus-ring`.
- **Functional states** (the review's "feedback" group, already satisfied): each of success / warning / error has its `bg-*-primary`, `text-*-primary` (and borders where needed). Grouped, not loose.

Mapping note for the reviewer's vocabulary: their `background/surface` = our `bg-secondary`; `text/muted` = our `text-tertiary`; `text/on-brand` = our `text-primary_on-brand`; `feedback/*` = our `*-primary` state tokens. Same concepts, our names.

All four modes (SKO + BrandX × Light/Dark) pass 16/16 WCAG 2.2 AA.

---

## 3. Typography

### Primitives
`font-family-display`, `font-family-body` (Montserrat), weights, size steps, line-height steps, letter-spacing. These are raw.

### Composite type tokens
The display/heading/body/caption styles are **Figma text styles** that compose family + size + line-height + weight + letter-spacing. They reference the primitives above. Keep the existing Montserrat ramp.

### Responsive type — new
Add a **Mobile / Desktop axis** so the same type token resolves to a smaller size and tighter line-height on mobile.

- Recommended: a **Mobile / Desktop mode** on the Typography collection (mirrors the brand/scheme mode pattern). One token name (`display-lg`) used everywhere; the active mode picks the value.
- In CSS this emits as media-query blocks; in Figma designers switch the frame's type mode.
- Alternative (more tokens, less clean): explicit `display-lg/mobile` and `display-lg/desktop` variants. Prefer the mode.

### Writing conventions
- **Sentence case** everywhere — headings, buttons, labels. Never Title Case or ALL CAPS, except the deliberate `text-2xs` uppercase utility.
- Consistent token naming: `text-*`, `display-*`, mirroring the colour conventions.

---

## 4. Spacing

- One **4pt numeric scale** as primitives: `spacing-none, xxs, xs, sm, md, lg, xl, 2xl … 11xl` over 0–384px.
- Every margin, padding and gap uses a scale token. No loose values.
- Spacing is constant across breakpoints by default. If a layout needs to tighten on mobile, change which step is used, not the step's value. Only introduce a responsive spacing mode if a real need appears — do not pre-build it.

---

## 5. Radius

- Raw values are primitives: `radius/none, 2, 8, 16, 32, full`.
- Components bind to **role tokens** (`radius-card`, `radius-button`, `radius-input`), never raw values.
- Radius varies by brand (full vs 8 vs 32). The role tokens re-alias per brand mode — see 6b. Never a stray pixel value.

---

## 6. Responsive layout

### Breakpoints & containers
- Define breakpoints as primitives (mobile / tablet / desktop thresholds).
- Container widths and paddings per breakpoint live in `4. Widths` / `5. Containers`.
- Mobile-first: single column, taller cards; desktop: grid/flex, multiple columns.

### Components across breakpoints
- The same component family (e.g. Course Card) has a mobile variant (full width, one column) and a desktop variant (grid). Both **reuse the same tokens** — colour, type, spacing, radius. Only the composition changes.
- Type, line-height and spacing adapt coherently via the responsive type modes and layout rules above.

---

## 6b. Dimensions vary by brand too — role tokens

Brands customise more than colour: radius (full vs 8 vs 32), border-width (1 vs 4), border presence, and font-size (optical differences). These vary by brand, so they get the **same treatment as colour: role tokens that re-alias per brand**, not a fixed system-only scale.

Pattern:

1. Raw values are primitives: `radius/2 · 8 · 16 · 32 · full`, `width/0 · 1 · 2 · 4`. Add a primitive if a brand needs a value that doesn't exist.
2. Role tokens components bind to: `radius-card`, `radius-button`, `radius-input`, `border-width-default`. A small fixed contract (~5–8).
3. Role tokens live on the **brand axis** (Core collection) and re-alias per brand mode: SkillUp `radius-card → radius/8`; BrandX `radius-card → radius/full`. "No border" = re-alias `border-color` to transparent or `border-width` to `width/0`. No new token, just a re-point.

So brands customise by re-aliasing role tokens to existing primitives — the same mechanism as colour. The contract count stays fixed.

### When a token needs two axes (e.g. font-size: brand × breakpoint)

A Figma variable lives on one collection's modes, so it cannot vary by two axes directly. Two options were tested:

- **Chaining — CHOSEN** (pending stakeholder sign-off). The brand owns the values per breakpoint as primitives (`brand/font/h1-desktop`, `brand/font/h1-mobile`…); the Breakpoints collection's `font-size/h1` routes per mode by aliasing the right brand token. The component binds the Breakpoints token. Full per-size control, and the real sizes are visible in Figma (design-approved). Cost: a token per size × breakpoint × brand, and verbose CSS overrides.
- Brand scale factor at build (rejected). One per-brand multiplier applied in Style Dictionary, size scale stays responsive-only. Leanest in tokens and CSS (one line rebrands via `calc()`), but Figma cannot preview a brand's optical sizing (variables can't multiply) and only allows uniform scaling. Lost on design-time fidelity.

Rule: the value lives on one axis; the other axis routes via alias. Never force one token onto two mode axes.

---

## 7. Naming & scalability

- Names are clear, consistent, searchable. The reviewer's note: the convention is strong for onboarding and long-term maintenance.
- One system namespace `--sk-` for all brands (never per-brand prefixes — see naming doc).
- Figma → CSS transform stays mechanical: group + leaf → `--sk-{leaf}`.

---

## Open items from this review

1. Confirm letter-spacing and breakpoints exist as primitives; add if missing.
2. Decide responsive type: Mobile/Desktop **mode** on the Typography collection (recommended) vs explicit per-breakpoint tokens.
3. Run a hardcoded-value audit on components — anything not pointing at a token gets fixed.
4. Do NOT rename the semantic colour groups to generic names; keep the UUI-aligned set.
