---
id: 031
title: A topic's content stops at Container/content-max-width (1200); the video keeps the full width at half the viewport
date: 2026-10-22
status: accepted
audience: [designer, dev]
track: Foundations
phase: 1
---
**Decision** — A new token, `Container/content-max-width`, in `3. Responsive 📐`: **1200** in every mode, the same as the
platform pages' content. A topic's content (title, tabs, transcript, reading, blocks) stops at it and centres in the
content panel; `Container/content-padding` (decision 026) sits outside it. The video player keeps the full panel width;
from tablet up it opens at half the viewport, never taller than the 16:9 picture at its width, and docks only when the
learner scrolls to the transcript. Phones keep the 16:9 player.

**Why**
- Nelson, 22 Oct 2026: a max width for the content, the player full width and 50vh, shrinking only on scroll. First
  built at 800 (50rem); the same day Nelson set it to 1200, as the platform pages.

**Design** — DS variable `Container/content-max-width` (alias of the new primitive `Numeric/300 (1,200px)`), scope
Width/height. ICP: the video players of the Video page are 450 tall on desktop (50% of a 900 viewport) and 333 on
tablet (16:9 of 592); the content panels of the 1440 screens are 1112 wide, so the cap does not change them.

**Dev impact** — `CONTENT_MEASURE` = `mx-auto box-content max-w-[1200px]` (prototype PR 273, after 258); video
`min(50dvh, 56.25cqi)` from tablet up (PR 258).

**Alternatives rejected** — 800 (a reading measure of ~85 characters): narrower than the platform pages, Nelson chose
one width for both.
