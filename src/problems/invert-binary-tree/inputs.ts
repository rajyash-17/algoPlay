import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: root = [4, 2, 7, 1, 3, 6, 9]',
    args: [treeFromLevelOrder([4, 2, 7, 1, 3, 6, 9])],
  },
  {
    name: 'Example 2: root = [2, 1, 3]',
    args: [treeFromLevelOrder([2, 1, 3])],
  },
];
