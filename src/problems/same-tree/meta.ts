import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'same-tree',
  title: 'Same Tree',
  number: 100,
  difficulty: 'Easy',
  pattern: 'Tree Recursion',
  category: 'Binary Tree',
  description: 'Given the roots of two binary trees p and q, write a function to check if they are the same or not.',
  constraints: [
    'The number of nodes in both trees is in the range [0, 100].',
    '-10^4 <= Node.val <= 10^4',
  ],
};
