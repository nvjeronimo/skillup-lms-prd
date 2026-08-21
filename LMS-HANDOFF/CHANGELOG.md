# Handoff Package Changelog

Current version. For previous releases see `history/CHANGELOG-archive.md` (v1.0 → v1.7).

## 2026-08-21 · What one HTML (Text) block can actually hold

Block `5507:152743` in the ICP section — a composed specimen, the list patterns on their own, inline
emphasis and links, and an element-by-element table of how each is authored and where it stops. From the
19 Aug session with Simran and Navdeep.

**The parity table said “Text → covered”, which was true in the wrong way.** It told a reviewer a component
exists and told a content creator nothing about what goes inside it. Bullets, numbered lists, nesting, links
and inline emphasis had never been drawn, so every one of them would have been invented at build time.

**One block holds all of it.** The first specimen is a single composed 592-wide Text component, not a row of
parts, because a creator does not stack a block per bullet — and a design that implies they should sends the
content team into a much slower way of working than the platform needs.

**The bullet is drawn, not typed.** `•` in Montserrat at 16px renders as a low mid-dot that reads as
punctuation. A browser rendering `list-style: disc` does not look like that, so the marker is a 6px ellipse.
Text indents 36px, the disc sits 9px down on the optical centre of a 24px line, level two indents 28px more
and goes hollow.

**No captions on images, still.** The insert dialog offers dimensions and alt text and nothing else, so a
captioned figure needs hand-written `<figure>` / `<figcaption>` against the `/static/` path. Any template we
ship with captioned figures ships with a copy-paste snippet, or it does not ship.

**Deliberately not drawn:** blockquote, horizontal rule, code blocks, alignment. TinyMCE offers some by
default; none was confirmed in our Studio on 19 Aug, and the whole point of this block is that it was checked.

## 2026-08-21 · The authoring inventory becomes a section a reviewer can open

`⚙ ICP — components and assets for topic creation` — `5497:151413`, next to the Technical section on
`Plaftorm Pages (SkillUp UI) - V8 - WIP`. Five blocks: the nine Studio tiles and what renders each, the six
Text templates, **177 live instances** of the published components grouped into five titled cards, and a
closing table of what is still open with whose call it is.

**Live instances, not screenshots.** The gallery instantiates the library, so republishing the DS updates the
section, and each specimen opens to its own annotation in Dev Mode — which is where the Drag and Drop mode
rules and the Zooming Image accessibility warnings actually live. A picture would have stranded both.

**Laying the variants side by side found a bug, then retired the component.** `ORA · Training Feedback`
was carrying a duplicated third row from a plugin timeout; the fix was overtaken within the hour. On our
platform that matched/mismatched readout is a **Dev-mode surface for internal testing** — a learner never
sees it. Deleted from the DS and from the gallery. It had been designed on the edX docs, which describe
Learner Training as a learner step, and the gallery is what made the mismatch visible: a component sitting
in the content team's kit, labelled as a learner feature, that no learner would ever meet.

**One consequence left open.** `ORA · Stepper` still carries a `Training` segment and a `Show training`
boolean from the same docs paragraph. If the step is equally dev-only, the stepper drops to four segments.
Left standing — that is a different question, and not ours to answer.

Nothing else in the **177 instances** is wrong.

**The four reference images stay** in the Technical section, kept for comparison against the frames that
replaced them.

## 2026-08-20 · The four gaps the doc sweep found, all closed

| Built | Result |
|---|---|
| `Quiz · Answer Input` | `Type=Math` added — 12 variants |
| `ORA · Stepper` | 5 segments, 5 step variants, `Show training` / `Show self` |
| ~~`ORA · Training Feedback`~~ | new — Matched / Mismatched · **retired 21 Aug, Dev-mode only** |
| `Lesson Block` | `HTML (Table)` — 9 kinds |
| `LMS / Zooming Image` | new — Idle / Zoomed |

**The maths preview is the component, not a flourish.** The learner types `x^2 + 2*x + 1` as plain text and
the platform renders it as formatted maths below the field as they type. That strip is how they verify the
expression parsed the way they meant — and since grading is by mathematical equivalence, two answers that look
nothing alike can both be correct.

**The ORA step numbers are placeholders, and the component says so in its description.** A course enables any
subset of the six steps; with training off, *Review 1 peer* is step 2, not 3. A static component cannot
renumber itself, so the rule is written where someone will read it: derive the numbering from the enabled
steps. Staff Assessment deliberately has no segment — it overrides the grade rather than being a step the
learner walks through.

**A table scrolls sideways at 375px rather than restacking into cards.** A table exists so columns can be
compared; stacking destroys the only reason to use one. The block clips and the table scrolls within it, so
the page itself never scrolls sideways. Pinning the first column is a build cost, specified only if a real
table proves unreadable without it.

**And a warning that matters more than the component it is attached to.** `Zooming Image` is **pointer-only** —
no documented touch or keyboard path, so on a phone and for a keyboard user the zoom is simply absent. Any
detail the image carries needs a second route: a caption, a table, or a full-size download. That sits on top
of edX listing the tool as unmaintained. Both are in the annotation, where whoever reaches for it will see
them before they commit.

**Two build notes.** `combineAsVariants` re-derived the variant property from the component names and produced
`Property 1` / `Property 2` on the Training Feedback set — renaming the variants back to `State=…` restored it.
And the plugin bridge resolves nodes in the **active** file, so screenshots of the DS only work while the DS
tab is in front; every component here was checked visually before being called done, and three defects were
caught that way — a half-built table row, a missing feedback row, and a step numbered 3 in position 5.

**Post-publish validation.** All eight components verified in the DS: correct variant counts, **0 raw paints**,
**0 unstyled text** — six unstyled nodes were found and fixed during the sweep, five of them in the
`HTML (iframe)` kind's source bar, which predated today and had been published that way.

**After the ICP accepted the update:** ORA Stepper 9 of 9 instances on the five-segment set, Lesson Block 11 of
11 on the nine-kind set, **0 broken**.

**And the check found something the update could never have fixed.** Only 3 of 12 `Answer Input` instances
moved to the new twelve-variant set. The other **nine are bound to a retired key** —
`af1bec9f…` against the live `f0baa477…` — a previous published version of the same component, from before it
was rebuilt into `Quiz — DS components (adopted)`. Figma keeps a retired component resolvable, so they are not
broken and never will be; they are simply detached from the component that is maintained, and no future
publish will reach them.

All nine sit in one place — `03 · Every state — single & multi select › board › C · Other answer types`. The
three that did update are on the mode B board. Swapping the nine restores them to the live component; it is
offered rather than done, because a swap can drop instance overrides and that board is Ready for Review.

## 2026-08-20 · What is inside each Studio tile, read off the official docs

The nine tiles were the wrong unit of measurement. A creator does not pick "Problem" — they pick *Numerical
Input*, or *Math Expression Input*, and those are different design problems. So every tile was opened against
the Open edX reference docs and its sub-types listed with edX's own support tier and mobile column.

**What it found, in order of consequence.**

**The Drag and Drop we shipped this morning is Assessment-mode only in two of its states.** The docs are
explicit: in Standard mode a wrong item **returns to the item bank** — it never rests in a zone. So
`Zone · Incorrect` and the card's `Incorrect` / `Partially correct` draw something the platform does not
render in that mode. The components are right; they were under-labelled. Annotation and description corrected.
Two more facts came with it: feedback is documented as appearing **above the background image**, and every
zone carries a **mandatory screen-reader description** — which promotes our "not designed yet" accessibility
note to a field with a requirement behind it.

**Our ORA stepper has three of the platform's six steps.** *Learner Training* (grade samples against the staff
answer before peers) and *Self Assessment* are both missing. Neither is a screen from scratch — the rubric and
grade surfaces already exist and each step reuses them.

**Math Expression Input is the only missing Problem type that matters.** Full support, mobile-ready, and it is
one variant on `Quiz · Answer Input`: a text field with the typed expression rendered as formatted maths above
it. The rest of the advanced list is author-supplied JavaScript or Python — no design surface — or in edX's
own "not supported" tier.

**Two open questions closed without any work.**

*Announcement* is not a component. It is the Text editor pre-filled with instructional text for the author;
nothing renders differently. And *Zooming Image* is real and documented with its own page — the "not
supported" tier means edX does not maintain it, not that it fails. That reframes the question for Simran from
*does it work* to *do we want the content team depending on an unmaintained tool*.

**And a boundary worth recording:** Poll, Survey, Word Cloud, Conditional Module, LTI and Peer Instruction all
exist in Open edX and **none appear in our grid** — this instance has no Advanced dropdown. Written down so
nobody designs for a tile the content team cannot pick. If it is ever switched on, Survey is the one to design
first: Full support, mobile-ready, and a matrix of questions sharing one scale is a real layout problem.

## 2026-08-21 · Mentorship Q&A is a chat

The tab is settled, and it is decision 007 drawn rather than a new choice: 007 is accepted and says mentoring
is unlimited 1:1 asynchronous messaging, one mentor per learner, explicitly not group threads. The A/B
comparison is replaced by the thing itself — a conversation list and the conversation inside it.

Two components: `Thread row` (Unread · Read · Selected) and `Message` (From=Mentor · From=Learner).

**Why a list, when 007 gives one mentor per learner.** One mentor does not mean one conversation. Threading is
what keeps a question answerable — a single scrolling chat buries the answer to *"what subgroup size?"* under
three weeks of later messages. The list is the **Q&A** half of the tab's name, and the reason this is not just
the mentor card with a text box under it.

**Every field on the screen is ✗, and the annotations say so ten times.** Thread subject, preview, age, message
count, unread state; message author, body, timestamp, ordering; the composer and any attachment route — none
of it exists. The workbook documents two forum endpoints and both are instructor role-management. Two lines are
◑ rather than ✗, and both come from the business rules rather than an API: *"typically responds within 1 day"*
is BR-19, a promise we make; the fair-use nudge past 10 unanswered messages is BR-20, and is the only rule in
the tab that is already specified.

**The platform disagrees with the tab's name.** `tabs[]` returns `tab_id: discussion` — that entry points at
edX's forum. If this tab becomes a chat, the entry is repurposed or replaced, which is a platform decision.

**Two things the async ruling forbids:** presence, and a typing indicator. 007 chose asynchronous because the
friction it removes is calendar coordination. Anything implying the mentor is there right now contradicts the
decision and sets an expectation the one-day SLA does not back.

Open question 5 changed shape rather than closing. It was *"is Q&A a forum or 1:1?"* — that is answered. It is
now **"who builds the mentor messaging service?"**, owned by Engineering and Product, because the design is
settled and nothing implements it.

Section total: **77 annotations across 53 elements.**

## 2026-08-21 · The open questions get a board, and a sixth one

`Open questions — who owns each, and what closes it` (`5504:5594`), under the legend in the technical section.
The legend had been listing five questions as one-liners, which is enough to remember them and not enough to
act on any of them.

Each now carries three lines: **why it is open**, **what closes it**, and **what it blocks**, with an owner
against the question itself. "Open" on its own does not tell you who to call — that was the whole problem with
the list.

| # | Question | Owner |
|---|---|---|
| 1 | Who supplies the mentor? | Product · SkillUp platform |
| 2 | Who authors `effort_time`? | Content team |
| 3 | Does the unlock tooltip stay? | Design · Product |
| 4 | Dates: tab, or the sidebar widget? | Product |
| 5 | Is Mentorship Q&A a forum, or 1:1? | Product — not design |
| 6 | Do we derive the topic type, and what happens to the title prefixes? | Product · Content |

**Six is new**, and it exists because of the dev-environment session. The topic type *is* derivable from
Blocks v2 at the cost of one extra call — that part is good news, and it closes a finding that has been open
since `blocks.{id}.icon` turned out to be unusable. But it collapses twelve ICP types into five, and the
authors are already compensating by writing the type into `display_name`: a real title in the dev course is
*"Video: Podcast: Job Roles, Career Path and Growth"*. Derive the badge without deciding what happens to those
prefixes and every row states its type twice — the exact duplication the verb ruling had just removed.

Two of the six changed character this week rather than being new. **4** and **5** used to be flagged in prose;
both now have a page showing the options, so the board points at a drawing rather than at a paragraph.

## 2026-08-21 · The annotations are about edX, not about our components

A scope correction, and it removes work rather than adding it. Every annotation on these pages should answer
one of two questions — **does the platform do this**, and **can we get the data**. They are about our design
against edX. Which component we built something from is design-system housekeeping and belongs in the
component description, not on a page a stakeholder reads.

**Six annotations removed** across the mirrored pages: *"should be an instance of the library `Input field`"*
— which was also stale, since the swap happened days ago — and the mentor card's *"inverted by pinning the
variant to `Dark mode SKO`"*.

**Two were rewritten to keep the rule and drop the housekeeping.** The course-ended alert said *"Library
`Alert`, Code Connected to `InlineAlert.tsx`. The course-ended tone must have `X close button` off…"*. It now
says: **a warning about a permanent condition must not be dismissible** — `has_ended: true` does not turn back,
and a close button removes information the learner cannot get back. Same rule, no library. The Progress tab's
passing-grade notice got the same treatment, and split into the two facts it was carrying: the threshold
rewrites itself from `grade_range`, and the notice must not be dismissible.

**One was reclassified rather than cut.** The lock tooltip's note that the lock *must be a focusable control,
because a hover-only tooltip does not exist for keyboard or touch*, was sitting under Interaction. That is an
accessibility requirement and a functional one — it moved to Accessibility, which is now the only annotation
in that category and correctly so.

Section total: **71 annotations across 50 elements** — Development 45, Content 14, Interaction 11,
Accessibility 1. The scope rule is now written into the legend itself, so the next person adding a note has
the test in front of them.

The distinction matters because of who reads this. A stakeholder deciding whether a tab ships does not care
which library the alert came from. They care that the warning cannot be dismissed.

## 2026-08-21 · The Progress page brought up to density

`⚙ TECHNICAL · Progress tab` goes from **17 annotations across 11 elements to 27 across 19**. The section
total is now **64 across 41**. What was missing was the detail level the Course tab already had: the tables
were annotated as blocks, not row by row, so the things a developer actually asks about were not on the page.

Added: the slim hero and why the chips are hidden; the search control; the grade-summary header and which two
of its four columns are **derived** rather than fetched; the free-text hazard on `assignment_policies[].type`,
with the real payload's `"Final Quiz "` trailing space; the total row equalling `course_grade.percent` and the
warning not to recompute it independently; the section and subsection rows with their `jump_to` url and the
**four gates** that decide whether a score is shown; and why the sidebar carries Certificate and Weekly goal
where the platform puts a Related links card pointing at its own tab bar.

**The session's findings were folded into the two cards**, which is where they will actually be read:

- **`disable_progress_graph` can switch the completion card off** — a per-course config flag verified on the
  live payload. The card needs a suppressed state. A design that assumes a component the course can disable is
  a design that breaks on some courses and nobody knows why.
- **`user_has_passing_grade` is a top-level boolean** alongside `course_grade.is_passing`. Both answer the same
  question. Decide which the build trusts before they disagree.

The legend was recounted off the file and its footer corrected — it still claimed un-annotated twins live in
the main section, which stopped being true when v12 took the annotations and the Progress v1 frame was deleted.

## 2026-08-21 · The annotations go back on the working screen

`★ ENTRY · Course Detail — v12` now carries the same **37 annotations across 22 elements** as the technical
page. Nothing had been deleted — the counts on `⚙ TECHNICAL · Course tab` were intact the whole time — but
moving the annotated twin into its own section left the screen people actually work on looking bare, which is
the same thing from where the user was standing.

**The original reasoning was wrong and it is worth naming why.** v12 was left unannotated so there would be
"the same page without the engineering, for when the conversation is about the design rather than the data".
But **Dev Mode annotations do not render in Design mode**. The clean view never needed a second copy to buy it
— you get it by not being in Dev Mode. We paid a real cost for a benefit that did not exist.

Copied node-by-node: 28 matched on structural path, and five needed a second pass on name and content because
the two trees have diverged — v12's module rows sit directly under `Container:margin` where the technical page
has an extra `Container`. One of those five landed on the wrong node first (the verb-rule note went to the hero
container at y=0 instead of the expanded module at y≈848) and was moved. Worth recording as a method: after a
name-only match, **compare the two annotation orders by y-position** — the mismatch is visible instantly and
invisible any other way.

⚠︎ **Two copies now exist and Figma cannot keep them in step.** Annotate the technical page when they diverge
and re-copy; do not maintain both by hand.

**The section is now a comparison.** Under each of our screens sits a screenshot of the platform as it is
today — ours above, theirs below. That changes what the section is for: not "here is the annotated design" but
"here is what changes, here is the field behind each change, and here is what you have today".

`Course Detail — Progress tab · v1` was deleted; the annotated `⚙ TECHNICAL · Progress tab` is the only copy
and carries the design as well as the notes.

**Confirmed again: the `Instructor` tab is staff-only.** It appears in `tabs[]` only for users holding the
role, which is why it shows in a screenshot taken as Staff and never will for a learner. Nothing on it is ours
to design.

## 2026-08-21 · The topic type is derivable, and five fields we had never seen

Ran the dev-environment verifications with a session, against the real course from the live Progress
screenshot. Six results, written up as §12.5.

**The topic type can be derived.** `block_counts` comes back on all 84 blocks, and **26 of 27 verticals
resolve to a single child type** — the one exception being the Final Project, which is `html` +
`openassessment`, genuinely two things. One extra call to Blocks API v2 buys the badge. That question had been
open since `blocks.{id}.icon` turned out to return only `null` and `"other"`.

**But it collapses twelve ICP types into five.** The whole course uses `html`, `problem`, `video`, `scorm` and
`openassessment`. A derived badge can say Reading / Video / Quiz / Interactive / Peer-graded honestly. It
cannot say *Podcast*, and it cannot tell a Lab from an Activity.

The authors already know. A real title in this course is **"Video: Podcast: Job Roles, Career Path and
Growth"** — they are writing the type into `display_name` because the platform has nowhere else to put it.
Deriving the badge without deciding what happens to those prefixes gives every row its type twice, which is
the duplication we just spent a day removing.

**Bookmarks is real** — 200, paginated, zero rows for this user. The Course tools card has a source. ✓

**`jump_to` is verified with a vertical id** — it resolves to `{sequential}/{vertical}` in the MFE, finding the
parent itself. The ⚠︎ on constructing topic deep-links becomes a ✓.

**Dates returns two blocks on a real course too** — start and end, nothing else. §14.2 was read off the
workbook; this confirms it live.

**And the live Progress payload carries five fields the workbook sample does not**, one of which changes a
design: **`disable_progress_graph`**. It is a config flag that hides the completion graph, so the Completion
card needs a state for a component the course can switch off. Also `user_has_passing_grade` (a direct boolean,
where we had been deriving from `is_passing`), `verification_data`, `studio_url` and `username` — the last two
confirming the response is role-dependent.

**The chain closes.** `complete_count: 1 / incomplete_count: 26` → the live page's **4%**;
`course_grade.percent: 0.15` → **15%**; `grade_range {Pass: 0.7}` → **70%**; Final Exam 0.5 / Final Project 0.5
→ the **50/50** table; 2 graded subsections of 14 → **one module, two lessons** in Detailed grades.

Which caught a defect in our own screen. The completion card read *"38 complete · 4 incomplete"* next to
**38%** — that is 90%. It now reads `16 complete · 26 incomplete · 0 locked`: 42 topics, matching the Course
tab, and 16/42 = 38%. A card whose own two numbers disagree is worse than one with no numbers, and nobody had
noticed because nobody had done the division.

## 2026-08-21 · The technical pages get their own section

`⚙ TECHNICAL · Progress tab` (`5490:4793`) — the Progress tab annotated the same way the Course tab was:
17 annotations across 11 elements, in three of the four categories.

