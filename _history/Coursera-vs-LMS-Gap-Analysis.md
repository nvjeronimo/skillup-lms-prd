# Coursera Immersive vs Our LMS — Gap Analysis

Based on 22 screenshots in `Coursera LMS immersive course/`. Focus: features and options inside the immersive course player + module/lesson types.

## 1. Topic types — Coursera's full roster

Coursera surfaces these distinct content types inside lessons. Each has its own icon and status semantics.

| Coursera type | We have it? | Notes |
|---|---|---|
| Video | Yes | Match |
| Reading | Yes | Match |
| Practice Assignment | Partial | We have "Quiz" — Coursera differentiates "Practice" (no weight, unlimited retries) vs "Graded" (weighted, attempts capped). We should split. |
| Graded Assignment | Partial | Coursera's weight = % of final grade. We don't surface weight today. |
| Peer-graded Assignment | **Missing** | Two-step: submit + review N peers' work. Both gradeable. |
| Review Your Peers | **Missing** | Companion step to peer-graded; lives as its own row in the lesson list. |
| Discussion Prompt | **Missing** | A topic that IS a discussion (vs Discussion as a tab beside a video). Learner posts as the completion gate. |
| Ungraded Plugin / Activity | Partial | We have "Activity" — Coursera adds "Plugin" semantics (external tool embed). |
| Podcast | We have | Coursera doesn't seem to use this type explicitly. Our SKO advantage. |
| Lab | We have | Coursera doesn't expose this as a first-class type. |
| VILT (live session) | We have | Coursera has its own pattern for live but it's separate from the immersive flow. |
| Project | We have | Coursera typically wraps these as peer-graded assignments. |

**Recommendation:** add 3 new topic types — `Practice Assignment` (split from Quiz), `Peer-graded Assignment`, `Discussion Prompt`. The `Review Your Peers` step is a derivative of Peer-graded — likely a sub-row rather than a new type.

## 2. Optional vs Required marker

Coursera prefixes lesson titles with `Opcional · ...` (or `Optional · ...`) for content that's gated outside the completion path. We don't surface this distinction today. **Add an `optional` flag to topics** — render as a subtle prefix or badge.

## 3. Granular time-left breakdown on module headers

Coursera's module home page shows:

> 20 min of videos left · 1h 47m of readings left · 1 graded assignment left

We currently show overall progress (e.g., "Module 2 of 3 · 4 of 6 units complete"). **Add a typed time/work breakdown** to module headers — videos remaining, readings remaining, graded assignments remaining. Especially useful when learners are budgeting time for a session.

## 4. Sidebar — section/group within a module

Coursera's immersive sidebar groups topics inside a module into named sections:

- Module → Section → Topics

For example, Module 2 has 4 sections: "Applying visual design principles to mockups (part 1)" / "(part 2)" / "Refine mockup designs" / "Week 2 Review". Each is collapsible.

We currently flatten module → topics. **Consider adding a "lesson section" level** between module and topic. Optional — only used when modules have >10-15 topics that benefit from grouping. Don't force it on short modules.

## 5. Course-level navigation (left side, not in immersive)

Coursera has a persistent course-level nav with these sections:

- Course Material (the topic outline)
- **Grades** — per-assignment gradebook (status, due date, weight, grade)
- **Notes** — all my notes across the course in one place
- **Discussion Forums** — course-level forum (separate from in-video discussions)
- **Messages** — instructor announcements
- **Resources** — long-form FAQ / external links
- Course Info

We have a tab-style nav inside the immersive (Transcript / Notes / Downloads / Discussion). **The course-level versions are missing.** Specifically:
- **Grades page** with weights, due dates, attempts, scores — central gradebook
- **All Notes** page — collect every note across topics
- **Course-level Discussion Forums** with per-week sub-forums + FAQ + moderators + "Posts for you" / "Your activity" tabs
- **Messages/Inbox** — instructor announcements with translate button
- **Resources** — course-level reference docs

These are big features. Probably belong in a "Course Hub" page outside immersive, with a way to drop into immersive for a specific topic.

## 6. Practice Quiz / Assignment results screen

Coursera's results screen has elements we should match:

- "To pass you need at least 67%. We keep your highest score." — both pass threshold and retention policy visible
- Attempts: Unlimited / X tries — explicit count
- Score in red/green by pass status
- View submission / See feedback as separate actions
- Retry CTA
- Like / Dislike / Report an issue footer (engagement feedback)

