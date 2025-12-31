# CI.YML CLEANUP GUIDE

## 🚨 CRITICAL ISSUE IDENTIFIED
The ci.yml workflow file is corrupted with 8.1 MB of repetitive content (should be ~2-5 KB).

---

## 🎯 RECOMMENDED FIX APPROACH

### Option 1: Git History Restoration (RECOMMENDED)

```bash
cd /Users/henryherrera/MAIN

# Find the last good version
git log --all --full-history --oneline -- .github/workflows/ci.yml | head -20

# Check a specific commit
git show <commit-hash>:.github/workflows/ci.yml | head -100

# Once you find a clean version, restore it
git checkout <good-commit-hash> -- .github/workflows/ci.yml

# Then manually add the React Import Governance step
```

### Option 2: Manual Recreation

Create a clean ci.yml with this structure:

```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    name: Lint Code
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: React Import Governance
        run: npm run validate:react-imports
      
      - name: Run ESLint
        run: npm run lint

  typecheck:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: React Import Governance
        run: npm run validate:react-imports
      
      - name: Run TypeScript check
        run: npm run typecheck

  test:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: React Import Governance
        run: npm run validate:react-imports
      
      - name: Run unit tests
        run: npm test
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v4
        if: always()
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: false

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: [lint, typecheck, test]
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: React Import Governance
        run: npm run validate:react-imports
      
      - name: Build application
        run: npm run build
        env:
          NEXT_TELEMETRY_DISABLED: 1
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-artifacts
          path: .next
          retention-days: 1

  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: build-artifacts
          path: .next
      
      - name: Run Playwright tests
        run: npm run test:e2e
      
      - name: Upload Playwright report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## 🔍 KEY POINTS TO VERIFY

When recreating or restoring ci.yml, ensure:

1. **Each job appears ONLY ONCE**
   - ❌ No duplicate `test:` jobs
   - ❌ No duplicate `build:` jobs
   - ❌ No duplicate `lint:` jobs

2. **React Import Governance placement**
   - ✅ After "Install dependencies"
   - ✅ Before main job action (lint/test/build/typecheck)

3. **File size check**
   ```bash
   ls -lh .github/workflows/ci.yml
   # Should be 2-5 KB, NOT 8.1 MB
   ```

4. **YAML validation**
   ```bash
   # Use online YAML validator or:
   yamllint .github/workflows/ci.yml
   ```

---

## 🧪 TESTING AFTER CLEANUP

```bash
# 1. Validate workflow syntax
cat .github/workflows/ci.yml | head -200

# 2. Check file size
du -h .github/workflows/ci.yml

# 3. Test locally (if using act)
act -W .github/workflows/ci.yml --list

# 4. Commit and push to test branch
git checkout -b fix/ci-workflow-cleanup
git add .github/workflows/ci.yml
git commit -m "fix(ci): cleanup corrupted workflow file and restore React import governance"
git push origin fix/ci-workflow-cleanup

# 5. Verify workflow runs in GitHub Actions UI
```

---

## 📊 BEFORE/AFTER COMPARISON

| Metric | BEFORE (Corrupted) | AFTER (Clean) |
|--------|-------------------|---------------|
| File Size | 8.1 MB | 2-5 KB |
| Job Definitions | Hundreds (duplicated) | 4-6 (unique) |
| Workflow Parse | ❌ May fail | ✅ Valid YAML |
| React Governance | ⚠️ Present but duplicated | ✅ Present once per job |

---

## ⚡ QUICK FIX SCRIPT

```bash
#!/bin/bash
# save as: fix-ci-workflow.sh

cd /Users/henryherrera/MAIN

echo "🔍 Checking current ci.yml status..."
ls -lh .github/workflows/ci.yml

echo "📋 Finding last good version..."
git log --all --full-history --oneline -- .github/workflows/ci.yml | head -10

echo ""
echo "To restore, run:"
echo "  git checkout <COMMIT_HASH> -- .github/workflows/ci.yml"
echo ""
echo "Then manually add React Import Governance step after 'Install dependencies'"
```

---

**Status**: Ready for manual intervention  
**Priority**: High (blocks full CI enforcement)  
**Estimated Time**: 15-30 minutes