What it puts in front of a stakeholder that the design page cannot: completion and grade are **two different
numbers** and the card copy has to say so; **70% is `grading_policy.grade_range`**, not a sentence someone
wrote; `subsections[].url` is a working `jump_to` link, **unlike the syllabus**, where the Navigation API
returns null on every vertical; **four separate gates** decide whether a score is shown, so a row can be
present with its score withheld; and the meter's geometry is **drawn, not data** — the one note that stops a
developer measuring the artboard and shipping the sample's 15% as a constant.

**Both annotated pages moved into a new section** — `⚙ Technical — every element, its field, and whether we
can build it` (`5490:15278`) — together with the legend. Two reasons: the design pages stopped being read
through engineering notes, and there is now more than one technical page, so "the technical page" had stopped
being a thing you could point at.

The frames lost their long names in the move: `⚙ TECHNICAL · Course tab`, `⚙ TECHNICAL · Progress tab`,
`How to read this section`. The section title carries the explanation now, so the frames do not have to.

**The legend was rewritten for two pages, and the counts were read off the file rather than remembered** —
54 annotations across 33 elements, Development 32, Content 12, Interaction 9, Accessibility 1. Its closing
list went from three questions to five: the Dates ruling and the Mentorship Q&A contradiction both belong in
front of the same room as the mentor and `effort_time` questions.

One small thing worth recording: **the ⚙ glyph does not render in Montserrat** and had to come out of the
legend's canvas text. It survives in layer and section names, which Figma draws in its own UI font. Same
family of failure as ✅, already in `figma-api-traps.md`.

## 2026-08-21 · The other four tabs, and the one we cannot draw

The page had five tabs and one of them was designed. Mapping the other four turned out to need no new
research: the payloads for **Progress** and **Dates** were in the workbook all along, on the *API Information*
sheet, as APIs 4 and 5. Written up as §14.

**Progress is built** (`5482:4574`), from four new components — `Completion card`, `Grade meter`,
`Grade summary row`, `Score row`. The numbers are the workbook's own sample, so the table can be checked
against the payload instead of admired. The live page was the reference and confirmed the mapping: completion
and grade are two different numbers in two separate cards, the 70% threshold is `grading_policy.grade_range`
rather than copy, and *Detailed grades* lists only graded sections — which is why its footnote pointing
elsewhere for everything ungraded is load-bearing.

Five places we did not copy the platform: the live tab has **no hero at all**, so nothing on it names the
course you are in; its **Related links** card offers two destinations already in the tab bar above it; it
reports `locked_count` and renders only two of the three counts; its passing-grade notice is **dismissible**;
and its sidebar carries links where ours carries Certificate and Weekly goal — the two cards that answer the
questions this tab raises.

**Dates is a whole tab for two rows.** `course_date_blocks[]` is a well-formed timeline with links and a
complete flag, and on our courses it returns `course-start-date` and `course-end-date` and nothing else,
because `due` is null on every block. A dedicated tab reading *"Course starts"* and *"Course ends"* will be
read as broken. That forces the ruling flagged back in §5 — sidebar widget or tab — and the honest default is
to keep the widget and not render the tab until content authors set due dates.

**Mentorship Q&A cannot be drawn, and not for want of an API.** `tabs[]` returns `tab_id: discussion` titled
*Mentorship Q&A*: the platform's **discussion forum**, renamed. Decision 007 is accepted and says mentoring is
unlimited **1:1 asynchronous messaging**, explicitly not group threads. A forum is many-to-many by
construction. So the tab is not the mentoring the product decided to build, and *Message David* on the mentor
card has no 1:1 endpoint behind it.

Drawing threads now would be guessing which side wins. Either mentoring is the forum and 007 needs revisiting,
or it is 1:1 and needs a SkillUp-side service no Course Home API provides. That is a product decision, so the
tab stays undrawn and the question goes back to the room.

**Live, Recordings and Instructor** are specified in §14.4 and §14.5 — the first two real and out of MVP by
Harpreet's ruling, the third fifty endpoints of staff administration a learner never sees.

## 2026-08-20 · The verb goes, and the tooltip was in the library too

**The verb prefix is retired from every topic type.** Titles now render `display_name` verbatim — *DMAIC
fundamentals*, not *Checkpoint · DMAIC fundamentals*. The rule that kept it on consequential types justified
itself with "the icon already says how you consume them"; the type is now a labelled badge, and that same
sentence removes the verb everywhere. Four titles changed across the two screens.

The three-way comparison on the components page keeps all three options and now records which was taken —
board 2, chosen. Its old objection (*"but look at row 6"* — a checkpoint that stops announcing itself) is
answered by the badge, which states the type once in the place where every row states it.

**It also removes a dependency nobody could have satisfied.** A verb prefix is not a field. Something would
have had to derive `Checkpoint ·` from a type the outline does not send — `blocks.{id}.icon` is four documented
values against twelve catalogued types, and returns only `null` and `"other"` in practice. Rendering the field
as-is needs nothing.

**`Tooltip` adopted from the library** — fifth adoption on this page, after `Breadcrumbs`, `Badge`,
`Horizontal tabs` and `Input field`. Ours was a hand-drawn dark pill with a hand-drawn caret; the library ships
`Text`, `Supporting text` and a seven-position `Arrow` axis. Taken as `Supporting text=False, Arrow=Top center`
and anchored under the locked module row in both screens.

**The functionality is now documented on the technical page**, which was the point of adopting it rather than
just swapping it. What the tooltip does: hover or focus the lock, get why the module is closed and when it
opens; dismiss on blur. What that requires: the lock must be a **focusable control**, because a tooltip that
only appears on hover does not exist for keyboard or touch. What the API gives: `accessible: false`, a boolean,
and nothing else.

So *Unlocks 28 Apr 2026* is drawn copy with no field behind it. Three ways out, in order of cost — drop the
date and say only that the module is locked; derive it from course `start` plus a pacing rule the content team
owns; or add a field to the outline, which is a platform change. **Until one is chosen, build it without the
date.** The boolean supports "Locked". It does not support "Unlocks 28 Apr".

## 2026-08-20 · One scale for both rows, and a rule that now argues against itself

**Padding and gaps bound to the spacing scale.** `Module row` (all six variants) and `Topic row` (both) now
take every padding and gap from `Spacing/*` instead of raw numbers — `lg` (12) for the row insets, `lg` for the
module's gap, `md` (8) for the topic's, `none` for the topic's horizontal padding, `xxs` (2) for the module's
title/meta gap. No value changed, so nothing moved on screen; what changed is that they can no longer drift
apart silently.

`Topic row` also gets a bound `minHeight` of `6xl` (48), which is exactly its natural height — a real floor.
**`Module row` deliberately has none.** Its 68px is derived (12 + 24 + 2 + 18 + 12) and is not a step on the
scale; the nearest step below is 64, and a floor at 64 would never engage. A constraint that can never bind is
a claim the file makes and does not keep, so it is better absent. Heights built from tokenised parts do not
themselves need to be tokens.

**The 24 examples on the components page were all still `Reading`.** Seventeen corrected. They sit on four
boards, three of which are the verb-prefix comparison — the boards whose entire subject is how a topic's type
gets communicated. Arguing that question with every badge showing the same wrong word was worse than useless.

### And now the verb rule argues against itself

With the badges correct, the three boards say something they could not say before. The rule we closed reads:

> The verb stays where the type is *consequential* — Quiz produces a grade, counts attempts, has a deadline.
> Descriptive types drop it; **the icon already says how you consume them.**

That justification was written when the type was an *icon*. It is now a **labelled badge**. Applied
consistently, the same sentence removes the verb from the consequential types too: *Checkpoint · DMAIC
fundamentals* next to a badge reading **Quiz** is the identical duplication we rejected in *Read · Introduction
to the DMAIC methodology* next to **Reading**.

Board 2 — bare titles, as the API returns them — is now the only one of the three that does not say the type
twice. That is a decision for the room, not a change to make quietly, so nothing was changed. But the board
now makes the argument on its own, which is what it was built for.

## 2026-08-20 · The open module looked exactly like the closed ones

`Module row` gains an `Expanded` axis — six variants now, `State` (Complete / Incomplete / Locked) crossed with
`Expanded` (False / True). Disclosure and progress are orthogonal, so they are two axes, not one.

**The defect this exposed.** Module 3 has been drawn open since v10, and its row was pixel-identical to the
closed ones: same chevron, same rotation, same full border and radius. The affordance was lying, and the open
module read as two stacked boxes rather than one card. Expansion was never in the component at all — it was a
sibling frame assembled by hand next to the row.

**Followed the library's idiom rather than inventing one.** `LMS / Module Header` — the sidebar equivalent,
which already exists — uses one `chevron-down` at rest and *the same icon rotated 180°* when open. Ours now
does the same, which also fixes our closed rows: they pointed right, off-convention, against a library that
points down.

**Did not adopt `LMS / Module Header` itself.** It is 280px, borderless, two-line, with neither the status
circle nor the lock — both of which carry API meaning here (`complete`, `accessible: false`). It is a sidebar
component for a sidebar. Taking the convention without taking the component is the right amount of borrowing.

**`Locked × Expanded=True` is unreachable** — a module with `accessible: false` serves no topics. It exists
because Figma sets cannot express a conditional axis, and the component description says so.

**A new silent-success trap, and a file to keep them in.** `clone()` on a variant inside a component set drops
the `componentPropertyReferences` that point at the *set's* properties, while keeping those that point at a
nested instance's own — so the damage looks partial and plausible. Three variants came out with three bindings
where they should have seven, and the symptom was Module 3 rendering *"Module 1 · Foundations of Six Sigma"*
while its Title property read correctly. Counting bindings per variant found it; reading the code would not
have.

All nineteen of these now live in `figma-api-traps.md` rather than in a scratch file under `/tmp`, which is
where they have been sitting and where they would have been lost.

## 2026-08-20 · Every topic row said "Reading"

The topic rows now carry an explicit `LMS / Topic-Types Badge` — a deliberate change, but the values had been
left at the component default, so all fourteen rows across both screens read **Reading**. Including
*Checkpoint · DMAIC fundamentals*, which is a Quiz, and *Lab · Running the analyse phase*, which is a Lab.

Recovered the intended type from **v11**, which still names its rows (`Topic row · Video`, `· Quiz`) and still
carries the verb prefixes (`Watch ·`, `Read ·`) that v12 drops. Ten instances corrected:
Reading / Video / Video / Video / Reading / Quiz / Lab.

**A default that looks like data is worse than an empty slot.** Nothing on the screen said "unset" — every row
made a confident, wrong claim about what kind of thing it was. Same failure the `Course stats` programme row is
built to avoid, arriving from the opposite direction: there a default asserted a field that does not exist,
here a default asserted the wrong value of a field that does.

**And it raises the cost of the open topic-type finding rather than lowering it.** `blocks.{id}.icon` is
unusable — four documented values against twelve catalogued types, and only `null` and `"other"` in the actual
payloads. While the type was an icon, vagueness was survivable. Now the row says the word, and a wrong
derivation will be wrong in plain English.

Also fixed a stale **"ten content types"** in §5 that the earlier correction pass missed — the line directly
above it already said twelve.

## 2026-08-20 · The hero was the last thing drawn by hand

Course Detail is now built entirely from components. The hero — breadcrumb, chips, title, thumbnail and the
stats sub-header — was the part that had resisted, and closing it took **three new components and four
adoptions from the library**. Of seven pieces, three were ours to make.

Adopted: `Breadcrumbs`, `Badge`, `Horizontal tabs`, `Input field` — all from ❖ SKO Design System.
Built: `LMS / Course Detail / Section intro`, `… / Course stats`, `… / Course title`.

**The library keeps being ahead of us.** `Badge` already ships a `Type=LMS Topic Types Badge` variant — the
exact badge the topic rows use. That is the third time on this page that something we were about to build
already existed under a name our searches did not reach, after `Marker` → `LMS / Completion Status` and
`Banner` → `Alert`. The lesson is not "search harder"; it is that searching by *what a thing looks like* fails
when the library names things by *where they are used*.

**A default is a claim.** `Course stats` has a programme row — `Course 2 of 6 · Cohort Apr 2026` — that reads
like metadata but has no source in any Course Home API. It is a boolean defaulting to **false**, so the screen
cannot quietly acquire a field that does not exist; someone has to turn it on and name the service that fills
it. Same correction we made to `Dismissible` on `Alert`.

**What the counts say.** v12 is 30 top-level instances, 21 ours and 9 from the library, and the only loose
text left is the unlock-tooltip callout — a note about the design, not part of it. The technical page moved
from 38 annotations across 23 elements to 36 across 21: replacing the title block removed the `Image` node
and its two annotations about `course_image_urls`, and both facts were folded into the `Course title`
annotation rather than dropped.

Also filed `library-requests.md` — two requests to the library owner: `Alert`'s `Breakpoint` axis is misnamed
(it controls stacked-vs-inline, not viewport), and a permanent warning needs a `Persistent` variant so it
cannot be dismissed.

## 2026-08-20 · Drag and Drop, the one Studio tile we had never designed

The goal behind this is free assembly: a creator should be able to build a topic any way they like and find
every piece already designed. Measured against the nine tiles in our own **Add New Component** grid, seven
were covered and **Drag and Drop had nothing at all** — while being auto-graded and mobile-ready, so a creator
could ship it to phones today on our silence.

**Three components** in `5 · Assessments · Quiz`:

| Component | Variants |
|---|---|
| `LMS / Drag and Drop · Item` | Idle · Dragging · Placed · Correct · Incorrect · Locked |
| `LMS / Drag and Drop · Zone` | Empty · Hover · Filled · Correct · Incorrect |
| `LMS / Drag and Drop · Card` | 6 states + booleans for prompt, item bank, feedback, footer |

Every fill and stroke is bound — the state language is lifted straight from `Quiz · Option Row`, so correct is
the same green and selected the same brand tint a learner already knows from a quiz.

**Three decisions worth naming.**

**The two modes are the footer, not a variant.** Standard gives feedback per drop and has no Submit;
Assessment submits once, with attempts and best-attempt-wins. Encoding that as a variant axis would double the
set to express something the existing `Footer Actions` boolean already says.

**The zone stops drawing chrome once it is filled.** From then on the item carries the state and the zone adds
only a ring. Two components colouring the same thing is how a system starts disagreeing with itself.

**The board background is author-supplied content**, so it ships as a labelled placeholder rather than an
invented diagram. Drawing a fake process map would have made the component look finished and taught the
content team nothing about what they have to provide.

Left undesigned on purpose and written into the annotation: the drag ghost, keyboard placement (the XBlock
supports it), and the per-drop screen-reader announcement. Interaction spec, not decoration — they need a
decision first.

**A Figma rule the visual check exposed.** The first pass gave the item bank and the feedback alert boolean
properties. On screen every variant then showed the same thing: an unanswered board with a feedback alert, a
graded board still offering items to place. **A boolean property's default outranks each variant's own layer
visibility** — one default, six states, and the states could not disagree with it. Both properties deleted;
the bank and the alert are now consequences of `State`. Only `Show platform prompt` and `Show Footer
Questions` remain as booleans, because those are genuinely per-instance choices.

The same check killed the zone ring on Correct/Incorrect: the zone and the item were both drawing the same
green, which is exactly the doubling the annotation forbids. The zone now draws nothing once filled.

## 2026-08-15 · The outline sidebar stops growing with the page

A sidebar that stretches to 4,000px says the outline scrolls with the page. It does not — the outline and the
content column are two scroll containers, each clipping its own overflow and carrying its own bar. The
delivery boards had been drawing the opposite, because the sidebar was set to fill a container that hugged
the full page height. On the tall A-1 screens it reached 4,176px.

**Pinned to one viewport, on every desktop and tablet screen:**

| Device | Viewport | Sidebar | Scrollbar |
|---|---|---|---|
| Desktop | 1440 × 900 | 808 | 6 × 623 |
| Tablet | 960 × 1024 | 932 | 6 × 747 |
| Mobile | 375 × 812 | — | the outline is a drawer, not a column |

**The bar covers the scrolling region, not the sidebar** — Nelson placed one by hand and the geometry gave the
rule away. It starts below the course header and the overall-progress block, which are fixed at the top of the
outline: `top = sidebar top + 170 + 7`, `bottom = sidebar bottom − 8`. A full-height bar would claim those two
blocks scroll with the list.

808 = 900 − 60 topbar − 32 padding. The numbers are read off the player-shell crops, not invented, so the
boards and the shell section now state the same thing.

**42 screens across the three frames; 21 mobile screens untouched.** The frames stay as tall as their content
— that is deliberate and documented — so the sidebar now ends mid-page with the quiz continuing below it.
That is the point: it is the only static drawing that says *the outline stops here, and what follows is more
page, not more outline.*

The shell section's own table said the delivery frames could not show any of this. Half of that is no longer
true, and the cell now says which half.

**The rule now lives on `LMS / Sidebar v2` itself**, as a third annotation alongside the two that were
already there, and as a line appended to the component description so it shows in the Assets panel. It gives
the numbers, the arithmetic behind them, the CSS, and the instruction that matters when someone places an
instance: set the height, keep clipping on, add the bar — **do not let it Fill a page-tall container**. That
last sentence is the one that would have prevented this.

## 2026-08-14 · A-2 is the build target, and the page is reorganised around that

Navdeep's decision, reached by reframing the whole argument as one question: **is the purpose of this quiz to
teach, or to measure?** A-2 measures — the learner answers everything before any feedback arrives, so no
answer is influenced by an earlier correction. B teaches — every question becomes a mini lesson. A-2 also
matches how every existing course is already authored, so it costs authoring and no build.

**A-1 is rejected**, on the grounds that per-question feedback during an assessment is precisely the thing
A-2 exists to avoid. **B is parked, not dead** — buildable, and revivable by a teaching-shaped quiz, which is
a content-team call. Rupali, Simran and Saransh are being asked for that input.

**The page is reorganised.** The two mode-A versions were sharing one frame in two columns; they are now
separate frames, in decision order:

| Frame | Screens | Status |
|---|---|---|
| `ICP Phase 1 - Quiz (A-2) - Light` | 18 | **Ready for DEV** |
| `ICP Phase 1 - Quiz (A-1) - Light` | 9 | In progress |
| `ICP Phase 1 - Quiz (B) - Light` | 36 | In progress |

Then the player shell, the journeys, and the kit. **The kit stays shared** — the components are the same in
all three, which is the point of having had them.

Every header band rewritten to say which version it is and why it is where it is, and all 27 card changelogs
carry the 14 Aug decision. The chip on a parked card reads `In progress`; the band carries the real reason,
because a chip cannot say "parked pending a content-team decision".

**One thing the status sweep exposed.** Six of the mobile cards did not follow the instance swap: their
`Status Tag` had the words *Ready for DEV* typed straight onto the text node, from the day we marked
everything ready. Swapping the status component underneath changed nothing visible. Same lesson as the CTA
overrides, in a different costume — **a typed override outranks the component and stays silent about it.**

## 2026-08-13 · Decision CTAs stretch on narrow containers, and it took two numbers not a variant

Full-width CTAs on mobile looked like it needed a mobile version of every component carrying a decision. It
does not. It needs `min-width` on the buttons and `max-width` on the row.

**New component — `Action Row`** (page `↳ Button groups`, variants `Actions = 2 | 3`). A wrapping flex row
whose `cta-slot` frames carry the minimum and whose buttons fill their slot. Swap the button, inherit the
behaviour. Measured: 279 → 279 / 279 stacked · 560 → 184 / 184 · 1032 → 184 / 184.

**`LMS / Quiz · Entry Header` — formula applied to all four variants.** Buttons Fill + `min-width 184`,
`Action` row `max-width 376`. Timed exam runs wider because its primary label is: 292 / 184 → 484. Measured
on the component: 311px device → **263 / 263 stacked**, 600 and 1080 → 184 / 184 side by side.

