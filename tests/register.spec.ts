import { test, expect } from '@playwright/test';
import { blockPopups } from './utils/popopBlocker';

test.beforeEach(({ page }) => {
     blockPopups(page);
});

test('should register a new user and delete it successfully', async ({ page }) => {

  // go to landing page and click signup link
  await page.goto('https://automationexercise.com/');
  await expect(page.getByText('Signup / Login')).toBeVisible();
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  // fill email and name and click sign up
  await page.getByRole('textbox', { name: 'Name' }).fill('Alexander');
  const randomEmail = `alex${Date.now()}@gmail.com`;
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(randomEmail);
  await page.getByRole('button', { name: 'Signup' }).click();

  // fill account personal info
  await page.getByRole('radio', { name: 'Mr.' }).check();
  await page.getByRole('textbox', { name: 'Password *' }).fill('myPassword');
  await page.locator('#days').selectOption('18');
  await page.locator('#months').selectOption('8');
  await page.locator('#years').selectOption('2000');
  await page.getByRole('textbox', { name: 'First name *' }).fill('Alexander');
  await page.getByRole('textbox', { name: 'Last name *' }).fill('Forr');

  // address and contact details
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill('Unemployed');
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('address');
  await page.getByLabel('Country *').selectOption('Australia');
  await page.getByRole('textbox', { name: 'State *' }).fill('State');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('City');
  await page.locator('#zipcode').fill('1234');
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('0670670670677');
  await page.getByRole("button", { name: 'Create Account' }).click();

  // continue and delete account
  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.getByRole('link', { name: 'Delete Account' }).click();
});

test('should not Register User with existing email', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await expect(page.getByText('Signup / Login')).toBeVisible();
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Alexander');
  await page.locator('[data-qa="signup-email"]').fill('alexEmail@gmail.com');
  await page.getByRole('button', { name: 'Signup' }).click();
  await expect(page.getByText('Email Address already exist!')).toBeVisible();
})