---
id: 009
title: Bookmark = pure marker, does not affect progress
date: unknown
status: accepted
audience: [designer, dev]
track: A
phase: 1
---
> Product decision locked during discovery. Push back NOW if you disagree — mid-build reversal is 10x more expensive.

**Decision** — Bookmarking a topic is a pure "come back later" marker: it does not mark the topic Completed or In Progress. The Saved overlay panel aggregates Bookmarks + Notes.

**Why**
- BR-09 — bookmark is a per-topic idempotent marker, one per (user, topic), persistent across sessions/devices.
- BR-10 — bookmarking does not change progress/completion state.

**Source** — Figma `3832-18102` "Key Decisions" + BA business rules, 2026-06-08. [`../LMS-HANDOFF/BA/03-business-rules.md`](../LMS-HANDOFF/BA/03-business-rules.md) (BR-09, BR-10, BR-21 toast).

**edX basis** — n/a.

**Design** — LMS ICP Phase 1 · Overlay Panels — Saved (node-id unknown); Bookmark control (Topic Row + Topbar).

**Dev impact** — Bookmark atom/toggle, Saved overlay panel (Bookmarks + Notes with filter chips), BR-21 undo toast.

**Alternatives rejected** — Bookmark implying progress/"in progress": rejected — conflates intent-to-return with actual engagement.
