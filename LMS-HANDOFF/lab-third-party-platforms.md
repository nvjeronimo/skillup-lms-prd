# Lab on third-party platforms (Google, Microsoft, IBM)

First pass, 8 Oct 2026. Started from the content team's messages in the *ICP Labs discussions* chat
(Kirti Mishra forwarding Simran Jindal, 8 Oct 2026). **Current state of the screens: §4** (rewritten on
12 Oct 2026). §1–§3 and §5–§8 are the record of how we got there, in date order; where they disagree with §4,
§4 stands.

The Lab documented until now is the download lab (notebook + PDF, `topic-types-inventory.md` §2). This is a
second family: the lab runs on the partner's own platform and the learner leaves ours to do it.

## 1. What the content team told us

| Partner | How it is authored today | What the learner gets |
|---|---|---|
| **Google** | The **LTI component** (`lti_consumer`). The LTI URL is added in Studio. | *LTI Consumer (External resource) · (1.0 points possible)* and an **Open Tool** button that opens the Google lab on the third-party site. |
| **Microsoft** | A **Text** component holding a direct URL to `learn.microsoft.com/…/training/modules/…`. | A plain link in the text. |
| **IBM** | Nothing in our Studio: *"taken care on IBM studio itself"*. | **Start course** redirects the learner to IBM's page. The whole course, not one topic. |

## 2. Can the lab open inside our page (iframe or modal)?

Checked on 8 Oct 2026 by reading the response headers of each site (`curl -I`). A page that answers
`X-Frame-Options: SAMEORIGIN` or `DENY` cannot be displayed in an iframe on another site; a modal that shows
the lab is an iframe too, so the same rule applies.

| Site | Header | Embeddable in the ICP |
|---|---|---|
| `learn.microsoft.com/en-us/training/modules/…` | `X-Frame-Options: SAMEORIGIN` | **No** |
| `www.skills.google` (was Cloud Skills Boost; also a lab page, `/focuses/…`) | `X-Frame-Options: SAMEORIGIN` | **No** for these pages. The LTI launch address itself could not be tested without the integration's credentials. |
| `console.cloud.google.com` (where the Google lab is done) | `SAMEORIGIN`, sign-in `DENY` | **No**. The lab opens the console in its own window in any case. |
| `students.yourlearning.ibm.com`, `students-auth.skillsbuild.org` | `X-Frame-Options: DENY` | **No** |
| `skills.network` (IBM Skills Network home) | none | Unknown: we do not know which IBM platform our courses use. |

**Open edX already has the three options for LTI.** The LTI component's setting *Open tool in* offers
**Inline** (an iframe in the unit, 800 px high by default), **Modal** (80% × 80% of the window by default) and
**New Window** (`xblock-lti-consumer`, `lti_xblock.py`, fields `launch_target`, `inline_height`, `modal_height`,
`modal_width`, `button_text`). So for Google the question is not whether we can build it, it is whether Google's
tool accepts being framed. One lab switched to *Inline* or *Modal* in Studio on staging answers it.

Third-party guides for the same Google integration set the launch container to a new window (Moodle) and clear
*Launch app in Schoology*, which points the same way. Not an official Google statement.

## 3. How does the topic get marked as completed?

Read in the source of `openedx/completion` (`services.py`, `handlers.py`):

- A block is **completed on view** (after `COMPLETION_BY_VIEWING_DELAY_MS`, 5 000 ms by default) only if it is
  completable, has no custom completion **and has no score**.
- A block **with a score** is completed when a score is published for it (`scorable_block_completion`).

| Partner | Component | What Open edX does today |
|---|---|---|
| **Google** | LTI, *This activity is graded* on (`has_score`, "1.0 points possible") | Completes **only when Google sends a score back**. Opening the unit does not complete it. |
| **Microsoft** | Text (`html`) | Completes **5 s after the unit is viewed**, whether or not the learner opened the link. Microsoft sends nothing back. |
| **IBM** | none in our course | Not a topic. Whatever exists is at course level and is not known to us yet. |

Design consequence: Google needs **no manual button** (if the score really arrives); Microsoft needs a decision
between *complete on view* (what happens today, and it is not true to what the learner did) and *the learner marks
it complete* (the rule the download Lab already follows).

