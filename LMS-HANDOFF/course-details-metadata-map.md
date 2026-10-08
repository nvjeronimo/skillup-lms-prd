# Course Details — the metadata, mapped to the design

**Source:** two deliveries against Jira **SK-11378**.
`30-07 meetings/Course_metadata.xlsx`, 3 Aug 2026 — Metadata (73 fields), API Information (8 endpoints with real
payloads), Feature Inventory, Role-Based Visibility. Sample course `course-v1:SkillUp+SQL-TMDA+2025_B13`.
`30-07 meetings/Course_metadata (2).xlsx`, 4 Aug 2026 — the VILT addendum, from row 84: **Live** (11 fields),
**Recordings** (20 fields) and the **Instructor dashboard** (80 fields), plus eight endpoints and three new
blocks in the role matrix. See §12.

**Design audited:** `Course Detail — v9 · Self-paced MVP (workshop 29 Jul)`, node `6207:252677`,
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
> *17 Sep:* and it is not the course this phase delivers — that one **is** self-paced (§18.2).
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
| Delivery mode chip — *Flexible Learning* (§18.1) | `is_self_paced` — course_metadata · `pacing` — **Courses API** | ✅ — the sample courses say instructor-paced; **the course this phase delivers is self-paced** (§18.2) |
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
| In progress | the default | `6207:252969` (v10) |
| Never started | `resume_course.has_visited_course: false` | `6207:254175` |
| Completed | `cert_data.cert_status` | `6207:254469` |
| Course ended | `has_ended: true` | `6207:254782` |

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
| SUPERSEDED · Course Detail — v9 (workshop 29 Jul) | `6207:252677` | kept for comparison |
| v9 — the workshop record | `6207:252957` | trimmed to the rulings in the room's own words; everything else moved to the decisions table |
| Course Detail — v10 · metadata applied | `6207:252969` | the in-progress state |
| Never started | `6207:254175` | `resume_course.has_visited_course: false` |
| Completed — certificate earned | `6207:254469` | `cert_data.cert_status` |
| Course ended | `6207:254782` | `has_ended: true` |
| **v11 · everything the data allows** | `6207:255912` | the maximal version — every available field placed, so the cost of having them all is visible |
| **Course Detail — how to read this section** | `6207:255081` | the one narrative panel: v9 → v10, the structural finding, the two corrections, and where the rest lives |
| **Cards — states the pages do not show** | `6207:255871` | the four certificate states, including `generating`, and the recent-recordings card for VILT courses |
| **★ ENTRY · Course Detail — v12 · componentised** | `6207:256439` | the entry screen, built from instances — 30 at the top level, 21 ours and 9 from the library. The only loose text left on the page is the unlock-tooltip callout, which is a note about the design rather than part of it |
| ~~Course Detail — Progress tab · v1~~ | ~~`5482:4574`~~ | **deleted 21 Aug** — the annotated `⚙ TECHNICAL · Progress tab` (`6207:257333`) is the only copy, and carries the design as well as the notes |

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
`⚙ Technical — every element, its field, and whether we can build it` (`6207:257303`). Two reasons: the design
pages stopped being read through engineering notes, and there is now more than one of them.

| Frame | Node | What it annotates |
|---|---|---|
| `⚙ TECHNICAL · Course tab` | `6207:257304` | v12, the courseware tab |
| `⚙ TECHNICAL · Progress tab` | `6207:257333` | the Progress tab, from the API Information sheet |
| `⚙ TECHNICAL · Dates tab` | `6207:257388` | the two rows the payload actually returns, and the ruling it forces |
| `⚙ TECHNICAL · Mentorship Q&A tab` | `6207:257432` | both candidate products, side by side, neither signed off |
| `How to read this section` | `6207:257354` | the legend, the scope rule, and the verdict key |
| `Open questions — who owns each, and what closes it` | `6207:257477` | the fourteen decisions this section exists to force (§25) |

Open them in **Dev Mode**. Together they carry **73 annotations across 50 elements**, in all four categories
rather than everything under Development, because they are four different conversations with four different
owners:

**Scope rule — what an annotation is for.** Every one answers one of two questions: **does the platform do
this**, and **can we get the data**. They are about our design against edX. They are *not* about which
component we built it from — a note saying "this should be an instance of `Input field`" is design-system
housekeeping, it belongs in the component description, and it was removed from these pages on 21 Aug. Six
annotations went; two more lost the half that named a library and kept the half that stated a rule.

The distinction matters because of who reads this. A stakeholder deciding whether a tab ships does not care
which library the alert came from. They care that **a warning about a permanent condition cannot be
dismissible** — which is the same note with the housekeeping taken out, and is now what it says.

| Category | Carries | Course | Progress | Dates | Q&A | All |
|---|---|---|---|---|---|---|
| **Development** | does the field exist, and does it come back populated | 24 | 12 | 4 | 14 | **54** |
| **Content** | where the words come from, and who owns them | 6 | 6 | 1 | 4 | **17** |
| **Interaction** | behaviour — what 401s, what expires, what must not be dismissible | 5 | 7 | — | 3 | **15** |
| **Accessibility** | what the interaction requires to be reachable at all | 1 | — | — | — | **1** |
| | **annotations** | **36** | **25** | **5** | **21** | **87** |
| | **on elements** | **22** | **16** | **4** | **13** | **55** |

**Nothing is annotated twice.** Verified by comparing every annotation body across the four tabs: 87 distinct
notes, 87 places. Two shared elements are annotated **only on the Course tab** — the course header and the tab
bar — because both are identical on all four and a copy is four places to forget to update.

Where a note looked like it was about the tab bar but was really about *that tab's destination*, it moved to
the page rather than being deleted: the Dates ruling now sits on its own note element, the Q&A cohort-privacy
constraints on the conversation list, and the *"Progress 404s if the tab is disabled"* warning on the Progress
heading. The generic *"render from `tabs[]`, never hardcode"* stays once, on the Course tab — where it was
also misfiled on the course-type badge until 21 Aug.

**The course header is identical on all four tabs and is annotated only on the Course tab.** The inner tabs
leave it unannotated on purpose. Every field in it comes from `course_metadata` and the Courses API, both
called on every page load, so a constant header costs nothing — but repeating the same eight notes on four
screens would be four places to forget to update, and would read as depth rather than repetition.

This reverses the slim-header decision taken when the Progress tab was built. The live platform drops the
header entirely on its inner tabs — on its Progress page nothing names the course you are in — which is a
defect rather than a precedent.

⚠︎ **On the Progress tab the completion figure appears twice**, once in the header card and once in the
Course completion card. Both read `completion_summary`, so they can only be the same number. The warning lives
on the completion card, which is page content — not on the header. They disagreed until 21 Aug: the header
read *14 of 42*, the card read *16 complete · 26 incomplete*. Both now read 16 of 42, which is 38%.

**The course header is identical on all four tabs and is annotated once**, on the Course tab. The inner tabs
carry a single pointer to it rather than a copy. Every field in the header comes from `course_metadata` and the
Courses API, both called on every page load, so a constant header costs nothing extra — but four copies of the
same eight notes would be four places to forget to update, and the counts would read as depth that is not
there.

This reverses the slim-header decision taken when the Progress tab was built. The live platform drops the
header entirely on its inner tabs — on its Progress page nothing names the course you are in — which is a
defect rather than a precedent.

⚠︎ **On the Progress tab the header repeats the page**: the hero progress card and the Course completion card
are the same `completion_summary`, rendered twice. That is the cost of the constant header and it is worth
paying — but the two must never disagree. They did until 21 Aug, when the hero read *14 of 42* and the card
read *16 complete · 26 incomplete*. Both now read 16 of 42, which is 38%.

**The course header is identical on all four tabs**, and its annotations repeat with it — each tab is read on
its own, so a note that only exists on the Course tab is a note the Progress reader never sees. Every field in
the header comes from `course_metadata` and the Courses API, both called on **every** page load, so a constant
header costs nothing extra.

This reverses the slim-header decision taken when the Progress tab was built. The live platform drops the
header entirely on its inner tabs — on its Progress page nothing names the course you are in. A header that
changes per tab is a header the learner has to re-read.

⚠︎ **On the Progress tab the header repeats the page**: the hero progress card and the Course completion card
are the same `completion_summary`, rendered twice. That is the cost of the constant header and it is worth
paying — but the two must never disagree. They did until 21 Aug, when the hero read *14 of 42* and the card
read *16 complete · 26 incomplete*. Both now read 16 of 42, which is 38%.

**The four are not equally dense, and that is the finding rather than a gap.** A tab gets as many notes as it
has fields behind it. Dates has five because *two date rows is the entire payload*. Q&A has four because the
tab has no learner-facing API and what is drawn are two candidate products, neither signed off. Reading the
counts as completeness would get it exactly backwards — the thin pages are thin because the platform is.

The Progress page was brought up to the Course page's density on 21 Aug — the tables were annotated row by
row, and the two cards had the session's findings folded into them. Two of those are worth reading even if
nothing else on the page is:

- **`disable_progress_graph` can switch the completion card off.** It is a per-course config flag, verified on
  the live payload. The card needs a suppressed state; it is not guaranteed to be on the page.
- **`user_has_passing_grade` is a top-level boolean**, alongside `course_grade.is_passing`. Both are on the
  payload and they answer the same question. Decide which one the build trusts before they disagree.

The Development / Content split is the one that earns its keep in a review. `welcome_message_html` **exists**
(Development, ✓) *and* its copy is arbitrary instructor-authored HTML (Content) — two facts, two owners, and a
single list would collapse them into one.

> *23 Sep:* the board now holds **fourteen**, each with a milestone — the current register is §25.

**The six open questions** now have their own board — `6207:257477`, under the legend. Each carries three
lines that "open" on its own does not give you: **why it is open**, **who owns it**, and **what would close
it**. None of them is a design question; every one needs somebody outside the file to choose.

| # | Question | Owner |
|---|---|---|
| 1 | Who supplies the mentor? | Product · SkillUp platform |
| 2 | Who authors `effort_time`? | Content team |
| 3 | Does the unlock tooltip stay? | Design · Product |
| 4 | Dates: tab, or the sidebar widget? | Product |
| 5 | Mentoring on the forum, or a service of our own? | Product · Engineering |
| 6 | Do we derive the topic type, and what happens to the title prefixes? | Product · Content |

Six is new. It came out of the 21 Aug session (§12.5): the topic type **is** derivable, at one extra call, but
it collapses twelve ICP types into five and the authors are already writing the type into `display_name` to
compensate. Deriving the badge without deciding what happens to those prefixes gives every row its type twice
— the duplication the verb ruling had just removed.

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
| `Module row` (6 variants: State × Expanded) · `Lock` molecule (Size md · sm) · `Topic row` | `5416:382` · `5419:384` |
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

**Everything in the technical section is on a token or a DS style** — audited 21 Aug across all 22 components
and frames: 235 text nodes, every fill, stroke, padding and gap. Zero text without a style or a bound type
variable; zero unbound spacing; three raw colours, all deliberate (the legend's category dots mirror Figma's
own Dev Mode annotation colours).

⚠︎ **The DS text styles have a gap:** Caption 12 → Body/Small 14 → Body/Default 16 → Body/Lead 18 →
**Display 72**. Nothing between 18 and 72, so headings have no style to take and are bound to `Type/size/*`
and `Type/line-height/*` variables instead — `text-xl` 20, `display-xs` 24, `display-sm` 30, `display-md` 36.
Worth knowing before someone hunts for a Heading style that does not exist.

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
| ~~`Self-paced` · `Professional` chips~~ | ~~adopted `Badge`~~ → now **`LMS / Delivery Mode Badge`** and **`LMS / Difficulty Badge`** (§18.1) |
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
| Course Detail — element → field | `6207:255097` | 36 rows: every element, its field, and a verdict |
| API surface (8 endpoints) | `6207:255297` | Endpoint, when it is called, what it carries, caching, the 401s |
| Role-based visibility | `6207:255411` | Sheet 4 as a matrix, with the scope caveat on the first column |
| States | `6207:255499` | The four states, what each turns on, what changes on screen — plus what is not drawn yet |
| Decisions and open questions | `6207:255563` | What is decided and where it came from; what is open and who owns it; why the certificate is a card |
| Metadata we still need | `6207:255703` | What the ✗ and ⚠︎ verdicts would take to become ✅, with owner and status |
| Live and Recordings | `6207:255815` | What the VILT addendum rules in and out for design — not the fields, which are in §12 |

**Row 3 — out of scope**, under *Out of scope — states the learner panel never serves*

| Frame | Node |
|---|---|
| Unenrolled (platform state, not reachable in the panel) | `6207:253272` |
| A · public access off | `6207:253551` |
| B · anonymous | `6207:253644` |
| C · enrolment closed | `6207:253908` |
| Out of scope — notes | `6207:253536` |

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

### 12.6 The ✗ sweep — two verdicts were wrong, three hold, one was never testable

After the discussion-API correction, every remaining ✗ was re-checked against the live environment rather than
against the workbook. The test applied to each: **was this read off a payload I fetched, or off a spreadsheet?**

#### Wrong — corrected

**The partner logo.** The IBM chip was marked *"no source anywhere"*.
`GET /api/organizations/v0/organizations/` returns all 18 organisations, each with a **`logo`** URL —
IBM's is `/media/organization_logos/ibm_new.png`. Match on `short_name` against the course's `org`. The
endpoint simply is not in the workbook. **✗ → ✅**, with one real caveat: `org` is the *authoring*
organisation. This course returns `SkillUp`; a Google course returns `Google`. Where the partner brand and the
author differ, `org` is the wrong field and there is no other.

**The course-level duration.** The Courses API returns **`effort`**, populated:
`"4 weeks<br>2-4 hours/week"`. So the *"~ 14 hours"* line is renderable. **✗ → ✅ with a warning** — `effort`
is free HTML authored in Studio, carries a `<br>`, and mixes a span with a rate. Render verbatim.

#### Confirmed — these hold, and now on live evidence rather than inherited

| Claim | Live result |
|---|---|
| `effort_time` and `effort_activities` are null on every block | ✅ confirmed — null on all 22 blocks in the outline |
| `due` is null on every block | ✅ confirmed — which is *why* Dates returns two rows |
| No mentor, instructor or staff-profile field anywhere | ✅ confirmed — no `instructors` on the Courses API, none in the outline, none in `course_metadata` |
| `blocks.{id}.icon` is unusable for the type badge | ✅ confirmed — `null` on 20 blocks, `fa-pencil-square-o` on the two graded sequentials. Two values against twelve types |

#### Never testable on this course

**The lock and the unlock date.** Nothing in `SKOADM01EN` is locked, so neither `accessible: false` nor
`type: "lock"` appears in the payload at all. The claim that no unlock date exists is still *documented* rather
than *observed* — it needs a course with a real prerequisite. **Marked ⚠︎ untested rather than ✗ confirmed**,
which is a different thing and should not go into a meeting as the same thing.

#### Five fields the outline returns that we had never recorded

| Field | Why it matters |
|---|---|
| `course_goals.weekly_learning_goal_enabled` | **`false` on this course.** The Weekly goal card can be switched off per course — the same shape of finding as `disable_progress_graph` on Progress. Two sidebar cards now have a suppressed state |
| `hide_from_toc` | Per block. A unit can be excluded from the table of contents while still existing |
| `title_prefix` | Empty here, but it prefixes the course title |
| `enroll_alert` | `{can_enroll, extra_text}` |
| `cert_data.cert_status: "audit_passing"` | A status value the four-state certificate card does not cover |

#### What the sweep says about method

Two of the six ✗ verdicts were wrong, and both failed the same way: **a gap in the SK-11378 workbook was
recorded with the same ✗ as a gap observed in a payload.** The verdict looked identical; the evidence behind it
was not. Everything checked directly against a response held.

The fix is in the verdict key, not in more checking: **✗ now means "no source, verified against the platform"**.
Anything resting only on the workbook is ⚠︎ until someone fetches it.

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

A deliberate maximum, not a proposal. `Course Detail — v11 · everything the data allows` (`6207:255912`) places
**every field the platform offers this page**, so the cost of having them all is visible rather than argued.

| Added over v10 | Field | Where |
|---|---|---|
| ~~Track chip, beside *Self-paced*~~ → **Level chip** (§18) | ~~`enrollment_mode`~~ → `level_type` (Discovery) | hero |
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

### 14.2b The Dates tab, built to its full capability — on its own page

`↳ LMS / Dates — everything the payload can carry 🟠` (page `5655:325`), two frames side by side: what the
payload *can* carry, and what our courses return today. The comparison is the argument.

**Eight `date_type` values, not two.** Read off `date_summary.py` — each literal is a class in the platform:

| `date_type` | What it marks |
|---|---|
| `todays-date` | **the today marker** — what turns a list into a timeline |
| `course-start-date` · `course-end-date` | the two our courses return |
| `assignment-due-date` | a deadline, and the only type that carries `complete` and `past_due` |
| `course-expired-date` | audit access ending |
| `certificate-available-date` | certificate release |
| `verified-upgrade-deadline` | upgrade cut-off |
| `verification-deadline-date` | ID verification cut-off |

**One component, `LMS / Dates / Date row`** (`5655:519`) — four states (Upcoming · Complete · Overdue ·
Locked) and five booleans. Every element on it is a field: `date` formatted in `user_timezone`, `date_type`,
`assignment_type`, `complete` / `past_due`, `learner_has_access`, `title`, `description`, and `link` /
`link_text` or a `jump_to` from `first_component_block_id`.

**Six things the current tab drops that the payload already returns:**

1. **`description`** — the course-end block ships a real sentence about archiving; we render nothing.
2. **`assignment_type`** — *Homework*, *Final Exam*. Free text from Studio, same hazard as the grading policy.
3. **`complete` and `past_due`** — four row states instead of none.
4. **`learner_has_access`** — the locked row.
5. **`link` / `first_component_block_id`** — every date can be a way into the content.
6. **`dates_banner_info`** — four flags, of which `missed_deadlines` is the one that matters. Drawn, and
   **dismissible**, unlike the passing-grade notice on Progress: a missed deadline is news you finish reading.

**And two corrections to the existing tab:**

⚠︎ **It renders the raw `date_type` string as visible copy.** `course-start-date` is a debug artefact sitting
on a page shown to stakeholders. Each type needs human copy; the literal belongs in the annotation.

⚠︎ **The timeline was squeezed into 600px beside an empty 320px sidebar.** The Dates tab has no sidebar
content, so the grid was giving a third of the page to nothing. Full width on the new page.

**Not built, because there is no field:** a countdown (*"in 3 days"*) is derivable from `date` but is ours,
not the platform's; and `enrollment_start` / `enrollment_end` exist on the Courses API but are **not** in
`course_date_blocks`, so putting them in this list means injecting them from another call.

### 14.3 Mentorship Q&A — a correction, and the forum does almost all of it

**This section previously said no learner-facing discussion API exists. That was wrong**, and the error is
worth naming precisely: it was true of the **SK-11378 workbook**, which documents only two forum endpoints and
both are instructor role-management. It was never true of the **platform**. Reading a gap in a spreadsheet as
a gap in edX is the exact mistake this document exists to prevent.

**Open edX Discussions API v1 is live and enabled on the dev instance.** Verified 21 Aug against
`course-v1:SkillUp+SKOADM01EN+2026_v1`:

```
GET /api/discussion/v1/courses/{course_id}
→ is_posting_enabled: true · provider: "openedx" · enable_in_context: true
  allow_anonymous: true · allow_anonymous_to_peers: false · show_discussions: true
```

#### What the thread payload actually returns

`GET /api/discussion/v1/threads/?course_id={id}` — paginated, and it carries every field the chat screen draws:

| Screen element | Field | |
|---|---|---|
| Thread subject | `title` | ✅ |
| Preview line | `preview_body` | ✅ |
| Age | `created_at` · `updated_at` | ✅ |
| Message count | `comment_count` | ✅ |
| Unread state | `read` · `unread_comment_count` | ✅ |
| Message author | `author` · `author_label` (returns `"Staff"`) | ✅ |
| Avatar | `users.{username}.profile.image` — four sizes plus a default | ✅ |
| Body | `raw_body` · `rendered_body` | ✅ |
| Replies | `comment_list_url` → `GET /api/discussion/v1/comments/?thread_id={id}` | ✅ |
| Posting | `POST /api/discussion/v1/threads/` · `POST /api/discussion/v1/comments/` | ✅ |

**And the Q&A primitive is native.** `type` on a thread is `discussion` or `question`; question threads carry
`has_endorsed`, `endorsed_by`, `endorsed_at` and split their replies into `endorsed_comment_list_url` and
`non_endorsed_comment_list_url`. An accepted answer is a platform feature, not something we build.

Also returned and not currently drawn: `following`, `pinned`, `closed`, `voted`, `vote_count`,
`abuse_flagged`, `close_reason`, and **`editable_fields`** — the list of what *this* user may change, which is
the honest source for whether an edit control renders.

#### What it does not give: privacy — and the mechanism that would

The forum is many-to-many by construction. On this course `group_id` and `group_name` come back **null**, so
every thread is visible to everyone enrolled. A 1:1 conversation needs **divided discussions**: posts in a
divided topic are visible only to members of the same cohort, plus staff. A cohort of one learner makes that
a private conversation.

