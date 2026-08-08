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

### 11.5 Closing gap 1 — the card can now be drawn in bucket form *(Aug 6, 2026)*

Drawing the bucket journey was blocked by the component, not by the layout. `LMS / Quiz · Question Card`
carried its Submit button and its attempt line inside a `Primary action` frame with no visibility property,
so every question in a stack would show its own Submit — the exact opposite of what the bucket does.

`Show submit` (boolean, default **true**) now exists on the card and is bound across all nine variants. Turn
it off on every question but the last and the stack reads correctly: one Submit, one pooled attempt count,
one score for the whole quiz. Leave it on for one-problem-per-question authoring, where each question really
does submit independently.

This is the first card property that describes the **authoring model** rather than the learner's state, which
is why it is worth naming: `Show progress`, `Show hint` and the rest are per-question decisions, and this one
is not — it must be set consistently across a whole quiz or the screen becomes a lie.

> ⚠︎ Consuming files must accept the pending library update before this property, and the `Exam Timer` fix in
> §11.4, become available. Until they do, `importComponentByKeyAsync` against the DS times out entirely —
> which is itself the symptom to recognise: imports hanging usually means an unaccepted library update, not a
> broken component.

### 11.6 The bucket band, and what is still open *(Aug 6, 2026)*

`JOURNEY · Bucket` now sits alongside Practice, Graded and Final, and the section is renamed accordingly:
*the three types in both modes, **plus the bucket***. It is deliberately not a fourth type — the header reads
**AS AUTHORED TODAY · SKOAIFP01**, because it is a way of authoring any of the three.

**Path 1 · ten questions, one button.** Practice entry → Q1 and Q2 with `Show submit` off → Q10 carrying the
only button and the only attempt line (`0 of 3`) → one submit marking all ten, shown partially correct at
4/10. No stepper on any card: the bucket is a single problem, so there is no position to step through.

**Path 2 · what it gives, and what it costs.** The results screen mode B would render from it — 40%, 4 / 10,
2 of 3 attempts left — and the price, stated on the board: the per-question breakdown does not exist. The
progress API returns one entry for the whole quiz, so nothing can say which of the ten was missed. The CTA
reads **Retake all ten**, not *Retry incorrect*, because Reset clears every question at once. Drawing
*Retry incorrect* here would have been a lie the platform cannot honour.

All figures are measured, not illustrative: 4/10, 6/10, 6/10 and 3/10 from the four SKOAIFP01 buckets on
Aug 6, 2026.

**Audit after the build:** 34 question cards, 0 broken instances, 0 local components, 0 mode-A cards showing
*Next question*, `Grade Summary` now used once.

**Still open from §11.2** — named so they stay decisions rather than oversights:

| # | Gap | Status |
|---|---|---|
| 1 | Bucket has no journey | **closed** — §11.6 |
| 5 | `Grade Summary` never used | **closed** — the Graded mode-A lane now ends on the gradebook |
| 2 | `Show hint` false on every card; `Hint 1 of N` unbuilt | open |
| 3 | `Gate = Prerequisite` and `Gate = Not released` never appear | open |
| 4 | `Answer Input` unused — dropdown, numerical, text | open |
| 6 | Q14 content-hidden-after-due indistinguishable from past due | open, and untested |

### 11.7 Reorganised by mode, and the gates closed *(Aug 6, 2026)*

The single canonical-flows section became **three**, because interleaving the modes inside every band meant a
reader had to hold two products in their head at once. Now each section is one product, read top to bottom:

| Section | Contains | Cards |
|---|---|---|
| `02 · Canonical flows · MODE B — what we propose` | Practice, Graded, Final — proposal paths only | 20 |
| `03 · Canonical flows · MODE A — how it works today` | the same three types, platform behaviour only | 10 |
| `04 · Bucket authoring — the third option, live in production` | the bucket, both paths | 4 |

Paths keep their numbering across 02 and 03, so *Path 2* in one is the same journey as *Path 2* in the other
and the cost of each difference stays readable in a single comparison. The per-band `MODE A` / `MODE B`
headers are gone — the section title carries it, and repeating it inside every band was noise.

**The bucket is a section, not a band inside either mode.** It cuts across A and B rather than sitting in one:
it is an authoring decision, and both shells would have to render it. Giving it its own section also puts it
where a stakeholder will look for it, which is the point of the wall.

**Gap 3 closed.** `Path 5 · locked before it starts` was added to the Graded band with `Gate = Prerequisite`
and `Gate = Not released`. All five Gate variants are now in use across the page — four in mode A, `Expired`
in mode B's timed path. The note on that path states what the screens cannot: **the locks belong to neither
mode**, because they replace the quiz before either shell renders. ⚠︎ We still do not know what the API
exposes of either unlock rule, so the wording on those two screens is the platform's, not ours.

**Audit after the restructure:** 34 cards total, 0 broken instances, 0 local components, 0 mode-A cards
showing *Next question*, 0 mode-B cards leaking into section 03.

**Remaining open:** gaps 2 (`Show hint` false everywhere, `Hint 1 of N` unbuilt), 4 (`Answer Input` unused)
and 6 (Q14 untested). None is mechanical — see §11.6.

### 11.8 Both modes made whole, and mode A put first *(Aug 6, 2026)*

Splitting by mode exposed something the interleaved layout had hidden: **mode A was never a complete
journey.** It had ten cards to mode B's twenty, and what was missing was not decoration — mode A had no
right-first-time path on a graded quiz, no show-answer route, no multi-select, no timed exam and no
withheld score. We had been comparing a full proposal against a partial description of today, which flatters
the proposal for the wrong reason.

Both sections now carry the whole journey, and **mode A leads**, because the honest reading order is what
exists before what is proposed.

| | 02 · MODE A | 03 · MODE B |
|---|---|---|
| Question cards | 25 | 24 |
| Entry headers | **0** — the platform has none | 5 |
| Results screens | **0** — the platform has none | 10, all four variants |
| Gates | all 5 variants | all 5 variants |
| Exam timer | 3 states | 3 states |
| Grade summary | 1 | 1 |

**Path numbers now mean the same thing in both sections.** Practice 1–4, Graded 1–8, Final 1–5 and Bucket 1
are the same journeys, so a reviewer reads one number in two places and sees only the difference. Three paths
exist in one mode only, and each is a finding rather than a gap:

- **A · Practice 5 — the end.** In mode A, leaving is the only ending there is.
- **B · Graded 9 — the score is not ready yet.** A stale score can only be shown where a results screen
  exists to show it on.
- **B · Bucket 2 — what it gives, and what it costs.** Same reason.

**The bucket now sits inside mode A**, as another way to configure the quiz on the platform as it stands —
which is what it is: it runs on SKOAIFP01 today and needs nothing built. Mode B carries its own rendering of
the same authoring, because a shell we build would still have to draw it. The A version has no entry screen
and no results screen, and ends on a note saying the score exists at 4/10 with no way to see which of the ten
was missed.

The locked and closed states carry across both sections unchanged. They replace the quiz before either shell
renders, so they belong to neither mode — the note on that path says so.

**Audit:** 49 cards, 0 broken instances, 0 local components, 0 cards rendered in the wrong mode, 0 mode-A
cards offering *Next question*.

### 11.9 The open gaps closed — and one of them was never a gap *(Aug 6, 2026)*

**Gap 2 — hints. Half of it was wrong on my part.** §6 line 17 of this document says *"we built a single
hint; the platform paginates them"*. The component was checked rather than assumed: the hint alert inside
`LMS / Quiz · Question Card` already reads **"Hint 1 of 3"**. The pagination was built; only the usage was
missing. `Show hint` is now on in `Practice · Path 2 · wrong, then right` in **both** modes, placed where the
documented flow in §7 always said it belonged — submit → feedback → **hint** → retry. Line 17 above is
therefore stale and should be read as closed.

**Gap 4 — the other answer types.** `LMS / Quiz · Answer Input` was likewise complete: nine variants,
Dropdown / Numerical / Text × Unanswered / Correct / Incorrect. It had simply never been placed. Both
sections now carry an **`ANSWER TYPES`** band rather than another path, because an input type is a property
of a question and not a journey — folding it into the path numbering would have implied a route through the
quiz that does not exist. Mode A frames it as what the platform already renders; mode B as the same types
inside our shell, where only the control changes.

**Gap 6 — content hidden after due (Q14) stays open, and cannot be closed by us.** It needs the subsection
setting *Hide content after due date* flipped on a course, which is exactly the kind of change neither we nor
the content team can make. It is already on the list of five settings in the vendor ask. Until someone
renders it, we do not know whether the platform shows a distinct shell or reuses the past-due one, and
guessing on the wall would be worse than the blank.

**Final audit of the page:** 51 question cards, 5 bands per section, 0 broken instances, 0 local components,
0 cards rendered in the wrong mode, 0 mode-A cards offering *Next question*, all three answer-input types
placed in both modes.

| Gap | State |
|---|---|
| 1 · bucket has no journey | closed — §11.6, and now inside mode A |
| 2 · hints unused; `Hint 1 of N` "unbuilt" | closed — it was built; now used in both modes |
| 3 · Prerequisite / Not released gates | closed — §11.7 |
| 4 · `Answer Input` unused | closed — new `ANSWER TYPES` band in both modes |
| 5 · `Grade Summary` unused | closed — §11.6 |
| 6 · Q14 content hidden after due | **open — blocked on a setting we cannot flip** |

### 11.10 Mode B cross-checked variant by variant *(Aug 6, 2026)*

Every DS variant was crossed against its use in each section, rather than checking that each *component* was
used. That distinction found something a component-level check could not:

**Mode B never showed an unanswered question.** `State=Unanswered` stood at A:4, B:0 — mode B opened on an
entry screen and cut straight to a question with an answer already selected. The single most-seen screen in
the whole proposal, the first thing a learner meets after pressing start, was not drawn anywhere. Fixed:
`Sees the first question` now opens Path 1 of both Practice and Graded in mode B.

Everything else has parity. All 9 card states, all 5 gates, all 4 results, all 3 timer states and all 7
option-row states appear in both modes, at comparable counts. The mode-only components behave as they should:
`Entry Header` A:0 B:5, `Results` A:0 B:10, `Stepper Bar` A:0 B:21 — those three zeros in mode A are the
proposal, stated as absence.

**Knowingly partial:** `Answer Input` shows 3 of its 9 variants — one state per input type, chosen to spread
across Unanswered, Incorrect and Correct rather than repeat one state three times. Drawing all nine would add
six screens that differ only in a control we have already shown. Noted here so the gap is a choice.

### 11.11 The attempts line, and the missing Show answer CTA *(Aug 6, 2026)*

Two defects Nelson caught by reading the boards rather than the audit output — neither was detectable by any
check I had been running, because both were *correct component usage carrying wrong content*.

**1 · Every card said "You have used 0 of 2 attempts".** The default text had been left in place on 45 cards
regardless of quiz type or position in the journey. Rather than invent the right values, the platform was
asked. Three problems were read on dev with `problem_get`:

| Probe | Attempts line | Save |
|---|---|---|
| Practice, unlimited attempts | **none at all** | absent |
| Graded bucket, 3 attempts | `You have used 1 of 3 attempts` | present |
| Graded stacked, 2 attempts | `You have used 2 of 2 attempts` | absent (spent) |

So with unlimited attempts the platform prints **no attempts line whatsoever** — it does not say "unlimited"
and it does not count up. `Show attempts` is now **off across the whole Practice band in both modes**, which
also matches the band's own copy about Save being hidden for the same reason.

Elsewhere the count is derived from position rather than typed: walking each lane, a submitted state
(`Correct`, `Incorrect`, `Partially correct`, `Results withheld`) increments the count; `Answer revealed`
implies the attempts are spent, so it shows the maximum; `Last attempt` shows one short of it. Maximums are
2 for Graded, 1 for Final and 3 for the Bucket — the last measured, not assumed.

**2 · `Path 3 · asks to see the answer` never showed the Show answer control.** The path was named for an
action whose button was switched off, in both modes. Fixed.

The lesson for the audits: every check so far has asked *is the right component in the right state?* Neither
of these failed that test. A board can be structurally perfect and still tell a learner something untrue.

---

