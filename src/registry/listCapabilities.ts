import type { CapabilityKind } from "../types/capability.js";
import type { CapabilityRegistry } from "./capabilityRegistry.js";

export function listCapabilities(
  registry: CapabilityRegistry,
  kind?: CapabilityKind,
) {
  return registry.list(kind);
}
