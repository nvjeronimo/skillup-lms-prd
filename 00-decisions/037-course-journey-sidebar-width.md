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
Figma screens keep their 320 sidebars for now; a frame shows one viewport width, so they are not redrawn.

**Dev impact** — Sidebar width `calc((100% - 264px) / 4 + 48px)` with `min-width: 280px; max-width: 400px` on the
player body row (24 px gap between sidebar and content). Prototype PRs 431 (merged) and 432 (the maximum).

**Alternatives rejected** — Fixed 280/320 (does not follow the screen); 3 columns with no limits (too narrow on
tablet, too wide past 1700).
