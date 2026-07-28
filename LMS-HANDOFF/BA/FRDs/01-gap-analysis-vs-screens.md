# Gap Analysis — FRDs vs Phase 1 Handoff Screens

Compares Rashid's official FRDs (Jun 25, 2026) against our current Figma handoff package (LMS ICP Phase 1 file).

**Legend:** ✅ covered · ⚠ partial / needs alignment · ❌ missing · ❓ behaviour-only, no screen

---

## F-VID-001 — Video Player & Playback Controls

| FRD Requirement | Status | Notes |
|---|---|---|
| FR-V1-01: play/pause + scrub bar + elapsed/total time + ±10s skip + speed + CC + full-screen | ⚠ | Player chrome present, but **±10s skip buttons not visible** in Card 1 Transcript Desktop screenshot |
| FR-V1-02: Space bar toggles play/pause | ❓ | Behaviour spec, no UI |
| FR-V1-03: ←/→ keys = ±10s skip | ❓ | Behaviour spec |
| FR-V1-04: speed cycle {0.75×, 1×, 1.25×, 1.5×, 2×} wrapping | ⚠ | We show `1×` button. Cycle order matches FRD. Need to confirm the button cycles (not dropdown) |
| FR-V1-05: scrub seek updates time + transcript highlight | ✅ | |
| FR-V1-06: CC default ON, 'C' key toggle | ⚠ | CC button present, **default-ON state not visualised** (button might appear "off-looking" in mockups) |
| FR-V1-07: full-screen entry/exit | ✅ | Expand icon in player |
| FR-V1-08: persist speed + CC preference across session | ❓ | Behaviour spec |
| **BR-V1-05**: no captions track → CC button **disabled** (not hidden) | ❌ | No disabled-CC state in DS. We have Empty State Kind=Transcript for the tab, but CC button state not designed |

### Error cases needing screens

| FRD scenario | Required UI | Status |
|---|---|---|
| Media fails to load | Retry affordance, message "We couldn't load this video..." | ⚠ Covered conceptually in Phase 1 edge cases wrapper (3549:42235) — needs verification this exact message is there |
| No captions track | Tooltip on disabled CC: "Captions aren't available for this lesson." | ❌ |
| Full-screen blocked by browser | Fallback to maximised in-page + message | ❌ |

---

## F-VID-002 — Synced Live Transcript

| FRD Requirement | Status | Notes |
|---|---|---|
| FR-V2-01: transcript as ordered timed lines | ✅ | LMS / Transcript Line component |
| FR-V2-02: highlight active line ≤1s latency | ✅ | Active variant on Transcript Line |
| FR-V2-03: auto-scroll, paused on manual scroll | ✅ + addition | We added a "Resume" pill (in `phase1-readiness.md`) — **NOT in FRD**. Either positive UX addition or scope creep — flag for Rashid |
| FR-V2-04: click line → seek, preserve play/pause | ✅ | |
| FR-V2-05: highlight syncs after any seek | ✅ | |
| FR-V2-06: friendly empty state when no transcript | ✅ | LMS / Empty State Kind=Transcript added Jun 15 |

---

## F-VID-003 — Video Watch Progress & Completion

| FRD Requirement | Status | Notes |
|---|---|---|
| FR-V3-01: report progress on pause/seek/unit-change/page-unload | ❓ | Behaviour |
| FR-V3-02: resume within 5s of last position | ❓ | Behaviour |
| FR-V3-03: completion account-scoped (not device) | ❓ | Behaviour |
| FR-V3-04: sidebar tick ≤5s of completion event | ✅ | Topic Row completion state exists |
| FR-V3-05: monotonic completion | ❓ | Behaviour |
| FR-V3-06: error on save fail + retry | ❌ | **No error toast/state designed for progress save failure** |
| **BR-V3-05**: last unit complete on return → Final-Results view | ❌ | **No Final-Results entry view designed.** We have Course Complete Modal + Certificate (Phase 3 WIP) but those are mid-flow celebrations, not a re-entry landing |

---

## F-001 — Course Outline Sidebar

