import type { CapabilityKind, CapabilityMetadata } from "../types/capability.js";
import type { ToolCapability } from "../types/tool.js";
import type { WorkerCapability } from "../types/worker.js";
import { CapabilityNotFoundError } from "../errors/CapabilityNotFoundError.js";
import { MMcpError } from "../errors/MMcpError.js";

export type RegisteredCapability = WorkerCapability | ToolCapability;

function isCapabilityKindMatch(
  capability: RegisteredCapability,
  kind?: CapabilityKind,
): boolean {
  if (!kind) {
    return true;
  }

  return capability.metadata.kind === kind;
}

export class CapabilityRegistry {
  private capabilities = new Map<string, RegisteredCapability>();

  register(capability: RegisteredCapability): void {
    const id = capability.metadata.id;

    if (!id || typeof id !== "string") {
      throw new MMcpError("Capability metadata.id is required");
    }

    if (this.capabilities.has(id)) {
      throw new MMcpError(`Capability already registered: ${id}`);
    }

    this.capabilities.set(id, capability);
  }

  unregister(id: string): boolean {
    return this.capabilities.delete(id);
  }

  has(id: string): boolean {
    return this.capabilities.has(id);
  }

  lookup(id: string): RegisteredCapability {
    const capability = this.capabilities.get(id);

    if (!capability) {
      throw new CapabilityNotFoundError(`Capability not found: ${id}`);
    }

    return capability;
  }

  lookupByKind(id: string, kind: CapabilityKind): RegisteredCapability {
    const capability = this.lookup(id);

    if (capability.metadata.kind !== kind) {
      throw new MMcpError(
        `Capability "${id}" is kind "${capability.metadata.kind}", expected "${kind}"`,
      );
    }

    return capability;
  }

  list(kind?: CapabilityKind): RegisteredCapability[] {
    return Array.from(this.capabilities.values()).filter((capability) =>
      isCapabilityKindMatch(capability, kind),
    );
  }

  listMetadata(kind?: CapabilityKind): CapabilityMetadata[] {
    return this.list(kind).map((capability) => capability.metadata);
  }

  size(kind?: CapabilityKind): number {
    return this.list(kind).length;
  }

  clear(): void {
    this.capabilities.clear();
  }
}
