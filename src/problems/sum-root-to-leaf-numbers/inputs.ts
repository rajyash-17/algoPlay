import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: root = [1, 2, 3]',
    args: [treeFromLevelOrder([1, 2, 3])],
    expected: 25,
  },
  {
    name: 'Example 2: root = [4, 9, 0, 5, 1]',
    args: [treeFromLevelOrder([4, 9, 0, 5, 1])],
    expected: 1026,
  },
];
