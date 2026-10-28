# How Open edX notifies a learner

28 Oct 2026, Nelson's question: what does Open edX use to notify a learner about course dates, grading and the
rest? Checked against the Open edX docs (Teak learner guide, Ulmo release notes, operator how-to, automatic email
guide, weekly learning goals). Sources at the end. Sent to the team on Teams the same day.

**In one line:** four separate mechanisms. None of them notifies about deadlines or quiz grades.

## 1. Notifications (the bell + email digests)

The platform's notification system, and the one our Notifications panel maps onto.

- **Channels:** the notification tray (bell in the header, unread count) and email. For each type, the learner
  picks tray, email or both (Account Settings › Notifications, or the gear in the tray, or the link in an email).
- **Email cadence:** daily or weekly digest. Ulmo adds *Immediately*. In Teak the daily digest goes at 10 PM UTC
  and the weekly one on Saturday at 10 PM UTC. Operators set the times; digests are scheduled through Celery, not
  cron.
- **Releases:** the learner guide already describes it in **Teak**. **Ulmo** is the first official release of
  the feature, and **Verawood** turns it on by default. Operators can switch it off:
  `notifications.disable_notifications`, `notifications.disable_email_notifications`.

| Group | Type | Who | Default (tray / email) |
|---|---|---|---|
| Discussions | Activity: responses, comments, endorsements on my posts or followed posts | all | ON / daily |
| Discussions | New discussion posts · new question posts | all | OFF / OFF |
| Discussions | New posts from the instructor (Ulmo) | all | ON / daily |
| Discussions | Reported content | moderators | ON / daily |
| Updates | Course updates | all | ON / OFF (Teak) · ON / daily (Ulmo) |
| Grading | ORA grade received | learners | ON / daily |
| Grading | ORA new submissions to review | staff, admins | OFF / OFF (Teak) · ON / OFF (Ulmo) |

Decision 005 (tabs All / Discussions / Grading / Updates) follows these three groups.

## 2. Automatic "nudge" emails (schedules app, sent through edx-ace)

| Email | When | Conditions |
|---|---|---|
| Day 3 nudge | 3 days after enrolment | self-paced only; upsell to the verified track if not upgraded |
| Day 10 nudge | 10 days after enrolment | self-paced only; not sent if a highlight email went on day 7 |
| Day 19 upgrade reminder | 19 days after enrolment, or 2 days before the upgrade deadline | self-paced; only if not upgraded |
| Course highlights | weekly (instructor-paced) · the day after each section's personal due date (self-paced) | only if the course team writes highlights in Studio |

Sent by daily scheduled jobs (`send_recurring_nudge`, `send_upgrade_reminder`, `send_course_update`) that the
operator must set up. The docs say this may only apply to edx.org: **check what our install sends**.

## 3. Weekly learning goal reminders

The learner picks a goal on the course home (1, 3 or 5 days a week) and is subscribed to reminder emails, sent in
the morning of their time zone. They stop when the learner has a downloadable certificate or their audit access
ends. Needs the `course_experience.enable_course_goals` flag and the `goal_reminder_email` job.

## 4. Manual messages from the course team

Bulk email from the Instructor Dashboard, and Course Updates (which also trigger the *Course updates*
notification above).

## What does not exist

- **Deadlines:** no notification or email for an upcoming or missed due date. Dates only show on the Dates tab
  and in the "Shift due dates" alert ([edx-dates-tab.md](edx-dates-tab.md)).
- **Grades:** only ORA grades notify. Auto-graded problems and quizzes don't, and there is no "you passed" or
  "below the pass mark" message.
- **Certificates:** core Open edX sends no "certificate earned" email. The Credentials service has program
  completion emails, for programs only.
- **Mobile push:** not supported for now.

## What this means for our screens

The Notifications panel (`overlay-panels-spec.md`, Panel 1) lists types that Open edX does not send:

| Our type | In Open edX? |
|---|---|
| Discussion reply | ✅ Discussions › Activity |
| Course update | ✅ Updates › Course updates |
| Peer review received | ✅ only as *ORA grade received* (no rating text) |
| Assignment due ("due in 2 days") | ❌ custom |
| Live session reminder · T-15 | ❌ custom (no live sessions in the platform) |
| Syllabus change | ❌ custom (closest: a course update the team writes) |

A deadline reminder, a quiz grade alert or a "certificate earned" message is SkillUp-specific: it needs a custom
build (Open edX events or signals plus our own email or notification service). BA and dev should size it before the
designs commit to it.

## Sources

- Learner notifications and preferences (Teak):
  https://docs.openedx.org/en/release-teak/learners/sfd_notifications/index.html
- Ulmo release notes, Activity Notifications:
  https://docs.openedx.org/en/latest/community/release_notes/ulmo/ulmo_notifications.html
- Enable notifications (operators): https://docs.openedx.org/en/latest/site_ops/how-tos/enable_notifications.html
- Automatic email messages: https://docs.openedx.org/en/ulmo/educators/references/communication/automatic_email.html
- Weekly learning goals:
  https://docs.openedx.org/en/ulmo/site_ops/install_configure_run_guide/configuration/enable_weekly_learning_goals.html
