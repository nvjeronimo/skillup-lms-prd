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


---

## 7 · `Badge` `Color=Brand` renders Untitled UI purple

Found 14 Sep while swapping hand-drawn chips on the Course Detail screens for `Badge`. The `Brand` colour of
`Badge` (`1046:3819`) is bound to `Component colors (Remove)/Utility/Brand/utility-brand-50 / -200 / -700` —
`#f9f5ff`, `#6941c6`. That is the stock Untitled UI brand, in the library, not a consumer out of date.

It is one of the 150 `Utility/*` bindings the rebind deliberately left alone because SKO has no destination for
them. So it is not a new problem — but it is the first place a designer adopting the DS as instructed gets a
visibly wrong brand colour for doing the right thing.

**Ask:** map `Utility/Brand/*` onto the SKO brand ramp, or rule that `Badge` must not offer `Brand` until it is.
Until then the Course Detail screens use `Gray`.


---

## 8 · `LMS / Quiz · Grade Summary` — built for one quiz, used as a gradebook

Adopted on the Course Detail Progress tab on 15 Sep, without changing the library. It works for that screen
because the screen's data happens to fit it. It will not fit the next course. From most to least blocking:

1. **The assignment-type table has exactly two body rows.** `grading_policy.assignment_policies[]` has as many
   as the course author creates. It needs to be a list of a row component, not two drawn rows.
2. **The breakdown is four flat, fixed rows.** The data is `section_scores[] › subsections[]` — two levels, any
   length. Same fix: a section row and a subsection row as components, in a list.
3. **The pass marker is a rectangle fixed at 70%.** `grade_range` is per course.
4. **It sits on `Progress bar`, whose variants step by 10%.**
5. **Only `Result=Below pass`.** Passing and Not started are missing.
6. **No lettered grade scale**, which the platform supports alongside a single pass threshold.
7. **The name.** It is described as a course-level gradebook and named as a quiz component.
8. **It cannot go below ~420px.** The first table column has a **min width of 170**, the other three are equal
   FILL columns, and min size cannot be overridden in an instance. At 343 the headers collide. The Course Detail
   mobile screen works around it by hiding two columns; the component needs a mobile layout (or a smaller min).


---

## 9 · `LMS / Difficulty Badge` and `LMS / Delivery Mode Badge` — adopted, with four gaps

Adopted on 17 Sep in the Course Detail hero (`LMS / Course Detail / Course title`) for course level and delivery
mode, in place of two generic `Badge` pills with typed text. Not changed in the library. Four things to fix there:

1. **Labels drift from the source of truth.** The project file has a string-variable collection, *Courses Type*:
   **Self-Paced → Flexible Learning · VILT → Live Sessions · Blended → Flexible + Live Sessions**. The badge says
   **Flexible + Live**. One of the two has to change, and the badge text should be **bound to the variables**
   (move the collection into the library) so it cannot drift again. *This phase only uses Self-Paced → Flexible Learning, which already matches; the drift is on Blended.*
2. **Variants are named by label, not by mode.** `Type=Flexible Learning / Live Sessions / Flexible + Live`. Name
   them by what the data carries — `Mode=Self-Paced / VILT / Blended` — and let the label follow the variable.
3. **The Beginner icon is `loading-01`** — a spinner, which reads as "still loading". Intermediate and Advanced use
   `bar-chart-02` and `bar-chart-12`; Beginner wants the matching low bar chart.
4. **Neither component has a description**, so nothing tells a designer which field or which wording they map to.


---

## 10 · `LMS / Overall Progress` — no value property

The ring exposes only `Device`. Its percentage text and its arc (`arcData` sweep) are two separate overrides in
every instance, and a parent component cannot bind a property to a layer inside an instance. So every card that
uses the ring has to be told twice what the number is — the Course Detail Completion card showed *25%* over an arc
drawn at 67% until 16 Sep.

**Ask:** a `Percent` text property on the ring, and variants (or a documented rule) for the arc so the drawn sweep
follows it. Until then, `LMS / Course Detail / Completion card` documents the two overrides in its description.


---

## 11 · `Badge v2` — no filled (strong) style

`Badge v2` has Soft, Outline, Modern and Plain. None fills with the strong colour and white text. The Course Detail
Dates tab used exactly that for its **today marker** (*TODAY · 18 Sep 2026*, `bg/primary` + `text/on-primary`) — a
chip that has to stand out from every other chip on the timeline. With no such style it became a DS `Content divider`
(Type=Text), which is the DS's own "Today" pattern but loses the emphasis.

**Ask:** a `Style=Solid` (strong fill, `text/on-*`), at least for Brand, Gray and the status colours — or a ruling
that the today marker is a divider.

---

## 12 · No 12px overline

The Course Detail card labels (*MENTOR*, *COURSE TEAM*, *UPCOMING DATES*, *WEEKLY GOAL*…) are uppercase eyebrows at
12/18. The DS overline, `label-small/*`, is **10/14**. They now use `label-small/Medium` — 2px smaller than
designed — because `body-small/Medium` + uppercase detaches the style (a case override is a style override).

