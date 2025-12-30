# Contributing to Canonstrata

Thank you for your interest in contributing to Canonstrata! This guide will help you get started and ensure your contributions meet our standards.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Component Guidelines](#component-guidelines)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Gatekeeper Requirements](#gatekeeper-requirements)
- [Documentation](#documentation)
- [Commit Guidelines](#commit-guidelines)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior

- Be respectful and considerate
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment or discriminatory language
- Personal attacks or trolling
- Publishing private information
- Spam or off-topic content
- Any conduct that could reasonably be considered inappropriate

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **Git** >= 2.30.0
- **PostgreSQL** >= 14 (for database features)
- **Code Editor** with TypeScript support (VS Code recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR-USERNAME/canonstrata.git
cd canonstrata
```

3. Add upstream remote:

```bash
git remote add upstream https://github.com/canonstrata/canonstrata.git
```

## Development Setup

### Install Dependencies

```bash
npm install
```

### Environment Configuration

1. Copy environment template:

```bash
cp .env.example .env.local
```

2. Configure your `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/canonstrata"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secure-secret"

# Optional: Email configuration
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="your-email@example.com"
SMTP_PASSWORD="your-password"
```

### Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate:dev

# Seed database (optional)
npm run db:seed
```

### Verify Setup

```bash
# Run all checks
npm run ci:validate

# Start development server
npm run dev
```

Visit http://localhost:3000 to verify installation.

## Development Workflow

### Branch Strategy

We use a simplified Git Flow:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates
- `refactor/*` - Code refactoring

### Creating a Branch

```bash
# Update your local repository
git checkout develop
git pull upstream develop

# Create feature branch
git checkout -b feature/your-feature-name

# Create fix branch
git checkout -b fix/issue-description
```

### Making Changes

1. **Write Code** - Follow our coding standards
2. **Add Tests** - Maintain 85%+ coverage
3. **Update Docs** - Document new features
4. **Run Checks** - Ensure all validations pass

```bash
# Run linting
npm run lint

# Run type checking
npm run typecheck

# Run tests
npm run test

# Run all validations
npm run ci:validate
```

### Commit Your Changes

```bash
# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat: add new component"

# Push to your fork
git push origin feature/your-feature-name
```

## Coding Standards

### TypeScript

**All code must be TypeScript** with strict type checking:

```typescript
// ✅ Good - Explicit types
interface UserProps {
  id: string;
  name: string;
  email: string;
}

function greetUser(user: UserProps): string {
  return `Hello, ${user.name}!`;
}

// ❌ Bad - Implicit any
function greetUser(user) {
  return `Hello, ${user.name}!`;
}
```

### ESLint Rules

We enforce ESLint rules via pre-commit hooks:

```bash
# Check linting
npm run lint

# Auto-fix issues
npm run lint:fix
```

### Prettier Formatting

All code must be formatted with Prettier:

```bash
# Check formatting
npm run format:check

# Format code
npm run format
```

### Import Order

Organize imports in this order:

```typescript
// 1. External libraries
import React from 'react';
import { useRouter } from 'next/navigation';

// 2. Internal absolute imports
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

// 3. Internal relative imports
import { localHelper } from './helpers';

// 4. Types
import type { ComponentProps } from './types';

// 5. Styles (if any)
import styles from './Component.module.css';
```

### Naming Conventions

```typescript
// Components - PascalCase
export const ButtonComponent = () => {};

// Functions/Variables - camelCase
const handleClick = () => {};
const userData = {};

// Constants - UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const API_ENDPOINT = '/api/users';

// Types/Interfaces - PascalCase
interface UserData {}
type ButtonVariant = 'default' | 'primary';

// Files
// Components: PascalCase (Button.tsx)
// Utilities: camelCase (formatDate.ts)
// Hooks: camelCase (useAuth.ts)
// Tests: match source (Button.test.tsx)
```

## Component Guidelines

### Component Structure

Every component must follow this template:

```typescript
// 1. Imports
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

// 2. Variants Definition (if applicable)
const componentVariants = cva(
  // Base styles
  'base-classes',
  {
    variants: {
      variant: {
        default: 'default-classes',
        primary: 'primary-classes',
      },
      size: {
        sm: 'small-classes',
        md: 'medium-classes',
        lg: 'large-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// 3. Props Interface
export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Custom props
  customProp?: string;
}

// 4. Component Implementation
export const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, customProp, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

// 5. Display Name
Component.displayName = 'Component';

// 6. Export Types
export type { ComponentProps };
```

### Component Checklist

Before submitting a component, ensure:

- [ ] TypeScript with proper types
- [ ] Props interface exported
- [ ] forwardRef used (if refs needed)
- [ ] displayName set
- [ ] Accessibility attributes (aria-*, role)
- [ ] Design tokens via CVA/Tailwind
- [ ] Storybook story created
- [ ] Unit tests written
- [ ] Documentation added
- [ ] Gatekeeper validation passes

### Storybook Stories

Every component needs a story:

```typescript
// Component.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    children: 'Default component',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary component',
  },
};

// Interactive test
export const WithInteraction: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await expect(button).toHaveClass('active');
  },
};
```

## Testing Requirements

### Coverage Requirements

Minimum coverage targets:

- **Overall**: 85%
- **UI Components**: 80%
- **Utilities**: 100%
- **Hooks**: 95%
- **API Routes**: 85%

### Unit Tests

Write unit tests for all components and utilities:

```typescript
// Component.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component>Test</Component>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    render(<Component variant="primary">Test</Component>);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('primary-classes');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Component ref={ref}>Test</Component>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
```

### Integration Tests

Test component interactions:

```typescript
// integration/form.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from '@/components/forms/Form';

describe('Form Integration', () => {
  it('validates and submits', async () => {
    render(<Form />);
    
    const input = screen.getByLabelText(/email/i);
    const submit = screen.getByRole('button', { name: /submit/i });
    
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(submit);
    
    await screen.findByText(/success/i);
  });
});
```

### Accessibility Tests

Test accessibility compliance:

```typescript
// a11y/component.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Component } from './Component';

expect.extend(toHaveNoViolations);

describe('Component Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Component>Test</Component>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Running Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e

# All tests
npm run ci:test
```

## Pull Request Process

### Before Creating PR

1. **Update your branch**:

```bash
git checkout develop
git pull upstream develop
git checkout your-branch
git rebase develop
```

2. **Run all validations**:

```bash
npm run ci:validate
```

3. **Update documentation** if needed

4. **Add/update tests** for new features

### Creating the PR

1. Push to your fork:

```bash
git push origin your-branch
```

2. Go to GitHub and create Pull Request

3. Fill out the PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Accessibility tests pass

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] Gatekeeper validation passes
- [ ] No console errors/warnings
```

4. Request review from maintainers

### PR Review Process

Your PR will be reviewed for:

1. **Code Quality** - Follows standards
2. **Tests** - Adequate coverage
3. **Documentation** - Clear and complete
4. **Performance** - No degradation
5. **Accessibility** - WCAG 2.1 AA compliant
6. **Security** - No vulnerabilities

### Addressing Feedback

```bash
# Make requested changes
git add .
git commit -m "fix: address review feedback"
git push origin your-branch
```

### Merge Requirements

Before merge, PR must:

- [ ] Pass all CI checks
- [ ] Have 2+ approvals
- [ ] Pass gatekeeper validation
- [ ] Have no merge conflicts
- [ ] Pass all tests
- [ ] Meet coverage requirements

## Gatekeeper Requirements

All components must pass these rules:

### 1. MUST_HAVE_STORY
Create a `.stories.tsx` file for every component.

### 2. MUST_HAVE_TYPESCRIPT
Use TypeScript with proper type definitions.

### 3. MUST_HAVE_PROPS_INTERFACE
Export a Props interface.

### 4. MUST_USE_FORWARD_REF
Use `React.forwardRef` for components with refs.

### 5. MUST_HAVE_ARIA_ATTRIBUTES
Include accessibility attributes.

### 6. MUST_USE_DESIGN_TOKENS
Use CVA or Tailwind classes, no inline styles.

### 7. MUST_HAVE_DISPLAY_NAME
Set `displayName` for debugging.

### 8. MUST_EXPORT_TYPES
Export all component types.

Run gatekeeper check:

```bash
npm run gatekeeper:check
```

See [STORYBOOK_GATEKEEPER.md](./STORYBOOK_GATEKEEPER.md) for details.

## Documentation

### Code Documentation

Use JSDoc for functions and complex logic:

```typescript
/**
 * Formats a date string to a readable format.
 * 
 * @param date - The date to format
 * @param format - The desired format (default: 'MM/DD/YYYY')
 * @returns Formatted date string
 * 
 * @example
 * ```ts
 * formatDate('2025-12-30', 'YYYY-MM-DD')
 * // Returns: '2025-12-30'
 * ```
 */
export function formatDate(date: string, format = 'MM/DD/YYYY'): string {
  // Implementation
}
```

### README Updates

Update README.md when adding:
- New features
- New scripts
- Breaking changes
- Dependencies

### Changelog

Add entry to CHANGELOG.md:

```markdown
## [Unreleased]

### Added
- New feature X with Y capability

### Changed
- Updated component Z behavior

### Fixed
- Fixed bug in component A
```

## Commit Guidelines

### Conventional Commits

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting, missing semicolons
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Adding tests
- `chore:` - Maintenance tasks
- `ci:` - CI configuration changes

### Examples

```bash
# Feature
git commit -m "feat(button): add loading state"

# Bug fix
git commit -m "fix(input): correct validation error display"

# Documentation
git commit -m "docs: update contributing guidelines"

# Breaking change
git commit -m "feat(api)!: change authentication method

BREAKING CHANGE: Auth now requires JWT tokens"
```

### Commit Message Guidelines

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Limit first line to 72 characters
- Reference issues: "fixes #123"
- Be descriptive but concise

## Development Best Practices

### 1. Keep Changes Focused

- One feature/fix per PR
- Break large changes into smaller PRs
- Don't mix refactoring with features

### 2. Write Self-Documenting Code

```typescript
// ✅ Good - Clear and self-explanatory
function calculateUserAge(birthDate: Date): number {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
}

// ❌ Bad - Unclear purpose
function calc(d: Date): number {
  const t = new Date();
  return t.getFullYear() - d.getFullYear();
}
```

### 3. Avoid Premature Optimization

- Write clear code first
- Optimize when needed
- Use profiling tools
- Document optimizations

### 4. Handle Errors Gracefully

```typescript
// ✅ Good - Proper error handling
try {
  const data = await fetchData();
  return data;
} catch (error) {
  console.error('Failed to fetch data:', error);
  throw new Error('Data fetch failed');
}

// ❌ Bad - Silent failure
try {
  return await fetchData();
} catch (error) {
  return null;
}
```

### 5. Use Meaningful Variable Names

```typescript
// ✅ Good
const isUserAuthenticated = checkAuth();
const maxRetryAttempts = 3;

// ❌ Bad
const x = checkAuth();
const n = 3;
```

## Getting Help

### Resources

- [Documentation](https://docs.canonstrata.dev)
- [GitHub Discussions](https://github.com/canonstrata/discussions)
- [Discord Community](https://discord.gg/canonstrata)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/canonstrata)

### Questions?

- Check existing [GitHub Issues](https://github.com/canonstrata/issues)
- Search [Discussions](https://github.com/canonstrata/discussions)
- Join our [Discord](https://discord.gg/canonstrata)
- Email: support@canonstrata.dev

## Recognition

Contributors will be:

- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Featured on our website (optional)
- Invited to contributor events

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Canonstrata! 🎉**
