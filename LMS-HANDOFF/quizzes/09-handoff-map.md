# Handoff map — every component property, and what actually controls it

*Created Aug 6, 2026. Companion to `06-quiz-screen-matrix.md`. Read this before implementing anything from
the Figma boards.*

## Why this document exists

A Figma property named `Show answer action` looks like a component prop. It is not. It is a **course setting
in Studio** — and someone who tries to implement it in code will not find anything to implement.

Our components mix three unrelated kinds of control behind one uniform-looking properties panel:

| | Marker | What it means | Who acts, and where |
|---|---|---|---|
| **Setting** | ⚙ | an edX course, subsection or problem setting | course team, in Studio |
| **Authoring** | ✎ | OLX content or the way blocks are structured | course team, in Studio or the OLX |
| **Runtime** | ↻ | derived from learner state; the platform decides | nobody — the shell reads it |
| **Shell** | ▣ | no platform equivalent; ours to build | development, mode B only |

**The single most useful thing in this document:** if a row is ⚙ or ✎, **do not build it**. It is configured
or authored, and building it would duplicate something the platform already does — or worse, fake something
the platform will contradict.

Everything below was verified against rendered problems on dev and QA, the OLX read through Studio, and
`xmodule/capa_block.py`. Where a claim is unverified it says so.

---

## 1 · `LMS / Quiz · Question Card`

The component that carries the most confusion, because ten of its twelve booleans are not ours.

| Property | Kind | Controlled by | Where it shows in the platform |
|---|---|---|---|
| `State` | ↻ | response to `problem_check` | `success: correct \| incorrect`, `current_score`, `attempts_used` |
| `Show attempts` | ⚙ | `max_attempts` | text `You have used N of M attempts`. **Blank = unlimited, and the platform prints no line at all** |
| `Show points` | ⚙ | problem `weight` | `.problem-progress` element. **Empty in every course we can read** — default off |
| `Show save` | ⚙ | `force_save_button`, or `rerandomize: always` | `button.save[data-value="Save"]` in `.action` |
| `Show answer action` | ⚙ | `showanswer` (12 values, default `finished`) | `Show answer` button in `.action` |
| `Show hint action` | ✎ | a `<demandhint>` exists in the OLX | `Hint` button in `.action` |
| `Show hint` | ✎ | same `<demandhint>` — this is the revealed state | `<ol>` of `<li><strong>Hint (N of M): </strong>…` |
| `Show explanation` | ✎ | `<choicehint>` on the chosen option | `.feedback-hint-correct` / `.feedback-hint-incorrect` › `.hint-text` |
| `Show submit` | ✎ | **authoring model** — one problem per question, or all questions in one problem | one `Submit` per problem, wherever the problem boundary is |
| `Show platform prompt` | ✎ | the block's `display_name` | `<h3 class="problem-header">`. Authored text, differs per course |
| `Show progress` | ▣ | — | mode B only. No platform equivalent |
| `Show next action` | ▣ | — | mode B only. Off by default; forward navigation lives in the bar |
| `Show skip` | ▣ | — | mode B only. The platform has no skip |

**Three traps in this table.**

`Show platform prompt` is the worst-named property we have. It is not a platform prompt — it prints whatever
the author called the block. In SKOAZ204EEP that is *"Choose the correct option(s)"* on 48 single-select
questions; in SKOADM01EN it is *"Question 1…10"*; in SKOAIFP01 it is the quiz title. Renaming it needs a
board sweep, so it carries this warning instead.

`Show submit` is the only property that describes the **authoring model** rather than a per-question state.
It must be consistent across a whole quiz or the screen lies — see §11 of the spec on the bucket model.

`Show attempts` off does not mean "hide the count". It means **unlimited attempts**, where the platform
prints nothing. Verified on dev: a practice problem returns no attempts line and no Save button.

---

## 2 · `LMS / Quiz · Option Row`

| Property | Kind | Controlled by | Notes |
|---|---|---|---|
| `State` | ↻ | `problem_check` response markup | `Unanswered · Selected · Correct · Incorrect · Disabled · Missed · Correctly unselected` |
| `Show state-check-icon` | ▣ | — | presentation only |
| nested `Checkbox.Type` | ✎ | `multiplechoiceresponse` vs `choiceresponse` in the OLX | **radio for single-answer, checkbox for multi** |

**`Missed` and `Correctly unselected` have no meaning on a radio.** They exist for multi-select marking. A
single-answer question emits `type="radio"` × N and zero checkboxes — verified on dev.

---

## 3 · `LMS / Inline Alert`

