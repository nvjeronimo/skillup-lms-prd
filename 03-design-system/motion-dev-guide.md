# Motion — how to build it (developer guide)

| | |
|---|---|
| **For** | front-end developers building the SkillUp LMS on Open edX (MFEs, theme) |
| **Status** | Ready to use; the token values still wait for the team's approval (ADR 024, *proposed*) |
| **Last updated** | 26 Oct 2026 |
| **Source of truth** | Values: Figma DS, variable collection `3. Motion`. Behaviour: [`motion-matrix.md`](motion-matrix.md). Reference build: the prototype ([lms-prototype-mu.vercel.app](https://lms-prototype-mu.vercel.app), repo `nvjeronimo/skillup-lms-prototype`). |

## In one minute

- Motion is a **token foundation**, like colour: 5 durations, 5 curves, 3 distances. Use the CSS variables, never a raw
  `ms`, `cubic-bezier` or `ease-*` keyword.
- It is **the same in every skin, theme and breakpoint** (SKO, Gold, Studio, Harbor, Fluent; light and dark; phone to
  desktop). A skin changes colours, type and shapes, never timing.
- **Build it with the component, not afterwards.** A component is not done until it enters, leaves and changes state
  as below, and does so under reduced motion.
- Animate **`transform` and `opacity`**. Name the properties. Never `transition: all`.
- **Exits are faster than entrances**, and a surface leaves **toward where it came from**.
- **Reduced motion removes travel and keeps feedback** (fades and colour), on both paths: the OS setting and the
  in-app Accessibility switch.

## 1. Where the values live

| Token | Value | CSS variable | Use |
|---|---|---|---|
| `duration/short2` | 150 ms | `--motion-duration-short2` | press, toggle flip, the gap of a stagger |
| `duration/short3` | 200 ms | `--motion-duration-short3` | hover, focus, colour change, exits of small surfaces |
| `duration/short4` | 300 ms | `--motion-duration-short4` | the default: small surfaces enter, chevrons, messages, toasts |
| `duration/medium2` | 400 ms | `--motion-duration-medium2` | panels, drawer, sheet, accordion, page entrance |
| `duration/long2` | 600 ms | `--motion-duration-long2` | progress bars, rings, count-up: passive only |
| `easing/standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | `--motion-easing-standard` | things that change in place: colour, rotate, ring |
| `easing/standard-decelerate` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | `--motion-easing-standard-decelerate` | entrances **and** exits, progress |
| `easing/standard-accelerate` | `cubic-bezier(0.55, 0, 1, 0.45)` | `--motion-easing-standard-accelerate` | kept in the scale, **not used** by the UI |
| `easing/emphasized` | `cubic-bezier(0.34, 1.3, 0.64, 1)` | `--motion-easing-emphasized` | the certificate reveal only (the one overshoot) |
| `easing/linear` | `linear` | `--motion-easing-linear` | loops only (spinner, typing dots, live dot) |
| `distance/nudge` | 4 px | `--motion-distance-nudge` | micro-settle, page entrance, staggered buttons |
| `distance/enter` | 8 px | `--motion-distance-enter` | message, card, toast entrance |
| `distance/surface` | 16 px | `--motion-distance-surface` | the assistant window, dialogs |

**Pipeline.** The values are edited in Figma (`3. Motion`) and published with the DS. The prototype reads them through
the token export (`tokens/figma/variables.json` → `tokens/generated/motion.css`). Do the same in the platform: ship the
13 variables in the SkillUp theme layer (the brand package the MFEs load) and reference only the variables.

**Reduced motion** is applied **on the variables**, once, not per component:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-distance-nudge: 0px; --motion-distance-enter: 0px; --motion-distance-surface: 0px;
    --motion-duration-medium2: 150ms; --motion-duration-long2: 150ms;
  }
}
:root[data-reduce-motion] { /* the same five lines: the in-app Accessibility switch */ }
```

## 2. Rules (a review fails without them)

| # | Rule |
|---|---|
| R1 | Tokens only: no raw `ms`, `cubic-bezier`, `ease-in/out` in components or stylesheets. Add a lint rule (the prototype's `scripts/check-tokens.mjs` has `raw-motion`, `raw-motion-css`, `popup-motion`). |
| R2 | Name the properties: `transition: opacity …, transform …`. Never `transition: all`. |
| R3 | Animate `transform` and `opacity`. Disclosures use `grid-template-rows: 0fr → 1fr`, not `height`. |
| R4 | Nothing over **short4 (300 ms)** on a repeated critical path. `medium2` for surfaces; `long2` only for passive progress. |
| R5 | Motion never carries state alone: every state also has an icon/word, and important changes go to `aria-live`. |
| R6 | Reduced motion removes travel, keeps fades and colour (§1). |
| R7 | One mode: no skin, theme or breakpoint changes timing. |
| R8 | Exits are faster than entrances (one step down the scale) and use `standard-decelerate`. |
| R9 | One overshoot in the product: `emphasized`, certificate only. |
| R10 | A surface leaves toward where it came from (menus into their trigger, panels to their edge, the assistant into its launcher, sheets down). |

## 3. What moves, when and how

Each row: the trigger, what the learner sees, the recipe, and where to read the working code in the prototype.

| UI | When | What | Recipe (CSS / behaviour) | Prototype reference |
|---|---|---|---|---|
| Buttons, links, rows | hover, focus, press | colour eases; a press pushes in | `transition: color, background-color, border-color` short3 standard; `:active { transform: scale(.98) }` short2. Hover styles only under `@media (hover: hover)`. | `buttonStyles.ts`, `.sk-press-card` |
| Menus, popovers, dropdowns | open / close | grows out of its trigger, leaves back into it | enter: opacity 0→1 + `scale(.96)` + `translateY(-nudge)` short3 decelerate; exit: reverse at short2. `transform-origin` = the trigger's corner. Keep it mounted while it leaves (`data-state="closed"` → unmount on `transitionend`), `inert` + `pointer-events: none` while leaving; reopening while closing reopens at once. | `useDisclosure` (presence), `.sk-animate-menu*` |
| Dialogs, modals | open / close | fade + scale from .96 and a 16 px rise; backdrop fades | enter short4 decelerate; exit short3. Focus moves in on open and back to the opener at the start of the exit. | `useDialog`, `.sk-animate-pop` |
| Side panels, drawer | open / close | slides from its edge; backdrop fades | `translateX(100% → 0)` medium2 decelerate; exit back to the edge, faster. | `OverlayPanel`, `.sk-animate-slide-*` |
| Phone sheets | open / close / drag | rises from the bottom; follows the finger; dismiss by flick or distance | `translateY(100% → 0)` medium2; drag: rubber-band past the top, project the release velocity, settle or close. Touch/pen only. | `useSheetDrag`, `.sk-animate-sheet` |
| Accordions, FAQ, "show more" | expand / collapse | content grows and shrinks | `grid-template-rows: 0fr ↔ 1fr` medium2; closed content `inert` + `aria-hidden`. A line that folds away (sidebar header) folds in **two beats**: text fades (short3), then the row closes (medium2, after short2); back: the row opens, then the text fades in. | `Collapse`, `.sk-fold` |
| Tabs | change tab | underline slides to the new tab; the panel fades in | underline: `transform` short4 decelerate; panel: opacity short4, **not** on the first paint. | `useTabIndicator`, `useHasChanged` |
| Filters, search results | filter changes | the list cross-fades; rows rise one after the other | keyed wrapper fade short4; each row `animation-delay: calc(short2 / 2 × index)` (cap at 8). Not on first paint or re-render. | `staggerStyle`, My Learning |
| Page navigation | link to another page | the old page fades out while the new one fades in; bars stay still | View Transitions API: old root out short3, new root in medium2 + 4 px rise; the top bar, side rails, player sidebar/footer, tab bar and assistant launcher get their own `view-transition-name` and show only the new picture. No API, hidden tab or reduced motion: a short entrance fade only. Query-only links (filters, tabs) do not transition. | `PageTransitions.tsx`, `lib/motion/pageTransition.ts` |
| First visit of a page | page loads | a page-shaped skeleton, then sections arrive in order; figures count up | Skeleton only while the real request is pending (no artificial delay in production). Sections: opacity + `enter` rise short4, delay `calc(short2 / 2 × n)`; below the fold they start when they enter the viewport. Counters, bars, rings: long2 decelerate. **Once per page per session**; revisits, filters and tab switches never replay it. | `lib/arrival/*`, `Skeleton`, `ArrivalCount` |
| Completing a topic | learner completes / auto-complete at 90 % | badge pops → sidebar check draws (+short2) → progress ring advances (+short4) | Keyed on the change, never on re-render; the toast is the one announcement. | `lib/motion/completion.ts` |
| Sticky toolbars | scroll past | the bar's ground goes from clear to solid; the search steps out | Ground opacity tied to scroll (0→1 over 24 px, written once per frame); search: fade first, then its width/row closes (and the reverse). | `StickyToolbar.tsx` |
| Images, covers | load / hover | fade in when loaded; covers zoom softly on card hover | opacity short4; hover: `scale(1.02)` long2 in / medium2 out, hover devices only, none under reduced motion. | `FadeImage`, `.sk-cover-zoom` |
| AI assistant | idle, open / close | launcher: metal ring glint, sparkles spin now and then; window grows from the launcher | ring glint runs while first steps are left; sparkles: independent cycles; window: as dialogs, origin at the launcher. Spins: keep each frame well under half the shape's symmetry angle. | `AssistantLauncher`, `AssistantMark` |
| Loops | waiting | spinner, typing dots, live dot | `linear`, infinite; under reduced motion stopped or replaced by text. | `.sk-typing`, `.sk-live-dot` |
| Learning content | — | **never animated** | Motion belongs to the chrome, not the matter. | — |

## 4. When to build it

- **In the same ticket as the component.** Motion is part of the Definition of Done, not a polish pass at the end.
- **Order for a new feature:** tokens available in the theme → the component's states (hover, focus, press, disabled)
  → enter/leave → changes in place → reduced motion → QA (§6).
- **Tokens first, once:** before any MFE work, the theme package must carry the 13 variables and the reduced-motion
  block (§1). Then every component reads them.
- **Paragon components** (Modal, Dropdown, Collapsible…) ship their own transitions: map their durations and curves to
  our variables in the theme instead of re-implementing them, and check them against the rules.

## 5. Skins, themes and breakpoints

- One mode only (R7). A skin stylesheet may change colour, radius, type and elevation; it **must not** set a
  duration, a curve, a keyframe or a `transition`.
- When a skin adds **its own markup** (Harbor and Fluent's left rail, Fluent's selection indicators), that markup must
  follow the same recipes as the shared components: the rail eases its width and is page-transition chrome, indicators
  grow in instead of snapping, sections join the arrival cascade.
- Light/dark and skin switches cross-fade the page (View Transition, short4, opacity only; kept under reduced motion).

## 6. QA checklist (per component)

- [ ] Only `--motion-*` variables; properties named; no `all`; no layout properties animated (except the documented grid-rows disclosure and the rail width).
- [ ] Enters and **leaves** (nothing disappears in one frame); exit faster; leaves toward its origin.
- [ ] Interruptible: reopen while closing reopens at once; a leaving surface does not catch clicks (`inert`, `pointer-events: none`).
- [ ] Focus: moves in on open, returns to the trigger on close; no focus steal on arrival.
- [ ] Screen readers: the final value / one announcement, never the animation steps.
- [ ] Reduced motion, **both** paths (OS setting and `data-reduce-motion`): no travel, fades kept, loops stopped.
- [ ] Does not replay on re-render, filter, tab switch or revisit when it should not.
- [ ] Same in every skin and theme; checked at 375 and 1280.
- [ ] Tested in a visible browser tab (background tabs freeze animations and observers).

## 7. Where to look

| What | Where |
|---|---|
| Behaviour per component (the full matrix) | [`motion-matrix.md`](motion-matrix.md) §7 (blocks), §8b–§8d (reviews and the 25 Oct scale) |
| Decision and its amendments | [`ADR 024`](../00-decisions/024-motion-scale.md) |
| Figma | DS file, page *Foundations ↳ Motion*, frame `Doc · Foundations · Motion` (*Motion · v1.4*), section 12 "How to build it" |
| Working code | prototype `tokens/generated/motion.css`, `app/globals.css` (`.sk-animate-*`, `.sk-fold`, page transitions), `lib/motion/*`, `lib/arrival/*`, `lib/useDisclosure.ts`, `lib/useExitTransition.ts`, `lib/useSheetDrag.ts`, `components/atoms/Collapse.tsx`, `components/views/PageTransitions.tsx` |
| Try it | [lms-prototype-mu.vercel.app](https://lms-prototype-mu.vercel.app) (`?demo=1` for the Loading switch and "Mark 85% watched") |
