import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], targetSum = 22',
    args: [treeFromLevelOrder([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]), 22],
    expected: true,
  },
  {
    name: 'Example 2: root = [1, 2, 3], targetSum = 5',
    args: [treeFromLevelOrder([1, 2, 3]), 5],
    expected: false,
  },
];
