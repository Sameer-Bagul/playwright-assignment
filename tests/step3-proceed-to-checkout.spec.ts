import { test, expect } from '@playwright/test';

test('Add Product and Proceed to Checkout', async ({ page }) => {
  await page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded' });

  const firstProduct = page.locator('.product-image-wrapper').first();
  await firstProduct.locator('.productinfo a.add-to-cart').click();

  const viewCartButton = page.locator('#cartModal a:has-text("View Cart")');
  await expect(viewCartButton).toBeVisible();
  await viewCartButton.click();

  const cartTable = page.locator('#cart_info_table tbody');
  await expect(cartTable).toBeVisible();
  const cartProduct = cartTable.locator('td.cart_description h4 a').first();
  await expect(cartProduct).toBeVisible();

  const productName = await cartProduct.textContent();
  console.log('First product in cart:', productName);

  const checkoutButton = page.locator('a.check_out');
  await expect(checkoutButton).toBeVisible();
  await checkoutButton.click();

  const loginLink = page.locator('#checkoutModal a[href="/login"]');
  if (await loginLink.isVisible()) {
    await loginLink.click();

    await page.locator('input[data-qa="login-email"]').fill('playwrighttest@example.com');
    await page.locator('input[data-qa="login-password"]').fill('GFXbtcVV@57kPSH');
    await page.locator('button[data-qa="login-button"]').click();

    await page.goto('https://automationexercise.com/view_cart', { waitUntil: 'domcontentloaded' });

    await expect(cartTable).toBeVisible();
  }

  await page.screenshot({ path: 'screenshots/checkout-page.png', fullPage: true });
});
