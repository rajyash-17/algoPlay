'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step, RendererConfig, ArrayStructureSnapshot, StackStructureSnapshot, QueueStructureSnapshot } from '@/engine/types';
import { ArrowDown, ArrowRight, Layers } from 'lucide-react';

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

  // Determine which structure to render
  const primaryDef = config.structures.find((s) => s.name === config.primaryStructure) || config.structures[0];
  const isQueue = primaryDef?.type === 'queue';

  // Find structure snapshot or array in variables
  const structSnapshot = step.structures.find(
    (s) => s.name === config.primaryStructure || s.type === (isQueue ? 'queue' : 'stack') || s.type === 'array'
  );

  let items: unknown[] = [];
  if (structSnapshot) {
    if (structSnapshot.type === 'stack') items = (structSnapshot as StackStructureSnapshot).items;
    else if (structSnapshot.type === 'queue') items = (structSnapshot as QueueStructureSnapshot).items;
    else if (structSnapshot.type === 'array') items = (structSnapshot as ArrayStructureSnapshot).values;
  } else if (Array.isArray(step.vars[config.primaryStructure])) {
    items = step.vars[config.primaryStructure] as unknown[];
  }

  // Check last operation from step highlights
  const lastOpHighlight = step.highlights.find((h) => h.operation);
  const lastOp = lastOpHighlight?.operation;

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-surface border-3 border-ink rounded-lg shadow-standard min-h-[340px]">
      {/* Header Info */}
      <div className="self-start mb-6 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <span className="bg-ink text-primary font-mono text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            {isQueue ? 'QUEUE' : 'STACK'}: {primaryDef?.name ?? config.primaryStructure}
          </span>
          <span className="text-ink-muted font-mono text-xs font-medium">
            size = {items.length}
          </span>
        </div>

        {/* Operation Alert Badge */}
        {lastOp && (
          <span className="bg-accent text-ink font-mono text-xs font-black px-2.5 py-0.5 rounded border-2 border-ink shadow-sm uppercase tracking-wide">
            OP: {lastOp}
          </span>
        )}
      </div>

      {isQueue ? (
        /* HORIZONTAL QUEUE VISUALIZATION */
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center justify-between w-full max-w-lg px-4 text-xs font-mono font-bold text-ink-muted">
            <span className="flex items-center gap-1 text-danger">
              ◀ FRONT (Dequeue)
            </span>
            <span className="flex items-center gap-1 text-success">
              BACK (Enqueue) ◀
            </span>
          </div>

          {/* Queue Tube */}
          <div className="flex items-center gap-3 p-4 bg-canvas border-y-3 border-ink rounded-lg min-h-[90px] w-full max-w-lg overflow-x-auto shadow-inner">
            <AnimatePresence mode="popLayout">
              {items.length === 0 ? (
                <div className="w-full text-center font-mono text-xs text-ink-subtle italic">
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
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-1 font-mono text-xs font-bold text-ink-muted">
            <ArrowDown className="w-4 h-4 text-primary-hover animate-bounce" />
            <span>TOP OF STACK</span>
          </div>

          {/* Stack Bucket Container with open top */}
          <div className="w-36 min-h-[200px] max-h-[320px] bg-canvas border-b-4 border-x-4 border-ink rounded-b-xl p-3 flex flex-col-reverse gap-2 overflow-y-auto shadow-inner">
            <AnimatePresence mode="popLayout">
              {items.length === 0 ? (
                <div className="m-auto text-center font-mono text-xs text-ink-subtle italic">
                  Stack is empty
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
                      className={`w-full py-2.5 rounded-lg border-3 border-ink shadow-sm flex items-center justify-between px-3 font-mono ${
                        isTop ? 'bg-primary text-ink font-black' : 'bg-surface text-ink font-bold'
                      }`}
                    >
                      <span className="text-xs text-ink-muted">[{idx}]</span>
                      <span className="text-sm font-black">{String(val)}</span>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
          <span className="font-mono text-[10px] font-bold text-ink-muted uppercase tracking-wider">
            Stack Base
          </span>
        </div>
      )}
    </div>
  );
};
