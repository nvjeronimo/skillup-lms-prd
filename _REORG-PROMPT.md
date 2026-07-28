# TASK: Reorganize & consolidate the SkillUp LMS Discovery project folder

> Prompt authored 2026-07-22. Figma references verified against the repo on the same date.
> Paste this whole file as the opening message of a fresh Claude Code session at the project root.

## Context

Root: `/Users/nelsonjeronimo/Library/CloudStorage/OneDrive-FlexibleRoadLLC/SkillUp LMS Discovery (1)`
Git repo (branch `main`), published as GitHub Pages: https://nvjeronimo.github.io/skillup-lms-prd/
Hub entry point: `index.html`. Deploy is `_deploy.sh`, which currently pushes ONLY
`index.html`, `LMS-HANDOFF/` and `_history/`.

## Canonical Figma references (verified 2026-07-22 — use ONLY these)

### Track A — LMS ICP Phase 1 (primary, active)

| What | File key | Node | URL |
|---|---|---|---|
| ❖ SKO Design System (Untitled UI) | `c7EUDrQwP8si08aPipDSIV` | — | https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/%E2%9D%96-SKO-Design-System--Untitled-UI- |
| ❖ LMS COMPONENTS ✅ (132 comps) | `c7EUDrQwP8si08aPipDSIV` | `1030-33572` | https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/%E2%9D%96-SKO-Design-System--Untitled-UI-?node-id=1030-33572 |
| LMS ICP Phase 1 (working file) | `Wz2TCYFVr0hD8tJNiLajLt` | — | https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1 |
| ↳ Phase 1 - Video Lesson - Ready for Dev ✅ | `Wz2TCYFVr0hD8tJNiLajLt` | `3785-11385` | https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3785-11385 |
| ↳ Diagram Flows + Business Logic ✅ | `Wz2TCYFVr0hD8tJNiLajLt` | `3832-18102` | https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3832-18102 |
| ↳ Topic Content Types & Quizzes — Discovery + DS Build 🟠→review | `Wz2TCYFVr0hD8tJNiLajLt` | `4692-444` | https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4692-444 |
| ↳ Topic Types — DS Screens (earlier build) | `Wz2TCYFVr0hD8tJNiLajLt` | `4834-17366` | https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4834-17366 |

**`4692-444` is the canonical Topic Content Types page** — as of 2026-07-28 it is the **unified
"Discovery + DS Build" page: 15 sections, all in English, every screen a published-library
instance**, with end-to-end flows for every content type plus the buildability matrix and asset
catalog. It is being promoted to **Ready for Review**. The earlier `4834-17366` (22 screens in
6 sections) fed into this consolidation — **treat it as an earlier build and confirm with Nelson
whether it is now superseded/archivable**; do not present both as parallel current sources.

**The Topic Content Types discovery is a pair — never present one without the other:**

| Piece | Where | What it is |
|---|---|---|
| The written inventory | `LMS-HANDOFF/topic-types-inventory.md` | Consolidated list of topic types, cross-referenced from the current courses, the program syllabus, Rupali's list and the Open edX documentation |
| The visual page | Figma `4692-444` — *Discovery + DS Build* 🟠→review | 15 sections: per-type behaviour, end-to-end flows, buildability matrix + asset catalog (validated vs docs.openedx.org) |

**Both the page and the `.md` are still evolving as answers come in.** Everything derived from
them must be dated and marked with its real status (🟠 WIP or *in review*) — never presented as
Ready for Dev. Do not rewrite `topic-types-inventory.md`; it is authored and maintained by Nelson.
Link it, date it, and surface its open questions.

### Track B — V8 Complementary Pages (SkillUp Brand) — parallel, WIP 🟠

| What | File key | Node | URL |
|---|---|---|---|
| V8 - Complementary Pages (SkillUp Brand) - WIP 🟠 | `Wz2TCYFVr0hD8tJNiLajLt` | `4340-322` | https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4340-322 |
| ↳ section (screens) | `Wz2TCYFVr0hD8tJNiLajLt` | `4340-323` | https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4340-323 |

Track B is a **separate parallel product stream**, not part of Phase 1 handoff. It must be
visible in the structure and on the hub, clearly marked WIP 🟠, and never mixed into the
Ready-for-Dev material.

