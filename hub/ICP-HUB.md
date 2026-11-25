<!-- The same content as hub/index.html (the published ICP Hub page), converted to Markdown
     for readable diffs in Git. When the page changes, convert it again. -->

Versão: 2026-11-25 · Mantido por Nelson Jerónimo · Fonte de verdade do LMS/ICP · [Histórico no GitHub](https://github.com/nvjeronimo/skillup-lms-prd/commits/main/hub)

SkillUp LMS · Immersive Course Player

# SkillUp ICP Hub

**Open edX Studio is in charge of the facts; the LMS and the ICP are in charge of how they are presented and consumed.** One place for everything the ICP and platform-pages redesign has settled so far: the status of each content type and each platform page, the platform rules we verified, the decisions and who made them, what is still open, and where every document and Figma page lives.

Last updated 25 Nov 2026 · maintained by Nelson Jerónimo · source files in [LMS-HANDOFF](https://github.com/nvjeronimo/skillup-lms-prd/tree/main/LMS-HANDOFF)

* [1 Content types](#status)
* [2 Platform pages](#platform)
* [3 Platform rules](#rules)
* [4 Design standards](#standards)
* [5 Motion](#motion)
* [6 Decisions](#decisions)
* [7 Open questions](#open)
* [8 Documents](#docs)
* [9 Components](#components)
* [10 Figma](#figma)
* [11 Published pages](#pages)

<a id="status"></a>

## Content types: where each one stands

The topic content types we design, in priority order. Volume comes from the program syllabus (280 topics). Reading, Video and VILT make up 76% of all topics.

| Type | Status | Volume | What exists | Read |
| --- | --- | --- | --- | --- |
| **Reading** <br>html block + files · manual completion | Ready for dev | 84 · 30% | 21 screens incl. ORA text-only (desktop, tablet, mobile) + an example holding every block Studio can author. Mark as Complete at the end of the content, in the same row as the feedback, on the right (under the feedback on a phone), since 13 Oct; since 12 Oct 2026 Next asks if the learner moves on without it. | [reading-screen-matrix](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/reading-screen-matrix.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=5685-170870) |
| **Video** <br>video block · auto-complete at ≥90% watched | Ready for dev | 76 · 27% | Full player flow, light and dark, all breakpoints. In the prototype since 21 Oct it completes by itself at 90% played (no Mark as Complete when playback is measured). Since 4 Nov 2026 two YouTube rows are in review on the same page: [row 9](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8265-20321), a YouTube embed in a Text component (YouTube's own player, progress not tracked, an Info alert, Mark as Complete, Next asks) and [row 10](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8265-22232), a Video component with a YouTube ID (our player, completes by itself, no transcript, a *video not available* state); desktop, tablet and mobile, Dark not drawn yet. Both rows play in the prototype's YouTube Video Test course, in the [SCORM and YouTube Test Program](https://lms-prototype-mu.vercel.app/platform/program/scorm-and-youtube-tests) (prototype PR [469](https://github.com/nvjeronimo/skillup-lms-prototype/pull/469)) ([meeting notes](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/meeting-2026-11-04-scorm-youtube.md)). Since prototype PR [471](https://github.com/nvjeronimo/skillup-lms-prototype/pull/471) (merged) row 10 really plays the YouTube video inside our player (YouTube IFrame Player API, YouTube's controls off, our bar drives it): the time comes from YouTube, only time really played counts towards the 90% auto-complete, a seek does not count, and a video YouTube refuses shows the *isn't available* panel; before, it ran a simulated clock over a flat colour. Every other Video topic plays a real SkillUp lesson (Introduction to Digital Marketing, course SUIPSKO-600102) in our player, looping; duration, transcript and 90% completion are unchanged. The signed storage address is not in the public repo: it comes from the Vercel variable NEXT\_PUBLIC\_SAMPLE\_VIDEO\_SRC, which Nelson still has to set; until then those topics show the poster. Amended 10 Nov 2026: YouTube in our player (row 10) started playing by itself on opening, because a jump to the start position plays a video that has not started; it now waits for Play (prototype PR [477](https://github.com/nvjeronimo/skillup-lms-prototype/pull/477), merged 11 Nov). Amended 11 Nov 2026: Vikas confirmed that YouTube videos can play inside our ICP video player, so learners can see one player for Azure and YouTube (row 10). Navdeep has not signed off the YouTube rows yet (Kirti asked, 11 Nov). Amended 12 Nov 2026 ([decision 041](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/041-youtube-official-embed-only.md)): YouTube plays only in YouTube's official embed (row 9). Row 10 is withdrawn and marked SUPERSEDED: the tech team found that YouTube's logo and its link must stay visible and clickable (covering them or sandboxing the iframe is not allowed), and row 10 put our controls over them; this replaces Vikas's 11 Nov answer. Row 9 gets a second screen, *back from YouTube*: when the learner returns to the tab before completing, the Info alert asks *Welcome back. Did you finish the video?* and points to Mark as Complete. The embed's size comes from the ICP CSS, not Studio: full content width at 16:9, whatever size was pasted. A video that must not open on YouTube goes to Azure. The YouTube Video Test course now has a reading, the embed and a lesson page with text, the embed and a quick check (prototype PR [484](https://github.com/nvjeronimo/skillup-lms-prototype/pull/484), merged; docs PRs [253](https://github.com/nvjeronimo/skillup-lms-prd/pull/253), [254](https://github.com/nvjeronimo/skillup-lms-prd/pull/254), merged). Amended 17 Nov 2026: row 9 approved (Nelson) and Ready for Dev, on the Video Lessons Ready for Dev page (desktop, tablet, mobile, with the back-from-YouTube screen); row 10 stays SUPERSEDED. The design is unchanged. Amended 17 Nov 2026 (later): for the Zeplin export, the YouTube rows left the approved Video frame for a frame of their own, *ICP Phase 1 - Video Lesson · YouTube - Light - Ready ✅* ([8549-22740](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8549-22740), 7 615 × 5 109 px, below the approved frame, with its own Ready for dev banner): row 9, and row 10 still hidden as SUPERSEDED. Rows were moved, not copied, so instances and overrides are intact. The approved frame [3785-14661](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3785-14661) keeps rows 1–8 (4 536 × 14 075 px). Nelson's corrections on the first 9.2 tablet screen were carried to the rest of row 9: the YouTube progress note sits in a *Progress note row* frame with padding (16/20 on tablet, 16/24 on desktop; the three frames called *Frame 1* renamed), the transcript area fits its content so Previous / Next sit right under it on tablet, the 9.2 screen is back to 960 × 1056 with the sidebar full height, and the stacked tablet and mobile screens are 16 px apart. Screen sizes stay 1440 × 1024 desktop, 960 × 1056 tablet, 375 × 917 mobile. Still to do (Nelson): Ready for development on the new frame in Dev Mode, and a new Zeplin export of both frames. | [screens-spec](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/screens-spec.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3785-11385) |
| **VILT** <br>live-session data, later a recording | Discovery | 53 · 19% | Explored on the discovery page; the biggest gap by volume | [topic-types-inventory](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/topic-types-inventory.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4692-444) |
| **Quiz** <br>problem blocks · 2% of topics, 100% of the grade | Ready for dev (mode A-2) | 6 · 2% | A-2 delivery (18 screens); A-1 and B kept for reference | [two-modes](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/quizzes/08-two-modes.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=5089-15920) |
| **Lab** <br>notebook + PDF, or a lab on the partner's own platform | Ready for dev | 24 · 9% | The download preset stays on the discovery page. Labs that run on Google, Microsoft and IBM platforms have their own page since 8 Oct. Ready for dev since 25 Nov 2026 (Nelson): 30 cards, ten screens on desktop, tablet and mobile; the six Opened cards (G2, M2) moved to a *Not for now* section on the same page. Open questions are Figma comments on cards G1, E1 and I1. A lab opens in a new tab by default; a second row shows the lab inside the page, for the few courses that already have it. The learner completes the lab with Mark as Complete at the end of the content, in the same row as the feedback, on the right (under the feedback on a phone), since 13 Oct; the footer is the usual Previous and Next, and Next asks if they move on without it (12 Oct 2026). The launch card stays Ready, also on the question and completed screens, and never says the lab is complete: SkillUp cannot tell whether the lab was opened (Komal, 19 Oct), so the Opened state is not for now. On a partner lab the launch button stays primary and Mark as Complete secondary; Before you start and the computer warning stay until the topic is completed; How this lab works and the author row are hidden. The launch card is a design system component. Answers are still pending from the content team, listed under Open questions. In the prototype the partner labs follow these screens since 19 Oct: nothing comes back from the partner, the launch card stays Ready with its button primary and Mark as Complete secondary, Before you start and the computer warning stay until the topic is completed, the steps and the author are not shown, and the lab inside the page and the frame not loading can be switched on from the demo menu on the Microsoft lab. IBM has been in the prototype since 8 Oct as a course hosted by the partner on Course Detail. | [lab-third-party-platforms](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6789-325) |
| **Podcast** <br>goes through the Video component (Simran, 22 Sep) | Folds into Video? | 19 · 7% | Rendered as a video with cover art; the audio player is kept for later. Completes by itself at 90% played in the prototype since 21 Oct. | [matrix §13](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/reading-screen-matrix.md) |
| **Activity** <br>SCORM · not mobile-ready | Ready for dev | 10 · 4% | Screens drawn 19 Oct: in the page (default) · new window · exceptions · course packages (POSH); completion from the package, no Mark as Complete; max one per unit, not in the mobile app (notice + Open anyway). Since 4 Nov 2026 a course package is one topic named after the course, 0% until the package reports, then 100% (checked 11 Nov: a SCORM 1.2 package sends a status, never a percentage); group D redrawn with the collapsed sidebar showing that one topic and the footer *1 of 1* (groups A–C stay WIP). Four real SCORM 1.2 packages play in the prototype's [SCORM Test Course](https://lms-prototype-mu.vercel.app/platform/course/scorm-test-course) (prototype PR [468](https://github.com/nvjeronimo/skillup-lms-prototype/pull/468)); the same four also play as course packages of one topic each (sidebar collapsed, footer *1 of 1* without Previous) in the [SCORM and YouTube Test Program](https://lms-prototype-mu.vercel.app/platform/program/scorm-and-youtube-tests) on My Learning (prototype PR [469](https://github.com/nvjeronimo/skillup-lms-prototype/pull/469)) ([meeting notes](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/meeting-2026-11-04-scorm-youtube.md)). Since prototype PR [470](https://github.com/nvjeronimo/skillup-lms-prototype/pull/470) (merged) a course package uses the 3-level sidebar shape (Content Shape Levels): no Module, no Lesson, the one topic straight under the Course Header, so the collapsed rail shows no M1 / L1; the same PR fixed a hydration error on SCORM topics. In the ICP, Activity · SCORM group D: M1 hidden in the four collapsed rails (D1, D3, D1.2, D3.2), each of those cards with a Recent changes entry; D2 and the mobile cards do not show our sidebar. Since 10 Nov 2026: one package = one topic, so a SCORM course is either several package topics inside our modules or one whole-course package (group D); a course package's frame is the height of the window (PR [475](https://github.com/nvjeronimo/skillup-lms-prototype/pull/475)); *Golf Explained* (a package with its own menu) and the content team's POSH course in two packages (Rise + Storyline quiz) play as courses 7–9 of the test program (PRs [472](https://github.com/nvjeronimo/skillup-lms-prototype/pull/472), [476](https://github.com/nvjeronimo/skillup-lms-prototype/pull/476)); ICP group D cards D4, D5 (desktop, tablet, mobile) from the prototype screenshots. Since 11 Nov 2026 a course package fills the whole content area: no header, introduction, alert, Fullscreen button, border or margin of ours; the package's own menu and title are the page, beside our collapsed sidebar and above our footer (Nelson; prototype PR [478](https://github.com/nvjeronimo/skillup-lms-prototype/pull/478), merged; ICP cards D1 to D5 redrawn, desktop, tablet and mobile). POSH seen reporting completed in the prototype (Jaspinder, 11 Nov); full screen is no longer offered on a course package. Not checked: the quiz score. Proposal of 11 Nov 2026, not decided: an improved course-package flow (status instead of a percentage, nothing of ours around a single package, Next asks before leaving an unfinished one), in the test program's courses 5 and 6 (prototype PR [480](https://github.com/nvjeronimo/skillup-lms-prototype/pull/480)) and ICP Activity · SCORM section E; see Open questions. Since 11 Nov 2026 the test program keeps only courses backed by a SkillUp zip (Nelson; prototype PR [481](https://github.com/nvjeronimo/skillup-lms-prototype/pull/481), merged): the four GenAI activities as whole courses and *Golf Explained* are removed (the four still play inside the SCORM Test Course's units); POSH, its quiz and the proposals are now courses 3 to 6; ICP cards D6 to D10 are SUPERSEDED. The course page no longer shows *Content to be provided.* for a course package's module (prototype PR [482](https://github.com/nvjeronimo/skillup-lms-prototype/pull/482)). Amended 17 Nov 2026: approved (Nelson) and Ready for Dev. The ICP page moved under Ready for Dev as *Phase 1 · Activity · SCORM - Ready for Dev* ([7428-1069](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7428-1069)): 50 cards (16 desktop, 16 tablet, 18 mobile) in four groups, A in the page, B new window, C exceptions (C2 mobile web: notice + Open anyway; C3 native app: notice only, decision 023) and E the canonical course-package flow ([decision 042](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/042-single-topic-course-no-sidebar.md)); group D stays on the page as SUPERSEDED history. Dark is out of this cycle; *Skip for now* is still open. Amended 17 Nov 2026, DS audit: the Ready for Dev screens were checked for components and tokens (no detached instances, no local copies of DS components, no hex colours inside the screens). The E2/E3 course page and program row were fixed in the ICP: 48 texts on DS text styles (12 px raised to 13, the 22 px title to headline-small), 72 spacings on Spacing/*, 8 radii on Radius/card and card-inset, and 18 progress-ring strokes back to the component's 4 px. 13 points wait for a decision (four have their own open questions); see Open questions and the [audit](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/scorm-ds-audit-2026-11-17.md). Amended 17 Nov 2026 (later): the Ready frame (11 128 × 22 582 px) was too large for Zeplin to export, so it is now four frames, one per flow, desktop, tablet and mobile stacked, all 11 128 px wide: 01 A [7428-1070](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7428-1070) (Ready for Dev), 02 B [8515-17228](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8515-17228), 03 C [8515-17234](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8515-17234) and 04 E [8515-17240](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8515-17240) (with the canonical note). Rows were moved, not copied, so instances and overrides are intact; all 50 screens are there; the original is archived as [8514-21571](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8514-21571). Frames 02 to 04 still need Ready for Dev in Dev Mode (Nelson), and frames exported to Zeplin before the component swaps below must be exported again. The E2 and E3 screens (course page and program row) now use DS components: 21 swaps to SKO DS V3 (E2: Topbar, Breadcrumbs, Delivery-Mode-Badge, Horizontal tabs (Underline), Alert (Brand); E3: Difficulty-Badge, Delivery-Mode-Badge); the 44 player screens already used instances. Visible changes: the real Topbar is 8 px taller, tabs are underlined, badges outlined, and the E2 tablet and mobile screens grew 38 and 68 px. Still local: the status card and hero, the E3 program row and mobile card, the meta strip and the Phase badge; see Open questions. The YouTube frames were split the same day (see Video). | [activity-scorm](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/activity-scorm.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7428-1069) · [studio-authoring-parity](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/studio-authoring-parity.md) |
| **Final Project** <br>ORA-backed structure | Discovery | 8 · 3% | ORA components cover all five Studio flows, text-only and upload | [ora-explained](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/quizzes/05-ora-explained.md) |
| **Programming Assignment · Role Play · Dialogue** <br>Coursera-native features | Blocked | 0 | No Open edX equivalent; needs a build-or-buy decision first | [topic-types-inventory §2](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/topic-types-inventory.md) |
| **Discussion** | Not a type | 0 | Course-level chrome plus an optional footer (29 Jul) | [topic-types-inventory](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/topic-types-inventory.md) |

<a id="platform"></a>

## Platform pages: where each one stands

The pages around the course. A page is ready for dev only when Nelson marks its handoff frame. Everything else is in progress.

| Page | Status | Screens | Where it stands | Read |
| --- | --- | --- | --- | --- |
| **Course Detail** <br>self-paced · Course, Progress, Mentorship Q&A · Dates only on instructor-led courses, on hold (decision 036) | Ready for dev: Course, Progress · WIP: Dates (instructor-led only, on hold), Mentorship Q&A (on hold) | 6 + 1<br>6 screens + 1 edge-case card | A self-paced course shows Course, Progress and Mentorship Q&A on desktop, tablet and mobile; the Dates tab shows only on instructor-led courses and is on hold (decision 036). Every element is mapped to the Open edX field behind it. Since 27 Oct 2026 only the Course and Progress tabs are on Ready for Dev; the Dates and Mentorship Q&A tabs are not approved yet (Nelson) and stay on Platform Pages – WIP › 03 · Course Detail ([Row 3 · Dates tab](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7497-260504), [Row 4 · Mentorship Q&A tab](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7495-212081)). Since 28 Oct 2026 the Dates tab is hidden on self-paced courses and on hold (decision 036); Mentorship Q&A is on hold until the mentorship strategy session. In the prototype since 8 Oct: Course, Progress, Dates and Mentorship Q&A on desktop, tablet and mobile (Dates hidden on self-paced courses since prototype PR 411; the course search works on sample content). Since 20 Oct the passed course is drawn too, in review: the Course tab on desktop, tablet and mobile (100% Completed, Passed 88%, certificate earned). Since 3 Nov 2026 the Mentorship Q&A conversation header lets the question title and author line fill the width up to the menu button (prototype PR [461](https://github.com/nvjeronimo/skillup-lms-prototype/pull/461); ICP Row 4), and the composer keeps *Post anonymously*, Open edX's own checkbox for a course with allow\_anonymous on (decision 040). On 12 Nov 2026 the dev build's Mentor card (SK-11861) was reviewed against DS Sidebar-Card Kind=Mentor Q&A: copy, colours, spacing, position and the link to the course's Mentorship Q&A match; to fix, the radius (10 → 12) and the label size (12 → 13), and the phone type scale on mobile (a token issue). Approved once the first two are fixed; where the card leads may change while Mentorship Q&A is on hold. | [metadata map](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/course-details-metadata-map.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6146-10226) · [WIP page](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6207-245582) |
| **Weekly goal card** <br>component handoff | Ready for dev | 3 | States, edge cases and what counts as a day. The feature is native to Open edX and switched off on the SkillUp courses seen so far. | [metadata map §17](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/course-details-metadata-map.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6350-7334) |
| **Certificates** <br>component handoff | Ready for dev | 1 | The certificate card in its four states. | [metadata map §31](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/course-details-metadata-map.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6353-7518) |
| **My Learning and Dashboard** <br>Dashboard · Courses · Programs | In progress | 11 | Desktop, tablet and mobile. Since 7 Oct the screens show only what Open edX serves. Prototype brought in line with these screens on 8 Oct. Since 9 Oct every course opens under its own title in the prototype. Since 10 Oct the cards are clickable as a whole and the totals were recounted. Since 11 Oct every course on My Learning is a course row and the Grid / List toggle is a track with a pill. Since 12 Oct the top bar shows its sections as underline tabs and the Dashboard rows lead with the module the learner left off in; all of it is in the prototype. Since 13 Oct: one ordered list per tab with a status filter, a two-row toolbar, no stats at the top; completed cards use State=Completed; Browse catalog hidden. Since 14 Oct (decision 025) a course of a program has no card of its own in the course list: it is reached from its program page or from the Dashboard's "Pick up where you left off". Since 15 Oct the desktop Dashboard and My Learning · Courses screens on the Ready for Dev page carry a dev note on navigation: the card-click rule and decision 025 with its three exceptions; the My Learning note also says how to filter program courses out of Learner Home. | [metadata map §33, §37](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/course-details-metadata-map.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6408-35150) · [WIP page](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6207-245582) |
| **Program Page** <br>Courses · Certificates · FAQs · About | In progress | 12 | The four tabs on desktop, tablet and mobile. Since 30 Oct 2026 the Certificates tab uses the full width (no Program dates / instructor sidebar): the Program certificate card (the sheet, or a locked preview "Complete all N courses"; "Yours when all N courses are complete."; issued with the partners, an ID anyone can verify, ready for LinkedIn; a plain card, no green fill), then "Course certificates one per course" under the Dashboard Section header, and a card for every course of the program, titled without "Course n ·": earned, or a muted preview of its sheet with "Pass the course", "Not earned yet" and the two conditions. No path of steps on this tab: a learner may take the courses in any order. Since 31 Oct 2026 the Program certificate card has the course stepper again under its state line (one segment per course, green once complete, light blue in progress, grey not started; "N of M courses complete"), before and after the certificate is issued, and an issued course certificate says Earned at the far end of its "Certificate" eyebrow (prototype PRs [446](https://github.com/nvjeronimo/skillup-lms-prototype/pull/446), [447](https://github.com/nvjeronimo/skillup-lms-prototype/pull/447), [448](https://github.com/nvjeronimo/skillup-lms-prototype/pull/448), [449](https://github.com/nvjeronimo/skillup-lms-prototype/pull/449)). Earlier: no progress on the tab (prototype PRs [438](https://github.com/nvjeronimo/skillup-lms-prototype/pull/438), [439](https://github.com/nvjeronimo/skillup-lms-prototype/pull/439), [440](https://github.com/nvjeronimo/skillup-lms-prototype/pull/440), [443](https://github.com/nvjeronimo/skillup-lms-prototype/pull/443), [444](https://github.com/nvjeronimo/skillup-lms-prototype/pull/444), merged). Since 2 Nov 2026 the Earned badge leads with the certificate icon (award) instead of the check, and the page tabs are one step down the ramp, title-medium (text-lg, 18/24 on every breakpoint; the other platform pages keep title-large) (prototype PRs [450](https://github.com/nvjeronimo/skillup-lms-prototype/pull/450), [452](https://github.com/nvjeronimo/skillup-lms-prototype/pull/452)). DS Program-Certificate 1.5 (stepper on Not earned and Earned) and Certificate-Card 1.6 (Earned badge with the certificate icon), published 2 Nov; Certificate-Card 1.7 since 3 Nov: the course certificate cards show View and Share, no Download (decision 039, prototype PR 455). ICP: the WIP screens 04 / 05 / 06 · LMS-Program-Certificates redrawn (r3 on 31 Oct, [desktop](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7495-227665)), the previous ones kept as SUPERSEDED. Since 8 Oct the tablet and mobile screens use the design system's Program header and compact course row, with no local stand-ins left. The handoff frame was built on 8 Oct with twelve cards and is in progress; it is ready for dev only when Nelson marks it. Prototype brought in line with these screens on 8 Oct. Since 9 Oct every course opens under its own title in the prototype. Since 10 Oct the prototype has a second program, Cybersecurity, and a program certificate page as a proposal. Since 14 Oct (decision 025) the program page is the way into its courses. Since 15 Oct the desktop Program · Courses screen on the Ready for Dev page carries the same navigation dev note. | [metadata map §35](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/course-details-metadata-map.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6728-15050) · [WIP page](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6207-245582) |
| **Content search** <br>feature 33 · the search inside a course | In progress | 8 | What the learner sees from the first key: typing, searching, results, results by type, no results and error on desktop; typing and results on mobile. Drawn on what the Open edX search returns. No handoff frame yet. In the prototype since 8 Oct on Course Detail, on sample content: results under the field, a full screen on mobile. | [metadata map §39](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/course-details-metadata-map.md#39-content-search-feature-33--what-the-learner-sees--8-oct) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6837-27914) |
| **Course-Header backgrounds** <br>assets for export · asked by the dev team | In progress | 6 + 8 | The course and program header background, two ways: six images with the circles in them, one per device and kind, or the two circles as eight SVG pieces with a table of sizes and offsets, the colour staying in CSS. For the dev team to try both. | [metadata map §38](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/course-details-metadata-map.md#38-course-header-backgrounds-for-export--8-oct) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6831-22084) |
| **AI Assistant · Search + Assistant and first steps** <br>from the top bars · platform pages and course player (the floating chat retired 26 Oct) | In progress | 0 | In the prototype since 13 Oct: scripted answers by default, Claude when a key is configured; the five first steps open once for a learner who has just arrived. In Figma it is only on the feature preview page, not on any screen. Not backed by Open edX: nothing there serves an assistant. Since 26 Oct the player launcher sits bottom right of the content card ([prototype PR 358](https://github.com/nvjeronimo/skillup-lms-prototype/pull/358)), and Harbor and Fluent on desktop open a panel-style assistant from the top bar ([prototype PR 359](https://github.com/nvjeronimo/skillup-lms-prototype/pull/359)). Since 26 Oct the top-bar pill is in every skin on platform pages (SKO, Gold and Studio from 1280 px), and the floating launcher stays in the player and on narrower or compact bars ([prototype PR 365](https://github.com/nvjeronimo/skillup-lms-prototype/pull/365)). Since 26 Oct the floating launcher is retired: the assistant opens from Search + Assistant on every platform page and in the player (scoped to the course), and from a search button with a full-screen sheet where the pill does not fit; the floating chat is kept behind ?assistant=floating ([prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369), [prototype PR 371](https://github.com/nvjeronimo/skillup-lms-prototype/pull/371)). Since 27 Oct the window closes on a press outside it on tablet and desktop, focus staying where the learner pressed ([prototype PR 398](https://github.com/nvjeronimo/skillup-lms-prototype/pull/398)). | [assistant spec](https://github.com/nvjeronimo/skillup-lms-prototype/blob/main/docs/superpowers/specs/2026-10-13-assistant-design.md) · [first steps spec](https://github.com/nvjeronimo/skillup-lms-prototype/blob/main/docs/superpowers/specs/2026-10-13-first-steps-design.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7166-328) |
| **Calendar** <br>every course's dates in one place | In progress | 3 | Every course's dates in one place: deadlines, live sessions (marked: not in Open edX, out of the MVP) and course opens and ends. Missed deadlines come first, with Shift my dates; on today's courses the deadlines, the missed-deadline list and Shift my dates are examples only (no due dates are configured, decision 036), and live sessions stay. The learner sees an Agenda by day or a Month. In the prototype since 17 Oct (PR 187, merged). Since 23 Oct the phone has a compact Month view: each day shows its number and one dot per kind of date, the picked day lists its dates under the grid ([prototype PR 275](https://github.com/nvjeronimo/skillup-lms-prototype/pull/275); no Figma screen yet). The kind filter and the Agenda / Month switch sit side by side on every breakpoint; below md Agenda and Month are icons only (44 × 44, still named), from md up icon and label ([prototype PR 278](https://github.com/nvjeronimo/skillup-lms-prototype/pull/278)). Approved 19 Oct 2026; drawn in Figma (Ready for Dev, frame 7392:200778, WIP). | [prototype](https://lms-prototype-mu.vercel.app/platform/calendar) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7392-200778) · [WIP page](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6207-245582) |
| **Discussion** <br>every course's discussions in one inbox | In progress | 4 | Every course's discussions in one inbox, laid out like the course Q&A tab: Unread, My posts, a course filter and search (Following removed: Kirti, meeting of 28 Oct 2026). Mentorship Q&A, the course tab it follows, is on hold until the mentorship strategy session. In the prototype since 17 Oct (PR 187, merged). Approved 19 Oct 2026; drawn in Figma (Ready for Dev, frame 7392:200778, WIP). Four screens, the mobile list and the mobile conversation among them. | [prototype](https://lms-prototype-mu.vercel.app/platform/discussion) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7392-200778) · [WIP page](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6207-245582) |
| **Services** <br>mentor, career, support, benefits and tools | In progress | 3 | The mentor first (ADR 007, asynchronous; Phase 2; how a mentor is assigned is still open), then Career, Support, and Benefits and tools. SkillUp's own, not Open edX. In the prototype since 17 Oct (PR 187, merged). Approved 19 Oct 2026; drawn in Figma (Ready for Dev, frame 7392:200778, WIP). | [prototype](https://lms-prototype-mu.vercel.app/platform/services) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7392-200778) · [WIP page](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6207-245582) |
| **Edit profile** <br>/platform/profile · Open edX learner profile + account settings | In review | 3 | One page, two sections. Your profile: photo, username (read-only), country, spoken language, education, about me (300 characters), LinkedIn, and visibility (full or limited). Account: full name, email (confirmed by email), site language, time zone, and reset password (by email). Drawn on the platform pages WIP page, desktop 1280, tablet and mobile 375. Reached from Edit profile in the profile menu. In the prototype in PR 198 (merged). Since 21 Oct (PR 222, merged) its selects are the DS Select and the learner's avatar is the rounded square (Radius/control), in the prototype and in the ICP Edit profile screens. | [prototype](https://lms-prototype-mu.vercel.app/platform/profile) · [PR 198](https://github.com/nvjeronimo/skillup-lms-prototype/pull/198) · [PR 222](https://github.com/nvjeronimo/skillup-lms-prototype/pull/222) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6207-245582) |
| **Certificates** <br>/platform/certificates | In review | 4<br>redrawn 30 Oct (r4); older screens kept as SUPERSEDED | Since 30 Oct 2026 My Certificates is a ledger by program (Nelson). The Earned / In progress tabs are gone: two DS Button groups, Programs | Single courses and All | In progress | Earned, then column labels (Certificate, Status) on desktop and tablet. One card per program: its certificate row on the card's white, like the other rows (since 2 Nov 2026; on bg/subtle before) (Earned with View certificate + Share, or the courses complete over a bar with View program), a fold line ("N of M course certificates earned"), and every course of the program as a row one step in on a 1px rail, earned or not: Earned (sheet, date, View + Share), In progress (bar, Continue), Not started (View course). Single courses sit in one card. The course rows start folded on every breakpoint, the fold line opening them (since 3 Nov 2026, prototype PR [454](https://github.com/nvjeronimo/skillup-lms-prototype/pull/454); before, only on phones). On phones the rows stack; a row without a certificate is a link with a chevron. Search is unchanged. Every earned row says View certificate, and the row's thumb opens the course or program page, as the title does (prototype PRs [441](https://github.com/nvjeronimo/skillup-lms-prototype/pull/441), [442](https://github.com/nvjeronimo/skillup-lms-prototype/pull/442)). [prototype PR 437](https://github.com/nvjeronimo/skillup-lms-prototype/pull/437) (merged). Every Earned badge leads with the certificate icon since 2 Nov 2026 (prototype PRs [450](https://github.com/nvjeronimo/skillup-lms-prototype/pull/450), [451](https://github.com/nvjeronimo/skillup-lms-prototype/pull/451)). DS: LMS/Platform/Certificates/Program-Certificates-Card 1.4 (folded by default) and Certificate-Card 1.7 (Earned: View and Share, no Download: decision 039, [prototype PR 455](https://github.com/nvjeronimo/skillup-lms-prototype/pull/455)), both published 3 Nov, and Certificate-Row 1.4 (published 2 Nov). ICP 05 · Certificates: the desktop and tablet program cards are folded too (3 Nov). The ICP Platform Pages – WIP frame "05 · Certificates" is redrawn on them (Programs on desktop, tablet and mobile; Single courses on desktop); the 29 Oct screens are kept, marked SUPERSEDED. Reached from the Dashboard Certificates tile, Services and the profile menu. The one-certificate page (a course certificate issued, a program not earned yet) is drawn too. Earlier: 29 Oct, one card per program with Show / Hide and two tabs ([prototype PR 428](https://github.com/nvjeronimo/skillup-lms-prototype/pull/428)); 26 Oct, blocks per program ([PR 378](https://github.com/nvjeronimo/skillup-lms-prototype/pull/378)); 21 Oct, tabs, search and Grid / List ([PR 241](https://github.com/nvjeronimo/skillup-lms-prototype/pull/241)); PR 201, two stacked sections. | [prototype](https://lms-prototype-mu.vercel.app/platform/certificates) · [PR 437](https://github.com/nvjeronimo/skillup-lms-prototype/pull/437) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7584-94993) |
| **Notifications (overlay)** <br>the bell of the top bar | In review | 3 | The bell of the platform top bar opens the same Notifications panel as the player. Desktop, tablet and mobile, drawn on 20 Oct on the platform pages WIP page (frame 09). In the prototype in PR 197 (merged). | [PR 197](https://github.com/nvjeronimo/skillup-lms-prototype/pull/197) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6207-245582) |

**Accessibility, 21 Oct.** axe-core 4.10 (WCAG 2.1 AA) on the nine platform pages (Dashboard, My Learning, Calendar, Discussion, Services, Certificates, Edit profile, program page, course page) at 375 and 1280, light and dark: 0 violations, no horizontal scroll. The profile menu's accessibility settings (text size, colour-blind states, reduce motion, underline links, larger targets) apply on platform pages. In the prototype.

<a id="rules"></a>

## Platform rules we verified

What Open edX and our Studio actually do. Each one was checked in source code, in Studio, or with the content team, and says where it came from. Designs follow these; they do not override them.

### A topic's type is derived, never authored

Any problem in the unit (MCQ, checkboxes, dropdown, numerical, text input, ORA), graded or not → **problem**, even alongside a video. Otherwise a video → **video**. Everything else, Drag and Drop included → **other**. Grading is a subsection setting and never changes the type. Only these three exist; Reading / Video / Quiz are our names for them.

Our other types (Lab, Lesson Page, Podcast, Activity, Final Project, VILT) do not exist in the platform: Lab and Lesson Page come out as Reading, Podcast as Video, Final Project as Quiz, and so does a Video lesson with a knowledge check. How to tell them apart is open (Q10). Proposal sent to Navdeep and the dev team on 6 Nov 2026: extend the rule through the OVERRIDE\_GET\_UNIT\_ICON hook where the blocks differ (SCORM → Activity, ORA → Final Project, LTI → VILT Live, a Video with a knowledge check stays Video), a unit tag chosen by the content creator where they do not (Lab and Lesson Page vs Reading, Podcast vs Video), and never read the type from the title.

Dev answers, 9 Nov 2026 (Vikas): the hook changes only the LMS courseware icons; the MFE sidebar and outline need a separate update. Header, sidebar and outline read one API field, which the MFE turns into Video, Graded, Practice, Activity and Reading; Labs are detected separately. Studio unit tags exist, but the LMS and MFE cannot read them without a new API (custom work). Lighter options: block types, the unit format, a custom field. Our recommendation: the list of types in code, maintained by the developers.

edx-platform source, 23 Sep 2026 · BR-43 to BR-46 · [full rule and simulator](https://claude.ai/artifact/8TMV2dzzuRoFwCyRe19KyW) · Q10 proposal: [topic-types-inventory §6d](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/topic-types-inventory.md) (docs PRs [247](https://github.com/nvjeronimo/skillup-lms-prd/pull/247), [248](https://github.com/nvjeronimo/skillup-lms-prd/pull/248)) · [Figma panel](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8350-11581)

### There is no audio component

Podcasts are uploaded as video (usually YouTube) and play as a video with static cover art. Video size is fixed at full width. Transcripts are optional and can be multi-language.

Simran, 22 Sep 2026 · matrix §13

### Callouts are platform alerts, not content

Authors cannot create a callout block. Anything that looks like one in a Reading is written as text.

Simran, 22 Sep 2026 · matrix §13

### Images: alt text is required, captions are HTML

The image dialog asks for alt text or "decorative only". Images resize, align left / centre / right, and sit 2–4 per row. Captions are written as &lt;figure&gt;&lt;figcaption&gt; in the HTML source, or as a text box below.

Studio screenshots + a live course's HTML, 22 Sep 2026 · matrix §14

### The rich-text editor can do more than we render

Headings, bold, italic, underline, text colour, inline code, alignment incl. justify, lists, indent, blockquote, links, images and HTML source. Recommendation: ignore author colour and font, and render justify as left on mobile.

Studio toolbar screenshot · matrix §14 · decision pending (devs)

### Files are links; PDFs can also be embedded

A file link opens the PDF in a new tab. There is no download button today; one would be an add-on. An iframe can embed a PDF the learner pages through, or a Google Doc.

Simran, 22 Sep 2026

### Open Response has five flows

Peer only · Self only · Self → Peer · Self → Staff · Staff only. Upload can be switched off for a text-only answer, and an assignment can have several prompts. Staff grade with rubrics.

Studio menu + Simran, 22 Sep 2026 · matrix §13, §15

### Anchors own completion, one per unit

Problem sets, SCORM, ORA and LTI are anchors: at most one per unit, and they decide completion. Text, images, embeds and videos are stackable blocks.

studio-authoring-parity §5

### Completion depends on the type

Topics the platform cannot measure (Reading, Lesson Page, Lab, Activity): the learner completes them with Mark as Complete, at the end of the content, in the same row as the feedback, on the right (under the feedback on a phone), since 13 Oct, never in the header. The footer is Previous and Next; if the learner selects Next on a topic that is not completed, Next asks "Have you completed this?": Yes, completed completes the topic and moves on; Not yet moves on and leaves it open; Close stays on the topic (12 Oct 2026, after Navdeep's comments). Video and Podcast complete by themselves at ≥90% played; only when playback cannot be measured do they get the same button and question. Quiz, ORA and VILT have no manual completion.

29 Jul 2026 · reading-screen-matrix §4

### Partner lab sites cannot open inside our page

Microsoft Learn, Google Skills, the Google Cloud console and the IBM SkillsBuild sign-in pages refuse to be displayed inside another site. So they cannot sit in an iframe or in a modal in the ICP: they open in a new tab. The Google LTI launch address itself could not be tested. Open edX lets the LTI component open inline, in a modal or in a new window (a Studio setting). Two Microsoft courses use the inline setting today and the frame stays empty (12 Oct 2026); the screens keep the new tab as the default and draw the in-page case as an option.

Response headers of each site, 8 Oct 2026 · [lab-third-party-platforms §2](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md)

### Nothing comes back from a partner lab

Google labs are not graded or recorded anywhere and nothing is tracked after the launch (content team and engineering, 9 Oct 2026). Open edX can complete a graded LTI block when a score is published, but our lab components do not receive one. A Text component, such as a link to a lab, is completed by Open edX 5 seconds after it is viewed; the Lab screens do not rely on that.

Content team and engineering, 9 Oct 2026 · Open edX source (xblock-lti-consumer, completion), 8 Oct 2026 · [lab-third-party-platforms §2, §3](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md)

### An IBM course runs entirely on IBM

On *Start course* the learner is redirected to IBM's platform and the entire learning happens there. IBM does not normally share the learner's progress with our platform; a progress report can be fetched from IBM's dashboard. The certificate is generated on IBM's platform when the learner completes the course.

Content team (Kirti), 13 Oct 2026 · [lab-third-party-platforms §10](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md)

### Quiz attempts are per question

Attempts, reset and show-answer live on each problem, not the whole quiz. A single Submit for a whole quiz is an authoring pattern, not a setting. An unsubmitted answer is lost on navigation.

Studio demo + dev-environment tests, Jul–Aug 2026 · session-log

### A learner's home is one call, without a percentage

Learner Home returns every enrolment with its name, provider, dates, resume link, whether it has started, its certificate and its related programs. It does not return a completion percentage, the next unit's name, the level or the effort. A percentage takes one Progress call per course.

Dev environment and Open edX source (Sumac), 7 Oct 2026 · [metadata map §37](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/course-details-metadata-map.md)

### Due dates exist per course, not across courses

The Dates API lists one course's deadlines, peer-assessment steps included. No call returns the deadlines of all of a learner's courses, so a list like *Due this week* needs one call per enrolled course. No SkillUp content has due dates yet.

Dev environment and Open edX source (Sumac), 7 Oct 2026 · [metadata map §37](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/course-details-metadata-map.md)

### Program progress is counted in courses

The platform returns a program's courses as completed, in progress or not started. There is no percentage, week, lesson count or cohort. A program certificate needs the Credentials service, which is not configured on dev.

Dev environment, 1 and 7 Oct 2026 · [metadata map §35, §37](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/course-details-metadata-map.md)

### What Open edX does not keep

Minutes learned, XP, rankings, live-session attendance, a mentor's calendar and subscription tiers are not stored anywhere. The streak and the days a learner was active are stored, but no API returns them.

Dev environment and Open edX source (Sumac), 7 Oct 2026 · [metadata map §37](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/course-details-metadata-map.md)

### Delivery mode is pacing, and only pacing

A course is self-paced or instructor-paced. Self-paced reads *Flexible Learning*. Nothing marks a course as blended or live, so *Flexible + Live* and *Live Sessions* cannot be derived.

Open edX source · [metadata map §18, §37](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/course-details-metadata-map.md)

<a id="standards"></a>

## Design standards

Nelson's rules for every screen and component.

### Colour and state

* Progress fill is bg/info, never bg/primary; bars end straight. Green only when complete: any progress bar or ring at 100% is green (bar bg/success, ring icon/success-strong), not only finished courses and programs. Completed = Badge Soft sm Success, no icon, on modules and the course/program Progress card; My Learning course and program cards keep check + word; topics keep 'Marked as completed'. (13 Oct; amended 25 and 27 Oct)
* An alert on a grey surface uses Inline Alert Surface=Subtle (white background).
* Neutral hovers use bg/hover; progress and segmented tracks use bg/track — role tokens, both aliases of bg/muted (never bg/faint for a hover). (20 Oct)
* Link buttons: no fill on hover; text, line and icon darken. (23 Oct)
* When an element needs a purpose, give it a role token aliasing the neutral scale (faint · subtle · muted · strong); never borrow a step for something it is not. (20 Oct)
* Every value on a DS token; no new token without Nelson's approval (Material-style names).
* No gradient colours (two exceptions: the assistant ring, which survives only in the floating reference behind ?assistant=floating, retired 26 Oct 2026; and the standalone assistant button's rim glint (Nelson, 26 Oct; [prototype PR 383](https://github.com/nvjeronimo/skillup-lms-prototype/pull/383))). (21 Oct; amended 26 and 27 Oct)

### Shape and layout

* Radius by role, never by size; inner radius + padding = outer radius (never below 0). Roles: none, inner, control, card-inset, track, card, surface, pill ([decision 028](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/028-radius-roles.md)). (20 Oct)
* Learner avatars are rounded squares (radius 6, Radius/control), never circles. (20 Oct)
* A topic's content stops at Container/content-max-width (1200), as the platform pages (decision 031). (23 Oct)
* Running text stops at Container/text-max-width; for now 1200, the same as the content column (no 56ch cap; decision 033). The token is new in 2. Responsive 📐, an alias of Container/content-max-width in every mode (web var(--sk-container-text-max-width)), published 27 Oct; the ICP Reading text is not bound to it (Figma cannot bind max width on text layers). (27 Oct)
* The expanded Course Journey sidebar takes 3 of the 12 columns of the player body (like col-md-3, 24 px gutters), never under 280 nor over 400; the phone drawer (320) and the collapsed rail (72) do not change. The ICP follows it: 1440 → 334, tablet → 280 ([decision 037](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/037-course-journey-sidebar-width.md); prototype PRs 431 and 432). (30 Oct)
* In the Course Journey each module sits in its own box, in every skin: the list on bg/faint, 8 of padding, 12 between boxes; a box on bg/page with a 1px border/subtle and Radius/card-inset (8). No "Opens after …" note under a locked module: each locked row already names what it waits for (decision 037 amended; [prototype PR 434](https://github.com/nvjeronimo/skillup-lms-prototype/pull/434)). (30 Oct)
* Studio keeps the nesting rule around the pill: card radius = padding + 20 (card 36, surface 40, control 20, card-inset 32, track pill). (22 Oct)
* The menu sits on the left, before the logo, in every top bar (player and platform). (21 Oct)
* Desktop platform top bar: only the sections and the Search + Assistant pill sit in the 1200 content column (Container/content-max-width), starting where the page content starts; the logo and the actions (notifications, theme switch, learner with name) stay at the bar's edges (24). Both edges line up with the content from about 1900; on narrower screens the column gives way on the right. (27 Oct)
* Buttons hug or fill, never a fixed width; side by side they both fill, except on large screens or in lists.
* Cards in a row always share one height.
* Every component set has 16 px padding on Spacing/xl.
* Never hide content to make it fit: badges and labels show on every breakpoint.
* On a phone, a menu taller than the screen scrolls inside its card; nothing is cut. (21 Oct)
* Every target is at least 44 × 44 on a phone; a link inside a row makes the whole row its target. (21 Oct)
* Selects use the DS Select: no browser arrow. (21 Oct)
* Non-modal panels (such as the AI Assistant window) close on a press outside them; focus stays where the learner pressed, and the buttons that open them do not close them. A full-screen phone sheet is the exception. (27 Oct)

### Content and brand

* Learner is John Smith in every screen; no UI-kit placeholders (Olivia Rhye, Nelson Jeronimo).
* Partner logos come from the DS Provider-Partner-Badge; header chips on bg/page.
* Badges are in sentence case, never forced capitals; label-small eyebrows stay upper case. (27 Oct) One exception: the Course type label (COURSE / PROGRAM) is in capitals, by the label-small/Semibold style (decision 043, 24 Nov).
* The certificate sheet keeps its printed (light) colours in dark mode. (20 Oct)
* Five brand skins: SKO · Gold · Studio · Harbor · Fluent (Red removed 26 Oct 2026, [prototype PR 363](https://github.com/nvjeronimo/skillup-lms-prototype/pull/363)). Earlier: six, with Red. Harbor and Fluent (25 Oct, prototype PRs 347 and 352) are prototype-only, not in the DS or ICP; in the profile menu the Brand skin row scrolls sideways (prototype PR 351). Earlier: four brand skins, SKO, Gold, Red and Studio. Studio replaced Sea on 22 Oct and is prototype-only (no DS tokens yet); the Sea skin was removed (decision 027 was only a proposal). (22 Oct) Amended 23 Oct 2026: the DS has Studio Light / Studio Dark modes (decision 030), in Montserrat until Inter Tight is in Figma; Studio radius stays prototype-only.
* Studio: borderless cards on a soft shadow; buttons and fields are pills. (22 Oct)
* Motion is transversal: the same timing in every skin, theme and breakpoint; a skin never sets durations, curves or keyframes. (26 Oct)
* Durations: "8 min read approx." on readings, "N min approx." on untimed quizzes, activities and graded assignments; never "approx." on video or timed quizzes (decision 004, applied to every ICP sidebar 30 Oct).
* A video topic uses the same Topic Header as every other type: the type · duration row ("Video · 3m 20s"), "Marked as completed" on the right of that row once complete, then the title, on every breakpoint. The header and the sidebar always agree: same duration, and a completed topic is ticked in the sidebar ([decision 038](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/038-video-topic-header-meta-row.md); prototype PR 430). (30 Oct)
* Phone type minimums (Responsive Mobile mode): body 16 / 24 at least (text-sm), 13 / 18 the smallest (text-xs), 12 / 18 for 2xs; body-large and title-medium read 18 / 26 (text-md). Responsive 📐 Desktop and Tablet: text-2xs 12 / 18, text-xs 13 / 18, text-sm stays 14 / 20 (published 29 Oct; [prototype PR 419](https://github.com/nvjeronimo/skillup-lms-prototype/pull/419)). (27 Oct; amended 29 Oct)
* Platform-page tabs: the course and program details use title-medium / Semibold, text-lg 18 (18 / 24 on desktop and tablet, 18 / 26 on a phone; 2 Nov, [prototype PR 452](https://github.com/nvjeronimo/skillup-lms-prototype/pull/452), [453](https://github.com/nvjeronimo/skillup-lms-prototype/pull/453)); My Learning and Certificates stay on title-large / Semibold, 20 / 30 on desktop and tablet, 18 / 28 on a phone (27 Oct; Nelson, 2 Nov: My Learning stays as it is). The DS Horizontal tabs stay on title-large; the ICP course and program screens carry a text-style override.
* Everything is Open edX-based: no extra development. A feature the platform does not provide is drawn only if it is truly important, after research and the stakeholders' approval (decision 035, 28 Oct 2026).
* Open edX only in Figma. The DS collection 5. Scope has two modes, Open edX only (the default) and Beyond Open edX, and two boolean variables: scope/beyond-edx and its inverse scope/open-edx-only. Anything we add beyond Open edX has its visibility (or its boolean component property) bound to scope/beyond-edx, the Figma twin of data-invented in the prototype. To see the full version, set the Beyond Open edX mode on a page, section or frame. (5 Nov 2026)
* Certificates download from their page only: every card and row that lists certificates offers View and Share, never Download; *Download certificate* sits on the certificate page, where the document is open, and prints the sheet alone, Save as PDF making the file ([decision 039](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/039-certificate-download-on-page-only.md), 3 Nov 2026).

### Documentation and files

* Versions are 1.x; no version in component names, only in the Figma description ("Version vX.Y · since …").
* Dev notes say "Dev Notes:" and "Purpose:"; a component note goes on the main component and one screen, not every instance.
* DS doc anatomy shows only the component's own parts; every layer named by its role (no Frame/Group N).
* Platform pages live on one ICP page in flow order, one frame per page (01 Dashboard … 11 Edit profile); history goes in a band below. (20 Oct)
* Only Nelson marks a handoff Ready for Dev; new work is "In review".
* Every frame on a Ready for Dev page has a status banner above it: LMS / Inline Alert (Surface Page), Success *Ready for dev - Approved* or Warning *Pending* / *Ready for review*, as wide as the frame, 227 px above it. (17 Nov)
* Prototype icons are the DS (Untitled UI) icons: use the lucide twin only when it is the same glyph; otherwise draw the DS vector in lib/icons.tsx (e.g. menu-02). (21 Oct)
* Annotations: no *Touch target ≥44×44* note on screens (the 44 px rule lives in the standards, not on each frame). A note that applies to a whole page goes once on that page, never repeated on every screen. Applied on 4 Nov 2026: the touch-target notes left the ICP (SCORM 16, Video 3, Lab 3, Reading 2, Quizzes 1) and two duplicated Video accessibility notes were merged. (4 Nov)

<a id="motion"></a>

## Motion: how the product moves

Motion is a state change made legible. It has four jobs: confirmation (the system registered me), orientation (where this came from and went), progress (where I am in the path) and prevention (why that did not work). It never animates the learning content, only the chrome around it. Names follow Material 3; the values are ours. Proposed 14 Oct 2026, until the team approves the new tokens.

### The 13 tokens

| Token | Value | Use |
| --- | --- | --- |
| duration/short2 | 150ms | Press, toggle flip. |
| duration/short3 | 200ms | Hover, focus ring, colour-only change, exits of surfaces. |
| duration/short4 | 300ms | The default. Small surfaces enter; chevrons, messages, toasts. |
| duration/medium2 | 400ms | Panels, drawer, sheet, accordion, scroll-into-view. |
| duration/long2 | 600ms | Progress bars, rings, count-up. Passive only. |
| easing/standard | cubic-bezier(0.4, 0, 0.2, 1) | Anything that changes in place: colour, rotate, ring. |
| easing/standard-decelerate | cubic-bezier(0.2, 0.7, 0.2, 1) | Entrances and progress; a gentler ease-out (since 25 Oct; 22 to 25 Oct it was 0.23, 1, 0.32, 1). |
| easing/standard-accelerate | cubic-bezier(0.55, 0, 1, 0.45) | Marked unused since 22 Oct: exits use the strong ease-out too. |
| easing/emphasized | cubic-bezier(0.34, 1.3, 0.64, 1) | The certificate reveal only. The one overshoot. |
| easing/linear | linear | Looping indicators only: spinner, typing dots. |
| distance/nudge | 4px | Micro-settle, staggered action buttons. |
| distance/enter | 8px | Message, card and toast entrance. |
| distance/surface | 16px | The assistant window and dialogs. |

### The ten rules

* **R1**No raw durations or curves in components. A lint rule enforces it.
* **R2**Never transition: all. Name the properties.
* **R3**Animate transform and opacity. Disclosure uses grid rows, not height.
* **R4**Nothing over 300 ms (short4) on a repeated critical path. 600 ms (long2) is for passive progress only.
* **R5**Motion never carries state alone. Every moving state also has an icon and text.
* **R6**Reduced motion removes travel and keeps feedback.
* **R7**One mode only. Motion does not change by skin, theme or breakpoint.
* **R8**Exits are faster than entrances and use the accelerate curve.
* **R9**One overshoot in the product: the certificate reveal. Nothing else bounces.
* **R10**A surface leaves toward where it came from.

Every surface a trigger opens grows out of it and leaves back into it (since 21 Oct; the popup-motion lint rule flags one that does not). Spec §7.7 popovers and disclosures: [docs PR 144](https://github.com/nvjeronimo/skillup-lms-prd/pull/144) (merged 21 Oct).

Content that replaces other content in place fades in; content added or removed in the flow slides open; nothing animates on first paint (since 21 Oct, after the final motion audit). Spec §7.8 in-page swaps: [docs PR 145](https://github.com/nvjeronimo/skillup-lms-prd/pull/145) (merged 21 Oct).

The first visit of a page in a session arrives in order: skeleton, sections, then numbers counting; later visits show the page at once (since 21 Oct).

Video and podcast auto-complete at ≥90% played and the assistant sparkles are in the motion spec since [docs PR 147](https://github.com/nvjeronimo/skillup-lms-prd/pull/147) (merged 21 Oct; prototype PRs 232 and 234).

**Reduced motion.** Under the OS setting or the Accessibility panel switch, travel is removed and the surface appears in place. Fades and colour changes stay, progress jumps to its value, and the screen reader announces it. BR-39 says "instant transitions"; we propose the refinement to the BA instead of editing it.

### Prototype pull requests

| PR | Scope | What it does | Status |
| --- | --- | --- | --- |
| [#153](https://github.com/nvjeronimo/skillup-lms-prototype/pull/153) | **Tokens** | The token file, Tailwind theme, lint rule and the exit hook. | Merged 14 Oct |
| [#154](https://github.com/nvjeronimo/skillup-lms-prototype/pull/154) | **Surfaces** | Panels, drawer, modals and toasts leave the way they came. | Merged 14 Oct |
| [#155](https://github.com/nvjeronimo/skillup-lms-prototype/pull/155) | **Completion chain** | A completion shows in three places, in order. | Merged 14 Oct |
| [#157](https://github.com/nvjeronimo/skillup-lms-prototype/pull/157) | **Quiz** | Every quiz state has an onset. No shake. | Merged 14 Oct |
| [#158](https://github.com/nvjeronimo/skillup-lms-prototype/pull/158) | **Assistant** | The window grows from and returns to its launcher. | Merged 14 Oct |
| [#160](https://github.com/nvjeronimo/skillup-lms-prototype/pull/160) | **Smoothness** | Pages, scroll, filters and hover colours. | Merged 14 Oct |
| [#195](https://github.com/nvjeronimo/skillup-lms-prototype/pull/195) | **Details** | Buttons press, bookmarks fill, tabs slide, locked topics explain themselves, footer number fades, live dot, certificate reveal. | Merged 19 Oct |
| [#223](https://github.com/nvjeronimo/skillup-lms-prototype/pull/223) | **Popovers and disclosures** | Menus, shares, flyout, search sheet and FAQs open from their trigger and leave back into it. | Merged 21 Oct |
| [#227](https://github.com/nvjeronimo/skillup-lms-prototype/pull/227) | **In-page swaps** | Tabs, hints, filters, alerts, captions and inputs ease instead of changing in one frame. | Merged 21 Oct |
| [#232](https://github.com/nvjeronimo/skillup-lms-prototype/pull/232) | **Assistant sparkles** | Assistant sparkles turn now and then. | Merged 21 Oct |
| [#235](https://github.com/nvjeronimo/skillup-lms-prototype/pull/235) | **Assistant sparkles** | Assistant sparkles spin faster: 2 / 3 / 2 full turns in half a second. | Merged 21 Oct |
| [#234](https://github.com/nvjeronimo/skillup-lms-prototype/pull/234) | **Auto-complete** | Videos and podcasts complete themselves at 90% played (the completion chain plays). | Merged 21 Oct |
| [#236](https://github.com/nvjeronimo/skillup-lms-prototype/pull/236) | **Arrival foundation** | Skeleton, first-visit load, cascade, counters (Dashboard first). | Merged 21 Oct |
| [#237](https://github.com/nvjeronimo/skillup-lms-prototype/pull/237) | **Covers and links** | Covers fade in; Copy link turns into a check. | Merged 21 Oct |
| [#238](https://github.com/nvjeronimo/skillup-lms-prototype/pull/238) | **Every page arrives** | Skeletons and cascade on all platform pages and the player; rings sweep once. | Merged 21 Oct |
| [#252](https://github.com/nvjeronimo/skillup-lms-prototype/pull/252) | **Motion pass (Emil Kowalski review)** | Hover only where hover exists, strong ease-out in and out, interruptible menus, the quiz mark grows from half size. | Merged 22 Oct |
| [#253](https://github.com/nvjeronimo/skillup-lms-prototype/pull/253) | **Apple-design pass** | Press feedback on link cards, drag-to-dismiss sheets, rem type ramp, theme cross-fade, prefers-contrast and reduced-transparency rules. | Merged 22 Oct |
| [#324](https://github.com/nvjeronimo/skillup-lms-prototype/pull/324) | **Sticky-Toolbar** | The ground follows the scroll, the search steps out in two beats. | Merged 25 Oct |

[**Motion · v1.5 (Figma)** · Doc · Foundations · Motion, titled Motion · v1.5 in Figma (25 Oct: the slower scale, 150–600 ms; 26 Oct: section 12, How to build it (developers)). The scale, the rules, the storyboards, the details (section 9), popovers and disclosures (section 10) and in-page swaps (section 11), on the design system's Foundations page "Motion". The Motion collection is published in the design-system library (14 Oct 2026); the tokens still await the team's approval. · Ready](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22639-583252)
[**Motion matrix** · Every microinteraction, its token and the build order](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/motion-matrix.md)
[**ADR 024 · Motion scale** · The decision and what it rejected](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/024-motion-scale.md)

The spec and ADR 024 point to the Foundations page since [docs PR 129](https://github.com/nvjeronimo/skillup-lms-prd/pull/129) (merged 19 Oct 2026).

<a id="how-developers-build-it"></a>

### How developers build it

Motion is part of the component, not a polish pass: the same 13 variables, in the SkillUp theme, read by every MFE. A condensed version of the developer guide. [Full guide](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/motion-dev-guide.md)

### In one minute

* Motion is a token foundation, like colour: 5 durations, 5 curves, 3 distances. Use the CSS variables, never a raw ms, cubic-bezier or ease-\* keyword.
* It is the same in every skin, theme and breakpoint (SKO, Gold, Studio, Harbor, Fluent; light and dark; phone to desktop). A skin changes colours, type and shapes, never timing.
* Build it with the component, not afterwards. A component is not done until it enters, leaves and changes state as below, and does so under reduced motion.
* Animate transform and opacity. Name the properties. Never transition: all.
* Exits are faster than entrances, and a surface leaves toward where it came from.
* Reduced motion removes travel and keeps feedback (fades and colour), on both paths: the OS setting and the in-app Accessibility switch.

### When

* In the same ticket as the component: motion is part of the Definition of Done.
* Order of work: tokens in the theme, then the component's states (hover, focus, press, disabled), enter and leave, changes in place, reduced motion, QA.
* Tokens first, once: the theme package carries the 13 variables and the reduced-motion block before any MFE work.
* Paragon components (Modal, Dropdown, Collapsible…) ship their own transitions: map their durations and curves to our variables in the theme, and check them against the rules.

### Skins

* One mode only. A skin stylesheet may change colour, radius, type and elevation; it must not set a duration, a curve, a keyframe or a transition.
* When a skin adds its own markup (Harbor and Fluent's left rail, Fluent's selection indicators), that markup follows the same recipes as the shared components: the rail eases its width, indicators grow in, sections join the arrival cascade.

What moves, when and how 16 rows

| UI | When | Recipe |
| --- | --- | --- |
| **Buttons, links, rows** | Hover, focus, press | Colour eases, short3 standard; press scale(.98), short2; hover styles only under (hover: hover). |
| **Menus, popovers** | Open, close | Scale .96 + nudge, short3 in / short2 out, decelerate; origin = trigger; inert while leaving; reopening reopens at once. |
| **Dialogs** | Open, close | Fade + scale from .96 + surface rise, short4 in / short3 out; backdrop fades; focus in on open, back to the opener as the exit starts. |
| **Side panels, drawer** | Open, close | translateX(100% → 0), medium2 decelerate; backdrop fades; exit back to the edge, faster. |
| **Phone sheets** | Open, close, drag | translateY(100% → 0), medium2; rubber-band past the top, release velocity settles or closes; touch and pen only. |
| **Accordions (incl. two-beat fold)** | Expand, collapse | grid-template-rows: 0fr ↔ 1fr, medium2; closed content inert. Two-beat fold: text fades (short3), then the row closes (medium2, after short2); back: row opens, then text fades in. |
| **Tabs** | Change tab | Underline slides (transform, short4 decelerate); panel fades in (short4), never on first paint. |
| **Filters, search results** | Filter changes | List cross-fades (short4); rows rise with delay calc(short2 / 2 × index), capped at 8; not on first paint or re-render. |
| **Page navigation** | Link to another page | View Transitions: old page out short3, new in medium2 + nudge rise; bars keep their own view-transition-name; fallback is a short fade; query-only links skip it. |
| **First visit (arrival)** | Page loads | Skeleton only while the request is pending; sections rise (enter, short4) in a stagger; counters, bars, rings long2 decelerate; once per page per session. |
| **Completing a topic** | Manual or 90% auto-complete | Badge pops, then sidebar check draws (+short2), then the ring advances (+short4); keyed on the change; the toast is the one announcement. |
| **Sticky toolbars** | Scroll past | Ground goes clear to solid over 24 px of scroll; the search fades first, then its row closes (and the reverse). |
| **Images, covers** | Load, hover | Fade in short4; hover scale(1.02) long2 in / medium2 out, hover devices only, none under reduced motion. |
| **AI assistant** | Idle, open, close | The window grows from the control that opens it (the top bar's Search + Assistant since 26 Oct; the floating launcher, kept behind ?assistant=floating, keeps its ring glint and sparkles on independent cycles); spins stay well under half the shape's symmetry angle per frame. |
| **Loops** | Waiting | linear, infinite; stopped or replaced by text under reduced motion. |
| **Learning content** | Never | Never animated: motion belongs to the chrome, not the matter. |

QA checklist, per component 9 checks

* Only --motion-\* variables; properties named, no all; no layout property animated (except grid rows and the rail width).
* Enters and leaves (nothing disappears in one frame); exit faster; leaves toward its origin.
* Interruptible: reopen while closing reopens at once; a leaving surface catches no clicks (inert, pointer-events: none).
* Focus moves in on open and returns to the trigger on close; no focus steal on arrival.
* Screen readers get the final value or one announcement, never the animation steps.
* Reduced motion, both paths (OS setting and data-reduce-motion): no travel, fades kept, loops stopped.
* Does not replay on re-render, filter, tab switch or revisit when it should not.
* Same in every skin and theme; checked at 375 and 1280.
* Tested in a visible browser tab (background tabs freeze animations and observers).

### Where

[**Figma · Doc · Foundations · Motion** · Motion · v1.5, section 12 "How to build it".](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22639-583252)
[**Prototype** · The reference build; ?demo=1 adds the Loading switch and "Mark 85% watched".](https://lms-prototype-mu.vercel.app)
[**Motion matrix** · Behaviour per component, the full matrix.](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/motion-matrix.md)

<a id="decisions"></a>

## Decisions, newest first

What was decided, when, and by whom. The linked document holds the reasoning. Reopen one only with new evidence.

1. <a id="decision-2026-11-17-youtube-screens-in-a-frame-of-their-own-row-9-tablet-fixes-carri"></a>17 Nov 2026 · Nelson

   ### YouTube screens in a frame of their own; row 9 tablet fixes carried across

   As with SCORM, and for the same Zeplin export limit, the YouTube rows (row 9, and row 10 hidden as SUPERSEDED) moved out of the approved Video frame into *ICP Phase 1 - Video Lesson · YouTube - Light - Ready ✅* ([8549-22740](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8549-22740)); the approved frame keeps rows 1–8. Nelson corrected the first 9.2 tablet screen (the progress note in a padded *Progress note row*, the transcript fitting its content, Previous / Next under it) and asked for the same on the other screens, the same screen size per breakpoint (1440 × 1024, 960 × 1056, 375 × 917) and 16 px between stacked screens; all applied. Ready for development on the new frame and a new Zeplin export are still to do.
2. <a id="decision-2026-11-17-scorm-ready-frame-split-in-four-for-zeplin-e2-and-e3-on-ds-compon"></a>17 Nov 2026 · Nelson

   ### SCORM Ready frame split in four for Zeplin; E2 and E3 on DS components

   Zeplin could not export the 11 128 × 22 582 px *Activity · SCORM* Ready frame. It is now four frames, one per flow (01 A [7428-1070](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7428-1070), 02 B [8515-17228](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8515-17228), 03 C [8515-17234](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8515-17234), 04 E [8515-17240](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8515-17240)), rows moved rather than copied, the original archived ([8514-21571](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8514-21571)). On the E2 and E3 screens the audit found 47 loose elements; counted node by node, 165 nodes, 74 of them replaced by instances through 21 swaps to SKO DS V3. Frames 02 to 04 still need Ready for Dev, and earlier Zeplin exports must be redone. The YouTube frames follow the same split. Four component questions are open (Open questions).
3. <a id="decision-2026-11-17-scorm-and-youtube-row-9-ready-for-dev-a-banner-on-every-ready-for"></a>17 Nov 2026 · Nelson

   ### SCORM and YouTube row 9 Ready for Dev; a status banner over every Ready for Dev frame

   Nelson approved the SCORM screens and the YouTube embed. The ICP page *Activity · SCORM* moved under Ready for Dev as *Phase 1 · Activity · SCORM - Ready for Dev* ([7428-1069](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7428-1069)): its 50 cards in groups A, B, C and E (16 desktop, 16 tablet, 18 mobile) went from In review to Ready for DEV; group D is SUPERSEDED and Nelson moved it into its own section, *Archived · SUPERSEDED*, outside the Ready frame. Video Lessons row 9 (cards 9, 9.2, 9.3) went to Ready for DEV; the page header counts 20 screens. Every frame on a Ready for Dev page now has a status banner above it, as on Platform Pages: Video Lessons (Light Ready for dev, Dark Ready for review), Reading and Activity · SCORM join Quizzes and Platform Pages. Reading's 21 cards were already Ready for DEV, so the Hub row now says Ready for dev too. The same day, after a UI/UX handoff check: Video Lessons 9.2 and 9.3 gained the three other states (back from YouTube, Next asks, completed) on tablet and mobile; SCORM E1 to E4 (eight screens) were rebuilt in layers from DS components instead of prototype screenshots, so Dev Mode and Zeplin give specs; the SCORM header lists the stories (SK-12250, SK-12252). Later that day a DS audit of the four SCORM Ready frames fixed 146 properties in E2/E3 and the phone Topbars and listed 13 points for a decision ([audit](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/scorm-ds-audit-2026-11-17.md)). Docs PR [261](https://github.com/nvjeronimo/skillup-lms-prd/pull/261).
4. <a id="decision-042"></a>16 Nov 2026 · Nelson

   ### Decision 042: a course of one module and one topic opens without our sidebar

   Any course with one module and one topic, whatever its type, opens in the ICP without our sidebar. On a course that is not SCORM only the sidebar goes: the progress ring and the footer stay. For SCORM it confirms the canonical course-package flow, decided on 15 Nov 2026 from points 1–3 of the 11 Nov proposal and drawn as section E, which replaces D1: (1) a single-package course shows a status, *Not started*, *Started* or *Completed*, never a percentage, on the card, the program row and the course page; (2) nothing of ours around a single package: no sidebar, Course Journey button, progress ring or footer; (3) a course of several packages keeps our sidebar and footer, and Next asks before leaving a package that has not reported completion (*Stay on the activity* / *Continue anyway*). The score shows in the topic's alert and the Progress tab; the pass mark only when the learner has not passed; Dark is out of this cycle. Still open: *Skip for now* on a package that fails to load. Point 4, the content team's export checklist, is a dependency on Simran, not a decision. It changes Jira SK-10957 (sidebar visible by default on desktop), in UAT. This settles Navdeep's ask to hide our navigation on a packaged course and the proposal of 11 Nov. [Decision 042](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/042-single-topic-course-no-sidebar.md) (docs PR [260](https://github.com/nvjeronimo/skillup-lms-prd/pull/260)).
5. <a id="decision-2026-11-12-code-tokens-the-to-decide-rows-settled-and-one-plugin-keeps"></a>12 Nov 2026 · Nelson

   ### Code tokens: the To-decide rows settled, and one plugin keeps prototype and dev package in step

   Nelson agreed the proposals for the 29 *To decide* rows of the token mapping, no new DS token anywhere: the video letterbox black stays a value of the video player (no bg/media); an off-scale spacing (10, 14, 18, 28) takes the Figma component's value, or else the smaller step; the code uses the SKO radii only until another skin goes to production; the rest map to existing tokens ([the decisions](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/code-token-decisions.md)). The generated CSS now switches on the agreed edges, Tablet under 1023, Mobile under 767, in the prototype and in the dev token package, and the package carries the radius of each skin. The prototype's tokens were republished from the DS (Red out, Harbor, Fluent, Skin shape and Scope in; nothing visible changes). The *Publish tokens* plugin in the DS file now also opens a pull request for the dev token package (a check regenerates its CSS, a person merges) and downloads the export: variables.json, or a zip that adds the W3C DTCG files for Style Dictionary or Tokens Studio ([how it works](https://github.com/nvjeronimo/skillup-lms-prototype/blob/main/figma-plugin/README.md)). Since prototype PR [490](https://github.com/nvjeronimo/skillup-lms-prototype/pull/490) the package pull request can go to any GitHub repository, so the dev team can use it on their own: repository, base branch, folder and format (our JSON or W3C DTCG) are set in the plugin, kept on each computer; one commit creates the files that do not exist yet and deletes the DTCG mode files Figma no longer has; it never merges, and in their repository their own build turns the files into code. The defaults keep our docs repository as it was. The plugin is offered to Komal and the team (zip of the plugin folder; a GitHub token with write access to the target repository for the pull requests). Prototype PRs [485](https://github.com/nvjeronimo/skillup-lms-prototype/pull/485), [486](https://github.com/nvjeronimo/skillup-lms-prototype/pull/486), [487](https://github.com/nvjeronimo/skillup-lms-prototype/pull/487), [488](https://github.com/nvjeronimo/skillup-lms-prototype/pull/488), [489](https://github.com/nvjeronimo/skillup-lms-prototype/pull/489), [490](https://github.com/nvjeronimo/skillup-lms-prototype/pull/490); docs PRs [255](https://github.com/nvjeronimo/skillup-lms-prd/pull/255), [256](https://github.com/nvjeronimo/skillup-lms-prd/pull/256) (all merged).
6. <a id="decision-041"></a>12 Nov 2026 · Kirti (tech team), Nelson

   ### Decision 041: YouTube plays in the official embed only

   The tech team's discovery, shared by Kirti: learners cannot be stopped from opening a YouTube video on youtube.com, and YouTube's policies require its logo and link to stay visible and clickable. No player setting removes them, and covering the logo or sandboxing the iframe is not allowed. Nelson withdrew row 10 (YouTube in our player, which covered the logo) and added a *back from YouTube* notice to row 9: when the learner returns to the tab before completing, the alert asks *Welcome back. Did you finish the video?* and points to Mark as Complete. The embed fills the content width at 16:9 through the ICP CSS; nothing is set in Studio. A video that must not open on YouTube goes to Azure. Prototype PR [484](https://github.com/nvjeronimo/skillup-lms-prototype/pull/484), docs PRs [253](https://github.com/nvjeronimo/skillup-lms-prd/pull/253), [254](https://github.com/nvjeronimo/skillup-lms-prd/pull/254) (all merged); ICP Video Lessons row 10 SUPERSEDED, row 9 with the new screen. [Decision 041](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/041-youtube-official-embed-only.md).
7. <a id="decision-2026-11-12-mentor-card-on-the-dev-build-reviewed-sk-11861"></a>12 Nov 2026 · Nelson

   ### Mentor card on the dev build reviewed (SK-11861)

   Kirti asked for a design check of the Mentor card on the Course Detail page. Copy, colours, spacing, position and the link to the course's Mentorship Q&A match DS Sidebar-Card Kind=Mentor Q&A on desktop, tablet and mobile. To fix: the radius (10 → 12) and the label size (12 → 13); on mobile the phone type scale is not used, a token issue the mapping below fixes. Approved once the first two are fixed. Not checked: the card hidden when Discussion is off. Where the card leads may change while Mentorship Q&A is on hold.
8. <a id="decision-2026-11-12-code-figma-token-mapping-for-the-dev-storybook"></a>12 Nov 2026 · Nelson, for Komal

   ### Code → Figma token mapping for the dev Storybook

   After the SK-12002 review, every --sko-\* colour token in the dev Storybook is mapped to the Figma token that replaces it: 90 in all, 22 the same, 44 close, 12 that clash (same name, different role) and 12 to decide, plus typography, spacing, radius, layout and breakpoints. A token package exported from Figma (JSON + CSS) sits beside it. The media queries were on 1024 / 768; fixed the same day to the agreed 1023 / 767 (see the entry above). [The mapping](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/code-token-mapping.md) (docs PR [252](https://github.com/nvjeronimo/skillup-lms-prd/pull/252), merged).
9. <a id="decision-2026-11-11-a-scorm-package-reports-a-status-not-a-percentage"></a>11 Nov 2026 · Jaspinder, Nelson

   ### A SCORM package reports a status, not a percentage

   Jaspinder questioned the 0% → 100% rule: packages have settings that return progress. Checked in the package and the code the same day. All our test packages, POSH included, are SCORM 1.2, which has no progress percentage: a package sends its status (incomplete, completed, passed or failed), a score if its export has one, and where the learner stopped. The setting she remembered is real: Rise exports POSH as completed / incomplete, completed when the Storyline interaction inside the course is finished. It decides *when* the package reports completed, not a share. The SCORM XBlock reads partial progress (`cmi.progress_measure`) only from SCORM 2004, and the Progress tab counts a unit as complete or not. So the rule stands: a package topic is complete or not, and a course that is only one package goes 0% → 100%. POSH is also the only package with video: 22 MP4s inside the Rise course, played by Rise's own player; Kirti can test it there. Not verified: that SkillUp runs this XBlock, and the code of the installed release. ICP Activity · SCORM D3 and D4 notes updated. [Meeting notes](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/meeting-2026-11-04-scorm-youtube.md#scorm-progress-checked-11-nov-2026) (docs PR [250](https://github.com/nvjeronimo/skillup-lms-prd/pull/250)).
10. <a id="decision-2026-11-11-youtube-can-play-in-our-player-a-course-package-fills-the-co"></a>11 Nov 2026 · Vikas, Nelson

    ### YouTube can play in our player; a course package fills the content area

    Vikas confirmed that YouTube videos can play inside our ICP video player, the same one as Azure, so learners can always see one player (the prototype's row 10 does it with the YouTube IFrame API; the autoplay on opening is fixed, prototype PR [477](https://github.com/nvjeronimo/skillup-lms-prototype/pull/477), merged). In a SCORM course package the package fills the whole content area: no header, introduction, alert, Fullscreen button, border or margin of ours; its own menu and title are the page, beside our collapsed sidebar and above our footer (Nelson; prototype PR [478](https://github.com/nvjeronimo/skillup-lms-prototype/pull/478), merged; ICP Activity · SCORM cards D1 to D5 redrawn, In review). Still open: Navdeep's sign-off on the YouTube rows, and a SCORM package that holds only a video, which Kirti asked for (11 Nov). [Meeting notes](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/meeting-2026-11-04-scorm-youtube.md).
11. <a id="decision-2026-11-10-a-scorm-course-takes-one-topic-per-package-in-either-of-two"></a>10 Nov 2026 · Simran, Kirti, Jaspinder, Nelson

    ### A SCORM course takes one topic per package, in either of two shapes

    A SCORM package cannot be split: the content team uploads each zip as it arrives, one zip per topic, so our sidebar cannot be built from a package's own modules (Simran). Both course shapes are real, and the files received decide which: several packages, each a topic inside our modules with our normal sidebar; or one package for the whole course, with its own menu and our sidebar collapsed (group D). A course can mix SCORM activities, Azure videos and readings. The content team's real POSH course arrived as two packages (the Rise course and its Storyline final quiz) and plays as courses 8–9 of the test program; course 7 is a public sample with its own menu (prototype PRs [472](https://github.com/nvjeronimo/skillup-lms-prototype/pull/472), [475](https://github.com/nvjeronimo/skillup-lms-prototype/pull/475), [476](https://github.com/nvjeronimo/skillup-lms-prototype/pull/476), merged; ICP Activity · SCORM cards D4/D5, In review). Rise draws its own exit and progress beside ours and Storyline its own Next: we do not change packages. Kirti, Simran and Jaspinder review the prototype before the ticket closes. [Meeting notes](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/meeting-2026-11-04-scorm-youtube.md) (docs PR [249](https://github.com/nvjeronimo/skillup-lms-prd/pull/249)).
12. <a id="decision-2026-11-05-figma-screens-show-open-edx-only-by-default"></a>5 Nov 2026 · Nelson

    ### Figma screens show Open edX only by default

    Like the prototype since 29 Oct (?scope=full opts in), the ICP platform pages (Platform Pages WIP and Ready for Dev) and the player pages (Video, Quizzes, Reading, Lab, SCORM, Topic Content Types, Overlay Panels, Completion) now hide what Open edX does not have, through the DS collection 5. Scope. Hidden in Open edX only: Services and the My Learning count in the bars, the search assistant (a plain search icon instead), the plan line, the greeting tip, glance trends, the Support tab, View calendar, course-header partners and level, the weekly-goal day strip, program About sections except Overview and What's included, live sessions in the Calendar, readable certificate IDs, Notifications View all, calendar-sync choices, video skip buttons, Report an issue, topic descriptions and bylines, lab provider and duration, quiz Retake, the per-quiz pass mark and verdict, file type and size, the VILT countdown and Add to calendar, certificate Download PDF, and the Program-Card last studied and hours left. 08 · Services is fixed to Beyond Open edX (the page itself is ours). Superseded rows are left as history. Two prototype inconsistencies to settle: the course header hides partners and level but the program header shows them; Lab's Download all is tagged but the video Downloads tab's Download all resources is not.
13. <a id="decision-2026-11-04-youtube-and-scorm-must-be-covered-before-icp-phase-1-goes-li"></a>4 Nov 2026 · Kirti, Navdeep, Vikas, Jaspinder, Nelson

    ### YouTube and SCORM must be covered before ICP Phase 1 goes live

    Azure video alone is not enough: many programs mix Azure, YouTube and SCORM. Course progress is per topic and binary; watching a video on youtube.com is not recorded. The learner may select Mark as Complete on a YouTube video without watching it, and that is accepted (Vikas). Video sources are only Azure and YouTube. We do not redesign or test SCORM packages: the content team checks them. A packaged course is one topic named after the course, 0% until the package reports completion, then 100% (Navdeep, Vikas). Drawn the same day, In review: Video Lessons [row 9](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8265-20321) (YouTube embed, not tracked) and [row 10](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=8265-22232) (Video component with a YouTube ID, tracked), and Activity · SCORM group D. Nelson keeps our sidebar collapsed on a packaged course for now; groups A–C stay WIP. The four SCORM 1.2 packages Kirti shared play in the prototype's SCORM Test Course (prototype PR [468](https://github.com/nvjeronimo/skillup-lms-prototype/pull/468), merged): two rewrite *incomplete* on every launch, and M12 makes no SCORM calls, so it never reports and falls back to Mark as Complete with Next asking. The same day all of it went into one program on My Learning, the [SCORM and YouTube Test Program](https://lms-prototype-mu.vercel.app/platform/program/scorm-and-youtube-tests) (prototype PR [469](https://github.com/nvjeronimo/skillup-lms-prototype/pull/469), merged): a YouTube Video Test course (row 9 as a real YouTube embed with the Info alert and Next asking; row 10 in our player; the *video not available* state), the SCORM Test Course, and the four packages as course packages of one topic each. Then the course packages took the 3-level sidebar shape: no Module, no Lesson, the one topic under the Course Header, so the collapsed rail shows no M1 / L1, and a hydration error on SCORM topics was fixed (prototype PR [470](https://github.com/nvjeronimo/skillup-lms-prototype/pull/470), merged); in the ICP group D the four collapsed rails (D1, D3, D1.2, D3.2) hide M1 and say so in Recent changes. Row 10 now plays the real YouTube video in our player through the YouTube IFrame Player API, counting only time really played towards the 90% (a seek does not count), and every other Video topic plays a real SkillUp lesson (Introduction to Digital Marketing, SUIPSKO-600102), looping; that lesson's signed address comes from the Vercel variable NEXT\_PUBLIC\_SAMPLE\_VIDEO\_SRC, still to be set by Nelson, and until then those topics show the poster (prototype PR [471](https://github.com/nvjeronimo/skillup-lms-prototype/pull/471), merged). Designs due Mon 9 or Tue 10 Nov after a sync on Fri 6 Nov. [Meeting notes](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/meeting-2026-11-04-scorm-youtube.md) (docs PR [246](https://github.com/nvjeronimo/skillup-lms-prd/pull/246), merged).
14. <a id="decision-2026-11-04-view-certificate-in-sentence-case-everywhere"></a>4 Nov 2026 · Nelson

    ### View certificate in sentence case everywhere

    The last five places in the prototype that still said *View Certificate* now say *View certificate*, like the rest of the platform: the completed My Learning course card, the program card, the program Quick view, the Harbor course table and the My Learning data (prototype PR [467](https://github.com/nvjeronimo/skillup-lms-prototype/pull/467), merged). Same in the DS since 5 Nov 2026: Program-Card 1.19 and Course-Card 1.23 read *View certificate* in State=Completed (to publish). In the ICP, 29 button labels were changed: 8 on Platform Pages – Ready for Dev (My Learning and the Program page) and 21 on Platform Pages – WIP (02 · My Learning, 04 · Program Detail, 10 · Profile menu). The SUPERSEDED sections proposal was left as it was.
15. <a id="decision-2026-11-03-tablet-the-phone-tab-bar-stays-on-phones-my-learning-s-toolb"></a>3 Nov 2026 · Nelson

    ### Tablet: the phone tab bar stays on phones; My Learning's toolbar and table fit a tablet

    At exactly 768 px the page was drawn as a tablet while the prototype still counted it as a phone, so the floating tab bar sat over the tablet footer and the player opened its phone drawer. Phone is now below 768, tablet 768–1023, desktop from 1024, the same edges as the CSS (prototype PR [465](https://github.com/nvjeronimo/skillup-lms-prototype/pull/465)). On a tablet My Learning's toolbar takes two rows: the search on the left and the view switch on the right, the status filter below; one row from 1024 up (prototype PR [464](https://github.com/nvjeronimo/skillup-lms-prototype/pull/464)). The table view no longer scrolls its action out of view on a tablet: below 1024 Up next (and Effort on Courses) sit under the progress bar; from 1024 up the columns are unchanged (prototype PR [466](https://github.com/nvjeronimo/skillup-lms-prototype/pull/466)). All merged. ICP Ready for Dev cards 06 and 10 (My Learning tablet, 960) redrawn with the two-row toolbar, the grid/list switch now shown on Programs too. Still open: the DS view switch has Grid and List only; the prototype also has Table. Same day the nine token-lint violations that had failed the "Tokens from Figma" sync since 30 Oct were cleared (prototype PR [463](https://github.com/nvjeronimo/skillup-lms-prototype/pull/463), no visual change).
16. <a id="decision-2026-11-03-course-journey-the-module-header-sticks-flush-to-the-top"></a>3 Nov 2026 · Nelson

    ### Course Journey: the module header sticks flush to the top

    In the player sidebar the open module's header stopped 8 px below the top of the list while its topics scrolled, and topics showed above it: a sticky header sticks inside its list's padding (8, 4 in Fluent). It now sticks flush with the top of the list in every skin. Prototype only, no DS or ICP change (Figma does not draw scroll). [prototype PR 462](https://github.com/nvjeronimo/skillup-lms-prototype/pull/462) (merged).
17. <a id="decision-040"></a>3 Nov 2026 · Nelson

    ### Decision 040: Mentorship Q&A keeps Post anonymously

    The reply composer keeps the *Post anonymously* checkbox: Open edX shows it whenever the course has allow\_anonymous: true, as the SkillUp courses do (verified on the dev instance, 21 Aug; allow\_anonymous\_to\_peers is false, so there is no "to classmates" variant). Since 28 Oct the Q&A is a public question post in the course forum, and staff, the mentor included, always see who wrote it. Nelson chose this over switching anonymity off in Studio. No change to the prototype or the ICP. Same day: the open question's title and author line fill the conversation header up to the menu button (prototype PR [461](https://github.com/nvjeronimo/skillup-lms-prototype/pull/461), merged; ICP 03 · Course Detail Row 4, the desktop and tablet headers set to Fill). [decision 040](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/040-qa-post-anonymously-stays.md) ([docs PR 245](https://github.com/nvjeronimo/skillup-lms-prd/pull/245), merged).
18. <a id="decision-2026-11-03-program-card-quick-view-as-an-outlined-icon-button"></a>3 Nov 2026 · Nelson

    ### Program card: Quick view as an outlined icon button

    On the My Learning program card, Quick view is an outlined eye icon button (Icon Button Brand Secondary, sm, 36 × 36). The tertiary button read as a dark patch on the card's dark hero, and its label took a third of the tags row, so Flexible Learning, Beginner and N courses fell one per line; they now take two (the three need 348 px against a 331 px row at 1440, so one line is not possible). The name stays for screen readers and as a hover hint. Prototype PRs [457](https://github.com/nvjeronimo/skillup-lms-prototype/pull/457) (secondary) and [460](https://github.com/nvjeronimo/skillup-lms-prototype/pull/460) (icon only), merged. DS Program-Card 1.17 published; the 47 ICP program cards are on it. Same day: a completed course row's View Certificate on the program page opened a 404 (/platform/certificate/course-1) and now opens the course's certificate (prototype PR [458](https://github.com/nvjeronimo/skillup-lms-prototype/pull/458), merged).
19. <a id="decision-039"></a>3 Nov 2026 · Nelson

    ### Decision 039: a certificate downloads from its page only

    Download certificate lives only on the certificate page; every certificate card and row elsewhere (My Certificates, the program's Certificates tab, the Course Detail sidebar, the Progress tab) shows View and Share. Download had left the My Certificates rows and the program card on 30 Oct without a recorded reason; Nelson chose this over removing it everywhere. Open edX serves a web certificate, not a PDF: in the prototype Download opens the browser's print dialog (Save as PDF), which prints the sheet alone on one A4 landscape page, and it shows in the Open edX scope too (prototype PRs [456](https://github.com/nvjeronimo/skillup-lms-prototype/pull/456) and [459](https://github.com/nvjeronimo/skillup-lms-prototype/pull/459), merged 3 Nov); what the real platform serves is still open. [prototype PR 455](https://github.com/nvjeronimo/skillup-lms-prototype/pull/455) (merged); DS Certificate-Card 1.7 (published 3 Nov; the 57 live ICP cards swapped to 1.7 by script, the accepted update had left them on 1.6); [decision 039](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/039-certificate-download-on-page-only.md) ([docs PR 244](https://github.com/nvjeronimo/skillup-lms-prd/pull/244), merged).
20. <a id="decision-2026-11-03-my-certificates-course-certificates-folded-by-default"></a>3 Nov 2026 · Nelson

    ### My Certificates: course certificates folded by default

    Each program card on My Certificates opens with its course rows folded on desktop, tablet and phone (before, only on a phone); the line "N of M course certificates earned" opens them (prototype PR [454](https://github.com/nvjeronimo/skillup-lms-prototype/pull/454), merged). DS Program-Certificates-Card 1.4: Open off and chevron-down by default (published 3 Nov). ICP 05 · Certificates: the four desktop and tablet program cards folded; the SUPERSEDED screens untouched.
21. <a id="decision-2026-11-02-earned-with-the-certificate-icon-my-certificates-lighter-pro"></a>2 Nov 2026 · Nelson

    ### Earned with the certificate icon; My Certificates lighter; program tabs one step down

    Every Earned certificate badge leads with the certificate icon (award) instead of the check: My Certificates rows, the course certificate card and the Program certificate card (prototype PR [450](https://github.com/nvjeronimo/skillup-lms-prototype/pull/450)). On My Certificates the program's own row sits on the card's white like the other rows, and the rail beside its course rows is 1px (prototype PR [451](https://github.com/nvjeronimo/skillup-lms-prototype/pull/451)). On the program page the tabs are title-medium, text-lg 18/24 on every breakpoint; the other platform pages keep title-large (prototype PR [452](https://github.com/nvjeronimo/skillup-lms-prototype/pull/452)). DS published: Certificate-Card 1.6, Program-Certificate 1.5, Certificate-Row 1.4, Program-Certificates-Card 1.3. ICP: the program page tabs are title-medium 18/24 too, on the 12 Ready for Dev screens and the 04 · Program Detail WIP screens and their sources (an override on the DS Horizontal tabs, which stays title-large). The Course Detail tabs follow the same step (prototype PR [453](https://github.com/nvjeronimo/skillup-lms-prototype/pull/453), merged; My Learning and Certificates keep title-large; ICP: 14 tab rows on Ready for Dev, including the content search screens, and 39 on the WIP page; history frames unchanged).
22. <a id="decision-2026-10-31-program-certificate-stepper-back-earned-on-course-certificat"></a>31 Oct 2026 · Nelson

    ### Program certificate stepper back; Earned on course certificates

    The Program certificate card on the program's Certificates tab shows the course stepper again (the progress bar, not the path of steps): one segment per course in program order, green once complete, light blue in progress, grey not started, and "N of M courses complete" under it; it stays once the certificate is issued, all green ([448](https://github.com/nvjeronimo/skillup-lms-prototype/pull/448), [449](https://github.com/nvjeronimo/skillup-lms-prototype/pull/449)). Issued course certificates carry a green Earned badge at the far end of the "Certificate" eyebrow row ([446](https://github.com/nvjeronimo/skillup-lms-prototype/pull/446), [447](https://github.com/nvjeronimo/skillup-lms-prototype/pull/447)). The share menu on My Certificates opens upwards when there is no room below and is no longer clipped by the program card ([445](https://github.com/nvjeronimo/skillup-lms-prototype/pull/445)). DS Program-Certificate 1.3 and Certificate-Card 1.5 published; ICP Program Certificates 04 / 05 / 06 redrawn (r3). Program-Certificate 1.4 (published the same day) has the stepper on the earned card too (PR 449); the ICP instances are on 1.4.
23. <a id="decision-2026-10-30-program-certificates-without-progress-view-certificate-every"></a>30 Oct 2026 · Nelson

    ### Program certificates without progress; View certificate everywhere

    On the program page the Certificates tab drops the path of steps it had for a few hours ([PR 438](https://github.com/nvjeronimo/skillup-lms-prototype/pull/438)): a learner may take a program's courses in any order, and the progress shows in several other places. The tab now holds the Program certificate card (a plain card; locked preview until earned, and what it gives), then "Course certificates one per course" under the Dashboard Section header, every course titled without its number, earned or as a muted preview with "Pass the course" (prototype PRs [439](https://github.com/nvjeronimo/skillup-lms-prototype/pull/439), [440](https://github.com/nvjeronimo/skillup-lms-prototype/pull/440), [443](https://github.com/nvjeronimo/skillup-lms-prototype/pull/443), [444](https://github.com/nvjeronimo/skillup-lms-prototype/pull/444)). On My Certificates every earned row says View certificate and the row's thumb opens the course or program page ([441](https://github.com/nvjeronimo/skillup-lms-prototype/pull/441), [442](https://github.com/nvjeronimo/skillup-lms-prototype/pull/442)). DS Program-Certificate 1.2, Certificate-Card 1.4 (Status=Preview), Certificate-Row 1.3 published; ICP Program Certificates 04 / 05 / 06 redrawn (r2).
24. <a id="decision-2026-10-30-my-certificates-as-a-ledger-by-program-the-path-on-the-progr"></a>30 Oct 2026 · Nelson

    ### My Certificates as a ledger by program; the path on the program page

    My Certificates drops the Earned / In progress tabs, which split a program whose certificates are partly issued: two DS Button groups (Programs | Single courses; All | In progress | Earned), and one card per program with its certificate row and every course as a row on a rail, earned or not; phones start folded ([prototype PR 437](https://github.com/nvjeronimo/skillup-lms-prototype/pull/437), merged). DS Certificate-Row 1.2 and Program-Certificates-Card 1.2 published; ICP 05 · Certificates redrawn (r4), the 29 Oct screens kept as SUPERSEDED. On the program page the Certificates tab takes the full width and shows the path to the program certificate, the Program certificate card (locked preview until earned, and what it gives) and a card for every course ([prototype PR 438](https://github.com/nvjeronimo/skillup-lms-prototype/pull/438), merged; ICP not redrawn yet). Superseded the same day: the path of steps left the tab (see the entry above).
25. <a id="decision-2026-10-30-boxed-course-journey-sidebar-widths-in-the-icp-program-certi"></a>30 Oct 2026 · Nelson

    ### Boxed Course Journey; sidebar widths in the ICP; program certificates two by two

    Each module of the Course Journey now sits in its own box in every skin, and a locked module no longer carries an "Opens after …" note ([prototype PR 434](https://github.com/nvjeronimo/skillup-lms-prototype/pull/434); DS Sidebar 1.7, Topic-Row 1.6, Module-Info 1.4, Module-Header 1.2, published). The 136 expanded sidebars of the ICP player pages follow [decision 037](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/037-course-journey-sidebar-width.md): 334 on desktop, 280 on tablet ([docs PR 239](https://github.com/nvjeronimo/skillup-lms-prd/pull/239)). On the program page the course certificates fill the content two by two ([PR 435](https://github.com/nvjeronimo/skillup-lms-prototype/pull/435)), and the Square corners option left the profile menu ([PR 436](https://github.com/nvjeronimo/skillup-lms-prototype/pull/436)).
26. <a id="decision-2026-10-30-video-header-sidebar-on-the-grid-account-deletion-experiment"></a>30 Oct 2026 · Nelson

    ### Video header; sidebar on the grid; account deletion experiment

    Video topics now show the type · duration row with "Marked as completed" beside it, on every breakpoint ([decision 038](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/038-video-topic-header-meta-row.md), [prototype PR 430](https://github.com/nvjeronimo/skillup-lms-prototype/pull/430)). The ICP Video, Quizzes and Reading pages were aligned with it: header and sidebar agree on status and duration, "approx." per [decision 004](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/004-approx-duration-prefix.md), the Video Dark frame on SKO Dark. The Course Journey sidebar takes 3 of 12 columns, between 280 and 400 ([decision 037](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/037-course-journey-sidebar-width.md), prototype PRs [431](https://github.com/nvjeronimo/skillup-lms-prototype/pull/431) and [432](https://github.com/nvjeronimo/skillup-lms-prototype/pull/432)). The Beyond Open edX switch now changes the page in place, no reload ([PR 429](https://github.com/nvjeronimo/skillup-lms-prototype/pull/429)). New experiment: the account deletion flow for the next release, with the sign-in interstitial only under Beyond Open edX (Open edX lets only support cancel a pending deletion; [PR 433](https://github.com/nvjeronimo/skillup-lms-prototype/pull/433)).
27. <a id="decision-2026-10-30-my-certificates-one-card-per-program"></a>30 Oct 2026 · Nelson

    ### My Certificates: one card per program

    My Certificates shows one card per program (Nelson, 29 Oct): the program hero, the program certificate, and its course certificates as compact rows behind Show / Hide. It replaces the grid of large cards, Show all N and the Grid / List toggle, which grew confusing as certificates added up. DS: Program-Certificates-Card 1.1 and Certificate-Row 1.0; ICP 05 · Certificates redrawn. Superseded 30 Oct 2026 by the ledger by program (no tabs, two Button groups; [prototype PR 437](https://github.com/nvjeronimo/skillup-lms-prototype/pull/437)). [prototype PR 428](https://github.com/nvjeronimo/skillup-lms-prototype/pull/428) (merged) · [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
28. <a id="decision-2026-10-29-the-prototype-opens-in-open-edx-only-mode"></a>29 Oct 2026 · Nelson

    ### The prototype opens in Open edX only mode

    The prototype now opens by default with only what Open edX provides, reversing the 28 Oct default where ?scope=edx was opt-in. The scope chip is gone. The demo footer switch of the profile menu is now "Beyond Open edX" ("Show our improvements and extra features"), off by default; ?scope=full opts in and ?scope=edx goes back. The accessibility preferences are no longer hidden: they stay visible in the Open edX scope, since they are frontend-only and we ship them (Nelson). Rule: the UI never says "what we invented". [prototype PR 422](https://github.com/nvjeronimo/skillup-lms-prototype/pull/422) (merged).
29. <a id="decision-2026-10-28-prototype-has-an-open-edx-scope-scope-edx"></a>28 Oct 2026 · Nelson

    ### Prototype has an Open edX scope (?scope=edx)

    With ?scope=edx the prototype shows only what Open edX provides (native, settings, and Open edX data drawn by our frontend) and hides what we invented (the CUSTOM rows of the Open edX fit audit): the assistant, the Services page, live sessions in the Calendar, the Notes and Downloads tabs, the Next-asks dialog, the quiz pass mark, verdict and retake, durations on assessed types, time left, level, partner logos, the course team card, the certificate PDF, readable ID and stats, and the accessibility preferences, among others. ?scope=full turns it off; a chip bottom-left says it is on. Kept although custom: the player shell composition, 90% auto-complete (Open edX does 95% by setting), the hosted IBM course screen and the demo tools. Basis: decision 035. [prototype PR 417](https://github.com/nvjeronimo/skillup-lms-prototype/pull/417) (merged). Since 29 Oct it is the default (see above).
30. <a id="decision-2026-10-28-prototype-and-figma-matched-sko-match-audit"></a>28 Oct 2026 · Nelson

    ### Prototype and Figma matched (SKO match audit)

    147 differences between the prototype and Figma, decided by Nelson case by case. 26 DS components were updated and published (28 Oct 2026), and the ICP screens updated.
31. <a id="decision-036"></a>28 Oct 2026 · ICP review call: Kirti, Navdeep, Simran, Shivam, Nelson

    ### 036 · The Dates tab is not shown on self-paced courses; its design is on hold

    In the ICP review call of 28 Oct (Kirti, Navdeep, Simran, Shivam, Nelson) the team confirmed SkillUp configures only a course's start and end dates, never module, quiz or project due dates; on a self-paced course the end is an expiry such as 2050, of no value to the learner. So: no Dates tab on self-paced courses (Flexible Learning), and with no due dates there is no Shift due dates alert, no Upcoming dates card, and the Calendar and Dashboard deadlines are examples only (marked as mock in the prototype). Instructor-led live sessions go through the Calendar; whether a Dates tab repeats them is decided later. Applied: [prototype PR 411](https://github.com/nvjeronimo/skillup-lms-prototype/pull/411) (merged); the ICP Course-tab screens (Ready for Dev and WIP) hide the Dates tab, the Upcoming dates card and the missed-deadline alert; the screens with the Dates tab open stay on WIP; "Homework" is replaced by "Assignment" everywhere (prototype, DS Date-Row 1.1, ICP). [decision 036](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/036-dates-tab-hidden-self-paced.md)
32. <a id="decision-2026-10-28-meeting-outcomes-progress-approved-mentorship-q-a-on-hold"></a>28 Oct 2026 · ICP review call: Kirti, Navdeep, Simran, Shivam, Nelson

    ### Meeting outcomes: Progress approved, Mentorship Q&A on hold

    The Progress tab is approved to go ahead (Kirti raises the ticket). Course completion counts everything, labs included. Quizzes are auto-graded; projects are ORA graded by mentors on rubrics (peer and self assessment off). Assignment types are named per course (for example Microsoft's "Knowledge checks"). Mentorship Q&A is on hold until a mentorship strategy session (Kirti); Kirti renamed Discussion to Mentorship Q&A and removed Following. Notifications: the dev team checks our Open edX release and whether the Notifications feature is on. [meeting notes](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/meeting-2026-10-28-progress-dates-qa.md)
33. <a id="decision-035"></a>28 Oct 2026 · Nelson

    ### 035 · Everything Open edX-based: Mentorship Q&A, past due, the Dates tab and notifications

    Everything is Open edX-based, with no extra development; a feature the platform does not provide is drawn only if it is truly important, after research and the stakeholders' approval. Mentorship Q&A becomes public question posts in the course discussions: Open edX has no private 1-to-1 messaging (it replaces decision 029's Mentorship Q&A private to the learner and the mentor). A past-due deadline reads "Past due" in amber, never red, on the Dates tab, the Calendar and the Dashboard. The Dates tab shows only Open edX's date types and badges (Today, Completed, Past due, Due next on one item, Not yet released, Verified only): no "Locked · unlocks when", no assignment descriptions. Notifications are only the four types Open edX sends: discussion activity, instructor posts, course updates and the ORA grade. Discovery notes in [LMS-HANDOFF/edx-notifications.md](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/edx-notifications.md), [edx-dates-tab.md](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/edx-dates-tab.md) and [edx-mentorship-qa.md](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/edx-mentorship-qa.md) ([docs PR 233](https://github.com/nvjeronimo/skillup-lms-prd/pull/233), merged). [prototype PR 410](https://github.com/nvjeronimo/skillup-lms-prototype/pull/410). DS: Date-Row 1.1, Due-Item 1.3, Month-Event 1.2 and Stay-Informed-Row 1.1 follow (published 28 Oct). Amended 28 Oct 2026: the Dates tab part applies only to instructor-led courses; on self-paced courses decision 036 supersedes it (no Dates tab).
34. <a id="decision-2026-10-27-compact-platform-topbars-at-64-actions-on-the-right"></a>27 Oct 2026 · Nelson

    ### Compact platform Topbars at 64, actions on the right

    All 103 Compact platform Topbars in the ICP (Ready for Dev 28, WIP 75; phone and tablet) are now 64 tall, as the DS Topbar Compact (64 with the rule), with the actions at the right edge (16 inset). They were 57 (hug), 4 were 72, and on tablet the actions sat next to the logo. Asked by Nelson. DS: LMS/Platform/Navigation/Topbar 1.10 follows (published 27 Oct): the Compact variant spaces its two groups apart (menu and logo on the left, the actions on the right edge), so a tablet instance keeps the actions on the right instead of beside the logo; still 64 tall. ICP: every platform Topbar is on the published 1.10 (Ready for Dev 21 Desktop + 28 Compact, WIP 61 Desktop + 75 Compact); all 103 Compact are 64 tall with the actions 16 from the right edge.
35. <a id="decision-2026-10-27-badges-in-sentence-case"></a>27 Oct 2026 · Nelson

    ### Badges in sentence case

    Badges are in sentence case, never forced capitals; label-small eyebrows stay upper case. DS (published): Thread-Row, Message, Date-Row, Inbox-Row, Course-Type-Badge, VILT-Stage-Surface; ICP: 424 badge texts. [prototype PR 401](https://github.com/nvjeronimo/skillup-lms-prototype/pull/401) (merged 27 Oct). Impeccable session. Amended 24 Nov 2026 (Nelson, decision 043): the Course type label is the one exception and shows COURSE / PROGRAM in capitals.
36. <a id="decision-2026-10-27-course-journey-promoted-next-turns-primary-on-completion"></a>27 Oct 2026 · Nelson

    ### Course Journey promoted; Next turns Primary on completion

    DS, published 27 Oct (Impeccable session): LMS Sidebar 1.5 and Module-Info 1.2 promote the Course Journey proposal (the "Course journey" panel name, Up next, lock reasons, "N of M topics", Module 3 of 3); Course-Progression-Button 1.1 adds Milestone=Next-Topic-Complete (Brand Primary: Next is Primary only when the topic is complete). ICP: 95 phone texts re-styled from a stale copy. ICP sweep done: 219 LMS Sidebar instances (Video 30, Quizzes 57, Reading 21, Lab 48, Activity 46, AI Assistant 4, WIP 13) show Up next after the open row, lock reasons on locked rows, "N of M topics", "Module i of N" and the overline; Course-Progression-Button Next-Topic-Complete on the 14 screens whose open topic is complete. WIP frame 7778:101772 renamed [13 · Course Journey (promoted 27 Oct, now the default Sidebar)](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7778-101772). The Course Journey is no longer in review.
37. <a id="decision-2026-10-27-platform-page-tabs-on-title-large"></a>27 Oct 2026 · Nelson

    ### Platform-page tabs on title-large

    The platform-page tabs (course and program details, My Learning and Certificates) use title-large / Semibold: 20 / 30 on desktop and tablet, 18 / 28 on a phone. Tablet was headline-small 24; desktop was already title-large in code but 24 in Figma. DS: the \_Tab button base Size=lg label (36 variants) is on title-large / Semibold, published 27 Oct. [prototype PR 400](https://github.com/nvjeronimo/skillup-lms-prototype/pull/400) (merged 27 Oct). ICP: all Size=lg tabs on Ready for Dev and WIP are on the published copy, 20 px on desktop and tablet, 18 px on mobile (94 instances were swapped from a stale copy; no override lost). Earlier: "Platform-page tabs larger" (25 Oct, headline-small 24).
38. <a id="decision-2026-10-27-course-detail-dates-and-mentorship-q-a-not-approved-yet"></a>27 Oct 2026 · Nelson

    ### Course Detail: Dates and Mentorship Q&A not approved yet

    The Course Detail Dates and Mentorship Q&A tab screens were removed from Platform Pages – Ready for Dev, whose Course Detail section now holds the Course and Progress tabs only. Their screens stay on Platform Pages – WIP › 03 · Course Detail: [Row 3 · Dates tab](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7497-260504) and [Row 4 · Mentorship Q&A tab](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7495-212081).
39. <a id="decision-034"></a>27 Oct 2026 · Nelson

    ### 034 · Grade summary states and the Completion card count line

    Grade-Summary 1.2 (1.1 stays the 20 Oct radii; renumbered ([docs PR 232](https://github.com/nvjeronimo/skillup-lms-prd/pull/232) and [prototype PR 399](https://github.com/nvjeronimo/skillup-lms-prototype/pull/399), both merged 27 Oct: renumber only)): Result = Not started / Below pass / Passing / Submitted below pass (amber) / Course ended (red). Completion-Card 1.3: a variant set, State = Not started / In progress / Completed, with the count line as its Body ("16 of 42 topics complete." / "All N topics complete." / "N of M available topics complete." when topics are locked) and a "Show locked" boolean with a Gray badge; it replaces the "Topics:" counts of 1.2 (Nelson approved). Both published 27 Oct. ICP: the 9 Completion cards and the 3 Grade summaries on the new versions, the Six Sigma data fixed, and a new card "Card · 07 · Progress tab · edge cases" ([7969:39005](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7969-39005)) on Platform Pages Ready for Dev. [prototype PR 397](https://github.com/nvjeronimo/skillup-lms-prototype/pull/397) (merged), [docs PR 231](https://github.com/nvjeronimo/skillup-lms-prd/pull/231) (merged: decision 034).
40. <a id="decision-2026-10-27-the-assistant-window-closes-on-a-press-outside-it"></a>27 Oct 2026 · Nelson

    ### The assistant window closes on a press outside it

    On the platform pages and in the player, on tablet and desktop, the AI Assistant window closes when the learner presses outside it; focus stays where they pressed, and the bar's Assistant and search buttons do not close it. The phone sheet is full screen, so it is not affected. [prototype PR 398](https://github.com/nvjeronimo/skillup-lms-prototype/pull/398) (merged 27 Oct).
41. <a id="decision-2026-10-27-platform-top-bar-sections-and-search-in-the-content-column"></a>27 Oct 2026 · Nelson

    ### Platform top bar: sections and search in the content column

    In the desktop tabs bar only the sections (menu) and the Search + Assistant pill sit in the 1200 content column (Container/content-max-width), starting where the page content starts; the logo and the actions (notifications, theme switch, learner with name) stay at the bar's edges (24). Both edges line up with the content from about 1900; on narrower screens the column gives way on the right. [prototype PR 395](https://github.com/nvjeronimo/skillup-lms-prototype/pull/395) (merged) was a first version that made the whole bar compact to 1200 and is superseded by [prototype PR 396](https://github.com/nvjeronimo/skillup-lms-prototype/pull/396) (merged 27 Oct: the correct rule, restoring the tab gaps, the 340 pill and the learner name). Follow-up fix, [prototype PR 403](https://github.com/nvjeronimo/skillup-lms-prototype/pull/403) (merged 27 Oct): the tabs bar no longer runs past the screen between 1024 and 1280 (the search pill's width no longer sets the middle column's minimum; the tabs sit 12 apart below 1440). DS: LMS/Platform/Navigation/Topbar 1.9, Desktop with a Middle frame (Nav + Search) on Container/content-max-width; published 27 Oct. ICP: all 84 Desktop platform Topbars (23 Ready for Dev + 61 WIP) are on the published 1.9; the Current item and the counts are unchanged on every one.
42. <a id="decision-033"></a>27 Oct 2026 · Nelson

    ### 033 · Reading text fills the content column

    Reading text now fills the content column (1200, the same as the platform pages) instead of the 56ch cap (Nelson). New DS token Container/text-max-width in 2. Responsive 📐: an alias of Container/content-max-width (1200 in every mode), web var(--sk-container-text-max-width); published 27 Oct. [prototype PR 393](https://github.com/nvjeronimo/skillup-lms-prototype/pull/393) (merged: the cap removed), [prototype PR 394](https://github.com/nvjeronimo/skillup-lms-prototype/pull/394) (merged 27 Oct: a max-w-text class on the token, fallback 1200), [docs PR 229](https://github.com/nvjeronimo/skillup-lms-prd/pull/229) (merged 27 Oct: decision 033 + CHANGELOG). ICP: no change needed; the Ready for Dev Reading text already fills the column. ICP: the Reading text is not bound to Container/text-max-width (Figma cannot bind max width on text layers, and the paragraphs share frames with lesson blocks); nothing changes visually (the text is at most 1056). [docs PR 230](https://github.com/nvjeronimo/skillup-lms-prd/pull/230) (merged 27 Oct) corrects decision 033 on that.
43. <a id="decision-2026-10-27-completion-card-counts-read-topics"></a>27 Oct 2026 · Nelson

    ### Completion card counts read "Topics:"

    The course completion card counts now read "Topics: 16 complete · 26 incomplete · 0 locked" (Nelson, ICP [6406:41528](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=6406-41528)). DS: LMS/Platform/Course-Detail/Completion-Card 1.2 (Counts default starts with "Topics:", sample ring 38% to match 16 of 42), published 27 Oct. ICP: all 9 Completion card instances are on the published 1.2 and show "Topics:" and 38% (was a stale 67%). [prototype PR 392](https://github.com/nvjeronimo/skillup-lms-prototype/pull/392) (merged: ProgressTab prefixes "Topics:"), [docs PR 228](https://github.com/nvjeronimo/skillup-lms-prd/pull/228) (merged: CHANGELOG + course-details-metadata-map §12.5). Amended 27 Oct: superseded the same day by Completion-Card 1.3's count line ("16 of 42 topics complete."; decision 034).
44. <a id="decision-2026-10-27-phone-body-large-at-18-26"></a>27 Oct 2026 · Nelson

    ### Phone body-large at 18 / 26

    On the phone (Responsive Mobile mode) Type/size/text-md is 18 (alias text-lg) and Type/line-height/text-md is 26 (a new hidden primitive, Type/line-height/mobile-min-26), so body-large is 18 / 26 on the phone and title-medium also reads 18 / 26 there; desktop and tablet are unchanged. Impeccable session's DS change, published by Nelson. [prototype PR 391](https://github.com/nvjeronimo/skillup-lms-prototype/pull/391) (merged 27 Oct): the phone type tokens applied by hand (no token sync since 25 Oct). ICP: most phone texts on Platform Pages – WIP read 18 / 26; about 30 texts inside nested Buttons and the FAQ / About accordion items on 8 phone screens (Course Detail and Program Detail mobile tabs) still read 16, bound to an older copy of the variable, pending a library accept in the ICP.
45. <a id="decision-2026-10-27-colourblind-safe-states-in-every-skin"></a>27 Oct 2026 · Nelson

    ### Colourblind-safe states in every skin

    The colourblind-safe states of the Accessibility standards now work in every skin (SKO, Gold, Studio, Harbor, Fluent). In the DS a doc block "Every skin, same rule" ([23561:35](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23561-35)) on the ♿ Accessibility Standards page says so (doc only, no component change). [Prototype PR 389](https://github.com/nvjeronimo/skillup-lms-prototype/pull/389) (merged 27 Oct, Impeccable session).
46. <a id="decision-2026-10-27-any-progress-at-100-is-green"></a>27 Oct 2026 · Nelson

    ### Any progress at 100% is green

    Every progress bar or ring at 100% completed is green (bar bg/success, ring icon/success-strong), not only finished courses and programs. The DS already does it (Progress bar / plain / ring Progress=100%, Progress circle Status=Completed). ICP: two 100% bars were on a stale library version and showed blue; re-pointed (Course Detail "Completed — certificate earned"; Topic Content Types Discovery "JOURNEY · Graded"). [prototype PR 390](https://github.com/nvjeronimo/skillup-lms-prototype/pull/390) (merged 27 Oct): PlatformProgressBar turns green at 100% by itself, as do the course Progress tab ring and the program certificate hero's finished segments.
47. <a id="decision-2026-10-27-course-journey-12-between-module-boxes"></a>27 Oct 2026 · Nelson

    ### Course Journey: 12 between module boxes

    In the boxed skins (Studio, Harbor, Fluent) the gap between the player sidebar's module boxes is 12 (was 8 in Studio and Harbor, 4 in Fluent); the list padding and the box radius are unchanged. Prototype only, no DS change. [Prototype PR 385](https://github.com/nvjeronimo/skillup-lms-prototype/pull/385) (merged 27 Oct).
48. <a id="decision-2026-10-27-phone-type-minimums-and-tighter-breadcrumbs"></a>27 Oct 2026 · Nelson

    ### Phone type minimums and tighter breadcrumbs

    Mobile mode of "2. Responsive": Type/size text-sm 16 / line-height 24, text-xs 13 / 18, text-2xs 12 / 18 (body 16 minimum, 13 the smallest, 2xs 12), with four new hidden primitives mobile-min-16 / 24 / 13 / 18; published 27 Oct; it reaches the prototype after a Publish tokens run. Breadcrumbs on the course, program and certificate pages: wrapped lines 24 apart instead of 44, the 44 px target kept as an invisible ::after ([prototype PR 382](https://github.com/nvjeronimo/skillup-lms-prototype/pull/382)). label-small / Regular, Medium and Semibold now bind Responsive Type/size/text-xs and its line-height (12 on desktop and tablet, 13 on a phone; they were on primitives), published 27 Oct. Amended 27 Oct: text-md on the phone is 18 / 26 (see the entry above, [prototype PR 391](https://github.com/nvjeronimo/skillup-lms-prototype/pull/391)). Amended 29 Oct: Responsive 📐 Desktop and Tablet are now text-2xs 12 / 18 and text-xs 13 / 18; text-sm stays 14 / 20 (published 29 Oct; [prototype PR 419](https://github.com/nvjeronimo/skillup-lms-prototype/pull/419)).
49. <a id="decision-2026-10-26-dashboard-greeting-by-local-time"></a>26 Oct 2026 · Nelson

    ### Dashboard greeting by local time

    Good morning 05–12, Good afternoon 12–18, Good evening 18–05, by the learner's browser clock, never the server's. The server renders "Hello," and the browser swaps in the right greeting; it is checked again when the tab comes back. The Open edX time\_zone preference is only a fallback. [prototype PR 380](https://github.com/nvjeronimo/skillup-lms-prototype/pull/380) (merged); handoff note [greeting-by-time](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/greeting-by-time.md) ([docs PR 224](https://github.com/nvjeronimo/skillup-lms-prd/pull/224), merged). No Figma change: the screens keep "Good morning," as the example.
50. <a id="decision-2026-10-26-motion-is-the-same-in-every-skin"></a>26 Oct 2026 · Nelson

    ### Motion is the same in every skin

    Audit of the five skins (SKO, Gold, Studio, Harbor, Fluent): the motion tokens, keyframes and shared components are identical; the gaps were in what only the panel layout (Harbor, Fluent) renders and in Fluent's indicators. Fixed: the left rail eases its width and holds still through page transitions; Stay informed joins the Dashboard cascade; Pick up cross-fades its preview; Fluent's rail and Pick up indicators grow in. Rule: a skin may change colour, radius, type and elevation, never timing; its own markup follows the shared recipes. Prototype [PR 366](https://github.com/nvjeronimo/skillup-lms-prototype/pull/366) merged. Developer guide: docs [PR 225](https://github.com/nvjeronimo/skillup-lms-prd/pull/225).
51. <a id="decision-2026-10-26-the-glance-in-gold-colours-fluent-light-gets-the-rings-and-h"></a>26 Oct 2026 · Nelson

    ### The glance in Gold colours; Fluent light gets the rings and haze

    Gold: the "Your learning at a glance" backdrop is the skin's deep gold #553600 (it was the SKO teal), its rings #FFD07A and the light in the middle ring and the haze #C89536, the same in light and dark (tokens/skin-gold.css). Fluent light: the rings, the light and the haze as in every other skin, in Fluent's blue on the blue tray (they were grey, no haze). Prototype only. [prototype PR 379](https://github.com/nvjeronimo/skillup-lms-prototype/pull/379) (merged).
52. <a id="decision-2026-10-26-dashboard-the-harbor-fluent-layout-in-every-skin"></a>26 Oct 2026 · Nelson

    ### Dashboard: the Harbor / Fluent layout in every skin

    The greeting tip; Pick up where you left off as a list with the chosen course large, beside Stay informed; Due this week beside Jump somewhere; in SKO, Gold, Studio, Harbor and Fluent. Each skin keeps its own colours, radius, type and motion; the left rail and the top-bar search stay Harbor / Fluent. The old SKO dashboard layout is retired (ResumeRow unused). [prototype PR 375](https://github.com/nvjeronimo/skillup-lms-prototype/pull/375) (merged). DS and ICP done (Impeccable session): the DS gained Greeting, Pick-Up (+ Pick-Up-Item), Stay-Informed (+ Stay-Informed-Row) and Today-at-a-glance 1.11 (rings), published; ICP 01 · Dashboard redrawn on desktop, tablet and mobile in the panel layout; new WIP frame [“16 · Dashboard in the skins (26 Oct)”](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7864-107582) (node 7864:107582). My Learning too: DS Learning-Table (+ Learning-Table-Row); ICP 02 · My Learning cards 05b and 09b (table view, desktop). Earlier: the ICP Dashboard frames were still to be redrawn.
53. <a id="decision-2026-10-26-light-dark-switch-smaller-on-phones"></a>26 Oct 2026 · Nelson

    ### Light / dark switch smaller on phones

    The compact ThemeSwitch has 32 segments in a 40 track (was 44, 98 × 52); 44 targets through invisible bands. The DS Theme-Switch md matches (Impeccable session). [prototype PR 376](https://github.com/nvjeronimo/skillup-lms-prototype/pull/376) (merged).
54. <a id="decision-2026-10-26-compact-bars-a-32-search-assistant-button"></a>26 Oct 2026 · Nelson

    ### Compact bars: a 32 Search-Assistant button

    As in the DS Compact Topbar; 44 targets through invisible bands. [prototype PR 377](https://github.com/nvjeronimo/skillup-lms-prototype/pull/377) (merged).
55. <a id="decision-2026-10-26-my-certificates-grouped-by-program"></a>26 Oct 2026 · Nelson

    ### My Certificates grouped by program

    One block per program. An earned program certificate is the large card at the top of its block (as the block's title), then "N of M course certificates" and the program's course certificates in course order (max 4 + Show all). A program not earned yet shows "Program certificate when all M courses are complete" + View program. In progress: the same blocks with the program's bar. Courses of no program sit under "Other courses". Search also matches the program title; the tab counts still count certificates. [prototype PR 378](https://github.com/nvjeronimo/skillup-lms-prototype/pull/378) (merged). ICP drawn on the 4 WIP Certificates screens: Earned desktop / tablet / mobile (3 blocks: Data Analytics with the earned hero, "5 of 5", 4 cards + Show all 5; AI Augmented Digital Marketing not yet earned, "1 of 7", the quiet line + View program; Other courses · 1) and In progress desktop (the program row with its bar, Other courses · 3). Open: the phone hero's buttons overlap (DS Program-Certificate hero, Stacked); the In progress desktop frame is clipped at 808; no tablet / mobile In progress screens. [docs PR 227](https://github.com/nvjeronimo/skillup-lms-prd/pull/227). 27 Oct: a program block shows only the first row of course certificates (1 on phones, 2 on tablets, 3 on desktop), then Show all; it was 4, which left one card alone on a second row. [prototype PR 384](https://github.com/nvjeronimo/skillup-lms-prototype/pull/384) (merged, Impeccable session). The ICP screens still show 4 + Show all: to update. Earlier: DS / ICP not drawn yet. Superseded 30 Oct 2026: My Certificates shows one card per program, its course certificates as compact rows behind Show / Hide; Show all N and the Grid / List toggle are gone ([prototype PR 428](https://github.com/nvjeronimo/skillup-lms-prototype/pull/428)).
56. <a id="decision-2026-10-26-ds-navigation-components-and-the-skin-shape-collection-publi"></a>26 Oct 2026 · Nelson

    ### DS navigation components and the Skin shape collection, published

    New v1.0 under LMS/Platform/Navigation/: Theme-Switch, Search-Assistant-Button, Search-Pill and Search-Palette, each with its doc block on the Navigation page; the ai-assistant icon (the AI Assistant Mark V2) in Icons › Communication, also the prototype's assistant glyph ([prototype PR 373](https://github.com/nvjeronimo/skillup-lms-prototype/pull/373)). Topbars: the theme Utility Button becomes the Theme-Switch; Desktop gets the Search-Pill, Compact the Search-Assistant-Button (sm, actions on Spacing/xs so the bar fits 375); the player Topbar the pill on desktop and the button on tablet and phone. A new variable collection "4. Skin shape" (modes SKO · Gold · Studio · Harbor · Fluent · Square): the Responsive Radius/\* roles alias Shape/\*, so a frame picks its colour mode and its shape mode separately; default SKO, nothing changes on the screens. Published 26 Oct by Nelson; the ICP screens follow (Impeccable session).
57. <a id="decision-2026-10-26-fluent-a-blue-tinted-glance-tray"></a>26 Oct 2026 · Nelson

    ### Fluent: a blue-tinted glance tray

    In Fluent the tray behind "Your learning at a glance" is Brand 160 #EBF3FC in light (was Background5 #EBEBEB) and Brand 20 #082338 in dark (was #1F1F1F); the white cards, the ink title and the grey rings are unchanged. Not in the DS Fluent mode yet. [prototype PR 374](https://github.com/nvjeronimo/skillup-lms-prototype/pull/374) (merged).
58. <a id="decision-2026-10-26-my-certificates"></a>26 Oct 2026 · Nelson

    ### My Certificates

    The profile menu item and the Certificates page are named "My Certificates": the page heading, the tab title, the skeleton, the Dashboard jump card and the search palette shortcut. [prototype PR 370](https://github.com/nvjeronimo/skillup-lms-prototype/pull/370) (merged). DS: LMS / Profile Menu 1.9 (the row reads "My Certificates"), published 26 Oct. ICP: the Certificates page title on 4 WIP screens and 12 Dashboard jump-card titles (WIP 6, Ready for Dev 3, AI Assistant 3); the open profile menus follow the component. Unchanged on purpose: the glance figure, the Services tile and the program Certificates tab. [docs PR 223](https://github.com/nvjeronimo/skillup-lms-prd/pull/223). Earlier: in review, not merged.
59. <a id="decision-2026-10-26-the-floating-assistant-is-retired-search-assistant-everywher"></a>26 Oct 2026 · Nelson

    ### The floating assistant is retired: Search + Assistant everywhere

    The assistant has no floating launcher any more. It opens from the top bars' Search + Assistant: the pill on every platform page (every skin) and now in the course player, where it is scoped to the course: "In this course" lists the topics whose title matches, "Ask about this course" and Enter ask the assistant, and the window's topics are This topic · This course · Deadlines and grades · Certificate. Where the pill does not fit (compact bars on tablet and phone, the tabs bar between 1025 and 1279 px, the player on tablet and phone) a search button opens a full-screen sheet with the same field and palette. The window hangs under the button that opened it; on a phone it is a full-screen sheet. Its icon is the assistant mark's paper plane and three sparkles, without the ball (AssistantGlyph). Below 1536 px the pill rests at 240 px ("Search" and the mark) and opens to its full width while the learner is in it; from 1536 px it keeps its full width ([prototype PR 371](https://github.com/nvjeronimo/skillup-lms-prototype/pull/371)). The floating chat as it was is kept for reference behind ?assistant=floating. Figma: the DS Assistant-Launcher and Assistant-Chat descriptions start with "Migrated 26 Oct 2026" (the DS is not published yet); the ICP preview page keeps its drawings with a note at the top and is renamed "AI Assistant · floating chat · migrated to Search bar (26 Oct)". [prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369) · [prototype PR 371](https://github.com/nvjeronimo/skillup-lms-prototype/pull/371) (merged).
60. <a id="decision-2026-10-26-harbor-and-fluent-in-the-ds-colour-collection-unpublished"></a>26 Oct 2026 · Nelson

    ### Harbor and Fluent in the DS colour collection (unpublished)

    SKO-Semantics now has 10 modes, the Figma cap: SKO, Gold, Studio, Harbor and Fluent, each Light and Dark. Each new mode starts from SKO in the same tone; 50 roles (light) and 38 (dark) alias hidden primitives such as "Harbor/Light/…" and "Fluent/Dark/…" (176 in all) with the prototype's values. Font-Family display and body per mode: Harbor Plus Jakarta Sans / Figtree, Fluent Open Sans. Not published yet. Not in the DS: the radius roles and component shapes per skin (radius lives in the breakpoint collection), which needs a decision; Open Sans has no Medium in Figma. DS work, no PR.
61. <a id="decision-2026-10-26-button-groups-read-as-one-group-in-harbor-and-fluent"></a>26 Oct 2026 · Nelson

    ### Button groups read as one group in Harbor and Fluent

    Every segmented control (the status filters, the view toggle, Brand skin, the Calendar and Discussion filters) is a track on bg/muted with the selected segment raised on white. Harbor: pills and a soft shadow. Fluent: radius 4 segments in an 8 track, Stroke1. It supersedes Harbor's light-blue selected fill ([prototype PR 349](https://github.com/nvjeronimo/skillup-lms-prototype/pull/349)) and Fluent's TabList indicator ([prototype PR 352](https://github.com/nvjeronimo/skillup-lms-prototype/pull/352)) for segmented controls. Same PR: the theme switch is smaller (24 px segments in a 32 px track, 44 px on compact bars); the large platform tabs sit 32 px apart (was 12); on short pages the footer sits at the bottom of the screen. [prototype PR 368](https://github.com/nvjeronimo/skillup-lms-prototype/pull/368) (merged).
62. <a id="decision-2026-10-26-prototype-tweaks-of-26-oct"></a>26 Oct 2026 · Nelson

    ### Prototype tweaks of 26 Oct

    The Loading switch left the profile menu, on the platform and in the player. Square corners works in every skin (tokens/square-corners.css, loaded last; buttons keep their corners). My Learning's Programs tab has a table view too: program, progress, N of M courses, up next, action. The theme switch keeps its track in Harbor and Fluent. Fluent's glance has a neutral tray (#EBEBEB light, #1F1F1F dark). [prototype PR 367](https://github.com/nvjeronimo/skillup-lms-prototype/pull/367) (merged).
63. <a id="decision-2026-10-26-mini-light-dark-switch"></a>26 Oct 2026 · Nelson

    ### Mini light / dark switch

    A new ThemeSwitch: a Button group with two icon segments, Sun and Moon, the current theme pressed, on the decision 028 radii. It replaces the single theme Utility Button in the platform bar and in the player bar. On the compact bar the segments are 44 px. Prototype only: the DS Topbars still have the Utility Button. [prototype PR 365](https://github.com/nvjeronimo/skillup-lms-prototype/pull/365) (merged).
64. <a id="decision-2026-10-26-search-assistant-pill-in-every-skin-the-floating-launcher-st"></a>26 Oct 2026 · Nelson

    ### Search + Assistant pill in every skin; the floating launcher stays in the player

    SKO, Gold and Studio get the top-bar pill of [prototype PR 359](https://github.com/nvjeronimo/skillup-lms-prototype/pull/359) (the search palette and the panel-style assistant) beside the section tabs, from 1280 px: five tabs and the pill do not fit below. When the pill is narrow the word "Assistant" drops. On platform pages the floating launcher disappears wherever the pill shows. It stays in the player (ICP), on the tabs bar between 1025 and 1279 px, on compact bars and beside the phone tab bar. Not in the DS or the ICP. [prototype PR 365](https://github.com/nvjeronimo/skillup-lms-prototype/pull/365) (merged). Amended 26 Oct 2026: the launcher no longer stays anywhere ([prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369)); below 1280 px the tabs bar shows a search button that opens a full-screen sheet.
65. <a id="decision-2026-10-26-panel-dashboard-pick-up-beside-stay-informed-due-beside-jump"></a>26 Oct 2026 · Nelson · experiment

    ### Panel dashboard: Pick up beside Stay informed, Due beside Jump

    Harbor and Fluent Dashboards: row 1 is Pick up where you left off beside Stay informed; row 2 is Due this week beside Jump somewhere, its tiles in one column. It replaces the arrangement of [prototype PR 356](https://github.com/nvjeronimo/skillup-lms-prototype/pull/356). Other skins unchanged. [prototype PR 364](https://github.com/nvjeronimo/skillup-lms-prototype/pull/364) (merged).
66. <a id="decision-2026-10-26-glance-rings-in-every-skin"></a>26 Oct 2026 · Nelson

    ### Glance rings in every skin

    The concentric rings and soft hazes of the Harbor glance move into the glance component, for every skin, in SkillUp blues: rings #0086C9, haze #51BFFC ([prototype PR 360](https://github.com/nvjeronimo/skillup-lms-prototype/pull/360) removed the purple). Each skin keeps its own block colour: the teal band in SKO and Gold, ink in Studio, navy in Harbor, the canvas in Fluent. Fluent Light shows the rings alone, in Fluent's grey stroke #D1D1D1 ([prototype PR 362](https://github.com/nvjeronimo/skillup-lms-prototype/pull/362)). Prototype only: the DS Today-at-a-glance still has the old glow shapes. [prototype PR 360](https://github.com/nvjeronimo/skillup-lms-prototype/pull/360) · [prototype PR 361](https://github.com/nvjeronimo/skillup-lms-prototype/pull/361) · [prototype PR 362](https://github.com/nvjeronimo/skillup-lms-prototype/pull/362) (merged).
67. <a id="decision-2026-10-26-the-red-skin-is-gone"></a>26 Oct 2026 · Nelson

    ### The Red skin is gone

    Nelson removed Red from the DS, and the prototype drops it too. The brand skins are now SKO · Gold · Studio · Harbor · Fluent. A stored Red choice lands on SKO. The generated token files carried Red until the "Publish tokens" of 12 Nov 2026 (prototype PR [487](https://github.com/nvjeronimo/skillup-lms-prototype/pull/487)). [prototype PR 363](https://github.com/nvjeronimo/skillup-lms-prototype/pull/363) (merged).
68. <a id="decision-2026-10-26-panel-top-bar-search-palette-and-a-dreamhost-style-assistant"></a>26 Oct 2026 · Nelson · experiment

    ### Panel top bar: search palette and a DreamHost-style assistant

    Harbor and Fluent, desktop ≥1025. Focusing the search pill opens a palette: Go to (the platform pages), Your courses (title matches, and search all), and Help with a "Powered by AI" label, where choosing a question asks the assistant. It is a combobox: arrows, Enter and Esc. The Assistant button opens the assistant window under itself: a white header (Assistant, New chat, close), "Hi {name}! Explore a topic or chat below", four topics (Your courses, Deadlines, Certificates, Using SkillUp) that open their questions, a pill input and the AI notice in a footer. In that layout the floating launcher is hidden and focus returns to the bar button. Other skins keep the floating chat. Not in the DS or the ICP. [prototype PR 359](https://github.com/nvjeronimo/skillup-lms-prototype/pull/359) (merged). Amended 26 Oct 2026: extended to every skin by [prototype PR 365](https://github.com/nvjeronimo/skillup-lms-prototype/pull/365); SKO, Gold and Studio show the pill from 1280 px. Later the same day: extended to the player, scoped to the course, and to a full-screen sheet where the pill does not fit ([prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369)); below 1536 px the pill rests compact at 240 px ([prototype PR 371](https://github.com/nvjeronimo/skillup-lms-prototype/pull/371)).
69. <a id="decision-2026-10-26-assistant-in-the-player-the-content-card-s-corner"></a>26 Oct 2026 · Nelson

    ### Assistant in the player: the content card's corner

    In the player the assistant launcher always sits bottom right of the content card, above Previous / Next; before, it covered the collapsed rail and the sidebar's last module. The content gets room at the bottom, so Mark as Complete scrolls clear of the launcher. Phones and the platform pages are unchanged. [prototype PR 358](https://github.com/nvjeronimo/skillup-lms-prototype/pull/358) (merged). Amended 26 Oct 2026: superseded by [prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369): there is no launcher, and the content's extra room at the bottom was removed too.
70. <a id="decision-2026-10-26-harbor-glance-after-the-remixer-banner"></a>26 Oct 2026 · Nelson · experiment

    ### Harbor glance after the Remixer banner

    In Harbor the "Your learning at a glance" block is a deep indigo-navy #181B31 in light and dark, with three thin concentric rings off the top right and soft blue and violet hazes from the existing blurred glow layers (no gradient fill); the title is white and the figures sit on their cards. It replaces the light-blue tray of [prototype PR 354](https://github.com/nvjeronimo/skillup-lms-prototype/pull/354), which had itself replaced #F0F0F0. Prototype only. [prototype PR 357](https://github.com/nvjeronimo/skillup-lms-prototype/pull/357) (merged). Amended 26 Oct 2026: the rings are now in SkillUp blues (no violet) and shared by every skin ([prototype PR 360](https://github.com/nvjeronimo/skillup-lms-prototype/pull/360), [prototype PR 361](https://github.com/nvjeronimo/skillup-lms-prototype/pull/361)).
71. <a id="decision-2026-10-26-panel-dashboard-pick-up-beside-due-jump-beside-stay-informed"></a>26 Oct 2026 · Nelson · experiment

    ### Panel dashboard: Pick up beside Due, Jump beside Stay informed

    Harbor and Fluent Dashboards: row 1 is Pick up where you left off beside Due this week (400 wide); row 2 is Jump somewhere beside Stay informed. Other skins unchanged. [prototype PR 356](https://github.com/nvjeronimo/skillup-lms-prototype/pull/356) (merged). Amended 26 Oct 2026: superseded by [prototype PR 364](https://github.com/nvjeronimo/skillup-lms-prototype/pull/364): Pick up beside Stay informed, Due this week beside Jump somewhere.
72. <a id="decision-2026-10-26-glance-trends-and-the-table-view-in-every-skin"></a>26 Oct 2026 · Nelson

    ### Glance trends and the table view in every skin

    The trend chips on the glance (MOCK: no API returns a figure's value 30 days ago) and My Learning's table view (Courses tab, tablet up) now show in every skin, not only Harbor and Fluent. The table thumb is square, 48 px. The rail toggle in the Harbor / Fluent top bar uses the ICP sidebar's own panel glyph instead of a hamburger. Same day: the glance figure card's context text has pb-2, in every skin ([prototype PR 354](https://github.com/nvjeronimo/skillup-lms-prototype/pull/354)). Not in the DS or the ICP. [prototype PR 355](https://github.com/nvjeronimo/skillup-lms-prototype/pull/355) (merged). Amended 26 Oct 2026: the Programs tab has a table view too ([prototype PR 367](https://github.com/nvjeronimo/skillup-lms-prototype/pull/367)).
73. <a id="decision-2026-10-26-preview-device-shows-a-real-viewport"></a>26 Oct 2026 · Nelson

    ### Preview device shows a real viewport

    The tablet / mobile preview is now an iframe of the same page at 834 / 375 px, because every layout answers to viewport media queries; before, it only narrowed a box and the platform pages stayed desktop. Inside the frame the page runs normally; its URL and title follow in the address bar; Tablet or Desktop chosen in the frame's own profile menu reach the window, and Desktop returns to the frame's page. [prototype PR 353](https://github.com/nvjeronimo/skillup-lms-prototype/pull/353) (merged).
74. <a id="decision-2026-10-25-fluent-a-sixth-brand-skin"></a>25 Oct 2026 · Nelson · experiment

    ### Fluent, a sixth brand skin

    A Microsoft Fluent 2 (web) direction, named Fluent: ?direction=fluent or Profile &gt; Brand skin. Open Sans stands in for Segoe UI (Nelson's choice); brand #0F6CBD (Fluent brand 80). Component shapes from the Fluent 2 web tokens: radii 4 controls / 8 cards / 12 surfaces; the secondary button white with Stroke1 #D1D1D1; fields with Stroke1 and an accessible bottom edge #616161; filters and view switches as a TabList (selected semibold over a 3px brand indicator, passes WCAG 1.4.11); cards white on a #F5F5F5 canvas with shadow 4, the glance without the dark band; the left rail and the Pick up list selected on #F0F0F0 with a 4 × 20 brand indicator; titles Semibold. Dark: canvas #141414, cards #292929, brand text #62ABF5. Fluent shares Harbor's panel layout (the rail, the top-bar search and the other panel patterns; Microsoft 365 has the same shell). axe WCAG 2.2 AA clean in light and dark on desktop and light on the phone. Not in the DS or the ICP. [prototype PR 352](https://github.com/nvjeronimo/skillup-lms-prototype/pull/352) (merged). Amended 26 Oct 2026: with Red removed, Fluent is the fifth skin ([prototype PR 363](https://github.com/nvjeronimo/skillup-lms-prototype/pull/363)). Its segmented controls are no longer a TabList: a track with the selected segment raised on white ([prototype PR 368](https://github.com/nvjeronimo/skillup-lms-prototype/pull/368)). The glance has a neutral tray ([prototype PR 367](https://github.com/nvjeronimo/skillup-lms-prototype/pull/367)). Fluent's colour modes are in the DS, unpublished.
75. <a id="decision-2026-10-25-brand-skin-selector-scrolls-sideways"></a>25 Oct 2026 · Nelson

    ### Brand skin selector scrolls sideways

    In the profile menu the Brand skin segmented control is one row that scrolls sideways (hidden scrollbar, every name in full), and the selected skin is scrolled into view. It replaces the rows of three. Every skin. [prototype PR 351](https://github.com/nvjeronimo/skillup-lms-prototype/pull/351) (merged).
76. <a id="decision-2026-10-25-module-boxes-in-harbor-too"></a>25 Oct 2026 · Nelson

    ### Module boxes in Harbor too

    Harbor gets Studio's player-sidebar module boxes: the list on bg/faint with 8 padding and gap, each module a white box with a 1px border/subtle and radius 8 (sidebar 16 − 8), its header without the grey band. [prototype PR 350](https://github.com/nvjeronimo/skillup-lms-prototype/pull/350) (merged).
77. <a id="decision-2026-10-25-harbor-selected-states-light-blue-no-borders"></a>25 Oct 2026 · Nelson

    ### Harbor selected states: light blue, no borders

    In Harbor the selected filters, the current rail and top-bar item and the selected Pick up item sit on bg/primary-soft #D9EAFC with semibold ink, with no ring and no border. Nelson chose it after trying a 1px ring and a solid blue. Known gap: #D9EAFC is 1.23:1 against the page, below the 3:1 of WCAG 1.4.11; the state is still exposed through aria-pressed / aria-current (see Open questions). Same PR: buttons that are a column never become pills in Harbor; the Pick up items and panel use radius 8 (16 card − 8 padding). [prototype PR 349](https://github.com/nvjeronimo/skillup-lms-prototype/pull/349) (merged). Amended 26 Oct 2026: for segmented controls superseded by [prototype PR 368](https://github.com/nvjeronimo/skillup-lms-prototype/pull/368): a track with the selected segment raised on white. The rail, the top-bar items and Pick up keep the light blue.
78. <a id="decision-2026-10-25-harbor-takes-seven-panel-patterns"></a>25 Oct 2026 · Nelson · experiment

    ### Harbor takes seven panel patterns

    Harbor skin only (?direction=harbor): (1) a search pill in the top bar with an Assistant button inside (desktop ≥1025; the search goes to My Learning, Assistant opens the chat on Ask); (2) a left icon rail (lg and up, collapsible, remembered); (3) a "Stay informed" card (Alerts · Updates · Support); (4) "Pick up where you left off" as a list and a detail panel; (5) a table view in My Learning (Courses tab, tablet up); (6) trend chips on the glance (MOCK: no API returns a figure's value 30 days ago); (7) a greeting tip with "Plan my week", which opens the assistant (MOCK on due dates). Tablet and phone keep the current navigation (no search pill). axe WCAG 2.2 AA clean. [prototype PR 348](https://github.com/nvjeronimo/skillup-lms-prototype/pull/348) (merged). Amended 26 Oct 2026: the trend chips and the table view are now in every skin ([prototype PR 355](https://github.com/nvjeronimo/skillup-lms-prototype/pull/355)); the Dashboard rows changed: Pick up beside Due this week, Jump somewhere beside Stay informed ([prototype PR 356](https://github.com/nvjeronimo/skillup-lms-prototype/pull/356)); the search pill opens a palette and the Assistant button a panel-style assistant under it ([prototype PR 359](https://github.com/nvjeronimo/skillup-lms-prototype/pull/359)); the Harbor glance is a navy block ([prototype PR 357](https://github.com/nvjeronimo/skillup-lms-prototype/pull/357)). Later the same day: the Dashboard rows changed again, Pick up beside Stay informed and Due beside Jump ([prototype PR 364](https://github.com/nvjeronimo/skillup-lms-prototype/pull/364)); the search pill and assistant reached every skin ([prototype PR 365](https://github.com/nvjeronimo/skillup-lms-prototype/pull/365)); the glance rings are in every skin ([prototype PR 360](https://github.com/nvjeronimo/skillup-lms-prototype/pull/360)–[prototype PR 362](https://github.com/nvjeronimo/skillup-lms-prototype/pull/362)). Amended 26 Oct 2026: pattern (1): since [prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369) the Assistant button opens the panel-style window under the bar, not the floating chat.
79. <a id="decision-2026-10-25-harbor-a-fifth-brand-skin"></a>25 Oct 2026 · Nelson · experiment

    ### Harbor, a fifth brand skin

    Nelson asked for a skin like a hosting control panel (DreamHost's), named Harbor, a neutral name because the prototype is public: ?direction=harbor or Profile &gt; Brand skin. Ink-black primary buttons with white text, blue links, icons and progress, zinc greys on a #f7f9fa ground, radius 12 controls / 16 cards / 20 bands; Plus Jakarta Sans and Figtree; Harbor Dark is a zinc night. On role tokens only, AA, no gradients, no third-party logos; axe WCAG 2.2 AA clean. Prototype only: not in the DS or the ICP. [prototype PR 347](https://github.com/nvjeronimo/skillup-lms-prototype/pull/347) (merged). Amended 26 Oct 2026: the Harbor glance is a deep indigo-navy block, #181B31 ([prototype PR 357](https://github.com/nvjeronimo/skillup-lms-prototype/pull/357)); with Red removed, Harbor is the fourth skin ([prototype PR 363](https://github.com/nvjeronimo/skillup-lms-prototype/pull/363)).
80. <a id="decision-2026-10-25-a-skin-change-always-lands"></a>25 Oct 2026 · Nelson

    ### A skin change always lands

    Studio sometimes did not switch on: the skin change waited for a View Transition callback that never ran. A 400 ms fallback now applies the skin anyway. [prototype PR 346](https://github.com/nvjeronimo/skillup-lms-prototype/pull/346) (merged 26 Oct 2026).
81. <a id="decision-2026-10-25-platform-page-tabs-larger"></a>25 Oct 2026 · Nelson

    ### Platform-page tabs larger

    Nelson asked twice for a bigger tab label. Tablet / desktop: headline-small / Semibold 24 (was body-large 16); mobile: title-large / Semibold 18 (was body-medium 14); panel tabs unchanged. [prototype PR 341](https://github.com/nvjeronimo/skillup-lms-prototype/pull/341) + [prototype PR 342](https://github.com/nvjeronimo/skillup-lms-prototype/pull/342) (merged). DS Horizontal tabs 1.2 adds Size=lg (desktop 24, Mobile breakpoint 18), published. ICP: 95 platform-page tab instances swapped to Size=lg (Ready for Dev 32, WIP 57, Lab 6). On phones the Course / Program tab rows scroll sideways. \_Tab button base: published 25 Oct (lg count-badge link). [docs PR 222](https://github.com/nvjeronimo/skillup-lms-prd/pull/222).
82. <a id="decision-2026-10-25-topic-header-meta-row-on-one-line"></a>25 Oct 2026 · Nelson

    ### Topic header meta row on one line

    Type · duration · Marked as completed stay on one line on phones; the duration ends in an ellipsis. [prototype PR 343](https://github.com/nvjeronimo/skillup-lms-prototype/pull/343) (merged). DS / ICP not changed.
83. <a id="decision-2026-10-25-studio-quiz-options-keep-a-20-radius-when-they-wrap"></a>25 Oct 2026 · Nelson

    ### Studio: quiz options keep a 20 radius when they wrap

    A wrapped option became a stadium; options now keep the control radius (20). [prototype PR 344](https://github.com/nvjeronimo/skillup-lms-prototype/pull/344) (merged).
84. <a id="decision-2026-10-25-audit-fixes-impeccable-session"></a>25 Oct 2026 · Nelson

    ### Audit fixes (Impeccable session)

    Studio heading-em #427482 (contrast), course search ARIA, reading measure 56ch (removed 27 Oct, decision 033), Calendar aside sticky; covers skipped (no source above 512×256). [prototype PR 345](https://github.com/nvjeronimo/skillup-lms-prototype/pull/345) (merged).
85. <a id="decision-2026-10-25-page-titles-sit-closer-to-what-they-head"></a>25 Oct 2026 · Nelson

    ### Page titles sit closer to what they head

    Nelson: less space from the page title to the first section (e.g. the My Learning filters), on every platform page. Title → first section is Layout/stack-gap (32); later sections keep Layout/section-gap (48/40/32). My Learning title → tabs is now ≈40 visible (was ≈80: the Sticky-Toolbar marker also added a gap, fixed). [Prototype PR 340](https://github.com/nvjeronimo/skillup-lms-prototype/pull/340) (merged). In the DS (Layout/stack-gap and section-gap descriptions; descriptions published 25 Oct) and the ICP: on desktop and tablet screens the title and the first section sit in a "Head" frame with Layout/stack-gap — 23 screens on the WIP page, 15 on Ready for Dev; phones need nothing (32 = 32). Edit profile desktop / tablet too: the Form stack is now on Layout/section-gap like the prototype (its sections were a raw 32 in the ICP, now 48 desktop / 40 tablet), with the title + first section in a Head on stack-gap. [Docs PR 219](https://github.com/nvjeronimo/skillup-lms-prd/pull/219) (decision 032 amendment).
86. <a id="decision-2026-10-25-player-the-profile-menu-opens-over-the-topic-body"></a>25 Oct 2026 · Nelson

    ### Player: the profile menu opens over the topic body

    The top bar's view-transition-name made it a stacking context, so the video, the sidebar and the footer painted over its menu. The player top bar now sits at z-30, as the platform top bar. [prototype PR 339](https://github.com/nvjeronimo/skillup-lms-prototype/pull/339) (merged).
87. <a id="decision-2026-10-25-platform-profile-menu-preview-device-loading"></a>25 Oct 2026 · Nelson

    ### Platform profile menu: Preview device + Loading

    The platform profile menu gets Preview device and Loading, in the same order as the player, sharing the stored choice. [prototype PR 337](https://github.com/nvjeronimo/skillup-lms-prototype/pull/337) (merged). Amended 26 Oct 2026: the Loading switch left the profile menu, platform and player ([prototype PR 367](https://github.com/nvjeronimo/skillup-lms-prototype/pull/367)). Amended 26 Oct 2026: the preview is a real viewport, an iframe at 834 / 375 ([prototype PR 353](https://github.com/nvjeronimo/skillup-lms-prototype/pull/353)).
88. <a id="decision-2026-10-25-studio-only-test-each-player-sidebar-module-in-its-own-box"></a>25 Oct 2026 · Nelson · Test

    ### Studio only (test): each player-sidebar module in its own box

    Test In the Studio skin only, each module of the player sidebar sits in its own box. Not in the DS or ICP yet. [Prototype PR 335](https://github.com/nvjeronimo/skillup-lms-prototype/pull/335) (merged). [PR 336](https://github.com/nvjeronimo/skillup-lms-prototype/pull/336) (merged): inside the module boxes the module header loses its grey band (white); the proposal's sticky header stays opaque. DS Sidebar 1.4 adds Expanded · boxed and Mobile · boxed (published); [ICP WIP frame 15 · Studio sidebar module boxes](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7812-94269) (node 7812:94269): Studio desktop (Expanded · boxed), Studio drawer (Mobile · boxed), SKO for comparison.
89. <a id="decision-2026-10-25-player-sidebar-header-condenses-on-scroll"></a>25 Oct 2026 · Nelson

    ### Player sidebar header condenses on scroll

    When the sidebar scrolls, its course header condenses: only the course name and Overall progress stay. DS Course-Header 1.1 (toggle beside the column, Show overline), published. ICP WIP frame [“14 · Sidebar header on scroll”](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7802-92815). [prototype PR 327](https://github.com/nvjeronimo/skillup-lms-prototype/pull/327).
90. <a id="decision-2026-10-25-phone-course-cards-cover-5-2"></a>25 Oct 2026 · Nelson

    ### Phone course cards: cover 5:2

    Course-Card 1.20, Layout=Grid on phones: the cover is 5:2, the 2:1 picture cropped, never stretched. Published; 22 ICP phone cards swapped (Impeccable session). [prototype PR 327](https://github.com/nvjeronimo/skillup-lms-prototype/pull/327), [docs PR 211](https://github.com/nvjeronimo/skillup-lms-prd/pull/211).
91. <a id="decision-2026-10-25-footer-1-4-one-divider-before-open-edx"></a>25 Oct 2026 · Nelson

    ### Footer 1.4: one divider, before Open edX

    The footer reads name · © 2026 SkillUp Online | Open edX; the only divider (1 px border/subtle) sits before the Open edX logo. DS published, [prototype PR 334](https://github.com/nvjeronimo/skillup-lms-prototype/pull/334), [docs PR 215](https://github.com/nvjeronimo/skillup-lms-prd/pull/215).
92. <a id="decision-2026-10-25-more-space-between-sections-columns-and-cards-decision-032"></a>25 Oct 2026 · Nelson

    ### More space between sections, columns and cards (decision 032)

    All skins, platform pages and the player. Eight DS tokens Layout/\* in “2. Responsive” (desktop / tablet / mobile): page-x 48/40/24, page-top 48/40/32, band-x 48/32/16, section-gap 48/40/32, column-gap 48/40/40, stack-gap 32, side-gap 24/24/32, grid-gap 32/24/24. Published. Player: sidebar ↔ content 24, topic blocks 32/24. ICP bound to the published Layout/\* tokens: 479 bindings on the WIP page and 282 on Ready for Dev (values unchanged); the course/program tab-content top and the Discussion list gap stay on Spacing steps (no token); Certificates and Edit profile tablet/mobile now have their Responsive mode. Closed (25 Oct): Today-at-a-glance 1.10 takes Layout/page-x for its side padding and Spacing/6xl (48) above and below ([prototype PR 338](https://github.com/nvjeronimo/skillup-lms-prototype/pull/338)); Course-Header 1.2 (platform) takes Layout/band-x on Tablet/Mobile; both published. Amended 25 Oct: the gap after a page title is stack-gap ([PR 340](https://github.com/nvjeronimo/skillup-lms-prototype/pull/340)). Audit 25 Oct (Nelson: keep Edit profile at 48/40, replicate everywhere): all 141 current ICP platform screens take their page-level spacing from Layout/\* — WIP 84, Ready for Dev 48, Lab third-party Course-detail 6, AI Assistant Dashboards 3; title Heads on stack-gap everywhere (Profile menu desktop and the 3 AI Assistant dashboards newly); Certificate page and Profile menu screens newly on tokens. Left on Spacing steps (no token): course/program tab-content top, certificate-page top (24), Discussion list ↔ conversation (24). History/source rows (61 screens) left as they were. DS: Sticky-Toolbar 1.1 side padding on Layout/page-x (was 40) — needs a publish. [Docs PR 220](https://github.com/nvjeronimo/skillup-lms-prd/pull/220) (audit script). [prototype PR 332](https://github.com/nvjeronimo/skillup-lms-prototype/pull/332), [prototype PR 333](https://github.com/nvjeronimo/skillup-lms-prototype/pull/333), [docs PR 213](https://github.com/nvjeronimo/skillup-lms-prd/pull/213).
93. <a id="decision-2026-10-25-studio-dark-cards-lifted-off-the-ground"></a>25 Oct 2026 · Nelson

    ### Studio Dark: cards lifted off the ground

    bg/page goes from #16191f to #20242d (1.23:1 against the ground, was 1.09:1); subtle, muted, strong and border-subtle move one step up. The progress track in Studio Dark is re-pointed so the fill keeps 3.5:1. DS published, [prototype PR 331](https://github.com/nvjeronimo/skillup-lms-prototype/pull/331).
94. <a id="decision-2026-10-25-motion-a-slower-softer-scale"></a>25 Oct 2026 · Nelson

    ### Motion: a slower, softer scale

    Everything felt too fast and abrupt, so the whole motion scale slows by about a third: short2 150, short3 200, short4 300, medium2 400, long2 600 ms (was 100 / 150 / 200 / 300 / 500), and standard-decelerate returns to the gentler cubic-bezier(0.2, 0.7, 0.2, 1). Changed at the source (Figma Motion collection, published 25 Oct) and flowed to the prototype through the token pipeline; every animation slows by the same ratio, reduced motion unchanged. Same PR: the player sidebar's course header folds its eyebrow and partner line in two beats (fade, then the row closes). [Prototype PR 329](https://github.com/nvjeronimo/skillup-lms-prototype/pull/329) merged; [docs PR 212](https://github.com/nvjeronimo/skillup-lms-prd/pull/212) (motion-matrix §8d, ADR 024 amendment). The Figma doc frame is updated (Motion · v1.4). ICP: nothing to accept — no ICP screen uses the Motion variables (they document the scale and feed the code; Figma does not animate with them), and the file shows no pending library update.
95. <a id="decision-2026-10-25-page-transitions-the-old-page-fades-out-while-the-new-one-fa"></a>25 Oct 2026 · Nelson

    ### Page transitions: the old page fades out while the new one fades in

    The old page used to vanish in one frame. Navigations now run inside a View Transition: the old page fades out (150 ms) while the new one fades in with a 4 px rise (300 ms); the top bars, the player sidebar and footer, the phone tab bar and the assistant launcher hold still. Link clicks to another page and the player's topic navigation use it; links that only change filters or tabs, back/forward, reduced motion and browsers without the API keep the previous fade. [Prototype PR 326](https://github.com/nvjeronimo/skillup-lms-prototype/pull/326) (merged).
96. <a id="decision-2026-10-25-sticky-toolbar-eases-in-and-out"></a>25 Oct 2026 · Nelson

    ### Sticky-Toolbar: eases in and out

    On My Learning and Calendar the toolbar's background and border fade in when it sticks, and the search folds away smoothly (motion tokens short / medium, standard easing; off with reduced motion). Second pass the same day: the ground now goes from clear to solid over the first 24 px scrolled past, so cards never pass under a see-through bar, and the search fades out first and only then its room closes (the reverse on the way back), on desktop and phone. Prototype [PR 321](https://github.com/nvjeronimo/skillup-lms-prototype/pull/321) and [PR 324](https://github.com/nvjeronimo/skillup-lms-prototype/pull/324) (merged).
97. <a id="decision-2026-10-25-synthetic-personas-switcher"></a>25 Oct 2026 · Nelson

    ### Synthetic personas switcher

    Profile menu → “Synthetic personas” opens a modal. Only one persona at a time (Nelson: “só podemos escolher uma persona de cada vez”): a radio list P01–P07, each with a short summary and its condition badges. Apply takes that persona's conditions (P06 → the mobile 375 preview; P07 → larger text, larger targets, underlined links, reduced motion; P04 → My Learning list view) and its learner data: name, initials, and progress on Dashboard, My Learning, the course and program pages and Certificates. Clear restores the previous settings. Gaps: Calendar / due counts and the player's topic progress do not follow the persona yet. [prototype PR 328](https://github.com/nvjeronimo/skillup-lms-prototype/pull/328) + [prototype PR 330](https://github.com/nvjeronimo/skillup-lms-prototype/pull/330) (merged). Earlier: in progress as a multiselect that combined the conditions.
98. <a id="decision-2026-10-25-phone-course-cards-on-my-learning-hug-their-title"></a>25 Oct 2026 · Nelson

    ### Phone course cards on My Learning hug their title

    Phone course cards on My Learning no longer reserve two title lines; equal heights only from 768 px up. No DS or ICP change needed: the DS Course-Card title already hugs (max 2 lines). [Prototype PR 325](https://github.com/nvjeronimo/skillup-lms-prototype/pull/325) (merged; Impeccable session).
99. <a id="decision-2026-10-25-the-dashboard-figures-are-links"></a>25 Oct 2026 · Nelson

    ### The Dashboard figures are links

    Each card of "Your learning at a glance" opens the list it counts. Courses and Programs open My Learning on In progress; Completed opens the completed courses; Certificates opens its page. No arrow. My Learning opens on a status from ?status=. [prototype PR 322](https://github.com/nvjeronimo/skillup-lms-prototype/pull/322), [docs PR 209](https://github.com/nvjeronimo/skillup-lms-prd/pull/209) (merged). DS: Today-at-a-glance 1.9 and Stat 1.4 published (descriptions only, no drawing change).
100. <a id="decision-2026-10-25-completed-sign"></a>25 Oct 2026 · Nelson

     ### Completed sign

     Completed = Badge Soft sm Success, no icon, on modules and the course/program Progress card; My Learning course and program cards keep check + word. Topics keep 'Marked as completed'. DS Module-Info 1.1 and Progress-Card 1.3 published. [prototype PR 320](https://github.com/nvjeronimo/skillup-lms-prototype/pull/320) and [prototype PR 323](https://github.com/nvjeronimo/skillup-lms-prototype/pull/323), [docs PR 208](https://github.com/nvjeronimo/skillup-lms-prd/pull/208) (merged) and [docs PR 210](https://github.com/nvjeronimo/skillup-lms-prd/pull/210) (merged).
101. <a id="decision-2026-10-24-course-journey-proposal-icp-sidebar-lab-promoted-27-oct"></a>24 Oct 2026 · Nelson · promoted 27 Oct

     ### Course Journey proposal (ICP sidebar) · Lab · promoted 27 Oct

     The ICP sidebar with every fix from the Impeccable critique of 24 Oct 2026 (score 27/40: 3 P1, 2 P2, plus minor issues). It runs in the real player behind a per-tab flag, and the default sidebar is unchanged. How to open: /lab/course-journey has "Open the proposal" (?journey=proposal) and "Open the current sidebar" (?journey=current), on the same course. What changes: (1) The assistant launcher moves to the bottom right of the content card and hides while another dialog is open. (2) "Module N of M" comes from the open topic, and the line says "Course completed" at 100%; the next topic gets an "Up next" tag. (3) Locks: each locked row shows "Unlocks after &lt;the topic before it&gt;" under the row; a fully locked module says it once under its header. (4) Sections, headings and ordered lists; the list is one tab stop (arrows, Home and End). (5) Only the module of the open topic is open, and completed modules close (Nelson's decision); module headers stay pinned at the top while their topics scroll; the current topic lands about a third of the way down. Minor: "Course journey" title on desktop; Label styles; "x of y topics" and "Completed"; lesson headings; the collapsed rail reads M2 / L1 for screen readers; meta lines wrap; one bookmark name. Status: awaiting Nelson's review. Lock text follows outline order (MOCK). DS done (properties off by default); ICP frame ["13 · Course Journey proposal (in review)"](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7778-101772), on the WIP platform page, right of "12 · Form modals"; it has 4 boards built from DS instances: Expanded (where am I / what's next), A locked module, Collapsed rail, Mobile drawer. [prototype PR 318](https://github.com/nvjeronimo/skillup-lms-prototype/pull/318) (merged).

     In the DS (25 Oct, published): Topic-Row 1.4 Show Up next, Show lock reason + Lock reason; Module-Header 1.1 Show lock note + Lock note; all off by default, no screen changes. The components are published; only the use of the new properties is a proposal. ICP frame ["13 · Course Journey proposal (in review)"](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7778-101772), on the WIP platform page, right of "12 · Form modals"; it has 4 boards built from DS instances: Expanded (where am I / what's next), A locked module, Collapsed rail, Mobile drawer.

     Refused by stakeholders (Nelson, 24 Oct): the In Progress ring on the open topic and the Jump to current topic button. Both are removed in [prototype PR 319](https://github.com/nvjeronimo/skillup-lms-prototype/pull/319) (merged).

     Amended 27 Oct 2026: promoted, no longer in review. Sidebar 1.5, Module-Info 1.2 and Course-Progression-Button 1.1 published; it is now the default Sidebar. ICP sweep done: 219 LMS Sidebar instances (Video 30, Quizzes 57, Reading 21, Lab 48, Activity 46, AI Assistant 4, WIP 13) show Up next after the open row, lock reasons on locked rows, "N of M topics", "Module i of N" and the overline; Course-Progression-Button Next-Topic-Complete on the 14 screens whose open topic is complete. WIP frame 7778:101772 renamed [13 · Course Journey (promoted 27 Oct, now the default Sidebar)](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7778-101772).
102. <a id="decision-2026-10-24-tabs-and-filters-stay-at-hand-on-my-learning-and-calendar"></a>24 Oct 2026 · Nelson

     ### Tabs and filters stay at hand on My Learning and Calendar

     Nelson asked for the tabs and filters to stay fixed on scroll, and said the search may hide. Once scrolled past, the bar sticks to the top of the window, on the page ground with a border/subtle rule under it. My Learning: the tabs, the status filter and Grid / List stick; while stuck, the search steps out unless it holds a query; on a phone the bar keeps only the tabs and the filter. Calendar: the kind filter and the Agenda / Month switch stick. New shared component StickyToolbar. [prototype PR 316](https://github.com/nvjeronimo/skillup-lms-prototype/pull/316) and [prototype PR 317](https://github.com/nvjeronimo/skillup-lms-prototype/pull/317) (merged). DS Sticky-Toolbar 1.0 (published). ICP: four 'scrolled, tabs stuck' screens on the WIP page, each under its original: My Learning courses desktop and mobile, Calendar desktop and mobile. Figma cannot prototype sticky inside a screen, so these screens show it.
103. <a id="decision-2026-10-24-overlay-panels-as-in-the-icp-service-row-deprecated"></a>24 Oct 2026 · Nelson

     ### Overlay panels as in the ICP; Service-Row deprecated

     Nelson preferred the ICP notifications panel ([7497:132529](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7497-132529)) and asked for it on every panel. Notifications, Saved and Discussions now share it: a bg/subtle body inset 16, white rows each closed by a border/subtle rule underneath, labels and tabs 24 in, 36 square icon tiles (Radius/control), and a quiet "Mark all read" text action ([prototype PR 311](https://github.com/nvjeronimo/skillup-lms-prototype/pull/311), [prototype PR 313](https://github.com/nvjeronimo/skillup-lms-prototype/pull/313), merged). ICP: the 8 older panel frames restyled the same way (Phase 1 · Overlay Panels ×6, WIP ×2); there is no Discussions panel in the ICP. DS: Thread-Item 1.2 and Discussion Prompt 1.2 become panel rows (no radius, no shadow, rule underneath only, 16/24), published. Service-Row is deprecated (Nelson): unused since PR 307; use Mentor-Card, Support-Card, Included-Card, Service-Link and Request-Row. Player top bar on phones: the profile avatar is centred in its 44 target ([prototype PR 314](https://github.com/nvjeronimo/skillup-lms-prototype/pull/314)). [docs PR 204](https://github.com/nvjeronimo/skillup-lms-prd/pull/204) (merged)
104. <a id="decision-2026-10-24-profile-menu-1-8-program-certificates-apart-on-the-certifica"></a>24 Oct 2026 · Nelson

     ### Profile Menu 1.8; program certificates apart on the Certificates page

     Profile Menu 1.8 published: the Profile section (Edit profile, Certificates) above Appearance ([prototype PR 315](https://github.com/nvjeronimo/skillup-lms-prototype/pull/315), [docs PR 205](https://github.com/nvjeronimo/skillup-lms-prd/pull/205) (merged)). Certificates page: program certificates apart from course certificates; "Program certificates · N" uses the DS Program-Certificate and "Course certificates · N" is the grid ([prototype PR 312](https://github.com/nvjeronimo/skillup-lms-prototype/pull/312), merged). ICP 05 · Certificates (4 screens) updated. Superseded 30 Oct 2026: program and course certificates now sit together, one card per program with its course certificates as compact rows ([prototype PR 428](https://github.com/nvjeronimo/skillup-lms-prototype/pull/428)).
105. <a id="decision-2026-10-23-footer-1-3-card-heights-link-buttons-as-in-the-ds"></a>23 Oct 2026 · Nelson

     ### Footer 1.3, card heights, Link Buttons as in the DS

     Footer 1.3: name | Open edX | copyright on the left (SkillUp name 61 × 18, a divider before the logo and before the copyright), the links alone on the right; on phones the links, then that row centred ([prototype PR 310](https://github.com/nvjeronimo/skillup-lms-prototype/pull/310)). Course-Card 1.19: Grid cards hug their content; an in-flow 2:1 "Cover space" reserves the cover's height, so the content starts 24 below it on desktop and 20 on tablet and phone, replacing the fixed 214 top padding and 560 minimum height that left an empty band under the cover on phones and above the button. ICP: the 148 Course-Row instances (41 Ready for Dev, 107 WIP) were swapped to 1.19; in desktop grid rows the cards stretch to the row with the buttons at the bottom, on tablet and phone they hug ([docs PR 202](https://github.com/nvjeronimo/skillup-lms-prd/pull/202) (merged)). Link Button size sm now matches the DS (26, body-small), and under "larger targets" the 44 is an invisible hit area, so the line stays 3 px under the label ([prototype PR 310](https://github.com/nvjeronimo/skillup-lms-prototype/pull/310)). The Services components are published: Mentor-Card and Support-Card (Organisms), Included-Card, Service-Link and Request-Row (Molecules), all 1.0. They are on the ICP 08 · Services screens (desktop, tablet, mobile), rebuilt from them; the Mentor-Card and Support-Card actions wrap on narrow cards (the ICP needed a swap by key after the publish) ([docs PR 203](https://github.com/nvjeronimo/skillup-lms-prd/pull/203) (merged)).
106. <a id="decision-2026-10-23-services-page-by-weight-studio-glance-on-phones-a-test-fix"></a>23 Oct 2026 · Nelson

     ### Services page by weight, Studio glance on phones, a test fix

     Services page reorganised by weight. Nelson, 23 Oct: "too confusing, too much on one level; what matters most must stand out". (1) Help now: Your mentor and Support (Write to us, help center, your open requests), as two cards. (2) Included with your program: CV review, Azure credits, IBM badge, each with its state and one action. (3) More from SkillUp: interview practice, job board, LinkedIn, sandbox, certificates, as quiet one-line links. [prototype PR 307](https://github.com/nvjeronimo/skillup-lms-prototype/pull/307) (merged). DS and ICP done (5 components, [docs PR 203](https://github.com/nvjeronimo/skillup-lms-prd/pull/203) (merged)). In Studio, the glance figure cards have radius 24 on phones (was 32; padding 12, nesting rule), 32 from tablet; Nelson asked for it ([prototype PR 309](https://github.com/nvjeronimo/skillup-lms-prototype/pull/309), merged). The motion test reads the Figma-generated tokens (the values moved there in PR 306); main is back to 317/317 ([prototype PR 308](https://github.com/nvjeronimo/skillup-lms-prototype/pull/308), merged). [prototype PR 306](https://github.com/nvjeronimo/skillup-lms-prototype/pull/306) (merged): Figma is the source of the token values. One click from the DS to the prototype and Storybook (figma-plugin/, scripts/tokens/build.mjs, tokens/generated/).
107. <a id="decision-2026-10-23-phone-spacing-on-every-platform-page"></a>23 Oct 2026 · Nelson

     ### Phone spacing on every platform page

     [prototype PR 305](https://github.com/nvjeronimo/skillup-lms-prototype/pull/305) (merged): on phones the sections sit 24 apart, stacked columns 32, side-column cards 24 (16 from tablet). ICP: the 17 mobile screens on the WIP platform page now use Spacing/5xl (24 in Mobile mode) between sections: Dashboard, My Learning ×3, Course Detail ×5, Program ×5, Calendar, Discussion, Services. [docs PR 200](https://github.com/nvjeronimo/skillup-lms-prd/pull/200) (merged)
108. <a id="decision-2026-10-23-footer-1-2-form-modals-in-the-ds-the-program-certificate"></a>23 Oct 2026 · Nelson

     ### Footer 1.2, form modals in the DS, the program certificate

     Nelson published the DS. Footer 1.2: the SkillUp name (monotone wordmark) and copyright on the left; links and the Open edX logo on the right, with dividers; the "Powered by" words removed (the logo's alt keeps them); on phones the links, then one row: name | copyright | Open edX ([prototype PR 301](https://github.com/nvjeronimo/skillup-lms-prototype/pull/301), [docs PR 196](https://github.com/nvjeronimo/skillup-lms-prd/pull/196) (merged), [docs PR 198](https://github.com/nvjeronimo/skillup-lms-prd/pull/198) (merged)). Form-Modal 1.0 is published in a new Overlays group (LMS Platform, Organism): one modal for every short form, Breakpoint Desktop / Mobile, the body a slot ([prototype PR 300](https://github.com/nvjeronimo/skillup-lms-prototype/pull/300)); the ICP frame "12 · Form modals" (7734:96450) stays in review. Program-Quick-View 1.1 adds What's included and stays in review, a proposal not for build; the ICP quick-view desktop screen was enlarged to fit it (1531 tall) ([prototype PR 302](https://github.com/nvjeronimo/skillup-lms-prototype/pull/302), [docs PR 197](https://github.com/nvjeronimo/skillup-lms-prd/pull/197) (merged)). The program certificate: a bigger card on the Program page's Certificates tab (ProgramCertificateHero, [prototype PR 303](https://github.com/nvjeronimo/skillup-lms-prototype/pull/303)): Program-Certificate 1.0, published and placed on the ICP.
109. <a id="decision-2026-10-23-form-modals-for-the-missing-actions"></a>23 Oct 2026 · Nelson

     ### Form modals for the missing actions

     [Prototype PR 300](https://github.com/nvjeronimo/skillup-lms-prototype/pull/300) (merged): seven form modals for the missing actions: Ask a question, New post, Report a message, Contact support, Book CV review / Interview, Edit weekly goal, Calendar sync. One FormModal shell. ICP: frame "12 · Form modals" ([7734:96450](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7734-96450)) on the WIP platform page, in review: the 7 modals on desktop and mobile, DS instances only.
110. <a id="decision-2026-10-23-compact-tab-bar-footer-1-1-the-ds-export-of-23-oct"></a>23 Oct 2026 · Nelson

     ### Compact tab bar, footer 1.1, the DS export of 23 Oct

     Tab-Bar 1.2 (published): compact, iOS style; only the current section shows its label beside the icon, the others are icon-only (44 minimum); the bar hugs its items, 280 × 52; radius by role in each skin, pills in Studio ([prototype PR 295](https://github.com/nvjeronimo/skillup-lms-prototype/pull/295), [prototype PR 296](https://github.com/nvjeronimo/skillup-lms-prototype/pull/296), [prototype PR 299](https://github.com/nvjeronimo/skillup-lms-prototype/pull/299)). Tab-Bar-Item 1.1: counts are Badge Soft sm Info, as Nelson found them unreadable on the current tab. Footer 1.1: links as Link Buttons (Brand, Secondary), Open edX logo 47 × 14, platform pages only, never the ICP screens ([prototype PR 298](https://github.com/nvjeronimo/skillup-lms-prototype/pull/298)). The 52 mobile platform screens in the ICP (Ready for Dev 17, WIP 35) now use the compact tab bar. Tokens: the DS export of 23 Oct is in the prototype ([prototype PR 297](https://github.com/nvjeronimo/skillup-lms-prototype/pull/297)): bg/warning-soft #fff2d4 and bg/warning-muted #fdd988 in SKO and Studio (Gold and Red keep the old values); Studio Light bg/inverse and border/strong #131720, icon/muted #3b4150, icon/subtle #545a68; Studio Dark border/strong #eef0f3. Duplicate bg/track and bg/hover deleted from the DS with Nelson's OK. The copies 23048:35 and 23048:36 had 0 bindings in the DS and in every ICP page. The kept copies are 23014:6477 and 23014:6478. Published 23 Oct. [docs PR 195](https://github.com/nvjeronimo/skillup-lms-prd/pull/195) (merged)
111. <a id="decision-2026-10-23-assistant-chat-1-4-a-tighter-phone-glance-the-greeting-on-on"></a>23 Oct 2026 · Nelson

     ### Assistant-Chat 1.4; a tighter phone glance; the greeting on one line

     Assistant-Chat 1.4 (published 23 Oct): a dark header with the mark in a 40 tile and Secondary Icon Buttons (New conversation in the conversation states, Close); Empty, First steps and First steps done greet in large type ("Hey John / How can we help?") and drop the title; the empty chat no longer repeats the hello; First steps is one compact card, "N of 5 done" over the bar, each row a step circle, a label and a Completed badge or the step's button ([prototype PR 291](https://github.com/nvjeronimo/skillup-lms-prototype/pull/291), [docs PR 189](https://github.com/nvjeronimo/skillup-lms-prd/pull/189)). The 9 ICP instances on the AI Assistant page are on the served variants; published 23 Oct. Today-at-a-glance 1.8 is published (23 Oct): on a phone the Stat cards are 156 wide and 12 apart, so the third peeks at 390; the 15 ICP glance instances are on 1.8 and every ICP Stat on Stat 1.3 ([docs PR 191](https://github.com/nvjeronimo/skillup-lms-prd/pull/191)). The Dashboard greeting "Good morning, John." stays on one line; 13 greeting texts fixed on WIP and Ready for Dev ([prototype PR 292](https://github.com/nvjeronimo/skillup-lms-prototype/pull/292)). Amended 26 Oct 2026: the floating chat is retired ([prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369)); Assistant-Chat is kept as reference.
112. <a id="decision-2026-10-23-the-glance-runs-edge-to-edge"></a>23 Oct 2026 · Nelson · experiment

     ### The glance runs edge to edge

     An experiment Nelson then kept. On the Dashboard, the "Your learning at a glance" section bleeds to the window edges on every device: the dark backdrop, the glow and the circles run edge to edge, with no radius and no border; the title and the cards stay on the page's content edges. On a phone the card row scrolls edge to edge and snaps to the 24 gutter. PlatformPage clips horizontal overflow, so no sideways scroll appears. [prototype PR 289](https://github.com/nvjeronimo/skillup-lms-prototype/pull/289) (merged). Nelson the same day: the DS and ICP follow — Today-at-a-glance 1.7 (no radius or border, side padding on Spacing/5xl like the page gutter; Desktop 1280 / Mobile 375) and the 15 ICP glance instances stretched to the screen edges — published 23 Oct, all 15 ICP glance instances on 1.7.
113. <a id="decision-2026-10-23-micro-footer-on-platform-pages-only"></a>23 Oct 2026 · Nelson

     ### Micro footer on platform pages only

     The platform pages (Dashboard, My Learning, Calendar, Discussion, Services, Certificates, Program, Course Detail…) end with a small footer; the ICP player gets none, it keeps only the content. It holds © 2026 SkillUp Online; Terms of use · Privacy · Cookie settings · Accessibility · Help center (SkillUp's own pages, no URLs yet); and "Powered by" with the Open edX logo, small (68 × 20). body-small on text/subtle, a border/subtle rule on top, in the 1200 column; one line on desktop, centred lines on phones (44-tall link targets), above the floating tab bar's room. Open edX MFEs already ship a footer slot (frontend-component-footer); this is its look. In the DS: [LMS/Platform/Navigation/Footer](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23327-407) 1.0 (published). [prototype PR 288](https://github.com/nvjeronimo/skillup-lms-prototype/pull/288) · [docs PR 185](https://github.com/nvjeronimo/skillup-lms-prd/pull/185)
114. <a id="decision-2026-10-23-ds-doc-pages-by-level"></a>23 Oct 2026 · Nelson

     ### DS doc pages by level

     The Navigation, My Learning and Dashboard DS group pages were rebuilt with properties and anatomy, and grouped by level. Navigation: Atoms Topbar-Item, Tab-Bar-Item, Tab-Bar-Menu-Item · Molecule Tab-Bar-Menu · Organisms Topbar, Tab-Bar, Footer. The levels are recorded in [ds-levels.json](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/tools/ds-levels.json) ([docs PR 186](https://github.com/nvjeronimo/skillup-lms-prd/pull/186)).
115. <a id="decision-2026-10-23-one-glow-on-the-glance-program-rows-stacked-on-tablet"></a>23 Oct 2026 · Nelson

     ### One glow on the glance; program rows stacked on tablet

     Today-at-a-glance 1.6 (published): one glow, the right one removed; Glow · top sits over the top edge on Desktop and low on the left on Mobile (x −124, y 60); circles stay at 19%; in Studio the glow and the two circles now show. All 12 ICP glances (9 WIP, 3 Ready for Dev) have the single glow ([prototype PR 281](https://github.com/nvjeronimo/skillup-lms-prototype/pull/281), [docs PR 178](https://github.com/nvjeronimo/skillup-lms-prd/pull/178)). Amended 23 Oct 2026: the backdrop now runs edge to edge (prototype PR 289; DS 1.7 published, ICP updated). Resume-Row (Nelson's DS edit): the cover is 140 tall across the top, the content 16 under it, 20 at the sides and 16 at the bottom; not 2:1, Nelson's exception to the 2:1 rule for card pictures ([prototype PR 283](https://github.com/nvjeronimo/skillup-lms-prototype/pull/283)). Course-Card 1.17 (published) adds Layout=List stacked for tablet lists: the progress above the Up next / Certificate box in one Status column, height hugging from 146. Course-Row (Program Detail) 1.1 (published) adds Breakpoint=Tablet (912) with the card on List stacked. On the program page the rows are a Desktop list from lg, Tablet stacked md–lg, a Compact grid below md ([prototype PR 285](https://github.com/nvjeronimo/skillup-lms-prototype/pull/285), [docs PR 179](https://github.com/nvjeronimo/skillup-lms-prd/pull/179), [docs PR 181](https://github.com/nvjeronimo/skillup-lms-prd/pull/181)). ICP: 21 tablet Course-Rows (14 Platform WIP, 7 Ready for Dev) swapped to Breakpoint=Tablet; the completed "Digital Marketing Fundamentals" rows are State=Completed; Nelson's first row on 04 · Program Detail restored after the swap reset it. Course pictures are 2:1 (Course-Card 1.18: Grid covers aspect-locked 2:1, List covers unlocked; the Impeccable session's pass, [prototype PR 284](https://github.com/nvjeronimo/skillup-lms-prototype/pull/284)); the exceptions are the Program-Card tile, the Discovery Course-Row cover (square, 96 × 96, Course-Row 1.4, in review at the time, published later on 23 Oct; 36 ICP rows show it) and the Resume-Row (140 tall). My Learning's Grid / List toggle now shows from md up; phones stay on the grid ([prototype PR 286](https://github.com/nvjeronimo/skillup-lms-prototype/pull/286)). The Program quick view proposal is drawn in the ICP on Platform Pages WIP, 02 · My Learning ([7703:84097](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7703-84097)): 08b Desktop modal and 11b Mobile full screen ([prototype PR 290](https://github.com/nvjeronimo/skillup-lms-prototype/pull/290)). All merged.
116. <a id="decision-2026-10-23-video-topic-no-jump-on-scroll-the-transcript-follows-the-vid"></a>23 Oct 2026 · Nelson

     ### Video topic: no jump on scroll; the transcript follows the video

     Scrolling down docks the video, and from tablet up the band shrinks (about 416 → 188). The browser's scroll anchoring pulled the page back up, so the video undocked, grew again, and the page jumped. Now the player body has no scroll anchoring, and docking has hysteresis: it docks past 8 px and undocks only at the very top. While docked, a spacer gives back the lost height, so the scroll range does not shrink under the finger. While the video plays and the learner is not scrolling (the 8 s pause after wheel, touch or keys stays), the active transcript line stays in the readable part, below the docked player, a third of the way down; "Sync to video" does the same. [prototype PR 280](https://github.com/nvjeronimo/skillup-lms-prototype/pull/280) (merged; done by the "Prototype + Design System review" session)
117. <a id="decision-2026-10-23-link-buttons-have-no-fill-on-hover"></a>23 Oct 2026 · Nelson

     ### Link buttons have no fill on hover

     Seven hand-built link buttons (Add Note ×2, Download transcript, Download all resources, the video footer link, and the side panels' header and footer links: "Mark all read", "View all notifications") used a grey fill on hover. They now use the DS Link Button hover: the text goes to text/on-primary-soft, the line and the icon to icon/default, with no fill. bg/faint is only the keyboard-focus state. [prototype PR 279](https://github.com/nvjeronimo/skillup-lms-prototype/pull/279) (merged)
118. <a id="decision-2026-10-23-phones-get-a-floating-tab-bar-dashboard-my-learning-calendar"></a>23 Oct 2026 · Nelson

     ### Phones get a floating tab bar: Dashboard · My Learning · Calendar · More

     Answered: on phones the platform pages have a floating tab bar with Dashboard, My Learning, Calendar and More. More opens a panel with Discussion, Services and any later section, and More is the current item on those pages. The label is the full "My Learning", and any label may end with an ellipsis. The assistant launcher sits beside the bar, on the same line. The bar slides away when the learner scrolls down and comes back on scroll up, at the top and at the end of the page, and on keyboard focus; never while More is open; under reduced motion it fades. Radius by role (decision 028) in every skin: the bar on Radius/track, the items on control, the More panel on card with 4 padding, its rows on card-inset; in Studio they are pills and the panel is 36 with 8 padding. Tablet and desktop are unchanged. In the DS: Tab-Bar 1.1, Tab-Bar-Item 1.0, and the new Tab-Bar-Menu and Tab-Bar-Menu-Item 1.0, all published ([Figma](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23279-329)). [prototype PR 259](https://github.com/nvjeronimo/skillup-lms-prototype/pull/259) · [prototype PR 277](https://github.com/nvjeronimo/skillup-lms-prototype/pull/277) · [docs PR 176](https://github.com/nvjeronimo/skillup-lms-prd/pull/176) (all merged). ICP: the 51 Tab-Bar instances are on 1.1, 287 wide, More current on Discussion and Services (done 23 Oct by the Impeccable session). Amended 26 Oct 2026: the assistant launcher no longer sits beside the tab bar ([prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369)); on a phone the assistant opens from the search button in the compact top bar.
119. <a id="decision-031"></a>23 Oct 2026 · Nelson

     ### 031 · A topic's content stops at Container/content-max-width (1200)

     In the player a topic's content is at most 1200 wide, centred: the same as the platform pages' max-w-[1200px]. From tablet up the video player keeps the full panel width at min(50dvh, 16:9 of its width), docking only when the learner scrolls to the transcript; phones keep 16:9. In the DS the token is Container/content-max-width, on a new primitive Numeric/300 (1,200px). The ICP Video page players are 450 tall on desktop and 333 on tablet. [prototype PR 258](https://github.com/nvjeronimo/skillup-lms-prototype/pull/258) · [prototype PR 273](https://github.com/nvjeronimo/skillup-lms-prototype/pull/273) · [docs PR 173](https://github.com/nvjeronimo/skillup-lms-prd/pull/173) (all merged). Amended 23 Oct 2026: the dock no longer jumps ([PR 280](https://github.com/nvjeronimo/skillup-lms-prototype/pull/280); see "Video topic: no jump on scroll; the transcript follows the video").
120. <a id="decision-2026-10-23-calendar-filters-side-by-side"></a>23 Oct 2026 · Nelson

     ### Calendar filters side by side

     On the Calendar the kind filter and the Agenda / Month switch sit side by side on every breakpoint. Below md, Agenda and Month are icons only (44 × 44, still named "Agenda" and "Month" for screen readers); from md up, icon and label. [prototype PR 278](https://github.com/nvjeronimo/skillup-lms-prototype/pull/278) (merged)
121. <a id="decision-2026-10-23-calendar-month-view-on-phones-partner-badge-1-4"></a>23 Oct 2026 · Nelson

     ### Calendar Month view on phones; Partner badge 1.4

     Calendar, in the prototype: the View switch now shows on phones, with a compact Month view. Each day shows its number and one dot per kind of date (deadline, live, course dates); today is filled and the picked day sits on bg/primary-soft. Tapping a day lists its dates under the grid with the Agenda rows ("Nothing on this day." when it is empty). Day buttons are 44 × 48; axe finds 0 violations at 375. Tablet and desktop keep the full grid. No DS component, and no Figma screen for it yet ([prototype PR 275](https://github.com/nvjeronimo/skillup-lms-prototype/pull/275)). Provider-Partner-Badge 1.4 (published 23 Oct): the logo chip padding is Spacing/md (8) on every side, 32 px tall with the 16 px logo (was 28), border/subtle and Radius/control unchanged; all 403 logo chips in the ICP are 32 tall (278 Platform WIP, 125 Ready for Dev) ([prototype PR 276](https://github.com/nvjeronimo/skillup-lms-prototype/pull/276), [docs PR 175](https://github.com/nvjeronimo/skillup-lms-prd/pull/175), [docs PR 177](https://github.com/nvjeronimo/skillup-lms-prd/pull/177)). All merged.
122. <a id="decision-2026-10-22-studio-replaces-sea-as-the-fourth-brand-skin"></a>22 Oct 2026 · Nelson · experiment

     ### Studio replaces Sea as the fourth brand skin

     The brand skins are now SKO, Gold, Red and Studio. Studio is an experimental whole-platform direction, taken from humanacademy.ai: Inter Tight, a cool grey ground, borderless cards on a soft shadow, a deep-teal primary (#044150), pills for buttons and fields, and a floating Resume bar on the Dashboard; light and dark. Built in [prototype PR 256](https://github.com/nvjeronimo/skillup-lms-prototype/pull/256). Studio takes Sea's place in the profile menu picker, and a saved Sea or Studio choice moves to Studio ([prototype PR 262](https://github.com/nvjeronimo/skillup-lms-prototype/pull/262)). The Sea skin is removed from the prototype; it stays in git history, and decision 027 was only a proposal. Studio radius and Studio Dark ([prototype PR 270](https://github.com/nvjeronimo/skillup-lms-prototype/pull/270)): the radius follows the nesting rule (inner + padding = outer, decision 028) built around the pill. Buttons and fields are pills everywhere; card radius = padding + 20 (card 36, surface 40, control 20, card-inset 32, track pill). Studio Dark is a cool neutral night: ground #0d0f13, surfaces #16191f, text #eef0f3, an aqua primary #8fd0e0 with dark text; every contrast is AA. Also in [prototype PR 270](https://github.com/nvjeronimo/skillup-lms-prototype/pull/270): the glance title, unreadable in every dark theme on text/on-primary, is on text/on-media in the prototype too (the DS fix is in [docs PR 171](https://github.com/nvjeronimo/skillup-lms-prd/pull/171); see "Due-Item 1.2 published; the glance title on text/on-media"). Studio is prototype-only: no DS tokens yet (a new token needs Nelson's approval). All merged. Amended 23 Oct 2026: DS 🎨 SKO-Semantics has Studio Light / Studio Dark modes (28 Studio primitives, decision 030, [docs PR 173](https://github.com/nvjeronimo/skillup-lms-prd/pull/173)); the font stays Montserrat there until Inter Tight is available in Figma; Studio radius stays prototype-only. The floating Resume bar on the Dashboard was removed ([prototype PR 274](https://github.com/nvjeronimo/skillup-lms-prototype/pull/274), merged). Amended 25 Oct 2026: Harbor and Fluent joined as the fifth and sixth skins, prototype only (SKO · Gold · Red · Studio · Harbor · Fluent; prototype PRs 347, 352). Amended 26 Oct 2026: Red was removed; five skins, SKO · Gold · Studio · Harbor · Fluent ([prototype PR 363](https://github.com/nvjeronimo/skillup-lms-prototype/pull/363)).
123. <a id="decision-2026-10-22-due-item-1-2-published-the-glance-title-on-text-on-media"></a>22 Oct 2026 · Nelson

     ### Due-Item 1.2 published; the glance title on text/on-media

     Due-Item 1.2 is published and accepted in the ICP: all 24 instances (18 Platform WIP, 6 Ready for Dev) have the badge in the title row. Today-at-a-glance 1.5, same version: the title is text/on-media (white in every mode), not text/on-primary, which is #0e1a1f in every Dark mode and vanished on the #044150 backdrop (found by the Impeccable session; [prototype PR 270](https://github.com/nvjeronimo/skillup-lms-prototype/pull/270) does the same, merged). All 12 ICP glance instances are updated, their stale Stat texts reset to the DS content. [docs PR 171](https://github.com/nvjeronimo/skillup-lms-prd/pull/171) (merged). Amended 23 Oct 2026: the backdrop now runs edge to edge (prototype PR 289; DS 1.7 published, ICP updated).
124. <a id="decision-2026-10-22-assistant-sparkles-slower-spins-that-read-as-turns"></a>22 Oct 2026 · Nelson

     ### Assistant sparkles: slower spins that read as turns

     The stars ran but did not seem to move: 2–3 turns in 500 ms on a strong ease-out moved a four-point star up to ~200° a frame, and it repeats every 90°, so the eye saw a flicker. Now 2 turns in 1.5 s (big and small) and 3 turns in 2 s (medium), standard easing, at most ~25° a frame; same independent cycles (12 / 15 / 19 s), paused while the window is open, still under reduced motion. [prototype PR 269](https://github.com/nvjeronimo/skillup-lms-prototype/pull/269) merged. Amended 26 Oct 2026: the floating launcher is retired ([prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369)); these spins are kept as reference, behind ?assistant=floating.
125. <a id="decision-2026-10-22-course-journey-uppercase-program-footers-the-glance-dark-aga"></a>22 Oct 2026 · Nelson

     ### Course Journey, uppercase program footers, the glance dark again, Due-Item 1.2 in review

     Sidebar 1.3 (published): "Course menu" becomes Course Journey, the mobile drawer title, with "Open Course Journey" and "Close Course Journey" on the player Topbar button ([prototype PR 263](https://github.com/nvjeronimo/skillup-lms-prototype/pull/263)); no ICP screen shows the drawer title. Program-Card 1.14 (published): the footer labels Up next and Certificate issued are uppercase, as the Course-Card overlines; 11 Up next labels on Platform WIP updated ([prototype PR 264](https://github.com/nvjeronimo/skillup-lms-prototype/pull/264), both with [docs PR 168](https://github.com/nvjeronimo/skillup-lms-prd/pull/168)). Today-at-a-glance 1.5 (published): dark again, as Nelson drew it on the ICP Dashboard (7495:71629): Backdrop bg/info-soft pinned to SKO Dark (#044150, no new token), two blurred border/info-soft glows, circles at 19%, the title on text/on-media (white in every mode; corrected 22 Oct), light Stat cards with value and detail on one line; Programs "1 · in progress of 3 enrolled" and "1 not started", Certificates "ready to download" ([prototype PR 267](https://github.com/nvjeronimo/skillup-lms-prototype/pull/267), [docs PR 169](https://github.com/nvjeronimo/skillup-lms-prd/pull/169)). Due-Item 1.2 (in review at the time, published later on 22 Oct): the Status badge in the title row, the meta full width, the date centred ([prototype PR 268](https://github.com/nvjeronimo/skillup-lms-prototype/pull/268), [docs PR 170](https://github.com/nvjeronimo/skillup-lms-prd/pull/170)). All PRs merged. Amended 23 Oct 2026: the backdrop now runs edge to edge (prototype PR 289; DS 1.7 published, ICP updated).
126. <a id="decision-2026-10-22-assistant-launcher-a-polished-metal-ring-with-a-running-glin"></a>22 Oct 2026 · Nelson

     ### Assistant launcher: a polished metal ring with a running glint

     From Nelson's reference (a metallic Send button Figma riff): the launcher's 2px blue ring becomes a 3px polished-metal ring, shaded from the top left in SkillUp blue (from ice, #c8ecff, through the logo blues to deep teal, #044150; holds its edge on a white page), with a white glint with an ice-blue edge that runs once round it (standard easing) and rests, every 3.6 s. It runs only while first steps are left; reduced motion holds it still. The ring stays the one gradient the brand allows. [prototype PR 266](https://github.com/nvjeronimo/skillup-lms-prototype/pull/266) merged; In the DS as Assistant-Launcher v1.4 (published 22 Oct). Amended 26 Oct 2026: the floating launcher is retired ([prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369)); the ring is kept as reference, behind ?assistant=floating.
127. <a id="decision-2026-10-22-course-covers-zoom-softly-on-hover"></a>22 Oct 2026 · Nelson

     ### Course covers zoom softly on hover

     Course covers zoom softly on card hover: the picture eases to 1.02 over long2 (500 ms, standard) and back over medium2 (300 ms); only on devices that hover; still under reduced motion. Fixes a zoom that jumped in one frame (the load fade's transition dropped the transform). [prototype PR 261](https://github.com/nvjeronimo/skillup-lms-prototype/pull/261) (merged)
128. <a id="decision-2026-10-22-a-closed-collapse-adds-no-blank-space"></a>22 Oct 2026 · Nelson

     ### A closed collapse adds no blank space

     A closed collapse no longer leaves blank space under the page (seen on My Learning on phones). [prototype PR 260](https://github.com/nvjeronimo/skillup-lms-prototype/pull/260) merged.
129. <a id="decision-2026-10-22-phones-get-a-floating-tab-bar-on-the-platform-pages"></a>22 Oct 2026 · Nelson

     ### Phones get a floating tab bar on the platform pages

     On a phone the platform pages get an app-like floating tab bar: Dashboard, My Learning (shown as "Learning"), Calendar, Discussion and Services. Tablet and desktop are unchanged. Prototype only; three points are open for Nelson (see Open questions). [prototype PR 259](https://github.com/nvjeronimo/skillup-lms-prototype/pull/259) merged. Amended 23 Oct 2026: answered; see the entry above (Dashboard · My Learning · Calendar · More, the full "My Learning" label, the launcher beside the bar, Discussion and Services under More). Amended 26 Oct 2026: the assistant launcher no longer sits beside the tab bar ([prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369)); on a phone the assistant opens from the search button in the compact top bar.
130. <a id="decision-2026-10-22-topic-content-is-at-most-50rem-wide-the-video-keeps-its-widt"></a>22 Oct 2026 · Nelson

     ### Topic content is at most 50rem wide; the video keeps its width

     In the player the topic content is at most 50rem (800) wide, centred. The video player keeps the full panel width at min(50dvh, 16:9 of its width) and shrinks only when the learner scrolls to the transcript. Open: a DS token, Container/content-max-width, needs Nelson's approval; the ICP screens are not updated yet. [prototype PR 258](https://github.com/nvjeronimo/skillup-lms-prototype/pull/258) merged. Amended 23 Oct 2026: 1200, as the platform pages (decision 031); the token is in the DS and the ICP Video players are updated (see "031 · A topic's content stops at Container/content-max-width (1200)").
131. <a id="decision-2026-10-22-large-course-pictures-on-cards-and-module-rows"></a>22 Oct 2026 · Nelson

     ### Large course pictures on cards and module rows

     The course picture is large on the course cards (grid: a 16:9 cover across the top; list: the cover down the left) and on the "Module …" rows: Dashboard Pick up, Course-Row and Resume-Row. A module has no picture in Open edX, so the row uses its course's picture. The partner logo chips on the cards sit on white. In the prototype: [prototype PR 257](https://github.com/nvjeronimo/skillup-lms-prototype/pull/257). DS published 22 Oct: Course-Card 1.16, Course-Row 1.3 (cover 160 on the left; hidden on the 466-wide two-column Dashboard rows, where it does not fit) and Resume-Row 1.3 (cover 140 on top). ICP: the 12 prototype covers are uploaded to a source frame ([7649:114533](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7649-114533), on the Platform Pages WIP page) and set on 190 instances: 148 cards, 30 Course-Rows and 12 Resume-Rows. [docs PR 167](https://github.com/nvjeronimo/skillup-lms-prd/pull/167) merged.
132. <a id="decision-2026-10-22-content-tabs-stay-tabs-on-phones"></a>22 Oct 2026 · Nelson

     ### Content tabs stay tabs on phones

     In the ICP player the content tabs stay tabs on a phone: no dropdown. [prototype PR 257](https://github.com/nvjeronimo/skillup-lms-prototype/pull/257) merged.
133. <a id="decision-2026-10-22-apple-design-pass"></a>22 Oct 2026 · Nelson

     ### Apple-design pass

     Press feedback on link cards; drag-to-dismiss on the sheets (Assistant, Course search, the mobile drawers, Overlay panel); a rem type ramp; a theme cross-fade; prefers-contrast and reduced-transparency rules. In the prototype: [prototype PR 253](https://github.com/nvjeronimo/skillup-lms-prototype/pull/253) (merged). [docs PR 165](https://github.com/nvjeronimo/skillup-lms-prd/pull/165) is still open, not merged.
134. <a id="decision-2026-10-22-motion-pass-after-emil-kowalski-s-review"></a>22 Oct 2026 · Nelson

     ### Motion pass after Emil Kowalski's review

     Hover only where the device has hover; a strong ease-out in and out; menus can be interrupted; the quiz mark grows from half size. In the DS Motion collection easing/standard-decelerate is now cubic-bezier(0.23, 1, 0.32, 1) and easing/standard-accelerate is marked unused. [prototype PR 252](https://github.com/nvjeronimo/skillup-lms-prototype/pull/252) · [docs PR 164](https://github.com/nvjeronimo/skillup-lms-prd/pull/164) (both merged)
135. <a id="decision-2026-10-22-ora-stepper-1-2-partner-badge-1-3-q-a-badges-in-sentence-cas"></a>22 Oct 2026 · Nelson

     ### ORA-Stepper 1.2, Partner badge 1.3, Q&A badges in sentence case

     ORA-Stepper 1.2 (published): completed steps are a green check and a green label on bg/page, with no green tint; the current step on bg/primary-soft is the only coloured segment; upcoming steps on bg/faint; the Response current-segment fill fixed; 15 instances updated on Topic Content Types ([prototype PR 254](https://github.com/nvjeronimo/skillup-lms-prototype/pull/254), which also adds Size=Compact below sm and the peer label from the review quota, "Review 1 peer"; [docs PR 166](https://github.com/nvjeronimo/skillup-lms-prd/pull/166)). Provider-Partner-Badge 1.3 (published): the logo chip has a 1 px border/subtle outline and Radius/control (6), still 28 px tall; the Cybersecurity Fundamentals Certificate partner is SkillUp, 15 program cards fixed in the ICP ([prototype PR 249](https://github.com/nvjeronimo/skillup-lms-prototype/pull/249), [docs PR 163](https://github.com/nvjeronimo/skillup-lms-prd/pull/163)). Discussion and Q&A badges read in sentence case: Question, Discussion, Answered, Following, Accepted answer, Staff ([prototype PR 251](https://github.com/nvjeronimo/skillup-lms-prototype/pull/251); 171 badge texts on Platform Ready and WIP). All merged.
136. <a id="decision-2026-10-22-times-read-12-h-with-your-time"></a>22 Oct 2026 · Nelson

     ### Times read 12 h with "your time"

     Nelson's answer: every time the learner reads is on the 12-hour clock followed by "your time" (for example 11:59 PM · your time), across the prototype. The Dashboard due items show it first: Due-Item 1.1. [prototype PR 245](https://github.com/nvjeronimo/skillup-lms-prototype/pull/245)
137. <a id="decision-2026-10-22-dashboard-glance-one-card-per-figure-with-a-goal"></a>22 Oct 2026 · Nelson

     ### Dashboard glance: one card per figure with a goal

     The Dashboard glance card shows one card per figure, Programs second, each with a goal badge, from real data only. Nelson first kept it dark, then made it light the same day (Today-at-a-glance 1.4, published and accepted 22 Oct): a bg/primary-soft card with a border/primary-muted outline, the figures on bg/page cards with Shadows/shadow-card, labels Courses / Programs / Completed / Certificates, details on two lines, and goals "3 due this week" (Warning) · "1 of 3 completed" · "32% completed" ([prototype PR 244](https://github.com/nvjeronimo/skillup-lms-prototype/pull/244)). The trend arrows first proposed (green up, red down) were dropped: Nelson confirmed the DS glance as his, with goal badges only. Amended 26 Oct 2026: the prototype shows trend chips on the glance in every skin, marked MOCK ([prototype PR 355](https://github.com/nvjeronimo/skillup-lms-prototype/pull/355)); the DS glance keeps goal badges only. In the DS: Stat 1.2 (new Theme=Card with Trend and Goal badges, booleans Show trend / Show goal; the trend badge is not used on the Dashboard) and Today-at-a-glance 1.3, published 22 Oct and republished the same day with the desktop cards filling their grid columns. The prototype follows the DS v1.3 ([prototype PR 243](https://github.com/nvjeronimo/skillup-lms-prototype/pull/243)). ICP checked by the Impeccable session after Nelson's re-accept: all 12 Today-at-a-glance instances fill their columns (desktop 270, tablet 199, mobile 174), in the order In progress · Programs · Completed · Certificates, with short labels on mobile. [prototype PR 242](https://github.com/nvjeronimo/skillup-lms-prototype/pull/242) · [docs PR 157](https://github.com/nvjeronimo/skillup-lms-prd/pull/157) · [docs PR 158](https://github.com/nvjeronimo/skillup-lms-prd/pull/158) · [docs PR 160](https://github.com/nvjeronimo/skillup-lms-prd/pull/160) · [docs PR 161](https://github.com/nvjeronimo/skillup-lms-prd/pull/161) (all merged 22 Oct). Amended 23 Oct 2026: the backdrop now runs edge to edge (prototype PR 289; DS 1.7 published, ICP updated). Amended 28 Oct 2026: the goal "3 due this week" is an example only today (no due dates are configured, decision 036).
138. <a id="decision-2026-10-21-certificates-page-tabs-search-and-grid-list"></a>21 Oct 2026 · Nelson

     ### Certificates page: tabs, search and Grid / List

     The Certificates page moves from two stacked sections to two tabs, In progress and Earned, with a search and a Grid / List toggle, as My Learning. In the ICP the new screens are the WIP cards 05, 05b, 05c and 05d; the old row stays at the bottom, marked SUPERSEDED. [prototype PR 241](https://github.com/nvjeronimo/skillup-lms-prototype/pull/241) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6207-245582) Superseded 30 Oct 2026: the tabs stay, but the Grid / List toggle is removed and each program is one card with its course certificates as compact rows ([prototype PR 428](https://github.com/nvjeronimo/skillup-lms-prototype/pull/428)).
139. <a id="decision-2026-10-21-pages-arrive-skeletons-sections-in-order-numbers-that-count"></a>21 Oct 2026 · Nelson

     ### Pages arrive: skeletons, sections in order, numbers that count

     The first time a learner opens a page in a session, it now arrives as one short story: a skeleton in the page's real shape for about half a second (as a real connection would show), then the sections in reading order, then the numbers, bars and rings counting up from zero. Later visits in the same session show the page at once. It covers every platform page and, in the course player, the topic body; the course ring sweeps once per course. Course covers fade in when they load and Copy link turns into a check. Nothing waits on the animation: everything is clickable as soon as it shows, and with reduced motion the skeleton is still and the numbers appear at their value. For review, the demo menu switches the loading to Off or Slow (2 s). The top bar shadow on scroll was not built: the platform top bar is not sticky. The Skeleton is now a design system component too ([LMS / Skeleton](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23184-386) v1.0, published 21 Oct). [prototype PRs 236](https://github.com/nvjeronimo/skillup-lms-prototype/pull/236), [237](https://github.com/nvjeronimo/skillup-lms-prototype/pull/237), [238](https://github.com/nvjeronimo/skillup-lms-prototype/pull/238) · [spec §7.9](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/motion-matrix.md)
140. <a id="decision-2026-10-21-square-corners-an-experiment-in-the-profile-menu"></a>21 Oct 2026 · Nelson · experiment

     ### Square corners, an experiment in the profile menu

     A "Square corners" switch in the profile menu, under the brand skins, removes every corner radius except on buttons, to compare the product with square corners. Prototype only; the DS radius roles (decision 028) are unchanged. [prototype PR 231](https://github.com/nvjeronimo/skillup-lms-prototype/pull/231)
141. <a id="decision-2026-10-21-audit-answers"></a>21 Oct 2026 · Nelson

     ### Audit answers

     Nelson's answers to the open points of the prototype audit. On a phone the glance card is one line of four (Stat 1.1 Inverse compact, Today-at-a-glance 1.2). The Python sandbox exists: the Business Analytics lab opens it first. US spelling everywhere: the prototype is done ([prototype PR 230](https://github.com/nvjeronimo/skillup-lms-prototype/pull/230)); the DS and ICP Figma spelling pass is done too and shipped with the 21 Oct DS publish ([docs PR 150](https://github.com/nvjeronimo/skillup-lms-prd/pull/150)). The prose width stays as drawn. [prototype PR 229](https://github.com/nvjeronimo/skillup-lms-prototype/pull/229) · [audit report](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/04-research/prototype-audit-2026-10-21.md)
142. <a id="decision-029"></a>21 Oct 2026 · Nelson

     ### 029 · Prototype audit decisions

     The decisions taken after the prototype audit, as amended by docs PR 141. The phone player top bar: the menu and the progress ring on the left, the wordmark centred, Saved, avatar and Close on the right, no notifications; on a phone the theme switch is in the profile menu. Demo mode: ?demo=1 shows the prototype notes and the demo controls. Mentorship Q&A is private to the learner and the mentor; Discussion is the cohort forum. Program sequencing is unchanged. A graded quiz shows the answer only after the last attempt. Sign out is in the profile menu, in a group of its own, with its icon on icon/error (Profile Menu 1.7). The sample data has one "today": Sat 24 Oct 2026. [decision 029](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/029-audit-decisions-2026-10-21.md) · [docs PR 140](https://github.com/nvjeronimo/skillup-lms-prd/pull/140) · [docs PR 141](https://github.com/nvjeronimo/skillup-lms-prd/pull/141)
143. <a id="decision-2026-10-21-videos-and-podcasts-complete-themselves-at-90"></a>21 Oct 2026 · Nelson

     ### Videos and podcasts complete themselves at 90%

     In the prototype a video or a podcast now completes by itself once 90% of it has actually been played, adding up across visits; jumping to the end does not count (BR-01). The completion then shows as for a reading: the badge, the check in the sidebar, the course ring and the toast. A video whose playback is measured has no Mark as Complete button and Next does not ask; the button and the question stay only for media that cannot be measured. For testing, the demo menu has Mark 85% watched. [prototype PR 234](https://github.com/nvjeronimo/skillup-lms-prototype/pull/234)
144. <a id="decision-2026-10-21-the-assistant-s-sparkles-turn-now-and-then"></a>21 Oct 2026 · Nelson

     ### The assistant's sparkles turn now and then

     The three sparkles under the paper plane on the assistant's floating button each spin fast on their own rhythm (every 12, 15 and 19 seconds): two full turns for the big and the small star, three for the medium one, in half a second, settling at the end, so they rarely move together. They pause while the chat is open and stay still with reduced motion. The stars are separate layers in the design system component too. Answered the same day (Nelson): the code is right, 2 / 3 / 2 full turns in a fast 500 ms spin on 12 / 15 / 19 s cycles, not the quarter turn (90°) the motion-matrix row said; the row is fixed in [docs PR 155](https://github.com/nvjeronimo/skillup-lms-prd/pull/155) (merged 21 Oct). [prototype PR 232](https://github.com/nvjeronimo/skillup-lms-prototype/pull/232) · [Figma](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22493-224) · [prototype PR 235](https://github.com/nvjeronimo/skillup-lms-prototype/pull/235) Amended 26 Oct 2026: the floating launcher is retired ([prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369)); these turns are kept as reference, behind ?assistant=floating.
145. <a id="decision-2026-10-21-sea-skin-refined"></a>21 Oct 2026 · Nelson · proposed

     ### Sea skin refined

     Still a proposal (decision 027), in the prototype only. Cards lose their borders and sit on a soft deep-teal drop shadow ([prototype PR 218](https://github.com/nvjeronimo/skillup-lms-prototype/pull/218)). No gradients: by the brand rule a gradient is off-brand everywhere, and the assistant's metal ring with a running glint (22 Oct) is the one exception. AA fixes on the deep-teal bands: subtle text at #acd5f4 ([prototype PR 219](https://github.com/nvjeronimo/skillup-lms-prototype/pull/219)); the glance card circles are back, flat at 12% ([prototype PR 220](https://github.com/nvjeronimo/skillup-lms-prototype/pull/220)); the bar and the bands use teal muted fills ([prototype PR 221](https://github.com/nvjeronimo/skillup-lms-prototype/pull/221)). All merged 21 Oct. Since 22 Oct the glance card stays light in Sea, and the player's top bar takes the Sea chrome, prototype only ([prototype PR 246](https://github.com/nvjeronimo/skillup-lms-prototype/pull/246)). [Decision 027](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/027-sea-brand-skin.md). Amended 22 Oct 2026: Studio replaced Sea and the Sea skin was removed from the prototype (prototype PR 262; see "Studio replaces Sea as the fourth brand skin").
146. <a id="decision-2026-10-21-prototype-audit-fixes-and-one-sample-timeline"></a>21 Oct 2026 · Nelson

     ### Prototype audit fixes and one sample timeline

     The prototype audit fixes are in: topic links, graded answers, sign out and more ([prototype PR 214](https://github.com/nvjeronimo/skillup-lms-prototype/pull/214)); the audit and decision 029 are written up in [docs PR 140](https://github.com/nvjeronimo/skillup-lms-prd/pull/140). The sample data now follows one timeline: dates, deadlines, the mentor and the hours agree across pages ([prototype PR 215](https://github.com/nvjeronimo/skillup-lms-prototype/pull/215)). Audit P2: no desktop flash on a phone player, and clearance for the assistant launcher ([prototype PR 228](https://github.com/nvjeronimo/skillup-lms-prototype/pull/228)). The phone glance card (Today-at-a-glance) in one line of four, and the Python sandbox in the lab ([prototype PR 229](https://github.com/nvjeronimo/skillup-lms-prototype/pull/229)). Every user-facing string in the prototype is in US spelling ([prototype PR 230](https://github.com/nvjeronimo/skillup-lms-prototype/pull/230)). All merged 21 Oct.
147. <a id="decision-2026-10-21-final-motion-audit"></a>21 Oct 2026 · Nelson

     ### Final motion audit

     An independent audit of the prototype found nothing that opens from a button without motion. What was left changed in one frame inside pages: tab panels, the quiz hint, the Q&A filter, the player sidebar, alerts, the transcript pill, captions and input focus. All of them now ease, with no animation on first paint. Stylesheets are now checked for hand-typed durations too. One exception stays: the docked video still animates its height. [prototype PR 227](https://github.com/nvjeronimo/skillup-lms-prototype/pull/227)
148. <a id="decision-2026-10-21-platform-pages-accessibility-pass-ds-select-and-44-px-target"></a>21 Oct 2026 · Nelson

     ### Platform pages: accessibility pass, DS Select and 44 px targets

     axe-core 4.10 (WCAG 2.1 AA) finds 0 violations and no horizontal scroll on the nine platform pages (Dashboard, My Learning, Calendar, Discussion, Services, Certificates, Edit profile, program page, course page) at 375 and 1280, light and dark; the profile menu's accessibility settings (text size, colour-blind states, reduce motion, underline links, larger targets) apply on platform pages. Every platform select is the DS Select: a native select with the DS chevron-down 20 on icon/faint and a 14 inset, like the Input field; the learner's avatar on Edit profile is the rounded square (Radius/control), in the prototype and in the ICP Edit profile screens ([prototype PR 222](https://github.com/nvjeronimo/skillup-lms-prototype/pull/222)). Targets are 44 px: the Dashboard *Due this week* and Calendar rows are clickable as a whole, the Report band is 44 tall, and the Services action links are at least 24 on desktop ([prototype PR 225](https://github.com/nvjeronimo/skillup-lms-prototype/pull/225)). All merged 21 Oct.
149. <a id="decision-2026-10-21-menus-and-popovers-open-and-close-smoothly"></a>21 Oct 2026 · Nelson

     ### Menus and popovers open and close smoothly

     Menus, popovers, share panels, the collapsed-rail card, the course search and the Program FAQ still opened and closed in one frame: they had never adopted the motion system. They now grow out of the button that opened them and leave back into it; on a phone the search sheet rises from the bottom. New menus built on the shared disclosure hook animate by default, and a lint rule flags one that does not. Also fixed: Escape on the phone search sheet no longer reopens it. [prototype PR 223](https://github.com/nvjeronimo/skillup-lms-prototype/pull/223)
150. <a id="decision-2026-10-21-phone-player-bar-and-the-menu-on-the-left"></a>21 Oct 2026 · Nelson

     ### Phone player bar and the menu on the left

     Decision 029 §1 amended. The phone player bar has three equal columns: the course menu and the progress ring on the left, the SkillUp wordmark centred, and Bookmark, avatar and Close on the right; no bell and no theme button on a phone (the theme switch is the Profile Menu's Dark theme row). The platform bar's Compact menu moves to the left of the logo, as the player's course menu. The progress ring is the Progress circle at 32 with the % inside. Answered the same day (Nelson): on a phone the profile menu scrolls inside its card (max height = screen − 88), so Sign out is never cut; the prototype already did, and the ICP Mobile 375 screen "Profile menu open · Platform · Mobile 375" now uses a scroll-area frame ([docs PR 143](https://github.com/nvjeronimo/skillup-lms-prd/pull/143)). Decision 029 §2 amended: Reset demo and Restart first steps are back in the profile menu without ?demo=1, for testing the AI assistant ([prototype PR 224](https://github.com/nvjeronimo/skillup-lms-prototype/pull/224), merged). [prototype PR 216](https://github.com/nvjeronimo/skillup-lms-prototype/pull/216) · [prototype PR 217](https://github.com/nvjeronimo/skillup-lms-prototype/pull/217) · [docs PR 141](https://github.com/nvjeronimo/skillup-lms-prd/pull/141) · [docs PR 142](https://github.com/nvjeronimo/skillup-lms-prd/pull/142)
151. <a id="decision-028"></a>20 Oct 2026 · Nelson

     ### 028 · Corner radius by role

     Eight DS tokens: Radius/none 0 · inner 2 · control 6 · card-inset 8 · track 10 · card 12 · surface 16 · pill. Controls are at 6 (Nelson). Nesting rule: inner radius + padding = outer radius (a menu at 12 with 4 padding has rows at 8). The Button group stays as Nelson set it (segments 6, track 10). Radius/flex-\* is deleted (no uses); Radius/fixed-\* is kept for the Mobile App. In the prototype: PRs 209, 211 and 212 (tokens/radius.css, lint rule raw-radius). DS published 20 Oct. [decision 028](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/028-radius-roles.md) · [PR 209](https://github.com/nvjeronimo/skillup-lms-prototype/pull/209) · [PR 211](https://github.com/nvjeronimo/skillup-lms-prototype/pull/211) · [PR 212](https://github.com/nvjeronimo/skillup-lms-prototype/pull/212) · [docs PR 139](https://github.com/nvjeronimo/skillup-lms-prd/pull/139)
152. <a id="decision-2026-10-20-bg-track-and-bg-hover-role-tokens"></a>20 Oct 2026 · Nelson

     ### bg/track and bg/hover role tokens

     Bruno reported that the progress bar failed the contrast rule: the bg/info fill on the bg/strong track was 2.26:1, and WCAG 1.4.11 asks 3:1. Two new colour role tokens, both aliases of bg/muted in every mode (no hex change): bg/track for progress and segmented-control tracks (the fill is now 3.21:1, dark 3.06:1) and bg/hover for the neutral hover of icon and tertiary buttons. Swapping the bg/subtle and bg/muted hexes was rejected: bg/subtle has 112 uses in the prototype. [prototype PR 213](https://github.com/nvjeronimo/skillup-lms-prototype/pull/213) · [docs PR 138](https://github.com/nvjeronimo/skillup-lms-prd/pull/138)
153. <a id="decision-2026-10-20-hover-contrast-and-concentric-corners"></a>20 Oct 2026 · Nelson

     ### Hover contrast and concentric corners

     Neutral icon and tertiary hovers move off bg/faint (almost invisible) to bg/hover, a role alias of bg/muted (see the entry 'bg/track and bg/hover role tokens'); the DS Hover states of Utility Button, Icon Button and Button were rebound and published on 20 Oct. [prototype PR 210](https://github.com/nvjeronimo/skillup-lms-prototype/pull/210)

     Rule: a nested element's corner radius is the parent's radius minus the padding between them (outer 24, padding 8 → inner 16; never below 0). The radius-role work is applying it: DS Radius/\* roles and the prototype's tokens/radius.css ([prototype PR 209](https://github.com/nvjeronimo/skillup-lms-prototype/pull/209)). The learner avatar radius is now 6 (Radius/control) instead of Radius/fixed-md; Nelson OK.
154. <a id="decision-2026-10-20-platform-pages-by-flow"></a>20 Oct 2026 · Nelson

     ### Platform pages by flow

     The ICP page "↳ Plaftorm Pages - WIP" now holds every platform page in the learner's flow, one frame per page, left to right: 01 Dashboard, 02 My Learning, 03 Course Detail, 04 Program Detail, 05 Certificates, 06 Calendar, 07 Discussion, 08 Services, 09 Notifications, 10 Profile menu and 11 Edit profile. 01 to 04 and 06 to 08 are copies of the Ready for Dev handoff cards, which stay the handoff; 05 and 09 to 11 are in review. Everything else on that page moved to a "Reference & history, not current" band below. New screens, in review: the Notifications panel on the platform pages (desktop, tablet, mobile), Certificates on tablet (the list and one certificate), Edit profile on tablet, and the passed course on Course Detail (Course tab, desktop, tablet and mobile: 100% Completed, Passed 88%, certificate earned). [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6207-245582) · [docs PR 137](https://github.com/nvjeronimo/skillup-lms-prd/pull/137)
155. <a id="decision-2026-10-20-share-a-certificate"></a>20 Oct 2026 · Nelson

     ### Share a certificate

     A certificate can be shared: Share certificate on the certificate page, and an icon-only Share after View and Download on every earned card (Certificate-Card 1.1). Both open the new Share-Menu: Add to LinkedIn profile, Share to LinkedIn, X, Facebook, Copy link and Email. [prototype PR 206](https://github.com/nvjeronimo/skillup-lms-prototype/pull/206) · [docs PR 135](https://github.com/nvjeronimo/skillup-lms-prd/pull/135)
156. <a id="decision-2026-10-19-sea-a-livelier-brand-skin-from-the-skillup-foundation-colour"></a>19 Oct 2026 · Nelson · proposed

     ### Sea, a livelier brand skin from the SkillUp foundation colours

     Proposed. A fourth skin beside SKO, Gold and Red, live in the prototype (profile menu → Sea, prototype PRs 199, 200 and 203): a deep-teal top bar (#044150) with the yellow spark (#F9C654) on the current page and the avatar; the dark bands (glance card, Program header, Program-Card hero, mentor cards) in a deep-teal gradient (flat since 21 Oct: no gradients, see "Sea skin refined"); page headings in text/primary. Progress, the completion green, the player and AA contrast are unchanged. [Decision 027](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/027-sea-brand-skin.md); the proposals are compared in [skin-proposals-2026-10-19](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/rationale/skin-proposals-2026-10-19.html) (first called Maré). [docs PR 133](https://github.com/nvjeronimo/skillup-lms-prd/pull/133). Amended 22 Oct 2026: Sea was not adopted; Studio took its place as the fourth skin (prototype PR 262).
157. <a id="decision-2026-10-19-certificates-page"></a>19 Oct 2026 · Nelson

     ### Certificates page

     A new platform page, /platform/certificates, shows the certificates earned (the DS Certificate-Card) and those in progress (programs and courses started, with a link to their course or program certificate page); it is reached from the Dashboard Certificates tile, Services and the profile menu (Profile Menu 1.4), and the one-certificate page is now drawn too. [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7461-34887) · [prototype PR 201](https://github.com/nvjeronimo/skillup-lms-prototype/pull/201) · [docs PR 130](https://github.com/nvjeronimo/skillup-lms-prd/pull/130)
158. <a id="decision-2026-10-19-profile-menu-1-3-an-edit-profile-page-and-the-bell-opens-not"></a>19 Oct 2026 · Nelson

     ### Profile menu 1.3, an Edit profile page, and the bell opens Notifications

     The profile menu (LMS / Profile Menu 1.3, published) has no learner header: Edit profile is at the top, and SkillUp Online (skillup.online, in a new tab) is its own group after Accessibility standards, before the demo footer. Edit profile opens a new platform page, /platform/profile, with two sections: Your profile and Account, on the Open edX learner profile and account settings (prototype PR 198, merged; Figma, in review). On the platform pages the top bar bell now opens the Notifications panel, the same panel as in the player (prototype PR 197, merged). [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7453-34440) · [PR 198](https://github.com/nvjeronimo/skillup-lms-prototype/pull/198) · [PR 197](https://github.com/nvjeronimo/skillup-lms-prototype/pull/197)
159. <a id="decision-2026-10-19-the-last-motion-details"></a>19 Oct 2026 · Nelson

     ### The last motion details

     The eight details left from the motion plan are built in the prototype (PR 195): buttons press, bookmarks fill and swell once, tab underlines slide, the transcript follows only when the line leaves view, a locked topic shows which topic to complete first instead of shaking, the footer number fades, the live dot pulses and the certificate reveals with the one emphasized curve. One behaviour change: a locked topic row no longer opens the locked-topic page. [prototype PR 195](https://github.com/nvjeronimo/skillup-lms-prototype/pull/195)
160. <a id="decision-2026-10-19-scorm-plays-in-the-page-by-default"></a>19 Oct 2026 · Nelson

     ### SCORM plays in the page by default

     SCORM: plays in the page by default (new window per course); completion and score come from the package (Next asks if it never reports); on a phone a notice with Open anyway; course packages get our sidebar collapsed and Fullscreen first. [activity-scorm](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/activity-scorm.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7428-1069) · [docs PR 124](https://github.com/nvjeronimo/skillup-lms-prd/pull/124)
161. <a id="decision-2026-10-19-lab-no-opened-state-for-now-how-this-lab-works-and-the-autho"></a>19 Oct 2026 · Nelson

     ### Lab: no Opened state for now; How this lab works and the author hidden

     SkillUp cannot tell whether the learner selected the launch button (Komal), so the Opened state of a partner lab is not for now: the launch card stays Ready, the launch button stays primary and Mark as Complete secondary, and Before you start (with This lab needs a computer on tablet and mobile) stays until the topic is completed. The six Opened cards stay on the page, faded, as the future design; the lab inside the page, with no launch card, keeps Mark as Complete primary. How this lab works and the author row are hidden on every Lab screen: we have no way to show the steps, and we do not show the author. [lab-third-party-platforms](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6789-326)
162. <a id="decision-2026-10-19-calendar-discussion-and-services-approved-and-drawn-in-figma"></a>19 Oct 2026 · Nelson

     ### Calendar, Discussion and Services approved and drawn in Figma

     Nelson approved the three proposal pages of 17 Oct, and they are drawn in Figma on the Ready for Dev page (frame 7392:200778, in progress). Calendar is Agenda by default, with a Month view on desktop and tablet; on mobile it is Agenda only. Amended 23 Oct 2026: phones have a compact Month view too (prototype PR 275), and the Agenda / Month switch sits beside the kind filter on every breakpoint (prototype PR 278). Discussion is the course Q&A layout across all courses. Services is the mentor first, then Career, Support, and Benefits and tools. [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7392-200778) · [docs PR 120](https://github.com/nvjeronimo/skillup-lms-prd/pull/120)
163. <a id="decision-2026-10-17-calendar-discussion-and-services-become-proposal-pages"></a>17 Oct 2026 · Nelson

     ### Calendar, Discussion and Services become proposal pages

     Nelson chose what Services holds: mentoring, career, support, and benefits and tools. The Calendar also shows live sessions, marked as out of the MVP. The three are built as real pages in the prototype first and drawn in Figma after approval. Open edX has no calendar or forum across courses, so both pages merge one call per enrolled course (the Dates API, the Discussions API). The top bar's Calendar count is the number of deadlines in the next seven days. Amended 28 Oct 2026: deadlines are examples only today (no due dates are configured, decision 036), so the count would hold live sessions only. [prototype PR 187](https://github.com/nvjeronimo/skillup-lms-prototype/pull/187) · [Calendar](https://lms-prototype-mu.vercel.app/platform/calendar) · [Discussion](https://lms-prototype-mu.vercel.app/platform/discussion) · [Services](https://lms-prototype-mu.vercel.app/platform/services)
164. <a id="decision-2026-10-17-an-alert-on-a-grey-surface-is-white"></a>17 Oct 2026 · Nelson

     ### An alert on a grey surface is white

     An alert placed on a grey surface (bg/subtle) is white (bg/page): Inline Alert Surface=Subtle. [prototype PR 189](https://github.com/nvjeronimo/skillup-lms-prototype/pull/189) · [docs PR 118](https://github.com/nvjeronimo/skillup-lms-prd/pull/118)
165. <a id="decision-2026-10-17-the-light-dark-switch-is-in-the-top-bar"></a>17 Oct 2026 · Nelson

     ### The light / dark switch is in the top bar

     The light / dark switch is in the top bar of the platform pages and the player, on every breakpoint; the profile menu keeps the brand skin only. [prototype PR 184](https://github.com/nvjeronimo/skillup-lms-prototype/pull/184) · [docs PR 116](https://github.com/nvjeronimo/skillup-lms-prd/pull/116)
166. <a id="decision-2026-10-17-due-badges-on-cards-use-badge-soft-warning"></a>17 Oct 2026 · Nelson

     ### Due badges on cards use Badge Soft · Warning

     Due badges on cards use Badge Soft · Warning. [prototype PR 183](https://github.com/nvjeronimo/skillup-lms-prototype/pull/183) · [docs PR 115](https://github.com/nvjeronimo/skillup-lms-prd/pull/115)
167. <a id="decision-2026-10-16-completed-program-or-course-the-header-progress-card-is-gree"></a>16 Oct 2026 · Nelson

     ### Completed program or course: the header Progress card is green like the cards

     Completed program or course: the header Progress card is green like the cards (bar bg/success + check icon + "Completed"; green never alone). [prototype PR 182](https://github.com/nvjeronimo/skillup-lms-prototype/pull/182) · [docs PR 114](https://github.com/nvjeronimo/skillup-lms-prd/pull/114)
168. <a id="decision-2026-10-16-profile-menu-the-same-on-the-platform-pages-and-in-the-playe"></a>16 Oct 2026 · Nelson

     ### Profile menu: the same on the platform pages and in the player

     One profile menu (LMS / Profile Menu, published) for the platform pages and the player. Only three brand skins exist: SKO, Gold and Red; Ink, Sky and Violet were removed because they have no tokens. Amended 22 Oct 2026: a fourth skin, Studio, is in the prototype only (no tokens yet). Amended 23 Oct 2026: the DS has Studio Light / Studio Dark modes (decision 030). Amended 25 Oct 2026: six skins, SKO · Gold · Red · Studio · Harbor · Fluent; Harbor and Fluent are prototype-only (prototype PRs 347, 352). Amended 26 Oct 2026: Red was removed; five skins, SKO · Gold · Studio · Harbor · Fluent ([prototype PR 363](https://github.com/nvjeronimo/skillup-lms-prototype/pull/363)). The player adds its preview sections between Accessibility standards and the footer. [prototype PR 181](https://github.com/nvjeronimo/skillup-lms-prototype/pull/181) · [docs PR 112](https://github.com/nvjeronimo/skillup-lms-prd/pull/112)
169. <a id="decision-2026-10-16-partner-badge-1-2-a-data-analytics-program-page-old-prototyp"></a>16 Oct 2026 · Nelson

     ### Partner badge 1.2, a Data Analytics program page, old prototype PRs settled

     Provider-Partner-Badge 1.2: the logo chip padding is on Spacing/sm (6), so the chip is 28 px tall, and FutureSkills Dark now reads on the dark chip with the same bitmap and image filters. All 128 partner badges in the product file (102 in Course-Cards, 52 in 26 Program-Cards) are on 1.2 and 28 px tall. In the prototype, Data Analytics Foundations has a program page (PR 176), so the completed program card opens its details, and its certificates show both partners, IBM and Microsoft, with a sample second signatory (PR 177). Old prototype PRs are settled: #52 ("Draft saved" is a status) merged; #55, #56 and #57 (September lab explorations) and #161 (the side-stripe comparison, decided 14–15 Oct) closed with a note, their branches kept. Docs PRs 107 and 108. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
170. <a id="decision-2026-10-16-cards-and-partner-logos-content-padding-token"></a>16 Oct 2026 · Nelson

     ### Cards and partner logos; content padding token

     Provider-Partner-Badge 1.1 has Type=Text/Logo, with the logos Nelson added, and a new Theme=Light/Dark for dark surfaces such as the Program-Card hero; FutureSkills only has a dark bitmap, so its Dark variant keeps the light chip until the partner sends a light artwork. Fixed later the same day (see the entry above). Course-Card 1.11: the provider shows as its logo, a course can have a second partner, and the next-topic title gets the full width, up to 2 lines. Program-Card 1.10: the hero partner logos are Provider-Partner-Badge instances, and the 26 Program-Cards on the screens now show a picture (the AI program its own cover, Cybersecurity and Data Analytics placeholder covers). Transcript-Line 1.1 takes its side padding from the new token Container/content-padding (24 / 20 / 16, aliases of Spacing/3xl), [decision 026](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/026-content-padding-token.md), which is bound on the ICP topic screens: Reading 21, Lab 48, Topic Content Types 19, Quiz 66 by block, Video 30 and AI Assistant 4. Published and accepted in the product file: 102 Course-Cards on 1.11 and 26 Program-Cards on 1.10. Prototype PRs 171 (merged), 173, 174 and 175, and 176 (merged), which adds a Data Analytics program page so the completed program card opens its details. Docs PR 107. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
171. <a id="decision-2026-10-15-every-component-set-has-a-16-px-padding-spacing-xl"></a>15 Oct 2026 · Nelson

     ### Every component set has a 16 px padding (Spacing/xl)

     Nelson's rule of 15 Oct: every component set on the organised design system pages has a 16 px padding, as in his example, Difficulty-Badge. Applied to all 168 sets: the 83 sets in auto layout have their four paddings bound to Spacing/xl; the 85 sets arranged by hand (no auto layout, mostly Base) got a 16 px margin by moving their variants and resizing the set. The gaps between variants and the 34 standalone components were not touched, and no variant, property or instance changed. tools/ds-group-page.js now binds this padding whenever it rebuilds a page. Docs PR 104. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
172. <a id="decision-2026-10-15-course-card-moves-to-my-learning-link-button-1-2-three-side"></a>15 Oct 2026 · Nelson

     ### Course-Card moves to My Learning; Link Button 1.2; three side stripes replaced

     Course-Card left the Discovery page for the My Learning page and is now LMS/Platform/My-Learning/Course-Card (was LMS/Platform/Discovery/Course-Card): same node and key, so instances and overrides are untouched. It is at 1.8 after the review of the My Learning cards in their three states: State=Not started, Resume as the only Primary action, a new Grid header and a green certificate strip; Program-Card is at 1.6. Link Button 1.2: hover has no fill, the label and its 1px line darken, the line uses the icon token of its tone, and Focused sits on bg/faint with radius 6 (prototype PR 166). The three DS components with a coloured side stripe lost it: Live-Now-Banner 1.1 (Live on bg/success-soft, Upcoming on the new token bg/warning-muted), Lesson-Block 1.1 (the blockquote is a typographic pull quote) and LMS / Inline Alert 1.1 (Tone=Answer draws its top rule like Success and Error). Docs PR 101. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
173. <a id="decision-2026-10-15-navigation-notes-in-figma-the-test-build-note-moves-to-a-foo"></a>15 Oct 2026 · Nelson

     ### Navigation notes in Figma; the test-build note moves to a footer

     On the Platform Pages - Ready for Dev page, the desktop screens of the Dashboard, My Learning · Courses and Program · Courses each carry one LMS / Footnote dev note (Dev Notes and Purpose). The notes give the card-click rule of 10 Oct (the whole card opens the page, the button opens the player) and decision 025 with its three kept exceptions; the My Learning note also says how to filter program courses out of Learner Home. In the prototype ([PR 165](https://github.com/nvjeronimo/skillup-lms-prototype/pull/165)), the "Test build" note on every platform page (sample data, navigation not final) moved from under the top bar to a footer, at Nelson's request, and the notes in the player's Saved panel are anchored to their transcript line, a read-only Transcript-Line, as in Note-Item 1.1. Docs PR 100. [Dashboard note](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7283-30439) · [My Learning note](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7283-30443) · [Program note](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7283-30447) · [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
174. <a id="decision-2026-10-14-a-course-ring-in-the-mobile-topbar"></a>14 Oct 2026 · Nelson

     ### A course ring in the mobile topbar

     On a phone the course ring lived only in the drawer, so a completion was not seen to count. The mobile topbar now shows a 28 px ring after the SkillUp logo: blue while the course runs, green with a check once it is complete. No number inside it at that size; screen readers hear the percentage, and the drawer still shows it. Topbar 1.1 in the design system (Show progress, not yet published); [prototype PR 164](https://github.com/nvjeronimo/skillup-lms-prototype/pull/164).
175. <a id="decision-2026-10-14-a-course-of-a-program-is-reached-through-its-program-decisio"></a>14 Oct 2026 · Nelson

     ### A course of a program is reached through its program (decision 025)

     Accepted, business rule BR-47. A course that belongs to a program is reached only from its program page or from the Dashboard's "Pick up where you left off". It never gets its own card in My Learning's course list; a catalogue or a search would show the program. Three exceptions stay: the program card's Continue opens the player of the course in progress, due items open their work, and the program certificate page links to its courses. This is navigation only: an enrolled learner can still open the course's direct address. The prototype already worked this way; PR 163 adds a test that guards it. [decision 025](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/025-program-courses-entry-points.md) · [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
176. <a id="decision-2026-10-14-toast-1-1-and-five-design-system-pages-rebuilt"></a>14 Oct 2026 · Nelson

     ### Toast 1.1, and five design system pages rebuilt

     The Toast's tone icons sit on icon tokens: Neutral icon/muted, Success icon/success, Warning icon/warning, Critical icon/error; Info stays on icon/primary. Before they were on border/default, icon/success-strong (2.81:1), bg/warning and bg/error. Prototype PR 162 only removed a comment. The documentation of Content, Sidebar, Dashboard, Discovery and LMS · Shared was rebuilt with one frame per level. Duration is now a normal atom on the Shared page, and Note-Item moved from atom to molecule because it nests Transcript-Line ([03-design-system/tools/ds-levels.json](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/tools/ds-levels.json)). Published by Nelson. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
177. <a id="decision-2026-10-14-approx-goes-after-the-time"></a>14 Oct 2026 · Nelson

     ### approx. goes after the time

     An estimated duration reads "8 min read approx.", never "approx. 8 min read". When it appears is unchanged (decision 004: Reading, Lab, Activity, assignments, Peer review, Project; never Video, Recording, Live or a timed quiz). The design system carries it in a new atom, LMS / Duration: a Time text and an Approx boolean that shows "approx." after the time; Topic-Row, Topic-Header, Resume-Row, Course-Row and Discussion Prompt print their duration with it. Done on every screen and in the prototype. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
178. <a id="decision-2026-10-14-a-note-s-anchor-is-its-transcript-line"></a>14 Oct 2026 · Nelson

     ### A note's anchor is its transcript line

     The quote a note is anchored to uses the Transcript-Line component (State=Active), in the Note-Editor and in the Note-Item, in Figma and in the prototype. No separate quote component. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
179. <a id="decision-2026-10-14-values-in-a-logical-order"></a>14 Oct 2026 · Nelson

     ### Values in a logical order

     Property values in the documentation list numbers and sizes in ascending order. The order inside the components' property panel and of the variables in their collections cannot be changed by a script; the list of what to drag by hand is in the changelog. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
180. <a id="decision-2026-10-14-motion-has-a-scale"></a>14 Oct 2026 · Nelson

     ### Motion has a scale

     Motion becomes a token foundation like colour: 13 tokens (durations, easings, distances) with Material 3 names and our values. There is one mode for every breakpoint, theme and skin. Reduced motion removes travel and keeps feedback, as the prototype has done since PR 58. The Figma tokens live in their own Motion collection, published in the design-system library (14 Oct 2026). This is proposed until the team approves the new tokens. Built in the prototype and merged on 14 Oct (PRs 153–160); the tokens stay proposed until the team approves them. [ADR 024](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/024-motion-scale.md) · [motion matrix](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/motion-matrix.md)
181. <a id="decision-2026-10-14-one-progress-circle"></a>14 Oct 2026 · Nelson

     ### One progress circle

     The design system had two symbols that drew the same thing. The LMS one stays, renamed Progress circle; the Untitled UI kit circle, which nothing in the LMS used, was archived. Same component and key, so every instance keeps its link. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
182. <a id="decision-2026-10-14-progress-circle-moves-to-the-base-components"></a>14 Oct 2026 · Nelson

     ### Progress Circle moves to the Base components

     LMS / Progress Circle now lives with the shared Base components, on the Progress indicators page. It was moved, not copied: same component, every instance keeps its link (Sidebar, Overall-Progress). Its name still starts with LMS / for now. Renamed later the same day (see the entry above). [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
183. <a id="decision-2026-10-14-two-buttons-side-by-side-both-fill"></a>14 Oct 2026 · Nelson

     ### Two buttons side by side both fill

     When two buttons stand together, both fill and share the width, except on a large screen or in a list, where they hug their label. Example: Review and View Certificate on a completed course card. It adds to the rule that a button hugs or fills and is never a fixed width. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
184. <a id="decision-2026-10-14-design-system-versions-caught-up-three-pages-rebuilt"></a>14 Oct 2026 · Nelson

     ### Design system: versions caught up, three pages rebuilt

     Course-Card 1.3, Program-Card 1.2 and Section-Header 1.1. The Dashboard, My Learning and Discovery group pages were rebuilt so their documentation shows the components as they are now, split into Atoms, Molecules and Organisms; the page generator now keeps that split. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
185. <a id="decision-2026-10-14-course-card-partner-on-the-type-line-two-actions-when-comple"></a>14 Oct 2026 · Nelson

     ### Course card: partner on the type line, two actions when completed

     The partner or provider badge moves from under the title to the Course Type line: at its right end in the grid card, right after the badge in the list row. A completed course in the grid card shows two actions, Review (Secondary) and View Certificate (Primary); in a course row they share the width. The certificate action reads View Certificate on the course and the program cards. Published in the design system, on the eight My Learning screens, and in the prototype (PRs 144 to 147). [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
186. <a id="decision-2026-10-13-section-header-and-the-mobile-filter"></a>13 Oct 2026 · Nelson

     ### Section header and the mobile filter

     The section header has no rule under it; its action is the Link Button (Brand, Secondary) with a 16 arrow and its underline (prototype PR 142). On mobile the status filter's track fills the width and stays put while the segments scroll inside it; the last one is cut at the edge (prototype PR 143). [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
187. <a id="decision-2026-10-13-one-assistant-as-a-floating-chat"></a>13 Oct 2026 · Nelson

     ### One assistant, as a floating chat

     Decision 008 (the AI Panel built into the player) is widened, not reversed. One assistant answers questions about the platform and the learner's courses on every platform page and in the course player, where it also knows the current topic. It is a floating chat: a 48 px launcher (the SkillUp ball and paper plane with AI sparkles) sits bottom left on desktop and tablet, and bottom right above the footer navigation on a phone; the chat opens above it, as a full-screen sheet on a phone. Amended 23 Oct 2026: on the platform pages on a phone the launcher sits beside the floating tab bar, on the same line (prototype PR 277). Amended 26 Oct 2026: in the player the launcher sits bottom right of the content card, above Previous / Next ([prototype PR 358](https://github.com/nvjeronimo/skillup-lms-prototype/pull/358)); in Harbor and Fluent on desktop the assistant opens from the top bar instead ([prototype PR 359](https://github.com/nvjeronimo/skillup-lms-prototype/pull/359)). Since [prototype PR 365](https://github.com/nvjeronimo/skillup-lms-prototype/pull/365) the platform pages use the top-bar pill in every skin (SKO, Gold and Studio from 1280 px); the floating launcher stays in the player, on the tabs bar between 1025 and 1279 px, on compact bars and beside the phone tab bar. It answers and routes: buttons under an answer open a page. It never changes anything: no mark complete, submit, save or enrol. It is hybrid: scripted answers by default, a real model (Claude) only when a key is configured. The docked AI Panel is removed from the prototype, and its 165 hidden instances are removed from the Video, Quizzes, Reading and Lab screens. No screen carries the assistant for now: it has its own Figma page, a feature preview. The prototype has it, to see and test: PRs 127, 136 and 139 in nvjeronimo/skillup-lms-prototype, all merged. Amended 26 Oct 2026: the floating launcher is retired ([prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369)); the assistant opens from the Search + Assistant bars, in the player too, and the floating version is kept behind ?assistant=floating. [assistant design spec](https://github.com/nvjeronimo/skillup-lms-prototype/blob/main/docs/superpowers/specs/2026-10-13-assistant-design.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7166-328)
188. <a id="decision-2026-10-13-first-steps-five-things-that-tick-themselves"></a>13 Oct 2026 · Nelson

     ### First steps: five things that tick themselves

     For a learner who has just arrived, the assistant's window opens once (desktop and tablet, without taking the focus) with five first steps: open the program, open a course, start a topic, complete a topic, ask the assistant. Each ticks itself when the learner does it on the real page. A count on the launcher says how many are left. Skip first steps hides it for good. Every learner, new or not, sees one next step at the top of an empty chat: a deadline of today, else the course in progress, else a course not started. In the prototype the pages still show the sample learner part-way through; only the first steps start from zero. [first steps design spec](https://github.com/nvjeronimo/skillup-lms-prototype/blob/main/docs/superpowers/specs/2026-10-13-first-steps-design.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7166-328)
189. <a id="decision-2026-10-13-my-learning-no-stats-and-the-toolbar-in-two-rows"></a>13 Oct 2026 · Nelson

     ### My Learning: no stats, and the toolbar in two rows

     The three figures at the top of My Learning (In progress, Completed, Certificates) are removed: the Dashboard already shows them. The header is the page title alone. The toolbar has two rows: the tabs alone on the first, on their rule; on the second the status filter on the left and the search with the Grid / List toggle on the right. Done on the eight Ready for Dev screens; prototype PRs 140 and 141. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
190. <a id="decision-2026-10-13-design-system-pages-split-by-level"></a>13 Oct 2026 · Nelson

     ### Design system pages split by level

     Every LMS group page (14) and every Base component page (24) now has one frame per level: Atoms, Molecules, Organisms. Components were moved, not rebuilt, so nothing needs publishing. The classification is a first pass to be corrected: [03-design-system/tools/ds-levels.json](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/tools/ds-levels.json). [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
191. <a id="decision-2026-10-13-my-learning-one-ordered-list-and-a-status-filter"></a>13 Oct 2026 · Nelson

     ### My Learning: one ordered list and a status filter

     Each tab (Courses, Programs) is one list, always ordered In progress, Not started, Completed. Under the toolbar a Button group filters by state: All (default), In progress, Not started, Completed; it works together with the search and the Grid / List view. On mobile the filter scrolls sideways. This replaces the three sections tried earlier the same day, which spread the cards and made the learner scroll. The Browse catalog tile is hidden for now. Done on the eight Ready for Dev screens in Figma; prototype PR 138. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
192. <a id="decision-2026-10-13-my-learning-in-three-sections-withdrawn-the-same-day"></a>13 Oct 2026 · Nelson

     ### My Learning in three sections (withdrawn the same day)

     Withdrawn: see the entry above. Both tabs (Courses, Programs) are split in In progress, Not started and Completed, in that order, each under the Section-Header with its count (3 courses, 1 program). A section without cards is not shown. The state comes from Open edX: a course from hasStarted and certificate.isEarned, a program from progress\_details. Done on the eight Ready for Dev screens in Figma and in the prototype (PR 135). [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
193. <a id="decision-2026-10-13-progress-bars-end-straight-green-only-when-completed"></a>13 Oct 2026 · Nelson

     ### Progress bars end straight; green only when completed

     Every progress bar ends straight, track and fill, with no radius. Since 13 Oct the video progress and volume sliders end straight too; only the 12px volume handle is round. The fill is bg/info while the course or program is running and green (bg/success) only once it is completed, always with a check icon and the word, never by colour alone. Amended 23 Oct 2026: 62 progress bars in Discovery Course-Row and Resume-Row instances on the ICP had a local Radius/fixed-full override; they are re-bound to Radius/fixed-none, so the bars end straight (49 Platform WIP, 13 Ready for Dev); the DS and the prototype were already straight. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
194. <a id="decision-2026-10-13-buttons-hug-their-content-no-name-carries-a-version"></a>13 Oct 2026 · Nelson

     ### Buttons hug their content; no name carries a version

     Button (v1.3) and Link Button (v1.1) hug their content in every variant, so a button grows when an icon is turned on or the label changes. Three names that carried a version were renamed, with the same keys: the Topic-Footer-Nav variant is Default, Empty state - V2 is Empty state responsive, and the private progress bar is .\_Progress bar plain. One is left for the mobile app's owner: the V1 and V2 variants of Event\_card\_atom.
195. <a id="decision-2026-10-13-the-design-system-file-is-organised-for-developers"></a>13 Oct 2026 · Nelson

     ### The design system file is organised for developers

     The file opens on a [Start here](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22458-35) page that maps it. Every LMS component group has its own page: seven for the course player (Player, Sidebar, Content, Topics, Assessment, Live, Shared) and seven for the platform pages (Navigation, Dashboard, My Learning, Discovery, Program Detail, Course Detail, Completion). Each component has one block with the same five parts: the component, its properties, its measures, what it is and its rules, and its anatomy. Buttons, Button groups, Badges and Alerts have the same write-up on their Base pages. The Untitled UI pages the LMS does not use are in an Archive block. Figma shows what a component is made of; the rules stay here.
196. <a id="decision-2026-10-13-mark-as-complete-belongs-to-the-feedback-row-in-the-componen"></a>13 Oct 2026 · Nelson

     ### Mark as Complete belongs to the feedback row, in the component too

     The footer navigation has no completion control: Topic-Footer-Nav lost its Show Badge property (v1.1). Content-Feedback has a Show Mark as Complete option (v1.1), off by default; the 64 screens that had a local frame for it now use the component. Once a topic is completed the option is off and Completed shows in the Topic Header.
197. <a id="decision-2026-10-13-collapsed-sidebar-a-bookmark-on-the-rail-and-a-card-beside-i"></a>13 Oct 2026 · Nelson

     ### Collapsed sidebar: a bookmark on the rail and a card beside it

     A saved topic carries a small bookmark on its rail row (Topic-Row, Show rail bookmark, v1.1). On a rail row, Topic-Flyout (new, v1.0) opens beside the rail with the title, the topic type and the bookmark button. The prototype already had both. The card opens on hover and on keyboard focus of a rail row: arrow right moves into it, Escape or arrow left goes back to the row (prototype PR 126).
198. <a id="decision-2026-10-13-every-component-is-at-version-1-x-until-engineering-has-buil"></a>13 Oct 2026 · Nelson

     ### Every component is at version 1.x until engineering has built it

     Design and engineering start the design system and Storybook now, so nothing starts at 2: the nine components that carried a 2.x were renumbered (Button and Icon Button 1.2, Link Button 1.0, Badge 1.1, Button group 1.1, Topbar 1.2, Topbar-Item 1.1, Course-Row 1.1, Lab-Launch-Card 1.1). Register: [03-design-system/component-versions.md](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/component-versions.md), rule 8. Button is 1.3 and Link Button 1.1 since later the same day (they hug their content).
199. <a id="decision-2026-10-13-mark-as-complete-sits-in-the-feedback-row"></a>13 Oct 2026 · Nelson

     ### Mark as Complete sits in the feedback row

     Feedback on the left, the button on the right; on a phone it drops under the feedback. Applied to the 64 screens that have the button and to the prototype (PR 125). [lab-third-party-platforms](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md) · [Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7124-49482)
200. <a id="decision-2026-10-13-lab-the-ibm-flow-and-the-first-opening-date-are-confirmed"></a>13 Oct 2026 · Kirti and Vikas

     ### Lab: the IBM flow and the first-opening date are confirmed

     The IBM screens stand as drawn: the whole course is on IBM, and the progress card keeps its dash for now, because IBM does not share progress; what SkillUp should show instead is an open question. The launch card's "First opened on" date can be built as designed, stored on the server for each learner. Not for now since 19 Oct: SkillUp cannot tell whether the launch button was selected (Komal). [lab-third-party-platforms](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md)
201. <a id="decision-2026-10-12-on-a-lab-mark-as-complete-is-secondary-until-the-lab-has-bee"></a>12 Oct 2026 · Nelson

     ### On a lab, Mark as Complete is secondary until the lab has been opened

     A lab's page has one primary action at a time. While the lab has not been opened, the launch button is primary and Mark as Complete is secondary. Once it has been opened they swap: the launch button is secondary and Mark as Complete is primary. Where there is no launch card (the lab inside the page) Mark as Complete is primary from the start. On the screens it is a local override; the Topic-Status-Badge component has no property for it. Not for now since 19 Oct: SkillUp cannot tell whether the launch button was selected (Komal). [lab-third-party-platforms](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md)
202. <a id="decision-2026-10-12-secondary-buttons-hover-on-a-soft-fill-and-button-colours-si"></a>12 Oct 2026 · Nelson

     ### Secondary buttons hover on a soft fill, and button colours sit on tokens of their role

     On hover every Secondary button fills with the soft colour of its type and keeps its text and icon colours: Brand and Neutral on the primary soft colour, Destructive on the error one, Success on the success one. The Icon Button follows the same rule. A yellow fill and a solid fill were tried for Brand the same day and dropped. On the Brand Primary, whose hover fill is the primary-hover colour, the label and the icon use the text made for that fill: before, the label had the colour of the fill itself in the dark theme. Outlines sit on border tokens and icons on icon tokens. Button and Icon Button v1.2; the prototype follows. [component versions](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/component-versions.md)
203. <a id="decision-2026-10-12-the-lab-prerequisites-block-is-the-design-system-alert"></a>12 Oct 2026 · Nelson

     ### The lab prerequisites block is the design system Alert

     On the Lab screens, Before you start and its list of requirements sit in the Alert (Brand, Floating, no dismiss, no actions, no close) instead of the Lab-Prerequisites component. 36 blocks replaced, each with its own lines: 26 on the Lab page and 10 on Topic Content Types. The prototype has the same Alert on both kinds of lab. The Lab-Prerequisites component was deleted from the library the same day; its rule stays: what the learner needs goes above the download, not below it. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
204. <a id="decision-2026-10-12-the-overlay-is-70"></a>12 Oct 2026 · Nelson

     ### The overlay is 70%

     The dim layer behind a modal or over a video, bg/overlay, goes from 50% to 70% in every theme. In the prototype the video caption now needs one overlay layer instead of two to keep its text readable over a bright frame. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
205. <a id="decision-2026-10-12-a-lab-that-has-been-opened-shows-fewer-alerts"></a>12 Oct 2026 · Nelson

     ### A lab that has been opened shows fewer alerts

     Once the learner has opened a lab at least once, the Before you start block and the This lab needs a computer warning are no longer shown: they have already seen what the lab needs. The Opened, question and Completed screens go from the lead line straight to the launch card. A lab never opened keeps both. Not for now since 19 Oct: SkillUp cannot tell whether the launch button was selected (Komal). [lab-third-party-platforms](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md)
206. <a id="decision-2026-10-12-mark-as-complete-stays-and-next-asks"></a>12 Oct 2026 · Navdeep and Nelson

     ### Mark as Complete stays, and Next asks

     Navdeep's comments on the Figma frame, applied the same day. The Mark as Complete button stays at the end of the content: without it, a learner who finishes a lab and closes the course without selecting Next would leave it incomplete. Next still asks on a topic that is not completed, with his copy ("Have you completed this lab?" · Not yet · Yes, completed) and three behaviours: Yes, completed marks it as completed and advances; Not yet keeps it incomplete and advances; Close changes nothing. Two ways of completing now exist; the question is the safety net. [lab-third-party-platforms](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md)
207. <a id="decision-2026-10-12-next-asks-also-on-podcast-activity-and-the-video-fallback"></a>12 Oct 2026 · Nelson

     ### Next asks also on Podcast, Activity and the Video fallback

     Podcast follows Video: both complete by themselves at 90% played, and only when playback cannot be measured does Next ask whether the learner has finished. Activity is completed by hand, so Next asks. The Mark as Complete button is gone from every screen; card 8 of the Video page shows the fallback as not completed, the question and completed. Amended the same evening: the Mark as Complete button is back and the dialog copy changed (see the entry above). [lab-third-party-platforms](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md)
208. <a id="decision-2026-10-12-next-asks-the-default-on-every-topic-completed-by-hand"></a>12 Oct 2026 · Nelson

     ### Next asks: the default on every topic completed by hand

     The footer is Previous and Next on every topic. On a topic that is not completed, Next opens a question, "Have you finished this lab / reading?": Yes, I've finished completes the topic and goes to the next one; Not yet goes to the next one and leaves it open; closing the dialog stays on the page. On a completed topic Next goes straight on. It replaces Complete and continue, which the Lab and Reading screens carried for a few hours the same day. No design system change: the footer and the Modal are used as they are. Known trade-off: one more click on every unfinished topic of this kind, and Not yet brings the question back. Amended the same evening: the Mark as Complete button is back and the dialog copy changed (see the entry above). [lab-third-party-platforms](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md)
209. <a id="decision-2026-10-12-reading-screens-take-complete-and-continue"></a>12 Oct 2026 · Nelson

     ### Reading screens take Complete and continue

     The 19 Reading screens have no Mark as Complete button: the footer's forward button reads Complete and continue and is the primary action of the page. Once completed, the Topic Header shows Marked as completed, the sidebar row becomes Completed and the footer button is Next, with no status in the footer. The Review card was removed: without the button it was a copy of the not-completed card. Superseded the same evening by Next asks (see the entry above). [reading-screen-matrix](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/reading-screen-matrix.md)
210. <a id="decision-2026-10-12-a-course-row-says-where-the-learner-left-off"></a>12 Oct 2026 · Nelson

     ### A course row says where the learner left off

     In the simple course row of the Dashboard the headline is the module the learner stopped in, not the course. Above it, the type and the length of the topic that Resume opens; under it, the course and, when it belongs to one, the program. The delivery badge left the row. Course-Row v1.1 is 96 tall; Resume-Row v1.1, its mobile pair, has the same three lines. A course not started shows its first module; a locked course keeps the course as the headline. In the prototype the module, the topic type and the length come from the course's own data, where Resume lands. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
211. <a id="decision-2026-10-12-the-top-bar-marks-the-current-page-on-its-item"></a>12 Oct 2026 · Nelson

     ### The top bar marks the current page on its item

     The five sections of the platform top bar are underline tabs that fill the height of the bar; the current one has a 3 px bar that sits on the rule of the top bar. The page is marked by setting Current to On on its Topbar-Item: the Topbar itself has only Breakpoint (Desktop, Compact). Topbar v1.2 and Topbar-Item v1.1 (State Default/Current became Current Off/On). This changes how the sections look, not the open question of sidebar or top bar. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
212. <a id="decision-2026-10-12-no-version-in-a-component-name-the-v1-badge-is-gone"></a>12 Oct 2026 · Nelson

     ### No version in a component name; the V1 badge is gone

     Button, Link Button, Icon Button and Badge are the current components, so their names carry no V1 or V2. The version stays in the first line of the Figma description and in the register, never in a name, a Storybook title or a message. The V1 badge set (453 variants) was deleted from the library after a count found no instance on the design system pages we use nor on the ICP and platform pages. The Mobile App file was not checked: a V1 badge still placed there keeps showing but no longer updates. [component versions](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/component-versions.md)
213. <a id="decision-2026-10-12-badge-icons-follow-the-colour-of-the-label"></a>12 Oct 2026 · Nelson, fix run by Claude

     ### Badge icons follow the colour of the label

     In Badge v1.1 the dot, the icons and the close follow the label in every style. The eight extra hues (Cyan to Orange) sat on the teal icon token and now use the variable of their label, because there is no icon token for them. In Soft Light the accents no longer have white icons on a light fill. After the publish, the badges nested in the LMS components fell back to the Badge defaults on the screens (a dot, an arrow and a close); 994 were set back to what the design system components define. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
214. <a id="decision-undated-screens-and-lms-components-are-on-the-current-button"></a>10–12 Oct 2026 · Nelson, migration run by Claude

     ### Screens and LMS components are on the current Button

     Every page outside Discovery and Archive moved from the previous button generation to Button, Link Button and Icon Button: 1,593 instances on ten pages and 180 inside the LMS components. A button takes the size nearest to its real height (36, 44, 48, 56). The old Tertiary is Button Neutral Secondary. Utility Button and Close Button stay as sets of their own. The base components outside the LMS pages (Modals, Empty states) still hold the old button. [component versions](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/component-versions.md)
215. <a id="decision-2026-10-12-the-lab-launch-card-says-opened-never-complete"></a>12 Oct 2026 · Nelson

     ### The lab launch card says opened, never complete

     Nothing comes back from the partner, so the card cannot know a lab is done. It goes from Ready to Opened on the first click on the launch button, shows the date of the first opening and stays like that, also after the topic is completed. Before the lab is opened the launch button is the primary action and Complete and continue is secondary; once opened they swap. Nothing is disabled. There is no Skip action: to move on without completing, the learner uses the sidebar. Lab-Launch-Card v1.1: Completed removed. The part about the two buttons swapping was superseded the same evening by Next asks: the footer does not change. Not for now since 19 Oct: SkillUp cannot tell whether the launch button was selected (Komal). [lab-third-party-platforms](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md)
216. <a id="decision-2026-10-12-lab-screens-new-tab-by-default-complete-and-continue-to-fini"></a>12 Oct 2026 · Nelson

     ### Lab screens: new tab by default, Complete and continue to finish

     Both ways of opening a lab are drawn: a new tab (the default, every partner) and inside the page (an option for the courses whose lab already loads there, two Microsoft courses today). On a topic the platform cannot measure, the footer button reads "Complete and continue": it marks the topic complete and goes to the next one, and the separate Mark as Complete row is gone from the Lab screens. On a lab with a launch card the button is secondary until the lab has been opened, then primary. The Reading screens took the same flow later that day. Decided by Nelson; Navdeep's answer to the proposal of 9 Oct was not seen. Once completed, the status shows in the Topic Header and on the topic's row in the sidebar, not in the footer. Superseded the same evening by Next asks (see the entry above). Not for now since 19 Oct: SkillUp cannot tell whether the launch button was selected (Komal). [lab-third-party-platforms](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md)
217. <a id="decision-2026-10-11-a-button-group-is-a-track-with-a-pill"></a>11 Oct 2026 · Nelson

     ### A button group is a track with a pill

     Of six options for the selected segment, Nelson chose the track with a pill: the group is a muted track and the current segment a white pill with a subtle border and primary content. Before, the segments were joined and the current one sat on a soft blue that did not show against the page (1.07:1). It applies to the whole Button group (v1.1): the Grid / List toggle of My Learning and the Q&A filter. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
218. <a id="decision-2026-10-11-my-learning-lists-each-course-as-a-course-row"></a>11 Oct 2026 · Nelson

     ### My Learning lists each course as a course row

     Wherever the course card stood on its own on My Learning it is now the course row of the program page: the card, the bar that says which module the learner is in, and the modules once the row is opened. 40 cards replaced on the screens; the prototype follows. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
219. <a id="decision-2026-10-10-the-44-px-touch-target-note-is-written-once-per-handoff-page"></a>10 Oct 2026 · Nelson

     ### The 44 px touch-target note is written once per handoff page

     The accessibility annotation was repeated on every control of every mobile screen. It now sits once per handoff page, on a mobile screen, worded for every interactive control; 144 copies were removed. The one exception, the video action button, is noted on the component. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
220. <a id="decision-2026-10-10-the-learner-is-john-smith-and-the-dashboard-counts-17-enroll"></a>10 Oct 2026 · Nelson

     ### The learner is John Smith, and the Dashboard counts 17 enrolled

     The prototype uses John Smith, as the Figma screens do. The Dashboard reads *of 17 enrolled*: five single courses, seven of the AI program and five of Cybersecurity. Course cards and program cards keep one height, and program cards stay three per row. [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md)
221. <a id="decision-2026-10-10-the-whole-card-of-a-course-or-program-opens-its-details-page"></a>10 Oct 2026 · Nelson

     ### The whole card of a course or program opens its details page

     The card opens the details page, independently of the button. It applies to course cards, program cards, the course rows of a program page and the resume rows on the Dashboard. The button opens the player. On the program card, *Continue* opens the player of the course in progress. Built in the prototype; not annotated on the Figma screens yet. Amended 15 Oct 2026: annotated in Figma, in the dev notes of the Dashboard, My Learning and Program desktop screens (see the 15 Oct entry). [platform-navigation-flow](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/platform-navigation-flow.md)
222. <a id="decision-2026-10-10-a-course-of-a-program-always-shows-the-program-path-in-its-b"></a>10 Oct 2026 · Nelson

     ### A course of a program always shows the program path in its breadcrumb

     Whichever way the learner reached the course. The mobile menu follows the desktop order. [platform-navigation-flow](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/platform-navigation-flow.md)
223. <a id="decision-2026-10-10-sample-data-is-the-same-in-figma-and-in-the-prototype"></a>10 Oct 2026 · Nelson

     ### Sample data is the same in Figma and in the prototype

     The AI program lasts 10 months. *What's included* is counted from the seven course outlines. Dashboard and My Learning count 4 in progress, 2 completed and 2 certificates. Business Analytics with Python starts Oct 14. Cybersecurity starts Oct 5. Same on the Figma source screens, on the handoff copies and in the prototype.
224. <a id="decision-2026-10-10-two-proposals-in-the-prototype-not-designed"></a>10 Oct 2026 · Nelson

     ### Two proposals in the prototype, not designed

     The passed state of a completed course, and a program certificate page. Each is marked as a proposal on the page.
225. <a id="decision-undated-every-course-and-both-programs-have-content-of-their-own-in"></a>9–10 Oct 2026 · Nelson

     ### Every course and both programs have content of their own in the prototype

     All 17 courses and both programs. There is a second program page, Cybersecurity Fundamentals Certificate. Course search looks in each course's own content. Labs, podcasts, lesson pages and live sessions take content per course. The video caption and length come from the topic. This is sample content for the prototype, pending the vendor's.
226. <a id="decision-2026-10-09-four-disagreements-in-the-sample-data-fixed"></a>9 Oct 2026 · Nelson

     ### Four disagreements in the sample data fixed

     Fixed in Figma and in the prototype: 15 of 38 topics; the due item on Sat sits under course 2; the first resume row is course 2 at 40%; the program card title and *Up next*.
227. <a id="decision-2026-10-09-one-navigation-rule-a-title-opens-the-course-page-a-button-o"></a>9 Oct 2026 · Nelson

     ### One navigation rule: a title opens the course page, a button opens the player, the player exits to the course page

     It follows the three addresses Open edX gives an enrolment (homeUrl, resumeUrl, progressUrl). Decided with it: every course shows its own title; inside a program the course title opens the course page and the course page shows the path through the program; Go to next course is the next course of the program; due items on the Dashboard open the work; the site opens on the Dashboard. The certificate page in the prototype is a proposal, not designed yet. [platform-navigation-flow](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/platform-navigation-flow.md)
228. <a id="decision-2026-10-08-course-search-runs-on-submit-and-opens-in-a-popup"></a>8 Oct 2026 · Nelson, checked against the Open edX source

     ### Course search runs on submit and opens in a popup

     The search inside a course sends its request only on Enter, or the search key on a phone; typing sends nothing. Results open in a popup under the search field on desktop and tablet, and full screen on mobile. Each result shows its type, title, an excerpt with the match marked, its location and the number of matches. There are no suggestions and no recent searches: the platform does not return them.
229. <a id="decision-2026-10-08-lms-components-are-named-lms-icp-and-lms-platform-and-each-h"></a>8 Oct 2026 · Nelson

     ### LMS components are named LMS/ICP/… and LMS/Platform/…, and each has a version

     74 components renamed to the September convention; Discovery and course-end components moved to the platform page; a new page holds what is in review and not for build (AI Panel and five components on no screen). Versions are MAJOR.MINOR, baseline 1.0 on 8 Oct 2026. The design system is published by Nelson. The convention and the register are in [component-versions](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/component-versions.md). Amended 13 Oct 2026: AI Panel is on no screen either, and the two assistant components (LMS/Platform/Assistant/…) sit on the same in-review page.
230. <a id="decision-2026-10-08-the-lab-launch-card-is-a-design-system-component"></a>8 Oct 2026 · Nelson

     ### The lab launch card is a design system component

     A lab that runs on a partner's platform opens from LMS / Lab · Launch Card. It has four states: Ready, Opened, Completed and Unavailable. It shows the partner's name, and its buttons stack on a phone. It replaced the SCORM frame that stood in for it on the 32 Lab screens that have a launch card. The inline frame and the modal of the embedded alternatives are still sketches, until the content team's test says they are possible.
231. <a id="decision-2026-10-08-the-program-icon-uses-three-opaque-tokens"></a>8 Oct 2026 · Nelson

     ### The Program icon uses three opaque tokens

     The stacked cards of the Program icon in the Course Type Badge sit on three design system tokens, so the icon follows the brand skin. In the light SkillUp theme the back card is faint. That is accepted as it is.
232. <a id="decision-2026-10-08-the-first-course-card-in-a-grid-carries-the-primary-resume"></a>8 Oct 2026 · Nelson

     ### The first course card in a grid carries the primary Resume

     In a grid of course cards on My Learning, only the first card's Resume button is primary. The others stay secondary. Same rule as the rows on the Dashboard; the Figma screens and the prototype agree.
233. <a id="decision-2026-10-08-the-course-card-thumbnail-has-a-fixed-size"></a>8 Oct 2026 · Nelson

     ### The Course Card thumbnail has a fixed size

     In the grid layout the thumbnail is 86 px square and no longer stretches with the title. The card keeps its 358 px height. Changed in the design system; it reaches the screens with the next library update. Amended 22 Oct 2026: the grid card now has a large 16:9 cover across the top (Course-Card 1.16, see "Large course pictures on cards and module rows").
234. <a id="decision-2026-10-08-the-certificate-does-not-show-time-learned"></a>8 Oct 2026 · Nelson

     ### The certificate does not show time learned

     Open edX keeps no time-learned figure, so the stat was removed from the design system certificate and from the prototype. Modules, Topics and Avg quiz stay.
235. <a id="decision-2026-10-07-badges-read-their-labels-again"></a>7 Oct 2026 · Nelson, repair run by Claude

     ### Badges read their labels again

     When Badge was restructured, the components that wrap it lost their text and icon and read *Label*. The 114 badges nested in 18 LMS components were repaired in the design system, the library was published and the update accepted in the ICP file. No badge reads *Label* on the platform pages, Video, Quizzes, Reading, Overlay Panels or Topic Content Types. A script cannot accept a library update; the Libraries panel has to. The values and where each came from are in [library request 21](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/library-requests.md).
236. <a id="decision-2026-10-07-a-course-row-says-where-the-learner-is-once"></a>7 Oct 2026 · Nelson

     ### A course row says where the learner is once

     On the Program page, the modules bar of a course in progress reads *Module 2 of 4* and the module's name, with *Show* / *Hide*. The *You left off here* badge above the current module is gone: the bar already says it. Same on desktop, tablet and mobile.
237. <a id="decision-2026-10-07-a-dev-note-goes-on-the-main-component-and-on-one-screen"></a>7 Oct 2026 · Nelson

     ### A dev note goes on the main component and on one screen

     A Dev Mode note about a component is not repeated on every instance. *Navigation is not final* now sits on the top bar's main component, on the sidebar's, and on one screen, *Dashboard · Desktop*.
238. <a id="decision-2026-10-07-course-cards-carry-a-cover-image"></a>7 Oct 2026 · Nelson

     ### Course cards carry a cover image

     Every course thumbnail on My Learning and on the Program page shows a cover instead of initials. The images in the screens are placeholders from the public SkillUp catalogue; in production it is the course's own image, which Learner Home returns. The Dashboard's glance card also has two layouts now, and the screens use them: four stats in a line on desktop and tablet, two by two on mobile.
239. <a id="decision-2026-10-07-ready-for-dev-screens-sit-on-design-system-tokens-and-compon"></a>7 Oct 2026 · Nelson, audit run by Claude

     ### Ready for Dev screens sit on design system tokens and components

     Video, Quizzes, Reading and the platform pages were read element by element. Outside components, their screens now carry no raw colour, spacing or radius: each value is a design system token. The note editor on Video is a design system component, LMS / Note Editor: a modal on desktop and tablet, a bottom sheet on mobile. Overlay Panels and Completion + Certificate got the same pass. What changed, value by value, is in the [changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md).
240. <a id="decision-2026-10-07-one-primary-action-per-list-of-course-rows"></a>7 Oct 2026 · Nelson

     ### One primary action per list of course rows

     On the Dashboard, in a list of courses to resume, only the first row keeps the primary *Resume* button. The others are secondary. The Figma screens and the prototype agree.
241. <a id="decision-2026-10-07-the-course-card-uses-design-system-text-styles"></a>7 Oct 2026 · Nelson

     ### The Course Card uses design system text styles

     Its six texts had no style. They now do, and no text on the card is below 12 px. The grid card is 358 px high instead of 342, and its padding is 24, 20 and 16 px on desktop, tablet and mobile.
242. <a id="decision-2026-10-07-platform-pages-show-only-what-open-edx-serves"></a>7 Oct 2026 · Nelson, checked against the dev environment and the Open edX source

     ### Platform pages show only what Open edX serves

     The Dashboard's glance card shows totals the platform returns: courses in progress, courses completed, certificates and programs. The streak card, the live-session item and *Book a mentor* are gone. *Due this week* stays, with assignment deadlines only. Course cards show total effort instead of time left, a program's percentage is courses complete ÷ courses, and every delivery badge reads *Flexible Learning*. The Program page's marketing-only content stays until the vendor answers. The map is in [metadata map §37](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/course-details-metadata-map.md).
243. <a id="decision-2026-10-06-the-35-platform-components-live-in-the-design-system"></a>6 Oct 2026 · Nelson

     ### The 35 platform components live in the design system

     They moved from the ICP file to the page *LMS Platform Components*, named LMS/Platform/&lt;Group&gt;/&lt;Component&gt;. The variant property Type is now Kind. The 741 instances on the platform pages point to the library.
244. <a id="decision-2026-10-05-program-page-the-courses-are-a-list-of-expandable-rows"></a>5 Oct 2026 · Nelson

     ### Program page: the courses are a list of expandable rows

     List only. Each row shows which module the learner left off in and expands to the course's modules. A grid of course cards was turned down.
245. <a id="decision-2026-10-01-only-what-an-api-backs-goes-in"></a>1 Oct 2026 · Nelson

     ### Only what an API backs goes in

     Nothing is designed as real that the platform cannot serve. Live sessions and cohort pace are designed but out of the MVP. What a learner sees on desktop is also there on tablet and mobile: content is not hidden to make a component fit. Recorded in [PRODUCT.md](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/PRODUCT.md). Amended 13 Oct 2026: the assistant is the stated exception. No API backs it, so it is in the prototype and on its own preview page only, and on no ready-for-dev screen.
246. <a id="decision-2026-10-01-a-handoff-is-ready-for-dev-only-when-nelson-marks-it"></a>1 Oct 2026 · Nelson

     ### A handoff is ready for dev only when Nelson marks it

     A new handoff frame starts *In progress*. *Ready for DEV* uses the green status tag and is set by Nelson alone.
247. <a id="decision-2026-09-30-below-desktop-my-learning-is-grid-only"></a>30 Sep 2026 · Nelson

     ### Below desktop, My Learning is grid only

     The grid and list toggle is hidden on tablet and mobile. Two columns on tablet, one on mobile.
248. <a id="decision-2026-09-28-44-px-targets-and-12-px-minimum-text"></a>28 Sep 2026 · Nelson

     ### 44 px targets and 12 px minimum text

     Stricter than WCAG 2.2 AA: interactive targets are at least 44 px on mobile, and no text is smaller than 12 px. Dashboard and My Learning are two separate pages.
249. <a id="decision-2026-09-25-mentor-questions-go-through-q-a"></a>25 Sep 2026 · Nelson

     ### Mentor questions go through Q&A

     When the course has a mentor assigned, the Course Detail sidebar shows a standard card: *Ask anything to your mentor* · *Post your question in Q&A*. There is no named mentor on the card. *Ask your mentor* opens the Mentorship Q&A tab, where the learner posts the question and the course staff and/or the mentor answer. The named-mentor, 1:1 messaging card (Sidebar card · Type=Mentor) is kept for a future phase; the current one is Type=Mentor Q&A.
250. <a id="decision-2026-09-25-badge-colours-in-three-groups-brand-alerts-extra"></a>25 Sep 2026 · Nelson

     ### Badge colours in three groups: Brand, Alerts, Extra

     The set has grown to 270 variants: 5 styles (Soft, Outline, Modern, Plain, Soft Light) × 3 sizes × 18 colours. **Brand** covers the SKO brand book: Brand, Gray, Teal, Green, Red and Yellow. **Alerts** covers the statuses: Info, Success, Warning and Error. **Extra** covers Cyan, Blue, Indigo, Violet, Purple, Fuchsia, Pink and Orange. These are provisional because they still sit on Untitled UI primitives. The set, its description and the Light/Dark showcase follow this order.
251. <a id="decision-2026-09-24-badge-replaces-the-v1-badge-everywhere-in-the-ds-and-the-icp"></a>24 Sep 2026 · Nelson, migration run by Claude

     ### Badge replaces the V1 badge everywhere in the DS and the ICP

     61 badges in 11 LMS components (V1 Badge → Soft, modern → Modern, Topic Types → Plain), the 80 Badge group variants, and 649 badges on 30 Untitled UI pages; about 1,800 nested ones followed their masters. Text, icons, flags, avatars, sizing and visibility were kept. The ICP Quizzes, Video, Reading and Platform pages are on the current Badge, and the 41 texts the screens had changed were restored after the library update. A file-wide count finds no V1 badge on any page. The old set, Badge-V1-to-remove, stays until the Mobile App file is migrated.
252. <a id="decision-2026-09-24-badge-accents-strong-statuses-soft"></a>24 Sep 2026 · Nelson

     ### Badge: accents strong, statuses soft

     120 variants at launch instead of 453 (270 since 25 Sep, see above), with the options as booleans on one private atom. Statuses (Gray, Brand, Info, Error, Warning, Success) keep soft fills. The four brand-book accents (Teal, Green, Red, Yellow) use the solid brand colour, so Yellow no longer reads as Warning. Every colour has one token per element: bg, text, icon, border.
253. <a id="decision-2026-09-23-topic-type-follows-the-platform-rule"></a>23 Sep 2026 · Nelson, verified in source

     ### Topic type follows the platform rule

     Topic header and sidebar icons read the platform value. Graded no longer means "Assessment". Adding more types is an engineering call through OVERRIDE\_GET\_UNIT\_ICON.
254. <a id="decision-2026-09-22-podcasts-render-as-video-callout-is-not-a-content-block"></a>22 Sep 2026 · Nelson with Simran

     ### Podcasts render as video; Callout is not a content block

     The Video (Audio) block is a video player with cover art. Callouts were removed from every Reading screen.
255. <a id="decision-2026-09-22-element-first-token-names-with-the-word-primary"></a>22 Sep 2026 · Nelson

     ### Element-first token names, with the word "primary"

     The design system's colours are named by element (bg/ text/ icon/ border/), not by material role. 83 tokens, about 6,000 bindings moved with no visual change.
256. <a id="decision-2026-09-17-no-downloads-tab-on-reading"></a>17 Sep 2026 · Navdeep and Nelson

     ### No Downloads tab on Reading

     Files are linked in the body. With one option left, the tab bar is hidden, per the one-option rule.
257. <a id="decision-undated-design-system-split-into-foundations-lms-mobile-marketing"></a>12–14 Sep 2026 · Nelson, ahead of the team meeting

     ### Design system split into Foundations + LMS / Mobile / Marketing

     Tokens are born only in Foundations. Components are named &lt;Scope&gt;/&lt;Group&gt;/&lt;Component&gt; with hyphens inside words, and LMS/ICP/… vs LMS/Platform/… for the two surfaces.
258. <a id="decision-2026-08-21-ora-training-feedback-retired"></a>21 Aug 2026 · Nelson

     ### ORA Training Feedback retired

     The "You selected / Staff selected" banner is a Dev-mode testing feature, not something learners see.
259. <a id="decision-2026-08-14-quiz-mode-a-2-is-the-build-target"></a>14 Aug 2026 · Navdeep

     ### Quiz mode A-2 is the build target

     The learner answers everything before any feedback, so no answer is influenced by an earlier correction. A-1 was rejected. B (feedback per question) is parked until the content team asks for a teaching-shaped quiz.
260. <a id="decision-2026-08-03-quiz-results-three-calls"></a>3 Aug 2026 · Nelson, from research

     ### Quiz results: three calls

     The pass mark is a target, not a gate. Stacked alerts are relabelled with what to do. "Retry incorrect" is presentation only, over the existing per-problem state.
261. <a id="decision-2026-07-29-page-shell-completion-and-author-rules"></a>29 Jul 2026 · Workshop: Navdeep, Harpreet, Nelson

     ### Page shell, completion and author rules

     One shell for every type. Mark as Complete sits only at the bottom. The author row appears only on authored content that changes over time. Discussion is not a topic type.
262. <a id="decision-2026-07-21-topic-content-types-is-the-shared-vocabulary"></a>21 Jul 2026 · Navdeep, Harpreet and team

     ### "Topic Content Types" is the shared vocabulary

     What a learner sees at topic level is a Topic Content Type; the underlying format is separate. For each type we document format, behaviour, states, completion and assessment logic. The mobile app follows the ICP logic.

<a id="open"></a>

## Open questions

Not decided yet. Each names who has to answer.

Nelson

### SCORM Ready for Dev: the other DS points to decide

The DS audit of 17 Nov 2026 fixed what needed no decision and left 13 points. Four have their own questions above (status variant, program row, meta strip, Alert). The other nine: off-scale spacing (10, 20, 120 px) and the E2 photo radius; a phone variant for Topic-Footer-Nav (6 px gap instead of 16); a text size for the 32 px progress ring ("100%" needs 9 px, the component has 12); Activity-Player without radius in E1; the Modal secondary button's 1 px stroke; publishing the phone home indicator in the DS (16 local copies); a Handoff header component for the frame headers; a component for the player intro paragraph; and the spacing of the simulated package content in A3. Three inconsistencies in the DS itself (checked 20 Nov 2026): the `title-medium` styles are 18 px with the `text-md` line height (24, 26 on phone) while the `text-lg` pair is 28 (resolved 20 Nov 2026: 24 stays, as in the DS and the prototype); `Type/family/highlight` was Montserrat on desktop and Merriweather on tablet and phone (resolved 20 Nov 2026: desktop now Merriweather too; nothing used it); there is no 12 px text style, 12 exists only as the `text-2xs` variable (resolved 20 Nov 2026: the variable stays). About 190 overrides that repeat the component's value can only be reset by hand. [The audit](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/scorm-ds-audit-2026-11-17.md).

Nelson · 17 Nov 2026

### A Status variant on Progress-Card and Course-Header?

Decision 042 says a course that is one package shows *Not started*, *Started* or *Completed*, never a percentage, on the course card, the program row and the course page. Both DS components show only a percentage, so the E2 and E3 status card and hero stay local. Proposal: a variant (e.g. Display = Percent | Status) using the existing Badge, no new tokens, a minor version on each.

Nelson · 17 Nov 2026

### Which component for the E3 program row and the mobile card?

No DS component matches them today. Proposal: the compact Course-Row already used on the Program Page, with the Status display above; a new component only if Course-Row cannot carry it (not checked in the file).

Nelson · 17 Nov 2026

### Does the meta strip become a handoff component?

There is no component for it. Proposal: if it appears only on E2 (desktop, tablet, mobile), keep a local frame on tokens with one dev note; if it is the course header's meta row, it belongs inside Course-Header, not in a component of its own.

Nelson · 17 Nov 2026

### Should the Alert use its Desktop variant?

The E2 Alert uses Breakpoint = Mobile at every size, like the Course Detail [6146-10226](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6146-10226), although the DS has a Desktop variant. Proposal: switch both together so they stay alike; 6146:10226 then needs a new Zeplin export too.

Dev team · answered 9 Nov 2026, follow-ups open

### Who sets the topic types Open edX does not have?

Open edX derives only problem, video and other. Vikas answered on 9 Nov 2026: the hook needs a separate MFE update, Studio tags need a new API, and lighter options exist (block types, unit format, a custom field). Follow-ups: how does the MFE detect Labs today, and can Lesson Page and Podcast use the same way? Is the unit format stock Open edX, set in Studio? Does the Activity label come from SCORM? Do Graded and Practice come from the subsection grading? Still to decide (Nelson): the list in code (recommended) or Studio tags. [topic-types-inventory §6d](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/topic-types-inventory.md).

Komal, Nelson

### Adopt the Figma token names in the dev Storybook?

The mapping lists 12 code tokens whose name means a different role in Figma (e.g. --sko-bg-primary) and 12 with no Figma match yet. Its last section, *What we need to agree*, lists the open points. Since 12 Nov 2026 the 29 *To decide* rows are settled ([the decisions](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/code-token-decisions.md)) and the media-query edges are 1023 / 767; still open: whether the dev team renames the 12 clashing tokens, and whether they take the tokens with the *Publish tokens* plugin into their own repository (since PR 490), in our JSON or W3C DTCG. [The mapping](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/code-token-mapping.md).

Kirti, content team

### A SCORM package that is only a video?

Kirti could not find a SCORM-packaged video in the prototype (11 Nov 2026). The POSH course (course 3 of the test program) has its videos inside the Rise package, playing in Rise's own player. A package that is only a video has not reached us: once the content team shares one, it goes into the test program. If the example is the one from Kirti's analysis (transcript beside the video, .srt download), that is the Open edX Video component with an Azure source, our usual player. Amended 11 Nov 2026: Kirti was told she can test video inside a package in POSH (22 MP4s in the Rise course, Rise's own player, none of ours).

Simran

### Which completion setting do the content team's exports use?

When a package reports completed is set at export, not by us. POSH is exported to complete when its Storyline interaction is finished, while its own opening page tells learners that each section must be marked Complete to record completion. To ask (11 Nov 2026): is that the setting the content team intends, is it the same for every course, and is any package exported as SCORM 2004 (the only version that can send partial progress)? [Meeting notes](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/meeting-2026-11-04-scorm-youtube.md#scorm-progress-checked-11-nov-2026).

Vikas

### How are SkillUp's YouTube videos authored?

Kirti's sample looks like a YouTube embed in a Text component (YouTube's share button and logo), which Open edX cannot track. Authored as a Video component with the YouTube ID, the video plays in our player and completes by itself (rule 035). How many are embeds today? Also on Vikas's discovery ticket: can *Watch on YouTube* be blocked, can progress be synced, can transcripts come through an API. Amended 10 Nov 2026: asked again, on its own: can YouTube play inside our ICP video player, one player for Azure and YouTube? (The prototype does it with YouTube's IFrame API, row 10.) Amended 11 Nov 2026: Vikas answered yes, YouTube videos can play inside our ICP video player. Still open: how many SkillUp videos are embeds today, and the discovery ticket items. Amended 12 Nov 2026: the discovery answered that *Watch on YouTube* cannot be blocked, so the official embed is the only YouTube option (decision 041). Still to confirm with Vikas: does the current theme make an embed fill the content width at 16:9, or does it stay at YouTube's pasted 560 × 315? [Meeting notes](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/meeting-2026-11-04-scorm-youtube.md).

Nelson

### Fluent and Harbor in the DS?

Both skins live only in the prototype (prototype PRs 347–352). Adding them to the DS means more modes in the 🎨 SKO-Semantics collection, and its 10-mode cap is already tight. Amended 26 Oct 2026: the DS work has started. With Red removed ([prototype PR 363](https://github.com/nvjeronimo/skillup-lms-prototype/pull/363)), the colour collection fits five skins × light / dark = 10 modes. Later the same day the Harbor and Fluent colour modes went in (unpublished; see the decision of 26 Oct). Still open: Open Sans has no Medium in Figma. Amended 26 Oct 2026: the radius per skin is in the DS as the "4. Skin shape" collection (published); the component shapes beyond radius (Harbor pills, Fluent strokes) are still prototype-only.

Nelson

### Harbor's selected-state contrast

Harbor's light-blue selected fill (#D9EAFC) is 1.23:1 against the page, below WCAG 1.4.11's 3:1 (prototype PR 349). Accept it, or add a non-colour indicator as Fluent does (a 3px or 4 × 20 brand indicator)? Amended 26 Oct 2026: [prototype PR 368](https://github.com/nvjeronimo/skillup-lms-prototype/pull/368) changed the segmented controls (a track with the selected segment raised on white); the rail, the top-bar items and Pick up are still light blue.

Nelson

### Should Fluent keep Harbor's panel layout?

Fluent shares Harbor's rail, top-bar search and panel patterns (prototype PR 352). The alternative is Fluent with SkillUp's normal navigation. Amended 26 Oct 2026: prototype PRs 356 (the dashboard rows) and 359 (the search palette and the panel-style assistant) extended that shared layout; still open.

Nelson

### Approve Studio for the DS?

Studio replaced Sea on 22 Oct and is prototype-only. If yes: its colours, its pill radius and Studio Dark become DS tokens (each new token needs Nelson's approval), Studio becomes a brand mode beside Gold and Red (Red was removed on 26 Oct 2026), and the screens are drawn in Figma. The Sea question is closed: Sea was removed. Amended 23 Oct 2026: DS 🎨 SKO-Semantics has Studio Light / Studio Dark modes (28 Studio primitives, decision 030); still open: the font (Montserrat until Inter Tight is available in Figma), Studio radius (prototype-only) and the Studio screens in Figma.

Nelson

### Green glance values without a completed icon

On the Dashboard glance the Completed (7) and Certificates (8) values are green (text/success) with no completed icon. The progress-colour rule says green only when complete, always with an icon and a word. Add the icon, or keep these values neutral?

BA

### BR-39 amendment: reduced motion

BR-39 says "use instant transitions". We propose: remove travel, keep opacity and colour feedback. Sent to the BA as a proposal, not applied.

Nelson / team

### Approve the 13 motion tokens

The Figma Motion collection is published in the design-system library (14 Oct 2026). The tokens still await the team's approval; ADR 024 stays proposed until then.

Nelson

### Course card in the list: long titles cut

Since the 14 Oct layout the titles column of the list row is narrower, so longer titles are cut on one line (UX Research and Design Thi…). Keep it, or give the title more room?

Nelson

### View certificate elsewhere

The Certificates tab of the program page and the course-complete modal still write View certificate. Change them to View Certificate too?

Nelson

### What Key Takeaways and Related become

The docked AI Panel had four modes. The floating chat keeps Ask and Chat only. Amended 26 Oct 2026: the floating chat is retired ([prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369)); the assistant window of the Search + Assistant bars keeps Ask and Chat.

Engineering / vendor

### Is an assistant service in scope for the build, and where does the model run?

Nothing in Open edX serves it. The data it reads exists: Learner Home, the Dates API, the course blocks and the Completion API.

Engineering

### Where the first-steps state lives in the product

The prototype keeps it in the browser. In the product it would be a user preference.

Nelson

### The count on the launcher uses the error colour

It can read as a problem, not as things to do.

Nelson

### My Learning filter: counts and the name of the second state

The segments carry no counts (the Button group segment only has a text). The second state reads Not started, as the card says; coming soon was also mentioned.

Nelson

### Dashboard: do the figures count the completed sample program?

The stats left My Learning on 13 Oct, so the question now only concerns the Dashboard: *of 17 enrolled* does not count the five courses of the completed sample program. Should it?

Nelson

### Collapsed sidebar: is the arrow-key way into the topic card announced?

The card opens on focus of a rail row and arrow right moves into it, but the row's name does not tell a screen reader user that a card with a bookmark is there. Not tested with a screen reader.

Nelson

### Reply to Navdeep's Figma comments

His four comments of 12 Oct on the Next asks frame are applied in the design and the prototype. The comments are still open in Figma; a reply was drafted.

Nelson and Navdeep

### A Reading that holds an Open Response

Does it complete by Mark as Complete and the question on Next, like every other Reading, or by the submission? The Open Response screens follow the Reading rule today.

Content team (Kirti, Jaspinder)

### Does the in-page Microsoft lab send a score back?

Two courses (AZ-900 Batch 7, SC-900) load the lab inside the page through an LTI component, and the frame is empty today. If a score comes back, that screen could complete by itself. Kirti is checking with Simran (13 Oct), together with moving the two courses to a new window. Amended 25 Nov 2026: posted as a Figma comment on card [E1](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6792-3199); the Lab screens went to Ready for Dev with this question open.

Nelson and Navdeep

### Download lab: is Mark as Complete disabled until the files are fetched?

The Lab-File-Row component says Mark as Complete stays disabled until every file is downloaded. Navdeep objected to a disabled Mark as Complete on 9 Oct. Keep the gate or drop it?

Nelson, Navdeep and Kirti

### What SkillUp shows for an IBM course

IBM does not share progress and issues the certificate itself (13 Oct). Does the course page keep a dash, or show progress fetched from IBM's report, and how often? Does an IBM course count in a program's progress? Where is the learner told that the certificate comes from IBM? Amended 25 Nov 2026: posted as a Figma comment on card [I1](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6792-139729); the Lab screens went to Ready for Dev with this question open.

Nelson

### Can a Google lab open inside our page?

skills.google refuses to be framed by another site, but Google's LTI launch address has not been tested (we do not have the integration's credentials). Test on staging: set one Google lab's *Open tool in* to *Inline* (or *Modal*) in Studio and check whether it loads. Phase 1 stays on a new tab whatever the answer. Figma comment on card [G1](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6789-901) (25 Nov 2026).

Content team (Kirti)

### The tab counts on the Notifications and Saved panels

The counts were lost with the badge restructure and no record of them was found. They were set again by counting what each panel shows: *All 5 · Discussions 1 · Grading 2 · Updates 2*, and *All 5 · Topics 3 · Notes 2*. To confirm.

Nelson

### Sidebar or top bar on the platform pages

Still under study (7 Oct). The screens show a top bar, but neither is final. Build the page content so it works with either.

Nelson

### What the top bar's counters and sections read

*My Learning 4* and *Calendar 3* have no defined source, and *Learner · Pro* has none either. Calendar and Discussion have no global page in Open edX: dates and forums are per course. Amended 17 Oct 2026: the Calendar count is now defined as the deadlines of the next seven days, and Calendar and Discussion have proposal pages that merge one call per enrolled course (see the 17 Oct decision); what remains open is the other counters. Amended 28 Oct 2026: deadlines are examples only today (no due dates are configured, decision 036), so the Calendar count would hold live sessions only.

Vendor

### Where does the Program page read from?

Discovery plus program progress, or the marketing site's backend. Until this is answered, *What's included*, *What You Will Create* and *Exercises to Explore* are not guaranteed, and neither is the program certificate.

Dev team / vendor

### Is course search switched on in SkillUp's environment?

Open edX has it behind a setting per course, with a search index behind it. Asked to the dev team on 8 Oct. Until it is confirmed, the content search screens are a design, not a build target.

Nelson

### What the search calls each type of content

The screens say *Text · Video · Quiz · Lesson* for what Open edX returns as Text, Video, CAPA and Sequence. Open edX itself says *Section* and puts problems under *Other*.

Vendor

### A completion figure without a call per course

My Learning needs one Progress call for each enrolled course to show a percentage. A figure on Learner Home would remove them.

Nelson

### The 8 extra badge colours and "Soft Light"

The **Extra** group (Cyan, Blue, Indigo, Violet, Purple, Fuchsia, Pink, Orange) and the fifth style, Soft Light, still sit on Untitled UI primitives, not SKO tokens. Keep them as real tokens, with SKO or approved ramps, or drop them. "Soft" and "Soft Light" also clash as names. The eight extra hues have a text token but no icon token: since 12 Oct their dot, icons and close use the text one, and in the Plain style their icon disc is still teal.

Nelson

### The Mobile App file and the V1 badge

The V1 badge set was deleted from the library on 12 Oct. Nothing in the design system pages we use or in the ICP file used it. The Mobile App file was not checked: a V1 badge still there keeps showing but no longer updates, and has to move to Badge.

Navdeep / engineering

### Keep three types, or add more?

A Reading with a knowledge check or ORA becomes "problem". Do we want labels like "Assessment only when graded"? That means a custom rule.

Navdeep / engineering

### Where does "N min approx." come from?

It is not part of the type rule, and the course API returned null durations in August.

Nelson + PMs

### Does Podcast stay a type?

It now renders as a video. Retire it, or keep it for a future audio player.

PMs

### Author row on topics

Still pending, per Simran on 22 Sep.

Product

### A download button for files

Today a PDF opens in a new tab. A download button would be an add-on feature.

Engineering

### Author colour and justified text

The editor allows both. The recommendation is to ignore colour and font, and render justify as left on mobile.

Nelson

### Zeplin or Figma as source of truth

The answer depends on whether annotations and token names survive an export. Test with one tab, not the docs.

Nelson

### Completion Status vs Course Detail Marker

Merge into one component? The "In Progress" state has never been used.

Nelson

### The Reading "Review" state

Topic-Status-Badge has a Review state that no rule defines. Either it earns a rule or it goes. The card that showed it was removed from the Reading screens on 12 Oct 2026; the state is still in the component.

Content team (Rupali, Simran, Saransh)

### Is there a teaching-shaped quiz?

If so, quiz mode B comes back into scope.

Nelson

### Download certificate, and the issued program certificate

Download certificate: what the file is (PDF of the sheet?) and how it is served — not designed; the prototype shows a toast. Program certificate issued state not drawn (only not earned). Whether a program issues a certificate of its own, besides its courses', is still to decide (the prototype shows one for Data Analytics Foundations as a proposal). Amended 30 Oct 2026: the earned program certificate is drawn on My Certificates (Program-Certificates-Card, State=Earned: sheet, Earned, View certificate, Share; [prototype PR 428](https://github.com/nvjeronimo/skillup-lms-prototype/pull/428)); the file behind Download and whether a program issues its own certificate are still open. Amended 3 Nov 2026 ([decision 039](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/039-certificate-download-on-page-only.md) ([docs PR 244](https://github.com/nvjeronimo/skillup-lms-prd/pull/244), merged)): Download is only on the certificate page, cards and rows show View and Share; what the file is stays open. Amended 3 Nov 2026 (prototype PRs [456](https://github.com/nvjeronimo/skillup-lms-prototype/pull/456), [459](https://github.com/nvjeronimo/skillup-lms-prototype/pull/459), merged): the prototype no longer shows a toast. Download prints the sheet alone (A4 landscape, Save as PDF) and is visible in the Open edX scope; the file the vendor serves is still open.

Nelson

### A long module name on the Dashboard rows

Since 12 Oct the headline of the row is the module. The design system Course-Row cuts it to one line; the prototype lets it wrap, as it did with the course title, and uses the stacked row when the list is narrower than 700 px. One rule for both is still to choose.

Nelson

### Part of the buttons in the ICP file are on an older copy of the library

After the publishes of 12 Oct, 57 of the 132 buttons on the platform Ready for Dev page were still tied to an older state of Button; the other pages were not counted. Nothing shows, since only hover states and token names changed. Reloading the file and accepting the updates again should bring them over.

Nelson

### Should a Badge show only its label by default

The Badge has its dot, both icons and the close on by default, so a component that loses its overrides on a library update shows all of them. It happened on 12 Oct on 994 badges and was repaired by hand. With the options off by default it could not happen.

Nelson

### Which module two WIP course rows show

Two rows on the WIP page are titled with a program name, AI-Driven Digital Marketing, and show the sample module and topic.

<a id="docs"></a>

## Documents

The handoff package, grouped by what you need it for. Most files live in LMS-HANDOFF/.

### Start here

* [README](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/README.md) · Project overview and the index of the package
* [Product context](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/PRODUCT.md) · Users, constraints and principles that bind every design
* [Executive summary](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/BA/01-executive-summary.md) · 10-minute overview, locked decisions, risks
* [Glossary](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/BA/06-glossary.md) · The content hierarchy and topic-type vocabulary; read before the stories
* [Changelog](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/CHANGELOG.md) · Every change to screens and design system, dated

### Content types

* [Topic types inventory](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/topic-types-inventory.md) · The 12 types, volumes, phase scope, build contract
* [Reading screen matrix](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/reading-screen-matrix.md) · Every Reading screen and rule, Studio facts, the type rule (§17)
* [Lab on third-party platforms](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/lab-third-party-platforms.md) · Google, Microsoft and IBM labs: what was verified, the screens, what is pending
* [Video screens spec](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/screens-spec.md) · The Phase 1 video lesson flow
* [Overlay panels spec](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/overlay-panels-spec.md) · Notifications and Saved panels

### Quizzes and ORA

* [Two modes (A-2 chosen)](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/quizzes/08-two-modes.md) · The quiz experience decision and component contract
* [Quiz screen matrix](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/quizzes/06-quiz-screen-matrix.md) · Every state an author's settings can produce
* [Handoff map](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/quizzes/09-handoff-map.md) · Each component property and what really controls it
* [Results decisions](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/quizzes/07-results-decisions.md) · Pass mark, alerts, retry
* [ORA explained](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/quizzes/05-ora-explained.md) · Open Response, and what it means for design
* [Open edX quiz capabilities](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/quizzes/01-edx-quiz-capabilities.md) · Full reference with sources

### Platform and Studio research

* [Studio authoring parity](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/studio-authoring-parity.md) · Every Studio component mapped to a design system piece
* [Open edX component types](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/edx-component-types-reference.md) · Full reference, July research
* [edX parity audit](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/edx-parity-audit.md) · Our LMS vs the edX learner guide
* [Feature deltas](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/feature-deltas.md) · What we cover, what is ours only, what we still need
* [Course details metadata map](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/course-details-metadata-map.md) · Every element of Course Detail and the platform pages mapped to its Open edX field; §37 is the compatibility map
* [Navigation flow](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/platform-navigation-flow.md) · Where every way out of Dashboard, My Learning, Program, Course and the player leads, with what is decided and what is open
* [Program page payload](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/program-page-payload-2026-10-01.json) · What the current platform returns for a program, without prices
* [Prototype audit, 21 Oct 2026](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/04-research/prototype-audit-2026-10-21.md) · Accessibility 3.5/4, responsive 3/4, theming 4/4, integrity 3.5/4, Nielsen heuristics 23/40; every P0 fixed
* [Meeting 28 Oct 2026: Progress, Dates and Mentorship Q&A](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/meeting-2026-10-28-progress-dates-qa.md) · The ICP review call: Progress approved, the Dates tab hidden on self-paced courses (decision 036), Mentorship Q&A on hold
* [Open edX notifications](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/edx-notifications.md) · The four notification types Open edX sends (decision 035)
* [Open edX Dates tab](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/edx-dates-tab.md) · The date types and badges Open edX shows (decision 035)
* [Mentorship Q&A on Open edX](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/edx-mentorship-qa.md) · Public question posts in the course discussions; no private 1-to-1 messaging (decision 035)
* [Open edX fit audit](https://claude.ai/artifact/BYDbfEMyUSygpPDpZoo9U9) · 613 items checked against Open edX, 191 invented, 17 themes to decide
* [Session log](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/session-log.md) · Who said what, when, and how sure they were

### Business analysis

* [Business rules](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/BA/03-business-rules.md) · BR-01 to BR-47, referenced by the stories
* [User stories, Phase 1](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/BA/02-user-stories-phase1.md) · 73 stories with Gherkin acceptance criteria
* [Edge cases and failures](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/BA/04-edge-cases-failures.md) · What happens when things go wrong
* [Feature roadmap](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/BA/05-feature-roadmap.md) · Three delivery phases
* [FRD gap analysis](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/BA/FRDs/01-gap-analysis-vs-screens.md) · Rashid's official FRDs vs our screens

### Design system and build

* [SKO Design System · Index](https://claude.ai/code/artifact/ad6dc6ec-8243-4ef8-a343-041b3739e3e8) · The design system documents: plan, component naming, manual for designers, final token names, with the Figma frames
* [Components inventory](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/components-inventory.md) · LMS components, variants and tokens
* [SKO DS components used in the ICP and LMS screens](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/ds-components-used-icp-lms.md) · Which design system components the screens use, with counts per page (recounted 8 Oct 2026)
* [Variable collections guide](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/variable-collections-guide.md) · The DS variable collections (Portuguese)
* [Library requests](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/library-requests.md) · What belongs in the shared DS, not in our file
* [Phase 1 readiness](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/phase1-readiness.md) · Behaviours no static screen shows: a11y, events, motion
* [Storybook coverage](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/storybook-coverage.md) · One story file per component
* [Code → Figma token mapping](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/code-token-mapping.md) · Every --sko-\* token in the dev Storybook and the Figma token that replaces it, with the exported token package (12 Nov 2026)
* [Token decisions (To decide rows)](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/code-token-decisions.md) · The 29 rows settled on 12 Nov 2026: letterbox, off-scale type and spacing, skin radii, no new token
* [Publish tokens plugin](https://github.com/nvjeronimo/skillup-lms-prototype/blob/main/figma-plugin/README.md) · Figma DS → prototype PR, a token PR on any GitHub repository (our dev token package or the dev team's: branch, folder, our JSON or W3C DTCG), or a download; how to install it
* [Figma API traps](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/LMS-HANDOFF/figma-api-traps.md) · 40 things that fail quietly
* [Assistant · design spec (prototype)](https://github.com/nvjeronimo/skillup-lms-prototype/blob/main/docs/superpowers/specs/2026-10-13-assistant-design.md) · The floating chat: where it sits, what it answers, what it never does, script and model. Since 26 Oct 2026 the floating launcher is retired; the assistant opens from Search + Assistant ([prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369))
* [First steps · design spec (prototype)](https://github.com/nvjeronimo/skillup-lms-prototype/blob/main/docs/superpowers/specs/2026-10-13-first-steps-design.md) · The five first steps, how each ticks itself, and the next step in an empty chat

<a id="components"></a>

## Components

Every component the ICP and LMS screens use, with its version and its Figma link. Since 8 Oct 2026 the LMS components are named LMS/ICP/&lt;Group&gt;/&lt;Component&gt; for the course player and LMS/Platform/&lt;Group&gt;/&lt;Component&gt; for the pages around it; the name each one had before is shown under it. Versions are MAJOR.MINOR and move only when the library is published: MAJOR when a property, a variant or the structure changes in a way that breaks what was built; MINOR when something is added or the look changes and the previous code still works; descriptions, links, layer names and renames change nothing. Baseline on 8 Oct 2026: 1.0 for every component. Since 13 Oct 2026 every component is at version 1.x until engineering has built it, so none is at 2. Usage was counted on 8 Oct 2026 on ten pages (the Lab page included); a component with no count is on none of them. AI-Panel was recounted on 13 Oct 2026: it is on no screen. Since 10 Oct the screens and the LMS components use Button, Link Button and Icon Button; the previous Buttons/Button is marked Legacy and has no instance left on the pages counted, and its utility and close X are now Utility Button and Close Button. The button and badge rows were recounted on 12 Oct. Button is v1.3 since 13 Oct 2026 (every variant hugs its content), Link Button v1.2 since 15 Oct 2026 (hover darkens, no fill); Icon Button is v1.2 since 12 Oct 2026 (hover states and tokens by role). Since 20 Oct 2026 ([decision 028](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/028-radius-roles.md)) 66 components moved up one MINOR for the radius roles, among them Button 1.4, Icon Button 1.3, Utility Button 1.1, Button group 1.2 and Progress bar 1.1; every version below follows the register. No component name carries a version: the version is in this column and in the Figma description. “In review” means the component is on the page “LMS · In review / not for build” and engineering does not build it yet.

In Figma each group has its own page: ICP: [Player](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22453-582663), [Sidebar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22453-583007), [Content](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22453-584289), [Topics](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22453-585407), [Assessment](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22453-586518), [Live](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22453-588050), [Shared](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22453-588652). Platform: [Navigation](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22446-4399), [Dashboard](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22450-3405), [My Learning](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22453-3328), [Discovery](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22453-3620), [Program Detail](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22453-579629), [Course Detail](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22453-579878), [Completion](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22453-582202). [Start here](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22458-35) maps the whole file.

[SKO DS components used in the ICP and LMS screens: where each one is used, with counts per page](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/ds-components-used-icp-lms.md)

[The versioning convention and the register](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/03-design-system/component-versions.md)

LMS · ICP, the course player (LMS/ICP/…) 78

| Component | Version | Status | Variants | Used in | Last change recorded |
| --- | --- | --- | --- | --- | --- |
| Player 4  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Course-Progression-Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537755 "LMS/ICP/Player/Course-Progression-Button")** <br>was “LMS / Course Progression Button” | v1.1 | Published | 7 | ICP + LMS<br>ICP 374 · LMS 4 | 27 Oct 2026 · Milestone=Next-Topic-Complete<br>1.1 (published 27 Oct, Impeccable session): Milestone=Next-Topic-Complete, Brand Primary; Next is Primary only when the topic is complete. ICP: Next-Topic-Complete on the 14 screens whose open topic is complete. Earlier: 8 Oct 2026: Renamed from “LMS / Course Progression Button” |
| **[Topbar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537695 "LMS/ICP/Player/Topbar")** <br>was “LMS / Course Player Topbar” | v1.10 | Published | 6 | ICP + LMS<br>ICP 145 · LMS 2 | 29 Oct 2026 · tablet avatar<br>1.10 (published 29 Oct): tablet avatar. Earlier: 1.9 (published 28 Oct): the SkillUp logo is the LMS/Brand/SkillUp-Logo 1.0 instance. Earlier: 1.8 (published 26–27 Oct): Theme-Switch sm on every size, Search-Pill on desktop, Search-Assistant-Button sm on tablet and phone; the library now serves it (checked 27 Oct). The ICP's 21 player Topbars on the Reading page still show the old Theme toggle until the library update is accepted in the ICP. Earlier: 1.7: Mobile is three equal columns (course menu + progress ring left, SkillUp wordmark centred, Bookmark / avatar / Close right); no bell and no theme button on a phone (the theme switch is the Profile Menu's Dark theme row). Doc anatomy for Mobile and Desktop ([prototype PR 216](https://github.com/nvjeronimo/skillup-lms-prototype/pull/216)). Earlier: 1.6 (20 Oct): Learner avatar on Radius/control (6, was fixed-md 8); every radius on the role tokens (decision 028). Earlier: 1.5: Dark Mobile learner avatar renders dark (fresh Avatar instance) ([docs PR 132](https://github.com/nvjeronimo/skillup-lms-prd/pull/132)). 1.4: learner avatar is a rounded square (Radius/fixed-md), not a circle ([prototype PR 204](https://github.com/nvjeronimo/skillup-lms-prototype/pull/204), [docs PR 131](https://github.com/nvjeronimo/skillup-lms-prd/pull/131)). 1.1–1.2 (16–17 Oct): theme toggle in the bar (Utility Button sm Tertiary, moon-01 / sun), hidden layers removed. Amended 26 Oct 2026: the prototype replaces that Utility Button with the ThemeSwitch Button group, Sun and Moon ([prototype PR 365](https://github.com/nvjeronimo/skillup-lms-prototype/pull/365)). Since the DS publish of 26 Oct the DS Topbar has it too: Theme-Switch sm on every size, the Search-Pill on desktop and the Search-Assistant-Button on tablet and phone. 1.3 (19 Oct): the learner is John Smith with the JS initials avatar on all six variants, as on the platform Topbar (it showed the UI-kit Olivia Rhye). [docs PR 126](https://github.com/nvjeronimo/skillup-lms-prd/pull/126) |
| **[Topic-Footer-Nav](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20053-3286 "LMS/ICP/Player/Topic-Footer-Nav")** <br>was “LMS / Topic Footer Nav” | v1.3 | Published | 1 | ICP + LMS<br>ICP 166 · LMS 2 | 28 Oct 2026 · counter is course-wide ("7 of 27") (SKO match audit)<br>1.3 (published 28 Oct, SKO match audit): counter is course-wide ("7 of 27"). Earlier: 20 Oct 2026: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Show Badge and its status badge removed; the footer has no completion control |
| **[Vertical-Scroll](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537649 "LMS/ICP/Player/Vertical-Scroll")** <br>was “Vertical Scroll” | v1.0 | Published |  | ICP + LMS<br>ICP 157 · LMS 2 | 8 Oct 2026<br>Renamed from “Vertical Scroll” |
| Sidebar 12  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Bookmark](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536827 "LMS/ICP/Sidebar/Bookmark")** <br>was “bookmark” | v1.0 | Published |  | ICP + LMS<br>ICP 157 · LMS 4 | 8 Oct 2026<br>Renamed from “bookmark” |
| **[Collapse-Toggle](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536832 "LMS/ICP/Sidebar/Collapse-Toggle")** <br>was “sidebar-expand-collapse-toggle” | v1.1 | Published |  | ICP + LMS<br>ICP 95 · LMS 2 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Completion-Status](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536791 "LMS/ICP/Sidebar/Completion-Status")** <br>was “LMS / Completion Status” | v1.0 | Published | 3 | ICP + LMS<br>ICP 643 · LMS 189 | 8 Oct 2026<br>Renamed from “LMS / Completion Status” |
| **[Course-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536868 "LMS/ICP/Sidebar/Course-Header")** <br>was “LMS / Sidebar / Course Header” | v1.1 | Published | 1 | ICP + LMS<br>ICP 95 · LMS 2 | 25 Oct 2026 · condenses on scroll<br>1.1: condenses on scroll to the course name and Overall progress; toggle beside the column, Show overline. ICP WIP frame [“14 · Sidebar header on scroll”](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7802-92815) ([prototype PR 327](https://github.com/nvjeronimo/skillup-lms-prototype/pull/327)). Earlier: 8 Oct: renamed from “LMS / Sidebar / Course Header” |
| **[Lesson-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536863 "LMS/ICP/Sidebar/Lesson-Header")** <br>was “LMS / Lesson Header” | v1.1 | Published | 1 | ICP + LMS<br>ICP 174 · LMS 34 | 29 Oct 2026 · rebuild, text-xs<br>1.1 (published 29 Oct): no visual change; republished so ICP instances move to the current text-xs variable (13/18 on desktop and tablet). Earlier: 8 Oct 2026: Renamed from “LMS / Lesson Header” |
| **[Module-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536844 "LMS/ICP/Sidebar/Module-Header")** <br>was “LMS / Module Header” | v1.2 | Published | 2 | ICP + LMS<br>ICP 285 · LMS 6 | 30 Oct 2026 · lock note not used<br>1.2 (published 30 Oct): the Lock-Note fills the header; the lock note under a locked module is no longer used (Nelson, 30 Oct; keep Show lock note off). Earlier: 1.1: new properties, off by default: Show lock note + Lock note (Course Journey proposal) ([docs PR 207](https://github.com/nvjeronimo/skillup-lms-prd/pull/207) (merged)). Earlier: renamed from “LMS / Module Header” |
| **[Module-Info](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21299-7173 "LMS/ICP/Sidebar/Module-Info")** <br>was “LMS / Module Info” | v1.4 | Published | 2 | ICP + LMS<br>ICP 285 · LMS 6 | 30 Oct 2026 · row wraps<br>1.4 (published 30 Oct): the row wraps instead of cutting "2 of 9 topics" in a 280 sidebar. Earlier: 1.3 (published 29 Oct): Status=Module In progress hugs its height (was fixed 14), so the 13/18 eyebrow fits without clipping; Module-Header grows from 86 to 90. Earlier: 27 Oct 2026 · Course Journey promoted: 1.2 (published 27 Oct, Impeccable session): with Sidebar 1.5, the Course Journey promoted ("N of M topics", Module 3 of 3, lock reasons). ICP: on all 219 Sidebar instances (sweep done 27 Oct). Earlier: 25 Oct 2026: 1.1: Completed is Badge Soft sm Success, no icon ([prototype PR 320](https://github.com/nvjeronimo/skillup-lms-prototype/pull/320), [prototype PR 323](https://github.com/nvjeronimo/skillup-lms-prototype/pull/323), [docs PR 208](https://github.com/nvjeronimo/skillup-lms-prd/pull/208) (merged), [docs PR 210](https://github.com/nvjeronimo/skillup-lms-prd/pull/210) (merged)). Earlier: Renamed from “LMS / Module Info” |
| **[Overall-Progress](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536988 "LMS/ICP/Sidebar/Overall-Progress")** <br>was “LMS / Overall Progress” | v1.1 | Published | 3 | ICP + LMS<br>ICP 97 · LMS 8 | 14 Oct 2026<br>Mobile uses the Progress circle |
| **[Section-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536865 "LMS/ICP/Sidebar/Section-Header")** <br>was “LMS / Section Header” | v1.0 | Published | 1 | not placed on the pages counted | 8 Oct 2026<br>Renamed from “LMS / Section Header” |
| **[Sidebar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536883 "LMS/ICP/Sidebar/Sidebar")** <br>was “LMS / Sidebar-ICP” | v1.7 | Published | 7 | ICP + LMS<br>ICP 133 · LMS 2 | 30 Oct 2026 · boxed modules, width on the grid<br>1.7 (published 30 Oct, Nelson): each module in its own box in every skin (Expanded, Mobile and Mobile · noLesson): list on bg/faint, Spacing/md padding, Spacing/lg between boxes, box on bg/page with border/subtle and Radius/card-inset; the "· boxed" variants now match and can be retired. ICP: 136 Expanded instances sized by [decision 037](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/037-course-journey-sidebar-width.md) (1440 → 334, tablet → 280; Video 20, Quizzes 44, Reading 14, Lab 29, Activity 26, Overlay 2, Completion 1); drawers stay 320 ([prototype PR 434](https://github.com/nvjeronimo/skillup-lms-prototype/pull/434), [docs PR 239](https://github.com/nvjeronimo/skillup-lms-prd/pull/239)). Earlier: 1.6 (published 29 Oct, Nelson): the desktop panel (Expanded and Expanded · boxed) is 320 wide, like the phone drawer, so topic titles wrap less; 320 from 1280 up, 280 below ([prototype PR 425](https://github.com/nvjeronimo/skillup-lms-prototype/pull/425), merged). ICP: 138 Expanded instances on the 1440 screens of 8 pages widened to 320; tablet, phone and collapsed untouched. Earlier: 27 Oct 2026 · Course Journey promoted: 1.5 (published 27 Oct, Impeccable session): the Course Journey proposal promoted: the "Course journey" panel name, Up next, lock reasons, "N of M topics", Module 3 of 3. ICP sweep done: 219 LMS Sidebar instances (Video 30, Quizzes 57, Reading 21, Lab 48, Activity 46, AI Assistant 4, WIP 13) show Up next after the open row, lock reasons on locked rows, "N of M topics", "Module i of N" and the overline; Course-Progression-Button Next-Topic-Complete on the 14 screens whose open topic is complete. WIP frame 7778:101772 renamed [13 · Course Journey (promoted 27 Oct, now the default Sidebar)](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7778-101772). Earlier: 25 Oct 2026 · boxed variants (Studio test): 1.4: adds Expanded · boxed and Mobile · boxed, each module in its own box (Studio test; [prototype PR 335](https://github.com/nvjeronimo/skillup-lms-prototype/pull/335), [prototype PR 336](https://github.com/nvjeronimo/skillup-lms-prototype/pull/336)); published; [ICP WIP frame 15 · Studio sidebar module boxes](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7812-94269) (node 7812:94269): Studio desktop (Expanded · boxed), Studio drawer (Mobile · boxed), SKO for comparison. Earlier: 1.3: "Course menu" becomes Course Journey: the mobile drawer title, and in the player Topbar the buttons "Open Course Journey" and "Close Course Journey" ([prototype PR 263](https://github.com/nvjeronimo/skillup-lms-prototype/pull/263), [docs PR 168](https://github.com/nvjeronimo/skillup-lms-prd/pull/168)). No ICP screen shows the drawer title. Earlier: 1.2 (20 Oct): corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: The collapsed variants show the rail bookmark on the saved topic; the flyout is described |
| **[Topic-Flyout](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22479-1867 "LMS/ICP/Sidebar/Topic-Flyout")** | v1.1 | Published | 1 | new on 13 Oct, not counted | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: New. The card that opens beside the collapsed sidebar on a rail row: the title, the topic type and the bookmark button |
| **[Topic-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537000 "LMS/ICP/Sidebar/Topic-Row")** <br>was “LMS / Topic Row” | v1.6 | Published | 9 | ICP + LMS<br>ICP 563 · LMS 14 | 30 Oct 2026 · meta line wraps<br>1.6 (published 30 Oct): Meta-Row fills and wraps, so "Reading · 8 min read approx." is never cut in a 280 sidebar; Lock-Reason fills. Earlier: 1.5 (published 29 Oct): readable texts at body-medium. Earlier: 1.4: new properties, off by default: Show Up next; Show lock reason + Lock reason (Course Journey proposal) ([docs PR 207](https://github.com/nvjeronimo/skillup-lms-prd/pull/207) (merged)). Earlier: new boolean Optional bound to the Optional-Chip (v1.2: The duration is an instance of LMS / Duration (Time + Approx)). Earlier: Prints its duration with LMS / Duration: the time, then approx. when it is an estimate |
| Content 13  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Author-and-Updated-Date](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20454-705641 "LMS/ICP/Content/Author-and-Updated-Date")** <br>was “LMS / Topic · Author & Updated Date” | v1.1 | Published | 1 | ICP<br>ICP 62 | 28 Oct 2026 · initials avatar, no online dot (SKO match audit)<br>1.1 (published 28 Oct, SKO match audit): initials avatar, no online dot. Earlier: 8 Oct 2026: Renamed from “LMS / Topic · Author & Updated Date” |
| **[Content-Feedback](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537661 "LMS/ICP/Content/Content-Feedback")** <br>was “LMS / Content Feedback” | v1.2 | Published | 1 | ICP + LMS<br>ICP 150 · LMS 2 | 5 Nov 2026 · follows 5. Scope<br>1.2 (5 Nov): what Open edX does not have is bound to scope/beyond-edx (DS collection 5. Scope), so it hides in Open edX only. Earlier: 1.1 (13 Oct): new Show Mark as Complete (off by default): the Mark as Complete action at the right end of the row; it drops under the feedback when the row is narrow |
| **[File-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537612 "LMS/ICP/Content/File-Item")** <br>was “LMS / File Item” | v1.1 | Published | 4 | ICP<br>ICP 37 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Mobile-Tab-Select](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19995-7247 "LMS/ICP/Content/Mobile-Tab-Select")** <br>was “LMS / Mobile Tab Select” | v1.1 | Published | 3 | LMS<br>LMS 1 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Note-Editor](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22071-6813 "LMS/ICP/Content/Note-Editor")** <br>was “LMS / Note Editor” | v1.3 | Published | 3 | ICP<br>ICP 6 | 28 Oct 2026 · "ANCHORED TO 0:38", quote in a grey block (SKO match audit)<br>28 Oct (published, SKO match audit; version unchanged): "ANCHORED TO 0:38", quote in a grey block. Earlier: 20 Oct 2026: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: The anchored quote is the Transcript-Line component (State=Active) |
| **[Note-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537594 "LMS/ICP/Content/Note-Item")** <br>was “LMS / Note Item” | v1.2 | Published | 1 | ICP<br>ICP 19 | 28 Oct 2026 · pencil + trash actions (SKO match audit)<br>28 Oct (published, SKO match audit; version unchanged): pencil + trash actions. Earlier: 20 Oct 2026: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: The anchored quote is the Transcript-Line component (State=Active). Documented as a molecule since 14 Oct, because it nests Transcript-Line |
| **[Numbered-Step](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3297 "LMS/ICP/Content/Numbered-Step")** <br>was “LMS / Numbered Step” | v1.0 | Published | 1 | ICP<br>ICP 111 | 8 Oct 2026<br>Renamed from “LMS / Numbered Step” |
| **[Sync-to-Video-Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20214-1771167 "LMS/ICP/Content/Sync-to-Video-Button")** <br>was “LMS / Sync to Video Button” | v1.0 | Published | 2 | ICP + LMS<br>ICP 5 · LMS 2 | 8 Oct 2026<br>Renamed from “LMS / Sync to Video Button” |
| **[Thread-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537651 "LMS/ICP/Content/Thread-Item")** <br>was “LMS / Thread Item” | v1.2 | Published | 1 | not placed on the pages counted | 24 Oct 2026<br>1.2: a panel row: no radius, no shadow, a rule underneath only, padding 16/24 (Nelson preferred the ICP notifications panel 7497:132529 for every panel). Published. ([prototype PR 311](https://github.com/nvjeronimo/skillup-lms-prototype/pull/311), [prototype PR 313](https://github.com/nvjeronimo/skillup-lms-prototype/pull/313), [docs PR 204](https://github.com/nvjeronimo/skillup-lms-prd/pull/204) (merged)). Earlier: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Topic-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537676 "LMS/ICP/Content/Topic-Header")** <br>was “LMS / Topic Header” | v1.1 | Published | 1 | ICP + LMS<br>ICP 167 · LMS 2 | 14 Oct 2026<br>Prints its duration with LMS / Duration: the time, then approx. when it is an estimate |
| **[Topic-Status-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20066-431924 "LMS/ICP/Content/Topic-Status-Badge")** <br>was “Topic-Status-Badge” | v1.0 | Published | 3 | ICP<br>ICP 58 | 8 Oct 2026<br>Renamed from “Topic-Status-Badge” |
| **[Topic-Types-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536800 "LMS/ICP/Content/Topic-Types-Badge")** <br>was “LMS / Topic-Types Badge” | v1.0 | Published | 14 | ICP + LMS<br>ICP 746 · LMS 317 | 8 Oct 2026<br>Renamed from “LMS / Topic-Types Badge” |
| **[Transcript-Line](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537556 "LMS/ICP/Content/Transcript-Line")** <br>was “LMS / Transcript Line” | v1.1 | Published | 4 | ICP + LMS<br>ICP 108 · LMS 12 | 15 Oct 2026<br>Side padding on Container/content-padding (24 / 20 / 16); as a quote in Note-Item and Note-Editor it keeps 16 by override |
| Topics 17  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Activity-Fullscreen-Bar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22847-1893 "LMS/ICP/Topics/Activity-Fullscreen-Bar")** | v1.0 | Published | 2 | new on 19 Oct, not counted | 19 Oct 2026<br>Topic name and Exit fullscreen over a SCORM package, Desktop and Mobile. [docs PR 125](https://github.com/nvjeronimo/skillup-lms-prd/pull/125) |
| **[Activity-Launch-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22847-1981 "LMS/ICP/Topics/Activity-Launch-Card")** | v1.0 | Published | 3 | new on 19 Oct, not counted | 19 Oct 2026<br>Launch card for a package that opens in a new window: Ready · Opened · Blocked. [docs PR 125](https://github.com/nvjeronimo/skillup-lms-prd/pull/125) |
| **[Activity-Player](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22847-1852 "LMS/ICP/Topics/Activity-Player")** | v1.0 | Published |  | new on 19 Oct, not counted | 19 Oct 2026<br>The frame a SCORM package plays in: Fullscreen toolbar + Package slot. [docs PR 125](https://github.com/nvjeronimo/skillup-lms-prd/pull/125) |
| **[Activity-SCORM-Frame](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3488 "LMS/ICP/Topics/Activity-SCORM-Frame")** <br>was “LMS / Activity · SCORM Frame” | v1.0 | Published | 4 | ICP<br>ICP 5 | 8 Oct 2026<br>Renamed from “LMS / Activity · SCORM Frame” |
| **[Lab-File-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3330 "LMS/ICP/Topics/Lab-File-Row")** <br>was “LMS / Lab · File Row” | v1.1 | Published | 2 | ICP<br>ICP 8 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Lab-Launch-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22251-6427 "LMS/ICP/Topics/Lab-Launch-Card")** <br>was “LMS / Lab · Launch Card” | v1.1 | Published | 3 | ICP<br>ICP 32 | 12 Oct 2026<br>Completed removed; Opened shows the date of the first opening; Skip removed from Unavailable |
| **[Lesson-Block](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3682 "LMS/ICP/Topics/Lesson-Block")** <br>was “LMS / Lesson Block” | v1.2 | Published | 12 | ICP<br>ICP 118 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Kind=HTML (Blockquote) is a typographic pull quote: no box, no 4px stripe; lucide Quote icon in icon/primary |
| **[ORA-Grade-Panel](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3634 "LMS/ICP/Topics/ORA-Grade-Panel")** <br>was “LMS / ORA · Grade Panel” | v1.1 | Published | 4 | ICP<br>ICP 2 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[ORA-Rubric-Criterion](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3563 "LMS/ICP/Topics/ORA-Rubric-Criterion")** <br>was “LMS / ORA · Rubric Criterion” | v1.1 | Published | 2 | ICP<br>ICP 4 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[ORA-Stepper](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3534 "LMS/ICP/Topics/ORA-Stepper")** <br>was “LMS / ORA · Stepper” | v1.2 | Published | 10 | ICP<br>ICP 20 | 22 Oct 2026<br>Completed steps are a green check and a green label on bg/page (no green tint); the current step on bg/primary-soft is the only coloured segment; upcoming on bg/faint. The Response current-segment fill fixed. In the prototype also Size=Compact below sm and the peer label from the review quota ("Review 1 peer") ([prototype PR 254](https://github.com/nvjeronimo/skillup-lms-prototype/pull/254), [docs PR 166](https://github.com/nvjeronimo/skillup-lms-prd/pull/166)). ICP: 15 instances on Topic Content Types updated. Earlier: 1.1 (20 Oct): corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[ORA-Submit-Gate](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20344-3359 "LMS/ICP/Topics/ORA-Submit-Gate")** <br>was “LMS / ORA · Submit Gate” | v1.1 | Published | 1 | ICP<br>ICP 1 | 28 Oct 2026 · "goes to your mentor for grading" (staff-graded samples)<br>1.1 (published 28 Oct, staff-graded samples): "goes to your mentor for grading". Earlier: 20 Oct 2026: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[ORA-Text-Response](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21692-536524 "LMS/ICP/Topics/ORA-Text-Response")** <br>was “LMS / ORA · Text Response” | v1.0 | Published | 3 | ICP<br>ICP 8 | 8 Oct 2026<br>Renamed from “LMS / ORA · Text Response” |
| **[ORA-Upload](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3584 "LMS/ICP/Topics/ORA-Upload")** <br>was “LMS / ORA · Upload” | v1.2 | Published | 2 | ICP<br>ICP 6 | 29 Oct 2026 · 1.2: readable texts at body-medium<br>1.2 (published 29 Oct): readable texts at body-medium. Earlier: 1.1 (20 Oct 2026): corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[ORA-Waiting-Panel](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3591 "LMS/ICP/Topics/ORA-Waiting-Panel")** <br>was “LMS / ORA · Waiting Panel” | v1.1 | Published | 4 | ICP<br>ICP 3 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Podcast-Chapter-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3449 "LMS/ICP/Topics/Podcast-Chapter-Row")** <br>was “LMS / Podcast · Chapter Row” | v1.1 | Published | 2 | ICP<br>ICP 3 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Podcast-Player](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3337 "LMS/ICP/Topics/Podcast-Player")** <br>was “LMS / Podcast · Player” | v1.0 | Published | 1 | ICP<br>ICP 1 | 8 Oct 2026<br>Renamed from “LMS / Podcast · Player” |
| **[Zooming-Image](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21013-7264 "LMS/ICP/Topics/Zooming-Image")** <br>was “LMS / Zooming Image” | v1.1 | Published | 2 | ICP<br>ICP 4 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| Assessment 14  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Answer-Input](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20494-8896 "LMS/ICP/Assessment/Answer-Input")** <br>was “LMS / Quiz · Answer Input” | v1.1 | Published | 12 | ICP<br>ICP 12 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Drag-and-Drop-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20996-8876 "LMS/ICP/Assessment/Drag-and-Drop-Card")** <br>was “LMS / Drag and Drop · Card” | v1.1 | Published | 6 | ICP<br>ICP 5 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Drag-and-Drop-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20995-8506 "LMS/ICP/Assessment/Drag-and-Drop-Item")** <br>was “LMS / Drag and Drop · Item” | v1.1 | Published | 6 | ICP<br>ICP 24 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Drag-and-Drop-Zone](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20996-8526 "LMS/ICP/Assessment/Drag-and-Drop-Zone")** <br>was “LMS / Drag and Drop · Zone” | v1.1 | Published | 5 | ICP<br>ICP 20 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Entry-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20318-705389 "LMS/ICP/Assessment/Entry-Header")** <br>was “LMS / Quiz · Entry Header” | v1.0 | Published | 4 | ICP<br>ICP 21 | 8 Oct 2026<br>Renamed from “LMS / Quiz · Entry Header” |
| **[Exam-Timer](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20488-4773 "LMS/ICP/Assessment/Exam-Timer")** <br>was “LMS / Quiz · Exam Timer” | v1.1 | Published | 3 | ICP<br>ICP 6 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Footer-Actions](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20647-352944 "LMS/ICP/Assessment/Footer-Actions")** <br>was “LMS / Quiz · Footer Actions” | v1.1 | Published | 1 | ICP<br>ICP 232 | 28 Oct 2026 · Submit is md (44) (SKO match audit)<br>1.1 (published 28 Oct, SKO match audit): Submit is md (44). Earlier: 8 Oct 2026: Renamed from “LMS / Quiz · Footer Actions” |
| **[Gate](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20490-4813 "LMS/ICP/Assessment/Gate")** <br>was “LMS / Quiz · Gate” | v1.0 | Published | 5 | ICP<br>ICP 21 | 8 Oct 2026<br>Renamed from “LMS / Quiz · Gate” |
| **[Grade-Summary](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20416-3129 "LMS/ICP/Assessment/Grade-Summary")** <br>was “LMS / Quiz · Grade Summary” | v1.5 | Published | 1 | ICP + LMS<br>ICP 3 · LMS 6 | 29 Oct 2026 · readable texts at body-medium; Passing bar fill bg/success<br>1.5 (published 29 Oct): readable texts at body-medium; the Passing bar fill on bg/success (green). Earlier: 1.2 (published 27 Oct; decision 034; the description's version edit published 27 Oct ([docs PR 232](https://github.com/nvjeronimo/skillup-lms-prd/pull/232) and [prototype PR 399](https://github.com/nvjeronimo/skillup-lms-prototype/pull/399), both merged 27 Oct: renumber only)): Result = Not started / Below pass / Passing / Submitted below pass (amber) / Course ended (red). ICP: the 3 Grade summaries ([6406:41544](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=6406-41544), [6406:41981](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=6406-41981), [6406:42341](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=6406-42341)) on 1.2, the Six Sigma data fixed (Final project, Not started, 5 / 10 · 50%); new card "Card · 07 · Progress tab · edge cases" ([7969:39005](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7969-39005)) in Row 2 · Progress tab on Platform Pages Ready for Dev. [prototype PR 397](https://github.com/nvjeronimo/skillup-lms-prototype/pull/397) (merged), [docs PR 231](https://github.com/nvjeronimo/skillup-lms-prd/pull/231) (merged). Earlier: 1.1 (20 Oct): corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Option-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20318-705157 "LMS/ICP/Assessment/Option-Row")** <br>was “LMS / Quiz · Option Row” | v1.1 | Published | 7 | ICP<br>ICP 913 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Question-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20318-705306 "LMS/ICP/Assessment/Question-Card")** <br>was “LMS / Quiz · Question Card” | v1.0 | Published | 9 | ICP<br>ICP 286 | 8 Oct 2026<br>Renamed from “LMS / Quiz · Question Card” |
| **[Results](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20499-6630 "LMS/ICP/Assessment/Results")** <br>was “LMS / Quiz · Results” | v1.2 | Published | 4 | ICP<br>ICP 25 | 5 Nov 2026 · follows 5. Scope<br>v1.2 (5 Nov 2026): what Open edX does not have is bound to scope/beyond-edx (DS collection 5. Scope), so it hides in Open edX only. Earlier: 20 Oct 2026: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Stat-Tile](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20388-706341 "LMS/ICP/Assessment/Stat-Tile")** <br>was “LMS / Quiz · Stat Tile” | v1.1 | Published | 3 | not placed on the pages counted | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Stepper-Bar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20540-6253 "LMS/ICP/Assessment/Stepper-Bar")** <br>was “LMS / Quiz · Stepper Bar” | v1.0 | Published | 2 | ICP<br>ICP 45 | 8 Oct 2026<br>Renamed from “LMS / Quiz · Stepper Bar” |
| Live 6  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Live-Control-Bar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537795 "LMS/ICP/Live/Live-Control-Bar")** <br>was “LMS / Live Control Bar States” | v1.1 | Published | 2 | not placed on the pages counted | 29 Oct 2026 · readable texts at body-medium<br>1.1 (published 29 Oct): readable texts at body-medium. Earlier: 8 Oct 2026: renamed from “LMS / Live Control Bar States” |
| **[Live-Now-Banner](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537772 "LMS/ICP/Live/Live-Now-Banner")** <br>was “LMS / Live Now Banner” | v1.1 | Published | 2 | not placed on the pages counted | 14 Oct 2026<br>No side stripe: the whole card carries the state (Live bg/success-soft, Upcoming bg/warning-muted, new token); badges per ADR 012 |
| **[VILT-Session-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705637 "LMS/ICP/Live/VILT-Session-Card")** <br>was “LMS / VILT · Session Card” | v1.2 | Published | 2 | ICP<br>ICP 2 | 5 Nov 2026 · follows 5. Scope<br>v1.2 (5 Nov 2026): what Open edX does not have is bound to scope/beyond-edx (DS collection 5. Scope), so it hides in Open edX only. Earlier: 20 Oct 2026: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[VILT-Session-Meta](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705512 "LMS/ICP/Live/VILT-Session-Meta")** <br>was “LMS / VILT · Session Meta” | v1.0 | Published | 1 | ICP<br>ICP 3 | 8 Oct 2026<br>Renamed from “LMS / VILT · Session Meta” |
| **[VILT-Stage-Stepper](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705552 "LMS/ICP/Live/VILT-Stage-Stepper")** <br>was “LMS / VILT · Stage Stepper” | v1.0 | Published | 3 | ICP<br>ICP 3 | 8 Oct 2026<br>Renamed from “LMS / VILT · Stage Stepper” |
| **[VILT-Stage-Surface](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20322-705648 "LMS/ICP/Live/VILT-Stage-Surface")** <br>was “LMS / VILT · Stage Surface” | v1.0 | Published | 2 | ICP<br>ICP 2 | 27 Oct 2026 · badges in sentence case<br>27 Oct (published, Impeccable session): its badges are in sentence case, never forced capitals ([prototype PR 401](https://github.com/nvjeronimo/skillup-lms-prototype/pull/401), merged). Earlier: 8 Oct 2026: Renamed from “LMS / VILT · Stage Surface” |
| AI 1  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[AI-Panel](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538166 "LMS/ICP/AI/AI-Panel")** <br>was “LMS / AI Panel” | v1.0 | In review | 4 | on no screen<br>was ICP 142 · LMS 2 on 8 Oct | 13 Oct 2026<br>Superseded by Assistant-Chat (floating chat); on no screen. Its 165 hidden instances were removed from the ICP screens |
| Not renamed yet 11  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[LMS / Autosave Status](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538137)** | v1.0 | Published | 4 | ICP<br>ICP 1 | 8 Sep 2026<br>Alert recoloured in the library, and a collection called "Remove" |
| **[LMS / Daily Goals (decide later)](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538034)** | v1.0 | In review | 1 | not placed on the pages counted | 8 Oct 2026<br>Moved to the “In review / not for build” page |
| **[LMS / Discussion Prompt](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537927)** | v1.2 | Published | 1 | not placed on the pages counted | 24 Oct 2026<br>1.2: a panel row: no radius, no shadow, a rule underneath only, padding 16/24 (Nelson preferred the ICP notifications panel 7497:132529 for every panel). Published. ([prototype PR 311](https://github.com/nvjeronimo/skillup-lms-prototype/pull/311), [prototype PR 313](https://github.com/nvjeronimo/skillup-lms-prototype/pull/313), [docs PR 204](https://github.com/nvjeronimo/skillup-lms-prd/pull/204) (merged)). Earlier: Prints its duration with LMS / Duration: the time, then approx. when it is an estimate |
| **[LMS / Duration](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22623-28230)** | v1.0 | Published | 2 | new on 14 Oct, not counted | 14 Oct 2026<br>New atom: a Time text and an Approx boolean that shows "approx." after the time. A normal atom on the Shared page since the page was rebuilt |
| **[LMS / Empty State](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537992)** | v1.0 | Published | 4 | ICP<br>ICP 4 | – |
| **[LMS / Footnote](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21606-1205)** | v1.0 | Published | 1 | LMS<br>LMS 30 | 30 Sep 2026<br>Weekly goal card — component handoff, ready for dev |
| **[LMS / Inline Alert](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20328-3296)** | v1.2 | Published | 12 | ICP + LMS<br>ICP 261 · LMS 9 | 17 Oct 2026<br>New property Surface: Page (bg/faint) and Subtle (on a grey surface the alert is white, bg/page) |
| **[LMS / Live Attendance](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536879)** | v1.0 | In review | 1 | not placed on the pages counted | 8 Oct 2026<br>Moved to the “In review / not for build” page |
| **[LMS / Module Time-Left](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-536873)** | v1.0 | In review | 1 | not placed on the pages counted | 8 Oct 2026<br>Moved to the “In review / not for build” page |
| **[LMS / Profile Menu](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22783-184)** <br>LMS · Shared components · Organism | v1.12 | Published |  | new on 16 Oct, not counted | 27 Oct 2026 · roomier Appearance and Accessibility<br>1.12 (published 27 Oct; Nelson's own DS edit): Appearance and Accessibility standards set their items 16 apart (Spacing/xl), the section title included (was 8); Accessibility standards pads 16 top and bottom (was 12); Profile, Sign out, SkillUp Online and the footer keep 12 / 8. The phone theme row reads "Theme" over the supporting text "Light and Dark", with the Theme-Switch md on the right. [Prototype PR 387](https://github.com/nvjeronimo/skillup-lms-prototype/pull/387) (merged 27 Oct). Earlier: 1.11 (published with 1.12, 27 Oct): the Brand skin segments are SKO · Gold · Studio · Harbor · Fluent, as in the prototype (Red removed 26 Oct). The segments hug their label; the row is wider than the 254 panel and scrolls sideways (Figma clips it: SKO, Gold and Studio in view). Each dot shows its own skin colour (Studio, Harbor and Fluent on icon/primary pinned to that skin's Light mode; SKO pinned to SKO Light; Gold on icon/accent-yellow). Earlier: 1.10 (published 27 Oct): the phone theme row (boolean "Show dark theme (phone)", off on desktop and tablet) is no longer a Toggle: label "Theme" + the top bar's Theme-Switch md (74 × 40, sun / moon), the same control as the Platform and Player Topbars (Nelson). ICP: the one phone instance (Platform Pages – WIP, [7449:65161](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7449-65161)) shows it. [Prototype PR 386](https://github.com/nvjeronimo/skillup-lms-prototype/pull/386) (merged 27 Oct). Earlier: 1.9 (published 26 Oct): the Certificates row reads "My Certificates" ([prototype PR 370](https://github.com/nvjeronimo/skillup-lms-prototype/pull/370), [docs PR 223](https://github.com/nvjeronimo/skillup-lms-prd/pull/223)). Earlier: 1.8 (published 24 Oct): the Profile section (Edit profile, Certificates) above Appearance ([prototype PR 315](https://github.com/nvjeronimo/skillup-lms-prototype/pull/315), [docs PR 205](https://github.com/nvjeronimo/skillup-lms-prd/pull/205) (merged)). Earlier: 1.7: Sign out in a group of its own right after Profile, its icon in icon/error; order Appearance · Accessibility standards · Profile · Sign out · SkillUp Online · demo footer ([prototype PR 226](https://github.com/nvjeronimo/skillup-lms-prototype/pull/226)). Earlier: 1.6: Sign out row; Dark theme row on the phone (boolean Show dark theme (phone)). 1.5: order Appearance, Accessibility standards, Profile (Edit profile, Certificates), SkillUp Online, demo footer; every group padded 12/16 ([prototype PR 204](https://github.com/nvjeronimo/skillup-lms-prototype/pull/204), [docs PR 131](https://github.com/nvjeronimo/skillup-lms-prd/pull/131)). 1.4: Certificates (award-01) under Edit profile, in the top group; opens the Certificates page. 1.3: no learner header; Edit profile at the top; SkillUp Online (skillup.online, new tab) is its own group after Accessibility standards, before the demo footer. The menu also holds Appearance (brand skin SKO / Gold / Red, each with a dot in the skin colour; Studio, which replaced Sea on 22 Oct, is in the prototype only; since 25 Oct also Harbor and Fluent, prototype only, the Brand skin row scrolling sideways (prototype PRs 347, 351, 352); Amended 26 Oct 2026: Red was removed from the DS and the prototype, five skins SKO · Gold · Studio · Harbor · Fluent ([prototype PR 363](https://github.com/nvjeronimo/skillup-lms-prototype/pull/363))), Accessibility standards (text size, colourblind-safe states, reduce motion, underline links, larger touch targets) and the demo footer (Reset demo, then Restart first steps; prototype only). 1.1 (17 Oct): dark theme toggle removed, the light / dark switch is in the top bar; Brand skin segments carry the skin colour dot ([prototype PR 185](https://github.com/nvjeronimo/skillup-lms-prototype/pull/185)) |
| **[LMS / Skeleton](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23184-386)** | v1.0 | Published |  | new on 21 Oct, not counted | 21 Oct 2026<br>New 21 Oct: page-shaped placeholder for the first load of a page (Text · Block · Circle · Pill) |

LMS · Platform (LMS/Platform/…) 82

| Component | Version | Status | Variants | Used in | Last change recorded |
| --- | --- | --- | --- | --- | --- |
| Brand 1  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **SkillUp-Logo** <br>LMS/Brand/SkillUp-Logo | v1.0 | Published |  | in the DS Topbars, Footer, Certificate-Document and Provider-Partner-Badge | 28 Oct 2026 · New<br>1.0 (published 28 Oct): the SkillUp logo as one component, Tone × Size, with Show text and Show mark booleans. Used by Platform Topbar 1.13, Player Topbar 1.9, Footer 1.5, Certificate-Document 1.3 and Provider-Partner-Badge 1.5 (all published 28 Oct). |
| Navigation 12  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Footer](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23327-407 "LMS/Platform/Navigation/Footer")** | v1.5 | Published | 2 | not placed on ICP screens<br>platform pages only, prototype | 28 Oct 2026 · SkillUp logo from the DS logo component<br>1.5 (published 28 Oct): the SkillUp name is the LMS/Brand/SkillUp-Logo 1.0 instance. Earlier: 1.4 (25 Oct): name · © 2026 SkillUp Online | Open edX; the only divider (1 px border/subtle) before the Open edX logo ([prototype PR 334](https://github.com/nvjeronimo/skillup-lms-prototype/pull/334), [docs PR 215](https://github.com/nvjeronimo/skillup-lms-prd/pull/215)). Earlier: 1.3: name | Open edX | copyright on the left (SkillUp name 61 × 18, a divider before the logo and before the copyright). The links alone on the right. Phones: the links, then that row centred ([prototype PR 310](https://github.com/nvjeronimo/skillup-lms-prototype/pull/310), [docs PR 202](https://github.com/nvjeronimo/skillup-lms-prd/pull/202) (merged)). Earlier: 1.2: SkillUp name (monotone wordmark) and copyright on the left. Links and the Open edX logo on the right, with dividers. "Powered by" words removed (the logo's alt keeps them). Phones: the links, then one row: name | copyright | Open edX ([prototype PR 301](https://github.com/nvjeronimo/skillup-lms-prototype/pull/301), [docs PR 196](https://github.com/nvjeronimo/skillup-lms-prd/pull/196) (merged); description published, [docs PR 198](https://github.com/nvjeronimo/skillup-lms-prd/pull/198) (merged)). Earlier: 1.1: links as Link Buttons (Brand, Secondary); Open edX logo 47 × 14; platform pages only, never the ICP screens ([prototype PR 298](https://github.com/nvjeronimo/skillup-lms-prototype/pull/298), [docs PR 195](https://github.com/nvjeronimo/skillup-lms-prd/pull/195)). Earlier: New: micro footer of the platform pages; Breakpoint Desktop / Mobile; Open edX logo ("Powered by", 68 × 20). © 2026 SkillUp Online and five links (Terms of use · Privacy · Cookie settings · Accessibility · Help center); body-small on text/subtle, border/subtle rule on top, in the 1200 column; the ICP player has none ([prototype PR 288](https://github.com/nvjeronimo/skillup-lms-prototype/pull/288), [docs PR 185](https://github.com/nvjeronimo/skillup-lms-prd/pull/185)) |
| **[Tab-Bar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23279-329 "LMS/Platform/Navigation/Tab-Bar")** | v1.3 | Published |  | LMS<br>LMS 52 (the mobile platform screens) | 28 Oct 2026 · Dashboard icon is 4 squares; "More" hugs (SKO match audit)<br>1.3 (published 28 Oct, SKO match audit): Dashboard icon is 4 squares; "More" hugs. Earlier: 23 Oct 2026 · compact: only the current tab shows its label: 1.2: compact, iOS style. Only the current section shows its label beside the icon; the others are icon-only, 44 minimum. The bar hugs its items, 280 × 52. Radius by role in each skin (pills in Studio) ([prototype PR 295](https://github.com/nvjeronimo/skillup-lms-prototype/pull/295), [prototype PR 296](https://github.com/nvjeronimo/skillup-lms-prototype/pull/296), [prototype PR 299](https://github.com/nvjeronimo/skillup-lms-prototype/pull/299), [docs PR 195](https://github.com/nvjeronimo/skillup-lms-prd/pull/195)). ICP: the 52 mobile platform screens (Ready for Dev 17, WIP 35) use the compact tab bar. Earlier: 1.1: the phone floating tab bar holds Dashboard, My Learning, Calendar and More (Discussion, Services and later sections under More); the assistant launcher sits beside it on the same line; the bar is 287 wide, 72 from the right; bar on Radius/track, items on control, Studio pills ([prototype PR 259](https://github.com/nvjeronimo/skillup-lms-prototype/pull/259), [prototype PR 277](https://github.com/nvjeronimo/skillup-lms-prototype/pull/277), [docs PR 176](https://github.com/nvjeronimo/skillup-lms-prd/pull/176)). Earlier: 1.0 ([docs PR 173](https://github.com/nvjeronimo/skillup-lms-prd/pull/173)). ICP, done 23 Oct by the Impeccable session: the 51 Tab-Bar instances are on 1.1 (swapped by key, because the ICP tab held the old library state), 287 wide, with the current tab per page and More current on Discussion and Services. |
| **[Tab-Bar-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23278-500 "LMS/Platform/Navigation/Tab-Bar-Item")** | v1.2 | Published |  | LMS<br>LMS 52 (the mobile platform screens) | 28 Oct 2026 · Dashboard icon is 4 squares; "More" hugs (SKO match audit)<br>1.2 (published 28 Oct, SKO match audit): Dashboard icon is 4 squares; "More" hugs. Earlier: 23 Oct 2026 · counts on Badge Soft sm Info: 1.1: counts are Badge Soft sm Info (Nelson: they were unreadable on the current tab) ([docs PR 195](https://github.com/nvjeronimo/skillup-lms-prd/pull/195)). Earlier: Out of review, published: full labels ("My Learning"), any label may end with an ellipsis; Current marks the page, More is current on Discussion and Services ([prototype PR 259](https://github.com/nvjeronimo/skillup-lms-prototype/pull/259), [prototype PR 277](https://github.com/nvjeronimo/skillup-lms-prototype/pull/277), [docs PR 176](https://github.com/nvjeronimo/skillup-lms-prd/pull/176)) |
| **[Tab-Bar-Menu](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23298-549 "LMS/Platform/Navigation/Tab-Bar-Menu")** | v1.0 | Published |  | not placed on the pages counted | 23 Oct 2026 · New: the panel More opens<br>New: the panel More opens, on Radius/card with 4 padding (Studio 36 with 8); never open while the bar slides away ([docs PR 176](https://github.com/nvjeronimo/skillup-lms-prd/pull/176)) |
| **[Tab-Bar-Menu-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23298-548 "LMS/Platform/Navigation/Tab-Bar-Menu-Item")** | v1.0 | Published |  | not placed on the pages counted | 23 Oct 2026 · New: one section in the More panel<br>New: one section in the More panel (Discussion, Services, any later one), rows on Radius/card-inset ([docs PR 176](https://github.com/nvjeronimo/skillup-lms-prd/pull/176)) |
| **[Topbar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22702 "LMS/Platform/Navigation/Topbar")** | v1.15 | Published | 2 | ICP + LMS<br>ICP 8 · LMS 81 | 28 Oct 2026 · search pill and Assistant button icon-only, as in the prototype (SKO match audit)<br>1.15 (published 28 Oct, SKO match audit): search pill and Assistant button icon-only, as in the prototype. Earlier: 28 Oct 2026 · SkillUp-Logo: 1.13 (published 28 Oct): the SkillUp logo is the LMS/Brand/SkillUp-Logo 1.0 instance. Earlier: 1.10 (published 27 Oct): the Compact variant spaces its two groups apart (menu and logo on the left, the actions on the right edge), so a tablet instance keeps the actions on the right instead of beside the logo; still 64 tall. It follows today's ICP fix of the 103 Compact Topbars. ICP: every platform Topbar is on the published 1.10 (Ready for Dev 21 Desktop + 28 Compact, WIP 61 Desktop + 75 Compact); all 103 Compact are 64 tall with the actions 16 from the right edge. Earlier: 1.9 (published 27 Oct): Desktop has a Middle frame (Nav + Search) on Container/content-max-width, with the logo and the actions at the bar's edges ([prototype PR 396](https://github.com/nvjeronimo/skillup-lms-prototype/pull/396), merged; [prototype PR 395](https://github.com/nvjeronimo/skillup-lms-prototype/pull/395), merged, was a first version, superseded). ICP: all 84 Desktop platform Topbars (23 Ready for Dev + 61 WIP) are on the published 1.9; the Current item and the counts are unchanged on every one. ICP, 27 Oct: all 103 Compact platform Topbars (Ready for Dev 28, WIP 75; phone and tablet) are 64 tall, as the DS Compact (64 with the rule), with the actions at the right edge (16 inset); they were 57 (hug), 4 at 72, and on tablet the actions sat next to the logo. Earlier: 1.8: Compact puts the menu (menu-02) on the left of the logo, as the player's course menu. Doc anatomy Desktop + Compact ([prototype PR 217](https://github.com/nvjeronimo/skillup-lms-prototype/pull/217)). Earlier: 1.7 (20 Oct): Learner avatar on Radius/control (6, was fixed-md 8); every radius on the role tokens (decision 028). Earlier: 1.6: learner avatar is a rounded square (Radius/fixed-md), not a circle ([prototype PR 204](https://github.com/nvjeronimo/skillup-lms-prototype/pull/204), [docs PR 131](https://github.com/nvjeronimo/skillup-lms-prd/pull/131)). Logo works in dark mode (no white box, teal parts on text/on-primary-soft); hidden Compact learner name John Smith. 1.4: default learner John Smith with the JS initials avatar (was the UI-kit Olivia Rhye). [docs PR 128](https://github.com/nvjeronimo/skillup-lms-prd/pull/128). Amended 26 Oct 2026: the prototype bar has the ThemeSwitch Button group instead of the theme Utility Button and the Search + Assistant pill from 1280 px in every skin ([prototype PR 365](https://github.com/nvjeronimo/skillup-lms-prototype/pull/365)). Since the DS publish of 26 Oct: Desktop has the Search-Pill and the Theme-Switch sm; Compact the Search-Assistant-Button sm and the Theme-Switch md. |
| **[Topbar-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22694 "LMS/Platform/Navigation/Topbar-Item")** | v1.1 | Published | 2 | ICP + LMS<br>ICP 20 · LMS 165 | 12 Oct 2026<br>Rebuilt as an underline tab; State Default/Current became Current Off/On; 3 px bar; count badge exposed |
| **[Sticky-Toolbar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23422-605 "LMS/Platform/Navigation/Sticky-Toolbar")** <br>Organism | v1.1 | Published |  | LMS<br>4 ICP "tabs stuck" screens | 25 Oct 2026 · side padding on Layout/page-x<br>1.1 (published 25 Oct): side padding on Layout/page-x 48/40/24 (was 40), matching the prototype's full-bleed bar (decision 032 audit, [docs PR 220](https://github.com/nvjeronimo/skillup-lms-prd/pull/220)). Earlier: 1.0 (24 Oct), new: a page's tabs and filters kept at hand. State In place / Stuck (bg/faint, a border/subtle rule under it, padding 12 and the page gutter); the controls go in a Content slot. Always fixed once scrolled past. While stuck, the My Learning search steps out unless it holds a query. Prototype PRs [316](https://github.com/nvjeronimo/skillup-lms-prototype/pull/316), [317](https://github.com/nvjeronimo/skillup-lms-prototype/pull/317); [docs PR 206](https://github.com/nvjeronimo/skillup-lms-prd/pull/206) (merged). |
| **[Theme-Switch](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23507-631 "LMS/Platform/Navigation/Theme-Switch")** | v1.0 | Published |  | in the DS Topbars<br>ICP screens follow (Impeccable session) | 26 Oct 2026 · New<br>Light / dark switch: a Button group with Sun and Moon segments; sm 58 × 32 (24 segments) on desktop bars, md 74 × 40 (32 segments) on compact bars (prototype PRs 365, 376). Published 26 Oct; in the platform and player Topbars. |
| **[Search-Assistant-Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23507-638 "LMS/Platform/Navigation/Search-Assistant-Button")** | v1.2 | Published |  | in the DS Topbars<br>ICP screens follow (Impeccable session) | 5 Nov 2026 · follows 5. Scope<br>1.2 (5 Nov): what Open edX does not have is bound to scope/beyond-edx (DS collection 5. Scope), so it hides in Open edX only. Earlier: 1.1 (published 27 Oct): round (Radius/pill), a 1.5px angular-gradient rim on border/primary-soft · border/primary · border/info-soft, sm icon 18. Earlier: 1.0 (26 Oct), new: the 32 search button of compact bars that opens the Search + Assistant sheet (prototype PRs 369, 377). sm 32 / md 44, the ai-assistant icon. Published 26 Oct; in the Compact platform Topbar and the player Topbar on tablet and phone. Since 27 Oct the prototype button is round with a 1.5px rim and a glint that wanders round it, random start and direction, parked under reduced motion ([prototype PR 383](https://github.com/nvjeronimo/skillup-lms-prototype/pull/383)). DS matches since 27 Oct. |
| **[Search-Pill](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23508-637 "LMS/Platform/Navigation/Search-Pill")** | v1.0 | Published |  | in the DS Topbars<br>ICP screens follow (Impeccable session) | 26 Oct 2026 · New<br>The top-bar Search + Assistant pill (prototype PRs 365, 369, 371). State Rest 240 / Open / Typing 420; text and "Show Assistant label" properties. Published 26 Oct; in the Desktop platform and player Topbars. |
| **[Search-Palette](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23508-738 "LMS/Platform/Navigation/Search-Palette")** | v1.0 | Published |  | in the DS Topbars<br>ICP screens follow (Impeccable session) | 26 Oct 2026 · New<br>The palette under the search pill: Go to, Your courses, Help; in the player In this course, Ask about this course (Scope Platform / Course) (prototype PRs 359, 369). Published 26 Oct. |
| Dashboard 12  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Due-Item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22752 "LMS/Platform/Dashboard/Due-Item")** | v1.6 | Published | 2 | LMS<br>LMS 12 | 29 Oct 2026 · phone layout<br>1.6 (published 29 Oct): phone layout. Earlier: 1.5 (published 28 Oct, staff-graded samples): sample "(Project)". Earlier: 1.4 (published 28 Oct, SKO match audit): titles wrap in full (no 2-line cut). Earlier: 28 Oct 2026 · past due in amber: 1.3 (published 28 Oct; decision 035): today's day in amber; a past-due item reads "Past due · 3 days" ([prototype PR 410](https://github.com/nvjeronimo/skillup-lms-prototype/pull/410)). Earlier: 1.2 (published and accepted in the ICP, 22 Oct): the Status badge sits in the title row, the meta line runs full width, the date is centred ([prototype PR 268](https://github.com/nvjeronimo/skillup-lms-prototype/pull/268), [docs PR 170](https://github.com/nvjeronimo/skillup-lms-prd/pull/170), [docs PR 171](https://github.com/nvjeronimo/skillup-lms-prd/pull/171)). ICP: all 24 instances (18 Platform WIP + 6 Ready for Dev) have the badge in the title row. Earlier: 1.1 (22 Oct, published): the activity type in brackets in the title; meta = course · 11:59 PM · your time; the badge says when (Due tonight / Due Mon); on Shadows/shadow-card. In the ICP the 24 instances were re-texted ([prototype PR 245](https://github.com/nvjeronimo/skillup-lms-prototype/pull/245)). Earlier: 1.0 (8 Oct): After the publish: the Program headers are in; the Course Card is still not |
| **Greeting** | v1.1 | Published |  | LMS<br>ICP Dashboard / My Learning (Impeccable session) | 27 Oct 2026 · the mark after "Plan my week"<br>1.1 (published 27 Oct): no sparkles icon before "Good morning, John."; the tip now ends with the assistant mark (ai-assistant, 20, icon/primary) right after "Plan my week" (the link opens the assistant). [Prototype PR 388](https://github.com/nvjeronimo/skillup-lms-prototype/pull/388) (merged 27 Oct), which also removed the assistant mark before "Hi John!" in the assistant panel (prototype only; no DS / ICP drawing of that panel exists). ICP: all 7 Dashboard Greetings (Platform Pages – WIP) show it. On the phone screen (327) the tip is set to Fill so it wraps, and the mark then sits at the right end of the tip's last line rather than right after "week" (Figma cannot put an icon inline in text). Earlier: 1.0 (26 Oct), new: the Dashboard greeting with its tip. Published 26 Oct ([prototype PR 375](https://github.com/nvjeronimo/skillup-lms-prototype/pull/375)). |
| **[Jump-Tile](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22769 "LMS/Platform/Dashboard/Jump-Tile")** | v1.1 | Published | 1 | LMS<br>LMS 18 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: DS: defaults on what Open edX serves; an image option on the Course Card |
| **Pick-Up** | v1.2 | Published |  | LMS<br>ICP Dashboard / My Learning (Impeccable session) | 28 Oct 2026 · lower cover (~90 px); track on bg/track (SKO match audit)<br>1.2 (published 28 Oct, SKO match audit): lower cover (~90 px); track on bg/track. Earlier: 26 Oct 2026 · New: Pick up where you left off: a list beside the chosen course shown large. Published 26 Oct ([prototype PR 375](https://github.com/nvjeronimo/skillup-lms-prototype/pull/375)). |
| **Pick-Up-Item** | v1.0 | Published |  | LMS<br>ICP Dashboard / My Learning (Impeccable session) | 26 Oct 2026 · New<br>One course in the Pick-Up list. Published 26 Oct ([prototype PR 375](https://github.com/nvjeronimo/skillup-lms-prototype/pull/375)). |
| **[Resume-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22800 "LMS/Platform/Dashboard/Resume-Row")** | v1.3 | Published | 1 | LMS<br>LMS 6 | 23 Oct 2026 · large course picture (cover)<br>23 Oct (Nelson's DS edit, no version bump): the cover is 140 tall across the top, the content 16 under it (padding top 140 + 16), 20 at the sides and 16 at the bottom; not 2:1, Nelson's exception to the 2:1 rule for card pictures ([prototype PR 283](https://github.com/nvjeronimo/skillup-lms-prototype/pull/283)). 1.3: the course's cover, 140 on top ([prototype PR 257](https://github.com/nvjeronimo/skillup-lms-prototype/pull/257), [docs PR 167](https://github.com/nvjeronimo/skillup-lms-prd/pull/167)). ICP: 12 Resume-Rows carry the covers. Earlier: 1.2 (14 Oct): prints its duration with LMS / Duration: the time, then approx. when it is an estimate |
| **[Section-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22747 "LMS/Platform/Dashboard/Section-Header")** | v1.1 | Published | 1 | LMS<br>LMS 18 | 13 Oct 2026<br>The action is the Link Button with its underline; the rule under the header was tried and withdrawn the same day. |
| **[Stat](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22736 "LMS/Platform/Dashboard/Stat")** | v1.5 | Published | 2 | LMS<br>LMS 72 | 28 Oct 2026 · trend chip on the glance cards (SKO match audit)<br>1.5 (published 28 Oct, SKO match audit): trend chip on the glance cards; it needs history Open edX does not keep (decision 035): not Open edX-based. Earlier: 25 Oct 2026: 1.4: Theme=Card is a link to the list it counts, no arrow (description only, no drawing change) ([prototype PR 322](https://github.com/nvjeronimo/skillup-lms-prototype/pull/322), [docs PR 209](https://github.com/nvjeronimo/skillup-lms-prd/pull/209) (merged)). Earlier: 1.3: Theme=Card value on display-small/Semibold — bigger glance figures ([prototype PR 293](https://github.com/nvjeronimo/skillup-lms-prototype/pull/293), [docs PR 192](https://github.com/nvjeronimo/skillup-lms-prd/pull/192)); published 23 Oct; every ICP Stat on 1.3. Earlier: 1.2 (22 Oct): new Theme=Card with Trend and Goal badges (booleans Show trend / Show goal); the trend badge is not used on the Dashboard (goal badges only); Theme=Card sits on Shadows/shadow-card (22 Oct, no version bump) ([prototype PR 242](https://github.com/nvjeronimo/skillup-lms-prototype/pull/242)). Earlier: 1.1 (21 Oct): compact size (Inverse, compact) for the phone glance card ([prototype PR 229](https://github.com/nvjeronimo/skillup-lms-prototype/pull/229)). Earlier: DS: defaults on what Open edX serves; an image option on the Course Card |
| **[Stay-Informed](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23515-569 "LMS/Platform/Dashboard/Stay-Informed")** | v1.1 | Published |  | LMS<br>ICP Dashboard / My Learning (Impeccable session) | 28 Oct 2026 · only Open edX notification types, no score (SKO match audit)<br>1.1 (published 28 Oct, SKO match audit): only Open edX notification types, no score. Earlier: 26 Oct 2026 · New: The Stay informed card (Alerts · Updates · Support). Published 26 Oct ([prototype PR 375](https://github.com/nvjeronimo/skillup-lms-prototype/pull/375)). |
| **Stay-Informed-Row** | v1.1 | Published |  | LMS<br>ICP Dashboard / My Learning (Impeccable session) | 28 Oct 2026 · Open edX notification types<br>1.1 (published 28 Oct; decision 035): the Alert / Update kinds come from the Open edX notification types ([prototype PR 410](https://github.com/nvjeronimo/skillup-lms-prototype/pull/410)). Earlier: 1.0 (26 Oct), new: one row of Stay informed. Published 26 Oct ([prototype PR 375](https://github.com/nvjeronimo/skillup-lms-prototype/pull/375)). |
| **[Streak-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22783 "LMS/Platform/Dashboard/Streak-Card")** | v1.0 | In review | 1 | not placed on the pages counted | 8 Oct 2026<br>Moved to the “In review / not for build” page |
| **[Today-at-a-glance](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22184-626082 "LMS/Platform/Dashboard/Today-at-a-glance")** | v1.11 | Published | 2 | LMS<br>LMS 6 | 26 Oct 2026 · rings<br>1.11: the concentric rings and hazes of the prototype glance (prototype PRs 360–362), published 26 Oct (Impeccable session). Amended 28 Oct 2026: the goal "3 due this week" is an example only today (no due dates are configured, decision 036). Earlier: 1.10: side padding on Layout/page-x, Spacing/6xl (48) above and below (decision 032) ([prototype PR 338](https://github.com/nvjeronimo/skillup-lms-prototype/pull/338)); published. Earlier: 1.9: each figure card is a link to the list it counts (description only, no drawing change) ([prototype PR 322](https://github.com/nvjeronimo/skillup-lms-prototype/pull/322), [docs PR 209](https://github.com/nvjeronimo/skillup-lms-prd/pull/209) (merged)). Earlier: 1.8: on a phone the figures row is tighter: Stat cards 156 wide (were 174), Spacing/lg (12) apart and inside (were 16), so the third card peeks at 390 ([prototype PR 292](https://github.com/nvjeronimo/skillup-lms-prototype/pull/292), [docs PR 191](https://github.com/nvjeronimo/skillup-lms-prd/pull/191)); published 23 Oct; the 15 ICP glance instances on 1.8. Earlier: 1.7 (published): edge to edge — a full-width band, no radius, no border, side padding Spacing/5xl (the page gutter); published 23 Oct, the 15 ICP glance instances on it ([prototype PR 289](https://github.com/nvjeronimo/skillup-lms-prototype/pull/289), [docs PR 188](https://github.com/nvjeronimo/skillup-lms-prd/pull/188)). Earlier: 1.6: one glow (the right one went): Glow · top over the top edge on Desktop, low on the left on Mobile (x −124, y 60); circles at 19% unchanged. In the Studio skin the glow and the two circles now show (they were hidden) ([prototype PR 281](https://github.com/nvjeronimo/skillup-lms-prototype/pull/281), [docs PR 178](https://github.com/nvjeronimo/skillup-lms-prd/pull/178)). ICP: all 12 glances (9 WIP + 3 Ready for Dev) have the single glow. Amended 23 Oct 2026: the backdrop now runs edge to edge (prototype PR 289; DS 1.7 published and on the ICP). Earlier: 1.5 (22 Oct): dark again, as Nelson drew it on the ICP Dashboard ([7495:71629](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7495-71629)): Backdrop bg/info-soft pinned to SKO Dark (#044150, no new token), two blurred border/info-soft glows, circles at 19%, the title on text/on-media (white in every mode; text/on-primary is #0e1a1f in every Dark mode and vanished on the #044150 backdrop, fixed 22 Oct, same version; prototype PR 270 does the same, merged); light Stat cards with the value and its detail on one line; Programs "1 · in progress of 3 enrolled" and "1 not started", Certificates "ready to download" ([prototype PR 267](https://github.com/nvjeronimo/skillup-lms-prototype/pull/267), [docs PR 169](https://github.com/nvjeronimo/skillup-lms-prd/pull/169), [docs PR 171](https://github.com/nvjeronimo/skillup-lms-prd/pull/171)). ICP: all 12 glance instances updated (title on-media, dark backdrop), and the stale Stat texts on 10 of them reset to the DS content, so every glance reads Courses 4 · in progress of 22 enrolled · 3 due this week / Programs 1 · in progress of 3 enrolled · 1 not started / Completed 7 · of 22 enrolled · 32% completed / Certificates 8 · ready to download. Earlier: 1.4 (22 Oct): light card (bg/primary-soft, border/primary-muted), figure cards on bg/page with Shadows/shadow-card; labels Courses / Programs / Completed / Certificates; details on two lines; goals 3 due this week (Warning) · 1 of 3 completed · 32% completed ([prototype PR 244](https://github.com/nvjeronimo/skillup-lms-prototype/pull/244)). Earlier: 1.3 (22 Oct): one dark card per figure, Programs second, each with a goal badge (no trend arrows), from real data only; republished 22 Oct with the desktop cards filling their grid columns ([prototype PR 242](https://github.com/nvjeronimo/skillup-lms-prototype/pull/242), [prototype PR 243](https://github.com/nvjeronimo/skillup-lms-prototype/pull/243), [docs PR 160](https://github.com/nvjeronimo/skillup-lms-prd/pull/160)). Earlier: 1.2 (21 Oct): Breakpoint=Mobile is one line of four stats with short labels ([prototype PR 229](https://github.com/nvjeronimo/skillup-lms-prototype/pull/229)). Earlier: 1.1 (20 Oct): Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: After the publish: the Program headers are in; the Course Card is still not |
| My-Learning 6  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Browse-Tile](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22901 "LMS/Platform/My-Learning/Browse-Tile")** | v1.1 | Published | 1 | LMS<br>LMS 6 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Platform components moved into the DS library. Hidden on My Learning since 13 Oct (not discussed yet). |
| **[Course-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20888-6124 "LMS/Platform/My-Learning/Course-Card")** <br>was “LMS/Platform/Discovery/Course-Card” until 15 Oct (before 8 Oct “LMS / Course Card”) | v1.22 | Published | 2 | LMS<br>LMS 82 | 28 Oct 2026 · title hugs; track on bg/track (SKO match audit)<br>1.22 (published 28 Oct, SKO match audit): title hugs; track on bg/track. Earlier: 25 Oct 2026 · phone grid cover 5:2: 1.20: Layout=Grid on phones, cover 5:2 (the 2:1 picture cropped, never stretched); 22 ICP phone cards swapped (Impeccable session) ([prototype PR 327](https://github.com/nvjeronimo/skillup-lms-prototype/pull/327), [docs PR 211](https://github.com/nvjeronimo/skillup-lms-prd/pull/211)). Earlier: 1.19: Grid cards hug their content. An in-flow 2:1 "Cover space" reserves the cover's height, so the content starts 24 below it on desktop and 20 on tablet and phone. This replaces a fixed 214 top padding and a 560 minimum height, which left an empty band under the cover on phones and above the button. ICP: the 148 Course-Row instances (41 Ready for Dev, 107 WIP) were swapped to 1.19. In desktop grid rows the cards stretch to the row with the buttons at the bottom; on tablet and phone they hug ([docs PR 202](https://github.com/nvjeronimo/skillup-lms-prd/pull/202) (merged)). Earlier: 1.18 (the Impeccable session's 2:1 pass, from the register): Grid cover 380 × 190, aspect-locked at 2:1; List and List stacked cover 292 wide, aspect unlocked ([prototype PR 284](https://github.com/nvjeronimo/skillup-lms-prototype/pull/284)). ICP grid cards: padding-top = cover + 24 (187 / 215 / 242). 1.17: new Layout=List stacked for tablet lists: the progress sits above the Up next / Certificate box in one Status column, the identity keeps half the width, height hugs (min 146) ([prototype PR 285](https://github.com/nvjeronimo/skillup-lms-prototype/pull/285), [docs PR 179](https://github.com/nvjeronimo/skillup-lms-prd/pull/179), [docs PR 181](https://github.com/nvjeronimo/skillup-lms-prd/pull/181)). Earlier: 1.16: grid is a 16:9 cover across the top, list a cover down the left; partner logo chips on white ([prototype PR 257](https://github.com/nvjeronimo/skillup-lms-prototype/pull/257), [docs PR 167](https://github.com/nvjeronimo/skillup-lms-prd/pull/167)). ICP: 148 cards carry the 12 prototype covers. Earlier: 20 Oct: corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: List min height 146 (the height with a two-line title), so list cards keep one height. [prototype PR 191](https://github.com/nvjeronimo/skillup-lms-prototype/pull/191) · [docs PR 121](https://github.com/nvjeronimo/skillup-lms-prd/pull/121) |
| **Learning-Table** | v1.1 | Published |  | LMS<br>ICP Dashboard / My Learning (Impeccable session) | 29 Oct 2026 · columns 32 apart; Programs in four columns<br>1.1 (published 29 Oct, Nelson): columns 32 apart; Kind=Program has four columns (Program, Progress with the courses count under the bar, Up next, Action), built from Learning-Table-Row 1.5 ([prototype PR 427](https://github.com/nvjeronimo/skillup-lms-prototype/pull/427), merged). Earlier: 26 Oct 2026 · New: The My Learning table view (desktop). Published 26 Oct ([prototype PR 375](https://github.com/nvjeronimo/skillup-lms-prototype/pull/375)). |
| **Learning-Table-Row** | v1.5 | Published |  | LMS<br>ICP Dashboard / My Learning (Impeccable session) | 29 Oct 2026 · columns 32 apart; Program progress + courses in one column<br>1.5 (published 29 Oct, Nelson): columns 32 apart (cells pad right on Spacing/4xl, was 16). Kind=Program: Progress and Courses are one 220 column, the bar on top and "N of M courses complete" under it (body-small/Regular); the freed width goes to Program and Up next ([prototype PR 427](https://github.com/nvjeronimo/skillup-lms-prototype/pull/427), merged). Earlier: 29 Oct 2026 · provider line wraps: 1.4 (published 29 Oct): the Provider line in the Name cell fills the cell and wraps (it ran past the cell at 13 px), as the prototype; stale ICP rows rebuild with the bg/track bar and the current text-xs variable. Earlier: 28 Oct 2026 · wider Course column; track on bg/track (SKO match audit): 1.3 (published 28 Oct, SKO match audit): wider Course column; track on bg/track. Earlier: 27 Oct 2026 · Provider · Level · Delivery: 1.1 (published 27 Oct): under the course title the provider line reads "Provider · Level · Delivery", the level and delivery in text/subtle (e.g. "SkillUp · Beginner · Flexible Learning"). ICP: the 10 rows of the WIP My Learning table are on 1.1. [prototype PR 405](https://github.com/nvjeronimo/skillup-lms-prototype/pull/405) (merged: level and delivery in the table view). Earlier: 1.0 (26 Oct), new: one row of the Learning-Table. Published 26 Oct ([prototype PR 375](https://github.com/nvjeronimo/skillup-lms-prototype/pull/375)). |
| **[Program-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22808 "LMS/Platform/My-Learning/Program-Card")** | v1.19 | Published | 4 | LMS<br>LMS 16 · ICP 47 on 1.17 (12 Ready for Dev, 35 WIP) | 5 Nov 2026 · 1.19: details line split for scope<br>1.19 (5 Nov): the details line is split so last studied and hours left follow 5. Scope (hidden in Open edX only); State=Completed reads *View certificate* (another session, 5 Nov). Earlier: 1.17 (published 3 Nov, Nelson): Quick view is an Icon Button (Brand, Secondary, sm, eye), 36 × 36, in every variant: tertiary read as a dark patch on the hero and the labelled button pushed the three tags to one per line; the tags now take two lines. Dev Notes: aria-label "Quick view of &lt;program&gt;", a "Quick view" tooltip, hit area 44 on phones (prototype PRs [457](https://github.com/nvjeronimo/skillup-lms-prototype/pull/457), [460](https://github.com/nvjeronimo/skillup-lms-prototype/pull/460)). ICP: the 47 Program-Card instances swapped to 1.17 by script (12 Platform Pages Ready for Dev, 35 WIP), titles kept. Earlier: 1.16 (published 28 Oct, SKO match audit): Quick view button, labels one per line, Up next on one line, track on bg/track. Earlier: 22 Oct 2026: 1.14: the footer labels Up next and Certificate issued are uppercase (Text case Upper), as the Course-Card overlines ([prototype PR 264](https://github.com/nvjeronimo/skillup-lms-prototype/pull/264), [docs PR 168](https://github.com/nvjeronimo/skillup-lms-prd/pull/168)); ICP: the 11 Up next labels on Platform WIP are uppercase. Earlier: 1.13 (20 Oct): corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Due badge Soft · Warning (was the accent yellow), as the Dashboard Due-Item |
| **[Program-Quick-View](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23326-588201 "LMS/Platform/My-Learning/Program-Quick-View")** <br>LMS/Platform/My-Learning/Program-Quick-View | v1.5 | Published | 2 | not placed on the pages counted<br>proposal | 5 Nov 2026 · follows 5. Scope<br>1.5 (5 Nov): what Open edX does not have is bound to scope/beyond-edx (DS collection 5. Scope), so it hides in Open edX only. Earlier: 1.4 (published 29 Oct; still a proposal, not for build): readable texts at body-medium. Earlier: 1.3 (published 28 Oct, staff-graded samples): What's included without peer reviews. Earlier: 1.2 (published 28 Oct, SKO match audit; still in review, a proposal not for build): track on bg/track. Earlier: 23 Oct 2026 · What's included: 1.1, in review (a proposal: in the library, not for build): What's included section added ([prototype PR 302](https://github.com/nvjeronimo/skillup-lms-prototype/pull/302), [docs PR 197](https://github.com/nvjeronimo/skillup-lms-prd/pull/197) (merged)). ICP: the quick-view desktop screen was enlarged to fit 1.1 (1531 tall). Earlier: 1.0: new proposal: Desktop modal 640 / Mobile full screen; Progress · Courses · Certificate · About (mock); close = Secondary Icon Button ([prototype PR 287](https://github.com/nvjeronimo/skillup-lms-prototype/pull/287), merged · [prototype PR 290](https://github.com/nvjeronimo/skillup-lms-prototype/pull/290), merged: the close is a Secondary Icon Button and each skill is its own chip, the chips wrap · [docs PR 184](https://github.com/nvjeronimo/skillup-lms-prd/pull/184), merged). ICP: the row "My Learning · Program quick view (proposal)" on Platform Pages WIP, inside 02 · My Learning ([7703:84097](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7703-84097)): 08b Desktop, a modal over My Learning on a bg/overlay backdrop, and 11b Mobile, full screen. |
| Discovery 7  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Card-Overflow-Menu](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538064 "LMS/Platform/Discovery/Card-Overflow-Menu")** <br>was “LMS / Card Overflow Menu” | v1.1 | Published | 1 | not placed on the pages counted | 20 Oct 2026<br>4 px padding all round, rows on Radius/card-inset (8), panel on Radius/card (decision 028) |
| **[Course-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538010 "LMS/Platform/Discovery/Course-Row")** <br>was “LMS / Course Row” | v1.4 | Published | 3 | LMS<br>LMS 18 | 23 Oct 2026 · square 96 × 96 cover, published<br>1.4, published 23 Oct: 36 ICP rows show the square cover. Nelson changed the "Module …" rows' cover to a square, 96 × 96, padding-left 116; the 2:1 rule does not apply to it ([prototype PR 286](https://github.com/nvjeronimo/skillup-lms-prototype/pull/286), w-[118px]; first drawn at 2:1 in [prototype PR 284](https://github.com/nvjeronimo/skillup-lms-prototype/pull/284)). Earlier: 1.3 (22 Oct): 1.3: the course's cover, 160 on the left; hidden on the 466-wide two-column Dashboard rows, where it does not fit ([prototype PR 257](https://github.com/nvjeronimo/skillup-lms-prototype/pull/257), [docs PR 167](https://github.com/nvjeronimo/skillup-lms-prd/pull/167)). ICP: 30 Course-Rows carry the covers. Earlier: 1.2 (14 Oct): prints its duration with LMS / Duration: the time, then approx. when it is an estimate |
| **[Course-Type-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538072 "LMS/Platform/Discovery/Course-Type-Badge")** <br>was “LMS / Course Type Badge” | v1.3 | To publish | 2 | ICP + LMS<br>ICP 8 · LMS 156 | 24 Nov 2026 · capitals<br>1.3 (24 Nov, not published yet): the label is label-small/Semibold, so COURSE / PROGRAM in capitals with 4% tracking, same size and weight; the text stays “Course” / “Program” (decision 043, [prototype PR 503](https://github.com/nvjeronimo/skillup-lms-prototype/pull/503)). Earlier: 1.2 (published 29 Oct): no visual change; republished so ICP instances move to the current text-xs variable (13/18 on desktop and tablet). Earlier: 27 Oct 2026 · badges in sentence case: 27 Oct (published, Impeccable session): its badges are in sentence case, never forced capitals ([prototype PR 401](https://github.com/nvjeronimo/skillup-lms-prototype/pull/401), merged). Earlier: 15 Oct 2026: Words only: the icons are removed (1.0, 8 Oct: renamed from “LMS / Course Type Badge”) |
| **[Delivery-Mode-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538084 "LMS/Platform/Discovery/Delivery-Mode-Badge")** <br>was “LMS / Delivery Mode Badge” | v1.0 | Published | 3 | ICP + LMS<br>ICP 8 · LMS 185 | 8 Oct 2026<br>Renamed from “LMS / Delivery Mode Badge” |
| **[Difficulty-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538077 "LMS/Platform/Discovery/Difficulty-Badge")** <br>was “LMS / Difficulty Badge” | v1.0 | Published | 3 | ICP + LMS<br>ICP 8 · LMS 144 | 8 Oct 2026<br>Renamed from “LMS / Difficulty Badge” |
| **[Difficulty-Level-Icon](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21868-5367 "LMS/Platform/Discovery/Difficulty-Level-Icon")** <br>was “LMS / Difficulty · Level Icon” | v1.0 | Published | 3 | ICP + LMS<br>ICP 8 · LMS 144 | 8 Oct 2026<br>Renamed from “LMS / Difficulty · Level Icon” |
| **[Provider-Partner-Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-538091 "LMS/Platform/Discovery/Provider-Partner-Badge")** <br>was “LMS / Provider-Partner Badge” | v1.5 | Published | 24 | ICP + LMS<br>ICP 127 · LMS 90 | 28 Oct 2026 · SkillUp-Logo<br>1.5 (published 28 Oct): the SkillUp logo is the LMS/Brand/SkillUp-Logo 1.0 instance. Earlier: 1.4 (23 Oct): the logo chip padding is Spacing/md (8) on every side, so the chip is 32 px tall with the 16 px logo (was 28); border/subtle and Radius/control unchanged ([prototype PR 276](https://github.com/nvjeronimo/skillup-lms-prototype/pull/276), [docs PR 175](https://github.com/nvjeronimo/skillup-lms-prd/pull/175), [docs PR 177](https://github.com/nvjeronimo/skillup-lms-prd/pull/177)). ICP: all 403 logo chips are 32 tall (278 Platform WIP + 125 Ready for Dev). Earlier: 1.3 (22 Oct): the logo chip has a 1 px border/subtle outline and Radius/control (6), still 28 px tall ([prototype PR 249](https://github.com/nvjeronimo/skillup-lms-prototype/pull/249), [docs PR 163](https://github.com/nvjeronimo/skillup-lms-prd/pull/163)). The Cybersecurity Fundamentals Certificate partner is SkillUp (ICP: 15 program cards fixed). Earlier: 1.2 (16 Oct): the logo chip padding is on Spacing/sm (6), so the chip is 28 px tall; FutureSkills Dark uses the same bitmap with image filters and reads on the dark chip. 20 Oct: corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer (no version bump). 1.1 (16 Oct): Type=Text/Logo and Theme=Light/Dark, Dark carrying the SKO Dark mode for dark surfaces such as the Program-Card hero. 24 variants |
| Program-Detail 2  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Course-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22906 "LMS/Platform/Program-Detail/Course-Row")** | v1.1 | Published | 4 | LMS<br>LMS 42 | 23 Oct 2026<br>1.1: new Breakpoint=Tablet (912), the course card on List stacked. Program page rows in the prototype: Desktop list from lg, Tablet stacked md–lg, Compact grid below md ([prototype PR 285](https://github.com/nvjeronimo/skillup-lms-prototype/pull/285), [docs PR 179](https://github.com/nvjeronimo/skillup-lms-prd/pull/179), [docs PR 181](https://github.com/nvjeronimo/skillup-lms-prd/pull/181)). ICP: the 21 tablet Course-Rows (14 Platform WIP + 7 Ready for Dev) swapped to Breakpoint=Tablet with List stacked; the completed "Digital Marketing Fundamentals" rows set to State=Completed (full bar, no topic badge, "View Certificate"); Nelson's 04 · Program Detail first row restored after the swap reset it. Earlier: 1.0 (8 Oct): screens: the 28 compact course rows on the DS row; the local component is gone |
| **[Program-Certificate](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23384-2341 "LMS/Platform/Program-Detail/Program-Certificate")** <br>Organism | v1.5 | Published | 4 | LMS<br>LMS 3 (the Program Certificates screens, on 1.4) + 3 in their SUPERSEDED copies | 2 Nov 2026 · 1.5: Earned with the certificate icon<br>1.5 (published 2 Nov, Nelson): the Earned badge on State=Earned leads with award-01 instead of check-circle (prototype PR [450](https://github.com/nvjeronimo/skillup-lms-prototype/pull/450)). 1.4 (published 31 Oct, Nelson): both Earned variants show the stepper between the issue line and the actions, every segment bg/success, "7 of 7 courses complete" as plain text (not the Progress line property, so Not earned keeps "1 of 7") (prototype PR [449](https://github.com/nvjeronimo/skillup-lms-prototype/pull/449)). No live ICP screen shows an earned program certificate. 1.3 (published 31 Oct, Nelson): both Not earned variants show a Progress block under the heading: one 8-tall segment per course (bg/success, bg/info-soft, bg/track; gap Spacing/xs) and the TEXT property Progress line ("1 of 7 courses complete") (prototype PR [448](https://github.com/nvjeronimo/skillup-lms-prototype/pull/448)). Earlier: 1.2 (published 30 Oct, Nelson): removed the course segments, the course in progress with Resume and What's needed, the program title and Download; the heading is an award disc + "Program certificate" (+ Earned badge), then "Yours when all N courses are complete." or the issue line; earned: View certificate + Share; a plain card in both states (prototype PRs [438](https://github.com/nvjeronimo/skillup-lms-prototype/pull/438), [439](https://github.com/nvjeronimo/skillup-lms-prototype/pull/439), [443](https://github.com/nvjeronimo/skillup-lms-prototype/pull/443); ProgramCertificateGoal.tsx). Properties Title and Next course removed. ICP: [7495:227665](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7495-227665) (Wide), [7495:227693](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7495-227693) (Wide), [7495:227717](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7495-227717) (Stacked). Earlier: 1.1 (28 Oct, SKO match audit): completed course segment green, share-nodes icon; 1.0 (23 Oct): New, the program's certificate card ([prototype PR 303](https://github.com/nvjeronimo/skillup-lms-prototype/pull/303), ProgramCertificateHero). |
| Course-Detail 21  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Card-Shell](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21885 "LMS/Platform/Course-Detail/Card-Shell")** | v1.1 | Published | 1 | LMS<br>LMS 18 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Platform components moved into the DS library |
| **[Completion-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22448 "LMS/Platform/Course-Detail/Completion-Card")** | v1.3 | Published | 1 | LMS<br>LMS 6 | 27 Oct 2026 · a variant set with the count line<br>1.3 (published 27 Oct; decision 034): a variant set, State = Not started / In progress / Completed. The Body is the count line ("16 of 42 topics complete." / "All N topics complete." / "N of M available topics complete." when topics are locked); a "Show locked" boolean with an exposed Gray badge; the Counts property is gone, so the 1.2 "Topics:" line is replaced (Nelson approved the count line). ICP: all 9 Completion cards on 1.3, State=In progress, "16 of 42 topics complete.", ring 38% (verified). [prototype PR 397](https://github.com/nvjeronimo/skillup-lms-prototype/pull/397) (merged), [docs PR 231](https://github.com/nvjeronimo/skillup-lms-prd/pull/231) (merged). Earlier: 1.2 (published 27 Oct, superseded the same day): the Counts default starts with "Topics:" ("Topics: 16 complete · 26 incomplete · 0 locked"), and the sample ring is 38% to match 16 of 42 (Nelson, ICP [6406:41528](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=6406-41528)). ICP: all 9 Completion card instances (WIP desktop / tablet / mobile / technical, 03 · Course Detail ×3, Ready for Dev ×2) are on the published 1.2 and show "Topics:" and 38% (was a stale 67%). [prototype PR 392](https://github.com/nvjeronimo/skillup-lms-prototype/pull/392) (merged), [docs PR 228](https://github.com/nvjeronimo/skillup-lms-prd/pull/228) (merged). Earlier: 1.1 (20 Oct): corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Platform components moved into the DS library |
| **[Course-Header](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21765 "LMS/Platform/Course-Detail/Course-Header")** | v1.3 | Published | 6 | ICP + LMS<br>ICP 8 · LMS 57 | 29 Oct 2026 · rebuild, bg/track<br>1.3 (published 29 Oct): no visual change; republished so stale ICP instances (old nested Progress-Card tree) rebuild with the bg/track bar and the current text-xs variable. Earlier: 25 Oct 2026 · band padding on Layout/band-x: 1.2: the band takes Layout/band-x on Tablet / Mobile (decision 032); published. Earlier: 17 Oct: partner logos: Provider-Partner-Badge Logo, the cards' component (Light on courses, Dark on the program band), exposed Partner 1 / 2, boolean Second partner; Progress card button fills again. [prototype PR 188](https://github.com/nvjeronimo/skillup-lms-prototype/pull/188) · [prototype PR 190](https://github.com/nvjeronimo/skillup-lms-prototype/pull/190) |
| **[Course-Stats](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21860 "LMS/Platform/Course-Detail/Course-Stats")** | v1.0 | Published | 1 | ICP + LMS<br>ICP 8 · LMS 58 | 6 Oct 2026<br>Platform components moved into the DS library |
| **[Course-Title](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21848 "LMS/Platform/Course-Detail/Course-Title")** | v1.2 | Published | 1 | ICP + LMS<br>ICP 8 · LMS 58 | 23 Oct 2026 · thumbnail and title centred on each other<br>1.2: the thumbnail and the title are centred on each other. Earlier: 1.1 (20 Oct): corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Platform components moved into the DS library |
| **[Date-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22486 "LMS/Platform/Course-Detail/Date-Row")** | v1.3 | Published | 8 | LMS<br>LMS 54 | 29 Oct 2026 · 1.3: 12-hour sample times ('9:00 AM · your time')<br>1.3 (published 29 Oct): 12-hour sample times ('9:00 AM · your time'). Earlier: 1.2 (published 29 Oct): the sample type reads "Assignment" (no Homework); a time column. Earlier: 1.1 (published 28 Oct; decision 035): State Upcoming · Completed · Past due · Not yet released; the Open edX badges; the assignment type before the title ([prototype PR 410](https://github.com/nvjeronimo/skillup-lms-prototype/pull/410)). The sample assignment type reads "Assignment" (SkillUp has no "Homework"). Earlier: 27 Oct (published, Impeccable session): its badges are in sentence case, never forced capitals ([prototype PR 401](https://github.com/nvjeronimo/skillup-lms-prototype/pull/401), merged). Earlier: 7 Oct 2026: Platform screens: badge texts restored where the update has landed; one badge removed |
| **[Grade-Meter](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22454 "LMS/Platform/Course-Detail/Grade-Meter")** | v1.2 | Published | 1 | not placed on the pages counted | 28 Oct 2026 · track on bg/track (SKO match audit)<br>1.2 (published 28 Oct, SKO match audit): track on bg/track. Earlier: 20 Oct 2026: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Platform components moved into the DS library |
| **[Grade-Summary-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22461 "LMS/Platform/Course-Detail/Grade-Summary-Row")** | v1.0 | Published | 3 | not placed on the pages counted | 6 Oct 2026<br>Local components → the DS |
| **[Lock](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21959 "LMS/Platform/Course-Detail/Lock")** | v1.0 | Published | 2 | ICP + LMS<br>ICP 16 · LMS 31 | 24 Sep 2026<br>The Lock molecule on the locked topic |
| **[Message](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22640 "LMS/Platform/Course-Detail/Message")** | v1.1 | Published | 4 | LMS<br>LMS 28 | 27 Oct 2026 · badges in sentence case<br>27 Oct (published, Impeccable session): its badges are in sentence case, never forced capitals ([prototype PR 401](https://github.com/nvjeronimo/skillup-lms-prototype/pull/401), merged). Earlier: 20 Oct 2026: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: After another publish: badges read \*Label\* again in the product file |
| **[Meta](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21877 "LMS/Platform/Course-Detail/Meta")** | v1.0 | Published | 1 | ICP + LMS<br>ICP 104 · LMS 304 | 24 Sep 2026<br>Course Detail mobile — the Course tab |
| **[Module-Number](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21952 "LMS/Platform/Course-Detail/Module-Number")** | v1.0 | Published | 3 | ICP + LMS<br>ICP 32 · LMS 87 | 6 Oct 2026<br>Platform components moved into the DS library |
| **[Module-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21966 "LMS/Platform/Course-Detail/Module-Row")** | v1.2 | Published | 6 | ICP + LMS<br>ICP 32 · LMS 87 | 29 Oct 2026 · readable texts at body-medium; meta no longer clipped<br>1.2 (published 29 Oct): readable texts at body-medium; the meta line is no longer clipped. Earlier: 20 Oct 2026: corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Platform components moved into the DS library |
| **[Progress-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21894 "LMS/Platform/Course-Detail/Progress-Card")** | v1.5 | Published | 4 | ICP + LMS<br>ICP 8 · LMS 58 | 29 Oct 2026 · rebuild, bg/track<br>1.5 (published 29 Oct): no visual change; republished so stale ICP instances (old progress-bar tree, bg/strong track) rebuild with bg/track and the current text-xs variable. Earlier: 28 Oct 2026 · track on bg/track (SKO match audit): 1.4 (published 28 Oct, SKO match audit): track on bg/track. Earlier: 25 Oct 2026: 1.3: Completed is Badge Soft sm Success, no icon, on the course/program Progress card ([prototype PR 320](https://github.com/nvjeronimo/skillup-lms-prototype/pull/320), [prototype PR 323](https://github.com/nvjeronimo/skillup-lms-prototype/pull/323), [docs PR 208](https://github.com/nvjeronimo/skillup-lms-prd/pull/208) (merged), [docs PR 210](https://github.com/nvjeronimo/skillup-lms-prd/pull/210) (merged)). Earlier: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: State=Complete: check icon + "Completed" beside the green bar, as on the cards |
| **[Score-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22477 "LMS/Platform/Course-Detail/Score-Row")** | v1.0 | Published | 2 | not placed on the pages counted | 6 Oct 2026<br>Local components → the DS |
| **[Section-Intro](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-21891 "LMS/Platform/Course-Detail/Section-Intro")** | v1.0 | Published | 1 | ICP + LMS<br>ICP 8 · LMS 39 | 6 Oct 2026<br>Platform components moved into the DS library |
| **[Sidebar-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22090 "LMS/Platform/Course-Detail/Sidebar-Card")** | v1.2 | Published | 6 | ICP + LMS<br>ICP 40 · LMS 112 | 28 Oct 2026 · Course team in sentence case with Olivia Rhye; Handout Links gap Spacing/3xl; program instructor roles in sentence case (SKO match audit)<br>1.2 (published 28 Oct, SKO match audit): Course team in sentence case with Olivia Rhye; Handout Links gap Spacing/3xl; program instructor roles in sentence case. Earlier: 20 Oct 2026: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Platform screens: badge texts restored where the update has landed; one badge removed |
| **[Thread-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22608 "LMS/Platform/Course-Detail/Thread-Row")** | v1.0 | Published | 3 | LMS<br>LMS 24 | 27 Oct 2026 · badges in sentence case<br>27 Oct (published, Impeccable session): its badges are in sentence case, never forced capitals ([prototype PR 401](https://github.com/nvjeronimo/skillup-lms-prototype/pull/401), merged). Earlier: 7 Oct 2026: Platform screens: badge texts restored where the update has landed; one badge removed |
| **[Topic-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22049 "LMS/Platform/Course-Detail/Topic-Row")** | v1.0 | Published | 6 | ICP + LMS<br>ICP 72 · LMS 159 | 6 Oct 2026<br>Handoff audit, third pass (after the DS publish) |
| **[Week-Day](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22342 "LMS/Platform/Course-Detail/Week-Day")** | v1.1 | Published | 5 | ICP + LMS<br>ICP 56 · LMS 231 | 29 Oct 2026 · rebuild, text-xs<br>1.1 (published 29 Oct): no visual change; republished so ICP instances move to the current text-xs variable (13/18 on desktop and tablet). Earlier: 20 Oct 2026: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Platform components moved into the DS library |
| **[Weekly-Goal-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22174 "LMS/Platform/Course-Detail/Weekly-Goal-Card")** | v1.1 | Published | 8 | ICP + LMS<br>ICP 8 · LMS 51 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Platform components moved into the DS library |
| Completion 5  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Certificate](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537956 "LMS/Platform/Completion/Certificate")** <br>was “LMS / Course Certificate” | v1.3 | Published | 1 | ICP<br>ICP 3 | 5 Nov 2026 · follows 5. Scope<br>1.3 (5 Nov): what Open edX does not have is bound to scope/beyond-edx (DS collection 5. Scope), so it hides in Open edX only. Earlier: 1.2 (published 28 Oct, SKO match audit): "96% Avg quiz" in text/default. Earlier: 20 Oct 2026: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer |
| **[Certificate-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22009-22360 "LMS/Platform/Completion/Certificate-Card")** | v1.7 | Published | 5 | ICP + LMS<br>ICP 8 · LMS 66 (recounted 30 Oct) + 21 on the Program Certificates screens (r3, 31 Oct); plus 42 in the SUPERSEDED Certificates screens | 3 Nov 2026 · 1.7: Earned without Download<br>1.7 (published 3 Nov, Nelson): Status=Earned-Certificate drops Download; View fills the row with Share beside it. Download stays on the certificate page only ([decision 039](https://github.com/nvjeronimo/skillup-lms-prd/blob/main/00-decisions/039-certificate-download-on-page-only.md), [docs PR 244](https://github.com/nvjeronimo/skillup-lms-prd/pull/244); [prototype PR 455](https://github.com/nvjeronimo/skillup-lms-prototype/pull/455)). 1.6 (published 2 Nov, Nelson): the Earned badge on Status=Earned-Certificate leads with award-01 instead of check-circle (prototype PR [450](https://github.com/nvjeronimo/skillup-lms-prototype/pull/450)). 1.5 (published 31 Oct): Status=Earned-Certificate gets a Label row: the "Certificate" label and a Badge Soft sm Success "Earned" at the far end (space-between, gap Spacing/sm) (prototype PRs [446](https://github.com/nvjeronimo/skillup-lms-prototype/pull/446), [447](https://github.com/nvjeronimo/skillup-lms-prototype/pull/447)). Earlier: 1.4 (published 30 Oct): new Status=Preview for the program's Certificates tab: the sheet the course will issue, muted, with "Pass the course", then "Not earned yet", "Issued when you:" and the two conditions as check rows, no detail and no bars (prototype PRs [439](https://github.com/nvjeronimo/skillup-lms-prototype/pull/439), [440](https://github.com/nvjeronimo/skillup-lms-prototype/pull/440)). Course Detail and the Progress tab keep Not earned with the bars. Earlier: 1.3 (29 Oct): the progress track on bg/track; 1.2 (20 Oct 2026): corner radii on the role tokens (decision 028). |
| **[Certificate-Document](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22261-2968 "LMS/Platform/Completion/Certificate-Document")** <br>was “Certificate-Document-demo” | v1.4 | Published | 1 | LMS<br>LMS 11 | 5 Nov 2026 · follows 5. Scope<br>1.4 (5 Nov): what Open edX does not have is bound to scope/beyond-edx (DS collection 5. Scope), so it hides in Open edX only. Earlier: 1.3 (published 28 Oct): the SkillUp logo is the LMS/Brand/SkillUp-Logo 1.0 instance. Earlier: 1.2 (20 Oct): pinned to SKO Light, the sheet keeps its printed colours on dark screens ([prototype PR 205](https://github.com/nvjeronimo/skillup-lms-prototype/pull/205), [docs PR 134](https://github.com/nvjeronimo/skillup-lms-prd/pull/134)). 1.1 (19 Oct): Out of In review onto ↳ Completion; boolean Second partner (IBM + Microsoft). [prototype PR 202](https://github.com/nvjeronimo/skillup-lms-prototype/pull/202) (Dashboard certificate figures) · [docs PR 131](https://github.com/nvjeronimo/skillup-lms-prd/pull/131) |
| **[Course-Complete-Modal](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19975-537944 "LMS/Platform/Completion/Course-Complete-Modal")** <br>was “LMS / Course Complete Modal” | v1.0 | Published | 1 | ICP<br>ICP 3 | 8 Oct 2026<br>Renamed from “LMS / Course Complete Modal” |
| **[Share-Menu](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22898-584515 "LMS/Platform/Completion/Share-Menu")** | v1.1 | Published |  | new on 20 Oct, not counted | 20 Oct 2026<br>4 px padding all round, rows on Radius/card-inset (8), panel on Radius/card (decision 028) |
| Certificates 2  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Certificate-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23738-1035 "LMS/Platform/Certificates/Certificate-Row")** <br>LMS/Platform/Certificates/Certificate-Row | v1.4 | Published | 12 | ICP<br>nested in Program-Certificates-Card | 2 Nov 2026 · 1.4: Earned with the certificate icon<br>1.4 (published 2 Nov, Nelson): Kind=Earned (Course and Program), the Earned badge leads with award-01 instead of check-circle (prototype PR [450](https://github.com/nvjeronimo/skillup-lms-prototype/pull/450)). 1.3 (published 30 Oct): every earned row says View certificate (course rows said View; [prototype PR 441](https://github.com/nvjeronimo/skillup-lms-prototype/pull/441)); the sheet at the start of a row links to the course or program page, as the title ([prototype PR 442](https://github.com/nvjeronimo/skillup-lms-prototype/pull/442); out of the tab order and hidden from assistive tech in code). ICP 05 · Certificates: the cards swapped to the current library version by script (the accepted update had left them on the old copy). Earlier: 1.2 (30 Oct): Kind Earned / In progress / Not started × Level Course / Program × Layout Row / Stacked ([prototype PR 437](https://github.com/nvjeronimo/skillup-lms-prototype/pull/437)); 1.0 (29 Oct): one course certificate as a compact row ([prototype PR 428](https://github.com/nvjeronimo/skillup-lms-prototype/pull/428)). |
| **[Program-Certificates-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23740-8586 "LMS/Platform/Certificates/Program-Certificates-Card")** <br>LMS/Platform/Certificates/Program-Certificates-Card | v1.4 | Published | 6 | ICP<br>ICP 7 (WIP page, 05 · Certificates) | 3 Nov 2026 · 1.4: course rows folded by default<br>1.4 (published 3 Nov, Nelson): Open defaults to off and Fold chevron to chevron-down, on every breakpoint; for the open state set Open on and swap the chevron to chevron-up (prototype PR [454](https://github.com/nvjeronimo/skillup-lms-prototype/pull/454)). 1.3 (published 2 Nov, Nelson): Kind=Program, the program's own row sits on the card's white (no bg/subtle band) and the rail beside the course rows is 1px (was 2); its rows carry the Earned badge with the certificate icon (Certificate-Row 1.4) (prototype PRs [450](https://github.com/nvjeronimo/skillup-lms-prototype/pull/450), [451](https://github.com/nvjeronimo/skillup-lms-prototype/pull/451)). 1.2 (published 30 Oct): Kind Program / Single courses × Breakpoint Desktop / Tablet / Mobile; Program = the program's Certificate-Row on bg/subtle, a fold line (Open, Fold label, Fold chevron) and up to 7 course rows on a rail; Single courses = up to 6 rows ([prototype PR 437](https://github.com/nvjeronimo/skillup-lms-prototype/pull/437), merged). Earlier: 1.1 hero defaults; 1.0 one card per program with Show / Hide, State Earned / Not earned / Other courses ([prototype PR 428](https://github.com/nvjeronimo/skillup-lms-prototype/pull/428)). |
| Assistant 2  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Assistant-Chat](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22493-391 "LMS/Platform/Assistant/Assistant-Chat")** | v1.5 | Published | 6 | the ICP feature preview page only | 29 Oct 2026 · readable texts at body-medium<br>1.5 (published 29 Oct): readable texts at body-medium. Earlier: migrated 26 Oct 2026: the floating chat is retired and kept as reference; the prototype opens the panel window from Search + Assistant ([prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369)); the description says so, the DS is not published yet. 26 Oct 2026: the prototype has a panel variant for Harbor and Fluent (white header, four topics, under the top-bar button; [prototype PR 359](https://github.com/nvjeronimo/skillup-lms-prototype/pull/359)), not in the DS. 1.4 (published 23 Oct): a dark header with the mark in a 40 tile and Secondary Icon Buttons (New conversation in the conversation states, Close); Empty, First steps and First steps done greet in large type ("Hey John / How can we help?") and drop the title; the empty chat no longer repeats the hello; First steps is one compact card (the title and "N of 5 done" over the bar; rows with the step circle, the label, and a Completed badge or the step's button) ([prototype PR 291](https://github.com/nvjeronimo/skillup-lms-prototype/pull/291), [docs PR 189](https://github.com/nvjeronimo/skillup-lms-prd/pull/189)). ICP: the 9 instances on the AI Assistant page swapped to the served variants (the tab held the old library). Published 23 Oct. Earlier: 1.3: the header is a dark band in both themes (SKO Dark on the Header frame). Published in the DS on 21 Oct; it stays on the In review page, not for build. The 9 ICP instances on the AI Assistant page show the dark header since Nelson accepted the update. [prototype PR 233](https://github.com/nvjeronimo/skillup-lms-prototype/pull/233) (merged 21 Oct) · [docs PR 146](https://github.com/nvjeronimo/skillup-lms-prd/pull/146) (register, merged 21 Oct). Earlier: 1.2 (15 Oct): Header on bg/subtle, ME / ASSISTANT above each message, answers on bg/primary, AI notice under the input (1.1, 13 Oct: two states added for first steps (First steps, First steps done); Empty starts with the next step). In the library so the ICP feature preview page can use it; not for build yet.. Earlier: First steps states added (First steps, First steps done); Empty starts with the next step. In the library so the preview page can use it; not for build yet. |
| **[Assistant-Launcher](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22493-224 "LMS/Platform/Assistant/Assistant-Launcher")** | v1.4 | In review | 3 | the ICP feature preview page only | 22 Oct 2026<br>Retired 26 Oct 2026: no floating launcher in the prototype any more ([prototype PR 369](https://github.com/nvjeronimo/skillup-lms-prototype/pull/369)); kept as reference, the description starts with "Migrated 26 Oct 2026" (DS not published yet). 22 Oct · The ring is a 3px polished-metal ring in SkillUp blue (angular gradient strokes: metal lit from the top left + a white glint at rest at the top); the glint runs round it in code. Published 22 Oct. (Earlier: 21 Oct: prototype: the mark's three sparkles now use the DS vectors (smaller, further into the ball); the animations were checked against the DS: the ring turns once in 3.6 s, linear; the sparkles run on 12 / 15 / 19 s cycles, pause while the chat is open and stay still under reduced motion ([prototype PR 240](https://github.com/nvjeronimo/skillup-lms-prototype/pull/240), merged 21 Oct). Earlier: 16 Oct: Count on bg/primary (audit D1) (v1.2: The ball wears a 2px gradient ring (to animate in code); count badge on bg/info (1.1, 13 Oct: 48 px; closed is the assistant mark; Closed with count added, first steps left). In the library so the ICP feature preview page can use it; not for build yet.). Earlier: 48 px, the assistant mark, Closed with count. In the library so the preview page can use it; not for build yet.) |
| Calendar 4  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Event-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22832-606 "LMS/Platform/Calendar/Event-Row")** | v1.1 | Published | 6 | new on 19 Oct, not counted | 28 Oct 2026 · "PROJECT · 11:59 PM · your time" (staff-graded samples)<br>1.1 (published 28 Oct, staff-graded samples): "PROJECT · 11:59 PM · your time". Earlier: 20 Oct 2026: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: New. Built for the Calendar page (Ready for Dev, frame 7392:200778) and published. [docs PR 123](https://github.com/nvjeronimo/skillup-lms-prd/pull/123) |
| **[Week-Day](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22832-621 "LMS/Platform/Calendar/Week-Day")** | v1.1 | Published | 2 | new on 19 Oct, not counted | 29 Oct 2026 · rebuild, text-xs<br>1.1 (published 29 Oct, number kept): no visual change; republished so ICP instances move to the current text-xs variable (13/18 on desktop and tablet). Earlier: 20 Oct 2026: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: New. Built for the Calendar page (Ready for Dev, frame 7392:200778) and published. [docs PR 123](https://github.com/nvjeronimo/skillup-lms-prd/pull/123) |
| **[Month-Event](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22832-649 "LMS/Platform/Calendar/Month-Event")** | v1.2 | Published | 9 | new on 19 Oct, not counted | 29 Oct 2026 · rebuild, text-xs<br>1.2 (published 29 Oct, number kept): no visual change; republished so ICP instances move to the current text-xs variable (13/18 on desktop and tablet). Earlier: 28 Oct 2026 · Past due in amber: 1.2 (published 28 Oct; decision 035): Status Missed is renamed Past due, in amber ([prototype PR 410](https://github.com/nvjeronimo/skillup-lms-prototype/pull/410)). Earlier: 1.1 (20 Oct 2026): Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: New. Built for the Calendar page (Ready for Dev, frame 7392:200778) and published. [docs PR 123](https://github.com/nvjeronimo/skillup-lms-prd/pull/123) |
| **[Month-Day](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22832-680 "LMS/Platform/Calendar/Month-Day")** | v1.1 | Published | 3 | new on 19 Oct, not counted | 29 Oct 2026 · rebuild, text-xs<br>1.1 (published 29 Oct): no visual change; republished so ICP instances move to the current text-xs variable (13/18 on desktop and tablet). Earlier: 19 Oct 2026: New. Built for the Calendar page (Ready for Dev, frame 7392:200778) and published. [docs PR 123](https://github.com/nvjeronimo/skillup-lms-prd/pull/123) |
| Discussion 1  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Inbox-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22832-1052 "LMS/Platform/Discussion/Inbox-Row")** | v1.0 | Published | 3 | new on 19 Oct, not counted | 27 Oct 2026 · badges in sentence case<br>27 Oct (published, Impeccable session): its badges are in sentence case, never forced capitals ([prototype PR 401](https://github.com/nvjeronimo/skillup-lms-prototype/pull/401), merged). Earlier: 19 Oct 2026: New. Built for the Discussion page (Ready for Dev, frame 7392:200778) and published. [docs PR 123](https://github.com/nvjeronimo/skillup-lms-prd/pull/123) |
| Services 6  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Service-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=22832-1053 "LMS/Platform/Services/Service-Row")** | v1.1 | Deprecated | 1 | new on 19 Oct, not counted | 24 Oct 2026<br>Deprecated (Nelson, 24 Oct): unused since prototype PR 307. Use Mentor-Card, Support-Card, Included-Card, Service-Link and Request-Row. Earlier: Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: New. Built for the Services page (Ready for Dev, frame 7392:200778) and published. [docs PR 123](https://github.com/nvjeronimo/skillup-lms-prd/pull/123) |
| **[Mentor-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23403-227 "LMS/Platform/Services/Mentor-Card")** <br>LMS/Platform/Services/Mentor-Card · Organism | v1.1 | Published |  | LMS<br>ICP 08 · Services | 28 Oct 2026 · actions pinned to the bottom, "Ask your mentor", mentor name bold (SKO match audit)<br>1.1 (published 28 Oct, SKO match audit): actions pinned to the bottom, "Ask your mentor", mentor name bold. Earlier: 23 Oct 2026 · New: New. Services page by weight ([prototype PR 307](https://github.com/nvjeronimo/skillup-lms-prototype/pull/307)). ICP 08 · Services screens rebuilt from them: the Services components are on the ICP 08 · Services screens (desktop, tablet, mobile); the Mentor-Card and Support-Card actions wrap on narrow cards (the ICP needed a swap by key after the publish). [docs PR 203](https://github.com/nvjeronimo/skillup-lms-prd/pull/203) (merged). |
| **[Support-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23403-268 "LMS/Platform/Services/Support-Card")** <br>LMS/Platform/Services/Support-Card · Organism | v1.0 | Published |  | LMS<br>ICP 08 · Services | 23 Oct 2026 · New<br>New. Services page by weight ([prototype PR 307](https://github.com/nvjeronimo/skillup-lms-prototype/pull/307)). ICP 08 · Services screens rebuilt from them: the Services components are on the ICP 08 · Services screens (desktop, tablet, mobile); the Mentor-Card and Support-Card actions wrap on narrow cards (the ICP needed a swap by key after the publish). [docs PR 203](https://github.com/nvjeronimo/skillup-lms-prd/pull/203) (merged). |
| **[Included-Card](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23402-75 "LMS/Platform/Services/Included-Card")** <br>LMS/Platform/Services/Included-Card · Molecule | v1.1 | Published |  | LMS<br>ICP 08 · Services | 28 Oct 2026 · actions pinned to the bottom (SKO match audit)<br>1.1 (published 28 Oct, SKO match audit): actions pinned to the bottom. Earlier: 23 Oct 2026 · New: New. Services page by weight ([prototype PR 307](https://github.com/nvjeronimo/skillup-lms-prototype/pull/307)). ICP 08 · Services screens rebuilt from them: the Services components are on the ICP 08 · Services screens (desktop, tablet, mobile); the Mentor-Card and Support-Card actions wrap on narrow cards (the ICP needed a swap by key after the publish). [docs PR 203](https://github.com/nvjeronimo/skillup-lms-prd/pull/203) (merged). |
| **[Service-Link](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23402-96 "LMS/Platform/Services/Service-Link")** <br>LMS/Platform/Services/Service-Link · Molecule | v1.0 | Published |  | LMS<br>ICP 08 · Services | 23 Oct 2026 · New<br>New. Services page by weight ([prototype PR 307](https://github.com/nvjeronimo/skillup-lms-prototype/pull/307)). ICP 08 · Services screens rebuilt from them: the Services components are on the ICP 08 · Services screens (desktop, tablet, mobile); the Mentor-Card and Support-Card actions wrap on narrow cards (the ICP needed a swap by key after the publish). [docs PR 203](https://github.com/nvjeronimo/skillup-lms-prd/pull/203) (merged). |
| **[Request-Row](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23402-104 "LMS/Platform/Services/Request-Row")** <br>LMS/Platform/Services/Request-Row · Molecule | v1.0 | Published |  | LMS<br>ICP 08 · Services | 23 Oct 2026 · New<br>New. Services page by weight ([prototype PR 307](https://github.com/nvjeronimo/skillup-lms-prototype/pull/307)). ICP 08 · Services screens rebuilt from them: the Services components are on the ICP 08 · Services screens (desktop, tablet, mobile); the Mentor-Card and Support-Card actions wrap on narrow cards (the ICP needed a swap by key after the publish). [docs PR 203](https://github.com/nvjeronimo/skillup-lms-prd/pull/203) (merged). |
| Overlays 1  | | | | | |
| --- | --- | --- | --- | --- | --- |
| **[Form-Modal](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23377-1733 "LMS/Platform/Overlays/Form-Modal")** <br>LMS/Platform/Overlays/Form-Modal · Organism | v1.0 | Published | 2 | new on 23 Oct, not counted | 23 Oct 2026 · New: the platform's form modal<br>New: the platform's form modal for every short form: Ask a question, New post, Report a message, Contact support, Book CV review / Interview, Edit weekly goal, Calendar sync. Breakpoint Desktop / Mobile. Title, Description, Show description, Show cancel, body as a slot ([prototype PR 300](https://github.com/nvjeronimo/skillup-lms-prototype/pull/300); Published in the register: [docs PR 199](https://github.com/nvjeronimo/skillup-lms-prd/pull/199) (merged)). DS page "↳ Overlays" with its doc page. ICP: frame "12 · Form modals" ([7734:96450](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7734-96450)) stays in review. |

Base components 29

| Component | Version | Status | Variants | Used in | Last change recorded |
| --- | --- | --- | --- | --- | --- |
| **[Alert](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1130-81134)** | v1.0 | Published |  | ICP + LMS<br>ICP 44 · LMS 30 (ICP: 8 counted on 8 Oct, plus the 36 lab blocks of 12 Oct) | 12 Oct 2026<br>Holds the lab prerequisites on 36 screens (Brand, Floating) |
| **[Avatar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=19-1012)** | v1.0 | Published |  | ICP + LMS<br>ICP 238 · LMS 161 | 1 Oct 2026<br>Top bar light; badges on every breakpoint; mobile Q&A conversation as one card |
| **[Avatar label group](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=82-2793)** | v1.0 | Published |  | ICP + LMS<br>ICP 121 · LMS 65 | – |
| **[Badge](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21889-541076)** | v1.2 | Published |  | ICP + LMS<br>ICP 1199 · LMS 1093, counted 12 Oct | 21 Oct 2026<br>1.2: Gray Soft (and the Plain icon circle) on bg/muted, was bg/faint — the count badge vanished on the bg/faint platform pages and on white cards (1.05:1). In the ICP all Gray Soft badges are already on 1.2. [prototype PR 239](https://github.com/nvjeronimo/skillup-lms-prototype/pull/239) · [docs PR 152](https://github.com/nvjeronimo/skillup-lms-prd/pull/152). Earlier: 1.1 (12 Oct): Dot, icons and close follow the label colour; no version in the name; the V1 set deleted |
| **[Breadcrumbs](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1122-153)** | v1.1 | Published |  | ICP + LMS<br>ICP 8 · LMS 58 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: The verb goes, and the tooltip was in the library too |
| **[Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-7608)** | v1.4 | Published |  | ICP + LMS<br>ICP 831 · LMS 274, counted 12 Oct | 20 Oct 2026<br>Tertiary Hover on bg/hover (alias of bg/muted), was bg/faint. |
| **[Button group](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1046-10171)** | v1.2 | Published |  | LMS<br>LMS 22 | 20 Oct 2026<br>Track on bg/track (alias of bg/muted). |
| **[Buttons/Button (previous generation)](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-5715) (page)** | v1 | Legacy |  | no instance left on the pages counted | 12 Oct 2026<br>Legacy: replaced on the screens and in the LMS components by Button, Link Button and Icon Button |
| **[Close Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-5715) (page)** | v1.1 | Published |  | ICP + LMS<br>ICP 164 · LMS 25, counted 12 Oct | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Was “Buttons/Button close X”: back in the library under this name, same key |
| **[Utility Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-5715) (page)** | v1.1 | Published |  | ICP + LMS<br>ICP 348 · LMS 4, counted 12 Oct | 20 Oct 2026<br>Hover on bg/hover (alias of bg/muted), was bg/faint. |
| **[Checkbox](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1097-63652)** | v1.1 | Published |  | ICP<br>ICP 919 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: ORA on tablet and mobile; the all-content example covers the whole catalogue |
| **[Content divider](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1252-126874)** | v1.1 | Published |  | LMS<br>LMS 18 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Course Detail: every tab on mobile; tokens and components audited |
| **[FilterChip](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=23718-549)** <br>page "↳ Button groups" | v1.0 | Published |  | ICP + LMS<br>ICP 24 · Edit profile, Areas of interest | 29 Oct 2026 · New: a pill that turns one filter or choice on and off<br>1.0 (published 29 Oct, Nelson): one toggle button (aria-pressed) per value, for picking one or more values from a short list: Areas of interest in Edit profile, tag filters in Notes, the overlay panel filters. State Default, Hover, Focused, Active; Size md is 28 tall. Prototype: Edit profile Career section ([prototype PR 421](https://github.com/nvjeronimo/skillup-lms-prototype/pull/421)), shown in Open edX scope since [PR 426](https://github.com/nvjeronimo/skillup-lms-prototype/pull/426) (SkillUp marketing fields). |
| **[Horizontal tabs](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1118-69893)** | v1.3 | Published |  | ICP + LMS<br>ICP 44 · LMS 78 | 28 Oct 2026 · page tabs 20/600, about 40 between labels (SKO match audit)<br>1.3 (published 28 Oct, SKO match audit): page tabs 20/600, about 40 between labels. Earlier: 27 Oct 2026 · Size=lg on title-large: 27 Oct (published): the \_Tab button base Size=lg label (36 variants) is on title-large / Semibold, 20 / 30 on desktop and tablet, 18 / 28 on mobile ([prototype PR 400](https://github.com/nvjeronimo/skillup-lms-prototype/pull/400), merged); all ICP Size=lg tabs on the published copy (94 swapped from a stale copy). Earlier: 25 Oct: 1.2: adds Size=lg for platform-page tabs (desktop 24 headline-small, Mobile breakpoint 18 title-large, Semibold); published; 95 ICP instances on Size=lg ([prototype PR 341](https://github.com/nvjeronimo/skillup-lms-prototype/pull/341), [prototype PR 342](https://github.com/nvjeronimo/skillup-lms-prototype/pull/342), [docs PR 222](https://github.com/nvjeronimo/skillup-lms-prd/pull/222)). \_Tab button base: published 25 Oct (lg count-badge link). Earlier: 20 Oct: corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: DS: Button publishable again, tabs already on Badge, Course Card measured |
| **[Icon Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-7720)** | v1.3 | Published |  | ICP + LMS<br>ICP 94 · LMS 7, counted 12 Oct | 20 Oct 2026<br>Tertiary Hover on bg/hover (alias of bg/muted), was bg/faint. |
| **[Input field](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1090-57817)** | v1.1 | Published |  | ICP + LMS<br>ICP 20 · LMS 59 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: DS: `Program-Card` without the cohort, week and lesson counters |
| **[Link Button](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21851-7679)** | v1.3 | Published |  | ICP + LMS<br>ICP 240 · LMS 184, counted 12 Oct | 29 Oct 2026 · rebuild, text-xs<br>1.3 (published 29 Oct): description only; ICP instances rebuild on the current text-xs variable. Earlier: 15 Oct 2026: Hover has no fill: the label and its 1px bottom line darken (Brand text/on-primary-soft + icon/default, Destructive accent-red, Success accent-green, Secondary text/muted + icon/muted). The line uses the icon token of its tone. Focused: bg/faint, radius 6. Prototype PR 166 |
| **[Loading indicator](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1192-610)** | v1.0 | Published |  | ICP + LMS<br>ICP 1 · LMS 1 | – |
| **[Progress bar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1085-57382)** | v1.1 | Published |  | ICP + LMS<br>ICP 72 · LMS 176 | 20 Oct 2026<br>Track on bg/track (alias of bg/muted); the bg/info fill is 3.21:1, was 2.26:1 (Bruno). |
| **[Progress circle](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20377-3832)** | v1.2 | Published | 3 | ICP + LMS<br>ICP 93 · LMS 2 | 21 Oct 2026<br>1.2: new Size=xxxxs (32, band 3, % inside in body-small/Semibold) for the phone player bar ([prototype PR 216](https://github.com/nvjeronimo/skillup-lms-prototype/pull/216)). Earlier: Renamed from LMS / Progress Circle; the only progress circle now (the Untitled UI kit one was archived). Same component, links kept. |
| **[Radio group item](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=124-2838)** | v1.0 | Published |  | LMS<br>LMS 30 | – |
| **[Select](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=85-1269) (page)** | v1.1 | Published |  | ICP<br>ICP 3 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: Mobile tabs stay tabs, and the touch target gets bigger |
| **[Tag](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=20837-1793)** | v1.0 | Published |  | ICP<br>ICP 12 | 8 Oct 2026<br>DS: `Program-Card` without the cohort, week and lesson counters |
| **[Textarea input field](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1238-278)** | v1.1 | Published |  | ICP<br>ICP 20 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: `LMS / Note Editor` built in the DS (not published yet) |
| **[Toast](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=21089-1214)** | v1.1 | Published |  | ICP<br>ICP 3 | 14 Oct 2026<br>Tone icons on icon tokens: Neutral icon/muted, Success icon/success, Warning icon/warning, Critical icon/error; Info stays on icon/primary. Before: border/default, icon/success-strong (2.81:1), bg/warning and bg/error |
| **[Toggle](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1102-4208)** | v1.0 | Published |  | LMS<br>LMS 10 | – |
| **[Tooltip](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1052-489)** | v1.1 | Published |  | ICP + LMS<br>ICP 4 · LMS 9 | 20 Oct 2026<br>Corner radii on the role tokens (decision 028): cards 12, controls 6, nested parts by inner + padding = outer. Earlier: DS: Button publishable again, tabs already on Badge, Course Card measured |
| **[Video player 16:9](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=9264-576771)** | v1.1 | Published |  | ICP + LMS<br>ICP 49 · LMS 2 | 28 Oct 2026 · phone controls = time + progress row, then play, volume, prev/next, 1×, CC, fullscreen (SKO match audit)<br>1.1 (published 28 Oct, SKO match audit): phone controls = time + progress row, then play, volume, prev/next, 1×, CC, fullscreen. |
| **[\_Video actions bar](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=9264-576129)** <br>private base of Video player 16:9 · page ↳ Video players | v1.3 | Published |  | inside Video player 16:9 | 5 Nov 2026 · follows 5. Scope<br>1.3 (5 Nov): what Open edX does not have is bound to scope/beyond-edx (DS collection 5. Scope), so it hides in Open edX only. Earlier: 1.2 (published 29 Oct): the sm timestamp hugs its text. Earlier: 1.1 (published 28 Oct, SKO match audit): phone controls = time + progress row, then play, volume, prev/next, 1×, CC, fullscreen. |

<a id="figma"></a>

## Figma

Two files: the ICP and platform screens, and the SKO design system they are built from.

### LMS ICP Phase 1 — screens

[**Video Lessons** · Ready for dev](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3785-11385)
[**Quizzes** · Ready for dev](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=5089-15920)
[**Reading** · Ready for dev](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=5685-170870)
[**Reading · every block** · The example holding everything Studio can author](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=5888-53100)
[**Flows + Business Logic** · Navigation diagram, 47 business rules, references](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3832-18102)
[**Topic Content Types Discovery** · Ready for review](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4692-444)
[**Lab · Third-party platforms** · 30 screens (10 desktop, 10 tablet, 10 mobile): Google and Microsoft in a new tab (default) · in the page (AZ-900, SC-900) · IBM redirect. Doc: LMS-HANDOFF/lab-third-party-platforms.md · Ready for dev](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6789-325)
[**Activity (SCORM)** · 50 screens (16 desktop, 16 tablet, 18 mobile): in the page (default) · new window · exceptions · canonical course-package flow. Doc: LMS-HANDOFF/activity-scorm.md · Ready for dev](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7428-1069)
[**Overlay Panels** · Ready for review](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3827-64809)
[**Completion + Certificate** · In progress](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=3830-76219)
[**Platform Pages · Ready for Dev** · Course Detail, Weekly goal and Certificates; My Learning and Dashboard still in progress](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4340-322)
[**Platform Pages V8 · WIP** · In progress](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6207-245582)
[**My Learning and Dashboard · sources** · In progress](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6374-16005)
[**Program Detail · sources** · In progress](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6443-18721)
[**Program Page · handoff** · In progress](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6728-15050)
[**Content search · feature 33** · In progress](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6837-27914)
[**Course-Header backgrounds · export** · In progress](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=6831-22084)
[**AI Assistant · floating chat · migrated to Search bar (26 Oct)** · Reference](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/?node-id=7166-328)

### SKO Design System

[**LMS Components** · Lesson Block, Quiz, ORA, Drag and Drop, Topic Header… Now an index: each group has its own page.](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/SKO-Design-System?node-id=1030-33572)
[**LMS Platform Components** · The platform components of Course Detail, Dashboard, My Learning and Program Detail. Now an index: each group has its own page.](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/SKO-Design-System?node-id=22011-941)
[**Badges** · Badge, its \_Badge base atom, and the Light/Dark showcase](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/SKO-Design-System?node-id=12-539)
[**Foundations** · Colours, type, spacing, icons](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/SKO-Design-System?node-id=925-34508)
[**Mobile App Components** · Mobile navigation, cards](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/SKO-Design-System?node-id=20680-3695)

<a id="pages"></a>

## Published pages

Shareable references built alongside the work.

[**Topic Type Rule** · How Open edX picks a unit's type, with a simulator](https://claude.ai/artifact/8TMV2dzzuRoFwCyRe19KyW)
[**DS Manual for Designers** · The colour roles, explained with real renders](https://claude.ai/artifact/WhQnhby4zK8UkfZ5sd4bCG)
[**SKO Design System Docs** · The design system reference](https://claude.ai/artifact/NR7WqoAn5hXx7yB3tQJT4T)
[**SKO Design System Plan** · The restructure: libraries, tiers, promotion path](https://claude.ai/artifact/RLc4WtxqwFENweFNCUxeds)
[**SKO Component Naming** · The naming convention and reserved properties](https://claude.ai/artifact/NBtDtbrJGm77uRGpnJB1UK)
[**SKO Final Token Names** · The element-first token list](https://claude.ai/artifact/YAtAqLo6dTSNHmGiHme9BM)
[**Course Detail (prototype)** · Course, Progress and Mentorship Q&A in the prototype (Dates hidden on self-paced courses since prototype PR 411)](https://lms-prototype-mu.vercel.app/platform/course/six-sigma)
[**Dashboard (prototype)** · The learner's home; the site root opens it](https://lms-prototype-mu.vercel.app/platform/dashboard)
[**Calendar, Discussion, Services (prototype)** · The three pages behind the top bar's entries; Discussion and Services are a click away](https://lms-prototype-mu.vercel.app/platform/calendar)
[**Prototype · Beyond Open edX** · The prototype opens with only what Open edX provides; this link turns on our improvements and extra features (?scope=edx goes back, prototype PRs 417 and 422)](https://lms-prototype-mu.vercel.app/platform/dashboard?scope=full)
[**Storybook** · The prototype's components and tokens, one story per component; rebuilt from main on every merge](https://nvjeronimo.github.io/skillup-lms-prototype/)
[**SCORM Test Course (prototype)** · Four real SCORM 1.2 packages from the content team, each with a test panel showing what the package reports (prototype PR 468)](https://lms-prototype-mu.vercel.app/platform/course/scorm-test-course)
[**SCORM and YouTube Test Program (prototype)** · On My Learning → Programs: a YouTube test course (the official embed, row 9; a lesson page with text, the embed and a quick check), the SCORM Test Course, the four packages as one-topic course packages (prototype PR 469), a package with its own menu (course 7) and the content team's POSH course in two packages (courses 8–9, PRs 472, 476)](https://lms-prototype-mu.vercel.app/platform/program/scorm-and-youtube-tests)

Nothing matches that search. Try a shorter word, like "quiz" or "video".

SkillUp ICP Hub · built from LMS-HANDOFF, the Figma files and the team's meeting notes · to change something here, ask Nelson.
