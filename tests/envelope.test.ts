import { describe, expect, it } from "vitest";
import {
  addEscalationHint,
  cloneEnvelope,
  createEnvelope,
  createEnvelopeId,
  normalizeEnvelope,
  validateEnvelope,
} from "../src/index.js";
import { EnvelopeValidationError } from "../src/errors/EnvelopeValidationError.js";

describe("envelope helpers", () => {
  it("creates and validates an envelope with defaults", () => {
    const envelope = createEnvelope({
      type: "test/input",
      source: "test",
      data: { hello: "world" },
    });

    expect(envelope.id).toBeTruthy();
    expect(envelope.version).toBe("1.0.0");
    expect(validateEnvelope(envelope)).toBe(true);
  });

  it("creates unique envelope ids", () => {
    const a = createEnvelopeId();
    const b = createEnvelopeId();

    expect(a).not.toBe(b);
    expect(a.startsWith("env-")).toBe(true);
    expect(b.startsWith("env-")).toBe(true);
  });

  it("rejects invalid confidence values", () => {
    const envelope = {
      id: "env-1",
      type: "test/input",
      version: "1.0.0",
      source: "test",
      createdAt: Date.now(),
      data: {},
      confidence: 2,
    };

    expect(() => validateEnvelope(envelope)).toThrow(EnvelopeValidationError);
  });

  it("supports ambiguity validation", () => {
    const envelope = createEnvelope({
      id: "env-amb",
      type: "test/input",
      source: "test",
      data: {},
      ambiguity: {
        level: "medium",
        reasons: ["unclear-layout"],
      },
    });

    expect(validateEnvelope(envelope)).toBe(true);
  });

  it("adds escalation hints immutably", () => {
    const envelope = createEnvelope({
      id: "env-hint",
      type: "test/input",
      source: "test",
      data: {},
    });

    const updated = addEscalationHint(envelope, {
      recommended: true,
      reason: "high ambiguity",
      suggestedAction: "manual-review",
    });

    expect(envelope.escalationHints).toBeUndefined();
    expect(updated.escalationHints).toHaveLength(1);
    expect(updated.escalationHints?.[0]?.reason).toBe("high ambiguity");
  });

  it("clones an envelope with overrides", () => {
    const envelope = createEnvelope({
      id: "env-clone",
      type: "test/input",
      source: "test",
      data: { value: 1 },
      warnings: ["original warning"],
      metadata: { from: "source-a" },
    });

    const cloned = cloneEnvelope(envelope, {
      source: "test.clone",
      warnings: ["new warning"],
      metadata: { from: "source-b" },
    });

    expect(cloned.id).toBe("env-clone");
    expect(cloned.source).toBe("test.clone");
    expect(cloned.warnings).toEqual(["new warning"]);
    expect(cloned.metadata).toEqual({ from: "source-b" });
    expect(envelope.source).toBe("test");
  });

  it("normalizes and validates an existing envelope", () => {
    const envelope = createEnvelope({
      id: "env-normalize",
      type: "test/input",
      source: "test",
      data: { value: 42 },
      confidence: 0.9,
    });

    const normalized = normalizeEnvelope(envelope);

    expect(normalized.id).toBe("env-normalize");
    expect(normalized.confidence).toBe(0.9);
    expect(validateEnvelope(normalized)).toBe(true);
  });

  it("rejects malformed escalation hints", () => {
    const envelope = {
      id: "env-bad-hint",
      type: "test/input",
      version: "1.0.0",
      source: "test",
      createdAt: Date.now(),
      data: {},
      escalationHints: [
        {
          recommended: "yes",
          reason: "bad",
          suggestedAction: "manual-review",
        },
      ],
    };

    expect(() => validateEnvelope(envelope as never)).toThrow(EnvelopeValidationError);
  });
});
