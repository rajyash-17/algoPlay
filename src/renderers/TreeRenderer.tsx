'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step, RendererConfig, TreeStructureSnapshot, TreeNodeSnapshot, Highlight } from '@/engine/types';
import { Layers, Activity, CheckCircle2, GitBranch, ZoomIn, ZoomOut } from 'lucide-react';

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

interface TreeCanvasProps {
  step: Step;
  treeStructure: TreeStructureSnapshot;
  config: RendererConfig;
}

const TreeCanvas: React.FC<TreeCanvasProps> = ({ step, treeStructure, config }) => {
  const [zoom, setZoom] = useState<number>(1);

  const nodes = treeStructure.nodes;
  const rootId = treeStructure.rootId!;
  const highlights = step.highlights;

  const visitedSet = useMemo(() => {
    return new Set(treeStructure.visitedIds ?? []);
  }, [treeStructure.visitedIds]);

  // Map pointer highlights by nodeId
  const pointersByNodeId = useMemo(() => {
    const map = new Map<string, Highlight[]>();
    for (const h of highlights) {
      if (h.role === 'pointer' && h.nodeId) {
        const list = map.get(h.nodeId) ?? [];
        list.push(h);
        map.set(h.nodeId, list);
      }
    }
    return map;
  }, [highlights]);

  // Detect traversal output array in step.vars (e.g. res, result, ans, order, output, vals, averages)
  const traversalResult = useMemo(() => {
    for (const [key, val] of Object.entries(step.vars)) {
      if (
        ['res', 'result', 'ans', 'order', 'output', 'vals', 'averages'].includes(key) &&
        Array.isArray(val)
      ) {
        return { name: key, values: val };
      }
    }
    return null;
  }, [step.vars]);

  // Detect active evaluation variables for current frame
  const localEvaluations = useMemo(() => {
    const pills: Array<{ key: string; val: string }> = [];
    const watchKeys = [
      'depth',
      'leftDepth',
      'rightDepth',
      'currentSum',
      'remaining',
      'maxSum',
      'diff',
      'minDiff',
      'count',
      'isMatch',
      'targetSum',
    ];

    for (const key of watchKeys) {
      if (key in step.vars && step.vars[key] !== undefined && step.vars[key] !== null) {
        const v = step.vars[key];
        pills.push({
          key,
          val: typeof v === 'boolean' ? (v ? 'true' : 'false') : String(v),
        });
      }
    }
    return pills;
  }, [step.vars]);

  // Compute 2D tidy layout coordinates for binary tree with generous margins
  const { layoutNodes, svgWidth, svgHeight, parentMap } = useMemo(() => {
    const nodeMap = new Map<string, TreeNodeSnapshot>();
    for (const n of nodes) nodeMap.set(n.id, n);

    const layoutList: LayoutNode[] = [];
    const pMap: Map<string, string> = new Map<string, string>(); // childId -> parentId
    const LEVEL_HEIGHT = 85;
    const X_SPACING = 80;
    const START_X = 120; // 120px left margin ensures pills and badges are never clipped
    const START_Y = 75; // 75px top margin ensures floating active tags never clip top boundary
    let nextX = 0;

    // In-order traversal produces natural left-to-right horizontal coordinates
    function layoutSubtree(nodeId: string | null, depth: number, parentId: string | null): number | null {
      if (!nodeId) return null;
      const node = nodeMap.get(nodeId);
      if (!node) return null;

      if (parentId) {
        pMap.set(nodeId, parentId);
      }

      // 1. Layout left child
      layoutSubtree(node.leftId, depth + 1, nodeId);

      // 2. Assign current node x with ample margin
      const x = nextX * X_SPACING + START_X;
      nextX++;

      // 3. Layout right child
      layoutSubtree(node.rightId, depth + 1, nodeId);

      const y = depth * LEVEL_HEIGHT + START_Y;

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

    layoutSubtree(rootId, 0, null);

    const maxX = Math.max(...layoutList.map((n) => n.x), 260) + 140;
    const maxY = Math.max(...layoutList.map((n) => n.y), 180) + 120;

    return {
      layoutNodes: layoutList,
      svgWidth: Math.max(maxX, 520),
      svgHeight: Math.max(maxY, 280),
      parentMap: pMap,
    };
  }, [nodes, rootId]);

  const layoutMap = useMemo(() => {
    const map = new Map<string, LayoutNode>();
    for (const n of layoutNodes) map.set(n.id, n);
    return map;
  }, [layoutNodes]);

  // Identify active recursion branch path (ancestor chain of focused node)
  const activeBranchEdges = useMemo(() => {
    const activeEdgeKeys = new Set<string>();

    for (const [focusedNodeId] of pointersByNodeId.entries()) {
      let currId: string | undefined = focusedNodeId;
      while (currId && parentMap.has(currId)) {
        const parentId: string = parentMap.get(currId)!;
        activeEdgeKeys.add(`${parentId}->${currId}`);
        currId = parentId;
      }
    }

    return activeEdgeKeys;
  }, [pointersByNodeId, parentMap]);

  const callStack = step.callStack ?? [];

  return (
    <div className="w-full flex flex-col items-center justify-center p-5 bg-surface border-3 border-ink rounded-xl shadow-standard overflow-hidden min-h-[420px]">
      {/* Tree header controls bar */}
      <div className="self-start mb-4 flex flex-wrap items-center justify-between gap-3 w-full border-b-2 border-ink/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-ink text-primary font-mono text-xs font-black px-2.5 py-1 rounded shadow-sm border border-primary">
            <GitBranch className="w-3.5 h-3.5" />
            <span>TREE: {treeStructure.name}</span>
          </div>
          <span className="text-ink-muted font-mono text-xs font-bold bg-surface-muted px-2 py-0.5 rounded border border-ink/20">
            {nodes.length} {nodes.length === 1 ? 'node' : 'nodes'}
          </span>
          {visitedSet.size > 0 && (
            <span className="text-emerald-700 bg-emerald-100 font-mono text-xs font-black px-2 py-0.5 rounded border border-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {visitedSet.size} explored
            </span>
          )}
        </div>

        {/* Traversal Result Stream Panel */}
        {traversalResult && (
          <div className="flex items-center gap-2 bg-canvas px-3 py-1 border-2 border-ink rounded shadow-sm">
            <span className="font-mono text-xs font-black text-ink uppercase tracking-wider">
              {traversalResult.name}:
            </span>
            <div className="flex items-center gap-1">
              {traversalResult.values.map((v, idx) => (
                <motion.span
                  key={`${idx}_${v}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="font-mono text-xs font-black bg-primary text-ink px-1.5 py-0.5 rounded border border-ink shadow-xs"
                >
                  {Array.isArray(v) ? `[${v.join(',')}]` : String(v)}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Zoom & Call Stack Controls */}
        <div className="flex items-center gap-2">
          {callStack.length > 0 && (
            <div className="flex items-center gap-1 bg-purple-50 border-2 border-ink px-2.5 py-1 rounded shadow-sm font-mono text-xs font-bold text-purple-900">
              <Layers className="w-3.5 h-3.5 text-purple-700" />
              <span>Depth: {callStack.length}</span>
            </div>
          )}

          {/* Interactive Zoom Bar */}
          <div className="flex items-center border-2 border-ink rounded bg-surface shadow-sm font-mono text-xs">
            <button
              onClick={() => setZoom((z) => Math.max(0.65, Number((z - 0.15).toFixed(2))))}
              title="Zoom Out"
              className="p-1 hover:bg-surface-muted border-r border-ink text-ink font-black"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(1)}
              title="Reset Zoom"
              className="px-1.5 text-[11px] font-bold text-ink hover:bg-surface-muted border-r border-ink"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(1.5, Number((z + 0.15).toFixed(2))))}
              title="Zoom In"
              className="p-1 hover:bg-surface-muted text-ink font-black"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Tree Canvas with Zoom Scale */}
      <div className="w-full flex-1 overflow-x-auto overflow-y-visible flex items-center justify-center py-4">
        <div
          className="relative transition-transform duration-200 ease-out select-none"
          style={{
            minHeight: svgHeight,
            minWidth: svgWidth,
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
          }}
        >
          {/* SVG Edge connecting lines */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={svgWidth}
            height={svgHeight}
          >
            <defs>
              <linearGradient id="activeBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE600" />
                <stop offset="100%" stopColor="#00F0A0" />
              </linearGradient>
            </defs>

            {layoutNodes.map((n) => {
              const leftChild = n.leftId ? layoutMap.get(n.leftId) : null;
              const rightChild = n.rightId ? layoutMap.get(n.rightId) : null;

              return (
                <React.Fragment key={`edges_${n.id}`}>
                  {/* Left Branch */}
                  {leftChild && (
                    <>
                      {/* Base Solid Branch */}
                      <line
                        x1={n.x}
                        y1={n.y}
                        x2={leftChild.x}
                        y2={leftChild.y}
                        stroke="#121212"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Animated Active Traversal Beam Overlay */}
                      {activeBranchEdges.has(`${n.id}->${leftChild.id}`) && (
                        <motion.line
                          x1={n.x}
                          y1={n.y}
                          x2={leftChild.x}
                          y2={leftChild.y}
                          stroke="url(#activeBeam)"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray="6 4"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0.7, 1, 0.7],
                            strokeDashoffset: [0, -20],
                          }}
                          transition={{
                            opacity: { repeat: Infinity, duration: 1.2 },
                            strokeDashoffset: { repeat: Infinity, duration: 0.8, ease: 'linear' },
                          }}
                        />
                      )}
                    </>
                  )}

                  {/* Right Branch */}
                  {rightChild && (
                    <>
                      {/* Base Solid Branch */}
                      <line
                        x1={n.x}
                        y1={n.y}
                        x2={rightChild.x}
                        y2={rightChild.y}
                        stroke="#121212"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Animated Active Traversal Beam Overlay */}
                      {activeBranchEdges.has(`${n.id}->${rightChild.id}`) && (
                        <motion.line
                          x1={n.x}
                          y1={n.y}
                          x2={rightChild.x}
                          y2={rightChild.y}
                          stroke="url(#activeBeam)"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray="6 4"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0.7, 1, 0.7],
                            strokeDashoffset: [0, -20],
                          }}
                          transition={{
                            opacity: { repeat: Infinity, duration: 1.2 },
                            strokeDashoffset: { repeat: Infinity, duration: 0.8, ease: 'linear' },
                          }}
                        />
                      )}
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </svg>

          {/* Tree Node Elements */}
          {layoutNodes.map((n) => {
            const pointers = pointersByNodeId.get(n.id) ?? [];
            const isFocused = pointers.length > 0;
            const isVisited = visitedSet.has(n.id);

            return (
              <div
                key={n.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: n.x - 26,
                  top: n.y - 26,
                }}
              >
                {/* Floating Pointer Badges with Spring Physics */}
                <div className="absolute -top-12 flex flex-col items-center gap-1 z-30 pointer-events-none">
                  <AnimatePresence>
                    {pointers.map((p, pIdx) => (
                      <motion.div
                        key={p.label ?? pIdx}
                        initial={{ opacity: 0, y: -12, scale: 0.6 }}
                        animate={{
                          opacity: 1,
                          y: [0, -3, 0],
                          scale: 1,
                        }}
                        exit={{ opacity: 0, scale: 0.6, y: -6 }}
                        transition={{
                          type: 'spring',
                          stiffness: 450,
                          damping: 22,
                          y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
                        }}
                        className="flex flex-col items-center"
                      >
                        <div className="bg-ink text-primary font-mono text-[10px] font-black px-2 py-0.5 rounded shadow-standard border-2 border-primary flex items-center gap-1 whitespace-nowrap">
                          <Activity className="w-3 h-3 text-primary animate-pulse" />
                          <span>{p.label ?? 'active'}</span>
                        </div>
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-ink" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Neo-brutalist Node Circle with Animated Glow & Transitions */}
                <motion.div
                  layout
                  layoutId={n.id}
                  initial={false}
                  animate={{
                    scale: isFocused ? [1, 1.18, 1.12] : 1,
                    rotate: isFocused ? [0, -2, 2, 0] : 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 22,
                  }}
                  className={`relative w-[52px] h-[52px] rounded-full border-3 border-ink flex items-center justify-center font-mono text-base font-black transition-all z-20 ${
                    isFocused
                      ? 'bg-primary text-ink ring-4 ring-ink ring-offset-2 ring-offset-canvas shadow-large font-black'
                      : isVisited
                      ? 'bg-emerald-100 text-emerald-950 shadow-standard'
                      : 'bg-surface text-ink shadow-standard'
                  }`}
                >
                  {/* Node Value */}
                  <span>{n.val}</span>

                  {/* Explored Checkmark Badge */}
                  {isVisited && !isFocused && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full border border-ink flex items-center justify-center text-[9px] font-black"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>

                {/* Floating Return Value / Variable Evaluator Pill */}
                {isFocused && localEvaluations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="absolute -bottom-9 flex items-center justify-center gap-1.5 z-30 pointer-events-none whitespace-nowrap"
                  >
                    {localEvaluations.slice(0, 2).map((evalItem) => (
                      <div
                        key={evalItem.key}
                        className="bg-accent text-ink border-2 border-ink rounded font-mono text-[9px] font-black px-2 py-0.5 shadow-xs whitespace-nowrap flex items-center gap-1"
                      >
                        <span className="opacity-75">{evalItem.key}:</span>
                        <span>{evalItem.val}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational Footer Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-5 pt-3 border-t-2 border-ink/10 text-xs font-mono font-bold text-ink-muted">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-ink" />
          <span>Active Node</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 border-2 border-ink flex items-center justify-center text-[8px] text-emerald-700">
            ✓
          </div>
          <span>Explored / Visited</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-surface border-2 border-ink" />
          <span>Pending Subtree</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-1 bg-gradient-to-r from-primary to-accent rounded" />
          <span>Active Call Path</span>
        </div>
      </div>
    </div>
  );
};

export const TreeRenderer: React.FC<TreeRendererProps> = ({ step, config }) => {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-80 border-3 border-dashed border-ink rounded-lg bg-surface-muted text-ink-muted font-mono font-bold">
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
      <div className="flex flex-col items-center justify-center h-80 border-3 border-ink rounded-lg bg-surface-muted text-ink-muted font-mono p-6 shadow-standard">
        <span className="font-bold text-ink text-lg">Empty Tree</span>
        <span className="text-xs text-ink-subtle mt-1 font-mono">root = null</span>
      </div>
    );
  }

  return <TreeCanvas step={step} treeStructure={treeStructure} config={config} />;
};
