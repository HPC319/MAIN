import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for Canonstrata Design System
 * Tests signature motion identity and adaptive rendering
 */

test.describe('Canonstrata Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    // Set consistent viewport
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test.describe('UI Components', () => {
    const components = [
      { name: 'button', variants: ['primary', 'secondary', 'outline', 'ghost', 'danger'] },
      { name: 'input', variants: ['default', 'filled'] },
      { name: 'card', variants: ['default', 'elevated', 'outlined'] },
      { name: 'badge', variants: ['default', 'primary', 'success', 'warning', 'error'] },
      { name: 'toast', variants: ['success', 'error', 'warning', 'info'] },
    ];

    for (const component of components) {
      test.describe(component.name, () => {
        for (const variant of component.variants) {
          test(`${component.name} - ${variant}`, async ({ page }) => {
            await page.goto(
              `http://localhost:6006/iframe.html?id=ui-${component.name}--${variant}&viewMode=story`
            );
            
            // Wait for Storybook to load
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(500); // Allow animations to settle
            
            // Take screenshot
            await expect(page.locator('#storybook-root')).toHaveScreenshot(
              `${component.name}-${variant}.png`,
              {
                animations: 'disabled',
                maxDiffPixels: 50,
              }
            );
          });
        }
      });
    }
  });

  test.describe('Motion Identity Patterns', () => {
    const motionPatterns = [
      'reveal',
      'drawer',
      'ripple',
      'stagger',
      'lift',
      'glow',
      'pulse',
    ];

    for (const pattern of motionPatterns) {
      test(`Canonstrata ${pattern} animation`, async ({ page }) => {
        await page.goto(
          `http://localhost:6006/iframe.html?id=motion-${pattern}--default&viewMode=story`
        );
        
        await page.waitForLoadState('networkidle');
        
        // Capture initial state
        await expect(page.locator('#storybook-root')).toHaveScreenshot(
          `motion-${pattern}-initial.png`,
          { animations: 'disabled' }
        );
        
        // Trigger animation
        const trigger = page.locator('[data-testid="motion-trigger"]').first();
        if (await trigger.isVisible()) {
          await trigger.click();
          await page.waitForTimeout(300); // Mid-animation
          
          await expect(page.locator('#storybook-root')).toHaveScreenshot(
            `motion-${pattern}-active.png`,
            { animations: 'disabled', maxDiffPixels: 100 }
          );
        }
      });
    }
  });

  test.describe('Adaptive Rendering Modes', () => {
    const renderingModes = [
      'high-performance',
      'balanced',
      'low-power',
      'minimal',
    ];

    for (const mode of renderingModes) {
      test(`Rendering mode: ${mode}`, async ({ page }) => {
        // Navigate to a page with rendering mode set
        await page.goto(`http://localhost:3000/?rendering=${mode}`);
        
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        
        // Capture full page
        await expect(page).toHaveScreenshot(
          `rendering-${mode}.png`,
          {
            fullPage: true,
            animations: 'disabled',
            maxDiffPixels: 100,
          }
        );
      });
    }
  });

  test.describe('Form Intelligence', () => {
    test('Form with progress tracking', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=forms-smartform--default&viewMode=story');
      
      await page.waitForLoadState('networkidle');
      
      // Empty state
      await expect(page.locator('#storybook-root')).toHaveScreenshot(
        'form-empty.png',
        { animations: 'disabled' }
      );
      
      // Fill first field
      await page.fill('input[name="email"]', 'test@example.com');
      await page.waitForTimeout(300);
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(
        'form-partial.png',
        { animations: 'disabled', maxDiffPixels: 100 }
      );
      
      // Fill all fields
      await page.fill('input[name="password"]', 'SecurePass123!');
      await page.waitForTimeout(300);
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(
        'form-complete.png',
        { animations: 'disabled', maxDiffPixels: 100 }
      );
    });

    test('Auto-save indicator', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=forms-autosaveindicator--default&viewMode=story');
      
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(
        'autosave-indicator.png',
        { animations: 'disabled' }
      );
    });
  });

  test.describe('Layout Components', () => {
    const layouts = ['container', 'grid', 'flex', 'stack', 'section'];

    for (const layout of layouts) {
      test(`Layout: ${layout}`, async ({ page }) => {
        await page.goto(
          `http://localhost:6006/iframe.html?id=layout-${layout}--default&viewMode=story`
        );
        
        await page.waitForLoadState('networkidle');
        
        await expect(page.locator('#storybook-root')).toHaveScreenshot(
          `layout-${layout}.png`,
          { animations: 'disabled' }
        );
      });
    }
  });

  test.describe('Responsive Design', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'wide', width: 1920, height: 1080 },
    ];

    for (const viewport of viewports) {
      test(`Button responsive - ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        
        await page.goto(
          'http://localhost:6006/iframe.html?id=ui-button--primary&viewMode=story'
        );
        
        await page.waitForLoadState('networkidle');
        
        await expect(page.locator('#storybook-root')).toHaveScreenshot(
          `button-${viewport.name}.png`,
          { animations: 'disabled' }
        );
      });
    }
  });

  test.describe('Dark Mode', () => {
    test('Button in dark mode', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=ui-button--primary&viewMode=story&globals=theme:dark'
      );
      
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(
        'button-dark-mode.png',
        { animations: 'disabled' }
      );
    });

    test('Card in dark mode', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=ui-card--default&viewMode=story&globals=theme:dark'
      );
      
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(
        'card-dark-mode.png',
        { animations: 'disabled' }
      );
    });
  });

  test.describe('Accessibility States', () => {
    test('Button focus state', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=ui-button--primary&viewMode=story'
      );
      
      await page.waitForLoadState('networkidle');
      
      // Focus the button
      await page.locator('button').first().focus();
      await page.waitForTimeout(200);
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(
        'button-focus.png',
        { animations: 'disabled', maxDiffPixels: 50 }
      );
    });

    test('Input error state', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=ui-input--with-error&viewMode=story'
      );
      
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(
        'input-error.png',
        { animations: 'disabled' }
      );
    });
  });
});
