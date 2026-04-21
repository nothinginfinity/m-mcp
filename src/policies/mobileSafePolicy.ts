import type { CapabilityMetadata } from "../types/capability.js";
import type { ContextEnvelope } from "../types/envelope.js";
import type { ExecutionPolicy } from "../types/policy.js";

export const mobileSafePolicy: ExecutionPolicy = {
  id: "mobile-safe-policy",
  evaluate(capability: CapabilityMetadata, _input: ContextEnvelope) {
    if (capability.mobileSafe === false) {
      return {
        allowed: false,
        reason: "Capability is not marked mobile-safe",
        preferLocal: false,
      };
    }

    return {
      allowed: true,
      preferLocal: capability.localOnly === true || capability.mobileSafe === true,
    };
  },
};
