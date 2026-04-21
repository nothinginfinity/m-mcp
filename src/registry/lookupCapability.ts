import type { CapabilityRegistry } from "./capabilityRegistry.js";

export function lookupCapability(registry: CapabilityRegistry, id: string) {
  return registry.lookup(id);
}
