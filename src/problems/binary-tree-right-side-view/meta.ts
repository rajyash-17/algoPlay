import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'binary-tree-right-side-view',
  title: 'Binary Tree Right Side View',
  number: 199,
  difficulty: 'Medium',
  pattern: 'Binary Tree BFS / Level Order',
  category: 'Binary Tree BFS',
  description: 'Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.',
  constraints: [
    'The number of nodes in the tree is in the range [0, 100].',
    '-100 <= Node.val <= 100',
  ],
};
