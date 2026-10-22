import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: root = [1, 2, 2, 3, 4, 4, 3]',
    args: [treeFromLevelOrder([1, 2, 2, 3, 4, 4, 3])],
    expected: true,
  },
  {
    name: 'Example 2: root = [1, 2, 2, null, 3, null, 3]',
    args: [treeFromLevelOrder([1, 2, 2, null, 3, null, 3])],
    expected: false,
  },
];
