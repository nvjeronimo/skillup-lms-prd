# SkillUp LMS — Sync Playbook

**How to keep the 5 environments in sync, daily, without drift.**
Stable document (the *method*). The live state lives in `SYNC-STATE.md` (the *manifest*),
updated every day. Read this once; run `SYNC-STATE.md` + the daily ritual every day.

---

## 1. The five environments — and how they actually relate

The word "sync" is misleading if you picture five copies of the same thing. They are **five
different representations** of one project, each owning a different layer of truth. You don't copy
between them — you **propagate each layer from its one owner, in one direction**.

| # | Environment | Canonical id / URL | What it *owns* (is the source of truth for) |
|---|---|---|---|
| 1 | **Figma working file** | `Wz2TCYFVr0hD8tJNiLajLt` — LMS ICP Phase 1 | Screens, flows, per-type behaviour, layout decisions |
| 2 | **DS (Figma library)** | `c7EUDrQwP8si08aPipDSIV` — SKO Design System | Tokens/variables + LMS components (the published system) |
| 3 | **Local folder = Hub repo** | `nvjeronimo/skillup-lms-prd` → https://nvjeronimo.github.io/skillup-lms-prd/ | The **record**: decisions, specs, inventories, changelog, status |
| 4 | **Prototype** | `nvjeronimo/skillup-lms-prototype` → https://lms-prototype-mu.vercel.app | Interaction behaviour, the running realization of screens+tokens |
| 5 | **Storybook** | `v7-storybook/` → built into `/storybook/` on deploy | Component documentation (deferred — build last) |

**Two facts that shape everything:**

- **#3 Local and Hub are the same git repo.** The hub is just GitHub Pages publishing a subset of
  the local folder (`index.html`, `LMS-HANDOFF/`, `_history/`, built `storybook/`). Local→Hub is
  `git push` via `_deploy.sh` — there is nothing to "reconcile", only to publish. Do not treat
  them as two things to keep equal.
- **The Local folder is the system of record, not the system of artifacts.** The actual design
  lives in Figma; the actual tokens/components live in the DS; the actual code lives in the
  prototype. The local folder never holds a *copy* of those — it holds the **record** of them:
  links, version stamps, decisions, specs, status. "Syncing the local folder" = making its record
  match reality, then publishing that record to the hub.

---

## 2. The model: one-way flows, one owner per data type, one manifest

### 2.1 Direction of truth (never bidirectional — that is where drift is born)

```
        ┌──────────────────────────────────────────────────────────┐
        │  DS (Figma library)  ── tokens ──►  LMS-HANDOFF/tokens/*.css  ──►  Prototype colors.css │
        │        │                                                                                │
        │        └── components ──►  components-inventory.md  ──►  Prototype React  ──►  Storybook │
        │                                                                                          │
        │  Figma working file  ── screens/flows ──►  01-ready-for-dev / 02-content-types (local)   │
        │        │                                                                                 │
        │  Sessions + Figma    ── decisions ──►  00-decisions/ (local)                             │
        │                                                                                          │
        │  Prototype  ── discovered decisions (e.g. VideoPlayer reuse, 10-pt rule) ──► back to local│
        │                                                                                          │
        │  Local (record + CHANGELOG + SYNC-STATE)  ── git push / _deploy.sh ──►  Hub (published)   │
        └──────────────────────────────────────────────────────────┘
```

| Data type | Single owner | Flows to (one direction) | Drift gate |
|---|---|---|---|
| Tokens / variables | **DS (Figma)** | `tokens/*.css` → prototype `colors.css` | 1:1 hex parity check |
| Components (visual) | **DS `❖ LMS COMPONENTS`** | prototype React → Storybook | component-count reconcile |
| Screens & flows | **Figma working file** | local specs → hub | node-id + status recorded |
| Decisions / rationale | **sessions + Figma** | `00-decisions/` → hub | every decision has source + edX basis |
| Status / version | **Local (CHANGELOG)** | hub "last updated" | version-string grep |

**The one rule that prevents most failures: never edit a mirror.** Tokens change in the DS, never
in `colors.css`. Screens change in Figma, never in a local spec. If a mirror is wrong, fix the
owner and re-propagate — do not patch the mirror.

### 2.2 The manifest is the spine

You are already running **several parallel Claude sessions, each owning one environment** (one
does the DS, one the prototype, one the Figma content types). The failure mode is that each knows
its own state and nothing shared knows all of it. **`SYNC-STATE.md` is the shared handshake** —
one row per environment: canonical id, current version/commit, publish state, last-verified date.
Every session that changes its environment updates its row. The daily scan verifies the rows match
reality. That single file is what keeps five moving things coherent.

---

## 3. The daily ritual

Runs in this local repo (the record/orchestrator). Order follows the flow: **upstream → record →
downstream → publish.** Target: ≤15 min, most of it automated.

### Step 0 — Gather (this session)
Re-read what each environment-owning session did since yesterday (via session transcripts) and
skim git/PR/deploy state. This is the daily "what changed" pass.

