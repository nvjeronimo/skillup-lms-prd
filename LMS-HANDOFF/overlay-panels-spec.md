# Overlay Panels Spec — Notifications + Saved

Two right-overlay slide-in panels triggered from the Course Player Topbar utility buttons. Both share the same chrome.

## Pattern

- **Trigger**: Topbar utility button click (Notifications icon → opens Notifications panel · Bookmark icon → opens Saved panel).
- **Layout**: Right-aligned overlay, fills full viewport height.
- **Width**: 480px desktop. Full-screen on mobile (< 768px).
- **Backdrop**: Semi-transparent dark teal (`#13282F` at 50% opacity) covers the rest of the viewport. Click backdrop → close panel.
- **Animation**: Slide in from right, 200ms ease-out. Backdrop fade in synchronized.
- **Keyboard**: Esc closes the panel. Focus trapped inside while open.
- **Mutual exclusivity**: Only one overlay panel can be open at a time. Opening one closes the other.

## Shared chrome

```
┌─────────────────────────────────────────────┐
│  Title          [optional action] [✕]      │  Header (24px padding, border-bottom)
├─────────────────────────────────────────────┤
│  [filter chips]                              │  Optional sub-header
├─────────────────────────────────────────────┤
│  ─── SECTION LABEL ───                       │  Sticky on scroll
│  [item 1]                                    │
│  [item 2]                                    │
│  ─── ANOTHER SECTION ───                     │
│  [item 3]                                    │
│  ...                                         │  Scrollable body
├─────────────────────────────────────────────┤
│              View all                        │  Footer (border-top, centered link)
└─────────────────────────────────────────────┘
```

Token bindings (use these — no hex):
- Panel bg → `--lms-bg-primary`
- Backdrop → `rgba(19, 40, 47, 0.5)` (teal-tinted dark)
- Border (left edge of panel, dividers between sections + items) → `--lms-border-secondary`
- Section label bg → `--lms-bg-secondary` · text → `--lms-text-tertiary` · style → `.lms-text-2xs-medium`
- Item title text → `--lms-text-primary` · style → `.lms-text-sm-semibold`
- Item body text → `--lms-text-secondary` · style → `.lms-text-sm-regular`
- Item timestamp/meta → `--lms-text-tertiary` · style → `.lms-text-xs-regular`
- Action links → `--lms-text-brand-secondary` · style → `.lms-text-sm-medium`

---

## Panel 1 — Notifications

**Figma**: `3545:69932` (UUI · V7 / Panel · Notifications)

### Header
- Title: "Notifications"
- Action: "Mark all read" (tertiary link)
- Close X

### Sections (by recency)
- **Today**
- **Yesterday**
- **Earlier this week**
- **Older** (overflow into "View all" page)

### Notification Item anatomy

```
●   [icon]   Title (semibold)
              Body text · meta · highlights
              Timestamp
```

- **Unread dot** (left): 8px circle, `--lms-fg-brand-primary` fill. Hidden when read.
- **Icon avatar** (36×36 rounded, `bg-brand-section` fill): pictograph indicating notification type. Concrete UUI icon mapping:
  - Live now / Live soon → red filled ellipse (14×14, `text-error-primary`) — not a stroke icon
  - Course update → `plus` icon (UUI: `2650:1306`)
  - Assignment / deadline → `calendar` icon (UUI: `3432:13763`)
  - Discussion reply → `message-circle-01` (UUI: `3038:336`)
  - Peer review rating → `stars-01` (UUI: `3432:13759`)
  - Syllabus change → `book-open-01` (UUI: `3432:13761`) or `file` icon
  - Icon stroke bound to `text-brand-secondary` (teal). Always 18×18 inside the 36×36 wrap.
- **Content column** (fills):
  - Title (sm/semibold, text-primary)
  - Body (sm/regular, text-secondary) — supports quote inline with “…”
  - Timestamp (xs/regular, text-tertiary)
- **Click** → either navigate to source (course / topic / thread) or open a more detailed view.

### Notification types — required coverage

| Type | Example | Icon | CTA on click |
|---|---|---|---|
| Live session reminder | "Live now: Office hours with Sarah" | live-dot | Open VILT Live screen |
| Live session T-15 | "Office hours starts in 15 min" | live-dot | Open VILT Join Live screen |
| Course update | "Sarah added new content: Prompt review recording" | plus | Open the new topic |
| Assignment due | "Practice Quiz is due in 2 days" | calendar | Open the assignment |
| Discussion reply | "Carlos M. replied to your discussion" | chat | Open thread |
| Peer review received | "Anonymous peer rated your submission 4/5" | star | Open submission detail |
| Syllabus change | "Module 04 syllabus updated" | document | Open syllabus |

### Footer
- "View all notifications" link → navigate to a full Notifications page (out of prototype scope, but link should be wired).

---

## Panel 2 — Saved (Bookmarks + Notes combined)

**Figma**: `3545:69992` (UUI · V7 / Panel · Saved)

Unified "things I've kept" view. Combines bookmarked topics and saved notes.

### Header
- Title: "Saved"
- Close X (no "Mark all read" equivalent)

### Filter chips (below header, sticky)
- **All · N** (default active)
- **Topics · N**
- **Notes · N**

