# Feature Roadmap

Phased delivery plan. Pulls from `edx-parity-audit.md` + `feature-deltas.md` in the parent folder and groups everything into 3 phases.

## Phase 1 — Build target (this handoff)

The Video lesson flow + the surrounding chrome the learner needs to actually use the platform. Ship Phase 1 = ship a usable product for a self-paced video course.

### P1 epics (14)

| Epic | Stories | Notes |
|---|---|---|
| **E1 · Dashboard + course entry** | 4 | My Learning page, course cards, enrollment status |
| **E2 · Course Player chrome** | 5 | Topbar, Sidebar v2 (Expanded/Collapsed/Mobile), breadcrumb |
| **E3 · Video playback** | 8 | Play/pause/seek/speed/CC/lang/fullscreen/download transcript |
| **E4 · Transcript + auto-scroll** | 4 | Active line follow, click-to-seek, pause on user scroll, Resume pill |
| **E5 · Notes (transcript-anchored)** | 7 | Add, edit, delete, tags, list view, Note Editor modal, orphaned handling |
| **E6 · Downloads** | 3 | List, download, empty state |
| **E7 · Bookmarks** | 4 | Toggle, toast, undo, Saved panel integration |
| **E8 · Notifications panel** | 6 | Hybrid tabs, date sections, 7 types, mark all read, empty states |
| **E9 · Saved panel** | 4 | Bookmarks + Notes combined, filter chips, item types |
| **E10 · Topic completion** | 5 | Auto (Video 90%), manual (Reading), gating, locked module entry |
| **E11 · Course completion + Certificate** | 5 | Modal, certificate page, share menu, print, verification URL |
| **E12 · Peer-graded Assignment** | 6 | Submission, file upload, peer review queue, edge cases |
| **E13 · VILT Join Live** | 4 | Pre-live, Live now, post-live recording |
| **E14 · A11y + analytics + edge cases** | 8 | WCAG checklist, ARIA, keyboard, analytics events, error states |

**Total**: 14 epics, ~73 stories. Estimation goal in Sprint 0: T-shirt size each story.

### Phase 1.5 — fast-follow (within 4 weeks of Phase 1 launch)

Items the team wanted in Phase 1 but cut for scope. Build these immediately post-launch.

- Other lesson types in player: Reading, Podcast, Discussion, Lab, Activity, Project (designs exist)
- Cohort pace signal real backend (Phase 1 ships mock values)
- Discussion threads inside topic player (Phase 1 has Discussion Prompt type but threads UI is light)
- Mentor messaging UI (basic 1:1 thread view)
- Email notifications for grading + new content
- Course Hub page (Grades / Notes / Forum / Messages / Resources tabs)

## Phase 2 — Engagement + scale

Build on the foundation. Features that depend on Phase 1 data accumulating + community forming.

### P2 epics

| Epic | What | Why |
|---|---|---|
| **Goals + Streaks** | Daily goal setting, streak tracking, calendar heatmap | Motivation, retention. Component designed; not in screens. |
| **Mentor dashboard** | Mentor-side UI: learner list, message queue, response SLA tracking | Required to scale mentor program beyond pilot cohort |
| **Instructor dashboard** | Live session controls, grade dashboard, content authoring | Self-service for instructors instead of admin-tickets |
| **Smart digest notifications** | Reduce volume — daily/weekly digest option per type | Hybrid grouping is the first step; digest is the next |
| **Search** | Search across course content, notes, discussions, transcript | edX has this; we don't. Big gap. |
| **Offline mode** | Download lessons for offline. Service worker + IndexedDB. | Mobile learners on flights/transit |
| **i18n** | Spanish + Portuguese first. UI strings + content translations. | Markets we want |
| **Recently deleted notes** | 30-day recovery view | Soft delete is in BR-37 but UI not built |
| **Note sharing** | "Share with cohort" toggle per note | Community studying mode |
| **Multi-mentor relationships** | Learner can have N mentors across N courses | Right now 1:1 per enrollment |
| **Course feedback widget** | Per-topic like/dislike + report issue | Content quality signal — designed but not wired |
| **Rate, Share, Unenroll** | Course actions from My Learning overflow menu | Designed but not wired |

## Phase 3 — Platform expansion

Features beyond core learner experience.

