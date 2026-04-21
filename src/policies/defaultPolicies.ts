import type { ExecutionPolicy } from "../types/policy.js";
import { ambiguityEscalationPolicy } from "./ambiguityEscalationPolicy.js";
import { localFirstPolicy } from "./localFirstPolicy.js";
import { mobileSafePolicy } from "./mobileSafePolicy.js";

export const defaultPolicies: ExecutionPolicy[] = [
  localFirstPolicy,
  mobileSafePolicy,
  ambiguityEscalationPolicy,
];
