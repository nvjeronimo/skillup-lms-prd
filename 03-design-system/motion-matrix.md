# Motion Matrix — microinteractions contract

*Every microinteraction the learner platform is allowed to make, and the exact token that drives it.*

**Companions.** [`../LMS-HANDOFF/variable-collections-guide.md`](../LMS-HANDOFF/variable-collections-guide.md)
is the token model this plugs into (4 Figma collections, `--sk-*` namespace). The behavioural specs that
*mention* motion today — [`overlay-panels-spec.md`](../LMS-HANDOFF/overlay-panels-spec.md),
[`screens-spec.md`](../LMS-HANDOFF/screens-spec.md), [`phase1-readiness.md`](../LMS-HANDOFF/phase1-readiness.md) —
are upstream of this document: it reconciles them into one scale instead of restating them.
[`footer-contract.md`](footer-contract.md) is the sibling pattern for how a contract doc reads here.

> Anything marked **⚠︎ verify** is a value proposed but not yet agreed. Do not build from a ⚠︎ line
> without confirming. Nothing in §5 is Ready for Dev until §7 Phase 0 has shipped.

---

## 1. How to read this

A microinteraction is not decoration. It is a **state change made legible**. This document exists
because we currently have the opposite: one duration doing every job, and six other durations living
in prose across four specs that nobody has cross-checked.

The matrix crosses three things:

| Axis | What varies | Who controls it |
|---|---|---|
| **A · Component** | which DS piece is changing | the design system |
| **B · State transition** | what it is moving *from* and *to* | the learner or the platform |
| **C · Token** | how long, which curve, which property | this document |

If a proposed animation cannot name all three, it does not go in.

---

## 2. Current state — the audit

Everything below was found in the repo. This is not a strawman; it is what a developer inherits today.

### 2.1 The one real token pair

| Token | Value | Where |
|---|---|---|
| `--ease` | `cubic-bezier(0.4, 0, 0.2, 1)` *(Material standard)* | [`tokens.css:50`](../90-prototypes/storybook-src/src/tokens/tokens.css) |
| `--dur` | `0.22s` | [`tokens.css:51`](../90-prototypes/storybook-src/src/tokens/tokens.css) |

Both are **outside the `--sk-*` namespace** — the only foundation in the system that is not namespaced.

### 2.2 Every duration in the repo, and what it is doing

| Value | Where | Doing what |
|---|---|---|
| `0.18s` | `ModuleAccordionHeader.css:33`, `TopicUnitRow.css:21` | chevron rotate |
| `0.22s` (`--dur`) | `Button.css:11–13` | background · border-color · color |
| `0.22s` (`--dur`) | `StepDot.css:11`, `FooterNav.css:24`, `Topbar.css:76`, `AIPanel.css:104`, `ImmersivePlayer.css:92` | **`transition: all`** — see §4 R2 |
| `0.5s` | `ProgressBar.css:24` | width |
| `120ms` | `skin-switcher.css:38, 73` | box-shadow · transform · background · color |
| `150ms` | `skin-switcher/demo.html:28` | background · color |
| `200ms ease-out` | [`overlay-panels-spec.md:11`](../LMS-HANDOFF/overlay-panels-spec.md) | panel slide-in from right + backdrop fade |
| `200ms ease` | [`screens-spec.md:169`](../LMS-HANDOFF/screens-spec.md) | sidebar 280w ⇄ 72w |
| `200ms ease-out` | [`phase1-readiness.md:67`](../LMS-HANDOFF/phase1-readiness.md) | docked-state height |
| `300ms ease-out` | [`phase1-readiness.md:146`](../LMS-HANDOFF/phase1-readiness.md) | transcript active-line auto-scroll |
| `600ms cubic-bezier(.2,.7,.2,1)` | `skillup-lms-redesign/project/styles.css:448` | progress ring `stroke-dashoffset` |

**Two values in that list are not motion and must not be pulled into the scale:**
- `100ms` — [`FRD_ICP_5.3:251`](../LMS-HANDOFF/BA/FRDs/FRD_ICP_5.3_Video_Lessons.md) "control actions respond
  visually within 100ms" is a **latency budget** (time-to-first-feedback), not an animation duration.