## 4. Screens (Figma: desktop, tablet and mobile)

**State of 19 Oct 2026** (three changes that day, below). *LMS ICP Phase 1* → page **`↳ Lab · Third-party platforms - Ready for Review 🟠`**
(`6789:325`), frame `6789:326`. **Thirty-six cards: twelve screens on desktop, tablet (960) and mobile (375).**
Built like the Reading page: card header, the screen, description and changelog. Every card's status tag reads
*In review* (the *In progress* tag with its text changed; a longer label is cut on the mobile cards).

| Row | Card | Screen | Desktop card |
|---|---|---|---|
| **Google** · new tab (default) | G1 | Ready to start | `6789:901` |
| | G2 | Opened at least once, topic not completed: **not for now** (faded, 19 Oct) | `7053:13179` |
| | G3 | *Next* on a lab that is not completed: the question | `7079:164755` |
| | G4 | Completed by the learner | `6789:1816` |
| **Microsoft** · new tab (default) | M1 | Ready to start | `6792:1917` |
| | M2 | Opened at least once, topic not completed: **not for now** (faded, 19 Oct) | `7053:14541` |
| | M3 | *Next* on a lab that is not completed: the question | `7079:166018` |
| | M4 | Completed by the learner | `6792:2804` |
| **In the page** · option | E1 | The lab runs inside the page (LTI inline frame) | `6792:3199` |
| | E2 | The frame does not load: falls back to a new tab | `6792:3995` |
| **IBM** · the whole course on IBM | I1 | *Start course*, dialog before leaving SkillUp | `6792:139729` |
| | I2 | Course started, *Continue on IBM* | `6792:139888` |

Tablet and mobile cards carry the same number with `.2` and `.3` (`G1.2`, `G1.3`), in rows
`Row n.2 · … · Tablet` and `Row n.3 · … · Mobile`.

### 19 Oct 2026: no Opened state, no *How this lab works*, no author

Nelson's changes on G1 and G2, applied the same day to every Lab screen (handoff cards and the two flow frames).

- **SkillUp cannot tell whether the learner selected the launch button** (Komal, 19 Oct). Everything the *Opened*
  state does depends on that click: the date of the first opening, the launch button turning secondary and Mark as
  Complete primary, *Before you start* going away. So it is **not for now**. The six *Opened* cards (G2, M2 on three
  breakpoints) stay on the page as the design for when the click can be recorded, faded to 20% and titled
  *NOT FOR NOW - IN THE FUTURE*; the same on the flow frame's step 2.
- **What follows on the other screens:** the launch card is always *Ready*, also on the question and the completed
  screens. On a partner lab the launch button stays the primary action and **Mark as Complete stays secondary**.
  *Before you start*, and on tablet and mobile *This lab needs a computer*, stay until the topic is completed. The
  question screens (G3, M3) now show the Ready page behind the dialog. Vikas's answer of 13 Oct (the date can be
  stored, §10) does not help while the click itself is not seen.
- **How this lab works** (the title and its three steps) is grouped in a hidden frame *How it works* on every
  screen: we have no way to show it.
- **The author row** (`Author-and-Updated-Date`) is hidden on every screen: we do not show the author.
- E1 (the lab inside the page) has no launch card, so Mark as Complete stays primary there.
- Screens 200 px shorter on desktop and tablet, about 290 on mobile; frames and dialog overlays refitted.

### The two ways a lab opens

1. **New tab: the default, for every partner.** The launch card (`LMS/ICP/Topics/Lab-Launch-Card`) holds the
   primary action of the page until the lab has been opened: *Open Lab* on Google, *Open on Microsoft Learn* on
   Microsoft (labels as Nelson set them on 12 Oct).
2. **Inside the page: an option, only for the courses whose lab already loads there.** Two Microsoft courses
   today (§8). E1 shows it working: no launch card, the lab in the inline frame of the LTI component (800 px high
   by default) with *Open in a new tab* in its bar. E2 shows what those courses display today, the frame not
   loading: the launch card in its *Unavailable* state with one action, *Open in a new tab*. Its text does not
   blame the provider, because why the frame is empty was not established.

There is no modal. The modal card (old E2) was removed with the two states that described a score coming back.

### How the topic completes: Mark as Complete, and *Next* asks

