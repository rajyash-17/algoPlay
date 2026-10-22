import { ProblemInput } from '@/engine/types';
import { listFromArray } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: head = [1, 2, 3, 4, 5], n = 2',
    args: [listFromArray([1, 2, 3, 4, 5]), 2],
  },
  {
    name: 'Example 2: head = [1], n = 1',
    args: [listFromArray([1]), 1],
  },
  {
    name: 'Example 3: head = [1, 2], n = 1',
    args: [listFromArray([1, 2]), 1],
  },
];
