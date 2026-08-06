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

## 2026-08-03 · SK-11378 handover call — and the VILT tabs that were missing

**Present:** Nilesh Dabhi, Chitteti Amara Raju, Nelson Jerónimo.
*Source: AI-generated meeting notes, not verified against a recording. Two transcription slips worth
knowing: "post page" is the **course page**, "VLT" is **VILT**, "JITA" is **Jira**.*

Nilesh walked through what Raju had compiled against SK-11378 — metadata, API information, features and
role-based access, across the four tabs — and Nelson confirmed the file was downloaded and already being
matched against the design.

### CONFIRMED — two tabs are missing, and are being added

Nilesh flagged that Raju had worked from older templates and left out the **live** and **recordings** tabs.
Chitteti committed to adding both **from row 84 onwards**, alongside the existing outline, dates and progress
sections, **by 4 Aug**, and to tag Nelson when the file is reissued. The ticket closes on that.

> **This is the gap our own audit had just found, closing before we asked.** Searching all eight delivered
> payloads for `session`, `recording`, `attendance`, `live` and `join` returns **nothing** — while the one
> real course in the workbook is instructor-paced and carries `Session Recordings` and `Session Material`
> chapters. It was about to go out as the largest open ask; it is now in flight instead.

### Guidance for the interim — CONFIRMED

Nilesh: use the file as delivered for **self-paced** courses; the two new tabs are specifically for the VILT
flows. That matches the MVP scope (self-paced only, Harpreet 29 Jul) — but it also confirms the two are
genuinely different data shapes, not one with optional fields.

### Process — CONFIRMED

Further requirements are handled by **raising new tasks against Raju**. So the open asks in
[course-details-metadata-map.md](course-details-metadata-map.md) §11 have a route: one task each, not a
second omnibus ticket like SK-11378.

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

## 2026-08-04 · Quiz audit walkthrough with Simran

**Present:** Nelson Jerónimo, Simran Jindal, Mohammad Rashid (left early), Janvi Soni. ~23 min. Recording and transcript in `30-07 meetings/Quiz Audit Walkthrough/`. Verified against the transcript, not the AI notes.

Nelson walked the audit findings question by question. Most of Groups A and B are now answered; Group C is with Simran to test.

### ANSWERED — Reset is enabled, and it is per question

> *"this is question by question. So when we select the option and submit it, and sometimes it's the wrong option… then this reset button appears wherein you can reset and do the second attempt if you have for that specific question. **The whole quiz will not be reset**."* — Simran, 00:02:38

This closes the question we were about to send. **Reset is on, it appears after submitting, and it consumes nothing** — it lets the learner retry that question using an attempt they still have.

**Design consequence, and it is a good one:** *Retry incorrect* is not an invention at all. It is a UI over exactly what Reset already does, question by question. *Retake quiz* remains unbuildable — there is still no way to reset a whole quiz or refund attempts.

### RESOLVED — the Show answer conflict was not a conflict

> *"it's a question-wise functionality… this is enabled when we create any quiz which is **not graded**"* … *"in any quiz which is graded as well, **after the number of attempts that are completed** by the learner and still they have not got the right answer, then the show answer option will appear."* — Simran, 00:04:51 and 00:05:28

So the rule differs by quiz type, and **our design rule was right for the graded path**: reveal only once attempts are spent. On practice quizzes it is deliberately available from the start, which is a defensible pedagogical choice for ungraded self-checks.

What we saw in the AZ-204 audit — Show answer present with zero attempts used — is the *practice* configuration, not a contradiction. **Our design should follow the same split**: free on practice, attempts-exhausted on graded.

### ⚠︎ DEFECT — Submit stays disabled until Show answer is clicked

Nelson demonstrated it live: selecting an option did not enable Submit; the question only became submittable after using Show answer.

> *"That should not have happened… there can be some issue from backend, which we might have to check. **The submit button should work whenever you click any option**."* — Simran, 00:06:30 and 00:08:33

Dev environment (confirmed by Mohammad). Simran has the URL and is investigating.

**We hit this ourselves during the catalogue audit and did not flag it** — the Submit button read as greyed after selecting a radio. Worth remembering as a reason to report oddities rather than assume they are intended.

### CONFIRMED — question types, with the vendor's own number

> *"maybe in **5% of the courses**"* for multi-select; the others *"very rarely used"*, and *"for past few months, **none of these options are in use**."* — Simran, 00:10:04

Consistent with our audit finding of zero across four courses. Nelson's position, stated in the meeting: *"if you just have one, we need to have the component design as well"* — so the variants stay in the DS, they simply stop being near-term.

### CONFIRMED — feedback and explanations are coming, and there is an example

> *"in the old courses you won't find this functionality. But the new courses that are being created and getting live on our platform, we are trying to get this functionality put into place… If it's a quiz of even five questions or two questions, we see if this feedback and explanation come into play."* — Simran, 00:11:22

**Simran is sharing an example course.** That unblocks the biggest open item: we have never seen a real authored feedback or explanation, so we have been designing that surface blind.

### CONFIRMED — why attempts cannot be quiz-level

The causal explanation we had inferred from source, now stated by the person who configures it:

> *"we don't have any functionality wherein you just select the answers and do a **final submission of the complete quiz in one go**, because of which **we cannot restrict the attempts quiz-wise**."* — Simran, 00:12:58

No quiz-level submit, therefore no quiz-level attempts. The only quiz-wide control is the timer: *"the timer starts as and when you click on the start page"*, and the learner must finish every question inside it.

### CONFIRMED — graded vs final, and no gating at all

- **Graded quiz** = module level, after a module. **Final** = the whole course. *"The configuration is same"* — only the scope of knowledge differs.
- **Nothing is locked.** *"These are all open. Once the learner is enrolled into the course… if they have the knowledge of that course and directly want to open the final quiz, they can."* — 00:14:58

> **This affects a screen we built.** The `Gate · Prerequisite` state assumes quizzes can be locked behind completion. On this platform they are not — quizzes are open from enrolment. Keep the component (the platform supports gating; nobody uses it) but stop treating it as a state our learners will meet.

### ⚠︎ SCOPE — the results screen does not exist, and would be a build

The most consequential outcome. Nelson showed our results design; Simran was unambiguous:

> *"once we submit it, the result is **not showing up on that page**. In order to see what's your score or how many correct answers you have got, you will have to **open the progress tab** of the course."* — 00:19:04
> *"this is something we don't have that we can show up on our platform. There's something we'll have to **get it built up from a dev team** if there's a possibility."* — 00:21:49

She supports it: *"it's a good add-on… from a learner perspective, there's something they look into after submission, how much correct answer I came up with, how much are wrong."*

