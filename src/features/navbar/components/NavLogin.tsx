import { Building2 } from "lucide-react";
import { Button } from "../../../shared";
import { authClient } from "../../../auth/client";
import { UserMenu } from "./UserMenu";
import { navItemsConfig, type Role } from "./navItems";
import { Link } from "react-router";

interface NavLoginProps {
  isUser?: boolean;
}

const { useSession } = authClient;

export function NavLogin({ isUser = true }: NavLoginProps) {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4">
      <Link to="/login">
        {isUser ? (
          <Button
            color="primary"
            size="small"
            className="flex flex-row items-center justify-center"
          >
            <Building2 className="h-4 w-4 mr-2" />
            <div>Commerce</div>
          </Button>
        ) : (
          <UserMenu userEmail={session?.user?.email} />
        )}
      </Link>
    </div>
  );
}
