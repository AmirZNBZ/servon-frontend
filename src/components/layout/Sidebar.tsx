import { useAuth } from "@/src/features/auth/hooks/useAuth";
import Link from "next/link";
import { ReactNode } from "react";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar = ({}: SidebarProps) => {
  const { user } = useAuth();

  return (
    <nav className="space-y-2">
      <Link href="/dashboard">Dashboard</Link>

      {user?.permissions.includes("CREATE_SERVICE") && <Link href="/dashboard/services">Service</Link>}
    </nav>
  );
};

export default Sidebar;
