# Architecture

M-MCP is built from five primitives:

1. Worker
2. Tool adapter
3. Context envelope
4. Capability registry
5. Orchestrator

## Invariant

Workers produce structure. Tools perform actions. Envelopes carry context. The orchestrator decides what runs next.

## Runtime shape

```text
raw input
→ worker or tool adapter
→ context envelope
→ policy evaluation
→ bounded execution
→ traceable output
```
