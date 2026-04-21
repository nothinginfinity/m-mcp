import type { ContextEnvelope } from "../types/envelope.js";
import { EnvelopeValidationError } from "../errors/EnvelopeValidationError.js";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateEnvelope(envelope: ContextEnvelope): true {
  if (!envelope || typeof envelope !== "object") {
    throw new EnvelopeValidationError("Envelope must be an object");
  }

  if (!envelope.id || typeof envelope.id !== "string") {
    throw new EnvelopeValidationError("Envelope id is required and must be a string");
  }

  if (!envelope.type || typeof envelope.type !== "string") {
    throw new EnvelopeValidationError("Envelope type is required and must be a string");
  }

  if (!envelope.version || typeof envelope.version !== "string") {
    throw new EnvelopeValidationError("Envelope version is required and must be a string");
  }

  if (!envelope.source || typeof envelope.source !== "string") {
    throw new EnvelopeValidationError("Envelope source is required and must be a string");
  }

  if (typeof envelope.createdAt !== "number" || !Number.isFinite(envelope.createdAt)) {
    throw new EnvelopeValidationError("Envelope createdAt must be a finite number");
  }

  if (!("data" in envelope)) {
    throw new EnvelopeValidationError("Envelope data field is required");
  }

  if (
    envelope.confidence !== undefined &&
    (typeof envelope.confidence !== "number" ||
      !Number.isFinite(envelope.confidence) ||
      envelope.confidence < 0 ||
      envelope.confidence > 1)
  ) {
    throw new EnvelopeValidationError(
      "Envelope confidence must be a number between 0 and 1",
    );
  }

  if (envelope.warnings !== undefined) {
    if (!Array.isArray(envelope.warnings)) {
      throw new EnvelopeValidationError("Envelope warnings must be an array of strings");
    }
    for (const warning of envelope.warnings) {
      if (typeof warning !== "string") {
        throw new EnvelopeValidationError("Envelope warnings must contain only strings");
      }
    }
  }

  if (envelope.ambiguity !== undefined) {
    if (
      !envelope.ambiguity ||
      typeof envelope.ambiguity !== "object" ||
      !["low", "medium", "high"].includes(envelope.ambiguity.level)
    ) {
      throw new EnvelopeValidationError("Envelope ambiguity must include a valid level");
    }
    if (!Array.isArray(envelope.ambiguity.reasons)) {
      throw new EnvelopeValidationError("Envelope ambiguity reasons must be an array of strings");
    }
    for (const reason of envelope.ambiguity.reasons) {
      if (typeof reason !== "string") {
        throw new EnvelopeValidationError("Envelope ambiguity reasons must contain only strings");
      }
    }
  }

  if (envelope.escalationHints !== undefined) {
    if (!Array.isArray(envelope.escalationHints)) {
      throw new EnvelopeValidationError("Envelope escalationHints must be an array");
    }
    for (const hint of envelope.escalationHints) {
      if (!hint || typeof hint !== "object") {
        throw new EnvelopeValidationError("Envelope escalationHints must contain only objects");
      }
      if (typeof hint.recommended !== "boolean") {
        throw new EnvelopeValidationError("Envelope escalation hint recommended must be a boolean");
      }
      if (typeof hint.reason !== "string" || hint.reason.length === 0) {
        throw new EnvelopeValidationError("Envelope escalation hint reason must be a non-empty string");
      }
      if (typeof hint.suggestedAction !== "string" || hint.suggestedAction.length === 0) {
        throw new EnvelopeValidationError("Envelope escalation hint suggestedAction must be a non-empty string");
      }
    }
  }

  if (envelope.metadata !== undefined && !isPlainObject(envelope.metadata)) {
    throw new EnvelopeValidationError("Envelope metadata must be a plain object");
  }

  if (envelope.debug !== undefined && !isPlainObject(envelope.debug)) {
    throw new EnvelopeValidationError("Envelope debug must be a plain object");
  }

  return true;
}
