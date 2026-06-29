import { describe, it, expect } from 'vitest';
import { classNames } from '@/common/utils/classNames';

describe('classNames', () => {
  it('joins truthy class names', () => {
    expect(classNames('a', 'b')).toBe('a b');
  });

  it('ignores falsy values', () => {
    expect(classNames('a', false, null, undefined, 'b')).toBe('a b');
  });

  it('merges conflicting tailwind classes (last wins)', () => {
    expect(classNames('px-2', 'px-4')).toBe('px-4');
  });
});
