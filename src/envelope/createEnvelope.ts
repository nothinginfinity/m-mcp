import type { ContextEnvelope } from "../types/envelope.js";

export function createEnvelope<TData>(input: {
  id: string;
  type: string;
  version: string;
  source: string;
  data: TData;
  createdAt?: number;
  confidence?: number;
  warnings?: string[];
  metadata?: Record<string, unknown>;
  debug?: Record<string, unknown>;
}): ContextEnvelope<TData> {
  return {
    id: input.id,
    type: input.type,
    version: input.version,
    source: input.source,
    createdAt: input.createdAt ?? Date.now(),
    data: input.data,
    confidence: input.confidence,
    warnings: input.warnings,
    metadata: input.metadata,
    debug: input.debug,
  };
}
