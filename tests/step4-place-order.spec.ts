import { test, expect } from '@playwright/test';

test('E2E: Add product to cart, login if required, proceed to checkout, and place order', async ({ page }) => {
  // STEP 1: Go to home page
  await page.goto('https://automationexercise.com/');
  await expect(page.locator('a[href="/"] img[alt="Website for automation practice"]')).toBeVisible();

  // STEP 2: Add first product to cart (stable locator)
  const firstProductAddButton = page.locator('a[data-product-id="1"].add-to-cart').first();
  await firstProductAddButton.click();

  // STEP 3: Click "View Cart" from the confirmation popup
  await page.locator('u:has-text("View Cart")').click();
  await expect(page).toHaveURL(/.*view_cart/);

  // STEP 4: Click on "Proceed To Checkout"
  await page.locator('a:has-text("Proceed To Checkout")').click();

  // STEP 5: Handle Checkout Modal — click "Register / Login"
  const modal = page.locator('.modal-content:has-text("Register / Login account")');
  if (await modal.isVisible({ timeout: 5000 })) {
    await page.locator('.modal-content a:has-text("Register / Login")').click();
    await expect(page).toHaveURL(/.*login/);

    // STEP 6: Fill login form
    await page.locator('input[data-qa="login-email"]').fill('playwrighttest@example.com');
    await page.locator('input[data-qa="login-password"]').fill('GFXbtcVV@57kPSH');
    await page.locator('button[data-qa="login-button"]').click();

    // Wait for redirect after login
    await page.waitForURL('https://automationexercise.com/', { timeout: 15000 });
    await expect(page.locator('a:has-text("Logged in as")')).toBeVisible({ timeout: 10000 });

    // STEP 7: Explicitly go back to cart (since login redirects home)
    await page.goto('https://automationexercise.com/view_cart');
    await expect(page).toHaveURL(/.*view_cart/);
  }

  // STEP 8: Proceed to checkout again — now should work
  await page.locator('a:has-text("Proceed To Checkout")').click();

  // STEP 9: Wait for checkout page
  await page.waitForURL('https://automationexercise.com/checkout', { timeout: 20000 });
  await expect(page).toHaveURL('https://automationexercise.com/checkout');
  await expect(page.locator('h2.heading:has-text("Address Details")')).toBeVisible({ timeout: 10000 });

  // STEP 10: Take screenshot of checkout page
  await page.screenshot({ path: 'checkout-page.png', fullPage: true });

  // ------------------------------
  // STEP 11: Click "Place Order" → navigate to payment page
  // ------------------------------
  const placeOrderButton = page.locator('a.btn.btn-default.check_out:has-text("Place Order")');
  await expect(placeOrderButton).toBeVisible({ timeout: 10000 });
  await placeOrderButton.click();

  // STEP 12: Verify payment page loaded
  await page.waitForURL('https://automationexercise.com/payment', { timeout: 15000 });
  await expect(page).toHaveURL('https://automationexercise.com/payment');

  // Assert that it’s asking for card details
  await expect(page.locator('h2:has-text("Payment")')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('input[name="name_on_card"]')).toBeVisible();
  await expect(page.locator('input[name="card_number"]')).toBeVisible();
  await expect(page.locator('input[name="cvc"]')).toBeVisible();
  await expect(page.locator('input[name="expiry_month"]')).toBeVisible();
  await expect(page.locator('input[name="expiry_year"]')).toBeVisible();

  // STEP 13: Take screenshot of payment page
  await page.screenshot({ path: 'payment-page.png', fullPage: true });
});
