# LMS ICP — PRD Conformance Audit

> Confronting the ICP_PRD v1.0 (Harpreet Kaur, 27 Apr 2026) with our current Figma work (UUI Playground ports + LMS Extension components).
> Status legend: ✅ complete / 🟡 partial / ⚠️ non-conformant / ❌ missing / 🔧 engineering only.

---

## Headline conclusion

**Coverage: ~75% of PRD design surface delivered. 25% gap — split between cosmetic gaps, missing chrome elements, and 3 entirely missing states (empty / failure / not-passed quiz).**

The two biggest non-conformities:
1. **Learner avatar/name missing from Course Player Topbar** (FR-01 explicit requirement).
2. **Mobile breadcrumb is hidden entirely** instead of "showing only active unit" as PRD specifies.

Plus a strategic question: **the UUI ports use UUI brand (purple Inter), not SkillUp brand (cyan + Montserrat/Playfair/Outfit) — production designs need to flip back.**

---

## FR-by-FR audit

### FR-01 — Sign-in + identity ⚠️ Non-conformant
PRD requires: learner's name + avatar in top bar.
- Course Player Topbar right cluster: AI Assistant · Notifications · Bookmark · Theme toggle (hidden) · Close. **No avatar. No name.**
- 🔧 Auth flow + redirect = engineering.
- **Action:** add Avatar + name (or avatar dropdown menu) to Topbar right cluster.

### FR-02 — Light/Dark toggle 🟡 Partial (low priority per PRD)
- ✅ Theme=Light / Theme=Dark variants exist on Course Player Topbar.
- ⚠️ **Theme toggle instance is `visible: false` in all 3 Topbar variants right now** (likely intentional given low priority, but conflicts with FR-02 acceptance criterion "Selecting the toggle instantly changes the entire interface theme").
- 🔧 Persistence + AA contrast verification = engineering.
- **Action:** confirm with Harpreet — keep toggle hidden in v1, or show but de-emphasised?

### FR-03 — Course outline (sidebar) 🟡 Partial
- ✅ `LMS / Topic Row` 4 states (Done / Active / Pending / Locked) + Module Number Label.
- ✅ Sidebar present in Desktop + Tablet ports; hidden entirely in Mobile.
- ❌ **Hamburger/drawer trigger missing on Mobile** — PRD says "becomes a slide-over drawer on phones" — we hide the sidebar with no re-open affordance.
- ❌ **Sidebar collapse toggle on Tablet missing** — PRD says "collapsible on tablet". Tablet currently shows full sidebar with no toggle.
- **Action:** add hamburger icon to Mobile Topbar left cluster + spec drawer overlay state. Add sidebar collapse toggle on Tablet variant of Topbar.

### FR-04 — Breadcrumb (3-tier hide) ⚠️ Non-conformant on mobile
- ✅ ≥960 all crumbs visible (Desktop variant).
- 🟡 640–960 hide course crumb — no specific intermediate variant designed (only Desktop + Tablet + Mobile breakpoints exist).
- ⚠️ **<480 should show ONLY active unit name** — our Mobile variant has breadcrumb `visible: false`, hiding it completely.
- **Action:** in Mobile Topbar variant, KEEP breadcrumb visible but only with the last segment (e.g., "Ideation with ChatGPT"). Add intermediate 640-960 variant if needed.

### FR-05 — Resume (last unit + playback position) 🔧 Engineering
- Design only specifies the destination state; behaviour is platform-driven.
- ✅ Default ports show learner mid-course (active unit highlighted, transcript line active) — proxies the resumed state.

### FR-06 — Video controls 🟡 Partial
- ✅ UUI Video player 16:9 instance with play, scrub, captions, fullscreen.
- ✅ Captions toggle visible.
- 🔧 Keyboard shortcuts (Space / ← → / C / D) = engineering (design needs to document the keymap on Figma annotations).
- **Action:** annotate keyboard map on a frame for handoff.

### FR-07 — Synced live transcript ✅
- ✅ `LMS / Transcript Line` with Default + Active variants.
- 🔧 Sync + auto-scroll + click-to-seek = engineering.

### FR-08 — Watching counts as completion 🔧 Engineering
- ✅ Done state designed in `Completion Status` and `Topic Row`.
- 🔧 State propagation = engineering.

