# Quiz — two modes, A and B

*Created Aug 5, 2026 · Canonical definition of the two quiz experiences we are putting side by side.*

Companion docs: [04-quiz-experience-spec.md](04-quiz-experience-spec.md) (full component spec, and the source
verification in §10) · [06-quiz-screen-matrix.md](06-quiz-screen-matrix.md) (every state) ·
[07-results-decisions.md](07-results-decisions.md) (pass mark, alerts, retry) ·
[../session-log.md](../session-log.md) (where each finding came from).

Figma: ICP page → section **`04.5 · Today vs proposed — two models for the stakeholder call`**.

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

**Default: `A`.** A is what exists today, so an unconfigured quiz behaves as production does. B is opt-in,
which also means a reviewer who sees B knows someone chose it.

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
- **Do not build the stepper.** One question per unit is natively possible and needs no code, but it would
  mean re-authoring the entire catalogue. It is excluded on purpose. B's counter tells the learner where they
  are on a page they can already see all of — it does not move them one question at a time.

---

## 8. What we are actually testing

Worth stating, so the sessions produce decisions rather than opinions:

1. **Does the explanation change anything?** It is the most expensive item in B and the only recurring cost.
   If learners do not read it or do not benefit, that changes the business case.
2. **Does the results screen change how the quiz feels?** It is the only ⌥ Build item.
3. **Does anyone lose marks to the Save trap in A, and does B's wording prevent it?** The one difference with
   a measurable failure mode.
4. **Is the entry screen worth its space,** or does it just delay the learner?

Items 3 and 4 are the ones where a prototype beats a discussion outright.
