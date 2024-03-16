import React from 'react';
import { render, fireEvent, getByRole } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostCard from '../../src/components/PostCard';


describe('PostCard Component', () => {
    // Test for Expected Behavior
    it('renders post card with provided post data', () => {
      // Sample post data
      const post = {
        id: 1,
        username: 'testUser',
        petProfilePhoto: 'testProfilePhoto.jpg',
        petImage: 'testPetImage.jpg',
        likeCount: 10,
        commentCount: 5,
      };
  
      const { getByAltText, getByText } = render(<PostCard post={post} />);
      
      // Assert that all expected elements are rendered
      expect(getByAltText('Pet Profile')).toBeInTheDocument();
      expect(getByText('testUser')).toBeInTheDocument();
      expect(getByAltText('Pet')).toBeInTheDocument();
      expect(getByText('10')).toBeInTheDocument(); // Like count
      expect(getByText('5')).toBeInTheDocument(); // Comment count
    });
  
    // Test for Handling Invalid Input
    it('handles invalid post data gracefully', () => {
      // Invalid post data (missing required fields)
      const post = {
        id: 1, // Missing username, petProfilePhoto, petImage, likeCount, and commentCount
      };

      // Assert that the component throws an error when rendered with invalid post data
        expect(() => {
        render(<PostCard post={post as any} />);
        }).toThrow('Invalid post data: Essential fields are missing.');
  });
});