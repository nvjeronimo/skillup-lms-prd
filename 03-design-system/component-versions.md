# Component versions

The version of every design system component the ICP and LMS screens use, and the rule for changing it.
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

**Not yet done:** the version is not written in the Figma component descriptions. That is a write to the DS file
and waits for Nelson's go-ahead.

## Register

### LMS product components (ICP and LMS): 79

**1 · Shared**

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [LMS / Autosave Status](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538137) | v1.0 | 2026-10-08 | 4 | 2026-09-08 · Alert recoloured in the library, and a collection called "Remove" |
| [LMS / Completion Status](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536791) | v1.0 | 2026-10-08 | 3 | 2026-09-24 · Module row, atomic: 8 variants → 6, the lock reason is copy |
| [LMS / Empty State](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537992) | v1.0 | 2026-10-08 | 4 | — |
| [LMS / Footnote](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21606-1205) | v1.0 | 2026-10-08 | 1 | 2026-09-30 · Weekly goal card — component handoff, ready for dev |
| [LMS / Inline Alert](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3296) | v1.0 | 2026-10-08 | 6 | 2026-09-10 · Blockquote and Key Takeaways become Lesson Block Kinds |
| [LMS / Numbered Step](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3297) | v1.0 | 2026-10-08 | 1 | — |
| [LMS / Progress Circle](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20377-3832) | v1.0 | 2026-10-08 | 3 | — |
| [LMS / Topic-Types Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536800) | v1.0 | 2026-10-08 | 14 | 2026-10-08 · After another publish: badges read *Label* again in the product file |
| [Topic-Status-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20066-431924) | v1.0 | 2026-10-08 | 3 | 2026-09-09 · Reading gets its screens — 16, across 5 scenario rows |

**2 · Player shell**

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [LMS / Course Player Topbar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537695) | v1.0 | 2026-10-08 | 6 | — |
| [LMS / Course Progression Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537755) | v1.0 | 2026-10-08 | 7 | 2026-08-05 · The mode-A nav was never quiz navigation |
| [LMS / Lesson Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536863) | v1.0 | 2026-10-08 | 1 | 2026-09-24 · Course Detail syllabus: local Topic row, grouped by Lesson Header |
| [LMS / Live Attendance](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536879) | v1.0 | 2026-10-08 | 1 | — |
| [LMS / Module Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536844) | v1.0 | 2026-10-08 | 2 | 2026-09-22 · Text-only Open Response, and an example Reading screen |
| [LMS / Module Info](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21299-7173) | v1.0 | 2026-10-08 | 2 | 2026-09-10 · Blockquote and Key Takeaways swapped onto the components |
| [LMS / Module Time-Left](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536873) | v1.0 | 2026-10-08 | 1 | — |
| [LMS / Overall Progress](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536988) | v1.0 | 2026-10-08 | 3 | 2026-09-11 · The scrollbar rule reaches Video and Quizzes |
| [LMS / Section Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536865) | v1.0 | 2026-10-08 | 1 | 2026-09-10 · Blockquote and Key Takeaways swapped onto the components |
| [LMS / Sidebar / Course Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536868) | v1.0 | 2026-10-08 | 1 | — |
| [LMS / Sidebar-ICP](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536883) | v1.0 | 2026-10-08 | 5 | 2026-09-11 · The scrollbar rule reaches Video and Quizzes |
| [LMS / Topic Footer Nav](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20053-3286) | v1.0 | 2026-10-08 | 1 | 2026-10-08 · DS clean-up, Program icon closed, prototype course-complete gate |
| [LMS / Topic Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537000) | v1.0 | 2026-10-08 | 9 | 2026-09-24 · Course Detail syllabus: local Topic row, grouped by Lesson Header |

