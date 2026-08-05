# Quiz Experience — Discovery Package

*Created 17-Jul-2026 · Feeds PRD 5.7 (Quizzes) / future FRD_ICP_5.7*

Exhaustive compilation of how quizzes/assessments work on our Open edX-based platform, what the platform allows us to build, benchmark inspiration, and the component/screen spec for dev handoff.

> **Start here if you are building or testing.** [08-two-modes.md](08-two-modes.md) defines the two quiz
> experiences — **A**, how it works today, and **B**, our proposal — as a single switch at quiz level, so
> both can run side by side on the same questions. Everything else in this folder is the evidence behind it.

## Reading order

| Doc | What it answers |
|---|---|
| [08-two-modes.md](08-two-modes.md) | **What are we building and testing?** The two modes as one per-quiz switch, the nine differences with what each costs on the real platform, what must be held constant for the comparison to mean anything, and the four questions a prototype answers better than a meeting. |
| [01-edx-quiz-capabilities.md](01-edx-quiz-capabilities.md) | **What can the platform do?** Every problem type, the full settings matrix (attempts, show-answer enum, hints, partial credit, randomization, visibility), scoring model, all learner-facing states, and the `render_xblock`/API integration options. |
| [02-coursera-quiz-benchmark.md](02-coursera-quiz-benchmark.md) | **What does great look like?** Coursera's assessment types, quiz flow, feedback/retry UX, in-video questions, grades integration, and the patterns worth stealing (fast feedback, next-step nudge, soft deadlines, draft safety). |
| [03-current-lms-quiz-audit.md](03-current-lms-quiz-audit.md) | **What do we have today?** Hands-on authenticated audit of SKOAIH01: architecture (MFE + iframe), quiz anatomy and real states, graded vs practice config, ORA flow, SCORM activities, Progress page, and the UX gaps. |
| [04-quiz-experience-spec.md](04-quiz-experience-spec.md) | **What do we build?** FRD-style spec: 19 features with BR/AC, component inventory with states, 11 screens, integration contract recommendation (hybrid), open questions. |
| [07-results-decisions.md](07-results-decisions.md) | **The three results-screen decisions.** Pass mark, stacked feedback, and "retry incorrect" — evidence from Coursera, Canvas, Moodle, Blackboard and D2L Brightspace, what each costs on Open edX, and a recommendation for each. Read before building the results screen. |
| [06-quiz-screen-matrix.md](06-quiz-screen-matrix.md) | **Which screens must exist?** Crosses the platform settings into the finite set of learner-reachable states: the three quiz types mapped to real edX settings, 14 question states, 15 quiz states, a 32-screen inventory marking built vs to-build, the flows per type, and the combinations that cannot happen. Start here when planning what to draw. |
| [05-ora-explained.md](05-ora-explained.md) | **What is ORA/ORA2?** Plain-language explainer of Open Response Assessment (peer-graded work), how the score is calculated, where we already use it — plus the ~20-state screen inventory it requires. Read before designing Final Project / Peer-graded Assignment. |

## Headline findings

1. **Architecture**: course shell = Learning MFE; every unit renders in an iframe via `render_xblock` on `courses.skillup.online`. Custom quiz UI ⇒ choose between iframe theming, native re-implementation against XBlock handlers, or hybrid (recommended: native for the 5 core CAPA types, iframe for SCORM/ORA).
2. **edX has no quiz-level submit** — each question is an independent problem with its own Submit/attempts/feedback. Entry header, progress and results must be built client-side. *(Verified in source Aug 4, 2026: the subsection block exposes only completion and navigation handlers. The results screen is a **frontend plugin**, not a fork — the learner can read their own subsection score from `/api/course_home/progress/{course_id}`, and `sequence_bottom_navigation.v1` is a supported place to render it. See `04-quiz-experience-spec.md` §10.4.)*
3. **Current config** (SKOAIH01): MCQ-only, graded quizzes = 2 attempts/question + Save, practice = unlimited, per-choice feedback authored, shuffle on, pass 70%, Graded Quiz 60% + Final Exam 40%, Final Project (ORA) ungraded, no timers.
4. **Biggest UX wins available**: pre-quiz context header, per-question progress, a results surface, and a loud draft-vs-submitted distinction — none require backend changes. *(Amended Aug 5, 2026. The draft-vs-submitted point turned out to be the sharpest: Save persists an answer without spending an attempt, but a saved answer scores **zero**, and nothing on the page says so — see `04-quiz-experience-spec.md` §8.2a. The "review lesson on a wrong answer" idea was dropped: the link can only resolve to the module, not to the lesson covering that question, so the label promised precision we cannot deliver. It survives in the entry header.)*
