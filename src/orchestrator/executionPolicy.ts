import type { CapabilityMetadata } from "../types/capability.js";
import type { ContextEnvelope } from "../types/envelope.js";
import type { ExecutionDecision, ExecutionPolicy } from "../types/policy.js";

export function evaluatePolicies(
  policies: ExecutionPolicy[],
  capability: CapabilityMetadata,
  input: ContextEnvelope,
): ExecutionDecision[] {
  return policies.map((policy) => policy.evaluate(capability, input));
}

export function findBlockingDecision(
  decisions: ExecutionDecision[],
): ExecutionDecision | undefined {
  return decisions.find((decision) => !decision.allowed);
}

export function composePolicies(policies: ExecutionPolicy[]): ExecutionPolicy[] {
  return policies;
}
