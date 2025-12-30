#!/bin/bash
cd /Users/henryherrera/MAIN

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  CONSTITUTIONAL GATES - LOCAL EXECUTION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Track failures
FAILED_GATES=()

# GATE 1: Dependency Preflight
echo "🔒 GATE 1: Dependency Preflight"
if npm run gatekeeper:dependencies 2>&1; then
    echo "✅ GATE 1: PASSED"
else
    echo "❌ GATE 1: FAILED"
    FAILED_GATES+=("GATE 1: Dependency Preflight")
fi
echo ""

# GATE 3: Immutability Check
echo "🔒 GATE 3: Immutability Check"
if npm run gatekeeper:immutability 2>&1; then
    echo "✅ GATE 3: PASSED"
else
    echo "❌ GATE 3: FAILED"
    FAILED_GATES+=("GATE 3: Immutability Check")
fi
echo ""

# GATE 4: AST Validation
echo "🔒 GATE 4: AST Validation"
if npm run gatekeeper:ast 2>&1; then
    echo "✅ GATE 4: PASSED"
else
    echo "❌ GATE 4: FAILED"
    FAILED_GATES+=("GATE 4: AST Validation")
    echo ""
    echo "Running individual AST validators for details:"
    echo "--- Token Validation ---"
    npm run validate:tokens 2>&1 | tail -20 || true
    echo ""
    echo "--- Motion Validation ---"
    npm run validate:motion 2>&1 | tail -20 || true
fi
echo ""

# GATE 5: Constitutional Lint
echo "🔒 GATE 5: Constitutional Lint"
if npm run lint:constitutional 2>&1; then
    echo "✅ GATE 5: PASSED"
else
    echo "❌ GATE 5: FAILED"
    FAILED_GATES+=("GATE 5: Constitutional Lint")
    echo ""
    echo "Showing lint errors:"
    npm run lint:constitutional 2>&1 | grep -A 5 "error" | head -30 || true
fi
echo ""

# GATE 6: Validate Invariants
echo "🔒 GATE 6: Validate Invariants"
if npm run validate:invariants 2>&1; then
    echo "✅ GATE 6: PASSED"
else
    echo "❌ GATE 6: FAILED"
    FAILED_GATES+=("GATE 6: Validate Invariants")
fi
echo ""

# GATE 7: TypeCheck (subset of build)
echo "🔒 GATE 7: TypeCheck"
if npm run typecheck 2>&1 | tee /tmp/typecheck.log; then
    echo "✅ GATE 7: TypeCheck PASSED"
else
    echo "❌ GATE 7: TypeCheck FAILED"
    FAILED_GATES+=("GATE 7: TypeCheck")
    echo ""
    echo "TypeScript errors:"
    tail -50 /tmp/typecheck.log || true
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ ${#FAILED_GATES[@]} -eq 0 ]; then
    echo "  ✅ ALL GATES PASSED"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Next: Run full build with 'npm run build'"
    exit 0
else
    echo "  ❌ FAILED GATES:"
    for gate in "${FAILED_GATES[@]}"; do
        echo "     • $gate"
    done
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    exit 1
fi
