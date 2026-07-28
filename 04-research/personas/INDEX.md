# SkillUp LMS — Synthetic Learner Personas

Seven synthetic learners, each **multi-enrolled across flows** (TM / DA / CE / Cyber) with a realistic portfolio: some courses completed, some in progress, some not started, some locked — each at its own progress and timeline. So **any persona can test any phase of the project.**

What separates them is not state but a **behavior lens** — how they accumulate data over time. The same screen (e.g. My Learning) looks very different for a credential collector with six enrollments vs a cautious newcomer with two. That variety is the point.

How to use: reference a persona by **ID** or **filename**, e.g. *"render My Learning as P04 (collector)"* or *"test the gated VILT with P05"*. Each file has an enrollment portfolio table + a "Phase coverage" section. When you want a clean single-state fixture, pull the matching row from a persona's portfolio.

## Roster

| ID | Name | Behavior lens | Account age | Flows | Device | Dominant pace | Dominant test focus |
|----|------|---------------|-------------|-------|--------|---------------|---------------------|
| [P01](persona-01-noah-newcomer.md) | Noah Carter | Cautious Newcomer | ~14 mo (dormant→back) | Cyber, CE, TM | Desktop | Pre-start | First-run, Not Started, empty, reactivation |
| [P02](persona-02-maya-achiever.md) | Maya Ferreira | Consistent Achiever | ~8 mo | CE, TM, DA | Desktop + mobile | On track | Happy-path In Progress, PD KPIs, Immersive |
| [P03](persona-03-dev-returner.md) | Dev Okafor | Stall-and-Returner | ~10 mo (bursty) | DA, CE, Cyber | Desktop | Behind (recovering) | Behind-pace, recordings, re-engagement |
| [P04](persona-04-priya-collector.md) | Priya Nair | Credential Collector | ~18 mo (power user) | TM, CE, DA | Desktop + mobile | Ahead | Archive/certs, completion, cross-sell |
| [P05](persona-05-leo-explorer.md) | Leo Martins | Impatient Explorer | ~5 mo | CE, Cyber, DA | Desktop | Gated | Locked/blocked, pre-work, VILT-not-open |
| [P06](persona-06-sara-mobile.md) | Sara Lindqvist | Mobile Micro-Learner | ~6 mo | DA, CE, TM | Mobile 375w | Slightly behind | 375w responsive, micro-session, mobile live |
| [P07](persona-07-helena-accessibility.md) | Helena Costa | Accessibility-First Senior | ~3 mo | TM, CE | Desktop (zoom + keyboard) | Slow, persistent | WCAG AA, keyboard-only, captions, low-literacy |

## Temperament & tech-literacy spread
Deliberately ranged from novice to power user so you don't test everything as one "average competent user".

| ID | Name | Temperament | Tech literacy | Stresses |
|----|------|-------------|---------------|----------|
| P01 | Noah | Anxious, methodical, risk-averse | Novice (2/5) | Discoverability, labels/tooltips, confirmations, icon-only buttons |
| P02 | Maya | Calm, organized, conscientious | Comfortable (4/5) | The intended happy path — baseline usability |
| P03 | Dev | Distractible, avoidant | High but disengaged (4/5) | Notifications, re-engagement, resume after long gaps |
| P04 | Priya | Driven, competitive | Power user (5/5) | Density, shortcuts, bulk actions, deep archive |
| P05 | Leo | Impulsive, impatient | Capable but reckless (4/5) | Error/blocked messaging, guardrails, rapid clicks |
| P06 | Sara | Pragmatic, multitasker | Mobile 5/5, desktop 3/5 | Touch ergonomics, gestures, cross-device parity |
| P07 | Helena | Patient, determined, easily discouraged | Novice (1/5) + assistive tech | WCAG AA, keyboard-only, zoom/reflow 200%, target size, captions |

