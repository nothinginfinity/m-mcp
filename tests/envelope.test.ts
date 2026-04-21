import { describe, expect, it } from "vitest";
import { createEnvelope, validateEnvelope } from "../src/index.js";

describe("envelope helpers", () => {
  it("creates and validates an envelope", () => {
    const envelope = createEnvelope({
      id: "env-1",
      type: "test/input",
      version: "1.0.0",
      source: "test",
      data: { hello: "world" },
    });

    expect(envelope.id).toBe("env-1");
    expect(validateEnvelope(envelope)).toBe(true);
  });
});
