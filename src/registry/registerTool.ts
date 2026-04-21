import type { ToolCapability } from "../types/tool.js";
import type { CapabilityRegistry } from "./capabilityRegistry.js";
import { MMcpError } from "../errors/MMcpError.js";

export function registerTool(
  registry: CapabilityRegistry,
  tool: ToolCapability,
): ToolCapability {
  if (tool.metadata.kind !== "tool") {
    throw new MMcpError(
      `registerTool expected a tool capability, received "${tool.metadata.kind}"`,
    );
  }

  registry.register(tool);
  return tool;
}
