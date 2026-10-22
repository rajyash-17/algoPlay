import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'count-complete-tree-nodes',
  title: 'Count Complete Tree Nodes',
  number: 222,
  difficulty: 'Easy',
  pattern: 'Complete Tree Binary Search',
  category: 'Binary Tree',
  description: 'Given the root of a complete binary tree, return the number of the nodes in the tree in less than O(n) time complexity.',
  constraints: [
    'The number of nodes in the tree is in the range [0, 5 * 10^4].',
    '0 <= Node.val <= 5 * 10^4',
    'The tree is guaranteed to be complete.',
  ],
};
