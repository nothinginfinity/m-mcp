import type { ExecutionTrace, ExecutionTraceStep } from "../types/trace.js";

export function createExecutionTrace(traceId?: string): ExecutionTrace {
  return {
    traceId: traceId ?? `trace-${Date.now()}`,
    startedAt: Date.now(),
    steps: [],
  };
}

export function appendTraceStep(
  trace: ExecutionTrace,
  step: ExecutionTraceStep,
): ExecutionTrace {
  trace.steps.push(step);
  return trace;
}
