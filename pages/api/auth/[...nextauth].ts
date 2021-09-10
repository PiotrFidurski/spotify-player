import { addMinutesToCurrentTime } from "features/utils/fns";
import NextAuth, { NextAuthOptions, OwnUser, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import Providers, { Provider } from "next-auth/providers";

async function refreshAccessToken(token: JWT) {
  try {
    var encodedData = Buffer.from(
      process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
    ).toString("base64");

    const response = await fetch(process.env.SPOTIFY_API_TOKEN!, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encodedData}`,
      },
      body: `grant_type=refresh_token&refresh_token=${token.refreshToken}`,
    });

    const refreshedToken: TokenSet = await response.json();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpiresAt: Date.now() + refreshedToken.expires_in! * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const providers: Provider[] = [
  Providers.Spotify({
    scope:
      "user-read-email user-read-private streaming user-read-playback-state user-modify-playback-state",
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  }),
];

const options: NextAuthOptions = {
  pages: { signIn: "/login" },
  useSecureCookies: process.env.NODE_ENV === "production" ? true : false,
  session: { jwt: true },
  callbacks: {
    async jwt(token, _, account) {
      if (account) {
        token.id = account.id;
        token.accessTokenExpiresAt = Date.now() + account!.expires_in! * 1000;
        token.accessToken = account.accessToken;
        token.refreshToken = account.refreshToken;
      }

      const currentTimePlusTenMin = addMinutesToCurrentTime(10);

      if (currentTimePlusTenMin < (token.accessTokenExpiresAt as any)) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session(session, user: OwnUser) {
      session.user = user;

      return session;
    },
  },
  providers,
};

export default NextAuth({ ...options });
