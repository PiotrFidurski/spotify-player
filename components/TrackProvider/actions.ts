export type Action = { type: string; payload?: any };

export const actionTypes: Record<string, string> = {
  currentTrack: "SET_CURRENT_TRACK",
  setTracks: "SET_TRACKS",
  setOffset: "SET_OFFSET",
};
