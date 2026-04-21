import { buildDocument } from "post-ocr-geometry-engine";
import { createWorkerCapability } from "../../workers/createWorkerCapability.js";
import { mapInputToEngine } from "./mapInputToEngine.js";
import { mapEngineOutputToEnvelope } from "./mapEngineOutputToEnvelope.js";
import type { OcrGeometryWorkerInput, OcrGeometryWorkerOutput } from "./types.js";
import type { ContextEnvelope } from "../../types/envelope.js";

export const ocrGeometryWorker = createWorkerCapability<
  OcrGeometryWorkerInput,
  OcrGeometryWorkerOutput
>({
  metadata: {
    id: "worker.ocr.geometry",
    label: "OCR Geometry Worker",
    description:
      "Runs post-ocr-geometry-engine as a deterministic worker that converts OCR payloads into structured document envelopes.",
    version: "0.1.0",
    inputTypes: ["document/ocr-tsv", "document/ocr-json"],
    outputTypes: ["document/ocr-geometry"],
    mobileSafe: true,
    localOnly: true,
    tags: ["ocr", "geometry", "document", "worker"],
  },
  async run(input: ContextEnvelope<OcrGeometryWorkerInput>) {
    const mapped = mapInputToEngine(input);
    const result = buildDocument(
      mapped.normalized as Parameters<typeof buildDocument>[0],
      mapped.buildOptions,
    );

    return mapEngineOutputToEnvelope(result);
  },
});
