import { test, expect, Page } from '@playwright/test';

test('should successfuly send details', async ({ page }) => {
    async function closeAdIfPresent(page: Page) {
            const popup = page.locator('#dismiss-button-element');
            await popup.click({ timeout: 2000 }).catch(() => { });
        }
    await page.goto("https://automationexercise.com/");
    await closeAdIfPresent(page);
    await page.getByRole('link', { name: ' Test Cases' }).click();
    await expect(page.getByText("Test Case")).toHaveCount(32);
});