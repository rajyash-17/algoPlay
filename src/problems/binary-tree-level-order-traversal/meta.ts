import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'binary-tree-level-order-traversal',
  title: 'Binary Tree Level Order Traversal',
  number: 102,
  difficulty: 'Medium',
  pattern: 'Binary Tree BFS / Queue Traversal',
  category: 'Binary Tree BFS',
  description: 'Given the root of a binary tree, return the level order traversal of its nodes values (i.e., from left to right, level by level).',
  constraints: [
    'The number of nodes in the tree is in the range [0, 2000].',
    '-1000 <= Node.val <= 1000',
  ],
};