**So our entire results screen — score, verdict, retry — is net-new development, not a re-skin.** Today the learner submits and sees nothing; results live on the Progress tab as *"6 out of 7"* per quiz, with weightings (graded 60%, final 40%) rolling into the course grade.

Nelson to take feasibility and cost to Navdeep and the dev team.

### Still open — Group C, with Simran

| Question | Owner |
|---|---|
| Does sequence navigation give a working stepper with one question per unit? | Simran — testing, *"we have not tried this functionality"* (00:00:58) |
| How does Reset behave once sequence navigation is on? | Simran — *"it needs to be tested"* (00:03:56) |
| Why is Submit disabled until Show answer is clicked? | Simran — has the URL |
| Share a course with feedback and explanations | Simran |
| Is an immediate results screen feasible, and what does it cost? | Nelson → Navdeep + dev team |

---

## 2026-08-05 · Simran's follow-up — three things, and one of them changes a finding

Messages from Simran, 06:30–06:47. Two course links and a resolution.

### RESOLVED — the Submit defect was not a defect

> *"The course end date had passed because of which submit button was showing disabled. I have changed the
> date to a future date now."* — Simran

**The source agrees exactly, and we had already read the code that explains it without connecting it:**

- `close_date` (`capa_block.py:793`) = `self.due or self.course_end_date`. With no due date on the problem,
  **the course end date closes submissions.**
- `is_past_due()` (1429) = now > `close_date`
- `closed()` (1435) = `used_all_attempts() or is_past_due()`
- and `closed()` disables Submit, hides Reset (1038) and hides Save (1085)

So the behaviour was correct. **What the platform does not do is say why** — the button simply greys out,
with no message and no date. That silence is the design gap, not the disabling.

**Two corrections follow, both applied:**

1. The board carried a red `DEFECT` callout claiming a platform bug. It now reads **NOT A DEFECT —
   RESOLVED**, and explains the real mechanism.
2. **The screenshot in column A is of an ended course.** A greyed Submit beside "0 of 2 attempts" is the
   past-due state, not the ordinary one. The evidence caption says so now — otherwise the whole column
   documents an edge case while claiming to document the norm.

**And a lesson worth keeping.** We had `closed()` in our notes since 4 Aug and still wrote "defect" on the
board. Reading a mechanism is not the same as recognising it in the wild.

### ⚠︎ MAJOR CORRECTION — three of our findings were artefacts of an ended course

After Simran moved the AZ-204 end date forward (now `2026-08-31`, verified via
`/api/enrollment/v1/course/`), the same problems were re-read through `/xblock/{id}`. The buttons actually
rendered on a graded question, with the course **open**:

```
save problem-action-btn btn-link btn-small     ← Save
submit btn-brand                               ← Submit
btn … notification-btn review-btn sr           ← screen-reader only
```

Compared with the screenshot taken while the course was **closed**:

| | Screenshot (ended) | Live (open) |
|---|---|---|
| Submit | disabled | **enabled** |
| Save | absent | **present** |
| Show answer | present | **absent** |
| Reset | absent | absent — needs a submission first |

**All three differences have the same cause**, and the source predicted every one:

1. **Submit** — `closed()` disables it. Already recorded above.
2. **Save** — `should_show_save_button()` returns `False` when closed (line 1085). This also **retracts** the
   question we raised on 4 Aug: we said Save ought to be showing and was not, and proposed asking the vendor.
   It was not showing because the course had ended. **No vendor question needed.** Save is present, enabled,
   and stores an answer without spending an attempt.
3. **Show answer** — `showanswer` is left at the platform default **`finished`**, which is
   `closed() or is_correct()`. Ending the course satisfied `closed()`, so **every answer was revealed**. On
   the open course, Show answer is not offered at all before attempts are spent.

> **This supersedes the 3 Aug "CONFLICT — Show answer is available before any attempt" and the 4 Aug
> resolution of it.** Neither was right. It was not a practice configuration, and it was not a deliberate
> graded/non-graded split. Their graded quizzes simply sit on the default, and the default happens to reveal
> everything once a course ends. Simran's account is still correct about the *attempts* path — `closed()` is
> also true once all attempts are used — but nobody chose this rule.

**A caution worth keeping.** We audited a closed course for two days and drew behavioural conclusions from
it. The state was legible in the API the whole time; we simply never checked whether the course was still
running before treating what we saw as normal. **Check the course is open before reading anything from it.**

**Also observed, and it explains Simran's Reset account:** no reset button is rendered on any unsubmitted
problem, consistent with `show_reset_button` defaulting to off. But `should_show_reset_button()` returns
`True` for a **randomised** problem once submitted, and answer shuffling is on in their courses. So the Reset
they see almost certainly comes from randomisation, not from the setting. Not verified — confirming it would
mean submitting an answer and spending one of Nelson's two attempts.

**Still true and unchanged:** no authored `choicehint` content, no `<solution>` block, one `choicegroup` per
problem, 2 attempts, single-select throughout.

### ✅ CONFIRMED — one Submit for a whole quiz is real, and it is authoring

Audited both courses on 5 Aug once access was granted. **The two courses use two different authoring models,
which is exactly the choice we have been arguing about without knowing it had a name.**

| | SKOAIFP01 — *AI-Powered Financial Analysis* | SKOADM01EN — *Digital Marketing* |
|---|---|---|
| `problem` blocks in the course | **4** — one per quiz | **10** — one per question |
| Questions inside a block | **10** | 1 |
| Submit | **one for the whole quiz** | one per question |
| Attempts | **3, for all ten questions together** | 2, per question |
| Save | present on graded, absent on practice | present |
| Multi-select | **yes**, in the practice quiz | no |

**How it works.** A CAPA `problem` may contain many response elements. Author ten questions inside one
`<problem>` and the platform renders ten `<legend>` groups, ten radio groups — and **one** Submit, **one**
Save, **one** attempts counter, one score. Verified by reading the rendered block: ten real question stems,
one `submit btn-brand`, and *"You have used 0 of 3 attempts"* covering all of them.

> **This corrects a claim we have been making since July and had on the board as a hard limit.** "There is no
> single Submit for a whole quiz" is true of the *subsection* — `seq_block.py` genuinely has no submit
> handler, and that part stands. It is **not** true of a quiz as a learner experiences it. The UX we said
> would need custom development is already in production on a real course, and it cost authoring, not code.

**The trade-off, and it is a real one — you pick one model or the other:**

| | One problem per question | All questions in one problem |
|---|---|---|
| Submit | per question | **one for the quiz** |
| Attempts | per question — 2 each | **pooled — 3 at the whole set** |
| Feedback timing | immediate, per question | all at once, after the single submit |
| Reset | affects one question | affects the whole quiz |
| Score | per question | one score for the set |

