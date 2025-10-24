# Playwright Assignment – AutomationExercise

This repository contains a **Playwright project in TypeScript** that automates an e-commerce workflow on [AutomationExercise](https://automationexercise.com). It demonstrates end-to-end testing of key user actions, including browsing, adding products to the cart, proceeding to checkout, and verifying the payment page.

---

## Features

* End-to-end automation using **Playwright** and **TypeScript**
* Cross-browser testing support: **Chromium, Firefox, WebKit**
* Test isolation using **hooks** and robust **assertions**
* Screenshots for verification of test steps
* HTML reports for easy test review

---

## Workflow Steps

1. **Visit Home Page**

   * Navigate to the home page and verify that the "AutomationExercise" text is visible.

2. **Add Product to Cart**

   * Click "Add to cart" for the first product.
   * View the cart and verify that the product is present.

3. **Proceed to Checkout**

   * Click "Proceed To Checkout".
   * If prompted, log in using the following credentials:

     * **Email:** [playwrighttest@example.com](mailto:playwrighttest@example.com)
     * **Password:** GFXbtcVV@57kPSH

4. **Place the Order**

   * Verify that the order placement page asks for card/payment details.
   * Capture a screenshot for reference.

---

## Project Structure

* `tests/` – Test files for each workflow step
* `screenshots/` – Screenshots captured during test execution
* `playwright.config.ts` – Playwright configuration file
* `package.json` – Project dependencies and scripts
* `tsconfig.json` – TypeScript configuration

---

## Getting Started

1. **Clone the repository**

   ```
   git clone https://github.com/Sameer-Bagul/playwright-assignment.git
   cd playwright-assignment
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Install Playwright browsers**

   ```
   npx playwright install
   ```

---

## Running Tests

* **Run all tests**

  ```
  npx playwright test
  ```

* **Run a specific test file**

  ```
  npx playwright test tests/step1-visit-home.spec.ts --headed
  ```

* **View HTML report**

  ```
  npx playwright show-report
  ```

---

## Repository Links

* **Assignment repository:** [https://github.com/Sameer-Bagul/playwright-assignment.git](https://github.com/Sameer-Bagul/playwright-assignment.git)
* **Learning & Notes repository:** [https://github.com/Sameer-Bagul/playwright-exercise.git](https://github.com/Sameer-Bagul/playwright-exercise.git) – contains detailed Playwright notes and example code snippets for learning

---

## Notes

* Tests are written in **TypeScript** for type safety and maintainability.
* Designed for **learning purposes** and **practical end-to-end testing examples**.
* Screenshots and reports help with **debugging** and verifying test outcomes.

