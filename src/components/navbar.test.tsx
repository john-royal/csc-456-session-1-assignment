import "@testing-library/jest-dom/vitest";

import { act, render, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import Navbar from "./navbar";
import { Toaster } from "./ui/toaster";

const mock = vi.hoisted(() => ({
  useAuth: vi.fn(),
}));

vi.mock("../lib/auth.ts", () => mock);
vi.mock("react-router-dom", () => ({
  Link: (props: React.HTMLProps<HTMLAnchorElement>) => <a {...props} />,
}));

test("navbar shows 'sign in' and 'create account' buttons when not signed in", () => {
  mock.useAuth.mockReturnValue({
    user: null,
    signOut: () => Promise.resolve(),
  });
  const { getByTestId, unmount } = render(<Navbar />);
  expect(getByTestId("login-button")).toBeInTheDocument();
  expect(getByTestId("create-account-button")).toBeInTheDocument();

  unmount();
});

test("navbar shows current user and 'sign out' button when signed in", () => {
  mock.useAuth.mockReturnValue({
    user: { email: "hello@example.com" },
    signOut: () => Promise.resolve(),
  });
  const { getByTestId, unmount } = render(<Navbar />);
  expect(getByTestId("authenticated-user")).toHaveTextContent(
    "Signed in as hello@example.com",
  );
  expect(getByTestId("sign-out-button")).toBeInTheDocument();

  unmount();
});

test("error toast shown when sign out fails", async () => {
  mock.useAuth.mockReturnValue({
    user: { email: "hello@example.com" },
    signOut: () => Promise.reject(),
  });
  const { getByTestId, unmount } = render(
    <>
      <Navbar />
      <Toaster />
    </>,
  );
  act(() => {
    getByTestId("sign-out-button").click();
  });
  await waitFor(() => {
    expect(getByTestId("toast")).toHaveTextContent("Cannot sign out");
  });

  unmount();
});
