# The Dates tab ("Important dates") in Open edX: logic and what it can show

28 Oct 2026, Nelson's question. Read from the platform code (edx-platform `date_summary.py`, the Dates tab API, and
frontend-app-learning `dates-tab/`), plus the docs. Sources at the end. Sent to the team on Teams the same day.
It completes `course-details-metadata-map.md` §14.2 and §14.2b and corrects two points there (see the end).

## How it works

- **One API:** `GET /api/course_home/v1/dates/{course_key}` returns `course_date_blocks[]` plus `has_ended`,
  `learner_is_full_access`, `user_timezone` and `dates_banner_info` (`missed_deadlines`, `missed_gated_content`,
  `content_type_gating_enabled`, `verified_upgrade_link`).
- **Timeline:** the frontend groups the blocks by day, in the order the API sends them. It always adds a
  **Today** marker, even when nothing falls on today.
- **Time zone:** the learner's account time zone if they set one, otherwise UTC. Assignments read
  "due 11:59 PM GMT+1".

## The eight date types (all that exist)

| `date_type` | Platform title | Shown when |
|---|---|---|
| `course-start-date` | "Course starts" ("Enrollment Date" in self-paced courses when the learner enrolled after the start) | always |
| `course-end-date` | "Course ends", with an archiving sentence; after the end "This course is archived…" | always (self-paced with relative dates: only within 365 days) |
| `assignment-due-date` | "{assignment type}: {subsection}", linked to the assignment | each graded subsection with a due date |
| `certificate-available-date` | "Certificate Available" | the course has a web certificate and a non-audit mode |
| `verified-upgrade-deadline` | "Upgrade to Verified Certificate" / "Verification Upgrade Deadline" | a verified track is on sale |
| `verification-deadline-date` | "Verification Deadline" / "Missed Verification Deadline" | verified learner who still has to verify |
| `course-expired-date` | "Audit Access Expires" | audit learner, relative dates on |
| `todays-date` | the Today marker | always |

Live sessions, webinars, office hours, program milestones or our own events are **not** date types.

Each block carries `title`, `date`, `date_type`, `description`, `link`, `learner_has_access` and, for assignments
only, `complete`. **Assignments come with an empty `description`.**

## The six badges (the only states Open edX knows)

In order of priority (the first one also colours the dot of the day):

| Badge | When |
|---|---|
| **Today** | the current day |
| **Completed** | the assignment is complete |
| **Past due** | the date has passed and the assignment is not complete (neutral grey, not red) |
| **Due next** | only ONE item: the next incomplete assignment from today on |
| **Not yet released** | the assignment has no link yet (its content isn't released) |
| **Verified only** 🔒 | the learner has no access to the item (audit, gated content) |

When every item of a day shares a badge, the day gets it once instead of each item.

## The alerts above the timeline

Only in **self-paced** courses that have at least one due date:

- **Suggested schedule:** in self-paced courses the due dates are suggestions, set per learner from the enrolment
  date (Personalized Learner Schedule). Work can be submitted until the course end date.
- **"Shift due dates":** only after the learner has **missed** a suggested deadline, and while the course hasn't
  ended. One click restarts the schedule from today. It can't be done in advance, it never deletes progress, and
  the alert is not dismissible. Prototype: `lib/platform/shift-dates.ts` (20 Oct 2026, exactly as Open edX does it).
- **"Upgrade to shift due dates":** the same case for an audit learner who missed gated content.

Instructor-paced courses have no suggested schedule and no shift. The dates are fixed in Studio.

## Our Dates screens compared with Open edX

The Dates rows were taken out of Ready for Dev on 27 Oct (not approved) and sit on the WIP page.

| Our screens | Open edX | |
|---|---|---|
| "Overdue" badge in red | "Past due", neutral | red = a custom rule |
| "Upcoming" on every future date | only one "Due next" | |
| "Locked" + "Unlocks when Module 3 is complete" | no prerequisite state; "Not yet released" or "Verified only" | not available |
| Row descriptions ("Submitted 2 days early", "Best attempt wins") | empty for assignments | custom data, or remove |
| Assignment-type badge (Homework, Final exam) | the type prefixes the title | ✅ the data exists |
| "Complete" | "Completed" | copy |
| Upgrade deadline, verification, audit expiry | only with verified / audit tracks | never shown if SkillUp doesn't sell them |

There are no notifications or emails for deadlines ([edx-notifications.md](edx-notifications.md)): the Dates tab
is the only place a learner sees them.

## Corrections to §14.2b (course-details-metadata-map.md)

1. **The "Locked" row:** §14.2b maps `learner_has_access` to a Locked state. In Open edX that flag means *no
   access* (audit, gated content: "Verified only"), not "unlocks when the previous module is complete".
2. **The missed-deadline alert:** §14.2b drew it as dismissible. In Open edX it is not dismissible (the prototype
   already follows Open edX).

## Sources

- Dates tab API: https://docs.openedx.org/projects/edx-platform/en/ulmo/references/docstrings/lms/lms.djangoapps.course_home_api.dates.html
- Date types and texts: https://github.com/openedx/edx-platform/blob/master/lms/djangoapps/courseware/date_summary.py
- Badges and timeline: https://github.com/openedx/frontend-app-learning/tree/master/src/course-home/dates-tab
  (`timeline/badgelist.jsx`, `timeline/Timeline.jsx`, `DatesTab.jsx`)
- Course pacing / Personalized Learner Schedule:
  https://docs.openedx.org/en/ulmo/educators/how-tos/course_development/set_course_pacing.html
- Shift due dates (edX support): https://support.edx.org/hc/en-us/articles/15635475725591
