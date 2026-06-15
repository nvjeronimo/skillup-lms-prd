# Prototype Interaction Flows

User starts at `/` → redirected to `/course/six-sigma/topic/m3-t1` (Active topic from mock data).

## Routes

| Route | Page |
|---|---|
| `/course/[courseSlug]/topic/[topicId]` | Video player + Transcript tab (default) |
| `/course/[courseSlug]/topic/[topicId]/notes` | Notes tab |
| `/course/[courseSlug]/topic/[topicId]/downloads` | Downloads tab |

Tab change uses Next.js `Link` to update URL. Page re-uses the layout and only swaps the tab content area.

## Client state (Zustand or React Context)

```ts
type LmsState = {
  sidebarExpanded: boolean;            // Desktop: true | Tablet: false | Mobile: drawer closed
  mobileDrawerOpen: boolean;
  currentTopicId: string;
  currentTabSlug: "transcript" | "notes" | "downloads";
  currentVideoTimestamp: number;       // seconds
  notes: Note[];
  noteEditor: { open: boolean; lineId?: string; noteId?: string; };
  bookmarks: Set<string>;              // topic IDs

  // Right-overlay panels — mutually exclusive
  openPanel: null | "notifications" | "saved";

  setSidebarExpanded: (v: boolean) => void;
  setMobileDrawerOpen: (v: boolean) => void;
  setCurrentTopic: (id: string) => void;
  seekVideoTo: (ts: number) => void;
  openNoteEditor: (params: { lineId?: string; noteId?: string }) => void;
  closeNoteEditor: () => void;
  saveNote: (note: NotePayload) => void;
  deleteNote: (id: string) => void;
  toggleBookmark: (topicId: string) => void;

  // Panels
  openOverlayPanel: (which: "notifications" | "saved") => void;  // closes the other if open
  closeOverlayPanel: () => void;
};
```

## Interaction tree

### Sidebar
- **Course Header toggle button** → `setSidebarExpanded(!sidebarExpanded)`
- **Module Header click** → expand/collapse that module group (local state inside Sidebar or in store)
- **Topic Row click** → `setCurrentTopic(id)` → router push to that topic's URL
- **Bookmark icon on row** → `toggleBookmark(topicId)`
- **Mobile**: drawer overlay slides in from left when topbar ☰ is tapped

### Topbar
- **Logo** → home / Course Hub (out of scope route — can be a no-op or scroll to top)
- **Breadcrumb** (Desktop) → click any segment to navigate
- **AI Assistant button** → toggle AI panel right rail (out of scope visually; prototype can show toast)
- **Bookmark button** → `openOverlayPanel("saved")` — opens the Saved panel from the right
- **Notifications button** → `openOverlayPanel("notifications")` — opens Notifications panel
- **Theme toggle** → no-op (single Light theme)
- **Avatar** → mock dropdown with sign out
- **Close X** → exit player → home

### Overlay panels (Notifications + Saved)
- **Backdrop click** → `closeOverlayPanel()`
- **Esc** → `closeOverlayPanel()`
- **Close X in panel** → `closeOverlayPanel()`
- **Opening one panel closes the other** (mutual exclusivity)
- **Notification item click** → navigate to source (course / topic / thread) → closes panel
- **Notification "Mark all read"** → bulk mark unread=false on notifications store
- **Saved filter chip click** → filter the list (All / Topics / Notes)
- **Saved Topic item click** → navigate to that topic → closes panel
- **Saved Note item click** → navigate to topic + seek to line + switch to Notes tab + highlight → closes panel
- **Focus trap** active while panel is open. First focusable on open = Close X. Tab cycles within panel.

### Video player
- **Play/Pause** → start/stop video. Update `currentVideoTimestamp`.
- **Progress bar** → seek
- **Speed control** (`1×`) → cycle speed (0.5/1/1.25/1.5/2)
- **Captions toggle** → on/off
- **Fullscreen** → enter fullscreen API

### Tabs
- **Transcript / Notes / Downloads** → navigate to nested route. Update `currentTabSlug`.

### Transcript tab
- **Transcript Line click** → `seekVideoTo(line.ts)` + set this line as Active. Existing Active loses state.
- **Line "+ Note" pill click** (visible on Active line where Has note=false) → `openNoteEditor({ lineId })`. Modal opens.
- **Line "✎ Edit" pill click** (visible on Active line where Has note=true) → `openNoteEditor({ noteId })` of the existing note. Modal opens.

### Notes tab
- **Note Item click** → `seekVideoTo(note.ts)` + `setCurrentTabSlug('transcript')` + scroll/highlight that line.
- **Note Item ✎ icon** → `openNoteEditor({ noteId: note.id })`.
- **Note Item × icon** → confirm + `deleteNote(note.id)`.
- **Tag click** → filter notes to that tag (local state in Notes tab).
- **Search field** → local filter by note text + tags.

### Downloads tab
- **File Item Download button** → trigger download (in prototype just `console.log` or `alert("Downloading...")`).

### Note editor modal
- Fields: Anchor preview (read-only, shows transcript line text) · Note text (textarea) · Tags input (chip input).
- Buttons: Cancel (closes) · Save (validates + saves).
- Save:
  - If `noteEditor.noteId` exists → update existing note
  - Else if `noteEditor.lineId` exists → create new note anchored to that line at the line's timestamp
- Keyboard: Esc cancels. Cmd/Ctrl + Enter saves.

### Footer Nav
- **Previous** → navigate to previous topic (compute from current topic index in course data)
- **Next topic** → navigate to next topic
- Disabled when at boundary (first/last topic). For prototype, both ends can wrap or be no-op.

## Responsive breakpoints

```ts
const breakpoints = {
  mobile: { max: 768 },       // 320–767
  tablet: { min: 769, max: 1024 },
  desktop: { min: 1025 }
};
```

Sidebar behavior by breakpoint:
- **Desktop**: Sidebar v2 State=Expanded (in-flow, 280w). User can collapse to State=Collapsed (72w).
- **Tablet**: Sidebar v2 State=Collapsed (in-flow). No expand by default.
- **Mobile**: Sidebar hidden by default. Topbar ☰ button opens drawer (Sidebar v2 State=Mobile, 320w, overlay with backdrop).

Topbar by breakpoint:
- **Desktop**: full topbar with breadcrumb
- **Tablet**: hide breadcrumb, keep utility buttons
- **Mobile**: compact topbar with ☰ left, brand center, avatar + close right