## 12. Stakeholder review, Aug 6, 2026 — decisions, and one answer that changes a screen

### 12.1 What was decided

| Decision | Applied |
|---|---|
| Feedback alerts always name the state — **Success**, **Incorrect** — with the explanation below, shown only if authored | DS: alert title and tone set per card variant |
| Hints get a distinct alert: **no top border, lightbulb glyph, pagination inside the component** | DS: new `Tone=Hint` on `LMS / Inline Alert` + `Show hint nav` |
| **Next question comes off the card**; forward navigation moves to the bar that already holds Back | DS: `Show next action` now defaults **false**; `Next` added to `LMS / Quiz · Stepper Bar` |
| Mode B nuance: once the answer is correct, the primary button **relabels from Submit to Next question** | recorded on the card description; not drawn — mode B is on hold |
| **Mode B on standby** pending the edX dev team's discovery | — |
| **Focus: mode A handoff** | — |

The hint moving inside its own alert is worth stating as a principle rather than a style: a hint is an aside
offered *before* judgement, and every other alert on the card is a verdict *after* it. Same component, and
the border is what separated them.

### 12.2 The Show answer question, answered from the platform

*"What does Show answer actually show — the hint, or a separate box with the answer? Is a hint the same field
as an answer?"*

**They are three different fields**, and conflating them would have produced a wrong screen:

| Field | Control | What the learner gets |
|---|---|---|
| `<choicehint>` | none — appears on submit | *"Correct: …"* / *"Incorrect: …"* beside the answer given |
| `<demandhint>` | **Hint** button, paginated `Hint 1 of N` | a nudge, requested before or between attempts |
| `showanswer` + `<solution>` | **Show Answer** button | the correct option(s) marked in place, **plus** the author's written solution if one exists |

So Show answer is not the hint and not the per-choice feedback. It reveals the answer itself, and the
`<solution>` block is a separate authored field that may simply be empty.

### 12.3 ⚠︎ The finding that affects the mode A handoff

Buttons were read off four live problems on dev. **Not one exposes a Show Answer button, and not one exposes
a Hint button.** The only controls present are `Save`, `Submit` and the accessibility `Review` links.

- `SKOADM01EN` Q1 is *finished* — 2 of 2 attempts spent, Submit disabled — and still offers no Show Answer.
  With the platform default of `showanswer: finished` the button would be there. It is not, so **`showanswer`
  is switched off in these courses.**
- **No `<demandhint>` is authored anywhere in dev**, so `Hint 1 of N` describes a control no learner has met.
- The only `<solution>` container found sits in the SKOAIFP01 graded bucket, and it is **empty in the payload**
  — edX fills it only when Show Answer is pressed, and there is no button to press.

**Consequence for the handoff:** mode A currently draws a *Show answer* CTA and a hint alert. Both are real
platform features and both are **off in every course we can read**. They must be handed over labelled as
*available, not enabled* — otherwise the build implements two controls the learner will never see, and the
first question in review will be why the screens do not match the product. `showanswer` is already one of the
five settings in the vendor ask; this is the evidence for why it matters.

### 12.4 Applying the decisions to the boards — two traps, one recurring *(Aug 6, 2026)*

**Text overrides do not follow the main component.** Renaming the alert title in the DS changed nothing on the
wall: 21 instances still read *"Explanation"*, because each carried an override made when the boards were
built. A library update never overwrites an override — that is the whole point of overrides — so the titles
had to be set instance by instance, keyed off each card's `State`. Worth remembering the asymmetry: *structure*
propagates from the library, *content* does not.

**A pending library update looks like a broken plugin.** `importComponentSetByKey` timing out, `Tone=Hint`
missing from the options list, and the new `Next` absent from all 23 stepper bars are one symptom, not three.
The consuming file has to accept the update in its Libraries panel first — noted again here because it has now
cost time twice, and the failure mode gives no hint of its cause.

**State after this pass:** 0 broken instances, 0 local components, 0 cards offering *Next question*, 21 alert
titles corrected. Outstanding until the ICP file accepts the update: hint alerts still render `Tone=Info`
rather than the borderless lightbulb variant, and the stepper bars still show only `Back`.

### 12.5 Demand hints have no back control — because they never need one *(Aug 6, 2026)*

Nelson asked whether the learner can move forward *and back* through `Hint 1 of N`. Answered from
`xmodule/capa_block.py` rather than from the screen, and the answer changes the component.

**There is no back control, and `hint_index` never decreases.** The gate on the forward button is:

```python
def _should_enable_demand_hint(self, demand_hints, hint_index=None):
    if hint_index is None:
        should_enable = len(demand_hints) > 0
    else:
        should_enable = len(demand_hints) > 0 and hint_index + 1 < len(demand_hints)
```

One button. It disables once the last hint is on screen.

**And going back would be pointless, because hints accumulate rather than replace.** `get_demand_hint` walks
from the first hint to the current one and concatenates them into a single ordered list:

```python
counter = 0
total_text = ""
while counter <= hint_index:
    total_text = HTML(_("{previous_hints}{list_start_tag}{strong_text}{hint_text}</li>")).format(
        previous_hints=HTML(total_text), ...)
    counter += 1
total_text = HTML("<ol>{hints}</ol>").format(hints=total_text)
```

So hint 1 is still visible when hint 2 arrives. **It is a growing list, not a carousel** — which is why the
platform never needed a Previous button, and why designing one would invent a problem the platform does not
have.

Two smaller corrections fell out of the same reading:

- The label is literally **`Hint (N of M): `** — parentheses and a trailing colon. We had written
  `Hint 1 of 3`.
- `hint_index % len(demand_hints)` in `get_demand_hint` does wrap, but the button gates before it, so the
  wrap is unreachable through the UI. Not a behaviour to draw.

**Applied:** the `Back` button added to `Tone=Hint` was removed, the three lines now read as an accumulating
list with the platform's own label format, and the third uses `Show secundary-text` so the alert grows one
hint at a time. The reasoning is written into the component description so the next person does not re-add
the arrow.

### 12.6 Validation after the library update *(Aug 6, 2026)*

| Check | Result |
|---|---|
| Broken instances · local components | 0 · 0 |
| Cards offering *Next question* | 0 |
| Alert titles by state | Success 11 · Incorrect 7 · Answer 5 · Partially correct 6 |
| Hint alerts | 2, both `Tone=Hint` |
| Stepper bars | 23, all `Mode=With Back only` |

**`Next` in the bar is an optional variant, not the default.** `Mode=With Back only` stays the default while
mode B is on hold; `Mode=With Back+Left` carries the forward control for when it resumes. The boards were
briefly switched to the Next variant and then reverted — recording that here so the switch is not read as an
oversight later.

Two things needed a second pass because a republish had reset them: one card came back with *Next question*
on, and six `Partially correct` alerts came back titled *"This grade replaced…"*. Both are the override
asymmetry from §12.4 seen from the other side — a library update **does** overwrite a property or a text the
instance had not deliberately overridden, so fixes applied before a republish can be undone by it. **Validate
after every republish, not before.**

> ⚠︎ Naming: the variant reads `Mode=With Back+Left`. The control it adds is *Next* — forward, on the right.
> `With Back+Next` would say what it does. Variant names are read by everyone consuming the library, so this
> one is worth correcting before the handoff.

### 12.7 One line per hint, not two *(Aug 6, 2026)*

The question was whether `Hint (1 of 3)` and the hint body are two lines — which would mean six text layers
instead of three. The markup settles it:

```python
strong_text=HTML("<strong>{hint_number_prefix}</strong>").format(
    hint_number_prefix=Text(_("Hint ({hint_num} of {hints_count}): ")))
...
"{previous_hints}{list_start_tag}{strong_text}{hint_text}</li>"
```

Prefix and body sit **inline inside the same `<li>`**, the prefix wrapped in `<strong>`. So it is
**three text layers, each with the prefix bolded as a character range** — not six. Applied: `Hint 1`,
`Hint 2`, `Hint 3`, Montserrat Regular with characters 0–15 set to SemiBold.

**The `Hints (3)` heading is ours, not the platform's.** `get_demand_hint` wraps the accumulated hints in
`<ol>{hints}</ol>` and renders nothing above it. Two consequences worth deciding rather than inheriting:

- In **mode A**, whose whole premise is showing exactly what the platform does, the heading is an invention
  and should come off.
- If it is kept as shell chrome in mode B, it must count the hints **revealed so far**, not the total —
  otherwise a learner one hint in reads *"Hints (3)"* above a line that says *"Hint (1 of 3)"*, and the
  header contradicts the body.

Also renamed `Mode=With Back+Left` → **`Mode=With Back+Next`** on the stepper bar. The control it adds points
forward; the old name said left.

### 12.8 Validation after the hint rework *(Aug 6, 2026)*

| Check | Result |
|---|---|
| Broken instances · local components | 0 · 0 |
| Cards offering *Next question* | 0 |
| Stepper bars | 23, all `Mode=With Back only` |
| Hint alerts | 2, both `Tone=Hint`, one hint revealed + `Next hint` |
| Alert titles | Success 11 · Incorrect 7 · Answer 5 · Partially correct 6 |

The `Hints (N)` heading is gone and hints 2 and 3 start hidden, so the default state shows one hint with the
forward control still live — which is the state a learner is actually in most of the time. Correct call.

**Two fixes on top of it.**

Hints 2 and 3 were hidden by **layer visibility with no property behind them**. That reads identically on the
canvas and behaves differently: a hidden layer with no binding cannot be toggled from the properties panel,
so the accumulating state — the whole reason this component is a list and not a carousel — could only be
demonstrated by digging into the layer tree. They are now bound to `Show hint 2` and `Show hint 3`, both
defaulting to false. Nothing changes visually; the states become reachable.

The two hint alerts on the boards still read **`Hint 1 of 3`** — the old wording, held in an instance
override that the republish could not touch (§12.4 again). Both now carry the platform's
`Hint (1 of 3): …` with the prefix bolded as a range.

That is the third time an override has survived a component fix. The pattern is stable enough to state as a
rule: **after changing text in a main component, sweep the instances for the old string.** The library will
not do it, and the canvas gives no sign that anything is stale.

### 12.9 The first hint needs its own control — and it belongs beside Show answer *(Aug 6, 2026)*

**"Asks for a hint" is correct.** On first render `hint_index` is `None`, so `_should_enable_demand_hint`
returns the button enabled **with no hint text on screen**. Nothing appears unprompted; the learner presses
for the first hint exactly as they press for the second. The step name stands.

**But before that press there is no hint alert to hold the control.** The alert is created *by* the first
hint. So a control that lives only inside the alert can never be pressed the first time — the state we had
drawn was the second press onward, and the first press had nowhere to happen.

**Placement: Secondary actions, beside `Show answer`.** Nelson's read — *"a similar situation to Show answer"* —
matches both the platform and the component logic:

| | Show answer | Hint |
|---|---|---|
| Where | Secondary actions | Secondary actions |
| What it does | reveals content into an alert above the footer | same |
| Repetition | fires once, terminal | pressed repeatedly, `Hint (N of M)` |
| End state | gone | **disabled, not hidden** |

They are siblings and should not behave differently. Implemented as `Show hint action` on
`LMS / Quiz · Question Card` — a `Hint` button in the same row, on Unanswered, Selected, Incorrect,
Last attempt and Saved.

**⚠︎ This revisits a stakeholder decision.** The Aug 6 review asked for *"a navegação de Hints dentro do
componente"*. The platform does the opposite: the hint list renders as an `<ol>` and the button stays in the
action row for every press. Keeping the nav inside the alert would mean the control moves location between
the first press and the second, and that two sibling controls behave differently. **`Show hint nav` is
therefore now default `false`** — the variant is kept for mode B if the shell still wants it, but the footer
button is the mechanism. Worth confirming at the next review rather than assuming the change is accepted.

**What happens after hint 1:** the alert appears above the footer with hint 1; the footer button stays put
and each press appends the next hint below the previous (§12.5); after the last one the button goes disabled
and the full list remains on screen.

### 12.10 Open question added to the Studio list

