# Handoff Package Changelog

Current version. For previous releases see `history/CHANGELOG-archive.md` (v1.0 → v1.7).

## 2026-08-04 · Retired components swapped out, and the gate state corrected

**Eight instances of `_Remove · LMS / Quiz · Results Summary` were still live in the ICP** — three in
section 04, four in 04.3, one in 04.4. Anyone opening those pages was being shown the layout we replaced.

Finding them took a second pass. Searching by component name returns nothing, because an imported instance
keeps whatever the component was called **at import time** — so in the ICP they are still named
`LMS / Quiz · Results Summary`, without the `_Remove ·` prefix the DS has since acquired. Matching on the
component **key** is the only reliable way, and it is worth remembering the next time something is retired.

**The swap was not a drop-in, and a naive one would have been silently wrong.** Two of the four variant
names changed in the rebuild: `Failed` → `Not passed`, `Pending review` → `Pending`. A straight swap drops
an unmatched variant to the set default — which is `Passed`. A failure screen would have quietly become a
pass. Each instance was therefore read, mapped, swapped and verified: all eight kept their meaning. Existing
captions already read "not passed" and "pending grading", so no copy went stale.

Each instance lost ~190px in the new layout, so sections 04, 04.3 and 04.4 were re-fitted to their content.

Also swept: no stray `_Remove · LMS / Quiz · Rail Item` and no instance parked on the
`Variation=_Remove · Progress Rail` variant anywhere in either file. The five Rail Items that do exist are
inside that retired variant itself — its own contents, not usages.

**`Gate · Prerequisite` corrected in 04.3 (D1).** It was presented as a state our learners meet. It is not.
Simran confirmed nothing is gated, and the source check then showed the feature is fully built and simply
defaults to off. The label now says so, and an amber correction note explains that the component stays
because it is *available if the business wants quizzes earned rather than open* — a decision waiting to be
made, not a screen to design against. The column caption was rewritten to match: of the five blocked states,
only the timed-exam ones occur in our courses today.

*Noticed in passing, not touched:* sections **04.1 and 04.2 overlap** on the ICP page. It predates this
work — 04.1 runs to y≈11324 and 04.2 starts at y=10898, in the same column.

## 2026-08-04 · Two models, side by side — a board built to be decided from

New Figma section on the ICP page, `04.5 · Today vs proposed — two models for the stakeholder call`
(`5046:116408`), sitting to the right of 04.4. Built so stakeholders can decide, not admire.

**Both columns are drawn in our design system, deliberately.** If the current model were shown as raw edX
and the proposal in our DS, the room would pick the prettier one for the wrong reason. Drawing both the same
way isolates the only variables that are actually up for decision: behaviour and content.

**Column A — how it works today.** The configuration behind 213 of the 215 audited questions: all questions
stacked on one page, no per-question counter, Show answer available before trying, Reset that quietly spends
an attempt, nothing locked, and nothing at the end. The two dashed *absence* callouts are the point of the
column — an empty space is hard to see, so it is labelled: nothing appears after a wrong answer, and nothing
appears after the last question.

**Column B — the proposal.** Six changes, each mapped one-to-one onto the numbered problems in A, and each
carrying a cost tag so a single line can be struck without rejecting the rest: **▣ Design** (ours, already
in scope), **⚙ Setting** (one inherited field on the subsection), **✎ Authoring** (the content team writes
it), **⌥ Build** (frontend plugin). Nothing in this column requires moving a question between units.

**Column C — the cost key, the exclusion, and the ask.** The stepper (one question per unit) is called out
as *deliberately left out*: it is natively possible and needs no code, but it means re-authoring the whole
catalogue, which is the restructuring effort we set out to avoid. Also lists what no configuration will ever
give us, and the four questions the session has to answer. Items 1 and 4 need no decision — they are inside
the redesign already.

One honest bit of construction: the "1 attempt left · Reset does not give it back" line is shown as a dashed
**PROPOSED COPY — NOT A COMPONENT YET** callout rather than tucked into the hint alert. An attempts warning
is not a hint, and dressing it as one would have been the same category error as the destructive-state hint
we rejected earlier.

## 2026-08-04 · The vendor's answers, taken back to source

The 4 Aug quiz walkthrough with Simran is logged in `session-log.md`. Six of her answers were then read
against the `openedx` repositories at `master` — not documentation summaries — because she answers as the
person who *configures* SkillUp's courses, which makes her reliable about SkillUp and unreliable as a
statement of what the platform can do. The split came out three and three.

**Genuinely the platform.** No submit for a whole subsection (`seq_block.py` has two handlers, neither
submits). No aggregate score on the subsection (`score` appears zero times in that file). No per-quiz pass
mark as a verdict (`GRADE_CUTOFFS` is course-wide). And — the one worth knowing — **"End My Exam" is not a
quiz-level submit either**: it ends the session, never touches problem state, and the platform tells
learners outright that unsubmitted answers will not be graded.

**Their configuration, not the platform.** `showanswer` has twelve values and its deciding function never
reads `graded` — the graded/non-graded split is an editorial convention, and the field is *inheritable*, so
it is one setting per subsection rather than 215 edits. `enable_subsection_gating` is fully built, enforced
against direct-URL access, exposed in Studio, and simply defaults to off. `show_reset_button` defaults to
off, so Reset appearing at all is a choice they made. And `max_attempts` is inheritable, so "N attempts on
every question in this quiz" is one field they have not used.

**A correction to us.** `show_correctness` — "Show Results" — defaults to `always`. Per-question feedback
*is* immediate unless suppressed. What does not exist is a quiz-level summary. Wording in
`04-quiz-experience-spec.md` tightened accordingly.

**The finding that changes the plan.** The results screen is a **frontend plugin, not a fork**. The learner
can read their own subsection score from `GET /api/course_home/progress/{course_id}`
(`permission_classes = (IsAuthenticated,)`), and `sequence_bottom_navigation.v1` receives `sequenceId`, so
there is a supported place to render it below the questions. Every subsection route under `/api/grades/v1/`
is staff-gated, which is why this looks impossible from the obvious direction. Three constraints carried
into the spec: no slot fires on *leaving* a subsection, so last-unit detection is ours; the endpoint is
declared unstable and toggle-gated, so the screen must degrade to "see the Progress tab"; and scores are
recomputed asynchronously, which makes the **`Pending` variant of `LMS / Quiz · Results` required rather
than defensive**.

