# Topic Footer — Navigation & Progression Contract

Recommended pattern: **Option D — Nav left · action right + status badge.** (Labelled A/B/C/D in the Figma exploration; D = recommended.)

This is a contract, not a layout. The footer is ONE component with two fixed zones. New content types plug into it by declaring a few props. It scales to all ~43 content types without redesigning the footer.

---

## 1. The model — two fixed zones

```
[ ← → ]            5 of 11 · Module 3 · Topic title            [ PRIMARY ACTION / BADGE ]
  LEFT: navigation        CENTER: position + context            RIGHT: action slot
```

- **LEFT — Navigation.** Two icon-only buttons: Previous (←) and Skip (→). Always present, always secondary. This is the only nav. Skipping is allowed.
- **CENTER — Context.** "X of Y" + breadcrumb (Module · Topic title). Display only.
- **RIGHT — Action slot.** Exactly ONE primary control at any time, driven by topic state. It is the single source of truth for "what do I do next". It never holds more than one primary affordance.

### Core rules
1. **Skipping is allowed.** The → arrow moves to the next topic without completing. It is icon-only and secondary, so it never competes with the primary action.
2. **Completion is one-way.** No toggles, nothing reversible. Pressing the action commits; the action then becomes a status badge.
3. **One primary action at a time.** The right slot renders a single state (see §3). The learner is never asked to choose between two forward actions.
4. **The footer structure is invariant.** Across all 43 types only the right-slot content changes. The learner learns the footer once.

---

## 2. Completion models

Every content type maps to exactly one completion model. This is what drives the right slot.

| Model | Meaning | How completion happens | Example types |
|---|---|---|---|
| `auto` | Passive content | System marks complete on reaching the end (video ended, scrolled, recording watched) | Video, Reading, Podcast, VILT Recording |
| `explicit` | Action content | Learner presses the action; irreversible; becomes a badge | Quiz, Graded Assignment, Lab, Project, Activity, Peer-graded, Peer Review, Discussion Prompt |
| `attendance` | Live content | Completion = attended/joined the live session | VILT Live Session |
| `none` | Informational | Completion = viewed; no action needed | Section intro, info screens |

---

## 3. Action-slot state machine (RIGHT zone)

The right slot renders one of these states. Same enum for every content type.

| State | Right slot renders | When |
|---|---|---|
| `idle-passive` | `Mark as Complete` (primary) — optional if `auto` | Passive topic, not yet complete |
| `idle-action` | `<actionVerb>` (primary), e.g. "Submit answers" | Action topic, not yet submitted |
| `live` | `Join session` (primary) | VILT live, before/during session |
| `submitted` | `Under Review` badge + `Continue` | Submitted, awaiting grade/peer review |
| `graded` | `✓ Completed` badge (+ score) + `Continue` | Grade returned |
| `completed` | `✓ Topic Completed` badge + `Continue` | Completion recorded (one-way) |
| `module-end` | `Go to next Module` (primary) | Last topic of a module, module complete |
| `course-end` | `Go to next Course` (primary) | Last topic of the course |

### LEFT zone behaviour
- `Previous (←)`: disabled on the first topic of the course.
- `Skip (→)`: disabled on the last topic of the course; on the last topic of a module it is disabled too (forward movement is the `module-end` action).

---

## 4. Type → contract table

> **It is not 43 types.** The "43" is the **topic count of the C3 course (SEO, GEO & Organic Growth)** — see PRD course stats "4 / 10 / 43 / 8" and "a course with 43 topics (SEO & GEO)". The platform has a small, closed roster of **12 topic types**, all already specified by the BA team. This table is sourced from `BA/06-glossary.md` (Topic types), `BA/03-business-rules.md` BR-01 (completion), and `FRD_CourseOutline_Module_v1.0` §5.2 (duration). The footer never changes; only these columns differ per type.

