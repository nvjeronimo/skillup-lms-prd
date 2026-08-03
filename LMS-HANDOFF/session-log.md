# Session Log — meetings, demos and where decisions came from

*Companion to the decision records. The specs say **what** we decided; this says **who said it, when, and how sure they were.***

Every entry: date, who was in the room, what was established, and — where it matters — a verbatim quote. Claims are tagged so a reader can tell a demonstrated fact from an opinion offered in passing:

| Tag | Meaning |
|---|---|
| **CONFIRMED** | Demonstrated live, or stated by the person who owns that system |
| **ASSERTED** | Stated confidently but not demonstrated, and not independently verified |
| **CONFLICT** | Contradicts another source we hold — resolve before building |
| **UNVERIFIED** | Nobody in the room knew; an action exists to find out |

---

## 2026-07-30 · Quiz capabilities walkthrough (Studio demo)

**Present:** Nilesh Dabhi (SkillUp tech), Simran Jindal (LMS/Studio owner — demoed), Nelson Jerónimo.
**Format:** 16 min, screen-share of Studio (the LMS back end). Recording + transcript in `30-07 meetings/`.
**Why it happened:** closes workshop action 4 (29 Jul) — *"determine all quiz question types supported in the platform"*, routed through Rashid/Nilesh.

### The question types that actually exist — CONFIRMED

Simran walked the `problem` component picker in Studio. This is the definitive list we were waiting for.

| Type | Use | How much it is used |
|---|---|---|
| **Multiple choice** | one correct answer | *"most of the time, 90%… we make use of this multiple choice option"* |
| **Checkbox** | more than one correct answer | second most common |
| **Multiple choice with hints and feedback** | as above, plus a **hint** on a wrong selection and a **feedback** message explaining why an answer is right or wrong | **actively being adopted now** |
| **Checkboxes with hints and feedback** | multi-answer version of the above | as above |
| **Dropdown** | short, numeric or one-word answers | *"used very rarely"* |
| **Numerical input** | learner types a value, matched against a backend solution | rare |
| **Staff graded points** | **not a quiz type** — file submissions graded by hand | assignments only |

Two things worth keeping:

- **Why hints and feedback are being adopted.** Simran: *"a learner used to submit it in case all the attempts are completed and the learner does not know, you know, which is the correct answer… they can at least understand why my submission was wrong and what I should have done."* This is a pedagogical fix, not decoration — it should not be treated as an optional nicety in our design.
- **Why dropdown is avoided.** *"the look that comes in at MCQ gives them more feeling of a quiz rather than putting it in a drop-down manner."* A deliberate authoring preference, not a platform limit.

### Navigation between questions — CONFIRMED open, restriction UNVERIFIED

- Learners may **skip questions and move freely**. Simran: *"we don't have this functionality wherein the next question will appear only after we submit the first question."* Asked directly whether a learner on question 2 of 5 can skip: *"Yeah, you can."*
- Asked whether skipping could be **restricted**, Simran: *"We have to look into that because we have never done that. But I think we should have that functionality wherein we can restrict them."* Nilesh summarised it to Nelson as *"possible, but we have to look it up."*

> **⚠︎ CONFLICT — do not plan against this yet.** Our own platform research (`quizzes/04-quiz-experience-spec.md` §8, verified against `edx-platform` and `frontend-app-learning` source) found that **restricting navigation between questions is not configurable at any level** in stock Open edX — not per quiz, per type, per course or per problem. The vendor team believes it may be possible but has never done it; that is an untested belief, not a capability. Nelson now has dev-environment access — verify there before either side plans on it.

### Timers and attempts — CONFIRMED

- A quiz **can be timed**. If it is, the learner must finish in one sitting: when the timer expires the quiz is **auto-submitted** and unfinished questions can no longer be opened.
- **Attempts are configurable per quiz.**
- **There is no "unlimited" setting.** Simran: *"there's no option of unlimited, but you have to give some limit. If you want to keep it unlimited, you can keep it like 10, 20 or maybe 100. That automatically becomes unlimited."*
- **If no number is set on a timed exam, the default is one attempt.**

> **Design consequence:** any screen of ours that says *"Unlimited retakes"* is describing something the platform cannot express. It should render the real number the backend returns. See the plan.

### Leaving a quiz and coming back — CONFIRMED for position, UNVERIFIED for answers

Nelson asked whether a learner can leave mid-quiz (to check a lesson) and return to the same place. Simran: on an **untimed** quiz, *"any number of times you can navigate from one place, one section to another section and come back and answer the question"*; on a **timed** quiz, no.

