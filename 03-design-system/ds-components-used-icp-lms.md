# SKO DS components used in the ICP and LMS screens

The names are the ones in use since 8 Oct 2026. The map from the old names to these is at the end of [`component-versions.md`](component-versions.md).

Source: Figma file "LMS-ICP Phase 1" (`Wz2TCYFVr0hD8tJNiLajLt`), first read on 6 Oct 2026, recounted in full on 8 Oct 2026, one read per page with the Figma Plugin API. Every instance on the pages below (27 832) was resolved to its main component, hidden instances included; "DS" means the main component comes from the published library (remote), not from this file.

**Pages counted**

- **ICP (7):** Video Lessons, Quizzes, Reading (Ready for Dev); Topic Content Types Discovery, Overlay Panels, Completion + Certificate, Lab · Third-party platforms (Ready for Review). The Lab page is new in this count.
- **LMS (3):** Platform Pages (Ready for Dev), Platform Pages V8 (WIP), LMS / Course Detail — Components.
- **Not counted:** DISCOVERY - NelsonJ, ARCHIVE, Diagram Flows, the Mobile App file.

Counts are instances. The LMS Ready for Dev page repeats the WIP screens as handoff cards, so LMS counts are roughly doubled, and the Lab page holds 33 handoff cards of the lab screens. Read the counts as "where it is used", not as a census.

## Summary

| Group | Components | Only ICP | Only LMS | Both |
|---|---:|---:|---:|---:|
| LMS product components (`LMS/ICP/…` and the `LMS / …` not renamed yet) | 66 | 40 | 3 | 23 |
| LMS platform components (`LMS/Platform/…`, section 1b) | 40 | 2 | 17 | 21 |
| Base DS components | 28 | 9 | 4 | 15 |
| Icons | 61 | 20 | 6 | 35 |
| Logos | 5 | | | |
| Private bases (`_…`, never placed by hand) | 16 | | | |

## 1. LMS product components (66)

The course player family, `LMS/ICP/<Group>/<Component>` (59 placed), and the seven components still named `LMS / …`: five that were left unrenamed on purpose, and two old components that are still placed (see "Things this list shows").

