import { useState, useEffect } from "react";

type Role = "maintainer" | "admin" | "public";

interface UseRoleResult {
  role: Role | null;
  isLoading: boolean;
}

export function useRole(): UseRoleResult {
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Auth temporalmente deshabilitado - siempre retorna admin
    setRole("admin");
    setIsLoading(false);
  }, []);

  return { role, isLoading };
}

export default useRole;
