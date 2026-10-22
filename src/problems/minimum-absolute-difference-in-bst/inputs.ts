import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: root = [4, 2, 6, 1, 3]',
    args: [treeFromLevelOrder([4, 2, 6, 1, 3])],
    expected: 1,
  },
  {
    name: 'Example 2: root = [1, 0, 48, null, null, 12, 49]',
    args: [treeFromLevelOrder([1, 0, 48, null, null, 12, 49])],
    expected: 1,
  },
];
