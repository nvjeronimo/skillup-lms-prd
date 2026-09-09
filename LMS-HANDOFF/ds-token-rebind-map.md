# The rebind map — `Colors (Remove)` → `SKO/Colors`

Reviewed before anything is rebound. **Nothing has been rebound.**

## Where coverage stands

| | Before the new tokens | Now |
|---|---|---|
| `SKO/Colors/*` | 78 | **113** |
| Deprecated tokens | 281 | 281 |
| **Mechanical: same name** | 36 | **63** |
| **Mechanical: safe rename** | — | **5** |
| Needs authoring | 245 | **15** |
| Out of scope for the semantic rebind | — | 195 |

The 195 are `Utility/*` (150 colour ramps), `Components/*` (25) and `Alpha/*` (20). They are ramps, overlays
and component-scoped values — none blocks a component from being rebound, and they are a separate decision.

**The semantic layer is 68 of 83 done.**

---

## 1 · Same name, different prefix — 63 tokens, mechanical

`Colors (Remove)/{Category}/{name}` → `SKO/Colors/{Category}/{name}`, dropping the ` (NNN)` suffix where the
deprecated name carries one:

```
Colors (Remove)/Text/text-secondary (700)   → SKO/Colors/Text/text-secondary
Colors (Remove)/Foreground/fg-quaternary (400) → SKO/Colors/Foreground/fg-quaternary
Colors (Remove)/Border/border-error_subtle  → SKO/Colors/Border/border-error_subtle
```

⚠︎ **These are not the same colours.** The deprecated family aliases Untitled UI stock ramps; SKO aliases the
SkillUp brand ramps. The rebind is the intended repaint, and it is a **visual change** — it needs a review
pass on screens after it runs, not just a zero-bindings count.

## 2 · Safe renames — 5 tokens

Verified identical in **both** modes before proposing:

| From | To |
|---|---|
| `Text/text-white` | `Foreground/fg-white` |
| `Text/text-brand-tertiary_alt` | `Text/text-brand-tertiary` |
| `Border/border-brand_alt` | `Border/border-brand` |
| `Foreground/fg-brand-primary_alt` | `Foreground/fg-brand-primary` |
| `Background/bg-brand-primary_alt` | `Background/bg-brand-primary` |

## 3 · Renames I proposed and then rejected — 3 tokens

The check caught these. **`_alt` does not mean "a variant of".**

| Proposed | Light | Dark | Verdict |
|---|---|---|---|
| `bg-primary_alt` → `bg-primary` | same | **`#fafafa` → `#0e1a1f`** | ✗ inverts the surface |
| `bg-secondary_alt` → `bg-secondary_subtle` | `#fafafa` → `#f8f9fa` | **`#ffffff` → `#16282f`** | ✗ inverts the surface |
| `border-secondary_alt` → `border-secondary` | **`#000000` → `#d5dce2`** | `#22262f` → `#2c3d45` | ✗ black to light grey |

**In the deprecated set, `_alt` on a background means "stays light in dark mode"** — a surface for content
sitting on a dark or branded panel. And `border-secondary_alt` is **black** in light mode, not a grey.

SKO has no equivalent concept. These need **three new tokens with an honest name** — something like
`bg-on-dark`, `bg-on-dark_subtle`, `border-on-dark` — rather than being folded into the ordinary surfaces.

## 4 · Still to author — 15 tokens

Three of them are **empty in the deprecated collection** (no value in either mode) and should simply be
dropped rather than recreated: `text-brand-secondary_hover`, `fg-brand-secondary_hover`,
`bg-brand-solid_hover` — SKO already has `bg-brand-hover`.

The remaining twelve:

| Category | Tokens |
|---|---|
| Text | `text-quaternary`, `text-placeholder`, `text-placeholder_subtle` |
| Foreground | `fg-brand-secondary` |
| Border | `border-tertiary` |
| Background | `bg-primary-solid`, `bg-secondary-solid`, `bg-quaternary`, `bg-active`, `bg-brand-secondary`, `bg-brand-section_subtle` |
| Plus the three `_alt` surfaces above | |

