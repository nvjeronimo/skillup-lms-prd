# Phase 1 — User Stories with Gherkin Acceptance Criteria

Read `06-glossary.md` and `03-business-rules.md` before this doc. Story IDs follow `P1-XX`. Each story links to a screen, components, and the BR it depends on.

Format:
```
P1-XX · Story title
As a [role], I want [capability] so that [benefit].

Linked: Screen [Figma node], Component [name], BR-XX, EC-XX

AC:
  Scenario: ...
    Given ...
    When ...
    Then ...
```

---

## Epic E1 · Dashboard + course entry

### P1-01 · See my enrolled courses on the dashboard
**As a** learner, **I want** to see all courses I'm enrolled in on My Learning **so that** I can pick up where I left off.

**Linked**: My Learning screen, LMS / Course Card, BR-30

```gherkin
Scenario: Dashboard shows all active enrollments
  Given I am signed in
  And I am enrolled in at least one course
  When I navigate to /my-learning
  Then I see a card for each enrolled course
  And each card shows: course title, provider, course-type badge, difficulty, delivery mode, progress %, next-up topic

Scenario: Empty state with no enrollments
  Given I am signed in
  And I am enrolled in zero courses
  When I navigate to /my-learning
  Then I see an empty state with "Browse courses" CTA
```

### P1-02 · Resume the last topic I was on
**As a** learner, **I want** clicking a course card to take me to my last-viewed topic **so that** I don't have to navigate back to where I was.

```gherkin
Scenario: Clicking a course resumes last topic
  Given I previously viewed a topic in course X
  When I click the course X card on /my-learning
  Then I navigate to that exact topic + tab + scroll position

Scenario: First-time entry goes to topic 1
  Given I have never viewed any topic in course X
  When I click the course X card
  Then I navigate to the first required topic of Module 1
```

### P1-03 · See next-live session indicator within 7 days
**As a** learner, **I want** to see when my next live session is scheduled **so that** I can plan to attend.

**Linked**: BR-31

```gherkin
Scenario: Live session scheduled within 7 days
  Given course X has a live session scheduled tomorrow at 4pm
  When I view course X card on /my-learning
  Then the card shows "Next live · Tomorrow, 4:00 PM" subline

Scenario: Live session today
  Given course X has a live session today at 4pm
  When I view the course X card
  Then I see a green "LIVE TODAY · Join at 4:00 PM" CTA

Scenario: Live session more than 7 days out
  Given course X next live is in 10 days
  When I view the course X card
  Then no live indicator is shown
```

### P1-04 · See course type + difficulty + delivery mode at a glance
**As a** learner, **I want** quick metadata on the card **so that** I can pick the right course for my mood.

```gherkin
Scenario: Card shows full metadata strip
  Given course X is a Program-type, Intermediate, VILT delivery
  When I view the course X card
  Then I see badges: "Program", "Intermediate", "VILT"
  And the badges visually distinguish course-type vs difficulty vs delivery-mode
```

---

## Epic E2 · Course Player chrome

### P1-05 · Navigate the course via sidebar
**As a** learner, **I want** a persistent sidebar with all modules + topics **so that** I can jump anywhere in the course.

**Linked**: LMS / Sidebar v2 (Expanded), BR-06

```gherkin
Scenario: Sidebar lists all modules and topics
  Given I am inside course X with 5 modules
  When the player loads
  Then the sidebar shows 5 Module Headers
  And expanding a module reveals its topics (and lessons if 5-level)

Scenario: Active topic highlighted
  Given I am viewing Topic 3 in Module 02
  When I look at the sidebar
  Then Topic 3's row has the active state styling
  And the row's Topic-Type badge matches the player chrome content type

Scenario: Locked module shows lock icon
  Given Module 03 is locked because Module 02 is not Completed
  When I view the sidebar
  Then Module 03 header shows the lock icon
  And topics inside Module 03 are not navigable
```

### P1-06 · Collapse the sidebar to focus on content
**As a** learner on a smaller screen, **I want** to collapse the sidebar **so that** the player content gets more space.

```gherkin
Scenario: Collapse sidebar
  Given I am in the player with sidebar expanded
  When I click the collapse toggle
  Then the sidebar slides to its Collapsed variant (icons only)
  And the content area expands

Scenario: Tablet auto-collapses
  Given viewport width is < 1024px
  When the player loads
  Then the sidebar starts in Collapsed state
```

### P1-07 · Mobile: open sidebar as drawer
**As a** learner on mobile, **I want** the sidebar to open as a drawer **so that** it doesn't take screen space when I don't need it.

**Linked**: EC-17

```gherkin
Scenario: Mobile drawer open
  Given viewport width is < 768px
  And the drawer is closed
  When I tap the hamburger icon in the topbar
  Then the sidebar slides in from the left
  And the backdrop dims the player content
  And the focus traps inside the drawer

Scenario: Drawer dismiss
  Given the drawer is open
  When I tap the backdrop OR press Escape
  Then the drawer slides out
  And focus returns to the hamburger button
```