Each chip is a pill. Active chip uses `--lms-bg-brand-section` bg + `--lms-text-brand-secondary` text. Inactive uses `--lms-bg-secondary` + `--lms-text-secondary`.

### Sections
- **Bookmarked topics** — listed by date bookmarked (most recent first)
- **Saved notes** — listed by date saved (most recent first)

Filter chips can hide sections (e.g. "Topics" chip → only show Bookmarked topics).

### Bookmarked Topic Item anatomy

```
[T-Type   Topic type · duration
 icon ]   Title (semibold)
          Course · Module · Lesson path
          Bookmarked date
```

- **Topic-Type icon** (36×36 rounded, `bg-brand-section` fill, `text-brand-secondary` stroke): icon depends on topic type. Mapping used in the prototype:
  - Reading → `book-open-01` (UUI: `3432:13761`)
  - Video → `play` (UUI: `3224:35244`)
  - Live Session / VILT → `video-recorder` (UUI: `3234:35361`)
  - Recording → `video-recorder` (same)
  - Project / Capstone → `award-01` (UUI: `3432:13744`)
  - Practice / Graded → `edit-02` (UUI: `2866:3473`) — assignment pencil
  - Peer-graded / Peer Review → `users-01` (UUI: `2654:1118`)
  - Discussion → `message-circle-01` (UUI: `3038:336`)
  - Quiz → `check-square` or `stars-02` (UUI: `3120:14982`)
  - Activity → `puzzle` / `target` icon (substitute if available)
- **Meta row** (xs/semibold + xs/regular): type label in brand color · duration in tertiary
- **Title** (sm/semibold, text-primary)
- **Path** (xs/regular, text-tertiary) — "Course · Module · Lesson"
- **Saved date** (xs/regular, text-tertiary)
- **Click** → navigate to that topic

### Saved Note Item anatomy

```
0:38 · Topic name           [saved date]
│ italic transcript anchor line in quote style
Note text in sm/medium, text-primary
[#tag] [#tag]
```

- **Top row**: `timestamp · topic path` (xs/semibold, text-brand-secondary) + saved date right-aligned (xs/regular, text-tertiary)
- **Anchor quote**: 3px left border `--lms-border-brand`, italic Inter, sm/regular, text-tertiary
- **Note text**: sm/medium, text-primary
- **Tags row**: chips with `#tagname` (xs/medium, text-tertiary, bg-secondary fill)
- **Click anywhere on item** → navigate to topic + seek to line + switch to Notes tab + highlight note.

### Footer
- "View all saved items" link → full Saved page.

---

## Component decomposition for engineering

Suggested file structure:

```
components/
└── organisms/
    ├── OverlayPanel.tsx           # Shared chrome (backdrop + panel + slide animation)
    ├── NotificationsPanel.tsx     # uses OverlayPanel + NotificationItem
    └── SavedPanel.tsx             # uses OverlayPanel + SavedTopicItem + SavedNoteItem
└── molecules/
    ├── NotificationItem.tsx
    ├── SavedTopicItem.tsx
    └── SavedNoteItem.tsx
```

### Props interfaces

```ts
interface OverlayPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  headerAction?: { label: string; onClick: () => void };
  filters?: { label: string; value: string; count: number; active?: boolean }[];
  onFilterChange?: (value: string) => void;
  footer?: { label: string; href: string };
  children: ReactNode;          // The scrollable body content
}

interface NotificationItem {
  id: string;
  type: "live-now" | "live-soon" | "course-update" | "assignment-due" | "discussion-reply" | "peer-review-received" | "syllabus-change";
  title: string;
  body?: string;
  timestamp: string;            // relative or absolute
  unread: boolean;
  href: string;                 // route to navigate on click
  group: "today" | "yesterday" | "this-week" | "older";
}

interface SavedTopic {
  id: string;
  topicId: string;
  topicType: TopicType;
  duration: string;
  title: string;
  path: string;                 // "Course · Module · Lesson"
  savedAt: string;
}

interface SavedNote {
  id: string;
  noteId: string;
  topicId: string;
  topicTitle: string;
  ts: string;                   // "0:38"
  anchorQuote: string;
  text: string;
  tags: string[];
  savedAt: string;
}
```

### Storybook stories

Add to `storybook-coverage.md`:

- `Organisms/Overlay Panel` — shell with mock content, with and without filter chips, with and without footer.
- `Organisms/Notifications Panel` — open state with 5–7 mock notifications across the 3 date sections.
- `Organisms/Saved Panel` — open state with mix of topics + notes, each filter chip in active state.
- `Molecules/Notification Item` — one story per notification type.
- `Molecules/Saved Topic Item` — one story per topic type.
- `Molecules/Saved Note Item` — default + with long anchor quote + with many tags.

### Accessibility

- Panel = `<aside role="dialog" aria-modal="true" aria-labelledby="panel-title">`.
- Trap focus inside panel while open. First focusable on open = close X. Last focusable wraps back.
- Backdrop click + Esc both close.
- Section labels are `<h2>` for screen readers (visually styled as eyebrow but semantically heading).
- Each item has `role="link"` if click navigates. Use real `<a>` for nav items.
- Unread indicator → `aria-label="Unread"` on the dot.
