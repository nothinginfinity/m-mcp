# m-mcp

M-MCP is a mobile-native capability protocol runtime that provides MCP-like tool calling, structured context passing, and bounded orchestration through workers, adapters, and normalized envelopes.

## Why M-MCP exists

Traditional MCP patterns assume server-like environments with stable processes, transports, and long-lived orchestration. Mobile environments do not reliably provide those assumptions.

M-MCP replaces the server-first model with a mobile-safe capability layer:

```text
raw input → worker/tool adapter → normalized context envelope → bounded orchestrator → optional next step
```

## Core primitives
* Worker
* Tool adapter
* Context envelope
* Capability registry
* Orchestrator

## Architectural invariant
Workers produce structure. Tools perform actions. Envelopes carry context. The orchestrator decides what runs next.

## What this repo does
This repo provides:
* core protocol types
* shared context envelope schema
* capability registry
* bounded orchestrator
* execution policies
* worker/tool factories
* trace model
* integration docs for host apps

## What this repo does not do
This repo does not contain:
* app-specific UI
* InfinityPaste-specific storage
* Studio-OS-Chat-specific screen logic
* a literal long-running MCP server

## First implementation phases
**Phase 1** — core protocol runtime, core types, envelope helpers, registry, orchestrator, policies, worker/tool factory helpers
**Phase 2** — OCR geometry worker adapter
**Phase 3** — remote cleanup tool adapter
**Phase 4** — host integrations

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

## License
MIT
