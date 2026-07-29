---
id: 022
title: Unit-renderer architecture; Practice/Graded/Final = subsection metadata
date: 2026-07-24
status: accepted
audience: [dev, designer]
track: ICP
phase: 1
---
**Decision** — Build a **unit renderer** that stacks N heterogeneous components, not one screen per type. Treat Practice / Graded / Final Exam as **subsection metadata**, served by one problem renderer.

**Why**
- A "topic" is a unit (`vertical`) that stacks multiple components — a Video lesson is often `html` (intro) + `video` + `html` (recap) + `problem` (knowledge check). Open edX stores **no `topic_type` field**; the outline derives the icon from child block types. So the player needs a unit renderer, and our types are a presentation layer resolved by unit tags/taxonomy.
- Practice / Graded / Final Exam is subsection-level metadata (grading policy + assignment type, optional timed config); the `problem` blocks inside are identical, so **one problem renderer serves all three** — only the shell differs (timer bar, exam intro, "practice" banner).
- Transparent containers (`split_test`, `library_content`, `conditional`) mean the renderer must recurse.

**Source** — `topic-types-inventory.md` §4 (architectural facts 1 & 2), 2026-07-24. [`../LMS-HANDOFF/topic-types-inventory.md`](../LMS-HANDOFF/topic-types-inventory.md), [`../LMS-HANDOFF/edx-component-types-reference.md`](../LMS-HANDOFF/edx-component-types-reference.md).

**edX basis** — Open edX course structure: Course → Section → Subsection → Unit (`vertical`) → Component (XBlock); a unit stacks one or more components; no `topic_type` field. docs.openedx.org.

**Design** — Topic Content Types: [`4692-444`](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4692-444); Diagram Flows + Business Logic: [`3832-18102`](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3832-18102).

**Dev impact** — Player = unit renderer stacking heterogeneous components (recursing into transparent containers); one `problem` renderer set for all three exam modes; topic type resolved via unit tags/taxonomy, never by parsing display titles.

**Alternatives rejected** — One screen per topic type, and a separate renderer per Practice/Graded/Final: rejected — a unit stacks multiple components and the three exam modes share identical `problem` blocks.
