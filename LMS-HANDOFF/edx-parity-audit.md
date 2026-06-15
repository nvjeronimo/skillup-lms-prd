# Audit — Our LMS vs edX Learner Guide

Source: [edX Learner's Guide](https://edx.readthedocs.io/projects/open-edx-learner-guide/en/latest/index.html) (Sections 7-19).

Legend: ✅ Covered · 🟡 Partial · ❌ Missing · ⏭️ Out of scope (intentional)

---

## 1. Video Player (edX §10 — 15 controls)

| edX feature | Our coverage | Notes |
|---|---|---|
| Play/Pause | ✅ | Standard control on video player |
| Time elapsed / total | ✅ | Shown right of progress bar |
| Playback scrub bar | ✅ | Standard |
| Speed control (0.5×–2×) | ✅ | "1×" cycle pattern |
| Volume control | ✅ | Standard |
| HD toggle | 🟡 | Not in current player mockup. Add as bonus. |
| Full screen | ✅ | Standard |
| Closed captioning (CC) on/off | ❌ | Not in current player. **Add CC toggle.** |
| Show/hide scrolling transcript | ✅ | We use a dedicated Transcript tab (better than overlay) |
| Language menu (multi-lang captions) | ❌ | Not designed. Add if multi-lang content expected. |
| Download video | ❌ | Not in current player. Consider per content licensing. |
| Download transcript (.srt / .txt) | ❌ | **Add to Downloads tab** as "Transcript (.srt)" file. |
| Handouts download | ✅ | Covered by Downloads tab (different files) |
| License / Copyright display | ❌ | Add footer in video chrome or content meta. |
| Click transcript line → seek | ✅ | Pattern documented + implemented |

**Gaps for handoff to flag**: CC toggle, transcript download, license display, language menu (if needed).

---

## 2. Bookmarks (edX §17)

| edX feature | Our coverage | Notes |
|---|---|---|
| Bookmark any page (toggle) | ✅ | Bookmark icon on Topic Row + Topbar button |
| 100 bookmarks/course limit | ❌ | Not enforced. Consider for backend. |
| Bookmark indicator on unit nav bar | ✅ | Visible on Topic Row (bookmark icon) |
| "My Bookmarks" page | 🟡 | Our **Saved panel** combines bookmarks + notes. edX has a dedicated page. |
| Sort by most recent | ✅ | Pattern documented |
| Click bookmark → navigate | ✅ | |
| Location of bookmarked material shown | ✅ | We show "Course · Module · Lesson" path |

**Our improvement over edX**: combined Saved panel (Topics + Notes) — single place vs edX's separate Bookmarks page + non-existent video-timestamp notes.

---

## 3. Notes (edX §18 — text-highlight only)

| edX feature | Our coverage | Notes |
|---|---|---|
| Note on text highlights | ❌ | Not in our scope (video-first LMS) |
| Note on videos | ❌ on edX | **Our advantage**: we have notes anchored to transcript lines |
| Note tagging | ✅ | Per pattern |
| Notes page (list) | ✅ | Notes tab on the video player |
| Search notes by text/tag | 🟡 | Spec'd in prototype-flows but not in current screens |
| Show/Hide notes toggle | ⏭️ | Not relevant — our notes don't overlay on body content |
| Keyboard shortcut (Ctrl+Shift+]) | 🟡 | Spec'd "N to add note" in flows |

**Our pattern is stricter and better**: notes anchored to durable transcript lines (resilient to small re-cuts). See `overlay-panels-spec.md` + Figma `📘 Notes — Timestamp anchoring pattern`.

---

## 4. Notifications (edX §19)

