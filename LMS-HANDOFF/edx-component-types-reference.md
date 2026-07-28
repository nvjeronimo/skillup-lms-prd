# Open edX Component Types — Full Reference

*Research Jul 20, 2026 · sources: docs.openedx.org, edx.readthedocs.io, openedx GitHub*
Companion to [topic-types-inventory.md](topic-types-inventory.md). This is the "what the backend can deliver" half.

---

## 0. The architectural fact that drives everything: unit ≠ component

Hierarchy: **Course → Section (chapter) → Subsection (sequential) → Unit (vertical) → Component (XBlock)**.

- "A unit is a part of a subsection that learners view as a single page."
- "A component is the part of a unit that contains your actual course content. **A unit can contain one or more components.**"

**What we call a "topic type" is a *unit*, but a unit is an ordered, vertically stacked list of heterogeneous components** (the OLX block type is literally `vertical`). A "Video lesson" unit is often: `html` (intro) + `video` + `html` (recap) + `problem` (knowledge check).

**Open edX stores no `topic_type` field on a unit.** The outline UI derives icon/label from the *set of child block types*. To have a first-class topic type we must either (a) derive it from children, (b) use unit-level **tags** (taxonomy, Sumac+ — cleanest), or (c) impose a naming convention (what our courses do today: "Video: …", "Reading: …").

Therefore the player needs:
1. A **unit renderer** stacking N component renderers vertically in author order.
2. A **per-component-type renderer** (inventory below).
3. A **topic-type resolution strategy** (tags recommended).

## 1. Mobile-ready set (verbatim from Open edX docs)

HTML blocks, Video blocks, Course discussions, Drag and Drop Problem, Dropdown, Math Expression Input, Multi select, Numerical Input, Single Select, Text Input, Open Response Assessments, Surveys. **Everything else is not mobile-ready** (notably SCORM, Poll, Word Cloud, JS Input).

## 2. Text / HTML (`html`) — Full support · mobile ✅ · never graded

Studio templates: **Text** (visual editor), **Announcement**, **IFrame Tool**, **Raw HTML**. Note: "there is no way to switch between Visual and Raw editor types once selected." Completion fires after ~5s visibility.

Techniques authored *inside* a Text component (not separate XBlocks, but each needs visual treatment):

| Technique | Learner UI | Tier |
|---|---|---|
| Zooming Image | Click a region to enlarge in overlay | Not supported |
| Full Screen Image | Enlarge image to fill window | Not supported |
| IFrame tool | Third-party site inline; ungraded only | Provisional |
| Anchor / in-page links | Named anchors + tooltips in long text | Legacy |
| **Downloadable files / handouts** | `<a>` to a Files & Uploads asset — plain link. **This is how our Lab .ipynb download is implemented.** Needs a designed file-download card. | n/a |
| Embedded PDF | PDF viewer inside a Text component | documented |
| MathJax | LaTeX inline; player must load MathJax | Full |

## 3. Video (`video`) — Full · mobile ✅ · never graded

Learner surfaces: player (play/pause, scrub, volume, **speed**, fullscreen, CC), **interactive transcript panel** (click line to seek), **download video** (only if fallback URLs exist), **download transcript** (.srt / .txt), **handout download**, multi-language transcript selector, poster frame.

UI-changing settings: Video ID/URL · Fallback Videos (**required to enable download**) · Allow Video Downloads · Thumbnail · Transcript Languages · Download Transcript Allowed · **Show Transcript by Default** (major layout decision) · Start/Stop time (browser only, ignored on mobile) · Upload Handout · License · YouTube ID / HLS URL.

## 4. Discussion (`discussion`) — Full · mobile ✅ · ungraded

- **Legacy:** explicit `discussion` XBlock inside a unit with Category + Subcategory.
- **Current (Olive+):** tick a checkbox on the **Unit**; a topic is auto-created named after the unit. Inline discussions are **expanded by default** (edX reported 3× participation increase).
- Teak extracted it to `xblocks-contrib` behind `USE_EXTRACTED_DISCUSSION_BLOCK`.

**Design implication:** treat unit-level discussion as a **footer region of the unit shell**, not a stacked component.

## 5. Problem (`problem`) — the CAPA set

Graded **only if the containing subsection is graded**; otherwise scores as "practice".

**Simple (Studio simple editor):** Single Select · Multi select · Dropdown · Numerical Input · Text Input — all Full support, all mobile ✅.

