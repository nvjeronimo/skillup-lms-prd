# SkillUp LMS Product Requirements Document (PRD)

Version: V5, dated Apr 21, 2026
Status: Wireframe-level requirements. No production code.
Companion doc: `LMS-Product-Description.md`
Source of truth for data: `full program syllabus with time duration v4.xlsx`, AIDM sheet
Source of truth for UI: Figma file Wz2TCYFVr0hD8tJNiLajLt, page "V5 - Full Pages - WIP"

---

## 1. Purpose and scope

### 1.1 Purpose

Define requirements for the learner-facing LMS that delivers cohort-based programs mixing VILT live classes with self-paced content, mentoring, assessments, and capstone projects.

### 1.2 Scope in V5

- Learner web experience, desktop 1440 width.
- Post-enrollment flow only. Catalog and checkout are out of scope.
- 4 primary screens plus tab variants and immersive player.
- Reference program: AI-Driven Digital Marketing (AIDM).

### 1.3 Out of scope (V5)

- Admin tools (course authoring, mode tagging, instructor tools).
- Catalog, discovery, purchase flow.
- Mobile and tablet breakpoints.
- Localization.
- Notifications, email, SMS.
- Proctoring.
- Analytics dashboards for admins.

### 1.4 Non-goals

- No separate VILT and self-paced instances for the same content. See section 4.3.
- No locking of live sessions based on self-paced progress. See section 4.3.4.
- No program-level progress that ignores course weighting. See section 5.6.

---

## 2. Users and jobs to be done

### 2.1 Primary user: cohort learner

Working professional enrolled in a 6 to 12 month certificate. Balancing job and study.

Jobs:
- JTBD-1: Know what to do next when I open the app.
- JTBD-2: Know whether I am on track.
- JTBD-3: Join the next live session without missing it.
- JTBD-4: Catch up on missed live sessions without disrupting self-paced work.
- JTBD-5: See where a topic lives inside the program (context, not just title).
- JTBD-6: Preview a locked course before it unlocks so I can plan.

### 2.2 Secondary user: standalone course buyer

Independent of any program bundle. Single course enrollment.

Jobs:
- JTBD-7: Resume the last topic I was on.
- JTBD-8: See which live sessions are coming up for my course.

### 2.3 Users out of scope in V5

- Admins
- Instructors
- Mentors (surface only, no tooling)
- Support staff

---

## 3. Content model

### 3.1 Hierarchy

```
Program
 └─ Course
     └─ Module
         └─ Lesson
             └─ Topic
```

Five levels. Topic is atomic and playable.

### 3.2 Entity definitions

Program
- id, name, cohort start date, duration, delivery mode (rolled up), partner(s), badge type (PROGRAM / TECHMASTER).
- Contains 1 to N Courses.

Course
- id, name, parent Program (nullable for standalone), duration in minutes, delivery mode (rolled up), level, certificate type, course code, sequence index in program, unlock condition.
- Contains 1 to N Modules.

Module
- id, name, parent Course, sequence index, delivery mode (rolled up), state (locked / available / in progress / completed).
- Contains 1 to N Lessons.

Lesson
- id, name, parent Module, sequence index, duration (sum of topic durations).
- Contains 1 to N Topics.
- Lesson summary surfaces topic mode counts, e.g. "Video 1 · Reading 1 · Lab 1 · Activity 1."

Topic
- id, name, parent Lesson, mode (one of 8), duration in minutes, state (not started / in progress / done).
- For VILT: add scheduled datetime, presenter, meeting link, recording URL after session.
- For Quiz: add passing threshold.
- For Project: add rubric weights, due date.

### 3.3 Topic modes (8 total)

1. Video
2. Reading
3. Podcast
4. VILT (live session)
5. Quiz
6. Lab
7. Activity
8. Project

Attributes:
- Pre-work is a boolean on a topic, not a new mode.
- Recordings are presented as Video with a "Recording" badge. Not a new mode.
- Final Assessment is a module that contains Quiz/Lab/Project topics. Not a new entity.

### 3.4 Delivery mode tagging (admin rule, reflected in learner UI)

Mode tag applies at lesson, module, or course level.

Bubble-up rules:
- All VILT lessons in a module, module becomes VILT.
- All self-paced lessons in a module, module becomes Self-Paced.
- Mixed, module becomes Blended.
- Same logic applies from module to course.

Validation (admin, not learner UI): if a lesson is tagged VILT it must have date, time, presenter, and meeting link or the save is rejected.

### 3.5 VILT rules

