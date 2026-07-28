# Handoff Package Changelog

Current version. For previous releases see `history/CHANGELOG-archive.md` (v1.0 → v1.7).

## 2026-07-28 · Repository reorganization (structure, not a DS version)

Folder-level reorg — the DS version of record stays **v3.3**. Made the workspace self-explanatory
for three audiences (stakeholder / designer / dev):

- **New numbered structure at root:** `00-decisions/` (23 ADRs + INDEX, backboned from Figma
  `3832-18102`), `01-ready-for-dev/`, `02-content-types/` (wires `topic-types-inventory.md`, splits
  §7 into owned questions, promotes the 10-point registration rule), `03-design-system/` (rationale +
  footer-contract; points to the shipped tokens here), `04-research/`, `05-source-docs/`,
  `06-v8-complementary/` (Track B). `LMS-HANDOFF/` kept as the deployed package (hybrid).
- **New registers:** root `README.md` (3-audience "start here"), `OPEN-ACTIONS.md`,
  `_archive/ARCHIVE-LOG.md`.
- **Heavy media** (456 MB `.mov`, Coursera captures, 7.9 MB HTML) → `_media/` (gitignored) + stubs.
- **Archived:** `Prework/` (intact — handed to another team), 5 `verify-*.png`, `session-ocr-partial.md`.
- **Stale fixed:** the "NOT YET PUBLISHED" caveats on v3.0/v3.1/v3.3 (published 2026-07-24); the old
  Figma slug in README/BA; "132 components" → ≈155 (recount pending); removed the orphan
  `design-system/maven-icons/` duplicate.
- **Hub (`index.html`):** audience (Stakeholder/Designer/Dev) + track (A/B) filters, This-Week
  Decisions · Ready-for-Dev · Open-Actions sections, status legend, hub-stale banner.

## v3.3 — 2026-07-24 (current) · Accessibility layer + softer decorative borders

> ✅ **PUBLISHED IN FIGMA 2026-07-24.** 1052 variables · 18 CVD primitives · verified 1:1 against
> `tokens/colors.css` (zero divergences). The earlier "DS variables changed, consumers still see
> v2.0" blocker is **resolved** — the triangle (Figma DS · CSS handoff · prototype) is aligned.

### Accessibility Standards (see `variable-collections-guide.md`)

Three axes orthogonal to skin and theme, documented on the Figma page **`♿ Accessibility Standards`**:

