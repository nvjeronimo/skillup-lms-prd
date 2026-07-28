# Content Types — Open Questions (trackable)

The 12 open questions from [`../LMS-HANDOFF/topic-types-inventory.md`](../LMS-HANDOFF/topic-types-inventory.md) §7,
split into individually trackable items with owners. **Carried forward verbatim** — do not paraphrase
away the nuance. Also surfaced in [`../OPEN-ACTIONS.md`](../OPEN-ACTIONS.md) #13.

Status: 🔴 blocked · 🟠 discussing · ⚪ not started · ✅ answered

## Owner: Rupali / content team

| Q | Question | Status |
|---|---|---|
| Q1 | **"Scenario with options"** — SCORM, or a native branching component? | ⚪ |
| Q2 | **VILT** — which platform (Zoom / Teams / other), and is joining via LTI or an external link? | ⚪ |
| Q3 | **VILT** — who owns session metadata (date, join link, recording)? Is the recording authored separately? | ⚪ |
| Q4 | **VILT recording** — will a transcript be available, and does it get the same controls as a normal Video? *(flagged for **Navdeep**)* | ⚪ |
| Q5 | **Lab** — stay as notebook downloads, or move to a hosted environment (JupyterHub)? | ⚪ |
| Q6 | **Final Project** — one topic page or several? Is the composition fixed or per-course? | ⚪ |
| Q7 | **Role Play / Dialogue** — two features or one component in two modes? What does "requires AI integration" mean concretely? | ⚪ |
| Q8 | Of the ~28 Studio types — which are genuinely new vs authoring conveniences? | ⚪ |

## Owner: Rashid / devs

| Q | Question | Status |
|---|---|---|
| Q9 | **Do our units contain single or multiple components?** Determines one-screen-per-type vs a composable unit shell. → verify against a course export. | 🔴 needs SKOAIH01 export |
| Q10 | **How should topic type be resolved?** Today it's encoded in the display name ("Video: …"). Recommend unit **tags/taxonomy** so the player never parses titles. | 🟠 recommendation on table |
| Q11 | **Rendering strategy** — theme the `render_xblock` iframe, re-implement natively, or hybrid? (Recommendation: hybrid — see [`../LMS-HANDOFF/quizzes/04-quiz-experience-spec.md`](../LMS-HANDOFF/quizzes/04-quiz-experience-spec.md).) | 🟠 |
| Q12 | **How do we build Role Play / Dialogue / Programming Assignment** on an edX backend? (Build-or-buy — [OPEN-ACTIONS](../OPEN-ACTIONS.md) #10.) | 🔴 |
| Q13 | **Component-stacking in *our* courses** — platform limits verified (SCORM 1/unit, ORA 1/unit, Discussion unit-level). Remaining: do our units stack multiple components, and any >1 *graded* block per unit? → SKOAIH01 export. | 🔴 needs SKOAIH01 export (narrowed 2026-07-24) |

## New (surfaced 2026-07-28)

| Q | Question | Owner | Status |
|---|---|---|---|
| Q9-enum | **Enumeration prefix** — manual vs automatic numbering of answer options / ORA steps. | Rupali / Nelson | ⚪ |
