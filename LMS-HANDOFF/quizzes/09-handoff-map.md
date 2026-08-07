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
| `Show reset` | ⚙ | `show_reset_button` **on the problem, not the course** | `Reset` button in `.action`. Never appears on a correct answer |
| `Show attempt meter` | ▣ | — | mode B only. The platform's attempts line is inside the iframe; a badge row cannot be injected |
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

### 1a · The button rules, in one place

These are the three that have been got wrong most often. All three come from `xmodule/capa_block.py` and were
each confirmed against a rendered problem.

**The primary button NEVER changes its label.** It is always `Submit` —
`<span class="submit-label">Submit</span>`. edX toggles the `disabled` attribute and nothing else. There is no
*Submitted*, no *Try again*, no *Next question*, in any state. And because mode A renders this markup inside
the iframe, relabelling it is not a copy change anyone can make without forking the platform.

**Submit is disabled only when the problem is closed.**

```python
submitted_without_reset = self.is_submitted() and self.rerandomize == RANDOMIZATION.ALWAYS
if self.closed() or submitted_without_reset: return False
return True
```

`closed()` = **all attempts used** or **past due**. Submitting does *not* disable it. With attempts remaining
the learner changes their answer and submits again — **that is the retry**, and it is why no separate retry
control exists on a question.

**`Reset` is the only dedicated retry affordance, and it never appears on a correct answer.**

```python
if self.closed(): return False
if self.is_correct(): return False
return self.show_reset_button
```

Note `show_reset_button` is read from **the problem**, not the course. A course whose advanced setting reads
`false` can still show Reset on individual problems — observed on QA.

**Submit is also disabled the moment a result appears.** The server method above governs the *initial* render;
after a submission the client takes over — `display.js` calls `enableSubmitButtonAfterResponse` →
`enableSubmitButton(false)` as soon as the `problem_check` response arrives, and re-enables it when the
learner changes their answer. So **every state showing a result has a disabled Submit**, whatever the attempt
count. Reading only `capa_block.py` gives the opposite answer; the behaviour lives in two files.

### The CTA matrix — every control, in every state

Read off the component, not from memory. `Submit` is always present and always says *Submit*; only its state
changes. A dash means the control **does not exist** in that state. ▣ marks mode B chrome, off by default and
outside this handoff.

| State | Submit | Hint | Save draft | Show answer | Reset | Review ⚑ | Next question ▣ | Skip ▣ |
|---|---|---|---|---|---|---|---|---|
| Unanswered | **disabled** | ✓ | ✓ | ✓ | — | — | — | ✓ |
| Selected | enabled | ✓ | ✓ | ✓ | — | — | — | ✓ |
| Saved | enabled | ✓ | *"Draft saved"* | ✓ | ✓ | **✓** | — | ✓ |
| Last attempt | enabled | ✓ | *"Draft saved"* | ✓ | ✓ | — | — | — |
| Incorrect | **disabled** | ✓ | — | ✓ | ✓ | **✓** | ✓ | — |
| Partially correct | **disabled** | — | — | ✓ | ✓ | **✓** | — | — |
| Correct | **disabled** | — | — | ✓ | **never** | **✓** | — | — |
| Answer revealed | **disabled** | — | — | — | — | **✓** | — | — |
| Results withheld | **disabled** | — | — | — | — | **✓** | — | — |

⚑ **`Review` is on the platform and not yet in our components.** It lives inside every notification block
(`.notification-btn.review-btn`) and scrolls focus back to the question header. Visually hidden until focused,
which is why it went unnoticed. Present wherever a notification is — every result state, the hint block, the
save confirmation and the gentle alert.

**The button each CTA actually uses**, read off the component:

| CTA | Component | Hierarchy | Size | State |
|---|---|---|---|---|
| Submit | `Buttons/Button` | Primary | md | Default · Disabled |
| Save draft | `Buttons/Button` | Secondary | md | Default |
| *Draft saved* | `Buttons/Button` | Secondary | md | **Disabled** — a confirmation, not an action |
| Hint · Show answer · Reset | `Buttons/Button` | Link color | md | Default |
| Next question ▣ · Skip ▣ | `Buttons/Button` | Link color · Secondary | md | Default |
| Review ⚑ | **to build** | Link color suggested | md | Default |

