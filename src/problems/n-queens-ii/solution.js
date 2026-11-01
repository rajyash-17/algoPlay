function totalNQueens(n) {
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
      note("Valid placement found! Incrementing solutions count.");
      count++;
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;

      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
        continue;
      }

      note("Placing Queen at row " + row + ", col " + col);
      board[row][col] = 'Q';
      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);

      backtrack(row + 1);

      note("Backtracking: remove Queen from row " + row + ", col " + col);
      board[row][col] = '.';
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return count;
}
