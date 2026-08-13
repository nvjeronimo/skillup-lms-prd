# Quiz — two modes, A and B

*Created Aug 5, 2026 · Canonical definition of the two quiz experiences we are putting side by side.*

> **Status, updated Aug 13, 2026: Mode B is confirmed buildable and is being handed off.** The 8 Aug call
> settled the question the cost tags were hedging against — the LMS is no longer the edX LMS but a fresh
> front end over the same APIs, configured through an admin panel, so design is unconstrained as long as the
> functionality exists on the platform. Mode B carries no development premium. All three modes (A-1, A-2, B)
> go to the BA team; which one a given quiz topic uses is a content-team decision, made per quiz in the admin
> panel. Read the cost tags below as *what each difference is made of* — design, setting, authoring or build
> — not as a reason to prefer one mode.

Companion docs: [04-quiz-experience-spec.md](04-quiz-experience-spec.md) (full component spec, and the source
verification in §10) · [06-quiz-screen-matrix.md](06-quiz-screen-matrix.md) (every state) ·
[07-results-decisions.md](07-results-decisions.md) (pass mark, alerts, retry) ·
[../session-log.md](../session-log.md) (where each finding came from).

Figma: ICP page → section **`04.5 · Quiz — mode A (today) vs mode B (proposed) · in discussion`**.
Delivery frames: **`ICP Phase 1 - Quiz (A-1 + A-2) - Light`** and **`ICP Phase 1 - Quiz (B) - Light`**
(`5287:20301`, 36 screens — see `06-quiz-screen-matrix.md` §14.77).
Design system: `LMS / Quiz · Question Card` serves both modes — see §9.

---

## 1. Why two modes rather than one proposal

We can describe the improvement in a deck, or we can let people use both. The second settles arguments the
first one starts. So the prototype carries **both experiences at once**, selectable per quiz, and the same
questions run through either.

There is a second reason, and it is the practical one. **Most of the distance between A and B is
configuration and copy, not engineering** — verified by reading the Open edX source, not the documentation
(see `04-quiz-experience-spec.md` §10). Putting them side by side is what makes that visible: the room can
see what a settings change buys before anyone commits budget to the parts that are genuinely development.

---

## 2. The switch

**One property, at quiz level: `mode: 'A' | 'B'`.** A quiz is a subsection; the mode belongs to the quiz, not
to the question, not to the course. Everything below derives from it.

**Default in the prototype: `A`.** A is what exists today, so an unconfigured quiz behaves as production
does, and a reviewer who meets B knows someone chose it.

> **The design system defaults the other way, on purpose — and the two are not in conflict.** Drop
> `LMS / Quiz · Question Card` onto a canvas and it renders **mode B**, because B is what we are designing
> towards and it should be what you get without thinking. The prototype defaults to A because it is
> imitating production. One default protects the *comparison*; the other protects the *design work*. See §9.

---

## 3. What differs — the build list

Nine differences, numbered to match the Figma board so a comment on one refers to the same thing everywhere.
The **cost tag** is what it takes on the real platform, not in the prototype.

| # | A — how it works today | B — what we propose | Cost |
|---|---|---|---|
| 1 | No sense of position. Every question is in one unit, so the platform's counter reads "1 of 1". Previous/Next at the foot move between **units**, so they leave the quiz | Per-question counter and progress bar, computed by the shell over the questions in the subsection | ▣ Design |
| 2 | No explanation, no per-choice feedback. The learner is told correct or incorrect and nothing else | Explanation after submitting; per-choice feedback where it is worth authoring | ✎ Authoring |
| 3 | `showanswer` left at the platform default `finished` — the answer is revealed when the problem closes **or** when it is correct. Nobody chose this | A deliberate policy per quiz: free on practice, after attempts are spent on graded | ⚙ Setting |
| 4 | Reset appears after submitting a randomised question. It clears the answer **and the score already earned**, and never returns the attempt. The learner is told none of this | Retry action bound to a visible count of attempts remaining, worded so it never implies the attempt comes back | ▣ Design |
| 5 | Nothing is gated. A learner can open the final exam on the day they enrol | *Optional.* Prerequisite gating with a minimum score. **Off by default in the prototype** — it is shown as available, not proposed | ⚙ Setting |
| 6 | Submitting leads nowhere. Score, correct answers and progress live on a different tab | A results surface rendered in place below the last question: score, verdict, and a way back into the lesson | ⌥ Build |
| 7 | No entry screen. The learner clicks the quiz and is already answering it | An entry screen: what the quiz is, how many questions, attempts per question, what it counts towards | ▣ Design |
| 8 | "Choose the correct option(s)" repeats above every question — the same sentence five times, with a plural that is wrong for single-select. Question numbers are typed by the author, so they lie when anything is reordered or shuffled | The question stem is the heading. Numbering comes from the shell, so it survives reordering and shuffling | ▣ Design |
| 9 | A Save button that stores the answer without spending an attempt — genuinely useful — but returns "saved but not graded" and is never mentioned again. Saving four questions and submitting one scores one mark out of five | Saving happens quietly as the learner moves. The interface spends its words on what decides the grade: which questions are still **unsubmitted** | ▣ Design |
| 10 | Every question at once, in one long scroll. No pacing, and no way to judge how much is left except by scrolling | **A real stepper** — one question per screen, Previous and Next, and a percentage of the quiz completed | ✎ Authoring (heavy) + ▣ Design |

