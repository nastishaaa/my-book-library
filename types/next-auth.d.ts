import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    user: {
      id?: string,
      name?: string | null,
      email?: string | null,
      password?: string | null,
      image?: string | null;
      address?: string,
    }
  }

  interface User {
    id: string;
    accessToken?: string;
  }
}