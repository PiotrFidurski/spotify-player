import { Track } from "@components/TrackProvider/context";

export const getCurrentTrackImageUrl = (
  tracks: Array<Track[]>,
  currentlyPlayingId: string
) => {
  const [image] = tracks
    .flat()
    .filter((track) => track.id === currentlyPlayingId);

  return image.album.images[1].url;
};
