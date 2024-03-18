import React from "react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test, fireEvent, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from  "../components/layout.tsx"
import { createMemoryRouter, RouterProvider } from "react-router-dom";

// Mock the necessary hooks or modules
vi.mock('../lib/auth', () => ({
  useAuth: () => ({
    user: null, // For logged out state
    // Other necessary functions
  }),
  useOptionalUser: () => null, // Simulates a logged out state
  // Mock other necessary functions or exports from auth module
}));

describe("Navbar", () => {
    
  test("navbar renders & shows logged out state components", () => {
    const router = createMemoryRouter([
        {
            path: "/",
            element: <Layout />,
        },
    ], {
        initialEntries: ["/"], // Direct the router to start at the sign-in page
    });

    render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );


    expect(screen.getByText("Log in")).toBeVisible();
    expect(screen.getByText("Sign up")).toBeVisible();

    
  });
});
