# Architecture

M-MCP is built from a small set of protocol primitives that can run in mobile-safe environments without assuming a long-lived server process.

## Core primitives

1. Worker
2. Tool adapter
3. Context envelope
4. Capability registry
5. Orchestrator
6. Execution policy
7. Execution trace

## Architectural invariant

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

## Separation of responsibilities

**Worker**
A deterministic transformer that reduces raw or high-entropy input into typed structured context.

**Tool adapter**
A bounded callable action that performs an operation or external interaction.

**Context envelope**
The normalized data container exchanged between capabilities.

**Capability registry**
The discoverability layer for workers and tools available in the host runtime.

**Orchestrator**
The bounded runtime executor that selects a capability, evaluates policies, runs it, and records a trace.

**Policy**
A reusable rule set that determines whether execution is allowed, preferred, or should escalate.

**Trace**
A record of what executed, when, and with what outcome.

## Integration principle

Host applications should consume M-MCP through narrow integration boundaries.

M-MCP should not be smeared across host codebases as random helper imports.

## Design goal

The system is meant to preserve the useful parts of MCP-like capability composition while avoiding assumptions that do not fit mobile or constrained runtime environments.
