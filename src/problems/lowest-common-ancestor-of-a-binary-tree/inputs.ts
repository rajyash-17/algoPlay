import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 1',
    args: [treeFromLevelOrder([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]), 5, 1],
    expected: 3,
  },
  {
    name: 'Example 2: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 4',
    args: [treeFromLevelOrder([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]), 5, 4],
    expected: 5,
  },
];
