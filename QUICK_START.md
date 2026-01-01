# 🚀 CanonStrata - Quick Start Guide

**Repository**: `/Users/henryherrera/Projects/MAIN`  
**Version**: 2.2.2  
**Status**: ✅ READY

---

## ⚡ Immediate Actions

```bash
# Navigate to repository
cd /Users/henryherrera/Projects/MAIN

# 1. Install dependencies (if needed)
npm install

# 2. Run all enforcement checks
npm run gatekeeper:all

# 3. Run invariant tests
npm run test:e2e tests/invariants/

# 4. Start development
npm run dev
```

---

## 🎯 Essential Commands

### Development
```bash
npm run dev                    # Start Next.js dev server
npm run dev:turbo             # Start with Turbo mode
npm run storybook             # Start Storybook
```

### Enforcement (Run Before Commit)
```bash
npm run gatekeeper:all        # Run all gatekeeper checks
npm run typecheck             # TypeScript validation
npm run lint                  # ESLint validation
npm run test:invariants       # Run invariant tests
```

### Individual Gatekeeper Checks
```bash
npm run gatekeeper:ast                # AST enforcement (no any, no suppressions)
npm run gatekeeper:boundaries         # Layer boundary isolation
npm run gatekeeper:tokens             # Design token compliance
npm run gatekeeper:motion             # Motion system validation
npm run gatekeeper:client-boundary    # Client/server boundaries
npm run gatekeeper:zod                # Zod schema validation
npm run gatekeeper:no-magic-motion    # No magic animation values
npm run gatekeeper:no-design-literals # No hardcoded design values
npm run gatekeeper:bundle-budget      # Bundle size limits
```

### Testing
```bash
npm run test:e2e tests/invariants/    # Run invariant tests
npx playwright test --ui               # Interactive test UI
npm run test:coverage                  # Coverage report
npm run test:a11y                      # Accessibility tests
```

### Build
```bash
npm run build                 # Production build (with validation)
npm run build:analyze         # Build with bundle analysis
npm run start                 # Start production server
```

---

## 📁 Directory Structure

```
/Users/henryherrera/Projects/MAIN/
│
├── src/
│   ├── core/                 # Kernel: Core types, constants, invariants
│   ├── kernel/               # Kernel: Config, errors
│   ├── lib/                  # Governed: Utilities
│   ├── components/           # Governed: UI components
│   ├── app/                  # Surface: Next.js App Router
│   └── contractors/          # Isolation: Third-party integrations
│
├── design-system/
│   └── tokens/               # Design tokens (5 JSON files)
│
├── scripts/
│   └── gatekeeper/           # Enforcement scripts (12 files)
│
├── tests/
│   └── invariants/           # Invariant tests (3 files, 23+ tests)
│
├── .github/
│   └── workflows/            # CI/CD workflows (6 files)
│
└── docs/                     # Documentation
```

---

## 🎓 Architectural Rules

### Layer Isolation
```
Surface (src/app/) → Governed → Kernel
Governed (src/lib/, src/components/) → Kernel only
Isolation (src/contractors/) → Kernel only
Kernel (src/core/, src/kernel/) → No dependencies
```

### Design Tokens
```typescript
// ❌ FORBIDDEN
<div className="bg-blue-500 text-white p-4">

// ✅ REQUIRED
import { tokens } from '@/design-system/tokens'
<div style={{
  backgroundColor: tokens.colors.brand.primary[500],
  color: tokens.colors.neutral[50],
  padding: tokens.spacing.scale[4]
}}>
```

### Motion
```typescript
// ❌ FORBIDDEN
<div style={{ transition: 'all 0.3s ease' }}>

// ✅ REQUIRED
import { motion } from 'framer-motion'
import { tokens } from '@/design-system/tokens'
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: tokens.motion.duration.normal }}
>
```

### Type Safety
```typescript
// ❌ FORBIDDEN
const data: any = fetchData()
// @ts-ignore
const result = data.value

// ✅ REQUIRED
interface Data { value: string }
const data: Data = fetchData()
const result = data.value
```

---

## 🛠️ Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Scripts + dependencies (8.8 KB) |
| `tsconfig.json` | TypeScript strict config |
| `next.config.ts` | Next.js optimization |
| `tailwind.config.ts` | Tailwind + tokens (1.6 KB) |
| `eslint.constitutional.config.mjs` | ESLint v9 flat config (11.5 KB) |
| `.prettierrc.json` | Prettier formatting |
| `.size-limit.json` | Bundle budgets (645 B) |
| `playwright.config.ts` | Playwright testing |

---

## 📚 Documentation

| Document | Purpose | Size |
|----------|---------|------|
| `README.md` | Constitutional architecture overview | 10.9 KB |
| `docs/ARCHITECTURE.md` | Comprehensive guide | 18.2 KB |
| `src/contractors/README.md` | Contractor integration | 2.5 KB |
| `IMPLEMENTATION_SUMMARY.md` | Complete implementation details | 17.4 KB |
| `FILE_AGENT_COMPLETE.md` | File Agent execution report | - |

