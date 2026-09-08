# Hover and disabled — authored in `1. Semantics` on 8 Sep 2026

**17 tokens, not the 23 first estimated.** Six of the deprecated ones drop out on inspection: three are
**empty** (`text-brand-secondary_hover`, `fg-brand-secondary_hover`, `bg-brand-solid_hover` have no value in
either mode), and three are **component-scoped** (`toggle-button-fg_disabled`, `footer-button-fg_hover`,
`button-primary-icon_hover`) and belong to a component token layer rather than the semantic one.

**17 semantic tokens and 2 primitives created.** ✅

---

## The finding that shapes it

Every deprecated hover and disabled token aliases a **stock** ramp:

```
Colors (Remove)/Background/bg-primary_hover  → Gray (light mode)/50     stock
Colors (Remove)/Text/text-disabled           → Gray (light mode)/500    stock
SKO/Colors/Background/bg-secondary           → Neutral/50_N06b          brand
```

Same shape as the `focus-ring-error` correction, at 23× the scale. So these cannot be authored by copying
values either — the steps have to be chosen on the **SKO-Brand `Neutral` and `Dark-Neutral`** ramps.

---

## Two rules

1. **Hover moves one step toward the ink.** Backgrounds get slightly darker in light mode and slightly lighter
   in dark; text and foregrounds get stronger. Never a new hue.
2. **Disabled moves toward the background.** It is the only state allowed to lose contrast, and it loses it in
   both directions — the text comes down, the surface comes up.

---

## Base foreground tokens — 3

These are not optional extras. **SKO has no `fg-primary`, `fg-secondary` or `fg-tertiary`**, so authoring
`fg-secondary_hover` without them would create a hover state for something that does not exist. They follow
rule 1 from the tone matrix: **`fg` mirrors `text`**.

| Token | Light | Dark |
|---|---|---|
| `fg-primary` | Primary/950_N00_DeepTeal | Dark-Neutral/50 |
| `fg-secondary` | Neutral/800 | Dark-Neutral/200 |
| `fg-tertiary` | Neutral/700 | Dark-Neutral/300 |

## Hover — 7

| Token | Light | Dark | Base it moves from |
|---|---|---|---|
| `bg-primary_hover` | Neutral/25 | Dark-Neutral/800 | `bg-primary` White · Dark-Neutral/950 |
| `bg-secondary_hover` | Neutral/100 | Dark-Neutral/800 | `bg-secondary` Neutral/50 · Dark-Neutral/900 |
| `text-secondary_hover` | Neutral/900 | Dark-Neutral/50 | `text-secondary` Neutral/800 · Dark-Neutral/200 |
| `text-tertiary_hover` | Neutral/800 | Dark-Neutral/200 | `text-tertiary` Neutral/700 · Dark-Neutral/300 |
| `fg-secondary_hover` | Neutral/900 | Dark-Neutral/50 | mirrors `text-secondary_hover` |
| `fg-tertiary_hover` | Neutral/800 | Dark-Neutral/200 | mirrors `text-tertiary_hover` |
| `fg-quaternary_hover` | Neutral/400 | Neutral/400 | `fg-quaternary` Neutral/200 · Neutral/600 |

## Disabled — 7

| Token | Light | Dark |
|---|---|---|
| `text-disabled` | Neutral/400 | **Dark-Neutral/500** (new step) |
| `fg-disabled` | Neutral/400 | **Dark-Neutral/500** (new step) |
| `fg-disabled_subtle` | Neutral/200 | Dark-Neutral/700 |
| `bg-disabled` | Neutral/100 | Dark-Neutral/800 |
| `bg-disabled_subtle` | Neutral/25 | Dark-Neutral/900 |
| `border-disabled` | Neutral/200 | Dark-Neutral/700 |
| `border-disabled_subtle` | Neutral/150 | Dark-Neutral/800 |

---

## Three things to decide before I build

⚠︎ **1. The `Dark-Neutral` ramp has a hole where disabled text belongs.** Its steps are 50, 200, 300, 650,
700, 800, 900, 950 — **there is no 400 or 500.** `text-tertiary` already takes 300, so disabled text has to
drop to **600** (`#33474f`) on a `#0e1a1f` surface. That is very low contrast. It is arguably correct for a
disabled control, but it is a judgement, not a step, and the alternative is adding a `Dark-Neutral/450`.

⚠︎ **2. `fg-quaternary_hover` cannot move the way the others do.** SKO's `fg-quaternary` is `Neutral/200` in
light and `Neutral/600` in **dark** — it uses the light ramp in both modes, unlike everything else. A hover
that moves "toward the ink" therefore means opposite directions per mode. Proposed `Neutral/400` for both,
which is one step from light and reads as a hover in dark too, but it is the row I am least sure of.

**3. Component-scoped tokens are excluded on purpose.** `toggle-button-fg_disabled`, `footer-button-fg_hover`
and the two `button-*-icon_hover` are component tokens. If they are recreated, they belong in a
`SKO/Components/*` layer with its own naming, not mixed into the semantic one — and that is a structural
decision worth taking deliberately, since the deprecated file mixed them.

---

## After this

With tones, hover and disabled in place, the semantic layer covers the load-bearing families and the rebind
becomes possible for everything except `Utility/*` (150) and `Alpha/*` (20) — which are ramps and overlays,
and can stay as primitives or move later without blocking anything.


---

## What was built, and the two ramp steps that had to exist first

The `Dark-Neutral` ramp had a hole between `300` (`#93a3ab`) and `600` (`#33474f`) — exactly where disabled
text belongs. **`400` and `500` were created by interpolating between the two anchors**, not invented:

```
300 #93a3ab   400 #73848c   500 #53666e   600 #33474f
```

`text-disabled` and `fg-disabled` take **`500`** in dark mode. `600` was the only option before and it sat at
barely-visible on a `#0e1a1f` surface.

## The verification that matters

The contrast ladder against `bg-primary`, in both modes:

| Token | Light | Dark |
|---|---|---|
| `text-primary` | 15.30 | 15.50 |
| `text-secondary` | 10.32 | 9.51 |
| `text-tertiary` | 6.92 | 6.80 |
| `text-disabled` | 3.04 | 2.93 |

Two things this shows. The ladder **descends evenly** rather than clustering, so the four levels are actually
distinguishable. And **light and dark track each other within half a point at every level** — which is the
real test of whether two modes were authored consistently or separately.

`text-disabled` at ~3.0 is below WCAG AA's 4.5:1 **and that is correct**: 1.4.3 explicitly exempts inactive
controls. It is dim enough to read as disabled and still perceptible, which is what the state is for.

**Rule 1 held again** — `fg-primary`, `fg-secondary` and `fg-tertiary` resolve identically to their `text-`
counterparts in both modes.

`fg-quaternary_hover` was authored as `Neutral/400` in both modes, matching its base token's own habit of
using the light ramp on both sides. It is consistent with `fg-quaternary` rather than with the other hovers —
noted rather than corrected, because changing it means changing the base.
