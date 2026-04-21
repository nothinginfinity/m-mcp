import { createEnvelope } from "../../envelope/createEnvelope.js";
import { createToolCapability } from "../../tools/createToolCapability.js";
import type { ContextEnvelope } from "../../types/envelope.js";
import type {
  RemoteCleanupFetcher,
  RemoteCleanupToolInput,
  RemoteCleanupToolOutput,
} from "./types.js";
import { defaultRemoteCleanupFetcher } from "./defaultRemoteCleanupFetcher.js";

function averageConfidenceFromTaskCount(taskCount: number): number | undefined {
  if (taskCount <= 0) {
    return undefined;
  }
  if (taskCount === 1) {
    return 0.9;
  }
  if (taskCount <= 3) {
    return 0.8;
  }
  return 0.7;
}

export function createRemoteCleanupTool(config?: {
  endpoint?: string;
  apiKey?: string;
  fetcher?: RemoteCleanupFetcher;
}) {
  const fetcher = config?.fetcher ?? defaultRemoteCleanupFetcher;

  return createToolCapability<RemoteCleanupToolInput, RemoteCleanupToolOutput>({
    metadata: {
      id: "tool.remote.cleanup",
      label: "Remote Cleanup Tool",
      description:
        "Runs block-scoped remote cleanup tasks against an external cleanup endpoint.",
      version: "0.1.0",
      inputTypes: ["document/cleanup-tasks"],
      outputTypes: ["document/cleanup-results"],
      mobileSafe: true,
      localOnly: false,
      tags: ["remote", "cleanup", "tool"],
    },
    async run(input: ContextEnvelope<RemoteCleanupToolInput>) {
      const result = await fetcher({
        input: input.data,
        endpoint: config?.endpoint,
        apiKey: config?.apiKey,
      });

      const unresolvedCount =
        result.summary.unresolvedCount ??
        Math.max(0, result.summary.taskCount - result.summary.cleanedCount);

      return createEnvelope({
        type: "document/cleanup-results",
        version: "1.0.0",
        source: "m-mcp/remote-cleanup-tool",
        data: {
          cleanedBlocks: result.cleanedBlocks,
          summary: {
            taskCount: result.summary.taskCount,
            cleanedCount: result.summary.cleanedCount,
            unresolvedCount,
          },
          warnings: result.warnings,
        },
        confidence: averageConfidenceFromTaskCount(result.summary.taskCount),
        warnings: result.warnings,
        ambiguity:
          unresolvedCount > 0
            ? {
                level: unresolvedCount === result.summary.taskCount ? "high" : "medium",
                reasons: ["cleanup-left-unresolved-blocks"],
              }
            : undefined,
        escalationHints:
          unresolvedCount > 0
            ? [
                {
                  recommended: true,
                  reason: "cleanup-left-unresolved-blocks",
                  suggestedAction: "manual-review",
                },
              ]
            : undefined,
      });
    },
  });
}

export const remoteCleanupTool = createRemoteCleanupTool();
