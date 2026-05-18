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

export async function addProductsToCart(page: Page) {
    await page.goto("https://automationexercise.com/");
    await page.locator('img[src="/get_product_picture/1"]').hover();
    await page.locator('.overlay-content [data-product-id="1"]').click();
    await page.locator('[data-dismiss="modal"]').click();
    await page.locator('img[src="/get_product_picture/2"]').hover();
    await page.locator('.overlay-content [data-product-id="2"]').click();
    await page.locator('[data-dismiss="modal"]').click();
    await page.getByRole('link', { name: 'Cart' }).click();
}

test('add products to cart and verify items in cart', async ({ page }) => {
    await addProductsToCart(page);
    await expect(page.getByText('Blue Top')).toBeVisible();
    await expect(page.getByText('Men Tshirt')).toBeVisible();
});
