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

The first canonical M-MCP worker is:

- post-ocr-geometry-engine

It demonstrates the intended pattern:

- raw OCR or page input
- deterministic structure reconstruction
- confidence and ambiguity output
- optional escalation only for weak blocks

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
- docs/integration-infinitypaste.md
- docs/integration-studio-os-chat.md

## License

MIT
