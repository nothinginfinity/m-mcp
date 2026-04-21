import type { ContextEnvelope } from "../types/envelope.js";
import type { WorkerCapability, WorkerExecutionContext } from "../types/worker.js";

export function createWorkerExecutionContext(
  input?: Partial<WorkerExecutionContext>,
): WorkerExecutionContext {
  return {
    traceId: input?.traceId ?? `worker-trace-${Date.now()}`,
    now: input?.now ?? Date.now(),
    host: input?.host ?? "unknown",
    metadata: input?.metadata,
  };
}

export async function runWorkerCapability<TInput, TOutput>(
  worker: WorkerCapability<TInput, TOutput>,
  input: ContextEnvelope<TInput>,
  context?: Partial<WorkerExecutionContext>,
): Promise<ContextEnvelope<TOutput>> {
  const executionContext = createWorkerExecutionContext(context);
  return worker.run(input, executionContext);
}
