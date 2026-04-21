import type { CapabilityRegistry } from "./capabilityRegistry.js";

export function hasCapability(
  registry: CapabilityRegistry,
  id: string,
): boolean {
  return registry.has(id);
}
