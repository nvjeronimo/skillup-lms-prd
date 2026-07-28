**FUNCTIONAL REQUIREMENTS DOCUMENT**

  ---------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------
  **Project Name**       ICP (Immersive Course Player)
  **Module Name**        Course Outline Module
  **Document Version**   v1.0
  **Date**               15-Jun-2026
  **Prepared By**        Nilesh Dabhi
  **Reviewed By**        Rashid
  **Approved By**        
  **PRD Reference**      [ICP\_PRD.docx](https://skilluptech-my.sharepoint.com/:w:/g/personal/harpreet_kaur_skillup_tech/IQDM_7SUp7v1SoJUd8CLMnbUAQwuwhS0o88yT5C2xO7ZaAE?e=vmaspN)
  **Status**             Draft
  ---------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------

Table of Contents
=================

[Table of Contents 2](#table-of-contents)

[1. Introduction 3](#introduction)

[1.1 Document Purpose 3](#document-purpose)

[1.2 Scope 3](#scope)

[1.3 Definitions & Abbreviations 3](#definitions-abbreviations)

[1.4 References 4](#references)

[2. System Overview 5](#system-overview)

[2.1 System Context 5](#system-context)

[2.2 User Roles & Personas 5](#user-roles-personas)

[2.3 High-Level Feature List 5](#high-level-feature-list)

[3. Functional Requirements 6](#functional-requirements)

[3.1 Feature: Course Outline Sidebar - Hierarchical Navigation &
Progress Display
6](#feature-course-outline-sidebar---hierarchical-navigation-progress-display)

[3.1.1 Feature Description 6](#feature-description)

[3.1.2 User Stories 6](#user-stories)

[3.1.3 Functional Requirements 6](#functional-requirements-1)

[3.1.4 Business Rules 7](#business-rules)

[3.1.5 UI / UX Behaviour 8](#ui-ux-behaviour)

[3.2 Feature: Resume / Last-Position Restore - Session Continuity
9](#feature-resume-last-position-restore---session-continuity)

[3.2.1 Feature Description 9](#feature-description-1)

[3.2.2 User Stories 9](#user-stories-1)

[3.2.3 Functional Requirements 9](#functional-requirements-2)

[3.2.4 Business Rules 9](#business-rules-1)

[3.3 Acceptance Criteria 10](#acceptance-criteria)

[F-001 - Course Outline Sidebar 10](#f-001---course-outline-sidebar)

[F-002 - Resume / Last-Position Restore
11](#f-002---resume-last-position-restore)

[3.4 Non-Functional Requirements (Module-Level)
11](#non-functional-requirements-module-level)

[3.6 Error Handling & Edge Cases 11](#error-handling-edge-cases)

[4. System-Wide Requirements 13](#system-wide-requirements)

[4.1 Performance Requirements 13](#performance-requirements)

[4.2 Compatibility Requirements 13](#compatibility-requirements)

[5. Appendix 14](#appendix)

[5.1 Open Issues & Decisions Log 14](#open-issues-decisions-log)

[5.2 Content Type Summary Reference 14](#content-type-summary-reference)

[5.3 Change Log 14](#change-log)

[5.4 Sign-Off 14](#sign-off)

1. Introduction
===============

1.1 Document Purpose
--------------------

This Functional Requirements Document (FRD) defines the detailed
functional behaviour, business rules, data requirements, and acceptance
criteria for the Course Outline Module within the Immersive Course
Player (ICP). It is intended to serve as a direct input to development
and AI-assisted implementation. The document covers three core features:
the Course Outline Sidebar (course structure navigation), the Breadcrumb
Location Indicator (contextual awareness), and the Resume /
Last-Position Restore (session continuity).

1.2 Scope
---------

**In Scope:**

-   Course Outline Sidebar: hierarchical display of Course \> Module \>
    Lesson \> Topic with progress and lock states.

-   Resume / Last-Position Restore: automatic return to last-visited
    unit and video playback position on re-entry.

-   Topic type display: icons and duration/time labels for all 10
    content types (Video, Recording, Podcast, Live Session, Reading,
    Practice Quiz, Graded Assignment, Peer-graded Assignment, Discussion
    Prompt, Lab/Activity/Project).

-   Responsive behaviour across desktop (≥ 960 px), tablet (640--959
    px), and mobile (\< 640 px).

**Out of Scope:**

-   Course authoring, content creation, or LMS admin configuration.

-   Content playback engines (video player internals, quiz grading
    logic).

-   User authentication, enrollment, or subscription management.

-   Notification system and external integrations.

*Parent PRD Section: \[Reference section number or feature from the
PRD\]*

1.3 Definitions & Abbreviations
-------------------------------

  -------------------- ------------------------------------------------------------------------------------
  **Term / Acronym**   **Definition**
  FRD                  Functional Requirements Document
  PRD                  Product Requirements Document
  ICP                  Immersive Course Player - the main learner-facing course experience
  LMS                  Learning Management System
  FR                   Functional Requirement
  BR                   Business Rule
  AC                   Acceptance Criteria
  VILT                 Virtual Instructor-Led Training - synchronous live session delivered online
  Topic                The smallest content unit within the course hierarchy (video, quiz, reading, etc.)
  Lesson               An optional grouping layer between Module and Topic
  Module               A major section of the course containing Lessons and/or Topics
  Sidebar              The collapsible left-panel navigation listing the full course outline
  Breadcrumb           A contextual path indicator showing the learner\'s position in the hierarchy
  Resume State         Stored record of the last-visited unit and video playback position
  Lock Indicator       Visual cue (padlock icon) shown on Topics not yet accessible to the learner
  -------------------- ------------------------------------------------------------------------------------

1.4 References
--------------

-   PRD:
    [ICP\_PRD.docx](https://skilluptech-my.sharepoint.com/:w:/g/personal/harpreet_kaur_skillup_tech/IQDM_7SUp7v1SoJUd8CLMnbUAQwuwhS0o88yT5C2xO7ZaAE?e=vmaspN)

-   Wireframes / Mockups:
    <https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=2936-11844&t=TLqnVm6XQg6solhB-1>

-   

2. System Overview
==================

2.1 System Context
------------------

The Immersive Course Player (ICP) is the primary learner-facing
interface of the platform (SkillUp). It renders structured e-learning
content delivered via a hierarchical Course \> Module \> Lesson \> Topic
model. The Course Outline Module is the primary navigation and
orientation system within the ICP; it occupies the left sidebar panel
and governs how learners discover, access, and resume their learning
journey.

The sidebar must support three valid content hierarchy shapes as
documented in the Showcases & Diagrams UI: (1) 5-level: Course \> Module
\> Lesson \> Topic; (2) 4-level without Lesson: Course \> Module \>
Topic; and (3) 3-level without Module: Course \> Topic. The same sidebar
component handles all three shapes through molecule composition - no
separate sidebar variant exists.

The module integrates with the progress tracking service (completion
ticks, overall progress percentage), the content access/lock service
(prerequisite sequencing), and the session-state service (resume
position). It renders responsively across desktop, tablet, and mobile
viewports.

2.2 User Roles & Personas
-------------------------

  --------------------- --------------------------------------------------------------------- ------------------------------------------------------------------------------ -----------------------------
  **Role / Persona**    **Description**                                                       **Key Permissions**                                                            **Notes**
  Learner (Enrolled)    A user who has enrolled in a course and actively uses the ICP         View course outline; access unlocked topics; bookmark topics; track progress   Primary user of this module
  Learner (Returning)   An enrolled learner returning to resume a previously started course   All learner permissions + automatic resume to last position                    Triggers Resume feature
  Learner (Completed)   A learner who has completed all course requirements                   View full outline; access any topic; see final-results view on re-entry        All topics unlocked
  --------------------- --------------------------------------------------------------------- ------------------------------------------------------------------------------ -----------------------------

2.3 High-Level Feature List
---------------------------

  ---------------- --------------------------------------------------------------------- -------------- ----------------------
  **Feature ID**   **Feature Name**                                                      **Priority**   **Sprint / Release**
  F-001            Course Outline Sidebar - Hierarchical Navigation & Progress Display   Must Have      Sprint 1
  F-002            Resume / Last-Position Restore - Session Continuity                   Must Have      Sprint 2
  ---------------- --------------------------------------------------------------------- -------------- ----------------------

3. Functional Requirements
==========================

3.1 Feature: Course Outline Sidebar - Hierarchical Navigation & Progress Display
--------------------------------------------------------------------------------

*Feature ID: F-001 \| Module: Course Outline \| Priority: Must Have \|
Sprint: Sprint 1*

### 3.1.1 Feature Description

The Course Outline Sidebar provides learners with a persistent,
structured overview of the entire course directly within the Immersive
Course Player. It is displayed in the left panel and lists all Modules,
Lessons (where present), and Topics in the exact order specified by the
course author. Each entry shows its completion state (tick for
completed, highlight for active, padlock for locked) and every Topic
displays a content-type icon and a duration or scheduled-time label. The
sidebar is collapsible on desktop and tablet, and transforms into a
slide-over drawer on mobile. Selecting any unlocked Topic immediately
loads its content into the main panel without a full page reload.\\

### 3.1.2 User Stories

  -------------- ------------------- -------------------------------------------------------------------------- --------------------------------------------------------------------- --------------
  **Story ID**   **As a\...**        **I want to\...**                                                          **So that\...**                                                       **Priority**
  US-001-01      Learner             See the complete course structure in the sidebar at all times              I can plan my learning path and understand what remains               Must Have
  US-001-02      Learner             See which topics I have completed, which is active, and which are locked   I always know my current standing in the course                       Must Have
  US-001-03      Learner             Click on any unlocked topic and have it load instantly in the main panel   I can navigate freely without losing context                          Must Have
  US-001-04      Learner             Collapse the sidebar to gain more viewing space for content                I can focus on the content without distraction                        Must Have
  US-001-05      Learner             See content type and duration for each topic in the sidebar                I can manage my time and know what kind of task awaits me             Must Have
  US-001-06      Learner on mobile   Open a slide-over drawer to access the course outline                      I can navigate the course on a small screen without losing my place   Must Have
  US-001-07      Learner             Expand and collapse individual Modules and Lessons in the sidebar          I can focus on the current section without scrolling past others      Should Have
  US-001-08      Learner             Bookmark a topic from the sidebar                                          I can return to important topics quickly                              Should Have
  -------------- ------------------- -------------------------------------------------------------------------- --------------------------------------------------------------------- --------------

### 3.1.3 Functional Requirements

  ----------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -------------- -------------------
  **FR-ID**   **Requirement Description**                                                                                                                                                                                                                                              **Priority**   **Source**
  FR-001-01   The system SHALL render the Course Outline Sidebar as a fixed left panel within the ICP on desktop (≥ 960 px) and tablet (640--959 px) viewports. On mobile (\< 640 px), the sidebar SHALL render as a slide-over drawer triggered by a menu icon.                       Must Have      US-001-01
  FR-001-02   The sidebar SHALL display the course name at the top, followed by an Overall Progress indicator, followed by the hierarchical list: Course \> Module \> Lesson (if present) \> Topic.                                                                                    Must Have      US-001-01
  FR-001-03   The system SHALL display Modules, Lessons, and Topics in the exact sequence defined by the course author. The order SHALL NOT be altered by learner progress, date, or any other dynamic factor.                                                                         Must Have      US-001-01 / Req-1
  FR-001-04   The system SHALL render a green tick (✓) on Topics that the learner has completed. The currently active Topic SHALL be highlighted with a left-border accent and a distinct background. Topics not yet accessible SHALL display a padlock icon.                          Must Have      US-001-02 / Req-2
  FR-001-05   The system SHALL allow the learner to click or tap any unlocked Topic row in the sidebar to load that topic\'s content in the main panel. Locked Topics SHALL be non-interactive and SHALL NOT load content on click.                                                    Must Have      US-001-03 / Req-3
  FR-001-06   The sidebar SHALL be collapsible on desktop and tablet via a toggle button. When collapsed, the sidebar SHALL hide all text labels; the main content panel SHALL expand to fill the freed space. The collapsed state SHALL be remembered per session.                    Must Have      US-001-04 / Req-4
  FR-001-07   The system SHALL display a content-type icon and a duration / time label on every Topic row. Duration display rules by topic type are defined in Business Rules BR-001-01 through BR-001-10.                                                                             Must Have      US-001-05 / Req-7
  FR-001-08   Each Module and Lesson row SHALL be expandable and collapsible via a chevron toggle. The currently active Module and its parent Lesson SHALL be expanded by default when the sidebar loads.                                                                              Should Have    US-001-07 / Req-5
  FR-001-09   The sidebar SHALL display a Lesson sub-header label (e.g., \'Define and measure\') between the Lesson row and its Topic rows when the course uses a 5-level hierarchy.                                                                                                   Must Have      US-001-01
  FR-001-10   The system SHALL support three content hierarchy shapes: (a) 5-level: Module \> Lesson \> Topic; (b) 4-level: Module \> Topic (no Lesson); (c) 3-level: Topic only (no Module, no Lesson). The same sidebar component SHALL handle all three via molecule composition.   Must Have      US-001-01
  FR-001-11   Each Topic row SHALL display the topic\'s display name, content-type icon, and the duration/time label. Long topic names SHALL truncate with an ellipsis to fit within the sidebar width.                                                                                Must Have      US-001-05 / Req-6
  FR-001-12   The system SHALL display a bookmark icon on Topic rows. The learner MAY click the bookmark icon to save/unsave a topic. Bookmarked topics SHALL be visually distinguished (filled bookmark icon).                                                                        Should Have    US-001-08
  FR-001-13   On mobile, the slide-over drawer SHALL be openable via a hamburger/menu icon and closeable via an ✕ button or by tapping outside the drawer. The drawer SHALL overlay the main content panel.                                                                            Must Have      US-001-06 / Req-4
  ----------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -------------- -------------------

### 3.1.4 Business Rules

  ----------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------
  **BR-ID**   **Business Rule**                                                                                                                                                                                                             **Notes**
  BR-001-01   Video topics SHALL display the exact media duration (e.g., \'Video · 3m 20s\').                                                                                                                                               Sourced from media metadata
  BR-001-02   Recording topics SHALL display the exact media duration (e.g., \'Recording · 45m\').                                                                                                                                          Same as video logic
  BR-001-03   Podcast topics SHALL display the exact audio duration (e.g., \'Podcast · 22m\').                                                                                                                                              Sourced from audio metadata
  BR-001-04   Live Session (VILT) topics SHALL display the scheduled date and time (e.g., \'Live · Jun 20, 2:00 PM\') rather than a duration. If the session has ended, display \'Recording available\'.                                    Time shown in the learner\'s local timezone
  BR-001-05   Reading topics SHALL display an approximate reading duration (e.g., \'Reading · 8 min\'). Duration is calculated at the rate of 150 words per minute, rounded to the nearest minute.                                          
  BR-001-06   Practice Quiz topics SHALL display \'Practice · X min\' - exact if the quiz is timed; approximate (based on estimated completion time set by the author) if untimed.                                                          
  BR-001-07   Graded Assignment topics SHALL display \'Graded · X min\' - exact if timed; hide if not timed.                                                                                                                                
  BR-001-08   Peer-graded Assignment topics SHALL display an approximate duration (e.g., \'Peer-graded · 30 min\') based on author-defined estimate.                                                                                        
  BR-001-09   Lab, Activity, and Project topics SHALL display an approximate duration (e.g., \'Activity · 10 min\') based on the author-defined estimate.                                                                                   
  BR-001-10   A Topic SHALL display a padlock icon and be non-interactive if the learner has not met the prerequisite conditions defined by the course author. The system SHALL NOT reveal the content of locked topics.                    
  BR-001-11   The completed state (green tick) SHALL be set only by the platform\'s progress service after the learner meets the completion criteria for that topic type. The sidebar SHALL reflect the current persisted progress state.   
  BR-001-12   Module-level progress (e.g., \'3/9\') SHALL count only Topics, not Lesson headers, toward the completed / total counts.                                                                                                       
  ----------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------

### 3.1.5 UI / UX Behaviour

**Responsive Behaviour:**

-   Desktop (≥ 960 px): Sidebar visible by default, collapsible via
    toggle button. Collapses to icon-rail.

-   Tablet (640--959 px): Sidebar visible by default, collapsible. Width
    may reduce slightly.

-   Mobile (\< 640 px): Sidebar hidden by default. Accessible via
    slide-over drawer triggered by a menu icon in the top bar. Drawer
    overlays the content. Closed via ✕ or outside tap.

**States:**

-   Completed: Green filled check icon (✓), topic text in normal weight.

-   Active / In-progress: Highlighted row with left blue bar accent;
    radio/circle indicator in active state.

-   Pending (unlocked, not started): Empty circle indicator.

-   Locked: Padlock icon; row is non-interactive and visually muted.

-   Bookmarked: Filled bookmark icon on the right side of the topic row.

3.2 Feature: Resume / Last-Position Restore - Session Continuity
----------------------------------------------------------------

*Feature ID: F-002 \| Module: Course Outline \| Priority: Must Have \|
Sprint: Sprint 1*

### 3.2.1 Feature Description

The Resume / Last-Position Restore feature ensures learners return to
exactly the point in the course where they left off, eliminating the
friction of manually locating their last topic. When a learner reopens a
course, the ICP automatically loads the last-visited topic and, if that
topic was a video, resumes playback within five seconds of the position
at which the learner closed the session. If the course is fully
completed, the learner is directed to the course final-results view.

### 3.2.2 User Stories

  -------------- ---------------------------------- ----------------------------------------------------------------------------- ---------------------------------------------------------------------- --------------
  **Story ID**   **As a\...**                       **I want to\...**                                                             **So that\...**                                                        **Priority**
  US-002-01      Returning learner                  Automatically land on the last topic I was viewing when I reopen the course   I do not have to scroll through the outline to find where I left off   Must Have
  US-002-02      Returning learner                  Have my video resume from where I stopped watching                            I do not have to manually seek to my position in a long video          Must Have
  US-002-03      Learner who completed the course   Be taken to the final-results view when I reopen the course                   I can see my completion status and certificate without confusion       Must Have
  -------------- ---------------------------------- ----------------------------------------------------------------------------- ---------------------------------------------------------------------- --------------

### 3.2.3 Functional Requirements

  ----------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -------------- ------------
  **FR-ID**   **Requirement Description**                                                                                                                                                                                                                **Priority**   **Source**
  FR-002-01   The system SHALL persist the learner\'s last-viewed Topic ID and, for video topics, the last playback position (in seconds) to the backend session-state service each time the learner navigates away from a topic or closes the course.   Must Have      US-003-01
  FR-002-02   When a learner opens a course they have previously visited, the system SHALL automatically load the last-persisted Topic without requiring manual navigation.                                                                              Must Have      US-003-01
  FR-002-03   If the last topic was a video, the system SHALL seek the video player to within five (5) seconds before the persisted playback position and resume from that point. Playback SHALL NOT auto-start; the learner SHALL initiate play.        Must Have      US-003-02
  FR-002-04   If the learner has met all completion criteria for the course, the system SHALL redirect the learner to the Course Final-Results / Completion View instead of a content topic.                                                             Must Have      US-003-03
  FR-002-05   The system SHALL update the persisted resume state each time the learner navigates to a new topic. The state SHALL be stored server-side and SHALL persist across devices and browsers.                                                    Must Have      US-003-01
  FR-002-06   If no resume state exists for a course (first visit), the system SHALL load the first available (unlocked) Topic.                                                                                                                          Must Have      US-003-01
  ----------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -------------- ------------

### 3.2.4 Business Rules

  ----------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ ------------------------------
  **BR-ID**   **Business Rule**                                                                                                                                                                                                                          **Notes**
  BR-002-01   Resume state MUST be stored server-side and linked to the learner\'s account. Client-side storage (localStorage, cookie) may be used as a cache but SHALL NOT be the primary store.                                                        Enables cross-device resume
  BR-002-02   The video seek offset SHALL be exactly 5 seconds prior to the persisted position, with a minimum of 0 seconds (do not seek to negative time).                                                                                              Provides brief recap context
  BR-002-03   Course completion is determined by the platform\'s progress/completion service. The Course Outline Module SHALL read this state; it SHALL NOT compute or write completion status independently.                                            Single source of truth
  BR-002-04   If the last-viewed topic has become locked since the learner\'s last visit (e.g., due to content restructuring), the system SHALL fallback to loading the first available unlocked topic and SHALL NOT attempt to load the locked topic.   
  ----------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ ------------------------------

3.3 Acceptance Criteria
-----------------------

### F-001 - Course Outline Sidebar

  ----------- --------------------------------------------------------------- ------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------
  **AC-ID**   **Given**                                                       **When**                                          **Then**                                                                                                                                          **Test Type**
  AC-001-01   A learner opens a course with 3 modules and 9 topics            The sidebar loads                                 All modules appear in author-defined order; each topic shows its type icon and duration; completed topics show tick; locked topics show padlock   Functional
  AC-001-02   A learner is on a desktop viewport (≥ 960 px)                   They click the sidebar toggle button              The sidebar collapses and the main content panel expands to fill the space; toggle again re-opens it                                              Functional
  AC-001-03   A learner is on a mobile device (\< 640 px)                     They tap the menu icon                            A slide-over drawer opens from the left showing the full course outline; tapping outside or ✕ closes it                                           Functional
  AC-001-04   A learner attempts to click a locked topic                      They tap/click the locked topic row               Nothing happens; the topic does not load; no navigation occurs                                                                                    Functional
  AC-001-05   A learner completes a video topic                               Completion is confirmed by the progress service   The topic row updates to show a green tick in the sidebar without a full page reload                                                              Functional / Integration
  AC-001-06   A course uses a 5-level hierarchy (Module \> Lesson \> Topic)   The sidebar renders                               Lesson sub-headers appear between Module header and Topic rows; hierarchy is visually clear                                                       Functional
  AC-001-07   A topic has a \'Reading\' content type with 1600 words          The topic row is displayed                        Duration shows \'Reading · 8 min\' (1600 / 200 = 8)                                                                                               Functional
  ----------- --------------------------------------------------------------- ------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------

### 

### F-002 - Resume / Last-Position Restore

  ----------- ----------------------------------------------------------------------- ------------------------ ---------------------------------------------------------------------------------------------------------- ------------------------
  **AC-ID**   **Given**                                                               **When**                 **Then**                                                                                                   **Test Type**
  AC-002-01   A learner viewed Topic 5 (a video at 2:30) and closed the course        They reopen the course   Topic 5 loads automatically and the video player is seeked to 2:25 (5 s before); learner must press play   Functional
  AC-002-02   A learner has completed all course topics                               They reopen the course   The Final-Results / Completion View is shown instead of a content topic                                    Functional
  AC-002-03   A learner opens a course for the first time (no resume state)           The course loads         The first available unlocked topic is loaded                                                               Functional
  AC-002-04   A learner\'s last-viewed topic has been locked since their last visit   They reopen the course   The first available unlocked topic loads; no error is shown                                                Functional / Edge Case
  AC-002-05   A learner resumes on a different device from their original session     They open the course     The resume position from the server-side state is respected; the same topic and video position load        Integration
  ----------- ----------------------------------------------------------------------- ------------------------ ---------------------------------------------------------------------------------------------------------- ------------------------

3.4 Non-Functional Requirements (Module-Level)
----------------------------------------------

  ------------ ----------------------------------------------- ------------------------------------------------------------------------------------------------------------- --------------------------------------
  **NFR-ID**   **Requirement**                                 **Target**                                                                                                    **Measurement Method**
  NFR-001      Sidebar initial render time                     \< 300 ms after course data is fetched                                                                        Browser performance API / Lighthouse
  NFR-002      Topic navigation load time (clicking a topic)   \< 500 ms to content visible                                                                                  Server-side logging + RUM
  NFR-003      Video seek accuracy on resume                   Within ±1 second of persisted position                                                                        Automated playback test
  NFR-004      Sidebar progress state sync                     Progress ticks update within 2 seconds of backend confirmation                                                Integration test
  NFR-005      Responsive breakpoint rendering                 No layout overflow or hidden interactive elements at 320 px, 640 px, 960 px, 1280 px, 1920 px                 Cross-browser / device testing
  NFR-006      Accessibility                                   Sidebar and breadcrumb meet WCAG 2.1 AA: keyboard navigable, ARIA labels on icons, focus indicators visible   Axe / manual audit
  ------------ ----------------------------------------------- ------------------------------------------------------------------------------------------------------------- --------------------------------------

3.6 Error Handling & Edge Cases
-------------------------------

  --------------------------------------------------------------------- ---------------------------------------------------------------------------------- -----------------------------------------------------------
  **Scenario**                                                          **Expected Behaviour**                                                             **User-Facing Message / UI**
  Course outline data fails to load (API error)                         Show skeleton loader for 3 s, then display error state with a retry button         \'Could not load course outline. Please try again.\'
  Learner clicks unlocked topic but content API times out               Show loading spinner for up to 5 s, then show inline error with retry option       \'Content is taking longer than expected. Tap to retry.\'
  Resume state references a topic that no longer exists in the course   Fall back to first available unlocked topic; log the stale reference server-side   No error shown to learner; silent fallback
  Module expand/collapse state fails to persist                         Module defaults to expanded; no error surfaced to learner                          Silent - not critical UX flow
  Video seek-to-resume fails (player error)                             Load the topic without seeking; start from the beginning                           No error; player loads at 0:00
  Live Session topic has no scheduled time set                          Display \'Live · TBD\' as the duration label                                       \'Live · TBD\'
  Progress percentage exceeds 100% due to data error                    Cap display at 100%; log the anomaly                                               Progress bar shows 100%
  --------------------------------------------------------------------- ---------------------------------------------------------------------------------- -----------------------------------------------------------

4. System-Wide Requirements
===========================

4.1 Performance Requirements
----------------------------

  ------------------------------------------- --------------------------------- ----------------------------
  **Requirement**                             **Target**                        **Measurement Method**
  Page Load Time (P95) --- ICP initial load   \< 2 seconds                      Lighthouse / Datadog RUM
  Sidebar topic navigation (P95)              \< 500 ms                         Server-side logging
  Resume state persist (write)                \< 200 ms API response            Server-side logging
  Concurrent users supported                  TBD --- align with platform SLA   Load testing (JMeter / k6)
  Database / API query time (P99)             \< 200 ms                         Query monitoring
  ------------------------------------------- --------------------------------- ----------------------------

4.2 Compatibility Requirements
------------------------------

  ------------------------ ------------------------------------------------------------
  **Platform**             **Minimum Version / Requirement**
  Web Browsers             Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
  Mobile - iOS             Safari on iOS 14+
  Mobile - Android         Chrome on Android 10+
  Screen Resolutions       320 px (mobile min) to 2560 px (4 K)
  Responsive Breakpoints   Mobile \< 640 px \| Tablet 640--959 px \| Desktop ≥ 960 px
  ------------------------ ------------------------------------------------------------

5. Appendix
===========

5.1 Open Issues & Decisions Log
-------------------------------

  -------------- ------------------------------------------------------------------------------------------------------- ---------------- ----------------- ---------------
  **Issue ID**   **Description**                                                                                         **Owner**        **Target Date**   **Status**
  OI-001         Confirm exact video seek offset - 5 s before or at exact position                                       Product Owner    TBD               Open
  OI-002         Define prerequisite-unlock logic                                                                        Tech Lead / BA   TBD               Open
  OI-004         Clarify 3-level hierarchy (no module) breadcrumb format: Course \> Topic or just Topic name on mobile   BA / UX          TBD               In Discussion
  OI-005         Confirm cross-device resume requirement - whether offline/PWA scenarios are in scope                    Tech Lead        TBD               Open
  -------------- ------------------------------------------------------------------------------------------------------- ---------------- ----------------- ---------------

5.2 Content Type Summary Reference
----------------------------------

  -------------------------- ------------------------------------------------------------- -----------------------------
  **Content Type**           **Duration Display Rule**                                     **Source of Duration Data**
  Video                      Exact duration (e.g., \'3m 20s\')                             Media file metadata
  Recording                  Exact duration                                                Media file metadata
  Podcast                    Exact duration                                                Audio file metadata
  Live Session (VILT)        Scheduled date & time; \'Recording available\' post-session   LMS scheduling service
  Reading                    Approx. (word count ÷ 250 wpm, rounded to nearest min)        CMS word count
  Practice Quiz              Exact if timed; Hide if untimed                               Quiz config
  Graded Assignment          Exact if timed; Hide if untimed                               Assignment config
  Peer-graded Assignment     Approx. (author-defined estimate)                             Author metadata
  Discussion Prompt          Exact if timed; approx. if not                                Author metadata
  Lab / Activity / Project   Approx. (author-defined estimate)                             Author metadata
  -------------------------- ------------------------------------------------------------- -----------------------------

5.3 Change Log
--------------

  ------------- ------------- ------------ ---------------------------------------------
  **Version**   **Date**      **Author**   **Summary of Changes**
  v1.0          15-Jun-2026   Nilesh       Initial draft --- Course Outline Module FRD
  ------------- ------------- ------------ ---------------------------------------------

5.4 Sign-Off
------------

  --------------------------- ---------- --------------- -------------
  **Role**                    **Name**   **Signature**   **Date**
  Business Analyst            Nilesh                     15-Jun-2026
  Senior BA / Product Owner   Rashid                     16-Jun-2026
  Tech Lead / Architect                                  
  Project Manager                                        
  --------------------------- ---------- --------------- -------------
