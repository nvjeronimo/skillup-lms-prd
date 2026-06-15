# Glossary

Read this before the stories. The content hierarchy and the topic-type vocabulary are the most common sources of misalignment between design, BA, and engineering. Lock these down first.

## Content hierarchy (5 levels)

```
Program (optional)
  └─ Course
       └─ Module
            └─ Lesson (optional)
                 └─ Topic ← the playable unit
```

| Term | Definition | Example |
|---|---|---|
| **Program** | A multi-course offering with a common goal, sometimes co-branded with a provider. Optional — a Course can ship standalone. | "AI for Product Managers" program contains 4 courses |
| **Course** | A standalone learning unit with a start/end, a certificate, and a single delivery mode (Self-paced / VILT / Hybrid). | "Six Sigma for Process Improvement" |
| **Module** | A grouping of related topics inside a course. Typically 3-9 modules per course. | "Module 03 · DMAIC for process improvement" |
| **Lesson** | An optional grouping inside a Module. Used in courses with deep content. Many courses skip this layer — the sidebar collapses to 4 levels. | "Lesson 1 · Define and measure" |
| **Topic** | The playable, completable unit. Has a single topic-type. A Topic is what the learner clicks to enter the player. | "Introduction to the DMAIC methodology" (Video, 3m 20s) |
| **Section** (rare) | An informal subdivision inside long modules. Used cosmetically, not for tracking. | "Define" section within Module 03 |

## Topic types (12)

The topic type drives icon, duration prefix, completion logic, and behavior. **The active topic's type in the sidebar must match the player chrome** — never show a Video player with a Reading badge.

| Type | Icon | Player chrome | Completion | Duration prefix |
|---|---|---|---|---|
| **Video** | video-recorder | Video player + transcript/notes/downloads tabs | Auto when video ends ≥ 90% | exact (e.g., "3m 20s") |
| **Reading** | book-open-01 | Text + downloads | Manual "Mark as complete" | "approx. 8 min" |
| **Podcast** | headphones-01 | Audio player + transcript | Auto when audio ends ≥ 90% | exact |
| **Live Session (VILT)** | video-recorder + LIVE dot | Pre-live / Live / Recording chrome | Attendance OR watch recording | scheduled time |
| **Recording** | video-recorder | Recorded VILT replay | Auto on 90% watched | exact |
| **Practice Quiz** | edit | Quiz UI, no grading impact | On submit | "approx. 6 min" |
| **Graded Assignment** | award-01 | Quiz UI, counts toward grade | On submit | "approx. X min" |
| **Peer-graded Assignment** | users | Submission + peer review | After submission + review of N peers | "approx. X min" |
| **Discussion Prompt** | message-circle-01 | Thread UI | After participating (1 post) | n/a |
| **Lab** | flask | Hands-on activity | Manual mark complete | "approx. X min" |
| **Activity** | clipboard | Worksheet/exercise | Manual mark complete | "approx. X min" |
| **Project** | folder | Multi-step project | Submission | "approx. X hours" |

**`approx.` rule**: Use only on topic types where the system cannot measure exact time (Reading, Lab, Activity, Practice, etc.). Never on Video, Recording, Live Sessions (scheduled), or timed Quizzes.

## Delivery modes

| Mode | Meaning |
|---|---|
| **Self-paced** | Learner controls pace. No live components. |
| **VILT** (Virtual Instructor-Led Training) | Scheduled live sessions are required. Hybrid of recorded + live. |
| **Hybrid** | Self-paced content + optional live sessions (mentor office hours, etc.) |

## States and statuses

### Topic state
| State | UI | When |
|---|---|---|
| Not Started | empty circle | Learner hasn't entered the topic |
| In Progress | partial fill | Learner entered but didn't complete |
| Completed | check icon | Auto or manual completion fired |
| Locked | lock icon | Prerequisites not met OR cohort hasn't reached this date yet |
| Live now | red dot | Live session is happening within the next/current 15-minute window |
| Optional | small "Optional" badge | Flagged optional — does not count toward completion gating |

### Module state
| State | UI | When |
|---|---|---|
| Locked | gray + lock | Previous module incomplete in a gated course |
| Active | brand color | At least one topic in progress |
| Completed | green + check on header | 100% of required topics done |

### Course state
| State | UI | When |
|---|---|---|
| Not Started | gray badge | Enrolled but no topic touched |
| In Progress | progress bar % | At least one topic done |
| Completed | green + cert available | All required topics + grade threshold met |

## Roles

| Role | What they do | What they see |
|---|---|---|
| **Learner** | Consumes content, completes topics, talks to mentor | Standard course player |
| **Mentor** | 1:1 messaging with learners (NOT booked sessions) | Mentor dashboard (out of scope Phase 1) |
| **Instructor** | Runs VILT live sessions, grades assignments | Instructor dashboard (out of scope Phase 1) |
| **Admin** | Manages cohorts, courses, programs | Admin panel (out of scope Phase 1) |

## Key concepts

| Term | Definition |
|---|---|
| **Cohort** | A group of learners going through a VILT course together on the same schedule |
| **Cohort pace** | Where the average learner in this cohort is — shown vs the user's pace on KPI strip |
| **Mentor messaging** | Unlimited 1:1 async messaging with assigned mentor. NOT scheduled sessions. |
| **Bookmark** | Save a topic for later reference. Pure marker — does not affect progress. |
| **Note** | Text annotation anchored to a transcript line (Video lessons). Tagged + searchable. |
| **Saved item** | Aggregator of Bookmarks + Notes in one overlay panel |
| **Notification** | System-generated message: discussion replies, grades, content updates, live alerts |
| **Provider** | The org delivering the course (Wharton, Maven, SkillUp, etc.) — shown on course card |
| **Certificate** | PDF awarded on course completion. Shareable + printable. |

## Engagement / progress concepts

| Term | Calculation |
|---|---|
| **Topic time** | Sum of session durations spent inside that topic |
| **Module progress %** | (completed required topics) / (total required topics) × 100. Optional topics excluded. |
| **Course progress %** | Same formula at course level |
| **Overall progress** | Same as course progress when viewing one course |
| **Time remaining (module)** | Sum of remaining topic durations. Uses exact for Video/Recording/Quiz, `approx.` total elsewhere. |
| **Pace signal** | Compares user's elapsed time vs cohort pace. States: Ahead / On track / Behind |

## Engineering vocabulary BAs will encounter

| Term | What it is |
|---|---|
| **UUI** | Untitled UI — the third-party design system we build on |
| **LMS Extension Components** | Our custom components built on UUI primitives. Source of truth for product UI. |
| **Token** | Named design value (color, spacing, font). Eg `LMS/Background/bg-brand-solid` |
| **Variant** | A pre-built version of a component (e.g., Button Primary vs Secondary) |
| **Final Screens** | The 7 build-target screens in Figma — what the prototype renders |
| **Component spec** | The Figma-side documentation frame for a component |
