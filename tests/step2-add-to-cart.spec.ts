import { test, expect } from '@playwright/test';

test('Add Product to Cart using stable locators', async ({ page }) => {

  // Step 1: Navigate to the site
  await page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/Automation Exercise/i);

  // Step 2: Scroll to products section to ensure it's visible
  await page.locator('a:has-text("Products")').click();
  await expect(page).toHaveURL(/\/products/);

  // Wait for product grid to load
  const firstProduct = page.locator('.product-image-wrapper').first();
  await expect(firstProduct).toBeVisible();

  // Step 3: Hover over the first product to reveal "Add to cart"
  await firstProduct.hover();

  // Click "Add to cart" using visible text
  const addToCartButton = page.getByText('Add to cart', { exact: false }).first();
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

  // Step 4: Click "View Cart" from the modal
  const viewCartButton = page.getByRole('link', { name: /view cart/i });
  await expect(viewCartButton).toBeVisible();
  await viewCartButton.click();

  // Step 5: Verify the product is in the cart
  const cartTable = page.getByRole('table');
  await expect(cartTable).toBeVisible();

  const cartProduct = cartTable.getByRole('link').first();
  const productName = await cartProduct.textContent();

  console.log('Added product:', productName?.trim());

  await page.screenshot({ path: 'screenshots/cart-stable-fix.png', fullPage: true });
});
