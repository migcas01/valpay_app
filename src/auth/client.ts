import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { customSessionClient } from "better-auth/client/plugins";

import { auth } from "../lib/auth";
import { ac, maintainer, admin, user } from "./permissions";

export const authClient = createAuthClient({
  plugins: [
    customSessionClient<typeof auth>(),
    adminClient({
      ac,
      roles: {
        maintainer,
        admin,
        user,
      },
    }),
  ],
  // Auth server base url
  baseURL: import.meta.env.BETTER_AUTH_SERVER_URL,
});
