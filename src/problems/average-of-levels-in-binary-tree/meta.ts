import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'average-of-levels-in-binary-tree',
  title: 'Average of Levels in Binary Tree',
  number: 637,
  difficulty: 'Easy',
  pattern: 'Binary Tree BFS / Level Averages',
  category: 'Binary Tree BFS',
  description: 'Given the root of a binary tree, return the average value of the nodes on each level in the form of an array.',
  constraints: [
    'The number of nodes in the tree is in the range [1, 10^4].',
    '-2^31 <= Node.val <= 2^31 - 1',
  ],
};
