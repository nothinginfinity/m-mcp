# Studio-OS-Chat integration

Studio-OS-Chat should consume M-MCP through app-facing adapters, not by importing capability internals directly.

## Core integration rule

Studio-OS-Chat should use M-MCP as a capability runtime layer, not as scattered helper utilities.

That means:

- register capabilities centrally
- create envelopes centrally
- execute through the orchestrator
- inspect traces and outputs centrally
- render results through app-specific adapters

## Recommended integration boundary

```text
src/lib/mmcp/
  index.ts
  registry.ts
  orchestrator.ts
  eventToEnvelope.ts
  resultRouter.ts
```

## Suggested integration pattern

```text
host event
→ create envelope
→ select capability id
→ orchestrate execution
→ inspect output + trace
→ route to UI / storage / follow-up capability
```

## Good Studio-OS-Chat use cases for M-MCP

- OCR result processing
- structured file intake
- transcript normalization
- bounded capability invocation
- mobile-safe preprocessing
- trace-driven debugging

## Why this fits Studio-OS-Chat

Studio-OS-Chat benefits from:

- a consistent capability invocation pattern
- a shared runtime contract for workers and tools
- explicit policy evaluation
- normalized output handling
- traceable execution decisions

## What not to do

Do not:

- let random screens import worker adapters directly
- bypass envelopes for convenience
- mix host state with protocol state
- hide orchestration inside UI components
- treat M-MCP like a background server process

## Recommended host behavior

Studio-OS-Chat should remain the host app. M-MCP should remain the capability protocol/runtime layer.

That separation keeps the architecture clean:

- app owns experience
- M-MCP owns capability execution contract