### FR-09 — Timestamped notes 🟡 Partial
- ✅ `LMS / Note Item` shows timestamp + edited meta + body.
- ✅ "+ Add a note at current timestamp" CTA at bottom of Video Notes screen.
- ❌ **Edit + delete affordances NOT shown on Note Item** — PRD says "The learner can edit the text of a note or delete it."
- ❌ **Click timestamp → seek video** — UI affordance not designed (no visual hint timestamp is clickable).
- **Action:** add edit/delete icon buttons (or "⋯" menu) to Note Item. Style timestamp as link.

### FR-10 — Downloads 🟡 Partial
- ✅ `LMS / File Item` with type chip + name + size + download icon. 4 variants (PDF/DOCX/XLSX/ZIP).
- ❌ **Empty state missing** — PRD says "If the unit has no attachments, the tab shows a friendly empty state."
- **Action:** design an empty state ("No downloads available for this lesson") for Downloads screen.

### FR-11 — Discussion 🟡 Partial — and PRD has internal conflict
- ✅ `LMS / Thread Item` with author + time + body + "↩ N replies".
- ✅ "+ Start a new thread" CTA at bottom of Video Discussion screen.
- ❌ **Upvote affordance NOT designed on Thread Item.**
- ❌ **Reply / new-thread compose form NOT designed.**
- ❌ **Empty state missing.**
- ⚠️ **PRD CONFLICT**: §2 background says "discussion forum (not to be used in ICP)"; FR-11 specifies full discussion behaviour. **Clarify with Harpreet before adding upvote/compose.**

### FR-12 — Quiz inline ✅
- ✅ `LMS / Quiz Card` 4 states (Start / Question / Revealed / Results).
- ✅ Single-choice options visible. Submit + Skip buttons.
- ✅ Instant feedback (Revealed shows green correct + red wrong + explanation box).
- ✅ Forward-only — Quiz Card actions show only "Next question" / "Submit", no "Previous".

### FR-13 — Quiz results 🟡 Partial
- ✅ Score ring (5/5, 100%), pass copy "Perfect score!", 3 KPIs, Retake + Next.
- ❌ **NOT-PASSED variant missing** — PRD says "The pass / not-yet-passed state is visually distinct." Our Quiz Card Results variant only has the success/perfect state. No failure/retake-required state.
- **Action:** add a State=Results variant (or sub-variant) for "Not passed yet — 2 of 5 correct" with red/amber ring + "Retake to pass" emphasised.

### FR-14 — Progress + completion 🟡 Partial
- ✅ Per-unit state visible (Done / Active / Pending / Locked in sidebar).
- ❌ **Per-module rollup NOT designed** — PRD says "Module-level progress reflects the units completed within that module." Our Module Number Label is just "MODULE 01" — no "MODULE 01 · 3/3" or progress bar.
- ❌ **Overall course progress NOT visible in Course Player** — only present in Program Detail hero. PRD says "Overall course progress is visible without scrolling on desktop."
- **Action:** extend Module Number Label with progress count / fraction. Add an overall-progress mini-bar to the sidebar head (above MODULE 01) or Topbar.

### FR-15 — AI panel 🟡 Partial (PRD calls out "Probably Phase 2")
- ✅ `LMS / AI Panel` with 4 modes (Key Takeaways / Ask AI / Chat / Related).
- ✅ Free-text question box (Ask AI mode).
- ✅ Per-unit content semantics.
- ✅ Dismissible (close X in header).
- 🟡 **Suggested questions as CHIPS** — PRD specifies tappable chips; our Ask AI mode renders them as bordered cards with ↗ icon (not pill-style chips). Cosmetic mismatch but functional.
- 🔧 Streaming behaviour + per-unit refresh = engineering.
- **Action (cosmetic):** convert Ask AI suggested-prompt cards to pill-style chips.

### FR-16 — Responsive 4 breakpoints 🟡 Partial
| Range | PRD spec | Our port |
|---|---|---|
| ≥1100 | all 3 panels | ✅ Desktop port |
| 960–1100 | AI narrows, visible | ❌ no specific design |
| 768–960 | AI hidden + re-openable | 🟡 Tablet hides AI but no re-open trigger designed |
| <768 | sidebar = drawer | 🟡 Mobile hides sidebar but no drawer/hamburger |
| <480 | brandmark + active unit only | ⚠️ brandmark ✅, breadcrumb HIDDEN (should show last segment) |
- **Action:** spec the 960–1100 intermediate variant; add AI re-open trigger on Tablet; add hamburger + drawer on Mobile; fix Mobile breadcrumb to show active unit.

