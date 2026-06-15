# LMS — Immersive Course Player (ICP) Design Reference

> Internal design notes distilled from `ICP_PRD.docx` v1.0 (27 Apr 2026, Harpreet Kaur).
> Maps PRD requirements to our current Figma work (V7 file, LMS Extension components, UUI playground).
> Use this as the source-of-truth for what to design, where it goes in our system, and what's open.

---

## 1. TL;DR

> A learner signs in, picks up where they left off, watches a lesson with captions + synced transcript, takes timestamped notes, asks the AI assistant a question, takes a quiz, sees their score, and continues to the next unit — all without leaving a single, calm, branded screen.

The ICP is a **facade** on top of the existing learning platform. We are not changing how content is authored or graded; we are changing how learners consume it. Brand, IA, and AI assistant are SkillUp; the rooms behind the door (content, grades, discussion, notes) are the existing platform.

---

## 2. Audience and primary scenarios

**Primary user:** enrolled learner (working professional, may be non-native English speaker, moves between desktop + mobile).

**5 scenarios the design must support:**
1. **Resume on a Tuesday evening** — open ICP, find the lesson stopped at, press play with captions, take 2 timestamped notes.
2. **Stuck on a concept** — pause video, open AI assistant, ask "explain X in simpler terms", get a lesson-aware answer.
3. **Take a quiz inline** — finish last video in a module, quiz appears in same screen, answer questions, see instant feedback, see celebratory score.
4. **Catch up on phone** — sidebar collapses to drawer; one panel at a time; layout feels native to phone.
5. **Come back two weeks later** — see how far through the course, what's complete, what's still locked; decide whether to retake a poorly-done quiz.

---

## 3. Screens we must deliver (mapped to current Figma)

| ICP screen | What it does | Maps to Figma (current state) |
|---|---|---|
| Course Player – Video · Transcript | Video + synced transcript + sidebar + AI panel | `Video Transcript v3` (2693:2944) ✅ |
| Course Player – Video · Notes | Same chrome, notes tab active, timestamped notes list | `Video Notes v3` (2805:1356) ✅ |
| Course Player – Video · Downloads | Resources list with type + size + download | `Video Downloads v3` (2805:1630) ✅ |
| Course Player – Video · Discussion | Threads + replies + upvotes for the active unit | `Video Discussion v3` (2805:1899) ✅ (note: PRD has a contradiction about discussion — see §10 open items) |
| Quiz · Start | Intro card before questions begin | `Quiz Start v3` (2809:2158) ✅ |
| Quiz · Question | One question at a time, single-choice options, submit | `Quiz Question v3` (2806:1995) ✅ |
| Quiz · Revealed | Submitted answer + instant feedback + explanation + Next | `Quiz Revealed v3` (2809:2503) ✅ |
| Quiz · Results | Animated score ring + breakdown + retake / next-unit | `Quiz Results v3` (2809:2855) ✅ |
| AI Panel · Takeaways / Ask / Chat / Related | Right-hand panel, lesson-aware Q&A | `AI Panel` set (2695:1691), 4 mode variants ✅ |
| Tablet course player | AI panel narrows / hides; sidebar in grid | `Tablet Video Transcript` (2810:2628) ✅ |
| Mobile course player | Sidebar = slide-over drawer; one panel at a time | `Mobile Video Transcript` (2810:2773) ✅ |
| Course end · Before modal | Final lesson done; Footer CTA goes to "Next course" | `Course end · Before modal` (2810:2984) ✅ |
| Course end · Modal | Backdrop + celebratory completion modal + 3 CTAs | `Course Finished` (2810:3103) ✅ |
| Course end · Certificate | Formal completion document + download / share / back | `Course Certificate` (2810:3162) ✅ |
| Program Detail (dashboard) | Out of ICP strictly, but lives in same brand | `Program Detail v3` (2694:1956) ✅ |

**Everything PRD asks for has a port in our UUI Playground.** Next-pass priorities are interaction polish + handoff specs, not new screens.

---

## 4. Functional requirements — compact map

19 FRs in the PRD. Grouped + cross-referenced to our LMS Extension components.