**Three things the file taught us, all verified:**

- `min-width` and `max-width` **cannot be overridden on an instance**. They are authored at source or they do
  not exist. This is why the fix could not be applied only in the ICP file.
- They **can** be set on a button instance you place yourself. The restriction bites only when the button is
  a child of someone else's component.
- `resize()` on a child inside a wrapping container is refused, and `Fill` inside a `Hug` parent does not
  collapse to content width — it inherits the authored width. Neither is a route to this behaviour.

**Not applied to `Buttons/Button` itself, on purpose.** 161 variants, and `min-width` cannot be overridden —
a floor on the button is law everywhere, which would make a compact toolbar or a table-row action
impossible. The value that triggers the wrap depends on half the container, which is context the button
cannot know. The button may deserve a small universal minimum one day; it is a different number from this
one.

**`LMS / Quiz · Results` — the note keeps the row, and the buttons stack under it when the room runs out.**
Row horizontal + wrap + space-between; note Fill with `max-width` at **its own natural width**; the action
slot Fill with `min-width` at **the widest button** and `max-width` at the content sum, wrapping; buttons Fill
with `min-width` at their natural label width. Measured (Not passed): 311px → note 244 on one line, then
**263 / 263 stacked** · 600 and 1080 → note 244 · 166 / 121 side by side, as before.

**Two numbers carry it.** The note's max-width is what stops it ever needing a second line *and* what hands
the leftover space to the actions — because **Figma's `Fill`, like `flex: 1`, divides free space equally
between siblings and treats min/max as the only way to bias it**. Measured: two siblings with mins of 180 and
246 in a 534 row come back 259 / 259, not 226 / 292. The slot's min-width is what forces the row to wrap
rather than crushing the actions while the buttons overflow.

**The bug underneath three failed attempts:** we capped the note at 223 — the width it had been *compressed*
to inside the old layout — instead of its natural 244. It wrapped to two lines the moment it had its own
line, which read as a layout failure and sent us restructuring the row twice, first to vertical and back.
Cap a text at what it measures while hugging, never at what it measures while being squeezed.

Component canvas widened 582 → 620 so the widest variant fits on one line in the preview. Instances are Fill,
so no screen changes.

The local patches on three mobile instances in the ICP file (hug, no-wrap, and the shortened `Retry (1)`
label) were reverted after the republish: an instance override outranks the component and does not disappear
on publish, so a stale hand-fix silently contradicts the real fix.

Both components and the affected rows are annotated in Figma with the formula and how to extend it.

## 2026-08-05 · Explanations exist, and the wrong answers never get one

Tested all ten questions of the course the vendor named as *the* example of the explanation functionality.
The split is total: **10 out of 10, no exceptions.**

- **Correct answers** (Q1, 3, 6, 8) get a real explanation of the idea. The writing is good — it teaches
  rather than restating the answer.
- **Wrong answers** (Q2, 4, 5, 7, 9, 10) get *"Please revisit the “…”"* and the name of a video or VILT
  recording. Never an explanation.

Six redirects, five distinct targets, every one a title in quotation marks with no link. The learner reads
the name, leaves the quiz, opens the outline and hunts for it.

**This reframes proposal B2.** "Are explanations worth the authoring cost?" is the wrong question — the
authoring is already happening, and it is competent. The real question is **why the learner who got it wrong
receives a redirect while the learner who got it right receives the explanation.** That is authoring
guidance, not platform capability, and it costs a house rule rather than a project.

**It also reopens the review affordance, in a better shape than the one we retired.** We dropped the
per-question review action because the shell can only resolve the parent module, so the label overpromised.
Still true. But the authors are not pointing at modules — they are naming an individual video or session, per
question, by hand. The demand is precise and already written into the content. What is missing is not a
button; it is a machine-resolvable way for an author to say which topic to revisit. That belongs on the table
with the vendor as a content-model question.

## 2026-08-05 · The quiz-level Submit exists, and it is authoring

Audited the two courses Simran supplied. They use **two different authoring models**, which turns out to be
the choice we have been arguing about for weeks without knowing it had a name.

| | SKOAIFP01 | SKOADM01EN / AZ-204 |
|---|---|---|
| `problem` blocks per quiz | **one** | one per question |
| Questions inside a block | **ten** | one |
| Submit | **one for the whole quiz** | one per question |
| Attempts | **3, pooled across all ten** | 2, per question |

**This corrects a claim we have carried since July and had on the board as a hard limit.** "Open edX has no
quiz-level Submit" is true of the *subsection* — `seq_block.py` has no submit handler, and that stands. It is
not true of a quiz as a learner meets it. A CAPA `problem` can hold many response elements, and then it
renders one Submit, one Save, one attempts counter and one score. Verified by reading the block: ten real
question stems, one `submit btn-brand`, *"You have used 0 of 3 attempts"* covering all of them.

**So the thing we said would need custom development is already in production, and it cost authoring.**

It also answers Nelson's question from 3 Aug — *are attempts for the whole quiz or per answer?* We said per
answer, always. The accurate answer is **per problem, and a problem can be the whole quiz.**

**The trade-off is real and not adjustable per question.** The bucket buys one Submit, pooled attempts and a
single score. It costs per-question feedback — nothing can be revealed until the whole set is submitted —
along with per-question attempts and per-question Reset. Per-question buys immediate feedback and independent
retries, which is what makes formative practice work, and gives up the single Submit.

Written up as `04-quiz-experience-spec.md` §11, with the consequence for our two modes: **A must reproduce
whichever model the quiz it imitates actually uses**, and the bucket deserves naming as a third option in its
own right, since it delivers part of B's value with no design work at all.

Also observed: **multi-select is in use** — the SKOAIFP01 practice quiz has a checkbox question, so it is no
longer zero in anything we have audited. And practice quizzes show unlimited attempts, no Save and no
counter, exactly as `should_show_save_button()` predicts.

**Still open:** the explanations. `<solution>` content is not sent to the client before submitting, so seeing
a real authored explanation means spending an attempt on Nelson's own record. Not done without asking.

## 2026-08-06 · Next question comes back — I had removed it for the wrong mode

Nelson spotted two gaps in the journeys, and the first is a reasoning error of mine worth stating plainly.

**I removed `Next question` from every state, on the grounds that there is no next question.** That is true
of **mode A** — every question sits on one scrolling page, so there is nowhere to advance to, and its
Previous/Next move between *topics* and leave the subsection. It is **not** true of mode B, which is a
stepper: one question per screen, and advancing is the entire point.

Worse, the Stepper Bar carries **Back but no forward control**. So between removing the button and building
the journeys, mode B had no way for a learner to move on at all. The gap was structural and I had built three
journeys over it without noticing.

Restored as `Show next action`, **default on**, because on is mode B:

- **Primary** on `Correct`, `Partially correct`, `Answer revealed`, `Results withheld` — the question is
  resolved, advancing is what is left.
- **A link** on `Incorrect`, with **Try again staying primary** — with attempts left, retrying is the
  encouraged action, not moving on.
- **Off in the mode-A preset**, where it would be a lie.

**Show answer turned on where the platform would actually offer it**, rather than everywhere or nowhere:

| | Where it appears |
|---|---|
| Practice, mode B | from `Selected` onwards — practice leaves `showanswer` open, and there is nothing to protect |
| Graded / Final, mode B | only on `Last attempt` and `Answer revealed` — that is `answer_available()` |
| Mode A | only once the answer is already correct |

Never on an untouched mode-A question. That was the 3 Aug finding we retracted, and it stays retracted.

**And the counter now says which question each step is.** Twenty steps across the three journeys were all
reading the component default of "Question 4 of 7" regardless of where they sat. Each now names its real
position, and the progress bar fill is set to match rather than contradict it — a bar at 60% beside
"Question 1 of 5" is the kind of detail that quietly tells a stakeholder the screens are not real.

## 2026-08-05 · The review page carries the journeys and nothing else

**The review page is now one section: the canonical flows.** Everything else — the ten differences, the state
catalogue, the edge cases, the pass mark, the open questions, the start-here — moved back to Topic Content
Types, which is where discovery, history and archive belong. A review surface should ask one thing of the
people looking at it.

**And the journeys are now exhaustive**, organised by *route* rather than as a single happy path. Twenty-two
routes across the three types:

| Type | Mode B routes | Mode A routes |
|---|---|---|
| **Practice** | right first time · wrong then right · asks to see the answer · multi-select partly right | right first time · wrong · the end |
| **Graded** | right first time · saves and comes back · wrong then right · **wrong twice → answer revealed** · multi-select partial · score not ready | **the Save trap** · wrong · the course ends |
| **Final** | right · wrong · **score held back + correctness suppressed** · **timed: running → 20% → 5% → expired** | one attempt, no explanation · blocked or closed |

The Graded band is the largest because it is the only type where a learner can be wrong and recover — six
routes in mode B against Final's four.

**Three defects caught in the pass, all mine, all from the rebuild:**

- A mode-A card was showing the stepper bar again — and again it needed both the property *and* the layer
  cleared, because the clone had carried a manual override.
- **Twenty-five local components on the review page.** The `Worklist checkbox` is a local component, not from
  the design system, and it came along with the worklist frame. Moved out with the rest of the discovery
  material.
- `Results withheld` was missing from every journey, so the state that suppresses correctness *and* score was
  absent from the page whose job is to show all combinations. Added to the Final band with the reason:
  `show_correctness` hides right and wrong along with the number, so the learner cannot tell which answers
  landed.

**Final verification, both pages:**

| | Review | Discovery |
|---|---|---|
| Question cards | 30 | 22 |
| Mode A showing the bar | **0** of 10 | **0** of 3 |
| Mode B showing the bar | 20 of 20 | 4 of 19 *(state specimens stay bare)* |
| States in use | **all nine** | all nine |
| Broken instances | 0 | 0 |
| Local / non-DS components | **0** | 25 — the worklist checkbox, deliberate and now only here |
| Show answer on untouched | 0 | 0 |
| Reset on a correct answer | 0 | 0 |
| Section overlaps | 0 | 0 |

**Design system:** ten quiz component sets, nine card variants, no malformed names, no sets in error, no raw
colours, no emoji, no hand-drawn buttons or pills, every documented state present.

## 2026-08-05 · Exhaustive audit — six defects, all from the same two hours

Applied the new `Saved` state to the graded journey in both lanes, then audited every quiz component against
the behaviours our own documentation records. **Six defects, every one introduced by the additions made in
the previous two hours** — which is the argument for auditing after a burst of changes rather than trusting
that each one landed.

| Defect | Cause |
|---|---|
| `Saved` had Skip, Save and attempts **unbound** | Cloning a variant does not carry property references |
| `Partially correct` had **two** Show answer buttons | A timed-out script had partially completed, then the retry added a second |
| `Answer revealed` offered Show answer | Already pressed; the first pass added it before I decided to skip it |
| `Results withheld` offered Show answer | `show_correctness` suppresses the answer along with the score |
| A mode-A card showed the stepper bar | The `Saved` clone carried `Show progress` on |
| …and the same card again, via a **manual layer override** | Setting the property was not enough — the layer had been forced visible |

**The state catalogue was incomplete too.** `03 · Every state` had fifteen specimens and no `Saved`, so the
newest and most dangerous state was missing from the page whose whole purpose is completeness. Added as A9,
with the warning that saving scores zero.

**Final state, verified across the whole review page:**

- 43 question cards · 12 in mode A, **none showing the stepper bar** · 31 in mode B, 16 showing it
- All nine states in use across the page
- Zero broken instances, zero section overlaps
- Zero Show answer buttons on untouched questions — the retracted 3 Aug finding stays retracted
- Zero Reset offered on a correct answer — the platform's protection is intact

**Design system:** ten quiz component sets, nine card variants, no malformed names, no sets in error, no raw
colours, no emoji, no hand-drawn buttons or pills, and every documented state present.

*One correction to my own audit:* I first flagged the nine `Answer Input` variants as malformed because their
names contain commas. Commas are legitimate when they separate **two properties** — `Type=X, State=Y`. The
real rule is that every comma-separated segment must contain an `=`, which is what broke
`State=Saved, not submitted`. The check now tests that.

## 2026-08-05 · Two states the platform has and we had never drawn

**`State=Saved`.** The platform renders it — `has_saved_answers` and `save_message` are both in the template
context, and the learner sees *"Your answers have been saved but not graded."* We had no state for it, which
is why the graded journey had to use a plain `Selected` card for the step where a learner saves and moves on.
It now carries a warning alert saying what saving actually means: **stored, not graded, scores nothing until
submitted.** It is the most dangerous state in the quiz precisely because it looks like progress.

**`Show answer action`.** Nelson asked whether mode A has a Show answer CTA. It does — `answer_available()`
is passed into the template as its own flag, and we saw the button live once a question closed. The component
had no such control at all, in either mode.

Added as a boolean across seven of the nine states, **default off**, and the description says why it is not
free-floating: it appears only when `answer_available()` is true, which on our courses means the problem is
**closed** — attempts spent or past the course end date — **or the answer is already correct**.

> That caveat is the whole point of adding it carefully. *"Show answer is available before any attempt"* is
> exactly what we recorded on 3 Aug and later had to retract: it was an artefact of auditing a course that
> had ended. Putting the button on an untouched mode-A question would bake that retracted finding into the
> design system.

**Left off two states on purpose:** `Answer revealed`, where it has already been pressed, and
`Results withheld`, where `show_correctness` suppresses the answer along with the score.

In mode B it becomes difference 3 on the board — a deliberate policy per quiz rather than a default nobody
chose.

*Recorded for next time:* naming the variant `State=Saved, not submitted` put the whole set into an error
state. **Figma parses commas in a variant name as property separators**, so the comma read as a second,
malformed property. Same failure class as the missing `State=` prefix earlier — and both present as "nothing
about this component can be read."

## 2026-08-05 · Section 02 rebuilt as journeys, not inventories

Nelson's correction: what I had built was **three vertical stacks of components**, not journeys. A stakeholder
cannot read a stack — there is no sense of what follows what, and none of the branching that makes a quiz
interesting. What was needed was a flow diagram drawn with finished screens.

**Rebuilt as one band per type, each with two lanes.** Mode B runs along the top as the proposed journey;
mode A runs beneath it, the same journey degrading. Reading down a column answers *"and what does that look
like today?"* at every single step, which is the comparison the whole page exists to make.

| Type | Journey |
|---|---|
| **Practice** | opens → answers → right → **gets one wrong** → tries again → right at the second go → finishes |
| **Graded** | opens → answers without submitting → **wrong, one attempt left** → tries again, right → another question, **both attempts spent → answer revealed** → results |
| **Final** | opens → answers → right → **wrong with nothing left → answer revealed** → results, **or the score withheld** |

**The branches are the point.** Each type is the same quiz with a different consequence for being wrong, and
until now that difference was described in prose rather than shown. Practice can retry forever; graded gets
one recovery and then the answer; final gets none.

**Mode A carries the findings inline**, at the step where a learner would meet them: the missing entry screen,
the Save trap with its "saved but not graded" message, the empty space where an explanation should be, the
second submit refused until Reset, and nothing at all at the end. The Final lane also reaches a closed
question — attempts spent or past the course end date — because that is the state that cost us two days.

Every screen is a real component instance on the mode-A or mode-B preset, so the journeys stay true when the
design system changes. The legacy canonical mock and the worklist moved out of the way rather than being
deleted.

## 2026-08-05 · A review page for the quizzes

New Figma page: **`↳ Phase 1 - Quizzes - Ready for Review 🟠`**, in the READY FOR REVIEW group beside the
other review surfaces.

**The four quiz sections were MOVED, not copied.** We had spent the day removing duplicate catalogues on the
grounds that two copies always drift; building a review page by copying 04.3 would have recreated that within
a day. The Topic Content Types page keeps the other content types and quizzes now have their own surface.

**Seven sections, ordered as a narrative rather than an archive:**

| | |
|---|---|
| 00 · Start here | The switch, the four costs, what no configuration will give us, how to read the rest |
| 01 · Mode A vs Mode B | The ten differences *(moved)* |
| 02 · Canonical flows | **Three types × two modes — six flows** |
| 03 · Every state | Single and multi select *(moved)* |
| 04 · Edge cases | Blocked, timed, closed *(new)* |
| 05 · Pass mark | *(moved)* |
| 06 · Open questions | Split by who owns the answer *(new)* |

**The new build is the mode-A row of flows**, which did not exist. Each runs Topic Header → *no entry screen*
→ stacked questions on the mode-A preset → *nothing at the end* → topic navigation, with the absences drawn
as dashed callouts because an empty space reads as an unfinished drawing rather than a finding.

**And the types differ inside each mode, which the old section flattened.** Practice has unlimited attempts
and therefore **no Save button** — `should_show_save_button()` hides it deliberately, since submitting costs
nothing. Graded has two attempts and Save. Final has one. That difference is now visible rather than
described.

**04 · Edge cases exists because two of its states cost us two days.** We audited a course that had ended and
read three findings off it that were all artefacts of the closed state. The section leads with that, and with
the save trap and the two-step retry — the states nobody demos and everybody eventually meets.

Validated: mode A carries no stepper bar anywhere, mode B carries it in every flow, no broken instances, no
section overlaps.

## 2026-08-05 · Full validation — the quiz work closes clean

Verified both files after the final publish.

**Design system, twelve quiz component sets:** zero raw colours, zero emoji, zero drawn buttons or pills,
zero malformed variant names, zero sets in error. `LMS / Quiz · Stepper Bar` is mode-B only, present in all
eight Question Card variants and bound to `Show progress`. Defaults are the mode-B preset.

**ICP, four sections:**

| Section | Mode A | Mode B | Topic navigation |
|---|---|---|---|
| 04 · three types, mode B | — | 4 cards, all with the bar | Previous-Topic / Next-Topic |
| 04.3 · every state | — | 15 specimens, no bar | — |
| 04.4 · pass mark | — | — | — |
| 04.5 · A vs B | 3 cards, no bar | 2 cards with the bar | Previous-Topic / Next-Topic |

Zero stray bars, zero broken instances, zero section overlaps.

**One thing worth recording from the validation itself.** I twice reported a "stray" bar that was not stray:
both times the containing card had been **renamed** — `Quiz · Question Card` in the canonical mock — so a
name filter missed it and the node then refused to delete because it was nested inside an instance. The error
message *"Removing this node is not allowed"* was the thing that revealed the real structure.

**The rule, now applied consistently:** identify instances by `getMainComponentAsync()`, never by
`node.name`. Instance names are overridable and in this file several are. Every check in this pass was
rewritten that way, which is also how the last three false readings were caught.

## 2026-08-05 · The mode-A nav was never quiz navigation

Nelson caught a real design error, not a tidiness one. I had built `LMS / Quiz · Nav` with two variants, the
A one being the Previous/Next at the foot of a quiz page. **That is navigation between topics and modules.**
It leaves the subsection entirely — it is not quiz navigation, and giving it a quiz-branded component implied
the platform can step through questions, which is the one thing it cannot do without re-authoring.

- **`Mode=Stacked · A` deleted.** The component is now `LMS / Quiz · Stepper Bar`, mode-B only, living inside
  the Question Card under `Show progress`.
- **Column A now uses `LMS / Course Progression Button`** — `Previous-Topic` / `Next-Topic` — the control the
  rest of the course already uses. Its note says plainly what it is and that it leaves the quiz.
- The DS demo's A group no longer shows a quiz nav at all.

**Applied along with it:** mode B cards carry `Show progress: true` and the standalone bar is gone, since the
card provides its own. Mode A keeps it off. State specimens in 04.3 stay bare — position is not a state.

*This is the second time today the same instinct went wrong in the same direction:* seeing a control on the
quiz page and assuming it belongs to the quiz. The first was the review action resolving to a module rather
than a lesson. Both were caught by asking what the control actually **does**, not where it sits.

