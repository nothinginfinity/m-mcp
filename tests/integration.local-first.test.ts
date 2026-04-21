import { describe, expect, it } from "vitest";
import {
  CapabilityRegistry,
  createEnvelope,
  localFirstPolicy,
  noopWorker,
  orchestrate,
  registerWorker,
  runWorkerCapability,
} from "../src/index.js";

describe("local-first integration", () => {
  it("runs a local mobile-safe worker under local-first policy", async () => {
    const registry = new CapabilityRegistry();
    registerWorker(registry, noopWorker);

    const input = createEnvelope({
      id: "env-local",
      type: "document/raw",
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
    expect(result.escalationRecommended).toBe(false);
  });

  it("can run the same worker directly through worker runtime helpers", async () => {
    const input = createEnvelope({
      id: "env-direct",
      type: "document/raw",
      source: "test",
      data: { text: "hello-direct" },
    });

    const output = await runWorkerCapability(noopWorker, input, {
      host: "mobile",
    });

    expect(output.data).toEqual({ text: "hello-direct" });
    expect(output.source).toBe("m-mcp/noop-worker");
  });
});
