# SkillUp LMS Product Description

Version: V5 (Apr 2026)
Audience: AI platforms, product and design teams picking up the project
Status: Wireframes V5 with real AIDM syllabus data. No production code.

---

## 1. One-liner

SkillUp LMS is a learning platform for cohort-based, instructor-led programs that mix live classes (VILT) with self-paced content, assessments, and mentorship. The learner experience is built around a 5-level content hierarchy (Program > Course > Module > Lesson > Topic) where the Topic is the playable unit.

---

## 2. Who it serves

Primary learner: a working professional enrolled in a certificate program that spans 6 to 12 months. Needs to balance live session attendance with self-paced work and projects. Time-poor. Cares most about "what do I do next" and "am I on track."

Secondary learner: a standalone course buyer, independent of any program bundle.

Admin/Content Ops: not in V5 scope. Delivery-mode tagging lives on the admin side but V5 wireframes only show the learner surface.

Instructors: not modeled in V5 screens. Mentors appear as cards on Program PDs.

---

## 3. Why this exists

The company already runs VILT programs but the current tooling has three problems:

1. Duplicate course instances. They previously created two versions of the same course, one VILT and one self-paced, which sent learners to two different places for the same content.
2. Pre-work confusion. VILT programs enroll learners 1 to 2 months before start. Learners see 7 locked courses and cannot tell what is available now.
3. No single source of truth for progress. Course, module, lesson, and topic states are defined inconsistently in the old UI.

V5 solves these by treating delivery mode as a tag on content (not a separate entity), separating pre-work from locked program content visually, and standardizing the progress model around Topics as the atomic unit.

---

## 4. Core concepts an AI needs to hold

### 4.1 Content hierarchy

```
Program
 └─ Course
     └─ Module
         └─ Lesson
             └─ Topic   ← playable unit (one mode per topic)
```

- Program groups courses. Reference program: AI-Driven Digital Marketing (AIDM), 7 courses.
- Course groups modules. Typically 3 to 5 modules per course.
- Module groups lessons. Typically 2 to 4 lessons per module.
- Lesson groups topics. Duration equals sum of topic durations.
- Topic is atomic. Has exactly one mode.

### 4.2 Topic modes (8)

1. Video
2. Reading
3. Podcast
4. VILT (live session)
5. Quiz
6. Lab
7. Activity
8. Project

Every topic is one of these. Pre-work is an attribute on a topic, not a separate type. Recordings surface as Video with a badge.

### 4.3 Delivery mode as a tag

Delivery mode is tagged at lesson, module, or course level. Modes bubble up:

- All VILT lessons in a module, module is VILT.
- All self-paced, module is Self-Paced.
- Mixed, module is Blended.

A VILT tag requires date, time, presenter, and meeting link or it cannot be saved on the admin side.

### 4.4 VILT rules

- VILT topics live inside lessons, not at lesson level.
- Multiple VILT topics in one lesson combine into one continuous live event.
- VILT is never locked regardless of self-paced progress.
- Recordings are continuous, one per VILT lesson, not split per topic.
- Final Assessment is a module, not a special entity.

### 4.5 Pre-work pattern

VILT programs enroll learners early. During the gap:

- "AVAILABLE NOW" green tag on pre-work courses.
- "STARTS [DATE]" amber tag on locked program content.
- Calendar shows program start as an amber milestone.
- Countdown badge on program card, "Starts in X days."
- Label is "Preparation Courses," not "pre-work."

### 4.6 Progress model

- Course percent = topics done weighted by minutes, not raw count (because courses vary from 6h to 18h).
- Module percent = lessons done within the module.
- Lesson percent = topics done within the lesson.
- Topic is binary complete or not.
- VILT attendance counts as completion. Recording-only consumption is still an open rule.

### 4.7 Program vs Course cards

- Program card: "PROGRAM" badge (blue bg, blue text). Lists enclosed courses. Single expand/collapse.
- Single Course card: "SINGLE COURSE" badge (purple bg). Independent, not nested in any program.

---

## 5. Reference data: AI-Driven Digital Marketing (AIDM)

All V5 wireframes use AIDM as the reference program. Every count in the UI pulls from this dataset.

Program totals:
- 89h 21m total runtime
- 7 courses
- 28 modules
- 64 lessons
- 279 topics
- 53 VILT sessions
- Modality split: 64% Live, 34% Self-paced, 2% Assessment

