# SkillUp LMS Discovery — Start Here

The single, current source of truth for the SkillUp Learner Platform (LMS ICP Phase 1). Land here,
pick your door, and within two minutes you should know **what was decided, why, what's Ready for Dev,
and what's still being built.**

**Hub:** [`index.html`](index.html) → deployed at https://nvjeronimo.github.io/skillup-lms-prd/
· **Live state of every environment:** [`SYNC-STATE.md`](SYNC-STATE.md)
· **What's blocked / on whom:** [`OPEN-ACTIONS.md`](OPEN-ACTIONS.md)

> **Current state (2026-07-28):** DS **v3.3 published in Figma** (2026-07-24) · prototype **17 PRs
> merged, live on Vercel** · Topic Content Types page **Ready for Review** · ⚠️ **the deployed hub is
> 3 versions behind (v1.8) — a redeploy is pending** ([OPEN-ACTIONS](OPEN-ACTIONS.md) #3).

## Three doors — same content, filtered

| You are a… | You need | Go to |
|---|---|---|
| **Stakeholder** | what was decided, why, what changes for the learner, status | [`00-decisions/`](00-decisions/) · [`01-ready-for-dev/`](01-ready-for-dev/) · [`OPEN-ACTIONS.md`](OPEN-ACTIONS.md) |
| **Designer** | which Figma page/node, which tokens/components, which variants | [`03-design-system/`](03-design-system/) · [`01-ready-for-dev/`](01-ready-for-dev/) · [`02-content-types/`](02-content-types/) |
| **Developer** | the spec, the business rules, the tokens/CSS, the edX capability | [`LMS-HANDOFF/`](LMS-HANDOFF/) · [`02-content-types/`](02-content-types/) · [`03-design-system/`](03-design-system/) |

## The map

| Folder | What's in it | Track |
|---|---|---|
| [`00-decisions/`](00-decisions/) | Decision log — one file per decision (ADR), with why + source + Figma + edX + dev impact. `INDEX.md` is filterable. | A |
| [`01-ready-for-dev/`](01-ready-for-dev/) | Screens signed off for dev (Phase 1), each with its Figma deep link. | A |
| [`02-content-types/`](02-content-types/) | Topic Content Types (edX parity) — wired to `LMS-HANDOFF/topic-types-inventory.md`. 🟠 in review. | A |
| [`03-design-system/`](03-design-system/) | Tokens, variables, skins, accessibility, LMS components. Rationale here; shipped artifacts in `LMS-HANDOFF/`. | A |
| [`04-research/`](04-research/) | Personas, transcripts, audits, benchmarks. | — |
| [`05-source-docs/`](05-source-docs/) | Original FRDs, PRDs, BA docs, spreadsheets. | — |
| [`06-v8-complementary/`](06-v8-complementary/) | V8 Complementary Pages (SkillUp Brand). 🟠 WIP — a **separate** stream, not Phase 1. | B |
| [`LMS-HANDOFF/`](LMS-HANDOFF/) | The deployed handoff package (specs, tokens, BA, quizzes, changelog). | A |
| [`90-prototypes/`](90-prototypes/) | Prototype explorations + Storybook source. The **live** prototype is a separate repo. | — |
| [`_history/`](_history/) · [`_archive/`](_archive/ARCHIVE-LOG.md) · [`_media/`](_media/README.md) | Legacy docs · superseded (dated) · heavy binaries (local-only, gitignored). | — |

**Tracks:** **A** = LMS ICP Phase 1 (primary, active) · **B** = V8 Complementary Pages (parallel, WIP).
**Status legend:** ✅ Ready · 🟠 WIP · ⚪ Not started · ⚠️ Outdated.

## Keeping it in sync

Five environments must stay aligned (Figma working file · DS library · this hub repo · the prototype
repo · Storybook). The daily ritual and the drift scanner live in
[`SYNC-PLAYBOOK.md`](SYNC-PLAYBOOK.md) · [`SYNC-STATE.md`](SYNC-STATE.md) · [`SYNC-LOG.md`](SYNC-LOG.md)
· [`scripts/sync-scan.sh`](scripts/sync-scan.sh). The reorg that produced this structure is logged in
[`LMS-HANDOFF/CHANGELOG.md`](LMS-HANDOFF/CHANGELOG.md).

## ⚠️ One thing that is outdated
The FigJam **LMS Learner Flow Diagram** (`v5EiEKpYgXnUwoJs2DghCP`) is still the flow-diagram source but
its **content is outdated — refresh pending** ([OPEN-ACTIONS](OPEN-ACTIONS.md) #9).
