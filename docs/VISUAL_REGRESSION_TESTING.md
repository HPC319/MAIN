# Visual Regression Testing Setup for Canonstrata

## Overview
Visual regression testing ensures UI consistency and catches unintended visual changes in the design system.

## Options

### Option 1: Chromatic (Recommended)
Chromatic provides automated visual regression testing integrated with Storybook.

**Setup:**
```bash
npm install --save-dev chromatic
```

**Configuration:**
```json
// package.json
{
  "scripts": {
    "chromatic": "chromatic --project-token=<your-token>"
  }
}
```

**CI Integration:**
```yaml
# .github/workflows/visual-regression.yml
name: Visual Regression Testing

on: [push, pull_request]

jobs:
  visual-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run chromatic
        env:
          CHROMATIC_PROJECT_TOKEN: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

### Option 2: Percy
Percy by BrowserStack offers visual testing with parallel testing.

**Setup:**
```bash
npm install --save-dev @percy/cli @percy/storybook
```

**Configuration:**
```json
// package.json
{
  "scripts": {
    "percy": "percy storybook http://localhost:6006"
  }
}
```

### Option 3: Playwright Visual Comparisons
Use Playwright's built-in screenshot comparison.

**Setup:**
Already configured in `playwright.config.ts`

**Usage:**
```typescript
// tests/visual/button.visual.spec.ts
import { test, expect } from '@playwright/test';

test('Button visual regression', async ({ page }) => {
  await page.goto('http://localhost:6006/?path=/story/ui-button--primary');
  await expect(page).toHaveScreenshot('button-primary.png');
});
```

**Configuration:**
```typescript
// playwright.config.ts
export default defineConfig({
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,
      threshold: 0.2,
    },
  },
  use: {
    screenshot: 'only-on-failure',
  },
});
```

## Recommended Approach for Canonstrata

### Phase 1: Playwright Visual Testing (Immediate)
- Use Playwright's built-in screenshot comparison
- No additional cost
- Integrated with existing E2E tests

### Phase 2: Chromatic (Production)
- Sign up at https://www.chromatic.com/
- Integrate with Storybook
- Automate in CI/CD pipeline
- Team collaboration features

## Implementation Steps

### 1. Create Visual Test Directory
```bash
mkdir -p tests/visual
```

### 2. Create Visual Tests
```typescript
// tests/visual/design-system.visual.spec.ts
import { test, expect } from '@playwright/test';

const components = [
  'button',
  'input',
  'card',
  'modal',
  'toast',
];

const variants = {
  button: ['primary', 'secondary', 'outline', 'ghost'],
  input: ['default', 'error', 'success'],
};

for (const component of components) {
  test.describe(\`\${component} visual regression\`, () => {
    const componentVariants = variants[component] || ['default'];
    
    for (const variant of componentVariants) {
      test(\`\${component} - \${variant}\`, async ({ page }) => {
        await page.goto(
          \`http://localhost:6006/?path=/story/ui-\${component}--\${variant}\`
        );
        
        // Wait for animations to complete
        await page.waitForTimeout(500);
        
        // Take screenshot
        await expect(page).toHaveScreenshot(
          \`\${component}-\${variant}.png\`,
          {
            fullPage: true,
            animations: 'disabled',
          }
        );
      });
    }
  });
}
```

### 3. Update Playwright Config
```typescript
// Add to playwright.config.ts
export default defineConfig({
  // ... existing config
  
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 50,
      threshold: 0.2,
    },
  },
});
```

### 4. Add npm Scripts
```json
{
  "scripts": {
    "test:visual": "playwright test tests/visual",
    "test:visual:update": "playwright test tests/visual --update-snapshots"
  }
}
```

### 5. CI Integration
Already integrated in `.github/workflows/ci.yml` under the `e2e` job.

## Motion Identity Testing

Special consideration for Canonstrata's signature animations:

```typescript
test('Motion identity - canostrataReveal', async ({ page }) => {
  await page.goto('http://localhost:6006/?path=/story/motion-reveal--default');
  
  // Capture animation frames
  const frames = [];
  for (let i = 0; i < 5; i++) {
    await page.waitForTimeout(100);
    frames.push(await page.screenshot());
  }
  
  // Verify animation signature
  // Each frame should be progressively different
});
```

## Adaptive Rendering Testing

Test different rendering modes:

```typescript
test.describe('Adaptive rendering modes', () => {
  test('high-performance mode', async ({ page }) => {
    await page.goto('/?rendering=high-performance');
    await expect(page).toHaveScreenshot('high-performance.png');
  });
  
  test('low-power mode', async ({ page }) => {
    await page.goto('/?rendering=low-power');
    await expect(page).toHaveScreenshot('low-power.png');
  });
});
```

## Best Practices

1. **Disable Animations**: Use `animations: 'disabled'` for consistent snapshots
2. **Wait for Hydration**: Ensure React hydration is complete
3. **Consistent Environment**: Use fixed viewport sizes
4. **Threshold Tuning**: Adjust `maxDiffPixels` based on acceptable variance
5. **Update Snapshots**: Run `--update-snapshots` after intentional changes
6. **Review Diffs**: Always review visual diffs before accepting

## Maintenance

- Run visual tests on every PR
- Update snapshots when design changes are intentional
- Archive old snapshots when components are removed
- Review and adjust thresholds quarterly

## Cost Considerations

| Solution | Cost | Features |
|----------|------|----------|
| Playwright | Free | Built-in, unlimited |
| Chromatic | $149/mo | Collaboration, history |
| Percy | $349/mo | Cross-browser, parallel |

**Recommendation**: Start with Playwright, upgrade to Chromatic as team scales.