**Our default on every topic the platform cannot measure**, as it stands after Navdeep's comments on the Figma
frame (12 Oct 2026, 18:07–18:25) and Nelson's instruction to apply them. Nothing comes back from the partner, so
opening the lab does not complete the topic.

- **Mark as Complete** sits at the end of the content, in the same row as the feedback: feedback on the left,
  the button on the right; on a phone it drops under the feedback (DS `Topic-Status-Badge`, never in the header;
  placement set by Nelson on 13 Oct 2026). It is the main way to complete the topic, and the answer to Navdeep's case: *the learner finishes the
  lab, comes back to SkillUp and closes the course without selecting Next*.
- **The footer is the design system footer as it is:** *Previous* and *Next*.
- **If the learner selects *Next* on a topic that is not completed, a question opens** (DS `Modal`,
  `Type=Horizontal`). Copy by Navdeep: *Have you completed this lab?* / *Your progress on Google Skills isn't
  tracked automatically. Please confirm whether you've completed this lab. You can move to the next topic either
  way and return to this lab anytime.* / **Not yet** · **Yes, completed**.
- **The three behaviours, as Navdeep wrote them:** (1) *Yes, completed*: mark the lab as completed, advance to the
  next topic. (2) *Not yet*: keep the lab incomplete, advance to the next topic. (3) *Close*: no change, remain on
  the current topic.
- **It asks whenever the topic is not completed**, also when the lab was never opened. On a completed topic *Next*
  goes straight on.
- Leaving by the sidebar, the top bar or the browser does not ask; that is the case Mark as Complete covers.

| State | Launch card | End of the content | Footer | Topic status |
|---|---|---|---|---|
| **Ready** (G1, M1): not completed | *Ready*, button primary | **Mark as Complete**, secondary | *Previous* · *Next* | no status |
| ***Not for now:*** **Opened** (G2, M2): opened at least once | *Opened*, button secondary, *First opened on 12 Oct 2026* | **Mark as Complete**, primary | *Previous* · *Next* | no status |
| **The question** (G3, M3): *Next* without Mark as Complete | under the dialog | under the dialog | under the dialog | no status |
| **Completed** (G4, M4) | *Ready*, unchanged | nothing | *Previous* · *Next*, which goes straight on | *Marked as completed* in the Topic Header; the topic's row in the sidebar becomes *Completed*. Nothing in the footer |
| Frame not loading (E2) | *Unavailable*, *Open in a new tab* primary | **Mark as Complete**, secondary | *Previous* · *Next* | no status |
| Lab inside the page (E1) | none | **Mark as Complete**, primary | *Previous* · *Next* | no status |

The in-page rows have no question card of their own: the dialog is the one of G3 and M3.

**What changes on completion:** the topic's row in the sidebar becomes *Completed* (`Topic-Row`,
`Topic Status=Completed`), the Topic Header shows *Marked as completed* and the Mark as Complete button is gone.
**The footer shows no status** (`Topic-Footer-Nav`; since v1.1 it has no badge to show). On mobile the sidebar row is in the outline,
behind the menu.

**One primary action at a time** (Nelson, 12 Oct): while the lab has not been opened, the launch button is the
primary action and Mark as Complete is secondary. Once the lab has been opened they swap: the launch button is
secondary and Mark as Complete is primary. Where there is no launch card (E1) Mark as Complete is primary from the
start. On the screens this is a local override of the `Button` nested in `Topic-Status-Badge`
(`Hierarchy=Secondary`); the DS component has no property for it. **Since 19 Oct the swap is not for now:**
SkillUp cannot tell whether the lab has been opened, so the launch button stays primary and Mark as Complete
secondary.

**Worth knowing:** there are now two ways of completing, the button and the question. Nelson's rule earlier the
same day was one way only; the question is kept as the safety net for the learner who moves on without the
button.

### The launch card says *opened*, never *complete*

> **Not for now (19 Oct 2026):** SkillUp cannot tell whether the learner selected the launch button (Komal), so the
> card stays *Ready*. What follows is the design for when that click can be recorded.

Decided by Nelson on 12 Oct 2026, after the screens above were first drawn with a *Completed* card. We get no
feedback from the partner, so the card cannot know the lab is done. It records one fact the platform does know:
the lab was opened, and when for the first time.

