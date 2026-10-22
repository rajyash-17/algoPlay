import { ProblemInput } from '@/engine/types';
import { listFromArray } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: head = [1, 2, 3, 4, 5], k = 2',
    args: [listFromArray([1, 2, 3, 4, 5]), 2],
  },
  {
    name: 'Example 2: head = [0, 1, 2], k = 4',
    args: [listFromArray([0, 1, 2]), 4],
  },
];
