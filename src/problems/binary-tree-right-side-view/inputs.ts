import { ProblemInput } from '@/engine/types';
import { treeFromLevelOrder } from '@/lib/builders';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: root = [1, 2, 3, null, 5, null, 4]',
    args: [treeFromLevelOrder([1, 2, 3, null, 5, null, 4])],
    expected: [1, 3, 4],
  },
  {
    name: 'Example 2: root = [1, null, 3]',
    args: [treeFromLevelOrder([1, null, 3])],
    expected: [1, 3],
  },
  {
    name: 'Example 3: root = []',
    args: [null],
    expected: [],
  },
];
