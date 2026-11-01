import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";
import { db } from "@/lib/mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    jwt({
      jwt: {
        // The server will use these to check that a token really came from this app
        issuer: process.env.BETTER_AUTH_URL,
        audience: process.env.BETTER_AUTH_URL,
        // Put the user's id and email inside the token
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
        }),
      },
    }),
    nextCookies(),
  ],
});