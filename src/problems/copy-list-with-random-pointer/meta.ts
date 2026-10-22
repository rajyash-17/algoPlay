import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'copy-list-with-random-pointer',
  title: 'Copy List with Random Pointer',
  number: 138,
  difficulty: 'Medium',
  pattern: 'Hash Map / Linked List',
  category: 'Linked List',
  description: 'Construct a deep copy of a linked list where each node contains an additional random pointer which could point to any node in the list or null.',
  constraints: [
    '0 <= n <= 1000',
    '-10^4 <= Node.val <= 10^4',
    'Node.random is null or is pointing to some node in the linked list.',
  ],
};
