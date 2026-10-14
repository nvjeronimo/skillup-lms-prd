# Motion Matrix — microinteractions contract

*Every microinteraction the learner platform is allowed to make, the token that drives it, and the order we build it in.*

| | |
|---|---|
| **Status** | 🟢 **Contract — built and merged** (v2, 14 Oct 2026; prototype PRs #153–#160 merged the same day). The tokens themselves stay *proposed* until the team approves them (Q6). v1 was the August draft from the "Microinterações no LMS" session. |
| **Decisions** | Q1–Q4 answered by Nelson on 14 Oct 2026 (§9). Record: [`../00-decisions/024-motion-scale.md`](../00-decisions/024-motion-scale.md). |
| **Builds in** | the prototype `nvjeronimo/skillup-lms-prototype` (Next 14 + Tailwind), in six PRs (§8). |
| **Documented in** | this file · ADR 024 · Figma DS: `Motion` collection (13 variables, unpublished) + [doc frame `22639-583252`](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22639-583252) · ICP Hub (Motion section). |

> Anything marked **⚠︎ open** is not agreed yet. Do not build from a ⚠︎ line without confirming.

---

## 1. How to read this

A microinteraction is not decoration. It is a **state change made legible**. The matrix crosses three things:

| Axis | What varies | Who controls it |
|---|---|---|
| **A · Component** | which DS piece is changing | the design system |
| **B · State transition** | what it moves *from* and *to* | the learner or the platform |
| **C · Token** | how long, which curve, how far | this document |

If a proposed animation cannot name all three, it does not go in.

---

## 2. Where we start (audit of the prototype, 14 Oct 2026)

v1 audited the old Storybook (`--dur: 0.22s`, `transition: all` in 6 files). That code is no longer the product.
The prototype is. What it has today:

| Finding | Where | Consequence |
|---|---|---|
| **No motion token.** `200ms`, `duration-200`, `ease-out` are typed by hand; `transitionDuration: {200}` is the only entry in `tailwind.config.ts` | ~20 sites (`ModuleHeader`, `SectionHeader`, `PlayerShell`, `VideoPlayer`, `ModuleList`, `ContentTabs`, …) | values drift; nothing to hand to dev |
| **Surfaces enter but never leave.** `sk-animate-slide-right/left` and `sk-animate-fade` run on mount; closing unmounts at once | `OverlayPanel`, the `PlayerShell` drawer, 5 modals, `HostedProgressCard`, `Toast`, `AssistantWindow` | the most visible break: things pop out of existence |
| **Completion has no consequence on screen.** Mark as Complete changes its button; the rail row and the progress ring change in the same frame, often out of view | `ContentFeedback`, `TopicActionBar`, `TopicRow`, `OverallProgress` | the learner never sees cause → effect |
| **Quiz states swap with no transition** | `QuizCard`, `QuizNav` | correct / incorrect is read by colour + icon (fine), with no onset |
| **The assistant appears and vanishes; "Thinking…" is static text; auto-scroll jumps** | `AssistantLauncher`, `AssistantWindow`, `AssistantChat` | the chat feels like a page swap, not a conversation |
| **Reduced motion is already right** (PR 58, 1 Oct): movement removed, colour/opacity kept, spinner breathes, OS setting **and** the Accessibility panel switch (`data-reduce-motion`) | `app/globals.css` | keep the behaviour; move it onto the tokens |

Two values in the BA docs look like motion and are not: the **100 ms** in FRD 5.3 is a *latency budget*
(time to first feedback), and the **300 ms** bookmark value is a *debounce*. Neither enters the scale.

---

## 3. What motion is allowed to do

Four functions. A proposal that serves none of them is rejected.

| Function | Question it answers for the learner | Example |
|---|---|---|
| **Confirmation** | "did the system register me?" | Mark as Complete: the check draws in |
| **Orientation** | "where did this come from / where did it go?" | the assistant window grows out of its launcher and shrinks back into it |
| **Progress** | "where am I in the path?" | the course ring advances after a completion |
| **Prevention** | "why did that not work?" | a locked topic row explains itself |

**Never** animate the learning content itself. Motion belongs to the chrome, not the matter.

---

## 4. Permanent rules

- **R1 — No raw durations or curves.** 0 raw `ms`, 0 raw `cubic-bezier`, 0 `ease-out`/`ease-in` keywords in
  components. Enforced by a new rule `raw-motion` in `scripts/check-tokens.mjs`.
- **R2 — Never `transition: all`** (or Tailwind's bare `transition`, a property list we did not choose). Name the properties.
- **R3 — Animate `transform` and `opacity`** wherever a choice exists. Disclosure uses `grid-template-rows: 0fr → 1fr`, not `height`.
- **R4 — Nothing over 200 ms on a repeated critical path.** `medium2` (300) is for surfaces; `long2` (500) only for
  *passive* progress the learner watches, never for something that blocks the next click.
- **R5 — Motion never carries state alone.** Every state that moves is also legible by icon + text, and announced
  through `aria-live` when it matters.
- **R6 — Reduced motion removes travel, keeps feedback** (§6). Decided 14 Oct (Q2).
- **R7 — Motion is skin-, theme- and breakpoint-agnostic.** One mode only. Decided 14 Oct (Q1).
- **R8 — Exits are faster than entrances** and use the accelerate curve. A surface leaving must never delay the learner.
- **R9 — One overshoot in the product.** `easing/emphasized` is reserved for the certificate reveal. Nothing else bounces.
- **R10 — A surface leaves toward where it came from.** Panels back to their edge, the assistant back into its launcher, toasts down.

---

## 5. The scale

Names follow the rule agreed on 17 Sep 2026: *motion adopts Material 3's names; values stay ours*. Our durations
land exactly on Material's slots, so a Flutter or MUI consumer reads them unchanged.

### 5.1 Duration

| Token | Value | Material slot | Was (v1 draft) | Use |
|---|---|---|---|---|
| `duration/short2` | `100ms` | short2 = 100 ✓ | `instant` 80 | press, toggle flip |
| `duration/short3` | `150ms` | short3 = 150 ✓ | `fast` 120 | hover, focus ring, colour-only change, exits of surfaces |
| `duration/short4` | `200ms` | short4 = 200 ✓ | `base` 200 | **the default**: small surfaces enter, chevrons, messages, toasts |
| `duration/medium2` | `300ms` | medium2 = 300 ✓ | `slow` 300 | panels, drawer, sheet, accordion, scroll-into-view |
| `duration/long2` | `500ms` | long2 = 500 ✓ | `narrative` 500 | progress bars, rings, count-up — **passive only** |

Changes against v1: 80 → 100 and 120 → 150, so every value sits on a Material slot. Both are below what a learner
can tell apart; Q4 accepted value changes of this size without a side-by-side.

### 5.2 Easing

| Token | Curve | Material slot | Use |
|---|---|---|---|
| `easing/standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | name ✓, **value ours** (M3's is `0.2,0,0,1`; ours is today's `--ease`) | anything that changes in place: colour, rotate, ring |
| `easing/standard-decelerate` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | name ✓, value ours | **entrances**, progress |
| `easing/standard-accelerate` | `cubic-bezier(0.55, 0, 1, 0.45)` | name ✓, value ours | **exits**, dismissals |
| `easing/emphasized` | `cubic-bezier(0.34, 1.3, 0.64, 1)` | name ✓, value ours (an overshoot; M3's has none) | **certificate only** (R9) |
| `easing/linear` | `linear` | linear ✓ | looping indicators only (spinner, typing dots) |

### 5.3 Distance

Material has no displacement tokens, so these keep our names (the same rule as spacing).

| Token | Value | Use |
|---|---|---|
| `distance/nudge` | `4px` | micro-settle, staggered action buttons |
| `distance/enter` | `8px` | message, card, toast entrance |
| `distance/surface` | `16px` | the assistant window, dialogs |

Panels and the drawer travel their full width (`100%`), not a token: they come from off-screen.
**Distance and duration move together**: `nudge` never gets `medium2`.

### 5.4 Code

`tokens/motion.css` in the prototype, imported next to `colors.css`. CSS names follow the colour convention
(`--color-*` → `--motion-*`):

```css
:root {
  --motion-duration-short2: 100ms;
  --motion-duration-short3: 150ms;
  --motion-duration-short4: 200ms;
  --motion-duration-medium2: 300ms;
  --motion-duration-long2: 500ms;

  --motion-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --motion-easing-standard-decelerate: cubic-bezier(0.2, 0.7, 0.2, 1);
  --motion-easing-standard-accelerate: cubic-bezier(0.55, 0, 1, 0.45);
  --motion-easing-emphasized: cubic-bezier(0.34, 1.3, 0.64, 1);
  --motion-easing-linear: linear;

  --motion-distance-nudge: 4px;
  --motion-distance-enter: 8px;
  --motion-distance-surface: 16px;
}
```

Tailwind exposes them as `duration-short4`, `ease-standard-decelerate`, `translate-y-enter`, and so on, replacing
the lone `transitionDuration: {200}`. Reduced motion (§6) is applied on these variables, not per component.

### 5.5 Figma

A new collection **`Motion`**, one mode (Q3). `duration/*` and `distance/*` are FLOAT (ms and px). `easing/*` are
STRING holding the `cubic-bezier(...)` text, since Figma has no curve type. Code syntax set to the CSS names
above. Descriptions carry the "Use" column. These are new tokens: per the 21 Sep rule they need the team's
approval before the collection is published (⚠︎ open, §9 Q6).

---

## 6. Reduced motion (decided 14 Oct, Q2)

BR-39 says "use instant transitions". Applied literally it removes *confirmation* for the learners who need it
most. The rule we build is the one PR 58 already shipped:

| Category | Full motion | Reduced motion |
|---|---|---|
| Travel (slide, scale, scroll, nudge) | as specced | **removed**: the surface appears in place |
| Opacity (fade in / out) | as specced | **kept**, at `short3` |
| Colour / border / fill | as specced | **kept**, at `short3` |
| Looping (spinner, typing dots, live dot) | as specced | **stopped or breathing**: spinner pulses opacity, typing dots become the word "Thinking…", live dot is static with its "Live" text |
| Progress (bar, ring, count-up) | animates to value | **jumps** to value; `aria-live` announces it |

Mechanism: under `prefers-reduced-motion: reduce` **and** `[data-reduce-motion]`, the three `distance/*` collapse to
`0px`, `medium2` and `long2` collapse to `short3`, and the keyframes that travel are swapped for the fade. The
existing `transition-property` guard in `globals.css` stays as the safety net.

**BR-39 is not edited by us.** The refinement goes to the BA as a proposed amendment (⚠︎ open, Q2b).

---

## 7. The matrix

Component names are the prototype's (`components/…`). The PR that builds each table is in §8. Durations and curves
are the token names of §5. A blank reduced-motion cell means §6 handles it with no extra code.

### 7.1 Surfaces — enter and leave (PR 2)

The mechanism: a small hook `useExitTransition(open)` returns `{ mounted, state }`. On close it sets
`data-state="closed"`, waits for `animationend` (or a timeout of the exit duration + 50 ms, so it never hangs), then
unmounts. Focus returns to the opener and the page un-inerts at the **start** of the exit (no wait for keyboard users); the leaving surface is `inert`, `aria-hidden` and click-through. A dialog keeps what it showed while it leaves (`useFrozenWhileClosed`). Built: PR #154.

| Component | Transition | Property | Duration | Easing | Reduced motion |
|---|---|---|---|---|---|
| `OverlayPanel` (Notifications, Saved, Discussions) | open | `translateX(100% → 0)` + backdrop `opacity` | medium2 | standard-decelerate | fade only, short3 |
| `OverlayPanel` | close | reverse | short4 | standard-accelerate | fade only |
| `PlayerShell` mobile drawer | open / close | `translateX(-100% → 0)` + backdrop, as above | medium2 / short4 | decel / accel | fade only |
| Modals (`CompletionQuestionModal`, `CourseCompleteModal`, `NoteEditorModal`, `ReportIssueModal`, `HostedProgressCard`) | open | `opacity` + `scale(.96 → 1)` + backdrop | short4 | standard-decelerate | fade only |
| Modals | close | reverse | short3 | standard-accelerate | fade only |
| `Toast` | enter | `translateY(distance/enter → 0)` + `opacity` | short4 | standard-decelerate | fade only |
| `Toast` | leave (timeout or dismiss) | `opacity` + `translateY(→ distance/enter)` | short3 | standard-accelerate | fade only |
| Chevrons (`ModuleHeader`, `SectionHeader`, `ModuleList`, `ContentTabs`) | collapsed ⇄ expanded | `rotate` | short4 | standard | snaps (existing guard) |
| Accordion bodies (same components) | collapsed ⇄ expanded | `grid-template-rows: 0fr ⇄ 1fr` + content `opacity` | medium2 | standard | opacity only |

### 7.2 The completion chain (PR 3)

Today Mark as Complete changes one control. The chain makes the consequence visible, in order, once per topic.

| t | Component | What happens | Duration | Easing | Reduced motion |
|---|---|---|---|---|---|
| 0 | `ContentFeedback` / `TopicActionBar` Mark as Complete | the button is replaced by the label-only badge "Marked as completed", which **pops** in (no check on the badge: the DS badge is label-only) | short4 | standard-decelerate | badge appears |
| +100 ms | `TopicRow` in the sidebar (if visible) | status icon draws its check; row background tints once and settles | short4 | standard-decelerate | icon swaps |
| +200 ms | `OverallProgress` ring (sidebar / topbar) and `ProgressRail` | arc / bar advance **from the old value** to the new | long2 | standard-decelerate | jumps |
| +200 ms | screen reader | the existing toast "Marked as complete · {title}" is the one announcement; nothing is added | — | — | same |

Same chain for the two other ways a topic completes: the video's ≥90% auto-complete (`VideoPlayer`: the learner
sees the system decide), and Mark as Complete from the Next dialog (`CompletionQuestionModal`: the chain plays
after the dialog's exit). Undo (if the learner un-marks) reverses with no stagger at short3.
The collapsed rail plays the same beats. On a phone there is no ring outside the drawer, so the toast carries the signal (⚠︎ open: a phone progress signal, asked in PR #155). The video ≥90% auto-complete does not exist yet in the prototype; when built, it calls `markComplete` and gets the chain. A passed quiz plays it too (PR #157). Built: PR #155.

### 7.3 Quiz (PR 4)

| Component | Transition | Property | Duration | Easing | Reduced motion |
|---|---|---|---|---|---|
| `QuizCard` option | → selected | radio dot `scale(0 → 1)` from the centre + border colour | short3 | standard-decelerate | fill, no scale |
| `QuizCard` option | → correct | check **draws** + border to success | short4 | standard-decelerate | check appears |
| `QuizCard` option | → incorrect | ✕ appears + border to error. **No shake**: the v1 4 px nudge is dropped as punitive in a graded B2B context | short4 | standard | — |
| `QuizCard` rationale | hidden → shown | `grid-template-rows: 0fr → 1fr` + `opacity` | medium2 | standard-decelerate | opacity only |
| `QuizCard` question N → N+1 | swap | outgoing `opacity` + `translateX(-distance/enter)`, incoming from `+distance/enter`; reversed for Previous (direction = progression) | short4 | standard | fade only |
| `QuizNav` stepper | current step moves | fill `scaleX` along the track | short4 | standard | jumps |
| Submit button | idle → submitting → result | width locked; label → spinner → result label — *not built: the quiz Submit has no loading state yet* | short4 | standard | spinner breathes |
| Results | score appears | percentage counts up from 0 (no ring on the results screen); screen readers get the final value only. Revisited answers render still; only the question body re-mounts, so Back/Skip keep focus. Built: PR #157 | long2 | standard-decelerate | final value at once |

### 7.4 AI Assistant (PR 5)

The assistant is a floating chat (decided 13 Oct): launcher bottom-left on desktop/tablet, bottom-right on
phones; window on desktop, full-screen sheet on phones. Its motion answers one question: *this conversation
lives in that button*.

| Component | Transition | Property | Duration | Easing | Reduced motion |
|---|---|---|---|---|---|
| `AssistantLauncher` | rest → hover | `scale(1 → 1.04)` + shadow | short3 | standard | shadow only |
| `AssistantLauncher` | press | `scale(.96)` | short2 | standard | — |
| `AssistantLauncher` | closed ⇄ open icon | mark ⇄ ✕ cross-fade with a 90° rotate | short4 | standard | cross-fade only |
| `AssistantLauncher` badge | count appears / grows | `scale(.6 → 1)` + `opacity` | short4 | standard-decelerate | fade only |
| `AssistantWindow` (desktop) | open | grows **out of the launcher**: `transform-origin` at the launcher's corner, `opacity` + `scale(.96 → 1)` + `translateY(distance/surface → 0)` | short4 | standard-decelerate | fade only |
| `AssistantWindow` (desktop) | close | back into the launcher (reverse) | short3 | standard-accelerate | fade only |
| `AssistantWindow` (phone sheet) | open / close | `translateY(100% → 0)` and back | medium2 / short4 | decel / accel | fade only |
| Learner message | sent | bubble enters: `opacity` + `translateY(distance/enter → 0)` | short4 | standard-decelerate | fade only |
| Thinking | waiting for the first token | three dots pulsing in sequence (`opacity`, 150 ms apart, loop 1.2 s), replacing the static "Thinking…"; the word stays for screen readers | — | linear | the word "Thinking…", no loop |
| Answer | streaming | the bubble enters once (as a learner message); **text streams with no per-word animation** (it is content, §3) | short4 | standard-decelerate | fade only |
| Answer actions (route buttons) | answer finished | buttons enter one after another, 50 ms apart, `opacity` + `translateY(distance/nudge)` | short4 | standard-decelerate | all at once, fade |
| Suggestion chips | one chosen | the chip set fades out as the learner message enters | short3 | standard-accelerate | — |
| Conversation scroll | new message | smooth scroll to the end **only if the learner is already at the end**; otherwise a "New message ↓" pill enters (as a toast) and scrolls on click | medium2 | standard | `behavior: auto` |
| First steps (`FirstStepsView`) | a step ticks itself | check draws (same as §7.2 t=0) + "n of 5" updates; the step announced once (already built) | short4 | standard-decelerate | check appears |
| First steps | all five done | the list settles to its finished state; no celebration (R9) | short4 | standard | — |
| Error | an answer fails | bubble enters with its Retry button; nothing shakes | short4 | standard-decelerate | fade only |

### 7.5 Smoothness — pages, scroll, filters, defaults (PR 6, added by Nelson 14 Oct)

"Transições entre páginas, smooth scroll, filters mais suaves, no geral tudo mais suave."

| Where | Transition | Property | Duration | Easing | Reduced motion |
|---|---|---|---|---|---|
| Platform pages (`app/platform/*`: Dashboard, My Learning, Program, Course, Certificate) | route → route | the page's main content enters: `opacity` + `translateY(distance/nudge → 0)`; the top bar does **not** animate (it stays, it is chrome) | short4 | standard-decelerate | fade only |
| Player, topic → topic | Next / Previous / a rail row | only the topic body enters (as above); topbar, sidebar and footer stay still. No exit animation: the learner must never wait for the old topic to leave | short4 | standard-decelerate | fade only |
| Loading → content (`app/platform/loading.tsx`) | spinner → page | the page entrance above replaces the pop | short4 | standard-decelerate | fade only |
| In-page scroll (anchors, "jump to", scroll-into-view, the assistant, transcript) | jump → glide | `scroll-behavior: smooth` on the scroll containers (`.sk-scroll`, the content column) and a `scrollToElement` helper; **not** on `<html>`, so route changes still land at the top instantly | browser | browser | `auto` |
| `FilterChip` (My Learning status, Notes, panel filters) | off ⇄ on | background, border, text colour together; count badge colour | short3 | standard | — |
| Filtered list | filter A → B | the list cross-fades (`opacity`, keyed on the filter); up to 8 rows rise one after another (`distance/nudge`, `short2 / 2` apart), more than 8 enter together | short4 | standard-decelerate | fade, no stagger |
| Result count ("12 courses") | value change | the number swaps with a fade, no count-up (it is not progress) | short3 | standard | — |
| Every hover / focus / pressed colour in the product | rest ⇄ hover/focus | Tailwind's default `transition-*` duration and easing now **are** `short3` + `standard`, so every `transition-colors` is on the scale; interactive elements that change colour on hover without any transition get `transition-colors` | short3 | standard | — |
| Focus ring | → visible | `outline-color` / `box-shadow` fade, never the offset | short3 | standard | — |

### 7.6 Later (not in this block)

Kept from v1 for the next block: `Button` press scale and loading → done; `Bookmark` fill; tab indicator slide;
`TranscriptLine` active + auto-scroll; `TopicRow` locked nudge + tooltip; `TopicFooterNav` "n of N" digit roll;
`Badge` live dot; `Certificate` reveal (the only `emphasized`).

**Anti-scope, rejected:** confetti on a correct answer or a finished checklist; staggered entrance on lists over
~8 items; parallax or scroll-jacking in the content column; sound; per-word animation of streamed text; any
animation of the learning content itself.

---

## 8. Build order (prototype PRs)

Each PR: branch + squash-merged PR on `nvjeronimo/skillup-lms-prototype`, `package-lock.json` never committed;
`next build`, `next lint`, `tsc --noEmit`, `lint:tokens`, `pnpm test` pass; verified in the preview with motion
on, with the OS reduced-motion setting, and with the Accessibility panel switch.

| PR | Scope | Done when |
|---|---|---|
| **1 · Foundation** — [#153](https://github.com/nvjeronimo/skillup-lms-prototype/pull/153) | `tokens/motion.css`, Tailwind theme, reduced motion moved onto the variables, `raw-motion` lint rule, the ~20 hand-typed sites migrated, `useExitTransition` + vitest | 0 raw `ms` / curves in `components` + `app`; behaviour unchanged |
| **2 · Surfaces** — [#154](https://github.com/nvjeronimo/skillup-lms-prototype/pull/154) | §7.1 | every surface in §7.1 leaves the way it came; focus returns after the exit |
| **3 · Completion chain** — [#155](https://github.com/nvjeronimo/skillup-lms-prototype/pull/155) | §7.2 | a completion is visible in three places in order, and announced once |
| **4 · Quiz** — [#157](https://github.com/nvjeronimo/skillup-lms-prototype/pull/157) | §7.3 | every quiz state has an onset; no shake anywhere |
| **5 · Assistant** — [#158](https://github.com/nvjeronimo/skillup-lms-prototype/pull/158) | §7.4 | the window grows from and returns to the launcher; thinking, streaming, actions and scroll behave as specced |
| **6 · Smoothness** — [#160](https://github.com/nvjeronimo/skillup-lms-prototype/pull/160) | §7.5 | pages and topics enter, in-page scroll glides, filters cross-fade, every hover colour eases on the scale |

All six merged to `main` on 14 Oct 2026, in order. They were built as a **stack** (each PR targets the previous branch): retarget each to `main` before merging the one below it, or merge them in order #153 → #160.

### 8.1 Documentation, same block

| Where | What |
|---|---|
| This file | from "Spec for review" to "Contract" when PR 1 merges; each §7 table gets its PR link as it lands |
| `00-decisions/024-motion-scale.md` | the scale, Material names, Q1–Q4 (proposed → accepted on approval) |
| Figma DS | `Motion` collection (§5.5) + a documentation frame on `❖ LMS · IN REVIEW / NOT FOR BUILD` in the block-template format: the scale, the rules, and one storyboard per flow (§7.1–7.4: before → during → after, with token labels). A short motion note on the main components it touches (once per component, never per instance). Parallel-sessions check before every Figma write |
| ICP Hub | a **Motion** section: the scale, R1–R10, the four flows with links to the prototype routes, PR status |
| BA | the BR-39 amendment, sent as a proposal (not applied) |

---

## 9. Decisions and open questions

| # | Question | Answer |
|---|---|---|
| Q1 | Does motion vary by breakpoint? | **No.** One mode. (Nelson, 14 Oct) |
| Q2 | Reduced motion: BR-39 literally, or remove travel / keep feedback? | **Remove travel, keep feedback** (§6). (Nelson, 14 Oct) |
| Q2b | Who amends BR-39? | ⚠︎ open: the BA; we send the proposal |
| Q3 | Where do the Figma variables live? | **Own `Motion` collection.** (Nelson, 14 Oct) |
| Q4 | Accept small value changes without a side-by-side? | **Yes.** (Nelson, 14 Oct) Covers 220 → 200, ring 600 → 500, 80 → 100, 120 → 150 |
| Q5 | Storybook: interaction tests for the reduced-motion path, or by hand? | ⚠︎ open; this block verifies by hand in the preview + a vitest on `useExitTransition` |
| Q6 | Team approval for 13 new tokens (21 Sep rule) | ⚠︎ open: the Figma collection stays unpublished until the team agrees |
| Q7 | Material names instead of the v1 names (`instant/fast/base/slow/narrative`) | proposed here, from the 17 Sep rule; confirm with this spec |
