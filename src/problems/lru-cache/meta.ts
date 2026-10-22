import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'lru-cache',
  title: 'LRU Cache',
  number: 146,
  difficulty: 'Medium',
  pattern: 'Doubly Linked List & Hash Map',
  category: 'Linked List',
  description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) average time complexity for get and put.',
  constraints: [
    '1 <= capacity <= 3000',
    '0 <= key <= 10^4',
    '0 <= value <= 10^5',
    'At most 2 * 10^5 calls will be made to get and put.',
  ],
};