| Component | Used in | ICP | LMS | Placed directly | Nested in another component |
|---|---|---:|---:|---:|---:|
| LMS/ICP/Content/Topic-Types-Badge | ICP + LMS | 746 | 317 | 78 | 985 |
| LMS/ICP/Assessment/Option-Row | ICP | 913 | 0 | 13 | 900 |
| LMS/ICP/Sidebar/Completion-Status | ICP + LMS | 643 | 189 | 0 | 832 |
| LMS/ICP/Sidebar/Topic-Row | ICP + LMS | 563 | 14 | 0 | 577 |
| LMS/ICP/Player/Course-Progression-Button | ICP + LMS | 374 | 4 | 4 | 374 |
| LMS/ICP/Sidebar/Module-Header | ICP + LMS | 285 | 6 | 0 | 291 |
| LMS/ICP/Sidebar/Module-Info | ICP + LMS | 285 | 6 | 0 | 291 |
| LMS/ICP/Assessment/Question-Card | ICP | 286 | 0 | 286 | 0 |
| LMS / Inline Alert | ICP + LMS | 261 | 9 | 73 | 197 |
| LMS/ICP/Assessment/Footer-Actions | ICP | 232 | 0 | 31 | 201 |
| LMS/ICP/Sidebar/Lesson-Header | ICP + LMS | 174 | 34 | 0 | 208 |
| LMS/ICP/Content/Topic-Header | ICP + LMS | 167 | 2 | 169 | 0 |
| LMS/ICP/Player/Topic-Footer-Nav | ICP + LMS | 166 | 2 | 168 | 0 |
| LMS/ICP/Sidebar/Bookmark | ICP + LMS | 157 | 4 | 0 | 161 |
| LMS/ICP/Player/Vertical-Scroll | ICP + LMS | 157 | 2 | 159 | 0 |
| LMS/ICP/Content/Content-Feedback | ICP + LMS | 150 | 2 | 152 | 0 |
| LMS/ICP/Player/Topbar | ICP + LMS | 145 | 2 | 147 | 0 |
| LMS/ICP/AI/AI-Panel | ICP + LMS | 142 | 2 | 144 | 0 |
| LMS/ICP/Sidebar/Sidebar | ICP + LMS | 133 | 2 | 135 | 0 |
| LMS/ICP/Content/Transcript-Line | ICP + LMS | 108 | 12 | 120 | 0 |
| LMS/ICP/Topics/Lesson-Block | ICP | 118 | 0 | 117 | 1 |
| LMS/ICP/Content/Numbered-Step | ICP | 111 | 0 | 111 | 0 |
| LMS/ICP/Sidebar/Overall-Progress | ICP + LMS | 97 | 8 | 0 | 105 |
| LMS/ICP/Sidebar/Collapse-Toggle | ICP + LMS | 95 | 2 | 0 | 97 |
| LMS/ICP/Sidebar/Course-Header | ICP + LMS | 95 | 2 | 0 | 97 |
| LMS / Progress Circle | ICP + LMS | 93 | 2 | 0 | 95 |
| LMS/ICP/Content/Author-and-Updated-Date | ICP | 62 | 0 | 62 | 0 |
| LMS/ICP/Content/Topic-Status-Badge | ICP | 58 | 0 | 46 | 12 |
| LMS/ICP/Assessment/Stepper-Bar | ICP | 45 | 0 | 2 | 43 |
| LMS/ICP/Content/File-Item | ICP | 37 | 0 | 37 | 0 |
| LMS/ICP/Topics/Lab-Prerequisites | ICP | 37 | 0 | 37 | 0 |
| LMS/ICP/Topics/Lab-Launch-Card | ICP | 32 | 0 | 32 | 0 |
| LMS / Footnote | LMS | 0 | 30 | 24 | 6 |
| LMS/ICP/Assessment/Results | ICP | 25 | 0 | 25 | 0 |
| LMS/ICP/Assessment/Drag-and-Drop-Item | ICP | 24 | 0 | 6 | 18 |
| LMS/ICP/Assessment/Entry-Header | ICP | 21 | 0 | 21 | 0 |
| LMS/ICP/Assessment/Gate | ICP | 21 | 0 | 21 | 0 |
| LMS/ICP/Assessment/Drag-and-Drop-Zone | ICP | 20 | 0 | 5 | 15 |
| LMS/ICP/Topics/ORA-Stepper | ICP | 20 | 0 | 20 | 0 |
| LMS/ICP/Content/Note-Item | ICP | 19 | 0 | 19 | 0 |
| LMS/ICP/Assessment/Answer-Input | ICP | 12 | 0 | 6 | 6 |
| LMS / Quiz · Answer Input | ICP | 9 | 0 | 9 | 0 |
| LMS/ICP/Assessment/Grade-Summary | ICP + LMS | 3 | 6 | 9 | 0 |
| LMS/ICP/Topics/Lab-File-Row | ICP | 8 | 0 | 8 | 0 |
| LMS/ICP/Topics/ORA-Text-Response | ICP | 8 | 0 | 8 | 0 |
| LMS/ICP/Content/Sync-to-Video-Button | ICP + LMS | 5 | 2 | 7 | 0 |
| LMS/ICP/Assessment/Exam-Timer | ICP | 6 | 0 | 6 | 0 |
| LMS/ICP/Content/Note-Editor | ICP | 6 | 0 | 6 | 0 |
| LMS/ICP/Topics/ORA-Upload | ICP | 6 | 0 | 6 | 0 |
| LMS / Course Card_Remove | LMS | 0 | 5 | 5 | 0 |
| LMS/ICP/Assessment/Drag-and-Drop-Card | ICP | 5 | 0 | 5 | 0 |
| LMS/ICP/Topics/Activity-SCORM-Frame | ICP | 5 | 0 | 5 | 0 |
| LMS / Empty State | ICP | 4 | 0 | 4 | 0 |
| LMS/ICP/Topics/ORA-Rubric-Criterion | ICP | 4 | 0 | 4 | 0 |
| LMS/ICP/Topics/Zooming-Image | ICP | 4 | 0 | 4 | 0 |
| LMS/ICP/Live/VILT-Session-Meta | ICP | 3 | 0 | 1 | 2 |
| LMS/ICP/Live/VILT-Stage-Stepper | ICP | 3 | 0 | 3 | 0 |
| LMS/ICP/Topics/ORA-Waiting-Panel | ICP | 3 | 0 | 3 | 0 |
| LMS/ICP/Topics/Podcast-Chapter-Row | ICP | 3 | 0 | 3 | 0 |
| LMS/ICP/Live/VILT-Session-Card | ICP | 2 | 0 | 2 | 0 |
| LMS/ICP/Live/VILT-Stage-Surface | ICP | 2 | 0 | 2 | 0 |
| LMS/ICP/Topics/ORA-Grade-Panel | ICP | 2 | 0 | 2 | 0 |
| LMS / Autosave Status | ICP | 1 | 0 | 1 | 0 |
| LMS/ICP/Content/Mobile-Tab-Select | LMS | 0 | 1 | 1 | 0 |
| LMS/ICP/Topics/ORA-Submit-Gate | ICP | 1 | 0 | 1 | 0 |
| LMS/ICP/Topics/Podcast-Player | ICP | 1 | 0 | 1 | 0 |

