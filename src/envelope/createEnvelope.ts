import type { ContextEnvelope } from "../types/envelope.js";
import { createEnvelopeId } from "./createEnvelopeId.js";
import { mergeEnvelopeMetadata } from "./mergeEnvelopeMetadata.js";

export function createEnvelope<TData>(input: {
  id?: string;
  type: string;
  version?: string;
  source: string;
  data: TData;
  createdAt?: number;
  confidence?: number;
  warnings?: string[];
  metadata?: Record<string, unknown>;
  debug?: Record<string, unknown>;
  ambiguity?: ContextEnvelope["ambiguity"];
  escalationHints?: ContextEnvelope["escalationHints"];
}): ContextEnvelope<TData> {
  return {
    id: input.id ?? createEnvelopeId(),
    type: input.type,
    version: input.version ?? "1.0.0",
    source: input.source,
    createdAt: input.createdAt ?? Date.now(),
    data: input.data,
    confidence: input.confidence,
    warnings: input.warnings ? [...input.warnings] : undefined,
    metadata: mergeEnvelopeMetadata(undefined, input.metadata),
    debug: input.debug ? { ...input.debug } : undefined,
    ambiguity: input.ambiguity,
    escalationHints: input.escalationHints ? [...input.escalationHints] : undefined,
  };
}
