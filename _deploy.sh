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
git add -A index.html
git add -A LMS-HANDOFF/
git add -A _history/

# 7. Commit (only if there's something staged)
if git diff --cached --quiet; then
  echo "Nothing staged — skipping commit."
else
  git commit -m "v1.9 token modes: 4 modes wired, WCAG 2.2 AA validated, focus-ring + AC5b added

- LMS-HANDOFF/tokens/colors.css: 4 mode definitions (Light/Dark x SKO/BrandX) via root data-attrs
- LMS-HANDOFF/CHANGELOG.md: v1.9 entry covering mode mapping, fixes, new tokens
- DS file: 3 modes configured (Dark SKO fixes + Light/Dark BrandX from greens) + LMS/Border/border-focus-ring semantic + AC5b_Red5b #E8797B primitive for dark error
- All 16/16 contrast checks pass per mode (WCAG 2.2 AA)
- Token validation swatch at DS node 20022:429459 page FOUNDATIONS"
fi

# 8. Push to GitHub
git push origin main

echo ""
echo "=== Deploy complete ==="
echo "Hub: https://nvjeronimo.github.io/skillup-lms-prd/"
echo ""
