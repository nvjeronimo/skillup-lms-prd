# Decision Records — Index

23 Architecture / Design Decision Records for the SkillUp LMS. One file per decision.

## ADR format

Each record carries frontmatter (`id`, `title`, `date`, `status`, `audience`, `track`, `phase`) and a fixed body: **Decision** (one sentence) · **Why** (the verbatim rationale) · **Source** (meeting/doc + date, repo link) · **edX basis** · **Design** (Figma page + node-id deep link) · **Dev impact** (components / tokens / BRs) · **Alternatives rejected**.

- **Tracks:** **ICP** = immersive player & content types · **LMS** = platform pages (dashboard, my learning, course/program, etc.) · **Foundations** = design system / tokens / accessibility (serves both tracks).
- Dates are the decision date where documented, else `unknown`. Every record is sourced.
- Status: `accepted` · `proposed` (unresolved) · `superseded-by-NNN`.

## All decisions

| ID | Title | Track | Phase | Status | Audience | File |
|---|---|---|---|---|---|---|
| 001 | Transcript-anchored notes (raw-timestamp fallback) | ICP | 1 | accepted | designer, dev, stakeholder | [001](001-transcript-anchored-notes.md) |
| 002 | Sidebar v2 — adaptive 5-level hierarchy | ICP | 1 | accepted | designer, dev | [002](002-sidebar-v2-adaptive-hierarchy.md) |
| 003 | Button color system — brand primaries, neutral utilities | Foundations | 1 | accepted | designer, dev | [003](003-button-color-system.md) |
| 004 | `approx.` duration prefix only on inexact topic types | ICP | 1 | accepted | designer, dev | [004](004-approx-duration-prefix.md) |
| 005 | Notification grouping — hybrid (type-tabs × date sections) | LMS | 1 | accepted | designer, dev, stakeholder | [005](005-notification-grouping-hybrid.md) |
| 006 | Topic Footer Nav stays simple — no action chips | ICP | 1 | accepted | designer, dev | [006](006-topic-footer-nav-simple.md) |
| 007 | Mentor = unlimited 1:1 async messaging | LMS | 1 | accepted | designer, dev, stakeholder | [007](007-mentor-async-messaging.md) |
| 008 | AI Panel built into the player (Ask / Chat / Related) | ICP | 1 | accepted | designer, dev, stakeholder | [008](008-ai-panel-in-player.md) |
| 009 | Bookmark = pure marker, does not affect progress | ICP | 1 | accepted | designer, dev | [009](009-bookmark-pure-marker.md) |
| 010 | Cohort pace signal alongside personal progress | LMS | 1 | accepted (Phase 1 mock) | designer, dev, stakeholder | [010](010-cohort-pace-signal.md) |
| 011 | File upload UX — both drag-drop and picker | ICP | 1 | accepted | designer, dev | [011](011-file-upload-dual-ux.md) |
| 012 | Semantic color — green = LIVE (never brand red) | Foundations | 1 | accepted | designer, dev | [012](012-semantic-color-green-live.md) |
| 013 | Icon stroke weight — 1.5px under 24px, 2px at/above | Foundations | 1 | accepted | designer, dev | [013](013-icon-stroke-weight-rule.md) |
| 014 | DS v3.0 skin system — OKLCH ramps, zero raw hex | Foundations | 1 | accepted | designer, dev | [014](014-ds-v3-skin-system.md) |
| 015 | Contrast validation auto-discovers tokens from colors.css | Foundations | 1 | accepted | dev | [015](015-contrast-validation-auto-discovery.md) |
| 016 | Accessibility layer — CVD-safe states + text scale | Foundations | 1 | accepted | designer, dev | [016](016-accessibility-layer-cvd-textscale.md) |
| 017 | Accessibility architecture — values as primitives, override in CSS | Foundations | 1 | accepted | designer, dev | [017](017-accessibility-architecture-primitives-css-override.md) |
| 018 | Status chips use background tokens, never foreground | Foundations | 1 | accepted | designer, dev | [018](018-status-chips-background-tokens.md) |
| 019 | One media player, many contexts (Live scrubber-less) | ICP | 1 | accepted | designer, dev | [019](019-one-media-player-many-contexts.md) |
| 020 | "Topic Content Types" terminology + 5-point deliverable | ICP | 1 | accepted | designer, dev, stakeholder | [020](020-topic-content-types-terminology.md) |
| 021 | 10-point registration rule for a new Topic Content Type | ICP | 1 | accepted | designer, dev | [021](021-topic-type-10-point-registration-rule.md) |
| 022 | Unit-renderer architecture; Practice/Graded/Final = subsection metadata | ICP | 1 | accepted | dev, designer | [022](022-unit-renderer-architecture.md) |
| 023 | SCORM + ORA hard limits (edX-sourced) | ICP | 1 | accepted | dev | [023](023-scorm-ora-hard-limits.md) |

## Filter by track

- **ICP** (immersive & content types): 001, 002, 004, 006, 008, 009, 011, 019, 020, 021, 022, 023
- **LMS** (platform pages): 005, 007, 010 *(more to come as the Platform Pages track develops)*
- **Foundations** (design system): 003, 012, 013, 014, 015, 016, 017, 018

## Filter by audience

- **Stakeholder** (what / why / status): 001, 005, 007, 008, 010, 020
- **Designer** (Figma node + tokens): 001–014, 016–022
- **Dev** (spec + BR + edX): all except pure-stakeholder framing — see especially 001, 014, 015, 018, 019, 022, 023

---

## NOTE — Two reconciliation flags

These are recorded so they stay visible; content is **not invented** here — confirm with Nelson.

1. **BR-02a exists only in Figma, not in the BA business-rules doc.** Figma `3832-18102` ("Key Decisions" / Business Logic) states a rule: *"Module auto-collapses when it reaches 100%; focus moves to next incomplete module; manual re-open wins; fires once on completion transition; drives LMS / Module Header State=Collapsed."* This **BR-02a** is **not present** in [`../LMS-HANDOFF/BA/03-business-rules.md`](../LMS-HANDOFF/BA/03-business-rules.md). **Flag: back-port into the BA doc, or drop — confirm with Nelson.**

2. **5 open product questions (BA exec summary) — `status: proposed`, not accepted.** From [`../LMS-HANDOFF/BA/01-executive-summary.md`](../LMS-HANDOFF/BA/01-executive-summary.md) "Open questions". Listed here so they are visible; no ADR asserts a resolution.

## Proposed / unresolved (status: proposed)

| # | Open question | Affects |
|---|---|---|
| Q-A | Assignment grading flow — peer-graded rubric template + grade aggregation rules not yet defined | Peer-graded Assignment, grade engine |
| Q-B | Module completion gate — strict sequential vs unlock-all-on-enroll (may differ per cohort type) | BR-06, sidebar lock state |
| Q-C | Mentor message SLA — what response time do we commit to? | BR-19, mentor staffing (see ADR 007) |
| Q-D | Certificate verification — public verifiable-hash URL vs QR + check-on-platform | BR-26, public cert endpoint |
| Q-E | i18n timing — when does multi-language kick in? | BR-40, content model + UI string externalization |
