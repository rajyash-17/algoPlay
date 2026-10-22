import { TraceResult } from './types';
import { executeTrace, ExecuteTraceOptions } from './executor';

export { executeTrace, type ExecuteTraceOptions };

/**
 * Runs trace inside a Web Worker when in browser environment,
 * with graceful fallback to executeTrace in test/server environments.
 */
export async function runTrace(options: ExecuteTraceOptions): Promise<TraceResult> {
  // If in browser with Worker support
  if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
    return new Promise<TraceResult>((resolve) => {
      try {
        const worker = new Worker(new URL('./worker.ts', import.meta.url), {
          type: 'module',
        });

        const timer = setTimeout(() => {
          worker.terminate();
          resolve({
            success: false,
            steps: [],
            error: `Web Worker timed out after ${options.traceConfig?.timeoutMs ?? 3000}ms`,
            totalSteps: 0,
          });
        }, (options.traceConfig?.timeoutMs ?? 3000) + 500);

        worker.onmessage = (e: MessageEvent<TraceResult>) => {
          clearTimeout(timer);
          worker.terminate();
          resolve(e.data);
        };

        worker.onerror = (err) => {
          clearTimeout(timer);
          worker.terminate();
          resolve({
            success: false,
            steps: [],
            error: err.message ?? 'Unknown worker error',
            totalSteps: 0,
          });
        };

        worker.postMessage(options);
      } catch (e) {
        // Fallback to direct execution
        resolve(executeTrace(options));
      }
    });
  }

  // Server or Vitest environment
  return executeTrace(options);
}
