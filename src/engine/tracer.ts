import {
  Step,
  Snapshot,
  Highlight,
  StructureSnapshot,
  RendererConfig,
  TraceConfig,
  ArrayStructureSnapshot,
} from './types';
import { createSnapshot, extractStructureSnapshot, NodeIdRegistry } from './snapshot';

export class Tracer {
  private steps: Step[] = [];
  private currentLine: number = 1;
  private currentVars: Map<string, unknown> = new Map();
  private trackedStructures: Map<string, unknown> = new Map();
  private activeHighlights: Highlight[] = [];
  private pendingNote: string | undefined = undefined;
  private maxSteps: number;
  private stepCount: number = 0;
  private rendererConfig?: RendererConfig;
  private nodeRegistry: NodeIdRegistry = new NodeIdRegistry();
  private visitedNodeIds: Set<string> = new Set();
  private scopeStack: Array<{
    funcName: string;
    savedParams: Map<string, unknown>;
    argsSnapshot: Record<string, Snapshot>;
  }> = [];

  constructor(rendererConfig?: RendererConfig, traceConfig?: TraceConfig) {
    this.rendererConfig = rendererConfig;
    this.maxSteps = traceConfig?.maxSteps ?? 5000;
  }

  /**
   * Called by instrumented code when entering a function scope
   */
  public onEnter(funcName: string, params: Record<string, unknown>): void {
    const savedParams = new Map<string, unknown>();
    const argsSnapshot: Record<string, Snapshot> = {};

    for (const [key, value] of Object.entries(params)) {
      if (this.currentVars.has(key)) {
        savedParams.set(key, this.currentVars.get(key));
      }
      this.currentVars.set(key, value);
      argsSnapshot[key] = createSnapshot(value);

      // Register initial tree structure reference if not already present
      if (value && typeof value === 'object' && ('left' in value || 'right' in value)) {
        if (!this.trackedStructures.has(key)) {
          this.trackedStructures.set(key, value);
        }
      }
    }

    this.scopeStack.push({
      funcName,
      savedParams,
      argsSnapshot,
    });
  }

  /**
   * Called by instrumented code when exiting a function scope
   */
  public onExit(_funcName?: string): void {
    const frame = this.scopeStack.pop();
    if (!frame) return;

    // Restore the parameter state of caller's frame
    for (const [key, prevVal] of frame.savedParams.entries()) {
      this.currentVars.set(key, prevVal);
    }
  }

  /**
   * Called by instrumented code before executing a line
   */
  public onLine(line: number): void {
    this.stepCount++;
    if (this.stepCount > this.maxSteps) {
      throw new Error(`Execution step limit exceeded (${this.maxSteps} steps). Possible infinite loop.`);
    }

    this.currentLine = line;
    this.recordStep();
  }

  /**
   * Called by instrumented code when a variable is declared or updated
   */
  public onAssign(name: string, value: unknown): void {
    this.currentVars.set(name, value);

    if (
      Array.isArray(value) ||
      (value && typeof value === 'object' && ('__rawTarget' in value || 'next' in value || 'left' in value || 'right' in value))
    ) {
      const existing = this.trackedStructures.get(name);
      // For tree structures, retain the ancestor root so the full tree layout is preserved
      if (existing && typeof existing === 'object' && ('left' in existing || 'right' in existing)) {
        // Keep existing tree root as structure container
      } else {
        this.trackedStructures.set(name, value);
      }
    }
  }

  /**
   * Called by solution code: note("Searching right half")
   */
  public note(text: string): void {
    this.pendingNote = text;
    if (this.steps.length > 0) {
      const lastStep = this.steps[this.steps.length - 1];
      if (lastStep) {
        lastStep.note = text;
      }
    }
  }

