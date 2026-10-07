# SKO DS components used in the ICP and LMS screens

Source: Figma file "LMS-ICP Phase 1" (`Wz2TCYFVr0hD8tJNiLajLt`), read on 6 Oct 2026; section 1b and section 7 re-read the same day after the 35 platform components moved to the DS (the other sections were not recounted). Every instance on the pages below was resolved to its main component; "DS" means the main component comes from the published library (remote), not from this file.

**Pages counted**

- **ICP (6):** Video Lessons, Quizzes, Reading (Ready for Dev); Topic Content Types Discovery, Overlay Panels, Completion + Certificate (Ready for Review).
- **LMS (3):** Platform Pages (Ready for Dev), Platform Pages V8 (WIP), LMS / Course Detail — Components.
- **Not counted:** DISCOVERY - NelsonJ, ARCHIVE, Diagram Flows, the Mobile App file.

Counts are instances. The LMS Ready for Dev page repeats the WIP screens as handoff cards, so LMS counts are roughly doubled; read them as "where it is used", not as a census.

## Summary

| Group | Components | Only ICP | Only LMS | Both |
|---|---:|---:|---:|---:|
| LMS product components (`LMS / …`) | 67 | 38 | 8 | 21 |
| LMS platform components (`LMS/Platform/…`, section 1b) | 32 | 0 | 32 | 0 |
| Base DS components | 27 | 8 | 8 | 11 |
| Icons | 62 | 19 | 14 | 29 |
| Logos | 5 | | | |
| Private bases (`_…`, never placed by hand) | 14 | | | |

## 1. LMS product components (67)