## 1b. LMS platform components (`LMS/Platform/…`) (40)

The pages around the course player. Since 8 Oct 2026 this family also holds the Discovery components (course card and row, the four badges, the level icon) and the two course-end components, which were in section 1 before. All of them live on the DS page `❖ LMS PLATFORM COMPONENTS`, except `Completion/Certificate-Document-demo`, which is on `❖ LMS · IN REVIEW / NOT FOR BUILD`. Every instance below resolves to the library: 3 372 instances, none on a local main. The library holds 45; 40 are placed on these pages.

The family is no longer on the LMS pages only, so this table has one more column than before, "ICP pages". 601 instances are on ICP pages: the provider badge sits in the course player sidebar, the two course-end components are on Completion + Certificate, and the IBM Course Detail screens are on the Lab and Discovery pages.

| Component | ICP pages | Ready for Dev | WIP | Components page | Placed directly | Nested in another component |
|---|---:|---:|---:|---:|---:|---:|
| LMS/Platform/Course-Detail/Meta | 104 | 187 | 90 | 27 | 0 | 408 |
| LMS/Platform/Course-Detail/Week-Day | 56 | 140 | 91 | 0 | 0 | 287 |
| LMS/Platform/Course-Detail/Topic-Row | 72 | 99 | 36 | 24 | 24 | 207 |
| LMS/Platform/Discovery/Provider-Partner-Badge | 127 | 41 | 49 | 0 | 1 | 216 |
| LMS/Platform/Discovery/Delivery-Mode-Badge | 8 | 90 | 95 | 0 | 1 | 192 |
| LMS/Platform/Navigation/Topbar-Item | 20 | 95 | 70 | 0 | 0 | 185 |
| LMS/Platform/Discovery/Course-Type-Badge | 8 | 73 | 83 | 0 | 12 | 152 |
| LMS/Platform/Course-Detail/Sidebar-Card | 40 | 73 | 39 | 0 | 152 | 0 |
| LMS/Platform/Discovery/Difficulty-Badge | 8 | 73 | 71 | 0 | 0 | 152 |
| LMS/Platform/Discovery/Difficulty-Level-Icon | 8 | 73 | 71 | 0 | 0 | 152 |
| LMS/Platform/Course-Detail/Module-Number | 32 | 56 | 28 | 3 | 0 | 119 |
| LMS/Platform/Course-Detail/Module-Row | 32 | 56 | 28 | 3 | 95 | 24 |
| LMS/Platform/Navigation/Topbar | 8 | 44 | 37 | 0 | 89 | 0 |
| LMS/Platform/Discovery/Course-Card | 0 | 41 | 41 | 0 | 40 | 42 |
| LMS/Platform/Dashboard/Stat | 0 | 36 | 36 | 0 | 48 | 24 |
| LMS/Platform/Course-Detail/Course-Stats | 8 | 32 | 26 | 0 | 1 | 65 |
| LMS/Platform/Course-Detail/Course-Title | 8 | 32 | 26 | 0 | 1 | 65 |
| LMS/Platform/Course-Detail/Progress-Card | 8 | 32 | 26 | 0 | 1 | 65 |
| LMS/Platform/Course-Detail/Course-Header | 8 | 32 | 25 | 0 | 65 | 0 |
| LMS/Platform/Course-Detail/Weekly-Goal-Card | 8 | 29 | 22 | 0 | 59 | 0 |
| LMS/Platform/Course-Detail/Date-Row | 0 | 27 | 27 | 0 | 54 | 0 |
| LMS/Platform/Course-Detail/Lock | 16 | 22 | 8 | 1 | 0 | 47 |
| LMS/Platform/Course-Detail/Section-Intro | 8 | 23 | 16 | 0 | 47 | 0 |
| LMS/Platform/Completion/Certificate-Card | 8 | 24 | 13 | 0 | 45 | 0 |
| LMS/Platform/Program-Detail/Course-Row | 0 | 21 | 21 | 0 | 42 | 0 |
| LMS/Platform/Course-Detail/Message | 0 | 12 | 16 | 0 | 28 | 0 |
| LMS/Platform/Course-Detail/Thread-Row | 0 | 12 | 12 | 0 | 24 | 0 |
| LMS/Platform/Course-Detail/Card-Shell | 0 | 9 | 9 | 0 | 18 | 0 |
| LMS/Platform/Dashboard/Jump-Tile | 0 | 9 | 9 | 0 | 18 | 0 |
| LMS/Platform/Dashboard/Section-Header | 0 | 9 | 9 | 0 | 18 | 0 |
| LMS/Platform/Discovery/Course-Row | 0 | 6 | 12 | 0 | 18 | 0 |
| LMS/Platform/My-Learning/Program-Card | 0 | 8 | 8 | 0 | 16 | 0 |
| LMS/Platform/Dashboard/Due-Item | 0 | 6 | 6 | 0 | 12 | 0 |
| LMS/Platform/Completion/Certificate-Document-demo | 0 | 5 | 3 | 3 | 4 | 7 |
| LMS/Platform/Course-Detail/Completion-Card | 0 | 3 | 3 | 0 | 6 | 0 |
| LMS/Platform/Dashboard/Resume-Row | 0 | 3 | 3 | 0 | 6 | 0 |
| LMS/Platform/Dashboard/Today-at-a-glance | 0 | 3 | 3 | 0 | 6 | 0 |
| LMS/Platform/My-Learning/Browse-Tile | 0 | 3 | 3 | 0 | 6 | 0 |
| LMS/Platform/Completion/Certificate | 3 | 0 | 0 | 0 | 3 | 0 |
| LMS/Platform/Completion/Course-Complete-Modal | 3 | 0 | 0 | 0 | 3 | 0 |

