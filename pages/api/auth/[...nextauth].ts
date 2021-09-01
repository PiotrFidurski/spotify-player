import NextAuth, { NextAuthOptions } from "next-auth";
import Providers, { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Providers.Spotify({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  }),
];

const options: NextAuthOptions = { pages: { signIn: "/login" }, providers };

export default NextAuth({ ...options });
