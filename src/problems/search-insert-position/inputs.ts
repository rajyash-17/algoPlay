import { ProblemInput } from '@/engine/types';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: nums = [1, 3, 5, 6], target = 5',
    args: [[1, 3, 5, 6], 5],
    expected: 2,
  },
  {
    name: 'Example 2: nums = [1, 3, 5, 6], target = 2',
    args: [[1, 3, 5, 6], 2],
    expected: 1,
  },
  {
    name: 'Example 3: nums = [1, 3, 5, 6], target = 7',
    args: [[1, 3, 5, 6], 7],
    expected: 4,
  },
];
