# Topic Content Types — Inventory & Phase Scope

*Discovery · updated Jul 21, 2026 · Nelson Jeronimo*
Answers: **which Topic Content Types must we design, and what does each one need?**

Sources: live audit of `SKOAIH01` (Jul 17) · program syllabus, 280 topics across Courses 1–4 · Rupali / SkillUp IP team list (Jul 21) · `BA/06-glossary.md` + `FRD_CourseOutline_Module_v1.0` · Open edX documentation.
Companion: [edx-component-types-reference.md](edx-component-types-reference.md) — what the platform can deliver.

---

## 1. Agreed model & terminology

*Agreed by Navdeep, Harpreet and the team, Jul 21, 2026. Shared vocabulary for Design and Development.*

"Asset" and "content type" were being used for different layers, which caused confusion. The resolution:

> **For the ICP, the items displayed at Topic level are called "Topic Content Types".** This includes Video, Reading, Podcast, Quiz, Lab, Programming Assignment, Final Project and VILT — **even though they are not all technically assets**.
>
> **Separately, each type has an underlying asset or format**: Podcast uses audio, Reading may use HTML or PDF, VILT relies on live-session data and may later expose a video recording. Final Project may act as a *structure* containing one or more content types.

**The Topic Content Type list is the list of things we design.** The underlying format tells us what the renderer must handle.

### What we document for each type

The agreed deliverable — for every type: **1 · Format · 2 · Behaviour · 3 · States · 4 · Completion rules · 5 · Assessment logic.**

### Mobile app must stay in sync

Confirmed by Harpreet: *"App will cater to the logic defined by ICP and will need to be in sync."* This makes mobile-readiness a live constraint — **Activity (SCORM) is not mobile-ready** per Open edX docs, and neither are several advanced problem types. Flag any type where this is a problem.

---

## 2. The inventory — 12 types, ordered by priority

Volume from the "Mode" column of the program syllabus (280 topics). Priority combines volume, grading value and current state.

| Topic Content Type | Underlying format | Volume | Chrome family | Status |
|---|---|---|---|---|
| **Reading** | HTML or PDF (+ downloads) | 84 · 30% | Document | 🔨 In progress |
| **Video** | Video file + transcript | 76 · 27% | Media player | ✅ Done (Phase 1) |
| **VILT** | Live-session data → later a video recording | 53 · 19% | Embedded tool + Media | 🆕 **Biggest gap — no design yet** |
| **Quiz** | Problem blocks | 6 · 2% | Quiz | 🔨 In progress — *2% by volume, 100% of the grade* |
| **Lab** | Notebook (.ipynb) + PDF | 24 · 9% | Document | 🆕 New |
| **Podcast** | Audio | 19 · 7% | Media player | 🆕 New — cheap variant |
| **Activity** | SCORM package ⚠ not mobile-ready | 10 · 4% | Embedded tool | 🆕 New |
| **Final Project** | **Structure** of one or more content types | 8 · 3% | Submission | 🆕 New — ORA2-backed |
| **Discussion Prompt** | Discussion thread | 0 | — | Specified, unused → defer |
| **Programming Assignment** | In-browser notebook, auto-graded | 0 | — | 🔒 Blocked — no edX equivalent |
| **Role Play** | AI conversation | 0 | — | 🔒 Blocked — no edX equivalent |
| **Dialogue** | AI conversation | 0 | — | 🔒 Blocked — no edX equivalent |

**Reading + Video + VILT = 76% of all topics.** 8 types are in production content today; ~28 are being prepared for the new Studio (Benjamin) — a later phase.

Two labels found outside the Mode column that matter:
- **"Scenario with options"** — a branching Activity (Course 1). Activity needs an interactive variant, not just a static worksheet.
- **"Final Graded Assessment"** — a topic *name* with Mode = Quiz. Confirms Quiz needs Practice / Graded / Final framing.

### The 3 blocked types — all "Coursera inbuilt features"

Native Coursera features with **no Open edX equivalent**. Each needs a build-or-buy decision before it can be designed:

| Type | What it is | Possible edX path |
|---|---|---|
| **Role Play** | AI-driven scenario; the learner converses in a role | Custom XBlock with LLM integration, or LTI to an external AI tool |
| **Dialogue** | AI conversational practice | Likely the same component as Role Play, different mode |
| **Programming Assignment** | In-browser auto-graded notebook, multi-language | External Grader (XQueue, Provisional) · LTI to JupyterHub · third-party |

