import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: root = [3, 1, 4, null, 2], k = 1',
    args: [treeFromLevelOrder([3, 1, 4, null, 2]), 1],
    expected: 1,
  },
  {
    name: 'Example 2: root = [5, 3, 6, 2, 4, null, null, 1], k = 3',
    args: [treeFromLevelOrder([5, 3, 6, 2, 4, null, null, 1]), 3],
    expected: 3,
  },
];