| Epic | What | Why |
|---|---|---|
| **Admin panel** | Cohort management, course CRUD, user roles, billing | Required for SaaS distribution |
| **Native mobile apps** | iOS + Android with offline-first | Phase 1 is responsive web; native opens new audiences |
| **AI tutor — deep** | Beyond Ask/Chat/Related — proactive study suggestions, weakness detection | Differentiator. Need data from Phase 1 first. |
| **Live cohort chat** | Group chat per cohort, async + live during sessions | Cohort-based pedagogy enabler |
| **Career outcomes** | Job board integration, employer matching post-cert | Monetization + outcome story |
| **Verifiable credentials** | Blockchain or W3C Verifiable Credentials standard | Enterprise B2B selling point |
| **Custom learning paths** | Mix-and-match courses into custom paths | Power-learner / corp-training use case |
| **API + SDK** | Public API + embeddable widgets for partners | Distribution play |
| **Multi-tenant** | White-label deployments for enterprise | B2B revenue stream |

## edX feature parity status

Compiled from `edx-parity-audit.md`. 24 features in parity with edX baseline, 14 unique to us, 7 from edX to add (5 in P1, 2 in P2), 13 from edX intentionally skipped (mostly admin-side things we're rebuilding differently).

### In parity (Phase 1)
- Video player with CC, speeds, transcript
- Topic-anchored notes (we go further with transcript-anchored)
- Discussion prompts
- Quiz (Practice + Graded)
- Peer-graded assignments
- Certificate
- Progress tracking
- Course catalog

### Unique to us (Phase 1)
- Transcript-anchored notes (vs edX raw-timestamp)
- Mentor as messaging (vs edX no mentor pattern)
- Hybrid notification grouping (vs edX flat list)
- AI panel built-in (vs edX no native AI)
- Cohort pace signal (vs edX individual only)
- LIVE NOW unified UI (vs edX VILT external)
- Saved panel (combined Bookmarks + Notes)
- LMS Extension Components design system (vs edX legacy CSS)

### Added from edX (Phase 1)
- Certificate Print button
- Notifications panel with tab grouping
- Video Chrome Footer (License + CC toggle + Language + Download transcript)
- Note Editor Modal
- File Upload Zone (drag-drop + picker)

### To add from edX (Phase 2)
- Full-text search across course
- Discussion thread UI inside player
- Mentor/Instructor messaging UI
- Course Hub aggregation page (Grades/Notes/Forum/Messages/Resources)

### From edX, intentionally skipped
- edX Studio (content authoring) — Phase 3 admin panel will replace
- XBlock plugin architecture — overkill for our scope
- Open edX admin commands / CLI — replaced by admin panel
- Forum software (Discourse-style) — we go lighter with thread-per-prompt
- LMS native gradebook export to CSV — Phase 2.5
- LTI 1.3 integration — Phase 3 enterprise
- SCORM 2004 import — Phase 3 enterprise
- xAPI / TinCan — Phase 3 if customer demand
- Course wiki — replaced by Resources tab + Notes
- Course content versioning — Phase 3 admin
- Cohort grouping for content variants — Phase 2.5
- Open edX themes — design system makes this unnecessary
- Course start/end date hard cuts — Phase 2 once we add scheduled releases

## Sequencing logic

Why Phase 1 is what it is:

1. **Video flow is the dominant case** — 70%+ of LMS topics are Video. Ship video well first.
2. **Notes + Transcript are the differentiator** — proves the "transcript-anchored" thesis early.
3. **Notifications + Saved are foundation work** — needed regardless of which topic types we add next.
4. **Peer-graded + VILT Join Live in Phase 1** — these are the hardest to build, and dragging them to Phase 2 means we can't claim VILT readiness for the first paying cohort.
5. **Other topic types in Phase 1.5** — they reuse most of Phase 1 chrome. Reading is mostly Topic Header + content area + Mark complete. Lab is similar. Cheap follow-up.

## Sequencing risks to challenge

The BA team should re-test these assumptions in the first sprint:

- **Are we sure VILT belongs in Phase 1?** It depends on Mux/Cloudflare Stream live infrastructure being ready. If not, push to Phase 1.5. The Video flow alone is shippable.
- **Is the AI Panel in Phase 1?** Current design has it. Question: does Phase 1 have enough content for the AI to be useful? If not, fade it to Phase 1.5 and don't over-promise.
- **Cohort pace mock vs real** — if we ship Phase 1 with mock data and the value of cohort pace turns out to be low, we save real backend effort. Validate with cohort 1 before building.
- **Peer-graded complexity is hidden** — submission + review queue + grade aggregation is at least 3-4 stories of backend work. Make sure estimation captures this.
