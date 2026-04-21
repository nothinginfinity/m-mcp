# InfinityPaste integration

InfinityPaste should consume M-MCP through a narrow adapter boundary.

Planned first canonical worker:
- post-ocr-geometry-engine

Planned flow:
capture → OCR worker → normalized envelope → optional cleanup tool
