# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

One design language across responsive web (Open edX) and the Phase-1 mobile app. The app does not switch to iOS/Android-native conventions.

## Users
Learners enrolled in SkillUp programs and courses across four flows (TM, DA, CE, Cyber), mixing self-paced content with live instructor-led sessions (VILT) on a cohort pace. They reach the platform through three channels, all in scope:
- **B2C** — individuals who enroll directly.
- **B2B** — partner organisations that sell or co-brand programs.
- **Enterprise** — organisations that enroll their own staff.

The job: make steady progress through a multi-course portfolio, know whether they are on cohort pace, attend or catch up on live sessions, and earn certificates. Seven synthetic personas in `04-research/personas/` span novice to power user, desktop to 375 px mobile, and an accessibility-first senior (keyboard + zoom). They are test lenses, not research participants.

## Product Purpose
The SkillUp learner platform in two tracks on a shared foundation:
- **ICP (Immersive & Content Types)** — the experience inside a topic: immersive player, video lessons, readings, quizzes, VILT.
- **LMS (Platform Pages)** — the platform around the course: dashboard, My Learning, course and program pages, calendar, live sessions.

Success: learners always know where they are, what is next and whether they are on pace, and the content team can author every topic type in Studio without custom engineering.

## Positioning
Undecided — not yet confirmed with the product owner. Do not invent a differentiating claim.

## Operating Context
- Built on Open edX. Content is authored by a content team in Studio; each content type maps to an edX XBlock (`LMS-HANDOFF/topic-types-inventory.md`, `LMS-HANDOFF/studio-authoring-parity.md`).
- Figma is the design source of truth: the SKO Design System library (`c7EUDrQwP8si08aPipDSIV`) plus product files. A live prototype repo, Storybook and this hub repo must stay in sync (`SYNC-PLAYBOOK.md`).
- Decisions are logged as ADRs in `00-decisions/`. Meeting claims about platform capability are tagged CONFIRMED / ASSERTED / CONFLICT / UNVERIFIED in `LMS-HANDOFF/session-log.md`. Check it before designing against a claimed capability.

## Capabilities and Constraints
Binding on all design work:
- **Open edX / Studio limits.** Every content type must be authorable in Studio and map to an existing XBlock. Studio has no image or caption component. SCORM and ORA have hard limits (ADR 023).
- **WCAG 2.2 AA** on every skin and theme, keyboard-only use, and captions. The accessibility layer is orthogonal to skin and theme: CVD-safe state colours (`data-vision="cvd"`) and text scale A / A+ / A++ (100 / 115 / 130 %) (ADR 016).
- **Multi-skin, zero raw hex.** Every screen must work in all skins (`data-skin`) and in light and dark themes, using only DS role tokens (ADR 014).
- **Figma DS is the source of truth.** Use existing SKO DS components and tokens. A new token needs approval and a Material-style name.

Undecided: positioning; which brands occupy the skins for B2B and enterprise.

## Brand Commitments
- Product name: SkillUp. Logos: `skillup-logo-light.svg` and `skillup-logo-dark.svg`.
- Partner co-branding happens through DS skins, never through one-off colour values.

## Evidence on Hand
- Source requirements: FRDs, PRDs, BA docs and syllabus spreadsheets in `05-source-docs/`.
- Research: personas (synthetic), the design-system discovery transcript, the VILT walkthrough transcript and the UX audit (`04-research/`, `ux-audit/`).
- Benchmarks: the Coursera quiz benchmark (`LMS-HANDOFF/quizzes/02-coursera-quiz-benchmark.md`). Coursera screenshots are local-only in `_media/`.
- Absent, never to be fabricated: real learner testimonials, completion or outcome metrics, customer or partner names, pricing.

## Product Principles
1. **Pace is always visible.** A learner should never have to work out whether they are on track, behind or ahead.
2. **Authorable or it doesn't ship.** A design the content team cannot build in Studio is not a design.
3. **Accessible on every skin.** AA holds across every skin, theme, vision mode and text scale, not only the default.
4. **One system, many brands.** Partners change the skin, not the structure or the components.
5. **Decisions carry their source.** Every design choice traces to an ADR, a confirmed capability or a named requirement.

## Accessibility & Inclusion
WCAG 2.2 AA minimum. Keyboard-only and screen-zoom use (persona P07). Captions on all media. Colour-vision-deficiency-safe states. User-selectable text scale up to 130 %. Low-literacy-friendly labels and confirmations (personas P01 and P07).
