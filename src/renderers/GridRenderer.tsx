'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step, RendererConfig, GridStructureSnapshot, Snapshot } from '@/engine/types';
import { LayoutGrid, Crown, ZoomIn, ZoomOut, Trophy, Crosshair, AlertTriangle, CheckCircle } from 'lucide-react';

interface GridRendererProps {
  step: Step | null;
  config: RendererConfig;
}

interface GridCanvasProps {
  step: Step;
  rows: Snapshot[][];
  numRows: number;
  numCols: number;
  structureName: string;
}

/**
 * GridCanvas hosts all state and useMemo hooks unconditionally.
 * Guaranteed to never suffer hook-order violations across time steps.
 */
const GridCanvas: React.FC<GridCanvasProps> = ({
  step,
  rows,
  numRows,
  numCols,
  structureName,
}) => {
  const [zoom, setZoom] = useState<number>(1);

  // Extract active 2D coordinate highlight: [row, col]
  const activeCoord = useMemo(() => {
    // 1. Check for highlight with indices [row, col]
    const coordHighlight = step.highlights.find(
      (h) => h.indices && h.indices.length >= 2
    );
    if (coordHighlight && coordHighlight.indices) {
      return { row: coordHighlight.indices[0]!, col: coordHighlight.indices[1]! };
    }

    // 2. Check currentVars for row and col
    const r = step.vars.row ?? step.vars.r;
    const c = step.vars.col ?? step.vars.c;
    if (
      typeof r === 'number' &&
      typeof c === 'number' &&
      Number.isInteger(r) &&
      Number.isInteger(c)
    ) {
      return { row: r, col: c };
    }

    return null;
  }, [step.highlights, step.vars]);

  // Count placed queens on the current board
  const queensCount = useMemo(() => {
    let count = 0;
    for (const row of rows) {
      for (const cell of row) {
        if (String(cell).toUpperCase() === 'Q') {
          count++;
        }
      }
    }
    return count;
  }, [rows]);

  // Detect conflict state for the actively inspected cell (using cols, diag1, diag2 sets/arrays)
  const cellConflict = useMemo(() => {
    if (!activeCoord) return null;
    const { row, col } = activeCoord;

    const colsVal = step.vars.cols;
    const d1Val = step.vars.diag1;
    const d2Val = step.vars.diag2;

    const colUnderAttack = Array.isArray(colsVal) ? colsVal.includes(col) : false;
    const d1UnderAttack = Array.isArray(d1Val) ? d1Val.includes(row - col) : false;
    const d2UnderAttack = Array.isArray(d2Val) ? d2Val.includes(row + col) : false;

    const isConflict = colUnderAttack || d1UnderAttack || d2UnderAttack;

    return {
      isConflict,
      colUnderAttack,
      d1UnderAttack,
      d2UnderAttack,
    };
  }, [activeCoord, step.vars]);

  // Detect solutions count if solutions array or count exists in step vars
  const solutionsCount = useMemo(() => {
    if (typeof step.vars.count === 'number') {
      return step.vars.count;
    }
    for (const [key, val] of Object.entries(step.vars)) {
      if (['solutions', 'res', 'ans', 'result'].includes(key) && Array.isArray(val)) {
        return val.length;
      }
    }
    return null;
  }, [step.vars]);

  // Detect completed solutions list for mini gallery preview
  const solutionsList = useMemo(() => {
    for (const [key, val] of Object.entries(step.vars)) {
      if (['solutions', 'res', 'ans', 'result'].includes(key) && Array.isArray(val)) {
        return val as (string[] | string[][])[];
      }
    }
    return null;
  }, [step.vars]);

  const targetQueens = Math.max(numRows, numCols);
  const isFullBoard = queensCount === targetQueens;

  // Column letters (A, B, C, D...)
  const colLetters = useMemo(() => {
    return Array.from({ length: numCols }, (_, i) => String.fromCharCode(65 + i));
  }, [numCols]);

  // Determine cell sizing based on board dimensions
  const cellSizeClass = useMemo(() => {
    if (numCols <= 4) return 'w-16 h-16 sm:w-20 sm:h-20';
    if (numCols <= 6) return 'w-13 h-13 sm:w-16 sm:h-16';
    return 'w-10 h-10 sm:w-12 sm:h-12';
  }, [numCols]);

  return (
    <div className="w-full flex flex-col items-center p-6 bg-surface border-3 border-ink rounded-lg shadow-standard min-h-[420px] overflow-hidden">
      {/* Top HUD Header */}
      <div className="self-start mb-6 flex flex-wrap items-center justify-between gap-3 w-full">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="bg-ink text-primary font-mono text-xs font-black px-3 py-1 rounded shadow-xs flex items-center gap-1.5 uppercase">
            <LayoutGrid className="w-4 h-4" />
            {structureName}: {numRows}x{numCols}
          </span>

          {/* Queens Placed Badge */}
          <span
            className={`font-mono text-xs font-black px-2.5 py-1 rounded border-2 border-ink shadow-xs flex items-center gap-1.5 transition-all ${
              isFullBoard
                ? 'bg-success text-ink ring-2 ring-ink ring-offset-1'
                : 'bg-primary/20 text-ink'
            }`}
          >
            <Crown className="w-3.5 h-3.5 fill-ink text-ink" />
            <span>
              Queens: {queensCount} / {targetQueens}
            </span>
          </span>

          {/* Active Coordinate & Conflict Status Badge */}
          {activeCoord && (
            <span
              className={`font-mono text-xs font-black px-2.5 py-1 rounded border-2 border-ink shadow-xs flex items-center gap-1.5 ${
                cellConflict?.isConflict
                  ? 'bg-coral text-surface'
                  : 'bg-accent text-ink'
              }`}
            >
              {cellConflict?.isConflict ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-surface animate-bounce" />
                  <span>Conflict at ({activeCoord.row}, {activeCoord.col})</span>
                </>
              ) : (
                <>
                  <Crosshair className="w-3.5 h-3.5 text-ink animate-pulse" />
                  <span>Testing ({activeCoord.row}, {activeCoord.col})</span>
                </>
              )}
            </span>
          )}

          {/* Solutions Counter */}
          {solutionsCount !== null && solutionsCount > 0 && (
            <span className="bg-purple text-surface font-mono text-xs font-black px-2.5 py-1 rounded border-2 border-ink shadow-xs flex items-center gap-1.5 animate-pulse">
              <Trophy className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <span>{solutionsCount} Solved</span>
            </span>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-surface-muted p-1 rounded-lg border-2 border-ink shadow-xs">
          <button
            onClick={() => setZoom((z) => Math.max(0.65, Number((z - 0.15).toFixed(2))))}
            title="Zoom Out"
            className="p-1 hover:bg-surface text-ink font-black rounded"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(1)}
            title="Reset Zoom"
            className="px-2 text-[11px] font-bold text-ink hover:bg-surface border-x border-ink"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={() => setZoom((z) => Math.min(1.4, Number((z + 0.15).toFixed(2))))}
            title="Zoom In"
            className="p-1 hover:bg-surface text-ink font-black rounded"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Chessboard Interactive Canvas */}
      <div className="w-full flex-1 overflow-x-auto overflow-y-auto max-h-[580px] flex items-center justify-center py-4">
        <div
          className="relative transition-transform duration-200 ease-out select-none flex flex-col items-center"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
          }}
        >
          {/* Column File Headers (A, B, C, D...) */}
          <div className="flex items-center mb-1.5 pl-8">
            {colLetters.map((letter, cIdx) => (
              <div
                key={letter}
                className={`${cellSizeClass} flex flex-col items-center justify-center font-mono text-xs font-black text-ink-muted`}
              >
                <span>{letter}</span>
                <span className="text-[9px] opacity-60">col {cIdx}</span>
              </div>
            ))}
          </div>

          {/* Board Rows */}
          <div className="flex flex-col border-4 border-ink rounded-xl overflow-hidden shadow-large bg-canvas">
            {rows.map((row, rIdx) => {
              const isRowActive = activeCoord?.row === rIdx;

              return (
                <div key={rIdx} className="flex items-center">
                  {/* Row Rank Header (Left gutter: 0, 1, 2...) */}
                  <div className="w-8 h-full flex flex-col items-center justify-center font-mono text-xs font-black text-ink-muted bg-surface-muted/60 border-r-2 border-ink select-none px-1">
                    <span>{rIdx}</span>
                  </div>

                  {/* Grid Cells in Row */}
                  {row.map((cell, cIdx) => {
                    const isCellActive =
                      activeCoord?.row === rIdx && activeCoord?.col === cIdx;
                    const isColActive = activeCoord?.col === cIdx;
                    const isDiag1Active =
                      activeCoord !== null &&
                      rIdx - cIdx === activeCoord.row - activeCoord.col;
                    const isDiag2Active =
                      activeCoord !== null &&
                      rIdx + cIdx === activeCoord.row + activeCoord.col;

                    // Attack rays in all 8 directions from active tested cell
                    const isAttackRay =
                      (isRowActive || isColActive || isDiag1Active || isDiag2Active) &&
                      !isCellActive;

                    const isQueen = String(cell).toUpperCase() === 'Q';
                    const isLightSquare = (rIdx + cIdx) % 2 === 0;

                    return (
                      <div
                        key={`${rIdx}_${cIdx}`}
                        className={`relative ${cellSizeClass} border border-ink flex items-center justify-center transition-all ${
                          isCellActive
                            ? cellConflict?.isConflict
                              ? 'bg-coral/30 ring-4 ring-coral ring-offset-2 ring-offset-canvas shadow-large z-20'
                              : 'bg-primary ring-4 ring-ink ring-offset-2 ring-offset-canvas shadow-large z-20'
                            : isAttackRay
                            ? isLightSquare
                              ? 'bg-amber-100/90'
                              : 'bg-amber-200/90'
                            : isLightSquare
                            ? 'bg-[#FFFDF7]'
                            : 'bg-[#DCD4C0]'
                        }`}
                      >
                        {/* Active Coordinate Pointer Pill */}
                        {isCellActive && (
                          <div className="absolute -top-7 z-30 pointer-events-none">
                            <div
                              className={`font-mono text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm border whitespace-nowrap flex items-center gap-1 ${
                                cellConflict?.isConflict
                                  ? 'bg-coral text-surface border-coral'
                                  : 'bg-ink text-primary border-primary'
                              }`}
                            >
                              {cellConflict?.isConflict ? (
                                <>
                                  <AlertTriangle className="w-2.5 h-2.5" />
                                  <span>Attacked ({rIdx}, {cIdx})</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-2.5 h-2.5" />
                                  <span>Testing ({rIdx}, {cIdx})</span>
                                </>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Cell Contents: Queen or Empty Square Marker */}
                        <AnimatePresence mode="popLayout">
                          {isQueen ? (
                            <motion.div
                              key="queen"
                              initial={{ scale: 0, rotate: -20 }}
                              animate={{ scale: [0, 1.25, 1], rotate: [0, -5, 0] }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                              className="flex flex-col items-center justify-center select-none"
                            >
                              <div className="relative p-0.5">
                                <Crown className="w-7 h-7 sm:w-9 sm:h-9 fill-primary text-ink stroke-[2.5] drop-shadow-md" />
                              </div>
                              <span className="font-mono text-[8px] sm:text-[9px] font-black text-ink uppercase tracking-tight -mt-0.5 bg-surface px-1 rounded border border-ink/40 shadow-xs">
                                Queen
                              </span>
                            </motion.div>
                          ) : (
                            <span className="font-mono text-ink-muted/30 text-xs sm:text-sm font-black select-none">
                              •
                            </span>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Role Legend & Explanation */}
      <div className="w-full flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 mt-2 border-t-2 border-surface-muted text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <Crown className="w-4 h-4 fill-primary text-ink" />
          <span className="font-bold text-ink">Queen Placed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-primary border-2 border-ink rounded shadow-xs" />
          <span className="font-bold text-ink">Inspecting Cell</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-amber-200 border border-ink rounded" />
          <span className="font-bold text-ink">Attack Ray (Row/Col/Diag)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-coral/40 border border-coral rounded" />
          <span className="font-bold text-coral">Conflict Detected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-[#FFFDF7] border border-ink rounded" />
          <span className="text-ink-muted">Empty Square</span>
        </div>
      </div>

      {/* Completed Solutions Gallery Tray */}
      {solutionsList && solutionsList.length > 0 && (
        <div className="w-full mt-5 pt-4 border-t-2 border-surface-muted flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3 self-start">
            <Trophy className="w-4 h-4 text-purple" />
            <span className="font-mono text-xs font-black uppercase text-ink">
              Discovered Solutions ({solutionsList.length})
            </span>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-start w-full">
            {solutionsList.map((sol, solIdx) => {
              // Convert solution lines to 2D character arrays
              const solLines: string[] = Array.isArray(sol)
                ? sol.map((l) => (Array.isArray(l) ? l.join('') : String(l)))
                : [];

              return (
                <div
                  key={solIdx}
                  className="flex flex-col items-center bg-surface-muted p-2 rounded-lg border-2 border-ink shadow-xs"
                >
                  <span className="font-mono text-[10px] font-black text-ink mb-1">
                    Solution #{solIdx + 1}
                  </span>
                  <div className="flex flex-col border border-ink rounded overflow-hidden">
                    {solLines.map((line, rIdx) => (
                      <div key={rIdx} className="flex">
                        {line.split('').map((ch, cIdx) => {
                          const isQ = ch.toUpperCase() === 'Q';
                          const isLight = (rIdx + cIdx) % 2 === 0;
                          return (
                            <div
                              key={cIdx}
                              className={`w-4 h-4 flex items-center justify-center font-mono text-[9px] font-black ${
                                isQ
                                  ? 'bg-primary text-ink'
                                  : isLight
                                  ? 'bg-[#FFFDF7] text-ink/20'
                                  : 'bg-[#DCD4C0] text-ink/20'
                              }`}
                            >
                              {isQ ? '♛' : '·'}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * GridRenderer handles 2D grid/chessboard visualization.
 * It is a pure presentation wrapper with ZERO hooks, guaranteeing unconditional
 * hook execution inside GridCanvas even when steps initialize or mutate.
 */
export const GridRenderer: React.FC<GridRendererProps> = ({ step, config }) => {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-64 border-3 border-dashed border-ink rounded-lg bg-surface-muted text-ink-muted font-mono font-bold">
        Ready to trace chessboard / grid...
      </div>
    );
  }

  // Find target grid structure
  const gridStructure = (step.structures.find(
    (s) => s.name === config.primaryStructure && s.type === 'grid'
  ) || step.structures.find((s) => s.type === 'grid')) as GridStructureSnapshot | undefined;

  // Determine target dimensions (from step.vars.n or gridStructure or fallback 4)
  const rawNumRows = gridStructure?.numRows ?? 0;
  const rawNumCols = gridStructure?.numCols ?? 0;

  // Determine target dimensions:
  // If n is known from variables, use n so the chessboard remains stable at full NxN
  // throughout the entire execution, including during initial row allocation.
  const targetRows =
    typeof step.vars.n === 'number' && step.vars.n > 0
      ? step.vars.n
      : rawNumRows > 0
      ? rawNumRows
      : 4;

  const targetCols =
    typeof step.vars.n === 'number' && step.vars.n > 0
      ? step.vars.n
      : rawNumCols > 0
      ? rawNumCols
      : targetRows;

  // Always supply a full grid of dots '.' padded/overlayed with any current cells,
  // ensuring the user immediately sees a clean chessboard from step 0.
  const rows: Snapshot[][] = Array.from({ length: targetRows }, (_, r) => {
    const existingRow = gridStructure?.rows?.[r];
    return Array.from({ length: targetCols }, (_, c) => {
      return existingRow?.[c] ?? '.';
    });
  });

  return (
    <GridCanvas
      step={step}
      rows={rows}
      numRows={targetRows}
      numCols={targetCols}
      structureName={gridStructure?.name ?? config.primaryStructure ?? 'board'}
    />
  );
};
