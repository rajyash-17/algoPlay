import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'simplify-path',
  title: 'Simplify Path',
  number: 71,
  difficulty: 'Medium',
  pattern: 'Stack',
  category: 'Stack',
  description: 'Given an absolute path for a Unix-style file system, convert it to the simplified canonical path.',
  constraints: [
    '1 <= path.length <= 3000',
    'path consists of English letters, digits, period ".", slash "/" or "_"',
  ],
};
