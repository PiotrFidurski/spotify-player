import "next-auth";

declare module "next-auth" {
  interface OwnUser extends User {
    picture?: string | null | undefined;
    accessToken: string;
    accessTokenExpires: number;
    email: string;
    exp: number;
    iat: number;
    id: string;
    name: string;
    refreshToken: string;
    sub: string;
  }
  interface Session {
    user: OwnUser;
  }
}
