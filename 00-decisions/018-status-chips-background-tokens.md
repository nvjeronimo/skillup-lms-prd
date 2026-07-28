---
id: 018
title: Status chips use background tokens, never foreground tokens
date: 2026-07-20
status: accepted
audience: [designer, dev]
track: A
phase: 1
---
> Track A. Surfaced during the Track B / V8 migration work.

**Decision** — Status chip frame fills bind to background tokens (`LMS/Background/*`), never to foreground tokens.

**Why**
- `LMS / Completion Status · State=Pending` had its frame fill bound to `LMS/Foreground/fg-white` — a hardcoded white in every mode — producing a solid white blob in dark mode.
- Rebound to `LMS/Background/bg-primary`; the fix propagates to every `LMS / Topic Row` instance.

**Source** — Surfaced during V8 migration, 2026-07-20. Handoff variable collections guide + CHANGELOG. [`../LMS-HANDOFF/variable-collections-guide.md`](../LMS-HANDOFF/variable-collections-guide.md).

**edX basis** — n/a.

**Design** — SKO Design System · LMS COMPONENTS: [`1030-33572`](https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV/?node-id=1030-33572) (Completion Status master component).

**Dev impact** — Completion Status master component; cascades to every Topic Row. Audit rule: chip fills must reference `LMS/Background/*`.

**Alternatives rejected** — Binding chip fills to foreground tokens (e.g. `fg-white`): rejected — hardcoded white does not invert, breaking dark mode.