### 3a. Difference 10 deserves its own note

The stepper is **natively possible with no custom code**: one question per unit, and the platform's own
sequence navigation does the rest. It also makes difference 1 native — the counter becomes the platform's
own rather than something our shell computes.

**It was previously excluded from B on cost, and that was the wrong call for a prototype.** Every existing
quiz is authored as a single unit with all questions stacked inside it, so adopting it for real means
re-authoring the catalogue — a genuine, large, recurring cost. But in a prototype it costs nothing, and
letting people use it is exactly how we find out whether that cost is worth paying. Excluding it would have
meant deciding the expensive question by assumption, which is the opposite of why we are building this.

**Two things to carry with it:**

- **Untested: how Reset behaves once sequence navigation is on.** Simran is checking. Until then, treat the
  retry behaviour in a stepper as unverified rather than assuming it matches the single-page case.
- If it is ever adopted for real courses, it should be for **new** ones rather than retrofitted.

**Cost key.** ▣ Design — ours to build, already in the redesign. ⚙ Setting — one inherited field on the
subsection, no re-authoring. ✎ Authoring — the content team writes something new. ⌥ Build — frontend plugin
against an existing API and an existing slot; not a fork, not backend work.

---

## 4. What must NOT differ

The test is worthless if the two modes are not otherwise identical. Hold these constant:

- **The same questions, in the same order, with the same options.** No rewriting for B.
- **The same attempts** — 2 per question on graded, unlimited on practice.
- **The same question type** — single-select. Multi-select and the rest are ~5% of the catalogue and are not
  what is being decided here.
- **The same visual language.** Both modes are drawn in our design system. If A were shown as raw edX and B
  in the new design, the room would choose the prettier one for the wrong reason. **What is being compared is
  behaviour and content, not styling.**
- **The same pass mark**, presented the same way — as a target, never a gate (`07-results-decisions.md` §1).

---

## 5. States each mode must support

Shared by both: `Unanswered` · `Selected` · `Submitted — correct` · `Submitted — incorrect` ·
`Saved, not submitted` · `Attempts exhausted` · `Course ended / past due`.

**B adds:** `Entry screen` · `Explanation shown` · `Results — passed` · `Results — not passed` ·
`Results — pending` (scores are recalculated asynchronously, so an immediate read can be stale — this state
is required, not defensive).

**A specifically must show what is missing**, because absence is the finding. Where B has an explanation, A
has nothing — and the prototype should not quietly fill that gap with placeholder text.

---

## 6. Platform behaviours both modes must respect

These are not preferences. They were read from `capa_block.py` and `seq_block.py`, and a prototype that
contradicts them teaches the wrong lesson.

- **Every question submits on its own.** There is no submit for a whole quiz. Submitting question 5 grades
  question 5 and nothing else.
- **Submit is the only action that spends an attempt.**
- **Reset does not return an attempt**, and it wipes the score already earned until the learner answers
  again. This is why the platform hides Reset once an answer is correct — copy that.
- **Save does not grade.** A saved answer is worth zero.
- **A closed problem** — all attempts used, or past the due date, or past the **course end date** — disables
  Submit and removes Reset and Save. The platform never says why. Both modes should meet this state; only B
  needs to explain it.

---

## 7. Notes for the prototype

- **Mode is a per-quiz property**, so the prototype needs at least two quizzes: one A, one B, on comparable
  content. More than one of each is better — the comparison should not hang on a single quiz's wording.
- **Make the mode visible to the tester but not to the learner being tested.** A badge in the builder or URL,
  not on the page.
- **B's results screen renders in place, below the last question.** It is not a route and not a modal: no
  plugin slot in the platform fires on *leaving* a subsection, so an interstitial would be inventing
  behaviour we cannot ship.
- **B is a stepper** — one question per screen, Previous and Next, with a percentage complete. A stays a
  single scrolling page. This is the biggest structural difference between the two modes and the main thing a
  tester will notice, so get it right before the smaller ones.
