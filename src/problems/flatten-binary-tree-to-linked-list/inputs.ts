import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: root = [1, 2, 5, 3, 4, null, 6]',
    args: [treeFromLevelOrder([1, 2, 5, 3, 4, null, 6])],
  },
  {
    name: 'Example 2: root = []',
    args: [null],
  },
];
