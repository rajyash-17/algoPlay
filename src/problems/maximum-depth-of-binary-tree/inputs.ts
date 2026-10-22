import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: root = [3, 9, 20, null, null, 15, 7]',
    args: [treeFromLevelOrder([3, 9, 20, null, null, 15, 7])],
    expected: 3,
  },
  {
    name: 'Example 2: root = [1, null, 2]',
    args: [treeFromLevelOrder([1, null, 2])],
    expected: 2,
  },
];
