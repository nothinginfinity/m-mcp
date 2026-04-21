import type { RuntimeExecutionContext } from "../types/execution.js";

export function createExecutionContext(input?: Partial<RuntimeExecutionContext>): RuntimeExecutionContext {
  return {
    traceId: input?.traceId ?? `trace-${Date.now()}`,
    now: input?.now ?? Date.now(),
    host: input?.host ?? "unknown",
    metadata: input?.metadata,
  };
}
