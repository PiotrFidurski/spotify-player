import { ImageComponent } from "@components/ImageComponent";
import { useTrack } from "@components/TrackProvider/useTrack";
import gStyles from "@styles/_app.module.css";
import * as React from "react";
import styles from "./NowPlaying.module.css";

const DEFAULT_TRACK_IMAGE =
  "https://res.cloudinary.com/chimson/image/upload/v1630675298/grey-gradient-background-300x300.jpg";

export const NowPlaying: React.FC = () => {
  const {
    state: { currentTrack },
  } = useTrack();

  return (
    <div className={styles.songDetails}>
      <span style={{ fontWeight: 900 }}>
        {currentTrack ? "Now Playing" : "No songs playing."}
      </span>
      <div className={styles.songArtistContainer}>
        <span className={styles.activeSong}>{currentTrack?.name}</span>
      </div>
      <div className={styles.songArtistContainer}>
        <span className={gStyles.wrapElipsis} style={{ fontWeight: 700 }}>
          {currentTrack?.artists}
        </span>
      </div>
      <ImageComponent
        style={{
          maxWidth: "300px",
          height: "300px",
          borderRadius: 0,
          marginTop: "10px",
        }}
        src={currentTrack?.image! ?? DEFAULT_TRACK_IMAGE}
      />
    </div>
  );
};
