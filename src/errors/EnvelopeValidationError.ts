import { MMcpError } from "./MMcpError.js";

export class EnvelopeValidationError extends MMcpError {
  constructor(message: string) {
    super(message);
    this.name = "EnvelopeValidationError";
  }
}