- VILT topics live inside lessons.
- Multiple VILT topics in one lesson combine into one continuous live event.
- VILT is never locked regardless of self-paced progress.
- Recordings are continuous, one per VILT lesson.
- VILT is a delivery mode, not a course type. Never create duplicate course instances (one VILT, one self-paced) for the same content.

### 3.6 Reference data (AIDM)

Program totals:
- 89h 21m
- 7 courses
- 28 modules
- 64 lessons
- 279 topics
- 53 VILT sessions
- 64% Live / 34% Self-paced / 2% Assessment

Per-course (duration, M/L/T/VILT):
- C1 Digital Marketing Fundamentals, 11h 46m, 4/10/36/13
- C2 AI-Driven Content and Brand Comms, 12h 53m, 4/10/38/9
- C3 SEO, GEO, Organic Growth, 13h 39m, 4/10/43/8
- C4 Paid Advertising, Media, 16h 01m, 4/10/54/7
- C5 Social Media, Ecommerce, 17h 56m, 5/12/64/8
- C6 Email, CRM, Lifecycle, 11h 03m, 3/7/34/5
- C7 Capstone, 6h 03m, 4/5/10/3

Topic mode distribution: Video 76, Reading 84, VILT 53, Lab 24, Podcast 19, Activity 10, Project 8, Quiz 6.

---

## 4. Lifecycle and state model

### 4.1 Enrollment timeline

For VILT programs, learners enroll 1 to 2 months before program start.

Timeline states:
- PRE_START: before program start date. Pre-work available. Rest locked.
- IN_PROGRESS: program active. Courses unlock sequentially by completion or by date, whichever is configured.
- COMPLETED: all required courses done, capstone submitted.
- EXPIRED: access cutoff reached.

### 4.2 Course states

- LOCKED: not yet available. Shows "Preview" CTA navigating to Locked Course PD.
- AVAILABLE: unlocked but not started. Shows "Start" CTA.
- IN_PROGRESS: any topic done but not all. Shows "Continue" CTA.
- COMPLETED: all required topics done. Shows "Review" CTA.

### 4.3 Locking rules

REQ-4.3.1: Self-paced topics follow sequential lock within a lesson.
REQ-4.3.2: Modules unlock sequentially within a course.
REQ-4.3.3: Courses unlock per program configuration (sequential or date-based).
REQ-4.3.4: VILT topics are never locked by self-paced progress. Always joinable at scheduled time.

### 4.4 Pre-work pattern

REQ-4.4.1: A Program card in PRE_START state must split courses into "AVAILABLE NOW" (green tag) and "STARTS [DATE]" (amber tag).
REQ-4.4.2: Calendar must show program start as an amber milestone diamond, distinct from blue live session dots.
REQ-4.4.3: Program card must show countdown: "Starts in X days."
REQ-4.4.4: Label is "Preparation Courses," not "pre-work."

---

## 5. Progress and KPI requirements

### 5.1 Topic progress

REQ-5.1.1: Topic is binary complete or not.
REQ-5.1.2: Topic completion source varies by mode:
- Video: end-of-video reached (threshold configurable, default 90%)
- Reading: scroll to end plus minimum time on page
- Podcast: 90% of audio played
- Quiz: passing threshold met
- Lab: submission accepted
- Activity: submission accepted
- Project: submission accepted
- VILT: attendance recorded OR recording-watched (OPEN DECISION, see 10.2)

### 5.2 Lesson progress

REQ-5.2.1: Lesson percent equals topics done divided by topic count in the lesson.
REQ-5.2.2: Lesson is "Complete" only when all topics done.

### 5.3 Module progress

REQ-5.3.1: Module percent equals lessons done divided by lesson count.
REQ-5.3.2: Module state "Completed" only when all lessons done.

### 5.4 Course progress

REQ-5.4.1: Course percent equals topic minutes done divided by course total minutes. Count-based percent is not acceptable.
REQ-5.4.2: Progress display rounds to integer percent.

### 5.5 Program progress

REQ-5.5.1: Program percent equals topic minutes done across all courses divided by program total minutes.
REQ-5.5.2: Weighting must respect course size. C7 (6h) and C5 (18h) are not equal. Never use raw course count.
REQ-5.5.3: Courses marked "Completed" contribute their full minute total, independent of individual topic states.

### 5.6 KPI surfaces (hero patterns)