## 2026-08-05 · Validation pass, a broken component set, and the state catalogue moves out of the DS

**A malformed variant name had put `LMS / Quiz · Question Card` into an error state.** One variant was named
`Unanswered` instead of `State=Unanswered`, and Figma refuses to read the property definitions of a set whose
variant names do not follow `Property=Value`. Renamed; the set reads again. Worth knowing as a failure mode:
the symptom is that *nothing* about the component's properties can be inspected or changed, which looks far
more alarming than the cause.

**The nav now lives inside the Question Card** — Nelson replaced the old `Questions Progress` with the Nav
itself and deleted the retired component. That is a cleaner arrangement, and it moves the mode switch onto a
property already in place: `Show progress` now governs the bar, default on, so mode B carries it and the
mode-A preset hides it along with everything else.

**Last of the hand-made bits, found by sweeping rather than by looking:** `▲ Pass 70%` in Grade Summary
became an `alert-triangle` icon on a warning token, and two drawn pills in `Last attempt` — *Draft saved*,
*Quiz attempt 2 of 2* — became Badges.

**Final DS state, all ten quiz components:** zero raw colours, zero emoji, zero drawn pills or buttons, no
malformed variant names, no sets in error.

### The state catalogue did not belong in the design system

Nelson asked why `Quiz — every state · single & multi select` was sitting in the DS. It should not have been,
and it was worse than misplaced: **it duplicated ICP section 04.3 almost exactly** — the same five columns,
34 specimens there against 35 here.

A catalogue of learner-facing states is **application documentation**; the design system defines components.
Two copies of the same catalogue in two files guarantees they drift, and the one nobody is looking at becomes
the one people trust.

The five duplicated columns are removed. What stays is the part that genuinely is component documentation —
**how to configure the same card for each mode** — and the board is renamed to say so, pointing at 04.3 for
the states.

## 2026-08-05 · Every quiz colour now comes from a token

Nelson: *"porque não estás a usar as cores, tokens, standardisação do DS?"* Fair, and it was the same failure
as the hand-drawn buttons — I used the system where it was convenient and improvised where it was not. The
backgrounds and body text I had bound to variables; the tone colours, the icons, the rules and the countdown
I had typed in as RGB.

**Audited the whole quiz family rather than only the two components he pointed at**, which is where the real
answer was: **79 unbound colours across seven components.**

| Component | Raw colours bound |
|---|---|
| Results | 30 |
| Question Card | 31 |
| Answer Input | 6 |
| Option Row | 4 |
| Grade Summary | 4 |
| Gate | 3 |
| Nav | 1 |

**Mapped by meaning, not by nearest value.** `#26708e` on a quiz-type eyebrow became
`text-brand-tertiary`, not "some blue"; `#1f7643` on a pass score became `text-success-primary`; `#8c5908`
below a pass mark became `text-warning-primary`. Where a colour had no honest semantic home the script was
written to **abort rather than fall back to a raw value** — a wrong token is harder to find later than an
unbound colour.

Gate and Exam Timer icons, tone rules and the countdown are now on `fg-brand-primary` /
`fg-warning-primary` / `fg-error-primary` and the matching text and border tokens, so the escalation is the
system's, not mine.

**Final sweep across all eleven quiz components: zero unbound fills or strokes.**

The pattern worth naming, because it has now appeared three times today: drawn buttons instead of the button
component, hardcoded colours instead of tokens, and a demo that contradicted its own rule. Each time the
system was there and I worked beside it rather than with it.

## 2026-08-05 · Three variants were never bound, and the alerts lose their emoji

**The counter Nelson kept seeing was real, and my earlier check had been wrong.** Three variants of
`LMS / Quiz · Question Card` — `Partially correct`, `Answer revealed`, `Results withheld` — carried a
`Questions Progress` layer that was **not bound to `Show progress` at all**. So the property could never
reach them: not by changing the default, not by setting it on an instance. My alignment pass reported "zero
changes needed" precisely because it only inspected layers that *had* a binding, and these had none.

All eight variants are now bound and hidden. Worth generalising: when a boolean property appears not to work,
check that every layer it should govern is actually referenced by it — an unbound layer fails silently and
looks like a stale default.

**The alerts lost their emoji.** `Gate` and `Exam Timer` were using 🔒 🗓 ⏳ ⏱ 👁 as text. Replaced with
design-system icons — `lock-01`, `calendar`, `hourglass-01`, `clock-stopwatch`, `clock`, `eye` — coloured to
the tone.

**And softened, using the language already set on the Inline Alert:** neutral surface, title in
`text-primary`, body in `text-secondary`, and the tone carried by the icon plus a 2px top rule rather than a
flooded block. The three informational gates keep a plain 1px border instead, since nothing about them is
urgent.

One thing deliberately kept loud: **the countdown itself stays in the tone colour** — blue, amber, red. It is
the element the learner is actually watching, and neutralising it would have been consistency at the cost of
the only signal that matters at five percent remaining.

## 2026-08-05 · The design system's own demo was still wrong

Nelson pushed back twice on the same thing, and he was right both times. After fixing the duplication across
the ICP sections, **the canonical demonstration in the design system still showed it** — the mode B group had
the nav bar *and* the in-card counter, which is precisely what everything else had just been corrected away
from. The example that teaches the rule was breaking it.

Three fixes on the showcase:

- **Mode B cards: in-card counter off.** I had set those properties explicitly when building the demo, before
  the default changed, so they never picked it up.
- **The nav moved above the cards in the B group.** It is a *top* bar; showing it underneath taught the
  opposite of what the component is for. In the A group it correctly stays at the foot, because that is where
  the platform puts it.
- **Captions rewritten** — B's still claimed "progress and explanation on".

**And five manual visibility overrides found in columns A and B.** Cards in `Answer revealed`,
`Results withheld` and `Partially correct` had their progress layer **forced visible against the property** —
so changing the default could never have reached them. Worth knowing as a general hazard: a boolean property
is only authoritative until someone toggles the layer by hand, and after that the component lies about its
own state. Reset to follow the property.

*The pattern across today: every time a rule changed, the places that demonstrate the rule were the last to
be checked and the most misleading when wrong.*

## 2026-08-05 · Two counters that disagreed — position moves to the top bar

Nelson spotted the old progress element still inside `LMS / Quiz · Question Card`. He was right, and it was
worse than duplication: in section 04 the nav bar said **"Question 4 of 7"** while the card beneath it said
**"Question 2 of 5"**. Two counters, disagreeing, on the same screen.

The cause is the wizard pattern we adopted an hour earlier: once position lives in the top bar, the in-card
counter has nothing left to do.

**Resolved at the source.** `Show progress` now defaults to **off** on the card, and both component
descriptions say why. The in-card counter is not deleted, because it still has one job: **if difference 10
(the stepper) is struck on cost, mode B stays a single scrolling page — and then a top bar cannot say which
question the learner is on, so the card is the only place position can live.** The rule written into both
descriptions is *never both*.

**Instances corrected across the sections**, and section 04's canonical full-page mock gained the bar it was
missing.

*Two mistakes worth recording, because both were mine and both were caught by verifying rather than by
assuming:*

- **My first sweep filtered instances by name.** Instance names can be overridden, and the canonical mock's
  card had been renamed `Quiz · Question Card`, so it slipped through. Filtering by **main component** is the
  only reliable test.
- **The second sweep then overreached** and added a nav bar to all fifteen specimens in 04.3. That section is
  a **state inventory, not a set of screens** — position is not a state, and chrome does not belong on a
  specimen. Fifteen bars removed.

Final check: 04 has four bars and no card counters; 04.5 has both modes and no card counters; 04.3 has no
bars; nothing on the page overlaps.

## 2026-08-05 · The quiz nav adopted across the sections

Nelson took the progress bar's own `Percentage` label and used it for "Question 4 of 7" instead of a separate
text node, and squared the corners. The nav is now entirely made of existing components — `Buttons/Button`
and `Progress bar`, nothing drawn.

**Swept the sections for navigation that should be using it.** Less than expected, and one finding was that
nothing needed replacing:

- **04.3, 04.4, 04.5** — clean. The apparent hits in 04.5 were my own annotation prose containing the words
  "Previous and Next", not controls.
- **04** carried `LMS / Course Progression Button` in Previous-Topic / Next-Topic / Mark-as-Completed. **Left
  alone** — that is movement between *topics*, a different thing from moving between questions, and it was
  right already.

**What 04 was actually missing was the nav entirely.** Its three flows ran `Topic Header → Entry Header →
Question → Results` with no quiz-level navigation at all. Since the section is now labelled mode B, each flow
should carry the stepper bar. Added to all three, between the entry screen and the question, which is where
it belongs — the bar is for moving through questions, so it appears once the learner is in them.

So the request to "swap in the nav" turned out to be an **addition**, not a substitution. Worth noting the
difference: a sweep that only looks for things to replace would have reported the section clean and moved on.

## 2026-08-05 · Re-adopted the design system in the quiz components

Nelson caught it: I built `LMS / Quiz · Nav` by drawing buttons and a progress track instead of instantiating
the ones that already exist — and then found the same habit in components built earlier. He replaced the Back
button with a real `Buttons/Button` himself, which set the pattern.

**Fourteen hand-drawn elements replaced across five components:**

| Component | Was | Now |
|---|---|---|
| Nav · Stacked A | two drawn button frames | `Buttons/Button` — Secondary, with leading/trailing chevrons |
| Nav · Stepper B | a drawn track and fill | `Progress bar`, label off so it does not repeat the counter beside it |
| Results | `Retry incorrect` ×2, `Next topic` ×2 | `Buttons/Button` Primary |
| Results | `Retake quiz` ×2 | `Buttons/Button` Secondary |
| Results | `Passed`, `Not passed`, `Submitted`, `Recorded` | `Badge` — Pill, Success / Warning / Gray |
| Exam Timer | `End my exam` ×3 | `Buttons/Button` Secondary |
| Grade Summary | the score pill | `Badge` Pill Error |

Hierarchy was **inferred from the fills rather than guessed**: everything painted `38,112,142` was a primary
action, white-with-a-stroke was secondary. And the heuristic that found the buttons also flagged four status
pills — those became **badges, not buttons**, because they are not actions. Worth saying out loud: a sweep
like this is only safe if it distinguishes what a thing *is* from what it *looks like*.

The clearest sign the habit was real: in `Grade Summary` the hand-drawn pill sat directly beside a sibling
layer already named `Badge`. Half the header used the component and half did not.

Final sweep across all six touched components: **zero hand-drawn button- or badge-like frames remain.**

## 2026-08-05 · Column A rebuilt from components — nothing on the board is detached now

The "today" column was hand-drawn since 5 Aug because `LMS / Quiz · Question Card` could not render what the
real page shows. `Show platform prompt` and `Show attempts` fixed that, so it is now built from the design
system on a **mode A preset**: platform prompt and Save on, progress and explanation off, navigation set to
`Stacked · A`.

**Verified after rebuilding, not assumed.** All three cards render the platform prompt with no progress bar
and no explanation; `Unanswered` shows Save draft, Submit and the attempts line, which is exactly the live
page; `Correct` offers no actions, because the platform hides Reset once an answer is right; and the
navigation still reads *Previous* and *Next*, not *Next question*.

That last check is the one that matters. The column now **inherits** from the same component as the proposal,
which is the point — but it also means a careless default change could quietly make the "today" column
describe the proposal, which is the exact mistake we made once already. The column caption now says so, in
the imperative, for whoever edits it next.

**Kept, because they are the finding rather than chrome:** the screenshot as evidence, the two dashed absence
callouts, and the *NOT A DEFECT — RESOLVED* note explaining that the screenshot is of an ended course.

*Recorded because it cost a step:* the rebuild script cleared the screen before confirming it had captured
the callouts to preserve, and two of them were deleted. Figma plugin runs are not transactional — collect
first, verify the collection, then destroy.

## 2026-08-05 · Six quiz sections down to four, and the nav becomes a top bar

**The nav, rebuilt after the wizard pattern Nelson liked.** `Mode=Stepper · B` is no longer a footer — it is
a **top bar**: back, a progress track, and "Question 4 of 7". `Mode=Stacked · A` stays at the foot, because
that is where the platform puts it. The bottom of a mode-B screen now carries only the question's own action.

It has a useful side effect: mode A's Previous/Next *leave the quiz*, and moving B's navigation to the top
means the two modes are distinguishable at a glance rather than by reading labels.

**Four consequences agreed and written into the component description**, because the pattern hides them:

- **Retry does not live in the nav.** If the primary becomes *Next question*, a learner who got it wrong with
  attempts left has nowhere to click. The card offers *Try again* as a secondary — and with
  `rerandomize = always` that control must own **two** steps, since a second submit without Reset is refused.
- **The last question** turns *Next question* into *See results*.
- **Back means previous question, never "leave the quiz."** Two different actions, two different controls.
- **None of it applies to a bucket quiz**, where one Submit covers all ten questions and there is no next.

**Sections consolidated, six to four.**

- **04.2 deleted.** Verified subsumed first, not assumed: its four Option Row states all appear among the
  thirty-four combinations in 04.3.
- **04.1 archived** rather than left in place. It is reference material and three of its claims are now known
  to be wrong — no quiz-level submit, results needs backend work, show-answer differs by graded. A wrong
  reference is worse than none, so it carries a stamp naming each error and where the verified version lives.
- **04 relabelled `04 · Quiz — the three types, in mode B`.** It was presenting our proposal as *the* quiz
  flow: it opens on an entry screen and closes on results, and the platform does neither. Duplicating it into
  six flows would have been the wrong fix — the three types are a **separate axis** from the two modes, and
  practice, graded and final all exist in A too, just without the bookends.
- **04.3, 04.4 kept**, both mode-independent, each now pointing at 04.5 as the entry point.

## 2026-08-05 · One card, both modes — and B is what you get by default

Consolidating the quiz work. `LMS / Quiz · Question Card` now serves **both** modes, so nothing has to be
detached to show how the platform behaves today.

**Two properties added**, because the card previously could not render what the live page shows:
`Show platform prompt` — the repeated *"Choose the correct option(s)"* and the points line — and
`Show attempts`, the count beside Submit. Their absence is why the "today" column on the board had to be
drawn by hand.

**Defaults are now mode B.** Drop the card in and it is already the proposal: progress on, explanation on,
attempts on, everything else off. B is what we are designing towards, so it should be what you get without
thinking, and anyone showing A has chosen to. *(`Show hint` flipped to off with this — zero demand hints are
authored anywhere in the catalogue.)*

Note this defaults the opposite way to the prototype, deliberately: **the prototype defaults to A** because
it imitates production, while **the component defaults to B** because it is a design tool. One default
protects the comparison, the other protects the design work. Both are stated in `08-two-modes.md` §2 and §9
so the difference reads as a decision rather than an inconsistency.

**The recipe lives on the component description**, not only in a document — whoever opens the card in Figma
sees both switch-lists and the platform rules without leaving the file.

**Building the demonstration caught two real defects** that the table alone had not:

- **Save existed only on `Last attempt`.** Mode A could not show it on an unanswered question, which is
  exactly where the platform does show it. Added to `Unanswered` and `Selected`.
- **The hint *button* ignored `Show hint`** — the property was bound to the hint alert, not the control, so
  the button rendered regardless. Now bound.

That is the same argument as the prototype itself, one level down: build the comparison, do not describe it.

## 2026-08-05 · The stepper moves into B, and the framing corrected to discovery

Two corrections from Nelson, and the second reverses a call I had made.

**"Both to be built" was overclaiming.** Nothing here is agreed — this is still discussion and discovery.
The Figma section is now `04.5 · Quiz — mode A (today) vs mode B (proposed) · in discussion`, and
`08-two-modes.md` opens by saying so. Cost tags read as *what this would cost if we shipped it*, not as
commitments.

**The stepper belongs in B.** I had excluded it and parked it in column C as deliberately left out, on the
grounds that one question per unit means re-authoring the whole catalogue. That reasoning is right about
production and wrong about a prototype: **in a prototype the stepper costs nothing, and letting people use it
is exactly how we find out whether the authoring cost is worth paying.** Excluding it meant deciding the most
expensive question by assumption, which is the opposite of why we are building two modes at all.

It is now difference **10** — one question per screen, Previous and Next, and a percentage complete — tagged
✎ Authoring (heavy) + ▣ Design so the real cost stays visible. It also makes difference 1 native: with one
question per unit the counter is the platform's own rather than something our shell computes.

Two things carried with it. **How Reset behaves under sequence navigation is untested** — Simran is checking,
and until then retry behaviour in a stepper is unverified rather than assumed. And if it is ever adopted for
real, it should be for new courses rather than retrofitted.

One trap flagged for the prototype: **A's Previous/Next must leave the quiz**, because that is what they
really do. Making them step through questions in A would quietly give A half of B's improvement and flatten
the comparison.

## 2026-08-05 · A and B are two modes, not a before and an after

New doc: `quizzes/08-two-modes.md`, and the Figma section renamed to
**`04.5 · Quiz — mode A (today) vs mode B (proposed) · both to be built`**.

**The reframe.** Everything so far has read as *here is how it works and here is how it should work*. That is
not what we are building. The prototype carries **both experiences at once, selected per quiz**, so some
quizzes run A and some run B and the same questions go through either. You settle an argument about feedback
by letting people use both, not by describing the second one well.

**The switch is one property at quiz level — `mode: 'A' | 'B'`.** It belongs to the quiz, not the question
and not the course. **Default is A**, so an unconfigured quiz behaves as production does, and anyone who
meets B knows someone chose it.

**What must be held constant, added as its own section**, because a comparison between two things that differ
in five ways measures nothing: the same questions in the same order, the same attempts, the same question
type, the same pass mark, and the same visual language. Only behaviour and content may differ. That last one
matters most — showing A as raw edX and B in the new design would have the room choosing the prettier column
rather than the better experience.

The nine differences are numbered to match the Figma board, so a comment on "number 4" means the same thing
in the doc, on the board and in the prototype.

**Also corrected in `quizzes/00-README.md`**, which is read first and had two stale headline findings: the
results screen is a frontend plugin rather than a fork, and the "review lesson on a wrong answer" idea is
dropped — the link can only resolve to the module, so the label promised precision we cannot deliver. The
draft-versus-submitted point was sharpened rather than removed: it turned out to be the most dangerous thing
in the quiz.

## 2026-08-05 · We had been auditing a course that had ended

Simran moved the AZ-204 end date forward. Re-reading the same problems through `/xblock/{id}` on the open
course changed three findings at once — and the cause is the same for all three.

| | Screenshot (course ended) | Live (course open) |
|---|---|---|
| Submit | disabled | **enabled** |
| Save | absent | **present** |
| Show answer | present | **absent** |

**The retraction that matters most: Show answer.** We recorded on 3 Aug that the answer could be revealed
before any attempt, called it a conflict, and on 4 Aug accepted Simran's explanation that graded and
non-graded quizzes behave differently. **Neither was right.** Their graded quizzes leave `showanswer` at the
platform default `finished`, which means `closed() or is_correct()` — and ending the course satisfies
`closed()`. The ended course had revealed every answer. On the open course, Show answer is not offered at
all. So the reveal rule in production today is an accident of a default, not a decision by anyone.

**And a question to the vendor withdrawn.** We were about to ask why Save was missing when the source said it
should render. It was missing because the course was closed. Save is present on every graded question, and
it stores an answer without spending an attempt — which makes it more useful than we had credited.

**The lesson, recorded plainly because it cost two days of wrong conclusions:** we read behaviour off a
course that had ended, and the state was legible in the API the whole time. **Check the course is still
running before treating anything you see in it as normal.**

Column A now shows the open-course state — Save beside Submit, no Show answer — with the callout explaining
the three differences and why the screenshot above it looks different. Notes A3, A4 and A6 rewritten.

