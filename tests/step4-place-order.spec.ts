import { test, expect } from '@playwright/test';
import { existsSync, mkdirSync } from 'fs';

// Ensure screenshots directory exists
if (!existsSync('screenshots')) mkdirSync('screenshots', { recursive: true });

test('E2E: Add product to cart, login if required, and proceed to checkout', async ({ page }) => {
  // STEP 1: Go to home page
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  // Prefer semantic locators — check for the site logo (image with accessible name) or Home link
  const logo = page.getByRole('img', { name: /website for automation practice/i }).first();
  if (await logo.isVisible().catch(() => false)) {
    await expect(logo).toBeVisible();
  } else {
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
  }

  // STEP 2: Add first product to cart — prefer role-based locator with fallback to class
  const addButton = page.getByRole('link', { name: /add to cart/i }).first();
  if (await addButton.isVisible().catch(() => false)) {
    await addButton.scrollIntoViewIfNeeded();
    await addButton.click();
  } else {
    // fallback: anchor with add-to-cart class
    const fallbackAdd = page.locator('a.add-to-cart[data-product-id="1"]').first();
    await fallbackAdd.scrollIntoViewIfNeeded();
    await fallbackAdd.click();
  }

  // STEP 3: Click "View Cart" from the confirmation popup — use role-based locator
  const viewCart = page.getByRole('link', { name: /view cart/i });
  await viewCart.waitFor({ state: 'visible', timeout: 10000 });
  await viewCart.click();
  await expect(page).toHaveURL(/.*view_cart/);

  // STEP 4 & 5: Click on "Proceed To Checkout" and handle modal/login
  // Try role-based link/button first, then class fallback
  const proceed = page.getByRole('link', { name: /proceed to checkout/i }).first();
  if (await proceed.isVisible().catch(() => false)) {
    await proceed.scrollIntoViewIfNeeded();
    await proceed.click();
  } else {
    const proceedFallback = page.locator('a.check_out, a.btn:has-text("Proceed To Checkout")').first();
    await proceedFallback.scrollIntoViewIfNeeded();
    await proceedFallback.click();
  }

  // If a modal requiring login appears, click the Register / Login link inside the modal
  const checkoutModal = page.locator('#checkoutModal .modal-content, .modal-content:has-text("Register / Login")');
  if (await checkoutModal.isVisible().catch(() => false)) {
    console.log('[test] checkout modal detected — clicking Register / Login link');
    const registerLink = checkoutModal.locator('a[href="/login"], a:has-text("Register / Login")').first();
    await registerLink.waitFor({ state: 'visible', timeout: 7000 }).catch(() => {});
    if (await registerLink.isVisible().catch(() => false)) {
      await registerLink.click();
      await page.waitForURL(/.*login.*/i, { timeout: 10000 }).catch(() => {});

      // STEP 6: Fill login form (data-qa attributes are stable)
      if (await page.locator('input[data-qa="login-email"]').isVisible().catch(() => false)) {
        await page.locator('input[data-qa="login-email"]').fill('playwrighttest@example.com');
        await page.locator('input[data-qa="login-password"]').fill('GFXbtcVV@57kPSH');
        await page.locator('button[data-qa="login-button"]').click();

        // Wait for redirect after login
        await page.waitForURL(/automationexercise\.com\/|.*(view_cart|checkout)/i, { timeout: 15000 }).catch(() => {});

        // If login redirects to home, explicitly go back to cart
        if (!/view_cart|checkout/.test(page.url())) {
          await page.goto('https://automationexercise.com/view_cart').catch(() => {});
          await expect(page).toHaveURL(/.*view_cart/);
        }
      }
    } else {
      // If the register link isn't visible for some reason, try the Continue On Cart button to dismiss
      const continueBtn = checkoutModal.getByRole('button', { name: /continue on cart/i }).first();
      if (await continueBtn.isVisible().catch(() => false)) {
        await continueBtn.click().catch(() => {});
      }
    }
  }

  // STEP 7: Ensure we land on the checkout/address details page
  // Try to reach checkout URL directly if needed
  if (!/checkout/.test(page.url())) {
    // Click proceed again if the control is present
    const proceedAgainRole = page.getByRole('link', { name: /proceed to checkout/i }).first();
    const proceedAgainFallback = page.locator('a.check_out').first();
    if (await proceedAgainRole.isVisible().catch(() => false)) {
      await proceedAgainRole.scrollIntoViewIfNeeded();
      await proceedAgainRole.click({ force: true }).catch(() => {});
    } else if (await proceedAgainFallback.isVisible().catch(() => false)) {
      await proceedAgainFallback.scrollIntoViewIfNeeded();
      await proceedAgainFallback.click({ force: true }).catch(() => {});
    }
    await page.waitForURL(/.*checkout.*/i, { timeout: 20000 }).catch(() => {});
  }

  await expect(page.getByRole('heading', { name: /address details/i }).first()).toBeVisible({ timeout: 15000 });

  // STEP 8: Take screenshot of checkout page
  await page.screenshot({ path: 'screenshots/checkout-page.png', fullPage: true });

// STEP 11: Click "Place Order" → navigate to payment page
const placeOrderButton = page.getByRole('link', { name: /place order/i });
await expect(placeOrderButton).toBeVisible({ timeout: 10000 });
await placeOrderButton.click();

// STEP 12: Verify payment page loaded
await page.waitForURL('https://automationexercise.com/payment', { timeout: 15000 });
await expect(page).toHaveURL('https://automationexercise.com/payment');

// Assert that it’s asking for card details (semantic locators)
await expect(page.getByRole('heading', { name: /payment/i })).toBeVisible({ timeout: 10000 });


});