**What does the hint button say before the first press?** Our component says `Next hint`, which is right from
the second press on — but on the first there is nothing to be "next" to, and the platform most likely writes
just `Hint`. The string lives in the Mako template `problem.html` that `capa_block.py` renders via
`render_to_string`, and **that file is not in the public `edx-platform` tree** — four candidate paths return
404 and the GitHub code search API requires authentication. It is not verifiable from source alone.

**It is trivial to settle in Studio:** author one `<demandhint>` on a QA test course and read the button
before clicking it. Added to what Studio unblocks, alongside the feedback coverage of the 165 production
questions, the five settings, and the `Hide content after due date` shell for gap 6.

Until then the label is **⚠︎ unverified**, and the pre-hint state should not be handed over as final.

### 12.11 Validation after the hint-control pass *(Aug 6, 2026)*

Properties arrived with the intended defaults: `Show hint action` false, `Show next action` false,
`Show hint nav` false, `Show hint 2` / `Show hint 3` false, and `Tone=Hint` present on the alert.

| Check | Result |
|---|---|
| Broken instances · local components | 0 · 0 |
| Cards offering *Next question* | 0 |
| Cards with the `Hint` button | 4 |
| Cards with a hint revealed | 2 |
| Hint alert tone | 2 × `Tone=Hint` |
| Stepper bars | 23 × `Mode=With Back only` |
| Alert titles | Success 11 · Incorrect 7 · Answer 5 · Partially correct 6 |

**The hint route now shows both halves of the interaction**, which it never did before: `Submits — wrong`
carries the `Hint` button with **no hint on screen** — the state that makes the first press possible — and
`Asks for a hint` carries the button *and* the revealed hint. Four cards with the button, two with a hint,
in both modes. Previously only the second state existed, which is what made the missing control invisible.

### 12.12 `Tone=Answer`, and the rule the alert component now follows *(Aug 6, 2026)*

The Show answer box gets its own tone, as the hint did. Rather than invent a look for it, the distinction was
read off what the component already does — and stating that rule was more useful than the variant itself.

**Two families now live in `LMS / Inline Alert`:**

| Family | Tones | Shape | Border | Meaning |
|---|---|---|---|---|
| **Verdict** | Info, Success, Warning, Error | square (radius 0) | coloured by outcome | what happened *after* the learner acted |
| **Revealed content** | Hint, Answer | rounded (radius 8), tinted fill | see below | material the learner *asked* to see |

Within the revealed family the border carries the meaning:

- **Hint — no border.** Tentative, an aside offered before judgement. Glyph `lightbulb-01`.
- **Answer — keeps the border.** Final, the resolution. Glyph `key-01`.

Read as one sentence: **rounded means revealed, and the border says whether it settles the question.** That is
why Answer is not simply "Info with a different icon" — the two are doing different jobs, and a learner who
has just spent their last attempt should be able to tell at a glance which one they are looking at.

`State=Answer revealed` on the card now points at `Tone=Answer`, titled **Answer**, with the solution text
below — which is the shape the platform actually delivers: the correct options marked in place, plus the
authored `<solution>` if one exists (§12.2).

**Also applied:** `Show hint nav` was removed from the alert entirely. The hint control lives in the card's
Secondary actions beside Show answer and stays there for every press (§12.9), so the in-alert nav had no job
left. The stakeholder ask for in-component navigation is superseded — worth confirming at the next review.

### 12.13 Icon tokens and text styles across all six tones *(Aug 6, 2026)*

Two drift problems, one of which predated the new variants.

**Icon colour.** `Tone=Hint` and `Tone=Answer` carried raw stroke paints. Both are now bound to
**`LMS/Text/text-brand-secondary`** — the same token `Tone=Info` uses. That is the right choice rather than a
convenient one: Success, Warning and Error bind to their outcome tokens because the icon *is* the verdict,
and revealed content has no outcome to report, so it takes the neutral brand colour.

**Text styles — and the drift was older than the hint work.** Only the *description* line of each verdict tone
carried a style; every **title** in the component, including the four original tones, had none. So the alert
had been shipping half-styled since before any of this. All eighteen text layers across the six tones now
resolve to styles:

- titles → **`Body/Small/Semibold`**
- body and secondary text → **`Body/Small/Regular`**

The three hint lines are the interesting case. They need a bold prefix inside an otherwise regular line
(§12.7), which a single style cannot express — and hard-setting the font would have reintroduced exactly the
raw values we were removing. They use `setRangeTextStyleIdAsync`: Semibold on `Hint (N of M): `, Regular on
the body. They read as `MIXED` because two styles apply by range, which is the correct state here, not drift.

**Verified after the pass:** six tones, six bound icon colours, zero raw text.

### 12.14 `Tone=Answer` recoloured — grey block, dark border *(Aug 6, 2026)*

Answer moves off the brand tint onto neutral grey with a strong border:

| | Fill | Border | Glyph |
|---|---|---|---|
| Hint | `LMS/Background/bg-brand-primary_alt` | none | `lightbulb-01` · `LMS/Text/text-brand-secondary` |
| Answer | `LMS/Background/bg-secondary` | `LMS/Border/border-primary` | `key-01` · `Colors/Text/text-secondary (700)` |

Both remain rounded at 8, so they still read as one family — revealed content, not verdicts. What separates
them now carries meaning rather than just distinguishing them: **the brand tint invites, the grey block
closes the question.** A hint is an offer the learner can take or leave and go on answering; the answer ends
the exchange, and neutral grey with a hard edge says that without borrowing the red of a wrong answer or the
green of a right one — which would both be misleading, since a revealed answer is neither.

The glyph moved to `text-secondary` to sit with the grey rather than against it. Every value is a
multi-mode alias, so the whole treatment follows light and dark themes without a second variant.

### 12.15 `REVEAL CONTROLS` — the hint sequence drawn press by press *(Aug 6, 2026)*

A new band in mode A, because neither control is guessable from a single screen. Path 1 draws the hint
sequence in four states:

| Step | Card | Alert |
|---|---|---|
| Wrong — hints exist, none asked | `Hint` button live | **none** |
| Presses Hint — the first appears | button live | hint 1 |
| Presses again — the second is added | button live | hints 1 **and** 2 |
| Presses again — the last, control now spent | button **disabled, still in place** | hints 1, 2 and 3 |

The first and last states are the ones that were missing everywhere else. Without the first, the press that
starts the sequence has no screen to happen on. Without the last, nothing shows what the end of the sequence
looks like — and the end is not an empty box or a vanished button, it is a full list with a dead control
beside it.

The note on the band says the part the screens cannot: hints accumulate because the platform re-renders the
whole list on every press, and the button goes disabled rather than disappearing, so the learner can see
there is nothing left to ask for instead of watching a control vanish from under the cursor.

**Path 2, the Show answer sequence, is not built yet** — it needs `Tone=Answer`, which is in the DS but has
not reached the ICP file. Drawing it against `Tone=Info` would put the wrong container on the wall, so it
waits.

**State:** 0 broken, 0 local, 8 cards with the `Hint` button, 5 with a hint revealed.

### 12.16 Path 2 — Show answer, and the ending that contrasts with hints *(Aug 6, 2026)*

| Step | Card | Alert |
|---|---|---|
| Attempts spent — the answer can be asked for | `Show answer` live, attempts read `2 of 2` | **none** |
| Presses Show answer — it appears | control **gone** | `Tone=Answer`, solution below |
| The question is closed | no controls, Submit removed | answer stays |

**The two paths in this band exist to be read against each other**, and the ending is where they diverge:

- **Hint** ends with the control **disabled and still in place** — the sequence has more states behind it, and the learner needs to see that there are none left.
- **Show answer** ends with the control **gone** — it has no second state to serve. Leaving a dead button there would imply something further to ask for.

Same row, same job, opposite endings. That is not a styling choice; it follows from one being repeatable and the other terminal.

**What the box does and does not contain.** `problem_show` returns the correct choice ids, and the platform marks them **on the options themselves**. The alert carries the written `<solution>` — and only when an author wrote one, which on our courses is usually not the case (§12.2). Putting the answer text inside the box would draw something the platform does not do.

> ⚠︎ **This route reaches no learner today.** `showanswer` is off in every course we can read, so the whole path is available on the platform and unreachable in the product. It goes into the handoff as **available, not enabled**, alongside the unverified hint-button label.

**State after the pass:** 0 broken, 0 local, alert tones in use across both sections — Answer 5, Hint 5, Success 6, Warning 14, Error 8, Info 2.

### 12.17 Radio, not checkbox — and the header lines were never a platform instruction *(Aug 6, 2026)*

Nelson: *"the checkbox should be a radio when the quiz is not multiple-answer"*, and *"what do you mean by
`1 point possible (graded)` — where is that from?"* Both were checked against rendered problems on dev rather
than reasoned about. Both were wrong on our wall, in different ways.

**1 · Single-select emits `radio`, and nothing else.** A single-answer question on dev renders
`type="radio"` × 3 and **zero checkboxes**. Only the SKOAIFP01 bucket emits both, because it holds
single- and multi-answer questions inside one problem. Every `LMS / Quiz · Option Row` variant now defaults
to `Type=Radio`; `Checkbox` is switched on only for genuine multi-select. This matters beyond looks — a
checkbox tells the learner they may pick several, which on a single-answer question is a false affordance
before they have answered anything.

Note the consequence for two states: `Missed` and `Correctly unselected` exist for multi-select marking and
have no meaning on a radio. Recorded in the component description.

**2 · `1 point possible (graded)` is edX's `problem-progress` element — and it is empty everywhere.**
Searching the rendered HTML for `point possible` returns **nothing** in any course tested. The element is
present and blank. So we had drawn a line the platform is not showing. It is now behind `Show points`,
defaulting to **false**.

**3 · The line above it is the block's `display_name`, not an instruction.** This is the sharper of the two.
`<h3 class="problem-header">` carries whatever the author named the block:

| Course | What the header actually says |
|---|---|
| SKOAZ204EEP | `Choose the correct option(s)` |
| SKOADM01EN | `Question 1` … `Question 10` |
| SKOAIFP01 | `Practice Quiz: Getting Started: AI for Financial Analysis` |

We had copied AZ-204's string onto the component and read it as the platform telling the learner what to do.
It is authored text, it differs per course, and in two of three courses it is not an instruction at all. The
frame is still called *Platform prompt* — the name is now wrong, and the description says so rather than
silently renaming a property that boards depend on.

**This is the third case in the same family**, after `showanswer` and the hint button: a thing that looks
like platform behaviour turning out to be a course-authoring artefact. Worth a standing check before
anything else is drawn as "what the platform does".

### 12.18 Applied to the boards — the control now matches the question *(Aug 6, 2026)*

| | Radio | Checkbox |
|---|---|---|
| Single-answer paths | **168** | 0 |
| Multi-select paths | 0 | **12** |

A clean split, and it took three passes to get there rather than one. Changing the default in the main
component moved 169 rows, but it moved them **all** — including the two multi-select paths, which then had to
be put back. And eleven rows in single-answer paths stayed on checkbox because they carried instance
overrides from when the boards were built.

Both directions of the same trap, in one operation: **a default change propagates to instances that never
disagreed with it, and skips the ones that did.** The rows that most needed correcting were exactly the ones
the propagation could not reach.

`Show points` is off on every card, matching a platform that renders that element empty in every course we
can read.

**State:** 0 broken, 0 local, 180 option rows carrying the right control for their question type.

---

## 13. DS token audit of the LMS components *(Aug 6, 2026)*

### 13.1 The LMS components had drifted from the base library

Audited against `Buttons/Button` from the Untitled UI base, which is fully tokenised — 156 bound paddings,
101 bound gaps, 141 bound radii, zero unbound. The LMS set was not:

| | bound | unbound |
|---|---|---|
| `LMS / Quiz · Question Card` | 15 pad · 39 gap · 19 radius | **69 pad · 89 gap · 37 radius** |
| `LMS / Inline Alert` | 0 · 0 · 1 | **6 pad · 12 gap · 1 radius** |

So this was not a few stragglers — the base library binds spacing and radius everywhere and our LMS layer
largely did not. **412 bindings applied** across the six quiz components: 215 paddings, 140 gaps, 57 radii,
all to the semantic layer the rest of the library uses (`Spacing/*`, `Radius/fixed-*`) rather than to the raw
`Numeric/*` primitives beneath it.