### Step 1 — DS (upstream of everything)
- Is the library **published**? Any variables added since the last stamp?
- Token parity: `tokens/*.css` values match the DS (needs a Figma-connected session — record the
  result, don't guess).
- Update the **DS row** in `SYNC-STATE.md` (version, var count, published date).

### Step 2 — Figma working file
- Which pages changed? What is each page's **status emoji** (🟠 / ✅ / review)?
- Record node-id + status for any page that moved, in `01-ready-for-dev/` / `02-content-types/`.
- Update the **Figma row**.

### Step 3 — Local reconcile (the record)
- Fold the day's **decisions** into `00-decisions/` (with source + edX basis).
- Update inventories that moved (component count, topic types, screens).
- Bump `LMS-HANDOFF/CHANGELOG.md` if a versioned artifact changed.
- `git commit` — one checkpoint per day, message = the day's summary.

### Step 4 — Prototype (downstream consumer)
- PRs merged today? Vercel deploy green? Commit SHA.
- Parity: does prototype `colors.css` still match the DS tokens?
- Any **decision discovered in the prototype** that must flow back to `00-decisions/`?
- Update the **Prototype row**.

### Step 5 — Publish the hub
- Run the drift scan (§4). **If it is not green, fix before publishing.**
- `bash _deploy.sh` (stages `index.html`, `LMS-HANDOFF/`, `_history/`, built `storybook/`).
- Verify the live URL + that the hub "last updated" date now equals the CHANGELOG date.
- Append one dated line per environment to `SYNC-LOG.md`.

### Step 6 — Storybook
Stays **deferred** until the content types + DS stabilize. Its row in the manifest reads
"not started" so it is never silently forgotten. Build it last, from the already-published DS
components, so it documents a frozen system rather than a moving one.

---

## 4. The drift scanner (the "sem falhas" backbone)

Two tiers. **Tier 1 runs entirely in this repo, no external tools** — it catches the drift that
actually bites (a doc saying v2.0 when we are at v3.3, a dead node-id, a stale hub). **Tier 2**
needs a Figma-connected session and `gh`; its results are *recorded into the manifest* by whichever
session can see them.

### Tier 1 — local, deterministic, run daily
```bash
# a) Version-string drift — no doc should name an old version as current
grep -rn "v2\.0\|v3\.0\|132 components\|data-brand=\"x\"" LMS-HANDOFF index.html \
  | grep -iv "superseded\|history\|changelog"   # hits = stale claims to fix

# b) Stale Figma slug / renamed file
grep -rn "Learner-Platform-Experience-Discovery\|Design V4" . --exclude-dir=.git   # want: 0 hits

# c) Hub vs record version — the drift we already have today
grep -m1 "^## v" LMS-HANDOFF/CHANGELOG.md          # what the record says
git log -1 --format="%s" origin/main -- index.html # what the hub last published

# d) Broken internal links in the record
grep -rhoE "\]\(([^)]+\.md)" LMS-HANDOFF 00-decisions 2>/dev/null   # then test each path exists

# e) Working tree clean + OneDrive lock hygiene
git status --short ; find . -name ".~lock.*" -o -name ".DS_Store" | head
```

### Tier 2 — cross-environment, recorded into the manifest
- **Token parity** DS ↔ `colors.css` ↔ prototype `colors.css` (Figma-connected session).
- **Component count** DS `❖ LMS COMPONENTS` vs `components-inventory.md`.
- **Prototype deploy** — `gh pr list --state open` (want 0 unexpected) + Vercel deploy status.
- **Figma page statuses** — the emoji on each Ready-for-Dev / review page.

A day is "green" when Tier 1 is clean and every Tier-2 result is recorded (not necessarily zero —
recorded and explained).

---

## 5. Fail-safes & known risks

- **OneDrive is syncing your `.git`.** The repo lives at
  `…/OneDrive-FlexibleRoadLLC/SkillUp LMS Discovery (1)/.git`. OneDrive mid-write on Git's object
  store can corrupt the index (the `rm -f .git/index.lock` in `_deploy.sh` is a symptom you have
  already hit). **Mitigations, pick one:** (a) exclude the `.git` folder from OneDrive sync, or
  (b) keep the authoritative clone *outside* OneDrive and treat the OneDrive copy as artifacts-only.
  Until then: never run two git operations at once, and let OneDrive settle before `_deploy.sh`.
- **One-way flow, always.** A mirror is never the place to fix a value.
- **One version stamp.** The CHANGELOG date is the single clock; the hub "last updated" and the
  manifest read from it. Never hand-type a second date.
- **Nothing ships on red.** The hub only publishes after Tier 1 is green.
- **Provenance, not just state.** `SYNC-LOG.md` keeps a dated line per environment so any drift is
  traceable to the day it entered.

---

## 6. Automation target

The daily ritual should collapse to **one command**. Build a `/sync` skill in this repo that:
1. runs the Tier-1 scanner and prints a red/green report,
2. pulls each environment-owning session's latest state and diffs it against `SYNC-STATE.md`,
3. drafts the CHANGELOG + manifest edits for your approval,
4. on approval, runs `_deploy.sh` and appends `SYNC-LOG.md`.

Until that exists, this playbook *is* the procedure — run it top to bottom once a day.

---

## 7. How this fits the folder reorg

The reorg in `_REORG-PROMPT.md` builds the record layer this playbook keeps in sync
(`00-decisions/`, `01-ready-for-dev/`, `02-content-types/`, `03-design-system/`). **Do the reorg
first** — the daily sync is cheap once the record has a clean shape and every artifact has one
home. `SYNC-STATE.md` and `SYNC-LOG.md` live at the repo root, next to `_REORG-PROMPT.md`.
