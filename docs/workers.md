# Workers

A worker is a deterministic multi-step transformer that converts raw or semi-structured input into normalized structured output.

## What a worker does

Workers are designed to:

- reduce raw input entropy
- extract structure
- attach confidence
- attach ambiguity
- produce typed output for downstream reasoning

## What a worker is not

A worker is not:

- a long-running autonomous process
- a planning loop
- a general agent
- a raw LLM wrapper

## Worker pattern

```text
raw input
→ deterministic preprocessing
→ structural extraction
→ typed output
→ confidence / ambiguity
→ envelope
```

## Typical worker examples

- OCR geometry worker
- transcript normalizer worker
- layout parser worker
- form mapper worker
- document classifier worker

## Worker design guidance

A good worker should:

- have clear input/output types
- operate within bounded runtime assumptions
- expose uncertainty explicitly
- remain useful without an LLM
- avoid leaking raw data when reduced structure is sufficient

## Canonical first worker

The first canonical worker for M-MCP is post-ocr-geometry-engine.

It demonstrates:

- deterministic preprocessing
- structured output
- confidence and ambiguity
- optional escalation only for uncertain blocks
