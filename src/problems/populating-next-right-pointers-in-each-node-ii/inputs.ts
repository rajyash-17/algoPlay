import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: root = [1, 2, 3, 4, 5, null, 7]',
    args: [treeFromLevelOrder([1, 2, 3, 4, 5, null, 7])],
  },
  {
    name: 'Example 2: root = []',
    args: [null],
  },
];