- **Ready → Opened** on the first click on the launch button. The card keeps its title and its partner line and
  adds *First opened on {date}*. It stays *Opened* from then on, also after the topic is completed; the button
  keeps opening the lab, which can be redone any number of times.
- **The launch button is primary until the lab has been opened, secondary after; Mark as Complete is the
  reverse.** The footer does not change with it, and nothing is disabled in either state.
- **Completion lives in one place:** the topic's status (Topic Header and sidebar row). A learner who completes
  without ever opening the lab gets a completed topic and a card still in *Ready*. That is what happened, so the
  screens do not hide it.
- **To build: the date of the first opening has to be kept per learner and topic, on the server.** Kept only in
  the browser, the card would read *Ready* again on another device. How the launch click is recorded today (it is
  what marks the topic complete, §7) was not checked; if it already reaches the server, this changes what it
  writes, from *complete* to *opened on*. **Engineering confirmed on 13 Oct that it can be stored on the server
  per learner (Vikas, §10).**
- If the date cannot be read, the page falls back to *Ready*. Nothing breaks: the learner can still open the lab
  and complete the topic.

### What the learner is told

- **Google:** needs a Google account to sign in to Google Skills and accept its terms; a desktop or laptop with
  Chrome; time to finish in one sitting, because some labs are timed and close by themselves. The launch card says
  the lab shares the username and email. The three steps end on *Come back to this page and select Mark as Complete.* (hidden since 19 Oct). The
  note under them: *SkillUp can't see your progress on Google Skills. Nothing is sent back when you finish. Select
  Mark as Complete when you are done; if you select Next first, we ask you.*
- **Microsoft:** a Microsoft account for Microsoft Learn; same third step and the same note.
- **Only until the lab has been opened** (Nelson, 12 Oct): the *Before you start* block and the warning below.
  Once the learner has opened the lab at least once, they have seen what it needs, so the Opened, question and
  Completed screens show neither. The page then goes from the lead line straight to the launch card. **Not for now
  (19 Oct):** the opening is not seen, so both stay until the topic is completed.