**Programming Assignment is not a duplicate of Lab.** Lab = download and run offline, ungraded. Programming Assignment = runs and grades in-browser. If Labs migrate, the Lab design changes — 24 topics affected.

---

## 3. VILT and Final Project — the two composite types

Both are Topic Content Types, but neither maps to a single asset — which is why they behave as *sequences* rather than single screens.

### VILT — one type whose underlying asset changes over time

**Pre-live has no asset at all** (only scheduling metadata), **live is an external stream**, and **the recording is a Video asset**.

| Stage | What the learner gets | Completion |
|---|---|---|
| **Pre-live** | Session details, countdown, add-to-calendar; Join locked | n/a |
| **Live / Join** | Join action into the external platform (Zoom/Teams) | **Automatic on attendance** (join + ≥50%) |
| **Recording** | The replay — behaves like a Video topic | **Watched ≥90%** — the recap path for anyone who missed the live |

Likely **one row that changes state over time**, rather than three rows.

**Completion rule — VILT has NO manual "Mark as complete".** A live session isn't something you tick off; the topic completes by **one of two paths, whichever happens first**:

1. **Attended the live** → completion is **automatic** from attendance (join + ≥50% of the session). No button, no extra step.
2. **Missed the live** → the learner must **watch the recording (recap)**, and completion follows the **Video rule (≥90% watched)**.

So the completion *owner* is path-dependent: attendance for the live path, the video player for the recap path. The shell must **never render a manual "Mark as complete"** on a VILT topic — showing one on the live stage implies the session is optional homework, and showing one on the recording double-counts against the ≥90% rule. This is field #8/#9 of the registration rule (§6) resolved specifically for VILT.

### Final Project — a structure containing other content types

Typically a **Reading** (the brief) + a peer-reviewed **submission**, sometimes a **Quiz**. The open question is how it surfaces in the outline:

| Option | What the learner sees | Trade-off |
|---|---|---|
| **One topic page** | A single row opening a multi-step container | Cleaner outline; matches how ORA works today |
| **Several topic rows** | "Project brief" · "Submit" · "Review a peer" | More visible progress; each step gets its own tick |

**Our lean: one topic page containing the ORA stepper** — that is what the platform already does, and what section 05 of the Figma page mockups. See [quizzes/05-ora-explained.md](quizzes/05-ora-explained.md).

---

## 4. Two architectural facts that change how we build this

Verified against Open edX documentation.

### Fact 1 — a "topic" is a *unit*, and a unit stacks MULTIPLE components

Hierarchy: Course → Section → Subsection → **Unit (`vertical`)** → **Component (XBlock)**. *"A unit can contain one or more components."*

A "Video lesson" is often `html` (intro) + `video` + `html` (recap) + `problem` (knowledge check), stacked. **Open edX stores no `topic_type` field** — the outline derives the icon from the child block types.

**Consequences:** the player needs a **unit renderer** stacking N heterogeneous components, not one screen per type. Our types are a presentation layer we impose — resolved by unit **tags/taxonomy** (cleanest) or the naming convention we use today. Containers `split_test`, `library_content` and `conditional` are transparent — the renderer must recurse.

### Fact 2 — Practice / Graded / Final Exam is NOT a separate type

It is **subsection-level metadata**: grading policy + assignment type, optionally + timed config. The `problem` blocks inside are *identical*. **One problem renderer set serves all three** — only the shell differs (timer bar, exam intro, "practice" banner).

---

## 5. Design efficiency — the types collapse into 5 chrome families

Several types share the same player chrome and differ only by badge, copy and completion rule.

| Chrome family | Serves | Delta between them |
|---|---|---|
| **Media player** | Video · Podcast · VILT-Recording | Audio strips the video surface; badge + icon differ |
| **Document** | Reading · Lab | Lab adds downloads/instructions + external tool CTA |
| **Quiz** | Practice · Graded · Final Assessment | Badge, attempts, weight, entry/summary copy |
| **Embedded tool** | Activity (SCORM) · VILT-Live | Iframe container + fullscreen + loading/error states |
| **Submission** | Final Project | Stepper: submit → review → grade |

**So: 8 production types ≈ 5 chrome families + a shared topic shell** (header, badge, duration, footer action, completion, bookmark — see `footer-contract.md`).

**For the current sprint:** the 3 screens in flight (Reading · Quiz · Assessment) cover **3 of the 5 families**, ~34% of topics by volume and 100% of grading. The biggest uncovered gap is **VILT**. Podcast and VILT-Recording are near-free once the media player exists.