## Every persona's portfolio covers these states
Completed (+certificate) · In Progress (on-track / behind / ahead) · Not Started · Locked modules/courses · VILT/live · Saved for later. The table below shows which persona is the **best fixture** for each surface (all are testable on all, but these are the cleanest/densest).

| Component / Screen / State | Best fixture |
|----------------------------|--------------|
| My Learning — Not Started card (no bar/%) | P01 |
| First-run / empty / reactivation | P01 |
| My Learning — In Progress, on-track + cohort pace | P02 |
| My Learning — In Progress, behind / at-risk | P03 |
| My Learning — In Progress, ahead | P04 |
| Program / Course PD KPIs (mix bar, pace) | P02 |
| Immersive Course Player (happy path) | P02 |
| Missed live → recording available | P03 |
| Re-engagement / catch-up nudges | P03 |
| Stalled / abandoned program (~0–3%) | P03 |
| Completed × multiple + archive (Screen 7) | P04 |
| Certificates surface + saved-for-later heavy | P04 / P06 |
| Course/Module Complete (modal + progression button) | P04 |
| Post-completion "what's next" / cross-sell | P04 |
| Locked module / course + unlock dates | P05 (also P01) |
| Pre-work prerequisite gate | P05 |
| Preview-on-locked + Locked Course PD (3-tab) | P05 |
| VILT not-open-yet (vs LIVE NOW / LIVE TODAY) | P05 |
| Mobile 375w (My Learning / PD / Immersive) | P06 |
| Mobile progress ring + collapsed nav | P06 |
| LIVE NOW / LIVE TODAY on mobile | P06 |
| Next-live ≤7d chip (internal / standalone / today) | P02, P06 |
| Accessibility (WCAG AA): contrast, zoom/reflow 200%, keyboard, focus | P07 |
| Target size, labels/alt/ARIA, captions & transcripts (VILT) | P07 |
| Low-literacy / first-time under assistive settings | P07 (also P01) |

## Machine-readable data
`personas.json` holds all seven in structured form (same data, one schema) for feeding prototypes / `data.js` directly. Each persona has: `id, name, archetype, behavior_lens, account_age_months, flows_enrolled, device, temperament, tech_literacy {level,label,notes}, accessibility[], dominant_pace, profile, portfolio[] {item,flow,type,state,progress,enrolled,last_activity,delivery}, certificates, saved_for_later, phase_coverage[], dominant_focus`. State vocabulary: `not_started, in_progress, behind, ahead, completed, locked, abandoned, saved`.

## Persona file template (for adding more later)

```
---
id, name, archetype, behavior_lens, account_age, flows_enrolled[], device, dominant_pace, last_updated
---
# ID · Name — "Archetype"
> snapshot (behavior lens, not a single state)
## Profile                 (role, context, time/week, schedule)
## Behavior & motivation    (goal, drivers, frictions, engagement)
## Enrollment portfolio     (TABLE: Item | Flow | Type | State | Progress | Enrolled | Last activity | Delivery) + certificate + saved
## Timeline                 (account age, rhythm, gaps)
## Device & context
## Phase coverage           (must span all states; mark strongest fit)
## Dominant test focus      (where this persona shines vs others)
```

## Real data these personas draw on
- **Programs:** AI-Driven Digital Marketing Certificate (8 modules 0–7, 55h VILT), Cybersecurity, Product Analytics.
- **Standalone courses:** UX Research and Design Thinking, Project Management with AI Tools (LIVE TODAY), Business Analytics with Python, Leadership in Remote Teams, plus Intro to SQL / Cloud Security / Data Storytelling as history items.

## Design rules respected
- Not Started: no progress bar or %, gray badge only.
- Next-live shown on course rows only when ≤ 7 days (compact chip internal / full subline standalone / LIVE TODAY same-day).
- Semantic colors: blue=info, green=success/LIVE NOW, amber=alert/behind, red=error only.
- Hierarchy: Program > Course > Module > Lesson > Topic (topic = playable unit; VILT inside topics).
