**FUNCTIONAL REQUIREMENTS DOCUMENT**

**Video Lessons**

*Immersive Course Player (ICP) · Maps to PRD for Function 5.3*

  **Field**          **Details**
  ------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Project Name       Immersive Course Player (ICP)
  Module Name        Video Lessons (Player, Transcript, Completion)
  Document Version   v1.0
  Date               15-Jun-2026
  Prepared By        Mohhammad Rashid
  Reviewed By        Mohhammad Rashid
  Approved By        
  PRD Reference      [ICP\_PRD.docx](https://skilluptech-my.sharepoint.com/:w:/r/personal/harpreet_kaur_skillup_tech/_layouts/15/Doc.aspx?sourcedoc=%7B94B4FFCC-BBA7-4AF5-8254-77C08B3276D4%7D&file=ICP_PRD.docx&action=default&mobileredirect=true)
  Status             Under Review

Contents
--------

[Contents 1](#contents)

[1. Introduction 3](#introduction)

[1.1 Document Purpose 3](#document-purpose)

[1.2 Scope 3](#scope)

[1.3 Definitions & Abbreviations 3](#definitions-abbreviations)

[1.4 References 3](#references)

[2. System Overview 5](#system-overview)

[2.1 System Context 5](#system-context)

[2.2 User Roles & Personas 5](#user-roles-personas)

[2.3 High-Level Feature List 5](#high-level-feature-list)

[3. Functional Requirements 6](#functional-requirements)

[3.1 Feature: Video Player & Playback Controls
6](#feature-video-player-playback-controls)

[3.2 Feature: Synced Live Transcript 9](#feature-synced-live-transcript)

[3.3 Feature: Video Watch Progress & Completion
11](#feature-video-watch-progress-completion)

[4. System-Wide Requirements 14](#system-wide-requirements)

[4.1 Performance Requirements 14](#performance-requirements)

[4.2 Security & Privacy Requirements 14](#security-privacy-requirements)

[4.3 Compatibility Requirements 14](#compatibility-requirements)

[Sign Off 14](#sign-off)

1. Introduction
===============

1.1 Document Purpose
--------------------

This Functional Requirements Document (FRD) defines the detailed
functional behaviour, business rules, data requirements, and acceptance
criteria for the Video Lessons capability of the Immersive Course Player
(ICP). It expands PRD 5.3 (requirements FR-06, FR-07, and FR-08) into
implementable detail and is intended to serve as a direct input to
development using AI-assisted tools (Claude / Codex) or manual
implementation.

The ICP is a facade over SkillUp Online\'s existing learning platform:
it presents existing course content, completion state, and media through
a single branded screen. This FRD therefore specifies the learner-facing
player behaviour and the contract with the underlying platform --- it
does not redesign how media is hosted, encoded, or graded.

1.2 Scope
---------

**In Scope:** The in-screen video player and its controls (play/pause,
scrub, ±10s skip, speed selection, captions, full-screen); the synced
live transcript and click-to-seek behaviour; recording video watch
progress against the learner\'s account and reflecting completion in the
sidebar; keyboard and accessibility behaviour specific to the player.

**Out of Scope:** Video hosting, transcoding, adaptive-bitrate
packaging, and DRM (provided by the underlying platform / media
service); transcript generation/translation authoring; notes (PRD 5.4),
downloads (5.5), discussion (5.6), quizzes (5.7, covered in a separate
FRD); the AI assistant (5.9).

**Parent PRD Section:** 5.3 Video lessons --- FR-06 (player controls),
FR-07 (synced transcript), FR-08 (completion tracking).

1.3 Definitions & Abbreviations
-------------------------------

  **Term / Acronym**      **Definition**
  ----------------------- -----------------------------------------------------------------------------------------------------------------------
  FRD                     Functional Requirements Document.
  PRD                     Product Requirements Document --- the parent ICP PRD v1.0.
  FR / BR / AC            Functional Requirement / Business Rule / Acceptance Criteria.
  ICP                     Immersive Course Player --- the single-screen enrolled-learner experience.
  Unit                    Smallest piece of a course --- here, one video lesson.
  Platform / LMS          The underlying open-source learning platform the ICP sits on top of (source of media, transcripts, completion state).
  Cue / Transcript line   A single timed segment of the transcript with a start time, end time, and text.
  Watch threshold         The proportion of a video the platform requires watched before a unit is marked complete.
  Resume position         The last playback position recorded for the learner on a given unit.
  WCAG 2.1 AA             Accessibility conformance level the ICP must meet.

1.4 References
--------------

-   **PRD:** Immersive Course Player · PRD, v1.0, 27 April 2026
    (Harpreet Kaur, Product Design).

-   **Prototype (visual source of truth):** SkillUp\_ICP\_v6.html ---
    interactive prototype defining player layout, control set, speed
    steps, and keyboard shortcuts.

-   **Design system:** SkillUp v6 design system --- typography
    (Montserrat / Playfair Display / Outfit), colour tokens, logo rules.
    Assets are pulled from the centralised system, never hard-coded (PRD
    FR-17).

2. System Overview
==================

2.1 System Context
------------------

SkillUp Online delivers courses through an open-source learning
platform. Each course is a sequence of units; a video unit is the most
common type. Out of the box the platform provides a generic player on
its own page. The ICP replaces that page with a single, branded,
three-panel screen --- sidebar outline (left), main media panel
(centre), and AI assistant (right) --- keeping the learner in one
continuous flow.

For Video Lessons, the ICP requests the media reference, transcript
cues, the learner\'s resume position, and the platform\'s
watch-threshold rule from the platform; renders them in the centre
panel; and reports playback progress and completion events back to the
platform so that grades, progress, and cross-device resume stay correct.
The platform remains the system of record for media, transcripts, and
completion. The ICP is the presentation layer.

+----------------------------------------------------------------------+
| **Key architectural principle**                                      |
|                                                                      |
| The ICP never becomes a second source of truth. Completion is        |
| recorded against the learner\'s account on the platform --- not the  |
| device --- so progress is identical whether the learner is on a      |
| laptop or a phone (PRD FR-08, 6.4).                                  |
+----------------------------------------------------------------------+

2.2 User Roles & Personas
-------------------------

  **Role / Persona**      **Description**                                                                                  **Key Permissions**                                                                                                                          **Notes**
  ----------------------- ------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------
  Enrolled Learner        Signed-in user registered for the course. The primary actor for every requirement in this FRD.   View video units; control playback; read transcript; seek via transcript; toggle captions; full-screen. Read-only on transcript and media.   May move between desktop and mobile mid-course; may not be a native English speaker.
  Course Author / Admin   Owns course content on the platform. Not an ICP user.                                            Upload/replace media, captions, and transcript cues on the platform (out of scope for the ICP UI).                                           Authoring happens on the platform.

2.3 High-Level Feature List
---------------------------

This FRD covers the following features, all within PRD 5.3:

  **Feature ID**   **Feature Name**                    **Priority**   **PRD / Sprint**
  ---------------- ----------------------------------- -------------- ------------------
  F-VID-001        Video Player & Playback Controls    Must Have      FR-06 · Phase P1
  F-VID-002        Synced Live Transcript              Must Have      FR-07 · Phase P1
  F-VID-003        Video Watch Progress & Completion   Must Have      FR-08 · Phase P1

3. Functional Requirements
==========================

3.1 Feature: Video Player & Playback Controls
---------------------------------------------

*Feature ID: F-VID-001 \| Module: Video Lessons \| Priority: Must Have
\| PRD: FR-06 \| Phase: P1*

### 3.1.1 Feature Description

The video player renders the current video unit in the centre panel and
gives the learner the full set of standard media controls without
leaving the ICP. Controls are: play/pause, a scrub/seek bar with elapsed
and total time, skip back and forward by 10 seconds, a playback-speed
selector cycling 0.75× → 1× → 1.25× → 1.5× → 2×, a captions (CC) toggle
that is on by default, and full-screen. The player exposes its current
position and duration so the transcript (F-VID-002) and completion logic
(F-VID-003) stay in sync.

### 3.1.2 User Stories

  **Story ID**   **As a\...**   **I want to\...**                                           **So that\...**                                            **Priority**
  -------------- -------------- ----------------------------------------------------------- ---------------------------------------------------------- --------------
  US-V1-01       Learner        play and pause the lesson with one click or the space bar   I can control the lesson at my own pace                    Must Have
  US-V1-02       Learner        skip back or forward 10 seconds                             I can re-hear a point or move past something I know        Must Have
  US-V1-03       Learner        speed the video up or slow it down                          I can match the pace to my comfort and the language        Must Have
  US-V1-04       Learner        turn captions on or off                                     I can follow along when audio is hard or I\'m non-native   Must Have
  US-V1-05       Learner        watch full-screen                                           I can focus on the content without distractions            Should Have

### 3.1.3 Functional Requirements

  **FR-ID**   **Requirement Description**                                                                                                                                                                                                                                     **Priority**   **Source**
  ----------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -------------- ------------
  FR-V1-01    The system SHALL render the current video unit in the centre panel with a play/pause control, a draggable scrub bar showing elapsed time and total duration, skip-back-10s, skip-forward-10s, a speed selector, a captions toggle, and a full-screen control.   Must           US-V1-01
  FR-V1-02    The system SHALL toggle play/pause when the user clicks the play control OR presses the Space bar while focus is not in a text field.                                                                                                                           Must           US-V1-01
  FR-V1-03    The system SHALL skip the playback position backward 10 seconds on the skip-back control or the Left arrow key, and forward 10 seconds on the skip-forward control or the Right arrow key, clamped to \[0, duration\].                                          Must           US-V1-02
  FR-V1-04    The system SHALL cycle playback speed through the ordered set {0.75×, 1×, 1.25×, 1.5×, 2×} each time the speed control is activated, wrapping from 2× back to 0.75×, and SHALL display the active speed.                                                        Must           US-V1-03
  FR-V1-05    The system SHALL allow the learner to seek to any position by clicking or dragging the scrub bar, and SHALL update elapsed time and the transcript highlight to match.                                                                                          Must           US-V1-02
  FR-V1-06    The system SHALL provide a captions toggle (CC) that shows/hides synchronised captions; captions SHALL default to ON for every video unit. The \'C\' key SHALL toggle captions.                                                                                 Must           US-V1-04
  FR-V1-07    The system SHALL provide full-screen entry/exit that works in all supported browsers (latest two of Chrome, Edge, Safari, Firefox; Safari iOS; Chrome Android).                                                                                                 Should         US-V1-05
  FR-V1-08    The system SHALL persist and restore the learner\'s last-used playback speed and captions preference across units within a session, defaulting to 1× and captions-on at session start.                                                                          Should         US-V1-03

### 3.1.4 Business Rules

  **BR-ID**   **Business Rule**                                                                                                                                                                   **Notes**
  ----------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -----------------------------------
  BR-V1-01    Captions default to ON for every video unit, regardless of the learner\'s previous toggle, unless a per-learner caption preference exists. Aligns with PRD FR-19 (accessibility).   Default-on; learner may turn off.
  BR-V1-02    Speed set is fixed to {0.75, 1, 1.25, 1.5, 2}. No free-form speed entry.                                                                                                            Matches prototype.
  BR-V1-03    Skip interval is fixed at 10 seconds for both directions.                                                                                                                           Matches FR-06.
  BR-V1-04    Keyboard shortcuts are suppressed when focus is inside a text input or textarea (e.g. notes, AI box), so typing a space does not pause the video.                                   Prevents shortcut conflicts.
  BR-V1-05    If a unit has no captions track, the captions toggle is shown disabled with an accessible explanation rather than hidden silently.                                                  Avoids a dead control.

### 3.1.6 Acceptance Criteria

  **AC-ID**   **Given**                                                    **When**                                           **Then**                                                                                         **Type**
  ----------- ------------------------------------------------------------ -------------------------------------------------- ------------------------------------------------------------------------------------------------ ---------------
  AC-V1-01    A learner is on a video unit, focus outside any text field   They press the Space bar                           Playback toggles between play and pause                                                          Functional
  AC-V1-02    A video is playing at position 40s                           The learner presses Left arrow then Right arrow    Position moves to 30s, then back to 40s (±10s each), clamped at 0 and duration                   Functional
  AC-V1-03    Playback speed is 1.5×                                       The learner activates the speed control twice      Speed becomes 2×, then wraps to 0.75×, and the label updates each time                           Functional
  AC-V1-04    A video unit with a captions track                           The unit first loads                               Captions are visible by default and the CC toggle shows the ON state                             Functional
  AC-V1-05    A learner clicks midway along the scrub bar                  The seek completes                                 Playback position, elapsed time, and the transcript highlight all jump to that point within 1s   Functional
  AC-V1-06    Any supported desktop or mobile browser                      The learner activates full-screen and then exits   The player enters and exits full-screen without losing playback position                         Compatibility

### 3.1.7 Non-Functional Requirements (Feature-Level)

-   Performance: video starts playing within 2 seconds of pressing play
    on a typical 4G connection (PRD 6.1).

-   Performance: control actions (play, skip, speed, seek) respond
    visually within 100ms.

-   Accessibility: every control has a descriptive accessible name;
    focus is always visible; state is not conveyed by colour alone (PRD
    FR-19).

-   Reliability: a media load failure shows a friendly retry state and
    never a blank panel (PRD 6.2).

### 3.1.8 Error Handling & Edge Cases

  **Scenario**                            **Expected Behaviour**                                                **User-Facing Message**
  --------------------------------------- --------------------------------------------------------------------- --------------------------------------------------------------------------
  Media fails to load / network drop      Show retry affordance; auto-retry once; preserve resume position      "We couldn't load this video. Check your connection and try again."
  No captions track for the unit          Captions toggle shown disabled with accessible note (BR-V1-05)        "Captions aren't available for this lesson."
  Full-screen blocked by browser policy   Fall back to maximised in-page player                                 "Full-screen isn't available here --- showing the largest in-page view."
  Seek requested before metadata loads    Queue the seek; apply once duration is known                          (silent --- spinner shown)
  Space pressed while typing a note       Insert a space in the text field; do NOT toggle playback (BR-V1-04)   (none)

3.2 Feature: Synced Live Transcript
-----------------------------------

*Feature ID: F-VID-002 \| Module: Video Lessons \| Priority: Must Have
\| PRD: FR-07 \| Phase: P1*

### 3.2.1 Feature Description

Alongside the video, a Transcript tab shows the full lesson transcript
as a list of timed lines. As the video plays, the line currently being
spoken is highlighted and the list auto-scrolls to keep it in view.
Clicking any line seeks the video to that line\'s start timestamp. The
transcript is read-only and is sourced from the platform\'s transcript
cues for the unit; it supports whatever languages the course author has
provided (PRD 6.5).

### 3.2.2 User Stories

  **Story ID**   **As a\...**   **I want to\...**                      **So that\...**                                               **Priority**
  -------------- -------------- -------------------------------------- ------------------------------------------------------------- --------------
  US-V2-01       Learner        read the transcript while I watch      I can follow along when audio is unclear or I\'m non-native   Must Have
  US-V2-02       Learner        see which line is being spoken now     I never lose my place in the lesson                           Must Have
  US-V2-03       Learner        click a line to jump the video there   I can re-hear or skip to a specific point quickly             Must Have

### 3.2.3 Functional Requirements

  **FR-ID**   **Requirement Description**                                                                                                                                                                          **Priority**   **Source**
  ----------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -------------- ------------
  FR-V2-01    The system SHALL display the full transcript for the active video unit as an ordered list of timed lines in a Transcript tab.                                                                        Must           US-V2-01
  FR-V2-02    The system SHALL highlight the line whose time range contains the current playback position, updating the highlight within 1 second of the line being spoken.                                        Must           US-V2-02
  FR-V2-03    The system SHALL auto-scroll the transcript so the active line stays in view, unless the learner has manually scrolled away (in which case auto-scroll pauses until they return or the next seek).   Must           US-V2-02
  FR-V2-04    The system SHALL, on click/activation of any transcript line, seek the video to that line\'s start timestamp and resume the prior play/pause state.                                                  Must           US-V2-03
  FR-V2-05    The system SHALL keep the transcript highlight in sync after any seek originating from the scrub bar, skip controls, or transcript click.                                                            Must           US-V2-02
  FR-V2-06    The system SHALL render the transcript in the language provided by the course author for the unit, and SHALL show a friendly empty state when no transcript exists.                                  Should         US-V2-01

### 3.2.4 Business Rules

  **BR-ID**   **Business Rule**                                                                                                                          **Notes**
  ----------- ------------------------------------------------------------------------------------------------------------------------------------------ --------------------------
  BR-V2-01    The transcript is read-only in the ICP; cues are owned and edited on the platform.                                                         Facade principle.
  BR-V2-02    Exactly one line is highlighted as \'active\' at any time; if cues overlap, the line with the latest start time ≤ current position wins.   Deterministic highlight.
  BR-V2-03    Manual scroll suspends auto-scroll for that line only; auto-scroll resumes on the next active-line change or seek.                         Respects learner intent.
  BR-V2-04    Transcript click-to-seek does not alter play/pause state (a paused video stays paused at the new position).                                Predictable.

### 3.2.6 Acceptance Criteria

  **AC-ID**   **Given**                                             **When**                                         **Then**                                                                                                **Type**
  ----------- ----------------------------------------------------- ------------------------------------------------ ------------------------------------------------------------------------------------------------------- ------------
  AC-V2-01    A video unit with a transcript is playing             Playback crosses into a new line\'s time range   That line becomes highlighted within 1 second and the list auto-scrolls to keep it in view              Functional
  AC-V2-02    The transcript is open and the video is paused        The learner clicks a line at 02:15               The video seeks to 02:15, stays paused, and that line becomes the active highlight                      Functional
  AC-V2-03    The learner has scrolled up to read an earlier line   The active line changes during playback          Auto-scroll does not yank the view away until the next seek or the learner returns to the active line   Functional
  AC-V2-04    A unit has no transcript                              The learner opens the Transcript tab             A friendly empty state is shown, not an error                                                           Functional

### 3.2.7 Non-Functional Requirements (Feature-Level)

-   Performance: highlight latency ≤ 1 second from spoken line (PRD
    FR-07).

-   Accessibility: transcript is keyboard-navigable; each line is a
    focusable control with an accessible name including its timestamp.

-   Internationalisation: transcript renders in any author-provided
    language, including right-to-left scripts (PRD 6.5).

### 3.2.8 Error Handling & Edge Cases

  **Scenario**                                   **Expected Behaviour**                                          **User-Facing Message**
  ---------------------------------------------- --------------------------------------------------------------- ------------------------------------------------------------------------
  Transcript cues fail to load but video loads   Show transcript-unavailable state; video still plays            "The transcript couldn't load for this lesson. The video still works."
  Cue timings are malformed / overlapping        Apply BR-V2-02 (latest start wins); never highlight two lines   (silent)
  Learner clicks a line beyond loaded media      Queue seek; apply when seekable                                 (spinner)
  Very long transcript (1000+ lines)             Virtualise/lazy-render to keep scrolling smooth                 (none)

3.3 Feature: Video Watch Progress & Completion
----------------------------------------------

*Feature ID: F-VID-003 \| Module: Video Lessons \| Priority: Must Have
\| PRD: FR-08 (with FR-05 resume) \| Phase: P1*

### 3.3.1 Feature Description

As the learner watches, the ICP reports playback progress to the
platform and stores the resume position so the unit can be picked up
exactly where it was left, on any device. When the learner has watched
enough of the video --- per the platform\'s existing watch-threshold
rule --- the unit is marked complete, a tick appears in the sidebar
within five seconds, and completion is recorded against the learner\'s
account rather than the device. Re-watching a completed unit never
un-completes it.

### 3.3.2 User Stories

  **Story ID**   **As a\...**   **I want to\...**                               **So that\...**                                                 **Priority**
  -------------- -------------- ----------------------------------------------- --------------------------------------------------------------- --------------
  US-V3-01       Learner        have my place saved automatically               I can resume exactly where I left off, even on another device   Must Have
  US-V3-02       Learner        see a unit tick off when I\'ve watched enough   I get a clear sense of progress                                 Must Have
  US-V3-03       Learner        re-watch a completed lesson                     I can revise without losing my completed status                 Must Have

### 3.3.3 Functional Requirements

  **FR-ID**   **Requirement Description**                                                                                                                                                        **Priority**   **Source**
  ----------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -------------- ------------
  FR-V3-01    The system SHALL periodically report playback position and watched-segments to the platform during playback and on pause, seek, unit-change, and page-unload.                      Must           US-V3-01
  FR-V3-02    The system SHALL store the learner\'s last playback position per unit and, on re-entry, resume playback within 5 seconds of that position (PRD FR-05).                             Must           US-V3-01
  FR-V3-03    The system SHALL mark a video unit complete when the platform\'s watch-threshold rule is satisfied, and SHALL record completion against the learner\'s account (not the device).   Must           US-V3-02
  FR-V3-04    The system SHALL reflect a completion with a sidebar tick within 5 seconds of the completion event (PRD FR-08).                                                                    Must           US-V3-02
  FR-V3-05    The system SHALL keep a completed unit marked complete if the learner re-watches it; re-watching SHALL NOT reduce or clear completion.                                             Must           US-V3-03
  FR-V3-06    The system SHALL surface a clear, non-silent error if a progress or completion update fails to save, and SHALL retry on reconnection (PRD 6.2).                                    Must           US-V3-02

### 3.3.4 Business Rules

  **BR-ID**   **Business Rule**                                                                                                  **Notes**
  ----------- ------------------------------------------------------------------------------------------------------------------ --------------------------------------
  BR-V3-01    The watch-threshold (how much counts as \'watched\') is the platform\'s existing rule, not redefined by the ICP.   PRD FR-08; configurable on platform.
  BR-V3-02    Completion is account-scoped, never device-scoped; progress must be identical across devices.                      PRD 6.4.
  BR-V3-03    Skipping ahead does not fill unwatched segments; only genuinely watched ranges count toward the threshold.         Prevents gaming via seek.
  BR-V3-04    Completion is monotonic: once true, it cannot be set false by learner playback actions.                            BR / FR-V3-05.
  BR-V3-05    If the last unit of the course is complete on return, the learner lands on the final-results view (PRD FR-05).     Resume edge case.

### 3.3.6 Acceptance Criteria

  **AC-ID**   **Given**                                                      **When**                                       **Then**                                                                                   **Type**
  ----------- -------------------------------------------------------------- ---------------------------------------------- ------------------------------------------------------------------------------------------ -------------
  AC-V3-01    A learner watched 50% of a unit then closed the tab            They reopen the course on a different device   The unit loads and playback resumes within 5s of the 50% position                          Integration
  AC-V3-02    A learner reaches the platform\'s watch threshold for a unit   The threshold event fires                      The unit is marked complete against their account and the sidebar tick appears within 5s   Functional
  AC-V3-03    A completed unit                                               The learner re-watches it from the start       It remains marked complete throughout and after                                            Functional
  AC-V3-04    The network drops during a progress save                       Connectivity returns                           The pending progress/completion is retried and the learner is told if it had failed        Reliability
  AC-V3-05    The learner finished the whole course previously               They reopen the course                         They land on the final-results view, not unit 1                                            Functional

### 3.3.7 Non-Functional Requirements (Feature-Level)

-   Performance: completion tick reflected within 5 seconds; resume
    within 5 seconds of saved position (PRD FR-05, FR-08).

-   Reliability: progress, completion, and resume writes never fail
    silently (PRD 6.2).

-   Privacy: progress and resume data are private to the learner and
    never shown to another learner, even during loading (PRD 6.4).

### 3.3.8 Error Handling & Edge Cases

  **Scenario**                                            **Expected Behaviour**                                                      **User-Facing Message**
  ------------------------------------------------------- --------------------------------------------------------------------------- -----------------------------------------------------------------
  Progress save fails                                     Retry on reconnection; queue locally meanwhile; inform learner if unsaved   "Your progress hasn't saved yet --- we'll retry automatically."
  Completion event fails to persist                       Retry; do not show a premature tick until confirmed                         "We couldn't record completion. Retrying..."
  Conflicting resume positions across devices             Use the most recent server-recorded position                                (silent)
  Watch threshold changed by author after partial watch   Re-evaluate against current platform rule on next watched segment           (silent)

4. System-Wide Requirements
===========================

4.1 Performance Requirements
----------------------------

  **Requirement**                             **Target**                          **Measurement Method**
  ------------------------------------------- ----------------------------------- -------------------------------------
  First lesson opens                          \< 3 seconds on typical 4G          Synthetic + RUM timing
  Unit switch (selection → content visible)   \< 1 second                         RUM / interaction tracing
  Video starts after pressing play            \< 2 seconds on typical 4G          Player telemetry
  Transcript highlight latency                ≤ 1 second from spoken line         Player-clock vs highlight timestamp
  Completion tick reflected                   ≤ 5 seconds from completion event   Event-to-render timing

4.2 Security & Privacy Requirements
-----------------------------------

-   The ICP uses the existing platform\'s authentication; no new
    password store (PRD 6.4).

-   Media, transcript, and progress requests are authenticated; learner
    data is never exposed to another learner, even briefly during
    loading.

-   All data in transit is encrypted via TLS 1.2+; resume/progress data
    at rest follows the platform\'s existing protections.

-   Signed-out users cannot reach any video unit; they are routed to
    sign-in and returned to the requested unit (PRD FR-01).

4.3 Compatibility Requirements
------------------------------

  **Platform**                **Minimum Requirement**
  --------------------------- ----------------------------------------------------------
  Desktop browsers            Latest two versions of Chrome, Edge, Safari, Firefox
  Mobile browsers             Latest two versions of Safari (iOS) and Chrome (Android)
  Screen sizes                360px to 1920px wide; responsive per PRD FR-16
  Accessibility               WCAG 2.1 AA in both light and dark themes (PRD FR-19)
  Media / transcript source   Existing platform media service and transcript cues

 Sign Off
========

  **Role**                    **Name**           **Signature**   **Date**
  --------------------------- ------------------ --------------- ----------
  Business Analyst            Mohhammad Rashid                   
  Senior BA / Product Owner   Mohhammad Rashid                   
  Tech Lead / Architect       Vikas Goyal                        
