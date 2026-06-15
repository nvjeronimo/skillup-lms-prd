# Edge Cases + Failure Modes

The rules above describe happy paths. This doc covers what happens when things go wrong. User stories reference these by ID (`EC-XX`).

## Video playback

### EC-01 · Video fails to load
**Trigger**: video CDN returns error, network drops during initial buffer, decoder not supported.

**UI**: Dark video container with red alert icon, "Video failed to load" heading, "Check your connection and try again. If the problem persists, contact support." body, "Retry" primary button.

**Behavior on Retry**: Refetch manifest. Two failures in a row → show "Contact support" with mailto link.

### EC-02 · Video buffering mid-playback
**Trigger**: bandwidth drops below stream bitrate.

**UI**: Buffering spinner overlaid on video, play state preserved. Auto-resume when buffer fills.

**Behavior**: After 30s continuous buffering, drop to lower bitrate. If lowest bitrate also stalls, surface "Connection too slow — try lower quality or download for offline" (Phase 2 offline).

### EC-03 · Video metadata missing (no captions/transcript)
**Trigger**: video uploaded without captions, transcription job not yet complete.

**UI**: Transcript tab shows empty state: "Transcript not yet available. Captions are processed within 24 hours of upload. Try again later or contact your instructor."

**Behavior**: CC button disabled with tooltip. Auto-poll for transcript every 5 min while topic is open.

### EC-04 · Caption language unavailable
**Trigger**: user picks language X but only English is available.

**UI**: Language picker shows greyed-out options with "(soon)" suffix. English remains selected.

## Notes

### EC-05 · Note save fails
**Trigger**: network error on save, backend 500.

**UI**: Inline alert in Note Editor: "Couldn't save · Tap to retry" (error color). Save button stays enabled.

**Behavior**: 3 retry attempts with exponential backoff. After 3 failures, persist note to localStorage as draft + show "Saved as draft. Will sync when online." 

Drafts surface in Notes tab with a "Draft" badge until sync.

### EC-06 · Orphaned note (transcript re-generated)
**Trigger**: transcript content changes (caption fix). Anchor line no longer matches.

**UI**: Note shows "⚠ Orphaned — original line edited" warning. Note text still visible.

**Behavior**: Phase 1: show warning, learner can re-anchor manually by clicking a transcript line. Phase 2: admin tool to bulk re-anchor.

### EC-07 · Note over max length
**Trigger**: user types > 2000 characters.

**UI**: Counter at "X / 2000" turns amber at 1800, red at 2000. Save button disabled at 2000.

### EC-08 · Tag invalid characters
**Trigger**: user types special chars (only alphanumeric + hyphen allowed).

**UI**: Strip invalid chars on commit. Show tooltip on first invalid attempt: "Tags can include letters, numbers, and hyphens".

## Bookmarks

### EC-09 · Bookmark toggle fails
**Trigger**: network error on save.

**UI**: Toast shows "Couldn't save bookmark · Retry" (error color). Optimistic state reverted.

**Behavior**: 1 silent retry on click before showing error toast. Bookmark state in client UI matches actual server state.

## Downloads

### EC-10 · File download fails
**Trigger**: signed URL expired, file deleted, network drops.

**UI**: Inline error on file row: "Download failed · Retry" (error color). File row stays visible.

### EC-11 · No downloads available
**Trigger**: instructor hasn't attached files to this topic.

**UI**: Empty state component "No downloads for this lesson · Your instructor hasn't attached any files. Check back later or message your mentor."

## Footer navigation

### EC-12 · First topic in course
**Trigger**: learner is on Topic 1 of 15.

**UI**: Previous button hidden (or disabled with tooltip "You're at the first topic").

### EC-13 · Last topic in course
**Trigger**: learner is on Topic 15 of 15.

**UI**: Next button label changes to "Complete course". Disabled until current topic is Completed.

### EC-14 · Topic incomplete blocks Next
**Trigger**: current topic is required and not Completed, sequential gating on.

**UI**: Next button visible but disabled. Subtitle below: "Submit your answers to unlock Next" (or task-appropriate message).

### EC-15 · Module locked
**Trigger**: learner tries to enter a Locked module's topic via direct URL.

**UI**: Topic content area shows lock state: "Complete Module {N-1} to unlock" + "Go to {N-1}" CTA button.

## Sidebar

### EC-16 · Course has no Lesson layer (4-level)
**Trigger**: course is structured Program > Course > Module > Topic.

**UI**: Sidebar v2 collapses Lesson row. Module Header expands directly to Topic rows.

### EC-17 · Mobile: sidebar drawer
**Trigger**: viewport < 768px.

**UI**: Sidebar becomes a drawer triggered by hamburger icon. Slides in from left over content. Backdrop dimmed. Esc + backdrop click close.

## Notifications

### EC-18 · Empty notifications
**Trigger**: no notifications for the active tab.

**UI**: Empty state per tab: "All caught up! No {tab} notifications right now." Illustration optional.

### EC-19 · Notification fetch fails
**Trigger**: API error.

**UI**: Inline alert at top of panel: "Couldn't load notifications · Retry". Panel chrome stays visible.

