import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'linked-list-cycle',
  title: 'Linked List Cycle',
  number: 141,
  difficulty: 'Easy',
  pattern: 'Fast and Slow Pointers',
  category: 'Linked List',
  description: 'Given head, the head of a linked list, determine if the linked list has a cycle in it using Floyd\'s Tortoise and Hare algorithm.',
  constraints: [
    'The number of nodes in the list is in the range [0, 10^4].',
    '-10^5 <= Node.val <= 10^5',
    'pos is -1 or a valid index in the linked-list.',
  ],
};
