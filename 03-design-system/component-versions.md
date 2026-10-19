# Component versions

The version of every design system component the ICP and LMS screens use, the rule for changing it, and the names
the LMS components carry since 8 Oct 2026.
Started on 8 Oct 2026. Library: *❖ SKO Design System (V3)* (`c7EUDrQwP8si08aPipDSIV`).

## Why

Figma has no version per component, only a history of the whole file. Engineering builds one Storybook story per
component, so it needs to know, per component, whether what it built is still current and what changed since.

## The convention

A version is two numbers, `MAJOR.MINOR`, written `v1.2`.

| The change | Bump | Examples |
|---|---|---|
| **Breaks what was built from the previous version.** A property or a variant is removed or renamed, a property changes type, the structure changes so that the code has to be rewritten, a behaviour changes. | **MAJOR** (`1.3` → `2.0`) | `Program-Card` loses `Week`, `Lessons` and `Show cohort`. |
| **Adds to it or changes how it looks, and the previous code still works.** A new variant, a new property with a default that keeps the old look, a new state, another token, text style, size, spacing or radius. | **MINOR** (`1.3` → `1.4`) | `Course Card` gains `Show image`; `Course Type Badge` labels go to `body-small/Semibold` and the badge to 18 high. |
| **Changes nothing a developer builds.** Description, documentation link, layer names, position on the page, a fix that makes the component match what its version already said. | none | The 82 documentation links added on 8 Oct. |

Rules:

1. **A version changes only when the library is published.** Work in progress in the DS file has no version; the
   number moves on the publish that ships it. Several changes in one publish are one bump, the highest that applies.
2. **Who bumps:** whoever changes the component, in the same piece of work as the `CHANGELOG.md` entry. No bump
   without an entry, and the entry names the component and its new version (`LMS / Course Card v1.1`).
3. **This file is the register.** The row is updated (version, date, what changed) and one line is added to
   *History* below. The ICP Hub shows the same numbers.
4. **A new component starts at `1.0`** on the publish that first ships it. Until then it is not in the register.
5. **A removed component** keeps its last row, marked *removed* with the date, for one release of the register.
6. **Private bases** (`_Button base` and the like) and icons have no version of their own: a change there bumps
   the components that show it.
7. **No component name carries a version** (Nelson, 12 Oct 2026). `Button`, `Link Button`, `Icon Button` and
   `Badge` are the current components; the version is in the first line of the Figma description and in this
   register, never in a name, a Storybook title or a message.
8. **Every component is at `1.x` until engineering has built it** (Nelson, 13 Oct 2026). Design and engineering
   start the design system and Storybook now, so nothing starts at 2. The nine components that carried a `2.x`
   were renumbered on 13 Oct (table in *History*). A MAJOR bump is first used on a component that has a story
   built from it; until then a breaking change is a MINOR bump with the break named in the changelog.

**For engineering:** a MINOR bump means "check the story against Figma"; a MAJOR bump means "the story's
properties or structure have to change". A story records the version it was built from.

## The baseline

On 8 Oct 2026 every component got a starting version, because no versions had been kept until then:

- `1.0` for every component, as published that day.
- `1.0` as well for `Badge` and the `Button` family (they carried `2.0` until the renumbering of 13 Oct 2026).

What happened to a component before the baseline is in `LMS-HANDOFF/CHANGELOG.md`; the column *Last named in
changelog* points to the latest entry that names it. It is a pointer, not part of the version.

**In Figma since 8 Oct 2026:** the first line of each component's description reads
`Version v1.0 · since 8 Oct 2026` (139 components; not `Select`, which was not found by that name on the Inputs
page, and not `Daily Goals`). When a version moves, that line moves with it.

## Names and groups (8 Oct 2026)

The LMS components follow the naming decided in September: `LMS/ICP/<Group>/<Component>` for the course player and
`LMS/Platform/<Group>/<Component>` for the pages around it, words joined by a hyphen. A rename is not a version
bump: keys and instances are unchanged.

- **ICP groups:** Player · Sidebar · Content · Topics · Assessment · Live · AI. The family word stays in the name
  where a group mixes families (`Topics/Lab-Launch-Card`, `Topics/ORA-Stepper`, `Live/VILT-Session-Card`); in
  Assessment the quiz components drop it (`Assessment/Question-Card`).
- **Moved to Platform by ownership:** the Discovery components (course card and row, the four badges, the card
  menu) and the two course-end components (`Completion/Certificate`, `Completion/Course-Complete-Modal`). They now
  sit on the page `❖ LMS PLATFORM COMPONENTS`.
- **Not renamed yet:** `Inline Alert`, `Empty State`, `Progress Circle` and `Autosave Status` wait for their
  promotion to Foundations; `Footnote` is a handoff atom, not product UI; `Discussion Prompt` is a retired topic
  type.
- **Status *In review*:** on the page `❖ LMS · IN REVIEW / NOT FOR BUILD`. `AI-Panel` is work in progress (it is
  on the player screens, hidden). `Certificate-Document-demo` is a sample document placed on the certificate
  screens. The other four (`Daily Goals`, `Live Attendance`, `Module Time-Left`, `Streak-Card`) are on no screen
  and wait for a keep-or-remove decision. Engineering does not build these.

The old names, for anything written before 8 Oct, are in *Rename map* at the end.

## Register

### LMS · ICP, the course player (`LMS/ICP/…`): 73

**Player**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Course-Progression-Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537755) | v1.0 | 2026-10-08 | Published | 7 | 2026-10-08 · Renamed from “LMS / Course Progression Button” |
| [Topbar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537695) | v1.4 | 2026-10-19 | Published | 6 | 2026-10-19 · Learner avatar a rounded square (Radius/fixed-md), not a circle, on all six variants |
| [Topic-Footer-Nav](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20053-3286) | v1.1 | 2026-10-13 | Published | 1 | 2026-10-13 · `Show Badge` and its status badge removed: the footer has no completion control |
| [Vertical-Scroll](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537649) | v1.0 | 2026-10-08 | Published |  | 2026-10-08 · Renamed from “Vertical Scroll” |

**Sidebar**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Bookmark](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536827) | v1.0 | 2026-10-08 | Published |  | 2026-10-08 · Renamed from “bookmark” |
| [Collapse-Toggle](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536832) | v1.0 | 2026-10-08 | Published |  | 2026-10-08 · Renamed from “sidebar-expand-collapse-toggle” |
| [Completion-Status](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536791) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / Completion Status” |
| [Course-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536868) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Sidebar / Course Header” |
| [Lesson-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536863) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Lesson Header” |
| [Module-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536844) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / Module Header” |
| [Module-Info](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21299-7173) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / Module Info” |
| [Overall-Progress](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536988) | v1.1 | 2026-10-14 | Published | 3 | 2026-10-14 · `Device=Mobile` uses an instance of `LMS / Progress Circle`, as Desktop does |
| [Section-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536865) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Section Header” |
| [Sidebar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536883) | v1.1 | 2026-10-13 | Published | 5 | 2026-10-13 · The collapsed variants show the rail bookmark on the saved topic; the description names the flyout |
| [Topic-Flyout](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22479-1867) | v1.0 | 2026-10-13 | Published | 1 | 2026-10-13 · The card beside the collapsed rail: title, topic type, bookmark button |
| [Topic-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537000) | v1.3 | 2026-10-16 | Published | 9 | 2026-10-16 · New boolean Optional bound to the Optional-Chip (v1.2: The duration is an instance of `LMS / Duration` (Time + Approx)) |

**Content**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Author-and-Updated-Date](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20454-705641) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Topic · Author & Updated Date” |
| [Content-Feedback](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537661) | v1.1 | 2026-10-13 | Published | 1 | 2026-10-13 · New `Show Mark as Complete` (off by default): the Mark as Complete action at the right end of the row |
| [File-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537612) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-08 · Renamed from “LMS / File Item” |
| [Mobile-Tab-Select](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19995-7247) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / Mobile Tab Select” |
| [Note-Editor](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22071-6813) | v1.2 | 2026-10-16 | Published | 3 | 2026-10-16 · Audit fix: fills bound to bg/page (was raw white in dark) (v1.1: The anchor quote is an instance of `Transcript-Line` (State=Active); the Quote property removed) |
| [Note-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537594) | v1.1 | 2026-10-14 | Published | 1 | 2026-10-14 · The anchor is an instance of `Transcript-Line` (State=Active), as in the Note-Editor |
| [Numbered-Step](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3297) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Numbered Step” |
| [Sync-to-Video-Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20214-1771167) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / Sync to Video Button” |
| [Thread-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537651) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Thread Item” |
| [Topic-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537676) | v1.1 | 2026-10-14 | Published | 1 | 2026-10-14 · The duration is an instance of `LMS / Duration` (Time + Approx) |
| [Topic-Status-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20066-431924) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “Topic-Status-Badge” |
| [Topic-Types-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536800) | v1.0 | 2026-10-08 | Published | 14 | 2026-10-08 · Renamed from “LMS / Topic-Types Badge” |
| [Transcript-Line](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537556) | v1.1 | 2026-10-15 | Published | 4 | 2026-10-15 · Side padding on `Container/content-padding` (24 / 20 / 16); as a quote in Note-Item / Note-Editor it keeps `Spacing/xl` by override |

