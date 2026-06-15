# Feature Deltas — edX baseline vs Our LMS

Crystal-clear separation of what we cover vs what's ours-only vs what edX has and we still need to add.

Legend:
- 🟢 **Both** — edX has it AND we cover it
- 🔵 **Ours-only** — we have it, edX doesn't
- 🟡 **edX-only — to add** — edX has it, we should add it for parity
- ⚫ **edX-only — intentionally skipped** — we decided to skip (with reason)

---

## 🟢 Both (parity confirmed)

| Feature | edX section | Our component |
|---|---|---|
| Course outline / sidebar | §5, §7 | LMS / Sidebar v2 |
| Topic completion checkmarks | §7.1 | LMS / Completion Status |
| Module completion indicator | §7.1 | LMS / Module Header (Is completed=true) |
| Overall course progress | §7.1 | LMS / Overall Progress |
| Bookmark toggle on topic | §17.1 | Topic Row bookmark + Topbar bookmark button |
| Bookmark indicator on nav | §17.1 | Topic Row bookmark icon visible |
| Bookmarks list view | §17.2 | LMS / Saved Panel (combined w/ Notes) |
| Video player play/pause | §10.1 | Video Player atom |
| Video time elapsed/total | §10.2 | Video Player atom |
| Video scrub bar | §10.3 | Video Player atom |
| Video speed control | §10.4 | Video Player atom |
| Video volume | §10.5 | Video Player atom |
| Video fullscreen | §10.7 | Video Player atom |
| Scrolling transcript | §10.9 | Transcript tab |
| Click transcript line → seek | §10.15 | Transcript Line click handler |
| Handouts download | §10.13 | Downloads tab + File Item |
| Notification tray (bell icon) | §19.1 | Topbar Notifications + Panel |
| Course update notification | §19.4.2 | NotificationItem type=course-update |
| Grading notification | §19.4.3 | NotificationItem type=peer-rating, due-date |
| Multiple choice problems | §12.4 | Quiz Card |
| Explained answers post-submit | §12.4 | Quiz Card State=Revealed |
| Essay / ORA submission | §13 | Discussion Prompt + Peer-graded Assignment |
| Discussion replies | §11.5 | Thread Item |
| View Certificate | §8.1 | LMS / Course Certificate |
| Course Complete experience | §8 | LMS / Course Complete Modal |

**24 features in parity.**

---

## 🔵 Ours-only (no edX equivalent — confirm with PM these are intentional additions)

| Feature | Why it's better than edX | Risk to flag |
|---|---|---|
| **Notes anchored to transcript lines** | edX has no notes on video. Our approach gives video-context notes without the fragility of raw timestamps. | None — clear win. |
| **Combined Saved panel (Bookmarks + Notes)** | edX separates into Bookmarks page + (non-existent) video notes. Single unified view reduces context switching. | Some users may want separate lists. Filter chips solve this. |
| **AI Panel** (Key Takeaways · Ask · Chat · Related) | edX has zero AI assistance. Major differentiator. | LLM cost + latency. Set expectations per query. |
| **5-level course hierarchy** (Course → Module → Lesson → Topic → Section) | edX is 3-level (Course → Section → Subsection/Unit). Our extra Lesson layer reduces module bloat in long courses. | Content authors must learn 5 levels. Provide style guide. |
| **VILT Live integration** (Scheduled / Join Live / Live On) | edX has no native live session UX. Live sessions usually link to external Zoom/Teams. | Need to integrate or proxy a live provider. |
| **13 distinct Topic Types** (Video / Reading / Lab / VILT / Recording / Activity / Project / Practice / Graded / Peer-graded / Peer Review / Quiz / Discussion) | edX has ~6 (HTML / Video / Problem / ORA / Discussion / LTI). Richer affordances for learners. | More content-author training needed. |
| **"approx." Duration rule** on estimated time topics | edX shows raw time. Our rule prevents "I'm behind" anxiety. | Pure UX polish — no integration cost. |
| **Topic Footer Nav with always-visible Previous + Next** | edX has Previous/Next but they collapse on small screens. Our predictability rule is firmer. | None. |
| **Module completed state with green check + green eyebrow** | edX shows just a check. Our visual emphasis is stronger. | None. |
| **Topic Type badges per row** | edX shows just an icon + title. Our explicit badge is faster to scan. | More vertical space. |
| **Live Now banner on Course chrome** | edX has nothing similar. Catches learners mid-stream. | Notification frequency tuning. |
| **Mobile drawer with bottom-anchored progress ring** | edX mobile has top progress only. Ours stays visible during scroll. | Implementation: position: sticky inside scroll container. |
| **Course Type / Difficulty / Delivery Mode / Provider badges** on Course Card | edX is plain text on dashboard. We surface structured metadata. | Authors must classify. |
| **Hierarchy showcases** (5/4/3-level diagrams) in spec doc | Pure documentation. edX has nothing equivalent. | None — for content authors. |

**14 features ours-only.** All decisions defensible — none reduce edX baseline.

---

## 🟡 edX has it — we should ADD for parity

### Priority 1 — small additions (build before handoff)

