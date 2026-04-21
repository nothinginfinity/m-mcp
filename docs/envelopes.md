# Envelopes

A context envelope is the standard typed container passed between capabilities.

## Why envelopes matter

Envelopes make capability composition predictable.

Instead of passing raw blobs or ad hoc objects between runtime steps, M-MCP uses a normalized container with explicit metadata.

## Core fields

A context envelope includes:

- `id`
- `type`
- `version`
- `source`
- `createdAt`
- `data`

Optional fields:

- `confidence`
- `ambiguity`
- `warnings`
- `escalationHints`
- `metadata`
- `debug`

## Envelope purpose

Envelopes let the runtime preserve:

- typed payload identity
- provenance
- confidence and ambiguity
- escalation recommendations
- debug context

## Envelope design rule

By default, downstream capabilities should consume the normalized envelope rather than the original raw input representation.

That means the envelope becomes the runtime boundary for safe composition.