**Ask:** either confirm 10px is the overline and the cards follow it, or add a 12px overline (e.g.
`label-medium/*`, uppercase, 12/18).

---

## 13 · `LMS / Course Card` — no truncation

In the List layout a long title runs under the progress column (*UX Research and Design Thinking*), and in both
layouts a long *Up next* title runs under its type badge. Nothing truncates or wraps inside the card.

**Ask:** title and *Up next* limited to a set number of lines with an ellipsis (2 and 1?), and the progress column
given a fixed width the title cannot enter.

**And the progress fill has no value.** `fill` is a fixed 149 px frame inside `bar`, identical on every card — 5 %,
52 % and *Not started* draw the same bar. An instance cannot resize it (layers nested in an instance do not
take a size). My Learning sets the fill to *fill* and gives `bar` a right padding equal to the unfilled part
(and hides the fill when not started); a card resized later keeps the old padding. **Ask:** a `Progress` property (or the DS `Progress bar` inside the card).

**And it does not survive a narrower screen.** (1) `thumb` is a square with a locked ratio that fills the header's
height; the header's height comes from the title, the title's width from what the thumb leaves. At 960 this loops:
the titles column went to 1 px and the thumb to 686 × 686. (2) The List layout overlaps below ~1100. (3) *Up next*
pushes the Topic-type badge out of the card. My Learning pins the thumb at 86, truncates *Up next* to one line and
uses Grid only below desktop. **Ask:** a fixed thumb size, a truncating *Up next*, and a List that reflows (or a
ruling that List is desktop-only).

---

## 14 · No italic text style (editorial headings)

The platform pages title their sections in two voices — *Due* **this week**, *Pick up* **where you left off**, *Keep*
**going.**, *Good morning,* **John.** — the second phrase italic and grey. The DS has weight variables for italics
(`Type/weight/bold-italic`, `medium-italic`…) but **no italic text style**, so the italic cannot be applied without
detaching the style. `LMS / Platform / Section header` keeps the colour split and drops the italic.

**Ask:** an emphasis style for headlines (e.g. `headline-small/Bold Italic`, `display-medium/Medium Italic`), or a
ruling that the platform headings are not italic.

---

## 15 · `Progress bar` — stepped values only

`Progress` is a variant from 0 % to 100 % in steps of 10. A program at 27 % shows the 30 % bar next to the text
*27%*, and every card has to round.

**Ask:** a continuous value (a width bound to a number, or a `Percent` property the fill follows), as for request 10.

---

## 16 · `LMS / Course Row` — no narrow layout

The row (title + delivery badge, then progress + button) wraps its two lines, but the first line hugs its content:
352–405 px for the Dashboard's three courses, wider than a phone (327 inside the page padding). Its inner frames
do not take width overrides. The mobile Dashboard hides the delivery badge so the title fits.

*1 Oct:* hiding the badge was rejected — badges show on every breakpoint. The blocker is the title's **264
minimum width** (instances cannot override a minimum, and the nested rows ignore width overrides). The mobile
Dashboard now uses a local `LMS / Platform / Resume row` built from the same atoms.

**Ask:** a mobile layout (title fills and wraps, badge under the title) with no minimum width on the title.

---

## 17 · The accordion item is not published

`FAQ section` (marketing section, 32 variants) is built from `_FAQ item` — Expanded, Divider, Breakpoint, Icon
position — but the item is private (underscore), so a product page cannot place an accordion without importing a
whole FAQ section to reach it. The Program Page FAQs and About tabs use it that way.

**Ask:** publish the accordion item (e.g. `Accordion item`), and note in its description that the divider is drawn
above the item.

---

## 18 · `LMS / Course Card` — the *UP NEXT* overline is 11 px and has no text style

`Next-Content › Overline` (*UP NEXT*) inside the card is Montserrat 11 px with 0.6 px tracking and **no text
style**. It is the only text under 12 px in everything the platform pages place (found 6 Oct while checking the
35 components before their move, §36.3 of the metadata map) and it breaks the 12 px minimum. An instance could
override the size, but every card on My Learning, the Dashboard and the Program Page would need it, and the next
card placed would be 11 px again.

**Ask:** put the overline on a 12 px text style in the component. Same question as request 12 — there is no 12 px
overline style to give it.

---

## 19 · `LMS/Platform/Course-Detail/Course-Header` — no Program variant below desktop

The set has `Kind` Course · Program and `Breakpoint` Desktop · Tablet · Mobile, but only four variants: Program
exists on Desktop alone. The Program Page tablet and mobile screens (metadata map §35.7) use `Kind=Course` with
overrides — breadcrumb, type badge, title, stats, progress card, partner chips hidden, `SKO Dark` set on the
instance. It reads as the program; the property says Course.

One more thing in the same component: `Type and partners` is *space between*, so hiding the partner container
centres the type badge. The screens hide the two chips and keep the container.

**Ask:** `Kind=Program` × `Breakpoint=Tablet` and `Mobile`.

