import { test, expect } from '@playwright/test';

test.describe('End to end test of sign in', () =>{ 
    test('on sign-in page', async ({ page }) => {
        await page.goto('http://localhost:5173/');
        await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
      });
      
      test('sign in', async ({ page }) => {
          await page.goto('http://localhost:5173/auth/sign-in');
      
          //get the input fields and click the sign in button
          await page.getByTestId('email-input').fill('testing@gmail.com');
          await page.getByTestId('pwd-input').fill('123456');
          await page.getByRole('button', { name: /sign in/i }).click();
      
          //expect the sign out button to appear as we are signed in
          await expect(page.getByRole('button', {name: /sign out/i})).toBeVisible();
      });
      
      test('sign out', async ({ page }) => {
          await page.goto('http://localhost:5173/auth/sign-in');
      
          //get the input fields and click the sign in button
          await page.getByTestId('email-input').fill('testing@gmail.com');
          await page.getByTestId('pwd-input').fill('123456');
          await page.getByRole('button', { name: /sign in/i }).click();
      
          //expect the sign out button to appear as we are signed in
          await expect(page.getByRole('button', {name: /sign out/i})).toBeVisible();
      
          await page.getByRole('button', {name: /sign out/i}).click();
          //expect to be back on the sign in page as we signed out
          await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
      });
});