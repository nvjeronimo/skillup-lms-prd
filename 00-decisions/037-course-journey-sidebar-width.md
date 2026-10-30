---
id: 037
title: The Course Journey sidebar is 3 of 12 columns, between 280 and 400
date: 2026-10-30
status: accepted
audience: [designer, dev]
track: ICP
phase: 1
---
**Decision** — On desktop and tablet the expanded Course Journey sidebar takes 3 of the 12 columns of the player
body, like a `col-md-3` on a grid with 24 px gutters: (body width − 11 gutters) / 4 + 2 gutters. It never goes
under 280 and never over 400. The phone drawer (320) and the collapsed rail (72) do not change.

**Why**
- Nelson, 30 Oct 2026: the width should be dynamic, like a grid column, not a fixed value. It replaces the fixed
  280 (320 from 1280) set on 29 Oct (prototype PR 425).
- The minimum keeps topic titles readable on tablet, where 3 columns would be about 190.
- The maximum: the content already stops at 1200 (`Container/content-max-width`, decision 031), so the sidebar
  stops growing too. It reaches 400 at a viewport of about 1700.

**Source** — Nelson in the prototype review session, 30 Oct 2026.

**edX basis** — n/a (presentation of the course outline the learning MFE already serves).

**Design** — Measured in the prototype player: 1024 → 280 (minimum), 1440 → 334, 1920 → 400 (maximum). The ICP
screens follow it since 30 Oct 2026 (see below).

**Dev impact** — Sidebar width `calc((100% - 264px) / 4 + 48px)` with `min-width: 280px; max-width: 400px` on the
player body row (24 px gap between sidebar and content). Prototype PRs 431 (merged) and 432 (the maximum).

**Alternatives rejected** — Fixed 280/320 (does not follow the screen); 3 columns with no limits (too narrow on
tablet, too wide past 1700).

**Applied 30 Oct 2026 (ICP)** — Every expanded sidebar on the ICP player pages takes the width its screen gives:
1440 desktop → 334, 960 tablet → 280 (Video 20, Quizzes 44, Reading 14, Lab 29, Activity 26, Overlay 2,
Completion 1 = 136 instances). The phone and tablet drawers (State=Mobile) stay 320. Content columns that had a fixed
width now fill the rest of the row.

**Amended 30 Oct 2026 (Nelson)** — Two changes to the same sidebar:
- Each module sits in its own box in every skin (until now a Studio test): the list on bg/faint with 8 of padding
  and 12 between boxes, a box on bg/page with a 1px border/subtle and Radius/card-inset (8); the module header has
  no hairline and no grey band. Prototype PR 434; DS Sidebar 1.7 (Expanded, Mobile, Mobile · noLesson).
- No "Opens after …" note under a locked module: each locked row already says what it waits for (DS Module-Header
  1.2: keep Show lock note off).
To stay readable at 280, DS Topic-Row 1.6 lets the type · duration line wrap (nothing is cut) and Module-Info 1.4
wraps "2 of 9 topics".
