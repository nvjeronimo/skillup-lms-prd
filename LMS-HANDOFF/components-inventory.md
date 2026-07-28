# LMS Extension Components — Inventory

**Updated 2026-06-15**: All 132 LMS Extension Components migrated to DS file.

- **DS location**: file `c7EUDrQwP8si08aPipDSIV`, page `❖ LMS COMPONENTS ✅` (`1030:33572`)
- **Working file backup**: local copies remain on `Wz2TCYFVr0hD8tJNiLajLt` Playground page for reference
- **Engineer access**: components are remote-published — pull via Figma library subscription
- **Plugin import**: use SHA keys from `reference_uui_lms_components_keys.md` for programmatic instance creation

Organized by 12 domain frames (A through K + showcases). 132 components total (40 top-level masters + 92 variants inside sets). Each section below documents the component's Figma node ID, type, variants, props, anatomy summary, and key tokens.

### Handoff chrome components (DS Design Annotations)

These live on the DS file's Design Annotations page (`1054:557`) — separate from LMS components but used inside handoff card spec frames:

| Component | DS Node ID | Use |
|---|---|---|
| Status/In progress | 19949:528243 | Card header status pill |
| Status/In review | 19949:528245 | Card header status pill |
| Status/Done (Ready for DEV) | 19949:528247 | Card header status pill |
| Status/Sign-Off | 19949:528249 | Card header status pill |
| Status/Archived | 19949:528251 | Card header status pill |
| Status/Blocked-Paused | 19949:528253 | Card header status pill |
| Status/Deferred (LMS contrib) | 19951:1957 | LMS-contributed status pill |
| Status/Draft (LMS contrib) | 19951:1959 | LMS-contributed status pill |
| Handoff card header (LMS contrib) | 19952:1961 | Standard card header for every spec frame |
| Info Labels (set) | 19949:528255 | Card meta block (status / type / dates / links) |

Full SHA key list in auto-memory: `reference_uui_handoff_keys.md`.

---

## File Upload Zone (new — added 2026-06-02)

Used on Peer-graded Assignment screen (3055:8054) below the "Required attachments" checklist. Engineer should build as a `FileUploadZone` molecule.

**Anatomy**:
- Section header "Upload files" (Text md/Semibold)
- **Drop zone** — full-width, padding 24h × 32v, radius 12, dashed 2px border `border-brand`, fill `bg-brand-section`
  - Circle icon wrap 48×48 (bg-primary, border-secondary 1px, ↑ arrow text-brand-secondary)
  - "Drop files here, or **browse files**" (sm-medium + sm-semibold link)
  - File constraints sub-text (xs/regular text-tertiary) — "PDF, DOCX, MD, TXT · 25 MB max per file"
- **Uploaded files** list (sm/regular header + count "2 of 3 required")
  - Each file row: type chip (PDF/DOCX/etc) + name (sm semibold) + meta (xs regular) + status text + remove X

**Behavior**:
- Drag-drop accepts files dropped over the zone (visual highlight on drag-over)
- Click "browse files" opens native file picker
- Each file uploads with progress; success → "✓ Uploaded" status; error → red status + retry button
- Remove X deletes file (confirm before destructive action)
- File type validation (only accept listed types) — show error toast on invalid
- File size validation (under 25 MB) — show error inline

**Props**:
- `acceptedTypes: string[]` — MIME types or extensions
- `maxSizeMB: number` (default 25)
- `requiredCount: number` (default unlimited)
- `uploadedFiles: File[]`
- `onUpload(file): Promise<UploadResult>` — caller handles backend
- `onRemove(fileId): void`

**A11y**: `<input type="file" hidden>` controlled by visible "browse files" button + drag-drop event listeners on the zone. `aria-label="Upload submission files"` on the zone. Status updates announced via `aria-live="polite"`.

---

## Video Chrome Footer (new — added 2026-06-02)

Inline row below the Video Player on every Video lesson screen. Engineer should build as a `VideoChromeFooter` molecule.

**Anatomy**:
- Horizontal row, fill-width, padding 16h × 10v, border-bottom `border-secondary`
- **Left**: License text (sm-Inter regular, text-tertiary) — "© SkillUp 2026 · CC BY-SA 4.0" (license link in text-brand-secondary)
- **Right** (16px gap): CC toggle pill (active: bg-brand-section + text-brand-secondary) · Language picker "EN ▾" (sm semibold) · Download transcript link with file-download-03 icon

