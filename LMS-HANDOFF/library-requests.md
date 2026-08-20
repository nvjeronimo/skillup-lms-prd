# Requests to the design system library

Two things the Course Detail work ran into that belong in **`❖ SKO Design System (Untitled UI)`**, not in our
file. Both were worked around locally; both would be better fixed once, at source.

Raised 20 Aug 2026 from the Course Detail componentisation. Neither blocks us.

---

## 1 · `Alert` — the `Breakpoint` axis is misnamed

**Component:** `Alert` · key `11b022eafc69b4bf429bb6d785a27459faf36c73`

**What happens.** `Breakpoint=Desktop` puts the title and the supporting text **on the same line**. Any copy
longer than a short sentence is clipped. `Breakpoint=Mobile` stacks them and wraps.

**Why that is a problem and not a preference.** Our banner renders `welcome_message_html` — raw HTML written
by the instructor, of unpredictable length. On a 1280px desktop screen we are forced to select
**`Breakpoint=Mobile`**, which reads as a mistake to anyone opening the file and cannot be explained without
this note.

The axis is not describing a device. It is describing **stacked versus inline**.

**Suggested fix**, in order of preference:

1. Rename the axis — `Layout = Inline · Stacked` — and let breakpoint be a consequence rather than the label.
2. Or keep the name and let Desktop wrap when the text is long, so the choice stops being manual.

**What we did meanwhile:** selected `Breakpoint=Mobile` on a desktop frame, and wrote the reason into the
retired `_Remove · LMS / Course Detail / Banner` description so the next person does not "fix" it back.

---

## 2 · `Alert` — a `Persistent` variant, so a permanent warning cannot be dismissed

**Same component.**

**The rule.** The course-ended notice — `has_ended: true` — must not be dismissible. A dismissible warning
about a permanent condition is a warning that disappears: the learner clears it, and nothing in the course
tells them again that graded work is closed.

**Where it currently lives.** `X close button` is a boolean, so the rule is a convention. Anyone can turn it
back on, by accident, and nothing objects.

We had encoded it in our own component as a **variant**, which made it impossible to flip. We gave that up to
adopt `Alert`, and we think that was the right trade — but the protection went with it.

**Suggested fix.** A `Persistent` value on an axis (or a `Dismissible = False` variant) where the close
control does not exist, rather than being switched off. The distinction matters: *off* is a setting, *absent*
is a guarantee.

**Who else this serves.** Any permanent-state notice — course archived, enrolment closed, account suspended.
This is not a Course Detail problem.

---

## Not a request, but worth knowing

`LMS / Completion Status` has **`In Progress` hidden** in the set. We reached the same conclusion
independently from the API: the platform reports `complete` as a boolean and has no in-progress state to
report. Whoever hid it was right, and the reason is now documented on our side too — see
`course-details-metadata-map.md` §8.
