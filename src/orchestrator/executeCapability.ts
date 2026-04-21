import type { ContextEnvelope } from "../types/envelope.js";
import type { RuntimeExecutionContext } from "../types/execution.js";
import type { ExecutionTrace } from "../types/trace.js";
import type { RegisteredCapability } from "../registry/capabilityRegistry.js";
import { appendTraceStep } from "./traceExecution.js";

export async function executeCapability(
  capability: RegisteredCapability,
  input: ContextEnvelope,
  trace: ExecutionTrace,
  context: RuntimeExecutionContext,
): Promise<ContextEnvelope> {
  const startedAt = Date.now();

  try {
    const output = await capability.run(input, context);

    appendTraceStep(trace, {
      capabilityId: capability.metadata.id,
      capabilityKind: capability.metadata.kind,
      startedAt,
      finishedAt: Date.now(),
      success: true,
      inputType: input.type,
      outputType: output.type,
      warnings: output.warnings,
    });

    return output;
  } catch (error) {
    appendTraceStep(trace, {
      capabilityId: capability.metadata.id,
      capabilityKind: capability.metadata.kind,
      startedAt,
      finishedAt: Date.now(),
      success: false,
      inputType: input.type,
      error: error instanceof Error ? error.message : "Unknown error",
    });

    throw error;
  }
}
