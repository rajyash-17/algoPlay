import { ProblemInput } from '@/engine/types';

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: path = "/home/user/Documents/../Pictures"',
    args: ['/home/user/Documents/../Pictures'],
    expected: '/home/user/Pictures',
  },
  {
    name: 'Example 2: path = "/a/./b/../../c/"',
    args: ['/a/./b/../../c/'],
    expected: '/c',
  },
  {
    name: 'Example 3: path = "/home/"',
    args: ['/home/'],
    expected: '/home',
  },
];