| edX feature | Our coverage | Notes |
|---|---|---|
| Bell icon top-right opens tray | ✅ | Topbar Notifications button → opens panel |
| Sort by **activity category tabs** (Discussions / Grading / Updates) | ❌ | We sort by **date** (Today / Yesterday / This week). **Decision needed**: switch to tabs or keep date-grouped? |
| Click notification → opens in new tab | ❌ | We open same tab. Possibly UX preference. |
| Auto-remove after 3 months | ❌ | Not specified — wire in backend. |
| Email summary (daily/weekly) | ❌ | Out of scope for V1 prototype. Add to roadmap. |
| Notification preferences page | ❌ | **Add as Phase 2** — gear icon in tray opens Preferences. |
| Discussion notifications (4 subtypes) | 🟡 | We have "Reply" — missing follow-thread, new-question, reported-content |
| Course update notifications | ✅ | "Sarah added new content" type |
| Grading notifications (ORA grade received, new submission) | ✅ | "Peer rating" + "Due date" types |
| Default ON/OFF preferences table | ❌ | Document defaults in backend spec |

**Critical decision**: category tabs (edX) vs date groups (ours). edX is more functional for users tracking specific activity types. Our date-grouped is more news-feed-like. Consider hybrid: tabs at top + date sections inside each tab.

---

## 5. Progress (edX §7)

| edX feature | Our coverage | Notes |
|---|---|---|
| Green checkmarks on course outline | ✅ | Topic Row Completed state |
| Checkmarks on unit nav bar | ✅ | Sidebar Completion Status |
| Module/section completion indicators | ✅ | Module Header `Is completed` boolean |
| Completion criteria: view all videos | 🟡 | Implicit — not enforced in mock. Backend: track watch %. |
| Completion criteria: submit all problems | 🟡 | Implicit — backend tracks per-topic |
| Completion criteria: HTML viewed ≥5s | ❌ | Not designed. Backend rule. |
| **Dedicated Progress page** | ❌ | **Missing**. Add as Phase 2: chart + per-problem scores |
| Grading chart (assignments × scores) | ❌ | Missing |
| Grading scale markers (passing %, letter grades) | ❌ | Missing |
| Per-assignment-type average bar | ❌ | Missing |
| Hidden results state (results post-due) | ❌ | Add to Quiz Card / Graded Assignment design |
| Dropped assignments handling ("x" indicator) | ❌ | Specialised — edge case |
| Practice vs Graded score distinction | ✅ | We have separate Practice Assignment + Graded Assignment topic types |
| Per-problem score listing | ❌ | Missing |

**Biggest gap**: dedicated Progress page with grading chart. Important for course-end and continuous feedback. **Add to handoff roadmap.**

---

## 6. Certificates (edX §8)

| edX feature | Our coverage | Notes |
|---|---|---|
| View Certificate from dashboard | ✅ | `LMS / Course Certificate` component |
| Course Complete modal | ✅ | `LMS / Course Complete Modal` triggers it |
| Share to social (Facebook/LinkedIn/Twitter) | ❌ | **Add to Certificate component**: 3 share icons in header |
| Print certificate | ❌ | **Add to Certificate component**: Print button |
| Web certificate URL (public) | 🟡 | Implicit — backend generates shareable URL |
| Badges (Mozilla Backpack integration) | ⏭️ | Niche / deprecated. Skip. |
| Accomplishments tab on profile | ⏭️ | Out of scope (profile feature) |

**Add for Phase 2**: share + print buttons on Certificate view.

---

## 7. Assignments / Quizzes (edX §12-13)

| edX feature | Our coverage | Notes |
|---|---|---|
| Multiple choice problems | ✅ | `LMS / Quiz Card` covers question/revealed/results |
| Math + scientific formatting | ❌ | Specialized — needed if course content includes equations. Roadmap. |
| Timed exams | 🟡 | `LMS / Quiz Card` doesn't have timer. Add to Quiz Start screen. |
| Proctored exams | ❌ | Out of scope V1 |
| Explained answers (after submission) | ✅ | Quiz Card Revealed state |
| ORA (Open Response Assessment / essay) | ✅ | `LMS / Discussion Prompt` covers text input. Peer-graded topic type covers ORA workflow. |
| Rubric-based grading | 🟡 | Mentioned in Peer Review screen content but no Rubric component |
| Submission file upload | ❌ | Missing. Add to Peer-graded Assignment screen. |
| Auto-save draft | ❌ | Standard — wire in editor implementations |