### P1-08 · See course progress in the topbar
**As a** learner, **I want** the topbar to show my course progress + name **so that** I always know where I am.

**Linked**: LMS / Course Player Topbar

```gherkin
Scenario: Topbar shows progress + course name
  Given I am in course X with 67% progress
  When I view the topbar
  Then the topbar shows my avatar + name (left)
  And shows "Course X · 67% complete" or equivalent breadcrumb
  And shows action icons: Notifications · Saved · AI · Close (right)

Scenario: Mobile topbar
  Given viewport < 768px
  When I view the topbar
  Then breadcrumb collapses to just course name
  And hamburger icon replaces sidebar-expanded state
```

### P1-09 · Open the AI panel
**As a** learner, **I want** quick access to AI assistance **so that** I can ask questions without leaving the topic.

```gherkin
Scenario: Open AI panel
  Given I am in a topic player
  When I click the AI icon in the topbar
  Then a right-slide panel opens with 3 mode tabs: Ask / Chat / Related
  And the panel respects the same focus-trap + Esc-to-close rules as overlay panels

Scenario: AI offline state
  Given the AI service is unavailable
  When I open the AI panel
  Then I see an offline state with retry button
  And I can still use Notes + Discussion as fallback
```

---

## Epic E3 · Video playback

### P1-10 · Play and pause the video
**As a** learner, **I want** to play and pause the video **so that** I control my own pace.

```gherkin
Scenario: Play video
  Given I am on a Video topic and the video is loaded
  When I click the Play button OR press Space
  Then the video plays
  And the Play button becomes a Pause button
  And the analytics event `video_play` fires with current timestamp

Scenario: Pause video
  Given the video is playing
  When I click Pause OR press Space
  Then the video pauses
  And the analytics event `video_pause` fires
```

### P1-11 · Seek to any point in the video
**As a** learner, **I want** to scrub to any point in the video **so that** I can skip or rewind.

```gherkin
Scenario: Scrub via timeline
  Given video is loaded
  When I click or drag the timeline to position X
  Then video seeks to X
  And `video_seek` fires with from + to timestamps

Scenario: Keyboard seek
  Given video is playing
  When I press ArrowRight (or ArrowLeft)
  Then video seeks +10s (or -10s)
```

### P1-12 · Change playback speed
**As a** learner, **I want** to change speed **so that** I can match my comprehension pace.

```gherkin
Scenario: Available speeds
  Given video is loaded
  When I open the speed menu
  Then I see options: 0.5x · 0.75x · 1x · 1.25x · 1.5x · 1.75x · 2x
  And the current selection is highlighted

Scenario: Speed persists per topic
  Given I set speed to 1.5x on topic A
  When I navigate to topic B and back to topic A
  Then speed is still 1.5x on topic A
```

### P1-13 · Toggle captions and pick language
**As a** learner, **I want** to enable captions + pick a language **so that** I can follow along.

**Linked**: EC-04

```gherkin
Scenario: Toggle CC
  Given video has English captions
  When I click the CC button OR press C
  Then captions appear over the video
  And the CC button shows enabled state

Scenario: Change language
  Given video has English + Spanish captions
  When I open the language picker and pick Spanish
  Then captions switch to Spanish
  And the transcript tab text also switches

Scenario: Language unavailable
  Given video only has English captions
  When I open the language picker
  Then non-English options are greyed out with "(soon)" suffix
```

### P1-14 · Enter fullscreen
**As a** learner, **I want** fullscreen video **so that** I can immerse.

```gherkin
Scenario: Enter fullscreen
  Given I am on a Video topic
  When I click the Fullscreen icon OR press F
  Then video expands to fullscreen
  And the chrome footer (License/CC/Lang/Download) remains accessible via hover

Scenario: Exit fullscreen
  Given video is in fullscreen
  When I press Escape OR click Exit Fullscreen
  Then video returns to inline state
```

### P1-15 · Download the transcript
**As a** learner, **I want** to download the transcript **so that** I can review offline.

```gherkin
Scenario: Download transcript
  Given video has a transcript
  When I click the Download transcript button in the video chrome footer
  Then the transcript downloads as .txt (Phase 1) or .srt (Phase 2 option)
  And `download_transcript` event fires
```

### P1-16 · See license info per video
**As a** learner, **I want** to see content license **so that** I understand reuse rights.

```gherkin
Scenario: License displayed
  Given video has license metadata
  When I view the video chrome footer
  Then the license string is visible (e.g., "© SkillUp 2026" or "CC BY-SA 4.0")
```

### P1-17 · Video errors handled gracefully
**As a** learner, **I want** clear error states **so that** I know what to do when video fails.

**Linked**: EC-01, EC-02, EC-03

