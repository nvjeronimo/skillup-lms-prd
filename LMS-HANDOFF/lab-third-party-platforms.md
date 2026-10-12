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

**State of 12 Oct 2026.** *LMS ICP Phase 1* → page **`↳ Lab · Third-party platforms - Ready for Review 🟠`**
(`6789:325`), frame `6789:326`. **Thirty cards: ten screens on desktop, tablet (960) and mobile (375).**
Built like the Reading page: card header, the screen, description and changelog. Every card's status tag reads
*In review* (the *In progress* tag with its text changed; a longer label is cut on the mobile cards).

| Row | Card | Screen | Desktop card |
|---|---|---|---|
| **Google** · new tab (default) | G1 | Ready to start | `6789:901` |
| | G2 | Opened at least once, topic not completed | `7053:13179` |
| | G3 | Completed by the learner | `6789:1816` |
| **Microsoft** · new tab (default) | M1 | Ready to start | `6792:1917` |
| | M2 | Opened at least once, topic not completed | `7053:14541` |
| | M3 | Completed by the learner | `6792:2804` |
| **In the page** · option | E1 | The lab runs inside the page (LTI inline frame) | `6792:3199` |
| | E2 | The frame does not load: falls back to a new tab | `6792:3995` |
| **IBM** · the whole course on IBM | I1 | *Start course*, dialog before leaving SkillUp | `6792:139729` |
| | I2 | Course started, *Continue on IBM* | `6792:139888` |

Tablet and mobile cards carry the same number with `.2` and `.3` (`G1.2`, `G1.3`), in rows
`Row n.2 · … · Tablet` and `Row n.3 · … · Mobile`.

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

### How the topic completes: *Complete and continue*

Adopted on these screens by Nelson on 12 Oct 2026 (the proposal of §7). Nothing comes back from the partner, so
opening the lab does not complete the topic and there is **no Mark as Complete row**.

| State | Launch card | Footer forward button | Topic status |
|---|---|---|---|
| **Ready** (G1, M1): never opened | *Ready*, button primary | **Complete and continue**, secondary | no status |
| **Opened** (G2, M2): opened at least once | *Opened*, button secondary, *First opened on 12 Oct 2026* | **Complete and continue**, primary | no status |
| **Completed** (G3, M3) | *Opened*, unchanged | **Next**, secondary | *Marked as completed* in the Topic Header; the topic's row in the sidebar becomes *Completed*. Nothing in the footer |
| Frame not loading (E2) | *Unavailable*, *Open in a new tab* primary | **Complete and continue**, secondary | no status |
| Lab inside the page (E1) | none | **Complete and continue**, primary (there is no other action) | no status |

The button marks the topic complete and goes to the next one. To move on without completing, the learner uses the
sidebar: there is no Skip action anywhere.

**What changes on the click** (Nelson, 12 Oct): the topic's row in the sidebar becomes *Completed* (`Topic-Row`,
`Topic Status=Completed`) and the Topic Header shows *Marked as completed*. **The footer shows no status**: the
badge that sat beside *Next* was removed the same day, so the status is in the header and the sidebar only
(`Topic-Footer-Nav`, `Show Badge` off). On mobile the sidebar row is in the outline, behind the menu.

### The launch card says *opened*, never *complete*

Decided by Nelson on 12 Oct 2026, after the screens above were first drawn with a *Completed* card. We get no
feedback from the partner, so the card cannot know the lab is done. It records one fact the platform does know:
the lab was opened, and when for the first time.

- **Ready → Opened** on the first click on the launch button. The card keeps its title and its partner line and
  adds *First opened on {date}*. It stays *Opened* from then on, also after the topic is completed; the button
  keeps opening the lab, which can be redone any number of times.
- **The primary action moves with it.** Before the lab is opened the launch button is the primary action and the
  footer button is secondary. Once it has been opened the launch button becomes secondary and *Complete and
  continue* becomes primary. Nothing is disabled in either state.
- **Completion lives in one place:** the topic's status (Topic Header and sidebar row). A learner who completes
  without ever opening the lab gets a completed topic and a card still in *Ready*. That is what happened, so the
  screens do not hide it.
- **To build: the date of the first opening has to be kept per learner and topic, on the server.** Kept only in
  the browser, the card would read *Ready* again on another device. How the launch click is recorded today (it is
  what marks the topic complete, §7) was not checked; if it already reaches the server, this changes what it
  writes, from *complete* to *opened on*. Asked as Q-lab-6.