| Component | Used in | ICP | LMS | Placed directly | Nested in another component |
|---|---|---:|---:|---:|---:|
| LMS / Quiz · Option Row | ICP | 913 | 0 | 13 | 900 |
| LMS / Topic-Types Badge | ICP + LMS | 584 | 240 | 84 | 740 |
| LMS / Completion Status | ICP + LMS | 509 | 134 | 12 | 631 |
| LMS / Topic Row | ICP + LMS | 509 | 14 | 0 | 523 |
| LMS / Course Progression Button | ICP + LMS | 286 | 4 | 4 | 286 |
| LMS / Quiz · Question Card | ICP | 286 | 0 | 286 | 0 |
| LMS / Module Header | ICP + LMS | 231 | 6 | 0 | 237 |
| LMS / Module Info | ICP + LMS | 231 | 6 | 0 | 237 |
| LMS / Quiz · Footer Actions | ICP | 232 | 0 | 31 | 201 |
| LMS / Inline Alert | ICP + LMS | 217 | 4 | 24 | 197 |
| LMS / Lesson Header | ICP + LMS | 140 | 24 | 6 | 158 |
| LMS / Provider-Partner Badge | ICP + LMS | 77 | 57 | 1 | 133 |
| LMS / Delivery Mode Badge | LMS | 0 | 134 | 11 | 123 |
| LMS / Topic Header | ICP + LMS | 131 | 2 | 133 | 0 |
| LMS (the Topic Footer Nav set, misnamed) | ICP + LMS | 126 | 2 | 128 | 0 |
| LMS / Course Player Topbar | ICP + LMS | 118 | 2 | 120 | 0 |
| LMS / Transcript Line | ICP + LMS | 108 | 12 | 120 | 0 |
| LMS / Lesson Block | ICP | 118 | 0 | 117 | 1 |
| LMS / AI Panel | ICP + LMS | 115 | 2 | 117 | 0 |
| LMS / Content Feedback | ICP + LMS | 114 | 2 | 116 | 0 |
| LMS / Sidebar-ICP | ICP + LMS | 106 | 2 | 108 | 0 |
| LMS / Course Type Badge | LMS | 0 | 99 | 16 | 83 |
| LMS / Overall Progress | ICP + LMS | 79 | 9 | 1 | 87 |
| LMS / Difficulty Badge | LMS | 0 | 88 | 5 | 83 |
| LMS / Difficulty · Level Icon | LMS | 0 | 87 | 0 | 87 |
| LMS / Sidebar / Course Header | ICP + LMS | 77 | 2 | 0 | 79 |
| LMS / Progress Circle | ICP + LMS | 75 | 2 | 0 | 77 |
| LMS / Course Card | LMS | 0 | 49 | 42 | 7 |
| LMS / Quiz · Stepper Bar | ICP | 45 | 0 | 2 | 43 |
| LMS / File Item | ICP | 37 | 0 | 37 | 0 |
| LMS / Footnote | LMS | 0 | 32 | 28 | 4 |
| LMS / Topic · Author & Updated Date | ICP | 26 | 0 | 26 | 0 |
| LMS / Quiz · Results | ICP | 25 | 0 | 25 | 0 |
| LMS / Drag and Drop · Item | ICP | 24 | 0 | 6 | 18 |
| LMS / Quiz · Gate | ICP | 21 | 0 | 21 | 0 |
| LMS / Quiz · Entry Header | ICP | 21 | 0 | 21 | 0 |
| LMS / Quiz · Answer Input | ICP | 21 | 0 | 15 | 6 |
| LMS / ORA · Stepper | ICP | 20 | 0 | 20 | 0 |
| LMS / Drag and Drop · Zone | ICP | 20 | 0 | 5 | 15 |
| LMS / Note Item | ICP | 19 | 0 | 19 | 0 |
| LMS / Course Row | LMS | 0 | 18 | 18 | 0 |
| LMS / Quiz · Grade Summary | ICP + LMS | 3 | 6 | 9 | 0 |
| LMS / ORA · Text Response | ICP | 8 | 0 | 8 | 0 |
| LMS / Lab · File Row | ICP | 8 | 0 | 8 | 0 |
| LMS / Sync to Video Button | ICP + LMS | 5 | 2 | 7 | 0 |
| LMS / ORA · Upload | ICP | 6 | 0 | 6 | 0 |
| LMS / Quiz · Exam Timer | ICP | 6 | 0 | 6 | 0 |
| LMS / Drag and Drop · Card | ICP | 5 | 0 | 5 | 0 |
| LMS / Activity · SCORM Frame | ICP | 5 | 0 | 5 | 0 |
| LMS / Course Card_Remove | LMS | 0 | 5 | 5 | 0 |
| LMS / Empty State | ICP | 4 | 0 | 4 | 0 |
| LMS / Zooming Image | ICP | 4 | 0 | 4 | 0 |
| LMS / ORA · Rubric Criterion | ICP | 4 | 0 | 4 | 0 |
| LMS / VILT · Stage Stepper | ICP | 3 | 0 | 3 | 0 |
| LMS / VILT · Session Meta | ICP | 3 | 0 | 1 | 2 |
| LMS / Numbered Step | ICP | 3 | 0 | 3 | 0 |
| LMS / Podcast · Chapter Row | ICP | 3 | 0 | 3 | 0 |
| LMS / ORA · Waiting Panel | ICP | 3 | 0 | 3 | 0 |
| LMS / Course Complete Modal | ICP | 3 | 0 | 3 | 0 |
| LMS / Course Certificate | ICP | 3 | 0 | 3 | 0 |
| LMS / VILT · Session Card | ICP | 2 | 0 | 2 | 0 |
| LMS / VILT · Stage Surface | ICP | 2 | 0 | 2 | 0 |
| LMS / ORA · Grade Panel | ICP | 2 | 0 | 2 | 0 |
| LMS / Lab · Prerequisites | ICP | 1 | 0 | 1 | 0 |
| LMS / Podcast · Player | ICP | 1 | 0 | 1 | 0 |
| LMS / Autosave Status | ICP | 1 | 0 | 1 | 0 |
| LMS / ORA · Submit Gate | ICP | 1 | 0 | 1 | 0 |

## 1b. LMS platform components (`LMS/Platform/…`): in the DS since 6 Oct 2026

Until 6 Oct these were local components of this file (old section 7). They now live on the DS page
`❖ LMS PLATFORM COMPONENTS`, published, and every instance below resolves to the library (re-read 6 Oct, after the
relink; 1242 instances, none on a local main). The library holds 35; 32 are placed on these pages. All
are used on the LMS pages only, none on the ICP pages.

