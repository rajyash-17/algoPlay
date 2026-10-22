import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'min-stack',
  title: 'Min Stack',
  number: 155,
  difficulty: 'Medium',
  pattern: 'Stack',
  category: 'Stack',
  description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
  constraints: [
    '-2^31 <= val <= 2^31 - 1',
    'Methods pop, top and getMin operations will always be called on non-empty stacks.',
  ],
};
