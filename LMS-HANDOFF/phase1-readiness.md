# Phase 1 — Readiness specs

Specs for behaviors not visible as static Figma screens. Reference these alongside `screens-spec.md` + `overlay-panels-spec.md`.

## Handoff package status (updated 2026-06-15)

Phase 1 handoff sections in Figma working file (`Wz2TCYFVr0hD8tJNiLajLt`):

| Section | Pages | Cards | Status |
|---|---|---|---|
| 02 · Video Lesson Flow | `↳ Phase 1 - Video Lesson - Ready for Dev ✅` | 15 (5 rows × 3) | Ready for Dev ✅ |
| 06 · Overlay Panels | `↳ Phase 1 - Overlay Panels - Ready for Dev ✅` | 6 (2 rows × 3) | Ready for Dev ✅ |
| 07 · Completion + Certificate | `↳ Phase 3 - Completion + Certificate - WIP 🟠` | 6 (2 rows × 3) | Phase 1 baseline · Phase 3 WIP 🟠 |
| Diagram Flows + Business Logic | `↳ Diagram Flows + Business Logic` | Diagram + 3 sections | Ready for Dev ✅ |

Each Ready-for-Dev card uses the new shared Handoff card header (DS), Subheader, screen-wrap (`#C6D0E3`), and slot-based Page Changelog Header.

### Outstanding manual reflow (deferred to Nelson)

5 clones need viewport reflow before status flip:
- Card 2.2 Notes Tablet · Card 2.3 Notes Mobile
- Card 3.2 Downloads Tablet · Card 3.3 Downloads Mobile
- Card 5.2 Note Editor Tablet · Card 5.3 Note Editor Mobile (Modal)

Warning notes remain on those card descriptions until reflow complete.

## Figma references (built 2026-06-02)

- **Note Editor Modal** — `3549:42190` (UUI · V7 / Modal · Note Editor)
- **Edge cases & states wrapper** — `3549:42235` (Phase 1 — Edge cases & states)
  - A · Tab empty states (Notes + Downloads + **Transcript** added 2026-06-15)
  - B · Footer Nav edge cases (First topic / Last topic / Next disabled)
  - C · Video Player edge states (Loading / Error / Ended)

---

## 0. Sticky video on scroll (added 2026-06-26)

On Video topic screens, the video player MUST remain visible at the top of the viewport as the learner scrolls the transcript / notes / downloads tab content. The player docks (sticks) to the top of the main panel and reduces in height — never disappears.

**Demo screen**: Card 7 · transcript-scrolled-desktop on `↳ Phase 1 - Video Lesson - Ready for Dev ✅` page. Wrapper: `ICP-Video-transcript-scrolled-desktop`.

### Behaviour

| State | Trigger | Action |
|---|---|---|
| Default | No scroll | Video player at full height (405px desktop), normal position |
| Scrolled | Tab content scrolled below threshold (~80px) | Video player docks at top, height reduces to compact size, drop shadow appears |
| Released | Scroll back to top | Video player returns to full height smoothly |

### Compact docked heights per viewport

| Viewport | Default video height | Docked height |
|---|---|---|
| Desktop (≥1024px) | 405 | **240** |
| Tablet (640–1023px) | 315 | **180** |
| Mobile (<640px) | 211 | **160** |

Width stays full-bleed within the main content panel.

### Visual treatment when docked

- **Position**: `position: sticky; top: 0;` (or equivalent — pinned within the scroll container)
- **Shadow**: `0 4px 16px rgba(0,0,0,0.18)` to separate from transcript below
- **Border-radius**: bottom corners only (top corners stay flush with chrome above)
- **Z-index**: above transcript list, below modals/dialogs/topbar
- **Animation**: smooth height transition (200ms ease-out) when entering/leaving docked state

### Active line auto-scroll interaction

- The "Sync to Video" button (see below) still operates underneath the docked video
- Active line highlight remains visible — auto-scroll places the active line ~120px below the docked video's bottom edge to avoid overlap
- "Sync to Video" button stays centered in its own row below the docked video and above the transcript rows, so the user can re-engage while docked

