# Course Details — the metadata, mapped to the design

**Source:** two deliveries against Jira **SK-11378**.
`_media/Course_metadata.xlsx`, 3 Aug 2026 — Metadata (73 fields), API Information (8 endpoints with real
payloads), Feature Inventory, Role-Based Visibility. Sample course `course-v1:SkillUp+SQL-TMDA+2025_B13`.
`30-07 meetings/Course_metadata (2).xlsx`, 4 Aug 2026 — the VILT addendum, from row 84: **Live** (11 fields),
**Recordings** (20 fields) and the **Instructor dashboard** (80 fields), plus eight endpoints and three new
blocks in the role matrix. See §12.

**Design audited:** `Course Detail — v9 · Self-paced MVP (workshop 29 Jul)`, node `4975:80196`,
file [LMS-ICP-Phase-1](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4975-80196).

This document does one thing: it takes **every element on that frame** and names the field behind it.
Where there is no field, it says so. Everything below is read off the delivered payloads, not inferred
from stock Open edX.

> ### ⚠︎ Scope, corrected 3 Aug 2026
>
> **The learner panel is post-enrolment.** Enrolment happens on the site and in the catalogue; a course
> reaches this panel only once the learner is enrolled in it. So **`is_enrolled` is always true on this
> page**, and a whole class of states the platform can produce is unreachable through our information
> architecture.
>
> This corrects a wrong turn in the first pass, which drew the unenrolled and anonymous states as though
> they were ours. They are kept in Figma, clearly marked out of scope, because they document the boundary
> — not as work to build.
>
> What it changes in reading this document:
>
> - The **Anonymous / unenrolled column** of the visibility matrix in §6 describes the platform, not our
>   surface. Only the enrolled and staff columns bind us.
> - **`enroll_alert`** never renders here.
> - **The 401s never happen.** Progress and Dates are reachable for every user of this page, so the tab
>   bar always renders in full. That firms up the tab decision rather than weakening it.
> - **`lms_web_url` is always populated**, so syllabus titles are always links. The "not links, not
>   disabled links" nuance is a platform fact, not a state we render.
> - The states that **do** matter are the enrolled lifecycle: never started, in progress, completed,
>   course ended. They are drawn — see §8.

---

## 1. The five things this settles

**1. The tab list is decided, and it is not the one we expected.**
`tabs[]` comes from `get_course_tab_list()` and is returned per user. The real response is exactly five:

| tab_id | title |
|---|---|
| `courseware` | Course |
| `progress` | Progress |
| `dates` | Dates |
| `discussion` | **Mentorship Q&A** |
| `instructor` | Instructor |

> **Corrected 4 Aug: the list is five for a self-paced course, seven for a VILT one.** The addendum adds
> **Live** (`live`) and **Recordings** (`recordings`) as course tabs — see §12. Both are conditional: Live
> only where a `CourseLiveConfiguration` exists and is enabled, Recordings only where a succeeded MP4 exists.
> That is the strongest argument yet for rendering the bar from `tabs[]` rather than hardcoding it.

There is **no Resources tab, no Grades tab and no Certificates tab**. Grades live *inside* Progress
(`course_grade`, `section_scores`, `grading_policy`); the certificate is a **card** (`cert_data`), not a
destination. Navdeep expected Grades and Certificates as two tabs (01:32:08) and wanted the list confirmed
with the edX team — this is that confirmation, and it says no. Harpreet's "certificate tab as a marketing
asset" (01:31:57) has no platform tab to sit in; it would be something we build.

Our v9 frame is a single page with no tabs, flagged as a divergence to settle at review. **It is now settle-able:**
the frame is the `courseware` tab, and the bar above it is a five-item list rendered from the array.

**2. `Resume` vs `Start` stops being an open question.**
`resume_course: {has_visited_course, url}`. False → *Start course*. True → *Resume course*, and `url` is a
`jump_to` link to the last completed block. Navdeep questioned whether Resume makes sense for a self-paced
course (01:28:07); the platform answers it with a flag we can render directly.

**3. The unlock tooltip has nothing behind it.**
Open action 8 asked which unlocking rules the API exposes. The answer is: **a boolean and a block type.**
`blocks.{id}.accessible` (false = behind an unmet prerequisite) and `type: "lock"`. There is **no unlock
date, no prerequisite name, no rule description** anywhere in the 73 fields. Our tooltip reads
*"Unlocks 28 Apr 2026"* — that string cannot be produced from this API.

**4. Durations are a content problem, not a design problem.**
`effort_time` and `effort_activities` exist as per-block fields. In every payload delivered they are
**null on every block**. So is `due`. Our syllabus renders "3h 20m" per module, "22 min" per lesson,
"~ 14 hours" for the course and "12 min left" in the progress card. None of it has data today — not because
the field is missing, but because nobody authors it in Studio. Navdeep explicitly overruled dropping the
per-topic times (a 6-minute and a 22-minute video are not the same commitment), so the design is right and
**the action belongs to the content team**, not to us.

