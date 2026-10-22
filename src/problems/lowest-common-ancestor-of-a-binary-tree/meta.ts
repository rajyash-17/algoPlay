import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'lowest-common-ancestor-of-a-binary-tree',
  title: 'Lowest Common Ancestor of a Binary Tree',
  number: 236,
  difficulty: 'Medium',
  pattern: 'Tree Postorder / Bottom-Up Recursion',
  category: 'Binary Tree',
  description: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.',
  constraints: [
    'The number of nodes in the tree is in the range [2, 10^5].',
    '-10^9 <= Node.val <= 10^9',
    'All Node.val are unique.',
    'p != q',
    'p and q will exist in the tree.',
  ],
};