## 2. Base DS components (28)

Names as the instances report them. `Buttons/Button`, `Buttons/Button utility` and `Buttons/Button close X` are the **previous button generation**, not the `Button`, `Link Button` and `Icon Button` of the register (Button V2): different components with different keys. Button V2 is on none of these pages. See *Buttons: two generations* in [`component-versions.md`](component-versions.md).

| Component | Used in | ICP | LMS | Placed directly | Nested in another component |
|---|---|---:|---:|---:|---:|
| Badge v2 | ICP + LMS | 1182 | 1077 | 51 | 2208 |
| Buttons/Button | ICP + LMS | 1134 | 425 | 106 | 1453 |
| Checkbox | ICP | 919 | 0 | 2 | 917 |
| Avatar | ICP + LMS | 238 | 161 | 0 | 399 |
| Buttons/Button utility | ICP + LMS | 338 | 4 | 0 | 342 |
| Progress bar | ICP + LMS | 72 | 176 | 16 | 232 |
| Avatar label group | ICP + LMS | 121 | 65 | 0 | 186 |
| Buttons/Button close X | ICP + LMS | 160 | 25 | 0 | 185 |
| Horizontal tabs | ICP + LMS | 44 | 78 | 122 | 0 |
| Input field | ICP + LMS | 20 | 59 | 70 | 9 |
| Breadcrumbs | ICP + LMS | 8 | 58 | 1 | 65 |
| Video player 16:9 | ICP + LMS | 49 | 2 | 33 | 18 |
| Alert | ICP + LMS | 8 | 30 | 38 | 0 |
| Featured icon outline | ICP + LMS | 8 | 29 | 0 | 37 |
| Radio group item | LMS | 0 | 30 | 0 | 30 |
| Button group | LMS | 0 | 22 | 22 | 0 |
| Textarea input field | ICP | 20 | 0 | 0 | 20 |
| Content divider | LMS | 0 | 18 | 18 | 0 |
| Tooltip | ICP + LMS | 4 | 9 | 0 | 13 |
| Tag | ICP | 12 | 0 | 0 | 12 |
| Toggle | LMS | 0 | 10 | 0 | 10 |
| Background overlay | ICP | 4 | 0 | 0 | 4 |
| Background pattern decorative | ICP | 4 | 0 | 0 | 4 |
| Featured icon | ICP | 4 | 0 | 0 | 4 |
| Modal | ICP | 4 | 0 | 4 | 0 |
| Select | ICP | 3 | 0 | 0 | 3 |
| Toast | ICP | 3 | 0 | 3 | 0 |
| Loading indicator | ICP + LMS | 1 | 1 | 2 | 0 |