**Done in the DS, 8 Oct**, on Nelson's go-ahead, after a named version: `Kind=Program, Breakpoint=Tablet`
(960 × 321) and `Kind=Program, Breakpoint=Mobile` (375 × 546), each cloned from the Course variant of its
breakpoint with the five differences the desktop Program variant has — the dark semantics mode on the variant,
the breadcrumb, the Program type badge, the title and the structure line. **Needs a DS publish.** Then the eight
tablet and mobile Program screens and their handoff copies switch `Kind` to Program and drop the dark mode set on
the instance.

**On the screens, 8 Oct**, after the publish: the 16 tablet and mobile headers (8 sources, 8 handoff copies) are
on `Kind=Program`. Same texts, same sizes. The dark mode set on the instance was cleared first, and that was a
mistake: an empty mode override stayed behind and cancelled the variant's own mode, so the headers rendered light
(trap 45). Corrected the same day: each instance carries the two modes of its variant again and resolves to dark,
read back on all 16.

**Two gaps against the Desktop Program variant, closed in the DS on 8 Oct (evening)**, on Nelson's go-ahead,
after named versions. The Tablet and Mobile variants built that morning had kept two things from the Course
variant:

| What | Was | Now, as on Desktop |
|---|---|---|
| Background | `bg/primary-soft` (15,44,56 in dark) | `bg/subtle` (18,34,40) |
| Placeholder partner logos | Microsoft wordmark grey 115, IBM a raw blue | wordmark white, IBM on `icon/on-media` (39 paints per variant) |

Found by comparing the Course and Program variants layer by layer on each breakpoint, raw colours included; the
remaining differences are now the same set on the three breakpoints. ~~Needs a DS publish, then `Course-Header`
accepted in the product file.~~ **Published and accepted the same evening. Closed:** the 24 Program headers of
the screens and handoff copies read `bg/subtle`, 18,34,40, dark, on the library's current version.

---

## 20 · `LMS/Platform/Program-Detail/Course-Row` — no layout below desktop

The row is built on `LMS / Course Card` · List and a one-line modules bar. Under ~1 100 the List card overlaps
(request 13), and on a phone the modules bar cannot hold *You left off in Module 2 of 4* beside its button; an
instance cannot change either. The Program Page uses a local **`LMS/Platform/Program-Detail/Course-Row-Compact`**
on tablet and mobile: the card in its Grid layout, the modules bar wrapping, the same properties as the DS row.

**Ask:** fold it into the DS row as `Breakpoint` = Desktop · Compact (the top bar's own vocabulary), and retire
the local one.

**Done in the DS, 8 Oct**, on Nelson's go-ahead, after a named version: `Course-Row` has `Breakpoint` = Desktop ·
Compact. The two existing variants were renamed (`Expanded=…, Breakpoint=Desktop`; keys unchanged, so instances
keep their link), and two Compact variants were built from them to match the local component as Nelson left it:
the card in its grid layout with a full-width button and a truncating *Up next* title, the modules bar wrapping,
400 wide. Read back: **400 × 425 and 400 × 886, the local component's own sizes**; card 398 × 356, button
350 × 48, bar 398 × 67. Not carried over: the `topics-done` boolean (linked to nothing), and one alignment
override that only the local `Expanded=True` had on the *Up next* row (no visible effect). **Needs a DS
publish.** Then the 28 compact rows on the tablet and mobile screens and handoff copies are swapped to the DS
variant and the local component is removed.

**Corrected the same day:** the two Compact variants had lost their property links when cloned — *Position*,
*Detail* and the *Modules* slot did not follow the set's properties. Linked again and tested with a temporary
instance. The first publish carried the unlinked variants; **one more publish is needed** before the rows are
swapped.

**On the screens, 8 Oct**, after the second publish: the 28 compact rows (tablet `6666:24197`, mobile
`6668:32886`, handoff copies `6729:21404`, `6729:25817`) are the DS row on `Breakpoint=Compact`, with no text
difference. The mobile expanded row is 942 high (962 with the local component: the detail now fits one line).
The local `Course-Row-Compact` (`6665:4206`) and its section are removed. **Closed.** `topics-done` went with the
local component; nothing was linked to it.

---

## 21 · Delivery, difficulty and topic-type badges read *Label* — 7 Oct

**What is wrong.** `Badge v2` was restructured: no nested `_Badge base` any more, its properties (`Text`, `Icon
leading`…) sit on `Badge v2` itself. The components that wrap it kept none of their overrides. In the DS, **every
variant** of `LMS / Delivery Mode Badge` (3), `LMS / Difficulty Badge` (3) and `LMS / Topic-Types Badge` (14) is
now the same thing: a `Badge v2` with `Text = Label` and `Icon leading = false`, 50 × 22 or 34 × 18. The same
happens to badges nested in other components: the provider badge of the Course Card, the *You left off here* of
`Course-Row`, the relative date of `Sidebar-Card` · Dates.

**Where it shows** — visible badges that read *Label*, counted 7 Oct after the library update was accepted:

| Page | Reading *Label* | Of |
|---|---:|---:|
| Platform Pages — Ready for Dev | 124 (49 delivery · 32 difficulty · 43 topic type) | 124 |
| Platform Pages V8 — WIP | 182 | 192 |
| Video Lessons | 72 | 72 |
| Quizzes | 242 | 242 |
| Reading | 48 | 48 |

The ten that still read correctly on the WIP page are older instances that kept a local override.

**Nothing was changed in the screens:** an override per badge would hide the defect and would have to be removed
again. The screens heal when the three sets are repaired and the library is published.

**Ask:** in each variant of the three sets, set `Text` to the variant's label and `Icon leading` back on with its
icon; check the other components that nest a `Badge v2`; publish.

### Repaired in the DS, 7 Oct (evening) — the three sets, 20 variants; published the same night

On Nelson's go-ahead, after a named version (*Before badge repair: Delivery Mode, Difficulty and Topic-Types
badges*). On the nested `Badge v2` of each variant: `Text`, `Icon leading = true`, `Icon leading swap`; on the
topic-type badge also the label on `text/subtle` and the icon container's fill hidden, as before. Every variant
read back; sizes are the old ones where an old one was on record (*Flexible Learning* 137 × 22, *Flexible + Live*
117 × 22, *Beginner* 89 × 22, *Video* 61 × 20, *Reading* 78 × 20, *Live Session* 100 × 20); each set checked by eye.

