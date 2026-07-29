# SkillUp LMS — Sync Log

One dated line per environment whenever it moves. Newest at top. Provenance for the manifest
(`SYNC-STATE.md`); the method is in `SYNC-PLAYBOOK.md`.

## 2026-07-29 (later)
- **Encyclopedia reframe** — repo/hub reorganized around the two big tracks **ICP** (immersive & content types) + **LMS** (platform pages) on shared **Foundations**. Track A/B → ICP/LMS/Foundations across 23 ADRs + INDEX + hub. `06-v8-complementary` → `06-platform-pages` (LMS home). Old **v1.8** hub moved to `archive/index.html`; index now shows only the current version. Hub sections: ICP · LMS · Foundations · Open Actions · Archive; track filter ICP/LMS/Foundations.

## 2026-07-29
- **Local/Hub** — folder reorg shipped + **hub published** (`c577192`): numbered structure (00-decisions … 06-platform-pages), registers (OPEN-ACTIONS), 23-ADR decision log, hub audience/track filters. Was 3 versions behind → now v3.3-aligned. `_deploy.sh` hardened after a stale-stash pop landmine.
- **Figma** — node-ids confirmed by Nelson: Overlay Panels `3827-64809` (**re-statused Ready-for-Dev → Ready-for-Review**), Completion+Certificate `3830-76219`. Wired into hub + `01-ready-for-dev/`.

## 2026-07-28
- **Figma** — Topic Content Types page `4692-444` validated **Ready for Review** (sections 01→11 + ZZ, zero overlaps, 100% library instances, tokens `LMS/*` no raw hex). Handoff message to HK/Navdeep/Rashid still pending.
- **Prototype** — reconcile found the manifest stale: **17 PRs merged** (not 10). DS-parity round #12–#16 (badge glyphs, CompletionStatus 18px, Overall Progress Desktop-V2, progress-ring green) + #17 quiz stacked one-scroll flow, all 2026-07-27. 0 open. Vercel live.
- **DS** — no change since v3.3 published (2026-07-24). Progress-ring token naming (`fg-progress-complete` → `fg-success-secondary`) confirmed nothing-to-create in DS; alignment is prototype/handoff-side.
- **Local/Hub** — drift scan RED. Fixed: `README.md` "v3.0 = latest" → v3.3. Still open: hub 3 versions behind (v1.8), "132 components" count stale in README + components-inventory, old Figma slug in index.html (537/808/920) — deferred to the folder reorg, which rewrites those anyway.
- **Storybook** — not started (unchanged).