> **⚠︎ This answers a different question than the one that matters.** It confirms the learner can *return to the quiz*. It does not establish whether an **unsubmitted selection** survives. Our source research found it does not: with unlimited attempts there is no Save button at all, and unsubmitted input lives only in the unit's iframe DOM. **Verify in the dev environment.** If confirmed, our shell must hold that state itself — see `quizzes/04-quiz-experience-spec.md` §8.3.

### Linking from a quiz to course content — CONFIRMED not possible

Nelson asked whether a CTA could take the learner from a question — or from its feedback — straight to the relevant module.

- Simran: *"linking is not possible… You'll have to open the content outline and from there you can select whichever mode you want to open."*
- Confirmed again for feedback specifically (Nilesh asked): *"No, correct, we cannot."*
- The workaround offered is textual only: *"you can mention that you can go and review module 3 of the course… but we cannot link it from there."*

> **Read this precisely — it is narrower than it sounds.** The limit is on **content authored inside the problem block**: an author cannot put a working link in a question or in feedback text. It says nothing about **our shell**, which renders its own chrome and knows which subsection the quiz belongs to. Our "Review module first" button is therefore still buildable — but it must be **resolved by the shell from course structure**, never authored into feedback. Recorded so nobody reads this as "the design is impossible".

### Actions

| Action | Owner |
|---|---|
| Enrol Nelson in a dev-environment course containing multiple quiz types (Simran suggested the Microsoft courses — a quiz in every module) | Nilesh / Simran |
| Create a dev-environment account | Nelson |
| Recheck the edX documentation on linking to topics from quizzes; share if anything is found | Nelson |

---

## 2026-07-30 · Course Page metadata request