| Set | Variant → label · icon |
|---|---|
| `LMS / Delivery Mode Badge` | Live Sessions · `video-recorder` — Flexible + Live · `calendar-check-01` — Flexible Learning · `clock` |
| `LMS / Difficulty Badge` | Beginner · Intermediate · Advanced, each with its `LMS / Difficulty · Level Icon` |
| `LMS / Topic-Types Badge` | Video · `play` — Quiz · `help-circle` — Lab · `atom-01` — Reading · `book-open-01` — VILT-Live Session → *Live Session* · `video-recorder` — VILT-Recording → *Recording* · `video-recorder-off` — Activity · `lightbulb-02` — Project · `briefcase-01` — Practice Assignment → *Practice* · `edit-02` — Graded Assignment → *Graded* · `award-01` — Peer-graded · `users-01` — Peer Review → *Peer review* · `eye` — Podcast · `music-note-01` — Lesson Page → *Lesson* · `layout-alt-01` |

**Where the values come from.** The Figma version history could not be read (the REST token has expired), so:
delivery and difficulty from the changelog of 23 Sep, where Nelson chose those icons; topic types from the
prototype's `TopicTypeBadge` (icons and short labels, written against this component) and from an instance in the
product file that had not taken the update (*Reading*: `book-open-01`, label on `text/subtle`, container fill
off). **Two are inferred, to confirm:** *Peer review* in sentence case (as the Course Detail screen read that
morning; the prototype writes *Peer Review*), and `layout-alt-01` for *Lesson* — the one icon that left the
screens with the badges and had no other owner; the prototype has no record of it.

### The other 15 sets — 94 nested badges, repaired 7 Oct (night); published the same night

On Nelson's second go-ahead, after a named version (*Before badge repair 2: nested badges in 15 LMS component
sets*). Counted the same day on the two LMS pages: all 114 `Badge v2` nested in a component read *Label*; the
three wrapper sets were 20 of them, these are the other 94. `Text` restored on each, and `Dot` on the one that had
it. Style, size and colour had survived and were not touched. All 94 read back; `Quiz · Entry Header` and
`Program-Card` checked by eye.

| Set | Badges | Restored to | From |
|---|---:|---|---|
| `LMS / Quiz · Entry Header` | 24 | Practice: *Practice quiz* · *Ungraded* · *3 questions* · *About 4 min* · *Unlimited attempts* · *Pass mark 60%* — Graded: *Graded quiz* · *20% of module grade* · *8 questions* · *About 10 min* · *2 attempts* · *Pass mark 70%* — Final: *Final exam* · *40% of course grade* · *20 questions* · *About 20 min* · *1 attempt* · *Pass mark 70%* — Timed exam: *Timed exam* · *30 min limit*, then the Final's four | the build script of 22 Jul; the Timed exam log of 3 Aug; the weight badges were still these on 28 Sep (prototype audit, R13) |
| `LMS / Quiz · Results` | 4 | *Passed* · *Not passed* · *Submitted* (Pending) · *Recorded* (Withheld) | changelog, the pill table |
| `LMS / Quiz · Grade Summary` | 1 | *62% · below the 70% pass mark* | the build script, 28–29 Jul |
| `LMS / Provider-Partner Badge` | 6 | the variant's name | the prototype's `ProviderBadge` |
| `LMS / Course Type Badge` | 2 | *Course* · *Program* (a hidden layer) | an instance that had not updated |
| `Topic-Status-Badge` | 2 | *Marked as completed* · *Under Review* | the prototype's `TopicActionBar` |
| `LMS / VILT · Session Card` | 1 | *Scheduled* | the stage name in the build script; the Unlocked variant still reads it |
| `…/Course-Detail/Date-Row` | 24 | `Type` *DUE DATE* · `Assignment type` *HOMEWORK* · `Status` the state in capitals | the build script of 8 Sep and the 25 Sep migration |
| `…/Course-Detail/Thread-Row` | 9 | *QUESTION* · *ANSWERED* · *FOLLOWING* | the build script, 21 Aug |
| `…/Course-Detail/Message` | 8 | *STAFF* · *ACCEPTED ANSWER* | the build script, 21 Aug |
| `…/Course-Detail/Sidebar-Card` · Dates | 2 | *In 3 days* · *In 8 days* | the build script, 19 Sep |
| `…/Navigation/Topbar-Item` | 2 | *4* (hidden until `Show count`) | the width it kept (one character) and the screens |
| `…/Dashboard/Due-Item` | 2 | Today: *Live* with the dot — Upcoming: *Due Fri* | the build script, 30 Sep |
| `…/My-Learning/Program-Card` | 6 | *Cohort Apr 2026* · *Not started · Starts May 12* | the build script, 30 Sep |
| `…/Program-Detail/Course-Row` | 1 | *You left off here* | the screen |

