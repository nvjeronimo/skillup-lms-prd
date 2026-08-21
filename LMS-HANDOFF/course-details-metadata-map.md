# Course Details — the metadata, mapped to the design

**Source:** two deliveries against Jira **SK-11378**.
`30-07 meetings/Course_metadata.xlsx`, 3 Aug 2026 — Metadata (73 fields), API Information (8 endpoints with real
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
| Type badge (~~`Watch ·` prefix, retired~~) | `blocks.{id}.icon` | ✗ **unusable.** Documented vocabulary is four values — `fa-pencil-square-o`, `problem`, `video`, `other` — against the twelve types in the ICP catalogue (eight live). In the payloads it returns only `null` (45×) and `"other"` (21×) |
| Clickable title → immersive | `lms_web_url` on sequentials ✅ / **null on verticals** | ✅ `jump_to` constructed and **verified live 21 Aug** — see §12.5 |
| `(N Questions)` on a graded quiz | appended to `display_name` by the platform | ✅ documented, field 24 |
| Graded/exam label | `description` (*"Homework"*, *"Midterm Exam"*), `special_exam_info` | ✅ null on this course |

The topic-type finding is the one to act on. Our syllabus distinguishes **twelve** content types by badge and
verb (eight of them live); the outline data distinguishes four, and authors none of them. Either the type comes
from somewhere else — the block's child XBlock type, which means another call — or the syllabus shows titles
without types.

**The syllabus states the type outright, once.** Every topic row carries an `LMS / Topic-Types Badge` with its
type spelled out — `Reading`, `Video`, `Quiz`, `Lab`. That raises the cost of the finding above rather than
lowering it: an icon can be vague, a word cannot. If the type has to be derived from a second call, the badge
is what will be wrong on screen when the derivation fails.

**The verb prefix is retired, from every type.** Titles now render `display_name` verbatim — *DMAIC
fundamentals*, not *Checkpoint · DMAIC fundamentals*. The earlier rule kept the verb where the type was
*consequential* and dropped it where it was *descriptive*, reasoning that "the icon already says how you
consume them". That reasoning held while the type was an icon; the badge now carries a **word**, and the same
sentence removes the verb everywhere.

It also removes a dependency. A verb prefix is not a field — something would have had to derive it from a type
the outline does not send. Rendering `display_name` as-is needs nothing. The three-way comparison on the
components page (`5433:498`) records all three options and which was taken.

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

**Found by the audit of 19 Aug — declared, learner-facing, never mentioned, and now placed on `v11`:**

| Field | What the workbook says it is for | Why it matters here |
|---|---|---|
| `blocks.{id}.has_scheduled_content` | *"More content coming"* indicator, from the Learning Sequences API | **A syllabus affordance we never designed.** We draw locked modules; we have nothing for a module that is open but still growing. It is on every block in the outline payload |
| `celebrations` | *"Triggers celebration modals on milestones (first section completion, streaks)"* — `{first_section, streak_length_to_celebrate, streak_discount_enabled, weekly_goal}` | A whole feature. Our design has no milestone moment at all, and the platform fires one |
| `user_has_passing_grade` | *"Shows passing/not-passing indicator"* | A pass/fail signal that arrives **on the outline call**, with no extra request. The course page shows completion but never whether the learner is passing |
| `enrollment_mode` | `audit`, `verified`, `honor`, `no-id-professional` | The learner's own track. We show a course-type badge that has no field; this one has |
| Content Search (feature 33) | *"Search course content, units, lessons and learning materials using keywords… shows a popup"* | Listed in both workbooks, never designed |
| `number`, `org` | *"Breadcrumb / sub-header"* | The workbook assigns them a place in the breadcrumb. Ours uses neither |

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
| **v11 · everything the data allows** | `5401:325` | the maximal version — every available field placed, so the cost of having them all is visible |
| **Course Detail — how to read this section** | `5039:444` | the one narrative panel: v9 → v10, the structural finding, the two corrections, and where the rest lives |
| **Cards — states the pages do not show** | `5389:325` | the four certificate states, including `generating`, and the recent-recordings card for VILT courses |
| **★ ENTRY · Course Detail — v12 · componentised** | `5430:3589` | the entry screen, built from instances — 30 at the top level, 21 ours and 9 from the library. The only loose text left on the page is the unlock-tooltip callout, which is a note about the design rather than part of it |
| ~~Course Detail — Progress tab · v1~~ | ~~`5482:4574`~~ | **deleted 21 Aug** — the annotated `⚙ TECHNICAL · Progress tab` (`5490:4793`) is the only copy, and carries the design as well as the notes |

### The comparison layout

Under each of our screens in the technical section sits **a screenshot of the platform as it is today**, so a
stakeholder can read our version and the current one without switching context. Ours above, theirs below.

That is what the section is for now: not "here is the annotated design" but "here is what changes, here is the
field behind each change, and here is what you have today". The annotations answer the question the comparison
provokes.

**The `Instructor` tab is staff-only** and is not part of any of this — confirmed again 21 Aug. It is edX's
own instructor dashboard, fifty endpoints of enrolment, grade override and reporting, gated by role. It appears
in `tabs[]` only for users who hold the role, which is why it shows in a screenshot taken as Staff and will
never appear for a learner. Nothing on it is ours to design.

### The technical section, and how to run a review from it

The annotated pages moved out of the main section on **21 Aug** into their own —
`⚙ Technical — every element, its field, and whether we can build it` (`5490:15278`). Two reasons: the design
pages stopped being read through engineering notes, and there is now more than one of them.

| Frame | Node | What it annotates |
|---|---|---|
| `⚙ TECHNICAL · Course tab` | `5446:3985` | v12, the courseware tab |
| `⚙ TECHNICAL · Progress tab` | `5490:4793` | the Progress tab, from the API Information sheet |
| `How to read this section` | `5448:4325` | the legend, the verdict key, and the five questions |

Open them in **Dev Mode**. Together they carry **54 annotations across 33 elements**, in all four categories
rather than everything under Development, because they are four different conversations with four different
owners:

| Category | Carries | Course tab | Progress tab |
|---|---|---|---|
| **Development** | the API field and its verdict | 23 | 9 |
| **Content** | where the words come from and who owns them | 8 | 4 |
| **Interaction** | behaviour — what 401s, what expires, what must not be dismissible | 5 | 4 |
| **Accessibility** | contrast and dark mode, and how they are achieved | 1 | — |
| | **totals** | **37 across 22** | **17 across 11** |

The Development / Content split is the one that earns its keep in a review. `welcome_message_html` **exists**
(Development, ✓) *and* its copy is arbitrary instructor-authored HTML (Content) — two facts, two owners, and a
single list would collapse them into one.

**The five questions the legend ends on**, which are what the meeting should actually decide:

1. **Who supplies the mentor?** The only gap that survived both the API audit and the library sweep.
2. **Who authors `effort_time`?** Every duration on the Course tab depends on a field nobody fills.
3. **Does the unlock tooltip stay?** The API gives a boolean — no date, no prerequisite, no rule.
4. **Dates: tab or sidebar widget?** `course_date_blocks` returns two rows on our courses, because `due` is
   null everywhere. See §14.2.
5. **Is Mentorship Q&A a forum or 1:1?** `tabs[]` returns the platform forum renamed; decision 007 says 1:1
   async messaging. They are different products. See §14.3.

**Reversed 21 Aug — v12 carries the annotations too.** The rationale above was wrong, and worth saying why:
**Dev Mode annotations do not render in Design mode.** The clean view was never something a second, unannotated
copy had to buy — you get it by not being in Dev Mode. Once the technical pages moved into their own section,
the working screen looked like it had lost its notes, which is a real cost paid for an imaginary benefit.

`★ ENTRY · Course Detail — v12` now carries the same **37 annotations across 22 elements** as
`⚙ TECHNICAL · Course tab`. They were copied node-by-node, matched by structural path and then by name and
content for the five the two trees no longer share — v12's module rows sit directly under `Container:margin`
where the technical page has an extra `Container`.

⚠︎ **Two copies now exist and Figma cannot keep them in step.** Annotate the technical page when they diverge
and re-copy; do not maintain both by hand. If the comparison layout ever stops needing a separate frame, the
right move is to delete one, not to keep syncing them.

**Components page** — `↳ LMS / Course Detail — Components 🟠` (`5409:325`)

| Item | Node |
|---|---|
| Cover and the four rules | `5409:326` |
| Foundations — colour, live-bound swatches | `5410:325` |
| Foundations — space, radius, type | `5411:325` |
| `Meta` · `Card shell` | `5414:327` · `5415:327` |
| `Module row` (6 variants: State × Expanded) · `Topic row` | `5416:382` · `5419:384` |
| `Progress card` · `Certificate card` · `Sidebar card` | `5422:600` · `5425:566` · `5426:568` |
| Integration proof | `5429:419` |
| Verb prefix — three-way comparison | `5433:498` |
| Topic types — descriptive or consequential | `5442:699` |
| `Section intro` | `5456:852` |
| `Course stats` | `5460:871` |
| `Course title` | `5460:15187` |
| `Completion card` · `Grade meter` | `5483:979` · `5484:980` |
| `Grade summary row` (Header/Row/Total) · `Score row` (Section/Subsection) | `5485:870` · `5486:862` |
| ~~`Marker`~~ · ~~`Banner`~~ | retired — superseded by `LMS / Completion Status` and `Alert` |

**Row paddings and gaps are bound to `Spacing/*`** on both row components — `lg` (12) for the row insets,
`md` (8) for the topic gap, `none` for its horizontal padding, `xxs` (2) for the module's title/meta gap. No
value changed when they were bound; the point is that they can no longer drift apart. `Topic row` carries a
bound `minHeight` of `6xl` (48), its exact natural height. `Module row` has none on purpose: 68 is derived and
off-scale, and a floor at the nearest step (64) would never engage.

**The verb-prefix boards now carry per-type badges**, which changes what they show. The rule we closed justified
dropping the verb on descriptive types because *"the icon already says how you consume them"* — but the type is
now a **labelled** badge, not an icon. By that same sentence, *Checkpoint · DMAIC fundamentals* beside a badge
reading **Quiz** duplicates exactly as *Read · Introduction…* beside **Reading** does. Board 2 — bare titles, as
the API returns them — is the only one of the three that states the type once. Left unchanged: it is a decision
for the room.

### Finishing the hero, and four more things we did not need to build

The hero was the last part of the page still drawn by hand. Closing it took **three new components** and
**four adoptions from the library** — and the ratio is the point: of seven pieces, only three were ours to make.

| Piece | Outcome |
|---|---|
| Breadcrumb | adopted **`Breadcrumbs`** (SKO) — `Divider=Chevron, Type=Text, Desktop`, first crumb and its chevron hidden to give three levels |
| `Self-paced` · `Professional` chips | adopted **`Badge`** (SKO) — `Size=md, Type=Pill color, Color=Gray` |
| Tab bar | adopted **`Horizontal tabs`** (SKO) — `Type=Underline, Size=md`, six unused tabs hidden |
| Course search | adopted **`Input field`** (SKO) — `Type=Search, Size=sm` |
| Lock tooltip | adopted **`Tooltip`** (SKO) — `Supporting text=False, Arrow=Top center` |
| `Section intro` | built — heading plus lead paragraph, with a boolean for the paragraph |
| `Course stats` | built — structure, duration, `org · number`, and a programme row |
| `Course title` | built — title, thumbnail, and an optional `short_description` |

The `Badge` set already carries a **`Type=LMS Topic Types Badge`** variant, which is what the topic rows use.
That is worth noting for its own sake: a badge we would have built twice was already in the library under a
name none of our searches would have reached.

**`Course stats` has its programme row off by default.** `Course 2 of 6` and `Cohort Apr 2026` read like
metadata but no Course Home API sends either one. Making the row a boolean that defaults to **false** means
the screen cannot quietly acquire a field that does not exist — someone has to turn it on and say where the
data comes from. Same reasoning as the `Dismissible` correction on `Alert`: a default is a claim.

**One annotation was lost and folded, not dropped.** Replacing the hand-built title block removed the `Image`
node that carried two Development annotations about `course_image_urls`. Both facts now live in the single
`Course title` annotation, which is why the count moved from 38 across 23 elements to **36 across 21**.

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

### 12.5 Verified with a session, 21 Aug — the topic type is derivable

Signed in as `nelson-jeronimo` against `course-v1:SkillUp+SKOADM01EN+2026_v1` — *Digital Marketing
Fundamentals and the AI Mindset*, the course the live Progress screenshot came from. Everything below is a
response read off the dev environment, not a workbook sample.

**1. `block_counts` comes back on every block — all 84 of them.** And it answers the question that has been
open since `blocks.{id}.icon` turned out to be unusable:

| | |
|---|---|
| Verticals in the course | **27** |
| Resolve to a **single** child type | **26** |
| Mixed | **1** — *Final Project*, which is `html` + `openassessment`: a brief and a submission, genuinely two things |

**So the topic type can be derived** — from the vertical's children, or equivalently from its `block_counts`.
It costs one extra call to Blocks API v2. That closes the §5 finding as *buildable*, and it is the first
answer we have had to it.

**But it collapses the catalogue.** The whole course uses **five** leaf types — `html` (14), `problem` (10),
`video` (6), `scorm` (6), `openassessment` (1) — against **twelve** ICP topic types. `scorm` covers Lab,
Activity and Practice; `video` covers Video *and* Podcast; `problem` covers Quiz *and* Practice Assignment.
A derived badge can say **Reading / Video / Quiz / Interactive / Peer-graded** honestly. It cannot say
*Podcast*, and it cannot tell a Lab from an Activity.

**The authors already know this.** Real `display_name` values in the course include *"Video: Course
Introduction"* and — the telling one — **"Video: Podcast: Job Roles, Career Path and Growth"**. They are
writing the type into the title because the platform has nowhere else to put it. Any decision to derive the
badge has to say what happens to those prefixes, or every row will state its type twice.

**2. Bookmarks is real.** `GET /api/bookmarks/v1/bookmarks/?course_id=…` → **200**, paginated
(`count`, `num_pages`, `current_page`, `next`, `previous`), zero rows for this user. The *Bookmarks* item in
the Course tools card has a source. ✓

**3. `jump_to` is verified, with a vertical id.** ✓
`GET /courses/{course_id}/jump_to/{vertical_block_id}` resolves and redirects to
`…/learning/course/{course_id}/{sequential_id}/{vertical_id}` in the MFE — it finds the parent sequential
itself. The ⚠︎ in §3 on constructing topic deep-links becomes a ✓.

**4. Dates returns two blocks on a real course too.** `course-start-date` (28 Jul 2026) and `course-end-date`
(31 Oct 2037 — a placeholder someone typed). Nothing else. §14.2 was read off the workbook; this confirms it
against a live course. The ruling it forces is unchanged.

**5. The live Progress payload carries five fields the workbook sample does not:**

| Field | Value here | Why it matters |
|---|---|---|
| `disable_progress_graph` | `false` | **A config flag that hides the completion graph.** Our Completion card needs a state for when it is true — otherwise the design assumes a component the course can switch off |
| `user_has_passing_grade` | `false` | A direct boolean. Cleaner than reading `course_grade.is_passing`, and worth checking which one the MFE trusts |
| `verification_data` | `{link: null, status: "none", status_date: null}` | ID verification. Not in scope, but it is on the payload |
| `studio_url` | present | Staff only — this response is role-dependent |
| `username` | `nelson-jeronimo` | The payload names its subject, which matters for the staff "view as" case |

**6. The chain closes.** The numbers agree end to end, which is the point of doing this at all:

| | Payload | Live page | Our screen |
|---|---|---|---|
| Completion | `complete_count: 1`, `incomplete_count: 26` → 3.7% | **4% completed** | 38% (Six Sigma sample) |
| Grade | `course_grade.percent: 0.15` | **15%** | 15% |
| Threshold | `grade_range: {Pass: 0.7}` | **Passing grade 70%** | Passing 70% |
| Policies | Final Exam 0.5 · Final Project 0.5 | **50% / 50%** | 50% / 50% |
| Graded subsections | 2 of 14 | **one module, two lessons** | one section, two rows |

And it caught a defect in our own screen: the completion card read *"38 complete · 4 incomplete"* beside
**38%**, which is 90%. Now `16 complete · 26 incomplete · 0 locked` — 42 topics, matching the Course tab, and
16/42 = 38%. A card whose own two numbers disagree is worse than one with no numbers.

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
  when the request asks for it (`include_playback_url=true`) **and** the recording succeeded, is not archived
  and has a blob path. The URL expires — so it cannot be pre-fetched for a whole list, and a copied link will
  not survive.
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

---

## 13. v11 — everything the data allows

A deliberate maximum, not a proposal. `Course Detail — v11 · everything the data allows` (`5401:325`) places
**every field the platform offers this page**, so the cost of having them all is visible rather than argued.

| Added over v10 | Field | Where |
|---|---|---|
| Track chip, beside *Self-paced* | `enrollment_mode` | hero |
| `org · number` sub-header | `org`, `number` | under the hero stats, where the workbook puts them |
| *Search this course* | Feature 33 | right of the tab bar |
| *Currently passing* | `user_has_passing_grade` | progress card — arrives on the outline call, no extra request |
| *More content coming* | `blocks.{id}.has_scheduled_content` | module subtitle |
| Upcoming dates | `dates_widget.course_date_blocks` + `dates_tab_link` | sidebar |
| Course tools | `course_tools[]` — Bookmarks | sidebar |
| Weekly goal | `course_goals` | sidebar |
| Milestone celebration | `celebrations` | the card strip, being an overlay rather than page furniture |

**What it demonstrates, which is the point of drawing it:** the right column goes from three cards to six and
runs to roughly 1 100 px — longer than the syllabus beside it. A learner scrolling to Module 4 passes a
mentor, a certificate, handouts, dates, bookmarks and a weekly goal on the way. Every one is backed by a real
field. The frame asks which of them earns the room.

**How to read it at the review:** v10 is the proposal, v11 is the inventory. Decide what moves from one to the
other, rather than treating v11 as the target.

---

*Written 3 Aug 2026 from the SK-11378 delivery. Every ✅, ⚠︎ and ✗ above was checked against the payloads in
the workbook, not against stock Open edX behaviour.*

---

## 14. The other tabs — what is inside Progress, Dates and Q&A

Everything above documents the **`courseware` tab**. The tab bar renders five items (seven on VILT), so four
more destinations exist and none had been mapped. The payloads for two of them were in the workbook all along,
on the *API Information* sheet — APIs 4 and 5. Read before designing, they settle the shape of both tabs and
kill one of them.

### 14.1 Progress — the richest tab we have, and it is mostly a grade book

`GET /api/course_home/v1/progress/{course_key}` (optional `/{student_id}` — **staff can view any student**;
401 if not enrolled, 404 if the tab is disabled, and grades are recalculated on every call for non-staff).

| Element it supports | Field | Verdict |
|---|---|---|
| Completion ring / bar | `completion_summary` → `complete_count`, `incomplete_count`, **`locked_count`** | ✅ — and note `locked_count`, which the Course tab's progress card never showed |
| Grade percentage | `course_grade.percent` | ✅ **the grade, not the completion.** Two different numbers; the hero card shows completion |
| Pass / fail | `course_grade.is_passing` + `grading_policy.grade_range` (`{"Pass": 0.7}`) | ✅ — the threshold is a field, so *"70% to pass"* is renderable, not copy |
| Letter grade | `course_grade.letter_grade` | ⚠︎ `null` in the sample |
| Grade breakdown by assignment type | `grading_policy.assignment_policies[]` → `type`, `short_label`, `weight`, `num_total`, `num_droppable` | ✅ — weights, so a *"Final Quiz 30% · Lab 70%"* table is real data |
| Per-section score table | `section_scores[]` → `display_name` + `subsections[]` | ✅ the spine of the tab |
| Each subsection row | `display_name`, `num_points_earned` / `num_points_possible`, `percent_graded`, `has_graded_assignment`, `assignment_type` | ✅ |
| Row deep link | `subsections[].url` — a full `jump_to` URL | ✅ **already built, unlike the syllabus.** Worth noting: the Progress payload hands over the URL the Navigation API withholds |
| Whether to show a score at all | `show_grades`, `show_correctness`, `learner_has_access`, `override` | ✅ — four separate gates, and a row can be visible with its score hidden |
| Certificate | `certificate_data` | ✅ same object as the Course tab's card |

Two cautions. `subsections[].url` **may be null after the due date** (the workbook says so explicitly), so the
row must degrade to non-clickable. And `assignment_policies[].type` is free text authored in Studio — the
sample carries `"Final Quiz "` with a trailing space and `"Hands-on Lab: BigQuery Machine Learning using
Soccer Data"` as a *type*. Render verbatim, and do not design a layout that assumes a short label; `short_label`
is the short one.

### 14.1b The Progress tab, built — and five places we did not copy the platform

`5482:4574`. Four new components: `Completion card`, `Grade meter`, `Grade summary row` (Header/Row/Total)
and `Score row` (Section/Subsection). The numbers in it are the workbook's own sample — Final Quiz weighted
0.3, Lab 0.7, current weighted grade 15%, pass at 70% — so the table can be checked against the payload rather
than admired.

The live page was the reference, and it confirmed the mapping. Five things we did **not** carry over:

**1. The live Progress tab has no hero at all.** Nothing on it names the course you are in. Ours keeps a slim
hero — breadcrumb and title, with the chips, stats and progress card hidden — because losing your place on a
tab switch is a defect, not a layout saving.

**2. Related links is redundant and was dropped.** The live sidebar offers *Dates* and *Course Outline* as
links — two of the destinations already sitting in the tab bar at the top of the same page. Copying it would be
copying a platform mistake.

**3. The completion card shows `locked_count`.** The platform reports three numbers and renders two. A learner
whose total is short with no explanation has nowhere to look; naming the locked count costs one line.

**4. The passing-grade notice is not dismissible.** It uses the library `Alert` with `X close button=false`
and `Color=Warning`. A requirement to pass is not a message you have finished reading — which is the exact case
the `Persistent` variant request in `library-requests.md` was filed for. Until that variant exists, turning the
close button off is the workaround, and it is a *property* rather than a rule, so it will drift.

**5. The sidebar carries Certificate and Weekly goal, nothing else.** Both answer a question this tab raises —
am I going to pass, and am I keeping pace. Mentor, Handouts, Dates and Tools belong to the Course tab.

One thing to hand to engineering with the file: **the meter's geometry is drawn, not data.** Fill width and
threshold position are pixels in Figma and percentages in code. The component description says so, because a
developer measuring the artboard would ship the sample's 15% as a constant.

### 14.2 Dates — a whole tab for two rows

`GET learning/course/{course_key}/dates`. Returns `dates_banner_info`, `course_date_blocks[]`, `has_ended`,
`learner_is_full_access`, `user_timezone`.

Each block carries `date`, `date_type`, `title`, `description`, `assignment_type`, `complete`,
`learner_has_access`, `link` / `link_text`, `extra_info`, `first_component_block_id` — a well-formed timeline
row, with a link into the content and a complete flag.

**And on our courses it returns two entries: `course-start-date` and `course-end-date`.** Nothing else,
because `due` is null on every block (§1.4) — no assignment has a deadline to list. A dedicated tab whose
content is *"Course starts"* and *"Course ends"* is a tab that will read as broken.

This is the same finding as the sidebar Upcoming-dates widget, arriving from the other side, and it forces the
ruling that was flagged in §5 row 5 — **ours or theirs**. Three options, and the middle one is the honest
default:

1. **Render the tab from `tabs[]` anyway** — it is what the platform returns, and the day content authors set
   due dates it fills itself. Costs a tab that today shows two rows.
2. **Keep the sidebar widget, drop the tab from our shell** — the widget already shows the same two dates in a
   place where two rows look deliberate. `tabs[]` still lists it, so this is us choosing not to render an item
   the array contains, which is a divergence to write down.
3. **Wait for the content team.** Same as option 1 but honest about when it becomes useful.

### 14.3 Mentorship Q&A — the tab our own decision contradicts

`tabs[]` returns `tab_id: discussion`, titled **Mentorship Q&A**. That is the platform's **discussion forum**,
renamed. The workbook documents no learner-facing discussion API at all — the only forum endpoints in it are
`list_forum_members` and `update_forum_role_membership`, both **instructor** role-management calls.

That gap matters less than the contradiction behind it. Decision
[007](../00-decisions/007-mentor-async-messaging.md) is accepted and says mentoring is **unlimited 1:1
asynchronous messaging**, explicitly *not* group threads. A discussion forum is many-to-many by construction.
So the tab named *Mentorship Q&A* is not the mentoring the product decided to build, and the *Message David*
button on the mentor card has no 1:1 endpoint behind it — the forum is the only thing there.

**This tab cannot be designed until that is resolved**, and it is not a design question. Either mentoring is
the forum and decision 007 needs revisiting, or mentoring is 1:1 messaging and it needs a SkillUp-side service
that no Course Home API provides. Drawing threads now would be guessing which.

### 14.4 Live and Recordings — specified, and out of MVP scope

Both are documented (§12.3) and both have real endpoints: `GET /api/course_live/iframe/{course_id}/` returns
the Zoom LTI iframe HTML; `GET /api/zoom_recordings/courses/{course_id}/recordings/` lists recordings sorted by
`recording_start`, and `POST .../playback_url/` mints a **short-lived SAS URL** per playback. They appear only
on VILT courses, which Harpreet's ruling (01:22:22) puts outside the MVP. Specified, not scheduled.

### 14.5 Instructor — not ours

Fifty endpoints of enrolment, grade override, reports and certificate administration. It is edX's staff
dashboard, it is gated by role, and a learner never sees it. Out of scope for the learner panel entirely.

