import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: p = [1, 2, 3], q = [1, 2, 3]',
    args: [treeFromLevelOrder([1, 2, 3]), treeFromLevelOrder([1, 2, 3])],
    expected: true,
  },
  {
    name: 'Example 2: p = [1, 2], q = [1, null, 2]',
    args: [treeFromLevelOrder([1, 2]), treeFromLevelOrder([1, null, 2])],
    expected: false,
  },
];
