/**
 * Page Render Invariants
 * Tests fundamental rendering guarantees across all pages
 */

import { test, expect } from '@playwright/test';

test.describe('Page Render Invariants', () => {
  const pages = ['/', '/about', '/contact'];

  pages.forEach(page => {
    test.describe(`Page: ${page}`, () => {
      test('renders without errors', async ({ page: pw }) => {
        const errors: string[] = [];
        pw.on('pageerror', (error) => {
          errors.push(error.message);
        });

        await pw.goto(page);
        await pw.waitForLoadState('networkidle');

        expect(errors).toHaveLength(0);
      });

      test('has valid document structure', async ({ page: pw }) => {
        await pw.goto(page);

        const html = await pw.locator('html');
        expect(await html.count()).toBe(1);

        const body = await pw.locator('body');
        expect(await body.count()).toBe(1);

        const head = await pw.locator('head');
        expect(await head.count()).toBe(1);
      });

      test('has required meta tags', async ({ page: pw }) => {
        await pw.goto(page);

        const viewport = await pw.locator('meta[name="viewport"]');
        expect(await viewport.count()).toBeGreaterThanOrEqual(1);

        const charset = await pw.locator('meta[charset]');
        expect(await charset.count()).toBeGreaterThanOrEqual(1);
      });

      test('has no console errors', async ({ page: pw }) => {
        const consoleErrors: string[] = [];
        pw.on('console', (msg) => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });

        await pw.goto(page);
        await pw.waitForLoadState('networkidle');

        expect(consoleErrors).toHaveLength(0);
      });

      test('loads within performance budget', async ({ page: pw }) => {
        await pw.goto(page);

        const performanceTiming = await pw.evaluate(() => {
          const timing = performance.timing;
          return {
            loadTime: timing.loadEventEnd - timing.navigationStart,
            domReady: timing.domContentLoadedEventEnd - timing.navigationStart
          };
        });

        expect(performanceTiming.loadTime).toBeLessThan(3000);
        expect(performanceTiming.domReady).toBeLessThan(2000);
      });

      test('has accessible heading hierarchy', async ({ page: pw }) => {
        await pw.goto(page);

        const h1Count = await pw.locator('h1').count();
        expect(h1Count).toBeGreaterThanOrEqual(1);
        expect(h1Count).toBeLessThanOrEqual(1);

        const headings = await pw.locator('h1, h2, h3, h4, h5, h6').all();
        expect(headings.length).toBeGreaterThan(0);
      });

      test('has valid ARIA landmarks', async ({ page: pw }) => {
        await pw.goto(page);

        const main = await pw.locator('main, [role="main"]');
        expect(await main.count()).toBeGreaterThanOrEqual(1);
      });

      test('renders with JavaScript disabled', async ({ page: pw, context }) => {
        await context.setJavaScriptEnabled(false);

        const response = await pw.goto(page);
        expect(response?.status()).toBe(200);

        const body = await pw.locator('body');
        const content = await body.textContent();
        expect(content?.length).toBeGreaterThan(0);
      });

      test('has proper CSS loading', async ({ page: pw }) => {
        await pw.goto(page);
        await pw.waitForLoadState('networkidle');

        const styles = await pw.evaluate(() => {
          return Array.from(document.styleSheets).length;
        });

        expect(styles).toBeGreaterThan(0);
      });

      test('maintains responsive layout', async ({ page: pw }) => {
        const viewports = [
          { width: 375, height: 667, name: 'mobile' },
          { width: 768, height: 1024, name: 'tablet' },
          { width: 1920, height: 1080, name: 'desktop' }
        ];

        for (const viewport of viewports) {
          await pw.setViewportSize({ width: viewport.width, height: viewport.height });
          await pw.goto(page);

          const hasOverflow = await pw.evaluate(() => {
            return document.documentElement.scrollWidth > document.documentElement.clientWidth;
          });

          expect(hasOverflow).toBe(false);
        }
      });
    });
  });

  test('maintains global state consistency', async ({ page: pw }) => {
    await pw.goto('/');

    const initialState = await pw.evaluate(() => {
      return {
        hasReact: typeof (window as any).React !== 'undefined',
        hasNextData: typeof (window as any).__NEXT_DATA__ !== 'undefined'
      };
    });

    await pw.goto('/about');

    const nextState = await pw.evaluate(() => {
      return {
        hasReact: typeof (window as any).React !== 'undefined',
        hasNextData: typeof (window as any).__NEXT_DATA__ !== 'undefined'
      };
    });

    expect(initialState.hasNextData).toBe(nextState.hasNextData);
  });

  test('preserves design system tokens', async ({ page: pw }) => {
    await pw.goto('/');

    const usesCustomProperties = await pw.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      const customProps = Array.from(styles).filter(prop => prop.startsWith('--'));
      return customProps.length > 0;
    });

    expect(usesCustomProperties).toBe(true);
  });
});