### 4.1 Identity + theme
| FR | Behaviour | Status | Component / screen |
|---|---|---|---|
| FR-01 | Signed-out user → sign-in → returned to same lesson | ✅ Out of scope for ICP frame itself (login is platform) | n/a |
| FR-02 | Light/Dark pill toggle; persisted; WCAG AA in both | ✅ done (LMS / Course Player Topbar — Theme=Light / Dark variants) — **LOW PRIORITY per PRD** | `LMS / Course Player Topbar` |

### 4.2 Course outline + navigation
| FR | Behaviour | Status | Component |
|---|---|---|---|
| FR-03 | Sidebar lists every module + unit; tick / active / lock; collapsible (tablet) / drawer (phone) | ✅ done | `LMS / Topic Row` (4 states) + `LMS / Module Number Label` + `LMS / Completion Status` |
| FR-04 | Breadcrumb course → module → unit; 3-tier hide (≥960 all crumbs, 640–960 hide course, ≤480 only unit) | ✅ done at master; instance overrides per screen | `Breadcrumbs` UUI instance inside `LMS / Course Player Topbar` |
| FR-05 | Resume: last-viewed unit + ≤5s of video position; if finished, land on results | 🟡 design-only state; engineering responsibility | n/a (state, not screen) |

### 4.3 Video lessons
| FR | Behaviour | Status | Notes |
|---|---|---|---|
| FR-06 | Standard controls + keyboard shortcuts (Space, ←/→, speed 0.75–2×, captions, fullscreen) | ✅ chrome rendered via UUI `Video player 16:9`; shortcuts = behaviour spec | doc keyboard map in §6 below |
| FR-07 | Synced live transcript: active line ≤1s lag; auto-scroll; click-to-seek | ✅ static design via `LMS / Transcript Line` (Default / Active states) | dynamic sync is engineering |
| FR-08 | Watching counts toward completion; sidebar tick within 5s; re-watch keeps tick | ✅ state → ties into `Completion Status` Done variant | platform-driven |

### 4.4 Notes / Downloads / Discussion / Quizzes
| FR | Behaviour | Component |
|---|---|---|
| FR-09 | Timestamped notes; newest first; click timestamp → seek; edit + delete | `LMS / Note Item` |
| FR-10 | Downloads: name + type + size; native browser download; empty state | `LMS / File Item` (4 type variants) + empty state TBD |
| FR-11 | Discussion threads scoped to unit; new thread + reply + upvote; doesn't pause video | `LMS / Thread Item` — **PRD §2 says NOT in ICP; §5.6 specifies it. Clarify with Harpreet.** |
| FR-12 | Quiz: start screen → 1 question at a time → forward-only → instant feedback after each | `LMS / Quiz Card` (Start / Question / Revealed) |
| FR-13 | Results: animated score ring, %/fraction, pass/not-pass visually distinct, retake or proceed; sidebar tick on pass | `LMS / Quiz Card` (Results variant) |

### 4.5 Progress + AI + responsive
| FR | Behaviour | Component / screen |
|---|---|---|
| FR-14 | Per-module + overall progress; visible without scroll on desktop; ≤5s update on completion | sidebar `LMS / Topic Row` + Module Number Label + per-module rollup TBD |
| FR-15 | AI panel: key takeaways + suggested chips + free-text + streaming; per-unit content; dismissible + persisted; doesn't pause video | `LMS / AI Panel` (4 modes) — **MARKED "PROBABLY PHASE 2"** |
| FR-16 | Responsive 4 breakpoints: ≥1100 all 3 panels • 960–1100 AI narrows • 768–960 AI hides (re-openable) • <768 sidebar = drawer • <480 brandmark + active-unit only | ✅ Course Player Topbar has Desktop / Mobile variants; Tablet/Mobile screens exist; finer-grained reflow TBD |
| FR-17 | Brand: Montserrat body, Playfair display, Outfit caps. Cyan = interactive, Green = completion. Logo variants by mode/size. **Pulled from DS, NOT HARD-CODED.** | ✅ this is the rule we are already enforcing. Continue. |

