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
| ~~**Discussion Prompt**~~ | Discussion thread | 0 | — | ⛔ **Deprecated as a topic type (Jul 29, 2026)** — Discussion is course-level chrome + an optional footer, not a stacked type. See "Discussion" note below. |
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

### Discussion — course-level chrome, not a topic type (decided Jul 29, 2026)

Discussion is **not** a stacked topic content type. Open edX treats unit-level discussion as a **footer region of the unit** (Olive+: a checkbox on the unit, auto-named after it, expanded by default → edX reported +3× participation), and the coherent home for threads is the **course-level Discussions space**. So:

- **Deprecate the `Discussion Prompt` topic type** (0 authored volume) — it leaves the type catalogue (removed from the DS `LMS / Topic-Types Badge` variants and not shown as a section in the Figma catalogue).
- **Course-level Discussions space** — a generic upper layer (a Discussions tab/section in the Course Hub + a right-rail Discussions panel in the player, next to AI Assistant / Saved / Notifications) is the home for all threads. This closes the course-wide-forum gap.
- **Optional in-context footer** — a "Discuss this topic" region at the foot of the topic shell, **optional per type** (like Author & Updated Date), deep-linking into the *same* course thread. The panel opens by default on the current topic's thread with a "view all".
- **Reuse the components** — `Thread Item`, the `Discussion` tab state and the `Discussion Prompt` input are repurposed for the footer + panel, not for a standalone topic.

This closes **Open Question #10** (`edx-parity-audit.md` §8 — course-wide forum vs per-topic Discussion Prompt): **course-level Discussions space + optional in-context footer; never a topic type.**

**Prototype status (Jul 29 2026):** the **entire** Discussions surface — the course-level panel, the topbar entry point, and the optional per-topic footer — sits behind a **"Preview features" toggle, hidden by default**, until the Discussions phase is designed. The gate is all-or-nothing (it hides everything, not just the footer), so the prototype shows no orphan entry point to an unfinished surface.

### Not-yet-covered — discovery backlog (edX docs, Jul 29 2026)

Open edX exercises/tools we have **not** designed yet — **discovery only, not scoped to build.** Ranked by fit. Source: docs.openedx.org "Problems, Exercises, and Tools" (Redwood). Mirrored in the Figma page as `03.1 · Not-yet-covered — discovery backlog`.

**A — Could be new topic types** (full support, distinct from ours):
- **Drag and Drop** (`drag-and-drop-v2`) — the learner drags labels/items onto zones of a background image; auto-graded. E.g. drop the 5 DMAIC phases onto a process map, or order steps in sequence. Mobile ✅.
- **Peer Instruction** (`ubcpi`) — a 2-step multiple-choice: answer → see how peers answered (and why) → revise your answer. A teaching technique (rethink after seeing peers). ≠ ORA (submit-a-work + peer-grade).
- **Poll / Survey** — Poll = one quick opinion question, results as an aggregate %; Survey = several such questions (e.g. end-of-module feedback). Both ungraded.
- **Staff Graded Assignment** (`edx_sga`) — the learner uploads a file (report, spreadsheet…) and an instructor grades it by hand with a score + feedback. ≠ ORA (peer/self-graded via rubric).
- **H5P** (community XBlock) — ~50 ready-made interactive types (flashcards, interactive video with in-line questions, branching scenarios, image hotspots, timelines…), authored in a visual editor. Rich interactivity without custom dev.

**B — Components / assets** (extend what we have):
- **Problem response variants** — the ways to answer a Problem; we only drew radio (single) + checkbox (multi). Missing: **Dropdown** (pick from a compact list) · **Numerical Input** (type a number with tolerance, e.g. Cpk = 1.33 ± 0.05) · **Text Input** (short validated text) · **Math Expression** (a formula graded by equivalence, not literal text). Full support, mobile ✅ — extends `07 · Quiz — answer controls`.
- **Custom JavaScript (JS Input)** — a question that is a small JS widget embedded in the problem; the JS reports the answer for grading. For interactions the standard types can't do (needs dev).
- **Google Drive · Calendar · Iframe** — embed external content: a Google Doc/Sheet/Slide, a Google Calendar (deadlines), or any external page/tool (Iframe). Content, not assessment.
- **Calculator · Image viewers** — Calculator = a scientific calculator available in the course; Image viewers = view images with zoom / full-screen / lightbox (detailed diagrams or control charts).

