'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step, RendererConfig, ArrayStructureSnapshot, Highlight } from '@/engine/types';
import { tokens } from '@/lib/tokens';

interface ArrayRendererProps {
  step: Step | null;
  config: RendererConfig;
}

export const ArrayRenderer: React.FC<ArrayRendererProps> = ({ step, config }) => {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-64 border-3 border-dashed border-ink rounded-lg bg-surface-muted text-ink-muted font-mono font-bold">
        Ready to trace...
      </div>
    );
  }

  // Find target array structure
  const arrayStructure = (step.structures.find(
    (s) => s.name === config.primaryStructure && s.type === 'array'
  ) || step.structures.find((s) => s.type === 'array')) as ArrayStructureSnapshot | undefined;

  if (!arrayStructure || !Array.isArray(arrayStructure.values)) {
    return (
      <div className="flex items-center justify-center h-64 border-3 border-ink rounded-lg bg-surface-muted text-ink-muted font-mono">
        No active array found in current step
      </div>
    );
  }

  const values = arrayStructure.values;

  // Extract pointers and highlights
  const highlights = step.highlights;

  // Identify pointers pointing to an index
  const pointersByIndex = new Map<number, Highlight[]>();
  // Identify cell-level roles (compare, swap, result, visited)
  const cellRolesByIndex = new Map<number, string>();

  let windowStart: number | null = null;
  let windowEnd: number | null = null;

  for (const h of highlights) {
    if (h.role === 'pointer' && typeof h.index === 'number') {
      const list = pointersByIndex.get(h.index) ?? [];
      list.push(h);
      pointersByIndex.set(h.index, list);
    } else if (h.role === 'window') {
      if (typeof h.index === 'number') {
        windowStart = windowStart === null ? h.index : Math.min(windowStart, h.index);
        windowEnd = windowEnd === null ? h.index : Math.max(windowEnd, h.index);
      }
      if (h.indices && h.indices.length >= 2) {
        windowStart = h.indices[0] ?? null;
        windowEnd = h.indices[1] ?? null;
      }
    } else if (typeof h.index === 'number') {
      cellRolesByIndex.set(h.index, h.role);
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-surface border-3 border-ink rounded-lg shadow-standard overflow-x-auto min-h-[300px]">
      {/* Array name badge */}
      <div className="self-start mb-6 flex items-center gap-2">
        <span className="bg-ink text-primary font-mono text-xs font-bold px-2 py-0.5 rounded">
          ARRAY: {arrayStructure.name}
        </span>
        <span className="text-ink-muted font-mono text-xs font-medium">
          length = {values.length}
        </span>
      </div>

      {/* Main visualization row */}
      <div className="relative flex items-end justify-center gap-3 pt-12 pb-8">
        {values.map((val, idx) => {
          const pointers = pointersByIndex.get(idx) ?? [];
          const cellRole = cellRolesByIndex.get(idx);
          const isInWindow =
            windowStart !== null && windowEnd !== null && idx >= windowStart && idx <= windowEnd;

          // Determine cell background styling based on role
          let bgClass = 'bg-surface text-ink';
          let borderClass = 'border-ink';

          if (cellRole === 'compare') {
            bgClass = 'bg-accent text-ink';
          } else if (cellRole === 'swap') {
            bgClass = 'bg-secondary text-surface';
          } else if (cellRole === 'result') {
            bgClass = 'bg-success text-ink';
          } else if (cellRole === 'visited') {
            bgClass = 'bg-primary text-ink';
          } else if (isInWindow) {
            bgClass = 'bg-purple/20 text-ink';
            borderClass = 'border-purple';
          }

          return (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Animated Pointers floating above the cell */}
              <div className="absolute -top-12 flex flex-col items-center gap-1 z-10">
                <AnimatePresence>
                  {pointers.map((p, pIdx) => (
                    <motion.div
                      key={p.label ?? pIdx}
                      initial={{ opacity: 0, y: -6, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="flex flex-col items-center"
                    >
                      <div className="bg-ink text-primary font-mono text-xs font-black px-2 py-0.5 rounded shadow-sm border border-primary flex items-center gap-1">
                        <span>{p.label ?? 'ptr'}</span>
                      </div>
                      {/* Arrow doodle */}
                      <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-ink" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Element Card */}
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`w-14 h-16 flex items-center justify-center font-mono text-xl font-black rounded-lg border-3 shadow-standard select-none ${bgClass} ${borderClass}`}
              >
                {String(val ?? '')}
              </motion.div>

              {/* Index label beneath */}
              <div className="mt-2 font-mono text-xs font-bold text-ink-muted">
                {idx}
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Role Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 pt-3 border-t-2 border-surface-muted text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-accent border border-ink rounded" />
          <span>Compare / Read</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-secondary border border-ink rounded" />
          <span>Write / Swap</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-success border border-ink rounded" />
          <span>Match / Result</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-purple/30 border border-purple rounded" />
          <span>Window</span>
        </div>
      </div>
    </div>
  );
};