**Present:** Nilesh Dabhi, Nelson Jerónimo. ~6 min. Transcript in `30-07 meetings/`.
**Outcome:** Jira **[SK-11378](https://skilluptech.atlassian.net/browse/SK-11378)** — *"Share Course Page metadata, API response, and feature details for redesign initiative"*.

This is the blocker on the Course Details page: we cannot finish designing against data we have not seen.

### What was requested

Nilesh drove the scope; it is broader than the metadata list the workshop asked for:

1. **Metadata / data elements** — every field on the page, with name, description, data source, mandatory vs optional, and any conditional display logic.
2. **API information** — which APIs the Course Page uses, sample request/response payloads, field-to-UI mapping, dependencies, caching and performance considerations.
3. **Feature inventory** — existing features, user actions, navigation and redirection behaviour, enrolment-related functionality, progress-tracking components, content-consumption features, role-based visibility (instructor / admin / learner).
4. **Supporting information** — current page flow, business rules, known limitations and constraints, technical documentation.

**Nelson also asked for a course-structure export from Studio** — the syllabus and everything else learner-facing — so the team can analyse real content rather than infer it. Format: **Excel preferred**, another export format acceptable.

On whether technical documentation was needed, Nelson: *"if we need to deal with the functionalities, for example if a course depends on something or is conditional, maybe yes… it's always best to have."* Nilesh flagged the docs are old and may not exist.

### Ticket state and timing

| | |
|---|---|
| **Ticket** | SK-11378 · Priority **Critical** · Sprint SK Sprint 111 · Ready For Development |
| **Reporter / Assignee** | Nilesh Dabhi / Chitteti Amara Raju |
| **Nature** | Information-gathering only — *"No functional changes are required as part of this task"* |
| **Acceptance criteria** | None set |
| **Expected** | Tuesday or Wednesday. The developer has only the 31st and the 3rd; the sprint ends on the 4th |

Nilesh was candid that the data is not sitting anywhere ready: *"they have to dig up… they have to cross-check with many things."* Treat the date as a best effort.

**Dependency stated by Nelson:** the Course Page is meant to ship **alongside the quiz**, so the quiz timeline depends on this data arriving.

> **Risk worth naming:** the ticket has **no acceptance criteria** and asks four different teams' worth of material from one developer with two days. The most likely outcome is a partial answer. The metadata/data-elements section (item 1) is the part that actually unblocks the design — if only one section arrives, it should be that one.

---

## 2026-07-29 · ICP design workshop

**Present:** Navdeep Malhotra, Harpreet Kaur, Nelson Jerónimo. ~1h47.

Full record, verified line by line against the recording, in **`topic-types-inventory.md` §8**. Summary of what it settled:

- **Quiz:** no platform-generated A/B/C prefixes (they break randomisation); the Disabled state dims the control, never the row; quiz metadata renders only when the backend supplies it; "View submission" and "See feedback" are the same tertiary button; no em dashes in interface copy.
- **Course Details:** self-paced only for the MVP; syllabus to topic level in an accordion matching the ICP; no module-level completion %; no separate syllabus page; course-level resources and assignment deadlines excluded until defined.
- **Governance:** only Video is signed off. Developers had already started on quiz and reading — the fix agreed was a clearly separated ready-for-delivery area.
- **Known divergence:** the workshop kept the tab mechanism on Course Details with Resources and Grade as phase two. The current v9 frame is a single page, deliberately, and needs agreeing at review.

---

---

## 2026-08-03 · Dev-environment verification — AZ-204, Module 1 Knowledge Check

First hands-on look at a real quiz in `apps-dev.skillup.online` (course `SKOAZ204EEP+2024_b1`, 28 modules, archived). Everything below is **observed**, not inferred.

### CONFIRMED — an unsubmitted answer is lost on navigation

The verification that had been open since the navigation research. Method: selected a radio on question 1 without submitting, navigated to the course home, returned to the same unit. **The selection was gone**, and the counter still read *"You have used 0 of 2 attempts"* — so nothing had been submitted and nothing was retained.

This closes it: **the shell must hold unsubmitted state itself.** The platform does not, and on this configuration there is not even a Save button to click.

### CONFIRMED — attempts are per question, in their real content

Each question carries its own *"You have used 0 of 2 attempts"*. The "2 attempts" we had been describing as quiz-level is, in their authored courses, **two attempts on each individual question**. Empirical confirmation of the correction already made to the spec.

### CONFIRMED — the unit renders in a cross-origin iframe

`devcourses.skillup.online/xblock/…` embedded inside `apps-dev.skillup.online`. Page scripts cannot read into it. This is the architecture the audit describes, and it is why the hybrid integration was chosen.

### CONFIRMED — quizzes are authored as one unit with every question stacked

The Module 1 "Knowledge Check (5 Questions)" is a **single unit** containing five independent problem blocks, each with its own display name, its own Submit, its own attempts counter and its own Show answer link. There is no stepper and no quiz-level submit.

This is the concrete cost behind the stepper decision: adopting one question per unit means **re-authoring every existing quiz in Studio**, not changing a setting.

### ⚠︎ CONFLICT — Show answer is available before any attempt

The **Show answer** link is present on a question with zero attempts used. So `showanswer` is configured permissively on this content — a learner can reveal the correct answer without trying.

That directly contradicts the rule we adopted (*hint while attempts remain, reveal only once they are spent*). Either their configuration changes, or our design is describing a behaviour their courses do not have. **Needs raising** — it is a content-configuration decision, not a design one.

### ⚠︎ The whole course is one question type — and it reorders our priorities

Audited **all 48 problem blocks** in the course through the blocks API and the rendered XBlock HTML, not by sampling:

| | Count |
|---|---|
| Single select (`choicegroup`) | **48** |
| Multi select (`checkboxgroup`) | **0** |
| Dropdown (`optioninput`) | **0** |
| Numerical / text (`textline`) | **0** |
| Demand hints | **0** |
| `<solution>` explanation block | **0** |
| Per-answer feedback (`choicehint`) | **0** |
| Maximum Attempts | **2 on every one of the 48** |

Every problem also carries the identical display name, *"Choose the correct option(s)"*.

**This qualifies what the vendor told us on 30 Jul.** Simran said multiple choice was around 90% with checkbox second, and that hints and feedback were "being adopted now". In this course multiple choice is **100%**, checkbox is absent, and there is not a single hint, explanation or per-answer feedback anywhere in 48 questions.

Consequences worth acting on:

- **Our feedback design has no content to render.** The Correct and Incorrect states lean on an explanation block and per-choice feedback that this course does not author. Either the content changes or those surfaces sit empty.
- **The Hint state we built has nothing to fill it.** It stays in the DS — it is what the platform supports and what the vendor says they are adopting — but it drops down the priority order until a course actually uses one.
- **Dropdown, numerical and text can wait.** Zero usage here. Keep the components, stop treating them as near-term.
- **Multi select is the one to protect.** The four row states (Missed, Correctly unselected, Partially correct) are unused in this course but are the states most likely to be got wrong when someone finally authors a checkbox question.

> **Scope of this claim:** one course, audited exhaustively. Repeated across the live catalogue below.

---

## 2026-08-03 · Full catalogue audit — live platform

Repeated the audit on every course the account is enrolled in on `courses.skillup.online`. **215 questions across four courses**, every one fetched and inspected — not sampled.

| Course | Questions | Single select | Multi select | Dropdown | Numerical / text | Hints | Explanation | Per-answer feedback |
|---|---|---|---|---|---|---|---|---|
| AZ-204 *(dev)* | 48 | **48** | 0 | 0 | 0 | 0 | 0 | 0 |
| Foundations of AI in Healthcare · SKOAIH01 | 58 | **58** | 0 | 0 | 0 | 0 | 0 | 0 |
| Machine Learning for Medical Data · SKOAIH02 | 58 | **58** | 0 | 0 | 0 | 0 | 0 | 0 |
| AI Technologies in Healthcare · SKOAIH03 | 51 | **51** | 0 | 0 | 0 | 0 | 0 | 0 |
| **Total** | **215** | **215** | **0** | **0** | **0** | **0** | **0** | **0** |

Two further courses — *Artificial Intelligence Fundamentals* (IBM AI0101EN) and *Prompt Engineering for Everyone* (IBM AI0117EN) — contain **no problem blocks at all**: 79 and 18 units respectively, with no assessment in the LMS.

### This is now conclusive, not indicative

Every question in every course we can see is a **single-select multiple choice**. There is not one checkbox, dropdown, numerical or text input in the catalogue, and not a single hint, explanation or per-answer feedback message.

### What the healthcare courses do have that AZ-204 lacks

The three SkillUp courses are better structured, and they confirm the model we designed to:

- **Real assignment types** — three subsections graded as *Graded Quiz* and one as *Final Exam* in each course. The practice / graded / final split we designed is genuine.
- **The attempts split matches it exactly.** In each course, **31 questions carry 2 attempts** (the graded and final ones) and the remainder carry **no limit** (the practice ones — 27, 27 and 20). So *unlimited on practice, two on graded* is real authored behaviour, and our entry-header pills are correct.
- **Questions are named "Question 1…10"** rather than AZ-204's generic *"Choose the correct option(s)"* repeated 48 times.
- **Composite types exist:** each course has one `openassessment` (the Final Project) and two to six `scorm` blocks — so ORA and Activity are in real use, unlike the exotic question types.

### What this settles, and what it does not

**Settled:** the question-type work is done. Multiple choice is not "90%", it is everything. Dropdown, numerical and text are not near-term; they are hypothetical.

**Not settled, and now more pressing:** our feedback design assumes an explanation block and per-choice feedback that **no course authors**. A learner who answers wrong today gets a red mark and nothing else. That is either a content gap the team intends to close, or a design assumption we should drop — and it is the single most valuable question to put to them.

### Authoring observations worth passing to the content team

- Every problem's display name is the generic **"Choose the correct option(s)"**, rendered as a heading above the actual question. Our design promotes the question itself to heading, which reads better and removes a redundant line.
- All five questions are **single-select radios**, yet the heading says "option(s)". The plural is misleading where only one answer is possible.
- Questions are numbered **inside the authored text** ("1.", "2."). The platform does not number them, so any renumbering after a reorder is manual and will drift.
- **No A/B/C prefixes on the options** — their content already matches the decision we took, which is a good sign for the prefix removal.

---

## 2026-08-03 · SK-11378 delivered — Course Page metadata

The ticket raised with Nilesh on 30 Jul arrived as `_media/Course_metadata.xlsx`: 73 fields, eight endpoints
with real payloads, 33 features and a role-based visibility matrix. The risk flagged when it was raised — one
developer, two days, four teams' worth of material, no acceptance criteria — did not materialise. **All four
sections came back**, and the payloads are from a real course (`SkillUp+SQL-TMDA+2025_B13`), not invented.

Full element-by-element mapping in [course-details-metadata-map.md](course-details-metadata-map.md). What it
changes:

### CONFIRMED — the tab list, and it is not the one the workshop expected

`tabs[]` returns exactly five: **Course, Progress, Dates, Mentorship Q&A, Instructor**. No Resources tab, no
Grades tab, **no Certificates tab** — grades are inside Progress, and the certificate is a card (`cert_data`).
Navdeep wanted the list confirmed with the edX team (01:32:08); this is that confirmation, and it contradicts
the expectation of Grades and Certificates as two tabs. The v9 frame's flagged "no tabs" divergence can now be
settled against real data rather than argued.

### CONFIRMED — Resume vs Start

`resume_course: {has_visited_course, url}`. Closes the workshop's open question (01:28:07) with a flag we
render directly.

### ⚠︎ Three things on the frame have no data behind them

- **The unlock tooltip.** Open action 8 asked which unlocking rules the API exposes. Answer: a boolean
  (`accessible`) and a block type (`lock`). **No date, no prerequisite, no rule text** in any of the 73 fields.
  *"Unlocks 28 Apr 2026"* cannot be produced.
- **"What you'll learn".** The workshop ruled it must be a mapped edX field (01:30:39). **There is no such
  field** on any of the eight endpoints.
- **The mentor card.** No mentor, instructor or staff-profile field exists. The `instructor` tab is the edX
  admin dashboard, not a profile.

Also unsourced, as expected: the course image (confirms 01:28:54) and the partner logo — `org` is `"SkillUp"`,
not a brand.

### ⚠︎ Every duration on the page is null

`effort_time`, `effort_activities` and `due` are **null on every block in every payload**. The fields exist;
nobody authors them. Navdeep overruled dropping the per-topic times, so the design stands — but the action
sits with the content team, alongside the quiz re-authoring.

### ⚠︎ Our three levels are not their three levels

chapter → sequential → vertical is **not** Module → Lesson → Topic. In the real course every module's
sequentials are the same three buckets — *About*, *Lessons*, *Knowledge Check* — and the teaching content is
one level below, in the verticals. Rendered literally our accordion reads *Module 1 → Lessons → 15 topics*
with two dead rows above it. The workshop's own fallback covers it (*Module → Topic where a lesson does not
exist*, 01:02:14), but it has to be decided before the syllabus is built.

