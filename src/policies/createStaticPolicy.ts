import type { CapabilityMetadata } from "../types/capability.js";
import type { ContextEnvelope } from "../types/envelope.js";
import type { ExecutionDecision, ExecutionPolicy } from "../types/policy.js";

export function createStaticPolicy(config: {
  id: string;
  evaluate: (
    capability: CapabilityMetadata,
    input: ContextEnvelope,
  ) => ExecutionDecision;
}): ExecutionPolicy {
  return {
    id: config.id,
    evaluate: config.evaluate,
  };
}