**C — Delivery / structure mechanisms** (control what is shown; not "types"):
- **Conditional Module** — shows/hides content based on what the learner already did (e.g. show a video only after passing the quiz, or show remedial content if they missed question X). Adaptive gating.
- **Split Test** — A/B test: different learners see different versions of the same block, to compare which works better.
- **Library Content** (`library_content`) — pulls a random subset of questions from a bank (e.g. 5 of 50, different per learner/attempt). Anti-cheating + reusable pools.
- **Timed / Proctored Exams** — a subsection set up as an exam with a countdown timer (and optionally proctoring — identity check / monitoring). High-stakes assessments.

**D — Niche / skip** (tagged by reason — `deprecated` · `heavy dev` · `STEM` · `external`):
- **Annotation** — respond to questions about highlighted text passages · `no support`
- **Circuit Schematic** — build/analyse electrical circuits · `STEM`
- **Chemical Equation** — enter chemical equations · `STEM`
- **LaTeX problem** — author problems in LaTeX · `deprecated`
- **Custom Python-eval** — grade with an embedded Python script · `heavy dev`
- **Image Mapped Input** — click regions of an image · `deprecated` (→ Drag and Drop)
- **Adaptive Hint** — progressive hints on wrong answers · `no support`
- **Oppia** — embed Oppia interactive explorations · `external`
- **Word Cloud** — aggregate learner words into a cloud · `provisional`
- **Gene Explorer · Periodic Table · Protex** — biology/chemistry simulations · `STEM`
- **Recommender** — community resource lists with voting · `no support`
- **Qualtrics** — embed Qualtrics surveys · `external`
- **External Grader** — send answers to an external autograder · `heavy dev` (→ Programming Assignment)

**Already tracked (not new):** Role Play · Dialogue · Programming Assignment (blocked — no edX equivalent, §2).

Highest-return if picked up later: **Drag and Drop** + the **Problem response variants**; then **Staff Graded Assignment** / **Peer Instruction** (product call vs ORA); **H5P** + **Library Content** are platform calls.

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

**Author & Updated Date is optional per type (shared shell rule).** The page-level *Author & Updated Date* row (author avatar + name + role + "Updated …" date) is **kept only on authored content that changes over time** — Reading · Video · Lesson Page · Lab · Podcast — and **removed on assessment / interactive / live** types — Quiz · ORA · VILT · Activity (SCORM): those have no single author and no meaningful "updated" date, and VILT's host is already surfaced in the session card. The feedback row and footer nav stay on every type.

**License (CC) display — validated, scope PENDING (Jul 29 2026).** Checked against docs.openedx.org: the **course license shows at the bottom of *every* content page** (Course tab), plus an optional **per-video license** at the bottom-right of the player *only when it differs* from the course. It does **not** depend on transcript / chapters / media type. So the edX-faithful behaviour is **course-wide** — different from the Author & Updated Date criterion, and broader than the "media types only" hypothesis. **Interim:** the license is shown **only on Video** (its own footer) and hidden on every other topic type via the `Show License Text` toggle on `LMS / Content Feedback`. **Final scope is pending a product decision** — course-wide (per edX) vs media-only vs authored-only.

**Mark-as-Complete placement (shared shell rule).** The manual *action* button "Mark as complete" renders **only in the footer**, never in the header — a header CTA invites premature completion and duplicates the footer action. Once the topic is completed, the **✓ "Marked as Completed" status badge** may appear in **both** the header and the footer (it is *status*, not an action). This is baked into the DS `LMS / Topic Header`: the top status-badge slot is **off by default** and turns on **only in the completed state**. The button itself uses the **Primary** hierarchy (DS `Mark as Complete`).

Per-type completion handling:
- **Automatic-completion types** (VILT, ORA, Quiz) never render a manual Mark-as-complete at all — see the VILT completion rule in §3.
- **Video** auto-completes at **≥90% watched** whenever the platform can report the learner's watch-%. In that case there is **no button**. The manual Mark-as-Complete is an **optional fallback**, shown *only* when watch-% can't be tracked — so the action is optional for this topic type, not guaranteed.
- **Reading · Lab · Podcast · Activity · Lesson Page** keep the manual footer action (Completion tool), with automatic contributions where a primitive drives them.

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

*Agreed direction (Jul 24, 2026): the anchor + primitives model, named types as **presets / templates** over one composer, and preset-guided authoring. Mirrored in the Figma page as `03 · Asset Catalog & Composition`.*