**Least certain, to confirm by eye:** the four meta badges of *Timed exam* (taken from *Final*; the 3 Aug log
shows only the strings that changed), *Scheduled*, the *4*, and the two `Topic-Status-Badge` labels (from the
prototype, not from the DS).

**Restored as they were, not as they should be.** `Due-Item` · Today reads *Live* again and `Program-Card` carries
a cohort: both are defaults the edX pass of §37 took off the screens (§37.6, item 4). A repair is not the place to
change a component's defaults; that item stays open.

**Not checked:** `Badge v2` nested in components outside the two LMS pages (the Untitled UI pages, tabs,
navigation, tables). The same loss is likely there.

**And in the product file,** a badge whose text was set on a screen (*In 13 months*, *Due 11:59*, *QUESTION*, a
cohort) lost that text too. Repairing the DS gives it the component's default back, not the screen's text: the
screens need their own pass after the library is published. The texts are on record: the 25 Sep migration saved
them per instance, and the 7 Oct edX pass listed every screen.

### After the publish — 7 Oct (late): the update reached five sets; first part of the screens pass

**The DS is published.** All 18 repaired sets read `CURRENT`, from the desktop app and from Figma's server.

**The product file took the update for five sets only.** Read on the two platform pages, same result from both
clients once they settled:

| The file's copy reads the repaired values | The file's copy still reads *Label* |
|---|---|
| `Topbar-Item` · `Date-Row` · `Thread-Row` · `Sidebar-Card` · `Program-Detail/Course-Row` | `LMS / Delivery Mode Badge` · `LMS / Difficulty Badge` · `LMS / Topic-Types Badge` · `LMS / Provider-Partner Badge` · `LMS / Course Type Badge` · `LMS / Quiz · Grade Summary` · `Course-Detail/Message` · `Dashboard/Due-Item` · `My-Learning/Program-Card` — and, on the ICP pages, `Quiz · Entry Header`, `Quiz · Results`, `Topic-Status-Badge` |

Visible badges still reading *Label* after this pass: **255 of 434** on Platform Pages V8 — WIP, **157 of 286** on
Platform Pages — Ready for Dev, every one of them inside a set of the right-hand column. **To do, Nelson:** in the
product file, Libraries → Updates, accept what is left (reload the tab first if nothing is listed).

**How the half-state shows.** A nested badge nobody touched on the screen follows the component around it: the
*Beginner* inside an updated `Course-Row` is right. A nested badge whose variant was set on the screen — every
delivery badge, since the edX pass set them to *Flexible Learning* — follows the file's own copy of the badge and
reads *Label* until that copy is updated. Do not read one correct badge as proof the update is in.

**Restored on the screens, 118 badges** (named version first: *Before badge texts pass on platform screens*), on
both platform pages, each read back and the result checked by eye:

| What | Badges | Text |
|---|---:|---|
| `Badge v2` placed directly on the technical frames | 28 | *Counts* 8 · *No* 14 · *Not required* 4 · *Self-paced* 1 · *Professional* 1 — the layer name carries the text; the two chips from the 1 Oct replacement log |
| Tab counts on the eight *Programs* screens | 16 | *Programs* **2** · *Courses* **5** |
| `Sidebar-Card` · Dates on the Course tab (7 cards) | 14 | *Tomorrow* · *In 15 days* |
| `Sidebar-Card` · Program dates (9 cards) | 18 | *Started* · *In 13 months* |
| `Date-Row` on the Dates tab (6 screens) | 42 | `Type`: *COURSE* (starts, ends) · *UPGRADE* · *CERTIFICATE* · *ACCESS*; `Assignment type`: *FINAL PROJECT* · *FINAL EXAM* — rows matched by their title |

**Waits for the rest of the update:** `Due-Item` on the Dashboard (*Due 11:59*, no dot; *Due Fri* is the default),
the grade pill on the Progress tab (*15% · below the 70% pass mark*), then a recount on every page, the ICP pages
included (quiz entry headers, Video tab counts).

### Tried by script on the two platform pages — it did not hold — 7 Oct (night)