**Topics**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Activity-Fullscreen-Bar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22847-1893) | v1.0 | 2026-10-19 | Published | 2 | 2026-10-19 · New: the topic name and Exit fullscreen over a SCORM package, Desktop and Mobile |
| [Activity-Launch-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22847-1981) | v1.0 | 2026-10-19 | Published | 3 | 2026-10-19 · New: launch card for a package that opens in a new window (Ready · Opened · Blocked), from Lab-Launch-Card without the provider |
| [Activity-Player](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22847-1852) | v1.0 | 2026-10-19 | Published | 1 | 2026-10-19 · New: the frame a SCORM package plays in (Fullscreen toolbar + Package slot) |
| [Activity-SCORM-Frame](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3488) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-08 · Renamed from “LMS / Activity · SCORM Frame” |
| [Lab-File-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3330) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / Lab · File Row” |
| [Lab-Launch-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22251-6427) | v1.1 | 2026-10-12 | Published | 3 | 2026-10-12 · `Completed` removed; `Opened` shows the date of the first opening; *Skip* removed from `Unavailable`; no score wording |
| [Lab-Prerequisites](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3331) | v1.0 | 2026-10-12 | Deleted | 1 | 2026-10-12 · Deleted from the library: the DS `Alert` replaced it on the 36 screens that used it |
| [Lesson-Block](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3682) | v1.1 | 2026-10-14 | Published | 12 | 2026-10-14 · `Kind=HTML (Blockquote)` is a typographic pull quote: no box, no 4px stripe; lucide Quote icon in `icon/primary` |
| [ORA-Grade-Panel](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3634) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-08 · Renamed from “LMS / ORA · Grade Panel” |
| [ORA-Rubric-Criterion](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3563) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / ORA · Rubric Criterion” |
| [ORA-Stepper](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3534) | v1.0 | 2026-10-08 | Published | 10 | 2026-10-08 · Renamed from “LMS / ORA · Stepper” |
| [ORA-Submit-Gate](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20344-3359) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / ORA · Submit Gate” |
| [ORA-Text-Response](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21692-536524) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / ORA · Text Response” |
| [ORA-Upload](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3584) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / ORA · Upload” |
| [ORA-Waiting-Panel](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3591) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-08 · Renamed from “LMS / ORA · Waiting Panel” |
| [Podcast-Chapter-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3449) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / Podcast · Chapter Row” |
| [Podcast-Player](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3337) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Podcast · Player” |
| [Zooming-Image](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21013-7264) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / Zooming Image” |

**Assessment**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Answer-Input](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20494-8896) | v1.0 | 2026-10-08 | Published | 12 | 2026-10-08 · Renamed from “LMS / Quiz · Answer Input” |
| [Drag-and-Drop-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20996-8876) | v1.0 | 2026-10-08 | Published | 6 | 2026-10-08 · Renamed from “LMS / Drag and Drop · Card” |
| [Drag-and-Drop-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20995-8506) | v1.0 | 2026-10-08 | Published | 6 | 2026-10-08 · Renamed from “LMS / Drag and Drop · Item” |
| [Drag-and-Drop-Zone](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20996-8526) | v1.0 | 2026-10-08 | Published | 5 | 2026-10-08 · Renamed from “LMS / Drag and Drop · Zone” |
| [Entry-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20318-705389) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-08 · Renamed from “LMS / Quiz · Entry Header” |
| [Exam-Timer](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20488-4773) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / Quiz · Exam Timer” |
| [Footer-Actions](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20647-352944) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Quiz · Footer Actions” |
| [Gate](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20490-4813) | v1.0 | 2026-10-08 | Published | 5 | 2026-10-08 · Renamed from “LMS / Quiz · Gate” |
| [Grade-Summary](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20416-3129) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Quiz · Grade Summary” |
| [Option-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20318-705157) | v1.0 | 2026-10-08 | Published | 7 | 2026-10-08 · Renamed from “LMS / Quiz · Option Row” |
| [Question-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20318-705306) | v1.0 | 2026-10-08 | Published | 9 | 2026-10-08 · Renamed from “LMS / Quiz · Question Card” |
| [Results](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20499-6630) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-08 · Renamed from “LMS / Quiz · Results” |
| [Stat-Tile](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20388-706341) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / Quiz · Stat Tile” |
| [Stepper-Bar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20540-6253) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / Quiz · Stepper Bar” |

**Live**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Live-Control-Bar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537795) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / Live Control Bar States” |
| [Live-Now-Banner](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537772) | v1.1 | 2026-10-14 | Published | 2 | 2026-10-14 · No side stripe: the whole card carries the state (Live `bg/success-soft`, Upcoming `bg/warning-muted`, new token); badges per ADR 012 |
| [VILT-Session-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705637) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / VILT · Session Card” |
| [VILT-Session-Meta](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705512) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / VILT · Session Meta” |
| [VILT-Stage-Stepper](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705552) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / VILT · Stage Stepper” |
| [VILT-Stage-Surface](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705648) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / VILT · Stage Surface” |

**AI**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [AI-Panel](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538166) | v1.0 | 2026-10-08 | In review | 4 | 2026-10-13 · Its 165 hidden instances were removed from the ICP screens: it is on no screen. Renamed from “LMS / AI Panel” on 2026-10-08. |

**Not renamed yet**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [LMS / Autosave Status](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538137) | v1.0 | 2026-10-08 | Published | 4 | 2026-09-08 · Alert recoloured in the library, and a collection called "Remove" |
| [LMS / Daily Goals (decide later)](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538034) | v1.0 | 2026-10-08 | In review | 1 | 2026-10-08 · Moved to the “In review / not for build” page |
| [LMS / Discussion Prompt](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537927) | v1.1 | 2026-10-14 | Published | 1 | 2026-10-14 · The duration is an instance of `LMS / Duration` (Time + Approx) |
| [LMS / Empty State](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537992) | v1.0 | 2026-10-08 | Published | 4 | — |
| [LMS / Footnote](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21606-1205) | v1.0 | 2026-10-08 | Published | 1 | 2026-09-30 · Weekly goal card — component handoff, ready for dev |
| [LMS / Inline Alert](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3296) | v1.2 | 2026-10-17 | Published | 12 | 2026-10-17 · New property Surface: Page (bg/faint) and Subtle (on a grey surface, the alert on bg/page) |
| [LMS / Live Attendance](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536879) | v1.0 | 2026-10-08 | In review | 1 | 2026-10-08 · Moved to the “In review / not for build” page |
| [LMS / Module Time-Left](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536873) | v1.0 | 2026-10-08 | In review | 1 | 2026-10-08 · Moved to the “In review / not for build” page |
| [LMS / Profile Menu](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22783-184) | v1.5 | 2026-10-19 | Published | 1 | 2026-10-19 · New order: Appearance, Accessibility standards, Profile (Edit profile, Certificates), SkillUp Online, demo footer; groups padded 12/16 (prototype PR 204) |
| [Progress circle](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20377-3832) | v1.1 | 2026-10-14 | Published | 3 | 2026-10-14 · Renamed from `LMS / Progress Circle` and moved to the Base page *Progress indicators*; the only progress circle (the Untitled UI kit one archived) |

### LMS · Platform (`LMS/Platform/…`): 53

**Assistant** (on the page `❖ LMS · IN REVIEW / NOT FOR BUILD`, frame *Assistant · floating chat · WIP*)

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Assistant-Chat](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22493-391) | v1.2 | 2026-10-15 | In review | 6 | 2026-10-15 · Header on bg/subtle, ME / ASSISTANT above each message, answers on bg/primary, AI notice under the input (1.1, 13 Oct: two states added for first steps (`First steps`, `First steps done`); `Empty` starts with the next step). In the library so the ICP feature preview page can use it; not for build yet. |
| [Assistant-Launcher](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22493-224) | v1.3 | 2026-10-16 | Published | 3 | 2026-10-16 · Count on bg/primary (audit D1) (v1.2: The ball wears a 2px gradient ring (to animate in code); count badge on bg/info (1.1, 13 Oct: 48 px; closed is the assistant mark; `Closed with count` added, first steps left). In the library so the ICP feature preview page can use it; not for build yet.) |

**Navigation**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Topbar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22702) | v1.6 | 2026-10-19 | Published | 2 | 2026-10-19 · Learner avatar a rounded square (Radius/fixed-md), not a circle, Desktop and Compact |
| [Topbar-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22694) | v1.1 | 2026-10-12 | Published | 2 | 2026-10-12 · Rebuilt as an underline tab; `State` Default/Current became `Current` Off/On; 3px bar; count badge exposed |