Neither is strictly better. Pooled attempts are what most people *think* a quiz does, and what Nelson asked
about on 3 Aug — *"os attempts é o quiz todo no geral?"*. The answer then was no. The answer now is: **yes, if
the quiz is authored as one problem.**

**Still open — the explanations.** SKOADM01EN is the course Simran flagged for the explanation functionality,
but `<solution>` and `choicehint` content is **not sent to the client before submitting**; the rendered block
carries only an empty `notification-show-answer is-hidden` container. Seeing a real authored explanation
requires submitting an answer, which spends one of two attempts on Nelson's own record. Not done without
asking. The practice quizzes in SKOAIFP01 have unlimited attempts and would be a free place to test.

### ✅ FOUND — the first real authored explanation, and how it renders

Submitted Question 1 of SKOADM01EN. Answered wrongly first, then reset and answered correctly, so the
question ends **correct** on Nelson's record. Two attempts used of two.

**The explanation exists, and it renders inline, immediately, attached to the question:**

```html
<span class="message">
  <div class="feedback-hint-correct">
    <div class="explanation-title">Answer</div>
    <span class="hint-label">Correct: </span>
    <div class="hint-text">The Reach, Act, Convert, and Engage (RACE) framework helps marketers
      evaluate how visibility, interaction, conversion, and ongoing engagement work together to
      support business goals.</div>
  </div>
</span>
```

This is the **"Multiple choice with hints and feedback"** type Simran demonstrated on 30 Jul, now seen with
real content. What matters for the design:

- **It appears on submit, not after attempts run out.** The wrong first attempt also carried an
  `explanation-title` of "Answer" — the same block with the incorrect variant. *(Inferred for the incorrect
  case: the title was captured, the body was not, because the state had moved on before it could be read.)*
- **Structure:** a title ("Answer"), a label ("Correct: " / presumably "Incorrect: "), and the explanation
  body. Three parts, which maps cleanly onto our alert — title, tone, body.
- **Position:** directly under the options, above the action buttons. Where our `LMS / Inline Alert` already
  sits in the Question Card.
- **`showanswer` returns only the correct choice id** — `["choice_1"]` — and no prose. So the explanation is
  authored feedback, not the answer reveal. **These are two different features and we should stop conflating
  them.**

> **This unblocks proposal B2**, which we have been designing blind since the start. The surface exists, the
> shape matches what we drew, and real copy now exists to draw against.

### ⚠︎ BOTH VARIANTS CAPTURED — and the wrong-answer one does not explain anything

Submitted Question 2 of SKOADM01EN with a deliberately wrong option, reading the markup straight out of the
`problem_check` response so nothing could move on before it was captured. The question is left at 1 of 2
attempts, so it can still be answered correctly.

Same three-part structure both times — `explanation-title` / `hint-label` / `hint-text` — but the content
differs in kind, not just in wording:

| Variant | Class | Label | Text |
|---|---|---|---|
| Right answer | `feedback-hint-correct` | `Correct: ` | *"The Reach, Act, Convert, and Engage (RACE) framework helps marketers evaluate how visibility, interaction, conversion, and ongoing engagement work together to support business goals."* |
| Wrong answer | `feedback-hint-incorrect` | `Incorrect: ` | *"Please revisit the “Introduction to Digital Channels” video."* |

> **The learner who gets it right is told why. The learner who gets it wrong is told to go and watch a video.**
> That is backwards: the one who needed the explanation is the one who did not get it.

**Three things follow.**

1. **This is the prose workaround, in production.** On 30 Jul Simran described the only way to point a
   learner at content from feedback: *"you can mention that you can go and review module 3 of the course…
   but we cannot link it from there."* We wrote in `04-quiz-experience-spec.md` §9.5 that authors must not be
   asked to do this, because it goes stale when content is reordered. **It is already being done**, and the
   reference here is a video title in quotation marks with no link.

2. **It qualifies our decision to drop the review action from the question card.** We removed it on the
   grounds that the shell can only resolve the parent module, not the specific lesson — so the label
   overpromised. That reasoning stands. But this shows **authors are already trying to do exactly that, by
   hand, per question**. The need is demonstrated and authored; what is missing is a machine-resolvable way
   to express it. That is a better argument for the affordance than the one we retired it on, and it should
   be revisited rather than left closed.

3. **Do not assume "explanations are being adopted" means explanations.** For wrong answers, in the course
   the vendor named as *the* example of the explanation functionality, it currently means a redirection. Any
   business case for proposal B2 should be built on what the feedback actually says, not on the fact that a
   feedback field is populated.

**Sample size, stated honestly:** two questions, one course. Whether the pattern holds across the other eight
is untested.

### ✅ ALL TEN TESTED — the split is total, 10 out of 10

With permission to test the dev environment fully, every question in SKOADM01EN was submitted and its
feedback captured. **There are no exceptions.**

| Outcome | Questions | What the authored feedback contains |
|---|---|---|
| **Correct** | 1, 3, 6, 8 | A real explanation of the underlying idea |
| **Incorrect** | 2, 4, 5, 7, 9, 10 | *"Please revisit the “…”"* — a named piece of content, never an explanation |

**The four explanations are genuinely good.** They teach the concept rather than restating the answer — for
example on click-through versus conversion: *"A high click-through rate indicates that the advertisement is
attracting interest. A low conversion rate often points to friction in the landing page experience,
messaging, or registration process."* The authoring capability is real and the writing is competent.

**The six redirects name five distinct pieces of content:**

- *"Introduction to Digital Channels"* — video
- *"Session 1: Digital Marketing: Concepts, Evolution, and Growth"* — VILT recording
- *"Session 1: Digital Strategy and Its Components"* — VILT recording *(used twice: Q5 and Q10)*
- *"Session 2: Effective Use of Digital Channels for Growth"* — VILT recording
- *"Session 4: Prompt Engineering for Marketing"* — VILT recording

**Every one is a title in quotation marks with no link.** The learner has to read the name, leave the quiz,
open the outline and find it. And the targets are specific — individual videos and individual VILT sessions,
not modules.

> **This is the strongest evidence we have for a review affordance, and it also shows why the version we
> retired was the wrong shape.** We dropped the per-question review action because our shell can only resolve
> the *parent module*, so the label overpromised. Correct. But the authors are not asking for the module —
> they are naming an individual video or session, per question, by hand. The demand is precise, already
> written into the content, and currently served by prose the learner has to act on manually.
>
> **What is missing is not the button. It is a machine-resolvable way for an author to say which topic to
> revisit.** That is a content-model question, and it belongs on the table with the vendor.

