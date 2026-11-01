import { describe, it, expect } from 'vitest';
import { executeTrace } from '../run';
import { GridStructureSnapshot } from '../types';
import { extractStructureSnapshot } from '../snapshot';

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
          const row = [];
          for (let j = 0; j < n; j++) {
            row.push('.');
          }
          board.push(row);
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
});
