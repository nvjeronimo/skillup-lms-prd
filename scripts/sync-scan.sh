#!/usr/bin/env bash
#
# sync-scan.sh — Tier-1 drift scanner for the SkillUp LMS record repo.
# Deterministic, local-only (no Figma / gh / network beyond a git fetch). Catches the drift that
# bites: stale version claims, renamed-file slugs, hub-behind-record, broken record links,
# dirty tree / OneDrive lock junk.
#
# Usage:  bash scripts/sync-scan.sh
# Exit:   0 = green (nothing to fix)   1 = drift found (details printed)   2 = not a git repo
#
set -uo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || { echo "not a git repo"; exit 2; }
cd "$ROOT"

FAIL=0
note() { printf '  \033[33m⚠ %s\033[0m\n' "$1"; FAIL=1; }
ok()   { printf '  \033[32m✓ %s\033[0m\n' "$1"; }
sect() { printf '\n\033[1m%s\033[0m\n' "$1"; }

# Current version, from the record's changelog (the single clock)
CUR_VER="$(grep -m1 '^## v' LMS-HANDOFF/CHANGELOG.md 2>/dev/null | sed -E 's/^## (v[0-9.]+).*/\1/')"
sect "Record version (CHANGELOG): ${CUR_VER:-UNKNOWN}"

# --- a) Stale count/version claims presented as current --------------------------
# Only files that state the count as fact. CHANGELOG documenting the old value is legitimate;
# *.bak are historical snapshots — both excluded.
sect "a) Stale count / version claims"
STALE="$(grep -rn '132 components\|132 total\|(v1\.8 = latest)\|(v2\.0 = latest)\|(v3\.0 = latest)' \
        LMS-HANDOFF/README.md LMS-HANDOFF/components-inventory.md index.html prd/index.html 2>/dev/null || true)"
if [ -n "$STALE" ]; then note "count/version stated as current but stale (recount 132→132+23):"; echo "$STALE" | sed 's/^/      /'
else ok "no stale count/version claims"; fi

# --- b) Renamed-file Figma slug --------------------------------------------------
sect "b) Renamed Figma slug"
SLUG="$(grep -rn 'Learner-Platform-Experience-Discovery\|Design V4' . \
        --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=scripts \
        --exclude='SYNC-*.md' --exclude='_REORG-PROMPT.md' --exclude='*.bak' 2>/dev/null || true)"
if [ -n "$SLUG" ]; then note "old slug / 'Design V4' still present (rename to LMS-ICP-Phase-1):"; echo "$SLUG" | sed 's/^/      /'
else ok "no stale Figma slug"; fi

# --- c) Hub behind record --------------------------------------------------------
sect "c) Hub vs record version"
git fetch -q origin 2>/dev/null || note "could not fetch origin (offline?) — hub check inconclusive"
HUB_LAST="$(git log -1 --format='%s' origin/main -- index.html 2>/dev/null)"
echo "      hub last index.html commit: ${HUB_LAST:-unknown}"
if [ -n "$CUR_VER" ] && [ -n "$HUB_LAST" ] && ! printf '%s' "$HUB_LAST" | grep -q "$CUR_VER"; then
  note "hub does not reference current $CUR_VER — likely stale, run _deploy.sh"
elif [ -n "$HUB_LAST" ]; then ok "hub commit references current version"; fi

# --- d) Broken internal .md links in the record ----------------------------------
sect "d) Broken internal .md links in the record"
BROKEN=0
while IFS= read -r src; do
  [ -f "$src" ] || continue
  dir="$(dirname "$src")"
  grep -oE '\]\(([^)#]+\.md)' "$src" 2>/dev/null | sed -E 's/^\]\(//' | while IFS= read -r link; do
    case "$link" in http*|/*) continue;; esac
    [ -e "$dir/$link" ] || printf '      broken: %s -> %s\n' "$src" "$link"
  done
done < <(find LMS-HANDOFF 00-decisions -name '*.md' 2>/dev/null) > /tmp/sync_broken.$$ 2>/dev/null
if [ -s /tmp/sync_broken.$$ ]; then note "broken .md links:"; cat /tmp/sync_broken.$$; BROKEN=1; fi
rm -f /tmp/sync_broken.$$
[ "$BROKEN" -eq 0 ] && ok "no broken .md links detected"

# --- e) Tree clean + OneDrive junk ----------------------------------------------
sect "e) Working tree + OneDrive hygiene"
DIRTY="$(git status --short 2>/dev/null | command head -20)"
if [ -n "$DIRTY" ]; then echo "      uncommitted changes (commit as the daily checkpoint):"; echo "$DIRTY" | sed 's/^/      /'
else ok "tree clean"; fi
LOCKS="$(find . -name '.~lock.*' -not -path './.git/*' 2>/dev/null | command head)"
[ -n "$LOCKS" ] && { note "OneDrive lock files present (let the app settle):"; echo "$LOCKS" | sed 's/^/      /'; }
[ -e ".git/index.lock" ] && note "stale .git/index.lock present (OneDrive/git race) — rm before git ops"

# --- summary ---------------------------------------------------------------------
sect "Result"
if [ "$FAIL" -eq 0 ]; then printf '  \033[32mGREEN — Tier-1 clean. Safe to publish.\033[0m\n'
else printf '  \033[33mDRIFT — fix the ⚠ items above before _deploy.sh.\033[0m\n'; fi
exit $FAIL
