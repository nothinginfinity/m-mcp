# InfinityPaste integration

InfinityPaste should consume M-MCP through a narrow adapter boundary.

## Core integration rule

InfinityPaste should not import protocol internals throughout the app.

Instead, it should centralize M-MCP usage behind one integration boundary that is responsible for:

- envelope creation
- capability selection
- orchestration
- result normalization
- persistence handoff

## Recommended integration boundary

```text
src/lib/mmcp/
  index.ts
  registry.ts
  ocrPipeline.ts
  cleanupPipeline.ts
  envelopeFactory.ts
```

InfinityPaste UI and storage code should call into that boundary rather than importing workers/tools directly.

## First canonical flow

```text
capture/import
→ create envelope
→ run worker.ocr.geometry
→ inspect confidence / ambiguity / trace
→ if clean: persist deterministic result
→ if ambiguous: build cleanup tasks
→ run tool.remote.cleanup
→ merge cleanup result
→ persist final structured output
```

## Why this fits InfinityPaste

InfinityPaste benefits from:

- deterministic-first processing
- lower token cost
- structured OCR output
- block-scoped cleanup instead of whole-document cleanup
- clearer mobile-safe execution rules
- traceable preprocessing behavior

## Recommended usage pattern

**Step 1 — Wrap OCR input**

InfinityPaste should convert OCR payloads into:

- document/ocr-tsv
- or document/ocr-json

**Step 2 — Run OCR worker**

Use:

- worker.ocr.geometry

**Step 3 — Inspect output**

Use the returned envelope to inspect:

- data.blocks
- data.summary
- confidence
- ambiguity
- warnings
- trace

**Step 4 — Build cleanup tasks only when needed**

Only ambiguous or low-confidence blocks should be routed into cleanup tasks.

**Step 5 — Persist structured output**

Persist:

- markdown
- plain text
- blocks
- summary
- ambiguity/warnings
- optional cleanup results

## What not to do

Do not:

- send every OCR result directly to remote cleanup
- treat remote cleanup as the default path
- import worker internals directly into random UI modules
- flatten structured block output too early
- discard trace/debug data before persistence decisions are made

## Recommended app contract

InfinityPaste should define an internal app-level result shape that mirrors but does not expose protocol internals directly.

That app-level shape can be fed by M-MCP envelopes while remaining app-controlled.