**Two things worth carrying into the conversation.** Reset does **not** refund an attempt — `self.attempts`
is incremented in exactly one place in `capa_block.py`, inside submit, and `reset_problem()` never touches
it; copy on *Retry incorrect* must not imply otherwise. And a whole-subsection reset *does* exist staff-side
via `reset_student_attempts()`, which recurses into children.

Recorded in `session-log.md` with file and line citations, and in `04-quiz-experience-spec.md` §10.

## 2026-08-03 · Scope correction — the panel is post-enrolment

**The learner panel never serves an unenrolled course.** Enrolment happens on the site and in the
catalogue; a course reaches this panel only once the learner is enrolled, so `is_enrolled` is always true
on the Course Detail page. The unenrolled and anonymous states drawn earlier the same day were the wrong
surface. They are kept in Figma at the foot of the section under *Out of scope — states the learner panel
never serves*, renamed `OUT OF SCOPE · …`, because they document the boundary — not as work to build.

What it changes, beyond deleting a row of frames from the plan:

- The **anonymous / unenrolled column** of the visibility matrix describes the platform, not us. Only the
  enrolled and staff columns bind. Noted on the matrix in Figma and in `course-details-metadata-map.md` §6.
- **`enroll_alert` never renders here.**
- **The 401s never happen.** Progress and Dates are reachable for every user of this page, so the tab bar
  always renders in full — which firms up the tab decision rather than weakening it.
- **`lms_web_url` is always populated**, so syllabus titles are always links. The "not links, not disabled
  links" nuance is a platform fact, not a state we draw.

**The enrolled lifecycle drawn in their place** — three values, three frames, alongside v10 as the
in-progress state:

- **Never started** (`resume_course.has_visited_course: false`) — 0%, *Start course*, no eyebrow because
  there is no last topic to go to, *0 of 42 topics*, nothing ticked, every module marker neutral. Blue
  reads as *in progress*, and nothing is.
- **Completed** (`cert_data`) — 100%, every topic ticked, every marker green, the last module unlocked,
  *Revisit the course*. The certificate card flips to its issued state: course title,
  `certificate_available_date`, and **View** / **Download** from `cert_web_view_url` and `download_url`.
  Those two URLs are precisely why the certificate works as a card — they are actions, not a destination.
- **Course ended** (`has_ended: true`) — progress freezes, *Review the course*, and the update banner
  becomes an archive notice in the platform's own terms. **Not dismissible**: a dismissible warning about
  a permanent condition is a warning that disappears. The unlock tooltip goes with it — its date is in the
  past and it never had a field behind it.

**Mentor card corrected against decision 007.** It read *"Office hours every Tuesday at 11 AM"* with a
**Book session** button. Decision 007 is accepted and says the opposite — mentoring is unlimited 1:1
**asynchronous messaging**, not scheduled sessions, one mentor assigned at enrolment — and BR-19 sets the
copy: *typically responds within 1 day*. The card is now a single **Message** action plus the SLA line, on
v10 and all three states. v9 keeps the old copy as the record of what the workshop saw. It does not fix the
card's other problem: there is still no mentor field anywhere in the API.

## 2026-08-03 · Course Page metadata applied — Course Detail v10

SK-11378 landed (`_media/Course_metadata.xlsx`): 73 fields, eight endpoints with real payloads from
`course-v1:SkillUp+SQL-TMDA+2025_B13`, 33 features, and a role-based visibility matrix. Full
element-by-element mapping in [course-details-metadata-map.md](course-details-metadata-map.md); the
delivery is logged in `session-log.md`.

- **`Course Detail — v10 · metadata applied (SK-11378)`** built in Platform Pages V8, alongside v9 and
  the workshop panel, which are untouched. Two annotation panels added: **metadata audit** (what has
  data behind it) and **what changed**.
- **Tabs settled — against the room.** `tabs[]` returns Course, Progress, Dates, **Mentorship Q&A** and
  Instructor. No Resources tab, no Grades tab, **no Certificates tab** — grades sit inside Progress and
  the certificate is a card. v10 renders the four a learner receives; Instructor is per-user and staff
  only. This closes the divergence flagged on v9, and it contradicts what Navdeep expected (01:32:08).
- **Syllabus collapsed to Module → Topic.** Their `sequential` level is a fixed three-part bucket —
  *About*, *Lessons*, *Knowledge Check* — repeated in every module, not a lesson. Read literally the
  accordion would say *Module 1 → Lessons → 15 topics* with two dead rows above it. The workshop's own
  fallback (*Module → Topic where a lesson does not exist*) covers it. Counts now read in topics.
- **Three elements added, each backed by a real field:** welcome message banner (`welcome_message_html`,
  dismissible), certificate card (`cert_data`, drawn not-earned to match 38%), handouts card
  (`handouts_html`) — which is what "course-level resources" turns out to be, the thing nobody could
  define at the workshop (01:19:44).
- **What has no data was kept and flagged, not deleted:** every duration on the page (`effort_time`,
  `effort_activities` and `due` are null on every block in every payload), the unlock tooltip
  (`accessible` is a boolean — no date, no prerequisite: that is the answer to open action 8, and it is
  a negative one), *What you'll learn* (no description or objectives field is exposed), the mentor card
  (no such record exists), the course image and the IBM logo (`org` returns `"SkillUp"`), and the topic
  type prefixes (`icon` has four values against our ten and returns only `other`).
- **Resume vs Start resolved** — `resume_course.has_visited_course`, closing an open workshop question.
- **Structural notes for dev:** the topic level is **not in the Outline API** (every sequential returns
  `children: []`) — it needs a second call to the Navigation API, cached one hour — and `lms_web_url` is
  null on verticals there, so topic deep-links must be constructed as `jump_to/{block_id}`.
- **Droppable with evidence:** `verified_mode`, `can_show_upgrade_sock`, `access_expiration` and `offer`
  all return null or false on the real course. Upgrade sock, discount banner and expiration warning are
  stock edX marketplace furniture this B2B configuration does not use.
- **Still unbuilt but backed by data:** dates widget, course tools (**Bookmarks** is in the live
  response), content search, weekly learning goal, and the ended / enrol / missed-deadline banners.
