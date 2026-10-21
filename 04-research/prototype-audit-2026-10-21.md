# Prototype audit, 21 Oct 2026 (UX/PM + technical)

Two independent assessments of the prototype (main @ 13c4f91): a design review by a senior UX/PM lens over every
platform page and one topic of each type, desktop and mobile; and a technical audit (Impeccable detector, axe-core
4.10 WCAG 2.1 AA, overflow, touch targets, dark mode, Gold/Red/Sea skins).

## Scores
| Area | Score |
|---|---|
| Accessibility | 3.5 / 4 — axe: 0 violations on every page, theme and width |
| Responsive | 3 / 4 — no overflow at 375/768/1280 |
| Theming (dark + skins) | 4 / 4 |
| Implementation integrity | 3.5 / 4 — token-lint, tsc, lint clean; 1 detector hit, a false positive |
| Nielsen heuristics | 23 / 40 — weakest: consistency (1/4) |

## Findings and status
| Sev | Finding | Status |
|---|---|---|
| P0 | Every course-outline topic and Dates link opened the resume topic | Fixed, PR 214 |
| P0 | Three different "todays"; deadlines, titles and types disagree across pages | Fixed, PR 215 |
| P0 | Graded quiz offers *Show answer* before the first attempt | Fixed, PR 214 |
| P1 | "Signatory name" printed on an issued certificate | Fixed, PR 214 + ICP screens (38 texts) |
| P1 | Past dates shown as upcoming on My Learning; mixed date formats | Fixed, PR 215 |
| P1 | Program "18 h left" vs 69 h; two program end dates; two mentors per course | Fixed, PR 215 |
| P1 | Q&A, Discussion and Message your mentor overlap | Decided (029 §3), PR 214 |
| P1 | Dashboard Profile tile was a dead end | Fixed, PR 214 |
| P1 | No sign out; demo controls in the learner's menu | Fixed (029 §2, §6), PR 214, DS Profile Menu v1.6 |
| P1 | Prototype scaffolding visible to learners | Fixed (demo mode), PR 214 |
| P1 | A topic id of another course rendered borrowed content | Fixed (404), PR 214 |
| P1 | Podcast said "completes at 90%" next to Mark as Complete; promised a transcript | Fixed, PR 214 |
| P1 | Calendar labelled a practice quiz "Graded quiz" | Fixed, PR 215 |
| P1 | Program page: six equal Start/Resume actions | Kept as is (029 §4) |
| P1 | Services promises a no-install Python sandbox the lab doesn't use | Open |
| P1 | Player logo crushed to 11 px on a phone | Fixed (029 §1), PR 214, DS Topbar v1.7 |
| P2 | Course 40% vs player 39% | Fixed, PR 215 |
| P2 | SCORM "best viewed on a larger screen" on desktop | Fixed, PR 214 |
| P2 | ORA brief PDF/DOCX vs dropzone .png/.jpg | Fixed, PR 215 |
| P2 | Page titles mix editorial and plain; UK/US spelling mix | Open (copy pass) |
| P2 | Assistant launcher covers content on a phone; mobile Resume below the fold | Open |
| P2 | Player flashes the desktop layout on a phone at load | Open |
| P2 | Prose lines ~100 characters at 1280 | Open (check the topic-shell decision first) |
| P2 | Services: 12 actions; Certificates without a top-level home | Open (product) |
| P3 | Tabs 32 px on a phone with larger targets | Fixed, PR 214 |
| P3 | sr-only h2 before the page h1 in the player | Fixed, PR 214 |
| P3 | Video controls 34 px wide on a phone | Kept (DS note on the mobile frames) |

## Strengths worth keeping
- Third-party lab copy ("SkillUp can't see your progress on Microsoft Learn…").
- The course Progress tab: weight, score and weighted value, with "Not passing yet · 28% of 70%".
- "Up next" with type, title and duration on every card.
