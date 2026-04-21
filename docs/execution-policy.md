# Execution policy

Policies are reusable execution rules that influence capability selection and runtime behavior.

## Policy responsibilities

A policy may:

- allow execution
- block execution
- prefer local execution
- recommend escalation

## Built-in policy directions

### Local-first

Prefer capabilities that are safe to run locally.

### Mobile-safe

Block capabilities that are explicitly not safe for mobile contexts.

### Ambiguity escalation

Recommend escalation when the input or output indicates high uncertainty.

## Policy philosophy

Policies should remain:

- explicit
- reusable
- host-agnostic
- composable

M-MCP uses policy evaluation to keep execution decisions transparent instead of hiding them inside capability code.
