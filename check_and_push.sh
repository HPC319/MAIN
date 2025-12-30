#!/bin/bash
set -e
cd /Users/henryherrera/MAIN

echo "=== GIT STATUS CHECK ==="
git status --short

echo ""
echo "=== CURRENT BRANCH ==="
git branch --show-current

echo ""
echo "=== LAST 3 COMMITS ==="
git log -3 --oneline

echo ""
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  UNCOMMITTED CHANGES DETECTED"
    echo ""
    echo "=== ADDING ALL CHANGES ==="
    git add .
    
    echo ""
    echo "=== COMMITTING ==="
    git commit -m "fix(ci): resolve remaining constitutional gate failure"
    
    echo ""
    echo "=== PUSHING TO REMOTE ==="
    git push
    
    echo ""
    echo "✅ CHANGES COMMITTED AND PUSHED"
else
    echo "✅ NO UNCOMMITTED CHANGES - Repository is clean"
    echo ""
    echo "=== CHECKING LATEST GITHUB ACTIONS RUN ==="
    echo "Run: gh run list --limit 3"
    gh run list --limit 3 2>&1 || echo "Note: GitHub CLI may need authentication"
fi

echo ""
echo "=== NEXT STEP: Check CI status at https://github.com/$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions ==="
