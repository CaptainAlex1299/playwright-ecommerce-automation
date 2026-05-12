import { test, expect } from '@playwright/test';

test('should login user successfully', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await expect(page.getByText('Signup / Login')).toBeVisible();
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('alexEmail@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('myPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    await page.getByRole('link', { name: 'Logout' }).click();
});