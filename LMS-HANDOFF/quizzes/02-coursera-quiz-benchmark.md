# UX Benchmark: How Coursera Handles Quizzes & Assessments

Compiled 2026-07-17 from public sources: Coursera Learner Help Center, Coursera's official blog, the Coursera-authored Learner Guide PDF (v2.5, 2021), and an Open edX competitive analysis of Coursera. Where public info is thin, that's flagged explicitly.

---

## 1. Assessment Types on Coursera

Coursera's umbrella term is "assessments"; auto-graded quizzes are officially called **assignments** ("sometimes called quizzes").

| Type | How it appears in outline | Grading impact |
|---|---|---|
| **Graded assignment (quiz)** | Distinct item in the module list with a due date; most courses put one at the end of each week/module. Listed in the Grades tab with weight + status. | Must pass **all** graded assignments to earn the Certificate. Auto-graded instantly; most require **80%+ to pass** (threshold shown when you open the assignment). |
| **Practice assignment** | Same quiz mechanics, labeled "Practice"; usually not in the graded list. | Ungraded — "work the same as regular assignments, but don't affect your grade." |
| **In-video questions** | Embedded inside video items, not a separate outline item. | **Optional, zero grade impact.** |
| **Peer-graded assignment** | Separate item with Instructions tab + "My submission" tab; Grades tab shows the *peer review obligation* as a requirement. | Graded; must submit **and** review N peers. Often graded by an **AI grader** (instant) instead of peers (7–10 days). Final grade = sum of **median** peer grade per rubric part. |
| **Programming assignment** | Code submitted in-browser or via upload, graded by autograder. | Counts like any graded assignment. |
| **Graded Labs / Coursera Labs** | "External Tool"/Lab item opening a cloud workspace (Jupyter, RStudio, VSCode). | Graded by testing code in the workspace. |
| **Staff-graded assignment** | Private/Degree courses only; graded manually. | Counts; may lack per-question feedback; hard attempt limits. |
| **Graded discussion prompts** | Private/Degree only. | Counts toward grade. |
| **Honors assignments** | Optional track items marked "Honors". | Not required; "Honors" recognition on certificate. |
| **Guided Projects** | "External Tool" item (split-screen cloud desktop beside instructor video); a **cumulative quiz** sits back on the course page as the graded gate. | Certificate = finish project + pass the quiz. |

---

## 2. Quiz-Taking UX Flow

**Entry screen.** Pre-start summary before any questions: estimated time to complete, required passing grade, attempts policy, due date, and — for timed assessments — the time limit "listed on the page before you start." Learner clicks **Start assignment** (or **Resume** if a draft exists). Timed assignments show a **countdown timer**; on expiry "your work will automatically be submitted as-is."

**Canonical flow (verbatim from help center):**
1. Open the assignment
2. Click Start assignment
3. Answer all the questions
4. Check the box to agree to Coursera's Honor Code
5. Click Submit

**Question layout.** Single scrolling page ("Answer all the questions… click Submit at the bottom of the page"), not paginated. **No evidence Coursera has flag/skip-and-return UI or a within-quiz progress indicator** — genuine gap to improve on.

**Question types:** multiple choice (single/multi-select), drop-down (incl. ordered-sequence), short answer (typed text; capitalization-insensitive, whitespace/punctuation-sensitive — documented friction), long answer (rich text; some with pre-submit **plagiarism self-check**), math questions, Code Blocks (in-browser runnable code inside a quiz).

**Honor code prompt.** Inline checkbox at submit time with the learner's name: "I understand that submitting work that isn't my own may result in permanent failure of this course or deactivation of my Coursera account."

**Save draft.** In-progress = "Started" status. Known failure mode: learners *save a draft believing they submitted*. Peer-graded assignments: save unlimited times, resume any device, nothing visible to reviewers until submitted. (Design lesson: make draft-vs-submitted loud.)

**Submit confirmation.** Peer-graded requires Submit + confirm. For auto-graded quizzes public docs don't detail a confirmation dialog.

---

## 3. Feedback & Retry UX

