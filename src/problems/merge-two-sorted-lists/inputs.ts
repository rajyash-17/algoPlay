import { ProblemInput } from '@/engine/types';
import { listFromArray } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: list1 = [1, 2, 4], list2 = [1, 3, 4]',
    args: [listFromArray([1, 2, 4]), listFromArray([1, 3, 4])],
  },
  {
    name: 'Example 2: list1 = [], list2 = []',
    args: [null, null],
  },
  {
    name: 'Example 3: list1 = [], list2 = [0]',
    args: [null, listFromArray([0])],
  },
];
