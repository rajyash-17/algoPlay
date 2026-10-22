import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'binary-tree-zigzag-level-order-traversal',
  title: 'Binary Tree Zigzag Level Order Traversal',
  number: 103,
  difficulty: 'Medium',
  pattern: 'Binary Tree BFS / Alternating Direction',
  category: 'Binary Tree BFS',
  description: 'Given the root of a binary tree, return the zigzag level order traversal of its nodes values (i.e., alternating left to right and right to left).',
  constraints: [
    'The number of nodes in the tree is in the range [0, 2000].',
    '-1000 <= Node.val <= 1000',
  ],
};
