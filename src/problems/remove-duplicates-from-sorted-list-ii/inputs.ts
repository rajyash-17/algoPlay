import { ProblemInput } from '@/engine/types';
import { listFromArray } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: head = [1, 2, 3, 3, 4, 4, 5]',
    args: [listFromArray([1, 2, 3, 3, 4, 4, 5])],
  },
  {
    name: 'Example 2: head = [1, 1, 1, 2, 3]',
    args: [listFromArray([1, 1, 1, 2, 3])],
  },
];
