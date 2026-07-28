---
id: 019
title: One media player, many contexts (Live stays scrubber-less)
date: 2026-07-24
status: accepted
audience: [designer, dev]
track: A
phase: 1
---
**Decision** — VILT **Recording** and lesson-level video units reuse the **same `VideoPlayer`** as the Video topic (stage, scrubber, speed, captions, fullscreen). **Live stays a plain stream — no scrubber**, deliberately.

**Why**
- One recorded-media component for every recorded-video context avoids three near-duplicate players and keeps controls consistent.
- Live is a stream, not a file — there is nothing to scrub to, so the scrubber is deliberately absent.
- `durationToSeconds("58 min")` → `0:00 / 58:00` normalizes duration strings into the shared player.

**Source** — `_REORG-PROMPT.md` prototype-decision note (PR#10, 2026-07-24) + `topic-types-inventory.md` §5. [`../_REORG-PROMPT.md`](../_REORG-PROMPT.md), [`../LMS-HANDOFF/topic-types-inventory.md`](../LMS-HANDOFF/topic-types-inventory.md).

**edX basis** — VILT Recording and Video both render on the `video` XBlock (edxval, transcripts); Live is an LTI stream (Zoom/Teams). docs.openedx.org.

**Design** — Video Lesson — Ready for Dev: [`3785-11385`](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3785-11385). VILT/Video chrome family.

**Dev impact** — `VideoPlayer` component reused across Video / VILT-Recording / lesson video units; Live uses a scrubber-less stream variant of the VILT/Video chrome family.

**Alternatives rejected** — Separate players per context, or giving Live a scrubber: rejected — duplicates chrome, and a scrubber on a live stream is meaningless.