**Advanced:** Custom JavaScript (JS Input) — Full, no mobile · Custom Python-evaluated (write-your-own-grader) — Provisional · Math Expression Input — Full, mobile ✅.

**Not supported:** Circuit Schematic Builder · Image Mapped Input · Problem with Adaptive Hint · Chemical Equation · Problem in LaTeX · Single Select + Numerical combined.

**Cross-cutting affordances (design once, reuse):** Submit/Check · attempts counter · Show Answer (`showanswer` enum) · sequential hints · per-option feedback · partial credit · randomization (`rerandomize`) · Reset · weight/max points · due-date & past-due states · **External Grader** (Provisional — async "queued for grading", needs its own pending/polling state).

## 6. Open Response Assessment (`openassessment`) — Full · mobile ✅ · graded

**A multi-screen wizard, not one screen.** Steps in required order:
1. **Your Response** — prompt(s) + rich text and/or **file upload**
2. **Learner Training** (optional; needs a peer step) — score samples vs staff answer
3. **Peer Assessment** — grade N peers ("Must Grade" vs "Graded By")
4. **Self Assessment**
5. **Staff Assessment** — overrides all
6. **Waiting / Your Grade** — interstitial then per-criterion breakdown

**Rubric model:** one rubric → N **criteria** (name + description) → M **options** each (label + explanation + points), plus optional comments per criterion and overall.

**Scoring:** staff overrides everything; peer score = **median** per criterion, summed; self-only ⇒ self is final.

Docs warn: "Avoid multiple ORA components in single course units."

## 7. Advanced components / XBlocks

### Full support
| Component | Learner UI | Graded | Mobile |
|---|---|---|---|
| **Drag and Drop v2** | Background image + draggable items into zones. *Standard mode*: per-drop feedback, retry. *Assessment mode*: place all → Submit, attempt limits. Best attempt wins. | Yes | ✅ |
| **LTI Component** | External tool inline / modal / new window. LTI 1.1 and **1.3 Advantage** (AGS passback, Deep Linking, NRPS) | If `scored`/AGS | Partial |
| **UBC Peer Instruction** | Two-round MC: answer + rationale → see peers' rationales → revise | Yes | ❌ |
| **Poll** | Single question, radio, then results bar chart | No | ❌ |
| **Survey** | Matrix of questions sharing one scale, then aggregate | No | ✅ |

**LTI UI settings:** launch target (inline/modal/new window) · inline height · modal height/width · `scored` · `weight` · `ask_to_send_username`/`email` (renders a **consent dialog** before launch) · `button_text` · `hide_launch` · custom params.

### Provisional
Calculator · **Conditional Module** (gates content on prior block state — `poll_answer`/`attempted`/`correct`/`submitted`/`voted`; shows a `message` with `{link}` back — **needs a "do this first" locked state**) · External Grader · Google Calendar · Google Drive Files · IFrame · Oppia · **Word Cloud** (type N words → aggregated cloud) · Custom Python input.

### Not supported (legacy, still renderable)
Annotation (`annotatable` — text, image, video variants) · **Completion Tool** · Gene Explorer · Periodic Table · Protein Builder (Protex) · Recommender · legacy Poll (`poll_question`) · Zooming/Full Screen Image · Drag and Drop v1.

### Completion Tool — special note
UI: **"Mark as complete"** → toggles to **"Unmark"**. Technically a graded block: in an ungraded subsection it shows as a **practice score**; in a **graded** subsection it contributes **1/1 or 0/1 to the final grade**. Docs recommend it for "ungraded activities such as reading assigned texts, watching videos". **Natural pairing with our Reading and Lab types.**

### Notes / annotation (platform feature, not a component)
Learners highlight text and attach notes; a **Notes page** lists all with deep links. Enabled per-course via Content → Pages & Resources → Notes. **Works only on text/HTML components** — not discussions, exercises, transcripts or PDFs. **If our player replaces the stock HTML renderer we break this unless we re-implement it.**