- **`Course Detail — Unenrolled (signed in, can enrol)`** drawn — the state sheet 4 names and nobody had
  ever drawn. The titles are **not links**: `lms_web_url` comes back null, so they render as plain text
  rather than as a disabled interactive style, which is the detail most likely to be built wrong. No
  ticks, no percentage, no lock. **Course is the only tab** — Progress and Dates answer 401, and a tab
  that returns an error is worse than a tab that is absent. The progress card becomes an enrolment card
  from `enroll_alert {can_enroll, extra_text}` and `course_modes[0].name`.
- **The three branches drawn too**, each turning on one value.
  **A · public access off** — `course_blocks` comes back empty, so the syllabus is not a locked list, it is
  nothing; *"4 modules · 42 topics"* goes with it, since those counts are derived from the tree, and the hero
  statistics line is hidden rather than zeroed; the card drops to *"Self-paced"*, the only shape fact that
  survives because `is_self_paced` comes from the metadata call. About a third of the enrolled page.
  **B · anonymous** — `username` null: the Learn and Progress groups and the account chip give way to Sign in
  and Create an account, the breadcrumb loses *My Learning*, Enrol becomes Sign in with the return path
  stated, and the mentor's actions go. A and B compound.
  **C · `can_enroll: false`** — the primary action **disappears rather than being disabled**, and
  `extra_text` takes its place (*"This course is full."*). A disabled button would invite a click that cannot
  succeed and would not say why; the sentence does both jobs.
- **The certificate stays a card, and the reasoning is now written down.** `cert_data` is four fields —
  a card's worth, not a page's; Certificates already exists as an account-level destination in the left
  nav, so a course tab duplicates it; and Harpreet's own marketing argument (01:31:57) favours something
  *seen* over something a click away. It becomes a tab when there is a credential page behind it —
  preview, share, verification link, name on certificate — which is phase two. To confirm at review.
- **The whole thing is documented on the canvas.** The section is renamed *Course Detail — v9, v10,
  unenrolled, and the SK-11378 documentation* and carries four reference tables under
  *Reference — Course Page metadata, SK-11378*: element → field (36 rows, with a ✅ / ◑ / ⚠︎ / ✗ verdict
  on each), the eight endpoints with payloads and caching, the role-based visibility matrix, and a
  decisions-and-open-questions table naming owners. Node IDs listed in
  [course-details-metadata-map.md](course-details-metadata-map.md) §10.

## 2026-08-03 · Results screen rebuilt, and the retry question settled

- **`LMS / Quiz · Results`** — four variants (Passed, Not passed, Pending, Withheld) on the layout from
  the prototype, which was better than what the DS had. No per-question circles; no dash standing in
  for an absent score; and the attempts line now says what it counts — *"1 question still has attempts
  left"* rather than the ambiguous *"4 attempts · Unlimited retakes"*.
- **Retry incorrect vs Retake quiz — the assumption was backwards.** Neither exists as an edX feature,
  but attempts are counted **per problem**, so re-answering only the wrong ones is essentially native;
  what is missing is a UI that collects them. The *full* retake is the invented one: there is no
  subsection attempt object, and `reset_problem()` does not refund a spent attempt, so a retake burns
  one on questions the learner already got right. `Retry incorrect` is therefore the **primary**
  action and `Retake quiz` the secondary — drawing them the other way round would make the expensive
  path look like the default.
- **Answer inputs rebuilt on the DS.** Dropdown now uses the DS `Select`, numerical and text use
  `Input field`, so focus, disabled and destructive states come from the design system. Dropped the
  destructive styling on incorrect: it turns the *answer-format hint* red, which implies the format
  was wrong when the learner may have had the format right and the value wrong.
- **New Figma section `04.4 · Pass mark — a target, not a gate`** — the Coursera rail reconstructed,
  what Open edX gives us (nothing), and DO/DON'T copy examples.
- **"Review lesson first" is buildable.** The vendor's "linking is not possible" applies to content
  authored inside the problem block. Our shell resolves the parent module from course structure, so
  the affordance stands — it just must never be authored into feedback.
- **Open with the vendor:** is Show Reset Button enabled, and what Maximum Attempts are set per
  problem? Those decide whether a full retake is reachable at all. Recorded in `session-log.md`.

## 2026-08-03 · Quiz screen matrix — and a pass mark that does not exist

New **`quizzes/06-quiz-screen-matrix.md`**: crosses the platform settings into the finite set of
learner-reachable screens. 14 question states, 15 quiz states, a 32-screen inventory marked built vs
to-build, flows per type, and the combinations that cannot happen. **Nine of thirty-two are built** —
and the gap is not the exotic cases, it is the locked, closed and withheld states, which is where
learners get stuck and support tickets come from.

Source research against `edx-platform`, `xblocks-contrib`, `frontend-app-authoring`,
`frontend-lib-special-exams` and `edx-proctoring` on `master`:

- **⚠︎ There is no pass mark at quiz level.** `GRADE_CUTOFFS` is course-wide; a subsection has no
  passing threshold. Our screens say "Pass mark 70%", "You needed 60% to pass", "Passed" / "Not
  passed" — **none of it comes from the platform.** Either the per-quiz verdict goes, or the pass mark
  becomes authored metadata we require from content. Biggest gap between what we drew and what the
  backend can answer.
- **⚠︎ `grading_method`** (last / first / highest / average score) renders *"Grading method: Last
  Score"* to learners and is **absent from the educator docs entirely**. Our "best score kept" copy
  must match the configured method, not assume it.
- **A timer forces the whole exam experience** — entry gate, End My Exam, staff-only reset. There is
  no such thing as "a 10-minute quiz" without inheriting the exam UX.
- **True/False is not a separate type** — it is single select with two choices. The picker has exactly
  five: single select, multi-select, dropdown, numerical input, text input.
- **Hints are paginated** — *"Hint (1 of 3):"* with a Next Hint control. We built a single block.
- **`max_attempts = 0`** is a survey question: closed from first render, but Save and Reset stay.
- **Corrected `01-edx-quiz-capabilities.md`**: two Show Answer rows were swapped. `attempted` means
  "attempted OR past due" (Studio labels it "Attempted or Past Due"); `attempted_no_past_due` is the
  one labelled "Attempted". Also `answered` means *correct*, not answered, and the default is
  `finished`.

## 2026-07-30 · Two vendor sessions — quiz types confirmed, Course Page data requested

New **`session-log.md`** — a record of who said what, when, and how sure they were, with every
capability claim tagged CONFIRMED / ASSERTED / CONFLICT / UNVERIFIED. The specs say what we decided;
this says where it came from.