```gherkin
Scenario: Video fails to load
  Given the video CDN returns an error
  When the player tries to load
  Then the player area shows the Error state (red alert + Retry button)

Scenario: Two retry failures
  Given video has failed once and I clicked Retry
  When Retry also fails
  Then the error state adds a "Contact support" link
```

---

## Epic E4 · Transcript + auto-scroll

### P1-18 · See transcript auto-scroll to the active line
**As a** learner, **I want** the transcript to follow the video **so that** I always see what's playing.

**Linked**: BR-11, phase1-readiness §2

```gherkin
Scenario: Active line follows playback
  Given video is playing
  When the playback timestamp matches a transcript line
  Then that line becomes Active (brand-section bg + 4px brand left border)
  And the transcript auto-scrolls to center the active line vertically
  And `transcript_line_active` is implicitly tracked

Scenario: Active line already in view
  Given the next active line is within the visible 25% margin
  When playback moves to that line
  Then no scroll is triggered (avoid jitter)
```

### P1-19 · Click a transcript line to seek video
**As a** learner, **I want** to click any transcript line to jump there **so that** I can re-read + re-watch.

```gherkin
Scenario: Click line seeks video
  Given video is playing or paused
  When I click transcript line at timestamp T
  Then video seeks to T
  And the clicked line becomes Active
  And auto-follow re-engages
  And `transcript_line_click` fires
```

### P1-20 · Pause auto-scroll when I scroll the transcript
**As a** learner reading ahead, **I want** my manual scroll to NOT be fought by auto-scroll.

```gherkin
Scenario: Manual scroll pauses auto-follow
  Given video is playing
  When I scroll the transcript with mousewheel/touch/keyboard
  Then auto-scroll pauses for 8 seconds
  And a "Following ↓ Resume" pill appears in the top-right of the transcript area

Scenario: Resume follow
  Given auto-follow is paused
  When I click the Resume pill OR 8 seconds elapse
  Then auto-follow re-engages
  And the transcript smoothly scrolls to the current active line
```

### P1-21 · Transcript empty state
**As a** learner, **I want** a useful message when transcript isn't ready.

**Linked**: EC-03

```gherkin
Scenario: No transcript available
  Given the video transcript is still processing
  When I open the Transcript tab
  Then I see "Transcript not yet available · Captions are processed within 24 hours of upload. Try again later or contact your instructor."
  And the CC button is disabled
  And the system auto-polls for transcript every 5 minutes
```

---

## Epic E5 · Notes (transcript-anchored)

### P1-22 · Add a note to a transcript line
**As a** learner, **I want** to attach a note to a specific transcript line **so that** my notes are anchored to context.

**Linked**: BR-11, BR-13, EC-05, EC-07, EC-08

```gherkin
Scenario: Open note editor from transcript line
  Given I am on the Transcript tab
  When I hover/focus a transcript line and click "+ Note"
  Then the Note Editor Modal opens
  And the anchor preview shows the line text + timestamp
  And focus is in the note textarea

Scenario: Save note
  Given the Note Editor is open with text in the textarea
  When I click Save OR press Cmd/Ctrl+Enter
  Then the note saves to backend
  And the modal closes
  And a polite a11y announcement says "Note saved"
  And the transcript line now shows "✎ Edit" instead of "+ Note"

Scenario: Cancel note
  Given the Note Editor is open
  When I click Cancel OR press Escape
  Then unsaved changes are discarded
  And the modal closes
```

### P1-23 · Edit an existing note
**As a** learner, **I want** to edit my notes **so that** I can refine them later.

```gherkin
Scenario: Edit from transcript line
  Given a transcript line has an existing note
  When I click "✎ Edit" on that line
  Then the Note Editor opens with the existing note text and tags pre-filled
  And the title says "Edit note"

Scenario: Edit from Notes tab
  Given I am on the Notes tab
  When I click Edit on a Note Item
  Then the Note Editor opens with that note's content
```

### P1-24 · Delete a note
**As a** learner, **I want** to delete a note **so that** I can clean up.

**Linked**: BR-37

```gherkin
Scenario: Delete confirmation
  Given I am viewing a note in the Notes tab
  When I click Delete on the Note Item
  Then a confirmation prompt asks "Delete this note?"
  And on confirm, the note is soft-deleted
  And the transcript line reverts to "+ Note"
  And a toast confirms "Note deleted" with no Undo in Phase 1
```

### P1-25 · Tag a note
**As a** learner, **I want** to add tags to notes **so that** I can find them later.

**Linked**: BR-13, EC-08

```gherkin
Scenario: Add tags
  Given the Note Editor is open
  When I type "#discovery" in the tags input and press Enter
  Then a tag chip "#discovery" appears with an x-close button
  And the tag is stored as "discovery" (without #)

Scenario: Invalid characters stripped
  Given the tags input is focused
  When I type "hello@world!"
  Then invalid characters are stripped on Enter
  And the tag commits as "helloworld"

Scenario: Max tags
  Given the note has 10 tags
  When I try to add an 11th
  Then the tag input is disabled with tooltip "Max 10 tags per note"
```