- If the date cannot be read, the page falls back to *Ready*. Nothing breaks: the learner can still open the lab
  and complete the topic.

### What the learner is told

- **Google:** needs a Google account to sign in to Google Skills and accept its terms; a desktop or laptop with
  Chrome; time to finish in one sitting, because some labs are timed and close by themselves. The launch card says
  the lab shares the username and email. The three steps end on *Come back to this page and select Complete and
  continue*. The note under them: *SkillUp can't see your progress on Google Skills*.
- **Microsoft:** a Microsoft account for Microsoft Learn; same third step and the same note.
- **Tablet and mobile, Google not completed (G1 and G2, `.2` and `.3`):** the warning *This lab needs a computer*, from Google's
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
  sidebar. Gone from the component since v2.0.
- **The *Completed* state of the launch card** (*Lab complete · Completed on …*), the same day, for the reason
  above.

Numbers: Google and Microsoft are again 1, 2, 3, but 2 is now *Opened* (it was *waiting for the score* and *asked
to mark it complete*). The in-page row lost the modal, so messages before 12 Oct that say *E3* mean today's E2.

### How the screens are built (for whoever edits them)

- DS components: Topic Header, `Lab-Launch-Card`, `Lab-Prerequisites`, `Numbered-Step`, `LMS / Inline Alert`,
  `Topic-Footer-Nav`, the Course header with its Progress card, and the DS `Modal` for the IBM dialog.
- **The footer button is a local override, not a DS variant.** `Course-Progression-Button` on
  `Milestone=Next-Topic`, with the label of its nested `Button` changed to *Complete and continue* (and
  `Hierarchy=Primary` on E1). On mobile the DS forward control is an icon-only button, so it is swapped for the
  labelled `Button`. On tablet the two side columns of the footer are set to hug their content on the cards where the
  button reads *Complete and continue*: with three equal columns of 189 px the wider button ran over the centre
  label. The completed cards (*Next*) keep the equal columns.
- **The inline frame of E1** is still a local frame on DS colour and radius tokens, with a placeholder where the
  third-party page would be, and says so in its layer name.
- **The IBM screens** are the Course Detail header cropped to 500 px, with the Progress card's percentage
  replaced by a dash, because we do not know whether IBM reports progress.
- **No tab bar:** with one option the tab bar is hidden (decision of 17 Sep 2026).
- **The discovery sources are superseded.** Section `05b · Lab — third-party platforms` (`6776:8711`) still holds
  the eleven screens of 8 Oct and was not updated; its name says so. The handoff cards are the originals now.
  Only its two *Completed* launch cards were moved to *Opened*, so that the variant could be removed.

### For the design system (not done, needs Nelson)

1. `Topic-Footer-Nav` needs a real *Complete and continue* state: a labelled button on mobile, and side columns
   that hug on tablet. Until then every screen carries the three overrides above.
2. `Lab-Launch-Card` **v2.0, published by Nelson on 12 Oct and accepted in the ICP file**: `Completed` removed,
   `Opened` with the *Opened date* line, *Skip* removed from `Unavailable`, default texts without a score. Read
   back on the 21 instances of the Lab page (6 Ready, 12 Opened, 3 Unavailable). Its default button text is
   *Open Google Cloud Lab* while the screens say *Open Lab*: one of the two should change.
3. `Topic-Header` on mobile with the status badge: the title is squeezed to half the width (157 px of 311) and the
   duration runs under the badge. Same on the Reading mobile screen already in Ready for Dev (`5685:175610`), so
   it was left as the component gives it.

### Not checked

- **Whether the in-page Microsoft lab returns a score.** If it does, E1 could complete by itself. The screens use
  the same confirmation as every other lab, which is right if nothing comes back and harmless if something does.
- **Navdeep's answer** to the proposal of 9 Oct. The Lab screens adopt it on Nelson's decision.
- **The Reading screens** (22, Ready for Dev) still have the Mark as Complete row. The flow is meant for every
  topic the platform cannot measure; they were not touched.

## 5. Asked to the content team (8 Oct 2026, pending)

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

**Proposal sent to Navdeep on 9 Oct: *Complete and continue*.** On a topic the platform cannot measure (Reading,
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

**In Figma:** board `Complete and continue · adopted on the Lab screens (12 Oct 2026)` (`6926:14403`, named
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