---

## 8. Discussions (edX §11)

| edX feature | Our coverage | Notes |
|---|---|---|
| Discussion forum (course-level) | ❌ | Not in current screens — we have inline discussion per topic (Discussion Prompt) |
| Post types: Discussion vs Question | 🟡 | Not differentiated in our design |
| Reply threads | 🟡 | `LMS / Thread Item` component exists, no reply nesting designed |
| Upvote / endorse | ❌ | Missing affordances |
| Anonymous posting | ❌ | Missing |
| Filter / sort posts | ❌ | Missing |
| Search posts | ❌ | Missing |
| Following posts | ❌ | Missing |
| Reported content moderation | ❌ | Admin-only — skip |

**Big gap**: full discussion forum. Our Discussion Prompt is single-topic only. Decide if course-wide discussion needed.

---

## 9. Other edX features — covered by us or out of scope

| edX feature | Status | Notes |
|---|---|---|
| Course outline / sidebar | ✅ | LMS / Sidebar v2 (with 5-level hierarchy + Lesson layer that edX lacks) |
| Mobile app | 🟡 | Web responsive mobile drawer covered. Native app out of scope. |
| Prerequisites | ❌ | Add to Course PD / Locked screens |
| Course search | ❌ | Not in scope V1 |
| Wiki | ⏭️ | edX-specific. Skip. |
| Team projects | 🟡 | Peer Review covers some collaboration |
| Google Docs/Calendar integration | ⏭️ | Skip |
| Course updates (instructor posts) | 🟡 | Captured via Notifications type |
| Licensing display | ❌ | Add footer or about page |

---

## Summary — Priority gaps to add to handoff

### High priority (add to prototype V1)
1. **CC toggle** + **transcript download** on Video Player chrome
2. **Notification category tabs** (or hybrid with date groups) — confirm decision
3. **Share + Print buttons** on Certificate view

### Medium priority (Phase 2 roadmap)
4. **Dedicated Progress page** with grading chart + per-problem scores
5. **Notification Preferences page** (gear icon → settings)
6. **Submission file upload** for Peer-graded Assignment
7. **Hidden results state** for Quiz / Graded Assignment (post-due reveal)
8. **Language menu** for multi-language captions
9. **License / Copyright** display on video

### Low priority (Phase 3 or skip)
10. Course-wide discussion forum (vs per-topic Discussion Prompt)
11. Proctored exams
12. Math/scientific problem formatting
13. Course search

### Our advantages over edX (highlight in handoff)
- **Notes anchored to transcript lines** (edX has no video notes at all)
- **Combined Saved panel** (Topics + Notes vs edX's separate Bookmarks page)
- **AI Panel** (Key Takeaways / Ask / Chat / Related) — no edX equivalent
- **5-level course hierarchy** (Course → Module → Lesson → Topic → Section) vs edX's 3-level
- **VILT Live integration** (Join Live + Live On states) — edX has no native live session UX
- **Topic-Types Badge system** (13 distinct types) — edX has fewer content types

---

## Action items added to handoff

This audit highlights deltas. For each "High priority" item above, the Claude Code session should:
1. Add the component to `components-inventory.md` if not yet listed
2. Add the interaction to `prototype-flows.md`
3. Update `screens-spec.md` if a new screen is needed
4. Add the story to `storybook-coverage.md`

Decisions needed from product (before handoff):
- Notification grouping: edX-style category tabs vs our date groups vs hybrid?
- Progress page priority: V1 or V2?
- File upload UX: drag-drop vs file picker vs both?