> **Nomenclature (Jul 29, 2026):** we say **Preset / Template** interchangeably for a named type's composed topic page — the ready-made recipe (anchor + primitives + completion) an author starts from. In the Figma catalogue each section is split into **① Components & assets** (the DS pieces) and **② Preset / Template** (the composed page).

A Topic **is** an Open edX `vertical` unit — an ordered stack of components. We give that stack a rule so authoring is mostly free but never inconsistent:

> **Topic = [ 0 or 1 anchor ] + [ N stackable primitives ]**

- **0 anchors** → a **Lesson Page**: free composition of primitives.
- **1 anchor** → a **named type** (Quiz, SCORM, ORA, VILT-Live). The anchor names the topic, sets the chrome, and **owns completion**.
- **2+ anchors** → not allowed. SCORM = 1/unit and ORA = 1/unit are hard platform limits, and two anchors make completion and grade roll-up ambiguous.

**Named types are recipes over one composer, not 13 separate definitions.** Each named type = *anchor (or none) + typical primitives + a completion rule*. Authoring is **guided by presets / templates**: the author picks a preset (template), which seeds the recipe, then adds or removes primitives within the anchor's limits.

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

**Reading, Lab and Lesson Page share the same shape:** no anchor, a curated set of primitives, and a manual/read completion. They differ only in which primitives the preset / template seeds and the badge/label — which is exactly why the composer model collapses them into one engine.

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

---

## 8. Stakeholder workshop — 29 Jul 2026 (Navdeep, Harpreet, Nelson)

Decisions taken with the stakeholders, and what changed in Figma as a result. Sign-off status at the time of the workshop: **Video approved**, **Quiz close to approval**, everything else unsigned — the team agreed developers should build only from the `READY FOR DEV ✅` section.

> **Verified against the recording.** The AI-generated meeting notes were checked line by line against the workshop transcript. Two claims in those notes were **wrong** and are corrected below: the prefix decision was stronger than "don't hardcode", and tabs were **not** left undecided. Timestamps below refer to the transcript.

### Quiz — decided

**No prefix functionality at all — the property comes out of the component.** The notes said prefixes "should not be hardcoded". The actual instruction was stronger. Navdeep, at 00:16:46: *"We should remove this A dot"*, and at 00:19:11: *"We should not provide any functionality of putting a prefix to them"* — because a show/hide switch is dev work for a feature that will never be used (00:19:33). Harpreet gave the reason at 00:18:43: prefixes break randomisation — *"if we put A, B, C, D, you can't randomize it"*. Lettering is the quiz author's business, inside the option string: *"it's a string for them, a string for us"* (00:20:17).
→ Applied: the `Show prefix` and `Prefix` properties and the prefix text layer are **deleted** from `LMS / Quiz · Option Row`; prefixes are off across the ICP and the "Prefix" demo column in `04.2` is retired.

**The Disabled state must disable the control, not the row.** Harpreet spotted that the greyed row read as *more* enabled than the white one (00:21:48). Navdeep, 00:22:07: *"only the check box or the radio button can become enabled or disabled. For the whole sentence to turn gray, maybe that's an overkill"* — and 00:23:02: *"No need to make it gray."*
→ Applied in the DS: `State=Disabled` keeps the white surface and full-contrast label; only the checkbox/radio is dimmed.
→ Also decided and easy to miss (00:23:42): in an **incorrect** row, the selected checkbox stays in its **normal** state, exactly as in the correct example — it is not greyed and not recoloured.

**Quiz metadata is optional — render only what the backend sends.** Navdeep, 00:30:49: the question count is always present, but the time approximation, the attempts count and the pass mark each appear *only* if the author supplied them — *"either display it or don't display it"*. Harpreet flagged it as a story requirement for Rashid (00:29:13).
→ Documented in Figma on section `04 · Quiz` and here.

### Quiz — from the recording, now applied

None of these were in the AI notes; all were said in the room, and all are now built.

- **"View submission" and "See feedback" are the same button.** Navdeep, 00:45:28: *"they are tertiary buttons. And they should be the same"*; one black and one blue was *"a mistake"* (00:45:55). Both are now `Link color` on the Passed and Failed variants of `LMS / Quiz · Results Summary`, leaving the primary CTA as the only louder element.
- **"Submit — final" is now just "Submit".** Harpreet, 00:25:38: if it means nothing, drop it — and Nelson could not say why "final" was there (00:25:26). It also carried an em dash.
- **No em dashes in interface copy** (Harpreet, 00:25:44). Removed from the results heading, the quiz description, the question text, the topic-header descriptions and the inline alerts. Canvas annotations and this documentation are not interface copy and were left alone.
- **Progress uses the new `Quiz · Progress Bar` variant** — "Question X of Y" plus a bar and a percentage — on all three flows and the canonical page.
- **The prefix demo column is retired** from `04.2`, now that the property no longer exists.
- **Verified, no change needed:** "Review module first" was already a secondary button (00:30:49), and radio vs checkbox are already visually literal (00:16:00).

