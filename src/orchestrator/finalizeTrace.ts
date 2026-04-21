import type { ExecutionTrace } from "../types/trace.js";

export function finalizeTrace(trace: ExecutionTrace): ExecutionTrace {
  return {
    ...trace,
    finishedAt: trace.finishedAt ?? Date.now(),
  };
}
