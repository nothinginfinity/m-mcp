import type { ContextEnvelope } from "../types/envelope.js";
import type { ExecutionPolicy } from "../types/policy.js";
import type { ExecutionTrace } from "../types/trace.js";
import type { CapabilityRegistry } from "../registry/capabilityRegistry.js";
import { executeCapability } from "./executeCapability.js";
import { ExecutionPolicyError } from "../errors/ExecutionPolicyError.js";

export interface OrchestrateOptions {
  capabilityId: string;
  policies?: ExecutionPolicy[];
  host?: "mobile" | "web" | "node" | "unknown";
}

export interface OrchestrateResult<T = unknown> {
  output: ContextEnvelope<T>;
  trace: ExecutionTrace;
}

export async function orchestrate(
  registry: CapabilityRegistry,
  input: ContextEnvelope,
  options: OrchestrateOptions,
): Promise<OrchestrateResult> {
  const startedAt = Date.now();

  const trace: ExecutionTrace = {
    traceId: `trace-${startedAt}`,
    startedAt,
    steps: [],
  };

  const capability = registry.lookup(options.capabilityId);

  for (const policy of options.policies ?? []) {
    const decision = policy.evaluate(capability.metadata, input);

    if (!decision.allowed) {
      throw new ExecutionPolicyError(
        `Execution blocked by policy "${policy.id}": ${decision.reason ?? "unknown reason"}`,
      );
    }
  }

  const output = await executeCapability(capability, input, trace, {
    traceId: trace.traceId,
    now: Date.now(),
    host: options.host ?? "unknown",
  });

  trace.finishedAt = Date.now();

  return { output, trace };
}