- `300ms` — [`phase1-readiness.md:136`](../LMS-HANDOFF/phase1-readiness.md) bookmark **debounce**.

### 2.3 Reduced motion — specified, barely implemented

| Artefact | Says |
|---|---|
| BR-39 ([`03-business-rules.md:245`](../LMS-HANDOFF/BA/03-business-rules.md)) | respect `prefers-reduced-motion`; disable transcript smooth-scroll, panel slide-in, toast fade; **use instant transitions** |
| P1-70 ([`02-user-stories-phase1.md:1241`](../LMS-HANDOFF/BA/02-user-stories-phase1.md)) | same, as an acceptance scenario |
| [`phase1-readiness.md:215`](../LMS-HANDOFF/phase1-readiness.md) | same |
| `skin-switcher.css:87` | **the only `@media (prefers-reduced-motion: reduce)` block in the repo** |
| [`Foundations-Accessibility.mdx:33`](../90-prototypes/storybook-src/src/stories/Foundations-Accessibility.mdx) | known gap: `Badge tone="live"` blinking dot + AI panel live indicator **do not** respect it |

Persona 07 (Helena · accessibility) is the one this fails.

### 2.4 Diagnosis

1. One duration is doing five different jobs.
2. `transition: all` in 6 files animates properties nobody chose, including layout ones.
3. Motion is the only foundation outside `--sk-*`.
4. A shipped business rule (BR-39) has one implementation, in a module that is not the product.
5. Six durations live in prose. Prose does not compile.

---

## 3. What motion is allowed to do

Four functions. A proposal that serves none of them is rejected — that is the whole gate.

| Function | Question it answers for the learner | Example in our product |
|---|---|---|
| **Confirmation** | "did the system register me?" | Mark as Complete tick draws in |
| **Orientation** | "where did this come from / where am I going?" | overlay panel enters from the edge of the button that opened it |
| **Progress** | "where am I in the path?" | programme bar advances on module completion |
| **Prevention** | "why did that not work?" | locked topic row nudges + reveals its prerequisite |

**Never**: animate the learning content itself. The motion belongs to the chrome, not the matter.

---

## 4. Permanent rules

- **R1 — No raw durations.** Same rule as colour (0 raw hex): 0 raw `ms`. Every transition names a token.
- **R2 — Never `transition: all`.** Name the properties. `all` animates layout properties on state change
  and is the single biggest source of jank we already have (6 files, §2.2).
- **R3 — Animate `transform` and `opacity` only**, wherever a choice exists. For disclosure use
  `grid-template-rows: 0fr → 1fr`, not `height`.
- **R4 — Nothing over 300ms on a repeated critical path.** The 500ms tier is for *passive* progress the
  learner watches, never for something blocking their next click.
- **R5 — Motion never carries state alone.** Colour-blind rule extended: if a state is only legible
  because something moved, it is not legible. Pair with icon + text, and announce via `aria-live`
  where the state matters (already the pattern in `phase1-readiness` §screen reader).
- **R6 — Reduced motion degrades to opacity, not to nothing.** See §6.
- **R7 — Motion is skin-agnostic.** It lives in `--sk-*` and is **not** re-aliased per skin or theme,
  unlike colour. There is no `--lms-duration-*` layer. *(Breakpoint variance: ⚠︎ verify, §8 Q1.)*

---

## 5. The scale

Every tier is anchored to a value **already in the repo**, so adoption is a rename, not a redesign.
Two values change: `--dur` 220 → 200, and the ring 600 → 500.

### 5.1 Duration

| Token | Value | Anchored to | Use |
|---|---|---|---|
| `--sk-duration-instant` | `80ms` | *(new)* | press / active, toggle flip |
| `--sk-duration-fast` | `120ms` | `skin-switcher.css:38, 73` ✓ | hover, focus ring, colour-only change |
| `--sk-duration-base` | `200ms` | overlay panel · sidebar · docked state ✓ *(replaces `--dur` 220)* | the default: enter/exit of small surfaces, tabs, chevrons |
| `--sk-duration-slow` | `300ms` | transcript auto-scroll ✓ | accordion, drawers, scroll-into-view, modals |
| `--sk-duration-narrative` | `500ms` | `ProgressBar.css:24` ✓ *(ring 600 → 500)* | progress bars, rings, count-up — **passive only** |

