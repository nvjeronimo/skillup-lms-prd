# Handoff Package Changelog

Current version. For previous releases see `history/CHANGELOG-archive.md` (v1.0 → v1.7).

> **Version numbers, 13 Oct 2026.** No component is at `2.x` any more: the nine that were have been renumbered
> to `1.x` (table in `03-design-system/component-versions.md`, *History*). The entries of 8 to 12 Oct below were
> rewritten to the new numbers. Where an older entry says `Badge v2` or *Button V2*, it is the name those
> components had then: they are today's `Badge` and `Button`.









## 2026-10-22 · Dashboard glance dark again (Today-at-a-glance 1.5)

Nelson’s ICP Dashboard design goes into the DS: a dark backdrop (`bg/info-soft` in a dark island, #044150) with two blurred `border/info-soft` glows and the circles at 19%, title `text/on-primary`, light `Stat` cards with the value and the detail on one line. Programs reads *1 · in progress of 3 enrolled* with *1 not started*; Certificates *ready to download*. Prototype PR 267.

## 2026-10-22 · Program card labels in uppercase

Nelson: on the program cards, *Up next* and *Certificate issued* are uppercase like the course card overlines (CSS `uppercase` / Figma Text case Upper; the source text stays sentence case). DS `Program-Card` 1.14, prototype PR 264.

## 2026-10-22 · Course menu becomes Course Journey

Nelson: the course outline drawer on a phone is called **Course Journey** (was *Course menu*). DS `Sidebar` 1.3 (drawer title); the player Topbar button is labelled *Open Course Journey* and the drawer’s close *Close Course Journey* (prototype PR 263). `screens-spec.md` drawer header updated. Older entries keep the old name.

## 2026-10-22 · Course pictures on cards and module rows; player content measure; video at half the viewport

Nelson: the course picture large on the course cards (grid and list) and on the “Module …” rows. Prototype PR 257:
CourseThumb `shape="cover"`, a 16:9 cover across the top of a grid card, a 192 cover down the left of a list card,
160 on the Course-Row, across the top of the Resume-Row; a module row uses its course’s picture (Open edX has no
picture per module). Partner logo chips on the cards sit on white. Content tabs stay tabs on phones (no dropdown).
DS (unpublished): Course-Card 1.16, Course-Row 1.3, Resume-Row 1.3. The ICP player screens already use Horizontal
tabs on mobile; the two Mobile-Tab-Select instances in the ICP are the search-results filter and stay.
Published and accepted 22 Oct. ICP: the cards had no course pictures (only a placeholder colour), so the 12 covers
of the prototype (`public/platform/covers`) were uploaded to a source frame on the Platform Pages WIP page (`7649:114533`)
and set on Cover › Image by course title: 148 cards, 30 Course-Rows, 12 Resume-Rows. The three 466-wide Course-Rows of
the two-column Dashboard (1040) hide the cover (padding 20): it does not fit beside the titles there.

Nelson: the topic content gets a max width; on a video the player stays full width at 50vh and shrinks only when the
learner scrolls to the transcript. Prototype PR 258: content measure 50rem (800, centred, padding outside), every
topic type; video from tablet up `min(50dvh, 16:9 of its width)`, docked 240 / 180 unchanged, phones 16:9. Open: a
DS token `Container/content-max-width` (needs approval) and the ICP screens.


## 2026-10-22 · Fluid-interface pass after an Apple design review

Nelson asked for all of it (prototype PR 253; motion-matrix §8c):
- **Press on touch-down:** cards and rows that are one link answer the instant they are touched (99 %, a light tint).
  Needed since hover only exists on devices that hover.
- **Drag to dismiss on phones:** the assistant and course-search sheets pull down from their top row, the player's course
  drawer and the Notifications / Saved / Discussions panels swipe back to their edge; a flick closes, a slow short drag
  settles back. The close buttons stay.
- **Text follows the browser's size:** the type ramp is in rem; A / A+ / A++ still multiplies on top. Same pixels at the
  default size.
- **Light / dark and skin changes cross-fade** instead of jumping in one frame.
- **System preferences:** "increase contrast" steps hairlines and the faintest text up one role; "reduce transparency"
  makes the video's translucent surfaces solid. Roles re-pointed, no new tokens.

## 2026-10-22 · Motion pass after an Emil Kowalski review

Nelson asked for all of it (prototype PR 252; motion-matrix §8b; ADR 024 amended):
- **Hover only where it exists:** on a phone a tap no longer leaves a button in its hover colour (the Primary button stayed
  yellow).
- **Ease-out in and out:** exits move from the ease-in `standard-accelerate` to `standard-decelerate`, and that curve
  becomes a stronger ease-out, `cubic-bezier(0.23, 1, 0.32, 1)`. Quiz step slides take it too.
- **Menus and popovers are interruptible:** CSS transitions instead of keyframes.
- **The quiz mark** grows from half size with a fade instead of from nothing.
- The Figma `Motion` variable `easing/standard-decelerate` carries the new value too, and `standard-accelerate` says it is unused (DS, not yet published).

## 2026-10-22 · Dashboard glance light, due items and 12-hour times

Nelson reworked the Dashboard's two DS components, published 22 Oct. `Today-at-a-glance` 1.4 is a light card (bg/primary-soft, border/primary-muted, cards on bg/page with Shadows/shadow-card), with short labels, two-line details and goals (*3 due this week* in Warning). `Due-Item` 1.1 puts the activity type in the title, the time in 12 h with *your time*, and the badge says when. Every time in the prototype now reads 12 h (*11:59 PM · your time*). The Sea skin keeps the glance light, and the player's top bar takes the Sea chrome (prototype only, decision 027). Prototype PRs 244, 245, 246.
## 2026-10-22 · Dashboard glance: Nelson's version (dark cards, no arrows)

After the first publish Nelson reworked the glance in the DS and kept it: each Stat card pinned to SKO Dark, order
*In progress · Programs · Completed · Certificates*, and **no month arrows**: only the goal badges stay
(*3 due this week* · *1 of 7 courses* · *32% of 22*; none on Certificates). The entry below describes the first
version. Prototype PR 243 follows the DS. Desktop cards now fill their columns (a fixed 174 width left gaps at 1200).

## 2026-10-22 · Dashboard glance: one card per figure, an arrow and a goal

Nelson (“a figure alone says nothing”): each figure of *Your learning at a glance* sits on its own card with a
comparison and a goal, and only what Open edX already serves:
- **Arrow** on *Courses completed* and *Certificates*: this month so far against the same days of last month, from
  certificate issue dates; green up, red down (Nelson's choice; an exception to the green-only-when-complete rule,
  for trend badges only). *Courses in progress* has none: it falls when courses get completed.
- **Goal:** *3 due this week* · *32% of 22* · none on Certificates · *1 of 7 courses* (the active program). Dropped:
  goals with a date (programs have no end date in Open edX) and *of 25 possible* (program certificates need
  Credentials). Sources per element in the handoff map §37.4. Dev effort: frontend only.
- **Phone:** the row of cards scrolls sideways (cards 148) instead of the one-line card of 21 Oct.
- DS: `Stat` v1.2 (Theme=Card), `Today-at-a-glance` v1.3, not yet published. Prototype PR 242. The ICP dashboards
  take it with the library update.

## 2026-10-21 · Certificates page: two tabs, search, Grid / List

Nelson redrew the Certificates page (ICP *Platform Pages – WIP*, **05 · Certificates**, card `7584:94993`):
- **Two tabs instead of two sections:** DS `Horizontal tabs` (Underline, count badge) *In progress 5* and
  *Earned 8*, Earned selected when the page opens. Under them, on the right: *Search certificates* (filters the
  selected tab by title) and the Grid / List toggle, as on My Learning. Below desktop the page is Grid only; on a
  phone the search fills the width.
- **Earned:** the DS `Certificate-Card` (Earned-Certificate) in a grid of 3 / 2 / 1 columns. **In progress:** one
  card per course or program in the same grid (eyebrow, title, bar on `bg/info`, what it measures, a chevron to the
  course page or the program certificate page).
- **Figma:** 05 desktop (Earned), 05b desktop In progress (`7587:245385`), 05c tablet 960 (`7588:2251`), 05d mobile
  375 (`7588:90765`). The two-column row moved to the bottom of the frame, marked *SUPERSEDED 21 Oct 2026*.
- **List view** is not drawn: in the prototype it is one row per certificate (Earned: title and issue line, a link
  to the certificate page; In progress: the card at full width, bar beside its detail). To draw if kept.
- No DS component changed. Prototype PR 241.

## 2026-10-21 · Audit answers: phone glance card, Python sandbox, US spelling; Square corners experiment

Nelson's answers to the open audit items:
- **Dashboard glance card on a phone: one line of four** (was 2 × 2; 252 → 160–170 tall). Short labels and details
  there (In progress · of 22 courses, Completed, Certificates · to download, Programs · 1 active · 1 done); each stat
  as wide as its label, the four spread across. DS `Stat` v1.1 (Theme=Inverse compact), `Today-at-a-glance` v1.2;
  the four ICP mobile dashboards carry the short labels. Prototype PR 229.
- **The Python sandbox exists:** the Business Analytics notebook lab opens it first (primary until opened), the
  local setup stays as the alternative. Prototype PR 229.
- **US spelling everywhere** (Program, color, center, -ize…): prototype PR 230 (≈409 words, 68 files; slugs
  unchanged). Figma: DS 156 text nodes and 19 component descriptions (straight quotes now typographic, no
  re-escaped entities), ICP 285 text nodes on the 13 work pages; Discovery and Archive untouched; layer names kept;
  kept on purpose: a third-party quote (“splendour”, DS sample text) and a code-style state list (“cancelled”).
  The DS text ships with the next publish.
- **Prose width stays as drawn** (the column, as in Figma).
- Also: no desktop flash on a phone player and the assistant launcher clears the last card (PR 228).

**Experiment — Square corners** (Nelson): a switch in the profile menu under the brand skins removes every corner
radius except buttons (`data-square-corners`: the Radius roles go to 0, inside any button they come back;
decorative circles stay round). Prototype only, PR 231.

## 2026-10-21 · Profile menu: Sign out in a group of its own

Nelson (DS Profile Menu 1.7): Sign out moves out of the SkillUp Online group into its own, right after Profile, with
the log-out icon in `icon/error`. The profile menu on a phone scrolls inside its card, so Sign out is never cut.
Reset demo and Restart first steps show again without `?demo=1` (decision 029 §2 amended). Prototype PRs 224, 226.

## 2026-10-21 · The menu on the left in every top bar

Nelson: the platform `Topbar` Compact (tablet, mobile) moves its menu to the left of the logo, where the player's
course menu is, so the menu sits in one place everywhere (DS Topbar 1.8). The prototype follows (PR 217) and uses
the DS `menu-02` glyph (middle line shorter), drawn in `lib/icons.tsx` because lucide's `Menu` is `menu-01`.

## 2026-10-21 · Phone player bar: new layout and a 32 px progress circle

Nelson's own pass on the player `Topbar` Mobile (Light, Dark), which replaces the audit's brandmark-only bar
(decision 029 §1 amended): three equal columns — the course menu and the progress ring on the left, the SkillUp
wordmark centred, Bookmark, the avatar and Close on the right. No bell and no theme button on a phone (the theme
switch is the profile menu's Dark theme row). The ring is the new DS `Progress circle` 1.2 `Size=xxxxs` (ring 32,
band 3, the % inside in body-small/Semibold); it had the 64 px size scaled down, with a 7 px number. Two-digit
values touch the band: 12 px is the DS's smallest text style. Prototype PR 216. DS published 21 Oct.

## 2026-10-21 · Prototype audit and decisions (decision 029)

A UX/PM review and a technical audit of the prototype (report `04-research/prototype-audit-2026-10-21.md`). The technical side is clean
(axe 0 violations on every page, theme and width; no overflow; token-lint, tsc, lint clean); the product side was
not: every course-outline topic opened the same page, three different "todays", a graded quiz offered the answer
before the first try, no sign out, a placeholder signatory on issued certificates. Fixed in prototype PRs 214 and
215; ICP certificate screens carry the sample signatory. Nelson's decisions (029): on a phone the player's top bar
drops the theme button (DS Topbar v1.7, layout reworked the same day, see the entry above; the switch is a Dark theme row in Profile Menu v1.6, which
also gains Sign out); prototype notes and demo controls only with `?demo=1`; Mentorship Q&A private, Discussion the
cohort's forum; program sequencing unchanged. DS changes not yet published.

## 2026-10-20 · Corner radius by role (decision 028)

Nelson: radii must follow one logic everywhere, with new tokens if needed. Eight role tokens in the DS
(`3. Responsive 📐`): `Radius/none` 0 · `inner` 2 · `control` 6 · `card-inset` 8 · `track` 10 · `card` 12 · `surface` 16 · `pill`,
aliases of `Radius/fixed-*`. Controls stay at 6 (Nelson's choice), so inputs go from 8 to 6; cards at 8 and 10 go to
12; icon tiles at 8 and 10 go to 6; Button group as Nelson set it (track 10, segments 6); learner avatars stay rounded squares at 6 (confirmed by
Nelson). Nesting rule: *inner radius + padding = outer radius*: Share-Menu and Card-Overflow-Menu now have 4 px
padding and 8 px rows. Every DS component rebound (LMS, Base, Mobile; two value-identical leftovers noted in 028),
`Radius/flex-*` deleted (no uses anywhere), `Radius/fixed-*` kept for the Mobile App, 66 components one MINOR up,
*Block · Radius roles* on the Foundations page. Published 20 Oct. Prototype PR 209
(396 classes, `tokens/radius.css`, lint rule `raw-radius`) merged; PR 211 (nesting rule, menus) and PR 212 (tracks 10, segments 6) merged.

## 2026-10-20 · Progress track contrast; bg/track and bg/hover

Bruno: the progress bar does not pass the contrast we set. The bg/info fill on the bg/strong track was 2.26:1 (WCAG
1.4.11 asks 3:1). Nelson: rather than borrow the "muted" step for things that are not muted, give them roles. Two new
colour tokens in 🎨 SKO-Semantics (approved by Nelson), both **aliases of bg/muted** in every mode, so no hex changes:
- **bg/track**: the track behind a progress fill and the track of a segmented control (fill 3.21:1 light, 3.06:1 dark;
  bg/success complete fill 4.51:1 / 5.30:1).
- **bg/hover**: the neutral hover of icon and tertiary buttons (it replaces bg/faint, almost invisible on bg/page).

DS (published 20 Oct): Progress bar 1.1 and ._Progress bar plain (track bg/strong → bg/track), Button group 1.2 (track),
Utility Button 1.1, Icon Button 1.3 and Button 1.4 (Hover / Tertiary Hover bg/faint → bg/hover). Prototype PR 213:
`--color-bg-track`, `--color-bg-hover`, Tailwind `sko-bg-track` / `sko-bg-hover` on every progress and segmented track
and every neutral hover. bg/muted keeps its other uses (avatars with initials, image placeholders, disabled and
read-only fields).

## 2026-10-20 · Platform Pages WIP reorganised by flow

Nelson: one page with every platform page, in the order of the learner's flow, each page in its own frame. On
*↳ Plaftorm Pages - WIP* (`6207:245582`), left to right: 01 Dashboard · 02 My Learning · 03 Course Detail (4 tabs,
Weekly goal card, Certificate card, Content search in progress) · 04 Program Detail · 05 Certificates (list and one
certificate, share menu) · 06 Calendar · 07 Discussion · 08 Services · 09 Profile menu · 10 Edit profile. 01–04 and
06–08 are copies of the Ready for Dev handoff cards (Ready for Dev is unchanged and stays the handoff); 05, 09 and 10
are the in-review screens, moved into their frames. Each frame keeps the handoff header (eyebrow, title, what it is,
screens, evidence, cost, docs); 05–10 are marked IN REVIEW. A flow line under the page title gives the order and the
prototype routes. Everything else on the page (Discovery 2025, Coursera, Sidebar vs Topbar, Course Detail v9–v12
sources, ⚙ Technical, My Learning / Program sources, the superseded My Learning proposals) moved, untouched, to a
*Reference & history — not current* band below. 110 library instances in the frames that still pointed to older
library copies were relinked (Profile Menu 1.5, Topbars, Certificate-Card and -Document, Badge, Icon Button,
Footnote); the one-certificate screens show My Learning as the current tab, as the prototype.

Checked against the prototype routes (/platform/dashboard, my-learning, course/[slug] with 4 tabs, program/[slug] with
4 tabs, certificates, certificate/…, calendar, discussion, services, profile).

The missing screens, drawn the same day (in review): **09 · Notifications** (new frame; Profile menu is now 10 and Edit
profile 11): the Overlay Panels Notifications panel over the Dashboard, desktop and tablet (480 panel) and mobile (full
screen), as prototype PR 197. **05 · Certificates**: the list on tablet 960 (two columns) and one certificate on tablet
(stacked, as below 1025 px in the prototype). **11 · Edit profile**: tablet 960. **03 · Course Detail**: cards 01p, 02p and 03p (desktop, tablet, mobile), the
Course tab of a passed course (Progress-Card Complete 100%, Passed · 88% with 70% needed, 42 of 42 topics, success
course update, every module and topic done, no weekly goal, Certificate-Card Earned, Dates = Course ends), built on
the Course tab copy refreshed from Ready for Dev after the Shift due dates change (rows Course tab and Dates tab
recopied; frame 06 Calendar refreshed by the Impeccable session).

## 2026-10-20 · Shift due dates, exactly as Open edX does it

Nelson asked for exactly what Open edX allows, done the way it works, with nothing extra and no custom development.
Read from frontend-app-learning (`ShiftDatesAlert`, `UpgradeToShiftDatesAlert`) and edx-platform
(`reset_course_deadlines`).

**What Open edX does**
- **Where:** per course, on its Course (outline) tab and its Dates tab.
- **When:** the course is self-paced, has assignment due dates, `missed_deadlines` is true, `missed_gated_content` is
  false and the course has not ended.
- **The alert:** a warning alert with the platform's copy and a Primary "Shift due dates". It cannot be closed.
- **The call:** `POST /api/course_experience/v1/reset_course_deadlines` with `course_key`, one course per call, no
  confirmation.
- **After the call:** the toast "Your due dates have been successfully shifted to help you stay on track." with "View
  all dates", then the dates reload. On error Open edX only logs it.
- **Audit learners with missed gated content:** "Upgrade to shift due dates" instead (not drawn; open question).

**Figma (Ready for Dev)**
- **Course Detail:** the Dates screens use that alert (copy, no close, Primary), and it is added to the Course-tab
  screens, desktop, tablet and mobile.
- **Calendar:** cards 01–03 and the new 01b / 03b show the same warning alert and copy, then one row per course with its
  own Primary "Shift due dates". This uses the same per-course call; `reset_all_course_deadlines` is not used, because no
  Open edX screen uses it and it would also shift courses that are on track.
- **Doc frame "Shift due dates · how it works":** `7495:71453`.
- **WIP copies:** frame "06 · Calendar" was recopied.

**Prototype (PR 207):** `lib/platform/shift-dates.ts` holds the platform strings; `ShiftDatesAlert` is on the course
Course and Dates tabs; the Calendar rows behave the same; `?missed=2` shows two courses.

## 2026-10-20 · Share a certificate

Nelson: certificates need a button to share them on social networks. Prototype PR 206: *Share certificate* on the
certificate page (under Download) and an icon-only Share on every Certificate card; the menu offers Add to LinkedIn
profile (LinkedIn's add-certification form, pre-filled: name, SkillUp Online, issue date, verification URL and ID),
Share to LinkedIn, Share to X, Share to Facebook, Copy link and Email. Each channel opens the network's own form with
the verification address (Open edX /certificates/{verify_uuid}); the platform posts nothing. DS (published 20 Oct):
`Certificate-Card` 1.1, new `Share-Menu` 1.0; doc blocks for Share-Menu and Certificate-Document on ↳ Completion. ICP:
the button on the one-certificate screens and the open menu on a desktop screen.

## 2026-10-20 · Certificate sheet stays light; Dashboard figures from the data

Nelson: the certificate keeps its original colours in dark mode. DS `Certificate-Document` 1.2 (published 20 Oct) is pinned
to SKO Light; in the prototype (PR 205) the sheet is a light island (`data-theme="light"`). The Dashboard glance is
counted from the sample data: courses in progress 4 and completed 7 of 22 enrolled, certificates 8, programs 3
(1 in progress, 1 completed). The Figma Dashboard screens (Ready for Dev and V8 WIP, desktop, tablet, mobile) show the same figures.

## 2026-10-19 · Player Topbar 1.5: the Dark Mobile avatar

The learner avatar of the player `Topbar` Theme=Dark, Size=Mobile rendered light (bg/muted of the light theme) while
its bindings matched Desktop. Replaced by a fresh Avatar xs instance that inherits the variant's dark mode; checked by
render. `Topbar` 1.5, published 19 Oct. Also this day: 125 Topbar instances in the ICP file that stayed on the previous
library copy after the accept were swapped to platform 1.6 / player 1.4 (Ready for Dev 54, Quizzes 66, V8 WIP 3,
Topic Content Types 2); nav item and names kept, avatars radius 8. After the 1.5 publish, 221 player Topbar
instances were relinked to 1.5 the same way (Video 30, Quizzes 66, Reading 21, Lab 48, SCORM 46, AI Assistant 4,
V8 WIP 3, Completion 3); the Dark Mobile avatar renders dark on the screens.

## 2026-10-19 · Sea, a livelier brand skin (proposal in the prototype)

Nelson found the layout monochrome. Three skins made from the SkillUp foundation colours were shown side by side
(`03-design-system/rationale/skin-proposals-2026-10-19.html`). He chose A, first called Maré and renamed Sea. Sea is a
fourth brand skin in the prototype (profile menu → Sea; PRs 199, 200, 203):
- the top bar is deep teal (#044150), with the yellow spark on the current page and the avatar;
- the dark bands (glance card, Program header, Program-Card hero, mentor cards) use a deep-teal gradient;
- page headings carry text/primary;
- the Dashboard shortcuts are tinted.

Progress, completion green, the player and AA are unchanged. Decision 027 (proposed): the DS tokens, the brand mode and
the Figma screens wait for Nelson's approval.

## 2026-10-19 · Certificates: Dashboard figures, the sheet in the DS

Nelson said yes to the open points of the Certificates page. Prototype PR 202: the Dashboard *Certificates* figure
(8, was 2) and the jump tile (*5 in progress · 8 to download*, was 4 · 2) are counted from the Certificates page.
DS: `Certificate-Document` 1.1 (published 19 Oct), out of In review onto ↳ Completion, renamed from
`Certificate-Document-demo`, with a *Second partner* boolean for IBM + Microsoft. On the Certificates screens the sheets follow the prototype:
Data Analytics Foundations IBM + Microsoft, Digital Marketing Fundamentals IBM, Intro to Product Analytics the
SkillUp logo alone (the card thumbnails are the same component). `LMS / Profile Menu` 1.4 published; the three menu-open screens show it (the
mobile one, 812 tall, cuts the last 21 px of the panel, which scrolls inside on a phone).

Later the same day Nelson reordered the menu (`LMS / Profile Menu` 1.5, published): Appearance, Accessibility
standards, a Profile section (Edit profile, Certificates), SkillUp Online, the demo footer, every group padded 12/16.
The learner avatar is a rounded square (Radius/fixed-md), not a circle, in the platform `Topbar` 1.6 and the player
`Topbar` 1.4 (published 19 Oct; the menu-open screens swapped to 1.5) and in the prototype (PR 204).

## 2026-10-19 · Certificates page

Nelson: a page with every certificate of the learner, reachable from the Dashboard's Certificates tile and the profile
menu, and the one-certificate page drawn as well. Prototype PR 201: `/platform/certificates` lists **Earned** (the DS
`Certificate-Card` Earned, 3 / 2 / 1 columns, one height per row, actions on the bottom edge; a course of a program
names it under the issue date) and **In progress** (programs started and courses started, bar on bg/info with what it
measures, each row a link to the course page or the program certificate page). The Dashboard tile and the Services
Certificates row open it (they opened the Six Sigma certificate). The one-certificate page loses its "not designed
yet" note. `LMS / Profile Menu` 1.4 (published 19 Oct): *Certificates* under *Edit profile*; the three menu-open screens show it.

Figma, section `7461:34887` on the V8 WIP page (in review): the list desktop 1280 and mobile 375; one certificate,
course issued, desktop and mobile; program certificate not earned, desktop. Built from DS Certificate-Card, Progress
bar, Badge, Button and the platform shell. Open: the sheet on the one-certificate page is
`Certificate-Document-demo`, which sits on the DS page *LMS · IN REVIEW / NOT FOR BUILD*; it prints IBM only where
the prototype prints IBM and Microsoft for Data Analytics Foundations. The Dashboard figures (Certificates 2, tile
"4 in progress · 2 to download") predate the Data Analytics sample program and do not match the 8 earned / 5 in
progress of the page.

## 2026-10-19 · Profile menu: Edit profile and SkillUp Online; Edit profile page; notifications on the platform pages

Nelson: the profile menu does not repeat the learner (the trigger shows who is signed in). `LMS / Profile Menu` 1.3
(published 19 Oct): the header is gone; **Edit profile** opens the menu and **SkillUp Online** (skillup.online, new tab) is
its own group after Accessibility standards, before the demo footer. The new **Edit profile** page puts the Open edX learner profile and account settings on one page, in two
sections: *Your profile* (photo, username read-only, country, spoken language, education, about me up to 300
characters, LinkedIn, who can see it: full or limited) and *Account* (full name, email confirmed by email, site
language, time zone, reset password by email), with Cancel / Save changes. Drawn desktop 1280 and mobile 375 from DS
Input field, Select, Textarea, Avatar, Button and Button group, section `7453:34440` on the V8 WIP page (in review).
Prototype: PR 198 (`/platform/profile`, both menus) and PR 197 (the platform bell opens the same Notifications panel
as the player instead of a "not in this prototype" toast).


## 2026-10-19 · Player Topbar: John Smith

The ICP player Topbar (1.3, published 19 Oct) shows John Smith with the JS initials avatar on all six variants, as the
platform Topbar; the screens showed the UI-kit learner (Olivia Rhye). `LMS / Profile Menu` 1.2 (published 19 Oct, then 1.3): the header
avatar is a rounded square and the footer order follows the prototype. The menu is drawn open on three screens (platform
desktop, mobile, player), section `7449:64970` on the V8 WIP page.


## 2026-10-19 · Platform Topbar 1.5: the logo in dark mode

Dark-mode check of the new Calendar, Discussion and Services screens (no text under AA; the mobile conversation header
no longer clips its title). The platform `Topbar` showed its logo in a fixed white box in dark mode. DS `Topbar` v1.5:
no white box; the logo's teal parts use `text/on-primary-soft` (#044150 in light, #CDEAF6 in dark; Nelson chose an
existing token over a new one); the hidden Compact learner name reads John Smith. Published 19 Oct; in the ICP file the
108 Topbar instances on Ready for Dev, V8 WIP, Lab and AI Assistant were still on the previous library copy after the
accept and were swapped (the current nav item kept on every screen). Not checked: the Gold and Red brand modes.

## 2026-10-19 · SCORM components in the DS

The stand-ins of the Activity (SCORM) page are DS components on ↳ Topics, to publish: `Activity-Player` (Fullscreen
toolbar + Package slot), `Activity-Fullscreen-Bar` (Desktop / Mobile) and `Activity-Launch-Card` (Ready · Opened ·
Blocked, no provider). Published 19 Oct; the 46 screens use them (stand-ins removed).


## 2026-10-19 · Six Calendar, Discussion and Services components in the DS (v1.0)

Nelson asked for the six local components of the new platform pages to move to the DS. Rebuilt in the library on DS
variables, text styles, Badge and icons, on three new group pages after Completion (↳ Calendar, ↳ Discussion,
↳ Services; documentation from `ds-group-page.js`, split by level), and published 19 Oct:
`LMS/Platform/Calendar/Event-Row` v1.0, `Week-Day` v1.0, `Month-Event` v1.0, `Month-Day` v1.0,
`LMS/Platform/Discussion/Inbox-Row` v1.0, `LMS/Platform/Services/Service-Row` v1.0. In the ICP file the 119 instances
on the Calendar, Discussion & Services frame (`7392:200778`) now point to the library (text and size checked before
and after: no difference) and the local section was deleted. Register: `03-design-system/component-versions.md`
(Platform 47 → 53); levels in `03-design-system/tools/ds-levels.json`. The first two publishes did not ship them
(status Unpublished in the DS); the third did.

## 2026-10-19 · Activity (SCORM) screens

New ICP page *↳ Activity · SCORM - WIP* (Figma `7428:1069`), 46 screens in four groups: A in the page (default,
Fullscreen), B new window (course option), C exceptions (package never reports → Next asks; phone notice + Open
anyway), D course packages with their own menu (POSH: our sidebar collapsed, frame at window height, Fullscreen
first). Completion and score come from the package; no Mark as Complete. Nelson's decisions and the screen list in
`activity-scorm.md`. WIP, local stand-ins listed there.


## 2026-10-19 · Lab: no Opened state, no *How this lab works*, no author

Nelson's changes on the Google Ready and Opened screens, applied to every Lab screen
([`lab-third-party-platforms.md`](lab-third-party-platforms.md) §4).

- **No Opened state for now:** SkillUp cannot tell whether the learner selected the launch button (Komal). The six
  Opened cards stay, faded to 20% and titled *NOT FOR NOW - IN THE FUTURE*, with the flow frame's step 2. Everywhere
  else the launch card is *Ready*, Mark as Complete stays secondary on partner labs, and *Before you start* (and
  *This lab needs a computer* on tablet and mobile) stay until the topic is completed. The question cards G3 and
  M3 now show the Ready page behind the dialog; the completed cards G4 and M4 show the card in *Ready*.
- ***How this lab works* hidden:** the title and its three steps grouped in a hidden frame *How it works*, on every
  screen; we have no way to show it.
- **Author row hidden** on every screen.
- **Annotations:** the descriptions that relied on the opening rewritten; *Recent changes* dated 2026-10-19 on the
  24 Google, Microsoft and in-page cards. The Opened cards keep their description of the future state.
- **Open:** the DS `Lab-Launch-Card` keeps its `Opened` variant, unused on the current screens; the prototype still
  records the opening and shows *First opened on …*.

## 2026-10-19 · Product-file check: list cards one height, John Smith in the top bar

After the 17 Oct publishes, the product file was checked: the 63 course and program headers are right (button fills,
logo chips on bg/page, logos at the right edge); 6 Topbars on the Lab page were the old v1.1 copy without the theme
button (swapped to v1.3). Two DS changes, to publish: Course-Card 1.15 (List min height 146, so list cards keep one
height) and Topbar 1.4 (default learner John Smith, JS initials, instead of the UI-kit sample); published and accepted 19 Oct. Prototype PR 191.

## 2026-10-19 · Calendar, Discussion and Services drawn in Figma

Nelson approved the three proposal pages (prototype PR 187) and they are now drawn in the ICP file, page *Platform Pages -
Ready for Dev*, frame `Platform Pages - Calendar, Discussion & Services - Light` (`7392:200778`, banner WIP, cards In
progress): **Calendar** desktop (Agenda), tablet (Month view) and mobile (Agenda); **Discussion** desktop, tablet, mobile
list and mobile conversation; **Services** desktop, tablet and mobile. Built from DS components (Topbar with the page's item
On, Button, Button group, Badge, Inline Alert Error · Subtle, Input field, Select, Avatar, Section-Header, the Course Detail
Message and conversation pane) on DS tokens and text styles. Six new local components sit in the section next to the frame,
to move to the DS when Nelson agrees: `LMS/Platform/Calendar/Event-Row`, `Week-Day`, `Month-Day`, `Month-Event`,
`LMS/Platform/Discussion/Inbox-Row`, `LMS/Platform/Services/Service-Row` (all v1.0). Each desktop card carries a data note
(Dates API and Discussions API per enrolment; Services has no Open edX source). Not checked yet: dark mode and the brand modes.

## 2026-10-17 · Calendar, Discussion and Services: proposal pages in the prototype

The three top-bar sections that only showed a toast now have pages in the prototype, merged as proposals (PR 187) to
approve before they are drawn in Figma. **Calendar** (`/platform/calendar`): every course's dates in one place —
deadlines, live sessions (marked: not in Open edX, out of the MVP), course opens/ends — with missed deadlines first
("Shift my dates"), Agenda by day or Month, the next seven days and calendar sync (Phase 3); the top bar's count is the
deadlines of the next seven days. **Discussion** (`/platform/discussion`): every course's discussions in one inbox,
laid out like the course Q&A tab. **Services** (`/platform/services`): the mentor (ADR 007, Phase 2), then Career,
Support, and Benefits and tools. Open edX has no cross-course calendar or forum: both pages merge one call per
enrolment (Dates API, Discussions API). Nelson's answers of 17 Oct: Services holds all four groups; the Calendar shows
live sessions too, marked. The navigation flow's open question 2 is answered by these pages.

## 2026-10-17 · Partner logos in the course header; alerts on grey

Nelson: the course headers had no partner logos. Prototype PR 188: the header shows the course's provider and partners
as logos (the same list as its card: Business Analytics with Python, SkillUp + IBM); PR 190 does the same for the program header (dark versions). DS Course-Header 1.1: the
placeholder chips are Provider-Partner-Badge Logo (Light on courses, Dark on programs), the cards' component, on a bg/page chip (white on courses, dark on programs), exposed, with a *Second partner* boolean; the Progress card
button fills again. Nelson: an alert on a grey surface turns white. DS Inline Alert 1.2, property *Surface* (Page /
Subtle); prototype PR 189, `surface` prop. Both published 17 Oct; the 7 program headers that had their logos hidden by an override were restored, logos against the right edge.

## 2026-10-17 · Course card title up to two lines

Nelson: the course card title takes up to two lines, then an ellipsis, in every variant (DS Course-Card 1.14, published 17 Oct).
The list row was one line; it now grows with a second line, and the rows of a collection keep one height. Prototype PR 186.


## 2026-10-17 · Light / dark switch in the top bar

Nelson: the light / dark toggle belongs in the main bar. DS: platform Topbar 1.3 (Theme toggle between Notifications and
the learner, Desktop and Compact; Compact 64 tall; changed by Nelson, docs refreshed) and `LMS / Profile Menu` 1.1 (Dark
theme toggle removed); published 17 Oct. Prototype PR 184: the moon / sun button in the platform bar (desktop and compact,
compact bar 64) and in the player bar on mobile too; the profile menu keeps the brand skin, whose segments now carry a dot in each skin colour (Nelson, Profile Menu 1.1; prototype PR 185).

## 2026-10-17 · Program card Due badge in Soft Warning

Nelson changed the Due badge of the program cards (Up next footer) to Badge Soft · Warning, as on the Dashboard
Due-Item; it was the accent yellow. DS Program-Card 1.12, published. Prototype PR 183. The course cards have no Due badge.


## 2026-10-16 · Completed header Progress card in green

Nelson: when a program or course is completed, the Progress card of its page header is green like the cards. Prototype
PR 182: at 100% the bar is bg/success and the label becomes the check icon + "Completed" (program and course headers).
DS: `Progress-Card` 1.1, State=Complete with the same label; published 16 Oct. No Figma screen shows a completed
header yet.


## 2026-10-16 · One profile menu (prototype + DS)

Nelson: the profile menus of the platform pages and the ICP differed (the platform one had no accessibility settings;
the ICP one offered six skins, three of them without tokens). Both now show the same blocks in the same order: the
learner, **Appearance** (dark theme, brand skin SKO / Gold / Red), **Accessibility standards** (text size,
colourblind-safe states, reduce motion, underline links, larger touch targets) and the footer (Restart first steps,
Reset demo). The player keeps its preview sections between Accessibility and the footer. Prototype PR 181 (shared
`ProfileSettings`, store v5 sends a stored Ink / Sky / Violet back to SKO). DS: new organism `LMS / Profile Menu` v1.0
on *LMS · Shared components*, built from Avatar, Toggle and Button group; published 16 Oct.


## 2026-10-16 · Audit fixes, phase 1 (DS)

From the audits of the prototype, the ICP Ready pages and the DS (prototype 17/20, ICP 20/20, DS 16/20). Fixed in the DS,
to publish: the CERTIFICATE / "Certificate issued" labels on the green strips use text/default (3.50:1 in dark before;
Course-Card 1.13, Program-Card 1.11); the Program-Card "Up next" label has its text style again; the Note-Editor no longer
stays white in dark mode (1.2); 7 dead hidden layers removed and three missing version lines added (no visual change).
**Phase 2 (same day, recommended defaults — Nelson said "avança"):** launcher count on bg/primary (Assistant-Launcher
1.3); `text/placeholder` one step darker in every mode (4.96:1 light, 6.28:1 dark on bg/subtle); "Property 1" renamed
"State" on Topic-Footer-Nav, Collapse-Toggle and Live-Control-Bar. To publish (Nelson).
**Phase 3, prototype PR 180:** Live-Now-Banner, reading pull quote and Answer alert at their DS v1.1 (and the
`bg/warning-muted` token), the new placeholder value, the launcher ring turns only while first steps are left, lazy
course covers, the certificate page lists its signatories. Re-audit: axe 0 violations, 0 overflow in 78 page loads.
**Phase 4, ICP:** the three hand-drawn "i" icons in the video transcript's "Add note" hint are now DS `info-circle`
instances. Two audit items were false positives: the off-width Platform Pages frames are handoff-card content, not
pages (every page screen is 1280), and the unstyled Reading runs are intentional rich-text marks (bold, italic, code).
**Hidden-layer review (approved):** Topbar 1.2 — the theme button is shown by default and is a moon/sun Utility Button
like the bell and bookmark (the prototype's player bar); every ICP Topbar shows it after the update. Dead hidden layers
removed from Topbar and Weekly-Goal-Card; Topic-Row 1.3 gets an `Optional` switch for its Optional-Chip.
**Published and accepted (Nelson, 16 Oct):** in ICP the 194 player Topbars show the moon/sun theme button (render checked
on Video Lessons) and the 225 Topic-Footer-Nav instances read `State=Default` after the rename.

## 2026-10-16 · Cards share one height; My Learning opens on the last tab

- **Same height (Nelson):** `Course-Card` 1.12. Grid states were 370 / 356 / 350: each now has a minimum height of 370
  and the action at the bottom; List Completed 120 → 118 (thumb back to 84). `Program-Card` was already equal
  (436 / 220). Prototype PR 179: the cards of a collection take the tallest height (courses 368 ×5 at 1280, 360 ×5 at
  375; programs 404 ×3). On the screens, cards of one row set to Fill the row.
- **My Learning tab (Nelson), BR-48:** opens on the last tab the learner opened; the first time, Programs when they
  are enrolled in one, else Courses; `?tab=` wins and is remembered. Prototype PR 179; `platform-navigation-flow.md`.
  To publish (Nelson).

## 2026-10-16 · DS documentation audit: anatomy, empty paragraphs, layer names

Nelson, 16 Oct: the anatomy listed the inside of icons and images, the rules texts had empty paragraphs, and layers were
called *Frame 1*, *Group*… Audit of the 121 `Doc · …` frames (48 pages, 123 component blocks), then fixed:
- **Anatomy (123 blocks, rebuilt in place):** the parts of the component itself, one level into its structural frames;
  never inside an instance (icons, badges, buttons, nested components), a group or a vector (artwork, logos). Nested
  instances no longer have their hidden options switched on (Topic-Types-Badge showed the base Badge's avatar and close
  X). Artwork shows as one part, an image fill as *image*.
- **Rules texts (49):** no empty paragraphs; paragraphs 8 apart (`paragraphSpacing`) instead.
- **Layer names (about 300 in 30 components):** no *Frame N*, *Group N*, *Container*, *Layer 1*: each named after its
  place (Course-Card *Identity*, *Type and partners*, *Next header*, *Progress row*; Toast *Layout*, *Icon and content*,
  *Content*, *Text*, *Title*, *Supporting text*; Alert/Modal *Content wrap*, *Body*; File-Item *File*, *File icon*,
  *File details*, *Download action*; logos *Logo*, *Artwork*, *Wordmark*). Instance layers named with a component path
  or an old name (*LMS / Module Info*, *LMS/ICP/Sidebar/Course-Header*, *Buttons/Button*) carry the part's name; text
  layers named after their sample content (*Course Name: Generative AI…*, *This is an error message.*) carry their role.
  The vector paths inside logo and illustration artwork keep their drawing names (not parts of the component).
- **Generator:** `tools/ds-group-page.js` does the same on every rebuild. To publish (Nelson): layer names reach the
  files with the next publish; renaming layers keeps the overrides on the screens.
- **Found, not changed (questions to Nelson):** the Sidebar nests an `Overall-Progress/Desktop-OLD` variant;
  `Topic-Status-Badge` is built on `Course-Progression-Button`; `Live-Control-Bar` and `Dropdown` still use the previous
  `Buttons/Button` generation.

## 2026-10-16 · FutureSkills dark logo, Data Analytics certificates, old PRs

- **`Provider-Partner-Badge` 1.2 (Nelson):** logo chips padded `Spacing/sm` (28 tall); FutureSkills has a dark drawing
  (image filters in the DS), so no partner keeps a light chip on dark any more. Prototype PR 177: the chip follows,
  and the dark FutureSkills drawing is exported.
- **Data Analytics certificates (prototype PR 177):** the certificate sheet takes further partners (`morePartners`);
  the program and course certificates of Data Analytics show IBM and Microsoft, as the card, and the second signatory
  has a sample name (the AI program keeps its placeholder). The program page itself: PR 176.
- **Old prototype PRs (Nelson asked to settle them):** #52 *Draft saved as a status* merged (its September text class
  updated to `sk-text-body-medium-medium`; the DS already had the change). Closed with a note, branches kept: #161
  (the side-stripe comparison, decided 14–15 Oct) and the September lab explorations #55, #56, #57.

## 2026-10-16 · Published and accepted: the screens checked

Nelson published the DS and accepted the updates (Provider-Partner-Badge 1.1, Course-Card 1.11, Program-Card 1.10,
Transcript-Line 1.1, Container/content-padding). Checked in the product file the same afternoon:
- **102 `Course-Card`** instances on 1.11; next-topic title and topic type equal to the restore table
  (`restore/course-card-next-topic-2026-10-16.json`): nothing to reapply. One partner each (Second partner off).
- **26 `Program-Card`** instances on 1.10: the picture kept, two partner logo badges (Dark).
- **`Transcript-Line`** on the Video and AI Assistant screens: side padding 24 desktop, 20 tablet, 16 mobile (129 lines).
- **Prototype:** the List course card thumb is 84, as the DS (PR 174). The completed course card already opened its
  course page; the completed program card (Data Analytics) had no page: a program page for it is being added so the
  card opens its details (Nelson: a completed card is clickable too).

## 2026-10-16 · Course-Card 1.11: the next-topic title gets the full width

Nelson changed the Grid card: *UP NEXT* and the topic-type badge share one row, and the title below takes the full width
(306 instead of 245), two lines then an ellipsis. Applied to the other variants that show a next topic (Not started
Grid and List; List Default already had the row). My Learning DS page rebuilt. **Before the publish** the next title
and topic type of the 102 product-file instances were saved to
`03-design-system/restore/course-card-next-topic-2026-10-16.json`, because moving the badge into a new row can reset
its *Type* override (Video/Reading) on the screens; check and reapply after the update. **Prototype:** PR 174, third
commit. To publish (Nelson).

## 2026-10-16 · Course-Card 1.10: more than one partner

Nelson, 16 Oct: the course card ready for more than one partner, as the program card. In the DS the partner badge sits
in a *Partners* row with a second badge, shown by a new boolean **Second partner** (off by default); *Partner 1* and
*Partner 2* are exposed, so a screen sets each one. My Learning page rebuilt. Before the change the 102 product-file
instances were read: all on the default (IBM, Logo), no override to lose. **Prototype:** `partners?: Provider[]` on a
course (PR 174, second commit; sample: Business Analytics with Python, SkillUp + IBM). To publish (Nelson).

## 2026-10-16 · A picture on every course and program card

Nelson, 16 Oct: images on every course and program card. The 102 `Course-Card` instances in the product file already
had their covers; the 26 `Program-Card` instances showed initials. They now show a picture (*Show image* on, the thumb
`Image` filled): the AI Digital Marketing program its own cover; **Cybersecurity** and **Data Analytics** have no
picture, so they take placeholder covers (Intro to Product Analytics, Business Analytics with Python), the same in the
prototype (PR 175). To check after the publish that Program-Card 1.10 keeps the image override.

## 2026-10-16 · Partner logos: Provider-Partner-Badge 1.1 (Theme Dark), Course-Card 1.9, Program-Card 1.10

Nelson added logo variants to `Provider-Partner-Badge` and put them on the course card; the program hero needed a
dark version.
- **`Provider-Partner-Badge` 1.1:** Type=Text / Logo × a new **Theme=Light / Dark** (24 variants). Dark = the SKO Dark
  mode on the variant, so the chip and the monochrome parts flip; brand colours stay. FutureSkills is a dark bitmap:
  its Dark variant keeps the light chip until a light artwork exists (to ask the partner).
- **`Course-Card` 1.9 (Nelson):** provider as its logo, Grid and List.
- **`Program-Card` 1.10:** the hero partners are badge instances (Logo, Dark; exposed), replacing the placeholder chips.
  The 26 product-file instances all showed Microsoft + IBM, so no partner override is lost.
- DS pages *Discovery* and *My Learning* rebuilt with the generator. **Prototype:** PR 174 (`ProviderBadge type="logo"`,
  artwork exported from the DS into `public/platform/partners/`, light/dark by the surface's theme). To publish (Nelson).

## 2026-10-15 · New token Container/content-padding (24 / 20 / 16) for the topic content section

Nelson, 15 Oct: one responsive token for the padding of the content section of the topics, 24 on desktop. Decision
**026** (accepted).
- **DS:** `Container/content-padding` in `3. Responsive 📐` (Desktop 24, Tablet 20, Mobile 16; aliases `Spacing/3xl`;
  scope gap/padding; WEB `var(--container-content-padding)`). Documented in a new *Container tokens* block on the
  Foundations · Spacing, radius & grids page (with `gutter`, `gap`, `max-width`). To publish (Nelson).
- **Product file (after the publish, same day):** 88 `content` / `scroll-area` frames bound on all four sides
  (Reading 21, Lab 48, Topic Content Types 19; they had 12 / 16). Nine mobile Lab/Reading frames resolved the Desktop
  mode (24): set to Mobile, now 16. Quiz (66 screens) pads block by block: the side padding of *Topic header*,
  *Questions List* and *Content Feedback* and the header's top are on the token. **Video (Nelson chose option 2 the
  same day):** the side padding of *Video player* (and its top; not on mobile, where it is full-bleed), *Topic header*,
  *Horizontal tabs*, *Controlers*, *Auto-scroll status*, *Feedback* / *Content Feedback* on the token, on the 30 video
  screens and the 4 of the AI Assistant preview (2 mobile frames given the Mobile mode). **`Transcript-Line` 1.1:**
  its side padding is on the token, so the line text lines up with the title while the row stays full width; inside
  `Note-Item` / `Note-Editor` it keeps 16 (override). The screens pick it up after the publish. Prototype PR 173.
- **Prototype:** PR 171, `PlayerShell` content section on the token (it was a fixed 16); `tokens/spacing.md`.
- **Docs:** shell rule in `topic-types-inventory.md`, a note in `reading-screen-matrix.md` §2.

## 2026-10-15 · Program-Card 1.9: title at 20 px

Nelson set the program card title to title-large/Semibold (20/30), the course card's size, in all six variants (it was
headline-medium). With the thumb beside it, the long titles now fit in their 3 lines. **Prototype:** PR 172. To publish
(Nelson).

## 2026-10-15 · Program-Card 1.8: image thumb, next deadline, details line

Nelson asked for the program image beside the title (as on the course card) and for the four extra facts proposed for
the card. The thumb (64, initials when there is no image) sits beside the title in the hero. In progress, the next
deadline is a yellow badge after "Up next". Under the progress bar, one subtle line says what there is data for: last
studied, hours left (or in total, not started) and the end of access; a completed card shows none. Sources are in the
component description (dates API, last accessed, course effort, enrollment end). The 26 ICP instances were captured
before the change (`03-design-system/restore/program-card-overrides-2026-10-15.json`). **Prototype:** PR 170 (merged).
**Published and accepted in ICP (Nelson):** all 26 instances kept their title and text properties (checked against the
table); each now has its own course count (AI Digital Marketing 7, Cybersecurity 5, Data Analytics 5, property and hero
tag) and thumb initials (AD, CF, DA).

## 2026-10-15 · Program-Card 1.7: the number of courses in every state

A not-started or completed program card did not say how many courses it has (only In progress did, in "1 of 7 courses
complete"). Now the count is a third tag in the hero ("7 courses", after Delivery Mode and Difficulty) and, when the
program is not started or completed, sits at the right end of the progress row, as the course card shows its hours.
Data: the length of the program's `courses` (programs API). **Prototype:** PR 170. To publish (Nelson).

## 2026-10-15 · Every component set has a 16 px padding (Spacing/xl)

Nelson, 15 Oct: the main components of every organised DS page have padding XL (16 px), as `Difficulty-Badge`.
Applied to the 168 component sets inside the `Doc · …` frames (LMS and Base pages):
- **83 with auto-layout:** the four paddings bound to `Spacing/xl` (67 had 0, 12, 18–40; 6 were already so). The
  gap between variants is unchanged.
- **85 arranged by hand (no auto-layout, mostly Base):** the variants moved so that each set has 16 px on every side,
  and the set resized to fit (51 changed, 34 already so). A resize shifted the variants of `Tooltip` (centred
  constraints); put back.
- Not touched: the 34 standalone components (their own padding is part of their design). No variant, property or
  instance changes. `tools/ds-group-page.js` now binds the padding on every rebuild. To publish (Nelson).

## 2026-10-15 · Course-Type-Badge 1.1: words only

Nelson did not like either set of icons: his filled two-tone sheets, or the platform's graduation cap and rosette (dated).
Three rounds of options were tried on the real My Learning cards (books, paths, folders, layers, then a box for a course
and boxes under a certificate seal for a program). The program icon read as too complex at 16 px, so the badge is now
**the word only**: COURSE in text/subtle, PROGRAM in text/primary. The word and its colour say it as fast, and the two
cards already differ in shape. From the trial, the DS keeps a new Untitled-style icon, `boxes`. **Prototype:** PR 169. To
publish (Nelson).

## 2026-10-15 · Course-Card 1.8 (new Grid header) and green certificate strips (Program-Card 1.6)

Nelson finished both cards. **Course-Card 1.8:** a new Grid header — the Course Type line across the card, then a 64 px
thumb beside the title, then the badges — drawn on Default and applied to Not started and Completed; the Grid action
fills the width; the certificate strip of a completed course is green, and the List offers *View Certificate* only.
**Program-Card 1.6:** the certificate footer is green. On the green the label uses text/default (text/subtle is 3.3:1 in
dark). **Prototype:** PR 168 (axe wcag2aa clean, light and dark).

**Published and accepted in ICP (Nelson).** The 77 Grid instances there were captured first
(`03-design-system/restore/course-card-grid-overrides-2026-10-15.json`) and checked after the update: all kept their
title, initials, image and badges, so nothing was restored. One Completed card (My Learning 04, light) had an old
override that kept its certificate strip white: reset to the green.

## 2026-10-15 · Cards: footer by action (Course-Card 1.7, Program-Card 1.5); Assistant 1.2 with a moving ring

Nelson changed the two My Learning cards and the assistant in the DS. Checked layer by layer (the version API was
unavailable, token expired) and recorded:

- **Footer by action.** The footer box is grey (bg/subtle) beside the Primary *Resume* and white with a 1px
  border/subtle beside a Secondary action (Not started, Completed), on both cards. `Course-Card` Grid: *UP NEXT* stacks
  over the title, topic type at the top right; the certificate strip is one line. **Course-Card 1.7, Program-Card 1.5.**
- **Assistant 1.2** (chat and launcher, in review): header on bg/subtle with the sparkles in a primary-soft tile; *ME*
  and *ASSISTANT* above each message; answers on bg/primary; the AI notice under the input. The launcher ball has a
  2px gradient stroke in the logo blues; in the prototype it turns slowly round the ball (3.6 s) and stands still
  under reduced motion.
- **Prototype:** PR 167 (cards, program progress said once, hierarchy by action, assistant, ring). The count badge
  stays on bg/primary there: bg/info with white is 4.0:1, under AA.
- **Fixed in the DS the same day:** `Course-Card` List footers (Not started, Completed) white with border/subtle;
  `Program-Card` Body texts on `title-medium/Semibold`; the launcher's 14 bindings to the old `1. Color Modes`
  collection moved to the logo primitives (#51bffc ball, #044150 plane); the *Assistant* labels on
  `body-small/Regular`. Prototype PR 167 merged. **Open:** the count badge contrast (bg/info + white 4.0:1). To publish
  (Nelson).

## 2026-10-15 · Link Button 1.2: hover darkens, no fill

Nelson changed the DS `Link Button`. Checked variant by variant and recorded as **v1.2** (description, register):
hover no longer fills with bg/faint; the label and its 1px bottom line darken (Brand text/on-primary-soft +
icon/default, Destructive text/accent-red + icon/accent-red, Success text/accent-green + icon/accent-green, the grey
Secondary text/muted + icon/muted). The line uses the icon token of its tone (icon/primary, icon/error, icon/success,
icon/subtle; border/disabled when Disabled). Focused: bg/faint, radius 6. **Prototype:** PR 166
(`components/atoms/Button.tsx`). To publish (Nelson).

## 2026-10-15 · Course-Card moves to the My Learning page

Nelson, 15 Oct: the course cards belong with My Learning. In the DS, `Course-Card` (v1.6) left the Discovery page for
the My Learning page and is now `LMS/Platform/My-Learning/Course-Card` (was `LMS/Platform/Discovery/Course-Card`).
Same node, same key: instances and overrides are untouched, no version bump. Both pages were rebuilt with the
generator: My Learning has 1 molecule (`Browse-Tile`) and 2 organisms (`Course-Card`, `Program-Card`); Discovery keeps
6 atoms and `Course-Row`. `ds-levels.json`, the register and the rename map follow. To publish (Nelson).

## 2026-10-14 → 15 · Course and program cards reviewed; three DS side stripes replaced

Nelson's review of the My Learning cards in their three states (started, not started, completed), and his call on the
three DS components that carried a coloured side stripe. Compared side by side first in the prototype
(`/lab/stripes`, PR 161). Three DS publishes (14 Oct evening, 14 Oct late, 15 Oct), each accepted in the product file.

- **New token `bg/warning-muted`** (`🎨 SKO-Semantics`): a deeper, "toasted" warning surface. Light `Yellow/100`
  (#ffebbd), Dark `Yellow/950` (#85580e), the same in every skin; fill scopes; WEB `var(--color-bg-warning-muted)`.
  Text on it is `text/default`: `text/muted` fails AA on it in dark. Approved by Nelson, 14 Oct.
- **`Live-Now-Banner` v1.1:** no side stripe. Live = `bg/success-soft`, Upcoming = `bg/warning-muted` with a 1px
  `border/accent-yellow`. The Live badge was still red in Figma: green now, per ADR 012 and the code. The Upcoming
  badge was white text on yellow (fails AA in dark): `bg/warning` + `text/on-warning`, as in the code.
- **`Lesson-Block` v1.1, `Kind=HTML (Blockquote)`:** a typographic pull quote, no box and no stripe; Quote icon in
  `icon/primary`. Presentation only: the Studio blockquote is unchanged.
- **`LMS / Inline Alert` v1.1, `Tone=Answer`:** keeps its 2px top rule (the family's rule: every tone has one, Hint
  none) but draws it like Success and Error: straight, square, on `bg/faint`, in `border/primary` instead of grey.
- **`Program-Card` v1.3 → v1.4:** progress is said once (*1 of 7 courses complete* over the bar; the big percent, its
  caption and the repeated header line removed, with the `Percent` property: a break, counted as a minor under rule
  8). Not started: the orphan *START DATE* is gone, the badge carries the date only, the action is *Start*.
  Completed: *Program completed*. Verb *Resume* (was *Continue*), as on the course card.
- **`Course-Card` v1.4 → v1.6:** new `State=Not started`: no empty 0% bar, *STARTS WITH* + the first topic, *Start*.
  Up next wraps to 2 lines. Dev note: *Starts <date>* only when the course `start` is in the future.
- **Button rule (Nelson, 15 Oct):** *Resume* is always Primary; every other card action (*Start*, *Review*,
  *View Certificate*) is Secondary. The solid button marks the courses in progress when scanning a grid.
- **Product file, Platform Pages - Ready for Dev, My Learning screens 04–11:** the not-started course on the new
  variant (first topic *Python environment setup* · Reading), old instance overrides cleared (an Up next row at
  opacity 0, titles held to 1 line, a hand-typed *Details*, a stray border), cards in a row at one height. Three dev
  annotations on the program cards: the program certificate is **not MVP** (Credentials service not configured);
  the program start date has no confirmed field yet; the partner logos are sample data. RECENT CHANGES updated on
  the eight screens (2026-10-15).
- **Kept as they were (Nelson):** the COURSE / PROGRAM label above the title.
- **Not yet in the prototype:** the token, the three components and the card changes.

## 2026-10-15 · Navigation notes in Figma; test-build note in the footer

- **Figma (product file, Platform Pages - Ready for Dev page):** one `LMS / Footnote` dev note (Dev Notes + Purpose)
  under the desktop screen of Dashboard (`7283:30439`), My Learning · Courses (`7283:30443`) and Program · Courses
  (`7283:30447`): the whole card opens the page and the button the player (10 Oct), decision 025 and its three kept
  exceptions, and for My Learning how to filter program courses out of Learner Home. Once per page, not on every
  screen.
- **Prototype, PR 165:** the test-build note of the platform pages moves from under the top bar to a footer (Nelson,
  15 Oct); the notes in the Saved panel are anchored to their transcript line (read-only `TranscriptLine`), as the
  DS `Note-Item` v1.1.

## 2026-10-14 · A course of a program is reached through its program

Nelson, 14 Oct: the courses of a program are reached only from the program page or from the Dashboard's *Pick up
where you left off*. Decision **025** (accepted), **BR-47**, and a paragraph in `platform-navigation-flow.md` §1.

- Asked the same day and **kept**: the program card's *Continue* opens the player of the course in progress; a due
  item opens its work; the program certificate page links to its courses.
- **Prototype:** already so (My Learning lists the five single courses only). PR 163 adds a test that keeps it so.
- **Figma:** the eight My Learning screens checked: the course tab shows the same five single courses. Nothing
  changed. The DS publish of the Toast v1.1 and the five rebuilt pages was done by Nelson the same day.

## 2026-10-14 · Toast icons on icon tokens; five DS pages rebuilt

- **Toast v1.1 (DS, Nelson's go-ahead):** the tone icons were bound to tokens meant for other things. Now:
  Neutral `icon/muted` (was `border/default`), Success `icon/success` (was `icon/success-strong`, 2.81:1 on
  `bg/success-soft`), Warning `icon/warning` (was `bg/warning`), Critical `icon/error` (was `bg/error`); Info stays
  `icon/primary`. A row was added to the Toast changelog frame and the page header reads v1.1. The prototype already
  used these tokens: PR 162 only removes its "DS rebind pending" note.
- **DS pages rebuilt with the generator** (one frame per level), so the documentation shows today's components:
  Content (`Note-Editor`, `Note-Item`, `Topic-Header`), Sidebar (`Topic-Row`), Dashboard (`Resume-Row`), Discovery
  (`Course-Row`) and LMS · Shared components, where `Duration` is now a normal atom block (the provisional block
  is gone) and the intro names the duration instead of the progress circle, which moved to Base.
- **Levels:** `Note-Item` is now a molecule, since it nests `Transcript-Line`; `Duration` is an atom of the Shared
  page (`03-design-system/tools/ds-levels.json`).
- Nothing published: Nelson publishes the DS.

## 2026-10-14 · "approx." goes after the time; a Duration atom

Nelson, 14 Oct: an estimated duration reads **"8 min read approx."**, not "approx. 8 min read" (it was cut to
"approx…" on a phone). Then: make it a component, with a boolean for approx.

- **Rule:** decision 004 amended: `approx.` after the time; when it appears is unchanged. BA rules and glossary
  updated.
- **Design system:** new atom `LMS / Duration` (v1.0) on the LMS Shared components page: *Size* sm
  (body-small/Medium) and md (body-medium/Medium), a *Time* text, an *Approx* boolean that shows "approx." after
  it, text/subtle, 4 apart. Not yet used inside `Topic-Row`, `Topic-Header` and the other components that print a
  duration. Then, with Nelson's go-ahead, it replaced the duration text in `Topic-Row` (sidebar), `Topic-Header`,
  `Resume-Row`, `Course-Row` (Discovery) and `Discussion Prompt` (an exposed instance, same place, same visibility
  link; each +0.1). The time is cut with an ellipsis when space is short and "approx." stays whole. Before the
  swap the duration texts were recorded: 70 instances inside the DS (put back at once) and 215 on the product
  screens (put back after the publish, with Approx on wherever the text carried "approx.").
- **Product file:** the seven durations that carried the prefix (Overlay Panels 6, Topic Content Types 1) and the
  two rule titles on the Diagram Flows page now put it after the time. Nelson's V7 discovery page was not touched.
- **Prototype:** PR 151, 443 duration strings and the code that adds or strips it.
- **The anchor quote of `Note-Editor` (Nelson, the same afternoon):** it was a local frame in each of the three
  variants. It is now an instance of `Transcript-Line` (State=Active): the note is anchored to a line of the
  transcript, so it shows as that line (Show duration off, the Note button hidden). `Note-Editor` v1.1, its *Quote*
  property removed. An `LMS / Anchor Quote` atom made first was deleted before any publish. Prototype PR 159:
  `TranscriptLine` read-only in the note editor and in the note item. Then, on Nelson's question, `Note-Item` too
  (v1.1): its anchor, a bare left rule until now, is the same `Transcript-Line`; its 19 anchor texts on the screens
  were recorded and are put back after the publish. `SavedNoteItem` in the prototype's Saved panel is unchanged.
- **After the publish (14 Oct):** the 215 durations are back on the screens (182 set, 33 already right; Approx on
  wherever the text carried "approx."), and the 19 `Note-Item` instances were re-pointed to the current version
  (they had stayed on an older copy) with their anchor quotes put back (7 differed from the default; 6 items are
  hidden on their screens). The temporary record page was deleted. A defect of the swap seen on the render: in
  `Topic-Header` the `Duration` instance filled the row, so "approx." sat at the far right; it now hugs its
  content (to publish again).
- **After the second publish (14 Oct):** the 217 `Topic-Header` instances on the product screens had stayed on an
  older copy of the component; they were re-pointed by key (properties, texts and duration values checked, none
  lost). The headers now read "8 min read approx." with "approx." right after the time, desktop and mobile
  (checked on the render). Nelson's discovery pages (V7, Complementary) were not touched.

## 2026-10-14 · One progress circle: the two merged

Bruno (via Nelson, 14 Oct): the design system had two symbols that drew the same thing. *We have to merge them.*
Named version saved before the write.

- **Kept:** the former `LMS / Progress Circle`, now named **`Progress circle`**, v1.0 → v1.1. Same component and key,
  so the `Sidebar`, `Overall-Progress` and every screen keep their link. It has the three states (Not started,
  In progress, Completed in green) and ends straight.
- **Archived, not deleted:** the Untitled UI kit `Progress circle` (sizes and a half-circle shape). Nothing in the LMS
  used it, in the design system or on the product screens; only the kit's example pages (Dashboards 01 and 02,
  Application navigation) did, and they keep their link. It now lives on the archive notes page with a name that
  says it was replaced.
- **Page rebuilt:** *Progress indicators* documents four components in its *Atoms* frame: `._Progress circle_Ring`
  (Nelson's ring part with the steps of 10 and a Percentage label), `Progress circle`, `Progress bar` and
  `._Progress bar plain`. Three old block frames left loose on the canvas were removed (they held no component);
  the loose test instances next to the documentation were not touched.
- **Values in a logical order (Nelson, 14 Oct):** the property tables of the documentation list numbers and sizes
  in ascending order (two tables corrected: `Lock` and `._Progress bar plain`), and the page generator now sorts
  them itself. The order of the values inside the components (the properties panel) and the order of the
  variables in their collections **cannot be changed by a script**: the Figma plugin API has no way to reorder
  them; it is a drag in the panel. To do by hand: variant values of `Lock` (sm, md), `_Mega input field base`
  (sm, md, lg), `._Progress bar plain` (70% before 80%), `Loading indicator` (sm, md, lg, xl); variables in
  `_Primitives` › Numeric (2.5 after 2), Colors/SKO-Brand/Neutral, Dark-Teal and Dark-Neutral (ascending), and
  `3. Responsive` › Type/line-height (text-2xs first). The variant layers of those four sets were put in order
  in the layers list.
- **To publish.** Open: whether `Progress circle` should take over the sizes of the kit circle, or be built on
  `._Progress circle_Ring` to show any step of 10.

## 2026-10-14 · LMS / Progress Circle promoted to the Base components

Nelson, 14 Oct: move `LMS / Progress Circle` to the shared Base components (*Progress indicators*) without losing
the links where it is used, then organise the page as the others. Named version saved before the write.

- **Moved, not copied:** the component itself (same node, same key `ec8fdecc…`) now lives on
  *↳ Progress indicators (WIP)*. Every instance keeps its link: the `Sidebar` (4) and the `Overall-Progress`
  documentation (5) still point at it, checked after the move. Its name is unchanged.
- **A duplicate was found and archived:** someone had pasted a copy onto the Progress indicators page (new key,
  no instance used it). It was moved to the archive notes page, renamed *duplicate copy, unused*, not deleted.
- **Pages rebuilt with the generator:** *Progress indicators* now has the full write-up (Progress bar, Progress
  circle, `._Progress bar plain`, `LMS / Progress Circle`, `_Progress circle_Ring`), in an *Atoms* frame.
  *LMS · Shared components* was rebuilt without it (2 atoms, 3 molecules). `ds-levels.json` updated.
- **Left in place on the Progress indicators page:** the work in progress that was there (`_Progress circle_Ring`
  is documented; the loose *Progress bar* and *Progress circle* instances and *Frame 1* were not touched).
- **Progress circles end straight too (Nelson, 14 Oct):** the kit `Progress circle` (22 ring strokes) and
  `_Progress circle_Ring` (21) had round caps; they are now square (stroke cap None). `LMS / Progress Circle` draws
  its ring as a filled arc, so its ends were already straight. Each description says so. To publish. The
  prototype already drew its rings with square ends (`OverallProgress`, the course Progress tab).
- **`Overall-Progress` Mobile now uses `LMS / Progress Circle` (Nelson, 14 Oct), v1.0 → v1.1:** the variant drew
  its own ring and percentage; it now holds an instance of the component, as Desktop does. Its six instances in
  the DS (collapsed and mobile `Sidebar` states and their documentation) show 67% as before; no instance in the
  product file used the variant. To publish. Prototype PR 150 also merged the same day: the assistant button
  stays fixed at the bottom of the screen again.
- **Open:** the name still starts with `LMS /` while it now sits with the Base components, next to the kit's
  `Progress circle` (12 uses in the DS). A rename keeps every link; it waits for Nelson.

## 2026-10-14 · The two-button rule applied

Nelson, 14 Oct: review the buttons in Figma and in the prototype against the rule *two buttons side by side both
fill, except on a large screen or in a list*. Named version saved before the write.

- **Design system** (23 pairs found): already following it: `Note-Editor` Mobile, `Results`, `Entry-Header`,
  `Certificate-Card`, `_Modal actions` (fill container). Hugging on purpose (desktop or wide): `Note-Editor`
  Desktop and Tablet, `Live-Control-Bar`, `VILT-Session-Card` (1276 wide), `Empty state responsive` Desktop,
  `_Modal actions` right aligned. Changed: `Course-Card` `Layout=Grid, State=Completed`, *Review* and
  *View Certificate* now fill (to publish). Left as they are, to decide: `ORA-Submit-Gate` and
  `Activity-SCORM-Frame` (Error) have one variant for every width and hug.
- **Screens** (the eight handoff pages, 68 pairs): Quizzes 15 of 15 already fill. Fixed: the completed course card
  on the Courses tablet and mobile screens. Kept hugging (desktop dialogs and panels): *Not yet* / *Yes,
  completed* (Video, Reading, Lab: 8), *Cancel* / *Save note* on desktop and tablet (4), *Cancel* / *Continue to
  IBM* on the Lab page (2). The Topic Content Types discovery page was not changed.
- **Prototype** PR 148: on mobile the ORA confirmation, the SCORM error, the VILT session and the quiz results
  share the width; the note editor, the completion dialog and the certificate page already did.

## 2026-10-14 · Versions caught up; three group pages rebuilt and split by level

Nelson, 14 Oct: bump the versions and update the DS pages. Named version saved before the write.

- **Versions** (descriptions in Figma, register in `03-design-system/component-versions.md`): `Course-Card` 1.2 → 1.3,
  `Program-Card` 1.1 → 1.2, `Section-Header` (Platform) 1.0 → 1.1. Each description gained a dated paragraph
  saying what changed. To publish.
- **Group pages rebuilt:** Dashboard, My Learning and Discovery were rebuilt with the generator so that their
  blocks show the components as they are now (new chips, properties, measures, rules and anatomy), and split
  again into *Atoms*, *Molecules*, *Organisms*.
- **Rule, two buttons side by side (Nelson, 14 Oct):** when two buttons stand together, both fill and share the
  width, except on a large screen or in a list, where they hug their label. The completed course card in a row
  already follows it (*Review* and *View Certificate*). Not yet audited across the other screens.
- **Generator:** `03-design-system/tools/ds-group-page.js` takes a new `LEVELS` constant (the map from
  `ds-levels.json`); with it the rebuild splits the blocks by level itself, so a rebuild no longer undoes the
  split. A component missing from the map stops the split and is reported.

## 2026-10-13 · Design system: the LMS group pages split by level (Atoms, Molecules, Organisms)

Nelson, 13 Oct: separate the atoms from the molecules and the organisms, one frame for each. Named version saved
before the write.

- **What changed:** on the 14 LMS group pages (7 of the ICP, 7 of the Platform) the single documentation frame
  became up to three frames side by side, *Atoms*, *Molecules*, *Organisms*, each with its own header and the
  component blocks of that level. The first frame keeps the page header with the count per level. The blocks
  were moved, not rebuilt: same components, same keys, nothing to publish. 112 components:
  45 atoms, 50 molecules, 17 organisms.
- **The rule used** (written in each frame header): an atom is one element with one job and nests no other LMS
  component (a thin wrapper around one base component counts as an atom); a molecule joins atoms and base
  components and nests no other LMS molecule; an organism is a whole section of a screen. A level written at
  the start of a component description wins. Only 13 components declared one; the others were classified from
  what they nest, plus five judgement calls.
- **The classification** is in `03-design-system/tools/ds-levels.json`, with the judgement calls. It is a first
  pass for Nelson to correct: moving a block to another frame is a drag.
- **Base components, the same evening (Nelson):** the 24 pages under *BASE COMPONENTS (Shared)* got the same
  frames. There the components lay loose on the canvas, so the component sets themselves were moved into the
  frame of their level (same nodes, same keys); on the four pages with full write-ups the blocks moved as on
  the LMS pages. 90 components and parts: 54 atoms, 33 molecules, 3 organisms
  (`Modal`, `Text editor`, `Video player 16:9`). They were classified by name, not by what they nest; the list
  is in the same file. The kit's 49 *Design system header* banners, which titled the old columns, were moved to
  the archive notes page (nothing deleted). Left where they were: the documentation, changelog, showcase and
  example frames, loose example instances, and the `SKO / Keyboard key` section on Inputs.
- **Not done:** the level is not written into the component descriptions (that would change 100+ components
  and need a publish); `ds-group-page.js` still builds one frame, so
  after a rebuild the blocks have to be split again with the map.


## 2026-10-13 · My Learning: one ordered list and a status filter (the three sections are withdrawn)

Nelson, 13 Oct, evening: the three sections spread the cards and make the learner scroll. Approved instead: a
filter. Named version saved before the write.

- **The rule:** each tab of My Learning (Courses, Programs) is ONE list, always ordered *In progress*, *Not
  started*, *Completed*. Under the toolbar a DS `Button group` filters by state: *All* (default), *In progress*,
  *Not started*, *Completed*. It works together with the search and the Grid / List view. The state is the one
  Open edX gives (course: `hasStarted`, `certificate.isEarned`; program: `progress_details`). This replaces the
  entry *My Learning in three sections* below: the sections and their headers are gone; the completed state of
  the cards stays.
- **Mobile:** the four segments (404) are wider than the screen (327), so the filter scrolls sideways.
  Corrected by Nelson the same night (`7187:37067`): the `Button group` itself fills the width and clips, so
  the track spans the screen and stays put while the segments scroll inside it; the last one is cut at the
  track's right edge. Both mobile screens are that way; prototype PR 143. The prototype keeps its segments 44
  tall on mobile (target size), Figma draws 32.
- **Browse catalog** stays hidden.
- **Figma, Ready for Dev:** the eight screens (`6408:73284` … `6408:76383`) rebuilt that way; each handoff card
  carries a *Recent changes* line of 13 Oct. The desktop Courses grid went from 1920 to 1338 tall. On the WIP
  page the sections proposal (`7154:25789`) is marked superseded and the filter proposal (`7184:28158`) approved.
- **Prototype:** PR 138.
- **Toolbar in two rows (Nelson, later the same evening, drawn by him on `6408:73284`):** the tabs alone on the
  first row, on their rule across the whole width; on the second row the status filter on the left and the
  search (320) with the Grid / List toggle on the right, `Spacing/3xl` apart. Nelson did the three Courses
  screens of desktop and tablet; the three Programs screens were brought to the same layout. Mobile keeps tabs,
  search, filter. Prototype PR 140, which also brings his two component changes: `Program-Card`
  `State=Not started` reads *Not started* where *0%* was, over the caption *START DATE*, with the footer box on
  bg/subtle; `Section-Header` has 12 under the title and a 1px border/subtle rule (seen on the Dashboard).
  Not confirmed with Nelson: the Grid / List toggle is visible on the Courses tablet screen (`6408:74498`),
  where the rule so far is Grid only below desktop.
- **The stats leave My Learning (Nelson, the same night):** the three figures at the top (*In progress*,
  *Completed*, *Certificates*) are hidden on the eight screens and removed from the prototype (PR 141): the
  Dashboard already shows them. The header is the page title alone. This also closes the question of whether
  those figures should count the courses of the completed sample program, as far as My Learning goes.
- **`Section-Header` rectified by Nelson (the same night):** the rule under the header and its 12 of padding
  are withdrawn; the action is the DS `Link Button` (Brand, Secondary) with a 16 arrow and a 1px icon/subtle
  rule under it. Prototype PR 142. In the design system the component showed unpublished changes when read.
- **`Course-Card`, the provider (Nelson, the same night):** in `Layout=Grid, State=Default` the provider or
  partner badge sits at the right end of the Course Type line, not under the title. Prototype PR 144 (grid
  card, both states) and PR 145 (list row). In the design system Nelson then gave `Layout=List, State=Default`
  the same line, and the two `State=Completed` variants were brought to the same structure (their titles block
  is a copy of the Default one). Not published yet when written. To watch after the publish: the title and
  provider overrides of the course cards on the screens, because the layers moved inside new frames.
- **`Course-Card`, more changes by Nelson (later the same night), prototype PR 146:** in `Layout=List` the
  provider sits right after the Course Type badge, 16 apart (at the right end only in the grid card);
  `Layout=Grid, State=Completed` has two actions, *Review* (Secondary) and a Primary *View Certificate*; the
  list footer hugs its content (86, and 60 when completed). When read, the component still showed unpublished
  changes, and the My Learning screens still drew the earlier card (provider under the title, one action): they
  will follow once the library is published and accepted. Label settled by Nelson: *View Certificate*. The
  prototype uses it on the course card and on the completed program card, and the two `State=Completed`
  variants of `Program-Card` in the design system were changed to it (to publish). Other places still write
  *View certificate* (the Certificates tab of the program page, the course-complete modal): not touched.
- **14 Oct, after Nelson's publish:** the course cards on the four Courses screens still pointed at an older copy
  of `Course-Card` (the nested card inside `Course-Row` does not follow the library update by itself). All 20 were
  re-pointed by key to the current variant, keeping their texts, covers and topic types: the provider is now on
  the Course Type line and the completed card shows *Review* and *View Certificate*. The program cards had
  updated on their own. Prototype PR 147: in a row the two actions share the width, and the certificate date
  sits at the right end of the strip, as on the screens.
- **Open:** no counts on the segments (the `Button group` segment only has a text); the filter is not kept in
  the URL in the prototype; the label is *Not started*, as the card says (Nelson also said *coming soon*); the
  completed course loses its cover whenever a library update of `Course-Row` or `Course-Card` comes in (the
  nested card falls back to an older copy of the variant) and has to be re-pointed by key; Nelson's reworked
  `Section-Header` (count on the right, a rule) and the reworked *Not started* program card are not in the
  prototype yet.


## 2026-10-13 · My Learning in three sections; the completed state on the screens; video sliders end straight

Nelson, 13 Oct: the proposal of the morning is approved. Named versions saved before the writes in both Figma
files.

- **The rule:** both tabs of My Learning (Courses, Programs) are split in three sections, in this order:
  *In progress*, *Not started*, *Completed*. Each sits under the `Section-Header` of the Dashboard with its
  count (*3 courses*, *1 program*). A section without cards is not shown. `Spacing/xl` between a header and its
  cards, `Spacing/4xl` (32 / 24 / 20) between sections. On Courses the Browse tile closes the page in a line of
  its own. The state is the one Open edX gives: a course from `hasStarted` and `certificate.isEarned`, a program
  from `progress_details` (map §37).
- **Figma, Ready for Dev:** the eight My Learning screens (`6408:73284`, `73888`, `74498`, `75046`, `75613`,
  `75885`, `76167`, `76383`) rebuilt that way. The completed course is now `Course-Card` `State=Completed`
  inside its `Course-Row`; a completed sample program (*Data Analytics Foundations Certificate*, 5 of 5,
  certificate of 30 Sep 2026) is `Program-Card` `State=Completed`. The Programs tab counts 3 and the *Completed*
  figure reads *courses · 1 program*. The proposal frames on the WIP page (`7154:25789`) now use the same
  variants instead of overrides.
- **Design system, three repairs to the Completed variants built this morning (published by Nelson the same day):**
  `Program-Card` `State=Completed`: `Title` and `Courses` had lost their link to the text properties, so every
  completed card showed the default title. Linked again; `Percent` stays a fixed 100%. `Course-Card`
  `State=Completed`: the `Image` layer of the thumbnail was missing, so `Show image` did nothing. Added and
  linked. No version change: the variants now do what v1.1 and v1.2 said. After the publish the ten completed
  cards (eight on Ready for Dev, plus the proposal) still pointed at the earlier copy of the variants, so they
  were swapped to the current ones by key; the completed course now shows its cover and the program texts come
  from the properties.
- **Video sliders end straight.** Nelson changed `_Video actions bar` and `_Video volume slider handle`: the
  progress and the volume tracks have no radius; only the 12px volume handle is round. One variant he had
  missed (`Volume=100%`) was squared, and the sentence in the `Course-Card` description that said sliders stay
  rounded was corrected.
- **Prototype:** PR 134 (the two video sliders, merged) and PR 135 (the three sections, the completed state of
  the course and program cards, `PlatformProgressBar` `tone="complete"`, a completed sample program).
- **Later the same day (Nelson):** the *Browse catalog* tile is hidden on the screens and in the prototype
  (PR 137): that option has not been discussed yet. Nelson also reworked the `Section-Header` (count on the
  right, a rule under it) and finds that the three sections spread the cards and make the learner scroll. A
  second proposal is on the WIP page (`7184:28158`, Courses desktop and mobile, not for build): one list per tab,
  always ordered In progress, Not started, Completed, with a status filter (DS `Button group`: All, In progress,
  Not started, Completed) under the toolbar. **The three sections are therefore under review, not final.**
- **Open:** the completed sample program has no program page and no certificate page; the big figures (4, 2, 2
  and *of 17 enrolled*) do not count its five courses; tablet, mobile, dark and list view of PR 135 were not
  looked at in the browser; the first row of the Courses screens still carries a Primary *Resume* in Figma.


## 2026-10-13 · Buttons: hug or fill, never a fixed width; a regression of the same day repaired

Nelson, 13 Oct, on a Modal whose *Cancel* was 79 wide and fixed: *a button either hugs its content or fills
(mobile). Never a fixed 79.* Named versions saved before and after in both Figma files.

- **The rule:** a `Button` or `Link Button` hugs its content or fills its container. Never a fixed width. For a
  full-width button BOTH the instance and its nested structure are on Fill; with only the instance on Fill the
  visible button stays narrow inside it. Written in the two descriptions and on the Buttons page.
- **What was wrong, and why:** two things. Old overrides that pinned the nested structure at 79 (the Modal
  buttons, `Empty state responsive`, the progress cards). And a regression of this morning: making the `Button`
  variants hug (v1.3) moved their nested structure from Fill to Hug, so every full-width button that relied on
  the variant's Fill was left with a narrow structure. The check made then looked only at buttons placed
  directly on the screens (all on hug) and missed the buttons nested in other components. The error was in that
  check, not in the screens.
- **Design system, published by Nelson the same day:** 63 buttons inside components corrected (20 in `_Modal actions`, 8 in
  `Entry-Header`, 12 in `Empty state responsive`, 4 each in `Results` and `Progress-Card`, 3 each in
  `Sidebar-Card` and `Course-Complete-Modal`, 2 each in `Note-Editor`, `Certificate-Card`, `._Card footer`, and
  3 hugging Modal buttons freed from 79). Audit after: 113 on hug and hug, 56 on fill and fill, none fixed, none
  narrower. Two hidden *Book a call* buttons in `Sidebar-Card` still read fixed 140: an instance cannot be
  resized while hidden.
- **Screens, done without waiting for the publish:** 250 buttons corrected on the handoff pages (Platform Ready
  for Dev 91, Platform WIP 80, Quizzes 37, Lab 27, Completion 9, Video 4, Reading 2). Audit after: none left on
  those seven pages. Seen as an image: the *Resume*, *Review* and *Start* of the My Learning course cards span
  the card again.
- **Limit of the component, for a decision:** the visible button is a nested structure, so no default serves
  both uses: with hug as the default, a full-width button needs the second Fill by hand. Two ways out: a `Width`
  property on `Button` (Hug, Fill), or drawing the button on the component itself with no nested structure.

## 2026-10-13 · My Learning: the figures at the top also count programs

Prototype [pull request 133](https://github.com/nvjeronimo/skillup-lms-prototype/pull/133).

- **Decided by Nelson on 13 Oct:** the three figures at the top of My Learning count programs too.
- **How it reads:** the figure stays the number of courses, the total Learner Home returns; the line under it
  names the programs in that state: *In progress · 4 · courses · 1 program*. With no program in that state the
  line reads *courses*. *Certificates* is unchanged. Program states come from `progress_details` (map §37).
- **Figma:** the line under *In progress* on the eight My Learning screens of Ready for Dev, and under
  *In progress* and *Completed* on the four proposal frames (they show a completed program). No design system
  change: it is the `Detail` text of `Stat`. On mobile the line wraps to two, so the first stat is 134 tall
  beside two of 116, aligned at the top; the two mobile screens are 18 taller.
- **Prototype:** the same, with the program count read from the program cards; the stats align at the top.
  Checked in the browser at 1440 and 375.
- **To decide:** whether the figure itself should include programs, or stay courses with programs named under
  it as now.

## 2026-10-13 · The completed state is in the design system: Program-Card and Course-Card

Nelson accepted the proposal of the entry below (My Learning in sections, a completed state for the cards) and
asked for the variants. Named versions saved before and after. **Published by Nelson and accepted the same day.**

- **Rule, decided by Nelson on 13 Oct:** a progress fill is `bg/info` while the course or program runs and
  **green (`bg/success`) only when it is done**. The state never depends on the colour alone: a check icon and
  the word *Completed* come with it. This completes the rule of 25 Sep (never `bg/primary`).
- **`LMS/Platform/My-Learning/Program-Card` v1.1:** `State=Completed` for Grid and List. 100%, a full green
  bar, a check icon before *PROGRAM COMPLETED*, the footer *Certificate issued* with its date (new text property
  `Certificate date`) and a secondary *View certificate*. The date sits under its label, so it is not cut on a
  phone as it was in the proposal.
- **`LMS/Platform/Discovery/Course-Card` v1.2:** a new variant property `State` (Default, Completed), Grid and
  List. Completed: a full green bar, a check icon before *Completed*, the strip reads *CERTIFICATE · Issued …*
  with no topic type, the action is *Review*. The two existing variants became `State=Default` with the same
  keys, so every instance keeps working; Default covers in progress and not started, which differ by their texts.
- **The date is the certificate's:** Open edX gives no other completion date (map §37).
- **The My Learning and Discovery group pages** were rebuilt and document the new variants.
- **To set by hand on a completed program:** `Courses` ("5 of 5 courses complete"); the property is shared by
  the three states, so its default still reads *1 of 7*.
- **Next, after the publish:** the proposal frames on the WIP page move from overrides to the variants; then the
  My Learning screens on Ready for Dev and the prototype (sections and the completed state).

## 2026-10-13 · Progress bars end straight; a proposal for My Learning sections and the completed state

Two things asked by Nelson on 13 Oct. Named versions saved before and after in both Figma files.

**Progress bars end straight (rule restated by Nelson).** A progress bar has no rounded ends, track or fill.

- **Checked in the design system:** the base `Progress bar` already draws track and fill with no radius, and so
  do the 18 places the LMS components use it. The one rounded bar was the hand-built bar of `Course-Card`.
- **`LMS/Platform/Discovery/Course-Card` v1.1, published by Nelson and accepted the same day:** radius 0 on its bar and fill, both layouts.
- **`Progress bar`, no bump:** an inert radius 8 on the bar frame of the 55 labelled variants is removed (the
  frame does not clip, so nothing changes on screen); its description states the rule.
- **Prototype, [pull request 132](https://github.com/nvjeronimo/skillup-lms-prototype/pull/132):** the course
  card and course row bars were fully rounded; they end straight now. The quiz and program bars already did.
- Sliders the learner drags (video progress, volume) stayed rounded on that day. **Superseded the same day:** Nelson made them straight too, see the entry *My Learning in three sections* above.

**Proposal, not for build: My Learning in sections and a completed state for the cards.** On the Platform WIP
page, section `7154:25789`, four screens (courses and programs, desktop and mobile) and four notes.

- **Sections:** In progress, Not started, Completed, in that order; an empty section is not shown; tabs, search
  and the Grid or List switch stay; the three figures at the top become shortcuts to their section.
- **Completed card:** the bar is full and green (`bg/success`), the label reads *Completed*, the footer shows
  the certificate and its date; course *Review*, program *View certificate*. Blue while it runs, green only
  when done: an exception to the rule that a progress fill is `bg/info`, to be written if the proposal is kept.
- **Facts:** every status comes from what Open edX returns (map §37): `hasStarted`, `startDate`, the
  certificate and its date, and `progress_details` for programs. There is no completion date other than the
  certificate's.
- **How it is built:** clones of the Ready for Dev screens with overrides only. `Program-Card` has no Completed
  variant, so the completed program is an In progress card with its texts, bar and button changed; the check
  icon the proposal describes cannot be shown in an instance.
- **Seen while building:** on mobile, *View certificate* leaves room for *Issued 30 Sep…* only; the tabs and the
  figures at the top still show the old totals.
- **Next, if Nelson keeps it:** `State=Completed` on `Program-Card`, a completed look on `Course-Card`, the rule
  for green, then the screens and the prototype.

## 2026-10-13 · Prototype: the video player, the completed badge and the course card brought to Figma

Asked by Nelson on 13 Oct. Prototype pull requests
[130](https://github.com/nvjeronimo/skillup-lms-prototype/pull/130) and
[131](https://github.com/nvjeronimo/skillup-lms-prototype/pull/131). No design system change.

- **Completed badge, decided by Nelson:** it always reads *Marked as completed*, label only, as
  `Topic-Status-Badge` in the design system and the 27 topic headers on the Video page. The prototype wrote
  *Completed* with a check icon on the types that complete by themselves (Video, Quiz, ORA, VILT). This replaces
  the wording rule the prototype took from `reading-screen-matrix.md` §4.
- **Video player (130), against the player on the Video screens:** the ground is `bg/subtle` and the picture is
  fitted 16:9 and centred (the prototype painted a teal gradient over the whole player); paused, the scrim is
  `bg/overlay` and the centre button has the Solid play icon, blur 16 and a light edge; the end timestamp is the
  time left with a minus; radius 6, and 8 on a phone. Measured in the browser: 1286 × 405 with the picture
  720 × 405, against 1288 × 405 in Figma.
- **The white CC button is the design system's on-state.** `_Video action button` has `State=Active` on its 18
  types (`bg/on-media`, icon on `icon/on-fixed`, label on `text/on-fixed`), and the prototype uses those tokens
  while captions are on. This entry first said the design system had only Default and Hover: that was a
  misreading of the variant list. The component's description now explains the three states.
- **Left as it is on the player, to decide:** captions are on by default in the prototype and the screens show
  none; the bar's gradient ends on `bg/overlay` where the component uses plain black.
- **Course card (131), against `Course-Card` and the Platform Ready for Dev screens:** the *UP NEXT* overline is
  body-small/Semibold without letter spacing; in List the progress block hugs its line (24 between percentage
  and effort) and the up-next block is 250 wide with a one-line title; in a course row the title is one line
  too. Measured: grid 382 × 346 and list 1198 × 118, as on the screens.
- **Found, not changed:** the course row around the list card is 165 tall in the prototype and 173 on the
  screens (the modules bar of `Program-Detail/Course-Row` is 8 shorter).

## 2026-10-13 · Prototype: the program card matches the design system component

Prototype [pull request 129](https://github.com/nvjeronimo/skillup-lms-prototype/pull/129). Asked by Nelson on
13 Oct against `LMS/Platform/My-Learning/Program-Card`. No design system change.

- **Partner logos:** the chips on the dark hero showed JPGs on a white ground. They are now the component's
  light-on-dark drawings, exported from Figma as SVG, at their own size inside the 77 × 36 chip.
- **Delivery Mode badge:** the prototype drew Badge Soft / Info; `Delivery-Mode-Badge` is Badge Modern / Info on
  its three types. Corrected in the badge itself, so it changes wherever the badge is shown: course cards, the
  course and program headers, the My Learning course card.
- **Type icon:** *Program* and *Course* carry the design system's own 16px icons instead of stand-ins.
- **Checked** in the browser by computed values against the component in its dark mode (sizes and colours
  match; the badge is 136 wide against 137). No image comparison.
- **Not done:** the course and program headers still use the JPG logos.

## 2026-10-13 · Dashboard: Resume is Secondary on every row of Continue learning

Prototype [pull request 128](https://github.com/nvjeronimo/skillup-lms-prototype/pull/128).

- **Decided by Nelson on 13 Oct:** the *Resume* button of a course row is the second hierarchy. This replaces
  *one primary per list* of 7 Oct for these rows, where the first row kept a Primary *Resume*.
- **Prototype:** `CourseRow` and `ResumeRow` default to Secondary and the Dashboard no longer makes the first
  row Primary. Checked in the browser: the three *Resume* on the Dashboard are Secondary.
- **Design system:** nothing to change, `Course-Row` and `Resume-Row` already show Brand Secondary.
- **Not changed, to decide:** the screens in Figma still follow the 7 Oct rule (the first row of each list of
  three has a Primary *Resume*: 6 rows on Ready for Dev, 10 on the WIP page, as counted then). In the prototype,
  *Start* on an Available row is still Primary and *Details* on a Locked row is the neutral outline, where the
  design system shows Brand Secondary for both.

## 2026-10-13 · The open points of the day closed: buttons hug, names without a version, the rail card from the keyboard

Nelson, 13 Oct: fix what was left open. Named versions saved before and after in the design system.
**Published by Nelson and accepted in the product file the same day.**

- **`Button` v1.3 and `Link Button` v1.1:** every variant hugs its content. They were fixed (79 and 93 wide), so
  turning an icon on in the nested part clipped the content until the instance was resized by hand. Sizes at rest
  are the same; a test instance with both icons goes from 79 to 127. On the handoff pages the 86 direct `Button`
  instances were already set to hug and none was clipped, so nothing moves there.
- **Names without a version, same keys:** the only variant of `Topic-Footer-Nav` is `Default`; `Empty state - V2`
  is `Empty state responsive` (it is the one with a `Device` property); `._Progress bar-V2` is
  `._Progress bar plain` (the bar without a label). None of the three is used inside another DS component.
- **Not renamed:** `Property 1=V1 | V2` on `Event_card_atom`, Mobile App page. The two variants look the same and
  the component belongs to the mobile app: for its owner to name.
- **Prototype, [skillup-lms-prototype#126](https://github.com/nvjeronimo/skillup-lms-prototype/pull/126):** the
  card of the collapsed rail opens on keyboard focus of a rail row; arrow right moves into it, Escape or arrow
  left returns to the row. The saved mark is 12px (was 11) and the card uses the DS effect `Elevation/level3`
  through a new CSS variable, `--sk-shadow-elevation-3`, instead of Tailwind's `shadow-lg`. Checked in the browser.
  `Topic-Flyout`'s description now states the keyboard behaviour.
- **Still open:** the arrow-key way into the card is not announced to a screen reader user; not tested with one.

## 2026-10-13 · Content-Feedback can carry Mark as Complete in the design system

Agreed with Nelson on 13 Oct, to close the open point of the entry *Mark as Complete moves into the feedback row*:
the 63 screens use a local frame `Feedback-Mark` because the component had no place for the action. Named versions
saved before and after. **Not published.**

- **`LMS/ICP/Content/Content-Feedback` v1.1:** new boolean **`Show Mark as Complete`**, off by default. On, the
  nested `Topic-Status-Badge` (on *Mark as Complete*, exposed) sits at the right end of the row. With it off the
  component looks as before.
- **How it is built:** the feedback items and the licence are inside a new group `Feedback` that fills the row
  and is never narrower than the three items (265); the action hugs. The row wraps: when both do not fit, the
  action drops under the feedback, 24 apart on desktop, 20 on tablet and 16 on mobile (`Spacing/3xl`).
- **Measured on test instances, then removed:** 1080 and 600 wide, one row, 60 high, the action at the right;
  311 wide, the action under the feedback (102 high in the desktop mode of the token). The same sizes as the
  local frames on the screens.
- **The block on the Content page** shows the new property, the measures and a three-part anatomy.
- **Not the same as the local frame:** the rule above and below the row and the page background are on the
  local frame, not in the component (the component never had them).
- **Published by Nelson and accepted in the product file the same day. The local frames are replaced:** 64
  `Feedback-Mark` frames are now the component with `Show Mark as Complete` on: Lab 35, Reading 19, Video 2,
  Topic Content Types Discovery 8 (the entry of the morning counted 63). Every one keeps its size (1080 × 60,
  600 × 60, 311 × 94 or 102, 1112 × 60) and its parent's height; the rules, the background, the side padding of
  the Video and the licence option were carried to the instance, and the *Secondary* button on the ten Lab
  screens that had it. Nelson's reference frame `7124:49482` was left as it is. Two looked at as images
  (Lab desktop, Video); a mobile one would not render in the capture and was checked by its measures only.
  Named versions before and after.

## 2026-10-13 · Topic-Footer-Nav: the status badge is removed from the component

Nelson, on the anatomy of the component: *Mark as Complete does not belong to the footer navigation; it is in the
feedback row, as defined today.* Named versions saved before and after. **Not published.**

- **`LMS/ICP/Player/Topic-Footer-Nav` v1.1:** the property `Show Badge` and the `Topic-Status-Badge` it showed
  are removed. The footer is Previous, the position (n of total and the title) and Next. No screen had the badge
  on (183 footers counted on the Video, Quizzes, Reading, Lab and Platform WIP pages, 0 with it on).
- **`Topic-Status-Badge`, description only:** *Use once per topic, in the feedback row at the end of the
  content, never beside the footer navigation.*
- **The block on the Player page** shows it: no `Show Badge` row, four parts in the anatomy.
- **Open:** the variant of the footer is still named `Topic Footer Nav Default (V1)` (a name with a version, for
  Nelson); `Content-Feedback` still has no place for Mark as Complete in the design system, the 63 screens use a
  local frame `Feedback-Mark`.

## 2026-10-13 · Mark as Complete moves into the feedback row, on every screen

Nelson's placement, from his two reference frames on the Lab page (`7124:49482`). The rule does not change: Mark
as Complete at the end of the content, and *Next* asks.

- **Where it sits now:** in the same row as the feedback, feedback on the left and the button on the right. When
  the row is too narrow (a phone) the button drops under the feedback. It no longer has a row of its own.
- **Figma, 63 screens:** Lab page 34 (the 24 handoff cards with the button and the two flow frames), Reading page
  19, Topic Content Types Discovery 8 (Lab, Podcast, Activity, Reading, Lesson Page x3, Video), Video card 8 two.
  Desktop screens are 30 shorter, the two Video screens 42; frames and dialog overlays refitted. On the Video the
  licence now follows the feedback items, because the right end belongs to the button.
- **Annotations:** *Recent changes* dated 2026-10-13 on the 42 cards concerned; the placement stated once on Lab
  G1, Reading 3 and Video 8.
- **How it is built:** a local frame `Feedback-Mark` around the DS `Content-Feedback` instance and the button row
  ([`lab-third-party-platforms.md`](lab-third-party-platforms.md) §4). `Content-Feedback` has no action slot in the
  design system: open point for the DS.
- **Prototype:** [skillup-lms-prototype#125](https://github.com/nvjeronimo/skillup-lms-prototype/pull/125), same
  placement on every topic with the button; once completed the row is feedback only.

## 2026-10-13 · Lab: answers from Kirti and Vikas on IBM and on the first-opening date

[`lab-third-party-platforms.md`](lab-third-party-platforms.md) §10. No screen changed.

- **IBM (Kirti):** on *Start course* the learner is redirected to IBM's platform and the entire learning happens
  there. Progress is not normally shared with our platform, though a progress report can be fetched from IBM's
  dashboard; the certificate is generated on IBM's platform. Q-lab-4 and Q-lab-5 closed.
- **First-opening date (Vikas):** it can be stored on the server for each learner. Q-lab-6 closed.
- **Pending:** whether the two Microsoft in-page courses can move to *New Window* and whether that lab sends a
  score back (Kirti is checking with Simran, Q-lab-10).
- **The IBM screens stand as drawn**, the dash for progress included.
- **Opened, not designed:** what SkillUp shows for the progress and the certificate of an IBM course, and whether
  it counts in a program's progress (Q-lab-9).

## 2026-10-13 · Collapsed sidebar: a bookmark on the rail and the card beside it, now in the design system

Asked by Nelson on 13 Oct with two captures of the prototype: the prototype already had both, the design system
had neither. Named versions saved before and after. **Not published.**

- **`LMS/ICP/Sidebar/Topic-Row` v1.1:** new boolean **`Show rail bookmark`**, off by default. A 12px filled
  bookmark (the `Bookmark` component, `Bookmarked=Yes`) sits 6px from the right and 4px from the top of the row,
  placed over it. For the 72px rail row only: it marks a saved topic where there is no room for the bookmark
  button. Never on the expanded row, which has `Show bookmark`.
- **`LMS/ICP/Sidebar/Topic-Flyout` v1.0, new:** the card that opens beside the collapsed rail on a rail row:
  the title on one line (`body-medium/Medium`, `text/default`), the `Topic-Types-Badge` and a 24 × 24 button
  with the `Bookmark`. Row, gap 8, padding 6 / 6 / 6 / 12, radius 8, `bg/page`, `border/subtle`, effect style
  `Elevation/level3`. Properties: `Title`; the type and `Bookmarked` on the two nested components. It opens 6px
  to the right of the rail, aligned with the row, and closes 140 ms after the pointer leaves the row and the card.
- **`LMS/ICP/Sidebar/Sidebar` v1.1:** in the two collapsed variants the third topic of Module 03 shows the rail
  bookmark, the same topic that is saved in the expanded variant. The flyout is an overlay, not a layer of the
  Sidebar; the description says so.
- **The Sidebar group page was rebuilt:** 12 components, each with its anatomy, the flyout included. *Start
  here* and the ICP index say 69 components.
- **Differences from the prototype, left for a decision:** the rail bookmark is 11px in the prototype and 12 in
  Figma; the prototype's card uses Tailwind's `shadow-lg`, which is not a design system effect, Figma uses
  `Elevation/level3`; the prototype opens the card on pointer hover only, so a keyboard user cannot reach the
  bookmark from the collapsed rail.
- **Not checked:** the collapsed sidebars on the screens of the product file after the publish (one rail row
  will show the bookmark by default).

## 2026-10-13 · Every component version is 1.x: nine renumbered; the LMS pages rebuilt

Register: [`03-design-system/component-versions.md`](../03-design-system/component-versions.md), rule 8 and
*History*.

- **Decided by Nelson on 13 Oct:** designers and engineering start the design system and Storybook now, so no
  component starts at version 2. Every `v2` or `v2.x` becomes `v1.x`, everywhere.
- **Old → new:** `Button` 2.2 → 1.2 · `Icon Button` 2.2 → 1.2 · `Link Button` 2.0 → 1.0 · `Badge` 2.1 → 1.1 ·
  `Button group` 2.0 → 1.1 · `Topbar` 2.0 → 1.2 (it already had a 1.1) · `Topbar-Item` 2.0 → 1.1 ·
  `Course-Row` 2.0 → 1.1 · `Lab-Launch-Card` 2.0 → 1.1. The minor number is kept where the component started
  at 2.0; a component that went from 1.x to 2.0 takes the next 1.x. Nothing else about them changed.
- **Rule 8 of the register:** everything is `1.x` until engineering has built it. A MAJOR bump is first used on
  a component that has a story.
- **Figma (DS), not published:** the first line of the nine descriptions, and two sentences inside them
  (`Button`, `Icon Button`: *v1.1 added Type=Neutral*; `Lab-Launch-Card`). The pages that print the version
  were rebuilt or corrected.
- **The 13 LMS group pages were rebuilt** with the three additions made for the Base pages (properties and
  measures of a nested part, measures grouped, small components drawn enlarged), and the four Base write-ups
  again for the new numbers. The frames have new ids, so the links on *Start here* and on the two indexes now
  point to the pages.
- **Docs:** the register (rows, baseline, history, the buttons section reworded without *V2*), the Lab note, and
  the name `Badge v2` → `Badge`, `Sidebar v2` → `Sidebar` in the living docs. This changelog: note at the top,
  numbers rewritten in the entries of 8 to 12 Oct. The ICP Hub.
- **Looked for and found clean:** the prototype (no mention), the handoff pages of the product file (the only
  `v2` there are Open edX API names and the old exploration pages).
- **Left as they are, for Nelson:** three names in the DS that contain *V2* (`Empty state - V2`,
  `._Progress bar-V2`, a `Property 1=V2` variant on the Mobile App page): a rename is his call; two labels on
  the *DS Structure discussion* page; the token export called *v2.0* in three HTML pages (tokens, not a
  component); *V1* where an entry tells the story of the old badge and button.

## 2026-10-13 · Design system: the Base components we use, written up

Agreed with Nelson on 13 Oct: full pages for Buttons, Button groups, Badges and Alerts; a list for the other
Base pages. Named versions saved before and after. **Not published.**
Script: [`03-design-system/tools/ds-group-page.js`](../03-design-system/tools/ds-group-page.js), now with
`TITLE` and `ANATOMY`.

- **Full write-up, on the page each component already lived on**, to the left of what was there: *Buttons*
  (Utility Button, Icon Button, Close Button, Link Button, Button), *Button groups* (Button group, Action Row),
  *Badges* (Badge, with its Brand / Alerts / Extra column labels kept above the set), *Alerts* (Alert). Same
  five parts as the LMS pages. The components were moved into the frame: same nodes, same keys, no rename.
- **Three additions for components built on a nested part** (the buttons): the properties table also lists the
  properties of the nested part (Size, Label, the icons), marked *on the nested part*; padding, gap and radius
  are read from the nested part; variants with the same measures are grouped on one line.
- **Small components are drawn enlarged** in the anatomy (up to 4×, stated under the stage), with the parts read
  at real size first. The anatomy of Buttons and Badge starts from the default variant with every option on.
- **Left beside the frames, untouched:** the private parts (`._Button_Structure`, `_Badge base`, `_Button group
  base`…), and the kit's sets the LMS does not use (Social button, Mobile app store badge, Badge group,
  Notification).
- **A list frame on the other 20 Base pages** (Tags to Loading indicators): each public component as a link,
  its number of variants, its version when it has one, and the first line of its description.
- **Start here:** the Base components line links to the four full pages.
- **Found, not changed:** every `Button` variant has a fixed width (79), so an instance does not grow when an
  icon is turned on in the nested part: the content is clipped until the instance is resized by hand. The
  anatomy sets the instance to hug. For Nelson to decide whether the variants should hug.
- **Not done:** the LMS group pages were not rebuilt with the three additions; which Base components the LMS
  screens really use was not measured.

## 2026-10-13 · Design system: a Start here page, product indexes, Foundations tidied

Asked by Nelson on 13 Oct, after the group pages below. Named versions saved before and after. **Not published.**

- **Start here**, first page of the file: how the file is organised (eight areas, each a link), the group pages
  of LMS ICP (7 pages, 68 components) and LMS Platform (7 pages, 43 components) with what is on each, how to read
  a component page, and where names, versions and rules are. It opens with the Studio and LMS sentence and links
  to the ICP Hub.
- **The two old component pages are now indexes.** Each has an index frame with its group pages as links.
  Removed, as agreed: the empty group frames (*1 · Shared*, *2 · Player shell*, *3 · Content & Notes* on the ICP
  page; *Discovery · WIP*, *Completion* and the loose *WIP* label on the Platform page). Kept: the Platform cover
  with its notes; on the ICP page the notes of *4 · Topic content types* and *5 · Assessments*, the Playground,
  the Question Card guide, the two responsive proofs and the *To be removed* section.
- **Foundations, eight pages** (Colors, Typography, Logos, Icons, Misc icons, Effect styles, Spacing, radius &
  grids, Design annotations): each has a guide frame to the left of its content: what the page is, where the
  values live (variable collections, text, effect and grid styles) and a linked list of what is on the page. On
  Colors and Typography the SKO frame is marked *read this one first*.
- **Moved to the Archive, nothing deleted:** the kit's six *Notes and documentation (you can delete this)*
  frames, an empty *Colors · Model C* shell that sat on top of the Typography header, and 15 stray images from
  Misc icons, all on a new page *Foundations · kit notes and leftovers*; and the page *Portfolio mockups*.
- **Not done:** the kit's own frames inside Foundations were not redrawn or re-laid out; whether they still
  match the SKO variables was not checked. The links were set, not clicked.

## 2026-10-13 · Design system reorganisation: one page per group, 13 pages, 109 components

Follows the entry *Design system reorganisation: decisions, a pilot page, the page list* further down.
Script: [`03-design-system/tools/ds-group-page.js`](../03-design-system/tools/ds-group-page.js).

- **Nelson's adjustments to the pilot (13 Oct), now the template:** inside each block the order is the
  component, properties, measures, what it is and its rules, and the **anatomy last**; the anatomy marker is
  on `bg/strong`; the documentation frame has a `border/default` stroke; the anatomy stage has no fill, a
  `border/subtle` stroke and fills the width of the block; component sets carry a `border/default` stroke with
  radius 5.
- **LMS ICP, seven pages** after *LMS ICP Components*: Player (4), Sidebar (11), Content (13), Topics (14),
  Assessment (14), Live (6), Shared (6: Progress Circle, Footnote, Autosave Status, Inline Alert, Empty State,
  Discussion Prompt).
- **LMS Platform, six new pages** after *Navigation*: Dashboard (6), My Learning (2), Discovery (8), Program
  Detail (1), Course Detail (21), Completion (3).
- **How:** every component was moved, not copied (same nodes, same keys, no rename), smallest first. The
  anatomy shows the variant with the most visible layers, every boolean on, with up to 12 numbered parts.
  Properties, measures and rules are read from the component; they are a snapshot of 13 Oct and do not update
  by themselves: run the script again with `REBUILD` after a component changes.
- **Checked:** no component is left on the two old pages; 109 blocks, no script error; no anatomy wider than
  its stage; five blocks looked at as images. Not every block was looked at.
- **Left as it was:** on *LMS ICP Components* and *LMS Platform Components*, the now empty group frames, the
  notes, the Playground, the *how to configure* guide and the responsive proofs. `Discussion Prompt` sat in the
  Assessments frame and is on *Shared* because of its name (`LMS / Discussion Prompt`).
- **Known rough edges:** a marker can sit on the corner of the part it names; in the Sidebar anatomy every
  module is open (every boolean on), which no screen shows.
- Named versions saved before and after. **Not published.**
- **Next:** a *Start here* index page; the two old pages as indexes or removed (Nelson to say); the Base pages
  we use; the Figma links in the ICP Hub.

## 2026-10-12 · Prototype: an Open Response completes by itself, no Mark as complete button

Prototype pull request 124. No screen and no rule changed: the prototype is brought to the rule already written.

- **Decided by Nelson on 12 Oct:** follow the written rule (`topic-types-inventory.md` §5, `footer-contract.md`
  row 8). An ORA has no manual completion: the topic completes by itself once the learner has submitted their
  response and given the required peer reviews. It does not wait for the grade.
- **Prototype:** the *Mark as complete* button on the grade panel is removed; the topic completes when the review
  quota is met, and the header then reads *Completed*. Checked in the browser.
- **Figma:** no ORA screen carries such a button (the file was scanned for it); nothing to change.

## 2026-10-12 · Prototype audited against the Lab screens and the rules of the day

[`lab-third-party-platforms.md`](lab-third-party-platforms.md) §9. Prototype pull request 123.

- **Asked by Nelson on 12 Oct:** make sure the prototype follows the Figma and what was defined.
- **What did not match:** the partner labs. The Google lab still simulated a score coming back (*waiting for your
  score*, *Score 1 / 1*, *End lab* on the stand-in page); the launch card had a *Completed* state and read *Open
  the lab again*; the demo menu still offered a *Modal*; the unavailable card had *Skip for now*.
- **Now:** nothing comes back; the card has Ready, Opened (*First opened on …*) and Unavailable; copy, labels and
  steps as on the cards; *In the page* and *Not loading* on the Microsoft lab. Checked in the browser on the Google
  and Microsoft labs.
- **What already matched:** Mark as Complete at the end of the content and secondary until the lab is opened, the
  question on *Next* with Navdeep's copy and three behaviours, no alerts repeated once the lab is opened, the
  completed status in the header and the sidebar, on Reading, Lesson Page, Activity, Video and Podcast too.
- **Found and left alone:** the ORA results panel ends on a *Mark as complete* button (an ORA has no manual
  completion); the download lab's button is disabled until the files are downloaded (Q-lab-8).

## 2026-10-12 · Lab: Mark as Complete is secondary until the lab has been opened

[`lab-third-party-platforms.md`](lab-third-party-platforms.md) §4.

- **Decided by Nelson on 12 Oct:** one primary action at a time. Never opened: the launch button is primary and
  Mark as Complete secondary. Opened: they swap. No launch card (lab inside the page): Mark as Complete is primary.
- **Figma:** secondary on G1, M1 and E2 (desktop, tablet, mobile) and on the first step of the Lab flow frame; a
  local override of the `Button` nested in `Topic-Status-Badge`. Descriptions of the Ready, Opened and
  not-loading cards say so.
- **Prototype:** `TopicActionBar` takes `secondary`; the shell sets it on a partner lab that has not been opened.
- **For the design system:** `Topic-Status-Badge` has no property for the hierarchy of Mark as Complete.

## 2026-10-12 · Lab: fewer alerts once the lab has been opened

[`lab-third-party-platforms.md`](lab-third-party-platforms.md) §4, *What the learner is told*.

- **Decided by Nelson on 12 Oct:** when the learner has already opened the lab once, the *Before you start* block
  and the *This lab needs a computer* warning are no longer shown.
- **Figma:** removed from the Google cards G2, G3 and G4 on desktop, tablet and mobile (the Microsoft ones already
  had no block there), and from the Lab flow frame. Ready (G1, M1) and the in-page rows keep them.
- **Prototype:** the prerequisites block of a partner lab hides once the lab is opened or completed; the computer
  warning already did.
- **DS:** the `Lab-Launch-Card`, `Topic-Header` and `Topic-Status-Badge` texts for *Mark as Complete, and Next asks*
  are published and accepted in the ICP file (read back: 6 Ready, 18 Opened, 3 Unavailable on the Lab page).

## 2026-10-12 · Navdeep's comments applied: Mark as Complete is back, *Next* still asks, new dialog copy

[`lab-third-party-platforms.md`](lab-third-party-platforms.md) §4 and §9, [`reading-screen-matrix.md`](reading-screen-matrix.md) §4.

- **Navdeep, four comments on the Figma frame `7070:14832`, 12 Oct 18:07–18:25**, applied on Nelson's
  instruction:
  1. **Copy of the dialog:** *Have you completed this lab?* / *Your progress on Google Skills isn't tracked
     automatically. Please confirm whether you've completed this lab. You can move to the next topic either way
     and return to this lab anytime.* / *Not yet* · *Yes, completed*. Applied to every dialog, with the same
     sentence adapted for Microsoft Learn, a reading and a video.
  2. **Three behaviours:** *Yes, completed* marks the lab as completed and advances; *Not yet* keeps it incomplete
     and advances; *Close* changes nothing and stays. Already what was drawn and built.
  3. **"Introduce the mark as complete button also"**, for the learner who finishes the lab and closes the course
     without *Next*. The button is back at the end of the content on every screen that is not completed.
- **The rule now:** Mark as Complete at the end of the content; the usual *Previous* and *Next*; *Next* on a topic
  that is not completed asks. Two ways of completing, the question being the safety net.
- **Figma:** Lab page (30 topic cards and both flow frames), Reading page (19 not-completed and question cards),
  the eight canonical pages of the discovery page, card 8 of the Video page. Card counts unchanged: Lab 36,
  Reading 21.
- **Fixed on the way:** the mobile forward button showed an empty placeholder instead of the arrow since the
  footer went back to *Next* earlier that day. Corrected on every mobile screen of the Lab and Reading pages.
- **DS, descriptions and one default text, to publish:** `Lab-Launch-Card` (description, and `Unavailable` now ends
  *select Mark as Complete*), `Topic-Header`, `Topic-Status-Badge`. The line added to `Lab-File-Row` that day was
  taken back. No property or variant changed.
- **Documents:** the rule in `footer-contract.md`, `BA/03-business-rules.md`, story P1-47 (seven scenarios),
  `BA/06-glossary.md`, `topic-types-inventory.md`, `screens-spec.md`; Q-lab-3 closed, Q-lab-8 added (the download
  lab's disabled button).
- **Comments were read through the Figma API** with a token Nelson generated; they are still open in Figma.

## 2026-10-12 · *Next* asks also on Podcast, Activity and the Video fallback

[`screens-spec.md`](screens-spec.md) (Completion), [`lab-third-party-platforms.md`](lab-third-party-platforms.md) §4.

- **Decided by Nelson on 12 Oct:** the rule applies to Podcast, Activity and the Video fallback too. Podcast
  follows Video (the DS says *same chrome and completion rule as Video*): both complete by themselves at 90%, and
  **only when playback cannot be measured does *Next* ask**. Activity is completed by hand, so *Next* asks.
- **Video page, card 8** (Row 8, now *Completion when playback cannot be measured (Next asks)*): the Mark as
  Complete button and the status row under the content are gone; three screens, not completed, the question
  (*Have you finished this video?*) and completed.
- **Topic Content Types Discovery page:** the Mark as Complete button removed from the Podcast, Activity and Video
  canonical pages. No screen of the file shows it any more.
- **DS, descriptions only, to publish:** `Topic-Header`, `Topic-Status-Badge` and `Lab-File-Row` each get a dated
  line saying the Mark as Complete action is no longer used. No property or variant changed. The `Mark as
  Complete` state of `Topic-Status-Badge` and the `Mark as Completed` milestone of `Course-Progression-Button` are
  now unused on the screens: remove or keep is Nelson's call.
- **Documents:** the Video completion section of `screens-spec.md` rewritten; `footer-contract.md` rows Video,
  Podcast, Activity and Lab; `BA/03-business-rules.md`; `topic-types-inventory.md`; Q-lab-7 reduced to the Open
  Response inside a Reading.
- **Not checked:** whether a SCORM Activity reports its own completion. If it does, it would complete by itself
  and *Next* would not need to ask.

## 2026-10-12 · *Next* asks: the default on every topic completed by hand

[`lab-third-party-platforms.md`](lab-third-party-platforms.md) §4 and §9, [`reading-screen-matrix.md`](reading-screen-matrix.md) §4.

- **Decided by Nelson on 12 Oct (evening):** the option tested that afternoon becomes the default for manual
  topics. The footer is *Previous* and *Next* on every topic; *Next* on a topic that is not completed asks *Have
  you finished this lab / reading?* *Yes, I've finished* completes it and moves on, *Not yet* moves on and leaves
  it open. It replaces *Complete and continue*, which the screens carried for a few hours the same day.
- **Lab page, 36 cards** (was 30): every topic card has the usual footer and its copy says *Next asks*; a question
  card per partner and breakpoint (G3, M3, with `.2` and `.3`); the completed cards are G4 and M4.
- **Reading page, 21 cards** (was 19): the usual footer on every screen; two question cards in Row 3 (3.5 desktop,
  3.6 mobile); Row 3 is *Completion (Next asks)*.
- **No local override left on the footer.** The dialog is the DS `Modal` as it is. Nothing to add to the design
  system for this flow.
- **DS, published the same evening:** the description of `Lab-Launch-Card` and the default text of its
  `Unavailable` state said *Complete and continue*; rewritten. No property or variant changed, no version bump.
  Read back in the ICP file on the 27 instances of the Lab page.
- **Figma boards:** the two test frames are renamed *… our default on manual topics (12 Oct 2026)* and sit to the
  right of the handoff frame; the *Complete and continue* board is marked superseded and kept as a record.
- **Documents:** the rule in `footer-contract.md`, `BA/03-business-rules.md`, story P1-47 (six scenarios),
  `BA/06-glossary.md`, `topic-types-inventory.md`, `screens-spec.md`; Q-lab-3 closed, Q-lab-7 rewritten.
- **Prototype:** already the default there since pull request 115.
- **Topic Content Types Discovery page:** the Mark as Complete button is removed from the seven manual-topic
  screens that still had it: the download Lab, the Reading and the three Lesson Page canonical pages, and the two
  superseded Microsoft sources. Only the button was removed; their body copy was not reviewed.
- **Left with a Mark as Complete button, to decide:** Podcast and Activity (one screen each on that page: the
  documents disagree on whether they complete by hand) and the Video fallback (one screen there, one on the Video
  page). Asked as Q-lab-7.
- **Not done:** the prototype's Google lab still simulates a score; Navdeep's answer was not seen.

## 2026-10-12 · Test "Next asks": the Reading version has its own frame

[`lab-third-party-platforms.md`](lab-third-party-platforms.md) §9. Figma frame `7077:18132` on the Lab page.

- **Asked by Nelson on 12 Oct:** the Reading version of the test flow. The two Reading rows moved out of the Lab
  test frame into `Test · Next asks if the reading is done (not decided)`, to its right, with its own header and
  notes (one more click on 30% of the program; the question does not know how far the learner read; an Open
  Response inside a Reading is not drawn).
- It stays on the Lab page: the Reading page is *Ready for Dev* and this is a test.
- The prototype change (pull request 115) is merged and live.

## 2026-10-12 · Test "Next asks": Reading asks too, complete flow in Figma, in the prototype

[`lab-third-party-platforms.md`](lab-third-party-platforms.md) §9. Still a test, not a decision.

- **Asked by Nelson on 12 Oct:** in the test, a Reading (or any other topic completed by hand) asks the same
  question on *Next*; update the prototype, then the complete flow in the test frame, desktop and mobile only.
- **Figma, frame `7070:14832`:** Lab rows start at *never opened* (four steps), and two Reading rows are added
  (three steps), each on desktop and mobile. Header and notes rewritten for "every topic the platform cannot
  measure".
- **Prototype, pull request 115 (open):** Reading, Lesson Page, the download lab and the Microsoft lab ask on
  *Next* and lose the Mark as Complete button; a switch in the demo menu brings the button back to compare.
- **Not done:** tablet; the prototype's Google lab (it still simulates a score); the handoff cards of §4 and the
  Reading page keep *Complete and continue*.

## 2026-10-12 · Lab: a test frame, *Next* asks if the lab is done (not decided)

[`lab-third-party-platforms.md`](lab-third-party-platforms.md) §9. Figma frame `7070:14832` on the Lab page.

- **Asked by Nelson on 12 Oct, as a test:** the navigation back to *Previous* and *Next* only, and a dialog on
  *Next* asking whether the learner has done the lab. Drawn on the Google lab, desktop and mobile, three steps each.
- **Nothing else changed:** the 30 Lab cards and the 19 Reading screens keep *Complete and continue*.
- The frame lists what to check before choosing between the two (Reading, a lab never opened, the repeated
  question, leaving by the sidebar).

## 2026-10-12 · Reading: Complete and continue on the 19 screens, the Mark as Complete button is gone

[`reading-screen-matrix.md`](reading-screen-matrix.md) §3 and §4. Figma page *Phase 1 · Reading - Ready for Dev*.

- **Asked by Nelson on 12 Oct:** apply *Complete and continue* to the Reading screens.
- **Every screen:** the Mark as Complete row at the end of the content is removed. The footer's forward button
  reads *Complete and continue*, primary (a Reading has no other action). Each card is at r2 with a changelog
  line.
- **Row 3 is now *Completion (Complete and continue)*:** card 3 not completed, 3.2 completed, 3.4 completed on
  mobile, with new descriptions. Completed: *Marked as completed* in the Topic Header, the sidebar row
  *Completed*, *Next* in the footer and no status there.
- **Card 3.3 (*Completion · Review*) is removed:** it showed the Mark as Complete button and nothing else, so it
  had become a copy of card 3. 20 screens → 19 (10 desktop, 3 tablet, 6 mobile). Numbers 3.2 and 3.4 are kept.
- **Same local overrides on the DS footer as on the Lab screens** (label, labelled button on mobile, hugging
  columns on tablet).
- **Documents brought in line:** the completion rule in `reading-screen-matrix.md`, `footer-contract.md`
  (rows Reading and Lab, with a note), `BA/03-business-rules.md`, story P1-47 in `BA/02-user-stories-phase1.md`
  (three scenarios), `BA/06-glossary.md`, and dated amendments in `topic-types-inventory.md` and
  `screens-spec.md`.
- **Not changed:** Video, download Lab, Activity and Podcast screens. Asked as Q-lab-7, with the Open Response
  inside a Reading (Row 6), which took the flow because it had the button.
- **For the design system:** `Topic-Status-Badge` has no screen left for its `Mark as Complete` state on Reading
  or Lab, and `Review` is still unspecified.

## 2026-10-12 · Lab: completed status in the header and the sidebar only; `Lab-Launch-Card` v1.1 published

[`lab-third-party-platforms.md`](lab-third-party-platforms.md) §4. Figma page `6789:325`.

- **Decided by Nelson on 12 Oct:** when the learner clicks *Complete and continue*, the topic's row in the sidebar
  becomes *Completed* and the Topic Header shows *Marked as completed*. The footer shows no status: the badge
  beside *Next* is removed.
- **Screens:** the six completed cards (G3, M3 on desktop, tablet, mobile) have `Show Badge` off in the footer; the
  sidebar row was already *Completed* on desktop and tablet. The board of footer states shows the same (state 2
  without the badge, state 1b says the button turns primary once the lab is opened).
- **`Lab-Launch-Card` v1.1 is published** and accepted in the ICP file: read back on the 21 instances of the Lab
  page (Ready 6, Opened 12, Unavailable 3; the set has three states).
- **For the Reading screens when they take this flow:** the same rule would remove the footer badge there too.
  Not done.

## 2026-10-12 · Lab: the launch card says opened, never complete (`Lab-Launch-Card` v1.1), 30 cards

[`lab-third-party-platforms.md`](lab-third-party-platforms.md) §4. Figma page `6789:325`.

- **Decided by Nelson on 12 Oct:** the card has no *Completed* state, because nothing comes back from the partner.
  It goes from *Ready* to *Opened* on the first click and shows the date of the first opening. The topic completes
  only with *Complete and continue*. To skip, the learner uses the sidebar.
- **`LMS/ICP/Topics/Lab-Launch-Card` v1.1 (a variant is removed).** `State` = Ready · Opened · Unavailable.
  `Opened` carries the layer *Opened date* (*First opened on 12 Oct 2026*) and keeps the lab title and the
  partner line; `Unavailable` loses *Skip for now*; default texts no longer mention a score. Nelson built and
  published the new `Opened`; the text corrections, the layer name and the two removals are in the DS file and
  ship with the next publish.
- **Screens, 6 new cards:** *Opened* for Google and Microsoft on desktop, tablet and mobile (G2, M2). The launch
  button is secondary there and *Complete and continue* is primary. The completed cards are G3 and M3 again and
  their launch card stays *Opened*.
- **To build:** the date of the first opening is kept per learner and topic on the server (Q-lab-6).
- No instance of *Completed* is left on the Lab page or on the discovery page (the two superseded sources were
  moved to *Opened*). Other pages were not scanned: on 8 Oct the card was only on these two.

## 2026-10-12 · Lab screens: Complete and continue adopted, 33 cards down to 24

[`lab-third-party-platforms.md`](lab-third-party-platforms.md) §4, rewritten. Figma page `6789:325`.

- **Decided by Nelson on 12 Oct:** both ways of opening a lab are drawn, the new tab is the default; the screens
  adopt the *Complete and continue* flow of the proposal; what was wrong is removed.
- **Removed, 9 cards** (desktop, tablet, mobile): Google *waiting for the score*, Microsoft *asked to mark it
  complete*, and the modal. G3, M3 and E3 are now G2, M2 and E2.
- **Google and Microsoft (12 cards):** no Mark as Complete row; the footer button is *Complete and continue*,
  secondary; completed shows *Marked as completed* in header and footer and *Next*. Copy corrected to the facts of
  9 Oct: a Google account, some labs timed, nothing sent back. No text about a score is left.
- **In the page (6 cards):** redrawn on the real case of the two Microsoft courses. E1 the lab inside the page
  (*Complete and continue* primary), E2 the frame not loading with *Open in a new tab*.
- **IBM (6 cards):** unchanged.
- **Local overrides on the DS footer**, listed in §4 with what the design system needs: the button label, the
  labelled button on mobile, the side columns hugging on tablet.
- The proposal board is renamed *Complete and continue · adopted on the Lab screens (12 Oct 2026)*; the discovery
  section `6776:8711` is marked superseded.
- **Not done:** the Reading screens still have the Mark as Complete row; Navdeep's answer was not seen.

## 2026-10-12 · Lab: two Microsoft courses load the lab in the page, and it does not load

[`lab-third-party-platforms.md`](lab-third-party-platforms.md) §8. No screen changed.

- Jaspinder found the courses with an in-page lab: AZ-900 Batch 7 and SC-900 2021 Q3, an LTI component opened
  inline. The frame is empty today (*"currently not working"*).
- Kirti: the design goes with the new tab for every lab; the iframe is revisited later.
- The refused-frame state (E3) now has a real case behind it; the two courses can move to the new tab with a
  Studio setting.

## 2026-10-13 · Design system reorganisation: decisions, a pilot page, the page list

- **Decided by Nelson on 13 Oct**, for anyone who opens the DS to find what they need: the pages are written
  for **developers** first; **one page per group** (the group is already in every name, `LMS/ICP/<Group>/…`,
  `LMS/Platform/<Group>/…`); Figma shows anatomy, variants and one line, and **the rules stay in the ICP Hub**;
  the Untitled UI pages we do not use **move to an archive** at the bottom; **every component gets an
  anatomy**; no component is renamed.
- **Pilot, built:** page *↳ Navigation*, right after *LMS Platform Components*, with `Topbar-Item` and
  `Topbar` moved onto it (same nodes, same keys) and their old section removed. One documentation frame:
  a page header, then one block per component, smallest first: name, version, since when; the full path;
  **Anatomy** (the richest variant with numbered markers and a legend that names each part, its text style
  and colour token, or the component it is an instance of); **Properties** (name, type, values, default,
  read from the component); the component itself; **Measures** per variant; what it is and its rules (the
  component's description). Built on DS text styles and variables. One private component,
  `.Doc/Anatomy-Marker`. Named version saved first. **Not published.**
- **Page list:** an *Archive · Untitled UI kit, not used by the LMS* block near the bottom holds 70 pages
  (getting started, variables, shared assets, marketing and application examples and components). Four
  application pages our screens do use (*Breadcrumbs*, *Alerts & notifications*, *Content dividers*,
  *Loading indicators*) moved to the end of the Base components group. Which pages are used was read from
  the instances inside the LMS components. Page order only: nothing on any canvas changed.
- **Next, after Nelson has looked at the pilot:** the other groups of LMS Platform and LMS ICP, page by page;
  a *Start here* page with the index; the Base pages we use.

## 2026-10-12 · `Lab-Prerequisites` deleted; one sentence for the Studio and LMS relation

- **`LMS/ICP/Topics/Lab-Prerequisites` deleted from the DS** (asked by Nelson). The DS `Alert` had replaced it on
  the 36 screens that used it; no instance was left on the LMS ICP components page. Named version saved first.
  **Not published.** Its description held a rule, kept here: what the learner needs goes **above** the
  download, not below it, because a learner who downloads first and finds the runtime missing afterwards
  abandons the lab.
- **The sentence Nelson uses to explain the relation:** *o edX Studio manda nos factos, o LMS/ICP manda na
  apresentação e consumo.* In English, as it opens the ICP Hub: *Open edX Studio is in charge of the facts;
  the LMS and the ICP are in charge of how they are presented and consumed.* Use it when explaining why a
  design follows what Studio authors and what the platform returns, and only decides how it is shown.
  It is also at the top of `LMS-HANDOFF/README.md` and opens *Operating Context* in `PRODUCT.md`.
- **ICP Hub, versions 48, 51 and 52:** the decisions of 12 Oct on buttons, the lab Alert and the overlay; the
  component rows tidied; the sentence above at the top of the intro; the `Lab-Prerequisites` row and its
  open question removed.

## 2026-10-12 · `bg/overlay` is 70%

- **Asked by Nelson on 12 Oct**, in the variables. `bg/overlay`, the dim layer behind a modal or over a video,
  goes from 50% to 70%: rgba(14, 26, 31, 0.7) in the six modes.
- **How:** `bg/overlay` aliases one primitive that nothing else aliases. Its alpha was changed and it was
  renamed to say what it is, `Colors/SKO-Brand/Dark-Neutral/950-alpha-70` (was `…950-alpha-50`). No token
  was added. Named version saved first. Published by Nelson the same day.
- **Prototype (PR 121, open):** `--color-bg-overlay` is #0e1a1fb3. The modal backdrop and the gradient under
  the player controls get darker. The video caption drops its second overlay layer: one at 70% keeps white
  text at 6.56:1 over a white frame (one at 50% gave 3.39:1, which is why it had two).
- **Not changed:** `bg/overlay-soft` (20%).
- **Not checked:** layers bound straight to the primitive instead of to `bg/overlay`, if any.

## 2026-10-12 · Buttons: the last three tokens out of place

- **Asked by Nelson on 12 Oct.** DS `Button` and `Icon Button`, **not published**; named version saved first.
  - **Strokes of the Destructive and Success Secondary** (Default, Hover, Focused, Loading; 16 variants):
    `bg/error` → `border/error`, `bg/success` → `border/success`. It shows: the Destructive outline goes
    from #da3336 to #b62226 in light (the colour of its label) and from #e26567 to #f3afb0 in dark; the
    Success one is the same in light and goes from #2d9c5b to #72d99a in dark.
  - **Brand icons on `bg/primary`** → `icon/primary`: Secondary Default and Focused, and the three Tertiary
    states that had the same binding (10 icons). Same colour in both themes: nothing changes on screen.
  - **Destructive and Success Primary Hover:** the fill goes from the border token to the background one
    (`border/error-soft` → `bg/error-soft`, `border/success-soft` → `bg/success-soft`) and the icons from
    `bg/error`, `bg/success` to `icon/error`, `icon/success`. It shows: the hover fill is lighter (#f3afb0 →
    #fce8e8 and #aaedc2 → #e4fced in light).
- **Prototype:** no change needed. It already used `border/error`, `border/success`, `icon/primary`,
  `bg/error-soft` and `bg/success-soft` in these places.
- PRs 119 (prototype) and 59, 60 (docs) merged.

## 2026-10-12 · Secondary buttons: three corrections in the DS and the prototype

- **Asked by Nelson on 12 Oct**, from the three points left open in the entry below. DS `Button` and
  `Icon Button`, published by Nelson the same day; named version saved first.
  - `Icon Button`, Secondary, Hover: the fill is the soft colour of the type (Brand `bg/primary-soft`,
    Destructive `bg/error-soft`, Success `bg/success-soft`). It was `bg/faint` in the three.
  - `Button`, Success, Secondary, Hover: `bg/success-soft` instead of `bg/accent-green-soft` (same colour in
    light; #102b1d in dark, was #17523a).
  - Destructive and Success, Secondary, in Default, Focused and Hover of both sets: the icons are bound to
    `icon/error` and `icon/success` (18 icons; they were on `bg/error` and `bg/success`).
- **Checked after the publish:** the library gives the four variants read (Button Success Hover, Button
  Destructive Default, Icon Button Brand Hover, Icon Button Success Hover) with the new fills and icon
  tokens. The instances on the screens were not recounted this time.
- **Prototype (PR 119, merged):** the same three. The icon tokens have the colours of the text ones in the
  prototype, so that part changes nothing on screen.
- **Still as they were:** the strokes of the Destructive and Success Secondary are on `bg/error` and
  `bg/success`; the Brand Secondary icons of `Button` in Default and Focused are on `bg/primary`; the
  Destructive and Success Primary Hover fill with a border token.

## 2026-10-12 · Secondary buttons: one hover rule, the soft fill

- **Decided by Nelson on 12 Oct**, after a yellow fill and then a solid one for Brand the same day: on hover
  every Secondary fills with its own soft colour and keeps its text and icon colours.
- **DS `Button`, published by Nelson the same day:** *Brand · Secondary · Hover* fills with `bg/primary-soft`, the label is
  `text/primary` and the icons `icon/primary`; the stroke stays `border/primary`. Destructive
  (`bg/error-soft`), Success (`bg/accent-green-soft`) and Neutral (`bg/primary-soft`) were already soft.
  Label on the fill: 7.47:1 in light, 7.13:1 in dark. Named version saved first.
- **Prototype (PR 118, merged):** Brand Secondary hover on `bg/primary-soft`. It replaces PRs 113 and 116.
- **Checked after the publish:** the library gives the soft Secondary hover and the corrected Primary hover.
  On *Platform Pages - Ready for Dev*, 75 of the 132 Button instances are on the current set and 57 still on
  an older local copy; no screen uses a Hover variant, no label reads the default, and no badge shows the
  all-on defaults (570 read).
- **Seen, not changed:** `Icon Button` Secondary still hovers on `bg/faint` in the three types; Success uses
  `bg/accent-green-soft` where a `bg/success-soft` token exists (same colour in light, darker in dark); the
  Secondary icons of Destructive and Success sit on background tokens (`bg/error`, `bg/success`).
- The *Open* line of the entry below (Brand the only type that fills solid) is closed by this.

## 2026-10-12 · Button hover states: Brand Primary fixed, Brand Secondary as Nelson redrew it

- **Brand Primary Hover (asked by Nelson):** in `Button` the label and both icons, and in `Icon Button` the
  icon, are bound to `text/on-primary-hover` over `bg/primary-hover`. Before: the label was `text/primary`
  (5.09:1 in light, and 1.0:1 in dark, where the fill and the text were the same colour) and the Button's
  icons were `icon/on-primary` (white on yellow, 1.59:1 in light). Now 7.05:1 in light and 8.64:1 in dark.
  `Icon Button` v1.2. Named version saved first. **Not published.**
- **Brand Secondary Hover, redrawn by Nelson:** the fill is `bg/primary`, the label `text/on-primary`: the
  outline button fills in on hover. 5.54:1 in light, 6.2:1 in dark. Its icons had stayed on the token of
  the earlier change (dark on teal); they were set to `icon/on-primary` to match his label.
- **Correction:** the dark-theme figures written earlier today for the yellow hover (1.29:1, about 11:1)
  were computed with the light value of `bg/primary-hover`. In dark it is #6cc0e0, not yellow.
- **Open:** Destructive and Success Secondary still fill with their soft colours on hover, so Brand is now
  the only type that fills solid. The prototype still has the yellow Secondary hover of PR 116.

## 2026-10-12 · Button Brand Secondary: the hover text is `text/on-primary-hover`

- **Decided by Nelson on 12 Oct.** On hover the Brand Secondary fills with `bg/primary-hover` (yellow), and its
  label was `text/primary` there: 5.09:1 in the light theme, 1.29:1 in the dark one.
- **DS `Button` v1.2, published by Nelson the same day:** in *Type=Brand, Hierarchy=Secondary, State=Hover* the label and both
  icons are bound to `text/on-primary-hover`. Named version saved first. There is no icon token for this
  state, so the icons use the text one. 7.05:1 in light, about 11:1 in dark.
- **Prototype (PR 116, merged):** the same on hover.
- **Checked after the publish:** the library gives v1.2 with the label on `text/on-primary-hover`. The 132
  Button instances on *Platform Pages - Ready for Dev* are still on an older local copy of the set: the
  update had not reached the product file when read. No badge shows the all-on defaults (570 read).
- **Seen, not changed:** *Brand Primary Hover* in the DS has its label on `text/primary` over the same yellow
  fill (the prototype already uses `text/on-primary-hover` there), and *Brand Tertiary* icons sit on
  `bg/primary`. I had told Nelson the Primary already used `text/on-primary-hover`: true in the prototype,
  not in the DS.

## 2026-10-12 · Lab screens: the prerequisites block is the DS Alert

- **Asked by Nelson on 12 Oct**, with an example on *microsoft-ready-desktop*: `LMS/ICP/Topics/Lab-Prerequisites`
  is replaced by the DS `Alert` (Color=Brand, Size=Floating, Breakpoint=Mobile; no dismiss, no actions, no
  close; the info icon), with *BEFORE YOU START* as its text and the requirements as its supporting text,
  a bulleted list.
- **36 replaced**, each a copy of his example, in the same place and with the same sizing: 26 on the Lab page
  (his own screen included: the old block removed, his Alert kept) and 10 on *Topic Content Types Discovery*.
  Every block kept its own lines. Named version saved first. Two renders checked (desktop and mobile).
- **Heights:** desktop blocks are 116 (were 146), in-page ones 96 (were 112); on mobile a three-line Google
  block is 256 (was 226) because the Alert's text column is narrower.
- **Prototype (PR 114, merged):** a new `Alert` molecule in that configuration, used by both lab families.
  Measured on a download lab: same colours, radius, padding and type sizes as the Figma Alert.
- **Not changed:** the `Lab-Prerequisites` component itself, still in the library with no instance left on
  these two pages; the ICP Hub row of the component (it still says ICP 37).
- **To know:** the Alert is on its *Breakpoint=Mobile* variant on desktop and tablet too, as in the example.

## 2026-10-12 · Two DS changes of Nelson's followed in the prototype; ICP Hub version 39

- **Found in the library on 12 Oct** by comparing it with what the prototype records (the Figma version
  history could not be read: the API token had expired, so other changes may exist):
  - `Button`, Secondary, Hover: the fill is Brand `bg/primary-hover`, Destructive `bg/error-soft`, Success
    `bg/accent-green-soft` (it was `bg/faint` for the three). `Icon Button` Secondary Hover is still `bg/faint`.
  - `LMS/Platform/Navigation/Topbar`, Desktop: the sections are 24 apart (were 12).
- **Prototype (PR 113, merged):** both applied. Measured: gaps of 24 in the top bar.
- **To decide:** in the dark theme the Brand Secondary on hover is `text/primary` on `bg/primary-hover`,
  1.29:1 (5.09:1 in light). The Primary button uses `text/on-primary-hover` there.
- **ICP Hub, version 39:** everything of 10 to 12 Oct from this work: nine decisions, the My Learning and
  Dashboard row, twelve component rows (versions, names without a version, counts of 12 Oct), three open
  questions added, two removed (already decided), three reworded.
- **Open:** the V1 badge was deleted without checking the Mobile App file, which a decision of 24 Sep said
  had to move first. A named version of the DS from before the deletion exists.

## 2026-10-12 · Row durations follow decision 004 (`approx.` on readings)

- I had written *15 min* on the six reading rows of the two platform pages and asked Nelson which format to
  use. **It was already decided** (decision 004, BR-33): `approx.` on the types whose time cannot be
  measured (Reading, Lab, Activity, Project…), never on Video, Recording, Live or a timed Quiz. The
  prototype was right. The six rows now read *approx. 15 min read*, as the prototype prints it; the video
  rows keep *14 min* and *10 min*. Named version saved first.

## 2026-10-12 · Course-Row: the unbound fill is gone, the proposal frame is deleted

- **Asked by Nelson.** In `LMS/Platform/Discovery/Course-Row`, `State=Active`, the frame around the meta row
  and the title had a white fill not bound to a variable (a white box in the dark theme). The fill is
  removed, as in the other two states. The three frames (*Frame 4*, *5*, *6*) are now named *Headline*.
  No size changed. Named version saved first. Published and accepted by Nelson the same day; checked
  after: the 24 rows on the two platform pages are on the current version, 96 and 172 tall, texts intact.
- The proposal frame on the DS *In review* page (`22401:1103`) is deleted: the component carries it now.
- Prototype PR 112 and docs PRs 46 and 47 merged.

## 2026-10-12 · Course-Row and Resume-Row on the screens

- **Nelson published the DS and accepted the update.** Prototype PR 111 and docs PR 45 merged.
- **The rows were still on an older local copy** of both components (68 tall, no `Context`), although the
  keys had not changed. All 24 were swapped to the current version imported by key, same state, same width:
  9 on *Platform Pages - Ready for Dev* (the three Dashboard screens) and 15 on the WIP page. Progress and
  button text compared before and after: no difference. Named version saved first.
- **Texts rewritten on 22 rows**, as the prototype has them:

  | Course | Topic | Headline | Context |
  |---|---|---|---|
  | AI-Driven Content and Brand Communication | Reading · approx. 15 min read | Module 2 · AI-Assisted Content Development | the course · Certificate Program in AI Augmented Digital Marketing |
  | UX Research and Design Thinking | Video · 14 min | Module 1 · Empathize: Understanding Users | the course |
  | Leadership in Remote Teams | Video · 10 min | Module 3 · Meetings, Rituals and Async Work | the course |

- **Left as they were, 2 rows on the WIP page** titled *AI-Driven Digital Marketing* (`6207:248977`,
  `6207:250779`): that is a program name, with no module known. They show the component's sample meta row
  and context.
- **`Resume-Row`** as published has the meta row too and no delivery badge, 172 tall. Prototype PR 112
  (merged) follows.
- Two renders checked: one desktop row and one mobile row.

## 2026-10-12 · Course-Row and Resume-Row lead with the module the learner left off in

- **Decided by Nelson on 12 Oct:** in the simple course row the point is to tell the learner where they
  stopped and let them resume: the module is the headline, the course and the program go under it. He saw
  the proposal on the DS *In review* page (frame `22401:1103`) and said to apply it.
- **DS, not published:** `LMS/Platform/Discovery/Course-Row` v1.1. The `Title` layer is now the headline
  (the module) inside a *Titles* block, with a new `Context` text property under it: "Course · Program",
  body-small Regular, text/subtle, one line. Active: the module left off in. Available: the first module.
  Locked: the course stays the headline and `Context` is the program. **Nelson then updated the row
  himself, and this is what stands:** a meta row above the headline with the Topic-Types-Badge and the
  length of the topic the action opens ("Quiz · 8 min"), and no delivery badge. 96 tall (was 68). `LMS/Platform/Dashboard/Resume-Row` v1.1: same two lines above its badge;
  its title wraps, 180 tall with a two-line module name (was 136). Named version saved first.
- **`Title` is still a layer override on Course-Row**, not a property, so the texts already on the screens
  are kept by the update: they will read as course names in the headline until they are rewritten.
- **Screens, to do after publish and accept:** 9 rows on *Platform Pages - Ready for Dev* (the three
  Dashboard screens) and 15 on the WIP page: headline to the module, `Context` to the course and program.
- **Prototype (PR 111, merged):** the Dashboard rows show the topic type and length, the module and the
  course; all three are read from each course's own page and outline. Rows measured 728 × 96.
- **Seen in the DS, not changed:** in `State=Active` the unnamed frame around the meta row and the title
  (*Frame 4*) has a white fill that is not bound to a variable; *Frame 4/5/6* have no layer names; the
  `Resume-Row` has no meta row and still shows the delivery badge.
- **Not checked:** whether Open edX returns the module of the resume block in one call. The big program
  Course-Row already assumes it ("Module 2 of 4").

## 2026-10-12 · Topbar v1.2 on the screens: instances moved to the new variants

- **Nelson published the DS and accepted the update.** Prototype PR 110 and docs PR 43 merged.
- **The update had landed only in part:** the two Topbar variants were recreated in the DS, so their keys
  changed and the screen instances stayed tied to the deleted ones (new padding, old nav). All 81 top bars
  were swapped to the current variants by key: 44 on *Platform Pages - Ready for Dev* (19 Desktop, 25 Compact)
  and 37 on the WIP page (14 Desktop, 23 Compact). Named version saved first.
- **Current item:** *My Learning* is On on every Desktop bar, except the two Dashboard screens, where
  *Dashboard* is On. Counts read back as 4 and 3. One render checked (My Learning, list).
- **Height:** the Desktop bars that hugged their content (37 tall after the update, 53 before it) are now
  72, the height of the component and of the prototype. The Compact bars stay 49 on the screens; the
  component is 64. Not changed.
- **Badges recounted** on Platform Ready for Dev, Quizzes, Video and WIP: none shows the all-on defaults
  after this update, and none is on an older library state.
- `Topbar` v1.2 and `Topbar-Item` v1.1 and the removal of the V1 badge are published.

## 2026-10-12 · Topbar: the active section is set on its item; Topbar-Item rebuilt as a tab

- **Asked by Nelson on 12 Oct:** choose on the component which tab (page) is active. I rebuilt the atom and
  added a `Current` property with five values to the Topbar. **Nelson then simplified it, and this is what
  stands:**
- **`LMS/Platform/Navigation/Topbar-Item` v1.1:** an underline tab (body-large Semibold, padding 12/4, 48
  tall on its own). Variant property **`Current` = Off | On** (it was `State` = Default | Current). On: label
  in text/primary and a **3px** bg/primary bar along the bottom, top corners rounded 2. Off: text/subtle.
  `Label` and `Show count` as before; the count badge is exposed as *Count* (Brand when On, Gray when Off).
- **`LMS/Platform/Navigation/Topbar` v1.2:** two variants again, **`Breakpoint` = Desktop | Compact**. There
  is **no `Current` property on the Topbar**: the page is marked by setting `Current=On` on its exposed item
  and Off on the others. Desktop has no vertical padding; the nav and its five items fill the height of the
  bar (71 under the 1px rule), 12 apart, so the bar of the current item sits on the rule. No grey rule under
  the group. Dashboard is On by default.
- **DS:** descriptions of both components updated to say this. Not published when written.
- **After publish and accept:** check which item is On on every screen (the default is Dashboard, most
  screens need My Learning).
- **Prototype (PR 110, merged):** items fill the bar, 3px bar on the rule, no group rule. Measured at 1280.

## 2026-10-12 · Badge V1 deleted; badges inside LMS components repaired after the library update

- **Nelson published the DS and accepted the update** (Badge v1.1, names without a version). Prototype PR 109
  and docs PR 42 merged.
- **Badge V1 deleted** (Nelson's go-ahead): `Badge-V1_to-remove`, 453 variants, removed from the Badges page
  of the DS. Named version saved first. **Not published yet.** The count before deleting: no instance on the
  five DS pages we use nor on the ten product pages outside Discovery and Archive.
- **Regression found after the update, repaired:** on the screens, the `Badge` nested in the LMS wrappers
  (`Topic-Types-Badge`, `Topic-Status-Badge`, `Provider-Partner-Badge`, `Delivery-Mode-Badge`,
  `Difficulty-Badge`, `Program-Card`) fell back to the Badge defaults and showed a dot, a trailing arrow and
  a close icon. In the DS the wrappers are right. Set back to what the DS wrappers define on 994 badges:
  Quizzes 352, WIP 223, Platform Ready for Dev 211, Video 148, Lab 38, Reading 16, Topic Content Types 6;
  none on Overlay Panels, Completion and Course Detail Components. Texts and icons had survived. One render
  checked (the sidebar on the WIP page). **Why it happened is not established**: `Badge` defaults are
  all-on, so any wrapper that loses its overrides shows them.
- **43 badges on an older library state** (10 on Platform Ready for Dev, 12 on Video, 21 on WIP) re-pointed
  to the current `Badge`, texts and sizes compared before and after. Eight of them, inside four instances of
  the old `LMS / Course Card_Remove` on the WIP page, lost their leading icon in the swap and got it back
  from the same badge elsewhere on the page.

## 2026-10-12 · No version in component names; Badge icons follow the label colour

- **Decided by Nelson on 12 Oct:** Buttons and Badges are the current components by default, V1 goes, and no
  name carries *V1* or *V2*. The version stays in the Figma description only. Older entries below that say
  `Badge v2` or *Button V2* mean `Badge` and `Button`.
- **DS, not published:** the sets were already named `Button`, `Link Button`, `Icon Button`, `Badge`. Renamed:
  the showcase frame and its three group titles on the Badges page, three notes on the Buttons page, one text
  on the LMS Platform page, and the descriptions of seven components. Named version saved first.
- **V1 count:** no direct instance of `Badge-V1_to-remove` or of the old `Buttons/Button` in the LMS ICP, LMS
  Platform, In review, Badges and Buttons pages of the DS, and none on the Quizzes page of the product file.
  The other product pages and the base components outside the LMS pages were not counted. Nothing deleted.
- **Badge v1.1, not published:** dot, icons and close did not follow the label colour in three places. Extra
  hues (Cyan to Orange) sat on the teal icon token in Outline, Modern and Plain; they now use the variable of
  their label (`text/accent-<hue>`, or the `Colors/<Hue>/700` primitive where the label uses it: there is no
  `icon/accent-<hue>` token for those eight). In Soft Light the accents and extras had white (on-accent)
  icons on a light fill; they now use the label's variable. Four Modern Info variants had `icon/primary`.
  The white leading icon on its filled disc in Plain is unchanged.
- **Prototype (PR 109, merged):** the same wording in 35 files of comments. No code change.

## 2026-10-12 · Top bar tabs and Button group on the screens, after the DS update

- **Nelson published the DS and accepted the update on 12 Oct** (`Topbar` v1.1, `Button group` v1.1).
  Prototype PR 108 and docs PR 41 merged. Named version saved in the product file first.
- **Top bar:** the 19 desktop bars on *Platform Pages - Ready for Dev* and the 14 on the WIP page show the
  tabs. *My Learning* is current everywhere except the two Dashboard desktop screens, set to *Dashboard*.
- **Button group:** 7 visible groups per page (3 Q&A filters, 4 Grid / List toggles) are a track with a
  pill. The colour overrides of 10 Oct are gone. Several current segments were still tied to an older
  library state of `_Button group base`; they were swapped to the current variant through a fresh
  `Button group` instance (the base is private, so it cannot be imported by key), labels and icons kept.
- **Not touched:** 4 hidden toggles per page (tablet and mobile, where the collection is Grid only).
- **Seen, not changed:** the top bar instances on the screens are 53 tall, the DS component is 72.

## 2026-10-11 · Button group: a track with a pill for the current segment

- **Decided by Nelson on 11 Oct:** of six options for the selected state of the Grid / List toggle he chose
  the track with a pill. The soft blue fill of 10 Oct (1.07:1 against the page) did not show which one is on.
- **DS, not published:** `Button group` v1.1 and its 32 `_Button group base` variants. The group is a
  bg/muted track (padding Spacing/xs, gap Spacing/xxs, radius fixed-md), with no border, no shadow and no
  rules between segments. The current segment is a pill: bg/page, 1px border/subtle, radius fixed-sm,
  text/primary or icon/primary. The others have no fill (bg/subtle on hover) and text/subtle or
  icon/subtle. Still 40 tall; segments are 32. Existing variables only. Named version saved first.
- **It is the whole component:** text groups (the Q&A filter) change with the icon ones. A group grows 8px
  wide, plus 2px per gap.
- **Screens, not done:** they change when the library is published and the update accepted. The 11 groups
  on *Platform Pages - Ready for Dev* carry fill and stroke overrides on their segments (from 10 Oct) that
  will survive the update and have to be cleared after it; the WIP page was not counted.
- **Prototype (PR 108, merged):** the My Learning view toggle and the Q&A filter. Measured on My Learning:
  98 × 40, segments 44 × 32. The Q&A filter and the dark theme were not opened in the browser.

## 2026-10-11 · The platform top bar shows its sections as underline tabs

- **Decided by Nelson on 11 Oct:** the top bar navigation uses the DS `Horizontal tabs`, Type=Underline,
  Size=md (the component of the *Programs / Courses* tabs on My Learning), on every screen.
- **DS, not published:** `LMS/Platform/Navigation/Topbar`, Desktop, v1.1. The five `Topbar-Item` instances
  left the bar; one `Horizontal tabs` instance holds *Dashboard, My Learning, Calendar, Discussion, Services*,
  with the count as the tab's Badge (4 on My Learning, 3 on Calendar) and *My Learning* current by default.
  The bar stays 72 tall with its padding tokens; the tabs are 48 tall, centred. Named version saved first.
  Compact (tablet and mobile) has no section list and did not change. `Topbar-Item` is still in the library.
- **Screens:** they take the change when the library is published and the update accepted. After that the
  current tab has to be set again on the screens where it is not *My Learning* (the Dashboard ones): the old
  per-item overrides do not carry over.
- **Found in the DS, not changed:** in `Horizontal tabs` the booleans *Tab 3* to *Tab 10* are wired to
  nothing in the Underline md Desktop variant; the extra tabs are hidden by hand.
- **Prototype (PR 107, merged):** the desktop bar draws the same tabs. They stay links in a `nav` with
  `aria-current`, not an ARIA tablist. The compact menu is unchanged.
- **Not decided here:** sidebar or top bar for the platform is still open.

## 2026-10-10 · The 44 px touch-target rule is stated once per handoff page

- **Decided by Nelson on 10 Oct:** the *Accessibility* annotation "Touch target ≥44×44 on mobile" was
  repeated on every control of every mobile screen. It now sits once per handoff page.
- **Removed:** 144 annotations on instances: 66 on Video Lessons, 45 on Quizzes, 26 on Reading, 7 on Lab.
  Named version saved first. The other annotations of those pages are untouched (3 on Video Lessons).
- **Left:** one annotation per page, on a mobile screen, worded for every interactive control of the page.
  The ids are in `phase1-readiness.md`.
- **Exception, on the component:** the description of `_Video action button` in the DS says its hit area is
  34×44 in the Video actions bar. Not published.
- **Not done:** no page was added to the DS foundations for the rule; it is in `PRODUCT.md` and
  `phase1-readiness.md`.

## 2026-10-10 · Nelson's second round of answers: learner, enrolled total, cards, video bar (PRs 99 to 102 merged, 103 open)

- **Decided by Nelson on 10 Oct:**
  - the learner is *John Smith* in the prototype too (PR 101);
  - the Dashboard says *of 17 enrolled*: five single courses, seven of the AI program, five of Cybersecurity
    (PR 101, and Figma: three source screens and three handoff copies, named version saved first);
  - the 12 program courses sign their bylines with the course's own title (PR 101);
  - the two embedded Six Sigma players get their caption back, from a transcript of their own (PR 101);
  - course cards and program cards always keep the same height (PR 100);
  - program cards stay three per row; the fictional brand *Brightwell Refill* stays.
- **Cards, one height (PR 100):** a course card keeps the height of a two-line title and cuts a longer one; the
  program card's footer has one height in both states. The DS `Course-Card` has no fixed title height and the
  DS `Program-Card` is 408 or 404 by state: the rule is not in the DS components yet.
- **Video actions bar (PR 102):** Nelson reported it did not match Figma. Compared with the DS
  `_Video actions bar` (`9264:576129`): one row on tablet with skip and volume, a small size for phones,
  filled icons, two-digit timestamps, a white progress line. Open for Nelson:
  - the progress line is `bg/on-media` as the DS draws it, against the rule that progress is `bg/info`;
  - the prototype keeps the progress slider on phones, and Speed and CC on tablet and phone; Figma draws
    none of them at those sizes;
  - the end timestamp shows the total; Figma shows the time left.
- **DS, not published:** the descriptions of `LMS/Platform/Discovery/Course-Card` and
  `LMS/Platform/My-Learning/Program-Card` carry the clickable-card dev note (Nelson's go-ahead of 10 Oct;
  named version saved first; no visual change).
- **Caption on a short player (PR 103, open):** the caption sat too high after the bar changed and was cut on
  the session recording at 375.
- **Left:** an instructor named *Olivia Rhye* on the Six Sigma course page and a host in the `/lab` personas,
  other people who share the old placeholder name.

## 2026-10-10 · Prototype follows three Figma changes; search on real topics; activities (PRs 93 to 98 merged, 99)

- **Course search, decided by Nelson on 10 Oct:** the search content is the real topics of the player, on
  every course, Six Sigma included (PR 98). Six Sigma no longer searches the sample written to match the Figma
  screens: *control chart* gives 3 results in the prototype, where the screens draw *20 of 29*. The screens
  keep their figures. *Show more results* cannot be reached in the prototype now (no search gives more than
  20). Every result opens its own topic; results in locked topics are left out and counted.
- **Course Detail, Progress tab on desktop (PR 94):** Nelson changed screen `6406:41528`: main column 840,
  sidebar 320. The prototype split the row in two equal columns.
- **Program card (PR 95):** Nelson changed `LMS/Platform/My-Learning/Program-Card` in the DS. Grid: the title
  keeps the height of three lines and is cut at the third. List: the title is cut at two lines and the body
  spreads top to bottom. Read from the component; the DS variant is 473 wide and the prototype's grid cell
  384, not changed.
- **Activities per course (PR 96):** 54 activities written, the last topic type that was generic. Three
  briefs asked for XLSX, which the uploader does not accept: now PDF or DOCX. Seven quiz review links
  repointed to written topics.
- **Cards open their page as a whole (PR 93):** merged. A dev note is on the screen description of
  My Learning · Courses (grid, desktop) on the handoff; not on the DS component.
- **ICP Hub, version 33:** the decisions of 9 and 10 Oct and five open questions.
- **Not found:** Nelson pointed at node `6875:17009` for another change; it does not exist in the file. Waiting
  for a new link.
- **Open for Nelson:** *of 7 enrolled* or 12; *Olivia Rhye* or *John Smith*; the caption on the two embedded
  Six Sigma players; the fictional brand *Brightwell Refill*; the byline of the 12 program courses (program
  name today, course title on the five single courses); the dev note on the DS component.

## 2026-10-10 · Cards open their page as a whole (prototype PR 93); PR 92 merged

- **Asked by Nelson on 10 Oct:** the cards of courses and programs are clickable to the details page,
  independently of the Resume button.
- **Built:** My Learning course cards, program cards, the course rows of a program page and the Dashboard
  resume rows. Card → course or program page; button → player. The program card's *Continue* now opens the
  player of the course in progress.
- **Flow document updated** (`platform-navigation-flow.md` §1 and *Still open*).
- **Not done:** no annotation on the Figma screens yet; the DS components have no hover state for the card.

## 2026-10-10 · Nelson's answers of 10 Oct, built: data, proposals, topic types, more bodies (PRs 88 to 91 merged, 92)

- **Decided by Nelson on 10 Oct** (answers to the open questions): fix the four remaining data
  disagreements; write labs and podcasts per course, the video caption and length, and more topic bodies;
  propose the passed course, the program certificate and the long title in a resume row; the mobile menu
  follows the desktop order; a program course always shows the program path.
- **Data, prototype PR 91 and Figma** (source screens and handoff copies, named version saved first):
  - AI program: *10 months* (was *4 months*); *What's included* counted from the seven outlines.
  - Dashboard and My Learning: 4 in progress, 2 completed, 2 certificates, *of 7 enrolled*. The 7 is the five
    single courses plus the two program courses already started; an assumption, open for Nelson.
  - *Business Analytics with Python*: *Starts Oct 14* (was *Apr 28*). Cybersecurity card: *Starts Oct 5*.
  - Renders seen: Dashboard desktop, My Learning Courses desktop, program Certificates desktop. Tablet and
    mobile by text read-back only.
- **Proposals, PR 89 (not designed; each carries a visible note):**
  - *Passed course:* success colours for grade, alert and header line; issued certificate card with View and
    Download; no weekly goal. For a designer: the colour of section scores, the pass icon, the certificate
    sheet without a partner.
  - *Program certificate:* page `/platform/certificate/program/<slug>`, linked from the program's
    Certificates tab. No sample program is complete, so only the not-earned state is reachable.
  - *Download* on certificate cards and pages only shows a toast.
- **Resume rows on the Dashboard, PR 89:** a long title wraps to two lines, nothing clipped. Between 1024 and
  about 1250 wide the list uses the stacked row, because the one-line row does not fit: new behaviour, for
  Nelson to see. The DS `Course-Row` is unchanged in Figma.
- **Navigation:** mobile menu order and the program path were already as decided; nothing visible changed.
- **Topic types, PR 90:** Lab, Podcast, Lesson Page and live session take per-course content; the video
  caption follows the topic's transcript and the length its duration. Six Sigma: videos without a seeded
  transcript show their own first line and length; the players embedded in the lesson page and the session
  recording lose their caption.
- **More bodies, PR 92 (open):** 191 topics gain a written body; each course has 18 to 20. Activity topics
  still show neutral steps.
- **Course search, PR 88:** merged.
- **Found, not changed:** the prototype's learner is *Olivia Rhye* while the Figma screens say *John Smith*;
  some older assignment briefs ask for XLSX, which the uploader does not accept; transcripts cover about two
  minutes of longer videos.

## 2026-10-09 · Lab: what the two meetings established; *Complete and continue* proposed

Details in [`lab-third-party-platforms.md`](lab-third-party-platforms.md) §7. **Nothing decided; no screen of the
handoff changed.**

- **From the meetings of 9 Oct:** new tab for every partner in phase 1; Google labs are not graded or recorded
  and nothing is tracked after the launch; today the LMS completes the topic on the click that launches the lab;
  the certificate depends on quiz scores, not on completion; the button reads *Open lab*.
- **Open, to be closed by Navdeep on 12–13 Oct:** complete on launch, or the learner says so.
- **Proposal sent to Navdeep:** on topics the platform cannot measure, the footer's forward button reads
  *Complete and continue* and replaces Mark as Complete. Board `6926:14403` on the Lab page: four footer states on
  desktop and mobile, and Reading and Lab screens in context. Built from the DS footer as it is.
- **Now known to be out of date on the Lab page:** the Embedded rows (out of phase 1) and the two Google screens
  that wait for and receive a score. They stay as they are until the decision.

## 2026-10-09 · Prototype: each course searched in its own content (PR 88); PRs 85 and 87 merged

- **Merged:** PR 85 (structure) and PR 87 (content). PR 87 replaced PR 86, which GitHub closed when its base
  branch was deleted on the merge of 85; same content. Live on the prototype site.
- **Course search, PR 88:** a course with its own content is searched in that content (lesson and topic
  titles, and the topic bodies written for it). Each result opens its own topic; results in locked topics are
  left out and counted. Six Sigma keeps the sample of the screens (*control chart*, 20 of 29).
- **Still generic after PR 88:** the video caption and length, the Lab, Podcast, Lesson Page and live-session
  bodies, topics without a written body.

## 2026-10-09 · Prototype: own content for every course and both programs (PRs 85 and 87)

- **Asked by Nelson on 9 Oct:** own content for all courses and programs.
- **PR 85, structure only:** one folder per course (`lib/courses/<slug>`), one file per program
  (`lib/programs/<slug>.ts`), a registry for each and an authoring guide (`lib/courses/README.md`). 42 pages
  captured before and after: no difference. Stored progress is kept.
- **PR 86, content (stacked on 85):** 15 more courses with their own outline, course page on four tabs and
  topic bodies: the four other My Learning courses, courses 1 and 3 to 7 of the AI program, and five courses of
  the second program. 17 courses in all now have their own content.
- **Second program:** *Cybersecurity Fundamentals Certificate* has a program page; its My Learning card opens
  it. Course titles were proposed for the prototype (only the card existed). Its start moved from *May 12*, in
  the past, to *5 Oct 2026*.
- **AI program page:** no *Content to be provided* left. Module lists for all seven courses, and bodies for
  the FAQ and About items the design draws closed. This is sample content for the prototype and differs from
  the Figma frames, which keep those items closed; the vendor's content replaces it when it arrives.
- **Dates invented for the sample:** suggested start and due dates of the courses not started, a 91% grade
  for course 1, 88% for *Intro to Product Analytics*.
- **Found, for Nelson, not changed:**
  - the AI program says *4 months* while its dates run 27 Jun 2026 to 31 Oct 2027;
  - *Starts Apr 28* on *Business Analytics with Python* has no year and is in the past;
  - Dashboard and My Learning count *3 of 5 enrolled* and *1 completed* without the program's courses;
  - a completed course has no passed state on the course page (grade in warning and error colours, no
    certificate preview): not designed;
  - *What's included* counts podcasts and labs, which no course outline has.
- **Still generic:** course search (Six Sigma sample on every course), the video caption and length, the
  Lab, Podcast, Lesson Page and live-session bodies, topics without a written body.
- **Not checked:** a visual pass of the merged branch, tablet width, dark mode, submitting a quiz or an
  assignment, the bodies of locked final projects.

## 2026-10-09 · Sample data made consistent, in the prototype (PR 84) and in Figma; PRs 83 and 84 merged

- **Decided by Nelson on 9 Oct:** fix the four disagreements in both places.
- **Program, Certificates tab:** course 2 reads *15 of 38 topics · 40%* (was *14 of 35*).
- **Dashboard, due item:** *26 Sat*, *Due Sat*, under *AI-Driven Content and Brand Communication · Homework*
  (was *Fri*, under *AI-Driven Digital Marketing*).
- **Dashboard, first resume row:** the course *AI-Driven Content and Brand Communication* at 40% (was the
  program name at 38%). On desktop the longer title wraps to two lines so the delivery badge is not clipped;
  the row is 80 high instead of 68. The DS `Course-Row` itself is unchanged: a long title does not fit on one
  line at 728 wide, open for Nelson.
- **My Learning, program card:** *Certificate Program in AI Augmented Digital Marketing*, *Up next · Course 2 ·
  AI-Driven Content and Brand Communication* (was *AI-Driven Digital Marketing Certificate*, *SEO & Organic
  Search*). The hidden intro sentence on the My Learning screens carries the same program name.
- **Where in Figma:** the current source screens on the WIP page and the handoff copies `6408:35150` and
  `6728:15050`, desktop, tablet and mobile. Named version saved first. The earlier explorations on the WIP page
  keep the old wording.
- **Not checked by render:** Certificates tab on tablet and mobile, Programs on tablet (text read back only).
  PR 84 was not opened in a browser before the merge.
- **Next:** own content for every course and program, asked by Nelson on 9 Oct; the content files are being
  split to one per course first.

## 2026-10-09 · Prototype: two courses with their own content (PR 83); Hub on navigation

- **Own content, asked by Nelson:** *AI-Driven Content and Brand Communication* (course 2 of the program) and
  *UX Research and Design Thinking* (My Learning) have their own course page on all four tabs and their own
  player outline, with a few topic bodies written for them. The other courses still show the sample body under
  their own title. Prototype PR 83.
- ***Go to next course* tested:** finishing course 2 of the program opens the page of course 3.
- **Found in the sample data, for Nelson:** the program's Certificates tab says *14 of 35 topics* for course 2
  while its module rows add up to 38; the Dashboard's *24 Tonight* and *26 Fri* cannot both hold in Sep 2026; its
  first row shows the program at 38% (the program is 14%); the My Learning program card differs from the
  program page in title and *Up next*.
- **ICP Hub, versions 30 and 31:** the navigation rule as a decision, the flow document, the search working on
  Course Detail, the certificate page as an open question.

## 2026-10-09 · Prototype: what to search, and the old hub removed (PR 82); PRs 81 and 82 merged

- **Asked by the dev team (Komal):** what the results look like after Enter, and which text can be searched. The
  results view was already live (PR 79); checked on the live site, *control chart* gives *20 of 29 results*.
- **New in the prototype:** focusing the empty search field opens a note, labelled *Prototype note · sample
  content*, with six searches and what each shows (`control chart`, `DMAIC`, `Pareto`, `baseline`, `kanbam` for
  no results, `fail` for a failed search). Not part of the design: in the product an empty field shows nothing.
- **The old course hub is removed** (`components/views/CourseHub.tsx`), decided by Nelson on 9 Oct.
- **Own content for some courses**, asked by Nelson on 9 Oct: in progress for two courses; not merged yet.

## 2026-10-09 · Navigation flow, second pass: Nelson's six answers built (prototype PR 81, open)

- **A course shows its own title.** Every course of Dashboard, My Learning and the program has its own page and
  player address; it used to land on the one sample course. The body and the topics are still that sample.
- **In a program** a course's title opens its page, and the course page shows the path *My Learning › Programs ›
  the program*. ***Go to next course*** opens the next course of the program.
- **Due items** on the Dashboard open the assignment in the player.
- ***View* on an issued certificate** opens a certificate page. **It is a proposal: no Figma screen exists**, and
  the page says so.
- `platform-navigation-flow.md` §4 now lists the decisions and what is still open (the old hub's code, a design
  for the certificate page, which path a program course shows when opened from Courses, the sample content).

## 2026-10-08 (late night) · Navigation flow, first pass: the rule, the map and what is open

Asked by Nelson: start defining the correct flow across navigation, Dashboard, My Learning, course and program
pages. New `LMS-HANDOFF/platform-navigation-flow.md`; prototype PR 80, open.

- **The rule**, from the three addresses Open edX gives an enrolment (`homeUrl`, `resumeUrl`, `progressUrl`):
  a title opens the course page, a button opens the player, and leaving the player goes back to the course page.
- **Wired in the prototype (PR 80):** the site root opens the Dashboard; the player's exit goes to the course
  page and its logo to the Dashboard; the course-complete dialog and the certificate go back to the course page;
  the *Programs* crumb opens My Learning's Programs tab; *Review* on a finished course opens its page; the
  Dashboard's course titles are links.
- **Open, seven questions in §4 of the document.** The first: every card opens the same sample course, whatever
  its title. The shell (sidebar or top bar) is not part of this: still undecided.

## 2026-10-08 (night) · Button V2 gains Neutral, Utility Button and Close Button

Decided by Nelson: the screens move to Button V2, V2 is completed first, and only the components we use are
migrated. Named version first. **Not published yet. Nothing is swapped on any screen.**

- **`Button` v1.1 and `Icon Button` v1.1:** a fourth `Type`, *Neutral*, as Secondary only, in the five states (40
  variants each). It is the grey outline the screens use about 340 times: outline `border/default`, label
  `text/subtle`, icon `icon/subtle`, no fill. Existing variants untouched; each new one tested with an instance.
- **`Utility Button` and `Close Button` v1.0:** the previous `Buttons/Button utility` and `Buttons/Button close X`
  were still in the DS file but on no page and unpublished. They are back on the Buttons page under the new
  names, **with the same keys**, so the instances on the screens reconnect with the publish and need no swap.
  The close button's six raw hover and focus fills on dark are on `bg/on-media` at 20 %.
- **Measured in the DS:** 3 305 previous-generation buttons live inside the DS itself (3 058 `Buttons/Button` in
  142 components, 134 close in 13, 113 utility in 15), most in Untitled UI marketing blocks that stay as they are.
- **Next:** the buttons nested in the LMS and base components move to V2 in the DS; a publish; then the direct
  instances on the screens, page by page. Register: `03-design-system/component-versions.md`.
- Two traps recorded (46, 47): a bound paint that kept a black colour, and a binding that reset an opacity. Both
  were caught on the render and corrected before this entry.

## 2026-10-08 (late night) · Prototype: the course search works (PR 79)

Nelson tried the search on the live Course Detail and it did nothing: PR 77 had shipped the field without
behaviour. Prototype PR 79, merged by Nelson the same night.

- **Built from the eight screens of section `6837:27914` and §39 of the metadata map:** hint while typing, search
  on submit only, *Searching…*, results in a popup under the field (type tabs with counts, excerpt with the
  matches marked, location, match count, *Show more results*, the count of results not open yet), no results,
  failed search; on mobile a full screen with the field and *Cancel*.
- **Measured at 1280:** popup 560 wide, 8 under the field; 104 typing, 102 searching, 794 results, 110 no results,
  150 failed (148 in Figma). *control chart* gives *20 of 29* and *All 20 · Text 9 · Video 2 · Quiz 7 · Lesson 2*.
- **Wider than the screens, asked by Nelson:** on mobile the field sits above every tab, not only Course.
- **Sample content, not an index;** typing `fail` shows the failed state. Every result opens the same topic.
- **Not read layer by layer:** the two mobile screens; the sheet follows §39.3.

## 2026-10-08 (late night) · Buttons: the screens are on the previous generation, not on Button V2

Asked by Nelson: close the question of how `Buttons/Button`, `Button utility` and `Button close X` map to the
register's `Button`, `Link Button` and `Icon Button`. Read-only in both files.

- **They are not the same components.** The screens use the previous generation (`Buttons/Button` 1 559,
  `Buttons/Button utility` 342, `Buttons/Button close X` 185 on the ten pages counted). Button V2 (`Button`,
  `Link Button`, `Icon Button`) has other keys and other properties, and no instance on those pages uses it.
- **The previous generation is no longer in the library:** importing `Buttons/Button` and `Buttons/Button utility`
  by key fails, while a published component imports in the same test. The instances work but cannot be updated.
- **Three cases have no V2 equivalent** (already in the 24 Sep review): the neutral grey-outline Tertiary, the
  utility button with its Active state, and the close button.
- **Docs:** `component-versions.md` has a new section *Buttons: two generations* with the mapping table, the V2
  rows read *on no screen yet*, and three legacy rows were added; the components-used list no longer says the
  two families are the same. The ICP Hub rows follow.
- **Open, for Nelson:** migrate the screens to V2 (and add the three missing cases to V2 first), or keep the
  screens as the visual reference for now. Engineering was sent Button V2 as batch 1.

## 2026-10-08 (late night) · Components-used list recounted with the current names; the Lab page added

`03-design-system/ds-components-used-icp-lms.md`, read-only in Figma, one read per page, every instance resolved
to its main component (27 832 instances on ten pages, hidden ones included).

- **Names:** the list now uses `LMS/ICP/…` and `LMS/Platform/…`. Section 1 is the course player family plus the
  `LMS / …` components not renamed; section 1b is the platform family, with the Discovery and course-end
  components. The note about old names is gone.
- **Page added:** *Lab · Third-party platforms* (`6789:325`), 3 091 instances.
- **Totals (7 Oct → 8 Oct):** LMS product 68 → 66, LMS platform 31 → 40, base 25 → 28, icons 53 → 61, logos 5,
  private bases 13 → 16, handoff 13 → 12. Part of the movement is the rename: the Discovery and course-end
  components moved to 1b, and `Vertical-Scroll`, `Bookmark`, `Collapse-Toggle` and `Topic-Status-Badge` moved
  into section 1.
- **Method check:** components that did not change give the 7 Oct numbers on the six ICP pages counted then
  (`Option-Row` 913, `Question-Card` 286, `Topic-Row` 509, `Sidebar` 106, `AI-Panel` 115).
- **Still under an old name:** `LMS / Course Card_Remove` (5) on the archived My Learning frame of V8 WIP
  (`6207:250057`), and `LMS / Quiz · Answer Input` (9) on the Discovery page (`4998:100173`), which has a
  different key from `LMS/ICP/Assessment/Answer-Input`. The 20 nested badges on the archived frame read old
  names but have the keys of the renamed components.
- **In review, yet on screens:** `LMS/ICP/AI/AI-Panel` 144 instances, all hidden;
  `LMS/Platform/Completion/Certificate-Document-demo` 11.
- **Platform components on ICP pages:** 21 of the 40, 601 instances (provider badge in the player sidebar, the
  IBM Course Detail screens on the Lab and Discovery pages). Table 1b has an *ICP pages* column for it.
- **Local:** 94 instances: the platform sidebar set `LMS` (`6207:256263`, 11), device chrome (58) and
  `Worklist checkbox` (25).
- **Seen, not changed:** the 33 handoff cards of the Lab page have no `Handoff / Phase Badge`.
- **Corrected in `component-versions.md`:** it said the five components moved to *In review* besides `AI-Panel`
  were on no screen. The count shows `Certificate-Document-demo` is placed (on the certificate screens); the
  other four are on no screen.

## 2026-10-08 (late night) · Content search section moved to Ready for Dev; two banners corrected

- **Nelson moved the Content search section** (`6837:27914`) from the WIP page to *Platform Pages - Ready for
  Dev*, right of the Course-Header backgrounds frame. Read back there: eight screens, eight popups and sheets and
  the dev note, nothing overlapping. A **WIP** banner was added above it (`6862:54201`), as the other frames on
  that page have. Its name still ends *sources (in progress)*.
- **Banner text corrected.** The WIP banner added earlier over the Course-Header backgrounds frame had kept the
  subtitle of the Program Page banner it was copied from. Both new banners now carry their own subtitle; the
  Program Page banner is unchanged.

## 2026-10-08 (late night) · After the DS publish: names and versions read back in the product file

Nelson published the DS and accepted the update. Read from the saved file, five pages, no renders.

- **Badges reading *Label*: 0** on Video, Quizzes, Reading, Platform Ready for Dev and V8 WIP.
- **New names are in.** On the four Ready for Dev pages every LMS component an instance points to is
  `LMS/ICP/…` or `LMS/Platform/…`, except the ones left unrenamed on purpose (`Progress Circle`, `Empty State`,
  `Inline Alert`, `Footnote`). On V8 WIP the old names remain only on the archived Discovery screen (it points to
  the deleted `Course Card_Remove` and its nested badges) and on the local `LMS` set, the platform sidebar.
- **Version line is in.** Three platform components (`Navigation/Topbar-Item`, `Completion/Certificate-Card`,
  `Completion/Certificate-Document-demo`) came without it on the first read; Nelson published those three and
  accepted, and the second read has `Version v1.0` on all of them (36, 24 and 5 instances on Ready for Dev).
  Without the line now: only the archived Discovery screen's old copies and the local `LMS` sidebar set.

## 2026-10-08 (late night) · Prototype: Course Detail, the platform pages in line with Figma, IBM as a hosted course

Prototype `nvjeronimo/skillup-lms-prototype`. PRs 76 and 77 merged by Nelson; PR 78 open.

- **PR 76, Dashboard, My Learning and Program:** compared against the handoff cards of 8 Oct at 1280, 960 and
  375. Dashboard without the streak and with four totals; course cards with covers (placeholders, the pictures
  the Figma screens use), total effort and one completed course; program card without cohort, week and lessons.
  The Program page's Courses tab was still the 1 Oct design (numbered accordion and sidebar) and was rebuilt as
  seven course rows; tablet and mobile use the compact row and the Program header.
- **PR 77, Course Detail:** `/platform/course/six-sigma` with Course, Progress, Dates and Mentorship Q&A on the
  three breakpoints. On My Learning the course title links to it. Not built: course search (the field is drawn),
  the weekly goal and certificate states that are not on the screens, links from Program and Dashboard rows.
- **PR 78 (open), IBM:** `/platform/course/introduction-to-cloud-computing`, the two IBM screens of the Lab page.
  *Start course* opens the dialog before leaving; once started the card reads a dash, *Progress is tracked on
  IBM* and *Continue on IBM*. Progress card 360 × 168 as in Figma. Under the header the page shows one marked
  note, because that part is not designed. With it the eleven screens of the Lab page are in the prototype.
- **Still on mobile only:** blocks with a button are a few px taller than Figma (44 px touch targets).
- **Found in Figma, not changed:** on the Course Detail screens the modules add up to 42 topics only in the
  header, Module 4 has two titles, *Course ends* is dated 2037, the weekly goal reads 2 of 3 on one tab and 3 of 3
  on another, and the mobile grade badge is clipped; on the mobile Certificates card of the Program page the
  certificate shows the component's default content; `certificate-seal-ring.png` is missing from the prototype.

## 2026-10-08 (night) · DS: LMS components renamed to `LMS/ICP/…` and `LMS/Platform/…`; versions written in Figma

Decided by Nelson on 8 Oct (ideas 1, 2 and 5 of six, then "finish the versions"). Two named versions first:
*Before component versions are written in the descriptions* and *Before the LMS components are renamed to LMS/ICP
and LMS/Platform and regrouped*. **Not published: the publish is Nelson's.**

- **74 components renamed**, names only, to the September convention: `LMS/ICP/<Group>/<Component>` (Player,
  Sidebar, Content, Topics, Assessment, Live, AI) and `LMS/Platform/<Group>/<Component>`. Keys read back
  unchanged, so instances follow. The four parts with no prefix got a name (`Player/Vertical-Scroll`,
  `Sidebar/Collapse-Toggle`, `Sidebar/Bookmark`, `Content/Topic-Status-Badge`). Map from old to new:
  `03-design-system/component-versions.md`, *Rename map*.
- **Moved by ownership** to the page `❖ LMS PLATFORM COMPONENTS`, right of the existing section: the Discovery
  frame (course card and row, four badges, level icon, card menu) and the course-end frame (`Completion/Certificate`,
  `Completion/Course-Complete-Modal`).
- **New page `❖ LMS · IN REVIEW / NOT FOR BUILD`:** the AI Assistant frame (`LMS/ICP/AI/AI-Panel`, work in
  progress, on 117 screens) and five components on no screen: `Daily Goals`, `Live Attendance`,
  `Module Time-Left`, `Dashboard/Streak-Card`, `Completion/Certificate-Document-demo`.
- **Not renamed:** `Inline Alert`, `Empty State`, `Progress Circle`, `Autosave Status` (they wait for the
  promotion to Foundations), `Footnote` (handoff atom) and `Discussion Prompt` (retired topic type).
- **Versions in Figma:** the first line of the description reads `Version v1.0 · since 8 Oct 2026` on 139
  components (82 on the LMS pages, 35 platform, 22 base; `v2.0` on `Badge v2`, `Button`, `Link Button` and
  `Icon Button`). `Select` was not found by that name on the Inputs page.
- **Corrected:** the register listed the button family under old instance names (`Buttons/Button`, `Button
  utility`, `Button close X`). The library has `Button`, `Link Button` and `Icon Button`.
- **Not done:** the section titles on the LMS components page still read *2 · Player shell* and so on; one
  documentation text on that page and the code comments in the prototype still use the old names; the
  components-used list keeps the old names with a note pointing to the map.

## 2026-10-08 (night) · Component versions: a convention and a register; the Hub lists the components

Asked by Nelson, after the engineering team asked for the final component list for Storybook.

- **New `03-design-system/component-versions.md`:** every component the ICP and LMS screens use has a version,
  `MAJOR.MINOR`. MAJOR when a property, a variant or the structure changes in a way that breaks what was built;
  MINOR when something is added or the look changes; nothing for descriptions, links and layer names. A version
  moves only on a publish, with a changelog entry that names the component and the new version.
- **Baseline, 8 Oct 2026:** `1.0` for all 137 (79 LMS product, 35 LMS platform, 23 base), `2.0` for `Badge v2`
  and the `Button` family. Earlier history stays in this changelog.
- **ICP Hub:** a new *Components* section lists the 137 with Figma links, usage and version.
- **Not done:** the version is not written in the Figma component descriptions (a DS write, waits for the
  go-ahead). Figma links for 21 of the 23 base components go to the component's page, not the component.

## 2026-10-08 (night) · Partner labs in the prototype (PR 74); critique leftovers (PR 75)

Prototype `nvjeronimo/skillup-lms-prototype`, PRs 73, 74 and 75 merged by Nelson on 8 Oct. Built from the handoff page
`↳ Lab · Third-party platforms` (`6789:325`) and `lab-third-party-platforms.md`.

- **Two new topics** in the Six Sigma course, after the download lab, which is unchanged: a Google lab (LTI,
  scored) and a Microsoft lab (a link, nothing comes back).
- **Screens covered:** G1–G3 and M1–M3 as the default behaviour; E1–E3 (inline, modal, frame refused) behind a
  *Lab launch* switch in the demo menu, on a Google lab only, because they wait for the Studio test.
- **`LMS / Lab · Launch Card`** exists as a prototype component, four states. Measured at 212 px (244 completed),
  padding 40 / 32 / 24, the same as Figma.
- **The partner's site is a stand-in** (`/partner/google`, `/partner/microsoft`), marked as such on screen. *End
  lab* on the Google one sends the score back.
- **Found while building:** on screen E2 (modal), step 1 still reads *It starts in a new tab*. The prototype says
  *It opens in a window over this page*. The Figma text is not changed yet.
- **Not built:** the two IBM screens. They sit on Course Detail, a page the prototype does not have.
- **Second critique, three findings closed:** the download lab has one Primary, *Download all*, and Secondary
  rows (PR 74); a completed Activity reads *Open activity again*, Secondary (PR 75); with larger touch targets on,
  the podcast slider is 44 px high and the video seek bar has a 44 px hit area on an 8 px track (PR 75).
- **Still open from that critique:** 32 px targets on the player top bar on tablet and 24 px Dashboard links
  (larger targets default on at 767 px and below only): a decision, not a fix.

## 2026-10-08 (night) · Content search (feature 33): the learner's experience, eight screens

Asked by the dev team. New section `Content search (feature 33) — sources (in progress)` (`6837:27914`) on the WIP
page. Metadata map §39.

- **Checked first in the Open edX source (Sumac):** the search runs on submit, 20 results a page, each with its
  type, title, an excerpt with the matches marked, its location and a link; totals and the number of results the
  learner cannot open come with the page. No suggestions, no recent searches.
- **Nelson's two decisions:** the search runs only on submit; results open in a popup under the field, full
  screen on mobile.
- **Screens:** typing, searching, results, results filtered by type, no results, error (desktop), and typing and
  results on mobile. Built from the Course Detail screens with DS components, text styles and tokens.
- **Open:** the type names, whether search is on in SkillUp's environment, DS components for the popup and the
  result row, the handoff frame.

## 2026-10-08 (night) · Course-Header backgrounds, ready to export two ways

Asked by Komal (dev team). New frame `Platform Pages - Course-Header backgrounds - Export` (`6831:22084`) on
*Platform Pages - Ready for Dev*, right of the Program Page frame, under a WIP banner. Metadata map §38.

- **A · one image per device:** six backgrounds with the two circles in them (Course and Program × desktop,
  tablet, mobile), each exporting as SVG, PNG 1x and 2x.
- **B · pieces apart:** the colour from its token, the two circles as eight small SVG files (two sizes each,
  light and dark), and a table of sizes and offsets per device. One set of pieces serves every width.
- Built from the DS header variants with their content removed: same layers, tokens and opacities. The SVG
  export was checked on four assets (sizes, one colour each, opacity in the file).
- No named version before it: the desktop plugin was not connected. The frame only adds.

## 2026-10-08 (night) · DS: `Program-Card` without the cohort, week and lesson counters

Two named versions first. On Nelson's go-ahead for each step. **Not published yet.**

- **Properties deleted:** `Week`, `Lessons` and `Show cohort` on `LMS/Platform/My-Learning/Program-Card`
  (`22009:22808`). The set keeps `Title`, `Eyebrow`, `Courses`, `Percent`, `Up next`, `Layout`, `State`; every
  remaining property is used by a layer, so the set publishes.
- **Layers removed:** the 12 hidden layers those properties drove — the `Cohort` badge and the `Week` and
  `Lessons` texts in each of the four variants. `Tags` holds the delivery badge alone, `Stats` the courses line
  alone.
- **Read back:** visible texts and sizes of the four variants unchanged (473 × 370, 473 × 366, 1 200 × 280 twice);
  the render is the same before and after. The description says what was removed and why.
- **Why:** nothing in Open edX backs a cohort, a week counter or a lesson counter for a program (§37), and none of
  the 16 instances in the product file showed them.
- **After the publish:** accept `Program-Card` in the product file (reload the tab first if Updates does not
  offer it). The 16 instances should keep their texts and sizes: 384 × 370 · 384 × 404 · 1 200 × 280 ×2 ·
  438 × 354 · 438 × 350 · 327 × 340 · 327 × 348, on the sources and on the handoff copies alike.
- **Confirmed after Nelson's publish, the same night** (server read; the desktop bridge was not connected): the
  16 instances are on the library's current version, 16 of 16 with the recorded size and visible texts; their
  properties are `Title`, `Eyebrow`, `Courses`, `Percent`, `Up next`, `Layout`, `State`; none carries a `Cohort`,
  `Week` or `Lessons` layer. 0 visible *Label* texts on the two WIP sections and the two handoff frames. Behind
  the library: `Input field` ×8 only.
- **Left as it is:** one `Percent` default (*14%*) serves both states, so a fresh *Not started* card reads 14 %
  until it is set. A text property has one default per set.

## 2026-10-08 (night) · Platform pages: what is left after the covers, measured

Mostly read-only; one text changed in Figma after a named version.

- **Handoff header, My Learning & Dashboard:** the line on what it costs listed *streak* among the learner data
  to confirm. The streak card left the screens on 7 Oct; the word is gone. The other handoff texts of the two
  platform frames were read for things the Open edX pass removed (streak, cohort, live session, mentor, time left,
  *You left off*): only dated changelog entries mention them, as history.
- **Screens after the row and header changes:** every screen copy in the two handoff frames is an auto-layout
  frame whose content ends at its own height (tablet Program screens keep their 48 bottom padding); no gap, no
  overflow.
- **`Program-Card`, measured for the decision in §37.6 item 4:** 16 instances in the product file (8 sources,
  8 handoff copies); `Show cohort` is off on all 16 and neither `Week` nor `Lessons` is visible on any. The three
  properties are unused. Removing them is a DS change, waiting for Nelson.
- **Kit badges (457 reading *Label* in the DS), still without a source.** Two sources tried: the September clone
  of the DS (`…OptionC-Material`) does not have the *Application navigation*, *Tables* or *Card headers* pages,
  and the file's version history needs a REST token, which has expired (401). What unblocks it: a duplicate of a
  DS version from before 7 Oct, or a renewed token; both are Nelson's.

## 2026-10-08 (night) · Six loose ends: DS labels and links, prototype type names, quizzes, second critique

Decided by Nelson on 8 Oct ("yes to all").

- **`LMS / Course Card_Remove`:** nothing to delete. No component of that name is left in the DS file (every page
  read); the five instances on the archived screen point to a component that is already gone.
- **`LMS / Course Type Badge` labels (DS, not published):** *COURSE* and *PROGRAM* on `body-small/Semibold`.
  Both variants go from 16 to 18 high (73 × 18, 86 × 18). Named version first.
- **Documentation links (DS, not published):** all 82 components on `❖ LMS COMPONENTS ✅` had none. Each now
  links to the handoff document for its family: 53 to `components-inventory.md`, 21 quiz, ORA and drag-and-drop
  components to `quizzes/09-handoff-map.md`, 8 reading-content components to `reading-screen-matrix.md`.
  A link per family, not per component section.
- **Prototype PR 71 (open):** quizzes count towards the course being complete. PR 70 had left them out on the
  wrong assumption that the prototype cannot complete a quiz; submitting one does.
- **Prototype PR 72 (open):** the type classes carry the DS text-style names (`sk-text-body-large-semibold`
  instead of `sk-text-md-semibold`): 748 occurrences in 121 files, no size changed, 528 elements read back at
  the size of their DS style on five pages.
- **Second critique, measured:** Lab, Activity, Podcast, VILT live and VILT recording at 1280 and 375, light and
  dark: no contrast failure, one `h1`, no unnamed control, no horizontal scroll. Tablet (834) on video,
  Dashboard, My Learning and Program: no horizontal scroll.
- **Second critique, findings (not fixed):** a completed Activity still offers a primary *Start activity* next
  to *Go to next Module*; the Lab shows three primary *Download* buttons at once; the podcast seek bar is 16 px
  high on mobile and the recording's 24; on tablet the player top bar keeps 32 px targets and the Dashboard has
  24 px links; the prototype Dashboard still shows the streak and the glance figures that the Figma screens
  dropped on 7 Oct when they were cut back to what Open edX serves.
- **After the publish and the accepted update, read back:** 0 visible badges read *Label* on Video (212),
  Quizzes (483), Reading (78), Platform Ready for Dev (425) and V8 WIP (498). The 65 `Course Type Badge`
  instances on Ready for Dev are 18 high on `body-small/Semibold`. PRs 71 and 72 merged.
- **Side effect of the taller badge:** every grid course card grew 2 px: 384 × 360, 438 × 352, 327 × 340 (368
  with a three-line title). Prototype PR 73 (open) follows: full DS padding with the border added, measured at
  the same three sizes.

## 2026-10-08 (late) · My Learning: the 40 covers on the card's Image layer; why the update had not come in

Named version first: *Before the My Learning covers move to the card's Image layer*.

- **The Course Card update is in.** After Nelson reloaded the product file's tab and accepted again, the 40
  My Learning cards (20 sources, 20 handoff copies) are on the current `LMS / Course Card`, read the same from the
  server and from the desktop app. The effort lines came through the update unchanged (layer now `Effort`).
- **Covers moved.** On the 40 cards: `Show image` on, the cover on the `Image` layer, the thumbnail back on
  `bg/primary-soft`, the initials visible underneath as the fallback. Texts and card sizes compared before and
  after: no difference. Thumbnail 86 × 86 on Grid, 118 × 118 on List. With the 42 of the Program page, all 82
  course thumbnails now use the card's image option. Library request 26 closed.
- **Behind the library now:** only `Input field` ×8 and `Button group` ×8 (Untitled UI kit, no visible
  difference). The seven platform components listed earlier came in with the same accepted update. 0 visible
  *Label* texts on the two WIP sections and the My Learning handoff frame.
- **Correction to the entry below — the cause was not the page filter.** The product file's tab had been open
  since before the morning publish and still held the old library state: asked for the library's Course Card, the
  desktop app returned the old copy, so its Updates list had nothing to offer and *Update all* did nothing for
  those components. A reload of the tab fixed it. Trap 42 has the check.

## 2026-10-08 (evening) · After the publish: the Program headers are in; the Course Card is still not

Read only; nothing written to Figma in this pass.

- **Program header, closed.** The 24 headers (12 sources, 12 handoff copies; Desktop, Tablet, Mobile) are on the
  library's current version: background `bg/subtle`, 18,34,40, semantics resolved to dark, sizes unchanged
  (1 280 × 352, 960 × 321, 375 × 525). Checked by eye on tablet and mobile. 0 visible *Label* texts in the two WIP
  platform sections and the two handoff frames.
- **`LMS / Course Card`, still the previous version in this file**, in the server read and in Nelson's desktop
  app alike: the 40 My Learning cards point to a copy with `Layout` only (no `Show image`, layer `Time-Left`),
  while the cards nested in the program rows are on the current one. The covers stay on the thumbnail fill.
- **Still behind the library** (direct instances, two WIP platform sections): `Dashboard/Stat` ×24,
  `LMS / Course Card` ×20, `Input field` ×8, `Button group` ×8, `Program-Card` ×8, `Due-Item` ×6,
  `LMS / Course Row` ×6, `Today-at-a-glance` ×3, `Resume-Row` ×3. `Course-Header` left the list. All are
  published in the DS (`CURRENT`).
- **Likely why, from Figma's own help page** (*Review and accept library updates*): the Updates tab lists the
  assets of the **current page** unless *Show updates for all pages* is on, and *Update selected instance*
  updates one instance. Either leaves other components, or other instances, on the old version after an update
  was accepted. Not verified on Nelson's screen. To take everything: Libraries → Updates → *Show updates for all
  pages* → *Update all*.

## 2026-10-08 (late night) · Lab screens on `LMS / Lab · Launch Card`

After Nelson's publish and accepted update. [Library request 27](library-requests.md) is closed.

- **32 stand-ins swapped** for the DS component: 8 discovery sources and 24 handoff cards (desktop, tablet,
  mobile). No SCORM Frame is left on a Lab screen. States: Ready 12, Opened 8, Completed 8, Unavailable 4.
- **What the learner now sees that the stand-in did not show:** the partner's name on the card (Google Cloud or
  Microsoft), a success icon when the lab is complete, and two stacked buttons on a phone when the frame is refused.
- **Heights:** the card hugs its content, so each screen is a little shorter than before; frames, home indicators
  and backdrops were read back and fit.
- Still sketches: the inline frame and the modal of the Embedded rows.

## 2026-10-08 (late night) · DS: `LMS / Lab · Launch Card`

Asked by Nelson. **Not published yet.** Details in [library request 27](library-requests.md).

- **New component set** `LMS / Lab · Launch Card` (`22251:6427`) in the DS, *Group · Lab*: the card that opens a
  lab on a partner's platform. `State` = Ready · Opened · Completed · Unavailable, and a `Show provider` boolean.
  It carries the nested Provider-Partner Badge, a success icon when completed, and DS Buttons that wrap on a phone.
- **On existing tokens and styles only** (the SCORM Frame's: `bg/subtle`, `border/subtle`, `Radius/fixed-xl`,
  `Spacing/md`, `Spacing/5xl`, `body-large/Bold`, `body-medium/Regular`); no new token.
- **The Lab screens still hold the stand-in** (`LMS / Activity · SCORM Frame`). They change after the publish.

## 2026-10-08 (late night) · Lab on third-party platforms: tablet and mobile

Asked by Nelson on 8 Oct. Page `↳ Lab · Third-party platforms - Ready for Review 🟠` (`6789:325`).

- **22 new cards:** the eleven screens at 960 and at 375, in rows under each partner's desktop row
  (`Row n.2 · … · Tablet`, `Row n.3 · … · Mobile`; cards `G1.2`, `G1.3`, …). 33 cards in all. Built from the
  Reading tablet and mobile cards and, for IBM, from the Course Detail tablet and mobile screens.
- **Google on tablet and mobile:** a warning, *This lab needs a computer*, above the launch on the four screens
  where the lab has not been opened yet. Source: Google's *Supported devices and browsers* help page (phones and
  tablets not recommended; Cloud console labs might not work on them).
- **Mobile adjustments:** the LTI modal at 80% of the window with *Open in a new tab* as an icon button; *Skip* as
  the second button of the refused-frame state; the IBM dialog on the mobile layout of the DS modal.
- **Tab bar removed on all screens**, desktop cards and discovery sources included: it held one tab,
  *Instructions*, and the one-option rule hides it (17 Sep). The Reading divider takes its place.
- **Status tag reads *In review*** on the 33 cards (it read *Ready for review*, which is cut on mobile cards).
- Not changed: the stand-ins (launch card, inline frame, modal) and the five open questions.

## 2026-10-08 (night) · Lab on third-party platforms: handoff page, ready for review

Asked by Nelson on 8 Oct.

- **New page** in *LMS ICP Phase 1*: `↳ Lab · Third-party platforms - Ready for Review 🟠` (`6789:325`), placed after
  *Topic Content Types Discovery*. One frame, the header block and eleven cards in four rows (Google, Microsoft,
  embedded alternatives, IBM), built from the Reading page's card.
- **The nine topic screens are now full course-player screens** (1 440 wide): top bar, sidebar with the lab as the
  current topic (type *Lab*, a course outline that matches the partner), content and footer navigation. Their
  content is a copy of the discovery screens; padding and gap are bound to `Spacing/lg` and `Spacing/xl`, as on
  the Reading screens. On E2 the backdrop covers the whole player and the modal is 80% of the window.
- **The two IBM cards** hold the Course Detail header screens as they were.
- **Status tag:** *Ready for review* on all eleven. It is the kit's *In progress* tag with its text changed; the
  kit has no review tag.
- **Still desktop only**, still a first pass: the launch card is the SCORM Frame as a stand-in, the inline frame
  and the modal are local sketches, and the five questions to the content team are open.

## 2026-10-08 · Lab on third-party platforms (Google, Microsoft, IBM): first pass

From the content team's messages of 8 Oct (Kirti Mishra, Simran Jindal). Discovery only; the answers asked for
are pending. Full write-up: [`lab-third-party-platforms.md`](lab-third-party-platforms.md).

- **Embedding checked on the response headers:** `learn.microsoft.com`, `skills.google` (pages and a lab page),
  `console.cloud.google.com` and the IBM SkillsBuild sign-in pages all refuse to be framed by another site
  (`X-Frame-Options: SAMEORIGIN` or `DENY`). The Google LTI launch address itself was not testable.
- **Open edX already offers Inline, Modal and New Window** on the LTI component (*Open tool in*); a Studio test on
  one Google lab settles whether Google accepts the first two.
- **Completion, read in `openedx/completion`:** a graded LTI component completes only when the tool sends a score
  back; a Text component completes 5 s after it is viewed. So Google can complete by itself and Microsoft cannot.
- **Figma:** new section `05b · Lab — third-party platforms` (`6776:8711`) on *Topic Content Types Discovery*,
  eleven desktop screens in four rows (Google, Microsoft, embedded alternatives, IBM). The launch card is the
  SCORM Frame as a stand-in; the inline frame and the modal are local sketches.
- **Not done:** tablet and mobile, the score-never-arrives case, the meeting recordings (transcripts are not
  readable through Microsoft Graph for this organisation).

## 2026-10-08 (evening) · DS: the Program header matches Desktop on Tablet and Mobile

Two named versions first. On Nelson's go-ahead for each change. **Not published yet.**

- **Background:** `Course-Header` · `Kind=Program` on Tablet (`22219:3301`) and Mobile (`22219:3961`) is bound to
  `bg/subtle`, as the Desktop Program variant is (it was `bg/primary-soft`, kept from the Course variant). Read
  back in the variants' dark mode: 18,34,40 on all three; sizes unchanged (960 × 321, 375 × 546).
- **Partner logos:** the two placeholder logos take the paints Desktop has: the Microsoft wordmark white
  (it was grey 115), the 38 IBM vectors on `icon/on-media` (they were a raw blue). 39 paints per variant, matched
  to Desktop one to one by position and layer name. The Microsoft wordmark is a raw white on all three variants.
- **How the gap was found, and that nothing else is left:** the Course and Program variants were compared layer by
  layer on each breakpoint (fills with raw colours, strokes, text styles, effects, modes, layout values, sizes,
  nested variant and text properties; about 335 layers each). After the two changes the differences are the same
  set on Desktop, Tablet and Mobile. When the variants were built on 8 Oct the differences had been listed by eye:
  five found, these two missed.
- **After the publish:** accept `Course-Header` in the product file's Libraries → Updates. The 16 tablet and mobile
  headers do not override the background, so they follow; the partner chips are hidden on the Program screens.

## 2026-10-08 (evening) · DS clean-up, Program icon closed, prototype course-complete gate

Decided by Nelson on 8 Oct.

- **DS, named version first, not published:** the footer set named `LMS` (`20053:3286`) renamed
  `LMS / Topic Footer Nav`; its key is unchanged, so instances keep their link and show the new name after the
  update. `_Remove · LMS / Quiz · Results Summary` and `_Remove · LMS / Quiz · Score Ring` deleted: both
  unpublished, the Score Ring used only inside the Results Summary (4 instances), and no instance of either in
  the product file (36 pages read).
- **`LMS / Course Card_Remove`, survey only:** 5 instances in the product file, all on the older screen
  *My Learning - Courses - List View* (V8 WIP, *1 · Core Learning Journey - LMS DS*). Nothing deleted. To
  retire it: rebuild that screen on `LMS / Course Card · Layout=List`, or archive the screen.
- **Program icon:** accepted as published, back card faint in SKO Light. The open question left the ICP Hub
  (version 13), with a decision entry.
- **Prototype:** PR 69 (merged) fixed a regression of PR 68: on a last topic that cannot be completed, *Next*
  stayed disabled and the course-complete dialog could not be reached. PR 70 (open): the dialog opens only when
  every topic the learner can finish in the prototype is finished; locked topics, unavailable types, VILT and
  quizzes are left out of the count.
- **After the publish and the accepted update, read back:** 0 visible badges read *Label* on Video (212),
  Quizzes (483), Reading (78), Platform Ready for Dev (425) and V8 WIP (498). The footer instances carry the new
  name `LMS / Topic Footer Nav`: 33 on Video, 66 on Quizzes, 20 on Reading, 2 on WIP. Video tabs read
  *Transcript · Notes 2 · Downloads 4*; grids P S S S S and rows P S S. PR 70 merged.
- **Old screen archived in place (Nelson, 8 Oct):** the frame `6207:250057` on V8 WIP, section *1 · Core
  Learning Journey - LMS DS*, is now named *My Learning - Courses - List View — archived (uses LMS / Course
  Card_Remove)*, like its superseded neighbour. Named version first. Position, size and content unchanged; its
  five `LMS / Course Card_Remove` instances are the last uses of that card in the product file.

## 2026-10-08 · Screens: the 28 compact course rows on the DS row; the local component is gone

Named version first: *Before the compact course rows move to the DS variant*. After Nelson's second publish.

- **The 28 compact rows** (tablet and mobile Courses, sources and handoff copies) are the DS `Course-Row` on
  `Breakpoint=Compact`. Texts compared before and after each swap: no difference. *Position*, *Detail* and the
  effort line were set again after the swap (trap 44). Covers sit on the card's `Image` layer. The mobile expanded
  row went from 962 to 942 high: the detail fits one line in the DS variant.
- **The local `Course-Row-Compact` is removed** (`6665:4206` and its section `6664:7091`), after two counts found
  0 instances.
- **Program Page handoff frame:** 12 texts updated. Below desktop the header is the Program variant and the rows
  are the DS compact row; no library request is quoted as open there any more.
- **Read back after the pass**, sources and handoff copies: 42 program rows on the DS component (14 Desktop,
  28 Compact), 42 covers on `Image` with `Show image` on; 0 badges read *Label* on the two WIP platform sections
  (121 and 131 badges) and 0 visible *Label* texts in the two handoff frames.
- ⚠︎ **Correction to the entry below — the 16 tablet and mobile Program headers were rendering light.** Clearing
  the dark mode on the instance did not hand it back to the variant: it left an empty mode override, which
  cancelled the variant's own dark mode (trap 45). Nobody had looked at the render. Named version first (*Before
  the tablet and mobile Program headers get their dark mode back*), then each instance was given the two modes its
  variant carries. Read back on all 16: semantics resolve to dark (`19547:2`), background 15,44,56, same texts,
  same sizes (960 × 321, 375 × 525). The mode still counts as an override on the instance.
- **Found while checking, not changed:** the Program header's background is `bg/subtle` on Desktop and
  `bg/primary-soft` on Tablet and Mobile (18,34,40 against 15,44,56 in dark). The two variants built on 8 Oct kept
  the Course variant's token; a sixth difference missed then. A one-token change in the DS, waiting for Nelson.
- ⚠︎ **Correction to the entry below — the 40 My Learning cards did not keep the new Course Card.** They had been
  moved by script to the published copy of the same component and fell back to the version this file holds
  (trap 42), losing `Show image` and the cover with it. Their covers are back as a fill on the thumbnail with the
  initials hidden (the 7 Oct state), and the completed course's effort line was set to *8 hours total* by hand
  (8 instances). They move to the `Image` layer once this file accepts the Course Card update in
  Libraries → Updates.
- **Still behind the library in this file** (direct instances in the two WIP platform sections whose main
  component is not the copy the library returns, read 8 Oct): `Dashboard/Stat` ×24, `LMS / Course Card` ×20,
  `Input field` ×8, `Program-Card` ×8, `Due-Item` ×6, `LMS / Course Row` ×6, `Course-Header` ×4,
  `Today-at-a-glance` ×3, `Resume-Row` ×3. Only accepting them in the Libraries panel brings them in.

## 2026-10-08 · Screens: covers on the card's Image layer, Program header below desktop, rows on the published version

Named version first: *Before the screens pass: covers on the Image layer, Program header and DS compact row*.

> **Corrected the same day (entry above):** the 40 My Learning cards fell back to the previous Course Card; their
> covers are on the thumbnail fill again. The 16 headers stayed on `Kind=Program` but rendered light until their
> mode was set again. The 14 desktop program rows held.

- The published DS was not in the product file's instances yet, so each instance was moved to the copy the
  library returns, with its texts compared before and after (a difference rolls the call back).
- **Covers:** on the 40 My Learning cards and the 14 desktop program rows (sources and handoff copies),
  `Show image` is on, the cover sits on the `Image` layer, and the thumbnail is back on its token. The effort line
  was restored where the swap dropped it (trap 44).
- **Program header:** the 16 tablet and mobile screens (8 sources, 8 handoff copies) use `Kind=Program`; the dark
  mode set on the instance is gone. Same texts, same sizes.
- **Desktop program rows** read *Flexible Learning* (the new default) instead of *Flexible + Live*.
- **Not done yet: the 28 compact rows.** The Compact variants built in the DS had lost their property links when
  cloned (trap 43): *Position*, *Detail* and the *Modules* slot did not follow the properties. Fixed in the DS;
  **it needs one more publish**, then the rows are swapped and the local component removed.

## 2026-10-08 · DS: Program header below desktop, compact course row

Named version first. On Nelson's go-ahead. **Not published yet.**

- **`Course-Header`**: `Kind=Program` now exists on Tablet and Mobile as well as Desktop (library request 19).
- **`Program-Detail/Course-Row`**: new property `Breakpoint` = Desktop · Compact (library request 20). The Compact
  variants match the local `Course-Row-Compact` in size (400 × 425, 400 × 886) and content. All four variants
  default to *Flexible Learning*.
- **After the publish**, on the screens: the tablet and mobile Program screens take the Program header and the DS
  compact row, the local component goes, and the 63 course covers move to the card's new `Image` layer.
- **Kit badges not repaired.** Their original texts are not on record. A duplicate of a DS version from before
  7 Oct would give them, node by node.

## 2026-10-08 · DS: defaults on what Open edX serves; an image option on the Course Card

Named versions first. On Nelson's go-ahead. **Nothing here is published yet.**

- **Defaults moved to what the screens show since the edX pass** (§37.6, item 4):
  - `Today-at-a-glance`: *Your learning at a glance* · Courses in progress 3 · Courses completed 1 ·
    Certificates 1 · Programs 2, in both variants.
  - `Stat`: *In progress* · 3 · *courses*.
  - `Due-Item`: an assignment deadline (*Persona research draft (Peer Assessment)*, *Tonight*); Today reads
    *Due 11:59* on Warning, without the dot, instead of *Live*.
  - `Program-Card`: *Program · 7 courses*, *1 of 7 courses complete*, 14 % with the bar at 10 %, *Course 2 ·
    SEO & Organic Search*, *Flexible Learning*; `Show cohort` off, `Week` and `Lessons` hidden.
  - `Jump-Tile`: *12 unread updates in your courses*. `Resume-Row` and `LMS / Course Row`: *Flexible Learning*.
  - `LMS / Course Card`: the line that read *3h 20m left* reads *8 hours total* (layer `Effort`).
  - `Streak-Card`: not changed; its description says nothing in Open edX backs it.
- **`LMS / Course Card` takes an image**: a new boolean `Show image` shows an `Image` layer over the initials, in
  both variants. Library request 26.
- **This morning the badges read *Label* again and were back to 0 a minute later** (all platform frames, read in
  the desktop app at 08:05 and 08:08 UTC). `Badge v2` was rebuilt in the library a second time; the entry below,
  from the other session, has the cause. Traps 41 and 42 added to `figma-api-traps.md`.

## 2026-10-08 (later) · After another publish: badges read *Label* again in the product file

- Recount after Nelson published the DS and accepted the update. Visible `Badge v2` reading *Label*: Video 153
  of 212, Quizzes 474 of 483, Reading 76 of 78, Platform Ready for Dev 105 of 425, V8 WIP 150 of 498. The count
  was 0 on all five earlier the same day. Read twice from the server session and once from the desktop app
  (Reading: 76 of 78 in both).
- **Where:** inside the wrappers: `LMS / Topic-Types Badge`, `LMS / Provider-Partner Badge`,
  `LMS / Delivery Mode Badge`, `LMS / Difficulty Badge`, the three quiz sets, `Message`, `Due-Item`,
  `Program-Card`. The product file's own copies of those wrappers (new node ids `6735:…`) read *Label* in their
  main component.
- **DS side:** the same wrappers read right (*Video*, *IBM*, *Flexible Learning*…), all `CURRENT`. `Badge v2` has
  been rebuilt since the last good state: 540 variants, a new `Icon Only` variant property, property ids
  `#22100:…`, default text *Label*. The wrappers set the text through that property. So the file is again
  holding a `Badge v2` and wrappers that do not match.
- **Not caused by this session's DS writes** (tab count default, certificate, Course Card thumbnail, Program
  icon): none of them touches a wrapper or `Badge v2`.
- **What did arrive:** tab counts read *2*, *4* and *5*; the Program icon is on the three opaque tokens on Ready
  for Dev (12 of 12) and on 12 of 17 on WIP (5 still raw); grids read P S S S S and rows P S S.
- Nothing patched in the screens. Accepting the update is Nelson's click; if the panel offers nothing, the
  wrappers need to be touched in the DS and published again.
- **After Nelson accepted everything in Libraries → Updates:** 0 visible badges read *Label* on all five pages
  (212, 483, 78, 425, 498). Video tabs read *Transcript · Notes 2 · Downloads 4* on the 29 bars. The Program icon
  is on the three tokens on Ready for Dev (12 of 12); on WIP 5 of 17 are still raw. The first acceptance had
  been partial; nothing was changed in the screens between the two counts.
- **The five raw Program icons on WIP, located:** all inside `LMS / Course Card_Remove`, the DS card marked for
  removal, on the older screen *My Learning - Courses - List View* under *1 · Core Learning Journey - LMS DS*.
  That card still bundles an older copy of `LMS / Course Type Badge`, so its badges keep the original blues
  (#b2c7f2, #80a1e5, #4078d9, back to front). They go when the `_Remove` card is retired or the screen is
  rebuilt on `LMS / Course Card`; nothing to fix in the badge itself.

## 2026-10-08 · Dashboard: the glance card is four in a line on desktop and tablet

Named version first: *Before fitting the glance card height on the Dashboards*.

- **Confirmed after Nelson's publish and update**, from the desktop app and from the server: the six glance cards
  are instances of `Today-at-a-glance` with `Title` and `Breakpoint` only. Desktop variant at 1 280 and 960,
  Mobile at 375; the four totals unchanged.
- **Height fitted on four screens** (desktop and tablet, sources and handoff copies): the instances had kept the
  old card's fixed height and left an empty band under the stats. They now hug: 168 px on desktop, 160 on tablet.
  The handoff screens are 955 and 1 110 px high.
- The two Dashboard handoff cards (desktop, tablet) have a changelog entry dated 2026-10-08.

## 2026-10-08 · Tab count default, prototype sample and labels, Course Type Badge render

Decided by Nelson on 8 Oct.

- **DS, `_Tab button base` (not published):** the count badge read *Label* by default in all 72 variants; it now
  reads *2*. Named version first. A screen that does not set the count no longer shows *Label*.
- **Prototype PR 68 (open):** the practice quiz sample *Quick check* is no longer completed; Video reads
  *Completed* like Quiz, ORA and VILT; the footer shows *MODULE COMPLETED · Go to next Module* only once the last
  topic of a module is done, and on an unfinished last topic of the course *Next* is disabled. The last point
  was a defect the sample change uncovered: the milestone was decided by position alone.
- **`LMS / Course Type Badge`, rendered at 8×** from a temporary copy (removed): the Course icon reads as a dark
  card with three light lines. The Program icon reads as one flat teal shape: the three stacked cards are the
  same solid colour, so the opacity steps set on 7 Oct do not show. Shown to Nelson; no change made.
- **Program icon redone (DS, not published), on Nelson's request:** the three stacked cards sit on three opaque
  tokens, back to front `bg/primary-soft`, `border/primary-soft`, `icon/primary`. Named version first. Rendered at
  8× in SKO Light, SKO Dark, Gold Light and Red Light from a temporary frame (removed): the stack reads in all
  four; in SKO Light the back card is faint (#ebf8ff on white). Two of the three tokens are a background and a
  border token used on an icon shape: no icon token exists in those lightness steps.

## 2026-10-08 · DS: the glance card keeps one variant property

Named version first: *Before removing the stray variant properties of Today-at-a-glance*. On Nelson's go-ahead.

- `LMS/Platform/Dashboard/Today-at-a-glance`: the variants are now `Breakpoint=Desktop` and `Breakpoint=Mobile`.
  `Property 1`, `Property 2` and `Property 3`, left by the old slash name when the variants were combined, are
  gone. Keys and sizes unchanged, so instances keep their link. Library request 24.
- **Needs a DS publish**, then the update accepted in the product file. The Dashboard at 1 280 and 960 is still
  waiting for the Desktop variant from the earlier publish.

## 2026-10-08 · Program Page: the handoff frame, in progress

Named version first: *Before Program Page handoff frame*.

- **`Platform Pages - Program Page - Light`** (`6728:15050`) on *Platform Pages - Ready for Dev*, under a WIP
  banner: twelve cards, Courses · Certificates · FAQs · About on desktop, tablet and mobile. Every card is
  `Status/In progress`; only Nelson marks it ready.
- The screens are copies of the twelve sources on the WIP page, same sizes, 0 annotations in the frame. Each card
  has its description and a first changelog entry dated 2026-10-08.
- What still stands between this frame and *Ready for DEV* is listed in the metadata map, §35.8: the source of
  the program's data and its certificate, the marketing-only content, navigation, and the two stand-ins below
  desktop.

## 2026-10-08 · Three decisions applied: certificate, Course Card thumbnail, first grid card

Decided by Nelson on 8 Oct. Named versions first, in both files.

- **Certificate without time learned (DS, not published):** the *4h 22m · Time* stat removed from
  `LMS / Course Certificate`. The row reads *3 Modules · 11 Topics · 96% Avg quiz*; the component stays 720 × 524.
  Open edX keeps no time-learned figure. The prototype dropped it in PR 67.
- **Course Card thumbnail fixed (DS, not published):** in `Layout=Grid` the thumbnail was locked 1:1 and filled
  the header height, so it was 98 px beside a two-line title and 128 px beside a three-line one. It is now a fixed
  86 × 86. The card stays 380 × 358; the title column gains 12 px (216 → 228). `Layout=List` not changed.
- **First grid card primary (screens):** in the three My Learning grids on Ready for Dev and the three on V8 WIP
  (desktop, tablet, mobile), the first card's *Resume* is Primary and the rest stay Secondary
  (*Resume · Resume · Resume · Review · Start* → P S S S S). No card changed size. The prototype already did this.
- The three certificate screens on *Completion + Certificate* and the course cards on the platform pages show the
  DS changes only after the library is published and the update accepted in the product file.
- **After the publish and the accepted update (8 Oct), read back:** no visible badge reads *Label* on Video
  (212), Quizzes (483), Reading (78), Platform Ready for Dev (425) or V8 WIP (498); the 29 tab bars on Video read
  *Transcript · Notes 2 · Downloads 4*. The three certificate screens read *Modules · Topics · Avg quiz*. Every
  grid course card has an 86 × 86 thumbnail; the cards are 384 × 358, 438 × 350 and 327 × 338 (366 with a
  three-line title), which are the prototype's sizes at the three breakpoints, the mobile one included. Grids
  read P S S S S and course-row lists P S S on both platform pages. Two copies of `Badge v2` and of
  `_Tab button base` are still in use on Video.

## 2026-10-07 · After Nelson accepted the library update: badges recounted on the Ready for Dev pages

- Read with the server session, twice on Video. Visible `Badge v2` reading *Label*: Quizzes 0 of 483, Reading
  0 of 78, Platform Ready for Dev 0 of 294, Video 46 of 212. Before the update was accepted the same count was
  483, 76, 127 and 199.
- **Video, the 46:** all in tabs, on the count next to *Notes* and *Downloads* (23 each). The new
  `_Tab button base` has *Label* as the default text of its count badge, and the screens' counts did not survive
  as overrides. Restored after a named version (*Before restoring tab counts on Video*): *Notes 2*,
  *Downloads 4*, set as the badge's text property. Read back: 0 of 212 read *Label*; tabs are 81 and 123 wide
  again (they had grown to 108 and 148).
- **For the DS:** a count badge that defaults to *Label* will show *Label* wherever a screen does not set it.
  The default should be a number.
- Still two copies of `Badge v2` and of `_Tab button base` in use on Video and on Platform Ready for Dev
  (five of the tab base on Platform): the update is in for the wrappers, not for every copy.
- **The other pages, 8 Oct:** Topic Content Types Discovery 0 of 108, Overlay Panels 0 of 33, Completion +
  Certificate has no badge. Platform V8 WIP had 4 of 498, the same tab counts on two video screens under *Core
  Learning Journey*; restored to *Notes 2* and *Downloads 4* after a named version (*Before restoring tab counts
  on Platform V8 WIP*). Read back: 0 of 498. More than one copy in use on WIP: six of `_Tab button base`, two
  each of `Badge v2` and of the Topic-Types, Provider-Partner, Delivery Mode, Difficulty and Course Type badges.

## 2026-10-07 · The badge defect is closed: no badge reads *Label* on any working page

- **The library update is in the product file**: Nelson accepted it in Libraries → Updates. 0 badges read *Label*
  on Platform Pages (Ready for Dev 286, WIP 434), Video 200, Quizzes 483, Reading 78, Overlay Panels 33 and Topic
  Content Types 106 — counted in the desktop app, visible badges with their label on. The entry below, from the
  other session, has the same result from the server for the four Ready for Dev pages and the Video tab counts
  it restored. Library request 21 has the table.
- **Screen texts restored on the ICP pages** (named version first): *5 questions* on the nine quiz entry headers,
  the four tags on the saved notes, *Notes 2* / *Downloads 4* on the video template.
- **Counted, not recovered:** the tab counts of the Notifications panel (*All* 5 · *Discussions* 1 · *Grading* 2 ·
  *Updates* 2) and of the Saved panel (*All* 5 · *Topics* 3 · *Notes* 2), from the items each panel shows. To
  confirm.
- **Still pending:** the glance card's Desktop variant has not reached the Dashboard (old 2 × 2 at 1 280 and 960).

## 2026-10-07 · Platform screens: course covers, short course-row copy, DS writes — and the badges still read *Label*

Named versions first, in both files.

- **Badges: not fixed.** 127 of 286 visible badges read *Label* on Ready for Dev and 199 of 434 on the WIP page.
  Moving the instances by script to the copy the library publishes worked for about twenty minutes (0 *Label* in
  read-back and renders) and then fell back: a swap does not change the version the file has accepted. **The
  update has to be accepted in Libraries → Updates.** The texts set on instances (*Due 11:59*, the *15%* pill,
  dates, tab counts) did hold. Library request 21.
- **Course covers on 63 thumbnails** (My Learning, Program Detail): placeholder images from the public SkillUp
  catalog, as fill overrides. Request 26 asks for an image option on the card.
- **DS, on Nelson's go-ahead:** the *You left off here* badge is out of `Course-Row` (request 23), the top bar's
  *Calendar* counts 3 again (request 22), and `Course-Row` reads *Module 2 of 4* + module name with *Show* /
  *Hide*, as the compact row does. The first two are published; the last needs a publish.
- **Nelson's own changes, followed on the screens:** the compact course row's short bar copy and full-width
  button — the in-progress row has the new copy on desktop, tablet and mobile; the glance card's Desktop (four in
  a line) and Mobile (2 × 2) variants — the mobile source screen now uses Mobile.
- **The *Navigation is not final* note** is on the `Topbar` main component, on the local sidebar set and on one
  screen (*Dashboard · Desktop*, Ready for Dev); 71 copies removed. Request 25 states the rule.
- **Open:** the library update (above); the glance card's stray variant properties (request 24); `topics-done` on
  the compact row is linked to nothing.

## 2026-10-07 · Platform screens: badge texts restored where the update has landed; one badge removed

Named version first: *Before badge texts pass on platform screens*.

- **The DS is published; the product file took the update for five sets only** (`Topbar-Item`, `Date-Row`,
  `Thread-Row`, `Sidebar-Card`, `Program-Detail/Course-Row`). The delivery, difficulty, topic-type, provider and
  course-type badges, `Quiz · Grade Summary`, `Message`, `Due-Item` and `Program-Card` still read *Label*: 255 of
  434 visible badges on the WIP page, 157 of 286 on Ready for Dev. The rest of the update has to be accepted in
  the product file. Library request 21.
- **118 badge texts restored on the two platform pages**, each read back: 28 badges placed directly on the
  technical frames, the *Programs 2* / *Courses 5* tab counts on eight screens, *Tomorrow* / *In 15 days* on the
  course dates card, *Started* / *In 13 months* on the program dates card, and the type badges of the Dates tab
  rows (*COURSE*, *UPGRADE*, *CERTIFICATE*, *ACCESS*, *FINAL PROJECT*, *FINAL EXAM*).
- **The *You left off here* badge is gone from the program course rows** (Nelson: not needed, the modules bar
  already says it). Removed from the local `Course-Row-Compact`; hidden on the desktop screen, because the DS
  `Course-Row` still carries it. Library request 23.
- **Found:** the top bar's *Calendar* count reads 4, it was 3 — an override inside the DS `Topbar` master, lost
  with the others. Not patched on 23 screens; library request 22.
- **Still to do:** `Due-Item` and the grade pill once the update is complete, then a recount on every page.

## 2026-10-07 · DS: the other 94 nested badges repaired (not published)

Named version first: *Before badge repair 2: nested badges in 15 LMS component sets*. On Nelson's go-ahead.

- Every `Badge v2` nested in a component on `❖ LMS COMPONENTS` and `❖ LMS PLATFORM COMPONENTS` has its text again
  (and `Due-Item` · Today its dot): 94 badges in 15 sets — Quiz · Entry Header 24, Date-Row 24, Thread-Row 9,
  Message 8, Provider-Partner Badge 6, Program-Card 6, Quiz · Results 4 and eight smaller ones. With the three
  wrapper sets, all 114 are repaired. Values from the original build scripts, the migration records and the
  prototype; library request 21 has the table, set by set, and the four that are least certain.
- **Needs a DS publish**, then the update accepted in the product file.
- **Still to do after that:** the badge texts that were set on screens (they come back as the component default),
  and a look at `Badge v2` nested outside the two LMS pages.

## 2026-10-07 · DS: delivery, difficulty and topic-type badges repaired (not published)

Named version first: *Before badge repair: Delivery Mode, Difficulty and Topic-Types badges*. On Nelson's go-ahead.

- The 20 variants of `LMS / Delivery Mode Badge`, `LMS / Difficulty Badge` and `LMS / Topic-Types Badge` have their
  label and leading icon again, and the topic-type badge its `text/subtle` label and hidden icon container fill.
  Read back and checked by eye. Values from the 23 Sep changelog, the prototype and one instance that had not
  updated; *Peer review* and the *Lesson* icon (`layout-alt-01`) are inferred. Library request 21.
- **Needs a DS publish**, then the update accepted in the product file.
- **Not repaired:** 94 more nested badges read *Label* in 15 other DS sets (Quiz · Entry Header, Date-Row,
  Thread-Row, Message, Program-Card, Provider-Partner Badge…), and the screens' own badge texts are lost too.
  Library request 21 has the list.

## 2026-10-07 · Program Page — tablet and mobile; a DS badge defect found on the way

Named version first: *Before Program Page tablet and mobile*.

- **Eight screens** in *Program Detail — sources*: Courses, Certificates, FAQs and About at 960 and at 375, on
  the Course Detail shell of each breakpoint. Content parity with desktop read back; 0 raw values, 0 unstyled
  texts, 0 generic names. Metadata map §35.7.
- **Header:** `Course-Header` has no Program variant below desktop, so the screens use the Course variant with
  overrides and `SKO Dark` on the instance. Library request 19.
- **New local component** `LMS/Platform/Program-Detail/Course-Row-Compact` (`6665:4206`): the course row for
  tablet and mobile — Grid card, a modules bar that wraps, same properties as the DS row. Library request 20.
- **⚠︎ DS defect, not fixed here:** since today's library update every delivery, difficulty and topic-type badge
  reads *Label* with no icon — 124 of 124 on Platform Ready for Dev, 182 of 192 on V8 WIP, 72, 242 and 48 on
  Video, Quizzes and Reading. The three wrapper sets lost their text and icon when `Badge v2` was restructured.
  Library request 21.
- **Not done:** the Program Page handoff frame.

## 2026-10-07 · Platform pages against Open edX — only what an API backs

Named version first: *Before edX compatibility pass: My Learning, Dashboard and Program screens*.

- **Evidence.** The dev environment answers on Learner Home, Mobile API v4, progress, dates, weekly goal,
  notifications, certificates and program progress (status codes, no credentials) — Sumac or later. Fields read
  from the Sumac source. Metadata map §37.1–37.2.
- **Decisions (Nelson).** Dashboard glance → real totals, streak out; *Due this week* → assignments only; top bar
  left as it is; the Program page's marketing content stays, waiting for the vendor.
- **22 screens changed** (11 sources and their handoff copies): glance totals, no streak card, no live-session due
  item, no *Book a mentor*; My Learning stats *In progress · Completed · Certificates*; total effort instead of
  time left; one completed course; program cards without cohort, week and lesson counters and at 14 % (courses
  complete ÷ courses); every delivery badge *Flexible Learning*. Program Detail: nine delivery badges. Metadata
  map §37.4–37.5.
- **Handoff** *My Learning & Dashboard*: a 7 Oct entry on the 11 cards, four descriptions rewritten. Still
  *In progress*.
- **Correction.** No route returns the dates of all of a learner's courses — not in Sumac and none found on
  `master`. (While asking, I had said later releases have one.)
- **Course Detail, Course tab** (7 screens, on Nelson's word): the *Live Session* topic is a *Video*, and the
  course update no longer mentions a live Q&A or a module opening. Cards 01–03 carry a 7 Oct entry.
- **Open:** the top bar's counters and sections, the program page's source, a call per course for the percentage,
  the DS components' old defaults, the prototype. Metadata map §37.6.

## 2026-10-07 · Prototype critique of the remaining screens; note editor and three rule fixes

- **Measured** (prototype `main`, local): practice quiz, graded quiz, Reading and certificate at 1280 and 375;
  contrast on six pages (video, Reading, quiz, certificate, Dashboard, My Learning) in dark, Gold, Red, Gold dark
  and Red dark. No contrast failure in any mode except the disabled *Submit* (2.4:1 light, 2.0:1 dark; exempt).
  One `h1` per page, no heading skips, no unnamed control, no horizontal scroll, no text under 12 px. First
  attempt at the mode sweep gave false failures: colours were read mid-transition; transitions were switched
  off for the second read.
- **Fixed in the prototype** (PRs 66 and 67, merged): the note editor follows the DS `LMS / Note Editor` (bottom
  sheet on mobile); Reading has no Downloads tab and lists its files in the body; Quiz, ORA and VILT read
  *Completed*, not *Marked as completed*; the certificate no longer shows time learned.
- **Figma against those fixes:** the Reading screens have no tab bar (agrees). The three certificate screens on
  *Completion + Certificate* still show *4h 22m · Time*: the stat is drawn inside the DS `LMS / Course
  Certificate`, which has no property to hide it. A DS change, not made.
- **Open, for Nelson:** the practice quiz sample shows a completed topic with empty answers and a primary *Go to
  next Module*; whether Video should read *Completed* too, since it completes on its own at 90 %.
- Also checked: the transcript still follows the active line after PR 62, and a note saves from the new editor
  (count 2 → 3). The prototype video does not advance time, so the follow was tested with a click on a line.

## 2026-10-07 · DS components in use: sections 1 to 5 recounted

- `03-design-system/ds-components-used-icp-lms.md` recounted over the nine pages (one Plugin API read per page,
  every instance resolved, per-name sums equal to each page total). Components: LMS product 67 → 68
  (`LMS / Note Editor`, 6 on Video), platform 32 → 31 (1 242 → 1 182 instances), base 27 → 25 (`Badge` V1 and
  `Badge-V1-to-remove` at 0), icons 62 → 53, private bases 14 → 13.
- Two causes outside the recount, checked on the Video page: `Badge v2` now has a `Content` property and no
  nested `_Badge base` in most variants (212 badges, 13 bases), which also removes the icons that sat inside
  badges; and the platform screens lost the streak card and some week days, jump tiles and due items when they
  were cut back to what Open edX serves.
- The ICP Hub (version 7) carries the 7 Oct audit decisions and three open questions.

## 2026-10-07 · Metadata map: navigation marked as under study

- `course-details-metadata-map.md` §33 opens with a status note (sidebar or top bar not decided, 7 Oct), and the
  Course Detail passage that said the sidebar is hidden on every platform page now points to it. The 30 Sep text
  is kept as the record of what was drawn. The two "sidebar hidden" lines in `prototype-flows.md` and the Course
  Outline FRD are about the course player on mobile, a different sidebar: not touched.

## 2026-10-07 · One primary action per list in the screens; Course Card on tablet and mobile

- **Completion + Certificate:** the three `modal-backdrop` rectangles bound to `bg/overlay` (were #13282f at
  60 %, same change as on Overlay Panels). The page reads 0 raw values in its screens.
- **One primary per list**, after a named version (*Before: one primary action per list on Dashboard and My
  Learning*): in every list of three `LMS / Course Row` or `Resume-Row`, the first keeps the Primary *Resume* and
  the other two are Secondary. 6 rows on Ready for Dev, 10 on V8 WIP; no size changed. Matches prototype PR 62.
- **Course Card grid, the other way round:** in the screens every grid card already has a Secondary *Resume*;
  the prototype makes the first one Primary. Not changed on either side: to decide.
- **Course Card sizes:** in the DS the grid pads with `Spacing/3xl` (24 / 20 / 16) and the thumb is locked 1:1
  and fills the header height, so it is 98 px next to a two-line title and 128 px next to a three-line one.
  Prototype PR 64 takes the padding by breakpoint: 384 × 358, 438 × 350 and 327 × 366 match; the two-line mobile
  card is 338 against 342 because the prototype thumb stays 86 px.

## 2026-10-07 · Platform navigation is under study; notes for developers; Review pages audited

- **Decision status (Nelson, 7 Oct):** whether the platform pages use a sidebar or a top bar is still under
  study. Earlier text in this package that reads "the sidebar is hidden, navigation is the top bar" (metadata map
  §33–§34) describes the screens as drawn, not a decision.
- **Dev Mode annotations**, category *Development*, after a named version: on the 24 top bars placed on
  *Platform Pages - Ready for Dev* and on the 29 top bars and 11 sidebars on *Platform Pages V8 - WIP*. Text:
  *Navigation is not final (7 Oct 2026)… build the page content so it works with either: do not tie layout rules
  to the 72px top bar or to a 240px side column. Ask design before building the navigation shell.*
- **Nelson confirmed the 11 sidebars on the WIP page look right** after the swap that was undone.
- **Ready for Review pages, same audit as the Ready for Dev ones:**
  - *Overlay Panels:* 19 raw values and 12 old tag badges, all cleared. Unused gaps to 0 (5), mobile padding 32
    on `Spacing/4xl` (2), six quotes from Inter Italic to `body-medium/Regular` (heights unchanged), six backdrops
    from #13282f at 60 % to `bg/overlay` (#0e1a1f at 50 %: slightly lighter), 12 `Badge-V1-to-remove` tags to
    `Badge v2` Soft Gray (each 2 px wider and taller, same text).
  - *Completion + Certificate:* three raw fills, not touched yet.
  - *Topic Content Types Discovery:* not a screen page. About 9 100 raw values in documentation boards and
    archived hand mock-ups, 25 local `Worklist checkbox`. Left as it is.

## 2026-10-07 · Video tabs all on the current component; a wrong swap on the WIP page, undone

- Named version first: *Before swap: stale tab buttons (Video) and local footer (Platform WIP) → DS*.
- **Video:** the 12 `Current=False` tab buttons pinned to old copies of `_Tab button base` moved to the current
  copy. *Transcript*, 81 × 32, before and after. No tab button on the page points to an old copy now.
- **Platform V8 WIP, my mistake:** I took the local set named `LMS` for the Topic Footer Nav (the DS footer set
  has the same name) and swapped its 11 instances to the DS footer. It is the platform sidebar (`Sidebar-LMS`,
  `Sidebar-Empty`, set `6207:256263`). Swapped back in the same session: all 11 on `Sidebar-Empty` again, same
  sizes (240 wide, 778 to 1609 high), visible text identical to the component's. **Not provable from here:** that
  no non-text override was lost in the round trip; the named version above holds the state from before.
- Rule taken from it: identify a component by its variants and content, never by its name alone.

## 2026-10-07 · After the publish: old tab badges gone on Video, Course Card in the screens

- DS published and the update accepted in the product file (Nelson). Platform Ready for Dev: `LMS / Course Card`
  instances read 384 × 358 (desktop grid), 1200 × 152 (list), 438 × 350 (tablet), 327 × 342 and 366 (mobile);
  nothing overflows its frame.
- **Video, the 12 old `Badge` in the tabs.** The update did not reach them: the file holds four copies of
  `_Tab button base · Current=True, Size=sm, Type=Underline` under the same key, one current (Badge v2) and three
  old ones, and those 12 tabs were pinned to the old three. After a named version (*Before swap: old Badge in
  tabs → Badge v2 (Video)*) they were swapped to the current copy. Read back: 212 `Badge v2`, 0 `Badge`; labels
  and counts as before (*Notes 2*, *Downloads 4*); tab sizes 81 × 32 and 123 × 32 as before. Two repairs after
  the swap: the Downloads count had fallen back to 2, and four badges kept a stale fixed width (overrides reset).
- Still pinned to old copies on the Video page: 12 `Current=False` tab buttons (no badge involved).
- Prototype: `nvjeronimo/skillup-lms-prototype` PR 63, the course card on `title-large`, 384 × 358.

## 2026-10-07 · DS: the five pending decisions applied (not published)

Named version first: *Before handoff audit 3: Course Card text styles, badge illustration tokens, shadows, whites,
Glance-Card gap*.

- **`LMS / Course Card`:** the 12 unstyled texts on DS styles (`title-large/Semibold` and `/Bold`,
  `body-large/Semibold`, `body-medium/Regular` and `/Medium`, `body-small/Semibold`). Grid 380 × 342 → 380 × 358,
  List 1200 × 113 → 1200 × 120, as measured in the dry run. The prototype card and the screens still have the old
  height until the library update is taken and the prototype follows.
- **`LMS / Course Type Badge` illustration:** Program stack on `icon/primary` at 30, 60 and 100 %; Course lines on
  `icon/on-primary`. **Not a clean result:** the first write lost the opacity steps and flattened the fills, the
  original fills per rectangle could not be read back (REST token expired), and the Course lines now all read
  100 % although 70 and 50 were set. The Program cards overlap, so the translucent ones show through each other.
  To look at in the app; the named version above holds the original.
- **Shadows:** `Course Complete Modal` → `Shadows/shadow-2xl`, `Course Certificate` → `Shadows/shadow-3xl`,
  `Drag and Drop · Item` → `Elevation/level3`, `Zooming Image` → `Elevation/level4`.
- **`Lesson Block`:** `zoom` and `pager` on `bg/page`.
- **`Glance-Card`:** the stats grid already had its row and column gaps on a 24 token; the 28 was a leftover
  `itemSpacing` the grid does not use. Bound to `Spacing/3xl`; card 760 × 188 and columns unchanged.
- Still raw on these components: `Course Type Badge` labels (SemiBold 12, auto line height) and icon radii 1.33.

## 2026-10-07 · DS: Button publishable again, tabs already on Badge v2, Course Card measured

- `Button` (`21851:7608`, Buttons page): the boolean `Tooltip` drove no layer and no tooltip layer exists; property
  deleted after a named version. Properties now `Type`, `Hierarchy`, `State`. Not published.
- **The old `Badge` on the Video tabs is not a DS defect.** `_Tab button base` (same key the product file uses)
  already holds `Badge v2` (Soft, Gray and Brand, sm and md) and `Horizontal tabs` reads `CURRENT`. The 12 V1
  badges are instances that have not taken the library update in the product file.
- **Course Card, dry run on temporary clones (removed):** giving the six unstyled texts the nearest DS style
  (`title-large` for the title and initials, `body-large/Semibold` for the percentage, `body-medium` for time
  left and the up-next title, `body-small/Semibold` for *UP NEXT*) takes Grid from 380 × 342 to 380 × 358 and List
  from 1200 × 113 to 1200 × 120. The up-next title goes from 15 to 14 px and *UP NEXT* from 11 to 12 px.

## 2026-10-06 · Video page: the last local components swapped to the DS

- Nelson confirmed the three Dark note editor modals render correctly in the app.
- Named version first (*Before swap: local Topic Footer Nav edge cases → DS*). The four local
  `LMS / Topic Footer Nav` on the edge-cases board (*B. Footer Nav edges*) are now the DS footer (the set named
  `LMS`), with the position and title carried over and the nested button on the DS milestone: first topic
  (Previous disabled), next disabled, module completed, course completed. Sizes unchanged for the first two;
  the two end-of-module/course footers go from 64 to 62 high.
- **Copy changed by taking the DS variants:** *MODULE COMPLETE · Next module* → *MODULE COMPLETED · Go to next
  Module*; *COURSE COMPLETE · Next course* → *COURSE COMPLETED · Go to next Course*. The end buttons are now the
  DS ones (sm, 36 high) instead of the local md Primary (40).
- The only local component left on the Video page is `_iPhone mockup home` (7, device chrome).
- **Not fixable on the page:** the 12 old `Badge` (V1) are inside the DS `_Tab button base` (the count on
  Horizontal tabs). It is a DS change: move that count to `Badge v2`.

## 2026-10-06 · Note editor modals on the Video page are DS instances

- DS published by Nelson. Named version first (*Before swap: note editor modals → LMS / Note Editor*), then the
  six modals replaced by instances of `LMS / Note Editor`, text carried over through `Title`, `Anchor`, `Quote` and
  the nested note and tag texts. Light: 560 × 592, 560 × 584, 375 × 630, same size and same text as before.
  Dark: 558 → 592, 550 → 584, and the mobile one from a centred 343 × 560 modal to the 375 × 630 bottom sheet
  (its screen frame now lays out like the Light one: no padding, sheet at the bottom). No text lost.
- Screen frames: desktop Dark backdrop bound to `bg/overlay` (was raw, same 50 %); unused 10 px gap set to 0;
  tablet padding 32 bound to `Spacing/5xl`. The Video screens now read 0 raw values outside instances.
- Dark: `SKO Dark` set explicitly on the three Dark instances. Read back, root `bg/page` = #0e1a1f and title
  `text/default` = #eaf1f4. **Not confirmed by eye:** the server renders disagreed with those values (first a
  fully light modal, then dark fields on a root that did not paint). To check in the Figma app.

## 2026-10-06 · `LMS / Note Editor` built in the DS (not published yet)

- New component set `LMS / Note Editor` (`22071:6813`, key `e39dc2849f…`) on `❖ LMS COMPONENTS ✅`, section
  *3 · Content & Notes*, after a named version. `Breakpoint`: Desktop and Tablet are the 560 modal, Mobile is the
  bottom sheet (375, grabber, footer padded 34 for the safe area: the one raw value, on purpose). Text properties
  `Title`, `Anchor`, `Quote`. Built from DS `Textarea input field` (Default and Tags), `Buttons/Button` md and the
  `x-close` icon; every colour, spacing and radius on a DS variable (padding and gaps on `Spacing/2xl` and `3xl`,
  which give 24/20/16 across the three modes), shadow on `Shadows/shadow-2xl`.
- Modelled on the Light screens of the Video page, which already used the DS Textarea. Sizes read back: Desktop
  560 × 592 and Tablet 560 × 584, the same as the Light modals `3823:16589` and `3822:39496`; Mobile 375 × 610
  against 630 (the sample quote is one line shorter).
- The hand-drawn copies are the three in the Dark frame (`3976:19847`, `3976:19880`, `3976:19913`; the dark mobile
  is a centred modal, the light one a bottom sheet). Their quote was Inter Italic with no style; the component
  uses `body-medium/Regular`, as the Light screens do.
- Next, after the library is published: swap the six modals on the Video page to instances and bind the desktop
  backdrop to `bg/overlay`.

## 2026-10-06 · Handoff audit, third pass (after the DS publish)

- **DS, off-scale values snapped down to the nearest token** (named version first, not published): 24 spacings
  (10 → 8, 14 → 12, 18 → 16, 22 → 20) in `Lesson Block`, `Zooming Image`, `Drag and Drop · Item`; 12 skeleton-line
  radii 3 → 2 in `Lesson Block`; the two `Glance-Card` circles on `Radius/fixed-full`. These move things by 2 px.
- **Left for a decision:** `Course Card` 12 texts with no style (15, 11, 14, 16, 20 px on auto line height:
  applying a style changes the card height the prototype matches); `Course Type Badge` illustration (blues
  #4078d9 / #80a1e5 / #b2c7f2 with no token, radius 1.33); four shadows that match no effect style; white fills
  that three tokens share (`bg/page`, `bg/fixed`, `bg/on-media`); `Glance-Card` stats gap 28 (grid).
- **Why `Button` is an invalid asset:** boolean `Tooltip` is used by no layer (set `21851:7608`, page Buttons).
  `Card_Event` was not found as a component set under that exact name.
- `03-design-system/ds-components-used-icp-lms.md`: new section 1b (the platform components, now DS), section 7 rewritten.
- Trap: the Desktop Bridge plugin reported 87 Topic-Row instances as local after the relink; `use_figma` on the same
  pages reads 87 remote, 0 local. Counts of remote/local come from `use_figma` only.

## 2026-10-06 · Handoff audit, second pass (Nelson: yes to all four)

- **Video:** 28 values bound (8 × `Spacing/4xl`, 14 × `Radius/fixed-md`, 6 × `Radius/fixed-sm`). Left, all in the
  hand-drawn note-editor modal: gap 10 (off-scale), tablet padding 32 and mobile padding 16 (no single token),
  tag radius 999, safe-area 34, three texts in Inter Italic 14/20, five modal shadows without an effect style.
  It needs a DS component, not more bindings.
- **Reading:** list spacings rounded as decided, 9 → 8 (`Spacing/md`, 14) and 28 → 24 (4), the 16 gap on
  `Spacing/xl`. 0 raw values left in the screens. The mobile list indent landed on `Spacing/5xl` (24 in Mobile)
  while desktop is `Spacing/3xl`: same pixels, two tokens — to settle.
- **DS, `❖ LMS COMPONENTS ✅`** (named version first): 199 spacings and 56 radii bound to the token with the same
  value in the node's mode, 19 components. 19 descriptions written (drafts, to review). Left: off-scale spacings
  10/14/18/22 (Lesson Block, Zooming Image, Drag and Drop · Item), radii 3, 1.33, 1.5 and mixed, 16 texts with no
  matching style (Course Card 12, Course Type Badge 2, Footnote 2), 10 raw fills, 4 shadows without a style.
  Not published.
- **Prototype critique, local `main`:** see the session report; main findings are two learner identities and two
  My Learning pages, three equal primary buttons in one view, and the topic page opening scrolled 355 px.

## 2026-10-06 · Handoff audit of the Ready for Dev pages (first pass)

- Measured outside instances, screens only (children of `screen-wrap`): Platform 0 raw values; Quizzes 21 radii;
  Reading 56 spacings; Video 66 (note-editor modal drawn by hand: 27 spacings, 29 radii, 3 texts without style,
  6 effects without style, 1 raw backdrop fill). All colour and spacing bindings resolve to the DS library
  (`🎨 SKO-Semantics`, `3. Responsive 📐`); no orphan collection.
- Bound, after a named version (*Before handoff audit: bind raw spacing and radius on Ready for Dev screens*):
  Quizzes 21 × `Radius/fixed-md`; Reading 37 spacings to the token with the same value in the node's mode.
  Left on Reading: 14 × 9 px and 4 × 28 px (no token), 1 × 16 px (two tokens match on mobile). Video not touched.
- Prototype `main` (`12b1109`): 114 colour tokens × 6 modes compared with the DS, 112 identical; the other two are
  colour-plus-opacity values the plugin API does not resolve (`bg/overlay-soft` reads 20 % on both sides,
  `bg/on-media-soft` not confirmed).

## 2026-10-06 · Local components → the DS

- **Done (late):** `Topic-Row` would not publish because of an unused `Icon` instance-swap property (Figma:
  *Invalid assets · Unused properties*). Nelson deleted it and published; its 87 instances were swapped with 0
  differences. All 741 instances on the three pages now resolve to the DS; no local `LMS/Platform/…` main is left
  there. `Button` and `Card_Event` are also invalid assets in the DS, untouched. Metadata map §36.6.
- **Relink (night):** DS published; 654 instances swapped to the DS components by key on the three pages, nine
  nested-badge overrides repaired. `Course-Detail/Topic-Row` is still unpublished in the DS: its 87 instances wait.
  Tokens inside the 35 are all bound to the DS's own variables. Metadata map §36.5.
- **After the paste (evening):** the 35 are on the DS page (96 variants, all variables and styles local to the DS),
  not published yet. The paste did not carry the link: new keys, and the 1 242 instances in the ICP file still
  resolve to the old, deleted components. Next: Nelson deletes the older copy and publishes; then the instances
  are swapped to the DS components by key. Metadata map §36.4.
- The 35 local components renamed to the 14 Sep convention (`LMS/Platform/<Group>/<Component>`) and gathered in one
  section, ready to be cut and pasted into the new DS page `❖ LMS PLATFORM COMPONENTS` (`22011:941`). Baseline:
  1 394 instances on the two platform pages must resolve to the library afterwards. Metadata map §36.
- Variant property `Type` → `Kind` on the four sets that had it (`Course-Header`, `Sidebar-Card`,
  `Grade-Summary-Row`, `Score-Row`), before the move. Instances unchanged, file total still 1 648.
- The page intro rewritten on DS styles and tokens (35 components, six groups, naming, five rules) and placed
  inside the section to move. Metadata map §36.3.
- **Blocker for a clean move:** the DS page `❖ LMS COMPONENTS ✅` already holds a pasted *copy* of the 35
  (different keys, unpublished, still `Type`, old intro). To delete before the cut, or the DS gets every name
  twice. Metadata map §36.2.
- Correction: the instance undercount (1 213) was not unloaded pages alone — `getInstancesAsync()` is short on its
  first pass. figma-api-traps 39–40. Library request 18 (Course Card *UP NEXT* at 11 px, no text style).

## 2026-10-05 · Program Page — the course list is a list of expandable course rows

- Nelson's decision: list only, the module the learner left off in visible at a glance, each course expandable to
  its modules. New local `LMS / Program Detail / Course row` (`6538:6143`): DS Course Card · List + a modules bar
  (*You left off in Module 2 of 4*, Show / Hide modules) + a slot of `Module row`. The Courses tab (`6443:18722`)
  uses it; no sidebar on that tab. The three option screens and `Course panel` removed. Metadata map §35.6.

## 2026-10-04 · Program Page — three options for the course list; progress bars really fixed

- Courses tab: three options with the DS `LMS / Course Card` instead of `Module row` — A grid (`6526:20655`),
  B list (`6527:22768`), C list with a numbered sequence (`6527:29075`). Awaiting Nelson's choice. Metadata map §35.5.
- Correction: the Course Card progress fills on My Learning had not changed on 30 Sep (a nested `resize()` is
  ignored silently). Now set by fill + track padding on sources and handoff, verified by read-back.
  figma-api-traps 38.

## 2026-10-01 · Badges — the old Badge V1 replaced

- 28 `Badge-V1-to-remove` instances (Weekly goal *What counts as a day* table, handoff and Technical) are now
  `Badge v2` · Soft. No `_Badge base` is placed on its own anywhere in the file. Metadata map §34.8.

## 2026-10-01 · Course header — hatched circle

- `Course header` (courses and programs, all breakpoints): the big decorative circle is a diagonal hatch of 1px
  `border/primary` lines; the small one stays solid. Tablet and Mobile circles repositioned so the effect shows.
  Metadata map §34.7.

## 2026-10-01 · Program Page — the Courses tab, desktop (in progress)

- What the data allows: programs are enabled on dev and course-discovery is deployed (closes open question 7);
  Credentials is not. The current platform's program payload (45 fields) saved as evidence. Of the eight V8 tabs,
  four are backed by data: Courses, Certificates, FAQs, About.
- `Program Detail · Courses tab · Desktop` (`6443:18722`): `Course header` · Program, seven courses on `Module row`
  with a local `LMS / Program Detail / Course panel` in the open row, three sidebar cards. Metadata map §35.
- Certificates (`6449:21234`), FAQs (`6448:20247`) and About (`6448:24409`), desktop: `Certificate card` per course
  with certificate data; DS `_FAQ item` accordions with the real FAQ and overview copy. The program certificate is an
  open vendor question. Library request 17.

## 2026-10-01 · Top bar light; badges on every breakpoint; mobile Q&A conversation as one card

- `LMS / Platform / Topbar` is light (`bg/page`, `border/subtle` rule); Current item on `bg/primary-soft`. All
  platform and Course Detail screens follow.
- `Course header` · Tablet and Mobile show the Delivery and Difficulty badges; the mobile Dashboard shows the
  delivery badge through a local `LMS / Platform / Resume row` (the DS row cannot fit it).
- Mobile Mentorship Q&A conversation: header, messages and composer in one card, from Nelson's reference.
- Handoff cards: the *Ready for DEV* Status Tag is `Status/Done` on the 17 Course Detail cards (was
  `Status/In progress`). My Learning & Dashboard is **WIP**: banner *WIP*, its 11 cards `Status/In progress`.
- `Topbar` · Compact gains the learner's Avatar — profile access on tablet and mobile.
- Components page: ten named sections in three columns, no overlaps (three clashes fixed).
  Metadata map §34; library request 16 updated.

## 2026-09-30 · My Learning and Dashboard — handoff frame (in progress)

- New frame `Platform Pages - My Learning & Dashboard - Light` (`6408:35150`) + banner (*WIP* since 1 Oct), right of the
  Certificates handoff: 11 screens in three rows — Dashboard (desktop · tablet · mobile), Courses and Programs
  (grid and list on desktop, tablet, mobile). Each card links to its source screen. Metadata map §33.

## 2026-09-30 · Course Detail — the platform top bar

- The LMS sidebar is gone from every Course Detail screen: `LMS / Platform / Topbar` on desktop (content at 1280,
  margins 40 both sides), the Compact variant on tablet and mobile instead of the platform header.
- `Course header` · Desktop adapts to its width (stretching content row, circles pinned right).
- Handoff: 13 screens re-copied (0 annotations, footnotes as before), tablet cards renamed, changelog entry on
  every card. Metadata map §33 and §27; figma-api-traps 37.

## 2026-09-30 · My Learning and Dashboard — tablet and mobile

- Tablet (960) and mobile (375) for the Dashboard and My Learning Courses / Programs; Topbar Compact; mobile with
  the ICP status bar. Below desktop only Grid — the view toggle is hidden (Nelson, 30 Sep).
- Mobile: stacked Dashboard, 2 × 2 Jump tiles, Course Row without its badge; My Learning stats stacked, tabs above
  a full-width search. Course Card thumbnail, *Up next* truncation and progress fills fixed by override on every
  breakpoint. Metadata map §33; library requests 13 (extended) and 16; figma-api-traps 33–36.

## 2026-09-30 · My Learning and Dashboard — token and naming pass

- Five desktop screens at zero raw values and zero generic names (audited outside instances). One shell for the
  four My Learning screens (Header: Intro + Stats 600; Collection: Toolbar + items); Dashboard wrappers removed,
  the Due list's inner-shadow border became a `border/subtle` stroke.
- Page titles on `headline-large/Bold`; course-card progress fills sized to their percentage (the DS card draws
  one width for all). Metadata map §33; library request 13 extended.

## 2026-09-30 · My Learning and Dashboard — local components

- Eight `LMS / Platform / …` components for what the DS lacks: Stat, Section header, Due item, Jump tile, Glance
  card, Streak card, Program card (Grid · List × In progress · Not started), Browse tile — DS atoms inside, tokens
  and DS styles throughout; peer review, not promoted.
- The five desktop screens use them instead of drawn blocks. Design changes on the way: streak days are the Course
  Detail `Week day`; section titles keep the colour split but lose the italic (no DS italic style); the program hero
  is `bg/primary` in both states; contrast-failing #51BFFC text replaced. Metadata map §33; library requests 13–15.

## 2026-09-30 · Course Detail tablet — the four tabs at 960

- Tablet screens for Course, Progress, Dates and Mentorship Q&A (960, Responsive = Tablet): DS header navigation,
  new `Course header` Tablet variant, tabs with search (max 320), main column + 320 sidebar (the desktop width, kept as the
  minimum); lock reason as text (touch).
- Screens handoff: one tablet card per row between desktop and mobile — 13 screens, renumbered; the component
  handoffs moved right. Metadata map §32.
## 2026-09-30 · Certificates — component handoff, ready for dev

- New frame `Platform Pages - Course Detail · Certificates (component) - Light` (`6353:7518`) + banner: 01 the four
  Certificate card statuses — nothing else. The Certificate document and the digital & print mockup are visual
  representations, not for development; both were removed from the handoff; the component description says so. Dev notes visible under
  each (from the Technical screens' annotations and §16).
- Certificate card Generating: title typo fixed; the discovery flag *"The state we were missing"* removed.
- The mockup on tokens and styles (handoff copy and original). Note on the duplicated working page and its new ids.
  Metadata map §31; figma-api-traps 29–30.

## 2026-09-30 · Weekly goal card — component handoff, ready for dev

- New frame `Platform Pages - Course Detail · Weekly goal card (component) - Light` (`6350:7334`) + *Ready for dev*
  banner, beside the screens handoff: 01 the five states · 02 thirteen edge cases · 03 what counts as a day.
- The 19 annotations became visible dev notes (`LMS / Footnote`) under each state; spacing and radius on tokens; no
  annotations, generic names or raw values left. Metadata map §30.

## 2026-09-25 · Consistency pass: spacing and layer names on the ready-for-dev screens

- Desktop tab content is one row (Progress was a grid), gap 40; main-column gap 24 on every tab; notice wrappers
  removed (Course had 20px extra). Empty hidden Dates sidebar deleted.
- Generic layer names replaced (Page › Main › CourseDetail › Tab content › Main column); block names unified across
  desktop and mobile. ENTRY follows. Handoff re-copied: 0 generic names, 0 hidden, 0 annotations. §29.2.

## 2026-09-25 · Mobile tab rows: top padding

- Following Nelson's fix on the handoff Course tab card: every mobile tab row gets **padding-top `Spacing/lg` (12)**,
  left `Spacing/xl`, gap `Spacing/3xl` — the four mobile screens with tabs and their handoff copies (row height 32 → 44).

## 2026-09-25 · Course Detail corrections after the audit

- 43 `Badge-V1-to-remove` → `Badge v2` (Outline, sm) in Date row, Thread row, Message, Sidebar card; 62 screen texts
  restored. Date row default chip *DUE DATE*.
- Date rows hug their height. ENTRY aligned with the Technical Course tab. Handoff meta labels on `text/on-primary`.
- Library requests 11 (filled Badge v2) and 12 (12px overline). Handoff re-copied and re-audited to zero. §29.1.

## 2026-09-24 · Course Detail: every tab on mobile; tokens and components audited

- Mobile: Dates, Q&A list and Q&A conversation added (5 mobile screens). `Date row` and `Message` gain a Mobile
  breakpoint; `Thread row` text column fills.
- Token audit on all ten screens + local components: 0 unbound colours, spacing, radii; 0 unstyled texts. Spacing bound
  per mode; off-scale values snapped (10, 14, 18, 36, 56, r3). Card labels → `label-small/Medium` (10px, the DS
  overline).
- Components instead of drawings: Dates dividers → `Content divider`; `Date row` link → DS `Button` Link; `Course
  stats` icons → DS icons.
- Handoff frame: nine cards; chrome colours on the nearest tokens. Metadata map §29; figma-api-traps 22–27.

## 2026-09-24 · Module row holds its topics; Topic row mobile

- `Module row`: every variant is a bordered card — `Header` + a **`Topics` SLOT** shown when expanded. Screens (Technical,
  ENTRY, mobile, handoff) use one instance per module, no wrapper frames, topics inside the slot.
- `Topic row`: **Breakpoint = Desktop · Mobile**. Mobile puts type and duration under a full-width title. The mobile
  screens use it.
- Locked topic title: underline removed again (desktop + mobile). *Implementing feedback* Locked on every copy.
- Metadata map §28.

## 2026-09-24 · Course Detail handoff frame — dev-ready, no annotations

- New frame `Platform Pages - Course Detail (self-paced) - Light` (`6146:10226`) + *Ready for dev* banner, in the ICP
  handoff format: 6 cards — Course, Progress, Dates, Q&A desktop; Course and Progress mobile. 0 annotations inside.
- Mobile Course tab re-aligned to the Technical Course tab (sidebar cards, alert, intro).
- Visible developer copy removed: Dates timezone line; Q&A *Post anonymously* tail.
- Dev Notes footnotes hidden in the frame (Course team, Certificate — 4 instances), so the screens show only learner UI.
- Metadata map §27.

## 2026-09-24 · Course Detail mobile — the Progress tab

- New screen `★ ENTRY · Course Detail — mobile · Progress tab` (`6207:256494`). Both mobile screens set
  `3. Responsive 📐` = Mobile at the frame.
- Grade table on mobile: Weighted column only, score and weight in the row (the DS first column has a 170 min width).
  Library request 8 gains point 8.
- Technical Progress tab: grade badge 62% → **15%**; pass alert body in learner copy.

## 2026-09-24 · Course Detail mobile — the Course tab

- New screen `★ ENTRY · Course Detail — mobile · Course tab` (`6207:256470`), 375 wide, next to ENTRY. Status bar,
  DS `Header navigation` Mobile, `Course header` Mobile, underline tabs (sm), content and sidebar cards stacked.
- `Course header`: new `Breakpoint` axis — `Type=Course, Breakpoint=Mobile`, one column, `3. Responsive 📐` in Mobile mode.
- `Course title` / `Course stats`: fill and wrap. `Meta`: wraps; fills its column in `Module row`.
- `Module row`: `Show lock reason` + `Lock reason` in the Locked variants — the tooltip's copy as text, for touch.
- Three mobile-only annotations (tabs, order, lock on touch). Metadata map §26.

## 2026-09-24 · The Lock molecule on the locked topic

- `LMS / Course Detail / Lock` becomes a set, **Size = md (32) · sm (18)** (`6120:2380`). `md` keeps the Module row's
  tooltip, below and centred. `sm` puts the DS Tooltip above the lock with `Arrow=Bottom left`, anchored left.
- `LMS / Course Detail / Topic row` State=Locked: status icon replaced by `Lock` Size=sm, exposed. Description updated.
- Module 4 on the Course tab and ENTRY kept `Show tooltip` and its text through the change. No screen uses a locked topic yet.
- Topic row State=Locked: title underline removed — a locked topic does not open, so it is not drawn as a link. The
  `body-large/Medium` style is kept (the underline was a local override on it).
- Topic row State=Locked: title colour `text/on-primary-soft` (link) → **`text/default`**.

## 2026-09-24 · Module row, atomic: 8 variants → 6, the lock reason is copy

- New molecule **`LMS / Course Detail / Lock`** (`6118:10300`): DS `Completion Status · Locked` + DS `Tooltip`,
  `Show tooltip`, Tooltip exposed. No drawn parts.
- `LMS / Course Detail / Module row`: `Lock reason` axis removed (Date and Prerequisite differed only in tooltip
  text), `Show unlock tooltip` and `Show Locked Module` removed. One `State=Locked, Expanded=True` remains — a locked
  module can be expanded to show its (locked) topics. The Locked variant holds the Lock molecule as an exposed nested instance. Description rewritten.
- 11 instances checked: Course tab and ENTRY Module 4 keep *Complete “Module 3 · Checkpoint” to unlock*; the
  Integration proof board's Date instance moved to the Locked variant. Module 4 annotation corrected (§18.3).

## 2026-09-24 · Course Detail syllabus: local Topic row, grouped by Lesson Header

- The Course tab's Module 3 (redrawn by Nelson) is the format: `Module row` · `sep` · a container with the DS
  `LMS / Lesson Header` per lesson and the local `LMS / Course Detail / Topic row` per topic, meta on the right.
- `★ ENTRY` Module 3 switched to the same block; its DS `LMS / Topic Row` list is gone. No annotations on ENTRY.
- Metadata map §15.1: the Topic Row adoption is marked reversed; the local set has `State=Locked`.
- Module 3 subtitle on both screens: *12 topics · 3h 20m* → **9 topics · 3h 48m**, what its list actually holds
  (the four modules now sum to ~13h 48m, which matches the header's ~14 hours).
- Module 4 subtitle: *12 topics* → **9 topics**, so the modules sum to 12 + 12 + 9 + 9 = **42**, the header's total.

## 2026-09-25 · Mentor card: a Q&A variant for the current build

The mentor flow as decided by Nelson:
- **When the course has a mentor assigned**, the sidebar shows a standard message. There is no named mentor.
- **The button, *Ask your mentor*,** takes the learner to the **Mentorship Q&A** tab. They post the question
  there, and the course staff and/or the mentor answer in the same place.

In the design system:
- **`LMS / Course Detail / Sidebar card`** gains **`Type=Mentor Q&A`**: the MENTOR label, the title *Ask anything
  to your mentor* in body-large/Semibold, the body text and the button. Avatar, name and role are hidden.
- **`Type=Mentor`** (a named mentor, 1:1 messaging, optional *Book a call*) is **kept unchanged** for a future
  phase.
- **Screens switched to the new variant (5 cards):** Course Detail v12, mobile Course tab, TECHNICAL Course tab,
  and the self-paced Course Detail screens (×2).
  - They had been built by overriding Type=Mentor, turning the name line into the title and hiding the avatar.
    Those overrides were cleared.
  - Every visible text is identical before and after.
- **Body text changed (25 Sep):** *Unlimited 1:1 messaging, for the whole course. Typically responds within 1 day.*
  becomes *Post your question in Q&A*. Answers come from the course staff and/or the mentor, not a 1:1 channel.
  The 5 screen cards follow the variant.

## 2026-09-24 (late) · Badge v2 across the Untitled UI pages; Topic-Types keeps its own colours

- **Untitled UI pages migrated.** 649 direct V1 badges moved to Badge v2 across 30 vendor pages, using the same
  mapping as the LMS migration:
  - Badge → Soft, Badge Stroke → Outline, Badge modern → Modern, Badge color (icon only) → Soft.
  - Kept: text, the chosen icons, flags, avatar photos, position and sizing. Hidden badges stay hidden; for
    example, the extra badges in *Table cell* are configured while visible, then hidden again.
  - The ~1 800 badges nested in vendor components followed their masters.
  - A file-wide count now finds **0 V1 badges on any page**. The one left is inside
    `LMS / Topic-Types Badge/Discussion Prompt`, a deleted component that sits on no page.
- **Layer names.** The 59 badges migrated earlier kept the old layer name *Badge-V1-to-remove*, which made them
  look like V1 in the layers panel. They are renamed *Badge*.
- **Topic-Types Badge.** Nelson recoloured it: Plain Gray with a `bg/primary-soft` circle, an `icon/primary` icon
  and `text/subtle` text. Recommendation: keep it as a component-level change and don't add a Badge style yet.
  One component uses it; promote it when a second one needs it.
- **ICP after the update.** The same 5 restored texts were wiped again: 4 quiz Entry Headers and the Reading
  Topic Header. They were re-applied as direct text overrides. Check them again after each publish.
- `Badge-V1-to-remove` can go once the Mobile App file and any other consumer file stop using it.

## 2026-09-24 · Badge v2: 453 variants become 120, accents strong, statuses soft

**Design system (❖ SKO Design System)**
- **`Badge v2`** replaces the Untitled UI badge (renamed `Badge-V1-to-remove` by Nelson). It is 4 styles × 3 sizes
  × 10 colours = 120 variants, down from 453.
  - **Styles:**
    - Soft: soft fill, no outline.
    - Outline: soft fill and soft outline.
    - Modern: page fill and strong outline.
    - Plain: no box, icon in a circle (the Topic Types look).
  - **Colours:**
    - Statuses: Gray, Brand, Info, Error, Warning, Success.
    - Accents: Teal, Green, Red, Yellow.
- **Private atom `_Badge base`** holds the structure:
  - booleans for Label, Dot, Icon leading, Avatar, Flag, Icon only, Icon trailing and Close;
  - a Text property;
  - swaps for the leading, trailing and icon-only icons, and for the flag.
  Each public variant is an instance of it with colour overrides. A structural change is made once.
- **Accents strong, statuses soft.** Yellow used exactly the same primitives as Warning, and Green/Success and
  Red/Error were close. The brand book has only Primary, Neutral and the four accents (AA–AD), so the accents
  moved to the solid brand colour in Soft (`bg/accent-*` + `text/on-accent-*`), with a vivid outline in Outline
  and Modern. Everything stays inside the brand book.
- **Tokens.** One token per element for every colour: `bg/…-soft`, `text/…`, `icon/…`, `border/…-soft`,
  `border/…`.
  - **New (19):**
    - `icon/accent-*` ×4
    - `border/accent-*-soft` ×4
    - `border/accent-*` ×4, the solid accent
    - `icon/on-accent-*` ×4
    - `bg/info-soft` (Primary/100 in Light, Primary/900 in Dark)
    - `text/info` (Primary/700, 5.2:1)
    - `border/info-soft`
  - **Changed:**
    - `border/primary-soft` now has visible contrast: Primary/100, as with the other soft outlines. It used to
      alias the fill.
    - `text/accent-teal` in Dark was fixed from 800 (2.6:1) to 100 (13.6:1), matching its own description.
  - **Wrong family fixed:** icons were bound to `border/*`. They now use `icon/*`, including all of
    `_Badge close X`, which also gains Green and Info.
- **Showcase:** the frame `Badge v2 · Showcase` shows Light and Dark, styles × colours, sizes, options and
  combinations.
- **Badge group:** its 80 variants now use v2. Pill color maps to Outline with a white fill; Badge modern maps to
  Modern.

**Migration: LMS and ICP only**
- **In 11 LMS components, 61 badges were swapped:**
  - V1 Badge → Soft
  - V1 modern → Modern
  - Topic Types → Plain
  Text, icons and sizing were kept. The Provider-Partner badges stay text-only: their V1 icon was hidden.
- **VILT · Stage Stepper:** a stray *"Label"* badge, already visible in V1, was removed.
- **ICP:** after the library update, all instances on the Quizzes, Video, Reading and Platform Pages V8 pages are
  on v2. The badge texts that screens had overridden were recorded before the swap and restored:
  - 39 in the 9 quiz Entry Headers
  - *Reading* in a Topic Header
  - *15% · below the 70% pass mark* in a Grade Summary
- **Not migrated yet:** the Untitled UI example pages in the DS, and other files such as the Mobile App.
  `Badge-V1-to-remove` stays until those move.

## 2026-09-24 · The course page's lesson label is the ICP's Lesson Header

The Course Detail module outline (Technical · Course tab) had its lesson label, *Define and measure*, as a loose
frame (`Lesson Name container`). Its text colour was not bound to a token. `LMS / Lesson Header` already exists
for exactly this level (Module → Lesson → Topic), with the same text style and colour. The frame was replaced by
an instance at FILL width with the row's 8/12 padding; the result is pixel-identical. It was the only copy on the
page. The component description now says the Platform pages consume it, so nobody forks a copy.

**Rolled out to the other pages (24 Sep).** Every page with a module outline outside an instance was scanned:
Platform Pages V8, Course Detail — Components, Completion + Certificate. The ICP screens get the header through the
Sidebar component, and Nelson's Discovery pages were left alone. One more outline turned up: the main
**ENTRY · Course Detail — v12** screen, with the same Module 3 topics and no lesson label. An `LMS / Lesson Header`
(*Define and measure*, FILL, 8/12) was added at the top of it. Every frame up to the screen hugs its content, so
the extra 34px is absorbed and nothing is clipped.

## 2026-09-23 · Difficulty and delivery badges get icons that mean something

Both badges showed Untitled UI's default arrow-up on every variant.

- **`LMS / Difficulty Badge`**: new `LMS / Difficulty · Level Icon`, Level 1/2/3, drawn as signal bars. The
  filled bars sit in the vector `Icon`, the layer name every Untitled UI icon uses, so the Badge still colours
  them. The empty bars are `Track` at 35% of `icon/faint` and stay neutral. The level now reads from the shape,
  not only from colour and the word. It was built in the LMS library because the icon set has nothing that
  shows 1, 2 or 3 levels: `bar-chart-*` are all full sets, and `battery-*` suggests charge or effort.
- **`LMS / Delivery Mode Badge`**: Live Sessions = `video-recorder` (the same icon as the VILT-Live Session topic
  badge) · Flexible + Live = `calendar-check-01` · Flexible Learning = `clock`. Chosen by Nelson.

Needs a DS publish; the ICP instances update after it.

## 2026-09-23 (later) · Course Detail: open questions in one register

- Board `6207:257477` goes from six questions to **fourteen**, each with an owner and a **By** milestone (dev handoff →
  course build → course start → after launch). Q1, Q3, Q4 and Q5 rewritten for self-paced and the mentor work; Q7–Q14
  collected from §16–§24. Metadata map §25 has the table, grouped by owner.

## 2026-09-23 · Course Detail: known inconsistencies fixed

- **One today (Thu 18 Sep 2026)** across the Dates tab, the Upcoming dates card and the Weekly goal strip.
- Dates tab: human copy on the type chip instead of `ASSIGNMENT-DUE-DATE`; links only on assignment rows; the
  upgrade deadline moved to PAST; the missed-deadline Alert speaks to the learner, action *Shift due dates*.
- Upcoming dates card (Course tab + ENTRY) shows what the Dates tab has: final project tomorrow, certificate in 15 days.
- Progress card: *~ 8h 40m left* (was *12 min left*, which contradicted ~14 h at 38%).
- Completion card: orphan `Percent` property removed; ring overrides documented; library request 10.
- ENTRY tab row aligned with the technical screens (4 px, spacing tokens bound).

See metadata map §24.

## 2026-09-23 · Topic type verified in source: problem beats video; grading is irrelevant

Details are in `reading-screen-matrix.md` §17. A unit's type is `problem` if it contains any problem (ORA
included), else `video` if it contains a video, else `other`. *Graded* is a subsection setting and does not
change the type. This corrects §13 and the Row 6 card footer.

## 2026-09-22 (DS fixes) · Compact ORA Stepper; the Drag and Drop board stops printing its spec

- `LMS / ORA · Stepper`: new variant property **Size = Default | Compact**. In Compact the current step keeps
  its label and takes the free width; the other steps show only their number (50px each, full height). At 343
  with all five steps, the label wraps on a word boundary; with three steps it stays on one line.
- `LMS / Drag and Drop · Card`: *"Background image · author-supplied"* removed from all 6 variants. The drop
  zones are now centred vertically on the board, since nothing sits above them any more.

Needs a DS publish. After the publish, ICP 6.3 mobile swaps its hand-made override for Size=Compact.

**Correction (23 Sep).** The first publish shipped a broken Compact, for two reasons. Cloning the variants dropped their
`Show training / peer / self` bindings. And the variants were measured before the set's auto-layout stretched them,
so they came out as five equal segments with no hug sizing. The bindings and hug sizing were re-applied and tested at
311 with the peer-only flow: *① Your response · 3 · 5*, one line, 58px tall. The step numbers are positional,
as the component description warns, so the screen renumbers them to 2 and 3. **Needs a second publish.** ICP 6.3
already uses Size=Compact and picks the fix up then.

## 2026-09-22 (late) · ORA on tablet and mobile; the all-content example covers the whole catalogue

- Row 6 gains `ora-text-only-tablet` and `ora-text-only-mobile`. On mobile the Stepper is compact (current
  step labelled, others numbered). This is an override until the DS has the mode.
- `5888:53100` adds the Announcement and Anonymous User ID templates, three image layouts, Checkboxes,
  Dropdown, Numerical with a hint, Text input, Drag and Drop, and an Open Response with text and upload.
  Details in `reading-screen-matrix.md` §16.
- DS follow-ups: a compact mode for `ORA · Stepper`; remove *Background image · author-supplied* from
  `Drag and Drop · Card`.

## 2026-09-22 (night) · Text-only Open Response, and an example Reading screen

- DS: `LMS / ORA · Text Response`, with the states Empty, Draft saved and Submitted. Use one per prompt.
- ICP: Row 6 · `ora-text-only-desktop` shows two prompts: one with a saved draft, one empty. Both are about
  Six Sigma. The content overflows, so the content scrollbar stays.
- ICP: the third Module Header was restored to *MODULE 03 · 0 of 9* on all 12 desktop and tablet Reading
  screens; it had regressed to *MODULE 01 · 1 of 3*.

## 2026-09-22 (evening) · Embedded PDF variant; the editor can align and colour after all

- New `Lesson Block · Kind=HTML (iframe · PDF)` — a pageable PDF inside the topic.
- Text Kind description lists the real Studio toolbar. Alignment, text colour, underline, inline code and
  font family all exist. The render recommendations are in `reading-screen-matrix.md` §14.
- Image Kind: alt text **or** "decorative only" is required in Studio, and `<figure>`/`<figcaption>` captions
  are in production use.
- All-content example: inline code added to the rich-text paragraph.
- After publish: the PDF variant sits in the all-content example under *Explore the tools*, after the Google
  Doc embed. The 3 podcast blocks show the cover-art poster and *-19:04*.

Needs a DS publish.

## 2026-09-22 (later) · Podcast poster is cover art; ORA covers all five Studio flows

- `Kind=Video (Audio)`: the poster is now podcast cover art rather than a person on camera, because a
  YouTube podcast is a still image with sound. Timer reads *-19:04*. The 7 swapped instances were
  force-refreshed after the publish.
- `LMS / ORA · Stepper`: new boolean **Show peer**, so Self only, Self → Staff and Staff only can be drawn.
- `LMS / ORA · Grade Panel`: new variants **Source=Self** and **Source=Staff**, where staff is the grader and
  not an override.
- The Studio component menu is mapped in `reading-screen-matrix.md` §13. Announcement, Anonymous User ID and
  Raw HTML all render as Text; Problem Bank and Library Content have no learner UI of their own.

Needs a DS publish.

## 2026-09-22 · Studio has no audio — podcasts are video now

From the review with Simran and her Studio screenshots (full table in `reading-screen-matrix.md` §13):

- **Audio:** no audio component exists. `Kind=Video (Audio)` is now a 16:9 video player; the 6 podcast players
  on the Reading and Discovery pages were swapped for it.
- **`LMS / Podcast · Player`** kept for a future audio feature, and fixed: controls wrap as two groups, time
  under the scrubber, no clipping from 640 down to 343.
- **Callout** is a platform alert, not authorable — removed from every screen that showed it as content.
- **Drag and Drop:** item bank moved above the board, as Studio renders it.
- **Descriptions** on 10 Kinds, Topic Header and Author now record what Studio does: type and duration are
  derived, image captions are a separate text box, file download is an add-on, the iframe source bar is ours.
- **Gap found:** ORA has no text-only response state.
- **Discovery learner view:** 12 notes hidden; exhibit notes corrected.

Needs a DS publish.

## 2026-09-21 · The iframe Kind stops printing its spec to the learner

`LMS / Lesson Block · Kind=HTML (iframe)` (`20985:534350`) shipped three lines of specification in learner
slots: *"Embedded external content"*, *"Google Doc · Sheet · Slides · Calendar · any external page"*, and a
caption reading *"Embedded · read-only · does not contribute to completion"*. Every new instance put them in
front of the learner until someone overrode them.

Now: a sample document title (*Control plan template*) and its source (*Google Docs*) inside the embed, and a
caption that says only what the learner can do with it — *Embedded document · read-only*. Same slot and
register as Video's *"Video · 6:12 · transcript available"*.

**Nothing was lost.** The allowed sources and *completion: none* were already in the variant description; a
note there now says why they belong there and not on the canvas.

**Done through `use_figma`, not the console bridge** — the bridge's plugin hung inside the DS file and would
not recover on reconnect. Worth knowing the second path exists.

Needs a DS publish; existing instances pick up the new defaults unless they already override them.

## 2026-09-11 · A scrollbar only where something actually scrolls

Measured every bar against its container — natural content height versus the visible box — and removed the
ones with nothing to scroll. **54 of 102 came out.**

| Page | Screens | Sidebar bar | Content bar |
|---|---|---|---|
| Reading | 16 | **0** | 11 |
| Video Lessons | 36 | 27 | **0** |
| Quizzes | 66 | 57 | **0** |

**Each page type scrolls in exactly one place, and it is a different place in each.** That only became
visible by measuring:

- **Reading** — the outline is 674 tall in a 964 sidebar, because only Module 01 is expanded. Nothing to
  scroll. The article column is what runs long, so the bar belongs there.
- **Video** — the reverse. Its sidebar has every module open and overflows by 82–139, while the content
  column measures **902 in a 902 box** exactly: the transcript and notes lists scroll *inside themselves* and
  already carry their own bars. A column bar there would have been a third scroll region that does not exist.
- **Quizzes** — full-page artboards, so only the sidebar is a scroll container at all.

**One measurement error, caught by the numbers being implausible.** The first pass reported Reading's mobile
content as `791/791 — no overflow` and stripped all four bars. The container it measured was `content`, but
the scrolling child is `scroll-area`, which is `Fill` and therefore always reports the box height. Measured
properly, those four overflow by **66 to 1,426px**. Bars restored. When a container is `Fill`, its height
tells you the viewport, never the content.

## 2026-09-11 · The scrollbar rule reaches Video and Quizzes

Applied across all three Ready-for-Dev pages. Sidebar bars now sit **12px below the Overall Progress** and
stop 8px short of the bottom, derived from each sidebar's own children rather than a fixed offset.

| Page | Screens | Sidebar bar | Content bar |
|---|---|---|---|
| Reading | 16 | 16 | 16 |
| Video Lessons | 36 | 27 | 29 |
| Quizzes | 66 | 57 | **0 — by design** |

**Quizzes get no content bar, and that is the finding.** Their frames are **1742px** — full-page artboards,
not viewport crops. The content column runs the whole length and scrolls *with the page*, so the browser's own
scrollbar serves it; a second bar inside the column would claim an independent scroll region that does not
exist. Video and Reading frames are viewport-sized (917–1056) with the content clipped and a nav pinned at the
bottom, so there both regions genuinely scroll.

**Three guards the sweep needed.** A collapsed sidebar rail has no `Module Header` and does not scroll — 2
screens skipped rather than given a nonsense 148px bar. One screen names its sidebar `LMS / Sidebar-ICP`
instead of `Sidebar`. And the note-editor and edge-case exhibits have no `Sidebar Container` at all.

### And the nav truncation was mine

*"Next: The cost of poor quality"* was clipping to *"Next: The cost of..."*. Not the scrollbar, and not the
publish — **I caused it** when I lengthened the label from *"Next: The define phase"*. The button sat at a
fixed 186px and the longer text did not fit.

The fix needed the rule we already had written down: **`Fill` inside a `Hug` parent keeps its authored width
instead of collapsing to content.** The button's `Text padding` was `Fill` at 138, so hugging the button
changed nothing until that frame was set to `Hug` too. Label now renders at 211 in a 263px button.

**Tablet could not take it.** At 632 the three-part nav gives each part 189, and 211 does not fit. The centre
`Info Container` is now hidden there as it already was on mobile — the topic title is in the header anyway,
and at 189 it was truncating too.

## 2026-09-10 · Blockquote and Key Takeaways swapped onto the components

The 9 Reading screens that carried hand-drawn `Blockquote` and `Key Takeaways` frames now use
`LMS / Lesson Block` instances — **18 swaps, zero local frames left**. Content was identical on all nine and
matches the component defaults, so nothing had to be re-typed.

**Found while swapping: one mobile screen was 32px narrower than its siblings.** `article-mobile`'s
`scroll-area` carried 16px of side padding on top of the 16 already supplied by `Sidebar Container`, so its
whole column ran at **311** while the other three mobile screens ran at 343. The same doubled-padding fault
as Video's `Section Header`, in a different place. Removed.

### A DS change landed mid-task and wiped the module counters

`LMS / Module Header` was rebuilt while this was in flight: the text nodes renamed to `Eyebrow`, the nested
`LMS / Module Info` removed, and an `Is completed` boolean added in its place. Renaming a layer **drops every
override on it**, so all 16 sidebars fell back to the component default — Module 03 was labelled
*"MODULE 01 · 3 of 3"* on every screen.

Re-applied by matching on **text content** rather than node name (`/^MODULE \d\d$/`, `/of \d/`), which
survives a rename. All 16 back to `MODULE 01 · 0 of 3 / MODULE 02 · 0 of 3 / MODULE 03 · 0 of 9`.

**Worth knowing: the rebuild may close an open gap.** The old `Module Info` had only *In progress* and
*Completed*, which is why a not-started module could not be expressed. An `Is completed` boolean plus a
counter says it directly. If that was the intent, the note in `Sidebar-ICP`'s description about the missing
third state can come out.

## 2026-09-10 · The 48px target lands — verified after publish

DS published and through. Final state across the 26 screens touched:

| | Size | Tab height | Row / box |
|---|---|---|---|
| Reading desktop & tablet (12) | sm | 32 | 189–191 in 1048 · 568 |
| Reading mobile (4) | **md** | **48** | 209–211 in 311 |
| Video mobile (10, light + dark) | sm | 32 | 309 in 311 |

**Three instances needed a nudge the library could not give them.** After the publish, the *active* tab
resolved to the new 48px variant while the *inactive* one still reported `paddingTop: 0` from the cached
`Current=False, Size=md` main — so three Reading screens had a 48 tab beside a 36 one. Toggling the variant
did not clear it. Set `paddingTop: 12` on those instance children, which is exactly the value the DS now
ships, so the override is identical to what will arrive and cannot diverge.

**Library updates do not land atomically.** Three components this session — `Sidebar-ICP`, `Topic Header`,
`_Tab button base` — each reported stale data in the consuming file well after the publish, and
`_Tab button base` came through *variant by variant*. Read the instance back before believing a publish
reached it, and expect a partial state in between.

## 2026-09-10 · Video's mobile column widens to 343, matching Reading

`Section Header` on the 10 Video mobile screens (5 light, 5 dark) carried **12px of side padding** on top of
the tab component's own 16, narrowing the row to 319 inside a 343 column. Padding removed; the tabs instance
now measures **343** with an inner box of 311, exactly like Reading.

**It fixed an overflow nobody had noticed.** At 319 the instance's own 16px insets left a content box of
**287**, while the three-tab row needs **309** — the row had been 22px wider than the space it was given.
Widening turns a silent overflow into 2px of slack.

**And the tabs now line up.** They previously sat 12px inside the topic title and the transcript rows below
them; at 343 all three share one left edge.

**What it does not fix.** Three tabs at `Size=md` need 344 against the new 311 box, so Video still ships at
`sm` with a 32px touch target. Closing that last 33px needs shorter labels — *Downloads* → *Files* saves
about 40 — since removing the component's own 16px insets would break alignment with everything below.
Reading is unaffected: two tabs at md are 211 in 311.

## 2026-09-10 · Mobile tabs stay tabs, and the touch target gets bigger

**The dropdown is gone.** All 4 Reading mobile screens and all 10 Video mobile screens (5 light, 5 dark) now
use `Horizontal tabs` instead of `LMS / Mobile Tab Select`.

**Width was never the argument.** Reading's two tabs measure 191px at sm, 213 at md, in a 343 viewport.
Video's three measure 309 in 319. Both fit. And 2–3 short labels is exactly the range the usual guidance
gives to tabs rather than dropdowns.

**The argument was the badge.** In the dropdown's Article state the control reads only *"Article"* — the
count vanishes. On desktop the tab says *Downloads 4* and the learner knows the files exist; on a phone they
had no way to find out. Only mobile users paid that, and they are the least likely to go looking.

**Touch target: `Underline` at `md` is now 48px.** Six variants of `_Tab button base` went from a fixed 36 to
hugging at 48, with the extra 12px added *above* the label so the gap between text and underline is
unchanged. `sm` stays 32 — desktop is a pointer and does not need it. 70 instances in the ICP use
`Underline + md`, all on WIP pages; the 2,048 on `sm` are untouched.

**Video cannot have both, and that is measured, not assumed.** Three tabs at `md` come to 344 in a 319
column — 25px over. `Full width=True` fits the row but crushes each tab to 85px while *"Downloads"* alone
needs 122, so the labels clip. Video therefore ships at `sm` (309, fits, no clipping) and keeps a 32px
target. Three ways out, none of them free: shorten *Downloads* to *Files* on mobile (~40px, and arguably
better copy), widen the mobile content column from 319 to Reading's 343, or let the row scroll. **Nelson's
call — the labels are on approved screens.**

**A trap worth recording:** changing `Size` swaps the variant and **drops text overrides**. One screen came
back reading *"My details"* twice — the component's default label — because I set the size after the text.
Variants first, text second, always.

## 2026-09-10 · Blockquote and Key Takeaways become Lesson Block Kinds

`LMS / Lesson Block` (`20328:3682`) goes from 9 Kinds to **11**: `HTML (Blockquote)` and
`HTML (Key Takeaways)`.

**They were hand-drawn on nine screens each** because nothing in the DS rendered them, and both are among the
most common things a Reading contains. `HTML (Callout)` was not a substitute — it resolves to
`LMS / Inline Alert`, a tinted alert with a glyph, which is a different object from a pull quote.

Built from the geometry already in use, on DS tokens: blockquote is `bg-brand-section` with a 4px
`bg-brand-solid` rule on the left; Key Takeaways is `bg-tertiary` with numbered rows whose number sits in a
fixed 16px column so the text edges align regardless of how many items there are.

Both are authored inside a single Text component in Studio, like every other HTML Kind — **formatting, not
separate blocks.** Written into the component description so nobody stacks one block per quote.

### Measured, for the mobile tabs decision

Two tabs (`Article` + `Downloads` with its count badge) come to **191px at Size=sm** and 213 at md, inside a
**343** viewport. Video's three (`Transcript · Notes · Downloads`) come to **309**, leaving 34. Horizontal
tabs fit on a phone with room to spare in both cases.

The catch is not width: tab height is **32px at sm and 36 at md**, against the 48px minimum touch target the
usual guidance cites. Whichever pattern wins, that needs fixing at source.

## 2026-09-10 · The demo course starts at zero, and the phantom slots are gone

**The 10 instances cleaned.** Every canonical page on Topic Content Types Discovery — VILT, Lab, Podcast,
ORA, Activity, Lesson Page, Reading, Quiz and the two Lesson Page exhibits — had the header's mark-status row
forced visible over an empty badge. Content column **914 → 1080** on all ten.

Done by setting visibility explicitly rather than waiting on the binding: the ICP's cached copy of
`LMS / Topic Header` still reported `{}` for the row's property reference well after the publish, the same
stale-snapshot lag seen with `Sidebar-ICP`. Explicit visibility gives the right result now and the binding
governs from here.

**The outline reads as a learner who has just started.** Modules 02 and 03 moved off *Completed* to
`Module In progress`, counters **0 of 3** and **0 of 9**. With Module 01 at 0 of 3 and the ring at 0%, every
number on the sidebar now tells one story instead of three.

**A note on what the component cannot say.** `LMS / Module Info` offers only *In progress* and *Completed*,
so "not started" has to be spelled as in-progress-with-zero. That is a reasonable reading of a counter at
`0 of N`, but it is a workaround: a module the learner has never opened and one they opened and abandoned
look identical. Recorded here rather than papered over.

## 2026-09-10 · The header's mark-status slot collapses with its contents

`LMS / Topic Header` (`19975:537676`). `Show Mark-Status-Badge` now drives **both** the badge and the row
that holds it. Before, only the badge was bound: switching it off emptied the row but left it hugging
**162px** of nothing.

**Invisible at 1440, fatal at 375.** On desktop the content column just gets 914 instead of 1080 and nobody
looks twice. At 375 it left the content **145 of 311**, and the meta line clipped to *"Reading · approx."* —
which had been recorded as a min/max problem needing the decision-CTA arithmetic. It was not. An empty
container still reserves its width.

**It also restores the rule.** The header slot is for the completed *status* badge, never the action — the
action lives only in the footer. With no badge there should be nothing in the slot, reserved space included.

**Blast radius, measured before the fix:** 100 `Topic Header` instances in the ICP, 97 with the badge off —
but only **10** were actually paying the tax, all on the Topic Content Types Discovery page (the canonical
VILT, Lab, Podcast, ORA, Activity, Lesson Page and Reading pages). The other 87 already inherited the
component's hidden default. **Nothing on the Ready-for-Dev Quizzes or Video pages changes.** Those 10 gain
166px of text width once the update is accepted — an improvement, and none of them is an approved deliverable.

**Still open at 375:** with the badge *on*, the content column drops to 209 and the title wraps hard. Whether
the badge belongs beside the title on a phone, or below it, is undecided and written into the component.

## 2026-09-10 · The outline can open any module

`LMS / Sidebar-ICP` (`19975:536883`) gains three booleans — `Show Module 01 / 02 / 03 topics` — on the
`Expanded` and `Mobile` variants. Each module now carries its own topic list.

**Why it was needed.** Figma will not let an instance reorder its own children, and the component was authored
with Module 03 expanded and the topic rows simply following its header. So no override could put the topics
under a different module — and every content type's demo topic sits somewhere different: Video's in Module 03,
Reading's in Module 01, per the article's own first sentence.

**Booleans, not a variant axis.** `State` already carries five options; a `Module Open` axis would have made
fifteen variants, most meaningless — the Collapsed rails show no outline at all.

**Nothing existing moved.** Defaults are 03 on, 01 and 02 off. Both variants came back at their original
heights (1062 and 954) and render identically, so the 680 Ready-for-Dev screens are untouched. Verified on a
throwaway instance, which was then deleted.

**The header and the boolean are separate on purpose.** The boolean shows the topics; the nested Module
Header's own `State` draws the chevron. Both must be set. Keeping them apart allows a header expanded on a
module whose topics have not loaded.

Modules 01 and 02 ship placeholder content (`Foundations`, `Lean thinking`). Rename freely — the structure is
the deliverable.

**Needs a DS publish and an accept in the ICP** before the Reading screens can use it.

## 2026-09-15 · Grades adopt the library component

`metadata-map §15.1b`. After peer review, the Progress tab's three hand-built grade components are replaced by
`LMS / Quiz · Grade Summary`, without touching the DS. Data, the passing-grade alert and the load-bearing
footnote carried across; annotations moved onto the instance's own sublayers, with four duplicated pairs
merged (25 → 21, nothing lost). The local components are left in place with 0 instances.

**It fits this screen and would not fit the next course** — two fixed table rows, four fixed breakdown rows,
a pass marker fixed at 70%, a bar in 10% steps. Library request 8.

## 2026-09-15 · The issued certificate, as a document

`metadata-map §16`. The file had a certificate *screen* and no certificate: nothing anyone would print or
file. Now it has one — **A4 landscape, one layout for print and digital**, built entirely from library logos,
text styles, SKO tokens and effect styles — with a board showing it as printed sheets and in a viewer, and a
thumbnail of it on the `Issued` certificate card.

**Every element is traced to the platform**, and two of them have no source yet: the partner logo (the open
*Partner brand* question) and a human-readable certificate ID. The signatories on the mockup are invented;
Studio's certificate configuration is where the real ones come from.

**And one assumption is corrected before anyone builds on it: Open edX does not generate PDF certificates.**
It renders web certificates at `/certificates/{verify_uuid}` and the learner prints or shares from the browser.
So the document is specified as a web certificate with a print stylesheet, and `Download PDF` is either
print-to-PDF or vendor work — six questions logged for the vendor and product.

## 2026-09-14 · Course Detail adopts the DS where the DS already has it

Navdeep's rule, drawn on the LMS components page: **exists in the SKO file → use the library; does not → peer
review.** Applied to Course Detail without promoting anything into the DS.

**Five local components against their nearest library match** — `metadata-map §15`. Topic row adopted (tested
at 560px first, and it brings the `Locked` state `accessible: false` needed); Thread row, Message and
Certificate card kept because the library ones do a different job; Grades adoptable once three gaps close; the
unused `_Remove · Banner` deleted.

**Every hand-drawn chip, avatar, button, filter and field that the DS already has is now an instance** — in
`Thread row`, `Message`, `Sidebar card`, `Grade meter`, `Date row` and the Q&A screen. Seven `Date row` text
overrides and four Q&A annotations were saved and restored rather than lost in the swap.

**It surfaced a library defect:** `Badge` `Color=Brand` is Untitled UI purple, bound to an unmapped
`Utility/Brand` token. Library request 7; our chips are `Gray` meanwhile.

## 2026-09-09 · The rebind is finished — 55 pages at zero

Every component page in the DS library is at **zero** outstanding bindings to `Colors (Remove)`, verified by
a counting pass that is separate from the runner that did the writing. `❖ BASE COMPONENTS 2` (22–38),
`❖ SHARED ASSETS` (40–45) and `❖ APPLICATION COMPONENTS` (88–113), plus the LMS and MobileApp pages that
were already clean.

**The earlier reading of the transport was wrong, and it cost time.** "Tranches of 40 do not land" described
one busy afternoon, not the API. The same runner then returned cleanly at 30, 40, 120, 200, 400 and 600
mutations per call. Sizing every tranche to a number observed once would have turned a two-hour job into a
two-day one.

**What replaces the guess is a runner that measures itself.** It carries a mutation budget and counts what
it did not reach in the same pass, so `stillLeft` is computed after the writes and survives a dropped
response. `0` means the page is provably done. That is trap 21; trap 20 is corrected to say an internal
timeout also lands its writes — one timeout at a cap of 40 had written 88 bindings before it was cut off.

**Three things are still open, and two of them are decisions, not work.** `Utility/*` (150), `Alpha/*` (20)
and `Components/*` (25) have no SKO destination, so `Colors (Remove)` still cannot be deleted. The screens
need a review pass — the rebind repaints Untitled UI stock ramps to SkillUp brand ramps, which is the point
of it and is visible. And the library remains unpublished; that is its owner's call.

## 2026-09-09 · Reading gets its screens — 16, across 5 scenario rows

Page `↳ Phase 1 · Reading - Ready for Review 🟠`, frame `5685:170871`. Full matrix in
[reading-screen-matrix.md](reading-screen-matrix.md).

**Reading is P0 — 84 topics, 30% of the program — and it had one screen.** A 1112 content column that had
never been placed in a device shell. Video and Quiz are both APPROVED with full scenario grids; this brings
the most common type in the catalogue to the same bar: Article, Downloads, completion states, the long-form
composition reference, and four edge cases, at 1440 / 960 / 375.

**The column that existed was already the right thing.** It *is* `Main Content` in the player shell — what
was missing was the topbar, the sidebar and the AI panel around it, and every state other than the happy path.

**A shell bug that would have spread.** `Main Content` came from the Video shell with
`primaryAxisAlignItems: CENTER`. When content is taller than the viewport that centres the overflow and clips
both ends — on tablet it silently removed the topic header and the tab bar. Fixed to `MIN`. Any future type
cloned from that shell inherits the same default.

**Two content defects caught by assembling it.** The canonical page had a Downloads tab counting 2 over a
list of 4. And at 375 the header meta truncates to *"approx. 8 mi"* — that one is inside `LMS / Topic Header`,
so it is a DS fix and is recorded rather than patched locally.

**One state drawn because the DS ships it, with no rule behind it.** `Topic-Status-Badge` has a **`Review`**
variant alongside Mark as Complete and Completed. Nothing defines when a Reading enters review. Drawn in
Row 3.3 so the question is visible; it either earns a rule or leaves the component.

**Locked is deliberately not drawn** — the API gives a boolean with no date and no rule, the same finding as
the unlock tooltip. Whether a locked topic page is reachable at all is unanswered.

## 2026-08-21 · What one HTML (Text) block can actually hold

Block `5507:152743` in the ICP section — a composed specimen, the list patterns on their own, inline
emphasis and links, and an element-by-element table of how each is authored and where it stops. From the
19 Aug session with Simran and Navdeep.

**The parity table said “Text → covered”, which was true in the wrong way.** It told a reviewer a component
exists and told a content creator nothing about what goes inside it. Bullets, numbered lists, nesting, links
and inline emphasis had never been drawn, so every one of them would have been invented at build time.

**One block holds all of it.** The first specimen is a single composed 592-wide Text component, not a row of
parts, because a creator does not stack a block per bullet — and a design that implies they should sends the
content team into a much slower way of working than the platform needs.

**The bullet is drawn, not typed.** `•` in Montserrat at 16px renders as a low mid-dot that reads as
punctuation. A browser rendering `list-style: disc` does not look like that, so the marker is a 6px ellipse.
Text indents 36px, the disc sits 9px down on the optical centre of a 24px line, level two indents 28px more
and goes hollow.

**No captions on images, still.** The insert dialog offers dimensions and alt text and nothing else, so a
captioned figure needs hand-written `<figure>` / `<figcaption>` against the `/static/` path. Any template we
ship with captioned figures ships with a copy-paste snippet, or it does not ship.

**Deliberately not drawn:** blockquote, horizontal rule, code blocks, alignment. TinyMCE offers some by
default; none was confirmed in our Studio on 19 Aug, and the whole point of this block is that it was checked.

## 2026-08-21 · The authoring inventory becomes a section a reviewer can open

`⚙ ICP — components and assets for topic creation` — `5497:151413`, next to the Technical section on
`Plaftorm Pages (SkillUp UI) - V8 - WIP`. Five blocks: the nine Studio tiles and what renders each, the six
Text templates, **177 live instances** of the published components grouped into five titled cards, and a
closing table of what is still open with whose call it is.

**Live instances, not screenshots.** The gallery instantiates the library, so republishing the DS updates the
section, and each specimen opens to its own annotation in Dev Mode — which is where the Drag and Drop mode
rules and the Zooming Image accessibility warnings actually live. A picture would have stranded both.

**Laying the variants side by side found a bug, then retired the component.** `ORA · Training Feedback`
was carrying a duplicated third row from a plugin timeout; the fix was overtaken within the hour. On our
platform that matched/mismatched readout is a **Dev-mode surface for internal testing** — a learner never
sees it. Deleted from the DS and from the gallery. It had been designed on the edX docs, which describe
Learner Training as a learner step, and the gallery is what made the mismatch visible: a component sitting
in the content team's kit, labelled as a learner feature, that no learner would ever meet.

**One consequence left open.** `ORA · Stepper` still carries a `Training` segment and a `Show training`
boolean from the same docs paragraph. If the step is equally dev-only, the stepper drops to four segments.
Left standing — that is a different question, and not ours to answer.

Nothing else in the **177 instances** is wrong.

**The four reference images stay** in the Technical section, kept for comparison against the frames that
replaced them.

## 2026-08-20 · The four gaps the doc sweep found, all closed

| Built | Result |
|---|---|
| `Quiz · Answer Input` | `Type=Math` added — 12 variants |
| `ORA · Stepper` | 5 segments, 5 step variants, `Show training` / `Show self` |
| ~~`ORA · Training Feedback`~~ | new — Matched / Mismatched · **retired 21 Aug, Dev-mode only** |
| `Lesson Block` | `HTML (Table)` — 9 kinds |
| `LMS / Zooming Image` | new — Idle / Zoomed |

**The maths preview is the component, not a flourish.** The learner types `x^2 + 2*x + 1` as plain text and
the platform renders it as formatted maths below the field as they type. That strip is how they verify the
expression parsed the way they meant — and since grading is by mathematical equivalence, two answers that look
nothing alike can both be correct.

**The ORA step numbers are placeholders, and the component says so in its description.** A course enables any
subset of the six steps; with training off, *Review 1 peer* is step 2, not 3. A static component cannot
renumber itself, so the rule is written where someone will read it: derive the numbering from the enabled
steps. Staff Assessment deliberately has no segment — it overrides the grade rather than being a step the
learner walks through.

**A table scrolls sideways at 375px rather than restacking into cards.** A table exists so columns can be
compared; stacking destroys the only reason to use one. The block clips and the table scrolls within it, so
the page itself never scrolls sideways. Pinning the first column is a build cost, specified only if a real
table proves unreadable without it.

**And a warning that matters more than the component it is attached to.** `Zooming Image` is **pointer-only** —
no documented touch or keyboard path, so on a phone and for a keyboard user the zoom is simply absent. Any
detail the image carries needs a second route: a caption, a table, or a full-size download. That sits on top
of edX listing the tool as unmaintained. Both are in the annotation, where whoever reaches for it will see
them before they commit.

**Two build notes.** `combineAsVariants` re-derived the variant property from the component names and produced
`Property 1` / `Property 2` on the Training Feedback set — renaming the variants back to `State=…` restored it.
And the plugin bridge resolves nodes in the **active** file, so screenshots of the DS only work while the DS
tab is in front; every component here was checked visually before being called done, and three defects were
caught that way — a half-built table row, a missing feedback row, and a step numbered 3 in position 5.

**Post-publish validation.** All eight components verified in the DS: correct variant counts, **0 raw paints**,
**0 unstyled text** — six unstyled nodes were found and fixed during the sweep, five of them in the
`HTML (iframe)` kind's source bar, which predated today and had been published that way.

**After the ICP accepted the update:** ORA Stepper 9 of 9 instances on the five-segment set, Lesson Block 11 of
11 on the nine-kind set, **0 broken**.

**And the check found something the update could never have fixed.** Only 3 of 12 `Answer Input` instances
moved to the new twelve-variant set. The other **nine are bound to a retired key** —
`af1bec9f…` against the live `f0baa477…` — a previous published version of the same component, from before it
was rebuilt into `Quiz — DS components (adopted)`. Figma keeps a retired component resolvable, so they are not
broken and never will be; they are simply detached from the component that is maintained, and no future
publish will reach them.

All nine sit in one place — `03 · Every state — single & multi select › board › C · Other answer types`. The
three that did update are on the mode B board. Swapping the nine restores them to the live component; it is
offered rather than done, because a swap can drop instance overrides and that board is Ready for Review.

## 2026-08-20 · What is inside each Studio tile, read off the official docs

The nine tiles were the wrong unit of measurement. A creator does not pick "Problem" — they pick *Numerical
Input*, or *Math Expression Input*, and those are different design problems. So every tile was opened against
the Open edX reference docs and its sub-types listed with edX's own support tier and mobile column.

**What it found, in order of consequence.**

**The Drag and Drop we shipped this morning is Assessment-mode only in two of its states.** The docs are
explicit: in Standard mode a wrong item **returns to the item bank** — it never rests in a zone. So
`Zone · Incorrect` and the card's `Incorrect` / `Partially correct` draw something the platform does not
render in that mode. The components are right; they were under-labelled. Annotation and description corrected.
Two more facts came with it: feedback is documented as appearing **above the background image**, and every
zone carries a **mandatory screen-reader description** — which promotes our "not designed yet" accessibility
note to a field with a requirement behind it.

**Our ORA stepper has three of the platform's six steps.** *Learner Training* (grade samples against the staff
answer before peers) and *Self Assessment* are both missing. Neither is a screen from scratch — the rubric and
grade surfaces already exist and each step reuses them.

**Math Expression Input is the only missing Problem type that matters.** Full support, mobile-ready, and it is
one variant on `Quiz · Answer Input`: a text field with the typed expression rendered as formatted maths above
it. The rest of the advanced list is author-supplied JavaScript or Python — no design surface — or in edX's
own "not supported" tier.

**Two open questions closed without any work.**

*Announcement* is not a component. It is the Text editor pre-filled with instructional text for the author;
nothing renders differently. And *Zooming Image* is real and documented with its own page — the "not
supported" tier means edX does not maintain it, not that it fails. That reframes the question for Simran from
*does it work* to *do we want the content team depending on an unmaintained tool*.

**And a boundary worth recording:** Poll, Survey, Word Cloud, Conditional Module, LTI and Peer Instruction all
exist in Open edX and **none appear in our grid** — this instance has no Advanced dropdown. Written down so
nobody designs for a tile the content team cannot pick. If it is ever switched on, Survey is the one to design
first: Full support, mobile-ready, and a matrix of questions sharing one scale is a real layout problem.

## 2026-09-08 · Correction: the dropped calls were landing all along

I wrote earlier that the `Buttons` rebind hit "real failures and not silent successes". **That was wrong, and
the way I checked was wrong.** I re-read the count after one oversized attempt, saw it unmoved, and
generalised from a single data point.

Smaller tranches land. **A dropped `use_figma` response on a large file is usually a lost response, not a
failed write.** Tranches of 8 and 20 landed every time; the tranche of 40 did not. Every call reported as
dropped.

**`Buttons/Button` is now at zero** — 123 → 0, done entirely through calls that all "failed". That is the
component the `Alert` consumes, so the one that mattered most. The `↳ Buttons` page went **914 → 789**.

The working method: **fire a small tranche, ignore the drop, repeat, and measure separately.** Recorded as
trap 20 in `figma-api-traps.md`, because treating a dropped response as a failed write is how you conclude
something is impossible when it is only slow.

The remaining 789 on that page and about 25 further component pages are not blocked — they are roughly 20
bindings per call, which is why `scripts/rebind-deprecated-tokens.js` still earns its place for the bulk.

Also recorded as trap 19: **property access on a leaf node can throw rather than return undefined.**
`textNode.findAll` raises a `TypeError`, so `node.findAll ? … : …` does not guard it — check `node.type`
against a container list instead. It cost two calls to find.

## 2026-09-08 · The rebind ran on what matters, and stopped where it could not

**Clean: `❖ LMS COMPONENTS`, `❖ MobileApp Component` and its two sub-pages, and
`↳ Alerts & notifications`** — zero outstanding bindings on every page our own work depends on.

**`↳ Buttons` still has 914, and I stopped trying.** Four attempts, four dropped connections, including one
capped at 250 mutations. Each time I re-read the count rather than assuming: it had not moved, so these were
real failures and not silent successes. About 25 component pages were never attempted for the same reason —
the heavy stock pages exceed what the remote transport carries in one call.

**What replaces the attempts:** `scripts/rebind-deprecated-tokens.js`, the same pass written to run from a
plugin console **inside the file**, where there is no transport timeout. One go, whole file, prints what it
changed.

It carries the three decisions this work arrived at, so they do not leave with the session:

- **Never rebind inside an `INSTANCE`.** That creates a permanent override which survives later changes to the
  main component. Instances follow once their component's own page is processed — which is why the numbers
  look small: 142 nodes on the Alerts page, 322 correctly skipped.
- **Skip the foundations pages.** `↳ Colors` is the swatch sheet that documents the deprecated collection;
  repainting it destroys the record of what those tokens were. It alone holds 7,356 deprecated paints, which
  is why the first whole-file estimate was so wrong.
- **Report `Utility/*`, `Alpha/*` and `Components/*` rather than guess.** `↳ Badges` alone has 1,835 bindings
  with no SKO destination — all colour ramps. Badges are the component that most needs the `Utility` decision.

And the check afterwards is not the outstanding count. **The rebind repaints stock ramps to brand ramps** —
the intended change, and a visual one. Screens get reviewed before the collection is deleted.

## 2026-09-08 · The semantic layer is complete — nothing left to author

The last **11 tokens**: `text-quaternary`, `text-placeholder`, `text-placeholder_subtle`, `border-tertiary`,
`bg-quaternary`, `bg-active`, `bg-primary-solid`, `bg-secondary-solid`, and the three `_alt` surfaces.

**46 semantic tokens and 2 primitives across three passes.** Coverage went from **36 of 281** to **74 mapping
by name, 5 safe renames, 7 empties to drop, and nothing left to write.**

**I changed my mind about the `_alt` surfaces.** Yesterday I proposed renaming them to `bg-on-dark` and
friends. They keep the `_alt` name inside the SKO namespace, with a description saying what it means — *a
surface that stays light in dark mode*. My objection was ever only to **folding** them into the ordinary
surfaces, which would have inverted them; the name is the Untitled UI convention and renaming it only breaks
the muscle memory of anyone arriving from there.

`border-secondary_alt` was literal `#000000`, not an alias. It now takes `Primary/950` DeepTeal — a visible
change, and a deliberate one, because pure black is not in the palette.

**The ladders verify.** Text is monotonic in both modes — 36 · 64 · 89 · 114 · 148 light, 240 · 190 · 160 ·
129 · 99 dark — with `quaternary` and `placeholder` sitting together on purpose.

**And two pre-existing oddities surfaced that are not mine to fix.** `bg-secondary_subtle` sits between
`bg-primary` and `bg-secondary` in light but goes *past* `bg-secondary` in dark — one of the two modes is
wrong about what "subtle" means. And `border-primary` uses `Neutral/400` in both modes, the only border that
does not invert with the theme.

One flagged before building and worth repeating: **`bg-active` resolves to the same value as `bg-secondary` in
light mode.** The deprecated set did the same, so a selected row and a secondary surface have never been
distinguishable. If they should be, `bg-active` wants a brand tint rather than a neutral — a product decision,
not a step.

Next is the rebind itself: 79 bindings by name and rename, one scripted pass, then a **screen review**,
because the rebind repaints from Untitled UI stock ramps to SkillUp brand ramps and a zero-bindings count is
not the test.

## 2026-09-08 · Hover and disabled, and two ramp steps that had to exist first

**17 semantic tokens created**, plus **2 primitives**. The semantic layer now covers the load-bearing
families: tones, hover, disabled, and the three base `Foreground` tokens SKO never had.

**The ramp had a hole exactly where the work needed it.** `Dark-Neutral` ran `300` → `600` with nothing
between, and disabled text belongs in that gap. `400` and `500` were **interpolated between the two anchors**
rather than invented — `#93a3ab · #73848c · #53666e · #33474f` — and `text-disabled` takes `500`. Before this
the only option was `600`, which is barely visible on a `#0e1a1f` surface.

Also authored: **`fg-primary`, `fg-secondary`, `fg-tertiary`**, which SKO did not have at all. Not optional
extras — a `fg-secondary_hover` without a `fg-secondary` is a hover state for something that does not exist.

**The check that matters**, contrast against `bg-primary` in both modes:

| | Light | Dark |
|---|---|---|
| `text-primary` | 15.30 | 15.50 |
| `text-secondary` | 10.32 | 9.51 |
| `text-tertiary` | 6.92 | 6.80 |
| `text-disabled` | 3.04 | 2.93 |

The ladder descends evenly rather than clustering, so the four levels are genuinely distinguishable — and
**light and dark track each other within half a point at every rung**, which is the real test of whether two
modes were authored together or separately.

`text-disabled` at ~3.0 sits below WCAG AA, **and that is correct**: 1.4.3 exempts inactive controls. Dim
enough to read as disabled, still perceptible.

Three that were dropped from the estimate on inspection: `text-brand-secondary_hover`,
`fg-brand-secondary_hover` and `bg-brand-solid_hover` are **empty in the deprecated collection** — no value in
either mode. And three component-scoped ones were excluded deliberately: if `toggle-button-fg_disabled` and
friends are recreated they belong in a `SKO/Components/*` layer, not mixed into the semantic one, which is
what the deprecated file did.

## 2026-09-08 · The tone tokens authored, and a rule that did not survive contact

**18 tokens created in `1. Semantics`**, so `error`, `warning` and `success` now have the same shape:
`bg-{tone}-secondary`, `bg-{tone}-solid_hover`, `border-{tone}` for warning and success,
`text-{tone}-primary_hover`, **`fg-{tone}-primary`** for all three, `fg-{tone}-secondary` for error and
warning, and focus rings for warning and success. Each with a value per mode, aliased to the
`SKO-Brand/Accents` ramps.

**And one correction.** `SKO/Effects/Focus rings/focus-ring-error` was aliasing `Colors/Error/500` — the
Untitled UI **stock** ramp, inside an SKO-named token. Now `SKO-Brand/Accents/Red/500`.

**Rule 1 held exactly.** `fg-{tone}-primary` resolves identically to `text-{tone}-primary` for all three tones
in both modes — checked by comparison rather than assumed. That was the rule doing the most work, since
`fg-{tone}-primary` is the icon colour every alert and badge in the library was reaching into
`Colors (Remove)` for.

**Rule 3 did not hold, and the verification pass is the only reason I know.** *"Secondary is one step in from
primary"* gave `/100` for each tone and produced a strong pink for error beside pale tints for warning and
success. **The Red ramp climbs far faster at the low end** — `Red/100` is a mid-tone where `Yellow/100` and
`Green/100` are still tints. Corrected to `Red/50`.

The lesson generalises: **a rule written as a step number assumes the ramps are parallel, and these are not.**
Any future "one step in" has to be checked against the rendered colour, not the index.

**One oddity inherited rather than introduced:** `border-warning` is `Yellow/300` because rule 2 makes the
solid border equal the solid fill, and `bg-warning-solid` was already `Yellow/300`. That leaves the warning
outline markedly lighter than error's and success's. Consistent with the rule, inconsistent with its siblings,
and changing it means changing `bg-warning-solid` — a pre-existing decision, so it is flagged rather than
overturned.

Next: hover and disabled, 23 tokens, which is the pair that unblocks `Buttons`.

## 2026-09-08 · The deprecated tokens cannot be removed — SKO covers 13% of them

Asked to migrate every component off `Colors (Remove)` now that the collection is confirmed for removal.
**I did not do it**, and the reason is a number.

| | |
|---|---|
| `SKO/Colors/*` tokens | **78** |
| `(Remove)` tokens | **281** |
| With an SKO equivalent | **36** |
| **With nowhere to go** | **245** |

The gap is not a tail of oddities. It is whole categories SKO has never had: 150 `Utility/*` colour ramps,
25 component-scoped tokens, 20 `Alpha/*`, 18 `_alt` surfaces, **15 `_hover`**, **8 `disabled`**, and the
`Foreground/fg-{primary,secondary,tertiary,error,warning,success}` family that every icon in the library uses.

SKO has **three** hover tokens in total and **no disabled tokens at all**. `_Primitives` has neither —
interaction states exist only in the semantic layer, and only in its deprecated half.

**I also did not migrate the 36 that do map**, which is the part worth arguing with. It would not help: a
component holding *one* deprecated binding still breaks on removal day, and every interactive component holds
several. Migrating the easy third would cut the token count, leave the breakage exactly where it was, and make
the remaining audit harder by mixing both families inside single components.

Scale, measured before stopping: **Alerts 300 deprecated paints, Buttons 1,442**, across 116 pages. Worth
doing once, correctly.

**What has to happen first:** someone authors the missing SKO tokens — hover, disabled, `_alt` and
`Foreground` at minimum, because those are load-bearing rather than decorative. After that the rebind is
mechanical and scriptable. Until then, removing the collection takes every disabled state, almost every hover
state, all overlays and all utility ramps with it.

A correction to yesterday's note while I am here: `Colors (Remove)` is **not** a separate imported collection.
It sits inside **`1. Semantics`** alongside `SKO/Colors/*` — three name families in one collection.

And an honest footnote on the Alert recolour: it moved the four bindings the Alert *owns* onto SKO, but the
component still inherits deprecated tokens through `Featured icon`, `Buttons/Button`, `x-close` and the icon
instances. Even that one is not safe from the removal.

## 2026-09-08 · Alert recoloured in the library, and a collection called "Remove"

All **24 variants** of the design system's `Alert` now carry a tinted background and a tone-matched border,
copied from `LMS / Autosave Status`, which already worked that way. Brand, Success, Warning and Error take
`bg-{tone}-primary` with `border-{tone}_subtle`; Gray takes `bg-secondary`; Default stays white so the two
neutrals remain distinguishable. Title on `text-primary`, supporting text on `text-secondary`.

Before this, every variant was white on the same neutral grey border — the tone lived only in the icon, so on
a busy page a warning and a success alert were the same rectangle.

**This is an edit to the shared library, and it is not published.** Figma library changes reach consumer files
only when someone publishes, so nothing has moved for anyone. That call belongs to the library owner, and it
is written down as such.

**One thing not copied.** The autosave stacks two stroke paints — `fg-{tone}-primary` underneath,
`border-{tone}_subtle` on top. Only the top one renders; the other is dead weight. The Alert got the visible
result with a single stroke rather than the inherited redundancy.

### The finding that outgrew the request

**`Alert` was bound to a variable collection named `Colors (Remove)`.** Background, border and both text
colours, all of them. Recolouring moved everything the Alert owns onto the live `SKO/Colors/*` collection — but
the deprecated one is still reachable through what the Alert nests: `x-close`, `Featured icon`,
`alert-circle`, `info-circle`, `check-circle`, and **`Buttons/Button`**.

None of that is the Alert's to fix. The question that matters is whether `Colors (Remove)` is actually
scheduled for removal, because if it is, every component still bound to it breaks the day it goes — and
`Buttons/Button` is one of them. Filed as request 3 in `library-requests.md`.

## 2026-09-08 · The Dates tab, built to what the payload can actually carry

New page — `↳ LMS / Dates — everything the payload can carry 🟠`. Two frames side by side: the full timeline,
and the two rows our courses return today. The comparison is the argument for the ruling that has been open
since §5.

**Eight date types, not two.** Read off `date_summary.py` rather than remembered: `todays-date`,
`course-start-date`, `course-end-date`, `assignment-due-date`, `course-expired-date`,
`certificate-available-date`, `verified-upgrade-deadline`, `verification-deadline-date`. Our courses return
two of them because `due` is null on every block — **a content gap, not an API gap.** The day someone sets due
dates, the tab becomes the left frame with no design change.

One component, `LMS / Dates / Date row`: four states (Upcoming · Complete · Overdue · Locked), five booleans,
every element a field.

**Six things the current tab drops and the payload already returns:** `description` (the course-end block
ships a real sentence), `assignment_type`, `complete` and `past_due`, `learner_has_access`, `link` /
`first_component_block_id`, and `dates_banner_info` — of which `missed_deadlines` is drawn, and drawn
**dismissible**, unlike the passing-grade notice: a missed deadline is news you finish reading.

**Two defects in the existing tab, found by building the full version.**

It renders the raw `date_type` string as visible copy — `course-start-date` sitting as a label on a page shown
to stakeholders. That is a debug artefact.

And the timeline was squeezed into 600px beside an **empty 320px sidebar**. The Dates tab has no sidebar
content, so the grid was giving away a third of the page to nothing. Full width here.

**Not built, because there is no field:** a countdown is derivable from `date` but is ours, not the platform's;
and `enrollment_start` / `enrollment_end` live on the Courses API and are absent from `course_date_blocks`, so
listing them means injecting from another call.

Page audited on the way out: 46 text nodes, zero without a DS style or bound type variable, zero raw colours,
zero unbound spacing.

## 2026-08-21 · Everything in the technical section is on a token or a style

Audited all 22 components and frames in the section — 235 text nodes, every fill, every stroke, every padding
and gap. The result before: **90 text nodes with no style at all**, 49 raw fills, 13 raw strokes, 67 unbound
paddings. After: **zero, zero, three, zero.**

**The text was the worst of it, and it was my own fault.** The board and the legend were built fast and I
invented sizes as I went — 10, 10.5, 11, 11.5, 12.5, 13, 15. None of those are on the scale. Every one is now
a DS style, snapped to the nearest step.

**And the audit surfaced a gap in the design system itself.** The text styles run Caption 12 → Body/Small 14 →
Body/Default 16 → Body/Lead 18 → **Display 72**. There is nothing between 18 and 72, so a page heading has no
style to take. Headings are bound to the `Type/size/*` and `Type/line-height/*` **variables** instead —
`text-xl` 20, `display-xs` 24, `display-sm` 30, `display-md` 36. That is how this DS does headings, and it is
worth knowing before someone else goes looking for a Heading style that does not exist.

**Colour found the sky blue again.** The hero's two decorative circles were `#51bffc` at 12% — the same
off-brand sky blue that turned up on the buttons during componentisation. Bound to `bg-brand-solid`, so the
wash is teal now. `#04313d`, a dark teal on the course title and stats, went to `text-primary`: numerically
`text-brand-primary` was marginally closer, but a course title is primary text, not brand-coloured text, and
semantics beats proximity.

**Three raw colours remain and they are deliberate** — the legend's four category dots. They match Figma's own
Dev Mode annotation colours, so binding them to brand tokens would break the thing they exist to mirror.

**Spacing: 214 values bound exactly, 84 snapped.** The snaps were all mine: 1→2, 3→2, 5→4, 10→8, 11→12,
14.5→16, 18→16, 22→20, 26→24, 28→24.

**Restyling broke the layout, which is the part worth recording.** Bigger type in fixed-width chips produced
*"QUEST ION"*, *"ANSWE RED"*, *"Sen d"*. Forty-seven text nodes needed to hug rather than wrap, and the grade
summary needed its column widths restored after the hug pass collapsed them. **Tokenising is not a
find-and-replace** — every size change is a layout change, and the only way to catch it is to look at the
screen afterwards.

## 2026-08-21 · One header, on all four tabs

The full course header — breadcrumb, chips, partner logo, title, stats and progress card — is now on Progress,
Dates and Mentorship Q&A, not just Course.

**Its annotations are not.** They were copied across, then reduced to a pointer, then removed entirely: the
header is the same eight elements on four tabs, so any copy is the same facts written four times and four
places to forget to update. It is annotated **only on the Course tab**; the inner tabs leave the header bare.
**89 annotations across 58 elements** — the copy-everywhere version reached 125 across 85 and said nothing
more.

The one durable fact that lived on the Progress header moved to the **Course completion card**, where it
belongs: the completion figure appears twice on that page, both readings of `completion_summary`, and they
must never drift. It is a note about the card, not about the header.

This reverses the slim-header decision from when Progress was built. The reasoning then was that the live
platform drops the header entirely on inner tabs — which is true, and is a defect rather than a precedent: on
the live Progress page nothing names the course you are in. A header that changes per tab is a header the
learner has to re-read, and every field in it comes from calls the platform already makes on every page load.

**And the constant header immediately found a defect.** With the same card on four screens, the hero read
*"14 of 42 topics"* while the Progress tab's completion card read *"16 complete · 26 incomplete"* — the same
`completion_summary`, two different numbers, on the same page. Fixed across all five frames to 16 of 42, which
is the 38% both were already showing.

That is the argument for the constant header in one line: **duplication that must agree will show you when it
does not.** The slim header hid the disagreement rather than resolving it.

⚠︎ On the Progress tab the header now genuinely repeats the page — the hero card and the completion card are
the same data. Annotated as a known cost rather than smoothed over, because making the header conditional
costs more than the repetition does.

The verdict key was tightened at the same time: **⚠︎ now also covers a claim that rests on the workbook and
has not been fetched**, and **✗ means verified against the platform**. That is the lesson of the sweep written
where the next person will meet it.

## 2026-08-21 · Every learner capability on the Q&A tab, and a sweep of the other ✗

**The Q&A screen now shows what the platform actually offers a learner.** Both components rebuilt and the
screen with them: search (`text_search`, and the response's `text_search_rewrite` gives *"did you mean"* for
free), filters that are query parameters rather than client work (`following=True`, unanswered = question
threads without `has_endorsed`), QUESTION / ANSWERED / FOLLOWING chips, an accepted answer marked in place,
STAFF author labels, follow toggle, an overflow rendered from `editable_fields`, and a composer with the
course's inherited anonymity option. 22 annotations across 14 elements, up from 4.

Two things put on the screen precisely so they can be argued with: **anonymous posting**, which is live
(`allow_anonymous: true`) and a strange fit for a conversation with your assigned mentor; and **votes and
report**, which exist in the API and are off by default, because upvoting your mentor in a private thread does
not mean anything.

### The ✗ sweep

Every remaining ✗ re-checked against the live environment, with one test: was this read off a payload, or off
the workbook?

**Two were wrong.** The **partner logo** — `GET /api/organizations/v0/organizations/` returns all 18
organisations with a `logo` URL, IBM included. And the **course-level duration** — the Courses API returns
`effort`, populated: `"4 weeks<br>2-4 hours/week"`. Both endpoints are simply absent from the workbook.

**Four hold, and now on live evidence rather than inherited.** `effort_time` and `effort_activities` null on
all 22 blocks; `due` null on every block, which is *why* Dates returns two rows; no mentor or instructor field
in any payload; and `icon` returning `null` on twenty blocks and `fa-pencil-square-o` on two — two values
against twelve types.

**One was never testable.** Nothing in this course is locked, so `accessible: false` never appears. The claim
that no unlock date exists is documented, not observed. It is now **⚠︎ untested rather than ✗ confirmed** — a
different thing, and it should not go into a meeting as the same thing.

**And five fields nobody had recorded**, one of which changes a design: `weekly_learning_goal_enabled` is
`false` on this course, so the Weekly goal card can be switched off per course — the same shape as
`disable_progress_graph`. Two sidebar cards now need a suppressed state. Also `hide_from_toc`, `title_prefix`,
`enroll_alert`, and a `cert_status` of `audit_passing` that the four-state certificate card does not cover.

### What the sweep says about method

Two of six ✗ verdicts were wrong and both failed the same way: **a gap in the workbook was recorded with the
same ✗ as a gap observed in a payload.** The verdict looked identical, the evidence behind it was not.
Everything checked directly against a response held.

So the fix goes in the verdict key rather than into more checking. **✗ now means "no source, verified against
the platform".** Anything resting only on the workbook is ⚠︎ until someone fetches it.

## 2026-08-21 · Correction: edX does have a discussion API, and it does most of this

Challenged on the claim that no learner-facing discussion API exists, and the challenge was right. **The
claim was true of the SK-11378 workbook and false of the platform.** The workbook documents two forum
endpoints and both are instructor role-management; I read that gap as a gap in edX. Reading a spreadsheet as
if it were the system is the exact mistake this document exists to prevent, and it went in as a verdict.

**Open edX Discussions API v1 is live and enabled on the dev instance**, verified against the real course:
`is_posting_enabled: true`, `provider: "openedx"`, `enable_in_context: true`.

**Nearly every field I marked ✗ on the chat screen exists.** From one call to
`/api/discussion/v1/threads/?course_id=`: `title` is the subject, `preview_body` the preview, `comment_count`
the message count, `read` and `unread_comment_count` the unread state, `author` and `author_label` the writer
— `author_label` returns `"Staff"` on live data — and `users.{username}.profile.image` the avatar in four
sizes. Replies come from `comment_list_url`. Posting is `POST /threads/` and `POST /comments/`.

**The Q&A primitive is native too.** A thread's `type` is `discussion` or `question`; question threads carry
`has_endorsed`, `endorsed_by`, `endorsed_at` and split replies into endorsed and non-endorsed lists. An
accepted answer is a platform feature.

**What the forum does not give is privacy, and there is a mechanism.** `group_id` is null on this course, so
every thread is course-wide. Divided discussions scope posts to a cohort; a cohort of one makes a private
conversation, and cohorts are API-creatable at enrolment. Three constraints, the first hard: divided
discussions **must be configured before the course start date** and cannot be retrofitted; dividing
course-wide topics forces dividing every in-context topic, so unit discussions stop being peer discussions;
and a mentor needs moderator scope, since a Group Community TA sees only their own group.

**What is still genuinely missing is the mentor assignment.** The forum says who wrote a post. It does not say
who is *yours*. That was open question 1 and it is now the larger gap, not the smaller.

Open question 5 was *"who builds the mentor messaging service?"* — which assumed the answer. It is now
**"mentoring on the forum, or a service of our own?"**: Route A is far cheaper and arrives sooner but pays the
three constraints; Route B satisfies 007 without asking a forum to behave like a private channel.

All fourteen annotations on the Q&A tab were rewritten. Section total **81 across 53**, and the legend now
says that where the workbook and the platform disagree, the platform wins.

## 2026-08-21 · Mentorship Q&A is a chat

The tab is settled, and it is decision 007 drawn rather than a new choice: 007 is accepted and says mentoring
is unlimited 1:1 asynchronous messaging, one mentor per learner, explicitly not group threads. The A/B
comparison is replaced by the thing itself — a conversation list and the conversation inside it.

Two components: `Thread row` (Unread · Read · Selected) and `Message` (From=Mentor · From=Learner).

**Why a list, when 007 gives one mentor per learner.** One mentor does not mean one conversation. Threading is
what keeps a question answerable — a single scrolling chat buries the answer to *"what subgroup size?"* under
three weeks of later messages. The list is the **Q&A** half of the tab's name, and the reason this is not just
the mentor card with a text box under it.

**Every field on the screen is ✗, and the annotations say so ten times.** Thread subject, preview, age, message
count, unread state; message author, body, timestamp, ordering; the composer and any attachment route — none
of it exists. The workbook documents two forum endpoints and both are instructor role-management. Two lines are
◑ rather than ✗, and both come from the business rules rather than an API: *"typically responds within 1 day"*
is BR-19, a promise we make; the fair-use nudge past 10 unanswered messages is BR-20, and is the only rule in
the tab that is already specified.

**The platform disagrees with the tab's name.** `tabs[]` returns `tab_id: discussion` — that entry points at
edX's forum. If this tab becomes a chat, the entry is repurposed or replaced, which is a platform decision.

**Two things the async ruling forbids:** presence, and a typing indicator. 007 chose asynchronous because the
friction it removes is calendar coordination. Anything implying the mentor is there right now contradicts the
decision and sets an expectation the one-day SLA does not back.

Open question 5 changed shape rather than closing. It was *"is Q&A a forum or 1:1?"* — that is answered. It is
now **"who builds the mentor messaging service?"**, owned by Engineering and Product, because the design is
settled and nothing implements it.

Section total: **77 annotations across 53 elements.**

## 2026-08-21 · The open questions get a board, and a sixth one

`Open questions — who owns each, and what closes it` (`6207:257477`), under the legend in the technical section.
The legend had been listing five questions as one-liners, which is enough to remember them and not enough to
act on any of them.

Each now carries three lines: **why it is open**, **what closes it**, and **what it blocks**, with an owner
against the question itself. "Open" on its own does not tell you who to call — that was the whole problem with
the list.

| # | Question | Owner |
|---|---|---|
| 1 | Who supplies the mentor? | Product · SkillUp platform |
| 2 | Who authors `effort_time`? | Content team |
| 3 | Does the unlock tooltip stay? | Design · Product |
| 4 | Dates: tab, or the sidebar widget? | Product |
| 5 | Is Mentorship Q&A a forum, or 1:1? | Product — not design |
| 6 | Do we derive the topic type, and what happens to the title prefixes? | Product · Content |

**Six is new**, and it exists because of the dev-environment session. The topic type *is* derivable from
Blocks v2 at the cost of one extra call — that part is good news, and it closes a finding that has been open
since `blocks.{id}.icon` turned out to be unusable. But it collapses twelve ICP types into five, and the
authors are already compensating by writing the type into `display_name`: a real title in the dev course is
*"Video: Podcast: Job Roles, Career Path and Growth"*. Derive the badge without deciding what happens to those
prefixes and every row states its type twice — the exact duplication the verb ruling had just removed.

Two of the six changed character this week rather than being new. **4** and **5** used to be flagged in prose;
both now have a page showing the options, so the board points at a drawing rather than at a paragraph.

## 2026-08-21 · The annotations are about edX, not about our components

A scope correction, and it removes work rather than adding it. Every annotation on these pages should answer
one of two questions — **does the platform do this**, and **can we get the data**. They are about our design
against edX. Which component we built something from is design-system housekeeping and belongs in the
component description, not on a page a stakeholder reads.

**Six annotations removed** across the mirrored pages: *"should be an instance of the library `Input field`"*
— which was also stale, since the swap happened days ago — and the mentor card's *"inverted by pinning the
variant to `Dark mode SKO`"*.

**Two were rewritten to keep the rule and drop the housekeeping.** The course-ended alert said *"Library
`Alert`, Code Connected to `InlineAlert.tsx`. The course-ended tone must have `X close button` off…"*. It now
says: **a warning about a permanent condition must not be dismissible** — `has_ended: true` does not turn back,
and a close button removes information the learner cannot get back. Same rule, no library. The Progress tab's
passing-grade notice got the same treatment, and split into the two facts it was carrying: the threshold
rewrites itself from `grade_range`, and the notice must not be dismissible.

**One was reclassified rather than cut.** The lock tooltip's note that the lock *must be a focusable control,
because a hover-only tooltip does not exist for keyboard or touch*, was sitting under Interaction. That is an
accessibility requirement and a functional one — it moved to Accessibility, which is now the only annotation
in that category and correctly so.

Section total: **71 annotations across 50 elements** — Development 45, Content 14, Interaction 11,
Accessibility 1. The scope rule is now written into the legend itself, so the next person adding a note has
the test in front of them.

The distinction matters because of who reads this. A stakeholder deciding whether a tab ships does not care
which library the alert came from. They care that the warning cannot be dismissed.

## 2026-08-21 · The Progress page brought up to density

`⚙ TECHNICAL · Progress tab` goes from **17 annotations across 11 elements to 27 across 19**. The section
total is now **64 across 41**. What was missing was the detail level the Course tab already had: the tables
were annotated as blocks, not row by row, so the things a developer actually asks about were not on the page.

Added: the slim hero and why the chips are hidden; the search control; the grade-summary header and which two
of its four columns are **derived** rather than fetched; the free-text hazard on `assignment_policies[].type`,
with the real payload's `"Final Quiz "` trailing space; the total row equalling `course_grade.percent` and the
warning not to recompute it independently; the section and subsection rows with their `jump_to` url and the
**four gates** that decide whether a score is shown; and why the sidebar carries Certificate and Weekly goal
where the platform puts a Related links card pointing at its own tab bar.

**The session's findings were folded into the two cards**, which is where they will actually be read:

- **`disable_progress_graph` can switch the completion card off** — a per-course config flag verified on the
  live payload. The card needs a suppressed state. A design that assumes a component the course can disable is
  a design that breaks on some courses and nobody knows why.
- **`user_has_passing_grade` is a top-level boolean** alongside `course_grade.is_passing`. Both answer the same
  question. Decide which the build trusts before they disagree.

The legend was recounted off the file and its footer corrected — it still claimed un-annotated twins live in
the main section, which stopped being true when v12 took the annotations and the Progress v1 frame was deleted.

## 2026-08-21 · The annotations go back on the working screen

`★ ENTRY · Course Detail — v12` now carries the same **37 annotations across 22 elements** as the technical
page. Nothing had been deleted — the counts on `⚙ TECHNICAL · Course tab` were intact the whole time — but
moving the annotated twin into its own section left the screen people actually work on looking bare, which is
the same thing from where the user was standing.

**The original reasoning was wrong and it is worth naming why.** v12 was left unannotated so there would be
"the same page without the engineering, for when the conversation is about the design rather than the data".
But **Dev Mode annotations do not render in Design mode**. The clean view never needed a second copy to buy it
— you get it by not being in Dev Mode. We paid a real cost for a benefit that did not exist.

Copied node-by-node: 28 matched on structural path, and five needed a second pass on name and content because
the two trees have diverged — v12's module rows sit directly under `Container:margin` where the technical page
has an extra `Container`. One of those five landed on the wrong node first (the verb-rule note went to the hero
container at y=0 instead of the expanded module at y≈848) and was moved. Worth recording as a method: after a
name-only match, **compare the two annotation orders by y-position** — the mismatch is visible instantly and
invisible any other way.

⚠︎ **Two copies now exist and Figma cannot keep them in step.** Annotate the technical page when they diverge
and re-copy; do not maintain both by hand.

**The section is now a comparison.** Under each of our screens sits a screenshot of the platform as it is
today — ours above, theirs below. That changes what the section is for: not "here is the annotated design" but
"here is what changes, here is the field behind each change, and here is what you have today".

`Course Detail — Progress tab · v1` was deleted; the annotated `⚙ TECHNICAL · Progress tab` is the only copy
and carries the design as well as the notes.

**Confirmed again: the `Instructor` tab is staff-only.** It appears in `tabs[]` only for users holding the
role, which is why it shows in a screenshot taken as Staff and never will for a learner. Nothing on it is ours
to design.

## 2026-08-21 · The topic type is derivable, and five fields we had never seen

Ran the dev-environment verifications with a session, against the real course from the live Progress
screenshot. Six results, written up as §12.5.

**The topic type can be derived.** `block_counts` comes back on all 84 blocks, and **26 of 27 verticals
resolve to a single child type** — the one exception being the Final Project, which is `html` +
`openassessment`, genuinely two things. One extra call to Blocks API v2 buys the badge. That question had been
open since `blocks.{id}.icon` turned out to return only `null` and `"other"`.

**But it collapses twelve ICP types into five.** The whole course uses `html`, `problem`, `video`, `scorm` and
`openassessment`. A derived badge can say Reading / Video / Quiz / Interactive / Peer-graded honestly. It
cannot say *Podcast*, and it cannot tell a Lab from an Activity.

The authors already know. A real title in this course is **"Video: Podcast: Job Roles, Career Path and
Growth"** — they are writing the type into `display_name` because the platform has nowhere else to put it.
Deriving the badge without deciding what happens to those prefixes gives every row its type twice, which is
the duplication we just spent a day removing.

**Bookmarks is real** — 200, paginated, zero rows for this user. The Course tools card has a source. ✓

**`jump_to` is verified with a vertical id** — it resolves to `{sequential}/{vertical}` in the MFE, finding the
parent itself. The ⚠︎ on constructing topic deep-links becomes a ✓.

**Dates returns two blocks on a real course too** — start and end, nothing else. §14.2 was read off the
workbook; this confirms it live.

**And the live Progress payload carries five fields the workbook sample does not**, one of which changes a
design: **`disable_progress_graph`**. It is a config flag that hides the completion graph, so the Completion
card needs a state for a component the course can switch off. Also `user_has_passing_grade` (a direct boolean,
where we had been deriving from `is_passing`), `verification_data`, `studio_url` and `username` — the last two
confirming the response is role-dependent.

**The chain closes.** `complete_count: 1 / incomplete_count: 26` → the live page's **4%**;
`course_grade.percent: 0.15` → **15%**; `grade_range {Pass: 0.7}` → **70%**; Final Exam 0.5 / Final Project 0.5
→ the **50/50** table; 2 graded subsections of 14 → **one module, two lessons** in Detailed grades.

Which caught a defect in our own screen. The completion card read *"38 complete · 4 incomplete"* next to
**38%** — that is 90%. It now reads `16 complete · 26 incomplete · 0 locked`: 42 topics, matching the Course
tab, and 16/42 = 38%. A card whose own two numbers disagree is worse than one with no numbers, and nobody had
noticed because nobody had done the division.

## 2026-08-21 · The technical pages get their own section

`⚙ TECHNICAL · Progress tab` (`6207:257333`) — the Progress tab annotated the same way the Course tab was:
17 annotations across 11 elements, in three of the four categories.

What it puts in front of a stakeholder that the design page cannot: completion and grade are **two different
numbers** and the card copy has to say so; **70% is `grading_policy.grade_range`**, not a sentence someone
wrote; `subsections[].url` is a working `jump_to` link, **unlike the syllabus**, where the Navigation API
returns null on every vertical; **four separate gates** decide whether a score is shown, so a row can be
present with its score withheld; and the meter's geometry is **drawn, not data** — the one note that stops a
developer measuring the artboard and shipping the sample's 15% as a constant.

**Both annotated pages moved into a new section** — `⚙ Technical — every element, its field, and whether we
can build it` (`6207:257303`) — together with the legend. Two reasons: the design pages stopped being read
through engineering notes, and there is now more than one technical page, so "the technical page" had stopped
being a thing you could point at.

The frames lost their long names in the move: `⚙ TECHNICAL · Course tab`, `⚙ TECHNICAL · Progress tab`,
`How to read this section`. The section title carries the explanation now, so the frames do not have to.

**The legend was rewritten for two pages, and the counts were read off the file rather than remembered** —
54 annotations across 33 elements, Development 32, Content 12, Interaction 9, Accessibility 1. Its closing
list went from three questions to five: the Dates ruling and the Mentorship Q&A contradiction both belong in
front of the same room as the mentor and `effort_time` questions.

One small thing worth recording: **the ⚙ glyph does not render in Montserrat** and had to come out of the
legend's canvas text. It survives in layer and section names, which Figma draws in its own UI font. Same
family of failure as ✅, already in `figma-api-traps.md`.

## 2026-08-21 · The other four tabs, and the one we cannot draw

The page had five tabs and one of them was designed. Mapping the other four turned out to need no new
research: the payloads for **Progress** and **Dates** were in the workbook all along, on the *API Information*
sheet, as APIs 4 and 5. Written up as §14.

**Progress is built** (`5482:4574`), from four new components — `Completion card`, `Grade meter`,
`Grade summary row`, `Score row`. The numbers are the workbook's own sample, so the table can be checked
against the payload instead of admired. The live page was the reference and confirmed the mapping: completion
and grade are two different numbers in two separate cards, the 70% threshold is `grading_policy.grade_range`
rather than copy, and *Detailed grades* lists only graded sections — which is why its footnote pointing
elsewhere for everything ungraded is load-bearing.

Five places we did not copy the platform: the live tab has **no hero at all**, so nothing on it names the
course you are in; its **Related links** card offers two destinations already in the tab bar above it; it
reports `locked_count` and renders only two of the three counts; its passing-grade notice is **dismissible**;
and its sidebar carries links where ours carries Certificate and Weekly goal — the two cards that answer the
questions this tab raises.

**Dates is a whole tab for two rows.** `course_date_blocks[]` is a well-formed timeline with links and a
complete flag, and on our courses it returns `course-start-date` and `course-end-date` and nothing else,
because `due` is null on every block. A dedicated tab reading *"Course starts"* and *"Course ends"* will be
read as broken. That forces the ruling flagged back in §5 — sidebar widget or tab — and the honest default is
to keep the widget and not render the tab until content authors set due dates.

**Mentorship Q&A cannot be drawn, and not for want of an API.** `tabs[]` returns `tab_id: discussion` titled
*Mentorship Q&A*: the platform's **discussion forum**, renamed. Decision 007 is accepted and says mentoring is
unlimited **1:1 asynchronous messaging**, explicitly not group threads. A forum is many-to-many by
construction. So the tab is not the mentoring the product decided to build, and *Message David* on the mentor
card has no 1:1 endpoint behind it.

Drawing threads now would be guessing which side wins. Either mentoring is the forum and 007 needs revisiting,
or it is 1:1 and needs a SkillUp-side service no Course Home API provides. That is a product decision, so the
tab stays undrawn and the question goes back to the room.

**Live, Recordings and Instructor** are specified in §14.4 and §14.5 — the first two real and out of MVP by
Harpreet's ruling, the third fifty endpoints of staff administration a learner never sees.

## 2026-08-20 · The verb goes, and the tooltip was in the library too

**The verb prefix is retired from every topic type.** Titles now render `display_name` verbatim — *DMAIC
fundamentals*, not *Checkpoint · DMAIC fundamentals*. The rule that kept it on consequential types justified
itself with "the icon already says how you consume them"; the type is now a labelled badge, and that same
sentence removes the verb everywhere. Four titles changed across the two screens.

The three-way comparison on the components page keeps all three options and now records which was taken —
board 2, chosen. Its old objection (*"but look at row 6"* — a checkpoint that stops announcing itself) is
answered by the badge, which states the type once in the place where every row states it.

**It also removes a dependency nobody could have satisfied.** A verb prefix is not a field. Something would
have had to derive `Checkpoint ·` from a type the outline does not send — `blocks.{id}.icon` is four documented
values against twelve catalogued types, and returns only `null` and `"other"` in practice. Rendering the field
as-is needs nothing.

**`Tooltip` adopted from the library** — fifth adoption on this page, after `Breadcrumbs`, `Badge`,
`Horizontal tabs` and `Input field`. Ours was a hand-drawn dark pill with a hand-drawn caret; the library ships
`Text`, `Supporting text` and a seven-position `Arrow` axis. Taken as `Supporting text=False, Arrow=Top center`
and anchored under the locked module row in both screens.

**The functionality is now documented on the technical page**, which was the point of adopting it rather than
just swapping it. What the tooltip does: hover or focus the lock, get why the module is closed and when it
opens; dismiss on blur. What that requires: the lock must be a **focusable control**, because a tooltip that
only appears on hover does not exist for keyboard or touch. What the API gives: `accessible: false`, a boolean,
and nothing else.

So *Unlocks 28 Apr 2026* is drawn copy with no field behind it. Three ways out, in order of cost — drop the
date and say only that the module is locked; derive it from course `start` plus a pacing rule the content team
owns; or add a field to the outline, which is a platform change. **Until one is chosen, build it without the
date.** The boolean supports "Locked". It does not support "Unlocks 28 Apr".

## 2026-08-20 · One scale for both rows, and a rule that now argues against itself

**Padding and gaps bound to the spacing scale.** `Module row` (all six variants) and `Topic row` (both) now
take every padding and gap from `Spacing/*` instead of raw numbers — `lg` (12) for the row insets, `lg` for the
module's gap, `md` (8) for the topic's, `none` for the topic's horizontal padding, `xxs` (2) for the module's
title/meta gap. No value changed, so nothing moved on screen; what changed is that they can no longer drift
apart silently.

`Topic row` also gets a bound `minHeight` of `6xl` (48), which is exactly its natural height — a real floor.
**`Module row` deliberately has none.** Its 68px is derived (12 + 24 + 2 + 18 + 12) and is not a step on the
scale; the nearest step below is 64, and a floor at 64 would never engage. A constraint that can never bind is
a claim the file makes and does not keep, so it is better absent. Heights built from tokenised parts do not
themselves need to be tokens.

**The 24 examples on the components page were all still `Reading`.** Seventeen corrected. They sit on four
boards, three of which are the verb-prefix comparison — the boards whose entire subject is how a topic's type
gets communicated. Arguing that question with every badge showing the same wrong word was worse than useless.

### And now the verb rule argues against itself

With the badges correct, the three boards say something they could not say before. The rule we closed reads:

> The verb stays where the type is *consequential* — Quiz produces a grade, counts attempts, has a deadline.
> Descriptive types drop it; **the icon already says how you consume them.**

That justification was written when the type was an *icon*. It is now a **labelled badge**. Applied
consistently, the same sentence removes the verb from the consequential types too: *Checkpoint · DMAIC
fundamentals* next to a badge reading **Quiz** is the identical duplication we rejected in *Read · Introduction
to the DMAIC methodology* next to **Reading**.

Board 2 — bare titles, as the API returns them — is now the only one of the three that does not say the type
twice. That is a decision for the room, not a change to make quietly, so nothing was changed. But the board
now makes the argument on its own, which is what it was built for.

## 2026-08-20 · The open module looked exactly like the closed ones

`Module row` gains an `Expanded` axis — six variants now, `State` (Complete / Incomplete / Locked) crossed with
`Expanded` (False / True). Disclosure and progress are orthogonal, so they are two axes, not one.

**The defect this exposed.** Module 3 has been drawn open since v10, and its row was pixel-identical to the
closed ones: same chevron, same rotation, same full border and radius. The affordance was lying, and the open
module read as two stacked boxes rather than one card. Expansion was never in the component at all — it was a
sibling frame assembled by hand next to the row.

**Followed the library's idiom rather than inventing one.** `LMS / Module Header` — the sidebar equivalent,
which already exists — uses one `chevron-down` at rest and *the same icon rotated 180°* when open. Ours now
does the same, which also fixes our closed rows: they pointed right, off-convention, against a library that
points down.

**Did not adopt `LMS / Module Header` itself.** It is 280px, borderless, two-line, with neither the status
circle nor the lock — both of which carry API meaning here (`complete`, `accessible: false`). It is a sidebar
component for a sidebar. Taking the convention without taking the component is the right amount of borrowing.

**`Locked × Expanded=True` is unreachable** — a module with `accessible: false` serves no topics. It exists
because Figma sets cannot express a conditional axis, and the component description says so.

**A new silent-success trap, and a file to keep them in.** `clone()` on a variant inside a component set drops
the `componentPropertyReferences` that point at the *set's* properties, while keeping those that point at a
nested instance's own — so the damage looks partial and plausible. Three variants came out with three bindings
where they should have seven, and the symptom was Module 3 rendering *"Module 1 · Foundations of Six Sigma"*
while its Title property read correctly. Counting bindings per variant found it; reading the code would not
have.

All nineteen of these now live in `figma-api-traps.md` rather than in a scratch file under `/tmp`, which is
where they have been sitting and where they would have been lost.

## 2026-08-20 · Every topic row said "Reading"

The topic rows now carry an explicit `LMS / Topic-Types Badge` — a deliberate change, but the values had been
left at the component default, so all fourteen rows across both screens read **Reading**. Including
*Checkpoint · DMAIC fundamentals*, which is a Quiz, and *Lab · Running the analyse phase*, which is a Lab.

Recovered the intended type from **v11**, which still names its rows (`Topic row · Video`, `· Quiz`) and still
carries the verb prefixes (`Watch ·`, `Read ·`) that v12 drops. Ten instances corrected:
Reading / Video / Video / Video / Reading / Quiz / Lab.

**A default that looks like data is worse than an empty slot.** Nothing on the screen said "unset" — every row
made a confident, wrong claim about what kind of thing it was. Same failure the `Course stats` programme row is
built to avoid, arriving from the opposite direction: there a default asserted a field that does not exist,
here a default asserted the wrong value of a field that does.

**And it raises the cost of the open topic-type finding rather than lowering it.** `blocks.{id}.icon` is
unusable — four documented values against twelve catalogued types, and only `null` and `"other"` in the actual
payloads. While the type was an icon, vagueness was survivable. Now the row says the word, and a wrong
derivation will be wrong in plain English.

Also fixed a stale **"ten content types"** in §5 that the earlier correction pass missed — the line directly
above it already said twelve.

## 2026-08-20 · The hero was the last thing drawn by hand

Course Detail is now built entirely from components. The hero — breadcrumb, chips, title, thumbnail and the
stats sub-header — was the part that had resisted, and closing it took **three new components and four
adoptions from the library**. Of seven pieces, three were ours to make.

Adopted: `Breadcrumbs`, `Badge`, `Horizontal tabs`, `Input field` — all from ❖ SKO Design System.
Built: `LMS / Course Detail / Section intro`, `… / Course stats`, `… / Course title`.

**The library keeps being ahead of us.** `Badge` already ships a `Type=LMS Topic Types Badge` variant — the
exact badge the topic rows use. That is the third time on this page that something we were about to build
already existed under a name our searches did not reach, after `Marker` → `LMS / Completion Status` and
`Banner` → `Alert`. The lesson is not "search harder"; it is that searching by *what a thing looks like* fails
when the library names things by *where they are used*.

**A default is a claim.** `Course stats` has a programme row — `Course 2 of 6 · Cohort Apr 2026` — that reads
like metadata but has no source in any Course Home API. It is a boolean defaulting to **false**, so the screen
cannot quietly acquire a field that does not exist; someone has to turn it on and name the service that fills
it. Same correction we made to `Dismissible` on `Alert`.

**What the counts say.** v12 is 30 top-level instances, 21 ours and 9 from the library, and the only loose
text left is the unlock-tooltip callout — a note about the design, not part of it. The technical page moved
from 38 annotations across 23 elements to 36 across 21: replacing the title block removed the `Image` node
and its two annotations about `course_image_urls`, and both facts were folded into the `Course title`
annotation rather than dropped.

Also filed `library-requests.md` — two requests to the library owner: `Alert`'s `Breakpoint` axis is misnamed
(it controls stacked-vs-inline, not viewport), and a permanent warning needs a `Persistent` variant so it
cannot be dismissed.

## 2026-08-20 · Drag and Drop, the one Studio tile we had never designed

The goal behind this is free assembly: a creator should be able to build a topic any way they like and find
every piece already designed. Measured against the nine tiles in our own **Add New Component** grid, seven
were covered and **Drag and Drop had nothing at all** — while being auto-graded and mobile-ready, so a creator
could ship it to phones today on our silence.

**Three components** in `5 · Assessments · Quiz`:

| Component | Variants |
|---|---|
| `LMS / Drag and Drop · Item` | Idle · Dragging · Placed · Correct · Incorrect · Locked |
| `LMS / Drag and Drop · Zone` | Empty · Hover · Filled · Correct · Incorrect |
| `LMS / Drag and Drop · Card` | 6 states + booleans for prompt, item bank, feedback, footer |

Every fill and stroke is bound — the state language is lifted straight from `Quiz · Option Row`, so correct is
the same green and selected the same brand tint a learner already knows from a quiz.

**Three decisions worth naming.**

**The two modes are the footer, not a variant.** Standard gives feedback per drop and has no Submit;
Assessment submits once, with attempts and best-attempt-wins. Encoding that as a variant axis would double the
set to express something the existing `Footer Actions` boolean already says.

**The zone stops drawing chrome once it is filled.** From then on the item carries the state and the zone adds
only a ring. Two components colouring the same thing is how a system starts disagreeing with itself.

**The board background is author-supplied content**, so it ships as a labelled placeholder rather than an
invented diagram. Drawing a fake process map would have made the component look finished and taught the
content team nothing about what they have to provide.

Left undesigned on purpose and written into the annotation: the drag ghost, keyboard placement (the XBlock
supports it), and the per-drop screen-reader announcement. Interaction spec, not decoration — they need a
decision first.

**A Figma rule the visual check exposed.** The first pass gave the item bank and the feedback alert boolean
properties. On screen every variant then showed the same thing: an unanswered board with a feedback alert, a
graded board still offering items to place. **A boolean property's default outranks each variant's own layer
visibility** — one default, six states, and the states could not disagree with it. Both properties deleted;
the bank and the alert are now consequences of `State`. Only `Show platform prompt` and `Show Footer
Questions` remain as booleans, because those are genuinely per-instance choices.

The same check killed the zone ring on Correct/Incorrect: the zone and the item were both drawing the same
green, which is exactly the doubling the annotation forbids. The zone now draws nothing once filled.

## 2026-08-15 · The outline sidebar stops growing with the page

A sidebar that stretches to 4,000px says the outline scrolls with the page. It does not — the outline and the
content column are two scroll containers, each clipping its own overflow and carrying its own bar. The
delivery boards had been drawing the opposite, because the sidebar was set to fill a container that hugged
the full page height. On the tall A-1 screens it reached 4,176px.

**Pinned to one viewport, on every desktop and tablet screen:**

| Device | Viewport | Sidebar | Scrollbar |
|---|---|---|---|
| Desktop | 1440 × 900 | 808 | 6 × 623 |
| Tablet | 960 × 1024 | 932 | 6 × 747 |
| Mobile | 375 × 812 | — | the outline is a drawer, not a column |

**The bar covers the scrolling region, not the sidebar** — Nelson placed one by hand and the geometry gave the
rule away. It starts below the course header and the overall-progress block, which are fixed at the top of the
outline: `top = sidebar top + 170 + 7`, `bottom = sidebar bottom − 8`. A full-height bar would claim those two
blocks scroll with the list.

808 = 900 − 60 topbar − 32 padding. The numbers are read off the player-shell crops, not invented, so the
boards and the shell section now state the same thing.

**42 screens across the three frames; 21 mobile screens untouched.** The frames stay as tall as their content
— that is deliberate and documented — so the sidebar now ends mid-page with the quiz continuing below it.
That is the point: it is the only static drawing that says *the outline stops here, and what follows is more
page, not more outline.*

The shell section's own table said the delivery frames could not show any of this. Half of that is no longer
true, and the cell now says which half.

**The rule now lives on `LMS / Sidebar v2` itself**, as a third annotation alongside the two that were
already there, and as a line appended to the component description so it shows in the Assets panel. It gives
the numbers, the arithmetic behind them, the CSS, and the instruction that matters when someone places an
instance: set the height, keep clipping on, add the bar — **do not let it Fill a page-tall container**. That
last sentence is the one that would have prevented this.

## 2026-08-14 · A-2 is the build target, and the page is reorganised around that

Navdeep's decision, reached by reframing the whole argument as one question: **is the purpose of this quiz to
teach, or to measure?** A-2 measures — the learner answers everything before any feedback arrives, so no
answer is influenced by an earlier correction. B teaches — every question becomes a mini lesson. A-2 also
matches how every existing course is already authored, so it costs authoring and no build.

**A-1 is rejected**, on the grounds that per-question feedback during an assessment is precisely the thing
A-2 exists to avoid. **B is parked, not dead** — buildable, and revivable by a teaching-shaped quiz, which is
a content-team call. Rupali, Simran and Saransh are being asked for that input.

**The page is reorganised.** The two mode-A versions were sharing one frame in two columns; they are now
separate frames, in decision order:

| Frame | Screens | Status |
|---|---|---|
| `ICP Phase 1 - Quiz (A-2) - Light` | 18 | **Ready for DEV** |
| `ICP Phase 1 - Quiz (A-1) - Light` | 9 | In progress |
| `ICP Phase 1 - Quiz (B) - Light` | 36 | In progress |

Then the player shell, the journeys, and the kit. **The kit stays shared** — the components are the same in
all three, which is the point of having had them.

Every header band rewritten to say which version it is and why it is where it is, and all 27 card changelogs
carry the 14 Aug decision. The chip on a parked card reads `In progress`; the band carries the real reason,
because a chip cannot say "parked pending a content-team decision".

**One thing the status sweep exposed.** Six of the mobile cards did not follow the instance swap: their
`Status Tag` had the words *Ready for DEV* typed straight onto the text node, from the day we marked
everything ready. Swapping the status component underneath changed nothing visible. Same lesson as the CTA
overrides, in a different costume — **a typed override outranks the component and stays silent about it.**

## 2026-08-14 · Option Row marking corrected, the LMS token layer closed, and a voice rule

A long working session across the Figma page, the DS library and the prototype. Four things settled
and three left open.

- **`Missed` and `Correctly unselected` do apply to radios — the DS note was wrong.** The Option Row
  property table and the component description both claimed they were multi-select marking with "no
  meaning on a radio". Counting the Ready-for-Dev page finds **16 `Missed` on radios and 8
  `Correctly unselected`**, so the screens use both. Both notes are corrected in Figma. The marking:
  the right answer the learner did not pick is green with **no tick** and the text marker *"This
  should be selected"*; a tick reads as praise and they did not earn it.
- **Feedback carries the score in A-1 and not in A-2.** The card is the problem in A-1, so it prints
  `Correct (1/1 point)`. In the bucket one score covers the whole set, so per-question alerts stay
  bare and the number sits on the problem header (`5 points possible` → `3/5 points`). A per-question
  score there would invent a figure the API never returns.
- **The LMS token layer now covers the components.** 75 components audited; 97 bindings that reached
  into the Untitled UI base collection were rebound to LMS tokens, and **seven tokens were created**
  to close real gaps: `text-brand-tertiary`, `border-error`, `border-error_subtle`,
  `border-warning_subtle`, `border-success_subtle`, `border-brand_subtle`,
  `fg-success-secondary`. All alias SKO-Brand primitives with light and dark. This is not cosmetic:
  the base tokens carry no brand and diverge in dark mode.
- **Voice: say what comes next, not what is missing.** Shell copy that reported an absence now
  carries an expectation — *"Your instructor hasn't attached any files"* became *"Files will appear
  here as your instructor adds them"*. Two exceptions, deliberate: **warnings keep their force**
  (submit-is-final, the SCORM mobile caveat, the activity-server error), and **learning content is
  untouched**, because quiz feedback and lesson copy use negation to teach. No em dashes.

**Open, and none of them ours to close:**

- **A-1 attempts are counted per quiz, not per question.** Each A-1 question is its own CAPA problem,
  so the counters should be independent; today three submissions leave the counter at `1 of 2`, and
  Reset then re-submit does not advance it. Raised rather than fixed — it changes behaviour.
- **`09-handoff-map.md` and `06-quiz-screen-matrix.md` do not exist.** Both were cited as sources of
  truth; the `quizzes/` folder runs `00`–`05`. Work proceeded from the Figma page, which is
  priority 1 in that same list.
- **12 genuine paint overrides remain** on quiz instances in the Phase 1 file (7 Option Row, 5
  Question Card). A further ~1,340 base-collection bindings sit inside the nested Untitled UI
  `_Checkbox base`; rebinding those means forking a vendor component, which is a different decision.

## 2026-08-13 · Decision CTAs stretch on narrow containers, and it took two numbers not a variant

Full-width CTAs on mobile looked like it needed a mobile version of every component carrying a decision. It
does not. It needs `min-width` on the buttons and `max-width` on the row.

**New component — `Action Row`** (page `↳ Button groups`, variants `Actions = 2 | 3`). A wrapping flex row
whose `cta-slot` frames carry the minimum and whose buttons fill their slot. Swap the button, inherit the
behaviour. Measured: 279 → 279 / 279 stacked · 560 → 184 / 184 · 1032 → 184 / 184.

**`LMS / Quiz · Entry Header` — formula applied to all four variants.** Buttons Fill + `min-width 184`,
`Action` row `max-width 376`. Timed exam runs wider because its primary label is: 292 / 184 → 484. Measured
on the component: 311px device → **263 / 263 stacked**, 600 and 1080 → 184 / 184 side by side.

**Three things the file taught us, all verified:**

- `min-width` and `max-width` **cannot be overridden on an instance**. They are authored at source or they do
  not exist. This is why the fix could not be applied only in the ICP file.
- They **can** be set on a button instance you place yourself. The restriction bites only when the button is
  a child of someone else's component.
- `resize()` on a child inside a wrapping container is refused, and `Fill` inside a `Hug` parent does not
  collapse to content width — it inherits the authored width. Neither is a route to this behaviour.

**Not applied to `Buttons/Button` itself, on purpose.** 161 variants, and `min-width` cannot be overridden —
a floor on the button is law everywhere, which would make a compact toolbar or a table-row action
impossible. The value that triggers the wrap depends on half the container, which is context the button
cannot know. The button may deserve a small universal minimum one day; it is a different number from this
one.

**`LMS / Quiz · Results` — the note keeps the row, and the buttons stack under it when the room runs out.**
Row horizontal + wrap + space-between; note Fill with `max-width` at **its own natural width**; the action
slot Fill with `min-width` at **the widest button** and `max-width` at the content sum, wrapping; buttons Fill
with `min-width` at their natural label width. Measured (Not passed): 311px → note 244 on one line, then
**263 / 263 stacked** · 600 and 1080 → note 244 · 166 / 121 side by side, as before.

**Two numbers carry it.** The note's max-width is what stops it ever needing a second line *and* what hands
the leftover space to the actions — because **Figma's `Fill`, like `flex: 1`, divides free space equally
between siblings and treats min/max as the only way to bias it**. Measured: two siblings with mins of 180 and
246 in a 534 row come back 259 / 259, not 226 / 292. The slot's min-width is what forces the row to wrap
rather than crushing the actions while the buttons overflow.

**The bug underneath three failed attempts:** we capped the note at 223 — the width it had been *compressed*
to inside the old layout — instead of its natural 244. It wrapped to two lines the moment it had its own
line, which read as a layout failure and sent us restructuring the row twice, first to vertical and back.
Cap a text at what it measures while hugging, never at what it measures while being squeezed.

Component canvas widened 582 → 620 so the widest variant fits on one line in the preview. Instances are Fill,
so no screen changes.

The local patches on three mobile instances in the ICP file (hug, no-wrap, and the shortened `Retry (1)`
label) were reverted after the republish: an instance override outranks the component and does not disappear
on publish, so a stale hand-fix silently contradicts the real fix.

Both components and the affected rows are annotated in Figma with the formula and how to extend it.

## 2026-08-05 · Explanations exist, and the wrong answers never get one

Tested all ten questions of the course the vendor named as *the* example of the explanation functionality.
The split is total: **10 out of 10, no exceptions.**

- **Correct answers** (Q1, 3, 6, 8) get a real explanation of the idea. The writing is good — it teaches
  rather than restating the answer.
- **Wrong answers** (Q2, 4, 5, 7, 9, 10) get *"Please revisit the “…”"* and the name of a video or VILT
  recording. Never an explanation.

Six redirects, five distinct targets, every one a title in quotation marks with no link. The learner reads
the name, leaves the quiz, opens the outline and hunts for it.

**This reframes proposal B2.** "Are explanations worth the authoring cost?" is the wrong question — the
authoring is already happening, and it is competent. The real question is **why the learner who got it wrong
receives a redirect while the learner who got it right receives the explanation.** That is authoring
guidance, not platform capability, and it costs a house rule rather than a project.

**It also reopens the review affordance, in a better shape than the one we retired.** We dropped the
per-question review action because the shell can only resolve the parent module, so the label overpromised.
Still true. But the authors are not pointing at modules — they are naming an individual video or session, per
question, by hand. The demand is precise and already written into the content. What is missing is not a
button; it is a machine-resolvable way for an author to say which topic to revisit. That belongs on the table
with the vendor as a content-model question.

## 2026-08-05 · The quiz-level Submit exists, and it is authoring

Audited the two courses Simran supplied. They use **two different authoring models**, which turns out to be
the choice we have been arguing about for weeks without knowing it had a name.

| | SKOAIFP01 | SKOADM01EN / AZ-204 |
|---|---|---|
| `problem` blocks per quiz | **one** | one per question |
| Questions inside a block | **ten** | one |
| Submit | **one for the whole quiz** | one per question |
| Attempts | **3, pooled across all ten** | 2, per question |

**This corrects a claim we have carried since July and had on the board as a hard limit.** "Open edX has no
quiz-level Submit" is true of the *subsection* — `seq_block.py` has no submit handler, and that stands. It is
not true of a quiz as a learner meets it. A CAPA `problem` can hold many response elements, and then it
renders one Submit, one Save, one attempts counter and one score. Verified by reading the block: ten real
question stems, one `submit btn-brand`, *"You have used 0 of 3 attempts"* covering all of them.

**So the thing we said would need custom development is already in production, and it cost authoring.**

It also answers Nelson's question from 3 Aug — *are attempts for the whole quiz or per answer?* We said per
answer, always. The accurate answer is **per problem, and a problem can be the whole quiz.**

**The trade-off is real and not adjustable per question.** The bucket buys one Submit, pooled attempts and a
single score. It costs per-question feedback — nothing can be revealed until the whole set is submitted —
along with per-question attempts and per-question Reset. Per-question buys immediate feedback and independent
retries, which is what makes formative practice work, and gives up the single Submit.

Written up as `04-quiz-experience-spec.md` §11, with the consequence for our two modes: **A must reproduce
whichever model the quiz it imitates actually uses**, and the bucket deserves naming as a third option in its
own right, since it delivers part of B's value with no design work at all.

Also observed: **multi-select is in use** — the SKOAIFP01 practice quiz has a checkbox question, so it is no
longer zero in anything we have audited. And practice quizzes show unlimited attempts, no Save and no
counter, exactly as `should_show_save_button()` predicts.

**Still open:** the explanations. `<solution>` content is not sent to the client before submitting, so seeing
a real authored explanation means spending an attempt on Nelson's own record. Not done without asking.

## 2026-08-06 · Next question comes back — I had removed it for the wrong mode

Nelson spotted two gaps in the journeys, and the first is a reasoning error of mine worth stating plainly.

**I removed `Next question` from every state, on the grounds that there is no next question.** That is true
of **mode A** — every question sits on one scrolling page, so there is nowhere to advance to, and its
Previous/Next move between *topics* and leave the subsection. It is **not** true of mode B, which is a
stepper: one question per screen, and advancing is the entire point.

Worse, the Stepper Bar carries **Back but no forward control**. So between removing the button and building
the journeys, mode B had no way for a learner to move on at all. The gap was structural and I had built three
journeys over it without noticing.

Restored as `Show next action`, **default on**, because on is mode B:

- **Primary** on `Correct`, `Partially correct`, `Answer revealed`, `Results withheld` — the question is
  resolved, advancing is what is left.
- **A link** on `Incorrect`, with **Try again staying primary** — with attempts left, retrying is the
  encouraged action, not moving on.
- **Off in the mode-A preset**, where it would be a lie.

**Show answer turned on where the platform would actually offer it**, rather than everywhere or nowhere:

| | Where it appears |
|---|---|
| Practice, mode B | from `Selected` onwards — practice leaves `showanswer` open, and there is nothing to protect |
| Graded / Final, mode B | only on `Last attempt` and `Answer revealed` — that is `answer_available()` |
| Mode A | only once the answer is already correct |

Never on an untouched mode-A question. That was the 3 Aug finding we retracted, and it stays retracted.

**And the counter now says which question each step is.** Twenty steps across the three journeys were all
reading the component default of "Question 4 of 7" regardless of where they sat. Each now names its real
position, and the progress bar fill is set to match rather than contradict it — a bar at 60% beside
"Question 1 of 5" is the kind of detail that quietly tells a stakeholder the screens are not real.

## 2026-08-05 · The review page carries the journeys and nothing else

**The review page is now one section: the canonical flows.** Everything else — the ten differences, the state
catalogue, the edge cases, the pass mark, the open questions, the start-here — moved back to Topic Content
Types, which is where discovery, history and archive belong. A review surface should ask one thing of the
people looking at it.

**And the journeys are now exhaustive**, organised by *route* rather than as a single happy path. Twenty-two
routes across the three types:

| Type | Mode B routes | Mode A routes |
|---|---|---|
| **Practice** | right first time · wrong then right · asks to see the answer · multi-select partly right | right first time · wrong · the end |
| **Graded** | right first time · saves and comes back · wrong then right · **wrong twice → answer revealed** · multi-select partial · score not ready | **the Save trap** · wrong · the course ends |
| **Final** | right · wrong · **score held back + correctness suppressed** · **timed: running → 20% → 5% → expired** | one attempt, no explanation · blocked or closed |

The Graded band is the largest because it is the only type where a learner can be wrong and recover — six
routes in mode B against Final's four.

**Three defects caught in the pass, all mine, all from the rebuild:**

- A mode-A card was showing the stepper bar again — and again it needed both the property *and* the layer
  cleared, because the clone had carried a manual override.
- **Twenty-five local components on the review page.** The `Worklist checkbox` is a local component, not from
  the design system, and it came along with the worklist frame. Moved out with the rest of the discovery
  material.
- `Results withheld` was missing from every journey, so the state that suppresses correctness *and* score was
  absent from the page whose job is to show all combinations. Added to the Final band with the reason:
  `show_correctness` hides right and wrong along with the number, so the learner cannot tell which answers
  landed.

**Final verification, both pages:**

| | Review | Discovery |
|---|---|---|
| Question cards | 30 | 22 |
| Mode A showing the bar | **0** of 10 | **0** of 3 |
| Mode B showing the bar | 20 of 20 | 4 of 19 *(state specimens stay bare)* |
| States in use | **all nine** | all nine |
| Broken instances | 0 | 0 |
| Local / non-DS components | **0** | 25 — the worklist checkbox, deliberate and now only here |
| Show answer on untouched | 0 | 0 |
| Reset on a correct answer | 0 | 0 |
| Section overlaps | 0 | 0 |

**Design system:** ten quiz component sets, nine card variants, no malformed names, no sets in error, no raw
colours, no emoji, no hand-drawn buttons or pills, every documented state present.

## 2026-08-05 · Exhaustive audit — six defects, all from the same two hours

Applied the new `Saved` state to the graded journey in both lanes, then audited every quiz component against
the behaviours our own documentation records. **Six defects, every one introduced by the additions made in
the previous two hours** — which is the argument for auditing after a burst of changes rather than trusting
that each one landed.

| Defect | Cause |
|---|---|
| `Saved` had Skip, Save and attempts **unbound** | Cloning a variant does not carry property references |
| `Partially correct` had **two** Show answer buttons | A timed-out script had partially completed, then the retry added a second |
| `Answer revealed` offered Show answer | Already pressed; the first pass added it before I decided to skip it |
| `Results withheld` offered Show answer | `show_correctness` suppresses the answer along with the score |
| A mode-A card showed the stepper bar | The `Saved` clone carried `Show progress` on |
| …and the same card again, via a **manual layer override** | Setting the property was not enough — the layer had been forced visible |

**The state catalogue was incomplete too.** `03 · Every state` had fifteen specimens and no `Saved`, so the
newest and most dangerous state was missing from the page whose whole purpose is completeness. Added as A9,
with the warning that saving scores zero.

**Final state, verified across the whole review page:**

- 43 question cards · 12 in mode A, **none showing the stepper bar** · 31 in mode B, 16 showing it
- All nine states in use across the page
- Zero broken instances, zero section overlaps
- Zero Show answer buttons on untouched questions — the retracted 3 Aug finding stays retracted
- Zero Reset offered on a correct answer — the platform's protection is intact

**Design system:** ten quiz component sets, nine card variants, no malformed names, no sets in error, no raw
colours, no emoji, no hand-drawn buttons or pills, and every documented state present.

*One correction to my own audit:* I first flagged the nine `Answer Input` variants as malformed because their
names contain commas. Commas are legitimate when they separate **two properties** — `Type=X, State=Y`. The
real rule is that every comma-separated segment must contain an `=`, which is what broke
`State=Saved, not submitted`. The check now tests that.

## 2026-08-05 · Two states the platform has and we had never drawn

**`State=Saved`.** The platform renders it — `has_saved_answers` and `save_message` are both in the template
context, and the learner sees *"Your answers have been saved but not graded."* We had no state for it, which
is why the graded journey had to use a plain `Selected` card for the step where a learner saves and moves on.
It now carries a warning alert saying what saving actually means: **stored, not graded, scores nothing until
submitted.** It is the most dangerous state in the quiz precisely because it looks like progress.

**`Show answer action`.** Nelson asked whether mode A has a Show answer CTA. It does — `answer_available()`
is passed into the template as its own flag, and we saw the button live once a question closed. The component
had no such control at all, in either mode.

Added as a boolean across seven of the nine states, **default off**, and the description says why it is not
free-floating: it appears only when `answer_available()` is true, which on our courses means the problem is
**closed** — attempts spent or past the course end date — **or the answer is already correct**.

> That caveat is the whole point of adding it carefully. *"Show answer is available before any attempt"* is
> exactly what we recorded on 3 Aug and later had to retract: it was an artefact of auditing a course that
> had ended. Putting the button on an untouched mode-A question would bake that retracted finding into the
> design system.

**Left off two states on purpose:** `Answer revealed`, where it has already been pressed, and
`Results withheld`, where `show_correctness` suppresses the answer along with the score.

In mode B it becomes difference 3 on the board — a deliberate policy per quiz rather than a default nobody
chose.

*Recorded for next time:* naming the variant `State=Saved, not submitted` put the whole set into an error
state. **Figma parses commas in a variant name as property separators**, so the comma read as a second,
malformed property. Same failure class as the missing `State=` prefix earlier — and both present as "nothing
about this component can be read."

## 2026-08-05 · Section 02 rebuilt as journeys, not inventories

Nelson's correction: what I had built was **three vertical stacks of components**, not journeys. A stakeholder
cannot read a stack — there is no sense of what follows what, and none of the branching that makes a quiz
interesting. What was needed was a flow diagram drawn with finished screens.

**Rebuilt as one band per type, each with two lanes.** Mode B runs along the top as the proposed journey;
mode A runs beneath it, the same journey degrading. Reading down a column answers *"and what does that look
like today?"* at every single step, which is the comparison the whole page exists to make.

| Type | Journey |
|---|---|
| **Practice** | opens → answers → right → **gets one wrong** → tries again → right at the second go → finishes |
| **Graded** | opens → answers without submitting → **wrong, one attempt left** → tries again, right → another question, **both attempts spent → answer revealed** → results |
| **Final** | opens → answers → right → **wrong with nothing left → answer revealed** → results, **or the score withheld** |

**The branches are the point.** Each type is the same quiz with a different consequence for being wrong, and
until now that difference was described in prose rather than shown. Practice can retry forever; graded gets
one recovery and then the answer; final gets none.

**Mode A carries the findings inline**, at the step where a learner would meet them: the missing entry screen,
the Save trap with its "saved but not graded" message, the empty space where an explanation should be, the
second submit refused until Reset, and nothing at all at the end. The Final lane also reaches a closed
question — attempts spent or past the course end date — because that is the state that cost us two days.

Every screen is a real component instance on the mode-A or mode-B preset, so the journeys stay true when the
design system changes. The legacy canonical mock and the worklist moved out of the way rather than being
deleted.

## 2026-08-05 · A review page for the quizzes

New Figma page: **`↳ Phase 1 - Quizzes - Ready for Review 🟠`**, in the READY FOR REVIEW group beside the
other review surfaces.

**The four quiz sections were MOVED, not copied.** We had spent the day removing duplicate catalogues on the
grounds that two copies always drift; building a review page by copying 04.3 would have recreated that within
a day. The Topic Content Types page keeps the other content types and quizzes now have their own surface.

**Seven sections, ordered as a narrative rather than an archive:**

| | |
|---|---|
| 00 · Start here | The switch, the four costs, what no configuration will give us, how to read the rest |
| 01 · Mode A vs Mode B | The ten differences *(moved)* |
| 02 · Canonical flows | **Three types × two modes — six flows** |
| 03 · Every state | Single and multi select *(moved)* |
| 04 · Edge cases | Blocked, timed, closed *(new)* |
| 05 · Pass mark | *(moved)* |
| 06 · Open questions | Split by who owns the answer *(new)* |

**The new build is the mode-A row of flows**, which did not exist. Each runs Topic Header → *no entry screen*
→ stacked questions on the mode-A preset → *nothing at the end* → topic navigation, with the absences drawn
as dashed callouts because an empty space reads as an unfinished drawing rather than a finding.

**And the types differ inside each mode, which the old section flattened.** Practice has unlimited attempts
and therefore **no Save button** — `should_show_save_button()` hides it deliberately, since submitting costs
nothing. Graded has two attempts and Save. Final has one. That difference is now visible rather than
described.

**04 · Edge cases exists because two of its states cost us two days.** We audited a course that had ended and
read three findings off it that were all artefacts of the closed state. The section leads with that, and with
the save trap and the two-step retry — the states nobody demos and everybody eventually meets.

Validated: mode A carries no stepper bar anywhere, mode B carries it in every flow, no broken instances, no
section overlaps.

## 2026-08-05 · Full validation — the quiz work closes clean

Verified both files after the final publish.

**Design system, twelve quiz component sets:** zero raw colours, zero emoji, zero drawn buttons or pills,
zero malformed variant names, zero sets in error. `LMS / Quiz · Stepper Bar` is mode-B only, present in all
eight Question Card variants and bound to `Show progress`. Defaults are the mode-B preset.

**ICP, four sections:**

| Section | Mode A | Mode B | Topic navigation |
|---|---|---|---|
| 04 · three types, mode B | — | 4 cards, all with the bar | Previous-Topic / Next-Topic |
| 04.3 · every state | — | 15 specimens, no bar | — |
| 04.4 · pass mark | — | — | — |
| 04.5 · A vs B | 3 cards, no bar | 2 cards with the bar | Previous-Topic / Next-Topic |

Zero stray bars, zero broken instances, zero section overlaps.

**One thing worth recording from the validation itself.** I twice reported a "stray" bar that was not stray:
both times the containing card had been **renamed** — `Quiz · Question Card` in the canonical mock — so a
name filter missed it and the node then refused to delete because it was nested inside an instance. The error
message *"Removing this node is not allowed"* was the thing that revealed the real structure.

**The rule, now applied consistently:** identify instances by `getMainComponentAsync()`, never by
`node.name`. Instance names are overridable and in this file several are. Every check in this pass was
rewritten that way, which is also how the last three false readings were caught.

## 2026-08-05 · The mode-A nav was never quiz navigation

Nelson caught a real design error, not a tidiness one. I had built `LMS / Quiz · Nav` with two variants, the
A one being the Previous/Next at the foot of a quiz page. **That is navigation between topics and modules.**
It leaves the subsection entirely — it is not quiz navigation, and giving it a quiz-branded component implied
the platform can step through questions, which is the one thing it cannot do without re-authoring.

- **`Mode=Stacked · A` deleted.** The component is now `LMS / Quiz · Stepper Bar`, mode-B only, living inside
  the Question Card under `Show progress`.
- **Column A now uses `LMS / Course Progression Button`** — `Previous-Topic` / `Next-Topic` — the control the
  rest of the course already uses. Its note says plainly what it is and that it leaves the quiz.
- The DS demo's A group no longer shows a quiz nav at all.

**Applied along with it:** mode B cards carry `Show progress: true` and the standalone bar is gone, since the
card provides its own. Mode A keeps it off. State specimens in 04.3 stay bare — position is not a state.

*This is the second time today the same instinct went wrong in the same direction:* seeing a control on the
quiz page and assuming it belongs to the quiz. The first was the review action resolving to a module rather
than a lesson. Both were caught by asking what the control actually **does**, not where it sits.

## 2026-08-05 · Validation pass, a broken component set, and the state catalogue moves out of the DS

**A malformed variant name had put `LMS / Quiz · Question Card` into an error state.** One variant was named
`Unanswered` instead of `State=Unanswered`, and Figma refuses to read the property definitions of a set whose
variant names do not follow `Property=Value`. Renamed; the set reads again. Worth knowing as a failure mode:
the symptom is that *nothing* about the component's properties can be inspected or changed, which looks far
more alarming than the cause.

**The nav now lives inside the Question Card** — Nelson replaced the old `Questions Progress` with the Nav
itself and deleted the retired component. That is a cleaner arrangement, and it moves the mode switch onto a
property already in place: `Show progress` now governs the bar, default on, so mode B carries it and the
mode-A preset hides it along with everything else.

**Last of the hand-made bits, found by sweeping rather than by looking:** `▲ Pass 70%` in Grade Summary
became an `alert-triangle` icon on a warning token, and two drawn pills in `Last attempt` — *Draft saved*,
*Quiz attempt 2 of 2* — became Badges.

**Final DS state, all ten quiz components:** zero raw colours, zero emoji, zero drawn pills or buttons, no
malformed variant names, no sets in error.

### The state catalogue did not belong in the design system

Nelson asked why `Quiz — every state · single & multi select` was sitting in the DS. It should not have been,
and it was worse than misplaced: **it duplicated ICP section 04.3 almost exactly** — the same five columns,
34 specimens there against 35 here.

A catalogue of learner-facing states is **application documentation**; the design system defines components.
Two copies of the same catalogue in two files guarantees they drift, and the one nobody is looking at becomes
the one people trust.

The five duplicated columns are removed. What stays is the part that genuinely is component documentation —
**how to configure the same card for each mode** — and the board is renamed to say so, pointing at 04.3 for
the states.

## 2026-08-05 · Every quiz colour now comes from a token

Nelson: *"porque não estás a usar as cores, tokens, standardisação do DS?"* Fair, and it was the same failure
as the hand-drawn buttons — I used the system where it was convenient and improvised where it was not. The
backgrounds and body text I had bound to variables; the tone colours, the icons, the rules and the countdown
I had typed in as RGB.

**Audited the whole quiz family rather than only the two components he pointed at**, which is where the real
answer was: **79 unbound colours across seven components.**

| Component | Raw colours bound |
|---|---|
| Results | 30 |
| Question Card | 31 |
| Answer Input | 6 |
| Option Row | 4 |
| Grade Summary | 4 |
| Gate | 3 |
| Nav | 1 |

**Mapped by meaning, not by nearest value.** `#26708e` on a quiz-type eyebrow became
`text-brand-tertiary`, not "some blue"; `#1f7643` on a pass score became `text-success-primary`; `#8c5908`
below a pass mark became `text-warning-primary`. Where a colour had no honest semantic home the script was
written to **abort rather than fall back to a raw value** — a wrong token is harder to find later than an
unbound colour.

Gate and Exam Timer icons, tone rules and the countdown are now on `fg-brand-primary` /
`fg-warning-primary` / `fg-error-primary` and the matching text and border tokens, so the escalation is the
system's, not mine.

**Final sweep across all eleven quiz components: zero unbound fills or strokes.**

The pattern worth naming, because it has now appeared three times today: drawn buttons instead of the button
component, hardcoded colours instead of tokens, and a demo that contradicted its own rule. Each time the
system was there and I worked beside it rather than with it.

## 2026-08-05 · Three variants were never bound, and the alerts lose their emoji

**The counter Nelson kept seeing was real, and my earlier check had been wrong.** Three variants of
`LMS / Quiz · Question Card` — `Partially correct`, `Answer revealed`, `Results withheld` — carried a
`Questions Progress` layer that was **not bound to `Show progress` at all**. So the property could never
reach them: not by changing the default, not by setting it on an instance. My alignment pass reported "zero
changes needed" precisely because it only inspected layers that *had* a binding, and these had none.

All eight variants are now bound and hidden. Worth generalising: when a boolean property appears not to work,
check that every layer it should govern is actually referenced by it — an unbound layer fails silently and
looks like a stale default.

**The alerts lost their emoji.** `Gate` and `Exam Timer` were using 🔒 🗓 ⏳ ⏱ 👁 as text. Replaced with
design-system icons — `lock-01`, `calendar`, `hourglass-01`, `clock-stopwatch`, `clock`, `eye` — coloured to
the tone.

**And softened, using the language already set on the Inline Alert:** neutral surface, title in
`text-primary`, body in `text-secondary`, and the tone carried by the icon plus a 2px top rule rather than a
flooded block. The three informational gates keep a plain 1px border instead, since nothing about them is
urgent.

One thing deliberately kept loud: **the countdown itself stays in the tone colour** — blue, amber, red. It is
the element the learner is actually watching, and neutralising it would have been consistency at the cost of
the only signal that matters at five percent remaining.

## 2026-08-05 · The design system's own demo was still wrong

Nelson pushed back twice on the same thing, and he was right both times. After fixing the duplication across
the ICP sections, **the canonical demonstration in the design system still showed it** — the mode B group had
the nav bar *and* the in-card counter, which is precisely what everything else had just been corrected away
from. The example that teaches the rule was breaking it.

Three fixes on the showcase:

- **Mode B cards: in-card counter off.** I had set those properties explicitly when building the demo, before
  the default changed, so they never picked it up.
- **The nav moved above the cards in the B group.** It is a *top* bar; showing it underneath taught the
  opposite of what the component is for. In the A group it correctly stays at the foot, because that is where
  the platform puts it.
- **Captions rewritten** — B's still claimed "progress and explanation on".

**And five manual visibility overrides found in columns A and B.** Cards in `Answer revealed`,
`Results withheld` and `Partially correct` had their progress layer **forced visible against the property** —
so changing the default could never have reached them. Worth knowing as a general hazard: a boolean property
is only authoritative until someone toggles the layer by hand, and after that the component lies about its
own state. Reset to follow the property.

*The pattern across today: every time a rule changed, the places that demonstrate the rule were the last to
be checked and the most misleading when wrong.*

## 2026-08-05 · Two counters that disagreed — position moves to the top bar

Nelson spotted the old progress element still inside `LMS / Quiz · Question Card`. He was right, and it was
worse than duplication: in section 04 the nav bar said **"Question 4 of 7"** while the card beneath it said
**"Question 2 of 5"**. Two counters, disagreeing, on the same screen.

The cause is the wizard pattern we adopted an hour earlier: once position lives in the top bar, the in-card
counter has nothing left to do.

**Resolved at the source.** `Show progress` now defaults to **off** on the card, and both component
descriptions say why. The in-card counter is not deleted, because it still has one job: **if difference 10
(the stepper) is struck on cost, mode B stays a single scrolling page — and then a top bar cannot say which
question the learner is on, so the card is the only place position can live.** The rule written into both
descriptions is *never both*.

**Instances corrected across the sections**, and section 04's canonical full-page mock gained the bar it was
missing.

*Two mistakes worth recording, because both were mine and both were caught by verifying rather than by
assuming:*

- **My first sweep filtered instances by name.** Instance names can be overridden, and the canonical mock's
  card had been renamed `Quiz · Question Card`, so it slipped through. Filtering by **main component** is the
  only reliable test.
- **The second sweep then overreached** and added a nav bar to all fifteen specimens in 04.3. That section is
  a **state inventory, not a set of screens** — position is not a state, and chrome does not belong on a
  specimen. Fifteen bars removed.

Final check: 04 has four bars and no card counters; 04.5 has both modes and no card counters; 04.3 has no
bars; nothing on the page overlaps.

## 2026-08-05 · The quiz nav adopted across the sections

Nelson took the progress bar's own `Percentage` label and used it for "Question 4 of 7" instead of a separate
text node, and squared the corners. The nav is now entirely made of existing components — `Buttons/Button`
and `Progress bar`, nothing drawn.

**Swept the sections for navigation that should be using it.** Less than expected, and one finding was that
nothing needed replacing:

- **04.3, 04.4, 04.5** — clean. The apparent hits in 04.5 were my own annotation prose containing the words
  "Previous and Next", not controls.
- **04** carried `LMS / Course Progression Button` in Previous-Topic / Next-Topic / Mark-as-Completed. **Left
  alone** — that is movement between *topics*, a different thing from moving between questions, and it was
  right already.

**What 04 was actually missing was the nav entirely.** Its three flows ran `Topic Header → Entry Header →
Question → Results` with no quiz-level navigation at all. Since the section is now labelled mode B, each flow
should carry the stepper bar. Added to all three, between the entry screen and the question, which is where
it belongs — the bar is for moving through questions, so it appears once the learner is in them.

So the request to "swap in the nav" turned out to be an **addition**, not a substitution. Worth noting the
difference: a sweep that only looks for things to replace would have reported the section clean and moved on.

## 2026-08-05 · Re-adopted the design system in the quiz components

Nelson caught it: I built `LMS / Quiz · Nav` by drawing buttons and a progress track instead of instantiating
the ones that already exist — and then found the same habit in components built earlier. He replaced the Back
button with a real `Buttons/Button` himself, which set the pattern.

**Fourteen hand-drawn elements replaced across five components:**

| Component | Was | Now |
|---|---|---|
| Nav · Stacked A | two drawn button frames | `Buttons/Button` — Secondary, with leading/trailing chevrons |
| Nav · Stepper B | a drawn track and fill | `Progress bar`, label off so it does not repeat the counter beside it |
| Results | `Retry incorrect` ×2, `Next topic` ×2 | `Buttons/Button` Primary |
| Results | `Retake quiz` ×2 | `Buttons/Button` Secondary |
| Results | `Passed`, `Not passed`, `Submitted`, `Recorded` | `Badge` — Pill, Success / Warning / Gray |
| Exam Timer | `End my exam` ×3 | `Buttons/Button` Secondary |
| Grade Summary | the score pill | `Badge` Pill Error |

Hierarchy was **inferred from the fills rather than guessed**: everything painted `38,112,142` was a primary
action, white-with-a-stroke was secondary. And the heuristic that found the buttons also flagged four status
pills — those became **badges, not buttons**, because they are not actions. Worth saying out loud: a sweep
like this is only safe if it distinguishes what a thing *is* from what it *looks like*.

The clearest sign the habit was real: in `Grade Summary` the hand-drawn pill sat directly beside a sibling
layer already named `Badge`. Half the header used the component and half did not.

Final sweep across all six touched components: **zero hand-drawn button- or badge-like frames remain.**

## 2026-08-05 · Column A rebuilt from components — nothing on the board is detached now

The "today" column was hand-drawn since 5 Aug because `LMS / Quiz · Question Card` could not render what the
real page shows. `Show platform prompt` and `Show attempts` fixed that, so it is now built from the design
system on a **mode A preset**: platform prompt and Save on, progress and explanation off, navigation set to
`Stacked · A`.

**Verified after rebuilding, not assumed.** All three cards render the platform prompt with no progress bar
and no explanation; `Unanswered` shows Save draft, Submit and the attempts line, which is exactly the live
page; `Correct` offers no actions, because the platform hides Reset once an answer is right; and the
navigation still reads *Previous* and *Next*, not *Next question*.

That last check is the one that matters. The column now **inherits** from the same component as the proposal,
which is the point — but it also means a careless default change could quietly make the "today" column
describe the proposal, which is the exact mistake we made once already. The column caption now says so, in
the imperative, for whoever edits it next.

**Kept, because they are the finding rather than chrome:** the screenshot as evidence, the two dashed absence
callouts, and the *NOT A DEFECT — RESOLVED* note explaining that the screenshot is of an ended course.

*Recorded because it cost a step:* the rebuild script cleared the screen before confirming it had captured
the callouts to preserve, and two of them were deleted. Figma plugin runs are not transactional — collect
first, verify the collection, then destroy.

## 2026-08-05 · Six quiz sections down to four, and the nav becomes a top bar

**The nav, rebuilt after the wizard pattern Nelson liked.** `Mode=Stepper · B` is no longer a footer — it is
a **top bar**: back, a progress track, and "Question 4 of 7". `Mode=Stacked · A` stays at the foot, because
that is where the platform puts it. The bottom of a mode-B screen now carries only the question's own action.

It has a useful side effect: mode A's Previous/Next *leave the quiz*, and moving B's navigation to the top
means the two modes are distinguishable at a glance rather than by reading labels.

**Four consequences agreed and written into the component description**, because the pattern hides them:

- **Retry does not live in the nav.** If the primary becomes *Next question*, a learner who got it wrong with
  attempts left has nowhere to click. The card offers *Try again* as a secondary — and with
  `rerandomize = always` that control must own **two** steps, since a second submit without Reset is refused.
- **The last question** turns *Next question* into *See results*.
- **Back means previous question, never "leave the quiz."** Two different actions, two different controls.
- **None of it applies to a bucket quiz**, where one Submit covers all ten questions and there is no next.

**Sections consolidated, six to four.**

- **04.2 deleted.** Verified subsumed first, not assumed: its four Option Row states all appear among the
  thirty-four combinations in 04.3.
- **04.1 archived** rather than left in place. It is reference material and three of its claims are now known
  to be wrong — no quiz-level submit, results needs backend work, show-answer differs by graded. A wrong
  reference is worse than none, so it carries a stamp naming each error and where the verified version lives.
- **04 relabelled `04 · Quiz — the three types, in mode B`.** It was presenting our proposal as *the* quiz
  flow: it opens on an entry screen and closes on results, and the platform does neither. Duplicating it into
  six flows would have been the wrong fix — the three types are a **separate axis** from the two modes, and
  practice, graded and final all exist in A too, just without the bookends.
- **04.3, 04.4 kept**, both mode-independent, each now pointing at 04.5 as the entry point.

## 2026-08-05 · One card, both modes — and B is what you get by default

Consolidating the quiz work. `LMS / Quiz · Question Card` now serves **both** modes, so nothing has to be
detached to show how the platform behaves today.

**Two properties added**, because the card previously could not render what the live page shows:
`Show platform prompt` — the repeated *"Choose the correct option(s)"* and the points line — and
`Show attempts`, the count beside Submit. Their absence is why the "today" column on the board had to be
drawn by hand.

**Defaults are now mode B.** Drop the card in and it is already the proposal: progress on, explanation on,
attempts on, everything else off. B is what we are designing towards, so it should be what you get without
thinking, and anyone showing A has chosen to. *(`Show hint` flipped to off with this — zero demand hints are
authored anywhere in the catalogue.)*

Note this defaults the opposite way to the prototype, deliberately: **the prototype defaults to A** because
it imitates production, while **the component defaults to B** because it is a design tool. One default
protects the comparison, the other protects the design work. Both are stated in `08-two-modes.md` §2 and §9
so the difference reads as a decision rather than an inconsistency.

**The recipe lives on the component description**, not only in a document — whoever opens the card in Figma
sees both switch-lists and the platform rules without leaving the file.

**Building the demonstration caught two real defects** that the table alone had not:

- **Save existed only on `Last attempt`.** Mode A could not show it on an unanswered question, which is
  exactly where the platform does show it. Added to `Unanswered` and `Selected`.
- **The hint *button* ignored `Show hint`** — the property was bound to the hint alert, not the control, so
  the button rendered regardless. Now bound.

That is the same argument as the prototype itself, one level down: build the comparison, do not describe it.

## 2026-08-05 · The stepper moves into B, and the framing corrected to discovery

Two corrections from Nelson, and the second reverses a call I had made.

**"Both to be built" was overclaiming.** Nothing here is agreed — this is still discussion and discovery.
The Figma section is now `04.5 · Quiz — mode A (today) vs mode B (proposed) · in discussion`, and
`08-two-modes.md` opens by saying so. Cost tags read as *what this would cost if we shipped it*, not as
commitments.

**The stepper belongs in B.** I had excluded it and parked it in column C as deliberately left out, on the
grounds that one question per unit means re-authoring the whole catalogue. That reasoning is right about
production and wrong about a prototype: **in a prototype the stepper costs nothing, and letting people use it
is exactly how we find out whether the authoring cost is worth paying.** Excluding it meant deciding the most
expensive question by assumption, which is the opposite of why we are building two modes at all.

It is now difference **10** — one question per screen, Previous and Next, and a percentage complete — tagged
✎ Authoring (heavy) + ▣ Design so the real cost stays visible. It also makes difference 1 native: with one
question per unit the counter is the platform's own rather than something our shell computes.

Two things carried with it. **How Reset behaves under sequence navigation is untested** — Simran is checking,
and until then retry behaviour in a stepper is unverified rather than assumed. And if it is ever adopted for
real, it should be for new courses rather than retrofitted.

One trap flagged for the prototype: **A's Previous/Next must leave the quiz**, because that is what they
really do. Making them step through questions in A would quietly give A half of B's improvement and flatten
the comparison.

## 2026-08-05 · A and B are two modes, not a before and an after

New doc: `quizzes/08-two-modes.md`, and the Figma section renamed to
**`04.5 · Quiz — mode A (today) vs mode B (proposed) · both to be built`**.

**The reframe.** Everything so far has read as *here is how it works and here is how it should work*. That is
not what we are building. The prototype carries **both experiences at once, selected per quiz**, so some
quizzes run A and some run B and the same questions go through either. You settle an argument about feedback
by letting people use both, not by describing the second one well.

**The switch is one property at quiz level — `mode: 'A' | 'B'`.** It belongs to the quiz, not the question
and not the course. **Default is A**, so an unconfigured quiz behaves as production does, and anyone who
meets B knows someone chose it.

**What must be held constant, added as its own section**, because a comparison between two things that differ
in five ways measures nothing: the same questions in the same order, the same attempts, the same question
type, the same pass mark, and the same visual language. Only behaviour and content may differ. That last one
matters most — showing A as raw edX and B in the new design would have the room choosing the prettier column
rather than the better experience.

The nine differences are numbered to match the Figma board, so a comment on "number 4" means the same thing
in the doc, on the board and in the prototype.

**Also corrected in `quizzes/00-README.md`**, which is read first and had two stale headline findings: the
results screen is a frontend plugin rather than a fork, and the "review lesson on a wrong answer" idea is
dropped — the link can only resolve to the module, so the label promised precision we cannot deliver. The
draft-versus-submitted point was sharpened rather than removed: it turned out to be the most dangerous thing
in the quiz.

## 2026-08-05 · We had been auditing a course that had ended

Simran moved the AZ-204 end date forward. Re-reading the same problems through `/xblock/{id}` on the open
course changed three findings at once — and the cause is the same for all three.

| | Screenshot (course ended) | Live (course open) |
|---|---|---|
| Submit | disabled | **enabled** |
| Save | absent | **present** |
| Show answer | present | **absent** |

**The retraction that matters most: Show answer.** We recorded on 3 Aug that the answer could be revealed
before any attempt, called it a conflict, and on 4 Aug accepted Simran's explanation that graded and
non-graded quizzes behave differently. **Neither was right.** Their graded quizzes leave `showanswer` at the
platform default `finished`, which means `closed() or is_correct()` — and ending the course satisfies
`closed()`. The ended course had revealed every answer. On the open course, Show answer is not offered at
all. So the reveal rule in production today is an accident of a default, not a decision by anyone.

**And a question to the vendor withdrawn.** We were about to ask why Save was missing when the source said it
should render. It was missing because the course was closed. Save is present on every graded question, and
it stores an answer without spending an attempt — which makes it more useful than we had credited.

**The lesson, recorded plainly because it cost two days of wrong conclusions:** we read behaviour off a
course that had ended, and the state was legible in the API the whole time. **Check the course is still
running before treating anything you see in it as normal.**

Column A now shows the open-course state — Save beside Submit, no Show answer — with the callout explaining
the three differences and why the screenshot above it looks different. Notes A3, A4 and A6 rewritten.

One thing left unverified on purpose: Reset almost certainly appears in their courses because the questions
are randomised (`should_show_reset_button()` returns true for a randomised problem once submitted), not
because `show_reset_button` is on. Confirming it would mean submitting an answer and spending one of Nelson's
two attempts, so it stays inferred.

## 2026-08-05 · The defect that was not one, and Next question removed

**`Next question` removed** from `Correct`, `Partially correct`, `Answer revealed` and `Results withheld`.
Nothing replaces it: after a right answer on a page the learner can already see all of, there is no next step
to offer. The card's footers are now empty in those four states, which is the honest shape.

**The Submit defect was not a defect.** Simran: *"The course end date had passed because of which submit
button was showing disabled."* The source agrees to the letter — `close_date` is `self.due or
self.course_end_date` (line 793), and once past it `closed()` is true, which disables Submit and takes Reset
and Save with it. The behaviour was correct all along.

**What the platform does not do is say why.** The button greys out with no message and no date. *That* is the
design gap, and it is a better finding than the bug we thought we had: a learner meeting an ended course gets
a dead control and no explanation.

Two corrections to the board followed. The red `DEFECT` callout now reads **NOT A DEFECT — RESOLVED** and
explains the mechanism. And the evidence caption now states that **the screenshot is of an ended course** —
a greyed Submit beside "0 of 2 attempts" is the past-due state, not the ordinary one. Without that line the
column documents an edge case while claiming to document the norm.

Worth recording plainly: we had `closed()` in our own notes since 4 Aug and still wrote "defect" on the
board. Reading a mechanism is not the same as recognising it in the wild.

**Two courses to audit**, both from Simran. One reportedly uses *"only one submit button by adding all the
question in one bucket"* — if that is several response elements inside a single CAPA problem, it qualifies
our "no single Submit for a whole quiz" claim, which is true of subsections but need not be true of a
question set authored as one problem. The other uses the explanation functionality, and is the example we
have been asking for since 4 Aug — it unblocks proposal B2, the largest item on the board.

## 2026-08-04 · The button contract — one rule, applied to all eight

Written up as `04-quiz-experience-spec.md` §10.7, after four buttons on the question card turned out to have
no counterpart in the platform. They got there honestly: the component was drawn as our *proposal*, and
nobody had yet asked which of its affordances the backend can honour.

**The rule: a button on a question may only promise what the backend can honour.** Applied to all eight, it
kept five and caught three — and each of the three failed differently, which is why a single sweep was worth
more than fixing them one at a time as they were spotted.

| | Platform? | Outcome |
|---|---|---|
| Submit | yes | always present — the only action that spends an attempt |
| Show answer | yes | keep; set per quiz, inheritable |
| Reset *("Try again")* | yes, off by default | keep; label must sit beside the attempts count |
| Save *("Save draft")* | yes, off by default | optional, off |
| Hint | yes, none authored | optional, off |
| Skip question | **no** | optional, off — ours, pending the stepper |
| Next question | **no** | **unresolved, on four variants** |
| Review lesson | **no**, inside a problem | removed from the card; kept in the entry header |

*Skip* and *Next question* promise **navigation that does not exist** — every question is on one page.
*Review lesson* promised **precision we cannot deliver**, resolving to the module rather than the lesson.
And *Save draft* looked like an invention and was not: removing it on suspicion would have deleted a real
feature from the design. That is why the test is "does it exist in the source", not "does it look familiar".

**A second rule fell out of it: where the platform hides a button, copy that behaviour.** Reset vanishes once
an answer is correct — because reset wipes the score on the spot, offering it there would let a learner
destroy a point they had banked. Reset and Save both vanish once the problem is closed. Save is hidden when
attempts are unlimited and nothing is randomised, because submitting costs nothing in that case. These are
not quirks to work around; they are the platform protecting the learner, and our shell should do the same.

**Still open:** `Next question` is the *primary* action on `Correct`, `Partially correct`, `Answer revealed`
and `Results withheld`. Removing it raises the question of what replaces it — the redrawn today column
answers **nothing** for `Correct`, which is almost certainly right for the other three, but that is a design
call rather than a correction.

## 2026-08-04 · Save and Skip made optional, and Reset read properly

Nelson's rule for the two leftover buttons was the right one — *if it is not in edX, it is our add-on, remove
it.* The source answered differently for each, so they are handled differently.

**"Skip question" is ours.** Zero occurrences of `skip` in either `capa_block.py` or `sequence_block.py`.
There is no concept of skipping a question; navigation is between units.

**"Save draft" is not.** `force_save_button` (line 267), `should_show_save_button()` (1052), the
`problem_save` handler (422) and `save_problem()` (2075) setting `lcp.has_saved_answers = True`. Save stores
an answer **without submitting and without spending an attempt**. It is the same category as Reset and
gating: real, and switched off.

Both are now booleans on the card — `Show save`, `Show skip`, defaulting off. Save because it may be turned
on per quiz; Skip because it only becomes meaningful if the stepper is ever adopted, and that decision
reshapes the whole flow.

**A prediction from the source that we can check.** `should_show_save_button()` hides Save when attempts are
unlimited and the problem is not randomised — the code's own comment explains that submitting costs nothing
in that case. But on a graded quiz with `max_attempts = 2`, not closed, not submitted, it returns `True`. **So
Save should already be rendering on our graded quizzes, and in the screenshot it is not.** That is very
likely why the 3 Aug test lost an unsubmitted answer. Added to the vendor questions.

**Reset documented in full** in `04-quiz-experience-spec.md` §10.5, because the label on our button depends
on it. It clears the answer *and wipes the score already earned*, re-seeds a randomised question so the
learner may get a different variant, disappears once the last attempt is spent, and never returns an
attempt — `self.attempts` is assigned in exactly one place in 2,481 lines, inside submit.

Two things follow. **Hiding Reset after a correct answer is protective, not an oversight** — because the
score is wiped on the spot, a learner pressing it on a question they had right would destroy a banked point.
And **the risk sits in the label**: "Try again" reads as a free second go, so it is only safe beside a visible
count of attempts remaining.

**Column C brought in line.** Three corrections: "Items 1 and 4 need no decision" became "1, 4, 7 and 8" —
the board has eight pairs now, not six. *Reset never returns a spent attempt* was added to the hard-limits
list, where it belongs, since no setting changes it. And a card the board was missing — **"Built into the
platform, switched off in our courses"** — now collects gating, Show answer, inherited attempt caps, the
Reset button and the Save button in one place. That card is the argument of the whole board in miniature: the
distance between the two columns is mostly settings, not engineering.

## 2026-08-04 · Column B reviewed — the alert restyled, and the state that could not state its case

Reviewed in the main components, no detach.

**The Incorrect state had no explanation, and could never have had one.** `State=Correct` carried an
`LMS / Inline Alert`; `State=Incorrect` carried only the hint. So the card was structurally incapable of
saying *why* an answer was wrong — which is exactly what note B2 proposes as the change with the largest
learner impact. Column B was failing to demonstrate its own headline argument. The Incorrect variant now
carries the explanation alert, and a new **`Show explanation`** boolean binds it on `Correct`, `Incorrect`
and `Answer revealed` — so the design system can also express the 213-of-215 reality by switching it off,
without anyone having to detach again.

**The alert was restyled after the edX pattern**, on Nelson's observation that theirs reads as subtler. The
diagnosis: our body copy was painted in the tone colour, which is what made the block shout. edX puts the
colour in a top rule and an icon, and leaves the text near-black.

| | Before | After |
|---|---|---|
| Background | tinted per tone | `bg-secondary`, neutral |
| Border | 1px all round, tone-200 | **2px top only**, tone colour |
| Title | Bold, tone colour | SemiBold, `text-primary` |
| Body | **tone colour** | `text-secondary`, 155% leading |

The component had already anticipated this — a tone-coloured stroke sat hidden beneath the grey one, so the
change was to swap which is visible. All bindings are to semantic variables; no tokens were broken. Note that
`Entry Header` and `Lesson Block` also consume this alert and therefore change appearance too.

**Alert titles stopped repeating the verdict.** "CORRECT" and "INCORRECT" both became **"Explanation"**. The
option row already says, in green or red, whether the learner was right; spending the alert's first line
repeating it is the same error we removed from the stacked alerts (`07-results-decisions.md` §2). Reviewing
the rest turned up four more titles still in caps — `LAST ATTEMPT`, `PARTIALLY CORRECT · 1 / 2 POINTS`,
`EXPLANATION`, `ANSWER SUBMITTED`, `HINT 1 OF 3` — all normalised to sentence case. Two sentence-case titles
beside four shouting ones would have been worse than either.

**"Review lesson" removed from the question card.** Nelson asked whether it could be implemented; the answer
splits by placement. Resolving the target is settled — `/api/courses/v2/blocks/?course_id=…&depth=all`
returns the whole tree and we called it ourselves, authenticated as a learner, during the catalogue audit;
the MFE already renders breadcrumbs and an outline from the same structure. But it resolves to the **module**,
not to the lesson covering that question — a per-question mapping nobody authors. So the label promised
precision we cannot deliver. It also sits inside the cross-origin iframe, making it dependent on integration
option C. It stays in the Entry Header, where it is outside the iframe and honestly scoped.

*Restored:* the screenshot in column A had been cropped to 1348px by a section resize — its `scaleMode` is
`CROP`, so it was silently hiding questions 4 and 5 rather than distorting. Back to 760×1784, with
constraints set so a section resize cannot take it again.

**Two more findings in the card, not yet acted on** — both promise behaviour the platform does not have:

- **`State=Last attempt` offers "Save draft".** There is no draft. We confirmed empirically on 3 Aug that an
  unsubmitted selection is lost on navigation, with attempts still reading 0 of 2. This is a correctness
  problem, not a preference.
- **`State=Unanswered` and `State=Selected` offer "Skip question".** Every question is on one page, so there
  is nothing to skip to — it would only mean something under the stepper we deliberately excluded.

## 2026-08-04 · Column A rebuilt against a screenshot of the real page

Nelson put a screenshot of the live quiz — AZ-204, Module 3 Knowledge Check — into column A so the board
could be checked against reality rather than against our memory of it. It earned its place: three things were
wrong and two were missing.

**Column A is now detached from the design system**, deliberately and only here. The previous pass stripped
the wrong affordances out of the DS components, but the components still shaped the page. A faithful redraw
was the only way to stop the proposal leaking into the column that documents the present. The screenshot sits
above it as evidence; the redraw is in our type so it compares like-for-like with column B.

**What the screenshot corrected:**

- **The page has a title and a bookmark link, and nothing else.** No entry screen — which confirms the
  removal made earlier the same day, this time with a picture behind it.
- **Every question carries "Choose the correct option(s)" as a heading** — the same generic sentence five
  times on one page. The plural is wrong for a single-select question and quietly implies multi-select might
  be allowed. We had not drawn this at all.
- **The question numbers are typed into the question text by the author**, not generated. Reorder the
  questions or turn on shuffling and the numbers lie. Also not drawn.
- **"1 point possible (graded)" and "You have used 0 of 2 attempts" are shown per question.** Our note said
  the learner has no sense of where they are; that is still true of *position*, but they are told points and
  attempts. The note was too broad and has been narrowed.
- **Previous and Next sit at the foot of the page** and look like question navigation. They move between
  units, and the whole quiz is one unit, so they leave it. Worth stating explicitly — a stakeholder reading
  the screenshot will assume those buttons step through questions.
- **Reset is absent** because nothing has been submitted yet. The note now says so, rather than leaving its
  absence looking like an omission in the drawing.

**The defect is visible in the evidence**, so it is marked on the redraw where it happens: questions 1 and 2
have a selection and Submit is still greyed. Until it is fixed, a learner cannot submit without first
clicking Show answer — which hands them the answer before they commit to one. That consequence had not been
spelled out anywhere.

This added an eighth pair: **A8** the page repeats itself and the numbering is hand-typed ↔ **B8** the
question is the heading, numbering computed by the shell.

## 2026-08-04 · Column A was quietly showing the proposal — corrected

Nelson caught it: the "how it works today" column had **Next question**, **Next hint**, **Review lesson** and
**Skip question** on the question cards. None of those exist today.

**The cause is worth recording, because it will happen again.** Drawing both columns in our design system is
the right call — it stops the room choosing the prettier column — but the components carry *our proposed
affordances as their defaults*. Reusing them imports the proposal into the column that is supposed to
document the present. Swapping a variant is not enough; the chrome has to be stripped deliberately.

What column A now shows, and why each one is defensible:

- **Unanswered → Submit only.** No *Skip question*: every question is on the same page, so there is nothing
  to skip to.
- **Correct → no actions at all.** No *Next question* for the same reason, and no Reset —
  `should_show_reset_button()` returns `False` once the answer is correct.
- **Incorrect → Show answer + Reset.** *Next hint* is gone: the catalogue audit found zero authored
  `demandhint` anywhere. *Review lesson* is gone: that is our shell, not the platform. And *Try again* was
  renamed **Reset**, which is the platform's own name — using our label made a native control look like an
  invention.

**The entry header went further — it was removed entirely.** There is no quiz entry screen today; the
learner opens the quiz from the outline and is already answering it. The Entry Header is F-QZ-001 on our
*build* list, not something that exists. In its place, a dashed absence note: the facts it would carry
(question count, duration, attempts, weighting) do exist — in the grading policy and on the Progress tab —
just not where the decision to start is made. Timed exams are the one exception, and do have a native
instructions screen.

This added a seventh pair to the board: **A7** nothing tells them what they are walking into ↔ **B7** an
entry screen, tagged ▣ Design.

**Two wordings corrected in column B**, both instances of the same long-standing error — chrome that implies
a quiz-level attempt when attempts are per question. "2 attempts" became **"2 attempts per question"**, and
"Once you submit an attempt you cannot change your answers" became **"Once you submit an answer you cannot
change it."** This closes an item that had been open since the attempts model was corrected.

**And the review action is now justified on the board rather than assumed.** Nelson doubted *Review module
first* was possible, reasonably — we were told twice that authors cannot link out of a question. The
distinction is who owns it: that limit applies to content authored inside the problem block, while our shell
renders its own chrome and can resolve the parent module itself. A note on column B says so, including the
constraint that authors must never be asked to write "go and review module 3" into feedback as a substitute.

**Counter and stepper are now explicitly separated on the board.** Nelson asked whether pagination is in use
today — it is not, and column A shows none. But the question exposed a confusion the room would have had:
column B contains a *counter* ("Question 2 of 5" plus a progress bar), which our shell computes over the
subsection and which needs no authoring change, while the *stepper* — moving one question at a time — needs
one question per unit and a re-authored catalogue, and is excluded in column C. Note B1 now says so in as
many words, because the two look alike and cost nothing alike.

*Not a defect, for the record:* the Entry Header's `Show review action` property was briefly suspected of
being unwired. It is correctly bound. A text node inside a hidden button still reports `visible: true` — only
the ancestor is hidden. The detection was wrong, not the component.

## 2026-08-04 · The vendor message, reviewed before sending

Logged in `session-log.md` under *Open questions with the vendor*. Two changes are worth remembering as
habits rather than as edits to one message.

**A question gets answered when it carries a visible consequence.** Every ask now states what the answer
decides for the design — which component state, which flow, which screen goes in or out of scope. Abstract
capability questions get abstract answers.

**One ask was nearly missed, and it was the important one.** Simran said results do not appear after
submitting. We had accepted that as a platform limit. But if per-question correctness is also absent, that
is `show_correctness` — display name "Show Results", default `always` — set away from its default. We were
one unasked question away from designing a deferred-feedback flow around a single mis-set field.

**And one thing was cut.** Our source check found that `allow_multiple_attempts` is a migration filename,
not a setting. Nobody on their side ever cited it. Refuting a claim that was never made is point-scoring: it
costs goodwill and gains nothing. It stays in our documentation in case it comes up.

Also settled: the results-screen estimate is being raised with Navdeep, so the vendor message carries it as
context rather than as a second request — otherwise we get two estimates on different assumptions, or none.

## 2026-08-04 · Retired components swapped out, and the gate state corrected

**Eight instances of `_Remove · LMS / Quiz · Results Summary` were still live in the ICP** — three in
section 04, four in 04.3, one in 04.4. Anyone opening those pages was being shown the layout we replaced.

Finding them took a second pass. Searching by component name returns nothing, because an imported instance
keeps whatever the component was called **at import time** — so in the ICP they are still named
`LMS / Quiz · Results Summary`, without the `_Remove ·` prefix the DS has since acquired. Matching on the
component **key** is the only reliable way, and it is worth remembering the next time something is retired.

**The swap was not a drop-in, and a naive one would have been silently wrong.** Two of the four variant
names changed in the rebuild: `Failed` → `Not passed`, `Pending review` → `Pending`. A straight swap drops
an unmatched variant to the set default — which is `Passed`. A failure screen would have quietly become a
pass. Each instance was therefore read, mapped, swapped and verified: all eight kept their meaning. Existing
captions already read "not passed" and "pending grading", so no copy went stale.

Each instance lost ~190px in the new layout, so sections 04, 04.3 and 04.4 were re-fitted to their content.

Also swept: no stray `_Remove · LMS / Quiz · Rail Item` and no instance parked on the
`Variation=_Remove · Progress Rail` variant anywhere in either file. The five Rail Items that do exist are
inside that retired variant itself — its own contents, not usages.

**`Gate · Prerequisite` corrected in 04.3 (D1).** It was presented as a state our learners meet. It is not.
Simran confirmed nothing is gated, and the source check then showed the feature is fully built and simply
defaults to off. The label now says so, and an amber correction note explains that the component stays
because it is *available if the business wants quizzes earned rather than open* — a decision waiting to be
made, not a screen to design against. The column caption was rewritten to match: of the five blocked states,
only the timed-exam ones occur in our courses today.

*Layout tidy:* sections **04.1 and 04.2 were overlapping** — 04.1 ran to y≈11324 while 04.2 started at
y=10898, in the same column. 04.2 moved to y=11524, left edge kept aligned with 04.1 so the two reference
sections read as one column, with the same 200px gutter used elsewhere on the page. Full overlap sweep
across the page afterwards: clean.

## 2026-08-04 · Two models, side by side — a board built to be decided from

New Figma section on the ICP page, `04.5 · Today vs proposed — two models for the stakeholder call`
(`5046:116408`), sitting to the right of 04.4. Built so stakeholders can decide, not admire.

**Both columns are drawn in our design system, deliberately.** If the current model were shown as raw edX
and the proposal in our DS, the room would pick the prettier one for the wrong reason. Drawing both the same
way isolates the only variables that are actually up for decision: behaviour and content.

**Column A — how it works today.** The configuration behind 213 of the 215 audited questions: all questions
stacked on one page, no per-question counter, Show answer available before trying, Reset that quietly spends
an attempt, nothing locked, and nothing at the end. The two dashed *absence* callouts are the point of the
column — an empty space is hard to see, so it is labelled: nothing appears after a wrong answer, and nothing
appears after the last question.

**Column B — the proposal.** Six changes, each mapped one-to-one onto the numbered problems in A, and each
carrying a cost tag so a single line can be struck without rejecting the rest: **▣ Design** (ours, already
in scope), **⚙ Setting** (one inherited field on the subsection), **✎ Authoring** (the content team writes
it), **⌥ Build** (frontend plugin). Nothing in this column requires moving a question between units.

**Column C — the cost key, the exclusion, and the ask.** The stepper (one question per unit) is called out
as *deliberately left out*: it is natively possible and needs no code, but it means re-authoring the whole
catalogue, which is the restructuring effort we set out to avoid. Also lists what no configuration will ever
give us, and the four questions the session has to answer. Items 1 and 4 need no decision — they are inside
the redesign already.

One honest bit of construction: the "1 attempt left · Reset does not give it back" line is shown as a dashed
**PROPOSED COPY — NOT A COMPONENT YET** callout rather than tucked into the hint alert. An attempts warning
is not a hint, and dressing it as one would have been the same category error as the destructive-state hint
we rejected earlier.

## 2026-08-04 · The vendor's answers, taken back to source

The 4 Aug quiz walkthrough with Simran is logged in `session-log.md`. Six of her answers were then read
against the `openedx` repositories at `master` — not documentation summaries — because she answers as the
person who *configures* SkillUp's courses, which makes her reliable about SkillUp and unreliable as a
statement of what the platform can do. The split came out three and three.

**Genuinely the platform.** No submit for a whole subsection (`seq_block.py` has two handlers, neither
submits). No aggregate score on the subsection (`score` appears zero times in that file). No per-quiz pass
mark as a verdict (`GRADE_CUTOFFS` is course-wide). And — the one worth knowing — **"End My Exam" is not a
quiz-level submit either**: it ends the session, never touches problem state, and the platform tells
learners outright that unsubmitted answers will not be graded.

**Their configuration, not the platform.** `showanswer` has twelve values and its deciding function never
reads `graded` — the graded/non-graded split is an editorial convention, and the field is *inheritable*, so
it is one setting per subsection rather than 215 edits. `enable_subsection_gating` is fully built, enforced
against direct-URL access, exposed in Studio, and simply defaults to off. `show_reset_button` defaults to
off, so Reset appearing at all is a choice they made. And `max_attempts` is inheritable, so "N attempts on
every question in this quiz" is one field they have not used.

**A correction to us.** `show_correctness` — "Show Results" — defaults to `always`. Per-question feedback
*is* immediate unless suppressed. What does not exist is a quiz-level summary. Wording in
`04-quiz-experience-spec.md` tightened accordingly.

**The finding that changes the plan.** The results screen is a **frontend plugin, not a fork**. The learner
can read their own subsection score from `GET /api/course_home/progress/{course_id}`
(`permission_classes = (IsAuthenticated,)`), and `sequence_bottom_navigation.v1` receives `sequenceId`, so
there is a supported place to render it below the questions. Every subsection route under `/api/grades/v1/`
is staff-gated, which is why this looks impossible from the obvious direction. Three constraints carried
into the spec: no slot fires on *leaving* a subsection, so last-unit detection is ours; the endpoint is
declared unstable and toggle-gated, so the screen must degrade to "see the Progress tab"; and scores are
recomputed asynchronously, which makes the **`Pending` variant of `LMS / Quiz · Results` required rather
than defensive**.

**Two things worth carrying into the conversation.** Reset does **not** refund an attempt — `self.attempts`
is incremented in exactly one place in `capa_block.py`, inside submit, and `reset_problem()` never touches
it; copy on *Retry incorrect* must not imply otherwise. And a whole-subsection reset *does* exist staff-side
via `reset_student_attempts()`, which recurses into children.

Recorded in `session-log.md` with file and line citations, and in `04-quiz-experience-spec.md` §10.

## 2026-08-20 · Course Detail componentised — and two of ours turned out to already exist

Built the Course Detail components against the published library, then swept the library for everything the
metadata audit had recorded as missing. The sweep cost us two components and gained us four.

**Foundations — nothing created, everything imported.** The design system is a separate published library,
`❖ SKO Design System (Untitled UI)`, and this file already subscribes to it. **74 variables imported** from
`1. Semantics` and `3. Responsive`; **zero created locally**. Typography by published style
(`Body/{Lead,Default,Small}/*`, `Caption/*`), never by value — the repo's own `typography.css` says so.
New page `↳ LMS / Course Detail — Components 🟠` with a cover and two live foundations frames: every swatch
has its fill bound to the variable, so a broken import shows as grey rather than passing silently.

**Seven components, not nine.** Namespaced `LMS / Course Detail /`, 24 variants, all tokenised:
`Meta`, `Card shell`, `Module row`, `Topic row`, `Progress card`, `Certificate card`, `Sidebar card`.

**Two were retired because the library already had them.**
- `Marker` → **`LMS / Completion Status`**, which carried Done, Pending and Locked — and had *In Progress*
  hidden, for the same reason we never built one. Our extra `Number` state was dropped rather than ported:
  the module title already reads *"Module 2 · …"*.
- `Banner` → **`Alert`**, 24 variants with responsive breakpoints and Code Connected to `InlineAlert.tsx`.
  Ours had two variants and no idea what mobile was.

**What the sweep also found, that the audit had listed as gaps:** `LMS / Course Complete Modal` — that is the
`celebrations` field, already designed and never wired. `LMS / Section Header` — *Module → Section → Topic for
modules with 10+ topics*, an existing answer to the structural finding. `Input field`, `bookmark`,
`certificate-01`. The only gap that survived the sweep is **mentor**: absent from the API and absent from the
library.

**`Course Detail — v12 · componentised`** is the new entry screen: **42 instances** of our components plus 34
from the library, and a hidden duplicate topic list inherited from v9 removed along the way. v11 stays beside
it as the hand-built reference. Componentising forced three corrections the drawing had hidden — the sky-blue
buttons were never the brand, the dark mentor card was an invented colour (the right answer is a **mode flip**
to `Dark mode SKO`, not a second palette), and there is no "in progress" state because the platform does not
report one.

**Verb rule closed.** Drop the verb where the type is descriptive (Reading, Video, Podcast, Activity); keep it
where consequential (Quiz, Final Project, VILT, Lab). Decided from a three-column comparison, applied to v12,
and written on the `Topic row`. Criterion: does it produce something recorded against the learner, or force
them out of the flow?

**Corrections to earlier entries.**
- **"Ten ICP topic types" was wrong — there are twelve** (eight live, one deprecated, three blocked). Fixed in
  five places across these docs, including two quiz files where the wrong number had spread.
- **Code Connect is not inapplicable.** Phase 4 recorded it as out of scope because this repository holds no
  component code. `Alert` maps to `InlineAlert.tsx`, so a component codebase exists and mappings are already
  in use. The claim was made by looking at the wrong repository.

**Feedback owed to the library owner:** `Alert`'s `Breakpoint` axis is really stacked-versus-inline. Desktop
puts title and supporting text on one line and clips any long copy, so `Mobile` is the only usable option for
`welcome_message_html` on a desktop screen. And a `Persistent` variant would let the never-dismissible rule
live in the system instead of in our documentation.

## 2026-08-19 · v11 — everything the data allows, so the cost is visible

The six fields the audit surfaced are now on a screen, along with the three sidebar widgets that were
available and undrawn. **`Course Detail — v11 · everything the data allows`** (`6207:255912`) is a deliberate
maximum, not a proposal.

Added over v10: `enrollment_mode` as a track chip; `org` and `number` as the sub-header the workbook assigns
them; content search to the right of the tab bar; *Currently passing* from `user_has_passing_grade`, which
arrives on the outline call with no extra request; *More content coming* from `has_scheduled_content` on a
module subtitle; and the **dates widget**, **course tools** and **weekly goal** cards. `celebrations` went to
the card strip instead, being an overlay rather than page furniture.

**What it demonstrates is the point of drawing it.** The right column goes from three cards to six and runs to
roughly 1 100 px — longer than the syllabus beside it. A learner scrolling to Module 4 passes a mentor, a
certificate, handouts, dates, bookmarks and a weekly goal on the way. Every one is backed by a real field. The
frame asks which of them earns the room. **v10 stays the proposal; v11 is the inventory to decide against.**

Noted while rendering, and not ours: the shared left-shell component now contains a `WIP` text layer and comes
back as a grey placeholder in server-side screenshots — on v10 as well as v11, so it is the sidebar front's to
look at, not this one.

## 2026-08-19 · Fidelity audit — every claim checked against the workbooks

Checked mechanically rather than by reading: extracted every declared API key from both workbooks (174) and
every key appearing in the sample payloads (133), then extracted every technical token we assert — 104 in
`course-details-metadata-map.md`, 92 across the Figma tables and panels — and cross-referenced them.

**The documentation is faithful.** Not one invented field, not one misspelling, in either surface. Every
token resolves to a declared field, a payload key, or the Courses/Blocks API, which is not in the workbooks
and is labelled as verified live.

Three accuracy fixes:

- **The source path was wrong.** Both workbooks live in `30-07 meetings/`; the document cited
  `_media/Course_metadata.xlsx`, which no longer exists.
- **`playback_url` was under-specified.** The workbook says it is returned only when
  `include_playback_url=true` **and** the recording succeeded, is not archived and has a blob path. We had
  the three conditions and not the request parameter — the one a developer actually has to send.
- Stale layer names from the section's growth, corrected earlier the same day.

**Six fields the workbooks declare, that are learner-facing, and that we had never once mentioned** — now a
section of the element → field table and §5 of the map:

- `blocks.{id}.has_scheduled_content` — *"More content coming"*, present on every block. We draw locked
  modules and have nothing for a module that is open but still growing.
- `celebrations` — *"triggers celebration modals on milestones (first section completion, streaks)"*. A whole
  feature: the platform fires a milestone moment and our design has none.
- `user_has_passing_grade` — a pass/fail signal that arrives **on the outline call**, no extra request. The
  page shows completion but never whether the learner is passing.
- `enrollment_mode` — the learner's own track, and a real field, unlike the course-type badge we drew.
- **Content search** — feature 33, declared in both workbooks, never designed.
- `number` and `org` — the workbook assigns them to the breadcrumb; ours uses neither.

## 2026-08-04 · Three corrections applied, and the card states drawn

- **The letter-grades rule was wrong as an absolute, and it was marked *Applied*.** On every course we
  sampled `grade_range` is a single `Pass: 0.7` threshold and `letter_grade` is null — but the addendum
  shows the Instructor tab formatting `grade_cutoffs` as *"A: 0.9, B: 0.8"*. **The platform supports both.**
  The rule is now: render whatever `grade_range` returns, and hardcode neither shape. That is more design
  work, not less — the component has to hold a single threshold *and* a lettered scale.
- **The certificate card has four states, not two.** `certificate_statuses_with_count` gives the vocabulary:
  `downloadable`, `notpassing`, `generating`, plus `audit_passing` from the outline payload. The gap was
  **`generating`** — certificates are issued in batches, so there is a real interval between passing and the
  file existing, and we had nothing for it.
- **New artifact: `Cards — states the pages do not show`** (`6207:255871`), beside the screens. The four
  certificate states together, because a page can only ever show one of them — plus the **recent recordings**
  card, whose list endpoint is `IsEnrolledOrStaff` and therefore learner-callable. It links to the tab rather
  than playing inline, because playback is a separate short-lived URL. Marked VILT-only: putting it on the
  self-paced Six Sigma example would have been false.
- **"Course not started" was not drawn, deliberately.** `start` in the future looks like a fifth state, but
  `course_metadata` carries `course_access {has_access, error_code, user_message}` and the workbook says it
  is *"used for 403 redirect"* — so the learner is probably redirected rather than shown a variant of this
  page. Recorded as a question in the States table with the copy source named. Drawing it now would repeat
  the unenrolled mistake: inventing a screen the platform may never serve.
- **Two stale layer names fixed:** the API table said 8 endpoints and holds 17; the section title still said
  *v9, v10, unenrolled*.

## 2026-08-03 · Metadata we still need — a sixth reference table

Sixth table in the Course Detail section (`6207:255703`), written up as
[course-details-metadata-map.md](course-details-metadata-map.md) §11: what each **✗** and **⚠︎** verdict
would take to become **✅**, with owner and status. Ordered by effort, and the cheapest tier may cost nothing.

- **Three asks may evaporate on verification.** The eight endpoints in the workbook are the ones the
  Learning MFE calls, not the only ones the platform has. `CourseOverview` — where `title`, `org`, `start`
  and `is_self_paced` already come from — also carries `media`, `short_description` and `effort` in stock
  Open edX, and the **Courses API** `/api/courses/v1/courses/{course_key}` returns them. If it is enabled
  here, the **course image**, **"What you'll learn"** and **"~ 14 hours"** all close with no backend work.
  Two more to check: **Course Blocks API v2** with `block_counts` (real topic types, instead of `icon`'s
  four values) and the **Bookmarks list endpoint** (the entry point decision 009 has never had). Owner:
  Nelson, in the dev environment — verification before request.
- **The VILT gap closed before we asked it.** Searching all eight payloads for `session`, `recording`,
  `attendance`, `live` and `join` returns nothing, while the one real course is instructor-paced with
  `Session Recordings` and `Session Material` chapters. On the handover call the same day, Nilesh flagged
  that the **live** and **recordings** tabs had been left out; Chitteti is adding both from row 84, due
  4 Aug. Logged in `session-log.md`.
- **Still open, one task each** (Nilesh confirmed new tasks go to Raju, rather than another omnibus
  ticket): the unlock rule, the mentor record, partner branding, `effort_time` **derived rather than
  authored** — ask that before asking anyone to hand-author thousands of blocks — `language`, and
  `user_timezone`, which returns null in all three samples and renders every date in UTC for cohorts split
  between India and Europe. That last one is a defect, not a missing field.
- **Two rules settled with nothing to ask anyone.** Trim `display_name` but never reformat it — the
  payloads carry parasite whitespace (*"Module 5:  SQL Advanced Topics"*, *"Final Quiz "*) and we render
  the field verbatim. And **no letter grades anywhere**: `grade_range` is a single `Pass: 0.7` threshold and
  `letter_grade` is null, so a screen showing A/B/C draws something the platform cannot produce.

## 2026-08-03 · Scope correction — the panel is post-enrolment

**The learner panel never serves an unenrolled course.** Enrolment happens on the site and in the
catalogue; a course reaches this panel only once the learner is enrolled, so `is_enrolled` is always true
on the Course Detail page. The unenrolled and anonymous states drawn earlier the same day were the wrong
surface. They are kept in Figma at the foot of the section under *Out of scope — states the learner panel
never serves*, renamed `OUT OF SCOPE · …`, because they document the boundary — not as work to build.

What it changes, beyond deleting a row of frames from the plan:

- The **anonymous / unenrolled column** of the visibility matrix describes the platform, not us. Only the
  enrolled and staff columns bind. Noted on the matrix in Figma and in `course-details-metadata-map.md` §6.
- **`enroll_alert` never renders here.**
- **The 401s never happen.** Progress and Dates are reachable for every user of this page, so the tab bar
  always renders in full — which firms up the tab decision rather than weakening it.
- **`lms_web_url` is always populated**, so syllabus titles are always links. The "not links, not disabled
  links" nuance is a platform fact, not a state we draw.

**The enrolled lifecycle drawn in their place** — three values, three frames, alongside v10 as the
in-progress state:

- **Never started** (`resume_course.has_visited_course: false`) — 0%, *Start course*, no eyebrow because
  there is no last topic to go to, *0 of 42 topics*, nothing ticked, every module marker neutral. Blue
  reads as *in progress*, and nothing is.
- **Completed** (`cert_data`) — 100%, every topic ticked, every marker green, the last module unlocked,
  *Revisit the course*. The certificate card flips to its issued state: course title,
  `certificate_available_date`, and **View** / **Download** from `cert_web_view_url` and `download_url`.
  Those two URLs are precisely why the certificate works as a card — they are actions, not a destination.
- **Course ended** (`has_ended: true`) — progress freezes, *Review the course*, and the update banner
  becomes an archive notice in the platform's own terms. **Not dismissible**: a dismissible warning about
  a permanent condition is a warning that disappears. The unlock tooltip goes with it — its date is in the
  past and it never had a field behind it.

**Mentor card corrected against decision 007.** It read *"Office hours every Tuesday at 11 AM"* with a
**Book session** button. Decision 007 is accepted and says the opposite — mentoring is unlimited 1:1
**asynchronous messaging**, not scheduled sessions, one mentor assigned at enrolment — and BR-19 sets the
copy: *typically responds within 1 day*. The card is now a single **Message** action plus the SLA line, on
v10 and all three states. v9 keeps the old copy as the record of what the workshop saw. It does not fix the
card's other problem: there is still no mentor field anywhere in the API.

## 2026-08-03 · Course Page metadata applied — Course Detail v10

SK-11378 landed (`_media/Course_metadata.xlsx`): 73 fields, eight endpoints with real payloads from
`course-v1:SkillUp+SQL-TMDA+2025_B13`, 33 features, and a role-based visibility matrix. Full
element-by-element mapping in [course-details-metadata-map.md](course-details-metadata-map.md); the
delivery is logged in `session-log.md`.

- **`Course Detail — v10 · metadata applied (SK-11378)`** built in Platform Pages V8, alongside v9 and
  the workshop panel, which are untouched. Two annotation panels added: **metadata audit** (what has
  data behind it) and **what changed**.
- **Tabs settled — against the room.** `tabs[]` returns Course, Progress, Dates, **Mentorship Q&A** and
  Instructor. No Resources tab, no Grades tab, **no Certificates tab** — grades sit inside Progress and
  the certificate is a card. v10 renders the four a learner receives; Instructor is per-user and staff
  only. This closes the divergence flagged on v9, and it contradicts what Navdeep expected (01:32:08).
- **Syllabus collapsed to Module → Topic.** Their `sequential` level is a fixed three-part bucket —
  *About*, *Lessons*, *Knowledge Check* — repeated in every module, not a lesson. Read literally the
  accordion would say *Module 1 → Lessons → 15 topics* with two dead rows above it. The workshop's own
  fallback (*Module → Topic where a lesson does not exist*) covers it. Counts now read in topics.
- **Three elements added, each backed by a real field:** welcome message banner (`welcome_message_html`,
  dismissible), certificate card (`cert_data`, drawn not-earned to match 38%), handouts card
  (`handouts_html`) — which is what "course-level resources" turns out to be, the thing nobody could
  define at the workshop (01:19:44).
- **What has no data was kept and flagged, not deleted:** every duration on the page (`effort_time`,
  `effort_activities` and `due` are null on every block in every payload), the unlock tooltip
  (`accessible` is a boolean — no date, no prerequisite: that is the answer to open action 8, and it is
  a negative one), *What you'll learn* (no description or objectives field is exposed), the mentor card
  (no such record exists), the course image and the IBM logo (`org` returns `"SkillUp"`), and the topic
  type prefixes (`icon` has four values against a catalogue of twelve and returns only `other`).
- **Resume vs Start resolved** — `resume_course.has_visited_course`, closing an open workshop question.
- **Structural notes for dev:** the topic level is **not in the Outline API** (every sequential returns
  `children: []`) — it needs a second call to the Navigation API, cached one hour — and `lms_web_url` is
  null on verticals there, so topic deep-links must be constructed as `jump_to/{block_id}`.
- **Droppable with evidence:** `verified_mode`, `can_show_upgrade_sock`, `access_expiration` and `offer`
  all return null or false on the real course. Upgrade sock, discount banner and expiration warning are
  stock edX marketplace furniture this B2B configuration does not use.
- **Still unbuilt but backed by data:** dates widget, course tools (**Bookmarks** is in the live
  response), content search, weekly learning goal, and the ended / enrol / missed-deadline banners.
- **`Course Detail — Unenrolled (signed in, can enrol)`** drawn — the state sheet 4 names and nobody had
  ever drawn. The titles are **not links**: `lms_web_url` comes back null, so they render as plain text
  rather than as a disabled interactive style, which is the detail most likely to be built wrong. No
  ticks, no percentage, no lock. **Course is the only tab** — Progress and Dates answer 401, and a tab
  that returns an error is worse than a tab that is absent. The progress card becomes an enrolment card
  from `enroll_alert {can_enroll, extra_text}` and `course_modes[0].name`.
- **The three branches drawn too**, each turning on one value.
  **A · public access off** — `course_blocks` comes back empty, so the syllabus is not a locked list, it is
  nothing; *"4 modules · 42 topics"* goes with it, since those counts are derived from the tree, and the hero
  statistics line is hidden rather than zeroed; the card drops to *"Self-paced"*, the only shape fact that
  survives because `is_self_paced` comes from the metadata call. About a third of the enrolled page.
  **B · anonymous** — `username` null: the Learn and Progress groups and the account chip give way to Sign in
  and Create an account, the breadcrumb loses *My Learning*, Enrol becomes Sign in with the return path
  stated, and the mentor's actions go. A and B compound.
  **C · `can_enroll: false`** — the primary action **disappears rather than being disabled**, and
  `extra_text` takes its place (*"This course is full."*). A disabled button would invite a click that cannot
  succeed and would not say why; the sentence does both jobs.
- **The certificate stays a card, and the reasoning is now written down.** `cert_data` is four fields —
  a card's worth, not a page's; Certificates already exists as an account-level destination in the left
  nav, so a course tab duplicates it; and Harpreet's own marketing argument (01:31:57) favours something
  *seen* over something a click away. It becomes a tab when there is a credential page behind it —
  preview, share, verification link, name on certificate — which is phase two. To confirm at review.
- **The whole thing is documented on the canvas.** The section is renamed *Course Detail — v9, v10,
  unenrolled, and the SK-11378 documentation* and carries four reference tables under
  *Reference — Course Page metadata, SK-11378*: element → field (36 rows, with a ✅ / ◑ / ⚠︎ / ✗ verdict
  on each), the eight endpoints with payloads and caching, the role-based visibility matrix, and a
  decisions-and-open-questions table naming owners. Node IDs listed in
  [course-details-metadata-map.md](course-details-metadata-map.md) §10.

## 2026-08-03 · Results screen rebuilt, and the retry question settled

- **`LMS / Quiz · Results`** — four variants (Passed, Not passed, Pending, Withheld) on the layout from
  the prototype, which was better than what the DS had. No per-question circles; no dash standing in
  for an absent score; and the attempts line now says what it counts — *"1 question still has attempts
  left"* rather than the ambiguous *"4 attempts · Unlimited retakes"*.
- **Retry incorrect vs Retake quiz — the assumption was backwards.** Neither exists as an edX feature,
  but attempts are counted **per problem**, so re-answering only the wrong ones is essentially native;
  what is missing is a UI that collects them. The *full* retake is the invented one: there is no
  subsection attempt object, and `reset_problem()` does not refund a spent attempt, so a retake burns
  one on questions the learner already got right. `Retry incorrect` is therefore the **primary**
  action and `Retake quiz` the secondary — drawing them the other way round would make the expensive
  path look like the default.
- **Answer inputs rebuilt on the DS.** Dropdown now uses the DS `Select`, numerical and text use
  `Input field`, so focus, disabled and destructive states come from the design system. Dropped the
  destructive styling on incorrect: it turns the *answer-format hint* red, which implies the format
  was wrong when the learner may have had the format right and the value wrong.
- **New Figma section `04.4 · Pass mark — a target, not a gate`** — the Coursera rail reconstructed,
  what Open edX gives us (nothing), and DO/DON'T copy examples.
- **"Review lesson first" is buildable.** The vendor's "linking is not possible" applies to content
  authored inside the problem block. Our shell resolves the parent module from course structure, so
  the affordance stands — it just must never be authored into feedback.
- **Open with the vendor:** is Show Reset Button enabled, and what Maximum Attempts are set per
  problem? Those decide whether a full retake is reachable at all. Recorded in `session-log.md`.

## 2026-08-03 · Quiz screen matrix — and a pass mark that does not exist

New **`quizzes/06-quiz-screen-matrix.md`**: crosses the platform settings into the finite set of
learner-reachable screens. 14 question states, 15 quiz states, a 32-screen inventory marked built vs
to-build, flows per type, and the combinations that cannot happen. **Nine of thirty-two are built** —
and the gap is not the exotic cases, it is the locked, closed and withheld states, which is where
learners get stuck and support tickets come from.

Source research against `edx-platform`, `xblocks-contrib`, `frontend-app-authoring`,
`frontend-lib-special-exams` and `edx-proctoring` on `master`:

- **⚠︎ There is no pass mark at quiz level.** `GRADE_CUTOFFS` is course-wide; a subsection has no
  passing threshold. Our screens say "Pass mark 70%", "You needed 60% to pass", "Passed" / "Not
  passed" — **none of it comes from the platform.** Either the per-quiz verdict goes, or the pass mark
  becomes authored metadata we require from content. Biggest gap between what we drew and what the
  backend can answer.
- **⚠︎ `grading_method`** (last / first / highest / average score) renders *"Grading method: Last
  Score"* to learners and is **absent from the educator docs entirely**. Our "best score kept" copy
  must match the configured method, not assume it.
- **A timer forces the whole exam experience** — entry gate, End My Exam, staff-only reset. There is
  no such thing as "a 10-minute quiz" without inheriting the exam UX.
- **True/False is not a separate type** — it is single select with two choices. The picker has exactly
  five: single select, multi-select, dropdown, numerical input, text input.
- **Hints are paginated** — *"Hint (1 of 3):"* with a Next Hint control. We built a single block.
- **`max_attempts = 0`** is a survey question: closed from first render, but Save and Reset stay.
- **Corrected `01-edx-quiz-capabilities.md`**: two Show Answer rows were swapped. `attempted` means
  "attempted OR past due" (Studio labels it "Attempted or Past Due"); `attempted_no_past_due` is the
  one labelled "Attempted". Also `answered` means *correct*, not answered, and the default is
  `finished`.

## 2026-07-30 · Two vendor sessions — quiz types confirmed, Course Page data requested

New **`session-log.md`** — a record of who said what, when, and how sure they were, with every
capability claim tagged CONFIRMED / ASSERTED / CONFLICT / UNVERIFIED. The specs say what we decided;
this says where it came from.

- **Quiz question types — RESOLVED** (Studio walkthrough with Simran Jindal). Multiple choice (~90%
  of usage), checkbox, multiple choice / checkboxes **with hints and feedback** (being adopted now),
  dropdown (rare), numerical input (rare). Staff graded points is an assignment, not a quiz. Closes
  the workshop's action 4. Detail in `quizzes/04-quiz-experience-spec.md` §9.
- **Hints are a design gap.** We built feedback but not hints. They are different moments: a hint is
  the recovery path *inside* an attempt, feedback is the explanation *after* it.
- **"Unlimited retakes" is not a thing.** Open edX has no unlimited setting; authors set a high
  number, and an unset timed exam defaults to **one** attempt. Our screens must stop claiming it.
- **Linking from a quiz to a module is not possible in authored content** — not in questions, not in
  feedback. This does *not* kill our "Review module first" button: that is shell chrome resolved from
  course structure, not authored text. Recorded so nobody reads the limit too broadly.
- **⚠︎ CONFLICT on navigation.** The vendor believes restricting question-skipping "should be
  possible" but has never done it. Our source research says it is not configurable at any level.
  Nelson now has dev-environment access — verify before either side plans on it.
- **Course Page metadata requested** — Jira **SK-11378** (Critical, Sprint 111, information-gathering
  only, no acceptance criteria). Metadata, API payloads, feature inventory and supporting docs, plus a
  Studio course-structure export in Excel. Expected Tue/Wed; the developer has two days. The Course
  Page design stays blocked until at least the metadata section lands.

## 2026-07-30 · Quiz navigation researched — and a data-loss risk found

Asked whether Open edX lets a course team control moving back and forth between questions before
submitting. Researched against `edx-platform`, `frontend-app-learning`, `frontend-lib-special-exams`
and docs.openedx.org. Full record in `quizzes/04-quiz-experience-spec.md` §8.

- **No such setting exists, at any granularity.** Navigation inside a subsection is always free-form.
  `hide_from_toc` only blocks *leaving* the subsection (and is a section-level, operator-gated flag
  absent from the new authoring MFE); timed/proctored exams add a timer and an entry gate but leave
  navigation untouched; prerequisites gate whole subsections. Nothing in `capa_block.py`.
- **The real finding: an unsubmitted answer is silently lost on navigation.** There is no autosave and
  no unload guard, and `should_show_save_button()` returns False when attempts are unlimited — so on
  the **practice** path there is not even a Save button. Graded (2 attempts) and Final (1) do get one,
  but only via a manual click. The learner's *position* is remembered; the answer is not.
- **Consequence:** this is ours to solve in the shell, not a platform setting to configure. The shell
  holds unsubmitted selections in client state and calls `problem_check` only on submit; edX's own
  Save affordance must never be surfaced; and the "still unanswered" counter must be computed from
  submitted answers so it cannot over-report.
- **So "can the learner go back?" is a product choice we implement**, not a toggle we switch. Free
  review is the platform default and the accessible behaviour; restricting it is custom work and
  should be justified against that cost.

## 2026-07-30 · Quiz progress moved inside the quiz container

- `LMS / Quiz · Question Card` now carries the progress row at the top, behind a **`Show progress`**
  boolean (default true), so progress sits in the same box as Skip/Submit. The four standalone
  progress instances above the card (three flows + canonical) were removed to avoid duplication.
- Rationale: inside the box reads as *within the quiz*, outside as *between topics*. The same rule
  answers the "navigation is confusing" report — two paginations competing in one visual plane.
- **Per-question circles marked `_Remove` in the DS.** `LMS / Quiz · Rail Item` → `_Remove · LMS /
  Quiz · Rail Item`, and the `Questions Progress` variation `Quiz · Progress Rail` → `_Remove ·
  Progress Rail`. Verified zero instances of either before renaming, so nothing broke. They are
  marked rather than deleted so a stray reference surfaces loudly; delete once nothing points at them.
  This closes the question for good: the circles are gone as a progress indicator *and* as a review
  interaction, not just relocated.

## 2026-07-29 · Stakeholder workshop — quiz + Course Details decisions applied

Applied the decisions from the ICP workshop with Navdeep and Harpreet (see
`topic-types-inventory.md` §8 for the full record and the rationale).

Verified line by line against the meeting recording — the AI-generated notes were wrong on two
points (the prefix decision was stronger than "don't hardcode"; tabs were *not* left undecided).

- **Quiz — prefix functionality removed entirely.** Not just switched off: the `Show prefix` and
  `Prefix` properties and the prefix layer are deleted from `LMS / Quiz · Option Row`. Navdeep:
  *"We should not provide any functionality of putting a prefix to them"* — a switch nobody will use
  is still dev cost. Reason prefixes are wrong at all: they break option randomisation.
- **Quiz — Disabled state fixed** in the DS (`LMS / Quiz · Option Row`): the row keeps its white
  surface and full-contrast label, only the checkbox/radio is dimmed. Greying the whole row hurt
  readability exactly when learners read the feedback.
- **Quiz — optional metadata rule documented** (duration, attempts, pass mark): render only when the
  backend supplies them; no placeholders, no dashes, no zeros.
- **Course Details rebuilt** as `Course Detail — v9 · Self-paced MVP` (Platform Pages V8), with the
  pre-workshop frame kept alongside as *superseded*. Example course switched to **Six Sigma** to match
  the ICP. Self-paced only; syllabus runs Module → Lesson → Topic with clickable titles; ticks only
  (no current-position marker); no syllabus page, no module-level %, no repeated completion dates, no
  L1/L2/L3 numbering, no course-level resources or assignment deadlines, no cohort/programme cards.
  Unlock info moved from the module subtitle into a tooltip on the lock, and "Locks" corrected to
  "Unlocks". Course stats moved out of the hero to sit under Course Info.
- **⚠︎ Known divergence — tabs.** The workshop decided the tab mechanism stays with Resources and
  Grade as phase two, and expected Grades + Certificates as tabs. The v9 frame is a single page. Kept
  deliberately as an MVP simplification, flagged on the frame and to be agreed at the review.
- **Also applied** (decided in the room, absent from the AI notes): "View submission" and "See
  feedback" are now the same tertiary button; "Submit — final" is now "Submit"; **em dashes removed
  from quiz interface copy** (results heading, description, question text, topic headers, inline
  alerts); the quiz progress now uses the new `Quiz · Progress Bar` variant; the prefix demo column is
  retired. Verified as already correct: "Review module first" was secondary, radio/checkbox literal.
- **Em dashes swept from all components and screens** — 85 text nodes across the ICP screens, 35
  across the LMS component library, each rewritten with the punctuation the sentence needed rather
  than a blind substitution. Canvas annotations and the Untitled UI stock pages were left alone. The
  `Results Summary` pending state no longer shows a bare dash for an unknown score; it reads
  **Pending**.
- **Quiz paginator semantics recorded:** the percentage is **answered ÷ total, not position**, so
  reviewing an earlier question never shrinks the bar. The DS placeholder had three different numbers
  in one component (label 2 of 5, text 67%, bar 70%); all four instances are now consistent.
- **Stock `Progress bar` component fixed** (`1085:57382`, 55 variants). Its `Label=False` family
  mapped the fill from 44 px at 0% to 320 px at 100% instead of 0 to 320, so every value read high and
  the error grew as the percentage fell: 50% drew 57.5%, 20% drew 31.6%, and **0% drew a 13.8% stub**
  of progress for a learner who had answered nothing. Not a scaling problem — the master ratios were
  wrong. All 11 variants re-cut, the 0% sliver removed from the four labelled families, all 55
  verified accurate. Affects every progress bar in the product, not just the quiz. The quiz paginator
  itself uses `Label=Right`, whose ratios were already true — only its 0% sliver needed clearing.
  Verified after publishing: canonical draws 50.4% on "Question 6 of 10", flows draw 20.1% on
  "Question 2 of 5".
- **Per-question circles — resolved.** They were briefly contested: the workshop dropped them, then
  the stepper decision made them the navigator. The new `Quiz · Progress Bar` variant settles it by
  delivering exactly what the room asked for (question X of Y plus a bar) while the stepper's
  Previous/Next carries the navigation the dots used to. The circles are out, in the DS and the
  prototype. No further ruling needed.
- **Still outstanding on the quiz:** "Review module first" must hide when the quiz has no linked
  module; the score colour rules are unspecified (red vs amber for a fail unresolved); and the
  `Results Summary` component still carries the em-dash heading as its library default.
- **Licence (CC) scope** — validated against docs.openedx.org: edX shows the *course* licence at the
  bottom of every content page plus an optional per-video licence on the player. Interim: Video only;
  final scope pending a product decision.

Open after the workshop: course-unlocking research, the definitive quiz question-type list,
interface copy rules, DS differentiation of buttons/links/pills/tags, micro-animations, navigation
strategy, and edX metadata export.

## 2026-07-29 · Quiz layout corrected — a stepper, not a forced scroll

A platform claim this package had been repeating was **wrong**, and the design that followed from it
is reversed. The spec asserted Open edX forces a single stacked scroll because "a unit stacks
multiple components". Checked against primary sources (docs.openedx.org, the Open edX glossary,
`frontend-app-learning` ADR 0002 and its `SequenceNavigation` components), that inference does not
hold — and it contradicted this package's own definition of Subsection.

- **The subsection *is* the quiz-level container** — grading, timed/proctored config, navigation.
- **The platform ships a stepper.** `SequenceNavigation` renders one tab per unit plus
  Previous/Next; the glossary defines the *"unit navigation bar… an icon for each unit in the
  selected subsection"*; `{current} of {total}` is already computed. **One `problem` per unit yields
  a question-by-question stepper natively, with no custom code.** Stepper vs. scroll is an
  **authoring** choice, not a platform limit.
- **What Open edX genuinely lacks** is narrower: no per-question counter, no quiz-level submit-all,
  no end-of-quiz review/summary screen. Our shell supplies all three.
- **Decision — adopt the stepper.** Applied in the prototype: entry header → one question per step
  (unit navigator + Previous/Next question) → results summary; submit stays per question. Recorded
  in `topic-types-inventory.md` §8 and `quizzes/04-quiz-experience-spec.md` §1.4-0c/0d.
- **Competitive comparison added** (`quizzes/02-coursera-quiz-benchmark.md` §7): Coursera is
  single-scroll, Udemy and LinkedIn are steppers, Canvas and Moodle make it an instructor setting.
  Coursera's no-navigator minimalism is affordable only because retries are effectively unlimited —
  **our graded path allows 2 attempts at the whole quiz**, so that trade does not transfer.
  *(Corrected 3 Aug 2026 — this line originally read "per question". An attempt is one run through
  the quiz. See `quizzes/04-quiz-experience-spec.md` §9.3.)*
- **Briefly conflicted with a workshop ruling, now resolved.** The room had decided to drop the
  per-question circle indicators, while the quiz was one scroll and the dots were decoration. The
  stepper turned them into the navigator, which reopened the question. The new `Quiz · Progress Bar`
  variant closes it: the room's ask (question X of Y plus a bar) is what ships, and Previous/Next
  carries the navigation. Circles out, in both the DS and the prototype.
- **Consequence to plan:** existing quizzes must be **re-authored in Studio**, one question per unit.
  Content migration to sequence and cost with Rashid.

## 2026-07-29 · Encyclopedia reframe — two tracks (ICP + LMS) + Archive

Reframed the repo/hub as the **project encyclopedia** around the two big tracks:

- **ICP** — Immersive & Content Types (the in-topic experience) · **LMS** — Platform Pages
  (dashboard, my learning, course/program, calendar, live sessions) · **Foundations** — Design
  System / decisions / research (serves both).
- **Track nomenclature retired A/B → ICP / LMS / Foundations** across the decision log (23 ADRs
  reclassified + INDEX filter-by-track), root README, and hub.
- **`06-v8-complementary/` → `06-platform-pages/`** — now the LMS-track home; V8 Complementary is
  its current WIP artifact.
- **Hub `index.html`** reorganized into ICP · LMS · Foundations · Open Actions · Archive sections;
  Track filter is now ICP / LMS / Foundations.
- **Archive** — the old **v1.8** discovery-hub snapshot moved to `archive/index.html` (linked from
  the hub), so the index shows only the current version.

## 2026-07-28 · Repository reorganization (structure, not a DS version)

Folder-level reorg — the DS version of record stays **v3.3**. Made the workspace self-explanatory
for three audiences (stakeholder / designer / dev):

- **New numbered structure at root:** `00-decisions/` (23 ADRs + INDEX, backboned from Figma
  `3832-18102`), `01-ready-for-dev/`, `02-content-types/` (wires `topic-types-inventory.md`, splits
  §7 into owned questions, promotes the 10-point registration rule), `03-design-system/` (rationale +
  footer-contract; points to the shipped tokens here), `04-research/`, `05-source-docs/`,
  `06-platform-pages/` (Track B). `LMS-HANDOFF/` kept as the deployed package (hybrid).
- **New registers:** root `README.md` (3-audience "start here"), `OPEN-ACTIONS.md`,
  `_archive/ARCHIVE-LOG.md`.
- **Heavy media** (456 MB `.mov`, Coursera captures, 7.9 MB HTML) → `_media/` (gitignored) + stubs.
- **Archived:** `Prework/` (intact — handed to another team), 5 `verify-*.png`, `session-ocr-partial.md`.
- **Stale fixed:** the "NOT YET PUBLISHED" caveats on v3.0/v3.1/v3.3 (published 2026-07-24); the old
  Figma slug in README/BA; "132 components" → ≈155 (recount pending); removed the orphan
  `design-system/maven-icons/` duplicate.
- **Hub (`index.html`):** audience (Stakeholder/Designer/Dev) + track (A/B) filters, This-Week
  Decisions · Ready-for-Dev · Open-Actions sections, status legend, hub-stale banner.

## v3.3 — 2026-07-24 (current) · Accessibility layer + softer decorative borders

> ✅ **PUBLISHED IN FIGMA 2026-07-24.** 1052 variables · 18 CVD primitives · verified 1:1 against
> `tokens/colors.css` (zero divergences). The earlier "DS variables changed, consumers still see
> v2.0" blocker is **resolved** — the triangle (Figma DS · CSS handoff · prototype) is aligned.

### Accessibility Standards (see `variable-collections-guide.md`)

Three axes orthogonal to skin and theme, documented on the Figma page **`♿ Accessibility Standards`**:

- **Colourblind-safe states** (`data-vision="cvd"`) — retunes success/warning/error to an
  Okabe-Ito red-green-safe palette. State colours collapse under CVD (warning ≈ error, ΔE 3.9 for
  deuteranopes); the safe palette separates by blue-yellow + lightness (ΔE ≥ 18), all tiers AA.
  **18 new primitives** `Colors/SKO-Brand/CVD/*`, verified 1:1 against the prototype CSS. The
  `[data-vision]` override lives in CSS (Figma can't conditionally alias across axes).
- **Text size** (`data-text-size`, `--sk-font-scale`) — 100 / 115 / 130%, `.sk-text-*` via calc.
- **Behaviour flags** — reduce-motion, underline-links, large-targets. CSS-only, never variables.

Implemented and running in the prototype (demo panel → Accessibility Standards). Prototype-first;
the DS codifies the values + documents the mechanism.

### Softer decorative borders

`border-secondary` was too heavy (N04). Softened both modes: light → `Neutral/150` (`#d5dce2`),
dark → `Dark-Neutral/650` (`#2c3d45`). Decorative border, exempt from the 3:1 non-text rule.

## v3.1 — 2026-07-22 · Prototype sync — attribute, solid tokens, video stage

> ✅ Published as part of the v3.3 library release (2026-07-24).

Aligns the DS with the deployed prototype (`lms-prototype-mu.vercel.app`), which already consumed
`--sk-*`. A full diff (408 → now 456 comparisons) drove the changes below. See
`modules/skin-switcher/PROTOTYPE-SYNC.md` for the prototype-side work.

### ⚠️ Breaking

- **Attribute `data-brand` → `data-skin`.** The prototype uses `data-skin`; the DS aligned to it
  (lower friction — the DS side wasn't published). `colors.css` and the skin-switcher module both
  updated. Markup using `data-brand` now silently falls back to SKO.

### New tokens (created in Figma)

Rule applied: DS is the source, tokens mirror both ways, and a *fundamental* prototype-only token
is created in the DS too.

- **`bg-success-solid` + `fg-success-on-solid`**, **`bg-warning-solid` + `fg-warning-on-solid`** —
  the prototype had success/warning solid fills but the DS only had `bg-error-solid`. Created to
  complete the triad. The prototype's `warning-solid` (`#ac7720`) failed AA with *any* label
  (white 3.88, dark 3.95); the DS uses `#f9c654` (Yellow/300) with a dark label, 9.64:1.
- **`bg-brand-stage`** — the video-stage backdrop. The prototype derived it as
  `color-mix(#26708e 58%, #000)` with the teal **hardcoded**, so it was dark teal in every skin
  (a bug). In the DS it follows the skin (each ramp's step 900) and is theme-stable.

### Not mirrored (with reason)

- **`fg-like`** — resolves to `#0086c9`, which *is* `fg-progress`. A semantic duplicate, not
  created. The prototype should point `fg-like` at `fg-progress`.

### Prototype still to do

The prototype must adopt `colors.css` v3.1 wholesale — its brand colours are still derived with
`color-mix()` from an anchor instead of using validated ramp steps, which reintroduces the
dark-hover-darkens bug fixed in v3.0. Three DS tokens are also absent there, including
`border-focus-ring` (WCAG 2.4.7). Full checklist in `PROTOTYPE-SYNC.md`.

### Validation

38 LMS tokens · 456 Figma↔CSS comparisons, 0 divergences · 552 contrast checks, 0 AA failures.

## v3.0 — 2026-07-22 · Skin system, dark surface ladder, primitive-layer cleanup

> ✅ **PUBLISHED IN FIGMA 2026-07-24** (as part of the v3.3 library release). Consumers now see
> v3.x. One residual nuance, non-blocking: the visual changes were validated by contrast maths and
> published on Nelson's call — a formal human side-by-side review of the 6 skins was never run.

Triggered by a review of the DS against dark-theme best practice. What started as a colour audit
surfaced structural problems: the skins were hand-picked values with no rule, and the primitive
layer carried role names instead of values.

### ⚠️ Breaking

- **`[data-brand="x"]` no longer exists.** The green demo BrandX was replaced by 5 named skins:
  `gold`, `violet`, `sky`, `red`, `ink`. Markup using `data-brand="x"` silently falls back to SKO.
  New usage: `<html data-brand="ink" data-theme="dark">`.
- **Light-mode text is visibly darker.** `text-secondary`, `text-tertiary`, `text-brand` and
  `text-brand-secondary` all changed. This affects every screen — see "Text hierarchy" below.

### Skin system — from hand-picked to systematic

The 5 non-SKO skins had **42 of 60 values as raw hex**, bypassing the primitive layer entirely.
Only SKO was fully aliased. Each skin now has a **12-step ramp generated in OKLCH** from two
preserved brand anchors (`solid-dark` = 400, `solid-light` = 600), plus 2 deliberately desaturated
surface anchors outside the ramp.

Roles map to fixed positions — no per-skin choices. **0 raw hex values remain.**

This was not cosmetic: the Ink skin's brand text sat at **3.50:1**, below even the 3:1 floor. It
failed because the value was picked by hand. With `text-dark` fixed at step 300, that class of bug
cannot recur.

### Dark mode

- **Surface ladder implemented.** The v1.9 "known limitation" (`bg-secondary` = `bg-primary`, both
  `#212934`) is resolved — 4 distinct surfaces ~1.07:1 apart (`Dark-Neutral/950→700`).
- **Hover now lightens** (step 300) instead of darkening. 5 of 6 skins were darkening on hover,
  which sinks the control against the surface.
- `bg-error-solid` desaturates in dark (`#E26567`) with a dark label — it was the only token in the
  system that never inverted.

### Primitive layer — values, not roles

Role names were removed from `_Primitives`. `Surface-Base` → `Dark-Neutral/950`, `Teal-Text` →
`Dark/Teal/300`, and so on. `Primary` and `Neutral` were numbered by luminosity in the
`{step}_{brand_code}` format the accent ramps already used — brand-guideline codes are preserved.

The single exception is **surfaces**, and it is measured, not convenience: every dark surface falls
below the darkest step of the ramp it would belong to. They live in explicit `Surfaces/` groups.

### Text hierarchy (light)

`bg-tertiary` (`#E1E7EC`) imposes a ceiling of L ≈ 40% on any text over it. The old values were
above that ceiling and failed AA. Two new interpolated Neutral steps were created to fix it:

| token | was | now | worst case |
|---|---|---|---|
| `text-secondary` | `#606B7A` | `#39414C` — `Neutral/800` | 4.34 → **8.28** |
| `text-tertiary` | `#677482` | `#4F5B69` — `Neutral/700` | 3.83 → **5.55** |
| `text-brand` + `-secondary` | brand step 600 | brand step **700** (950 on Ink) | 4.29 → **6.13+** |
| `text-error-primary` (light) | `#DA3336` | `#B62226` — `Red/600_AC3` | 3.74 → **5.19** |
| `text-error-primary` (dark) | `#E8797B` | `#F3AFB0` — `Red/50` | 4.34 → **6.74** |

**Side effect worth naming:** `text-secondary` and `text-tertiary` were 3pp of luminosity apart —
visually the same colour. The hierarchy existed in the tokens but not on screen. They are now 10pp
apart, and primary→secondary 13pp.

### Validation

Contrast coverage went from **16 checks to 540** (9 text tokens × 4 surfaces × 12 skin/mode
combinations, plus 9 explicit semantic pairs). **0 AA failures.**

The v1.9 claim of "16/16 AA per mode" was true but far too narrow — it only tested against
`bg-primary`. Testing against elevated surfaces is what exposed every failure fixed above.

**Validation must auto-discover tokens from `tokens/colors.css`, never from a hand-written pair
list.** Hand-written lists missed tokens three times during this work; the last miss caught
`text-brand-primary` and `text-brand-secondary`, never tested before.

Thinnest pair in the system: `text-success-primary` over `bg-tertiary` in light = **4.51:1**.
Passes by 0.01 — re-validate if either value moves.

### Removed

`!!! ABOUT THIS COLLECTION` (4, content preserved in `variable-collections-guide.md`) ·
`Dark/Teal-Solid` (orphan) · `Skins/Font/family-*` (2, dead duplicates of `Type/family/*`) ·
`Dark/Teal-Hover` (absorbed into `Teal/300`) · `Dark/{Success,Warning,Progress}` (repointed to their
accent ramps) · `hover_Y01_Yellow_Hover` (redundant alias) · 7 orphaned `Skin-Anchors`.

### Unchanged

- Typography tokens and the 47 text styles — untouched.
- Brand-guideline codes (`P01`–`P08`, `N00`–`N06`, `AA`/`AB`/`AC`/`AD` accents) — preserved.
  Numbering is additive, never substitutive.
- Dark-mode neutral text values — only light mode was retuned.

### Known debt

- `Type/family/*` sits in the `3. Responsive` collection, whose mode axis is breakpoints. Font
  family does not vary by screen size. See `variable-collections-guide.md` for why it was not moved
  and what should trigger the fix.

## v2.0 — 2026-06-25 · Token consolidation (--sk- namespace)

Consolidation of the DS tokens following the Design System Discovery and the V7 Immersive token-modes work. Closes the token system.

### Changes
- **Namespace migrated `--lms-*` → `--sk-*`** across `tokens/colors.css` and `tokens/typography.css`. One system namespace for all brands (never per-brand prefixes). The `sk` is the SkillUp Design *System*, not the brand.
- **Typography fixed to Montserrat** (body + display). The previous Inter primary was stale; Inter is not used.
- **Model documented** (see `../03-design-system/rationale/`): brand × scheme combined colour modes (live v1.9); a separate Breakpoints axis (Desktop/Tablet/Mobile) for size/space/radius; font-size uses Option B (chaining) for brand × breakpoint; radius/border vary by brand via role tokens that re-alias per mode; hex only in Primitives.
- **New component:** Input field gains a `Search` type (14 derivations) + reusable `Keyboard key` component with a togglable `Shortcut` property (DS file).

### Unchanged
- The 4 colour modes and all WCAG 2.2 AA validations from v1.9 stand (only the prefix changed).

## v1.9 — 2026-06-16 · 4-mode tokens + WCAG 2.2 AA validated

LMS colour system now operates across 4 modes on the UUI DS file (`c7EUDrQwP8si08aPipDSIV`), collection `1. Color modes`. Every mode passes 16/16 WCAG 2.2 AA contrast checks.

### Modes implemented

| Mode | Strategy |
|---|---|
| Light SKO (default) | Existing teal-on-white. border-primary upgraded N04 → N03 for AA pass |
| Dark SKO | Inverted backgrounds + lighter blues for brand. 4 fixes applied |
| Light BrandX | Green scale AB01-AB06 mirrors SKO blue structure. Demo brand |
| Dark BrandX | Lighter greens (AB04-AB05) on dark neutrals |

### New tokens

- **`LMS/Border/border-focus-ring`** — semantic token for WCAG 2.4.7 Focus Visible. Maps to brand colour per mode (P03 Light SKO / P05 Dark SKO / AB02 Light BrandX / AB04 Dark BrandX).

### New primitive

- **`Colors/SKO-Brand/Accents/Red/AC5b_Red5b` #E8797B** — added to fill the gap between AC5 (saturated red, 4.39 on dark, fails AA by 0.11) and AC6 (pale pink). Gives 5.21:1 on dark. Used by `text-error-primary` in Dark SKO + Dark BrandX only.

### Key Dark SKO fixes

| Token | Was | Now | Reason |
|---|---|---|---|
| bg-brand-hover | Y01 Yellow (bug) | P02 Blue Ink | Leftover yellow from Light mode default |
| text-brand-secondary on badge | P05 (2.99) | P07 (7.5+) | Failed AA on bg-brand-section (P02) |
| bg-brand-solid + text-on-brand | P04 + White (3.94) | P05 + N01 dark (5.43) | Flipped contrast for dark mode button |
| border-primary | N04 (2.71) | N03 (4.20) | AA-compliant neutral |
| text-error-primary | AC5 (4.39) | AC5b (5.21) | New primitive |

### Token validation

DS swatch sheet at node `20022:429459`, page `❖ FOUNDATIONS`. Renders 4 columns side-by-side using `setExplicitVariableModeForCollection` — each column shows live token values + contrast ratio + ✓/✗ per check.

### Code consumption

`tokens/colors.css` now ships 4 mode definitions:
- `:root` → Light mode SKO (default)
- `[data-theme="dark"]` → Dark mode SKO
- `[data-brand="x"]` → Light mode BrandX
- `[data-brand="x"][data-theme="dark"]` → Dark mode BrandX

Toggle via root HTML attributes. No JS required — CSS attribute selectors handle the switch.

### Known limitations

- `bg-secondary` = `bg-primary` in Dark modes (no intermediate dark neutral in scale)
- BrandX is a demo brand. No client behind it.
- WCAG 2.5.8 Target Size validated in screens, not in DS.

## v1.8 — 2026-06-15 · DS migration + handoff page conventions

Major restructure of the Figma handoff. Three new pages built, 132 LMS Extension Components migrated to the DS library, all working-file handoff instances now point to DS-hosted masters.

### DS migration

- **132 LMS Extension Components moved** from working file (`Wz2TCYFVr0hD8tJNiLajLt`) to DS file (`c7EUDrQwP8si08aPipDSIV`) on new page `❖ LMS COMPONENTS ✅` (`1030:33572`)
- 40 top-level masters + 92 variants inside sets
- All instances in handoff screens swapped via `importComponentByKeyAsync` + `swapComponent` — 99.7% remote in Section 02
- Local backup copies kept on the working file Playground page for reference until next major DS sync
- Component keys saved in auto-memory `reference_uui_lms_components_keys.md`

### New variant: LMS / Empty State · Kind=Transcript

- Title: "Transcript not available"
- Body: "Captions aren't available for this video. You can still take notes from the Notes tab."
- Icon: align-left (DS 3463:406358)
- CTA: "Add note"
- Use when a Video topic has no captions — applied automatically on Transcript tab empty state

### New handoff pages

- **`↳ Phase 1 - Video Lesson - Ready for Dev ✅`** — 15 cards (5 rows × 3) with hierarchical numbering (1/1.2/1.3 for Transcript, 2/2.2/2.3 Notes, 3/3.2/3.3 Downloads, 4/4.2/4.3 Player states, 5/5.2/5.3 Note Editor Modal). Each card uses Handoff card header + Subheader + screen-wrap (#C6D0E3) + Page Changelog Header (slot-based).
- **`↳ Phase 1 - Overlay Panels - Ready for Dev ✅`** — 6 cards (2 rows × 3): Notifications D/T/M + Saved D/T/M.
- **`↳ Phase 3 - Completion + Certificate - WIP 🟠`** — 6 cards (2 rows × 3): Course Complete Modal D/T/M + Certificate D/T/M. All descriptions flagged as Phase 3 placeholders with Phase 1 baseline notes.
- **`↳ Diagram Flows + Business Logic`** — Navigation flow diagram + new Business Logic section: 42 Business Rules (8 domain cards), 10 Key Decisions callouts, 24 Reference Document links (BA + Formal + Engineering handoffs).

### Handoff page conventions (now enforced)

- Page name format: `       ↳ Phase X - Flow Domain - Status [emoji]`
- Outer section BG: `#B7B7B7` · screen-wrap inside cards: `#C6D0E3`
- Pages live under parent `READY FOR DEV ✅`, ordered by Phase then logical flow
- Saved to auto-memory `reference_handoff_page_conventions.md`

### DS contributions (Status badges + Card chrome)

- **Status badges** added to DS Design Annotations page: Status/Deferred (`19951:1957`), Status/Draft (`19951:1959`)
- **Handoff card header** promoted to DS component (`19952:1961`) with props: Sequence#0, Title#0, Status#0 (INSTANCE_SWAP), Phase#0 (INSTANCE_SWAP), Show Sequence#0 (BOOLEAN)
- **Page Changelog Header** uses native Figma SLOT primitive (Option D) for dynamic Recent Changes
- All keys saved in auto-memory `reference_uui_handoff_keys.md`

### Cleanup

- 10 inline Figma annotations migrated to Page Changelog descriptions, then removed
- Duplicate orphan card frames cleaned from Diagram Flows page
- Page-level Page Changelog Header removed — kept only per-card
- Figma Link hidden in all Subheaders (per Nelson's call)

**Deferred to Nelson**: 5 clones manual reflow (Cards 2.2/2.3 Notes Tablet/Mobile + 3.2/3.3 Downloads Tablet/Mobile + 5.2/5.3 Note Editor Tablet/Mobile). ⚠ warnings stay in descriptions until reflow done.

---

For v1.0 → v1.7 release notes, see [`history/CHANGELOG-archive.md`](history/CHANGELOG-archive.md).

## Aug 7, 2026 — layer names audited on the DS LMS components page

Same audit as the ICP page, run on `❖ LMS COMPONENTS ✅`. **355 of 7,700 nodes carried a default name** —
`Frame`, `Frame 418`, `Rectangle`, `Ellipse 1`, `Group 1620`, `star`.

**The DS needed a different rule from the ICP page, and it is worth writing down.** On the ICP page names
were derived from each layer's own content. That is wrong inside a component set: **Figma matches layers
across variants by name**, so naming the same logical layer `label · Correct` in one variant and
`label · Incorrect` in the next would break override propagation between them. So inside sets, layers were
grouped by their index path and **every layer in a group got one name**, taken from whichever variant had
text to offer.

| Where | Count | Treatment |
|---|---|---|
| Inside instances | 136 → 33 remaining | **Left alone.** They mirror their own component; renaming creates an override that stops tracking |
| Inside variant sets | 87 | One name per index-path group, applied to every variant |
| Inside single components | 71 | Named from content |
| Loose on the page | 61 | Named from content |

322 layers renamed, by prefix: `label ·` 134, `shape ·` 102, `block ·` 31, `slot ·` 22, `group ·` 15, plus 18
diagram connectors.

**Verified after the pass:** zero default names outside instances, and **zero cases where one logical layer
ended up with two names across variants** — the check that mattered, since that is the failure this approach
was designed to avoid. The 128 index paths that do differ between variants were already different layers —
`LMS / Completion Status` genuinely has `check-icon`, `dot` and `status-circle` at the same position — not
damage from the rename.

## Aug 8, 2026 — `Show state-check-icon` made real, except where it should not be

The property claimed to control the state marker on `LMS / Quiz · Option Row` and only did so on one of the
four variants that have a `state-row`. Now bound on three — and deliberately not on the fourth.

| Variant | Property does |
|---|---|
| `Correct` | hides the ✓ **and collapses the row with it**, so no stray 12px gap is left behind |
| `Incorrect` | same, for the ✗ |
| `Correctly unselected` | hides the *"Un-selected is correct"* marker — there is no icon there, the text is the marker |
| `Missed` | **nothing, on purpose** |

**Why `Missed` is left unbound, and it is not tidiness.** Binding it was tried first, and a probe caught the
consequence immediately: a bound layer takes its visibility from the property, and the property defaults to
`true` — so `Missed` started rendering a green tick it had never had. One boolean cannot default `true` for
`Correct` and `false` for `Missed`; the variant was carrying that decision, and binding it threw the decision
away.

That decision is the rule Nelson set the same day: **a correct answer the learner did not choose shows green
with no tick, because a tick reads as praise for an answer they got wrong.** Leaving the icon hidden at
source keeps it true by construction — nobody can switch it on by flipping a property, and a new instance
cannot default wrong.

Written into the component description, including the instruction not to bind it.

**Verified by probing each variant** — instantiate, read, flip the property, read again:

| Variant | default | property off |
|---|---|---|
| Correct | icon shown | icon hidden, row collapsed |
| Incorrect | icon shown | icon hidden, row collapsed |
| Missed | icon hidden, text shown | unchanged |
| Correctly unselected | text shown | text hidden |
