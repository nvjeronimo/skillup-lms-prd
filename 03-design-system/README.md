# 03 · Design System

One coherent view over the SkillUp design system. The **shipped artifacts** (tokens, variable guide,
component inventory) physically live in [`../LMS-HANDOFF/`](../LMS-HANDOFF/) — the deployed package —
and are linked from here, not copied. This folder holds the **rationale** and the **footer contract**.

Also here: [`mobile-app-and-token-architecture.md`](mobile-app-and-token-architecture.md) — the
Mobile App analysis (24 live-session scenarios, 11 components) and the proposal for restructuring
the collections so one system can carry LMS, App, marketing, email and, later, social and print.

## Publication status — current

**DS v3.3 is PUBLISHED in Figma (2026-07-24):** 1052 variables · 18 CVD primitives · verified **1:1
against `tokens/colors.css`** (zero divergences). The old "consumers still see v2.0" blocker is
**resolved** — the triangle is aligned across all three vertices: **Figma DS (published) · CSS handoff
(synced) · prototype (in production)**. Residual nuance, non-blocking: a formal human side-by-side
review of the 6 skins was never run (maths-validated + published on Nelson's call) — [OPEN-ACTIONS](../OPEN-ACTIONS.md) O1.

## Three doors

| You are a… | Start here |
|---|---|
| **Stakeholder** | v3.3 is live; accessibility (colourblind-safe + text scale) shipped; 0 AA failures across 540 checks. What changed and why → CHANGELOG below. |
| **Designer** | [`variable-collections-guide.md`](../LMS-HANDOFF/variable-collections-guide.md) (4 collections, skin ramp model, naming, re-validate contrast) · DS Figma `c7EUDrQwP8si08aPipDSIV` · LMS components page `1030-33572`. |
| **Developer** | [`tokens/colors.css`](../LMS-HANDOFF/tokens/colors.css) + [`typography.css`](../LMS-HANDOFF/tokens/typography.css) · the `--sk-*` namespace · [skin-switcher module](../LMS-HANDOFF/modules/skin-switcher/) (drop-in). |

## Tokens & axes

- **Namespace** `--sk-*` (one system namespace, not per-brand). `sk` = SkillUp Design *System*.
- **6 skins** — SKO + `gold` / `violet` / `sky` / `red` / `ink`, each a **12-step OKLCH ramp** from 2
  brand anchors, **0 raw hex** (was 42/60). Selected via `data-skin` (⚠️ **breaking:** `data-brand` no
  longer exists — see [`00-decisions/014`](../00-decisions/)).
- **Theme** × light/dark, with a real **dark surface ladder** and **hover-lightens-in-dark**.
- **Breakpoints axis** (Desktop / Tablet / Mobile) for size/space/radius.
- **Accessibility axes** — `data-vision="cvd"` (colourblind-safe states, Okabe-Ito, ΔE≥18) and text
  scale (`--sk-font-scale`, A/A+/A++). Orthogonal to skin and theme. See [`00-decisions/016`](../00-decisions/) + [`017`](../00-decisions/).
- **Validation** — 540 contrast checks, **0 AA failures**, auto-discovered from `colors.css` (never a
  hand-written pair list). Thinnest pair: `text-success-primary` / `bg-tertiary` light = **4.51:1**.

## Conventions (permanent rules)

- 0 raw hex; primitives carry **values, not roles**; dark surface ladder; hover lightens in dark.
- **Status chips use background tokens, never foreground** ([`00-decisions/018`](../00-decisions/) — the fg-white dark-mode blob bug).
- Accessibility axes live in **CSS**, not variable modes (values-in-primitives / override-in-CSS) — [`00-decisions/017`](../00-decisions/).
- Contrast validation **auto-discovers from `colors.css`** — [`00-decisions/015`](../00-decisions/).

## LMS components

DS-hosted on Figma `1030-33572`. **Count: ≈155** — 132 baseline + **23 added 2026-07-22** (domains
**F · Assessments**, **D · Live/VILT**, new **L**). Itemised inventory (132 baseline; +23 recount
pending): [`components-inventory.md`](../LMS-HANDOFF/components-inventory.md). Recount is [OPEN-ACTIONS](../OPEN-ACTIONS.md) #4.

## In this folder

| Path | What |
|---|---|
| [`rationale/`](rationale/) | Token **architecture & discovery** docs (was `Design System Tokens/`): TOKEN-ARCHITECTURE, TOKEN-FOUNDATIONS, naming alignment, multibrand demo, the DS-review pushback, session transcript. The *why* behind the token model. |
| [`footer-contract.md`](footer-contract.md) | The footer spec/contract. |

## Pointers into the handoff package

| Artifact | Link |
|---|---|
| Version history | [`../LMS-HANDOFF/CHANGELOG.md`](../LMS-HANDOFF/CHANGELOG.md) (v3.3 current; v3.0→v3.3 explained) |
| Variable collections guide | [`../LMS-HANDOFF/variable-collections-guide.md`](../LMS-HANDOFF/variable-collections-guide.md) |
| Storybook coverage plan | [`../LMS-HANDOFF/storybook-coverage.md`](../LMS-HANDOFF/storybook-coverage.md) |
| Built Storybook | [`../storybook/`](../storybook/) · source in [`../90-prototypes/storybook-src/`](../90-prototypes/storybook-src/) |
| Icons (46 SVG + sprite) | [`../maven-icons/`](../maven-icons/) (canonical set; `design-system/index.html` loads it via `../maven-icons/`) |
