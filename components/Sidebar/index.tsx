import { api } from "@api";
import { ImageComponent } from "@components/ImageComponent";
import { Search } from "@components/Search";
import { actionTypes } from "@components/TrackProvider/actions";
import { Track } from "@components/TrackProvider/context";
import { useTrack } from "@components/TrackProvider/useTrack";
import gStyles from "@styles/_app.module.css";
import { Plus } from "@svg";
import { useSession } from "next-auth/client";
import * as React from "react";
import { useInfiniteQuery } from "react-query";
import styles from "./Sidebar.module.css";

const PAGINATION_LIMIT = 35;

interface SpotifyTracks {
  href: string;
  items: Array<Track>;
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number;
}

interface PaginatedResults {
  tracks: SpotifyTracks;
}

export function Sidebar() {
  const {
    dispatch,
    state: { currentTrack, tracks },
  } = useTrack();

  const [session] = useSession();

  const [query, setQuery] = React.useState("");

  const { data, fetchNextPage, isFetching, isLoading, hasNextPage } =
    useInfiniteQuery<PaginatedResults, SpotifyTracks>(
      ["spotifyTracks", query],
      ({ pageParam: offset }) =>
        api.spotify.searchTracks({
          query,
          accessToken: session?.user?.accessToken!,
          offset,
          limit: PAGINATION_LIMIT,
        }),
      {
        enabled: Boolean(query),
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        getNextPageParam: (lastPage) => {
          return lastPage?.tracks?.offset + PAGINATION_LIMIT;
        },
      }
    );

  React.useEffect(() => {
    const tracks = data?.pages?.map((page) =>
      page?.tracks?.items?.map((track) => track)
    );

    dispatch({ type: actionTypes.setTracks, payload: tracks });
  }, [data, isLoading, dispatch]);

  const setOffset = (trackId: string) => {
    const index = tracks.flat().findIndex((track) => track.id === trackId);

    dispatch({ type: actionTypes.setOffset, payload: index });
  };

  return (
    <div className={styles.container}>
      <Search setQuery={setQuery} />
      <div className={styles.container}>
        {!isLoading
          ? data?.pages?.map((page) =>
              page?.tracks?.items?.map((track) => (
                <div
                  style={
                    currentTrack?.id === track.id
                      ? { background: "var(--shadow-color)" }
                      : { background: "transparent" }
                  }
                  onClick={() => setOffset(track.id)}
                  className={styles.trackContainer}
                  key={track.id}
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
}