We have Quiz Results variant but it doesn't surface pass threshold, attempts left, or content-quality feedback. **Add: pass threshold display, attempts counter, View submission link, See feedback link, content rating widget.**

## 7. Goals / Streaks / Gamification

Coursera dashboard has structured engagement features:

- **Today's goals** widget: "Complete any 3 learning items · 0/3" / "Score 80% on an assignment" / "Progress toward your weekly streak"
- **Weekly activity** widget: M Tu W Th F Sa Su day buttons + items completed + minutes learned + "Set your learning plan" CTA
- Calendar with two visual indicators: "1+ daily goals completed" (dot) vs "All daily goals completed" (yellow border)
- **Last 4 weeks** stats: daily goals, items completed, minutes learned
- Motivational copy: "Learners with goals are 75% more likely to complete their courses."

We don't have gamification today (deferred from our V4 brainstorm). **If we add it, copy Coursera's structure** — daily goals, weekly streak, calendar indicator, "set your learning plan" cadence.

## 8. Card-level overflow menu (My Learning)

Coursera course cards on the dashboard have an overflow menu with:
- Upgrade (paywall context — N/A for us)
- **Rate** — learner rating
- **Share** — share course link
- **Unenroll** — remove from My Learning

We have "More" but I don't think we wire these specific actions. **Add: Rate, Share, Unenroll on My Learning card overflow.**

## 9. Featured "Next topic" mini-card inside course card

Each Coursera course card surfaces the NEXT topic inside it — provider logo + course title on the left, NEXT TOPIC mini-card on the right with type/duration + "Get started" or "Resume" CTA. We have a single CTA today; Coursera's pattern is more action-forward. **Adopt the mini-card pattern.**

## 10. Theater mode / video player options

Coursera's player has these features we should check we have:
- Speed control (0.5x / 1x / 1.25x / 1.5x / 2x)
- CC / subtitles
- Picture-in-picture
- Fullscreen
- "Theater mode" (immersive video with dark surround) — Coursera flags it via tooltip suggestion
- Language selector for transcript translation

Our player has the basics (play/pause/CC/fullscreen + 1x speed). Verify the rest. **Theater mode and transcript translation are nice-to-haves.**

## 11. Translate to English link on instructor messages

Coursera adds a "Translate to English" link to instructor messages and forum posts. **If we serve a multilingual learner base, this is a meaningful feature.**

## 12. Per-content engagement: Like / Dislike / Report

After Coursera assignments and other content, learners can rate the content:
- 👍 Like / 👎 Dislike
- 🚩 Report an issue

Useful for instructional design feedback at scale. **Consider adding for major content types** (videos, assignments, readings — anything that's substantial work).

---

## Recommended sprint sequence (priority order)

1. **P0 — Add `Optional` flag** to topics + render in lesson list (small, high value)
2. **P0 — Add Practice Assignment vs Graded Assignment distinction** (split the Quiz type, expose weight + attempts on Graded)
3. **P1 — Granular module time-left breakdown** ("20 min videos · 1h 47m readings · 1 graded left")
4. **P1 — Quiz Results enhancements** — pass threshold, attempts counter, View submission + See feedback links
5. **P2 — Peer-graded Assignment topic type** + Review Your Peers companion row
6. **P2 — Discussion Prompt topic type** (post-as-completion-gate)
7. **P2 — My Learning card overflow** (Rate, Share, Unenroll)
8. **P3 — Course-level pages** (Grades / Notes / Forum / Messages / Resources) — big scope, treat as a Course Hub separate page
9. **P3 — Goals / Streak / Weekly Activity widget** — gamification layer
10. **P4 — Section level inside modules** (optional grouping for long modules)
11. **P4 — Like / Dislike / Report content feedback** widget
12. **P4 — Translate transcripts + messages** — only if multilingual is in scope

## Two things to push back on before copying

1. **Coursera is built for cohort-paced + peer-graded courses.** A lot of its features (peer review, weekly forums, weekly challenges with hard deadlines) assume scheduled cohorts. Our LMS is self-paced. Some features (peer-graded assignments, week-based forum sections, hard weekly deadlines) don't transfer 1:1. Be careful about adopting structure that implies a cohort experience our content doesn't actually deliver.

2. **The course-level navigation (Grades / Notes / Forum / Messages / Resources) is heavy.** Coursera's value depends on being a marketplace with cohorts of strangers. Our LMS is closer to an internal corporate enablement tool. The course-level Discussion Forums and Messages may not have enough traffic to feel populated — empty forums look worse than no forum. Build only if you have evidence the content density will be there.
