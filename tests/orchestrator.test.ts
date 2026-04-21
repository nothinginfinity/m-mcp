import { describe, expect, it } from "vitest";
import {
  CapabilityRegistry,
  createEnvelope,
  createWorkerCapability,
  orchestrate,
  registerWorker,
} from "../src/index.js";

describe("orchestrator", () => {
  it("executes a registered worker and returns a trace", async () => {
    const registry = new CapabilityRegistry();

    const worker = createWorkerCapability({
      metadata: {
        id: "worker.echo",
        label: "Echo Worker",
        description: "Returns wrapped output",
        version: "0.1.0",
        inputTypes: ["test/input"],
        outputTypes: ["test/output"],
        mobileSafe: true,
        localOnly: true,
      },
      async run(input) {
        return {
          ...input,
          id: "env-out",
          type: "test/output",
          source: "worker.echo",
          data: { echoed: input.data },
        };
      },
    });

    registerWorker(registry, worker);

    const input = createEnvelope({
      id: "env-in",
      type: "test/input",
      version: "1.0.0",
      source: "test",
      data: { value: 42 },
    });

    const result = await orchestrate(registry, input, {
      capabilityId: "worker.echo",
      host: "mobile",
    });

    expect(result.output.type).toBe("test/output");
    expect(result.trace.steps).toHaveLength(1);
    expect(result.trace.steps[0]?.success).toBe(true);
  });
});
