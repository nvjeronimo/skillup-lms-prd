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
0d. **What Open edX genuinely lacks** *(verified Jul 29, 2026)* — the real gap, and where our shell adds value: **(i)** no per-question counter ("Question 3 of 10" — the native one counts *units*), **(ii)** no quiz-level submit-all, **(iii)** no end-of-quiz review/summary screen. The timed-exam submit dialog is explicit that it ends the *attempt*, not the answers: *"Make sure that you have selected 'Submit' for each problem before you submit your exam."*
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
Before the first question, show a context block: quiz title; badge `Practice` / `Graded` / `Final Exam`; question count; attempts policy ("2 attempts per question" / "Unlimited attempts"); weight ("Counts 20% of your final grade" — computed from grading policy) or "Doesn't affect your grade"; pass threshold when graded; estimated time (authored or count×1.5 min); primary CTA **Start quiz** opens step 1 (or **Resume** at the furthest answered question). *(Updated Jul 29, 2026: the quiz is a stepper — one question per step — so the entry header is the first screen rather than a block above a scroll. See §1.4-0c.)*
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