- **Immediate grading:** "Most assignments are automatically graded, so you'll get your grade immediately after submitting."
- **Per-question feedback:** open assessment → **View Feedback** → score per question + optional instructor explanations.
- **Pass threshold:** "Most assignments require an 80% or higher to pass."
- **Retry policy:** "Most assignments have unlimited attempts," rate-limited — e.g., **3 attempts every 8 hours** (per-course; shown on the assignment). Either **highest or most recent** score counts, per course config — disclosed on the assignment page.
- **Retry flow:** Grades tab → open assignment → View Feedback → **Try again**. Framed positively.
- **Statuses:** Graded / **Passed** / **Didn't Pass** / Dropped / Adjusted.
- **Re-study prompting:** thin. Mechanism is indirect — course-home **"next step" recommendation** "may also redirect them to retry failed assignments." No documented per-question "review this lesson" deep-link — gap worth designing better.
- **AI-graded peer assignments:** grade + written feedback in ~1 minute; **16.7% course-completion lift within a day** — fast, rich feedback drives momentum.

---

## 4. In-Video Questions

- **Mechanic:** video pauses at instructor-set timestamp; question renders as overlay in the player; answering (or skipping) resumes playback.
- **Types:** reflective, short answer, multiple choice, and **polls/surveys** — polls show "a summary of responses from other learners after you respond."
- **Grade impact:** none. **Skippable:** yes; on rewatch can answer again or skip.
- Thin area: overlay visual anatomy not publicly documented.

---

## 5. Progress / Grades Integration

**Grades tab** is the assessment hub: per assessment — status, grade (plus adjustments), **weight**, due dates/personalized deadlines, lock state, peer-review requirements, final grade. Retakes launched from here. Status vocabulary: `--` (not started), Started, Submitted, Graded, Passed, Didn't Pass, Dropped, Adjusted.

