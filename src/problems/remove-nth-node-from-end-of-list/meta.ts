import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'remove-nth-node-from-end-of-list',
  title: 'Remove Nth Node From End of List',
  number: 19,
  difficulty: 'Medium',
  pattern: 'Fast and Slow Pointers',
  category: 'Linked List',
  description: 'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
  constraints: [
    'The number of nodes in the list is sz.',
    '1 <= sz <= 30',
    '0 <= Node.val <= 100',
    '1 <= n <= sz',
  ],
};
