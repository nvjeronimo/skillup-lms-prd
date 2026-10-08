# Component versions

The version of every design system component the ICP and LMS screens use, the rule for changing it, and the names
the LMS components carry since 8 Oct 2026.
Started on 8 Oct 2026. Library: *❖ SKO Design System (V3)* (`c7EUDrQwP8si08aPipDSIV`).

## Why

Figma has no version per component, only a history of the whole file. Engineering builds one Storybook story per
component, so it needs to know, per component, whether what it built is still current and what changed since.

## The convention

A version is two numbers, `MAJOR.MINOR`, written `v2.1`.

| The change | Bump | Examples |
|---|---|---|
| **Breaks what was built from the previous version.** A property or a variant is removed or renamed, a property changes type, the structure changes so that the code has to be rewritten, a behaviour changes. | **MAJOR** (`1.3` → `2.0`) | `Program-Card` loses `Week`, `Lessons` and `Show cohort`; `Badge` rebuilt as `Badge v2`. |
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
7. **A component named with a version** (`Badge v2`) keeps the name until the next rebuild; the register, not the
   name, says which version is current.

**For engineering:** a MINOR bump means "check the story against Figma"; a MAJOR bump means "the story's
properties or structure have to change". A story records the version it was built from.

## The baseline

On 8 Oct 2026 every component got a starting version, because no versions had been kept until then:

- `1.0` for every component, as published that day.
- `2.0` for `Badge v2` and the `Button` family, which are rebuilds of an earlier component.

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
| [Topbar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537695) | v1.0 | 2026-10-08 | Published | 6 | 2026-10-08 · Renamed from “LMS / Course Player Topbar” |
| [Topic-Footer-Nav](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20053-3286) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Topic Footer Nav” |
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
| [Overall-Progress](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536988) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / Overall Progress” |
| [Section-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536865) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Section Header” |
| [Sidebar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536883) | v1.0 | 2026-10-08 | Published | 5 | 2026-10-08 · Renamed from “LMS / Sidebar-ICP” |
| [Topic-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537000) | v1.0 | 2026-10-08 | Published | 9 | 2026-10-08 · Renamed from “LMS / Topic Row” |

**Content**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Author-and-Updated-Date](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20454-705641) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Topic · Author & Updated Date” |
| [Content-Feedback](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537661) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Content Feedback” |
| [File-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537612) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-08 · Renamed from “LMS / File Item” |
| [Mobile-Tab-Select](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19995-7247) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / Mobile Tab Select” |
| [Note-Editor](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22071-6813) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / Note Editor” |
| [Note-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537594) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Note Item” |
| [Numbered-Step](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3297) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Numbered Step” |
| [Sync-to-Video-Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20214-1771167) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / Sync to Video Button” |
| [Thread-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537651) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Thread Item” |
| [Topic-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537676) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Topic Header” |
| [Topic-Status-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20066-431924) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “Topic-Status-Badge” |
| [Topic-Types-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536800) | v1.0 | 2026-10-08 | Published | 14 | 2026-10-08 · Renamed from “LMS / Topic-Types Badge” |
| [Transcript-Line](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537556) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-08 · Renamed from “LMS / Transcript Line” |

**Topics**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Activity-SCORM-Frame](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3488) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-08 · Renamed from “LMS / Activity · SCORM Frame” |
| [Lab-File-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3330) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / Lab · File Row” |
| [Lab-Launch-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22251-6427) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-08 · Renamed from “LMS / Lab · Launch Card” |
| [Lab-Prerequisites](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3331) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Lab · Prerequisites” |
| [Lesson-Block](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3682) | v1.0 | 2026-10-08 | Published | 12 | 2026-10-08 · Renamed from “LMS / Lesson Block” |
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
| [Live-Now-Banner](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537772) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / Live Now Banner” |
| [VILT-Session-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705637) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / VILT · Session Card” |
| [VILT-Session-Meta](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705512) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / VILT · Session Meta” |
| [VILT-Stage-Stepper](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705552) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / VILT · Stage Stepper” |
| [VILT-Stage-Surface](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705648) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / VILT · Stage Surface” |

