# Mobile App · and the token architecture that has to carry every product

Two things in one document, because the second was found by doing the first.

Sources read on 17 Aug 2026:
- **Mobile App** — file `JxJX4zwjXNU3SdsVdJxPsU`, node `827-5484`
- **MobileApp components** — DS file `c7EUDrQwP8si08aPipDSIV`, page `❖ MobileApp Component ✅` (node `20680-3695`)
- The four live variable collections in the DS file

---

## Part 1 · What the Mobile App is

Built manually by the design team, ahead of the LMS work rather than after it.

**It is a live-session product, not a course player.** The node holds ~500 frames and the
screens are numbered scenarios, 1 through 24, almost all of them about **joining a session
and the ways that fails**:

| Group | Scenarios |
|---|---|
| Before | No instructor-led enrolment · Sessions fail to load · Join window not yet open · Starting soon, join available |
| Joining | Zoom hand-off loading · Zoom not installed · In-app browser · Join link unavailable |
| Failure | Learner offline · Poor connection · Not authorised · Session can no longer be joined · Instructor has not started |
| After | Live now / cancel · Completed session details (24, 24.1, 24.2) · Recordings |

Frames are 402×860 to 402×1648 — iPhone widths with long scrolls.

**Its component naming is a different convention.** `MobileApp_event-card`, `MobileApp_Header`,
`MobileApp_footer`, `MobileApp_empty-state`, `MobileApp_Event_type_tag` — underscored and
product-prefixed, where the LMS uses `LMS / Topic Row`. Eleven components on the DS page.

### Two things worth acting on

**The overlap with VILT is not partial, it is the same subject.** Our `topic-types-inventory.md`
already documents VILT as one topic type whose asset changes over time, with the same three
stages: pre-live, live, recording. The app has drawn the failure modes we never did — offline,
no Zoom, unauthorised, link dead. Those belong in the VILT spec whichever product renders them.

**Scenario 13 is "Instructor has not started the session".** That is the exact message we
rewrote for the LMS on 14 Aug, on the principle of saying what comes next rather than what is
missing. The app still carries the old framing. Whatever we decide about tokens, the voice rule
has to reach this file too.

---

## Part 2 · The token architecture

### What is there today

| Collection | Modes | Variables | What is inside |
|---|---|---:|---|
| `_Primitives` | Style | 619 | `Colors` 550, `Numeric` 33, `Type` 24, `Width` 12 |
| `1. Semantics` | Light SKO · Dark SKO · Light BrandX · Dark BrandX | 361 | `Component colors` 195, `Colors` 110, `SKO` 56 |
| `3. Responsive 📐` | Desktop · Tablet · Mobile | 79 | `Type` 34, `Radius` 22, `Spacing` 17, `Container` 5 |
| `2. Skins 🎨` | SKO · Gold · Violet · Sky · Red · Ink | 12 | `Brand-Skins` 12 |

### Four problems, in the order they will hurt

**1 · The mode axis is a product of two axes, so it multiplies.**
`1. Semantics` carries *theme × brand* on one axis: Light SKO, Dark SKO, Light BrandX, Dark
BrandX. Two themes and two brands is four modes. A third brand makes six. Add a high-contrast
theme and it is nine. The axis grows by multiplication because two independent ideas share it.

**2 · Brand is expressed twice, in two mechanisms.**
There is a `BrandX` pair of modes in `1. Semantics` *and* a six-mode `2. Skins` collection. Two
answers to "what is a brand here", and a component can only bind to one of them.

**3 · One collection holds three layers of abstraction.**
`1. Semantics` mixes 195 vendor per-component tokens, 110 vendor semantic tokens and 56 of our
branded ones. A designer picking a colour is offered all three with no signal about which is
the right altitude.

**4 · The newest product is the least connected to the system.**
Across the MobileApp components: **575 paints bound to a variable, 309 with no token at all**
— a third hardcoded. Of the bound ones, **418 point at the vendor `Colors/*` layer and only 132
at our `SKO/*` layer.** Plus stragglers on `LMS/*` and `Brand-Skins/*`. This is the same drift
the LMS components had before the 14 Aug rebind, at a worse ratio, and it happened because the
system offers no obvious right answer.

### The proposal — one axis per collection

The fix for multiplication is addition: give every independent idea its own collection, and let
components consume exactly one layer.

| # | Collection | Modes | Holds | Bound to |
|---|---|---|---|---|
| 1 | **Primitives** | one | Raw ramps, numerals, families. No meaning. | nothing |
| 2 | **Brand** | SKO · Gold · Violet · Sky · Red · Ink · *(new brands)* | Only what is brand-specific: the primary ramp, accent, brand text and surfaces. | Primitives |
| 3 | **Theme** | Light · Dark · *(High contrast)* | Every semantic surface, text, border and state. The layer components actually use. | Brand + Primitives |
| 4 | **Medium** | Web · App · Email · Print · Social | Type scale, spacing, radius, container. The values that change because the substrate changes. | Primitives |
| 5 | **Viewport** | Desktop · Tablet · Mobile | Only what genuinely varies by screen inside a medium. | Medium |