| Component | Ready for Dev | WIP | Components page | Placed directly | Nested in another component |
|---|---:|---:|---:|---:|---:|
| LMS/Platform/Course-Detail/Week-Day | 105 | 112 | 0 | 0 | 217 |
| LMS/Platform/Course-Detail/Meta | 51 | 74 | 27 | 0 | 152 |
| LMS/Platform/Navigation/Topbar-Item | 45 | 70 | 0 | 0 | 115 |
| LMS/Platform/Course-Detail/Topic-Row | 27 | 36 | 24 | 24 | 63 |
| LMS/Platform/Dashboard/Stat | 36 | 36 | 0 | 48 | 24 |
| LMS/Platform/Course-Detail/Date-Row | 27 | 27 | 0 | 54 | 0 |
| LMS/Platform/Navigation/Topbar | 24 | 29 | 0 | 53 | 0 |
| LMS/Platform/Course-Detail/Weekly-Goal-Card | 21 | 22 | 0 | 43 | 0 |
| LMS/Platform/Course-Detail/Sidebar-Card | 15 | 27 | 0 | 42 | 0 |
| LMS/Platform/Course-Detail/Module-Row | 12 | 20 | 3 | 31 | 4 |
| LMS/Platform/Course-Detail/Module-Number | 12 | 20 | 3 | 0 | 35 |
| LMS/Platform/Course-Detail/Course-Title | 12 | 18 | 0 | 1 | 29 |
| LMS/Platform/Course-Detail/Course-Stats | 12 | 18 | 0 | 1 | 29 |
| LMS/Platform/Course-Detail/Progress-Card | 12 | 18 | 0 | 1 | 29 |
| LMS/Platform/Course-Detail/Course-Header | 12 | 17 | 0 | 29 | 0 |
| LMS/Platform/Course-Detail/Message | 12 | 16 | 0 | 28 | 0 |
| LMS/Platform/Course-Detail/Thread-Row | 12 | 12 | 0 | 24 | 0 |
| LMS/Platform/Dashboard/Jump-Tile | 12 | 12 | 0 | 24 | 0 |
| LMS/Platform/Completion/Certificate-Card | 10 | 9 | 0 | 19 | 0 |
| LMS/Platform/Dashboard/Section-Header | 9 | 9 | 0 | 18 | 0 |
| LMS/Platform/Dashboard/Due-Item | 9 | 9 | 0 | 18 | 0 |
| LMS/Platform/My-Learning/Program-Card | 8 | 8 | 0 | 16 | 0 |
| LMS/Platform/Course-Detail/Lock | 6 | 8 | 1 | 0 | 15 |
| LMS/Platform/Course-Detail/Section-Intro | 3 | 8 | 0 | 11 | 0 |
| LMS/Platform/Program-Detail/Course-Row | 0 | 7 | 0 | 7 | 0 |
| LMS/Platform/Course-Detail/Completion-Card | 3 | 3 | 0 | 6 | 0 |
| LMS/Platform/Dashboard/Glance-Card | 3 | 3 | 0 | 6 | 0 |
| LMS/Platform/Dashboard/Streak-Card | 3 | 3 | 0 | 6 | 0 |
| LMS/Platform/Dashboard/Resume-Row | 3 | 3 | 0 | 6 | 0 |
| LMS/Platform/My-Learning/Browse-Tile | 3 | 3 | 0 | 6 | 0 |
| LMS/Platform/Completion/Certificate-Document | 1 | 1 | 3 | 3 | 2 |
| LMS/Platform/Course-Detail/Card-Shell | 0 | 3 | 0 | 3 | 0 |

## 2. Base DS components (27)