---

## 6. Build contract — how each type maps to Open edX

| Topic Content Type | Open edX implementation | Renderers needed |
|---|---|---|
| **Video** | `vertical` with `video` (+ often `html`) | Player + transcript panel + handout/download |
| **Reading** | one or more `html` (+ embedded PDF, + Completion tool) | HTML renderer, PDF embed, file-download card, notes |
| **Podcast** | `video` (audio-only source) | Media player, audio variant |
| **VILT — Live** | LTI component (Zoom/Teams), launch inline/modal/new window | Launch card + pre-live/live states |
| **VILT — Recording** | `video` | Media player variant |
| **Lab** | `html` with a link to a Files & Uploads asset | File-download card + instructions + Completion tool |
| **Activity** | `scorm` XBlock — iframe or popup, **max 1 per unit**, 1–15 MB | Full-bleed iframe shell + score/completion + error state |
| **Quiz** (all three) | `problem` blocks; graded/timed set on the **subsection** | Problem renderers + the shell that matches the subsection metadata |
| **Final Project** | `openassessment` (ORA2) | Multi-step: response+upload → peer → grade + rubric renderer |
| **Discussion Prompt** | Unit-level discussion checkbox (Olive+) | **Footer region of the unit shell**, not a stacked component |

### 6b. Buildability confirmation — can we build it, how, and what can the unit stack?

*Mirrored in the Figma page as section `02 · Buildability on Open edX`, with a matching feasibility badge on each per-type lane.*

For every Topic Content Type: **is it possible on Open edX**, the **specific edX feature** to build against, and — per Architectural Fact 1 (a unit stacks multiple components) — **what else a unit of that type can stack**. Verdicts: ✅ Native (a stock XBlock does it) · 🟡 Workaround (LTI / infra / community XBlock) · 🔒 Blocked (no stock path, needs a build-or-buy decision).

