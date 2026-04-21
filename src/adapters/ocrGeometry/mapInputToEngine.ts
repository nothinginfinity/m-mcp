import { fromTesseractTSV } from "post-ocr-geometry-engine";
import type { ContextEnvelope } from "../../types/envelope.js";
import type { OcrGeometryWorkerInput } from "./types.js";
import { MMcpError } from "../../errors/MMcpError.js";

export interface EngineAdapterInput {
  normalized: unknown;
  buildOptions: {
    enableTableInference?: boolean;
    enableCodeInference?: boolean;
  };
}

export function mapInputToEngine(
  envelope: ContextEnvelope<OcrGeometryWorkerInput>,
): EngineAdapterInput {
  const input = envelope.data;

  if (input.provider === "tesseract") {
    if (typeof input.payload !== "string") {
      throw new MMcpError(
        "Tesseract OCR worker input payload must be a TSV string",
      );
    }

    return {
      normalized: fromTesseractTSV(input.payload, {
        pageWidth: input.pageWidth,
        pageHeight: input.pageHeight,
      }),
      buildOptions: {
        enableTableInference: input.options?.enableTableInference,
        enableCodeInference: input.options?.enableCodeInference,
      },
    };
  }

  throw new MMcpError(
    `OCR geometry worker does not yet support provider "${input.provider}" in this commit`,
  );
}