`0.18s` (chevrons) and `150ms` (demo) round into `base` and `fast` respectively.

### 5.2 Easing

| Token | Curve | Use |
|---|---|---|
| `--sk-ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | default — **unchanged**, this is today's `--ease` |
| `--sk-ease-out` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | entrances, progress. Satisfies the three specs that already say *"ease-out"* |
| `--sk-ease-in` | `cubic-bezier(0.55, 0, 1, 0.45)` | exits, dismissals |
| `--sk-ease-emphasis` | `cubic-bezier(0.34, 1.3, 0.64, 1)` | **certificate only** — the one overshoot the product is allowed |

### 5.3 Displacement

| Token | Value | Use |
|---|---|---|
| `--sk-shift-nudge` | `4px` | prevention nudge, micro-settle |
| `--sk-shift-enter` | `8px` | card / toast / sticky CTA entrance |
| `--sk-shift-surface` | `16px` | drawer, sheet, overlay panel |

Rule: **displacement and duration move together.** 4px never gets 300ms.

### 5.4 The token file — Phase 0 deliverable

Ships as `LMS-HANDOFF/tokens/motion.css`, alongside `colors.css` and `typography.css`.
**Not yet created.** Ready to lift:

```css
/* SkillUp DS Motion Tokens (--sk-) — skin-agnostic, theme-agnostic */
:root {
  --sk-duration-instant:   80ms;
  --sk-duration-fast:     120ms;
  --sk-duration-base:     200ms;
  --sk-duration-slow:     300ms;
  --sk-duration-narrative:500ms;

  --sk-ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --sk-ease-out:      cubic-bezier(0.2, 0.7, 0.2, 1);
  --sk-ease-in:       cubic-bezier(0.55, 0, 1, 0.45);
  --sk-ease-emphasis: cubic-bezier(0.34, 1.3, 0.64, 1);

  --sk-shift-nudge:    4px;
  --sk-shift-enter:    8px;
  --sk-shift-surface: 16px;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --sk-duration-instant:   1ms;
    --sk-duration-fast:      1ms;
    --sk-duration-base:      1ms;
    --sk-duration-slow:      1ms;
    --sk-duration-narrative: 1ms;
    --sk-shift-nudge:        0px;
    --sk-shift-enter:        0px;
    --sk-shift-surface:      0px;
  }
}
```

`1ms` rather than `0s` so `transitionend` still fires and JS that waits on it does not hang.
Displacement collapsing to `0` is what makes R6 work: the *state* still changes, the *travel* does not.

---

## 6. Reduced motion — refining BR-39

BR-39 says **"use instant transitions"**. Taken literally that removes the confirmation function
(§3) for the learners who most need it: an instant, uncued state change is the hardest kind to notice.

**Proposed refinement (⚠︎ verify — needs BA sign-off before BR-39 is edited):**

| Category | Full motion | Reduced motion |
|---|---|---|
| Travel (slide, scroll, parallax-ish) | as specced | **removed** — appears in place |
| Opacity (fade in/out) | as specced | **kept**, at `--sk-duration-fast` |
| Colour / border state | as specced | **kept**, at `--sk-duration-fast` |
| Looping (live dot pulse, spinner) | as specced | **stopped**; live-ness carried by icon + text |
| Progress (bar, ring, count-up) | animates to value | **jumps** to value, `aria-live` announces it |

Rationale: BR-39's three named targets — transcript smooth-scroll, panel slide-in, toast fade — are
two *travel* cases and one *opacity* case. Travel should go. The toast fade should stay, or the toast
appears and vanishes with no onset at all.

Also closes the [`Foundations-Accessibility.mdx:33`](../90-prototypes/storybook-src/src/stories/Foundations-Accessibility.mdx)
gap: `Badge tone="live"` and the AI panel indicator fall under **Looping**.

---

## 7. The matrix

Component names are the real ones in [`90-prototypes/storybook-src/src/components/`](../90-prototypes/storybook-src/src/).
`P` = phase (§8). Blank reduced-motion cell = the token collapse in §5.4 handles it with no extra code.

### 7.1 Atoms

| Component | Transition | Property | Duration | Easing | Reduced motion | P |
|---|---|---|---|---|---|---|
| `Button` | rest → hover | `background`, `border-color`, `color` | fast | standard | — | 1 |
| `Button` | hover → press | `transform: scale(.98)` | instant | standard | no scale | 1 |
| `Button` | idle → loading | label → spinner, **width locked** | base | standard | spinner static + `aria-busy` | 1 |
| `Button` | loading → done | spinner → check draw | base | out | check appears | 1 |
| `Badge tone="live"` | looping | dot `opacity` pulse | narrative | standard | **stopped** — icon + "Live" text | 1 |
| `Bookmark` | off → on | icon fill + `scale(1→1.15→1)` | fast | emphasis | fill only | 2 |
| `ProgressBar` | value change | `width` | narrative | out | jump + `aria-live` | 2 |
| `StatusIcon` | → complete | check `stroke-dashoffset` draw | base | out | check appears | 2 |
| `StepDot` | → active | `background`, `transform: scale` — **replaces `all`** | fast | standard | no scale | 1 |
| `TopicTypeIcon` | — | *(static)* | — | — | — | — |
| `ModuleNumberLabel` | — | *(static)* | — | — | — | — |

### 7.2 Molecules

| Component | Transition | Property | Duration | Easing | Reduced motion | P |
|---|---|---|---|---|---|---|
| `Tab` | tab A → B | indicator `transform: translateX` *(shared element, not fade)* | base | standard | indicator jumps | 1 |
| `Tab` | panel swap | `opacity` + `translateY(nudge)` | base | out | opacity only | 1 |
| `QuizOption` | → selected | radio fill `scale(0→1)` from centre + border | fast | out | fill, no scale | 3 |
| `QuizOption` | → correct | border run + check draw | base | out | border + check, static | 3 |
| `QuizOption` | → incorrect | `translateX` shake, 2 cycles, `nudge` | base | standard | **no shake** — border + ✕ + text | 3 |
| `QuizOption` | → rationale reveal | `grid-template-rows: 0fr→1fr` | slow | out | opacity only | 3 |
| `TopicUnitRow` | rest → hover | `transform` *(already 0.18s → base)* | base | standard | — | 1 |
| `TopicUnitRow` | locked, on click | `translateX` nudge + tooltip | base | standard | **no nudge** — tooltip only | 2 |
| `TopicUnitRow` | → complete | StatusIcon draw + row tint | base | out | tint only | 2 |
| `ModuleAccordionHeader` | collapsed ⇄ expanded | chevron `rotate` **and** body `grid-template-rows` — *same duration, same curve* | base | standard | — | 1 |
| `ModuleAccordionHeader` | body content | `opacity`, `40ms` delay | fast | out | no delay | 1 |
| `TranscriptLine` | → active | `background`, left border | fast | standard | — | 3 |
| `TranscriptLine` | auto-scroll | scroll to centre *(the 300ms already specced)* | slow | out | **`behavior:'auto'`** — BR-39 | 3 |
| `NoteCard` | → saved | button → check, revert after 1.2s | base | out | check, no revert animation | 2 |
| `Breadcrumb` | rest → hover | `color` | fast | standard | — | 1 |

### 7.3 Organisms

| Component | Transition | Property | Duration | Easing | Reduced motion | P |
|---|---|---|---|---|---|---|
| `Sidebar` | 280w ⇄ 72w | `width` *(200ms already specced ✓)* | base | standard | — | 1 |
| `Sidebar` | active item change | rail indicator `translateY` | base | standard | jump | 3 |
| `Topbar` | toggle press | `background` — **replaces `all`** | fast | standard | — | 1 |
| `OverlayPanel` | closed → open | `translateX(surface)` + backdrop `opacity`, synchronised *(200ms ease-out already specced ✓)* | base | out | opacity only | 1 |
| `OverlayPanel` | open → closed | same, reversed | base | **in** | opacity only | 1 |
| `AIPanel` | live indicator | looping `opacity` | narrative | standard | **stopped** | 1 |
| `FooterNav` | topic → topic | "N of M" digit roll | base | out | digit swaps | 2 |
| `FooterNav` | next enabled | `opacity` + weight shift | fast | standard | — | 2 |
| `VideoPlayer` | control press | **≤100ms to first visual feedback** — a latency budget, not a duration (§2.2) | instant | standard | — | 3 |
| `VideoPlayer` | scrub bar hover | `height` grow | fast | standard | — | 3 |
| `VideoPlayer` | ≥90% → auto-complete | Mark-as-Complete → `Completed ✓`, check draws | base | out | badge swaps | 3 |
| `Quiz` | question N → N+1 | outgoing `translateX(-enter)`, incoming `+enter` | base | standard | opacity only | 3 |
| `Quiz` | → result | score count-up + ring fill | narrative | out | final value + `aria-live` | 3 |
| Toast | enter | `translateY(enter)` + `opacity` | base | out | opacity only *(kept — §6)* | 1 |
| Toast | exit | `opacity` | fast | in | — | 1 |
| Mark as Complete | the completion chain | check draws → rail row flips → programme bar advances, **100ms stagger** | base → narrative | out | all three, no stagger | 2 |
| `Certificate` | reveal | `scale(.98→1)` + `opacity` | slow | **emphasis** | opacity only | 4 |

**The completion chain is the highest-value row in this table.** Today Mark as Complete changes one
control. The learner never sees the consequence — the sidebar row and the programme bar update out of
frame. The 100ms stagger exists to make cause and effect visible; it is the entire motivational payload
of the product, and it costs 500ms once per topic.

---

## 8. Roadmap

| Phase | Scope | Deliverable | Gate |
|---|---|---|---|
| **0 · Foundation** | tokens + reduced-motion + ADR | `LMS-HANDOFF/tokens/motion.css` · motion in `_Primitives` + `1. Semantics` (Figma) · ADR `00-decisions/024` · Storybook Foundations-Motion page | `--dur`/`--ease` deleted; 0 raw `ms`; the 6 `transition: all` named |
| **1 · State feedback** | hover · focus · press · loading · disabled · saved, on every atom/molecule | matrix §7.1–7.2 rows marked P1 | every DS component has all 6 states in Storybook, reduced-motion snapshot included |
| **2 · Progress & completion** | ProgressBar · StatusIcon · FooterNav · **the completion chain** | matrix rows marked P2 | a learner can see a completion propagate without scrolling |
| **3 · Quiz & player** | QuizOption · Quiz · VideoPlayer · TranscriptLine · Sidebar rail | matrix rows marked P3 | every state in `quizzes/06-quiz-screen-matrix.md` has a defined transition |
| **4 · Reward** | Certificate | the one `emphasis` moment | — |

Phase 0 is the only one with a hard dependency. 1–4 can be resequenced.

**Anti-scope — explicitly rejected:** confetti on a correct answer (infantilises a B2B product and
undermines the assessment); staggered entrance on lists over ~8 items; parallax or scroll-jacking in
the content column; sound by default; any animation of the learning content itself.

---

## 9. Open questions

| # | Question | Blocks |
|---|---|---|
| Q1 | Does motion vary by breakpoint? `3. Responsive` exists for size/space/radius — do durations shorten on mobile, or stay fixed? *(Recommendation: fixed. Duration is perceptual, not spatial.)* | Phase 0 — Figma collection placement |
| Q2 | Does BR-39 get edited to the §6 refinement, or does the matrix stay subordinate to "instant transitions"? Needs BA. | Phase 0 |
| Q3 | Do motion tokens live in `_Primitives` + `1. Semantics`, or in a 5th collection? `_Primitives/Numeric` is the natural host but is currently spatial. | Phase 0 |
| Q4 | Ring 600 → 500 and `--dur` 220 → 200: accepted as invisible, or do they need a visual side-by-side? | Phase 0 |
| Q5 | Storybook has no motion addon. Do we add interaction tests for the reduced-motion path, or verify by hand? | Phase 1 |

---

## 10. What this produces

| Artefact | Path | Status |
|---|---|---|
| Token file | `LMS-HANDOFF/tokens/motion.css` | ⚪ Phase 0 |
| Figma variables | `_Primitives` + `1. Semantics` (⚠︎ Q3) | ⚪ Phase 0 |
| Decision record | `00-decisions/024-motion-scale.md` | ⚪ Phase 0 |
| Storybook page | `Foundations/Motion` | ⚪ Phase 0 |
| BR-39 amendment | `LMS-HANDOFF/BA/03-business-rules.md` | ⚪ blocked on Q2 |
