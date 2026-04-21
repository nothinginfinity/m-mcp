import { describe, expect, it } from "vitest";
import {
  CapabilityRegistry,
  createEnvelope,
  localFirstPolicy,
  noopWorker,
  ocrGeometryWorker,
  orchestrate,
  registerWorker,
  runWorkerCapability,
} from "../src/index.js";

const BASIC_TSV = `level	page_num	block_num	par_num	line_num	word_num	left	top	width	height	conf	text
5	1	1	1	1	1	72	64	54	24	96	Quick
5	1	1	1	1	2	136	64	72	24	95	Start`;

describe("local-first integration", () => {
  it("runs a local mobile-safe worker under local-first policy", async () => {
    const registry = new CapabilityRegistry();
    registerWorker(registry, noopWorker);

    const input = createEnvelope({
      id: "env-local",
      type: "document/raw",
      source: "test",
      data: { text: "hello" },
    });

    const result = await orchestrate(registry, input, {
      capabilityId: "worker.noop",
      policies: [localFirstPolicy],
      host: "mobile",
    });

    expect(result.output.data).toEqual({ text: "hello" });
    expect(result.trace.steps[0]?.capabilityId).toBe("worker.noop");
    expect(result.escalationRecommended).toBe(false);
  });

  it("can run the same worker directly through worker runtime helpers", async () => {
    const input = createEnvelope({
      id: "env-direct",
      type: "document/raw",
      source: "test",
      data: { text: "hello-direct" },
    });

    const output = await runWorkerCapability(noopWorker, input, {
      host: "mobile",
    });

    expect(output.data).toEqual({ text: "hello-direct" });
    expect(output.source).toBe("m-mcp/noop-worker");
  });

  it("runs the OCR geometry worker locally under local-first policy", async () => {
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
      policies: [localFirstPolicy],
      host: "mobile",
    });

    expect(result.output.type).toBe("document/ocr-geometry");
    expect(result.trace.steps[0]?.capabilityId).toBe("worker.ocr.geometry");
  });
});
