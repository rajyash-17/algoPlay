import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: root = [7, 3, 15, null, null, 9, 20]',
    args: [treeFromLevelOrder([7, 3, 15, null, null, 9, 20])],
    expected: [3, 7, 9, 15, 20],
  },
  {
    name: 'Example 2: root = [2, 1, 3]',
    args: [treeFromLevelOrder([2, 1, 3])],
    expected: [1, 2, 3],
  },
];
