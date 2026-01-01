# CanonStrata Constitutional Architecture

## Table of Contents
1. [Overview](#overview)
2. [Architectural Layers](#architectural-layers)
3. [Design Token System](#design-token-system)
4. [Enforcement Mechanisms](#enforcement-mechanisms)
5. [Contractor Integration](#contractor-integration)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Testing Strategy](#testing-strategy)

---

## Overview

CanonStrata implements a **constitutional architecture** where architectural rules are not mere guidelines but enforceable contracts verified at build time and in CI/CD pipelines.

### Core Principles

1. **Immutability**: Design tokens are the single source of truth
2. **Isolation**: Strict layer boundaries enforced via AST analysis
3. **Contract-First**: All integrations through explicit contracts
4. **Type Safety**: Zero tolerance for `any` types or suppressions
5. **Enforceability**: Architectural violations = build failures

---

## Architectural Layers

### Layer Hierarchy

```
Surface Layer (src/app/)
    ↓ can import
Governed Layer (src/lib/, src/components/)
    ↓ can import
Kernel Layer (src/core/, src/kernel/)

Isolation Zone (src/contractors/)
    → can ONLY import from Kernel
```

### Kernel Layer

**Files**: `src/core/`, `src/kernel/`

**Purpose**: Foundational primitives that have zero dependencies

**Contents**:
- Type definitions (`types.ts`)
- System constants (`constants.ts`)
- Invariant assertions (`invariants.ts`)
- Core configuration (`config.ts`)
- Error definitions (`errors.ts`)

**Rules**:
- ❌ NO external dependencies (except TypeScript)
- ❌ NO imports from other layers
- ✅ Pure functions only
- ✅ Immutable data structures

**Example**:
```typescript
// src/core/types.ts
export interface Result<T, E = Error> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: E;
}

export type Immutable<T> = {
  readonly [K in keyof T]: T[K] extends object ? Immutable<T[K]> : T[K];
};
```

### Governed Layer

**Files**: `src/lib/`, `src/components/`

**Purpose**: Shared utilities and reusable UI components

**Contents**:
- Utility functions (formatting, validation)
- UI component library
- Shared hooks (with `"use client"`)
- Design system components

**Rules**:
- ✅ Can import from Kernel
- ❌ Cannot import from Surface or Isolation
- ✅ Must use design tokens for all visual properties
- ✅ Components must have `"use client"` if using hooks/events

**Example**:
```typescript
// src/lib/formatting.ts
import { assert } from '@/core/invariants';

export function formatCurrency(amount: number, currency = 'USD'): string {
  assert(amount >= 0, 'Amount must be non-negative');
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
```

### Surface Layer

**Files**: `src/app/`

**Purpose**: Next.js App Router pages, layouts, and route handlers

**Contents**:
- Pages (`page.tsx`)
- Layouts (`layout.tsx`)
- Route handlers (`route.ts`)
- Loading/error states

**Rules**:
- ✅ Can import from Governed and Kernel
- ❌ Cannot import from Isolation (use registry)
- ✅ Server components by default
- ✅ Explicit `"use client"` for client features

**Example**:
```typescript
// src/app/page.tsx
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/formatting';

export default function HomePage() {
  const price = 99.99;
  
  return (
    <main>
      <h1>Price: {formatCurrency(price)}</h1>
      <Button>Purchase</Button>
    </main>
  );
}
```

### Isolation Zone

**Files**: `src/contractors/`

**Purpose**: Third-party integrations (analytics, payments, email, storage)

**Contents**:
- Contract interfaces (`contracts.ts`)
- Contractor registry (`registry.ts`)
- Individual contractor implementations

**Rules**:
- ✅ Can import from Kernel ONLY
- ❌ Cannot import from Governed, Surface, or other contractors
- ✅ Must implement a contract interface
- ✅ Must be registered in central registry
- ✅ Must return `Result<T>` types

**Example**:
```typescript
// src/contractors/analytics/google.ts
import { AnalyticsContractor } from '@/contractors/contracts';
import { Result } from '@/core/types';

export const googleAnalytics: AnalyticsContractor = {
  config: {
    name: 'google-analytics',
    version: '1.0.0',
    enabled: process.env.NODE_ENV === 'production',
  },
  
  async track(event: string, properties?: Record<string, unknown>): Promise<Result<void>> {
    try {
      if (!this.config.enabled) return { success: true };
      
      // gtag implementation
      window.gtag('event', event, properties);
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  },
  
  async identify(userId: string, traits?: Record<string, unknown>): Promise<Result<void>> {
    try {
      window.gtag('set', { user_id: userId, ...traits });
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  },
};

// Registration
import { registry } from '@/contractors/registry';
registry.register('analytics', googleAnalytics);
```

---

## Design Token System

### Token Structure

Design tokens are JSON files in `design-system/tokens/`:

```
tokens/
├── colors.tokens.json       # Color palette
├── spacing.tokens.json      # Spacing scale
├── typography.tokens.json   # Font families, sizes, weights
├── motion.tokens.json       # Animation durations, easing
└── breakpoints.tokens.json  # Responsive breakpoints
```

### Token Schema

Each token file follows a strict schema validated by Zod:

```json
{
  "$schema": "https://canonstrata.com/schemas/design-tokens.json",
  "colors": {
    "brand": {
      "primary": {
        "50": "#f0f9ff",
        "500": "#0ea5e9",
        "900": "#0c4a6e"
      }
    }
  }
}
```

### Using Tokens

#### In Tailwind
```tsx
<button className="bg-brand-primary-500 p-4">
  Click Me
</button>
```

#### In Styled Components
```typescript
import colors from '@/design-system/tokens/colors.tokens.json';

const Button = styled.button`
  background-color: ${colors.colors.brand.primary[500]};
`;
```

#### In Framer Motion
```typescript
import motion from '@/design-system/tokens/motion.tokens.json';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    duration: motion.motion.duration.normal,
    ease: motion.motion.easing.easeOut,
  }}
/>
```

### Token Enforcement

The `token-check.ts` gatekeeper script scans for violations:

**Detected**:
- Hex colors: `#3b82f6`
- RGB/HSL colors: `rgb(59, 130, 246)`
- Hardcoded pixels: `16px`
- Magic durations: `300ms`

**Exceptions**:
```typescript
// @design-token-exception
const specialCase = "#ff0000";
```

---

## Enforcement Mechanisms

### 1. AST-Level Enforcement

**Script**: `scripts/gatekeeper/ast-enforcer.ts`

**Checks**:
- No `any` types
- No TypeScript error suppressions (`@ts-ignore`, `@ts-nocheck`)
- No React imports without `"use client"`
- No magic numbers in code

**Usage**:
```bash
npm run gatekeeper:ast
```

**Failure**: Exit code 1, CI pipeline fails

### 2. Boundary Enforcement

**Script**: `scripts/gatekeeper/boundary-check.ts`

**Checks**:
- Kernel cannot import from other layers
- Governed can only import from Kernel
- Surface can import from Governed and Kernel
- Isolation can only import from Kernel

**Algorithm**:
```typescript
function getLayerForFile(filePath: string): string {
  if (filePath.includes('src/kernel/') || filePath.includes('src/core/')) return 'kernel';
  if (filePath.includes('src/lib/') || filePath.includes('src/components/')) return 'governed';
  if (filePath.includes('src/app/')) return 'surface';
  if (filePath.includes('src/contractors/')) return 'isolation';
  return 'unknown';
}

// For each import, verify it's allowed by the layer's canImportFrom rules
```

### 3. Design Token Enforcement

**Scripts**:
- `token-check.ts`: Detects hardcoded colors, spacing, typography
- `no-magic-motion.ts`: Detects hardcoded animation values
- `no-design-literals.ts`: Comprehensive literal detection

**Example Violation**:
```typescript
// ❌ VIOLATION
const Button = styled.button`
  color: #3b82f6;
  padding: 16px;
  transition: all 0.3s ease;
`;

// ✅ COMPLIANT
import tokens from '@/design-system/tokens';

const Button = styled.button`
  color: ${tokens.colors.brand.primary[500]};
  padding: ${tokens.spacing[4]};
  transition-duration: ${tokens.motion.duration.normal};
`;
```

### 4. Motion System Enforcement

**Script**: `scripts/gatekeeper/motion-check.ts`

**Checks**:
- Framer Motion imports have `"use client"`
- Animation configs reference motion tokens
- No inline CSS transitions

**Example**:
```typescript
// ❌ VIOLATION
<div style={{ transition: 'all 0.3s ease' }} />

// ✅ COMPLIANT
"use client";
import { motion } from 'framer-motion';
import tokens from '@/design-system/tokens/motion.tokens.json';

<motion.div
  animate={{ x: 100 }}
  transition={{ duration: tokens.motion.duration.normal }}
/>
```

### 5. Client Boundary Enforcement

**Script**: `scripts/gatekeeper/client-boundary-check.ts`

**Checks**:
- Files using hooks have `"use client"`
- Files using event handlers have `"use client"`
- Server components don't import client-only packages

**Example**:
```typescript
// ❌ VIOLATION
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// ✅ COMPLIANT
"use client";
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## Contractor Integration

### Contract Interface

All contractors implement a standard interface:

```typescript
export interface ContractorConfig {
  readonly name: string;
  readonly version: string;
  readonly enabled: boolean;
}

export interface BaseContractor {
  readonly config: ContractorConfig;
}
```

### Implementing a Contractor

**Step 1**: Define contract in `contracts.ts`
```typescript
export interface PaymentContractor extends BaseContractor {
  createPaymentIntent(amount: number, currency: string): Promise<Result<{ clientSecret: string }>>;
  confirmPayment(paymentIntentId: string): Promise<Result<{ status: string }>>;
  refund(paymentIntentId: string, amount?: number): Promise<Result<void>>;
}
```

**Step 2**: Implement the contractor
```typescript
// src/contractors/payment/stripe.ts
import { PaymentContractor } from '@/contractors/contracts';
import { Result } from '@/core/types';

export const stripeContractor: PaymentContractor = {
  config: {
    name: 'stripe',
    version: '1.0.0',
    enabled: !!process.env.STRIPE_SECRET_KEY,
  },
  
  async createPaymentIntent(amount, currency): Promise<Result<{ clientSecret: string }>> {
    try {
      // Stripe API call
      const intent = await stripe.paymentIntents.create({ amount, currency });
      return { success: true, data: { clientSecret: intent.client_secret } };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  },
  
  // ... other methods
};
```

**Step 3**: Register the contractor
```typescript
// src/contractors/registry.ts
import { stripeContractor } from './payment/stripe';

registry.register('payment', stripeContractor);
```

**Step 4**: Use the contractor
```typescript
// src/app/checkout/page.tsx
import { registry } from '@/contractors/registry';

export default async function CheckoutPage() {
  const payment = registry.get<PaymentContractor>('payment');
  
  if (!payment?.config.enabled) {
    return <div>Payment system unavailable</div>;
  }
  
  const result = await payment.createPaymentIntent(1000, 'usd');
  
  if (!result.success) {
    return <div>Error: {result.error?.message}</div>;
  }
  
  return <CheckoutForm clientSecret={result.data.clientSecret} />;
}
```

---

## CI/CD Pipeline

### Workflow Structure

**File**: `.github/workflows/deploy.yml`

```yaml
jobs:
  gatekeeper:
    - AST enforcement
    - Boundary checks
    - Token compliance
    - Motion validation
    - Client boundary checks
    - Zod schema validation
    
  type-check:
    needs: gatekeeper
    - TypeScript strict mode
    
  lint:
    needs: gatekeeper
    - ESLint constitutional config
    
  test-invariants:
    needs: [type-check, lint]
    - Playwright invariant tests
    
  build:
    needs: [type-check, lint]
    - Production build
    - Bundle budget check
    
  deploy-preview:
    needs: [build, test-invariants]
    - Vercel preview deployment
```

### Hard-Fail Semantics

Every job has explicit failure conditions:

```bash
if [ $? -ne 0 ]; then
  echo "❌ Gatekeeper check failed"
  exit 1
fi
```

A single violation in any check = entire pipeline fails = PR blocked

---

## Testing Strategy

### Invariant Tests

**Location**: `tests/invariants/`

**Purpose**: Verify architectural contracts hold at runtime

**Examples**:

1. **Page Rendering** (`page-render.spec.ts`)
   - All pages render without errors
   - No hydration mismatches
   - Valid HTML structure
   - Images have alt text

2. **Form Submission** (`form-submit.spec.ts`)
   - Validation works correctly
   - Error states display properly
   - Success states clear forms
   - Network errors handled gracefully

3. **File Existence** (`existence.spec.ts`)
   - All layer directories exist
   - Required config files present
   - Gatekeeper scripts exist
   - Design token files exist

### Running Tests

```bash
# All invariant tests
npm run test:invariants

# Specific test file
npx playwright test tests/invariants/page-render.spec.ts

# With UI
npm run test:e2e:ui
```

---

## Summary

CanonStrata's constitutional architecture ensures:

1. **Architectural integrity** through AST-level enforcement
2. **Design consistency** via immutable design tokens
3. **Layer isolation** preventing dependency violations
4. **Type safety** with zero tolerance for `any`
5. **Motion governance** through Framer Motion + tokens
6. **Contractor isolation** with explicit contracts
7. **Build-time verification** in CI/CD pipeline

Every architectural principle is **enforceable**, not aspirational.
