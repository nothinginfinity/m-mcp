import type { WorkerCapability } from "../types/worker.js";
import type { CapabilityRegistry } from "./capabilityRegistry.js";

export function registerWorker(
  registry: CapabilityRegistry,
  worker: WorkerCapability,
): void {
  registry.register(worker);
}
