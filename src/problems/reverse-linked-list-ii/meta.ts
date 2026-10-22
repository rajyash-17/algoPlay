import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'reverse-linked-list-ii',
  title: 'Reverse Linked List II',
  number: 92,
  difficulty: 'Medium',
  pattern: 'Linked List Reversal',
  category: 'Linked List',
  description: 'Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right.',
  constraints: [
    'The number of nodes in the list is n.',
    '1 <= n <= 500',
    '-500 <= Node.val <= 500',
    '1 <= left <= right <= n',
  ],
};