### "Sync to Video" button (auto-scroll re-engagement)

Appears in a dedicated row between the docked video and the transcript list when the learner has manually scrolled the transcript away from the active line.

- **Component**: `Buttons/Button` (DS) — Size=sm, Hierarchy=Primary, State=Default, Icon only=False
- **Label**: "Sync to Video"
- **Trailing icon (dynamic)**: direction depends on where the active line sits relative to the visible transcript viewport:
  - Active line is **above** viewport (user scrolled DOWN past it) → `chevron-up` — points back UP to catch playback
  - Active line is **below** viewport (user scrolled UP past it) → `chevron-down` — points DOWN to catch playback
- **Position**: centered horizontally in the transcript panel, above the transcript rows
- **Visibility**: hidden by default; appears when user manually scrolls the transcript ≥40px away from the active line
- **On click**: scrolls transcript back to the active line; re-enables auto-follow; disappears
- **Auto-dismiss**: also disappears when the next active line change lands within the visible range
- **A11y**: focusable via keyboard; `aria-label="Sync transcript to current video position"`

Naming rationale: "Sync to Video" is action-oriented (tells the user what will happen) rather than state-oriented ("Following"). Primary hierarchy signals importance — the user needs to notice this to re-engage with auto-scroll. Dynamic chevron direction communicates spatial context — the user immediately understands which way the transcript will jump.

### Edge cases

| Scenario | Expected behaviour |
|---|---|
| Player in full-screen | Disable sticky behaviour; full-screen overrides |
| Player error state | Still dock at top (shows error/retry compact) |
| Player loading state | Still dock at top (shows loader) |
| Tab is Notes/Downloads (no transcript) | Still dock — applies to all tab content scrolling |
| Mobile in landscape | Same dock pattern at 160px |

### Engineering implementation

- Use IntersectionObserver on the video player's bottom edge to detect when it leaves the viewport
- OR pure CSS `position: sticky` with a height transition on a wrapper class toggle
- Test against scroll wheel + trackpad + touch swipe to ensure smoothness on all input types
- Don't break keyboard navigation (Tab order should not skip docked controls)

---

## 1. Bookmark toast feedback pattern

When a user toggles bookmark via Topic Row icon or Topbar button, show a transient confirmation.

### Toast component
- Position: bottom-center on desktop · bottom-full-width on mobile
- Width: 320–480 desktop · fill mobile
- Padding: spacing-lg vertical · spacing-xl horizontal
- Background: `--lms-text-primary` (dark teal) — high contrast
- Text: white (`--lms-fg-white`) · style `.lms-text-sm-medium`
- Border radius: 8
- Shadow: `0 8px 24px rgba(19,40,47,0.16)`
- Icon: lead with success check (`check` 3120:7774) at 16px, white stroke

### Behavior
- **On add bookmark**: "Bookmarked · The measure phase" + "Undo" tertiary link
- **On remove bookmark**: "Bookmark removed" + "Undo" tertiary link
- Duration: 4 seconds, auto-dismiss
- Pause auto-dismiss while user hovers
- "Undo" reverts the toggle + closes the toast
- Max 1 toast visible at a time. New toast replaces old.
- Use a polite ARIA live region (`aria-live="polite"`) so screen readers announce it.

### When not to show
- Pre-existing bookmark loaded from API (state restoration) — no toast.
- User clicked same bookmark icon twice rapidly — debounce 300ms.

---

## 2. Transcript auto-scroll behavior

The Transcript tab list should automatically scroll to keep the currently-playing line visible.

### Default behavior
- As video plays, the line whose timestamp matches `currentVideoTimestamp` becomes Active (highlighted brand-section bg + 4px brand left border).
- The Active line auto-scrolls to be vertically-centered in the visible transcript area (smooth scroll, 300ms ease-out).

