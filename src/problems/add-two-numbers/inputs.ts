import { ProblemInput } from '@/engine/types';
import { listFromArray } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: [2, 4, 3] + [5, 6, 4] = [7, 0, 8] (342 + 465 = 807)',
    args: [listFromArray([2, 4, 3]), listFromArray([5, 6, 4])],
  },
  {
    name: 'Example 2: [0] + [0] = [0]',
    args: [listFromArray([0]), listFromArray([0])],
  },
  {
    name: 'Example 3: [9,9,9,9] + [9,9] = [8,9,0,0,1]',
    args: [listFromArray([9, 9, 9, 9]), listFromArray([9, 9])],
  },
];
