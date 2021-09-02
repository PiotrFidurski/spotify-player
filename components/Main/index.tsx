import { ImageComponent } from "@components/ImageComponent";
import gStyles from "@styles/_app.module.css";
import { useSession } from "next-auth/client";
import * as React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import styles from "./Main.module.css";
interface Props {
  activeSong: any;
}

export const Main: React.FC<Props> = ({ activeSong }) => {
  const [session] = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <ImageComponent
          style={{ maxWidth: "30px", height: "30px", borderRadius: "9999px" }}
          src={
            session?.user?.image! ??
            "https://res.cloudinary.com/chimson/image/upload/v1596460624/new-client/placeholder.png"
          }
        />
      </div>
      <div className={styles.songDetails}>
        <span style={{ fontWeight: 900 }}>
          {activeSong ? "Now Playing" : "No songs playing."}
        </span>
        <div style={{ display: "flex", minWidth: "0px", maxWidth: "420px" }}>
          <span
            style={{ fontWeight: 600, color: "var(--text-secondary)" }}
            className={gStyles.wrapElipsis}
          >
            {activeSong?.name}
          </span>
        </div>
        <div style={{ display: "flex", minWidth: "0px", maxWidth: "420px" }}>
          <span style={{ fontWeight: 700 }} className={gStyles.wrapElipsis}>
            {activeSong?.artists?.map((artist: any, index: number) =>
              activeSong?.artists.length - 1 === index
                ? artist.name + " "
                : artist.name + ", "
            )}
          </span>
        </div>

        {activeSong ? (
          <ImageComponent
            style={{
              maxWidth: "300px",
              height: "300px",
              borderRadius: 0,
              marginTop: "10px",
            }}
            src={activeSong?.album?.images?.[1]?.url!}
          />
        ) : null}
        {session && activeSong ? (
          <div className={styles.playerContainer}>
            <SpotifyPlayer
              autoPlay={true}
              magnifySliderOnHover={true}
              styles={{
                color: "var(--text-primary)",
                trackArtistColor: "var(--text-primary)",
                bgColor: "var(--sidebar-bg)",
                activeColor: "white",
                trackNameColor: "var(--text-primary)",
              }}
              uris={activeSong ? [activeSong.uri] : []}
              token={(session?.user as any).accessToken}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
// activeColor: string;
//   altColor: string;
//   bgColor: string;
//   color: string;
//   errorColor: string;
//   height: number | string;
//   loaderColor: string;
//   loaderSize: number | string;
//   sliderColor: string;
//   sliderHandleBorderRadius: number | string;
//   sliderHandleColor: string;
//   sliderHeight: number;
//   sliderTrackBorderRadius: number | string;
//   sliderTrackColor: string;
//   trackArtistColor: string;
//   trackNameColor: string;