Two further structural notes: the topic level is **not in the Outline API at all** (every sequential returns
`children: []`) — it needs a second call to the Navigation API, where `lms_web_url` is null on verticals, so
topic deep-links must be constructed rather than read. And `icon`, the only type signal, has a four-value
vocabulary against our ten topic types and returns only `other` in practice.

### The sample course is instructor-paced

`is_self_paced: false`, plus `Session Recordings` and `Session Material` chapters. Harpreet's
self-paced-only ruling for the MVP (01:22:22) stands, but the one real course we have been given is VILT.

### What we can now drop with evidence

`verified_mode: null`, `can_show_upgrade_sock: false`, `access_expiration: null`, `offer: null`. The upgrade
sock, discount banner, expiration warning and ID-verification status are consumer-marketplace furniture that
SkillUp's B2B configuration does not use. Out of phase 1 by observation, not assumption.

### What the API offers that we never designed

Welcome message banner (with a dismiss endpoint), **handouts** — which is what "course-level resources"
actually turns out to be, the thing nobody could define at the workshop (01:19:44) — certificate card, dates
widget, course tools (**Bookmarks** is in the live response), content search, weekly learning goal, and the
ended/enrol/missed-deadline banners.

---

## Open questions with the vendor

### Sent Aug 3, 2026 · quiz reset and attempts configuration

