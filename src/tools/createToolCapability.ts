import type { CapabilityMetadata } from "../types/capability.js";
import type { ContextEnvelope } from "../types/envelope.js";
import type { ToolCapability, ToolExecutionContext } from "../types/tool.js";
import { MMcpError } from "../errors/MMcpError.js";

function validateToolMetadata(metadata: Omit<CapabilityMetadata, "kind">): void {
  if (!metadata.id || typeof metadata.id !== "string") {
    throw new MMcpError("Tool capability metadata.id is required");
  }

  if (!metadata.label || typeof metadata.label !== "string") {
    throw new MMcpError("Tool capability metadata.label is required");
  }

  if (!metadata.description || typeof metadata.description !== "string") {
    throw new MMcpError("Tool capability metadata.description is required");
  }

  if (!metadata.version || typeof metadata.version !== "string") {
    throw new MMcpError("Tool capability metadata.version is required");
  }

  if (!Array.isArray(metadata.inputTypes) || metadata.inputTypes.length === 0) {
    throw new MMcpError("Tool capability metadata.inputTypes must be a non-empty array");
  }

  if (!Array.isArray(metadata.outputTypes) || metadata.outputTypes.length === 0) {
    throw new MMcpError("Tool capability metadata.outputTypes must be a non-empty array");
  }
}

export function createToolCapability<TInput, TOutput>(config: {
  metadata: Omit<CapabilityMetadata, "kind">;
  run: (
    input: ContextEnvelope<TInput>,
    context: ToolExecutionContext,
  ) => Promise<ContextEnvelope<TOutput>>;
}): ToolCapability<TInput, TOutput> {
  validateToolMetadata(config.metadata);

  if (typeof config.run !== "function") {
    throw new MMcpError("Tool capability run must be a function");
  }

  return {
    metadata: {
      ...config.metadata,
      kind: "tool",
    },
    run: config.run,
  };
}
