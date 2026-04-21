import type { WorkerCapability } from "../types/worker.js";
import type { CapabilityRegistry } from "./capabilityRegistry.js";
import { MMcpError } from "../errors/MMcpError.js";

export function registerWorker(
  registry: CapabilityRegistry,
  worker: WorkerCapability,
): WorkerCapability {
  if (worker.metadata.kind !== "worker") {
    throw new MMcpError(
      `registerWorker expected a worker capability, received "${worker.metadata.kind}"`,
    );
  }

  registry.register(worker);
  return worker;
}
