# 90 · Prototypes

Prototype explorations and build sources. Reference material — none of this is the current handoff.
**The live, current prototype is a separate repo** (see below), not in this folder.

## The live prototype (separate repo — reference, do not reorganize)

The working prototype is a real React app in its own GitHub repo, **`nvjeronimo/skillup-lms-prototype`**
(distinct from the hub repo `nvjeronimo/skillup-lms-prd`), deployed on Vercel
(`lms-prototype-mu.vercel.app`). As of 2026-07-27: **17 PRs merged, 0 open**. Its Accessibility panel
and content players are the most current expression of several decisions — see
[`../00-decisions/016`](../00-decisions/), [`017`](../00-decisions/), [`019`](../00-decisions/).

## In this folder

| Path | What | Notes |
|---|---|---|
| [`v5/`](v5/) | V5 static-HTML prototype (index, program/course detail, calendar, live sessions, immersive) | historical |
| [`v7-hk/`](v7-hk/) | HK's V7 single-file prototype (`SkillUp_ICP_v7.html`) + `PROJECT_MEMORY.md` | historical |
| [`storybook-src/`](storybook-src/) | **Source** for the Storybook (was `v7-storybook/`). Built output is deployed at [`../storybook/`](../storybook/). `node_modules/` is gitignored. | build source |
| [`nav-variants-mockup.html`](nav-variants-mockup.html) | Standalone nav-variants mockup | historical |

## Left in place (not moved here)

- **`../skillup-lms-redesign/project/`** — the "Editorial" redesign explorations (v2/v3/v4 HTML + jsx +
  screenshots). Left where it is because that folder is an active tooling workspace; treat it as a
  prototype archive alongside this folder.
- **`../_workspace/prototypes/`** — earlier V4 exploration HTML (gitignored working area).
