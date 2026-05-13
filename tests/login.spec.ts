import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
    await page.goto('https://automationexercise.com/');
    await expect(page.getByText('Signup / Login')).toBeVisible();
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await page.locator('[data-qa="login-email"]').fill('alexEmail@gmail.com');
    await page.locator('[data-qa="login-password"]').fill('myPassword');
    await page.getByRole('button', { name: 'Login' }).click();
};

test('should login user successfully', async ({ page }) => {
    await login(page);
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    await page.getByRole('link', { name: 'Logout' }).click();
});

test('logout successfully', async ({ page }) => {
    await login(page);
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByRole('link', { name: 'Logout' })).toHaveCount(0);
});

test('should not login with invalid credentials', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await expect(page.getByText('Signup / Login')).toBeVisible();
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await page.locator('[data-qa="login-email"]').fill('wrongEmail@gmail.com');
    await page.locator('[data-qa="login-password"]').fill('wrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Your email or password is incorrect')).toBeVisible();
});