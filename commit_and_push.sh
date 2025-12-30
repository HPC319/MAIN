#!/bin/bash
cd /Users/henryherrera/MAIN

# Check git status
echo "=== Current Git Status ==="
git status --short

# Check if there are changes to commit
if [[ -n $(git status --porcelain) ]]; then
    echo -e "\n=== Committing changes ==="
    git add .
    git commit -m "fix(ci): resolve remaining constitutional gate failure"
    
    echo -e "\n=== Pushing to remote ==="
    git push
    
    echo -e "\n=== SUCCESS: Changes pushed ==="
else
    echo -e "\n=== No changes to commit ==="
fi

# Show latest GitHub Actions run
echo -e "\n=== Checking GitHub Actions Status ==="
gh run list --limit 5 2>/dev/null || echo "GitHub CLI not available or not authenticated"
