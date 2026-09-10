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

## 6 · One responsive defect, not fixed here

At 375 the topic header meta truncates: **"approx. 8 mi"** instead of *"approx. 8 min read"*. It is inside
`LMS / Topic Header`, so the fix belongs in the DS, not in these screens — and it needs the same min/max
arithmetic used for the decision CTAs rather than a local override. Recorded so it is not lost.

---

*Source: topic-types-inventory.md · studio-authoring-parity.md · authoring constraints verified with Simran,
19 Aug 2026.*
