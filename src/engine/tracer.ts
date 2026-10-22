import {
  Step,
  Snapshot,
  Highlight,
  StructureSnapshot,
  RendererConfig,
  TraceConfig,
  TraceResult,
  ArrayStructureSnapshot,
} from './types';
import { createSnapshot, extractStructureSnapshot } from './snapshot';

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

  constructor(rendererConfig?: RendererConfig, traceConfig?: TraceConfig) {
    this.rendererConfig = rendererConfig;
    this.maxSteps = traceConfig?.maxSteps ?? 5000;
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

    if (Array.isArray(value) || (value && typeof value === 'object' && '__rawTarget' in value)) {
      this.trackedStructures.set(name, value);
    }
  }

  /**
   * Called by solution code: note("Searching right half")
   */
  public note(text: string): void {
    this.pendingNote = text;
    // Update the most recent step note if available
    if (this.steps.length > 0) {
      const lastStep = this.steps[this.steps.length - 1];
      if (lastStep) {
        lastStep.note = text;
      }
    }
  }

  /**
   * Wraps an array with a recording Proxy to intercept reads and writes
   */
  public wrapArray<T extends unknown[]>(arr: unknown, name: string): unknown {
    if (!Array.isArray(arr)) {
      return arr;
    }

    this.trackedStructures.set(name, arr);

    const self = this;
    const proxy = new Proxy(arr, {
      get(target, prop, receiver) {
        if (prop === '__rawTarget') {
          return target;
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

        const res = Reflect.set(target, prop, value, receiver);
        // Self-record step on in-place mutation if inside execution
        return res;
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

    // 2. Extract structure snapshots
    const structures: StructureSnapshot[] = [];

    // If renderer config is provided, follow its structure definitions
    if (this.rendererConfig?.structures) {
      for (const structDef of this.rendererConfig.structures) {
        const raw = this.trackedStructures.get(structDef.name) ?? this.currentVars.get(structDef.name);
        const snapshot = extractStructureSnapshot(structDef.name, raw, structDef.type);
        if (snapshot) {
          structures.push(snapshot);
        }
      }
    } else {
      // Auto-detect arrays from tracked structures and variables
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

        if (typeof varVal === 'number' && Number.isInteger(varVal)) {
          highlights.push({
            target,
            index: varVal,
            role: mapping.role,
            label: mapping.label ?? mapping.variable,
          });
        }
      }
    }

    // Clear transient proxy read/write highlights for the next cycle
    this.activeHighlights = [];

    const step: Step = {
      line: this.currentLine,
      vars: varsSnapshot,
      structures,
      highlights,
      note: this.pendingNote,
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
