import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  
  await page.getByRole('textbox', { name: 'Name' }).fill('Alexander');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();

  const randomEmail = `alex${Date.now()}@gmail.com`;
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(randomEmail);

  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('radio', { name: 'Mr.' }).check();

  await page.getByRole('textbox', { name: 'Password *' }).fill('myPassword');
  
  await page.locator('#days').selectOption('18');
  await page.locator('#months').selectOption('8');
  await page.getByText('Date of Birth Day 1 2 3 4 5 6').click();
  await page.locator('#years').selectOption('2000');

  await page.getByRole('textbox', { name: 'First name *' }).fill('Alexander');

  await page.getByRole('textbox', { name: 'Last name *' }).fill('Forr');

  await page.getByRole('textbox', { name: 'Company', exact: true }).fill('Unemployed');

  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('address');

  await page.getByLabel('Country *').selectOption('Australia');
  
  await page.getByRole('textbox', { name: 'State *' }).fill('State');
  
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('City');

  await page.locator('#zipcode').fill('1234');
  
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('0670670670677');
});