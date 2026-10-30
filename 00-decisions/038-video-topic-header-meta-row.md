---
id: 038
title: A video topic shows the type · duration row and its completed badge, like every other topic
date: 2026-10-30
status: accepted
audience: [designer, dev]
track: ICP
phase: 1
---
**Decision** — Under the player, a video topic uses the same Topic Header as the other types: the meta row with the
type badge and the duration ("Video · 3m 20s", never "approx.", decision 004), the "Marked as completed" badge on
the right of that row once the topic is complete, then the title. It shows on every breakpoint, the phone included.
The header and the sidebar always agree: the duration in the header is the one in the topic's sidebar row, and a
topic that shows "Marked as completed" is ticked in the sidebar.

**Why**
- Nelson, 30 Oct 2026: the video topic lacked the topic type badge, and the completed state should sit next to it.
- Until now the video showed only the title (and on a phone no status at all, the completed badge stayed in the
  feedback row).

**Source** — Nelson in the prototype review session, 30 Oct 2026.

**edX basis** — The type, the duration and the completion state are the unit's own data; nothing new is stored.

**Design** — ICP ↳ Phase 1 · Video Lessons: the 29 Topic-Headers (Light and Dark) have *Show Meta-Type-row* on and
the duration "3m 20s" of their sidebar row. Fixed in the same pass: the Dark frame on `1. SKO-Semantics = SKO Dark`
(it rendered Light colours on tablet), the sidebars ticked where the header says completed, the rail and the phone
menu aligned with the expanded sidebar, and the tablet note-editor backgrounds re-rendered from the current screen.

**Dev impact** — `PlayerShell` renders `TopicHeader` for video (prototype PR 430). On a phone the completed badge
moves from the feedback row to the header.

**Alternatives rejected** — Title only under the player (the learner cannot see the type or the time at a glance);
the status on desktop only (the phone lost it).
