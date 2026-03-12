import { useQuery } from "@tanstack/react-query";

interface SessionResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: "maintainer" | "admin";
    commerceId?: string;
  } | null;
}

async function fetchSession(): Promise<SessionResponse> {
  // Auth temporalmente deshabilitado para pruebas
  return {
    user: {
      id: "1",
      email: "admin@test.com",
      name: "Admin Test",
      role: "admin",
      commerceId: "1",
    },
  };
}

export function useAuth() {
  return useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: Infinity,
    retry: false,
  });
}
