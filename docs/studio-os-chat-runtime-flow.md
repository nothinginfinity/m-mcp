# Studio-OS-Chat runtime flow

This document describes the recommended M-MCP runtime flow for Studio-OS-Chat.

## General event flow

```text
app event
→ host integration boundary
→ create envelope
→ select capability
→ orchestrate execution
→ inspect output + trace
→ route to UI / storage / follow-up action
```

## Example capability-driven flow

```text
user imports OCR payload
→ create envelope(document/ocr-tsv)
→ run worker.ocr.geometry
→ inspect structured document output
→ if ambiguous, create cleanup task envelope
→ run tool.remote.cleanup
→ present structured result to app
```

## Why this flow matters

This gives Studio-OS-Chat:

- a consistent invocation model
- explicit runtime boundaries
- less hidden logic in feature code
- better traceability for debugging and future expansion
