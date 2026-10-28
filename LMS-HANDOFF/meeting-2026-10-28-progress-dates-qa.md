# Meeting 28 Oct 2026 · Course page: Progress, Dates and Mentorship Q&A

ICP review call (about 43 min). Kirti Mishra (BA, lead), Navdeep Malhotra, Simran Jindal (content / course
operations), Shivam Tripathi (technical), Nelson Jerónimo (design). Notes written from the recording; the recording
and the transcript are not kept in this public repo.

It adds what the SkillUp team actually configures to the Open edX research of the same day:
[`edx-notifications.md`](edx-notifications.md), [`edx-dates-tab.md`](edx-dates-tab.md),
[`edx-mentorship-qa.md`](edx-mentorship-qa.md), and decision 035 (everything Open edX-based).

## Outcomes

| Tab | Outcome | Who |
|---|---|---|
| **Progress** | **Approved to go ahead.** Kirti raises the ticket. | Kirti |
| **Dates** | **Not worked on for now. Hide it for self-paced courses.** For instructor-led courses, the live sessions are covered by the Calendar (being built); whether the Dates tab repeats them is decided later. | Navdeep, Kirti |
| **Mentorship Q&A** | **On hold** until the mentorship strategy is defined (real mentor or AI mentor, cohort vs self-paced, Open edX discussions or something else). A separate ~30 min session, Kirti to set it up. | Navdeep, Kirti |
| **Notifications** | Open question: what already exists on our install and what would have to be built. | Navdeep |

## Progress tab: how SkillUp courses work

- **Course completion counts everything** in the course: readings, videos, quizzes, exams, projects and labs (a lab
  counts once its page is opened; our lab design asks the learner to mark it complete).
- **Grades come from two sources.** Quizzes are graded automatically. Projects use **ORA** (open response
  assessment): the learner submits in the platform, a mentor or SME grades it **step by step on a rubric** (scores
  per criterion), and the score then appears on the Progress tab.
- **Staff grading only.** SkillUp usually **disables peer and self assessment** in ORA: the learner submits and waits
  for the grade.
- **Assignment types are set per course** in the grading policy, and that name is what the Progress tab shows. In
  Microsoft courses graded quizzes are called **"Knowledge checks"**. SkillUp uses quizzes, assignments, projects and
  labs; there is **no "Homework"** (it was sample data in our screens).
- **Pass or fail** depends on the total weighted percentage (decision 034).

## Dates tab: what SkillUp configures

- **Only the course start and end dates are configured**, from a course release template the content team fills in
  and the development team applies. **No module, quiz or project due dates have ever been set.**
- On a self-paced course the start shows the publication date and the end the expiry date (e.g. 2050). Navdeep and
  Kirti: the expiry date has no value for the learner; a self-paced course has no important dates.
- When a date changes in Studio, the new date simply shows; the platform keeps no history of the change.
- Instructor-led courses: the live-session dates come from the project manager and are emailed to learners today.
  The mobile app (November) and the Calendar show live sessions.

Consequence for our screens: with no due dates configured, the Dates tab, the "Shift due dates" alert (which needs a
missed suggested due date) and the deadline lists of the Calendar and the Dashboard would be empty on today's
courses.

## Mentorship Q&A: what SkillUp has

- The course **Discussion** tab is used as Open edX ships it; the team only enables or disables it per course.
- Kirti recently renamed it **Mentorship Q&A** and removed "Following": learners never used it to talk to each
  other, only to ask mentors (certificates, problems).
- Kirti: a learner is notified on the dashboard when a mentor replies.
- Navdeep: before building anything, define the mentorship proposition for the whole platform.

## Notifications: what SkillUp has

- Simran: nothing is sent to learners about their course today.
- Kirti: mentor replies in Q&A raise a notification on the dashboard.
- For the LinkedIn Learning courses (about 20) a custom set-up notified mentors of submissions, learners of grades,
  and emailed pass or fail.
- To check (dev): which Open edX release our install runs and whether the Notifications feature is on
  (`edx-notifications.md`: in the Teak learner guide, official in Ulmo, on by default from Verawood).

## Open items

1. Dates tab: hide for self-paced courses (decision 036); decide later for instructor-led courses vs the Calendar.
2. Mentorship strategy session (Kirti), then Q&A design.
3. Notifications: release and feature flag on our install (dev).
4. Assignment-type names in samples: use SkillUp's (Graded quiz, Assignment, Project, Lab, or the course's own such
   as "Knowledge check"), never "Homework".
