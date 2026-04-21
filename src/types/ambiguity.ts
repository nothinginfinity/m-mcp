export type AmbiguityLevel = "low" | "medium" | "high";

export interface AmbiguityInfo {
  level: AmbiguityLevel;
  reasons: string[];
}
