import CredentialsProvider from "next-auth/providers/credentials";

import { AuthOptions } from "next-auth";
import { DrizzleAdapter } from "./auth-adapter";

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(),
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "Admin", email: "admin@admin.com" };
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
};
