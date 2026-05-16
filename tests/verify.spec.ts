import { test, expect, Page } from '@playwright/test';
import { blockPopups } from './utils/popopBlocker';

test.beforeEach(({ page }) => {
     blockPopups(page);
});

test('verify test cases', async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    await page.getByRole('link', { name: ' Test Cases' }).click();
    const testCases = page.getByText('Test Case');
    const count = await testCases.count();
    expect(count).toBeGreaterThanOrEqual(26);
});

test('verify products on home page', async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    await expect(page.locator('.product-overlay')).toHaveCount(34);
});

