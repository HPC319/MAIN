#!/bin/bash
set -e

cd /Users/henryherrera/MAIN

echo "=== GATE 1: Dependency Preflight ==="
npm run gatekeeper:dependencies

echo "=== GATE 3: Immutability Check ==="
npm run gatekeeper:immutability

echo "=== GATE 4: AST Validation ==="
npm run gatekeeper:ast

echo "=== GATE 5: Constitutional Lint ==="
npm run lint:constitutional

echo "=== GATE 6: Validate Invariants ==="
npm run validate:invariants

echo "=== GATE 7: Build ==="
npm run build

echo "✓ ALL GATES PASSED"
