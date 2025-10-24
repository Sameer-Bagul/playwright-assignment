import { test, expect } from '@playwright/test';

test('Add Product to Cart', async ({ page }) => {
  await page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded' });

  const firstProduct = page.locator('.product-image-wrapper').first();

  const addToCartButton = firstProduct.locator('.productinfo a.add-to-cart');
  await addToCartButton.click();

  const viewCartButton = page.locator('#cartModal a:has-text("View Cart")');
  await expect(viewCartButton).toBeVisible();
  await viewCartButton.click();

  const cartTable = page.locator('table.table-condensed tbody');
  await expect(cartTable).toBeVisible();

  const cartProduct = cartTable.locator('td.cart_description h4 a').first();
  await expect(cartProduct).toBeVisible();

  const productName = await cartProduct.textContent();
  console.log('First product in cart:', productName);

  await page.screenshot({ path: 'screenshots/cart-page.png', fullPage: true });
});