### SCORM XBlock — our "Activity" type
Not core — [`openedx-scorm-xblock`](https://github.com/overhangio/openedx-scorm-xblock) by Overhang.io. SCORM 1.2 and 2004.
- Renders **in an iframe or popup** (`display_type`), configurable width/height. State and score preserved across sessions (resume).
- Grading: emits `cmi.score.raw`. Fields: **Scored** (False if no quizzes), **Weight**.
- Completion: unit complete when package emits `cmi.completion_status`.
- **Constraints:** "**Only 1 SCORM component per Unit**"; keep packages 1–15MB; limit to a single quiz/scored element.
- **Not mobile-ready.**

### Staff Graded Assignment (`edx_sga`)
Community XBlock (add `edx_sga` to Advanced Module List). Scores **off-platform** work. Staff export CSV → fill "New Points" → import (≤4MB). Settings: display name, max points. Graded, not mobile-ready.

## 8. Subsection-level constructs — NOT components, but topic types to a learner

Configured via subsection → Configure → Advanced → "Set as a Special Exam".

| Type | Learner UI |
|---|---|
| **Timed Exam** | Pre-exam "Ready to start?" interstitial → countdown **timer bar** on every page. **Bar darkens at 20% remaining; text bolds at 5% remaining.** Hide/show timer icon. Time-expired/submit end state. |
| **Proctored Exam** | Timed UI **plus** onboarding/ID verification, software download/launch, rules acknowledgement, post-exam "under review / verified / rejected". Vendors: RPNow, Proctortrack. |
| **Practice Proctored / Onboarding Exam** | Rehearsal / one-time identity onboarding |
| **Graded subsection** | Assignment type (Homework, Lab, Midterm, Final Exam…) + weight → drives Progress grouping |

**Critical design implication:** our **Practice / Graded / Final Exam** distinction is *not* a component type. It is **(a) subsection grading policy + assignment-type name** and optionally **(b) timed/proctored config**. The components inside are identical `problem` blocks. The player must read **subsection metadata** to choose which shell (timer bar, exam intro, "practice — does not count" banner) wraps the same problem renderers.

## 9. Structural containers — invisible to learners, but the renderer must handle them

| Block | Learner sees | Notes |
|---|---|---|
| **Library Content / Randomized** (`library_content`) | N problems drawn at random per learner | Settings: Count, source Library, Problem Type filter, Scored |
| **Split Test / Content Experiment** (`split_test`) | **Nothing** — "they have no indication there is a content experiment"; they see only their group's content | Driven by a Group Configuration; assignment on first view |
| **Conditional** (`conditional`) | Gated content or "do this first" message | See section 7 |
| **Vertical** (`vertical`) | The unit itself | The stacking container |
| **Content groups / cohorts** | Component-level "Restrict access to" | |
| **Unit / component visibility** | "Hide from learners" | |
| **Prerequisite subsections** | "Complete X first" gate | Milestones feature |

**Design implication:** `split_test`, `library_content` and `conditional` are **transparent containers** — the renderer must recurse and render whatever children the API returns, never assuming a flat unit→component tree.

## 10. Recent releases affecting a new frontend

**Teak (Jun 2025):** More content blocks **on by default** via an "Advanced" tile dropdown — Google Calendar, Google Documents, LTI 1.3 Consumer, Poll, Split Test, Survey, Word Cloud. XBlock extraction: Annotatable, Discussion, HTML, LTI, Poll Question moved to `openedx/xblocks-contrib` behind `USE_EXTRACTED_*_BLOCK` flags — **rendering/markup can differ by flag; verify against our target release.**

**Ulmo (Dec 2025/Jan 2026):** **Course Home Carousel** (resume exactly where you left off — directly relevant to our immersive player) · Content Libraries reusable course sections with sync preview · **LTI reusable configurations** (central LTI Store) · Mobile: course home as hub, "Videos" tab replaced by **"Content" tab**, Progress page added.

**No new learner-facing component types in Sumac, Teak or Ulmo.** The taxonomy is stable; churn is in libraries, tagging, permissions and the MFE shell.

## 11. Naming conventions

No formal edX "topic type" standard. What is documented:
- **Front-load names** — "putting the important information first in the name… particularly helps screen reader users."
- Display names feed the content search index and Progress/Outline views.
- Practical edX convention: Sections = weeks ("Week 3: Regression"), Subsections = topics/assignments ("3.2 Multiple Regression", "Homework 3"), Units prefixed with type ("Video: Least Squares", "Reading: Chapter 4") — **this is what our courses do**.
- Grading label comes from the **subsection assignment type**, not the name.
- **Modern alternative: tagging/taxonomy (Sumac+)** to attach a machine-readable topic-type tag to units. Cleanest path for our player.