---

## 🔍 Common Tasks

### Add a New Component
```bash
# 1. Create in governed layer
touch src/components/ui/MyComponent.tsx

# 2. Use design tokens
import { tokens } from '@/design-system/tokens'

# 3. Export from index
echo "export { MyComponent } from './ui/MyComponent'" >> src/components/index.ts

# 4. Run checks
npm run gatekeeper:boundaries
npm run gatekeeper:tokens
```

### Add a New Page
```bash
# 1. Create in surface layer
mkdir -p src/app/my-page
touch src/app/my-page/page.tsx

# 2. Import from governed or kernel only
import { MyComponent } from '@/components'

# 3. Run checks
npm run gatekeeper:boundaries
npm run typecheck
```

### Add a New Contractor
```bash
# 1. Define contract in isolation zone
# Edit: src/contractors/contracts.ts

# 2. Register in registry
# Edit: src/contractors/registry.ts

# 3. Implement with kernel types only
# Create: src/contractors/implementations/MyContractor.ts

# 4. Run checks
npm run gatekeeper:boundaries
```

### Add a New Token
```bash
# 1. Edit token file
# Edit: design-system/tokens/colors.tokens.json

# 2. Validate
npm run gatekeeper:tokens
npm run gatekeeper:zod

# 3. Rebuild Tailwind config
npm run dev
```

---

## 🚨 Troubleshooting

### Gatekeeper Failures

**Problem**: `gatekeeper:ast` fails with "any type detected"  
**Solution**: Replace `any` with proper types using `unknown` or specific interfaces

**Problem**: `gatekeeper:boundaries` fails with "illegal import"  
**Solution**: Check layer isolation rules - Surface can't import from Isolation

**Problem**: `gatekeeper:tokens` fails with "hardcoded color"  
**Solution**: Replace hex colors with `tokens.colors.*`

**Problem**: `gatekeeper:motion` fails with "missing use client"  
**Solution**: Add `"use client"` directive to files using Framer Motion

**Problem**: `gatekeeper:bundle-budget` fails  
**Solution**: Check bundle size with `npm run build:analyze`

### Build Failures

**Problem**: TypeScript errors  
**Solution**: Run `npm run typecheck` to see errors

**Problem**: ESLint errors  
**Solution**: Run `npm run lint:fix` to auto-fix

**Problem**: Test failures  
**Solution**: Run `npm run test:e2e:ui` for interactive debugging

### Development Issues

**Problem**: Hot reload not working  
**Solution**: Try `npm run dev:turbo` or restart dev server

**Problem**: Design tokens not updating  
**Solution**: Restart dev server after token changes

**Problem**: Storybook not loading components  
**Solution**: Check `"use client"` directives and token imports

---

## 📊 Monitoring

### Bundle Size
```bash
npm run build:analyze          # Generate bundle report
npm run monitor:bundle         # Monitor bundle size
npm run gatekeeper:bundle-budget  # Check against limits
```

### Performance
```bash
npm run lighthouse             # Lighthouse audit
npm run monitor:perf           # Performance monitoring
npm run monitor:vitals         # Web Vitals monitoring
```

### Code Quality
```bash
npm run lint                   # ESLint
npm run typecheck              # TypeScript
npm run format:check           # Prettier
npm run gatekeeper:all         # All enforcement
```

---

## 🎯 Pre-Commit Checklist

```bash
# 1. Run all enforcement
npm run gatekeeper:all         ✅

# 2. Type check
npm run typecheck              ✅

# 3. Lint
npm run lint                   ✅

# 4. Format
npm run format                 ✅

# 5. Test
npm run test:e2e tests/invariants/  ✅

# 6. Build
npm run build                  ✅
```

**Note**: Husky pre-commit hooks will run these automatically

---

## 🔗 Quick Links

- **Repository**: `/Users/henryherrera/Projects/MAIN`
- **Dev Server**: `http://localhost:3000` (after `npm run dev`)
- **Storybook**: `http://localhost:6006` (after `npm run storybook`)
- **Playwright UI**: Run `npx playwright test --ui`

---

## 📋 File Counts

- **Kernel Layer**: 7 files (src/core/, src/kernel/)
- **Governed Layer**: 5 files (src/lib/, src/components/)
- **Isolation Zone**: 4 files (src/contractors/)
- **Design Tokens**: 5 JSON files
- **Gatekeeper Scripts**: 12 scripts
- **Invariant Tests**: 3 files (23+ tests)
- **Workflows**: 6 CI/CD workflows
- **Documentation**: 5 comprehensive docs

---

## ✅ Status

✅ All directories created  
✅ All files implemented  
✅ All scripts integrated  
✅ All tests passing  
✅ All enforcement operational  
✅ Documentation complete  

**The constitutional architecture is ready for use.**

---

**Version**: 2.2.2  
**Date**: January 1, 2026  
**Status**: ✅ OPERATIONAL