### P1-26 · List all notes on the Notes tab
**As a** learner, **I want** to see all my notes for this topic **so that** I can review.

```gherkin
Scenario: Notes tab populated
  Given I have notes on the current topic
  When I open the Notes tab
  Then I see each note as a Note Item with: timestamp · line text · my note · tags · edit + delete actions
  And notes are ordered by timestamp ascending

Scenario: Notes tab empty state
  Given I have no notes on the current topic
  When I open the Notes tab
  Then I see the LMS / Empty State (Kind=Notes)
  And the CTA is "Add first note" (opens Note Editor with no anchor)
```

### P1-27 · Note save failures
**As a** learner, **I want** my note saved even when network fails.

**Linked**: EC-05

```gherkin
Scenario: Save fails with retry
  Given I clicked Save in the Note Editor
  And the backend returns an error
  Then I see an inline alert "Couldn't save · Tap to retry"
  And up to 3 retries with exponential backoff are attempted

Scenario: Save persists as local draft
  Given save has failed 3 times
  Then the note is stored to localStorage as a draft
  And the modal shows "Saved as draft. Will sync when online."
  And the Notes tab shows the note with a "Draft" badge until sync succeeds
```

### P1-28 · Orphaned note when transcript changes
**As a** learner, **I want** to know if my note's anchor was changed.

**Linked**: BR-11, EC-06

```gherkin
Scenario: Orphaned warning
  Given my note's anchor line content has changed beyond recognition (matching confidence < 70%)
  When I open the Notes tab
  Then the Note Item shows "⚠ Orphaned — original line edited" warning
  And the note text is still visible
  And I can re-anchor by clicking a transcript line on the player
```

---

## Epic E6 · Downloads

### P1-29 · See downloadable files for the topic
**As a** learner, **I want** to see all files attached to this topic **so that** I can download what I need.

```gherkin
Scenario: Downloads list populated
  Given the topic has attached files
  When I open the Downloads tab
  Then I see each file with: filename · type · size · download button

Scenario: Empty downloads
  Given the topic has no attached files
  When I open the Downloads tab
  Then I see the LMS / Empty State (Kind=Downloads)
```

### P1-30 · Download a file
**As a** learner, **I want** to click and download a file.

```gherkin
Scenario: Successful download
  Given I see a file in the Downloads tab
  When I click Download
  Then the file downloads via signed URL
  And `download_file` event fires
```

### P1-31 · Download failure
**As a** learner, **I want** clear feedback when a download fails.

**Linked**: EC-10

```gherkin
Scenario: Signed URL expired
  Given the file URL is no longer valid
  When I click Download
  Then I see inline error "Download failed · Retry" on the file row
  And clicking Retry refreshes the URL and attempts again
```

---

## Epic E7 · Bookmarks

### P1-32 · Bookmark a topic from the sidebar
**As a** learner, **I want** to bookmark a topic from the sidebar **so that** I can come back to it.

**Linked**: BR-09, BR-10, BR-21

```gherkin
Scenario: Bookmark add
  Given I see a topic row in the sidebar
  When I click the bookmark icon
  Then the icon switches to filled state
  And a bottom-center toast says "Bookmarked · {topic title}" with Undo link
  And the toast auto-dismisses after 4 seconds
  And `bookmark_add` fires

Scenario: Bookmark remove
  Given a topic is already bookmarked
  When I click the bookmark icon
  Then the icon switches to empty state
  And toast says "Bookmark removed" with Undo
  And `bookmark_remove` fires

Scenario: Undo
  Given a bookmark toast is visible
  When I click Undo
  Then the bookmark action reverts
  And the toast dismisses immediately
```

### P1-33 · Bookmark from the topbar (current topic)
**As a** learner, **I want** a quick bookmark of the current topic **so that** I don't have to scroll the sidebar.

```gherkin
Scenario: Topbar bookmark toggles current
  Given I am viewing topic X
  When I click the topbar Saved/Bookmark icon
  (note: in current design, the Saved icon opens the panel — verify which icon toggles vs opens)
  Then verify per design which is the intended behavior
```

(BA note: verify with design whether topbar has a quick-bookmark icon OR just the Saved panel opener. Current design is the latter. If we want quick-bookmark, this is a small design addition.)

### P1-34 · Bookmarked state persists
**As a** learner, **I want** my bookmarks to survive across sessions and devices.

**Linked**: BR-09, BR-35

```gherkin
Scenario: Persistence
  Given I bookmarked topic X on Device 1
  When I sign in on Device 2
  Then topic X shows as bookmarked

Scenario: Initial state load
  Given I have pre-existing bookmarks loaded from backend
  When the page loads
  Then NO toast is shown for those bookmarks (only for fresh user actions)
```

### P1-35 · Bookmark save failure
**As a** learner, **I want** the UI to recover if a bookmark save fails.

