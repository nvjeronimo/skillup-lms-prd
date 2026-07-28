# 01 · Ready for Dev (Track A — Phase 1)

Screens/flows signed off for development. Each entry carries its **Figma deep link (file + node-id)**,
breakpoints, components, tokens, business rules, edX reference, and the decision records that shaped
it. The build specs physically live in [`../LMS-HANDOFF/`](../LMS-HANDOFF/); this is the index over them.

Status legend: ✅ Ready · 🟠 WIP · ⚪ Not started

## Handoff pages

All under the Figma working file **`Wz2TCYFVr0hD8tJNiLajLt` — LMS ICP Phase 1**. DS: `c7EUDrQwP8si08aPipDSIV` (v3.3).

| Page | Status | Node-id | Deep link | Breakpoints | Spec |
|---|---|---|---|---|---|
| Phase 1 — Video Lesson | ✅ Ready | `3785-11385` | [open](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3785-11385) | D / T / M (15 cards) | [`screens-spec.md`](../LMS-HANDOFF/screens-spec.md) · [`phase1-readiness.md`](../LMS-HANDOFF/phase1-readiness.md) |
| Phase 1 — Overlay Panels | ✅ Ready | **NODE-ID MISSING — ask Nelson** | — | D / T / M (6 cards: Notifications + Saved) | [`overlay-panels-spec.md`](../LMS-HANDOFF/overlay-panels-spec.md) |
| Phase 3 — Completion + Certificate | 🟠 WIP (Phase 1 baseline) | **NODE-ID MISSING — ask Nelson** | — | D / T / M (6 cards: Complete Modal + Certificate) | — |
| Diagram Flows + Business Logic | ✅ Ready | `3832-18102` | [open](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3832-18102) | flow diagram | 42 BRs → [`BA/03-business-rules.md`](../LMS-HANDOFF/BA/03-business-rules.md) |

> Two node-ids are genuinely unknown — **never invented** (reorg rule). They are [OPEN-ACTIONS](../OPEN-ACTIONS.md) #5.
> Paste them and this table gets its deep links.

## Per page — the three audiences

### Phase 1 — Video Lesson ✅ (`3785-11385`)
- **Stakeholder** — the core learner flow: watch, take notes on the transcript, download resources, mark complete. Locked decisions: transcript-anchored notes, simple footer nav, `approx.` duration rule.
- **Designer** — 15 cards (5 rows × D/T/M): Transcript, Notes, Downloads, Player states, Note Editor Modal. DS-hosted components (page `1030-33572`), `--sk-*` tokens.
- **Developer** — spec [`screens-spec.md`](../LMS-HANDOFF/screens-spec.md); readiness details (bookmark toast, transcript auto-scroll, a11y, analytics) [`phase1-readiness.md`](../LMS-HANDOFF/phase1-readiness.md); FRD [`BA/FRDs/FRD_ICP_5.3_Video_Lessons.md`](../LMS-HANDOFF/BA/FRDs/FRD_ICP_5.3_Video_Lessons.md).
- **Decisions:** [`00-decisions/001`](../00-decisions/) (notes), [`004`](../00-decisions/) (approx.), [`006`](../00-decisions/) (footer nav), [`019`](../00-decisions/) (one media player).

### Phase 1 — Overlay Panels ✅ (node-id pending)
- Notifications + Saved right-overlay panels, triggered from the Topbar. Spec: [`overlay-panels-spec.md`](../LMS-HANDOFF/overlay-panels-spec.md). Decisions: [`00-decisions/005`](../00-decisions/) (hybrid grouping), [`009`](../00-decisions/) (bookmark = marker; Saved aggregates).

### Phase 3 — Completion + Certificate 🟠 (node-id pending)
- Course Complete Modal + Certificate (D/T/M). Phase 1 baseline; Phase 3 WIP. BRs: BR-25..27 (certificate). Not Ready-for-Dev.

### Diagram Flows + Business Logic ✅ (`3832-18102`)
- Navigation flow + **42 business rules** + **10 key decisions** + **24 doc links** — the backbone of [`../00-decisions/`](../00-decisions/). Note: one rule (**BR-02a**, module auto-collapse) exists only on this page, not in the BA rules doc — [OPEN-ACTIONS](../OPEN-ACTIONS.md) #12.

## Cross-checks
Cross-checked against [`screens-spec.md`](../LMS-HANDOFF/screens-spec.md),
[`overlay-panels-spec.md`](../LMS-HANDOFF/overlay-panels-spec.md),
[`phase1-readiness.md`](../LMS-HANDOFF/phase1-readiness.md).