### Quiz paginator — semantics (decided by Nelson, 29 Jul 2026)

The paginator is `LMS / Quiz · Questions Progress`, variant **`Quiz · Progress Bar`**: step label, bar, percentage. It replaces the per-question circles in the prototype.

**The percentage is answered ÷ total, not position ÷ total.** This is the whole point of the choice: going back to review an earlier question moves the step label backwards but must never shrink the bar. Progress is what you have completed, not where the cursor happens to sit. A position-based bar would regress on every review and read as lost work.

The DS placeholder contradicted itself — "Question 2 of 5" with 67% on the label and 70% on the bar, three different numbers in one component. All four instances are now internally consistent, using *answered = position − 1*: the three flow screens read "Question 2 of 5" at 20%, the canonical page reads "Question 6 of 10" at 50%.

**The stock `Progress bar` component was drawing the wrong fill, and is now fixed** (`1085:57382`, 55 variants). The `Label=False` family mapped its fill linearly from **44 px at 0% to 320 px at 100%** instead of 0 to 320. Every value read high, and the error grew as the percentage fell: 50% drew 57.5%, 20% drew 31.6%, and **0% drew a 13.8% stub of progress for a learner who had answered nothing**. It was not a scaling problem — the instances scale correctly; the master ratios were wrong.

The paginator itself uses **`Label=Right`**, which renders the percentage inside the component. That family was already cut to true ratios; its only defect was the 0% variant drawing a ~2.5% sliver from the rounded cap, now empty. Verified after publishing: the canonical page reads "Question 6 of 10" with a fill measured at 50.4%, the three flow screens read "Question 2 of 5" at 20.1%.

All eleven `Label=False` variants were re-cut to true ratios, and the 0% variant of the four labelled families (which drew a ~2.5% sliver from the rounded cap) now renders empty. All 55 variants verified accurate to within a rounding pixel. The floating-label variants were already correct: they wrap the fill in a frame with the tooltip anchored to its right edge, which is the more robust construction.

### No em dashes — swept across components and screens

Applied Harpreet's rule (00:25:44) beyond the quiz: **85 text nodes across the ICP screens** and **35 across the LMS component library** were rewritten, replacing the em dash with the punctuation the sentence actually needed — a full stop where it joined two sentences, a colon where it introduced, a comma where it was parenthetical, a middot in label pairs such as `DESCRIPTION · REQUIRED FOR EACH FILE`. Nothing was substituted blindly.

Two categories were deliberately left alone, and should stay that way: **canvas annotations** (section titles, panel descriptions, these documentation notes) are not interface copy, and the em dash carries meaning there; and the **Untitled UI stock pages** in the design-system file, which are vendor content we do not ship.

Also cleared in the same pass: the `Results Summary` pending state showed a bare em dash as a placeholder for an unknown score, which broke both this rule and the optional-metadata rule. It now reads **Pending**.

### Quiz — still outstanding

- ~~**The per-question circle indicators are contested.**~~ **Resolved (Jul 29, 2026)** by the `Quiz · Progress Bar` variant. The room had decided to drop them (Navdeep, 00:54:15: a dot per question *"might be just an overkill"* on a 20-question quiz; Harpreet, 00:55:23: *"Those rounded button is not giving me anything extra"*) while the quiz was a single scroll and the dots were decoration. The stepper briefly turned them into the navigator, which reopened it. The new variant delivers exactly the room's ask — question X of Y plus a bar — and the stepper's Previous/Next carries the navigation the dots used to. **Circles are out, in the DS and the prototype. No further ruling needed.**
- **"Review module first" must disappear** when the quiz is not linked to a module or lesson — a course-final quiz has no such link (00:30:31).
- **Scoring-state colour rules are unspecified** (00:33:52): when is a score black, when red, when amber? Red vs amber for a fail was left unresolved — Navdeep argued the DS ambers are accessible, Harpreet was not convinced. A submitted-but-ungraded quiz is all black, and the whole screen changes once results are released (00:35:40).
- **The `Results Summary` component still carries the em-dash heading as its default.** The instances are overridden and read correctly, but the component lives in the published library and needs the same fix at source, or new instances reintroduce it.
- **Study Zoho Survey's form patterns** — Harpreet's explicit homework (00:50:07), including its progress treatment and question types.
- **Delivery caveat** (01:45:42): the quiz ships as **multiple choice only**; true/false and the other types come in a later sprint.

