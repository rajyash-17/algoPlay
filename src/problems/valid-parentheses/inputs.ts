import { ProblemInput } from '@/engine/types';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: s = "()"',
    args: ['()'],
    expected: true,
  },
  {
    name: 'Example 2: s = "()[]{}"',
    args: ['()[]{}'],
    expected: true,
  },
  {
    name: 'Example 3: s = "(]"',
    args: ['(]'],
    expected: false,
  },
];
