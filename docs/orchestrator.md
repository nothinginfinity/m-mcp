# Orchestrator

The orchestrator is the bounded execution runtime in M-MCP.

## What it does

The orchestrator:

- accepts an input envelope
- looks up a capability
- evaluates policies
- executes the capability
- records a trace
- returns the output envelope
- indicates whether escalation is recommended

## Why it is bounded

M-MCP intentionally avoids defaulting to an open-ended autonomous runtime.

The orchestrator is designed for bounded execution steps that are easier to reason about in mobile and constrained environments.

## Orchestrator flow

```text
input envelope
→ lookup capability
→ evaluate policies
→ block or allow
→ run capability
→ record trace
→ return output + trace + escalation recommendation
```

## What it does not do by default

The orchestrator does not automatically:

- plan arbitrary multi-step loops
- retry indefinitely
- execute autonomous chains
- invent routing behavior outside policy/capability rules

Those can be layered later if a host app wants them, but they are not part of the default protocol runtime.
