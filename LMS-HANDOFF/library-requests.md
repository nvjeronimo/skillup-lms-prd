# Requests to the design system library

Two things the Course Detail work ran into that belong in **`❖ SKO Design System (Untitled UI)`**, not in our
file. Both were worked around locally; both would be better fixed once, at source.

Raised 20 Aug 2026 from the Course Detail componentisation. Neither blocks us.

---

## 1 · `Alert` — the `Breakpoint` axis is misnamed

**Component:** `Alert` · key `11b022eafc69b4bf429bb6d785a27459faf36c73`

**What happens.** `Breakpoint=Desktop` puts the title and the supporting text **on the same line**. Any copy
longer than a short sentence is clipped. `Breakpoint=Mobile` stacks them and wraps.

**Why that is a problem and not a preference.** Our banner renders `welcome_message_html` — raw HTML written
by the instructor, of unpredictable length. On a 1280px desktop screen we are forced to select
**`Breakpoint=Mobile`**, which reads as a mistake to anyone opening the file and cannot be explained without
this note.

The axis is not describing a device. It is describing **stacked versus inline**.

**Suggested fix**, in order of preference:

1. Rename the axis — `Layout = Inline · Stacked` — and let breakpoint be a consequence rather than the label.
2. Or keep the name and let Desktop wrap when the text is long, so the choice stops being manual.

**What we did meanwhile:** selected `Breakpoint=Mobile` on a desktop frame, and wrote the reason into the
retired `_Remove · LMS / Course Detail / Banner` description so the next person does not "fix" it back.

---

## 2 · `Alert` — a `Persistent` variant, so a permanent warning cannot be dismissed

**Same component.**

**The rule.** The course-ended notice — `has_ended: true` — must not be dismissible. A dismissible warning
about a permanent condition is a warning that disappears: the learner clears it, and nothing in the course
tells them again that graded work is closed.

**Where it currently lives.** `X close button` is a boolean, so the rule is a convention. Anyone can turn it
back on, by accident, and nothing objects.

We had encoded it in our own component as a **variant**, which made it impossible to flip. We gave that up to
adopt `Alert`, and we think that was the right trade — but the protection went with it.

**Suggested fix.** A `Persistent` value on an axis (or a `Dismissible = False` variant) where the close
control does not exist, rather than being switched off. The distinction matters: *off* is a setting, *absent*
is a guarantee.

**Who else this serves.** Any permanent-state notice — course archived, enrolment closed, account suspended.
This is not a Course Detail problem.

---

## Not a request, but worth knowing

`LMS / Completion Status` has **`In Progress` hidden** in the set. We reached the same conclusion
independently from the API: the platform reports `complete` as a boolean and has no in-progress state to
report. Whoever hid it was right, and the reason is now documented on our side too — see
`course-details-metadata-map.md` §8.

---

## 3 · `Alert` recoloured to the `LMS / Autosave Status` scheme — done, not published

**Changed in the library file on 8 Sep 2026**, at the request of the design lead. All **24 variants** of
`Alert` (`1130:81134`) now carry a tinted background and a tone-matched border, copied from
`LMS / Autosave Status` (`19975:538137`) which already did it this way.

| `Color` | Background | Border |
|---|---|---|
| Brand | `bg-brand-primary` | `border-brand_subtle` |
| Success | `bg-success-primary` | `border-success_subtle` |
| Warning | `bg-warning-primary` | `border-warning_subtle` |
| Error | `bg-error-primary` | `border-error_subtle` |
| Gray | `bg-secondary` | `border-secondary` |
| Default | `bg-primary` | `border-secondary` |

Title → `Text/text-primary`, supporting text → `Text/text-secondary`, matching the autosave. Radius stays 12
— that is the Alert's own shape; the autosave's 0 is the autosave's.

**Before:** every variant was white on a neutral grey border, so the tone lived only in the icon. On a busy
page a warning and a success alert were the same rectangle.

**Two things worth knowing about the change.**

It is **not published**. Figma library edits reach consumer files only when someone publishes, so nothing has
moved for anyone yet. That decision belongs to the library owner.

The autosave carries **two stacked stroke paints** — `fg-{tone}-primary` underneath and
`border-{tone}_subtle` on top. Only the top one is visible; the one beneath is dead weight, probably a
leftover. The Alert was given the visible result with a single stroke rather than the redundant pair.

### The finding that is bigger than the request

