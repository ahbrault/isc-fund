import { describe, it, expect } from 'vitest';
// The implementer must export `envSchema` so it can be exercised hermetically
// against constructed objects (rather than the real process.env).
import { envSchema } from '@/common/config/env';

const baseEnv = {
  NODE_ENV: 'test',
  NEXT_PUBLIC_BASE_URL: 'https://app.example.com',
  STRIPE_SECRET_KEY: 'sk_test_123',
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_test_123',
};

describe('envSchema — NEXT_PUBLIC_N8N_WEBHOOK', () => {
  it('accepts a valid webhook URL and preserves the value', () => {
    const result = envSchema.safeParse({
      ...baseEnv,
      NEXT_PUBLIC_N8N_WEBHOOK: 'https://hook.example/x',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.NEXT_PUBLIC_N8N_WEBHOOK).toBe('https://hook.example/x');
    }
  });

  it('passes when the webhook key is absent (optional, non-blocking)', () => {
    const result = envSchema.safeParse(baseEnv);
    expect(result.success).toBe(true);
  });

  it('fails when the webhook value is not a URL', () => {
    const result = envSchema.safeParse({
      ...baseEnv,
      NEXT_PUBLIC_N8N_WEBHOOK: 'not-a-url',
    });
    expect(result.success).toBe(false);
  });
});
