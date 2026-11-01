import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'n-queens-ii',
  title: 'N-Queens II',
  number: 52,
  difficulty: 'Hard',
  pattern: 'Backtracking',
  category: 'Backtracking',
  description:
    'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return the number of distinct solutions to the n-queens puzzle.',
  constraints: [
    '1 <= n <= 9',
    'No two queens share the same row, column, or diagonal.',
  ],
};
