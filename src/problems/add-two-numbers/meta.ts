import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'add-two-numbers',
  title: 'Add Two Numbers',
  number: 2,
  difficulty: 'Medium',
  pattern: 'Linked List Simulation',
  category: 'Linked List',
  description: 'You are given two non-empty linked lists representing two non-negative integers stored in reverse order. Add the two numbers and return the sum as a linked list.',
  constraints: [
    'The number of nodes in each linked list is in the range [1, 100].',
    '0 <= Node.val <= 9',
    'It is guaranteed that the list represents a number that does not have leading zeros.',
  ],
};
