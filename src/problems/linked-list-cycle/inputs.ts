import { ProblemInput } from '@/engine/types';
import { listFromArray } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: [3, 2, 0, -4] with cycle at pos = 1',
    args: [listFromArray([3, 2, 0, -4], 1)],
    expected: true,
  },
  {
    name: 'Example 2: [1, 2] with cycle at pos = 0',
    args: [listFromArray([1, 2], 0)],
    expected: true,
  },
  {
    name: 'Example 3: [1] with no cycle',
    args: [listFromArray([1], -1)],
    expected: false,
  },
];
