import { ProblemInput } from '@/engine/types';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: nums = [2, 7, 11, 15], target = 9',
    args: [[2, 7, 11, 15], 9],
    expected: [0, 1],
  },
  {
    name: 'Example 2: nums = [3, 2, 4], target = 6',
    args: [[3, 2, 4], 6],
    expected: [1, 2],
  },
  {
    name: 'Example 3: nums = [3, 3], target = 6',
    args: [[3, 3], 6],
    expected: [0, 1],
  },
];
