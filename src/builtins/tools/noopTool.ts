import { createToolCapability } from "../../tools/createToolCapability.js";
import { createEnvelope } from "../../envelope/createEnvelope.js";

export const noopTool = createToolCapability({
  metadata: {
    id: "tool.noop",
    label: "Noop Tool",
    description: "Returns the input data unchanged in a new envelope.",
    version: "0.1.0",
    inputTypes: ["*"],
    outputTypes: ["*"],
    mobileSafe: true,
    localOnly: true,
    tags: ["builtin", "noop"],
  },
  async run(input) {
    return createEnvelope({
      id: `${input.id}-noop`,
      type: input.type,
      version: input.version,
      source: "m-mcp/noop-tool",
      data: input.data,
      confidence: input.confidence,
      warnings: input.warnings,
      metadata: input.metadata,
      debug: input.debug,
    });
  },
});