**Dashboard**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Due-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22752) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · After the publish: the Program headers are in; the Course Card is still not |
| [Jump-Tile](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22769) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · DS: defaults on what Open edX serves; an image option on the Course Card |
| [Resume-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22800) | v1.2 | 2026-10-14 | Published | 1 | 2026-10-14 · The duration is an instance of `LMS / Duration` (Time + Approx) |
| [Section-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22747) | v1.1 | 2026-10-13 | Published | 1 | 2026-10-13 · The action is the DS `Link Button` (Brand, Secondary) with its underline; the rule under the header was tried and withdrawn the same day |
| [Stat](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22736) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · DS: defaults on what Open edX serves; an image option on the Course Card |
| [Streak-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22783) | v1.0 | 2026-10-08 | In review | 1 | 2026-10-08 · Moved to the “In review / not for build” page |
| [Today-at-a-glance](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22184-626082) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · After the publish: the Program headers are in; the Course Card is still not |

**My-Learning**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Browse-Tile](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22901) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Course-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20888-6124) | v1.15 | 2026-10-19 | Published | 6 | 2026-10-19 · List min height 146 (the height with a two-line title), so list cards keep one height |
| [Program-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22808) | v1.12 | 2026-10-17 | Published | 6 | 2026-10-17 · Due badge Soft · sm · Warning (was the accent yellow), as the Dashboard Due-Item (v1.11: audit fix, "Certificate issued" text/default on green; "Up next" label styled again) |

**Discovery**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Card-Overflow-Menu](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538064) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Card Overflow Menu” |
| [Course-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538010) | v1.2 | 2026-10-14 | Published | 3 | 2026-10-14 · The duration is an instance of `LMS / Duration` (Time + Approx) |
| [Course-Type-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538072) | v1.1 | 2026-10-15 | Published | 2 | 2026-10-15 · Words only: the icons are removed (1.0, 8 Oct: renamed from “LMS / Course Type Badge”) |
| [Delivery-Mode-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538084) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / Delivery Mode Badge” |
| [Difficulty-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538077) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / Difficulty Badge” |
| [Difficulty-Level-Icon](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21868-5367) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / Difficulty · Level Icon” |
| [Provider-Partner-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538091) | v1.2 | 2026-10-16 | Published | 24 | 2026-10-16 · Logo chip padding Spacing/sm (28 tall); FutureSkills Dark through image filters (Nelson) |

**Program-Detail**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Course-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22906) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-08 · Screens: the 28 compact course rows on the DS row; the local component is gone |

**Course-Detail**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Card-Shell](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21885) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Completion-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22448) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Course-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21765) | v1.1 | 2026-10-17 | Published | 6 | 2026-10-17 · Partner chips are Provider-Partner-Badge Logo (Light on Kind=Course, Dark on Kind=Program), exposed, boolean Second partner; Progress card button fills again |
| [Course-Stats](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21860) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Course-Title](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21848) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Date-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22486) | v1.0 | 2026-10-08 | Published | 8 | 2026-10-07 · Platform screens: badge texts restored where the update has landed; one badge removed |
| [Grade-Meter](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22454) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Grade-Summary-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22461) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-06 · Local components → the DS |
| [Lock](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21959) | v1.0 | 2026-10-08 | Published | 2 | 2026-09-24 · The Lock molecule on the locked topic |
| [Message](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22640) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-08 · After another publish: badges read *Label* again in the product file |
| [Meta](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21877) | v1.0 | 2026-10-08 | Published | 1 | 2026-09-24 · Course Detail mobile — the Course tab |
| [Module-Number](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21952) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-06 · Platform components moved into the DS library |
| [Module-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21966) | v1.0 | 2026-10-08 | Published | 6 | 2026-10-06 · Platform components moved into the DS library |
| [Progress-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21894) | v1.1 | 2026-10-16 | Published | 4 | 2026-10-16 · State=Complete: check icon + "Completed" beside the green bar, as on the cards |
| [Score-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22477) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-06 · Local components → the DS |
| [Section-Intro](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21891) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Sidebar-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22090) | v1.0 | 2026-10-08 | Published | 6 | 2026-10-07 · Platform screens: badge texts restored where the update has landed; one badge removed |
| [Thread-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22608) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-07 · Platform screens: badge texts restored where the update has landed; one badge removed |
| [Topic-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22049) | v1.0 | 2026-10-08 | Published | 6 | 2026-10-06 · Handoff audit, third pass (after the DS publish) |
| [Week-Day](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22342) | v1.0 | 2026-10-08 | Published | 5 | 2026-10-06 · Platform components moved into the DS library |
| [Weekly-Goal-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22174) | v1.0 | 2026-10-08 | Published | 8 | 2026-10-06 · Platform components moved into the DS library |

**Completion**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Certificate](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537956) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Course Certificate” |
| [Certificate-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22360) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-06 · Platform components moved into the DS library |
| [Certificate-Document](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22261-2968) | v1.1 | 2026-10-19 | Published | 3 | 2026-10-19 · Out of In review onto ↳ Completion (it is on the Certificates screens); renamed from Certificate-Document-demo; boolean *Second partner* (IBM + Microsoft) |
| [Course-Complete-Modal](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537944) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Course Complete Modal” |

**Calendar**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Event-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22832-606) | v1.0 | 2026-10-19 | Published | 6 | 2026-10-19 · New: one date on the Calendar Agenda (Kind × Layout) |
| [Month-Day](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22832-680) | v1.0 | 2026-10-19 | Published | 3 | 2026-10-19 · New: one day of the Month view |
| [Month-Event](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22832-649) | v1.0 | 2026-10-19 | Published | 9 | 2026-10-19 · New: one date inside a Month-Day cell |
| [Week-Day](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22832-621) | v1.0 | 2026-10-19 | Published | 2 | 2026-10-19 · New: one day of the Next 7 days strip |

**Discussion**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Inbox-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22832-1052) | v1.0 | 2026-10-19 | Published | 3 | 2026-10-19 · New: one conversation in the all-courses inbox |

**Services**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Service-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22832-1053) | v1.0 | 2026-10-19 | Published | 1 | 2026-10-19 · New: one service on the Services page |

### Base components: 25

A link marked *(page)* goes to the component's page in the library.

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Alert](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1130-81134) | v1.0 | 2026-10-08 | Published |  | 2026-09-23 · Course Detail: known inconsistencies fixed |
| [Avatar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19-1012) | v1.0 | 2026-10-08 | Published |  | 2026-10-01 · Top bar light; badges on every breakpoint; mobile Q&A conversation as one card |
| [Avatar label group](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=82-2793) | v1.0 | 2026-10-08 | Published |  | — |
| [Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21889-541076) | v1.1 | 2026-10-12 | Published |  | 2026-10-08 · DS: defaults on what Open edX serves; an image option on the Course Card |
| [Breadcrumbs](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1122-153) | v1.0 | 2026-10-08 | Published |  | 2026-08-20 · The verb goes, and the tooltip was in the library too |
| [Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-7608) | v1.3 | 2026-10-13 | Published | 40 | 2026-10-13 · Every variant hugs its content: the button grows with an icon or a longer label |
| Buttons/Button (previous generation) | v1 | before the baseline | Legacy: on the screens, no longer in the library | 40 | 2026-10-08 · Buttons: the screens are on the previous generation |
| Buttons/Button close X (previous generation) | v1 | before the baseline | Legacy: on the screens | | 2026-10-08 · Buttons: the screens are on the previous generation |
| Buttons/Button utility (previous generation) | v1 | before the baseline | Legacy: on the screens, no longer in the library | | 2026-10-08 · Buttons: the screens are on the previous generation |
| [Button group](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1046-10171) | v1.1 | 2026-10-11 | Published |  | 2026-10-11 · A bg/muted track with a pill for the current segment; the segments are no longer joined |
| [Checkbox](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1097-63652) | v1.0 | 2026-10-08 | Published |  | 2026-09-22 · ORA on tablet and mobile; the all-content example covers the whole catalogue |
| [Content divider](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1252-126874) | v1.0 | 2026-10-08 | Published |  | 2026-09-24 · Course Detail: every tab on mobile; tokens and components audited |
| [Horizontal tabs](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1118-69893) | v1.0 | 2026-10-08 | Published |  | 2026-10-07 · DS: Button publishable again, tabs already on Badge, Course Card measured |
| [Icon Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-7720) | v1.2 | 2026-10-12 | Published | 40 | 2026-10-12 · Tokens by role: Destructive and Success strokes on border tokens, Brand icons on `icon/primary`, Primary Hover fills on background tokens |
| [Close Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=2763-420129) | v1.0 | 2026-10-08 | Back on the Buttons page, to publish | 18 | 2026-10-08 · Button V2 gains Neutral, Utility Button and Close Button (the previous `Buttons/Button close X`, same key) |
| [Utility Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=8003-526508) | v1.0 | 2026-10-08 | Back on the Buttons page, to publish | 18 | 2026-10-08 · Button V2 gains Neutral, Utility Button and Close Button (the previous `Buttons/Button utility`, same key) |
| [Input field](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1090-57817) | v1.0 | 2026-10-08 | Published |  | 2026-10-08 · DS: `Program-Card` without the cohort, week and lesson counters |
| [Link Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-7679) | v1.2 | 2026-10-15 | Published |  | 2026-10-15 · Hover has no fill: the label and its line darken; the line on icon tokens; Focused on bg/faint |
| [Loading indicator](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1192-610) | v1.0 | 2026-10-08 | Published |  | — |
| [Progress bar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1085-57382) | v1.0 | 2026-10-08 | Published |  | 2026-08-05 · The quiz nav adopted across the sections |
| [Radio group item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=124-2838) | v1.0 | 2026-10-08 | Published |  | — |
| [Select](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=85-1269) (page) | v1.0 | 2026-10-08 | Published |  | 2026-09-10 · Mobile tabs stay tabs, and the touch target gets bigger |
| [Tag](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20837-1793) | v1.0 | 2026-10-08 | Published |  | 2026-10-08 · DS: `Program-Card` without the cohort, week and lesson counters |
| [Textarea input field](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1238-278) | v1.0 | 2026-10-08 | Published |  | 2026-10-06 · `LMS / Note Editor` built in the DS (not published yet) |
| [Toast](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21089-1214) | v1.1 | 2026-10-14 | Published |  | 2026-10-14 · Tone icons on icon tokens: Neutral `icon/muted`, Success `icon/success`, Warning `icon/warning`, Critical `icon/error` |
| [Toggle](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1102-4208) | v1.0 | 2026-10-08 | Published |  | — |
| [Tooltip](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1052-489) | v1.0 | 2026-10-08 | Published |  | 2026-10-07 · DS: Button publishable again, tabs already on Badge v2, Course Card measured |
| [Video player 16:9](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=9264-576771) | v1.0 | 2026-10-08 | Published |  | — |