- **Quiz question types — RESOLVED** (Studio walkthrough with Simran Jindal). Multiple choice (~90%
  of usage), checkbox, multiple choice / checkboxes **with hints and feedback** (being adopted now),
  dropdown (rare), numerical input (rare). Staff graded points is an assignment, not a quiz. Closes
  the workshop's action 4. Detail in `quizzes/04-quiz-experience-spec.md` §9.
- **Hints are a design gap.** We built feedback but not hints. They are different moments: a hint is
  the recovery path *inside* an attempt, feedback is the explanation *after* it.
- **"Unlimited retakes" is not a thing.** Open edX has no unlimited setting; authors set a high
  number, and an unset timed exam defaults to **one** attempt. Our screens must stop claiming it.
- **Linking from a quiz to a module is not possible in authored content** — not in questions, not in
  feedback. This does *not* kill our "Review module first" button: that is shell chrome resolved from
  course structure, not authored text. Recorded so nobody reads the limit too broadly.
- **⚠︎ CONFLICT on navigation.** The vendor believes restricting question-skipping "should be
  possible" but has never done it. Our source research says it is not configurable at any level.
  Nelson now has dev-environment access — verify before either side plans on it.
- **Course Page metadata requested** — Jira **SK-11378** (Critical, Sprint 111, information-gathering
  only, no acceptance criteria). Metadata, API payloads, feature inventory and supporting docs, plus a
  Studio course-structure export in Excel. Expected Tue/Wed; the developer has two days. The Course
  Page design stays blocked until at least the metadata section lands.

## 2026-07-30 · Quiz navigation researched — and a data-loss risk found

Asked whether Open edX lets a course team control moving back and forth between questions before
submitting. Researched against `edx-platform`, `frontend-app-learning`, `frontend-lib-special-exams`
and docs.openedx.org. Full record in `quizzes/04-quiz-experience-spec.md` §8.

- **No such setting exists, at any granularity.** Navigation inside a subsection is always free-form.
  `hide_from_toc` only blocks *leaving* the subsection (and is a section-level, operator-gated flag
  absent from the new authoring MFE); timed/proctored exams add a timer and an entry gate but leave
  navigation untouched; prerequisites gate whole subsections. Nothing in `capa_block.py`.
- **The real finding: an unsubmitted answer is silently lost on navigation.** There is no autosave and
  no unload guard, and `should_show_save_button()` returns False when attempts are unlimited — so on
  the **practice** path there is not even a Save button. Graded (2 attempts) and Final (1) do get one,
  but only via a manual click. The learner's *position* is remembered; the answer is not.
- **Consequence:** this is ours to solve in the shell, not a platform setting to configure. The shell
  holds unsubmitted selections in client state and calls `problem_check` only on submit; edX's own
  Save affordance must never be surfaced; and the "still unanswered" counter must be computed from
  submitted answers so it cannot over-report.
- **So "can the learner go back?" is a product choice we implement**, not a toggle we switch. Free
  review is the platform default and the accessible behaviour; restricting it is custom work and
  should be justified against that cost.

## 2026-07-30 · Quiz progress moved inside the quiz container

- `LMS / Quiz · Question Card` now carries the progress row at the top, behind a **`Show progress`**
  boolean (default true), so progress sits in the same box as Skip/Submit. The four standalone
  progress instances above the card (three flows + canonical) were removed to avoid duplication.
- Rationale: inside the box reads as *within the quiz*, outside as *between topics*. The same rule
  answers the "navigation is confusing" report — two paginations competing in one visual plane.
- **Per-question circles marked `_Remove` in the DS.** `LMS / Quiz · Rail Item` → `_Remove · LMS /
  Quiz · Rail Item`, and the `Questions Progress` variation `Quiz · Progress Rail` → `_Remove ·
  Progress Rail`. Verified zero instances of either before renaming, so nothing broke. They are
  marked rather than deleted so a stray reference surfaces loudly; delete once nothing points at them.
  This closes the question for good: the circles are gone as a progress indicator *and* as a review
  interaction, not just relocated.

## 2026-07-29 · Stakeholder workshop — quiz + Course Details decisions applied

Applied the decisions from the ICP workshop with Navdeep and Harpreet (see
`topic-types-inventory.md` §8 for the full record and the rationale).

Verified line by line against the meeting recording — the AI-generated notes were wrong on two
points (the prefix decision was stronger than "don't hardcode"; tabs were *not* left undecided).

- **Quiz — prefix functionality removed entirely.** Not just switched off: the `Show prefix` and
  `Prefix` properties and the prefix layer are deleted from `LMS / Quiz · Option Row`. Navdeep:
  *"We should not provide any functionality of putting a prefix to them"* — a switch nobody will use
  is still dev cost. Reason prefixes are wrong at all: they break option randomisation.
- **Quiz — Disabled state fixed** in the DS (`LMS / Quiz · Option Row`): the row keeps its white
  surface and full-contrast label, only the checkbox/radio is dimmed. Greying the whole row hurt
  readability exactly when learners read the feedback.
- **Quiz — optional metadata rule documented** (duration, attempts, pass mark): render only when the
  backend supplies them; no placeholders, no dashes, no zeros.
- **Course Details rebuilt** as `Course Detail — v9 · Self-paced MVP` (Platform Pages V8), with the
  pre-workshop frame kept alongside as *superseded*. Example course switched to **Six Sigma** to match
  the ICP. Self-paced only; syllabus runs Module → Lesson → Topic with clickable titles; ticks only
  (no current-position marker); no syllabus page, no module-level %, no repeated completion dates, no
  L1/L2/L3 numbering, no course-level resources or assignment deadlines, no cohort/programme cards.
  Unlock info moved from the module subtitle into a tooltip on the lock, and "Locks" corrected to
  "Unlocks". Course stats moved out of the hero to sit under Course Info.
- **⚠︎ Known divergence — tabs.** The workshop decided the tab mechanism stays with Resources and
  Grade as phase two, and expected Grades + Certificates as tabs. The v9 frame is a single page. Kept
  deliberately as an MVP simplification, flagged on the frame and to be agreed at the review.