Per-course breakdown (name, duration, modules / lessons / topics / VILT):

- C1 Digital Marketing Fundamentals, 11h 46m, 4 / 10 / 36 / 13
- C2 AI-Driven Content and Brand Comms, 12h 53m, 4 / 10 / 38 / 9
- C3 SEO, GEO, Organic Growth, 13h 39m, 4 / 10 / 43 / 8
- C4 Paid Advertising, Media, 16h 01m, 4 / 10 / 54 / 7
- C5 Social Media, Ecommerce, 17h 56m, 5 / 12 / 64 / 8
- C6 Email, CRM, Lifecycle, 11h 03m, 3 / 7 / 34 / 5
- C7 Capstone, 6h 03m, 4 / 5 / 10 / 3

Course weighting matters: C7 (6h) is a third of C5 (18h). Program-level pace must weight by minutes, never by raw topic count.

Topic mode distribution across AIDM: Video 76, Reading 84, VILT 53, Lab 24, Podcast 19, Activity 10, Project 8, Quiz 6.

---

## 6. The V5 learner flow

Four primary screens carry 95% of the flow. Tabs extend each PD. Immersive is where time is actually spent.

### 6.1 Screen 1: My Learning

Entry point. What the learner sees after login.

Contents:
- Header "My Learning" with filter (All / Courses / Programs) and Filters button.
- Global "LIVE NOW" banner if a session is active anywhere in the catalog.
- One program card per enrolled program (AIDM, expanded, shows enclosed courses).
- One card per enrolled single course (UX Research, Project Management, Business Analytics in the sample data).
- Each row shows mode, progress, and the next topic the learner should open.

Next-live display rule:
- Show next live session only when it is 7 days away or closer. Beyond that, hide.
- Today, escalate: red dot, "LIVE TODAY" badge, "Join Session" CTA.
- Program-internal course row: compact chip. Format `🎥 MMM D · Npm`. No session name.
- Standalone course card: full subline. Format `Next Live Session: [name]  🎥 MMM D at Npm` plus UPCOMING badge.
- Locked courses: no chip, no subline.

### 6.2 Screen 2: Program Detail (Program PD)

Hero dark theme. Title, delivery badge, "by Partner" attribution, back button, breadcrumb.

Body structure:
- Hero stats row: 89h Content, 7 Courses, 28 Modules, 279 Topics, 8 months Duration
- Program strip below hero: 53 Sessions, next Thu 6pm
- Program dashboard row, 3 cards: Milestones (blue accent), Live Experiences (amber), Program Benefits (purple)
- Sidebar: "Next step" card (Option 4 pattern). Kicker "CONTINUE WHERE YOU LEFT OFF", topic title, breadcrumb meta (`Course N · Module N · Topic N of M`), dark Continue CTA, divider, thin progress bar with `N% of program`, footer `Next live`.
- Course list: 8 rows (Course 0 pre-work exemplar plus the 7 AIDM courses).
  - Course 0 "AI Foundations Preparation": completed (100% green), "Review" CTA.
  - Course 1 Digital Marketing Fundamentals: in progress (27%), "Continue" CTA.
  - Course 2 AI-Driven Content and Brand Comms: available, "Start" CTA.
  - Courses 3 through 7: locked, "Preview" CTA (navigates to Locked Course PD).

Tabs on Program PD (target, 6):
1. Courses (default)
2. Calendar
3. Mentoring
4. Community (new, currently missing)
5. Certificates
6. About

Utility strip (target): Announcements, Resources, Support.

Decisions flagged in audit:
- Live Sessions tab on Program PD overlaps with Calendar. Consider merging Live Sessions into Calendar as a list toggle.
- Community, Resources, Announcements, Progress analytics, Capstone view, Support are functional gaps.

### 6.3 Screen 3: Course Detail (Course PD)

Hero with breadcrumb `My Learning > AIDM Certificate > [Course name]`, title, "Part of" affiliation bar showing program context and "Course N of 7".

Hero KPI pattern (Option 2): four inline KPIs in one full-width card.
- Topics done / total
- Modules done / total
- Live sessions attended / total
- Next live date
- Thin progress bar and overall percent above the KPIs

Real data for Course 1:
- 4 Modules, 10 Lessons, 36 Topics, 13 Live Sessions, 11h 46min
- Progress: 2 of 4 modules, 6 of 10 lessons, 27%

