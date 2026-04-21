import { describe, expect, it } from "vitest";
import {
  createEnvelope,
  createToolCapability,
  createWorkerCapability,
  runToolCapability,
  runWorkerCapability,
} from "../src/index.js";
import { MMcpError } from "../src/errors/MMcpError.js";

describe("capability factories", () => {
  it("creates a worker capability with validated metadata", async () => {
    const worker = createWorkerCapability({
      metadata: {
        id: "worker.uppercase",
        label: "Uppercase Worker",
        description: "Uppercases text",
        version: "0.1.0",
        inputTypes: ["text/plain"],
        outputTypes: ["text/plain"],
        mobileSafe: true,
        localOnly: true,
      },
      async run(input) {
        return {
          ...input,
          id: "worker.uppercase-out",
          source: "worker.uppercase",
          data: {
            text: String((input.data as { text: string }).text).toUpperCase(),
          },
        };
      },
    });

    const input = createEnvelope({
      id: "env-worker",
      type: "text/plain",
      source: "test",
      data: { text: "hello" },
    });

    const output = await runWorkerCapability(worker, input, { host: "mobile" });

    expect(worker.metadata.kind).toBe("worker");
    expect(output.data).toEqual({ text: "HELLO" });
  });

  it("creates a tool capability with validated metadata", async () => {
    const tool = createToolCapability({
      metadata: {
        id: "tool.wrap",
        label: "Wrap Tool",
        description: "Wraps text in brackets",
        version: "0.1.0",
        inputTypes: ["text/plain"],
        outputTypes: ["text/plain"],
        mobileSafe: true,
        localOnly: false,
      },
      async run(input) {
        return {
          ...input,
          id: "tool.wrap-out",
          source: "tool.wrap",
          data: {
            text: `[${String((input.data as { text: string }).text)}]`,
          },
        };
      },
    });

    const input = createEnvelope({
      id: "env-tool",
      type: "text/plain",
      source: "test",
      data: { text: "hello" },
    });

    const output = await runToolCapability(tool, input, { host: "web" });

    expect(tool.metadata.kind).toBe("tool");
    expect(output.data).toEqual({ text: "[hello]" });
  });

  it("rejects worker creation with invalid metadata", () => {
    expect(() =>
      createWorkerCapability({
        metadata: {
          id: "",
          label: "Bad Worker",
          description: "Invalid worker",
          version: "0.1.0",
          inputTypes: ["x"],
          outputTypes: ["y"],
        },
        async run(input) {
          return input;
        },
      }),
    ).toThrow(MMcpError);
  });

  it("rejects tool creation with invalid metadata", () => {
    expect(() =>
      createToolCapability({
        metadata: {
          id: "tool.bad",
          label: "",
          description: "Invalid tool",
          version: "0.1.0",
          inputTypes: ["x"],
          outputTypes: ["y"],
        },
        async run(input) {
          return input;
        },
      }),
    ).toThrow(MMcpError);
  });

  it("passes execution context into worker runtime", async () => {
    const worker = createWorkerCapability({
      metadata: {
        id: "worker.context",
        label: "Context Worker",
        description: "Returns the host from context",
        version: "0.1.0",
        inputTypes: ["text/plain"],
        outputTypes: ["text/plain"],
      },
      async run(input, context) {
        return {
          ...input,
          id: "worker.context-out",
          source: "worker.context",
          data: { host: context.host, traceId: context.traceId },
        };
      },
    });

    const input = createEnvelope({
      id: "env-context",
      type: "text/plain",
      source: "test",
      data: {},
    });

    const output = await runWorkerCapability(worker, input, {
      host: "mobile",
      traceId: "trace-custom",
    });

    expect(output.data).toEqual({ host: "mobile", traceId: "trace-custom" });
  });

  it("passes execution context into tool runtime", async () => {
    const tool = createToolCapability({
      metadata: {
        id: "tool.context",
        label: "Context Tool",
        description: "Returns the host from context",
        version: "0.1.0",
        inputTypes: ["text/plain"],
        outputTypes: ["text/plain"],
      },
      async run(input, context) {
        return {
          ...input,
          id: "tool.context-out",
          source: "tool.context",
          data: { host: context.host, traceId: context.traceId },
        };
      },
    });

    const input = createEnvelope({
      id: "env-tool-context",
      type: "text/plain",
      source: "test",
      data: {},
    });

    const output = await runToolCapability(tool, input, {
      host: "node",
      traceId: "trace-tool",
    });

    expect(output.data).toEqual({ host: "node", traceId: "trace-tool" });
  });
});
