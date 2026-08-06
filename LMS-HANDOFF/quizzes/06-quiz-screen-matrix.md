# Quiz Screen & Combination Matrix

*Derives every screen and flow we must draw from what Open edX actually lets an author configure.*

**Companions.** `01-edx-quiz-capabilities.md` is the capability reference — the settings and their allowed values, sourced from docs.openedx.org. This document is the layer above: it crosses those settings into the finite set of screens a learner can land on, so nothing is discovered late. `04-quiz-experience-spec.md` holds the behavioural spec and the decisions.

> Anything marked **⚠︎ verify** is pending confirmation in the dev environment or by the source research in flight. Do not build from a ⚠︎ line without checking.

---

## 1. How to read this

A screen is a point where three independent things land at once:

| Axis | What varies | Who controls it |
|---|---|---|
| **A · Configuration** | how the author set the problem and the subsection up | course team, at authoring time |
| **B · Learner action** | what the learner has done so far | the learner, at runtime |
| **C · Platform response** | what the backend returns | edX, derived from A and B |

Most "new screens" people discover late are not new — they are an untested combination of these three. The point of the matrix is to make the combinations visible before we draw.

---

## 2. Our three quiz types are not platform types

Practice, Graded and Final Exam do not exist in Open edX. They are **names we give to combinations** of subsection and problem settings. This matters: the platform will happily produce a quiz that is none of our three, and the shell has to render it anyway.

| | **Practice** | **Graded** | **Final exam** |
|---|---|---|---|
| Subsection *Grade as* | Not Graded | Homework / Lab | Final Exam |
| Counts toward grade | no | yes, by type weight | yes, heaviest |
| Max attempts | blank = unlimited | 2 | 1 |
| Timed | no | no | optional |
| Results visibility | always show | always show | may be deferred |
| Show Answer | after attempts or correct | after all attempts | often `never` or `past_due` |
| Hints | yes | author's choice | no |
| Feedback | immediate | after submit | may be withheld until release |

**Rule for the shell: never infer the type from a label.** Derive behaviour from the settings themselves, or a quiz configured off-pattern will render with the wrong affordances.

---

## 3. The configuration axes — what actually changes the UI

Per problem (question):

| Setting | Values | Changes on screen |
|---|---|---|
| Problem type | multiple choice · checkbox · dropdown · numerical input · text input · (+ hints/feedback variants) | the input control itself |
| Maximum Attempts | blank *(unlimited on a normal problem, **one** on a timed exam)* · integer | attempts counter, Submit enabled/disabled |
| Show Answer | 12 values — see `01` §2 | whether a Show Answer control exists, and when the solution appears |
| Randomization | Always · On Reset · Never · Per Student | whether values change on reset; only for scripted problems |
| Show Reset Button | on · off | presence of Reset |
| Weight | number | "X / Y points" |
| Partial credit | MCQ points · multi-select EDC/halves · numerical close/list · custom | a **third** correctness state, not just right/wrong |
| Hints | demand hints (`Hint 1 of N`) · answer-specific feedback · correct/incorrect messages | Hint control, per-choice feedback |
| Time Between Attempts | seconds | a countdown blocking resubmission |

Per subsection (the quiz):

| Setting | Values | Changes on screen |
|---|---|---|
| Grade as | Not Graded · assignment type | graded badge, weight line |
| Due date + grace | date · course-wide grace | past-due states, closed states |
| Results visibility | always · never · after due · overall-only after due | whether correctness is shown at all |
| Hide content after due | on · off | content gone vs visible-but-closed |
| Timed exam | off · on + HH:MM | entry gate, timer, expiry, auto-submit |
| Proctored | off · proctored · practice · onboarding | verification flow, review pipeline |
| Prerequisite gating | off · prereq subsection + min score / completion | locked state, unlock rule |
| Cohort / track restriction | content group · enrolment track | whether the quiz is visible at all |

---

## 4. Question-level states — the atomic screens

These are the states of one question. Every quiz type reuses them; what differs is which are reachable.

| # | State | Reachable when |
|---|---|---|
| Q1 | Unanswered | always, first view |
| Q2 | Selected, not submitted | learner has chosen, not submitted |
| Q3 | Saved draft | Save exists (attempts set, or randomization Always) |
| Q4 | Submitted · correct | any |
| Q5 | Submitted · incorrect, attempts remain | max attempts > 1 |
| Q6 | Submitted · incorrect, attempts exhausted | max attempts reached |
| Q7 | Submitted · **partially correct** | partial credit configured |
| Q8 | Hint shown | demand hints authored |
| Q9 | Answer revealed | Show Answer condition met |
| Q10 | Reset available / just reset | Show Reset Button on |
| Q11 | Blocked by Time Between Attempts | setting > 0, retry too soon |
| Q12 | Correctness withheld | results visibility ≠ always |
| Q13 | Closed — past due | due date passed |
| Q14 | Content hidden after due | hide-after-due on |

