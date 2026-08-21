# Studio authoring surface → DS parity

*Created Aug 20, 2026. The goal it serves: **a content creator should be able to assemble a topic any way they
like, and find every piece already designed.** So the question this document answers is not "what can Open edX
do" — that is [edx-component-types-reference.md](edx-component-types-reference.md) — but **"what can a creator
actually pick in our Studio today, and does a DS component exist for it?"***

The authoritative list is the **Add New Component** surface in our own Studio instance, captured 20 Aug 2026.
Nine tiles, and the Text tile opens six templates:

```
Discussion · Legacy Library · Library Content (Beta) · Problem Bank (Beta) · Text · Open Response
Problem · Video · Drag and Drop

Text → Text · Announcement · Anonymous User ID · IFrame Tool · Raw HTML · Zooming Image Tool
```

Legend: ✅ covered · 🟡 partial or a decision, not a build · ❌ missing · ⏭️ no learner surface

---

## 1 · Covered — a creator picks it, we have it

| Studio | XBlock | DS |
|---|---|---|
| **Text** | `html` | `LMS / Lesson Block · HTML (Text)` + the 47 text styles |
| **Text → IFrame Tool** | `iframe` | `LMS / Lesson Block · HTML (iframe)` |
| **Video** | `video` | `Lesson Block · Video` · `Video player 16:9` · `Transcript Line` · `Sync to Video Button` · `Note Item` · `Empty State [Transcript]` |
| **Video** *(audio source)* | `video` | `Lesson Block · Video (Audio)` · `Podcast · Player` · `Podcast · Chapter Row` |
| **Problem** — all five simple types | `problem` | `Quiz · Option Row` (single + multi select) · `Quiz · Answer Input` (Dropdown · Numerical · Text) · plus the whole `Quiz ·` family: Question Card, Footer Actions, Results, Gate, Exam Timer, Stat Tile, Stepper Bar, Grade Summary, Entry Header, Inline Alert |
| **Open Response** | `openassessment` | `ORA · Stepper` · `Rubric Criterion` · `Upload` · `Waiting Panel` · `Grade Panel` · `Submit Gate` |
| **Discussion** | `discussion` | `Discussion Prompt` · `Thread Item` · `Empty State [Discussion]` — drawn as a unit-level region, which matches Olive+ where it is a checkbox on the unit, not a stacked block |

---

## 2 · Missing — a creator can pick it and we have nothing

### ✅ Drag and Drop — built 20 Aug 2026
`drag-and-drop-v2`. A first-class, **mobile-ready** problem type sitting in the grid, and our own
`topic-types-inventory.md` §123 already calls it *"highest-return if picked up later"*. Nothing in the DS.

Three components, in `5 · Assessments · Quiz`:

| Component | Variants |
|---|---|
| `LMS / Drag and Drop · Item` | Idle · Dragging · Placed · Correct · Incorrect · Locked |
| `LMS / Drag and Drop · Zone` | Empty · Hover · Filled · Correct · Incorrect |
| `LMS / Drag and Drop · Card` | Unanswered · In progress · Correct · Incorrect · Partially correct · Answer revealed, plus booleans for prompt, item bank, feedback and footer |

**The two modes are the footer, not a variant.** Standard gives feedback on every drop and has **no Submit**
(`Show Primary action = false` on the Footer Actions instance); Assessment keeps the primary, applies attempts
and takes the best one. A Standard board carrying a Submit button promises a grading step that never comes.

**State ownership:** the zone stops drawing chrome the moment it is filled — from then on the item carries the
state and the zone adds only a ring on Correct / Incorrect, so nothing is coloured twice.

**The board background is author-supplied content**, so the component ships a labelled placeholder rather than
a fake diagram, with zones absolutely positioned over it.

**Left undesigned on purpose:** the drag ghost, keyboard placement (the XBlock supports it) and the
screen-reader announcement per drop. Those are interaction spec and need a decision before they are drawn.

### ❌ Zooming Image Tool
In the Text menu of our Studio. The learner clicks a region and it enlarges in an overlay. We have no
lightbox/overlay component anywhere in the DS.

