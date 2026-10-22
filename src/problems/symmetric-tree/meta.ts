import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'symmetric-tree',
  title: 'Symmetric Tree',
  number: 101,
  difficulty: 'Easy',
  pattern: 'Tree Mirror Recursion',
  category: 'Binary Tree',
  description: 'Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).',
  constraints: [
    'The number of nodes in the tree is in the range [1, 1000].',
    '-100 <= Node.val <= 100',
  ],
};
