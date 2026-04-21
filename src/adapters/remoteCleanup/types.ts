export interface RemoteCleanupTask {
  blockId: string;
  blockType: string;
  text?: string;
  reason: string;
  suggestedAction: "llm-cleanup" | "manual-review" | "retry";
}

export interface RemoteCleanupToolInput {
  documentId?: string;
  tasks: RemoteCleanupTask[];
  metadata?: Record<string, unknown>;
}

export interface RemoteCleanupToolOutput {
  cleanedBlocks: Array<{
    blockId: string;
    cleanedText: string;
    notes?: string[];
  }>;
  summary: {
    taskCount: number;
    cleanedCount: number;
    unresolvedCount: number;
  };
  warnings?: string[];
}

export interface RemoteCleanupFetcherInput {
  input: RemoteCleanupToolInput;
  endpoint?: string;
  apiKey?: string;
}

export type RemoteCleanupFetcher = (
  input: RemoteCleanupFetcherInput,
) => Promise<RemoteCleanupToolOutput>;