Course PD hero (REQ-5.6.1):
- Pattern: Option 2, four inline KPIs plus progress bar plus overall percent.
- KPIs: Topics done/total, Modules done/total, Live sessions attended/total, Next live date.
- Width: 1280 full hero width. No sidebar progress duplicate.

Program PD sidebar (REQ-5.6.2):
- Pattern: Option 4, Next step card.
- Content: kicker "CONTINUE WHERE YOU LEFT OFF", topic title, breadcrumb `Course N · Module N · Topic N of M`, dark Continue CTA, divider, thin bar with `N% of program`, footer `Next live`.

Locked Course PD hero (REQ-5.6.3):
- Pattern: Option 2 grayed, reframed as "Course scope."
- Numbers only, no `/total`.
- Dimmed ink 50% gray.
- Amber lock accent on Duration value and Unlock date.
- Empty gray progress track at top.

Deprecated in hero/sidebar roles (but valid elsewhere):
- Card F (rings plus budget strip). Still valid pattern for other contexts. Not used on PD hero or sidebar.

### 5.7 Pace signals

REQ-5.7.1: Any pace chip ("On track" / "Behind") must be computed from minutes, not counts.
REQ-5.7.2: Thresholds for "Behind schedule" are admin-configurable. Default is learner projected end date exceeds program end date by more than 14 days.

---

## 6. Screen requirements

### 6.1 Screen inventory (V5 primary)

1. My Learning (entry)
2. Program Detail (Program PD)
3. Course Detail (Course PD)
4. Immersive View
5. Live Sessions tab (on Program PD and Course PD)
6. Locked Course PD

Tab variants under each PD are enumerated in section 7.

### 6.2 My Learning

REQ-6.2.1: Header reads "My Learning" with filter toggle (All / Courses / Programs) and Filters button.
REQ-6.2.2: A global "LIVE NOW" banner appears below the nav when any session is active across the catalog. Format: green dot, "LIVE" label, course name, session name, elapsed time, "Live Now" CTA on right.
REQ-6.2.3: The list contains one card per enrolled entity. Program cards and single course cards co-exist.
REQ-6.2.4: Program card must carry a "PROGRAM" badge (blue bg, blue text). Single course card must carry a "SINGLE COURSE" badge (purple bg).
REQ-6.2.5: Program card is expandable. Default expanded showing enclosed courses.
REQ-6.2.6: Locked courses inside a program show "Preview" CTA. Clicking navigates to Locked Course PD.
REQ-6.2.7: A completed course row shows green checkmark circle and "Review" CTA. Example: Course 0 "AI Foundations Preparation" at 100%.

Next-live display rule (REQ-6.2.8):
- Show next live session only when it is ≤ 7 days away.
- If today: red dot plus "LIVE TODAY" badge plus "Join Session" CTA.
- Program-internal row: compact chip `🎥 MMM D · Npm`. Blue tint bg, blue text, 10pt SemiBold, 8/3 padding, 4px radius. No session name.
- Standalone course card: full subline `Next Live Session: [name]  🎥 MMM D at Npm` plus UPCOMING badge on right.
- Locked course: no chip, no subline.

### 6.3 Program Detail (Program PD)

REQ-6.3.1: Hero uses dark theme. Title, delivery mode badge, "by Partner" attribution inline.
REQ-6.3.2: Back button before breadcrumb.
REQ-6.3.3: Hero stats row uses AIDM numbers: `89h · 7 Courses · 28 Modules · 279 Topics · 8 months`.
REQ-6.3.4: A program strip below the hero shows `53 Sessions · Next Thu 6pm`.
REQ-6.3.5: Program dashboard row, 3 cards, equal width, 20px gap:
- Card 1 Milestones, blue accent bar (3w x 24h), 52px icon column. Dates Mar 29 through Nov 29, last icon green.
- Card 2 Live Experiences, amber accent, 28px icon column.
- Card 3 Program Benefits, purple accent, 14px icon column, ✦ decorations.

REQ-6.3.6: Sidebar uses Option 4 Next step card (see REQ-5.6.2). Sidebar width 232.

REQ-6.3.7: Course list must render 8 rows (Course 0 pre-work exemplar plus the 7 AIDM courses):
- Course 0 "AI Foundations Preparation": completed state exemplar, "Review" CTA.
- Course 1 Digital Marketing Fundamentals: in progress, "Continue" CTA.
- Course 2 AI-Driven Content and Brand Comms: available, "Start" CTA.
- Courses 3 to 7: locked, "Preview" CTA navigating to Locked Course PD.

REQ-6.3.8: Each course row shows: sequence number or check circle, course title, delivery badge, progress bar, next live chip if ≤ 7 days, CTA.

