import { RendererConfig, TraceConfig, TraceResult } from './types';
import { instrumentCode } from './instrument';
import { Tracer } from './tracer';
import { createSnapshot } from './snapshot';

export interface ExecuteTraceOptions {
  code: string;
  args?: unknown[];
  entryFunction?: string;
  rendererConfig?: RendererConfig;
  traceConfig?: TraceConfig;
}

/**
 * Direct execution engine used in Worker and Node / Vitest testing environments.
 */
export function executeTrace({
  code,
  args = [],
  entryFunction,
  rendererConfig,
  traceConfig,
}: ExecuteTraceOptions): TraceResult {
  const maxSteps = traceConfig?.maxSteps ?? 5000;
  const timeoutMs = traceConfig?.timeoutMs ?? 3000;

  try {
    // 1. Instrument code with Babel
    const instrumented = instrumentCode(code);

    // 2. Initialize Tracer
    const tracer = new Tracer(rendererConfig, { maxSteps, timeoutMs });

    // 3. Expose runtime tracer hooks
    const tracerEnv = {
      __line: (line: number) => tracer.onLine(line),
      __assign: (name: string, val: unknown) => tracer.onAssign(name, val),
      __wrapArray: (arr: unknown, name: string) => tracer.wrapArray(arr, name),
      __enter: (name: string, params: Record<string, unknown>) => tracer.onEnter(name, params),
      __exit: (name?: string) => tracer.onExit(name),
      note: (text: string) => tracer.note(text),
    };

    // 4. Wrap execution in timeout watchdog
    const startTime = Date.now();
    const watchdogHook = () => {
      if (Date.now() - startTime > timeoutMs) {
        throw new Error(`Execution timed out after ${timeoutMs}ms.`);
      }
    };

    const originalOnLine = tracerEnv.__line;
    tracerEnv.__line = (line: number) => {
      watchdogHook();
      originalOnLine(line);
    };

    // 5. Build function runner
    const fnMatch = code.match(/function\s+([a-zA-Z0-9_$]+)\s*\(/);
    const targetFn = entryFunction || (fnMatch ? fnMatch[1] : 'solution');

    const wrappedCode = `
      ${instrumented}
      if (typeof ${targetFn} === 'function') {
        return (${targetFn}).apply(null, __args);
      }
      return undefined;
    `;

    // Construct execution sandbox
    const fn = new Function(
      '__line',
      '__assign',
      '__wrapArray',
      '__enter',
      '__exit',
      'note',
      '__args',
      wrappedCode
    );

    const rawReturnVal = fn(
      tracerEnv.__line,
      tracerEnv.__assign,
      tracerEnv.__wrapArray,
      tracerEnv.__enter,
      tracerEnv.__exit,
      tracerEnv.note,
      args
    );

    const steps = tracer.getSteps();

    return {
      success: true,
      steps,
      returnValue: createSnapshot(rawReturnVal),
      totalSteps: steps.length,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      steps: [],
      error: errorMsg,
      totalSteps: 0,
    };
  }
}
