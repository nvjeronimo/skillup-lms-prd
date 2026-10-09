# Lab on third-party platforms (Google, Microsoft, IBM)

First pass, 8 Oct 2026. Started from the content team's messages in the *ICP Labs discussions* chat
(Kirti Mishra forwarding Simran Jindal, 8 Oct 2026). **Nothing here is decided**: the answers asked for in §5
are pending.

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

**Handoff page, ready for review since 8 Oct 2026:** *LMS ICP Phase 1* → page
**`↳ Lab · Third-party platforms - Ready for Review 🟠`** (`6789:325`), frame
`ICP - Lab · Third-party platforms - Light - Ready for Review` (`6789:326`). Thirty-three cards: the eleven screens on
desktop, tablet (960) and mobile (375), in twelve rows (per partner: desktop, tablet, mobile). Built like the
Reading page: card header, the screen, description and changelog. The nine topic screens sit in the full course
player (top bar, sidebar with the lab as the current topic, content, footer navigation); the two IBM screens are
the Course Detail header. Every card's status tag reads *In review*: it is the *In progress* tag with its text
changed, because the handoff kit has only *In progress* and *Ready for DEV* (a longer label is cut on the mobile
cards). Cards G1–G3
(`6789:901`, `6789:1426`, `6789:1816`), M1–M3 (`6792:1917`, `6792:2412`, `6792:2804`), E1–E3
(`6792:3199`, `6792:3595`, `6792:3995`), I1–I2 (`6792:139729`, `6792:139888`).

**The desktop cards are copies.** Their sources are the content-only screens below; when a source changes, copy it
again. The tablet and mobile cards have no separate source: they were built on the handoff page from the same
sources and are the originals for their breakpoint.

**Tablet and mobile (8 Oct 2026):** rows `Row n.2 · … · Tablet` and `Row n.3 · … · Mobile`, cards numbered
`G1.2`, `G1.3` and so on. Tablet keeps the sidebar and a 632 px content column; mobile is one column with the
outline behind the menu. What differs from desktop:

- **A warning above the launch on the Google screens where the lab has not been opened** (G1, E1, E2, E3), tablet
  and mobile: *This lab needs a computer*. Google's own help says phones and tablets are not recommended for labs
  and that labs using the Cloud console might not work on them at all
  ([Supported devices and browsers](https://support.google.com/qwiklabs/answer/9133547?hl=en)).
- **E2 on mobile:** the modal is 80% of the window (300 px wide) and *Open in a new tab* becomes an icon button.
- **E3 on mobile:** the second button reads *Skip* so the two fit.
- **IBM on mobile:** the dialog is the mobile layout of the design system modal (buttons stacked).

**No tab bar.** The first pass showed a bar with a single *Instructions* tab. It was removed on every screen,
sources included, and replaced by the divider Reading uses: with one option the tab bar is hidden (decision of
17 Sep 2026).

Sources: *Topic Content Types Discovery — Ready for Review* → section
**`05b · Lab — third-party platforms (Google · Microsoft · IBM)`** (`6776:8711`), to the right of the page.

| Row | Screen | Node |
|---|---|---|
| Google | G1 ready to start (new tab) | `6776:8724` |
| | G2 lab open in another tab, waiting for the score | `6777:8801` |
| | G3 completed, score received (no manual action) | `6777:8921` |
| Microsoft | M1 ready to start (new tab) | `6777:9130` |
| | M2 back from the lab, asked to mark it complete | `6777:9249` |
| | M3 completed by the learner | `6777:9373` |
| Embedded alternatives | E1 inline in the page (LTI *Inline*) | `6778:9442` |
| | E2 modal over the page (LTI *Modal*) | `6778:9577` |
| | E3 the provider refuses the frame: fallback to a new tab | `6778:9721` |
| IBM | I1 *Start course*, dialog before leaving SkillUp | `6779:9601` |
| | I2 course started, *Continue on IBM* | `6779:22733` |

Built from DS components: Topic Header, `LMS / Lab · Launch Card`, `LMS / Lab · Prerequisites`, `LMS / Numbered Step`, `LMS / Inline Alert`,
Topic-Status-Badge, the Course header with its Progress card, and the DS `Modal` (Horizontal) for the IBM dialog.

**The launch card is a design system component since 8 Oct:** `LMS / Lab · Launch Card` (Ready, Opened, Completed,
Unavailable, with the partner's badge), on all 32 places a Lab screen has one (library request 27, closed).

Two things are still stand-ins and say so in their layer names:

- **The inline frame and the modal** (E1, E2) are local frames on DS colour and radius tokens, with a placeholder
  where the third-party page would be. No component until the Studio test says they are possible.
- **The IBM screens** are the Course Detail header cropped to 500 px, with the Progress card's percentage
  replaced by a dash and its fill hidden, because we do not know whether IBM reports progress.

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

**In Figma:** board `Proposal · Complete and continue (not decided)` (`6926:14403`) on the Lab page, to the right
of the handoff frame. Four footer states on desktop (1 112) and mobile (343): not completed (*Complete and
continue*), completed (*Marked as completed* + *Next*), measured topic (*Next*), last topic (*Complete*); and four
screens in context, Reading and Lab on desktop and mobile, without the Mark as Complete row. Built from the DS
footer as it is (`Topic-Footer-Nav`, with `Course-Progression-Button` on `Milestone=Continue` and its text
changed): **no DS change, and the handoff cards are untouched until the decision.**

**On a Lab the footer button is secondary** (Nelson, 9 Oct): *Open lab* in the card is the primary action of the
page, so *Complete and continue* takes the secondary style there; on a Reading it stays primary. The board shows
it as state *1b* and on the two Lab screens (`Course-Progression-Button` on `Milestone=Next-Topic`, text changed).

**Open in the proposal:** the label itself (*Complete and continue* or shorter).