`text-placeholder` is the one worth noticing — **every input in the library needs it** and SKO has never had
one.

---

## The order to run it

1. **Author the last 15** (12 + the three honestly-named `_alt` surfaces).
2. **Rebind categories 1 and 2** — 68 tokens, scriptable, one pass.
3. **Review screens**, because step 2 repaints from stock to brand. A zero-bindings count is not the test.
4. **Decide `Utility/*`, `Alpha/*` and `Components/*` separately** — they are not on the critical path.
5. **Remove the collection** only after a pass reports zero remaining bindings.


---

# The semantic layer is complete — 8 Sep 2026

**46 semantic tokens and 2 primitives authored across three passes.** Nothing is left to write.

| | Start | Now |
|---|---|---|
| `SKO/Colors/*` | 78 | **124** |
| Deprecated tokens mapping by name | 36 | **74** |
| Safe renames | — | 5 |
| Empty, to be dropped rather than recreated | — | 7 |
| **Still to author** | 245 | **0** |
| Out of scope (`Utility` 150, `Components` 25, `Alpha` 20) | — | 195 |

The twelve deprecated tokens still without a same-name destination are **all brand-family, and none needs a
new token**: five are safe renames (`text-white` → `fg-white`, `text-brand-tertiary_alt` →
`text-brand-tertiary`, `border-brand_alt` → `border-brand`, `fg-brand-primary_alt` → `fg-brand-primary`,
`bg-brand-primary_alt` → `bg-brand-primary`) and seven are empty in both modes.

## The ladders, verified

**Text** — monotonic in both modes, and the two intended equals sit together:

| | Light | Dark |
|---|---|---|
| `text-primary` | 36 | 240 |
| `text-secondary` | 64 | 190 |
| `text-tertiary` | 89 | 160 |
| `text-quaternary` · `text-placeholder` | 114 | 129 |
| `text-disabled` | 148 | 99 |

**Background** — monotonic in light (255 · 249 · 245 · 230 · 194).

**Border** — `primary` strongest, then `secondary`, then `tertiary`, in both modes.

## Two pre-existing oddities the verification surfaced

Neither was introduced by this work and neither is fixed here.

1. **`bg-secondary_subtle` is not in the same place in both modes.** In light it sits between `bg-primary` and
   `bg-secondary` (249 against 255 and 245). In dark it goes past `bg-secondary` (37 against 31) — the most
   elevated surface rather than the least differentiated. One of the two modes is wrong about what "subtle"
   means.
2. **`border-primary` uses `Neutral/400` in both modes**, so it does not invert with the theme. It stays the
   strongest border in both, which is defensible, but it is the only border that behaves this way.

## What is left, in order

1. **Rebind** categories 1 and 2 — 74 by name plus 5 renames, one scripted pass.
2. **Review screens.** The rebind repaints from Untitled UI stock ramps to SkillUp brand ramps. A
   zero-bindings count is not the test.
3. **Drop the 7 empties** rather than recreating them.
4. **Decide `Utility` / `Alpha` / `Components` separately** — not on the critical path.
5. **Remove the collection** only after a pass reports zero remaining bindings.


---

# The rebind — run, and stopped honestly

## Done

| Page | Outstanding |
|---|---|
| `❖ LMS COMPONENTS ✅` | **0** |
| `❖ MobileApp Component ✅` + its two sub-pages | **0** |
| `↳ Alerts & notifications` | **0** |

Those are the pages our own work depends on, and they are clean.

## Not done, and why

**Corrected.** The first reading of this was wrong. Dropped connections on this file are usually **lost
responses, not failed writes** — the mutations land. What fails is a tranche that is too large: 40 mutations
did not land, 8 and 20 landed every time.

So the working method is **fire a small tranche, ignore the drop, repeat, and measure separately.**

`Buttons/Button` — the component the `Alert` consumes — went **123 → 0** entirely through calls that every
one of them reported as dropped. `↳ Buttons` as a page went **914 → 789**.

The remaining 789 on that page and roughly 25 further component pages are not blocked, just slow: about
20 bindings per call.

