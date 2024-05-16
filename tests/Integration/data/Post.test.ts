import { describe, it, expect, vi } from 'vitest';
import { Post } from '~/data/post'; // Adjust the import path as necessary
import { Repository } from '~/data/common/repository';
import { useSubscription } from '~/data/common/use-subscription';

// Mock the nanoid and repository
vi.mock('nanoid', () => ({
  nanoid: vi.fn(() => 'unique_id')
}));

vi.mock('~/data/common/repository', () => ({
  Repository: vi.fn().mockImplementation(() => ({
    list: vi.fn(),
    subscribe: vi.fn()
  }))
}));

vi.mock('~/data/common/use-subscription', () => ({
  useSubscription: vi.fn((config) => ({
    data: config.getInitialData(),
    subscribe: config.getSubscription
  }))
}));

describe('Post Schema Validation', () => {
  it('creates a valid post with defaults', () => {
    const result = Post.parse({
      user: {
        id: 'user1',
        username: 'john_doe',
        imageUrl: null
      },
      imageUrl: 'http://example.com/image.jpg'
    });

    expect(result).toEqual({
      id: 'unique_id',
      user: {
        id: 'user1',
        username: 'john_doe',
        imageUrl: null
      },
      imageUrl: 'http://example.com/image.jpg',
      createdAt: expect.any(Number)
    });
  });

  it('fails validation with invalid data', () => {
    expect(() => Post.parse({
      user: {
        id: 'user1',
        username: 'john_doe',
        imageUrl: 'not_a_url'
      },
      imageUrl: 'also_not_a_url'
    })).toThrow();
  });
});