**State at the end of the night, as the file is saved: 127 of 286 visible badges read *Label* on Ready for Dev,
199 of 434 on the WIP page** — inside `Delivery Mode Badge`, `Difficulty Badge`, `Topic-Types Badge`,
`Provider-Partner Badge`, `Message`, `Due-Item` · Upcoming and `Program-Card`.

**What was tried.** Asked for by key, the library returns the repaired components; the screens point at older
copies of them. Nelson asked for the labels to be put right, so the instances were moved by script to the copy the
library returns (`importComponentByKeyAsync` + `swapComponent`; named version first: *Before moving stale
instances to the published DS versions*): 196 instances that are not nested and 163 nested wrappers. Right after,
0 of 286 and 0 of 442 read *Label*, in the read-back and in the renders.

**About twenty minutes later the instances were back on copies that read *Label*.** A swap to another copy of the
same component does not change which version of that component the file has accepted; the next time the
components are resolved, the instances fall back to it. **The update has to be accepted in Figma's own
Libraries → Updates panel. No script replaces that click**, and the same pass on the ICP pages would not hold
either.

**What did hold** (checked again at the end): every text set on an instance — *Due 11:59*, the *15%* grade pill,
the dates cards, the Dates tab types, the tab counts, the direct badges on the technical frames. They will read
right as soon as the component around them is on the repaired version.

**One side effect of the swap, fixed at the time:** eight `Secondary` *Resume* buttons on the Dashboard took a
primary fill. Worth knowing if a swap between copies is ever used for something else.

**Also seen:** the desktop app this session talks to answered *Unable to establish connection to Figma* twice and
showed an older state of the file than the server (no cover images, *Calendar 4*). If the update was accepted
from that app while it was out of sync, that may be why it only partly arrived.

**To do, Nelson:** in the product file, reload the tab, then Libraries → Updates → Update all. If the panel lists
nothing for these components, plan B is to touch each of the twelve sets in the DS and publish again, so the
update is offered anew.

### Closed — 7 Oct (late night): the update is in, no badge reads *Label*

Nelson accepted the update in the product file's Libraries → Updates panel, and it reached every working page.
Counted in the desktop app (visible badges with their label on), and the platform screens checked against the
server's copy as well; the other session counted the four Ready for Dev pages from the server with the same
result and restored the *Notes 2* / *Downloads 4* tab counts on Video (changelog, same day):

| Page | Visible badges | Reading *Label* |
|---|---:|---:|
| Platform Pages — Ready for Dev | 286 | 0 |
| Platform Pages V8 — WIP (four sections) | 434 | 0 |
| Video Lessons | 200 | 0 |
| Quizzes | 483 | 0 |
| Reading | 78 | 0 |
| Overlay Panels — Ready for Review | 33 | 0 |
| Topic Content Types — Ready for Review | 106 | 0 |

The texts set on the platform screens earlier that night were all in place (*Due 11:59*, *Due Fri*, the *15%*
pill, *Tomorrow* / *In 15 days*, *STAFF* / *ACCEPTED ANSWER*, the Dates tab types, the tab counts).

**Restored on the other pages** (named version first), where the component default had replaced a screen's own
text or the badge sits directly on the screen:

| Where | Badges | Text | From |
|---|---:|---|---|
| Quizzes — the nine `Quiz · Entry Header` | 9 | *5 questions* (the defaults read 3, 8 and 20) | the 24 Sep record of the 39 overrides; the other 30 equal the defaults |
| Overlay Panels — tags on the saved notes | 12 | *#discovery* · *#lifecycle* · *#ai* · *#research* | the layer names |
| Overlay Panels — Saved tabs | 9 | *All* 5 · *Topics* 3 · *Notes* 2 | **counted** from the items the panel shows |
| Overlay Panels — Notifications tabs | 12 | *All* 5 · *Discussions* 1 · *Grading* 2 · *Updates* 2 | **counted** from the five items shown |
| Topic Content Types — video template tabs | 2 | *Notes* 2 · *Downloads* 4 | the Video Lessons page, same tabs |

**The 21 panel tab counts are not recovered values.** No record of them was found; they follow the rule in
P1-37 (*the count badge matches the items shown*). The split of the five notifications is a reading: the reply is
a discussion; the quiz due and the peer rating are grading; the live session and the new content are updates.
To confirm.

**One update is still not in:** `Today-at-a-glance` · Desktop. The Dashboard at 1 280 and 960 still shows the old
2 × 2 card (request 24).

**Not checked:** Nelson's discovery pages and the archive, by rule.

### Outside the two LMS pages — sampled 8 Oct, nothing changed

`Badge v2` nested in the Untitled UI kit components lost its text in the same restructure. Six component pages
of the DS were read; a badge counts when its label is on:

| DS page | Nested badges | Reading *Label* | Where |
|---|---:|---:|---|
| Application navigation | 177 | 177 | `Sidebar navigation`, `Header navigation`, `_Nav item base`, `_Nav item dropdown base`, `_Nav featured card` |
| Tables | 276 | 276 | `Table`, `Table cell` |
| Card headers | 4 | 4 | `Card header` |
| Tabs | 472 | 0 | all read *2* since the default was set on `_Tab button base` |
| Page headers · Dropdowns | 0 | — | no nested badge |

