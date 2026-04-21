import type { CapabilityMetadata } from "./capability.js";
import type { ContextEnvelope } from "./envelope.js";

export interface WorkerExecutionContext {
  traceId: string;
  now: number;
  host: "mobile" | "web" | "node" | "unknown";
  metadata?: Record<string, unknown>;
}

export interface WorkerCapability<TInput = unknown, TOutput = unknown> {
  metadata: CapabilityMetadata & { kind: "worker" };
  run(
    input: ContextEnvelope<TInput>,
    context: WorkerExecutionContext,
  ): Promise<ContextEnvelope<TOutput>>;
}
