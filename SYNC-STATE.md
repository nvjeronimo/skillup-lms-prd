# SkillUp LMS — Sync State (manifest)

**The single dashboard of where every environment is right now.** Update the relevant row whenever
an environment changes; run the daily ritual in `SYNC-PLAYBOOK.md`. Method lives in the playbook;
this file is only the current state.

**Last full reconcile:** 2026-07-29

| # | Environment | Canonical id / URL | Current version / commit | Published? | Verified | Owner |
|---|---|---|---|---|---|---|
| 1 | Figma working file | `Wz2TCYFVr0hD8tJNiLajLt` — LMS ICP Phase 1 | Content Types page `4692-444` **Ready for Review** (01→11 + ZZ) | n/a | 2026-07-28 | Nelson |
| 2 | DS (Figma library) | `c7EUDrQwP8si08aPipDSIV` — SKO Design System | **v3.3** · 1052 variables · 18 CVD primitives | ✅ published 2026-07-24 | 2026-07-28 | Nelson |
| 3 | Local = Hub repo | `nvjeronimo/skillup-lms-prd` → nvjeronimo.github.io/skillup-lms-prd/ | **v3.3-aligned + reorg structure** (`c577192`) | ✅ published 2026-07-29 | 2026-07-29 | Nelson |
| 4 | Prototype | `nvjeronimo/skillup-lms-prototype` → lms-prototype-mu.vercel.app | **17 PRs merged** (latest #17 quiz stacked one-scroll flow); DS-parity round #12–#16 on 07-27; 0 open · push 2026-07-27T21:29 | ✅ live on Vercel | 2026-07-28 | Nelson |
| 5 | Storybook | `v7-storybook/` → built `/storybook/` | **not started** — build last | — | 2026-07-28 | Nelson |

## Canonical Figma references (mirror of `_REORG-PROMPT.md`)

| What | File · node | Status |
|---|---|---|
| ❖ SKO Design System | `c7EUDrQwP8si08aPipDSIV` | v3.3 published |
| ❖ LMS COMPONENTS | `c7EUDrQwP8si08aPipDSIV` · `1030-33572` | 132 + 23 new (recount pending) |
| LMS ICP Phase 1 (working) | `Wz2TCYFVr0hD8tJNiLajLt` | active |
| ↳ Video Lesson — Ready for Dev ✅ | `Wz2TCYFVr0hD8tJNiLajLt` · `3785-11385` | Ready for Dev |
| ↳ Diagram Flows + Business Logic ✅ | `Wz2TCYFVr0hD8tJNiLajLt` · `3832-18102` | Ready |
| ↳ Overlay Panels — Notifications + Saved | `Wz2TCYFVr0hD8tJNiLajLt` · `3827-64809` | 🟠 Ready for Review |
| ↳ Completion + Certificate (Phase 3) | `Wz2TCYFVr0hD8tJNiLajLt` · `3830-76219` | 🟠 WIP |
| ↳ Topic Content Types — Discovery + DS Build | `Wz2TCYFVr0hD8tJNiLajLt` · `4692-444` | 🟠→ Ready for Review |
| ↳ V8 Complementary Pages (SkillUp Brand) | `Wz2TCYFVr0hD8tJNiLajLt` · `4340-322` | 🟠 WIP |
| FigJam — LMS Learner Flow Diagram | `v5EiEKpYgXnUwoJs2DghCP` | ⚠️ outdated — refresh pending |

## Open drift to close (mirror the top of `OPEN-ACTIONS.md`)

1. ✅ **Hub published** 2026-07-29 (`c577192`) — reorg structure + v3.3-aligned. Was 3 versions behind.
2. Recount LMS components (132 + 23) → fix `README.md` / `components-inventory.md`.
3. Verify no stray `00 · ARCHIVED` section after Quiz v1→v2 adoption.
4. Align progress-ring token name → `fg-success-secondary` in prototype/handoff.
5. Export SKOAIH01 OLX (Rashid) — last platform-vs-config unknown.
6. Q9 — enumeration prefix (manual vs automatic).
7. Handoff message to HK / Navdeep / Rashid for the Ready-for-Review content-types page.
