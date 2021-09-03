import * as React from "react";
import { State, TrackContext } from "./context";
import { reducer } from "./reducer";

const initialState: State = {
  currentTrack: undefined,
  offset: 0,
  tracks: [],
};

export const TrackProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <TrackContext.Provider value={{ state, dispatch }}>
      {children}
    </TrackContext.Provider>
  );
};
