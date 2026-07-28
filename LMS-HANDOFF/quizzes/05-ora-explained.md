# ORA / ORA2 — Explained, and What It Means for Design

*Reference note · Jul 21, 2026*
Plain-language explainer plus the screen/state inventory this component requires.

---

## 1. What ORA means

**ORA = Open Response Assessment.**

It is the Open edX component that handles work a computer **cannot** auto-grade: essays, reports, uploaded files, projects. A multiple-choice question is graded by simple comparison; an open response needs human judgement — that is the problem ORA solves.

**The core idea: learners grade each other.** In a course with thousands of enrolments there is no staff capacity to read every submission, so ORA distributes the grading across peers, guided by a rubric the course author defines.

### Why "ORA2"?

It is just a version number. The first generation was replaced years ago by the second, and the name stuck. In the codebase the component is called `openassessment`. **ORA and ORA2 mean the same thing today.**

## 2. How it works — the learner journey

| Step | What happens | Optional? |
|---|---|---|
| **Your Response** | Learner writes text and/or uploads files | Required |
| **Learner Training** | Practises grading against instructor-scored samples until they match | Optional (requires a peer step, must come first) |
| **Peer Assessment** | Grades N peers using the rubric | Optional |
| **Self Assessment** | Grades their own submission | Optional |
| **Staff Assessment** | Course team grades — **overrides everything else** | Optional |
| **Your Grade** | Final score, broken down per criterion | — |

### The rubric model

One rubric per assignment → **N criteria** (name + description) → **M options** per criterion (label + explanation + point value). Optional free-text comments per criterion, plus one overall comment.

### How the score is calculated

- **Staff assessment overrides everything.**
- With peer + self and no staff, **only the peer score counts**.
- The peer score is the **median per criterion**, then summed — not the mean. The median dilutes unfair or outlier grading.
- Self-only configuration → the self score is final.

### Flexible peer grading

If peers are slow, the requirement relaxes automatically: after 7 days it drops to 30% of the required reviews, minimum 1. This stops learners being blocked forever by an inactive cohort.

## 3. Where we already use it

**`Peer-Review: Final Project`** in SKOAIH01 (*Foundations of AI in Healthcare*):

- Learner uploads the liver-disease project document
- **1 required peer review**
- Rubric worth **20 points** across 4 tasks (3 / 6 / 5 / 6)
- Accepted files: `.pdf .gif .jpg .jpeg .jfif .pjpeg .pjp .png`
- Due date: Jan 1, 2029 · **ungraded** — does not count toward the final grade in this course

Also relevant: **Final Project** and **Peer-graded Assignment** in our topic-type roster are both ORA-backed.

## 4. The design consequence — ORA is a journey, not a screen

**This is the key point for our component work.**

Every other topic type is a single sitting: open it, do it, done. ORA is the only type where the learner **returns to the same topic repeatedly over days or weeks** — submit, wait, grade peers, wait again, receive a grade.

That means each step needs its own screen *and* its own set of states, plus the shell that tells the learner where they are and what unlocks next.

### Screen / state inventory

#### Step 1 — Your Response
| State | What it needs |
|---|---|
| Not started | Prompt, rubric preview, deadline, expectations ("you will also review N peers") |
| In progress | Rich-text editor and/or upload zone, autosave indicator, draft-vs-submitted distinction (loud) |
| File upload | Drop zone, uploaded file list, **description required per file**, type/size limits, remove file |
| Pre-submit | Confirmation — "after you submit you cannot edit" |
| Submitted | Read-only view of what was sent |
| Past due / closed | No submission possible, explanation |
| Cancelled by staff | Score zeroed unless resubmission allowed |

#### Step 2 — Learner Training (if enabled)
| State | What it needs |
|---|---|
| Scoring a sample | Sample response + rubric form |
| Diverged from instructor | "Not quite — here is how the instructor scored it", retry |
| Matched | Success, auto-advance |

#### Step 3 — Peer Assessment
| State | What it needs |
|---|---|
| Reviewing | "Review 1 of N" counter, peer response (text + files), rubric form, per-criterion comments (300 char), overall comment |
| Submitted a review | Confirmation → next peer |
| **No peers available** | Empty state: "check back later" — common and must be designed |
| Quota met | Optional "continue assessing peers" |
| Overdue on reviews | Nudge: "your peers are waiting on you" |

#### Step 4 — Self Assessment
Own response displayed alongside the same rubric form.

#### Step 5 — Waiting
| State | What it needs |
|---|---|
| Waiting for peers | "Waiting for peer assessment", ideally progress ("2 of 3 peers have reviewed your work") |
| Waiting for staff | "Your submission is with the course team" |

#### Step 6 — Your Grade
| State | What it needs |
|---|---|
| Grade received | Total, per-criterion breakdown with the median shown, peer comments |
| Staff override | Notice that staff regraded |
| Failed / low score | Retry path if resubmission is allowed |

#### Cross-cutting shell
- **The stepper** — which step am I on, which are locked, what unlocks each
- **Per-step deadlines** — each step can have its own
- **Top Responses** — optional showcase of the best submissions (up to 1h delay)
- **Feedback on feedback** — optionally rate the usefulness of peer comments

### Rough count

**~20 distinct states across 6 steps**, plus the stepper shell. For comparison, a Reading topic has 3 states. ORA is by far the most expensive topic type to design and build.

## 5. Platform constraints to respect

- **One ORA per unit** — Open edX docs: *"Avoid multiple ORA components in single course units."*
- Response limit ~10,000 words
- File uploads: 500 MB cumulative cap, description required per file
- ORA **does not respect cohorts** natively
- Mobile-ready (unlike SCORM)
- Modern Open edX ships dedicated MFEs for this: `frontend-app-ora` (learner) and `frontend-app-ora-grading` (staff) — relevant to open question QZ4: wrap the legacy iframe, or adopt the MFE?

## 6. Open questions

1. **QZ4** — in phase 1, wrap the legacy ORA iframe or adopt `frontend-app-ora`?
2. Which steps will our courses actually enable? SKOAIH01 uses Response → Peer → Grade, with no training and no self-assessment. If that is the standard, the phase-1 scope drops from ~20 states to roughly 12.
3. Will Final Project stay ungraded, or start counting toward the final grade?
4. Do we need staff-side grading screens, or is that out of ICP scope (staff use the Studio/legacy UI)?
