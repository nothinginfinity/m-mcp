import type { ExecutionPolicy } from "../types/policy.js";

export const mobileSafePolicy: ExecutionPolicy = {
  id: "mobile-safe-policy",
  evaluate(capability) {
    if (capability.mobileSafe === false) {
      return {
        allowed: false,
        reason: "Capability is not marked mobile-safe",
      };
    }

    return {
      allowed: true,
      preferLocal: true,
    };
  },
};