Colour came out clean: **zero raw fills or strokes** in Question Card, Option Row, Inline Alert and Entry
Header. The two in Stepper Bar and eight in Results are noted below.

### 13.2 ⚠︎ 232 values that are not on the scale at all

These could not be bound because **no token has their value**:

| Value | Occurrences |
|---|---|
| 14px padding | 128 |
| 10px padding | 72 |
| 28px padding | 8 |
| 22px padding | 4 |
| 10px gap | 12 |
| 18px gap | 4 |
| 3px gap | 4 |

The scale runs 0 · 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48… — 14, 10, 28, 22, 18 and 3 are simply
off it. Binding them means **snapping to a neighbouring token and moving pixels**, which is a design decision
and not a cleanup, so they are left as they are and listed here. 14 → 16 and 10 → 8 would cover 200 of the
232 on their own.

### 13.3 Text styles — the gap is partly missing styles, not missing bindings

Unstyled text falls into ten buckets. Four have an obvious home:

| Size / weight | Count | Style |
|---|---|---|
| 16 Medium | 9 | `Body/Default/Medium` |
| 14 Regular | 11 | `Body/Small/Regular` |
| 12 Medium | 4 | `Caption/Medium` |
| 20 Bold | 4 | `Heading/H6/Bold` |

**Six buckets have no matching style in the library at all** — 11 Medium (18), 15 SemiBold (13), 13 Medium
(8), 11 SemiBold (4), 22 Bold (4), 34 Bold (2). These cannot be fixed by binding: either the type scale gains
those steps, or the components move onto sizes the scale already has. Same class of decision as §13.2, and
the same reason it is surfaced rather than forced.

### 13.4 All 68 LMS components swept *(Aug 6, 2026)*

The remaining 62 components were bound on the same rules. Totals across the whole sweep:

| Bound | Count |
|---|---|
| Paddings | **470** |
| Gaps | **274** |
| Radii | **255** (213 fixed steps + 42 pill/full) |

`Radius/fixed-full` needed a rule of its own: pill radii were authored as `999`, `9999` and even
`8999.09`, all meaning the same thing. They now resolve to one token.

**State after the sweep:**

| | Remaining |
|---|---|
| Raw fills | **18** — `Answer Input` 9, `Results` 4, `Topic · Author & Updated Date` 3, `Stepper Bar` 2 |
| Raw strokes | 7 |
| Unbound padding | 171 |
| Unbound gap | 46 |
| Unbound radius | 28 |
| Text without a style | **283** |

Every remaining number is one of the two decisions in §13.2 and §13.3, not leftover work: the paddings and
radii are off-scale values with no token to bind to, and the text is mostly sizes the type scale does not
contain. Nothing was snapped and nothing was invented.

The 18 raw fills are worth a separate look — they are concentrated in four components rather than spread,
which usually means a handful of decorative shapes (progress bars, dividers) that were drawn rather than
tokenised.

**What this changes for the handoff.** The quiz components are now consistent with the base library on
spacing, radius and colour, so a developer reading them gets tokens rather than numbers. The type scale is
the one place where the library genuinely cannot express what the components use — that is a DS decision to
take before handoff, not a defect to fix quietly.

### 13.5 Closing the audit — snapped, styled, and the fills explained *(Aug 6, 2026)*

**The 18 raw fills were three unrelated problems**, which is why they clustered:

| Where | What it actually was | Fix |
|---|---|---|
| `Answer Input` (9) | `Input field` / `Select` **instances** with a white fill painted over them | bound to `LMS/Background/bg-primary` |
| `Results` (4) | the four component roots — the card surface itself | same token |
| `Stepper Bar` (2) | `Progress bar` instances, same white override | same token |
| `Topic · Author & Updated` (3) | **text** in pure `#000000` | `text-primary (900)` for the name, `text-secondary (700)` for role and date |

Only the last was a real colour mistake. Pure black is not in the palette at all — it had been typed rather
than picked, and at 100% it is heavier than any text token in the system.

**Spacing.** `14 → 16` and `10 → 8` applied across all 68 components: **328 paddings and 28 gaps**. Combined
with the earlier pass, **1,355 bindings** in total.

**Type.** Two distinct groups, and separating them mattered:

- **170 text layers already had a matching style** and had simply never been bound — no scale change needed.
- **106 sat on sizes the scale does not contain.** Rather than add six steps, they were snapped onto the
  existing scale: 11→12, 13→14, 15→16, 10→12, 22→24, 28→30, 34→36.

**Why snap rather than extend.** The type scale is modular and intact — 12 · 14 · 16 · 18 · 20 · 24 · 30 · 36
· 48 · 60 · 72. Inserting 11, 13, 15, 22, 28 and 34 would put a step between almost every existing pair and
leave a designer choosing between 14 and 15 with nothing to decide on. Every snap is +1px or +2px, below the
threshold anyone will notice, and 10px text moving to 12px is a small accessibility gain rather than a loss.

**Final state across all 68 LMS components:**

| | Remaining |
|---|---|
| Raw fills | **0** |
| Text without a style | **0** |
| Raw strokes | 7 |
| Unbound padding | 21 |
| Unbound gap | 18 |
| Unbound radius | 28 |

What is left is a short, specific list — `28px` padding (5), `3px` padding, and radii of `13`, `3` and `1.5`.
Radius 13 and 1.5 are the interesting ones: they are almost certainly meant to be 12 and 2, and are the kind
of value that arrives from nudging a handle rather than typing a number.

### 13.6 Audit closed — zero unbound values across all 68 components *(Aug 6, 2026)*

| | Before | After |
|---|---|---|
| Raw fills | 18 | **0** |
| Raw strokes | 7 | **0** |
| Unbound padding | 171 | **0** |
| Unbound gap | 46 | **0** |
| Unbound radius | 28 | **0** |
| Text without a style | 283 | **0** |

The last pass was mostly near-misses rather than decisions, which is what the leftovers usually are:

- **Radius `13` → 12, `1.5` → 2, `3` → 4.** Handle-drag residue.
- **Pill radii `999`, `9999`, `8999.09`** → one `Radius/fixed-full`. Three numbers, one intent.
- **Gap `10.799999237060547`** → 12. A dragged value carried to fifteen decimal places.
- **Padding `28` → 24, `3` → 4, `9` → 8, `18` → 16, `22` → 24.**
- **Border `#d9dee5` on the four `Results` cards** → `LMS/Border/border-secondary`, which is `#d5dce2`. Four
  points off per channel — typed from memory rather than picked, and invisible until something enforces it.
- **Three `#000000` @ 10% strokes** on video and avatar frames → `Colors/Border/border-secondary_alt`, which
  is that exact colour, so the alpha stays and the value stops being loose.

**Two things worth carrying forward.** First, the near-misses — `#d9dee5` for `#d5dce2`, radius 13 for 12 —
are the ones no review catches by eye, and they are also the ones that make a design system quietly
untrustworthy: the token exists, the component looks right, and the value is still hand-made. Second, none of
this was visible from the canvas. It took reading the file rather than looking at it.

The LMS layer now matches the base library on every axis the audit can measure.

### 13.7 `option(s)` — the plural was ours to stop copying *(Aug 6, 2026)*

The header read *"Choose the correct option(s)"* on cards whose control is a radio. Fixed: **48 cards to the
singular, 4 multi-select cards to the plural**, and the DS default is now singular across all nine variants,
since the default control is a radio.

Where the plural came from is the part worth keeping. It is not our copy — **every problem in SKOAZ204EEP is
titled `Choose the correct option(s)` by its author, and every one of those 48 questions is single-select**
(§12.17: three radios, zero checkboxes). The hedge is in the live content, on questions that never allow more
than one answer.

So the mismatch we just removed from the boards **still exists in the product**, on 48 questions. That is a
content note for the course team rather than a design fix, and it belongs with the other authoring findings:
the `(s)` tells a learner they may select several, and then the control refuses.

We had also been treating that string as a platform instruction until §12.17 showed it is the block's
`display_name`. Copying it onto a component turned one course's authoring habit into a system-wide default —
which is exactly how this kind of thing spreads.

### 13.8 `Stroke/icon` — a token for icon weight *(Aug 6, 2026)*

Nelson's call, and the right one: define it once rather than typing 1.5 in hundreds of places.

**What was there:** every icon sampled — 400 of them — carried a **raw `strokeWeight` of 2**, with no token
of any kind for stroke width in the library. `Width/*` exists for widths, `Spacing/*` for spacing,
`Radius/*` for corners; stroke weight had simply never been named.

**Created:** `Stroke/icon = 1.5` in the `3. Responsive 📐` collection, set across all three modes
(Desktop · Tablet · Mobile) and scoped to `STROKE_FLOAT` so it only offers itself where it makes sense.

**Applied:** **536 icon vectors** across the 68 LMS components now resolve to it; 80 were already bound.

**Why 1.5 rather than the 2 the set ships with.** Untitled UI draws its icons at 2px, which sits heavier than
our type at the sizes we actually use icons — 16 and 20px, beside 12–16px text. At those sizes a 2px stroke
makes the icon the loudest thing in a row it is meant to support. The alerts are the clearest case: a
lightbulb heavier than the hint it introduces.

> **Scope, stated plainly.** This binds the icons **inside the 68 LMS components**, not the icon library
> itself. Every icon component on the Icons page still ships at a raw 2px, so an icon dropped in fresh will
> arrive heavy until it is bound. Doing it at source would fix that in one pass and change every icon in
> every file that uses this library — a bigger decision than this audit, and one to take deliberately rather
> than as a side effect.

### 13.9 Done at source — the whole icon set, weight and colour *(Aug 6, 2026)*

Nelson took the bigger option, and it was the right one: fixing 68 components while the library kept
shipping raw 2px would have meant every newly placed icon arriving wrong.

**`Icon/default`** created alongside `Stroke/icon`, in `1. Semantics`, across all four modes
(Light/Dark × SKO/BrandX). It **aliases `Colors/Foreground/fg-quaternary (400)`** rather than restating a
colour — the neutral an icon takes when it supports text rather than carrying meaning itself. Scoped to
`STROKE_COLOR` and `SHAPE_FILL`.

**Applied across the entire Icons page — 1,173 components, 1,181 stroked shapes.** Every one now resolves
both weight and colour to a token:

| | Before | After |
|---|---|---|
| Stroke weight | 2px, raw, 1,181 shapes | **`Stroke/icon` = 1.5, 0 unbound** |
| Stroke colour | raw, 1,181 shapes | **`Icon/default`, 0 unbound** |

**The alias matters more than the value.** Because `Icon/default` points at a foreground token rather than
holding a colour, icons now follow theme and brand automatically — a dark-mode or BrandX switch moves them
without anyone touching an icon. Before this, 1,181 shapes held a colour that could not respond to either.

**The rule for using them.** `Icon/default` is what an icon takes when it is supporting text. Override with a
semantic foreground — `fg-success-primary`, `fg-error-primary`, `fg-brand-secondary` — only when the icon
**is** the message, which on our components means the alert glyphs and nothing else. That distinction is
written into the variable description so it travels with the token.

---

## 14. The Ready-for-Dev page *(Aug 6, 2026)*

Page renamed **`↳ Phase 1 · Quizzes — Ready for Dev 🟢`**, restructured into ten sections for three
audiences at once.

| Section | For | What it carries |
|---|---|---|
| 00 · Read me first | everyone | **the rule** — ⚙ setting · ✎ authoring · ↻ runtime · ▣ shell, and *if it is ⚙ or ✎, do not build* |
| 01 · What a quiz is on this platform | PM, stakeholders | types are not platform types; the three authoring shapes with measured counts |
| 02 · The journeys — mode A | stakeholders, PM | the existing end-to-end flows, 33 cards |
| 03 · The kit | devs, designers | **11 components, 51 variants**, named exactly as in the DS |
| 04 · What controls what | **devs** | the property map as a table on the wall, plus the doc link |
| 05 · Behaviour you cannot see in a screen | **devs** | the five things no static frame carries |
| 06 · Decisions taken, and what they cost | PM, stakeholders | each decision with its reason, not just its outcome |
| 07 · Open questions | PM | four, each with what it blocks; two still able to change a screen |
| 08 · Not in this handoff | everyone | mode B, ORA, SCORM, timed exams, unused answer types |
| 09 · Mode B ⏸ pending | — | kept, marked, explicitly not to be estimated |