| Topic Content Type | Possible? | edX reference (what to build) | What the unit can stack (+ limits) |
|---|---|---|---|
| **Reading** | ✅ Native | `html` + Files & Uploads | html, images, video, downloads, knowledge-check — freely |
| **Video** | ✅ Native | `video` XBlock (edxval, transcripts) | html (intro/recap), images, downloads, knowledge-check — freely |
| **Quiz** — Practice/Graded/Final | ✅ Native | `problem` (CAPA) + subsection metadata | several `problem` blocks + html for context · *graded counts toward the subsection grade* |
| **Podcast** | ✅ Native | `video` XBlock (audio source) | show-notes html, transcript/audio download, knowledge-check — freely |
| **VILT — Recording** | ✅ Native | `video` XBlock | same as Video |
| **Lab** | ✅ Native | `html` + Files & Uploads | several downloads, html instructions, images, knowledge-check · *no auto-grading (that's Programming Assignment)* |
| **ORA / Peer-graded** (Final Project) | ✅ Native | `openassessment` (ORA2) | html brief, example files · ⚠ **max 1 ORA per unit — multiple cause submission errors** (docs.openedx.org) |
| **Discussion Prompt** | ✅ Native | Unit discussion (Olive+) | ⚠ **does not stack** — it's a unit region, not a block |
| **Lesson Page** | ✅ Composition | `vertical` model (multi-component unit) | the **general case** — any combination of the blocks above |
| **VILT — Live** | 🟡 Workaround (LTI) | `lti_consumer` XBlock (Zoom/Teams/BBB) | html agenda, pre-reads, calendar link around the launch |
| **Activity (SCORM)** | 🟡 Workaround (community XBlock) | `openedx-scorm-xblock` (must be installed) | html instructions + downloads around it · ⚠ **max 1 SCORM per unit · 1–15 MB · NOT mobile** |
| **Programming Assignment** | 🟡 Workaround (needs infra) | XQueue (provisional) · LTI to JupyterHub | instructions + downloads · *the grader is external — no clean stock path* |
| **Role Play · Dialogue** | 🔒 Blocked | Custom XBlock with LLM, or LTI to external AI | to be decided · *needs a build-or-buy decision* |

**Verified against docs.openedx.org (Jul 24, 2026).** All 13 rows cross-checked against the official Open edX docs and our `edx-component-types-reference.md`. Confirmed hard limits: **SCORM = 1 per unit** (1–15 MB, break content into unit-sized chunks), **ORA = 1 per unit** (multiple *"cause errors when learners submit"*), **Discussion = unit-level** (not a stacked block), and **SCORM is community/third-party** (`openedx-scorm-xblock`, Overhang.io — not core). The general rule "a unit stacks heterogeneous components" is verified verbatim (OLX `vertical`).

**Still needs their course export (not a platform question).** Whether *our* units actually stack multiple components today, and whether more than one *graded* block per unit is used — these are course-config facts, verifiable only against a real export (see §7 Q9, Q13).

### 6c. Composition model — a Topic is an anchor + stackable primitives

*Agreed direction (Jul 24, 2026): the anchor + primitives model, named types as presets over one composer, and preset-guided authoring. Mirrored in the Figma page as `03 · Asset Catalog & Composition`.*

A Topic **is** an Open edX `vertical` unit — an ordered stack of components. We give that stack a rule so authoring is mostly free but never inconsistent:

> **Topic = [ 0 or 1 anchor ] + [ N stackable primitives ]**

- **0 anchors** → a **Lesson Page**: free composition of primitives.
- **1 anchor** → a **named type** (Quiz, SCORM, ORA, VILT-Live). The anchor names the topic, sets the chrome, and **owns completion**.
- **2+ anchors** → not allowed. SCORM = 1/unit and ORA = 1/unit are hard platform limits, and two anchors make completion and grade roll-up ambiguous.

**Named types are recipes over one composer, not 13 separate definitions.** Each named type = *anchor (or none) + typical primitives + a completion rule*. Authoring is **guided by presets**: the author picks a preset, which seeds the recipe, then adds or removes primitives within the anchor's limits.

**Key simplification for devs: only four anchor kinds exist.** Everything else is a primitive-composed recipe — so only these four ever need "solo / limited / owns-completion" handling:

1. **Graded problem set** (Quiz) — `problem` × N, graded via subsection metadata
2. **SCORM** (Activity) — `openedx-scorm-xblock`, **max 1/unit**
3. **ORA** (Peer-graded) — `openassessment`, **max 1/unit**
4. **LTI** (VILT-Live and future tools) — `lti_consumer`, 1

*Discussion is neither primitive nor anchor* — it's a **unit-level attachment** (a checkbox on the unit, rendered as a footer region), orthogonal to the stack.

#### Asset Catalog — the stackable primitives (compose freely, any number)

| Primitive | edX XBlock | Completion contribution | Mobile | Authoring notes |
|---|---|---|---|---|
| **Text / rich text** | `html` | ~5s visibility (with Completion tool) | ✅ | Learner Notes/annotations work **only** on stock `html` |
| **Image** | `html` (embedded) or static asset | none on its own | ✅ | Zoom / full-screen not natively supported |
| **Video clip** | `video` | ≥90% watched (if it drives completion) | ✅ | Transcript, speed, captions, handout |
| **Audio** | `video` (audio source) | ≥90% listened | ✅ | Waveform surface stands in for the video frame |
| **File / download** | `<a>` to a Files & Uploads asset | via Completion tool | ✅ | The Lab `.ipynb` download pattern |
| **Callout / alert** | `html` | none | ✅ | Presentation only |
| **Knowledge-check** | `problem` (ungraded) | scores as *practice*, never graded | ✅ | Single ungraded question — no attempts counter, no results summary |

#### Asset Catalog — the anchors (max 1 per Topic; owns completion)

| Anchor | edX XBlock | Limit | Completion owner | Mobile |
|---|---|---|---|---|
| **Graded problem set** (Quiz) | `problem` × N | subsection = graded | subsection grade (attempts, weight) | ✅ |
| **SCORM** (Activity) | `openedx-scorm-xblock` | **max 1/unit · 1–15 MB** | package `cmi.completion_status` | ❌ |
| **ORA** (Peer-graded) | `openassessment` | **max 1/unit** | ORA grade step | ✅ |
| **LTI** (VILT-Live) | `lti_consumer` | 1 | attendance (VILT) — *see §3* | partial |

#### Per-type recipes — each named type as anchor + primitives + completion

| Named type | Anchor | Typical primitives | Completion |
|---|---|---|---|
| **Reading** | — (none) | html body + images + embedded PDF + downloads + knowledge-check | Completion tool (manual) or read-through |
| **Video** | `video` | html intro/recap + downloads + knowledge-check | video ≥90% |
| **Podcast** | `video` (audio) | show-notes html + transcript/audio download + knowledge-check | audio ≥90% |
| **Quiz** — Practice/Graded/Final | graded `problem` set | html context between problems | subsection grade / attempts |
| **Lab** | — (none) | downloads + html instructions + images + knowledge-check | Completion tool (manual) |
| **Activity (SCORM)** | `scorm` (1) | html instructions + downloads | package `completion_status` |
| **ORA / Peer-graded** | `openassessment` (1) | html brief + example files | ORA grade step |
| **VILT — Live** | `lti_consumer` (1) | html agenda + pre-reads + calendar link | attendance (auto) **OR** recording ≥90% — *no manual mark, §3* |
| **VILT — Recording** | `video` | same as Video | video ≥90% |
| **Lesson Page** | — (none) | any combination of the primitives above | Completion tool (manual) or last-block |
| **Discussion Prompt** | — (unit-level) | n/a — footer attachment | participation |

**Reading, Lab and Lesson Page share the same shape:** no anchor, a curated set of primitives, and a manual/read completion. They differ only in which primitives the preset seeds and the badge/label — which is exactly why the composer model collapses them into one engine.

### Adding a new Topic Content Type — the registration rule

*Learned the hard way while building the prototype (Jul 22, 2026). Worth a panel in Figma.*

A topic type is not one thing you define — it is an **entry in every list that describes topics**. Miss one and the type still renders, so nothing looks broken; it just behaves subtly differently from every other type, and the defect only surfaces when someone compares two types side by side.

Each of the following was found broken in the prototype after adding a new type, and each is a *design* decision before it is a code one:

| # | What must be defined | What goes wrong if it's missed |
|---|---|---|
| 1 | **Type name** in the roster | Type can't be authored or selected |
| 2 | **Chrome family** it belongs to | Falls back to Reading — wrong shell entirely |
| 3 | **One-line description** for the topic header | The header echoes the topic title back at the learner |
| 4 | **Primary tab label** | The first tab renders with no label at all |
| 5 | **Icon** | Falls back to a generic icon; type unreadable in the outline |
| 6 | **Short label** for the outline badge | Long name truncates in the sidebar |
| 7 | **Downloads source** | The tab shows a generic file, contradicting the content on the page |
| 8 | **Who owns the completion action** — the type itself, or the shell | Two "Mark as complete" buttons, or none |
| 9 | **Completion rule** | Topic never completes, or completes on entry |
| 10 | **Position/progress indicator**, if it has multiple items | Progress stated twice in different words |

**Design rule:** a new Topic Content Type is only "done" when all ten are answered — not when its screen looks right in isolation.

**Recommended safeguard for the devs:** a test that fails when a family is missing from any of these maps, rather than relying on someone remembering. Cheap to write, and it converts a class of silent inconsistencies into a build error.

Two platform constraints to flag to devs now:
- **Only 1 SCORM component per unit** — affects how Activities can be composed.
- **Learner Notes work only on stock HTML components.** Replacing the HTML renderer breaks note-taking unless re-implemented.

---

## 7. Open questions

### For Rupali / content team
1. **"Scenario with options"** — SCORM, or a native branching component?
2. **VILT** — which platform (Zoom/Teams/other), and is joining via LTI or an external link?
3. **VILT** — who owns session metadata (date, join link, recording)? Is the recording authored separately?
4. **VILT recording** — will a transcript be available, and does it get the same controls as a normal Video? *(Navdeep)*
5. **Lab** — stay as notebook downloads, or move to a hosted environment (JupyterHub)?
6. **Final Project** — one topic page or several? Is the composition fixed or per-course?
7. **Role Play / Dialogue** — two features or one component in two modes? What does "requires AI integration" mean concretely?
8. Of the ~28 Studio types — which are genuinely new vs. authoring conveniences?

### For Rashid / devs
9. **Do our units contain single or multiple components?** Determines whether we design one screen per type or a composable unit shell. → verify against a course export.
10. **How should topic type be resolved?** Today it is encoded in the display name ("Video: …"). Recommend unit **tags/taxonomy** so the player never parses titles.
11. **Rendering strategy** — theme the `render_xblock` iframe, re-implement natively, or hybrid? (Recommendation: hybrid — see [quizzes/04-quiz-experience-spec.md](quizzes/04-quiz-experience-spec.md).)
12. **How do we build Role Play / Dialogue / Programming Assignment** on an edX backend?
13. **Component-stacking in *our* courses** (see §6b) — the platform limits are now verified (SCORM = 1/unit, ORA = 1/unit, Discussion = unit-level). What remains is course-specific: do our units actually stack multiple components today, and do any stack more than one *graded* block per unit? → verify against a real course export (SKOAIH01).
