import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'kth-smallest-element-in-a-bst',
  title: 'Kth Smallest Element in a BST',
  number: 230,
  difficulty: 'Medium',
  pattern: 'BST Inorder Traversal',
  category: 'Binary Search Tree',
  description: 'Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.',
  constraints: [
    'The number of nodes in the tree is n.',
    '1 <= k <= n <= 10^4',
    '0 <= Node.val <= 10^4',
  ],
};
