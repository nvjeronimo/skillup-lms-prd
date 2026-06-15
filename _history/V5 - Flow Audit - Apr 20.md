# V5 Flow Audit — Program PD, Course PD, Locked Course PD

Apr 20, 2026. Wireframe-stage audit. No UI polish comments. Focus on structure, blind spots, and redundancy across tabs.

## The punch list up front

Four structural issues I'd fix before calling this flow done:

1. Three surfaces show mentor sessions (Mentoring tab, Calendar tab, Live Sessions tab if you list them there). Pick one canonical surface, let the others point.
2. Course PD has Instructors AND Reviews AND About as separate tabs. About already contains both. That's redundant for enrolled learners.
3. No community/discussion surface anywhere. For a cohort-based program this is a functional gap, not a polish issue.
4. No resource/downloads surface at program or course level. Everything is buried inside topics.

## Program PD — tab by tab

### Courses (default)
**Verdict:** Essential. Keep.

**Blind spots:**
- No program-level progress strip above or inside the tab. The hero has KPIs but there's no "you are here on the journey" signal on the Courses list itself (e.g. which course is live now, which unlocks next, how many days until).
- Locked courses look clickable in current state. Good. But no visible unlock date — just "unlocks when Course N is complete." If the learner is behind pace, they need a date projection.

**Open question:**
- Does this tab surface the Capstone as a distinct entry, or is it hidden in Course 7? The Certificates tab already treats Capstone as first-class (0/1 submitted). The Courses tab should too.

### Live Sessions
**Verdict:** Keep, but redundant with Calendar. Pick a clear division of labor.

**The overlap:**
- Live Sessions tab = flat list of all sessions, filterable (All/Upcoming/Completed/Missed), with bulk "Add All to Calendar."
- Calendar tab = monthly grid showing sessions + milestones + mentor + course start/end.
- Today both show the same sessions. Difference is purely visual format.

**Recommendation:** Keep both, but pin the division clearly in copy:
- Live Sessions = "All sessions in this program" (list, filterable, downloadable, prep-oriented).
- Calendar = "Month view" (all event types, time-of-month awareness, planning-oriented).

If you want to cut tabs: merge Live Sessions into Calendar as a "List view" toggle. I'd not do this yet — the dedicated Live Sessions tab is the natural landing place for someone thinking "where is this week's VILT?"

### Calendar
**Verdict:** Keep. Just rebuilt it with 4 event types. Strong surface now.

**Blind spots:**
- Month switcher buttons exist (< > Today) but no year. Fine for a 12-week program where May and April are the only months in scope, but if the program spans Dec-Feb the omission bites.
- No click-target spec. What happens when you click "AI Mindset" on Apr 2? Opens the session detail? Jumps to the topic? This needs a design decision before next iteration.
- No "add all to personal calendar" on this tab — only on Live Sessions. Inconsistency.
- No "right now" indicator. If a session is happening at the moment a learner opens the tab, the grid doesn't flag it. "LIVE NOW" pulse on today's cell would help.

### Mentoring
**Verdict:** Keep. This tab earns its spot.

**Why it's justified even though Calendar/Live Sessions show mentor events:**
- Mentor profile + credentials (not shown elsewhere).
- Session usage bar (1 of 4 used).
- Book new session CTA — this is the action surface, not just a view.
- Past session notes via "View notes" — the only place to access those.

**Blind spots:**
- No reschedule policy text. When learners try to reschedule, what's the window? 24h notice?
- No "ask a question between sessions" surface. If the mentor offers async help, where does that live?
- No visibility on remaining program weeks per session. "3 remaining, 8 weeks of program left" would help pacing.
- What if the mentor is out? No substitute or cancellation UI.

**Naming challenge:**
"Mentoring" is clear. Consider "Your mentor" if you want personality. Low priority.

### Certificates
**Verdict:** Keep. Surprisingly well-designed for a wireframe.

**Strengths:**
- Program Certificate at top as aspirational anchor with live progress (1/7 courses, 14/53 sessions, 0/1 capstone). Good.
- Three-bucket structure (Earned / In Progress / Locked) is clear.

**Blind spots:**
- No proof-of-completion preview. Learners want to see what the cert LOOKS like before they earn it. A thumbnail of the cert PDF or LinkedIn share card.
- No issuer info. Who signs it? Accreditation body? Certification number format?
- No "Share to LinkedIn" affordance on the earned Course 0 cert. Critical for the selling point of "professional development."
- The "LOCKED — 32% to go" line on Program Certificate is good. But 32% of WHAT? Courses? Time? Blend? Define.

