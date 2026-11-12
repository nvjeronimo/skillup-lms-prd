---
id: 041
title: YouTube videos play in YouTube's official embed only; back from YouTube, the alert asks to mark the video complete
date: 2026-11-12
status: accepted
audience: [designer, dev, stakeholder]
track: LMS
phase: 1
---
**Decision**
- A YouTube video plays in YouTube's official embed (Video Lessons row 9). Its progress is not tracked: the learner
  selects Mark as Complete, and Next asks.
- Row 10, YouTube inside our own player, is withdrawn.
- When the learner leaves the tab (for example, to watch on youtube.com) and comes back while the topic is not
  complete, the Info alert under the video changes to *Welcome back. Did you finish the video?* and points to
  Mark as Complete.
- Azure is used only when SkillUp owns the file and the video must not open on YouTube. There it plays in our
  player and completes by itself.

**Why**
- In the 4 Nov 2026 meeting, a discovery ticket was opened to check whether learners can be stopped from opening a
  YouTube video on youtube.com. On 12 Nov 2026 Kirti shared the tech team's answer (Teams, cc Vikas, Jaspinder,
  Janvi): it is not possible. YouTube's policies require the logo and its link to stay visible and clickable.
  No player parameter removes them, and `modestbranding` does nothing. Covering the logo or sandboxing the iframe
  is not allowed. The team must keep the official embed. Captions and transcripts already exist in the LMS. Show a
  progress note, and offer Mark as Complete when the learner returns to the tab.
- Row 10 put YouTube's iframe under our controls and click layer, so the logo could be seen but not clicked. That
  is the covering the policy forbids. Vikas's answer of 11 Nov ("YouTube can play inside our player") is superseded
  by this.
- Nelson decided on 12 Nov 2026 to withdraw row 10 and add the return-to-tab notice.

**Source** — Kirti's message in Teams, 12 Nov 2026 (tech team's discovery). Nelson's decision the same day.

**edX basis** — In Open edX, a YouTube video comes either from an embed pasted into a Text (HTML) component or from
a Video component with a YouTube ID. Only the first keeps YouTube's own player as it is. Neither records what was
watched on youtube.com. Completion stays per topic and binary (meeting of 4 Nov 2026).

**Design**
- Figma *Phase 1 · Video Lessons*: row 9 gets the "back from YouTube" state. Row 10 is marked SUPERSEDED and kept
  for history.
- Prototype PR 484: the YouTube Video Test course keeps the reading and the embed. The return-to-tab notice is in
  `TranscriptTab`.

**Dev impact**
- Keep the official embed unchanged. Do not overlay, restyle or sandbox it.
- Listen for `visibilitychange`. When the page becomes visible again after being hidden, and the topic is not
  complete, swap the alert copy. Do not use window `blur`: a click into the iframe also blurs the window.
- This is frontend only. Nothing is stored, and no Open edX change is needed (rule 035: it is a copy change on a
  platform behaviour, asked for by the stakeholder).

**Alternatives rejected**
- Row 10, YouTube in our player through the IFrame API with YouTube's controls off and our click layer on top: it
  hides the logo's link, which the policy forbids.
- Blocking *Watch on YouTube*: not possible (the tech team's discovery).
