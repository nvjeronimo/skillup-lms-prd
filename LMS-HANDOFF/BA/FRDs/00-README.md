# Functional Requirements Documents (FRDs) — Official from Rashid

Source: Mohhammad Rashid (BA) — email 25-Jun-2026, Sprint 109 kickoff.
Status: **Final / Official** for ICP development.

These are the implementation-grade FRDs that supersede earlier discovery docs. Engineering uses them as the source of truth for behaviour and acceptance criteria.

## Files

| File | Module | Author | Version | Date | Status |
|---|---|---|---|---|---|
| `FRD_ICP_5.3_Video_Lessons.md` | Video Lessons (player + transcript + completion) | Rashid | v1.0 | 15-Jun-2026 | Under Review |
| `FRD_CourseOutline_Module_v1.0.md` | Course Outline (sidebar + resume) | Nilesh Dabhi, reviewed by Rashid | v1.0 | 15-Jun-2026 | Draft |

Original `.docx` files live at the project root:
- `FRD_ICP_5.3_Video_Lessons.docx`
- `FRD_CourseOutline_Module_v1.0.docx`

## Scope coverage

### FRD_ICP_5.3_Video_Lessons (Video Lessons)

Covers PRD 5.3 → FR-06 (player), FR-07 (transcript), FR-08 (completion). 3 features:

| Feature ID | Name | Priority | Key requirements |
|---|---|---|---|
| F-VID-001 | Video Player & Playback Controls | Must | 8 FRs · 5 BRs · 6 ACs |
| F-VID-002 | Synced Live Transcript | Must | 6 FRs · 4 BRs · 4 ACs |
| F-VID-003 | Video Watch Progress & Completion | Must | 6 FRs · 5 BRs · 5 ACs |

**Player controls** — play/pause, scrub bar, ±10s skip, speed cycle {0.75×, 1×, 1.25×, 1.5×, 2×}, CC toggle (default ON), full-screen.

**Transcript** — read-only, auto-scroll with active-line highlight, click-to-seek, language per author.

**Completion** — account-scoped (not device), monotonic, watch-threshold from platform, tick reflected ≤5s, resume within ±5s of last position.

### FRD_CourseOutline_Module_v1.0 (Course Outline)

Covers sidebar navigation + resume continuity. 2 features:

| Feature ID | Name | Priority | Key requirements |
|---|---|---|---|
| F-001 | Course Outline Sidebar - Hierarchical Navigation & Progress | Must | 13 FRs · 12 BRs · 7 ACs |
| F-002 | Resume / Last-Position Restore - Session Continuity | Must | 6 FRs · 4 BRs · 5 ACs |

**Sidebar** — supports 3 hierarchy shapes (5-level Course>Module>Lesson>Topic, 4-level Course>Module>Topic, 3-level Course>Topic), 10 content types, completion/active/locked states, collapsible (desktop/tablet), drawer (mobile <640px).

**Resume** — server-side state, seek to (position − 5s) on resume, falls back to first unlocked topic if last was locked or doesn't exist, redirects to final-results view if course complete.

## Cross-references to our handoff package

| FRD Feature | Maps to our handoff |
|---|---|
| F-VID-001 Player | Card 1 Transcript Desktop (`ICP-Video-transcript-desktop`) — Video player + controls |
| F-VID-002 Transcript | Card 1 Transcript content + transcript-line LMS component |
| F-VID-003 Completion | LMS Sidebar v2 (Topic Row completion states) + Topic Footer Nav |
| F-001 Sidebar | LMS Sidebar v2 component (Expanded/Collapsed/Mobile) |
| F-002 Resume | Not yet visualised — assumed behaviour, no dedicated screen |

## Breakpoints reconciliation

| Source | Mobile | Tablet | Desktop |
|---|---|---|---|
| **Rashid FRD (Course Outline)** | <640px | 640–959px | ≥960px |
| **Our handoff** | ≤375px (Mobile cards) | ≤960px (Tablet cards) | ≥1024px (Desktop cards) |

⚠ **Gap**: Our Tablet cards are at 960w (FRD says tablet ENDS at 959px). The 960px is the start of Desktop per FRD. Need alignment with Rashid.

## Open issues from FRD (to track)

From `FRD_CourseOutline_Module_v1.0.md` § 5.1:
- OI-001: confirm video seek offset (5s before or exact)
- OI-002: define prerequisite-unlock logic
- OI-004: 3-level hierarchy breadcrumb format on mobile
- OI-005: cross-device resume + PWA/offline scope

## Sign-off pending

Both FRDs awaiting Tech Lead / Product Owner final sign-off.