The path is API-driven — `POST /api/cohorts/v1/courses/{course}/cohorts/`, then
`POST .../cohorts/{id}/users/{username}` at enrolment — but it carries three constraints, and the first is hard:

1. **Divided discussions must be configured before the course start date.** They cannot be turned on
   afterwards. A course already running cannot be retrofitted.
2. **Dividing course-wide topics requires dividing every content-specific topic too.** It is not a per-topic
   switch, so in-context discussion on each unit becomes cohort-scoped — and on a cohort of one, unit
   discussions stop being peer discussions at all.
3. **The mentor needs moderator scope.** A Group Community TA sees only their own group; reaching many
   learners needs discussion moderator or admin, a broader permission than "mentor" implies.

#### What is still genuinely missing

**Which member of staff is *your* mentor.** The forum tells you who wrote a post — `author`, `author_label`.
It does not tell you who is assigned to you. That is open question 1, unchanged by any of this, and it is now
the larger of the two gaps rather than the smaller.

#### The choice this leaves

**Route A — build on the forum.** Most of the screen works today; privacy costs the three constraints above.
**Route B — a SkillUp-side messaging service.** Unconstrained, and everything has to be built.

A is far cheaper and arrives sooner. B is the only one that satisfies 007 without asking a forum to behave
like a private channel. That is open question 5, and it is a product and engineering decision.

One more thing worth deciding early: `allow_anonymous: true` on this course. Anonymity is inherited course
configuration and is a strange fit for a conversation with your assigned mentor.

### 14.4 Live and Recordings — specified, and out of MVP scope

Both are documented (§12.3) and both have real endpoints: `GET /api/course_live/iframe/{course_id}/` returns
the Zoom LTI iframe HTML; `GET /api/zoom_recordings/courses/{course_id}/recordings/` lists recordings sorted by
`recording_start`, and `POST .../playback_url/` mints a **short-lived SAS URL** per playback. They appear only
on VILT courses, which Harpreet's ruling (01:22:22) puts outside the MVP. Specified, not scheduled.

### 14.5 Instructor — not ours

Fifty endpoints of enrolment, grade override, reports and certificate administration. It is edX's staff
dashboard, it is gated by role, and a learner never sees it. Out of scope for the learner panel entirely.


---

## 15. Adopting the DS — five pairs, and everything drawn by hand

From the 8 Sep catchup with Navdeep: component reuse is one of the four workshop themes, and the rule is his
flow on `❖ LMS COMPONENTS ✅` (`21397:4897`) — **exists in the SKO file → use the library component; does not
exist → peer review, and check tokens and variables.** Nothing is promoted into the DS while this is discovery.

### 15.1 The five pairs

| # | Ours (local) | DS | Verdict |
|---|---|---|---|
| 1 | `Topic row` | `LMS / Topic Row` (9 variants) | **Adopted.** Tested at the syllabus' 560px first; it stretches cleanly |
| 2 | `Thread row` · `Message` | `LMS / Thread Item` | **Keep ours** — Thread Item is a forum feed card with no unread, selected or answered state. Peer review |
| 3 | `Certificate card` | `LMS / Course Certificate` | **Keep ours** — the DS one is the certificate document itself; ours is its status card. Issued → View opens it |
| 4 | `Grade meter` · `Grade summary row` · `Score row` | `LMS / Quiz · Grade Summary` | **Adopt, after three gaps close** — only a `Below pass` variant, no lettered scale, and "Quiz" in the name of a course-level component |
| 5 | `_Remove · Banner` | `Alert` | **Done** — the screens already used `Alert`; the local set had 0 instances and is deleted |

**What adopting Topic Row buys.** A `Locked` state, which `accessible: false` had nowhere to go without; hover
and open; and a bookmark slot the Bookmarks API can fill. What it costs: the single line with meta on the right,
the underlined title, and the row's own divider. Swapped on `⚙ TECHNICAL · Course tab` and the `★ ENTRY` screen
(14 instances). The 24 instances on the exploration boards (*Verb prefix*, *Integration proof*) stay on the local
component, which is kept for them.

> **Reversed 24 Sep — the syllabus is back on the local `Topic row`, grouped by `Lesson Header`.** Nelson redrew
> Module 3 on `⚙ TECHNICAL · Course tab` (`6207:257322`) and it is now the format: the `Module row`, a 1px `sep`, then
> one container (padding 4/20) holding the DS **`LMS / Lesson Header`** for each lesson (*Define and measure*,
> *Analyze and interpret* — `sequential.display_name`) followed by its **`LMS / Course Detail / Topic row`** instances
> (`vertical`). One line per topic: state icon, underlined title, type and duration on the right. The two costs listed
> above are what came back; the one gain that mattered, **`Locked`**, the local set now has too (`State=Locked`).
> `★ ENTRY` was switched to the same block (a clone of the Course tab's, no annotations). The exploration boards stay
> as they were.

### 15.1b Grades — adopted on the Progress tab, 15 Sep

After peer review, `LMS / Quiz · Grade Summary` replaces `Grade meter`, `Grade summary` and `Detailed grades`
on `⚙ TECHNICAL · Progress tab`. **The DS was not changed** — everything below is an instance override, and
what an override could not reach is listed as a gap.

**Carried across.** The screen's data (15% against 70%, the two assignment types, one graded module with two
lessons); the passing-grade `Alert` above it; and the footnote below, whose annotation calls it load-bearing.
The annotations moved onto the matching sublayers of the instance — `Header`, `Progress`, `Table`,
`Breakdown` — and **four duplicated pairs were merged**, so the tab went from 25 annotations to 21 with nothing
lost. The three local grade components now have **0 instances**; kept, not deleted, while this is discovery.

**Two overrides that make it read correctly.** The long assignment type wraps — the cell and row were set to
hug, as the `type` annotation asks — and the section row (*Module 4 · …*) is set to `Body/Small/Semibold` so
section and lessons do not read as siblings.

**The gaps — library request 8.** Fine on this screen, not fine for production:

| Gap | Why it matters |
|---|---|
| **Table has two body rows, fixed** | `assignment_policies[]` has as many rows as Studio authors. A third type cannot be shown without detaching |
| **Breakdown is four flat rows, fixed** | `section_scores[] › subsections[]` is a two-level list of any length. Extra rows are hidden here, and hierarchy is faked with a text style |
| **`Progress bar` has 10% steps** | 15% is drawn as 20%. The annotation already warns the geometry is drawn, not data |
| **The pass marker is fixed at 70%** | `grade_range` is per course. It matches here by coincidence |
| **Only `Result=Below pass`** | no Passing or Not started state |
| **No lettered scale** | the rule is *render whatever `grade_range` returns*, and the platform supports both shapes |
| **"Quiz" in the name** | it is a course-level gradebook, and the name will send people looking in the wrong place |

### 15.2 Hand-drawn elements that already exist in the DS — swapped

| Where | Was | Now |
|---|---|---|
| `Thread row` | QUESTION · ANSWERED · FOLLOWING chips | `Badge` · Pill color · sm |
| `Message` | avatar, STAFF, ACCEPTED ANSWER | `Avatar` (Text) + `Badge` |
| `Sidebar card` | mentor avatar | `Avatar` · md |
| `Grade meter` | "Passing 70%" chip | `Tooltip` · Arrow Top center, exposed so the value stays editable per instance |
| `Date row` | type, assignment type and status chips | `Badge` — Gray, Success for Complete, Error for Overdue |
| Q&A screen | All · Unanswered · Following | `Button group`, All current |
| Q&A screen | Ask a question · Following · ··· · Send | `Buttons/Button` — Secondary, Secondary, Tertiary icon-only, Primary |
| Q&A screen | question search · reply field | `Input field` — Search · Default |

**Two things had to be carried across, not just replaced.** Seven `Date row` instances carried their own text
(`COURSE-END-DATE`, `FINAL EXAM`…); swapping a chip inside the main component throws those overrides away, so
they were saved per instance and put back. And four Q&A controls carried annotations, moved onto the new
instances — the screen still has 21, the Course tab still 36.

### 15.3 What the swap surfaced

⚠︎ **`Badge` `Color=Brand` is Untitled UI purple, in the library itself.** It is bound to
`Component colors (Remove)/Utility/Brand/*` — one of the 150 `Utility` tokens with no SKO destination. Not a
publishing lag. Our brand chips use `Gray` until that is ruled on. Logged as library request 7.

⚠︎ **`Progress bar` only has variants in steps of 10%.** A 15% or 38% bar is not a variant; worth knowing
before Grades adopts anything built on it.

✓ **Fixed 15 Sep — the tab labels did not share a baseline across the technical screens.** The cause was not
padding. Course tab and the `★ ENTRY` screen were on the current `_Tab button base` (48px, 12/12 padding);
Progress, Dates and Q&A were still on the earlier version (36px, 0/12), stretched to 48 by hand-set overrides —
so the label sat at 12px, 6px or 0px from the top depending on the tab, and the Dates bar was 36px tall.
The three stale bars were swapped to the current version with each screen's labels and current tab kept.
All four technical screens now place the bar at the same y with the label at 12px. `★ ENTRY` sits 4px lower
because its search field is 60px tall, not 56 — outside the technical section and left alone.

⚠︎ **`Date row` still shows the raw `date_type` literal as a chip** — the same defect §14.2b records against the
live tab. If the chip is there to document the field, the literal belongs in the annotation.

**Kept as history:** the first Dates tab is renamed `BK · ⚙ TECHNICAL · Dates tab — histórico` and stays in the
section beside its replacement, `6207:257718`.

---

### 15.4 Two ideas taken back from the v8 screens

The v8 Brand section (`6207:245583`) was reviewed for patterns worth carrying into the technical screens, each
checked against what edX returns. Two are adopted now; the rest wait for a decision item by item.

**Module number, then a check.** A module shows its **position number** until it is complete, and a check only
then — as v8 did. New local component `LMS / Course Detail / Module number` (`5834:1527`): `Complete` (check),
`Incomplete` (number on the brand tint), `Locked` (muted number — the lock stays on the right of the row, where the *Unlocks* tooltip anchors). The lock on the right is `LMS / Completion Status` · `Locked` at 32px and exists **only in the two `Locked` variants**; the *Unlocks* tooltip is part of the component (`Show Unlock Date Tooltip`), so the loose tooltips on the screens are gone, with a `Number` text property. It replaces
`LMS / Completion Status` inside all six `Module row` variants and is exposed, so each instance carries its own
number. The DS has no equivalent — `LMS / Numbered Step` is for ordered instructions — so it goes to peer review.
The check uses the same tokens as `Completion Status`, so the module check and the topic checks below it are the
same green. The number is the section's **position in the outline**; titles like *"Module 1 · …"* repeat it,
and real `display_name`s (*"Module 5:  SQL Advanced Topics"*) will too.

**Certificate in progress, with what is missing.** `Certificate card` · `Not earned` now lists two rows, each
with `LMS / Completion Status` and a text property: **Reach the passing grade** — *15% now · 70% needed* — and
**Complete the course content** — *16 of 42 topics · 38%*. Annotated once, on the Course tab.

⚠︎ **Only the grade is an edX requirement.** `cert_status` stays `notpassing` until the grade passes; completion
is not checked by the platform. The content row repeats the card's earlier copy (*"finish all four modules"*) —
confirm it is a SkillUp rule before it ships, or drop it.

✓ **Two contradictions on the screens — fixed 16 Sep.**

- **38%, everywhere.** The progress card said 25% and the completion ring said 25% over an arc drawn at 67%,
  while the counts beside them — *16 of 42 topics* — are 38%, which is what the card's own annotation derives
  from `completion_summary`. The four technical headers and `★ ENTRY` now say 38% (the `Progress bar` sits at
  40%, its nearest 10% step); the ring says 38% and its arc is overridden to 38%. The ring text is still an
  override, not bound to the card's `Percent` property.
- **"Currently passing" beside 15% against 70%.** `Progress card` gains a `Not passing` state — warning dot and
  text tokens, `Show not passing` and `Not passing label` — alongside the passing one, which stays for when
  `user_has_passing_grade` is true. The screens show *Not passing yet · 15% of 70%*, matching the Progress
  tab alert, the grade badge and the certificate card. The BK Dates screen is left as it was.

## 16. The issued certificate — the document itself, for print and digital

The `Certificate card` on Course Detail says *whether* a certificate exists. Nothing in the file showed **what
it is** — the only certificate drawn was the in-app screen on the Phase 3 page (`LMS / Course Certificate`),
with a green header, stats and buttons. That is a web page, not a document anyone would print or file.

### 16.1 What was built

| Node | What |
|---|---|
| `LMS / Course Detail / Certificate document` (`5774:1195`) | The certificate. **A4 landscape, 297 × 210 mm, 1123 × 794 at 96 dpi.** Local component, discovery — not in the DS |
| `Certificate — digital & print mockup` (`5780:1077`) | Board: two printed sheets on a surface, and the same document in a viewer with Share and Download |
| `Certificate card` · `Status=Issued` (`5425:533`) | Now carries a thumbnail of the document rather than of the app screen |

**One layout for both uses.** White edge and no bleed, so it prints on an office printer without trimming; all
content inside a 10 mm safe area, marked by the brand rule. Everything on it is from the library: the
`Skillup_logo` and `Placeholder Logo / IBM` components, Montserrat text styles, SKO colour tokens — including
the QR, rebuilt so that no module is a raw hex — and the `shadow-2xl` / `Elevation/level4` (was `shadow-lg`) effect styles on the board.

### 16.2 Every element, and where it comes from

| Element | Source | Verdict |
|---|---|---|
| Learner name | the user's profile name | ✅ |
| Course name | `course_display_name` (Certificates API) | ✅ |
| Certificate type — *professional course* | `certificate_type`: `honor` · `verified` · `professional` | ✅ — the copy has to follow the value, not be fixed |
| Issue date | `created_date` | ✅ |
| Course meta — modules, topics, hours, pacing | Blocks API counts, Courses API `effort` and `pacing` — §12.1, §12.2 | ⚠︎ — same gaps as the hero: `effort` is authored or absent |
| Signatories — name, title, organisation, signature image | Studio → Certificates configuration, per course | ✅ exists on the platform, **but the two on the mockup are invented** |
| SkillUp logo | platform branding | ✅ |
| Partner logo — *In partnership with IBM* | **no source** | ✗ — the open *Partner brand* question in §11: `org` returns `"SkillUp"`. Co-branding cannot be printed until that is answered |
| Verification URL and QR | `/certificates/{verify_uuid}` | ✅ the pattern is real; the URL on the mockup is illustrative |
| Certificate ID | `verify_uuid`, or a SkillUp-formatted ID mapped to it | ⚠︎ — `SKL-SIXSIGMA-2609-7F3K` is invented. Needs a decision on whether learners see the UUID or a readable ID |
| Grade | `grade` is returned | deliberately **not printed** — a certificate of completion states completion |

### 16.3 A correction to the design: there is no PDF

⚠︎ **Open edX does not generate PDF certificates.** The platform's own decision record says PDF generation
has not been supported for some time and that only web (HTML) certificates are generated; a learner opens
the certificate at `/certificates/{verify_uuid}` and shares or prints it from the browser. The
`download_url` field on the Certificates API survives from the PDF era.

What that does to the design:

- **The certificate is a web page designed to print.** The A4 document is still the right artefact — but it has
  to be specified as the HTML certificate template plus a print stylesheet, not as a file the platform emits.
- **`Download` on the certificate card and `Download PDF` on the board are not free.** Either the button opens
  the web certificate and the browser's print-to-PDF does the rest, or the vendor builds PDF rendering. The
  first costs nothing and should be the default until someone asks for the second.
- **Verification is the web page itself**, which is why the QR and URL are on the document: a printed copy
  points back to the live record.

### 16.4 Questions this adds

**To the vendor (Nilesh / Rashid)**

1. Is our certificate the stock Open edX web certificate template, or has SkillUp already customised it? The
   A4 layout is specified against the template, so this decides how much of it is new.
2. Is a real PDF wanted anywhere — LinkedIn, employer uploads — or is print-to-PDF from the web certificate
   enough? The card's `Download` button depends on the answer.
3. What does the verification URL look like on `devcourses.skillup.online`, and is it public without a login?

**To product**

4. **Who signs.** One SkillUp signatory, a partner signatory, or both — and does that vary by course?
5. **Partner co-branding** — the §11 question, now with a second place it appears.
6. **Readable ID or UUID** on the printed certificate.

---

## 17. Weekly goal — the standard, taken from edX itself

No brief and no PR yet. So the design starts from what the platform already does, checked against what comparable
platforms show, and is honest about the one thing the API cannot give.

### 17.1 It is a native Open edX feature

**Weekly Learning Goals** is built into the learning MFE: a widget on the course home. The copy below is the
platform's own.

| Element | edX | Field |
|---|---|---|
| Header | *Set a weekly learning goal* · *Setting a goal motivates you to finish the course. You can always change it later.* | — |
| **Three goals** | **Casual** 1 day · **Regular** 3 days · **Intense** 5 days a week | ✓ `course_goals.selected_goal.days_per_week` |
| **Reminders** | *If we notice you're not quite at your goal, we'll send you an email reminder.* | ✓ `subscribed_to_reminders` — **off and disabled until a goal is picked**, then switched on by the first pick |
| Edit | *Edit goal* | ✓ POST `/api/course_home/v1/save_course_goal` |
| **Celebration** | modal in courseware — *You met your goal!* · *Take a moment to celebrate and share your progress.* | ✓ `celebrations.weekly_goal`, a boolean |
| Feature switch | — | ✓ `weekly_learning_goal_enabled` |

**Reminder emails** go out in the learner's morning, only while enough days remain to meet the goal, and never to
learners holding a downloadable certificate or whose audit access ends that week.

⚠︎ **Switched off on every SkillUp course we have seen.** Turning it on is vendor work: the waffle flag
`course_experience.enable_course_goals`, the goal-reminder management command on a schedule (edx.org runs it every
3 hours), and an email channel in edx-ace. It works only in the learning MFE.

### 17.2 What edX does not give

**The days a learner was active this week.** The platform records activity server-side — it is how it decides
when to email and when to celebrate — but no API returns it. `celebrations.weekly_goal` says the goal was met, not
how; `streak_length_to_celebrate` exists only at the moment a streak is celebrated. No time-based goal either: edX
does not measure minutes.

That is exactly what the usual pattern adds. Coursera sets a weekly goal in days and shows the week as a row of
day markers; our own v8 dashboard drew a streak the same way. **Vendor request: days active this week, per course.**

### 17.3 What was built

| Node | What |
|---|---|
| `LMS / Course Detail / Weekly goal card` (`5852:1666`) | `Not set` · `Set` · `Met`, plus `Show week strip` (off by default). Built from DS `Radio group item`, `Toggle`, `Buttons/Button` (link) and `LMS / Completion Status`; the card shell matches the other sidebar cards |
| `LMS / Course Detail / Week day` (`5848:139230`) | `Done` · `Today` · `Missed` · `Upcoming`, with a `Day` text property. **Missed is neutral on purpose** — a quiet day is not an error |
| Board `Weekly goal — states and what edX gives us` (`6207:257749`) | In the technical section: Not set, Set, Met, the two week-strip variants, and **Off — not rendered**. One annotation per state |

The course sidebar on the Course tab, Progress tab and `★ ENTRY` now uses the card in `Set`, without the strip —
the buildable version. The two old annotations (Course tab and Progress tab) said much the same thing; they are
one annotation now, on the Course tab, pointing at the board.

Both components are local and go to peer review: the DS has no goal card and no day marker.

**Met shows the week, 16 Sep.** A goal met is now visible, not only stated: the `Met` variant always carries the
week — a check for each day the learner was active in the course, on a `bg/success-soft` panel, with
*3 of 3 days this week* in `text/success`. The strip is no longer switched by `Show week strip` in that
variant (the property still controls `Set`), so the board's separate "Met, with the week" column is gone.
It depends on the same vendor request as the strip in §17.2. **Fallback** if the vendor cannot provide days active:
the card still knows the goal was met from `celebrations.weekly_goal` — drop the week panel and keep the header and
the line below it.

### 17.4 Edge cases — read from the edX code

*Corrected 16 Sep, from the source rather than the message catalogue:* the weekly goal card has **no "Not sure
yet"** — that string belongs to the older course-goals feature — and its reminder toggle is **disabled until a goal
is picked**. Both were wrong on the first board and in §17.1; both are fixed.

Sources: `WeeklyLearningGoalCard.jsx` in the learning MFE, the course home outline view, and the
`goal_reminder_email` management command in edx-platform.

**What the code settles**

- **Picking a goal saves immediately.** The edX card has no collapsed state and no Save; our collapsed *Set* with
  *Edit goal* is a sidebar decision, and *Editing* is the card opened back up.
- **The card exists only for enrolled learners**, and only where `ENABLE_COURSE_GOALS` is on **for that course**.
- **There is no end-date check.** The card keeps rendering after the course ends — an open product decision.
- **A week is Monday to Sunday in the learner's timezone**, falling back to last-seen timezone, then UTC. With
  `user_timezone` null in every sample (§11), a learner in India would see the week roll over at 05:30 Monday.
