import { createWorkerCapability } from "../../workers/createWorkerCapability.js";
import { createEnvelope } from "../../envelope/createEnvelope.js";

export const noopWorker = createWorkerCapability({
  metadata: {
    id: "worker.noop",
    label: "Noop Worker",
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
      source: "m-mcp/noop-worker",
      data: input.data,
      confidence: input.confidence,
      warnings: input.warnings,
      metadata: input.metadata,
      debug: input.debug,
    });
  },
});
