# Testing Strategy

## Overview

The Canonstrata testing strategy provides comprehensive coverage across multiple testing layers to ensure quality, accessibility, performance, and visual consistency.

## Testing Pyramid

```
┌─────────────────────────────────┐
│     E2E Tests (Playwright)      │  ← User workflows, critical paths
├─────────────────────────────────┤
│   Integration Tests (Vitest)    │  ← Component interactions, API calls
├─────────────────────────────────┤
│     Unit Tests (Vitest)          │  ← Pure functions, utilities, hooks
├─────────────────────────────────┤
│  Visual Regression (Playwright)  │  ← Screenshot comparison
├─────────────────────────────────┤
│   Accessibility (Axe + PA11Y)    │  ← WCAG 2.1 AA compliance
├─────────────────────────────────┤
│  Storybook Testing (Test Runner) │  ← Component isolation tests
└─────────────────────────────────┘
```

## Test Categories

### 1. Unit Tests

**Purpose**: Test individual functions, utilities, and hooks in isolation.

**Tools**: Vitest + Testing Library

**Location**: `src/components/__tests__/`, `src/lib/__tests__/`

**Command**:
```bash
npm run test              # Run all unit tests
npm run test:watch        # Watch mode
npm run test:ui           # Visual UI interface
npm run test:coverage     # Generate coverage report
npm run test:unit         # Unit tests only
```

**Coverage Requirements**:
- Utilities: 100%
- Hooks: 95%
- Pure functions: 100%
- Components: 80%

**Example Unit Test**:
```typescript
// src/lib/utils/__tests__/cn.test.ts
import { describe, it, expect } from 'vitest';
import { cn } from '../cn';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });

  it('deduplicates Tailwind classes', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });
});
```

### 2. Integration Tests

**Purpose**: Test component interactions and state management.

**Tools**: Vitest + Testing Library + jsdom

**Location**: `tests/integration/`

**Command**:
```bash
npm run test:integration
```

**Example Integration Test**:
```typescript
// tests/integration/form-flow.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '@/components/forms/ContactForm';

describe('Contact Form Integration', () => {
  it('validates and submits form data', async () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    });
  });
});
```

### 3. End-to-End Tests

**Purpose**: Test complete user workflows and critical paths.

**Tools**: Playwright

**Location**: `tests/e2e/`

**Command**:
```bash
npm run test:e2e          # Headless mode
npm run test:e2e:ui       # Interactive UI mode
npm run test:e2e:headed   # See browser
npm run test:e2e:debug    # Debug mode
```

**Configuration**: `playwright.config.ts`

**Example E2E Test**:
```typescript
// tests/e2e/auth-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('user can sign up and log in', async ({ page }) => {
    await page.goto('/auth/signup');
    
    // Fill signup form
    await page.fill('[name="email"]', 'user@example.com');
    await page.fill('[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');
    
    // Verify redirect
    await expect(page).toHaveURL('/dashboard');
    
    // Verify user is logged in
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });
});
```

### 4. Visual Regression Tests

**Purpose**: Catch unintended visual changes in components.

**Tools**: Playwright Visual Testing

**Location**: `tests/visual/`

**Command**:
```bash
npm run test:visual               # Run visual tests
npm run test:visual:update        # Update baseline snapshots
```

**Configuration**: `playwright.visual.config.ts`

**Example Visual Test**:
```typescript
// tests/visual/components.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Component Visual Regression', () => {
  test('Button component variants', async ({ page }) => {
    await page.goto('/storybook/button');
    
    // Test default variant
    await expect(page.locator('[data-variant="default"]')).toHaveScreenshot('button-default.png');
    
    // Test primary variant
    await expect(page.locator('[data-variant="primary"]')).toHaveScreenshot('button-primary.png');
    
    // Test disabled state
    await expect(page.locator('[data-variant="disabled"]')).toHaveScreenshot('button-disabled.png');
  });
});
```

### 5. Accessibility Tests

**Purpose**: Ensure WCAG 2.1 Level AA compliance.

**Tools**: Axe-core, PA11Y, Lighthouse

**Location**: `tests/a11y/`

**Command**:
```bash
npm run test:a11y                 # Run all a11y tests
npm run test:a11y:axe             # Axe-core tests
npm run test:a11y:lighthouse      # Lighthouse audit
npm run test:a11y:storybook       # Storybook a11y tests
```

**Example Accessibility Test**:
```typescript
// tests/a11y/components.test.ts
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '@/components/ui/Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('supports keyboard navigation', async () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole('button');
    
    button.focus();
    expect(button).toHaveFocus();
  });
});
```

### 6. Storybook Tests

**Purpose**: Test component stories in isolation.

**Tools**: Storybook Test Runner

**Location**: `src/components/**/*.stories.tsx`

