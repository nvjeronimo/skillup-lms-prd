---
id: 021
title: 10-point registration rule for a new Topic Content Type
date: 2026-07-22
status: accepted
audience: [designer, dev]
track: A
phase: 1
---
**Decision** — A new Topic Content Type is only "done" when all ten registration entries are defined — not when its screen looks right in isolation.

**Why**
- Learned the hard way while building the prototype (2026-07-22): miss one entry and the type still renders, so nothing looks broken — it just behaves subtly differently from every other type, and the defect only surfaces when two types are compared side by side.
- Each of the ten was found broken in the prototype after adding a new type; each is a design decision before it is a code one.
- Recommended dev safeguard: a test that fails when a family is missing from any of these maps, converting silent inconsistencies into a build error.

**Source** — `topic-types-inventory.md` §6 "the registration rule", 2026-07-22. The 10 entries are enumerated in `topic-types-inventory.md` §6. [`../LMS-HANDOFF/topic-types-inventory.md`](../LMS-HANDOFF/topic-types-inventory.md).

**edX basis** — n/a (internal presentation-layer contract, not an edX capability).

**Design** — Topic Content Types — Discovery + DS Build: [`4692-444`](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4692-444).

**Dev impact** — Every Topic Content Type must be registered in all ten maps (name, chrome family, header description, primary tab label, icon, outline short label, downloads source, completion owner, completion rule, position/progress indicator). Cross-ref `02-content-types/`.

**Alternatives rejected** — "Done when the screen looks right": rejected — the type still renders with a missing entry, so visual review never catches the gap.
