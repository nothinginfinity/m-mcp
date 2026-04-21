import { MMcpError } from "./MMcpError.js";

export class CapabilityNotFoundError extends MMcpError {
  constructor(message: string) {
    super(message);
    this.name = "CapabilityNotFoundError";
  }
}
