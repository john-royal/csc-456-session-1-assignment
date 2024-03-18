import React from "react";
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SignInPage from "../routes/auth.sign-in";


vi.mock('./lib/auth', () => ({
  ...vi.importActual('./lib/auth'), 
  useOptionalUser: vi.fn(() => null), // Override useOptionalUser or similar function
}));

describe('Login', () => {
    test('Render SignInPage with routing', () => {
        const router = createMemoryRouter([
            {
                path: "/auth/sign-in",
                element: <SignInPage />,
            },
        ], {
            initialEntries: ["/auth/sign-in"], // Direct the router to start at the sign-in page
        });

        render(
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        );

        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const signInButton = screen.getByRole('button', { name: /Sign In/i });
    
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(signInButton).toBeInTheDocument();
    });
});