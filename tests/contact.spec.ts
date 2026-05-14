import { test, expect, Page } from '@playwright/test';

test('should successfuly send details', async ({ page }) => {
    async function closeAdIfPresent(page: Page) {
        const popup = page.locator('#dismiss-button-element');
        await popup.click({ timeout: 2000 }).catch(() => { });
    }
    await page.goto('https://automationexercise.com/');

    await page.getByRole('link', { name: ' Contact us' }).click();
    await page.locator('[data-qa="name"]').fill('Alexander');
    await page.locator('[data-qa="email"]').fill('alexanderwayneforrest@gmail.com');
    await page.locator('[data-qa="subject"]').fill('Playwright Automation');
    await page.locator('[data-qa="message"]').fill('Hello World!');
    await page.locator('input[type="file"]').setInputFiles('tests/files/alexander-forrest-resume.pdf');
    page.on('dialog', async dialog => {
        await dialog.accept();
    });
    await page.locator('input[type="submit"]').click();
    await expect(page.getByText('Success! Your details have been submitted successfully.').first()).toBeVisible();
    await page.getByText('Home').nth(1).click();
    await closeAdIfPresent(page);
    await expect(page.locator('img[src="/static/images/home/girl2.jpg"]')).toBeVisible();
});