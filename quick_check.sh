#!/bin/bash
cd /Users/henryherrera/MAIN

echo "=== Checking Git Status ==="
git status

echo -e "\n=== Checking for TypeScript errors ==="
npm run typecheck 2>&1 | tail -50

echo -e "\n=== Running Constitutional Lint ==="
npm run lint:constitutional 2>&1 | tail -100