**And it reframes proposal B2 entirely.** "Are explanations worth the authoring cost?" is the wrong question,
because the authoring is already happening. The real one is: **why does the learner who got it wrong receive
a redirect instead of the explanation, when the learner who got it right receives the explanation?** That is
an authoring-guidance problem, not a platform problem, and it costs nothing to fix beyond a house rule.

### 🚨 AND THE REFERENCES DO NOT RESOLVE — four of five are not in the course

Having captured all six redirects, each named target was matched against the course's own block tree
(`/api/courses/v2/blocks/?depth=all`). **Not one matches.**

| Referenced in feedback | In the course? |
|---|---|
| *"Introduction to Digital Channels"* (video) | **Near miss** — the block is `Video: Introduction to Digital Channels (5:16)` |
| *"Session 1: Digital Marketing: Concepts, Evolution, and Growth"* | **Not found** |
| *"Session 1: Digital Strategy and Its Components"* | **Not found** |
| *"Session 2: Effective Use of Digital Channels for Growth"* | **Not found** |
| *"Session 4: Prompt Engineering for Marketing"* | **Not found** |

**No block anywhere in the course contains the word "Session".** The course holds 6 videos, none named
`Session N`; its subsections are `Lesson 1` / `Lesson 2` per module.

*Stated carefully:* VILT sessions are live instructor-led events, so those recordings may well be delivered
outside this course's content tree — a programme-level surface, or a separate system. What is certain is that
**a learner who gets the question wrong, reads the instruction and opens the course outline will not find
what it names.** Four times out of six.

And the one that does exist is off by a prefix and a duration suffix, so even exact string matching against
the outline would fail on all five.

> **This is precisely the failure mode we predicted.** `04-quiz-experience-spec.md` §9.5: *"Authors must not
> be asked to write 'go and review module 3' into feedback as a substitute; that produces prose that goes
> stale when content is reordered."* It has not merely gone stale — most of it never resolved.

**It changes what to ask the vendor.** Not *"can feedback contain a link?"* — we know it cannot. The useful
questions are now: why does a wrong answer get a pointer instead of the explanation, and is there any way for
an author to name a topic such that the reference can be checked and resolved rather than typed from memory?

### ✅ CONFIRMED — randomisation is what produces Reset, and it forces a two-step retry

Submitting a second answer without resetting was refused: *"The state of this problem has changed since you
loaded this page. Please refresh your page."* Then `problem_reset` succeeded and the resubmit was accepted.

So this course has **`rerandomize = always`**, which explains every Reset observation at once:

- Reset **appears only after submitting** — `should_show_reset_button()` returns true for a randomised
  problem once submitted, regardless of `show_reset_button` being off. This is exactly Simran's account, and
  it is not the setting anyone assumed.
- **Save disappears after submitting** — `needs_reset` short-circuits it.
- **A retry is two steps, not one:** Reset, then answer, then Submit. A learner who simply picks another
  option and presses Submit is refused.

**Design consequence:** our retry affordance must own both steps. Offering "Try again" that only clears the
form would leave the learner on a refusal message they cannot interpret.

### ✅ TESTED — what the bucket does on submit, and one thing it costs us

Submitted all ten questions of the SKOAIFP01 practice quiz — unlimited attempts, so the test was free —
answering the first option throughout to force a mixture.

- **One verdict for the block:** `success: "incorrect"`.
- **But each question is marked:** 4 `status correct`, 6 `status incorrect`.
- **Score `4/10` — partial credit.** One point per correct question. The block-level "incorrect" is a flag
  meaning *not everything was right*, not the grade.
- Answers revealed in place; one attempt consumed for all ten.
- **No explanations and no per-choice feedback in this course** — that is the other one.

**The cost, and it is a design constraint we did not know about.** The progress API returns
`problem_scores` per *problem*. In the per-question model that is one entry per question — `0/1 0/1 0/1…`.
In the bucket model it is a single entry for the whole quiz — `4/10`. So **a results screen listing each
question can only be built for per-question quizzes.** For a bucket quiz the API knows the total and nothing
else; which question was missed lives in the problem's own rendered state, a much weaker contract. This
qualifies the results-screen plan in `04-quiz-experience-spec.md` §10.4.

### ⚠︎ ASSERTED — one Submit for all questions, by putting them in one bucket

> *"In this we have made use of only **one submit button** by adding all the question in one bucket"*
> — Simran, linking `course-v1:SkillUp+SKOAIFP01+2026` (AI-Powered Financial Analysis)

**If this is what it sounds like, it qualifies a claim we have been making.** We have said there is no
single Submit for a whole quiz — true at the *subsection* level, and verified: `seq_block.py` has no submit
handler. But a single CAPA `problem` block can contain **several response elements**, which would give one
Submit, one attempt counter and one score across all of them. That is not a quiz-level submit; it is many
questions authored as one problem.

**Untested by us.** Needs an audit of the course to confirm the structure and to establish what it costs:
attempts and score would then apply to the whole bucket rather than per question, and partial credit becomes
the mechanism that decides what a half-right bucket is worth.

Affects `04-quiz-experience-spec.md` §1.4 fact 0d (ii) and the hard-limits card in board column C.

### CONFIRMED available — a course using explanations

> *"This course we are using the explanation functionality"* — linking `course-v1:SkillUp+SKOADM01EN+2026_v1`
> (Digital Marketing Fundamentals and the AI Mindset)

This is the example we have been asking for since 4 Aug, and it unblocks the largest item on the board —
proposal B2, the explanation surface we have been designing without ever having seen one authored.

**Both courses still to be audited.** The browser session was not authenticated at the time of writing.

---

## 2026-08-04 · Source verification of the walkthrough answers

**Why.** Simran answers as the person who configures these courses, which makes her answers reliable about *their* platform and unreliable as a statement of what Open edX can do. Six of her answers were taken back to primary source — the `openedx` repositories at `master`, read directly, not documentation summaries. `edx-platform` @ `feb3e3fd`, `frontend-app-learning` @ `db2134c9`, `edx-proctoring`, `completion`, `xblocks-core`.

The distinction that matters throughout: **"the platform cannot do this" vs "they have not configured it this way."** Three of the six are the first; three are the second.

### CONFIRMED as genuine platform limits

**No quiz-level submit.** `xmodule/seq_block.py` exposes exactly two handlers — `get_completion` and `goto_position`. There is no submit handler. Submission lives only on `capa_block.py`, which routes `problem_check` → `submit_problem`. One problem, one submit.

**And *End My Exam* is not one either** — this is the part worth knowing. It ends the *session*, not the answers. `frontend-lib-special-exams/src/data/thunks.js:367` `submitExam()` calls `submitAttempt(attemptId)` and messages the proctoring worker; nothing else. Grepping all of `edx_proctoring/*.py` for `problem_check|capa|xmodule` returns **zero hits** — the proctoring layer never touches problem state. The platform says so to learners in `ReadyToStartProctoredExamInstructions.jsx:62`: if time expires before ending the exam, only answers already submitted are graded. A timed exam is a timer and a lockout, not an aggregate submit.

