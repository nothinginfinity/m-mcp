# Tools

A tool adapter is a bounded callable action.

## What a tool does

A tool typically:

- performs an action
- fetches or transforms data
- wraps a remote or local operation
- returns a typed envelope

## What a tool is not

A tool is not:

- a multi-stage structure reconstruction pipeline
- a planning loop
- a registry by itself
- an autonomous decision system

## Tool examples

- remote cleanup request
- OCR provider invocation wrapper
- search wrapper
- file loader
- export action

## Tool pattern

```text
input envelope
→ bounded action
→ output envelope
```

## Design guidance

A good tool should:

- be narrow in scope
- return typed output
- be safe to run in bounded environments
- declare whether it is mobile-safe
- declare whether it is local-only
