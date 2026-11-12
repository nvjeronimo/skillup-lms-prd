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

**Drawer header**: "Course Journey" title + close X icon.

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

---

## Completion (when playback cannot be measured)

Video **auto-completes at ≥90% watched** whenever the platform can report the learner's watch-%. In that case
there is no button and nothing is asked: completion is automatic.

**When watch-% cannot be tracked, the learner completes the topic** (the rule for every topic the platform cannot
measure, after Navdeep's Figma comments of 12 Oct 2026):

- **Mark as Complete** sits at the end of the content, in the same row as the feedback (feedback on the left, the
  button on the right; under the feedback on a phone; 13 Oct 2026), never in the header. It uses the **Primary** hierarchy (DS
  `Topic-Status-Badge`, `Mark as Complete`).
- The footer is the usual *Previous* and *Next*. If the learner selects *Next* on a video that is not completed,
  a dialog asks *Have you completed this video?* **Yes, completed** marks it as completed and goes to the next
  topic; **Not yet** keeps it incomplete and goes to the next topic; **Close** changes nothing and stays.

Once complete, a **"Marked as completed" status badge** shows in the header, and the sidebar topic row flips to
its completed (check) state. The button is gone, and **nothing shows in the footer or under the content.**

See `topic-types-inventory.md` §5 for the cross-type rule and Row 8, *Completion when playback cannot be measured
(Mark as Complete, and Next asks)*, on the Figma *Phase 1 – Video Lesson* page: card 8 shows not completed, the
question and completed.

*Until 12 Oct 2026 the status badge showed in both header and footer once complete, and Next never asked.*
a partner's platform. The Video screens were not changed.*

---

## YouTube videos (4 Nov 2026, decided 12 Nov 2026)

A YouTube video plays in **YouTube's official embed** ([decision 041](../00-decisions/041-youtube-official-embed-only.md)).
The screens are on the Figma *Phase 1 · Video Lessons* page, row 9 (In review): desktop with every state, plus tablet
and mobile (cards 9.2 and 9.3). Row 10, YouTube inside our player, was withdrawn on 12 Nov 2026 and is kept as
SUPERSEDED. The tech team found that YouTube's policies require the logo and its link to stay visible and
clickable, and row 10 covered them. Sources: [meeting of 4 Nov 2026](meeting-2026-11-04-scorm-youtube.md) and Kirti, 12 Nov 2026.

| | YouTube embed in a Text component (row 9) |
|---|---|
| Player | YouTube's own: share, quality, captions and the YouTube logo. We cannot restyle it, cover it or sandbox it. |
| Progress | Not tracked: Open edX gets no watch time |
| Completion | Mark as Complete in the feedback row, and Next asks (rule above). Marking it without watching is accepted (Vikas). |
| Under the player | Info alert: *Your progress on this video isn't tracked*. It asks the learner to select Mark as Complete, also after watching on YouTube. |
| Back from YouTube | When the learner leaves the tab and returns while the topic is not complete, the alert reads *Welcome back. Did you finish the video?* / *Your progress on YouTube isn't tracked. If you watched it to the end, select Mark as Complete below.* Once the topic is complete, the alert returns to its first text. Use `visibilitychange`, not window blur. |
| Tabs | None: no transcript, notes or downloads |
| Leaving to YouTube | The logo opens youtube.com, and nothing is recorded there. It cannot be blocked (the tech team's discovery, 12 Nov 2026). |
| Not available (removed, private, region) | YouTube's own message |
| Size and aspect ratio | Set by the ICP CSS, not in Studio. The embed code YouTube gives has a fixed `width="560" height="315"`, and course teams paste it unchanged. The ICP overrides it: a YouTube iframe inside a Text component fills the content width at 16:9 (`width: 100%`, `aspect-ratio: 16 / 9`, `height: auto`), whatever size was pasted. A video that is not 16:9, such as a vertical Short, gets YouTube's own black bars inside that frame. The content creator sets nothing. Still to confirm with Vikas: whether the current theme already does this, or whether embeds stay at 560 px. |

**A video that must not open on YouTube** goes to Azure, when SkillUp owns the file. It plays in our player and
completes by itself.

