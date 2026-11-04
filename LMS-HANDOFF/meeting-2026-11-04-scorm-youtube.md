# Meeting 4 Nov 2026 · SCORM and YouTube videos: tech feasibility

ICP call (about 32 min). Kirti Mishra (BA, lead), Navdeep Malhotra, Vikas Goyal (tech), Janvi Soni (planning),
Jaspinder Kaur Sehmi (QA), Nelson Jerónimo (design). Notes written from the recording and from Kirti's analysis
*ICP Phase 1: SCORM and YouTube Video Analysis Findings* (3 Nov 2026, draft). The recording, the transcript and
the analysis document are not kept in this public repo.

**Why the meeting:** ICP Phase 1 cannot go live with the Azure video alone. The tech team asked for the YouTube and
SCORM videos to be covered too, because many programs mix the three.

## Outcomes

| Topic | Outcome | Who |
|---|---|---|
| **YouTube video** | **Designed in the ICP video experience.** Phase 1 priority; designs by 9–10 Nov. | Nelson, Navdeep |
| **YouTube progress** | Course progress is **per topic and binary**: a topic is complete or not, and how much of the video was watched does not count (Navdeep, Vikas). Watching on YouTube itself is not recorded. | — |
| **Leaving to YouTube** | The YouTube logo in the player opens the video on youtube.com. Whether it can be blocked: **a discovery ticket for Vikas**, low priority. Vikas expects it cannot. | Kirti (ticket), Vikas |
| **Mark as Complete on YouTube** | **Yes.** The learner may mark the video complete without watching it, and that is accepted (Vikas: the ticket must say so). Kirti: a message telling learners who watch on YouTube to come back and mark it. | Kirti (ticket) |
| **Transcripts and captions** | YouTube videos have none in the player today. They exist only if the video offers them (Vikas). | — |
| **Video sources** | Two: **Azure** (our own storage, already designed) and **YouTube**. No Vimeo or other provider (Vikas, Navdeep). | — |
| **SCORM package** | **Not redesigned.** We have no control over what runs inside the frame, and we do not test the package: the content team checks it, we only upload it (Jaspinder). | Navdeep |
| **SCORM course in the ICP** | A packaged course is **one topic**, named after the course, with no modules or lessons of ours. It opens the whole package, with its own menu. Navdeep asked to hide our own navigation as far as possible so the package gets the screen. | Navdeep, Nelson |
| **SCORM progress** | **Not disabled.** The course is 0% until the package reports completion, then 100% (Navdeep, Vikas). | — |
| **Test package** | Kirti asks Simran and Ayesha for a SCORM package for Nelson to test with. | Kirti |
| **Planning** | Not a major priority (the mobile app comes first), but it can go into this sprint. | Janvi |

## What we did with it (4 Nov 2026)

**Figma, ICP file, page *Phase 1 · Video Lessons*.** Two new rows after row 8, In review. Desktop shows every state; tablet (960) and mobile (375) were added the same day (cards 9.2, 9.3, 10.2, 10.3):

- **Row 9 · YouTube, progress not tracked.** This is the YouTube embed placed in a Text component, which is what
  Kirti tested.
  - The player is YouTube's own and cannot be restyled. A stand-in shows its controls.
  - An Info alert under the player says progress isn't tracked and asks the learner to select Mark as Complete.
  - There are no Transcript, Notes or Downloads tabs.
  - Next asks, then the topic is completed.
- **Row 10 · YouTube, progress tracked.** This is the video added as a Video component with its YouTube ID.
  - It plays in our player and completes by itself, with no transcript.
  - It also covers the *video not available* state: removed, private, or blocked in the region.

**Figma, page *Activity · SCORM*, group D (course packages), nine cards.**

- Our sidebar stays collapsed (Nelson's choice) and now shows the one topic.
- The course progress is 0% until the package reports completion, then 100%. It is green at 100%; on the phone
  ring the label is hidden because "100%" does not fit.
- The footer reads *1 of 1* with the course name, and there is no Previous.

Groups A–C (a package inside a unit) stay WIP.

## Our read of the analysis (to confirm with Vikas)

- **How is the YouTube video authored?** The player Kirti saw has YouTube's share button, quality menu and logo. It
  is probably the YouTube embed (an iframe) in a Text component. The Open edX Video component plays a YouTube ID in
  its own player, without those.
  - If it is an embed, the 0% → 3% that Kirti saw would come from Open edX completing a Text component a few
    seconds after it is viewed, not from the video.
  - That would explain why watching on YouTube changes nothing.
  - Recommendation (rule 035): author YouTube videos as Video components, which is row 10. They are then tracked,
    they keep the learner on the platform, and they can have a transcript.
- **Kirti's SCORM example may not be SCORM.** The features listed (transcript panel beside the video, .srt / .txt
  download, *Bookmark this page*, caption languages, a video address on the hosting domain) are those of the Open
  edX Video component with an Azure source.
  - If so, that lesson is the Azure video we already designed.
  - The 1% after watching it is the topic completing.
- **SCORM progress in a mixed course** (Kirti §6): the package reports completion (`cmi.completion_status` /
  `lesson_status`) to the SCORM XBlock, so the course can reach 100%. If a package never reports, the topic falls
  back to Next asks (group C1).

## Still open

- Vikas: can the *Watch on YouTube* exit be blocked? (discovery ticket)
- Vikas: how the SkillUp YouTube videos are authored today (embed or Video component), and how many there are.
- Kirti: the isolated SCORM progress test (a unit with only the package).
- The YouTube rows in Dark: not drawn yet. Tablet and mobile show the main state only; the other states follow desktop.
- Hiding our navigation entirely on a packaged course (Navdeep) versus the collapsed sidebar (Nelson's choice for
  now).
