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
| **Test package** | Kirti asks Simran and Ayesha for a SCORM package for Nelson to test with. Shared the same day: four packages. | Kirti |
| **Planning** | Not a major priority (the mobile app comes first), but it can go into this sprint. | Janvi |

## Kirti's minutes (Teams, 4 Nov 2026)

The minutes agree with these notes. They add the following:

- **Discovery ticket (Kirti raises it, Vikas and the tech team check, this sprint):**
  - can *Watch on YouTube* be restricted;
  - can progress be synced;
  - are transcripts or subtitles possible through an API.
- **SCORM single-topic design (Navdeep and Nelson):**
  - explore the topic title (likely the course name);
  - hide the extra topic tab and the left navigation;
  - play it full screen.
- **Dates:** YouTube designs start 5 Nov, with a sync on Fri 6 Nov. Designs are due Mon 9 or Tue 10 Nov.
- **Test packages:** Kirti shared four SCORM 1.2 packages (GenAI for Finance) the same day.
  - They play in the prototype's *SCORM Test Course* (prototype PR 468).
  - One of them, M12 *Clearing the Deck*, makes no SCORM calls, so it never reports completion.

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

## Follow-up call, 10 Nov 2026

A short call (about 10 min) with Simran Jindal (content), Kirti Mishra, Jaspinder Kaur Sehmi and Nelson Jerónimo.
Notes written from the transcript. The transcript is not kept in this public repo.

| Topic | Outcome | Who |
|---|---|---|
| **Splitting a package** | **Not possible.** A SCORM package is uploaded as the zip it arrives in. The content team cannot take files out of it, so our sidebar cannot be built from the package's own modules. | Simran |
| **How packages map to topics** | **One zip per topic.** If a course arrives as three packages, it gets three topics in Studio. If it arrives as one, it gets one topic. | Simran |
| **Two SCORM course shapes** | **Both are real.** Which one applies depends on the files the content team receives. (1) Several packages, each a topic inside our modules, with our normal sidebar. (2) One package for the whole course, with its own menu, and our sidebar collapsed. This answers the question after the 6 Nov sync (one package or several). | Nelson, Kirti |
| **Mixed courses** | **Yes.** A course can mix SCORM activities, Azure videos and readings. Simran showed one: a SCORM activity in a course with readings and an Azure video. | Simran |
| **SCORM in Studio** | It is added with the SCORM component and plays in a frame (iframe). It is an activity, not a video. | Simran, Nelson |
| **Review** | Kirti, Simran and Jaspinder will go through the prototype before Kirti closes the ticket, and will tell Nelson about anything worth flagging. | Kirti |
| **YouTube in one player** | **Still open, for Vikas.** Navdeep's 4 Nov question: can YouTube play inside our ICP video player (the same one as Azure), so learners always see one player? Nelson will tag Vikas on this question alone. | Nelson, Vikas |
| **Minutes** | Kirti will send the minutes so they can be shared with Navdeep. | Kirti |

## What we did with it (9–10 Nov 2026)

**Prototype, test program *SCORM and YouTube Test Program*.**

- PR 472 adds course 7, *Golf Explained*. It is a public Rustici sample (CC BY 3.0) given a menu like Rise's. It is the first package with its own sidebar we tested.
- PR 475 makes the frame of a course package the height of the window instead of 16:9. On the phone the frame was 176 px high, which hid the package's own navigation. PR 475 also marks the test panel as test-only.
- PR 476 adds the content team's real packages:
  - Course 8, *POSH: Prevention of Sexual Harassment*: an Articulate Rise course with its own menu and videos.
  - Course 9, *Final Quiz (Ungraded)*: POSH's final assessment, a separate Articulate Storyline package (10 questions, pass mark 80%).

  POSH is therefore one real course delivered as **two packages**, which is shape (1) above.

**Figma, page *Activity · SCORM*, group D.** Six cards, In review, built from the prototype screenshots:

- D4, D4.2, D4.3: POSH (desktop, tablet, mobile).
- D5, D5.2, D5.3: the quiz (desktop, tablet, mobile).

**Findings on the real packages:**

- Rise draws its own *EXIT COURSE* and its own *0% COMPLETE* beside our exit and our progress.
- Storyline has its own NEXT button above our Next.
- Both packages connect and report *incomplete*, and Rise resumes where the learner left off.
- Not yet checked: completion to 100%, the quiz's pass or fail score, and full screen.

## Still open

- Vikas: can YouTube play inside our video player, one player for Azure and YouTube? (asked again 10 Nov)
- Kirti, Simran, Jaspinder: review of the prototype before the ticket closes.
- Shape (1), several packages as topics inside our modules (groups A–C), is still WIP in Figma.
- Duplicate controls: Rise's exit and progress, and Storyline's Next, sit beside ours. We do not change the package, so the copy or placement around it may need a note for the content team.
- Vikas: can the *Watch on YouTube* exit be blocked? (discovery ticket)
- Vikas: how the SkillUp YouTube videos are authored today (embed or Video component), and how many there are.
- Kirti: the isolated SCORM progress test (a unit with only the package).
- The YouTube rows in Dark: not drawn yet. Tablet and mobile show the main state only; the other states follow desktop.
- Hiding our navigation entirely on a single-package course (Navdeep) versus the collapsed sidebar (Nelson's choice,
  drawn in group D and confirmed on 10 Nov).