**Why this order.** 04 and 05 sit before the decisions and the open questions because a developer stops
reading the moment they find what they came for — and what they came for is *what do I actually build*. 08
exists because without it someone asks about mode B mid-sprint.

**The rule leads the page** because the single largest risk in this handoff is someone implementing
configuration. Ten of the Question Card's twelve booleans are ⚙ or ✎.

**Audit:** 0 broken instances, 0 local components, 69 question cards across the page.

Two ⚠︎ markers are deliberately left on screens rather than buried in section 07 — `showanswer` and
hide-after-due can both still change what is drawn, and a reader who starts at section 02 must meet them
there rather than discover them after estimating.

### 14.1 The kit split in two — a label was not enough *(Aug 6, 2026)*

Nelson: *"`LMS / Quiz · Results` doesn't exist in version A, right?"* Correct, and it exposed a structural
problem rather than a wording one. `Results` and `Entry Header` each carried a `▣ shell — mode A has no…`
note, but they sat **interleaved with the components that do exist**. On a specimen sheet, a one-line note
under a heading is not a boundary — a reader scanning variants sees screens and assumes they are on the menu.

The kit is now two groups with their own headers:

**Group A — what the platform renders today.** Question Card, Option Row, Inline Alert, Answer Input, Gate,
Exam Timer, Grade Summary. A developer finds these in the markup; section 04 says what switches each on.

**Group B — ▣ shell only, NOT in this handoff.** Entry Header, Results, Stat Tile. edX has no quiz-level
submit, no entry screen and no results screen — each question is an independent problem. They are drawn so
the kit is complete and so section 09 has something to point at, and the header says *do not estimate them*.

`Grade Summary` stays in Group A on purpose and its note was sharpened: it is the **course gradebook on the
Progress tab**, which does exist today — and it is the only ending mode A has. `Stat Tile` moved to Group B
with a caveat, since it only reaches mode A through Grade Summary.

**The lesson is about specimen sheets generally:** a variant grid reads as an inventory of what is available.
If part of it is not available, that has to be structural — a separate group with its own heading — because
nobody reads the caption before looking at the pictures.

### 14.2 Every specimen states its own status *(Aug 6, 2026)*

Grouping was still not enough. `Results` read *"the screen after a quiz ends"* — accurate as a description
and misleading as a status, because a specimen gets linked, screenshotted and pasted into a ticket **without
its group header**. Each item now carries its own verdict as the first thing in the line:

| Component | Note now opens with |
|---|---|
| Question Card | ✓ EXISTS TODAY — the problem block itself, rendered server-side by capa |
| Option Row | ✓ EXISTS TODAY — radio for single-answer, checkbox only for genuine multi-select |
| Inline Alert | ✓ EXISTS TODAY, except Info |
| Answer Input | ✓ EXISTS ON THE PLATFORM, used by no course we have read |
| Gate | ✓ EXISTS TODAY — belongs to neither mode |
| Exam Timer | ✓ EXISTS ON THE PLATFORM, no course uses it |
| Grade Summary | ✓ EXISTS TODAY — the only place a learner sees a score in mode A |
| **Results** | **▣ DOES NOT EXIST IN MODE A** — no quiz-level submit, so no end-of-quiz screen; the quiz simply stops |
| **Entry Header** | **▣ DOES NOT EXIST IN MODE A** — the learner lands straight on question 1 |
| **Stat Tile** | **▣ NOT REACHABLE ON ITS OWN** — reaches mode A only through Grade Summary |

Three shades, not two: *exists and is used*, *exists on the platform but no course uses it*, and *does not
exist at all*. The middle one matters — `Answer Input` and `Exam Timer` need building for a course we did not
author, while `Results` needs a product decision first.

**Mode B moved** to the discovery page (`Topic Content Types — Ready for Review`, section 08), and section 08
of this page now points there rather than to a section that is no longer below it.

**Full-page audit after the move:** 0 broken instances, 0 local components, 42 question cards, **0 outside
the mode A preset**, 0 offering *Next question*, 123 radios to 10 checkboxes.

### 14.3 Five components cut from the handoff *(Aug 6, 2026)*

Nelson's call: remove anything not currently in use, until told otherwise. Applied to
`Answer Input`, `Exam Timer`, `Results`, `Entry Header` and `Stat Tile`. **They stay in the design
system** — this is a scope cut, not a deletion.

**Two journeys went with them**, and this was checked before deleting rather than discovered after:
`JOURNEY · Final › timed exam` (its only content was the three timer states) and the whole `ANSWER TYPES`
band (its only content was the three input types). Final's paths were renumbered 1–4.

**One consequence that only surfaced from the dependency check:** `Gate = Expired` is a timed-exam state, so
with timed exams out of scope it is now unreachable — it appears in no journey. The variant stays in the kit
because `Gate` stays, and its note now says which four of the five are live.

**Section 08 became the record of what was cut and why**, with the reinstatement trigger written down:

> *Reinstate `Answer Input` and `Exam Timer` before a course starts using either — the shell must render a
> problem type we did not author.*

That line matters more than the cut. Dropping unused components is cheap; the expensive failure is dropping
them silently and meeting a dropdown question in production.

**Page after the cut:** 9 sections, 42 question cards, 0 broken, 0 local, 0 outside the mode A preset,
123 radios to 10 checkboxes. The kit is now five components — Question Card, Option Row, Inline Alert, Gate,
Grade Summary — which is an honest picture of mode A.

### 14.4 The primary button never changes its label *(Aug 6, 2026)*

Nelson asked whether the Submit CTA on `State=Correct` should read **Submitted**, disabled. Checked against
the rendered platform first, and the answer is half yes:

```html
<button class="submit btn-brand" data-value="Submit" disabled>
  <span class="submit-label">Submit</span>
</button>
```

**edX toggles `disabled` and never relabels.** Not to *Submitted*, not to *Try again*, not to *Next question*.
And in mode A that markup is server-rendered inside the iframe, so relabelling it is not a copy change we can
make — it would need a platform fork. *Submitted* belongs to mode B.

**The check found something worse than the question.** Four states still carried `Next question` in the
**primary** button, and `Incorrect` carried `Try again` — neither exists on the platform. They survived the
Aug 6 decision to take Next question off the card, because that pass removed the *secondary* button and never
looked at the primary one.

| State | Was | Now |
|---|---|---|
| Correct | Next question · enabled | **Submit · disabled** |
| Incorrect | Try again · enabled | Submit · enabled |
| Partially correct | Next question · enabled | Submit · enabled |
| Answer revealed | Next question · enabled | **Submit · disabled** |
| Results withheld | Next question · enabled | **Submit · disabled** |

The rule, now in the component description: **disabled when the problem is finished** — correct, attempts
spent, answer revealed, results withheld, past due; **enabled while an attempt remains**. Unanswered is
disabled because nothing is selected yet.

A removal is not finished when the thing is off the screen. It is finished when nothing else still refers to
it — and here the label of a different control was still carrying the idea.

### 14.5 Delivery format — the Practice row across three devices *(Aug 6, 2026)*

Second delivery surface, matching the one already approved for Video Lesson:
**`ICP Phase 1 - Quiz (A) - Light - Ready ✅`**. Same anatomy — one row per topic, three cards per row, each
holding a full course-player screen at 1440 · 960 · 375.

**Row 1 · Practice quiz is complete.** The desktop screen already carried the quiz; tablet and mobile still
held the video-lesson content and now carry the same `Topic header` + `Questions List`, resized to fill.
Mobile keeps its own order — quiz first, then Content Feedback and Navigation Buttons below.

**The audit caught two things the eye would not.**

`Next question` had come back on two of the three Correct cards. It was not a regression in the boards — the
cards were cloned from the desktop between a fix and a republish, and carried the old value across. Third
time an override has outlived a correction; the sweep is now part of the routine rather than an afterthought.

**And all six cards were showing “You have used 0 of 2 attempts” on a Practice quiz.** Practice has unlimited
attempts, and the platform prints *no attempts line at all* — verified on dev, where a practice problem
returns neither the line nor a Save button. Both are now off across the row. This is the same mistake in a
new place: a value that looks like a decision and is actually an inherited default, which is exactly what
§12.17 and §13.7 were about.

**State:** 0 broken instances, 0 unexpected local components — the only two are the iPhone status bar and home
indicator, which are device chrome inherited from the approved Video Lesson template. Six cards, all in the
mode A preset, 18 radios.

Rows 2 and 3 — Graded and Final — clone from this one once it is signed off, so the template is right before
it is multiplied.

### 14.6 Two different answers to one question *(Aug 6, 2026)*

Nelson: *"why are the Submit button and the attempts counter hidden on these screens?"* They were hidden for
two unrelated reasons, and only one of them was right.

**The attempts counter — correct, and it should stay hidden.** This row is a **Practice** quiz, which has
unlimited attempts, and the platform prints **no attempts line at all** in that case. Verified on dev: a
practice problem returns neither the line nor a Save button. It does not say "unlimited" and it does not
count up. On the Graded and Final rows the line comes back, because there the attempts are finite and edX
does print it.

**The Submit button — a real defect.** It was **hidden by a manual layer override**, not by the property:
`Show submit` read `true` on every card while the button underneath was switched off by hand. And its label
had been typed as **"Submited"** — a misspelling that no property would ever have produced, which is the
tell that it was hand-edited.

Fixed on all six cards: the button is visible, labelled `Submit`, and `Disabled` on Correct and Unanswered —
which is what the platform renders. §14.4 has the rule.

**This is the fourth time a manual visibility override has beaten a property in this project.** The pattern is
now clear enough to state as a working rule: **if a control is missing and its property says it should be
there, look for `visible: false` on the layer before looking anywhere else.** The properties panel will not
show it, and the canvas gives no sign that a property is being ignored.

### 14.7 All nine delivery screens *(Aug 6, 2026)*

Rows 2 and 3 cloned from the signed-off Practice row. What differs between the three is exactly what the
platform settings make differ — nothing was styled differently for effect:

| Row | Attempts line | Save | Question 2 shows |
|---|---|---|---|
| **Practice** | **none** — unlimited, so the platform prints nothing | absent | answered correctly, Submit disabled |
| **Graded** | `0 of 2` · `1 of 2` | **present** | wrong with one attempt left, Submit still enabled |
| **Final** | `0 of 1` · `1 of 1` | absent | closed, Submit disabled |

Each row's card header says what makes that type different rather than repeating the layout: Graded carries
the Save trap — *a saved answer survives a reload, spends no attempt, and scores zero, and nothing on the page
says so* — and Final carries the absence of recovery.

**Two overrides had to be swept again**, and both are worth recording because they recurred *after* being
fixed:

- `Show next action` came back true on all nine screens. Fixed, and the secondary `Next question` layer was
  hidden as well — the property alone was not enough, which is the same trap as §14.6.
- The Submit button re-hid itself on all six `Correct` cards. Unhidden, verified in the same call this time
  rather than in a later audit.

**That is the fifth and sixth time.** The working conclusion is not "be careful" — it is that
**a fix and its verification must happen in one operation**, because anything that clones, republishes or
resets in between will quietly reintroduce the value. Every audit in this document that found a regression
had a gap between the fix and the check.

**Final state:** 9 screens, 18 question cards, 0 broken, 0 unexpected local components, 0 outside the mode A
preset, Submit visible and correctly enabled or disabled on every card.

> **Shared question content across the three rows is deliberate.** The audience is developers, so holding the
> question constant makes the only variables the ones that matter — attempts, Save, and the Submit state.
> Giving each type its own question would read better in a stakeholder deck and worse here, because the
> difference between the rows would stop being obvious at a glance.

### 14.8 The Practice screen now carries every state Practice can reach *(Aug 6, 2026)*

The reset returned both blocks to component defaults — which meant mode **B** preset, since `Show platform
prompt` defaults off and `Show next action` had drifted back on. Restored and expanded to **seven blocks**,
each with its own question and its own option marking:

