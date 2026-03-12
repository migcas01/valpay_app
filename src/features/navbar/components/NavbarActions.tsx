import { Building2, LogOut, UserCircle } from "lucide-react";
import { authClient } from "../../../auth/client";
import { Button } from "../../../shared";

const { useSession, signOut } = authClient;

export function UserMenu() {
  const { data: session } = useSession();
  const displayName = session?.user?.name || session?.user?.email;

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <UserCircle className="h-4 w-4" />
        <span>{displayName}</span>
      </div>
      <Button color="secondary" size="small" onClick={handleSignOut}>
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}

export function LoginButton() {
  return (
    <a href="/login">
      <Button color="primary" size="small">
        <Building2 className="h-4 w-4" />
        Commerce / Admin login
      </Button>
    </a>
  );
}
