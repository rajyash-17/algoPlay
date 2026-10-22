import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'construct-binary-tree-from-preorder-and-inorder-traversal',
  title: 'Construct Binary Tree from Preorder and Inorder Traversal',
  number: 105,
  difficulty: 'Medium',
  pattern: 'Tree Construction & Hash Map',
  category: 'Binary Tree',
  description: 'Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.',
  constraints: [
    '1 <= preorder.length <= 3000',
    'inorder.length == preorder.length',
    '-3000 <= preorder[i], inorder[i] <= 3000',
    'preorder and inorder consist of unique values.',
    'Each value of inorder also appears in preorder.',
    'preorder is guaranteed to be the preorder traversal of the tree.',
    'inorder is guaranteed to be the inorder traversal of the tree.',
  ],
};