**Worth checking before building:** our own reference tiers this *"Not supported"* from the Open edX docs, yet
it is in the menu. Either the docs lag the release or the template renders something degraded. One question to
Simran settles it — and it decides whether we design the overlay or tell creators not to use it.

### ❌ Table
Not a Studio tile — but tables are **natively authorable inside a Text component**, confirmed in the 19 Aug
session, and a table is the one piece of rich text that genuinely needs design: header row, zebra, alignment,
and above all **what it does at 375px**. `LMS / Lesson Block` has no `HTML (Table)` kind.

---

## 3 · Decisions, not builds

| Studio | Question | Our nearest piece |
|---|---|---|
| **Text → Announcement** | Is this the same surface as our callout, or a distinct banner? | `Lesson Block · HTML (Callout)` · `Inline Alert [Info]` |
| **Library Content (Beta)** · **Problem Bank (Beta)** | Learner-side these render as ordinary problems. The only distinct affordance is *"you were given a different set"* on a retake. Do we say that on the results surface, or say nothing? | `Quiz · Results` · `Quiz · Entry Header` |
| **Legacy Library** | Recommend skipping — legacy, superseded by the two Beta tiles | — |
| **Math Expression Input** | Advanced problem type, mobile ✅. Renders like a text input with a live formula preview. Worth a variant on `Quiz · Answer Input`? | `Quiz · Answer Input [Text]` |

---

## 4 · No learner surface — nothing to design ⏭️

| Studio | Why |
|---|---|
| **Text → Raw HTML** | Same `html` XBlock as Text; it changes the *editor*, not the rendered page. Already covered by `HTML (Text)`. |
| **Text → Anonymous User ID** | Prints an opaque ID for LTI/analytics. No design surface. |

---

## 5 · Anchors — max one per unit, and they own completion

Not part of free stacking, but a creator can pick them, so parity still applies.

| Anchor | DS |
|---|---|
| Problem set (graded subsection) | ✅ the `Quiz ·` family |
| SCORM / Activity | ✅ `LMS / Activity · SCORM Frame [Idle · Loading · Ready · Error]` |
| Open Response | ✅ the `ORA ·` family |
| LTI 1.3 Consumer | ❌ — not in our grid today; on by default from Teak. Watch, do not build. |

---

## 6 · The build list, in order

1. ~~**Drag and Drop**~~ — done 20 Aug. Publish the DS to release it.
2. **`HTML (Table)`** on `LMS / Lesson Block` — cheap, natively authorable, and the responsive behaviour has
   to be decided by someone rather than discovered on a phone.
3. **Zooming Image** — *after* Simran confirms the template actually works in our release.
4. The three decisions in §3, which cost a conversation each and may cost no build at all.

**What this does not change.** Everything a creator can stack today — text, image, callout, file, iframe,
video, audio, knowledge check — already resolves to a `LMS / Lesson Block` kind. The gaps are at the edges of
the grid, not in the middle of it.

---

## 7 · Inside each tile — every sub-type the official docs list