- **Colourblind-safe states** (`data-vision="cvd"`) — retunes success/warning/error to an
  Okabe-Ito red-green-safe palette. State colours collapse under CVD (warning ≈ error, ΔE 3.9 for
  deuteranopes); the safe palette separates by blue-yellow + lightness (ΔE ≥ 18), all tiers AA.
  **18 new primitives** `Colors/SKO-Brand/CVD/*`, verified 1:1 against the prototype CSS. The
  `[data-vision]` override lives in CSS (Figma can't conditionally alias across axes).
- **Text size** (`data-text-size`, `--sk-font-scale`) — 100 / 115 / 130%, `.sk-text-*` via calc.
- **Behaviour flags** — reduce-motion, underline-links, large-targets. CSS-only, never variables.

Implemented and running in the prototype (demo panel → Accessibility Standards). Prototype-first;
the DS codifies the values + documents the mechanism.

### Softer decorative borders

`border-secondary` was too heavy (N04). Softened both modes: light → `Neutral/150` (`#d5dce2`),
dark → `Dark-Neutral/650` (`#2c3d45`). Decorative border, exempt from the 3:1 non-text rule.

## v3.1 — 2026-07-22 · Prototype sync — attribute, solid tokens, video stage

> ✅ Published as part of the v3.3 library release (2026-07-24).

Aligns the DS with the deployed prototype (`lms-prototype-mu.vercel.app`), which already consumed
`--sk-*`. A full diff (408 → now 456 comparisons) drove the changes below. See
`modules/skin-switcher/PROTOTYPE-SYNC.md` for the prototype-side work.

### ⚠️ Breaking

- **Attribute `data-brand` → `data-skin`.** The prototype uses `data-skin`; the DS aligned to it
  (lower friction — the DS side wasn't published). `colors.css` and the skin-switcher module both
  updated. Markup using `data-brand` now silently falls back to SKO.

### New tokens (created in Figma)

Rule applied: DS is the source, tokens mirror both ways, and a *fundamental* prototype-only token
is created in the DS too.

- **`bg-success-solid` + `fg-success-on-solid`**, **`bg-warning-solid` + `fg-warning-on-solid`** —
  the prototype had success/warning solid fills but the DS only had `bg-error-solid`. Created to
  complete the triad. The prototype's `warning-solid` (`#ac7720`) failed AA with *any* label
  (white 3.88, dark 3.95); the DS uses `#f9c654` (Yellow/300) with a dark label, 9.64:1.
- **`bg-brand-stage`** — the video-stage backdrop. The prototype derived it as
  `color-mix(#26708e 58%, #000)` with the teal **hardcoded**, so it was dark teal in every skin
  (a bug). In the DS it follows the skin (each ramp's step 900) and is theme-stable.

### Not mirrored (with reason)

- **`fg-like`** — resolves to `#0086c9`, which *is* `fg-progress`. A semantic duplicate, not
  created. The prototype should point `fg-like` at `fg-progress`.

### Prototype still to do

The prototype must adopt `colors.css` v3.1 wholesale — its brand colours are still derived with
`color-mix()` from an anchor instead of using validated ramp steps, which reintroduces the
dark-hover-darkens bug fixed in v3.0. Three DS tokens are also absent there, including
`border-focus-ring` (WCAG 2.4.7). Full checklist in `PROTOTYPE-SYNC.md`.

### Validation

38 LMS tokens · 456 Figma↔CSS comparisons, 0 divergences · 552 contrast checks, 0 AA failures.

## v3.0 — 2026-07-22 · Skin system, dark surface ladder, primitive-layer cleanup

> ✅ **PUBLISHED IN FIGMA 2026-07-24** (as part of the v3.3 library release). Consumers now see
> v3.x. One residual nuance, non-blocking: the visual changes were validated by contrast maths and
> published on Nelson's call — a formal human side-by-side review of the 6 skins was never run.

Triggered by a review of the DS against dark-theme best practice. What started as a colour audit
surfaced structural problems: the skins were hand-picked values with no rule, and the primitive
layer carried role names instead of values.

### ⚠️ Breaking

- **`[data-brand="x"]` no longer exists.** The green demo BrandX was replaced by 5 named skins:
  `gold`, `violet`, `sky`, `red`, `ink`. Markup using `data-brand="x"` silently falls back to SKO.
  New usage: `<html data-brand="ink" data-theme="dark">`.
- **Light-mode text is visibly darker.** `text-secondary`, `text-tertiary`, `text-brand` and
  `text-brand-secondary` all changed. This affects every screen — see "Text hierarchy" below.

### Skin system — from hand-picked to systematic

The 5 non-SKO skins had **42 of 60 values as raw hex**, bypassing the primitive layer entirely.
Only SKO was fully aliased. Each skin now has a **12-step ramp generated in OKLCH** from two
preserved brand anchors (`solid-dark` = 400, `solid-light` = 600), plus 2 deliberately desaturated
surface anchors outside the ramp.

Roles map to fixed positions — no per-skin choices. **0 raw hex values remain.**

This was not cosmetic: the Ink skin's brand text sat at **3.50:1**, below even the 3:1 floor. It
failed because the value was picked by hand. With `text-dark` fixed at step 300, that class of bug
cannot recur.

### Dark mode

- **Surface ladder implemented.** The v1.9 "known limitation" (`bg-secondary` = `bg-primary`, both
  `#212934`) is resolved — 4 distinct surfaces ~1.07:1 apart (`Dark-Neutral/950→700`).
- **Hover now lightens** (step 300) instead of darkening. 5 of 6 skins were darkening on hover,
  which sinks the control against the surface.
- `bg-error-solid` desaturates in dark (`#E26567`) with a dark label — it was the only token in the
  system that never inverted.

### Primitive layer — values, not roles

Role names were removed from `_Primitives`. `Surface-Base` → `Dark-Neutral/950`, `Teal-Text` →
`Dark/Teal/300`, and so on. `Primary` and `Neutral` were numbered by luminosity in the
`{step}_{brand_code}` format the accent ramps already used — brand-guideline codes are preserved.

The single exception is **surfaces**, and it is measured, not convenience: every dark surface falls
below the darkest step of the ramp it would belong to. They live in explicit `Surfaces/` groups.

### Text hierarchy (light)

`bg-tertiary` (`#E1E7EC`) imposes a ceiling of L ≈ 40% on any text over it. The old values were
above that ceiling and failed AA. Two new interpolated Neutral steps were created to fix it:

| token | was | now | worst case |
|---|---|---|---|
| `text-secondary` | `#606B7A` | `#39414C` — `Neutral/800` | 4.34 → **8.28** |
| `text-tertiary` | `#677482` | `#4F5B69` — `Neutral/700` | 3.83 → **5.55** |
| `text-brand` + `-secondary` | brand step 600 | brand step **700** (950 on Ink) | 4.29 → **6.13+** |
| `text-error-primary` (light) | `#DA3336` | `#B62226` — `Red/600_AC3` | 3.74 → **5.19** |
| `text-error-primary` (dark) | `#E8797B` | `#F3AFB0` — `Red/50` | 4.34 → **6.74** |

**Side effect worth naming:** `text-secondary` and `text-tertiary` were 3pp of luminosity apart —
visually the same colour. The hierarchy existed in the tokens but not on screen. They are now 10pp
apart, and primary→secondary 13pp.

### Validation

Contrast coverage went from **16 checks to 540** (9 text tokens × 4 surfaces × 12 skin/mode
combinations, plus 9 explicit semantic pairs). **0 AA failures.**

The v1.9 claim of "16/16 AA per mode" was true but far too narrow — it only tested against
`bg-primary`. Testing against elevated surfaces is what exposed every failure fixed above.

**Validation must auto-discover tokens from `tokens/colors.css`, never from a hand-written pair
list.** Hand-written lists missed tokens three times during this work; the last miss caught
`text-brand-primary` and `text-brand-secondary`, never tested before.

Thinnest pair in the system: `text-success-primary` over `bg-tertiary` in light = **4.51:1**.
Passes by 0.01 — re-validate if either value moves.

### Removed

`!!! ABOUT THIS COLLECTION` (4, content preserved in `variable-collections-guide.md`) ·
`Dark/Teal-Solid` (orphan) · `Skins/Font/family-*` (2, dead duplicates of `Type/family/*`) ·
`Dark/Teal-Hover` (absorbed into `Teal/300`) · `Dark/{Success,Warning,Progress}` (repointed to their
accent ramps) · `hover_Y01_Yellow_Hover` (redundant alias) · 7 orphaned `Skin-Anchors`.

### Unchanged

- Typography tokens and the 47 text styles — untouched.
- Brand-guideline codes (`P01`–`P08`, `N00`–`N06`, `AA`/`AB`/`AC`/`AD` accents) — preserved.
  Numbering is additive, never substitutive.
- Dark-mode neutral text values — only light mode was retuned.

### Known debt

- `Type/family/*` sits in the `3. Responsive` collection, whose mode axis is breakpoints. Font
  family does not vary by screen size. See `variable-collections-guide.md` for why it was not moved
  and what should trigger the fix.

## v2.0 — 2026-06-25 · Token consolidation (--sk- namespace)

Consolidation of the DS tokens following the Design System Discovery and the V7 Immersive token-modes work. Closes the token system.

### Changes
- **Namespace migrated `--lms-*` → `--sk-*`** across `tokens/colors.css` and `tokens/typography.css`. One system namespace for all brands (never per-brand prefixes). The `sk` is the SkillUp Design *System*, not the brand.
- **Typography fixed to Montserrat** (body + display). The previous Inter primary was stale; Inter is not used.
- **Model documented** (see `../03-design-system/rationale/`): brand × scheme combined colour modes (live v1.9); a separate Breakpoints axis (Desktop/Tablet/Mobile) for size/space/radius; font-size uses Option B (chaining) for brand × breakpoint; radius/border vary by brand via role tokens that re-alias per mode; hex only in Primitives.
- **New component:** Input field gains a `Search` type (14 derivations) + reusable `Keyboard key` component with a togglable `Shortcut` property (DS file).

### Unchanged
- The 4 colour modes and all WCAG 2.2 AA validations from v1.9 stand (only the prefix changed).

## v1.9 — 2026-06-16 · 4-mode tokens + WCAG 2.2 AA validated

LMS colour system now operates across 4 modes on the UUI DS file (`c7EUDrQwP8si08aPipDSIV`), collection `1. Color modes`. Every mode passes 16/16 WCAG 2.2 AA contrast checks.

### Modes implemented

| Mode | Strategy |
|---|---|
| Light SKO (default) | Existing teal-on-white. border-primary upgraded N04 → N03 for AA pass |
| Dark SKO | Inverted backgrounds + lighter blues for brand. 4 fixes applied |
| Light BrandX | Green scale AB01-AB06 mirrors SKO blue structure. Demo brand |
| Dark BrandX | Lighter greens (AB04-AB05) on dark neutrals |

### New tokens

- **`LMS/Border/border-focus-ring`** — semantic token for WCAG 2.4.7 Focus Visible. Maps to brand colour per mode (P03 Light SKO / P05 Dark SKO / AB02 Light BrandX / AB04 Dark BrandX).

### New primitive

- **`Colors/SKO-Brand/Accents/Red/AC5b_Red5b` #E8797B** — added to fill the gap between AC5 (saturated red, 4.39 on dark, fails AA by 0.11) and AC6 (pale pink). Gives 5.21:1 on dark. Used by `text-error-primary` in Dark SKO + Dark BrandX only.

### Key Dark SKO fixes

| Token | Was | Now | Reason |
|---|---|---|---|
| bg-brand-hover | Y01 Yellow (bug) | P02 Blue Ink | Leftover yellow from Light mode default |
| text-brand-secondary on badge | P05 (2.99) | P07 (7.5+) | Failed AA on bg-brand-section (P02) |
| bg-brand-solid + text-on-brand | P04 + White (3.94) | P05 + N01 dark (5.43) | Flipped contrast for dark mode button |
| border-primary | N04 (2.71) | N03 (4.20) | AA-compliant neutral |
| text-error-primary | AC5 (4.39) | AC5b (5.21) | New primitive |

### Token validation

DS swatch sheet at node `20022:429459`, page `❖ FOUNDATIONS`. Renders 4 columns side-by-side using `setExplicitVariableModeForCollection` — each column shows live token values + contrast ratio + ✓/✗ per check.

### Code consumption

`tokens/colors.css` now ships 4 mode definitions:
- `:root` → Light mode SKO (default)
- `[data-theme="dark"]` → Dark mode SKO
- `[data-brand="x"]` → Light mode BrandX
- `[data-brand="x"][data-theme="dark"]` → Dark mode BrandX

Toggle via root HTML attributes. No JS required — CSS attribute selectors handle the switch.

### Known limitations

- `bg-secondary` = `bg-primary` in Dark modes (no intermediate dark neutral in scale)
- BrandX is a demo brand. No client behind it.
- WCAG 2.5.8 Target Size validated in screens, not in DS.

## v1.8 — 2026-06-15 · DS migration + handoff page conventions

Major restructure of the Figma handoff. Three new pages built, 132 LMS Extension Components migrated to the DS library, all working-file handoff instances now point to DS-hosted masters.

### DS migration

- **132 LMS Extension Components moved** from working file (`Wz2TCYFVr0hD8tJNiLajLt`) to DS file (`c7EUDrQwP8si08aPipDSIV`) on new page `❖ LMS COMPONENTS ✅` (`1030:33572`)
- 40 top-level masters + 92 variants inside sets
- All instances in handoff screens swapped via `importComponentByKeyAsync` + `swapComponent` — 99.7% remote in Section 02
- Local backup copies kept on the working file Playground page for reference until next major DS sync
- Component keys saved in auto-memory `reference_uui_lms_components_keys.md`

### New variant: LMS / Empty State · Kind=Transcript

- Title: "Transcript not available"
- Body: "Captions aren't available for this video. You can still take notes from the Notes tab."
- Icon: align-left (DS 3463:406358)
- CTA: "Add note"
- Use when a Video topic has no captions — applied automatically on Transcript tab empty state

### New handoff pages

- **`↳ Phase 1 - Video Lesson - Ready for Dev ✅`** — 15 cards (5 rows × 3) with hierarchical numbering (1/1.2/1.3 for Transcript, 2/2.2/2.3 Notes, 3/3.2/3.3 Downloads, 4/4.2/4.3 Player states, 5/5.2/5.3 Note Editor Modal). Each card uses Handoff card header + Subheader + screen-wrap (#C6D0E3) + Page Changelog Header (slot-based).
- **`↳ Phase 1 - Overlay Panels - Ready for Dev ✅`** — 6 cards (2 rows × 3): Notifications D/T/M + Saved D/T/M.
- **`↳ Phase 3 - Completion + Certificate - WIP 🟠`** — 6 cards (2 rows × 3): Course Complete Modal D/T/M + Certificate D/T/M. All descriptions flagged as Phase 3 placeholders with Phase 1 baseline notes.
- **`↳ Diagram Flows + Business Logic`** — Navigation flow diagram + new Business Logic section: 42 Business Rules (8 domain cards), 10 Key Decisions callouts, 24 Reference Document links (BA + Formal + Engineering handoffs).

### Handoff page conventions (now enforced)

- Page name format: `       ↳ Phase X - Flow Domain - Status [emoji]`
- Outer section BG: `#B7B7B7` · screen-wrap inside cards: `#C6D0E3`
- Pages live under parent `READY FOR DEV ✅`, ordered by Phase then logical flow
- Saved to auto-memory `reference_handoff_page_conventions.md`

### DS contributions (Status badges + Card chrome)

- **Status badges** added to DS Design Annotations page: Status/Deferred (`19951:1957`), Status/Draft (`19951:1959`)
- **Handoff card header** promoted to DS component (`19952:1961`) with props: Sequence#0, Title#0, Status#0 (INSTANCE_SWAP), Phase#0 (INSTANCE_SWAP), Show Sequence#0 (BOOLEAN)
- **Page Changelog Header** uses native Figma SLOT primitive (Option D) for dynamic Recent Changes
- All keys saved in auto-memory `reference_uui_handoff_keys.md`

### Cleanup

- 10 inline Figma annotations migrated to Page Changelog descriptions, then removed
- Duplicate orphan card frames cleaned from Diagram Flows page
- Page-level Page Changelog Header removed — kept only per-card
- Figma Link hidden in all Subheaders (per Nelson's call)

**Deferred to Nelson**: 5 clones manual reflow (Cards 2.2/2.3 Notes Tablet/Mobile + 3.2/3.3 Downloads Tablet/Mobile + 5.2/5.3 Note Editor Tablet/Mobile). ⚠ warnings stay in descriptions until reflow done.

---

For v1.0 → v1.7 release notes, see [`history/CHANGELOG-archive.md`](history/CHANGELOG-archive.md).