Module list:
- Module 2 expanded (Customer Journeys and Growth Thinking).
  - Lesson 1: Digital Channel Foundations (all topics done)
  - Lesson 2: Digital Audience (1 done, 1 current)
  - Lesson 3: Industry Expert Session (4 VILT topics, Apr 23, 6pm)
- Lesson rows show mode-mix strips (Video + Lab + Activity, Podcast + Reading + Activity).
- Mode-mix strip is a horizontal 3-segment bar colored Live / Self / Assessment proportional to minutes.

Tabs on Course PD (target, 3):
1. Modules (default)
2. Live Sessions
3. About (absorbs Instructors and Reviews as sections)

Decisions flagged in audit:
- Instructors tab is redundant with About's instructor cards. Remove Instructors tab.
- Reviews on enrolled Course PD is misplaced marketing content. Move to About as section. Reviews stays as a tab only on Locked Course PD and catalog.

Sidebar on Course PD: dropped. Option 2 KPI card is the single source of truth for progress. Do not add a second progress summary.

### 6.4 Screen 4: Immersive View

Where the learner consumes content. Full-bleed player surrounded by context.

Top bar: breadcrumb `Module N: Name`, progress, session type.

Left sidebar (Flexible, collapsible):
- Module header with module title and module progress percent.
- Lesson list. Only first 3 lessons visible by default.
- Each lesson row shows: lesson name, duration, topic summary (e.g. "Video 1 · Reading 1 · Lab 1 · Activity 1").
- Topic rows under active lesson: dot (● active, ○ inactive) plus `topic name (duration, type)`. For VILT topics, append `· Apr DD, 6pm`.
- Active topic text fill is ink (#1a1a1a). Inactive is muted (#808080).

Player: shows the active topic. Layout varies by mode:
- Video: standard player with transcript tab.
- Reading: article body, paragraph markers ¶1 to ¶N.
- Podcast: audio scrubber, show notes with timestamps (00:00 to 09:30 style).
- Quiz: question flow with Q1/✓, Q2/✗, Q3/✓ transcript.
- Lab: numbered steps 1 to N plus Accept.
- Activity: Goal / Task / Rule 1 / Rule 2 / Review / Submit / Hint structure.
- Project: Scope / Brand / weighted rubric (40/35/25) / Submit / Review.
- VILT: live session frame with participant strip, chat panel below Q&A in right sidebar.

Right sidebar (VILT only): Resources > Q&A > Chat top to bottom.

Bottom pill strip (topic stepper for the current lesson):
- Counter "Topic X of N"
- Pills for each topic in the lesson, one mode icon per pill.
- Active pill: dark fill, white text. Inactive: light gray fill, muted text.
- Pill sequence for Module 2 Lesson 1: [Video, Reading, Reading, Activity].

Navigation: "← Previous Topic" and "Next Topic →" buttons. Not "Next Lesson." Topic-level is correct.

### 6.5 Screen 5: Live Sessions (tab on Program PD and Course PD)

Unified list. No separate Upcoming/Completed split at Program level. At Course level, there are two sub-views: Upcoming and Completed.

KPI strip above list: N Completed, N This Week, N Upcoming.

Filter chips: All / Upcoming / Completed / Missed.

"Add All to Calendar" CTA.

Row format (canonical):
1. Date column: MONTH / DAY (APR / 23)
2. Vertical divider
3. Content column:
   - Session title plus optional badge (LIVE TODAY amber, COMPLETED green)
   - Subtext: `Course N · Module X: Name · Lesson Y: Name  ·  Instructor`
   - Topic is the session title, not repeated in subtext
4. Time cell right-aligned: `12:00 PM - 1:30 PM EST`. Time zone label is "EST" across the whole project by user preference.
5. Action button:
   - Live today, filled "Join Now", highlighted blue row bg
   - Upcoming, outlined "Add to cal"
   - Completed, outlined "Recording"

Section labels: THIS WEEK, UPCOMING (NEXT 30 DAYS), RECENTLY COMPLETED.

### 6.6 Locked Course PD

Preview state for courses that unlock later. Navigable, not startable.

Hero KPI uses Option 2 grayed as "Course scope":
- Numbers only, no `/total`
- Dimmed ink (50% gray)
- Amber lock accent on Duration value and Unlock date
- Empty gray progress track at top to communicate 0% without a colored fill

Amber banner between Hero and Tabs: "Preview. Course unlocks when Course X is complete." Helper subline: "Complete Course 1 and 2 first · Available after Mar 29."

Module headers gray, checkmarks replaced with 🔒.

Tabs collapse to 3:
1. Syllabus
2. Live Sessions
3. About (with Instructors and Reviews as sections)

Live Sessions preview uses SOFT color (#a0a6b2), LOCKED badge on every row. Readable for planning, visually distinct from active tab.

---

## 7. UX rules worth codifying

These are the rules an AI platform picking up this project must honor.

### Visual language

- Type badges: pills, cornerRadius 100. Buttons use 6 to 8px radius.
- All badges WCAG AA contrast. No color-only status encoding.
- Colors can be red or green for semantic meaning (danger / success / live). Neutral gray is the default on My Learning course-card badges. Green and red are allowed elsewhere for true semantic context.

### Typography

- Primary font: Montserrat.
- Accent font: Playfair (quotes and editorial titles only).
- Do not use Inter for UI.

### Banner and mentoring rules

- Mentoring footer: Program PD and About tab only. Never on inner screens. Never on Course PDs without mentoring.
- Live session banner: only when an In Progress program or course has an active live session.
- Mentoring section: Program and TechMaster types only, not on Course type.

### Language

- Always "Module X," never "MX" or "Mx."
- Time zone label: "EST" across the project.
- "Live Session" is the type signifier. "LIVE NOW" is the temporal state for an active session.

### Icon library

Untitled UI free icon set (untitleduicom/free-icons) is the standard. All V4 and V5 wireframes use it.

### Next-live 7-day rule

Programmatic rule, not cosmetic. Course rows in My Learning must respect it consistently between program-internal and standalone surfaces.

### KPI pattern decisions

- Course PD hero: Option 2 (4 inline KPIs, bar, overall percent). Full 1280 width. No sidebar progress duplicate.
- Program PD sidebar: Option 4 (Next step card).
- Locked Course PD hero: Option 2 grayed (Course scope).
- Card F (rings plus budget strip) is still a valid pattern but no longer used on PD hero or sidebar.

### Progress weighting

When computing Program-level pace, weight by minutes, not topic counts. Program total minutes is the denominator. Topic minutes vary from 3 to 45.

---

## 8. What V5 is not

- Not a catalog browsing experience. V5 is post-enrollment.
- Not an admin surface. No course authoring, no mode tagging UI.
- Not instructor-facing. No grading workflow, no session hosting tools.
- Not a messaging product. Chat inside live sessions only.
- Not a certificate issuance system. Certificates tab shows previews only.
- Not responsive beyond desktop. All wireframes are 1440 wide.
- Not yet localized.

---

## 9. Known open decisions

Tracked as of Apr 21, 2026.

- What happens if a learner skips pre-work. Does it affect readiness, delay progress, or stay optional?
- Does recording-only consumption count as live session completion?
- Calendar click targets when an event pill is selected. Not designed.
- Program-level pace formula. Weight by minutes confirmed. Exact surface not yet designed.
- Community, Announcements, Resources, Capstone view, Support tabs on Program PD: agreed as gaps, not yet designed.
- Visual differentiation of delivery mode inside a course structure (badge vs icon vs color) not finalized on the admin side.

---

## 10. Reference artifacts

- Figma file: Wz2TCYFVr0hD8tJNiLajLt
- Page: "V5 - Full Pages - WIP" (node 1459:178)
- Section: "V5 Flow" (node 1556:791)
- Reference data source: `full program syllabus with time duration v4.xlsx`, AIDM sheet
- Flow audit: `V5 - Flow Audit - Apr 20.md` in project folder
- PRD (current working): `LMS-PRD.md` alongside this file

---

## 11. How to read this for handoff

If you are an AI platform picking up this project:

1. Read this document top to bottom before opening the Figma file.
2. Treat AIDM data as ground truth. Any wireframe number must match the AIDM breakdown in section 5.
3. When asked to design or describe any new screen, keep the 5-level hierarchy and the 8 topic modes as primitives. Do not invent new levels or modes.
4. Honor the 7-day next-live rule, the mode-as-tag rule, and the VILT-never-locked rule. They are load-bearing.
5. Use Montserrat. Do not use Inter.
6. If you are asked to compute program progress, weight by minutes.
7. If you are asked to add a new tab, first check the target tab list in section 6 and the flow audit conclusions.
8. When writing or reviewing copy, "Live Session" is the type, "LIVE NOW" is the state, "Module X" never abbreviates.
