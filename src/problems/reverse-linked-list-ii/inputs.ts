import { ProblemInput } from '@/engine/types';
import { listFromArray } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: head = [1, 2, 3, 4, 5], left = 2, right = 4',
    args: [listFromArray([1, 2, 3, 4, 5]), 2, 4],
  },
  {
    name: 'Example 2: head = [5], left = 1, right = 1',
    args: [listFromArray([5]), 1, 1],
  },
];
