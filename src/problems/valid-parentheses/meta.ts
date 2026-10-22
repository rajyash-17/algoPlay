import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'valid-parentheses',
  title: 'Valid Parentheses',
  number: 20,
  difficulty: 'Easy',
  pattern: 'Stack',
  category: 'Stack',
  description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
  constraints: [
    '1 <= s.length <= 10^4',
    's consists of parentheses only "()[]{}"',
  ],
};