Brands and themes now **add** instead of multiplying: six brands and three themes is 6 + 3 = 9
modes across two collections, where today it would be 18 in one.

**The rule that makes it hold:** a component binds to **Theme** and **Medium** only. Never to
Primitives, never to the vendor `Colors/*` or `Component colors/*` layers. That single rule is
what the audit can check, and it is what was missing when the Mobile App was built.

### What this does not solve, and I would rather say so now

**Print is not a mode.** Figma variables carry RGB; print needs CMYK or spot, plus bleed,
overprint and paper stock. A `Print` mode can carry *sizes and spacing*, but colour has to be a
mapped export with its own proofing step. Treating print as a fifth mode would quietly ship
wrong colour.

**Email is a export problem, not a token problem.** Many clients drop CSS custom properties and
ignore `prefers-color-scheme`. Newsletters need the tokens **flattened to literal hex at build
time**. The Figma structure above is right for it; the pipeline is the work.

**Social is neither.** Fixed canvases per platform, and brand expression that is deliberately
louder than product UI. It likely wants its own Brand modes rather than reusing product ones.

### Sequence I would follow

1. **Split the axes** — Brand and Theme into separate collections, retiring the `BrandX` modes.
   Mechanical, and the values already exist.
2. **Collapse the namespaces.** Five are in use today (`Colors`, `Component colors`, `SKO`,
   `LMS`, `Brand-Skins`). One semantic namespace, one meaning per name.
3. **Rebind the MobileApp components**, the same pass run on the LMS on 14 Aug: 418 vendor
   bindings to the semantic layer, and a decision for each of the 309 hardcoded paints.
4. **Add the Medium collection** once a second substrate is real — the first newsletter or
   landing page. Building it before then is guessing at values nobody has needed.

Step 4 last on purpose. Steps 1 to 3 pay off immediately and are reversible; step 4 invents
structure for products that do not exist yet, and the shape should come from a real page.

---

## Open questions for the team

- Does the Mobile App stay a **separate product** in the DS, or become the App rendering of the
  same VILT topic type the LMS has? The answer changes whether `MobileApp_*` components should
  exist at all, or be variants of shared ones.
- The `LMS/*` namespace was renamed to `SKO/*` at some point between 14 and 17 Aug. Docs written
  before that still name `LMS/…`. Worth one sweep once the namespace decision above is made.
- ~~The DS file still carries the Untitled UI sample furniture.~~ **DECIDED 18 Aug: it leaves the
  file.** No re-pointing of tokens on those pages — work spent on material that is going away is
  work lost. See "Removing the vendor sample content" below.

---

## Removing the vendor sample content — what must stay

Decided 18 Aug 2026. Before anything is deleted, this distinction has to hold, because it is not
the one the page names suggest.

**The vendor's *examples* can go. The vendor's *base components* are load-bearing** — our own
components nest them, and deleting them empties the things we ship.

Measured across `❖ LMS COMPONENTS ✅` and `❖ MobileApp Component ✅`: **2 022 instances** whose main
component lives on a vendor page.

| Page | Instances of ours |
|---|---:|
| `↳ Icons` | 1 099 |
| `↳ Buttons` | 307 |
| `↳ Badges` | 292 |
| `↳ Checkboxes` | 110 |
| `↳ Tabs` | 54 |
| `↳ Avatars` · `↳ Tags` | 25 each |
| `↳ Breadcrumbs` | 24 |
| `↳ Progress indicators` | 20 |
| `↳ Video players` | 16 |
| `↳ Toggles` · `↳ Button groups` · `↳ Tooltips` · `↳ Inputs` · `↳ Dropdowns` · `↳ Misc icons` | 3–12 each |

### The trap

**`↳ Tabs` (54) and `↳ Breadcrumbs` (24) sit under `❖ APPLICATION COMPONENTS`** — a section whose
name reads like sample material and which someone would reasonably delete wholesale. Doing that
breaks 78 instances inside our LMS components.

So the cut is not by section. It is: **keep any page this table names**, whatever section it is
filed under; everything else in Shared assets, Marketing website examples/components and
Application examples/components can go.

### One more thing found while measuring

Seven instances have a main component that resolves but belongs to **no page** — `LMS / Overall
Progress/Mobile` and `LMS / Topic-Types Badge/Discussion…`. Deleted mains that still render, the
same ghost state we found twice before: the `Font/family-*` duplicates and the `Container/legacy/*`
tokens after deletion. Worth resolving before the clean-up, or they will vanish with it.