**AI**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [AI-Panel](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538166) | v1.0 | 2026-10-08 | In review | 4 | 2026-10-08 · Renamed from “LMS / AI Panel” |

**Not renamed yet**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [LMS / Autosave Status](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538137) | v1.0 | 2026-10-08 | Published | 4 | 2026-09-08 · Alert recoloured in the library, and a collection called "Remove" |
| [LMS / Daily Goals (decide later)](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538034) | v1.0 | 2026-10-08 | In review | 1 | 2026-10-08 · Moved to the “In review / not for build” page |
| [LMS / Discussion Prompt](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537927) | v1.0 | 2026-10-08 | Published | 1 | — |
| [LMS / Empty State](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537992) | v1.0 | 2026-10-08 | Published | 4 | — |
| [LMS / Footnote](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21606-1205) | v1.0 | 2026-10-08 | Published | 1 | 2026-09-30 · Weekly goal card — component handoff, ready for dev |
| [LMS / Inline Alert](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3296) | v1.0 | 2026-10-08 | Published | 6 | 2026-09-10 · Blockquote and Key Takeaways become Lesson Block Kinds |
| [LMS / Live Attendance](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536879) | v1.0 | 2026-10-08 | In review | 1 | 2026-10-08 · Moved to the “In review / not for build” page |
| [LMS / Module Time-Left](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536873) | v1.0 | 2026-10-08 | In review | 1 | 2026-10-08 · Moved to the “In review / not for build” page |
| [LMS / Progress Circle](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20377-3832) | v1.0 | 2026-10-08 | Published | 3 | — |

### LMS · Platform (`LMS/Platform/…`): 45

**Navigation**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Topbar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22702) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-07 · Platform screens: course covers, short course-row copy, DS writes — and the badges still read *Label* |
| [Topbar-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22694) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-07 · Platform screens: badge texts restored where the update has landed; one badge removed |

**Dashboard**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Due-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22752) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · After the publish: the Program headers are in; the Course Card is still not |
| [Jump-Tile](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22769) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · DS: defaults on what Open edX serves; an image option on the Course Card |
| [Resume-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22800) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · After the publish: the Program headers are in; the Course Card is still not |
| [Section-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22747) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Stat](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22736) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · DS: defaults on what Open edX serves; an image option on the Course Card |
| [Streak-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22783) | v1.0 | 2026-10-08 | In review | 1 | 2026-10-08 · Moved to the “In review / not for build” page |
| [Today-at-a-glance](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22184-626082) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · After the publish: the Program headers are in; the Course Card is still not |

**My-Learning**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Browse-Tile](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22901) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Program-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22808) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-08 · DS: `Program-Card` without the cohort, week and lesson counters |

**Discovery**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Card-Overflow-Menu](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538064) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Card Overflow Menu” |
| [Course-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20888-6124) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / Course Card” |
| [Course-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538010) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / Course Row” |
| [Course-Type-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538072) | v1.0 | 2026-10-08 | Published | 2 | 2026-10-08 · Renamed from “LMS / Course Type Badge” |
| [Delivery-Mode-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538084) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / Delivery Mode Badge” |
| [Difficulty-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538077) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / Difficulty Badge” |
| [Difficulty-Level-Icon](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21868-5367) | v1.0 | 2026-10-08 | Published | 3 | 2026-10-08 · Renamed from “LMS / Difficulty · Level Icon” |
| [Provider-Partner-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538091) | v1.0 | 2026-10-08 | Published | 6 | 2026-10-08 · Renamed from “LMS / Provider-Partner Badge” |

**Program-Detail**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Course-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22906) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-08 · Screens: the 28 compact course rows on the DS row; the local component is gone |

**Course-Detail**

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Card-Shell](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21885) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Completion-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22448) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Course-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21765) | v1.0 | 2026-10-08 | Published | 6 | 2026-10-08 · Course-Header backgrounds, ready to export two ways |
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
| [Progress-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21894) | v1.0 | 2026-10-08 | Published | 4 | 2026-10-06 · Platform components moved into the DS library |
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
| [Certificate-Document-demo](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22261-2968) | v1.0 | 2026-10-08 | In review | 1 | 2026-10-08 · Moved to the “In review / not for build” page |
| [Course-Complete-Modal](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537944) | v1.0 | 2026-10-08 | Published | 1 | 2026-10-08 · Renamed from “LMS / Course Complete Modal” |

