import type { ContextEnvelope } from "../types/envelope.js";
import type { ToolCapability, ToolExecutionContext } from "../types/tool.js";

export function createToolExecutionContext(
  input?: Partial<ToolExecutionContext>,
): ToolExecutionContext {
  return {
    traceId: input?.traceId ?? `tool-trace-${Date.now()}`,
    now: input?.now ?? Date.now(),
    host: input?.host ?? "unknown",
    metadata: input?.metadata,
  };
}

export async function runToolCapability<TInput, TOutput>(
  tool: ToolCapability<TInput, TOutput>,
  input: ContextEnvelope<TInput>,
  context?: Partial<ToolExecutionContext>,
): Promise<ContextEnvelope<TOutput>> {
  const executionContext = createToolExecutionContext(context);
  return tool.run(input, executionContext);
}
