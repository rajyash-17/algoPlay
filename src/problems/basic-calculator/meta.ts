import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'basic-calculator',
  title: 'Basic Calculator',
  number: 224,
  difficulty: 'Hard',
  pattern: 'Stack',
  category: 'Stack',
  description: 'Given a string s representing a valid expression, implement a basic calculator to evaluate it. Handles "+", "-", and parentheses "(", ")".',
  constraints: [
    '1 <= s.length <= 3 * 10^5',
    's consists of digits, "+", "-", "(", ")", and " "',
  ],
};
