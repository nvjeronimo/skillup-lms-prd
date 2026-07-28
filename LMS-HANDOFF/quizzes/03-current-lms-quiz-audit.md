# Audit — Quizzes on the Current LMS (apps.skillup.online)

Hands-on authenticated audit performed on Jul 17, 2026, in the course **Foundations of AI in Healthcare** (`course-v1:SkillUp+SKOAIH01+2025_V1`). Complements [edx-parity-audit.md](../edx-parity-audit.md) with the assessments dimension.

---

## 1. Observed architecture (critical for devs)

- The course shell runs on the **Learning MFE** (`apps.skillup.online/learning/...`) with a custom SkillUp skin: **accordion** outline (Section → Unit rows with green check/circle), topbar with Course / Progress / Dates / Mentorship Q&A tabs.
- Each unit's content renders in an **iframe** pointing at `courses.skillup.online/xblock/{vertical_usage_key}?...&view=student_view` — the standard Open edX **`render_xblock`** endpoint. Observed params: `exam_access=`, `format=Graded Quiz|Final Exam` (the assignment type is passed to the render), `recheck_access=1`, `show_bookmark=0`, `show_title=0`.
- Inside the iframe, problems are the legacy CAPA HTML/jQuery (`.problems-wrapper` markup), with all edX behaviours intact.
- Consequence: **any quiz UI redesign is either CSS theming inside the iframe, or a native re-implementation talking to the XBlock handlers** (see [01-edx-quiz-capabilities.md](01-edx-quiz-capabilities.md) section 5).

## 2. Assessment type inventory in the course

| Item | Technology | Graded | Observed config |
|---|---|---|---|
| Module N Practice Quiz (Mod. 1–3) | CAPA multiple choice (9 questions in Mod. 1) | No ("ungraded") | Unlimited attempts, instant feedback, Show answer |
| Module N Graded Quiz (Mod. 1–3, 7 questions) | CAPA multiple choice | Yes — assignment type "Graded Quiz" | **2 attempts per question**, **Save** button, instant feedback |
| Final Exam (10 questions) | CAPA multiple choice | Yes — assignment type "Final Exam" | 2 attempts per question, Save, **no timer** (not a special exam) |
| Activities ("Connect the Pieces", etc.) | **SCORM XBlock** (`type@scorm`, served via `handler/assets_proxy/index_lms.html` — openedx-scorm-xblock pattern; Articulate-style content) | Not observed | Interactive, runs in its own iframe. Note: returned HTTP 500 on test day |
| Labs | HTML block with **.ipynb download** + PDF instructions | No | Runs offline in local Jupyter; no platform grading |
| Peer-Review: Final Project | **ORA2** (Open Response Assessment) | Doesn't count toward the grade (see Grading Scheme) | File upload (.pdf/.gif/.jpg/.jpeg/.jfif/.pjpeg/.pjp/.png), 1 required review, 20-point rubric across 4 tasks |

## 3. Grading policy ("Grading Scheme" page + Progress)

- 3 Graded Quizzes with **equal weight, 60% total** of the final grade; Final Exam **40%**; Final Project **not graded**.
- Minimum passing mark: **70%**.
- No time limit on quizzes ("Review Questions have no time limit").
- No penalty for wrong attempts.
- **"Submit is FINAL"** — communicated to the learner: after submitting a question you cannot resubmit (within that attempt).
- Course end date: Dec 31, 2030 (no per-subsection due dates).

## 4. Observed CAPA quiz anatomy (real states)

### Structure
- Quiz title (H2) → sequence of questions on the same page (long scroll), **each question is an independent CAPA problem with its own Submit button** — there is no "submit whole quiz".
- Per-question header: "Question N" + "1 point possible (ungraded|graded)".
- Per-problem accessibility note: "Some problems have options such as save, reset, hints, or show answer. These options follow the Submit button."

### Captured states
| State | Observed UI |
|---|---|
| Unanswered | Empty radios, sr-only status "unanswered", Submit **disabled** (grey) |
| Selected (pre-submit) | Option with blue border + filled radio; Submit enabled (blue) |
| Correct | **Green** border on the option, green ✔, "**Answer** — Correct: {explanation}" block, "**Show answer**" link, bottom strip "✔ Correct (1/1 point)" |
| Incorrect | Wrong marker, "**Answer** — Incorrect: {feedback specific to the chosen option}" block, "Incorrect (0/1 point)" strip + "**Review**" link; Submit stays available (retry) |
| Graded pre-submit | Same + "**Save**" link ("Save your answer") + "**You have used 0 of 2 attempts**" counter next to Submit |

### Behaviours
- **Answer-choice shuffling** is on (`choice_0..3` values out of order in the DOM).
- **Instant** feedback after each Submit (Always show assessment results).
- **Per-chosen-option feedback** (answer-specific feedback) authored on every question.
- Practice: unlimited attempts (no counter). Graded: max 2 attempts per question.
- No authored hints (`<demandhint>`) in this course; no partial credit; no checkboxes/dropdown/numerical/text — single-select only.

## 5. ORA (Peer-Review: Final Project) — observed flow

Steps presented as sequential collapsible panels:
1. **Your Response** — status "IN PROGRESS", visible due date ("due Jan 1, 2029 … in 2 years, 5 months"), autosave ("Your work will save automatically"), warning "After you submit your response, you cannot edit it", structured prompt + **File Uploads (Required)** with supported-type list, "Submit your response and move to the next step" button. Sub-status "STATUS OF YOUR RESPONSE: RESPONSE NOT STARTED."
2. **Assess Peers** — status "NOT AVAILABLE" until your own submission.
3. **Your Grade: Not Started**.
- Rubric: 20 points max, distributed across 4 tasks (3/6/5/6). Required reviews: 1.

## 6. Observed Progress page

- **Course completion**: "11% completed" donut + accessibility sentences.
- **Grades**: bar chart "Your current grade" vs "Passing grade 70%" marker.
- **Grade summary**: table Assignment type / Weight / Grade / Weighted grade (Graded Quiz 60%, Final Exam 40%).
- **Detailed grades** per module: "Module 1 Graded Quiz … 0/7", "Final Exam 0/10". Practice quizzes **don't appear** ("For progress on ungraded aspects of the course, view your Course Outline").
- **Certificate status**: "In order to qualify for a certificate, you must have a passing grade."

## 7. UX gaps in the current LMS (opportunities for the ICP)

1. **No quiz entry screen** — the learner lands straight on the first question; no question count, attempts, grade weight or passing threshold before starting (Coursera does this well).
2. **Per-question Submit** is confusing ("Submit is final" per question) — no global review, no whole-quiz confirmation, no score summary at the end.
3. **No in-quiz progress indicator** (question 3 of 7, answered vs unanswered).
4. **No retry framing** — failing doesn't suggest re-study or link to the relevant lesson (the "Review" link exists but is subtle).
5. **Visual states inherited from the legacy UI** (typography/spacing inconsistent with the SkillUp design system).
6. The outline accordion hides quiz context; titles truncate; the "Graded Quiz" label renders as loose text.
7. SCORM Activities depend on a secondary server and fail with a 500 and no friendly error message.