### FR-17 — Brand fidelity ⚠️ STRATEGIC NON-CONFORMITY
- PRD spec: Montserrat (body), Playfair Display (display), Outfit (caps). Cyan = interactive, green = completion. Logo variants per mode/size.
- **Our UUI ports use:**
  - Inter font (not Montserrat/Playfair/Outfit)
  - UUI purple primary (not SkillUp cyan)
  - UUI semantic green (matches "completion" intent — OK)
  - SkillUp logo correctly varied per theme/size ✅ (user added these)
- **Status:** ⚠️ The UUI ports are intentionally a DS-exploration exercise. **For production we either:**
  - (a) take the layout patterns and re-skin to SkillUp brand in the V7 file (which already has Montserrat/Playfair/Outfit), OR
  - (b) override UUI tokens to point to SkillUp brand values (rebrand UUI components).
- ✅ "NOT HARD-CODED" rule satisfied — colours bound to UUI variables; spacing/radius bound; fonts are inherited from UUI.

### FR-18 — Keyboard 🔧 Engineering with design annotations needed
- Focus states present in UUI Buttons (Hover/Focused/Disabled variants).
- ❌ **No annotated keyboard map on Figma frames yet.**
- **Action:** before P5 handoff, annotate Space / ← → / C / D / Esc shortcuts on a dedicated frame.

### FR-19 — WCAG AA + accessibility 🟡 Partial
- ✅ UUI colour tokens are AA-compliant for primary text combinations.
- ✅ Captions toggle visible.
- ❌ **Accessible names not annotated on icon buttons** (AI Assistant / Notifications / Bookmark all show as round icon — screen reader needs descriptive aria-label).
- ❌ **Quiz feedback ARIA spec** not annotated.
- 🔧 Audit pass = engineering + design review before P5.

---

## NFRs (§6 of PRD)