| # | Topic type | Completion model | Footer idle action | Completion trigger (BR-01) | Post-action state | Duration |
|---|---|---|---|---|---|---|
| 1 | Video | auto | none (auto) | playback ≥ 90% | completed | exact |
| 2 | Recording | auto | none (auto) | playback ≥ 90% | completed | exact |
| 3 | Podcast | auto | none (auto) | audio ≥ 90% | completed | exact |
| 4 | Reading | manual | Mark as complete | clicks "Mark as complete" | completed | approx (words ÷ 250) |
| 5 | Live Session (VILT) | attendance | Join session (in window) | attended (join + ≥ 50%) OR recording ≥ 90% | completed | scheduled |
| 6 | Practice Quiz | submit | Submit answers | submitted (any score) | completed | exact if timed, else hide |
| 7 | Graded Assignment | submit | Submit assignment | submitted (grade separate, doesn't block) | completed · grade → Under Review/Graded badge | exact if timed |
| 8 | Peer-graded Assignment | submit + review | Submit for review → Review peers | submitted own work AND reviewed N peers | completed (after reviews) | approx |
| 9 | Discussion Prompt | post | Post response | posted ≥ 1 message | completed | n/a |
| 10 | Lab | manual | Mark as complete | clicks "Mark as complete" | completed | approx |
| 11 | Activity | manual | Mark as complete | clicks "Mark as complete" | completed | approx |
| 12 | Project | submit | Submit project | submitted | completed · grade → badge | approx (hours) |

Notes:
- **Auto types (1-3)** need no footer action; the right slot stays empty until complete, then shows the `✓ Topic Completed` badge. Skip is always available via the arrow.
- **Graded Assignment / Project**: completion fires on submit (does not block on grade). The grade returns later and shows as `Under Review` then a graded badge. Default pass threshold 70%, configurable (BR-03).
- **Peer-graded** is the only two-step action: `Submit for review`, then a `Review peers` state until N reviews are done.
- **Live Session** uses `Join session` only inside the 15-min window (BR-07); outside it the topic is locked or converts to a Recording.
- The Figma Topic-Type badge has 13 variants; the BA roster of 12 is the canonical product set. See §4b for the parity check.

---

## 4b. Parity with the Figma Topic-Types Badge

Source: `LMS / Topic-Types Badge` component set — 13 variants: `Video, Quiz, Lab, Reading, VILT-Live Session, VILT-Recording, Activity, Project, Practice Assignment, Graded Assignment, Peer-graded, Peer Review, Discussion Prompt`.

**Decision applied:** Peer Review is treated as a **sub-step/state of Peer-graded**, not a standalone type. The `Peer Review` badge is reused only for the review sub-state.

Canonical type (BA) → Figma badge variant:

| Canonical type | Figma badge variant | Match |
|---|---|---|
| Video | Video | ✅ |
| Recording | VILT-Recording | ✅ (name differs) |
| Podcast | — | ⚠️ missing in Figma |
| Reading | Reading | ✅ |
| Live Session (VILT) | VILT-Live Session | ✅ (name differs) |
| Practice Quiz | Quiz | ⚠️ name mismatch + see below |
| Graded Assignment | Graded Assignment | ✅ |
| Peer-graded Assignment | Peer-graded (+ Peer Review sub-state) | ✅ |
| Discussion Prompt | Discussion Prompt | ✅ |
| Lab | Lab | ✅ |
| Activity | Activity | ✅ |
| Project | Project | ✅ |

**Three items to reconcile in the design system:**
1. **Podcast** — a real type in the BA glossary and FRD §5.2, but there is **no Podcast badge variant**. Action: add `Podcast` to the badge set.
2. **Quiz / Practice Quiz / Practice Assignment** — BA and FRD name it **Practice Quiz**; Figma has **both** `Quiz` and `Practice Assignment`. Decide: either (a) rename `Quiz` → `Practice Quiz` and drop/merge `Practice Assignment`, or (b) adopt the 3-way split (Quiz, Practice Assignment, Graded Assignment) per the Coursera gap analysis and add `Practice Assignment` to the BA roster. Footer behaviour is identical either way (submit → completed), so this is a taxonomy decision, not a footer one.
3. **Peer Review** — resolved: sub-step of Peer-graded (see decision above), not counted as a 13th type.

Net: with Peer Review folded in, both sides describe the same 12 types. The only true gap is the missing **Podcast** badge; the only naming/taxonomy open question is **Quiz vs Practice Quiz vs Practice Assignment**.

---

## 5. Props each content type declares

The footer is rendered purely from these. No per-type footer code.

```ts
type FooterContract = {
  positionInCourse: 'first' | 'middle' | 'last-of-module' | 'last-of-course';
  completionModel: 'auto' | 'explicit' | 'attendance' | 'none';
  actionVerb?: string;          // label for idle-action, e.g. "Submit answers"
  state: 'idle' | 'submitted' | 'graded' | 'completed';
  isAssessment: boolean;        // graded/quiz/peer → drives confirm + no skip-warning
  requiresConfirm?: boolean;    // true for 1-attempt / high-stakes (Graded, Project)
};
```

The component decides the right-slot state from `(positionInCourse, completionModel, state)` and the left-zone enabled/disabled from `positionInCourse`.

---

## 6. Edge cases
- **First topic:** Previous disabled.
- **Last topic of module:** right slot = `Go to next Module`; Skip disabled.
- **Last topic of course:** right slot = `Go to next Course`; Skip disabled.
- **Locked topic:** not reachable via Skip; only via unlock rules (out of footer scope).
- **High-stakes (1 attempt):** `requiresConfirm` shows a confirm step before submit, since Skip exists and the action is irreversible.

---

## 7. Why this scales (rationale)
- One component, one state enum. The 12 topic types are 12 rows in §4, zero new footers. New types (if ever added) are one more row.
- The learner learns the footer once; only the right-slot label changes.
- Resolves the "two forward actions" problem: Skip is a quiet icon, the primary action owns the right.
- Status badge gives state feedback with no extra screen.

> §4 is fully populated from the BA docs (glossary + BR-01 + FRD §5.2) and parity-checked against the Figma badge in §4b. Peer Review = sub-step of Peer-graded (resolved). Two DS items remain: add a **Podcast** badge variant, and settle **Quiz vs Practice Quiz vs Practice Assignment** naming. Neither changes the footer.
