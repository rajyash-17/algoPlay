import { executeTrace, ExecuteTraceOptions } from './run';

// Web Worker message listener
self.onmessage = (event: MessageEvent<ExecuteTraceOptions>) => {
  const options = event.data;
  const result = executeTrace(options);
  self.postMessage(result);
};
