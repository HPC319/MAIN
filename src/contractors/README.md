# ISOLATION ZONE - CONTRACTORS

This directory contains all third-party integrations and external dependencies, isolated from the core system architecture.

## Architectural Principles

### 1. **Strict Isolation**
Contractors are completely isolated from the governed layer. They can only:
- Import from `src/kernel/*` (types, constants, invariants)
- Import external npm packages
- Interact through defined contract interfaces

### 2. **Contract-First Design**
Every contractor must:
- Implement a strict contract interface defined in `contracts.ts`
- Hide all implementation details
- Return `Result<T>` types for error handling
- Be registered in the central `registry.ts`

### 3. **Zero Side Effects**
Contractors must:
- Never modify global state
- Never import from other layers (lib, components, app)
- Never directly interact with other contractors
- Maintain referential transparency where possible

## Directory Structure

```
contractors/
├── index.ts              # Main exports
├── contracts.ts          # Contract interface definitions
├── registry.ts           # Central contractor registry
├── analytics/            # Analytics contractor implementation
├── email/                # Email contractor implementation
├── payment/              # Payment contractor implementation
└── storage/              # Storage contractor implementation
```

## Adding a New Contractor

1. Define the contract interface in `contracts.ts`
2. Create a new directory for the contractor
3. Implement the contract interface
4. Register in `registry.ts`
5. Export from `index.ts`

## Examples

### Analytics Contractor
```typescript
import { AnalyticsContractor } from '@/contractors/contracts';

const analytics: AnalyticsContractor = {
  config: { name: 'google-analytics', version: '1.0.0', enabled: true },
  async track(event, properties) {
    // Implementation using gtag or similar
    return { success: true };
  },
  // ... other methods
};
```

### Using a Contractor
```typescript
import { getAnalyticsContractor } from '@/contractors/registry';

const analytics = getAnalyticsContractor();
if (analytics) {
  await analytics.track('user_signup', { plan: 'premium' });
}
```

## Testing Contractors

Contractors must have:
- Unit tests for contract compliance
- Integration tests with mocked external services
- Contract verification tests

## Enforcement

The following gatekeeper scripts enforce isolation:
- `scripts/gatekeeper/boundary-check.ts` - Prevents illegal imports
- `scripts/gatekeeper/ast-enforcer.ts` - Validates contract compliance