**5. The one real course we were given is not self-paced.**
`is_self_paced: false`. It also carries a `Session Recordings` chapter whose units are named by date
(*7th March 2026*, *8th March 2026*…) and a `Session Material` chapter. That is a VILT course. Our MVP frame
is self-paced only, by Harpreet's ruling (01:22:22) — that ruling stands, but the sample tells us the
lowest common denominator we picked is not the shape of the catalogue.

---

## 2. The structural finding — our three levels are not their three levels

The ICP model is **Module → Lesson → Topic**. The platform's is **chapter → sequential → vertical**. It is
tempting to map them one to one. The real course says do not:

```
chapter    Module 1: Introduction to SQL
  sequential   About
  sequential   Lessons
  sequential   Knowledge Check
chapter    Module 2: SQL Querying and Optimization
  sequential   About  ·  Lessons  ·  Knowledge Check
…
chapter    Session Recordings
  sequential   7th March 2026 · 8th March 2026 · 14th March 2026 …
chapter    Session Material
  sequential   Material
```

The middle level is **not a lesson**. It is a fixed three-part bucket — About, Lessons, Knowledge Check —
repeated identically in every module. The teaching content lives one level further down, in the verticals
under *Lessons* (*"Data, Datasets, Databases"*, *"Difference Between DBMS and RDBMS"*).

Rendered literally, our accordion would read **Module 1 → Lessons → 15 topics**, with two dead rows above it.

Three ways out, in order of preference:

1. **Collapse the bucket.** Where a module's sequentials are the generic set, skip the middle level and render
   Module → Topic. The workshop already permits this: *"Module → Topic where a lesson does not exist"* (01:02:14).
   *About* becomes the module description, *Knowledge Check* becomes a quiz topic.
2. **Re-author in Studio** so sequentials carry real lesson names. Same class of migration as the quiz stepper
   — worth raising with Rashid alongside it, since both touch the same content.
3. Render it literally and accept the dead rows. Not recommended.

This needs a decision before the syllabus can be built against real data.

---

## 3. Two calls, not one

The **Outline API** (`/api/course_home/v1/outline/{course_key}`) returns `course → chapter → sequential`
and **stops**: every sequential comes back with `"children": []`. There is no topic level in it.

The topic level is in the **Navigation API** (`/api/course_home/v1/navigation/{course_key}`), which returns
verticals with `complete` and `completion_stat: {completion, completable_children}`. It is cached for an hour
per user/course.

So a syllabus to topic level — which the workshop decided on (01:00:53) — costs **two API calls**, one of them
cached. Worth knowing, given Harpreet's concern that every calculated stat costs a backend query (01:08:35).

One catch: in the navigation payload **`lms_web_url` is null on every vertical** (it is populated on
sequentials). The decision that *all syllabus titles are clickable and deep-link into the immersive
experience* (01:03:30) therefore needs the topic URL to be **constructed** —
`/courses/{course_id}/jump_to/{block_id}` — rather than read. That is the same URL shape the API returns for
sequentials, so it should work, but it is an assumption to verify in the dev environment before it ships.

---

## 4. Element by element

Verdicts: **✅ field exists and is populated** · **◑ derivable** (we compute it from what is returned) ·
**⚠︎ field exists but is null in every payload** · **✗ no source**.

### Hero

