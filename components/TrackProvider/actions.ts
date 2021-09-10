export type Action = { type: string; payload?: any };

type PossibleTypes = "currentTrack" | "setTracks" | "setOffset";

export const actionTypes: Record<PossibleTypes, string> = {
  currentTrack: "SET_CURRENT_TRACK",
  setTracks: "SET_TRACKS",
  setOffset: "SET_OFFSET",
};
