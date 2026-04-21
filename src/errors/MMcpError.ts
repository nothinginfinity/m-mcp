export class MMcpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MMcpError";
  }
}
