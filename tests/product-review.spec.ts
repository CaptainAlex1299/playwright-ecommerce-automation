import { test, expect, Page } from '@playwright/test';
import { blockPopups } from './utils/popopBlocker';

test.beforeEach(({ page }) => {
    blockPopups(page);
});

test('should leave a review on product', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await page.locator('a[href="/product_details/1"]').click();
    await page.locator('#name').fill('Steve');
    await page.locator('#email').fill('myEmail@gmail.com');
    await page.locator('#review').fill('This is an amazing product! Thank you!');
    await page.locator('#button-review').click();
    const message = page.locator('text=Thank you for your review');
    await expect(message).toBeAttached();
});