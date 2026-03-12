import { betterAuth } from "better-auth";
import { customSession } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    customSession(async ({ user, session }) => {
      return {
        user: {
          ...user,
          organization: "organization",
        },
        session,
      };
    }),
  ],
});
