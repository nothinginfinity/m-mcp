import type { ToolCapability } from "../types/tool.js";
import type { WorkerCapability } from "../types/worker.js";
import { CapabilityNotFoundError } from "../errors/CapabilityNotFoundError.js";

export type RegisteredCapability = WorkerCapability | ToolCapability;

export class CapabilityRegistry {
  private capabilities = new Map<string, RegisteredCapability>();

  register(capability: RegisteredCapability): void {
    if (this.capabilities.has(capability.metadata.id)) {
      throw new Error(`Capability already registered: ${capability.metadata.id}`);
    }

    this.capabilities.set(capability.metadata.id, capability);
  }

  lookup(id: string): RegisteredCapability {
    const capability = this.capabilities.get(id);

    if (!capability) {
      throw new CapabilityNotFoundError(`Capability not found: ${id}`);
    }

    return capability;
  }

  list(): RegisteredCapability[] {
    return Array.from(this.capabilities.values());
  }
}
