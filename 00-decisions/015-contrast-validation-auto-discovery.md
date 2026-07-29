---
id: 015
title: Contrast validation auto-discovers tokens from colors.css
date: 2026-07-22
status: accepted
audience: [dev]
track: Foundations
phase: 1
---
**Decision** — Contrast validation auto-discovers the token set from `tokens/colors.css` and never runs against a hand-written pair list.

**Why**
- Hand-written pair lists missed tokens three times during the v3.0 work — the last miss caught `text-brand-primary` and `text-brand-secondary`, which had never been tested.
- Auto-discovery took coverage from 16 checks to 540 (9 text tokens × 4 surfaces × 12 skin/mode combinations + 9 explicit semantic pairs), with 0 AA failures.
- The thinnest pair — `text-success-primary` over `bg-tertiary` in light = 4.51:1 — passes by 0.01, so any moved value must be re-validated automatically.

**Source** — Handoff CHANGELOG v3.0 validation section, 2026-07-22. [`../LMS-HANDOFF/CHANGELOG.md`](../LMS-HANDOFF/CHANGELOG.md).

**edX basis** — n/a.

**Design** — n/a (validation tooling, not a Figma artifact). Source of truth: `../LMS-HANDOFF/tokens/colors.css`.

**Dev impact** — Contrast test harness reads `colors.css` directly; re-runs on every token change. Re-validate if the 4.51:1 thinnest pair moves.

**Alternatives rejected** — Hand-maintained pair list: rejected — silently missed tokens three times.
