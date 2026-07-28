---
id: 001
title: Transcript-anchored notes (raw-timestamp fallback)
date: unknown
status: accepted
audience: [designer, dev, stakeholder]
track: A
phase: 1
---
> Product decision locked during discovery. Push back NOW if you disagree — mid-build reversal is 10x more expensive.

**Decision** — Notes on Video/Recording/Podcast lessons anchor to a **transcript line**, not a raw video timestamp, falling back to a raw timestamp only when no captions exist.

**Why**
- Notes survive video re-encoding and content edits — a raw-timestamp note breaks the moment the video is re-cut.
- Differentiator vs edX, which anchors notes to raw timestamps only.
- On re-generated transcripts the system re-anchors to the closest matching line by content; < 70% match confidence marks the note **Orphaned** (Phase 2 maintenance queue).

**Source** — Figma `3832-18102` "Key Decisions" + BA exec summary + business rules, 2026-06-08. [`../LMS-HANDOFF/BA/01-executive-summary.md`](../LMS-HANDOFF/BA/01-executive-summary.md), [`../LMS-HANDOFF/BA/03-business-rules.md`](../LMS-HANDOFF/BA/03-business-rules.md) (BR-11, BR-12, BR-13).

**edX basis** — edX Learner notes are raw-timestamp only; no transcript-line anchoring. n/a URL.

**Design** — Video Lesson — Ready for Dev: [`3785-11385`](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3785-11385). Pattern doc in-file: "📘 Notes — Timestamp anchoring pattern" (node-id unknown).

**Dev impact** — BR-11 (anchoring), BR-12 (privacy), BR-13 (tags); Notes tab, Note Editor Modal. Note-taking works only on stock HTML components (see ADR 021 caveat).

**Alternatives rejected** — Raw-timestamp anchoring (edX default): rejected because notes break on any video edit.
