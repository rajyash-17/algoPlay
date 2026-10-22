import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'populating-next-right-pointers-in-each-node-ii',
  title: 'Populating Next Right Pointers in Each Node II',
  number: 117,
  difficulty: 'Medium',
  pattern: 'Tree BFS / Pointer Linking',
  category: 'Binary Tree',
  description: 'Given a binary tree, populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.',
  constraints: [
    'The number of nodes in the tree is in the range [0, 6000].',
    '-100 <= Node.val <= 100',
  ],
};