**3 · Content & Notes**

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [LMS / Content Feedback](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537661) | v1.0 | 2026-10-08 | 1 | — |
| [LMS / File Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537612) | v1.0 | 2026-10-08 | 4 | — |
| [LMS / Mobile Tab Select](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19995-7247) | v1.0 | 2026-10-08 | 3 | 2026-09-10 · Mobile tabs stay tabs, and the touch target gets bigger |
| [LMS / Note Editor](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22071-6813) | v1.0 | 2026-10-08 | 3 | 2026-10-07 · Prototype critique of the remaining screens; note editor and three rule fixes |
| [LMS / Note Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537594) | v1.0 | 2026-10-08 | 1 | — |
| [LMS / Sync to Video Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20214-1771167) | v1.0 | 2026-10-08 | 2 | — |
| [LMS / Thread Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537651) | v1.0 | 2026-10-08 | 1 | — |
| [LMS / Topic Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537676) | v1.0 | 2026-10-08 | 1 | 2026-09-24 · Badge v2 across the Untitled UI pages; Topic-Types keeps its own colours |
| [LMS / Topic · Author & Updated Date](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20454-705641) | v1.0 | 2026-10-08 | 1 | — |
| [LMS / Transcript Line](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537556) | v1.0 | 2026-10-08 | 4 | — |

**4 · Topic content types**

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [LMS / Activity · SCORM Frame](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3488) | v1.0 | 2026-10-08 | 4 | 2026-10-08 · DS: `LMS / Lab · Launch Card` |
| [LMS / Lab · File Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3330) | v1.0 | 2026-10-08 | 2 | — |
| [LMS / Lab · Launch Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22251-6427) | v1.0 | 2026-10-08 | 4 | 2026-10-08 · Partner labs in the prototype (PR 74); critique leftovers (PR 75) |
| [LMS / Lab · Prerequisites](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3331) | v1.0 | 2026-10-08 | 1 | — |
| [LMS / Lesson Block](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3682) | v1.0 | 2026-10-08 | 12 | 2026-10-07 · DS: the five pending decisions applied (not published) |
| [LMS / Live Control Bar States](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537795) | v1.0 | 2026-10-08 | 2 | — |
| [LMS / Live Now Banner](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537772) | v1.0 | 2026-10-08 | 2 | — |
| [LMS / ORA · Grade Panel](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3634) | v1.0 | 2026-10-08 | 4 | 2026-09-22 · Podcast poster is cover art; ORA covers all five Studio flows |
| [LMS / ORA · Rubric Criterion](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3563) | v1.0 | 2026-10-08 | 2 | — |
| [LMS / ORA · Stepper](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3534) | v1.0 | 2026-10-08 | 10 | 2026-09-22 · Compact ORA Stepper; the Drag and Drop board stops printing its spec |
| [LMS / ORA · Submit Gate](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20344-3359) | v1.0 | 2026-10-08 | 1 | — |
| [LMS / ORA · Text Response](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21692-536524) | v1.0 | 2026-10-08 | 3 | 2026-09-22 · Text-only Open Response, and an example Reading screen |
| [LMS / ORA · Upload](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3584) | v1.0 | 2026-10-08 | 2 | — |
| [LMS / ORA · Waiting Panel](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3591) | v1.0 | 2026-10-08 | 4 | — |
| [LMS / Podcast · Chapter Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3449) | v1.0 | 2026-10-08 | 2 | — |
| [LMS / Podcast · Player](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3337) | v1.0 | 2026-10-08 | 1 | 2026-09-22 · Studio has no audio — podcasts are video now |
| [LMS / VILT · Session Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705637) | v1.0 | 2026-10-08 | 2 | — |
| [LMS / VILT · Session Meta](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705512) | v1.0 | 2026-10-08 | 1 | — |
| [LMS / VILT · Stage Stepper](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705552) | v1.0 | 2026-10-08 | 3 | 2026-09-24 · Badge v2: 453 variants become 120, accents strong, statuses soft |
| [LMS / VILT · Stage Surface](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705648) | v1.0 | 2026-10-08 | 2 | — |
| [LMS / Zooming Image](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21013-7264) | v1.0 | 2026-10-08 | 2 | 2026-10-07 · DS: the five pending decisions applied (not published) |

