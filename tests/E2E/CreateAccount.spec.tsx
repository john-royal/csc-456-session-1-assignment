import { test, expect } from '@playwright/test';

const date = new Date();
const captureSeconds = date.getSeconds();

test.describe('End to end test of creating an account', () =>{ 
    test('on create-account page', async ({ page }) => {
        await page.goto('http://localhost:5173/auth/create-account');
        await expect(page.getByRole('heading', { name: /Sign Up Here/i })).toBeVisible();
      });

      test('verify account does not exist', async ({ page }) => {
          await page.goto('http://localhost:5173/auth/create-account');

          //get the input fields and click the sign in button
          await page.getByTestId('username-input').fill(`tester${captureSeconds}`);
          await page.getByTestId('email-input').fill(`testing${captureSeconds}@gmail.com`);
          await page.getByTestId('pwd-input').fill(String(captureSeconds));

          await page.getByTestId(/create-accnt/i).click();

          //expect the sign out button to appear as we have created an account 
          await expect(page.getByText(/testing2@gmail.com/i)).not.toBeVisible();
      }); 
      test('create an account', async ({ page }) => {
        await page.goto('http://localhost:5173/auth/create-account');

        //get the input fields and click the sign in button
        const email = `testing${captureSeconds}@gmail.com`;
        await page.getByTestId('username-input').fill(`tester${captureSeconds}`);
        await page.getByTestId('email-input').fill(email);
        await page.getByTestId('pwd-input').fill(String(captureSeconds));

        await page.getByTestId(/create-accnt/i).click();

        //expect the sign out button to appear as we have created an account 
        await expect(page.getByText(email)).not.toBeVisible();
    }); 
});