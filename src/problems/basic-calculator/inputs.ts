import { ProblemInput } from '@/engine/types';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: s = "(1+(4+5+2)-3)+(6+8)"',
    args: ['(1+(4+5+2)-3)+(6+8)'],
    expected: 23,
  },
  {
    name: 'Example 2: s = "(1 + 2) - (3 - 4)"',
    args: ['(1 + 2) - (3 - 4)'],
    expected: 4,
  },
  {
    name: 'Example 3: s = " 2-1 + 2 "',
    args: [' 2-1 + 2 '],
    expected: 3,
  },
  {
    name: 'Example 4: s = "1 + 1"',
    args: ['1 + 1'],
    expected: 2,
  },
];
