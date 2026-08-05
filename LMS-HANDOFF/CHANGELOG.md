# Handoff Package Changelog

Current version. For previous releases see `history/CHANGELOG-archive.md` (v1.0 → v1.7).

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
  type prefixes (`icon` has four values against our ten and returns only `other`).
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
