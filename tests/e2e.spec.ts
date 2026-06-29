import { test, expect } from '@playwright/test';

test.describe('E-Commerce Flow', () => {
  test('User can add product to cart and checkout', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Wait for products to load
    await expect(page.locator('#products')).toBeVisible();

    // Click "ADD TO CART" on the first product
    const addToCartBtn = page.getByRole('button', { name: 'ADD TO CART' }).first();
    await addToCartBtn.click();

    // Open Cart Drawer
    await page.getByLabel('Shopping cart').click();

    // Verify cart drawer is open and item is there
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Proceed to Checkout' })).toBeVisible();

    // Try checking out (should prompt login because not authenticated)
    // Note: window.alert handles are needed in playwright for alerts
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Please sign in');
      await dialog.accept();
    });
    
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

    // Verify Login modal opens
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  });
});
