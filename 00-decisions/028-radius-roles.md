---
id: 028
title: Corner radius by role — six role tokens and "inner radius + padding = outer radius"
date: 2026-10-20
status: accepted
audience: [designer, dev]
track: Foundations
phase: 1
---
**Decision** — Every corner radius on the platform, in the DS, the product file and the prototype, comes from a role,
not a size. Eight tokens in the DS collection `3. Responsive 📐`, aliases of the existing `Radius/fixed-*` scale:

| Token | Value | Used for |
|---|---|---|
| `Radius/none` | 0 | full-width bars and bands, progress bars |
| `Radius/inner` | 2 | tiny elements and things inside a control: checkboxes, tiny chips, tab indicators, skeleton bars |
| `Radius/control` | 6 | buttons, inputs, selects, menu items, tooltips, icon tiles, learner avatars, rows; anything nested inside a card |
| `Radius/card-inset` | 8 | rows and items inside a card or menu with 4 px padding (card − 4) |
| `Radius/track` | 10 | a track that holds controls with 4 px padding: Button group / segmented controls (control 6 + 4) |
| `Radius/card` | 12 | cards, boxed lists, alerts, toasts, menus and popovers |
| `Radius/surface` | 16 | modals and sheets |
| `Radius/pill` | full | badges, tags, dots, toggles, counters, step markers |

**Nesting rule** — *inner radius + padding = outer radius* (Nelson, 20 Oct 2026). An element inside a rounded container,
closer to its edge than the container's radius, gets `outer − padding` (menu 12 with 4 padding → rows 8). For tracks it
runs the other way, as Nelson set the DS Button group (node `5400:393130`): segments keep `control` 6 and the track
grows to 6 + 4 = 10. It never goes below the element's own role, nor below 0. An element further in than the outer
radius keeps its own role (a button 16 px inside a card stays `control`); one flush with its parent's corner takes the
parent's radius.

**Why**
- Nelson, 20 Oct 2026: "os border radius têm de ser consistentes em toda a plataforma … deve ter uma lógica igual em
  TUDO. Se for preciso criar tokens cria-os."
- The audit of the same day found cards at 8, 10 and 12, buttons at 6 next to inputs at 8, menus at 8 and 12, icon
  tiles at 8 and 10, 36 radii with no token, the Checkbox bound to a spacing token, and in the prototype
  `rounded-lg` (124), `rounded-[10px]` (27) and `rounded-xl` (57) used for the same things.
- Controls stay at 6 (Nelson's choice between 6 and 8): buttons keep their radius, inputs move from 8 to 6.
- The size tokens (`Radius/fixed-*`) say how big a corner is, not what it is for; a role lets the logic change in one place.

**Design** — DS: tokens created 20 Oct (`Radius/none … pill` `VariableID:22913:35–40`, `Radius/card-inset`
`VariableID:22930:5843`, `Radius/track` `VariableID:22943:585892`), WEB code syntax `rounded-<role>`. Every component on the LMS pages (Shared, ICP, Platform,
In review) and the Base and Mobile pages is bound to them; Share-Menu and Card-Overflow-Menu got 4 px padding and
rows on `card-inset`; Button group track on `track`, segments on `control`; learner avatars in both Topbars on
`control`. A strict check after the pass leaves two value-identical leftovers on `Radius/fixed-full` (Avatar xs
`19:1011`, _Badge close X Teal `4825:404435`): every write to them times out (thousands of instances), and 9999 is
9999. `Radius/flex-*` (11 tokens, 0 uses in the DS, the ICP and the Mobile App) were deleted; `Radius/fixed-*` stay
published because the Mobile App binds them (~16 000 bindings). 66 components bumped one MINOR
(`component-versions.md`). Doc: *Block · Radius roles* on Foundations · Spacing, radius & grids. Screens follow
through the library update.

**Dev impact** — Prototype: `tokens/radius.css` (`--sk-radius-*`) and Tailwind `rounded-none / -inner / -control /
-card / -card-inset / -track / -surface / -pill`; 396 classes in 117 files mapped (PR 209), menus fixed (PR 211),
segmented tracks at 10 with segments at 6 (PR 212); token-lint rule
`raw-radius` rejects `rounded-sm/md/lg/xl/…`, bare `rounded` and `rounded-[Npx]` (the lab "training" world keeps its
own tokens). Production: map the same eight roles to the platform's CSS variables.

**Alternatives rejected** — Controls at 8 (would change every button); radius by size buckets (a 40 px tile and a
40 px button are different things); keeping `rounded-lg` and only changing its value (8 is a card in one place and a
control in another, so no single value fixes both).
