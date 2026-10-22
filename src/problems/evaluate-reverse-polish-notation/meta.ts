import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'evaluate-reverse-polish-notation',
  title: 'Evaluate Reverse Polish Notation',
  number: 150,
  difficulty: 'Medium',
  pattern: 'Stack',
  category: 'Stack',
  description: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, and /.',
  constraints: [
    '1 <= tokens.length <= 10^4',
    'tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200]',
  ],
};
