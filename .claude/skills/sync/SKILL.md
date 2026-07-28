---
name: sync
description: "SkillUp LMS daily 5-environment sync — scan drift (Figma · DS · Hub · Prototype · local), reconcile SYNC-STATE.md, and publish the hub behind a manual gate. User-invoked only."
disable-model-invocation: true
---

# sync — SkillUp LMS daily environment sync

Keep the five environments coherent: **Figma working file · DS (Figma library) · Local=Hub repo ·
Prototype · Storybook (deferred)**. Full method in `SYNC-PLAYBOOK.md`; live state in `SYNC-STATE.md`;
history in `SYNC-LOG.md`. Operate on the git root regardless of cwd.

## Non-negotiable safety rules
- **Never run `_deploy.sh` or `git push` without explicit approval.** Surface the plan, wait for a
  clear "deploy".
- **One-way flow:** fix values at their owner (DS for tokens, Figma for screens), never patch a
  mirror (`colors.css`, a local spec).
- **Never invent** a Figma node-id, a version, a component count, or a decision rationale. If
  unknown: `NEEDS NELSON'S DECISION` / `NOT DOCUMENTED — confirm`.
- **Storybook stays "not started"** until Nelson says the content types + DS are frozen.
- `.git` is inside OneDrive — before any git op, check no `.git/index.lock` and that OneDrive settled.

## Ritual (report as you go; tables over prose)

1. **Tier-1 scan** — run `bash scripts/sync-scan.sh` (read-only). Print result; list drift if red.
2. **Gather (24h)** — read the environment-owning sessions' recent transcripts since the
   `Last full reconcile` date in `SYNC-STATE.md`; run
   `gh pr list --repo nvjeronimo/skillup-lms-prototype --state all --limit 6` for prototype state.
   Summarize per environment: version / commit / status.
3. **Diff vs manifest** — for each row of `SYNC-STATE.md`: `env · manifest says X · reality is Y`.
   This diff is the point of the ritual.
4. **Draft edits (show first, then apply — files only, no push):** update changed rows + the
   reconcile date in `SYNC-STATE.md`; a `CHANGELOG.md` entry only if a versioned artifact moved;
   fold new decisions into `00-decisions/`; fix any stale claim the scanner flagged (at the owner);
   append one dated line per environment to `SYNC-LOG.md`.
5. **Publish gate** — re-run the scanner. Only if GREEN, offer `bash _deploy.sh`. Wait for
   "deploy". After deploy, verify the live hub shows the current version and the "last updated"
   date matches the CHANGELOG.

## Notes
- The reorg (`_REORG-PROMPT.md`) builds the record layer this skill keeps in sync — do it first.
- Related but separate: the global `sync-figma-token` skill does deep code↔Figma token parity;
  use it for Tier-2 token checks, not as a replacement for this ritual.