**Props**:
- `license: { holder: string; type: string; url: string }`
- `captionsEnabled: boolean` — controls CC pill active state
- `currentLanguage: string` — "EN", "ES", etc.
- `availableLanguages: { code: string; label: string }[]` — for dropdown
- `transcriptDownloadUrl: string`

**A11y**: CC button = `aria-pressed`. Language picker = `<select>` or `aria-haspopup="listbox"`.

---

## A · Sidebar System

### LMS / Sidebar v2 — `3155:325` — COMPONENT_SET (5 variants)
- **Variants**: State = Expanded (280×944) · Collapsed (72×821) · Mobile (320×852) · Collapsed · noLesson (72×773) · Mobile · noLesson (320×752)
- **Properties**: State (variant)
- **Anatomy**: Course Header → Overall Progress (Desktop) → Module groups (Module Header + Lesson Header + Topic Rows) → Mobile-only second Overall Progress (Mobile ring) at bottom
- **Use**: Course navigation. State chosen by viewport. Mobile drawer-style.

### LMS / Topic Row — `3336:322` — COMPONENT_SET (6 variants)
- **Variants**: Status × Topic Open (Completed/Pending/Locked × No/Yes)
- **Properties**: Status (variant), Topic Open (variant), Show bookmark (BOOLEAN default false)
- **Anatomy**: Completion Status icon · state-col (title + state-row [Topic-Types Badge · · Duration · Optional chip]) · bookmark
- **Active state** (Topic Open=Yes): brand-section bg + 4px brand left border + bookmark visible
- **Tokens**: bg-brand-section on active, text-brand-secondary on active title

### LMS / Module Header — `3151:448` — COMPONENT_SET (2 variants)
- **Variants**: State = Expanded · Collapsed
- **Properties**: State (variant), Show Topic Progress (BOOLEAN default true), Show Topic Progress2 (BOOLEAN default true), Is completed (BOOLEAN default false)
- **Anatomy**: Module Info row (optional completed check + MODULE 01 · 3/3) → Name text → Expand caret
- **Is completed=true**: shows green check at start of eyebrow. For full green eyebrow text, override eyebrow text fills to `--lms-text-success-primary` per instance.

### LMS / Lesson Header — `3150:437` — COMPONENT (single)
- **Anatomy**: Single TEXT node with eyebrow style (Text 2xs/Medium UPPER 10/14, letter-spacing 4%)
- **Use**: Lesson label between Module Header and its Topic Rows.

### LMS / Topic-Types Badge — `2678:3470` — COMPONENT_SET (13 variants)
- **Variants**: Type = Video · Reading · Quiz · Lab · VILT-Live Session · VILT-Recording · Activity · Project · Practice Assignment · Graded Assignment · Peer-graded · Peer Review · Discussion Prompt
- **Use**: Identifies topic type. Nested inside Topic Header, Topic Row, Course Card up-next slot.

### LMS / Completion Status — `2678:3486` — COMPONENT_SET (4+ variants)
- **Variants**: State = Pending · In Progress · Done · Locked
- **Anatomy**: 20×20 circle with icon by state (empty / partial / check / lock)

### LMS / Course Header (Sidebar) — `2920:327` — COMPONENT
- **Anatomy**: Course label eyebrow + Course title (Text lg/Medium 18/24) + sidebar toggle
- **Use**: Top of every Sidebar v2 variant.

### LMS / Overall Progress — `3253:41791` — COMPONENT_SET (2 variants)
- **Variants**: Device = Desktop · Mobile
- **Desktop**: 280×46 bar + percentage + "Module X of Y"
- **Mobile**: 46×46 compact ring with center %

### LMS / Section Header — `2991:466` — COMPONENT
- **Use**: Sub-section label inside modules. Often `Section 1 · Define and measure` or similar.

### LMS / Module Time-Left — `2982:439` — COMPONENT
- **Use**: Granular time breakdown chip (Y h X min remaining + per-topic-type counts)

### LMS / Live Attendance — `2683:2950` — COMPONENT
- **Use**: Live session attendance indicator (X of Y participants live + recording status)

### bookmark — `3079:19962` — COMPONENT_SET (2 variants)
- **Variants**: Bookmarked = No · Yes

### sidebar-expand-collapse-toggle — `2390:5050` — COMPONENT_SET (2 variants)
- **Variants**: Property 1 = Expanded · Collapsed

---

## B · Topbar

