import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'rotate-list',
  title: 'Rotate List',
  number: 61,
  difficulty: 'Medium',
  pattern: 'Circular Linked List / Modulo',
  category: 'Linked List',
  description: 'Given the head of a linked list, rotate the list to the right by k places.',
  constraints: [
    'The number of nodes in the list is in the range [0, 500].',
    '-100 <= Node.val <= 100',
    '0 <= k <= 2 * 10^9',
  ],
};
