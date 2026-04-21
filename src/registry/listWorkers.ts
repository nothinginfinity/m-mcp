import type { CapabilityRegistry } from "./capabilityRegistry.js";

export function listWorkers(registry: CapabilityRegistry) {
  return registry.list("worker");
}
