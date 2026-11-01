import { ProblemMeta } from '@/engine/types';

export const meta: ProblemMeta = {
  slug: 'n-queens',
  title: 'N-Queens',
  number: 51,
  difficulty: 'Hard',
  pattern: 'Backtracking',
  category: 'Backtracking',
  description:
    'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle in any order. Each solution contains a distinct board configuration of the n-queens placement, where "Q" and "." both indicate a queen and an empty space, respectively.',
  constraints: [
    '1 <= n <= 9',
    'No two queens share the same row, column, or diagonal.',
  ],
};
