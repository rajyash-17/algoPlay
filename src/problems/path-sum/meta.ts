import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'path-sum',
  title: 'Path Sum',
  number: 112,
  difficulty: 'Easy',
  pattern: 'Tree DFS / Backtracking',
  category: 'Binary Tree',
  description: 'Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.',
  constraints: [
    'The number of nodes in the tree is in the range [0, 5000].',
    '-1000 <= Node.val <= 1000',
    '-1000 <= targetSum <= 1000',
  ],
};