| Component | Used in | ICP | LMS | Placed directly | Nested in another component |
|---|---|---:|---:|---:|---:|
| Badge v2 | ICP + LMS | 890 | 844 | 82 | 1652 |
| Buttons/Button | ICP + LMS | 967 | 322 | 137 | 1152 |
| Checkbox | ICP | 915 | 0 | 2 | 913 |
| Buttons/Button utility | ICP + LMS | 275 | 4 | 0 | 279 |
| Avatar | ICP + LMS | 143 | 105 | 8 | 240 |
| Progress bar | ICP + LMS | 48 | 138 | 28 | 158 |
| Buttons/Button close X | ICP + LMS | 121 | 17 | 0 | 138 |
| Vertical Scroll | ICP + LMS | 130 | 2 | 132 | 0 |
| Avatar label group | ICP + LMS | 79 | 29 | 3 | 105 |
| Horizontal tabs | ICP + LMS | 36 | 48 | 84 | 0 |
| Input field | ICP + LMS | 12 | 49 | 52 | 9 |
| Video player 16:9 | ICP + LMS | 49 | 2 | 33 | 18 |
| Radio group item | LMS | 0 | 36 | 6 | 30 |
| Breadcrumbs | LMS | 0 | 34 | 5 | 29 |
| Alert | LMS | 0 | 22 | 22 | 0 |
| Button group | LMS | 0 | 22 | 22 | 0 |
| Featured icon outline | LMS | 0 | 21 | 0 | 21 |
| Content divider | LMS | 0 | 18 | 18 | 0 |
| Textarea input field | ICP | 14 | 0 | 6 | 8 |
| Badge (V1) | ICP | 12 | 0 | 0 | 12 |
| Badge-V1-to-remove | ICP | 12 | 0 | 12 | 0 |
| Toggle | LMS | 0 | 12 | 2 | 10 |
| Tag | ICP | 6 | 0 | 0 | 6 |
| Tooltip | LMS | 0 | 5 | 2 | 3 |
| Toast | ICP | 3 | 0 | 3 | 0 |
| Select | ICP | 3 | 0 | 0 | 3 |
| Loading indicator | ICP | 1 | 0 | 1 | 0 |

## 3. Icons (62)

| Icon | ICP | LMS |
|---|---:|---:|
| check | 272 | 158 |
| bookmark | 396 | 18 |
| chevron-down | 252 | 77 |
| play | 207 | 70 |
| x-close | 232 | 17 |
| thumbs-up | 228 | 4 |
| lock-01 | 199 | 30 |
| book-open-01 | 112 | 91 |
| arrow-right | 131 | 49 |
| bell-01 | 118 | 57 |
| alert-triangle | 120 | 8 |
| edit-02 | 88 | 4 |
| chevron-right | 10 | 74 |
| sidebar-expand-collapse-toggle | 77 | 2 |
| clock | 3 | 75 |
| help-circle | 67 | 10 |
| award-01 | 65 | 8 |
| lightbulb-02 | 64 | 2 |
| check-circle | 60 | 3 |
| alert-octagon | 56 | 1 |
| x-circle | 54 | 0 |
| calendar-check-01 | 0 | 49 |
| list | 39 | 8 |
| chevron-left | 45 | 0 |
| search-md | 0 | 42 |
| arrow-left | 31 | 2 |
| download-01 | 32 | 0 |
| menu-02 | 0 | 31 |
| plus | 21 | 9 |
| alert-circle | 17 | 13 |
| video-recorder | 8 | 17 |
| key-01 | 21 | 0 |
| plus-circle | 0 | 18 |
| lightbulb-01 | 15 | 0 |
| message-chat-circle | 0 | 15 |
| calendar | 7 | 6 |
| dots-grid | 13 | 0 |
| info-circle | 3 | 8 |
| clock-stopwatch | 10 | 0 |
| announcement-02 | 0 | 8 |
| calendar-plus-01 | 0 | 8 |
| grid-01 | 0 | 8 |
| briefcase-01 | 0 | 7 |
| eye | 0 | 7 |
| dots-horizontal | 0 | 7 |
| hourglass-01 | 6 | 0 |
| user-01 | 0 | 6 |
| layout-alt-01 | 5 | 0 |
| atom-01 | 2 | 3 |
| chevron-up | 1 | 2 |
| message-circle-01 | 3 | 0 |
| stars-01 | 3 | 0 |
| share-07 | 3 | 0 |
| file-download-03 | 3 | 0 |
| align-left | 2 | 0 |
| tv-02 | 2 | 0 |
| cube-02 | 2 | 0 |
| music-note-01 | 2 | 0 |
| users-01 | 2 | 0 |
| minus-circle | 0 | 2 |
| arrow-narrow-right | 1 | 0 |
| building-07 | 0 | 1 |

## 4. Logos

| Component | Used in | ICP | LMS | Placed directly | Nested in another component |
|---|---|---:|---:|---:|---:|
| Skillup_logo | ICP + LMS | 118 | 83 | 11 | 190 |
| Logo_text | ICP + LMS | 118 | 83 | 0 | 201 |
| LogoSKO/SKO- Brandmark-Color-Filled | ICP + LMS | 105 | 83 | 0 | 188 |
| Placeholder Logo | LMS | 0 | 76 | 20 | 56 |
| LogoSKO/SKO- Brandmark-Color-white | ICP | 13 | 0 | 0 | 13 |

