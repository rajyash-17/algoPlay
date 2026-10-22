'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step, RendererConfig, LinkedListStructureSnapshot, Highlight } from '@/engine/types';
import { ArrowRight, CornerDownLeft, Repeat } from 'lucide-react';

interface LinkedListRendererProps {
  step: Step | null;
  config: RendererConfig;
}

export const LinkedListRenderer: React.FC<LinkedListRendererProps> = ({ step, config }) => {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-64 border-3 border-dashed border-ink rounded-lg bg-surface-muted text-ink-muted font-mono font-bold">
        Ready to trace linked list...
      </div>
    );
  }

  // Find target linked list structure
  const llStructure = (step.structures.find(
    (s) => s.name === config.primaryStructure && s.type === 'linked-list'
  ) || step.structures.find((s) => s.type === 'linked-list')) as LinkedListStructureSnapshot | undefined;

  if (!llStructure || llStructure.nodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-3 border-ink rounded-lg bg-surface-muted text-ink-muted font-mono p-6">
        <span className="font-bold text-ink">Empty List</span>
        <span className="text-xs text-ink-subtle mt-1">head = null</span>
      </div>
    );
  }

  const nodes = llStructure.nodes;
  const highlights = step.highlights;

  // Map pointer highlights by nodeId
  const pointersByNodeId = new Map<string, Highlight[]>();
  for (const h of highlights) {
    if (h.role === 'pointer' && h.nodeId) {
      const list = pointersByNodeId.get(h.nodeId) ?? [];
      list.push(h);
      pointersByNodeId.set(h.nodeId, list);
    }
  }

  return (
    <div className="w-full flex flex-col items-center p-6 bg-surface border-3 border-ink rounded-lg shadow-standard overflow-x-auto min-h-[320px]">
      {/* Header Info */}
      <div className="self-start mb-6 flex items-center gap-3">
        <span className="bg-ink text-primary font-mono text-xs font-bold px-2 py-0.5 rounded">
          LINKED LIST: {llStructure.name}
        </span>
        <span className="text-ink-muted font-mono text-xs font-medium">
          {nodes.length} {nodes.length === 1 ? 'node' : 'nodes'}
        </span>
        {llStructure.hasCycle && (
          <span className="bg-danger text-surface font-mono text-xs font-bold px-2 py-0.5 rounded border border-ink flex items-center gap-1">
            <Repeat className="w-3.5 h-3.5" />
            Cycle Detected
          </span>
        )}
      </div>

      {/* Nodes and Edges Row - Centered with m-auto, ample top clearance for pointer tags, and no clipping on overflow */}
      <div className="relative flex items-center gap-2 pt-20 pb-12 px-8 m-auto flex-nowrap">
        {nodes.map((node, idx) => {
          const pointers = pointersByNodeId.get(node.id) ?? [];
          const isCycleTarget = llStructure.cycleTargetId === node.id;
          const nextNodeExists = nodes.some((n) => n.id === node.nextId);

          return (
            <React.Fragment key={node.id}>
              {/* Node container */}
              <div className="relative flex flex-col items-center">
                {/* Floating Pointer Badges */}
                <div className="absolute -top-14 flex flex-col items-center gap-1 z-20">
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
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-ink" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Node Box */}
                <motion.div
                  layout
                  layoutId={node.id}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`w-16 h-16 rounded-xl border-3 border-ink shadow-standard flex flex-col items-center justify-center font-mono select-none transition-colors ${
                    isCycleTarget ? 'bg-danger/20 border-danger' : 'bg-surface'
                  }`}
                >
                  <span className="text-xl font-black text-ink">
                    {String(node.val ?? '')}
                  </span>
                  <span className="text-[9px] font-bold text-ink-subtle">
                    {node.id}
                  </span>
                </motion.div>

                {/* Random pointer indicator if present */}
                {node.randomId && (
                  <div className="mt-1 font-mono text-[10px] font-bold text-purple bg-purple/10 px-1 rounded border border-purple/40">
                    rand ➔ {node.randomId}
                  </div>
                )}
              </div>

              {/* Edge arrow to next node or null */}
              <div className="flex items-center px-1">
                {node.nextId ? (
                  nextNodeExists ? (
                    <motion.div
                      layout
                      className="flex items-center text-ink"
                    >
                      <div className="w-6 h-0.5 bg-ink" />
                      <ArrowRight className="w-4 h-4 -ml-1" />
                    </motion.div>
                  ) : (
                    <div className="flex items-center text-ink-muted font-mono text-xs">
                      <ArrowRight className="w-4 h-4" />
                      <span className="text-[10px] font-bold">{node.nextId}</span>
                    </div>
                  )
                ) : (
                  <div className="flex items-center text-ink-muted font-mono text-xs px-1">
                    <div className="w-4 h-0.5 bg-ink mr-1" />
                    <span className="bg-surface-muted px-1.5 py-0.5 rounded border border-ink/40 font-bold text-[10px]">
                      NULL
                    </span>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Cycle back-edge banner if cycle detected */}
      {llStructure.hasCycle && llStructure.cycleTargetId && (
        <div className="mt-4 bg-danger/10 border-2 border-danger rounded-lg px-4 py-2 flex items-center gap-2 font-mono text-xs font-bold text-danger">
          <CornerDownLeft className="w-4 h-4" />
          <span>Tail links backward to node: {llStructure.cycleTargetId}</span>
        </div>
      )}

      {/* Footer Role Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 pt-3 border-t-2 border-surface-muted text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-ink text-primary flex items-center justify-center text-[9px] rounded font-bold">
            P
          </span>
          <span>Active Pointer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ArrowRight className="w-4 h-4 text-ink" />
          <span>Next Edge</span>
        </div>
        {llStructure.hasCycle && (
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-danger/20 border border-danger rounded" />
            <span>Cycle Target</span>
          </div>
        )}
      </div>
    </div>
  );
};