### 6.4 Course Detail (Course PD)

REQ-6.4.1: Breadcrumb format: `My Learning > [Program Name] Certificate > [Course Name]`.
REQ-6.4.2: "Part of" affiliation bar below breadcrumb: orange program icon, program name, "Course N of 7", "View Program →" link.
REQ-6.4.3: Hero uses Option 2 KPI pattern (see REQ-5.6.1). No sidebar progress card.
REQ-6.4.4: Stats row numbers must pull from the course's AIDM data, not hardcoded. Example Course 1: `4 Modules · 10 Lessons · 36 Topics · 13 Live Sessions · 11h 46min`.
REQ-6.4.5: Progress caption format: `N of M modules · N of M lessons`. Example: `2 of 4 modules · 6 of 10 lessons`.
REQ-6.4.6: Module list shows all modules with state:
- Completed modules: green check circle, collapsed, no Continue CTA.
- In-progress module: expanded, progress badge, "Continue Learning" CTA.
- Locked modules: 🔒 instead of check, muted gray.
REQ-6.4.7: Within an expanded module, each lesson row shows:
- Lesson name
- Topic summary (e.g. "Video 1 · Reading 1 · Lab 1 · Activity 1")
- Mode-mix strip (horizontal 3-segment bar, colored Live / Self / Assessment proportional to minutes)
- Duration
- State dot per topic if expanded

### 6.5 Immersive View

REQ-6.5.1: Layout: top bar, left sidebar (Flexible), center player, right sidebar (VILT only), bottom pill strip.

Left sidebar (REQ-6.5.2):
- Header: module title plus module progress percent. Always "Module X" format, never abbreviated.
- Lesson list. First 3 lessons visible by default.
- Each lesson row: name, duration, topic summary line.
- Active lesson expands to show topic rows.
- Topic row: dot (● active, ○ inactive) plus `topic name (duration, type)`. VILT topics append `· Apr DD, 6pm`.
- Active topic text fill ink. Inactive muted.
- For VILT topics the date must be rendered in 12-hour format with `am` or `pm` suffix.

Center player (REQ-6.5.3): varies by topic mode.
- Video: player with transcript tab. Transcript format: timestamped lines at ~5 minute intervals with lesson text.
- Reading: article body. Transcript equivalent: paragraph markers ¶1 to ¶N.
- Podcast: audio scrubber with show notes. Timestamps 00:00 to episode end.
- Quiz: question flow. Transcript shows Q1/✓, Q2/✗, Q3/✓ pattern.
- Lab: numbered steps 1 to N plus Accept control. Transcript uses Step 1 through Step 6 + Accept.
- Activity: Goal / Task / Rule 1 / Rule 2 / Review / Submit / Hint structure.
- Project: Scope / Brand / weighted rubric (e.g. 40%/35%/25%) / Submit / Review. Header must show "Duration: Xh · Due MMM DD."
- VILT: live video frame, participant strip, Q&A and chat in right sidebar.

Right sidebar (VILT only, REQ-6.5.4):
- Top: Resources
- Middle: Q&A with "+ Ask a Question" CTA
- Bottom: Chat panel

Bottom pill strip (REQ-6.5.5):
- Counter text "Topic X of N" left-aligned.
- Row of pills, one per topic in the active lesson, interleaved with connector rectangles.
- Active pill: bg #21262E, text white.
- Inactive pill: bg #F5F5F7, text #6B737D.
- Each pill shows topic mode icon and short label.
- For lessons with fewer topics, hide extra pills via visible=false, show N pills and N-1 connectors.

Navigation (REQ-6.5.6): "← Previous Topic" and "Next Topic →". Topic-level, not lesson-level.

### 6.6 Live Sessions list

REQ-6.6.1: Layout:
- KPI strip top: N Completed, N This Week, N Upcoming.
- Filter chips: All / Upcoming / Completed / Missed.
- "Add All to Calendar" CTA right-aligned.
- Section labels between groups: THIS WEEK, UPCOMING (NEXT 30 DAYS), RECENTLY COMPLETED.

REQ-6.6.2: Row structure (canonical):
1. Date column: `MMM / DD` (e.g. `APR / 23`).
2. Vertical divider.
3. Content column:
   - Title row: session name (Montserrat SemiBold 14) plus optional state badge.
   - Subtext: `Course N · Module X: Name · Lesson Y: Name  ·  Instructor` (Montserrat Regular 13, muted).
   - Delimiter rule: `·` (middle dot) between path elements. `  ·  ` (double-space middle dot) between path and instructor.
   - Topic is the session title. Do not repeat it in the subtext.
