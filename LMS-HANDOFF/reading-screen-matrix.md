# Reading — the screen matrix

*Created 9 Sep 2026. Reading is **P0**: 84 topics, **30% of the program**, the most common type in the
catalogue. Until today it had **one** screen — a 1112 content column that had never been placed in a device
shell. Video and Quiz are both APPROVED and each shipped a full scenario grid; this brings Reading to the
same bar.*

**Where it lives:** page `↳ Phase 1 · Reading - Ready for Review 🟠`, frame
`ICP Phase 1 - Reading - Light - Ready for Review` (`5685:170871`).
**16 screens across 5 rows** — 11 desktop · 2 tablet · 3 mobile.

---

## 1 · What Reading actually is

`html` XBlock + Files & Uploads, with manual completion via the Completion tool. **No anchor** — a composed
document of stacked primitives. Same shape as Lab and Lesson Page.

That has one consequence that drives the whole matrix: **the body is author-composed, so its length and
composition are not ours to fix.** Every state below has to survive a one-paragraph page and a 2,600px page
equally.

---

## 2 · The shell

The content column that already existed *is* `Main Content`. What was missing was everything around it:

```
ICP-Reading-<scenario>-desktop            1440 × 1056
├ LMS / Course Player Topbar              1440 × 60
└ body
  ├ Sidebar                                280      one viewport, own scroll
  ├ Main Content                          1112      ← the existing Reading page
  └ LMS / AI Panel                         360      collapsed by default
```

Tablet: 960 viewport, sidebar holds at 280, content takes 632.
Mobile: 375 viewport, **no sidebar** — the outline moves behind the menu; content 343.

**The outline had to be re-pointed too.** Cloning the Video shell brings its *selection* with it: the
highlighted row read `Introduction to the DMAIC methodology · Video · 3m 20s` on every Reading screen, and
the footer nav carried the same title. Now `What is Six Sigma? · Reading · 8 min` across all 16. A sidebar
that names a different topic than the page is the kind of error a reviewer trusts rather than questions.

**One bug found and fixed while assembling.** `Main Content` was inherited with
`primaryAxisAlignItems: CENTER`. With content taller than the viewport that centres the overflow and clips
*both* ends — on tablet it silently ate the topic header and the tab bar. Set to `MIN` with `clipsContent`.
Worth knowing because every future type cloned from the Video shell inherits the same default.

### The three fixed regions

Nothing in a topic page scrolls the whole window. Three regions are pinned to the viewport and each scrolls
on its own:

| Region | Height | Behaviour |
|---|---|---|
| Topbar | 60 desktop · 56 mobile | fixed |
| Sidebar | **964** = 1056 − 60 topbar − 32 padding | one viewport, own scroll |
| Content column | 902 = 964 − 62 nav | scrolls |
| **Navigation buttons** | 62 | **pinned to the bottom of the content column** |

**The nav was floating.** Before this pass it was simply the last child in a hugging column, so it landed
wherever the article ended: **y 456** on `minimal-desktop` — halfway up an empty page — and **y 2580** on
`all-blocks-desktop`, far below the fold. Now `Main Content` is fixed-height with `content` set to FILL and
clipping, so the nav sits at 902 → 964 on every desktop and tablet screen regardless of article length.

Mobile needed a structural change rather than a resize: everything lived in one column, so a 1308px body
pushed the nav out of the frame entirely. The scrolling children are now wrapped in a `scroll-area` that
fills, with the nav as a sibling below it.

---

## 3 · The 16 screens

| Row | Screen | What it settles |
|---|---|---|
| **1 · Article** | desktop · tablet · mobile | The default read at all three widths |
| **2 · Downloads** | desktop · tablet · mobile | The second tab, with the file list |
| **3 · Completion** | not completed · completed · review · completed-mobile | The manual-completion loop |
| **4 · Long-form** | desktop · mobile | Every stackable primitive in one page, and the sidebar at full page length |
| **5 · Edge cases** | downloads empty · no author · minimal content · no Downloads tab | The four states that are normal, not failures |

---

## 4 · The rules the screens encode

**Completion is manual, and the action sits only at the bottom.** A top CTA invites the learner to mark a
page complete before reading it. Once complete, the ✓ badge appears in **both** header and footer — there it
is status, not an action. `Show Mark-Status-Badge` is false until completion, true after.

**`Topic-Status-Badge` ships a third state nobody has specified.** Alongside `Mark as Complete` and
`Completed` there is **`Review`**. It is drawn (Row 3.3) because the DS has it, but *when* a Reading enters
review is not defined anywhere. Either it earns a rule or it should come out of the component.

**Attachments are optional, so an empty Downloads tab is a normal state.** Row 5 draws it with
`LMS / Empty State · Kind=Downloads` and the count at 0. It must not read as an error.

**The count on the tab must match the list.** The canonical page shipped with a count of 2 over a list of 4;
corrected to 4. Trivial to get wrong, and it is the first thing a reader checks.

**When there is no author, the row and its divider both go.** There is no API field guaranteeing an author —
this is the same gap the Technical section flags for the mentor. An empty author row is worse than none.