**No aggregate score on the subsection.** `seq_block.py` grepped for `score|earned|possible|percent` — **zero occurrences of `score`**. `graded` appears twice, both incidental. The `banner_text` mechanism (lines 341–597) serves three purposes only — prerequisite gating, hidden content, hidden special exams — and is not repurposable.

**No per-quiz pass mark as a verdict.** `course_block.py:1288` — `grade_cutoffs` reads `GRADE_CUTOFFS` from the course grading policy; `lowest_passing_grade` is `min()` of those. One policy per course. No pass-mark field on a subsection or a problem. What we already held is correct.

### ⚠︎ THEIR CONFIGURATION — not platform limits

**Show answer has nothing to do with graded.** `showanswer` is an independent per-problem string with twelve values (`class SHOWANSWER`, `capa_block.py:82`), default `finished`. The deciding function `answer_available()` (~line 1473) branches on `showanswer`, staff status, `is_attempted()`, `is_correct()`, `closed()`, `used_all_attempts()` and `attempts` — **the word `graded` does not appear in it**. `graded` is a separate field declared in `modulestore/inheritance.py:36`.

The behaviour Simran described is two chosen values, and the "graded" one is close to just leaving the default alone (`finished` = `closed() or is_correct()`, and `closed()` = `used_all_attempts() or is_past_due()`).

> **The lever nobody mentioned: `showanswer` is inheritable** (`inheritance.py:88`). It can be set on the course, section or subsection and descends to every problem. "Show answer on these terms for this quiz" is **one field on one subsection**, not 215 per-problem edits.

**Prerequisite gating is fully built and switched off.** `course_block.py:959` — `enable_subsection_gating`, Boolean, **default `False`**, display name *"Enable Subsection Prerequisites"*. The API is `openedx/core/lib/gating/api.py`: `add_prerequisite()`, `set_required_content(..., min_score, min_completion)`, `_validate_min_score()` (integer 0–100), `update_milestone()` testing `grade_percentage >= min_score and completion_percentage >= min_completion`. Enforcement is in `seq_block.py` — `_required_prereq()` (line 649), `_compute_is_prereq_met()`, and `descendants_are_gated()`, which guards `render_xblock` against direct-URL access. So it blocks properly, not cosmetically. The Studio UI exists (subsection Configure modal: `isPrereq`, `prereqUsageKey`, `prereqMinScore`, `prereqMinCompletion`).

**Cost to change: one Advanced Setting plus per-subsection authoring.** No plugin, no development.

**The Reset button is off by default.** `show_reset_button` (`capa_block.py:270`) defaults to **`False`**. `should_show_reset_button()` (line 1031) returns `True` early only when `rerandomize` is `always`/`onreset` **and** the problem is submitted — which is the only branch that keys off "after submitting". Out of the box, no Reset appears. Its presence in their courses is their choice.

> **And Reset does not refund the attempt.** `self.attempts` is assigned in exactly one place in the whole 2,481-line file — line 1817, `self.attempts = self.attempts + 1`, inside submit. `reset_problem()` (line 2121) never touches it. The answer clears; the attempt stays spent. Worth making sure both the vendor and our course teams understand this — it is a predictable source of learner confusion.

**Attempts *can* be limited across a whole quiz, in effect.** `max_attempts` is inheritable (`inheritance.py:145`, per-problem override at `capa_block.py:196`). Set once on the subsection, it applies to every problem in it. That is not "3 attempts at the quiz as a unit" — that genuinely does not exist — but "each question in this quiz, 3 times" is one field they have not used. Caveat in the help text: if the course-wide value is a number, individual problems cannot be set back to unlimited.

### ⚠︎ CORRECTION TO US — per-question results *are* shown by default

`show_correctness` — display name **"Show Results"** — is inheritable (`inheritance.py:102`) with default **`"always"`**, values `always` / `never` / `past_due` only.

The accurate statement is therefore: **per-question feedback is immediate unless suppressed; no quiz-level summary exists.** "Results are not shown after submitting" is too strong. If their learners genuinely see nothing, `show_correctness` is set to `never` or `past_due` on those subsections — again configuration.

### ⚠︎ THE ONE THAT CHANGES THE PLAN — the results screen is a plugin, not a fork

Simran's *"we'll have to get it built up from a dev team"* is right that it does not exist. It overstates what building it costs.

**The learner can read their own subsection score.** `GET /api/course_home/progress/{course_id}` — `ProgressTabView`, `lms/djangoapps/course_home_api/progress/views.py:153`, **`permission_classes = (IsAuthenticated,)`**. Per subsection it returns `block_key`, `num_points_earned`, `num_points_possible`, `percent_graded`, `problem_scores: [{earned, possible}]`, `show_correctness`, `show_grades`. This is the endpoint the Progress tab itself uses (`course-home/data/api.js:139`).

**Contrast with the obvious place to look.** Every subsection-granular route under `/api/grades/v1/` is staff-gated — including `/subsection/{subsection_id}/`, which checks `has_course_author_access` and 403s otherwise. Anyone who checked there would conclude it is impossible. It is not; the BFF endpoint is the way in.

**And there is somewhere to hang it.** `org.openedx.frontend.learning.sequence_bottom_navigation.v1` (`Sequence.jsx:227`) receives `courseId`, **`sequenceId`**, `unitId`, `onClickNext`, `onNavigate`, `onClickPrevious`, with `mergeProps: true` — so a plugin can wrap the Prev/Next area, and `sequenceId` is what makes "am I on the last unit of this subsection?" answerable. The alternative `org.openedx.frontend.learning.sequence_container.v1` (`Sequence.jsx:236`) sits after all sequence content but receives only `courseId` and `unitId`.

**Three honest constraints:**

1. **No slot fires on *leaving* a subsection.** Both render continuously on every unit. Last-unit detection is our logic — and note that the MFE's own `isLastUnit` means *last of the course* (`sequence-navigation/hooks.js:45`); `isLastUnitInSequence` stays internal.
2. **The endpoint is declared unstable.** `course_home_api/urls.py` states in its own header that it is an unversioned BFF for the learning MFE and may change between Open edX releases. It is also behind the waffle toggle `course_home_mfe_progress_tab_is_active` — 404 if off. And it returns the whole course grade tree to render one subsection.
3. **Scores are recomputed asynchronously** (`grades/tasks.py`, driven by `PROBLEM_WEIGHTED_SCORE_CHANGED`), so a fetch immediately after submit may read a stale total. **This validates the `Pending` state we already built into `LMS / Quiz · Results`** — it is not a hypothetical.

