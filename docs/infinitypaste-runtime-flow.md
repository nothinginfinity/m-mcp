# InfinityPaste runtime flow

This document describes the recommended M-MCP runtime flow for InfinityPaste.

## Primary OCR flow

```text
capture/import
→ create envelope(document/ocr-tsv or document/ocr-json)
→ run worker.ocr.geometry
→ inspect structured output
→ save deterministic result if confidence is acceptable
→ build cleanup tasks for ambiguous blocks only
→ run tool.remote.cleanup if needed
→ merge cleanup output
→ persist final result
```

## Envelope transitions

**Input envelope**

- document/ocr-tsv
- document/ocr-json

**Worker output**

- document/ocr-geometry

**Cleanup task envelope**

- document/cleanup-tasks

**Cleanup result envelope**

- document/cleanup-results

## Storage recommendation

Persist:

- original envelope metadata
- worker output markdown/text
- blocks
- summary
- warnings
- ambiguity
- cleanup results if used
- trace id or trace summary

## Why this flow matters

This keeps InfinityPaste:

- deterministic-first
- mobile-safe
- cheaper to run
- easier to debug
- more reusable as a structured intake system
