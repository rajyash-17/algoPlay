'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step, RendererConfig, TreeStructureSnapshot, TreeNodeSnapshot, Highlight } from '@/engine/types';

interface TreeRendererProps {
  step: Step | null;
  config: RendererConfig;
}

interface LayoutNode {
  id: string;
  val: string;
  x: number;
  y: number;
  leftId: string | null;
  rightId: string | null;
}

export const TreeRenderer: React.FC<TreeRendererProps> = ({ step, config }) => {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-72 border-3 border-dashed border-ink rounded-lg bg-surface-muted text-ink-muted font-mono font-bold">
        Ready to trace binary tree...
      </div>
    );
  }

  // Find target tree structure
  const treeStructure = (step.structures.find(
    (s) => s.name === config.primaryStructure && s.type === 'tree'
  ) || step.structures.find((s) => s.type === 'tree')) as TreeStructureSnapshot | undefined;

  if (!treeStructure || treeStructure.nodes.length === 0 || !treeStructure.rootId) {
    return (
      <div className="flex flex-col items-center justify-center h-72 border-3 border-ink rounded-lg bg-surface-muted text-ink-muted font-mono p-6">
        <span className="font-bold text-ink">Empty Tree</span>
        <span className="text-xs text-ink-subtle mt-1">root = null</span>
      </div>
    );
  }

  const nodes = treeStructure.nodes;
  const rootId = treeStructure.rootId;
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

  // Detect traversal output array in step.vars (e.g. res, result, ans, order)
  const traversalResult = useMemo(() => {
    for (const [key, val] of Object.entries(step.vars)) {
      if (['res', 'result', 'ans', 'order', 'output', 'vals'].includes(key) && Array.isArray(val)) {
        return { name: key, values: val };
      }
    }
    return null;
  }, [step.vars]);

  // Compute 2D tidy layout coordinates for binary tree
  const { layoutNodes, svgWidth, svgHeight } = useMemo(() => {
    const nodeMap = new Map<string, TreeNodeSnapshot>();
    for (const n of nodes) nodeMap.set(n.id, n);

    const layoutList: LayoutNode[] = [];
    const LEVEL_HEIGHT = 75;
    let nextX = 0;
    const X_SPACING = 65;

    // In-order traversal gives clean, non-overlapping horizontal coordinates
    function layoutSubtree(nodeId: string | null, depth: number): number | null {
      if (!nodeId) return null;
      const node = nodeMap.get(nodeId);
      if (!node) return null;

      // 1. Layout left child
      layoutSubtree(node.leftId, depth + 1);

      // 2. Assign current node x
      const x = nextX * X_SPACING + 40;
      nextX++;

      // 3. Layout right child
      layoutSubtree(node.rightId, depth + 1);

      const y = depth * LEVEL_HEIGHT + 50;

      layoutList.push({
        id: node.id,
        val: String(node.val ?? ''),
        x,
        y,
        leftId: node.leftId,
        rightId: node.rightId,
      });

      return x;
    }

    layoutSubtree(rootId, 0);

    const maxX = Math.max(...layoutList.map((n) => n.x), 200) + 50;
    const maxY = Math.max(...layoutList.map((n) => n.y), 150) + 50;

    return {
      layoutNodes: layoutList,
      svgWidth: Math.max(maxX, 400),
      svgHeight: Math.max(maxY, 240),
    };
  }, [nodes, rootId]);

  const layoutMap = useMemo(() => {
    const map = new Map<string, LayoutNode>();
    for (const n of layoutNodes) map.set(n.id, n);
    return map;
  }, [layoutNodes]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-surface border-3 border-ink rounded-lg shadow-standard overflow-x-auto min-h-[360px]">
      {/* Tree header banner */}
      <div className="self-start mb-4 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <span className="bg-ink text-primary font-mono text-xs font-bold px-2 py-0.5 rounded">
            TREE: {treeStructure.name}
          </span>
          <span className="text-ink-muted font-mono text-xs font-medium">
            {nodes.length} {nodes.length === 1 ? 'node' : 'nodes'}
          </span>
        </div>

        {/* Traversal Result Stream Panel */}
        {traversalResult && (
          <div className="flex items-center gap-2 bg-canvas px-3 py-1 border-2 border-ink rounded shadow-sm">
            <span className="font-mono text-xs font-bold text-ink">
              {traversalResult.name}:
            </span>
            <span className="font-mono text-xs font-black text-secondary">
              [{traversalResult.values.join(', ')}]
            </span>
          </div>
        )}
      </div>

      {/* Main SVG and Node Canvas */}
      <div
        className="relative flex items-center justify-center overflow-x-auto w-full"
        style={{ minHeight: svgHeight, minWidth: svgWidth }}
      >
        {/* SVG Edge connecting lines */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={svgWidth}
          height={svgHeight}
        >
          {layoutNodes.map((n) => {
            const leftChild = n.leftId ? layoutMap.get(n.leftId) : null;
            const rightChild = n.rightId ? layoutMap.get(n.rightId) : null;

            return (
              <React.Fragment key={`edges_${n.id}`}>
                {leftChild && (
                  <line
                    x1={n.x}
                    y1={n.y}
                    x2={leftChild.x}
                    y2={leftChild.y}
                    stroke="#121212"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )}
                {rightChild && (
                  <line
                    x1={n.x}
                    y1={n.y}
                    x2={rightChild.x}
                    y2={rightChild.y}
                    stroke="#121212"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )}
              </React.Fragment>
            );
          })}
        </svg>

        {/* Node Circles with Framer Motion positioning */}
        {layoutNodes.map((n) => {
          const pointers = pointersByNodeId.get(n.id) ?? [];
          const isFocused = pointers.length > 0;

          return (
            <div
              key={n.id}
              className="absolute flex flex-col items-center"
              style={{
                left: n.x - 24,
                top: n.y - 24,
              }}
            >
              {/* Floating Pointer Badges */}
              <div className="absolute -top-12 flex flex-col items-center gap-0.5 z-20">
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
                      <div className="bg-ink text-primary font-mono text-[10px] font-black px-2 py-0.5 rounded shadow-sm border border-primary">
                        {p.label ?? 'ptr'}
                      </div>
                      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-ink" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Node Circle */}
              <motion.div
                layout
                layoutId={n.id}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`w-12 h-12 rounded-full border-3 border-ink shadow-standard flex items-center justify-center font-mono text-base font-black select-none transition-colors z-10 ${
                  isFocused ? 'bg-primary text-ink' : 'bg-surface text-ink'
                }`}
              >
                {n.val}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