## Buttons: two generations

Checked on 8 Oct 2026 by resolving the button instances on the screens and comparing component keys with the
library's Buttons page.

- **The screens use the previous generation**: `Buttons/Button` (1 559 instances on the ten pages counted),
  `Buttons/Button utility` (342) and `Buttons/Button close X` (185). Its properties are `Size`, `Hierarchy`
  (Primary, Secondary, Tertiary, Link color, Link gray), `State` and `Icon only`.
- **The library has the current buttons**: `Button`, `Link Button` and `Icon Button` (`Type` Brand / Destructive / Success ×
  `Hierarchy` × `State`, size on a nested structure). They are different components, with different keys, and
  **no instance on the ten pages uses them**.
- **The previous generation is no longer served by the library**: importing `Buttons/Button` and
  `Buttons/Button utility` by key fails (a published component imports fine in the same test). The instances keep
  working, but they cannot receive an update. `Buttons/Button close X` was not tested.

How one maps to the other (from the button review of 24 Sep 2026):

| On the screens (previous generation) | In the current buttons | Seen on the four Ready for Dev pages* |
|---|---|---:|
| `Buttons/Button`, Hierarchy Primary | `Button`, Brand, Primary | 219 |
| `Buttons/Button`, Hierarchy Secondary | `Button`, Brand, Secondary | 182 |
| `Buttons/Button`, Hierarchy Tertiary (neutral grey outline) | **no equivalent**: the current Tertiary is a brand ghost button | 89 |
| `Buttons/Button`, Link color | `Link Button`, Primary | 21 |
| `Buttons/Button`, Link gray | `Link Button`, Secondary | 9 |
| `Buttons/Button`, Icon only = True | `Icon Button` (Secondary 31; the 31 Tertiary have the same gap as above) | 62 |
| `Buttons/Button utility` (xs / sm, with an Active state) | **no equivalent** | 38 |
| `Buttons/Button close X` (also on dark) | **no equivalent** | 14 |

\* Instances whose layer still carries the component's name on Video, Quizzes, Reading and Platform Pages Ready
for Dev; buttons nested under another layer name (for example inside a card) are not in this column.

**Decided by Nelson on 8 Oct 2026 (night): the screens move to the current buttons**, which are completed first. Done in the
DS the same night, not published when written:

| Gap | How the current buttons cover it |
|---|---|
| Grey-outline Tertiary | `Button` and `Icon Button` have a fourth `Type`, **Neutral**, as Secondary only (five states each): outline `border/default`, label `text/subtle`, icon `icon/subtle`, no fill; hover as the previous button (`bg/primary-soft`, `border/primary`). Both sets go to **v1.1** |
| `Buttons/Button utility` | back on the Buttons page as **`Utility Button`**: the same set, the same key, a new name. Its instances reconnect with the publish; nothing to swap |
| `Buttons/Button close X` | back on the Buttons page as **`Close Button`**, same key. Its six untokenised hover and focus fills on dark are on `bg/on-media` at 20 % |

Still to do, in this order: the buttons nested in the LMS and base components of this register move to the current buttons in the
DS (the Untitled UI marketing blocks stay on the previous button); a publish; then the direct instances on the
screens, page by page. `Buttons/Button` itself stays off the page until nothing in scope uses it.

**What this means for engineering:** a story built from the current buttons does not match what the Ready for Dev screens
show wherever the screen has a grey-outline Tertiary, a utility button or a close button. Until the screens are
migrated or the current buttons gain those cases, the screens are the reference for how a button looks; the current buttons are the reference for
the property names. The migration itself is not planned yet: it is a decision for Nelson.

## History

- **2026-10-08 (night)** · `Button` v1.0 → v1.1, `Icon Button` v1.0 → v1.1 (`Type=Neutral` added, Secondary only). `Utility Button` and `Close Button` enter at v1.0: the previous utility and close sets under new names, same keys. All four ship with the next publish.

