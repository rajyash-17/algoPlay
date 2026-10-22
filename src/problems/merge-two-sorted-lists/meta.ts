import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'merge-two-sorted-lists',
  title: 'Merge Two Sorted Lists',
  number: 21,
  difficulty: 'Easy',
  pattern: 'Two Pointers / Linked List',
  category: 'Linked List',
  description: 'Merge two sorted linked lists list1 and list2 into one sorted list by splicing together the nodes of the first two lists.',
  constraints: [
    'The number of nodes in both lists is in the range [0, 50].',
    '-100 <= Node.val <= 100',
    'Both list1 and list2 are sorted in non-decreasing order.',
  ],
};