**Q7 and Q12 are the two we have not designed.** Partial credit is a third correctness colour, not a variant of wrong. Withheld correctness is a submitted state with no green or red at all — the learner has answered and must be told the result is coming, which is not the same as "pending grading".

---

## 5. Quiz-level states

| # | State | Notes |
|---|---|---|
| S1 | Not started | entry header |
| S2 | In progress | resumable |
| S3 | Abandoned mid-quiz, returning | position is remembered; **unsubmitted answers are not** — ⚠︎ verify |
| S4 | All submitted, scored | results |
| S5 | All submitted, awaiting staff grading | "Pending", no score |
| S6 | All submitted, results withheld until a date | score exists but is not shown |
| S7 | Passed | above cutoff |
| S8 | Failed, attempts remain | retake offered |
| S9 | Failed, attempts exhausted | terminal |
| S10 | Locked — prerequisite not met | shows unlock rule |
| S11 | Locked — not yet released | date-based |
| S12 | Past due, never attempted | terminal, scores 0 |
| S13 | Timed: entry gate | "I am ready to start" |
| S14 | Timed: running | countdown, escalating at 80% / 95% |
| S15 | Timed: expired, auto-submitted | unsubmitted work scores 0 |

---

## 6. The screen inventory — what we must actually draw

Collapsing the axes, this is the finite list. **Built** = exists in the DS today.

### Entry
1. Practice entry — built
2. Graded entry — built
3. Final entry — built
4. Timed entry gate — **to build**
5. Locked: prerequisite not met — **to build**
6. Locked: not yet released — **to build**
7. Past due, never attempted — **to build**

### Question
8. Unanswered — built
9. Selected — built
10. Correct — built
11. Incorrect, attempts remain — built
12. Incorrect + hint — built (`Show hint`)
13. Last attempt warning — built
14. **Partially correct** — to build
15. **Correctness withheld** — to build
16. **Answer revealed** — to build
17. **Hint sequence "Hint 1 of N"** — to build *(we built a single hint; the platform paginates them)*
18. Saved draft — built
19. **Blocked by time-between-attempts** — to build
20. Closed / past due — **to build**

### Input types
21. Multiple choice (radio) — built
22. Checkbox — built
23. **Dropdown** — to build
24. **Numerical input** — to build
25. **Text input** — to build ⚠︎ verify it is in use

### Results
26. Passed — built
27. Failed, attempts remain — built
28. Pending staff grading — built
29. **Results withheld until date** — to build
30. **Timed: expired / auto-submitted** — to build

### Timed
31. Running — timer banner — **to build**
32. Low-time warning states (80% / 95%) — **to build**

**Nine of the thirty-two are built. The gap is not the exotic cases — it is the closed, locked and withheld states**, which is where learners get stuck and where support tickets come from.

---

## 7. Flows

**Practice** — entry → question (submit → feedback → hint on wrong → retry freely) → … → results → retake or continue. No terminal failure; the only exit is leaving.

**Graded (2 attempts at the whole quiz)** — entry → questions → results. If failed and an attempt remains: retake the **whole quiz**, not the wrong answers. See §9.3 of the spec for the unresolved "Retry incorrect" question, which does not fit this flow cleanly.

**Final (1 attempt, optionally timed)** — entry (+ timed gate) → questions with a running timer → submit or expiry → results, possibly withheld or pending. Terminal in every branch.

**Locked** — the learner never reaches the entry header: they see the lock and its rule. The rule text depends on prerequisite vs date, and ⚠︎ we do not yet know what the API exposes.

---

## 8. Combinations that cannot happen

Worth stating so nobody designs them:

- **Timed + unlimited attempts** — blank attempts on a timed exam means *one*, not unlimited.
- **Show Answer `after_all_attempts` + blank attempts** — with unlimited attempts the condition never fires, so the control never appears.
- **Partial credit + single-answer multiple choice** — partial credit needs multiple response fields or a scripted grader.
- **Hints on a final exam** — allowed by the platform, but it defeats a one-shot assessment. A house rule, not a platform limit.
- **Reset + graded, attempts exhausted** — Reset cannot restore a spent attempt.

---

## 8b. Source-confirmed findings that change the design *(Aug 3, 2026)*

Read against `edx-platform`, `xblocks-contrib`, `frontend-app-authoring`, `frontend-lib-special-exams` and `edx-proctoring` on `master`.

### ⚠︎ There is no pass mark at quiz level

