import type { CapabilityMetadata } from "../types/capability.js";
import type { ContextEnvelope } from "../types/envelope.js";
import type { ToolCapability, ToolExecutionContext } from "../types/tool.js";

export function createToolCapability<TInput, TOutput>(config: {
  metadata: Omit<CapabilityMetadata, "kind">;
  run: (
    input: ContextEnvelope<TInput>,
    context: ToolExecutionContext,
  ) => Promise<ContextEnvelope<TOutput>>;
}): ToolCapability<TInput, TOutput> {
  return {
    metadata: {
      ...config.metadata,
      kind: "tool",
    },
    run: config.run,
  };
}
