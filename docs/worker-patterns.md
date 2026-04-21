# Worker patterns

Workers are one of the central primitives in M-MCP.

## Common worker patterns

### Structure worker

Extracts layout, regions, or typed blocks from raw input.

Examples:

- OCR geometry worker
- layout parser

### Normalization worker

Cleans, segments, or restructures already-extracted data.

Examples:

- transcript normalizer
- handwriting normalizer

### Routing worker

Classifies input and emits routing hints.

Examples:

- document classifier
- content-type classifier

### Mapping worker

Converts detected structure into typed field/value representations.

Examples:

- form field mapper
- label/value extractor

## Worker design question

A worker should answer one or more of these:

- What is the structure here?
- What should be ignored?
- What is uncertain?
- What should this be routed to?
- What reduced representation is enough for downstream reasoning?
