# Screens Spec — Video Lesson Flow

The prototype implements the **Video lesson player** with 3 content tabs, sidebar collapse interaction, and responsive breakpoints. Source of truth: 7 screens in Figma's "Final Screens" section.

---

## Screen 1 — Video · Transcript (Desktop, Sidebar Expanded)

**Figma**: `3042:15122` · 1440×900

**Layout**:
```
┌─────────────────────────────────────────────────────────────────┐
│  Course Player Topbar                                            │ 60
├──────────┬──────────────────────────────────────────────────────┤
│          │                                                       │
│ Sidebar  │  Video player 16:9                                    │ 405
│ v2       │                                                       │
│ Expanded │                                                       │
│ (280w)   ├──────────────────────────────────────────────────────┤
│          │  Transcript | Notes (2) | Downloads (3)              │ 32
│          ├──────────────────────────────────────────────────────┤
│          │                                                       │
│          │  Transcript Lines list                                │
│          │  • 0:00  Welcome back. In this unit...                │
│          │  • 0:18  Understanding this lifecycle is...           │
│          │  ●0:38  The lifecycle begins... [+ Note] (Active)   │
│          │  • 0:58  Traditionally, this research...              │
│          │  ●1:14  This is exactly where AI tools...           │
│          │                                                       │
├──────────┴──────────────────────────────────────────────────────┤
│  [Previous] · 7 of 15 · Hierarchy and emphasis... · [Next topic] │ 64
└─────────────────────────────────────────────────────────────────┘
```

**Key behaviors**:
- Sidebar Topic Row at "0:38" is Active (highlighted brand-section bg, 4px left brand border, bookmark visible)
- Two transcript lines (0:38 and 1:14) have a blue dot indicator (Has note=true)
- Active line shows "+ Note" pill OR "✎ Edit" pill (if Has note=true, the row is the currently-playing line)
- Click any transcript line: seeks the video to that timestamp and scrolls
- Click "+ Note": opens note editor modal pre-anchored to that line
- Click "✎ Edit" (on lines with notes): opens the existing note in editor

---

## Screen 2 — Video · Transcript (Sidebar Collapsed)

**Figma**: `3537:11312` · 1440×900

Same as Screen 1 but Sidebar v2 in **Collapsed** state (72w). Topic rows shown as just completion dots + active indicator.

**Behavior**: clicking the sidebar expand/collapse toggle (top-left of sidebar) animates between Expanded ↔ Collapsed.

---

## Screen 3 — Video · Notes

**Figma**: `2805:1356` · 1440×900

Same chrome as Screen 1 but the content tab shows **Notes** (highlighted, badge "2").

**Tab content**: List of Note Items.

**Note Item anatomy** (each row):
```
0:38                                              Edited 2m ago [✎] [×]
│ The lifecycle begins long before any code is written — with deep
│ understanding of customer needs.
Lifecycle starts with customer understanding — before any code
#discovery  #lifecycle
```

**Below the list**: subtle info hint with info-icon: "Create notes from the Transcript tab — click + Note on any line."

**Behavior**:
- Click a note → seeks the video to that line's timestamp + switches back to Transcript tab + highlights that line
- Click ✎ → opens note editor modal
- Click × → delete confirmation
- Click a tag → filter Notes list to that tag

---

## Screen 4 — Video · Downloads

**Figma**: `2805:1630` · 1440×900

Tab content shows **Downloads** (badge "3").

**Tab content**: List of File Items.

**File Item anatomy** (each row):
```
[PDF icon]  prompt-template-v3.pdf
            145 KB · Added 2 weeks ago                    [Download]
```

**Behavior**: click Download → triggers file download (mock).

---

## Screen 5 — Tablet / Video · Transcript

**Figma**: `2810:2628` · 960×900

**Layout changes vs Desktop**:
- Sidebar v2 in **Collapsed** state by default (72w) to save horizontal space
- AI Panel hidden (no right panel)
- Same Video player + tabs + transcript on the right
- Topbar shows compact variant (no breadcrumb)
- Topic Footer Nav same as Desktop

**Breakpoint trigger**: viewport width ≤ 960px and > 480px → Tablet variant.

---

## Screen 6 / 7 — Mobile / Video · Transcript

**Figma**: `2810:2773` (mobile menu closed) + `3253:39915` (mobile menu open) · 375×917

**Layout (closed)**:
```
┌─────────────────────────────┐
│ Topbar (Mobile)             │ 56
│ ☰ SkillUp LMS    🔖 👤 ✕   │
├─────────────────────────────┤
│                              │
│  Video player 16:9           │ 211
│                              │
├─────────────────────────────┤
│ Reading · 7 of 15            │
│ Hierarchy and emphasis...    │
├─────────────────────────────┤
│ Transcript ●  Notes  Files   │  (tabs scrollable horizontally)
├─────────────────────────────┤
│                              │
│ Transcript Lines (full       │
│ width)                       │
│                              │
├─────────────────────────────┤
│ [< Previous]    [Next  >]   │ Footer Nav compact
└─────────────────────────────┘
```

**Layout (drawer open)**: tap ☰ → drawer slides in from left covering ~85% of screen. Drawer = Sidebar v2 State=Mobile variant (320×852).

**Drawer header**: "Course menu" title + close X icon.

**Drawer content**: same hierarchy as Desktop expanded — Course Header + Overall Progress bar (top) + Module groups + Overall Progress ring (bottom).

---

---

## Additional surfaces — Right-overlay panels

Two right-side slide-over panels triggered from the Course Player Topbar utility buttons. Not separate "screens" — they overlay on top of any of Screens 1–7.

- **Notifications panel** — triggered by Topbar Notifications button. Width 480 desktop / full-screen mobile.
- **Saved panel** — triggered by Topbar Bookmark button. Combines bookmarked topics + saved notes.

Mutually exclusive. Backdrop click + Esc closes. See `overlay-panels-spec.md` for full anatomy + icon mappings + a11y.

---

## Interactions to implement

| Element | Interaction | Behavior |
|---|---|---|
| Sidebar collapse toggle | Click | Animate Sidebar from Expanded (280w) → Collapsed (72w) or vice versa. Transition: 200ms ease. |
| Transcript line | Click | Seek video to line's timestamp + highlight line as Active. |
| Transcript line "+ Note" pill | Click | Open Note editor modal pre-anchored to that line. |
| Transcript line "✎ Edit" pill | Click | Open existing note in editor. |
| Note editor | Submit | Save note with text + tags + line ID. Close modal. Refresh Notes tab. |
| Note in Notes tab | Click | Seek video + switch to Transcript tab + scroll+highlight that line. |
| Tab change | Click any tab | Switch content area between Transcript / Notes / Downloads. Update URL path. |
| Topbar ☰ (Mobile) | Tap | Open Sidebar drawer (slide in from left). |
| Topbar AI button | Click | (Out of scope for prototype — placeholder behavior OK) |
| Topbar Bookmark | Click | Toggle bookmark on current topic. |
| Topbar Notifications | Click | (Out of scope) |
| Topbar Theme | Click | (Out of scope — single light theme) |
| Footer Nav Previous | Click | Navigate to topic at index − 1. |
| Footer Nav Next topic | Click | Navigate to topic at index + 1. |
| Topic Row in sidebar | Click | Navigate to that topic. Update sidebar Active state. |
| Module Header | Click | Expand/collapse module group (animate caret + topic rows visibility). |
| Course Header expand-collapse | Click | Toggle sidebar Expanded ↔ Collapsed. |
| Topic Row bookmark icon | Click | Toggle bookmark for that topic. |
