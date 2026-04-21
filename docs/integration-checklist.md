# Integration checklist

Use this checklist when integrating M-MCP into a host app.

## Boundary setup

- [ ] Create one host integration boundary
- [ ] Register capabilities centrally
- [ ] Centralize envelope creation
- [ ] Centralize orchestrator calls

## Runtime usage

- [ ] Use typed envelopes for all capability inputs
- [ ] Inspect confidence and ambiguity
- [ ] Preserve execution traces
- [ ] Prefer deterministic workers first
- [ ] Route only uncertain outputs to cleanup tools

## Architecture hygiene

- [ ] Do not import worker/tool internals across random files
- [ ] Do not bypass envelopes
- [ ] Do not flatten structured output too early
- [ ] Do not make remote cleanup the default path
- [ ] Do not turn M-MCP into hidden app glue

## Product safety

- [ ] Keep raw blob usage explicit
- [ ] Preserve fallback behavior
- [ ] Preserve debug and warning signals
- [ ] Make unresolved outputs reviewable