## 3. Icons (61)

| Icon | ICP | LMS |
|---|---:|---:|
| check | 336 | 180 |
| chevron-down | 342 | 141 |
| play | 249 | 118 |
| bookmark | 310 | 21 |
| thumbs-up | 300 | 4 |
| x-close | 275 | 25 |
| book-open-01 | 162 | 126 |
| lock-01 | 215 | 37 |
| bell-01 | 153 | 83 |
| arrow-right | 175 | 47 |
| clock | 11 | 177 |
| chevron-right | 46 | 127 |
| alert-triangle | 156 | 8 |
| plus-circle | 0 | 108 |
| help-circle | 75 | 18 |
| edit-02 | 88 | 4 |
| check-circle | 81 | 3 |
| award-01 | 65 | 8 |
| alert-octagon | 64 | 5 |
| lightbulb-02 | 64 | 2 |
| search-md | 8 | 52 |
| atom-01 | 56 | 3 |
| alert-circle | 45 | 13 |
| list | 48 | 8 |
| x-circle | 54 | 1 |
| menu-02 | 4 | 48 |
| link-external-01 | 48 | 0 |
| chevron-left | 45 | 0 |
| arrow-left | 40 | 2 |
| download-01 | 32 | 0 |
| message-chat-circle | 8 | 21 |
| plus | 21 | 8 |
| info-circle | 11 | 16 |
| announcement-02 | 8 | 15 |
| briefcase-01 | 8 | 15 |
| calendar-plus-01 | 8 | 15 |
| eye | 8 | 15 |
| key-01 | 21 | 0 |
| lightbulb-01 | 15 | 0 |
| dots-grid | 13 | 0 |
| minus-circle | 0 | 12 |
| clock-stopwatch | 10 | 0 |
| video-recorder | 8 | 2 |
| grid-01 | 0 | 8 |
| calendar | 7 | 0 |
| calendar-check-01 | 0 | 7 |
| chevron-up | 1 | 6 |
| dots-horizontal | 0 | 7 |
| hourglass-01 | 6 | 0 |
| user-01 | 0 | 6 |
| layout-alt-01 | 5 | 0 |
| file-download-03 | 3 | 0 |
| message-circle-01 | 3 | 0 |
| share-07 | 3 | 0 |
| stars-01 | 3 | 0 |
| align-left | 2 | 0 |
| cube-02 | 2 | 0 |
| music-note-01 | 2 | 0 |
| tv-02 | 2 | 0 |
| users-01 | 2 | 0 |
| arrow-narrow-right | 1 | 0 |

## 4. Logos

| Component | Used in | ICP | LMS | Placed directly | Nested in another component |
|---|---|---:|---:|---:|---:|
| Logo_text | ICP + LMS | 153 | 113 | 0 | 266 |
| Skillup_logo | ICP + LMS | 153 | 113 | 8 | 258 |
| LogoSKO/SKO- Brandmark-Color-Filled | ICP + LMS | 140 | 113 | 0 | 253 |
| Placeholder Logo | ICP + LMS | 16 | 88 | 11 | 93 |
| LogoSKO/SKO- Brandmark-Color-white | ICP | 13 | 0 | 0 | 13 |

## 5. Private bases

These sit inside the public components above (Checkbox, tabs, video player, breadcrumbs, modal, …). Listed so the library keeps them published.

