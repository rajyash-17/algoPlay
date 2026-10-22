import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'sum-root-to-leaf-numbers',
  title: 'Sum Root to Leaf Numbers',
  number: 129,
  difficulty: 'Medium',
  pattern: 'Tree DFS / Path Traversal',
  category: 'Binary Tree',
  description: 'You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path in the tree represents a number. Return the total sum of all root-to-leaf numbers.',
  constraints: [
    'The number of nodes in the tree is in the range [1, 1000].',
    '0 <= Node.val <= 9',
    'The depth of the tree will not exceed 10.',
  ],
};
