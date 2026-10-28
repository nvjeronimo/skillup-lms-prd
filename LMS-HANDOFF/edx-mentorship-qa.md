# Mentorship Q&A in Open edX: what the platform allows (and the 1-to-1 question)

28 Oct 2026, Nelson: Mentorship Q&A should be **1-to-1** (learner ↔ mentor), not group messages. Checked against
the Open edX docs (discussions for learners and educators, divided discussions, LTI discussion providers, the
instructor-learner communication overview). Sources at the end. It completes `course-details-metadata-map.md`
§14.3, which mapped the Q&A screens onto the course forum.

**In one line:** Open edX has **no private 1-to-1 messaging**. Everything in Discussions is visible to the whole
course, or to the learner's cohort. A real 1-to-1 Q&A needs another tool or a custom build.

## What the built-in Discussions give us

- **Structure:** topics (course-wide, or attached to a unit) › posts › responses › comments.
- **Post type "Question":** made for "the course team should answer this". A moderator can mark a response as
  the answer, and the question then shows **Answered**. This is the closest thing to Q&A.
- **Roles:** answers from the course team show a **Staff** or **TA** label. Staff can pin, endorse, close and
  report.
- **Following, likes, unread state, filters** (All posts, My posts, Topics; unanswered and following).
- **Anonymous posting** (if the course allows it): anonymous to everyone, or anonymous to peers only, with staff
  still seeing the name. Staff can always see who wrote what, so this is not privacy from the mentor.
- **Divided discussions:** posts are seen only inside the learner's **cohort**. Staff see every cohort. This has
  to be set before the course starts.
- **Notifications:** replies to my posts and new instructor posts reach the bell and the email digest
  ([edx-notifications.md](edx-notifications.md)).

## What it does not give

- **No private / direct messages** between a learner and a mentor, or between learners. The docs describe no such
  feature, and the instructor-to-learner tools (bulk email, course updates, highlight emails) all go to groups.
- **No "visible only to me and staff" post** in the built-in forum.
- **Bulk email can't target one learner**: only groups (staff, tracks, cohorts, everyone).

## Ways to get 1-to-1

| Option | How | Cost / risk |
|---|---|---|
| A. One cohort per learner | divided discussions with every learner alone in a cohort | a hack: unworkable at scale, fixed before the course starts, breaks real cohorts |
| B. A third-party discussion tool (LTI) | Ed Discussion, InScribe, Piazza or Yellowdig replace the course forum. Some of them offer private posts to instructors (to confirm with each vendor) | a paid subscription; only a global admin can switch it; the UI is the vendor's, not ours |
| C. Custom build | our own 1-to-1 thread service (or a plugin) linked to the course and the mentor | the most control, the most work: data model, moderation, notifications, mobile |
| D. Keep it public | Q&A as Question posts in the course forum, answered by mentors | no build, but not 1-to-1 |

Our current Q&A screens (WIP, Row 4, not approved) draw a list of threads and a conversation. With D they map onto
the forum almost one to one (§14.3). With 1-to-1 they need B or C. **Decision for product and BA**, with dev
sizing B and C.

## Decision (28 Oct 2026, decision 035)

Nelson: option **D** for now: Q&A is question posts in the course discussions, public to the course. 1-to-1 stays a
candidate for research and stakeholder approval (B or C). Prototype PR 410; ICP Q&A, Ask-a-question modal, Services
("Ask your mentor").

## Sources

- Anatomy of course discussions (learners, Teak):
  https://docs.openedx.org/en/release-teak/learners/sfd_discussions/anatomy.html
- About course discussions (educators): https://docs.openedx.org/en/ulmo/educators/concepts/communication/about_course_discussions.html
- About divided discussions: https://docs.openedx.org/en/ulmo/educators/concepts/communication/about_divided_discussions.html
- Configure an LTI discussion provider:
  https://docs.openedx.org/en/latest/educators/how-tos/course_development/configure_lti_discussion_provider.html
- Instructor-learner communication, current state and gaps (Open edX wiki):
  https://openedx.atlassian.net/wiki/spaces/OEPM/pages/3903160541
