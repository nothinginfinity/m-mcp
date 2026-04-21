import type { ContextEnvelope } from "../types/envelope.js";
import type { ExecutionDecision } from "../types/policy.js";

export function shouldEscalate(
  envelope: ContextEnvelope,
  decisions: ExecutionDecision[] = [],
): boolean {
  if (envelope.ambiguity?.level === "high") {
    return true;
  }

  return decisions.some((decision) => decision.shouldEscalate === true);
}
