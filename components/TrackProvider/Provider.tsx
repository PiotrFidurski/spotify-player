import * as React from "react";
import { State, TrackContext } from "./context";
import { reducer } from "./reducer";

const initialState: State = {
  currentTrack: undefined,
  offset: 0,
  tracks: [],
};

type Props = {
  children: React.ReactChild;
};

export function TrackProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <TrackContext.Provider value={{ state, dispatch }}>
      {children}
    </TrackContext.Provider>
  );
}