| Property | Kind | Controlled by |
|---|---|---|
| `Tone = Success \| Error \| Warning` | ↻ | correctness of the submitted answer |
| `Tone = Hint` | ✎ | `<demandhint>` |
| `Tone = Answer` | ⚙ + ✎ | `showanswer` permits it **and** a `<solution>` was authored |
| `Tone = Info` | ▣ | shell messaging |
| `Show hint 2` / `Show hint 3` | ↻ | how many times the learner pressed Hint |
| `Show secundary-text` | ▣ | presentation |

**The hint list accumulates.** `get_demand_hint` re-renders every hint from the first to the current one into
one `<ol>`, so hint 1 stays on screen when hint 3 arrives. There is no back control and no need for one.
The forward button goes **disabled, not hidden**, once `hint_index + 1` reaches the count.

**The answer box carries the `<solution>` only.** The correct options are marked on the option rows
themselves — `problem_show` returns choice ids, not prose. Putting the answer inside the box would draw
something the platform does not do.

---

## 4 · Shell components — mode B only

| Component | Property | Kind | Note |
|---|---|---|---|
| `Stepper Bar` | `Mode` | ▣ | **`With Back only` is the default.** `With Back+Next` waits for mode B |
| `Entry Header` | `Variant` | ▣ | derived from *subsection* metadata, not from the block |
| `Entry Header` | `Show review action` | ▣ | ⚠︎ can only resolve to the module, never to the lesson |
| `Results` | `Result` | ▣ | reads `/api/course_home/progress/{course_id}` — `num_points_earned`, `num_points_possible` |
| `Grade Summary` | `Result` | ↻ | the course gradebook, which **does** exist today |

`Entry Header.Variant` is subsection metadata: grading policy plus assignment type, optionally timed config.
**Never infer it from the block** — the `problem` blocks inside Practice, Graded and Final are identical.

---

## 5 · Gate and Exam Timer — platform states, neither mode

| Component | Property | Kind | Controlled by |
|---|---|---|---|
| `Gate` | `Prerequisite` | ⚙ | prerequisite subsection + min score |
| `Gate` | `Not released` | ⚙ | subsection release date |
| `Gate` | `Past due` | ⚙ | `due` or course end date |
| `Gate` | `Rate limited` | ⚙ | Time Between Attempts |
| `Gate` | `Expired` | ⚙ | timed exam expiry |
| `Exam Timer` | `Running · Warning · Critical` | ⚙ + ↻ | timed exam config; thresholds are the platform's |

**These replace the quiz before either shell renders**, which is why they belong to neither mode. ⚠︎ We do
not know what the API exposes of the prerequisite or release rule — the copy on those two screens is the
platform's, not ours.

---

## 6 · `LMS / Quiz · Answer Input`

| Property | Kind | Controlled by |
|---|---|---|
| `Type = Dropdown \| Numerical \| Text` | ✎ | problem type in the OLX |
| `State` | ↻ | `problem_check` |

Not in use in any course we have read — every question is multiple choice. Numerical is the only type with a
Tolerance setting; text input carries case-sensitivity and regex modes.

---

## 7 · The DOM, for whoever implements against the iframe

Verified strings on dev, useful for grepping:

| Element | What it is |
|---|---|
| `h3.problem-header` | block `display_name` |
| `.problem-progress` | points line — empty in our courses |
| `.choicegroup.capa_inputtype` | the option group |
| `.action` | button row: `Save`, `Submit`, `Show answer`, `Reset` |
| `.submit-attempt-container` | Submit plus the attempts text |
| `.feedback-hint-correct` / `.feedback-hint-incorrect` › `.hint-text` | per-choice feedback |
| `.solution-span` | solution container, filled only when Show Answer is pressed |

Read-only handlers, which need no submission:

- `…/handler/xmodule_handler/problem_get` — current state, including feedback already given
- `…/handler/xmodule_handler/problem_show` — correct answers; **spends no attempt**

`problem_check` is the only one that writes.

---

## 8 · Open questions that block parts of this map

| # | Question | Blocks |
|---|---|---|
| 1 | What is `showanswer` on dev and production `SKOADM01EN` / `SKOAIH01`? | whether `Show answer action` reaches learners at all. QA says `finished` and the button renders from the first view; dev renders none |
| 2 | What does the hint button say before the first press? | our label reads `Next hint`, which cannot be right on the first press. String lives in a Mako template absent from the public repo |
| 3 | Does `Hide content after due date` render a distinct shell? | Q14 in the screen matrix |
| 4 | `problem`-per-unit distribution on production | whether "every quiz is one scrolling page" is safe to say |

Questions 1–3 are answerable in the QA Studio in one session. Question 4 needs a production session.
