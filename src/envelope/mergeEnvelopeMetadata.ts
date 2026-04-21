export function mergeEnvelopeMetadata(
  base?: Record<string, unknown>,
  extra?: Record<string, unknown>,
): Record<string, unknown> | undefined {
  if (!base && !extra) {
    return undefined;
  }

  return {
    ...(base ?? {}),
    ...(extra ?? {}),
  };
}
