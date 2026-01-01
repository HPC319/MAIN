# CanonStrata Constitutional Architecture

**Version 2.2.2**

A rigorously architected Next.js system implementing constitutional governance, strict layer isolation, and enforceable design contracts.

---

## 🏛️ Constitutional Principles

### 1. **Architectural Layers**
Four distinct layers with strict dependency rules:

```
┌─────────────────────────────────────┐
│         SURFACE LAYER               │  App Router, Pages
│         (src/app/)                  │  Can import: Governed, Kernel
├─────────────────────────────────────┤
│         GOVERNED LAYER              │  Components, Utilities
│    (src/lib/, src/components/)     │  Can import: Kernel only
├─────────────────────────────────────┤
│         KERNEL LAYER                │  Core Types, Constants
│    (src/core/, src/kernel/)        │  No dependencies
├─────────────────────────────────────┤
│         ISOLATION ZONE              │  Third-party Contractors
│      (src/contractors/)             │  Can import: Kernel only
└─────────────────────────────────────┘
```

### 2. **Design Token Sovereignty**
All visual properties must reference design tokens from `design-system/tokens/`:
- ❌ `color: #3b82f6`
- ✅ `color: tokens.colors.brand.primary[500]`

### 3. **Motion Governance**
Animations exclusively through Framer Motion + design tokens:
- ❌ `transition: all 0.3s ease`
- ✅ `motion.div` + `duration: tokens.motion.duration.normal`

### 4. **Type Safety Absolutism**
- Zero `any` types allowed
- No TypeScript error suppressions (`@ts-ignore`)
- Strict mode enabled

### 5. **Client Boundary Clarity**
Explicit `"use client"` directive for:
- React hooks (useState, useEffect, etc.)
- Event handlers (onClick, onChange)
- Framer Motion components

---

## 📁 Directory Structure

```
/
├── .github/workflows/        # CI/CD with hard-fail enforcement
│   ├── ci.yml
│   └── deploy.yml
├── design-system/
│   └── tokens/              # Design token source of truth
│       ├── colors.tokens.json
│       ├── spacing.tokens.json
│       ├── typography.tokens.json
│       ├── motion.tokens.json
│       └── breakpoints.tokens.json
├── scripts/
│   └── gatekeeper/          # Constitutional enforcement scripts
│       ├── ast-enforcer.ts          # AST-level rule enforcement
│       ├── boundary-check.ts        # Layer isolation verification
│       ├── token-check.ts           # Design token compliance
│       ├── motion-check.ts          # Framer Motion validation
│       ├── client-boundary-check.ts # use client verification
│       ├── zod-sync.ts              # Token schema validation
│       ├── no-magic-motion.ts       # Magic value detection
│       ├── no-design-literals.ts    # Hardcoded literal detection
│       └── check-bundle-budget.ts   # Bundle size enforcement
├── src/
│   ├── core/                # Kernel: Pure types & constants
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   └── invariants.ts
│   ├── kernel/              # Kernel: System configuration
│   │   ├── config.ts
│   │   └── errors.ts
│   ├── lib/                 # Governed: Utilities
│   │   ├── formatting.ts
│   │   └── validation.ts
│   ├── components/          # Governed: UI components
│   │   └── ui/
│   ├── app/                 # Surface: Next.js App Router
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── contractors/         # Isolation: Third-party integrations
│       ├── contracts.ts
│       ├── registry.ts
│       └── README.md
├── tests/
│   └── invariants/          # Invariant contract tests
│       ├── page-render.spec.ts
│       ├── form-submit.spec.ts
│       └── existence.spec.ts
├── .size-limit.json         # Bundle budget configuration
├── tailwind.config.ts       # Tailwind referencing design tokens
├── eslint.constitutional.config.mjs
└── package.json             # Constitutional scripts
```

---

## 🛠️ Constitutional Scripts

### Enforcement
```bash
npm run gatekeeper:ast          # AST enforcement checks
npm run gatekeeper:boundaries   # Layer boundary verification
npm run validate:tokens         # Design token compliance
npm run validate:motion         # Motion system validation
npm run validate:all            # Complete validation suite
```

### Development
```bash
npm run dev                     # Development server
npm run build                   # Production build (with enforcement)
npm run typecheck               # TypeScript validation
npm run lint:constitutional     # ESLint v9 flat config
```

### Testing
```bash
npm run test:e2e                # Playwright E2E tests
npm run test:invariants         # Invariant contract tests
npm run test:coverage           # Coverage reports
```

### Monitoring
```bash
npm run monitor:bundle          # Bundle size analysis
npm run monitor:perf            # Performance monitoring
```

---

## 🔒 Enforcement Mechanisms

### 1. **Pre-commit Hooks** (Husky)
```bash
.husky/pre-commit
├─ Type checking
├─ ESLint constitutional
├─ AST enforcement
└─ Token validation
```

