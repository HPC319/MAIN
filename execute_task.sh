#!/bin/bash
# EXECUTE TASK: Fix CI Failures Loop
cd /Users/henryherrera/MAIN

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "Committing remaining changes..."
    git add .
    git commit -m "fix(ci): resolve remaining constitutional gate failure"
    git push
    echo "Changes pushed. Check CI: https://github.com/$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions"
else
    echo "No uncommitted changes."
    echo "All 13 TypeScript fixes are committed (6d07dcd)."
    echo ""
    echo "Checking latest CI run..."
    gh run list --limit 5 2>/dev/null || echo "Use: gh run view --log (to check failing run)"
    echo ""
    echo "To run gates locally: bash ci_fix_loop.sh"
fi
