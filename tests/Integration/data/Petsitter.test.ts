import { describe, it, expect, vi } from 'vitest';
import { Petsitter } from '~/data/petsitter';
import { Repository } from '~/data/common/repository';
import { nanoid } from 'nanoid';

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
    const petsitterData = Petsitter.parse({
        id: nanoid(),
        username: "tester",
        name: "ITest",
        email: "testing@gmail.com",
        location: "somewhere",
        hourlyRate: 0,
        yearExperience: 0,
        petExperience: 0,
    });

    expect(petsitterData.id).toBe('unique_id');
    expect(petsitterData.petExperience).toBeGreaterThanOrEqual(0);
    expect((petsitterData.name).length).toBeGreaterThanOrEqual(3);
  });
});