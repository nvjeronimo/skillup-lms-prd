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