### LMS / Course Player Topbar — `2686:2983` — COMPONENT_SET (Theme × Size)
- **Variants**: Theme = Light · Dark × Size = Desktop · Tablet · Mobile
- **Anatomy**: Logo + Breadcrumb (Desktop only) + spacer + topbar utility buttons (AI · Bookmark · Notifications · Theme · Avatar · Close)
- **Properties**: Various Show/Hide booleans for utility buttons

---

## C · Topic Footer + Progression

### LMS / Topic Footer Nav — `2686:2988` — COMPONENT
- **Anatomy**: First Button (Previous, Secondary md) · Info Container (Unit Info "X of Y" + Title text) · Second Button (Course Progression Button instance)
- **Width**: 1112 × 64
- **Rule**: Previous always present + always navigable. Next is always present (may be disabled). Center can have Title text. No swap CTA chip.

### LMS / Course Progression Button — `2678:3517` — COMPONENT_SET (4 variants)
- **Variants**: Milestone = Topic · Reading Complete · Module · Course
- **Use**: The "Next topic" button at right of Footer Nav. Label changes per milestone.

---

## D · Live / VILT

### LMS / Live Now Banner — `2683:3013` — COMPONENT_SET
- **Use**: Banner that surfaces "Live session starting" CTA across the LMS chrome.

### LMS / Live Control Bar States — `3515:11154` — COMPONENT_SET (2 variants)
- **Variants**: Property 1 = Live On Control Bar · Join Live Control Bar
- **Use**: Control bar at bottom of VILT Live on screen (Mute/Camera/Raise hand/Chat/Leave) OR the Join Live state's CTA bar.

---

## E · Content & Notes

### LMS / Topic Header — `3367:449` — COMPONENT (single)
- **Properties**: Show Description (BOOLEAN default true), Show Duration (BOOLEAN default true)
- **Anatomy**: meta-row (Topic-Types Badge · · Duration) + Title (Display xs/Semibold) + Description (Text md/Medium)
- **Topic type swap**: override the nested Topic-Types Badge variant per instance.
- **Duration "approx." rule**: prefix with "approx. " for estimated time topics (Reading/Lab/Activity/Project/Practice/Graded/Peer-graded/Peer Review). Skip for Video/Recording/Live/timed Quiz.