  /**
   * Wraps an array with a recording Proxy to intercept reads, writes, and mutations (push, pop, shift).
   * Also tracks non-array object structures (linked list heads, tree roots).
   */
  public wrapArray<T extends unknown[]>(arr: unknown, name: string): unknown {
    if (arr && typeof arr === 'object') {
      const existing = this.trackedStructures.get(name);
      if (!existing || (existing && typeof existing === 'object' && !('left' in existing || 'right' in existing))) {
        this.trackedStructures.set(name, arr);
      }
    }

    if (!Array.isArray(arr)) {
      return arr;
    }

    const self = this;
    const proxy = new Proxy(arr, {
      get(target, prop, receiver) {
        if (prop === '__rawTarget') {
          return target;
        }

        // Intercept push, pop, shift for stack and queue operations
        if (prop === 'push') {
          return function (...items: unknown[]) {
            for (const item of items) {
              self.activeHighlights.push({
                target: name,
                role: 'swap',
                operation: 'push',
                color: '#FFE600',
              });
            }
            return (target.push as Function).apply(target, items);
          };
        }

        if (prop === 'pop') {
          return function () {
            self.activeHighlights.push({
              target: name,
              role: 'swap',
              operation: 'pop',
              color: '#FF5E7E',
            });
            return (target.pop as Function).apply(target);
          };
        }

        if (prop === 'shift') {
          return function () {
            self.activeHighlights.push({
              target: name,
              role: 'swap',
              operation: 'dequeue',
              color: '#FF5E7E',
            });
            return (target.shift as Function).apply(target);
          };
        }

        if (typeof prop === 'string' && /^\d+$/.test(prop)) {
          const idx = Number(prop);
          self.activeHighlights.push({
            target: name,
            index: idx,
            role: 'compare',
          });
        }

        return Reflect.get(target, prop, receiver);
      },

      set(target, prop, value, receiver) {
        if (typeof prop === 'string' && /^\d+$/.test(prop)) {
          const idx = Number(prop);
          self.activeHighlights.push({
            target: name,
            index: idx,
            role: 'swap',
          });
        }

        return Reflect.set(target, prop, value, receiver);
      },
    });

    return proxy;
  }

  /**
   * Records an immutable snapshot of the current engine state
   */
  public recordStep(): void {
    // 1. Immutable snapshot of local variables
    const varsSnapshot: Record<string, Snapshot> = {};
    for (const [k, v] of this.currentVars.entries()) {
      varsSnapshot[k] = createSnapshot(v);
    }

    // 2. Extract structure snapshots using persistent node registry
    const structures: StructureSnapshot[] = [];

    if (this.rendererConfig?.structures) {
      for (const structDef of this.rendererConfig.structures) {
        const raw = this.trackedStructures.get(structDef.name) ?? this.currentVars.get(structDef.name);
        const snapshot = extractStructureSnapshot(structDef.name, raw, structDef.type, this.nodeRegistry);
        if (snapshot) {
          if (snapshot.type === 'tree') {
            snapshot.visitedIds = Array.from(this.visitedNodeIds);
          }
          structures.push(snapshot);
        }
      }
    } else {
      // Auto-detect structures
      for (const [name, val] of this.trackedStructures.entries()) {
        const raw = (val as { __rawTarget?: unknown }).__rawTarget ?? val;
        if (Array.isArray(raw)) {
          const arrSnapshot: ArrayStructureSnapshot = {
            id: name,
            name,
            type: 'array',
            values: raw.map((item) => createSnapshot(item)),
          };
          structures.push(arrSnapshot);
        }
      }
    }

    // 3. Collect active highlights (proxy operations + renderer role mappings)
    const highlights: Highlight[] = [...this.activeHighlights];

    if (this.rendererConfig?.roleMappings) {
      const primaryTarget = this.rendererConfig.primaryStructure;

      for (const mapping of this.rendererConfig.roleMappings) {
        const varVal = this.currentVars.get(mapping.variable);
        const target = mapping.targetStructure ?? primaryTarget;

        // If numerical index pointer (Array / Matrix)
        if (typeof varVal === 'number' && Number.isInteger(varVal)) {
          highlights.push({
            target,
            index: varVal,
            role: mapping.role,
            label: mapping.label ?? mapping.variable,
          });
        }
        // If node pointer (Linked List / Tree)
        else if (varVal && typeof varVal === 'object') {
          const stableNodeId = this.nodeRegistry.getExistingId(varVal);
          if (stableNodeId) {
            this.visitedNodeIds.add(stableNodeId);
            highlights.push({
              target,
              nodeId: stableNodeId,
              role: mapping.role,
              label: mapping.label ?? mapping.variable,
            });
          }
        }
      }
    }

    // Clear transient highlights for next line
    this.activeHighlights = [];

    const step: Step = {
      line: this.currentLine,
      vars: varsSnapshot,
      structures,
      highlights,
      note: this.pendingNote,
      callStack: this.scopeStack.map((f) => ({
        functionName: f.funcName,
        args: f.argsSnapshot,
        line: this.currentLine,
      })),
    };

    this.pendingNote = undefined;
    this.steps.push(step);
  }

  public getSteps(): Step[] {
    return this.steps;
  }

  public getTotalSteps(): number {
    return this.steps.length;
  }
}
