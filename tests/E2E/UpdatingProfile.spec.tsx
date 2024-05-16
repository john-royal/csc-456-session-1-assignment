import { test, expect } from '@playwright/test';

test.describe('End to end test of editing a profile', () =>{
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
    test('on profile-page', async ({ page }) => {
        await page.goto('http://localhost:5173/Profile');
        await expect(page.getByRole('button', {name: /create new post/i})).toBeVisible();
    });
    test('editing bio prompt pops up', async ({ page }) => {
         await page.goto('http://localhost:5173/Profile');
         await page.getByRole('button', {name: /edit profile/i}).click();
         await expect(page.getByRole('button', {name: /save/i})).toBeVisible()
    });

    test('changing username and checking if updated', async ({ page }) => {
        const getMS = new Date().getMilliseconds();
        const newUser = `tester${getMS}`; //define the new username

        await page.goto('http://localhost:5173/Profile');
        await page.getByRole('button', {name: /edit profile/i}).click();
        await expect(page.getByRole('button', {name: /save/i})).toBeVisible() // check if we opened it

        await page.getByRole('textbox', {name: /username/i}).fill(''); //make sure it is less than 15 characters
        await page.getByRole('textbox', {name: /username/i}).fill('newUser');

        await page.getByRole('button', {name: /save/i}).click();
        await expect(page.getByRole('button', {name: /create new post/i})).toBeVisible();//confirm pop-up closed

        await page.reload({waitUntil: 'domcontentloaded'}); // reload the page
        await expect(page.getByText('newUser')).toBeVisible();
    });

    //changing the email causes bugs and was not able to be patched within time

    test('changing bio and checking if updated', async ({ page }) => {
        const bios = [
            "I'm 28, sharing my life with furry companions who fill my days with joy.",
            "At 35, I'm a dedicated advocate for animal welfare, volunteering at shelters and rescues to give pets a second chance at a loving home.",
            "Hi there! I'm 24, a pet enthusiast with a passion for training and behavior.",
            "I'm 31, surrounded by a menagerie of creatures, from dogs to cats to hamsters and more.",
            "Greetings! I'm 27, a veterinary technician dedicated to ensuring the health and happiness of every pet that comes through our clinic doors. From routine check-ups to emergency care."
          ];

        const newBio = bios[Math.floor(Math.random() * bios.length)]; //define the new username

        await page.goto('http://localhost:5173/Profile');
        await page.getByRole('button', {name: /edit profile/i}).click();
        await expect(page.getByRole('button', {name: /save/i})).toBeVisible() // check if we opened it

        await page.getByRole('textbox', {name: /bio/i}).fill('');
        await page.getByRole('textbox', {name: /bio/i}).fill(newBio);
        await page.getByRole('button', {name: /save/i}).click();
        await expect(page.getByRole('button', {name: /create new post/i})).toBeVisible();//confirm pop-up closed

        await page.reload({waitUntil: 'domcontentloaded'}); // reload the page
        await expect(page.getByText(newBio)).toBeVisible();
    });
});