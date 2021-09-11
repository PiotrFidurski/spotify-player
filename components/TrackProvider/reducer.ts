import { Action, actionTypes } from "./actions";
import { State } from "./context";

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case actionTypes.currentTrack: {
      return { ...state, currentTrack: action.payload };
    }
    case actionTypes.setTracks: {
      return {
        ...state,
        tracks: action.payload,
      };
    }
    case actionTypes.setOffset: {
      return { ...state, offset: action.payload };
    }
    default: {
      return state;
    }
  }
}