### Pause behavior — when user takes control
- If the user manually scrolls the transcript (via mousewheel, touch drag, scrollbar, or keyboard arrow keys), pause auto-scroll for 8 seconds OR until they click "Resume follow" pill.
- Show a small **"Following ↓ Resume"** pill chip at the top-right of the transcript area when auto-follow is paused. Click resumes following.
- Pill chip uses `bg-brand-section` + `text-brand-secondary` + spacing-md padding.

### Edge cases
- If the Active line moves off-screen while pause is active → keep showing the pill.
- If user clicks a transcript line → seek video to that line + resume auto-follow.
- If user re-enables follow → smooth-scroll to Active line.

### Implementation hints
- Track `userScrolledRecently: boolean` in transcript component state.
- Use `IntersectionObserver` to detect when Active line is in viewport (don't scroll if already visible within a 25% margin).
- Don't scroll if the transcript area has focus and user is typing in note editor.

---

## 3. Accessibility checklist (WCAG 2.1 AA)

### Keyboard navigation map (per screen)

| Screen | Tab order | Critical shortcuts |
|---|---|---|
| Video lesson (any tab) | Topbar buttons (left to right) → Sidebar (expand toggle → Module headers → Topic rows) → Video player (Play/Pause → Scrub → Speed → Volume → CC → Fullscreen) → Video chrome (CC → Language → Download transcript) → Tabs → Tab content → Footer Nav (Previous → Next) | `Space` play/pause · `←/→` seek ±10s · `↑/↓` volume · `M` mute · `C` CC · `F` fullscreen · `N` add note on active line · `J/K` previous/next transcript line · `Esc` close modal/panel |
| Note Editor Modal | Close X → Note textarea → Tags input → Cancel → Save | `Cmd/Ctrl+Enter` save · `Esc` cancel |
| Notifications Panel | Close X → Mark all read → Tabs (Left/Right arrows to navigate) → Items → Footer link | `Esc` close · arrow keys between tabs |
| Saved Panel | Close X → Filter chips (Left/Right arrows) → Items → Footer link | `Esc` close |
| Sidebar (when in drawer mode) | Close X → Course Header → Modules/Topics | `Esc` close drawer |

### ARIA labels (icon-only buttons)

- Topbar Notifications → `aria-label="Notifications, 3 unread"`
- Topbar Bookmark → `aria-label="Saved items"`
- Topbar AI → `aria-label="AI Assistant"`
- Topbar Close → `aria-label="Exit course player"`
- Sidebar collapse toggle → `aria-label="Collapse sidebar"` / `"Expand sidebar"`
- Bookmark on Topic Row → `aria-label="Bookmark The measure phase"` / `"Remove bookmark"`
- Topic Row → `aria-current="page"` on the active row
- Transcript line "+ Note" → `aria-label="Add note at 0:38"`
- Transcript line "✎ Edit" → `aria-label="Edit note at 0:38"`
- Note Item edit / delete → `aria-label="Edit note" / "Delete note"`

### Focus trap

- Note Editor Modal: focus trapped inside while open. First focusable = Close X. Last wraps to Close X.
- Overlay panels (Notifications + Saved): same focus trap rules.
- Mobile Sidebar drawer: same.

### Screen reader announcements

- Active transcript line change → polite announcement: "Now playing: {line text}"
- Bookmark added/removed → polite announcement of toast text
- Save note success → polite announcement: "Note saved"
- Video state changes → polite announcement: "Video loaded", "Video ended"

### Color contrast (verified against WCAG AA)

- All text colors used (`text-primary` #13282F, `text-secondary` #606B7A, `text-tertiary` #677482, `text-brand-secondary` #26708E) verified at 4.5:1+ on `bg-primary` (#FFFFFF) and `bg-secondary` (#F3F5FA).
- Active transcript line text (`text-brand-secondary` on `bg-brand-section` #EBF8FF) = 4.6:1 ✓ AA.
- Active topic row in sidebar (same combo) = 4.6:1 ✓.
- Live now red badge (white on `text-error-primary` #DA3336) = 4.5:1 ✓.

### Touch targets

- All buttons + icon buttons ≥ 44×44px on mobile (Footer Nav buttons are 40h — bump padding to 44 on mobile or accept 40 with at least 44 horizontal hit area).
- Topic Row ≥ 56h ✓.

### Reduced motion

- Respect `prefers-reduced-motion`: disable transcript smooth-scroll, panel slide-in animations (instant on/off), toast fade.

---

## 4. Share menu content + Analytics events

### Share menu (Certificate Share button dropdown)

When user clicks the "Share" button in `LMS / Course Certificate`, open a small dropdown menu with these items:

| Item | Action | Icon |
|---|---|---|
| Share to LinkedIn | Opens LinkedIn share dialog with certificate URL pre-filled | linkedin icon |
| Share to Twitter / X | Opens X share dialog with certificate URL + "I just completed {courseTitle} on SkillUp 🎓" | x icon (or twitter) |
| Share to Facebook | Opens FB share dialog | facebook icon |
| Copy link | Copies certificate URL to clipboard + shows "Link copied" toast | link icon |
| Email | Opens user's mail client with subject + body pre-filled | mail icon |

Menu styling:
- White bg + border-secondary 1px + radius 8
- 8px shadow
- Items: 12px vertical padding, 16px horizontal, icon (16) + label (sm-medium)
- Hover: bg-secondary tint
- Close on outside click + Esc

### Analytics events to track (Phase 1)

Use a unified `track(event, properties)` API. Properties include `courseId, topicId, userId` automatically.

| Event name | When fired | Extra properties |
|---|---|---|
| `course_enter` | User navigates to course | — |
| `topic_enter` | User opens a topic | `topicType`, `position`, `viaSidebar/footer/notification` |
| `topic_complete` | Topic marked complete | `topicType`, `timeSpent` |
| `module_complete` | All topics in a module marked done | `moduleId` |
| `course_complete` | Course completed | `score`, `totalTime` |
| `video_play` | Play pressed | `videoId`, `from: 0s` |
| `video_pause` | Pause pressed | `videoId`, `at` |
| `video_seek` | User scrubs | `videoId`, `from`, `to` |
| `video_speed_change` | Speed change | `videoId`, `newSpeed` |
| `video_cc_toggle` | CC on/off | `videoId`, `enabled` |
| `video_language_change` | Caption language change | `videoId`, `language` |
| `video_complete` | Video ended | `videoId` |
| `transcript_line_click` | User clicks line | `lineId`, `currentTs`, `newTs` |
| `note_add` | Note created | `topicId`, `lineId`, `hasTags` |
| `note_edit` | Note edited | `noteId` |
| `note_delete` | Note deleted | `noteId` |
| `bookmark_add` | Bookmark added | `topicId` |
| `bookmark_remove` | Bookmark removed | `topicId` |
| `panel_open` | Overlay panel opened | `panel: notifications|saved`, `unreadCount` |
| `notification_click` | User clicks a notification | `notifId`, `type` |
| `download_file` | File downloaded | `fileId`, `type` |
| `download_transcript` | Transcript downloaded | `videoId`, `format: srt|txt` |
| `certificate_view` | User views certificate | — |
| `certificate_share` | User shares via menu | `channel: linkedin|twitter|facebook|copy|email` |
| `certificate_print` | Print clicked | — |
| `sidebar_collapse` | Sidebar collapsed | `from: expanded|collapsed` |
| `module_expand` | Module expanded in sidebar | `moduleId` |
| `module_collapse` | Module collapsed | `moduleId` |
| `mobile_drawer_open` | Mobile drawer opened | — |
| `mobile_drawer_close` | Mobile drawer closed | — |
| `ai_panel_open` | AI panel opened | `mode` |
| `ai_query_submit` | AI query sent | `mode`, `queryLength` |

### Privacy + GDPR

- All events anonymous-per-default. PII only if user signed in + opted in.
- Honor "Do Not Track" header → disable analytics.
- Provide a settings toggle to opt out (link in Account Settings).
- Document retention: 18 months default for raw events.