| Element on the frame | Field | Verdict |
|---|---|---|
| Breadcrumb *My Learning › Courses* | — | our IA, not API |
| Breadcrumb leaf | `title` | ✅ |
| `Course` type badge | — | ✗ our own construct; the API has no course/programme distinction |
| `SELF-PACED` chip | `is_self_paced` — course_metadata · `pacing` — **Courses API** | ✅ — both say instructor-paced on the real courses |
| `BY IBM` partner logo | — | ✗ `org` is `"SkillUp"` (the platform's own org key), `number` is `"SQL-TMDA"`. Neither is a partner brand |
| Course image | `media.course_image` · `media.banner_image` · `media.image` — **Courses API** | ✅ verified populated 3 Aug — §12. Overturns 01:28:54 |
| Title | `title` | ✅ |
| *(missing)* | `title_prefix` | ✅ a **custom SkillUp field**, empty on the sample, not in our design |
| `4 modules · 16 lessons` | count of `type=chapter` / `type=sequential` | ◑ — but see §2: "lessons" is the wrong noun for their sequentials |
| `~ 14 hours` | `effort` — **Courses API**, free text, e.g. `"88 hours"` | ✅ authored, not computed |

### Progress card

| Element | Field | Verdict |
|---|---|---|
| `38%` | `completion_summary` → `complete / (complete + incomplete)` | ◑ **from the Progress API**, a third call. **Not** `course_grade.percent` — that is the grade, a different number |
| Progress bar | as above | ◑ |
| `Resume Course` / `Go to last topic` | `resume_course.has_visited_course` + `.url` | ✅ |
| `6 of 16 lessons` | `complete` flags in the navigation tree | ◑ counts units, not lessons |
| `12 min left` | — | ✗ `effort_time` null |

### What you'll learn

| Element | Field | Verdict |
|---|---|---|
| Heading + paragraph | `short_description`, and the *Skills You Will Gain* section of `overview` — **Courses API** | ⚠︎ exists, but `overview` is JSON double-encoded inside HTML. Parsing is real work — §12.1 |

The workshop ruled this must be a mapped edX field, with the heading following the field name (01:30:39).
**It is one** — just not on the eight endpoints in the workbook. `overview` even names its own section
*"Skills You Will Gain"*, which is exactly the heading the ruling demands. What remains is a parsing problem,
not a data one: see §12.1.

### Syllabus

| Element | Field | Verdict |
|---|---|---|
| Module title | `blocks.{chapter}.display_name` | ✅ — their names read *"Module 1: Introduction to SQL"* with a colon; ours print *"Module 1 · …"*. Render the field verbatim, do not re-format |
| Module number circle | index | ◑ |
| Completion tick | `blocks.{id}.complete` | ✅ |
| Partial completion | `completion_stat` | ✅ (navigation API) |
| `4 lessons · 3h 20m` | count ◑ / duration ✗ | ⚠︎ |
| Lock icon | `accessible: false`, `type: "lock"` | ✅ |
| `Unlocks 28 Apr 2026` tooltip | — | ✗ **no unlock date or rule is exposed.** See §1.3 |
| Lesson row title | `blocks.{sequential}.display_name` | ✅ |
| `3 topics · 22 min` | `completion_stat.completable_children` ◑ / duration ✗ | ⚠︎ |
| Topic row title | `blocks.{vertical}.display_name` | ✅ navigation API only |
| Topic type prefix (`Watch ·`, `Read ·`, `Checkpoint ·`) and type badge | `blocks.{id}.icon` | ✗ **unusable.** Documented vocabulary is four values — `fa-pencil-square-o`, `problem`, `video`, `other` — against our ten ICP topic types. In the payloads it returns only `null` (45×) and `"other"` (21×) |
| Clickable title → immersive | `lms_web_url` on sequentials ✅ / **null on verticals** | ⚠︎ construct `jump_to`; verify |
| `(N Questions)` on a graded quiz | appended to `display_name` by the platform | ✅ documented, field 24 |
| Graded/exam label | `description` (*"Homework"*, *"Midterm Exam"*), `special_exam_info` | ✅ null on this course |

The topic-type finding is the one to act on. Our syllabus distinguishes ten content types by badge and verb;
the outline data distinguishes four, and authors none of them. Either the type comes from somewhere else —
the block's child XBlock type, which means another call — or the syllabus shows titles without types.

### Mentor card

| Element | Field | Verdict |
|---|---|---|
| Name, role, avatar, SLA line, *Message* | — | ✗ **nothing.** No mentor, instructor or staff-profile field in any of the 73 |

*"Office hours" and the "Book session" button were removed on 3 Aug: they contradicted decision
[007](../00-decisions/007-mentor-async-messaging.md), which is accepted and says mentoring is async messaging,
not booked sessions. See §8.*

The `instructor` tab is the **edX instructor dashboard** — enrolment, membership, cohort admin — a staff tool,
not a learner-facing profile. The one thread worth pulling: their discussion tab is renamed
**"Mentorship Q&A"**, so *Message* has a plausible destination even with no mentor record. Booking does not.
The card needs a SkillUp-side source before it can ship.

---

## 5. What the API gives us that the design ignores

Ranked by how strong the case is for putting it on the page.

| # | Feature | Field | Note |
|---|---|---|---|
| 1 | **Tab bar** | `tabs[]` | Settles the flagged divergence. Render from the array — it is per-user, so a learner never sees Instructor |
| 2 | **Welcome message banner** | `welcome_message_html` + `POST dismiss_welcome_message` | The course's latest update, dismissible, top of page. Enrolled and staff only |
| 3 | **Handouts** | `handouts_html` | Right sidebar, raw HTML. **This is what "course-level resources" actually is** — the thing nobody could define at the workshop (01:19:44). Now defined, by the platform |
| 4 | **Certificate card** | `cert_data`, `can_view_certificate` | `{cert_status, cert_web_view_url, download_url, certificate_available_date}` |
| 5 | **Dates widget** | `dates_widget.course_date_blocks[]` + `dates_tab_link` | The workshop sent deadlines to the calendar (01:37:34). The platform ships a sidebar widget *and* a Dates tab. Needs a ruling: ours or theirs |
| 6 | **Course tools** | `course_tools[]` | The real response contains **Bookmarks**. We have a bookmark decision (`00-decisions/009`) with no entry point on this page |
| 7 | **Content search** | Feature 33 | Search across course content; opens a popup. Not designed |
| 8 | **Weekly learning goal** | `course_goals` + `POST save_course_goal` | Flag-gated, off on the sample. Days per week + email reminders |
| 9 | **State banners** | `has_ended`, `enroll_alert`, `dates_banner_info.missed_deadlines` | Course ended / enrol CTA / missed deadlines |
| 10 | **Staff affordances** | `studio_access`, `is_staff`, `original_user_is_staff` | *View in Studio*, masquerade. Out of scope for the learner MVP, in scope for the matrix |

**And what we can now defensibly drop.** Every commerce field comes back empty on the real course:
`verified_mode: null`, `can_show_upgrade_sock: false`, `access_expiration: null`, `offer: null`,
`course_modes: [{no-id-professional, "Professional Education"}]`. The upgrade sock, discount banner,
FBE expiration warning and ID-verification status are stock edX consumer-marketplace furniture that SkillUp's
B2B configuration does not use. **Out of phase 1, with evidence rather than by assumption.**

---

## 6. The scenario matrix, which we now have

Harpreet asked for one per element before development (01:38:58). Sheet 4 supplies the axis: Anonymous /
Unenrolled · Enrolled (Audit) · Enrolled (Verified) · Staff.

> **Read the first column as platform behaviour, not as a state of ours.** Per the scope note above, this page
> is post-enrolment, so the anonymous / unenrolled column never occurs here. It is left in because it explains
> *why* fields such as `lms_web_url` and `complete` are nullable at all — they are computed per enrolment.

The rows that change our page:

| Element | Anonymous / unenrolled | Audit | Verified | Staff |
|---|---|---|---|---|
| Outline tree | only if public access is on, **and with no links** | ✅ with links | ✅ | ✅ |
| Resume button | ✗ | ✅ | ✅ | ✅ |
| Welcome banner | ✗ | ✅ | ✅ | ✅ |
| Handouts | only if public access | ✅ | ✅ | ✅ |
| Dates widget / Dates tab | ✗ (401) | ✅ | ✅ | ✅ |
| Progress tab | ✗ (401) | ✅ | ✅ | ✅ can view any student |
| Certificate card | ✗ | ✅ if earned | ✅ if earned | ✅ |
| Enrolment CTA | ✅ if `can_enroll` | ✗ | ✗ | ✗ |
| Completion ticks / lock icons | ✗ | ✅ | ✅ | ✅ |
| View in Studio, masquerade | ✗ | ✗ | ✗ | ✅ |

The **unenrolled state is a real design state we have never drawn**: the full syllabus, rendered, with every
title dead. Not a disabled style — `lms_web_url` simply comes back null.

---

## 7. Actions

**To the vendor (Nilesh / Rashid), in priority order**

1. **`What you'll learn` has no field.** Which endpoint exposes the course description or objectives? If none
   does, who writes this section and where does it live?
2. **Unlock rules are a boolean.** `accessible: false` tells us a block is locked and nothing else. Can the API
   return the unlock date and the prerequisite, or does the tooltip come out of the design?
3. **`effort_time` / `effort_activities` are null on every block.** Are they authored anywhere in the
   catalogue? Every duration on the page depends on it.
4. **Topic type.** `icon` returns four values and in practice only `other`. How do we tell a video from a
   reading from a lab in the outline without opening every unit?
5. **The middle level.** Is *About / Lessons / Knowledge Check* the house structure for every course, or an
   artefact of this one? Decides §2.
6. **Mentor.** No field exists. Is there a SkillUp-side service, or is the mentor card unbuildable in phase 1?
7. **Partner branding and course image.** Confirmed absent. Is there a source outside these endpoints?
8. **Verify** that `jump_to/{vertical_block_id}` resolves, given `lms_web_url` is null on verticals.

**To the design (us)**

- Settle the tabs divergence with the real list — and tell Navdeep and Harpreet that Grades and Certificates
  are not tabs.
- Draw the states the matrix names: unenrolled, course ended, never started (Start vs Resume), no certificate.
- Decide the syllabus shape against §2 before building anything on top of it.
- Decide dates: our calendar, their Dates tab, or both.
- Place the four ignored affordances that have real data — welcome banner, handouts, certificate card,
  bookmarks — or record why not.

**To the content team (via Rashid)**

- Durations and the *About / Lessons / Knowledge Check* naming are both authoring decisions. They belong in
  the same conversation as re-authoring quizzes one question per unit.

---

---

## 8. The states this page actually has

The lifecycle of an **enrolled** course, which is the only lifecycle this page sees. Three values produce
four states, and all four are drawn.

| State | Turns on | Node |
|---|---|---|
| In progress | the default | `5008:444` (v10) |
| Never started | `resume_course.has_visited_course: false` | `5029:870` |
| Completed | `cert_data.cert_status` | `5029:1246` |
| Course ended | `has_ended: true` | `5029:1622` |

**Never started.** One boolean separates Start from Resume, and it changes more than the button: 0%, no
eyebrow above the label because there is no last topic to go to, *0 of 42 topics*, nothing ticked, and every
module marker neutral — blue reads as *in progress*, and nothing is.

**Completed.** 100%, every topic ticked, every module marker green, the last module unlocked. *Resume* becomes
*Revisit the course* and the eyebrow goes: pointing at a last topic is meaningless once they are all done. The
certificate card flips to its issued state — course title, `certificate_available_date` as the issue line, and
**View** and **Download** from `cert_web_view_url` and `download_url`. Those two URLs are the reason the
certificate can be a card at all: they are actions, not a destination. (See §9.)

**Course ended.** Progress freezes where it stopped, *Resume* becomes *Review the course*, and the update
banner becomes an archive notice in the platform's own terms — the content stays readable, graded work does
not. **Deliberately not dismissible:** a dismissible warning about a permanent condition is a warning that
disappears. The certificate card states that the run closed rather than staying hopeful, and the unlock
tooltip is removed — its date is in the past, and it never had a field behind it.

**Still to draw:** a module locked behind an unmet prerequisite as its own state, once we know what the API
can say about *why* it is locked (§7, item 2).

### The certificate card has four states, not two

`certificate_statuses_with_count` in the addendum gives the vocabulary: `{downloadable, notpassing,
generating}`, and the outline payload adds `audit_passing`.

| State | `cert_status` | Where |
|---|---|---|
| Not earned | `notpassing`, `audit_passing` | Drawn on v10 and on Course ended, with different wording |
| **Generating** | `generating` | **The gap.** Certificates are issued in batches, so there is a real interval between passing and the file existing. Now drawn in the card strip |
| Issued | `downloadable` | Drawn on Completed — *View* and *Download* |
| Withheld | unverified / no ID | In the vocabulary; no course we have seen produces it. Not drawn |

They live in **`Cards — states the pages do not show`** beside the screens, because a page can only show one
of them at a time.

### Course not started — a question, not a state

`start` in the future is an obvious fifth state, and it may not be a state of this page at all.
`course_metadata` carries `course_access {has_access, error_code, user_message}` and the workbook says it is
*"used for 403 redirect"*. So a learner enrolled before the start date is likely **redirected**, with the copy
coming from `user_message`, rather than shown a variant of this page. **Verify in the dev environment before
drawing anything** — drawing a start-date variant of the course page would be inventing a screen the platform
may never serve, which is the same mistake as the unenrolled states.

### A correction found while drawing these

The mentor card read *"Office hours every Tuesday at 11 AM"* with a **Book session** button. Decision
[007](../00-decisions/007-mentor-async-messaging.md) rules the opposite, and is marked *accepted*: mentoring is
**unlimited 1:1 asynchronous messaging, not scheduled or booked sessions**, with one mentor assigned per
learner at enrolment. BR-19 even sets the copy — *typically responds within 1 day*.

The card is now a single **Message** action and the SLA line, on v10 and on all three states. v9 keeps the old
copy, as the record of what the workshop actually saw. This does not change the card's other problem: there is
still no mentor field anywhere in the API.

---

## 8b. Unenrolled — out of scope, kept as evidence

Sheet 4 names it, and the platform can produce it, but **our panel never serves it**: see the scope note at
the top. Drawn before that was established, kept in Figma at the foot of the section under *Out of scope —
states the learner panel never serves*, and recorded here because the boundary is worth knowing.

What the platform does when there is no enrolment:

| | |
|---|---|
| **Links** | `lms_web_url` is null on every block. The titles are not *disabled* links — they are **not links**. Plain text, not a greyed-out interactive style. This is the detail most likely to be built wrong. |
| **Completion** | No ticks, no circles, no percentage. `complete` and `completion_stat` are computed per enrolment. |
| **Tabs** | Course only. Progress and Dates answer **401** for a user who is not enrolled, so they must not render at all — a tab that returns an error is worse than a tab that is absent. |
| **Welcome message, dates widget, certificate card** | Enrolled-only in the matrix. |
| **Handouts** | Enrolled-only unless the course has full public access. Out of this state by default. |
| **Locks** | `accessible` belongs to the per-user outline. With no enrolment there is no gating to show, so the locked module carries neither lock nor tooltip. |
| **In place of the progress card** | An enrolment card from `enroll_alert {can_enroll, extra_text}` and `course_modes[0].name` — here *Professional Education*, which is what the real course returns. When `can_enroll` is false, `extra_text` carries the reason (*"Course is full"*) and takes the place of the button. |

### The three branches, also drawn

Each turns on a single value, and the difference between them is not cosmetic — in one of them most of the
page is not there at all.

**A · Public access off** — `course_blocks` comes back empty. The variant most likely to be forgotten, and the
one with the longest consequences:

- The syllabus does not render as a locked or greyed list. **There is nothing to render.**
- *"4 modules · 42 topics"* goes with it. Those counts are derived from the block tree, so the hero statistics
  line is **hidden, not filled with zeros**.
- The enrolment card drops to *"Self-paced"* — the only shape fact that survives, because `is_self_paced`
  comes from the metadata call rather than from the outline.

What is left is a hero, a description and an enrolment card: about a third of the height of the enrolled page.
Worth showing the room, because it may be the version a first-time visitor actually meets.

**B · Anonymous** — `username` returns null. Everything in the base state, plus the shell:

- The Learn and Progress navigation groups and the account chip go; *Sign in* and *Create an account* replace
  them.
- The breadcrumb loses *My Learning* — not a place this visitor has been.
- *Enrol* becomes *Sign in*, with the return path spelled out.
- The mentor's *Book session* and *Message* actions go: both need an account.

If public access is also off, B and A compound — hero, description, sign in.

**C · `can_enroll: false`** — one boolean, and the primary action **disappears rather than being disabled**.
`enroll_alert.extra_text` carries the reason and takes the button's place — *"This course is full."*, which is
the example the metadata itself gives. A disabled *Enrol* button would invite a click that can never succeed
and would say nothing about why; the sentence does both jobs. The card hugs its content, so nothing is left
standing where the button was.

---

## 9. Why the certificate is a card and not a tab

Asked directly, and worth recording rather than leaving to the review.

The platform answer is only half of it: `tabs[]` has no certificates tab, but our shell is not obliged to
render only the platform's tabs — we could add one and route it ourselves. So the real reasons are these:

- **`cert_data` is four fields** — `cert_status`, `cert_web_view_url`, `download_url`,
  `certificate_available_date`. That is a card's worth of content. A tab holding one card is a weak tab, and
  it costs a click to reach something that has nothing else on the page competing with it.
- **Certificates already exists as a destination**, in the left navigation, at account level — where a learner
  with certificates from several courses would actually go looking. A course-level tab duplicates it.
- **Harpreet's own argument points at a card.** She called the certificate important because it doubles as a
  marketing asset (01:31:57). A marketing asset works by being *seen*; a tab hides it until clicked. The card
  sits in the right column, above the fold, in every state where the learner has one coming.

**Where a tab does become right:** the moment the certificate needs a page rather than a card — credential
preview, share to LinkedIn, the public verification link, issue date, the name printed on it. That is real
work and it is phase two. If the room wants that page, the tab follows it; the tab should not arrive first and
wait for content.

Recorded as a decision to confirm at the review, not as one already made.

---

## 10. Where this lives in Figma

One section of [LMS-ICP-Phase-1](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=5004-116294),
compiled into three rows on 3 Aug 2026. **One place per fact:** the panels narrate, the tables hold the
detail, and neither repeats the other. Three earlier annotation panels were deleted when their content moved
into the tables.

**Row 1 — the screens**, under *Course Detail — the screens*

| Frame | Node | Note |
|---|---|---|
| SUPERSEDED · Course Detail — v9 (workshop 29 Jul) | `4975:80196` | kept for comparison |
| v9 — the workshop record | `4975:90967` | trimmed to the rulings in the room's own words; everything else moved to the decisions table |
| Course Detail — v10 · metadata applied | `5008:444` | the in-progress state |
| Never started | `5029:870` | `resume_course.has_visited_course: false` |
| Completed — certificate earned | `5029:1246` | `cert_data.cert_status` |
| Course ended | `5029:1622` | `has_ended: true` |
| **Course Detail — how to read this section** | `5039:444` | the one narrative panel: v9 → v10, the structural finding, the two corrections, and where the rest lives |
| **Cards — states the pages do not show** | `5389:325` | the four certificate states, including `generating`, and the recent-recordings card for VILT courses |

**Row 2 — the reference tables**, under *Reference — one place per fact*

| Table | Node | What it holds |
|---|---|---|
| Course Detail — element → field | `5019:444` | 36 rows: every element, its field, and a verdict |
| API surface (8 endpoints) | `5020:444` | Endpoint, when it is called, what it carries, caching, the 401s |
| Role-based visibility | `5020:493` | Sheet 4 as a matrix, with the scope caveat on the first column |
| States | `5038:444` | The four states, what each turns on, what changes on screen — plus what is not drawn yet |
| Decisions and open questions | `5021:444` | What is decided and where it came from; what is open and who owns it; why the certificate is a card |
| Metadata we still need | `5105:444` | What the ✗ and ⚠︎ verdicts would take to become ✅, with owner and status |
| Live and Recordings | `5225:444` | What the VILT addendum rules in and out for design — not the fields, which are in §12 |

**Row 3 — out of scope**, under *Out of scope — states the learner panel never serves*

| Frame | Node |
|---|---|
| Unenrolled (platform state, not reachable in the panel) | `5016:444` |
| A · public access off | `5023:828` |
| B · anonymous | `5023:1162` |
| C · enrolment closed | `5023:1496` |
| Out of scope — notes | `5018:444` |

Verdict key, used consistently in the tables and in this document:
**✅** field exists and is populated · **◑** we derive it · **⚠︎** the field exists but is null in every
payload · **✗** no source at all.

---

---

## 11. Metadata we still need

What it would take for the **✗** and **⚠︎** verdicts in §4 to become **✅**. Ordered by effort, cheapest first
— and the cheapest tier may cost nothing at all.

### Verified in the dev environment, 3 Aug — see §12 for the result

The eight endpoints in the workbook are the ones the Learning MFE calls, not the only ones the platform has.
Three were checked before asking anyone for anything. **One is confirmed and closes three ✗ on its own.**

| Checked | Result |
|---|---|
| **Courses API** `/api/courses/v1/courses/{course_key}` | ✅ **Live, and readable without authentication.** Returns `media`, `short_description`, `effort`, `overview`, `pacing`, `end`. Three ✗ closed with no backend work — §12 |
| **Course Blocks API v2**, `requested_fields` / `block_counts` | ◑ **Exists**, but rejects an anonymous call: *"username: This field is required unless all_blocks is requested."* A field error, not a 404 — so the capability is there and needs a signed-in call to prove the payload |
| **Bookmarks list endpoint** | Untested — same authentication constraint |

### Delivered 4 Aug — the VILT addendum

Committed on the handover call and delivered the next day, as `Course_metadata (2).xlsx`. It is far larger
than "two tabs": **Live (11 fields), Recordings (20 fields) and the whole Instructor dashboard (80 fields)**,
plus eight new endpoints and three new blocks in the role matrix. Written up in §12.

### Open — worth a new task each

| Ask | Owner |
|---|---|
| **Unlock rule** — date or prerequisite, and which one. `accessible` is a boolean and nothing more | Nilesh / Rashid |
| **Mentor record** — identity, SLA, thread. Decision 007 assigns one mentor at enrolment, so the link exists somewhere | Product |
| **Partner brand** — the co-branding. `org` returns `"SkillUp"`, the platform's own key | Product |
| **`effort_time` derived rather than authored** — video length sits in the XBlock and reading time is a word count. Ask this *before* asking anyone to hand-author thousands of blocks | Nilesh / Rashid |
| **`language`** — i18n, and the accessibility layer in decisions 016 / 017 | Nilesh |
| **`user_timezone` returns null in all three samples** — every date renders in UTC for cohorts split between India and Europe. A **defect**, not a missing field | Nilesh |

### Two rules this settles for us — one of which needed correcting

- **Trim `display_name`, never reformat it.** The payloads carry parasite whitespace — *"Module 5:  SQL
  Advanced Topics"*, *"Final Quiz "* — and we render the field verbatim.
- ~~**No letter grades, anywhere.**~~ **Corrected 4 Aug — the rule was too absolute.** On every course we
  sampled, `grade_range` is a single threshold (`Pass: 0.7`) and `letter_grade` is null. But the addendum
  shows the Instructor tab formatting `grade_cutoffs` as *"A: 0.9, B: 0.8"* — **the platform supports both
  shapes.** So the rule is: **render whatever `grade_range` returns**, and neither shape may be hardcoded.
  That is more design work, not less: the component has to hold a single pass threshold *and* a lettered
  scale.

---

---

## 12. Verified in the dev environment — and the VILT addendum

### 12.1 The Courses API is live, and it closes three ✗ on its own

Called against `devcourses.skillup.online` for `course-v1:SkillUp+SKOAZ204EEP+2024_b1`:

| Field | What came back | Closes |
|---|---|---|
| `media.course_image.uri`, `media.image.{raw,small,large}`, `media.banner_image` | populated asset URLs | **Course image** ✗ → ✅ |
| `short_description` | *"Learn how to build end-to-end solutions in Microsoft Azure…"* | **"What you'll learn"** ✗ → ✅ |
| `effort` | `"88 hours"` | **"~ 14 hours"** ✗ → ✅ |
| `overview` | ~7 000 characters of authored copy | see below |
| `pacing` | `"instructor"` | pacing, explicitly |
| `end`, `enrollment_start`, `enrollment_end`, `start_display`, `start_type` | populated | dates |
| `invitation_only`, `hidden`, `mobile_available` | booleans | |
| `blocks_url` | a link straight to Blocks API v2 | |
| `media.course_video.uri` | **null** on this course | the promo-video slot exists but is unused |

Two things beyond the fix:

- **No authentication needed.** On the same session `/api/user/v1/me` answered *"Authentication credentials
  were not provided"* while this returned a full payload. The course description and image are **public** —
  convenient for us, and it means the catalogue and the panel can share one source rather than two.
- **`overview` is rich but malformed.** It is a JSON array double-encoded inside HTML —
  `<p>[ { "id": 0, "title": "Course Overview", "description": "</p>…` — with a second array of FAQs joined by
  a literal `&amp;&amp;`. Its sections are already the ones a course page wants: *Course Overview*,
  *How It Works*, **Skills You Will Gain**, *Who Should Enroll*, *Prerequisites*, plus FAQs.
  **"Skills You Will Gain" is "What you'll learn", already written, with the heading the workshop insisted
  must come from the field.** But parsing it is real work and the encoding is fragile — flag it before anyone
  budgets it as "just render the field".

### 12.2 Blocks API v2 — the capability is there

The anonymous call returned a **field error, not a 404**: *"username: This field is required unless all_blocks
is requested."* So the endpoint exists and takes the parameters; proving the `block_counts` payload — the fix
for topic types — needs a signed-in call. Bookmarks is untested for the same reason. **Still mine to finish.**

### 12.3 The addendum is much larger than "two tabs"

**Live — 11 fields, and it is not ours to design.**
`CourseLiveConfiguration` carries `provider_type` (`"zoom"`), `enabled`, `free_tier`, `pii_sharing_allowed`,
the LTI 1.1 launch URL, client key and secret (write-only), and `iframe` — *"rendered embed HTML with
LTI-signed srcdoc"* from `CourseLiveTab.render_to_fragment()`.

> **The Live tab is Zoom's own interface inside an iframe.** The role matrix confirms it: Upcoming Meetings,
> Previous Meetings, Meeting Summary, Join Meeting, host controls, an Appointments tab, a Get Training link
> and a timezone display are all listed as things *the tab* shows — every one of them Zoom's chrome, not a
> component we draw. This is the quiz XBlock constraint again: we own the frame, not the inside.

LTI roles map Student for learners and Administrator for course staff, with GlobalStaff forced to Student on
Zoom. `pii_sharing_allowed` must be true for Zoom to receive a learner's email or username — a privacy
decision someone should make deliberately rather than inherit.

**Recordings — 20 fields, and this one *is* ours.**
`ZoomRecordingAsset` supplies everything a list and a player need: `recording_start` (grouped by date, newest
first), a client-side count per date rendered as *"1 recording" / "4 recordings"*, `topic` as the title
(*"truncated if long"*, so a truncation rule is expected of us), `duration_seconds` → *"1h 30m"*,
`file_size_bytes` → *"45 MB"*, `status` and `is_archived`.

Design consequences worth naming now:

- **Playback is a short-lived SAS URL**, generated per recording by `POST …/playback_url/` and returned only
  when the recording succeeded, is not archived and has a blob path. The URL expires — so it cannot be
  pre-fetched for a whole list, and a copied link will not survive.
- **The tab appears only if a succeeded MP4 exists.** No empty state to design for a course that has one
  scheduled but nothing recorded yet — the tab is simply absent.
- Anything pending, uploading, failed or archived is hidden **from everyone, including staff**, by default.
- `file_type` is `MP4 / M4A / CHAT / TRANSCRIPT`. **Transcripts and chat logs exist as assets** — the first
  real data behind decision [001](../00-decisions/001-transcript-anchored-notes.md), and worth pulling on.

**Eight new endpoints**, four live and four recordings, half of each staff-only.

**Instructor — 80 fields, every one staff.** Its whole visibility block is ❌ for learners, which confirms what
we assumed and closes it as out of scope. One lead inside it: a **custom SKO** sub-tab, *Program Certificates*
(`#view-cert_mentors`), whose only substantive field is `mentor_page_url` pointing at `settings.FRONTEND_URL`.
It is a staff link to a separate frontend, not a learner-facing profile — **but it proves a mentor concept
exists in their custom layer, with a frontend of its own.** That is the thread to pull for the mentor card:
who owns that frontend, and does it hold the mentor-to-learner assignment that decision 007 implies?

### 12.4 What it does to the tab bar

For a self-paced course the bar is what v10 draws. For a VILT course it is up to **six learner tabs** —
Course, Progress, Dates, Mentorship Q&A, Live, Recordings — and both new ones are conditional: Live on a
`CourseLiveConfiguration` being enabled, Recordings on a succeeded MP4 existing. Rendering from `tabs[]` was
already the right call; it is now the only one that works.

---

*Written 3 Aug 2026 from the SK-11378 delivery. Every ✅, ⚠︎ and ✗ above was checked against the payloads in
the workbook, not against stock Open edX behaviour.*
