export type OcrGeometryWorkerInputType =
  | "document/ocr-tsv"
  | "document/ocr-json";

export interface OcrGeometryWorkerInput {
  provider: "tesseract" | "paddleocr" | "other";
  sourceType: "image" | "screenshot" | "pdf-page" | "ocr-tsv" | "ocr-json";
  payload: string | Record<string, unknown>;
  pageWidth?: number;
  pageHeight?: number;
  filename?: string;
  metadata?: Record<string, unknown>;
  options?: {
    enableTableInference?: boolean;
    enableCodeInference?: boolean;
  };
}

export interface OcrGeometryWorkerOutput {
  markdown: string;
  text: string;
  blocks: Array<{
    id: string;
    type: string;
    text?: string;
    level?: number;
    page: number;
    confidence: number;
    flags?: string[];
    rows?: string[][];
    ambiguity?: {
      level: "low" | "medium" | "high";
      reasons: string[];
    };
  }>;
  summary: {
    pages: number;
    blockCount: number;
    headingCount: number;
    listCount: number;
    tableCount: number;
    codeCount: number;
    ambiguityCount: number;
  };
  debug?: {
    warnings?: string[];
    ambiguousBlocks?: string[];
    html?: string;
    json?: unknown;
  };
}
