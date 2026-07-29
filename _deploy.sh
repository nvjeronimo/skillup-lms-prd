#!/usr/bin/env bash
#
# Deploy script — pushes the hub + numbered structure to GitHub Pages (skillup-lms-prd).
# Usage:  cd to project folder, then:  bash _deploy.sh
#
set -e

cd "$(dirname "$0")"

# 1. Clear any stale git lock
rm -f .git/index.lock

# 2. Stash local changes ONLY if there are any — and remember whether we did.
#    (Blindly popping later would apply an unrelated pre-existing stash. Guard it.)
echo "=== Checking for local changes to stash ==="
STASHED=0
if [ -n "$(git status --porcelain)" ]; then
  git stash push --include-untracked -m "pre-deploy-stash"
  STASHED=1
  echo "Stashed local changes."
else
  echo "Working tree clean — nothing to stash."
fi

# 3. Pull remote changes (rebase keeps history linear)
echo "=== Fetching + rebasing on remote ==="
git fetch origin main
git pull --rebase origin main

# 4. Restore ONLY the stash we just created (never an older one)
if [ "$STASHED" = "1" ]; then
  echo "=== Restoring stashed changes ==="
  git stash pop || echo "Stash pop had conflicts — resolve manually, then re-run."
fi

# 5. Show what we're about to commit
echo "=== Pre-commit status ==="
git status --short

# 6. Stage what should be deployed to GitHub Pages.
#    (heavy media + _workspace are gitignored; -f only for the tracked _media/README stub.)
git add -A index.html README.md OPEN-ACTIONS.md SYNC-STATE.md SYNC-LOG.md SYNC-PLAYBOOK.md 2>/dev/null || true
git add -A 00-decisions/ 01-ready-for-dev/ 02-content-types/ 03-design-system/ 2>/dev/null || true
git add -A 04-research/ 05-source-docs/ 06-v8-complementary/ 90-prototypes/ 2>/dev/null || true
git add -A LMS-HANDOFF/ _history/ _archive/ scripts/ 2>/dev/null || true
git add -f _media/README.md 2>/dev/null || true

# 7. Commit (only if there's something staged)
if git diff --cached --quiet; then
  echo "Nothing new staged — commits already present will be pushed."
else
  git commit -m "hub sync — $(date +%Y-%m-%d)

Deploy the current hub + numbered structure (00-decisions … 06-v8-complementary),
handoff package, and registers (OPEN-ACTIONS, SYNC-STATE). See LMS-HANDOFF/CHANGELOG.md
for the version of record (v3.3)."
fi

# 8. Push to GitHub
git push origin main

echo ""
echo "=== Deploy complete ==="
echo "Hub: https://nvjeronimo.github.io/skillup-lms-prd/"
echo ""