4. Time cell right-aligned, ~180px: `12:00 PM - 1:30 PM EST`. Time zone "EST" is the project standard label regardless of actual DST state.
5. Action button:
   - Live today: filled "Join Now". Row bg highlighted blue. Amber "LIVE TODAY" badge.
   - Upcoming: outlined "Add to cal".
   - Completed: outlined "Recording". Green "COMPLETED" badge.

REQ-6.6.3: Scope differences:
- Program PD Live Sessions tab: no Upcoming/Completed sub-tabs. Unified list grouped by time window.
- Course PD Live Sessions tab: Upcoming and Completed are separate tabs.
- In course-scoped list, drop "Course N" prefix from subtext since the page is already scoped.

### 6.7 Locked Course PD

REQ-6.7.1: Same structural layout as Course PD (breadcrumb, hero, tabs, content).
REQ-6.7.2: Amber banner inserted between hero and tabs. Primary: "Preview. Course unlocks when Course X is complete." Helper subline: "Complete Course 1 and 2 first · Available after Mar 29."
- Banner bg: `{r:1, g:0.96, b:0.88}`.
- Banner border: amber.
REQ-6.7.3: Hero uses Option 2 grayed (see REQ-5.6.3).
REQ-6.7.4: Progress card shows status row "🔒 Locked" / "Unlocks Mar 29, 2026", gray "Notify me when unlocked" button, helper text.
REQ-6.7.5: Module headers recolored gray. Checkmarks replaced by 🔒.
REQ-6.7.6: Tab set collapses to 3:
1. Syllabus
2. Live Sessions
3. About (Instructors and Reviews as sections)

REQ-6.7.7: Live Sessions tab on Locked Course PD uses SOFT color ({r:0.63, g:0.66, b:0.70}) for session rows. Every row gets LOCKED badge.

---

## 7. Tab structures

### 7.1 Program PD tabs (target, 6)

1. Courses (default)
2. Calendar
3. Mentoring
4. Community (NEW, REQ-7.1.4, not yet designed)
5. Certificates
6. About

Utility strip (to design): Announcements, Resources, Support.

Current state: tab frames exist for Live Sessions, Calendar, Mentoring, Certificates, About.
Delta vs current:
- REQ-7.1.1: Merge Live Sessions into Calendar as a list toggle (decision pending).
- REQ-7.1.2: Add Community tab.
- REQ-7.1.3: Add Announcements surface.
- REQ-7.1.4: Add Resources surface.
- REQ-7.1.5: Add Support surface.

### 7.2 Course PD tabs (target, 3)

1. Modules (default)
2. Live Sessions
3. About (absorbs Instructors and Reviews as sections)

Removed from current:
- REQ-7.2.1: Kill Instructors tab (redundant with About instructor cards).
- REQ-7.2.2: Move Reviews into About as section. Keep Reviews as a tab only on Locked Course PD and catalog.

### 7.3 Locked Course PD tabs (3)

1. Syllabus
2. Live Sessions
3. About (Instructors, Reviews inside)

### 7.4 About tab canonical layout

REQ-7.4.1: Section order:
1. Heading "About this [program/course]" (22px SemiBold).
2. KPI chip row (bordered pill container, white bg, radius 12, inline dividers). Counts only.
3. Description, 2 paragraphs, 14px, line-height 160%.
4. 8-metric row, 24px gap, each metric fills equally. Label 10px Medium muted with letter-spacing 0.5. Value 15px SemiBold. Optional 11px muted subline.
5. "What you will learn" plus 5 outcome bullets with blue ✓ check.
6. "Who it is for" plus paragraph.
7. "Skills you will learn" plus wrapping pills.
8. "View full Syllabus" outlined button.
9. INSTRUCTORS label (11px uppercase) plus 3 instructor cards.

REQ-7.4.2: 8-metric columns:
- Program PD: Estimated Effort, Duration, Level, Delivery Method, Cohort Size, Certificate, Program Code, Enrolled.
- Course PD: Estimated Effort, Duration, Level, Delivery Method, Cohort Size, Certificate, Course Code, Part Of.