### 4.6 Keyboard + accessibility
| FR | Spec | Status |
|---|---|---|
| FR-18 | Tab order = reading order; focus always visible; Space toggle play; ← / → skip; C toggle captions; D toggle theme; modal/drawer trap focus; Esc dismiss | Design specifies; engineering implements |
| FR-19 | WCAG 2.1 AA both themes; descriptive accessible names; quiz feedback announced; captions default ON | Design specifies + audit before P5 sign-off |

---

## 5. Brand + DS rules (the non-negotiables)

Pulled from FR-17 + our existing memory:

- **Type stack:** Montserrat (body / UI ≤24px), Playfair Display (display ≥28px), Outfit (small-caps label + tabular numerics).
- **Colours:** brand cyan = interactive only; brand green = completion only. Never the other way around.
- **Logos:** full-colour on light desktop · white-monotone on dark · brandmark-only ≤480px.
- **Everything binds to the DS — no hard-coded values.** Already enforced in our V7 + UUI work. This was explicitly flagged in the PRD: *"It should NOT BE HARD_CODED."*

---

## 6. Keyboard shortcuts (FR-18)

| Key | Action |
|---|---|
| Space | Play / pause video |
| ← / → | Skip −10s / +10s |
| C | Toggle captions |
| D | Toggle theme (Light ↔ Dark) |
| Esc | Dismiss modal / close drawer |
| Tab | Move focus (visual order matches reading order) |

Document these as ARIA-spec annotations on the Figma frames before P5 hand-off.

---

## 7. Responsive breakpoints (FR-16)

| Width | Layout |
|---|---|
| ≥1100 | All 3 panels visible (sidebar · content · AI) |
| 960–1100 | AI panel narrows, stays visible |
| 768–960 | AI panel hidden (re-openable); sidebar still in grid |
| <768 | Sidebar = slide-over drawer triggered by hamburger; AI re-opens via toggle |
| <480 | Brandmark replaces full logo; breadcrumb shows only active unit |

Our Mobile port (375w) and Tablet port (960w) already cover the headline breakpoints; engineering will handle intermediate behaviour.

---

## 8. Performance + reliability budgets (NFRs)

- First lesson opens in ≤3s on typical 4G.
- Unit switch ≤1s from selection to visible.
- Video play in ≤2s after press.
- AI assistant first character in ≤2s.
- Course content remains viewable even if AI is unavailable → AI panel shows a fallback. Design empty/fallback state for AI panel.
- Note saving / completion ticks / quiz submissions: if save fails, the learner is told. Need failure state UI for notes + quiz.

---

## 9. Release phases (prioritise design accordingly)

| Phase | Theme | What ships |
|---|---|---|
| P0 | Foundations | Sign-in, sidebar, resume. Placeholder content. Brand + theme. |
| P1 | Watch a lesson | Video + captions + transcript + progress tracking. Resume cross-device. |
| P2 | Take a quiz | Quiz (start → question → revealed → results), retake. |
| P3 | Notes, Downloads, Discussion | All three tabs working. |
| P4 | AI assistant | All 4 panel modes; streaming answers. |
| P5 | Polish + a11y sign-off | Full WCAG audit, performance budgets, mobile, browser matrix. |

**Design implication:** P1 is the deepest. P4 (AI) is the wide variability. P3 is the most diverse content (notes / downloads / discussion all distinct UX).

---

## 10. Open questions and conflicts to clarify with Harpreet

### Conflicts in the PRD itself
- **Discussion**: §2 background says "discussion forum (not to be used in ICP)"; FR-11 specifies the discussion behaviour fully. Which is it?
- **AI panel**: §5 includes FR-15 (AI panel); marked "Probably Phase 2". Is AI in the v1 release or a follow-up?
- **Light/Dark toggle (FR-02)**: marked "Low priority". Confirm whether we ship it in P0 or defer.

### Open questions per PRD §10
- Multi-language transcripts at launch or English only?
- Default quiz attempts: per-course or global setting?
- Notes export (PDF / markdown): launch or follow-up?

