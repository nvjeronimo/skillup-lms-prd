# Project Memory — Enrolled user views

> Quick-reference context for any new Claude session in this project. Read this first; only dive into `SkillUp_ICP_Handoff.html` if you need the full narrative behind a decision.

## What this project is

Design surface for **enrolled-user journeys** on top of the **OpenEdX** framework (specifically the `frontend-app-learning` MFE — Learning MFE — using the Frontend Plugin Framework, no fork). This folder holds visual references, interactive HTML prototypes, and design system documentation for the post-enrollment learner experience.

When the user says **"the SkillUp project"**, **"the ICP"**, **"the course player"**, **"enrolled user views"**, or **"the learner experience"**, they mean this work.

## Where things landed (current state — April 2026)

- **`SkillUp_ICP_v6.html`** — the canonical, final interactive prototype. ~124KB single file, no external deps except Google Fonts. This is "where we landed." Open this to see the latest design direction.
- **`SkillUp_ICP_Handoff.html`** — narrative handoff doc covering the full v1→v6 journey, every design decision and the "why" behind it. Use as reference, not as the source of truth for current state.

The product is called the **Immersive Course Player (ICP)** — also known internally as the "immersive experience interface." Industry-standard term: Course Player.

## Brand & design system (locked in v6)

**Fonts (three-font system)**
- Montserrat — all UI ≤24px (weights 400/500/600)
- Playfair Display — display/marketing only, ≥28px (weights 600/700)
- Outfit — small-caps label tier and tabular numerics: eyebrows, MODULE labels, timestamps, counters, meta. Used uppercase with `letter-spacing: 0.1em` for caps; `font-variant-numeric: tabular-nums` on numeric contexts so digits stay aligned as values change. Replaced JetBrains Mono in v6 — mono sat too tall and blocky in caps; Outfit is shorter, friendlier, and contrasts cleanly with Montserrat's architectural feel.

**Type scale:** 10 / 12 / 14* / 16 / 20 / 24 / 28 / 32 / 40 / 48 px. Multiples of 4, with **14px as the single allowed exception** (UI body workhorse). Label tier sizes are 11px (`--label-sm`) and 13px (`--label-base`).

**Brand colours (extracted from SkillUp logos)**
- Brand Navy `#1B3D4F` — primary text (light), surface walk (dark)
- Brand Teal `#0F5C74`
- Brand Cyan `#0096C7` — primary accent (dark mode); the "Up" in the wordmark
- Brand Sky `#51BFFC` — filled brandmark circle
- Light-mode accent: `#005A82` (cyan darkened for WCAG AA on white)

**Semantic colours (from SKO component library)**
- Success `#27A96E` (dark) / `#0A7656` (light) — completion & correct answers (semantically distinct from cyan)
- Amber `#F5A623` — warning/quiz states
- Error `#E24B4A` — wrong answers

**Accessibility:** Fully WCAG 2.1 AA compliant. Key rule: **white text on cyan, never black** (white = 7.2:1 AAA; black = 2.9:1 fail).

**Logos:** Six SVGs inlined directly in the HTML (not base64 PNGs). Switching driven by theme + viewport: full-colour on light desktop, white monotone on dark desktop, brandmark only ≤480px.

## Key architectural decisions to respect

1. Built **inside** `frontend-app-learning` via the Frontend Plugin Framework. No MFE fork.
2. Mobile sidebar is a **slide-over drawer** (position:fixed + translateX), never a zero-width grid column.
3. Breadcrumb truncation is **3-tier**: ≥960px shows all crumbs (unit ellipsis-truncates); 640–960px hides the course crumb; ≤480px shows only the active unit name.
4. Three AI-panel implementation options are on the table — XBlock, MFE Plugin, iFrame. Plugin is the leaning recommendation.
5. Cyan (interactive) and green (completion) are kept semantically separate.

## What's already built into v6

Three-panel layout (sidebar / video+content / AI panel) · light/dark toggle · responsive breakpoints at 1100/960/768/480 · animated video player with CC, seek, speed, skip · live transcript with click-to-seek · notes panel, downloads tab, discussion tab · full quiz journey (start → questions with instant feedback → results ring) with three quiz sets (Module 1, Module 2, Final) · AI assistant panel with typewriter streaming · keyboard shortcuts (Space, ←/→, C, D) · sidebar completion state updates after quiz.

## How to work in this project

- New flows or screens should extend the v6 design system — don't reinvent typography or colour.
- When designing a new view, default to standalone interactive HTML (matches v6's pattern) unless the user asks for something else (PRD, Figma-style spec, etc.).
- The user's working style: iterative, screenshot-driven feedback, asks "what do you think?" when open to alternatives — present options with trade-offs, don't just pick silently.
- The user cares about brand fidelity, WCAG compliance, and responsive correctness. Surface concerns about any of these proactively.

## Open / likely-next areas

The handoff frames v6 as the **enrolled-user course-consumption view**. Adjacent journeys for enrolled users that haven't been designed yet are likely candidates for future work in this folder: dashboard / my-learning home, course catalogue (post-enrollment), profile, certificates, discussion-forum deep view, mobile-first variants, instructor/admin views (if scope expands).
