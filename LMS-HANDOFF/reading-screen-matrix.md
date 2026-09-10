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
and 03 collapsed; Module 01 set to *In progress · 0 of 3* (*1 of 3* on the completed screens); the selected row is `What is Six Sigma?`; overall
progress reads *Module 1 of 3*; the footer nav reads *1 of 3 · Next: The cost of poor quality*. Audited clean
across all 16 on eight checks.

**The progress ring reads 0%, arc included.** The percentage is a text node, but the arc is geometry — two
`ELLIPSE` nodes with `arcData`, a full-circle track and a progress sweep starting at 3π/2. The old 67% was
literally `endingAngle − startingAngle = 4.2097 rad` over 2π. Setting the sweep to zero empties the ring, so
the number and the drawing now agree. `arcData` is overridable on an instance child, which is not true of
`layoutMode` or `minWidth` — worth remembering.

The two names differ by breakpoint: desktop wraps it in `ProgressRing`, mobile in `Progress Circle` with the
ellipses named `shape · Overall Progress`. Targeting the arc geometry rather than the node name is what
caught all 16.

**Discovery notes do not ship.** The composition screens were built from the discovery exhibit, which labels
every block with its research annotation — `01 · TEXT / RICH TEXT`, `html XBlock · ~5s visibility completion ·
Learner Notes work only on stock html`, and so on for all seven. Those are notes *about* the design, rendered
inside the learner's page. **15 of them per screen**, now hidden on both `all-blocks` screens; the exhibit at
`5413:113861` keeps them, because there they are the point.

The topic header carried the same problem in a subtler place — title *Lesson Page — every block*, description
*"Reference exhibit… Not a real lesson"* — sitting in slots a learner reads. Replaced with real content
(*Applying Six Sigma in practice*). **The rule this settles: what a screen is for belongs in the handoff card,
never inside the screen.** The card already says "composition reference"; the screen should look like a page.

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

## 7 · One responsive defect, and its real cause

**The mobile header truncation is fixed, and it was not what I said it was.** At 375 the meta line read
*"Reading · approx."* — the duration cut off. I had recorded this as needing the min/max arithmetic used for
the decision CTAs. Wrong diagnosis.

The real cause: **an empty container still reserves its width.** `Header Container` holds the content column
and a `Mark-As-Completed-row`. When `Show Mark-Status-Badge` is off, the row's *contents* disappear but the
row itself stays, hugging **162px**. At 1440 that leaves 914 for the content and nobody notices. At 375 it
leaves **145 of 311** — the meta line loses more than half its space and clips.

Hiding the row wherever the badge is off restores the full 311 and the line renders whole. This also puts the
screens back in line with the rule that the *action* lives only at the bottom; the header slot is for the ✓
status badge, and when there is no badge there should be nothing there at all.

**Worth fixing at source.** The row should collapse with its contents rather than reserve space — otherwise
every narrow surface built from this header inherits the same silent tax.

**Correction on the footer nav.** An earlier note here claimed `Navigation Buttons` has no mobile behaviour.
It does — icon-only previous/next with the position between them, which is the right treatment at 375 and is
Nelson's own. The instances were simply carrying stale content (`4 of 9 · Practice Quiz…`) after the library
update reset their overrides. Content corrected; the structure was never wrong.

---

*Source: topic-types-inventory.md · studio-authoring-parity.md · authoring constraints verified with Simran,
19 Aug 2026.*