**Nothing else in the ecosystem does this.** No component in `src/courseware/**` renders a subsection score (grep for `score|grade` hits only course-level celebration copy and a per-unit `graded` boolean). All 186 public repos in the `openedx` org were enumerated: the grade-named ones (`edx-bulk-grades`, `frontend-app-gradebook`, `staff-graded-xblock`) are staff tooling. No community XBlock renders a subsection summary to a learner.

> **Note for the vendor conversation:** `sequence_bottom_navigation.v1` **is not in the repo's slot README** — that README is stale and omits around nine slots that exist in code, including all three `course_exit_*` slots. If anyone says the slot does not exist because it is undocumented, the README is what is wrong.

### Two things a courtesy of omission hides

- **A whole-subsection reset exists, staff-side.** `lms/djangoapps/instructor/enrollment.py:293` — `reset_student_attempts()` recurses into children, so passing a *subsection* key resets every problem beneath it; `delete_module=True` deletes state, `all_students=True` is available. Neither the view nor `StudentAttemptsSerializer` restricts the block type. *(UNVERIFIED: whether the Instructor Dashboard UI accepts a subsection key, or whether this is REST-only. The `enrollment.py` docstring mentions an older safety restriction that no longer appears in the current code path.)*
- **`allow_multiple_attempts` is not a setting.** Its only occurrence in `edx-proctoring` is the migration filename `0011_allow_multiple_attempts.py`, whose entire content drops a `unique_together` constraint. If it is ever cited as a feature, that citation does not survive contact with the source. What actually grants another exam attempt is staff action — `remove_exam_attempt()`, `reset_practice_exam()` (practice only), `mark_exam_attempt_as_ready_to_resume()` (error recovery only) — and **even a fresh exam attempt does not reset per-problem `attempts` counters**.

### Still unverified

| Question | Why it matters | How to settle it |
|---|---|---|
| Does the Instructor Dashboard UI accept a subsection key for reset? | Decides whether staff whole-quiz reset is an operational answer or REST-only | Try it against staging |
| Does `openedx/edx-exams` introduce an attempt-limit field? | Could change the exam attempts model | Repo returned 404 — may be renamed or archived; needs an authenticated check |
| Is a plugin widget's access to the MFE redux store a supported contract? | It is how we would read `sequence.unitIds` for last-unit detection | Pattern is used by the app's own slot fallbacks, but the slot READMEs do not document it as a contract |

---

## Open questions with the vendor

### Drafted Aug 5, 2026 · which Open edX release are we on?

Prompted by Simran searching for `SequenceNavigation` and finding nothing. She was right to find nothing —
it is a React component name, not a documentation term — but chasing the answer turned up something we need
from them directly.

**The evidence we can offer, so this is answerable rather than arguable:**

- Their running `frontend-app-learning` exposes **only legacy bare slot ids** — `sequence_container_slot`,
  `next_button_slot`, `header_slot`, `unit_title_slot` and ten others. **No `org.openedx.frontend.*` id
  appears in any chunk**, and `idAliases` is absent. That places the build before the slot-id rename.
- In the DOM, **no unit tab bar renders**. The page shows the Course Outline sidebar plus Previous/Next.

**Why it matters, in two concrete places:**

1. **The results-screen brief must name the right slot.** We had been citing
   `sequence_bottom_navigation.v1`. That does not exist in their build; the predecessor `next_button_slot`
   does, and carries the `sequenceId` we need. Handing their dev team the newer name would return
   "not possible" when the honest answer is "different name".
2. **The unit tab bar is a version question, not a capability question.** Through Teak it rendered by
   default; later it moved into a plugin slot, replaced by the sidebar. If a question-per-unit stepper is
   ever adopted, whether the learner sees tabs or only Previous/Next depends on which release they run and
   on one `env.config.jsx` entry.

**Decides:** the slot name in any development brief, and whether the stepper's native presentation is tabs
or Previous/Next.

### Drafted Aug 5, 2026 · quiz feedback — the wrong answers, and references that do not resolve

Follows a full test of SKOADM01EN, the course the vendor named as *the* example of the explanation
functionality. Two asks, both evidenced, neither about platform capability.

**1 · Why does the learner who got it wrong receive a redirect instead of the explanation?**
All ten questions tested. Correct answers carry a real explanation of the idea, and the writing is good.
Wrong answers carry *"Please revisit the “…”"* and a content title — never an explanation. The learner who
needed it is the one who did not get it. This is authoring guidance, not platform: the field is the same one
in both cases, and it is already populated.

**2 · Can a topic reference be made resolvable rather than typed?**
Of the five distinct targets named across six wrong answers, **four do not appear anywhere in the course's
block tree**, and the fifth is off by a prefix and a duration suffix. No block in the course contains the
word "Session". So the instruction cannot be followed from the outline, and no string match against course
structure would rescue it either.

**Decides:** whether we design a review affordance at all, and against what. Our shell can resolve the parent
module from course structure — but the authors are naming individual videos and sessions, per question,
which is more precise than the module and is what learners actually need. If there is a way for an author to
point at a topic by identity rather than by remembered title, the affordance becomes buildable and reliable.
If not, the honest design is to stop promising it and fix the copy instead.

### Drafted Aug 4, 2026 · five settings, one example course

Follows the source verification above. The message separates what we accepted as a platform limit from what
we believe is configuration, and asks five settings questions — **each one tied to what it decides for the
design**, because a question with a visible consequence gets answered and an abstract one does not.

| Ask | What the answer decides |
|---|---|
| (a) Can `showanswer` be set per quiz at subsection level? | Two states in the question component |
| (b) **What is `show_correctness` set to today?** | Whether we design an immediate feedback state at all |
| (c) Any objection to stating plainly that Reset does not return the attempt? | Copy on the retry action |
| (d) Is quizzes-open-from-enrolment policy, or never switched on? | Whether `Gate · Prerequisite` is real or out of scope |
| (e) Is the 2-attempt setting applied per subsection or per problem? | Whether attempts chrome can be quiz-level |
| **An example course with feedback and explanations** | Whether we can design that surface at all |

**(b) is the one that was nearly missed, and it matters most of the five.** Simran said results do not appear
after submitting. If she meant that per-question correctness is also absent, that is not the platform —
`show_correctness` (display name "Show Results") defaults to `always`. Without asking, we would have
accepted as a limit something that may be one mis-set field, and designed a deferred-feedback flow around it.

**The example course is the highest-value ask in the message** and was promoted out of a trailing line into
its own section. We have never seen an authored explanation or per-answer feedback, and 213 of 215 audited
questions have neither — so that surface is currently being designed blind.

