import { ProblemInput } from '@/engine/types';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: ["2","1","+","3","*"]',
    args: [['2', '1', '+', '3', '*']],
    expected: 9,
  },
  {
    name: 'Example 2: ["4","13","5","/","+"]',
    args: [['4', '13', '5', '/', '+']],
    expected: 6,
  },
  {
    name: 'Example 3: ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]',
    args: [['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']],
    expected: 22,
  },
];
