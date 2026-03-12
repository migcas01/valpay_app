import { UserCircle, LogOut } from "lucide-react";
import { Button } from "../../../shared";
import { authClient } from "../../../auth/client";

const { signOut } = authClient;

interface UserMenuProps {
  userEmail?: string;
}

export function UserMenu({ userEmail }: UserMenuProps) {
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm text-amber-100">
        <UserCircle className="h-5 w-5" />
        <span>{userEmail}</span>
      </div>
      <Button color="secondary" size="small" onClick={handleSignOut}>
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );
}
