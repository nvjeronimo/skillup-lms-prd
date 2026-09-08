# The tone token matrix — authored in `1. Semantics` on 8 Sep 2026

**18 tokens authored and 1 corrected** ✅, so that `error`, `warning` and `success` have the same shape.
Values are steps on the ramps that already exist (`Colors/SKO-Brand/Accents/{Red,Yellow,Green}`), in both
`Light mode SKO` and `Dark mode SKO`.

Nothing here is invented. Every value follows a rule derived from a token that is already in the file, and the
rule is stated so the next tone — info, or a new brand skin — can be filled without asking anyone.

---

## The five rules

1. **`fg-{tone}-primary` mirrors `text-{tone}-primary`.** An icon and its label are the same thing at the same
   level; there is no reason for them to be different colours. This is the rule that fills the most important
   gap in the set.
2. **`border-{tone}` equals `bg-{tone}-solid`.** Already true for error (both `Red/500`); applied to the other
   two it costs nothing and removes a decision.
3. **`{slot}-secondary` is one meaningful step in from `-primary`** — `/100` against `/25` on backgrounds,
   `/500` against the text step on foregrounds. Taken from the existing `fg-success-secondary`.
4. **`_hover` is one step further from the page** — darker in light mode, lighter in dark. Never a new hue.
5. **Focus rings use the mid step of the tone's own ramp**, not a stock ramp. See the correction below.

---

## The matrix

Light mode / Dark mode. **Bold** rows are new.

| Slot | error | warning | success |
|---|---|---|---|
| `bg-{tone}-primary` | Red/25 · Surfaces/error-dark | Yellow/25 · Surfaces/warning-dark | Green/25 · Surfaces/success-dark |
| **`bg-{tone}-secondary`** | **Red/50 · Red/900** ⚠︎ | **Yellow/100 · Yellow/900** | **Green/100 · Green/900** |
| `bg-{tone}-solid` | Red/500 · Red/300 | Yellow/300 · Yellow/300 | Green/800 · Green/600 |
| **`bg-{tone}-solid_hover`** | **Red/600 · Red/400** | **Yellow/400 · Yellow/400** | **Green/900 · Green/700** |
| `border-{tone}` | Red/500 · Red/300 | **Yellow/300 · Yellow/300** | **Green/800 · Green/600** |
| `border-{tone}_subtle` | Red/50 · Red/700 | Yellow/200 · Yellow/800 | Green/100 · Green/800 |
| `text-{tone}-primary` | Red/600 · Red/50 | Yellow/950 · Yellow/400 | Green/800 · Green/200 |
| **`text-{tone}-primary_hover`** | **Red/700 · Red/25** | **Yellow/900 · Yellow/300** | **Green/900 · Green/100** |
| **`fg-{tone}-primary`** | **Red/600 · Red/50** | **Yellow/950 · Yellow/400** | **Green/800 · Green/200** |
| **`fg-{tone}-secondary`** | **Red/500 · Red/300** | **Yellow/500 · Yellow/300** | Green/500 · Green/300 |
| `fg-{tone}-on-solid` | White · Dark-Neutral/950 | Primary/950 DeepTeal (both) | White · Dark-Neutral/950 |
| **`focus-ring-{tone}`** | Red/500 (both) ⚠︎ | **Yellow/500 (both)** | **Green/500 (both)** |

**Count: 18 new tokens, 6 per tone.**

---

## One correction, not an addition

⚠︎ **`SKO/Effects/Focus rings/focus-ring-error` currently aliases `Error/500` — the Untitled UI stock ramp,
not the SkillUp brand ramp.** It is an SKO-named token reaching into the palette we are trying to leave. It
should point at `Red/500`. Worth checking the other focus rings for the same thing while you are in there.

## Three inconsistencies in the existing set, for a decision

These are already in the file. The matrix above keeps them rather than silently changing them, but each is
worth a ruling:

1. **Dark-mode text steps do not follow one rule.** `text-error-primary` uses `Red/50`, `text-success-primary`
   uses `Green/200`, `text-warning-primary` uses `Yellow/400` — the second, fourth and sixth steps of their
   ramps. Either they were tuned individually for contrast, in which case say so, or they drifted.
2. **`bg-warning-solid` is the only solid identical in both modes** (`Yellow/300`). Yellow is the hardest
   hue to darken without turning it brown, so this may be deliberate — but it is the only one, and the same
   applies to the new `border-warning` and `bg-warning-solid_hover` that inherit from it.
3. **Backgrounds use `SKO-Brand/Surfaces/{tone}-dark` in dark mode** rather than a ramp step, while everything
   else uses ramp steps. If there are no matching `-dark-secondary` surfaces, the proposed
   `bg-{tone}-secondary` falls back to `/900` on the ramp and will not match the primary's surface treatment.
   **This is the one row in the matrix I am least sure of** and the one to check first.

---

## After the tones

The same exercise for **hover and disabled** — 23 tokens, and the pair that actually unblocks `Buttons`.
Disabled has no SKO representation at all today, so it needs its own slot list rather than a fill-in.

Then, and only then, the rebind: from a reviewed mapping table, verified by a pass that reports zero remaining
`(Remove)` bindings before the collection goes.


---

## What changed between proposing and building

**Rule 1 held exactly.** `fg-{tone}-primary` resolves identically to `text-{tone}-primary` for all three
tones in both modes — verified by comparison, not by assumption.

**Rule 3 did not, and the check caught it.** *"Secondary is one step in from primary"* gave `/100` for each
tone, which produced:

```
bg-error-secondary    #e8797b   a strong pink
bg-warning-secondary  #ffebbd   a pale tint
bg-success-secondary  #aaedc2   a pale tint
```

**The Red ramp climbs much faster at the low end than Yellow or Green.** `Red/100` is already a mid-tone where
`Yellow/100` and `Green/100` are still tints. The visual peer of those two is **`Red/50`**, and that is what
`bg-error-secondary` now uses.

The lesson is worth keeping: **a rule expressed as a step number assumes the ramps are parallel, and these are
not.** Any future rule of the form "one step in" has to be checked against the rendered value rather than the
index — which is what the verification pass is for.

Residual spread after the fix, by relative luminance: error 190, success 220, warning 236. Not identical, and
that is the eye rather than the ramps — luminance weights red at 0.21 and green at 0.72, so a red tint always
measures darker than a green one that looks equally pale. Left as is.

## One inherited oddity, not introduced

`border-warning` is `Yellow/300` (`#f9c654`) because rule 2 sets the solid border equal to `bg-warning-solid`,
which was already `Yellow/300`. That makes the warning border markedly lighter than `border-error`
(`Red/500`) and `border-success` (`Green/800`). It is consistent with the rule and inconsistent with its two
siblings — **a warning outline will read as weaker than an error or success one.** Changing it means changing
`bg-warning-solid` too, which is a pre-existing decision and not mine to overturn.
