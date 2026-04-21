import type { ContextEnvelope } from "../types/envelope.js";

export function cloneEnvelope<TData>(
  envelope: ContextEnvelope<TData>,
  overrides: Partial<ContextEnvelope<TData>> = {},
): ContextEnvelope<TData> {
  return {
    ...envelope,
    ...overrides,
    warnings: overrides.warnings ?? (envelope.warnings ? [...envelope.warnings] : undefined),
    escalationHints:
      overrides.escalationHints ??
      (envelope.escalationHints ? [...envelope.escalationHints] : undefined),
    metadata: overrides.metadata ?? (envelope.metadata ? { ...envelope.metadata } : undefined),
    debug: overrides.debug ?? (envelope.debug ? { ...envelope.debug } : undefined),
  };
}
