import { ProblemInput } from '@/engine/types';
import { listFromArray } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: head = [1, 4, 3, 2, 5, 2], x = 3',
    args: [listFromArray([1, 4, 3, 2, 5, 2]), 3],
  },
  {
    name: 'Example 2: head = [2, 1], x = 2',
    args: [listFromArray([2, 1]), 2],
  },
];
