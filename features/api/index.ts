const getData = async (url: string, config: RequestInit) => {
  const response = await fetch(`${process.env.SPOTIFY_API_URI}/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...config,
  });

  const data = await response.json();

  return data;
};

export const api = {
  spotify: {
    searchTracks: ({
      query,
      accessToken,
      limit,
      offset,
    }: {
      query: string;
      accessToken: string;
      limit?: number;
      offset?: number;
    }) => {
      return getData(
        `search?q=${query}&type=track${limit ? `&limit=${limit}` : ""}${
          offset ? `&offset=${offset}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    },
  },
};
