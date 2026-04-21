# OCR worker to cleanup tool flow

This document describes the canonical worker-to-tool handoff pattern in M-MCP.

## Flow summary

```text
OCR input
→ worker.ocr.geometry
→ structured OCR envelope
→ inspect ambiguity / warnings / confidence
→ build block-scoped cleanup tasks
→ tool.remote.cleanup
→ cleanup result envelope
```

## Why block-scoped cleanup matters

The goal is not to send the entire document to remote cleanup by default.

Instead:

- keep strong deterministic output
- isolate only weak or ambiguous blocks
- reduce cost and latency
- preserve inspectability

## Recommended cleanup task shape

Each task should identify:

- block id
- block type
- text
- reason
- suggested action

## Example

A weak code block:

```json
{
  "blockId": "block-7",
  "blockType": "code",
  "text": "return x;",
  "reason": "code-low-symbol-density",
  "suggestedAction": "llm-cleanup"
}
```

## Integration principle

Workers produce structure first. Tools perform targeted action second.

That is the intended M-MCP composition pattern.