- **Also applied** (decided in the room, absent from the AI notes): "View submission" and "See
  feedback" are now the same tertiary button; "Submit — final" is now "Submit"; **em dashes removed
  from quiz interface copy** (results heading, description, question text, topic headers, inline
  alerts); the quiz progress now uses the new `Quiz · Progress Bar` variant; the prefix demo column is
  retired. Verified as already correct: "Review module first" was secondary, radio/checkbox literal.
- **Em dashes swept from all components and screens** — 85 text nodes across the ICP screens, 35
  across the LMS component library, each rewritten with the punctuation the sentence needed rather
  than a blind substitution. Canvas annotations and the Untitled UI stock pages were left alone. The
  `Results Summary` pending state no longer shows a bare dash for an unknown score; it reads
  **Pending**.
- **Quiz paginator semantics recorded:** the percentage is **answered ÷ total, not position**, so
  reviewing an earlier question never shrinks the bar. The DS placeholder had three different numbers
  in one component (label 2 of 5, text 67%, bar 70%); all four instances are now consistent.
- **Stock `Progress bar` component fixed** (`1085:57382`, 55 variants). Its `Label=False` family
  mapped the fill from 44 px at 0% to 320 px at 100% instead of 0 to 320, so every value read high and
  the error grew as the percentage fell: 50% drew 57.5%, 20% drew 31.6%, and **0% drew a 13.8% stub**
  of progress for a learner who had answered nothing. Not a scaling problem — the master ratios were
  wrong. All 11 variants re-cut, the 0% sliver removed from the four labelled families, all 55
  verified accurate. Affects every progress bar in the product, not just the quiz. The quiz paginator
  itself uses `Label=Right`, whose ratios were already true — only its 0% sliver needed clearing.
  Verified after publishing: canonical draws 50.4% on "Question 6 of 10", flows draw 20.1% on
  "Question 2 of 5".
- **Per-question circles — resolved.** They were briefly contested: the workshop dropped them, then
  the stepper decision made them the navigator. The new `Quiz · Progress Bar` variant settles it by
  delivering exactly what the room asked for (question X of Y plus a bar) while the stepper's
  Previous/Next carries the navigation the dots used to. The circles are out, in the DS and the
  prototype. No further ruling needed.
- **Still outstanding on the quiz:** "Review module first" must hide when the quiz has no linked
  module; the score colour rules are unspecified (red vs amber for a fail unresolved); and the
  `Results Summary` component still carries the em-dash heading as its library default.
- **Licence (CC) scope** — validated against docs.openedx.org: edX shows the *course* licence at the
  bottom of every content page plus an optional per-video licence on the player. Interim: Video only;
  final scope pending a product decision.

Open after the workshop: course-unlocking research, the definitive quiz question-type list,
interface copy rules, DS differentiation of buttons/links/pills/tags, micro-animations, navigation
strategy, and edX metadata export.

## 2026-07-29 · Quiz layout corrected — a stepper, not a forced scroll

A platform claim this package had been repeating was **wrong**, and the design that followed from it
is reversed. The spec asserted Open edX forces a single stacked scroll because "a unit stacks
multiple components". Checked against primary sources (docs.openedx.org, the Open edX glossary,
`frontend-app-learning` ADR 0002 and its `SequenceNavigation` components), that inference does not
hold — and it contradicted this package's own definition of Subsection.

- **The subsection *is* the quiz-level container** — grading, timed/proctored config, navigation.
- **The platform ships a stepper.** `SequenceNavigation` renders one tab per unit plus
  Previous/Next; the glossary defines the *"unit navigation bar… an icon for each unit in the
  selected subsection"*; `{current} of {total}` is already computed. **One `problem` per unit yields
  a question-by-question stepper natively, with no custom code.** Stepper vs. scroll is an
  **authoring** choice, not a platform limit.
- **What Open edX genuinely lacks** is narrower: no per-question counter, no quiz-level submit-all,
  no end-of-quiz review/summary screen. Our shell supplies all three.
- **Decision — adopt the stepper.** Applied in the prototype: entry header → one question per step
  (unit navigator + Previous/Next question) → results summary; submit stays per question. Recorded
  in `topic-types-inventory.md` §8 and `quizzes/04-quiz-experience-spec.md` §1.4-0c/0d.
- **Competitive comparison added** (`quizzes/02-coursera-quiz-benchmark.md` §7): Coursera is
  single-scroll, Udemy and LinkedIn are steppers, Canvas and Moodle make it an instructor setting.
  Coursera's no-navigator minimalism is affordable only because retries are effectively unlimited —
  **our graded path allows 2 attempts at the whole quiz**, so that trade does not transfer.
  *(Corrected 3 Aug 2026 — this line originally read "per question". An attempt is one run through
  the quiz. See `quizzes/04-quiz-experience-spec.md` §9.3.)*
- **Briefly conflicted with a workshop ruling, now resolved.** The room had decided to drop the
  per-question circle indicators, while the quiz was one scroll and the dots were decoration. The
  stepper turned them into the navigator, which reopened the question. The new `Quiz · Progress Bar`
  variant closes it: the room's ask (question X of Y plus a bar) is what ships, and Previous/Next
  carries the navigation. Circles out, in both the DS and the prototype.
- **Consequence to plan:** existing quizzes must be **re-authored in Studio**, one question per unit.
  Content migration to sequence and cost with Rashid.

## 2026-07-29 · Encyclopedia reframe — two tracks (ICP + LMS) + Archive

Reframed the repo/hub as the **project encyclopedia** around the two big tracks:

- **ICP** — Immersive & Content Types (the in-topic experience) · **LMS** — Platform Pages
  (dashboard, my learning, course/program, calendar, live sessions) · **Foundations** — Design
  System / decisions / research (serves both).
- **Track nomenclature retired A/B → ICP / LMS / Foundations** across the decision log (23 ADRs
  reclassified + INDEX filter-by-track), root README, and hub.
- **`06-v8-complementary/` → `06-platform-pages/`** — now the LMS-track home; V8 Complementary is
  its current WIP artifact.
- **Hub `index.html`** reorganized into ICP · LMS · Foundations · Open Actions · Archive sections;
  Track filter is now ICP / LMS / Foundations.
- **Archive** — the old **v1.8** discovery-hub snapshot moved to `archive/index.html` (linked from
  the hub), so the index shows only the current version.

## 2026-07-28 · Repository reorganization (structure, not a DS version)

Folder-level reorg — the DS version of record stays **v3.3**. Made the workspace self-explanatory
for three audiences (stakeholder / designer / dev):

