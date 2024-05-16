import { describe, it, expect } from 'vitest';
import { CreateAccountInput, SignInInput } from '~/lib/schema';

describe('CreateAccountInput Validation', () => {
  it('validates correct input', () => {
    const result = CreateAccountInput.safeParse({
      email: 'test@example.com',
      username: 'username',
      password: 'securePassword123'
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = CreateAccountInput.safeParse({
      email: 'test',
      username: 'username',
      password: 'securePassword123'
    });
    expect(result.success).toBe(false);
  });

  it('rejects short username', () => {
    const result = CreateAccountInput.safeParse({
      email: 'test@example.com',
      username: 'us',
      password: 'securePassword123'
    });
    expect(result.success).toBe(false);
  });

  it('rejects short password', () => {
    const result = CreateAccountInput.safeParse({
      email: 'test@example.com',
      username: 'username',
      password: 'short'
    });
    expect(result.success).toBe(false);
  });
});

describe('SignInInput Validation', () => {
  it('validates correct input', () => {
    const result = SignInInput.safeParse({
      email: 'test@example.com',
      password: 'securePassword123'
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = SignInInput.safeParse({
      email: 'test',
      password: 'securePassword123'
    });
    expect(result.success).toBe(false);
  });

  it('rejects short password', () => {
    const result = SignInInput.safeParse({
      email: 'test@example.com',
      password: 'short'
    });
    expect(result.success).toBe(false);
  });
});
