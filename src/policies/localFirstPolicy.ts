import type { CapabilityMetadata } from "../types/capability.js";
import type { ContextEnvelope } from "../types/envelope.js";
import type { ExecutionPolicy } from "../types/policy.js";

function prefersLocalExecution(capability: CapabilityMetadata): boolean {
  if (capability.localOnly === true) {
    return true;
  }

  if (capability.mobileSafe === true) {
    return true;
  }

  return false;
}

export const localFirstPolicy: ExecutionPolicy = {
  id: "local-first-policy",
  evaluate(capability: CapabilityMetadata, _input: ContextEnvelope) {
    return {
      allowed: true,
      preferLocal: prefersLocalExecution(capability),
    };
  },
};
