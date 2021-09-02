import { api } from "@api";
import { ImageComponent } from "@components/ImageComponent";
import { Search } from "@components/Search";
import { useTheme } from "@hooks/useTheme";
import gStyles from "@styles/_app.module.css";
import { Plus } from "@svg";
import { useSession } from "next-auth/client";
import * as React from "react";
import { useInfiniteQuery } from "react-query";
import styles from "./Sidebar.module.css";

interface Props {
  setActiveSong: React.Dispatch<React.SetStateAction<null>>;
}

export const Sidebar: React.FC<Props> = ({ setActiveSong }) => {
  const { toggleTheme } = useTheme();

  const [hasScrolled, setHasScrolled] = React.useState(0);

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const [session] = useSession();

  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const element = containerRef;
    const callback = () => {
      setHasScrolled(element.current?.scrollTop!);
    };
    element?.current!.addEventListener("scroll", () => callback());
    return () =>
      element?.current!.removeEventListener("scroll", () => callback());
  }, []);

  const { data, fetchNextPage, isFetching, isLoading, hasNextPage } =
    useInfiniteQuery(
      ["spotifyTracks", query],
      ({ pageParam }) =>
        api.spotify.searchTracks({
          query,
          accessToken: (session?.user as any)?.accessToken!,
          offset: pageParam,
          limit: 35,
        }),
      {
        enabled: Boolean(query),
        getNextPageParam: (lastPage) => {
          return lastPage?.tracks?.offset + 20;
        },
      }
    );

  return (
    <div className={styles.container}>
      <Search setQuery={setQuery} hasScrolled={hasScrolled} />
      <div className={styles.container} ref={containerRef}>
        {!isLoading
          ? data?.pages?.map((page) =>
              page.tracks.items.map((track: any) => (
                <div
                  className={styles.trackContainer}
                  key={track.id}
                  onClick={() => setActiveSong(track)}
                >
                  <ImageComponent
                    style={{
                      maxWidth: "64px",
                      height: "64px",
                      marginRight: "10px",
                    }}
                    src={track.album.images[2].url}
                  />

                  <div className={styles.trackDetails}>
                    <span
                      className={gStyles.wrapElipsis}
                      style={{ fontWeight: 600, letterSpacing: "0.4px" }}
                    >
                      {track.name}
                    </span>
                    <div className={styles.trackArtists}>
                      <span
                        className={gStyles.wrapElipsis}
                        style={{
                          color: "var(--text-secondary)",
                          fontWeight: 700,
                        }}
                      >
                        {track.artists.map((artist: any) => artist.name + " ")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )
          : null}
        {hasNextPage && !isFetching ? (
          <div
            className={gStyles.centerSpinner}
            onClick={() => fetchNextPage()}
          >
            <Plus width="25px" height="25px" fill="var(--bg-button)" />
          </div>
        ) : null}
        {isFetching ? (
          <div className={gStyles.centerSpinner}>
            <div className={gStyles.spinner} />{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
};
