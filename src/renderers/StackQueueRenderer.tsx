'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Step,
  RendererConfig,
  ArrayStructureSnapshot,
  StackStructureSnapshot,
  QueueStructureSnapshot,
} from '@/engine/types';
import { ArrowDown, Layers } from 'lucide-react';

interface StackQueueRendererProps {
  step: Step | null;
  config: RendererConfig;
}

export const StackQueueRenderer: React.FC<StackQueueRendererProps> = ({ step, config }) => {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-64 border-3 border-dashed border-ink rounded-lg bg-surface-muted text-ink-muted font-mono font-bold">
        Ready to trace stack / queue...
      </div>
    );
  }

  // Find all structures to render (supports dual stacks like in min-stack)
  const targetDefs = config.structures.filter((s) => s.type === 'stack' || s.type === 'queue');
  const activeDefs = targetDefs.length > 0 ? targetDefs : [config.structures[0]!];

  // Check last operation from step highlights
  const lastOpHighlight = step.highlights.find((h) => h.operation);
  const lastOp = lastOpHighlight?.operation;

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-surface border-3 border-ink rounded-lg shadow-standard min-h-[340px]">
      {/* Operation Alert Badge if active */}
      {lastOp && (
        <div className="self-end mb-3">
          <span className="bg-accent text-ink font-mono text-xs font-black px-3 py-1 rounded border-2 border-ink shadow-sm uppercase tracking-wide">
            OP: {lastOp}
          </span>
        </div>
      )}

      {/* Main Containers Row (Side by Side for dual stacks like in Min Stack) */}
      <div className="flex flex-wrap items-end justify-center gap-8 w-full max-w-4xl">
        {activeDefs.map((def) => {
          const isQueue = def.type === 'queue';

          // 1. Prioritize exact name match in step.structures
          let structSnapshot = step.structures.find((s) => s.name === def.name);

          // 2. If no exact name match, fallback if single structure of matching type
          if (!structSnapshot && step.structures.length === 1) {
            const first = step.structures[0]!;
            if (first.type === (isQueue ? 'queue' : 'stack') || first.type === 'array') {
              structSnapshot = first;
            }
          }

          let items: unknown[] = [];
          if (structSnapshot) {
            if (structSnapshot.type === 'stack') items = (structSnapshot as StackStructureSnapshot).items ?? [];
            else if (structSnapshot.type === 'queue') items = (structSnapshot as QueueStructureSnapshot).items ?? [];
            else if (structSnapshot.type === 'array') items = (structSnapshot as ArrayStructureSnapshot).values ?? [];
          }

          // 3. Fallback to step.vars[def.name] if structSnapshot was empty or missing
          if (items.length === 0 && Array.isArray(step.vars[def.name])) {
            items = step.vars[def.name] as unknown[];
          }

          // 4. Fallback to any variable matching name or containing stack/queue
          if (items.length === 0) {
            for (const [vName, vVal] of Object.entries(step.vars)) {
              if (
                Array.isArray(vVal) &&
                (vName.toLowerCase() === def.name.toLowerCase() ||
                  (isQueue
                    ? vName.toLowerCase().includes('queue')
                    : vName.toLowerCase().includes('stack')))
              ) {
                if (vVal.length > 0) {
                  items = vVal;
                  break;
                }
              }
            }
          }

          return (
            <div key={def.name} className="flex flex-col items-center gap-3">
              {/* Header Info */}
              <div className="flex items-center gap-2">
                <span className="bg-ink text-primary font-mono text-xs font-black px-2.5 py-0.5 rounded flex items-center gap-1.5 shadow-xs">
                  <Layers className="w-3.5 h-3.5" />
                  {def.label ?? (isQueue ? 'QUEUE' : 'STACK')}
                </span>
                <span className="text-ink-muted font-mono text-xs font-bold">
                  size = {items.length}
                </span>
              </div>

              {isQueue ? (
                /* HORIZONTAL QUEUE VISUALIZATION */
                <div className="flex flex-col items-center gap-2 w-full max-w-lg">
                  <div className="flex items-center justify-between w-full px-2 text-[10px] font-mono font-bold text-ink-muted">
                    <span className="text-danger">◀ FRONT (Dequeue)</span>
                    <span className="text-success">BACK (Enqueue) ◀</span>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-canvas border-y-3 border-ink rounded-lg min-h-[90px] w-full overflow-x-auto shadow-inner">
                    <AnimatePresence mode="popLayout">
                      {items.length === 0 ? (
                        <div className="w-full text-center font-mono text-xs text-ink-subtle italic py-3">
                          Queue is empty
                        </div>
                      ) : (
                        items.map((val, idx) => (
                          <motion.div
                            key={`${idx}_${String(val)}`}
                            initial={{ opacity: 0, x: 40, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -40, scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                            className="w-14 h-14 shrink-0 rounded-lg border-3 border-ink shadow-sm bg-surface flex flex-col items-center justify-center font-mono"
                          >
                            <span className="text-base font-black text-ink">{String(val)}</span>
                            <span className="text-[9px] text-ink-muted font-bold">idx {idx}</span>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                /* VERTICAL STACK VISUALIZATION */
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1 font-mono text-xs font-bold text-ink-muted">
                    <ArrowDown className="w-3.5 h-3.5 text-primary-hover animate-bounce" />
                    <span>TOP</span>
                  </div>

                  {/* Stack Bucket Container with open top */}
                  <div className="w-44 sm:w-56 min-h-[220px] max-h-[360px] bg-canvas border-b-4 border-x-4 border-ink rounded-b-xl p-3 flex flex-col-reverse gap-2 overflow-y-auto shadow-inner">
                    <AnimatePresence mode="popLayout">
                      {items.length === 0 ? (
                        <div className="m-auto flex flex-col items-center justify-center p-3 text-center font-mono">
                          <span className="text-xs text-ink-muted font-bold italic">
                            Stack is empty
                          </span>
                          <span className="text-[10px] text-ink-subtle mt-1 max-w-[150px] leading-tight">
                            Pushes occur when nested expressions, brackets, or values are parsed
                          </span>
                        </div>
                      ) : (
                        items.map((val, idx) => {
                          const isTop = idx === items.length - 1;
                          return (
                            <motion.div
                              key={`${idx}_${String(val)}`}
                              initial={{ opacity: 0, y: -30, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -30, scale: 0.8 }}
                              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                              className={`w-full py-2.5 rounded-lg border-3 border-ink shadow-sm flex items-center justify-between px-3 font-mono shrink-0 transition-all ${
                                isTop
                                  ? 'bg-primary text-ink font-black ring-2 ring-ink ring-offset-1'
                                  : 'bg-surface text-ink font-bold'
                              }`}
                            >
                              <span className="text-xs text-ink-muted">[{idx}]</span>
                              <span
                                className="text-sm font-black truncate max-w-[110px] sm:max-w-[140px]"
                                title={String(val)}
                              >
                                {String(val)}
                              </span>
                            </motion.div>
                          );
                        })
                      )}
                    </AnimatePresence>
                  </div>
                  <span className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-wider">
                    Stack Base
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
