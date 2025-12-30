#!/bin/bash
# MAIN TASK EXECUTION LOOP
# FIX CI FAILURES - REPEAT UNTIL ALL PASS

set +e  # Don't exit on error, we need to catch failures
cd /Users/henryherrera/MAIN

echo "════════════════════════════════════════════════"
echo "  CI FIX LOOP - ITERATION START"
echo "════════════════════════════════════════════════"
echo ""

# Step 1-2: Check current state
echo "📋 Current git status:"
git status --short
echo ""

echo "📋 Current branch: $(git branch --show-current)"
echo "📋 Last commit: $(git log -1 --oneline)"
echo ""

# Check if there are uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  Uncommitted changes detected. These should have been committed already."
    echo "   According to task snapshot, all 13 fixes were committed in 6d07dcd"
    echo ""
    read -p "Press Enter to continue with gate checks..."
fi

# Step 3-5: Run gates sequentially until one fails
echo "════════════════════════════════════════════════"
echo "  RUNNING CONSTITUTIONAL GATES"
echo "════════════════════════════════════════════════"
echo ""

FAILED_GATE=""
FAILED_COMMAND=""

# GATE 1
echo "🔒 GATE 1: Dependency Preflight"
if npm run gatekeeper:dependencies > /tmp/gate1.log 2>&1; then
    echo "   ✅ PASSED"
else
    echo "   ❌ FAILED"
    FAILED_GATE="GATE 1: Dependency Preflight"
    FAILED_COMMAND="npm run gatekeeper:dependencies"
    cat /tmp/gate1.log
fi
echo ""

if [ -z "$FAILED_GATE" ]; then
    # GATE 3
    echo "🔒 GATE 3: Immutability Check"
    if npm run gatekeeper:immutability > /tmp/gate3.log 2>&1; then
        echo "   ✅ PASSED"
    else
        echo "   ❌ FAILED"
        FAILED_GATE="GATE 3: Immutability Check"
        FAILED_COMMAND="npm run gatekeeper:immutability"
        cat /tmp/gate3.log
    fi
    echo ""
fi

if [ -z "$FAILED_GATE" ]; then
    # GATE 4
    echo "🔒 GATE 4: AST Validation"
    if npm run gatekeeper:ast > /tmp/gate4.log 2>&1; then
        echo "   ✅ PASSED"
    else
        echo "   ❌ FAILED"
        FAILED_GATE="GATE 4: AST Validation"
        FAILED_COMMAND="npm run gatekeeper:ast"
        cat /tmp/gate4.log
        echo ""
        echo "Details from individual validators:"
        npm run validate:tokens 2>&1 | tail -30 || true
    fi
    echo ""
fi

if [ -z "$FAILED_GATE" ]; then
    # GATE 5
    echo "🔒 GATE 5: Constitutional Lint"
    if npm run lint:constitutional > /tmp/gate5.log 2>&1; then
        echo "   ✅ PASSED"
    else
        echo "   ❌ FAILED"
        FAILED_GATE="GATE 5: Constitutional Lint"
        FAILED_COMMAND="npm run lint:constitutional"
        cat /tmp/gate5.log | head -100
    fi
    echo ""
fi

if [ -z "$FAILED_GATE" ]; then
    # GATE 6
    echo "🔒 GATE 6: Validate Invariants"
    if npm run validate:invariants > /tmp/gate6.log 2>&1; then
        echo "   ✅ PASSED"
    else
        echo "   ❌ FAILED"
        FAILED_GATE="GATE 6: Validate Invariants"
        FAILED_COMMAND="npm run validate:invariants"
        cat /tmp/gate6.log
    fi
    echo ""
fi

if [ -z "$FAILED_GATE" ]; then
    # GATE 7: Build (just typecheck for now)
    echo "🔒 GATE 7: TypeCheck (Build prerequisite)"
    if npm run typecheck > /tmp/gate7.log 2>&1; then
        echo "   ✅ PASSED"
    else
        echo "   ❌ FAILED"
        FAILED_GATE="GATE 7: TypeCheck"
        FAILED_COMMAND="npm run typecheck"
        cat /tmp/gate7.log | tail -100
    fi
    echo ""
fi

# Results
echo "════════════════════════════════════════════════"
if [ -z "$FAILED_GATE" ]; then
    echo "  ✅ ALL GATES PASSED"
    echo "════════════════════════════════════════════════"
    echo ""
    echo "NEXT STEPS:"
    echo "1. Verify GitHub Actions status: gh run list --limit 3"
    echo "2. If CI still failing, check: gh run view --log"
    echo "3. Full build test: npm run build"
    echo ""
    exit 0
else
    echo "  ❌ FIRST FAILURE: $FAILED_GATE"
    echo "════════════════════════════════════════════════"
    echo ""
    echo "FAILED COMMAND:"
    echo "  $FAILED_COMMAND"
    echo ""
    echo "NEXT STEPS:"
    echo "1. Review error output above"
    echo "2. Fix the reported issues"
    echo "3. Run: git add . && git commit -m \"fix(ci): resolve $FAILED_GATE\" && git push"
    echo "4. Re-run this script"
    echo ""
    exit 1
fi