### EC-20 · Mark all read fails
**Trigger**: bulk endpoint errors.

**UI**: Toast: "Couldn't mark all as read · Try again". Items remain visually unread.

## Saved panel

### EC-21 · Empty saved
**Trigger**: no bookmarks or notes yet.

**UI**: Empty state: "Nothing saved yet · Bookmark topics to find them quickly, or take notes while watching." Illustration optional.

### EC-22 · Bookmarked topic was deleted by instructor
**Trigger**: topic removed from course; bookmark orphaned.

**UI**: Saved Topic item shows "⚠ Topic no longer available" + "Remove" button.

## Live sessions

### EC-23 · Live session starts late (instructor delayed)
**Trigger**: scheduled time passed but stream not started.

**UI**: "Waiting for {instructor name} to start the session…" + estimated delay if known.

### EC-24 · Learner joins late
**Trigger**: user enters after session in progress.

**UI**: Standard Live view + "You joined {N} min into the session" subtle indicator.

### EC-25 · Session cancelled
**Trigger**: instructor cancels.

**UI**: Topic row + Live Sessions list show "Cancelled" badge (gray). Notification fires.

### EC-26 · Recording fails to publish
**Trigger**: live ended, recording processing fails or delayed.

**UI**: Topic shows "Recording will be available within 24 hours" until ready. Auto-update on availability.

## Peer-graded assignment

### EC-27 · Not enough peer submissions to review
**Trigger**: learner submitted but cohort doesn't have N other submissions yet.

**UI**: "Waiting for peers to submit · You'll be able to review {N} submissions once {N} more learners submit. Check back tomorrow." + email opt-in for notification.

### EC-28 · Peer review window expired
**Trigger**: learner didn't review peers within review window (e.g., 7 days post-submit).

**UI**: Assignment shown as Submitted but Incomplete (peer review required). Banner: "Review window closed. Contact your mentor to discuss next steps."

**Behavior**: Course completion blocked on this topic. Mentor can manually unblock per learner.

### EC-29 · File upload fails
**Trigger**: file > size limit (50MB), wrong file type, network error.

**UI**: Inline error on upload zone:
- Size: "File too large · Max 50MB"
- Type: "File type not supported · Accepted: PDF, DOCX, PNG, JPG"
- Network: "Upload failed · Retry"

Keep other successfully uploaded files in the list. Don't reset the upload zone on error.

### EC-30 · Submission deadline passed
**Trigger**: course has a hard deadline; learner submits after.

**UI**: Confirmation modal: "Deadline passed on {date}. Submitting now may not count toward grade. Continue?" Cancel / Submit anyway buttons.

## Certificate

### EC-31 · Certificate generation delayed
**Trigger**: backend processing > 60s.

**UI**: Loading state: "Generating your certificate… This usually takes a minute." Pulsing illustration.

After 5 min, surface: "Still working on it — we'll email you when it's ready."

### EC-32 · Certificate verification URL broken
**Trigger**: 3rd party clicks share link, hash invalid.

**UI**: Verification page shows "Certificate not found or invalid". No PII exposed.

## Auth / session

### EC-33 · Session expired mid-topic
**Trigger**: token expires while learner is in course player.

**UI**: Modal: "Session expired · Sign in again to continue. Your progress is saved." Sign in button.

**Behavior**: On sign-in, return to exact topic + tab + scroll position.

### EC-34 · Concurrent session on another device
**Trigger**: same user signs in on a second device.

**UI**: Phase 1: silent (both sessions work, last write wins). Phase 2: notification.

## Offline / network

### EC-35 · Network offline
**Trigger**: browser detects offline.

**UI**: Persistent banner at top: "You're offline — changes will sync when you reconnect" (info color).

**Behavior**: Bookmark + note actions queue locally. Video playback continues from buffer. New video loads fail with EC-01.

### EC-36 · Slow network
**Trigger**: detected via Navigator.connection downlink < 1.5 Mbps.

**UI**: Subtle warning on video player: "Slow connection detected — quality may auto-adjust."

## AI panel (if shipped Phase 1)

### EC-37 · AI returns empty
**Trigger**: no related content found, AI unsure.

**UI**: "I don't have a confident answer for that. Try rephrasing or message your mentor."

### EC-38 · AI rate limit
**Trigger**: user exceeds N requests/min.

**UI**: "Slow down a bit — you've hit your AI request limit. Try again in {N} seconds."

### EC-39 · AI offline / service down
**Trigger**: AI backend unreachable.

**UI**: AI panel shows offline state with retry button + suggestion to use Notes/Discussion.

## General error handling

### EC-40 · Unhandled error (catchall)
**Trigger**: any uncaught exception.

**UI**: Toast: "Something went wrong · Refresh the page or contact support."

**Behavior**: Log to error tracking (Sentry). Don't navigate user away. Keep current state.

## Banned anti-patterns

These are NOT acceptable solutions to any of the above:

- Silent failure (action appears to succeed but doesn't)
- Modal blocking learner from continuing because of a non-critical error
- Generic "Error" messages with no context or recovery path
- Auto-reload that loses state
- Cryptic error codes shown to learner without explanation
