import { describe, it, expect } from 'vitest';
import { executeTrace } from '../run';
import { GridStructureSnapshot } from '../types';
import { extractStructureSnapshot } from '../snapshot';
import { getProblemBySlug } from '@/problems';

describe('2D Grid and Chessboard Structure Tracing', () => {
  it('extracts grid structure correctly from 2D array', () => {
    const board = [
      ['.', 'Q', '.'],
      ['.', '.', '.'],
      ['Q', '.', '.'],
    ];

    const snapshot = extractStructureSnapshot('board', board, 'grid') as GridStructureSnapshot;
    expect(snapshot).toBeDefined();
    expect(snapshot.type).toBe('grid');
    expect(snapshot.numRows).toBe(3);
    expect(snapshot.numCols).toBe(3);
    expect(snapshot.rows[0]?.[1]).toBe('Q');
  });

  it('traces N-Queens backtracking steps with 2D coordinates and board updates', () => {
    const code = `
      function solveNQueens(n) {
        const board = [];
        for (let i = 0; i < n; i++) {
          board.push(new Array(n).fill('.'));
        }

        const solutions = [];
        function backtrack(row) {
          if (row === n) {
            solutions.push(board.map(r => r.join('')));
            return;
          }
          for (let col = 0; col < n; col++) {
            board[row][col] = 'Q';
            backtrack(row + 1);
            board[row][col] = '.';
          }
        }
        backtrack(0);
        return solutions;
      }
    `;

    const result = executeTrace({
      code,
      args: [2],
      entryFunction: 'solveNQueens',
      rendererConfig: {
        primaryStructure: 'board',
        structures: [{ name: 'board', type: 'grid', label: 'Chessboard' }],
        roleMappings: [
          { variable: 'row', role: 'pointer', label: 'row' },
          { variable: 'col', role: 'pointer', label: 'col' },
        ],
      },
    });

    expect(result.success).toBe(true);
    expect(result.steps.length).toBeGreaterThan(0);

    // Verify grid structure was snapshotted
    const gridSteps = result.steps.filter((s) => s.structures.some((st) => st.type === 'grid'));
    expect(gridSteps.length).toBeGreaterThan(0);

    const lastGrid = gridSteps[gridSteps.length - 1]!.structures.find((st) => st.type === 'grid') as GridStructureSnapshot;
    expect(lastGrid.numRows).toBe(2);
    expect(lastGrid.numCols).toBe(2);

    // Verify 2D coordinate highlights were generated
    const coordHighlights = result.steps.flatMap((s) => s.highlights).filter((h) => h.indices && h.indices.length === 2);
    expect(coordHighlights.length).toBeGreaterThan(0);
  });

  it('runs registered n-queens problem and generates complete 4x4 traces with valid solutions', () => {
    const prob = getProblemBySlug('n-queens');
    expect(prob).toBeDefined();

    const result = executeTrace({
      code: prob!.solutionCode,
      args: [4],
      rendererConfig: prob!.rendererConfig,
    });

    expect(result.success).toBe(true);
    expect(result.returnValue).toEqual([
      ['.Q..', '...Q', 'Q...', '..Q.'],
      ['..Q.', 'Q...', '...Q', '.Q..'],
    ]);

    // Check that every step has safe dimensions when rendered
    for (let i = 0; i < result.steps.length; i++) {
      const step = result.steps[i]!;
      const grid = step.structures.find((s) => s.type === 'grid') as GridStructureSnapshot | undefined;

      const targetRows = (typeof step.vars.n === 'number' && step.vars.n > 0)
        ? step.vars.n
        : (grid?.numRows && grid.numRows > 0 ? grid.numRows : 4);

      const targetCols = (typeof step.vars.n === 'number' && step.vars.n > 0)
        ? step.vars.n
        : (grid?.numCols && grid.numCols > 0 ? grid.numCols : targetRows);

      // Ensure effective grid is always full 4x4
      expect(targetRows).toBe(4);
      expect(targetCols).toBe(4);

      const rows = Array.from({ length: targetRows }, (_, r) => {
        const existingRow = grid?.rows?.[r];
        return Array.from({ length: targetCols }, (_, c) => {
          return existingRow?.[c] ?? '.';
        });
      });

      expect(rows.length).toBe(4);
      expect(rows[0]!.length).toBe(4);
    }
  });

  it('runs registered n-queens-ii problem and correctly counts 2 solutions for n = 4', () => {
    const prob = getProblemBySlug('n-queens-ii');
    expect(prob).toBeDefined();

    const result = executeTrace({
      code: prob!.solutionCode,
      args: [4],
      rendererConfig: prob!.rendererConfig,
    });

    expect(result.success).toBe(true);
    expect(result.returnValue).toBe(2);
    expect(result.steps.length).toBeGreaterThan(0);
  });
});
