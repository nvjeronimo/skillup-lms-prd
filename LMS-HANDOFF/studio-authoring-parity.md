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
