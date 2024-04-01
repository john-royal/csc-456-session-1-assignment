import { test, expect } from '@playwright/test';

test.describe('End to end test of creating an account', () =>{ 
    test('on create-account page', async ({ page }) => {
        await page.goto('http://localhost:5173/auth/create-account');
        await expect(page.getByRole('heading', { name: /Sign Up Here/i })).toBeVisible();
      });
      
      test('verify account does not exist', async ({ page }) => {
          await page.goto('http://localhost:5173/auth/create-account');
      
          //get the input fields and click the sign in button
          await page.getByTestId('username-input').fill('ImATester');
          await page.getByTestId('email-input').fill('testing2@gmail.com');
          await page.getByTestId('pwd-input').fill('456789');

          await page.getByTestId(/create-accnt/i).click();
      
          //expect the sign out button to appear as we have created an account 
          await expect(page.getByText(/testing2@gmail.com/i)).not.toBeVisible();
      }); 
      test('create an account', async ({ page }) => {
        await page.goto('http://localhost:5173/auth/create-account');
    
        //get the input fields and click the sign in button
        const email = 'testing3@gmail.com';
        await page.getByTestId('username-input').fill('ImAnotherTester');
        await page.getByTestId('email-input').fill(email);
        await page.getByTestId('pwd-input').fill('456789');

        await page.getByTestId(/create-accnt/i).click();
    
        //expect the sign out button to appear as we have created an account 
        await expect(page.getByText(email)).not.toBeVisible();
    }); 
});