**Deliberately left out: `allow_multiple_attempts`.** Our source check established it is a migration
filename, not a setting. Nobody on their side ever cited it. Pre-emptively refuting a claim that was never
made reads as point-scoring, costs goodwill and gains nothing. It stays in our documentation, above, in case
it ever comes up.

**Ownership note.** The results-screen estimate is being raised with Navdeep, so the vendor message carries
it as *context* rather than as a second request. Asking both risks two estimates on different assumptions,
or each party assuming the other owns it.

### Sent Aug 3, 2026 · quiz reset and attempts configuration

**Why it is being asked.** We established from source that neither "retry only the incorrect questions" nor "retake the whole quiz" exists as an Open edX feature — but they are not equally far from it. Attempts are counted **per problem**, so re-answering only the wrong ones is essentially the platform's native behaviour; what is missing is a UI that collects them. A *full* retake is the invented one: there is no subsection attempt object, and `reset_problem()` explicitly does not refund a spent attempt.

That settles the capability question. What it does not settle is whether a full retake is **reachable in their content**, which depends on two configuration choices only they can answer:

1. Is **Show Reset Button** enabled on quiz problems in their courses?
2. What **Maximum Attempts** do they set per problem?

If Reset is off, `Retake quiz` cannot be built without backend work, and the design decision makes itself.

**Status: ANSWERED 4 Aug 2026** in the audit walkthrough. **Show Reset Button is enabled**, it appears after submitting, and it works **question by question** — it lets the learner retry that one question using an attempt they still have, and never resets the quiz.

So the two buttons resolve like this:

- **`Retry incorrect`** is not an invention. It is a UI over what Reset already does, gathered across the questions the learner got wrong. Cheap, and native.
- **`Retake quiz`** stays unbuildable. There is no way to reset a whole quiz or refund attempts, and Simran confirmed the reason: with no quiz-level submit, there is no quiz-level anything.

Maximum Attempts is confirmed at 2 per question on graded and final, unlimited on practice — matching the audit.

---

## Where the resulting work is tracked

The actions from these sessions live as a **checklist in Figma**, on the ICP page inside section `04 · Quiz — the three types`, named **`Quiz — worklist`**. Four groups: decided and applied, to build, verify in the dev environment, waiting on someone else. Each row is an instance of a local `Worklist checkbox` component, so ticking one is a variant switch in the properties panel rather than a restyle.

Keep it in step with this log: if an item is ticked because a session settled it, the session belongs here too.

---

## How to add to this log

One section per session, newest first within its date. Include who was actually in the room, tag every capability claim, and quote anything that will be argued about later. If a session contradicts something we already hold, say so **in the entry** rather than quietly updating the other document — the contradiction is the useful part.

---

## Aug 6, 2026 · the feedback claim tested across every course on dev — and mostly withdrawn

Nelson pushed back before this ran: *"estamos a levantar assunções"*. He was right. The line drafted for the
team message — *"the wrong-answer feedback points learners at a topic instead of explaining the answer"* —
generalised from **one** course to the platform. Tested properly, it does not survive.

### Method — read-only where possible, submission only on dev

Two LMS handlers do the work without touching state:

- `…/handler/xmodule_handler/problem_get` returns the problem HTML, including the feedback for an answer
  already given.
- `…/handler/xmodule_handler/problem_show` returns the correct answers outright, and spends no attempt. It
  respects `showanswer`, so it stays silent until the condition is met.

Neither reveals feedback for an answer *not yet given* — CAPA only emits `<choicehint>` in the response to
`problem_check`. The blocks API does not help either: `student_view_data` is empty for every problem, and
`all_blocks=true` is staff-only (403). So establishing wrong-answer feedback requires submitting a wrong
answer, which was done on **dev only**, where Nelson authorised full testing. Nothing was submitted on
production.

### What all three dev courses actually do

Every `problem` block in every course the account can reach — 62 in total, not a sample.

| Course | Problems | Shape | Feedback found |
|---|---|---|---|
| SKOAZ204EEP · AZ-204 | 48 | one question per problem | **0 of 48** |
| SKOAIFP01 · AI-Powered Financial Analysis | 4 | **bucket** — 10 questions per problem | **0 of 4** |
| SKOADM01EN · Digital Marketing | 10 | one question per problem | **7 of 7 tested** (3 already answered) |

**The pattern is one course, not the platform.** Two of the three courses — 52 of the 62 problems — carry no
authored feedback of any kind. Not a redirect, not an explanation, nothing beyond the attempts line. That is a
larger and plainer problem than the one we were about to raise, and it is invisible until you submit.

### The redirect is real, and it points somewhere we had misread

In SKOADM01EN the feedback exists on every question tested. Six wrong answers all read:

> *Please revisit the "…" VILT session recording.*

**VILT** — virtual instructor-led training. These are recordings of live sessions, **not course blocks**. That
retires the earlier finding that four of five named targets "do not appear anywhere in the course's block
tree": of course they do not. They were never course content. The five distinct targets are session titles:

- Session 1: Digital Marketing: Concepts, Evolution, and Growth
- Session 1: Digital Strategy and Its Components
- Session 2: Effective Use of Digital Channels for Growth
- Session 2: Demographic and Psychographic Targeting
- Session 3: Journey Interventions

**What this changes.** The question for the vendor is no longer "why are these titles wrong?" It is *where do
VILT recordings live, and can a learner reach one from inside a quiz?* If they sit outside the LMS, the
redirect is not sloppy authoring — it is the only pointer available, and no design of ours can resolve it.
If they are addressable, the review affordance becomes buildable for the first time.

The one correct answer tested carries a genuine explanation, which confirms the asymmetry stands **within this
course**: right answers get taught, wrong answers get redirected.

### The bucket, measured

The four SKOAIFP01 problems returned `4/10`, `6/10`, `6/10` and `3/10` from a single submission each —
one problem, ten questions, one score, partial credit. Confirms §11 of the spec from the API rather than from
the screen, and confirms the model is not hypothetical: it is how a live course is authored today.

### Aug 6, 2026 (later) · production tested too — the redirect is one course, and only one

Live was swept **read-only**: `problem_get` reads the block's current state and submits nothing. Nothing was
answered, reset or graded on production.

**229 problems examined in total** — 62 on dev (by submission, authorised) and 167 on production (by reading).

