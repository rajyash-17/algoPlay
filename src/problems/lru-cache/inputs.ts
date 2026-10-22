import { ProblemInput } from '@/engine/types';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: capacity = 2, put(1,1), put(2,2), get(1), put(3,3), get(2), put(4,4), get(1), get(3), get(4)',
    args: [
      2,
      ['put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'],
      [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
    ],
    expected: [null, null, 1, null, -1, null, -1, 3, 4],
  },
];