One thing left unverified on purpose: Reset almost certainly appears in their courses because the questions
are randomised (`should_show_reset_button()` returns true for a randomised problem once submitted), not
because `show_reset_button` is on. Confirming it would mean submitting an answer and spending one of Nelson's
two attempts, so it stays inferred.

## 2026-08-05 · The defect that was not one, and Next question removed

**`Next question` removed** from `Correct`, `Partially correct`, `Answer revealed` and `Results withheld`.
Nothing replaces it: after a right answer on a page the learner can already see all of, there is no next step
to offer. The card's footers are now empty in those four states, which is the honest shape.

**The Submit defect was not a defect.** Simran: *"The course end date had passed because of which submit
button was showing disabled."* The source agrees to the letter — `close_date` is `self.due or
self.course_end_date` (line 793), and once past it `closed()` is true, which disables Submit and takes Reset
and Save with it. The behaviour was correct all along.

**What the platform does not do is say why.** The button greys out with no message and no date. *That* is the
design gap, and it is a better finding than the bug we thought we had: a learner meeting an ended course gets
a dead control and no explanation.

Two corrections to the board followed. The red `DEFECT` callout now reads **NOT A DEFECT — RESOLVED** and
explains the mechanism. And the evidence caption now states that **the screenshot is of an ended course** —
a greyed Submit beside "0 of 2 attempts" is the past-due state, not the ordinary one. Without that line the
column documents an edge case while claiming to document the norm.

Worth recording plainly: we had `closed()` in our own notes since 4 Aug and still wrote "defect" on the
board. Reading a mechanism is not the same as recognising it in the wild.

**Two courses to audit**, both from Simran. One reportedly uses *"only one submit button by adding all the
question in one bucket"* — if that is several response elements inside a single CAPA problem, it qualifies
our "no single Submit for a whole quiz" claim, which is true of subsections but need not be true of a
question set authored as one problem. The other uses the explanation functionality, and is the example we
have been asking for since 4 Aug — it unblocks proposal B2, the largest item on the board.

## 2026-08-04 · The button contract — one rule, applied to all eight

Written up as `04-quiz-experience-spec.md` §10.7, after four buttons on the question card turned out to have
no counterpart in the platform. They got there honestly: the component was drawn as our *proposal*, and
nobody had yet asked which of its affordances the backend can honour.

**The rule: a button on a question may only promise what the backend can honour.** Applied to all eight, it
kept five and caught three — and each of the three failed differently, which is why a single sweep was worth
more than fixing them one at a time as they were spotted.

| | Platform? | Outcome |
|---|---|---|
| Submit | yes | always present — the only action that spends an attempt |
| Show answer | yes | keep; set per quiz, inheritable |
| Reset *("Try again")* | yes, off by default | keep; label must sit beside the attempts count |
| Save *("Save draft")* | yes, off by default | optional, off |
| Hint | yes, none authored | optional, off |
| Skip question | **no** | optional, off — ours, pending the stepper |
| Next question | **no** | **unresolved, on four variants** |
| Review lesson | **no**, inside a problem | removed from the card; kept in the entry header |

*Skip* and *Next question* promise **navigation that does not exist** — every question is on one page.
*Review lesson* promised **precision we cannot deliver**, resolving to the module rather than the lesson.
And *Save draft* looked like an invention and was not: removing it on suspicion would have deleted a real
feature from the design. That is why the test is "does it exist in the source", not "does it look familiar".

**A second rule fell out of it: where the platform hides a button, copy that behaviour.** Reset vanishes once
an answer is correct — because reset wipes the score on the spot, offering it there would let a learner
destroy a point they had banked. Reset and Save both vanish once the problem is closed. Save is hidden when
attempts are unlimited and nothing is randomised, because submitting costs nothing in that case. These are
not quirks to work around; they are the platform protecting the learner, and our shell should do the same.

**Still open:** `Next question` is the *primary* action on `Correct`, `Partially correct`, `Answer revealed`
and `Results withheld`. Removing it raises the question of what replaces it — the redrawn today column
answers **nothing** for `Correct`, which is almost certainly right for the other three, but that is a design
call rather than a correction.

## 2026-08-04 · Save and Skip made optional, and Reset read properly

Nelson's rule for the two leftover buttons was the right one — *if it is not in edX, it is our add-on, remove
it.* The source answered differently for each, so they are handled differently.

**"Skip question" is ours.** Zero occurrences of `skip` in either `capa_block.py` or `sequence_block.py`.
There is no concept of skipping a question; navigation is between units.

**"Save draft" is not.** `force_save_button` (line 267), `should_show_save_button()` (1052), the
`problem_save` handler (422) and `save_problem()` (2075) setting `lcp.has_saved_answers = True`. Save stores
an answer **without submitting and without spending an attempt**. It is the same category as Reset and
gating: real, and switched off.

Both are now booleans on the card — `Show save`, `Show skip`, defaulting off. Save because it may be turned
on per quiz; Skip because it only becomes meaningful if the stepper is ever adopted, and that decision
reshapes the whole flow.

**A prediction from the source that we can check.** `should_show_save_button()` hides Save when attempts are
unlimited and the problem is not randomised — the code's own comment explains that submitting costs nothing
in that case. But on a graded quiz with `max_attempts = 2`, not closed, not submitted, it returns `True`. **So
Save should already be rendering on our graded quizzes, and in the screenshot it is not.** That is very
likely why the 3 Aug test lost an unsubmitted answer. Added to the vendor questions.

**Reset documented in full** in `04-quiz-experience-spec.md` §10.5, because the label on our button depends
on it. It clears the answer *and wipes the score already earned*, re-seeds a randomised question so the
learner may get a different variant, disappears once the last attempt is spent, and never returns an
attempt — `self.attempts` is assigned in exactly one place in 2,481 lines, inside submit.

Two things follow. **Hiding Reset after a correct answer is protective, not an oversight** — because the
score is wiped on the spot, a learner pressing it on a question they had right would destroy a banked point.
And **the risk sits in the label**: "Try again" reads as a free second go, so it is only safe beside a visible
count of attempts remaining.

**Column C brought in line.** Three corrections: "Items 1 and 4 need no decision" became "1, 4, 7 and 8" —
the board has eight pairs now, not six. *Reset never returns a spent attempt* was added to the hard-limits
list, where it belongs, since no setting changes it. And a card the board was missing — **"Built into the
platform, switched off in our courses"** — now collects gating, Show answer, inherited attempt caps, the
Reset button and the Save button in one place. That card is the argument of the whole board in miniature: the
distance between the two columns is mostly settings, not engineering.

## 2026-08-04 · Column B reviewed — the alert restyled, and the state that could not state its case

Reviewed in the main components, no detach.

**The Incorrect state had no explanation, and could never have had one.** `State=Correct` carried an
`LMS / Inline Alert`; `State=Incorrect` carried only the hint. So the card was structurally incapable of
saying *why* an answer was wrong — which is exactly what note B2 proposes as the change with the largest
learner impact. Column B was failing to demonstrate its own headline argument. The Incorrect variant now
carries the explanation alert, and a new **`Show explanation`** boolean binds it on `Correct`, `Incorrect`
and `Answer revealed` — so the design system can also express the 213-of-215 reality by switching it off,
without anyone having to detach again.

**The alert was restyled after the edX pattern**, on Nelson's observation that theirs reads as subtler. The
diagnosis: our body copy was painted in the tone colour, which is what made the block shout. edX puts the
colour in a top rule and an icon, and leaves the text near-black.

| | Before | After |
|---|---|---|
| Background | tinted per tone | `bg-secondary`, neutral |
| Border | 1px all round, tone-200 | **2px top only**, tone colour |
| Title | Bold, tone colour | SemiBold, `text-primary` |
| Body | **tone colour** | `text-secondary`, 155% leading |

The component had already anticipated this — a tone-coloured stroke sat hidden beneath the grey one, so the
change was to swap which is visible. All bindings are to semantic variables; no tokens were broken. Note that
`Entry Header` and `Lesson Block` also consume this alert and therefore change appearance too.

**Alert titles stopped repeating the verdict.** "CORRECT" and "INCORRECT" both became **"Explanation"**. The
option row already says, in green or red, whether the learner was right; spending the alert's first line
repeating it is the same error we removed from the stacked alerts (`07-results-decisions.md` §2). Reviewing
the rest turned up four more titles still in caps — `LAST ATTEMPT`, `PARTIALLY CORRECT · 1 / 2 POINTS`,
`EXPLANATION`, `ANSWER SUBMITTED`, `HINT 1 OF 3` — all normalised to sentence case. Two sentence-case titles
beside four shouting ones would have been worse than either.

**"Review lesson" removed from the question card.** Nelson asked whether it could be implemented; the answer
splits by placement. Resolving the target is settled — `/api/courses/v2/blocks/?course_id=…&depth=all`
returns the whole tree and we called it ourselves, authenticated as a learner, during the catalogue audit;
the MFE already renders breadcrumbs and an outline from the same structure. But it resolves to the **module**,
not to the lesson covering that question — a per-question mapping nobody authors. So the label promised
precision we cannot deliver. It also sits inside the cross-origin iframe, making it dependent on integration
option C. It stays in the Entry Header, where it is outside the iframe and honestly scoped.

*Restored:* the screenshot in column A had been cropped to 1348px by a section resize — its `scaleMode` is
`CROP`, so it was silently hiding questions 4 and 5 rather than distorting. Back to 760×1784, with
constraints set so a section resize cannot take it again.

**Two more findings in the card, not yet acted on** — both promise behaviour the platform does not have:

- **`State=Last attempt` offers "Save draft".** There is no draft. We confirmed empirically on 3 Aug that an
  unsubmitted selection is lost on navigation, with attempts still reading 0 of 2. This is a correctness
  problem, not a preference.
- **`State=Unanswered` and `State=Selected` offer "Skip question".** Every question is on one page, so there
  is nothing to skip to — it would only mean something under the stepper we deliberately excluded.

## 2026-08-04 · Column A rebuilt against a screenshot of the real page

Nelson put a screenshot of the live quiz — AZ-204, Module 3 Knowledge Check — into column A so the board
could be checked against reality rather than against our memory of it. It earned its place: three things were
wrong and two were missing.

**Column A is now detached from the design system**, deliberately and only here. The previous pass stripped
the wrong affordances out of the DS components, but the components still shaped the page. A faithful redraw
was the only way to stop the proposal leaking into the column that documents the present. The screenshot sits
above it as evidence; the redraw is in our type so it compares like-for-like with column B.

**What the screenshot corrected:**

- **The page has a title and a bookmark link, and nothing else.** No entry screen — which confirms the
  removal made earlier the same day, this time with a picture behind it.
- **Every question carries "Choose the correct option(s)" as a heading** — the same generic sentence five
  times on one page. The plural is wrong for a single-select question and quietly implies multi-select might
  be allowed. We had not drawn this at all.
- **The question numbers are typed into the question text by the author**, not generated. Reorder the
  questions or turn on shuffling and the numbers lie. Also not drawn.
- **"1 point possible (graded)" and "You have used 0 of 2 attempts" are shown per question.** Our note said
  the learner has no sense of where they are; that is still true of *position*, but they are told points and
  attempts. The note was too broad and has been narrowed.
- **Previous and Next sit at the foot of the page** and look like question navigation. They move between
  units, and the whole quiz is one unit, so they leave it. Worth stating explicitly — a stakeholder reading
  the screenshot will assume those buttons step through questions.
- **Reset is absent** because nothing has been submitted yet. The note now says so, rather than leaving its
  absence looking like an omission in the drawing.

**The defect is visible in the evidence**, so it is marked on the redraw where it happens: questions 1 and 2
have a selection and Submit is still greyed. Until it is fixed, a learner cannot submit without first
clicking Show answer — which hands them the answer before they commit to one. That consequence had not been
spelled out anywhere.

This added an eighth pair: **A8** the page repeats itself and the numbering is hand-typed ↔ **B8** the
question is the heading, numbering computed by the shell.

## 2026-08-04 · Column A was quietly showing the proposal — corrected

Nelson caught it: the "how it works today" column had **Next question**, **Next hint**, **Review lesson** and
**Skip question** on the question cards. None of those exist today.

**The cause is worth recording, because it will happen again.** Drawing both columns in our design system is
the right call — it stops the room choosing the prettier column — but the components carry *our proposed
affordances as their defaults*. Reusing them imports the proposal into the column that is supposed to
document the present. Swapping a variant is not enough; the chrome has to be stripped deliberately.

What column A now shows, and why each one is defensible:

- **Unanswered → Submit only.** No *Skip question*: every question is on the same page, so there is nothing
  to skip to.
- **Correct → no actions at all.** No *Next question* for the same reason, and no Reset —
  `should_show_reset_button()` returns `False` once the answer is correct.
- **Incorrect → Show answer + Reset.** *Next hint* is gone: the catalogue audit found zero authored
  `demandhint` anywhere. *Review lesson* is gone: that is our shell, not the platform. And *Try again* was
  renamed **Reset**, which is the platform's own name — using our label made a native control look like an
  invention.

**The entry header went further — it was removed entirely.** There is no quiz entry screen today; the
learner opens the quiz from the outline and is already answering it. The Entry Header is F-QZ-001 on our
*build* list, not something that exists. In its place, a dashed absence note: the facts it would carry
(question count, duration, attempts, weighting) do exist — in the grading policy and on the Progress tab —
just not where the decision to start is made. Timed exams are the one exception, and do have a native
instructions screen.

This added a seventh pair to the board: **A7** nothing tells them what they are walking into ↔ **B7** an
entry screen, tagged ▣ Design.

**Two wordings corrected in column B**, both instances of the same long-standing error — chrome that implies
a quiz-level attempt when attempts are per question. "2 attempts" became **"2 attempts per question"**, and
"Once you submit an attempt you cannot change your answers" became **"Once you submit an answer you cannot
change it."** This closes an item that had been open since the attempts model was corrected.

**And the review action is now justified on the board rather than assumed.** Nelson doubted *Review module
first* was possible, reasonably — we were told twice that authors cannot link out of a question. The
distinction is who owns it: that limit applies to content authored inside the problem block, while our shell
renders its own chrome and can resolve the parent module itself. A note on column B says so, including the
constraint that authors must never be asked to write "go and review module 3" into feedback as a substitute.

**Counter and stepper are now explicitly separated on the board.** Nelson asked whether pagination is in use
today — it is not, and column A shows none. But the question exposed a confusion the room would have had:
column B contains a *counter* ("Question 2 of 5" plus a progress bar), which our shell computes over the
subsection and which needs no authoring change, while the *stepper* — moving one question at a time — needs
one question per unit and a re-authored catalogue, and is excluded in column C. Note B1 now says so in as
many words, because the two look alike and cost nothing alike.

*Not a defect, for the record:* the Entry Header's `Show review action` property was briefly suspected of
being unwired. It is correctly bound. A text node inside a hidden button still reports `visible: true` — only
the ancestor is hidden. The detection was wrong, not the component.

## 2026-08-04 · The vendor message, reviewed before sending

Logged in `session-log.md` under *Open questions with the vendor*. Two changes are worth remembering as
habits rather than as edits to one message.

**A question gets answered when it carries a visible consequence.** Every ask now states what the answer
decides for the design — which component state, which flow, which screen goes in or out of scope. Abstract
capability questions get abstract answers.

**One ask was nearly missed, and it was the important one.** Simran said results do not appear after
submitting. We had accepted that as a platform limit. But if per-question correctness is also absent, that
is `show_correctness` — display name "Show Results", default `always` — set away from its default. We were
one unasked question away from designing a deferred-feedback flow around a single mis-set field.

**And one thing was cut.** Our source check found that `allow_multiple_attempts` is a migration filename,
not a setting. Nobody on their side ever cited it. Refuting a claim that was never made is point-scoring: it
costs goodwill and gains nothing. It stays in our documentation in case it comes up.

Also settled: the results-screen estimate is being raised with Navdeep, so the vendor message carries it as
context rather than as a second request — otherwise we get two estimates on different assumptions, or none.

## 2026-08-04 · Retired components swapped out, and the gate state corrected

**Eight instances of `_Remove · LMS / Quiz · Results Summary` were still live in the ICP** — three in
section 04, four in 04.3, one in 04.4. Anyone opening those pages was being shown the layout we replaced.

Finding them took a second pass. Searching by component name returns nothing, because an imported instance
keeps whatever the component was called **at import time** — so in the ICP they are still named
`LMS / Quiz · Results Summary`, without the `_Remove ·` prefix the DS has since acquired. Matching on the
component **key** is the only reliable way, and it is worth remembering the next time something is retired.

**The swap was not a drop-in, and a naive one would have been silently wrong.** Two of the four variant
names changed in the rebuild: `Failed` → `Not passed`, `Pending review` → `Pending`. A straight swap drops
an unmatched variant to the set default — which is `Passed`. A failure screen would have quietly become a
pass. Each instance was therefore read, mapped, swapped and verified: all eight kept their meaning. Existing
captions already read "not passed" and "pending grading", so no copy went stale.

Each instance lost ~190px in the new layout, so sections 04, 04.3 and 04.4 were re-fitted to their content.

Also swept: no stray `_Remove · LMS / Quiz · Rail Item` and no instance parked on the
`Variation=_Remove · Progress Rail` variant anywhere in either file. The five Rail Items that do exist are
inside that retired variant itself — its own contents, not usages.

**`Gate · Prerequisite` corrected in 04.3 (D1).** It was presented as a state our learners meet. It is not.
Simran confirmed nothing is gated, and the source check then showed the feature is fully built and simply
defaults to off. The label now says so, and an amber correction note explains that the component stays
because it is *available if the business wants quizzes earned rather than open* — a decision waiting to be
made, not a screen to design against. The column caption was rewritten to match: of the five blocked states,
only the timed-exam ones occur in our courses today.

*Layout tidy:* sections **04.1 and 04.2 were overlapping** — 04.1 ran to y≈11324 while 04.2 started at
y=10898, in the same column. 04.2 moved to y=11524, left edge kept aligned with 04.1 so the two reference
sections read as one column, with the same 200px gutter used elsewhere on the page. Full overlap sweep
across the page afterwards: clean.

## 2026-08-04 · Two models, side by side — a board built to be decided from

New Figma section on the ICP page, `04.5 · Today vs proposed — two models for the stakeholder call`
(`5046:116408`), sitting to the right of 04.4. Built so stakeholders can decide, not admire.

**Both columns are drawn in our design system, deliberately.** If the current model were shown as raw edX
and the proposal in our DS, the room would pick the prettier one for the wrong reason. Drawing both the same
way isolates the only variables that are actually up for decision: behaviour and content.

**Column A — how it works today.** The configuration behind 213 of the 215 audited questions: all questions
stacked on one page, no per-question counter, Show answer available before trying, Reset that quietly spends
an attempt, nothing locked, and nothing at the end. The two dashed *absence* callouts are the point of the
column — an empty space is hard to see, so it is labelled: nothing appears after a wrong answer, and nothing
appears after the last question.

**Column B — the proposal.** Six changes, each mapped one-to-one onto the numbered problems in A, and each
carrying a cost tag so a single line can be struck without rejecting the rest: **▣ Design** (ours, already
in scope), **⚙ Setting** (one inherited field on the subsection), **✎ Authoring** (the content team writes
it), **⌥ Build** (frontend plugin). Nothing in this column requires moving a question between units.

**Column C — the cost key, the exclusion, and the ask.** The stepper (one question per unit) is called out
as *deliberately left out*: it is natively possible and needs no code, but it means re-authoring the whole
catalogue, which is the restructuring effort we set out to avoid. Also lists what no configuration will ever
give us, and the four questions the session has to answer. Items 1 and 4 need no decision — they are inside
the redesign already.

One honest bit of construction: the "1 attempt left · Reset does not give it back" line is shown as a dashed
**PROPOSED COPY — NOT A COMPONENT YET** callout rather than tucked into the hint alert. An attempts warning
is not a hint, and dressing it as one would have been the same category error as the destructive-state hint
we rejected earlier.

## 2026-08-04 · The vendor's answers, taken back to source

The 4 Aug quiz walkthrough with Simran is logged in `session-log.md`. Six of her answers were then read
against the `openedx` repositories at `master` — not documentation summaries — because she answers as the
person who *configures* SkillUp's courses, which makes her reliable about SkillUp and unreliable as a
statement of what the platform can do. The split came out three and three.

**Genuinely the platform.** No submit for a whole subsection (`seq_block.py` has two handlers, neither
submits). No aggregate score on the subsection (`score` appears zero times in that file). No per-quiz pass
mark as a verdict (`GRADE_CUTOFFS` is course-wide). And — the one worth knowing — **"End My Exam" is not a
quiz-level submit either**: it ends the session, never touches problem state, and the platform tells
learners outright that unsubmitted answers will not be graded.

**Their configuration, not the platform.** `showanswer` has twelve values and its deciding function never
reads `graded` — the graded/non-graded split is an editorial convention, and the field is *inheritable*, so
it is one setting per subsection rather than 215 edits. `enable_subsection_gating` is fully built, enforced
against direct-URL access, exposed in Studio, and simply defaults to off. `show_reset_button` defaults to
off, so Reset appearing at all is a choice they made. And `max_attempts` is inheritable, so "N attempts on
every question in this quiz" is one field they have not used.

**A correction to us.** `show_correctness` — "Show Results" — defaults to `always`. Per-question feedback
*is* immediate unless suppressed. What does not exist is a quiz-level summary. Wording in
`04-quiz-experience-spec.md` tightened accordingly.

**The finding that changes the plan.** The results screen is a **frontend plugin, not a fork**. The learner
can read their own subsection score from `GET /api/course_home/progress/{course_id}`
(`permission_classes = (IsAuthenticated,)`), and `sequence_bottom_navigation.v1` receives `sequenceId`, so
there is a supported place to render it below the questions. Every subsection route under `/api/grades/v1/`
is staff-gated, which is why this looks impossible from the obvious direction. Three constraints carried
into the spec: no slot fires on *leaving* a subsection, so last-unit detection is ours; the endpoint is
declared unstable and toggle-gated, so the screen must degrade to "see the Progress tab"; and scores are
recomputed asynchronously, which makes the **`Pending` variant of `LMS / Quiz · Results` required rather
than defensive**.

**Two things worth carrying into the conversation.** Reset does **not** refund an attempt — `self.attempts`
is incremented in exactly one place in `capa_block.py`, inside submit, and `reset_problem()` never touches
it; copy on *Retry incorrect* must not imply otherwise. And a whole-subsection reset *does* exist staff-side
via `reset_student_attempts()`, which recurses into children.

Recorded in `session-log.md` with file and line citations, and in `04-quiz-experience-spec.md` §10.

## 2026-08-20 · Course Detail componentised — and two of ours turned out to already exist

Built the Course Detail components against the published library, then swept the library for everything the
metadata audit had recorded as missing. The sweep cost us two components and gained us four.

**Foundations — nothing created, everything imported.** The design system is a separate published library,
`❖ SKO Design System (Untitled UI)`, and this file already subscribes to it. **74 variables imported** from
`1. Semantics` and `3. Responsive`; **zero created locally**. Typography by published style
(`Body/{Lead,Default,Small}/*`, `Caption/*`), never by value — the repo's own `typography.css` says so.
New page `↳ LMS / Course Detail — Components 🟠` with a cover and two live foundations frames: every swatch
has its fill bound to the variable, so a broken import shows as grey rather than passing silently.

**Seven components, not nine.** Namespaced `LMS / Course Detail /`, 24 variants, all tokenised:
`Meta`, `Card shell`, `Module row`, `Topic row`, `Progress card`, `Certificate card`, `Sidebar card`.

**Two were retired because the library already had them.**
- `Marker` → **`LMS / Completion Status`**, which carried Done, Pending and Locked — and had *In Progress*
  hidden, for the same reason we never built one. Our extra `Number` state was dropped rather than ported:
  the module title already reads *"Module 2 · …"*.
- `Banner` → **`Alert`**, 24 variants with responsive breakpoints and Code Connected to `InlineAlert.tsx`.
  Ours had two variants and no idea what mobile was.

**What the sweep also found, that the audit had listed as gaps:** `LMS / Course Complete Modal` — that is the
`celebrations` field, already designed and never wired. `LMS / Section Header` — *Module → Section → Topic for
modules with 10+ topics*, an existing answer to the structural finding. `Input field`, `bookmark`,
`certificate-01`. The only gap that survived the sweep is **mentor**: absent from the API and absent from the
library.

**`Course Detail — v12 · componentised`** is the new entry screen: **42 instances** of our components plus 34
from the library, and a hidden duplicate topic list inherited from v9 removed along the way. v11 stays beside
it as the hand-built reference. Componentising forced three corrections the drawing had hidden — the sky-blue
buttons were never the brand, the dark mentor card was an invented colour (the right answer is a **mode flip**
to `Dark mode SKO`, not a second palette), and there is no "in progress" state because the platform does not
report one.

**Verb rule closed.** Drop the verb where the type is descriptive (Reading, Video, Podcast, Activity); keep it
where consequential (Quiz, Final Project, VILT, Lab). Decided from a three-column comparison, applied to v12,
and written on the `Topic row`. Criterion: does it produce something recorded against the learner, or force
them out of the flow?

**Corrections to earlier entries.**
- **"Ten ICP topic types" was wrong — there are twelve** (eight live, one deprecated, three blocked). Fixed in
  five places across these docs, including two quiz files where the wrong number had spread.
- **Code Connect is not inapplicable.** Phase 4 recorded it as out of scope because this repository holds no
  component code. `Alert` maps to `InlineAlert.tsx`, so a component codebase exists and mappings are already
  in use. The claim was made by looking at the wrong repository.

**Feedback owed to the library owner:** `Alert`'s `Breakpoint` axis is really stacked-versus-inline. Desktop
puts title and supporting text on one line and clips any long copy, so `Mobile` is the only usable option for
`welcome_message_html` on a desktop screen. And a `Persistent` variant would let the never-dismissible rule
live in the system instead of in our documentation.

## 2026-08-19 · v11 — everything the data allows, so the cost is visible

The six fields the audit surfaced are now on a screen, along with the three sidebar widgets that were
available and undrawn. **`Course Detail — v11 · everything the data allows`** (`5401:325`) is a deliberate
maximum, not a proposal.

Added over v10: `enrollment_mode` as a track chip; `org` and `number` as the sub-header the workbook assigns
them; content search to the right of the tab bar; *Currently passing* from `user_has_passing_grade`, which
arrives on the outline call with no extra request; *More content coming* from `has_scheduled_content` on a
module subtitle; and the **dates widget**, **course tools** and **weekly goal** cards. `celebrations` went to
the card strip instead, being an overlay rather than page furniture.

**What it demonstrates is the point of drawing it.** The right column goes from three cards to six and runs to
roughly 1 100 px — longer than the syllabus beside it. A learner scrolling to Module 4 passes a mentor, a
certificate, handouts, dates, bookmarks and a weekly goal on the way. Every one is backed by a real field. The
frame asks which of them earns the room. **v10 stays the proposal; v11 is the inventory to decide against.**

Noted while rendering, and not ours: the shared left-shell component now contains a `WIP` text layer and comes
back as a grey placeholder in server-side screenshots — on v10 as well as v11, so it is the sidebar front's to
look at, not this one.

## 2026-08-19 · Fidelity audit — every claim checked against the workbooks

Checked mechanically rather than by reading: extracted every declared API key from both workbooks (174) and
every key appearing in the sample payloads (133), then extracted every technical token we assert — 104 in
`course-details-metadata-map.md`, 92 across the Figma tables and panels — and cross-referenced them.

**The documentation is faithful.** Not one invented field, not one misspelling, in either surface. Every
token resolves to a declared field, a payload key, or the Courses/Blocks API, which is not in the workbooks
and is labelled as verified live.

Three accuracy fixes:

- **The source path was wrong.** Both workbooks live in `30-07 meetings/`; the document cited
  `_media/Course_metadata.xlsx`, which no longer exists.
- **`playback_url` was under-specified.** The workbook says it is returned only when
  `include_playback_url=true` **and** the recording succeeded, is not archived and has a blob path. We had
  the three conditions and not the request parameter — the one a developer actually has to send.
- Stale layer names from the section's growth, corrected earlier the same day.

**Six fields the workbooks declare, that are learner-facing, and that we had never once mentioned** — now a
section of the element → field table and §5 of the map:

- `blocks.{id}.has_scheduled_content` — *"More content coming"*, present on every block. We draw locked
  modules and have nothing for a module that is open but still growing.
- `celebrations` — *"triggers celebration modals on milestones (first section completion, streaks)"*. A whole
  feature: the platform fires a milestone moment and our design has none.
- `user_has_passing_grade` — a pass/fail signal that arrives **on the outline call**, no extra request. The
  page shows completion but never whether the learner is passing.
- `enrollment_mode` — the learner's own track, and a real field, unlike the course-type badge we drew.
- **Content search** — feature 33, declared in both workbooks, never designed.
- `number` and `org` — the workbook assigns them to the breadcrumb; ours uses neither.

## 2026-08-04 · Three corrections applied, and the card states drawn

- **The letter-grades rule was wrong as an absolute, and it was marked *Applied*.** On every course we
  sampled `grade_range` is a single `Pass: 0.7` threshold and `letter_grade` is null — but the addendum
  shows the Instructor tab formatting `grade_cutoffs` as *"A: 0.9, B: 0.8"*. **The platform supports both.**
  The rule is now: render whatever `grade_range` returns, and hardcode neither shape. That is more design
  work, not less — the component has to hold a single threshold *and* a lettered scale.
- **The certificate card has four states, not two.** `certificate_statuses_with_count` gives the vocabulary:
  `downloadable`, `notpassing`, `generating`, plus `audit_passing` from the outline payload. The gap was
  **`generating`** — certificates are issued in batches, so there is a real interval between passing and the
  file existing, and we had nothing for it.
- **New artifact: `Cards — states the pages do not show`** (`5389:325`), beside the screens. The four
  certificate states together, because a page can only ever show one of them — plus the **recent recordings**
  card, whose list endpoint is `IsEnrolledOrStaff` and therefore learner-callable. It links to the tab rather
  than playing inline, because playback is a separate short-lived URL. Marked VILT-only: putting it on the
  self-paced Six Sigma example would have been false.
- **"Course not started" was not drawn, deliberately.** `start` in the future looks like a fifth state, but
  `course_metadata` carries `course_access {has_access, error_code, user_message}` and the workbook says it
  is *"used for 403 redirect"* — so the learner is probably redirected rather than shown a variant of this
  page. Recorded as a question in the States table with the copy source named. Drawing it now would repeat
  the unenrolled mistake: inventing a screen the platform may never serve.
- **Two stale layer names fixed:** the API table said 8 endpoints and holds 17; the section title still said
  *v9, v10, unenrolled*.

## 2026-08-03 · Metadata we still need — a sixth reference table

Sixth table in the Course Detail section (`5105:444`), written up as
[course-details-metadata-map.md](course-details-metadata-map.md) §11: what each **✗** and **⚠︎** verdict
would take to become **✅**, with owner and status. Ordered by effort, and the cheapest tier may cost nothing.

- **Three asks may evaporate on verification.** The eight endpoints in the workbook are the ones the
  Learning MFE calls, not the only ones the platform has. `CourseOverview` — where `title`, `org`, `start`
  and `is_self_paced` already come from — also carries `media`, `short_description` and `effort` in stock
  Open edX, and the **Courses API** `/api/courses/v1/courses/{course_key}` returns them. If it is enabled
  here, the **course image**, **"What you'll learn"** and **"~ 14 hours"** all close with no backend work.
  Two more to check: **Course Blocks API v2** with `block_counts` (real topic types, instead of `icon`'s
  four values) and the **Bookmarks list endpoint** (the entry point decision 009 has never had). Owner:
  Nelson, in the dev environment — verification before request.
- **The VILT gap closed before we asked it.** Searching all eight payloads for `session`, `recording`,
  `attendance`, `live` and `join` returns nothing, while the one real course is instructor-paced with
  `Session Recordings` and `Session Material` chapters. On the handover call the same day, Nilesh flagged
  that the **live** and **recordings** tabs had been left out; Chitteti is adding both from row 84, due
  4 Aug. Logged in `session-log.md`.
- **Still open, one task each** (Nilesh confirmed new tasks go to Raju, rather than another omnibus
  ticket): the unlock rule, the mentor record, partner branding, `effort_time` **derived rather than
  authored** — ask that before asking anyone to hand-author thousands of blocks — `language`, and
  `user_timezone`, which returns null in all three samples and renders every date in UTC for cohorts split
  between India and Europe. That last one is a defect, not a missing field.
- **Two rules settled with nothing to ask anyone.** Trim `display_name` but never reformat it — the
  payloads carry parasite whitespace (*"Module 5:  SQL Advanced Topics"*, *"Final Quiz "*) and we render
  the field verbatim. And **no letter grades anywhere**: `grade_range` is a single `Pass: 0.7` threshold and
  `letter_grade` is null, so a screen showing A/B/C draws something the platform cannot produce.

## 2026-08-03 · Scope correction — the panel is post-enrolment

**The learner panel never serves an unenrolled course.** Enrolment happens on the site and in the
catalogue; a course reaches this panel only once the learner is enrolled, so `is_enrolled` is always true
on the Course Detail page. The unenrolled and anonymous states drawn earlier the same day were the wrong
surface. They are kept in Figma at the foot of the section under *Out of scope — states the learner panel
never serves*, renamed `OUT OF SCOPE · …`, because they document the boundary — not as work to build.

What it changes, beyond deleting a row of frames from the plan:

- The **anonymous / unenrolled column** of the visibility matrix describes the platform, not us. Only the
  enrolled and staff columns bind. Noted on the matrix in Figma and in `course-details-metadata-map.md` §6.
- **`enroll_alert` never renders here.**
- **The 401s never happen.** Progress and Dates are reachable for every user of this page, so the tab bar
  always renders in full — which firms up the tab decision rather than weakening it.
- **`lms_web_url` is always populated**, so syllabus titles are always links. The "not links, not disabled
  links" nuance is a platform fact, not a state we draw.

**The enrolled lifecycle drawn in their place** — three values, three frames, alongside v10 as the
in-progress state:

- **Never started** (`resume_course.has_visited_course: false`) — 0%, *Start course*, no eyebrow because
  there is no last topic to go to, *0 of 42 topics*, nothing ticked, every module marker neutral. Blue
  reads as *in progress*, and nothing is.
- **Completed** (`cert_data`) — 100%, every topic ticked, every marker green, the last module unlocked,
  *Revisit the course*. The certificate card flips to its issued state: course title,
  `certificate_available_date`, and **View** / **Download** from `cert_web_view_url` and `download_url`.
  Those two URLs are precisely why the certificate works as a card — they are actions, not a destination.
- **Course ended** (`has_ended: true`) — progress freezes, *Review the course*, and the update banner
  becomes an archive notice in the platform's own terms. **Not dismissible**: a dismissible warning about
  a permanent condition is a warning that disappears. The unlock tooltip goes with it — its date is in the
  past and it never had a field behind it.

**Mentor card corrected against decision 007.** It read *"Office hours every Tuesday at 11 AM"* with a
**Book session** button. Decision 007 is accepted and says the opposite — mentoring is unlimited 1:1
**asynchronous messaging**, not scheduled sessions, one mentor assigned at enrolment — and BR-19 sets the
copy: *typically responds within 1 day*. The card is now a single **Message** action plus the SLA line, on
v10 and all three states. v9 keeps the old copy as the record of what the workshop saw. It does not fix the
card's other problem: there is still no mentor field anywhere in the API.

## 2026-08-03 · Course Page metadata applied — Course Detail v10

SK-11378 landed (`_media/Course_metadata.xlsx`): 73 fields, eight endpoints with real payloads from
`course-v1:SkillUp+SQL-TMDA+2025_B13`, 33 features, and a role-based visibility matrix. Full
element-by-element mapping in [course-details-metadata-map.md](course-details-metadata-map.md); the
delivery is logged in `session-log.md`.

- **`Course Detail — v10 · metadata applied (SK-11378)`** built in Platform Pages V8, alongside v9 and
  the workshop panel, which are untouched. Two annotation panels added: **metadata audit** (what has
  data behind it) and **what changed**.
- **Tabs settled — against the room.** `tabs[]` returns Course, Progress, Dates, **Mentorship Q&A** and
  Instructor. No Resources tab, no Grades tab, **no Certificates tab** — grades sit inside Progress and
  the certificate is a card. v10 renders the four a learner receives; Instructor is per-user and staff
  only. This closes the divergence flagged on v9, and it contradicts what Navdeep expected (01:32:08).
- **Syllabus collapsed to Module → Topic.** Their `sequential` level is a fixed three-part bucket —
  *About*, *Lessons*, *Knowledge Check* — repeated in every module, not a lesson. Read literally the
  accordion would say *Module 1 → Lessons → 15 topics* with two dead rows above it. The workshop's own
  fallback (*Module → Topic where a lesson does not exist*) covers it. Counts now read in topics.
- **Three elements added, each backed by a real field:** welcome message banner (`welcome_message_html`,
  dismissible), certificate card (`cert_data`, drawn not-earned to match 38%), handouts card
  (`handouts_html`) — which is what "course-level resources" turns out to be, the thing nobody could
  define at the workshop (01:19:44).
- **What has no data was kept and flagged, not deleted:** every duration on the page (`effort_time`,
  `effort_activities` and `due` are null on every block in every payload), the unlock tooltip
  (`accessible` is a boolean — no date, no prerequisite: that is the answer to open action 8, and it is
  a negative one), *What you'll learn* (no description or objectives field is exposed), the mentor card
  (no such record exists), the course image and the IBM logo (`org` returns `"SkillUp"`), and the topic
  type prefixes (`icon` has four values against a catalogue of twelve and returns only `other`).
- **Resume vs Start resolved** — `resume_course.has_visited_course`, closing an open workshop question.
- **Structural notes for dev:** the topic level is **not in the Outline API** (every sequential returns
  `children: []`) — it needs a second call to the Navigation API, cached one hour — and `lms_web_url` is
  null on verticals there, so topic deep-links must be constructed as `jump_to/{block_id}`.
- **Droppable with evidence:** `verified_mode`, `can_show_upgrade_sock`, `access_expiration` and `offer`
  all return null or false on the real course. Upgrade sock, discount banner and expiration warning are
  stock edX marketplace furniture this B2B configuration does not use.
- **Still unbuilt but backed by data:** dates widget, course tools (**Bookmarks** is in the live
  response), content search, weekly learning goal, and the ended / enrol / missed-deadline banners.
- **`Course Detail — Unenrolled (signed in, can enrol)`** drawn — the state sheet 4 names and nobody had
  ever drawn. The titles are **not links**: `lms_web_url` comes back null, so they render as plain text
  rather than as a disabled interactive style, which is the detail most likely to be built wrong. No
  ticks, no percentage, no lock. **Course is the only tab** — Progress and Dates answer 401, and a tab
  that returns an error is worse than a tab that is absent. The progress card becomes an enrolment card
  from `enroll_alert {can_enroll, extra_text}` and `course_modes[0].name`.
- **The three branches drawn too**, each turning on one value.
  **A · public access off** — `course_blocks` comes back empty, so the syllabus is not a locked list, it is
  nothing; *"4 modules · 42 topics"* goes with it, since those counts are derived from the tree, and the hero
  statistics line is hidden rather than zeroed; the card drops to *"Self-paced"*, the only shape fact that
  survives because `is_self_paced` comes from the metadata call. About a third of the enrolled page.
  **B · anonymous** — `username` null: the Learn and Progress groups and the account chip give way to Sign in
  and Create an account, the breadcrumb loses *My Learning*, Enrol becomes Sign in with the return path
  stated, and the mentor's actions go. A and B compound.
  **C · `can_enroll: false`** — the primary action **disappears rather than being disabled**, and
  `extra_text` takes its place (*"This course is full."*). A disabled button would invite a click that cannot
  succeed and would not say why; the sentence does both jobs.
- **The certificate stays a card, and the reasoning is now written down.** `cert_data` is four fields —
  a card's worth, not a page's; Certificates already exists as an account-level destination in the left
  nav, so a course tab duplicates it; and Harpreet's own marketing argument (01:31:57) favours something
  *seen* over something a click away. It becomes a tab when there is a credential page behind it —
  preview, share, verification link, name on certificate — which is phase two. To confirm at review.
- **The whole thing is documented on the canvas.** The section is renamed *Course Detail — v9, v10,
  unenrolled, and the SK-11378 documentation* and carries four reference tables under
  *Reference — Course Page metadata, SK-11378*: element → field (36 rows, with a ✅ / ◑ / ⚠︎ / ✗ verdict
  on each), the eight endpoints with payloads and caching, the role-based visibility matrix, and a
  decisions-and-open-questions table naming owners. Node IDs listed in
  [course-details-metadata-map.md](course-details-metadata-map.md) §10.

## 2026-08-03 · Results screen rebuilt, and the retry question settled

- **`LMS / Quiz · Results`** — four variants (Passed, Not passed, Pending, Withheld) on the layout from
  the prototype, which was better than what the DS had. No per-question circles; no dash standing in
  for an absent score; and the attempts line now says what it counts — *"1 question still has attempts
  left"* rather than the ambiguous *"4 attempts · Unlimited retakes"*.
- **Retry incorrect vs Retake quiz — the assumption was backwards.** Neither exists as an edX feature,
  but attempts are counted **per problem**, so re-answering only the wrong ones is essentially native;
  what is missing is a UI that collects them. The *full* retake is the invented one: there is no
  subsection attempt object, and `reset_problem()` does not refund a spent attempt, so a retake burns
  one on questions the learner already got right. `Retry incorrect` is therefore the **primary**
  action and `Retake quiz` the secondary — drawing them the other way round would make the expensive
  path look like the default.
- **Answer inputs rebuilt on the DS.** Dropdown now uses the DS `Select`, numerical and text use
  `Input field`, so focus, disabled and destructive states come from the design system. Dropped the
  destructive styling on incorrect: it turns the *answer-format hint* red, which implies the format
  was wrong when the learner may have had the format right and the value wrong.
- **New Figma section `04.4 · Pass mark — a target, not a gate`** — the Coursera rail reconstructed,
  what Open edX gives us (nothing), and DO/DON'T copy examples.
- **"Review lesson first" is buildable.** The vendor's "linking is not possible" applies to content
  authored inside the problem block. Our shell resolves the parent module from course structure, so
  the affordance stands — it just must never be authored into feedback.
- **Open with the vendor:** is Show Reset Button enabled, and what Maximum Attempts are set per
  problem? Those decide whether a full retake is reachable at all. Recorded in `session-log.md`.

## 2026-08-03 · Quiz screen matrix — and a pass mark that does not exist

New **`quizzes/06-quiz-screen-matrix.md`**: crosses the platform settings into the finite set of
learner-reachable screens. 14 question states, 15 quiz states, a 32-screen inventory marked built vs
to-build, flows per type, and the combinations that cannot happen. **Nine of thirty-two are built** —
and the gap is not the exotic cases, it is the locked, closed and withheld states, which is where
learners get stuck and support tickets come from.

Source research against `edx-platform`, `xblocks-contrib`, `frontend-app-authoring`,
`frontend-lib-special-exams` and `edx-proctoring` on `master`:

- **⚠︎ There is no pass mark at quiz level.** `GRADE_CUTOFFS` is course-wide; a subsection has no
  passing threshold. Our screens say "Pass mark 70%", "You needed 60% to pass", "Passed" / "Not
  passed" — **none of it comes from the platform.** Either the per-quiz verdict goes, or the pass mark
  becomes authored metadata we require from content. Biggest gap between what we drew and what the
  backend can answer.
- **⚠︎ `grading_method`** (last / first / highest / average score) renders *"Grading method: Last
  Score"* to learners and is **absent from the educator docs entirely**. Our "best score kept" copy
  must match the configured method, not assume it.
- **A timer forces the whole exam experience** — entry gate, End My Exam, staff-only reset. There is
  no such thing as "a 10-minute quiz" without inheriting the exam UX.
- **True/False is not a separate type** — it is single select with two choices. The picker has exactly
  five: single select, multi-select, dropdown, numerical input, text input.
- **Hints are paginated** — *"Hint (1 of 3):"* with a Next Hint control. We built a single block.
- **`max_attempts = 0`** is a survey question: closed from first render, but Save and Reset stay.
- **Corrected `01-edx-quiz-capabilities.md`**: two Show Answer rows were swapped. `attempted` means
  "attempted OR past due" (Studio labels it "Attempted or Past Due"); `attempted_no_past_due` is the
  one labelled "Attempted". Also `answered` means *correct*, not answered, and the default is
  `finished`.

## 2026-07-30 · Two vendor sessions — quiz types confirmed, Course Page data requested

New **`session-log.md`** — a record of who said what, when, and how sure they were, with every
capability claim tagged CONFIRMED / ASSERTED / CONFLICT / UNVERIFIED. The specs say what we decided;
this says where it came from.

- **Quiz question types — RESOLVED** (Studio walkthrough with Simran Jindal). Multiple choice (~90%
  of usage), checkbox, multiple choice / checkboxes **with hints and feedback** (being adopted now),
  dropdown (rare), numerical input (rare). Staff graded points is an assignment, not a quiz. Closes
  the workshop's action 4. Detail in `quizzes/04-quiz-experience-spec.md` §9.
- **Hints are a design gap.** We built feedback but not hints. They are different moments: a hint is
  the recovery path *inside* an attempt, feedback is the explanation *after* it.
- **"Unlimited retakes" is not a thing.** Open edX has no unlimited setting; authors set a high
  number, and an unset timed exam defaults to **one** attempt. Our screens must stop claiming it.
- **Linking from a quiz to a module is not possible in authored content** — not in questions, not in
  feedback. This does *not* kill our "Review module first" button: that is shell chrome resolved from
  course structure, not authored text. Recorded so nobody reads the limit too broadly.
- **⚠︎ CONFLICT on navigation.** The vendor believes restricting question-skipping "should be
  possible" but has never done it. Our source research says it is not configurable at any level.
  Nelson now has dev-environment access — verify before either side plans on it.
- **Course Page metadata requested** — Jira **SK-11378** (Critical, Sprint 111, information-gathering
  only, no acceptance criteria). Metadata, API payloads, feature inventory and supporting docs, plus a
  Studio course-structure export in Excel. Expected Tue/Wed; the developer has two days. The Course
  Page design stays blocked until at least the metadata section lands.

## 2026-07-30 · Quiz navigation researched — and a data-loss risk found

Asked whether Open edX lets a course team control moving back and forth between questions before
submitting. Researched against `edx-platform`, `frontend-app-learning`, `frontend-lib-special-exams`
and docs.openedx.org. Full record in `quizzes/04-quiz-experience-spec.md` §8.

- **No such setting exists, at any granularity.** Navigation inside a subsection is always free-form.
  `hide_from_toc` only blocks *leaving* the subsection (and is a section-level, operator-gated flag
  absent from the new authoring MFE); timed/proctored exams add a timer and an entry gate but leave
  navigation untouched; prerequisites gate whole subsections. Nothing in `capa_block.py`.
- **The real finding: an unsubmitted answer is silently lost on navigation.** There is no autosave and
  no unload guard, and `should_show_save_button()` returns False when attempts are unlimited — so on
  the **practice** path there is not even a Save button. Graded (2 attempts) and Final (1) do get one,
  but only via a manual click. The learner's *position* is remembered; the answer is not.
- **Consequence:** this is ours to solve in the shell, not a platform setting to configure. The shell
  holds unsubmitted selections in client state and calls `problem_check` only on submit; edX's own
  Save affordance must never be surfaced; and the "still unanswered" counter must be computed from
  submitted answers so it cannot over-report.
- **So "can the learner go back?" is a product choice we implement**, not a toggle we switch. Free
  review is the platform default and the accessible behaviour; restricting it is custom work and
  should be justified against that cost.

## 2026-07-30 · Quiz progress moved inside the quiz container

- `LMS / Quiz · Question Card` now carries the progress row at the top, behind a **`Show progress`**
  boolean (default true), so progress sits in the same box as Skip/Submit. The four standalone
  progress instances above the card (three flows + canonical) were removed to avoid duplication.
- Rationale: inside the box reads as *within the quiz*, outside as *between topics*. The same rule
  answers the "navigation is confusing" report — two paginations competing in one visual plane.
- **Per-question circles marked `_Remove` in the DS.** `LMS / Quiz · Rail Item` → `_Remove · LMS /
  Quiz · Rail Item`, and the `Questions Progress` variation `Quiz · Progress Rail` → `_Remove ·
  Progress Rail`. Verified zero instances of either before renaming, so nothing broke. They are
  marked rather than deleted so a stray reference surfaces loudly; delete once nothing points at them.
  This closes the question for good: the circles are gone as a progress indicator *and* as a review
  interaction, not just relocated.

## 2026-07-29 · Stakeholder workshop — quiz + Course Details decisions applied

Applied the decisions from the ICP workshop with Navdeep and Harpreet (see
`topic-types-inventory.md` §8 for the full record and the rationale).

Verified line by line against the meeting recording — the AI-generated notes were wrong on two
points (the prefix decision was stronger than "don't hardcode"; tabs were *not* left undecided).

- **Quiz — prefix functionality removed entirely.** Not just switched off: the `Show prefix` and
  `Prefix` properties and the prefix layer are deleted from `LMS / Quiz · Option Row`. Navdeep:
  *"We should not provide any functionality of putting a prefix to them"* — a switch nobody will use
  is still dev cost. Reason prefixes are wrong at all: they break option randomisation.
- **Quiz — Disabled state fixed** in the DS (`LMS / Quiz · Option Row`): the row keeps its white
  surface and full-contrast label, only the checkbox/radio is dimmed. Greying the whole row hurt
  readability exactly when learners read the feedback.
- **Quiz — optional metadata rule documented** (duration, attempts, pass mark): render only when the
  backend supplies them; no placeholders, no dashes, no zeros.
- **Course Details rebuilt** as `Course Detail — v9 · Self-paced MVP` (Platform Pages V8), with the
  pre-workshop frame kept alongside as *superseded*. Example course switched to **Six Sigma** to match
  the ICP. Self-paced only; syllabus runs Module → Lesson → Topic with clickable titles; ticks only
  (no current-position marker); no syllabus page, no module-level %, no repeated completion dates, no
  L1/L2/L3 numbering, no course-level resources or assignment deadlines, no cohort/programme cards.
  Unlock info moved from the module subtitle into a tooltip on the lock, and "Locks" corrected to
  "Unlocks". Course stats moved out of the hero to sit under Course Info.
- **⚠︎ Known divergence — tabs.** The workshop decided the tab mechanism stays with Resources and
  Grade as phase two, and expected Grades + Certificates as tabs. The v9 frame is a single page. Kept
  deliberately as an MVP simplification, flagged on the frame and to be agreed at the review.
- **Also applied** (decided in the room, absent from the AI notes): "View submission" and "See
  feedback" are now the same tertiary button; "Submit — final" is now "Submit"; **em dashes removed
  from quiz interface copy** (results heading, description, question text, topic headers, inline
  alerts); the quiz progress now uses the new `Quiz · Progress Bar` variant; the prefix demo column is
  retired. Verified as already correct: "Review module first" was secondary, radio/checkbox literal.
- **Em dashes swept from all components and screens** — 85 text nodes across the ICP screens, 35
  across the LMS component library, each rewritten with the punctuation the sentence needed rather
  than a blind substitution. Canvas annotations and the Untitled UI stock pages were left alone. The
  `Results Summary` pending state no longer shows a bare dash for an unknown score; it reads
  **Pending**.
- **Quiz paginator semantics recorded:** the percentage is **answered ÷ total, not position**, so
  reviewing an earlier question never shrinks the bar. The DS placeholder had three different numbers
  in one component (label 2 of 5, text 67%, bar 70%); all four instances are now consistent.
- **Stock `Progress bar` component fixed** (`1085:57382`, 55 variants). Its `Label=False` family
  mapped the fill from 44 px at 0% to 320 px at 100% instead of 0 to 320, so every value read high and
  the error grew as the percentage fell: 50% drew 57.5%, 20% drew 31.6%, and **0% drew a 13.8% stub**
  of progress for a learner who had answered nothing. Not a scaling problem — the master ratios were
  wrong. All 11 variants re-cut, the 0% sliver removed from the four labelled families, all 55
  verified accurate. Affects every progress bar in the product, not just the quiz. The quiz paginator
  itself uses `Label=Right`, whose ratios were already true — only its 0% sliver needed clearing.
  Verified after publishing: canonical draws 50.4% on "Question 6 of 10", flows draw 20.1% on
  "Question 2 of 5".
- **Per-question circles — resolved.** They were briefly contested: the workshop dropped them, then
  the stepper decision made them the navigator. The new `Quiz · Progress Bar` variant settles it by
  delivering exactly what the room asked for (question X of Y plus a bar) while the stepper's
  Previous/Next carries the navigation the dots used to. The circles are out, in the DS and the
  prototype. No further ruling needed.
- **Still outstanding on the quiz:** "Review module first" must hide when the quiz has no linked
  module; the score colour rules are unspecified (red vs amber for a fail unresolved); and the
  `Results Summary` component still carries the em-dash heading as its library default.
- **Licence (CC) scope** — validated against docs.openedx.org: edX shows the *course* licence at the
  bottom of every content page plus an optional per-video licence on the player. Interim: Video only;
  final scope pending a product decision.

Open after the workshop: course-unlocking research, the definitive quiz question-type list,
interface copy rules, DS differentiation of buttons/links/pills/tags, micro-animations, navigation
strategy, and edX metadata export.

## 2026-07-29 · Quiz layout corrected — a stepper, not a forced scroll

A platform claim this package had been repeating was **wrong**, and the design that followed from it
is reversed. The spec asserted Open edX forces a single stacked scroll because "a unit stacks
multiple components". Checked against primary sources (docs.openedx.org, the Open edX glossary,
`frontend-app-learning` ADR 0002 and its `SequenceNavigation` components), that inference does not
hold — and it contradicted this package's own definition of Subsection.

- **The subsection *is* the quiz-level container** — grading, timed/proctored config, navigation.
- **The platform ships a stepper.** `SequenceNavigation` renders one tab per unit plus
  Previous/Next; the glossary defines the *"unit navigation bar… an icon for each unit in the
  selected subsection"*; `{current} of {total}` is already computed. **One `problem` per unit yields
  a question-by-question stepper natively, with no custom code.** Stepper vs. scroll is an
  **authoring** choice, not a platform limit.
- **What Open edX genuinely lacks** is narrower: no per-question counter, no quiz-level submit-all,
  no end-of-quiz review/summary screen. Our shell supplies all three.
- **Decision — adopt the stepper.** Applied in the prototype: entry header → one question per step
  (unit navigator + Previous/Next question) → results summary; submit stays per question. Recorded
  in `topic-types-inventory.md` §8 and `quizzes/04-quiz-experience-spec.md` §1.4-0c/0d.
- **Competitive comparison added** (`quizzes/02-coursera-quiz-benchmark.md` §7): Coursera is
  single-scroll, Udemy and LinkedIn are steppers, Canvas and Moodle make it an instructor setting.
  Coursera's no-navigator minimalism is affordable only because retries are effectively unlimited —
  **our graded path allows 2 attempts at the whole quiz**, so that trade does not transfer.
  *(Corrected 3 Aug 2026 — this line originally read "per question". An attempt is one run through
  the quiz. See `quizzes/04-quiz-experience-spec.md` §9.3.)*
- **Briefly conflicted with a workshop ruling, now resolved.** The room had decided to drop the
  per-question circle indicators, while the quiz was one scroll and the dots were decoration. The
  stepper turned them into the navigator, which reopened the question. The new `Quiz · Progress Bar`
  variant closes it: the room's ask (question X of Y plus a bar) is what ships, and Previous/Next
  carries the navigation. Circles out, in both the DS and the prototype.
- **Consequence to plan:** existing quizzes must be **re-authored in Studio**, one question per unit.
  Content migration to sequence and cost with Rashid.

## 2026-07-29 · Encyclopedia reframe — two tracks (ICP + LMS) + Archive

Reframed the repo/hub as the **project encyclopedia** around the two big tracks:

- **ICP** — Immersive & Content Types (the in-topic experience) · **LMS** — Platform Pages
  (dashboard, my learning, course/program, calendar, live sessions) · **Foundations** — Design
  System / decisions / research (serves both).
- **Track nomenclature retired A/B → ICP / LMS / Foundations** across the decision log (23 ADRs
  reclassified + INDEX filter-by-track), root README, and hub.
- **`06-v8-complementary/` → `06-platform-pages/`** — now the LMS-track home; V8 Complementary is
  its current WIP artifact.
- **Hub `index.html`** reorganized into ICP · LMS · Foundations · Open Actions · Archive sections;
  Track filter is now ICP / LMS / Foundations.
- **Archive** — the old **v1.8** discovery-hub snapshot moved to `archive/index.html` (linked from
  the hub), so the index shows only the current version.

## 2026-07-28 · Repository reorganization (structure, not a DS version)

Folder-level reorg — the DS version of record stays **v3.3**. Made the workspace self-explanatory
for three audiences (stakeholder / designer / dev):

- **New numbered structure at root:** `00-decisions/` (23 ADRs + INDEX, backboned from Figma
  `3832-18102`), `01-ready-for-dev/`, `02-content-types/` (wires `topic-types-inventory.md`, splits
  §7 into owned questions, promotes the 10-point registration rule), `03-design-system/` (rationale +
  footer-contract; points to the shipped tokens here), `04-research/`, `05-source-docs/`,
  `06-platform-pages/` (Track B). `LMS-HANDOFF/` kept as the deployed package (hybrid).
- **New registers:** root `README.md` (3-audience "start here"), `OPEN-ACTIONS.md`,
  `_archive/ARCHIVE-LOG.md`.
- **Heavy media** (456 MB `.mov`, Coursera captures, 7.9 MB HTML) → `_media/` (gitignored) + stubs.
- **Archived:** `Prework/` (intact — handed to another team), 5 `verify-*.png`, `session-ocr-partial.md`.
- **Stale fixed:** the "NOT YET PUBLISHED" caveats on v3.0/v3.1/v3.3 (published 2026-07-24); the old
  Figma slug in README/BA; "132 components" → ≈155 (recount pending); removed the orphan
  `design-system/maven-icons/` duplicate.
- **Hub (`index.html`):** audience (Stakeholder/Designer/Dev) + track (A/B) filters, This-Week
  Decisions · Ready-for-Dev · Open-Actions sections, status legend, hub-stale banner.

## v3.3 — 2026-07-24 (current) · Accessibility layer + softer decorative borders

> ✅ **PUBLISHED IN FIGMA 2026-07-24.** 1052 variables · 18 CVD primitives · verified 1:1 against
> `tokens/colors.css` (zero divergences). The earlier "DS variables changed, consumers still see
> v2.0" blocker is **resolved** — the triangle (Figma DS · CSS handoff · prototype) is aligned.

### Accessibility Standards (see `variable-collections-guide.md`)

Three axes orthogonal to skin and theme, documented on the Figma page **`♿ Accessibility Standards`**:

- **Colourblind-safe states** (`data-vision="cvd"`) — retunes success/warning/error to an
  Okabe-Ito red-green-safe palette. State colours collapse under CVD (warning ≈ error, ΔE 3.9 for
  deuteranopes); the safe palette separates by blue-yellow + lightness (ΔE ≥ 18), all tiers AA.
  **18 new primitives** `Colors/SKO-Brand/CVD/*`, verified 1:1 against the prototype CSS. The
  `[data-vision]` override lives in CSS (Figma can't conditionally alias across axes).
- **Text size** (`data-text-size`, `--sk-font-scale`) — 100 / 115 / 130%, `.sk-text-*` via calc.
- **Behaviour flags** — reduce-motion, underline-links, large-targets. CSS-only, never variables.

Implemented and running in the prototype (demo panel → Accessibility Standards). Prototype-first;
the DS codifies the values + documents the mechanism.

### Softer decorative borders

`border-secondary` was too heavy (N04). Softened both modes: light → `Neutral/150` (`#d5dce2`),
dark → `Dark-Neutral/650` (`#2c3d45`). Decorative border, exempt from the 3:1 non-text rule.

## v3.1 — 2026-07-22 · Prototype sync — attribute, solid tokens, video stage

> ✅ Published as part of the v3.3 library release (2026-07-24).

Aligns the DS with the deployed prototype (`lms-prototype-mu.vercel.app`), which already consumed
`--sk-*`. A full diff (408 → now 456 comparisons) drove the changes below. See
`modules/skin-switcher/PROTOTYPE-SYNC.md` for the prototype-side work.

### ⚠️ Breaking

- **Attribute `data-brand` → `data-skin`.** The prototype uses `data-skin`; the DS aligned to it
  (lower friction — the DS side wasn't published). `colors.css` and the skin-switcher module both
  updated. Markup using `data-brand` now silently falls back to SKO.

### New tokens (created in Figma)

Rule applied: DS is the source, tokens mirror both ways, and a *fundamental* prototype-only token
is created in the DS too.

- **`bg-success-solid` + `fg-success-on-solid`**, **`bg-warning-solid` + `fg-warning-on-solid`** —
  the prototype had success/warning solid fills but the DS only had `bg-error-solid`. Created to
  complete the triad. The prototype's `warning-solid` (`#ac7720`) failed AA with *any* label
  (white 3.88, dark 3.95); the DS uses `#f9c654` (Yellow/300) with a dark label, 9.64:1.
- **`bg-brand-stage`** — the video-stage backdrop. The prototype derived it as
  `color-mix(#26708e 58%, #000)` with the teal **hardcoded**, so it was dark teal in every skin
  (a bug). In the DS it follows the skin (each ramp's step 900) and is theme-stable.

### Not mirrored (with reason)

- **`fg-like`** — resolves to `#0086c9`, which *is* `fg-progress`. A semantic duplicate, not
  created. The prototype should point `fg-like` at `fg-progress`.

### Prototype still to do

The prototype must adopt `colors.css` v3.1 wholesale — its brand colours are still derived with
`color-mix()` from an anchor instead of using validated ramp steps, which reintroduces the
dark-hover-darkens bug fixed in v3.0. Three DS tokens are also absent there, including
`border-focus-ring` (WCAG 2.4.7). Full checklist in `PROTOTYPE-SYNC.md`.

### Validation

38 LMS tokens · 456 Figma↔CSS comparisons, 0 divergences · 552 contrast checks, 0 AA failures.

## v3.0 — 2026-07-22 · Skin system, dark surface ladder, primitive-layer cleanup

> ✅ **PUBLISHED IN FIGMA 2026-07-24** (as part of the v3.3 library release). Consumers now see
> v3.x. One residual nuance, non-blocking: the visual changes were validated by contrast maths and
> published on Nelson's call — a formal human side-by-side review of the 6 skins was never run.

Triggered by a review of the DS against dark-theme best practice. What started as a colour audit
surfaced structural problems: the skins were hand-picked values with no rule, and the primitive
layer carried role names instead of values.

### ⚠️ Breaking

- **`[data-brand="x"]` no longer exists.** The green demo BrandX was replaced by 5 named skins:
  `gold`, `violet`, `sky`, `red`, `ink`. Markup using `data-brand="x"` silently falls back to SKO.
  New usage: `<html data-brand="ink" data-theme="dark">`.
- **Light-mode text is visibly darker.** `text-secondary`, `text-tertiary`, `text-brand` and
  `text-brand-secondary` all changed. This affects every screen — see "Text hierarchy" below.

### Skin system — from hand-picked to systematic

The 5 non-SKO skins had **42 of 60 values as raw hex**, bypassing the primitive layer entirely.
Only SKO was fully aliased. Each skin now has a **12-step ramp generated in OKLCH** from two
preserved brand anchors (`solid-dark` = 400, `solid-light` = 600), plus 2 deliberately desaturated
surface anchors outside the ramp.

Roles map to fixed positions — no per-skin choices. **0 raw hex values remain.**

This was not cosmetic: the Ink skin's brand text sat at **3.50:1**, below even the 3:1 floor. It
failed because the value was picked by hand. With `text-dark` fixed at step 300, that class of bug
cannot recur.

### Dark mode

- **Surface ladder implemented.** The v1.9 "known limitation" (`bg-secondary` = `bg-primary`, both
  `#212934`) is resolved — 4 distinct surfaces ~1.07:1 apart (`Dark-Neutral/950→700`).
- **Hover now lightens** (step 300) instead of darkening. 5 of 6 skins were darkening on hover,
  which sinks the control against the surface.
- `bg-error-solid` desaturates in dark (`#E26567`) with a dark label — it was the only token in the
  system that never inverted.

### Primitive layer — values, not roles

Role names were removed from `_Primitives`. `Surface-Base` → `Dark-Neutral/950`, `Teal-Text` →
`Dark/Teal/300`, and so on. `Primary` and `Neutral` were numbered by luminosity in the
`{step}_{brand_code}` format the accent ramps already used — brand-guideline codes are preserved.

The single exception is **surfaces**, and it is measured, not convenience: every dark surface falls
below the darkest step of the ramp it would belong to. They live in explicit `Surfaces/` groups.

### Text hierarchy (light)

`bg-tertiary` (`#E1E7EC`) imposes a ceiling of L ≈ 40% on any text over it. The old values were
above that ceiling and failed AA. Two new interpolated Neutral steps were created to fix it:

| token | was | now | worst case |
|---|---|---|---|
| `text-secondary` | `#606B7A` | `#39414C` — `Neutral/800` | 4.34 → **8.28** |
| `text-tertiary` | `#677482` | `#4F5B69` — `Neutral/700` | 3.83 → **5.55** |
| `text-brand` + `-secondary` | brand step 600 | brand step **700** (950 on Ink) | 4.29 → **6.13+** |
| `text-error-primary` (light) | `#DA3336` | `#B62226` — `Red/600_AC3` | 3.74 → **5.19** |
| `text-error-primary` (dark) | `#E8797B` | `#F3AFB0` — `Red/50` | 4.34 → **6.74** |

**Side effect worth naming:** `text-secondary` and `text-tertiary` were 3pp of luminosity apart —
visually the same colour. The hierarchy existed in the tokens but not on screen. They are now 10pp
apart, and primary→secondary 13pp.

### Validation

Contrast coverage went from **16 checks to 540** (9 text tokens × 4 surfaces × 12 skin/mode
combinations, plus 9 explicit semantic pairs). **0 AA failures.**

The v1.9 claim of "16/16 AA per mode" was true but far too narrow — it only tested against
`bg-primary`. Testing against elevated surfaces is what exposed every failure fixed above.

**Validation must auto-discover tokens from `tokens/colors.css`, never from a hand-written pair
list.** Hand-written lists missed tokens three times during this work; the last miss caught
`text-brand-primary` and `text-brand-secondary`, never tested before.

Thinnest pair in the system: `text-success-primary` over `bg-tertiary` in light = **4.51:1**.
Passes by 0.01 — re-validate if either value moves.

### Removed

`!!! ABOUT THIS COLLECTION` (4, content preserved in `variable-collections-guide.md`) ·
`Dark/Teal-Solid` (orphan) · `Skins/Font/family-*` (2, dead duplicates of `Type/family/*`) ·
`Dark/Teal-Hover` (absorbed into `Teal/300`) · `Dark/{Success,Warning,Progress}` (repointed to their
accent ramps) · `hover_Y01_Yellow_Hover` (redundant alias) · 7 orphaned `Skin-Anchors`.

### Unchanged

- Typography tokens and the 47 text styles — untouched.
- Brand-guideline codes (`P01`–`P08`, `N00`–`N06`, `AA`/`AB`/`AC`/`AD` accents) — preserved.
  Numbering is additive, never substitutive.
- Dark-mode neutral text values — only light mode was retuned.

### Known debt

- `Type/family/*` sits in the `3. Responsive` collection, whose mode axis is breakpoints. Font
  family does not vary by screen size. See `variable-collections-guide.md` for why it was not moved
  and what should trigger the fix.

## v2.0 — 2026-06-25 · Token consolidation (--sk- namespace)

Consolidation of the DS tokens following the Design System Discovery and the V7 Immersive token-modes work. Closes the token system.

### Changes
- **Namespace migrated `--lms-*` → `--sk-*`** across `tokens/colors.css` and `tokens/typography.css`. One system namespace for all brands (never per-brand prefixes). The `sk` is the SkillUp Design *System*, not the brand.
- **Typography fixed to Montserrat** (body + display). The previous Inter primary was stale; Inter is not used.
- **Model documented** (see `../03-design-system/rationale/`): brand × scheme combined colour modes (live v1.9); a separate Breakpoints axis (Desktop/Tablet/Mobile) for size/space/radius; font-size uses Option B (chaining) for brand × breakpoint; radius/border vary by brand via role tokens that re-alias per mode; hex only in Primitives.
- **New component:** Input field gains a `Search` type (14 derivations) + reusable `Keyboard key` component with a togglable `Shortcut` property (DS file).

### Unchanged
- The 4 colour modes and all WCAG 2.2 AA validations from v1.9 stand (only the prefix changed).

## v1.9 — 2026-06-16 · 4-mode tokens + WCAG 2.2 AA validated

LMS colour system now operates across 4 modes on the UUI DS file (`c7EUDrQwP8si08aPipDSIV`), collection `1. Color modes`. Every mode passes 16/16 WCAG 2.2 AA contrast checks.

### Modes implemented

| Mode | Strategy |
|---|---|
| Light SKO (default) | Existing teal-on-white. border-primary upgraded N04 → N03 for AA pass |
| Dark SKO | Inverted backgrounds + lighter blues for brand. 4 fixes applied |
| Light BrandX | Green scale AB01-AB06 mirrors SKO blue structure. Demo brand |
| Dark BrandX | Lighter greens (AB04-AB05) on dark neutrals |

### New tokens

- **`LMS/Border/border-focus-ring`** — semantic token for WCAG 2.4.7 Focus Visible. Maps to brand colour per mode (P03 Light SKO / P05 Dark SKO / AB02 Light BrandX / AB04 Dark BrandX).

### New primitive

- **`Colors/SKO-Brand/Accents/Red/AC5b_Red5b` #E8797B** — added to fill the gap between AC5 (saturated red, 4.39 on dark, fails AA by 0.11) and AC6 (pale pink). Gives 5.21:1 on dark. Used by `text-error-primary` in Dark SKO + Dark BrandX only.

### Key Dark SKO fixes

| Token | Was | Now | Reason |
|---|---|---|---|
| bg-brand-hover | Y01 Yellow (bug) | P02 Blue Ink | Leftover yellow from Light mode default |
| text-brand-secondary on badge | P05 (2.99) | P07 (7.5+) | Failed AA on bg-brand-section (P02) |
| bg-brand-solid + text-on-brand | P04 + White (3.94) | P05 + N01 dark (5.43) | Flipped contrast for dark mode button |
| border-primary | N04 (2.71) | N03 (4.20) | AA-compliant neutral |
| text-error-primary | AC5 (4.39) | AC5b (5.21) | New primitive |

### Token validation

DS swatch sheet at node `20022:429459`, page `❖ FOUNDATIONS`. Renders 4 columns side-by-side using `setExplicitVariableModeForCollection` — each column shows live token values + contrast ratio + ✓/✗ per check.

### Code consumption

`tokens/colors.css` now ships 4 mode definitions:
- `:root` → Light mode SKO (default)
- `[data-theme="dark"]` → Dark mode SKO
- `[data-brand="x"]` → Light mode BrandX
- `[data-brand="x"][data-theme="dark"]` → Dark mode BrandX

Toggle via root HTML attributes. No JS required — CSS attribute selectors handle the switch.

### Known limitations

- `bg-secondary` = `bg-primary` in Dark modes (no intermediate dark neutral in scale)
- BrandX is a demo brand. No client behind it.
- WCAG 2.5.8 Target Size validated in screens, not in DS.

## v1.8 — 2026-06-15 · DS migration + handoff page conventions

Major restructure of the Figma handoff. Three new pages built, 132 LMS Extension Components migrated to the DS library, all working-file handoff instances now point to DS-hosted masters.

### DS migration

- **132 LMS Extension Components moved** from working file (`Wz2TCYFVr0hD8tJNiLajLt`) to DS file (`c7EUDrQwP8si08aPipDSIV`) on new page `❖ LMS COMPONENTS ✅` (`1030:33572`)
- 40 top-level masters + 92 variants inside sets
- All instances in handoff screens swapped via `importComponentByKeyAsync` + `swapComponent` — 99.7% remote in Section 02
- Local backup copies kept on the working file Playground page for reference until next major DS sync
- Component keys saved in auto-memory `reference_uui_lms_components_keys.md`

### New variant: LMS / Empty State · Kind=Transcript

- Title: "Transcript not available"
- Body: "Captions aren't available for this video. You can still take notes from the Notes tab."
- Icon: align-left (DS 3463:406358)
- CTA: "Add note"
- Use when a Video topic has no captions — applied automatically on Transcript tab empty state

### New handoff pages

- **`↳ Phase 1 - Video Lesson - Ready for Dev ✅`** — 15 cards (5 rows × 3) with hierarchical numbering (1/1.2/1.3 for Transcript, 2/2.2/2.3 Notes, 3/3.2/3.3 Downloads, 4/4.2/4.3 Player states, 5/5.2/5.3 Note Editor Modal). Each card uses Handoff card header + Subheader + screen-wrap (#C6D0E3) + Page Changelog Header (slot-based).
- **`↳ Phase 1 - Overlay Panels - Ready for Dev ✅`** — 6 cards (2 rows × 3): Notifications D/T/M + Saved D/T/M.
- **`↳ Phase 3 - Completion + Certificate - WIP 🟠`** — 6 cards (2 rows × 3): Course Complete Modal D/T/M + Certificate D/T/M. All descriptions flagged as Phase 3 placeholders with Phase 1 baseline notes.
- **`↳ Diagram Flows + Business Logic`** — Navigation flow diagram + new Business Logic section: 42 Business Rules (8 domain cards), 10 Key Decisions callouts, 24 Reference Document links (BA + Formal + Engineering handoffs).

### Handoff page conventions (now enforced)

- Page name format: `       ↳ Phase X - Flow Domain - Status [emoji]`
- Outer section BG: `#B7B7B7` · screen-wrap inside cards: `#C6D0E3`
- Pages live under parent `READY FOR DEV ✅`, ordered by Phase then logical flow
- Saved to auto-memory `reference_handoff_page_conventions.md`

### DS contributions (Status badges + Card chrome)

- **Status badges** added to DS Design Annotations page: Status/Deferred (`19951:1957`), Status/Draft (`19951:1959`)
- **Handoff card header** promoted to DS component (`19952:1961`) with props: Sequence#0, Title#0, Status#0 (INSTANCE_SWAP), Phase#0 (INSTANCE_SWAP), Show Sequence#0 (BOOLEAN)
- **Page Changelog Header** uses native Figma SLOT primitive (Option D) for dynamic Recent Changes
- All keys saved in auto-memory `reference_uui_handoff_keys.md`

### Cleanup

- 10 inline Figma annotations migrated to Page Changelog descriptions, then removed
- Duplicate orphan card frames cleaned from Diagram Flows page
- Page-level Page Changelog Header removed — kept only per-card
- Figma Link hidden in all Subheaders (per Nelson's call)

**Deferred to Nelson**: 5 clones manual reflow (Cards 2.2/2.3 Notes Tablet/Mobile + 3.2/3.3 Downloads Tablet/Mobile + 5.2/5.3 Note Editor Tablet/Mobile). ⚠ warnings stay in descriptions until reflow done.

---

For v1.0 → v1.7 release notes, see [`history/CHANGELOG-archive.md`](history/CHANGELOG-archive.md).

## Aug 7, 2026 — layer names audited on the DS LMS components page

Same audit as the ICP page, run on `❖ LMS COMPONENTS ✅`. **355 of 7,700 nodes carried a default name** —
`Frame`, `Frame 418`, `Rectangle`, `Ellipse 1`, `Group 1620`, `star`.

**The DS needed a different rule from the ICP page, and it is worth writing down.** On the ICP page names
were derived from each layer's own content. That is wrong inside a component set: **Figma matches layers
across variants by name**, so naming the same logical layer `label · Correct` in one variant and
`label · Incorrect` in the next would break override propagation between them. So inside sets, layers were
grouped by their index path and **every layer in a group got one name**, taken from whichever variant had
text to offer.

| Where | Count | Treatment |
|---|---|---|
| Inside instances | 136 → 33 remaining | **Left alone.** They mirror their own component; renaming creates an override that stops tracking |
| Inside variant sets | 87 | One name per index-path group, applied to every variant |
| Inside single components | 71 | Named from content |
| Loose on the page | 61 | Named from content |

322 layers renamed, by prefix: `label ·` 134, `shape ·` 102, `block ·` 31, `slot ·` 22, `group ·` 15, plus 18
diagram connectors.

**Verified after the pass:** zero default names outside instances, and **zero cases where one logical layer
ended up with two names across variants** — the check that mattered, since that is the failure this approach
was designed to avoid. The 128 index paths that do differ between variants were already different layers —
`LMS / Completion Status` genuinely has `check-icon`, `dot` and `status-circle` at the same position — not
damage from the rename.

## Aug 8, 2026 — `Show state-check-icon` made real, except where it should not be

The property claimed to control the state marker on `LMS / Quiz · Option Row` and only did so on one of the
four variants that have a `state-row`. Now bound on three — and deliberately not on the fourth.

| Variant | Property does |
|---|---|
| `Correct` | hides the ✓ **and collapses the row with it**, so no stray 12px gap is left behind |
| `Incorrect` | same, for the ✗ |
| `Correctly unselected` | hides the *"Un-selected is correct"* marker — there is no icon there, the text is the marker |
| `Missed` | **nothing, on purpose** |

**Why `Missed` is left unbound, and it is not tidiness.** Binding it was tried first, and a probe caught the
consequence immediately: a bound layer takes its visibility from the property, and the property defaults to
`true` — so `Missed` started rendering a green tick it had never had. One boolean cannot default `true` for
`Correct` and `false` for `Missed`; the variant was carrying that decision, and binding it threw the decision
away.

That decision is the rule Nelson set the same day: **a correct answer the learner did not choose shows green
with no tick, because a tick reads as praise for an answer they got wrong.** Leaving the icon hidden at
source keeps it true by construction — nobody can switch it on by flipping a property, and a new instance
cannot default wrong.

Written into the component description, including the instruction not to bind it.

**Verified by probing each variant** — instantiate, read, flip the property, read again:

| Variant | default | property off |
|---|---|---|
| Correct | icon shown | icon hidden, row collapsed |
| Incorrect | icon shown | icon hidden, row collapsed |
| Missed | icon hidden, text shown | unchanged |
| Correctly unselected | text shown | text hidden |