### Quiz layout — decided after the workshop (29 Jul 2026, Nelson)

Not a workshop decision: taken the same day, from primary-source research, and **not yet seen by Navdeep or Harpreet**.

**Quizzes become a stepper — one question per step.** A working assumption in [quizzes/04-quiz-experience-spec.md](quizzes/04-quiz-experience-spec.md) held that Open edX *forced* a single stacked scroll, because "a unit stacks multiple components". That inference was **wrong**. The **subsection** is the quiz container (grading, timed/proctored config, navigation), and the platform ships `SequenceNavigation` — one tab per unit plus Previous/Next, with its own `{current} of {total}` counter. Authoring **one `problem` per unit produces a question-by-question stepper natively, with no custom code**. Stepper vs. scroll is an authoring choice, not a platform limit. Evidence and version caveats: spec §1.4-0c/0d.

→ Applied in the prototype: entry header → one question per step (navigator + Previous/Next question) → results summary. Submit stays **per question** — the platform has no submit-all.
→ **Consequence to plan:** existing quizzes must be **re-authored in Studio**, splitting each question into its own unit. Sequence and cost this content migration with Rashid; confirm whether it runs per-course or platform-wide.
→ Competitive context (full table in [quizzes/02-coursera-quiz-benchmark.md](quizzes/02-coursera-quiz-benchmark.md) §7): Coursera is single-scroll, Udemy and LinkedIn are steppers, Canvas and Moodle make it an instructor setting. Coursera's no-navigator minimalism is affordable only because retries are effectively unlimited — **our graded path allows just 2 attempts at the whole quiz** (corrected 3 Aug 2026: an attempt is one run through the quiz, not a retry per question — see `quizzes/04-quiz-experience-spec.md` §9.3), so that trade does not transfer.

**✅ The per-question dots — conflict resolved (Jul 29, 2026).** The workshop had decided to **drop the per-question circle indicators** (Navdeep 00:54:15, Harpreet 00:55:23: *"those rounded buttons are not giving me anything extra"*), keeping "2 of 10" plus a progress bar. That was decided while the quiz was **one scroll**, where the dots were decoration. The stepper briefly turned them into the navigator — the only way to jump between questions — which reopened the ruling.

Settled by the new DS variant **`Quiz · Progress Bar`** (`LMS / Quiz · Questions Progress`, node `20464-4849`): step label, bar, percentage. It is precisely what the room asked for, and the stepper's Previous/Next carries the navigation the dots used to. Navdeep's objection holds either way — on a 20-question quiz, 20 dots are noise, and a bar is not. **Circles are out, in the DS and the prototype.**

