import { describe, expect, it } from "vitest";
import {
  CapabilityRegistry,
  createWorkerCapability,
  registerWorker,
} from "../src/index.js";

describe("capability registry", () => {
  it("registers and looks up a worker", () => {
    const registry = new CapabilityRegistry();

    const worker = createWorkerCapability({
      metadata: {
        id: "worker.test",
        label: "Test Worker",
        description: "A test worker",
        version: "0.1.0",
        inputTypes: ["test/input"],
        outputTypes: ["test/output"],
        mobileSafe: true,
        localOnly: true,
      },
      async run(input) {
        return {
          ...input,
          id: "out-1",
          source: "worker.test",
          type: "test/output",
        };
      },
    });

    registerWorker(registry, worker);

    expect(registry.lookup("worker.test").metadata.id).toBe("worker.test");
  });
});