### Base components: 23

A link marked *(page)* goes to the component's page in the library.

| Component | Version | Since | Status | Variants | Last change recorded |
|---|---|---|---|---:|---|
| [Alert](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1130-81134) | v1.0 | 2026-10-08 | Published |  | 2026-09-23 · Course Detail: known inconsistencies fixed |
| [Avatar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19-1012) | v1.0 | 2026-10-08 | Published |  | 2026-10-01 · Top bar light; badges on every breakpoint; mobile Q&A conversation as one card |
| [Avatar label group](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=82-2793) | v1.0 | 2026-10-08 | Published |  | — |
| [Badge v2](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21889-541076) | v2.0 | 2026-10-08 | Published |  | 2026-10-08 · DS: defaults on what Open edX serves; an image option on the Course Card |
| [Breadcrumbs](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1122-153) | v1.0 | 2026-10-08 | Published |  | 2026-08-20 · The verb goes, and the tooltip was in the library too |
| [Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-7608) | v2.0 | 2026-10-08 | Published, on no screen yet |  | 2026-10-07 · DS: Button publishable again, tabs already on Badge v2, Course Card measured |
| Buttons/Button (previous generation) | v1 | before the baseline | Legacy: on the screens, no longer in the library | 40 | 2026-10-08 · Buttons: the screens are on the previous generation |
| Buttons/Button close X (previous generation) | v1 | before the baseline | Legacy: on the screens | | 2026-10-08 · Buttons: the screens are on the previous generation |
| Buttons/Button utility (previous generation) | v1 | before the baseline | Legacy: on the screens, no longer in the library | | 2026-10-08 · Buttons: the screens are on the previous generation |
| [Button group](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1046-10171) | v1.0 | 2026-10-08 | Published |  | 2026-10-08 · My Learning: the 40 covers on the card's Image layer; why the update had not come in |
| [Checkbox](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1097-63652) | v1.0 | 2026-10-08 | Published |  | 2026-09-22 · ORA on tablet and mobile; the all-content example covers the whole catalogue |
| [Content divider](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1252-126874) | v1.0 | 2026-10-08 | Published |  | 2026-09-24 · Course Detail: every tab on mobile; tokens and components audited |
| [Horizontal tabs](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1118-69893) | v1.0 | 2026-10-08 | Published |  | 2026-10-07 · DS: Button publishable again, tabs already on Badge v2, Course Card measured |
| [Icon Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-7720) | v2.0 | 2026-10-08 | Published, on no screen yet |  | 2026-10-07 · DS: Button publishable again, tabs already on Badge v2, Course Card measured |
| [Input field](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1090-57817) | v1.0 | 2026-10-08 | Published |  | 2026-10-08 · DS: `Program-Card` without the cohort, week and lesson counters |
| [Link Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-7679) | v2.0 | 2026-10-08 | Published, on no screen yet |  | 2026-10-07 · DS: Button publishable again, tabs already on Badge v2, Course Card measured |
| [Loading indicator](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1192-610) | v1.0 | 2026-10-08 | Published |  | — |
| [Progress bar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1085-57382) | v1.0 | 2026-10-08 | Published |  | 2026-08-05 · The quiz nav adopted across the sections |
| [Radio group item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=124-2838) | v1.0 | 2026-10-08 | Published |  | — |
| [Select](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=85-1269) (page) | v1.0 | 2026-10-08 | Published |  | 2026-09-10 · Mobile tabs stay tabs, and the touch target gets bigger |
| [Tag](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20837-1793) | v1.0 | 2026-10-08 | Published |  | 2026-10-08 · DS: `Program-Card` without the cohort, week and lesson counters |
| [Textarea input field](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1238-278) | v1.0 | 2026-10-08 | Published |  | 2026-10-06 · `LMS / Note Editor` built in the DS (not published yet) |
| [Toast](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21089-1214) | v1.0 | 2026-10-08 | Published |  | — |
| [Toggle](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1102-4208) | v1.0 | 2026-10-08 | Published |  | — |
| [Tooltip](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1052-489) | v1.0 | 2026-10-08 | Published |  | 2026-10-07 · DS: Button publishable again, tabs already on Badge v2, Course Card measured |
| [Video player 16:9](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=9264-576771) | v1.0 | 2026-10-08 | Published |  | — |

