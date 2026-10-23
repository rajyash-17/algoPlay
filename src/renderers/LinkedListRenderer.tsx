'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step, RendererConfig, LinkedListStructureSnapshot, Highlight } from '@/engine/types';
import { ArrowRight, CornerDownLeft, Repeat, GitCommit } from 'lucide-react';

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

  // Find all linked list structures (support multi-list problems like merge-two-sorted-lists, add-two-numbers, partition-list)
  let llStructures = step.structures.filter(
    (s) => s.type === 'linked-list'
  ) as LinkedListStructureSnapshot[];

  // Fallback to primary structure if none explicitly filtered
  if (llStructures.length === 0) {
    const primary = step.structures.find((s) => s.name === config.primaryStructure) as LinkedListStructureSnapshot | undefined;
    if (primary && primary.type === 'linked-list') {
      llStructures = [primary];
    }
  }

  if (llStructures.length === 0 || llStructures.every((s) => s.nodes.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-3 border-ink rounded-lg bg-surface-muted text-ink-muted font-mono p-6">
        <span className="font-bold text-ink">Empty List</span>
        <span className="text-xs text-ink-subtle mt-1">head = null</span>
      </div>
    );
  }

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
    <div className="w-full flex flex-col items-center gap-6 p-6 bg-surface border-3 border-ink rounded-lg shadow-standard overflow-x-auto min-h-[320px]">
      {llStructures.map((llStructure) => {
        const nodes = llStructure.nodes;
        if (nodes.length === 0) return null;

        return (
          <div
            key={llStructure.name}
            className="w-full flex flex-col items-center bg-canvas/40 border-2 border-ink/40 rounded-xl p-4 shadow-sm"
          >
            {/* Header Info */}
            <div className="self-start mb-4 flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="bg-ink text-primary font-mono text-xs font-black px-2.5 py-0.5 rounded shadow-xs flex items-center gap-1.5">
                  <GitCommit className="w-3.5 h-3.5" />
                  {llStructure.name.toUpperCase()}
                </span>
                <span className="text-ink-muted font-mono text-xs font-bold">
                  {nodes.length} {nodes.length === 1 ? 'node' : 'nodes'}
                </span>
              </div>

              {llStructure.hasCycle && (
                <span className="bg-danger text-surface font-mono text-xs font-black px-2.5 py-0.5 rounded border border-ink flex items-center gap-1 shadow-xs">
                  <Repeat className="w-3.5 h-3.5" />
                  Cycle Present
                </span>
              )}
            </div>

            {/* Nodes and Edges Row */}
            <div className="relative flex items-center gap-2 pt-20 pb-10 px-8 m-auto flex-nowrap overflow-x-auto max-w-full">
              {nodes.map((node, idx) => {
                const pointers = pointersByNodeId.get(node.id) ?? [];
                const isCycleTarget = llStructure.cycleTargetId === node.id;
                const nextNode = nodes[idx + 1];
                const isDirectSuccessor = nextNode && nextNode.id === node.nextId;
                const isDummyNode = String(node.val) === '0' && idx === 0 && (llStructure.name.toLowerCase().includes('dummy') || llStructure.name.toLowerCase().includes('sentinel'));

                return (
                  <React.Fragment key={node.id}>
                    {/* Node box container */}
                    <div className="relative flex flex-col items-center shrink-0">
                      {/* Floating Pointer Badges */}
                      <div className="absolute -top-16 flex flex-col items-center gap-1 z-20">
                        <AnimatePresence>
                          {pointers.map((p, pIdx) => (
                            <motion.div
                              key={p.label ?? pIdx}
                              initial={{ opacity: 0, y: -8, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                              className="flex flex-col items-center"
                            >
                              <div className="bg-ink text-primary font-mono text-xs font-black px-2 py-0.5 rounded shadow-sm border border-primary flex items-center gap-1 whitespace-nowrap">
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
                        className={`w-16 h-16 rounded-xl border-3 border-ink shadow-standard flex flex-col items-center justify-center font-mono select-none transition-all ${
                          isCycleTarget
                            ? 'bg-danger/20 border-danger ring-4 ring-danger/30'
                            : isDummyNode
                            ? 'bg-accent/30 border-dashed border-ink text-ink-muted'
                            : node.isDetached
                            ? 'bg-surface-muted border-dashed border-ink/60 opacity-60'
                            : 'bg-surface'
                        }`}
                      >
                        <span className="text-xl font-black text-ink">
                          {isDummyNode ? '0' : String(node.val ?? '')}
                        </span>
                        <span className="text-[9px] font-bold text-ink-muted">
                          {isDummyNode ? 'dummy' : node.id}
                        </span>
                      </motion.div>

                      {/* Random pointer indicator if present */}
                      {node.randomId && (
                        <div className="mt-1 font-mono text-[9px] font-black text-purple bg-purple/10 px-1.5 py-0.5 rounded border border-purple/40 whitespace-nowrap">
                          rand ➔ {node.randomId}
                        </div>
                      )}
                    </div>

                    {/* Edge arrow to next node or null */}
                    <div className="flex items-center px-1 shrink-0">
                      {node.nextId ? (
                        isDirectSuccessor ? (
                          <motion.div layout className="flex items-center text-ink">
                            <div className="w-6 h-0.5 bg-ink" />
                            <ArrowRight className="w-4 h-4 -ml-1 text-ink" />
                          </motion.div>
                        ) : (
                          <div className="flex items-center gap-1 text-ink-muted font-mono text-xs bg-accent/20 px-1.5 py-0.5 rounded border border-ink/30">
                            <ArrowRight className="w-3.5 h-3.5 text-ink" />
                            <span className="text-[9px] font-black text-ink">
                              {node.nextId === llStructure.cycleTargetId ? `CYCLE ➔ ${node.nextId}` : `➔ ${node.nextId}`}
                            </span>
                          </div>
                        )
                      ) : (
                        <div className="flex items-center text-ink-muted font-mono text-xs px-1">
                          <div className="w-4 h-0.5 bg-ink mr-1" />
                          <span className="bg-surface-muted px-1.5 py-0.5 rounded border border-ink/40 font-black text-[9px] text-ink-muted">
                            NULL
                          </span>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Cycle back-edge banner */}
            {llStructure.hasCycle && llStructure.cycleTargetId && (
              <div className="mt-3 bg-danger/10 border-2 border-danger rounded-lg px-3 py-1.5 flex items-center gap-2 font-mono text-xs font-bold text-danger">
                <CornerDownLeft className="w-4 h-4" />
                <span>Tail links backward to node: {llStructure.cycleTargetId}</span>
              </div>
            )}
          </div>
        );
      })}

      {/* Role Legend */}
      <div className="w-full flex flex-wrap items-center justify-center gap-4 pt-3 border-t-2 border-surface-muted text-xs font-mono">
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
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-accent/30 border border-dashed border-ink rounded" />
          <span>Sentinel / Dummy Node</span>
        </div>
      </div>
    </div>
  );
};
