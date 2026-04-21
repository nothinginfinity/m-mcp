import type { ExecutionDecision } from "../types/policy.js";

export function combinePolicyDecisions(
  decisions: ExecutionDecision[],
): ExecutionDecision {
  const blocking = decisions.find((decision) => decision.allowed === false);

  if (blocking) {
    return {
      allowed: false,
      reason: blocking.reason ?? "blocked by policy",
      preferLocal: decisions.some((decision) => decision.preferLocal === true),
      shouldEscalate: decisions.some(
        (decision) => decision.shouldEscalate === true,
      ),
    };
  }

  return {
    allowed: true,
    preferLocal: decisions.some((decision) => decision.preferLocal === true),
    shouldEscalate: decisions.some(
      (decision) => decision.shouldEscalate === true,
    ),
  };
}
