import { useState, useEffect } from "react";
import { authClient } from "../auth/client";

type Role = "maintainer" | "admin" | "public";

interface UseRoleResult {
  role: Role | null;
  isLoading: boolean;
}

const { useSession } = authClient;

export function useRole(): UseRoleResult {
  const { data: session, isPending } = useSession();
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    let cancelled = false;

    async function resolveRole() {
      // Check both roles
      const [maintainerResult, adminResult] = await Promise.all([
        authClient.admin.hasPermission({
          permissions: {
            invoice: ["create", "list", "view"],
            payment: ["list", "view"],
            transaction: ["list", "view"],
            commerce: ["create", "list", "view", "update", "delete"],
            apiKey: ["create", "list", "revoke"],
            admin: ["create", "list", "update", "delete"],
          },
          role: "maintainer",
        }),

        authClient.admin.hasPermission({
          permissions: {
            invoice: ["create", "list", "view"],
            payment: ["list", "view"],
            transaction: ["list", "view"],
            apiKey: ["create", "list", "revoke"],
          },
          role: "admin",
        }),
      ]);

      if (cancelled) return;

      if (maintainerResult.data?.success) {
        setRole("maintainer");
      } else if (adminResult.data?.success) {
        setRole("admin");
      } else {
        setRole("public");
      }

      setIsLoading(false);
    }

    resolveRole();

    return () => {
      cancelled = true;
    };
  }, [session, isPending]);

  return { role, isLoading };
}

export default useRole;