**5 · Assessments · Quiz**

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [LMS / Discussion Prompt](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537927) | v1.0 | 2026-10-08 | 1 | — |
| [LMS / Drag and Drop · Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20996-8876) | v1.0 | 2026-10-08 | 6 | 2026-09-22 · Compact ORA Stepper; the Drag and Drop board stops printing its spec |
| [LMS / Drag and Drop · Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20995-8506) | v1.0 | 2026-10-08 | 6 | 2026-10-07 · DS: the five pending decisions applied (not published) |
| [LMS / Drag and Drop · Zone](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20996-8526) | v1.0 | 2026-10-08 | 5 | 2026-08-20 · Drag and Drop, the one Studio tile we had never designed |
| [LMS / Quiz · Answer Input](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20494-8896) | v1.0 | 2026-10-08 | 12 | 2026-08-20 · The four gaps the doc sweep found, all closed |
| [LMS / Quiz · Entry Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20318-705389) | v1.0 | 2026-10-08 | 4 | 2026-10-07 · DS: the other 94 nested badges repaired (not published) |
| [LMS / Quiz · Exam Timer](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20488-4773) | v1.0 | 2026-10-08 | 3 | — |
| [LMS / Quiz · Footer Actions](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20647-352944) | v1.0 | 2026-10-08 | 1 | — |
| [LMS / Quiz · Gate](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20490-4813) | v1.0 | 2026-10-08 | 5 | — |
| [LMS / Quiz · Grade Summary](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20416-3129) | v1.0 | 2026-10-08 | 1 | 2026-10-07 · Platform screens: badge texts restored where the update has landed; one badge removed |
| [LMS / Quiz · Option Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20318-705157) | v1.0 | 2026-10-08 | 7 | 2026-08-20 · Drag and Drop, the one Studio tile we had never designed |
| [LMS / Quiz · Question Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20318-705306) | v1.0 | 2026-10-08 | 9 | 2026-08-05 · Full validation — the quiz work closes clean |
| [LMS / Quiz · Results](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20499-6630) | v1.0 | 2026-10-08 | 4 | 2026-10-08 · DS clean-up, Program icon closed, prototype course-complete gate |
| [LMS / Quiz · Stat Tile](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20388-706341) | v1.0 | 2026-10-08 | 3 | — |
| [LMS / Quiz · Stepper Bar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20540-6253) | v1.0 | 2026-10-08 | 2 | 2026-08-05 · Full validation — the quiz work closes clean |

**6 · Course end**

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [LMS / Course Certificate](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537956) | v1.0 | 2026-10-08 | 1 | 2026-10-08 · Three decisions applied: certificate, Course Card thumbnail, first grid card |
| [LMS / Course Complete Modal](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537944) | v1.0 | 2026-10-08 | 1 | 2026-10-07 · DS: the five pending decisions applied (not published) |

**7 · Discovery & My Learning**

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [LMS / Card Overflow Menu](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538064) | v1.0 | 2026-10-08 | 1 | — |
| [LMS / Course Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20888-6124) | v1.0 | 2026-10-08 | 2 | 2026-10-08 · Six loose ends: DS labels and links, prototype type names, quizzes, second critique |
| [LMS / Course Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538010) | v1.0 | 2026-10-08 | 3 | 2026-10-08 · After the publish: the Program headers are in; the Course Card is still not |
| [LMS / Course Type Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538072) | v1.0 | 2026-10-08 | 2 | 2026-10-08 · Six loose ends: DS labels and links, prototype type names, quizzes, second critique |
| [LMS / Delivery Mode Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538084) | v1.0 | 2026-10-08 | 3 | 2026-10-08 · After another publish: badges read *Label* again in the product file |
| [LMS / Difficulty Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538077) | v1.0 | 2026-10-08 | 3 | 2026-10-08 · After another publish: badges read *Label* again in the product file |
| [LMS / Difficulty · Level Icon](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21868-5367) | v1.0 | 2026-10-08 | 3 | 2026-09-23 · Difficulty and delivery badges get icons that mean something |
| [LMS / Provider-Partner Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538091) | v1.0 | 2026-10-08 | 6 | 2026-10-08 · DS: `LMS / Lab · Launch Card` |

**8 · AI Assistant (WIP)**

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [LMS / AI Panel](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538166) | v1.0 | 2026-10-08 | 4 | — |

### LMS platform components: 35

**Navigation**

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [Topbar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22702) | v1.0 | 2026-10-08 | 2 | 2026-10-07 · Platform screens: course covers, short course-row copy, DS writes — and the badges still read *Label* |
| [Topbar-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22694) | v1.0 | 2026-10-08 | 2 | 2026-10-07 · Platform screens: badge texts restored where the update has landed; one badge removed |