| Date | Component | Version | What changed |
|---|---|---|---|
| 2026-10-08 | all | baseline | Versions start here: `1.0` for every component (`Badge` and the `Button` family carried `2.0` until 13 Oct 2026). |
| 2026-10-08 | Button family | no bump | Register corrected: the screens use the previous generation (`Buttons/Button`), not the current `Button` family. See *Buttons: two generations*. |
| 2026-10-08 | 74 LMS components | no bump | Renamed to `LMS/ICP/…` and `LMS/Platform/…`; Discovery and course-end components moved to the platform page; six components moved to *In review*. |
| 2026-10-12 | `Lab-Launch-Card` | v1.0 → v1.1 | `State=Completed` removed (nothing comes back from the partner); `Opened` carries the date of the first opening; `Unavailable` loses *Skip for now*. |
| 2026-10-13 | nine components | renumbered | Nothing is at `2.x` before it is built (rule 8). Old → new: `Button` 2.2 → 1.2 · `Icon Button` 2.2 → 1.2 · `Link Button` 2.0 → 1.0 · `Badge` 2.1 → 1.1 · `Button group` 2.0 → 1.1 · `Topbar` 2.0 → 1.2 (it already had a 1.1) · `Topbar-Item` 2.0 → 1.1 · `Course-Row` 2.0 → 1.1 · `Lab-Launch-Card` 2.0 → 1.1. Nothing else about the components changed. |
| 2026-10-13 | `Topic-Row`, `Sidebar`, `Topic-Flyout` | v1.0 → v1.1, v1.0 → v1.1, new at v1.0 | The collapsed sidebar: a small bookmark on the rail row of a saved topic (`Show rail bookmark`), and the card that opens beside the rail. Ships with the next publish. |
| 2026-10-13 | `Topic-Footer-Nav` | v1.0 → v1.1 | The property `Show Badge` and the `Topic-Status-Badge` it showed are removed (a property is removed: counted as 1.1 under rule 8; no screen had it on). Mark as Complete sits in the feedback row; Completed shows in the Topic Header. |
| 2026-10-14 | `Topbar` (`LMS/ICP/Player/Topbar`) | v1.0 → v1.1 | Size=Mobile (Light and Dark) shows a 28 px course progress ring after the logo: an instance of `._Progress circle_Ring` (Progress=40%, percentage label off), behind a new boolean `Show progress` (default on). On a phone the sidebar ring sits in the drawer, so this is where a completion is seen to count (Nelson, 14 Oct). Left group set to Hug. Prototype PR 164. Known differences, not fixed in the base ring: band 2.43 px vs a fifth of the radius, track `bg/strong` + fill `border/info` (prototype `bg/muted` + `bg/info`), and no completed state with a check (prototype shows one). |
| 2026-10-13 | `Content-Feedback` | v1.0 → v1.1 | New boolean `Show Mark as Complete`, off by default: the nested `Topic-Status-Badge` on *Mark as Complete* at the right end of the row; it drops under the feedback when the row is narrow. The feedback items and the licence are now inside a `Feedback` group. |
| 2026-10-13 | `Button`, `Link Button` | v1.2 → v1.3, v1.0 → v1.1 | The variants hug their content (they were fixed at 79 and 93 wide, so an icon turned on in the nested part was clipped). Sizes at rest unchanged. |
| 2026-10-13 | three names | no bump | Names that carried a version, same keys: the only variant of `Topic-Footer-Nav` is `Default` (was *Topic Footer Nav Default (V1)*); `Empty state - V2` is `Empty state responsive`; `._Progress bar-V2` is `._Progress bar plain`. |
| 2026-10-13 | Assistant-Chat, Assistant-Launcher | v1.0 | New, in review, not published: the floating chat that replaces the docked AI Panel in the prototype. `AI-Panel` itself is unchanged. |
| 2026-10-13 | Assistant-Chat | v1.0 → v1.1 | First steps: states `First steps` and `First steps done`; the `Empty` state starts with the next step (one sentence, one button). |
| 2026-10-13 | Assistant-Launcher | v1.0 → v1.1 | Variant `Closed with count`: the number of first steps left on the mark. |
| 2026-10-13 | `Course-Card` | v1.0 → v1.1 | The hand-built progress bar ends straight (radius 0 on track and fill), as every progress bar. `Progress bar` itself: an inert radius 8 removed from the bar frame of the labelled variants, no visual change, no bump. |
| 2026-10-13 | `Program-Card`, `Course-Card` | v1.0 → v1.1, v1.1 → v1.2 | The completed state. `Program-Card`: `State=Completed` and the text property `Certificate date`. `Course-Card`: a new variant property `State` (Default, Completed); the two existing variants are now `State=Default`, same keys. A progress fill is `bg/info` while it runs and `bg/success` only when it is done. |
| 2026-10-13 | `Program-Card`, `Course-Card` | no change | Repairs to the Completed variants, published the same day: `Title` and `Courses` linked to their text properties again on `Program-Card`; the `Image` layer of the thumbnail added and linked to `Show image` on `Course-Card`. |
| 2026-10-13 | `Section-Header` (Platform) | v1.0 → v1.1 | The action becomes the DS `Link Button` (Brand, Secondary): text/subtle, a 16 arrow, a 1px icon/subtle underline. A rule under the header was tried and withdrawn the same day. |
| 2026-10-14 | `Program-Card` | v1.1 → v1.2 | `State=Not started` reads *Not started* where the percent was, over *START DATE*; its footer box on bg/subtle with its border. The `State=Completed` action reads *View Certificate*. |
| 2026-10-14 | `Course-Card` | v1.2 → v1.3 | The provider badge moves onto the Course Type line (right end in Grid, right after the badge in List). `State=Completed` Grid has two actions, *Review* (Secondary) and *View Certificate* (Primary). The List footer hugs its content. Layers moved into new frames: instances nested in `Course-Row` had to be re-pointed by key after the publish. |
| 2026-10-14 | `Overall-Progress` | v1.0 → v1.1 | `Device=Mobile` drops its own drawn ring and percentage for an instance of `LMS / Progress Circle` (Status=InProgress), as `Device=Desktop` already did. Instances keep showing 67%; none in the product file used this variant. |
| 2026-10-14 | `Progress circle` (was `LMS / Progress Circle`) | v1.0 → v1.1 | Moved to the Base page *Progress indicators* and renamed; it is now the only progress circle (the Untitled UI kit `Progress circle` was archived). Same component and key. The ring part `._Progress circle_Ring` sits beside it. |
| 2026-10-14 | `LMS / Duration` (new), `Topic-Row`, `Topic-Header`, `Resume-Row`, `Course-Row` (Discovery), `Discussion Prompt` | new v1.0; +0.1 each | New atom: a *Time* text and an *Approx* boolean that shows "approx." after the time; Size sm / md. The five components print their duration with it (an exposed instance) instead of a text layer. The duration texts on the screens were recorded before and put back after the publish. |
| 2026-10-14 | `Note-Editor` | v1.0 → v1.1 | The quote above a note was a local frame in the three variants; it is now an exposed instance of `Transcript-Line` (State=Active, Device by breakpoint, Show duration off, the Note button hidden): the note is anchored to a transcript line, so it shows as that line. The `Note-Editor` text property *Quote* was removed; set the quote as the line's text. The six instances on the screens showed the default text. An `LMS / Anchor Quote` atom was made first the same afternoon and deleted before any publish. |
| 2026-10-14 | `Note-Item` | v1.0 → v1.1 | The *Anchor line* (a bare left rule) is now an exposed instance of `Transcript-Line` (State=Active, Show duration off, the Note button hidden), as in the Note-Editor. The anchor texts set on the screens (19 instances) were recorded and are put back after the publish. |
| 2026-10-14 | `Live-Now-Banner` | v1.0 → v1.1 | No 4px side stripe: the whole card carries the state. Live = `bg/success-soft` + 1px `border/success-soft`; Upcoming = `bg/warning-muted` (new token, a "toasted" yellow: Light `Yellow/100`, Dark `Yellow/950`) + 1px `border/accent-yellow`; padding 16 all round. Badges follow ADR 012 and the code: Live `bg/success` + `text/on-success` (was red), Upcoming `bg/warning` + `text/on-warning` (white on yellow failed AA in dark). On Upcoming the secondary lines are `text/default`. |
| 2026-10-14 | `Lesson-Block` | v1.0 → v1.1 | `Kind=HTML (Blockquote)`: typographic pull quote, no box and no stripe. Lucide `Quote` (28, `icon/primary`) in a 40px left margin, quote in `title-medium/Medium` `text/primary`, attribution `body-medium/Regular` `text/muted`. Same Studio blockquote. |
| 2026-10-14 | `LMS / Inline Alert` | v1.0 → v1.1 | `Tone=Answer` draws its 2px top rule like Success and Error: square corners (`Radius/fixed-none`), `bg/faint`, rule in `border/primary` instead of the grey `border/default` on 8px corners. Hint keeps no rule. |
| 2026-10-14 | `Program-Card` | v1.2 → v1.3 | Progress said once: the `Courses` line sits over the bar (`title-medium/Semibold`); the hero line, the big percent and its caption are removed, **and the text property `Percent` is removed** (a break, counted as a minor under rule 8). Not started: no orphan *START DATE*, the badge carries the date only, the action is *Start*, footer as the other states. Completed: *Program completed* is the line. In progress: *Resume*. Up next on 2 lines. |
| 2026-10-14 | `Course-Card` | v1.3 → v1.4 | New `State=Not started` (Grid, List): no 0% bar, the Up next slot reads *STARTS WITH* + the first topic, action *Start*. Up next title fills its row and wraps to 2 lines in every variant. |
| 2026-10-14 | `Course-Card` | v1.4 → v1.5 | Second publish: `Not started` (Grid) stacks *STARTS WITH* above the topic; the `Image` frame of both `Not started` variants linked to `Show image` again (the link was lost when the variants were cloned, so 1.4 showed no photo). |
| 2026-10-15 | `Course-Card`, `Program-Card` | v1.5 → v1.6, v1.3 → v1.4 | Button hierarchy by action (Nelson): *Resume* is always Primary; *Start*, *Review*, *View Certificate* and *Details* are Secondary. |
| 2026-10-15 | `Course-Card` | no change | Moved from the Discovery page to the My Learning page and renamed `LMS/Platform/Discovery/Course-Card` → `LMS/Platform/My-Learning/Course-Card` (Nelson). Same node, same key: instances are untouched. Discovery keeps `Course-Row` and the badges. |
| 2026-10-15 | `Course-Card`, `Program-Card` | v1.6 → v1.7, v1.4 → v1.5 | Nelson: the footer box is grey (bg/subtle) beside the Primary *Resume* and white with a 1px border/subtle beside a Secondary action (Not started, Completed). `Course-Card` Grid: *UP NEXT* stacks over the title (the strip is 56 tall), the topic type at its top right; the Completed strip is one line, the date at its right end. Fixed the same day (Nelson's go-ahead): the `Course-Card` List footers of Not started and Completed take the same white box with border/subtle; the `Program-Card` Body texts are bound to `title-medium/Semibold`. |
| 2026-10-15 | `Course-Card`, `Program-Card` | v1.7 → v1.8, v1.5 → v1.6 | Nelson's last pass. `Course-Card`: a new Grid header (gap 12: the Course Type line across the card, a 64 px thumb beside the title, the badges), drawn by Nelson on Default and applied to Not started and Completed by cloning it (`Show image` re-linked on the clones); the Grid action fills the width; the Completed certificate strip is green (bg/accent-green-soft, border/success-soft) in Grid and List; List Completed offers *View Certificate* only. `Program-Card`: the Completed footer is green. The 77 ICP Grid instances were captured before the publish (`03-design-system/restore/course-card-grid-overrides-2026-10-15.json`); after Nelson published and accepted, all 77 kept title, initials, image and the four badges (checked against the table): Figma matched the cloned header by layer names, so nothing had to be restored. One Completed instance (My Learning 04, light) carried an old white/grey override on its certificate strip: reset to the green of the main component. Prototype PR 168. |
| 2026-10-15 | `Program-Card` | v1.6 → v1.7 | Nelson: a not-started or completed card did not say how many courses the program has. New text property `Course count` ("7 courses"). Hero: a third tag after Delivery Mode and Difficulty, Badge Outline sm Gray with `layers-three-01`, exposed so its text is set on the card. Body, Not started and Completed: the count at the right end of the progress row (body-medium/Regular, text/subtle), as the course card shows its hours; In progress already says it. Prototype PR 170. |
| 2026-10-15 | `Program-Card` | v1.7 → v1.8 | Nelson (relayed by the "Prototype + Design System review" session, then his own follow-up): the program image as a 64 thumb beside the title, as on Course-Card 1.8 (new "Program identity" row, gap 12; new boolean `Show image`); the next deadline as a Badge Soft sm Yellow after "Up next" (In progress, exposed); a details line under the progress bar, body-small/Regular text/subtle, one line — In progress "Last studied … · … h left · Access until …", Not started "… h total · Access until …", none when Completed. The Title moved into the new row: its text property survives; the 26 ICP instances were captured first (`03-design-system/restore/program-card-overrides-2026-10-15.json`). Named version saved before the edit. Prototype PR 170. |
| 2026-10-15 | `Program-Card` | v1.8 → v1.9 | Nelson: the title is title-large/Semibold (20/30), as on the course card (was headline-medium/Semibold); Grid keeps 3 lines at most, List 2. The doc block version chip, stale at v1.4, now says v1.9. |
| 2026-10-16 | `Topbar` (ICP Player), `Topic-Row` (ICP Sidebar), `Weekly-Goal-Card` | v1.1 → v1.2, v1.2 → v1.3, no change | Audit clean-up approved by Nelson. Topbar: new boolean `Show theme toggle` (on by default) — the theme button was hidden in every variant while the prototype shows it — and, at Nelson's request, it is the same Utility Button (sm, Tertiary) as Notifications and Bookmark with `moon-01` (Light) / `sun` (Dark) instead of a switch; the hidden wordmark copies, Breadcrumbs, AI Assistant and learner-name copies are removed. **Screens: every ICP Topbar (292) shows the theme button after the update.** Topic-Row: new boolean `Optional` (off) for the Optional-Chip that was hidden everywhere. Weekly-Goal-Card: hidden Header › Status removed. No ICP screen showed any removed layer (checked). ORA-Stepper and Weekly-Goal-Card Edit › Body keep their per-variant hidden layers. |
| 2026-10-16 | `Assistant-Launcher`, token `text/placeholder`, `Topic-Footer-Nav`, `Collapse-Toggle`, `Live-Control-Bar` | v1.2 → v1.3, token value, no change | Audit of 16 Oct, phase 2, with the recommended defaults (Nelson: "avança"). D1: the launcher count is on bg/primary (bg/info gave 4.00:1). D2: `text/placeholder` one step darker in all six modes — Light Neutral/600 (4.96:1 on bg/subtle, was 4.38), Dark Dark-Neutral/300 (6.28:1, was 4.22; the same step as text/subtle, no primitive in between). The variant property "Property 1" is renamed "State" on the three components, values unchanged (15 Topic-Footer-Nav instances in ICP to check after the publish). |
| 2026-10-16 | `Course-Card`, `Program-Card`, `Note-Editor` | v1.12 → v1.13, v1.10 → v1.11, v1.1 → v1.2 | Audit of 16 Oct, phase 1. Green certificate strip labels in text/default (text/subtle was 3.50:1 on bg/accent-green-soft in dark); Program-Card "Up next" label back on body-small/Semibold (lost in 1.8); Note-Editor Header, Body, Anchor label and Grabber fills bound to bg/page (raw #ffffff stayed white in dark). |
| 2026-10-16 | `Course-Type-Badge`, `Collapse-Toggle`, `Content-Feedback`, `Close Button`, `Utility Button`, `Progress circle` | no change | Audit of 16 Oct, phase 1: 7 hidden layers no property used removed (Course-Type-Badge Badge ×2, Collapse-Toggle chevron ×2 + panel fill, Content-Feedback License + Separator); version lines added to the three base descriptions that had none. No visual change, no bump. |
| 2026-10-15 | `Course-Type-Badge` | v1.0 → v1.1 | Nelson: the badge is the word only (COURSE text/subtle, PROGRAM text/primary); the filled two-tone icons are removed. Three rounds of icons were tried on the real cards (books, paths, folders, layers, a box / boxes + certificate pair); the program icon read as too complex at 16 px, and the word and its colour say it as fast while the two cards already differ in shape. Left in the library from the trial: the new icon `boxes` (Icons page, Shapes; Untitled style). Prototype PR 169. |
| 2026-10-15 | Assistant-Chat, Assistant-Launcher | v1.1 → v1.2 | Chat: header on bg/subtle, the sparkles in a 28 px bg/primary-soft tile; *ME* and *ASSISTANT* above each message; answers and *Thinking…* on bg/primary in text/on-primary; the AI notice moves under the input (Copy row); the Send button has a gradient stroke. Launcher: the ball has a 2px linear gradient stroke (#0088d4 → #85d3ff → #044150), which the prototype turns slowly (Nelson asked for it to move); the count badge is on bg/info. Fixed the same day: the 14 launcher bindings to the old remote `1. Color Modes` collection now point at the logo primitives (`background/info` → `Primary/200_P04b_Blue_Light` #51bffc, `background/brand` → `Primary/900_P01_Brand_Blue` #044150), as the DS logos bind primitives; no semantic role holds the logo's light blue in both modes, and the white plane on a dark page stays an asset swap in code, as for the logo. The three *Assistant* labels are bound to `body-small/Regular`. Still open: bg/info + white is 4.0:1, under AA for the count (the prototype uses bg/primary). |
| 2026-10-15 | `Link Button` | v1.1 → v1.2 | Nelson: hover has no fill; the label and its 1px bottom line darken (Brand text/on-primary-soft + icon/default, Destructive accent-red, Success accent-green, Secondary text/muted + icon/muted). The line is on the icon token of its tone (icon/primary, icon/error, icon/success, icon/subtle; border/disabled when Disabled). Focused: bg/faint, radius 6. Prototype PR 166. |
| 2026-10-15 | `Transcript-Line` | v1.0 → v1.1 | Nelson (option 2 of the content-padding rollout): the side padding moves from `Spacing/xl` to `Container/content-padding`, so the line text lines up with the topic content (24 desktop, 20 tablet, 16 mobile); the row and its Active highlight still run the full width. Inside `Note-Item` and `Note-Editor` the nested line keeps `Spacing/xl` (override), no change there. Prototype PR 173. |
| 2026-10-16 | `Provider-Partner-Badge` | v1.0 → v1.1 | Nelson added Type=Logo (the partner artwork on a bg/subtle chip, monochrome parts on icon/muted). New variant property Theme=Light/Dark: the 12 Dark variants carry the SKO Dark mode, for dark surfaces such as the Program-Card hero. FutureSkills is a dark bitmap: its Dark variant keeps the light chip until a light artwork exists. 24 variants. |
| 2026-10-16 | `Course-Card` | v1.8 → v1.9 | Nelson: the provider or partner shows as its logo (Type=Logo, Theme=Light) on the Course Type line, Grid and List. |
| 2026-10-16 | `Program-Card` | v1.9 → v1.10 | The two hero Partner chips (placeholder logos, 77 × 36) become Provider-Partner-Badge instances, Type=Logo, Theme=Dark, Microsoft and IBM by default, exposed so a screen can set the partner. Prototype PR 174. |
| 2026-10-16 | `Course-Card` | v1.9 → v1.10 | Nelson: a course can have more than one partner, as a program. The badge sits in a *Partners* row (gap `Spacing/md`) with a second Provider-Partner-Badge (Microsoft, Logo, Light) shown by the new boolean *Second partner* (default off). Both exposed (*Partner 1*, *Partner 2*). The 102 product-file instances all used the default IBM badge, so nothing was overridden. Prototype PR 174 (second commit). |
| 2026-10-16 | `Course-Card` | v1.10 → v1.11 | Nelson changed Grid Default: the overline (UP NEXT) and the topic-type badge share one row (badge at the right end), so the next-topic title gets the full width, two lines then an ellipsis. Applied to Not started (Grid, and List with the List row: 16 apart). Completed hides the badge, unchanged. Before the publish, the next title and topic type of the 102 product-file instances were saved to `restore/course-card-next-topic-2026-10-16.json`. Prototype PR 174 (third commit). |
| 2026-10-16 | `Provider-Partner-Badge` | v1.1 → v1.2 | Nelson: the logo chip padding is `Spacing/sm` (6), 24 → 28 tall (radius `Radius/fixed-xs`). FutureSkills Dark is the same bitmap with image filters (exposure +1, contrast +1, saturation −1, shadows −1), so it reads on the dark chip; the light-chip exception is gone. Prototype PR 177. |
| 2026-10-16 | `Course-Card` | v1.11 → v1.12 | Nelson: cards always have the same height. Grid variants were 370 / 356 / 350: each now has `minHeight` 370 and the `cta-slot` grows with its buttons at the bottom. List Completed was 120 (thumb 86, a stray min-height): now 118 like the others. Prototype PR 179 (the cards of a collection take the tallest height). |
| 2026-10-16 | `LMS / Profile Menu` (new) | new v1.0 | Nelson: the profile menus of the platform pages and the player must match in accessibility and skins. One organism on *LMS · Shared components*: the learner (Avatar sm), **Appearance** (Toggle sm *Dark theme*; Button group *Brand skin* SKO · Gold · Red), **Accessibility standards** (Button group *Text size*, three A in body-small / body-medium / body-large; Toggles *Colourblind-safe states*, *Reduce motion*, *Underline links*, *Larger touch targets*) and a footer (*Restart first steps*; *Reset demo*, a prototype action behind the boolean of the same name). 288 wide. The Ink, Sky and Violet skins are gone: they had no tokens. Prototype PR 181 (`ProfileSettings`, used by both menus; the player adds its preview sections). |
| 2026-10-16 | `Progress-Card` (Course Detail) | v1.0 → v1.1 | Nelson: a completed program or course shows its header Progress card in green, as the cards do. State=Complete already had the bar on bg/success; its label (still "Course progress") is now the check-circle icon (icon/success) + "Completed" in body-medium/Semibold text/default, so green is never the only sign. No product-file screen shows a completed header (32 cards, all In progress), so nothing changes on the screens. Prototype PR 182 (program and course headers). |
| 2026-10-17 | `Program-Card` | v1.11 → v1.12 | Nelson changed the Due badge of the Up next footer (Grid and List, In progress) to Badge Soft · sm · Warning, the variant the Dashboard Due-Item uses; it was the accent yellow. Published by Nelson. The Course-Card has no Due badge. Prototype PR 183 (`color="warning"`). |
| 2026-10-17 | `Topbar` (Platform Navigation) | v1.2 → v1.3 | Nelson: the light / dark switch goes in the main bar, not in the profile menu. Desktop: *Theme toggle*, a Utility Button (sm, Tertiary) with moon-01, between Notifications and the learner, as in the player Topbar 1.2. Compact too (Nelson, same day): Notifications · Theme toggle · learner · Menu, the bar 64 tall (padding 8 / 16). Doc block anatomy, measures and rules refreshed. Prototype PR 184 (desktop and compact, compact bar 49 → 64). |
| 2026-10-17 | `LMS / Profile Menu` | v1.0 → v1.1 | The *Dark theme* toggle leaves the Appearance section (it is in the top bar of both shells now): Appearance holds the brand skin only. 679 → 651 tall. Same version, before the publish (Nelson): each Brand skin segment is the Button group base Icon=Dot, a 10px dot in the skin colour before the name (SKO icon/primary held on the SKO skin, Gold icon/accent-yellow, Red icon/accent-red). Prototype PRs 184 and 185. |
| 2026-10-17 | `Course-Card` | v1.13 → v1.14 | Nelson: the Title is Max lines 2 with an ellipsis in every variant. Grid already showed two lines; List was one line at 118 tall and now hugs a second line (about 148). Doc block chip, rules and measures updated. Prototype PR 186: the list title takes two lines and the list rows of a collection take the tallest height, as the grid. |
| 2026-10-17 | `Course-Header` | v1.0 → v1.1 | Nelson: the course headers were missing the partner logos. The two placeholder chips (77 × 36, a Placeholder Logo on bg/page) are Provider-Partner-Badge Type=Logo (Theme=Light on Kind=Course, Theme=Dark on the dark Kind=Program band), the component the cards use; in the header the chip is bg/page (Nelson: white on the light course band, the dark page colour on the dark program band), not the cards' bg/subtle; the logo row fills the title column so the logos sit against its right edge (it was fixed at 560 on Kind=Program Desktop); exposed as *Partner 1* (Microsoft) and *Partner 2* (IBM), 8 apart (Spacing/md); new boolean *Second partner* (on), so the 20 course headers of the product file keep their two logos. Also fixed: the Progress card button had its inner structure fixed at 64 in all six variants, which cut "Resume course"; it fills again. Prototype PRs 188 (course header: the course card's provider and partners) and 190 (program header: the program card's partners). The program screens of the product file show the logos once the update is accepted (their instances hold an empty container today). After the publish: 7 program Desktop headers had the logo container hidden by an override; their overrides were saved, the instances reset and the overrides put back (texts compared, same), and their logo row set to Fill (560 → 800). |
| 2026-10-17 | `LMS / Inline Alert` | v1.1 → v1.2 | Nelson: an alert on a grey bg/subtle surface needs a white version. New variant property *Surface*: Page (default, as before: fill bg/faint) and Subtle (fill bg/page); Hint keeps bg/primary-soft on both. 6 → 12 variants. Prototype PR 189 (`surface` prop); the Calendar page of PR 187 draws its missed-deadline block that way. |
| 2026-10-19 | `Course-Card` | v1.14 → v1.15 | Product-file check after the publish: in My Learning the course list cards were 146 (two-line title) and 116 (one line), against "cards always have the same height". The List variants get minHeight 146, as Grid has 370; nested in Course-Row, a screen cannot override min height, so the fix is in the component. Doc block measures regenerated with padding. Prototype PR 191 (list min height 146). |
| 2026-10-19 | `Topbar` (Platform Navigation) | v1.3 → v1.4 | The default learner was the UI-kit sample (Olivia Rhye, a photo) on every Ready for Dev screen. Now John Smith with the initials avatar (JS) on Desktop and Compact, as in the prototype. Same check: 6 Topbars on *Lab · Third-party platforms* were still the v1.1 copy (no theme button); swapped to v1.3, My Learning current, heights 72 / 64 restored (they had collapsed to 39 / 49). |
| 2026-10-19 | Six new Platform components | new at v1.0 | Calendar, Discussion and Services pages (approved 19 Oct, drawn in the ICP file): `Calendar/Event-Row`, `Calendar/Week-Day`, `Calendar/Month-Event`, `Calendar/Month-Day`, `Discussion/Inbox-Row`, `Services/Service-Row`. Built first as local components in the ICP file, rebuilt in the DS on three new group pages (↳ Calendar, ↳ Discussion, ↳ Services, docs generated with `ds-group-page.js`), published 19 Oct; the 119 instances on the ICP frame `7392:200778` were swapped to the library (signature check: 0 differences) and the local copies deleted. |
| 2026-10-19 | `Activity-Player`, `Activity-Fullscreen-Bar`, `Activity-Launch-Card` (new) | new v1.0 | Nelson: the SCORM stand-ins of the ICP Activity page go to the DS (↳ Topics). Activity-Player: toolbar with Fullscreen (Button Secondary sm, maximize-01; boolean *Show fullscreen*) and a *Package* slot, default Activity-SCORM-Frame Ready; the instance is sized by the screen. Activity-Fullscreen-Bar: *Title* text property and Exit fullscreen (minimize-01), Desktop / Mobile. Activity-Launch-Card: Lab-Launch-Card without the provider, *Blocked* has Play in this page with no external-link icon. Topics doc page regenerated (17 components). The sample package content stays author content in the slot. |
| 2026-10-19 | `Topbar` (ICP Player) | v1.2 → v1.3 | Nelson: no more Olivia Rhye in the player bar. The six variants show John Smith (the Desktop text read "John Simth") with the initials avatar JS: Avatar Text=True and the photo fill override removed, as the platform Topbar 1.4. Dark Mobile avatar given an explicit SKO Dark mode. Logo checked in dark: no white box. |
| 2026-10-19 | `LMS / Profile Menu` | v1.1 → v1.2 | Nelson: the menu as the prototype draws it. The header avatar is a rounded square (Radius/fixed-md, 8; the Topbar avatars stay round) and the footer lists Reset demo, then Restart first steps. The panel radius (12) already matched. The menu is drawn open on three screens (platform desktop and mobile, player) in the section *Profile menu · open* of the ICP page *Plaftorm Pages (SkillUp UI) - V8 - WIP* (`7449:64970`), in review. |
| 2026-10-19 | `LMS / Profile Menu` | v1.2 → v1.3 | Nelson: the learner header repeats what the trigger already shows, so it goes. Two rows built as the footer rows (44 tall, icon 16, body-medium/Medium text/muted, groups padded Spacing/xs): **Edit profile** (user-edit, opens the Edit profile page) at the top, and, after Nelson’s edit the same day, **SkillUp Online** (link-external-01, https://skillup.online in a new tab) as its own group after Accessibility standards, before the footer (renamed *Footer demo purposes only*). 651 → 694 tall. Doc block anatomy: Edit profile, Appearance, Accessibility standards, SkillUp Online, Footer. Same in the platform and the player menus. Prototype PR 198 (with the `/platform/profile` page); the page is drawn desktop and mobile in the section *Edit profile (19 Oct 2026) · in review* (`7453:34440`, V8 WIP page). |
| 2026-10-19 | `LMS / Profile Menu` | v1.3 → v1.4 | Nelson asked for a Certificates page reachable from the profile menu. A second row in the top group, now named *Profile links*: **Certificates** (award-01), built as Edit profile, opens `/platform/certificates`. 694 → 738 tall. Doc block: part 1 *Profile links*, markers moved. Prototype PR 201. |
| 2026-10-19 | `Certificate-Document` (was `Certificate-Document-demo`) | v1.0 → v1.1 | Nelson: the sheet of the one-certificate page leaves *LMS · IN REVIEW / NOT FOR BUILD* (section "Not placed on any screen") for ↳ Completion, beside the doc blocks, renamed `LMS/Platform/Completion/Certificate-Document`, variant *Default*; the set padding moves to Spacing/xl. New boolean **Second partner** (off): a second Placeholder Logo (Microsoft) after the first, for a program with two partners, as the prototype prints for Data Analytics Foundations. No generated doc block yet. |
| 2026-10-19 | `LMS / Profile Menu`, `Topbar` (Platform Navigation), `Topbar` (ICP Player) | v1.4 → v1.5, v1.5 → v1.6, v1.3 → v1.4 | Nelson edited the Profile Menu: Appearance first (no rule), Accessibility standards, a **Profile** section (title as the others; Edit profile, Certificates), SkillUp Online, the demo footer; every group padded 12/16 with a rule above, rows 8 apart; 738 → 828 tall. Doc block legend and markers follow; the anatomy stage grew to fit. Nelson: the learner avatar is not a circle: in both Topbars the Avatar (and the player Mobile `avatar`) is bound to Radius/fixed-md (8) instead of Radius/full. Prototype PR 204 (menu order, avatars in both bars). Not fixed: the player Topbar Dark Mobile avatar still renders light. |
| 2026-10-19 | `Topbar` (Platform Navigation) | v1.4 → v1.5 | Dark-mode check of the Calendar, Discussion and Services screens: the logo sat in a fixed white box (raw white fill on the logo instance) with its teal parts bound to the old library's `background/brand`. The fill is removed and the four teal parts (wordmark, brandmark outline) use `text/on-primary-soft` (Light #044150, unchanged; Dark #CDEAF6), Nelson's choice over a new token; the light-blue parts keep `background/info`. The hidden learner name in Compact reads John Smith (was Olivia Rhye). In the ICP file 108 instances on four pages sat on the previous library copy after the accept and were swapped to v1.5 (current nav item kept on every screen). |

## Rename map (8 Oct 2026)

| Name before | Name now |
|---|---|
| `LMS / AI Panel` | `LMS/ICP/AI/AI-Panel` |
| `LMS / Quiz · Answer Input` | `LMS/ICP/Assessment/Answer-Input` |
| `LMS / Drag and Drop · Card` | `LMS/ICP/Assessment/Drag-and-Drop-Card` |
| `LMS / Drag and Drop · Item` | `LMS/ICP/Assessment/Drag-and-Drop-Item` |
| `LMS / Drag and Drop · Zone` | `LMS/ICP/Assessment/Drag-and-Drop-Zone` |
| `LMS / Quiz · Entry Header` | `LMS/ICP/Assessment/Entry-Header` |
| `LMS / Quiz · Exam Timer` | `LMS/ICP/Assessment/Exam-Timer` |
| `LMS / Quiz · Footer Actions` | `LMS/ICP/Assessment/Footer-Actions` |
| `LMS / Quiz · Gate` | `LMS/ICP/Assessment/Gate` |
| `LMS / Quiz · Grade Summary` | `LMS/ICP/Assessment/Grade-Summary` |
| `LMS / Quiz · Option Row` | `LMS/ICP/Assessment/Option-Row` |
| `LMS / Quiz · Question Card` | `LMS/ICP/Assessment/Question-Card` |
| `LMS / Quiz · Results` | `LMS/ICP/Assessment/Results` |
| `LMS / Quiz · Stat Tile` | `LMS/ICP/Assessment/Stat-Tile` |
| `LMS / Quiz · Stepper Bar` | `LMS/ICP/Assessment/Stepper-Bar` |
| `LMS / Topic · Author & Updated Date` | `LMS/ICP/Content/Author-and-Updated-Date` |
| `LMS / Content Feedback` | `LMS/ICP/Content/Content-Feedback` |
| `LMS / File Item` | `LMS/ICP/Content/File-Item` |
| `LMS / Mobile Tab Select` | `LMS/ICP/Content/Mobile-Tab-Select` |
| `LMS / Note Editor` | `LMS/ICP/Content/Note-Editor` |
| `LMS / Note Item` | `LMS/ICP/Content/Note-Item` |
| `LMS / Numbered Step` | `LMS/ICP/Content/Numbered-Step` |
| `LMS / Sync to Video Button` | `LMS/ICP/Content/Sync-to-Video-Button` |
| `LMS / Thread Item` | `LMS/ICP/Content/Thread-Item` |
| `LMS / Topic Header` | `LMS/ICP/Content/Topic-Header` |
| `Topic-Status-Badge` | `LMS/ICP/Content/Topic-Status-Badge` |
| `LMS / Topic-Types Badge` | `LMS/ICP/Content/Topic-Types-Badge` |
| `LMS / Transcript Line` | `LMS/ICP/Content/Transcript-Line` |
| `LMS / Live Control Bar States` | `LMS/ICP/Live/Live-Control-Bar` |
| `LMS / Live Now Banner` | `LMS/ICP/Live/Live-Now-Banner` |
| `LMS / VILT · Session Card` | `LMS/ICP/Live/VILT-Session-Card` |
| `LMS / VILT · Session Meta` | `LMS/ICP/Live/VILT-Session-Meta` |
| `LMS / VILT · Stage Stepper` | `LMS/ICP/Live/VILT-Stage-Stepper` |
| `LMS / VILT · Stage Surface` | `LMS/ICP/Live/VILT-Stage-Surface` |
| `LMS / Course Progression Button` | `LMS/ICP/Player/Course-Progression-Button` |
| `LMS / Course Player Topbar` | `LMS/ICP/Player/Topbar` |
| `LMS / Topic Footer Nav` | `LMS/ICP/Player/Topic-Footer-Nav` |
| `Vertical Scroll` | `LMS/ICP/Player/Vertical-Scroll` |
| `bookmark` | `LMS/ICP/Sidebar/Bookmark` |
| `sidebar-expand-collapse-toggle` | `LMS/ICP/Sidebar/Collapse-Toggle` |
| `LMS / Completion Status` | `LMS/ICP/Sidebar/Completion-Status` |
| `LMS / Sidebar / Course Header` | `LMS/ICP/Sidebar/Course-Header` |
| `LMS / Lesson Header` | `LMS/ICP/Sidebar/Lesson-Header` |
| `LMS / Module Header` | `LMS/ICP/Sidebar/Module-Header` |
| `LMS / Module Info` | `LMS/ICP/Sidebar/Module-Info` |
| `LMS / Overall Progress` | `LMS/ICP/Sidebar/Overall-Progress` |
| `LMS / Section Header` | `LMS/ICP/Sidebar/Section-Header` |
| `LMS / Sidebar-ICP` | `LMS/ICP/Sidebar/Sidebar` |
| `LMS / Topic Row` | `LMS/ICP/Sidebar/Topic-Row` |
| `LMS / Activity · SCORM Frame` | `LMS/ICP/Topics/Activity-SCORM-Frame` |
| `LMS / Lab · File Row` | `LMS/ICP/Topics/Lab-File-Row` |
| `LMS / Lab · Launch Card` | `LMS/ICP/Topics/Lab-Launch-Card` |
| `LMS / Lab · Prerequisites` | `LMS/ICP/Topics/Lab-Prerequisites` |
| `LMS / Lesson Block` | `LMS/ICP/Topics/Lesson-Block` |
| `LMS / ORA · Grade Panel` | `LMS/ICP/Topics/ORA-Grade-Panel` |
| `LMS / ORA · Rubric Criterion` | `LMS/ICP/Topics/ORA-Rubric-Criterion` |
| `LMS / ORA · Stepper` | `LMS/ICP/Topics/ORA-Stepper` |
| `LMS / ORA · Submit Gate` | `LMS/ICP/Topics/ORA-Submit-Gate` |
| `LMS / ORA · Text Response` | `LMS/ICP/Topics/ORA-Text-Response` |
| `LMS / ORA · Upload` | `LMS/ICP/Topics/ORA-Upload` |
| `LMS / ORA · Waiting Panel` | `LMS/ICP/Topics/ORA-Waiting-Panel` |
| `LMS / Podcast · Chapter Row` | `LMS/ICP/Topics/Podcast-Chapter-Row` |
| `LMS / Podcast · Player` | `LMS/ICP/Topics/Podcast-Player` |
| `LMS / Zooming Image` | `LMS/ICP/Topics/Zooming-Image` |
| `LMS / Course Certificate` | `LMS/Platform/Completion/Certificate` |
| `LMS / Course Complete Modal` | `LMS/Platform/Completion/Course-Complete-Modal` |
| `LMS / Card Overflow Menu` | `LMS/Platform/Discovery/Card-Overflow-Menu` |
| `LMS / Course Card` | `LMS/Platform/My-Learning/Course-Card` (was `LMS/Platform/Discovery/Course-Card` until 15 Oct 2026) |
| `LMS / Course Row` | `LMS/Platform/Discovery/Course-Row` |
| `LMS / Course Type Badge` | `LMS/Platform/Discovery/Course-Type-Badge` |
| `LMS / Delivery Mode Badge` | `LMS/Platform/Discovery/Delivery-Mode-Badge` |
| `LMS / Difficulty Badge` | `LMS/Platform/Discovery/Difficulty-Badge` |
| `LMS / Difficulty · Level Icon` | `LMS/Platform/Discovery/Difficulty-Level-Icon` |
| `LMS / Provider-Partner Badge` | `LMS/Platform/Discovery/Provider-Partner-Badge` |
