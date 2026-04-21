import type { ExecutionTrace } from "../types/trace.js";

export function createExecutionTrace(traceId?: string): ExecutionTrace {
  return {
    traceId: traceId ?? `trace-${Date.now()}`,
    startedAt: Date.now(),
    steps: [],
  };
}
