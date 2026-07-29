---
id: 023
title: SCORM + ORA hard limits (edX-sourced)
date: 2026-07-24
status: accepted
audience: [dev]
track: ICP
phase: 1
---
**Decision** — Treat the SCORM and ORA platform limits as hard constraints on unit composition: **SCORM = max 1 per unit, 1–15 MB, not mobile-ready, community XBlock (not core); ORA = max 1 per unit** (multiple ORA in one unit cause submission errors).

**Why**
- SCORM runs on `openedx-scorm-xblock` (Overhang.io) — a community/third-party XBlock, not core — and is not mobile-ready, so Activity topics can't be assumed available on mobile.
- Multiple ORA in a single unit cause errors when learners submit — a hard limit, corrected from the earlier "typically 1 per unit" assumption (Q13 resolved).
- These are anchor blocks that own completion; 2+ anchors per unit make completion and grade roll-up ambiguous.

**Source** — `topic-types-inventory.md` §5–6b (validated 2026-07-24 against docs.openedx.org) + `quizzes/`. [`../LMS-HANDOFF/topic-types-inventory.md`](../LMS-HANDOFF/topic-types-inventory.md), [`../LMS-HANDOFF/quizzes/05-ora-explained.md`](../LMS-HANDOFF/quizzes/05-ora-explained.md).

**edX basis** — Verified against docs.openedx.org (2026-07-24): SCORM `openedx-scorm-xblock` max 1/unit, 1–15 MB, not mobile, community; ORA `openassessment` max 1/unit (multiple "cause errors when learners submit").

**Design** — Topic Content Types: [`4692-444`](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4692-444).

**Dev impact** — Unit composer must enforce 1 SCORM/unit and 1 ORA/unit; SCORM shell needs a not-mobile fallback + 1–15 MB chunking guidance. Cross-ref `02-content-types/` buildability matrix.

**Alternatives rejected** — Earlier "typically 1 ORA per unit" (soft assumption): superseded — multiple ORA per unit is a hard failure, not a style preference (Q13).
