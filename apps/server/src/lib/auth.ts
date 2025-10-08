import { env } from "cloudflare:workers";
import { expo } from "@better-auth/expo";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { account, session, user, verification } from "../db/schema/auth";

export const auth = betterAuth<BetterAuthOptions>({
  baseURL: env.BETTER_AUTH_URL || "",
  database: drizzleAdapter(db, {
    provider: "pg",

    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  // trustedOrigins: [process.env.CORS_ORIGIN || "", "mybettertapp://", "exp://"],
  trustedOrigins: [env.CORS_ORIGIN || "", "mybettertapp://", "exp://"],
  emailAndPassword: {
    enabled: true,
  },
  // https://www.better-auth.com/docs/concepts/oauth
  socialProviders: {
    github: {
      enabled: true,
      // clientId: process.env.GITHUB_CLIENT_ID || "",
      // clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      clientId: env.GITHUB_CLIENT_ID || "",
      clientSecret: env.GITHUB_CLIENT_SECRET || "",
    },
    google: {
      enabled: true,
      // clientId: process.env.GOOGLE_CLIENT_ID || "",
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      clientId: env.GOOGLE_CLIENT_ID || "",
      clientSecret: env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  },
  plugins: [expo()],
});
