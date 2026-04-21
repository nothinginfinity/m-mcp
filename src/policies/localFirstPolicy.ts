import type { ExecutionPolicy } from "../types/policy.js";

export const localFirstPolicy: ExecutionPolicy = {
  id: "local-first-policy",
  evaluate(capability) {
    return {
      allowed: true,
      preferLocal: capability.localOnly !== false,
    };
  },
};
