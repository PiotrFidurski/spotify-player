import * as React from "react";
import { TrackContext } from "./context";

export const useTrack = () => {
  const context = React.useContext(TrackContext);

  if (!context)
    throw new Error(
      "You are using TrackContext outside of TrackProvider, please wrap your parent component in TrackProvider"
    );
  return context;
};