| FRD Requirement | Status | Notes |
|---|---|---|
| FR-001-01: fixed panel desktop/tablet, drawer mobile | ✅ | LMS / Sidebar v2 has 3 states (Expanded / Collapsed / Mobile) |
| FR-001-02: course name + Overall Progress + hierarchy | ✅ | Course Header + Overall Progress at top |
| FR-001-03: author-defined order | ❓ | Behaviour |
| FR-001-04: tick on completed, blue accent + bg on active, padlock on locked | ✅ | All 3 variants in Topic Row + Completion Status |
| FR-001-05: click unlocked → load; locked → non-interactive | ⚠ | Variants exist; **need to verify Topic Row Locked variant has interactive=false annotation for engineering** |
| FR-001-06: collapsible toggle, hide labels, main expands | ✅ | Sidebar v2 Collapsed |
| FR-001-07: type icon + duration/time per row | ✅ | Topic Row composes Topic-Type Icon + duration text |
| FR-001-08: Module/Lesson expandable, active expanded by default | ✅ | Module Header has chevron |
| FR-001-09: Lesson sub-header label in 5-level hierarchy | ✅ | Lesson Header component |
| FR-001-10: 3 hierarchy shapes via same component | ✅ | Sidebar v2 has Collapsed·noLesson + Mobile·noLesson variants |
| FR-001-11: long names truncate with ellipsis | ⚠ | Need to verify text node has truncation set |
| FR-001-12: bookmark icon on Topic rows, filled/outline states | ✅ | bookmark variant on Topic Row |
| FR-001-13: mobile drawer hamburger + ✕/outside tap close | ✅ | |
| **BR-001-04**: Live Session shows scheduled date+time, "Recording available" post-session | ⚠ | Topic-Type Badge has VILT-Live Session + VILT-Recording variants. **Need to verify Topic Row VILT shows scheduled date format** (e.g., "Live · Jun 20, 2:00 PM") |
| **BR-001-05**: Reading 150 wpm (body) OR 250 wpm (Appendix 5.2) | ❓ | **Internal contradiction in FRD itself.** Our spec uses "approx." prefix without rate. Need clarification from Rashid |
| **BR-001-12**: Module "3/9" counts Topics not Lesson headers | ❓ | Behaviour, our progress logic should follow |

---

## F-002 — Resume / Last-Position Restore

| FRD Requirement | Status | Notes |
|---|---|---|
| FR-002-01: persist Topic ID + position to backend on navigate/close | ❓ | Behaviour |
| FR-002-02: auto-load last topic on re-entry | ❓ | Behaviour |
| FR-002-03: seek to (position − 5s); don't auto-play | ❓ | Behaviour |
| FR-002-04: course complete → Final-Results view | ❌ | Same gap as BR-V3-05 above |
| FR-002-05: update state on every navigation | ❓ | Behaviour |
| FR-002-06: no resume state → first unlocked topic | ❓ | Behaviour |

---

## Breakpoints alignment

| Source | Mobile | Tablet | Desktop |
|---|---|---|---|
| **FRD** (Rashid) | <640px | 640–959px | ≥960px |
| **Our handoff cards** | 375px | 960px | 1024–1440px |

**⚠ Issue**: Our Tablet card is at 960w but FRD calls 960px the start of Desktop. Two options:
- (a) Relabel our 960w card as "Desktop-narrow" and add a true Tablet at 768w
- (b) Keep "Tablet 960w" and clarify in our doc that we treat 640–1023 as Tablet (deviating from FRD)
- (c) Align with FRD: rename 960w card to "Desktop", add a Tablet at 768w or similar

---

## Cross-cutting concerns

### Missing designs that need to be added

1. **CC disabled state** (no captions track) — small UI delta, easy to add
2. **Progress save error toast** — covered by existing Toast/Alert components in DS, just need spec
3. **Final-Results entry view** — new screen, **substantial work**. Different from Course Complete Modal
4. **Re-entry routing diagram** — flow doc showing decision tree (first visit → first unlocked / has resume → last topic / complete → final-results)

### Conflicts to resolve with Rashid

1. **Reading wpm rate** — 150 (body) vs 250 (appendix). Need official answer.
2. **Breakpoints** — Tablet ends at 959 (FRD) vs our 960 card. Align nomenclature.
3. **Resume pill** for auto-scroll re-engagement — our addition, not in FRD. Keep, document, or drop?

### Open issues from FRD itself (Rashid awaits answers)

- OI-001: exact seek offset (5s before or exact)
- OI-002: prerequisite-unlock logic specifics
- OI-004: 3-level hierarchy breadcrumb format on mobile
- OI-005: cross-device resume + PWA/offline scope

---

## Recommended next actions

**Priority 1 (block dev start):**
1. Clarify Reading wpm rate with Rashid (BR-001-05 contradiction)
2. Clarify breakpoint nomenclature (960 = desktop or tablet)
3. Design CC disabled state (small addition, unblocks engineering)

**Priority 2 (parallel with dev):**
1. Design Final-Results entry view (BR-V3-05 / FR-002-04)
2. Spec progress save error toast (use DS Alert component, just write copy)
3. Verify Topic Row Locked variant has non-interactive annotation
4. Verify VILT Topic Row shows scheduled date format per BR-001-04

**Priority 3 (nice to have):**
1. Decide on Resume pill (keep / drop / make FRD addition)
2. Add re-entry flow diagram to Diagram Flows page