## What replaces it

[`scripts/rebind-deprecated-tokens.js`](scripts/rebind-deprecated-tokens.js) — the same pass, written to run
**from a plugin console inside the file**, where there is no transport timeout. It does the whole file in one
go and prints what it changed.

It encodes the three decisions this work arrived at, so they are not lost with the session:

1. **It never touches a node inside an `INSTANCE`.** Rebinding there creates a permanent override that
   survives future changes to the main component. Instances follow once their component's page is processed.
2. **It skips the foundations pages.** `↳ Colors` is the swatch sheet that *documents* the deprecated
   collection — repainting it destroys the record of what those tokens were. Same for Typography, Icons and
   Spacing, and for the demo pages the file itself marks "you can move to a separate file".
3. **It reports `Utility/*`, `Alpha/*` and `Components/*` rather than guessing.** They have no SKO
   destination, and the script lists them at the end.

## The check that matters afterwards

Not the outstanding count. **The rebind repaints from Untitled UI stock ramps to SkillUp brand ramps** — it is
the intended repaint, and it is a visual change. Screens need a review pass before the collection is deleted.

---

# The rebind is finished — 9 Sep 2026

Every component page in the file is at **zero** outstanding mappable bindings. 55 pages, verified by a
second pass that counts rather than trusts the runner's own report.

## What the transport actually does

The previous entry said tranches of 40 do not land. **That was wrong, and wrong in a way worth recording:**
it described one bad afternoon, not the transport.

Once `Buttons/Button` was clear, the same runner returned cleanly at 30, then 40, then 120, then 200, then
400, then 600 mutations per call. The size was never the problem — the file was busy. There are three
distinct outcomes and only one of them is a failure:

| What comes back | What happened |
| --- | --- |
| `{rebound: n}` | n mutations landed |
| **internal timeout** | **mutations still landed** — one timeout at cap 40 wrote 88 |
| dropped response | mutations landed; the answer was lost |
| `An unexpected error occurred` | nothing is guaranteed — re-measure |

So the method is not "small tranches". It is **measure, never assume**: every runner carries its own
`stillLeft` count, computed after the writes, in the same call. That number is the only trustworthy output.

## The runner

Same three decisions as the handover script — never inside an `INSTANCE`, never the foundations pages,
never guess at `Utility/*` — plus a page list and a mutation budget, so one call can sweep several small
pages or take a bite out of a large one and say exactly how much is left.

## The pages, and what they cost

| Section | Pages | Notes |
| --- | --- | --- |
| `❖ LMS COMPONENTS ✅` | 1 | already clean |
| `❖ MobileApp Component ✅` | 3 | already clean |
| `❖ BASE COMPONENTS 2` | 22–38 | `↳ Buttons` 914, `↳ Inputs` 1,116, `↳ Radio groups` 1,376 |
| `❖ SHARED ASSETS` | 40–45 | `↳ Background elements` 1,578 |
| `❖ APPLICATION COMPONENTS` | 88–113 | `↳ Modals` 456, `↳ Tables` 417 |
| `♿ Accessibility Standards` | 15 | nothing bound to the deprecated collection |

Deliberately untouched, as decided: the foundations pages (4–12) — `↳ Colors` **documents** the deprecated
collection and repainting it destroys the record — the `MARKETING WEBSITE EXAMPLES` and
`APPLICATION EXAMPLES` demo sections the file itself marks as movable, and the two "you can delete this"
pages. `↳ Badges` keeps **1,835** `Utility/*` bindings that have no SKO destination.

## Still open

**`Utility/*` (150), `Alpha/*` (20) and `Components/*` (25) have no SKO equivalent.** They are not a
mechanical rebind; somebody has to decide whether SKO adopts those ramps or drops them. Until that is
settled, `Colors (Remove)` cannot actually be deleted.

**The screens still need a look.** The rebind repaints Untitled UI stock ramps to SkillUp brand ramps. That
is the point of it, and it is a visible change on every component page.

**The library is still unpublished.** None of this reaches a consuming file until its owner publishes.
