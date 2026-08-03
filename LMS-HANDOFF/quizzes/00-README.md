# Quiz Experience — Discovery Package

*Created 17-Jul-2026 · Feeds PRD 5.7 (Quizzes) / future FRD_ICP_5.7*

Exhaustive compilation of how quizzes/assessments work on our Open edX-based platform, what the platform allows us to build, benchmark inspiration, and the component/screen spec for dev handoff.

## Reading order

| Doc | What it answers |
|---|---|
| [01-edx-quiz-capabilities.md](01-edx-quiz-capabilities.md) | **What can the platform do?** Every problem type, the full settings matrix (attempts, show-answer enum, hints, partial credit, randomization, visibility), scoring model, all learner-facing states, and the `render_xblock`/API integration options. |
| [02-coursera-quiz-benchmark.md](02-coursera-quiz-benchmark.md) | **What does great look like?** Coursera's assessment types, quiz flow, feedback/retry UX, in-video questions, grades integration, and the patterns worth stealing (fast feedback, next-step nudge, soft deadlines, draft safety). |
| [03-current-lms-quiz-audit.md](03-current-lms-quiz-audit.md) | **What do we have today?** Hands-on authenticated audit of SKOAIH01: architecture (MFE + iframe), quiz anatomy and real states, graded vs practice config, ORA flow, SCORM activities, Progress page, and the UX gaps. |
| [04-quiz-experience-spec.md](04-quiz-experience-spec.md) | **What do we build?** FRD-style spec: 19 features with BR/AC, component inventory with states, 11 screens, integration contract recommendation (hybrid), open questions. |
| [07-results-decisions.md](07-results-decisions.md) | **The three results-screen decisions.** Pass mark, stacked feedback, and "retry incorrect" — evidence from Coursera, Canvas, Moodle, Blackboard and D2L Brightspace, what each costs on Open edX, and a recommendation for each. Read before building the results screen. |
| [06-quiz-screen-matrix.md](06-quiz-screen-matrix.md) | **Which screens must exist?** Crosses the platform settings into the finite set of learner-reachable states: the three quiz types mapped to real edX settings, 14 question states, 15 quiz states, a 32-screen inventory marking built vs to-build, the flows per type, and the combinations that cannot happen. Start here when planning what to draw. |
| [05-ora-explained.md](05-ora-explained.md) | **What is ORA/ORA2?** Plain-language explainer of Open Response Assessment (peer-graded work), how the score is calculated, where we already use it — plus the ~20-state screen inventory it requires. Read before designing Final Project / Peer-graded Assignment. |

## Headline findings

1. **Architecture**: course shell = Learning MFE; every unit renders in an iframe via `render_xblock` on `courses.skillup.online`. Custom quiz UI ⇒ choose between iframe theming, native re-implementation against XBlock handlers, or hybrid (recommended: native for the 5 core CAPA types, iframe for SCORM/ORA).
2. **edX has no quiz-level submit** — each question is an independent problem with its own Submit/attempts/feedback. Entry header, progress rail and results summary must be built client-side.
3. **Current config** (SKOAIH01): MCQ-only, graded quizzes = 2 attempts/question + Save, practice = unlimited, per-choice feedback authored, shuffle on, pass 70%, Graded Quiz 60% + Final Exam 40%, Final Project (ORA) ungraded, no timers.
4. **Biggest UX wins available**: pre-quiz context header, in-quiz progress map, results summary with retry/review CTAs, loud draft-vs-submitted distinction, review-lesson links on wrong answers — none require backend changes.
