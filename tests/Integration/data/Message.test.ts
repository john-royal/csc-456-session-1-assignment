import { describe, it, expect, vi } from 'vitest';
import { Message } from '~/data/message'; // Update the import path
import { Repository } from '~/data/common/repository';

vi.mock('nanoid', () => ({
  nanoid: vi.fn(() => 'unique_id')
}));

vi.mock('./common/repository', () => {
  return {
    Repository: vi.fn().mockImplementation(() => ({
      list: vi.fn(),
      subscribe: vi.fn()
    }))
  };
});

vi.mock('./common/use-subscription', () => ({
  useSubscription: vi.fn()
}));

describe('Message Schema', () => {
  it('validates and sets defaults correctly', () => {
    const messageData = Message.parse({
      conversationId: 'conv123',
      user: {
        id: 'user123',
        username: 'johndoe'
      },
      content: 'Hello, world!'
    });

    expect(messageData.id).toBe('unique_id');
    expect(messageData.createdAt).toBeGreaterThan(0);
    expect(messageData.user.imageUrl).toBeNull();
  });

  test('listing message from the repo', async () => {
    const messageData = Message.parse({
      conversationId: 'conv123',
      user: {
        id: 'user123',
        username: 'johndoe'
      },
      content: 'Hello, world!'
    });

    const newRepoInst = new Repository("messages", messageData);
    newRepoInst.list = vi.fn().mockReturnValueOnce(messageData);
    const data = await newRepoInst.list(messageData);
    expect(data).toEqual(messageData);
  });
});