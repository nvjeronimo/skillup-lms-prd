# Executive Summary

## What we're building

A modern Learning Management System course player optimized for the **immersive course experience** — the screen the learner spends 80% of their time on. The first phase delivers a complete Video lesson flow with Notes, Transcript, Downloads, Bookmarks, and Notifications.

## Why now

edX, Coursera, and Udacity dominate the LMS market but their UX is dated. Our differentiators are:

- **Transcript-anchored notes** (not raw video timestamps) — notes survive video edits
- **Mentor as messaging, not booking** — unlimited 1:1 async, lower friction than scheduled sessions
- **Hybrid notification grouping** — tabs (All / Discussions / Grading / Updates) + date sections inside, easier to scan
- **AI panel** built into the player (Ask / Chat / Related), not bolted on
- **Cohort pace signal** alongside personal progress — social proof that helps motivation
- **Strict design token discipline** — UUI base + LMS semantic tokens, no hardcoded values

## Scope — what Phase 1 ships

The 7 Phase 1 screens cover the full Video lesson loop:

1. **My Learning Dashboard** — entry point, course cards
2. **Course Player · Video · Transcript tab** (default view)
3. **Course Player · Video · Notes tab**
4. **Course Player · Video · Downloads tab**
5. **Course Certificate** — earned on course completion
6. **Peer-graded Assignment** — submission + file upload + peer review flow
7. **VILT Join Live** — pre-live intermediate state

Plus two overlay panels (slide-over from topbar):
- **Notifications panel** — hybrid tabs + date sections, 7 notification types
- **Saved panel** — combined Bookmarks + Notes view with filter chips

And one modal:
- **Note Editor** — anchor preview + textarea + tags + save/cancel

## Out of scope for Phase 1

Documented in `05-feature-roadmap.md` Phase 2/3 sections.

- Other lesson types (Reading, Lab, Discussion, Project, etc.) — designs exist but not in build target
- Mentor messaging UI — Phase 2
- Grade calculation engine — Phase 2
- Auth flow — Phase 1 assumes signed-in user
- Real video infrastructure — placeholder for prototype
- Admin/Instructor panels — Phase 3
- Mobile native apps — Phase 3 (responsive web works on mobile in Phase 1)

## Key decisions already made

These are locked. Re-litigating costs us time. Push back now if you disagree.

| Decision | Rationale |
|---|---|
| **Transcript-anchored notes**, not video-timestamp | Notes survive video re-encoding + content edits |
| **Sidebar v2 supports 5-level hierarchy** | Program → Course → Module → Lesson → Topic. Many courses skip Lesson; sidebar adapts. |
| **Buttons** — Primary teal / Secondary outline-teal / Tertiary ghost | Destructive/Utility/Close-X stay UUI neutral gray (not brand) |
| **`approx.` prefix** on duration for estimated topics | Never on Video/Recording/timed Quiz/Live |
| **Notification grouping = hybrid** | Tabs (4) + date sections inside. Tested vs flat list and tab-only — hybrid won. |
| **File upload UX = both drag-drop and picker** | Don't force a single interaction |
| **Topic Footer Nav stays simple** | Previous · Unit info · Next. No context-aware action chips (tried, reverted) |
| **Mentor messaging is unlimited 1:1 async** | NOT booked sessions. Lower friction, scales better. |
| **AI Panel built-in to player** | Three modes: Ask (question) / Chat (conversation) / Related (recommendations) |
| **Bookmark = pure marker** | Does not affect progress or completion. Saved overlay panel collects them. |

## Success metrics

- **Activation**: First topic completed within session 1 ≥ 70%
- **Engagement**: Average session length ≥ 18 min (matches Coursera benchmark)
- **Retention**: 7-day return rate ≥ 50% for active learners
- **Completion**: Course completion rate ≥ 35% for self-paced (industry baseline 15-20%) and ≥ 70% for VILT cohorts
- **NPS**: Post-completion NPS ≥ 50

## Stakeholders + RACI

| Role | Name | R/A/C/I |
|---|---|---|
| Design lead | Nelson | R (design) · A (UX decisions) |
| BA lead | TBD | R (requirements doc) · A (story writing) |
| PM | TBD | A (scope + priority) |
| Eng lead | TBD | R (build) · C (estimation) |
| QA lead | TBD | R (AC verification) |
| Exec sponsor | TBD | A (final go/no-go) · I |

## Timeline assumption

- BA sprint to refine stories + estimation: **2 weeks**
- Build: **8-12 weeks** depending on team size and how many topic types we include in Phase 1.5
- QA: **2-3 weeks** parallel + post
- Beta with internal cohort: **2 weeks**
- Public launch: **+1 week buffer**

Total: **~16 weeks** from BA kickoff to public launch.

## Risks (top 5)

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Video infrastructure (transcoding, CDN, captions) not ready | Medium | High | Vendor decision (Mux / Cloudflare Stream / Vimeo OTT) before sprint 2 |
| Transcript caption generation quality | Medium | Medium | Two-tier: auto-generate + manual review queue. Quality threshold 95% WER |
| Cohort pace signal requires backend analytics not yet built | High | Medium | Phase 1 ships hardcoded mock values, Phase 1.5 wires the real signal |
| Notification volume overwhelms learners | Medium | Medium | Hybrid grouping + "Mark all read" + smart digest in Phase 2 |
| Mentor unlimited messaging burns out mentors | Medium | High | Phase 2: rate-limit + queue triage UI for mentors. Phase 1 caps at "1:1 fair-use" notice |

## Open questions for BA team to resolve

1. **What's the assignment grading flow?** — Peer-graded happens after submission; rubric not yet defined. Need rubric template + grade aggregation rules.
2. **What's the completion gate** between modules — strict sequential, or unlock-all-on-enroll? Different cohort types may want different rules.
3. **Mentor message SLA** — what response time do we commit to? Affects mentor staffing.
4. **Certificate verification** — public URL with verifiable hash, or QR + check-on-platform? Affects whether we publish a public certificate endpoint.
5. **Multi-language** — Phase 1 is English only. When does i18n kick in? Affects content model + UI text externalization.