| # | State | Also showing | Control |
|---|---|---|---|
| 1 | Unanswered | Hint button available | radio |
| 2 | Selected | Hint button available | radio |
| 3 | Incorrect | per-choice feedback | radio |
| 4 | Incorrect | **hint revealed** + Show answer | radio |
| 5 | Correct | explanation, Submit disabled | radio |
| 6 | **Partially correct** | Missed + Correctly unselected marking | **checkbox** |
| 7 | Answer revealed | solution, Submit disabled | radio |

**Three states are missing on purpose, and that is the finding.** A Practice quiz cannot reach them:

- **`Last attempt`** — attempts are unlimited, so there is never a last one.
- **`Saved`** — the platform hides Save when submitting costs nothing.
- **`Results withheld`** — Practice always shows correctness.

They belong on the Graded and Final screens, where the settings make them reachable. Putting all nine states
on a Practice screen would have shown three that no learner can meet there — the same class of error as
drawing an attempts line on unlimited attempts.

**`Next question` came back a seventh time**, on blocks 5–7, immediately after being set false in the same
script that created them. Fixed and read back in one call, per §14.7. The recurrence pattern is now specific
enough to be worth naming: it returns on **cloned instances**, because the clone carries the source's
resolved value rather than the property that was about to be written.

### 14.9 `Show attempt meter` — a good idea, parked in the right mode *(Aug 6, 2026)*

Nelson added a badge row above the footer on `State=Last attempt` — the attempt in progress, and whether a
draft is held — and asked whether it made more sense than the plain text line. It does, and it is now a
property defaulting **off**.

**Why it is better.** It moves *status* out of the footer and leaves the footer for *actions*. `Attempt 2 of 2
· last attempt` as a badge is read at a glance; `You have used 1 of 2 attempts` sitting beside the button is
not.

**Why the draft badge is the important half.** The Save trap is the sharpest usability gap in this product —
a saved answer survives a reload, spends no attempt, and **scores zero**, and nothing on the page says so.
A persistent badge is the one place that sentence can live. Its wording is now
**"Draft saved · scores nothing until submitted"**, and it is bound to `Show save`, so it cannot appear on a
variant where saving is impossible.

**Why it must default off.** In mode A the attempts line is rendered by the platform inside the iframe
(`.submit-attempt-container`). A badge row is our chrome and there is nowhere to inject it without touching
the platform. Left on, the mode A handoff would show something nobody can build — the same failure as drawing
an entry screen.

**The counters disagreed and now do not.** The badge said `attempt 2 of 2` while the footer said
`used 0 of 2`. On a last attempt one has already been spent, so the footer reads **used 1 of 2** and the badge
reads **Attempt 2 of 2** — the same fact from two directions. The component description adds the rule: when
the meter is on, turn `Show attempts` off, because two counters saying the same thing is worse than either
alone.

This is the second time a proposal has been right about the idea and wrong about the layer — the first was the
hint navigation, where the platform turned out to agree with the stakeholders and not with me. Worth keeping
the two straight: *is this a better design* and *can this mode deliver it* are separate questions, and only
the second one is settled by the platform.

### 14.10 There is no retry control on a question — the Submit button is the retry *(Aug 6, 2026)*

Nelson: *"isn't `Retry incorrect (X)` missing? If we show `attempt N of N`, shouldn't we show the CTA too?"*
Right instinct, and the control is already there under a different name.

**On the question card, retry IS Submit.** The platform's way to spend a remaining attempt is to change the
answer and press Submit again — there is no separate retry affordance. That is why the card reads
`Submit · enabled` on Incorrect and `Submit · disabled` on Correct and Answer revealed. The attempts line and
the enabled Submit are a pair: one says an attempt remains, the other is how it is spent. **Adding a retry
CTA to a question would duplicate the button beside it.**

**`Retry incorrect (N)` exists only on `Results`**, on the Passed and Not passed variants. It is a
**quiz-level** CTA, and `Results` does not exist in mode A — so it is outside this handoff entirely.

**And it is not proven buildable**, which is the part worth carrying forward. A ⚠︎ now sits on the component:

- **Stacked model** — each question is an independent problem, so "retry the wrong ones" is not an edX
  action. The most it could mean is scrolling the learner to those questions: navigation wearing the costume
  of a retry.
- **Bucket model** — worse. `Reset` clears every question in the problem at once, so retrying only the
  incorrect ones is impossible by construction. This is why the bucket board says **Retake all ten**.

It remains one of the three open decisions in `07-results-decisions.md`, and should be settled before anyone
estimates the results screen. A CTA that names a count — *(3)* — reads as a promise that the system knows
which three and can act on just those. Today it knows, and cannot act.

### 14.11 `Reset` was missing entirely — and Submit is not disabled by submitting *(Aug 6, 2026)*

Nelson, on the Incorrect card: *"shouldn't Submit be disabled and say submitted, and shouldn't there be a
retry CTA?"* Half right, and the half that was right exposed a control we never had.

**Submit is not disabled by having submitted.** From `should_enable_submit_button()`:

```python
submitted_without_reset = self.is_submitted() and self.rerandomize == RANDOMIZATION.ALWAYS
if self.closed() or submitted_without_reset:
    return False
return True
```

`closed()` is *all attempts used* **or** *past due*. Our courses run `rerandomize: never`, so after a wrong
answer with an attempt left **Submit stays enabled** — the learner changes their answer and submits again.
That *is* the retry. This also corrects a card of mine: `Correct` had Submit disabled, which is only true once
attempts are spent. It is now enabled, because a correct answer does not close a problem that still has
attempts.

**But a retry control does exist, and we never drew it.** From `should_show_reset_button()`:

```python
if self.closed(): return False
if self.is_correct(): return False
return self.show_reset_button
```

`Reset` appears when the problem is **not closed**, **not correct**, and the problem's own
`show_reset_button` is on — which is per problem, not per course. We saw it appear on the QA course after a
submission even though the course-level setting reads false.

**Added `Show reset` (default off) on Incorrect, Last attempt, Partially correct and Saved — never on
Correct.** It is the platform's only dedicated retry affordance. There is no *Retry* and no *Try again*
anywhere in edX; the `Try again` label we had on the Incorrect card in §14.4 was invented, and this is what it
should have been all along.

**The pattern across §14.4, §14.10 and this one:** every time a control looked missing, the answer was either
*the platform uses a different control for that job* or *the platform genuinely lacks it*. Guessing which one
without reading the source produced a wrong label three times.

### 14.12 The button rules, written into all four places *(Aug 6, 2026)*

*"So the primary CTA changes labels and states?"* — **No. It never changes label.** It is always `Submit`;
only the `disabled` attribute toggles. That single sentence had been implied and never stated plainly, which
is how three invented labels survived in the component for weeks.

The three rules now live in every place someone might look:

| Where | What it carries |
|---|---|
| `09-handoff-map.md` §1a | the three rules with the source quoted, plus a state × Submit × Reset table |
| `09-handoff-map.md` §1 | `Show reset` and `Show attempt meter` added to the property table |
| Figma §04 · What controls what | the same two properties, plus a row for the primary button itself |
| Figma §05 · Behaviour you cannot see in a screen | rewritten to lead with the three button rules |
| `LMS / Quiz · Question Card` description | the rules, in the component a designer opens |

**The state table, which is the thing to remember:**

| State | Submit | Reset |
|---|---|---|
| Unanswered | disabled — nothing selected | no |
| Selected · Incorrect · Last attempt · Partially correct | **enabled** | **yes**, if the problem enables it (never on Correct) |
| Correct | **enabled** while attempts remain | never |
| Answer revealed · attempts spent · past due | **disabled** | no |

Writing it in four places is deliberate. The component description is what a designer reads, the Figma
sections are what a developer reads on the wall, and the map is what survives when the file is reorganised.
A behaviour recorded in only one of those is a behaviour that gets lost the next time something moves.

### 14.13 Where `Show reset` goes when it lands *(Aug 6, 2026)*

The property and its bound `Reset` button exist on the master; they have not reached the consuming file yet,
because accepting a library update only applies what has already been **published** — and these had not been.
Two different actions that are easy to confuse, and this is the third time the distinction has cost a round
trip: *publish* pushes from the design system, *accept* pulls into the file.

**The rule for where it goes**, from `should_show_reset_button()`:

| State | `Show reset` | Why |
|---|---|---|
| Incorrect | **on** | not closed, not correct — the recovery state Reset exists for |
| Last attempt | **on** | still spendable, still not correct |
| Partially correct | **on** | not correct, so it qualifies |
| Correct | **off** | `if self.is_correct(): return False` — never, at any attempt count |
| Unanswered · Selected | off | nothing to reset |
| Answer revealed · past due · attempts spent | off | `closed()` short-circuits first |
| Saved | off **by choice** | the platform would show it, since a saved answer is neither submitted nor correct. We leave it off because Reset beside Save on an unsubmitted draft reads as two ways to discard, and we have no evidence of the combination in a live course |

That last row is the only judgement call in the table, and it is marked as one rather than presented as
platform behaviour.

**Still conditional.** `show_reset_button` is read from the **problem**, not the course, so Reset is not
guaranteed on every quiz — a course whose advanced setting says `false` can still have problems that show it,
which is exactly what QA does. The screens show the enabled case; the property makes the other one one click
away.

### 14.14 The reason `Next question` kept coming back *(Aug 6, 2026)*

Nelson's screenshot of the properties panel settled something that seven separate fixes had not.

**`Show next action` had a default of `true`.** Every new instance, every clone, every reset produced a card
with *Next question* on. I had been correcting instances while the source kept manufacturing them — which is
why it returned after the boards, after the delivery screens, after the reset, and after each republish. The
default is now **false**, and that is the actual fix; the seven earlier ones were symptom management.

Worth generalising: **a value that comes back after being fixed is not a recurring mistake, it is a default.**
The question to ask on the second occurrence is not "who changed it" but "what produces it".

**`Show save` was also defaulting to `true`.** Save is a per-course setting — `force_save_button`, or
randomisation — and it is absent on Practice entirely. Defaulting it on meant every fresh card claimed a
control most quizzes do not have. Now **false**: off unless the course configures it.

**And the warning in the screenshot was real.** *"Not used within component"* on `Show attempt meter` meant
exactly what it said — the `Attempt meter` frame had been removed from `State=Last attempt`, leaving the
property with nothing to control. An orphaned property is worse than no property: it appears in the panel,
invites a designer to toggle it, and does nothing. **Deleted**, and every other boolean was checked the same
way — no other orphans.

**Component state:** 14 properties, all of them bound to something, `Show next action` and `Show save` now
defaulting off.

### 14.15 The two bugs were one bug *(Aug 6, 2026)*

A full-page audit against everything established so far turned up four violation classes — 25 cards with
`Next question` on, 20 with Submit hidden, 8 with Submit relabelled. Chasing them found that the first two
were **the same defect**, and it was structural.

**In `Correct`, `Partially correct`, `Answer revealed` and `Results withheld`, the primary button was bound to
`Show next action`.** A leftover from when those states used *Next question* as their main CTA. The
consequence:

- Setting `Show next action` to false **deleted the Submit button** from those four states.
- Setting it true brought Submit back — *and* was flagged by every audit as a mode-B leak.

So the two things I had been fixing in alternation were one binding pulling in both directions. Seven rounds
of "Next question is back" and six of "Submit is hidden" were the same line of the component, and no amount
of instance-level fixing could have resolved it: **turning one off turned the other on.**

**Fixed at the source.** The primary button is now unbound in all nine variants — its visibility belongs to
`Show submit` on the `Primary action` frame, which is what that property is for. `Show next action` now
governs only the secondary *Next question* button, which exists in `Incorrect` alone.

**And two labels still read "Submitted"** in the master — `Correct` and `Results withheld` — with eight more
across the page. Reset to `Submit`. edX never relabels this button (§14.4), and in mode A the markup is
inside the iframe, so it could not be relabelled even if we wanted it.

**The lesson, and it is the sharpest one in this document.** When two symptoms alternate — fix A and B
returns, fix B and A returns — they are not two problems. Stop fixing and go find the thing that couples
them. Thirteen rounds of instance-level correction were spent on a single wrong binding.

### 14.16 Clean — the whole page, against every rule *(Aug 6, 2026)*

First audit of this page to come back with nothing.