**Linked**: EC-09

```gherkin
Scenario: Save fails
  Given I click bookmark icon
  And the backend returns an error after 1 silent retry
  Then the bookmark state reverts to its prior value
  And the toast says "Couldn't save bookmark · Retry" in error color
```

---

## Epic E8 · Notifications panel

### P1-36 · Open notifications panel
**As a** learner, **I want** quick access to notifications **so that** I don't miss important updates.

**Linked**: overlay-panels-spec.md

```gherkin
Scenario: Open from topbar
  Given I am in any course player state
  When I click the Notifications icon in the topbar
  Then a right-slide panel opens (480w on desktop, full-width on mobile)
  And the backdrop dims the rest of the screen
  And focus traps inside the panel
  And `panel_open` fires with panel=notifications + unreadCount

Scenario: Close panel
  Given the Notifications panel is open
  When I click the x-close icon OR press Escape OR click the backdrop
  Then the panel slides closed
  And focus returns to the Notifications icon
```

### P1-37 · See notifications grouped by type + date
**As a** learner, **I want** notifications grouped logically **so that** I can find what matters.

**Linked**: BR-14, BR-15

```gherkin
Scenario: 4 tabs visible
  Given the Notifications panel is open
  Then I see tabs: All · Discussions · Grading · Updates
  And each tab shows a count badge
  And All tab is selected by default

Scenario: Date sections inside tab
  Given I am viewing the All tab
  Then items are grouped by date section: Today / Yesterday / Earlier this week / Older
  And section labels are visible above each group

Scenario: Switch tab filters content
  Given I am viewing the All tab
  When I click the Grading tab
  Then only Grading notifications are shown
  And the count badge on the Grading tab matches the items shown
```

### P1-38 · Mark notifications as read
**As a** learner, **I want** to mark notifications read **so that** I track what I've seen.

**Linked**: BR-16

```gherkin
Scenario: Auto-mark on click
  Given a notification has an unread brand-dot
  When I click the notification
  Then the dot disappears
  And the action behind the notification triggers (navigate, open thread, etc.)

Scenario: Mark all read
  Given I am on a tab with multiple unread notifications
  When I click "Mark all read"
  Then all notifications in THAT tab become read
  And notifications on other tabs are unaffected

Scenario: Mark all read failure
  Given Mark all read fails
  Then a toast shows "Couldn't mark all as read · Try again"
  And items remain visually unread
```

### P1-39 · Notification types render correctly
**As a** learner, **I want** to recognize the type of notification at a glance.

```gherkin
Scenario Outline: Type-specific rendering
  Given a notification of type <type>
  When I see it in the panel
  Then it has the icon <icon>
  And the text follows the <type> pattern

  Examples:
    | type             | icon                |
    | live             | video-recorder      |
    | discussion       | message-circle-01   |
    | grading          | calendar            |
    | new_content      | plus                |
    | peer_review      | stars-01            |
    | due_soon         | clock               |
    | mentor_message   | user-talk           |
```

### P1-40 · Empty notifications per tab
**As a** learner, **I want** a friendly empty state per tab.

**Linked**: EC-18

```gherkin
Scenario: All caught up
  Given I have no notifications in the current tab
  When I view the tab
  Then I see "All caught up! No {tab} notifications right now."
```

### P1-41 · Notification fetch error
**As a** learner, **I want** a clear recovery path if notifications fail to load.

**Linked**: EC-19

```gherkin
Scenario: Fetch error
  Given the notifications API returns an error
  When the panel opens
  Then a top-of-panel inline alert says "Couldn't load notifications · Retry"
  And clicking Retry refetches
```

---

## Epic E9 · Saved panel

### P1-42 · Open Saved panel
**As a** learner, **I want** to see all my Bookmarks + Notes in one place.

```gherkin
Scenario: Open from topbar
  Given I am in the player
  When I click the Saved icon in the topbar
  Then the Saved panel opens (right slide-over, 480w desktop)
  And `panel_open` fires with panel=saved

Scenario: Filter chips
  Given the Saved panel is open
  Then I see filter chips: All · Topics · Notes
  And each chip shows a count
  And All is selected by default
```

### P1-43 · Filter saved items
**As a** learner, **I want** to filter Topics vs Notes **so that** I can find one or the other.

```gherkin
Scenario: Filter Topics
  Given the Saved panel shows All
  When I click "Topics" chip
  Then only bookmarked topics are shown (Notes section hidden)

Scenario: Filter Notes
  When I click "Notes" chip
  Then only saved notes are shown
```

### P1-44 · Click saved item to navigate
**As a** learner, **I want** to jump back to a bookmarked topic or note.

```gherkin
Scenario: Click bookmarked topic
  Given the Saved panel shows a bookmarked Topic
  When I click the row
  Then I navigate to that topic
  And the Saved panel closes
  And focus moves to the topic player

Scenario: Click saved note
  Given the Saved panel shows a saved Note
  When I click the note
  Then I navigate to the topic + Notes tab + anchored line
  And the line scrolls into view
```

