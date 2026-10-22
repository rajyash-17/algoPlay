import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'minimum-absolute-difference-in-bst',
  title: 'Minimum Absolute Difference in BST',
  number: 530,
  difficulty: 'Easy',
  pattern: 'BST Inorder Traversal',
  category: 'Binary Search Tree',
  description: 'Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.',
  constraints: [
    'The number of nodes in the tree is in the range [2, 10^4].',
    '0 <= Node.val <= 10^5',
  ],
};
