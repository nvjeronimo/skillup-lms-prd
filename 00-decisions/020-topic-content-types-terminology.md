---
id: 020
title: "Topic Content Types" terminology + 5-point deliverable
date: 2026-07-21
status: accepted
audience: [designer, dev, stakeholder]
track: A
phase: 1
---
**Decision** — The items displayed at Topic level are called **"Topic Content Types"** (Video, Reading, Podcast, Quiz, Lab, Programming Assignment, Final Project, VILT) even though not all are technically assets. For every type, document five things: 1 Format · 2 Behaviour · 3 States · 4 Completion rules · 5 Assessment logic.

**Why**
- The Topic Content Type list is the list of things we design; the underlying format tells the renderer what to handle.
- A fixed 5-point deliverable per type prevents partially-specified types that render but behave inconsistently.

**Source** — `topic-types-inventory.md` (agreed 2026-07-21 with Navdeep, Harpreet + team). [`../LMS-HANDOFF/topic-types-inventory.md`](../LMS-HANDOFF/topic-types-inventory.md), [`../LMS-HANDOFF/edx-component-types-reference.md`](../LMS-HANDOFF/edx-component-types-reference.md).

**edX basis** — Types are a presentation layer imposed on Open edX; the underlying formats map to stock XBlocks (`video`, `problem`, `openassessment`, etc.). docs.openedx.org.

**Design** — Topic Content Types — Discovery + DS Build: [`4692-444`](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4692-444).

**Dev impact** — Each Topic Content Type carries a documented Format/Behaviour/States/Completion/Assessment spec; drives chrome-family assignment. Cross-ref `02-content-types/`.

**Alternatives rejected** — Calling them "assets": rejected — several types (Quiz, VILT, Final Project) are not single assets.
