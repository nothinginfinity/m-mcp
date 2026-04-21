import { MMcpError } from "./MMcpError.js";

export class ExecutionPolicyError extends MMcpError {
  constructor(message: string) {
    super(message);
    this.name = "ExecutionPolicyError";
  }
}
