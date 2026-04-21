import type {
  RemoteCleanupFetcher,
  RemoteCleanupFetcherInput,
  RemoteCleanupToolOutput,
} from "./types.js";
import { MMcpError } from "../../errors/MMcpError.js";

export const defaultRemoteCleanupFetcher: RemoteCleanupFetcher = async (
  args: RemoteCleanupFetcherInput,
): Promise<RemoteCleanupToolOutput> => {
  const { input, endpoint, apiKey } = args;

  if (!endpoint) {
    throw new MMcpError(
      "Remote cleanup tool requires an endpoint when using the default fetcher",
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(apiKey ? { authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new MMcpError(
      `Remote cleanup request failed with status ${response.status}`,
    );
  }

  const json = (await response.json()) as RemoteCleanupToolOutput;

  return json;
};
