import type { ContextEnvelope } from "../types/envelope.js";
import type { ExecutionPolicy } from "../types/policy.js";
import type { ExecutionTrace } from "../types/trace.js";
import type { CapabilityRegistry } from "../registry/capabilityRegistry.js";
import { ExecutionPolicyError } from "../errors/ExecutionPolicyError.js";
import { createExecutionContext } from "./createExecutionContext.js";
import { evaluatePolicies, findBlockingDecision } from "./executionPolicy.js";
import { executeCapability } from "./executeCapability.js";
import { finalizeTrace } from "./finalizeTrace.js";
import { createExecutionTrace } from "./traceExecution.js";
import { shouldEscalate } from "./shouldEscalate.js";

export interface OrchestrateOptions {
  capabilityId: string;
  policies?: ExecutionPolicy[];
  host?: "mobile" | "web" | "node" | "unknown";
  metadata?: Record<string, unknown>;
}

export interface OrchestrateResult<T = unknown> {
  output: ContextEnvelope<T>;
  trace: ExecutionTrace;
  escalationRecommended: boolean;
}

export async function orchestrate(
  registry: CapabilityRegistry,
  input: ContextEnvelope,
  options: OrchestrateOptions,
): Promise<OrchestrateResult> {
  const capability = registry.lookup(options.capabilityId);
  const trace = createExecutionTrace();
  const context = createExecutionContext({
    traceId: trace.traceId,
    host: options.host ?? "unknown",
    metadata: options.metadata,
  });

  const decisions = evaluatePolicies(
    options.policies ?? [],
    capability.metadata,
    input,
  );

  const blockingDecision = findBlockingDecision(decisions);

  if (blockingDecision) {
    trace.finishedAt = Date.now();
    throw new ExecutionPolicyError(
      `Execution blocked: ${blockingDecision.reason ?? "unknown reason"}`,
    );
  }

  const output = await executeCapability(capability, input, trace, context);
  const finalTrace = finalizeTrace(trace);

  return {
    output,
    trace: finalTrace,
    escalationRecommended: shouldEscalate(output, decisions),
  };
}