## 5. Private bases

These sit inside the public components above (Badge v2, Checkbox, tabs, video player, …). Listed so the library keeps them published.

| Component | Used in | ICP | LMS | Placed directly | Nested in another component |
|---|---|---:|---:|---:|---:|
| _Badge base | ICP + LMS | 890 | 839 | 0 | 1729 |
| _Checkbox base | ICP + LMS | 915 | 36 | 0 | 951 |
| _Video action button | ICP + LMS | 277 | 14 | 0 | 291 |
| _Tab button base | ICP + LMS | 111 | 158 | 0 | 269 |
| _Breadcrumb button base | LMS | 0 | 84 | 0 | 84 |
| _Video overlay action | ICP + LMS | 49 | 2 | 0 | 51 |
| _Video actions bar | ICP + LMS | 49 | 2 | 0 | 51 |
| _Button group base | LMS | 0 | 34 | 0 | 34 |
| _FAQ item | LMS | 0 | 20 | 20 | 0 |
| _Video volume slider | ICP + LMS | 16 | 2 | 0 | 18 |
| _Video volume slider handle | ICP + LMS | 16 | 2 | 0 | 18 |
| _Toggle base | LMS | 0 | 12 | 0 | 12 |
| _Dot | LMS | 0 | 7 | 0 | 7 |
| _Tag close X | ICP | 6 | 0 | 0 | 6 |

## 6. Handoff and documentation components (not product UI)

| Component | Used in | ICP | LMS | Placed directly | Nested in another component |
|---|---|---:|---:|---:|---:|
| Recent Changes - Topics | ICP + LMS | 141 | 56 | 0 | 197 |
| Handoff card header | ICP + LMS | 99 | 28 | 8 | 119 |
| Handoff card header + Subheader | ICP + LMS | 91 | 28 | 119 | 0 |
| Handoff / Phase Badge | ICP + LMS | 91 | 28 | 0 | 119 |
| Version-Control | ICP + LMS | 91 | 28 | 0 | 119 |
| Info Labels | ICP + LMS | 91 | 28 | 0 | 119 |
| Handoff / Page Changelog Header | ICP + LMS | 91 | 28 | 119 | 0 |
| Status/Done | ICP + LMS | 67 | 17 | 0 | 84 |
| _iPhone mockup status bar | ICP + LMS | 37 | 16 | 53 | 0 |
| Topic-Status-Badge | ICP | 34 | 0 | 30 | 4 |
| Status/In progress | ICP + LMS | 19 | 11 | 0 | 30 |
| Icon / figma | LMS | 0 | 28 | 0 | 28 |
| Status/In review | ICP | 5 | 0 | 0 | 5 |

## 7. Not in the DS: local components of this file

The 35 platform components that were listed here moved to the DS on 6 Oct 2026 (section 1b). What is still local:

- A local set named `LMS` (`6207:256263`): 11 uses, Platform Pages V8 (WIP). It is the **platform sidebar** (variants `Sidebar-LMS`, `Sidebar-Empty`), not the Topic Footer Nav: only the name is the same as the DS footer set.
- `_iPhone mockup home` (45) and one `_iPhone mockup status bar`: device chrome, not product UI.
- `Worklist checkbox` (25, ICP review pages).

## Things this list shows

- **Three components to retire are still in use:** `Badge-V1-to-remove` (12, Overlay Panels), `Badge` V1 (12 on Video Lessons, all inside the DS `_Tab button base`: a DS fix, not a page fix), `LMS / Course Card_Remove` (5, Platform WIP).
- **The Topic Footer Nav set is named just "LMS"** in the library (128 uses).
- **ICP and LMS share little beyond the atoms:** of the 67 `LMS / …` components, 21 are used in both areas.
- **The platform components are in the library now** (section 1b): no local `LMS/Platform/…` main is left on the three LMS pages.
- **Handoff audit, 6 Oct:** 19 `LMS / …` components got a description, and raw spacing and radius values inside 21 of them were bound to tokens. What is still raw is listed in `LMS-HANDOFF/CHANGELOG.md`.
- **Video Lessons, 6 Oct (late):** the local Topic Footer Nav and its Progression Button (4 each) were swapped to the DS ones, and the note editor is the new DS `LMS / Note Editor` (6 instances). Counts in sections 1 to 5 predate this.
