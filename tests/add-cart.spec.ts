import { test, expect } from '@playwright/test';
import { blockPopups } from './utils/popopBlocker';

test.beforeEach(({ page }) => {
    blockPopups(page);
});

test('Should add items from recommended list to cart', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await page.locator('.item .productinfo [data-product-id="4"]').click();
    await page.locator('[data-dismiss="modal"]').click();
    await page.locator('[data-slide="next"]').nth(1).click();
    await page.locator('.active [data-product-id="1"]').click();
    await page.locator('[data-dismiss="modal"]').click();
    await page.getByRole('link', {name: 'Cart'}).click();
    await expect(page.locator('#product-1 .cart_quantity button')).toContainText('1');
    await expect(page.locator('#product-4 .cart_quantity button')).toContainText('1');
});