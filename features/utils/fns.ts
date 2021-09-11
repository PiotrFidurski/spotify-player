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

const SIXTY_SECONDS = 60000;

export function addMinutesToCurrentTime(minutes: number) {
  const currentTime = new Date().getTime();
  return new Date(currentTime + minutes * SIXTY_SECONDS).getTime();
}