**Property defaults:** `Show submit`, `Show explanation`, `Show attempts` and `Show progress` are **true**;
everything else is **false** — `Show next action`, `Show save`, `Show reset`, `Show hint action`, `Show skip`,
`Show platform prompt`, `Show points`.

⚠︎ `Show progress` still defaults **true** and it is the stepper — mode B chrome. Same shape as the
`Show next action` default that cost seven rounds of chasing (§14.14 of the screen matrix). Worth flipping.

### 1b · ⚠︎ `Reset` is destructive, and it publishes a zero

`Reset` is not a retry. `reset_problem()`:

```python
self.lcp = self.new_lcp(None)
self.set_state_from_lcp()
self.set_score(self.score_from_lcp(self.lcp))
self.publish_grade()
```

- **It deletes the learner's answers** and returns the problem to unfinished.
- **It publishes a zero immediately** — `set_score()` runs against an empty problem, then `publish_grade()`.
- **It does not refund the attempt.** `self.attempts` is untouched; only Submit increments it.
- With `rerandomize` on `ALWAYS`/`ONRESET` it also reseeds — but the seed only affects problems that generate
  values in a `<script>`, so for the plain multiple-choice questions in every course we have read, the
  question and its options are unchanged.

**The hazard:** Reset never appears on a correct answer, but it does on **Partially correct**. A learner
holding 1 of 2 marks who presses Reset and then walks away has **lost the marks and kept the spent attempt**.
There is no confirmation and nothing on screen says what will happen.

**It is not an exploit.** Because Submit spends the attempt and Reset does not refund it, and because
`should_show_reset_button()` returns false once `closed()`, Reset and Submit vanish together at the ceiling.
A two-attempt question allows two submissions regardless of what happens in between.

**Do not relabel it.** *Try again* would describe the intent and hide the cost — someone reading it expects
their selection to survive. And in mode A it is rendered inside the iframe, so it could not be relabelled
anyway.

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
| 5 | **Should `Reset` be available on partial-credit questions at all?** It publishes a zero and refunds nothing, so a learner on 1 of 2 marks can throw them away in one click with no warning (§1b). `show_reset_button` is per problem, so the content team can turn it off on those questions today — no build required | whether we hand over a screen showing a control that can silently cost a grade |
| 6 | **Should mode B put a confirmation on `Reset`?** Only where a non-zero score would be lost. Mode A cannot — the button is inside the iframe | a mode B decision, but it should be taken while the finding is fresh |
| 7 | ⚑ **`Review` is missing from every alert.** `.notification-btn.review-btn` sits in every notification block and returns focus to the question header. Ours have no equivalent, so a keyboard or screen-reader user has no way back from a result to the question | accessibility of every feedback, hint and answer state — this is a gap in what we hand over, not an unknown |
| 8 | ⚑ **`.notification-save` is a transient, ours is a state.** The platform shows a save confirmation that **disappears the moment any input changes**. We drew `Saved` as a persistent card state with a "Draft saved" button | whether the Saved screen is honest. Ours implies the confirmation stays; it does not |
| 9 | ⚑ **No component for `.notification-gentle-alert`.** The platform's error channel — save failures, hint failures, AJAX errors, and grading-poll timeouts such as *"The grading process is still running. Refresh the page to see updates."* | we have no state for a problem whose request failed, only for right and wrong answers |

**Who can answer what — corrected Aug 6, 2026.** An earlier version of this line said questions 1–3 were all
answerable in the QA Studio. That is wrong for question 1: it asks about **dev and production**, and QA
Studio cannot see either.

- **Question 1 needs someone with Studio on dev and production.** It is a two-value read in
  *Settings → Advanced Settings*, no changes required.
- **Questions 2 and 3 are ours to run**, in the QA test courses, and need nobody: author one `<demandhint>`
  on `Test-T2` and read the button before clicking it; switch *Hide content after due date* on a subsection
  and open it past the date.
- **Question 4 needs a learner session on production**, not Studio.
