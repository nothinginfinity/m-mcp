import type { ContextEnvelope } from "../types/envelope.js";
import { createEnvelope } from "./createEnvelope.js";
import { validateEnvelope } from "./validateEnvelope.js";

export function normalizeEnvelope<TData>(
  envelope: ContextEnvelope<TData>,
): ContextEnvelope<TData> {
  const normalized = createEnvelope({
    id: envelope.id,
    type: envelope.type,
    version: envelope.version,
    source: envelope.source,
    createdAt: envelope.createdAt,
    data: envelope.data,
    confidence: envelope.confidence,
    warnings: envelope.warnings,
    metadata: envelope.metadata,
    debug: envelope.debug,
    ambiguity: envelope.ambiguity,
    escalationHints: envelope.escalationHints,
  });

  validateEnvelope(normalized);
  return normalized;
}