### LMS / Transcript Line — `2678:3528` — COMPONENT_SET (2 variants)
- **Variants**: State = Default · Active
- **Properties**: State (variant), Show duration (BOOLEAN default false), Has note (BOOLEAN default false)
- **Anatomy**: note-indicator dot (bound to Has note) + timestamp + line text + duration (optional) + "+ Note" pill (Active only) + "✎ Edit" pill (Active + Has note=true)
- **Limitation**: When Has note=true on an Active instance, override "+ Note" visible=false manually (Figma can't bind to NOT(boolean)).

### LMS / Note Item — `2812:3648` — COMPONENT (single)
- **Anatomy**:
  - Default row: Timestamp + Edit Status + actions (edit/delete)
  - Anchor line: italic Inter sm, 3px left brand border, transcript-line text in quote
  - Note Content: Text sm/Regular
  - Tags row: chips with #tag-style labels (Text xs/Medium, bg-secondary)
- **Use**: One per persisted note. Anchored to a transcript line.

### LMS / File Item — `2812:3694` — COMPONENT_SET (variants by Type)
- **Variants**: Type = PDF · DOCX · XLSX · etc.
- **Use**: Downloadable file row with icon + name + size + download button.

### LMS / Thread Item — `2812:3699` — COMPONENT
- **Use**: Discussion thread item with avatar + content + replies count.

### LMS / Content Feedback — `2991:471` — COMPONENT
- **Anatomy**: thumbs-up (Like) + thumbs-up-flipped (Dislike) + alert-triangle (Report)
- **Use**: Inline feedback CTAs at the bottom of content blocks.

### Vertical Scroll — `3192:33393` — COMPONENT
- **Use**: Custom scrollbar visualisation.

---

## F · Assessments

### LMS / Quiz Card — `2812:3643` — COMPONENT_SET
- **Variants**: Multiple quiz states (Question / Revealed / Results / Not Passed).
- **Use**: Quiz question with options + state-specific feedback.

### LMS / Discussion Prompt — `2987:447` — COMPONENT
- **Use**: Discussion prompt with text input + submit.

---

## G · Course End

### LMS / Course Complete Modal — `2686:3010` — COMPONENT
- **Use**: Modal celebrating course completion. Triggers from Course Finished screen.

### LMS / Course Certificate — `2686:3046` — COMPONENT
- **Use**: Certificate of completion preview.
- **Footer buttons**: Back to course page (Secondary) · Share (Secondary, opens menu) · Download PDF (Primary) · Print (Secondary).
- **Share button** opens dropdown menu with: Facebook · LinkedIn · Twitter · Copy link.
- **Print button** triggers `window.print()` with print-friendly CSS scoped to the certificate.

---

## H · Discovery & My Learning

### LMS / Course Card — `3288:349` — COMPONENT (single)
- **Width**: 1312 × 132
- **Anatomy**: thumb (100×100 with initials) + left (Course Type Badge + Title + Provider Badge + course-attrs [Difficulty + Delivery Mode] + meta [progress % + estimation]) + next-topic block (UP NEXT + topic + CTA button) + overflow (···)
- **Use**: My Learning Dashboard rows. One per enrolled course.

### LMS / Course Row — `2683:2901` — COMPONENT_SET
- **Use**: Compact course row variant (within Program detail / lists).

### LMS / Course Type Badge — `3268:9417` — COMPONENT_SET (Program / Course)

### LMS / Difficulty Badge — `3268:9442` — COMPONENT_SET (Beginner / Intermediate / Advanced)

### LMS / Delivery Mode Badge — `3268:9466` — COMPONENT_SET (Flexible Learning / Flexible + Live / Cohort)

### LMS / Provider Badge — `3269:346` — COMPONENT_SET (SkillUp / Microsoft / IBM / Google Cloud / Stanford / etc.)

### LMS / Card Overflow Menu — `2988:440` — COMPONENT
- **Use**: ··· menu on Course Card (Rate / Share / Unenroll).

### LMS / Empty State — `2851:3767` — COMPONENT_SET (4 variants)
- **Variants**: Kind = Notes · Downloads · Discussion · **Transcript** (added 2026-06-15)
- **Properties**: Kind (variant), Title (TEXT), Body (TEXT), CTA Label (TEXT), Show CTA (BOOLEAN)
- **Per-kind defaults**:
  - **Notes** — "No notes yet" · "Open the Transcript tab to add a note on any line." · CTA: "Go to Transcript"
  - **Downloads** — "No downloads yet" · "Resources attached to this topic will appear here." · CTA hidden
  - **Discussion** — "No discussion yet" · "Be the first to share your thoughts on this topic." · CTA: "Post a comment"
  - **Transcript** (new) — "Transcript not available" · "Captions aren't available for this video. You can still take notes from the Notes tab." · CTA: "Add note"
- **Anatomy**: Icon (48×48 brand-section circle) · Title (md/Semibold) · Body (sm/regular text-tertiary) · CTA (Tertiary button)
- **Tokens**: bg-brand-section on icon circle, text-tertiary on body

### LMS / Daily Goals — `2991:462` — COMPONENT (decide later — exploratory)

### LMS / Sync to Video Button — `20214:1771167` — COMPONENT_SET (2 variants) — added 2026-07-03
- **Variants**: Direction = Up · Down
- **Base**: `Buttons/Button` (Size=sm, Hierarchy=Primary, Icon trailing enabled, Label="Sync to Video")
- **Trailing icon by variant**:
  - Direction=Up → `chevron-up` (active line above viewport — jump up)
  - Direction=Down → `chevron-down` (active line below viewport — jump down)
- **Use**: Auto-scroll re-engagement in the Transcript panel. Appears when learner has manually scrolled the transcript away from the active line (threshold ≥40px). Applies whether the video is docked (sticky) or full-height. Direction dynamic per active-line position.
- **Behavior** (see `phase1-readiness.md` § 0 for full spec):
  - Hidden by default
  - Appears on scroll ≥40px from active line
  - Click → scrolls transcript to active line + re-enables auto-follow + disappears
  - Auto-dismiss when next active-line change lands within visible range
- **A11y**: focusable via keyboard, `aria-label="Sync transcript to current video position"`
- **Position in layout**: centered horizontally in a dedicated row between the video player (or docked player) and the transcript rows.

### LMS / Mobile Tab Select — `19995:7247` — COMPONENT_SET (2 variants) — added 2026-06-16
- **Variants**: State = Default (closed) · Open (dropdown panel below)
- **Properties**: Active label (TEXT, default "Transcript") · Count (TEXT, default "2") · Show count (BOOLEAN, default true)
- **Use**: Mobile-only (viewport ≤480px) replacement for the horizontal Transcript / Notes / Downloads tab strip. Renders as a Select-styled pill with the active tab name + count badge + chevron. Tap to open the dropdown showing all 3 options.
- **Anatomy (Default)**: Input frame 320×42, border-brand 1px, radius 8, white bg. Padding 14h/10v. Content row: Active label (Montserrat SemiBold 14px, text-brand-secondary) + Count badge (bg-brand-section pill, text-brand-secondary 12px Medium). Chevron-down icon trailing.
- **Anatomy (Open)**: Same input row with chevron rotated 180° + 1px divider + dropdown panel below. Panel: white bg, border-brand, radius 8, 6px padding. 3 menu items (Transcript / Notes / Downloads). Active item: bg-brand-section + SemiBold label. Others: regular Medium weight.
- **Tokens**: bg-brand-section, text-brand-secondary, text-brand-primary, border-brand
- **A11y**: Tap target ≥44×44 per BR-38 and EC-17. Role=combobox + aria-expanded on the input. Panel items role=option. Esc closes. Selecting an option closes the panel + switches active tab + scrolls to top.

---

## I · System Feedback

### LMS / Inline Alert — `2851:3794` — COMPONENT_SET
- **Use**: Inline notifications (info / success / warning / error).

---

## J · AI Assistant

### LMS / AI Panel — `2695:1691` — COMPONENT_SET
- **Variants**: Mode = Key Takeaways · Ask · Chat · Related
- **Use**: Right-side AI panel inside Course Player.

---

## L · Overlay Panels (Notifications + Saved)

Built as full screens in Figma for visual reference, NOT yet promoted to component sets. Engineer should implement as proper components per `overlay-panels-spec.md`.

### UUI · V7 / Panel · Notifications — `3545:69932` — FRAME (visual reference)
- **Width**: 480 desktop · full-screen mobile
- **Anatomy**: Backdrop (`text-primary` @ 60% opacity) + Panel (right-aligned) with Header (title + Mark all read + Close X) + **Hybrid tabs** (All · Discussions · Grading · Updates) + Date section labels (Today / Yesterday / Earlier this week) inside each tab + Notification items + Footer link
- **Notification types**: 5 covered in mock — Live now (red dot) · Reply (message-circle-01) · Due (calendar) · Course update (plus) · Peer rating (stars-01)
- **Hybrid grouping**: tabs filter by activity category. Inside each tab, items are grouped by date. Active tab uses 2px brand underline.

### UUI · V7 / Panel · Saved — `3545:69992` — FRAME (visual reference)
- **Width**: 480 desktop · full-screen mobile
- **Anatomy**: Backdrop + Panel with Header (Saved + Close X) + Filter chips (All/Topics/Notes) + Bookmarked Topics section + Saved Notes section + Footer link
- **Bookmarked Topic item** uses topic-type icon (book-open-01 / video-recorder / award-01 / etc.) in `bg-brand-section` wrap.
- **Saved Note item** uses anchor-quote pattern (3px left border `border-brand` + italic Inter)

### Components to build in code (`organisms/` + `molecules/`)

| Component | Purpose |
|---|---|
| `OverlayPanel` (organism) | Shared chrome: backdrop + right slide-in + header + scroll body + footer. Used by both panels. |
| `NotificationsPanel` (organism) | OverlayPanel + grouped notification list |
| `SavedPanel` (organism) | OverlayPanel + filter chips + topic items + note items |
| `NotificationItem` (molecule) | Single notification row with type icon + content + timestamp + unread dot |
| `SavedTopicItem` (molecule) | Bookmarked topic row with topic-type icon + meta + path + saved date |
| `SavedNoteItem` (molecule) | Saved note with anchor quote + note text + tags + topic path |
| `FilterChip` (atom) | Pill with label + count, active/inactive states |

See `overlay-panels-spec.md` for full props interfaces + behavior + a11y.

---

## Key/canonical bindings reference

For ALL components above:

- Backgrounds → `var(--lms-bg-*)`
- Borders → `var(--lms-border-*)`
- Icon strokes → `var(--lms-fg-*)`
- Text fills → `var(--lms-text-*)`
- Never hardcode hex.

See `tokens/colors.css` for the complete list of color variables.
See `tokens/typography.css` for the text style ramp.