*Researched 20 Aug 2026 against [Guide to Problem Types](https://docs.openedx.org/en/latest/educators/references/course_development/exercise_tools/guide_problem_types.html),
[Guide to Problem Settings](https://docs.openedx.org/en/latest/educators/references/course_development/problem_settings.html),
[Guide to the Drag and Drop Problem](https://docs.openedx.org/en/latest/educators/references/course_development/exercise_tools/guide_drag_and_drop.html)
and [About Text Components](https://docs.openedx.org/en/latest/educators/references/course_development/text_components/text_components.html).
Support tier and mobile-readiness are edX's own columns, not ours.*

### 7.1 · Problem — five simple, three advanced, three dead

| Template | Tier | Mobile | DS |
|---|---|---|---|
| Single Select | Full | ✅ | ✅ `Quiz · Option Row` |
| Multi Select | Full | ✅ | ✅ `Quiz · Option Row` |
| Dropdown | Full | ✅ | ✅ `Quiz · Answer Input [Dropdown]` |
| Numerical Input | Full | ✅ | ✅ `Quiz · Answer Input [Numerical]` |
| Text Input | Full | ✅ | ✅ `Quiz · Answer Input [Text]` |
| **Math Expression Input** | Full | ✅ | ❌ — a text field with a live rendered formula above it |
| Custom JavaScript Display and Grading | Full | ❌ | ❌ — arbitrary author JS, nothing for us to draw |
| Custom Python-Evaluated Input | Provisional | ❌ | ❌ — same |
| Circuit Schematic Builder · Image Mapped Input · Problem with Adaptive Hint | Not supported | ❌ | skip |

**Math Expression Input is the only real gap here**, and it is small: the platform renders the learner's typed
expression as formatted maths above the input as they type. Everything else in the list is either drawn or is
author-supplied code with no design surface.

**The settings every Problem carries** — all learner-visible, all already designed:

| Setting | Learner sees | DS |
|---|---|---|
| Problem Points | point value near the title | ✅ `Show points` |
| Attempts | *You have used N of M attempts* | ✅ `Show attempts` |
| **Time Between Attempts** | a countdown telling them to wait | ✅ `Quiz · Gate [Rate limited]` |
| Show Answer (+ attempts threshold) | the answer, once the condition is met | ✅ `Answer revealed` |
| Show Reset Button | Reset | ✅ `Footer Actions · Show reset` |
| Hints | a Hint button, then sequential hints | ✅ `Show hint` |

### 7.2 · Text — six templates, one learner surface we lack

| Template | What it is | DS |
|---|---|---|
| Text | the visual editor, empty | ✅ `HTML (Text)` |
| **Announcement** | *the same editor with pre-canned instructional text* — a Studio convenience, not a different block | ✅ covered by `HTML (Text)` |
| IFrame Tool | same, pre-canned for embeds | ✅ `HTML (iframe)` |
| Raw HTML | switches the **editor**, not the output | ⏭️ no learner surface |
| **Zooming Image Tool** | mouse over a large image and a region enlarges | ❌ **missing** |
| Anonymous User ID | not a documented template in the current docs | ⏭️ |

**This settles §3's Announcement question: it is not a component.** It is the Text editor pre-filled with
guidance for the author. Nothing renders differently, so nothing needs designing.

**And it settles the Zooming Image contradiction.** The tool is real and documented with its own page — the
*"Not supported"* tier means edX does not maintain it, not that it fails. So the question for Simran narrows:
not *"does it work?"* but *"do we want the content team using an unmaintained tool?"* If yes, we owe it an
overlay component; if no, we tell them not to pick it.

### 7.3 · Drag and Drop — and a correction to what we just built

The two modes differ more than we drew:

| | Standard | Assessment |
|---|---|---|
| Attempts | unlimited | limited or unlimited; **best attempt is the final score** |
| Feedback | **per drop, immediately** | only after Submit |
| A wrong item | **returns to the item bank** | stays in the zone until corrected |
| Success feedback | shown per correct drop | **not used at all** |

**The correction:** our `Zone · State=Incorrect` and the card's `Incorrect` states are **Assessment-mode only**.
In Standard mode a wrong item never rests in a zone — it bounces back to the bank and the learner sees a
transient message. The components are right; the annotation now has to say which mode they belong to.

Two more facts worth carrying: feedback is documented as appearing **above the background image**, not below
the board — worth checking our inline-alert placement against. And **every zone carries a mandatory
description exposed only to screen readers**, which turns our "not designed yet" accessibility note into a
platform requirement with a field behind it.

### 7.4 · Open Response — our stepper is missing two of six steps

The platform supports up to six ordered steps; our `ORA · Stepper` has three.

| Step | DS |
|---|---|
| Your Response — prompt + rich text and/or file upload | ✅ `ORA · Upload` |
| **Learner Training** — grade sample responses against the staff answer before peers | ❌ **missing** |
| Peer Assessment — grade N peers | ✅ |
| **Self Assessment** | ❌ **missing as a step** |
| Staff Assessment — overrides all | ✅ `ORA · Grade Panel [Staff override]` |
| Waiting / Your Grade | ✅ `ORA · Waiting Panel` · `Grade Panel` |

Both gaps are steps, not screens from scratch — the rubric, the criteria and the grade surfaces already exist
and are reused by each step.

### 7.5 · Not in our grid at all

The docs list these as available in Open edX; **our Studio does not offer them**, because this instance has no
*Advanced* dropdown. Recorded so nobody designs for a tile the content team cannot pick:

Poll (Full, ❌ mobile) · Survey (Full, ✅ mobile) · Word Cloud (Provisional) · Conditional Module (Provisional —
gates content on a prior block, and would need a *"do this first"* locked state) · LTI Component (Full) ·
UBC Peer Instruction (Full) · Calculator · External Grader · Google Calendar / Drive · Oppia.

**If the Advanced dropdown is ever switched on** — Teak turns several of these on by default — Survey is the
one to design first: it is Full support, mobile-ready, and a matrix of questions sharing one scale is a real
layout problem.

---

## 8 · Build list — all closed, 20 Aug 2026

| # | Built | Where |
|---|---|---|
| 1 | **Math Expression Input** — `Type=Math` × 3 states | `Quiz · Answer Input`, now 12 variants |
| 2 | **ORA Learner Training + Self Assessment** — 5 segments, 5 step variants, two booleans | `ORA · Stepper` |
| 2b | **`ORA · Training Feedback`** — Matched / Mismatched | new component |
| 3 | **`HTML (Table)`** | `Lesson Block`, now 9 kinds |
| 4 | **`LMS / Zooming Image`** — Idle / Zoomed | new component |
| 5 | **Drag and Drop mode split** annotated | `Drag and Drop · Card` · `Zone` |

**Three decisions taken while building, each written into the component rather than left here.**

**The maths preview is not decoration.** The learner types `x^2 + 2*x + 1` in plain text and the platform
renders it as formatted maths below the field, live. That strip is how they check their expression parsed the
way they meant — and grading is by mathematical equivalence, so two different-looking answers can both be
right.

**The ORA step numbers are placeholders and the component says so.** A course can enable any subset of the six
steps; if training is off, *Review 1 peer* is step 2, not 3. The numbering has to come from the enabled step
list. Staff Assessment gets no segment at all — it overrides the grade rather than being a step the learner
walks through.

**A table scrolls sideways at 375px; it does not restack into cards.** A table exists so columns can be
compared, and stacking destroys the one thing it is for. The block clips and the table scrolls inside it, so
the page never scrolls sideways. Pinning the first column is a build cost — specify it only if a real table
proves unreadable without it.

**And one warning that outranks the build.** `Zooming Image` is **pointer-only** — no documented touch or
keyboard path, so on a phone and for a keyboard user the zoom does not exist. Whatever detail the image
carries needs a second route to it: a caption, a table, or a full-size download. That is on top of edX listing
the tool as unmaintained. Both are in the component's annotation, where whoever picks it will see them.

---

## 9 · Where this lives in the ICP — Aug 21, 2026

Everything above is now a **section a reviewer can open**, next to the Technical section on
`Plaftorm Pages (SkillUp UI) - V8 - WIP`:

**`⚙ ICP — components and assets for topic creation`** — `5497:151413`
([open](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=5497-151413))

| Block | Node | What it holds |
|---|---|---|
| Cover | `5497:151414` | What the section is, and that the support/mobile columns are edX's, not ours |
| The nine tiles | `5497:151417` | Tile → XBlock → what renders it → status, for all nine |
| Inside the Text tile | `5497:151471` | The six templates, with Announcement and Zooming Image settled |
| Built this round | `5497:151510` | **179 live instances** of the published components, in five titled cards |
| Still open | `5497:152464` | The questions and the deliberate gaps, each with whose call it is |

**Live instances, not pictures.** The gallery instantiates the published library components, so it tracks the
DS: republish and accept, and the section updates itself. It also means each specimen opens to its own
annotation in Dev Mode, which is where the mode rules and the accessibility warnings actually live.

**One defect the gallery caught.** Laying the variants side by side exposed
`ORA · Training Feedback · Mismatched` carrying a **duplicated third row** — *You selected · Staff selected ·
Staff selected* — left behind by a plugin timeout during the build. Fixed at source. Nothing else in the
179 instances was wrong; the only other truncations trace to `Input field`, which truncates by design.

**The four reference images stay.** `image 2`–`image 5` in the Technical section are kept deliberately, for
comparison against the frames that replaced them.
