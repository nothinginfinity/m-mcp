import type { AmbiguityInfo } from "./ambiguity.js";

export interface EscalationHint {
  recommended: boolean;
  reason: string;
  suggestedAction:
    | "llm-cleanup"
    | "manual-review"
    | "retry"
    | "route-elsewhere"
    | "preserve-as-raw";
}

export interface ContextEnvelope<TData = unknown> {
  id: string;
  type: string;
  version: string;
  source: string;
  createdAt: number;
  data: TData;
  confidence?: number;
  ambiguity?: AmbiguityInfo;
  warnings?: string[];
  escalationHints?: EscalationHint[];
  metadata?: Record<string, unknown>;
  debug?: Record<string, unknown>;
}
