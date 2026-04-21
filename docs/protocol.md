# Protocol

M-MCP is a contract-first runtime.

Its protocol is defined by:

- capability metadata
- context envelopes
- execution contexts
- execution policies
- execution traces

The goal is to make capabilities composable without requiring a traditional server process.

## Protocol boundary

Every capability interaction in M-MCP should follow this pattern:

1. input is wrapped in a `ContextEnvelope`
2. a capability is selected by id
3. policies are evaluated against the capability + input
4. the capability runs with a bounded execution context
5. the capability returns a new `ContextEnvelope`
6. a trace records the execution

## Protocol properties

Good protocol behavior in M-MCP should be:

- typed
- bounded
- explicit
- inspectable
- local-first when possible
- safe to escalate when needed

## Required protocol elements

### Capability metadata

A capability must declare:

- id
- label
- description
- version
- kind
- inputTypes
- outputTypes

### Envelope

An envelope must declare:

- id
- type
- version
- source
- createdAt
- data

Optional fields include:

- confidence
- ambiguity
- warnings
- escalationHints
- metadata
- debug

### Execution trace

A trace records:

- trace id
- start time
- finish time
- steps
- success/failure details

## Protocol philosophy

M-MCP tries to standardize capability interaction, not application behavior.

The protocol provides a shared structure. Host apps decide what to do with the results.
