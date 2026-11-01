import { SupportedLanguage, LanguageImplementation } from './multiLanguage';

export const N_QUEENS_MULTI_LANG_SOLUTIONS: Record<string, Record<SupportedLanguage, LanguageImplementation>> = {
  'n-queens': {
    JavaScript: {
      code: `function solveNQueens(n) {
  const board = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push('.');
    }
    board.push(row);
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
        1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 8: 8,
        11: 11, 12: 12, 13: 13, 14: 14, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 22: 22, 23: 23,
        26: 26, 27: 27, 28: 28, 30: 30, 31: 31, 34: 34, 35: 35, 36: 36, 37: 37,
        39: 39, 41: 41, 42: 42, 43: 43, 44: 44, 48: 48, 49: 49,
      },
    },
    TypeScript: {
      code: `function solveNQueens(n: number): string[][] {
  const board: string[][] = [];
  for (let i = 0; i < n; i++) {
    const row: string[] = [];
    for (let j = 0; j < n; j++) {
      row.push('.');
    }
    board.push(row);
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
        1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 8: 8,
        11: 11, 12: 12, 13: 13, 14: 14, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 22: 22, 23: 23,
        26: 26, 27: 27, 28: 28, 30: 30, 31: 31, 34: 34, 35: 35, 36: 36, 37: 37,
        39: 39, 41: 41, 42: 42, 43: 43, 44: 44, 48: 48, 49: 49,
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
        1: 1, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 8: 2,
        11: 3, 12: 4, 13: 5, 14: 6, 16: 8, 17: 9, 18: 10, 19: 10, 20: 10, 22: 10, 23: 11,
        26: 13, 27: 14, 28: 15, 30: 17, 31: 18, 34: 20, 35: 21, 36: 22, 37: 23,
        39: 25, 41: 27, 42: 28, 43: 29, 44: 30, 48: 32, 49: 33,
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
        1: 2, 2: 3, 3: 4, 4: 5, 5: 5, 6: 5, 8: 5,
        11: 8, 12: 9, 13: 10, 14: 11, 16: 16, 17: 18, 18: 19, 19: 20, 20: 21, 22: 23, 23: 24,
        26: 27, 27: 28, 28: 29, 30: 31, 31: 32, 34: 35, 35: 36, 36: 37, 37: 38,
        39: 40, 41: 42, 42: 43, 43: 44, 44: 45, 48: 13, 49: 14,
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
        1: 3, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 8: 4,
        11: 5, 12: 6, 13: 6, 14: 6, 16: 8, 17: 9, 18: 10, 19: 10, 20: 10, 22: 10, 23: 11,
        26: 14, 27: 15, 28: 16, 30: 18, 31: 19, 34: 22, 35: 23, 36: 24, 37: 25,
        39: 27, 41: 29, 42: 30, 43: 31, 44: 32, 48: 36, 49: 37,
      },
    },
  },

  'n-queens-ii': {
    JavaScript: {
      code: `function totalNQueens(n) {
  let count = 0;
  const board = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push('.');
    }
    board.push(row);
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
        1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 8: 8,
        11: 11, 12: 12, 13: 13, 15: 15, 16: 16, 17: 17, 18: 18,
        21: 21, 22: 22, 23: 23, 25: 25, 26: 26, 29: 29, 30: 30, 31: 31, 32: 32,
        34: 34, 36: 36, 37: 37, 38: 38, 39: 39, 43: 43, 44: 44,
      },
    },
    TypeScript: {
      code: `function totalNQueens(n: number): number {
  let count = 0;
  const board: string[][] = [];
  for (let i = 0; i < n; i++) {
    const row: string[] = [];
    for (let j = 0; j < n; j++) {
      row.push('.');
    }
    board.push(row);
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
        1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 8: 8,
        11: 11, 12: 12, 13: 13, 15: 15, 16: 16, 17: 17, 18: 18,
        21: 21, 22: 22, 23: 23, 25: 25, 26: 26, 29: 29, 30: 30, 31: 31, 32: 32,
        34: 34, 36: 36, 37: 37, 38: 38, 39: 39, 43: 43, 44: 44,
      },
    },
    Python: {
      code: `def totalNQueens(n: int) -> int:
    count = 0
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

            cols.add(col)
            diag1.add(d1)
            diag2.add(d2)

            backtrack(row + 1)

            cols.remove(col)
            diag1.remove(d1)
            diag2.remove(d2)

    backtrack(0)
    return count`,
      lineMap: {
        1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 5, 8: 5,
        11: 3, 12: 4, 13: 5, 15: 7, 16: 9, 17: 10, 18: 11,
        21: 13, 22: 14, 23: 15, 25: 17, 26: 18, 29: 20, 30: 20, 31: 21, 32: 22,
        34: 24, 36: 26, 37: 26, 38: 27, 39: 28, 43: 30, 44: 31,
      },
    },
    Java: {
      code: `class Solution {
    private int count = 0;

    public int totalNQueens(int n) {
        Set<Integer> cols = new HashSet<>();
        Set<Integer> diag1 = new HashSet<>();
        Set<Integer> diag2 = new HashSet<>();

        backtrack(0, n, cols, diag1, diag2);
        return count;
    }

    private void backtrack(int row, int n, Set<Integer> cols, Set<Integer> diag1, Set<Integer> diag2) {
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

            cols.add(col);
            diag1.add(d1);
            diag2.add(d2);

            backtrack(row + 1, n, cols, diag1, diag2);

            cols.remove(col);
            diag1.remove(d1);
            diag2.remove(d2);
        }
    }
}`,
      lineMap: {
        1: 4, 2: 2, 3: 5, 4: 5, 5: 5, 6: 5, 8: 5,
        11: 5, 12: 6, 13: 7, 15: 12, 16: 13, 17: 14, 18: 15,
        21: 18, 22: 19, 23: 20, 25: 22, 26: 23, 29: 25, 30: 25, 31: 26, 32: 27,
        34: 29, 36: 31, 37: 31, 38: 32, 39: 33, 43: 9, 44: 10,
      },
    },
    'C++': {
      code: `class Solution {
public:
    int totalNQueens(int n) {
        int count = 0;
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

                cols.insert(col);
                diag1.insert(d1);
                diag2.insert(d2);

                self(self, row + 1);

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
        1: 3, 2: 4, 3: 5, 4: 5, 5: 5, 6: 5, 8: 5,
        11: 5, 12: 5, 13: 5, 15: 7, 16: 8, 17: 9, 18: 10,
        21: 13, 22: 14, 23: 15, 25: 17, 26: 18, 29: 20, 30: 20, 31: 21, 32: 22,
        34: 24, 36: 26, 37: 26, 38: 27, 39: 28, 43: 31, 44: 32,
      },
    },
  },
};
