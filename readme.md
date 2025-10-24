# Playwright Assignment – AutomationExercise

This repository contains a **Playwright project in TypeScript** that automates a complete e-commerce workflow on [AutomationExercise](https://automationexercise.com). The project demonstrates end-to-end testing of key user actions, including adding products to the cart, proceeding to checkout, and verifying the payment page.

---

## Features

* End-to-end automation using **Playwright** and **TypeScript**
* Cross-browser testing support (Chromium, Firefox, WebKit)
* Test isolation with hooks and assertions for reliability
* Screenshots captured for verification of test steps

---

## Workflow Steps

1. **Visit Home Page**
   Navigate to the home page and assert the visibility of the "AutomationExercise" text.

2. **Add Product to Cart**
   Click "Add to cart" for the first product, view the cart, and assert that the product is present.

3. **Proceed to Checkout**
   Click "Proceed To Checkout". If prompted, log in using the test credentials:

   * **Email:** [playwrighttest@example.com](mailto:playwrighttest@example.com)
   * **Password:** GFXbtcVV@57kPSH

4. **Place the Order**
   Verify that the order placement page asks for card/payment details and capture a screenshot.

---

## Project Structure

* `tests/` – Contains test files for each step of the workflow
* `screenshots/` – Captured screenshots during test execution
* `playwright.config.ts` – Playwright configuration file
* `package.json` – Project dependencies and scripts
* `tsconfig.json` – TypeScript configuration

---

## Setup & Execution

1. **Clone the repository** from GitHub
2. **Install dependencies** using npm
3. **Install Playwright browsers**
4. **Run tests**: execute all tests or run individual test files as needed
5. **View test reports** generated in HTML format

---

## Repository Links

* **Assignment repository:** [https://github.com/Sameer-Bagul/playwright-assignment.git](https://github.com/Sameer-Bagul/playwright-assignment.git)
* **Learning & Notes repository:** [https://github.com/Sameer-Bagul/playwright-exercise.git](https://github.com/Sameer-Bagul/playwright-exercise.git) – contains detailed Playwright notes and will include example code snippets

---

## Notes

* Tests are written in **TypeScript** for type safety and maintainability.
* Designed for **learning purposes** as well as **practical end-to-end automation examples**.
* Screenshots and reports help with debugging and verifying test outcomes.

