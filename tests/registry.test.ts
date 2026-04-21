import { describe, expect, it } from "vitest";
import {
  CapabilityRegistry,
  createToolCapability,
  createWorkerCapability,
  hasCapability,
  listCapabilities,
  listTools,
  listWorkers,
  lookupCapability,
  registerTool,
  registerWorker,
  unregisterCapability,
} from "../src/index.js";
import { CapabilityNotFoundError } from "../src/errors/CapabilityNotFoundError.js";
import { MMcpError } from "../src/errors/MMcpError.js";

describe("capability registry", () => {
  function makeWorker(id = "worker.test") {
    return createWorkerCapability({
      metadata: {
        id,
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
          id: `${id}-out`,
          source: id,
          type: "test/output",
        };
      },
    });
  }

  function makeTool(id = "tool.test") {
    return createToolCapability({
      metadata: {
        id,
        label: "Test Tool",
        description: "A test tool",
        version: "0.1.0",
        inputTypes: ["test/input"],
        outputTypes: ["test/output"],
        mobileSafe: true,
        localOnly: false,
      },
      async run(input) {
        return {
          ...input,
          id: `${id}-out`,
          source: id,
          type: "test/output",
        };
      },
    });
  }

  it("registers and looks up a worker", () => {
    const registry = new CapabilityRegistry();
    const worker = makeWorker();
    registerWorker(registry, worker);
    expect(registry.lookup("worker.test").metadata.id).toBe("worker.test");
    expect(lookupCapability(registry, "worker.test").metadata.kind).toBe("worker");
  });

  it("registers and looks up a tool", () => {
    const registry = new CapabilityRegistry();
    const tool = makeTool();
    registerTool(registry, tool);
    expect(registry.lookup("tool.test").metadata.id).toBe("tool.test");
    expect(lookupCapability(registry, "tool.test").metadata.kind).toBe("tool");
  });

  it("prevents duplicate registrations", () => {
    const registry = new CapabilityRegistry();
    const worker = makeWorker("worker.dup");
    registerWorker(registry, worker);
    expect(() => registerWorker(registry, makeWorker("worker.dup"))).toThrow(MMcpError);
  });

  it("tracks capability existence", () => {
    const registry = new CapabilityRegistry();
    registerWorker(registry, makeWorker("worker.exists"));
    expect(hasCapability(registry, "worker.exists")).toBe(true);
    expect(hasCapability(registry, "worker.missing")).toBe(false);
  });

  it("lists all capabilities and filters by kind", () => {
    const registry = new CapabilityRegistry();
    registerWorker(registry, makeWorker("worker.a"));
    registerWorker(registry, makeWorker("worker.b"));
    registerTool(registry, makeTool("tool.a"));
    expect(listCapabilities(registry)).toHaveLength(3);
    expect(listWorkers(registry)).toHaveLength(2);
    expect(listTools(registry)).toHaveLength(1);
  });

  it("supports typed lookup by kind", () => {
    const registry = new CapabilityRegistry();
    registerWorker(registry, makeWorker("worker.typed"));
    registerTool(registry, makeTool("tool.typed"));
    expect(lookupCapability(registry, "worker.typed", "worker").metadata.kind).toBe("worker");
    expect(() => lookupCapability(registry, "worker.typed", "tool")).toThrow(MMcpError);
  });

  it("unregisters capabilities cleanly", () => {
    const registry = new CapabilityRegistry();
    registerWorker(registry, makeWorker("worker.remove"));
    expect(hasCapability(registry, "worker.remove")).toBe(true);
    expect(unregisterCapability(registry, "worker.remove")).toBe(true);
    expect(hasCapability(registry, "worker.remove")).toBe(false);
  });

  it("throws for missing capability lookup", () => {
    const registry = new CapabilityRegistry();
    expect(() => registry.lookup("worker.missing")).toThrow(CapabilityNotFoundError);
  });

  it("reports registry sizes by kind", () => {
    const registry = new CapabilityRegistry();
    registerWorker(registry, makeWorker("worker.one"));
    registerWorker(registry, makeWorker("worker.two"));
    registerTool(registry, makeTool("tool.one"));
    expect(registry.size()).toBe(3);
    expect(registry.size("worker")).toBe(2);
    expect(registry.size("tool")).toBe(1);
  });

  it("can clear all registered capabilities", () => {
    const registry = new CapabilityRegistry();
    registerWorker(registry, makeWorker("worker.one"));
    registerTool(registry, makeTool("tool.one"));
    expect(registry.size()).toBe(2);
    registry.clear();
    expect(registry.size()).toBe(0);
  });
});
