import React from 'react';
import { describe, expect, test, vi, fireEvent } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout.tsx';
import SignInPage from "../routes/auth.sign-in";
import userEvent from '@testing-library/user-event';



// Mock the necessary hooks or modules
vi.mock('../lib/auth', () => ({
  useAuth: () => ({
    signIn: vi.fn(() => Promise.reject(new Error("Invalid username or password"))),
    user: null,
  }),
  useOptionalUser: () => null,
}));

// Mock an error scenario
vi.mock('../lib/someService', () => ({
  fetchData: () => Promise.reject(new Error('Firebase: Error (auth/invalid-credential).')),
  
}));

describe('Navbar', () => {
  test('navbar renders & shows logged out state components', () => {
    const router = createMemoryRouter([
      {
        path: '/',
        element: <Layout />,
      },
    ], {
      initialEntries: ['/'], // Direct the router to start at the home page
    });

    render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );

    expect(screen.getByText('Log in')).toBeVisible();
    expect(screen.getByText('Sign up')).toBeVisible();
  });





  test("shows an error message when signing in with wrong credentials", async () => { 
    const router2 = createMemoryRouter([
      {
          path: "/auth/sign-in",
          element: <SignInPage />,
      },
  ], {
      initialEntries: ["/auth/sign-in"], // Direct the router to start at the sign-in page
  });

    render(
      <React.StrictMode>
        <RouterProvider router={router2} />
      </React.StrictMode>
    );
    
  await userEvent.type(screen.getByPlaceholderText("Email"), 'wrong@example.com');
  await userEvent.type(screen.getByPlaceholderText("Password"), 'wrongpassword');
  await userEvent.click(screen.getByRole('button', { name: /Sign In/i }));

  await waitFor(() => {
    expect(screen.getByText("Invalid username or password")).toBeVisible();
  });
  
  });
});