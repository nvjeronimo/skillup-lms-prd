# Figma Token Upgrade Plan

**Goal:** restructure the SKO Design System variables into the lean model with brand as native Figma modes, without breaking the 11 production screens. Works on Figma Pro (10 modes).
**File:** SKO Design System (Untitled UI) `c7EUDrQwP8si08aPipDSIV`. Screens live in `Wz2TCYFVr0hD8tJNiLajLt`, subscribing to this library.
**For:** next review.

---

## The one principle that keeps this safe

**Figma bindings follow the variable ID, not the name.** So:

- Renaming a collection, a mode, or a variable → bindings survive. Safe.
- Re-pointing a variable's alias (changing what it references) → the variable keeps its ID, so consumers stay bound. Safe.
- Creating a variable, or moving one to another collection → new ID → every consumer must be rebound. Risky.

The plan renames and re-points in place wherever possible, and only creates new variables for the Brand collection.

---

## Target structure

| Collection | Modes | Holds |
|-----------|-------|-------|
| `1. Primitives` | 1 | raw, brand-neutral ramps + scale + type primitives |
| `2. Brand` | SkillUp, Partner A, … (Figma Pro: up to 10 modes) | the brand ramp anchors (~8–12 tokens) |
| `3. Semantic` | Light, Dark | text/bg/fg/border (+ brand-*). Brand-* alias Brand; neutrals alias Primitives |
| `4. Scale & Type` | 1 | spacing, radius, widths, type |

- Brand and scheme are two independent axes, so two collections. A frame sets `Brand = SkillUp` and `Semantic = Light` independently.
- No Component collection. Components bind to Semantic. Component tokens are code-side exceptions.
- Brand modes hold the brand ramp (one value per brand). Semantic Light/Dark picks which ramp step per scheme — scheme does not live in the Brand collection.

Each Brand mode exports to a brand JSON, and the pipeline emits `[data-brand]` CSS — the same output a CSS-only approach would give. Authoring brand as modes adds design-time brand preview in Figma on top.

---

## Current → target mapping

| Today | Action | Target |
|-------|--------|--------|
| `_Primitives` (452), incl. `SKO-Brand/*` | rename; brand anchors referenced by a new Brand collection | `1. Primitives` |
| `1. Color modes` — modes Light SKO / Dark SKO / Light UUI / Dark UUI; holds `LMS/*`, `Colors/*`, `Component colors/*` | rename modes, drop the 2 UUI modes, rename collection | `3. Semantic` (Light/Dark) |
| `LMS/*` (30) | rename group `LMS/` → semantic groups; keep IDs | `Semantic/Text|Background|Foreground|Border` |
| brand anchors inside `LMS/*` (the `brand-*` tokens) | re-point to alias the new Brand collection | `Semantic/*-brand-*` |
| `Colors/*`, `Component colors/*` (UUI defaults) | leave as legacy group, untouched | (cleanup later) |
| `2. Radius`, `3. Spacing`, `4. Widths`, `5. Containers`, `6. Typography` | rename to `--sk-` convention | `4. Scale & Type` |

---

## Phases

### Phase 0 — Safety net (before any edit)
1. Save a named version of the library (Figma version history) and duplicate the file as `…_pre-tokens-upgrade` backup.
2. Run a binding scan: confirm exactly which variables the 11 production screens consume (expected: `LMS/*` + spacing/radius/type). Confirm SkillUp screens do **not** bind `Colors/*` / `Component colors/*` directly (those are UUI reference).
3. Do the work on the main file, not a branch (Figma recommends this for heavy variable ops). The version snapshot is the rollback.

### Phase 1 — Collapse modes, rename to Semantic (no new IDs)
1. In `1. Color modes`: rename mode `Light mode SKO` → `Light`, `Dark mode SKO` → `Dark`.
2. Export `Light mode UUI` and `Dark mode UUI` to JSON (archive), then delete both modes.
3. Rename collection `1. Color modes` → `3. Semantic`.
4. Rename the `LMS/` group to clean semantic groups (`Text`, `Background`, `Foreground`, `Border`). IDs unchanged → screens stay bound.
- Result: Semantic collection, Light/Dark only, bindings intact.

