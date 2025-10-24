import { test, expect } from '@playwright/test';

test('Visit Home Page', async ({ page }) => {
  // Navigate to the AutomationExercise home page
  await page.goto('https://automationexercise.com', {
    timeout: 60000,
    waitUntil: 'domcontentloaded'
  });

  // Locate the main heading "AutomationExercise" and assert it is visible
  const homeText = page.getByRole('heading', { name: 'AutomationExercise', level: 1 });
  await expect(homeText).toBeVisible();

  // Optional: Take a screenshot of the home page
  await page.screenshot({ path: 'screenshots/home-page.png', fullPage: true });
});
