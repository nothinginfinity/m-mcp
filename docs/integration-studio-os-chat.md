# Studio-OS-Chat integration

Studio-OS-Chat should consume M-MCP through app-facing adapters, not by importing capability internals directly.

## Integration principle

Studio-OS-Chat should use M-MCP for:

- capability registration
- envelope creation
- bounded orchestration
- policy evaluation
- structured output handling

## Suggested integration pattern

```text
host event
→ create envelope
→ select capability
→ run orchestrator
→ inspect trace and result
→ render or route output
```

## Benefits

Using M-MCP gives Studio-OS-Chat:

- consistent capability invocation
- normalized structured context
- clearer mobile/runtime boundaries
- traceable execution behavior
