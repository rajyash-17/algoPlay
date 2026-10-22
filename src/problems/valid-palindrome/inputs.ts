import { ProblemInput } from '@/engine/types';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: "A man, a plan, a canal: Panama"',
    args: ['A man, a plan, a canal: Panama'],
    expected: true,
  },
  {
    name: 'Example 2: "race a car"',
    args: ['race a car'],
    expected: false,
  },
  {
    name: 'Example 3: "noon"',
    args: ['noon'],
    expected: true,
  },
];