`GRADE_CUTOFFS` (default `Pass: 0.5`) is **course-wide**. A subsection has no passing threshold: the only per-subsection score threshold is `min_score` on prerequisite gating, and that gates *other content* — it never tells the learner they passed this quiz.

**Our screens say "Pass mark 70%", "You needed 60% to pass", "Passed" / "Not passed".** None of that comes from the platform. Either we drop the per-quiz verdict, or the pass mark becomes **authored metadata we require content to supply** — which is a demand on the content team, not a setting someone can flip. This needs deciding before the results screens are finalised; it is the single biggest gap between what we drew and what the backend can answer.

### ⚠︎ "Grading method" may render on screen

`grading_method` — `last_score` (default), `first_score`, `highest_score`, `average_score` — renders under Submit as *"Grading method: Last Score"*. Undocumented in the educator docs. If it renders on our release, our *"best score kept"* copy must match the configured method rather than assume it.

### A timer forces the whole exam experience

`default_time_limit_minutes` only applies when `is_time_limited` is true, which routes the subsection through the special-exams flow: entry gate, proctoring vocabulary, **End My Exam**, staff-only reset. **You cannot have "a 10-minute quiz" without inheriting the exam UX.** Design a timed quiz as an exam or not at all.

Confirmed timer behaviour: warning at **20% remaining**, danger at **5%**, poll every 60s, a **5-second grace** at `00:00:00` before auto-submit fires. No learner-initiated retake — only staff can reset an attempt.

### True/False is not a separate type

The Studio picker has exactly five simple types: **single select, multi-select, dropdown, numerical input, text input**. True/False is a single select with two choices — no new component. (A `truefalseresponse` tag exists in the CAPA registry but is not in the picker.) This narrows what the workshop asked us to design.

### `max_attempts = 0` is a real, strange state

Zero is not "no attempts" — it is a **survey question**: closed from first render so Submit is disabled, but Save and Reset stay available. A save-only, never-gradeable question. ⚠︎ verify whether any of our content uses it.

### Reset never appears before the first submission

`show_reset_button` is not sufficient: the template also requires at least one used attempt, Reset is suppressed on a fully-correct problem, and it is **forced visible** whenever randomization is `always`/`onreset`. Reset also never restores a spent attempt.

### Hints are paginated

Demand hints reveal cumulatively as an ordered list, prefixed *"Hint (1 of 3):"*, with a **Next Hint** button that disables once exhausted. **We built a single hint block** — this needs the sequence.

### Exact platform copy for the locked and closed states

Worth matching rather than inventing, since these are the states we have not drawn:

- **Content Locked** — *"You must complete the prerequisite: ''{name}'' to access this content."* + button **"Go To Prerequisite Section"**.
- **Hidden after due** — *"The due date for this assignment has passed."* / *"Because the due date has passed, this assignment is no longer available."* / *"If you have completed this assignment, your grade is available on the progress page."*
- **Results withheld** — every submit renders a neutral *"Answer submitted."*, and the progress line reads *"N points possible (graded, results hidden)"*.

## 9. What the platform does not give us

The shell must synthesise all of these. Each is a design surface with no edX equivalent:

- A **quiz-level submit-all** — edX submits per problem.
- A **per-question counter** ("Question 3 of 10").
- An **end-of-quiz results screen**.
- A **whole-quiz retake counter** for non-timed quizzes — attempts live on each problem.
- **Retention of an unsubmitted answer** across navigation — ⚠︎ verify, but assume not.
- A **link from a quiz back to the module** — impossible in authored content; ours to resolve from course structure.
- A **pass/fail verdict for a quiz** — cutoffs are course-wide only (§8b).
- A **question navigator, flag-for-review, or "3 unanswered" check** — none exist.
- **Shuffling the order of questions** — shuffle works only *within* one multiple-choice problem. Randomising which questions a learner gets needs a Randomized Content Block, a different container.
- A **subsection score anywhere in the courseware** — the only score chrome is the per-problem progress line; everything else lives on the Progress tab.

---

## 10. Question types — what we actually have to build

Confirmed against the Studio picker (`ProblemTypeKeys`). Five simple types, all mobile-ready, all supporting hints and per-answer feedback:

| Picker name | Control | Built? | Notes |
|---|---|---|---|
| Single select | radio | ✅ | **True/False is this**, with two choices |
| Multi-select | checkbox | ✅ | the only type with **group feedback** (feedback on a *combination*) |
| Dropdown | select | ❌ | |
| Numerical input | text + validation | ❌ | the only type with a **Tolerance** setting; also answer ranges like `[5,8)` |
| Text input | text | ❌ | case-sensitivity and regex modes |

