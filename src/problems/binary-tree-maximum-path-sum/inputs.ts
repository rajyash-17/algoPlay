import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: root = [1, 2, 3]',
    args: [treeFromLevelOrder([1, 2, 3])],
    expected: 6,
  },
  {
    name: 'Example 2: root = [-10, 9, 20, null, null, 15, 7]',
    args: [treeFromLevelOrder([-10, 9, 20, null, null, 15, 7])],
    expected: 42,
  },
];
