# Canonstrata CLI Usage Guide

## Overview

The Canonstrata CLI (`canonstrata`) is a system introspection tool for analyzing, validating, and enforcing design system standards. It provides commands for auditing components, checking coverage, analyzing tokens, and monitoring system health.

## Installation

The CLI is included with the Canonstrata system. Make it executable:

```bash
chmod +x cli/canonstrata.js
```

Add to your PATH or create an alias:

```bash
# Add to ~/.bashrc or ~/.zshrc
alias canonstrata="node /path/to/MAIN/cli/canonstrata.js"
```

Or use via npm scripts (recommended):

```bash
npm run introspect -- <command>
```

## Global Usage

```bash
canonstrata <command> [options]
```

## Available Commands

### `audit` - System Audit

Runs a comprehensive system audit checking all aspects of the design system.

**Usage**:
```bash
canonstrata audit
npm run introspect -- audit
```

**What it checks**:
- ✅ Design tokens presence and completeness
- ✅ Component structure and standards
- ✅ Storybook coverage percentage
- ✅ Motion identity system
- ✅ Accessibility utilities
- ✅ Adaptive rendering system

**Output**:
```
🔍 CANONSTRATA SYSTEM AUDIT

✅ TOKENS: All token systems present
✅ COMPONENTS: Storybook coverage: 85% (17/20 components)
✅ MOTION: Motion identity system present
✅ ACCESSIBILITY: A11y utilities present
✅ PERFORMANCE: Adaptive rendering system present

📊 Overall Score: 95/100
```

**Exit codes**:
- `0` - Score >= 90 (Pass)
- `1` - Score < 90 (Fail)

**Options**:
- `--output <file>` - Save audit report to file
- `--json` - Output in JSON format

---

### `validate` - Component Validation

Validates all components against Canonstrata standards.

**Usage**:
```bash
canonstrata validate
npm run validate:components
```

**Validation checks**:
- ✅ TypeScript types defined
- ✅ forwardRef usage for components with refs
- ✅ Accessibility attributes (aria-*, role)
- ✅ CVA variants implementation
- ✅ Props interface definition
- ✅ Display name set

**Example output**:
```
🔍 Validating Components...

✅ Button.tsx
✅ Input.tsx
❌ Card.tsx
   - Has accessibility attributes
   - Uses CVA variants

✅ All components valid
```

**Exit codes**:
- `0` - All components pass
- `1` - One or more components fail

---

### `tokens` - Token Analysis

Analyzes design tokens and reports token counts.

**Usage**:
```bash
canonstrata tokens
npm run introspect:tokens
```

**What it analyzes**:
- Color tokens
- Spacing tokens
- Typography tokens
- Motion tokens
- Breakpoint tokens
- Shadow tokens

**Example output**:
```
🎨 Analyzing Design Tokens...

📄 colors.ts: 24 tokens
📄 spacing.ts: 12 tokens
📄 typography.ts: 18 tokens
📄 motion.ts: 8 tokens
📄 breakpoints.ts: 5 tokens

📊 Total Tokens: 67
```

---

### `coverage` - Storybook Coverage

Checks Storybook coverage for all components.

**Usage**:
```bash
canonstrata coverage
npm run introspect:coverage
```

**Requirements**:
- Minimum 70% coverage to pass

**Example output**:
```
📊 Checking Storybook Coverage...

Components with stories:
✅ Button
✅ Input
✅ Card
❌ Avatar
❌ Badge
✅ Dialog

📊 Coverage: 67% (4/6)
```

**Exit codes**:
- `0` - Coverage >= 70%
- `1` - Coverage < 70%

---

### `motion` - Motion System Analysis

Analyzes the motion identity system and signature animations.

**Usage**:
```bash
canonstrata motion
npm run introspect:motion
```

**Checks for**:
- `canostrataReveal` - Signature reveal animation
- `canostrataDrawer` - Drawer/slide animations
- `canostrataRipple` - Ripple effects
- `canostrataStagger` - Staggered animations
- `canostrataLift` - Lift/elevation animations
- `canostrataGlow` - Glow effects

**Example output**:
```
🎬 Analyzing Motion System...

✅ canostrataReveal
✅ canostrataDrawer
✅ canostrataRipple
✅ canostrataStagger
✅ canostrataLift
❌ canostrataGlow

✅ Motion system analysis complete
```

---

### `a11y` - Accessibility Audit

Audits components for accessibility standards.

**Usage**:
```bash
canonstrata a11y
npm run introspect:a11y
```

**Checks for**:
- ARIA labels
- ARIA described-by attributes
- Role attributes
- Keyboard navigation support

**Example output**:
```
♿ Auditing Accessibility...

✅ Button.tsx
✅ Input.tsx
⚠️  Card.tsx: No ARIA attributes found
✅ Dialog.tsx

✅ All components have accessibility attributes
```

---

### `bundle` - Bundle Size Analysis

Analyzes production bundle size and provides optimization recommendations.

**Usage**:
```bash
canonstrata bundle
npm run introspect:bundle
```

**What it does**:
1. Builds production bundle
2. Analyzes chunk sizes
3. Identifies large dependencies
4. Provides optimization suggestions

