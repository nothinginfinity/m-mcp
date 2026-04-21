export type CapabilityKind = "worker" | "tool";

export interface CapabilityMetadata {
  id: string;
  label: string;
  description: string;
  version: string;
  kind: CapabilityKind;
  inputTypes: string[];
  outputTypes: string[];
  localOnly?: boolean;
  mobileSafe?: boolean;
  tags?: string[];
}
