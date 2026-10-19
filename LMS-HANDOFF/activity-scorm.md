# Activity (SCORM)

First pass, 19 Oct 2026. Figma: ICP file, page **↳ Activity · SCORM - WIP 🟠**
([7428-1069](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7428-1069)), 46 screens:
15 desktop, 15 tablet and 16 mobile. Status WIP; nothing is Ready for Dev.

## 1. What the platform gives us

- **Block:** `openedx-scorm-xblock` (Overhang.io). It is a community block, not core: add `scorm` to the course's
  *Advanced Module List*. It plays **SCORM 1.2 and 2004** packages: a `.zip` with `imsmanifest.xml` at its root.
- **Limits (decision 023):**
  - at most **one SCORM package per unit**;
  - packages of **1–15 MB**;
  - **not supported in the mobile app**.
- **Display:** in the page (an iframe), with a **Fullscreen** button, or in a **pop-up window**. The author chooses
  per component in Studio. A navigation menu is optional. Native installs need `X_FRAME_OPTIONS = SAMEORIGIN`.
- **Completion:**
  - The package decides when it is complete: `cmi.core.lesson_status` (1.2), `cmi.completion_status` (2004), or
    `cmi.progress_measure`.
  - Studio warns the author when a package has no completion report; learners see nothing.
- **Score:** `cmi.score.raw` goes to the Progress tab. Grading supports rescoring. *Scored* and *Weight* are set in
  Studio.
- **Resume:** the package stores its own position (suspend data, location) and resumes there.
- **Events:** `openedx.xblock.scorm.*`: initialized, completed, passed / failed, terminated, and so on.

Sources: `topic-types-inventory.md` §5–6b, `edx-component-types-reference.md` (SCORM XBlock), decision 023, the
openedx-scorm-xblock README, openedx.org *Leveraging SCORM in the Open edX platform*, scorm.com *One-minute
SCORM overview*.

## 2. Decisions (Nelson, 19 Oct 2026)

| Question | Answer |
|---|---|
| Where the package opens | **Both, per course.** In the page with Fullscreen is the default; a new window is the course's option. |
| How the topic completes | **The package reports it.** There is no Mark as Complete. If a package never reports, the topic falls back to our rule for topics we cannot measure: Next asks. |
| On a phone | **Notice + Open anyway.** The package can still be opened in mobile web; the app shows only the notice. |
| Course packages (POSH) | The package can be a whole course with its own menu (made in Rise, for example). Group D handles it. |

## 3. The screens

Each state is drawn on desktop, tablet and mobile (`.2` = tablet, `.3` = mobile).

**A · In the page (default).**

| | |
|---|---|
| A1 | Loading (DS SCORM Frame `Loading`) |
| A2 | Running, with Fullscreen |
| A3 | Fullscreen: a thin bar with the topic name and *Exit fullscreen*; Esc also exits |
| A4 | Coming back: an Info alert, *Picking up where you left off* |
| A5 | Completed with a score: Completed in the header and the sidebar, and a Success alert with the score |
| A6 | Completed but not passed: the topic is completed, and a Warning alert gives the score against the pass mark |
| A7 | Failed to load (DS SCORM Frame `Error`): *Try again* and *Skip for now* |

**B · New window (course option).** A launch card opens the package. The page waits and updates by itself when the
package reports. On a phone the window is a new tab.

| | |
|---|---|
| B1 | Ready to open |
| B2 | Open in another window |
| B3 | Pop-up blocked: *Play in this page* |
| B4 | Completed |

**C · Exceptions.**

| | |
|---|---|
| C1 | The package never reports completion: Next asks, with the same dialog as readings and labs |
| C2 | On a phone (mobile only): the notice *Best on a computer* with *Open anyway* |

**D · Course packages.** The package is a whole course, with its own menu, progress, *Continue* and *Exit course*
(POSH).

- **What we control is the frame, not what is inside it.**
- **D1:**
  - Our sidebar opens collapsed, so only one menu is on screen.
  - The frame takes the height of the window: no second scrollbar. Today it is a short frame with its own scroll.
  - Fullscreen is the primary action, suggested once.
- **D2:** Fullscreen.
- **D3:** Completed, with the final assessment score.
- **The package's *Exit course*** saves its progress (SCORM finish) and stays inside the frame. Our *Next* still
  goes to the next topic.
- **On a phone** the package uses its own compact menu.

## 4. Built from the DS, and the local stand-ins

**From the DS:**
- the player Topbar, the Sidebar (Expanded, and Collapsed for group D) and the Topic-Header (type Activity);
- `LMS/ICP/Topics/Activity-SCORM-Frame` for loading, error and the phone notice;
- `LMS / Inline Alert` (Info, Success, Warning);
- Content-Feedback (no Mark as Complete), the Topic-Footer-Nav and the Next-asks Modal.

**Moved to the DS on 19 Oct (to publish):** `LMS/ICP/Topics/Activity-Player`, `Activity-Fullscreen-Bar`,
`Activity-Launch-Card`. The screens still hold the stand-ins until the publish; they will be swapped then.

**Were local stand-ins:**
- **Activity-Player:** the toolbar with Fullscreen, and the package frame.
- **Fullscreen bar.**
- **Launch card for the new window:** today it is the Lab-Launch-Card with its copy overridden. It needs an activity
  version.
- **Sample package content:** this is the author's content, not ours, and is labelled as such on every screen.

## 5. Open

- **B3 · *Play in this page*:** it carries the external-link icon of the Lab card. The in-page action should have
  none.
- **The player Topbar (ICP):** it still shows the UI-kit learner (Olivia Rhye) by default. The platform Topbar was
  fixed on 19 Oct (1.4).
- **What the package's *Exit course* does inside our frame:** to check on a real package. Some packages close their
  window, and in a frame that does nothing.
- **Not checked yet:** dark mode, and copy review with the content team.
- **No prototype screens yet:** `ActivityView` / `ScormContainer` predate these decisions.
