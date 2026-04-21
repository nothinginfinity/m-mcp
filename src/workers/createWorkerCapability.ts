import type { CapabilityMetadata } from "../types/capability.js";
import type { ContextEnvelope } from "../types/envelope.js";
import type { WorkerCapability, WorkerExecutionContext } from "../types/worker.js";
import { MMcpError } from "../errors/MMcpError.js";

function validateWorkerMetadata(metadata: Omit<CapabilityMetadata, "kind">): void {
  if (!metadata.id || typeof metadata.id !== "string") {
    throw new MMcpError("Worker capability metadata.id is required");
  }

  if (!metadata.label || typeof metadata.label !== "string") {
    throw new MMcpError("Worker capability metadata.label is required");
  }

  if (!metadata.description || typeof metadata.description !== "string") {
    throw new MMcpError("Worker capability metadata.description is required");
  }

  if (!metadata.version || typeof metadata.version !== "string") {
    throw new MMcpError("Worker capability metadata.version is required");
  }

  if (!Array.isArray(metadata.inputTypes) || metadata.inputTypes.length === 0) {
    throw new MMcpError("Worker capability metadata.inputTypes must be a non-empty array");
  }

  if (!Array.isArray(metadata.outputTypes) || metadata.outputTypes.length === 0) {
    throw new MMcpError("Worker capability metadata.outputTypes must be a non-empty array");
  }
}

export function createWorkerCapability<TInput, TOutput>(config: {
  metadata: Omit<CapabilityMetadata, "kind">;
  run: (
    input: ContextEnvelope<TInput>,
    context: WorkerExecutionContext,
  ) => Promise<ContextEnvelope<TOutput>>;
}): WorkerCapability<TInput, TOutput> {
  validateWorkerMetadata(config.metadata);

  if (typeof config.run !== "function") {
    throw new MMcpError("Worker capability run must be a function");
  }

  return {
    metadata: {
      ...config.metadata,
      kind: "worker",
    },
    run: config.run,
  };
}
