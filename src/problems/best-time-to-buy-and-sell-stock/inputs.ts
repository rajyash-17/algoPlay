import { ProblemInput } from '@/engine/types';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: prices = [7, 1, 5, 3, 6, 4]',
    args: [[7, 1, 5, 3, 6, 4]],
    expected: 5,
  },
  {
    name: 'Example 2: prices = [7, 6, 4, 3, 1]',
    args: [[7, 6, 4, 3, 1]],
    expected: 0,
  },
  {
    name: 'Example 3: prices = [2, 4, 1]',
    args: [[2, 4, 1]],
    expected: 2,
  },
];