Beyond the picker, "Advanced" opens the OLX editor — **Drag and Drop** and **Staff Graded Points** are registered there. Neither is in scope, but both can appear in a course, so the shell needs a graceful unknown-type fallback rather than a blank frame.

---

## 11. Coverage of the canonical-flows board — what the journeys actually show *(Aug 6, 2026)*

The Figma page **`↳ Phase 1 - Quizzes - Ready for Review`** holds one section, `02 · Canonical flows`,
whose brief is *every possible combination from start to end*, in both modes. This section audits that
board against the inventory above, so the gap is a decision and not an oversight.

**Measured on the board:** 30 question cards (10 mode A, 20 mode B), 4 entry headers (Practice, Graded,
Final, Timed exam), 9 results screens, 4 gates, 3 timer states, 90 option rows.

### 11.1 Covered

| Documented | Where it appears |
|---|---|
| Q1 Unanswered, Q2 Selected, Q4 Correct, Q5 Incorrect + attempts remain, Q6 Last attempt | all three journeys |
| Q3 Saved draft | ×2, both modes, with the saved-scores-zero prompt |
| Q7 Partially correct | ×2 |
| Q9 Answer revealed | ×3, plus a **Show answer** control on 6 cards |
| Q11 Blocked by time between attempts | `Gate = Rate limited` |
| Q12 Correctness withheld | ×1 card + `Results = Withheld` |
| Q13 Closed — past due | `Gate = Past due` ×2 |
| S4/S7/S8 scored, passed, not passed | `Results = Passed` ×3, `Not passed` ×3 |
| S5 awaiting staff grading | `Results = Pending` ×2 |
| S13/S14/S15 timed entry, running, expired | Timed entry header + `Running` / `Warning` / `Critical` + `Gate = Expired` |

All four `Results` variants and three of five `Gate` variants are exercised.

### 11.2 Not covered — and why it matters

1. **The bucket authoring model has no journey at all.** §11 of the spec records it as *live in production
   today* on SKOAIFP01: one problem holding ten questions, one Submit, three pooled attempts, partial
   credit reported as `4/10`. It is the only model that already delivers a quiz-level Submit without a
   build, and it is the third option a stakeholder will ask about. A board claiming every combination
   cannot omit the one that is running in production.
2. **Q8 Hint is on zero of the thirty cards.** `Show hint` is false everywhere. The documented Practice
   flow in §7 reads *submit → feedback → hint on wrong → retry freely* — the hint step is named in our own
   flow and missing from our own drawing of it. Screen #17 (`Hint 1 of N`) is also unbuilt: we drew a
   single hint, the platform paginates them.
3. **`Gate = Prerequisite` and `Gate = Not released` never appear** (S10, S11; screens #5 and #6). Both
   variants exist in the DS and are token-correct. These are the states where learners get stuck and
   support tickets start — §6 says exactly that.
4. **`LMS / Quiz · Answer Input` is used zero times.** Dropdown, numerical and text answers (F-QZ-004/005/006,
   screens #23–25) appear in no journey; every card on the board is an option-row question. The component
   exists; nothing shows what a quiz made of them looks like.
5. **`LMS / Quiz · Grade Summary` is used zero times.** Every mode-A lane ends by stating the score lives on
   the Progress tab, and then never shows it. The one screen that closes mode A's loop is absent.
6. **Q14 content hidden after due** has no representation distinct from `Past due`. Possibly correct — the
   platform may render the same shell — but it is untested, so it should not be assumed.

### 11.3 Verified clean

- No detached nodes, no local components, no broken instances on the page.
- `Next question` appears only in mode B, where a stepper exists to advance to. Mode A has no forward
  control, which is the platform's actual behaviour.
- `Show answer` never appears on an untouched question, and `Reset` never appears on a correct one.

### 11.4 A publish trap worth knowing — `Exam Timer` *(Aug 6, 2026)*

`LMS / Quiz · Exam Timer` read as *"component set has existing errors"* from every consuming file, while its
master in the DS was clean: three variants, one `State` property, no duplicates.

Importing the set by key from the consuming side showed why. The **published** snapshot had five children —
`Running, Warning, Warning, Critical, Critical` — duplicate variant names left over from an earlier state of
the set. Duplicates are exactly the condition Figma reports as "existing errors".

**Republishing does not fix this on its own.** Figma publishes only what it considers changed, and the master
had not changed since the bad publish, so every republish skipped it and the broken snapshot survived.
Replacing the instances does not help either — instances created fresh from the library inherit the same
broken snapshot.

The fix is to make the master *dirty* so publish cannot skip it (editing the component set's description is
enough), then republish. Worth remembering: a component that is visibly correct in the DS can still be broken
everywhere it is used, and the DS file will never tell you.