- **New numbered structure at root:** `00-decisions/` (23 ADRs + INDEX, backboned from Figma
  `3832-18102`), `01-ready-for-dev/`, `02-content-types/` (wires `topic-types-inventory.md`, splits
  §7 into owned questions, promotes the 10-point registration rule), `03-design-system/` (rationale +
  footer-contract; points to the shipped tokens here), `04-research/`, `05-source-docs/`,
  `06-platform-pages/` (Track B). `LMS-HANDOFF/` kept as the deployed package (hybrid).
- **New registers:** root `README.md` (3-audience "start here"), `OPEN-ACTIONS.md`,
  `_archive/ARCHIVE-LOG.md`.
- **Heavy media** (456 MB `.mov`, Coursera captures, 7.9 MB HTML) → `_media/` (gitignored) + stubs.
- **Archived:** `Prework/` (intact — handed to another team), 5 `verify-*.png`, `session-ocr-partial.md`.
- **Stale fixed:** the "NOT YET PUBLISHED" caveats on v3.0/v3.1/v3.3 (published 2026-07-24); the old
  Figma slug in README/BA; "132 components" → ≈155 (recount pending); removed the orphan
  `design-system/maven-icons/` duplicate.
- **Hub (`index.html`):** audience (Stakeholder/Designer/Dev) + track (A/B) filters, This-Week
  Decisions · Ready-for-Dev · Open-Actions sections, status legend, hub-stale banner.

## v3.3 — 2026-07-24 (current) · Accessibility layer + softer decorative borders

> ✅ **PUBLISHED IN FIGMA 2026-07-24.** 1052 variables · 18 CVD primitives · verified 1:1 against
> `tokens/colors.css` (zero divergences). The earlier "DS variables changed, consumers still see
> v2.0" blocker is **resolved** — the triangle (Figma DS · CSS handoff · prototype) is aligned.

### Accessibility Standards (see `variable-collections-guide.md`)

Three axes orthogonal to skin and theme, documented on the Figma page **`♿ Accessibility Standards`**:

