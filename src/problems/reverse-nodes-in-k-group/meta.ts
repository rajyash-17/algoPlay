import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'reverse-nodes-in-k-group',
  title: 'Reverse Nodes in k-Group',
  number: 25,
  difficulty: 'Hard',
  pattern: 'Linked List k-Group Reversal',
  category: 'Linked List',
  description: 'Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.',
  constraints: [
    'The number of nodes in the list is n.',
    '1 <= k <= n <= 5000',
    '0 <= Node.val <= 1000',
  ],
};
