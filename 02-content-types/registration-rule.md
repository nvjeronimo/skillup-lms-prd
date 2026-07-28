# The 10-Point Registration Rule

**A reusable design rule, not a footnote.** A new Topic Content Type is only "done" when all ten
entries below are defined — **not** when its screen looks right in isolation.

*Learned the hard way while building the prototype (2026-07-22).* A type is not one thing you define;
it is **an entry in every list that describes topics**. Miss one and the type still renders, so nothing
looks broken — it just behaves subtly differently from every other type, and the defect only surfaces
when someone compares two types side by side.

Source: [`../LMS-HANDOFF/topic-types-inventory.md`](../LMS-HANDOFF/topic-types-inventory.md) §6
"Adding a new Topic Content Type". Decision record: [`00-decisions/021`](../00-decisions/). Each point
is a **design** decision before it is a code one.

| # | What must be defined | What goes wrong if it's missed |
|---|---|---|
| 1 | **Type name** in the roster | Type can't be authored or selected |
| 2 | **Chrome family** it belongs to | Falls back to Reading — wrong shell entirely |
| 3 | **One-line description** for the topic header | The header echoes the topic title back at the learner |
| 4 | **Primary tab label** | The first tab renders with no label at all |
| 5 | **Icon** | Falls back to a generic icon; type unreadable in the outline |
| 6 | **Short label** for the outline badge | Long name truncates in the sidebar |
| 7 | **Downloads source** | The tab shows a generic file, contradicting the content on the page |
| 8 | **Who owns the completion action** — the type itself, or the shell | Two "Mark as complete" buttons, or none |
| 9 | **Completion rule** | Topic never completes, or completes on entry |
| 10 | **Position/progress indicator** (if it has multiple items) | Progress stated twice in different words |

## Safeguard for devs

A test that **fails when a family is missing from any of these maps**, rather than relying on someone
remembering. Cheap to write, and it converts a class of silent inconsistencies into a build error.

## Two platform constraints to flag alongside

- **Only 1 SCORM component per unit** — affects how Activities can be composed.
- **Learner Notes work only on stock HTML components** — replacing the HTML renderer breaks
  note-taking unless re-implemented.
