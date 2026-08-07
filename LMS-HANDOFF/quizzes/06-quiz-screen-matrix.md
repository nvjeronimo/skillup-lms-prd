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