| Environment | Course | Problems | What was found |
|---|---|---|---|
| dev | SKOAZ204EEP | 48 | no feedback on any question |
| dev | SKOAIFP01 | 4 buckets (10 questions each) | no feedback; scores 4/10, 6/10, 6/10, 3/10 |
| dev | SKOADM01EN | 10 | feedback on all 7 testable — **wrong answers redirect to a VILT recording** |
| live | SKOAIH01 · Foundations of AI in Healthcare | 58 | 2 previously answered, both carry authored feedback |
| live | SKOAIH02 · Machine Learning for Medical Data | 58 | none previously answered |
| live | SKOAIH03 · AI Technologies in Healthcare | 51 | none previously answered |
| live | IBM AI0101EN, IBM AI0117EN | 0 | no `problem` blocks returned at all — ⚠︎ worth a separate look |

**The two answered questions on production settle the question.** One was answered correctly and one
incorrectly, and the incorrect one returned:

> *Incorrect: Ensembles improve accuracy on structured data but do not inherently process unstructured data.*

That is a **real explanation of why the chosen answer is wrong** — exactly what we said learners were not
getting. SKOAIH01 does the thing properly. So the redirect pattern belongs to SKOADM01EN alone, and the
sentence drafted for the team message would have been wrong in front of the vendor.

### The limit of read-only, stated plainly

For the other 165 production questions, nothing can be concluded. CAPA emits `<choicehint>` only in the
response to `problem_check`, so an unanswered question looks identical whether its author wrote rich feedback
or none at all. Establishing coverage on production needs one of:

1. **Studio or course-export access** — the OLX carries every `<choicehint>` in plain text, read-only. This is
   the right ask, and it is cheap for whoever already has it.
2. Permission to submit answers on production — which spends real attempts against real grades, and is not
   worth it.

**This is now the strongest argument for the Studio ask**: without it we can describe the learner experience
only for questions someone has already answered, which is precisely the sample least likely to reveal a gap.

### Aug 6, 2026 (later still) · Studio access granted in principle, and two test courses on QA

Simran asked Samyuktha for Studio access for Nelson; Samyuktha agreed and asked for course ids. Jaspinder's
constraint is the right one and should be honoured: **"use test course… take import from a course which has
content… avoid touching courses which are created for prod."** Two test courses were then created on the QA
server:

| Course | Studio URL |
|---|---|
| Test - AI-Powered Financial Analysis | `qa-apps.skillup.online/authoring/course/course-v1:SkillUp+Test-T1+2026` |
| Test - Digital Marketing Fundamentals and the AI Mindset | `qa-apps.skillup.online/authoring/course/course-v1:SkillUp+Test-T2+2026` |

They are imports of the two courses that matter most to the open questions: **T1 is the bucket course**
(SKOAIFP01, one problem per quiz holding ten questions) and **T2 is the only course we have found that
authors wrong-answer feedback as a redirect** (SKOADM01EN). Between them they cover both live findings.

**Environments now in play — three, each with its own session:**

| | Learner (LMS) | Authoring (Studio) |
|---|---|---|
| dev | `devcourses.skillup.online` | `studio-dev.skillup.online` |
| QA | `qacourses.skillup.online` | `qa-apps.skillup.online/authoring` |
| production | `courses.skillup.online` | `studio.skillup.online` |

#### What Studio settles that the learner APIs cannot

1. **Feedback coverage, read-only and complete.** The OLX carries every `<choicehint>` in plain text. This is
   the only way to answer *"do the other 165 production questions have feedback?"* without answering them.
   The LMS emits choicehints solely in the `problem_check` response — an unanswered question looks identical
   whether its author wrote rich feedback or none.
2. **The five settings, without asking anyone to flip them.** `showanswer`, `show_reset_button`,
   `force_save_button`, `max_attempts` and `show_correctness` are all visible in Studio, per problem and
   inherited at subsection level. On a test course they can also be *changed* and then read back in the LMS,
   which turns four open questions into observations.
3. **Q14 — the last open screen gap.** *Hide content after due date* is a subsection setting. With Studio on a
   test course we can finally see whether the platform renders a distinct shell or reuses the past-due one,
   which is the one thing blocking §11.9 gap 6.
4. **The stacked question, definitively.** Studio shows the unit structure directly, so problems-per-unit
   stops being an inference from the blocks API.

#### The claim we must not make until it is measured

Whether **every** quiz a learner can reach is authored as one scrolling page is still unproven. Two shapes
are already confirmed and they behave differently, which is the point:

- **SKOAIH01** — N `problem` blocks in one unit. One Submit *per question*. This is mode A as drawn.
- **SKOAIFP01** — one `problem` block per quiz holding ten questions. One Submit *for the whole quiz*, pooled
  attempts, partial credit.

Both look like a single scrolling page. Only one of them behaves the way we have been describing mode A.
**"Stacked" is safe as a statement about layout and false as a statement about submission.** Four courses —
SKOAIH02, SKOAIH03, SKOADM01EN, SKOAZ204EEP — have known problem counts (58, 51, 10, 48) and unknown
per-unit distribution. Until that is measured, no summary should say *all*.

### Aug 6, 2026 · measured: every quiz on dev is one unit — but they do not all submit alike

The stacked question, answered with the block tree rather than by inference. Counted `problem` blocks per
`vertical` (unit) for every quiz the account can reach on dev — 16 quizzes, 62 problems.

| Course | Quizzes | Shape | Submit |
|---|---|---|---|
| SKOAZ204EEP | 11 | 1 unit, 2–5 problems each | one **per question** |
| SKOADM01EN | 1 | 1 unit, 10 problems | one **per question** |
| SKOAIFP01 | 4 | 1 unit, **1 problem** holding 10 questions | one **for the whole quiz** |

**Two findings, and they must not be collapsed into one sentence.**

**1 · On layout, "stacked" holds — completely.** All 16 quizzes are a single unit. **Not one quiz anywhere is
authored one-problem-per-unit.** That matters beyond layout: the platform's native question stepper only
appears when a quiz is split across units, so the control exists in the code and is used by nothing we have.
It also explains why the vendor could not find it — they were looking for a feature, and what is missing is
an authoring choice nobody has made. Adopting the stepper is therefore a **content migration**, not a build.

**2 · On submission, "stacked" is false for a quarter of them.** Twelve quizzes give a Submit per question.
Four — every quiz in SKOAIFP01 — give **one Submit for ten questions**, with pooled attempts and partial
credit. The two look identical to a learner scrolling the page and behave differently the moment they answer.

**The safe sentence for stakeholders:** *every quiz today is a single scrolling page, and most — but not all —
make the learner submit question by question.* Anything shorter is wrong in one direction or the other.

**Still unmeasured: production.** SKOAIH02, SKOAIH03 and SKOAIH01 (58, 58 and 51 problems) have known counts
and unknown per-unit distribution. SKOAIH01 was confirmed stacked by hand on Jul 29; the other two are
assumed and should not be. QA is authenticated but returns 403 on both test courses — staff access has not
been granted yet.