**None of this shows on a working screen**: the seven pages counted above read 0. It will show the day one of
these components is used without setting the badge. The original texts are the Untitled UI defaults and are not
on record here; repairing them is a decision for Nelson, and the other kit pages were not read.

---

## 22 · `LMS/Platform/Navigation/Topbar` — *Calendar* counts 4, it was 3

The top bar was built with *My Learning* **4** and *Calendar* **3**. The 3 was an override two levels down, set in
the `Topbar` master on the count badge of its *Calendar* item. The `Badge v2` restructure dropped it, and the
repair of request 21 did not see it: that pass looked for badges reading *Label*, and this one reads the item's
default, *4*. Every desktop platform screen now shows *Calendar 4* (23 top bars on the two pages).

Not patched on the screens: 23 overrides for a value that belongs to one master.

**Ask:** in `Topbar` · `Breakpoint=Desktop`, *Item · Calendar* › *Count* › `Text` = *3*; publish. Needs Nelson's
go-ahead, as any DS write. The counters still have no defined source (§37.6) and navigation is not final.

**Done 7 Oct (night)**, on Nelson's go-ahead, after a named version; published by Nelson. The Dashboard and My
Learning screens read *Calendar 3* again.

**Likely elsewhere too:** any other text a DS master set on a badge inside a nested instance was lost the same
way and now reads a plausible default. None is known; this one was found by comparing with the 30 Sep build.

---

## 23 · `LMS/Platform/Program-Detail/Course-Row` — the *You left off here* badge goes

Nelson, 7 Oct: the badge is not needed. The modules bar already reads *You left off in Module 2 of 4*, and the
current module is the one with partial progress.

| Where | State |
|---|---|
| Local `Course-Row-Compact` (tablet, mobile) | badge removed from the component |
| Desktop *Courses* screen (`6539:29871`, DS `Course-Row`) | badge hidden on the instance |
| DS `Course-Row` · `Expanded=True` | **still has it** |

The *Current module* frame around module 2 stays; its own padding leaves it 4 px taller than the other rows
(80 against 76 on desktop and tablet). List gaps read 8 on the three screens.

**Ask:** remove the badge from the DS component, publish; the override on the desktop screen then has nothing to
hide. Needs Nelson's go-ahead.

**Done 7 Oct (night)**, on Nelson's go-ahead: removed from `Expanded=True` (578 → 550 high, gaps still 8),
published by Nelson; the hidden copy in the desktop row's slot was removed too. No *You left off here* is left on
any screen or in either component.

---

## 24 · `LMS/Platform/Dashboard/Today-at-a-glance` — variant names carry three stray properties

