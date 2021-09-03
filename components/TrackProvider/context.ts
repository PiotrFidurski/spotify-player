import * as React from "react";
import { Action } from "./actions";

export interface Track {
  artists: string[];
  durationMs: number;
  id: string;
  image: string;
  uri: string;
  name: string;
  album: { images: Array<{ url: string }> };
}

export interface State {
  currentTrack: Track | undefined;
  tracks: Array<Track[]>;
  offset: number;
}

export interface ContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const TrackContext = React.createContext<ContextProps | null>(null);
