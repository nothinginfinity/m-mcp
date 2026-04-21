# m-mcp

M-MCP is a mobile-native capability protocol runtime that provides MCP-like tool calling, structured context passing, and bounded orchestration through workers, adapters, and normalized envelopes.

## Why M-MCP exists

Traditional MCP patterns assume server-like environments with stable processes, transports, and long-lived orchestration. Mobile environments do not reliably provide those assumptions.

M-MCP replaces the server-first model with a mobile-safe capability layer:

```text
raw input → worker/tool adapter → normalized context envelope → bounded orchestrator → optional next step
```

## Core primitives

- Worker
- Tool adapter
- Context envelope
- Capability registry
- Orchestrator
- Execution policies
- Execution traces

## Architectural invariant

Workers produce structure. Tools perform actions. Envelopes carry context. The orchestrator decides what runs next.

## What this repo does

This repo provides:

- core protocol types
- shared context envelope schema
- capability factories
- in-memory capability registry
- bounded orchestrator
- execution policy helpers
- trace model
- worker and tool adapter patterns
- integration docs for host apps

## What this repo does not do

This repo does not contain:

- app-specific UI
- InfinityPaste-specific storage
- Studio-OS-Chat-specific screen logic
- a literal long-running MCP server
- mandatory remote execution
- autonomous agent loops by default

## Mental model

```text
Tool
→ one bounded action

Worker
→ deterministic multi-step transformation
→ typed output + confidence + routing hints

Agent
→ goal-directed loop
→ composes workers and tools
→ decides what to do next
```

## Lifecycle

```text
raw input
→ create envelope
→ register or select capability
→ evaluate policies
→ execute worker/tool
→ collect trace
→ optionally escalate or continue
```

## Why this is mobile-safe

M-MCP is designed for constrained environments:

- bounded execution instead of long-running server assumptions
- local-first policies
- normalized envelopes instead of raw blob passing
- inspectable confidence and ambiguity
- explicit escalation instead of implicit remote dependence

## Canonical first worker

- worker.ocr.geometry

This wraps post-ocr-geometry-engine as the first canonical M-MCP worker.

## Canonical first remote tool

- tool.remote.cleanup

This demonstrates block-scoped remote cleanup as a tool adapter rather than a hidden whole-document fallback.

## Integration philosophy

M-MCP should be consumed by host apps through narrow adapter boundaries.

**InfinityPaste**

Use M-MCP to:

- wrap OCR input in envelopes
- run deterministic workers first
- inspect confidence/ambiguity
- optionally route flagged blocks to cleanup tools
- persist structured results

**Studio-OS-Chat**

Use M-MCP to:

- register capabilities
- construct envelopes from app events
- run bounded orchestration
- inspect traces and results
- render or route structured output

## Install

```
npm install
```

## Build

```
npm run build
```

## Test

```
npm run test
```

## Dev

```
npm run test:watch
```

## Commit roadmap

1. chore(init): scaffold M-MCP repo with core protocol types and project config
2. feat(envelope): add context envelope creation and validation helpers
3. feat(registry): add in-memory capability registry for workers and tools
4. feat(orchestrator): add bounded orchestrator with execution trace support
5. feat(policies): add local-first mobile-safe and ambiguity escalation policies
6. feat(workers): add worker and tool capability factory helpers
7. docs(protocol): document worker tool envelope and orchestrator model
8. feat(adapter): add OCR geometry worker adapter as first canonical M-MCP worker
9. feat(tool): add remote cleanup tool adapter example
10. docs(integration): add InfinityPaste and Studio-OS-Chat integration guides

## Documentation map

- docs/architecture.md
- docs/protocol.md
- docs/workers.md
- docs/tools.md
- docs/envelopes.md
- docs/orchestrator.md
- docs/execution-policy.md
- docs/lifecycle.md
- docs/mmcp-vs-mcp.md
- docs/worker-patterns.md
- docs/capability-design-rules.md
- docs/glossary.md
- docs/integration-boundaries.md
- docs/integration-checklist.md
- docs/integration-infinitypaste.md
- docs/infinitypaste-runtime-flow.md
- docs/integration-studio-os-chat.md
- docs/studio-os-chat-runtime-flow.md
- docs/ocr-worker-to-cleanup-tool-flow.md

## License

MIT
