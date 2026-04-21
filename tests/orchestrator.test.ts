import { describe, expect, it } from "vitest";
import {
  CapabilityRegistry,
  createEnvelope,
  createWorkerCapability,
  orchestrate,
  registerWorker,
} from "../src/index.js";
import { ExecutionPolicyError } from "../src/errors/ExecutionPolicyError.js";

describe("orchestrator", () => {
  function makeWorker(id = "worker.echo") {
    return createWorkerCapability({
      metadata: {
        id,
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
          id: `${id}-out`,
          type: "test/output",
          source: id,
          data: { echoed: input.data },
        };
      },
    });
  }

  it("executes a registered worker and returns a completed trace", async () => {
    const registry = new CapabilityRegistry();
    registerWorker(registry, makeWorker());

    const input = createEnvelope({
      id: "env-in",
      type: "test/input",
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
    expect(result.trace.finishedAt).toBeTypeOf("number");
    expect(result.escalationRecommended).toBe(false);
  });

  it("recommends escalation when output ambiguity is high", async () => {
    const registry = new CapabilityRegistry();

    const worker = createWorkerCapability({
      metadata: {
        id: "worker.ambiguous",
        label: "Ambiguous Worker",
        description: "Returns high-ambiguity output",
        version: "0.1.0",
        inputTypes: ["test/input"],
        outputTypes: ["test/output"],
        mobileSafe: true,
        localOnly: true,
      },
      async run(input) {
        return {
          ...input,
          id: "amb-out",
          type: "test/output",
          source: "worker.ambiguous",
          ambiguity: {
            level: "high",
            reasons: ["unclear-structure"],
          },
        };
      },
    });

    registerWorker(registry, worker);

    const input = createEnvelope({
      id: "env-amb",
      type: "test/input",
      source: "test",
      data: {},
    });

    const result = await orchestrate(registry, input, {
      capabilityId: "worker.ambiguous",
      host: "mobile",
    });

    expect(result.escalationRecommended).toBe(true);
  });

  it("throws when execution is blocked by policy", async () => {
    const registry = new CapabilityRegistry();
    registerWorker(registry, makeWorker("worker.blocked"));

    const input = createEnvelope({
      id: "env-block",
      type: "test/input",
      source: "test",
      data: {},
    });

    const blockingPolicy = {
      id: "always-block",
      evaluate() {
        return { allowed: false, reason: "blocked for test" };
      },
    };

    await expect(
      orchestrate(registry, input, {
        capabilityId: "worker.blocked",
        policies: [blockingPolicy],
      }),
    ).rejects.toThrow(ExecutionPolicyError);
  });

  it("records a failed execution in the trace", async () => {
    const registry = new CapabilityRegistry();

    const worker = createWorkerCapability({
      metadata: {
        id: "worker.fail",
        label: "Fail Worker",
        description: "Throws intentionally",
        version: "0.1.0",
        inputTypes: ["test/input"],
        outputTypes: ["test/output"],
        mobileSafe: true,
        localOnly: true,
      },
      async run() {
        throw new Error("intentional failure");
      },
    });

    registerWorker(registry, worker);

    const input = createEnvelope({
      id: "env-fail",
      type: "test/input",
      source: "test",
      data: {},
    });

    await expect(
      orchestrate(registry, input, { capabilityId: "worker.fail" }),
    ).rejects.toThrow("intentional failure");
  });
});