### About
**Verdict:** Keep. Just rebuilt it canonically.

**Blind spots:**
- Instructors card section here overlaps with... wait, there's no Instructors tab on Program PD. That's fine. The 3 cards at the bottom are the only place.
- No FAQ. Common questions (time commitment, late joining, certificate validity, refund policy) usually live on About.
- No "Contact support" or "Talk to admissions" affordance for prospective buyers.

### What's missing at the Program PD level
Six things the current tab list doesn't cover:

1. **Announcements / Updates** — Program director posts, schedule changes, cohort news. Today there's no place for this. If a session moves from Thursday to Friday, how does the learner find out? Email only?
2. **Community / Discussion** — Cohort-based programs live and die on peer conversation. No Slack-like surface here. Either integrate with Circle/Slack/Discord or build a simple channel list.
3. **Resources / Downloads** — Program-wide PDFs, templates, recommended readings. Currently buried in topic pages.
4. **Progress / Analytics** — A learner-facing "how am I doing?" view. Pace, time spent, engagement streak, comparison to cohort average. Separate from Certificates which is outcome-oriented.
5. **Capstone** — Treated as a milestone in Calendar and a 0/1 counter in Certificates, but no dedicated surface for brief, submission, peer review, and examples. For a program whose Certificate depends on it, that's a gap.
6. **Support / Help** — Billing, technical issues, "how do I use this LMS." No entry point.

**Tab list challenge:** You have 6 tabs. Adding all of the above would push to 10-12. Too many. Options:

- **Option A — Keep 6 but add a utility strip above/below the hero:** Announcements, Resources, Community, Support as icon links. Doesn't compete with tabs.
- **Option B — Consolidate:** Drop Live Sessions (merge into Calendar as list toggle). Add Community. Add Resources. Keep 6: Courses / Calendar / Mentoring / Community / Certificates / About.
- **Option C — Two-row tab bar:** primary row (content nav) + secondary row (utility). More than most LMSs, but AIDM is a cohort program with complexity that warrants it. Risky from a UX perspective.

My call: **Option B.** Calendar absorbs Live Sessions cleanly. Community and Resources earn their tabs. Drop something to stay at 6.

## Course PD — tab by tab

### Modules (default)
**Verdict:** Essential. Keep.

**Blind spots:**
- No in-tab progress for the course itself. The hero has KPIs but the Modules list doesn't show "2 of 4 modules complete." (Maybe it does — worth checking.)
- No "next up" pinned state. Where is the learner expected to resume?
- No search within course. For a course with 43 topics (SEO & GEO), scanning the tree gets painful.

### Live Sessions
**Verdict:** Keep, but the tab is thin for most courses.

**Course 1 = 13 VILTs. Warrants a tab. Course 3 (locked) = 8 VILTs. Also warrants it.**
**What about courses with 0-2 VILTs?** The tab would look empty. Either:
- Hide the tab when count < 2.
- Merge into Modules as an anchor link.

**Blind spots:**
- Upcoming/Completed filter on Course PD variant is good. But no "Missed" filter like Program PD. Intentional?
- No session prep link. Before a VILT, learners often need pre-work materials. Where?

### Instructors
**Verdict:** Redundant. Fold into About.

The Instructors tab shows 3 cards with name, role, short bio, and "X live sessions" link. The About tab also has 3 instructor cards at the bottom. For enrolled learners there's no reason to have both.

**When it would be justified:**
- If Instructors tab added office hours calendar, "Ask a question" surface, LinkedIn/email links, or deeper bio with publications.
- Currently it doesn't. Kill the tab or beef it up.

**Recommendation:** Kill Instructors tab. Keep the 3 cards on About. If you want more depth, make each card expandable inline on About.

### Reviews
**Verdict:** Misplaced. Move off enrolled-user surface.

For an enrolled learner, Reviews is low-value filler. They already bought in. The ratings + testimonials layout is classic pre-purchase decision content.

**Where Reviews actually matters:**
- Locked Course PD (before unlock, learner sizes up whether to put in the work).
- Discovery catalog (before enrollment).
- About tab footer (social proof as a sub-section).

**Recommendation:** Kill Reviews tab on the regular Course PD. Surface reviews as a section inside About, after "Skills you'll learn." Keep dedicated Reviews tab only on Locked Course PD and on catalog entries.