### P1-45 · Saved empty + broken states
**Linked**: EC-21, EC-22

```gherkin
Scenario: Empty saved
  Given I have no bookmarks or notes anywhere
  When I open the Saved panel
  Then I see "Nothing saved yet · Bookmark topics to find them quickly, or take notes while watching."

Scenario: Bookmarked topic was deleted
  Given a bookmarked topic was removed by the instructor
  When I view the Saved panel
  Then that row shows "⚠ Topic no longer available" + Remove button
```

---

## Epic E10 · Topic completion

### P1-46 · Auto-complete Video topic at 90%
**As a** learner, **I want** Video topics to auto-complete **so that** I don't have to click manually.

**Linked**: BR-01

```gherkin
Scenario: Auto-complete at 90%
  Given I am watching a Video topic
  When playback reaches 90% of total duration
  Then the topic is marked Completed
  And the sidebar row updates to Completed state (check icon)
  And `topic_complete` fires with topicType=video

Scenario: Already Completed video
  Given I rewatch a topic that's already Completed
  Then no re-completion event fires (idempotent)
```

### P1-47 · Manual completion for Reading-like types
**As a** learner, **I want** a Mark Complete button on text-based topics.

```gherkin
Scenario: Mark Reading complete
  Given I am on a Reading topic
  When I scroll to the bottom and click "Mark as complete"
  Then the topic is marked Completed
  And `topic_complete` fires with topicType=reading
```

### P1-48 · Module progress updates on topic complete
**As a** learner, **I want** module progress to reflect my completions.

**Linked**: BR-02, BR-04

```gherkin
Scenario: Module progress increments
  Given Module 03 has 9 required topics and I have completed 2
  When I complete a 3rd
  Then Module 03 progress shows 33% (3/9)
  And the Module Header indicator updates

Scenario: Module complete
  Given Module 03 has 9 required topics and I have completed 8
  When I complete the 9th
  Then Module 03 shows Completed state (green check)
  And the next module unlocks (if it was locked)
  And `module_complete` fires
```

### P1-49 · Optional topics don't gate
**As a** learner, **I want** to skip Optional topics without penalty.

**Linked**: BR-08

```gherkin
Scenario: Skip optional
  Given Module 03 has 9 required + 2 optional topics
  When I complete all 9 required
  Then Module 03 is Completed
  And the 2 optional remain Not Started but don't block anything
```

### P1-50 · Cannot enter Locked module
**As a** learner, **I want** clear messaging when I hit a lock.

**Linked**: EC-15

```gherkin
Scenario: Direct URL to locked topic
  Given Module 03 is locked
  When I navigate via URL to a topic inside Module 03
  Then the content area shows the lock state: "Complete Module 02 to unlock"
  And a "Go to Module 02" CTA is visible
```

---

## Epic E11 · Course completion + Certificate

### P1-51 · Course Complete modal triggers on completion
**As a** learner, **I want** a celebration moment when I finish.

**Linked**: BR-03

```gherkin
Scenario: Course completion
  Given all required topics are completed
  And grade threshold is met (if applicable)
  When the last completion event fires
  Then the Course Complete modal appears
  And the modal shows: title · completion stats · "View certificate" + "Continue" buttons
  And `course_complete` fires
```

### P1-52 · View certificate
**As a** learner, **I want** to view my certificate immediately.

**Linked**: BR-25, EC-31

```gherkin
Scenario: View certificate
  Given course completion event fired
  When I click "View certificate" from the modal
  Then I navigate to the Certificate screen
  And the certificate shows my name, course title, completion date, provider, verification hash

Scenario: Certificate still generating
  Given the certificate is taking > 60s to generate
  Then the Certificate screen shows "Generating your certificate… This usually takes a minute."
  And it auto-refreshes when ready
```

### P1-53 · Share certificate
**As a** learner, **I want** to share my certificate to social.

**Linked**: BR-27

```gherkin
Scenario: Share menu
  Given I am viewing my certificate
  When I click the Share button
  Then a dropdown shows: LinkedIn · Twitter/X · Facebook · Copy link · Email
  And each option performs the expected action

Scenario: Copy link
  When I click "Copy link"
  Then the verification URL is copied to clipboard
  And a "Link copied" toast confirms
```

### P1-54 · Print certificate
```gherkin
Scenario: Print
  Given I am viewing my certificate
  When I click Print
  Then a print-friendly view renders
  And the browser print dialog opens
```

### P1-55 · Certificate verification
**As a** third party, **I want** to verify a certificate is real.

**Linked**: BR-26, EC-32

```gherkin
Scenario: Valid verification
  Given I have a certificate URL with hash
  When I visit the URL
  Then I see: learner name · course title · completion date · provider · "Verified ✓"

Scenario: Invalid hash
  Given I visit /verify/invalid-hash
  Then I see "Certificate not found or invalid"
  And no PII is exposed
```

