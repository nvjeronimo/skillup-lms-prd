# Business Rules

The rules that govern domain behavior. User stories reference these by ID (`BR-XX`).

## Progress + completion

### BR-01 · Topic completion logic
A topic transitions to **Completed** based on its type:

| Topic type | Trigger |
|---|---|
| Video | Video playback reaches ≥ 90% of total duration in a single session OR cumulative across sessions |
| Recording | Same as Video |
| Podcast | Audio reaches ≥ 90% |
| Reading | User clicks "Mark as complete" |
| Live Session (VILT) | Attended live (system detects join + ≥ 50% session duration) OR watched recording to ≥ 90% post-event |
| Practice Quiz | Submitted, regardless of score |
| Graded Assignment | Submitted (grade calculated separately, doesn't block completion) |
| Peer-graded | Submitted own work AND reviewed required N peer submissions |
| Discussion Prompt | Posted ≥ 1 message to the thread |
| Lab / Activity / Project | User clicks "Mark as complete" |

Completion is **idempotent** — re-triggering does not double-count. Once Completed, a topic stays Completed unless explicitly reset by admin.

### BR-02 · Module completion logic
A module is **Completed** when 100% of its **required** (non-Optional) topics are Completed.

Optional topics are excluded from module % calculation but tracked separately for engagement metrics.

### BR-03 · Course completion logic
A course is **Completed** when:
1. All required modules are Completed AND
2. Grade requirement met (if any). For courses with Graded Assignments, learner must achieve ≥ pass threshold (default 70%, configurable per course)

Course completion triggers:
- Certificate available
- Course Complete modal shown
- `course_complete` analytics event fired
- Email notification queued (Phase 2)

### BR-04 · Progress % calculation
```
module_progress = (completed_required_topics / total_required_topics) × 100
course_progress = (completed_required_topics_in_course / total_required_topics_in_course) × 100
```

Round down to integer. Display: "67%" not "66.67%".

### BR-05 · Time remaining calculation
For each remaining topic:
- Video/Recording/Podcast: use exact duration
- Live Session: use scheduled duration
- Quiz (timed): use time limit
- Reading/Lab/Activity/Project: use `approx.` estimate

Aggregate to module + course level. Display as "approx. 2h 30m remaining" when any approx. topic is in the sum. Drop "approx." only if every remaining topic is exact-time.

## Locks + prerequisites

### BR-06 · Sequential gating
By default, modules unlock sequentially. Module N is **Locked** until Module N-1 is Completed.

Course-level override: a course can be set to "open" mode where all modules unlock on enroll. (Configurable per course; defaults to sequential.)

### BR-07 · Live session gating
A scheduled Live Session topic is **Locked** until 15 minutes before its start time. Once unlocked, it shows the **Live now** state during the session window and converts to **Recording** state once the session ends.

### BR-08 · Optional topics don't gate
Optional topics never count toward unlock prerequisites. A learner can complete a module by completing only the required topics.

## Bookmarks + Notes

### BR-09 · Bookmark scope
Bookmarks are per-topic markers. One bookmark per (user, topic). Toggling is idempotent.

Bookmark state persists across sessions and devices.

### BR-10 · Bookmark does not affect progress
Bookmarking a topic does NOT mark it Completed or In Progress. Pure marker for "come back later".

### BR-11 · Note anchoring
Notes on Video/Recording/Podcast lessons are anchored to a **transcript line**, NOT to a raw video timestamp.

When the transcript is re-generated (caption fix, new version), the system attempts to re-anchor notes to the closest matching line by content. If matching confidence < 70%, the note is marked **Orphaned** and shown in a maintenance queue (Phase 2 admin tool).

### BR-12 · Note ownership + privacy
Notes are private to the learner by default. No instructor/peer visibility in Phase 1.

Phase 2 may add "Share with cohort" toggle per note.

### BR-13 · Note tags
Tags are free-text, comma-separated. Hashtag-prefixed in display ("#discovery"). Stored without the `#` symbol. Tags are case-insensitive on search but preserve case on display.

Max 10 tags per note. Each tag max 30 chars.

## Notifications

### BR-14 · Notification types (7)
| Type | Trigger |
|---|---|
| Live | Live session starting within 15 min, or in-progress |
| Discussion reply | Someone replied to a thread you participated in |
| Grading | A Graded/Peer-graded submission was graded |
| New content | Instructor added a new topic/recording |
| Peer review | Anonymous peer rated your submission |
| Due soon | Quiz/assignment due within 48 hours |
| Mentor message | Mentor sent you a 1:1 message |

### BR-15 · Notification grouping (hybrid)
Notifications are grouped by **type-tab** (All / Discussions / Grading / Updates) at the top, then by **date section** inside each tab (Today / Yesterday / Earlier this week / Older).

Unread notifications have a brand dot indicator on the right. Read state persists across devices.

### BR-16 · Mark all read
"Mark all read" applies only to the currently visible tab. Does not affect other tabs.

### BR-17 · Notification retention
Notifications are retained for 90 days. Older auto-archive (not deleted — accessible via "Older" date section or full archive page).

## Mentor messaging

### BR-18 · Mentor scope
Mentor is unlimited 1:1 async messaging. Not booked sessions, not group threads.

Each learner is assigned 1 mentor at enrollment. Mentor relationship persists for the duration of the course.

### BR-19 · Mentor SLA
Phase 1: mentors aim to respond within 1 business day. Display: "Typically responds within 1 day" on mentor card.

Phase 2: dynamic SLA based on actual mentor response history.

### BR-20 · Mentor fair-use
No hard cap on message volume in Phase 1. Fair-use notice displayed if learner sends > 10 messages without mentor reply (defensive nudge to wait for response).

Phase 2: queue triage tools for mentor + rate-limit if abuse detected.

## Bookmarks toast feedback

### BR-21 · Toast on bookmark toggle
On bookmark add/remove via Topic Row icon or Topbar button, show a transient toast:
- **Add**: "Bookmarked · {topic title}" + "Undo" link
- **Remove**: "Bookmark removed" + "Undo" link

Toast auto-dismisses after 4 seconds. Paused while user hovers. Undo reverts the action.

No toast on initial state restoration from API.

## Live sessions

### BR-22 · Pre-live state (T-15 min)
15 minutes before scheduled start, the Live Session topic shows:
- Countdown timer
- "Join when ready" CTA
- Mentor/Instructor avatars + names
- Session agenda (if provided)

### BR-23 · Live state (in-progress)
During the live window:
- Red "LIVE NOW" badge on topic row
- "Join Live" primary button on player chrome
- Real-time attendance tracking starts on join

### BR-24 · Post-live (recording available)
Within 24 hours of session end:
- Topic converts to Recording type
- Recording icon replaces Live icon
- "Watch recording" CTA
- Attendees who joined ≥ 50% are auto-marked Completed
- Non-attendees can complete by watching recording to ≥ 90%

## Certificates

### BR-25 · Certificate trigger
Generated immediately on `course_complete` event. Available within 60 seconds.

PDF format. Filename: `{userName}_{courseSlug}_certificate.pdf`.

### BR-26 · Certificate verification
Each certificate has a unique verification hash. Public verification URL: `lms.skillup.com/verify/{hash}`. Anyone with the URL can confirm certificate is valid + see basic course info (no learner PII beyond name).

### BR-27 · Certificate share actions
Share menu offers:
- LinkedIn (opens LinkedIn share dialog with cert URL pre-filled)
- Twitter / X
- Facebook
- Copy link to clipboard
- Email (mailto with subject + body pre-filled)

Plus a Print button (renders print-friendly view).

## Course metadata

### BR-28 · Provider badge
Every course has 1 Provider (org delivering). Displayed on Course Card + Course Detail.

### BR-29 · Difficulty levels
3 levels: Beginner / Intermediate / Advanced. Displayed on Course Card.

### BR-30 · Course type
2 types: Single Course / Program (multi-course). Badge on Course Card distinguishes.

## Display rules

### BR-31 · Next-live rule
On Course Cards and Course Rows, show next-live session indicator only when scheduled session is **within 7 days**.

Variants:
- **Same day** (LIVE TODAY): primary green CTA "Join at {time}"
- **Within 7 days, not today**: secondary "Next live · {day, time}" subline
- **More than 7 days out**: no indicator

### BR-32 · Semantic color usage
| Color | Meaning |
|---|---|
| Brand teal (`bg-brand-solid`) | Primary actions, progress, active state |
| Green (`bg-success-*`) | Success, completion, LIVE NOW |
| Amber (`bg-warning-*`) | Warnings, due soon |
| Red (`bg-error-*`) | Errors, destructive actions, danger states |
| Blue (`bg-info-*`) | Informational alerts |

Never use brand red for "Live" — green is the LIVE NOW color (matches the live-streaming convention from Twitch/YouTube, not the broadcast-TV red).

### BR-33 · `approx.` prefix
Use only on topic types where exact time is impossible to measure. Never on Video, Recording, scheduled Live Sessions, or timed Quizzes.

### BR-34 · Topic-type badge consistency
The active topic's badge in the sidebar MUST match the player chrome currently displayed. If sidebar shows Reading badge, the player must render Reading layout (text + downloads).

## Data persistence

### BR-35 · Bookmark + note + progress sync
All learner-state writes sync to backend within 5 seconds of action. Offline writes queue locally and replay on reconnect.

### BR-36 · Concurrency
If the same learner takes an action on two devices simultaneously, the last write wins. No conflict UI in Phase 1.

### BR-37 · Soft-delete for notes
Deleting a note is soft — recoverable for 30 days via Phase 2 "Recently deleted" view. Phase 1 deletion is final from the learner's perspective.

## A11y + i18n rules

### BR-38 · WCAG 2.1 AA
All screens must pass WCAG 2.1 AA. Color contrast ≥ 4.5:1 for text, keyboard navigable, ARIA labels on icon-only buttons. Detailed checklist in `phase1-readiness.md`.

### BR-39 · Reduced motion
Respect `prefers-reduced-motion`. Disable transcript smooth-scroll, panel slide-in, toast fade. Use instant transitions.

### BR-40 · English-only Phase 1
All UI strings in English. i18n architecture (next-intl or equivalent) wired in but no other languages shipped Phase 1. Phase 2: add Spanish + Portuguese first.

## Analytics

### BR-41 · Event tracking
Every meaningful user action fires a `track(event, properties)` event. Full event list in `phase1-readiness.md` (~30 events).

Default properties always included: `courseId, topicId, userId, sessionId, timestamp`.

### BR-42 · Privacy
Anonymous-by-default. PII only attached if user signed in AND opted in. Honor "Do Not Track" header. Retention: 18 months for raw events.
