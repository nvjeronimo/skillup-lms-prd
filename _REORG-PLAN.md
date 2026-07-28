# _REORG-PLAN.md — Phase 0 audit (DO NOT MOVE ANYTHING YET)

> Produced 2026-07-28 per `_REORG-PROMPT.md`. **Nothing has been moved.** This is the plan to approve.
> Git repo root = this folder (`SkillUp LMS Discovery (1)`), branch `main`, deployed as GitHub
> Pages `skillup-lms-prd`. 243 files tracked; the rest untracked.

## 0. What changed since the prompt was written (2026-07-22 → 2026-07-28)

The prompt is 6 days old and the folder moved under it. Confirm these before executing — a few
prompt instructions are already done:

| Prompt says | Reality now (2026-07-28) | Impact on plan |
|---|---|---|
| Fix old slug in `index.html` (~537, 808, 920) + "Design V4" (920) | **Already fixed.** `grep` for `Learner-Platform-Experience-Discovery` / `Design V4` finds **0 hits in `index.html`**. Hub already says "LMS ICP Phase 1". | Slug-fix now only needed in `LMS-HANDOFF/README.md` + `LMS-HANDOFF/BA/00-README.md` (2 files). |
| DS v3.3 "not yet published, consumers see v2.0" → persistent hub banner | **v3.3 published in Figma 2026-07-24.** `SYNC-STATE.md` confirms. But `LMS-HANDOFF/CHANGELOG.md` still carries the stale "⚠️ NOT YET PUBLISHED" headers on v3.0/v3.1/v3.3. | **Do NOT add the "unpublished" banner.** Instead: strip the stale caveats from CHANGELOG; hub banner should say "hub is 3 versions stale (v1.8 vs v3.3), redeploy pending". |
| 10 prototype PRs merged | **17 PRs merged** (latest #17), 0 open, Vercel live. | Update decision records / OPEN-ACTIONS to 17. |
| Topic Content Types page 🟠→ review | **Ready for Review, validated 2026-07-28** (`4692-444`, sections 01→11 + ZZ). | Treat as *in review*, still not Ready-for-Dev. |
| — (didn't exist) | **New sync layer exists:** `SYNC-STATE.md`, `SYNC-LOG.md`, `SYNC-PLAYBOOK.md`, `scripts/sync-scan.sh`, `.claude/skills/sync/`. | KEEP all — this is the environment-reconcile system; the reorg complements it, doesn't replace it. |

**Decision needed (D0):** Is the "3 versions stale" state something to fix by redeploying *before* the
reorg, or does the reorg's hub-sync (Phase 3) become the redeploy? I recommend the latter — one push.

---

## 1. Full inventory → disposition

Legend: **KEEP** (in place) · **MOVE→x** · **MERGE→x** · **ARCHIVE** (`_archive/2026-07/`) · **MEDIA→**`_media/` (gitignore + stub) · **DELETE** (junk only). ⓣ = git-tracked.

### 1a. Root loose files

| Item | Date | ⓣ | Disposition | Reason |
|---|---|---|---|---|
| `index.html` | Jul 28 | ⓣ | **KEEP** (edit in Phase 3) | Hub entry point. |
| `_REORG-PROMPT.md` | Jul 28 | ⓣ | **KEEP** | The brief. |
| `_REORG-PLAN.md` | — | — | **KEEP** | This file. |
| `_deploy.sh` | Jun 19 | — | **KEEP** (edit) | Deploy script; stages only `index.html`, `LMS-HANDOFF/`, `_history/` — must add new paths. |
| `SYNC-STATE.md` `SYNC-LOG.md` `SYNC-PLAYBOOK.md` | Jul 28 | ⓣ | **KEEP** at root | Live environment-reconcile system. |
| `scripts/sync-scan.sh` | Jul 28 | ⓣ | **KEEP** | Drift scanner used by the playbook. |
| `.gitignore` | Jun 25 | ⓣ | **KEEP** (edit) | Add `_media/` + heavy paths. |
| `skillup-logo-dark.svg` / `-light.svg` | Apr 11 | ⓣ | **KEEP** at root | Hub logo assets. Verify `index.html` still references them before any move. |
| `.DS_Store` | Jul 6 | — | **DELETE** | OS junk (rule 1 exception). |
| `.playwright-mcp/` (158 entries) | Jul 1 | — | **DELETE** | Tool junk (rule 1 exception; already gitignored). |
| `Active Workspace _ Notes _ AI.html` (7.9 MB) | Jun 16 | — | **MEDIA→**`_media/` + stub | Heavy single HTML dump. Not deployed. |
| `footer-contract.md` | Jun 25 | — | **MOVE→**`03-design-system/` | Footer spec — a DS/handoff contract. |
| `nav-variants-mockup.html` | Jun 22 | — | **MOVE→**`90-prototypes/` (or ARCHIVE) | Standalone nav mockup. Confirm still referenced anywhere (grep says no). |
| `session-ocr-partial.md` (2.5 KB) | Jun 16 | — | **ARCHIVE** | Partial OCR fragment, superseded. |
| `verify-complete.png` `verify-dummy-transcript.png` `verify-optionA.png` `verify-optionA2.png` `verify-sk-migration.png` | Jun 25 | — | **ARCHIVE** | One-off verification screenshots from a Jun 25 session. |

### 1b. Root source documents (client / BA / meeting inputs)

All small; several are hub `file:` download targets (⚠️ = referenced in `index.html` JS data — **moving requires updating the hub ref**).

| Item | Date | ⓣ | Hub ref | Disposition |
|---|---|---|---|---|
| `FRD-Cohort Management.docx` | Apr 9 | ⓣ | ⚠️ | **MOVE→**`05-source-docs/` |
| `FRD_CourseOutline_Module_v1.0.docx` | Jun 25 | — | — | **MOVE→**`05-source-docs/` (has `.md` twin in `LMS-HANDOFF/BA/FRDs/`) |
| `FRD_ICP_5.3_Video_Lessons.docx` | Jun 25 | — | — | **MOVE→**`05-source-docs/` (has `.md` twin in BA/FRDs) |
| `ICP_PRD.docx` | Jun 16 | — | — | **MOVE→**`05-source-docs/` |
| `ICP Player for Different Video Types.pdf` | Jun 25 | ⓣ | ⚠️ | **MOVE→**`05-source-docs/` |
| `Mobile App Requirements Phase-1.docx` | Apr 9 | ⓣ | ⚠️ | **MOVE→**`05-source-docs/` |
| `SkillUp Learner (LMS) Dashboard.docx` | Jan 29 | ⓣ | ⚠️ | **MOVE→**`05-source-docs/` |
| `US Program-courses List (1).xlsx` | Apr 11 | ⓣ | ⚠️ | **MOVE→**`05-source-docs/` |
| `full program syllabus with time duration v4.xlsx` | Jun 16 | — | — | **MOVE→**`05-source-docs/` |
| `VILT-Integration-Design-Document.pdf` | Apr 11 | ⓣ | ⚠️ | **MOVE→**`05-source-docs/` |
| `LMS-Walkthrough-Questions-Transcript-20260410.txt` | Apr 10 | ⓣ | ⚠️ | **MOVE→**`04-research/` (transcript, not a spec) |

### 1c. Folders

| Folder | Size | Date | ⓣ | Disposition | Reason |
|---|---|---|---|---|---|
| `LMS-HANDOFF/` | 612 K | Jul 28 | ⓣ | **KEEP as deployed package** (see §4 fork) | The live, tracked handoff. Central decision on how numbered folders relate to it. |
| `_history/` | 152 K | Jul 15 | ⓣ | **KEEP** (rename note) → effectively `_archive`-of-record | Already a well-formed legacy archive with its own README. Its README is stale ("v1.8"). |
| `design-system/` | 332 K | Jul 1 | ⓣ | **KEEP** hub sub-page; **MERGE** icons | `design-system/index.html` is a hub page (linked `page:`). Its `maven-icons/` is an untracked dup of root `maven-icons/`. |
| `Design System Tokens/` | 168 K | Jul 1 | — | **MOVE→**`03-design-system/rationale/` | Token architecture discovery docs + demos (16 files). Not the shipped tokens. |
| `maven-icons/` (root) | 212 K | Jul 15 | ⓣ | **KEEP** (canonical icon set) | 46 SVGs, tracked. Keep as the one source. |
| `design-system/maven-icons/` | — | Jul 1 | — | **DELETE-as-dup** → replace with reference | Identical 46-file list to root; untracked. Point `design-system/index.html` at root set, or keep if it loads relative. **Verify icon load path first.** |
| `storybook/` (built) | 7.5 M | Jul 22 | ⓣ | **KEEP** | Deployed Storybook build (hub links `storybook/`). |
| `v7-storybook/` (source) | 20 M | Jul 22 | — | **MOVE→**`90-prototypes/storybook-src/` | Storybook *source*; `node_modules` gitignored. Not a dup of the build — source vs output. |
| `v5-prototype/` | 188 K | Jul 15 | — | **MOVE→**`90-prototypes/v5/` | Static HTML prototype. |
| `v7-hk/` | 136 K | Jul 15 | — | **MOVE→**`90-prototypes/v7-hk/` | HK's V7 single-file prototype + memory. |
| `skillup-lms-redesign/` | 4.4 M | Jul 13 | — | **MOVE→**`90-prototypes/redesign-v2v3v4/` | Redesign explorations (v2/v3/v4 HTML + jsx + screenshots). *This is the current shell cwd.* |
| `_workspace/` | 14 M | Apr 16 | — (gitignored) | **KEEP** gitignored; **MERGE** useful source docs → `05-source-docs/` on review | Already gitignored working area; `prototypes/` overlaps 90-prototypes, `source/` overlaps source-docs. |
| `Prework/` | 6.4 M | Jul 9 | — | **ARCHIVE** (intact) | Already decided: handed to another team. Preserve reference; do not mine. |
| `personas/` | 60 K | Jul 15 | — | **MOVE→**`04-research/personas/` | 7 personas + INDEX + json. |
| `ux-audit/` | 36 K | Jul 1 | ⓣ | **KEEP** hub sub-page (or MOVE→04 + update `page:` ref) | `index.html` hub page (`page:`). |
| `mind-map/` | 32 K | Jul 15 | ⓣ | **KEEP** hub sub-page | Hub `page:` ref. |
| `vilt-architecture/` | 20 K | Jul 15 | ⓣ | **KEEP** hub sub-page | Hub `page:` ref. VILT is the biggest content gap — keep visible. |
| `live-sessions/` | 40 K | Jul 1 | ⓣ | **KEEP** hub sub-page | Hub `page:` ref. |
| `meeting-summary/` | 12 K | Jul 1 | ⓣ | **KEEP** hub sub-page | Hub `page:` ref. |
| `prd/` | 84 K | Jul 1 | ⓣ | **KEEP** hub sub-page | Hub `page:` ref (current PRD). |
| `Coursera LMS immersive course/` | 32 M | Jul 1 | — | **MEDIA→**`_media/` + stub | Heavy reference capture. |
| `Design System Discovery - Demo Session/` | 456 M | Jul 15 | — | **MEDIA→**`_media/` + stub | 456 MB `.mov` recording. Largest item. |

**Note on the 7 hub sub-pages** (`design-system` `live-sessions` `meeting-summary` `mind-map` `prd`
`ux-audit` `vilt-architecture`): all are tracked single-page `index.html` views linked from the hub
via `page:` and already deployed. **Recommendation: leave them in place** (moving them means editing
7 `page:` refs for no structural gain) and simply *represent* them from the new numbered READMEs.
Flagged as **D3** below in case you'd rather relocate under `04-research/` / `03-design-system/`.

---

## 2. Duplication list — resolved

| # | Pair | Verdict | Action |
|---|---|---|---|
| 1 | `maven-icons/` (root, ⓣ) vs `design-system/maven-icons/` (untracked) | **True dup** — identical 46-file lists | Keep root as canonical → `03-design-system/icons/` reference; remove the untracked copy **after** confirming `design-system/index.html` icon load path. |
| 2 | `_history/` vs `LMS-HANDOFF/history/` | **Not dup** — different content | `_history/` = 10 project-era legacy docs; `LMS-HANDOFF/history/` = only `CHANGELOG-archive.md` (v1.0–v1.7). Keep both; clarify roles in READMEs. |
| 3 | `storybook/` vs `v7-storybook/` | **Not dup** — build vs source | `storybook/` = deployed build (keep, deployed); `v7-storybook/` = source → `90-prototypes/storybook-src/`. |
| 4 | `LMS-HANDOFF/tokens/` vs `Design System Tokens/` | **Not dup** — shipped tokens vs rationale | `tokens/` = `colors.css`/`typography.css` (the artifact); `Design System Tokens/` = architecture discovery/decision docs. Both land under `03-design-system/` (tokens as the artifact, the other as `rationale/`). |
| 5 | `v5-prototype/` vs `v7-hk/` vs `skillup-lms-redesign/project/` vs `_workspace/prototypes/` | **Distinct iterations**, not dups | All → `90-prototypes/` as dated subfolders. `_workspace/prototypes/` stays gitignored inside `_workspace/` unless you want it surfaced. |
| 6 | root `FRD_*.docx` / `ICP_PRD.docx` vs `LMS-HANDOFF/BA/FRDs/*.md` | **Not dup** — original vs conversion | `.docx` originals → `05-source-docs/`; `.md` conversions stay in the BA handoff. Cross-link. |
| 7 | Loose root files (`verify-*.png`, `nav-variants-mockup.html`, `session-ocr-partial.md`, `footer-contract.md`) | mixed | See §1a: `verify-*`+`session-ocr` → ARCHIVE; `nav-variants` → prototypes; `footer-contract` → design-system. |

Extra dup found (not in prompt): `Design System Discovery - Demo Session/` and `Coursera LMS
immersive course/` are the two heavy non-git captures → `_media/`.

---

## 3. Current vs stale — per key doc (dated, not guessed)

| Doc | Verdict | Evidence |
|---|---|---|
| `LMS-HANDOFF/CHANGELOG.md` | **Current content, stale headers** | Body is v3.3-accurate, but v3.0/v3.1/v3.3 still carry "⚠️ NOT YET PUBLISHED IN FIGMA" — false since 2026-07-24 (`SYNC-STATE` row 2). **Fix in reorg.** |
| `LMS-HANDOFF/README.md` | **Stale** | Says "132 components", old slug "Learner Platform Experience Discovery fase", "v1.8", canonical page "V7 - UUI Playground". Recount to 132+23; fix slug; bump to v3.3. |
| `LMS-HANDOFF/components-inventory.md` | **Stale count** | "132" predates the +23 (domains F/D/L, 2026-07-22). Recount. |
| `LMS-HANDOFF/topic-types-inventory.md` | **Current, Nelson-authored** | Do NOT rewrite. Wire in `4692-444`, split §7's 12 Qs to owners. |
| `_history/README.md` | **Stale pointer** | Points to "LMS-HANDOFF (v1.8)". Update or leave as historical snapshot (it *is* an archive). |
| `SYNC-STATE.md` / `-LOG.md` | **Current (2026-07-28)** | Freshest source of truth for environment state. Anchor the reorg to these. |
| `index.html` | **Mostly current** | Slug already fixed; still shows "132 components" (line ~793) and lacks audience/track filters + open-actions surface. |

---

## 4. Target structure + the one big fork (LMS-HANDOFF)

Proposed tree (prompt's, kept):

```
/
├── index.html · README.md (NEW) · _deploy.sh · SYNC-*.md · scripts/
├── 00-decisions/          # ADR log + INDEX.md  (NEW)
├── 01-ready-for-dev/      # Track A signed-off screens
├── 02-content-types/      # Track A topic types (edX parity)
├── 03-design-system/      # tokens (artifact) + rationale/ + icons/ + components + footer-contract
├── 04-research/           # personas, transcripts, audits, session notes
├── 05-source-docs/        # FRDs, PRDs, BA .docx, spreadsheets
├── 06-v8-complementary/   # Track B (WIP 🟠)
├── 90-prototypes/         # v5, v7-hk, redesign, storybook-src, nav-mockup
├── _archive/2026-07/      # Prework/, verify-*, session-ocr, + ARCHIVE-LOG.md
├── _media/                # heavy binaries — gitignored, each w/ README stub
├── _history/              # legacy docs of record (already tracked/deployed)
└── LMS-HANDOFF/           # deployed handoff package  ← see fork below
```

**THE FORK (D1) — how do the numbered folders relate to `LMS-HANDOFF/`?** Most `00–03` content
*already physically lives* inside `LMS-HANDOFF/` (`topic-types-inventory.md`, `tokens/`,
`components-inventory.md`, `screens-spec.md`, `BA/`, CHANGELOG). The prompt forbids content in two
places. Two ways to honour that:

- **Option A (recommended) — numbered folders are the home; `LMS-HANDOFF/` is slimmed to a deploy view.**
  `git mv` handoff docs out into `01/02/03/05`, leave `LMS-HANDOFF/` holding only what the deploy
  ships that has no better home (or make it a thin index of relative links). Update `_deploy.sh` to
  stage `00–06`. **Pro:** matches the prompt's structure exactly; single home. **Con:** biggest churn
  to a live, deployed, tracked package; every internal cross-link in `BA/`, `quizzes/`, `modules/`
  must be re-pathed and re-grepped.
- **Option B — `LMS-HANDOFF/` stays the physical home for handoff docs; numbered root folders are
  thin READMEs that point into it,** and the reorg's real work is taming the *untracked root sprawl*
  (source docs, prototypes, research, media). **Pro:** near-zero risk to the deployed package; deploy
  script barely changes. **Con:** "numbered folder is just a pointer" is softer than the prompt's
  intent; discovery content and handoff content stay separated by folder.

**My recommendation: Option B for `LMS-HANDOFF`'s *existing* docs, Option A for genuinely new
material** (`00-decisions/` is new and lives at root as a first-class deliverable; `04-research/` and
`05-source-docs/` and `90-prototypes/` absorb the untracked sprawl, which is where the real mess is).
This gets the prompt's outcome — one landing place, three audiences — without gambling the deployed
package. **Needs your call before any `git mv`.**

---

## 5. Hub-dependency map (what a move breaks — must re-point + re-grep to 0)

| Hub reference (in `index.html`) | Points to | If moved → update |
|---|---|---|
| `href="LMS-HANDOFF/tokens/colors.css"` | shipped tokens | Only if D1=Option A moves tokens. |
| `href="storybook/"` | built storybook | Keep in place — no change. |
| `page:` ×7 | the 7 sub-page `index.html`s | Keep in place (D3) → no change. |
| `file:` ×7 | root source docs (§1b ⚠️) | **Update all 7** to `05-source-docs/...` when moved. |
| Figma URLs | `Wz2TCYFVr0hD8tJNiLajLt` etc. | No FS change; verify node-ids vs canonical table. |

Also re-point after moves: `_deploy.sh` staging list; `LMS-HANDOFF/README.md` +
`LMS-HANDOFF/BA/00-README.md` (slug); `_history/README.md` (relative pointers).

---

## 6. NEEDS NELSON'S DECISION

| # | Question | My recommendation |
|---|---|---|
| **D0** | Redeploy the stale hub (v1.8→v3.3) now, or fold it into the reorg's Phase-3 hub sync? | Fold into Phase 3 — one push. |
| **D1** | `LMS-HANDOFF` fork: Option A (move docs out) vs B (keep, thin pointers) vs hybrid? | **Hybrid** (§4): B for existing handoff docs, A for new/sprawl. |
| **D2** | The prompt's "persistent unpublished-DS banner" — skip it (v3.3 is published) and show a "hub stale" banner instead? | **Skip the unpublished banner; show hub-stale banner.** |
| **D3** | 7 hub sub-pages (`design-system`, `prd`, `ux-audit`, `mind-map`, `vilt-architecture`, `live-sessions`, `meeting-summary`): leave in place or relocate under `04`/`03`? | **Leave in place**, represent from numbered READMEs. |
| **D4** | `design-system/maven-icons/` (untracked dup): safe to drop once root set is canonical? Confirm `design-system/index.html` icon load path first. | Drop after path check. |
| **D5** | `nav-variants-mockup.html`, `session-ocr-partial.md`: prototypes/research vs archive? | nav→prototypes, ocr→archive. |
| **D6** | `_workspace/` (gitignored, 14 M): leave as-is, or surface its `source/*.md` into `05-source-docs` and `prototypes/*` into `90-prototypes`? | Leave as-is for now; surface on a later pass. |
| **D7** | Node-ids genuinely missing (Overlay Panels; Phase 3 Completion+Certificate) — mark `NODE-ID MISSING — ask Nelson` (never invent). Provide them? | Provide if you have them; else I mark missing. |
| **D8** | Source of decision records: I will read Figma `3832-18102` (42 BRs/10 decisions/24 links) via MCP as the backbone. OK to pull that now in Phase 2? | Yes — needs your go. |

---

## 7. Proposed execution order (AFTER approval — nothing runs yet)

1. `git add -A && git commit -m "checkpoint before reorg"` (rule 2). Delete OS junk only.
2. Create `_media/` + `.gitignore` entries; move the 3 heavy items; write stubs.
3. Create numbered folders + per-folder `README.md`.
4. `git mv` per the approved D1 option; move source docs/prototypes/research/personas.
5. Archive `Prework/`, `verify-*`, `session-ocr`; write `_archive/ARCHIVE-LOG.md`.
6. Fix stale content: CHANGELOG headers, README counts + slug, `_history/README`.
7. Build `00-decisions/` (from Figma `3832-18102` + CHANGELOG + BA + transcripts) + `INDEX.md`.
8. Wire `02-content-types/` to `topic-types-inventory.md` + split §7 to owners.
9. Consolidate `03-design-system/`; recount components (132+23).
10. Write `OPEN-ACTIONS.md` (seed from prompt §Deliverables-6 + `SYNC-STATE` drift list).
11. Re-point + re-grep (old slug, moved paths, `Design V4`) → **0 hits**.
12. Phase 3: hub `index.html` — audience/track filters, this-week decisions, open-actions, legend,
    hub-stale banner; update `_deploy.sh`. **Do NOT deploy/push** — leave to Nelson.
13. Root `README.md` + reorg CHANGELOG entry + final summary.

---

## ⛔ STOP — awaiting approval

Per the prompt, I have moved nothing. Confirm **D0–D8** (or just say "go with your recommendations")
and I'll execute in the order above, committing the checkpoint first.
