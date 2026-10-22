import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'flatten-binary-tree-to-linked-list',
  title: 'Flatten Binary Tree to Linked List',
  number: 114,
  difficulty: 'Medium',
  pattern: 'Tree Morris Traversal / In-Place Rewiring',
  category: 'Binary Tree',
  description: 'Given the root of a binary tree, flatten the tree into a linked list in-place where the right child points to the next node and the left child is always null.',
  constraints: [
    'The number of nodes in the tree is in the range [0, 2000].',
    '-100 <= Node.val <= 100',
  ],
};
