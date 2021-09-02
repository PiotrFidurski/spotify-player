/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    SPOTIFY_API_URI: "https://api.spotify.com/v1",
    SPOTIFY_API_TOKEN: "https://accounts.spotify.com/api/token",
  },
  images: {
    domains: ["i.scdn.co", "res.cloudinary.com"],
  },
  async redirects() {
    return [
      {
        source: "/login",
        has: [
          {
            type: "cookie",
            key:
              process.env.NODE_ENV === "production"
                ? "__Secure-next-auth.session-token"
                : "next-auth.session-token",
          },
        ],
        destination: "/",
        permanent: true,
      },
    ];
  },
};