**`Alert` was bound to a variable collection literally named `Colors (Remove)`.** Its background, border and
both text colours all came from it. Recolouring moved everything the Alert *owns* onto the live `SKO/Colors/*`
collection — but the deprecated collection is still reachable through the components it nests:

| Deprecated token | Comes in via |
|---|---|
| `Foreground/fg-quaternary (400)` | `x-close` |
| `Foreground/fg-{brand,error,warning,success,tertiary}-primary` | `Featured icon outline`, `alert-circle`, `info-circle`, `check-circle` |
| `Background/bg-primary`, `Border/border-primary` | `Featured icon` |
| `Text/text-brand-secondary (700)`, `Background/bg-primary` | `Buttons/Button` |

None of those is the Alert's to fix — they belong to `Featured icon` and `Buttons/Button`. **The question for
the library owner is whether `Colors (Remove)` is scheduled for removal**, because if it is, every component
still bound to it breaks on the day it goes, and `Buttons/Button` is one of them.

---

## 4 · `Colors (Remove)` cannot be removed yet — SKO covers 13% of it

**Asked to migrate every component off the deprecated tokens on 8 Sep 2026, on confirmation that the
collection is going. I did not do it, and this is why.**

First, a correction to request 3: `Colors (Remove)` and `Component colors (Remove)` are **not a separate
imported collection**. They live inside **`1. Semantics`**, alongside `SKO/Colors/*`. Three name families, one
collection.

### The measurement

| | |
|---|---|
| `SKO/Colors/*` tokens | **78** |
| `(Remove)` tokens | **281** |
| Deprecated tokens with an SKO equivalent by name | **36** |
| **Deprecated tokens with nowhere to go** | **245** |

**SKO covers 13% of what the library is actually using.** The gap is not a long tail of oddities — it is whole
categories that SKO has never had:

| Family | Missing | What breaks without it |
|---|---|---|
| `Utility/*` colour ramps | 150 | badges, tags, charts, anything with a colour scale |
| `Components/*` scoped tokens | 25 | buttons, toggles, footers — tokens written for one component |
| `Alpha/*` | 20 | overlays, scrims, any transparency |
| `_alt` surfaces | 18 | the second-surface pattern across backgrounds and borders |
| **`_hover`** | 15 | **every interactive component** |
| **`disabled`** | 8 | **every disabled state in the library** |
| `pressed` / focus | 2 | toggles |
| `Foreground/fg-{primary,secondary,tertiary,error,warning,success}` | 9 | icons everywhere |
| `Background/bg-{quaternary,active,*-secondary,*-solid}` | 9 | surfaces |
| `Text/text-{quaternary,white,placeholder}` | 4 | inputs, inverted text |
| `Border/border-tertiary` | 1 | dividers |

SKO has **three** hover tokens in total (`text-primary_on-brand-hover`, `bg-brand-hover`, `thumb-hover`) and
**no disabled tokens at all**. `_Primitives` has neither — interaction states only exist in the semantic layer,
and only in the deprecated half of it.

### Why I did not migrate the 36 that do map

Because it would not help and would hide the problem. A component that still holds **one** deprecated binding
still breaks on removal day, and every interactive component holds several. Migrating the easy third would cut
the token count, leave the breakage untouched, and make the remaining audit harder by mixing families inside
single components.

Two pages measured for scale before stopping: **Alerts 300 deprecated paints, Buttons 1,442.** Across 116
pages this is tens of thousands of bindings — worth doing once, correctly, not twice.

### What has to happen first

**Someone has to author the missing SKO tokens** — at minimum the hover, disabled, `_alt` and `Foreground`
families, because those are load-bearing rather than decorative. Once they exist the rebind is mechanical and
can be scripted in an afternoon.

**Until then, `Colors (Remove)` cannot be removed.** If it is removed on the current token set, the library
loses every disabled state, almost every hover state, all overlays and all utility ramps at once.

**And one honest note on request 3:** recolouring `Alert` moved the four bindings *it owns* onto SKO, but the
component still inherits deprecated tokens through `Featured icon`, `Buttons/Button`, `x-close` and the icon
instances. Even that component is not safe from the removal.

---

## 5 · Recommendation — author the tone matrix first, and take values from the brand ramps

### The thing that changes the plan

The two families **do not point at the same colours**:

```
Colors (Remove)/Foreground/fg-error-primary   → Colors/Error/600                      (Untitled UI stock)
SKO/Colors/Text/text-error-primary            → Colors/SKO-Brand/Accents/Red/600_AC3   (SkillUp brand)
```

