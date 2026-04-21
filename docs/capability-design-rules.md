# Capability design rules

These rules help keep M-MCP capabilities composable and mobile-safe.

## Rule 1 — Keep outputs typed

Capabilities should emit envelopes with explicit output types.

## Rule 2 — Keep execution bounded

Capabilities should avoid hidden loops or open-ended behavior by default.

## Rule 3 — Expose uncertainty

Confidence, ambiguity, warnings, and escalation hints should be surfaced explicitly when relevant.

## Rule 4 — Prefer normalized output

Downstream capabilities should consume structured envelopes instead of raw blobs whenever possible.

## Rule 5 — Keep host apps decoupled

Capabilities should not directly depend on InfinityPaste or Studio-OS-Chat internals unless they are defined as host-specific adapters.

## Rule 6 — Separate structure from meaning

Workers should primarily extract structure and routing signals. Higher-level reasoning can happen later.

## Rule 7 — Make failure inspectable

Errors, warnings, and traces should help the host understand what happened.
