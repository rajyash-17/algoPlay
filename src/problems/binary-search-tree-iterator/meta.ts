import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'binary-search-tree-iterator',
  title: 'Binary Search Tree Iterator',
  number: 173,
  difficulty: 'Medium',
  pattern: 'BST Controlled Inorder Traversal',
  category: 'Binary Tree',
  description: 'Implement an iterator over the in-order traversal of a binary search tree (BST) using a controlled call stack.',
  constraints: [
    'The number of nodes in the tree is in the range [1, 10^5].',
    '0 <= Node.val <= 10^6',
    'At most 10^5 calls will be made to hasNext and next.',
  ],
};
