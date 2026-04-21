import type { CapabilityMetadata } from "./capability.js";
import type { ContextEnvelope } from "./envelope.js";

export interface ExecutionDecision {
  allowed: boolean;
  reason?: string;
  preferLocal?: boolean;
  shouldEscalate?: boolean;
}

export interface ExecutionPolicy {
  id: string;
  evaluate(
    capability: CapabilityMetadata,
    input: ContextEnvelope,
  ): ExecutionDecision;
}