**Dashboard**

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [Due-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22752) | v1.0 | 2026-10-08 | 2 | 2026-10-08 · After the publish: the Program headers are in; the Course Card is still not |
| [Jump-Tile](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22769) | v1.0 | 2026-10-08 | 1 | 2026-10-08 · DS: defaults on what Open edX serves; an image option on the Course Card |
| [Resume-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22800) | v1.0 | 2026-10-08 | 1 | 2026-10-08 · After the publish: the Program headers are in; the Course Card is still not |
| [Section-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22747) | v1.0 | 2026-10-08 | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Stat](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22736) | v1.0 | 2026-10-08 | 2 | 2026-10-08 · DS: defaults on what Open edX serves; an image option on the Course Card |
| [Streak-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22783) | v1.0 | 2026-10-08 | 1 | 2026-10-08 · DS: defaults on what Open edX serves; an image option on the Course Card |
| [Today-at-a-glance](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22184-626082) | v1.0 | 2026-10-08 | 2 | 2026-10-08 · After the publish: the Program headers are in; the Course Card is still not |

**My-Learning**

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [Browse-Tile](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22901) | v1.0 | 2026-10-08 | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Program-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22808) | v1.0 | 2026-10-08 | 4 | 2026-10-08 · DS: `Program-Card` without the cohort, week and lesson counters |

**Program-Detail**

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [Course-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22906) | v1.0 | 2026-10-08 | 4 | 2026-10-08 · Screens: the 28 compact course rows on the DS row; the local component is gone |

**Course-Detail**

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [Card-Shell](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21885) | v1.0 | 2026-10-08 | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Completion-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22448) | v1.0 | 2026-10-08 | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Course-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21765) | v1.0 | 2026-10-08 | 6 | 2026-10-08 · Course-Header backgrounds, ready to export two ways |
| [Course-Stats](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21860) | v1.0 | 2026-10-08 | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Course-Title](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21848) | v1.0 | 2026-10-08 | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Date-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22486) | v1.0 | 2026-10-08 | 8 | 2026-10-07 · Platform screens: badge texts restored where the update has landed; one badge removed |
| [Grade-Meter](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22454) | v1.0 | 2026-10-08 | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Grade-Summary-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22461) | v1.0 | 2026-10-08 | 3 | 2026-10-06 · Local components → the DS |
| [Lock](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21959) | v1.0 | 2026-10-08 | 2 | 2026-09-24 · The Lock molecule on the locked topic |
| [Message](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22640) | v1.0 | 2026-10-08 | 4 | 2026-10-08 · After another publish: badges read *Label* again in the product file |
| [Meta](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21877) | v1.0 | 2026-10-08 | 1 | 2026-09-24 · Course Detail mobile — the Course tab |
| [Module-Number](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21952) | v1.0 | 2026-10-08 | 3 | 2026-10-06 · Platform components moved into the DS library |
| [Module-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21966) | v1.0 | 2026-10-08 | 6 | 2026-10-06 · Platform components moved into the DS library |
| [Progress-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21894) | v1.0 | 2026-10-08 | 4 | 2026-10-06 · Platform components moved into the DS library |
| [Score-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22477) | v1.0 | 2026-10-08 | 2 | 2026-10-06 · Local components → the DS |
| [Section-Intro](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21891) | v1.0 | 2026-10-08 | 1 | 2026-10-06 · Platform components moved into the DS library |
| [Sidebar-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22090) | v1.0 | 2026-10-08 | 6 | 2026-10-07 · Platform screens: badge texts restored where the update has landed; one badge removed |
| [Thread-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22608) | v1.0 | 2026-10-08 | 3 | 2026-10-07 · Platform screens: badge texts restored where the update has landed; one badge removed |
| [Topic-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22049) | v1.0 | 2026-10-08 | 6 | 2026-10-06 · Handoff audit, third pass (after the DS publish) |
| [Week-Day](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22342) | v1.0 | 2026-10-08 | 5 | 2026-10-06 · Platform components moved into the DS library |
| [Weekly-Goal-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22174) | v1.0 | 2026-10-08 | 8 | 2026-10-06 · Platform components moved into the DS library |

