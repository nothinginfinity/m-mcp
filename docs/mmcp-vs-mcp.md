# M-MCP vs MCP

M-MCP is not a literal replacement for a traditional MCP server.

## Traditional MCP assumptions

Many MCP-style systems assume:

- stable server process
- long-lived transport
- durable session behavior
- server-oriented environment

## M-MCP assumptions

M-MCP assumes:

- bounded execution
- local-first preference
- constrained runtime environments
- typed envelopes
- explicit policies
- explicit escalation

## Practical difference

Traditional MCP is often server-first.

M-MCP is protocol-first and mobile-safe.

## Shared spirit

Both approaches care about:

- capability composition
- typed interaction boundaries
- structured context passing
- modular execution

## Key difference

M-MCP does not require the host device to behave like a traditional server.
