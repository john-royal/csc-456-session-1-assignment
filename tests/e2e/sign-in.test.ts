import { expect, test } from "@playwright/test";

test("sign in", async ({ page }) => {
  await page.goto("http://localhost:4173");
  await page.waitForURL("http://localhost:4173/auth/sign-in?next=%2F");

  const email = page.getByPlaceholder("Email");
  const password = page.getByPlaceholder("Password");
  const button = page.getByRole("button", { name: "Sign In" });

  await email.fill("john@john.john");
  await password.fill("johnjohn");
  await button.click();

  await page.waitForURL("http://localhost:4173/");

  const authenticatedUser = page.getByTestId("authenticated-user");
  expect(await authenticatedUser.textContent()).toBe(
    "Signed in as john@john.john",
  );

  const signOutButton = page.getByTestId("sign-out-button");
  await signOutButton.click();

  await page.waitForURL("http://localhost:4173/auth/sign-in");
});
