// Contact.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from '../routes/Contact'; // Adjust the import path as needed
import { addDoc } from 'firebase/firestore';

// Mock `addDoc` from Firebase Firestore
jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(() => Promise.resolve({ id: 'abc123' })), // Simulate successful document addition
  collection: jest.fn(),
}));

describe('Contact Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('successfully sends a message and shows toast on form submission', async () => {
    render(<Contact />);

    // Fill the form fields
    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your message/i), {
      target: { value: 'Hello, this is a test message.' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // Expect `addDoc` to have been called
    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, this is a test message.',
    });

    // Wait for the toast message to be visible
    await waitFor(() => expect(screen.getByText(/Message Sent!/i)).toBeInTheDocument());

    // Optionally, check if the form is cleared after submission
    expect(screen.getByPlaceholderText(/Enter your name/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/Enter your email/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/Enter your message/i)).toHaveValue('');
  });
});
