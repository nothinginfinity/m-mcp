import type { ContextEnvelope } from "../../types/envelope.js";
import { createEnvelope } from "../../envelope/createEnvelope.js";
import type { OcrGeometryWorkerOutput } from "./types.js";

interface EngineBlock {
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
}

interface EngineBuildResult {
  pages: Array<{ page: number }>;
  blocks: EngineBlock[];
  markdown: string;
  text: string;
  debug: {
    warnings: string[];
    ambiguousBlocks: string[];
    debugHtml?: string;
    debugJson?: unknown;
  };
}

function countByType(blocks: EngineBlock[], type: string): number {
  return blocks.filter((block) => block.type === type).length;
}

function countAmbiguous(blocks: EngineBlock[]): number {
  return blocks.filter((block) => block.ambiguity !== undefined).length;
}

export function mapEngineOutputToEnvelope(
  engineResult: EngineBuildResult,
): ContextEnvelope<OcrGeometryWorkerOutput> {
  const output: OcrGeometryWorkerOutput = {
    markdown: engineResult.markdown,
    text: engineResult.text,
    blocks: engineResult.blocks.map((block) => ({
      id: block.id,
      type: block.type,
      text: block.text,
      level: block.level,
      page: block.page,
      confidence: block.confidence,
      flags: block.flags,
      rows: block.rows,
      ambiguity: block.ambiguity,
    })),
    summary: {
      pages: engineResult.pages.length,
      blockCount: engineResult.blocks.length,
      headingCount: countByType(engineResult.blocks, "heading"),
      listCount: countByType(engineResult.blocks, "list"),
      tableCount: countByType(engineResult.blocks, "table"),
      codeCount: countByType(engineResult.blocks, "code"),
      ambiguityCount: countAmbiguous(engineResult.blocks),
    },
    debug: {
      warnings: engineResult.debug.warnings,
      ambiguousBlocks: engineResult.debug.ambiguousBlocks,
      html: engineResult.debug.debugHtml,
      json: engineResult.debug.debugJson,
    },
  };

  const averageConfidence =
    output.blocks.length > 0
      ? output.blocks.reduce((sum, block) => sum + block.confidence, 0) /
        output.blocks.length
      : undefined;

  const highestAmbiguity = output.blocks.some(
    (block) => block.ambiguity?.level === "high",
  )
    ? "high"
    : output.blocks.some((block) => block.ambiguity?.level === "medium")
      ? "medium"
      : output.blocks.some((block) => block.ambiguity?.level === "low")
        ? "low"
        : undefined;

  const ambiguityReasons = output.blocks.flatMap(
    (block) => block.ambiguity?.reasons ?? [],
  );

  return createEnvelope({
    type: "document/ocr-geometry",
    version: "1.0.0",
    source: "m-mcp/ocr-geometry-worker",
    data: output,
    confidence: averageConfidence,
    warnings: output.debug?.warnings,
    ambiguity:
      highestAmbiguity && ambiguityReasons.length > 0
        ? {
            level: highestAmbiguity,
            reasons: Array.from(new Set(ambiguityReasons)),
          }
        : undefined,
    debug:
      output.debug !== undefined
        ? {
            warnings: output.debug.warnings,
            ambiguousBlocks: output.debug.ambiguousBlocks,
          }
        : undefined,
  });
}