## Buttons: two generations

Checked on 8 Oct 2026 by resolving the button instances on the screens and comparing component keys with the
library's Buttons page.

- **The screens use the previous generation**: `Buttons/Button` (1 559 instances on the ten pages counted),
  `Buttons/Button utility` (342) and `Buttons/Button close X` (185). Its properties are `Size`, `Hierarchy`
  (Primary, Secondary, Tertiary, Link color, Link gray), `State` and `Icon only`.
- **The library has Button V2**: `Button`, `Link Button` and `Icon Button` (`Type` Brand / Destructive / Success ×
  `Hierarchy` × `State`, size on a nested structure). They are different components, with different keys, and
  **no instance on the ten pages uses them**.
- **The previous generation is no longer served by the library**: importing `Buttons/Button` and
  `Buttons/Button utility` by key fails (a published component imports fine in the same test). The instances keep
  working, but they cannot receive an update. `Buttons/Button close X` was not tested.

How one maps to the other (from the Button V2 review of 24 Sep 2026):

| On the screens (previous generation) | In Button V2 | Seen on the four Ready for Dev pages* |
|---|---|---:|
| `Buttons/Button`, Hierarchy Primary | `Button`, Brand, Primary | 219 |
| `Buttons/Button`, Hierarchy Secondary | `Button`, Brand, Secondary | 182 |
| `Buttons/Button`, Hierarchy Tertiary (neutral grey outline) | **no equivalent**: V2 Tertiary is a brand ghost button | 89 |
| `Buttons/Button`, Link color | `Link Button`, Primary | 21 |
| `Buttons/Button`, Link gray | `Link Button`, Secondary | 9 |
| `Buttons/Button`, Icon only = True | `Icon Button` (Secondary 31; the 31 Tertiary have the same gap as above) | 62 |
| `Buttons/Button utility` (xs / sm, with an Active state) | **no equivalent** | 38 |
| `Buttons/Button close X` (also on dark) | **no equivalent** | 14 |

\* Instances whose layer still carries the component's name on Video, Quizzes, Reading and Platform Pages Ready
for Dev; buttons nested under another layer name (for example inside a card) are not in this column.

**What this means for engineering:** a story built from Button V2 does not match what the Ready for Dev screens
show wherever the screen has a grey-outline Tertiary, a utility button or a close button. Until the screens are
migrated or V2 gains those cases, the screens are the reference for how a button looks; V2 is the reference for
the property names. The migration itself is not planned yet: it is a decision for Nelson.

## History

| Date | Component | Version | What changed |
|---|---|---|---|
| 2026-10-08 | all | baseline | Versions start here: `1.0`, and `2.0` for `Badge v2` and the `Button` family (`Button`, `Link Button`, `Icon Button`). |
| 2026-10-08 | Button family | no bump | Register corrected: the screens use the previous generation (`Buttons/Button`), not Button V2. See *Buttons: two generations*. |
| 2026-10-08 | 74 LMS components | no bump | Renamed to `LMS/ICP/…` and `LMS/Platform/…`; Discovery and course-end components moved to the platform page; six components moved to *In review*. |

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
| `LMS / Course Card` | `LMS/Platform/Discovery/Course-Card` |
| `LMS / Course Row` | `LMS/Platform/Discovery/Course-Row` |
| `LMS / Course Type Badge` | `LMS/Platform/Discovery/Course-Type-Badge` |
| `LMS / Delivery Mode Badge` | `LMS/Platform/Discovery/Delivery-Mode-Badge` |
| `LMS / Difficulty Badge` | `LMS/Platform/Discovery/Difficulty-Badge` |
| `LMS / Difficulty · Level Icon` | `LMS/Platform/Discovery/Difficulty-Level-Icon` |
| `LMS / Provider-Partner Badge` | `LMS/Platform/Discovery/Provider-Partner-Badge` |
