import "@testing-library/jest-dom/vitest";

import { faker } from "@faker-js/faker";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { beforeEach, describe, expect, it, TaskContext } from "vitest";

import { fetchUser, useAuth } from "./auth";
import { auth } from "./firebase";

beforeEach(async () => {
  await auth.signOut();
});

describe("useAuth", () => {
  it("returns null when not signed in", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: RouterContext,
    });

    await waitFor(() => {
      expect(result.current?.user).toBeNull();
    });
  });

  it("returns current user when signed in", async (t) => {
    const { email } = await createRandomUser(t);

    const { result } = renderHook(() => useAuth(), {
      wrapper: RouterContext,
    });

    await waitFor(() => {
      expect(result.current?.user).not.toBeNull();
      expect(result.current.user?.id).toBeTypeOf("string");
      expect(result.current.user?.email).toEqual(email);
    });
  });

  it("signs in with email and password", async (t) => {
    const { email, password } = await createRandomUser(t);
    await auth.signOut();

    const { result } = renderHook(() => useAuth(), {
      wrapper: RouterContext,
    });

    await waitFor(() => {
      expect(result.current?.user).toBeNull();
    });

    await act(async () => {
      await result.current.signIn(email, password);
    });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
    });
  });

  it("throws an error when signing in with invalid credentials", async (t) => {
    const { email } = await createRandomUser(t);
    await auth.signOut();

    const { result } = renderHook(() => useAuth(), {
      wrapper: RouterContext,
    });

    await waitFor(() => {
      expect(result.current?.user).toBeNull();
    });

    await expect(
      result.current.signIn(email, faker.internet.password()),
    ).rejects.toThrowError("Firebase: Error (auth/invalid-credential)");
  });
});

const RouterContext = ({ children }: { children: React.ReactNode }) => {
  const router = createMemoryRouter([
    {
      id: "root",
      path: "/",
      element: children,
      loader: fetchUser,
    },
  ]);

  return <RouterProvider router={router} />;
};

const createRandomUser = async (t: TaskContext) => {
  const email = faker.internet.email().toLowerCase();
  const password = faker.internet.password();

  const result = await createUserWithEmailAndPassword(auth, email, password);

  t.onTestFinished(async () => {
    await signInWithEmailAndPassword(auth, email, password);
    await deleteUser(result.user);
  });

  return { email, password, result };
};
