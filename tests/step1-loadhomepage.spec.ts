import { test, expect } from '@playwright/test';

test('Visit Home Page', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    timeout: 60000,
    waitUntil: 'domcontentloaded'
  });

  const homeText = page.getByRole('heading', { name: 'AutomationExercise', level: 1 });
  await expect(homeText).toBeVisible();

  await page.screenshot({ path: 'screenshots/home-page.png', fullPage: true });
});
