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

test('search a product', async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    await page.getByRole('link', { name: 'Products' }).click();
    await expect(page.locator('#search_product')).toBeVisible();
    await page.locator('#search_product').fill('Summer White Top');
    await page.locator('#submit_search').click();
    await page.locator('#search_product').clear();
    await expect(page.locator('img[src="/get_product_picture/6"]')).toBeVisible();
})

