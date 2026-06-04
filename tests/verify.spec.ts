import { test, expect, Page } from '@playwright/test';
import { blockPopups } from './utils/popopBlocker';
import { registerUser } from './register.spec';
import { login } from './login.spec';

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
    await expect(page.locator('img[src="/get_product_picture/6"]')).toBeVisible();
})

test('verify subscription', async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    await expect(page.locator('#susbscribe_email')).toBeVisible();
});

test('verify subscription in cart page', async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.locator('#susbscribe_email')).toBeVisible();
});

test('View Category Products', async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    await page.getByRole('link', { name: 'Products' }).click();
    await page.getByRole('link', { name: 'Women' }).click();
    await page.getByRole('link', { name: 'Dress' }).click();
    await expect(page.getByText('Women - Dress Products')).toBeVisible();
});

test('Search Products and Verify Cart After Login', async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    await page.getByRole('link', { name: 'Products' }).click();
    await page.locator('#search_product').fill('Dress');
    await page.locator('#submit_search').click();
    await expect(page.getByText('Searched Products')).toBeVisible();
    await page.locator('img[src="/get_product_picture/3"]').hover();
    await page.locator('.overlay-content [data-product-id="3"]').click();
    await page.locator('[data-dismiss="modal"]').click();
    await login(page);
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.locator('#product-1 .cart_quantity button')).toContainText('1');
});