import {
  CapabilityRegistry,
  createEnvelope,
  ocrGeometryWorker,
  orchestrate,
  registerWorker,
} from "../src/index.js";

const tsv = `level	page_num	block_num	par_num	line_num	word_num	left	top	width	height	conf	text
5	1	1	1	1	1	72	64	54	24	96	Quick
5	1	1	1	1	2	136	64	72	24	95	Start
5	1	1	1	2	1	72	118	48	18	94	This
5	1	1	1	2	2	128	118	26	18	93	is
5	1	1	1	2	3	162	118	18	18	92	a
5	1	1	1	2	4	188	118	78	18	94	short
5	1	1	1	2	5	274	118	98	18	94	article
5	1	1	1	2	6	380	118	110	18	93	intro.`;

async function main() {
  const registry = new CapabilityRegistry();
  registerWorker(registry, ocrGeometryWorker);

  const input = createEnvelope({
    type: "document/ocr-tsv",
    source: "example",
    data: {
      provider: "tesseract",
      sourceType: "ocr-tsv",
      payload: tsv,
      pageWidth: 1200,
      pageHeight: 1600,
      options: {
        enableTableInference: true,
        enableCodeInference: true,
      },
    },
  });

  const result = await orchestrate(registry, input, {
    capabilityId: "worker.ocr.geometry",
    host: "mobile",
  });

  console.log(JSON.stringify(result.output.data, null, 2));
  console.log(JSON.stringify(result.trace, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
