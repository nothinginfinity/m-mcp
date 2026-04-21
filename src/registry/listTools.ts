import type { CapabilityRegistry } from "./capabilityRegistry.js";

export function listTools(registry: CapabilityRegistry) {
  return registry.list("tool");
}
