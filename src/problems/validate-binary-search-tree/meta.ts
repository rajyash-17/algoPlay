import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'validate-binary-search-tree',
  title: 'Validate Binary Search Tree',
  number: 98,
  difficulty: 'Medium',
  pattern: 'BST Range Validation',
  category: 'Binary Search Tree',
  description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
  constraints: [
    'The number of nodes in the tree is in the range [1, 10^4].',
    '-2^31 <= Node.val <= 2^31 - 1',
  ],
};