**Command**:
```bash
npm run storybook:test            # Run story tests
npm run storybook:visual          # Visual regression for stories
```

**Example Storybook Test**:
```typescript
// src/components/ui/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test interaction
    await userEvent.click(button);
    await expect(button).toHaveClass('active');
  },
};
```

## Coverage Goals

### Overall Coverage Targets

| Category | Target | Current |
|----------|--------|---------|
| Statements | 85% | - |
| Branches | 80% | - |
| Functions | 85% | - |
| Lines | 85% | - |

### Component-Specific Targets

| Type | Coverage Target |
|------|-----------------|
| UI Components | 80% |
| Form Components | 90% |
| Utilities | 100% |
| Hooks | 95% |
| API Routes | 85% |

## CI/CD Integration

### Pre-commit Hooks

```bash
# .husky/pre-commit
npm run lint
npm run typecheck
npm run test:unit
```

### CI Pipeline

```yaml
# .github/workflows/ci.yml
- name: Unit Tests
  run: npm run test:coverage

- name: Integration Tests
  run: npm run test:integration

- name: E2E Tests
  run: npm run test:e2e

- name: Visual Regression
  run: npm run test:visual

- name: Accessibility Audit
  run: npm run test:a11y
```

## Test Data Management

### Mock Data

Location: `tests/mocks/`

```typescript
// tests/mocks/user.ts
export const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'user',
};

export const mockAdmin = {
  id: '2',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin',
};
```

### Fixtures

Location: `tests/fixtures/`

```typescript
// tests/fixtures/posts.json
[
  {
    "id": 1,
    "title": "Test Post",
    "content": "Test content",
    "author": "Test Author"
  }
]
```

## Performance Testing

### Web Vitals Monitoring

```bash
npm run monitor:vitals
```

Tracks:
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1
- First Contentful Paint (FCP) < 1.8s
- Time to First Byte (TTFB) < 600ms

### Lighthouse CI

```bash
npm run lighthouse
npm run lighthouse:ci
```

Configuration: `lighthouserc.json`

Targets:
- Performance: 90+
- Accessibility: 100
- Best Practices: 90+
- SEO: 90+

## Best Practices

### 1. Test Isolation

Each test should be independent and not rely on other tests:

```typescript
// ❌ Bad
let user;
test('creates user', () => {
  user = createUser();
});
test('updates user', () => {
  updateUser(user); // Depends on previous test
});

// ✅ Good
test('updates user', () => {
  const user = createUser();
  updateUser(user);
});
```

### 2. Test Readability

Use clear test names and arrange-act-assert pattern:

```typescript
test('displays error message when email is invalid', () => {
  // Arrange
  render(<ContactForm />);
  const emailInput = screen.getByLabelText(/email/i);
  
  // Act
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.blur(emailInput);
  
  // Assert
  expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
});
```

### 3. Avoid Testing Implementation Details

Test behavior, not implementation:

```typescript
// ❌ Bad - testing implementation
expect(component.state.count).toBe(5);

// ✅ Good - testing behavior
expect(screen.getByText('Count: 5')).toBeInTheDocument();
```

### 4. Use Testing Library Queries Properly

Priority order:
1. `getByRole` - Best for accessibility
2. `getByLabelText` - Forms
3. `getByPlaceholderText` - Forms
4. `getByText` - Display text
5. `getByTestId` - Last resort

### 5. Mock External Dependencies

```typescript
import { vi } from 'vitest';

vi.mock('@/lib/api', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ id: 1, name: 'Test' })),
}));
```

## Debugging Tests

### Vitest UI

```bash
npm run test:ui
```

### Playwright Debug Mode

```bash
npm run test:e2e:debug
```

### Debug in VS Code

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest Tests",
  "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
  "args": ["run", "${file}"],
  "console": "integratedTerminal"
}
```

## Continuous Improvement

### Coverage Reports

```bash
npm run test:coverage
```

View coverage report: `coverage/index.html`

### Test Metrics

Track:
- Test execution time
- Flaky test rate
- Coverage trends
- Test maintenance overhead

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [Axe-core](https://github.com/dequelabs/axe-core)
- [Storybook Test Runner](https://storybook.js.org/docs/react/writing-tests/test-runner)

## Troubleshooting

### Common Issues

**Issue**: Tests fail in CI but pass locally
- Check Node version consistency
- Verify environment variables
- Check timezone differences

**Issue**: Flaky E2E tests
- Add explicit waits: `await page.waitForSelector()`
- Use `waitFor` from Testing Library
- Increase timeout for slow operations

**Issue**: Visual regression false positives
- Update baseline snapshots
- Check viewport size consistency
- Consider pixel threshold tolerance

## Contact

For testing questions or issues, contact the Canonstrata team.
