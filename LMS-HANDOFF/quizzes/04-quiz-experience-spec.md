# Quiz Experience — Component & Screen Spec (FRD-style draft)

*Immersive Course Player (ICP) · Maps to PRD 5.7 (Quizzes) · Draft v0.1 · 17-Jul-2026*
*Prepared by: Design/Discovery (Nelson Jeronimo + Claude). Input for the official FRD_ICP_5.7 and for dev implementation.*

Companion docs: [01-edx-quiz-capabilities.md](01-edx-quiz-capabilities.md) (what the platform allows) · [02-coursera-quiz-benchmark.md](02-coursera-quiz-benchmark.md) (UX inspiration) · [03-current-lms-quiz-audit.md](03-current-lms-quiz-audit.md) (what exists today).

---

## 1. Introduction

### 1.1 Purpose
Defines every component, screen, state and platform contract needed to build the quiz/assessment experience of the ICP on top of the existing Open edX backend (SkillUp Online). It is written so a dev team can implement without needing to re-research the platform.

### 1.2 Scope
**In scope:** practice quizzes, graded quizzes, final exams (non-timed and timed shell), question components for the 5 core CAPA types, feedback/attempts/save/show-answer/hints/reset behaviours, quiz entry & results screens, in-course progress & grades surfaces, ORA (peer review) shell, SCORM activity embed, error/edge states.
**Out of scope:** proctored exams (no current business need — revisit if certification requires), content authoring (Studio), AI assistant integration (PRD 5.9), discussion (5.6).

### 1.3 Definitions
| Term | Definition |
|---|---|
| CAPA | Open edX's built-in problem engine (multiple choice, checkboxes, dropdown, numerical, text). |
| Problem | One question = one CAPA block with its own submit/state lifecycle. |
| Subsection (sequential) | The "quiz" container; carries graded/practice status, assignment type, due date, attempts defaults. |
| ORA | Open Response Assessment (essay/file upload + peer/self/staff steps). |
| `render_xblock` | LMS endpoint that renders a unit chromeless inside an iframe (current architecture). |
| Assignment type | Grading bucket (e.g. "Graded Quiz" 60%, "Final Exam" 40%) defined in grading policy. |

