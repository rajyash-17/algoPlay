import { ProblemInput } from '@/engine/types';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: numbers = [2, 7, 11, 15], target = 9',
    args: [[2, 7, 11, 15], 9],
    expected: [1, 2],
  },
  {
    name: 'Example 2: numbers = [2, 3, 4], target = 6',
    args: [[2, 3, 4], 6],
    expected: [1, 3],
  },
  {
    name: 'Example 3: numbers = [-1, 0], target = -1',
    args: [[-1, 0], -1],
    expected: [1, 2],
  },
];
