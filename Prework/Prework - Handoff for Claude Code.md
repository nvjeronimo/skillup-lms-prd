# Prework — Handoff for Claude Code

Session date: Jul 6–9, 2026. Owners: Nelson Jerónimo & Pintu Badal. Deliverable reviewed by: Harpreet (design lead), Rupali (delivery), Nilesh (platform), Navdeep, Kirti (messaging).

## 1. Context in one paragraph

SkillUp's VILT/blended programs have a 4–6 week gap between enrollment and orientation. Most drop-offs happen in that silent window. "Prework" (name not final) is a free, optional content container shown on the learner's locked program, plus an automated email sequence, designed to keep learners engaged until orientation. Positioning: "golden ticket" value-add ($1,000+ of content at $0), never homework, never a gate.

## 2. Locked decisions (from Jul 3 meeting — do not reopen)

1. Optional in Phase 1. Nothing blocks the program.
2. One-time release. No staggered drops in the pilot.
3. Content-agnostic container: linked course + coupon, PDFs, podcast, webinar link, NotebookLM case-study videos.
4. Independent entity: survives cohort date changes, progress never resets.
5. No live/instructor-led sessions inside prework.
6. "Prework" label is a placeholder. Kirti is researching naming (Nelson's candidate: "Preparation Track").
7. Two surfaces: current LMS (Pintu) and LMS 2.0 (Nelson). Same messaging, different facade.

## 3. Figma artifacts (all in one page)

File: `zKo6WL3yRZ8fXHfeGKREDt` (User DashBoard) · Page: "Prework – E2E Journey Flow" (`4176:361`)
https://www.figma.com/design/zKo6WL3yRZ8fXHfeGKREDt/User-DashBoard?node-id=4176-361

Reading order on the page (top to bottom):

| Frame | Node ID | Purpose |
|---|---|---|
| Executive Summary | 4195:361 | Problem / Solution / Value / Ask — CEO 60-second read |
| Learner Journey Map | 4183:362 | 6 stages, emotion curve (red = today, green = with prework) |
| End-to-End Workflow | 4176:362 | 5 phases × 3 lanes (email / platform / backend), scenarios A–D, open questions |
| Decision & Flow Map | 4188:361 | Flowchart: 4 decisions, reminder loop, risk branches |
| Learner Value | 4192:361 | $1,020 receipt-style value stack + benefits + messaging examples |
| Wireframes (12 screens) | 4215:361 | See below |

Wireframe node IDs:
E1 Welcome email `4215:365` · E2 Golden ticket `4215:367` · E3 Reminder `4215:369` · S1 Dashboard `4215:3183` · S2 Program page `4215:3185` · S3 Container expanded `4215:3187` · S4 Coupon modal `4215:3189` · S5 In-progress `4219:361` · S6 Completed `4219:398` · S7 Late joiner `4219:3245` · S8 Cohort pushed `4219:3269` · S9 Post cohort start `4219:3293`

## 4. Content model (for any prototype/implementation)

PreworkContainer: belongs to a program enrollment, independent of cohort dates.
States: locked-out (not enabled) / available / in-progress (n of m) / completed.
Items (each has icon, title, meta, action, done flag):
- video_series (case-study eps, each teasing a VILT session)
- pdf_guide (download)
- podcast (external link)
- webinar (register, dated)
- course_coupon (code e.g. SKILLUP-GOLD-2026, worth $400, opens external course, self-enroll)

Key rules: completing items never gates the program; container and progress survive cohort date changes; late joiners see everything with no "behind" messaging; value framing ($1,000+ / $0) appears in email + dashboard badge + program page banner only.

Demo data used everywhere (keep consistent): program "Digital Marketing Pro", orientation Aug 3, cohort start Aug 5, pushed-date scenario Sep 2, progress example 2/5, value stack $400+$250+$150+$120+$100 = $1,020.

## 5. Design language used in the diagrams/wireframes

Font Inter (Regular/Bold). Navy #134A6B (primary, r0.075 g0.286 b0.42), green #228C59 (value/free/success), amber #D99A1A (decisions/warnings), red #CC4033 (risk), light gray #E6EAEE (wireframe bars). Wireframes are deliberately minimal — no visual design yet, per Harpreet ("no designs, please").

## 6. Open placeholders (blockers for the review, not for code)

- [X]% drop-off rate in the gap — Rupali to confirm (sits in Executive Summary).
- Real $ values for the stack — must match actual course prices before learners see it.
- Access mechanism decision: coupon code vs backend tagging (Harpreet accepted coupon-sharing risk; discovery ticket says backend tagging feasible but manual).
- Naming — Kirti's competitor research (from Rashid's material).
- Post-cohort-start container treatment (current assumption: stays accessible, collapsed).

## 7. Local files (Prework folder)

- `Prework Task transcript.docx` — full meeting transcript (source of truth)
- `Prework Journey - Work Plan Nelson & Pintu.md` — task split and journey spec
- `Prework - Handoff for Claude Code.md` — this file

## 8. Suggested next steps in Claude Code

Likely goal: an interactive HTML/React prototype stakeholders can click through, matching the 12 wireframes.

Kickoff prompt (paste into Claude Code):

"Read 'Prework - Handoff for Claude Code.md' in this folder. Build a single-file interactive prototype (React or plain HTML/JS) of the SkillUp Prework experience: the 3 emails and 9 screens listed in section 3, using the content model in section 4 and the design language in section 5. Wireframe fidelity, not final design. Screens are linked: E2 CTA → S1 → S2 → S3 → S4; state toggles for S5/S6/S7/S8/S9 (a dev panel with buttons: 'advance progress', 'late joiner', 'push cohort date', 'start cohort'). Keep all copy exactly as specified. All prework interactions must respect the rules: optional, never gates, progress survives date changes."

Alternative next steps: export the Figma page as PDF deck for the review; or generate the HubSpot email HTML templates from E1–E3.