| Component | Used in | ICP | LMS | Placed directly | Nested in another component |
|---|---|---:|---:|---:|---:|
| _Checkbox base | ICP + LMS | 919 | 30 | 0 | 949 |
| _Tab button base | ICP + LMS | 143 | 280 | 0 | 423 |
| _Video action button | ICP + LMS | 277 | 14 | 0 | 291 |
| _Breadcrumb button base | ICP + LMS | 20 | 140 | 0 | 160 |
| _FAQ item | LMS | 0 | 120 | 120 | 0 |
| _Video actions bar | ICP + LMS | 49 | 2 | 0 | 51 |
| _Video overlay action | ICP + LMS | 49 | 2 | 0 | 51 |
| _Badge base | ICP + LMS | 12 | 29 | 0 | 41 |
| _Button group base | LMS | 0 | 34 | 0 | 34 |
| _Video volume slider | ICP + LMS | 16 | 2 | 0 | 18 |
| _Video volume slider handle | ICP + LMS | 16 | 2 | 0 | 18 |
| _Tag close X | ICP | 12 | 0 | 0 | 12 |
| _Toggle base | LMS | 0 | 10 | 0 | 10 |
| _Background mask | ICP | 4 | 0 | 0 | 4 |
| _Modal actions | ICP | 4 | 0 | 0 | 4 |
| _Modal header | ICP | 4 | 0 | 0 | 4 |

## 6. Handoff and documentation components (not product UI)

`Topic-Status-Badge` was in this table. It is now `LMS/ICP/Content/Topic-Status-Badge` and is counted in section 1.

| Component | Used in | ICP | LMS | Placed directly | Nested in another component |
|---|---|---:|---:|---:|---:|
| Recent Changes - Topics | ICP + LMS | 174 | 84 | 0 | 258 |
| Handoff card header | ICP + LMS | 132 | 40 | 8 | 164 |
| Handoff / Page Changelog Header | ICP + LMS | 124 | 40 | 164 | 0 |
| Handoff card header + Subheader | ICP + LMS | 124 | 40 | 164 | 0 |
| Info Labels | ICP + LMS | 124 | 40 | 0 | 164 |
| Version-Control | ICP + LMS | 124 | 40 | 0 | 164 |
| Handoff / Phase Badge | ICP + LMS | 91 | 40 | 0 | 131 |
| Status/Done | ICP + LMS | 67 | 17 | 0 | 84 |
| Status/In progress | ICP + LMS | 52 | 23 | 0 | 75 |
| _iPhone mockup status bar | ICP + LMS | 48 | 26 | 74 | 0 |
| Icon / figma | LMS | 0 | 40 | 0 | 40 |
| Status/In review | ICP | 5 | 0 | 0 | 5 |

## 7. Not in the DS: local components of this file

94 instances on these pages point to a local main. No `LMS/ICP/…` or `LMS/Platform/…` component is local.

- A local set named `LMS` (`6207:256263`): 11 uses, Platform Pages V8 (WIP), all on Course Detail frames (10 in the "Course Detail V10" section, 1 in the "Technical" section). It is the **platform sidebar** (variants `Sidebar-LMS`, `Sidebar-Empty`), and has no `LMS/Platform/…` name yet.
- `_iPhone mockup home` (57, five local copies; one of them, `3785:11586`, has 51) and one local `_iPhone mockup status bar` (Quizzes): device chrome, not product UI.
- `Worklist checkbox` (25, Topic Content Types Discovery).

## Things this list shows