| Check | Result |
|---|---|
| Question cards | 65 |
| Broken instances · unexpected local components | 0 · 0 |
| Not in mode A preset | 0 |
| Stepper visible (mode B chrome) | 0 |
| `Next question` on | 0 |
| `Skip` on | 0 |
| `Reset` wrong for its state | 0 |
| Submit hidden, relabelled, or wrongly enabled/disabled | 0 |

States: Unanswered 14 · Incorrect 14 · Correct 12 · Selected 7 · Answer revealed 6 · Partially correct 5 ·
Last attempt 3 · Saved 2 · Results withheld 2. Controls: 184 radios, 23 checkboxes. Alert tones: all six in
use.

**The confirmation that mattered** came one step earlier: after unbinding the primary button, turning
`Show next action` off on 25 cards left **`submitStillNeededUnhiding: 0`**. Before the fix, that same
operation hid 25 Submit buttons. Same action, opposite outcome — which is the proof that the binding was the
cause and the thirteen previous rounds were treating a symptom.

**What this page now guarantees:** every card renders what the platform renders, every control that exists is
one edX actually has, and every control edX has that we can show is shown. Where a rule could not be
satisfied it is written down as an open question rather than drawn as if resolved.

### 14.17 All nine delivery screens, every state each type can reach *(Aug 6, 2026)*

66 question cards across three types × three devices, each type carrying only the states its settings make
reachable. Zero violations.

| | Practice · 6 states | Graded · 8 states | Final · 7 states |
|---|---|---|---|
| Attempts | **no line** — unlimited | `0–2 of 2` | `0–1 of 1` |
| Save | absent | **present** until submitted | absent |
| Unanswered · Selected | ✓ | ✓ | ✓ |
| Incorrect | ✓ ×2 — one with the hint open | ✓ | ✓ *(closed)* |
| Correct · Partially correct · Answer revealed | ✓ | ✓ | ✓ *(closed)* |
| **Saved** | — no Save, so unreachable | **✓** | — |
| **Last attempt** | — unlimited, never a last | **✓** | — one attempt is not a *last* warning |
| **Results withheld** | — correctness always shown | — | **✓** |

**The Final row exposed a rule I had applied wrongly.** With `max_attempts: 1`, a single submission closes the
problem — `closed()` is true — so **Submit is disabled and Reset disappears** on Correct, Incorrect *and*
Partially correct. I had drawn them enabled by copying the Graded pattern, where one attempt still remains.
The audit's own arithmetic caught it: attempts used ≥ max means closed, regardless of whether the answer was
right.

That is the difference between a rule written down and a rule enforced. §14.11 stated it correctly a few
hours ago and I still applied it wrong by hand — the check is what made it stick.

**Per-type state coverage is now deliberate rather than incidental.** Every absence in that table is a
platform constraint with a reason, not a screen we forgot to draw.

### 14.18 Submit is disabled on every screen that shows a result *(Aug 6, 2026)*

Nelson: *"an active Submit on a screen showing a result doesn't make sense — shouldn't it at least be
disabled?"* Right, and the reason is in the client, which is why reading only `capa_block.py` missed it.

`should_enable_submit_button()` on the server governs the **initial render**. What happens after a submission
is decided in `xmodule/js/src/capa/display.js`:

```javascript
enableSubmitButtonAfterResponse:
  this.has_response = true;
  if (!this.has_timed_out) { return this.enableSubmitButton(false); }
```

**The client disables Submit the moment the `problem_check` response arrives**, and re-enables it when the
learner changes their answer. So every state that shows a result is, by definition, a state where Submit is
disabled — regardless of how many attempts remain.

**Corrected rule, now in the component and applied to all 66 cards:**

| Submit | States |
|---|---|
| **Disabled** | Unanswered *(nothing chosen)* · Correct · Incorrect · Partially correct · Answer revealed · Results withheld — **every state showing a result** |
| **Enabled** | Selected · Saved · Last attempt — the three where an unsubmitted answer is on screen and the learner can still act |

`Last attempt` stays enabled because it is the warning shown **before** the final submission, not after it.

**Why this took two passes to get right.** §14.11 read the server method and concluded "submitting does not
disable Submit" — true of the server, and wrong about what a learner sees. The behaviour lives in two files,
and the one that governs the visible moment is the one we had not read. **A rule derived from one layer of a
two-layer system is a half rule**, and it looked complete enough to write down twice.

### 14.19 `Reset` keeps its name — it is not a retry *(Aug 6, 2026)*

Nelson asked whether the `Reset` CTA could take a clearer label, *"Retry again"*. Two reasons it stays
`Reset`, and the second is the one that matters.

**We cannot.** Like Submit, this button is rendered by the platform inside the iframe in mode A. Relabelling
it is a fork, not a copy change. The codebase uses `Reset` throughout with no variants.

**We should not.** `reset_problem()` is not another go at the same question:

```python
def reset_problem(self, _data):
    """Changes problem state to unfinished -- removes student answers,
    Causes problem to rerender itself if randomization is enabled."""
```

It calls `new_lcp(None)` — **the learner's answers are removed** and the problem returns to unfinished. With
`rerandomize` on `ALWAYS` or `ONRESET` it also calls `choose_new_seed()`, so the learner gets **a different
version of the question**. It does not spend an attempt. And in the bucket model it clears **all ten
questions at once**.

So Reset is a *destructive clear*, not a second try. **`Retry` would describe the intent and hide the cost** —
a learner who reads "Retry" expects their selection to still be there, and it will not be. The word `Reset`
is doing real work.

**The genuine retry has no button**: change your answer and press Submit again. That is why §14.10 concluded
nothing was missing from the card, and why the two controls should never be conflated in copy.

*(For mode B, where the shell is ours, the same semantic problem applies. If that button is ever relabelled it
should say what it does — something in the family of "Clear answer" — not what the learner wishes it did.)*

### 14.20 What Reset actually does — three questions, and one nobody had asked *(Aug 6, 2026)*

**1 · Does Reset swap the question for a different one?** Only for problems that generate values in a
`<script>`. `choose_new_seed()` changes the seed, and the seed only feeds programmatic generation — for an
ordinary `multiplechoiceresponse` the question text and the choices are identical across every seed. **Every
question in every course we have read is plain multiple choice**, so here Reset clears the answer and nothing
else. The behaviour exists; it does not currently reach anyone.

**2 · Is it optional in Studio?** Yes. `show_reset_button` is a per-problem setting with a course-level
default, which is why QA shows Reset on problems while its course setting reads `false`.

**3 · Is it a hack — reset forever until you guess right?** **No**, and the reason is worth stating precisely
because the intuition is reasonable. Reset does not spend an attempt, but **Submit does** — and
`reset_problem()` leaves `self.attempts` untouched:

```python
self.lcp = self.new_lcp(None)
self.set_state_from_lcp()
self.set_score(self.score_from_lcp(self.lcp))
self.publish_grade()
```

The counter only ever goes up, and `should_show_reset_button()` returns `False` once `closed()` — attempts
exhausted — so at the ceiling **both Reset and Submit disappear together**. On a two-attempt question you get
two submissions whatever you do in between. On an unlimited-attempt practice question you could already
resubmit forever; Reset adds nothing.

**4 · The one nobody asked, and it is the real finding.** Look at the last two lines above: Reset calls
`set_score()` on a fresh, empty problem and then `publish_grade()`. **Resetting publishes a zero immediately.**

Reset never appears on a correct answer, so a right answer cannot be thrown away. But it *does* appear on
**Partially correct** — so a learner sitting on 1 of 2 marks who presses Reset and then walks away has
**given up the marks and kept the spent attempt**. Nothing warns them, and Reset is one click with no
confirmation.

That belongs with the Save trap as a platform-level usability hazard: both are cases where an action that
looks like housekeeping silently costs a grade. In mode B this is an argument for a confirmation on Reset
when a non-zero score is on the line — and it is the second finding this week that came from asking what a
control does rather than what it is called.

### 14.21 The Reset finding, written down and enforced *(Aug 6, 2026)*

Documented in the handoff map (§1b, plus two new rows in the open questions) and on the wall (section 07),
then enforced on the components rather than left as prose.

**The rule the components now encode**, with `closed` computed from the attempts line rather than assumed:

| | Submit | Reset |
|---|---|---|
| Unanswered | disabled | no |
| Selected | enabled | no |
| Saved · Last attempt | enabled | **yes**, while attempts remain |
| Incorrect · Partially correct | **disabled** — a result is showing | **yes**, while attempts remain |
| Correct | disabled | **never** |
| Answer revealed · Results withheld · closed | disabled | no |

Seven cards had Reset wrong — all of them Final-exam cards where a single submission closes the problem, so
Reset must disappear even on Incorrect. The audit derived `closed` from each card's own attempts text
(`used N of M`) instead of trusting the state name, which is what caught them.

**108 cards across the page, zero violations.**

**Two decisions now sit in the open questions**, and both are cheap:

1. **Turn `show_reset_button` off on partial-credit questions.** It is a per-problem setting — the content
   team can do it today, no build. It removes the only route by which a learner can silently discard marks.
2. **Confirm Reset in mode B** where a non-zero score would be lost. Mode A cannot; the button is inside the
   iframe.

The first one is worth pressing. Everything else in this document describes what the platform does; this is
the one place where what it does can quietly cost somebody a grade, and where the fix needs no engineering at
all.

### 14.22 One CTA matrix, in both places *(Aug 6, 2026)*

The primary and secondary controls were being described in two separate tables, which meant nobody could
answer "what does the learner see in state X" without cross-referencing. They are now one matrix — nine
states × seven controls — living in two places:

- **`09-handoff-map.md`**, for future reference and for whoever opens the repo rather than the file
- **Figma section 04 · What controls what**, as a `CTA MATRIX` block beside the property tables

Both were generated by reading the component, not from memory — which is how the last two defects were
caught: a `"Draft Saved"` in `Saved` against `"Draft saved"` in `Last attempt`, two spellings of one label,
and the fact that `Correct` still offers `Show answer` while offering no Reset at all.

**The one flag left open on it:** `Show progress` still defaults to **true**, and it is the stepper — mode B
chrome. It is the same shape as the `Show next action` default that produced seven rounds of the same bug
(§14.14). It has not been flipped because it is a live default on a published component and the change should
be deliberate, but it is the last known default pointing at the wrong mode.

### 14.23 Double-checking the matrix against the platform — three gaps *(Aug 6, 2026)*

Crossed our seven controls against `xmodule/js/src/capa/display.js`, which is where every learner-facing
control on a problem is bound. Six of ours match. **Three things exist that we had not modelled.**

**1 · The `Review` button — a seventh control we never drew.**

```javascript
this.reviewButton = this.$(".notification-btn.review-btn")
this.reviewButton.click(this.scroll_to_problem_meta)
```

It sits **inside every notification block** and, on click, scrolls to the problem header and focuses it. It
is an **accessibility affordance** — it returns a screen-reader or keyboard user to the question after a
result appears somewhere below it. It appeared in every DOM capture we took and we read past it three times
because it is visually hidden until focused.

**Consequence:** our feedback and hint alerts are missing a control that is always there in the markup. On a
keyboard-only pass, our screens would be missing the way back to the question.

**2 · `.notification-save` — a save confirmation we do not have.**

Shown after a successful save, carrying `response.msg` from the server, and — this is the part that matters —
**hidden again the moment the learner changes any input**. We modelled `Saved` as a card *state* with a
"Draft saved" button label. The platform models it as a transient notification that disappears on the next
keystroke. Those are different things, and ours implies more permanence than the platform offers.

**3 · `.notification-gentle-alert` — an error channel we have no component for.**

Triggered by save failures, hint failures, AJAX errors, grading-poll timeouts, and every file-upload
validation message: *"You did not select any files to submit"*, *"The grading process is still running.
Refresh the page to see updates."* We have no state for a problem whose **request failed** — only for
problems that answered correctly or incorrectly.

**What was verified as correct:** Submit, Save, Show Answer, Reset, Hint and Next Hint are all bound exactly
as we have them, and there is no seventh *action* — `Review` is navigation, not an action on the problem.

**Also flipped:** `Show progress` default is now **false**. It was the last default pointing at mode B chrome.

These three are additions to the open questions rather than corrections to the matrix: the matrix is right
about what it covers, and incomplete in a way that only shows up on a keyboard or a bad network.

