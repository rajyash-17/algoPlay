import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'partition-list',
  title: 'Partition List',
  number: 86,
  difficulty: 'Medium',
  pattern: 'Two Lists / Linked List',
  category: 'Linked List',
  description: 'Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x, preserving original relative order.',
  constraints: [
    'The number of nodes in the list is in the range [0, 200].',
    '-100 <= Node.val <= 100',
    '-200 <= x <= 200',
  ],
};