**Weighted grading:** final grade = Σ(score × weight); grading groups with weights; drop-lowest supported. (Open edX analysis notes Coursera's learner-facing rendering of grouped assignments is "extremely poor" — known weakness.)

**Deadlines & reset:** public courses use a **personalized schedule** — soft, penalty-free ("Missed deadlines don't affect your grade"). **"Reset deadlines"** evolved into automatic: deadlines auto-reset when you miss two in a row or miss one by two weeks, fresh schedule "based on the amount of progress you've made," grades preserved. "Course timeline" panel shows upcoming deadlines + calendar sync. Degree courses: hard deadlines, late penalties.

**Outline integration:** weeks/modules with per-item completion; progress bars; persistent **Start/Resume "next step"** button (A/B-tested >10% completion lift). Passing a module quiz completes the module (checkmarks).

**Locking:** lock icon; opening a locked item explains why (audit mode, prerequisite gating, staff grading in progress). "Graded Item Locking" product: graded items unlock only after completing each lesson item in sequence.

---

## 6. Notable UX Patterns Worth Stealing

1. **Fast feedback is the retention lever.** Cutting feedback latency from ~15h to ~1min (AI grading) lifted completion 16.7% within a day, 45x more written feedback, 90% satisfaction; 97% preferred AI over peer grading. Instant per-question feedback + substantive explanations > gamification.
2. **"Next step" resume nudge.** One persistent Start/Resume button routing to next incomplete item — *including failed quizzes to retry* — >10% completion lift.
3. **Soft deadlines + automatic forgiveness.** Personalized schedules that silently re-plan; removes shame/abandonment loops.
4. **Unlimited attempts, rate-limited (3 per 8h), best-score-counts.** Rigor without punishing failure; cooldown nudges re-study.
5. **In-video questions as zero-stakes formative checks** — pause, ask, resume, skippable, never graded; poll variants show peer distributions. Perfect for a video-first player.
6. **Friction-calibrated integrity:** lightweight honor-code checkbox for MOOCs; escalating to question banks, time+attempt limits, lockdown browser, plagiarism self-check, AI "viva" follow-ups only for high-stakes.
7. **Status vocabulary + draft safety.** 8-state status model; improve the draft-believed-submitted weakness.
8. **Coach/AI quiz-prep:** pre-assessment review, recaps, guided practice with spaced repetition.
9. **Streaks & weekly goals** in the app; activity trackers on dashboard.
10. **Mobile/offline quiz UX:** quizzes downloadable, answerable offline, auto-submitted on reconnect; high-stakes types excluded from offline.
11. **Accessibility:** public commitment page + player keyboard controls; quiz-specific a11y patterns not publicly documented.

---

---

## 7. Cross-platform comparison — stepper vs. one scroll

*Added Jul 29, 2026. Live re-verification of Coursera (help centre now at `coursera.support`; note the terminology moved from "quiz" to "assignment"), plus first-party docs for each other platform. Coursera help articles carry no visible last-updated date, so "current" = as rendered on 29 Jul 2026.*

| Platform | Layout | Progress indicator | Submit model | Review before submit |
|---|---|---|---|---|
| **Coursera** | **Single scroll** | Status header only — no counter, no bar, no map | One quiz-level Submit + honor-code checkbox | **None** |
| **Udemy** (practice test) | **Stepper** | Progress bar (progress + time remaining) | Deferred batch | **Yes** — flags missed questions + filterable "See all questions" map |
| **LinkedIn Learning** (chapter quiz) | **Stepper** | Question count at entry | Per question, immediate feedback | None |
| **Canvas** (New Quizzes) | **Instructor-set** | Question Navigator (answered/unanswered, pinnable) | Autosave + Submit, resumable | Confirm dialog with unanswered count |
| **Moodle** | **Instructor-set** (`New page` = 1 ⇒ stepper) | Navigation block, flags, locked states | **Two-stage** → summary page → final submit | **Yes — strongest** |
| **Open edX** | **Author-set** (1 problem/unit ⇒ stepper) | Per-unit tabs + completion checks; **no per-question counter** | **Per problem block** | None |

**Three conclusions that shaped our decision:**

1. **Coursera is the outlier, and deliberately so.** No navigator, no unanswered warning, no flagging. That is affordable because retries are effectively unlimited (`Attempts: 3 every 8 hours`, best-score-counts) — the cost of a mistake is one more attempt. **Do not copy Coursera's layout without also copying its retry economics.** Our graded path does not have them: SKOAIH01 gives **2 attempts at the whole quiz** on a Graded Quiz worth 60% and a Final Exam worth 40%. *(Corrected 3 Aug 2026 — this read "2 attempts per question". An attempt is one run through the quiz; see `04-quiz-experience-spec.md` §9.3.)*
2. **Presentation and backtracking are two independent axes**, not one "stepper?" decision. Canvas and Moodle expose them as separate settings. Canvas's interaction rule is the cleanest: when backtracking is off, *remove* the navigator rather than disable it.
3. **Review-before-submit follows from the submit model.** Per-question submit (LinkedIn, Udemy in-course, Open edX) makes a pre-submit review screen structurally impossible; batch submit invites one. Since we keep Open edX's per-question submit, our equivalent is the **post-submit results summary** (F-QZ-013) plus a live outstanding-questions cue — neither of which the platform provides.

Moodle detail worth stealing: it uses a **stepper for answering but collapses to a single scroll for reviewing** — *"the review will show all the questions on a single page to make it easier to navigate."*

Sources: [Coursera — Taking assignments](https://www.coursera.support/s/article/learner-000001563) · [Coursera — Solve problems with assessments](https://www.coursera.support/s/article/learner-000001574) · [Udemy — Taking Practice Tests](https://support.udemy.com/hc/en-us/articles/10985362294551-Taking-Practice-Tests) · [LinkedIn Learning assessments](https://www.linkedin.com/help/learning/answer/a702857/) · [Canvas — New Quizzes student guide](https://community.instructure.com/t5/Student-Guide/How-do-I-take-a-quiz-in-New-Quizzes/ta-p/291) · [Moodle — Using Quiz](https://docs.moodle.org/en/Using_Quiz)

---

## Explicit gaps in public information

- Question-level UI micro-interactions (submit confirmation, unanswered warnings, in-video overlay anatomy, checkmark styling) not documented publicly.
- No evidence of question flagging/mark-for-review or within-quiz progress indicator — opportunity.
- No official per-question "go back to lesson X" links after failing.
- No engineering/design blog post about the quiz UI itself.