### 14.24 The matrix gains a `Review` column and a button-spec block *(Aug 6, 2026)*

The three gaps are now in the open questions — both in `09-handoff-map.md` §8 (rows 7–9) and in section 07 on
the wall — and the matrix itself has been rebuilt with what was missing.

**`Review` is now a column**, marked ⚑ *exists on the platform, not yet in our components*. It appears
wherever a notification does: every result state, plus `Saved`, where the save confirmation carries it. It is
absent from `Unanswered`, `Selected` and `Last attempt`, because no notification is on screen yet.

**And the Figma table gained a `BUTTON SPECS` block** — each CTA beside a live instance of the button it
actually uses, so a developer reads the spec and sees the thing at the same time:

| CTA | Hierarchy · Size · State |
|---|---|
| Submit | Primary · md · Default / Disabled |
| Save draft | Secondary · md · Default |
| *Draft saved* | Secondary · md · **Disabled** — a confirmation, not an action |
| Hint · Show answer · Reset | Link color · md · Default |
| Next question ▣ · Skip ▣ | Link color · Secondary · md · Default |
| **Review ⚑** | **— TO BUILD —** · Link color suggested |

The previews are cloned from the published component rather than redrawn, so they cannot drift from it —
if the button changes, the spec block changes with it.

**One thing the specs exposed:** *Draft saved* is a `Secondary · Disabled` button, which is right — it is a
confirmation and should not invite a click. Nothing else in the kit uses a disabled button as a status
message, and it is the closest thing we have to the platform's `.notification-save`. Worth remembering when
open question 8 gets decided.

### 14.25 Mode A-2 drawn — the bucket, as a delivery frame *(Aug 7, 2026)*

`ICP Phase 1 - Quiz (A-2) - One Submit - Light - Draft 🟠` clones the Mode A delivery frame and rebuilds it
as the **bucket authoring model** — the one §11 of the spec measured and never drew. Same format as A: three
quiz types × three devices, now **two screens each** (before the single Submit, and after it) = 18 screens.

**What the screens say.** Five questions render in series with no action of their own — no Submit, no Hint,
no Save, no attempt counter, no stepper. All of that moved to a single footer under the last question:
`Hint · Save draft` and one `Submit` before, `Reset` and a spent attempt after. The points line at the top
of the problem carries the score: `5 points possible (graded)` becomes `3/5 points (graded)`.

| | Practice | Graded | Final exam |
|---|---|---|---|
| Attempts (pooled) | 0 of 3 | 0 of 2 | 0 of 1 |
| After submit | Hint · Reset | Hint · Reset | **Show answer** only |
| Submit after submit | Disabled | Disabled | Disabled |

The final exam is the interesting one. One pooled attempt means a single Submit **closes all five questions
at once** — `should_show_reset_button` returns False when closed, so Reset disappears, and `showanswer:
finished` is satisfied by the spent attempt, so Show answer appears. That is the only one of the three where
Show answer is reachable on the second screen; practice and graded still have attempts left, so `finished`
is not met and the control stays hidden.

**Three gaps this exposed, written onto the frame itself:**

1. **There is no quiz-level action bar in the kit.** Submit, Save draft, the attempt counter and Reset all
   live *inside* the Question Card, because in Mode A they belong to a question. In A-2 they belong to the
   problem. The footer on these screens is cloned from the card's own footer so the styling is right, but it
   is not a component — and it would have to be one before anyone builds this.
2. **The platform does not number questions inside a bucket.** It renders the stems in order and nothing
   else. "Question 3 of 5" becomes something an author types into the stem, or it does not exist. Mode A got
   numbering free from the stepper; A-2 does not.
3. **A per-question results breakdown is off the table** — already recorded in §11.4, now visible: with one
   `problem_scores` entry for the set, a results screen can say 3 out of 5 and nothing more.

**What it is not.** Not a build target, and the cards say so — the green *Ready for DEV* chips are hidden on
all nine and the frame is marked Draft. It is an authoring option placed beside Mode A so the trade can be
seen rather than argued: one Submit costs per-question feedback, per-question attempts and per-question
Reset, and buys nothing that needs code.

**One thing I could not verify.** Figma screenshots were unavailable this session — the REST token has
expired and the desktop bridge's image channel did not answer — so the frame was validated structurally
(18 screens, 0 broken instances, 0 local components, footer/attempt/state values read back per screen) but
not looked at. Worth a human glance before it goes in front of anyone.

**And one thing worth knowing about the delivery frames generally.** Auditing A-2 against the token rules
made me audit Mode A the same way: the *annotation layer* of these frames — the card headers, the eyebrow,
the meta strip — was never token-bound. Mode A carries 47 raw fills and 12 unstyled text nodes outside
instances; A-2 inherits those and adds ~35 more of the same kind in its new comparison panel. The
zero-violation result recorded in §14.x was about the wall sections and the DS components, not these frames.
Binding them is a separate job and it applies to both.

### 14.26 The comparison table, rebuilt to Nelson's row pattern *(Aug 7, 2026)*

The A-2 comparison came out of the delivery frame and became its own frame,
`▸ What A-2 changes, and what it costs - Table`, sitting between the wall and the two quiz frames. The row
structure was redesigned on the header row and the `Submit` row: each cell is a `Frame 1` wrapper —
horizontal, gap 10, **fill width, hug height, centred** — with the text inside. That was applied to the
remaining eight rows, so all ten now share one rule and the columns line up at 274px.

**One consequence worth naming.** Wrapping the cells means long copy now *wraps inside its column* instead
of running past it. Three rows gained a second line and one gained a third — `not possible — the API knows
the total and nothing else` is the widest. Left as-is, that also made the table hug down to 739px, narrower
than the blocks above and below it, so `comparison` is now fixed at 853px to match its siblings. The table
reads at 901 × 1154.

### 14.27 Full-page validation *(Aug 7, 2026)*

| Check | Result |
|---|---|
| Component instances on the page | 10,404 |
| Broken instances | **0** |
| Unexpected local components | **0** |
| Overlapping top-level nodes | **0** |
| A-2 screens | 18 — all 5 questions, 0 stray per-question Submits |
| Attempt counters / Submit states / score lines | correct on all 18 |
| CTA matrix | 9 state rows + BUTTON SPECS with 9 CTA rows, intact |
| Cell text overflowing its column | **0** |

Trailing whitespace at the foot of the A-2 frame — left over from lifting the panel out — was trimmed:
20,816px → 20,339px.

**The one thing that is not clean, and it is not new.** The *annotation layer* of this page has never used
shared text styles. Across the nine sections: **518 text nodes with no text style, 0 with one**, plus 132
raw fills. The new table adds 34 of each, all its own copy. Component fills are bound — 476 bound fills and
81 bound strokes in the sections — so this is specifically the writing on the wall, not the kit.

That means the zero-violation result recorded earlier was about the components and the cards, and I should
have said so more precisely at the time. Binding the annotation layer is a real, bounded job — pick DS text
styles for eyebrow / heading / body / caption and a bound colour, then apply to ~550 nodes — but it is a
design decision first, and it applies to the sections, both delivery frames and this table alike.

### 14.28 The annotation layer bound to DS text styles *(Aug 7, 2026)*

**578 text nodes bound, 0 left unstyled.** Every piece of writing on the page — the nine sections, the
comparison table, both delivery frames — now carries a DS text style instead of loose formatting. The 15
styles used were imported from the DS by key, so they update when the DS does.

The local styles already in the file were no help: all 15 are named `V7-Experiments(Remove)/…` and several
are Outfit or Playfair, neither of which appears anywhere on the page. Everything on the wall was already
Montserrat, which is what the DS ladder uses, so the binding was a size-and-weight question only.

**Where it landed:**

| Style | Nodes |
|---|---|
| Body/Small/Regular | 204 |
| Body/Small/Semibold | 136 |
| Caption/Semibold | 113 |
| Caption/Medium | 71 |
| Body/Lead/Regular | 32 |
| Body/Default/Semibold | 20 |
| Overline/Semibold | 16 |
| the other eight | 46 |

**The one judgment call, and it is reversible.** The page's most common size was **13px — 263 nodes, 45% of
all the text — and 13 is not on the DS ladder at all.** It sits exactly between Caption (12) and Body/Small
(14). I sent it **up to Body/Small**, because that copy is running body text and Caption is meant for
captions; sending it down would have been a semantic demotion to save one pixel. Same reasoning collapsed
11px and 12px labels into Caption, and 9px into Overline. If you want 13 → Caption instead, it is one pass.

**What moved as a result.** Nothing overflowed and nothing collided, but text got very slightly taller, so
the sections were re-flowed: section 02 grew 12,443 → 12,674px, 04 grew 1,787 → 1,859px, 00 grew 858 → 888px,
and the rest shifted down accordingly. Frame A settled at 16,308px.

**One duplicate found and removed.** A loose text node was sitting on the canvas at page level, holding a
byte-for-byte copy of the *Read me first* paragraph and overlapping section 00. It had been overlapping by
5px all along; growing the type made it a 57px collision, which is how it surfaced. Compared in full before
deleting — identical, 420 characters.

**Still not bound: text colour.** 179 of the 638 text nodes carry a raw fill rather than a colour variable
(459 are bound). Text styles in Figma do not carry colour, so this is a separate binding and a separate
decision — which semantic token the annotation layer should use for primary, secondary and muted copy. Say
the word and it is the same kind of pass.

### 14.29 Text colour bound — and two things it exposed *(Aug 7, 2026)*

**159 of the 179 raw text fills are now bound to variables — 618 of 638 text nodes in total.** The mapping
follows the convention the page already used, `LMS/Text/*`:

| Was | Now | Nodes |
|---|---|---|
| `#101828` · `#111111` | `LMS/Text/text-primary` | 74 |
| `#333333` | `LMS/Text/text-secondary` | 30 |
| `#737d8f` | `LMS/Text/text-tertiary` | 25 |
| `#9ea8b8` | `Colors/Text/text-quaternary (500)` | 16 |
| `#b54708` | `LMS/Text/text-warning-primary` | 10 |
| `#ffffff` | `LMS/Text/text-primary_on-brand` | 4 |

**It fixed a legibility problem we did not know we had.** Two of the hand-picked greys were failing WCAG AA
on the page background (`#f9fafc`), and binding them to the skin corrected both:

| Token | Before | After |
|---|---|---|
| text-tertiary | 3.97:1 ❌ | **6.63:1 ✅** |
| text-quaternary | 2.30:1 ❌ | **4.37:1** ⚠︎ |
| text-warning-primary | 5.20:1 | 5.91:1 ✅ |

`#9ea8b8` at **2.30:1** was well under the 4.5:1 floor — it is used for the muted markers on the journey
diagram (`NO ENTRY SCREEN`, `NOTHING APPEARS HERE`). The bound token is much better but lands at **4.37:1,
which still misses AA for normal text.** Moving those 16 nodes to `text-tertiary` would clear it at 6.63:1
at the cost of some of the muting they were given deliberately. That is a design call, so it is left as-is
and flagged here rather than changed quietly.

**And it exposed a real gap in the skin.** The remaining **20 raw fills are all in the two delivery-frame
headers**, the dark `#13282f` band — a four-tone hierarchy in pale blue (`#f2f7fc`, `#d9ebfa`, `#b5d9ed`,
`#8cb8d1`). There is nothing correct to bind them to:

- **The LMS skin ships exactly one on-brand text token** — `LMS/Text/text-primary_on-brand`, which resolves
  to `#ffffff`. The four white nodes were bound to it; the other four tones have no equivalent.
- **The generic `Colors/Text/*_on-brand` family is not skinned for us.** It resolves to Untitled UI cyan —
  `#b9e6fe` and `#7cd4fd` — which is the wrong brand. Binding to it would have turned the header cyan.
- **The band itself is unbound too**: `#13282f` background and the `#26708f` badge are both raw. The whole
  dark header is a hand-picked palette that was never derived from a token pairing.

So the honest state is: **the LMS skin has no secondary / tertiary / quaternary on-brand text tokens.**
Either three get added to the skin and these 20 nodes bind cleanly, or the dark header is rebuilt from
tokens that do exist. Forcing the cyan family would have made the page bind-clean and visually wrong.