### 2. **CI Pipeline** (GitHub Actions)
Every push/PR triggers:
1. Gatekeeper enforcement (all scripts)
2. TypeScript type check
3. ESLint constitutional
4. Invariant tests (Playwright)
5. Production build
6. Bundle budget check

**HARD FAIL**: Any violation = PR blocked

### 3. **Runtime Validation**
- Zod schemas for design tokens
- Type guards at contractor boundaries
- Invariant assertions in kernel layer

---

## 🎨 Design System Integration

### Using Design Tokens
```typescript
// ❌ FORBIDDEN
const Button = styled.button`
  color: #3b82f6;
  padding: 16px;
  transition: all 0.3s ease;
`;

// ✅ CONSTITUTIONAL
import colors from '@/design-system/tokens/colors.tokens.json';
import spacing from '@/design-system/tokens/spacing.tokens.json';
import motion from '@/design-system/tokens/motion.tokens.json';

const Button = styled.button`
  color: ${colors.brand.primary[500]};
  padding: ${spacing[4]};
  transition-duration: ${motion.duration.normal};
`;
```

### Tailwind Integration
```tsx
// Tailwind classes automatically reference design tokens
<button className="bg-brand-primary-500 p-4 transition-normal">
  Click Me
</button>
```

---

## 🏗️ Layer Architecture

### Kernel Layer (`src/core/`, `src/kernel/`)
**Purpose**: Foundational primitives, immutable constants, core types

**Rules**:
- ❌ No external dependencies (except TypeScript)
- ❌ No imports from other layers
- ✅ Pure functions only
- ✅ Type definitions
- ✅ Constants

**Example**:
```typescript
// src/core/types.ts
export interface Result<T, E = Error> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: E;
}
```

### Governed Layer (`src/lib/`, `src/components/`)
**Purpose**: Shared utilities and UI components

**Rules**:
- ✅ Can import from Kernel
- ❌ Cannot import from Surface or Isolation
- ✅ Reusable across application
- ✅ Design token compliant

**Example**:
```typescript
// src/lib/formatting.ts
import { assert } from '@/core/invariants';

export function formatCurrency(amount: number): string {
  assert(amount >= 0, 'Amount must be non-negative');
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
```

### Surface Layer (`src/app/`)
**Purpose**: Next.js App Router pages and layouts

**Rules**:
- ✅ Can import from Governed and Kernel
- ❌ Cannot import from Isolation
- ✅ Server components by default
- ✅ Explicit `"use client"` for client features

**Example**:
```typescript
// src/app/page.tsx
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/formatting';

export default function HomePage() {
  return <div>{formatCurrency(100)}</div>;
}
```

### Isolation Zone (`src/contractors/`)
**Purpose**: Third-party integrations (analytics, payments, email)

**Rules**:
- ✅ Can import from Kernel only
- ❌ Cannot import from Governed or Surface
- ✅ Must implement contract interface
- ✅ Registered in central registry

**Example**:
```typescript
// src/contractors/analytics/google.ts
import { AnalyticsContractor } from '@/contractors/contracts';
import { Result } from '@/core/types';

export const googleAnalytics: AnalyticsContractor = {
  config: { name: 'google-analytics', version: '1.0.0', enabled: true },
  
  async track(event: string, properties?: Record<string, unknown>): Promise<Result<void>> {
    try {
      // Implementation
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  },
};
```

---

## 📊 Monitoring & Observability

### Bundle Budget
Configured in `.size-limit.json`:
- Main bundle: 200 KB
- Page bundles: 150 KB
- Shared chunks: 100 KB
- CSS: 50 KB

### Performance Metrics
- Lighthouse CI on every PR
- Web Vitals monitoring
- Bundle analysis with webpack-bundle-analyzer

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 20
- npm ≥ 10

### Installation
```bash
git clone <repository>
cd MAIN
npm install
```

### Development
```bash
npm run dev
# Visit http://localhost:3000
```

### Before Committing
```bash
npm run validate:all    # Runs all enforcement checks
npm run typecheck       # TypeScript validation
npm run lint            # ESLint
npm run test            # Tests
```

---

## 📚 Documentation

- [Contractor Integration Guide](./src/contractors/README.md)
- [Design Token Specification](./design-system/tokens/README.md)
- [CI/CD Architecture](../.github/workflows/CI_YML_CLEANUP_GUIDE.md)
- [Testing Strategy](./tests/README.md)

---

## 🔐 Security

- No API keys in code (use environment variables)
- Prisma for type-safe database access
- NextAuth for authentication
- CSRF protection enabled
- Security headers configured

---

## 📈 Versioning

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking architectural changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

Current: **v2.2.2**

---

## 📄 License

MIT License - See LICENSE file

---

## 🙏 Acknowledgments

Built on the principles of:
- **Constitutional Architecture**: Enforceable rules at build time
- **Design Token Methodology**: Single source of truth for design decisions
- **Layer Pattern**: Strict dependency management
- **Contract-First Integration**: Isolation of third-party code

---

**Maintained with architectural rigor. Every commit is a constitutional act.**
