import { test, expect, Page } from '@playwright/test';
import { blockPopups } from './utils/popopBlocker';
import { registerUser } from './register.spec';
import { login } from './login.spec';

export async function addProductsToCart(page: Page) {
    await page.goto("https://automationexercise.com/");
    await page.locator('img[src="/get_product_picture/1"]').hover();
    await page.locator('.overlay-content [data-product-id="1"]').click();
    await page.locator('[data-dismiss="modal"]').click();

    await page.locator('img[src="/get_product_picture/2"]').hover();
    await page.locator('.overlay-content [data-product-id="2"]').click();
    await page.locator('[data-dismiss="modal"]').click();
}

test.beforeEach(({ page }) => {
    blockPopups(page);
});

test('add products to cart and verify items in cart', async ({ page }) => {
    await addProductsToCart(page);
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.locator('#product-1 .cart_quantity button')).toContainText('1');
    await expect(page.locator('#product-2 .cart_quantity button')).toContainText('1');
});

test('register before checkout', async ({ page }) => {
    await addProductsToCart(page);
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByText('Proceed to Checkout').click();
    await page.getByRole('link', { name: 'Register / Login' }).click();
    await registerUser(page);
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.locator('#product-1 .cart_quantity button')).toContainText('1');
    await expect(page.locator('#product-2 .cart_quantity button')).toContainText('1');
});

test('login before checkout', async ({ page }) => {
    await addProductsToCart(page);
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByText('Proceed to Checkout').click();
    await page.getByRole('link', { name: 'Register / Login' }).click();
    await login(page);
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.locator('#product-1 .cart_quantity button')).toContainText('1');
    await expect(page.locator('#product-2 .cart_quantity button')).toContainText('1');
});

test('remove items from cart then verify items', async ({ page }) => {
    await addProductsToCart(page);
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.locator('#product-1 .cart_quantity button')).toContainText('1');
    await expect(page.locator('#product-2 .cart_quantity button')).toContainText('1');
    await page.locator('#product-2 .cart_quantity_delete').click();
    await page.locator('#product-1 .cart_quantity_delete').click();
    await expect(page.getByText('Cart is empty! Click here to buy products.')).toBeVisible();
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