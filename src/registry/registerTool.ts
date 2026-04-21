import type { ToolCapability } from "../types/tool.js";
import type { CapabilityRegistry } from "./capabilityRegistry.js";

export function registerTool(
  registry: CapabilityRegistry,
  tool: ToolCapability,
): void {
  registry.register(tool);
}
