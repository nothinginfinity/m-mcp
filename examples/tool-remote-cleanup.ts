import {
  CapabilityRegistry,
  createEnvelope,
  createRemoteCleanupTool,
  orchestrate,
  registerTool,
} from "../src/index.js";

async function main() {
  const registry = new CapabilityRegistry();

  const tool = createRemoteCleanupTool({
    fetcher: async ({ input }) => {
      return {
        cleanedBlocks: input.tasks.map((task) => ({
          blockId: task.blockId,
          cleanedText: `[cleaned] ${task.text ?? ""}`.trim(),
          notes: [`reason: ${task.reason}`],
        })),
        summary: {
          taskCount: input.tasks.length,
          cleanedCount: input.tasks.length,
          unresolvedCount: 0,
        },
        warnings: [],
      };
    },
  });

  registerTool(registry, tool);

  const input = createEnvelope({
    type: "document/cleanup-tasks",
    source: "example",
    data: {
      documentId: "doc-1",
      tasks: [
        {
          blockId: "block-7",
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

  console.log(JSON.stringify(result.output.data, null, 2));
  console.log(JSON.stringify(result.trace, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
