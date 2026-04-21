import type { CapabilityMetadata } from "../types/capability.js";
import type { ContextEnvelope } from "../types/envelope.js";
import type { ExecutionPolicy } from "../types/policy.js";

function shouldRecommendEscalation(input: ContextEnvelope): boolean {
  if (input.ambiguity?.level === "high") {
    return true;
  }

  if (
    input.escalationHints?.some((hint) => hint.recommended === true) === true
  ) {
    return true;
  }

  return false;
}

export const ambiguityEscalationPolicy: ExecutionPolicy = {
  id: "ambiguity-escalation-policy",
  evaluate(_capability: CapabilityMetadata, input: ContextEnvelope) {
    return {
      allowed: true,
      shouldEscalate: shouldRecommendEscalation(input),
    };
  },
};
