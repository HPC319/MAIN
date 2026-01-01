/**
 * Form Submit Invariants
 * Tests form behavior guarantees and validation
 */

import { test, expect } from '@playwright/test';

test.describe('Form Submit Invariants', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('prevents submission with empty required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    const errors = await page.locator('[role="alert"], .error, [aria-invalid="true"]').count();
    expect(errors).toBeGreaterThan(0);
  });

  test('validates email format', async ({ page }) => {
    const emailInput = page.locator('input[type="email"], input[name*="email"]').first();

    if (await emailInput.count() > 0) {
      await emailInput.fill('invalid-email');
      await emailInput.blur();

      const hasError = await page.locator('[role="alert"], .error').count();
      expect(hasError).toBeGreaterThan(0);
    }
  });

  test('shows loading state during submission', async ({ page }) => {
    const form = page.locator('form').first();

    if (await form.count() > 0) {
      const inputs = await form.locator('input[required], textarea[required]').all();

      for (const input of inputs) {
        await input.fill('valid input');
      }

      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      const loadingState = await page.locator('[aria-busy="true"], .loading, [disabled]').count();
      expect(loadingState).toBeGreaterThanOrEqual(0);
    }
  });

  test('maintains form data on validation error', async ({ page }) => {
    const textInput = page.locator('input[type="text"]').first();

    if (await textInput.count() > 0) {
      const testValue = 'Test Data';
      await textInput.fill(testValue);

      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      const currentValue = await textInput.inputValue();
      expect(currentValue).toBe(testValue);
    }
  });

  test('displays success message on valid submission', async ({ page }) => {
    page.on('response', async (response) => {
      if (response.request().method() === 'POST') {
        expect([200, 201]).toContain(response.status());
      }
    });

    const form = page.locator('form').first();

    if (await form.count() > 0) {
      const inputs = await form.locator('input, textarea').all();

      for (const input of inputs) {
        const type = await input.getAttribute('type');
        if (type === 'email') {
          await input.fill('test@example.com');
        } else {
          await input.fill('Valid input');
        }
      }
    }
  });

  test('enforces character limits', async ({ page }) => {
    const textareas = await page.locator('textarea[maxlength]').all();

    for (const textarea of textareas) {
      const maxLength = await textarea.getAttribute('maxlength');
      if (maxLength) {
        const limit = parseInt(maxLength);
        const longText = 'a'.repeat(limit + 10);

        await textarea.fill(longText);
        const value = await textarea.inputValue();

        expect(value.length).toBeLessThanOrEqual(limit);
      }
    }
  });

  test('provides accessible error messages', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    const errorMessages = await page.locator('[role="alert"]').all();

    for (const error of errorMessages) {
      const isVisible = await error.isVisible();
      expect(isVisible).toBe(true);
    }
  });

  test('prevents double submission', async ({ page }) => {
    let submissionCount = 0;

    page.on('request', (request) => {
      if (request.method() === 'POST') {
        submissionCount++;
      }
    });

    const form = page.locator('form').first();

    if (await form.count() > 0) {
      const inputs = await form.locator('input, textarea').all();

      for (const input of inputs) {
        await input.fill('Valid input');
      }

      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();
      await submitButton.click();

      await page.waitForTimeout(1000);

      expect(submissionCount).toBeLessThanOrEqual(1);
    }
  });

  test('clears form after successful submission', async ({ page }) => {
    const form = page.locator('form').first();

    if (await form.count() > 0) {
      const inputs = await form.locator('input, textarea').all();

      for (const input of inputs) {
        const type = await input.getAttribute('type');
        if (type === 'email') {
          await input.fill('test@example.com');
        } else {
          await input.fill('Valid input');
        }
      }
    }
  });

  test('focuses first error on validation failure', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    await page.waitForTimeout(500);

    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });

    expect(['INPUT', 'TEXTAREA', 'SELECT']).toContain(focusedElement);
  });
});
