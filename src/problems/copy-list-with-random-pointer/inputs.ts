import { ProblemInput } from '@/engine/types';
import { ListNode } from '@/lib/builders';

// Helper to construct list with random pointers for test cases
function createRandomList(): ListNode {
  const n0: ListNode = { val: 7, next: null, random: null };
  const n1: ListNode = { val: 13, next: null, random: null };
  const n2: ListNode = { val: 11, next: null, random: null };
  const n3: ListNode = { val: 10, next: null, random: null };
  const n4: ListNode = { val: 1, next: null, random: null };

  n0.next = n1;
  n1.next = n2;
  n2.next = n3;
  n3.next = n4;

  n1.random = n0;
  n2.random = n4;
  n3.random = n2;
  n4.random = n0;

  return n0;
}

export const inputs: ProblemInput[] = [
  {
    name: 'Example 1: [[7,null],[13,0],[11,4],[10,2],[1,0]]',
    args: [createRandomList()],
  },
  {
    name: 'Example 2: empty list',
    args: [null],
  },
];
