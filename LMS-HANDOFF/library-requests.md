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

---

## 20 · `LMS/Platform/Program-Detail/Course-Row` — no layout below desktop

The row is built on `LMS / Course Card` · List and a one-line modules bar. Under ~1 100 the List card overlaps
(request 13), and on a phone the modules bar cannot hold *You left off in Module 2 of 4* beside its button; an
instance cannot change either. The Program Page uses a local **`LMS/Platform/Program-Detail/Course-Row-Compact`**
on tablet and mobile: the card in its Grid layout, the modules bar wrapping, the same properties as the DS row.

**Ask:** fold it into the DS row as `Breakpoint` = Desktop · Compact (the top bar's own vocabulary), and retire
the local one.

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

### Repaired in the DS, 7 Oct (evening) — the three sets, 20 variants; **not published**

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

### Still reading *Label* in the DS — 94 nested badges in 15 other sets, not touched

Counted the same day on the two LMS pages: all 114 `Badge v2` nested in a component read *Label*; the repair
above covers 20.

| Page | Component · badges |
|---|---|
| `❖ LMS COMPONENTS` | `Quiz · Entry Header` 24 · `Provider-Partner Badge` 6 · `Quiz · Results` 4 · `Course Type Badge` 2 (hidden layer) · `Topic-Status-Badge` 2 · `Quiz · Grade Summary` 1 · `VILT · Session Card` 1 |
| `❖ LMS PLATFORM COMPONENTS` | `Date-Row` 24 · `Thread-Row` 9 · `Message` 8 · `Program-Card` 6 · `Sidebar-Card` 2 · `Topbar-Item` 2 · `Due-Item` 2 · `Course-Row` 1 |

**And in the product file,** a badge whose text was set on a screen (*In 13 months*, *Due 11:59*, *QUESTION*, a
cohort) lost that text too. Repairing the DS gives it the component's default back, not the screen's text: the
screens need their own pass after the library is published.

