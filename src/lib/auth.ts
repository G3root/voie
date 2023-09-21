import EmailProvider from "next-auth/providers/email";
import { AuthOptions } from "next-auth";
import { DrizzleAdapter } from "./auth-adapter";
import { env } from "@/env.mjs";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(),
  providers: [
    EmailProvider({
      sendVerificationRequest: ({ url }) => {
        if (env.NODE_ENV === "development") {
          console.log(`Login link: ${url}`);
          return;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
