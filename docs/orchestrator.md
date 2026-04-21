# Orchestrator

The orchestrator is a bounded executor.

It:
- accepts an input envelope
- looks up a capability
- applies policies
- executes the capability
- records a trace
- returns the output
