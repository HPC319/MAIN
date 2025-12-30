# Storybook Gatekeeper

## Overview

The Storybook Gatekeeper is an enforcement system that ensures all components meet Canonstrata standards before merging. It uses AST analysis and validation rules to maintain design system consistency and quality.

## Purpose

**Gatekeeper serves as the last line of defense**, ensuring:

1. ✅ Every component has a Storybook story
2. ✅ TypeScript types are properly defined
3. ✅ Accessibility standards are met
4. ✅ Design tokens are used consistently
5. ✅ Components follow Canonstrata patterns

## Architecture

```
┌─────────────────────────────────────────┐
│         Git Pre-commit Hook             │
├─────────────────────────────────────────┤
│      Gatekeeper Validation Rules        │
├─────────────────────────────────────────┤
│         AST Analysis Engine             │
├─────────────────────────────────────────┤
│         Component Scanner               │
├─────────────────────────────────────────┤
│         Violation Reporter              │
└─────────────────────────────────────────┘
```

## Gatekeeper Rules

### 1. MUST_HAVE_STORY

**Purpose**: Ensures every component has a Storybook story for documentation and testing.

**Check**:
```javascript
component.path.replace('.tsx', '.stories.tsx') exists
```

**Example**:
```
✅ Button.tsx → Button.stories.tsx exists
❌ Card.tsx → Card.stories.tsx NOT FOUND
```

**Fix**:
Create a `.stories.tsx` file for your component:

```typescript
// src/components/ui/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'Card content',
  },
};
```

---

### 2. MUST_HAVE_TYPESCRIPT

**Purpose**: Enforces TypeScript usage for type safety.

**Check**:
```javascript
component.path.endsWith('.tsx') || component.path.endsWith('.ts')
```

**Fix**:
- Rename `.jsx` → `.tsx`
- Rename `.js` → `.ts`
- Add proper type annotations

---

### 3. MUST_HAVE_PROPS_INTERFACE

**Purpose**: Ensures components have proper type definitions.

**Check**:
```javascript
content.includes('interface') && content.includes('Props')
```

**Example**:

```typescript
// ✅ Good
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = ({ variant = 'default', size = 'md', ...props }: ButtonProps) => {
  // Component implementation
};

// ❌ Bad - No Props interface
export const Button = ({ variant, size, ...props }) => {
  // Component implementation
};
```

---

### 4. MUST_USE_FORWARD_REF

**Purpose**: Ensures ref forwarding for components that accept refs.

**Check**:
```javascript
if (content.includes('ref')) {
  return content.includes('forwardRef');
}
```

**Example**:

```typescript
// ✅ Good
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn('input-base', className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

// ❌ Bad - Uses ref without forwardRef
export const Input = ({ ref, ...props }: InputProps) => {
  return <input ref={ref} {...props} />;
};
```

---

### 5. MUST_HAVE_ARIA_ATTRIBUTES

**Purpose**: Enforces accessibility standards.

**Check**:
```javascript
content.includes('aria-') || content.includes('role=')
```

**Example**:

```typescript
// ✅ Good
export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      role="button"
      aria-label={props['aria-label'] || children}
      {...props}
    >
      {children}
    </button>
  );
};

// ✅ Also good - for simple presentational components
export const Label = ({ children, ...props }: LabelProps) => {
  return <label {...props}>{children}</label>;
};

// ❌ Bad - Interactive component without ARIA
export const Dialog = ({ children }: DialogProps) => {
  return <div>{children}</div>;
};
```

---

### 6. MUST_USE_DESIGN_TOKENS

**Purpose**: Ensures components use design system tokens.

**Check**:
```javascript
content.includes('className') ||
content.includes('cva') ||
content.includes('cn(')
```

**Example**:

```typescript
// ✅ Good - Uses CVA
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// ✅ Good - Uses cn utility
export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div className={cn('rounded-lg border bg-card', className)} {...props} />
  );
};

// ❌ Bad - Hardcoded styles
export const Button = ({ ...props }: ButtonProps) => {
  return <button style={{ background: '#000', color: '#fff' }} {...props} />;
};
```

---

### 7. MUST_HAVE_DISPLAY_NAME

**Purpose**: Improves debugging experience.

**Check**:
```javascript
content.includes('displayName')
```

**Example**:

```typescript
// ✅ Good
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';

// ❌ Bad - Missing displayName
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />;
  }
);
```

---

### 8. MUST_EXPORT_TYPES

**Purpose**: Ensures types are available for consumers.

**Check**:
```javascript
content.includes('export type') || content.includes('export interface')
```

**Example**:

```typescript
// ✅ Good
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ ...props }: ButtonProps) => {
  // Implementation
};

// ❌ Bad - Type not exported
interface ButtonProps {
  variant?: 'default' | 'primary' | 'secondary';
}

export const Button = ({ ...props }: ButtonProps) => {
  // Implementation
};
```

