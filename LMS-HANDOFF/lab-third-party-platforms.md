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

## 4. Screens (Figma, discovery, desktop only)

*LMS ICP Phase 1* → *Topic Content Types Discovery — Ready for Review* → section
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

Built from DS components: Topic Header, `LMS / Lab · Prerequisites`, `LMS / Numbered Step`, `LMS / Inline Alert`,
Topic-Status-Badge, the Course header with its Progress card, and the DS `Modal` (Horizontal) for the IBM dialog.

Three things are stand-ins and say so in their layer names:

- **The launch card** is `LMS / Activity · SCORM Frame` (Idle and Error) with its texts overridden. A lab launch
  needs its own component (provider, how it opens, graded or not, score, the three states).
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

- Tablet and mobile. The Google lab is not usable in the mobile app (it needs a desktop browser and a second
  window); the screens say so in *Before you start* but there is no mobile state.
- What the learner sees when the score never arrives, or arrives as zero.
- Pop-up blocked by the browser when the lab opens in a new tab.
- The consent Open edX can ask for before sending username and email to the tool
  (`ask_to_send_username`, `ask_to_send_email`): shown here as an information line, not as a consent step.
- The Microsoft Learn LTI application (Microsoft's own tool for LMS integration). It sends learners to Learn
  too; whether it reports completion back to Open edX was not checked.