### Phase 2 — Promote brand anchors (new Brand collection, re-point aliases)
1. Create collection `2. Brand` with one mode `SkillUp`.
2. Create the brand ramp anchor tokens (e.g. `brand/primary`, `brand/strong`, `brand/on-dark`, `brand/links`, `brand/ui-dark`, `brand/progress`, `brand/accent`). For the SkillUp mode, alias the existing `SKO-Brand/*` primitives (P01–P08, Y01).
3. Re-point the ~11 brand-dependent Semantic tokens (`text-brand`, `text-brand-primary`, `text-brand-secondary`, `fg-brand`, `fg-brand-primary`, `fg-progress`, `bg-brand-primary`, `bg-brand-section`, `bg-brand-solid`, `bg-brand-hover`, `border-brand`) to alias the new Brand tokens instead of aliasing primitives directly.
- Semantic IDs unchanged → screens still bound, now resolving through Brand. SkillUp mode = identical values, so screens look the same.

### Phase 3 — Add brand modes
1. Add the partner's raw ramp to `1. Primitives` as a new group (e.g. `ref/partner-a/*`). **All partner hex lives here — never in the Brand or Semantic collection.**
2. Duplicate the `SkillUp` mode in `2. Brand` → `Partner A` (and a `Partner B` template). In the new mode, re-point each anchor's **alias** to the partner's primitives. The Brand collection holds aliases only, no hex.
3. On a test frame, set `Brand = Partner A`, `Semantic = Light` → only brand colours change. Confirms the two axes are independent and the no-hex rule holds end to end.

### Phase 4 — Scale & type naming cleanup
1. Rename `Radius` / `Spacing` / `Widths` / `Containers` / `Typography` to the `--sk-` convention; optionally consolidate into `4. Scale & Type`. Single mode, no structural change → low risk.

### Phase 5 — Pipeline wiring
1. Tokens Studio: map the 4 collections to sets; export each Brand mode to a brand JSON.
2. Style Dictionary targets: `tokens.css` (`:root` + `[data-theme="dark"]`), `brands/*.css` (`[data-brand]` anchor overrides), email inline-static per brand, `tokens.ts`.
3. Confirm names match `TOKEN-NAMING-ALIGNMENT.md`.

### Phase 6 — Verify
1. Publish the library. **Expect applied modes on subscriber screens to reset** — reapply `Brand = SkillUp`, `Scheme = Light` on the 11 screens' pages (known Figma behaviour on republish).
2. Visual check: the 11 screens in SkillUp/Light must be pixel-identical to the Phase 0 snapshot.
3. Toggle Brand on a sample screen → only brand colours move; neutrals, success/warning/error unchanged.
4. Binding scan again → zero unbound nodes.

---

## Risk register

| Risk | Likelihood | Mitigation |
|------|-----------|-----------|
| Republish resets applied variable modes on the 11 screens | High (expected) | Phase 6 step 1: reapply modes. Budget time for it. |
| Deleting UUI modes drops values a UUI component relied on | Low (SkillUp uses LMS/*) | Archive to JSON in Phase 1; UUI defaults left as legacy group |
| A variable accidentally recreated instead of renamed → lost bindings | Medium | Never delete+recreate a consumed token. Rename only. Validate on the duplicate first. |
| Mode cap reached (>10 brands on Pro) | Low near-term | If it ever happens, drop brand modes and fall back to CSS-only brand (same dev output) |
| Cross-file subscriber drift | Medium | Publish once, verify on the screens file, then announce |

---

## Rollback

Every phase is reversible from the Phase 0 version snapshot. If Phase 1–2 verification fails, restore the version and reassess. Do not proceed to Phase 3 until the 11 screens verify identical in SkillUp/Light.

---

## Effort (rough)

- Phase 0: 0.5 day (scan + backup)
- Phase 1–2: 1 day (rename, re-point ~11 aliases, verify)
- Phase 3: 0.5 day (brand modes + test)
- Phase 4: 0.5 day
- Phase 5: 1–2 days (pipeline, depends on dev)
- Phase 6: 0.5 day

Figma-side restructure ~2.5–3 days. Pipeline runs in parallel on the dev side.

---

## Why this is safe to commit to

Authoring brand as Figma modes produces the same dev output as keeping brand purely in the build pipeline. If the Figma-mode management ever becomes a burden, you drop the Brand modes and keep brand in the pipeline — without touching components or the dev contract. You are not locking anything in.