REQ-7.4.3: Icon conventions:
- Chip icons: 📚 Courses, 🧩 Modules, 📖 Lessons, 🎯 Topics, 🎥 Live Sessions, 🏆 Capstone, 🚀 Project.
- Metric icons: ⏱ Estimated Effort, 📅 Duration/Enrolled, 📊 Level, 🌐 Delivery Method, 👥 Cohort Size, 🎓 Certificate, `#` Code, 🔗 Part Of.
- Icon sits to the left of the value text in a horizontal "valueRow" frame. Icon 13px muted, gap 6.
- Certificate value must be ≤ 12 chars when icon is present. Longer detail goes in subline.

### 7.5 Tab variant node inventory (Figma Wz2TCYFVr0hD8tJNiLajLt)

Course PD column (x=3180):
- 1770:2026 Instructors Tab
- 1770:2067 Reviews Tab
- 1770:2141 About Tab

Program PD column (x=1640):
- 1770:2212 Live Sessions Tab
- 1770:2350 Calendar Tab
- 1770:2545 Mentoring Tab
- 1770:2605 Certificates Tab
- 1770:2689 About Tab

Locked Course PD column (x=6200) SEO and GEO:
- 1770:2763 Live Sessions Tab
- 1770:2903 About Tab

---

## 8. Design system constraints

### 8.1 Typography