- **A's Previous/Next must leave the quiz**, because that is what they really do — they move between units,
  and the whole quiz is one unit. It is tempting to make them step through questions in A. Don't: that would
  quietly give A half of B's improvement and flatten the comparison.

---

## 9. The component contract — one card, both modes

`LMS / Quiz · Question Card` in the design system serves **both** modes. There is no separate A component and
no detaching: the mode is a set of boolean switches on the same card.

**The defaults are mode B.** Drop the component in and it is already the proposal. That is deliberate — B is
what we are designing towards, so it should be what you get without thinking. Anyone showing A has chosen to.

| Property | **B — default** | **A — how it works today** |
|---|---|---|
| `Show progress` | **on** — per-question counter and bar, computed by our shell | off — no per-question position exists today |
| `Show explanation` | **on** — why the answer is right or wrong | off — 213 of 215 audited questions have none |
| `Show attempts` | **on** — attempts remaining, beside Submit | **on** — the platform shows this too |
| `Show platform prompt` | off | **on** — the repeated *"Choose the correct option(s)"* and the points line |
| `Show save` | off — saving is silent in B | **on** — the platform shows Save on graded questions |
| `Show hint` | off — zero demand hints authored anywhere in our catalogue | off |
| `Show skip` | off | off — no platform counterpart; only meaningful if the stepper is adopted |

`Show platform prompt` and `Show attempts` were added on 5 Aug specifically so mode A could be built from
components rather than drawn by hand. Building the A/B demonstration on the design-system showcase then
caught two things the table alone would not have: **Save existed only on `Last attempt`**, so mode A could
not show it before submitting, where the platform actually does; and the **hint *button* ignored
`Show hint`**, because the property was bound to the hint alert and not to the control. Both fixed. It is
worth building the comparison rather than describing it — that is the same argument as the prototype, one
level down. Before that the "today" column on the board had to be detached, because
the card simply could not render what the real page shows.

### 9.1 Where a variant is justified, and where it is not

**Not on the Question Card.** A `Mode` variant there would mean 16 variants to encode what six booleans
already do — and worse, **two sources of truth that can disagree**: what should the card render if `Mode=A`
but `Show progress` is on? The booleans stay.

**Yes on the stepper bar, and only for mode B.** `LMS / Quiz · Stepper Bar` — Back, progress, question
counter — lives *inside* the Question Card, governed by its `Show progress` property. On for B, off for A.
Back means **previous question**; it never leaves the quiz.

> **Corrected 5 Aug: there is no mode-A variant, and there should not be.** It was originally built with one,
> on the reasoning that mode A shows Previous/Next at the foot of the page. It does — but **that is navigation
> between topics and modules.** It leaves the subsection entirely and is not quiz navigation at all. Mode A
> uses `LMS / Course Progression Button` (`Previous-Topic` / `Next-Topic`), the same control the rest of the
> course uses.
>
> A quiz-branded copy of it would have implied the platform can step through questions, which is exactly the
> thing it cannot do — and the whole point of difference 10 is that stepping requires re-authoring one
> question per unit.

### 9.2 What still cannot be expressed by a component

- **The entry screen.** B has one; A has none. That is the presence or absence of
  `LMS / Quiz · Entry Header`, not a switch.
- **How many questions are on the page.** A stacks them all; B shows one. That is how many cards you place,
  not a property on any of them.

### 9.3 Rules the card encodes, and why

These are copied from the platform deliberately — they protect the learner, and a prototype that ignores them
teaches the wrong lesson:

- **Reset is hidden once an answer is correct.** Reset wipes the score already earned, so offering it on a
  right answer lets a learner destroy a banked point.
- **Reset and Save both disappear once the problem is closed** — attempts spent, past due, or past the course
  end date.
- **Reset never returns a spent attempt.** Any retry copy must sit beside the attempts count and must never
  imply otherwise.
- **Saved is not graded**, and every question submits on its own.

---

## 8. What we are actually testing

Worth stating, so the sessions produce decisions rather than opinions:

1. **Does the explanation change anything?** It is the most expensive item in B and the only recurring cost.
   If learners do not read it or do not benefit, that changes the business case.
2. **Does the results screen change how the quiz feels?** It is the only ⌥ Build item.
3. **Does anyone lose marks to the Save trap in A, and does B's wording prevent it?** The one difference with
   a measurable failure mode.
4. **Is the entry screen worth its space,** or does it just delay the learner?

5. **Is the stepper worth re-authoring the catalogue for?** The most expensive question we have, and the one
   we would otherwise answer by assumption. A prototype costs nothing to try it in; the real adoption costs a
   lot. If testers do not prefer it, we have saved a very large amount of authoring.

Items 3, 4 and 5 are the ones where a prototype beats a discussion outright.