---

## Running Gatekeeper

### Manual Check

```bash
npm run gatekeeper:check
```

### AST Validation

```bash
npm run gatekeeper:ast
```

### Storybook Validation

```bash
npm run gatekeeper:storybook
```

### All Validations

```bash
npm run ci:validate
```

---

## CI Integration

### GitHub Actions Workflow

```yaml
name: Gatekeeper

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Gatekeeper
        run: npm run gatekeeper:check
      
      - name: Validate Storybook
        run: npm run gatekeeper:storybook
```

### Pre-commit Hook

```bash
# .husky/pre-commit
#!/bin/sh
npm run gatekeeper:check || exit 1
```

---

## Example Output

### Success

```
🔒 CANONSTRATA STORYBOOK GATEKEEPER

📦 Found 15 components

✅ All components pass gatekeeper rules
```

### Failure

```
🔒 CANONSTRATA STORYBOOK GATEKEEPER

📦 Found 15 components

❌ GATEKEEPER VIOLATIONS DETECTED

🔴 Card:
   ❌ Must have Storybook story
      Component Card must have a .stories.tsx file
   ❌ Must have accessibility attributes
      Component Card must have ARIA attributes

🔴 Avatar:
   ❌ Must export component types
      Component Avatar must export its types

📊 Total Violations: 3
```

---

## Configuration

### Custom Rules

Create `.storybook/gatekeeper.config.js`:

```javascript
module.exports = {
  rules: {
    MUST_HAVE_STORY: true,
    MUST_HAVE_TYPESCRIPT: true,
    MUST_HAVE_PROPS_INTERFACE: true,
    MUST_USE_FORWARD_REF: true,
    MUST_HAVE_ARIA_ATTRIBUTES: true,
    MUST_USE_DESIGN_TOKENS: true,
    MUST_HAVE_DISPLAY_NAME: false, // Optional
    MUST_EXPORT_TYPES: true,
  },
  ignore: [
    'src/components/examples/**',
    'src/components/deprecated/**',
  ],
  severity: 'error', // 'error' | 'warning'
};
```

---

## Exemptions

### Component-level Exemption

Add comment to component file:

```typescript
// @gatekeeper-ignore MUST_HAVE_ARIA_ATTRIBUTES
// Reason: This is a simple wrapper component

export const Container = ({ children }: ContainerProps) => {
  return <div>{children}</div>;
};
```

### Rule-level Exemption

```typescript
/* gatekeeper-disable */
export const LegacyComponent = () => {
  // Legacy component, exempt from all rules
};
/* gatekeeper-enable */
```

---

## Workflow

```
┌─────────────────────────────┐
│   Developer writes code     │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│   Git commit triggered      │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│   Gatekeeper runs checks    │
└──────────┬──────────────────┘
           │
      ┌────┴────┐
      │         │
      ▼         ▼
   PASS       FAIL
      │         │
      │         └─────► Fix violations
      │                      │
      │                      │
      │         ┌────────────┘
      │         │
      ▼         ▼
┌─────────────────────────────┐
│   Commit proceeds           │
└─────────────────────────────┘
```

---

## Best Practices

### 1. Run Locally Before Committing

```bash
npm run gatekeeper:check
```

### 2. Fix All Violations

Don't bypass gatekeeper. Fix the issues properly.

### 3. Write Stories First

Create `.stories.tsx` files alongside components.

### 4. Use TypeScript Strictly

Always define interfaces/types.

### 5. Think Accessibility First

Add ARIA attributes from the start.

---

## Troubleshooting

### False Positives

If gatekeeper reports false positives:

1. Check if the rule applies to your component
2. Use exemption comments if truly not applicable
3. Report issue if rule is incorrect

### Performance Issues

If gatekeeper is slow:

1. Check number of components being scanned
2. Use `.gatekeeper-ignore` to exclude unnecessary paths
3. Run on changed files only in CI

---

## Metrics

Track gatekeeper metrics:

```bash
# Compliance rate
npm run gatekeeper:check --report

# Generates:
# - Total components
# - Passing components
# - Violation breakdown
# - Compliance percentage
```

---

## Future Enhancements

- [ ] Custom rule plugins
- [ ] Auto-fix capabilities
- [ ] Visual compliance dashboard
- [ ] Integration with IDE
- [ ] Real-time validation

---

## Related Documentation

- [CLI Usage](./CLI_USAGE.md)
- [Testing Strategy](./TESTING.md)
- [Contributing Guide](./CONTRIBUTING.md)

---

## Support

For gatekeeper issues:
- Check `.storybook/enforcement/gatekeeper.js`
- Review rule definitions
- Contact maintainers

---

## License

MIT License
