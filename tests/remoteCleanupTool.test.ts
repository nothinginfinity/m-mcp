import { describe, expect, it } from "vitest";
import {
  CapabilityRegistry,
  createEnvelope,
  createRemoteCleanupTool,
  orchestrate,
  registerTool,
  runToolCapability,
} from "../src/index.js";

describe("remoteCleanupTool", () => {
  it("runs directly as a tool capability", async () => {
    const tool = createRemoteCleanupTool({
      fetcher: async ({ input }) => ({
        cleanedBlocks: input.tasks.map((task) => ({
          blockId: task.blockId,
          cleanedText: `cleaned:${task.text ?? ""}`,
          notes: [],
        })),
        summary: {
          taskCount: input.tasks.length,
          cleanedCount: input.tasks.length,
          unresolvedCount: 0,
        },
        warnings: [],
      }),
    });

    const input = createEnvelope({
      type: "document/cleanup-tasks",
      source: "test",
      data: {
        documentId: "doc-1",
        tasks: [
          {
            blockId: "block-1",
            blockType: "paragraph",
            text: "helo world",
            reason: "manual-cleanup",
            suggestedAction: "llm-cleanup",
          },
        ],
      },
    });

    const output = await runToolCapability(tool, input, {
      host: "mobile",
    });

    expect(output.type).toBe("document/cleanup-results");
    expect(output.data.cleanedBlocks).toHaveLength(1);
    expect(output.data.summary.cleanedCount).toBe(1);
  });

  it("runs through the orchestrator as a registered tool", async () => {
    const registry = new CapabilityRegistry();

    const tool = createRemoteCleanupTool({
      fetcher: async ({ input }) => ({
        cleanedBlocks: input.tasks.map((task) => ({
          blockId: task.blockId,
          cleanedText: task.text ?? "",
          notes: ["ok"],
        })),
        summary: {
          taskCount: input.tasks.length,
          cleanedCount: input.tasks.length,
          unresolvedCount: 0,
        },
        warnings: [],
      }),
    });

    registerTool(registry, tool);

    const input = createEnvelope({
      type: "document/cleanup-tasks",
      source: "test",
      data: {
        documentId: "doc-2",
        tasks: [
          {
            blockId: "block-2",
            blockType: "code",
            text: "return x;",
            reason: "code-low-symbol-density",
            suggestedAction: "llm-cleanup",
          },
        ],
      },
    });

    const result = await orchestrate(registry, input, {
      capabilityId: "tool.remote.cleanup",
      host: "mobile",
    });

    expect(result.output.type).toBe("document/cleanup-results");
    expect(result.trace.steps).toHaveLength(1);
    expect(result.trace.steps[0]?.capabilityId).toBe("tool.remote.cleanup");
  });

  it("marks ambiguity when unresolved cleanup remains", async () => {
    const tool = createRemoteCleanupTool({
      fetcher: async ({ input }) => ({
        cleanedBlocks: [],
        summary: {
          taskCount: input.tasks.length,
          cleanedCount: 0,
          unresolvedCount: input.tasks.length,
        },
        warnings: ["nothing cleaned"],
      }),
    });

    const input = createEnvelope({
      type: "document/cleanup-tasks",
      source: "test",
      data: {
        documentId: "doc-3",
        tasks: [
          {
            blockId: "block-3",
            blockType: "table",
            text: "Nme | Vlue",
            reason: "table-column-skew",
            suggestedAction: "llm-cleanup",
          },
        ],
      },
    });

    const output = await runToolCapability(tool, input);

    expect(output.ambiguity?.level).toBe("high");
    expect(output.escalationHints?.[0]?.recommended).toBe(true);
  });
});
