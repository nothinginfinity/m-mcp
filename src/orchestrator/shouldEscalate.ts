import type { ContextEnvelope } from "../types/envelope.js";

export function shouldEscalate(envelope: ContextEnvelope): boolean {
  return envelope.ambiguity?.level === "high";
}
