import { ProblemInput } from '@/engine/types';

export const inputs: ProblemInput[] = [
  {
    name: '4x4 Chessboard (n = 4)',
    args: [4],
    expected: [
      ['.Q..', '...Q', 'Q...', '..Q.'],
      ['..Q.', 'Q...', '...Q', '.Q..'],
    ],
  },
  {
    name: '1x1 Chessboard (n = 1)',
    args: [1],
    expected: [['Q']],
  },
  {
    name: '5x5 Chessboard (n = 5)',
    args: [5],
  },
];
