import { describe, expect, it } from "vitest";
import {
  CapabilityRegistry,
  createEnvelope,
  ocrGeometryWorker,
  orchestrate,
  registerWorker,
  runWorkerCapability,
} from "../src/index.js";

const BASIC_TSV = `level	page_num	block_num	par_num	line_num	word_num	left	top	width	height	conf	text
5	1	1	1	1	1	72	64	54	24	96	Quick
5	1	1	1	1	2	136	64	72	24	95	Start
5	1	1	1	2	1	72	118	48	18	94	This
5	1	1	1	2	2	128	118	26	18	93	is
5	1	1	1	2	3	162	118	18	18	92	a
5	1	1	1	2	4	188	118	78	18	94	short
5	1	1	1	2	5	274	118	98	18	94	article
5	1	1	1	2	6	380	118	110	18	93	intro.`;

describe("ocrGeometryWorker", () => {
  it("runs directly as a worker capability", async () => {
    const input = createEnvelope({
      type: "document/ocr-tsv",
      source: "test",
      data: {
        provider: "tesseract",
        sourceType: "ocr-tsv",
        payload: BASIC_TSV,
        pageWidth: 1200,
        pageHeight: 1600,
        options: {
          enableTableInference: false,
          enableCodeInference: false,
        },
      },
    });

    const output = await runWorkerCapability(ocrGeometryWorker, input, {
      host: "mobile",
    });

    expect(output.type).toBe("document/ocr-geometry");
    expect(output.data.summary.pages).toBe(1);
    expect(output.data.blocks.length).toBeGreaterThan(0);
    expect(output.data.markdown.length).toBeGreaterThan(0);
  });

  it("runs through the orchestrator as a registered worker", async () => {
    const registry = new CapabilityRegistry();
    registerWorker(registry, ocrGeometryWorker);

    const input = createEnvelope({
      type: "document/ocr-tsv",
      source: "test",
      data: {
        provider: "tesseract",
        sourceType: "ocr-tsv",
        payload: BASIC_TSV,
        pageWidth: 1200,
        pageHeight: 1600,
      },
    });

    const result = await orchestrate(registry, input, {
      capabilityId: "worker.ocr.geometry",
      host: "mobile",
    });

    expect(result.output.type).toBe("document/ocr-geometry");
    expect(result.trace.steps).toHaveLength(1);
    expect(result.trace.steps[0]?.capabilityId).toBe("worker.ocr.geometry");
  });

  it("preserves summary counts in output envelope", async () => {
    const input = createEnvelope({
      type: "document/ocr-tsv",
      source: "test",
      data: {
        provider: "tesseract",
        sourceType: "ocr-tsv",
        payload: BASIC_TSV,
        pageWidth: 1200,
        pageHeight: 1600,
      },
    });

    const output = await runWorkerCapability(ocrGeometryWorker, input);

    expect(output.data.summary.blockCount).toBe(output.data.blocks.length);
    expect(output.data.summary.pages).toBeGreaterThanOrEqual(1);
  });
});