### Things to spec ourselves
- Failure UI: note save fail / quiz submit fail / AI offline (FR-NFR-6.2).
- Empty states: no downloads, no discussion threads, no notes yet, no AI takeaways yet.
- Locked unit preview: PRD doesn't spec; we already have it from V7 (sidebar Locked state + preview pattern).
- Cross-course transitions: Course end · Before modal → Modal → Certificate / Next course. We have it; PRD doesn't fully spec, our existing flow is the proposal.

---

## 11. Mapping PRD → our LMS Extension components

| PRD pattern | Component (already built) |
|---|---|
| Sign-in topbar with brand + breadcrumb + theme toggle + close + action icons | `LMS / Course Player Topbar` (3 variants — Light Desktop / Dark Desktop / Light Mobile) + UUI Breadcrumbs + UUI Toggle + UUI Buttons/Button close X + UUI Buttons/Button utility (sparkle, bell, bookmark) |
| Module + unit sidebar | `LMS / Module Number Label` + `LMS / Topic Row` (Done / Active / Pending / Locked) + `LMS / Completion Status` + `LMS / Topic-Types Badge` (8 type variants) |
| Video transcript line | `LMS / Transcript Line` (Default / Active) |
| Notes | `LMS / Note Item` |
| Downloads | `LMS / File Item` (PDF / DOCX / XLSX / ZIP variants) |
| Discussion | `LMS / Thread Item` |
| Quiz | `LMS / Quiz Card` (Start / Question / Revealed / Results) |
| AI panel | `LMS / AI Panel` (4 modes — Key Takeaways / Ask AI / Chat / Related) |
| Footer nav (Previous / position / Next progression) | `LMS / Footer Nav (course player)` + `LMS / Course Progression Button` (Topic / Module / Course milestones) |
| Course-end celebration | `LMS / Course Complete Modal` |
| Certificate of completion | `LMS / Course Certificate` |
| Dashboard course list | `LMS / Course Row` (Active / Locked / Available) |
| Dashboard KPIs in dark hero | `LMS / KPI Card (dark hero)` |
| Live session banner | `LMS / Live Now Banner` (Live / Upcoming) |

**Every PRD pattern has a 1:1 component in our library.** Nothing in the PRD requires us to build a NEW LMS Extension component — only to wire content + state into the existing ones.

---

## 12. What this means for next sprints

1. **Confirm conflicts with Harpreet** (discussion in or out; AI in v1 or P2; Light/Dark in P0 or later).
2. **Spec empty states + failure states** — currently all our screens show populated happy-path content.
3. **Annotate keyboard + ARIA spec on Figma frames** — for engineering handoff at P5.
4. **Tune responsive intermediate breakpoints** (960–1100, 768–960) — currently we have Desktop + Mobile + Tablet sketch; intermediates are a polish pass.
5. **Locked unit preview pattern** — we have this in V7; carry it across to UUI ports.
6. **Open the conversation with Harpreet** on the PRD's open questions (transcripts, quiz attempts, notes export).

---

## 13. Glossary

| Term | Meaning |
|---|---|
| ICP / Immersive Course Player | The single-screen experience this doc describes. |
| Unit | Smallest piece of a course — typically one video, one reading, or one quiz. |
| Module | Grouped set of units. |
| Topic | Synonym for Unit in our V7 vocab; PRD uses "Unit". Align on one. |
| Course player | Industry term for full-screen learner view with video + nav + supporting content. |
| Facade | New face on existing system. ICP is a facade on the platform. |
| WCAG 2.1 AA | Accessibility standard; minimum bar. |
| Resume | Return learner to exact unit + playback position. |

---

## 14. Source links

- PRD: `ICP_PRD.docx` (workspace folder) — Harpreet Kaur, 27 Apr 2026, v1.0.
- Visual reference: `SkillUp_ICP_v6.html` (v7-hk folder) — interactive prototype.
- Our Figma file: `Wz2TCYFVr0hD8tJNiLajLt`, page `V7 - UUI Playground` for ports + LMS Extension components.
- Cross-cutting requirements doc: `LMS-PRD.md` (existing V5 from Apr 21, also in workspace).

---

_Maintained by: Nelson · last updated when ICP_PRD changes._
