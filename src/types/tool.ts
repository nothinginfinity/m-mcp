import type { CapabilityMetadata } from "./capability.js";
import type { ContextEnvelope } from "./envelope.js";

export interface ToolExecutionContext {
  traceId: string;
  now: number;
  host: "mobile" | "web" | "node" | "unknown";
  metadata?: Record<string, unknown>;
}

export interface ToolCapability<TInput = unknown, TOutput = unknown> {
  metadata: CapabilityMetadata & { kind: "tool" };
  run(
    input: ContextEnvelope<TInput>,
    context: ToolExecutionContext,
  ): Promise<ContextEnvelope<TOutput>>;
}
