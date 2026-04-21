import type { ContextEnvelope, EscalationHint } from "../types/envelope.js";

export function addEscalationHint<TData>(
  envelope: ContextEnvelope<TData>,
  hint: EscalationHint,
): ContextEnvelope<TData> {
  return {
    ...envelope,
    escalationHints: [...(envelope.escalationHints ?? []), hint],
  };
}
