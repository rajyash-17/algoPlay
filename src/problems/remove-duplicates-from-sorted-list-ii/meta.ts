import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'remove-duplicates-from-sorted-list-ii',
  title: 'Remove Duplicates from Sorted List II',
  number: 82,
  difficulty: 'Medium',
  pattern: 'Sentinel Node / Two Pointers',
  category: 'Linked List',
  description: 'Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.',
  constraints: [
    'The number of nodes in the list is in the range [0, 300].',
    '-100 <= Node.val <= 100',
    'The list is guaranteed to be sorted in ascending order.',
  ],
};
