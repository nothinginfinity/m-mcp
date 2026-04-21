import { describe, expect, it } from "vitest";
import {
  CapabilityRegistry,
  createEnvelope,
  localFirstPolicy,
  noopWorker,
  orchestrate,
  registerWorker,
} from "../src/index.js";

describe("local-first integration", () => {
  it("runs a local mobile-safe worker under local-first policy", async () => {
    const registry = new CapabilityRegistry();
    registerWorker(registry, noopWorker);

    const input = createEnvelope({
      id: "env-local",
      type: "document/raw",
      version: "1.0.0",
      source: "test",
      data: { text: "hello" },
    });

    const result = await orchestrate(registry, input, {
      capabilityId: "worker.noop",
      policies: [localFirstPolicy],
      host: "mobile",
    });

    expect(result.output.data).toEqual({ text: "hello" });
    expect(result.trace.steps[0]?.capabilityId).toBe("worker.noop");
  });
});