**A table scrolls sideways inside its block; it never restacks.** Carried over from the HTML (Text) work.

---

## 5 · What the screens deliberately leave open

**Does the tab bar render when a Reading has no attachments at all?** Row 5.4 draws the single-tab case, but
a bar with one tab is arguably no bar. This is a product call, not a drawing one, and it is the only screen
in the set that is a question rather than an answer.

**"Locked" is not drawn.** The API returns a boolean with no date and no rule behind it — the same finding as
the unlock tooltip in the Technical section. The sidebar already shows locked topics; whether a locked topic
*page* is even reachable is unanswered, so inventing one would have been guessing.

**Empty-state copy says "lesson" and mentions a mentor.** *"No downloads for this lesson … Your mentor can
help in the meantime."* Reading is not a lesson, and the mentor has no field behind it. Copy fix, but it
touches the open mentor question, so it is flagged rather than silently rewritten.

**No story mapping.** Video's header cites P1-10 → P1-31. Reading has no user stories written yet, and the
header says so rather than inventing a range.

---

## 6 · Two blockers that belong to the DS, not to these screens

**RESOLVED 10 Sep — `Module Open` built.** `LMS / Sidebar-ICP` (`19975:536883`) now carries three booleans:
`Show Module 01 topics` · `Show Module 02 topics` · `Show Module 03 topics`, applied to the `Expanded` and
`Mobile` variants. Each module has its own topic list; the boolean shows it, and the nested Module Header's
own `State` draws the chevron — **both must be set**, and they are separate on purpose, since a header can be
expanded on a module whose topics have not loaded.

Defaults are **03 on, 01 and 02 off** — exactly what every screen built before this expects. Both variants
came back at their original heights (1062 and 954) and render identically, so the 680 Ready-for-Dev screens
are untouched. Verified on a throwaway instance before the test was deleted.

Booleans rather than a variant axis: `State` already has five options, so a `Module Open` axis would have
produced fifteen variants, most of them meaningless — the Collapsed rails have no outline at all.

Module 01 and 02 now ship demo content (`Foundations` and `Lean thinking`, three topics each, all Completed).
It is placeholder — rename freely; the structure is the deliverable.

**Applied to all 16 screens, 10 Sep.** `Show Module 01 topics` on, 02 and 03 off; Module Header 01 expanded
and 03 collapsed; Module 01 set to *In progress · 1 of 3*; the selected row is `What is Six Sigma?`; overall
progress reads *Module 1 of 3*; the footer nav reads *1 of 3 · Next: The cost of poor quality*. Audited clean
across all 16 on eight checks.

**One loose end, left visible rather than faked.** The Overall Progress ring still draws **67%** while the
label now reads *Module 1 of 3*. The percentage is a text node but the arc is geometry inside
`LMS / Progress Circle`, so changing the number alone would put the two out of step. Either the component
gains a way to set the arc, or the demo course settles on one story and both follow it.

**Overrides survive a restructure, and can lie.** After the component changed shape, several screens still
showed `The measure phase` in Module 01's third row — a local override from the old flat list, mapped onto
the new node and covering the DS content underneath. Setting the text explicitly beat resetting overrides,
which would have wiped the selection state too. Worth expecting on any future component restructure.

**The original problem, for the record.** `LMS / Sidebar-ICP` is authored with modules 01 and 02 collapsed and
**03 expanded**, and the topic rows are simply the nodes that follow the third header. Figma does not allow
reordering children inside an instance, so no override can move the rows under Module 01 — swapping the
expand/collapse properties alone would leave the topics reading as if they belonged to a collapsed Module 03.

It was never a one-off: **every content type's demo topic sits in a different module.** Video's lives in
Module 03, which is why the component was authored that way; Reading's belongs to Module 01, per the article's
own first sentence. The same request would have arrived for Lab, Podcast and VILT.

**`LMS / Module Info` has no "not started" state.** Only `Module In progress` and `Module Completed`. So an
outline cannot express a module the learner has not opened yet, which is why the demo course reads as
01 ✓ · 02 ✓ · 03 in progress and cannot read any other way.

---

## 7 · Two responsive defects, not fixed here

At 375 the topic header meta truncates: **"approx. 8 mi"** instead of *"approx. 8 min read"*. It is inside
`LMS / Topic Header`, so the fix belongs in the DS, not in these screens — and it needs the same min/max
arithmetic used for the decision CTAs rather than a local override. Recorded so it is not lost.

**`Navigation Buttons` has no mobile behaviour.** Its three children are all `Fill`, so at 343 they split
equally into 93px each and the centre block collides with both buttons — the same equal-split finding as the
decision CTAs, where `Fill` divides free space evenly and only min/max can bias it. Worked around here by
hiding the centre `Info Container` at 375, which costs nothing because the header already carries the topic
title. The component still needs the min-width rule.

---

*Source: topic-types-inventory.md · studio-authoring-parity.md · authoring constraints verified with Simran,
19 Aug 2026.*