---

## Epic E12 · Peer-graded Assignment

### P1-56 · See assignment requirements
**As a** learner, **I want** to know what's required before I start.

```gherkin
Scenario: Assignment intro
  Given I am on a Peer-graded Assignment topic
  When I view the player
  Then I see the assignment intro block with: prompt · rubric link · file upload zone · "Submit" button
  And the intro states peer-review requirement (e.g., "Review 3 peer submissions to complete")
```

### P1-57 · Upload submission files
**As a** learner, **I want** to upload my work.

**Linked**: EC-29

```gherkin
Scenario: Drag and drop file
  Given the upload zone is visible
  When I drag a PDF file onto the zone
  Then the file uploads and appears in the file list

Scenario: Browse files
  When I click "Browse files"
  Then the OS file picker opens
  And selected files are added to the upload queue

Scenario: Multiple files
  When I drop/pick 3 files
  Then all 3 upload in parallel
  And progress shown per file

Scenario: File too large
  When I try to upload a file > 50MB
  Then the file is rejected with inline error "File too large · Max 50MB"
  And other files in the queue continue normally

Scenario: Unsupported file type
  When I try to upload an .exe
  Then I see "File type not supported · Accepted: PDF, DOCX, PNG, JPG"
```

### P1-58 · Submit assignment
```gherkin
Scenario: Submit
  Given I have uploaded at least 1 file
  When I click Submit
  Then a confirmation modal asks "Submit your work? You can't change it after submitting."
  And on confirm, the assignment is submitted
  And the topic moves to "Awaiting peer review" state

Scenario: Submit without files
  When I click Submit with no files uploaded
  Then Submit is disabled with tooltip "Upload at least one file to submit"
```

### P1-59 · Review peer submissions
**As a** learner, **I want** to review N peers as required.

**Linked**: EC-27, EC-28

```gherkin
Scenario: Review queue
  Given I submitted and 3+ peers also submitted
  When I open the assignment
  Then I see "Review N peer submissions" task
  And clicking a peer submission opens the rubric + review form

Scenario: Not enough peer submissions
  Given fewer than N peers have submitted
  When I open the assignment
  Then I see "Waiting for peers to submit · You'll be able to review {N} submissions once {N} more learners submit."

Scenario: Review window expired
  Given I haven't reviewed within the review window
  When the window closes
  Then the assignment is shown as Submitted but Incomplete
  And course completion is blocked on this topic
```

### P1-60 · Deadline handling
**Linked**: EC-30

```gherkin
Scenario: Submit before deadline
  Given the course has a hard deadline of 2026-07-31
  When I submit on 2026-07-30
  Then submission proceeds normally

Scenario: Submit after deadline
  Given the deadline passed
  When I click Submit
  Then a confirmation modal warns "Deadline passed on {date}. Submitting now may not count toward grade. Continue?"
```

### P1-61 · Receive peer grade notification
```gherkin
Scenario: Grade received
  Given a peer rated my submission
  When the rating is recorded
  Then a notification fires of type peer_review
  And the notification text follows BR-14 format
```

---

## Epic E13 · VILT Join Live

### P1-62 · See pre-live state 15 min before
**As a** learner, **I want** to know a session is starting soon.

**Linked**: BR-22, BR-07

```gherkin
Scenario: Pre-live state
  Given a scheduled live session starts at 4:00 PM
  When the time is between 3:45 PM and 4:00 PM
  Then the topic shows "Live in {N} min" countdown
  And the "Join when ready" CTA is visible
  And instructor/mentor avatars + names are shown
  And session agenda is visible (if provided)
```

### P1-63 · Join the live session
```gherkin
Scenario: Join live
  Given the session is in progress
  When I click "Join Live"
  Then I enter the live session view
  And `live_session_join` fires
  And attendance tracking starts (joined timestamp recorded)
```

### P1-64 · Late join handling
**Linked**: EC-24

```gherkin
Scenario: Join after session start
  Given the session started 10 minutes ago
  When I join
  Then I see a subtle "You joined 10 min into the session" indicator
```

### P1-65 · Post-live recording
**Linked**: BR-24, EC-26

```gherkin
Scenario: Recording available within 24 hours
  Given the live session ended
  And the recording finished processing
  When I open the topic
  Then the topic is now type Recording
  And "Watch recording" CTA is visible

Scenario: Recording delayed
  Given the recording is still processing after 24 hours
  When I open the topic
  Then I see "Recording will be available soon"
  And the topic auto-updates when ready
```

---

## Epic E14 · A11y + analytics + edge cases

### P1-66 · Keyboard navigation works on every screen
**As a** keyboard user, **I want** to navigate without a mouse.

**Linked**: BR-38