- **Tablet and mobile, Google never opened (G1, `.2` and `.3`):** the warning *This lab needs a computer*, from Google's
  own help ([Supported devices and browsers](https://support.google.com/qwiklabs/answer/9133547?hl=en)).
- **Mobile, in the page (E1.3, E2.3):** *This lab works best on a computer*. A design call (a third-party frame
  800 px high on a phone), not a provider statement. Not shown on tablet.
- **IBM on mobile:** the dialog is the mobile layout of the design system modal (buttons stacked).

### Removed on 12 Oct, and why

- **Old G2, *lab open in another tab, waiting for the score*** and **old M2, *back from the lab, asked to mark it
  complete*** (desktop, tablet, mobile): nothing is tracked after the launch (§7), and the Mark as Complete step
  is replaced by the footer button.
- **Old E2, the modal** (three cards): not one of the two options kept.
- Every text about a score: *Score 1 / 1*, *your score comes back*, *Topic marked complete for you*, the lab timer
  that "can't be paused", the Incognito window.
- The *Skip for now* action of the Unavailable launch card: to move on without completing, the learner uses the
  sidebar. Gone from the component since v1.1.
- **The *Completed* state of the launch card** (*Lab complete · Completed on …*), the same day, for the reason
  above.

Numbers: Google and Microsoft are 1 *Ready*, 2 *Opened*, 3 *the question*, 4 *Completed* (4 was 3 until the
evening of 12 Oct; 2 was *waiting for the score* and *asked to mark it complete* before that day). The in-page row lost the modal, so messages before 12 Oct that say *E3* mean today's E2.

### How the screens are built (for whoever edits them)

- DS components: Topic Header, `Lab-Launch-Card`, `Lab-Prerequisites`, `Numbered-Step`, `LMS / Inline Alert`,
  `Topic-Footer-Nav`, the Course header with its Progress card, and the DS `Modal` for the IBM dialog.
- **Mark as Complete** shares a row with the feedback since 13 Oct 2026. It is the DS `Content-Feedback` (v1.1)
  with `Show Mark as Complete` on: the feedback on the left, the nested `Topic-Status-Badge` on *Mark as Complete*
  on the right; when the row is too narrow (a phone) the button drops under the feedback, 16 apart there, 20 on
  tablet and 24 on desktop, through the spacing token. On the instance: a rule above and below (`border/subtle`),
  the page background, and on the three never-opened screens the button on *Secondary*. Until 13 Oct this was a
  local frame `Feedback-Mark`; Nelson's reference frame `7124:49482` on the Lab page is the only one left.
  Completed screens have `Show Mark as Complete` off.
- **The footer is the DS `Topic-Footer-Nav` with no override:** `Course-Progression-Button` on
  `Milestone=Next-Topic`, the icon-only forward button on mobile (arrow-right), three equal columns on tablet. The
  overrides that *Complete and continue* needed were removed.
- **The question** is the DS `Modal` (`Type=Horizontal`; `Breakpoint=Desktop` on desktop and tablet, `Mobile` on
  mobile), laid over the screen, with a help icon, the checkbox off and no icon on its buttons. On the mobile
  cards the screen is cut to one viewport (812) so the dialog sits where the learner sees it.
- **The inline frame of E1** is still a local frame on DS colour and radius tokens, with a placeholder where the
  third-party page would be, and says so in its layer name.
- **The IBM screens** are the Course Detail header cropped to 500 px, with the Progress card's percentage
  replaced by a dash. Since 13 Oct we know why the dash is right: IBM does not share the learner's progress with
  our platform (§10).
- **No tab bar:** with one option the tab bar is hidden (decision of 17 Sep 2026).
- **The discovery sources are superseded.** Section `05b · Lab — third-party platforms` (`6776:8711`) still holds
  the eleven screens of 8 Oct and was not updated; its name says so. The handoff cards are the originals now.
  Only its two *Completed* launch cards were moved to *Opened*, so that the variant could be removed.

### For the design system (not done, needs Nelson)

1. `Topic-Footer-Nav`, `Topic-Status-Badge` and `Modal` are used as they are: nothing to add for this flow.
2. `Lab-Launch-Card` **v1.1, published by Nelson on 12 Oct and accepted in the ICP file**: `Completed` removed,
   `Opened` with the *Opened date* line, *Skip* removed from `Unavailable`, default texts without a score. Read
   back on the 21 instances of the Lab page (6 Ready, 12 Opened, 3 Unavailable). Its default button text is
   *Open Google Cloud Lab* while the screens say *Open Lab*: one of the two should change. On 12 Oct (evening) its
   description and the default text of `Unavailable` were rewritten for *Next asks* and published by Nelson. After
   Navdeep's comments both say *Mark as Complete* (the default text now ends *come back to this page and select
   Mark as Complete*), and `Topic-Header` and `Topic-Status-Badge` carry a dated line with the rule; **published
   and accepted in the ICP file that night**. Descriptions and one default text only: no property or variant
   changed, no version bump.
3. `Topic-Header` on mobile with the status badge: the title is squeezed to half the width (157 px of 311) and the
   duration runs under the badge. Same on the Reading mobile screen already in Ready for Dev (`5685:175610`), so
   it was left as the component gives it.

### Not checked

- **Whether the in-page Microsoft lab returns a score.** If it does, E1 could complete by itself. The screens use
  the same question as every other lab, which is right if nothing comes back and harmless if something does.
- **Navdeep's answer came as four Figma comments on 12 Oct** (18:07–18:25), on the frame `7070:14832`: the
  recommended copy for the dialog, the three behaviours, and *introduce the Mark as Complete button also*. All
  applied. The comments are still open in Figma; a reply was drafted for Nelson.
- **The other topics the platform cannot measure.** The rule covers them all: Reading, Lesson Page, Lab and
  Activity always; Video and Podcast when playback cannot be measured (when it can, they complete by themselves at
  90%, there is no button and *Next* never asks). Their canonical pages on the *Topic Content Types Discovery*
  page have the Mark as Complete button again, as before 12 Oct, and card 8 of the Video page shows the fallback
  (not completed, the question, completed). Open: a Reading that holds an Open Response (Q-lab-7).
- **The download lab's gate.** `Lab-File-Row` says Mark as Complete stays disabled until every file is fetched.
  Navdeep objected to a disabled Mark as Complete on 9 Oct; nobody revisited this one.

## 5. Asked to the content team (8 Oct 2026; answers in §10)

1. **Google:** switch one lab's *Open tool in* to *Inline* or *Modal* on staging: does the lab load?
2. **Google:** does the score come back for every lab when the learner ends it, and how long does it take?
3. **Microsoft:** keep *complete on view*, or have the learner mark the topic complete after the lab?
4. **IBM:** which page does the learner land on after *Start course* (one URL)? Is the whole course on IBM's
   side or only the labs?
5. **IBM:** how do we know today that a learner completed the course on IBM (report, certificate, nothing)?

Not read: the recordings of the two meetings (*ICP - Lab Discussion*, 1 Oct, and *ICP - Lab*, 7 Oct). Transcript
access through Microsoft Graph is switched off for the organisation.

## 6. Not covered yet

- Whether the mobile app should offer *Open lab* at all for a Google lab, or only the instructions. The screens
  keep the button and warn.
- What the learner sees when the score never arrives, or arrives as zero.
- Pop-up blocked by the browser when the lab opens in a new tab.
- The consent Open edX can ask for before sending username and email to the tool
  (`ask_to_send_username`, `ask_to_send_email`): shown here as an information line, not as a consent step.
- The Microsoft Learn LTI application (Microsoft's own tool for LMS integration). It sends learners to Learn
  too; whether it reports completion back to Open edX was not checked.

## 7. The two meetings of 9 Oct 2026, and the completion proposal

*ICP LAB - Questions regarding the current experience* (Simran, Kirti, Nelson, Navdeep, Nilesh) and
*ICP - Lab - Tech Feasibility* (Kirti, Vikas, Navdeep, Jaspinder, Nilesh, Janvi). Read from the transcripts.

**What they established**

- **New tab for every partner in phase 1.** An iframe gives no completion either, the lab needs the whole
  screen, and inside the player a click on another topic would lose it. The Embedded rows (E1–E3) are out of
  phase 1.
- **Nothing is tracked after the launch.** Google labs are not graded or recorded anywhere (Simran); once the lab
  is open it is "completely not in our control" (Vikas). The G2 and G3 screens (*waiting for your score*, *score
  received*) do not describe today's behaviour. §3 above describes what Open edX can do with a graded LTI
  component; it is not what our courses do today.
- **Today the LMS marks the topic complete when the learner clicks the launch button.** No learner has complained.
- **Timers:** not every Google lab is timed; some run 45 minutes and close by themselves. Whether a timed lab
  resumes where it stopped is unchecked. Microsoft has no time limit; its labs are mostly reading plus a prompt.
- **Google needs a Google account** (any address), terms and a date of birth. SkillUp is charged when the learner
  presses *Start lab* on Google's page. A lab can be redone any number of times.
- **The certificate depends on the quiz scores, not on completion.** Completion is the percentage of the course done.
- **The button says *Open lab*.** *Open lab again* adds nothing (Navdeep; Nilesh agreed).

**What is not decided** (Navdeep: by Monday 12 or Tuesday 13 Oct; Kirti wants the design signed off then): how a
lab completes. The first meeting ended on *keep it as it is*: launching the lab completes the topic, with no Mark
as Complete button. The second reopened it: complete on launch, or leave it to the learner.

**Proposal sent to Navdeep on 9 Oct: *Complete and continue*** (on the screens for part of 12 Oct, then replaced
by *Next asks*, §4 and §9)**.** On a topic the platform cannot measure (Reading,
Lab), the forward button of the footer marks the topic complete and goes to the next one; the separate Mark as
Complete button goes away. On video and quiz it stays *Next*.

- It answers both worries: opening a lab does not complete it, and nobody finishes a lab and finds it incomplete a
  week later, because moving on is the confirmation.
- Two states only, one way of confirming, nothing to store on the server.
- To move on without completing, the learner uses the sidebar.
- Set aside, with the reason: a *Did you finish?* pop-up on return (needs server state, and a lab already shown as
  complete is never reopened); a third *in progress* status (removed early on); Mark as Complete disabled until
  the lab is opened (breaks the pattern: a video can be marked without playing); Mark as Complete fixed in the
  footer (still a separate click); a clickable tick in the sidebar (marks without opening, hidden on mobile).

**In Figma:** board `Complete and continue · superseded by Next asks (12 Oct 2026)` (`6926:14403`, named
*Proposal · Complete and continue (not decided)* until 12 Oct) on the Lab page, to the right of the handoff frame. Four footer states on desktop (1 112) and mobile (343): not completed (*Complete and
continue*), completed (*Marked as completed* + *Next*), measured topic (*Next*), last topic (*Complete*); and four
screens in context, Reading and Lab on desktop and mobile, without the Mark as Complete row. Built from the DS
footer as it is (`Topic-Footer-Nav`, with `Course-Progression-Button` on `Milestone=Continue` and its text
changed): **no DS change.** The handoff cards took the flow on 12 Oct (§4).

**On a Lab the footer button is secondary** (Nelson, 9 Oct): *Open lab* in the card is the primary action of the
page, so *Complete and continue* takes the secondary style there; on a Reading it stays primary. The board shows
it as state *1b* and on the two Lab screens (`Course-Progression-Button` on `Milestone=Next-Topic`, text changed).

**Open in the proposal:** the label itself (*Complete and continue* or shorter).

## 8. 12 Oct 2026: the Microsoft courses that load the lab in the page

From the *ICP Labs discussions* chat (Jaspinder Kaur Sehmi, Kirti Mishra), read from a screenshot Nelson shared.

- **Two courses found with the lab inside the page:** AZ-900 Batch 7 (`course-v1:SkillUp+SKOAZ900ILT-TMDSAI+2024_B7`,
  *Lab 1 - Create a virtual machine in the portal*) and `course-v1:SkillUp+SKOSC900ILT+2021_Q3`. The unit shows
  *Create a virtual machine in the portal (External resource)*, which is the LTI component set to open inline. So
  a Microsoft lab is not always a text link (§1): in these courses it is an LTI component.
- **It does not load.** Jaspinder: *"Lab loads here - currently not working"*. Her screenshot shows an empty grey
  frame with a blocked mark where the lab should be. Why it is blocked was not established (the provider refusing
  the frame, as in §2, or the integration itself); either way the learner sees an empty box today.
- **Kirti's call:** only one or two courses show the lab in an iframe, all other Microsoft and Google labs open in
  a new tab, so the new design goes with the new tab and the question is revisited later.
- **Jaspinder's opinion, not adopted:** keep each lab as it is today, in the page where it is in the page.

What it meant for the screens, done the same day (§4): Nelson kept **both ways of opening a lab, with the new tab
as the default**. The in-page row is drawn on this real case (AZ-900, *Create a virtual machine in the portal*):
the lab working inside the page, and the frame not loading with the way out to a new tab. Moving the two courses
to the new tab for good is a Studio setting on the component (*Open tool in* → *New Window*), not development.

## 9. *Next* asks: from test to default, then Navdeep's comments (12 Oct 2026)

Nelson first asked for it as a variant to compare with *Complete and continue*: the navigation back to the usual
*Previous* and *Next*, and *Next* opening a dialog that asks whether the learner has done the lab. After the
Reading version and the prototype, he made it the default for every topic completed by hand the same evening, at
first **without** a Mark as Complete button. **Navdeep then commented on the frame** (four comments, 18:07–18:25):
the copy he recommends for the dialog, the three behaviours, and *"I think we should introduce the mark as
complete button also. What happens when the learner finishes the lab but doesn't click Next? For example, they
return to SkillUp and close the course. Their lab remains incomplete even though they've finished it."* Nelson
asked to apply them, so the button is back and the question stays. The current rule is in §4; this section keeps
how it was explored.

**In Figma:** two frames on the Lab page, to the right of the handoff frame, with the superseded *Complete and
continue* board under them. Desktop and mobile only; tablet is on the handoff cards.

| Frame | Steps |
|---|---|
| `Next asks if the lab is done · our default on manual topics (12 Oct 2026)` (`7070:14832`): Google lab | 1 never opened · 2 opened, not completed · 3 *Next*: the question · 4 completed |
| `Next asks if the reading is done · our default on manual topics (12 Oct 2026)` (`7077:18132`): Reading | 1 not completed · 2 *Next*: the question · 3 completed |
| `Complete and continue · superseded by Next asks (12 Oct 2026)` (`6926:14403`) | kept as a record |

**In the prototype** (`nvjeronimo/skillup-lms-prototype`, live on `lms-prototype-mu.vercel.app`): the rule of §4
on every topic the platform cannot measure (pull requests 115, 117, 120, 122, merged on 12 Oct). **Audited against
the Figma Lab page the same night (pull request 123):** the partner labs were still on the model of 8 Oct, with the
Google lab simulating a score. They now match the cards: nothing comes back, the launch card has three states and
shows *First opened on …*, labels and copy as drawn, and the demo menu's *Lab launch* offers *In the page* and *Not
loading* on the Microsoft lab (no modal). Two things the audit found: the ORA results panel ended on a *Mark as complete*
button although an ORA has no manual completion (fixed the same night on Nelson's decision, prototype pull request
124: the topic completes by itself once the response is submitted and the reviews are given, and the button is
gone), and the download lab's button is disabled until the files are downloaded (Q-lab-8, open).

**How it worked in the first version, without the button** (§4 has the rule)

- The footer is the design system footer as it is. No *Complete and continue*, no Mark as Complete row.
- *Next* on a topic that is not completed opens the question *Have you finished this lab?* (or *this reading?*;
  DS `Modal`, `Type=Horizontal`). *Yes, I've finished*: the topic is completed and the learner goes to the next topic.
  *Not yet*: the learner goes to the next topic and the topic stays not completed. Closing the dialog keeps the
  learner on the page.
- On a completed topic, *Next* goes straight on.
- The rest is as in §4: the launch card goes from *Ready* to *Opened*; the status shows in the Topic Header and on
  the sidebar row.

**The trade-offs weighed** (written on the frames too)

- Leaving by the sidebar, the top bar or the browser does not ask; the lab stays not completed.
- Reading asks the same question (Nelson, 12 Oct, for the test): one way of confirming for every topic the
  platform cannot measure, at the price of one more click on the most common topic type.
- A lab never opened (Lab step 1): the question shows whenever the topic is not completed, so it shows there too. The alternative is to skip the question
  until the lab has been opened once, which needs the date of the first opening (Q-lab-6).
- *Not yet* repeats every time the learner passes through the lab with *Next*.
- The dialog interrupts a navigation the learner already chose; *Complete and continue* puts the same decision in
  the label of the button, before the click.

## 10. 13 Oct 2026: answers from the content team and engineering

From the *ICP Labs discussions* chat, read from a screenshot Nelson shared. Kirti Mishra answered Nelson's update of
12 Oct at 06:05; Vikas Goyal answered her at 06:09.

| Asked | Answer | By |
|---|---|---|
| IBM: where does the learner land after *Start course*, and is the whole course on IBM's side? | *"As soon as the learner clicks on start course for an IBM course, the learner is redirected to IBM's platform and the entire learning happens on the IBM platform."* | Kirti |
| IBM: how do we know a learner completed the course there? | *"The learner progress isn't normally shared with our platform but we can fetch the progress report from IBM's dashboard. The certificate is also generated on the IBM platform once learner completed the course."* | Kirti |
| The two Microsoft courses with the lab inside the page: can they move to *New Window*, and does that lab send a score back? | To be checked with Simran. **Pending.** | Kirti |
| Can the date of the first opening of a lab be stored on the server for each learner? | *"We can."* | Vikas |

**What it settles**

- **The IBM screens are right as drawn** (I1, I2): the whole course is on IBM, so *Start course* leaves SkillUp
  after the dialog and the course page then reads *Continue on IBM*. The Progress card keeps its dash: IBM does not
  send progress to us.
- **The launch card's *First opened on …* can be built** as designed, with the date kept on the server. *(19 Oct:
  not for now, because the click on the launch button itself is not seen, Komal; see §4.)*

**What it opens** (not designed, not decided)

- **Progress of an IBM course on SkillUp.** It is not shared automatically; a report can be fetched from IBM's
  dashboard. Nobody said how often, by whom, or whether the result should show on the course page, in My Learning
  or in the program's progress. Until then the dash stands, and an IBM course cannot count towards a program's
  percentage.
- **The certificate of an IBM course is IBM's.** It is generated on IBM's platform when the learner completes the
  course. The SkillUp course page and the Certificates page say nothing about it today: the learner is not told
  where their certificate will be.
- The landing address on IBM (one URL) was not given; the design does not need it.

