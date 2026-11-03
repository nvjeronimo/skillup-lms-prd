---
id: 040
title: Mentorship Q&A keeps "Post anonymously", as Open edX shows it when the course allows it
date: 2026-11-03
status: accepted
audience: [designer, dev]
track: LMS
phase: 1
---
**Decision** — The Mentorship Q&A reply composer keeps the *Post anonymously* checkbox. It is the platform's
own behaviour: Open edX shows it whenever the course has `allow_anonymous: true`, which is how the SkillUp courses
are configured. No course setting is changed and nothing is built or removed.

**Why**
- Nelson, 3 Nov 2026, asked why the checkbox was still on the screen. It had been put there on 21 Aug 2026 so it
  could be argued with (CHANGELOG, "Every learner capability on the Q&A tab"), and nobody had decided since.
- Since 28 Oct 2026 Mentorship Q&A is a public Question post in the course forum, not a private 1-to-1
  ([edx-mentorship-qa.md](../LMS-HANDOFF/edx-mentorship-qa.md)), so hiding one's name from the other learners
  makes sense. Staff, the mentor included, always see who wrote what, so the mentor still knows who is asking.
- Of the two options offered (A: switch `allow_anonymous` and `allow_anonymous_to_peers` off in Studio and drop
  the checkbox; B: keep it), he chose B: it is the platform's normal behaviour ("vamos B").

**Source** — Nelson in the prototype review session, 3 Nov 2026.

**edX basis** — `GET /api/discussion/v1/courses/{course_id}` on the dev instance returns `allow_anonymous: true`
and `allow_anonymous_to_peers: false` (verified 21 Aug 2026, course-details-metadata-map §14). With those values
the composer offers *Post anonymously* (hidden from everyone but staff) and not the "to peers" variant.

**Design** — Unchanged: the checkbox under the reply field in the prototype (`QaTab`) and in the ICP Mentorship Q&A
screens (03 · Course Detail, Row 4). If a course turns `allow_anonymous` off, the checkbox is not shown.

**Dev impact** — Render the checkbox from the course's `allow_anonymous` (and the peers variant from
`allow_anonymous_to_peers`), as the Discussions MFE does; send `anonymous` / `anonymous_to_peers` with the post.

**Alternatives rejected** — A, switch anonymity off for the courses (a Studio setting, no development): a strange
fit for a conversation with the mentor was the argument for it, but the mentor sees the name anyway and the other
learners are the only ones it hides from.