**Why it is being asked.** We established from source that neither "retry only the incorrect questions" nor "retake the whole quiz" exists as an Open edX feature — but they are not equally far from it. Attempts are counted **per problem**, so re-answering only the wrong ones is essentially the platform's native behaviour; what is missing is a UI that collects them. A *full* retake is the invented one: there is no subsection attempt object, and `reset_problem()` explicitly does not refund a spent attempt.

That settles the capability question. What it does not settle is whether a full retake is **reachable in their content**, which depends on two configuration choices only they can answer:

1. Is **Show Reset Button** enabled on quiz problems in their courses?
2. What **Maximum Attempts** do they set per problem?

If Reset is off, `Retake quiz` cannot be built without backend work, and the design decision makes itself.

**Status:** awaiting reply. Blocks the `Retake quiz` action on `LMS / Quiz · Results`; does not block `Retry incorrect`, which is already built.

---

## Where the resulting work is tracked

The actions from these sessions live as a **checklist in Figma**, on the ICP page inside section `04 · Quiz — the three types`, named **`Quiz — worklist`**. Four groups: decided and applied, to build, verify in the dev environment, waiting on someone else. Each row is an instance of a local `Worklist checkbox` component, so ticking one is a variant switch in the properties panel rather than a restyle.

Keep it in step with this log: if an item is ticked because a session settled it, the session belongs here too.

---

## How to add to this log

One section per session, newest first within its date. Include who was actually in the room, tag every capability claim, and quote anything that will be argued about later. If a session contradicts something we already hold, say so **in the entry** rather than quietly updating the other document — the contradiction is the useful part.