**Example output**:
```
📦 Analyzing Bundle Size...

Building production bundle...

✅ Build complete

💡 Run "npm run build:analyze" to see detailed bundle analysis
```

---

### `help` - Show Help

Displays CLI help information.

**Usage**:
```bash
canonstrata help
canonstrata --help
canonstrata -h
```

---

## Advanced Commands (via npm scripts)

### Component Introspection

```bash
npm run introspect:components
```

Lists all components with their stats and coverage.

### Token Introspection

```bash
npm run introspect:tokens
```

Deep dive into token usage across the system.

### Form State Introspection

```bash
npm run introspect:forms
```

Analyzes form intelligence layer and validation patterns.

### Health Check

```bash
npm run introspect:health
```

Quick health check of the entire system.

---

## CI/CD Integration

### Pre-commit Hook

```bash
npm run pre-commit
```

Runs before each commit:
- Component validation
- Token analysis
- Coverage check

### Pre-push Hook

```bash
npm run pre-push
```

Runs before pushing:
- Full system audit
- All validation checks
- Bundle size check

### CI Validation

```bash
npm run ci:validate
```

Comprehensive CI validation:
- Linting
- Type checking
- Tests
- Component validation
- Coverage check
- Bundle analysis

---

## Configuration

### Custom Rules

Create `.canostratarc.json` in project root:

```json
{
  "coverage": {
    "minimum": 80
  },
  "audit": {
    "minimumScore": 95
  },
  "validation": {
    "strictMode": true
  }
}
```

### Ignore Patterns

Create `.canostrataignore`:

```
# Ignore test files
**/*.test.tsx
**/*.spec.tsx

# Ignore examples
examples/**

# Ignore deprecated
deprecated/**
```

---

## Output Formats

### JSON Output

```bash
canonstrata audit --json > audit-report.json
```

Example JSON output:

```json
{
  "timestamp": "2025-12-30T08:59:20Z",
  "score": 95,
  "results": {
    "tokens": {
      "pass": true,
      "message": "All token systems present"
    },
    "components": {
      "pass": true,
      "coverage": 85,
      "message": "Storybook coverage: 85%"
    }
  }
}
```

### Markdown Output

```bash
canonstrata audit --markdown > AUDIT_REPORT.md
```

---

## Troubleshooting

### Command Not Found

```bash
# Ensure Node.js is installed
node --version

# Run directly
node cli/canonstrata.js audit

# Or via npm
npm run introspect -- audit
```

### Permission Denied

```bash
chmod +x cli/canonstrata.js
```

### Module Not Found

```bash
# Install dependencies
npm install

# Ensure in correct directory
pwd  # Should be in /Users/henryherrera/MAIN
```

---

## Examples

### Quick System Check

```bash
# Run audit
canonstrata audit

# Check coverage
canonstrata coverage

# Validate components
canonstrata validate
```

### Pre-deployment Checklist

```bash
# Full validation
npm run ci:full

# This runs:
# 1. ci:validate
# 2. ci:build
# 3. monitor:bundle
```

### Daily Development

```bash
# Check what you're working on
canonstrata validate

# Ensure coverage
canonstrata coverage

# Quick health check
npm run introspect:health
```

---

## Integration with Other Tools

### With Husky (Git Hooks)

```bash
# .husky/pre-commit
#!/bin/sh
npm run introspect:components
npm run introspect:coverage
```

### With GitHub Actions

```yaml
- name: Canonstrata Audit
  run: npm run introspect -- audit --json > audit.json

- name: Upload Audit Report
  uses: actions/upload-artifact@v2
  with:
    name: audit-report
    path: audit.json
```

### With VS Code Tasks

Add to `.vscode/tasks.json`:

```json
{
  "label": "Canonstrata Audit",
  "type": "shell",
  "command": "npm run introspect -- audit",
  "group": "test"
}
```

---

## API Usage (Programmatic)

```javascript
const { audit, validate } = require('./cli/canonstrata');

// Run audit programmatically
const results = audit({ silent: true });

if (results.score < 90) {
  console.error('Audit failed');
  process.exit(1);
}
```

---

## Best Practices

1. **Run `audit` regularly** - At least once per sprint
2. **Use `validate` in CI** - Catch issues early
3. **Monitor `coverage`** - Maintain minimum 70%
4. **Check `bundle` before releases** - Prevent bloat
5. **Use `help` when unsure** - Documentation is your friend

---

## CLI Output Colors

- 🔍 Blue - Information
- ✅ Green - Success
- ❌ Red - Error
- ⚠️  Yellow - Warning
- 📊 Purple - Statistics
- 💡 Cyan - Tips

---

## Version

Current CLI version: `2.2.2`

Check version:
```bash
canonstrata --version
```

---

## Support

For CLI issues or feature requests:
- GitHub Issues: [repository-url]/issues
- Documentation: [docs-url]
- Community: [community-url]

---

## Changelog

### v2.2.2
- Added form intelligence introspection
- Improved coverage reporting
- Enhanced motion system analysis

### v2.2.0
- Initial CLI release
- Basic audit and validation commands

---

## License

MIT License - See LICENSE file for details
