export interface RuntimeExecutionContext {
  traceId: string;
  now: number;
  host: "mobile" | "web" | "node" | "unknown";
  metadata?: Record<string, unknown>;
}
