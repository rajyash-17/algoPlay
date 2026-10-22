import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'maximum-depth-of-binary-tree',
  title: 'Maximum Depth of Binary Tree',
  number: 104,
  difficulty: 'Easy',
  pattern: 'Tree DFS / Recursion',
  category: 'Binary Tree',
  description: 'Given the root of a binary tree, return its maximum depth: the number of nodes along the longest path from root to farthest leaf.',
  constraints: [
    'The number of nodes in the tree is in the range [0, 10^4].',
    '-100 <= Node.val <= 100',
  ],
};
