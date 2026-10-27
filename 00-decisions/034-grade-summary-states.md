---
id: 034
title: The Grade summary has five states; amber below the pass mark, red only once the course has ended
date: 2026-10-27
status: accepted
audience: [designer, dev, stakeholder]
track: LMS
phase: 1
---
**Decision** — On the Course Detail Progress tab, the Grade summary shows one of five states, derived from the
Grades API and the course dates:

| State | When | Percentage | Sentence |
|---|---|---|---|
| Not started | nothing graded yet | neutral | "Your grade counts from your first graded activity. You need 70% to pass." |
| Below pass | below the pass mark, work still to do | neutral, warning icon at the mark | "You need 70% to pass. 55% to go." |
| Passing | `percent ≥` the pass mark | green, check icon | "You're currently passing this course." |
| Submitted below pass | every graded activity submitted, still below | **amber** (`text/warning`) | "All graded activities are submitted. Your grade is below the 70% pass mark." |
| Course ended | the course end date has passed and `is_passing` is false | **red** (`text/error`), cross icon | "This course has ended. Your final grade is below the 70% pass mark." |

The current grade shows as a tooltip under the bar **on hover only** (the header already says it). Weights show in
every state, even at 0% (they are course settings). Weighted = weight × grade, and the column adds up to the
percentage. Item scores are neutral; an item not submitted reads "Not started". The table's assignment types match
the items below it (Final Quiz, Final project).

The Course completion card shows a count line ("16 of 42 topics complete."), a Gray badge "N locked topics" only when
there is locked content (left out of the percentage: "16 of 39 available topics complete."), and Badge Success
"Completed" beside the title at 100%.

**Why**
- Nelson, 27 Oct 2026, reviewing his "Your grade status" frames: a separate "Completed not passed" screen was probably
  not needed; the tooltip should appear on hover; state 2 stays neutral; "Final project" names the 70% type; the
  "all submitted, below pass" case turns amber and a final red state is added.
- **Open edX has no failed state** (frontend-app-learning, progress tab, every release): below the pass mark the bar
  uses an accent colour and the message sits on amber with a warning icon (*"A weighted grade of 70% is required to
  pass in this course"*); at or above it, on green, *"You're currently passing this course"*. The grade can still
  change (staff grading, regrades, attempts left), so red is kept for the one moment it is final: the course ended.
- Completion (Completion API) and grade (Grades API) are separate: 100% of topics complete does not prove every graded
  activity was submitted. "Submitted below pass" needs the product to know all graded items are in.
- The 29 Jul 2026 workshop asked for fewer reds (Harpreet); Navdeep hesitated between red and amber. This settles it.

**Pending grades** — Scores waiting for peer or staff grading (ORA) count as 0 in Sumac and Teak, with no notice.
Ulmo and later add an amber notice under the grade, *"Some assignment scores are not yet included in your total grade.
These grades will be released by {date}."*, and show "50% + Hidden Scores" (or a lock) in the table. Add that row
when the platform runs Ulmo or later; not designed until then.

**Design** — DS `LMS/ICP/Assessment/Grade-Summary` 1.2 (Result = Not started · Below pass · Passing · Submitted below
pass · Course ended; the Progress bar is exposed for the fill and the hover tooltip) and
`LMS/Platform/Course-Detail/Completion-Card` 1.3 (now a variant set, State = Not started · In progress · Completed;
"Show locked"). ICP: the Course Detail Progress screens and an edge-case showcase beside them, plus the proposal
frame with the Open edX notes (Platform Pages – Ready for Dev).

**Dev impact** — Prototype PR 397: `gradeState()` derives the state from `percent`, the pass mark,
`allSubmitted` and `courseEnded`; completion data is `complete / incomplete / locked` with the percentage derived.
Storybook: *Platform/Course Detail/Grade Summary*.

**Alternatives rejected** — A separate "Completed not passed" screen (only the sentence differs); red for any grade
below the pass mark (Open edX never does, and it reads as final while the grade can still change).
