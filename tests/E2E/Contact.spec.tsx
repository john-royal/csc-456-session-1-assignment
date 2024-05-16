import { test, expect } from '@playwright/test';

test.describe('End to end test of contact functionality', () =>{ 

    test.beforeEach('sign in', async ({page}) => {
        //first we must sign in.
        await page.goto('http://localhost:5173/auth/sign-in');

        //get the input fields and click the sign in button
        await page.getByTestId('email-input').fill('testing@gmail.com');
        await page.getByTestId('pwd-input').fill('12345678');
        await page.getByRole('button', { name: /sign in/i }).click();

        //expect the sign out button to appear as we are signed in
        await expect(page.getByRole('button', {name: /sign out/i})).toBeVisible();
    });

    test('on contact us page', async ({ page }) => {
        await page.goto('http://localhost:5173/Contact');
        await expect(page.getByRole('button', {name: /send message/i})).toBeVisible();
    });

    test('fill form and send', async ({ page }) => {
        await page.goto('http://localhost:5173/Contact');
        await expect(page.getByRole('button', {name: /send message/i})).toBeVisible();

        await page.getByRole('textbox', {name: /name/i}).fill('Someone');
        await page.getByRole('textbox', {name: /email/i}).fill('someone@gmail.com');
        await page.getByRole('textbox', {name: /message/i}).fill('I would love to learn more about...');
        await page.getByRole('button', {name: /send message/i}).click();


        await expect(page.getByText(/message sent/i)).toBeVisible();
    });
});