**Known state (as of 2026-07-20):** the V8 screens started as **raw-frame captures, not linked to
reusable components**. Migration to DS library instances is in progress — `Course Detail — Light
Hero` (`4554:63338`) and `Dashboard — Topbar Nav (Experiment)` (`4554:63757`) have been partially
swapped to real DS badge/button components. Do **not** describe Track B as DS-compliant.

---

## The prototype is a separate live repo — reference it, do not reorganize it

The working prototype has grown into a real React app in its own GitHub repo,
**`nvjeronimo/skillup-lms-prototype`** (distinct from the hub repo `nvjeronimo/skillup-lms-prd`).
It is **not inside this workspace folder** — do not try to move or restructure it. But the hub and
`00-decisions/` must **link to it** and record the design decisions taken there (below), because
several are design-system-level, not just prototype tweaks. As of 2026-07-24 it has
**10 PRs merged and zero open**, and is deployed on Vercel. Its Accessibility panel and its content
players are the most current expression of several decisions. Where a decision was prototyped there
but not reflected in the Figma DS, say so explicitly (as of this date the DS is caught up and
published — see A/A-bis).

**Prototype decision worth a record (PR #10, 2026-07-24):** the VILT **Recording** and the
lesson-level **video units/assets** now reuse the **same `VideoPlayer`** as the Video topic
(stage, scrubber, speed, captions, fullscreen); `durationToSeconds("58 min")` → `0:00 / 58:00`.
**Live stays a plain stream — no scrubber**, deliberately. This is the concrete "one media player,
many contexts" decision behind the VILT/Video chrome family in `topic-types-inventory.md` §5.

## Recent decisions to fold in (2026-07-20 → 2026-07-24)

These are the newest decisions in the project and are **not yet reflected anywhere in the
repo docs except where noted**. Treat them as first-class input to `00-decisions/`.

### A. Design System — dark theme review → **v3.3** (2026-07-22 → 2026-07-24)

Recorded in `LMS-HANDOFF/CHANGELOG.md`. **The handoff package is at v3.3, not v2.0 and not v3.0.**
The v3.x line spans four entries: **v3.0** (skin system + dark surface ladder + primitive cleanup,
2026-07-22) · **v3.1** (prototype sync — attribute, solid tokens, video stage, 2026-07-22) ·
**v3.3** (accessibility layer + softer decorative borders, 2026-07-24, current). Read them all;
the reorg must describe the current state, which is v3.3.

- ✅ **v3.3 IS NOW PUBLISHED IN FIGMA (2026-07-24).** The library was re-published — the earlier
  "not published, consumers still see v2.0" blocker is **resolved**. The published file has **1052
  variables**, the **18 CVD primitives**, `Neutral/150` (`#D5DCE2`) and `Dark-Neutral/650`
  (`#2C3D45`), verified **1:1 against the prototype `colors.css`** (zero divergences). The
  "triangle" is closed and aligned across all three vertices: **Figma DS (published) · CSS handoff
  (synced) · prototype (in production)**.
- One honest nuance to preserve, not to alarm: the v3.0 visual changes were **validated by
  contrast maths** and then published on Nelson's call — a broad human side-by-side review of the
  6 skins was never formally run. Worth doing, but no longer a blocker.
- ⚠️ **BREAKING — `[data-brand="x"]` no longer exists.** The green demo BrandX was replaced by
  **5 named skins**: `gold`, `violet`, `sky`, `red`, `ink` (+ SKO = 6 total). New usage:
  `<html data-brand="ink" data-theme="dark">`. Nothing in the prototype consumes the old
  selector today, but any code outside this repo would break silently.
- ⚠️ **BREAKING — light-mode text is visibly darker.** `text-secondary`, `text-tertiary`,
  `text-brand`, `text-brand-secondary` all changed. Affects every screen.
- Skins are now **12-step OKLCH ramps** from 2 preserved brand anchors. **0 raw hex remain**
  (was 42 of 60).
- **Dark surface ladder implemented** — resolves the v1.9 "known limitation" where `bg-secondary`
  equalled `bg-primary`. Hover now lightens instead of darkening.
- Primitive layer cleaned: role names removed, renamed to values.
- **Validation went from 16 checks to 540. 0 AA failures.** The old "16/16 AA per mode" claim was
  true but only tested against `bg-primary`.
- **Permanent rule:** contrast validation must **auto-discover tokens from `tokens/colors.css`**,
  never from a hand-written pair list. Hand-written lists missed tokens three times.
- Thinnest pair in the system: `text-success-primary` over `bg-tertiary` (light) = **4.51:1** —
  passes by 0.01. Re-validate if either value moves.

### A-bis. Accessibility layer — colourblind-safe vision mode + text scale (2026-07-24)

Started in the prototype (`nvjeronimo/skillup-lms-prototype`, PR #8), **now closed across all
three vertices: prototype (in production) · CSS handoff (synced) · Figma DS (published).**
Status: **accepted**, shipped into DS v3.3, live.

- **The insight:** the colourblind problem is not the brand colour (decorative) — it is the
  **state colours collapsing**. For a deuteranope, `warning ≈ error` (ΔE **3.9**). Because state
  colours are shared across all 6 skins, no skin choice fixes it.
- **The decision:** a new axis **`data-vision="cvd"`, orthogonal to skin and theme** — a
  colourblind user keeps their brand *and* gets safe states. Distinction moves off the red-green
  axis onto **blue-yellow + luminosity** (Okabe-Ito): success→blue, warning→amber, error→dark red.
  Separation **ΔE ≥18** (was 3.9), all AA in both themes. Toggle lives in the panel's
  "Accessibility" section.
- **Text scale** — `--sk-font-scale` variable + an A / A+ / A++ control, grouped in an
  **"Accessibility Standards"** subsection. Same data-attribute + toggle + CSS pattern as vision
  mode; deliberately kept non-complex for this phase.
- **Now in the DS (Figma):** **18 CVD primitives**
  `Colors/SKO-Brand/CVD/{Success,Warning,Error}/{text,solid,surface}-{light,dark}` (Okabe-Ito
  values), verified **1:1 against the prototype `colors.css`** (9 tiers × 2 modes, zero
  divergences). Plus a **`♿ Accessibility Standards` documentation page** — CVD swatches
  (normal → CVD-light → CVD-dark), the A/A+/A++ text scale, behaviours with WCAG refs, and the
  architecture note.
- **Documented in the handoff:** `variable-collections-guide.md` → new "Accessibility layer /
  Camada de acessibilidade" section (the 3 axes, the primitives, the mapping, and *why* most of it
  lives in CSS). CHANGELOG **v3.3**.
- **Architecture decision, recorded (give it its own record):** the **values** live as primitives
  in Figma; the **override** lives in CSS — because Figma variable modes are a single axis per
  collection and cannot conditionally alias across axes. Modelling `data-vision` / `data-text-size`
  / behaviour flags as variable modes would explode combinatorially (Semantics 4→8 on the vision
  axis alone). Same pattern as `[data-skin]` and `--sk-font-scale`, which already worked this way.
- **Redundant-encoding audit:** every state indicator already pairs colour with a non-colour
  signal (shape / icon / text / aria-label). Nothing to fix — reported honestly.

### B. Topic Types / Quizzes / edX (2026-07-22, extended 2026-07-24)

Recorded in `LMS-HANDOFF/topic-types-inventory.md` (updated Jul 21) + the new Figma page.

- **New Figma page `Topic Types — DS Screens` (`4834-17366`)** — **22 screens across 6 sections**,
  every one built from **DS library instances** (verified programmatically: no local components).
  Sections: `01 Quiz` · `02 Quiz results` · `03 VILT` · `04 Lab & Podcast` · `05 ORA` ·
  `06 Activity (SCORM) & Lesson Page`.
- **23 new DS components** added — domains `F · Assessments`, `D · Live / VILT`, and a new
  domain `L`. This means the "132 components" figure in `README.md` and `components-inventory.md`
  is **stale** — recount and correct it.
- **Pending cleanup:** section `00 · ARCHIVED — local drafts, superseded by the DS library
  (safe to delete)` still sits on that page, out of order between `01` and `02`. Nelson deletes it
  after validating the screens. Flag it as an open action, not as content.
- **Agreed terminology (Navdeep, Harpreet + team, Jul 21):** the items at Topic level are called
  **"Topic Content Types"** — Video, Reading, Podcast, Quiz, Lab, Programming Assignment, Final
  Project, VILT — *even though not all are technically assets*. Each type separately has an
  underlying asset/format. For every type we document: **1 Format · 2 Behaviour · 3 States ·
  4 Completion rules · 5 Assessment logic.**
- **12 types, 5 chrome families.** Reading + Video + VILT = **76% of all topics**.
  **VILT is the biggest gap — 19% of topics, no design yet.** Quiz is 2% by volume but
  **100% of the grade**.
- **3 blocked types** with no Open edX equivalent — Role Play, Dialogue, Programming Assignment.
  Each needs a build-or-buy decision before it can be designed.
- **Two architectural facts** that change the build: (1) a "topic" is a **unit** that stacks
  *multiple* components — the player needs a unit renderer, not one screen per type; Open edX
  stores **no `topic_type` field**. (2) Practice / Graded / Final Exam is **subsection metadata,
  not a type** — one problem renderer serves all three.
- **The 10-point registration rule** (§6) — a new Topic Content Type is only "done" when all ten
  entries are defined. Learned the hard way building the prototype. This deserves its own panel
  in Figma and its own decision record.
- **Mobile must stay in sync** (Harpreet). **Activity (SCORM) is not mobile-ready.**
- **12 open questions remain unanswered** (§7) — 8 for Rupali / content team, 4 for Rashid / devs,
  one flagged for Navdeep. Carry them forward verbatim into the reorg as open items with owners.

**Validation pass (2026-07-24) — the edX claims are now sourced, not assumed.** A 13-row
capability matrix (in the Figma discovery page, with a dated validation footer + source links) was
cross-checked against the live official docs (`docs.openedx.org`) and the internal
`edx-component-types-reference.md`. **No row failed. Two constraints hardened from convention to
documented hard limit** — this is exactly the "decision → source → edX basis" chain the whole
reorg is meant to make visible, so mirror the matrix into `02-content-types/`:

- **SCORM** — verified verbatim: **1 per unit · 1–15 MB · not mobile-ready**, community/third-party
  (`openedx-scorm-xblock`, Overhang.io), not core.
- **ORA** — **corrected**: was written as "typically 1 per unit" (assumption). Official docs say
  **multiple ORA in one unit cause submission errors** — a *hard* limit, same class as SCORM.
  Fixed in `topic-types-inventory.md` §6b, the Figma matrix, and the ORA lane badge. Question Q13
  (§7) is now resolved and narrowed.
- **The single remaining blocker is not platform-level, it is configuration-level:** whether *our*
  courses actually stack multiple components per unit, and whether any unit stacks more than one
  graded block. That cannot be answered from the platform docs — it needs a **real course export
  (SKOAIH01 → Studio → Export → OLX `.tar.gz`)**, which is not in the workspace. This is Q9/Q13
  and belongs at the top of `OPEN-ACTIONS.md`, owner Rashid.

**Content-type build-out (2026-07-28) — the Figma page is now near review-ready.** The Topic
Content Types work was consolidated into **one unified "Discovery + DS Build" page, 15 sections,
all in English**, every screen made from published-library instances:

- **Every content type now has its complete end-to-end flow**, not just a catalogue shot:
  Quiz (Practice · Graded · Final, each entry→question→results) · Quiz answer controls (radio /
  checkbox / A-B-C prefix) · VILT (Scheduled→Live→Recording) · Lab (not-downloaded→downloaded→
  complete) · Podcast (player→completed, auto at 90%) · ORA (9 steps) · Activity/SCORM
  (idle→loading→running→error) · Lesson Page (composite).
- **Quiz v1 removed, v2 adopted** — the old local drafts are gone, so the "delete section
  `00 · ARCHIVED`" open action is now largely closed (verify no stray archived section remains).
- **Buildability matrix + Asset Catalog / Composition** on the page, validated against
  `docs.openedx.org` — this is a first-class "source → edX basis" artifact; mirror it into
  `02-content-types/`.
- **Status: Ready for Review (validated 2026-07-28).** Page is **sections 01→11 + ZZ**, in order,
  zero overlaps, zero stale cross-refs; a top index/legend maps them. DS conformance verified —
  Entry Headers remote/white, ORA Stepper remote, screens 04–10 100% library instances, roster
  strips + buildability (99) + asset catalog (148) + index (35) all bound to `LMS/*` tokens, zero
  raw hex. One pre-existing loose frame (`ICP-Video-transcript-desktop`) sits beside the page.
  Still to do: the handoff message to HK / Navdeep / Rashid. Treat as *in review*, not *Ready for Dev*.
- **New open decision surfaced — Q9 enumeration prefix:** manual vs automatic numbering of
  answer options / steps. Add it to `OPEN-ACTIONS.md` as an open content decision.

### C. V8 Complementary Pages (2026-07-20)

- Screens are being migrated from raw frames to DS instances (see Track B above).
- **Bug fixed at master-component level:** `LMS / Completion Status` → `State=Pending` had its
  frame fill bound to `LMS/Foreground/fg-white` — a token hardcoded to white in *every* mode —
  while its siblings correctly used background tokens. In dark mode it rendered as a solid white
  blob. Rebound to `LMS/Background/bg-primary`; propagates to every `LMS / Topic Row` instance.
  Worth a decision record: **status chips must use background tokens, never foreground tokens.**

### In scope but OUTDATED — label as such, do not silently present as current

| What | File key | Node | Note |
|---|---|---|---|
| FigJam — LMS Learner Flow Diagram | `v5EiEKpYgXnUwoJs2DghCP` | `0-1` | Still the flow-diagram source, but **content is outdated**. To be refreshed in a later step. Every reference to it must carry an explicit "⚠️ outdated — refresh pending" note. |

### Out of scope — archive

- `zKo6WL3yRZ8fXHfeGKREDt` — "User DashBoard" (node `4176:361`), referenced from `Prework/`.
  **Prework is being archived**: it was handed to another team to decide on. Its decisions will
  be reintroduced later. Archive the folder intact and preserve the reference so it can be
  picked back up — do not delete, do not mine it for decisions.

### Known stale references — fix these as part of the reorg

1. The working file was **renamed** `Learner Platform Experience Discovery fase` → **`LMS ICP Phase 1`**.
   The old slug survives in `index.html` (~lines 537, 808, 920), `LMS-HANDOFF/README.md`,
   `LMS-HANDOFF/BA/00-README.md`. Links still resolve (Figma redirects by key) but display the
   wrong name. Update every occurrence to the new slug.
2. `index.html:920` labels the working file **"Design V4 — Learner Platform Experience Discovery
   wireframes"**. This is **substantially outdated** — V4 is history; the current work is V7 /
   Phase 1 plus the V8 track. Remove or relabel; if any V4 artefact is genuinely still useful,
   move it to `_archive/` and mark it as historical.
3. `LMS-HANDOFF/README.md` lists the Ready-for-Dev pages **by name only, with no links**. Every
   Ready-for-Dev page — in the handoff table and in `01-ready-for-dev/` — must carry its Figma
   deep link (file + node-id). Known gaps with no node-id yet:
   - `↳ Phase 1 - Overlay Panels - Ready for Dev ✅`
   - `↳ Phase 3 - Completion + Certificate - WIP 🟠`
   Mark these `NODE-ID MISSING — ask Nelson`. **Never invent a node-id.**

### Rule

Any Figma key or node-id NOT in the tables above is unverified. After the reorg, grep for the old
slug `Learner-Platform-Experience-Discovery` and for `Design V4` — zero hits allowed.

## Goal

Make this folder the single, current, self-explanatory source of project truth, then sync it to
the LMS Hub so any colleague — **Designer, Developer, or Stakeholder** — can land on the hub and
within 2 minutes understand: what was decided, why, what is Ready for Dev, and what is still
being built.

Three audiences, three needs. Every page must serve all three explicitly:
- **Stakeholder** — what was decided, why, what changes for the learner, what's the status.
- **Designer** — which Figma page/node, which tokens/components, which variants.
- **Developer** — the spec, the business rules, the tokens/CSS, the edX capability it maps to.

## Non-negotiable rules

1. **Never hard-delete.** Move superseded material to `_archive/<YYYY-MM>/` and log it.
   Only exception: OS junk (`.DS_Store`, `.~lock.*`, `.playwright-mcp/`) — delete those.
2. **Commit before touching anything**: `git add -A && git commit -m "checkpoint before reorg"`.
   Use `git mv` for tracked files so history is preserved.
3. **Do not break the hub.** Every path you move must have its references updated in
   `index.html`, `prd/index.html`, `_deploy.sh`, and any README. Verify by grepping for the old
   path AFTER the move — zero hits allowed.
4. **Heavy media stays out of git.** `Design System Discovery - Demo Session/` is 456 MB (a `.mov`),
   `Coursera LMS immersive course/` is 32 MB, `v7-storybook/` 19 MB, `Active Workspace _ Notes _
   AI.html` 7.9 MB. Keep them local, add to `.gitignore`, and replace each with a small
   `README.md` stub saying what it is, where it lives, and what was extracted from it.
5. **Every claim needs a source.** No orphan statements. See the Decision Record format below.

## Phase 0 — Audit first, DO NOT MOVE ANYTHING YET

Produce `_REORG-PLAN.md` at the root containing:

- Full inventory: every file/folder → `KEEP` / `MOVE (to where)` / `MERGE (with what)` /
  `ARCHIVE (why)` / `DELETE (junk only)`, with last-modified date and a one-line reason.
- The duplication list, resolved. Known overlaps to decide on explicitly:
  - `maven-icons/` (root) vs `design-system/maven-icons/`
  - `_history/` vs `LMS-HANDOFF/history/`
  - `storybook/` vs `v7-storybook/`
  - `LMS-HANDOFF/tokens/` vs `Design System Tokens/`
  - `v5-prototype/` vs `v7-hk/` vs `skillup-lms-redesign/project/` vs `_workspace/prototypes/`
  - root `FRD_*.docx` / `ICP_PRD.docx` vs `LMS-HANDOFF/BA/FRDs/`
  - loose root files: `verify-*.png`, `nav-variants-mockup.html`, `session-ocr-partial.md`,
    `footer-contract.md`
- Already decided, no need to re-ask: **`Prework/` → archive** (handed to another team).
- A "what is genuinely current vs stale" call for each doc, justified by date + CHANGELOG +
  git log — not by guessing.
- Anything you are NOT sure about → list under "NEEDS NELSON'S DECISION", do not guess.

**STOP and show me the plan. Wait for my approval before executing.**

## Phase 1 — Target structure

Proposed (refine it in the plan if you find something better, but justify any change):

```
/
├── index.html                 # Hub — GitHub Pages entry
├── README.md                  # NEW: "Start here" — 1 page, 3 audience paths
├── 00-decisions/              # NEW: decision log, one file per decision (ADR style)
├── 01-ready-for-dev/          # Track A — screens signed off for dev (Phase 1)
├── 02-content-types/          # Track A — topic/component types in progress (edX parity)
├── 03-design-system/          # Tokens, variables, LMS components, shareable atoms
├── 04-research/               # Personas, audits, benchmarks, session transcripts
├── 05-source-docs/            # FRDs, PRDs, BA docs, spreadsheets (client/BA inputs)
├── 06-v8-complementary/       # Track B — V8 Complementary Pages (SkillUp Brand), WIP 🟠
├── 90-prototypes/             # v5, v7, storybook builds, redesign explorations
├── _archive/YYYY-MM/          # Superseded, dated, with ARCHIVE-LOG.md (incl. Prework/)
└── _media/                    # Heavy binaries — gitignored
```

Keep `LMS-HANDOFF/` as the deployed package, but make it a *view* over the above rather than a
parallel copy — no content should exist in two places. If keeping `LMS-HANDOFF/` as the physical
home for handoff docs is simpler for the deploy script, say so in the plan and invert accordingly.

Every folder gets a `README.md`: what's in it, who it's for, what's current, what's archived.

## Phase 2 — Content requirements

### 2a. Decision Records (`00-decisions/`)

One file per decision taken. Filename: `NNN-short-slug.md`. Frontmatter + body:

```
---
id: 007
title: Transcript notes anchored to timestamp
date: 2026-06-25
status: accepted | superseded-by-NNN | proposed
audience: [designer, dev, stakeholder]
track: A | B          # A = LMS ICP Phase 1, B = V8 Complementary Pages
phase: 1
---
**Decision** — one sentence.
**Why** — 2–4 bullets, the actual reasoning.
**Source** — meeting/transcript/doc + date, with a relative link to the file in this repo.
**edX basis** — the edX capability/doc that supports or constrains this, with URL.
**Design** — Figma page + node id, deep link.
**Dev impact** — components/tokens/BRs affected.
**Alternatives rejected** — and why.
```

**Primary source — start here:** the Figma page `↳ Diagram Flows + Business Logic` (node
`3832-18102`) already holds **42 business rules, 10 decisions, and 24 documentation links**
(per `LMS-HANDOFF/README.md`). Read it via the Figma MCP and use it as the backbone of the
decision log. Then reconcile and top up from: `LMS-HANDOFF/CHANGELOG.md`, `LMS-HANDOFF/BA/`,
the session transcripts, `Design System Tokens/*.md`, `_history/`, and the git log.

Build an `INDEX.md` in `00-decisions/` — a table filterable by track / phase / status / audience.

**Do not invent decisions.** If the rationale isn't recorded anywhere, write the decision with
`Why: NOT DOCUMENTED — confirm with Nelson`.

### 2b. Ready for Dev (`01-ready-for-dev/`)

One entry per screen/flow marked Ready for Dev, each with: status badge, Figma deep link
(file + node-id), breakpoints covered (D/T/M), components used, tokens used, business rules that
apply, edX reference, and the decision ids (`00-decisions`) that shaped it.
Cross-check against `LMS-HANDOFF/screens-spec.md`, `overlay-panels-spec.md`, `phase1-readiness.md`.

### 2c. Content Types (`02-content-types/`)

The Topic Content Types currently in development. `LMS-HANDOFF/topic-types-inventory.md` is
already the authoritative document — **do not rewrite it, wire it in**. Add the canonical Figma
link (`4692-444`, the unified Discovery + DS Build page), split section 7's 12 open questions
into trackable items with owners (Rupali / Rashid / Navdeep), and cross-reference
`edx-component-types-reference.md`, `edx-parity-audit.md` and `quizzes/`.

This section is the clearest case in the whole project for the three-audience rule, so make it the
worked example: a **stakeholder** should see which types exist, what share of the course they
cover and what is blocked; a **designer** should land on `4692-444` for behaviour, flows and the
built screens; a **developer** should get the edX mapping from §6, the buildability matrix, and the
10-point registration rule. Same content, three doors.

Per type surface: format · behaviour · states · completion rules · assessment logic (the agreed
5-point deliverable), plus what edX supports natively, the gap, the decision, status, and owner.
Give the **10-point registration rule** (§6) its own page — it is a reusable design rule, not a
footnote.

### 2d. Design System (`03-design-system/`)

Consolidate `LMS-HANDOFF/tokens/` + `Design System Tokens/` + `variable-collections-guide.md` +
`components-inventory.md` + `storybook-coverage.md` into one coherent section covering:

- **Publication status** — v3.3 is **published in Figma (2026-07-24)**: 1052 variables, 18 CVD
  primitives, verified 1:1 against `colors.css`. The old "consumers see v2.0" blocker is resolved.
  Note only the residual nuance: a formal human side-by-side review of the 6 skins was not run
  (maths-validated + published on Nelson's call).
- **Variables/tokens** — the `--sk-*` namespace, **6 skins** (SKO + gold/violet/sky/red/ink) ×
  light/dark, the breakpoints axis, the accessibility axes (`data-vision`, text scale), the
  540-check AA validation. Explain what changed across **v3.0 → v3.3 vs v2.0** and why, including
  both v3.0 breaking changes.
- **Accessibility layer** — the CVD vision mode + text scale (see A-bis): 18 CVD primitives, the
  `♿ Accessibility Standards` page, and the values-in-primitives / override-in-CSS architecture.
- **Notes/conventions** — naming, 0-raw-hex, primitives-carry-values-not-roles, dark surface
  ladder, hover-lightens-in-dark, status chips use background tokens (never foreground),
  validation auto-discovers from `colors.css`, accessibility axes live in CSS not variable modes.
- **LMS components** — the DS-hosted components on `1030-33572`. **Recount:** the documented
  figure of 132 predates the 23 components added on 2026-07-22 (domains F, D, L).
- **Shareable atoms/components** — what is reusable outside the LMS vs LMS-specific.

### 2e. V8 Complementary Pages (`06-v8-complementary/`)

Track B. Scope, current state, what's WIP, Figma deep link (`4340-322`), and how it relates to
Track A (shared DS? shared tokens? divergent brand direction?). Keep it short — it's a discovery
in progress, not a handoff. Mark everything WIP 🟠.

## Phase 3 — Hub sync

Update `index.html` so the hub:

- Opens with a **"This week's decisions"** section and a **Ready for Dev** section, both filterable.
- Has an explicit **audience filter/toggle: Designer | Dev | Stakeholder** — same content,
  filtered to what each needs.
- Has a **track filter: Phase 1 (A) | V8 Complementary (B)**.
- Shows a status legend (Ready ✅ / WIP 🟠 / Not started ⚪ / ⚠️ Outdated) used consistently.
- Every card links to: the spec, the Figma node, the edX reference, and the decision record.
- Marks the FigJam flow diagram explicitly as **⚠️ outdated — refresh pending**.
- Carries a **persistent banner** while DS v3.0 remains unpublished in Figma, stating that
  consumers still see v2.0 and the visuals are unreviewed. Remove it only when Nelson says the
  library is published.
- Surfaces the **open-actions register** (below) — a colleague should see what is blocked and on
  whom without asking.
- Shows a "last updated" date driven by the CHANGELOG.

Update `_deploy.sh` to stage the new paths. **Do NOT run the deploy or push** — leave that to me.

## Deliverables

1. `_REORG-PLAN.md` (Phase 0) — **approved by me before anything moves**.
2. The reorganized tree with a README in every folder.
3. `00-decisions/` populated + `INDEX.md`.
4. `_archive/ARCHIVE-LOG.md` — what was archived, from where, why, on what date.
5. An updated root `README.md` and `LMS-HANDOFF/CHANGELOG.md` entry describing the reorg.
6. **`OPEN-ACTIONS.md`** — a single register of everything blocked or pending, with owner and
   source. Seed it with what is already known:
   - **Export SKOAIH01 (OLX `.tar.gz`)** to validate multi-component / multi-graded per unit
     (Q9/Q13) — the last platform-vs-config unknown — *Rashid*
   - *(done 2026-07-24 — record as closed, not open)* Figma library re-published (v3.3, 1052 vars,
     18 CVD primitives) · all 10 prototype PRs merged. Keep in the log as completed for provenance.
   - Optional, non-blocking: a formal human side-by-side review of the 6 published skins — *Nelson*
   - Promote the unified Topic Content Types page to **Ready for Review** + 15-section index —
     *in progress 2026-07-28* — then gather HK / Navdeep / Rashid review — *Nelson*
   - **Q9 — enumeration prefix decision:** manual vs automatic numbering of answer options/steps
   - Verify no stray `00 · ARCHIVED` section remains after the Quiz v1→v2 adoption — *Nelson*
   - Align the progress-ring token name in the prototype/handoff to the DS variable
     `fg-success-secondary` (#17b26a light / #47cd89 dark) — near-done, naming only — *Nelson*
   - Recount LMS components (132 + 23 new) and correct `README.md` / `components-inventory.md`
   - Node-ids missing for Overlay Panels and Phase 3 Completion+Certificate — *Nelson*
   - Refresh the FigJam LMS Learner Flow Diagram — *deferred, next step*
   - The 12 open questions in `topic-types-inventory.md` §7 — *Rupali (content) · Rashid (devs) · Navdeep*
   - Build-or-buy decision for Role Play / Dialogue / Programming Assignment
   - VILT design — biggest gap, 19% of topics, nothing designed yet
7. A final summary listing: files moved, files archived, duplications resolved, broken/stale links
   found & fixed, and the open questions that still need my decision.

## Style

Concise. Tables over prose. No marketing language. A stakeholder should understand a page without
knowing edX or Figma; a dev should find the spec without reading the stakeholder framing.
Portuguese is fine in chat with me, but all files stay in English.
