import { ImageComponent } from "@components/ImageComponent";
import { NowPlaying } from "@components/NowPlaying";
import { Player } from "@components/Player";
import { useTheme } from "@hooks/useTheme";
import { useSession } from "next-auth/client";
import * as React from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import styles from "./Main.module.css";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/chimson/image/upload/v1596460624/new-client/placeholder.png";

export function Main() {
  const [session] = useSession();

  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <DarkModeToggle onChange={toggleTheme} checked={isDarkMode} size={50} />
        <ImageComponent
          style={{
            maxWidth: "30px",
            height: "30px",
            borderRadius: "9999px",
            marginLeft: "10px",
          }}
          src={session?.user?.picture ?? DEFAULT_AVATAR}
        />
      </div>
      <NowPlaying />
      <Player />
    </div>
  );
}