### Performance budgets 🔧 Engineering
- ≤3s first lesson · ≤1s unit switch · ≤2s video play · ≤2s AI first character.
- No design impact except that we must design **loading states** (which we don't have yet).
- ❌ Loading skeleton states missing across all ports.

### Reliability — failure states 🟡 Partial
PRD: "Note saving, completion ticks, and quiz submissions never silently fail; the learner is told if something did not save." Plus "AI panel shows a friendly fallback" if AI is unavailable.
- ❌ **No failure UI designed**: note save fail / quiz submit fail / AI offline fallback / completion sync error.
- ❌ Missing toast / inline error patterns in our LMS Extension library.
- **Action:** design 3–4 fallback / error states.

### Privacy / Security / i18n 🔧 Engineering
- No specific design output required beyond ensuring strings are translatable (they are — text is not in images).

---

## Missing screens / states summary

| Missing item | Impact | Recommended priority |
|---|---|---|
| Avatar/name in Course Player Topbar | FR-01 explicit | 🔴 High — fundamental to learner identity |
| Mobile breadcrumb showing last segment | FR-04 / FR-16 | 🔴 High — explicit acceptance criterion |
| Hamburger + drawer trigger on Mobile | FR-03 / FR-16 | 🔴 High |
| Sidebar collapse toggle on Tablet | FR-03 / FR-16 | 🟠 Medium |
| Per-module + overall progress in Course Player | FR-14 | 🟠 Medium — explicit "without scrolling" |
| Quiz Not-Passed variant of Results | FR-13 | 🟠 Medium |
| Empty states (Downloads, Discussion, Notes) | FR-10 / FR-11 / FR-09 | 🟠 Medium |
| Failure / error / fallback UI (notes / quiz / AI offline) | NFR-6.2 | 🟠 Medium |
| Loading skeleton states | NFR-6.1 perf perception | 🟢 Lower |
| AI Panel: chips not cards in Ask AI mode | FR-15 cosmetic | 🟢 Lower |
| Note Item: edit/delete affordance | FR-09 | 🟢 Lower |
| Thread Item: upvote + compose form | FR-11 (if discussion stays in scope) | 🟡 Blocked on PRD clarification |
| Intermediate breakpoint 960–1100 | FR-16 | 🟢 Lower |
| Keyboard shortcut annotations | FR-18 | 🟢 Lower — pre-handoff polish |
| ARIA accessible names annotations | FR-19 | 🟢 Lower — pre-handoff polish |
| Strategic: re-skin or rebrand UUI port to SkillUp brand | FR-17 | 🔴 If shipping; deferred if exploration only |

---

## Conflicts to resolve with Harpreet before next sprint

1. **Discussion in ICP or not?** §2 says no, FR-11 says yes. Block all discussion design work until confirmed.
2. **AI panel in v1 (FR-15) or Phase 2?** §5.9 says "Probably Phase 2" — design is ready either way, but engineering scope changes.
3. **Theme toggle visibility in v1?** FR-02 marked "Low priority". Currently hidden in our Topbar. Confirm direction.
4. **Brand fidelity for production**: UUI ports as-is, OR re-skin to SkillUp brand (cyan/Montserrat/Playfair/Outfit)? This drives the next sprint's scope materially.

---

## Recommended next sprint

If we triage the audit by impact + acceptance-criteria-pass:

**Must-do (P0–P1 readiness):**
1. Add avatar + name to Course Player Topbar (FR-01)
2. Fix Mobile breadcrumb (FR-04, FR-16) — show last segment
3. Add hamburger + drawer overlay on Mobile (FR-03)
4. Spec per-module + overall progress rollup in sidebar (FR-14)
5. Design Quiz Not-Passed Results variant (FR-13)

**Should-do (P3 + P4 readiness):**
6. Empty states for Notes / Downloads / Discussion
7. Failure / fallback UI (note save / quiz / AI offline)
8. Note Item edit/delete + Thread Item upvote
9. AI Panel Ask AI mode → swap suggestion cards to chips

**Polish (P5):**
10. Annotate keyboard shortcuts + ARIA spec on Figma frames
11. Intermediate breakpoint 960–1100 variant
12. Loading skeleton states

**Open / blocked:**
13. Brand strategy decision (UUI vs SkillUp re-skin for production)
14. Discussion scope (resolve PRD §2 vs FR-11 conflict)

---

_Last updated when audit is re-run after any PRD revision or port changes._

---

## Sprint delivery log (May 8 2026)

Took the audit's Must-do + Should-do list and executed.

### Must-do P0–P1 (DONE)
1. ✅ **FR-01** — UUI Avatar instance ("OR" placeholder) + "Olivia Rhye" name added to right cluster of Course Player Topbar (Desktop variants). Bound text fills to UUI text-primary (Light) / fg-white (Dark).
2. ✅ **FR-04 / FR-16** — Mobile breadcrumb re-shown (`visible = true`), with all segments hidden except the last one. Slashes/separators hidden too.
3. ✅ **FR-03** — Hamburger (UUI Buttons/Button utility + menu-01 icon) added at root[0] of Course Player Topbar Mobile variant. Drawer overlay state still to be designed separately.
4. ✅ **FR-14** — `Module Number Label` master updated to "MODULE 01 · 3/3" / "MODULE 02 · 1/3". Overall progress block added to Video Transcript v3 sidebar with UUI Progress bar @ 70% + stats line.
5. ✅ **FR-13** — `LMS / Quiz Card` got 5th variant `State=NotPassed`: amber ring 2/5 + 40%, "Almost there" copy, Retake Primary + Skip for now Secondary.

### Should-do P3–P4 (DONE)
6. ✅ **FR-09 / FR-10 / FR-11 empty states** — `LMS / Empty State` molecule with 3 variants (Kind=Notes / Downloads / Discussion). Each has pictograph + title + body + optional CTA (Add first note · no CTA · Start a thread).
7. ✅ **NFR-6.2 failure UI** — `LMS / Inline Alert` molecule with 4 variants (State=Saving / Saved / Error / AIOffline). Color-coded per semantic; bound to UUI tokens.
8. ✅ **FR-09 / FR-11 affordances** — `LMS / Note Item` master got `note-edit-btn` (✎) + `note-del-btn` (✕) on the right of the top row. `LMS / Thread Item` master got `upvote-btn` (▲ 12) pill at the bottom row before replies count.
9. ✅ **FR-15 chips** — AI Panel Ask AI variant: 3 suggested-prompt cards replaced with 3 pill chips (accent_dim bg, accent text).

### Component count after sprint
LMS Extension components went from 18 → **22** (added Empty State + Inline Alert; Note Item + Thread Item + Quiz Card got new variants/affordances; Module Number Label master updated).

### Still open (polish phase + blocked items)
- ARIA + keyboard shortcut annotations on Figma frames (FR-18/19)
- 960–1100 intermediate breakpoint variant (FR-16)
- Loading skeleton states (NFR-6.1)
- Tablet sidebar collapse toggle
- Mobile drawer overlay state (hamburger now exists, drawer-open state TBD)
- BLOCKED — brand strategy (SkillUp vs UUI) — needs Harpreet decision
- BLOCKED — Discussion in or out of ICP — needs Harpreet decision
- BLOCKED — AI panel v1 or P2 — needs Harpreet decision
- BLOCKED — Theme toggle visibility in v1 — needs Harpreet decision

