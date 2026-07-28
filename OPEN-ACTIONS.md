# OPEN-ACTIONS.md — the single register of what's blocked or pending

**Updated 2026-07-28.** One row per open item. A colleague should see what is blocked and on whom
without asking. Mirrors the drift list in `SYNC-STATE.md`. Closed items are kept for provenance.

Status: 🔴 blocked · 🟠 in progress · ⚪ not started · ✅ done (kept for provenance)

## Blocked / pending

| # | Action | Owner | Status | Source / why |
|---|---|---|---|---|
| 1 | **Export SKOAIH01 course (Studio → Export → OLX `.tar.gz`)** to validate whether *our* courses actually stack multiple components per unit, and whether any unit stacks >1 graded block. The last platform-vs-config unknown (Q9/Q13). Can't be answered from platform docs. | **Rashid** | 🔴 | `02-content-types/` + `topic-types-inventory.md` §6b/§7 |
| 2 | **Q9 — enumeration prefix decision:** manual vs automatic numbering of answer options / ORA steps. New content decision surfaced 2026-07-28. | Rupali / Nelson | ⚪ | Topic Content Types build 2026-07-28 |
| 3 | **Publish the hub** — it is 3 versions behind the record (deployed v1.8 vs record v3.3). Run `_deploy.sh` (do not auto-run; Nelson's call). | **Nelson** | 🟠 | `SYNC-STATE.md` row 3 |
| 4 | **Recount LMS components** (132 baseline + 23 added 2026-07-22, domains F/D/L ≈155) and itemise the 23 in `components-inventory.md`; correct `README.md`. | Nelson | 🟠 | `_REORG-PROMPT.md` §B; count banners added 2026-07-28 |
| 5 | **Node-ids missing** for two Ready-for-Dev pages: `↳ Phase 1 - Overlay Panels - Ready for Dev ✅` and `↳ Phase 3 - Completion + Certificate - WIP 🟠`. Never invent — fill from Figma. | **Nelson** | 🟠 | `01-ready-for-dev/` (marked NODE-ID MISSING) |
| 6 | **Verify no stray `00 · ARCHIVED` section** remains on the Topic Content Types page after Quiz v1→v2 adoption. | Nelson | 🟠 | `_REORG-PROMPT.md` §B build-out |
| 7 | **Align progress-ring token name** in prototype/handoff to DS variable `fg-success-secondary` (#17b26a light / #47cd89 dark). Near-done, naming only; nothing to create in DS. | Nelson | 🟠 | `SYNC-LOG.md` 2026-07-28 |
| 8 | **Handoff message** to HK / Navdeep / Rashid for the Ready-for-Review Topic Content Types page (`4692-444`). | Nelson | ⚪ | `SYNC-LOG.md` 2026-07-28 |
| 9 | **Refresh the FigJam LMS Learner Flow Diagram** (`v5EiEKpYgXnUwoJs2DghCP`, node `0-1`) — content outdated. | Nelson | ⚪ (deferred) | `_REORG-PROMPT.md` "In scope but OUTDATED" |
| 10 | **Build-or-buy decision** for the 3 blocked types with no Open edX equivalent — Role Play, Dialogue, Programming Assignment. | Navdeep / Rashid | 🔴 | `topic-types-inventory.md` |
| 11 | **VILT design** — biggest content gap: 19% of topics, nothing designed yet. | Nelson / team | 🔴 | `topic-types-inventory.md`; decision `00-decisions/019-*` (media player reuse) partly covers Recording |
| 12 | **BR-02a reconciliation** — a business rule (module auto-collapse at 100%) exists only in Figma `3832-18102`, not in `BA/03-business-rules.md`. Back-port or drop. | Nelson / BA | ⚪ | Decision-log extraction 2026-07-28 |
| 13 | **The 12 open questions** in `topic-types-inventory.md` §7 (8 for content, 4 for devs, 1 for Navdeep). Tracked individually in `02-content-types/OPEN-QUESTIONS.md`. | Rupali (content) · Rashid (devs) · Navdeep | 🟠 | `topic-types-inventory.md` §7 |
| 14 | **5 open product questions** (BA exec summary): assignment grading/rubric · module completion gate (strict-sequential vs unlock-all) · mentor SLA · certificate verification (public-hash URL vs QR) · i18n timing. `status: proposed` in the decision log. | Nelson / BA | ⚪ | `00-decisions/INDEX.md` |

## Optional / non-blocking

| # | Action | Owner | Status | Source |
|---|---|---|---|---|
| O1 | Formal **human side-by-side review of the 6 published skins** — v3.0 visuals were validated by contrast maths and published on Nelson's call; a broad human review was never run. | Nelson | ⚪ | DS v3.0 note; CHANGELOG |

## Closed (kept for provenance)

| Action | Closed | Note |
|---|---|---|
| ✅ Figma DS library re-published (v3.3 · 1052 variables · 18 CVD primitives · 1:1 vs colors.css) | 2026-07-24 | Resolved the "consumers see v2.0" blocker |
| ✅ All prototype PRs merged (17 as of 2026-07-27, 0 open; latest #17 quiz stacked one-scroll flow) | 2026-07-27 | Vercel live |
| ✅ ORA hard-limit corrected (multiple ORA per unit → submission errors); Q13 resolved/narrowed | 2026-07-24 | Fixed in inventory §6b + Figma matrix + ORA lane badge |
| ✅ Topic Content Types page promoted to Ready for Review (sections 01→11 + ZZ, validated) | 2026-07-28 | Still *in review*, not Ready-for-Dev |
| ✅ Quiz v1 local drafts removed, v2 adopted | 2026-07-28 | Largely closes the "delete `00 · ARCHIVED`" action (see #6 to verify) |
