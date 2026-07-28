# Open edX Assessment & Quiz Capabilities — Complete Reference for Custom Frontend Handoff

Research date: 2026-07-17. Primary sources: docs.openedx.org (latest), Open edX Learner's Guide (edx.readthedocs.io), Open edX community wiki/GitHub. All URLs cited inline.

---

## 1. All Problem / Assessment Types

Master index: [Components & Activities](https://docs.openedx.org/en/latest/educators/navigation/components_activities.html) and [Guide to Problem Types](https://docs.openedx.org/en/latest/educators/references/course_development/exercise_tools/guide_problem_types.html). "Support" tiers below are Open edX's own labels (Full / Provisional / Not supported).

### 1a. Core CAPA problem types (built-in Problem component, mobile-ready, Full support)

| Type | What it is | Learner interaction | Engine |
|---|---|---|---|
| **Single Select (Multiple Choice)** | One correct answer from visible radio options | Click one radio option, Submit | Core CAPA (`multiplechoiceresponse`) — [docs](https://docs.openedx.org/en/latest/educators/concepts/exercise_tools/about_single_select.html) |
| **Multi-Select (Checkboxes)** | One or more correct options | Check multiple boxes, Submit | Core CAPA (`choiceresponse`) — [docs](https://docs.openedx.org/en/latest/educators/concepts/exercise_tools/about_multi_select.html) |
| **Dropdown** | One answer chosen from a select list | Open dropdown, pick option, Submit | Core CAPA (`optionresponse`) — [docs](https://docs.openedx.org/en/latest/educators/references/course_development/exercise_tools/dropdown.html) |
| **Numerical Input** | Numbers/simple math expressions, graded with tolerance (absolute or %) | Type value into field; MathJax live-renders | Core CAPA (`numericalresponse`) — [docs](https://docs.openedx.org/en/latest/educators/references/course_development/exercise_tools/numerical_input.html) |
| **Text Input** | Free text matched against answer patterns (exact, case-insensitive, regexp, multiple correct answers) | Type text, Submit | Core CAPA (`stringresponse`) — [docs](https://docs.openedx.org/en/latest/educators/concepts/exercise_tools/about_text_input.html) |

### 1b. Advanced CAPA problem types (still Problem component, authored via Advanced/OLX editor)

| Type | What it is | Interaction | Status |
|---|---|---|---|
| **Math Expression Input** | Symbolic math with variables; checked for mathematical equivalence | Type expression (e.g. `x^2*y`), live preview | Full, mobile-ready — [docs](https://docs.openedx.org/en/latest/educators/references/course_development/exercise_tools/math_expression_input.html) |
| **Custom JavaScript Display and Grading (JSInput)** | Custom JS app embedded in a CAPA problem; JS returns state/answer to the grader | Interact with arbitrary JS widget inside the problem | Full — [docs](https://docs.openedx.org/en/latest/educators/references/course_development/exercise_tools/custom_javascript.html) |
| **Custom Python-Evaluated Input (write-your-own-grader)** | Educator-embedded Python script (`<customresponse>`) grades one or more input fields | Enter response(s); Python `check` function evaluates | Provisional — [docs](https://docs.openedx.org/en/latest/educators/references/course_development/exercise_tools/guide_custom_python_problem.html) |
| **Chemical Equation** | Text box accepting chemical-equation notation, rendered and checked | Type equation (e.g. `H2SO4 -> H^+ + HSO4^-`) | Not supported tier — [docs](https://docs.openedx.org/en/latest/educators/how-tos/course_development/exercise_tools/add_chemical_equation.html) |
| **Image Mapped Input** | Click a defined rectangular region on an image | Click on image; region checked | Not supported tier — [docs](https://docs.openedx.org/en/latest/educators/concepts/exercise_tools/about_image_mapped_input.html) |
| **Problem with Adaptive Hint** | Evaluates response and shows targeted hint/feedback per wrong answer (`<hintgroup>`) | Submit, receive response-specific hint | Not supported tier — [docs](https://docs.openedx.org/en/latest/educators/how-tos/course_development/exercise_tools/create_problem_with_hint.html) |
| **Circuit Schematic Builder** | Build circuits on an interactive grid; DC/AC analysis graded | Drag circuit elements, run analysis | Not supported tier |
| **Single Select + Numerical Input combo** | Multipart: radio choice plus numeric entry | Select and type | Not supported tier |
| **External Grader** | Response sent to external service (XQueue) which returns score/feedback; used for code grading | Submit code/text; async feedback | Provisional — [docs](https://docs.openedx.org/en/latest/educators/concepts/exercise_tools/about_external_graders.html) |
| **Problem written in LaTeX** | Authoring convenience, compiles to XML | n/a | Not supported tier |

### 1c. XBlocks / advanced components (separate from the CAPA Problem component)

| Type | What it is | Interaction | Status |
|---|---|---|---|
| **Drag and Drop (v2)** | Drag text/image items onto target zones on a background image; graded, supports feedback popups and intro/final feedback | Drag items (keyboard accessible) | Full, mobile-ready — [concept](https://docs.openedx.org/en/latest/educators/concepts/exercise_tools/about_drag_and_drop.html) |
| **Open Response Assessment (ORA2)** | Essay/file submission with configurable steps: learner training, peer, self, staff grading against a rubric | Write/upload, assess peers/self, receive grade | Full, mobile-ready — [docs](https://docs.openedx.org/en/latest/educators/concepts/exercise_tools/about_OpenResponseAssessments.html) |
| **Staff Graded Assignment (SGA)** | Learner uploads file; staff downloads, scores manually | Upload file, await staff score | [docs](https://docs.openedx.org/en/latest/educators/how-tos/course_development/exercise_tools/manage_staffgraded.html) |
| **LTI Component (LTI 1.1 & 1.3/Advantage)** | Embed external tool (inline, modal, or new window); can return grades to the gradebook (outcomes service / AGS deep linking, NRPS) | Depends on tool | Full — [concept](https://docs.openedx.org/en/latest/educators/concepts/exercise_tools/about_lti_component.html) |
| **Poll** | Single question opinion poll; aggregate results shown after answering | Pick option, see distribution | Full |
| **Survey** | Multi-question matrix survey; aggregate results | Answer rows, submit | Full |
| **Word Cloud** | Free-text entries aggregated into a cloud graphic | Type words, see cloud | Provisional |
| **Peer Instruction** | Answer → see peer distribution → discuss → re-answer | Two-stage answer with reflection | Full |
| **Completion Tool** | Manual "mark complete" checkbox, ungraded | Toggle | Not supported tier |
| **Conditional Module** | Shows content based on prior responses | Passive | Provisional |
| **Oppia, Gene Explorer, Protex, Periodic Table, Recommender, Annotation, Calculator, Google Drive/Calendar, Iframe Tool, Zooming Image, Full Screen Image** | Niche embedded tools, mostly ungraded/unsupported tier | Varies | See Guide to Problem Types |

### 1d. Structural assessment features (subsection/course level)

- **Timed exams** — subsection-level special exam with countdown ([About Timed Exams](https://docs.openedx.org/en/latest/educators/concepts/advanced_features/about_timed_exams.html)).
- **Proctored exams** — timed exams monitored by proctoring software; verified-track only, includes onboarding/practice exams and review workflow ([About Proctored Exams](https://docs.openedx.org/en/latest/educators/concepts/proctored_exams/about_proctored_exams.html)).
- **Randomized Content Blocks (problem banks)** — a unit-level block that draws N random problems per learner from a (Legacy v1) Content Library, optionally filtered by problem type ([concept](https://docs.openedx.org/en/latest/educators/concepts/exercise_tools/randomized_content.html)).
- **Content Experiments (A/B split tests)** — group configurations randomly assign learners to groups; each group sees a different child content branch ([overview](https://docs.openedx.org/en/latest/educators/concepts/advanced_features/content_experiments_overview.html)).
- **Entrance exam** — auto-created special section that gates all course content until passed ([docs](https://docs.openedx.org/en/latest/educators/how-tos/set_up_course/require_entrance_exam.html)).

---

## 2. Per-Problem Configurable Behaviors (Settings Matrix)

Source: [Guide to Problem Settings](https://docs.openedx.org/en/latest/educators/references/course_development/problem_settings.html) unless noted.

### Attempts
- **Maximum Attempts**: integer; **empty = unlimited attempts**. A course-wide advanced setting supplies the default.
- **Time Between Attempts**: seconds a learner must wait between submissions (0 = immediate); learner sees a countdown message if they retry too soon.

### Show Answer (full enum — a frontend must handle all of these)
| Value | Answer becomes visible when… |
|---|---|
| `always` | Always (even before submitting) |
| `answered` | Learner has answered **correctly** |
| `attempted` | Learner has submitted ≥1 attempt (persists after reset) |
| `attempted_no_past_due` | Attempted OR due date passed |
| `after_attempts` | A configured minimum attempt count reached |
| `after_all_attempts` | All allowed attempts used (requires Max Attempts set) |
| `after_all_attempts_or_correct` | Attempts exhausted OR answered correctly |
| `closed` | Attempts exhausted OR past due date |
| `correct_or_past_due` | Answered correctly OR past due |
| `finished` | Attempts exhausted OR past due OR answered correctly |
| `past_due` | Due date has passed |
| `never` | Never (neither learners nor staff) |

- **Show Answer: Number of Attempts** — companion integer for `after_attempts`.
- Show Answer also reveals the `<solution>` **explanation** block.

### Reset
- **Show Reset Button** (per-problem, with course-wide default): clears unsubmitted input; if already submitted, clears the submission; re-randomizes variables when Randomization = On Reset.

### Randomization (per-student variable randomization — distinct from problem banks)
- Applies only to problems containing a Python script that generates random values. Enum: **Always** (new values per access), **On Reset** (new values when Reset clicked), **Never**, **Per Student** (one variant fixed per learner). Platform caps at **20 seeds** → max 20 variants per problem.
- Question-pool randomization is done via **Randomized Content Blocks** (section 1d), not this setting.

### Partial credit
Source: [Awarding Partial Credit](https://docs.openedx.org/en/latest/educators/references/course_development/awarding_partial_credit.html).
- Supported: **multiple choice** (`partial_credit="points"`), **multi-select** (`partial_credit="EDC"` every-decision-counts, or `"halves"`), **numerical input** (`partial_credit="close"` or `"list"`), **custom Python grader** (arbitrary fractional score / `'partial'` status).
- Multipart problems distribute the problem's points evenly across parts; multipart authoring is **OLX-only**, not Studio UI.
- Submission history records a distinct `partially-correct` status.

### Hints & feedback
Source: [Adding Feedback and Hints](https://docs.openedx.org/en/latest/educators/references/course_development/exercise_tools/adding_hints.html).
- **Demand hints** (`<demandhint>`): Hint button appears automatically; hints display sequentially with "Hint 1 of N" labeling and a Next Hint control; all simple problem types.
- **Answer-specific feedback**: per-choice feedback shown after submit for selected (and, for checkboxes, unselected) answers. **Group feedback** (combination of checkboxes) is multi-select only.
- **Correct/incorrect messages**: feedback strings for right/wrong outcomes.
- **Adaptive hints** per wrong answer via `<hintgroup>` (legacy, unsupported tier).
- **Tooltips** inside problem text.

### Weight & points
- **Problem Weight** overrides default points (default = 1 point per response field); score shown as "earned/possible". Only problems in graded subsections count toward the grade.

### Due dates, grace period, late submissions
- Due date + due time (UTC) set **per subsection**, alongside "Grade as" assignment type.
- **Grace Period on Deadline**: course-wide only (HH:MM); does **not** apply to timed exams, proctored exams, or ORA.
- **No built-in late-with-penalty** mechanism: after due + grace, problems are closed. Staff can extend due dates per-learner via instructor dashboard, and grant exam allowances.

### Graded vs practice + assignment types
- A subsection's **"Grade as"** selects an assignment type or "Not Graded". All problems in the subsection are graded/weighted as that single type.
- **Grading policy** ([Gradebook Assignment Types](https://docs.openedx.org/en/latest/educators/references/grading/gradebook_assignment_types.html)): each assignment type has Name, Abbreviation, **Weight** (% of final grade; sum to 100%), **Total Number** of subsections, **Droppable count** (drop the lowest-scored N). Defaults: Homework, Lab, Midterm Exam, Final Exam. All assignments of one type count equally within the type.

### Results visibility (subsection "Hide/Show results")
Four enum options:
1. **Always show assessment results** (default — immediate correctness feedback)
2. **Never show assessment results** (scores hidden and excluded from final grade)
3. **Show results when subsection is past due**
4. **Never show individual results, show overall results after due date**
Set at subsection level only; overrides individual problems. Separate **"Hide content after due date"** removes content post-deadline (grade stays on Progress).

### Timed exam settings
- Subsection Advanced tab: special exam = Timed; **Time Allotted** in HH:MM.
- **Allowances** (Instructor dashboard → Special Exams): per-learner **Additional Time (minutes)** or **Time Multiplier**; granted before start.
- On expiry: exam auto-submits; unsubmitted problems score 0; content inaccessible. No pause/reset once started.

### Proctored exam settings
- Timed exam + proctoring provider (pluggable via edx-proctoring/edx-exams). Verified track only; optional **opt-out**; practice/onboarding exams; review pipeline: automated review → escalation → course team.

### Prerequisites / gating
- **Subsection prerequisites**: `Enable Subsection Prerequisites: true`; a subsection can require a **minimum score %** (and/or completion) in a prerequisite subsection; locked subsections show a lock icon.
- **Entrance exam**: course-level toggle.
- **Prerequisite courses** at catalog level.

### Cohorts / access restrictions
- Units and components can be restricted by **Content Group (cohorts)** or **Enrollment Track**; components inherit unit restrictions. Also: release dates, "hide from learners", staff-only. ORA doesn't respect cohorts natively.

---

## 3. Scoring & Progress Model

Roll-up chain:
1. **Problem**: raw earned/possible per response field × problem weight. Only problems in graded subsections count.
2. **Unit (vertical)**: no scoring role — purely structural.
3. **Subsection (sequential)**: sum earned / sum possible across problems = subsection percentage. The subsection is the "assignment".
4. **Assignment type**: average of its subsections' percentages, after dropping the N lowest. Fewer-than-Total-Number assignments count missing ones as 0.
5. **Final grade**: Σ (assignment-type average × type weight); weights sum to 100%.
6. **Grade range / passing threshold**: Grading page — pass/fail or letter cutoffs ([Set the Grade Range](https://docs.openedx.org/en/latest/educators/how-tos/grading/set_grade_range.html)).
7. **Certificate**: earned when grade exceeds passing cutoff; availability/timing configurable.

**Progress page**: bar chart of scores per assignment grouped by type, average bars per type, passing-threshold marker, dropped assignments marked with "x", plus detail list per subsection distinguishing **Problem Scores** (graded) vs **Practice Scores** (ungraded). **Completion**: green checkmarks on outline/nav when all content complete (videos fully watched, all problems submitted, HTML viewed ≥5s) — tracked separately from grading (Completion API).

---

## 4. Learner-Facing UX States a Frontend Must Render

From [The Learner View of a Problem](https://docs.openedx.org/en/latest/educators/references/course_development/learner_problem_view.html) plus learner-guide pages.

### CAPA problem states
- **Unanswered / open**: prompt, response fields, point value, Submit (enabled once input given), optional Save, optional Hint button, optional Show Answer, optional Reset; due date at subsection level.
- **Saved (answered-unsubmitted)**: Save stores input without grading ("draft" banner).
- **Submitted — correct / incorrect / partially correct**: green checkmark, red X (partial credit uses distinct status); score "X/Y points"; per-choice feedback text; correct/incorrect message.
- **Attempts counter**: "You have used N of M attempts"; Submit disabled when exhausted. Unlimited = no counter cap.
- **Time-between-attempts countdown** message when retrying too fast.
- **Hint sequence**: Hint button → "Hint 1 of N" → Next Hint → exhausted.
- **Show Answer state**: correct answers marked + `<solution>` explanation revealed; governed by 12-value enum.
- **Reset state**: input cleared; submission cleared; variables re-randomized if On Reset.
- **Closed / past-due**: no Submit/Reset; question (and answer, per showanswer) may remain viewable; or content hidden entirely.
- **Results-hidden states**: submitted but correctness masked (per subsection visibility setting).
- **MathJax rendering** in prompts, inputs (live preview for numerical/math expression), and answers.

### Timed exam states
1. **Instructions/entry screen**: clock icon, "Timed Exam", stated time limit, "I am ready to start this timed exam" button.
2. **In progress**: persistent countdown banner; darkens at 80% elapsed, bold at 95%; eye icon toggles timer visibility; per-unit Submit still required.
3. **Ending**: "End My Exam" button, confirmation.
4. **Expired**: auto-submit at 0:00; unsubmitted work = 0; content locked.
5. **Submitted** confirmation. No pause/reset.

### Proctored exam states
Entry choice (proctored vs opt-out) → software install/ID + environment verification → in-progress (timed states + monitoring) → submitted → review pipeline: **pending review / verified (Satisfactory) / rejected (Suspicious)**. Plus onboarding/practice-exam variants and error states (connectivity below ~500 kbps triggers auto-submit).

### ORA states
Sequential, collapsible step UI: **Your Response** (draft-save; ~10,000-word limit; file upload, 500 MB cumulative cap, required file descriptions) → **Learn to Assess** (score samples until matching instructor) → **Assess Peers** ("1 of N" counter; per-criterion options + comments (300 chars) + overall comment; "no peer responses available" empty state; optional "Continue Assessing Peers") → **Self Assessment** → **Waiting**: "Your Grade: Waiting for Peer Assessment" → **Staff Grade** (finalizes regardless of peer count; overrides peer scores) → **Your Grade**: total + per-criterion median breakdown + peer comments → **Top Responses** and optional feedback-on-feedback. Edge states: **response cancelled by staff**, deadlines per step, flexible peer grading (requirement drops to 30%, min 1, after 7 days).

### Other component states
- **Poll/Survey**: unanswered → answered + aggregate results view.
- **Drag and drop**: in-progress placement, per-item popup feedback, final feedback, correct/incorrect zone states.
- **Randomized content block**: renders the learner's drawn problems as normal problems (draw stable per learner).
- **Prerequisite-locked subsection**: lock icon + "complete prerequisite X with score ≥Y%" messaging.
- **LTI**: launch states (inline iframe / modal / new-window link), grade-return display.

---

## 5. Integration Notes for a Custom Frontend

### How the stock frontend (frontend-app-learning) renders assessments
- [frontend-app-learning](https://github.com/openedx/frontend-app-learning) (React + Paragon) renders the course shell — outline, sequence nav, progress, dates — natively, but renders each **unit's content in an iframe** pointed at the LMS's chromeless XBlock view: iframe src hits `render_xblock` (`/xblock/{usage_key}`) — chromeless HTML excluding courseware chrome. Unit ⇄ MFE communication (resizing, navigation events) via postMessage.
- Inside that iframe, CAPA problems are legacy server-rendered HTML + jQuery. Interactions POST to **XBlock handler endpoints**: `/courses/{course_key}/xblock/{usage_id}/handler/xmodule_handler/{problem_check|problem_save|problem_show|problem_reset|hint_button}` — HTML fragments/JSON consumed by legacy JS, not a stable public JSON contract.
- Community debating alternatives ([XBlock Rendering Summit](https://openedx.atlassian.net/wiki/spaces/FEDX/pages/4366663684), [React support issue](https://github.com/openedx/XBlock/issues/635)): per-block "frontend-renderable" XBlocks with data endpoints, single-iframe-per-unit. Nothing shipped as stable replacement yet.

### REST APIs available to a custom frontend
- **Course Blocks API** (`/api/courses/v1/blocks/?course_id=…`): course structure with per-block type, display_name, children, completion, student_view_data for some block types.
- **Courseware/Course Home APIs**: `/api/courseware/course/{id}`, `/api/courseware/sequence/{usage_key}` (sequence metadata incl. gating/exam info), `/api/course_home/v1/outline|progress|dates/{id}`.
- **Learning Sequences** app — newer source of truth for outline/navigation.
- **Grades API** (`/api/grades/v1/…`); **Completion API**; **edx-proctoring / edx-exams APIs** for special-exam state (exam timer/instructions UI in the MFE is driven by these, not the iframe); enrollment, certificates APIs. Full inventory: [LMS APIs reference](https://docs.openedx.org/projects/edx-platform/en/open-release-sumac.master/references/lms_apis.html).
- **Mobile apps precedent**: even native Open edX mobile apps render CAPA/ORA in webviews — **no complete JSON API for problem rendering/submission exists**.

### Implications for a custom-designed quiz UI (key architectural decision)
1. **CSS theming inside the iframe (lowest risk)**: keep `render_xblock` iframes; restyle via comprehensive theming. Keeps every behavior for free (attempts, showanswer enums, randomization, partial credit, timed-exam integration, ORA flow), but constrained by legacy DOM/markup and iframe seams (scroll, focus, modal, fonts).
2. **Re-implement problem UI via API (highest fidelity, highest cost)**: own React quiz components talking directly to XBlock handler endpoints (`problem_check` etc.). Endpoints are internal-ish (form-encoded answers keyed by `input_{usage_id}_2_1`, HTML-fragment responses) — must parse/replicate CAPA semantics, and lose automatic support for arbitrary XBlocks (JSInput, drag-and-drop, LTI, ORA) which still need iframes. Practical middle path used by vendors: re-implement 5 core CAPA types + polls natively, iframe everything else.
3. **Hybrid / emerging direction**: render natively where a block exposes clean data (ORA has dedicated MFEs: frontend-app-ora and frontend-app-ora-grading; special exams have edx-exams APIs), iframe the rest via `render_xblock`.
4. **Whatever the choice**, shell-level assessment UX (timer banner, exam entry/submitted/expired screens, attempts messaging, progress page, prerequisite locks, hidden-content states) is driven by REST APIs and **must be built in your frontend regardless** — it lives outside the XBlock fragment.

---

**Precision points**: unlimited attempts = empty Max Attempts; 20-seed randomization cap; grace period is course-wide and excludes special exams/ORA; results visibility is subsection-level only; partial-credit multipart is OLX-only; one-ORA-per-unit constraint; flexible peer grading (30% after 7 days, min 1); drop-lowest is per assignment type with equal weighting within a type.
