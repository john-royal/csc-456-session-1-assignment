import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PostItem from '~/components/post/post-item';
import { nanoid } from 'nanoid';

const useLikesMock = vi.hoisted(() => { //hoist before the mock so that we can have access to change it later on!!!
    return {
        useLikes: vi.fn(() => ({
            isLiked: false,
            likeCount: 5,
            handleLikeClick: vi.fn()
        }))
    };
});

vi.mock('~/data/like', async () => {
    const originalModule = await vi.importActual<typeof import('~/data/like')>('~/data/like');
    return{
        ...originalModule,
        useLikes: useLikesMock.useLikes
    };
});


vi.mock('./post-comments', () => ({
  default: () => <div>Mocked Post Comments</div>
}));

vi.mock('nanoid', () => ({
    nanoid: vi.fn(() => 'unique_id')
}));


describe('PostItem', () => {
  const post = {
    id: nanoid(),
    user: {
        id: "0",
        username: "tester",
        imageUrl: 'Pet Profile',
    },
    imageUrl: "",
    createdAt: Date.now(),
  };

  it('renders correctly', () => {
    render(<PostItem post={post} />);
    expect(screen.getByText(post.user.username)).toBeInTheDocument();
    expect(screen.getByAltText('Pet Profile')).toHaveAttribute('src', post.user.imageUrl);
    expect(screen.getByAltText('Pet')).toHaveAttribute('src', post.imageUrl);
    expect(screen.getByText('5')).toBeInTheDocument(); // Like count
  });

  it('clicking like works', () => {
    render(<PostItem post={post} />);
    fireEvent.click(screen.getByRole('button', { name: '5' }));

    expect(useLikesMock.useLikes).toHaveBeenCalled();
  });

  it('updates like count on prop change', () => {
    const handleLikeClick = vi.fn(() => Number((screen.getByText('5')).textContent) + 1); // mock the 
    render(<PostItem post={post} />);
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument(); // Old like count
    useLikesMock.useLikes.mockReturnValueOnce({
        isLiked: false,
        likeCount: handleLikeClick(),
        handleLikeClick
    })
    fireEvent.click(screen.getByRole('button', { name: '5' }));
    render(<PostItem post={post} />)
    expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument(); // New like count
  });
});
