'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step, RendererConfig, GridStructureSnapshot } from '@/engine/types';
import { LayoutGrid, Crown, ZoomIn, ZoomOut, Trophy, Crosshair } from 'lucide-react';

interface GridRendererProps {
  step: Step | null;
  config: RendererConfig;
}

export const GridRenderer: React.FC<GridRendererProps> = ({ step, config }) => {
  const [zoom, setZoom] = useState<number>(1);

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

  if (!gridStructure || !gridStructure.rows || gridStructure.rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-3 border-ink rounded-lg bg-surface-muted text-ink-muted font-mono p-6">
        <span className="font-bold text-ink">Empty Grid</span>
        <span className="text-xs text-ink-subtle mt-1">board = []</span>
      </div>
    );
  }

  const { rows, numRows, numCols } = gridStructure;

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
    if (typeof r === 'number' && typeof c === 'number' && Number.isInteger(r) && Number.isInteger(c)) {
      return { row: r, col: c };
    }

    return null;
  }, [step.highlights, step.vars]);

  // Count placed queens
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

  // Detect solutions count if solutions array exists in step vars
  const solutionsCount = useMemo(() => {
    for (const [key, val] of Object.entries(step.vars)) {
      if (['solutions', 'res', 'ans', 'result'].includes(key) && Array.isArray(val)) {
        return val.length;
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
    if (numCols <= 6) return 'w-14 h-14 sm:w-16 sm:h-16';
    return 'w-11 h-11 sm:w-13 sm:h-13';
  }, [numCols]);

  return (
    <div className="w-full flex flex-col items-center p-6 bg-surface border-3 border-ink rounded-lg shadow-standard min-h-[380px] overflow-hidden">
      {/* Top HUD Header */}
      <div className="self-start mb-6 flex flex-wrap items-center justify-between gap-3 w-full">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="bg-ink text-primary font-mono text-xs font-black px-3 py-1 rounded shadow-xs flex items-center gap-1.5 uppercase">
            <LayoutGrid className="w-4 h-4" />
            {gridStructure.name}: {numRows}x{numCols}
          </span>

          {/* Queens Placed Badge */}
          <span
            className={`font-mono text-xs font-black px-2.5 py-1 rounded border-2 border-ink shadow-xs flex items-center gap-1.5 transition-all ${
              isFullBoard
                ? 'bg-success text-ink'
                : 'bg-primary/20 text-ink'
            }`}
          >
            <Crown className="w-3.5 h-3.5 fill-ink text-ink" />
            <span>Queens: {queensCount} / {targetQueens}</span>
          </span>

          {/* Active Coordinate Badge */}
          {activeCoord && (
            <span className="bg-accent text-ink font-mono text-xs font-black px-2.5 py-1 rounded border-2 border-ink shadow-xs flex items-center gap-1">
              <Crosshair className="w-3.5 h-3.5 text-ink animate-pulse" />
              <span>Cell ({activeCoord.row}, {activeCoord.col})</span>
            </span>
          )}

          {/* Solutions Counter */}
          {solutionsCount !== null && solutionsCount > 0 && (
            <span className="bg-purple text-surface font-mono text-xs font-black px-2.5 py-1 rounded border-2 border-ink shadow-xs flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <span>{solutionsCount} Solved</span>
            </span>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-surface-muted p-1 rounded-lg border-2 border-ink shadow-xs">
          <button
            onClick={() => setZoom((z) => Math.max(0.7, Number((z - 0.15).toFixed(2))))}
            title="Zoom Out"
            className="p-1 hover:bg-surface text-ink font-black"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(1)}
            title="Reset Zoom"
            className="px-1.5 text-[11px] font-bold text-ink hover:bg-surface border-x border-ink"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={() => setZoom((z) => Math.min(1.4, Number((z + 0.15).toFixed(2))))}
            title="Zoom In"
            className="p-1 hover:bg-surface text-ink font-black"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Chessboard / Grid Interactive Canvas */}
      <div className="w-full flex-1 overflow-x-auto overflow-y-auto max-h-[560px] flex items-center justify-center py-4">
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
                    const isCellActive = activeCoord?.row === rIdx && activeCoord?.col === cIdx;
                    const isColActive = activeCoord?.col === cIdx;
                    const isQueen = String(cell).toUpperCase() === 'Q';
                    const isLightSquare = (rIdx + cIdx) % 2 === 0;

                    // Attack crosshair tint (when inspecting, show active row & column line)
                    const isAttackLine = (isRowActive || isColActive) && !isCellActive;

                    return (
                      <div
                        key={`${rIdx}_${cIdx}`}
                        className={`relative ${cellSizeClass} border border-ink flex items-center justify-center transition-all ${
                          isCellActive
                            ? 'bg-primary ring-4 ring-ink ring-offset-2 ring-offset-canvas shadow-large z-20'
                            : isAttackLine
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
                            <div className="bg-ink text-primary font-mono text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm border border-primary whitespace-nowrap">
                              Testing ({rIdx}, {cIdx})
                            </div>
                          </div>
                        )}

                        {/* Cell Contents: Queen or Empty Dot */}
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
                              <div className="relative p-1">
                                <Crown className="w-8 h-8 sm:w-10 sm:h-10 fill-primary text-ink stroke-[2.5] drop-shadow-md" />
                              </div>
                              <span className="font-mono text-[8px] sm:text-[9px] font-black text-ink uppercase tracking-tight -mt-1 bg-surface px-1 rounded border border-ink/40 shadow-xs">
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
      <div className="w-full flex flex-wrap items-center justify-center gap-5 pt-4 mt-2 border-t-2 border-surface-muted text-xs font-mono">
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
          <span className="font-bold text-ink">Attack Ray (Row/Col)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-[#FFFDF7] border border-ink rounded" />
          <span className="text-ink-muted">Empty Square</span>
        </div>
      </div>
    </div>
  );
};
