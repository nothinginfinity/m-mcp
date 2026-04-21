# Lifecycle

This document describes the default M-MCP execution lifecycle.

## Step 1 — Input arrives

Raw or semi-structured input enters the host application.

Examples:

- OCR payload
- transcript text
- image tags
- imported document content

## Step 2 — Envelope is created

The input is wrapped in a `ContextEnvelope`.

This gives the runtime:

- type
- source
- version
- timestamp
- optional confidence or ambiguity

## Step 3 — Capability is selected

A worker or tool is selected by capability id.

## Step 4 — Policies are evaluated

Policies are checked against:

- capability metadata
- input envelope

This may:

- allow execution
- block execution
- prefer local execution
- recommend escalation

## Step 5 — Capability runs

The capability executes within a bounded runtime context.

## Step 6 — Output envelope is returned

The capability returns a new envelope containing the transformed result.

## Step 7 — Trace is finalized

The runtime records:

- what ran
- when it ran
- whether it succeeded
- what output type was produced

## Step 8 — Host decides next step

The host application may:

- render the result
- save it
- continue with another capability
- escalate to review or cleanup
