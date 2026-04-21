import type { ExecutionPolicy } from "../types/policy.js";
import type { ContextEnvelope } from "../types/envelope.js";

export const ambiguityEscalationPolicy: ExecutionPolicy = {
  id: "ambiguity-escalation-policy",
  evaluate(_capability, input: ContextEnvelope) {
    return {
      allowed: true,
      shouldEscalate: input.ambiguity?.level === "high",
    };
  },
};
