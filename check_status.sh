#!/bin/bash
cd /Users/henryherrera/MAIN

echo "=== Git Status ==="
git status --short

echo -e "\n=== Current Branch ==="
git branch --show-current

echo -e "\n=== Last Commit ==="
git log -1 --oneline

echo -e "\n=== Running GATE 1: Dependency Preflight ==="
npm run gatekeeper:dependencies

echo -e "\n=== Running GATE 3: Immutability Check ==="
npm run gatekeeper:immutability

echo -e "\n=== Running GATE 4: AST Validation ==="
npm run gatekeeper:ast 2>&1 | head -100

echo -e "\n=== Running GATE 5: Constitutional Lint ==="
npm run lint:constitutional 2>&1 | head -100

echo -e "\n=== Running GATE 6: Validate Invariants ==="
npm run validate:invariants 2>&1 | head -100
