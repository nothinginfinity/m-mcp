import { describe, expect, it } from "vitest";
import {
  ambiguityEscalationPolicy,
  createEnvelope,
  mobileSafePolicy,
} from "../src/index.js";

describe("policies", () => {
  it("blocks capabilities not marked mobile-safe", () => {
    const decision = mobileSafePolicy.evaluate(
      {
        id: "tool.remote",
        label: "Remote",
        description: "Remote tool",
        version: "0.1.0",
        kind: "tool",
        inputTypes: ["x"],
        outputTypes: ["y"],
        mobileSafe: false,
      },
      createEnvelope({
        id: "env-1",
        type: "x",
        version: "1.0.0",
        source: "test",
        data: {},
      }),
    );

    expect(decision.allowed).toBe(false);
  });

  it("recommends escalation for high ambiguity", () => {
    const decision = ambiguityEscalationPolicy.evaluate(
      {
        id: "worker.test",
        label: "Worker",
        description: "Worker",
        version: "0.1.0",
        kind: "worker",
        inputTypes: ["x"],
        outputTypes: ["y"],
      },
      {
        id: "env-1",
        type: "x",
        version: "1.0.0",
        source: "test",
        createdAt: Date.now(),
        data: {},
        ambiguity: {
          level: "high",
          reasons: ["unclear-structure"],
        },
      },
    );

    expect(decision.shouldEscalate).toBe(true);
  });
});
