# InfinityPaste integration

InfinityPaste should consume M-MCP through a narrow adapter boundary.

## Integration principle

InfinityPaste should not import internal capability logic from random protocol modules.

Instead, it should:

- register capabilities
- create envelopes
- call the orchestrator
- consume typed results

## Canonical first worker

The first worker to integrate is:

- `post-ocr-geometry-engine`

## Planned flow

```text
capture/import
→ wrap input in envelope
→ run OCR geometry worker
→ receive structured OCR envelope
→ inspect confidence/ambiguity
→ optionally route flagged blocks to cleanup tool
→ save deterministic result
```

## Why this fits InfinityPaste

InfinityPaste benefits from:

- deterministic local-first preprocessing
- reduced raw blob exposure
- explicit escalation only for weak spans or blocks
- structured output that can be persisted and indexed
