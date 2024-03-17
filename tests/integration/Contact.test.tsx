import { render, fireEvent, waitFor, getByPlaceholderText } from '@testing-library/react';
import Contact from '../../src/routes/Contact';
import { db } from '../../src/lib/firebase';
import React from 'react';
import '@testing-library/jest-dom';
import { addDoc, collection } from 'firebase/firestore';

// Mock Firebase database functions
jest.mock('../../src/lib/firebase', () => ({
    db: {
      collection: jest.fn(),
    },
  }));
  
  // Mock addDoc function
  jest.mock('firebase/firestore', () => ({
    ...jest.requireActual('firebase/firestore'),
    collection: jest.fn(),
    addDoc: jest.fn().mockImplementation(() => Promise.resolve()),
  }));
  
  describe('Contact form', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('Submitting the form successfully', async () => {
        // Mock collection reference
        const userCollectionRef = {} as any;
        (collection as jest.Mock).mockReturnValue(userCollectionRef);
    
        const { getByPlaceholderText, getByText } = render(<Contact />);
    
        fireEvent.change(getByPlaceholderText('Enter your name'), { target: { value: 'John Doe' } });
        fireEvent.change(getByPlaceholderText('Enter your email'), { target: { value: 'john@example.com' } });
        fireEvent.change(getByPlaceholderText('Enter your message'), { target: { value: 'This is a test message.' } });
    
        fireEvent.click(getByText('Send Message'));
    
        // Ensure the success toast message is displayed
        await waitFor(() => expect(getByText('Message Sent!')).toBeInTheDocument());
    });
    
  
    test('Error handling when submitting the form with missing data', async () => {
        // Mock error when submitting to Firebase
        const errorMessage = 'Failed to submit message';
        (addDoc as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
        // Mock collection reference
        const userCollectionRef = {} as any;
        (collection as jest.Mock).mockReturnValue(userCollectionRef);
    
        const { getByPlaceholderText, getByText, queryByText } = render(<Contact />);
    
        // Fill in all fields with empty values
        fireEvent.change(getByPlaceholderText('Enter your name'), { target: { value: '' } });
        fireEvent.change(getByPlaceholderText('Enter your email'), { target: { value: '' } });
        fireEvent.change(getByPlaceholderText('Enter your message'), { target: { value: '' } });
    
        fireEvent.click(getByText('Send Message'));
    
        // Ensure no success toast is shown
        await waitFor(() => expect(queryByText('Message Sent!')).not.toBeInTheDocument());
    });
    
  });