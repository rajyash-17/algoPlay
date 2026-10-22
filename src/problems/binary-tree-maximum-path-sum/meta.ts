import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'binary-tree-maximum-path-sum',
  title: 'Binary Tree Maximum Path Sum',
  number: 124,
  difficulty: 'Hard',
  pattern: 'Tree Postorder DFS / Dynamic Programming',
  category: 'Binary Tree',
  description: 'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. Return the maximum path sum of any non-empty path.',
  constraints: [
    'The number of nodes in the tree is in the range [1, 3 * 10^4].',
    '-1000 <= Node.val <= 1000',
  ],
};
