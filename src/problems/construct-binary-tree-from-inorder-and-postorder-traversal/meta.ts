import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'construct-binary-tree-from-inorder-and-postorder-traversal',
  title: 'Construct Binary Tree from Inorder and Postorder Traversal',
  number: 106,
  difficulty: 'Medium',
  pattern: 'Tree Construction & Hash Map',
  category: 'Binary Tree',
  description: 'Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.',
  constraints: [
    '1 <= inorder.length <= 3000',
    'postorder.length == inorder.length',
    '-3000 <= inorder[i], postorder[i] <= 3000',
    'inorder and postorder consist of unique values.',
    'Each value of postorder also appears in inorder.',
    'inorder is guaranteed to be the inorder traversal of the tree.',
    'postorder is guaranteed to be the postorder traversal of the tree.',
  ],
};
