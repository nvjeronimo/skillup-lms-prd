#!/usr/bin/env bash
#
# Deploy script — v1.9 token modes sync
# Usage:  cd to project folder, then:  bash _deploy.sh
#
set -e

cd "$(dirname "$0")"

# 1. Clear any stale git lock
rm -f .git/index.lock

# 2. Stash all changes + untracked files so rebase can proceed cleanly
echo "=== Stashing local changes + untracked files ==="
git stash push --include-untracked -m "pre-deploy-stash" || true

# 3. Pull remote changes (rebase keeps history linear)
echo "=== Fetching + rebasing on remote ==="
git fetch origin main
git pull --rebase origin main

# 4. Restore stashed changes
echo "=== Restoring local changes ==="
git stash pop || echo "Stash pop had conflicts — resolve manually if needed"

# 5. Show what we're about to commit
echo "=== Pre-commit status ==="
git status --short

# 6. Stage what should be deployed to GitHub Pages
#    (heavy media + _workspace are gitignored, so these adds never pull in binaries)
git add -A index.html README.md OPEN-ACTIONS.md SYNC-STATE.md SYNC-LOG.md SYNC-PLAYBOOK.md
git add -A 00-decisions/ 01-ready-for-dev/ 02-content-types/ 03-design-system/
git add -A 04-research/ 05-source-docs/ 06-v8-complementary/ 90-prototypes/
git add -A LMS-HANDOFF/ _history/ _archive/ _media/README.md scripts/

# 7. Commit (only if there's something staged)
if git diff --cached --quiet; then
  echo "Nothing staged — skipping commit."
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
