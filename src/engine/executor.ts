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
    const wrappedCode = `
      ${instrumented}
      if (typeof ${entryFunction || 'solution'} === 'function') {
        return (${entryFunction || 'solution'}).apply(null, __args);
      } else {
        const declaredFns = [
          typeof twoSum === 'function' ? twoSum : null,
          typeof twoSumII === 'function' ? twoSumII : null,
          typeof isPalindrome === 'function' ? isPalindrome : null,
          typeof maxProfit === 'function' ? maxProfit : null,
          typeof searchInsert === 'function' ? searchInsert : null,
        ].filter(Boolean);
        if (declaredFns.length > 0) {
          return declaredFns[0].apply(null, __args);
        }
      }
      return undefined;
    `;

    // Construct execution sandbox
    const fn = new Function(
      '__line',
      '__assign',
      '__wrapArray',
      'note',
      '__args',
      wrappedCode
    );

    const rawReturnVal = fn(
      tracerEnv.__line,
      tracerEnv.__assign,
      tracerEnv.__wrapArray,
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
