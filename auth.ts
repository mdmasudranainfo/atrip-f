import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import {
  loginByCredential,
  loginByOauthCredential,
} from "@/lib/actions/auth-login";
import { User } from "@/types/next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        try {
          const { email, password } = parsedCredentials.data;
          const { data, error } = await loginByCredential({ email, password });

          if (error || !data) {
            return null;
          }

          return data;
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("[Auth Error]:", error);
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  callbacks: {
    async signIn(res) {
      if (res.account?.provider === "credentials") {
        return true;
      }

      if (
        res.account?.provider === "google" ||
        res.account?.provider === "github"
      ) {
        const profile = res.profile;
        return !!profile?.email;
      }

      return false;
    },
    async session({ session, token }) {
      session.user.id = token.sub || "";
      session.accessToken = token.accessToken as string;
      return session;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        const _user = user as User;
        if (account.provider == "github" || account.provider == "google") {
          const { data, error } = await loginByOauthCredential({
            provider: account.provider,
            access_token: account?.access_token || "",
            name: user.name || "",
            email: user.email || "",
          });

          if (!error && data?.id) {
            _user.id = data.id;
            _user.token = data.token;

            token.sub = data.id;
          } else {
            return null;
          }
        }

        token.accessToken = _user.token;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 6 * 60 * 60,
  },
});
