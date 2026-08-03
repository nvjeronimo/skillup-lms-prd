# SkillUp LMS PRD — Project Encyclopedia · Start Here

The single, current source of truth for the SkillUp learner platform. This repo is the **encyclopedia
of the whole project** — its two big tracks (**ICP** + **LMS**) on a shared **Foundation**. Land here,
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

**This project = two big tracks on a shared Foundation:**
- **ICP** — Immersive & Content Types: the experience *inside* a topic (immersive player, Video Lesson, Content Types, Quizzes, VILT).
- **LMS** — Platform Pages: the platform *around* the course (dashboard, my learning, course/program pages, calendar, live sessions).
- **Foundations** — Design System, decisions, research: serve both tracks.

| Folder | What's in it | Track |
|---|---|---|
| [`00-decisions/`](00-decisions/) | Decision log — one file per decision (ADR), with why + source + Figma + edX + dev impact. `INDEX.md` is filterable by track. | all |
| [`01-ready-for-dev/`](01-ready-for-dev/) | Screens signed off for dev / in review, each with its Figma deep link. | ICP |
| [`02-content-types/`](02-content-types/) | Topic Content Types (edX parity) — wired to `LMS-HANDOFF/topic-types-inventory.md`. 🟠 in review. | ICP |
| [`03-design-system/`](03-design-system/) | Tokens, variables, skins, accessibility, LMS components. Rationale here; shipped artifacts in `LMS-HANDOFF/`. | Foundations |
| [`04-research/`](04-research/) | Personas, transcripts, audits, benchmarks. | Foundations |
| [`05-source-docs/`](05-source-docs/) | Original FRDs, PRDs, BA docs, spreadsheets. | Foundations |
| [`06-platform-pages/`](06-platform-pages/) | **LMS track** — Platform Pages (dashboard, my learning, course/program, calendar, live sessions). Current artifact: V8 Complementary Pages. 🟠 WIP. | LMS |
| [`LMS-HANDOFF/`](LMS-HANDOFF/) | The deployed handoff package (specs, tokens, BA, quizzes, changelog). | ICP + Foundations |
| [`90-prototypes/`](90-prototypes/) | Prototype explorations + Storybook source. The **live** prototype is a separate repo. | — |
| [`archive/`](archive/) | The old v1.8 hub snapshot (discovery/problem-space cards), kept out of the main view. | — |
| [`_history/`](_history/) · [`_archive/`](_archive/ARCHIVE-LOG.md) · [`_media/`](_media/README.md) | Legacy docs · superseded (dated) · heavy binaries (local-only, gitignored). | — |

**Status legend:** ✅ Ready · 🟠 WIP · ⚪ Not started · ⚠️ Outdated.

## Where decisions came from

The decision log says **what** was decided. [`LMS-HANDOFF/session-log.md`](LMS-HANDOFF/session-log.md)
says **who said it, when, and how sure they were** — one entry per workshop, vendor demo or research
session, with every platform claim tagged `CONFIRMED` / `ASSERTED` / `CONFLICT` / `UNVERIFIED`. Read it
before planning against a capability someone mentioned in a meeting: several turned out to be beliefs
rather than facts.

## Keeping it in sync

Five environments must stay aligned (Figma working file · DS library · this hub repo · the prototype
repo · Storybook). The daily ritual and the drift scanner live in
[`SYNC-PLAYBOOK.md`](SYNC-PLAYBOOK.md) · [`SYNC-STATE.md`](SYNC-STATE.md) · [`SYNC-LOG.md`](SYNC-LOG.md)
· [`scripts/sync-scan.sh`](scripts/sync-scan.sh). The reorg that produced this structure is logged in
[`LMS-HANDOFF/CHANGELOG.md`](LMS-HANDOFF/CHANGELOG.md).

## ⚠️ One thing that is outdated
The FigJam **LMS Learner Flow Diagram** (`v5EiEKpYgXnUwoJs2DghCP`) is still the flow-diagram source but
its **content is outdated — refresh pending** ([OPEN-ACTIONS](OPEN-ACTIONS.md) #9).
