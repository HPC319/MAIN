#!/bin/bash

# Delete all temporary script files
cd /Users/henryherrera/MAIN

echo "Deleting temporary script files..."

# List of files to delete
files=(
    "check_and_push.sh"
    "check_status.sh"
    "ci_fix_loop.sh"
    "commit_and_push.sh"
    "execute_task.sh"
    "git_commands.sh"
    "quick_check.sh"
    "run_all_gates.sh"
    "run_gates.sh"
    "test_gate1.sh"
    "verify_fixes.sh"
)

# Delete each file
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        echo "Deleted: $file"
    else
        echo "Not found: $file"
    fi
done

echo "Deletion complete!"
