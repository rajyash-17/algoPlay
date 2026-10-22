import { ProblemInput } from '@/engine/types';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: path = "/home/"',
    args: ['/home/'],
    expected: '/home',
  },
  {
    name: 'Example 2: path = "/home//foo/"',
    args: ['/home//foo/'],
    expected: '/home/foo',
  },
  {
    name: 'Example 3: path = "/home/user/Documents/../Pictures"',
    args: ['/home/user/Documents/../Pictures'],
    expected: '/home/user/Pictures',
  },
];
