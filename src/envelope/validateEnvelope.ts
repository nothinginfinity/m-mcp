import type { ContextEnvelope } from "../types/envelope.js";
import { EnvelopeValidationError } from "../errors/EnvelopeValidationError.js";

export function validateEnvelope(envelope: ContextEnvelope): true {
  if (!envelope.id) {
    throw new EnvelopeValidationError("Envelope id is required");
  }

  if (!envelope.type) {
    throw new EnvelopeValidationError("Envelope type is required");
  }

  if (!envelope.version) {
    throw new EnvelopeValidationError("Envelope version is required");
  }

  if (!envelope.source) {
    throw new EnvelopeValidationError("Envelope source is required");
  }

  if (typeof envelope.createdAt !== "number") {
    throw new EnvelopeValidationError("Envelope createdAt must be a number");
  }

  return true;
}
