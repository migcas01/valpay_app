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
  const response = await fetch("/api/auth/get-session", {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch session");
  }
  
  return response.json();
}

export function useAuth() {
  return useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: Infinity,
    retry: false,
  });
}
