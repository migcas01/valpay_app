import { useState, useEffect } from "react";
import { authClient } from "../auth/client";

type Permissions = Parameters<
  typeof authClient.admin.hasPermission
>[0]["permissions"];

interface UsePermissionResult {
  allowed: boolean | null;
  isLoading: boolean;
  error: {
    code?: string;
    message?: string;
    status: number;
    statusText: string;
  } | null;
}

function usePermission(permissions: Permissions): UsePermissionResult {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<UsePermissionResult["error"]>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkPermission() {
      setIsLoading(true);
      setError(null);

      const { data, error } = await authClient.admin.hasPermission({
        permissions,
      });

      if (cancelled) return;

      if (error) {
        setError(error);
        setAllowed(false);
      } else {
        setAllowed(data?.success ?? false);
      }

      setIsLoading(false);
    }

    checkPermission();

    return () => {
      cancelled = true;
    };
  }, [permissions]);

  return { allowed, isLoading, error };
}

export default usePermission;
