# Handoff Package — Archived Changelog (v1.0 → v1.7)

Historical changelog entries for the LMS handoff package. Latest version lives in `../CHANGELOG.md`.

## v1.7 — 2026-06-08 · BA handoff added

New subfolder `LMS-HANDOFF/BA/` packages the project for Business Analysts.

- **`BA/00-README.md`** — index + reading order
- **`BA/01-executive-summary.md`** — 10-min overview, locked decisions, top risks, RACI, success metrics
- **`BA/02-user-stories-phase1.md`** — 73 user stories across 14 epics with Gherkin (Given/When/Then) acceptance criteria. Each story links to BR-XX, EC-XX, screen, components.
- **`BA/03-business-rules.md`** — 42 business rules covering progress, completion, locks, bookmarks/notes, notifications, mentor, live sessions, certificates, display rules, a11y, analytics
- **`BA/04-edge-cases-failures.md`** — 40 documented edge cases (video errors, save failures, offline, deadlines, etc.) with required UI behavior
- **`BA/05-feature-roadmap.md`** — Phase 1 build target + Phase 1.5 fast-follow + Phase 2 + Phase 3 with sequencing rationale and risks to challenge
- **`BA/06-glossary.md`** — vocabulary (content hierarchy, 12 topic types, roles, key concepts, engineering terms)
- **`BA/BA-PRD.docx`** — formal Word PRD for stakeholder distribution (8 sections, ~30 pages, validates clean against OOXML schema)
- **`BA/BA-RTM.xlsx`** — Requirements Traceability Matrix: 73 FRs × 12 columns (FR ID, story, epic, screen, components, BR, EC, priority, phase, AC count, status). 4 sheets: RTM / Phase Summary / Priority breakdown / Legend. Conditional formatting on Priority. 36 working formulas, 0 errors.
- **Updated** `README.md` with BA subfolder + 9 new file entries.

**Why**: The dev handoff was engineering-shaped (tokens, Figma node IDs, Storybook plan). The BA team needs user stories with Gherkin AC, business rules, edge cases, traceability — different layer of the same project. Now both audiences can pull from the same source of truth without translation friction.

## v1.6 — 2026-06-02

Hard pass on the overlay panels + modal + edge cases to replace inline custom frames with existing UUI library and LMS Extension Components. No new visual changes intended, only structural migrations so the codebase consumes the same atoms everywhere.

- **Notifications Panel** (`3545:69932`):
  - 4 inline tab frames replaced with `_Tab button base` instances (Type=Underline, Size=sm). Variants: All=Current True, the rest Current False. Counts pushed into nested `Badge` instances.
  - Custom ✕ glyph replaced with `x-close` icon component instance.
- **Saved Panel** (`3545:69992`):
  - 3 inline filter chips replaced with `_Tab button base` instances (Type=Button gray, Size=sm — pill style for filters). "All · 7" is Current=True.
  - 4 inline tag frames on saved notes replaced with UUI `Badge` instances (Type=Pill color, Color=Gray, Size=sm).
  - Custom ✕ replaced with `x-close` icon component instance.
- **Note Editor Modal** (`3549:42190`):
  - Custom ✕ replaced with `x-close` icon component instance.
  - Tags-input pills already compose `x-close` icon instance; structure kept (functional removable chips, not a pure Badge).
- **Edge Cases wrapper** (`3549:42235`):
  - Tab Empty States (Notes + Downloads) replaced with `LMS / Empty State` instances (Kind=Notes / Kind=Downloads).
- **Why**: every inline element was a regression against the UUI-first rule. Final pass keeps the prototype-to-Storybook handoff clean — Claude Code consumes the same component IDs everywhere instead of having to "see" a custom frame and decide if it should map to a primitive.

## v1.5 — 2026-06-02

- **Built in Figma** (Phase 1 readiness):
  - Note Editor Modal (3549:42190) — anchor preview + textarea + tags + Cancel/Save
  - Phase 1 edge cases wrapper (3549:42235) with 3 sub-sections:
    - A · Tab empty states (Notes empty + Downloads empty)
    - B · Footer Nav edge cases (First topic / Last topic / Topic incomplete)
    - C · Video Player edge states (Loading / Error / Ended)
- **Added** `phase1-readiness.md` with 4 specs:
  - Bookmark toast feedback pattern
  - Transcript auto-scroll behavior (pause on user scroll + Resume pill)
  - WCAG 2.1 AA accessibility checklist (keyboard map, aria-labels, focus trap, contrast)
  - Share menu content (LinkedIn/X/FB/Copy/Email) + Analytics events spec (~30 events)
- **Mobile chrome footer** (CC/Language) deferred to V2 per PM call.
- **Padding+gap** bound to UUI spacing tokens (3439 values bound across all components/screens).

## v1.4 — 2026-06-02

- **Added** File Upload Zone (drag-drop + browse files picker) on Peer-graded Assignment screen.
- **Spec** added to `components-inventory.md` with props + behavior + a11y.
- **Decisions** locked: notification grouping = hybrid (tabs + date sections); Progress page = V2 defer; File upload UX = both drag-drop + picker.

## v1.3 — 2026-06-02

- **Added** `feature-deltas.md` — clear separation of edX baseline / ours-only / edX-only-to-add / edX-only-skipped (with reason).
- **Added** Priority 1 edX-baseline features to Figma:
  - Certificate: Print button (4-button footer)
  - Notifications panel: hybrid tabs (All / Discussions / Grading / Updates) with date sections inside
  - Video Chrome Footer: License + CC toggle + Language picker + Download transcript (below video player)
- **Updated** `components-inventory.md` with Video Chrome Footer molecule spec + Certificate footer details + Notifications hybrid tabs.

## v1.2 — 2026-06-02 (later)

- **Added** `edx-parity-audit.md` — feature audit vs edX Learner Guide (sections 7, 8, 10, 17, 18, 19, 11, 12). Identifies covered / partial / missing per area + priority roadmap.

## v1.1 — 2026-06-02

- **Added** `overlay-panels-spec.md` — Notifications + Saved (Bookmarks + Notes combined) right-overlay panels
  - 7 notification types mapped to concrete UUI icons
  - Topic-Type icon mapping for Saved Topic items
  - Shared `OverlayPanel` chrome + 6 sub-components specified
  - A11y rules: focus trap, Esc closes, role=dialog
- **Added** binding-strictness rule: backdrops MUST bind (use `color-mix()` or CSS opacity, never raw `rgba()`).
- **Added** icon stroke rule: <24px → `stroke-width: 1.5`. ≥24px → 2.
- **Added** Module Header completed state rule to README critical rules.
- **Updated** `prototype-flows.md` with overlay panel state + interactions.
- **Updated** `screens-spec.md` to reference panels as additional surfaces.
- **Updated** `components-inventory.md` with Section L (Overlay Panels) + 7 new components to build in code.
- **Updated** `storybook-coverage.md` with 4 new organism/molecule stories + atom (FilterChip).

## v1.0 — 2026-06-01

- Initial handoff package generated. README, tokens (colors + typography), components inventory (30 LMS Extension Components), screens spec (7 Final Screens — Video lesson flow), prototype interaction flows, data model, Storybook coverage plan, PROMPT-FOR-CLAUDE-CODE.
