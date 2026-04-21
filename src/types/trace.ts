export interface ExecutionTraceStep {
  capabilityId: string;
  capabilityKind: "worker" | "tool";
  startedAt: number;
  finishedAt: number;
  success: boolean;
  inputType: string;
  outputType?: string;
  warnings?: string[];
  error?: string;
}

export interface ExecutionTrace {
  traceId: string;
  startedAt: number;
  finishedAt?: number;
  steps: ExecutionTraceStep[];
}