**Completion**

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [Certificate-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22360) | v1.0 | 2026-10-08 | 4 | 2026-10-06 · Platform components moved into the DS library |
| [Certificate-Document-demo](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22261-2968) | v1.0 | 2026-10-08 | 1 | 2026-10-06 · Platform components moved into the DS library |

### Base components: 23

A link marked *(page)* goes to the component's page in the library, not to the component itself.

| Component | Version | Since | Variants | Last named in changelog |
|---|---|---|---:|---|
| [Alert](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=176-4256) (page) | v1.0 | 2026-10-08 |  | 2026-09-23 · Course Detail: known inconsistencies fixed |
| [Avatar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=18-1350) (page) | v1.0 | 2026-10-08 |  | 2026-10-01 · Top bar light; badges on every breakpoint; mobile Q&A conversation as one card |
| [Avatar label group](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=18-1350) (page) | v1.0 | 2026-10-08 |  | — |
| [Badge v2](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21889-541076) | v2.0 | 2026-10-08 |  | 2026-10-08 · DS: defaults on what Open edX serves; an image option on the Course Card |
| [Breadcrumbs](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=43-3087) (page) | v1.0 | 2026-10-08 |  | 2026-08-20 · The verb goes, and the tooltip was in the library too |
| [Button group](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=16-399) (page) | v1.0 | 2026-10-08 |  | 2026-10-08 · My Learning: the 40 covers on the card's Image layer; why the update had not come in |
| [Buttons/Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-7608) | v2.0 | 2026-10-08 |  | 2026-10-07 · DS: Button publishable again, tabs already on Badge v2, Course Card measured |
| [Buttons/Button close X](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-5715) (page) | v2.0 | 2026-10-08 |  | — |
| [Buttons/Button utility](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-5715) (page) | v2.0 | 2026-10-08 |  | — |
| [Checkbox](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1097-63638) (page) | v1.0 | 2026-10-08 |  | 2026-09-22 · ORA on tablet and mobile; the all-content example covers the whole catalogue |
| [Content divider](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=780-0) (page) | v1.0 | 2026-10-08 |  | 2026-09-24 · Course Detail: every tab on mobile; tokens and components audited |
| [Horizontal tabs](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=43-0) (page) | v1.0 | 2026-10-08 |  | 2026-10-07 · DS: Button publishable again, tabs already on Badge v2, Course Card measured |
| [Input field](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=85-1269) (page) | v1.0 | 2026-10-08 |  | 2026-10-08 · DS: `Program-Card` without the cohort, week and lesson counters |
| [Loading indicator](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1172-32) (page) | v1.0 | 2026-10-08 |  | — |
| [Progress bar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1154-89940) (page) | v1.0 | 2026-10-08 |  | 2026-08-05 · The quiz nav adopted across the sections |
| [Radio group item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=122-3484) (page) | v1.0 | 2026-10-08 |  | — |
| [Select](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=85-1269) (page) | v1.0 | 2026-10-08 |  | 2026-09-10 · Mobile tabs stay tabs, and the touch target gets bigger |
| [Tag](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=3306-403749) (page) | v1.0 | 2026-10-08 |  | 2026-10-08 · DS: `Program-Card` without the cohort, week and lesson counters |
| [Textarea input field](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=85-1269) (page) | v1.0 | 2026-10-08 |  | 2026-10-06 · `LMS / Note Editor` built in the DS (not published yet) |
| [Toast](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21069-32233) (page) | v1.0 | 2026-10-08 |  | — |
| [Toggle](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1102-4631) (page) | v1.0 | 2026-10-08 |  | — |
| [Tooltip](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1052-485) (page) | v1.0 | 2026-10-08 |  | 2026-10-07 · DS: Button publishable again, tabs already on Badge v2, Course Card measured |
| [Video player 16:9](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=9316-559159) (page) | v1.0 | 2026-10-08 |  | — |

## History

| Date | Component | Version | What changed |
|---|---|---|---|
| 2026-10-08 | all 137 | baseline | Versions start here: `1.0`, and `2.0` for `Badge v2` and the `Button` family. |