Nelson gave the glance card two layouts on 7 Oct: `Breakpoint=Desktop`, four stats in a line, and
`Breakpoint=Mobile`, 2 × 2 — which settles the open item of §37.6 (an instance cannot change a grid's columns).
The screens use Desktop at 1 280 and 960 and Mobile at 375.

Combining the variants split the old slash name into properties: every variant is named `Property 1=Platform,
Property 2=Dashboard, Property 3=Glance-Card, Breakpoint=…`, and an instance shows three properties with one
option each.

**Ask:** delete `Property 1`, `Property 2` and `Property 3` from the set; publish. Instances keep their link (the
variant keys do not change). The defaults are still the pre-edX sample (*Today at a glance*, XP, attendance —
§37.6, item 4).

**Done 8 Oct**, on Nelson's go-ahead, after a named version: the two variants are named `Breakpoint=Desktop` and
`Breakpoint=Mobile`, and the set's properties are `Title` and `Breakpoint` only. Set key and both variant keys
unchanged, sizes unchanged (806 × 168, 806 × 274). **Needs a DS publish.** The defaults were not touched.

**Published and accepted the same day; read on the six Dashboard screens from both the desktop app and the
server.** Every glance card is an instance of `Today-at-a-glance` with `Title` and `Breakpoint` only: Desktop
(four stats in a line) at 1 280 and 960, Mobile (2 × 2) at 375; the four totals are intact. The four desktop and
tablet instances had kept the fixed height of the old card (274 and 262) and showed an empty band; they now hug
their content (168 and 160), and the screens are shorter by the same amount.

---

## 25 · Dev Mode notes go once on the main component and on one screen

Nelson, 7 Oct: a note that applies to a component is not repeated on every instance. The *Navigation is not
final* note was on 72 top bars and sidebars; it now sits on the `Topbar` set in the DS, on the local sidebar set
(`6207:256263`) and on one screen (*Dashboard · Desktop*, Ready for Dev). Same rule for any future note.

---

## 26 · `LMS / Course Card` — the thumbnail has no image option

Nelson asked for a cover image on every course (7 Oct). The card's `thumb` is a square with initials on a token
fill; an image can only go in as a fill override on each instance, with the initials hidden. Done that way on the
63 thumbnails of My Learning and Program Detail (61 on screens, 2 in the local `Course-Row-Compact`).

**The images are placeholders**: twelve covers from the public SkillUp catalog (course pages and program
banners), chosen by topic. The seven courses of the digital marketing program have no cover of their own on the
public site, so theirs are borrowed from other courses, except the first, which uses the program's banner. In
production the image is the course's own (`course_image`; Learner Home returns it as `bannerImgSrc`).

**Ask:** give the card a thumbnail that takes an image (a boolean or a swap, initials as the fallback when a
course has none); then the screens drop their overrides.

**Done in the DS, 8 Oct**, on Nelson's go-ahead, after a named version: both variants have an `Image` layer that
fills the thumbnail (absolute, stretched, clipped to the thumbnail's radius), shown by a new boolean **`Show
image`**, off by default; the initials stay underneath as the fallback. Same vocabulary as `Course-Header`
(`Show image`). Checked with temporary instances, image on and off; card sizes unchanged (380 × 358, 1 200 × 120).
**Needs a DS publish.** Then, on the 63 thumbnails: `Show image` on, the cover moved from the thumbnail's fill to
the `Image` layer, the thumbnail back on its token.

**On the screens, 8 Oct — done for the Program page, not for My Learning.**

| Where | Thumbnails | State, read back |
|---|---|---|
| Program page, sources and handoff copies | 42 (7 courses × desktop, tablet, mobile × 2) | `Show image` on, cover on `Image`, thumbnail on its token, initials underneath |
| My Learning, sources and handoff copies | 40 | ~~cover as a fill on the thumbnail, initials hidden; the card has no `Show image`~~ since 8 Oct (late): the same as the Program page |

The 42 sit inside `Course-Row`, which arrived in its published version. The 40 are direct instances of the card:
moved by script to the published copy, they fell back to the version this file holds (trap 42) and lost the cover,
which was put back the 7 Oct way. **Open until the Course Card update is accepted in this file** (Libraries →
Updates); then the 40 take `Show image` and the thumbnail goes back on its token.

**8 Oct (evening), after another publish and accepted updates: unchanged.** `Course-Header` came in; the Course
Card did not, in the server read and in the desktop app. The 40 cards point to a copy of the set with `Layout`
only. Figma's Updates tab lists the current page's assets unless *Show updates for all pages* is on, and an
update taken from one selected instance updates that instance only; one of the two is the likely reason.

**Closed, 8 Oct (late).** Neither was the reason: the product file's tab held an old library state (the desktop
app returned the old card as the library's own), and a reload of the tab made the update available. After it,
the 40 cards took `Show image`, the cover on `Image`, the thumbnail on `bg/primary-soft` and the initials
underneath; no text or size difference. **All 82 course thumbnails use the image option; no cover is a fill
override any more.** The images are still placeholders.

## 27 · `LMS / Lab · Launch Card` — a lab on a partner's platform had no launch component

The Lab screens for Google, Microsoft and IBM (8 Oct) used `LMS / Activity · SCORM Frame` as a stand-in for the
card that opens the lab: its Idle and Error states with the texts overridden and the height forced from 360 to 240.
It has no place for the provider, no completed state, a fixed height, and its buttons do not wrap on a phone.

**Done in the DS, 8 Oct**, asked by Nelson. New set **`LMS / Lab · Launch Card`** (`22251:6427`, key
`360cadf02d6b288bef452183a2d10f82bb4c886c`) in *Group · Lab*, below `LMS / Lab · Prerequisites`. Additive: nothing
existing was changed, so no named version was saved first.

| Property | Values |
|---|---|
| `State` | `Ready` · `Opened` · `Completed` · `Unavailable` |
| `Show provider` | boolean, on by default |

- **Layers:** `Provider` (the nested `LMS / Provider-Partner Badge`, exposed: set its `Type`), `Status icon`
  (`check-circle` on `icon/success`, Completed only), `Title`, `Description`, `Actions` with `Action` and, in
  Unavailable, `Secondary action` (DS Buttons, exposed). Title and Description are edited on the instance, as on
  the SCORM Frame and the Inline Alert: the set has no text properties.
- **Tokens, read back on the four variants:** fill `bg/subtle`, stroke `border/subtle`, radius `Radius/fixed-xl`,
  the card shadow style, gap `Spacing/md`, padding `Spacing/5xl` on the four sides; Unavailable on
  `bg/error-soft`, `border/error`, `text/error`. Title `body-large/Bold`, Description `body-medium/Regular`, on
  `text/default`.
- **Sizing:** 640 wide in the set, fills its container in use; the height hugs (212, 212, 244, 232). `Actions`
  wraps: checked with temporary instances at 311 wide, where the two buttons of Unavailable stack.
- **Buttons:** Primary in Ready and Unavailable, Secondary in Opened and Completed, so a screen keeps one primary
  action. The trailing icon is `link-external-01`; switch it off when the lab opens inside the page.

**Needs a DS publish.** Then, in the product file: swap the stand-in on the Lab screens (42 instances: 9 discovery
sources and 33 handoff cards, less the two IBM rows, which have none), set `State`, the provider and the texts,
and drop the forced height. Request 27 closes when no Lab screen holds a SCORM Frame.
