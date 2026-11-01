import { SupportedLanguage, LanguageImplementation } from './multiLanguage';

export const N_QUEENS_MULTI_LANG_SOLUTIONS: Record<string, Record<SupportedLanguage, LanguageImplementation>> = {
  'n-queens': {
    JavaScript: {
      code: `function solveNQueens(n) {
  const board = [];
  for (let i = 0; i < n; i++) {
    board.push(new Array(n).fill('.'));
  }

  const solutions = [];
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();

  function backtrack(row) {
    if (row === n) {
      const solution = [];
      for (let i = 0; i < n; i++) {
        solution.push(board[i].join(''));
      }
      solutions.push(solution);
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;

      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
        continue;
      }

      board[row][col] = 'Q';
      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);

      backtrack(row + 1);

      board[row][col] = '.';
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return solutions;
}`,
      lineMap: {
        1: 1, 2: 2, 3: 3, 4: 4, 5: 5,
        7: 7, 8: 8, 9: 9, 10: 10,
        12: 12, 13: 13, 14: 14, 15: 14, 16: 15, 17: 16, 18: 17, 19: 18, 20: 19, 21: 20,
        23: 22, 24: 23, 25: 24, 27: 26, 28: 27,
        31: 30, 32: 30, 33: 31, 34: 32, 35: 33, 37: 35,
        39: 37, 40: 37, 41: 38, 42: 39, 43: 40, 44: 41, 45: 42,
        47: 44, 48: 45, 49: 46,
      },
    },
    TypeScript: {
      code: `function solveNQueens(n: number): string[][] {
  const board: string[][] = [];
  for (let i = 0; i < n; i++) {
    board.push(new Array(n).fill('.'));
  }

  const solutions: string[][] = [];
  const cols = new Set<number>();
  const diag1 = new Set<number>();
  const diag2 = new Set<number>();

  function backtrack(row: number): void {
    if (row === n) {
      const solution: string[] = [];
      for (let i = 0; i < n; i++) {
        solution.push(board[i]!.join(''));
      }
      solutions.push(solution);
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;

      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
        continue;
      }

      board[row]![col] = 'Q';
      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);

      backtrack(row + 1);

      board[row]![col] = '.';
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return solutions;
}`,
      lineMap: {
        1: 1, 2: 2, 3: 3, 4: 4, 5: 5,
        7: 7, 8: 8, 9: 9, 10: 10,
        12: 12, 13: 13, 14: 14, 15: 14, 16: 15, 17: 16, 18: 17, 19: 18, 20: 19, 21: 20,
        23: 22, 24: 23, 25: 24, 27: 26, 28: 27,
        31: 30, 32: 30, 33: 31, 34: 32, 35: 33, 37: 35,
        39: 37, 40: 37, 41: 38, 42: 39, 43: 40, 44: 41, 45: 42,
        47: 44, 48: 45, 49: 46,
      },
    },
    Python: {
      code: `def solveNQueens(n: int) -> list[list[str]]:
    board = [['.'] * n for _ in range(n)]
    solutions = []
    cols = set()
    diag1 = set()
    diag2 = set()

    def backtrack(row: int) -> None:
        if row == n:
            solutions.append(["".join(r) for r in board])
            return

        for col in range(n):
            d1 = row - col
            d2 = row + col

            if col in cols or d1 in diag1 or d2 in diag2:
                continue

            board[row][col] = 'Q'
            cols.add(col)
            diag1.add(d1)
            diag2.add(d2)

            backtrack(row + 1)

            board[row][col] = '.'
            cols.remove(col)
            diag1.remove(d1)
            diag2.remove(d2)

    backtrack(0)
    return solutions`,
      lineMap: {
        1: 1, 2: 2, 3: 2, 4: 2, 5: 2,
        7: 3, 8: 4, 9: 5, 10: 6,
        12: 8, 13: 9, 14: 10, 15: 10, 16: 10, 17: 10, 18: 10, 19: 10, 20: 11, 21: 11,
        23: 13, 24: 14, 25: 15, 27: 17, 28: 18,
        31: 20, 32: 20, 33: 21, 34: 22, 35: 23, 37: 25,
        39: 27, 40: 27, 41: 28, 42: 29, 43: 30, 44: 30, 45: 30,
        47: 32, 48: 33, 49: 33,
      },
    },
    Java: {
      code: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(board[i], '.');
        }

        List<List<String>> solutions = new ArrayList<>();
        Set<Integer> cols = new HashSet<>();
        Set<Integer> diag1 = new HashSet<>();
        Set<Integer> diag2 = new HashSet<>();

        backtrack(0, n, board, cols, diag1, diag2, solutions);
        return solutions;
    }

    private void backtrack(int row, int n, char[][] board, Set<Integer> cols,
                           Set<Integer> diag1, Set<Integer> diag2, List<List<String>> solutions) {
        if (row == n) {
            List<String> solution = new ArrayList<>();
            for (char[] r : board) {
                solution.add(new String(r));
            }
            solutions.add(solution);
            return;
        }

        for (int col = 0; col < n; col++) {
            int d1 = row - col;
            int d2 = row + col;

            if (cols.contains(col) || diag1.contains(d1) || diag2.contains(d2)) {
                continue;
            }

            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(d1);
            diag2.add(d2);

            backtrack(row + 1, n, board, cols, diag1, diag2, solutions);

            board[row][col] = '.';
            cols.remove(col);
            diag1.remove(d1);
            diag2.remove(d2);
        }
    }
}`,
      lineMap: {
        1: 2, 2: 3, 3: 4, 4: 5, 5: 5,
        7: 8, 8: 9, 9: 10, 10: 11,
        12: 17, 13: 19, 14: 20, 15: 20, 16: 21, 17: 22, 18: 23, 19: 24, 20: 25, 21: 26,
        23: 28, 24: 29, 25: 30, 27: 32, 28: 33,
        31: 36, 32: 36, 33: 37, 34: 38, 35: 39, 37: 41,
        39: 43, 40: 43, 41: 44, 42: 45, 43: 46, 44: 47, 45: 48,
        47: 13, 48: 14, 49: 15,
      },
    },
    'C++': {
      code: `class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<string> board(n, string(n, '.'));
        vector<vector<string>> solutions;
        unordered_set<int> cols, diag1, diag2;

        auto backtrack = [&](auto& self, int row) -> void {
            if (row == n) {
                solutions.push_back(board);
                return;
            }

            for (int col = 0; col < n; col++) {
                int d1 = row - col;
                int d2 = row + col;

                if (cols.count(col) || diag1.count(d1) || diag2.count(d2)) {
                    continue;
                }

                board[row][col] = 'Q';
                cols.insert(col);
                diag1.insert(d1);
                diag2.insert(d2);

                self(self, row + 1);

                board[row][col] = '.';
                cols.erase(col);
                diag1.erase(d1);
                diag2.erase(d2);
            }
        };

        backtrack(backtrack, 0);
        return solutions;
    }
};`,
      lineMap: {
        1: 3, 2: 4, 3: 4, 4: 4, 5: 4,
        7: 5, 8: 6, 9: 6, 10: 6,
        12: 8, 13: 9, 14: 10, 15: 10, 16: 10, 17: 10, 18: 10, 19: 10, 20: 11, 21: 12,
        23: 14, 24: 15, 25: 16, 27: 18, 28: 19,
        31: 21, 32: 21, 33: 22, 34: 23, 35: 24, 37: 26,
        39: 28, 40: 28, 41: 29, 42: 30, 43: 31, 44: 32, 45: 33,
        47: 35, 48: 36, 49: 37,
      },
    },
  },

  'n-queens-ii': {
    JavaScript: {
      code: `function totalNQueens(n) {
  let count = 0;
  const board = [];
  for (let i = 0; i < n; i++) {
    board.push(new Array(n).fill('.'));
  }

  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();

  function backtrack(row) {
    if (row === n) {
      count++;
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;

      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
        continue;
      }

      board[row][col] = 'Q';
      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);

      backtrack(row + 1);

      board[row][col] = '.';
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return count;
}`,
      lineMap: {
        1: 1, 2: 2, 3: 3, 4: 4, 5: 5,
        7: 7, 8: 7, 9: 8, 10: 9,
        12: 11, 13: 12, 14: 13, 15: 13, 16: 14, 17: 15,
        19: 17, 20: 18, 21: 19, 23: 21, 24: 22,
        27: 25, 28: 25, 29: 26, 30: 27, 31: 28, 33: 30,
        35: 32, 36: 32, 37: 33, 38: 34, 39: 35, 40: 36, 41: 37,
        43: 39, 44: 40, 45: 41,
      },
    },
    TypeScript: {
      code: `function totalNQueens(n: number): number {
  let count = 0;
  const board: string[][] = [];
  for (let i = 0; i < n; i++) {
    board.push(new Array(n).fill('.'));
  }

  const cols = new Set<number>();
  const diag1 = new Set<number>();
  const diag2 = new Set<number>();

  function backtrack(row: number): void {
    if (row === n) {
      count++;
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;

      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
        continue;
      }

      board[row]![col] = 'Q';
      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);

      backtrack(row + 1);

      board[row]![col] = '.';
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return count;
}`,
      lineMap: {
        1: 1, 2: 2, 3: 3, 4: 4, 5: 5,
        7: 7, 8: 7, 9: 8, 10: 9,
        12: 11, 13: 12, 14: 13, 15: 13, 16: 14, 17: 15,
        19: 17, 20: 18, 21: 19, 23: 21, 24: 22,
        27: 25, 28: 25, 29: 26, 30: 27, 31: 28, 33: 30,
        35: 32, 36: 32, 37: 33, 38: 34, 39: 35, 40: 36, 41: 37,
        43: 39, 44: 40, 45: 41,
      },
    },
    Python: {
      code: `def totalNQueens(n: int) -> int:
    count = 0
    board = [['.'] * n for _ in range(n)]
    cols = set()
    diag1 = set()
    diag2 = set()

    def backtrack(row: int) -> None:
        nonlocal count
        if row == n:
            count += 1
            return

        for col in range(n):
            d1 = row - col
            d2 = row + col

            if col in cols or d1 in diag1 or d2 in diag2:
                continue

            board[row][col] = 'Q'
            cols.add(col)
            diag1.add(d1)
            diag2.add(d2)

            backtrack(row + 1)

            board[row][col] = '.'
            cols.remove(col)
            diag1.remove(d1)
            diag2.remove(d2)

    backtrack(0)
    return count`,
      lineMap: {
        1: 1, 2: 2, 3: 3, 4: 3, 5: 3,
        7: 4, 8: 4, 9: 5, 10: 6,
        12: 8, 13: 10, 14: 11, 15: 11, 16: 12, 17: 12,
        19: 14, 20: 15, 21: 16, 23: 18, 24: 19,
        27: 21, 28: 21, 29: 22, 30: 23, 31: 24, 33: 26,
        35: 28, 36: 28, 37: 29, 38: 30, 39: 31, 40: 31, 41: 31,
        43: 33, 44: 34, 45: 34,
      },
    },
    Java: {
      code: `class Solution {
    private int count = 0;

    public int totalNQueens(int n) {
        count = 0;
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(board[i], '.');
        }

        Set<Integer> cols = new HashSet<>();
        Set<Integer> diag1 = new HashSet<>();
        Set<Integer> diag2 = new HashSet<>();

        backtrack(0, n, board, cols, diag1, diag2);
        return count;
    }

    private void backtrack(int row, int n, char[][] board, Set<Integer> cols,
                           Set<Integer> diag1, Set<Integer> diag2) {
        if (row == n) {
            count++;
            return;
        }

        for (int col = 0; col < n; col++) {
            int d1 = row - col;
            int d2 = row + col;

            if (cols.contains(col) || diag1.contains(d1) || diag2.contains(d2)) {
                continue;
            }

            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(d1);
            diag2.add(d2);

            backtrack(row + 1, n, board, cols, diag1, diag2);

            board[row][col] = '.';
            cols.remove(col);
            diag1.remove(d1);
            diag2.remove(d2);
        }
    }
}`,
      lineMap: {
        1: 4, 2: 5, 3: 6, 4: 7, 5: 8,
        7: 11, 8: 11, 9: 12, 10: 13,
        12: 18, 13: 20, 14: 21, 15: 21, 16: 22, 17: 23,
        19: 25, 20: 26, 21: 27, 23: 29, 24: 30,
        27: 33, 28: 33, 29: 34, 30: 35, 31: 36, 33: 38,
        35: 40, 36: 40, 37: 41, 38: 42, 39: 43, 40: 44, 41: 45,
        43: 15, 44: 16, 45: 17,
      },
    },
    'C++': {
      code: `class Solution {
public:
    int totalNQueens(int n) {
        int count = 0;
        vector<string> board(n, string(n, '.'));
        unordered_set<int> cols, diag1, diag2;

        auto backtrack = [&](auto& self, int row) -> void {
            if (row == n) {
                count++;
                return;
            }

            for (int col = 0; col < n; col++) {
                int d1 = row - col;
                int d2 = row + col;

                if (cols.count(col) || diag1.count(d1) || diag2.count(d2)) {
                    continue;
                }

                board[row][col] = 'Q';
                cols.insert(col);
                diag1.insert(d1);
                diag2.insert(d2);

                self(self, row + 1);

                board[row][col] = '.';
                cols.erase(col);
                diag1.erase(d1);
                diag2.erase(d2);
            }
        };

        backtrack(backtrack, 0);
        return count;
    }
};`,
      lineMap: {
        1: 3, 2: 4, 3: 5, 4: 5, 5: 5,
        7: 6, 8: 6, 9: 6, 10: 6,
        12: 8, 13: 9, 14: 10, 15: 10, 16: 11, 17: 11,
        19: 13, 20: 14, 21: 15, 23: 17, 24: 18,
        27: 20, 28: 20, 29: 21, 30: 22, 31: 23, 33: 25,
        35: 27, 36: 27, 37: 28, 38: 29, 39: 30, 40: 31, 41: 32,
        43: 35, 44: 36, 45: 37,
      },
    },
  },
};
