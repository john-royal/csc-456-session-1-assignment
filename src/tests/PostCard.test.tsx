import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostCard from '../components/PostCard'; // Adjust if your project structure differs

const mockPost = {
  id: 1,
  username: 'testuser',
  petProfilePhoto: 'https://example.com/photo.jpg',
  petImage: 'https://example.com/pet.jpg',
  likeCount: 5,
  commentCount: 2,
};

describe('PostCard Component', () => {
  test('renders PostCard correctly with given post data', () => {
    render(<PostCard post={mockPost} />);
    // Checks if the username is rendered
    expect(screen.getByText(mockPost.username)).toBeInTheDocument();
    // Checks if the pet image is rendered
    expect(screen.getByAltText('Pet')).toHaveAttribute('src', mockPost.petImage);
    // Checks if the like and comment counts are correctly displayed
    expect(screen.getByText(mockPost.likeCount.toString())).toBeInTheDocument();
    expect(screen.getByText(mockPost.commentCount.toString())).toBeInTheDocument();
  });

  test('increases like count when like button is clicked', () => {
    render(<PostCard post={mockPost} />);
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);
    // Assuming your component updates the like count immediately
    // You might need to adjust this based on how your state update is implemented
    expect(likeButton).toHaveTextContent((mockPost.likeCount + 1).toString());
  });

});