REQ-8.1.1: Primary font Montserrat. Do not use Inter.
REQ-8.1.2: Accent font Playfair only for quotes or editorial titles.
REQ-8.1.3: Type scale:
- PD title: Montserrat Bold 26px (#000)
- Page title: Montserrat Bold 22px (#111)
- Section heading: Montserrat SemiBold 20px (#212121)
- Uppercase label: Montserrat SemiBold 13px, tracking 8% (#888)
- Card title: Montserrat SemiBold 15 to 17px (#111)
- Body: Montserrat Regular 14 to 15px, line-height 22 to 26 (#404040)
- Small label: Montserrat Regular 12 to 13px (#888)
- Tab active: Montserrat SemiBold 14px (#212121)
- Tab inactive: Montserrat Regular 14px (#808080)
- Badge: Montserrat SemiBold 11px
- KPI value: Montserrat Bold 24px (#111)
- KPI label: Montserrat Regular 12px (#7B7D82)

### 8.2 Color tokens (selection)

Type badges (pill 100px radius):
- FLEXIBLE: bg #D9E0FF, text #00146E
- BLENDED: bg #E8D9FF, text #2D0072
- VILT: bg #D6EEFF, text #0836B6

Status badges (WCAG AA):
- In progress (card): bg #D9E0FF, text #0238B8
- Not started: bg #EDEDED, text #525252
- Completed: bg #D9FFE8, text #0B612B
- Locked: bg #6E6E6E, text #FCFCFC
- Access expired: bg rgba(229,51,51,0.1), text #A01E1E
- Behind schedule text: #824600
- At Risk / Under Review: bg #FAEBD1, text #824600
- Failed: bg #F7D5D2, text #AA1E14

Mix bar palette:
- Live color: {r:0.20, g:0.40, b:0.95}
- Self-paced color: {r:0.45, g:0.45, b:0.48}
- Assessment color: {r:0.92, g:0.60, b:0.16}
- Ink: {r:0.102, g:0.102, b:0.102}
- Ink sub: {r:0.42, g:0.42, b:0.42}

Surfaces:
- Card bg: #F0F0F0, radius 8
- KPI card bg: #F7F7FA, radius 8
- Page bg: #FFFFFF
- Urgency banner bg: #FFF5EB, border #F2994D, radius 12

CTA hierarchy:
- Green filled: urgent (Starting Soon, Join Live), bg #219654, text white.
- Dark filled: primary action (Continue Learning, Start Learning, Book Session), bg #212121, text white.
- Blue filled: brand (View Live Sessions, + Ask a Question), bg #3385D9, text white.
- Outlined: secondary action (View Recording, Message, View full Syllabus), bg white, border #BFBFBF, text #404040.
- Gray filled: passive status (Upcoming, Completed, Pending, Confirmed), bg #E8E8E8, text #666.
- Disabled: bg #E0E0E0, text #8C8C8C.

Progress bars:
- Track: #E6E6E6, h 4px, radius 2.
- Fill active: #4078D9.
- Fill completed: #1A994D.
- PD progress bar: h 6px, radius 3, track #EDEDED.

### 8.3 Component rules

REQ-8.3.1: All badges are pills (radius 100). Buttons use 6 to 8px radius. This visual distinction is required.
REQ-8.3.2: Active tab underline: 2px bottom stroke #212121. Active tab bg #F5F5F7.
REQ-8.3.3: Footer uses full-width bar, bg #F7FAFA, top divider 1px #E0E5E8, horizontal padding 132, bottom 32, paddingBottom 0 on parent screens.

### 8.4 Layout constants

- Frame width: 1440
- Page horizontal padding: 80
- Nav horizontal padding: 32
- Card gap: 12 to 16
- KPI cards: equal flex, 16px gap
- Tab bar padding: 20h / 14v per tab

### 8.5 Icon library

REQ-8.5.1: Use Untitled UI free icon set (untitleduicom/free-icons) as project standard.

### 8.6 Language rules

REQ-8.6.1: Always "Module X". Never "MX" or "Mx."
REQ-8.6.2: Time zone label: "EST" across the project.
REQ-8.6.3: "Live Session" is type signifier. "LIVE NOW" is temporal state. Do not swap.
REQ-8.6.4: Not Started modules show no progress bar and no percent. Gray badge only.

### 8.7 Color neutralization rule

REQ-8.7.1: Red and green are reserved for semantic context (danger, success, live). Neutral gray is default on My Learning course-card badges. Outside semantic contexts, stay neutral.

---

## 9. Mentoring and live session presentation

### 9.1 Mentoring

REQ-9.1.1: Mentoring footer appears only on Program PD and its About tab.
REQ-9.1.2: Mentoring footer never appears on inner screens (Assessments, Projects, Progress, Certificates, etc.).
REQ-9.1.3: Mentoring footer never appears on Course-type PDs that lack mentoring.
REQ-9.1.4: Footer structure: left column has title (Montserrat Bold 28px), description, "Explore Mentors" link. Right column has 2 mentor preview cards with "Book Session" CTA.
REQ-9.1.5: Mentor sessions appear on three surfaces: Mentoring tab (action surface, book/reschedule/notes), Calendar (view), Live Sessions list (view). Mentoring tab is the single action surface.

### 9.2 Live session banner

REQ-9.2.1: Live session banner appears only on In Progress programs and courses that currently have an active live session.
REQ-9.2.2: LIVE NOW format: full-width bar, light bg. Green dot + "LIVE" label + course name + session name + elapsed time + "Live Now" green CTA.
REQ-9.2.3: LIVE NOW is global. It can reference a course different from the current page.

---

## 10. Open decisions

Tracked as of Apr 21, 2026. Each blocks a specific area.

### 10.1 Pre-work skip policy

Question: What happens if a learner does not complete pre-work?
- Option A: purely optional.
- Option B: mandatory to enter first live session.
- Option C: tracked, surfaced as a nudge, does not block.

Impact: Program card copy, Calendar milestone behavior, live session gating logic.

Status: sent to stakeholder. Not answered.

### 10.2 VILT attendance vs recording

Question: Does recording-only consumption count as live session completion?
- Option A: yes, watch-to-threshold equals completion.
- Option B: no, attendance only.
- Option C: partial credit.

Impact: REQ-5.1.2 VILT rule, course progress calculation, certificate eligibility.

Status: open.

### 10.3 Calendar click behavior

Question: What happens when a learner clicks an event pill in the Calendar?
- Option A: open session detail inline.
- Option B: navigate to Live Session screen.
- Option C: open a drawer.

Impact: Calendar design, routing.

Status: not designed. Needed before dev handoff.

### 10.4 Delivery mode visual in course structure

Question: How does the course structure surface delivery mode inside a course (badge, icon, color)?

Impact: Module list on Course PD, sidebar rows in Immersive.

Status: open since Apr 10.

### 10.5 Capstone surface

Question: Does Capstone get its own Program PD tab or live inside Courses?

Status: flagged as functional gap in Apr 20 audit. Not designed.

### 10.6 Quiz retake rules

Question: Retake allowed? Max attempts? Cooldown?

Status: open. Affects Quiz topic requirements (section 3.2) and progress logic.

### 10.7 Community and Announcements surfaces

Question: Scope and hierarchy of Community (threads, channels, per-cohort?) and Announcements (who posts, retention, read state).

Status: identified as missing. Not designed.

---

## 11. Acceptance criteria (V5 wireframe milestone)

REQ-11.1: All wireframe numbers on Course PD, Program PD, Locked Course PD pull from AIDM data in section 3.6. No fictional counts.
REQ-11.2: All tab variants enumerated in section 7.5 exist as self-contained frames below their respective PD.
REQ-11.3: Every PD hero conforms to the KPI pattern from section 5.6.
REQ-11.4: Every live session list follows row format in REQ-6.6.2.
REQ-11.5: Every course row in My Learning honors the 7-day next-live rule in REQ-6.2.8.
REQ-11.6: No course row uses raw-count percent for course-level progress. All use minute-weighted.
REQ-11.7: Every VILT topic surface shows date in 12-hour format with `pm` suffix and lesson-level aggregation when multiple VILT topics are in a single lesson.
REQ-11.8: No "Module X" abbreviated to "M X" or "Mx." No em dashes in UI copy. No Inter font.
REQ-11.9: Every badge uses radius 100. Every button uses radius 6 to 8.

---

## 12. Success metrics (post-launch, for reference)

Not measured yet. For forward planning.

- Time-to-next-action on My Learning: median time from page load to first card click.
- Live session attendance rate: attended / scheduled across a cohort.
- Pre-work completion rate by program start.
- Course percent drift: difference between learner self-reported "on track" and system pace chip.
- Unlock preview click-through: percent of learners who open a Locked Course PD before it unlocks.

---

## 13. Risks and constraints

### 13.1 Scale asymmetry

AIDM courses vary 6h to 18h. Program-level pace cannot use counts. Enforced by REQ-5.5.2.

### 13.2 Small solid bars

At program scale, actual progress bars can drop below 2px. Use ring gauges or per-modality scale in future progress surfaces. Noted in apr 17 exploration.

### 13.3 Duplicate course instances

Historically created duplicate VILT and self-paced instances. Enforced by section 3.5 (VILT is a mode, not a type) and by admin validation.

### 13.4 Tab proliferation

Audit flagged redundancy (Instructors vs About, Reviews placement, Live Sessions vs Calendar). Collapse per section 7 target tab lists.

### 13.5 Calendar overlap

Live Sessions, Calendar, Mentoring all show sessions. Clarify surface roles per REQ-9.1.5 and consider Calendar merge per REQ-7.1.1.

---

## 14. Engineering handoff notes

### 14.1 Data bindings

Every number in the UI must be derived from content model fields:
- Topic counts, mode counts, durations: query by program/course/module/lesson.
- "Next live" chip: nearest future VILT topic for that scope where scheduledAt - now ≤ 7 days.
- Progress percent: minutes done divided by total minutes at each scope.

### 14.2 Locked state source

A course is Locked when current datetime < unlock condition. Unlock condition is either a date or a set of prerequisite course IDs all in COMPLETED state.

### 14.3 Time zone handling

Store scheduledAt in UTC. Render in learner's time zone OR project standard "EST" label per REQ-8.6.2. Project currently uses "EST" as the displayed label across the UI.

### 14.4 Hero card technical patterns (for Figma and code)

Four-KPI horizontal row: each column has layoutGrow 1, set layoutSizingHorizontal FILL after appending.

Ring gauges beat bars at small percentages because the gray track provides scale anchor. A progress bar at 1% shows as a 2px sliver with no reference.

Mix-bar implementation: segments are child frames with fixed pixel widths computed from minute ratios. layoutGrow is binary (0 or 1) and cannot be used for proportional widths.

---

## 15. References

- Figma file: Wz2TCYFVr0hD8tJNiLajLt
- V5 page: "V5 - Full Pages - WIP" (1459:178)
- V5 Flow section: 1556:791
- Reference data: `full program syllabus with time duration v4.xlsx`, AIDM sheet
- Companion: `LMS-Product-Description.md`
- Audit: `V5 - Flow Audit - Apr 20.md`
- Previous PRD (V4 era): `PRD-Courses-Programs-Phase1.html`
- Discovery transcripts: `LMS Walkthrough and questions.docx`, `LMS-Walkthrough-Questions-Transcript-20260410.txt`
- VILT architecture diagram: `VILT-Architecture-Flowchart.html`

---

## 16. How to use this PRD (for AI platforms)

1. Treat section 3 (content model) and section 5 (progress model) as invariant. Do not introduce new levels, new modes, or count-based progress.
2. Treat section 6 requirements as the source of truth for screen behavior. If you generate a new screen, conform.
3. When in doubt, prefer Course PD Option 2 (KPI hero), Program PD Option 4 (Next step sidebar), Locked Option 2 grayed.
4. Respect tab target lists in section 7. Do not reintroduce Instructors as a tab on Course PD.
5. Pull numbers from AIDM (section 3.6). Never hardcode fictional counts.
6. Use Montserrat. Respect the color token palette in section 8.2.
7. When the user asks a question that depends on an open decision (section 10), surface the decision, do not invent an answer.