- **Colourblind-safe states** (`data-vision="cvd"`) — retunes success/warning/error to an
  Okabe-Ito red-green-safe palette. State colours collapse under CVD (warning ≈ error, ΔE 3.9 for
  deuteranopes); the safe palette separates by blue-yellow + lightness (ΔE ≥ 18), all tiers AA.
  **18 new primitives** `Colors/SKO-Brand/CVD/*`, verified 1:1 against the prototype CSS. The
  `[data-vision]` override lives in CSS (Figma can't conditionally alias across axes).
- **Text size** (`data-text-size`, `--sk-font-scale`) — 100 / 115 / 130%, `.sk-text-*` via calc.
- **Behaviour flags** — reduce-motion, underline-links, large-targets. CSS-only, never variables.

Implemented and running in the prototype (demo panel → Accessibility Standards). Prototype-first;
the DS codifies the values + documents the mechanism.

### Softer decorative borders

`border-secondary` was too heavy (N04). Softened both modes: light → `Neutral/150` (`#d5dce2`),
dark → `Dark-Neutral/650` (`#2c3d45`). Decorative border, exempt from the 3:1 non-text rule.

## v3.1 — 2026-07-22 · Prototype sync — attribute, solid tokens, video stage

> ✅ Published as part of the v3.3 library release (2026-07-24).

Aligns the DS with the deployed prototype (`lms-prototype-mu.vercel.app`), which already consumed
`--sk-*`. A full diff (408 → now 456 comparisons) drove the changes below. See
`modules/skin-switcher/PROTOTYPE-SYNC.md` for the prototype-side work.

### ⚠️ Breaking

- **Attribute `data-brand` → `data-skin`.** The prototype uses `data-skin`; the DS aligned to it
  (lower friction — the DS side wasn't published). `colors.css` and the skin-switcher module both
  updated. Markup using `data-brand` now silently falls back to SKO.

### New tokens (created in Figma)

Rule applied: DS is the source, tokens mirror both ways, and a *fundamental* prototype-only token
is created in the DS too.

- **`bg-success-solid` + `fg-success-on-solid`**, **`bg-warning-solid` + `fg-warning-on-solid`** —
  the prototype had success/warning solid fills but the DS only had `bg-error-solid`. Created to
  complete the triad. The prototype's `warning-solid` (`#ac7720`) failed AA with *any* label
  (white 3.88, dark 3.95); the DS uses `#f9c654` (Yellow/300) with a dark label, 9.64:1.
- **`bg-brand-stage`** — the video-stage backdrop. The prototype derived it as
  `color-mix(#26708e 58%, #000)` with the teal **hardcoded**, so it was dark teal in every skin
  (a bug). In the DS it follows the skin (each ramp's step 900) and is theme-stable.

### Not mirrored (with reason)

- **`fg-like`** — resolves to `#0086c9`, which *is* `fg-progress`. A semantic duplicate, not
  created. The prototype should point `fg-like` at `fg-progress`.

### Prototype still to do

The prototype must adopt `colors.css` v3.1 wholesale — its brand colours are still derived with
`color-mix()` from an anchor instead of using validated ramp steps, which reintroduces the
dark-hover-darkens bug fixed in v3.0. Three DS tokens are also absent there, including
`border-focus-ring` (WCAG 2.4.7). Full checklist in `PROTOTYPE-SYNC.md`.

### Validation

38 LMS tokens · 456 Figma↔CSS comparisons, 0 divergences · 552 contrast checks, 0 AA failures.

## v3.0 — 2026-07-22 · Skin system, dark surface ladder, primitive-layer cleanup

> ✅ **PUBLISHED IN FIGMA 2026-07-24** (as part of the v3.3 library release). Consumers now see
> v3.x. One residual nuance, non-blocking: the visual changes were validated by contrast maths and
> published on Nelson's call — a formal human side-by-side review of the 6 skins was never run.

Triggered by a review of the DS against dark-theme best practice. What started as a colour audit
surfaced structural problems: the skins were hand-picked values with no rule, and the primitive
layer carried role names instead of values.

### ⚠️ Breaking

- **`[data-brand="x"]` no longer exists.** The green demo BrandX was replaced by 5 named skins:
  `gold`, `violet`, `sky`, `red`, `ink`. Markup using `data-brand="x"` silently falls back to SKO.
  New usage: `<html data-brand="ink" data-theme="dark">`.
- **Light-mode text is visibly darker.** `text-secondary`, `text-tertiary`, `text-brand` and
  `text-brand-secondary` all changed. This affects every screen — see "Text hierarchy" below.

### Skin system — from hand-picked to systematic

The 5 non-SKO skins had **42 of 60 values as raw hex**, bypassing the primitive layer entirely.
Only SKO was fully aliased. Each skin now has a **12-step ramp generated in OKLCH** from two
preserved brand anchors (`solid-dark` = 400, `solid-light` = 600), plus 2 deliberately desaturated
surface anchors outside the ramp.

Roles map to fixed positions — no per-skin choices. **0 raw hex values remain.**

This was not cosmetic: the Ink skin's brand text sat at **3.50:1**, below even the 3:1 floor. It
failed because the value was picked by hand. With `text-dark` fixed at step 300, that class of bug
cannot recur.

### Dark mode

- **Surface ladder implemented.** The v1.9 "known limitation" (`bg-secondary` = `bg-primary`, both
  `#212934`) is resolved — 4 distinct surfaces ~1.07:1 apart (`Dark-Neutral/950→700`).
- **Hover now lightens** (step 300) instead of darkening. 5 of 6 skins were darkening on hover,
  which sinks the control against the surface.
- `bg-error-solid` desaturates in dark (`#E26567`) with a dark label — it was the only token in the
  system that never inverted.

### Primitive layer — values, not roles

Role names were removed from `_Primitives`. `Surface-Base` → `Dark-Neutral/950`, `Teal-Text` →
`Dark/Teal/300`, and so on. `Primary` and `Neutral` were numbered by luminosity in the
`{step}_{brand_code}` format the accent ramps already used — brand-guideline codes are preserved.

The single exception is **surfaces**, and it is measured, not convenience: every dark surface falls
below the darkest step of the ramp it would belong to. They live in explicit `Surfaces/` groups.

### Text hierarchy (light)

`bg-tertiary` (`#E1E7EC`) imposes a ceiling of L ≈ 40% on any text over it. The old values were
above that ceiling and failed AA. Two new interpolated Neutral steps were created to fix it:

| token | was | now | worst case |
|---|---|---|---|
| `text-secondary` | `#606B7A` | `#39414C` — `Neutral/800` | 4.34 → **8.28** |
| `text-tertiary` | `#677482` | `#4F5B69` — `Neutral/700` | 3.83 → **5.55** |
| `text-brand` + `-secondary` | brand step 600 | brand step **700** (950 on Ink) | 4.29 → **6.13+** |
| `text-error-primary` (light) | `#DA3336` | `#B62226` — `Red/600_AC3` | 3.74 → **5.19** |
| `text-error-primary` (dark) | `#E8797B` | `#F3AFB0` — `Red/50` | 4.34 → **6.74** |

**Side effect worth naming:** `text-secondary` and `text-tertiary` were 3pp of luminosity apart —
visually the same colour. The hierarchy existed in the tokens but not on screen. They are now 10pp
apart, and primary→secondary 13pp.

### Validation

Contrast coverage went from **16 checks to 540** (9 text tokens × 4 surfaces × 12 skin/mode
combinations, plus 9 explicit semantic pairs). **0 AA failures.**

The v1.9 claim of "16/16 AA per mode" was true but far too narrow — it only tested against
`bg-primary`. Testing against elevated surfaces is what exposed every failure fixed above.

**Validation must auto-discover tokens from `tokens/colors.css`, never from a hand-written pair
list.** Hand-written lists missed tokens three times during this work; the last miss caught
`text-brand-primary` and `text-brand-secondary`, never tested before.

Thinnest pair in the system: `text-success-primary` over `bg-tertiary` in light = **4.51:1**.
Passes by 0.01 — re-validate if either value moves.

### Removed

`!!! ABOUT THIS COLLECTION` (4, content preserved in `variable-collections-guide.md`) ·
`Dark/Teal-Solid` (orphan) · `Skins/Font/family-*` (2, dead duplicates of `Type/family/*`) ·
`Dark/Teal-Hover` (absorbed into `Teal/300`) · `Dark/{Success,Warning,Progress}` (repointed to their
accent ramps) · `hover_Y01_Yellow_Hover` (redundant alias) · 7 orphaned `Skin-Anchors`.

### Unchanged

- Typography tokens and the 47 text styles — untouched.
- Brand-guideline codes (`P01`–`P08`, `N00`–`N06`, `AA`/`AB`/`AC`/`AD` accents) — preserved.
  Numbering is additive, never substitutive.
- Dark-mode neutral text values — only light mode was retuned.

### Known debt

- `Type/family/*` sits in the `3. Responsive` collection, whose mode axis is breakpoints. Font
  family does not vary by screen size. See `variable-collections-guide.md` for why it was not moved
  and what should trigger the fix.

## v2.0 — 2026-06-25 · Token consolidation (--sk- namespace)

Consolidation of the DS tokens following the Design System Discovery and the V7 Immersive token-modes work. Closes the token system.

### Changes
- **Namespace migrated `--lms-*` → `--sk-*`** across `tokens/colors.css` and `tokens/typography.css`. One system namespace for all brands (never per-brand prefixes). The `sk` is the SkillUp Design *System*, not the brand.
- **Typography fixed to Montserrat** (body + display). The previous Inter primary was stale; Inter is not used.
- **Model documented** (see `../03-design-system/rationale/`): brand × scheme combined colour modes (live v1.9); a separate Breakpoints axis (Desktop/Tablet/Mobile) for size/space/radius; font-size uses Option B (chaining) for brand × breakpoint; radius/border vary by brand via role tokens that re-alias per mode; hex only in Primitives.
- **New component:** Input field gains a `Search` type (14 derivations) + reusable `Keyboard key` component with a togglable `Shortcut` property (DS file).

### Unchanged
- The 4 colour modes and all WCAG 2.2 AA validations from v1.9 stand (only the prefix changed).

## v1.9 — 2026-06-16 · 4-mode tokens + WCAG 2.2 AA validated

LMS colour system now operates across 4 modes on the UUI DS file (`c7EUDrQwP8si08aPipDSIV`), collection `1. Color modes`. Every mode passes 16/16 WCAG 2.2 AA contrast checks.

### Modes implemented

| Mode | Strategy |
|---|---|
| Light SKO (default) | Existing teal-on-white. border-primary upgraded N04 → N03 for AA pass |
| Dark SKO | Inverted backgrounds + lighter blues for brand. 4 fixes applied |
| Light BrandX | Green scale AB01-AB06 mirrors SKO blue structure. Demo brand |
| Dark BrandX | Lighter greens (AB04-AB05) on dark neutrals |

### New tokens

- **`LMS/Border/border-focus-ring`** — semantic token for WCAG 2.4.7 Focus Visible. Maps to brand colour per mode (P03 Light SKO / P05 Dark SKO / AB02 Light BrandX / AB04 Dark BrandX).

### New primitive

- **`Colors/SKO-Brand/Accents/Red/AC5b_Red5b` #E8797B** — added to fill the gap between AC5 (saturated red, 4.39 on dark, fails AA by 0.11) and AC6 (pale pink). Gives 5.21:1 on dark. Used by `text-error-primary` in Dark SKO + Dark BrandX only.

### Key Dark SKO fixes

| Token | Was | Now | Reason |
|---|---|---|---|
| bg-brand-hover | Y01 Yellow (bug) | P02 Blue Ink | Leftover yellow from Light mode default |
| text-brand-secondary on badge | P05 (2.99) | P07 (7.5+) | Failed AA on bg-brand-section (P02) |
| bg-brand-solid + text-on-brand | P04 + White (3.94) | P05 + N01 dark (5.43) | Flipped contrast for dark mode button |
| border-primary | N04 (2.71) | N03 (4.20) | AA-compliant neutral |
| text-error-primary | AC5 (4.39) | AC5b (5.21) | New primitive |

### Token validation

DS swatch sheet at node `20022:429459`, page `❖ FOUNDATIONS`. Renders 4 columns side-by-side using `setExplicitVariableModeForCollection` — each column shows live token values + contrast ratio + ✓/✗ per check.

### Code consumption

`tokens/colors.css` now ships 4 mode definitions:
- `:root` → Light mode SKO (default)
- `[data-theme="dark"]` → Dark mode SKO
- `[data-brand="x"]` → Light mode BrandX
- `[data-brand="x"][data-theme="dark"]` → Dark mode BrandX

Toggle via root HTML attributes. No JS required — CSS attribute selectors handle the switch.

### Known limitations

- `bg-secondary` = `bg-primary` in Dark modes (no intermediate dark neutral in scale)
- BrandX is a demo brand. No client behind it.
- WCAG 2.5.8 Target Size validated in screens, not in DS.

## v1.8 — 2026-06-15 · DS migration + handoff page conventions

Major restructure of the Figma handoff. Three new pages built, 132 LMS Extension Components migrated to the DS library, all working-file handoff instances now point to DS-hosted masters.

### DS migration

- **132 LMS Extension Components moved** from working file (`Wz2TCYFVr0hD8tJNiLajLt`) to DS file (`c7EUDrQwP8si08aPipDSIV`) on new page `❖ LMS COMPONENTS ✅` (`1030:33572`)
- 40 top-level masters + 92 variants inside sets
- All instances in handoff screens swapped via `importComponentByKeyAsync` + `swapComponent` — 99.7% remote in Section 02
- Local backup copies kept on the working file Playground page for reference until next major DS sync
- Component keys saved in auto-memory `reference_uui_lms_components_keys.md`

### New variant: LMS / Empty State · Kind=Transcript

- Title: "Transcript not available"
- Body: "Captions aren't available for this video. You can still take notes from the Notes tab."
- Icon: align-left (DS 3463:406358)
- CTA: "Add note"
- Use when a Video topic has no captions — applied automatically on Transcript tab empty state

### New handoff pages

- **`↳ Phase 1 - Video Lesson - Ready for Dev ✅`** — 15 cards (5 rows × 3) with hierarchical numbering (1/1.2/1.3 for Transcript, 2/2.2/2.3 Notes, 3/3.2/3.3 Downloads, 4/4.2/4.3 Player states, 5/5.2/5.3 Note Editor Modal). Each card uses Handoff card header + Subheader + screen-wrap (#C6D0E3) + Page Changelog Header (slot-based).
- **`↳ Phase 1 - Overlay Panels - Ready for Dev ✅`** — 6 cards (2 rows × 3): Notifications D/T/M + Saved D/T/M.
- **`↳ Phase 3 - Completion + Certificate - WIP 🟠`** — 6 cards (2 rows × 3): Course Complete Modal D/T/M + Certificate D/T/M. All descriptions flagged as Phase 3 placeholders with Phase 1 baseline notes.
- **`↳ Diagram Flows + Business Logic`** — Navigation flow diagram + new Business Logic section: 42 Business Rules (8 domain cards), 10 Key Decisions callouts, 24 Reference Document links (BA + Formal + Engineering handoffs).

### Handoff page conventions (now enforced)

- Page name format: `       ↳ Phase X - Flow Domain - Status [emoji]`
- Outer section BG: `#B7B7B7` · screen-wrap inside cards: `#C6D0E3`
- Pages live under parent `READY FOR DEV ✅`, ordered by Phase then logical flow
- Saved to auto-memory `reference_handoff_page_conventions.md`

### DS contributions (Status badges + Card chrome)

- **Status badges** added to DS Design Annotations page: Status/Deferred (`19951:1957`), Status/Draft (`19951:1959`)
- **Handoff card header** promoted to DS component (`19952:1961`) with props: Sequence#0, Title#0, Status#0 (INSTANCE_SWAP), Phase#0 (INSTANCE_SWAP), Show Sequence#0 (BOOLEAN)
- **Page Changelog Header** uses native Figma SLOT primitive (Option D) for dynamic Recent Changes
- All keys saved in auto-memory `reference_uui_handoff_keys.md`

### Cleanup

- 10 inline Figma annotations migrated to Page Changelog descriptions, then removed
- Duplicate orphan card frames cleaned from Diagram Flows page
- Page-level Page Changelog Header removed — kept only per-card
- Figma Link hidden in all Subheaders (per Nelson's call)

**Deferred to Nelson**: 5 clones manual reflow (Cards 2.2/2.3 Notes Tablet/Mobile + 3.2/3.3 Downloads Tablet/Mobile + 5.2/5.3 Note Editor Tablet/Mobile). ⚠ warnings stay in descriptions until reflow done.

---

For v1.0 → v1.7 release notes, see [`history/CHANGELOG-archive.md`](history/CHANGELOG-archive.md).
