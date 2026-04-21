import type { CapabilityRegistry } from "./capabilityRegistry.js";

export function unregisterCapability(
  registry: CapabilityRegistry,
  id: string,
): boolean {
  return registry.unregister(id);
}
