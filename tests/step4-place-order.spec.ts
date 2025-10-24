import { test, expect } from '@playwright/test';

test('Place Order and Check Card Details (Stable)', async ({ page }) => {
  // Disable animations to avoid hidden elements due to transitions
  await page.addInitScript(() => {
    const style = document.createElement('style');
    style.innerHTML = `* { transition-duration: 0s !important; animation-duration: 0s !important; }`;
    document.head.appendChild(style);
  });

  //  Navigate to home page
  await page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded' });

  //  Add first product to cart
  const firstProduct = page.locator('.product-image-wrapper').first();
  await firstProduct.locator('.productinfo a.add-to-cart').click();

  //  Click "View Cart" from modal
  const viewCartButton = page.locator('#cartModal a:has-text("View Cart")');
  await viewCartButton.waitFor({ state: 'visible', timeout: 10000 });
  await viewCartButton.click();

  //  Verify product in cart
  const cartTable = page.locator('#cart_info_table tbody');
  await cartTable.waitFor({ state: 'visible', timeout: 10000 });
  const cartProduct = cartTable.locator('td.cart_description h4 a').first();
  await expect(cartProduct).toBeVisible();

  // Optional: log product name
  const productName = await cartProduct.textContent();
  console.log('First product in cart:', productName);

  //  Click "Proceed To Checkout"
  const checkoutButton = page.locator('a.check_out');
  await checkoutButton.waitFor({ state: 'visible', timeout: 10000 });
  await checkoutButton.click();

  //  Handle login modal if it appears
  const loginLink = page.locator('#checkoutModal a[href="/login"]');
  if (await loginLink.isVisible()) {
    await loginLink.click();

    // Fill login credentials
    await page.locator('input[data-qa="login-email"]').fill('playwrighttest@example.com');
    await page.locator('input[data-qa="login-password"]').fill('GFXbtcVV@57kPSH');
    await page.locator('button[data-qa="login-button"]').click();

    // Navigate back to cart after login
    await page.goto('https://automationexercise.com/view_cart', { waitUntil: 'domcontentloaded' });
    await cartTable.waitFor({ state: 'visible', timeout: 10000 });

    // Click Proceed to Checkout again
    await checkoutButton.waitFor({ state: 'visible', timeout: 10000 });
    await checkoutButton.click();
  }

  // Fill order details if fields are visible
  const nameField = page.locator('input[data-qa="name"]');
  if (await nameField.isVisible()) {
    await nameField.fill('Playwright Test User');
    await page.locator('input[data-qa="address"]').fill('123 Test Street');
    await page.locator('textarea[data-qa="comment"]').fill('Please deliver fast.');
  }

  // Click "Place Order" safely
  const placeOrderButton = page.locator('a:has-text("Place Order")');
  await placeOrderButton.waitFor({ state: 'visible', timeout: 10000 });
  await placeOrderButton.click();

  // Assert that card/payment details form appears
  const cardForm = page.locator('input[name="card_number"], input[name="cardholder_name"], input[name="cvc"]');
  await cardForm.first().waitFor({ state: 'visible', timeout: 10000 });
  await expect(cardForm.first()).toBeVisible();

  // Take screenshot of the payment section
  await page.screenshot({ path: 'screenshots/payment-page.png', fullPage: true });

  console.log('Order placement reached card details page successfully.');
});
