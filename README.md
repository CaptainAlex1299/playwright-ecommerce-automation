# Playwright E-commerce Automation Framework

A robust **End-to-End (E2E) test automation** project built with **Playwright** and **TypeScript** for a modern e-commerce website.

Designed to demonstrate reliable automation of critical user flows including user registration, login, contact form submission, and checkout processes.

## Features

- **User Registration & Login** – Complete authentication flows
- **Contact Form Automation** – Including popup handling and form validation
- **Checkout Flow** – Login + purchase simulation
- **Robust Test Structure** – Page Object Model ready + utilities
- **CI/CD Ready** – GitHub Actions workflow included
- **Best Practices** – TypeScript, clean code, and reliable selectors

## Tech Stack

- **Playwright** - End-to-end testing
- **TypeScript** - Type safety
- **Node.js**
- **GitHub Actions** - Continuous Integration

## Project Structure
├── tests/
│   ├── login.spec.ts
│   ├── register.spec.ts
│   ├── contact.spec.ts
│   ├── verify.spec.ts
│   └── utils/
│       └── helpers.ts
├── .github/workflows/     # CI pipeline
├── playwright.config.ts
└── package.json

## How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/CaptainAlex1299/playwright-ecommerce-automation.git
   cd playwright-ecommerce-automation

2. Install dependenciesBash
    npm install

3. Run tests
    # Run all tests
    npx playwright test

    # Run in headed mode (see browser)
    npx playwright test --headed

    # Run specific test file
    npx playwright test tests/login.spec.ts

4. View HTML Report
    npx playwright show-report