```gherkin
Scenario: Tab order
  Given I am on the Video player screen
  When I press Tab repeatedly
  Then focus moves in this order: topbar buttons (LTR) → sidebar toggle → module headers → topic rows → video player controls → video chrome → tabs → tab content → footer nav

Scenario: Shortcut keys
  Given I am in the Video player
  When I press the following keys
  Then the following actions happen:
    | key       | action                  |
    | Space     | play/pause              |
    | ←         | seek -10s               |
    | →         | seek +10s               |
    | ↑         | volume up               |
    | ↓         | volume down             |
    | M         | mute                    |
    | C         | toggle CC               |
    | F         | fullscreen              |
    | N         | add note on active line |
    | J         | previous transcript line|
    | K         | next transcript line    |
    | Escape    | close modal/panel       |
```

### P1-67 · Screen reader announcements
```gherkin
Scenario: Active transcript line announced
  Given a screen reader is active
  When the active transcript line changes
  Then "Now playing: {line text}" is announced politely

Scenario: Bookmark toast announced
  When a bookmark toast appears
  Then its text is announced via aria-live polite region

Scenario: Note saved
  When a note save succeeds
  Then "Note saved" is announced
```

### P1-68 · ARIA labels on icon-only buttons
**Linked**: phase1-readiness.md §3

```gherkin
Scenario Outline: ARIA labels match design
  Given an icon-only button labeled <button>
  Then its aria-label is <label>

  Examples:
    | button                     | label                          |
    | Topbar Notifications       | Notifications, N unread         |
    | Topbar Saved               | Saved items                     |
    | Topbar AI                  | AI Assistant                    |
    | Topbar Close               | Exit course player              |
    | Sidebar collapse           | Collapse sidebar OR Expand sidebar |
    | Topic Row bookmark         | Bookmark {topic title} OR Remove bookmark |
    | Transcript "+ Note"        | Add note at {timestamp}         |
    | Transcript "✎ Edit"        | Edit note at {timestamp}        |
```

### P1-69 · Color contrast passes WCAG AA
**Linked**: BR-38

```gherkin
Scenario: All text contrast
  Given any screen in Phase 1
  When measured for WCAG 2.1 AA contrast
  Then all text against its background ratio ≥ 4.5:1 (or 3:1 for large text)
  And active states + brand colors verified per phase1-readiness.md §3
```

### P1-70 · Reduced motion respected
**Linked**: BR-39

```gherkin
Scenario: prefers-reduced-motion enabled
  Given the user OS has reduced-motion enabled
  When transitions occur
  Then transcript smooth-scroll uses instant scroll
  And panel slide-in is instant (no animation)
  And toast fades are instant
```

### P1-71 · Touch targets ≥ 44px on mobile
```gherkin
Scenario: Mobile button sizes
  Given viewport < 768px
  Then all interactive buttons have effective hit area ≥ 44 × 44 px
  And Topic Row height ≥ 56 px
```

### P1-72 · Analytics events fire
**Linked**: BR-41, phase1-readiness.md §4

```gherkin
Scenario: Topic enter event
  Given I navigate to a topic
  When the player loads
  Then `topic_enter` fires with properties: topicId, topicType, position, via:[sidebar|footer|notification|url|dashboard]

Scenario: All Phase 1 events implemented
  Given the analytics spec in phase1-readiness.md §4 lists ~30 events
  Then every event is implemented and fires at the documented trigger
  And every event includes the default properties (courseId, topicId, userId, sessionId, timestamp)
```

### P1-73 · Generic error handling
**Linked**: EC-40

```gherkin
Scenario: Unhandled exception
  Given an uncaught error occurs
  When the error is thrown
  Then a toast shows "Something went wrong · Refresh the page or contact support"
  And the error is logged to Sentry
  And the user is NOT auto-navigated away
  And current state is preserved
```

---

## Definition of Done (every story)

A story is Done when:
1. UI matches Figma reference (component IDs in screens-spec.md)
2. All Gherkin AC scenarios pass
3. Linked BR rules are implemented
4. Linked EC edge cases are handled
5. Keyboard navigation + screen reader + WCAG AA verified
6. Analytics events fire per BR-41
7. Storybook story exists per components-inventory.md (for components introduced or modified)
8. Unit + integration tests written for non-trivial logic
9. PM + Design review sign-off

## What's NOT in Phase 1 (covered in 05-feature-roadmap.md)

- Goals + Streaks (Phase 2)
- Mentor messaging UI (Phase 2)
- Instructor + Admin dashboards (Phase 3)
- Search (Phase 2)
- Offline mode (Phase 2)
- i18n (Phase 2)
- Other topic types in player: Reading/Podcast/Discussion/Lab/Activity/Project (Phase 1.5)
- Course Hub aggregation page (Phase 1.5)
- Grade calculation engine (Phase 2)
- Note sharing with cohort (Phase 2)

If the team wants to challenge any of these cuts, do it in BA sprint 0 — don't wait until mid-build.
