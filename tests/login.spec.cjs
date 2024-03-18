
const { test, expect } = require('@playwright/test');

test('Login', async ({ page }) => {
  await page.goto('http://localhost:5173/auth/sign-in');
  await page.getByPlaceholder('Email').fill('test@gmail.com');
  await page.getByPlaceholder('Password').fill('testtesttest');
  await page.getByRole('button', { name: 'Sign In' }).click({ force: true});
  await page.waitForURL(' http://localhost:5173/');
  await expect(page.locator('button:has-text("Sign out")')).toBeVisible();
});