- **The new names are in.** Of the 106 LMS components placed on these pages, 99 carry an `LMS/ICP/…` or `LMS/Platform/…` name. Five keep `LMS / …` on purpose: `Inline Alert` (270), `Progress Circle` (95), `Footnote` (30), `Empty State` (4), `Autosave Status` (1). `LMS / Discussion Prompt` is not placed.
- **Two old components are still placed.** `LMS / Course Card_Remove` (5, Platform WIP, on the frame "My Learning - Courses - List View — archived", `6207:250057`) and `LMS / Quiz · Answer Input` (9, Topic Content Types Discovery, board "03 · Every state — single & multi select", `4998:100173`). The second is not the renamed component: its key differs from `LMS/ICP/Assessment/Answer-Input` (12 uses). Neither is in the register.
- **Old names that are only a stale label.** On that same archived frame, 20 nested badges still read `LMS / Course Type Badge`, `LMS / Provider-Partner Badge`, `LMS / Topic-Types Badge`, `LMS / Delivery Mode Badge`, `LMS / Difficulty Badge` and `LMS / Difficulty · Level Icon`. Their keys are the keys of the renamed components, so they are counted under the current names.
- **Two components on the "In review / not for build" list are on screens.** `LMS/ICP/AI/AI-Panel`: 144 instances (Video 29, Quizzes 66, Reading 20, Lab 27, Platform WIP 2), every one of them hidden. `LMS/Platform/Completion/Certificate-Document-demo`: 11 (Ready for Dev 5, WIP 3, Components page 3). The other four on that list (`Daily Goals`, `Live Attendance`, `Module Time-Left`, `Dashboard/Streak-Card`) are at 0.
- **Ten published components are on none of these pages:** `LMS/ICP/Sidebar/Section-Header`, `LMS/ICP/Content/Thread-Item`, `LMS/ICP/Assessment/Stat-Tile`, `LMS/ICP/Live/Live-Control-Bar`, `LMS/ICP/Live/Live-Now-Banner`, `LMS / Discussion Prompt`, `LMS/Platform/Discovery/Card-Overflow-Menu`, `LMS/Platform/Course-Detail/Grade-Meter`, `LMS/Platform/Course-Detail/Grade-Summary-Row` and `LMS/Platform/Course-Detail/Score-Row`.
- **The two families cross.** 21 of the 40 `LMS/Platform/…` components are also on ICP pages, and 23 of the 66 in section 1 are also on LMS pages. `LMS/Platform/Discovery/Provider-Partner-Badge` is in the course player sidebar (77 instances on Video, Quizzes and Reading). `LMS/ICP/Content/Topic-Types-Badge` (317) and `LMS/ICP/Sidebar/Completion-Status` (189) are on the platform pages.
- **Four parts moved into section 1 with the rename:** `LMS/ICP/Player/Vertical-Scroll` (was a base component), `LMS/ICP/Sidebar/Bookmark` and `LMS/ICP/Sidebar/Collapse-Toggle` (were icons), `LMS/ICP/Content/Topic-Status-Badge` (was a handoff component). The old `bookmark` icon row added two components with the same name: the icon (331 now) and the sidebar bookmark (161 now), which wraps that icon.
- **The Lab page adds 3 091 instances.** Its own components: `LMS/ICP/Topics/Lab-Launch-Card` (24, and 8 on the Discovery page), `LMS/ICP/Topics/Lab-Prerequisites` (27), `LMS/ICP/Content/Numbered-Step` (81). `Modal` and its parts are in the count for the first time (Lab 3, Discovery 1). Its 33 handoff cards have no `Handoff / Phase Badge`; the cards on the other pages have one each.
- **The platform components are all in the library** (section 1b): no local `LMS/Platform/…` main on any page. What is still local is the platform sidebar (section 7).
- **The method reproduces the 7 Oct count.** Components that did not change give the same numbers on the six ICP pages counted then: `Option-Row` 913 (13 direct, 900 nested), `Question-Card` 286, `Footer-Actions` 232, `Topic-Row` 509, `Module-Header` 231, `Sidebar` 106, `AI-Panel` 115, `Topbar` 118, `Lesson-Block` 118. The 7 Oct count included hidden instances too.
- **What moved since 7 Oct, on the same pages.** Without the Lab page, `Topic-Header` went from 131 to 140, `Topic-Footer-Nav` from 130 to 139 and `Content-Feedback` from 114 to 123, which fits the nine lab screens added to the Discovery page (section `05b`). Ready for Dev grew: 40 handoff cards, 28 before. Icons went from 53 to 61 and several counts rose sharply (`play` 4 to 367, `book-open-01` 34 to 288): the topic-type icons are instances inside `Badge v2` (checked on Video Lessons), and on 7 Oct most of them were not in the count.
- **Handoff audit, 6 Oct:** 19 LMS components got a description, and raw spacing and radius values inside 21 of them were bound to tokens. What is still raw is listed in `LMS-HANDOFF/CHANGELOG.md`.
- **Video Lessons:** no local Topic Footer Nav is left (33 instances, all on `LMS/ICP/Player/Topic-Footer-Nav`), and the note editor is `LMS/ICP/Content/Note-Editor` (6).
