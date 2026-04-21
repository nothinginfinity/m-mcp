import type { CapabilityMetadata } from "../types/capability.js";
import type { ContextEnvelope } from "../types/envelope.js";
import type { WorkerCapability, WorkerExecutionContext } from "../types/worker.js";

export function createWorkerCapability<TInput, TOutput>(config: {
  metadata: Omit<CapabilityMetadata, "kind">;
  run: (
    input: ContextEnvelope<TInput>,
    context: WorkerExecutionContext,
  ) => Promise<ContextEnvelope<TOutput>>;
}): WorkerCapability<TInput, TOutput> {
  return {
    metadata: {
      ...config.metadata,
      kind: "worker",
    },
    run: config.run,
  };
}