### About
**Verdict:** Keep. Canonical layout just built.

**Improvements:**
- Merge in a Reviews section (3 testimonials + rating block).
- Expand Instructors section if you kill the Instructors tab.

### Course PD tab list challenge
Current: **Modules / Live Sessions / Instructors / Reviews / About** (5 tabs).

Recommended: **Modules / Live Sessions / About** (3 tabs). About absorbs Instructors and Reviews as sections. Add "Resources" if you decide to surface downloadable assets.

**Why 3 is right:**
- Modules = do the work.
- Live Sessions = show up at the right time.
- About = learn about the course. Contains instructors + reviews + syllabus + outcomes.

Tabs are navigation, not filing cabinets. The current 5 tabs split the same information three different ways.

**One more missing surface:** No Q&A or discussion tab for the course. If learners can ask questions only inside topic-level comments, you lose course-level conversations ("Is anyone else stuck on Module 3?"). Either a Course-level discussion tab or pipe it to the Program-level Community.

## Locked Course PD — tab by tab

**Current:** Modules / Live Sessions / About / Instructors / Reviews.
(Note: About appears BEFORE Instructors/Reviews here, unlike regular Course PD.)

**The fundamental question:** On a locked course, learners can't DO anything. Every tab is preview/read-only. Do they need 5 tabs of read-only content?

### Argument for keeping 5 tabs
Locked state IS a marketing surface. Show Reviews and Instructors prominently — they motivate completion of the prerequisite course. Same tab count as regular Course PD keeps the shell consistent.

### Argument for collapsing
5 tabs of preview content = 5 clicks to see everything. A locked learner scanning to decide "is this worth the wait?" benefits from a single long-scroll page: What's in it + What you'll learn + Who teaches it + What learners say + When it unlocks.

### My call
**Collapse to 2 tabs:** Syllabus (was Modules) / Overview (everything else long-scroll). Plus keep About structure because you just spent effort building the canonical layout.

So: **Syllabus / Live Sessions / About (with Instructors + Reviews sections baked in).** 3 tabs.

Add a prominent "Unlocks when Course N completes — estimated date: May 12" strip at the top of every tab. Right now the banner says "unlocks when Course X is complete" but no date. Learners need time anchoring.

### Also missing on Locked Course PD
- **Prerequisites detail.** What exactly in the previous course unlocks this one? Passing grade? Completion? Capstone milestone? Currently vague.
- **"Notify me when it unlocks"** — not needed if auto-unlock, but a nice signal.
- **Difficulty preview.** If Course 3 (SEO & GEO) is Intermediate while Course 1 is Beginner, surface the step-up.

## Cross-flow issues

Five problems that span Program PD, Course PD, and Locked Course PD:

1. **Breadcrumbs.** Topic → Module → Lesson → Course → Program. How does a learner at topic-level get back to Course PD or Program PD? Needs a breadcrumb or context header decision.
2. **Click targets on Calendar.** Clicking an event pill in the monthly grid should open... what? The Live Session detail? The Topic? The Module? Specify before dev hands off.
3. **Time zone.** Hardcoded EST across the project per your preference. Fine for wireframe, but note for dev: user-level time zone setting is needed for a global cohort. Flag for post-MVP.
4. **Empty states.** Certificates shows a thoughtful locked/earned/in-progress split. Other tabs don't. What happens on Reviews when there are 0 reviews? On Live Sessions when none scheduled? On Mentoring before the first booking? Unsolved.
5. **Notification entry point.** New sessions scheduled, mentor available slot, new replies on a discussion — none of this surfaces on Program PD. Usually needs a bell icon in global nav, not per-page.

## Recommended tab list deltas

Cleaner target state:

**Program PD** — 6 tabs:
Courses / Calendar (absorbs Live Sessions) / Mentoring / Community (new) / Certificates / About
Plus utility strip: Announcements · Resources · Support

**Course PD** — 3 tabs:
Modules / Live Sessions / About (absorbs Instructors + Reviews)
Plus: course-level Q&A link that pipes to Program Community

**Locked Course PD** — 3 tabs:
Syllabus / Live Sessions / About (absorbs Instructors + Reviews)
Plus: prominent unlock-date strip at the top of every tab

## What I did NOT audit
- Hero/KPI card variants (covered in prior sessions).
- Sidebar behavior during topic-level immersive view.
- My Learning dashboard structure.
- Checkout / enrollment flow from catalog.
- Mobile responsive behavior.