A migration by name would have quietly repainted the library from stock to brand. That is probably the
intended destination — but it is a **visual change**, not a like-for-like rebind, and it has to be decided
rather than inherited. It also means **the missing SKO tokens cannot be authored by copying the deprecated
values**: doing that imports the palette we are trying to leave.

### Start with the tones, and the reason is not size

`error` · `warning` · `success` are the smallest family and the highest leverage, but the argument for going
first is that **SKO's tones are asymmetric**, and asymmetry is what makes designers hardcode:

| Slot | error | warning | success |
|---|---|---|---|
| `bg-{tone}-primary` | ✅ | ✅ | ✅ |
| `bg-{tone}-secondary` | ✗ | ✗ | ✗ |
| `bg-{tone}-solid` | ✅ | ✅ | ✅ |
| `border-{tone}` | ✅ | **✗** | **✗** |
| `border-{tone}_subtle` | ✅ | ✅ | ✅ |
| `text-{tone}-primary` | ✅ | ✅ | ✅ |
| **`fg-{tone}-primary`** | **✗** | **✗** | **✗** |
| `fg-{tone}-secondary` | ✗ | ✗ | ✅ |
| `fg-{tone}-on-solid` | ✅ | ✅ | ✅ |
| `focus-ring-{tone}` | ✅ | **✗** | **✗** |

`border-error` exists and `border-warning` does not. `focus-ring-error` exists and the others do not.
`fg-success-secondary` exists and its two siblings do not. Someone reaching for the warning border finds
nothing and types a hex — which is exactly how `#04313d` and `#51bffc` got into our own screens.

**`fg-{tone}-primary` is the single highest-priority gap.** It is the icon colour, and every alert, badge and
status icon in the library currently reaches into `Colors (Remove)` for it.

### The recommendation, in order

1. **Fix the shape before the count.** Agree the slot list once — the ten rows above — and fill it for
   *every* tone, including brand and info. Symmetry is the deliverable; a designer should never have to check
   whether a slot exists for the tone they are on.
2. **Take values from `Colors/SKO-Brand/Accents/*`**, not from the deprecated tokens. The ramps already exist;
   this is choosing steps, not picking colours.
3. **Author both modes at once.** `1. Semantics` has `Light mode SKO` and `Dark mode SKO`. A token authored in
   one mode falls back silently in the other, and nobody notices until a dark screen ships.
4. **Then hover and disabled** — 23 tokens, and the thing that actually blocks `Buttons`.
5. **Leave `Utility/*` and `Alpha/*` for last** — 170 of the 245, and mostly primitives wearing semantic
   clothes. They can stay where they are while the semantic layer is finished.
6. **Rebind from a reviewed mapping table, not by name matching.** The `fg-error-primary` case above is the
   proof: the names line up and the colours do not.
7. **Remove the collection only after a rebind pass reports zero remaining bindings.** Measured, not assumed.

**Roughly 19 tokens for the tones, 23 for hover and disabled.** That is the work that unblocks everything
else, and it is naming and step-picking rather than a design exercise.


---

## 6 · The tone matrix, proposed

Written up in full as [`ds-tone-token-matrix.md`](ds-tone-token-matrix.md): **18 tokens to author, 1 to
correct**, so `error`, `warning` and `success` have the same shape, with a value per mode taken from the
`SKO-Brand/Accents` ramps that already exist.

Five rules generate every value, so the next tone can be filled without asking: `fg-{tone}-primary` mirrors
`text-{tone}-primary`; `border-{tone}` equals `bg-{tone}-solid`; `-secondary` is one meaningful step in from
`-primary`; `_hover` is one step further from the page; focus rings use the tone's own ramp.

⚠︎ **One correction found while measuring:** `SKO/Effects/Focus rings/focus-ring-error` aliases `Error/500` —
the Untitled UI **stock** ramp, not the brand one. An SKO-named token reaching into the palette we are leaving.

And three inconsistencies already in the file that need a ruling rather than a fix: the dark-mode text steps
follow no single rule (Red/50, Green/200, Yellow/400 — second, fourth and sixth steps); `bg-warning-solid` is
the only solid identical in both modes; and backgrounds use `SKO-Brand/Surfaces/{tone}-dark` in dark mode
where everything else uses ramp steps, which is the one row of the proposal I am least confident in.
