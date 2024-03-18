import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SignInPage from '../routes/auth.sign-in';
// Mock the useAuth hook
jest.mock("../lib/auth", () => ({
  useAuth: () => ({
    signIn: jest.fn().mockResolvedValue(true), // Simulate a successful sign-in
  }),
}));

describe('SignInPage', () => {
  test('allows users to sign in', async () => {
    render(<SignInPage />);

    // Simulate user typing in the email and password
    userEvent.type(screen.getByPlaceholderText(/email/i), 'test@example.com');
    userEvent.type(screen.getByPlaceholderText(/password/i), 'password');

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Optionally, verify that the button shows "Signing in..." while loading
    expect(screen.getByRole('button', { name: /signing in\.\.\./i })).toBeDisabled();

    // Wait for any async actions to complete
    await waitFor(() => 
      expect(screen.queryByRole('button', { name: /signing in\.\.\./i })).not.toBeInTheDocument()
    );
  });

  // Add more tests as needed for error handling, form validation, etc.
});
