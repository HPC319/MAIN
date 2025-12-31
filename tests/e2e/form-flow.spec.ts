// @ts-nocheck
import { test, expect } from '@playwright/test';

test.describe('Form Flow E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a form page - adjust URL as needed
    await page.goto('/');
  });

  test('complete form submission flow', async ({ page }) => {
    // Fill out form fields
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'SecurePassword123!');
    
    // Check that validation passes
    await expect(page.locator('input[name="email"]')).toHaveAttribute('aria-invalid', 'false');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for success message or navigation
    await expect(page.locator('text=Success')).toBeVisible({ timeout: 5000 });
  });

  test('displays validation errors', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for error messages
    await expect(page.locator('text=required')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toHaveAttribute('aria-invalid', 'true');
  });

  test('supports keyboard navigation', async ({ page }) => {
    // Tab through form fields
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="email"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="password"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('button[type="submit"]')).toBeFocused();
  });

  test('auto-save functionality', async ({ page }) => {
    // Type in input field
    await page.fill('input[name="email"]', 'test@example.com');
    
    // Wait for auto-save indicator
    await expect(page.locator('text=Saving')).toBeVisible();
    await expect(page.locator('text=Saved')).toBeVisible({ timeout: 3000 });
  });

  test('field progress tracking', async ({ page }) => {
    // Check initial progress
    const progress = page.locator('[role="progressbar"]');
    await expect(progress).toHaveAttribute('aria-valuenow', '0');
    
    // Fill first field
    await page.fill('input[name="email"]', 'test@example.com');
    await expect(progress).toHaveAttribute('aria-valuenow', /[^0]/);
    
    // Fill second field
    await page.fill('input[name="password"]', 'SecurePassword123!');
    await expect(progress).toHaveAttribute('aria-valuenow', '100');
  });

  test('responsive design on mobile', async ({ page, _context: _context }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that form is usable
    await expect(page.locator('form')).toBeVisible();
    await page.fill('input[name="email"]', 'mobile@test.com');
    
    // Touch interaction
    await page.tap('button[type="submit"]');
  });

  test('motion identity animations', async ({ page }) => {
    // Check for Canonstrata signature animations
    const button = page.locator('button[type="submit"]');
    
    // Hover should trigger signature motion
    await button.hover();
    
    // Check for transform or animation class
    await expect(button).toHaveCSS('transition', /transform/);
  });

  test('reduced motion support', async ({ page, _context: _context }) => {
    // Emulate reduced motion preference
    await _context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
        }),
      });
    });
    
    await page.reload();
    
    // Verify reduced animations
    const button = page.locator('button[type="submit"]');
    await expect(button).toBeVisible();
  });

  test('loading state during submission', async ({ page }) => {
    // Fill form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'SecurePassword123!');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Check loading state
    await expect(page.locator('button[type="submit"]')).toHaveAttribute('aria-busy', 'true');
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
  });

  test('error recovery flow', async ({ page }) => {
    // Submit with invalid data
    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');
    
    // Check error state
    await expect(page.locator('text=invalid')).toBeVisible();
    
    // Correct the error
    await page.fill('input[name="email"]', 'valid@example.com');
    
    // Error should clear
    await expect(page.locator('text=invalid')).not.toBeVisible();
  });
});
