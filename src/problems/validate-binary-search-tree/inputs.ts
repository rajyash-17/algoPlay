import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: root = [2, 1, 3]',
    args: [treeFromLevelOrder([2, 1, 3])],
    expected: true,
  },
  {
    name: 'Example 2: root = [5, 1, 4, null, null, 3, 6]',
    args: [treeFromLevelOrder([5, 1, 4, null, null, 3, 6])],
    expected: false,
  },
];
