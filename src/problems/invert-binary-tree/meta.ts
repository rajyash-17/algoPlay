import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'invert-binary-tree',
  title: 'Invert Binary Tree',
  number: 226,
  difficulty: 'Easy',
  pattern: 'Tree Recursion / Swap',
  category: 'Binary Tree',
  description: 'Given the root of a binary tree, invert the tree (swap every left and right child), and return its root.',
  constraints: [
    'The number of nodes in the tree is in the range [0, 100].',
    '-100 <= Node.val <= 100',
  ],
};
