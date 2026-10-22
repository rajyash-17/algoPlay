import { ProblemInput } from '@/engine/types';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()',
    args: [
      ['push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'],
      [-2, 0, -3, null, null, null, null],
    ],
    expected: [null, null, null, -3, null, 0, -2],
  },
  {
    name: 'Example 2: push(5), push(3), getMin(), pop()',
    args: [
      ['push', 'push', 'getMin', 'pop'],
      [5, 3, null, null],
    ],
    expected: [null, null, 3, null],
  },
];