| Feature | edX section | What to add | Where |
|---|---|---|---|
| **Closed Captions (CC) toggle** on video | §10.8 | Add CC on/off button to Video Player actions bar | LMS / Video Player atom |
| **Multi-language caption menu** | §10.10 | Add language picker dropdown when ≥2 caption tracks available | Video Player atom (conditional) |
| **Download transcript** (.srt / .txt) | §10.12 | Add as File Item in Downloads tab + add a dropdown on transcript header for format | Downloads tab + Transcript tab header |
| **License / Copyright** display | §10.14 | Add footer text below video player when license is non-default | Video Player atom |
| **Notification tabs by activity category** | §19.1 | Header tabs in Notifications panel: All · Discussions · Grading · Updates | LMS / Notifications Panel |
| **Share certificate** (Facebook / LinkedIn / Twitter) | §8.1.1 | Add social share icons in Course Certificate header | LMS / Course Certificate |
| **Print certificate** | §8.1.2 | Add Print button in Course Certificate header | LMS / Course Certificate |

### Priority 2 — bigger additions (Phase 2 — spec, defer build)

| Feature | edX section | What to add |
|---|---|---|
| **Dedicated Progress page** | §7.2 | Grading chart (bar chart, assignments × score %) + grading scale markers (passing %, letter grades) + per-problem score listing |
| **Notification Preferences page** | §19.3, §19.5 | Per-course, per-activity settings: tray on/off + email frequency (off/daily/weekly). Default preferences table. |
| **Email summaries** (daily/weekly) | §19.2 | Backend feature — schedule + template + opt-out |
| **Hidden results state** for graded problems | §7.2.1 note | "Results will be available after May 30" empty state on Quiz Card |
| **Dropped assignments** indicator | §7.2.1 | "x" marker on chart + asterisk on per-assignment listing |
| **Math + scientific formatting** for problems | §12.1 | LaTeX/MathJax renderer + input keyboard |
| **Timed exams** UX | §12.2 | Countdown timer + auto-submit + warn before expiration |
| **File upload affordance** for assignments | implied §13 | Drag-drop zone + file picker on Peer-graded Assignment screen |
| **Prerequisites** | §4 | Locked course state with prerequisite list |
| **Course search** | §16 | Top-bar search + results page |
| **Course updates feed** (instructor posts) | §19.4.2 | Updates tab on Course Hub + Course page |
| **Bookmark limit** (100 per course) | §17 | Backend enforcement + warning UI when nearing limit |
| **3-month auto-removal** of notifications | §19.1 | Backend job + transparent UX |

### Priority 3 — niche / specialized

| Feature | edX section | Decision |
|---|---|---|
| **Proctored exams** | §12.3 | Skip V1. Add if enterprise customer requires. |
| **HD video toggle** | §10.6 | Skip if we use adaptive bitrate (HLS). |
| **Download video** | §10.11 | Skip — licensing risk + bandwidth. |
| **Course wiki** | §20 | Skip — superseded by Notes + Discussion |
| **Google Docs / Calendar integration** | §14 | Skip V1. Phase 3 integration. |
| **Mobile native app** | §9 | Skip V1. Web responsive covers most cases. |
| **Team projects** | §15 | Skip V1. Peer-graded covers some collaboration. |
| **Badges (Mozilla Backpack)** | §8.3 | Skip — deprecated technology. |

---

## ⚫ edX-only — intentionally skipped (with reason)

| Feature | edX section | Why we skip |
|---|---|---|
| Note-on-text-highlight | §18 | We focus on video-anchored notes; text-highlight notes weren't requested. Can add Phase 3 if needed. |
| Notification opens in **new tab** | §19.1 | We keep same-tab nav for consistent context. Decision: keep ours. |
| Date-grouped notifications (we) vs category tabs (edX) | §19.1 | **DECIDE** — switch to tabs, or hybrid (tabs + date sections inside each)? |
| Show/Hide all notes toggle | §18.5 | Not applicable — our notes don't overlay on content. |
| Caret browsing for note keyboard shortcuts | §18.7 | We use simpler `N` shortcut from any focused state. |
| Mozilla Backpack badge sharing | §8.3 | Deprecated. |

---

## Summary

- **24 features in parity** — solid baseline coverage
- **14 features ours-only** — defensible differentiators
- **7 features Priority 1 to add** — must build before handoff (small effort)
- **13 features Priority 2 to add** — Phase 2 spec
- **8 features Priority 3 / skip** — out of scope or deprecated
- **6 features edX-only intentionally skipped** — with documented reasoning

## Action plan

### Round 1 (this session) — DONE
- [x] Audit done (this document + edx-parity-audit.md)
- [x] Build Priority 1 additions in Figma:
  - [x] **Certificate** — Print button added (4 buttons total: Back · Share · Download PDF · Print)
  - [x] **Notifications panel** — hybrid tabs (All · Discussions · Grading · Updates) above date sections
  - [x] **Video chrome footer** — License text + CC toggle (pill) + Language picker (EN ▾) + Download transcript link, placed below video player on Transcript screen 3042:15122
- [x] Update components-inventory.md with new affordances
- [x] Bump CHANGELOG to v1.3

### Round 2 (handoff stage)
- [ ] PM decision on notification grouping (tabs / date / hybrid)
- [ ] PM decision on Progress page V1 vs V2
- [ ] PM decision on file upload UX (drag-drop / picker / both)

### Round 3 (Phase 2 — separate sprint)
- [ ] Build Progress page
- [ ] Build Notification Preferences page
- [ ] Email summary backend + UX
- [ ] Hidden results state
- [ ] Math formatting
- [ ] Timed exams
- [ ] File upload
- [ ] Prerequisites
