import { test, expect } from '@playwright/test';

test('Sign-in Process', async ({ page }) => {
  await page.goto('http://localhost:5173/auth/sign-in'); // Update with your local address

  // Fill in the email and password fields
  await page.fill('input[type="email"]', 'joban@gmail.com');
  await page.fill('input[type="password"]', 'test123');

  // Click the sign-in button to submit the form
  await page.click('button.btn-primary');

  // Wait for navigation to the root path "/" after successful sign-in
  await page.waitForURL('http://localhost:5173/');

  await page.waitForTimeout(200);

  // Check if the user is redirected to the root path "/" after successful sign-in
  expect(page.url()).toBe('http://localhost:5173/');
  
});