- **The reminder email** goes once a week, 08:00–18:00 local, only when the days still needed are at least the
  days left — and **never** to learners who enrolled this week, hold a downloadable certificate, or whose audit
  access expires this week.
- **Staff masquerading** can click the goals, but nothing is saved.
- **Emails deep-link** with `?weekly_goal=1|3|5`, which saves that goal on arrival; the unsubscribe link goes to a
  separate MFE page.
- **A failed save shows nothing.**

**What was built.** Five new variants on `Weekly goal card` — `Editing`, `At risk`, `Out of reach`, `Save failed`,
`Loading` — plus a `Show note` / `Note` pair on every variant, and a `Today done` state on `Week day`. The board
gains an **Edge cases** section, E1–E13, each annotated with its source:

| # | Case | edX | Ours |
|---|---|---|---|
| E1 | Editing | saves on select | the collapsed state around it |
| E2 | At risk | the email's own condition | the calm version on screen — needs days active |
| E3 | Out of reach | stops emailing, says nothing | *a new week starts on Monday* |
| E4 | Goal exceeded | celebrates once | every active day, with the goal beside it |
| E5 | A new week | Monday, learner timezone | the UTC fallback flagged |
| E6 | Reminders off | ✓ + unsubscribe page | — |
| E7 | Reminders paused | skips certificate holders, new and expiring enrolments | one line so the toggle does not lie |
| E8 | Viewing as a learner | silently does not save | say so |
| E9 | Save failed | shows nothing | keep the old goal, *Try again* |
| E10 | Loading | outline call | skeleton |
| E11 | Opened from the email | saves the linked goal | confirm it in one line |
| E12 | Not enrolled | not rendered ✓ verified | — |
| E13 | Course ended | **still rendered** | decision needed — product |

E2, E3 and E4, like the week strip, depend on the vendor request in §17.2.

### 17.5 One anatomy for every state

All eight variants now share the same order, so the card never rearranges itself between states:

1. **Label** — *Weekly goal*
2. **Header** — status icon (shown only on `Met`) and a title that states the situation: *Set a weekly learning
   goal* · *Your weekly goal* · *You met your goal this week* · *Two days to go this week* · *Not this week*
3. **Body** — one sentence
4. **Content** — the three levels (`Not set`, `Editing`) or the week strip
5. **Error** — `Save failed` only
6. **Reminders** — **only in the goal settings** (`Not set`, `Editing`). They are a setting, not a status, so they do not sit on the card the rest of the time; *Edit goal* is how a learner reaches them. Board cases E6 and E7 moved to `Editing` accordingly
7. **Note** — bound to `Show note` / `Note` on every variant (four variants had lost the binding when cloned)
8. **Edit** — the goal on the left, the action on the right: *Edit goal* · *Try again* · *Done*

`Loading` draws the same eight rows as grey bars. The goal moved out of the title into the Edit row, so it is in
the same place in every state.

✓ **Decided 16 Sep — as edX: picking a level saves.** The action in the goal settings is **Done**, in the same
link style as *Edit goal* and *Try again*: it only closes the settings, there is nothing left to save. On `Not set`
it stays disabled until a level is picked.

### 17.6 What counts as an active day — precise

A `UserActivity` row: **one per learner, course and date**, written when the learner **opens courseware** (the
courseware metadata call, and the xblock view from the mobile app). **A visit, not a completion** — opening a unit
counts; finishing a topic is not required. Staff masquerading never count. The date is the learner's local date.

⚠︎ **Rows are only written while `ENABLE_COURSE_GOALS` is on for that course.** On SkillUp today there is no
activity history to show — not this week's, not any week's. It starts the day the flag is switched on.

**Precisely what records a day — 18 Sep, read from each call site.** One row per learner, course and day, in the
learner's timezone (last-seen timezone, then UTC); Monday–Sunday; staff masquerading excluded.

| Learner does | Web | Mobile app |
|---|---|---|
| Opens a lesson in courseware — any type | ✓ counts (`courseware_api` metadata call) | ✓ counts (xblock view) |
| Finishes it — watches, reads, answers | not required | not required |
| Signs in | ✗ | ✗ |
| Opens Course Detail or Progress | ✗ (no call in the outline or progress views) | — |
| Opens Dates | ✗ | ✓ (`only_if_mobile_app`) |
| Opens discussions (Q&A) | ✗ | ✓ (`only_if_mobile_app`) |
| Attends a live session | ✗ unless they open course content | ✗ |

**It measures presence, not progress** — opening a video and leaving counts. The card copy is corrected from *Any
activity in this course counts towards the day* to **A day counts when you open any lesson in this course.**
⚠︎ **Web and mobile disagree** on Dates and Q&A — vendor question. ⚠︎ *A day with a completed topic* would be a
separate backend rule.

In Figma: the table is on the board **Weekly goal — what counts as a day** (`6207:257855`), beside the states board,
and the same table is an annotation on the Course tab's weekly goal card.

### 17.7 Last week — a comparison, not a view

*Revised 17 Sep.* A separate *Last week* variant, navigated to from the week header, was drawn and then replaced:
last week is only a **reference point for the week that has started**.

Every state with the strip now shows it beside this week's count — **3 of 3 days this week** on the left,
**Last week: 2 of 3** on the right, in `body-small/Medium` `text/subtle`, switched by `Show last week` (on by
default). The week header keeps only the range, *This week · 15–21 Sep*. The `Last week` variant, the *Last week* /
*This week* links, board column 5 and edge case E14 are removed; the annotation moved to *Set, with the week*.

**What the data allows**

- ✗ **Vendor data, but no extra work beyond the current week** — the same `UserActivity` rows for the previous
  Monday–Sunday in the learner's timezone.
- ✓ **Read against the goal that applied then.** `CourseGoal` keeps its history (`HistoricalRecords` in
  `course_goals/models.py`), so moving from Regular to Intense today does not change last week's figure. This
  settles the open question in §17.6.
- ⚠︎ **Empty until `ENABLE_COURSE_GOALS` is on for the course.** In the first week after switching it on there is no
  last week — hide the line.

---

## 18. The level chip — Beginner · Intermediate · Advanced

*17 Sep.* The hero chip beside *Self-paced* read **Professional**, from `enrollment_mode`. It now reads the **course
level**, which is what SkillUp actually shows learners.

**`enrollment_mode` was the wrong field for this.** It is the **learner's enrolment track** — `audit`, `verified`,
`honor`, `professional`, `no-id-professional`, `credit`, `masters` and the executive-education and bootcamp modes in
`course_modes/models.py`. *Professional* looks like a level and is not one; it would also differ between two
learners on the same course.

**The wording is SkillUp's own:** **Beginner · Intermediate · Advanced**. The public site filters its catalogue by
level and labels course pages *"Intermediate Level"*. **Not "Medium"** — keep the site's word, or the two will
disagree for the same course.

**Where the value comes from.** ◑ No LMS API has it: neither the Courses API nor the Course Home APIs carry a
difficulty field, and `CourseOverview` has none. Open edX keeps level in the **Discovery service**
(`course-discovery`): `Course.level_type` → `LevelType`, a **free-text, translatable name with a sort order**, so
the three SkillUp labels can be configured exactly (edX.org uses *Introductory / Intermediate / Advanced*).

**Vendor question:** is course-discovery deployed for SkillUp with `level_type` filled in — or does the level live
only in the marketing site's CMS? If the latter, the LMS needs it synced or duplicated before the chip can be built.

**In Figma:** the layer inside `LMS / Course Detail / Course title` is renamed `Chip · level`, its default text is
*Beginner* on all five screens, and the annotation on it is rewritten.

### 18.1 Both chips are DS components now — level and delivery mode

The hero's two generic `Badge` pills are replaced, inside `LMS / Course Detail / Course title`, by the library's own:

| Layer | Component | Values |
|---|---|---|
| `Chip · delivery mode` | `LMS / Delivery Mode Badge` | **Self-Paced → *Flexible Learning*** for this phase. VILT → *Live Sessions* and Blended → *Flexible + Live Sessions* exist for later phases |
| `Chip · level` | `LMS / Difficulty Badge` | *Beginner · Intermediate · Advanced* |

The labels come from the *Courses Type* variable collection in the project file. Both components already existed —
the ask was to create them — so per the exists-in-SKO rule they are adopted, not duplicated. Their style is an icon
and a label rather than a pill.

**Delivery mode.** ✓ For this phase it is one field: `is_self_paced` (`course_metadata`) or `pacing: "self"` (Courses API). VILT and Blended would need more — VILT shows only indirectly through `course_live` and Zoom recordings (§12.3), and Blended has no marker — but both are out of this phase.

**Four gaps, library request 9:** *Flexible + Live* on the badge against *Flexible + Live Sessions* in the variable;
variants named by label instead of mode; a loading spinner as the Beginner icon; no descriptions.

### 18.2 This phase delivers a Self-Paced course — and what that changes

