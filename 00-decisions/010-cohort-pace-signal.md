---
id: 010
title: Cohort pace signal alongside personal progress
date: unknown
status: accepted
audience: [designer, dev, stakeholder]
track: LMS
phase: 1
---
> Product decision locked during discovery. Push back NOW if you disagree — mid-build reversal is 10x more expensive.

**Decision** — Show a cohort pace signal next to personal progress. Phase 1 ships mock values; Phase 2 wires the real signal after cohort 1 validates its value.

**Why**
- "Social proof for motivation."
- "Phase 1 ships mock; Phase 2 wires real signal after cohort 1 validates value." — de-risks building analytics infra before the signal is proven useful.

**Source** — Figma `3832-18102` "Key Decisions" + BA exec summary risks table, 2026-06-08. [`../LMS-HANDOFF/BA/01-executive-summary.md`](../LMS-HANDOFF/BA/01-executive-summary.md).

**edX basis** — n/a.

**Design** — LMS ICP Phase 1 · progress components (node-id unknown).

**Dev impact** — Progress components (cohort pace variant). Phase 1 = hardcoded mock; Phase 2 = backend cohort analytics.

**Alternatives rejected** — Building the real cohort-analytics signal in Phase 1: deferred — value unproven until cohort 1 runs; mock ships first.
