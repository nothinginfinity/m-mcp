import { describe, expect, it } from "vitest";
import {
  ambiguityEscalationPolicy,
  combinePolicyDecisions,
  createEnvelope,
  createStaticPolicy,
  defaultPolicies,
  localFirstPolicy,
  mobileSafePolicy,
} from "../src/index.js";

describe("policies", () => {
  const mobileSafeWorker = {
    id: "worker.safe",
    label: "Safe Worker",
    description: "A mobile-safe worker",
    version: "0.1.0",
    kind: "worker" as const,
    inputTypes: ["x"],
    outputTypes: ["y"],
    mobileSafe: true,
    localOnly: true,
  };

  const unsafeTool = {
    id: "tool.unsafe",
    label: "Unsafe Tool",
    description: "Not mobile-safe",
    version: "0.1.0",
    kind: "tool" as const,
    inputTypes: ["x"],
    outputTypes: ["y"],
    mobileSafe: false,
    localOnly: false,
  };

  it("localFirstPolicy prefers local execution for mobile-safe capabilities", () => {
    const decision = localFirstPolicy.evaluate(
      mobileSafeWorker,
      createEnvelope({ id: "env-1", type: "x", source: "test", data: {} }),
    );
    expect(decision.allowed).toBe(true);
    expect(decision.preferLocal).toBe(true);
  });

  it("mobileSafePolicy blocks non-mobile-safe capabilities", () => {
    const decision = mobileSafePolicy.evaluate(
      unsafeTool,
      createEnvelope({ id: "env-2", type: "x", source: "test", data: {} }),
    );
    expect(decision.allowed).toBe(false);
    expect(decision.reason).toBe("Capability is not marked mobile-safe");
  });

  it("ambiguityEscalationPolicy recommends escalation for high ambiguity", () => {
    const decision = ambiguityEscalationPolicy.evaluate(
      mobileSafeWorker,
      createEnvelope({
        id: "env-3",
        type: "x",
        source: "test",
        data: {},
        ambiguity: { level: "high", reasons: ["unclear-structure"] },
      }),
    );
    expect(decision.allowed).toBe(true);
    expect(decision.shouldEscalate).toBe(true);
  });

  it("ambiguityEscalationPolicy respects explicit escalation hints", () => {
    const decision = ambiguityEscalationPolicy.evaluate(
      mobileSafeWorker,
      createEnvelope({
        id: "env-4",
        type: "x",
        source: "test",
        data: {},
        escalationHints: [
          { recommended: true, reason: "manual-review-needed", suggestedAction: "manual-review" },
        ],
      }),
    );
    expect(decision.shouldEscalate).toBe(true);
  });

  it("combinePolicyDecisions blocks when any decision blocks", () => {
    const combined = combinePolicyDecisions([
      { allowed: true, preferLocal: true },
      { allowed: false, reason: "not allowed" },
      { allowed: true, shouldEscalate: true },
    ]);
    expect(combined.allowed).toBe(false);
    expect(combined.reason).toBe("not allowed");
    expect(combined.preferLocal).toBe(true);
    expect(combined.shouldEscalate).toBe(true);
  });

  it("combinePolicyDecisions merges positive signals when all allow", () => {
    const combined = combinePolicyDecisions([
      { allowed: true, preferLocal: true },
      { allowed: true, shouldEscalate: true },
      { allowed: true },
    ]);
    expect(combined.allowed).toBe(true);
    expect(combined.preferLocal).toBe(true);
    expect(combined.shouldEscalate).toBe(true);
  });

  it("createStaticPolicy builds a reusable policy", () => {
    const policy = createStaticPolicy({
      id: "test-static-policy",
      evaluate() {
        return { allowed: true, preferLocal: true };
      },
    });
    const decision = policy.evaluate(
      mobileSafeWorker,
      createEnvelope({ id: "env-5", type: "x", source: "test", data: {} }),
    );
    expect(policy.id).toBe("test-static-policy");
    expect(decision.allowed).toBe(true);
    expect(decision.preferLocal).toBe(true);
  });

  it("exports the default policy set", () => {
    expect(defaultPolicies.map((policy) => policy.id)).toEqual([
      "local-first-policy",
      "mobile-safe-policy",
      "ambiguity-escalation-policy",
    ]);
  });
});