*17 Sep.* The chip briefly read *Flexible + Live Classes* (the site's Blended wording). The course this phase
delivers is **Self-Paced**, so the chip reads **Flexible Learning**, to avoid telling devs and stakeholders the
wrong thing. The sample courses in the workbook are instructor-paced (§1, point 5); they are not the course being built.

**What self-paced means on the Course Detail screens** — from the Open edX course-pacing documentation and
`edx-platform`:

| Where | Instructor-paced (the samples) | **Self-paced (this phase)** |
|---|---|---|
| **Module locks** | release dates can lock a module until a date | **no release dates** — everything opens at course start. A lock can only come from a **prerequisite** (§18.3). The Course tab now shows that lock |
| **Due dates** | fixed, the same for every learner | **personal** — Personalised Learning Schedule, counted from each learner's enrolment (default even spread, or *N weeks after enrolment*). No date on the Dates tab can be fixed copy |
| **Missed deadlines** | missed | **can be shifted** — `reset_course_deadlines` moves the learner's schedule to start today. Decide whether SkillUp exposes *Shift due dates* on the banner |
| **Certificate** | may wait for the end or a `certificate_available_date` | **visible as soon as generated** — `should_certificate_be_visible()` returns true for any self-paced course. `generating` still applies |
| **Tabs** | — | Course · Progress · Dates · Mentorship Q&A, plus Instructor for staff (§1, point 1); Live and Recordings are VILT only |

Annotations updated in Figma: the delivery mode chip, the unlock tooltip, the certificate card, and the Dates
timeline and missed-deadlines banner.

*17 Sep:* the two chip annotations moved **off the `Course title` component and onto the `⚙ TECHNICAL · Course tab`
screen**, where the rest of the technical notes live — one copy, on the Course tab only, as with the header and the
tab bar. The Course tab holds 39 annotations.

### 18.3 Two reasons a module is locked — Date and Prerequisite

`LMS / Course Detail / Module row` gains a variant property **`Lock reason`**: `None` · `Date` · `Prerequisite`.
The two `Locked` variants are `Date`; two new `Locked` variants are `Prerequisite`, identical except for the tooltip.
`Show Unlock Date Tooltip` is renamed **`Show unlock tooltip`**, since it now serves both.

| Lock reason | When it can happen | Tooltip |
|---|---|---|
| **Date** | **instructor-paced only** — a release date on the content | *Unlocks 28 Apr 2026* — and even then ✗, no Course Home endpoint returns the date |
| **Prerequisite** | **self-paced and instructor-paced** — this phase | *Complete “Module 3 · Checkpoint” to unlock* |

The Course tab and `★ ENTRY` now show Module 4 locked by **Prerequisite**; the *Integration proof* board keeps `Date`.

> **Superseded 24 Sep — atomic.** The reason only ever changed the tooltip's text, so it is no longer a variant.
> `Module row` goes from **8 variants to 6** — `State` (Complete · Incomplete · Locked) × `Expanded`. A locked
> module **can be expanded** (Nelson, 24 Sep): the learner sees what it holds before it opens, each topic as
> `Topic row` State=Locked. `Lock reason`, `Show unlock tooltip` and
> `Show Locked Module` are gone. The lock and its tooltip are a new molecule, **`LMS / Course Detail / Lock`**
> (`6118:10300`): the DS `LMS / Completion Status · Locked` + the DS `Tooltip`, with `Show tooltip` and the Tooltip
> exposed, so the reason is set as **copy** on the instance (the table above is its guide). The Locked variant holds
> it as an exposed nested instance. Course tab and `★ ENTRY` Module 4 show the prerequisite tooltip again; the
> *Integration proof* board's Date instance moved to the one Locked variant, tooltip off. The Module 4 annotation
> that said the tooltip "cannot be produced" now points at `gated_content.prereq_section_name`.
>
> **Same molecule on the topic (24 Sep).** `Lock` is now a set with **`Size`**: `md` (32) for the Module row, tooltip
> below and centred; `sm` (18) for **`Topic row` State=Locked**, which swaps its status icon for it. In `sm` the DS
> Tooltip uses `Arrow=Bottom left`, above the lock and anchored left, so it grows away from the lock and still
> points at it at any text length (the DS has no *Top left*). A topic inside a locked module carries the module's
> reason; a topic gated on its own takes its subsection's `prereq_section_name`. No screen shows a locked topic yet.

**What edX returns for a prerequisite** — read from `seq_block.py` and `openedx/core/lib/gating/api.py`:

- ✓ **That it is locked** — the outline marks the block `accessible: false`, or `type: "lock"` when
  `enable_prerequisite_block_type` is on. A boolean only.
- ✓ **What to finish** — `gated_content` on the **sequence metadata** call (`/api/courseware/sequence/{usage_key}`):
  `gated`, `prereq_section_name`, `prereq_url` (a `jump_to` link) and `prereq_id`. The tooltip copy is
  `prereq_section_name`.
- ⚠︎ **Prerequisites are on subsections, not modules.** Studio sets them per subsection (*Access* → prerequisite, with
  a minimum score and minimum completion). *Module 4 is locked* summarises its gated subsections.
- ⚠︎ **The reason is not on the course page.** It comes per subsection, one call each, only when that sequence is
  requested. Vendor question: add the prerequisite name to the outline.
- ⚠︎ **The thresholds are not returned** — `min_score` and `min_completion` stay server-side, so the tooltip cannot say
  *with at least 70%*.

The longer tooltip is centred on the lock and runs past the right edge of the module card; on the full screen it
may reach the sidebar gutter.

---

## 19. The course header is one component, with a Program variant

*17 Sep.* The Course tab's hero was rebuilt by hand — the content row became a **horizontal auto-layout with the
progress card in flow**, instead of a grid with the card absolutely positioned, and the wrapper was renamed
*Header Container* — so the four other screens were still on the old layout.

**`LMS / Course Detail / Course header`** (`5914:7211`) now holds it, with two variants:

| Variant | For | What differs today |
|---|---|---|
| `Type=Course` | the Course Detail screens | — |
| `Type=Program` | the programme page, later | breadcrumb *Programs*, `LMS / Course Type Badge` on `Program`, the title, and stats reading *6 courses · 1 capstone* |

The Program variant is a **placeholder** on purpose: the two will diverge (a programme has courses and a capstone,
not modules and topics), and having the axis now means the divergence has somewhere to go.

**Applied to all five screens** — Course tab, Progress, Dates, Mentorship Q&A and `★ ENTRY` — each header is an
instance, so the next hero change reaches them all.

**Annotations stayed on the Course tab only**, reapplied onto the instance's own layers: breadcrumb, partner chip,
course title, the two chips (§18.1), course stats and the progress card — nine in total.

⚠︎ *One annotation was dropped on purpose:* the partner-chip note existed **twice**, once on each of the two partner
chips. It is now on one.

---

## 20. Course team — instructors and authors, and a way to ask them

*18 Sep.* Show the course's instructors and team **when they exist**, and give each a quick way into Mentorship Q&A.

### 20.1 Where the names come from

- ✗ **Not on the LMS APIs.** The Courses API has no instructor, author or staff field — checked live on the three
  SkillUp course keys in this document — and `overview` names no one ("your instructor", "our mentoring service").
  The Course Home APIs have none either. **skillup.online course pages name no instructors today.**
- ◑ **Open edX keeps people in the Discovery service.** `CourseRun.staff` → `Person`: `given_name`, `family_name`,
  `profile_image`, `bio`, and `Position` (`title`, `organization`), in the order the course team sets. That is the
  card as drawn — avatar, name, *role · organisation*. Whether course-discovery is deployed for SkillUp is unknown
  (§18); **vendor question.**
- **Not the same thing, and not used:** Studio's course-team roles (`instructor`, `staff`) are permissions and
  include admins and TAs, with no learner API; **certificate signatories** (§16) sign, and need not have authored
  anything; the **mentor** is a SkillUp service, not authorship.

### 20.2 Where it goes

**`Sidebar card` · `Type=Team`** — *Course team*, on the Course tab sidebar directly below the Mentor, on the
technical Course tab and `★ ENTRY`. One row per person, using the DS **`Avatar label group`** with initials (the
same treatment as the mentor; a shared placeholder photo made three people look like one). **Hidden when the list is
empty** — no heading over nothing. The DS already has a byline pattern for topic pages,
`LMS / Topic · Author & Updated Date`; a byline in the course header remains an option if one lead author matters
more than the team.

### 20.3 One button — *Ask the course team*

*Revised 18 Sep.* A button beside each name was drawn first and then replaced by **one button under the list,
*Ask the course team*** (Secondary, `message-chat-circle`), because a per-person button promises a private message the
platform cannot deliver. It opens the Mentorship Q&A composer with a new **question** started.

- ✓ `POST /api/discussion/v1/threads/` with `type: "question"`; staff replies come back marked (`author_label`);
  accepted answers are native (`endorsed_by`).
- ✗ **A forum thread has no recipient.** The question is visible to the course (or the cohort, with divided
  discussions — §14.3) and **any** staff member can answer; no one is notified as a person.

A per-person action becomes possible only with **Route B** (a SkillUp messaging service, §14.3) or a vendor change
that notifies a named staff member. The Mentor card's *Message David* has the same limit and is untouched here.

**18 Sep — why the course image is a small thumbnail.** The header's `Image Thumb` is fixed at **84 × 84** on
purpose. On the marketing pages the image is large because it persuades someone to enrol; by the time a learner
reaches Course Detail that job is done, and this is a page they return to daily. A large image would take the first
screen from progress, *Resume*, what is due and the syllabus. It stays small to identify the course at a glance
(learners enrolled in several) and keep the brand present. Source ✓ `course_image_urls.small` (or the Courses API
`media.image`), prefixed with the LMS host; the platform serves a placeholder when a course has none. Annotated on
the technical Course tab.

---

## 21. The mentor journey — Message first; a call only if decision 007 changes

*18 Sep.* Flow drawn in FigJam: **[Mentor 1:1 journey — Course Detail](https://www.figma.com/board/k0TNtf4M6Lxv7yI0u8DZQK)**.

**The question was:** does *Message [mentor]* go to a HubSpot calendar to book a call, or to a 1:1 chat in
Mentorship Q&A? **Answer: they are two jobs.** An async message covers the frequent case (*"I'm stuck on this"*)
and is what the card already promises — *Unlimited 1:1 messaging… typically responds within 1 day*. A call covers
the rare, heavier case. A calendar behind *Message* would turn a two-minute question into a meeting.

⚠︎ **Decision 007 (accepted) already settles most of it:** *"mentoring is unlimited 1:1 asynchronous messaging, not
booked sessions"*, and an earlier *Book session* button was removed as wrong. So:

| Action | Where it goes | Status |
|---|---|---|
| **Ask your mentor** — primary | **Mentorship Q&A**, a private 1:1 conversation once Route A/B exists; a normal Q&A question until then | per 007 |
| **Book a call** — `Show book a call` on the Mentor card, **off by default** | **HubSpot Meetings**, this mentor's calendar, prefilled with the learner's name and email; the booking lives in the HubSpot CRM, not the LMS | **contradicts 007** — ready only if product revisits it |

**What the Message path needs**

- ✗ **The learner → mentor assignment** (open question 1). Without it neither the Q&A nor HubSpot knows whose
  conversation or calendar to open. **The first blocker.**
- **A private channel** (open question 5, §14.3): **Route A**, divided discussions with a cohort of one — ⚠︎ **must be
  configured before the course start date**, so for this phase's course it is still possible only if decided now; it
  divides every topic, and the mentor needs moderator scope. Or **Route B**, a SkillUp messaging service.
- **Fallback at launch:** the button reads *Ask your mentor* and opens a normal Q&A question — the same honesty as
  *Ask the course team* (§20.3).

**Questions for product:** is a call part of the offer at all (007 says no), and for whom — every learner or a
tier; do mentors have HubSpot calendars; Route A or Route B, decided before the course starts.

**In Figma:** the Mentor card variant has an *Actions* row — *Message David* (layer renamed *Message mentor*) and
*Book a call*, the second bound to `Show book a call` (off).

*18 Sep:* the primary button reads **Ask your mentor** (was *Message David*). Until a private route is live it opens a
normal Q&A question any staff member can answer, so it should not promise a message to a named person; once Route A
or B exists, the label can name the mentor again. The Course tab mentor annotation gains the journey
note; the two existing ones (no field behind it; decision 007) stay.

**18 Sep — the certificate requirements use `LMS / Overall Progress` (Device=Mobile).** The two rows on
`Certificate card` · `Not earned` were on `Completion Status · In Progress`, a variant since **removed from the DS**
(`Completion Status` is now `Done · Pending · Locked`). A first swap to `Pending` was replaced by the DS progress
component: each requirement now shows a **46 px ring with its percentage** — **15%** for the grade, **38%** for
content — the arc overridden to the same value, as on the Completion card's ring. `Device=Desktop` and
`Desktop-OLD` are 413 px bars and do not fit a 288 px card. Ring text and arc are overrides, not bound to the
`Grade progress` / `Content progress` properties, so a new value has to be set in both. No other `In Progress`
instance remains in the Course Detail work.

**19 Sep — the certificate card, as refined in Figma.** Three changes to `LMS / Course Detail / Certificate card`,
made directly in the file and recorded here:

- **`Not earned` — requirements are bars, not rings.** Each requirement row now reads label → detail → a DS
  **`Progress bar`** (`Label=False`) at full width, replacing the `Overall Progress` rings. The bars sit on the DS
  10 % steps: **10 %** for the grade (15 %) and **40 %** for content (38 %) — the same limit recorded for Grades in
  §15.1b; the detail line carries the exact figure. The title reads **"Not earned yet, keep on track!"**.
- **`Generating` — a preview skeleton.** While the certificate is being generated in batches, the card shows a grey
  **skeleton of the certificate** in the preview slot, so the Issued state that follows does not jump. Its layers are named
  after the certificate document they stand in for — *Logos* (*SkillUp logo*, *Partner logo*), *Learner name*,
  *Course and signatures*, *Verification* (*Certificate ID*, *QR and link*) — renamed 19 Sep from the weekly goal
  skeleton they were copied from.
- `Issued` and `Run closed` are unchanged. The card is used on the Course tab, Progress tab and `★ ENTRY`, all in
  `Not earned`.

---

## 22. Upcoming dates and Course tools — from a line each to what is next

*19 Sep.* Both sidebar cards read as placeholders: one date, one link. Redesigned inside `Sidebar card`
(`Type=Dates`, `Type=Tools`); the `LMS / Footnote` dev notes are kept and rewritten.

### Upcoming dates

**What the outline gives:** `dates_widget` — `course_date_blocks[]`, `dates_tab_link`, `user_timezone`. Read in
`course_home_api/outline/views.py`: the widget is built with `get_course_date_blocks(…, num_assignments=1)` — **the
course dates plus only the next assignment**. So the card shows *what is next*, not the list; *All dates* opens the
Dates tab.

**Now:** one row per date — a **date tile** (day, month), title, a meta line (date type in human copy, time in the
learner's timezone) and a **relative badge** (DS `Badge`: Warning within a week, Gray otherwise) — then *All dates →*.
Drawn with *Module 3 · Checkpoint* (in 3 days) and *Course ends* (in 8 days).

Self-paced: the assignment row is a **personal** due date (§18.2). The relative badge is computed by us from `date`.
With only the end date (the sample course) the card shows one row; with no dates, it is hidden.

### Course tools

**What the outline gives:** `course_tools[]`, each `{analytics_id, title, url}` — a plugin list. Open edX ships four,
read from the `openedx.course_tool` entry points:

| Tool | `analytics_id` | Shown when |
|---|---|---|
| Bookmarks | `edx.bookmarks` | always, for enrolled learners |
| Updates | `edx.updates` | the course has updates |
| Subscribe to calendar updates | `edx.calendar-sync` | relative dates are on — **self-paced**; flips to *Unsubscribe…* |
| Financial Assistance | `edx.tool.financial_assistance` | the site enables it |

**Now:** one row per tool — icon tile (mapped from `analytics_id`), title, a one-line description, chevron. Drawn with
Bookmarks, Updates and Calendar sync. The live response carried Bookmarks only.

◑ *4 saved lessons* needs the **Bookmarks API**, a second call; the tool returns no count. The descriptions are ours.

Annotations on the Course tab rewritten for both cards (dates: 2, tools: 1).

**Documented on the component, not only on the screen.** Every `Sidebar card` variant — Mentor, Handouts, Dates,
Tools, Team — now carries its technical notes in the **variant description**, copied from the Course tab annotations,
so they survive if a screen is rebuilt. Descriptions rather than annotations on the main component on purpose:
component annotations appear on **every instance**, which would put them back on `★ ENTRY` (kept annotation-free) and
double them on the Course tab — the reason the chip annotations were moved off `Course title` (§18.2).

---

## 23. Token audit after the element-first rename — 23 Sep

The DS moved to **element-first names** on 22 Sep (`🎨 SKO-Semantics`: `bg/`, `text/`, `icon/`, `border/`,
`shadow/`, 83 tokens; rule: container fill → `bg/`, container stroke → `border/`, shape → `icon/`, text → `text/`)
and ICP was re-bound the same night. The Course Detail work was audited against it — every paint on the local
components (`LMS / Course Detail — Components`) and on every board of the technical section, split into **ours**
(local nodes and instance overrides) and **inherited** (from DS components).

**Ours — clean.** 437 bindings on the local components and ~370 on the technical screens are element-first.
Fixed during the audit, all with **no pixel change** (values checked before re-binding):

- The *Not passing* dot on `Progress card` (4 variants + 4 screen overrides) and the `Certificate card · Generating`
  stroke were on a **stale copy of the old `warning`** (#F9C654) → **`bg/warning`**, the same value.
- `Module number · Complete`: fill `text/success` → **`bg/success`** (same #1F7643), check `icon/on-primary` →
  **`icon/on-success`** — now identical to the DS `Completion Status · Done`.

**Inherited — not ours to fix, and not wrong in the DS either, except one:**

| From DS component | In ICP | In the DS | Action |
|---|---|---|---|
| `Badge` (132 paints) | utility-gray/success/warning/error | pills already re-bound, CHANGED | publish, then accept in ICP |
| `Input field` (18), `_Tab button base` (9), `_Button group base` (1), `search-md` (5) | old Model C / `1. Semantics` names | clean | publish / accept |
| `book-open-01` in `Course Type Badge` (4) | utility-blue-light-500 | still utility — part of the utility-palette round | the DS session's round |
| **`Alert` (10 here, ~90 in the DS)** | old names | ⚠︎ **bound to a remote, published copy of its own library** (`1. Semantics`, `primary-outline-variant`, `text-secondary`…) | **re-bind in the DS** |

The `Alert` is the real finding: the component binds variables through a **remote copy of the SKO library itself**
(`remote=true`), most likely from the August recolour done by importing variables by key inside the DS. The rename
passes re-bound by local variable id and could not see them.

**Left as decisions, not changed:**
- `Lesson name` on the Course tab is a raw **#606B7A** — no token has that value (`text/subtle` #4F5B69,
  `text/placeholder` #677482).
- The partner chip's white stroke is bound to `text/on-primary`; no white `border/` token exists.
- `Image Thumb` placeholder fill is `text/subtle` — a text token as a fill.
- The three legend dots in *How to read this section* are deliberate raw colours (they mirror Figma's annotation
  categories).
- The *Foundations — colour* board on the components page still lists the old names ("the 36 imported") —
  obsolete documentation.

## 24. Known inconsistencies, fixed — 23 Sep

**One "today" for the whole file: Thursday 18 Sep 2026.** The Weekly goal strip already said so (*This week ·
15–21 Sep*, Thursday = `Today done`). Every other date now agrees with it.

**Dates tab (`6207:257718`)** — the screen was contradicting its own annotations:

- **The type chip printed `ASSIGNMENT-DUE-DATE` on all nine rows**, including *Course starts* and *Certificate
  available*. It now carries human copy per `date_type`: *Course* (start · end) · *Due date* (assignment) ·
  *Upgrade* · *Certificate* · *Access* (course-expired). The literal lives only in the row annotation.
- **"Open the assignment →" on rows that are not assignments** — hidden on Upgrade, Certificate, Audit access and
  Course ends. Those blocks carry no `link` (the upgrade block's `link_text` is only relevant while the deadline is
  in the future). Rows without a link are 106 px, like the Locked row.
- **Upgrade deadline (30 Aug) sat under UPCOMING, after a TODAY of 8 Sep.** Moved to PAST. The today marker reads
  *18 Sep 2026*.
- **The missed-deadline Alert showed developer copy** (`dates_banner_info.missed_deadlines is true…`) to the
  learner. It now reads *You missed a deadline on your schedule · Your due dates are a suggested schedule, counted
  from the day you enrolled. Shift them forward to get back on track — the work you have done stays.* The action is
  **Shift due dates** → `reset_course_deadlines`, which is what self-paced edX offers. The field names stay in the
  annotation, where they already were.

**Upcoming dates card (Course tab + ENTRY)** said *22 Sep · Module 3 · Checkpoint · In 3 days* and *27 Sep · Course
ends · In 8 days* — neither exists in the Dates tab. With today 18 Sep, `dates_widget` (`num_assignments=1`)
returns the next assignment and the next course date: **19 Sep · Module 4 · Final project · Tomorrow** and **03 Oct ·
Certificate available · In 15 days**. Meta line follows the pattern *type · time*.

**"12 min left" contradicted the header.** A ~14 h course at 38% has about **8h 40m** left, not 12 minutes. The
progress card (`Progress card` default and both `Course header` types) now says *16 of 42 topics · ~ 8h 40m left*.
The source is the sum of `effort_time` over incomplete blocks — the same field as the per-topic durations
Navdeep kept, **null today**. Until the content team authors it, the footer hides it (`Show item 2`); it must never
print a guess. Course-level `effort` cannot feed it: it is free HTML (*"4 weeks<br>2-4 hours/week"*).

**Completion card ring.** The card had a `Percent` text property that no layer used — setting it changed nothing,
while the ring's *38%* was a separate override. Figma cannot bind a property to a layer inside an instance, and the
DS `LMS / Overall Progress` exposes only `Device`. So the orphan property is **removed**, the component description
says the text and the arc are two overrides to set together, and the missing value property goes to the library
as **request 10**.

**ENTRY tab row was 4 px low** (tabs at y 364, 360 on the technical screens). Its container spacing was 28 and the
search frame padding 10/10, unbound; now `Spacing/3xl` and `Spacing/md` like the technical tabs. Height 56, tabs at 360.

## 25. Open questions — one register, with owner and milestone — 23 Sep

The questions had spread across the annotations and §14–§24; the board `6207:257477` held the six from August, three
of them out of date. It now holds **all fourteen**, numbered so that 1–6 keep their old numbers (the text above
cites *open question 1* and *5*). Each keeps *why it is open · what closes it · what it blocks* and gains a
**By** chip. Milestones, not dates, because none are set: **dev handoff → course build → course start → after launch**.

| # | Question | Owner | By | Blocks | § |
|---|---|---|---|---|---|
| 1 | Who supplies the mentor, and who is assigned to whom? | Product · SkillUp platform | course start | Mentor card, *Ask your mentor*, *Book a call* | 14.3, 21 |
| 2 | Who authors `effort_time`? | Content | course build | every duration, *~ 8h 40m left* | 1, 24 |
| 3 | Can the outline name the prerequisite? | **Vendor** | dev handoff | the Prerequisite lock tooltip | 18.3 |
| 4 | Dates: the tab, the sidebar card, or both? — *design proposes both* | Product | dev handoff | whether the Dates tab ships | 14.2b, 22 |
| 5 | Mentoring on the forum (Route A) or our own service (Route B)? | Product · Engineering | **course start** — divided discussions must be set before it | the private 1:1 channel | 14.3, 21 |
| 6 | Derive the topic type, and what happens to the title prefixes? | Product · Content | dev handoff | the type badge on every topic row | 12.5 |
| 7 | Is course-discovery deployed for SkillUp (`level_type`, `CourseRun.staff`)? | Vendor | dev handoff | level chip, Course team card | 18, 20 |
| 8 | Will weekly goals be switched on (flag, reminder command, email channel)? | Vendor · Product | course start | Weekly goal card, reminders, celebration | 17.1 |
| 9 | Can the platform return days active per week, per course — one rule for web and mobile? | Vendor | course start | week strip, *Last week* | 17.2, 17.6 |
| 10 | Certificate: which template, a real PDF, public verification URL? | Vendor | dev handoff | certificate document, *Download* | 16.4 |
| 11 | Certificate and header: who signs, whose logo, readable ID or UUID? | Product | dev handoff | certificate document, partner logos | 11, 16.4 |
| 12 | Do we offer *Shift due dates* (`reset_course_deadlines`)? | Product | course start | the missed-deadline banner action | 18.2, 24 |
| 13 | Is a call part of the mentoring offer (decision 007)? | Product | after launch | `Show book a call` | 21 |
| 14 | What happens to the weekly goal after the course ends? | Product | after launch | an Ended state for the card | 17.6 |

**Changed from August:** 1 now includes the learner → mentor assignment; 3 is no longer about dates (self-paced has
none) but about getting `prereq_section_name` onto the outline; 4 is no longer "two rows look broken" — with the
Personalised Learning Schedule the tab fills itself, and design proposes keeping both.

**By owner.** Vendor: 3, 7, 9, 10, plus 8 with product — the agenda for Nilesh / Rashid. Product: 1, 4, 5, 11, 12,
13, 14, plus 8. Content: 2, and 6 with product. **Settle first:** 5 and 1, which have to be decided before the
course start date or the private channel is lost for this run.

## 26. Mobile — the Course tab at 375 — 24 Sep

`★ ENTRY · Course Detail — mobile · Course tab` (`6207:256470`), beside `★ ENTRY` in *Course Detail V10*. Built from
the same instances as ENTRY; no drawn parts. *24 Sep:* the alert, section intro and the seven sidebar cards were
re-cloned from `⚙ TECHNICAL · Course tab`, the final screen — ENTRY's differed (Weekly goal *Set* vs *Met*, another
Mentor variant).

| Band | What | Source |
|---|---|---|
| Status bar | `_iPhone mockup status bar`, as on the ICP mobile screens | copied from the ICP |
| Platform nav | DS `Header navigation` · Mobile · Simple — SkillUp logo and menu; the menu opens the LMS sidebar (`Open=True`) | replaces the desktop sidebar |
| Course header | **`Course header` · `Breakpoint=Mobile`** (new axis; desktop variants renamed `Breakpoint=Desktop`) | one column: breadcrumb without the current page, badge + partners, title, stats, progress card |
| Tabs | DS `Horizontal tabs` Underline **sm** — the four fit (344 of 359px); more tabs scroll | the DS *Mobile* breakpoint is a dropdown, not used |
| Content | search · alert · section intro · modules · the seven sidebar cards, stacked in desktop order | as the edX learning MFE stacks its columns |

**What changed in components to make it work — none visible on desktop:**
- **Type scales by mode, not by style.** The title's size and line height are bound to `3. Responsive 📐`; the mobile
  header variant sets that collection to **Mobile**, and everything bound to it follows.
- `Course stats` rows and the `Course title` paragraph **fill and wrap**, so the stats line breaks instead of overflowing.
- `Meta` wraps, and fills its column inside `Module row`.
- **`Module row` gains `Show lock reason` + `Lock reason`** (Locked variants): the same copy as the tooltip, as a
  line under the subtitle. **A phone has no hover**, so on mobile the tooltip is off and the line is on.

**Three annotations, mobile-only** (behaviour, not components): the tabs scroll rather than collapse; the order —
outline, then cards; the lock reason as text on touch.

**Left as it is:** topic titles wrap to two lines beside their type and duration; readable, and it keeps
`Topic row` single-layout. Progress, Dates and Mentorship Q&A in mobile are next.

### 26.1 Progress tab — mobile

`★ ENTRY · Course Detail — mobile · Progress tab` (`6207:256494`), beside the Course tab. Same shell (Progress current),
then: heading · Completion card · pass alert · `LMS / Quiz · Grade Summary` · footnote · Certificate · Weekly goal —
cloned from the technical Progress tab, annotations removed.

- **Both mobile screens now set `3. Responsive 📐` to Mobile at the frame**, so every heading bound to it scales —
  not only the course title.
- **The grade table cannot be narrowed.** The DS sets a **min width of 170 on the first column**, and min size cannot
  be overridden in an instance. On mobile it keeps one number column, **Weighted**, and each type reads
  *Final Quiz · 50%, worth 30%*; rows hug their height. Added to library request 8.
- **Two fixes on the technical Progress tab too:** the grade badge said *62% · below the 70% pass mark* against a bar,
  alert and table all at **15%** — now 15%; and the pass alert's body was developer copy (*From grading_policy.grade_range
  — the threshold is a field…*) — now *Your current weighted grade is 15%.* The field stays in the annotation.
- One mobile-only annotation, on the grade table.

## 27. The handoff frame — dev-ready, no annotations — 24 Sep

**`Platform Pages - Course Detail (self-paced) - Light`** (`6146:10226`) on *Platform Pages V8*, right of the
Technical section, with the banner **Ready for dev** above it (`6146:10247`). Same format as the ICP handoff pages
(Quizzes A-2): intro header — eyebrow, title, description, meta strip — then one row per tab, one **card** per
screen: `Handoff card header + Subheader` (sequence, title, version 2026-09-24 · r1, *Ready for DEV*, designer,
PM, RSD = this document), the screen, and `Handoff / Page Changelog Header` (description + the latest change).

| # | Card | Screen source |
|---|---|---|
| 01 | Course tab · Desktop | `⚙ TECHNICAL · Course tab` |
| 02 | Course tab · Mobile | `★ ENTRY · Course Detail — mobile · Course tab` |
| 03 | Progress tab · Desktop | `⚙ TECHNICAL · Progress tab` |
| 04 | Progress tab · Mobile | `★ ENTRY · Course Detail — mobile · Progress tab` |
| 05 | Dates tab · Desktop | `⚙ TECHNICAL · Dates tab` |
| 06 | Mentorship Q&A tab · Desktop | `⚙ TECHNICAL · Mentorship Q&A tab` |

**The screens are copies with every Figma annotation removed** — 0 in the frame, checked after the copy (12 had
survived as overrides inside instances and were cleared). The Technical screens keep theirs (89); the
annotations stay the source for *why*, the frame is what to build. **Dev Notes footnotes are hidden too** — `Show
Footnote` off on the Course team and Certificate cards, the only four that showed one — so the screens are only what
the learner sees.

**Visible developer copy removed on the Technical screens before copying:** the Dates timezone line (was
*"user_timezone on the dates payload. It is null…"*, now *All times are shown in your time zone (Europe/Lisbon,
UTC+1)*) and the Q&A composer's *"Post anonymously · allow_anonymous is on for this course"* (now *Post anonymously*).

*30 Sep:* the screens carry the platform top bar instead of the LMS sidebar / platform header — §33.

**Not in this handoff:** Dates and Mentorship Q&A on mobile — the rows say so. The screens in the frame are copies:
when a Technical screen changes, re-copy the card's screen rather than editing both.

## 28. Module row holds its topics (slot); Topic row gets a mobile layout — 24 Sep

**`Module row` is now the whole module.** Each of the six variants is one bordered card: `Header` (the row as it
was — number, title and meta, lock, chevron) and a **`Topics` slot** (`Topics#6161:12`), visible when
`Expanded=True`. The slot takes `LMS / Lesson Header` per lesson and `LMS / Course Detail / Topic row` per topic —
the format Nelson set on the Course tab (Module 3). Default content: a lesson header and three topic rows in the
states of the variant. Screens no longer wrap the row in bordered frames or keep a separate topic list: on the
Technical Course tab, ENTRY, the mobile Course tab and both handoff copies, every module is **one instance**, and
Module 3's eleven lesson headers and topics now live in its slot. Overrides survived the restructure (subtitle
counts, lock tooltip, lock reason); the one annotation on the old topic container moved to the Module 3 instance.

**`Topic row` gains `Breakpoint` = Desktop · Mobile** (6 variants). Mobile: the title takes the full width and
wraps, type and duration sit on a line below, the status aligns with the first line. The mobile Course tab and its
handoff copy use it; each topic's type badge and duration were restored after the swap.

**Kept in line with the Technical screen:** *Implementing feedback* is Locked there, so it is Locked on every copy.
The locked title's underline, which had come back on the desktop variant, is removed on both breakpoints.

## 29. Mobile for every tab; every screen on DS tokens and components — 24 Sep

**Mobile, complete.** Beside the Course and Progress tabs: `★ ENTRY · Course Detail — mobile · Dates tab`
(`6207:256509`), `… · Mentorship Q&A tab · list` (`6207:256535`) and `… · conversation` (`6207:256556`). Q&A on a phone
is two screens: the list (no Selected state — there is no split view) and the conversation, opened from a row,
with *Your questions* (DS `Button` Link gray + `arrow-left`) to go back.

**Breakpoints added where the desktop layout does not fit 375** — same pattern as `Topic row`:
- `LMS / Dates / Date row` · `Breakpoint=Mobile`: date and time on a line above the content, badges wrap.
- `LMS / Course Detail / Message` · `Breakpoint=Mobile`: the bubble fills the column (desktop keeps its 420 max).
- `Thread row`: the text column fills (it was fixed at 320, which pushed the unread dot out at 343).

**Token audit — every Course Detail screen, desktop and mobile, and the local components.** Nothing inside DS
instances was touched (that is the DS's job). After the pass, **0 unbound fills, strokes, spacing, radii and 0
unstyled texts** on the ten screens and in the components.

| | Screens | Components |
|---|---|---|
| Colours bound | 6 fills, 5 strokes (tab rows: `bg/page`, `border/subtle`; ENTRY: `bg/faint`) | certificate paper |
| Spacing bound | 37 | 209 |
| Radius bound | 11 | 55 |
| Text styles applied | 6 page headings → `headline-medium/Bold` | 30 |

**Spacing is bound in the node's own mode** — `Spacing/*` lives in `3. Responsive 📐`, so the same token is 24 on
Desktop and 16 on Mobile. Mobile frames and Mobile variants got the token that gives their number in Mobile.

**Values that were off the scale were snapped** to the nearest token: 10→12 (padding, 34×) and 10→8 (gap, 16×),
56→48 (2×), 36→32, 14→16, 18→16, radius 3→2 (8×). Sub-pixel to a few pixels; visible only side by side.

**Text styles — two decisions to confirm:**
- The uppercase card labels (*MENTOR*, *COURSE TEAM*, *UPCOMING DATES*…) were 12/18 with no style. The DS style for
  exactly this — *"Overline — short uppercase eyebrow label"* — is **`label-small/Medium`, 10/14**. Applied, so they
  are **2px smaller**. The alternative, `body-small/Medium` + uppercase, detaches the style (trap 22).
- The certificate's 10px labels → `label-small/Semibold`; their letter spacing goes from 16–24% to the style's 4%.

**Existing components instead of drawn ones:**
- Dates: *Past*, *Upcoming* and the today marker → DS **`Content divider`** (Text, Single line) — the DS's own
  "Today" pattern; the filled chip is gone (`Badge v2` has no strong style).
- `Date row` link → DS **`Button`** (Link color, sm, `arrow-right`) instead of text with "→".
- `Course stats` icons → DS **`book-open-01`** (modules · topics — it was a clock) and **`building-07`** (organisation,
  hidden as before) instead of drawn vectors.
- Left drawn, with no DS equivalent: status dots, the timeline spine, 1px separators inside cards, the date tile,
  the certificate's signature, QR and seal.

**Handoff frame refreshed:** the six screens re-copied, **three mobile cards added** (07 Dates, 08 Q&A list,
09 Q&A conversation) — nine screens. Its chrome, cloned from the ICP handoff pages, had raw colours with no exact
token; they now use the nearest: card stroke `border/subtle` (Δ2), badge `bg/primary` (Δ1), wrapper `bg/strong`
(Δ27, a shade darker), header texts `text/on-primary`, and the meta labels `text/disabled` (legible, but the
wrong role — the ICP handoff pages carry the same raw palette).

### 29.1 Corrections after the audit — 25 Sep

1. **`Badge-V1-to-remove` is gone from Course Detail.** 43 instances inside four local components — `Date row`
   (type, assignment type, status), `Thread row` (question, answered, following), `Message` (staff, accepted answer),
   `Sidebar card` (relative date) — are now **`Badge v2`, Style=Outline, sm**, same colour, same visibility binding.
   The 62 text overrides on the screens were recorded before and re-applied after (the Upcoming dates card now reads
   *Tomorrow · In 15 days* again). The `Date row` default chip is *DUE DATE*, no longer the raw literal.
2. **`Date row` instances hug their height** — six desktop rows were fixed at 106/128, and the DS link button is taller
   than the text it replaced.
3. **`★ ENTRY` follows the Technical Course tab:** alert, section intro and the seven sidebar cards are copies of
   the Technical ones (Weekly goal *Met*, the same Mentor card); the header already matched. No annotations.
4. **Handoff header meta labels** moved from `text/disabled` (wrong role) to `text/on-primary`.
5. **Library requests 11 and 12:** a filled `Badge v2` style for the today marker; a 12px overline.
6. **Handoff re-copied** (all nine screens) and re-audited: 0 unbound colours, spacing, radii, 0 unstyled text, 0
   annotations, 0 old badges. Annotations inside instances needed a second pass after the copy (trap 28).

### 29.2 Consistency pass on the ready-for-dev screens — 25 Sep

Checked on the nine source screens (4 desktop, 5 mobile), ENTRY, and the handoff copies; nothing inside instances.

- **Spacing made uniform:** the desktop tab content is one row, main column + 40 (`Spacing/5xl`) + sidebar, on every
  tab — Progress was a grid. The main column's gap is **24** (`Spacing/3xl`) on all four tabs (Dates and Q&A were 16).
  Notices no longer sit in `Container:margin` wrappers — Course had an extra 20px under its alert, Progress none; the
  column gap now spaces them. Mobile tab rows: padding-top 12 (§ changelog, 25 Sep).
- **Removed:** the empty, hidden `Sidebar` left on the desktop Dates tab.
- **Layer names:** no generic names left (*Body, App, Container, Container:margin, Frame 15/1/18*). The structure reads
  `Page › Main › CourseDetail › Tab content › Main column | Sidebar`; blocks are named for what they are and the same
  on desktop and mobile — `Alert · course update | passing grade | missed deadlines`, `Modules`, `Grade summary`,
  `Past dates`, `Upcoming dates`, `Note · timezone`, `Note · ungraded progress` (learner copy, so not "Footnote",
  which is the Dev Notes atom). Names that carry the API (`Tabs (tabs[] from course_metadata)`, `Timeline
  (course_date_blocks[])`) are kept on purpose.
- **Handoff re-copied and checked:** 0 generic names, 0 hidden layers, 0 annotations, 0 unbound colours or spacing.

## 30. Weekly goal card — the component handoff — 30 Sep

**`Platform Pages - Course Detail · Weekly goal card (component) - Light`** (`6350:7334`), with its *Ready for dev*
banner (`6350:7800`), on *Platform Pages - Ready for Dev 🟢*, to the right of the screens handoff. Same format: intro
header, then one card per row.

| # | Card | Content |
|---|---|---|
| 01 | Weekly goal card · the five states | Not set · Set · Met this week · Set with the week strip · Off (not rendered) |
| 02 | Weekly goal card · thirteen edge cases | E1–E13, from editing to course ended (open decision) |
| 03 | Weekly goal · what counts as an active day | the web / mobile-app table, notes and sources |

It was built from the copy of *Weekly goal — states and what edX gives us* placed on this page; its sections were
moved into the cards and the empty board removed. The original stays in the Technical section (`6207:257749`).

**The explanation lived in 19 Figma annotations; a handoff carries none**, so each state now has its dev notes
visible under the card — the DS **`LMS / Footnote`** atom (*Dev Notes: …*, Space Mono), the annotation text verbatim
minus the markdown. Then: 141 spacing values and 24 radius corners bound to DS tokens (the table cells' 14 → 16),
the table's text layers named by column, the table eyebrow *WEEKLY GOAL · RULE*. Checked: 0 annotations, 0 unbound
colours, spacing or radii, 0 unstyled text, 0 generic names, no overlap on the page.

## 31. Certificates — the component handoff — 30 Sep

**`Platform Pages - Course Detail · Certificates (component) - Light`** (`6353:7518`) + *Ready for dev* banner
(`6353:8713`), to the right of the Weekly goal handoff. Same format.

| # | Card | Content |
|---|---|---|
| 01 | Certificate card · the four statuses | Not earned · Generating · Issued · Run closed — instances of `LMS / Course Detail / Certificate card` |

**Explanations as visible dev notes (`LMS / Footnote`).** Per status: the five annotations on the Technical
screens' Certificate cards (cert_status values, batch issuance, the self-paced visibility rule, actions only on
Issued, the requirement rows and that only the grade is an edX requirement). For the document: the field map of
§16.2 and the no-PDF correction of §16.3, in one note. No new claims — everything comes from those two sources.

**Fixed in the component on the way:** Generating's title read *"You Certificate is being issued"* → *Your
certificate is being issued*; and a discovery flag inside the card, *"The state we were missing"*, is removed (its
point is in the dev notes). The mockup's spacing, radii and eyebrow are on tokens and styles, in the handoff copy
and in the original on the components page.

Checked: 0 annotations, 0 unbound colours, spacing or radii, 0 generic names, no overlap. The certificates inside
the mockup are instances scaled to 72 %: their texts carry no text style by construction (a style would fix the
size), as before.

**Node ids.** The working page was duplicated to *Plaftorm Pages (SkillUp UI) - V8 - WIP 🟠 2* (`6207:245582`);
the original page (*Platform Pages - Ready for Dev 🟢*) now holds only the handoffs. *30 Sep:* every id in this
document, the CHANGELOG and the library requests now points at the new page (39 replaced). Left as they were: the
Progress tab v1 (`5482:4574`, deleted 21 Aug), the old Dates page (`5655:325`), and ids from the DS file.

> *30 Sep, later:* **the Certificate document is not for development** (Nelson). It is a visual representation of
> what the learner receives; the platform renders the web certificate from its own template. Its card is removed
> from the handoff, the mockup card is labelled a representation, the Issued dev note says the thumbnail is
> illustrative, and the component description says *not for development*. §16's field map stays as discovery.
> *30 Sep, later still:* the **digital and print mockup** is removed from the handoff too — the same document in
> other contexts, equally not for development. The Certificates handoff is **the Certificate card alone**.
## 32. Tablet — the four tabs at 960 — 30 Sep

Built to the ICP convention: **960 wide, `3. Responsive 📐` = Tablet**, no status bar (a browser view). Sources on
*Plaftorm Pages (SkillUp UI) - V8 - WIP 🟠 2*, in *Course Detail V10*, one row below the mobile screens:
`★ ENTRY · Course Detail — tablet · Course tab` (`6359:12024`), `· Progress tab` (`6359:12852`), `· Dates tab`
(`6359:13209`), `· Mentorship Q&A tab` (`6359:13759`). The header variant is `6358:46187`.

- **Shell:** DS `Header navigation` (logo + menu) instead of the 240 desktop sidebar, which does not fit at 960.
- **`Course header` · `Breakpoint=Tablet`** (new variant): breadcrumb, then one row — type and partners, title (with the
  image, as on desktop) and stats on the left, the progress card at 320 on the right.
- **Tabs** with search on the same row, the search pushed to the right and **at most 320** wide (Nelson, 30 Sep).
- **Content:** the Technical desktop tab content with the main column filling and the sidebar at **320** — the
  desktop width, kept as the minimum on tablet (Nelson, 30 Sep; was 280) — cards fill it;
  Dates full width with the desktop Date row; Q&A keeps the two panes — list 320, conversation filling.
- **Touch:** a tablet has no hover either, so Module 4 shows its lock reason as text (`Show lock reason`), as on mobile.

**Handoff:** the screens handoff gains a tablet card in each row, between desktop and mobile — **13 screens**, cards
renumbered in order (desktop · tablet · mobile). It is now 3 630 wide, so the Weekly goal and Certificates
handoffs moved right. Checked: 0 annotations, 0 unbound values, 0 generic names, no overlaps on the page.

## 33. My Learning and Dashboard — handoff frame, still in progress — 30 Sep

> **Status on 7 Oct 2026 (Nelson): the navigation model is under study.** Whether the platform pages use a
> sidebar or a top bar is not decided. What this section and §34 say about the sidebar being hidden and the top
> bar being the navigation describes the screens as they are drawn, not a decision. A Dev Mode annotation says so
> (*Navigation is not final…*). **Since 7 Oct (night) it sits in three places only** — the `Topbar` main component
> in the DS, the local sidebar set on the WIP page, and one screen, *Dashboard · Desktop* on Ready for Dev — and
> no longer on every top bar and sidebar (Nelson: once on the main component and on one screen is enough; 71
> copies removed). Until it is decided: build page content
> that works with either, and do not tie layout rules to the 72px top bar or to a 240px side column.

**Decisions (Nelson, 30 Sep).** Base: the *LMS DS* set (*1 · Core Learning Journey - LMS DS*). The **LMS sidebar is in
development and hidden on every platform page**; navigation is the **top bar from the Dashboard experiment**, on
desktop, tablet and mobile. The four My Learning screens (Programs and Courses, grid and list) and the Dashboard go
to dev on all three breakpoints. What the DS lacks becomes local components for peer review; course cards move to
the DS `LMS / Course Card`.

**`LMS / Platform / Topbar`** (`6374:3608`, components page) — Breakpoint = Desktop · Compact. Desktop: logo, the
five sections, notifications and the learner; Compact (tablet, mobile): logo, notifications, menu. Built from DS
atoms (`Skillup_logo`, `bell-01`, `chevron-down`, `Avatar`, `Badge v2`) and the atom **`LMS / Platform / Topbar
item`** (`6373:3313`, State = Default · Current, Label, Show count). The experiment's bar was drawn with raw values
and off-scale type (13.5 / 12.5 / 10.5); the component is on tokens (`bg/inverse`, `text/on-inverse`) and DS styles.

⚠︎ **A translucent fill cannot be a token.** With a colour variable bound, Figma ignores the paint's opacity (it
renders solid). The Current item's 8 % white is a `Highlight` layer — `bg/on-media` with **layer** opacity 8 %.

**Desktop screens** (section *My Learning & Dashboard — dev-ready sources*, `6374:16005`, on the WIP 2 page):
Dashboard (from the top-bar experiment) and the four My Learning screens, sidebar removed, content at 1280.
- Courses grid and list now use **`LMS / Course Card`** (Grid, List) instead of drawn cards and the retiring
  `LMS / Course Card_Remove`. Data fixed on the way: the Courses tab labelled every course *PROGRAM* → *COURSE*;
  *Flexible + Live* → *Flexible + Live Sessions* (the Courses Type wording).
- ⚠︎ In the DS `LMS / Course Card` · List, a long title runs under the progress column (e.g. *UX Research and Design
  Thinking*), and in both layouts a long *Up next* title runs under its type badge — the component does not truncate.
  Library request to follow.

**Local components** (components page, `LMS / Platform / …`, for peer review — none promoted to the DS). Each is
built from DS atoms, on tokens and DS text styles, and replaces what was drawn on the five desktop screens.

| Component | Id | What it is | Replaced |
|---|---|---|---|
| `Stat` | `6378:3299` | Theme Default · Inverse; Label, Value, Detail, Show divider. Content bottom-aligned, so values share a baseline when a label wraps | 12 My Learning stats, 4 Dashboard KPIs |
| `Section header` | `6382:3172` | Title + Emphasis (headline-small/Bold, text/default + text/subtle), optional DS `Buttons/Button` sm · Link gray + arrow-right | *Due this week*, *Pick up where you left off*, *Jump somewhere* |
| `Due item` | `6382:3495` | Urgency Today (day in text/error) · Upcoming; Day, When, Title, Meta; status = exposed `Badge v2` Soft sm (Error + dot for Live, Warning for Due) | 3 rows of *Due this week* |
| `Jump tile` | `6382:3302` | Icon (swap, DS icon in icon/primary on bg/primary-soft), Title, Description | 4 tiles (message-chat-circle, calendar, award-01, user-01) |
| `Glance card` (since 8 Oct the DS set `Today-at-a-glance`: `Breakpoint` Desktop = four in a line, Mobile = 2×2) | `6384:17651` | Title + 4 `Stat` · Inverse in a 2×2 grid on bg/inverse; two decorative circles (bg/info, bg/primary at 12 % layer opacity) | *Today at a glance* |
| `Streak card` | `6384:17785` | Count (display-large/Bold, the one hero figure per screen), Label, 7 `LMS / Course Detail / Week day`, Message | the streak card |
| `Program card` | `6388:3858` | Layout Grid · List × State In progress · Not started; DS `LMS / Delivery Mode Badge`, `Badge v2` Gray (cohort, status), DS `Progress bar`, `Buttons/Button` Primary *Continue* / Secondary *Details* | 2 programs × grid and list |
| `Browse tile` | `6388:116426` | Dashed border/default on bg/faint, DS `plus`, Title, Subtitle | *Browse catalog* in Courses grid |

What changed on the way (design vs the drawn experiment):
- **Streak days** now use the Course Detail `Week day` states (outlined check, dashed upcoming) instead of solid
  circles — one pattern for "a week of study" across Dashboard and Weekly goal. The *13 hours* highlight was #51BFFC
  on white (fails contrast); it is `text/primary` Semibold.
- **Section titles lose their italic.** The DS has no italic text style; the two-colour split stays. Library request 14.
- **Program hero** on `bg/primary` for both states: the not-started grey-blue (#49667A) has no token and `bg/primary`
  is the nearest. The state reads from the body (0 %, *Not started* badge, *Details*).
- **Progress bar is stepped** (0–100 by 10): 27 % shows the 30 % bar. Library request 15.
- **The *Today at a glance* title** was #51BFFC; no text token carries it on `bg/inverse` → `text/on-inverse`.
- Data: the not-started grid card showed the in-progress figures (*Week 4/32 · Courses 1/7*); aligned with the list
  (*0/32 · 0/5 · 0/64*). Its eyebrow still says *6 courses + capstone* against *Courses 0/5* — to confirm.
- Programs grid now uses the Courses grid tracks (3 flexible columns, 24 gap); program cards hug their height.

**Token and naming pass (30 Sep).** Re-audited outside instances: **0 raw fills, strokes, effects, spacing, radii
or unstyled texts, 0 generic layer names** on the five desktop screens.
- One shell for the four My Learning screens: `Main` (padding 5xl / 5xl / 8xl / 5xl, gap 4xl) → `Header` (`Intro`
  fill + `Stats` fixed 600) → `Collection` (gap 3xl: `Toolbar` + `Course grid` / `Course list` / `Program grid` /
  `Program list`). Before, the header split 720/480, 600/600 or 480/480 depending on the screen, Courses List had
  an extra `MyLearning` wrapper, and the gaps were 36 + 4 + 8 and 22. At 600 each stat is 200 wide and *Daily goals
  completed* fits on one line.
- Dashboard: `Content` → `Greeting`, `Overview` (Glance + Streak), `Due and resume`, `Jump`; the three
  `Container:margin` wrappers are gone. The Due list's border was an inner shadow → `border/subtle` stroke,
  `Radius/fixed-md`. The resume list lost an invisible stroke and shadow.
- Page title (*Good morning, John.* · *Keep going.*, drawn Bold 40): **`headline-large/Bold` (36/44)**. The DS page
  title `display-medium` is 60 — too large for these pages; the HTML stays `<h1>`. The grey second phrase keeps
  `text/subtle`, not the italic (request 14). ⚠︎ `headline-large` has **36 paragraph spacing**: a two-line title
  takes a line break (Shift+Enter), not a paragraph break.
- The hidden intro paragraph (*You're four weeks into…*) is on `body-medium/Regular`, `text/subtle`, still hidden.
  A hidden duplicate program card in Programs List (a compact *Cybersecurity* row) was removed.
- Course list cards now 24 apart (was 16), like every other collection.
- ⚠︎ `LMS / Course Card` progress: the fill is a fixed 149 px frame on every card — 5 %, 35 %, 52 % and *Not started*
  all drew the same bar. Each fill is now sized to its percentage and hidden when not started; overrides, not a
  property (library request 13).

**Tablet and mobile (30 Sep).** Same section, two rows under the desktop row; built from the desktop screens, no
drawn parts. Re-audited: 0 raw values, 0 generic names.

| Screen | Tablet (960, `Responsive = Tablet`) | Mobile (375, `Responsive = Mobile`) |
|---|---|---|
| Dashboard | `6397:16635` | `6400:29528` |
| My Learning · Courses | `6397:17285` | `6400:29847` |
| My Learning · Programs | `6397:18563` | `6400:31480` |

- **Below desktop there is only Grid** (Nelson, 30 Sep): the grid/list toggle is hidden and both collections show
  Grid — 2 columns on tablet, 1 on mobile. So 3 screens per breakpoint, not 5. The DS `LMS / Course Card` · List
  does not fit under desktop (title and progress overlap at 896).
- **Shell:** `LMS / Platform / Topbar` · Compact on both. Mobile adds the ICP `_iPhone mockup status bar` and
  `_iPhone mockup home`, as on the Course Detail mobile screens. Spacing follows the mode.
- **Dashboard.** Tablet: *Due* and *Pick up* stack; Glance + Streak stay side by side. Mobile: everything stacks,
  Jump tiles 2 × 2, and the `LMS / Course Row` hides its delivery badge — the DS row has no narrow layout and
  its title line (352–405) is wider than the phone.
- **My Learning.** Tablet keeps the desktop header (Intro + Stats 600). Mobile stacks it and the **Stats go
  vertical** (one per row, no divider) — three columns of 109 broke *COMPLETED* mid-word. Toolbar on mobile: tabs
  (`sm`) above a full-width search. The Browse tile is 160 tall on mobile.
- **Course Card fixes (overrides, all breakpoints):** the thumbnail is pinned at 86 × 86 — in the component it is a
  locked-ratio square that fills the header height, so at 960 the titles column collapsed to 1 px and the
  thumbnail grew to 686; the *Up next* title fills and truncates to one line (the Topic-type badge used to be pushed
  out); progress fills re-sized per breakpoint. All three are library request 13.

**The top bar on Course Detail (30 Sep).** The LMS sidebar is hidden on every platform page, Course Detail included. *(As drawn on 30 Sep. Since 7 Oct the choice between sidebar and top bar is under study: see the note at the top of §33.)*
- **Desktop** — `⚙ TECHNICAL` Course (`6207:257304`), Progress (`6207:257333`), Dates (`6207:257718`), Mentorship Q&A
  (`6207:257432`) and `★ ENTRY · … v12 · componentised` (`6207:256439`): `Page` was a grid (240 sidebar | 1040
  main); now a column — `LMS / Platform / Topbar` (Desktop, *My Learning* current), then the page at **1280**.
  Header, tabs and content fill it; the page margins are 40 on both sides (the right-only 40 is gone), so the
  breadcrumb and main column start at 40 and the progress card, search and sidebar end at 1240. Course tab: main
  column 840 + sidebar 320. Progress: two columns of 580. Dates: the *Upcoming* list fills like *Past*.
- **`Course header` · Desktop** (both types) now adapts to its width: the content row is 960 at x 40 with
  `STRETCH`, the left column fills, the progress card stays 360; the circles pin right. It was drawn for 1040 with
  `MIN` constraints and a hugging row — at 1280 the card stopped at 960.
- **Tablet and mobile** — the four tablet and five mobile `★ ENTRY` screens: DS `Header navigation (platform)` →
  `LMS / Platform / Topbar` · Compact (48 in these modes, was 64).
- **Handoff** (`6146:10226`): the 13 screens re-copied from their sources — 87 annotations cleared, footnote
  state carried, 0 visible footnotes, 0 annotations left, no overlaps on the page. Cards 02 · 05 · 08 · 11 were
  named *…-desktop · 1280*; now *…-tablet · 960*. Each card's changelog gains the 30 Sep top-bar entry; the tablet
  descriptions said *280 sidebar* → 320.

**Handoff frame (30 Sep) — work in progress, not ready for dev (Nelson, 1 Oct).** `Platform Pages - My Learning &
Dashboard - Light` (`6408:35150`) with its banner (`6408:35142`, now *WIP*, Warning) on *Platform Pages - Ready for Dev 🟢*, right of the Certificates handoff.
Same format as the Course Detail handoff (§27): intro and meta strip, then one row per page, one card per screen —
header (sequence, title, version 2026-09-30 · r1, status *In progress*, RSD = this section, a Figma link to the source
screen), the screen, and the changelog header (description + first entry).

| # | Card | Source |
|---|---|---|
| 01 · 02 · 03 | Dashboard · Desktop · Tablet · Mobile | `6374:16006` · `6397:16635` · `6400:29528` |
| 04 · 05 | Courses · grid · list · Desktop | `6374:114591` · `6374:115077` |
| 06 · 07 | Courses · Tablet · Mobile | `6397:17285` · `6400:29847` |
| 08 · 09 | Programs · grid · list · Desktop | `6374:115915` · `6374:116384` |
| 10 · 11 | Programs · Tablet · Mobile | `6397:18563` · `6400:31480` |

The screens are copies: 0 annotations, no footnotes, no overlaps on the page. When a source changes, re-copy the
card's screen. **Not in this handoff:** the eight local components as their own component handoff (like Weekly goal
and Certificates) — they carry descriptions on the components page and wait for peer review.

## 34. Three corrections from Nelson — 1 Oct

**1. The platform top bar is light, not dark.** `LMS / Platform / Topbar` (both breakpoints): `bg/page` with a 1px
`border/subtle` rule below; name in `text/default`, role in `text/subtle`, icons `icon/default` (chevron
`icon/subtle`); `Skillup_logo` in its default colour version (the white-text overrides are gone). `Topbar item`:
label `text/subtle`; Current = `bg/primary-soft` behind a `text/primary` label (it was 8 % white on the dark bar).
Every screen uses instances, so Dashboard, My Learning and Course Detail changed with the component — sources and
handoff copies. The translucent-fill note in §33 no longer applies to the top bar.

**2. Delivery and Difficulty badges show on every breakpoint.**
- `Course header` · Tablet and · Mobile had no `Tags Container`; they now carry `LMS / Delivery Mode Badge` and
  `LMS / Difficulty Badge` between the title and the stats, as on desktop (wrapping on mobile).
- Dashboard mobile: the delivery badge is back on the resume rows. The DS `LMS / Course Row` cannot do it — its
  title has a **264 minimum width**, so title + badge is at least 389 wide and instances cannot override a
  minimum (library request 16). The mobile Dashboard uses a local **`LMS / Platform / Resume row`** (`6418:18853`):
  the same atoms and tokens as the DS row — title, badge under it, DS `Progress bar` with the percentage,
  `Buttons/Button`. To retire when the DS row gets a mobile layout. Desktop and tablet keep the DS row.

**3. Mobile Mentorship Q&A conversation — one card.** Nelson's reference: the handoff copy he edited (card 13).
`★ ENTRY · … mobile · Mentorship Q&A tab · conversation` (`6207:256556`) now wraps the header, the messages and the
composer in one `Conversation` card (`bg/page`, `border/subtle`, rounded), as the desktop pane — which is what
makes the mentor bubble visible (it was grey on a grey page). Messages have 16 padding and stay on
`Message` · `Breakpoint=Mobile`, which fills the width; the reference used the Desktop variants, whose 420 bubble
was clipped. `Message` · Mentor · Mobile: the author line wraps, so *Accepted answer* drops under the name instead
of leaving the card. Layer names follow the reference (*Question Title*, *Question Metadata*, *Post Anonymously
Checkbox*).

**Handoffs:** card 13 (Course Detail) and card 03 (My Learning & Dashboard) re-copied; all 24 cards carry a
1 Oct changelog entry. 0 annotations, no overlaps.

**4. *Ready for DEV* uses `Status/Done`.** Nelson swapped the Status Tag on card 01 from `Status/In progress`
(label overridden) to `Status/Done` — green, with the dot. The other 27 tags on *Platform Pages - Ready for Dev 🟢*
followed on the frames that are ready for dev: Course Detail (12), Weekly goal (3), Certificates (1) — 17 with
card 01. **My Learning & Dashboard is not ready for dev**: Nelson set its banner to *WIP*, and its 11 cards are
`Status/In progress`, label *In progress* (I had marked them *Ready for DEV* when building the frame — wrong).
No other page in the file has a Status Tag. Rule: `Status/Done` + *Ready for DEV* only when Nelson marks a frame
ready; a new handoff frame starts as `Status/In progress`.

**5. Profile access on tablet and mobile.** `LMS / Platform / Topbar` · Compact had logo, notifications and menu —
no way to the profile. It now carries the learner's DS `Avatar` (*Profile*, sm) between notifications and the
menu, the same atom as the Desktop user block; it opens the profile menu. Actions gap as on Desktop
(`Spacing/lg`). The 15 compact top bars in the sources and the 15 in the handoffs are instances and changed with
the component.

**6. The components page is in sections.** `5409:325` had three clashes — `Message` over `Week day`, `Course
header` (now 1 729 tall) over six Platform components, `Program card` over `Browse tile` and `Resume row` — all
from components that grew after they were placed. The 40 items now sit in ten named sections, in three columns
right of the Cover and Foundations frames, packed in rows with 100 between items: Course Detail · header and shell ·
Course tab — outline · Course tab — sidebar cards · Progress tab · Dates tab · Mentorship Q&A; Platform · top bar ·
Dashboard · My Learning; Docs and proofs. Node ids are unchanged. A new component goes inside its section; if a
component grows, re-pack the section rather than moving one neighbour.

**7. The header's big circle is a diagonal hatch** (Nelson, 1 Oct, from a reference he sent). In `Course header`,
all four variants — so courses and programs, every breakpoint: `Big Circle decoration` has no fill and holds one
vector, *Hatch (decoration)* — 1px lines every 10, running down to the right, stroke `border/primary`, the frame
at 35 % layer opacity and clipping to its circle. `Small Circle decoration` stays solid (`bg/primary` at 12 %).
On Tablet and Mobile the circles moved to the desktop composition — hatched circle top right, solid one behind the
content — they had been sitting under the progress card, and the tablet's small circle outside the header.
29 instances (17 in the sources, 12 in the handoffs) changed with the component.

**8. Badges: only `Badge v2`** (Nelson, 1 Oct). Checked on all 40 pages: `_Badge base` is never placed on its
own — every one (629 on Ready for Dev, 988 on WIP 2, 142 on the components page) is the layer inside a
`Badge v2`. `Badge v2` has no text property of its own, so a badge's label and dot are set on that nested layer
(`Text#21889:56`, `Dot#21889:7`); that is the component working as built, not the base being used.
What did turn up: **28 instances of the old badge, `Badge-V1-to-remove`**, placed directly — the *What counts as a
day* table (*Counts*, *Not required*, *No*) in the Weekly goal handoff and in the Technical section, plus
*Self-paced* and *Professional* there. All replaced with `Badge v2` · Soft, same size, colour and text. 18 more V1
badges remain, all hidden and all inside the DS `_Tab button base` — the library's to remove.

## 35. Program Page — what the data allows — 1 Oct

**Decisions (Nelson, 1 Oct).** The Program Page mirrors Course Detail (courses where Course Detail has modules);
the tabs start from the V8 exploration (`Program Detail - Dark Hero`, `6207:246312`) but only what an API backs
goes in; desktop first. A new handoff starts *In progress*.

### 35.1 Evidence — public, read-only requests, no credentials

**Open edX, dev (`devcourses.skillup.online`).** `GET /api/mfe_config/v1`: **`ENABLE_PROGRAMS = true`**,
`DISCOVERY_API_BASE_URL = https://discovery-dev.skillup.online`, **`CREDENTIALS_BASE_URL = ""`**.
- course-discovery **is deployed** (`/health/` → OK; `/api/v1/programs/` → 401, it exists and wants a login).
  This answers open question 7 of §25 (level chip, Course team card).
- `GET /api/dashboard/v0/programs/{uuid}/progress_details/` → 401: the learner's program progress endpoint
  exists. In Open edX it returns the program, and its courses bucketed **completed / in progress / not started**.
- `/dashboard/programs/{uuid}/` → 302 to login: the legacy program page is routed.
- **Credentials is not configured** → no program certificate and no Learner Record.

**The current platform (`skillup.online`).** The public page of *Certificate Program in AI Augmented Digital
Marketing* (uuid `ed676db2-8681-4da3-9513-a7e74153f2e7`) server-renders a 45-field program payload — saved,
without prices, as [`program-page-payload-2026-10-01.json`](program-page-payload-2026-10-01.json):
`display_name`, `type` (*Professional Certs*), `org`, `subtitle`, `course_type` (*BLENDED*), `course_level`
(*BEGINNER*), `mentored`, `duration` (*4 months*), `start` / `end` / `enrollment_*`, `courses_in_program[7]`
(`title`, `introductory_sentence`, `course` id, `topics_covered[5]`), `overview[8]`, `faq[10]`, `includes[8]`,
`create[9]`, `exercises[10]`, `instructors[1]`, `certificate` (*Certificate of Completion*; `certificate_url`
empty).

**Not verified.** What `progress_details` returns to a logged-in learner here, and whether this program exists in
course-discovery or only behind the marketing site — the payload's field names are not Discovery's
(`display_name`, `courses_in_program`, `includes`…). **Vendor question:** which is the source for the LMS program
page — Discovery + `progress_details`, or the marketing backend?

### 35.2 The eight V8 tabs against the data

| V8 tab | Open edX | Current platform | Verdict |
|---|---|---|---|
| Syllabus | courses by status (`progress_details`) | 7 courses, intro, 5 topics each | **in** — *Courses* |
| Program Info | `overview`, staff | 8 overview sections, includes, instructor | **in** — *About* |
| FAQs | `faq` | 10 FAQs | **in** |
| Certificates | course certificates yes; program certificate no (Credentials empty) | the words *Certificate of Completion*, no URL | **in** — the courses' certificates only |
| Calendar | none at program level | — | **out** — the top bar's Calendar is global (walkthrough, 10 Apr) |
| Resources | handouts per course only | — | **out** |
| Projects | none | a descriptive list (`create`) | **out** as a tab; the list goes in *About* |
| 1:1 Mentor | none | the flag `mentored` | **out**; the flag shows in the header |

**Dropped from V8 for lack of data:** per-course unlock dates (all seven runs share one start and end),
attendance of live sessions (VILT is out of the MVP; the Live tab is Zoom's iframe, §12.3), the assigned mentor,
the program certificate, and the capstone as a special object — it is the seventh course.

### 35.3 Courses tab · desktop — built 1 Oct, in progress

`Program Detail · Courses tab · Desktop` (`6443:18722`) in the section *Program Detail — sources (in progress)*
(`6443:18721`) on the WIP 2 page. A clone of `★ ENTRY · Course Detail — v12` with courses where it had modules;
0 annotations, 0 raw values, 0 generic names.

| Part | Built with | Data |
|---|---|---|
| Top bar | `LMS / Platform / Topbar`, *My Learning* current | — |
| Header | `Course header` · `Type=Program` — breadcrumb *My Learning › Programs*, `LMS / Course Type Badge` Program, title, Delivery (*Flexible + Live*) and Difficulty (*Beginner*) badges, *7 courses · 4 months · SkillUp* | `display_name`, `course_type`, `course_level`, `courses_in_program.length`, `duration`, `org`, `program_image_url` |
| Progress card | `Progress card` in the header: *14 %*, *Program progress*, *Course 2 of 7 · in progress*, **Resume course**, *1 of 7 courses complete*; no passing line, no time left | courses completed ÷ total, from `progress_details` buckets; Resume = the in-progress course's resume URL |
| Tabs | DS `Horizontal tabs`: **Courses** · Certificates · FAQs · About. No search — nothing searches a program | §35.2 |
| Course list | `Module row` × 7, *Course n · title*, state Complete / Incomplete, meta *Complete* · *In progress · 40% complete* · *Not started* | title from `courses_in_program`; status from the buckets; the percentage from the Course Progress API, one call per course |
| Open course | local **`LMS / Program Detail / Course panel`** (`6444:3657`, State In progress · Not started · Complete) in the row's `Topics` slot: the intro, *Topics covered* as a bulleted list, DS `Progress bar` and `Buttons/Button` (*Resume* · *Start* · *Review course*) | `introductory_sentence`, `topics_covered` — strings, not real topics: no status, type or duration |
| Sidebar | `Sidebar card` · Dates as *Program dates* (started, ends); `Card shell` as *What's included*; `Sidebar card` · Team as *Program instructor* | `start`, `end`; `includes`; `instructors[0]` |

**Not on the page, for lack of data:** locked courses and unlock dates, the capstone as a special card, the mentor,
weekly goal, certificate, handouts and tools cards, the course-update alert and the search field.

**Two things to know.**
- **The header is dark.** `Course header` · `Type=Program` carries `🎨 SKO-Semantics = SKO Dark` on the variant, so
  every token inside resolves to its dark value — a dark hero made of tokens, under the light top bar. To make it
  light like Course Detail, clear the explicit mode on the variant.
- `Card shell`'s slot was a fixed 40 px frame; it is now a vertical auto layout that hugs its content.

### 35.4 Certificates, FAQs and About · desktop — built 1 Oct, in progress

Three more screens in the same section, each a copy of the Courses screen with its own main column; the header,
the tabs and the three sidebar cards are the same on all four. Audited: 0 raw values, 0 generic names, 0 annotations.

| Screen | Id | Main column | Data |
|---|---|---|---|
| Courses | `6443:18722` | §35.3 | |
| Certificates | `6449:21234` | `Section intro`, then one `LMS / Course Detail / Certificate card` per course that has certificate data — course 1 **Issued**, course 2 **Not earned** with its two progress lines — each under its course title; a note for the five not started | the courses' certificates (edX issues them per course run) |
| FAQs | `6448:20247` | a card of ten DS `_FAQ item` (accordion), the first open | `faq[10]` — question and answer |
| About | `6448:24409` | `Section intro` with the subtitle, then a card of ten `_FAQ item`: the eight `overview` sections, *What You Will Create* and *Exercises to Explore* | `subtitle`, `overview[8]`, `create[9]`, `exercises[10]` |

- **`_FAQ item` is a private atom of the DS** (`FAQ section` is built from it; it is not published on its own, so it
  cannot be imported by key — it is reached through `FAQ section`). Its divider sits **above** the item: the first
  item takes `Divider=False`, the rest `True`. Library request: publish the accordion item.
- **The subtitle is marketing copy.** It ends *"Enroll now to accelerate your digital marketing career!"* — dropped on
  the About tab, where the learner is already enrolled. `overview` arrives as HTML (lists, line breaks) and is
  shown as plain paragraphs and bullets.
- **The program certificate is an open question.** FAQ 10 and the payload promise an *industry-recognized
  Certificate of Completion* for the program, but Credentials — where Open edX keeps program certificates — is not
  configured on dev. The Certificates tab shows the courses' certificates only. **Vendor question:** where is the
  program certificate issued and how does the LMS read it?
- The certificate thumbnail inside the Issued card is the illustrative `Certificate document` (§31 — not for
  development); only the learner and the course name were set.

### 35.5 The course list — three options with the DS course card — 4 Oct

Nelson, 4 Oct: the `Module row` list reads as "expand here", but a course is a **destination** — the learner
leaves for the course page — so the courses should look like the course cards of My Learning. Three options,
second row of the same section, each a copy of the Courses screen. **None was chosen** — see §35.6; the three
screens no longer exist.

| Option | Screen | What |
|---|---|---|
| A — grid | `6526:20655` | DS `LMS / Course Card` · Grid, two columns in the 840 main column; the sidebar stays |
| B — list | `6527:22768` | DS `LMS / Course Card` · List, one per row at 1 200; no sidebar on this tab (program dates, what's included and the instructor stay on About) |
| C — list with sequence | `6527:29075` | B plus a spine on the left: `Module number` (Complete · the course number) joined by a 2px `border/subtle` connector — the order of the program stays visible |

Card data, all API-backed: title, org, delivery and level, progress from the Course Progress API (*Complete* ·
*40% complete* · *Not started*), **total effort** instead of time left (`effort` on the Courses API; time left has
no API), *Up next* from the course's resume position, and for the completed course *Certificate · Issued …* in the
Up next slot (the course certificate). CTA *Review* · *Resume* · *Start*.

On the List card the title, progress and footer zones now share the width (`Footer`, `up-next` and `Next-Content`
set to fill): the progress column lines up across rows and a long title wraps instead of running under it.

⚠︎ **Correction to §33.** The Course Card progress bars on My Learning were **not** fixed on 30 Sep: `resize()` on a
layer nested in an instance is ignored without an error, and the widths reported then were the computed ones, not
read back — every fill was still 149. Fixed 4 Oct on the sources and the handoff copies, and verified by reading
the width back: the fill is set to *fill* and the bar takes a right padding equal to the unfilled part
(5 % → 17/334, 35 % → 117/334, 52 % → 174/334).

### 35.6 The course list — decided 5 Oct: a list of expandable course rows

Nelson, 5 Oct, turning the three options down: **list format only; the learner sees at once which module they
left off in; and each course expands to show its modules.** The three option screens were removed.

**`LMS / Program Detail / Course row`** (`6538:6143`, components page, section *Program Detail*; local, for peer
review) — `Expanded` = False · True.

| Part | Built with | Data |
|---|---|---|
| Card | the DS `LMS / Course Card` · List — same card as My Learning; its border and shadow moved to the row's container (`bg/page`, `border/subtle`, `Radius/fixed-xl`, `Shadows/shadow-card`) | as §35.5: progress, total effort, *Up next*, CTA |
| Modules bar | `Position` (body-medium/Semibold) + `Detail` (body-medium/Regular, text/subtle), and a DS `Buttons/Button` sm · Link gray *Show modules* / *Hide modules* with chevron-down / chevron-up | in progress: *You left off in Module 2 of 4* · *module name · 3 of 10 topics done*; not started: *4 modules* · *43 topics*; complete: *4 modules* · *All complete · 36 topics* |
| Modules (Expanded=True, a **slot**) | one `LMS / Course Detail / Module row` per module, collapsed, no chevron — a module opens the course page at that module; the current one sat under a `Badge v2` · Soft · Brand *You left off here* until 7 Oct, when Nelson took the badge out (the modules bar already says it; library request 23); on `bg/faint` | the course outline: modules, their completion and the resume position — fetched **when the row is expanded**, one call per course |

`Program Detail · Courses tab · Desktop` (`6443:18722`) now uses it: seven rows at 1 200, course 2 expanded, real
module names, topic counts and durations from the syllabus. **No sidebar on this tab** — the List card needs the
width; program dates, what's included and the instructor stay on Certificates, FAQs and About. Audited: 0 raw
values, 0 generic names, 0 annotations.

Removed with the old version: the local `LMS / Program Detail / Course panel` (0 instances left).

⚠︎ The DS card's thumbnail loop (library request 13) hits here too: with the footer set to fill, the thumbnail grew
to 580 and the title went one letter wide. The row pins the thumbnail (sizing *fixed* on both axes).

**Next:** ~~tablet and mobile for the four tabs~~ (done 7 Oct, §35.7); ~~the handoff frame, starting *In progress*~~ (done 8 Oct, §35.8).

### 35.7 Tablet and mobile — the four tabs at 960 and 375 — 7 Oct

Named version first: *Before Program Page tablet and mobile*. Eight screens in the same section (`6443:18721`),
a tablet row and a mobile row under the desktop one, each under its desktop tab.

| Tab | Tablet · 960 (`Responsive = Tablet`) | Mobile · 375 (`Responsive = Mobile`) |
|---|---|---|
| Courses | `6666:24197` | `6668:32886` |
| Certificates | `6666:28128` | `6668:36857` |
| FAQs | `6666:30899` | `6668:39670` |
| About | `6666:33668` | `6668:42581` |

**The shell is Course Detail's** at each breakpoint (§32, §26): the same frame, modes, paddings, compact top bar,
tab sizes (`md` on tablet, `sm` on mobile) and, on mobile, the status bar and home indicator. Only the content
changed. No screen here carries an annotation: the *Navigation is not final* note lives on the top bar's main
component and on one Dashboard screen (§33).

| Part | Tablet | Mobile |
|---|---|---|
| Header | `Course-Header` · **`Kind=Program`** · `Breakpoint=Tablet` since 8 Oct (was the Course variant with overrides — see below) | the same on `Breakpoint=Mobile` |
| Tabs | Courses · Certificates · FAQs · About, no search | the same, `sm` |
| Courses | one column, 912 wide, no sidebar (as on desktop): `Section-Intro` and seven `Course-Row` on **`Breakpoint=Compact`** since 8 Oct (was a local `Course-Row-Compact`), course 2 expanded | one column, 343 wide |
| Certificates | main column 560 + sidebar 320; the two certificates one under the other at 320 | everything stacked; the certificates fill the width |
| FAQs · About | main column 560 with the accordion card + sidebar 320 | the accordion items on `Breakpoint=Mobile`, texts unchanged; then the three cards |
| Program dates · What's included · Program instructor | the sidebar on Certificates, FAQs and About | stacked after the content, as Course Detail does with its sidebar cards |

**Two things the DS could not do on 7 Oct, and what stood in for them. Both stand-ins are gone since 8 Oct** — see
*Since 8 Oct* below; the two bullets are kept as the record of why the variants exist.

- **`Course-Header` has no Program variant below desktop.** The set has four variants: Course × Desktop · Tablet ·
  Mobile, and Program × Desktop only. The eight screens use the **Course** variant with overrides — breadcrumb
  *Programs*, `LMS / Course Type Badge` on *Program*, the title, *7 courses · 4 months · SkillUp*, the progress
  card (*14 %*, *Program progress*, *Course 2 of 7 · in progress*, *1 of 7 courses complete*, no passing line, no
  time left), the partner chips hidden, and `🎨 SKO-Semantics = SKO Dark` set on the instance as the Program
  variant has it. A developer reading the property sees `Kind=Course` on a program page. Library request 19.
- **`Course-Row` has no layout below desktop.** Its card is the DS `LMS / Course Card` · List, which does not fit
  under 1 100 (request 13), and its modules bar is one fixed line: on a phone *You left off in Module 2 of 4* is
  wider than the space left of *Hide modules*, and an instance cannot stack them. Rather than shorten or hide the
  text, a local **`LMS/Platform/Program-Detail/Course-Row-Compact`** (`6665:4206`, components page, section
  *Program Detail · local — to move to the DS*; `Expanded` False · True, `Position`, `Detail`, slot `Modules` — the
  DS row's own properties). Built from the DS row: the card in its **Grid** layout, and a modules bar that
  **wraps** — the detail drops under the position, the button under both. One layout serves 912 and 343. To
  become `Breakpoint=Compact` of the DS row. Library request 20.

  **Changed by Nelson on 7 Oct (night), in the component:** the bar reads *Module 2 of 4* and the module name
  (no *You left off in*, no topic count), the toggle reads *Show* / *Hide*, the card's button fills the width,
  and the *You left off here* badge is gone (library request 23). The in-progress row on the tablet and mobile
  screens was given the same copy. A boolean `topics-done` was added and is linked to nothing yet. **The desktop
  row follows** (Nelson, same night): the DS `Course-Row` now defaults to *Module 2 of 4* + module name with
  *Show* / *Hide*, and the desktop screen reads the same; the DS change needs a publish.

  **Course covers.** Every course thumbnail on My Learning and on this page carries a placeholder image from the
  public SkillUp catalog, set as a fill override with the initials hidden (library request 26). The field is the
  course's own image (`course_image`; `bannerImgSrc` in Learner Home).

**Since 8 Oct — the DS has both, and the screens use them** (library requests 19, 20, 26; two publishes by Nelson).

- **Header:** the 8 screens use `Kind=Program` on their breakpoint; texts and sizes unchanged (960 × 321,
  375 × 525). The variant carries the dark semantics mode itself. The instance carries the same two modes as its
  variant: clearing the mode on the instance left an empty override that cancelled the variant's, and the headers
  rendered light for a few hours on 8 Oct (trap 45 in `figma-api-traps.md`). **One token differed from desktop:**
  the background was `bg/primary-soft` here and `bg/subtle` on the Desktop Program variant. Changed in the DS
  the same evening (request 19), published and accepted: the 8 headers read `bg/subtle`, as desktop.
- **Rows:** the 14 rows on the tablet and mobile Courses screens are the DS `Course-Row` on `Breakpoint=Compact`,
  same properties, no text difference. The mobile expanded row is 942 high (962 before: the detail fits one
  line). The local `Course-Row-Compact` and its section are removed; `topics-done` went with it.
- **Covers on this page** sit on the card's `Image` layer with `Show image` on (21 thumbnails: 7 courses ×
  desktop, tablet, mobile), the thumbnail on its token. **On My Learning they are still a fill on the thumbnail**:
  those 20 cards are direct instances of a Course Card version this file has not accepted yet (request 26).

**Read back on the eight screens:** every text visible on desktop is present on tablet and on mobile, except badge
labels (next paragraph); 0 raw fills, strokes, spacing or radii, 0 unstyled texts, 0 generic layer names outside
instances; no overlaps in the section, which is now 6 000 × 11 808. Each screen was also checked by eye.

⚠︎ **The badges read *Label*.** On these screens, as on every other platform screen since the library update of
7 Oct, the delivery, difficulty, provider and topic-type badges show the DS default text and no icon. It is a
DS defect, not a choice made here — library request 21 — and the screens were left alone so that they heal when
the library is fixed.

~~**Not done:** the handoff frame for the Program page.~~ Built 8 Oct, §35.8.

### 35.8 The handoff frame — in progress — 8 Oct

**`Platform Pages - Program Page - Light`** (`6728:15050`) on *Platform Pages - Ready for Dev*, to the right of the
My Learning frame, under a **WIP** banner (`6728:16401`). Same format as the other handoff frames (§27): the
header block, then one labelled row per tab and one card per screen: card header (sequence, title, version
2026-10-08 · r1, status, designer, this document as RSD), the screen, and the changelog header (description and
the first change).

**Status: `Status/In progress` on all twelve cards.** Only Nelson marks a frame *Ready for DEV*.

| # | Card | Screen source (WIP page, §35.3–35.7) |
|---|---|---|
| 01 · 02 · 03 | Courses · Desktop · Tablet · Mobile | `6443:18722` · `6666:24197` · `6668:32886` |
| 04 · 05 · 06 | Certificates · Desktop · Tablet · Mobile | `6449:21234` · `6666:28128` · `6668:36857` |
| 07 · 08 · 09 | FAQs · Desktop · Tablet · Mobile | `6448:20247` · `6666:30899` · `6668:39670` |
| 10 · 11 · 12 | About · Desktop · Tablet · Mobile | `6448:24409` · `6666:33668` · `6668:42581` |

**The screens are copies**, made on 8 Oct after the library update of that night; each copy is the size of its
source and the frame holds 0 annotations. When a source changes, copy the screen again rather than editing both.
The *Navigation is not final* note is not repeated here: it lives on the top bar's main component and on one
Dashboard screen (§33).

**What each description says, so it is not said twice elsewhere:** on desktop the Courses tab has no sidebar and
the other three carry *Program dates*, *What's included* and *Program instructor* on the right; on tablet that
sidebar stays on the right; on mobile the three cards follow the main column. Below desktop the header is the
Program variant of the header component and the course rows are the DS row on `Breakpoint=Compact` (updated
8 Oct, 12 texts, after the two stand-ins left). The course covers are placeholder images (request 26).

**Built by cloning**: the header block and the Dashboard row of the My Learning frame (three cards, emptied), so
every piece is the design system's handoff component. The outer frame and the rows grid were created and given
the same token bindings (`bg/page`, `Spacing/7xl`, `Spacing/8xl`), read back.

**Open, before this can be marked ready:** where the program's data comes from and the program certificate
(vendor, §35.1, §35.4); the marketing-only content on About (§37.3); navigation (§33). ~~The two stand-ins below desktop~~ are gone since 8 Oct, and the copies in this frame were
updated in place the same day (rows, covers, header mode), not copied again.

## 36. The local components move to the DS — in progress — 6 Oct

**Decisions (Nelson, 6 Oct).** All 35 local components go to the DS library (`c7EUDrQwP8si08aPipDSIV`), to a new
top-level page **`❖ LMS PLATFORM COMPONENTS`** (`22011:941`, right after `❖ LMS COMPONENTS ✅`). Names follow the
14 Sep convention — `LMS/Platform/<Group>/<Component>`, slash the only separator, words joined by a hyphen. This
ends the "local, for peer review, nothing promoted" rule of §33 for these components.

**How.** A real move — instances stay linked, overrides kept — exists only as Figma's own cut and paste between
files; the plugin API works on one file at a time. So: (1) prepared here — renamed, gathered in one section;
(2) **Nelson** cuts the section `MOVE TO DS → ❖ LMS PLATFORM COMPONENTS` (`6569:112566`) on the components page
(it holds the ten component sections and the intro), pastes it on the new DS page, publishes the library and
accepts the update in this file; (3) verified against the baseline below, then arranged on the DS page.
**Cut, not copy** — see §36.2.

**Pre-flight (6 Oct).** 35 components, 96 variants. No local variable, no local style, every dependency inside
the set, every component described. Three have no instances (`Grade-Meter`, `Grade-Summary-Row`, `Score-Row`) and
go anyway.

**Baseline for the check after the move** — instances whose main component is one of the 35, counted with every
page loaded: **1 648** in the file = 790 on *Platform Pages … WIP 2* + 604 on *Ready for Dev* + 254 inside the
components themselves; 640 placed directly, 1 008 nested inside another instance. After the move the 1 394 on the
two pages must all resolve to **library** components, none missing.

*How to count (corrected 6 Oct).* `getInstancesAsync()` is short on its first pass in a session — 1 213, and
1 170 on another run — and right on the second: the nested instances only appear once the first pass has walked
them. Loading every page is needed and is not enough. Run the count twice and keep the second; the per-component
numbers of the second pass were identical on two separate runs. (The earlier note here blamed unloaded pages
alone.)

### 36.1 Old name → new name

| Group | Was | Is |
|---|---|---|
| Course-Detail | `LMS / Course Detail / Course header` · `Course title` · `Course stats` · `Meta` · `Card shell` · `Section intro` · `Progress card` | `LMS/Platform/Course-Detail/Course-Header` · `Course-Title` · `Course-Stats` · `Meta` · `Card-Shell` · `Section-Intro` · `Progress-Card` |
| Course-Detail | `… / Module number` · `Lock` · `Module row` · `Topic row` | `…/Module-Number` · `Lock` · `Module-Row` · `Topic-Row` |
| Course-Detail | `… / Sidebar card` · `Weekly goal card` · `Week day` · `Completion card` | `…/Sidebar-Card` · `Weekly-Goal-Card` · `Week-Day` · `Completion-Card` |
| Course-Detail | `… / Grade meter` · `Grade summary row` · `Score row` · `Thread row` · `Message` | `…/Grade-Meter` · `Grade-Summary-Row` · `Score-Row` · `Thread-Row` · `Message` |
| Course-Detail | `LMS / Dates / Date row` | `LMS/Platform/Course-Detail/Date-Row` |
| Completion | `LMS / Course Detail / Certificate card` · `Certificate document` | `LMS/Platform/Completion/Certificate-Card` · `Certificate-Document` |
| Navigation | `LMS / Platform / Topbar` · `Topbar item` | `LMS/Platform/Navigation/Topbar` · `Topbar-Item` |
| Dashboard | `LMS / Platform / Stat` · `Section header` · `Due item` · `Jump tile` · `Glance card` · `Streak card` · `Resume row` | `LMS/Platform/Dashboard/Stat` · `Section-Header` · `Due-Item` · `Jump-Tile` · `Glance-Card` · `Streak-Card` · `Resume-Row` |
| My-Learning | `LMS / Platform / Program card` · `Browse tile` | `LMS/Platform/My-Learning/Program-Card` · `Browse-Tile` |
| Program-Detail | `LMS / Program Detail / Course row` | `LMS/Platform/Program-Detail/Course-Row` |

Sections before §36 use the old names and the old property name `Type`; the node ids quoted there die with the
move (a component gets a new id in the DS file) — the names above are the way to find them.

**`Type` → `Kind` (Nelson, 6 Oct — done before the move).** The variant property is renamed on the four sets that
had it: `Course-Header` (`Kind` Course · Program), `Sidebar-Card` (Handouts · Dates · Tools · Team · Mentor Q&A ·
Mentor WIP), `Grade-Summary-Row` (Header · Row · Total), `Score-Row` (Section · Subsection). Read back: no set
keeps a `Type` variant; instances 29 → 29 and 42 → 42 (the other two sets have none); the file total is still
1 648. Not touched: the booleans `Show type` (`Date-Row`, `Thread-Row`) and `Show assignment type` (`Date-Row`),
which are not the reserved variant name, and `Theme`, `Urgency`, `From`, `Expanded`, which the convention does not
reserve.

**The two Foundations frames and `Page 118`.** Both Nelson's: the frames were removed because they no longer made
sense, and the DS page is now *DS Structure discussion* (`22009:15222`).

### 36.2 Before the cut — a copy is already in the DS

Found 6 Oct while reading the DS for the intro. The page **`❖ LMS COMPONENTS ✅`** (`1030:33572`) holds a pasted
copy of the whole components page, to the right of the numbered sections (x 22 086 onwards): `Cover`
(`22009:16438`), the ten component sections (`22009:16446` … `22009:17747`) and `Docs and proofs`
(`22009:17587`) — twelve top-level nodes.

| | The copy in the DS | The originals here |
|---|---|---|
| Components | 35, 96 variants, same `LMS/Platform/…` names | 35, 96 variants |
| Keys | different on every one (`Course-Header` `3b09d9a2…`) | (`Course-Header` `b478abef…`) |
| Instances that point to them | 61, all inside the copied `Docs and proofs`; none elsewhere on that page | 1 648 |
| Variant property | still `Type` on the four sets | `Kind` |
| Intro | the old one (*Nine sets… Locked 19 Aug 2026*) | rewritten, §36.3 |
| Published | no | no |

It is a **copy**, not the move: the keys differ, so no screen in this file is linked to it, and publishing it would
not link any. If the section is then cut and pasted as planned, the DS ends up with **two components for each of
the 35 names** — two entries in the assets panel, and no way to tell which one a screen uses without opening it.

**To do before the cut (Nelson, or on his word):** delete the twelve pasted nodes from `❖ LMS COMPONENTS ✅`.
Nothing outside them uses the copies. Not deleted by this session: they were not made here, and the DS is not
written to without his go-ahead.

### 36.3 The intro, rewritten

`Cover` (`5409:326`) described the page as it was on 19 Aug — *LMS / Course Detail — Components*, nine sets, the
old namespace, text styles that no longer exist (`Body/Lead…`), a run id pointing at `/tmp`, and no text style or
token on any of its seven texts. It now reads, on DS styles (`body-small/Semibold`, `headline-small/Semibold`,
`body-medium/Regular` and `Semibold`, `body-small/Regular`) and tokens (`bg/page`, `border/subtle`,
`text/default` · `muted` · `subtle`, `Spacing/*`, `Radius/fixed-lg`), in the shape of the DS *Domain header*:

- **LMS Platform components** — what the page is for, and that the player, the topic content types and the course
  cards stay in `❖ LMS COMPONENTS`.
- **What is here** — dated (*As of 6 Oct 2026*): 35 components, 96 variants, six groups with their counts
  (Course-Detail 21 · Completion 2 · Navigation 2 · Dashboard 7 · My-Learning 2 · Program-Detail 1).
- **Naming** — `LMS/Platform/<Group>/<Component>`, and the reserved property names, `Kind` in place of `Type`.
- **The rules these components follow** — five: tokens only; text by style and nothing under 12 px; icons swap;
  reuse before build; same content on every breakpoint.
- The source of the decisions (this file, §33–§36).

It now sits **inside** the section to move (top-left; the ten sections shifted 980 px right, no overlap), so it
travels with the components. The page's top level is that section and `Docs and proofs`.

**The rules were checked against the 35 before being written** (nested DS instances excluded unless said):

| Rule | Read back |
|---|---|
| Tokens only | 8 344 nodes: every solid fill and stroke is bound, except what belongs to DS instances — the gradient stroke of `Buttons/Button` (8) and the logo artwork (3) |
| Text by style | 323 texts, all styled (one, `Streak-Card` · *Message*, mixes Regular and Semibold — both DS styles) |
| Nothing under 12 px | true of what was built here. Two exceptions, neither a local text: the certificate thumbnail in `Certificate-Card` (a scaled picture of the document, 3–8 px) and the *UP NEXT* overline **inside the DS `LMS / Course Card`** — 11 px, no text style — which `Program-Detail/Course-Row` nests. Library request 18 |
| Reuse before build | DS instances inside the 35: `Badge v2` 54, `Buttons/Button` 35, `Progress bar` 12, `LMS / Completion Status` 12, `LMS / Delivery Mode Badge` 10, `Avatar` 8, `LMS / Topic-Types Badge` 6, `LMS / Difficulty Badge` 5, and others |

### 36.4 After the paste — read back 6 Oct (evening)

Nelson pasted the section into the DS. Read from both files, nothing written:

| | Read back |
|---|---|
| DS page `❖ LMS PLATFORM COMPONENTS` (`22011:941`), section `22009:21763` | 35 components, 96 variants, the `LMS/Platform/…` names, `Kind` on the four sets |
| Variables bound inside it | 3 207, all local to the DS; none remote, none missing |
| Text and effect styles | 343, all local to the DS |
| Nested instances | 314 resolve to DS components; 12 are remote and were remote before too: `Placeholder Logo` (9) and `Skillup_logo` (3), which live in another library |
| Solid paints without a variable | 23: the fill and stroke of the ten section frames (20) and the logo artwork (3). None inside a component's own layers |
| Keys | new on every one (`Course-Header` `be031e16…`; it was `b478abef…` here) |
| Published | no: the ICP file cannot import them by key yet |
| The older copy on `❖ LMS COMPONENTS ✅` (§36.2) | still there (`22009:16438` … `22009:17587`). Nelson deletes it himself before publishing |
| This file | the section `6569:112566` is gone and the components page holds only `Docs and proofs`. No instance is missing its main component, but every one still resolves to the **old, now deleted** component (same old key, `remote: false`) |

**So the paste did not carry the link.** The keys changed, the ICP file is not a published library, and Figma only
re-links a cut and paste between files for components that were published from the source. The screens look
right today because Figma keeps a deleted main component alive for its instances; they will not follow the DS.

**Baseline for the relink**, counted by walking every page and resolving each instance (`getMainComponentAsync`),
6 Oct: **1 242** instances of 32 of the 35 components (`Grade-Meter`, `Grade-Summary-Row` and `Score-Row` have
none) = 528 placed directly + 714 nested. Per page: *Platform Pages - Ready for Dev* 225 + 295, *Platform Pages
V8 - WIP* 273 + 388, *Course Detail — Components* (`Docs and proofs`) 30 + 31. This is lower than the 1 394 of
§36 for the two platform pages (1 181 here); the two counts were made differently (`getInstancesAsync` there) and
were not reconciled. The check after the relink does not depend on either number: **no instance may resolve to a
local `LMS/Platform/…` component.**

**Next, in order.** (1) Nelson deletes the older copy from `❖ LMS COMPONENTS ✅`, publishes the DS and accepts the
update here. (2) A named version of this file, then the relink: every instance placed directly is swapped to the
DS component of the same name and variant, imported by key (`swapComponent` keeps overrides; the nested ones follow
their parent). (3) Read back: zero local `LMS/Platform/…` mains, the per-component counts above against the DS
keys, and a visual check of the handoff cards.

### 36.5 The relink — 6 Oct (night): 654 of 741 done, `Topic-Row` waiting to be published

Nelson deleted the older copy from `❖ LMS COMPONENTS ✅` and published the DS. Accepting the update here re-linked
nothing (661 of 661 instances on the WIP page still on the old components), so the instances were swapped.

**Tokens in the DS, re-read after the publish.** Inside the 35 components (96 variants): 3 051 variable bindings,
all to the DS's own variables — `3. Responsive 📐` 2 263, `🎨 SKO-Semantics` 712, `_Primitives` 76; none remote,
none missing. 334 text and effect styles, all local. The 76 on `_Primitives` are 38 texts in `label-small`
(Medium, Semibold, Regular): the **style itself** binds its size and line height to `_Primitives · Type/size/text-xs`
and `Type/line-height/text-xs` instead of the Responsive collection. Not caused by the move; a DS-wide fix if wanted.

**Method.** Named version first (*Before relink: LMS/Platform instances → DS library*, saved through the Desktop
Bridge — `saveVersionHistoryAsync` is not available to the remote plugin runner). Then, page by page: find every
instance whose main component is a local `LMS/Platform/…`, take the top-most ones (no ancestor that is itself to
be swapped), import the DS set or component by key, pick the variant with the same name, `swapComponent`, and
compare the instance's size and visible text before and after; repeat until a pass finds nothing to swap. The
nested ones follow their parent, except the ones placed in a slot, which the next pass swaps.

| Page | Swapped | Left |
|---|---:|---|
| Course Detail — Components (`Docs and proofs`) | 30 | `Topic-Row` 24 |
| Platform Pages V8 — WIP | 346 | `Topic-Row` 36 |
| Platform Pages — Ready for Dev | 278 | `Topic-Row` 27 |
| **Total** | **654** | **87** |

**`Topic-Row` is not published.** `getPublishStatusAsync` on the DS: 34 `CURRENT`, `Course-Detail/Topic-Row`
`UNPUBLISHED`; importing its key fails. Its 87 instances (24 placed directly, 63 nested) still resolve to the old
local component. To finish: publish it, then run the same pass.

**Nine instances lost an override of a nested badge and were repaired** (found by the before/after comparison):
six `Dashboard/Due-Item` (*Peer review…*, on both platform pages) whose `Status` badge went back to *Live* with
the dot — restored to *Due 11:59*, dot off, colour had stayed Warning; three `Sidebar-Card · Kind=Dates`
(*Program dates*) whose first `Relative` badge went back to *In 3 days* — restored to *Started*. All nine read
back with the same size and text as before the swap. Trap: a swap can reset the properties of a nested instance's
own nested base (`_Badge base`: `Text`, `Dot`) while the nested instance keeps its variant.

**Checked by eye:** the Dashboard desktop frame renders the same as on 1 Oct; the My Learning · Programs grid
render is byte-identical to the 1 Oct one. Not checked: non-text overrides that change neither text nor size
(a hidden icon, a colour) on the other screens.

### 36.6 `Topic-Row` published and relinked — 6 Oct (late): 741 of 741

**Why it would not publish.** Figma listed it under *Invalid assets · Unused properties*: the set had an
instance-swap property `Icon` (default `play-circle`) that no layer of the six variants used. It was already
unused in the local component here, so the paste did not cause it; the icon in the row comes from the nested
`LMS / Topic-Types Badge` (`Type`). 24 instances carried a value in it (`play-circle`, `book-open-01`,
`help-circle`, `beaker-02`) that drew nothing. Nelson deleted the property and published. The set now has
`Title`, `Show meta`, `State`, `Breakpoint`.

**The pass.** Named version first (*Before relink: Topic-Row instances → DS library*), then the method of §36.5,
with the comparison widened to the main component of every nested instance.

| Page | Swapped | Differences | Local `LMS/Platform/…` left |
|---|---:|---:|---:|
| Course Detail — Components (`Docs and proofs`) | 24 (direct) | 0 | 0 |
| Platform Pages V8 — WIP | 36 (nested) | 0 | 0 |
| Platform Pages — Ready for Dev | 27 (nested) | 0 | 0 |
| **Total** | **87** | **0** | **0** |

With the 654 of §36.5, all 741 instances on the three pages resolve to the DS library. Not covered: pages outside
these three (the DISCOVERY pages are left alone on purpose). Not checked by eye after this pass.

**Seen in the same Publish dialog, not touched:** `Button` (*Unused properties*) and `Card_Event` (*Conflicting
property values*) are also invalid assets in the DS.

## 37. The platform pages against Open edX — what each element reads — 7 Oct

**Asked (Nelson, 7 Oct):** make sure everything the platform screens show is compatible with edX — the Ready for
Dev page (`4340:322`), the My Learning and Dashboard sources (`6374:16005`) and the Program Detail sources
(`6443:18721`). Course Detail was mapped field by field in §1–§32; My Learning and the Dashboard never were — §33
records how they were built, not what backs them. This section is that map, and what changed because of it.

**Reading the marks.** ✓ a stock Open edX API returns it. ◐ it can be produced, under a condition that is named
(a flag, content that has to be authored, one call per course, a second service). ✗ nothing in Open edX stores or
returns it.

### 37.1 Evidence

**The dev environment (`devcourses.skillup.online`), public requests, no credentials** — status codes only: 401
means the route exists and wants a login, 404 that it does not exist.

| Route | Status | What it tells |
|---|---|---|
| `/api/learner_home/init` | 401 | the Learner Home API is there |
| `/api/mobile/v4/users/{u}/course_enrollments/` | 401 | Mobile API **v4** (v5 → 404) |
| `/api/mobile/v1/notifications/create-token/` | 401 | a route that first shipped in **Sumac** |
| `/api/course_home/progress/…` · `/dates/…` · `/save_course_goal` | 401 | per-course progress, dates and weekly goal |
| `/api/course_home/outline/…` · `/course_metadata/…` · `/api/courseware/course/…` | 200 | public payloads; `effort: "20 hours"` and `pacing` carry values; `course_goals` and `celebrations` are there as fields, empty for a visitor who is not enrolled |
| `/api/notifications/count/` | 401 | the notifications app |
| `/api/certificates/v0/certificates/{u}/` · `/api/grades/v1/courses/…` · `/api/bookmarks/v1/bookmarks/` | 401 | certificates, grades, bookmarks |
| `/api/discussion/v1/courses/…` | 401 | the forum |
| `/api/dashboard/v0/programs/{uuid}/progress_details/` | 401 | program progress (§35.1) |
| `/api/dashboard/v0/programs/` (no id) · `/api/programs/v1/programs/` | 404 | no list of a learner's programs outside enterprise |

Mobile v4 exists in Sumac and not in Redwood (`mobile_api/utils.py`), so the environment is **Sumac or later**.

**The source**, `openedx/edx-platform` at `open-release/sumac.master` (and `course-discovery` at the same tag):
`learner_home/serializers.py`, `mobile_api/users/serializers.py` and `views.py`, `course_home_api/{progress,outline,
dates}/serializers.py`, `learner_dashboard/api/v0/{urls,views}.py`, `notifications/{urls,views,base_notification}.py`,
`course_goals/models.py`, `student/models/user.py` (`UserCelebration`), `courseware/courses.py`
(`get_course_assignments`), and Discovery's `api/serializers.py` and `course_metadata/models.py`.

### 37.2 What Open edX gives a learner's home, call by call

| Call | Returns | Does not return |
|---|---|---|
| **Learner Home** `GET /api/learner_home/init` — one call, every enrolment | course name, number, image; provider name; `startDate`, `endDate`, `isStarted`, `isArchived`; `homeUrl`, `resumeUrl`, `progressUrl`; `hasStarted`, `lastEnrolled`, `mode`; `gradeData.isPassing`; `certificate` (`isEarned`, `isDownloadable`, `certPreviewUrl`, `availableDate`); `programs.relatedPrograms[]` (title, type, `numberOfCourses`, url, provider, banner) | a completion percentage, the name of the next unit, level, effort, delivery mode |
| **Mobile enrolments** `GET /api/mobile/v4/users/{u}/course_enrollments/` — one call | for the **primary** course (the latest one touched): `course_status.last_visited_unit_display_name`, `course_progress` (assignments completed of total), `course_assignments.future_assignments` and `past_assignments`; for the others, `course_progress` on request | content completion; anything on the primary course's level for the other courses |
| **Progress** `GET /api/course_home/progress/{course}` — one call **per course** | `completion_summary` (complete · incomplete · locked), `course_grade.percent`, `grading_policy`, `certificate_data` | — |
| **Dates** `GET /api/course_home/dates/{course}` — one call **per course** | `course_date_blocks[]`: assignment deadlines with `title`, `date`, `assignment_type`, `complete`, `link`; ORA steps as *"{title} (Peer Assessment)"* | dates across courses — no route does that in Sumac, and none was found on `master` either |
| **Courses** `GET /api/courses/v1/courses/{course}` | `effort`, `pacing`, `start`, `end`, `short_description`, media | level |
| **Notifications** `GET /api/notifications/count/` | `count`, and `count_by_app_name` for `discussion`, `updates`, `grading`; needs the notifications flag on | a count of mentions — there is no such notification type |
| **Program progress** `GET /api/dashboard/v0/programs/{uuid}/progress_details/` — one call per program | `program_data`, `course_data` as **completed · in_progress · not_started**, `certificate_data` | a percentage, weeks, lessons, a cohort |
| **Discovery** `GET /api/v1/programs/{uuid}/` | `title`, `subtitle`, `type`, `overview`, `faq[]`, `staff[]`, `expected_learning_items`, `weeks_to_complete`, `total_hours_of_effort`, `courses[]` with their runs (`start`, `end`, `pacing_type`, `level_type`) | a program start or end, the counts under *What's included*, *What You Will Create*, *Exercises to Explore* |

**What Open edX stores and does not return.** The streak — `UserCelebration.streak_length`, `longest_ever_streak`,
`last_day_of_streak` — reaches the browser only as `streak_length_to_celebrate`, on the day a streak hits 3. Days
active per course (`UserActivity`) reach nobody (§17.2, open question 9). **What it does not store at all:**
minutes learned, XP or any ranking, attendance, a mentor's calendar, a subscription tier.

### 37.3 Decisions (Nelson, 7 Oct)

| Question | Decision |
|---|---|
| Dashboard — *Today at a glance* and the streak have no source | **Replace the glance stats with real totals; the streak goes** |
| *Due this week* — deadlines exist per course only, none authored today, the live session has no source | **Keep it, assignments only** |
| Top bar — Calendar, Discussion, Services and the two counters | **Leave as it is**; recorded as open (§37.6) |
| Program page — content that only the marketing backend has | **Keep it, waiting for the vendor** (§35.1's question) |

### 37.4 Element by element

**Dashboard**

| Element | Source | |
|---|---|---|
| Greeting, the learner's name | `/api/user/v1/accounts/{u}` | ✓ |
| Glance — *Courses in progress 3 · of 5 enrolled* | Learner Home: enrolments where `hasStarted` and no certificate | ✓ |
| Glance — *Courses completed 1* | Learner Home: `certificate.isEarned` (or `gradeData.isPassing`) | ✓ |
| Glance — *Certificates 1 · ready to download* | Learner Home: `certificate.isDownloadable` | ✓ |
| Glance — *Programs 2 · 1 in progress* | the distinct `relatedPrograms`; *in progress* from `progress_details`, one call per program | ◐ |
| ~~Today's lessons · Live attendance · Week time learned · XP this week · Top 8% in cohort~~ | not stored | ✗ removed |
| ~~Streak card — 12 days, the week, *13 hours left in the day*~~ | stored, not returned | ✗ removed |
| *Due this week* — *Persona research draft (Peer Assessment)*, *Assignment 02 · Audience segmentation* | Dates API of each enrolled course: `title`, `date`, `assignment_type`; the course name from the enrolment | ◐ one call per course; empty until content carries due dates (§14.2) |
| ~~*Live Q&A … Attendance required*~~ | VILT is out of the MVP; no attendance anywhere | ✗ removed |
| *Pick up where you left off* — title, **Resume** | Learner Home: `courseName`, `resumeUrl` | ✓ |
| … the percentage | Progress API `completion_summary` | ◐ one call per course |
| … the delivery badge | `pacing` → *Flexible Learning*. *Flexible + Live* and *Live Sessions* have no marker (§18.1) | ✓ as *Flexible Learning* only |
| Jump · *Discussion — 12 unread updates in your courses* | `count_by_app_name.discussion` | ◐ notifications flag |
| Jump · *Certificates — 3 in progress · 1 to download* | Learner Home | ✓ |
| Jump · *Profile — Your details · Account settings* | the Profile and Account pages | ✓ |
| ~~Jump · *Book a mentor — Mara has Thursday open*~~ | no mentor assignment, no calendar (open questions 1 and 13) | ✗ removed |

**My Learning**

| Element | Source | |
|---|---|---|
| Stats — *In progress 3 · Completed 1 · Certificates 1* | Learner Home, as the glance card | ✓ |
| ~~*Daily goals completed · Items completed · Minutes learned*~~ | not stored (and the labels did not match their values) | ✗ replaced |
| Tabs — *Programs 2 · Courses 5*, search, grid / list | counts from Learner Home; the search and the toggle are the page's own | ✓ |
| Course card — title, provider, *COURSE* | Learner Home | ✓ |
| … *Beginner · Intermediate · Advanced* | Discovery `level_type` (deployed; whether it is filled in is the vendor's to confirm, §18) | ◐ |
| … delivery badge | `pacing` → *Flexible Learning* | ✓ |
| … *5% complete*, the bar | Progress API | ◐ one call per course |
| … *10 hours total* | Courses API `effort` | ✓ |
| ~~… *9 min left*~~ | no field; would need every block's `effort_time` and the learner's completion | ✗ replaced by total effort |
| … *Starts Apr 28* · *Not started* | `startDate`, `hasStarted` | ✓ |
| … *UP NEXT* and the unit's name | Mobile v4 `last_visited_unit_display_name` for the primary course; the others need their own call | ◐ |
| … the topic-type badge | derived from the block (§12.5) | ◐ |
| … *Complete* · *CERTIFICATE Issued 12 Sep 2026* · **Review** | Learner Home `certificate`; the date from the Certificates API | ✓ |
| *Browse catalog* | Learner Home `platformSettings.courseSearchUrl` | ✓ |
| Program card — title, *Program · 7 courses* | `relatedPrograms`: `title`, `numberOfCourses` | ✓ |
| … *1 of 7 courses complete*, *14%* | `progress_details`: completed ÷ all courses — the same rule as the Program page (§35.3) | ✓ one call per program |
| … *Up next · Course 2 · …*, **Continue** | the first course in `in_progress` | ✓ |
| … *Not started · Starts May 12* | the earliest start among the program's course runs | ◐ |
| ~~… *Cohort Apr 2026* · *Week 4/32* · *Lessons 10/64* · *6 courses + capstone* · *27%*~~ | no cohort, no weeks, no lesson totals; the capstone is the seventh course | ✗ removed or corrected |

**Program Detail** (§35 stands; one change). The seven course rows read *Flexible + Live* under a header that
reads *Flexible Learning* — now *Flexible Learning*, the only value `pacing` can give. **Kept, by decision, and not
Open edX:** the counts under *What's included*, *What You Will Create*, *Exercises to Explore* and the eight-part
overview come from the marketing backend's payload; Discovery has one `overview`, `faq`, `staff` and
`expected_learning_items`. Program dates are derived from the course runs.

**Course Detail** (Ready for Dev, §1–§32). Two pieces of sample content were reworded (last row; Nelson, 7 Oct).
What on those screens is still ◐ or ✗ was already in the register of §25:

| On the screens | Depends on |
|---|---|
| The week strip in the Weekly goal card — *3 of 3 days this week*, *Last week: 2 of 3* | open question 9: days active are not returned. The fallback of §17.3 is the card without the strip |
| Every duration — *3h 20m*, *18 min*, *~ 8h 40m left* | open question 2: nobody authors `effort_time`. *~ 14 hours* is `effort` and is ✓ |
| *David Chen · your mentor · typically responds within 1 day* | open question 1; a response time is not stored |
| *Beginner*, the Course team card | Discovery (`level_type`, `CourseRun.staff`), question 7 — deployed, content to confirm |
| *Complete "Module 3 · Checkpoint" to unlock* | open question 3: the outline does not name the prerequisite |
| ~~A *Live Session* topic and an update that mentions *last week's live Q&A*~~ | **reworded 7 Oct.** *Designing the prototype* is a **Video** (`Type=Video` on the `LMS / Topic-Types Badge`, a type the blocks can tell, §12.5). The update reads *The control chart worksheet in Handouts has a corrected example. The checkpoint at the end of Module 3 counts towards your grade and unlocks Module 4.* — nothing opens on a date in a self-paced course (§18.2), so *Module 3 is open* went too |
| The Weekly goal card itself | open question 8: switched off on every SkillUp course seen so far (§17.1). A request without a login cannot tell — the field is `false` for anyone not enrolled |

### 37.5 What changed in Figma — 7 Oct

Named version first: *Before edX compatibility pass: My Learning, Dashboard and Program screens*. The same edit ran
on each source screen and on its handoff copy — 22 screens — and every value below was read back.

- **Dashboard × 6.** `Glance-Card`: title *Your learning at a glance*, the four stats of §37.4. `Streak-Card`
  removed; the glance card fills the row — since 7 Oct (night) as four stats in one line on desktop and tablet
  and 2 × 2 on mobile, the two variants Nelson added to the DS card (`Today-at-a-glance`, `Breakpoint` =
  Desktop · Mobile). `Due-Item` *Live Q&A* removed; the other two retitled as the Dates API
  titles them. `Jump-Tile` *Book a mentor* removed (three tiles), the three descriptions rewritten. Delivery badges
  → *Flexible Learning*. Desktop: the Due column is 440 (was 460) — with the wider badge, the longest course row
  touched its progress bar.
- **My Learning · Courses × 8.** The three header `Stat`s. `LMS / Course Card`: `Time-Left` → total effort on the
  three courses in progress; *Intro to Product Analytics* is now the **completed** course (full bar,
  *CERTIFICATE · Issued 12 Sep 2026*, **Review**) so that the totals agree with the list: 3 in progress, 1 complete,
  1 not started. Delivery badges → *Flexible Learning* (two were *Flexible Learning* variants with the label typed
  over).
- **My Learning · Programs × 8.** The header `Stat`s. `Program-Card`: `Show cohort` off, `Week` and `Lessons`
  hidden, eyebrow *Program · 7 courses* / *· 5 courses*, `Courses` *1 of 7 courses complete* / *0 of 5…*, 27 % →
  **14 %** (bar at its 10 % step, library request 15), *Up next* names the course. Delivery badges.
- **Program Detail · Courses.** Nine delivery badges read *Flexible Learning*.
- **Handoff** (`6408:35150`, still *In progress*): each of the 11 cards has a 7 Oct changelog entry; four screen
  descriptions rewritten (they still described the streak, four shortcuts, a hidden badge and the cohort). No
  overlaps on the page.

- **Course Detail · Course tab × 7** (Technical, the three `★ ENTRY` breakpoints, handoff cards 01–03), after
  Nelson's go-ahead and a second named version (*Before Course Detail sample fix…*): the topic badge and the
  course update of §37.4. Row and screen sizes unchanged; no text on those screens mentions a live session any
  more; cards 01–03 carry a 7 Oct entry and are still *Ready for DEV*.

**Not changed, on purpose:** the top bar; the Program page's marketing content; everything else on Course Detail.

### 37.6 Open after this pass

| # | What | Whose |
|---|---|---|
| 1 | **Top bar.** *My Learning 4* and *Calendar 3* have no defined source; *Learner · Pro* has none either (no tier in Open edX); *Calendar* and *Discussion* have no global page behind them (dates and forums are per course); *Services* is not Open edX | Nelson |
| 2 | **Program page source** — Discovery plus `progress_details`, or the marketing backend. Until answered, *What's included*, *What You Will Create* and *Exercises to Explore* are not guaranteed | Vendor |
| 3 | **A percentage per course costs a call per course** (Progress API). A learner with 12 enrolments is 13 requests for My Learning. Worth one vendor question: a completion figure on Learner Home | Vendor |
| 4 | ~~**The DS components still carry the old defaults**~~ Done 8 Oct in the DS, on Nelson's go-ahead (changelog, same day): the glance card, `Stat`, `Due-Item`, `Program-Card`, `Jump-Tile`, `Resume-Row`, the Course Card's effort line and the Course Row's delivery badge default to what the screens show; `Streak-Card` carries a note that nothing backs it. The glance card has a Desktop variant with four stats in a line. Left as it is: `Program-Card` still has the `Week`, `Lessons` and `Show cohort` properties (hidden or off by default), and one `Percent` default for both states | Nelson |
| 5 | **The prototype** (`/platform/*`) still shows the earlier data, marked *SAMPLE* | prototype session |
| 6 | `PRODUCT.md` says there is *no API today for due dates*. More exactly: there is one per course and none across courses, and no SkillUp content has due dates yet | Nelson |
| 7 | ~~Tablet and mobile for the Program page~~ done 7 Oct (§35.7); ~~its handoff frame~~ built 8 Oct, in progress (§35.8) | — |