Two implementation notes carried into the prototype:
- **The percentage is `answered/total`, not position**, so stepping back to review an earlier question never shrinks the bar.
- **Free backtracking stays**, so there is no navigator to hide. Were it ever disabled, remove the navigator entirely rather than rendering it disabled (Canvas New Quizzes' rule: don't show a mini-map you can't use).

### Course Details page — decided

Rebuilt as **`Course Detail — v9 · Self-paced MVP`** in Platform Pages V8; the pre-workshop frame is kept alongside, renamed *superseded*. The example course was switched to **Six Sigma for process improvement** so it can be compared against the ICP without second-guessing (Harpreet, 01:12:46).

- **Self-paced only for the MVP.** Harpreet, 01:22:22: *"Let's do this page only for self-paced first. Like the lowest denominator."* This removed the delivery-mode badge, the cohort line, the "Course 1 of 6" position, the cohort-attendance card and the programme card — a course can appear in several programmes, so that link is not reliably knowable (01:21:35).
- **The syllabus runs to topic level**, in an accordion, exactly as the ICP: Module → Lesson → Topic, and Module → Topic where a lesson does not exist (01:00:53, 01:02:14). A lesson shows "N topics · duration"; the type badge and duration belong to the **topic**.
- **All syllabus titles are clickable and deep-link into the immersive experience** (01:03:30) — so a learner can spot an unticked item and jump straight to it.
- **Completion is a tick, nothing more.** Navdeep, 01:02:14: *"we don't need where we are currently because it doesn't matter where we are. Either we are finished or not finished."* No current-position marker.
- **No module-level completion %.** Navdeep, 01:06:01: attributing a percentage across mixed content (*"if you say lab, how much percentage do you want to attribute to the lab?"*) is unworkable — *"no calculation based statistics to be shown module wise"*. The **course-level** percentage stays: it is a native edX value available from an API call (01:07:36).
- **Strip the repeated stats.** Completion dates and "2 of 5 complete" are gone — every one of them costs a backend query and slows the system (Harpreet, 01:08:35). Module 1 needs no subtitle at all (01:11:11).
- **No separate syllabus page** (01:35:41) — the biggest course still fits on one page.
- **Excluded until requirements exist:** course-level resources — nobody could define their purpose, so *"let's not give it to the developers at this stage"* (01:19:44) — and assignment deadlines, which belong in the calendar (01:37:34). An assignment is authored as a topic under a module, like anything else (01:36:07).
- **Locked modules get a tooltip, not a subtitle.** "Locks" was wrong copy for "Unlocks" (01:10:20). Navdeep, 01:15:44: put the rule in a hover tooltip — *"unlocks on date or unlocks after you finished module 2"* — because a subtitle is overload. Nelson raised that tooltips need a tap equivalent on tablets; Navdeep accepted that as a solvable problem, not a reason to drop them.
- **No L1 / L2 / L3 numbering** (01:12:16) and **no "hands off to capstone" teaser** (01:13:29) — the capstone is simply the last module.
- **Course stats move under Course Info** — Harpreet, 01:24:36: *"Why should it be sitting on the top?"*
- **The progress card is course progress**, labelled as such, top right (01:27:50).

### ⚠︎ Where the current design diverges from the workshop

**Tabs.** The AI notes recorded this as undecided; it was not. Harpreet, 01:31:17: *"resources and grade can be your phase two. If we don't have the information, let's not include it. When we bring the information, then we can ask them to put it under a tab."* Navdeep expected Grades and Certificates to be two tabs and wanted the list confirmed with the edX team (01:32:08); Harpreet called the certificate tab important because it doubles as marketing (01:31:57). **The v9 frame has no tabs** — a deliberate MVP simplification that must be agreed with Navdeep and Harpreet at the review before it ships.

### Still open after the workshop

- **Course unlocking** — which rules the API exposes (date-based *and* completion-based) and every resulting scenario. The tooltip currently shows a date only. *(action 8)*
- **"What you'll learn" must be a mapped edX field**, not written by us — and the heading follows the field, so if it is called Objectives the heading is Objectives (01:30:39).
- **Right column reserved for course metadata** — course ID, start and end dates; fields to be confirmed with the edX team (01:25:33).
- **Course image source** — there are no images on the edX side today (01:28:54).
- **Mentor** — the booking and message journeys are undefined (01:39:41), and the label may need to read "Your mentor" (01:32:37).
- **Progress states** — Resume vs Start vs Completed all need mapping; Navdeep questioned whether Resume makes sense at all for a self-paced course (01:28:07).
- **Every element needs its scenario matrix** written out before development (Harpreet, 01:38:58).
- ~~**Quiz question types**~~ — **RESOLVED 30 Jul 2026** in a Studio walkthrough with Simran Jindal. The list is multiple choice (~90% of usage), checkbox, multiple choice / checkboxes **with hints and feedback** (being adopted now), dropdown (rare), numerical input (rare); staff graded points is an assignment, not a quiz. **Hints are a design gap** — we built feedback, not hints. See `quizzes/04-quiz-experience-spec.md` §9 and `session-log.md`. *(action 4 closed)*
- **Interface copy rules** — sentence case vs title case, pending Kirti Mishra; proofreading happens once a screen is ready for delivery so it does not become a bottleneck. *(actions 2, 3)*
- **Design-system differentiation** — Navdeep, 00:44:29: *"tags should not look like buttons, buttons should not like pills, pills should not look like links"*. Harpreet's rule of thumb: if it is not clickable, it should not have an outline. Bruno may help. *(action 7)*
- **Micro-animations** — deferred to a dedicated Nelson/Navdeep discussion: add them progressively, or after the core components are done. *(action 6)*
- **Navigation strategy** — the left panel itself is a big separate topic; left nav vs top nav needs its own session (01:41:36).
- **edX metadata export** — whether course metadata can be extracted in a structured form. *(action 10)*
- **Governance** — only Video is signed off. Developers had already started on quiz and reading; the fix agreed was a clearly separated ready-for-delivery area so nothing in progress gets picked up (00:07:58).