### 1.4 Platform facts that constrain design (verified)
0. **Practice / Graded / Final Exam is NOT a component type** *(added Jul 20, 2026)*. It is **subsection-level metadata**: grading policy + assignment type name, optionally + timed/proctored config. The `problem` blocks inside all three are identical. Consequence: **one set of question renderers (F-QZ-002…006) serves all three quiz types** — only the shell (entry header, attempts chrome, timer) differs. The player must read *subsection* metadata, not block type, to pick the shell. See [edx-component-types-reference.md](../edx-component-types-reference.md) section 8.
0b. **A "topic" is a unit, and a unit stacks MULTIPLE components** *(added Jul 20, 2026)*. Open edX docs: *"A unit can contain one or more components."* The renderer must also recurse through transparent containers (`split_test`, `library_content`, `conditional`).
0c. **Stepper vs. one scroll is an AUTHORING choice, not a platform limit** *(corrected Jul 29, 2026 — supersedes an earlier claim in this file that stacking was forced and a stepper impossible; that claim also contradicted the definition of Subsection in §1.3)*. The **subsection is the quiz-level container**: the grading container (*"when you set the assignment type for a subsection, all problems in the subsection are graded and weighted as a single type"*), the timed/proctored-exam container, and the navigation container. The platform ships `SequenceNavigation` — one tab per unit plus Previous/Next — and its own `{current} of {total}` counter over units. The Open edX glossary defines the control outright: *"unit navigation bar — the horizontal control that appears at the top of the Course page… contains an icon for each unit in the selected subsection."* See [ADR 0002 · courseware page decisions](https://github.com/openedx/frontend-app-learning/blob/master/docs/decisions/0002-courseware-page-decisions.md): *"Course navigation in a hierarchical course happens primarily via the 'sequence navigation'… navigate to the next and previous unit… and also select specific units within the sequence directly."* Therefore:
    - **one `problem` per unit ⇒ a question-by-question stepper, natively, zero custom code**;
    - **N `problem`s in one unit ⇒ a single scrolling page** (how SKOAIH01 is authored today — see [03-current-lms-quiz-audit.md](03-current-lms-quiz-audit.md) §4).
    *Version caveat:* the horizontal unit tab bar was rendered by default through Teak; in Ulmo/Verawood it moved to a plugin slot, replaced by the Course Outline sidebar + Previous/Next. Restoring it is an `env.config.jsx` entry — configuration, not a fork.
0d. **What Open edX genuinely lacks** *(verified Jul 29, 2026)* — the real gap, and where our shell adds value: **(i)** no per-question counter ("Question 3 of 10" — the native one counts *units*), **(ii)** no quiz-level submit-all, **(iii)** no end-of-quiz review/summary screen. The timed-exam submit dialog is explicit that it ends the *attempt*, not the answers: *"Make sure that you have selected 'Submit' for each problem before you submit your exam."* **Verified in source Aug 4, 2026** — `submitExam()` calls `submitAttempt(attemptId)` only, and `edx_proctoring` contains no reference to `problem_check` or `capa` at all. A timed exam is a timer and a lockout, not an aggregate submit. **(iii) is buildable as a frontend plugin — see §10.4**, which supersedes the assumption that it needs backend work.
1. **Per-question lifecycle.** *Submission* has no quiz-level container — each problem submits/scores independently (grading *does* roll up at subsection level; see 0c). A "one Submit for the whole quiz" UX would require orchestrating N problem submissions client-side (possible, but each question still grades independently — no cross-question validation).
2. **Current production config** (SKOAIH01): single-select MCQ only; practice = unlimited attempts; graded = 2 attempts/question; answer-choice shuffling ON; per-choice feedback authored; immediate results; no hints, no partial credit, no due dates; pass mark 70%; Graded Quiz 60% + Final Exam 40%.
3. **Rendering contract options** (decision needed — see section 6): (A) theme the existing iframe, (B) native re-implementation of the 5 CAPA types against XBlock handlers, (C) hybrid (native CAPA + iframe for SCORM/ORA/everything else). Recommendation: **C**.

---

## 2. Feature List

| ID | Feature | Priority | Notes |
|---|---|---|---|
| F-QZ-001 | Quiz Entry Header (pre-start context) | Must | New vs current LMS — Coursera-inspired |
| F-QZ-002 | Question Card — Single Select | Must | Core, exists today |
| F-QZ-003 | Question Card — Multi Select (checkboxes) | Must | Platform-ready, not yet authored |
| F-QZ-004 | Question Card — Dropdown | Should | Platform-ready |
| F-QZ-005 | Question Card — Text Input | Should | Platform-ready |
| F-QZ-006 | Question Card — Numerical Input | Should | Platform-ready |
| F-QZ-007 | Submit & Feedback cycle (per question) | Must | Correct/incorrect/partial + per-choice feedback |
| F-QZ-008 | Attempts counter & Save draft | Must | "N of M attempts", Save link (graded) |
| F-QZ-009 | Show Answer & Explanation | Must | 12-value policy enum must be respected |
| F-QZ-010 | Hints (demand hints) | Should | "Hint 1 of N" sequence |
| F-QZ-011 | Reset | Could | Only when enabled per problem |
| F-QZ-012 | Quiz Progress Rail (in-quiz) | Must | New — answered/unanswered map, jump-to |
| F-QZ-013 | Quiz Results Summary (post-completion) | Must | New — aggregate score + retry/review CTAs |
| F-QZ-014 | Practice vs Graded framing | Must | Badging, tone, grade impact copy |
| F-QZ-015 | Timed Exam shell | Could | Timer banner, entry/expired/submitted screens (only if timed exams get enabled) |
| F-QZ-016 | ORA (Peer Review) shell | Must | Steps: Response → Assess Peers → Grade |
| F-QZ-017 | SCORM Activity embed | Must | Fullscreen-friendly container + error fallback |
| F-QZ-018 | Grades & Progress surfaces | Must | Progress ring, grade summary, detailed grades |
| F-QZ-019 | Locked/closed/past-due states | Must | Gating, hidden results, archived course |

---

## 3. Functional Requirements

### F-QZ-001 Quiz Entry Header
Before the first question, show a context block: quiz title; badge `Practice` / `Graded` / `Final Exam`; question count; attempts policy — quiz-level, e.g. "2 attempts" meaning two runs through the whole quiz (§9.3); weight ("Counts 20% of your final grade" — computed from grading policy) or "Doesn't affect your grade"; pass threshold when graded; estimated time (authored or count×1.5 min); primary CTA **Start quiz** opens step 1 (or **Resume** at the furthest answered question). *(Updated Jul 29, 2026: the quiz is a stepper — one question per step — so the entry header is the first screen rather than a block above a scroll. See §1.4-0c.)*
**BR-1:** data sourced from Course Home/sequence metadata APIs + grading policy; never hard-coded.
**BR-2:** "Submit is final per question" warning shown for graded quizzes (matches current platform truth).
**AC:** given a graded quiz of 7 questions with 2 attempts, header shows all five facts; resume state appears when ≥1 question submitted.

### F-QZ-002–006 Question Cards
One card per CAPA problem. Shared anatomy: index ("Question 3 of 7"), points ("1 point"), prompt (rich text + MathJax), response area (variant-specific), action row (Submit, Save when graded, Hint if authored, Show Answer per policy, Reset if enabled), feedback area, status strip.
Variants: radio list (002), checkbox list + "Select all that apply" helper (003), select dropdown (004), text field with char guidance (005), numeric field with unit/tolerance hint (006).
**States (all variants):** `unanswered` · `selected/dirty` · `saved-draft` · `submitting` (spinner ≤300 ms) · `correct` · `incorrect` · `partially-correct` · `attempts-exhausted` (inputs disabled) · `closed/past-due` · `results-hidden` (submitted, correctness masked — subsection visibility setting) · `error` (submit failed — retry CTA, answer preserved).
**BR-1:** choice order must respect platform-provided order (shuffle happens server-side).
**BR-2:** Submit disabled until input non-empty; double-submit guarded.
**AC:** each state visually distinct and screen-reader announced (aria-live on status strip); keyboard: arrows within radio group, space toggles checkbox, Enter submits when focused on Submit only.

**BR-3 (marker control — DS binding).** The answer marker is the DS Checkbox component with its `Type` property exposed on `LMS / Quiz · Option Row`. The control follows the answer cardinality: **single-select → `Type=Radio`** (circle), **multi-select → `Type=Checkbox`** (square). Matches CAPA (`multiplechoiceresponse` → radio, `choiceresponse` → checkbox). The nested instance is already exposed, so the author flips it per option row — no separate component.

**BR-4 (option enumeration prefix — OPEN).** Each option may carry an optional **A / B / C…** or **1 / 2 / 3…** prefix before its text. Two possible sources, still undecided:
- **(a) Manual** — the author types the letter/number into the option text.
- **(b) Automatic** — the player generates the prefix from option order (survives answer-shuffle only if generated *after* the server order is applied — see BR-1).

The Option Row exposes an **optional prefix slot** so both are representable in the design; picking (a) vs (b) is an open decision (§7 Q9). Accessibility: if automatic, the prefix must be presentational (`aria-hidden`) so screen readers don't read "A, A" — the option label already carries the text.

### F-QZ-007 Submit & Feedback cycle
On submit: status strip shows `✔ Correct (1/1 point)` / `✖ Incorrect (0/1 point)` / `◐ Partially correct (x/y points)`; per-choice feedback rendered under the chosen option(s); correct answer marked green when revealed per policy. Incorrect + attempts remaining → encouraging retry copy + **Review lesson** link when a related unit is mapped (Coursera lesson-link gap — our improvement).
**BR:** feedback text comes from the problem definition (answer-specific feedback); never invent client-side.
**AC:** feedback appears without page reload <1 s after response; retry preserves previous selection visible-but-editable.

### F-QZ-008 Attempts & Save
Graded: "You have used N of M attempts" adjacent to Submit; Save stores draft without grading, shows "Draft saved ✓ — not submitted yet" (loud, to fix Coursera's known draft-confusion failure). Unlimited: no counter.
**AC:** counter increments only on submit; draft state survives reload; last attempt shows "Last attempt" warning before submit (confirmation on final attempt of graded questions).

### F-QZ-009 Show Answer & Explanation
Render the platform's `showanswer` policy faithfully (12-value enum — see 01 doc section 2). When triggered: correct option(s) highlighted + "Explanation" panel (`<solution>` content).
**AC:** button only visible when policy allows in the current state; hidden for `never`.

### F-QZ-010 Hints
"Hint" ghost button when authored → sequential hint chips "Hint 1 of N" + Next hint.
**AC:** hints don't cost attempts; order preserved.

### F-QZ-012 Quiz Progress Rail
The **unit navigator**: one dot per question — `unanswered` / `answered-correct` / `answered-incorrect` / `draft` / `flagged`. Click = navigate to that question. Local-only **Flag for review** toggle per question (no backend — session/localStorage). *(Updated Jul 29, 2026: with the stepper the rail navigates rather than scrolls; it is the shell's equivalent of the platform's per-unit tabs, and carries the per-question counter the platform doesn't provide — see §1.4-0c/0d.)*
**AC:** rail reflects state changes in real time; position reads "Question 3 of 7"; outstanding count visible while any question is unanswered.
**BR:** backtracking is allowed, so the navigator stays visible. If free navigation is ever disabled, remove the navigator entirely rather than rendering it disabled (Canvas New Quizzes' rule — don't show a mini-map you can't use).

### F-QZ-013 Quiz Results Summary
When all questions in the subsection have a submitted state, show summary card at quiz end (and on re-entry): aggregate "You scored 6/7 (86%)", pass/fail vs threshold for graded, per-question list with jump links, CTAs: **Review answers**, **Retry incorrect** (only where attempts remain), **Continue to next lesson**, **Back to Module**.
**BR:** aggregate computed client-side from per-problem scores (platform has no quiz-level score API below subsection); must match Progress-page subsection score.
**AC:** summary matches sum of question scores; retry CTA absent when attempts exhausted.

### F-QZ-014 Practice vs Graded framing
Practice: `Practice` badge, "Doesn't count toward your grade", relaxed palette, unlimited-retry copy. Graded: `Graded` badge + weight, attempts counter, final-attempt confirmations, "Submit is final" notice.
**AC:** framing driven by subsection `graded` flag + assignment type label (`format` param already exposed today).

### F-QZ-015 Timed Exam shell (conditional feature)
If a subsection is a timed exam: entry interstitial (time allotted, rules, **I am ready to start** CTA); persistent countdown banner (visual escalation at 80%/95% elapsed, hide-timer toggle); End My Exam + confirm; auto-submit + "Time's up" screen on expiry; submitted confirmation. Driven by edx-exams/special-exams APIs — lives in the shell, not the iframe.
**AC:** timer state survives reload; expiry locks all question inputs.

### F-QZ-016 ORA shell
Stepper: **Your response** (rich prompt, autosave indicator, required file-upload list with allowed types/size, "cannot edit after submitting" warning, submit+confirm) → **Assess peers** ("Review 1 of N", rubric per criterion, comments) → **Your grade** (total + per-criterion breakdown). States: `not started` / `in progress` / `submitted—waiting for peers` / `peer reviews pending (you owe N)` / `grade ready` / `cancelled by staff`. Due dates per step.
**BR:** ORA remains iframe/ORA-MFE territory in phase 1; ICP wraps it with the stepper header derived from ORA status APIs.
**AC:** current step obvious at all times; the waiting state explains what unlocks next.

### F-QZ-017 SCORM Activity embed
Container with activity title, `Activity` badge (ungraded), fullscreen toggle, loading skeleton, and an error fallback ("This activity couldn't load — Try again / Report") — the current 500-with-no-message must be impossible.
**AC:** SCORM iframe resizes to content; completion event (if emitted) marks the row complete in the outline.

### F-QZ-018 Grades & Progress surfaces
Progress page parity+: completion ring, current-grade bar vs pass marker, grade summary table (type/weight/grade/weighted), detailed per-module grades (graded only), certificate status. In-outline: score chips on quiz rows after completion ("6/7").
**AC:** numbers identical to platform Progress API; practice results shown only as completion, never as grades.

### F-QZ-019 Locked / closed / edge states
Prerequisite-locked subsection (lock icon + requirement copy); past-due/closed (inputs disabled + explanation); results-hidden variants; archived-course banner ("course ended — content viewable, assignments disabled"); offline/submit-failure recovery (answer never lost).

---

## 4. Component Inventory (build list)

| Component | Variants | States | edX source of truth |
|---|---|---|---|
| `QuizEntryHeader` | practice / graded / exam / timed | default, resume | sequence metadata + grading policy |
| `QuestionCard` | mcq, checkbox, dropdown, text, numeric | 11 states (see F-QZ-002) | CAPA problem block |
| `ChoiceRow` | radio / checkbox | default, hover, selected, correct, incorrect, disabled, revealed-correct | choice + feedback markup |
| `SubmitRow` | with/without Save, Hint, ShowAnswer, Reset | enabled, disabled, submitting, exhausted | problem settings |
| `AttemptsCounter` | limited / unlimited(hidden) | 0..M, last-attempt warning | `attempts_used/max_attempts` |
| `FeedbackBlock` | correct / incorrect / partial / explanation / hint | — | answer-specific feedback, `<solution>`, `<demandhint>` |
| `StatusStrip` | correct / incorrect / partial / unanswered / hidden | — | problem status |
| `QuizProgressRail` | desktop rail / mobile strip | per-dot 5 states | client aggregate |
| `QuizResultsSummary` | practice / graded pass / graded fail | — | client aggregate of problem scores |
| `TimerBanner` | normal / warning-80 / critical-95 / hidden | — | edx-exams API |
| `ExamInterstitial` | entry / expired / submitted | — | edx-exams API |
| `OraStepper` + `OraStepPanel` | response / train / peer / self / grade | 6 lifecycle states | ORA block status |
| `FileUploadField` | idle / uploading / uploaded / error | required flag | ORA upload config |
| `RubricCriterion` | select + comment | unscored / scored | ORA rubric |
| `ScormContainer` | inline / fullscreen | loading / ready / error | SCORM XBlock |
| `GradeSummaryTable`, `ProgressRing`, `GradeBar`, `ScoreChip` | — | — | Progress/Grades APIs |
| `LockedCard` | prerequisite / past-due / archived | — | gating metadata |

## 5. Screens to design & deliver

1. **Quiz — practice (unanswered)** · 2. **Quiz — practice (mixed feedback states)** · 3. **Quiz — graded (entry + attempts + save)** · 4. **Quiz — graded, final attempt confirmation** · 5. **Quiz — results summary (pass / fail / practice)** · 6. **Question type sampler** (all 5 CAPA variants, all states — the Storybook page) · 7. **Timed exam entry / in-progress / expired** (conditional) · 8. **ORA — response / peer review / grade** · 9. **SCORM activity (ready / error)** · 10. **Progress & grades** · 11. **Locked/closed states**. Mobile variants for 1–6 and 10.

## 6. Integration contract (decision for devs)

| Option | What | Pros | Cons |
|---|---|---|---|
| A. Iframe + theming | Keep `render_xblock` iframe; restyle via comprehensive theme CSS | Zero behaviour risk; all types free | Legacy DOM limits layout (no rail/summary inside), iframe seams |
| B. Full native | React components → XBlock handlers (`problem_check`, `problem_save`, `problem_show`, `hint_button`, `problem_reset`) | Total design freedom (this spec 100%) | Handlers are semi-internal (form-encoded inputs `input_{usage_id}_2_1`, HTML-fragment responses); must re-implement CAPA semantics; SCORM/ORA still iframes |
| **C. Hybrid (recommended)** | Native for the 5 CAPA types + shell features (entry, rail, summary, timer, grades); iframe for SCORM, ORA (or ORA MFE), and any exotic XBlock | Design freedom where it matters; bounded platform risk | Two rendering paths to maintain |

Shell-level features (F-QZ-001, 012, 013, 015, 018, 019) consume REST APIs (course home outline/progress, courseware sequence metadata, grades, completion, edx-exams) and are required **regardless of option**.

## 7. Open questions

1. Confirm PRD 5.7 FR numbering to align this spec's IDs with the official FRD.
2. Will future courses use checkboxes/dropdown/text/numeric or stay MCQ-only? (Determines phase-1 scope of F-QZ-003…006.)
3. Are timed exams on any roadmap (certification)? If not, F-QZ-015 stays dormant.
4. ORA in phase 1: wrap the legacy iframe or adopt `frontend-app-ora`?
5. "Retry incorrect" CTA needs per-question deep links — confirm anchor strategy in the chosen rendering option.
6. Lesson-mapping for "Review lesson" links after a wrong answer: authored metadata or heuristic (same unit sequence)?
7. ~~**One unit per quiz, or several?**~~ *(added Jul 20 — **resolved Jul 29, 2026**)* Both are possible; it is an authoring choice (§1.4-0c). SKOAIH01 today stacks all questions in one unit. **Decision: adopt the stepper — one `problem` per unit**, which the platform renders natively via sequence navigation. Consequence: quizzes must be **re-authored in Studio**, splitting each question into its own unit. → open follow-up: sequence and cost that content migration with Rashid, and confirm whether it is done per-course or platform-wide.
8. **Where does the shell read its state from?** *(added Jul 20)* F-QZ-001/008/015 depend on subsection metadata (graded flag, assignment type, weight, timed config). Confirm these arrive via the courseware/sequence API in the same fetch as the unit, so the shell renders without a second round-trip.
9. **Option enumeration prefix — manual or automatic?** *(added Jul 24)* Do authors type the A/B/C or 1/2/3 prefix into the option text (manual), or does the player generate it from option order (automatic)? See BR-4. Automatic is cleaner and consistent but must run *after* server-side shuffle and be `aria-hidden`; manual is zero-build but drifts across authors. → product decision.

---

## 8. Navigation between questions — platform research (Jul 30, 2026)

Question asked: *can a course team configure whether a learner may move backwards and forwards between questions before submitting an answer?* Researched against `edx-platform`, `frontend-app-learning`, `frontend-lib-special-exams` and docs.openedx.org.

### 8.1 The answer: no, and it is not configurable at any level

Within a subsection, unit-to-unit navigation is **always free-form** — Previous/Next plus the outline sidebar — with no gate on submission state. There is no per-quiz, per-type, per-course or per-problem setting for it. Confirmed absent from `capa_block.py` (no navigation field), from Course Advanced Settings, and from the subsection Configure dialog.

The near-misses, so nobody re-opens them:

- **`hide_from_toc`** (inheritable, section-level) sets `navigation_disabled`, which hides Previous *only on the first unit* and Next *only on the last* — it stops the learner leaving the subsection, not moving inside it. It also sits behind `ENABLE_HIDE_FROM_TOC_UI = False`, a site-wide operator flag, and does not exist in the new authoring MFE at all.
- **Timed / proctored exams** (`is_time_limited`, per subsection — genuinely per-quiz) add a timer and an entry gate, then render the ordinary sequence *including its navigation*. No effect on moving between questions.
- **Subsection prerequisites** gate access to a whole subsection, never to a question.
- **The unit tab bar** can be hidden, but only through an MFE plugin-slot config for the entire deployment — never per course.

### 8.2 The finding that actually matters — corrected Aug 5, 2026

> **⚠︎ The original version of this section said unsubmitted answers are simply lost. That was wrong, and
> the error is worth understanding: it was tested on a course that had already ended, where the Save button
> is suppressed. On an open course Save is present, and it works.**

`should_show_save_button()` returns **False** when `max_attempts is None` and randomization is not *Always*
— and also whenever the problem is `closed()`, which includes past the **course end date**. That last clause
is what invalidated the original test.

| Quiz type | `max_attempts` | Save button | An unsubmitted selection… |
|---|---|---|---|
| **Practice** — unlimited retakes | none | **absent** | **is lost** on Next/Previous |
| **Graded** — 2 attempts | 2 | **present** | **persists**, if the learner clicks Save |
| **Final** — 1 attempt | 1 | **present** | **persists**, if the learner clicks Save |
| *Any type, course ended* | — | **absent** | is lost — and Submit is dead anyway |

**Verified live on AZ-204 after the course end date was moved forward:** three questions were saved, then
re-fetched from the server through `/xblock/{id}`. Each came back with its radio already `checked`, and every
question still read *"You have used 0 of 2 attempts"*. Saving persists server-side and costs no attempt.

The learner's *position* is remembered (`position`, `Scope.user_state`) independently of any of this.

### 8.2a Saved is not graded — and nothing says so

`save_problem()` (line 2075) sets `lcp.student_answers` and `has_saved_answers = True`, then returns:

> *"Your answers have been saved but not graded. Click 'Submit' to grade them."*

It never calls `publish_grade()`. **A saved answer is worth zero until submitted, and each question must be
submitted on its own** — `submit_problem` runs against a single block, increments that block's attempt
counter and publishes that block's grade. Saving four questions and submitting only the fifth grades only the
fifth.

**Confirmed against the live progress API** with three answers saved and none submitted:

```
Knowledge Check — earned 0, possible 5, percent 0
problem_scores: 0/1  0/1  0/1  0/1  0/1
```

**This is the most dangerous affordance in the quiz, and it is dangerous because it feels like progress.**
The learner gets a success message, returns later and sees their choice still selected, and has scored
nothing. The platform warns about this in exactly one place — the timed-exam submit dialog, *"Make sure that
you have selected 'Submit' for each problem"* — which an ordinary quiz never shows. The only other
explanation is a screen-reader-only sentence listing the buttons that may follow Submit.

**Design requirement:** wherever a saved-but-unsubmitted answer exists, our shell must say so at the question
*and* in the quiz-level chrome, in terms of grading rather than storage. "Saved" is the platform's word for
it and it is the misleading one.

### 8.3 What this means for our design

The stepper we adopted lets learners move between questions freely — which the platform allows, and which we cannot restrict even if we wanted to. The risk is not navigation, it is **silent data loss**: on the practice path there is not even a Save button to click.

**This is ours to solve, not edX's.** We are building a custom shell over the problem blocks (§6, hybrid integration), so the shell holds the unsubmitted selection in client state as the learner moves between questions and calls `problem_check` only on submit. Requirements this adds:

- The shell must retain a selection when the learner navigates away from an unsubmitted question and back. On practice quizzes the platform genuinely cannot help — Save is absent there by design, because unlimited attempts make submitting free.
- **Revised Aug 5, 2026 — do not simply hide edX's Save.** The original text said never to surface it, on the grounds that it would compete with our own model. Now that Save is confirmed working and free of attempt cost, the better route is to *use* it as the persistence mechanism where it exists and never show it as a button: the shell saves silently as the learner moves, and spends its interface budget on the thing that actually matters, which is that **nothing counts until Submit**. A visible "Save" invites the exact misunderstanding described in §8.2a.
- If the shell's state is ever lost (reload, session end), the honest behaviour is an empty question, not a stale one. Our "N of M still unanswered" counter must be computed from *submitted* answers so it never over-reports.

**The "should the learner be allowed to go back?" question is therefore a product choice we implement in the shell, not a platform setting we configure.** Freedom to review is the platform default and the accessible behaviour; if the room wants it restricted for Final exams, that is custom work in our shell, and it should be justified against the accessibility cost rather than assumed.

---

## 9. Question types — confirmed by the vendor (Jul 30, 2026)

Established in a live Studio walkthrough by Simran Jindal, who authors these courses. Full session record in `../session-log.md`. This closes the workshop action *"determine all quiz question types supported in the platform"*.

### 9.1 The list

| Type | Cardinality | Vendor usage | Designed? |
|---|---|---|---|
| **Multiple choice** | one answer | *"90%"* of all quiz questions | ✅ shipped |
| **Checkbox** | several answers | second most common | ✅ shipped |
| **Multiple choice with hints and feedback** | one answer | **being adopted now** | ⚠️ feedback yes, **hints no** |
| **Checkboxes with hints and feedback** | several answers | as above | ⚠️ same gap |
| **Dropdown** | one answer, short/numeric | *"used very rarely"* | ❌ not designed |
| **Numerical input** | typed value | rare | ❌ not designed |
| **Staff graded points** | n/a | **not a quiz** — file submission graded by hand | covered by ORA/assignment work |

### 9.2 What this changes

**Hints are a real gap.** We designed feedback but not hints. The hint is shown when the learner picks a wrong answer, *before* the explanation. The vendor's reason for adopting them is worth honouring in the design: previously a learner who exhausted their attempts never found out the right answer at all. A hint is the recovery path *inside* an attempt, feedback is the explanation *after* it — they are different moments and should not collapse into one component.

**Dropdown and numerical input are low volume but not zero.** Both are P3: design them once the multiple-choice path ships. Neither needs new interaction thinking — dropdown is a select, numerical input is a text field with server-side validation — but both need the same submitted/correct/incorrect/disabled states as the option row, and numerical input needs an "answer format" hint so learners are not guessing at units or decimal places.

**Staff graded points is not ours to design here.** It is an assignment with hand grading, which is the ORA/assignment track.

### 9.3 An attempt is one run through the WHOLE quiz

**Corrected Aug 3, 2026 (Nelson).** An attempt is a retake of the **entire quiz**, not a retry of a single answer. "2 attempts" means the learner may sit the quiz twice; it does not mean two tries at each question. This package previously said *"2 attempts per question"* in several places — that was wrong and is corrected throughout.

**Where it gets awkward — and it is worse than it first looked.** Two independent source reviews confirm the same negative finding: **there is no per-subsection attempt limit anywhere in core Open edX.**

- `SequenceBlock` has no attempts field. Its complete settings list is `position`, `relative_weeks_due`, `hide_after_due`, `is_entrance_exam`, `is_time_limited`, `default_time_limit_minutes`, `is_proctored_enabled`, `exam_review_rules`, `is_practice_exam`, `is_onboarding_exam`, plus inherited `graded`, `format`, `due`, `show_correctness`.
- The current Studio subsection Configure modal exposes no attempts control.
- `Maximum Attempts` is a field on the **problem block** — on each question. Blank means *"infinite attempts are allowed"* in the platform's own help text.
- Even a **timed exam has no attempt limit** — it has a time limit and a single session. Retakes are staff-initiated: staff clear the attempt.
- `reset_problem()` is per problem and explicitly **does not refund an attempt**.

So "2 attempts at the whole quiz" is **entirely ours to build and enforce**. The platform will not count it, will not stop a learner exceeding it, and has no field to store it in. Concretely the shell must: set the same per-problem limit on every question, track which run the learner is on, decide what a "run" resets, and block a third run itself.

> If anyone reports having seen a per-quiz attempts setting, it is one of three other things: the prerequisite **Minimum score** gate, staff clearing a timed-exam attempt, or a vendor fork. Not core.

Two consequences for the design:

- **"Attempt 2 of 2 · last attempt" on the question card stays**, but only if it reads as *the second run of the quiz*. It must never be mistaken for a second try at the question in front of the learner. It is quiz-level information repeated on the card for orientation, not something scoped to that question.
- **"Retry incorrect (N)" is a partial retake, and the platform has no such concept.** Decide explicitly whether it consumes a full quiz attempt. If it does, the label must say so. If it does not, the attempt limit means nothing: a learner can grind the wrong answers indefinitely while the counter still reads "2 attempts" — worse than having no limit, because it looks like a rule.

### 9.4 Attempts — blank means two different things

**Corrected Aug 3, 2026.** An earlier version of this section said Open edX has no unlimited-attempts setting. That was too broad, and it came from over-reading one vendor sentence.

The platform's own documentation (see `01-edx-quiz-capabilities.md` §2) is explicit: **Maximum Attempts is an integer, and empty = unlimited**, with a course-wide advanced setting supplying the default. Simran said in the walkthrough that *"there's no option of unlimited… you can keep it like 10, 20 or maybe 100"* — but she also said *"if there is no number and it's a **timed exam**, then by default it takes one."* Both are true, of different things:

| Context | Maximum Attempts blank means |
|---|---|
| Ordinary problem | **unlimited** |
| Timed / special exam | **one attempt** |

So the design rules are:

- **"Unlimited attempts" is legitimate on a practice quiz** and must never appear on a timed one, where blank silently means a single attempt. Getting this backwards is the dangerous direction: a learner told they have unlimited tries on a one-shot exam.
- Otherwise render the number the backend returns. Above roughly ten the count stops being a meaningful constraint, so hide the pill rather than printing noise like "100 attempts".
- Never invent the word "unlimited" for a high number — say what the number is, or say nothing.

> **⚠︎ Still to verify in the dev environment.** Whether *their* Studio actually permits a blank value, or whether their authoring practice forces a number. Simran's phrasing suggests the latter, which would be a house convention rather than a platform limit. Added to the dev-environment checks.

### 9.5 Linking from a quiz to course content — not possible in authored content

Confirmed twice: an author **cannot** put a working link or CTA in a question or in feedback text. The only workaround offered is prose — *"you can go and review module 3"* — with the learner navigating manually via the content outline.

**This does not kill our "Review module first" button.** The limit applies to content authored inside the `problem` block. Our shell renders its own chrome and knows which subsection the quiz belongs to, so it can resolve the parent module itself and link there. The rule that follows:

- The review affordance is **shell-owned**, resolved from course structure. Never authored into feedback text.
- It therefore only exists when the shell can resolve a parent — consistent with the existing rule that the button hides when the quiz is not linked to a module.
- Authors must not be asked to write "go and review module 3" into feedback as a substitute; that produces prose that goes stale when content is reordered.

---

## 10. Platform limit vs. their configuration — source verification (Aug 4, 2026)

The vendor walkthrough of 4 Aug produced a set of answers about what the platform does. Because those answers come from the person who *configures* SkillUp's courses, they are reliable about SkillUp and unreliable as statements about Open edX. Each was taken back to primary source — the `openedx` repositories read at `master` (`edx-platform` @ `feb3e3fd`, `frontend-app-learning` @ `db2134c9`, `edx-proctoring`, `completion`, `xblocks-core`), not documentation summaries.

Full evidence, with file and line citations, is in [session-log.md](../session-log.md) under *2026-08-04 · Source verification of the walkthrough answers*. What follows is what it changes for this spec.

### 10.1 The split

| Claim from the walkthrough | Verdict | Cost to change |
|---|---|---|
| No submit for a whole quiz | **Platform limit** — `seq_block.py` has two handlers, neither submits | — |
| No end-of-quiz score summary | **Platform limit** — zero occurrences of `score` in `seq_block.py` | see 10.4 |
| No per-quiz pass mark as a verdict | **Platform limit** — `GRADE_CUTOFFS` is course-wide | see 10.5 |
| Show answer is tied to graded/non-graded | **Their configuration** — `answer_available()` never reads `graded` | one inherited field |
| Quizzes are all open, nothing is gated | **Their configuration** — `enable_subsection_gating` defaults `False` | one Advanced Setting + authoring |
| Reset appears after submitting | **Their configuration** — `show_reset_button` defaults `False` | one inherited field |
| Attempts cannot be restricted quiz-wise | **Half wrong** — `max_attempts` is inheritable; set once on the subsection it covers every question | one inherited field |

### 10.2 Correction to this spec — feedback *is* immediate by default

`show_correctness`, display name **"Show Results"**, is inheritable with default **`"always"`**; the only other values are `never` and `past_due`. So the correct formulation, replacing any looser wording elsewhere in this document:

> **Per-question correctness is shown immediately unless deliberately suppressed. What does not exist is a quiz-level summary.**

Where learners appear to see nothing after submitting, `show_correctness` has been set away from its default on that subsection.

### 10.3 Three rules this settles for our screens

1. **Show answer is not a graded/practice rule — it is a per-quiz choice.** Twelve values exist (`class SHOWANSWER`, `capa_block.py:82`), and the field is inheritable down from course, section or subsection. Our design should stop presenting the split as something the platform imposes and present it as the editorial policy it is. The design recommendation stands (free on practice, attempts-exhausted on graded); the justification changes from "the platform requires it" to "we chose it, and one field per subsection implements it."
2. **Reset does not refund an attempt.** `self.attempts` is incremented in exactly one place in `capa_block.py` (line 1817, inside submit); `reset_problem()` never touches it. Any copy on `Retry incorrect` must not imply the attempt comes back. This is the highest-risk wording in the whole flow.
3. **`Gate · Prerequisite` is a real platform feature that is switched off, not an impossibility.** `enable_subsection_gating` + `min_score` (0–100) + `min_completion`, enforced by `descendants_are_gated()` against direct-URL access, with a Studio UI. Keep the component; treat it as *available if the business wants it*, not as a state our learners currently meet.

### 10.4 The results screen is a frontend plugin, not a fork

This is the most consequential correction, and it reverses the cost assumption in F-QZ-013.

**The learner can read their own subsection score.** `GET /api/course_home/progress/{course_id}` — `ProgressTabView`, `permission_classes = (IsAuthenticated,)`, defaulting to the requesting user. Per subsection it returns `num_points_earned`, `num_points_possible`, `percent_graded` and `problem_scores: [{earned, possible}]`. Every subsection-granular route under `/api/grades/v1/` is by contrast staff-gated — including `/subsection/{id}/`, the one that looks obvious and 403s for a learner.

**There is a supported place to render it.** `org.openedx.frontend.learning.sequence_bottom_navigation.v1` receives `courseId`, **`sequenceId`** and `unitId` with `mergeProps: true`, wrapping the Prev/Next area. `sequenceId` is what makes last-unit-in-subsection detection possible. The fallback `sequence_container.v1` sits after all sequence content but exposes only `courseId` and `unitId`.

**Design consequences:**

- **The `Pending` variant of `LMS / Quiz · Results` is required, not defensive.** Scores are recomputed asynchronously off `PROBLEM_WEIGHTED_SCORE_CHANGED` (`grades/tasks.py`), so a fetch immediately after the last submit can legitimately return a stale total.
- **The screen appears in place, below the question content — it is not a route.** No slot fires on *leaving* a subsection; both render continuously while the learner is on a unit. There is no interstitial to design.
- **Last-unit detection is ours to build.** The MFE's `isLastUnit` means last of the *course* (`sequence-navigation/hooks.js:45`); `isLastUnitInSequence` stays internal.
- **Treat the data source as unstable.** `course_home_api/urls.py` declares itself an unversioned BFF that may change between releases, and is gated by the waffle toggle `course_home_mfe_progress_tab_is_active`. The screen must degrade to "see your results on the Progress tab" rather than break.

*Caveat carried forward:* reading the MFE's redux store from inside a plugin widget — needed for `sequence.unitIds` — is the pattern the app's own slot fallbacks use, but the slot READMEs do not document it as a contract. **UNVERIFIED.**

### 10.5 What Reset actually does — the behaviour behind our "Try again"

Read from `capa_block.py` at `master`. This is the full contract, because the label we put on this button
depends on it.

**When the button appears** — `should_show_reset_button()`, line 1031, in evaluation order:

1. `is_survey_question = (max_attempts == 0)`
2. if `closed()` and not a survey question → **False**. `closed()` (line 1435) is `used_all_attempts() or is_past_due()`. So **once the last attempt is spent, Reset disappears.**
3. if `rerandomize` is `always`/`onreset` **and** the problem is submitted → **True**
4. if `is_correct()` → **False**
5. otherwise → the value of `show_reset_button`, which **defaults to `False`**

**What it does** — `reset_problem()`, line 2121:

- refuses if `closed()`: *"You cannot select Reset for a problem that is closed."*
- refuses if not submitted: *"You must submit an answer before you can select Reset."*
- re-seeds if randomised — on a shuffled question the learner may get a **different variant**
- rebuilds the problem and **clears the submitted answer**
- `set_score(...)` then `publish_grade()` — **the points already earned are removed immediately**
- **never touches `self.attempts`.** That variable is assigned in exactly one place in the whole 2,481-line file: line 1817, `self.attempts = self.attempts + 1`, inside submit.

**So the honest description is:** *Reset clears your answer and the score it earned, so you can answer again
using an attempt you still have.* It is free in itself, but the re-answer costs the next attempt, and it is
unavailable once attempts run out.

**Two consequences for the design:**

- **Reset is hidden after a correct answer, and that is protective, not an oversight.** Because reset wipes
  the score on the spot, a learner who pressed it on a question they had right would destroy a point they
  had already banked. Our `Correct` state must therefore never offer it — which is what the redraw of the
  today column already shows.
- **The label carries the risk.** "Try again" reads as a free second go. It is only safe next to a visible
  count of attempts remaining, and it must never suggest the spent attempt comes back. "Reset" is the
  platform's own word and is accurate but tells the learner nothing about the cost. **Recommendation: keep a
  human label, and bind it to the attempts statement rather than leaving it standing alone** — which is what
  the `PROPOSED COPY` note in column B specifies.

### 10.6 Save is a real feature we are not using

`force_save_button` (line 267, Boolean, default `False`), `should_show_save_button()` (line 1052), the
`problem_save` handler (line 422) and `save_problem()` (line 2075) which sets `lcp.has_saved_answers = True`.
**Save stores an answer without submitting it and without spending an attempt.**

The display logic is worth reading closely, because it predicts something we can check. Save is deliberately
hidden when `max_attempts is None` and the problem is not randomised — the code's own comment explains that
with unlimited attempts and no randomisation, submitting costs nothing, so a save button is pointless. But on
a **graded** quiz with `max_attempts = 2`, not closed and not yet submitted, the function returns `True`.

**On our graded quizzes the Save button should therefore already be rendering, and in the screenshot of the
live AZ-204 Knowledge Check it is not.** That is very likely why the 3 Aug test lost an unsubmitted answer on
navigation. Either their theme suppresses it or the platform version differs — a question for the vendor, not
an assumption for us.

Both `Save draft` and `Skip question` are therefore modelled as **optional** in `LMS / Quiz · Question Card`
(`Show save`, `Show skip`, both defaulting off). Save because it is a real feature that may be switched on
per quiz; Skip because it has no platform counterpart at all and only becomes meaningful if the stepper is
ever adopted — a decision that would reshape the whole flow.

### 10.7 The button contract — every action on a question

Written after finding four buttons on `LMS / Quiz · Question Card` that the platform has no counterpart for.
They arrived honestly: the component was drawn as our *proposal*, and nobody had yet asked which of its
affordances the backend can actually honour.

**The test applied to each one:** does it exist in the Open edX source, and if so, what does it really do?
Everything below is read from `capa_block.py` and `seq_block.py` at `master`, not from documentation.

| Button | In the platform? | Mechanism | Decision |
|---|---|---|---|
| **Submit** | Yes | `problem_check` → `submit_problem` (line 422). The only place `self.attempts` is incremented (1817) | Always present. The one action that spends an attempt |
| **Show answer** | Yes | `showanswer`, twelve values, **inheritable**, default `finished` (238, 82) | Keep. Set deliberately per quiz, not per question |
| **Reset** *("Try again")* | Yes | `problem_reset` → `reset_problem` (2121). `show_reset_button` defaults **off** (270) | Keep. Label must sit beside the attempts count — see §10.5 |
| **Save** *("Save draft")* | Yes | `problem_save` → `save_problem` (2075). `force_save_button` defaults **off** (267) | **Optional** (`Show save`, off). Real feature, not enabled today |
| **Hint** *("Next hint")* | Yes | `demandhint` in the problem XML | **Optional** (`Show hint`, off). Zero authored anywhere in our catalogue |
| **Skip question** | **No** | Zero occurrences of `skip` in `capa_block.py` or `seq_block.py` | **Optional** (`Show skip`, off). Ours. Only meaningful if the stepper is adopted |
| **Next question** | **No** | Navigation is per *unit* (`goto_position`), and a quiz is one unit | **Unresolved** — still on four variants. See below |
| **Review lesson** | **No**, inside a problem | Authors cannot link out of problem content; our shell can resolve the parent | **Removed from the card.** Kept in the Entry Header, where it is outside the iframe |

#### 10.7.1 The rule this produced

**A button on a question may only promise what the backend can honour.** Three of the eight failed that test,
and each failed differently:

- *Skip* and *Next question* promise **navigation that does not exist** — every question is on one page, so
  there is nowhere to go. They are artefacts of a stepper we deliberately excluded.
- *Review lesson* promised **precision we cannot deliver** — the link resolves to the module, not to the
  lesson covering that question, because no question→content mapping is authored.
- *Save draft* looked like an invention and was not. Removing it on suspicion would have deleted a real
  feature from the design.

That last one is why the test is "does it exist in the source", not "does it look familiar".

#### 10.7.2 Where the platform hides a button, copy that behaviour

The platform suppresses actions at moments where they would harm the learner, and those rules are worth
inheriting rather than re-deriving:

- **Reset disappears once the answer is correct** (`is_correct()` → `False`, line 1048). Because reset wipes
  the score on the spot, offering it there would let a learner destroy a point they had banked.
- **Reset and Save both disappear once the problem is closed** — `used_all_attempts() or is_past_due()`
  (1435). An action that can no longer succeed should not be on screen.
- **Save is hidden when attempts are unlimited and the question is not randomised** (1066). The code's own
  comment: submitting costs nothing in that case, so a save button is noise.

#### 10.7.3 Still open

**`Next question` remains on four variants** — `Correct`, `Partially correct`, `Answer revealed` and
`Results withheld`. It is the same defect as `Skip question`, and it is the *primary* action in all four, so
removing it raises a real question: what replaces it? The redrawn today column answers that for `Correct` —
**nothing**, because after a right answer on a scrolling page there is no next step to offer. Applying that
to the other three is the obvious move, but it is a design decision, not a correction, and it is Nelson's.

### 10.8 The pass mark has a route nobody raised

`min_score` in the gating API **is** a per-subsection threshold, evaluated by `get_subsection_grade_percentage(usage_key, user)`. So "the learner must reach 80% on this quiz" is expressible today. What the platform does with it is **open downstream content**, not stamp a verdict on the quiz.

Which route applies depends on what the pass mark is *for*:

| Intent | Supported? | Cost |
|---|---|---|
| "80% on Quiz 3 before Module 4 opens" | **Yes, today** | Authoring — same lever as 10.3 rule 3 |
| "Show the learner Passed / Not passed on Quiz 3" | No | Needs the results surface in 10.4 |
| "Quiz 3 pass/fail drives certification independently of course grade" | No | Custom development |

The first two are the same underlying feature: turning on subsection prerequisites delivers per-quiz thresholds *and* gating in one configuration change. **This does not change the recommendation in [07-results-decisions.md](07-results-decisions.md) §1** — the pass mark stays authored metadata worded as a target, never a gate, and never on practice. It does mean that if the business later wants it to be a gate, the platform is ready and the change is authoring, not engineering.
