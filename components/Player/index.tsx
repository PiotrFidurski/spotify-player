import { actionTypes } from "@components/TrackProvider/actions";
import { useTrack } from "@components/TrackProvider/useTrack";
import { getCurrentTrackImageUrl } from "features/utils/fns";
import { useSession } from "next-auth/client";
import * as React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import styles from "./Player.module.css";

const playerStyles = {
  sliderTrackColor: "var(--bg-input)",
  sliderHandleColor: "var(--bg-button)",
  sliderColor: "var(--bg-button)",
  color: "var(--text-primary)",
  trackArtistColor: "var(--text-primary)",
  bgColor: "var(--sidebar-bg)",
  activeColor: "white",
  trackNameColor: "var(--text-primary)",
};

export function Player() {
  const [session] = useSession();

  const {
    state: { tracks, offset },
    dispatch,
  } = useTrack();

  return (
    <div className={styles.container}>
      {session && tracks ? (
        <SpotifyPlayer
          offset={offset}
          play={true}
          autoPlay={true}
          callback={({ isPlaying, isActive, track }) => {
            if (isPlaying && isActive) {
              const imageUrl = getCurrentTrackImageUrl(tracks, track.id);
              dispatch({
                type: actionTypes.currentTrack,
                payload: {
                  ...track,
                  image: imageUrl,
                },
              });
            }
          }}
          magnifySliderOnHover={true}
          styles={playerStyles}
          uris={tracks.flat().map((track) => track.uri)}
          token={session?.user?.accessToken}
        />
      ) : null}
    </div>
  );
}
